/* Spill B: Likningsmaskinen, Ulikhets-vakten, Like-ledd-fisking, Mønsterjakten, Myntjakt (rette linjer og kurver) */
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

  /* ===================== Likningsmaskinen ===================== */
  function venstre(a, b) {
    let s = (a === 1 ? '' : a === -1 ? '−' : F(a)) + 'x';
    if (b > 0) s += ' + ' + F(b); else if (b < 0) s += ' − ' + F(-b);
    return s;
  }
  G.add({
    id: 'ligningsmaskinen', tittel: 'Likningsmaskinen', ikon: '⚖️', trinn: 8, temaer: ['8/ligninger'],
    kort: 'Hold vekta i balanse og få x helt for seg selv. Sjekk svaret til slutt.',
    hvordan: 'Likningen er en vekt. Det du gjør på den ene siden, må du gjøre på den andre. Velg regneart og tall, og trykk «Gjør på begge sider». Målet er at det står «x = …» med færrest mulig trekk. Du kan bare dele hvis det går opp. Står du fast, kan du trykke 💡 for et hint, eller ↩️ for å angre. På Vanlig og Utfordring tester du svaret ditt til slutt ved å sette det inn i den første likningen. På Utfordring kan både x og tallet foran x være negative, og du kan gange og dele med negative tall.',
    lærer: 'Å løse likninger ved å gjøre det samme på begge sider: først fjerne tallet som står alene (pluss eller minus), så dele på tallet foran x. Du sjekker svaret ved å sette det inn i den første likningen. Med negative tall foran x må du dele på et negativt tall.',
    start: function (el) {
      let runde = 0, poeng = 0, a, b, c, a0, b0, c0, x, trekk, par, op = '+', n = 1, logg, ferdig, brukteHint, hist, RUNDER;
      const nMin = () => G.niv() === 2 ? -20 : 1;
      function ny() {
        const niv = G.niv(); RUNDER = G.pr(5, 6, 7);
        x = G.rnd(2, G.pr(6, 9, 12)); if (niv === 2 && runde >= 3 && Math.random() < .5) x = -x;
        const maksA = G.pr(4, 6, 9), maksB = G.pr(6, 9, 15);
        a = runde < 2 ? G.rnd(2, Math.min(maksA, 5)) : G.rnd(2, maksA);
        b = runde < 2 ? 0 : G.rnd(1, maksB) * (niv === 0 || Math.random() < .5 ? 1 : -1);
        if (runde === 2) { a = 1; b = G.rnd(2, maksB) * (niv === 0 ? 1 : Math.random() < .5 ? 1 : -1); }
        if (niv === 2 && runde >= 4 && Math.random() < .5) a = -a;
        c = a * x + b; a0 = a; b0 = b; c0 = c;
        par = (a !== 1 ? 1 : 0) + (b !== 0 ? 1 : 0); if (par === 0) par = 1;
        trekk = 0; logg = []; ferdig = false; brukteHint = false; hist = []; op = b !== 0 ? (b > 0 ? '−' : '+') : '÷'; n = b !== 0 ? Math.abs(b) : a !== 1 ? a : 1; vis();
      }
      const nesteSteg = () => b !== 0 ? { op: b > 0 ? '−' : '+', n: Math.abs(b), t: 'Tallet som står alene er ' + F(b) + '. Gjør det motsatte: «' + (b > 0 ? '−' : '+') + ' ' + Math.abs(b) + '» på begge sider.' } : { op: '÷', n: a, t: 'Nå står det ' + F(a) + 'x. Del begge sider på tallet foran x: «÷ ' + F(a) + '».' };
      function vis() {
        el.innerHTML = tmpl('<span>Oppgave ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Trekk: ' + trekk + ' (best: ' + par + ')</span><span>Poeng: ' + poeng + '</span>', '',
          '<div class="lm-vekt" aria-label="Likning: ' + venstre(a, b) + ' er lik ' + F(c) + '"><div class="lm-side"><span>' + venstre(a, b) + '</span></div><div class="lm-lik">⚖️ =</div><div class="lm-side"><span>' + F(c) + '</span></div></div>' +
          '<div class="lm-logg">' + (logg.length ? logg.join('<br>') : 'Ingen trekk ennå.') + '</div>' +
          '<div class="sp-rad lm-ops" role="group" aria-label="Regneart">' + ['+', '−', '×', '÷'].map(o => '<button type="button" class="sp-valg lm-op' + (o === op ? ' valgt' : '') + '" data-o="' + o + '">' + o + '</button>').join('') +
          '<span class="lm-n"><button type="button" class="sp-valg lm-minus" aria-label="Mindre">−</button><strong class="lm-tall" aria-live="polite">' + n + '</strong><button type="button" class="sp-valg lm-pluss" aria-label="Mer">+</button></span></div>' +
          '<div class="sp-rad"><button type="button" class="knapp primær lm-gjør">Gjør «' + op + ' ' + F(n) + '» på begge sider</button><button type="button" class="knapp liten lm-hint">💡 Hint</button><button type="button" class="knapp liten lm-angre"' + (hist.length ? '' : ' disabled') + '>↩️ Angre</button></div><div class="sp-hint lesbar lm-hintboks" hidden></div><div class="sp-fb" aria-live="polite"></div><div class="lm-sjekk"></div><div class="sp-rad lm-nav"></div>');
        el.querySelectorAll('.lm-op').forEach(b => b.addEventListener('click', () => { op = b.dataset.o; vis(); }));
        G.q(el, '.lm-minus').addEventListener('click', () => { n = Math.max(nMin(), n - 1); if (n === 0) n = -1; n = Math.max(nMin(), n); vis(); });
        G.q(el, '.lm-pluss').addEventListener('click', () => { n = Math.min(20, n + 1); if (n === 0) n = 1; vis(); });
        G.q(el, '.lm-gjør').addEventListener('click', gjør);
        G.q(el, '.lm-hint').addEventListener('click', () => { brukteHint = true; const h = nesteSteg(), hb = G.q(el, '.lm-hintboks'); hb.hidden = false; hb.innerHTML = '<strong>Hint:</strong> ' + h.t; });
        G.q(el, '.lm-angre').addEventListener('click', () => { const s = hist.pop(); if (!s) return; a = s.a; b = s.b; c = s.c; trekk = s.trekk; logg = s.logg; vis(); });
        if (ferdig) { el.querySelectorAll('.lm-gjør,.lm-hint,.lm-angre,.lm-op,.lm-minus,.lm-pluss').forEach(b => b.disabled = true); }
      }
      function gjør() {
        if (ferdig) return;
        let na = a, nb = b, nc = c;
        if (op === '+') { nb += n; nc += n; } else if (op === '−') { nb -= n; nc -= n; } else if (op === '×') { na *= n; nb *= n; nc *= n; }
        else { if (a % n || b % n || c % n) { return G.feedback(el, false, 'Det går ikke opp: ' + F(a) + ', ' + F(b) + ' og ' + F(c) + ' kan ikke alle deles på ' + F(n) + '. Når du deler, må alle tall på begge sider kunne deles. Prøv noe annet.'); } na /= n; nb /= n; nc /= n; }
        hist.push({ a: a, b: b, c: c, trekk: trekk, logg: logg.slice() });
        logg.push((trekk + 1) + '. ' + op + ' ' + F(n) + ' på begge sider → ' + venstre(na, nb) + ' = ' + F(nc));
        a = na; b = nb; c = nc; trekk++;
        if (a === 1 && b === 0) {
          ferdig = true; const p = Math.min(brukteHint ? 2 : 3, trekk <= par ? 3 : trekk <= par + 1 ? 2 : 1); poeng += p; vis();
          G.feedback(el, true, 'Ferdig! <strong>x = ' + F(c) + '</strong>. +' + p + ' poeng' + (trekk <= par && !brukteHint ? ' (perfekt, du brukte færrest mulig trekk)' : brukteHint ? ' (maks 2 når du bruker hint)' : '') + '.');
          return G.niv() === 0 ? visSjekkTekst() : test();
        }
        if (trekk >= 8 || Math.abs(c) > 400) { ferdig = true; vis(); G.feedback(el, false, 'Den ble for rotete. Husk: først fjerne tallet som står alene (pluss/minus), så dele på tallet foran x. Svaret var x = ' + F(x) + '. Du får prøve en ny.'); return neste(); }
        vis(); G.feedback(el, true, 'Fortsatt i balanse! Du gjorde det samme på begge sider.');
      }
      function visSjekkTekst() {
        G.q(el, '.lm-sjekk').innerHTML = '<p class="lesbar"><strong>Sjekk:</strong> sett x = ' + F(x) + ' inn i ' + venstre(a0, b0) + ' = ' + F(c0) + ': ' + F(a0) + ' · ' + (x < 0 ? '(' + F(x) + ')' : F(x)) + (b0 > 0 ? ' + ' + F(b0) : b0 < 0 ? ' − ' + F(-b0) : '') + ' = ' + F(c0) + '. Det stemmer. ✔</p>';
        neste();
      }
      function test() {
        G.q(el, '.lm-sjekk').innerHTML = '<p class="sp-spm lesbar"><strong>Test svaret:</strong> sett x = ' + F(x) + ' inn i den første likningen, ' + venstre(a0, b0) + ' = ' + F(c0) + '. Hva blir <strong>venstre side</strong>? (Det skal bli det samme som høyre side.)</p><div class="lm-skriv"></div>';
        const xs = x < 0 ? '(' + F(x) + ')' : F(x);
        G.skriv(el, G.q(el, '.lm-skriv'), { fasit: c0, ledetekst: 'Venstre side', hint: ['Bytt ut x med ' + F(x) + ': ' + F(a0) + ' · ' + xs + (b0 > 0 ? ' + ' + F(b0) : b0 < 0 ? ' − ' + F(-b0) : ''), 'Regn ut ' + F(a0) + ' · ' + xs + ' = ' + F(a0 * x) + ' først.'], fn: function (ok) {
          if (ok) poeng++;
          G.feedback(el, ok, ok ? 'Ja! Venstre side blir ' + F(c0) + ', akkurat som høyre side. Da vet du at x = ' + F(x) + ' er riktig. ✔' : 'Venstre side blir ' + F(a0) + ' · ' + xs + (b0 > 0 ? ' + ' + F(b0) : b0 < 0 ? ' − ' + F(-b0) : '') + ' = ' + F(c0) + '.');
          neste();
        } });
      }
      function neste() {
        const rad = G.q(el, '.lm-nav'); rad.innerHTML = '<button type="button" class="knapp primær lm-neste">' + (runde + 1 >= RUNDER ? 'Se resultatet' : 'Neste likning ▶') + '</button>';
        G.q(el, '.lm-neste').addEventListener('click', () => { runde++; if (runde >= RUNDER) { const mx = RUNDER * (G.niv() === 0 ? 3 : 4); return G.slutt(el, { ikon: '⚖️', tittel: 'Balansekunstner!', stjerner: G.stjerner(el, poeng, mx), tekst: 'Du fikk ' + poeng + ' av ' + mx + ' poeng.', lær: 'For å løse en likning gjør du det samme på begge sider. Fjern først tallet som står alene, del så på tallet foran x. Til slutt kan du alltid sjekke svaret ved å sette det inn i den første likningen.', igjen: () => { runde = 0; poeng = 0; ny(); } }); } ny(); });
      }
      ny();
    }
  });

  /* ===================== Ulikhets-vakten ===================== */
  const TEGN = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' };
  const passer = (v, t, g) => t === '<' ? v < g : t === '>' ? v > g : t === '≤' ? v <= g : v >= g;
  function tallinje(x0, tegn, gjest) {
    const LO = -10, HI = 12, X = v => 16 + (v - LO) / (HI - LO) * 408, åpen = tegn === '<' || tegn === '>', mot = tegn === '<' || tegn === '≤' ? -1 : 1;
    let s = '<svg viewBox="0 0 440 74" class="uv-svg" role="img" aria-label="Tallinje som viser løsningen x ' + tegn + ' ' + x0 + '">';
    s += '<line x1="' + X(mot < 0 ? LO : x0) + '" x2="' + X(mot < 0 ? x0 : HI) + '" y1="34" y2="34" stroke="#2563eb" stroke-width="9" stroke-linecap="round" opacity=".55"/>';
    s += '<line x1="16" x2="424" y1="34" y2="34" stroke="#14213d" stroke-width="2.5"/>';
    for (let i = LO; i <= HI; i += 2) s += '<line x1="' + X(i) + '" x2="' + X(i) + '" y1="28" y2="40" stroke="#14213d" stroke-width="2"/><text x="' + X(i) + '" y="58" text-anchor="middle" font-size="11" font-weight="700">' + F(i) + '</text>';
    s += '<circle cx="' + X(x0) + '" cy="34" r="8" fill="' + (åpen ? '#fff' : '#2563eb') + '" stroke="#2563eb" stroke-width="3.5"/>';
    if (gjest !== undefined && gjest >= LO && gjest <= HI) s += '<text x="' + X(gjest) + '" y="22" text-anchor="middle" font-size="17">🧑‍🎤</text>';
    return s + '</svg>';
  }
  G.add({
    id: 'ulikhetsvakten', tittel: 'Ulikhets-vakten', ikon: '🛡️', trinn: 8, temaer: ['8/ulikheter'],
    kort: 'Du er dørvakt. Slipp inn de tallene som passer i ulikheten, og løs den først.',
    hvordan: 'Ulikheten på skiltet bestemmer hvem som får komme inn. Hver gjest har et tall. Trykk «Slipp inn» hvis tallet passer, og «Avvis» hvis ikke. Det er tre runder: først enkle ulikheter, så ulikheter du må løse, og til slutt ulikheter der tegnet snur. På Vanlig og Utfordring må du forutsi løsningen før gjestene kommer, og gjestene står tett ved grensen. Etter hvert svar ser du løsningen på tallinja.',
    lærer: 'Hva en ulikhet betyr: mange tall passer, ikke bare ett. Du øver på &lt; &gt; ≤ ≥, på å løse ulikheter, på forskjellen mellom hel og åpen sirkel på tallinja, og på at ulikhetstegnet snur når du ganger eller deler med et negativt tall.',
    start: function (el) {
      let fase, gjest, liv, poeng, nr, regel, PER, TOT, ekstra;
      function lagRegel() {
        const niv = G.niv(), tegn = G.pick(['<', '>', '≤', '≥']), sp = G.pr(4, 6, 9);
        if (fase === 1) { const g = G.rnd(-sp + 1, sp + 2); return { tekst: 'x ' + tegn + ' ' + F(g), test: v => passer(v, tegn, g), x0: g, tegn: tegn, steg: '' }; }
        if (fase === 2) { const a = G.rnd(2, G.pr(3, 4, 6)), x0 = G.rnd(-sp, sp), b = G.rnd(1, G.pr(5, 6, 10)) * (Math.random() < .5 ? -1 : 1), c = a * x0 + b; return { tekst: venstre(a, b) + ' ' + tegn + ' ' + F(c), test: v => passer(a * v + b, tegn, c), x0: x0, tegn: tegn, a: a, b: b, c: c, steg: 'Trekk fra ' + F(b) + ' på begge sider: ' + F(a) + 'x ' + tegn + ' ' + F(c - b) + '. Del så på ' + a + ': x ' + tegn + ' ' + F(x0) + '.' }; }
        const a = -G.rnd(2, G.pr(3, 4, 6)), x0 = G.rnd(-sp, sp), b = niv === 0 ? 0 : G.rnd(0, 1) ? G.rnd(1, 6) * (Math.random() < .5 ? -1 : 1) : 0, c = a * x0 + b, snu = TEGN[tegn];
        return { tekst: venstre(a, b) + ' ' + tegn + ' ' + F(c), test: v => passer(a * v + b, tegn, c), x0: x0, tegn: snu, a: a, b: b, c: c, steg: (b ? 'Trekk fra ' + F(b) + ': ' + F(a) + 'x ' + tegn + ' ' + F(c - b) + '. ' : '') + 'Når du deler på ' + F(a) + ' (negativt) snur tegnet: x ' + snu + ' ' + F(x0) + '.' };
      }
      function nyGjest() {
        if (!regel) regel = lagRegel();
        for (let k = 0; k < 60; k++) {
          const nær = fase > 1 && G.niv() > 0 && Math.random() < .6; gjest = nær ? regel.x0 + G.rnd(-1, 1) : G.rnd(-8, 12);
          const inn = regel.test(gjest); if (k > 12 || inn === (Math.random() < .5)) break;
        }
        vis();
      }
      function hud() { return '<span>Runde ' + fase + ' av 3</span><span>Gjest ' + (nr + 1) + ' av ' + TOT + '</span><span>' + G.hearts(liv) + '</span>'; }
      function vis() {
        el.innerHTML = tmpl(hud(), '',
          '<div class="uv-skilt"><span class="uv-liten">Skiltet sier</span><span class="uv-regel">' + regel.tekst + '</span></div>' + (G.niv() === 0 ? '<div class="figur uv-linje">' + tallinje(regel.x0, regel.tegn, gjest) + '<p class="lesbar uv-tips">Slik ser løsningen ut på tallinja: ' + (regel.tegn === '<' || regel.tegn === '>' ? 'åpen sirkel (tallet selv slipper ikke inn)' : 'fylt sirkel (tallet selv slipper inn)') + '.</p></div>' : '') +
          '<div class="uv-gjest" aria-live="polite"><span class="uv-ansikt" aria-hidden="true">🧑‍🎤</span><span>Gjesten har tallet</span><strong class="uv-tall">' + F(gjest) + '</strong></div>' +
          '<div class="sp-rad uv-knapper"><button type="button" class="sp-valg uv-inn">✅ Slipp inn</button><button type="button" class="sp-valg uv-ut">⛔ Avvis</button></div><div class="sp-fb" aria-live="polite"></div><div class="figur uv-linje2"></div><div class="sp-rad uv-nav"></div>');
        G.q(el, '.uv-inn').addEventListener('click', () => svar(true)); G.q(el, '.uv-ut').addEventListener('click', () => svar(false));
      }
      function svar(inn) {
        const rett = regel.test(gjest), ok = inn === rett; el.querySelectorAll('.uv-knapper button').forEach(b => b.disabled = true);
        if (ok) poeng++; else liv--;
        G.feedback(el, ok, (ok ? 'Riktig! ' : 'Æsj, feil. ') + F(gjest) + (rett ? ' passer' : ' passer ikke') + ' i ' + regel.tekst + '.' + (fase === 1 ? ' Løsningen er x ' + regel.tegn + ' ' + F(regel.x0) + (regel.tegn === '≤' || regel.tegn === '≥' ? ', og ' + F(regel.x0) + ' selv er med.' : ', men ' + F(regel.x0) + ' selv er ikke med.') : ' Ulikheten betyr x ' + regel.tegn + ' ' + F(regel.x0) + '. ' + regel.steg));
        if (G.niv() > 0) G.q(el, '.uv-linje2').innerHTML = tallinje(regel.x0, regel.tegn, gjest);
        G.q(el, '.sp-hud').innerHTML = hud();
        nr++; const rad = G.q(el, '.uv-nav'); const slutt = liv <= 0 || nr >= TOT;
        rad.innerHTML = '<button type="button" class="knapp primær uv-neste">' + (slutt ? 'Se resultatet' : 'Neste gjest ▶') + '</button>';
        G.q(el, '.uv-neste').addEventListener('click', () => {
          if (slutt) { const mx = TOT + ekstra; return G.slutt(el, { ikon: liv > 0 ? '🛡️' : '😵', tittel: liv > 0 ? 'Vakt av høyeste klasse!' : 'Vakten ble sendt hjem', stjerner: G.stjerner(el, poeng, mx), tekst: 'Du fikk ' + poeng + ' poeng av ' + mx + '.', lær: 'En ulikhet har mange løsninger. Løs den som en likning, men snu ulikhetstegnet når du ganger eller deler med et negativt tall. På tallinja viser en åpen sirkel at tallet ikke er med (< og >), og en fylt sirkel at det er med (≤ og ≥).', igjen: start2 }); }
          if (nr % PER === 0) { fase++; regel = null; if (G.niv() > 0) forutsi(); else nyGjest(); } else nyGjest();
        });
      }
      /* forutsi løsningen før gjestene kommer (Vanlig og Utfordring) */
      function forutsi() {
        regel = lagRegel(); const rett = 'x ' + regel.tegn + ' ' + F(regel.x0);
        const set = [{ t: rett, ok: true }];
        const legg = t => { if (!set.some(s => s.t === t)) set.push({ t: t, ok: false }); };
        legg('x ' + TEGN[regel.tegn] + ' ' + F(regel.x0)); legg('x ' + regel.tegn + ' ' + F(regel.x0 + 1)); legg('x ' + regel.tegn + ' ' + F(regel.c)); legg('x ' + regel.tegn + ' ' + F(regel.x0 - 1));
        el.innerHTML = tmpl(hud(), '', '<div class="uv-skilt"><span class="uv-liten">Nytt skilt</span><span class="uv-regel">' + regel.tekst + '</span></div><p class="sp-spm lesbar">Forutsi: hvilke tall slipper inn? Hva er løsningen på ulikheten?</p><div class="sp-rad uv-valg"></div><div class="sp-fb" aria-live="polite"></div><div class="figur uv-linje2"></div><div class="sp-rad uv-nav"></div>');
        G.mc(G.q(el, '.uv-valg'), G.shuffle(set.slice(0, 4)), ok => {
          if (ok) poeng++; G.feedback(el, ok, (ok ? 'Riktig! ' : 'Ikke helt. ') + 'Løsningen er <strong>' + rett + '</strong>. ' + regel.steg);
          G.q(el, '.uv-linje2').innerHTML = tallinje(regel.x0, regel.tegn);
          G.q(el, '.uv-nav').innerHTML = '<button type="button" class="knapp primær uv-start">Åpne døra ▶</button>'; G.q(el, '.uv-start').addEventListener('click', nyGjest);
        });
      }
      function start2() { PER = G.pr(4, 5, 5); TOT = PER * 3; ekstra = G.niv() > 0 ? 2 : 0; fase = 1; liv = G.liv(); poeng = 0; nr = 0; regel = lagRegel(); nyGjest(); }
      start2();
    }
  });

  /* ===================== Like-ledd-fisking ===================== */
  G.add({
    id: 'like-ledd', tittel: 'Like-ledd-fisking', ikon: '🎣', trinn: 8, temaer: ['8/uttrykk'],
    kort: 'Forutsi hvor mange ledd som er igjen, fisk opp like ledd og slå dem sammen.',
    hvordan: 'Du får et uttrykk der hvert ledd er en fisk. Trykk på fiskene som har samme bokstavdel (for eksempel alle x-ene), og trykk «Slå sammen». Når alle like ledd er slått sammen, er uttrykket ferdig forenklet. Du kan ikke slå sammen x og y, og heller ikke x og x². På Vanlig og Utfordring må du først forutsi hvor mange ledd uttrykket har når det er ferdig forenklet. På Utfordring kan ledd forsvinne (for eksempel 3x − 3x = 0) og det finnes x² også. Trenger du hjelp, trykk 💡.',
    lærer: 'Å forenkle uttrykk: bare like ledd (samme variabel, eller bare tall) kan slås sammen. Koeffisientene legges sammen, og bokstavdelen blir stående. Hvis koeffisientene til to like ledd er motsatte tall, forsvinner leddet.',
    start: function (el) {
      let runde = 0, feil = 0, feilRunde = 0, poeng = 0, ledd, valgt, id0, RUNDER, spådd = 0;
      function lag() {
        const niv = G.niv(), vs = niv === 0 ? ['x', ''] : niv === 1 ? (runde < 2 ? ['x', ''] : ['x', 'y', '']) : (runde < 2 ? ['x', 'y', ''] : ['x', 'y', 'x²', '']);
        const m = G.pr(6, 9, 12); ledd = []; id0 = 0;
        vs.forEach((v, gi) => {
          const ant = niv === 0 ? 2 : niv === 1 ? G.rnd(2, 3) : (gi === vs.length - 1 && Math.random() < .35 ? 1 : G.rnd(2, 3));
          const første = id0; for (let i = 0; i < ant; i++) ledd.push({ id: id0++, k: G.rnd(1, m) * (Math.random() < (niv === 0 ? .15 : .35) ? -1 : 1), v: v });
          if (niv === 2 && runde >= 2 && gi === 0 && ant >= 2 && Math.random() < .6) ledd[første + 1].k = -ledd[første].k;
        });
        if (!ledd.some((l, i) => ledd.some((m2, j) => j !== i && m2.v === l.v))) ledd[1].v = ledd[0].v;
        ledd = G.shuffle(ledd); valgt = []; feilRunde = 0;
        const sum = {}; ledd.forEach(l => sum[l.v] = (sum[l.v] || 0) + l.k); spådd = Object.keys(sum).filter(k => sum[k] !== 0).length;
        if (niv > 0) forutsi(); else vis();
      }
      const tekst = l => (l.v ? (l.k === 1 ? '' : l.k === -1 ? '−' : F(l.k)) + l.v : F(l.k));
      const uttr = () => ledd.map((l, i) => (i === 0 ? tekst(l) : l.k < 0 ? '− ' + tekst({ k: -l.k, v: l.v }) : '+ ' + tekst(l))).join(' ');
      const gr = () => { const m = {}; ledd.forEach(l => m[l.v] = (m[l.v] || 0) + 1); return m; };
      const ferdigsjekk = () => Object.keys(gr()).every(k => gr()[k] === 1);
      const klasse = v => v === 'x²' ? 'x2' : v || 'tall';
      const hudHTML = () => '<span>Oppgave ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Poeng: ' + poeng + '</span><span>Feilgrep: ' + feil + '</span>';
      function forutsi() {
        const set = [{ t: String(spådd), ok: true }]; [spådd + 1, spådd - 1, spådd + 2, ledd.length].forEach(v => { if (v >= 0 && !set.some(s => s.t === String(v))) set.push({ t: String(v), ok: false }); });
        el.innerHTML = tmpl(hudHTML(), 'Forutsi: Forenkle <span class="ll-uttr">' + uttr() + '</span>. Hvor mange ledd er det igjen når uttrykket er ferdig forenklet?', '<div class="sp-rad ll-pred"></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad ll-nav"></div>');
        G.mc(G.q(el, '.ll-pred'), G.shuffle(set.slice(0, 4)), ok => {
          if (ok) poeng++; G.feedback(el, ok, (ok ? 'Godt tenkt! ' : 'Ikke helt. ') + 'Teller du de ulike «fiskeslagene» (x, y, x² og vanlige tall), og sjekker om noen ledd tar ut hverandre, får du ' + spådd + '. Nå kan du teste det.');
          G.q(el, '.ll-nav').innerHTML = '<button type="button" class="knapp primær ll-start">Start fisking ▶</button>'; G.q(el, '.ll-start').addEventListener('click', vis);
        });
      }
      function vis() {
        el.innerHTML = tmpl(hudHTML(), 'Forenkle: <span class="ll-uttr">' + uttr() + '</span>',
          '<div class="ll-dam" aria-label="Fiskedam med ledd">' + ledd.map(l => '<button type="button" class="ll-fisk' + (valgt.indexOf(l.id) >= 0 ? ' valgt' : '') + ' ll-' + klasse(l.v) + '" data-id="' + l.id + '" aria-pressed="' + (valgt.indexOf(l.id) >= 0) + '"><span aria-hidden="true">🐟</span><strong>' + tekst(l) + '</strong></button>').join('') + '</div>' +
          '<div class="sp-rad"><button type="button" class="knapp primær ll-sam"' + (valgt.length < 2 ? ' disabled' : '') + '>🎣 Slå sammen (' + valgt.length + ')</button><button type="button" class="knapp liten ll-nullstill"' + (valgt.length ? '' : ' disabled') + '>Fjern valg</button><button type="button" class="knapp liten ll-hint">💡 Hint</button></div><div class="sp-hint lesbar ll-hintboks" hidden></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad ll-nav"></div>');
        el.querySelectorAll('.ll-fisk').forEach(b => b.addEventListener('click', () => { const id = +b.dataset.id, i = valgt.indexOf(id); if (i >= 0) valgt.splice(i, 1); else valgt.push(id); vis(); }));
        G.q(el, '.ll-sam').addEventListener('click', sam); G.q(el, '.ll-nullstill').addEventListener('click', () => { valgt = []; vis(); });
        G.q(el, '.ll-hint').addEventListener('click', () => {
          const m = gr(), nøkler = Object.keys(m).filter(k => m[k] > 1), k = nøkler[0], liste = ledd.filter(l => l.v === k).map(tekst);
          const hb = G.q(el, '.ll-hintboks'); hb.hidden = false; hb.innerHTML = '<strong>Hint:</strong> ' + (k ? 'Disse er like ledd, og kan slås sammen: ' + liste.join(', ') + '.' : 'Alt er slått sammen!');
        });
      }
      function sam() {
        const v = ledd.filter(l => valgt.indexOf(l.id) >= 0); const typer = v.map(l => l.v).filter((x, i, a) => a.indexOf(x) === i);
        if (typer.length > 1) { feil++; feilRunde++; valgt = []; vis(); return G.feedback(el, false, 'Nei, de er ikke like ledd. Du kan bare slå sammen ledd som har <strong>samme bokstavdel</strong> (eller som alle er vanlige tall). 3x og 4y kan ikke slås sammen, og det kan heller ikke 3x og 4x². Men 3x og 4x kan.'); }
        const sum = v.reduce((s, l) => s + l.k, 0), navn = typer[0], regnestykke = v.map((l, i) => (i && l.k > 0 ? '+ ' : i ? '− ' : '') + (i && l.k < 0 ? F(-l.k) : F(l.k))).join(' ');
        const rest = ledd.filter(l => valgt.indexOf(l.id) < 0);
        if (sum !== 0) rest.push({ id: id0++, k: sum, v: navn });
        const hvor = ledd.findIndex(l => l.id === valgt[0]); ledd = rest; if (sum !== 0) { const sistn = ledd.pop(); ledd.splice(Math.min(hvor, ledd.length), 0, sistn); }
        valgt = []; vis();
        G.feedback(el, true, 'Fint! ' + regnestykke + ' = ' + F(sum) + (navn ? '. Bokstaven ' + navn + ' blir stående: ' + (sum === 0 ? '0' + navn + ' = 0, så leddet forsvinner.' : tekst({ k: sum, v: navn }) + '.') : '.'));
        if (ferdigsjekk()) {
          const p = Math.max(1, 3 - Math.min(feilRunde, 2)); poeng += p;
          const rad = G.q(el, '.ll-nav'); G.q(el, '.ll-uttr').insertAdjacentHTML('afterend', ' <span aria-hidden="true">✅</span>'); G.q(el, '.sp-hud').innerHTML = hudHTML();
          el.querySelectorAll('.ll-fisk,.ll-sam,.ll-nullstill,.ll-hint').forEach(b => b.disabled = true);
          rad.innerHTML = '<p class="lesbar"><strong>Ferdig forenklet:</strong> ' + (ledd.length ? uttr() : '0') + ' (' + ledd.length + ' ledd' + (G.niv() > 0 ? (ledd.length === spådd ? ', akkurat som du forutså' : '') : '') + '). +' + p + ' poeng.</p><button type="button" class="knapp primær ll-neste">' + (runde + 1 >= RUNDER ? 'Se resultatet' : 'Neste ▶') + '</button>';
          G.q(el, '.ll-neste').addEventListener('click', () => { runde++; if (runde >= RUNDER) { const mx = RUNDER * (G.niv() > 0 ? 4 : 3); return G.slutt(el, { ikon: '🎣', tittel: 'Fangsten er i land!', stjerner: G.stjerner(el, poeng, mx), tekst: 'Du fikk ' + poeng + ' av ' + mx + ' poeng og gjorde ' + feil + ' feilgrep.', lær: 'Bare like ledd kan slås sammen. Legg sammen tallene foran bokstaven, og behold bokstaven. x-er, y-er, x²-er og vanlige tall er ulike «fiskeslag». Er koeffisientene motsatte tall, forsvinner leddet.', igjen: () => { runde = 0; feil = 0; poeng = 0; RUNDER = G.pr(4, 5, 6); lag(); } }); } lag(); });
        }
      }
      RUNDER = G.pr(4, 5, 6); lag();
    }
  });

  /* ===================== Mønsterjakten ===================== */
  G.add({
    id: 'monsterjakten', tittel: 'Mønsterjakten', ikon: '🔶', trinn: 8, temaer: ['8/monstre'],
    kort: 'Se hva som vokser, og finn regelen. Hvor mange prikker blir det i en stor figur?',
    hvordan: 'Du får se tre figurer i et mønster. Finn først hvor mange prikker neste figur har, så regelen for figur n, og til slutt hvor mange det er i en veldig stor figur. På Vanlig skriver du svaret på den store figuren selv, og på Utfordring skriver du også svaret på den første og snur spørsmålet: hvilken figur har et gitt antall prikker? Tips: se på hva som er likt i alle figurene, og hva som øker.',
    lærer: 'Å finne regelen i et voksende mønster: hva som øker for hver figur (stigningen), og hva som alltid er med (startverdien). Regelen for figur n kan brukes til å regne ut en hvilken som helst figur, og til å finne ut hvilken figur som har et bestemt antall prikker.',
    start: function (el) {
      let runde = 0, poeng = 0, a, b, steg, RUNDER, FIG;
      const navnRegel = (a, b) => a + 'n' + (b ? ' + ' + b : '');
      function figur(n) {
        let s = ''; const w = 22;
        for (let i = 0; i < n; i++) for (let j = 0; j < a; j++) s += '<circle cx="' + (14 + i * w) + '" cy="' + (40 + (a - 1 - j) * w) + '" r="8" fill="#3b82f6"/>';
        for (let j = 0; j < b; j++) s += '<circle cx="' + (14 + j * w) + '" cy="' + (40 + a * w + 4) + '" r="8" fill="#f97316"/>';
        return s;
      }
      function tegnFigurer() {
        let s = '', x = 0; const bredde = FIG.map(n => Math.max(n, b) * 22 + 12);
        FIG.forEach((n, i) => { s += '<g transform="translate(' + x + ',0)"><text x="4" y="20" font-weight="800" font-size="15">Figur ' + n + '</text>' + figur(n) + '</g>'; x += bredde[i] + 24; });
        return '<svg viewBox="0 0 ' + Math.max(x, 300) + ' ' + (40 + a * 22 + (b ? 30 : 0) + 12) + '" class="mj-svg" role="img" aria-label="Tre figurer i mønsteret">' + s + '</svg>';
      }
      function ny() {
        const niv = G.niv(); RUNDER = G.pr(3, 4, 5); a = G.rnd(2, G.pr(3, 4, 5)); b = G.rnd(0, G.pr(2, 3, 4)); if (runde === 0) b = G.rnd(0, 1);
        FIG = niv === 2 ? [2, 3, 4] : [1, 2, 3]; steg = 0; vis();
      }
      function stegListe() {
        const niv = G.niv(), nf = FIG[2] + 1, fN = a * nf + b, STOR = niv === 0 ? 10 : niv === 1 ? 20 : 50, fS = a * STOR + b, regel = navnRegel(a, b);
        const liste = [];
        const kjent = 'Figur ' + FIG[0] + ' har ' + (a * FIG[0] + b) + ', figur ' + FIG[1] + ' har ' + (a * FIG[1] + b) + ', figur ' + FIG[2] + ' har ' + (a * FIG[2] + b) + '. Det øker med ' + a + ' hver gang';
        const hint1 = ['Se på hvor mange prikker det er i hver figur: ' + [0, 1, 2].map(i => a * FIG[i] + b).join(', ') + '.', 'Det øker med ' + a + ' for hver figur.', 'Legg til ' + a + ' fra figur ' + FIG[2] + '.'];
        if (niv === 2) liste.push({ spm: 'Hvor mange prikker er det i <strong>figur ' + nf + '</strong>? Skriv svaret.', skriv: { fasit: fN, hint: hint1, ledetekst: 'Antall prikker' }, fk: kjent + ', så figur ' + nf + ' har ' + (a * FIG[2] + b) + ' + ' + a + ' = ' + fN + '.' });
        else liste.push({ spm: 'Hvor mange prikker er det i <strong>figur ' + nf + '</strong>?', mc: G.alt(fN, [fN + 1, fN - 1, a * (nf - 1) + b + 1, fN + a]), fk: kjent + ', så figur ' + nf + ' har ' + fN + '.' });
        const kand = [[a, b], [a + 1, b], [a, b + 1], [b || a + 2, a], [a, b ? 0 : 1], [a - 1 || a + 2, b]]; const set = []; kand.forEach(k => { const t = navnRegel(k[0], k[1]); if (!set.some(s => s.t === t)) set.push({ t: t, ok: k[0] === a && k[1] === b }); });
        let opts = G.shuffle(set.slice(0, 4)); if (!opts.some(o => o.ok)) opts[0] = { t: regel, ok: true };
        liste.push({ spm: 'Hvilken regel gir antall prikker i <strong>figur n</strong>?', mc: G.shuffle(opts), fk: 'Det øker med ' + a + ' for hver figur, så regelen starter med ' + a + 'n. ' + (b ? 'De ' + b + ' oransje prikkene er alltid med, så vi legger til ' + b + '.' : 'Det er ingen faste prikker.') + ' Sjekk figur ' + FIG[1] + ': ' + a + '·' + FIG[1] + (b ? ' + ' + b : '') + ' = ' + (a * FIG[1] + b) + '.' });
        const fkS = 'Bruk regelen ' + regel + ' med n = ' + STOR + ': ' + a + ' · ' + STOR + (b ? ' + ' + b : '') + ' = ' + fS + '.';
        if (niv === 0) liste.push({ spm: 'Hvor mange prikker er det i <strong>figur ' + STOR + '</strong>?', mc: G.alt(fS, [fS + a, fS - b, (a + b) * STOR, fS + 1]), fk: fkS });
        else liste.push({ spm: 'Hvor mange prikker er det i <strong>figur ' + STOR + '</strong>? Skriv svaret.', skriv: { fasit: fS, hint: ['Bruk regelen: ' + regel + '.', 'Sett inn n = ' + STOR + ': ' + a + ' · ' + STOR + (b ? ' + ' + b : '') + '.', 'Regn ut ' + a * STOR + (b ? ' + ' + b : '') + '.'], ledetekst: 'Antall prikker' }, fk: fkS });
        if (niv === 2) { const k = G.rnd(15, 40), tot = a * k + b; liste.push({ spm: 'Snu det: Hvilken figur har <strong>' + tot + '</strong> prikker? Skriv figurnummeret n.', skriv: { fasit: k, hint: ['Du vet at ' + regel + ' = ' + tot + '.', b ? 'Trekk fra ' + b + ' først: ' + a + 'n = ' + (tot - b) + '.' : 'Del ' + tot + ' på ' + a + '.', 'Del på ' + a + ': ' + (tot - b) + ' ÷ ' + a + '.'], ledetekst: 'Figurnummer n' }, fk: regel + ' = ' + tot + (b ? ' gir ' + a + 'n = ' + (tot - b) : '') + ', så n = ' + (tot - b) + ' ÷ ' + a + ' = ' + k + '.' }); }
        return liste;
      }
      function vis() {
        const liste = stegListe(), s = liste[steg], tot = liste.length;
        el.innerHTML = tmpl('<span>Mønster ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Spørsmål ' + (steg + 1) + ' av ' + tot + '</span><span>Poeng: ' + poeng + '</span>', '',
          '<div class="figur mj-figur">' + tegnFigurer() + '<p class="lesbar mj-tips">Blå prikker øker for hver figur. ' + (b ? 'Oransje prikker er alltid med.' : 'Her er det ingen faste prikker.') + '</p></div><p class="sp-spm lesbar">' + s.spm + '</p><div class="sp-rad mj-valg"></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad mj-nav"></div>');
        const etter = (ok, p) => {
          poeng += p; G.q(el, '.sp-hud').innerHTML = '<span>Mønster ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Spørsmål ' + (steg + 1) + ' av ' + tot + '</span><span>Poeng: ' + poeng + '</span>';
          G.feedback(el, ok, (ok ? 'Riktig! ' : 'Ikke helt. ') + s.fk);
          G.q(el, '.mj-nav').innerHTML = '<button type="button" class="knapp primær mj-neste">' + (steg === tot - 1 && runde + 1 >= RUNDER ? 'Se resultatet' : 'Neste ▶') + '</button>';
          G.q(el, '.mj-neste').addEventListener('click', () => {
            if (steg < tot - 1) { steg++; return vis(); }
            runde++; if (runde >= RUNDER) { const mx = RUNDER * tot; return G.slutt(el, { ikon: '🔶', tittel: 'Mønsterjeger!', stjerner: G.stjerner(el, poeng, mx), tekst: 'Du fikk ' + poeng + ' av ' + mx + ' poeng.', lær: 'Regelen for et mønster har to deler: hvor mye det øker for hver figur (tallet foran n), og hva som alltid er med (tallet som legges til). Med regelen kan du regne ut en hvilken som helst figur, og du kan løse en likning for å finne hvilken figur som har et bestemt antall prikker.', igjen: () => { runde = 0; poeng = 0; ny(); } }); }
            ny();
          });
        };
        if (s.mc) G.mc(G.q(el, '.mj-valg'), s.mc, ok => etter(ok, ok ? 1 : 0));
        else G.skriv(el, G.q(el, '.mj-valg'), Object.assign({}, s.skriv, { fn: (ok, f) => etter(ok, ok ? (f <= 1 ? 1 : .5) : 0) }));
      }
      ny();
    }
  });

  /* ===================== Myntjakt (kurver med glidebrytere) ===================== */
  const TYP = { 'myntjakt-linje': ['orig', 'lin', 'lin', 'lin', 'lin'], 'myntjakt-kurver': ['lin', 'par', 'par', 'eks', 'eks'] };
  const HAND = {
    orig: [{ n: 'a', x: 1, y: v => v.a, sett: (y, v) => y }],
    lin: [{ n: 'a', x: 1, y: v => v.a + v.b, sett: (y, v) => y - v.b }, { n: 'b', x: 0, y: v => v.b, sett: y => y }],
    par: [{ n: 'a', x: 2, y: v => 4 * v.a + v.c, sett: (y, v) => (y - v.c) / 4 }, { n: 'c', x: 0, y: v => v.c, sett: y => y }],
    eks: [{ n: 'a', x: 0, y: v => v.a, sett: y => y }, { n: 'b', x: 1, y: v => v.a * v.b, sett: (y, v) => y / v.a }]
  };
  function mynt(id, tittel, ikon, trinn, temaer, kort, hvordan, lærer, nivåer) {
    G.add({
      id: id, tittel: tittel, ikon: ikon, trinn: trinn, temaer: temaer, kort: kort, hvordan: hvordan, lærer: lærer,
      start: function (el) {
        let nr = 0, nivå, verdi, samlet, flyttet, hoppet, låst = false, drar = null;
        const W = 440, H = 380, X0 = -6, X1 = 6, Y0 = -8, Y1 = 9;
        const px = x => (x - X0) / (X1 - X0) * W, py = y => H - (y - Y0) / (Y1 - Y0) * H;
        function vis() {
          nivå = nivåer[nr]; låst = false; drar = null; verdi = {}; nivå.glid.forEach(g => verdi[g.n] = g.start); samlet = nivå.mynt.map(() => false); flyttet = 0; hoppet = false;
          el.innerHTML = tmpl('<span>Nivå ' + (nr + 1) + ' av ' + nivåer.length + '</span><span>Mynter: <b class="my-ant">0</b> av ' + nivå.mynt.length + '</span>', '<span class="lesbar">' + nivå.oppdrag + '</span>',
            '<div class="figur my-figur"><svg viewBox="0 0 ' + W + ' ' + H + '" class="my-svg" role="img" aria-label="Koordinatsystem med mynter og en kurve du styrer"><defs><clipPath id="my-klipp"><rect width="' + W + '" height="' + H + '"/></clipPath></defs><g id="my-rutenett"></g><g clip-path="url(#my-klipp)"><path id="my-kurve" d="" fill="none" stroke="#2563eb" stroke-width="3.5"/></g><g id="my-mynter"></g><g id="my-tri"></g><g id="my-hand"></g></svg></div><p class="lesbar my-tips">Tips: dra i de lilla håndtakene på grafen, eller bruk glidebryterne.</p>' +
            '<div class="my-formel lesbar" aria-live="polite"></div>' + nivå.glid.map(g => '<div class="sp-slider"><label for="my-' + g.n + '">' + g.tekst + ' <span id="my-v-' + g.n + '">' + F(g.start) + '</span></label><input id="my-' + g.n + '" type="range" min="' + g.min + '" max="' + g.max + '" step="' + g.steg + '" value="' + g.start + '"></div>').join('') +
            '<div class="sp-fb" aria-live="polite"></div><div class="sp-rad my-nav"><button type="button" class="knapp liten my-hopp">Gi opp dette nivået</button></div>');
          nivå.glid.forEach(g => { const s = G.q(el, '#my-' + g.n); s.addEventListener('input', () => { verdi[g.n] = +s.value; flyttet++; G.q(el, '#my-v-' + g.n).textContent = F(+s.value); tegn(); }); });
          const svg = G.q(el, '.my-svg'), typ = TYP[id][nr];
          const gren = (g, v) => Math.max(g.min, Math.min(g.max, Math.round(v / g.steg) * g.steg));
          function pil(e) { const r = svg.getBoundingClientRect(); return { x: X0 + (e.clientX - r.left) / r.width * (X1 - X0), y: Y1 - (e.clientY - r.top) / r.height * (Y1 - Y0) }; }
          svg.addEventListener('pointerdown', e => { const h = e.target.closest('[data-h]'); if (!h || låst) return; drar = h.dataset.h; try { svg.setPointerCapture(e.pointerId); } catch (x) { } e.preventDefault(); });
          svg.addEventListener('pointermove', e => {
            if (!drar || låst) return; const hd = HAND[typ].find(x => x.n === drar), g = nivå.glid.find(x => x.n === drar); if (!hd || !g) return;
            const v = gren(g, hd.sett(pil(e).y, verdi)); if (isFinite(v) && v !== verdi[drar]) { verdi[drar] = v; flyttet++; const s = G.q(el, '#my-' + drar); s.value = v; G.q(el, '#my-v-' + drar).textContent = F(v); tegn(); }
          });
          const slipp = () => { drar = null; }; svg.addEventListener('pointerup', slipp); svg.addEventListener('pointercancel', slipp);
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
          const typ = TYP[id][nr];
          G.q(el, '#my-hand').innerHTML = HAND[typ].filter(h => nivå.glid.some(g => g.n === h.n)).map(h => '<circle data-h="' + h.n + '" cx="' + px(h.x) + '" cy="' + py(h.y(verdi)) + '" r="11" fill="#7c3aed" fill-opacity=".85" stroke="#fff" stroke-width="3" class="my-hand" tabindex="-1"/>').join('');
          G.q(el, '#my-tri').innerHTML = (typ === 'lin' || typ === 'orig') ? (function () { const b = typ === 'orig' ? 0 : verdi.b, a = verdi.a, x0 = px(0), x1 = px(1), y0 = py(b), y1 = py(b + a); return '<path d="M' + x0 + ' ' + y0 + ' H' + x1 + ' V' + y1 + '" fill="none" stroke="#7c3aed" stroke-width="2.5" stroke-dasharray="5 4"/><text x="' + ((x0 + x1) / 2) + '" y="' + (a >= 0 ? y0 + 15 : y0 - 6) + '" text-anchor="middle" font-size="12" font-weight="800" fill="#6d28d9">1 til høyre</text><text x="' + (x1 + 5) + '" y="' + ((y0 + y1) / 2 + 4) + '" font-size="12" font-weight="800" fill="#6d28d9">' + (a > 0 ? 'opp ' + F(a) : a < 0 ? 'ned ' + F(-a) : 'ingen endring') + '</text>'; })() : '';
          if (n === nivå.mynt.length && !hoppet) ferdig(true);
        }
        function ferdig(vant) {
          const rad = G.q(el, '.my-nav'); if (rad.dataset.ferdig) return; rad.dataset.ferdig = '1'; låst = true;
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
