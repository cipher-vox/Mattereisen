/* ============================================================
   Utskriftsark (#/ark). Lager ark i nettleseren. Ingenting sendes eller lagres.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE, H = M.href, CUR = M.curriculum;
  const MINUS = '−';
  const NIVN = { rolig: ['🌱', 'Rolig'], vanlig: ['🌿', 'Vanlig'], utfordring: ['🚀', 'Utfordring'] };

  /* ---------- CSS for arkene (brukes både i appen og i nedlastet fil) ---------- */
  const ARK_CSS = [
    '.ark-side{box-sizing:border-box;width:190mm;max-width:100%;margin:0 auto 14px;background:#fff;color:#000;font:11pt/1.4 system-ui,"Segoe UI",Arial,sans-serif;padding:0;text-align:left}',
    '.ark-side *{box-sizing:border-box}',
    '.ark-side h1,.ark-side h2,.ark-side h3,.ark-side p,.ark-side ol,.ark-side ul,.ark-side li{margin:0;padding:0;letter-spacing:normal;color:#000;font-family:inherit;background:none;border:0;max-width:none}',
    '.ark-side h1{font-size:19pt;line-height:1.15;font-weight:800}',
    '.ark-side h2{font-size:13pt;margin:10px 0 4px;font-weight:800}',
    '.ark-side h3{font-size:11pt;margin:8px 0 3px;font-weight:700}',
    '.ark-side .tall{color:inherit;background:none;padding:0;font-weight:inherit}',
    '.ark-side button,.ark-side .ord{all:unset}',
    '.ark-hode{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 14px;border-bottom:3px solid #000;padding-bottom:5px;margin-bottom:8px}',
    '.ark-logo{font-size:9pt;font-weight:700;color:#444;order:2;margin-left:auto}',
    '.ark-hode h1{order:1}',
    '.ark-under{order:3;width:100%;font-size:10pt;color:#333}',
    '.ark-navn{display:flex;gap:18px;margin:6px 0 10px;font-size:10.5pt}',
    '.ark-navn span{display:flex;flex:1;gap:5px;align-items:baseline}',
    '.ark-navn span:first-child{flex:2.2}',
    '.ark-navn i{flex:1;border-bottom:1px solid #000;height:1em;display:block}',
    '.ark-liste{list-style:decimal;padding-left:7mm!important;display:block}',
    '.ark-liste.kol2{column-count:2;column-gap:9mm}',
    '.ark-opp{margin:0 0 9px!important;break-inside:avoid;page-break-inside:avoid;padding-left:1mm!important}',
    '.ark-opp::marker{font-weight:800}',
    '.ark-q{font-size:11.5pt}',
    '.ark-q code,.ark-side code{font-family:"Consolas","Courier New",monospace;background:#f1f5f9;padding:1px 4px;border-radius:3px;font-size:10pt}',
    '.ark-valg{display:flex;flex-wrap:wrap;gap:2px 14px;margin-top:3px;font-size:11pt}',
    '.ark-valg span{white-space:nowrap}',
    '.ark-hjelp{margin-top:4px;font-size:9.5pt;border:1px dashed #666;border-radius:5px;padding:2px 6px;color:#222;background:#f8fafc}',
    '.ark-svar{margin-top:4px;font-size:11pt}.ark-svar i{display:inline-block;min-width:34mm;border-bottom:1px solid #000;height:1em;vertical-align:baseline}',
    '.ark-regn{margin-top:4px;border:1px dotted #888;border-radius:4px;position:relative}',
    '.ark-regn::before{content:"Regn her";position:absolute;left:4px;top:1px;font-size:7.5pt;color:#888}',
    '.ark-linjer{margin-top:4px}.ark-linjer i{display:block;border-bottom:1px solid #999;height:7mm}',
    '.ark-fasit{list-style:decimal;padding-left:8mm!important;column-count:2;column-gap:9mm}',
    '.ark-fasit li{margin:0 0 5px!important;break-inside:avoid;font-size:11pt}',
    '.ark-fasit.en-kol{column-count:1}',
    '.ark-los{font-size:9pt;color:#333;margin-top:1px}',
    '.ark-fot{margin-top:8px;font-size:8.5pt;color:#555;display:flex;justify-content:space-between;border-top:1px solid #ccc;padding-top:3px}',
    '.ark-boks{border:1.5px solid #000;border-radius:5px;padding:4px 7px;min-height:12mm}',
    '.ark-h18{height:18mm}.ark-h30{height:30mm}',
    '.ark-bar{padding:0}',
    '.ark-svg{display:block;width:100%;height:auto}',
    '.ark-tab{border-collapse:collapse;width:100%}',
    '.ark-tab th,.ark-tab td{border:1px solid #000;text-align:center;padding:2px}',
    '.ark-tab th{background:#eef2f7}',
    '.ark-gange td,.ark-gange th{height:14mm;font-size:12pt}',
    '.ark-hundre td{height:17mm;font-size:13pt}',
    '.ark-xy td{height:11mm}',
    '.ark-stat td{height:9mm}',
    '.ark-to{display:grid;grid-template-columns:1fr 1fr;gap:8mm;margin:6px 0}',
    '.ark-to-stat{grid-template-columns:1.2fr 1fr}',
    '.ark-mal-bokser{display:grid;gap:5px;align-content:start}',
    '.ark-linje-tekst{font-weight:700;margin:6px 0 3px}',
    '.ark-tenk{border:2px solid #000;border-radius:8px;margin:0 0 8mm;overflow:hidden}',
    '.ark-tenk-rad{display:flex;min-height:15mm;border-bottom:1px solid #000}.ark-tenk-rad:last-child{border:0}',
    '.ark-tenk-rad.ark-stor{min-height:48mm}',
    '.ark-tenk-rad b{width:22mm;background:#eef2f7;border-right:1px solid #000;padding:3px 5px;display:block}',
    '.ark-tenk-rad span{flex:1;padding:3px 6px}.ark-hint{color:#777;font-size:9pt}',
    '.ark-brok-rad{display:flex;align-items:stretch;margin:0 0 3mm}',
    '.ark-brok-navn{width:14mm;font-weight:800;display:flex;align-items:center}',
    '.ark-brok-stripe{display:flex;flex:1;border:1.5px solid #000}',
    '.ark-brok-stripe span{flex:1;text-align:center;border-right:1.5px solid #000;padding:5mm 0;font-size:10pt}.ark-brok-stripe span:last-child{border:0}',
    '.ark-pros{margin:0 0 3mm;border:1.5px solid #000;border-radius:6px;padding:3px 7px}.ark-pros i{display:block;font-size:9pt;color:#555}',
    '.ark-husk-bokser{display:grid;gap:8px;margin:6px 0}',
    '.ark-husk{border:2px solid #000;border-radius:8px;padding:5px 9px}',
    '.ark-husk h2{margin:0 0 3px}',
    '.ark-husk ul{padding-left:5mm!important;list-style:disc}.ark-husk li{margin:2px 0!important}',
    '.ark-eks{background:#f8fafc}',
    '.ark-eks ol{padding-left:6mm!important;list-style:decimal}',
    '.ark-kryss{width:100%;border-collapse:collapse;margin:6px 0}',
    '.ark-kryss th,.ark-kryss td{border:1px solid #000;padding:5px 6px;vertical-align:middle}',
    '.ark-kryss th{background:#eef2f7;font-size:10pt}',
    '.ark-kryss td.k{width:20mm;text-align:center}',
    '.ark-kryss td.k::after{content:"";display:inline-block;width:6mm;height:6mm;border:1.5px solid #000;border-radius:3px}',
    '.ark-billetter{display:grid;grid-template-columns:1fr 1fr;gap:0}',
    '.ark-billett{border:1px dashed #555;padding:5mm;height:62mm;overflow:hidden;position:relative}',
    '.ark-billett h3{margin:0 0 2mm}.ark-billett .ark-linjer i{height:6.5mm}',
    '.ark-billett small{position:absolute;right:4mm;bottom:2mm;color:#777;font-size:7.5pt}',
    '.ark-kort-rutenett{display:grid;grid-template-columns:repeat(2,1fr)}',
    '.ark-kort{border:1px dashed #555;padding:6mm;min-height:58mm;display:flex;flex-direction:column;justify-content:center;font-size:13pt;position:relative}',
    '.ark-kort small{position:absolute;left:4mm;top:2mm;font-size:8pt;color:#666}',
    '.ark-kort.liten{min-height:40mm;font-size:12pt}',
    '.ark-kort-3{grid-template-columns:repeat(3,1fr)}',
    '.ark-par{display:grid;grid-template-columns:repeat(3,1fr)}',
    '.ark-par .ark-kort{min-height:36mm;font-size:12.5pt;text-align:center;align-items:center}',
    '.ark-bingo{display:grid;grid-template-columns:1fr 1fr;gap:7mm}',
    '.ark-bingo-kort{border:2px solid #000;border-radius:8px;padding:4mm}',
    '.ark-bingo-kort h3{text-align:center;margin:0 0 2mm}',
    '.ark-bingo-rute{display:grid;grid-template-columns:repeat(3,1fr);gap:2mm}',
    '.ark-bingo-rute div{border:1.5px solid #000;border-radius:5px;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;font-size:15pt;font-weight:800;text-align:center;padding:2px}',
    '.ark-stasjon{border:2px solid #000;border-radius:10px;padding:5mm;margin:0 0 6mm;min-height:116mm;break-inside:avoid}',
    '.ark-stasjon h2{margin:0 0 3mm;font-size:16pt}',
    '.ark-stasjon-opp{margin:0 0 3mm;display:flex;gap:6px}.ark-stasjon-opp b{min-width:9mm}',
    '.ark-feil-opp{border:1.5px solid #000;border-radius:7px;padding:4px 9px;margin:0 0 7px;break-inside:avoid}',
    '.ark-feil-steg{font-family:"Consolas","Courier New",monospace;font-size:10.5pt;margin:2px 0}',
    '.ark-smil{display:inline-flex;gap:4px;margin-left:8px}.ark-smil span{display:inline-block;border:1.5px solid #000;border-radius:5px;padding:0 4px;font-size:11pt}',
    '.ark-tom{height:100%;}',
    '@media screen{.ark-side{border:1px solid #cbd5e1;box-shadow:0 2px 8px rgba(0,0,0,.08);padding:10mm;width:210mm;border-radius:4px;margin-bottom:18px}.ark-side.ark-bar{padding:10mm}}',
    '@media print{.ark-side{width:190mm;margin:0;padding:0;border:0;box-shadow:none;break-after:page;page-break-after:always}.ark-side:last-child{break-after:auto;page-break-after:auto}.ark-side.ark-bar{padding:0}}'
  ].join('\n');
  const BASE_PRINT = '@page{size:A4;margin:10mm}body{margin:0;background:#fff}@media screen{body{background:#e2e8f0;padding:12px}.ikke-skriv{max-width:210mm;margin:0 auto 10px;padding:8px 12px;background:#fff7d6;border:1px solid #e6c200;border-radius:6px;font:14px system-ui,sans-serif}}@media print{.ikke-skriv{display:none}}';

  /* ---------- hjelpere ---------- */
  const esc = M.esc;
  const trinnFor = key => CUR.find(t => String(t.trinn) === key.split('/')[0]);
  const temaFor = key => { const p = key.split('/'); return M.findTema(p[0], p[1]); };
  function temaNavn(key) { const t = temaFor(key); return t ? t.tittel : key; }
  function alleTemaer() { const o = []; CUR.forEach(tr => tr.temaer.forEach(t => { if (t.klar) o.push({ key: tr.trinn + '/' + t.id, trinn: tr.trinn, tittel: t.tittel, ikon: t.ikon }); })); return o; }

  function ledd(sek, k, seed) { return sek.lag(M.rng(seed + k * 7919), k); }

  /* oppgaveobjekt fra håndskrevet oppgave */
  const BOKST = 'abcdefgh';
  function taskToItem(raw) {
    if (!raw || raw.visual || raw.figur || raw.widget || raw.html) return null;
    const t = M.normTask(raw);
    if (t.regn !== undefined && t.tekst === 'Regn ut: {u}') t.tekst = 'Regn ut: ' + M.prettyExpr(t.regn);
    if (!t.tekst || /\{u\}/.test(t.tekst)) return null;
    if (/figuren|tegningen|modellen over|over her|ovenfor/i.test(t.tekst)) return null;
    const hint = Array.isArray(t.hint) ? t.hint[0] : (typeof t.hint === 'string' ? t.hint : '');
    const it = { q: M.markup(t.tekst), type: t.type, hjelp: hint ? M.markup(hint) : '', los: t.losning ? M.markup(t.losning) : '' };
    if (t.type === 'valg') {
      if (!t.valg || t.riktig === undefined) return null;
      it.valg = t.valg.map(String); it.a = BOKST[t.riktig] + ') ' + t.valg[t.riktig]; it.kort = t.valg[t.riktig];
    } else if (t.type === 'fritekst') { it.a = t.losning ? M.markup(t.losning) : ''; }
    else if (t.type === 'rekke') { it.a = t.svar.map(M.fmt).join(', '); it.kort = it.a; }
    else { const s = Array.isArray(t.svar) ? t.svar[0] : t.svar; it.a = M.fmt(s) + (t.enhet ? ' ' + t.enhet : ''); it.kort = M.fmt(s) + (t.enhet ? ' ' + t.enhet : ''); it.enhet = t.enhet || ''; it.type = 'tall'; }
    return it;
  }
  function tasksOf(topic) {
    const out = [];
    if (!topic) return out;
    topic.seksjoner.forEach(s => (s.blokker || []).forEach(b => { if (b.t === 'oppgaver') (b.oppgaver || []).forEach(x => { const it = taskToItem(x); if (it) out.push(it); }); }));
    return out;
  }
  function genItems(key, mode, per, seed, bakfra) {
    const gen = M.ekstra[key]; if (!gen) return [];
    const def = gen(mode), out = [];
    const seks = bakfra ? def.seksjoner.slice().reverse() : def.seksjoner;
    seks.forEach((sek, si) => {
      const n = Math.min(sek.antall, per);
      for (let k = 0; k < n; k++) {
        const x = ledd(sek, k, seed + si * 104729);
        const tekst = String(x.q).replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/gi, ' ').trim();
        const ferdig = /\?|^(Regn|Løs|Finn|Skriv|Forkort|Faktoriser|Forenkle|Gang|Tegn|Sett|Bruk|Hva|Hvor|Hvilk|Kan|Er |Forklar|Vis|Beregn|Lag|Bestem|Samle|Sammenlign)/.test(tekst);
        const it = { q: !ferdig && sek.intro ? M.markup(sek.intro) + '<br>' + x.q : x.q, type: 'tall', a: x.a, sek: sek.tittel };
        if (x.str !== undefined) it.kort = String(x.str); else if (x.num !== undefined) it.kort = M.fmt(x.num);
        out.push(it);
      }
    });
    return out;
  }
  /* de n oppgavene for et nivå */
  function nivåItems(key, nivå, n, seed) {
    const hwTopic = nivå === 'vanlig' ? M.topics.utforsk[key] : (M.topics[nivå] || {})[key];
    let hw = tasksOf(hwTopic);
    if (nivå === 'vanlig') hw = hw.slice(0, Math.floor(n / 3));
    const mode = nivå === 'rolig' ? 'steg' : 'utforsk';
    const nSek = (M.ekstra[key] ? M.ekstra[key](mode).seksjoner.length : 1) || 1;
    const per = Math.ceil(Math.max(0, n - Math.min(hw.length, n)) / nSek) + 1;
    const gen = genItems(key, mode, per, seed, nivå === 'utfordring');
    // jevn blanding fra delene i rekkefølge
    const hwBrukt = hw.slice(0, n);
    const rest = n - hwBrukt.length;
    const valgt = [];
    const grupper = {};
    const sett = {}; hwBrukt.forEach(x => { sett[x.q] = 1; });
    gen.forEach(x => { if (sett[x.q]) return; sett[x.q] = 1; (grupper[x.sek] = grupper[x.sek] || []).push(x); });
    const navn = Object.keys(grupper);
    let k = 0;
    while (valgt.length < rest && navn.some(nm => grupper[nm].length)) { const g = grupper[navn[k % navn.length]]; if (g.length) valgt.push(g.shift()); k++; }
    return hwBrukt.concat(valgt).slice(0, n);
  }

  /* ---------- oppgaveblokker ---------- */
  function plassH(p) { return p === 'liten' ? 14 : p === 'stor' ? 42 : p === 'ingen' ? 0 : 26; }
  function oppHTML(it, cfg) {
    let h = '<li class="ark-opp"><div class="ark-q">' + it.q + '</div>';
    if (it.type === 'valg') h += '<div class="ark-valg">' + it.valg.map((v, i) => '<span>' + BOKST[i] + ') ' + M.markup(String(v)) + '</span>').join('') + '</div>';
    if (cfg.hjelp && it.hjelp) h += '<div class="ark-hjelp">💡 Start slik: ' + it.hjelp + '</div>';
    if (it.type === 'fritekst') h += '<div class="ark-linjer"><i></i><i></i></div>';
    else {
      if (cfg.plass !== 'ingen') h += '<div class="ark-regn" style="height:' + plassH(cfg.plass) + 'mm"></div>';
      if (it.type !== 'valg') h += '<div class="ark-svar">Svar: <i></i>' + (it.enhet ? ' ' + esc(it.enhet) : '') + '</div>';
    }
    return h + '</li>';
  }
  function hode(tittel, under) { return '<header class="ark-hode"><div class="ark-logo">🧭 Mattereisen</div><h1>' + tittel + '</h1>' + (under ? '<div class="ark-under">' + under + '</div>' : '') + '</header>'; }
  const navnFelt = '<div class="ark-navn"><span>Navn: <i></i></span><span>Dato: <i></i></span></div>';
  const side = (inner, ekstra) => '<section class="ark-side' + (ekstra ? ' ' + ekstra : '') + '">' + inner + '</section>';
  function fot(cfg, tekst) { return '<footer class="ark-fot"><span>' + (tekst || '') + '</span><span>' + (cfg.symbol && cfg.nivå ? NIVN[cfg.nivå][0] + ' ' : '') + 'mattereisen</span></footer>'; }
  function fasitSide(tittel, items, cfg) {
    if (cfg.fasit === 'ingen') return '';
    const los = cfg.fasit === 'los';
    return side(hode('Fasit', esc(tittel)) + '<ol class="ark-fasit' + (los ? ' en-kol' : '') + '">' + items.map(it => '<li>' + (it.a || '') + (los && it.los ? '<div class="ark-los">' + it.los + '</div>' : '') + '</li>').join('') + '</ol>');
  }

  function bygg_oppgave(cfg) {
    const key = cfg.tema, items = nivåItems(key, cfg.nivå, cfg.antall, cfg.seed);
    const tittel = temaNavn(key);
    const sk = hode('Øvingsark: ' + esc(tittel), trinnFor(key).tittel + (cfg.symbol ? ' · ' + NIVN[cfg.nivå][0] + ' ' + NIVN[cfg.nivå][1] : '')) + (cfg.navn ? navnFelt : '') +
      '<ol class="ark-liste' + (cfg.kol === 2 ? ' kol2' : '') + '">' + items.map(it => oppHTML(it, cfg)).join('') + '</ol>' + fot(cfg, esc(tittel));
    return side(sk) + fasitSide(tittel + ' (' + NIVN[cfg.nivå][1] + ')', items, cfg);
  }
  function bygg_test(cfg) {
    const key = cfg.tema, tittel = temaNavn(key), nA = Math.max(4, Math.round(cfg.antall * .7)), nB = Math.max(2, cfg.antall - nA);
    const A = nivåItems(key, cfg.nivå === 'utfordring' ? 'vanlig' : cfg.nivå, nA, cfg.seed), B = nivåItems(key, 'utfordring', nB, cfg.seed + 11);
    const alle = A.concat(B), c2 = Object.assign({}, cfg, { hjelp: false });
    const sk = hode('Kort test: ' + esc(tittel), trinnFor(key).tittel) + navnFelt +
      '<p style="margin:0 0 6px">Vis utregningen. Du kan bruke kalkulator hvis læreren sier det. <b style="float:right">Poeng: ______ / ' + alle.length + '</b></p>' +
      '<h2>Del A</h2><ol class="ark-liste">' + A.map(it => oppHTML(it, c2)).join('') + '</ol>' +
      '<h2>Del B: strekk deg</h2><ol class="ark-liste" start="' + (A.length + 1) + '">' + B.map(it => oppHTML(it, c2)).join('') + '</ol>' + fot(cfg, 'Kort test');
    return side(sk) + fasitSide('Kort test: ' + tittel, alle, cfg);
  }
  function bygg_startsjekk(cfg) {
    const key = cfg.tema, tittel = temaNavn(key), items = nivåItems(key, 'rolig', Math.min(8, cfg.antall), cfg.seed);
    const c2 = Object.assign({}, cfg, { hjelp: false, plass: 'liten' });
    const sk = hode('Startsjekk: ' + esc(tittel), 'Hva kan jeg fra før? Dette er ikke en prøve.') + navnFelt +
      '<p style="margin:0 0 6px">Prøv så mange du vil. Det går fint å hoppe over. Sett ring rundt hvor sikker du er:</p>' +
      '<ol class="ark-liste">' + items.map(it => oppHTML(it, c2).replace('</li>', '<div class="ark-svar">Jeg er <span class="ark-smil"><span>😕 ikke sikker</span><span>😐 litt</span><span>😀 sikker</span></span></div></li>')).join('') + '</ol>' + fot(cfg, 'Startsjekk');
    return side(sk) + fasitSide('Startsjekk: ' + tittel, items, cfg);
  }

  /* ---------- husk-ark ---------- */
  const TENK = ['Les oppgaven to ganger.', 'Hva vet jeg? Skriv opp tallene med enheter.', 'Hva skal jeg finne?', 'Hvilken regel eller metode passer?', 'Regn ett steg om gangen.', 'Sjekk: er svaret rimelig?'];
  function førsteEksempel(key) {
    const t = M.topics.utforsk[key]; if (!t) return null;
    for (const s of t.seksjoner) for (const b of (s.blokker || [])) if (b.t === 'eksempel' && b.steg && (b.oppgave || b.regn !== undefined)) return b;
    return null;
  }
  function bygg_husk(cfg) {
    const key = cfg.tema, L = M.laerer[key] || {}, t = M.topics.utforsk[key] || {}, tittel = temaNavn(key);
    const eks = førsteEksempel(key);
    const ord = (t.ordliste || []).slice(0, 8);
    let b = '<div class="ark-husk-bokser">';
    if (L.husk) b += '<div class="ark-husk"><h2>🧠 Husk dette</h2><ul>' + L.husk.map(x => '<li>' + M.markup(x) + '</li>').join('') + '</ul></div>';
    if (L.feil) b += '<div class="ark-husk"><h2>⚠️ Vanlige feil</h2><ul>' + L.feil.map(x => '<li>' + M.markup(x) + '</li>').join('') + '</ul></div>';
    if (eks) b += '<div class="ark-husk ark-eks"><h2>📘 Eksempel</h2><p>' + (eks.regn !== undefined ? 'Regn ut: ' + M.prettyExpr(eks.regn) : M.markup(eks.oppgave)) + '</p><ol>' + eks.steg.map(s => '<li>' + M.markup(s) + '</li>').join('') + '</ol></div>';
    if (ord.length) b += '<div class="ark-husk"><h2>🔤 Ord du bør kunne</h2><ul>' + ord.map(o => '<li><b>' + esc(o.ord[0]) + ':</b> ' + M.markup(o.forklaring) + '</li>').join('') + '</ul></div>';
    b += '<div class="ark-husk"><h2>🧭 Slik tenker du i en oppgave</h2><ol style="padding-left:6mm;list-style:decimal">' + TENK.map(x => '<li>' + x + '</li>').join('') + '</ol></div></div>';
    return side(hode('Husk-ark: ' + esc(tittel), trinnFor(key).tittel) + b + fot(cfg, esc(tittel)));
  }

  /* ---------- Hva kan jeg? ---------- */
  function bygg_hvakan(cfg) {
    const tr = CUR.find(x => String(x.trinn) === String(cfg.trinn));
    const temaer = cfg.tema === 'trinn' ? tr.temaer.filter(t => t.klar) : [tr.temaer.find(t => tr.trinn + '/' + t.id === cfg.tema)];
    const GEN = ['forklare en regel eller metode med egne ord', 'vise et eksempel med tegning eller figur', 'sjekke om svaret mitt er rimelig'];
    let rader = '';
    temaer.forEach(function (t) {
      const mal = (t.dekker || []).map(n => tr.kompetansemal[n - 1]).filter(Boolean);
      rader += '<tr><th colspan="4" style="text-align:left">' + t.ikon + ' ' + esc(t.tittel) + '</th></tr>';
      mal.forEach(m => { rader += '<tr><td>Jeg kan ' + esc(m) + '.</td><td class="k"></td><td class="k"></td><td class="k"></td></tr>'; });
      if (cfg.tema !== 'trinn') GEN.forEach(g => { rader += '<tr><td>Jeg kan ' + g + '.</td><td class="k"></td><td class="k"></td><td class="k"></td></tr>'; });
    });
    const sk = hode('Hva kan jeg?' + (cfg.tema === 'trinn' ? ' ' + tr.tittel : ': ' + esc(temaer[0].tittel)), 'Kryss av med blyant. Du kan endre senere.') + navnFelt +
      '<table class="ark-kryss"><thead><tr><th>Jeg kan …</th><th>😕<br>Ikke ennå</th><th>😐<br>Nesten</th><th>😀<br>Ja!</th></tr></thead><tbody>' + rader + '</tbody></table>' +
      '<p style="margin-top:6px"><b>Dette vil jeg øve mer på:</b></p><div class="ark-linjer"><i></i><i></i></div>' + fot(cfg, 'Hva kan jeg?');
    return side(sk);
  }

  /* ---------- utgangsbilletter ---------- */
  function billettSpm(key) {
    const L = M.laerer[key] || {}; const m = /Utgangsbillett:\s*«([^»]+)»/.exec(L.slutt || '');
    return m ? m[1] : 'Forklar det viktigste du lærte i dag, med ord og en tegning eller et eksempel.';
  }
  function bygg_billett(cfg) {
    const key = cfg.tema, tittel = temaNavn(key);
    function en() {
      let inn = '<h3>🎟️ Utgangsbillett: ' + esc(tittel) + '</h3>';
      if (cfg.kind === '321') inn += '<p><b>3</b> ting jeg lærte:</p><div class="ark-linjer"><i></i></div><p><b>2</b> ting jeg vil vite mer om:</p><div class="ark-linjer"><i></i></div><p><b>1</b> spørsmål:</p><div class="ark-linjer"><i></i></div>';
      else if (cfg.kind === 'lys') inn += '<p>Hvordan gikk det i dag?</p><p style="font-size:16pt;margin:3mm 0">🔴 Jeg trenger hjelp &nbsp; 🟡 Nesten &nbsp; 🟢 Jeg får det til</p><p>Dette var vanskelig:</p><div class="ark-linjer"><i></i><i></i></div>';
      else inn += '<p>' + esc(billettSpm(key)) + '</p><div class="ark-linjer"><i></i><i></i><i></i></div>';
      return '<div class="ark-billett">' + inn + '</div>';
    }
    let s = ''; for (let i = 0; i < 8; i++) s += en();
    return side(hode('Utgangsbilletter', 'Klipp langs de stiplede linjene') + '<div class="ark-billetter">' + s + '</div>');
  }

  /* ---------- samtalekort ---------- */
  const GENERELLE = ['Forklar for sidemannen med egne ord.', 'Hva er likt og hva er ulikt?', 'Hva om tallene hadde vært dobbelt så store?', 'Lag en oppgave som passer til svaret.', 'Hva er den vanligste feilen her?', 'Vis det med en tegning.', 'Hvordan kan du sjekke svaret?', 'Finnes det en enklere måte?'];
  function bygg_samtale(cfg) {
    const tr = CUR.find(x => String(x.trinn) === String(cfg.trinn));
    const keys = cfg.tema === 'trinn' ? tr.temaer.filter(t => t.klar).map(t => tr.trinn + '/' + t.id) : [cfg.tema];
    let kort = [];
    keys.forEach(k => ((M.laerer[k] || {}).samtale || []).forEach(sp => kort.push([temaNavn(k), sp])));
    GENERELLE.forEach(g => kort.push(['Alle temaer', g]));
    const sider = []; const per = 8;
    for (let i = 0; i < kort.length; i += per) {
      const del = kort.slice(i, i + per); while (del.length < per) del.push(['', '']);
      sider.push(side(hode('Samtalekort', 'Klipp ut. Trekk ett kort og snakk sammen.') + '<div class="ark-kort-rutenett">' + del.map(k => '<div class="ark-kort liten">' + (k[0] ? '<small>' + esc(k[0]) + '</small>' + esc(k[1]) : '') + '</div>').join('') + '</div>'));
    }
    return sider.join('');
  }

  /* ---------- spillark ---------- */
  function uniktPar(key, nivå, n, seed) {
    const raw = nivåItems(key, nivå, n * 2, seed), sett = {}, ut = [];
    raw.forEach(it => { if (it.kort && !sett[it.kort] && it.type !== 'fritekst' && it.type !== 'valg') { sett[it.kort] = 1; ut.push(it); } });
    return ut.slice(0, n);
  }
  function bygg_bingo(cfg) {
    const key = cfg.tema, tittel = temaNavn(key), pool = uniktPar(key, cfg.nivå, 16, cfg.seed);
    if (pool.length < 9) return side(hode('Bingo', esc(tittel)) + '<p>Dette temaet har ikke nok oppgaver med korte svar til bingo. Prøv et annet tema.</p>');
    const r = M.rng(cfg.seed + 5), kortAntall = cfg.kort; let kort = '';
    for (let i = 0; i < kortAntall; i++) {
      const v = r.shuffle(pool).slice(0, 9);
      kort += '<div class="ark-bingo-kort"><h3>BINGO · ' + esc(tittel) + '</h3><div class="ark-bingo-rute">' + v.map(x => '<div>' + esc(x.kort) + '</div>').join('') + '</div></div>';
    }
    const sider = [], per = 4; const deler = kort.split('<div class="ark-bingo-kort">').slice(1).map(x => '<div class="ark-bingo-kort">' + x);
    for (let i = 0; i < deler.length; i += per) sider.push(side(hode('Bingo', esc(tittel) + ' · Kryss av når du har svaret') + '<div class="ark-bingo">' + deler.slice(i, i + per).join('') + '</div>'));
    sider.push(side(hode('Bingo: lærerark', 'Les opp spørsmålene. Elevene krysser av svaret hvis de har det.') + '<ol class="ark-fasit en-kol">' + pool.map(it => '<li>' + it.q + ' <b>' + esc(it.kort) + '</b></li>').join('') + '</ol>'));
    return sider.join('');
  }
  function bygg_par(cfg) {
    const key = cfg.tema, tittel = temaNavn(key), pool = uniktPar(key, cfg.nivå, 12, cfg.seed);
    const r = M.rng(cfg.seed + 9), svar = r.shuffle(pool);
    const kort = (a, f) => '<div class="ark-par">' + a.map(x => '<div class="ark-kort">' + f(x) + '</div>').join('') + '</div>';
    return side(hode('Finn paret: spørsmål', esc(tittel) + ' · Klipp ut kortene') + kort(pool, x => x.q)) + side(hode('Finn paret: svar', esc(tittel) + ' · Klipp ut og legg riktig svar ved hvert spørsmål') + kort(svar, x => esc(x.kort)));
  }
  function bygg_stasjon(cfg) {
    const key = cfg.tema, tittel = temaNavn(key), N = cfg.kort;
    const R = nivåItems(key, 'rolig', N, cfg.seed), V = nivåItems(key, 'vanlig', N, cfg.seed + 3), U = nivåItems(key, 'utfordring', N, cfg.seed + 7);
    function plain(it) { return it.type === 'valg' ? it.q + ' (' + it.valg.map((v, i) => BOKST[i] + ') ' + M.markup(String(v))).join('  ') + ')' : it.q; }
    let sider = [], kort = [], nøkkel = '';
    for (let i = 0; i < N; i++) {
      const rows = [[R[i], '🌱'], [V[i], '🌿'], [U[i], '🚀']].filter(x => x[0]);
      kort.push('<div class="ark-stasjon"><h2>Stasjon ' + (i + 1) + ' · ' + esc(tittel) + '</h2><p style="margin:0 0 3mm">Velg én eller flere oppgaver. Skriv svaret på svararket.</p>' + rows.map(x => '<div class="ark-stasjon-opp"><b>' + x[1] + '</b><div>' + plain(x[0]) + '</div></div>').join('') + '</div>');
      nøkkel += '<li>Stasjon ' + (i + 1) + ': ' + rows.map(x => x[1] + ' ' + (x[0].a || '')).join(' &nbsp;·&nbsp; ') + '</li>';
    }
    for (let i = 0; i < kort.length; i += 2) sider.push(side(hode('Stasjonskort', 'Klipp ut eller sett på pultene') + kort.slice(i, i + 2).join('')));
    let sv = '<table class="ark-kryss"><thead><tr><th>Stasjon</th><th>Svar</th></tr></thead><tbody>';
    for (let i = 1; i <= N; i++) sv += '<tr><td style="width:24mm"><b>' + i + '</b></td><td style="height:20mm"></td></tr>';
    sider.push(side(hode('Svarark for stasjonsløype', esc(tittel)) + navnFelt + sv + '</tbody></table>'));
    if (cfg.fasit !== 'ingen') sider.push(side(hode('Fasit: stasjonsløype', esc(tittel)) + '<ol class="ark-fasit en-kol" style="list-style:none">' + nøkkel + '</ol>'));
    return sider.join('');
  }
  const FEIL = [
    [8, 'Regn ut 3 + 4 · 2', ['3 + 4 · 2', '= 7 · 2', '= 14'], 2, 'Gange skal regnes før pluss.', '3 + 8 = 11'],
    [8, 'Regn ut −5 − (−3)', ['−5 − (−3)', '= −5 − 3', '= −8'], 2, 'Minus foran et negativt tall blir pluss.', '−5 + 3 = −2'],
    [8, 'Regn ut 2³', ['2³', '= 2 · 3', '= 6'], 2, 'Potens betyr gjentatt gange: 2 · 2 · 2.', '2³ = 8'],
    [8, 'Regn ut √16', ['√16', '= 16 : 2', '= 8'], 2, 'Kvadratroten er tallet som ganget med seg selv gir 16.', '√16 = 4'],
    [8, 'Forenkle 3x + 2x', ['3x + 2x', '= 5x²'], 2, 'Når vi legger sammen like ledd, endres bare tallet foran x.', '5x'],
    [8, 'Løs 2x + 3 = 11', ['2x + 3 = 11', '2x = 11 + 3', '2x = 14', 'x = 7'], 2, 'Vi må trekke fra 3 på begge sider.', '2x = 8, x = 4'],
    [8, 'Løs −2x &lt; 6', ['−2x &lt; 6', 'x &lt; 6 : (−2)', 'x &lt; −3'], 3, 'Når vi deler med et negativt tall, snus ulikhetstegnet.', 'x &gt; −3'],
    [8, 'Primtallsfaktoriser 12', ['12 = 3 · 4'], 1, '4 er ikke et primtall og kan deles videre.', '12 = 2 · 2 · 3'],
    [8, 'Regn ut 5 + 3 · (4 − 1)', ['5 + 3 · (4 − 1)', '= 8 · 3', '= 24'], 2, 'Parentes først, så gange, så pluss.', '5 + 3 · 3 = 5 + 9 = 14'],
    [9, 'Katetene er 3 og 4. Finn hypotenusen.', ['c = 3 + 4', 'c = 7'], 1, 'Vi må bruke c² = a² + b².', 'c² = 9 + 16 = 25, c = 5'],
    [9, 'Hypotenusen er 10 og en katet er 6. Finn den andre.', ['a² = 10² + 6²', 'a² = 136', 'a ≈ 11,7'], 1, 'Når du finner en katet, trekker du fra: c² − b².', 'a² = 100 − 36 = 64, a = 8'],
    [9, 'Regn om 45 minutter til timer.', ['45 min = 0,45 timer'], 1, 'Del på 60.', '45 : 60 = 0,75 timer'],
    [9, 'Finn medianen av 3, 9, 1, 7, 5.', ['Midterste tall er 1.'], 1, 'Tallene må sorteres først.', '1, 3, 5, 7, 9: medianen er 5'],
    [9, 'Kan sidene 3, 4 og 8 danne en trekant?', ['Største side er 8.', '3 + 8 = 11, og 11 &gt; 4', 'Ja, det blir en trekant.'], 2, 'Sjekk de to korteste: 3 + 4 = 7 er mindre enn 8.', 'Nei'],
    [9, 'Volum av kule med r = 3 cm', ['V = 4/3 · π · r³', 'V = 4/3 · π · 3²', 'V = 12π cm³'], 2, 'r³ er 27, ikke 9.', 'V = 36π ≈ 113 cm³'],
    [9, 'Sannsynlighet for to kron på to myntkast', ['P = 1/2 + 1/2 = 1'], 1, 'Uavhengige hendelser: gang sannsynlighetene.', '1/2 · 1/2 = 1/4'],
    [10, 'Regn ut (x + 3)²', ['(x + 3)² = x² + 9'], 1, 'Første kvadratsetning har et midtledd: 2 · x · 3.', 'x² + 6x + 9'],
    [10, 'Vekstfaktor for 20 % økning', ['Vekstfaktor = 0,2'], 1, 'Vekstfaktoren er 1 + 0,2.', '1,2'],
    [10, '1000 kr i 2 år med 5 % rente', ['1000 · 1,05 · 2', '= 2100'], 1, 'Renters rente: gang med 1,05 to ganger.', '1000 · 1,05² = 1102,50 kr'],
    [10, 'Stigningstall gjennom (1, 2) og (3, 8)', ['a = (3 − 1) : (8 − 2)', 'a = 2 : 6', 'a = 1/3'], 1, 'Delta y delt på delta x.', 'a = 6 : 2 = 3'],
    [10, 'Løs x + y = 10 og x − y = 2', ['2x = 12', 'x = 6', 'y = 10 + 6 = 16'], 3, 'Sett x = 6 inn: y = 10 − 6.', 'y = 4'],
    [10, '200 kr settes ned 5 %', ['200 · 0,5', '= 100 kr'], 1, 'Vekstfaktor for 5 % nedgang er 0,95.', '200 · 0,95 = 190 kr'],
    [10, 'Regn ut 51² uten kalkulator', ['51² = 50² + 1²', '= 2501'], 1, 'Midtleddet 2 · 50 · 1 mangler.', '2500 + 100 + 1 = 2601'],
    [10, 'Hva skriver print(2 + 3 * 4) ut?', ['2 + 3 = 5', '5 · 4 = 20', 'Svar: 20'], 1, 'Python regner gange før pluss.', '14']
  ];
  function bygg_feil(cfg) {
    const ofs = FEIL.filter(f => f[0] === Number(cfg.trinn));
    const sider = side(hode('Finn feilen · ' + trinnLabel(cfg.trinn), 'Hver løsning har én feil. Sett ring rundt feilen og skriv riktig løsning.') + navnFelt +
      ofs.map((f, i) => '<div class="ark-feil-opp"><b>' + (i + 1) + '.</b> ' + f[1] + (f[2].map(s => '<div class="ark-feil-steg">' + s + '</div>').join('')) + '<div class="ark-linjer"><i style="height:6mm"></i></div></div>').join('') + fot(cfg, 'Finn feilen'));
    const nøkkel = cfg.fasit === 'ingen' ? '' : side(hode('Fasit: Finn feilen', trinnLabel(cfg.trinn)) + '<ol class="ark-fasit en-kol">' + ofs.map(f => '<li>Feil i linje ' + f[3] + ': ' + f[4] + ' <b>Riktig: ' + f[5] + '</b></li>').join('') + '</ol>');
    return sider + nøkkel;
  }
  function trinnLabel(t) { return t + '. trinn'; }

  /* ---------- maler ---------- */
  function bygg_mal(cfg) { const m = M.arkMaler[cfg.mal]; return m ? m.html() : ''; }

  /* ---------- typer ---------- */
  const TYPER = [
    { id: 'oppgave', ikon: '📝', navn: 'Øvingsark', kort: 'Oppgaver i tre nivåer med fasit på eget ark.', felt: ['tema', 'nivå', 'antall', 'plass', 'hjelp', 'kol', 'fasit', 'navn', 'symbol'], bygg: bygg_oppgave },
    { id: 'test', laast: true, ikon: '✅', navn: 'Kort test', kort: 'Del A og del B med poeng og fasit.', felt: ['tema', 'nivå', 'antall', 'plass', 'fasit', 'symbol'], bygg: bygg_test },
    { id: 'startsjekk', ikon: '🚦', navn: 'Startsjekk', kort: 'Hva kan jeg fra før? Ikke en prøve.', felt: ['tema', 'antall', 'fasit'], bygg: bygg_startsjekk },
    { id: 'husk', ikon: '🧠', navn: 'Husk-ark', kort: 'Husk-liste, vanlige feil, eksempel og ord, på én side.', felt: ['tema'], bygg: bygg_husk },
    { id: 'hvakan', ikon: '😀', navn: 'Hva kan jeg?', kort: 'Egenvurdering på papir. Ingen data lagres.', felt: ['temaTrinn'], bygg: bygg_hvakan },
    { id: 'billett', ikon: '🎟️', navn: 'Utgangsbilletter', kort: 'Åtte billetter på én side.', felt: ['tema', 'billettKind'], bygg: bygg_billett },
    { id: 'samtale', ikon: '💬', navn: 'Samtalekort', kort: 'Spørsmål som får elevene til å snakke matte.', felt: ['temaTrinn'], bygg: bygg_samtale },
    { id: 'bingo', ikon: '🎱', navn: 'Bingo', kort: 'Bingokort og lærerark med spørsmål.', felt: ['tema', 'nivå', 'bingoAntall'], bygg: bygg_bingo },
    { id: 'par', ikon: '🧩', navn: 'Finn paret', kort: 'Spørsmåls- og svarkort til å klippe ut.', felt: ['tema', 'nivå'], bygg: bygg_par },
    { id: 'stasjon', ikon: '🏃', navn: 'Stasjonsløype', kort: 'Stasjonskort med tre nivåer, svarark og fasit.', felt: ['tema', 'stasjonAntall', 'fasit'], bygg: bygg_stasjon },
    { id: 'feil', ikon: '🕵️', navn: 'Finn feilen', kort: 'Løsninger med feil som elevene skal finne.', felt: ['trinn', 'fasit'], bygg: bygg_feil },
    { id: 'mal', ikon: '📐', navn: 'Maler', kort: 'Koordinatsystem, rutepapir, tallinjer, tabeller og mer.', felt: ['mal'], bygg: bygg_mal }
  ];

  /* ---------- tilstand (kun i minnet) ---------- */
  const S = { type: 'oppgave', tema: '8/negative-tall', trinn: 8, nivå: 'vanlig', antall: 12, plass: 'middels', hjelp: false, kol: 1, fasit: 'egen', navn: true, symbol: true, kind: 'tema', mal: 'koord4', kort: 4, seed: 1234 };
  function cfg() { return Object.assign({}, S, { kol: S.kol, kort: S.type === 'stasjon' ? S.stasjon : S.type === 'bingo' ? S.bingo : S.kort }); }
  S.stasjon = 6; S.bingo = 8;

  /* ---------- kodelås for prøver ---------- */
  /* Kort test og Kapittelprøve er låst til læreren skriver inn koden, slik at elevene ikke ser hvilken prøve de får.
     Koden ligger bare som en sjekksum i filen, og «åpen» finnes bare i minnet (ny åpning av siden låser igjen).
     Dette er en barriere mot nysgjerrighet, ikke sikker beskyttelse: en elev som kan lese nettsidens kode kan komme rundt den. */
  const KODE_SJEKK = 1783912396;
  const sjekksum = s => { let x = 2166136261; for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619) >>> 0; } return x; };
  M._arkAapen = false;
  M.arkAapne = function (kode) { if (sjekksum('mattereisen|' + String(kode).trim()) === KODE_SJEKK) { M._arkAapen = true; return true; } return false; };
  M.arkLaas = function () { M._arkAapen = false; };
  const erLaast = t => !!(t && t.laast && !M._arkAapen);
  const laasHTML = () => '<div class="ark-laas" role="group" aria-labelledby="laas-t"><div class="laas-ikon" aria-hidden="true">🔒</div><h3 id="laas-t">Denne arktypen er låst</h3><p class="lesbar">Skriv inn koden for å åpne. Slik ser ikke elevene hvilken prøve de får.</p>' +
    '<div class="laas-rad"><label class="sr-only" for="ark-kode">Kode</label><input id="ark-kode" type="password" inputmode="numeric" autocomplete="off" maxlength="12" placeholder="Kode"> <button type="button" class="knapp primær" id="ark-kode-ok">🔓 Åpne</button></div><p class="laas-feil" id="ark-kode-feil" role="alert"></p></div>';

  function fullCfg(t) {
    const c = cfg();
    if (t.felt.indexOf('temaTrinn') >= 0) { if (S.tema !== 'trinn') { c.trinn = Number(S.tema.split('/')[0]); } else c.trinn = S.trinn; }
    c.heleTrinn = t.felt.indexOf('temaTrinn') >= 0 && S.tema === 'trinn';
    if (t.id === 'billett') c.kind = S.kind;
    return c;
  }
  function bygg() {
    const t = TYPER.find(x => x.id === S.type);
    if (erLaast(t)) return '<p class="lesbar">🔒 Låst. Skriv inn koden for å åpne.</p>';
    return t.bygg(fullCfg(t));
  }

  /* ---------- UI ---------- */
  /* Eget rullegardin (i stedet for nettleserens innebygde <select>, som lukket seg med en gang i enkelte nettlesere).
     grupper: [{ tittel?, valg: [[verdi, tekst], ...] }]. Verdien ligger i et skjult felt med samme id, slik at lesFelt() og change-hendelsen virker som før. */
  function dd(id, label, grupper, v) {
    let cur = '';
    const lis = grupper.map(function (g) {
      return (g.tittel ? '<li role="presentation" class="dd-gruppe">' + g.tittel + '</li>' : '') + g.valg.map(function (o) {
        const sel = String(o[0]) === String(v); if (sel) cur = o[1];
        return '<li role="option" tabindex="-1" class="dd-valg' + (sel ? ' valgt' : '') + '" data-v="' + o[0] + '" aria-selected="' + sel + '">' + o[1] + '</li>';
      }).join('');
    }).join('');
    return '<div class="ark-felt"><span id="' + id + '-l">' + label + '</span><div class="dd" data-dd="' + id + '"><button type="button" class="dd-knapp" id="' + id + '-k" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="' + id + '-l ' + id + '-k"><span class="dd-tekst">' + cur + '</span><span class="dd-pil" aria-hidden="true">▾</span></button>' +
      '<ul class="dd-liste" role="listbox" aria-labelledby="' + id + '-l" hidden>' + lis + '</ul><input type="hidden" id="' + id + '" value="' + v + '"></div></div>';
  }
  const temaOpt = (valgt, medTrinn) => dd('ark-tema', 'Tema', CUR.map(tr => ({
    tittel: tr.tittel,
    valg: (medTrinn ? [['trinn:' + tr.trinn, 'Hele ' + tr.tittel]] : []).concat(tr.temaer.filter(t => t.klar).map(t => [tr.trinn + '/' + t.id, t.ikon + ' ' + t.tittel]))
  })), valgt);
  const sel = (id, label, opts, v) => dd(id, label, [{ valg: opts }], v);
  const chk = (id, label, v) => '<label class="ark-felt ark-chk"><input type="checkbox" id="' + id + '"' + (v ? ' checked' : '') + '> ' + label + '</label>';

  function feltHTML(t) {
    let h = '';
    t.felt.forEach(function (f) {
      if (f === 'tema') h += temaOpt(S.tema);
      else if (f === 'temaTrinn') h += temaOpt(S.tema === 'trinn' ? 'trinn:' + S.trinn : S.tema, true);
      else if (f === 'nivå') h += '<div class="ark-felt"><span>Nivå</span><span class="ark-niv" role="group" aria-label="Nivå">' + M.NIVAA.map(n => '<button type="button" class="nivaa-knapp' + (n.id === S.nivå ? ' valgt' : '') + '" data-arknivå="' + n.id + '" aria-pressed="' + (n.id === S.nivå) + '">' + n.ikon + ' ' + n.navn + '</button>').join('') + '</span></div>';
      else if (f === 'antall') h += sel('ark-antall', 'Antall oppgaver', [[6, '6'], [8, '8'], [10, '10'], [12, '12'], [16, '16'], [20, '20']], S.antall);
      else if (f === 'plass') h += sel('ark-plass', 'Plass til regning', [['ingen', 'Ingen'], ['liten', 'Liten'], ['middels', 'Middels'], ['stor', 'Stor']], S.plass);
      else if (f === 'hjelp') h += chk('ark-hjelp', 'Hjelpetekst under oppgavene («Start slik …»)', S.hjelp);
      else if (f === 'kol') h += chk('ark-kol', 'To kolonner', S.kol === 2);
      else if (f === 'fasit') h += sel('ark-fasit', 'Fasit', [['egen', 'På eget ark (kort)'], ['los', 'På eget ark med løsninger'], ['ingen', 'Ingen fasit']], S.fasit);
      else if (f === 'navn') h += chk('ark-navn', 'Felt for navn og dato (elevene skriver selv)', S.navn);
      else if (f === 'symbol') h += chk('ark-symbol', 'Vis nivåsymbol nederst på arket', S.symbol);
      else if (f === 'billettKind') h += sel('ark-kind', 'Type billett', [['tema', 'Ett spørsmål om temaet'], ['321', '3–2–1'], ['lys', 'Trafikklys']], S.kind);
      else if (f === 'bingoAntall') h += sel('ark-bingo', 'Antall bingokort', [[4, '4'], [8, '8'], [12, '12'], [16, '16'], [24, '24']], S.bingo);
      else if (f === 'stasjonAntall') h += sel('ark-stasjon', 'Antall stasjoner', [[4, '4'], [6, '6'], [8, '8']], S.stasjon);
      else if (f === 'trinn') h += sel('ark-trinn', 'Trinn', [[8, '8. trinn'], [9, '9. trinn'], [10, '10. trinn']], S.trinn);
      else if (f === 'mal') h += sel('ark-mal', 'Mal', Object.keys(M.arkMaler).map(k => [k, M.arkMaler[k].ikon + ' ' + M.arkMaler[k].navn]), S.mal);
    });
    if (t.eget) h += t.eget(S, { sel: sel, chk: chk });
    return h;
  }
  function pageArk(mode, trinn, id, id2) {
    if (trinn && TYPER.some(x => x.id === trinn)) { S.type = trinn; trinn = id; id = id2; }
    if (trinn && id && temaFor(trinn + '/' + id)) { S.tema = trinn + '/' + id; S.trinn = Number(trinn); }
    S.nivå = M.nivå; S.seed = Math.floor(Math.random() * 1e6);
    M._after = function () { init(mode); };
    return '<nav class="brødsmule"><a href="' + H(mode) + '">Forsiden</a> › <span>Ark å skrive ut</span></nav>' +
      '<header class="side-hode t9"><h1>🗂️ Ark å skrive ut</h1><p class="lesbar">Lag ark til klassen på noen sekunder. Velg type, tema og nivå, se forhåndsvisningen og trykk «Skriv ut». Du kan også laste ned arket som en egen fil. Alle ark lages i nettleseren. Ingenting sendes eller lagres, og elevene skriver navn og dato for hånd.</p></header>' +
      '<section class="ark-panel"><h2>1. Velg type ark</h2><div class="ark-typer" role="group" aria-label="Type ark">' + TYPER.map(t => '<button type="button" class="ark-type' + (t.id === S.type ? ' valgt' : '') + '" data-arktype="' + t.id + '" aria-pressed="' + (t.id === S.type) + '"><span aria-hidden="true">' + t.ikon + '</span><strong>' + t.navn + '</strong><span class="ark-laas-merke" title="Låst med kode"' + (erLaast(t) ? '' : ' hidden') + '>🔒</span><small>' + (t.laast ? 'Låst med kode, slik at elevene ikke ser prøven.' : t.kort) + '</small></button>').join('') + '</div>' +
      '<h2>2. Velg innhold</h2><div id="ark-felt" class="ark-feltene"></div>' +
      '<div class="ark-knapper"><button type="button" class="knapp primær stor" id="ark-skriv">🖨️ Skriv ut / lagre som PDF</button> <button type="button" class="knapp primær" id="ark-word" hidden>📄 Last ned som Word (.docx)</button> <button type="button" class="knapp" id="ark-fasit-skriv" hidden>🔑 Skriv ut fasit</button> <button type="button" class="knapp" id="ark-fasit-word" hidden>🔑 Fasit og løsningsforslag (Word)</button> <button type="button" class="knapp" id="ark-last">⬇️ Last ned som fil</button> <button type="button" class="knapp" id="ark-nytt">🎲 Nytt sett</button></div>' +
      '<p class="lesbar ark-tips">Tips: I utskriftsvinduet velger du «Lagre som PDF» hvis du vil ha en fil, og «A4» og «Marger: Standard». Skalering: 100 %.</p></section>' +
      '<section><h2>3. Forhåndsvisning</h2><div id="ark-forh" class="ark-forh" aria-live="polite"></div></section><style id="ark-css">' + ARK_CSS + '</style>';
  }
  function oppdater() {
    const t = TYPER.find(x => x.id === S.type), låst = erLaast(t);
    document.getElementById('ark-felt').innerHTML = låst ? laasHTML() : feltHTML(t) + (t.laast ? '<div class="ark-felt"><span>&nbsp;</span><button type="button" class="knapp liten" id="ark-las">🔒 Lås igjen</button></div>' : '');
    document.querySelectorAll('.ark-type').forEach(b => { const v = b.dataset.arktype === S.type; b.classList.toggle('valgt', v); b.setAttribute('aria-pressed', v); const x = TYPER.find(y => y.id === b.dataset.arktype); const l = b.querySelector('.ark-laas-merke'); if (l) l.hidden = !erLaast(x); });
    const kn = document.querySelector('.ark-knapper'); if (kn) kn.hidden = låst;
    const wb = document.getElementById('ark-word'); if (wb) wb.hidden = !t.modell;
    ['ark-fasit-skriv', 'ark-fasit-word'].forEach(id => { const b = document.getElementById(id); if (b) b.hidden = !t.fasitModell; });
    if (låst) { const f = document.getElementById('ark-forh'); if (f) f.innerHTML = ''; setTimeout(() => { const k = document.getElementById('ark-kode'); if (k) k.focus({ preventScroll: true }); }, 30); }
    else forhand();
  }
  function forhand() {
    const el = document.getElementById('ark-forh'); if (!el) return;
    try { el.innerHTML = bygg(); const tt = TYPER.find(x => x.id === S.type); if (tt && tt.forhandMer && !erLaast(tt)) el.insertAdjacentHTML('beforeend', tt.forhandMer(fullCfg(tt))); if (tt && tt.etter) tt.etter(el); } catch (e) { el.innerHTML = '<p>Kunne ikke lage arket. Prøv et annet tema.</p>'; console.error(e); }
  }
  function lesFelt() {
    const g = id => document.getElementById(id);
    if (g('ark-tema')) { const v = g('ark-tema').value; if (v.indexOf('trinn:') === 0) { S.tema = 'trinn'; S.trinn = Number(v.slice(6)); } else { S.tema = v; S.trinn = Number(v.split('/')[0]); } }
    if (g('ark-antall')) S.antall = Number(g('ark-antall').value);
    if (g('ark-plass')) S.plass = g('ark-plass').value;
    if (g('ark-hjelp')) S.hjelp = g('ark-hjelp').checked;
    if (g('ark-kol')) S.kol = g('ark-kol').checked ? 2 : 1;
    if (g('ark-fasit')) S.fasit = g('ark-fasit').value;
    if (g('ark-navn')) S.navn = g('ark-navn').checked;
    if (g('ark-symbol')) S.symbol = g('ark-symbol').checked;
    if (g('ark-kind')) S.kind = g('ark-kind').value;
    if (g('ark-bingo')) S.bingo = Number(g('ark-bingo').value);
    if (g('ark-stasjon')) S.stasjon = Number(g('ark-stasjon').value);
    if (g('ark-trinn')) S.trinn = Number(g('ark-trinn').value);
    if (g('ark-mal')) S.mal = g('ark-mal').value;
    const tt = TYPER.find(x => x.id === S.type); if (tt && tt.les) tt.les(g, S);
  }
  function filnavn() { const t = TYPER.find(x => x.id === S.type); return 'mattereisen-' + t.id + '-' + (S.type === 'mal' ? S.mal : String(S.tema).replace('/', '-')) + '.html'; }
  M.arkDokument = function (html, tittel) {
    return '<!doctype html><html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(tittel) + '</title><style>' + BASE_PRINT + '\n' + ARK_CSS + '\n' + (M.dok ? M.dok.css : '') + '</style></head><body><div class="ikke-skriv">Trykk Ctrl+P (Cmd+P på Mac) for å skrive ut eller lagre som PDF. Velg A4 og skalering 100 %.</div>' + html + '</body></html>';
  };
  function skrivUt(htmlFn) {
    if (erLaast(TYPER.find(x => x.id === S.type))) return;
    let rot = document.getElementById('ark-print'); if (rot) rot.remove();
    rot = document.createElement('div'); rot.id = 'ark-print'; rot.innerHTML = '<style>@page{size:A4;margin:10mm}' + '</style>' + (htmlFn ? htmlFn() : bygg()); document.body.appendChild(rot);
    document.body.classList.add('ark-skriver');
    const rydd = () => { document.body.classList.remove('ark-skriver'); const r = document.getElementById('ark-print'); if (r) r.remove(); window.removeEventListener('afterprint', rydd); };
    window.addEventListener('afterprint', rydd);
    setTimeout(function () { try { window.print(); } catch (e) { /* ignorer */ } setTimeout(rydd, 1500); }, 60);
  }
  function last() {
    if (erLaast(TYPER.find(x => x.id === S.type))) return;
    const t = TYPER.find(x => x.id === S.type);
    const blob = new Blob([M.arkDokument(bygg(), t.navn + ' – Mattereisen')], { type: 'text/html;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filnavn(); document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function lastWord(fasit) {
    const t = TYPER.find(x => x.id === S.type); if (!t || !t.modell || erLaast(t)) return;
    const c = fullCfg(t);
    const blokker = fasit ? t.fasitModell(c) : t.modell(c), fot = fasit ? (t.fasitFot ? t.fasitFot(c) : 'Fasit') : (t.fot ? t.fot(c) : t.navn);
    const blob = M.dok.blob(blokker, { fot: fot, tittel: (fasit ? 'Fasit og løsningsforslag – ' : '') + t.navn + ' – Mattereisen' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'mattereisen-' + t.id + (fasit ? '-fasit' : '') + '-' + (S.tema === 'trinn' ? 'trinn-' + S.trinn : String(S.tema).replace('/', '-')) + (t.id === 'kapittel' && !fasit ? '-' + S.utgave : '') + '.docx';
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function lukkDD(unntatt) {
    document.querySelectorAll('.dd.apen').forEach(function (d) { if (d === unntatt) return; d.classList.remove('apen'); d.querySelector('.dd-liste').hidden = true; d.querySelector('.dd-knapp').setAttribute('aria-expanded', 'false'); });
  }
  function apneDD(d) {
    lukkDD(d); const l = d.querySelector('.dd-liste'), k = d.querySelector('.dd-knapp');
    d.classList.add('apen'); l.hidden = false; k.setAttribute('aria-expanded', 'true');
    const v = l.querySelector('.dd-valg.valgt') || l.querySelector('.dd-valg'); if (v) { l.scrollTop = Math.max(0, v.offsetTop - 60); v.focus({ preventScroll: true }); }
  }
  function velgDD(d, li) {
    const inp = d.querySelector('input[type=hidden]'); inp.value = li.dataset.v;
    d.querySelectorAll('.dd-valg').forEach(x => { x.classList.toggle('valgt', x === li); x.setAttribute('aria-selected', x === li); });
    d.querySelector('.dd-tekst').textContent = li.textContent;
    lukkDD(); d.querySelector('.dd-knapp').focus();
    inp.dispatchEvent(new Event('change', { bubbles: true }));
  }
  function forsokKode() {
    const k = document.getElementById('ark-kode'), f = document.getElementById('ark-kode-feil'); if (!k) return;
    if (M.arkAapne(k.value)) { oppdater(); }
    else { f.textContent = 'Feil kode. Prøv igjen.'; k.value = ''; k.focus(); }
  }
  function init() {
    oppdater();
    const main = document.getElementById('main');
    if (main._arkBundet) return; main._arkBundet = true;      // lyttere bindes bare én gang
    main.addEventListener('click', function (e) {
      const dk = e.target.closest('.dd-knapp');
      if (dk) { const d = dk.closest('.dd'); if (d.classList.contains('apen')) lukkDD(); else apneDD(d); return; }
      const dv = e.target.closest('.dd-valg'); if (dv) { velgDD(dv.closest('.dd'), dv); return; }
      if (!e.target.closest('.dd')) lukkDD();
      if (e.target.closest('#ark-kode-ok')) { forsokKode(); return; }
      if (e.target.closest('#ark-las')) { M.arkLaas(); oppdater(); return; }
      const t = e.target.closest('[data-arktype]'); if (t) { S.type = t.dataset.arktype; S.seed = Math.floor(Math.random() * 1e6); oppdater(); return; }
      const n = e.target.closest('[data-arknivå]'); if (n) { S.nivå = n.dataset.arknivå; if (S.type === 'oppgave') S.hjelp = S.nivå === 'rolig'; oppdater(); return; }
      if (e.target.closest('#ark-skriv')) skrivUt();
      else if (e.target.closest('#ark-last')) last();
      else if (e.target.closest('#ark-word')) lastWord(false);
      else if (e.target.closest('#ark-fasit-word')) lastWord(true);
      else if (e.target.closest('#ark-fasit-skriv')) { const tt = TYPER.find(x => x.id === S.type); if (tt && tt.fasitHTML) skrivUt(() => tt.fasitHTML(fullCfg(tt))); }
      else if (e.target.closest('#ark-nytt')) { const tt = TYPER.find(x => x.id === S.type); if (tt && tt.erEndret && tt.erEndret() && !window.confirm('Du har gjort endringer i prøven. Vil du lage en helt ny prøve og miste endringene?')) return; S.seed = Math.floor(Math.random() * 1e6); forhand(); }
    });
    main.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.id === 'ark-kode') { e.preventDefault(); forsokKode(); return; }
      const d = e.target.closest('.dd'); if (!d) return;
      const apen = d.classList.contains('apen'), valg = Array.prototype.slice.call(d.querySelectorAll('.dd-valg'));
      if (e.key === 'Escape' && apen) { e.preventDefault(); lukkDD(); d.querySelector('.dd-knapp').focus(); }
      else if (e.key === 'Tab' && apen) lukkDD();
      else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !apen) { e.preventDefault(); apneDD(d); }
      else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && apen) { e.preventDefault(); const i = valg.indexOf(document.activeElement); const n = valg[Math.max(0, Math.min(valg.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)))]; if (n) n.focus(); }
      else if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('dd-valg')) { e.preventDefault(); velgDD(d, e.target); }
      else if (e.key === 'Home' && apen) { e.preventDefault(); valg[0].focus(); } else if (e.key === 'End' && apen) { e.preventDefault(); valg[valg.length - 1].focus(); }
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.dd')) lukkDD(); });
    main.addEventListener('change', function (e) { if (e.target.closest('#ark-felt')) { lesFelt(); if (S._refelt) { S._refelt = false; oppdater(); } else forhand(); } });
  }
  M.arkRegistrer = function (t, etter) { const i = etter ? TYPER.findIndex(x => x.id === etter) : -1; if (i >= 0) TYPER.splice(i + 1, 0, t); else TYPER.push(t); };
  M.arkInt = { forhand: forhand, oppdater: oppdater, esc: esc, nivåItems: nivåItems, temaNavn: temaNavn, trinnFor: trinnFor, billettSpm: billettSpm, NIVN: NIVN, CUR: CUR, S: S, cfg: cfg };
  M.pages.ark = pageArk;
  M.arkBygg = function (o) { Object.assign(S, o); return bygg(); };   // for tester
  M.arkTyper = TYPER;
})();
