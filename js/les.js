/* ============================================================
   Les, tolk og begrunn
   Øvelser i å lese oppgaver, tolke grafer, føre pent og rett, forstå kommandoord
   og begrunne svar. Alt skjer i nettleseren mens siden er åpen. Ingenting lagres,
   og det du skriver i tekstfeltene forlater aldri maskinen din.

   Innholdet ligger i data/les-8.js, les-9.js og les-10.js og registreres med M.les.reg(trinn, data).
   Ruter: #/les (oversikt) og #/les/<modul>/<trinn>
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;
  const NIV = ['rolig', 'vanlig', 'utfordring'];
  const MODULER = [
    { id: 'tekst', ikon: '🖍️', tittel: 'Finn viktig info i tekst', kort: 'Se hvordan du leser en tekst steg for steg. Så trykker du på tall, enheter og det oppgaven spør om, finner det som ikke trengs og avgjør om noe mangler.' },
    { id: 'graf', ikon: '📊', tittel: 'Les og tolk grafer', kort: 'Trykk på tittel, akser og søyler. Hva spør oppgaven om, og hvor finner du det i grafen?' },
    { id: 'foring', ikon: '✍️', tittel: 'Før pent og rett', kort: 'Se hvordan en fin side ser ut på ruteark, med marg, oppgavenummer, utregning og svar. Finn feilene i en slurvete side, og øv på mal, rekkefølge og vurdering.' },
    { id: 'kommando', ikon: '🔑', tittel: 'Kommandoord', kort: 'Regn ut, vis, forklar, begrunn, vurder … Hva må svaret ditt egentlig inneholde?' },
    { id: 'begrunn', ikon: '🧠', tittel: 'Begrunn – ikke bare «fordi»', kort: 'Lær ordene (lett, middels, vanskelig), se et eksempel, bygg setningen av brikker, og skriv så selv: fra «fordi» til en begrunnelse med tall, regel og sammenheng.' },
    { id: 'diskusjon', ikon: '🗣️', tittel: 'Diskuter og argumenter', kort: 'Er du enig? Hvem har rett? Øv på å si hva du mener, og hvorfor, sammen med en annen.' }
  ];
  M.les = M.les || {};
  M.les.data = M.les.data || {};
  M.les.moduler = MODULER;
  M.les.reg = function (trinn, d) { M.les.data[trinn] = d; };
  M.les.parseTekst = function (s) { return parseTekst(s); };
  M.les.mc = { html: function (a, b) { return mcHTML(a, b); }, init: function (a, b, c) { return initMc(a, b, c); } };
  M.les.grafSvg = function (g, stat) { return grafSvg(g, stat); };

  const esc = s => String(s === undefined || s === null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const tekstHTML = s => esc(s).replace(/\n/g, '<br>');
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = b[i]; b[i] = b[j]; b[j] = t; } return b; };
  const nivItems = arr => (arr && arr[NIV[M.nivåNr()]]) || [];
  const $ = (el, sel) => el.querySelector(sel);
  const $$ = (el, sel) => Array.prototype.slice.call(el.querySelectorAll(sel));
  const TRINN = [8, 9, 10];

  /* ---------- felles: flervalg ---------- */
  function mcHTML(spm, ekstraKlasse) {
    const v = shuffle(spm.valg.map(x => ({ t: x[0], ok: !!x[1], hint: x[2] || '' })));
    return '<div class="les-mc ' + (ekstraKlasse || '') + '"><p class="les-spm"><strong>' + tekstHTML(spm.q) + '</strong></p>' +
      '<div class="les-valg">' + v.map(x => '<button type="button" class="les-valg-knapp" data-ok="' + (x.ok ? 1 : 0) + '" data-hint="' + esc(x.hint) + '">' + tekstHTML(x.t) + '</button>').join('') + '</div>' +
      '<div class="les-mc-svar lesbar" aria-live="polite"></div></div>';
  }
  function initMc(root, spm, ferdig) {
    let feil = 0;
    $$(root, '.les-valg-knapp').forEach(b => b.addEventListener('click', () => {
      if (root.dataset.ferdig) return;
      const svar = $(root, '.les-mc-svar');
      if (b.dataset.ok === '1') {
        root.dataset.ferdig = '1'; b.classList.add('ok');
        $$(root, '.les-valg-knapp').forEach(x => { x.disabled = true; });
        svar.innerHTML = '✅ <strong>Riktig.</strong> ' + tekstHTML(spm.forkl || '');
        if (ferdig) ferdig(feil === 0);
      } else {
        feil++; b.classList.add('feil'); b.disabled = true;
        svar.innerHTML = '🤔 <strong>Ikke helt.</strong> ' + (b.dataset.hint ? tekstHTML(b.dataset.hint) : 'Les en gang til og prøv et annet svar.');
      }
    }));
  }

  /* ---------- felles: skrivefelt med fasit som kommer etter at du har skrevet ---------- */
  function skriveHTML(opts) {
    return '<div class="les-skriv"><label class="les-skriv-label"><strong>' + esc(opts.tittel) + '</strong>' +
      '<textarea class="les-felt" rows="' + (opts.rader || 3) + '" placeholder="' + esc(opts.plass || 'Skriv her …') + '" spellcheck="true"></textarea></label>' +
      '<p class="les-lagres-ikke">Det du skriver her lagres ikke. Det forsvinner når du lukker siden.</p>' +
      (opts.sjekk ? '<fieldset class="les-sjekk"><legend>Sjekk deg selv</legend>' + opts.sjekk.map(x => '<label><input type="checkbox"> ' + esc(x) + '</label>').join('') + '</fieldset>' : '') +
      '<button type="button" class="knapp liten les-vis" disabled>👀 Se et eksempel på et godt svar</button>' +
      '<div class="les-modell" hidden><strong>Eksempel på et godt svar</strong><p class="lesbar">' + tekstHTML(opts.modell) + '</p>' + (opts.merk ? '<p class="les-merk lesbar">' + tekstHTML(opts.merk) + '</p>' : '') + '</div></div>';
  }
  function initSkriv(root, minTegn) {
    const felt = $(root, '.les-felt'), knapp = $(root, '.les-vis'), modell = $(root, '.les-modell');
    const min = minTegn || 20;
    felt.addEventListener('input', () => { knapp.disabled = felt.value.trim().length < min; knapp.textContent = knapp.disabled ? '👀 Se et eksempel på et godt svar (skriv litt først)' : '👀 Se et eksempel på et godt svar'; });
    knapp.textContent = '👀 Se et eksempel på et godt svar (skriv litt først)';
    knapp.addEventListener('click', () => { modell.hidden = false; knapp.hidden = true; });
  }

  /* ============================================================
     Modul 1: Finn viktig info i tekst
     Markering: [[t|…]] tall og enheter, [[s|…]] det oppgaven spør om, [[u|…]] unødvendig
     ============================================================ */
  const KAT = { t: ['🔵', 'Tall og enheter'], s: ['🟠', 'Det oppgaven spør om'], u: ['⚪', 'Unødvendig info'] };
  function parseTekst(s) {
    const enheter = []; let idx = 0;
    s.split('\n').forEach((avs, pi) => {
      const re = /\[\[(t|s|u)\|([^\]]+)\]\]/g; let last = 0, m;
      const vanlig = txt => txt.split(/\s+/).filter(Boolean).forEach(w => enheter.push({ w: w, k: '', p: pi, i: idx++ }));
      while ((m = re.exec(avs))) { vanlig(avs.slice(last, m.index)); enheter.push({ w: m[2], k: m[1], p: pi, i: idx++ }); last = re.lastIndex; }
      vanlig(avs.slice(last));
    });
    return enheter;
  }
  function tekstKort(it, k) {
    const en = parseTekst(it.tekst);
    const avs = {}; en.forEach(e => { (avs[e.p] = avs[e.p] || []).push(e); });
    const html = Object.keys(avs).map(p => '<p class="les-tekst">' + avs[p].map((e, n) => (n && !/^[.,;:!?)»]+$/.test(e.w) ? ' ' : '') + '<button type="button" class="les-ord" data-i="' + e.i + '">' + esc(e.w) + '</button>').join('') + '</p>').join('');
    const verk = '<div class="les-verktoy" role="group" aria-label="Velg markeringsverktøy">' +
      Object.keys(KAT).map((kk, n) => '<button type="button" class="les-verk v-' + kk + (n === 0 ? ' valgt' : '') + '" data-k="' + kk + '" aria-pressed="' + (n === 0) + '">' + KAT[kk][0] + ' ' + KAT[kk][1] + '</button>').join('') +
      '<button type="button" class="les-verk v-x" data-k="" aria-pressed="false">🧽 Fjern markering</button></div>';
    const mal = it.mangler ? 'Les teksten. Marker det du har, og avgjør så om oppgaven kan løses.' : 'Velg et verktøy, og trykk på ordene i teksten.';
    return '<section class="les-kort" data-k="' + k + '"><h3>' + esc(it.tittel) + '</h3><p class="les-instr lesbar">' + esc(it.instr || mal) + '</p>' + verk +
      '<div class="les-tekstboks">' + html + '</div>' +
      '<div class="les-knapper"><button type="button" class="knapp primær liten les-sjekk-knapp">✔️ Sjekk markeringen</button> <button type="button" class="knapp liten les-nullstill">↺ Start på nytt</button> <button type="button" class="knapp liten les-fasit-knapp" hidden>👁️ Vis fasit-farger</button></div>' +
      '<div class="les-resultat lesbar" aria-live="polite"></div><div class="les-etter" hidden>' + (it.spm ? mcHTML(it.spm) : '') + '</div></section>';
  }
  function tekstInit(kort, it) {
    const en = parseTekst(it.tekst); const marks = {}; let verk = 't'; let sjekket = false;
    const btn = i => $(kort, '.les-ord[data-i="' + i + '"]');
    $$(kort, '.les-verk').forEach(b => b.addEventListener('click', () => {
      verk = b.dataset.k; $$(kort, '.les-verk').forEach(x => { x.classList.toggle('valgt', x === b); x.setAttribute('aria-pressed', x === b); });
    }));
    function tegn(i) {
      const b = btn(i); b.classList.remove('m-t', 'm-s', 'm-u');
      if (marks[i]) b.classList.add('m-' + marks[i]);
      b.setAttribute('aria-label', en[i].w + (marks[i] ? ' – markert som ' + KAT[marks[i]][1] : ''));
    }
    $$(kort, '.les-ord').forEach(b => b.addEventListener('click', () => {
      if (sjekket) return; const i = +b.dataset.i;
      if (!verk || marks[i] === verk) delete marks[i]; else marks[i] = verk;
      tegn(i);
    }));
    const res = $(kort, '.les-resultat'), etter = $(kort, '.les-etter');
    function visFasit() {
      en.forEach(e => { const b = btn(e.i); b.classList.remove('m-t', 'm-s', 'm-u', 'ok', 'feil', 'mangler'); if (e.k) b.classList.add('m-' + e.k, 'ok'); });
      res.innerHTML = '<p>Slik er fasit-fargene: ' + Object.keys(KAT).map(kk => KAT[kk][0] + ' ' + KAT[kk][1]).join(' · ') + '. Ord uten farge er vanlige ord som ikke må markeres.</p>';
    }
    $(kort, '.les-sjekk-knapp').addEventListener('click', () => {
      sjekket = true;
      let riktig = 0, tot = 0, glemt = 0, feil = 0;
      en.forEach(e => {
        const b = btn(e.i), m = marks[e.i] || ''; b.classList.remove('ok', 'feil', 'mangler');
        if (e.k) tot++;
        if (e.k && m === e.k) { riktig++; b.classList.add('ok'); }
        else if (e.k && !m) { glemt++; b.classList.add('mangler'); b.title = 'Dette skulle vært markert: ' + KAT[e.k][1]; }
        else if (m && m !== e.k) { feil++; b.classList.add('feil'); b.title = e.k ? 'Riktig markering er ' + KAT[e.k][1] : 'Dette ordet er ikke viktig her'; }
      });
      let h = '<p><strong>' + riktig + ' av ' + tot + '</strong> markeringer er riktige.';
      if (feil) h += ' ' + feil + ' ord har feil markering (rød ramme).';
      if (glemt) h += ' ' + glemt + ' ord ble glemt (stiplet ramme).';
      h += '</p>';
      if (!feil && !glemt) h += '<p>✅ Alt er markert riktig. Nå kan du bruke det du fant.</p>';
      else h += '<p>Se på rammene. Trykk «Start på nytt» og prøv igjen, eller «Vis fasit-farger».</p>';
      if (it.forkl) h += '<p class="les-merk">' + tekstHTML(it.forkl) + '</p>';
      res.innerHTML = h; etter.hidden = false; $(kort, '.les-fasit-knapp').hidden = false;
    });
    $(kort, '.les-fasit-knapp').addEventListener('click', visFasit);
    $(kort, '.les-nullstill').addEventListener('click', () => {
      sjekket = false; Object.keys(marks).forEach(k => delete marks[k]);
      $$(kort, '.les-ord').forEach(b => b.classList.remove('m-t', 'm-s', 'm-u', 'ok', 'feil', 'mangler'));
      res.innerHTML = ''; $(kort, '.les-fasit-knapp').hidden = true;
    });
    if (it.spm) initMc($(etter, '.les-mc'), it.spm);
  }
  function modTekst(d) {
    const liste = nivItems(d.tekst), X = M.les.bx;
    return (X && X.introHTML ? X.introHTML(M.les.sistTrinn) : '') + '<div class="callout tips"><span class="callout-ikon" aria-hidden="true">💡</span><div class="callout-tekst"><strong class="callout-tittel">Slik gjør du</strong><ol><li>Les teksten to ganger.</li><li>Velg et verktøy: 🔵 tall og enheter, 🟠 det oppgaven spør om, ⚪ unødvendig info.</li><li>Trykk på ordene. Trykk igjen for å fjerne markeringen.</li><li>Trykk «Sjekk». Se på rammene, og svar på spørsmålet under.</li></ol></div></div>' +
      liste.map(tekstKort).join('') + '<p class="les-merk lesbar">Husk: I en ekte oppgave på prøve kan du bruke blyant og understreke, ringe rundt og krysse ut på samme måte.</p>';
  }

  /* ============================================================
     Modul 2: Grafer
     ============================================================ */
  function grafSvg(g, stat) {
    const W = 600, Hh = 360, x0 = 78, x1 = 580, y0 = 290, y1 = 52;
    const ys = v => y0 - (v - g.yMin) / (g.yMax - g.yMin) * (y0 - y1);
    const n = g.verdier.length, band = (x1 - x0) / n;
    const maks = g.verdier.indexOf(Math.max.apply(null, g.verdier)), min = g.verdier.indexOf(Math.min.apply(null, g.verdier));
    const el = (d, aria) => stat ? '' : ' data-d="' + d + '" tabindex="0" role="button" aria-label="' + esc(aria) + '"';
    let s = '<svg viewBox="0 0 ' + W + ' ' + Hh + '" class="les-svg" role="group" aria-label="' + esc('Graf: ' + g.tittel) + '" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">';
    s += '<rect x="0" y="0" width="' + W + '" height="' + Hh + '" fill="#fff"/>';
    s += '<text x="' + (W / 2) + '" y="28" text-anchor="middle" font-size="18" font-weight="700" fill="#14213d"' + el('tittel', 'Tittel: ' + g.tittel) + '>' + esc(g.tittel) + '</text>';
    for (let v = g.yMin, i = 0; v <= g.yMax + 1e-9; v += g.steg, i++) {
      const y = ys(v);
      s += '<line x1="' + x0 + '" y1="' + y + '" x2="' + x1 + '" y2="' + y + '" stroke="' + (v === 0 && g.yMin < 0 ? '#14213d' : '#dfe6f1') + '" stroke-width="' + (v === 0 && g.yMin < 0 ? 2.5 : 1) + '"/>';
      s += '<text x="' + (x0 - 10) + '" y="' + (y + 5) + '" text-anchor="end" font-size="14" fill="#14213d"' + el('ytall:' + i + (i === 0 ? ' start' : ''), 'Tallet ' + String(v).replace('-', 'minus ') + ' på y-aksen') + '>' + String(v).replace('-', '−') + '</text>';
    }
    s += '<line x1="' + x0 + '" y1="' + y1 + '" x2="' + x0 + '" y2="' + y0 + '" stroke="#14213d" stroke-width="2"/>';
    s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="#14213d" stroke-width="2"/>';
    const bunn = (g.yMin <= 0 && g.yMax >= 0) ? 0 : g.yMin;
    if (g.type === 'sol') {
      const bw = band * 0.6;
      g.verdier.forEach((v, i) => {
        const x = x0 + band * i + (band - bw) / 2, yv = ys(v), yb = ys(bunn);
        const alias = (i === maks ? ' topp' : '') + (i === min ? ' bunn' : '');
        s += '<rect x="' + x + '" y="' + Math.min(yv, yb) + '" width="' + bw + '" height="' + Math.abs(yb - yv) + '" fill="#0e8a96"' + el('verdi:' + i + alias, 'Søylen for ' + g.kat[i]) + '/>';
      });
    } else {
      const pts = g.verdier.map((v, i) => (x0 + band * (i + 0.5)) + ',' + ys(v)).join(' ');
      s += '<polyline points="' + pts + '" fill="none" stroke="#0e8a96" stroke-width="3"/>';
      g.verdier.forEach((v, i) => {
        const alias = (i === maks ? ' topp' : '') + (i === min ? ' bunn' : '');
        s += '<circle cx="' + (x0 + band * (i + 0.5)) + '" cy="' + ys(v) + '" r="8" fill="#c2410c" stroke="#fff" stroke-width="2"' + el('verdi:' + i + alias, 'Punktet for ' + g.kat[i]) + '/>';
      });
    }
    g.kat.forEach((c, i) => {
      s += '<text x="' + (x0 + band * (i + 0.5)) + '" y="' + (y0 + 22) + '" text-anchor="middle" font-size="14" fill="#14213d"' + el('kat:' + i, 'Kategori ' + c) + '>' + esc(c) + '</text>';
    });
    s += '<text x="22" y="' + ((y0 + y1) / 2) + '" text-anchor="middle" font-size="15" font-weight="600" fill="#14213d" transform="rotate(-90 22 ' + ((y0 + y1) / 2) + ')"' + el('yakse', 'Tittel på y-aksen: ' + g.yTittel) + '>' + esc(g.yTittel) + '</text>';
    s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (Hh - 14) + '" text-anchor="middle" font-size="15" font-weight="600" fill="#14213d"' + el('xakse', 'Tittel på x-aksen: ' + g.xTittel) + '>' + esc(g.xTittel) + '</text>';
    return s + '</svg>';
  }
  function grafTabell(g) {
    return '<details class="les-tab"><summary>Vis grafen som tabell (for lesing med skjermleser)</summary><table class="les-tabell"><thead><tr><th>' + esc(g.xTittel) + '</th><th>' + esc(g.yTittel) + '</th></tr></thead><tbody>' +
      g.kat.map((c, i) => '<tr><td>' + esc(c) + '</td><td>' + String(g.verdier[i]).replace('-', '−') + '</td></tr>').join('') + '</tbody></table></details>';
  }
  function grafKort(it, k) {
    return '<section class="les-kort les-graf" data-k="' + k + '"><h3>' + esc(it.tittel) + '</h3>' + (it.tekst ? '<p class="les-oppg-tekst lesbar">' + tekstHTML(it.tekst) + '</p>' : '') +
      '<div class="les-svg-boks">' + grafSvg(it.graf) + '</div>' + grafTabell(it.graf) +
      '<div class="les-graf-oppg" aria-live="polite"></div></section>';
  }
  function grafInit(kort, it) {
    const boks = $(kort, '.les-graf-oppg'), svg = $(kort, 'svg');
    let idx = 0, riktigFørste = 0, forsok = 0, aktiv = null;
    const tr = (d) => $$(svg, '[data-d]').filter(e => e.getAttribute('data-d').split(' ').indexOf(d) >= 0);
    function nullstillFarger() { $$(svg, '[data-d]').forEach(e => e.classList.remove('d-ok', 'd-feil', 'd-vis')); }
    function vis() {
      nullstillFarger(); forsok = 0; const o = it.oppg[idx]; aktiv = o;
      if (!o) {
        boks.innerHTML = '<div class="les-ferdig"><strong>🎉 Ferdig med denne grafen.</strong> Du svarte riktig på første forsøk på ' + riktigFørste + ' av ' + it.oppg.length + ' oppgaver.</div>'; aktiv = null; return;
      }
      const teller = '<p class="les-teller">Oppgave ' + (idx + 1) + ' av ' + it.oppg.length + '</p>';
      if (o.t === 'klikk') {
        boks.innerHTML = teller + '<p class="les-spm"><strong>👆 ' + tekstHTML(o.q) + '</strong></p><p class="les-merk lesbar">Trykk direkte på grafen.</p><div class="les-mc-svar lesbar"></div>';
      } else {
        boks.innerHTML = teller + mcHTML(o);
        initMc($(boks, '.les-mc'), o, ok => { if (ok) riktigFørste++; neste(); });
      }
    }
    function neste() {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'knapp primær liten'; b.textContent = idx + 1 < it.oppg.length ? 'Neste oppgave →' : 'Se resultat';
      b.addEventListener('click', () => { idx++; vis(); }); boks.appendChild(b); b.focus();
    }
    function treff(e) {
      if (!aktiv || aktiv.t !== 'klikk') return;
      const d = e.getAttribute('data-d'), sv = $(boks, '.les-mc-svar');
      if (!sv || boks.querySelector('.knapp')) return;
      if (d.split(' ').indexOf(aktiv.mål) >= 0) {
        nullstillFarger(); tr(aktiv.mål).forEach(x => x.classList.add('d-ok'));
        if (forsok === 0) riktigFørste++;
        sv.innerHTML = '✅ <strong>Riktig.</strong> ' + tekstHTML(aktiv.forkl || ''); neste();
      } else {
        forsok++; e.classList.add('d-feil');
        sv.innerHTML = '🤔 <strong>Ikke der.</strong> ' + tekstHTML(aktiv.hint || 'Se på spørsmålet igjen og prøv et annet sted.');
        if (forsok >= 2) tr(aktiv.mål).forEach(x => x.classList.add('d-vis'));
      }
    }
    svg.addEventListener('click', ev => { const e = ev.target.closest('[data-d]'); if (e) treff(e); });
    svg.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { const e = ev.target.closest('[data-d]'); if (e) { ev.preventDefault(); treff(e); } } });
    vis();
  }
  function modGraf(d) {
    return '<div class="callout tips"><span class="callout-ikon" aria-hidden="true">💡</span><div class="callout-tekst"><strong class="callout-tittel">Slik leser du en graf</strong><ol><li>Les <strong>tittelen</strong>: hva handler grafen om?</li><li>Les <strong>aksetitlene</strong>: hva viser hver akse, og i hvilken enhet?</li><li>Se hvor <strong>y-aksen starter</strong>. Starter den på null?</li><li>Først da leser du av tall og sammenligner.</li></ol></div></div>' +
      nivItems(d.graf).map(grafKort).join('');
  }

  /* ============================================================
     Modul 3: Før pent og rett
     ============================================================ */
  function foringMal(d) {
    const m = d.foring.mal;
    return '<section class="seksjon farge-1"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">1</span><h2>Malen: slik fører du en oppgave</h2></div>' +
      '<p class="lesbar">Bruk denne malen i boka og på prøver. Du trenger ikke alle delene i alle oppgaver, men jo mer du viser, jo lettere er det å finne feil og gi poeng for tankegangen.</p>' +
      '<div class="les-mal" role="table" aria-label="Malen for føring">' + m.map(r => '<div class="les-mal-rad" role="row"><div class="les-mal-navn" role="cell"><strong>' + esc(r.navn) + '</strong><span>' + esc(r.hva) + '</span></div><div class="les-mal-eks" role="cell"><pre>' + esc(r.eks) + '</pre></div></div>').join('') + '</div>' +
      '<div class="callout regel"><span class="callout-ikon" aria-hidden="true">📐</span><div class="callout-tekst"><strong class="callout-tittel">Fem faste regler</strong><ul>' + d.foring.regler.map(r => '<li>' + tekstHTML(r) + '</li>').join('') + '</ul></div></div></section>';
  }
  function foringSammenlign(it) {
    return '<div class="les-sammenlign"><h3>' + esc(it.oppg) + '</h3><div class="les-to"><div class="les-bad"><strong>❌ Slik ikke</strong><pre>' + esc(it.darlig.join('\n')) + '</pre><ul>' + it.feil.map(f => '<li>' + tekstHTML(f) + '</li>').join('') + '</ul></div>' +
      '<div class="les-god"><strong>✅ Slik ja</strong><pre>' + esc(it.bra.join('\n')) + '</pre></div></div></div>';
  }
  function foringRekke(it, k) {
    return '<section class="les-kort les-rekke" data-k="' + k + '"><h3>' + esc(it.tittel) + '</h3><p class="les-oppg-tekst lesbar">' + tekstHTML(it.oppg) + '</p>' +
      '<p class="les-merk lesbar">Trykk på linjene i den rekkefølgen de skal stå i boka. Start øverst.</p>' +
      '<div class="les-bunke">' + shuffle(it.linjer.map((l, i) => ({ l: l, i: i }))).map(x => '<button type="button" class="les-linje" data-i="' + x.i + '">' + esc(x.l) + '</button>').join('') + '</div>' +
      '<p><strong>Din føring:</strong></p><pre class="les-bygd" aria-live="polite"></pre><div class="les-mc-svar lesbar" aria-live="polite"></div>' +
      '<button type="button" class="knapp liten les-reset">↺ Start på nytt</button></section>';
  }
  function foringRekkeInit(kort, it) {
    let neste = 0; const bygd = $(kort, '.les-bygd'), sv = $(kort, '.les-mc-svar');
    function reset() { neste = 0; bygd.textContent = ''; sv.innerHTML = ''; $$(kort, '.les-linje').forEach(b => { b.disabled = false; b.classList.remove('feil'); }); }
    $$(kort, '.les-linje').forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.i;
      if (i === neste) {
        b.disabled = true; bygd.textContent += (neste ? '\n' : '') + it.linjer[i]; neste++;
        sv.innerHTML = '';
        if (neste === it.linjer.length) sv.innerHTML = '✅ <strong>Ferdig.</strong> ' + tekstHTML(it.forkl || 'Slik ser en god føring ut: hvert steg står på en egen linje, og leseren kan følge tankegangen din.');
      } else {
        b.classList.add('feil'); setTimeout(() => b.classList.remove('feil'), 700);
        sv.innerHTML = '🤔 Ikke helt enda. ' + tekstHTML(it.hint || 'Tenk: hva må du vite eller skrive først, før du kan regne?');
      }
    }));
    $(kort, '.les-reset').addEventListener('click', reset);
  }
  function foringVurder(it, k) {
    return '<section class="les-kort les-vurder" data-k="' + k + '"><h3>' + esc(it.tittel) + '</h3><p class="les-oppg-tekst lesbar">' + tekstHTML(it.oppg) + '</p>' +
      '<div class="les-tre">' + it.svar.map((s, i) => '<div class="les-elevsvar"><strong>Elev ' + 'ABC'[i] + '</strong><pre>' + esc(s.tekst) + '</pre></div>').join('') + '</div>' +
      mcHTML({ q: it.spm || 'Hvilken føring er best, og hvorfor?', valg: it.svar.map((s, i) => ['Elev ' + 'ABC'[i], s.best, s.kom]), forkl: it.forkl }) + '</section>';
  }
  function modForing(d) {
    const f = d.foring, niv = NIV[M.nivåNr()];
    return foringMal(d) + (M.les.hand && M.les.hand.html ? M.les.hand.html(M.les.sistTrinn) : '') +
      '<section class="seksjon farge-2"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">4</span><h2>Slik ikke – slik ja</h2></div>' + (f.sammenlign[niv] || []).map(foringSammenlign).join('') + '</section>' +
      '<section class="seksjon farge-3"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">5</span><h2>Sett føringen i riktig rekkefølge</h2></div>' + (f.rekke[niv] || []).map(foringRekke).join('') + '</section>' +
      '<section class="seksjon farge-4"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">6</span><h2>Vurder elevsvar</h2></div>' + (f.vurder[niv] || []).map(foringVurder).join('') + '</section>' +
      '<section class="seksjon farge-5"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">7</span><h2>Sjekkliste før du leverer</h2></div><fieldset class="les-sjekk"><legend>Kryss av for det du har gjort</legend>' + f.sjekkliste.map(x => '<label><input type="checkbox"> ' + esc(x) + '</label>').join('') + '</fieldset>' +
      '<p class="les-lagres-ikke">Avkryssingene lagres ikke. Skriv ut siden hvis du vil ha sjekklisten på papir.</p></section>';
  }

  /* ============================================================
     Modul 4: Kommandoord
     ============================================================ */
  function modKommando(d) {
    const niv = NIV[M.nivåNr()], K = d.kommando;
    return '<section class="seksjon farge-1"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">1</span><h2>Hva ber oppgaven deg om å gjøre?</h2></div><p class="lesbar">Det første ordet i en oppgave forteller hva svaret må inneholde. Her er de vanligste, med et svakt og et godt svar på samme oppgave.</p>' +
      '<div class="les-ord-grid">' + K.ord.map(o => '<article class="les-ordkort"><h3>' + o.ikon + ' ' + esc(o.ord) + '</h3><p class="lesbar"><strong>Betyr:</strong> ' + tekstHTML(o.betyr) + '</p><p class="lesbar"><strong>Svaret må ha:</strong> ' + tekstHTML(o.ha) + '</p><div class="les-to"><div class="les-bad"><strong>Svakt</strong><p>' + tekstHTML(o.svakt) + '</p></div><div class="les-god"><strong>Godt</strong><p>' + tekstHTML(o.godt) + '</p></div></div><p class="les-eks lesbar"><em>Oppgave: ' + tekstHTML(o.oppg) + '</em></p></article>').join('') + '</div></section>' +
      '<section class="seksjon farge-2"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">2</span><h2>Hva må svaret ha med?</h2></div>' +
      (K.oppg[niv] || []).map((o, i) => '<section class="les-kort" data-k="' + i + '"><h3>Oppgave ' + (i + 1) + '</h3>' + mcHTML(o) + '</section>').join('') + '</section>';
  }

  /* ============================================================
     Modul 5: Begrunn
     ============================================================ */
  function trappHTML(t) {
    const tek = ['Bare påstand', 'Med tall eller eksempel', 'Med regel og sammenheng'];
    return '<div class="les-trapp" role="list">' + t.map((x, i) => '<div class="les-trinn les-trinn-' + (i + 1) + '" role="listitem"><span class="les-trinn-nr">Trinn ' + (i + 1) + ' · ' + tek[i] + '</span><p>' + tekstHTML(x) + '</p></div>').join('') + '</div>';
  }
  function modBegrunn(d) {
    const B = d.begrunn, niv = NIV[M.nivåNr()], X = M.les.bx, tr = M.les.sistTrinn;
    let h = (X && X.ordbankHTML ? X.ordbankHTML(niv) + X.seHTML(tr) + X.byggHTML(tr, niv) : '') + '<section class="seksjon farge-1"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">4</span><h2>Begrunnelsestrappa</h2></div>' +
      '<p class="lesbar">«Fordi det er sånn» er ikke en begrunnelse. En god begrunnelse tar deg trinn for trinn oppover. Her er påstanden: <strong>' + tekstHTML(B.pastand) + '</strong></p>' + trappHTML(B.trapp) +
      '<div class="callout regel"><span class="callout-ikon" aria-hidden="true">🧱</span><div class="callout-tekst"><strong class="callout-tittel">Setningsstartere som hjelper</strong><ul>' + B.startere.map(x => '<li>' + tekstHTML(x) + '</li>').join('') + '</ul></div></div></section>';
    h += '<section class="seksjon farge-2"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">5</span><h2>Hvilken begrunnelse er best?</h2></div>' +
      (B.rangere[niv] || []).map((o, i) => '<section class="les-kort" data-k="' + i + '"><h3>Oppgave ' + (i + 1) + '</h3><p class="les-oppg-tekst lesbar">' + tekstHTML(o.pastand) + '</p>' + mcHTML({ q: 'Hvilket svar er best begrunnet?', valg: o.svar, forkl: o.forkl }) + '</section>').join('') + '</section>';
    h += '<section class="seksjon farge-3"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">6</span><h2>Skriv fritt: en bedre begrunnelse</h2></div>' + (X && X.ordbankKompakt ? X.ordbankKompakt(niv) : '') + '<p class="lesbar">Her er et svakt svar. Skriv det om, så det kommer opp på trinn 3. Eksempelsvaret kommer når du har skrevet noe.</p>' +
      (B.skriv[niv] || []).map((o, i) => '<section class="les-kort les-skrivkort" data-k="' + i + '"><h3>Oppgave ' + (i + 1) + '</h3><p class="les-oppg-tekst lesbar">' + tekstHTML(o.oppg) + '</p><p class="les-svakt"><strong>Svakt svar:</strong> ' + tekstHTML(o.svakt) + '</p>' +
        skriveHTML({ tittel: 'Skriv en bedre begrunnelse', sjekk: B.sjekk, modell: o.modell, merk: o.merk, rader: 4 }) + '</section>').join('') + '</section>';
    return h;
  }

  /* ============================================================
     Modul 6: Diskusjon
     ============================================================ */
  function pastandKort(o, i) {
    return '<section class="les-kort les-pastand" data-k="' + i + '" data-t="pastand"><h3>Påstand ' + (i + 1) + '</h3><p class="les-pastand-tekst">«' + tekstHTML(o.pastand) + '»</p>' +
      '<div class="les-enig" role="group" aria-label="Er du enig?"><button type="button" class="les-verk" data-v="enig" aria-pressed="false">👍 Enig</button><button type="button" class="les-verk" data-v="uenig" aria-pressed="false">👎 Uenig</button><button type="button" class="les-verk" data-v="avhenger" aria-pressed="false">🤷 Det kommer an på</button></div>' +
      '<div class="les-pbe"><label><strong>P – Påstand:</strong> Jeg mener at … <textarea class="les-felt" rows="2"></textarea></label><label><strong>B – Begrunnelse:</strong> Det er fordi … <textarea class="les-felt les-b" rows="3"></textarea></label><label><strong>E – Eksempel eller tall:</strong> For eksempel … <textarea class="les-felt" rows="2"></textarea></label>' +
      '<label><strong>Motargument:</strong> Noen kan svare at … og jeg svarer at … <textarea class="les-felt" rows="2"></textarea></label></div>' +
      '<p class="les-lagres-ikke">Det du skriver lagres ikke. Snakk gjerne høyt med en annen i stedet.</p>' +
      '<button type="button" class="knapp liten les-vis" disabled>👀 Se hvordan en samtale kan gå</button>' +
      '<div class="les-modell" hidden><p class="lesbar"><strong>Slik kan en som er enig si:</strong> ' + tekstHTML(o.for) + '</p><p class="lesbar"><strong>Slik kan en som er uenig si:</strong> ' + tekstHTML(o.mot) + '</p><p class="les-merk lesbar"><strong>Hva stemmer egentlig?</strong> ' + tekstHTML(o.forkl) + '</p></div></section>';
  }
  function pastandInit(kort) {
    $$(kort, '.les-enig .les-verk').forEach(b => b.addEventListener('click', () => { $$(kort, '.les-enig .les-verk').forEach(x => { x.classList.toggle('valgt', x === b); x.setAttribute('aria-pressed', x === b); }); }));
    const b = $(kort, '.les-b'), v = $(kort, '.les-vis'), m = $(kort, '.les-modell');
    v.textContent = '👀 Se hvordan en samtale kan gå (skriv en begrunnelse først)';
    b.addEventListener('input', () => { v.disabled = b.value.trim().length < 15; v.textContent = v.disabled ? '👀 Se hvordan en samtale kan gå (skriv en begrunnelse først)' : '👀 Se hvordan en samtale kan gå'; });
    v.addEventListener('click', () => { m.hidden = false; v.hidden = true; });
  }
  function hvemKort(o, i) {
    return '<section class="les-kort les-hvem" data-k="' + i + '" data-t="hvem"><h3>Hvem har rett?</h3><p class="les-oppg-tekst lesbar">' + tekstHTML(o.q) + '</p>' +
      '<div class="les-to"><div class="les-elevsvar"><strong>' + esc(o.a.navn) + ' sier:</strong><p>' + tekstHTML(o.a.tekst) + '</p></div><div class="les-elevsvar"><strong>' + esc(o.b.navn) + ' sier:</strong><p>' + tekstHTML(o.b.tekst) + '</p></div></div>' +
      mcHTML({ q: 'Hvem har rett?', valg: [[o.a.navn, o.fasit === 'a', o.hintA], [o.b.navn, o.fasit === 'b', o.hintB], ['Begge har delvis rett', o.fasit === 'begge', o.hintBegge], ['Ingen av dem', o.fasit === 'ingen', o.hintIngen]], forkl: o.forkl }) + '</section>';
  }
  function modDiskusjon(d) {
    const D = d.diskusjon, niv = NIV[M.nivåNr()];
    return '<section class="seksjon farge-1"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">1</span><h2>Er du enig?</h2></div><p class="lesbar">Ta stilling til påstanden og bruk malen <strong>P–B–E</strong>: Påstand, Begrunnelse, Eksempel. Prøv deretter motargumentet. Best er det å gjøre dette sammen med en annen.</p>' +
      (D.pastander[niv] || []).map(pastandKort).join('') + '</section>' +
      '<section class="seksjon farge-2"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">2</span><h2>Hvem har rett?</h2></div><p class="lesbar">To elever har ulike svar. Finn ut hvem som har rett, og hva den andre har misforstått.</p>' + (D.hvem[niv] || []).map(hvemKort).join('') + '</section>' +
      '<section class="seksjon farge-3"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">3</span><h2>Parøvelse: forsvarer, utfordrer og observatør</h2></div><p class="lesbar">Tre roller, bytt etter hver påstand. Ta tiden: to minutter per runde.</p><div class="les-roller">' +
      '<article class="les-rolle"><h3>🛡️ Forsvareren</h3><p class="lesbar">Sier hva du mener og begrunner med tall, regel og eksempel.</p></article>' +
      '<article class="les-rolle"><h3>🔍 Utfordreren</h3><p class="lesbar">Stiller spørsmål: ' + D.sparring.map(s => '«' + esc(s) + '»').join(' ') + '</p></article>' +
      '<article class="les-rolle"><h3>📝 Observatøren</h3><p class="lesbar">Lytter og sier etterpå: Hva var den beste begrunnelsen? Hva manglet?</p></article></div></section>';
  }

  /* ============================================================
     Side og ruting
     ============================================================ */
  function trinnVelger(mode, modul, trinn) {
    return '<div class="les-trinnvelger" role="group" aria-label="Velg trinn"><span class="nivaa-tittel">Trinn:</span><div class="seg">' + TRINN.map(t => M.les.data[t]
      ? '<a href="' + M.href(mode, 'les', modul, t) + '"' + (t === trinn ? ' aria-current="true"' : '') + '>' + t + '. trinn</a>'
      : '<span class="les-snart">' + t + '. trinn (snart)</span>').join('') + '</div></div>';
  }
  function hub(mode) {
    return '<nav class="brødsmule"><a href="' + M.href(mode) + '">Forsiden</a> › <span>Les, tolk og begrunn</span></nav>' +
      '<header class="side-hode t8"><h1>🔎 Les, tolk og begrunn</h1><p class="lesbar">Å kunne matte er mer enn å regne. Du må finne ut hva oppgaven spør om, lese grafer, føre så andre forstår, og forklare hvorfor svaret ditt er riktig. Her øver du på akkurat det.</p></header>' +
      '<section class="seksjon farge-1"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">✓</span><h2>Hva er et godt svar?</h2></div><div class="les-to">' +
      '<div class="les-god"><strong>✅ Et godt svar</strong><ul><li>svarer på det oppgaven faktisk spør om</li><li>viser utregningen, ett steg på hver linje</li><li>har med enhet, for eksempel kr, cm eller °C</li><li>ender med en svarsetning</li><li>har en begrunnelse med tall, regel eller sammenheng</li><li>er sjekket: er svaret rimelig?</li></ul></div>' +
      '<div class="les-bad"><strong>❌ Et svar som ikke er godt</strong><ul><li>bare et tall uten utregning eller enhet</li><li>regner på feil spørsmål, eller bruker info som ikke trengs</li><li>har flere regnestykker presset sammen på én linje</li><li>bruker «fordi det er sånn» som begrunnelse</li><li>har et svar som ikke er rimelig, uten at du merker det</li><li>er så rotete at det er umulig å finne feilen</li></ul></div></div></section>' +
      '<section aria-labelledby="les-mod-tittel"><h2 id="les-mod-tittel" class="seksjon-tittel">Velg øvelse</h2><div class="les-hub-grid">' +
      MODULER.map(m => '<article class="les-modul"><span class="mini-ikon" aria-hidden="true">' + m.ikon + '</span><h3>' + m.tittel + '</h3><p class="lesbar">' + m.kort + '</p><div class="les-chips">' +
        TRINN.map(t => M.les.data[t] ? '<a class="les-chip" href="' + M.href(mode, 'les', m.id, t) + '">' + t + '. trinn →</a>' : '<span class="les-chip snart">' + t + '. trinn (snart)</span>').join('') + '</div></article>').join('') +
      '<article class="les-modul les-jeopardy"><span class="mini-ikon" aria-hidden="true">🎲</span><h3>Jeopardy: finn spørsmålet</h3><p class="lesbar">Sammensatte oppgaver med tekst og graf. Svaret er gitt, hva kan spørsmålet være? Spill i lag.</p><div class="les-chips">' +
      TRINN.map(t => '<a class="les-chip" href="' + M.href(mode, 'spill', 'jeopardy-' + t) + '">' + t + '. trinn →</a>').join('') + '</div></article>' +
      '</div></section>' +
      '<div class="callout tips"><span class="callout-ikon" aria-hidden="true">🔒</span><div class="callout-tekst"><strong class="callout-tittel">Ingenting lagres</strong>Verken navn, svar eller tekster du skriver blir lagret eller sendt noe sted. Tekstfeltene er der for at du skal tenke og øve, og forsvinner når du lukker siden. Eksempelsvarene vises etter at du har skrevet.</div></div>';
  }
  const RENDER = { tekst: modTekst, graf: modGraf, foring: modForing, kommando: modKommando, begrunn: modBegrunn, diskusjon: modDiskusjon };
  function modulSide(mode, modul, trinn) {
    const m = MODULER.find(x => x.id === modul), d = M.les.data[trinn];
    if (!m || !d) return M.pages.ikkeFunnet(mode);
    M.les.sistTrinn = trinn;
    M._hjelpKey = null;
    M._after = function () { init(modul, d, trinn); };
    return '<nav class="brødsmule"><a href="' + M.href(mode) + '">Forsiden</a> › <a href="' + M.href(mode, 'les') + '">Les, tolk og begrunn</a> › <span>' + m.tittel + '</span></nav>' +
      '<header class="side-hode t' + trinn + '"><h1>' + m.ikon + ' ' + m.tittel + ' <span class="les-trinn-merke">' + trinn + '. trinn</span></h1><p class="lesbar">' + m.kort + '</p></header>' +
      '<div class="les-kontroller">' + trinnVelger(mode, modul, trinn) + M.nivaaVelger('Velg nivå:') + '</div>' +
      RENDER[modul](d) +
      '<div class="les-bunn"><button type="button" class="knapp liten les-skriv-ut">🖨️ Skriv ut denne siden</button> <a class="knapp liten" href="' + M.href(mode, 'les') + '">← Tilbake til oversikten</a></div>';
  }
  function init(modul, d, trinn) {
    const main = document.getElementById('main');
    document.body.style.setProperty('--aksent', 'var(--t' + trinn + ')'); document.body.style.setProperty('--aksent-bg', 'var(--t' + trinn + '-bg)');
    const niv = NIV[M.nivåNr()];
    if (modul === 'tekst' && M.les.bx && M.les.bx.introInit) M.les.bx.introInit(main);
    if (modul === 'tekst') nivItems(d.tekst).forEach((it, k) => tekstInit($(main, '.les-kort[data-k="' + k + '"]'), it));
    if (modul === 'graf') nivItems(d.graf).forEach((it, k) => grafInit($(main, '.les-kort[data-k="' + k + '"]'), it));
    if (modul === 'foring') {
      if (M.les.hand && M.les.hand.init) M.les.hand.init(main, trinn);
      (d.foring.rekke[niv] || []).forEach((it, k) => foringRekkeInit($(main, '.les-rekke[data-k="' + k + '"]'), it));
      (d.foring.vurder[niv] || []).forEach((it, k) => { const kort = $(main, '.les-vurder[data-k="' + k + '"]'); initMc($(kort, '.les-mc'), { forkl: it.forkl }); });
    }
    if (modul === 'kommando') (d.kommando.oppg[niv] || []).forEach((o, k) => initMc($(main, '.les-kort[data-k="' + k + '"] .les-mc'), o));
    if (modul === 'begrunn') {
      if (M.les.bx && M.les.bx.byggInit) { M.les.bx.ordbankInit(main, niv); M.les.bx.byggInit(main, trinn, niv); }
      (d.begrunn.rangere[niv] || []).forEach((o, k) => initMc($(main, '.les-kort[data-k="' + k + '"] .les-mc'), { forkl: o.forkl }));
      $$(main, '.les-skrivkort').forEach(k => initSkriv(k, 25));
    }
    if (modul === 'diskusjon') {
      $$(main, '.les-pastand').forEach(pastandInit);
      (d.diskusjon.hvem[niv] || []).forEach((o, k) => initMc($(main, '.les-hvem[data-k="' + k + '"] .les-mc'), { forkl: o.forkl }));
    }
    const p = $(main, '.les-skriv-ut'); if (p) p.addEventListener('click', () => window.print());
  }
  M.pages.les = function (mode, modul, trinn) {
    if (!modul) return hub(mode);
    return modulSide(mode, modul, parseInt(trinn, 10) || M.les.sistTrinn || 8);
  };
})();
