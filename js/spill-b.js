/* Spill B: Ligningsmaskinen, Ulikhets-vakten, Like-ledd-fisking, Mønsterjakten, Myntjakt (rette linjer og kurver) */
(function () {
  'use strict';
  const M = window.MATTE, G = M.G, F = M.fmt;
  const R = x => Math.round(x * 1000) / 1000;

  /* felles: flervalgsknapper. opts = [{t, ok}], kalles med (ok, indeks) etter ett valg */
  G.mc = function (boks, opts, fn, klasse) {
    boks.innerHTML = opts.map((o, i) => '<button type="button" class="sp-valg ' + (klasse || '') + '" data-i="' + i + '">' + o.t + '</button>').join('');
    const bs = boks.querySelectorAll('button');
    bs.forEach((b, i) => b.addEventListener('click', () => {
      bs.forEach((x, j) => { x.disabled = true; if (opts[j].ok) x.classList.add('rett'); });
      if (!opts[i].ok) b.classList.add('feil');
      fn(!!opts[i].ok, i);
    }));
  };
  /* 4 forskjellige alternativer: riktig verdi + avledede gale */
  G.alt = function (rett, galne, fmt) {
    fmt = fmt || (x => F(x)); const sett = [rett];
    galne.forEach(g => { if (sett.indexOf(g) < 0 && isFinite(g)) sett.push(g); });
    let k = 1; while (sett.length < 4) { const g = rett + (k % 2 ? k : -k); if (sett.indexOf(g) < 0) sett.push(g); k++; }
    return G.shuffle(sett.slice(0, 4).map(v => ({ t: fmt(v), ok: v === rett })));
  };
  const tmpl = (hud, spm, bokser) => '<div class="sp-hud">' + hud + '</div>' + (spm ? '<div class="sp-spm lesbar">' + spm + '</div>' : '') + bokser;

  /* ===================== Ligningsmaskinen ===================== */
  function venstre(a, b) {
    let s = (a === 1 ? '' : a === -1 ? '−' : F(a)) + 'x';
    if (b > 0) s += ' + ' + F(b); else if (b < 0) s += ' − ' + F(-b);
    return s;
  }
  G.add({
    id: 'ligningsmaskinen', tittel: 'Ligningsmaskinen', ikon: '⚖️', trinn: 8, temaer: ['8/ligninger'],
    kort: 'Hold vekta i balanse og få x helt for seg selv.',
    hvordan: 'Ligningen er en vekt. Det du gjør på den ene siden, må du gjøre på den andre. Velg regneart og tall, og trykk «Gjør på begge sider». Målet er at det står «x = …» med færrest mulig trekk. Du kan bare dele hvis det går opp.',
    lærer: 'Å løse ligninger ved å gjøre det samme på begge sider: først fjerne tallet som står alene (pluss eller minus), så dele på tallet foran x. Du ser også at svaret alltid kan sjekkes ved å sette det inn.',
    start: function (el) {
      let runde = 0, poeng = 0, a, b, c, x, trekk, par, op = '−', n = 1, maks, logg, ferdig;
      const RUNDER = 6;
      function ny() {
        x = G.rnd(2, 9); a = runde < 2 ? G.rnd(2, 5) : G.rnd(2, 6); b = runde < 2 ? 0 : G.rnd(1, 9) * (Math.random() < .5 ? -1 : 1);
        if (runde === 2) { a = 1; b = G.rnd(2, 9) * (Math.random() < .5 ? -1 : 1); }
        c = a * x + b; par = (a !== 1 ? 1 : 0) + (b !== 0 ? 1 : 0); if (par === 0) par = 1;
        trekk = 0; logg = []; ferdig = false; op = '+'; n = 1; vis();
      }
      function vis() {
        el.innerHTML = tmpl('<span>Oppgave ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Trekk: ' + trekk + ' (best: ' + par + ')</span><span>Poeng: ' + poeng + '</span>', '',
          '<div class="lm-vekt" aria-label="Ligning: ' + venstre(a, b) + ' er lik ' + F(c) + '"><div class="lm-side"><span>' + venstre(a, b) + '</span></div><div class="lm-lik">⚖️ =</div><div class="lm-side"><span>' + F(c) + '</span></div></div>' +
          '<div class="lm-logg">' + (logg.length ? logg.join('<br>') : 'Ingen trekk ennå.') + '</div>' +
          '<div class="sp-rad lm-ops" role="group" aria-label="Regneart">' + ['+', '−', '×', '÷'].map(o => '<button type="button" class="sp-valg lm-op' + (o === op ? ' valgt' : '') + '" data-o="' + o + '">' + o + '</button>').join('') +
          '<span class="lm-n"><button type="button" class="sp-valg lm-minus" aria-label="Mindre">−</button><strong class="lm-tall" aria-live="polite">' + n + '</strong><button type="button" class="sp-valg lm-pluss" aria-label="Mer">+</button></span></div>' +
          '<div class="sp-rad"><button type="button" class="knapp primær lm-gjør">Gjør «' + op + ' ' + n + '» på begge sider</button></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad lm-nav"></div>');
        el.querySelectorAll('.lm-op').forEach(b => b.addEventListener('click', () => { op = b.dataset.o; vis(); }));
        G.q(el, '.lm-minus').addEventListener('click', () => { n = Math.max(1, n - 1); vis(); });
        G.q(el, '.lm-pluss').addEventListener('click', () => { n = Math.min(20, n + 1); vis(); });
        G.q(el, '.lm-gjør').addEventListener('click', gjør);
        if (ferdig) { G.q(el, '.lm-gjør').disabled = true; el.querySelectorAll('.lm-op,.lm-minus,.lm-pluss').forEach(b => b.disabled = true); }
      }
      function gjør() {
        if (ferdig) return;
        let na = a, nb = b, nc = c;
        if (op === '+') { nb += n; nc += n; } else if (op === '−') { nb -= n; nc -= n; } else if (op === '×') { na *= n; nb *= n; nc *= n; }
        else { if (a % n || b % n || c % n) { return rapport(false, 'Det går ikke opp: ' + F(a) + ', ' + F(b) + ' og ' + F(c) + ' kan ikke alle deles på ' + n + '. Når du deler, må alle tall på begge sider kunne deles. Prøv noe annet.'); } na /= n; nb /= n; nc /= n; }
        logg.push((trekk + 1) + '. ' + op + ' ' + n + ' på begge sider → ' + venstre(na, nb) + ' = ' + F(nc));
        a = na; b = nb; c = nc; trekk++;
        if (a === 1 && b === 0) {
          ferdig = true; const p = trekk <= par ? 3 : trekk <= par + 1 ? 2 : 1; poeng += p; vis();
          G.feedback(el, true, 'Ferdig! <strong>x = ' + F(c) + '</strong>. Sjekk: ' + F(c) + ' passer i den første ligningen. +' + p + ' poeng' + (trekk <= par ? ' (perfekt, du brukte færrest mulig trekk)' : '') + '.');
          return neste();
        }
        if (trekk >= 8 || Math.abs(c) > 400) { ferdig = true; vis(); G.feedback(el, false, 'Den ble for rotete. Husk: først fjerne tallet som står alene (pluss/minus), så dele på tallet foran x. Du får prøve en ny.'); return neste(); }
        vis(); G.feedback(el, true, 'Fortsatt i balanse! Du gjorde det samme på begge sider.');
      }
      function rapport(ok, h) { G.feedback(el, ok, h); }
      function neste() {
        const rad = G.q(el, '.lm-nav'); rad.innerHTML = '<button type="button" class="knapp primær lm-neste">' + (runde + 1 >= RUNDER ? 'Se resultatet' : 'Neste ligning ▶') + '</button>';
        G.q(el, '.lm-neste').addEventListener('click', () => { runde++; if (runde >= RUNDER) return G.slutt(el, { ikon: '⚖️', tittel: 'Balansekunstner!', stjerner: G.stjerner(el, poeng, RUNDER * 3), tekst: 'Du fikk ' + poeng + ' av ' + (RUNDER * 3) + ' poeng.', lær: 'For å løse en ligning gjør du det samme på begge sider. Fjern først tallet som står alene, del så på tallet foran x.', igjen: () => { runde = 0; poeng = 0; ny(); } }); ny(); });
      }
      ny();
    }
  });

  /* ===================== Ulikhets-vakten ===================== */
  G.add({
    id: 'ulikhetsvakten', tittel: 'Ulikhets-vakten', ikon: '🛡️', trinn: 8, temaer: ['8/ulikheter'],
    kort: 'Du er dørvakt. Slipp inn de tallene som passer i ulikheten.',
    hvordan: 'Ulikheten på skiltet bestemmer hvem som får komme inn. Hver gjest har et tall. Trykk «Slipp inn» hvis tallet passer, og «Avvis» hvis ikke. På nivå 2 må du først løse ulikheten. På nivå 3 snur tegnet når du deler på et negativt tall.',
    lærer: 'Hva en ulikhet betyr: mange tall passer, ikke bare ett. Du øver på &lt; &gt; ≤ ≥, på å løse ulikheter, og på at ulikhetstegnet snur når du ganger eller deler med et negativt tall.',
    start: function (el) {
      let nivå, gjest, liv, poeng, nr, regel;
      const PER = 5, TOT = 15;
      function lagRegel() {
        const tegn = G.pick(['<', '>', '≤', '≥']);
        const test = (v, t, g) => t === '<' ? v < g : t === '>' ? v > g : t === '≤' ? v <= g : v >= g;
        if (nivå === 1) { const g = G.rnd(-3, 8); return { tekst: 'x ' + tegn + ' ' + F(g), test: v => test(v, tegn, g), ferdig: 'x ' + tegn + ' ' + F(g), steg: '' }; }
        if (nivå === 2) { const a = G.rnd(2, 4), x0 = G.rnd(-2, 6), b = G.rnd(1, 6) * (Math.random() < .5 ? -1 : 1), c = a * x0 + b; return { tekst: venstre(a, b) + ' ' + tegn + ' ' + F(c), test: v => test(a * v + b, tegn, c), ferdig: 'x ' + tegn + ' ' + F(x0), steg: 'Trekk fra ' + F(b) + ' på begge sider og del på ' + a + ': x ' + tegn + ' ' + F(x0) + '.' }; }
        const a = -G.rnd(2, 4), x0 = G.rnd(-4, 4), c = a * x0; const snu = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' }[tegn];
        return { tekst: F(a) + 'x ' + tegn + ' ' + F(c), test: v => test(a * v, tegn, c), ferdig: 'x ' + snu + ' ' + F(x0), steg: 'Når du deler på ' + F(a) + ' (negativt) snur tegnet: x ' + snu + ' ' + F(x0) + '.' };
      }
      function nyGjest() {
        regel = regel && nr % PER !== 0 ? regel : lagRegel();
        for (let k = 0; k < 50; k++) { gjest = G.rnd(-8, 12); const inn = regel.test(gjest); if (k > 10 || inn === (Math.random() < .5)) break; }
        vis();
      }
      function vis() {
        el.innerHTML = tmpl('<span>Nivå ' + nivå + ' av 3</span><span>Gjest ' + (nr + 1) + ' av ' + TOT + '</span><span>' + G.hearts(liv) + '</span>', '',
          '<div class="uv-skilt"><span class="uv-liten">Skiltet sier</span><span class="uv-regel">' + regel.tekst + '</span></div>' +
          '<div class="uv-gjest" aria-live="polite"><span class="uv-ansikt" aria-hidden="true">🧑‍🎤</span><span>Gjesten har tallet</span><strong class="uv-tall">' + F(gjest) + '</strong></div>' +
          '<div class="sp-rad uv-knapper"><button type="button" class="sp-valg uv-inn">✅ Slipp inn</button><button type="button" class="sp-valg uv-ut">⛔ Avvis</button></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad uv-nav"></div>');
        G.q(el, '.uv-inn').addEventListener('click', () => svar(true)); G.q(el, '.uv-ut').addEventListener('click', () => svar(false));
      }
      function svar(inn) {
        const rett = regel.test(gjest), ok = inn === rett; el.querySelectorAll('.uv-knapper button').forEach(b => b.disabled = true);
        if (ok) poeng++; else liv--;
        const sjekk = nivå === 1 ? '' : ' Sjekk: å sette inn ' + F(gjest) + ' i ' + regel.tekst.replace(/x/g, '(' + F(gjest) + ')').replace(/\(([-−]?\d+)\)/g, '$1') + (rett ? ' stemmer.' : ' stemmer ikke.');
        G.feedback(el, ok, (ok ? 'Riktig! ' : 'Æsj, feil. ') + F(gjest) + (rett ? ' passer' : ' passer ikke') + ' i ' + regel.tekst + '.' + (nivå === 1 ? '' : ' Ulikheten betyr ' + regel.ferdig + '. ' + regel.steg) + (nivå === 1 ? '' : ''));
        nr++; const rad = G.q(el, '.uv-nav'); const slutt = liv <= 0 || nr >= TOT;
        rad.innerHTML = '<button type="button" class="knapp primær uv-neste">' + (slutt ? 'Se resultatet' : 'Neste gjest ▶') + '</button>';
        G.q(el, '.uv-neste').addEventListener('click', () => {
          if (slutt) return G.slutt(el, { ikon: liv > 0 ? '🛡️' : '😵', tittel: liv > 0 ? 'Vakt av høyeste klasse!' : 'Vakten ble sendt hjem', stjerner: G.stjerner(el, poeng, TOT), tekst: 'Du hadde ' + poeng + ' riktige av ' + nr + '.', lær: 'En ulikhet har mange løsninger. Løs den som en ligning, men snu ulikhetstegnet når du ganger eller deler med et negativt tall.', igjen: start2 });
          if (nr % PER === 0) { nivå++; regel = null; }
          nyGjest();
        });
      }
      function start2() { nivå = 1; liv = 3; poeng = 0; nr = 0; regel = lagRegel(); nyGjest(); }
      start2();
    }
  });

  /* ===================== Like-ledd-fisking ===================== */
  G.add({
    id: 'like-ledd', tittel: 'Like-ledd-fisking', ikon: '🎣', trinn: 8, temaer: ['8/uttrykk'],
    kort: 'Fisk opp like ledd og slå dem sammen til ett.',
    hvordan: 'Du får et uttrykk der hvert ledd er en fisk. Trykk på fiskene som har samme bokstavdel (for eksempel alle x-ene), og trykk «Slå sammen». Når alle like ledd er slått sammen, er uttrykket ferdig forenklet. Du kan ikke slå sammen x og y.',
    lærer: 'Å forenkle uttrykk: bare like ledd (samme variabel, eller bare tall) kan slås sammen. Koeffisientene legges sammen, og bokstavdelen blir stående.',
    start: function (el) {
      let runde = 0, feil = 0, ledd, valgt, id0, riktigeSammen = 0;
      const RUNDER = 5;
      function lag() {
        const vs = runde < 2 ? ['x', ''] : runde < 4 ? ['x', 'y', ''] : ['x', 'y', ''];
        const antall = 4 + Math.min(runde, 3); ledd = []; id0 = 0;
        for (let i = 0; i < antall; i++) { const v = vs[i % vs.length]; let k = G.rnd(1, 9) * (Math.random() < .35 ? -1 : 1); ledd.push({ id: id0++, k: k, v: v }); }
        ledd = G.shuffle(ledd); valgt = []; vis();
      }
      const tekst = l => (l.v ? (l.k === 1 ? '' : l.k === -1 ? '−' : F(l.k)) + l.v : F(l.k));
      const uttr = () => ledd.map((l, i) => (i === 0 ? tekst(l) : l.k < 0 ? '− ' + tekst({ k: -l.k, v: l.v }) : '+ ' + tekst(l))).join(' ');
      const gr = () => { const m = {}; ledd.forEach(l => m[l.v] = (m[l.v] || 0) + 1); return m; };
      const ferdigsjekk = () => Object.keys(gr()).every(k => gr()[k] === 1);
      function vis() {
        el.innerHTML = tmpl('<span>Oppgave ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Feilgrep: ' + feil + '</span>', 'Forenkle: <span class="ll-uttr">' + uttr() + '</span>',
          '<div class="ll-dam" aria-label="Fiskedam med ledd">' + ledd.map(l => '<button type="button" class="ll-fisk' + (valgt.indexOf(l.id) >= 0 ? ' valgt' : '') + ' ll-' + (l.v || 'tall') + '" data-id="' + l.id + '" aria-pressed="' + (valgt.indexOf(l.id) >= 0) + '"><span aria-hidden="true">🐟</span><strong>' + tekst(l) + '</strong></button>').join('') + '</div>' +
          '<div class="sp-rad"><button type="button" class="knapp primær ll-sam"' + (valgt.length < 2 ? ' disabled' : '') + '>🎣 Slå sammen (' + valgt.length + ')</button><button type="button" class="knapp liten ll-nullstill"' + (valgt.length ? '' : ' disabled') + '>Fjern valg</button></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad ll-nav"></div>');
        el.querySelectorAll('.ll-fisk').forEach(b => b.addEventListener('click', () => { const id = +b.dataset.id, i = valgt.indexOf(id); if (i >= 0) valgt.splice(i, 1); else valgt.push(id); vis(); }));
        G.q(el, '.ll-sam').addEventListener('click', sam); G.q(el, '.ll-nullstill').addEventListener('click', () => { valgt = []; vis(); });
      }
      function sam() {
        const v = ledd.filter(l => valgt.indexOf(l.id) >= 0); const typer = v.map(l => l.v).filter((x, i, a) => a.indexOf(x) === i);
        if (typer.length > 1) { feil++; valgt = []; vis(); return G.feedback(el, false, 'Nei, de er ikke like ledd. Du kan bare slå sammen ledd som har <strong>samme bokstav</strong> (eller som alle er vanlige tall). 3x og 4y kan ikke slås sammen, men 3x og 4x kan.'); }
        const sum = v.reduce((s, l) => s + l.k, 0), navn = typer[0], regnestykke = v.map((l, i) => (i && l.k > 0 ? '+ ' : i ? '− ' : '') + (i && l.k < 0 ? F(-l.k) : F(l.k))).join(' ');
        const rest = ledd.filter(l => valgt.indexOf(l.id) < 0);
        if (sum !== 0) rest.push({ id: id0++, k: sum, v: navn });
        const hvor = ledd.findIndex(l => l.id === valgt[0]); ledd = rest; if (sum !== 0) { const sistn = ledd.pop(); ledd.splice(Math.min(hvor, ledd.length), 0, sistn); }
        valgt = []; vis();
        G.feedback(el, true, 'Fint! ' + regnestykke + ' = ' + F(sum) + (navn ? '. Bokstaven ' + navn + ' blir stående: ' + (sum === 0 ? '0' + navn + ' = 0, så leddet forsvinner.' : tekst({ k: sum, v: navn }) + '.') : '.'));
        if (ferdigsjekk()) {
          const rad = G.q(el, '.ll-nav'); G.q(el, '.ll-uttr').insertAdjacentHTML('afterend', ' <span aria-hidden="true">✅</span>');
          rad.innerHTML = '<p class="lesbar"><strong>Ferdig forenklet:</strong> ' + (ledd.length ? uttr() : '0') + '</p><button type="button" class="knapp primær ll-neste">' + (runde + 1 >= RUNDER ? 'Se resultatet' : 'Neste ▶') + '</button>';
          G.q(el, '.ll-neste').addEventListener('click', () => { runde++; if (runde >= RUNDER) return G.slutt(el, { ikon: '🎣', tittel: 'Fangsten er i land!', stjerner: G.stjerner(el, Math.max(0, 15 - feil * 3), 15), tekst: 'Du gjorde ' + feil + ' feilgrep.', lær: 'Bare like ledd kan slås sammen. Legg sammen tallene foran bokstaven, og behold bokstaven. x-er og y-er og vanlige tall er tre ulike «fiskeslag».', igjen: () => { runde = 0; feil = 0; lag(); } }); lag(); });
        }
      }
      lag();
    }
  });

  /* ===================== Mønsterjakten ===================== */
  G.add({
    id: 'monsterjakten', tittel: 'Mønsterjakten', ikon: '🔶', trinn: 8, temaer: ['8/monstre'],
    kort: 'Se hva som vokser, og finn regelen. Hvor mange prikker blir det i figur 20?',
    hvordan: 'Du får se de tre første figurene i et mønster. Finn først hvor mange prikker figur 4 har, så regelen for figur n, og til slutt hvor mange det er i en veldig stor figur. Tips: se på hva som er likt i alle figurene, og hva som øker.',
    lærer: 'Å finne regelen i et voksende mønster: hva som øker for hver figur (stigningen), og hva som alltid er med (startverdien). Regelen for figur n kan brukes til å regne ut en hvilken som helst figur.',
    start: function (el) {
      let runde = 0, poeng = 0, a, b, sp, steg;
      const RUNDER = 3;
      const navnRegel = (a, b) => a + 'n' + (b ? ' + ' + b : '');
      function figur(n) {
        let s = ''; const w = 22;
        for (let i = 0; i < n; i++) for (let j = 0; j < a; j++) s += '<circle cx="' + (14 + i * w) + '" cy="' + (40 + (a - 1 - j) * w) + '" r="8" fill="#3b82f6"/>';
        for (let j = 0; j < b; j++) s += '<circle cx="' + (14 + j * w) + '" cy="' + (40 + a * w + 4) + '" r="8" fill="#f97316"/>';
        return s;
      }
      function tegnFigurer() {
        let s = '', x = 0; const bredde = [1, 2, 3].map(n => Math.max(n, b) * 22 + 12);
        [1, 2, 3].forEach((n, i) => { s += '<g transform="translate(' + x + ',0)"><text x="4" y="20" font-weight="800" font-size="15">Figur ' + n + '</text>' + figur(n) + '</g>'; x += bredde[i] + 24; });
        return '<svg viewBox="0 0 ' + Math.max(x, 300) + ' ' + (40 + a * 22 + (b ? 30 : 0) + 12) + '" class="mj-svg" role="img" aria-label="De tre første figurene i mønsteret">' + s + '</svg>';
      }
      function ny() {
        a = G.rnd(2, 4); b = G.rnd(0, 3); if (runde === 0) b = G.rnd(0, 1); steg = 0; vis();
      }
      function vis() {
        const f4 = a * 4 + b, f20 = a * 20 + b;
        let spm, opts;
        if (steg === 0) { spm = 'Hvor mange prikker er det i <strong>figur 4</strong>?'; opts = G.alt(f4, [f4 + 1, f4 - 1, a * 3 + b + 1, f4 + a]); }
        else if (steg === 1) {
          spm = 'Hvilken regel gir antall prikker i <strong>figur n</strong>?';
          const kandidater = [[a, b], [a + 1, b], [a, b + 1], [b || a + 2, a], [a, b ? 0 : 1]]; const set = []; kandidater.forEach(k => { const t = navnRegel(k[0], k[1]); if (!set.some(s => s.t === t)) set.push({ t: t, ok: k[0] === a && k[1] === b }); });
          opts = G.shuffle(set.slice(0, 4)); if (!opts.some(o => o.ok)) opts[0] = { t: navnRegel(a, b), ok: true }; opts = G.shuffle(opts);
        }
        else { spm = 'Hvor mange prikker er det i <strong>figur 20</strong>?'; opts = G.alt(f20, [f20 + a, f20 - b, (a + b) * 20, f4 * 5, f20 + 1]); }
        el.innerHTML = tmpl('<span>Mønster ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Spørsmål ' + (steg + 1) + ' av 3</span><span>Poeng: ' + poeng + '</span>', '',
          '<div class="figur mj-figur">' + tegnFigurer() + '<p class="lesbar mj-tips">Blå prikker øker for hver figur. ' + (b ? 'Oransje prikker er alltid med.' : 'Her er det ingen faste prikker.') + '</p></div><p class="sp-spm lesbar">' + spm + '</p><div class="sp-rad mj-valg"></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad mj-nav"></div>');
        G.mc(G.q(el, '.mj-valg'), opts, ok => {
          if (ok) poeng++;
          const fk = steg === 0 ? 'Figur 1 har ' + (a + b) + ', figur 2 har ' + (2 * a + b) + ', figur 3 har ' + (3 * a + b) + '. Det øker med ' + a + ' hver gang, så figur 4 har ' + f4 + '.' : steg === 1 ? 'Det øker med ' + a + ' for hver figur, så regelen starter med ' + a + 'n. ' + (b ? 'De ' + b + ' oransje prikkene er alltid med, så vi legger til ' + b + '.' : 'Det er ingen faste prikker.') + ' Sjekk figur 2: ' + a + '·2' + (b ? ' + ' + b : '') + ' = ' + (2 * a + b) + '.' : 'Bruk regelen: ' + a + ' · 20' + (b ? ' + ' + b : '') + ' = ' + f20 + '.';
          G.feedback(el, ok, (ok ? 'Riktig! ' : 'Ikke helt. ') + fk);
          G.q(el, '.mj-nav').innerHTML = '<button type="button" class="knapp primær mj-neste">' + (steg === 2 && runde + 1 >= RUNDER ? 'Se resultatet' : 'Neste ▶') + '</button>';
          G.q(el, '.mj-neste').addEventListener('click', () => {
            if (steg < 2) { steg++; return vis(); }
            runde++; if (runde >= RUNDER) return G.slutt(el, { ikon: '🔶', tittel: 'Mønsterjeger!', stjerner: G.stjerner(el, poeng, RUNDER * 3), tekst: 'Du hadde ' + poeng + ' riktige av ' + (RUNDER * 3) + '.', lær: 'Regelen for et mønster har to deler: hvor mye det øker for hver figur (tallet foran n), og hva som alltid er med (tallet som legges til). Med regelen kan du regne ut en hvilken som helst figur.', igjen: () => { runde = 0; poeng = 0; ny(); } });
            ny();
          });
        });
      }
      ny();
    }
  });

  /* ===================== Myntjakt (kurver med glidebrytere) ===================== */
  function mynt(id, tittel, ikon, trinn, temaer, kort, hvordan, lærer, nivåer) {
    G.add({
      id: id, tittel: tittel, ikon: ikon, trinn: trinn, temaer: temaer, kort: kort, hvordan: hvordan, lærer: lærer,
      start: function (el) {
        let nr = 0, nivå, verdi, samlet, flyttet, hoppet;
        const W = 440, H = 380, X0 = -6, X1 = 6, Y0 = -8, Y1 = 9;
        const px = x => (x - X0) / (X1 - X0) * W, py = y => H - (y - Y0) / (Y1 - Y0) * H;
        function vis() {
          nivå = nivåer[nr]; verdi = {}; nivå.glid.forEach(g => verdi[g.n] = g.start); samlet = nivå.mynt.map(() => false); flyttet = 0; hoppet = false;
          el.innerHTML = tmpl('<span>Nivå ' + (nr + 1) + ' av ' + nivåer.length + '</span><span>Mynter: <b class="my-ant">0</b> av ' + nivå.mynt.length + '</span>', '<span class="lesbar">' + nivå.oppdrag + '</span>',
            '<div class="figur my-figur"><svg viewBox="0 0 ' + W + ' ' + H + '" class="my-svg" role="img" aria-label="Koordinatsystem med mynter og en kurve du styrer"><defs><clipPath id="my-klipp"><rect width="' + W + '" height="' + H + '"/></clipPath></defs><g id="my-rutenett"></g><g clip-path="url(#my-klipp)"><path id="my-kurve" d="" fill="none" stroke="#2563eb" stroke-width="3.5"/></g><g id="my-mynter"></g></svg></div>' +
            '<div class="my-formel lesbar" aria-live="polite"></div>' + nivå.glid.map(g => '<div class="sp-slider"><label for="my-' + g.n + '">' + g.tekst + ' <span id="my-v-' + g.n + '">' + F(g.start) + '</span></label><input id="my-' + g.n + '" type="range" min="' + g.min + '" max="' + g.max + '" step="' + g.steg + '" value="' + g.start + '"></div>').join('') +
            '<div class="sp-fb" aria-live="polite"></div><div class="sp-rad my-nav"><button type="button" class="knapp liten my-hopp">Gi opp dette nivået</button></div>');
          nivå.glid.forEach(g => { const s = G.q(el, '#my-' + g.n); s.addEventListener('input', () => { verdi[g.n] = +s.value; flyttet++; G.q(el, '#my-v-' + g.n).textContent = F(+s.value); tegn(); }); });
          G.q(el, '.my-hopp').addEventListener('click', hopp);
          let r = ''; for (let x = X0; x <= X1; x++) r += '<line x1="' + px(x) + '" x2="' + px(x) + '" y1="0" y2="' + H + '" stroke="' + (x === 0 ? '#14213d' : '#e2e8f0') + '" stroke-width="' + (x === 0 ? 2 : 1) + '"/>' + (x && x % 2 === 0 ? '<text x="' + px(x) + '" y="' + (py(0) + 14) + '" text-anchor="middle" font-size="11" fill="#52617a">' + F(x) + '</text>' : '');
          for (let y = Y0; y <= Y1; y++) r += '<line y1="' + py(y) + '" y2="' + py(y) + '" x1="0" x2="' + W + '" stroke="' + (y === 0 ? '#14213d' : '#e2e8f0') + '" stroke-width="' + (y === 0 ? 2 : 1) + '"/>' + (y && y % 2 === 0 ? '<text x="' + (px(0) + 4) + '" y="' + (py(y) + 4) + '" font-size="11" fill="#52617a">' + F(y) + '</text>' : '');
          G.q(el, '#my-rutenett').innerHTML = r; tegn();
        }
        function tegn() {
          let d = ''; for (let i = 0; i <= 240; i++) { const x = X0 + (X1 - X0) * i / 240, y = nivå.f(x, verdi); if (isFinite(y) && Math.abs(y) < 1000) d += (d ? 'L' : 'M') + R(px(x)) + ',' + R(py(y)); }
          G.q(el, '#my-kurve').setAttribute('d', d); G.q(el, '.my-formel').innerHTML = 'Funksjonen din: <strong>' + nivå.navn(verdi) + '</strong>';
          let n = 0; G.q(el, '#my-mynter').innerHTML = nivå.mynt.map((m, i) => { const tatt = Math.abs(nivå.f(m[0], verdi) - m[1]) < .26; samlet[i] = tatt; if (tatt) n++; return '<g><circle cx="' + px(m[0]) + '" cy="' + py(m[1]) + '" r="11" fill="' + (tatt ? '#facc15' : '#fde68a') + '" stroke="' + (tatt ? '#a16207' : '#d97706') + '" stroke-width="3"/><text x="' + px(m[0]) + '" y="' + (py(m[1]) + 5) + '" text-anchor="middle" font-size="13" font-weight="800">' + (tatt ? '★' : '$') + '</text></g>'; }).join('');
          G.q(el, '.my-ant').textContent = n;
          if (n === nivå.mynt.length && !hoppet) ferdig(true);
        }
        function ferdig(vant) {
          const rad = G.q(el, '.my-nav'); if (rad.dataset.ferdig) return; rad.dataset.ferdig = '1';
          G.feedback(el, true, vant ? 'Alle mynter er tatt! 🎉 ' + nivå.lær(verdi) : 'Her er en løsning: ' + nivå.lær(nivå.fasit));
          el.querySelectorAll('input[type=range]').forEach(s => s.disabled = true);
          rad.innerHTML = '<button type="button" class="knapp primær my-neste">' + (nr + 1 >= nivåer.length ? 'Se resultatet' : 'Neste nivå ▶') + '</button>';
          G.q(el, '.my-neste').addEventListener('click', () => { nr++; if (nr >= nivåer.length) return G.slutt(el, { ikon: '🪙', tittel: 'Alle mynter samlet!', tekst: 'Du klarte alle ' + nivåer.length + ' nivåene.', lær: lærer, igjen: () => { nr = 0; vis(); } }); vis(); });
        }
        function hopp() {
          if (!flyttet) return G.feedback(el, false, 'Prøv først! Flytt på glidebryterne og se hva som skjer med kurven, så kan du gi opp om det blir for vanskelig.');
          hoppet = true; verdi = Object.assign({}, nivå.fasit); nivå.glid.forEach(g => { const s = G.q(el, '#my-' + g.n); s.value = nivå.fasit[g.n]; G.q(el, '#my-v-' + g.n).textContent = F(nivå.fasit[g.n]); }); tegn(); ferdig(false);
        }
        vis();
      }
    });
  }
  const lin = (a, b) => ({ f: (x, v) => v.a * x + v.b });
  const sl = (n, t, min, max, st, start) => ({ n: n, tekst: t, min: min, max: max, steg: st, start: start });
  const fx = (v) => 'y = ' + (v.a === 1 ? '' : v.a === -1 ? '−' : F(v.a)) + 'x' + (v.b > 0 ? ' + ' + F(v.b) : v.b < 0 ? ' − ' + F(-v.b) : '');
  mynt('myntjakt-linje', 'Myntjakt: rette linjer', '🪙', 8, ['8/funksjoner', '8/representasjoner', '10/stigningstall'],
    'Styr en rett linje gjennom mynter ved å endre stigning og startverdi.',
    'Du styrer en funksjon y = ax + b med glidebrytere. a er hvor bratt linja er (stigningen), og b er hvor linja krysser y-aksen. Få linja til å gå gjennom alle myntene. Når kurven treffer en mynt, blir den til en stjerne.',
    'Hva tallene i y = ax + b gjør: a bestemmer hvor bratt linja er og om den går opp eller ned, b flytter linja opp og ned og forteller hvor den starter. Du får også sett at to punkter er nok til å bestemme en rett linje.',
    [
      { oppdrag: 'Nivå 1: Linja går gjennom origo (0, 0). Bare stigningen a kan endres. Fang myntene.', glid: [sl('a', 'a (stigning) =', -4, 4, .5, 0)], mynt: [[2, 4], [-3, -6], [4, 8]], f: (x, v) => v.a * x, navn: v => 'y = ' + F(v.a) + 'x', fasit: { a: 2 }, lær: v => 'Linja y = ' + F(v.a) + 'x går opp ' + F(v.a) + ' for hver 1 til høyre.' },
      { oppdrag: 'Nivå 2: Nå kan du også flytte linja opp og ned med b. Fang myntene.', glid: [sl('a', 'a (stigning) =', -4, 4, .5, 0), sl('b', 'b (startverdi) =', -6, 6, 1, 0)], mynt: [[0, 3], [2, 5], [-2, 1]], f: lin().f, navn: fx, fasit: { a: 1, b: 3 }, lær: v => 'Linja ' + fx(v) + ' krysser y-aksen i ' + F(v.b) + ' og stiger ' + F(v.a) + ' per 1 til høyre.' },
      { oppdrag: 'Nivå 3: Denne linja går nedover. Hva må stigningen være da?', glid: [sl('a', 'a (stigning) =', -4, 4, .5, 0), sl('b', 'b (startverdi) =', -6, 6, 1, 0)], mynt: [[-2, 5], [0, 3], [3, 0]], f: lin().f, navn: fx, fasit: { a: -1, b: 3 }, lær: v => 'Stigningen er negativ (' + F(v.a) + '), så linja synker når x øker.' },
      { oppdrag: 'Nivå 4: Brøkstigning! Nå må a være litt mindre enn et helt tall.', glid: [sl('a', 'a (stigning) =', -4, 4, .5, 0), sl('b', 'b (startverdi) =', -6, 6, 1, 0)], mynt: [[-4, -3], [0, -1], [4, 1]], f: lin().f, navn: fx, fasit: { a: .5, b: -1 }, lær: v => 'Stigningen ' + F(v.a) + ' betyr at linja går opp 1 når x øker med 2.' },
      { oppdrag: 'Nivå 5: Finn linja som går gjennom tre punkter du ikke får noen hint om.', glid: [sl('a', 'a (stigning) =', -4, 4, .5, 0), sl('b', 'b (startverdi) =', -6, 6, 1, 0)], mynt: [[-4, 5], [-2, 1], [2, -7]], f: lin().f, navn: fx, fasit: { a: -2, b: -3 }, lær: v => 'Stigningstallet finner du ved å se hvor mye y endrer seg når x øker med 1: her ' + F(v.a) + '.' }
    ]);
  const kvf = v => 'y = ' + (v.a === 1 ? '' : v.a === -1 ? '−' : F(v.a)) + 'x² ' + (v.c > 0 ? '+ ' + F(v.c) : v.c < 0 ? '− ' + F(-v.c) : '').trim();
  mynt('myntjakt-kurver', 'Myntjakt: kurver', '🪙', 10, ['10/funksjonstyper', '10/modellering', '10/vekstfaktor'],
    'Styr parabler og vekstkurver gjennom mynter, og lær hva som gjør hver type funksjon spesiell.',
    'Du styrer ulike funksjoner med glidebrytere og skal få kurven gjennom alle myntene. Først en rett linje, så en parabel (x i andre potens) og til slutt en eksponentiell vekst. Når kurven treffer en mynt, blir den til en stjerne.',
    'Forskjellen mellom funksjonstyper: en rett linje vokser like mye hver gang, en parabel har et toppunkt/bunnpunkt og er symmetrisk, og en eksponentiell funksjon vokser med samme faktor hver gang (vekstfaktoren).',
    [
      { oppdrag: 'Nivå 1: Rett linje. Fang myntene.', glid: [sl('a', 'a (stigning) =', -3, 3, .5, 0), sl('b', 'b (startverdi) =', -6, 6, 1, 0)], mynt: [[-2, -1], [0, 1], [3, 7]], f: lin().f, navn: fx, fasit: { a: 2, b: 1 }, lær: v => 'En lineær funksjon har konstant stigning: ' + fx(v) + '.' },
      { oppdrag: 'Nivå 2: Parabel y = a·x² + c. Endre a for å gjøre den smal eller bred, og c for å flytte den opp og ned.', glid: [sl('a', 'a =', -2, 2, .25, 1), sl('c', 'c =', -6, 6, 1, 0)], mynt: [[0, -2], [2, 2], [-2, 2], [3, 7]], f: (x, v) => v.a * x * x + v.c, navn: kvf, fasit: { a: 1, c: -2 }, lær: v => kvf(v) + ' er symmetrisk om y-aksen, og bunnpunktet ligger der x = 0.' },
      { oppdrag: 'Nivå 3: En parabel som åpner nedover (a er negativ).', glid: [sl('a', 'a =', -2, 2, .25, 1), sl('c', 'c =', -6, 8, 1, 0)], mynt: [[0, 6], [2, 2], [-2, 2], [3, -3]], f: (x, v) => v.a * x * x + v.c, navn: kvf, fasit: { a: -1, c: 6 }, lær: v => 'Når a er negativ, åpner parabelen nedover og har et toppunkt, her i (0, ' + F(v.c) + ').' },
      { oppdrag: 'Nivå 4: Eksponentiell vekst y = a · b^x. a er startverdien (x = 0) og b er vekstfaktoren.', glid: [sl('a', 'a (start) =', 1, 4, 1, 1), sl('b', 'b (vekstfaktor) =', .5, 3, .5, 1)], mynt: [[0, 2], [1, 4], [2, 8], [-1, 1]], f: (x, v) => v.a * Math.pow(v.b, x), navn: v => 'y = ' + F(v.a) + ' · ' + F(v.b) + '^x', fasit: { a: 2, b: 2 }, lær: v => 'Hver gang x øker med 1, ganges y med ' + F(v.b) + '. Det er vekstfaktoren.' },
      { oppdrag: 'Nivå 5: Eksponentiell nedgang. Vekstfaktoren må være mindre enn 1.', glid: [sl('a', 'a (start) =', 1, 8, 1, 1), sl('b', 'b (vekstfaktor) =', .5, 3, .5, 1)], mynt: [[0, 4], [1, 2], [2, 1], [-1, 8]], f: (x, v) => v.a * Math.pow(v.b, x), navn: v => 'y = ' + F(v.a) + ' · ' + F(v.b) + '^x', fasit: { a: 4, b: .5 }, lær: v => 'Med vekstfaktor ' + F(v.b) + ' halveres y for hver gang x øker med 1. Det er en eksponentiell nedgang på 50 %.' }
    ]);
})();
