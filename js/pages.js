/* ============================================================
   Sider: forside, trinn, tema, ekstra oppgaver, verktøy
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;
  const CUR = M.curriculum;

  M.href = function (mode) {
    const parts = Array.prototype.slice.call(arguments, 1).filter(x => x !== undefined && x !== '');
    return (mode === 'steg' ? '#/steg' : '#') + (parts.length ? '/' + parts.join('/') : '/');
  };
  const H = M.href;
  const verktoyTrinn = {
    trinn: 'verktoy', tittel: 'Verktøy', farge: 't10', ikon: '🛠️', undertittel: 'Python, GeoGebra og regneark',
    get temaer() { return M.verktoy.map(v => Object.assign({ klar: !!(M.topics.utforsk['verktoy/' + v.id] || M.topics.steg['verktoy/' + v.id]) }, v)); }
  };
  const findTrinn = t => String(t) === 'verktoy' ? verktoyTrinn : CUR.find(x => String(x.trinn) === String(t));
  const findTema = (t, id) => { const tr = findTrinn(t); return tr ? tr.temaer.find(x => x.id === id) : null; };
  M.findTrinn = findTrinn; M.findTema = findTema;

  /* ---------- blokker ---------- */
  function listeHTML(b, ctx) {
    const tag = b.nummerert ? 'ol' : 'ul';
    return '<' + tag + ' class="liste">' + b.punkter.map(p => '<li class="lesbar">' + M.markup(p, ctx) + '</li>').join('') + '</' + tag + '>';
  }
  const CALL = { tips: '💡', regel: '📏', advarsel: '⚠️', virkelighet: '🌍', mestring: '🌟', husk: '🧠' };

  function blockHTML(b, ctx) {
    switch (b.t) {
      case 'h': return '<h3 class="lesbar">' + M.markup(b.tekst, ctx) + '</h3>';
      case 'p': return '<p class="lesbar' + (b.stor ? ' stor-tekst' : '') + '">' + M.markup(b.tekst, ctx) + '</p>';
      case 'liste': return listeHTML(b, ctx);
      case 'callout': {
        const stil = b.stil || 'tips';
        return '<aside class="callout ' + stil + '"><div class="callout-ikon" aria-hidden="true">' + (b.ikon || CALL[stil]) + '</div><div class="callout-tekst">' +
          (b.tittel ? '<strong class="lesbar callout-tittel">' + M.markup(b.tittel, ctx) + '</strong>' : '') +
          (b.tekst ? '<div class="lesbar">' + M.markup(b.tekst, ctx) + '</div>' : '') +
          (b.punkter ? listeHTML({ punkter: b.punkter }, ctx) : '') + '</div></aside>';
      }
      case 'guide':
        return '<div class="guide"><div class="guide-figur" aria-hidden="true">' + (b.ikon || '🧭') + '</div><div class="guide-boble lesbar">' + M.markup(b.tekst, ctx) + '</div></div>';
      case 'kort':
        return '<div class="kort-rad">' + b.kort.map(k => '<div class="mini-kort"><div class="mini-ikon" aria-hidden="true">' + k.ikon + '</div><strong class="lesbar">' + M.markup(k.tittel, ctx) + '</strong><div class="lesbar">' + M.markup(k.tekst, ctx) + '</div></div>').join('') + '</div>';
      case 'tabell':
        return '<div class="tabell-wrap"><table class="tabell"><thead><tr>' + b.hode.map(h => '<th>' + M.markup(h) + '</th>').join('') + '</tr></thead><tbody>' +
          b.rader.map(r => '<tr>' + r.map((c, i) => '<td' + (i === 0 ? ' class="første"' : '') + '>' + M.markup(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
      case 'widget': {
        const wid = 'w' + (++ctx.wid);
        ctx.widgets.push({ id: wid, name: b.navn, opts: b.opts });
        return '<div class="wg-holder" id="' + wid + '"></div>';
      }
      case 'eksempel': {
        const opp = b.regn !== undefined ? 'Regn ut: ' + M.prettyExpr(b.regn) : M.markup(b.oppgave, ctx);
        let vis = '';
        if (b.visual) { const wid = 'w' + (++ctx.wid); ctx.widgets.push({ id: wid, name: b.visual.widget, opts: b.visual.opts }); vis = '<div class="oppg-visual" id="' + wid + '"></div>'; }
        return '<div class="eksempel"><div class="eks-hode"><span aria-hidden="true">📘</span> ' + (b.tittel || 'Eksempel') + '</div>' +
          '<div class="eks-oppg lesbar">' + opp + '</div>' + vis +
          '<ol class="eks-steg">' + b.steg.map((s, i) => '<li class="lesbar' + (i === 0 ? ' synlig' : '') + '"' + (i === 0 ? '' : ' hidden') + '>' + M.markup(s, ctx) + '</li>').join('') + '</ol>' +
          (b.steg.length > 1 ? '<div class="eks-knapper"><button type="button" class="knapp primær eks-neste">Vis neste steg ▶</button><button type="button" class="knapp liten eks-alle">Vis alle steg</button></div>' : '') + '</div>';
      }
      case 'oppgaver': return M.taskBlockHTML(b, ctx);
      case 'sjekkliste':
        return '<div class="sjekkliste"><h3>' + (b.tittel || 'Sjekk deg selv') + '</h3><ul>' + b.punkter.map((p, i) =>
          '<li><label><input type="checkbox"><span class="lesbar">' + M.markup(p, ctx) + '</span></label></li>').join('') + '</ul></div>';
      case 'lenke':
        return '<p class="lenke-rad"><a class="knapp primær" href="' + b.href + '">' + b.tekst + '</a></p>';
      case 'html': return b.html;
      default: return '';
    }
  }

  function mountWidgets(ctx) {
    ctx.widgets.forEach(w => { const el = document.getElementById(w.id); if (el) M.mountWidget(el, w.name, w.opts); });
  }

  /* ---------- sidene ---------- */
  function trinnFarge(t) { const x = findTrinn(t); return x ? x.farge : 't8'; }

  function pageHome(mode) {
    const steg = mode === 'steg';
    const ant = t => t.temaer.filter(x => x.klar).length + ' av ' + t.temaer.length + ' temaer klare';
    return '<section class="hero"><div class="hero-tekst"><h1>' + M.siteName + '</h1>' +
      '<p class="ingress lesbar">Matte for 8., 9. og 10. trinn. Forklart med bilder, farger og modeller du kan prøve selv, og med oppgaver fra helt enkle til utfordrende.</p></div>' +
      '<div class="hero-art" aria-hidden="true"><svg viewBox="0 0 320 150" class="hero-linje"><line x1="14" y1="100" x2="306" y2="100" class="hl"/>' +
      [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((v, i) => '<line x1="' + (30 + i * 26) + '" x2="' + (30 + i * 26) + '" y1="92" y2="108" class="ht ' + (v < 0 ? 'neg' : v > 0 ? 'pos' : 'zero') + '"/><text x="' + (30 + i * 26) + '" y="130" text-anchor="middle" class="htx ' + (v < 0 ? 'neg' : v > 0 ? 'pos' : 'zero') + '">' + M.fmt(v) + '</text>').join('') +
      '<circle cx="' + (30 + 8 * 26) + '" cy="60" r="16" class="hp"/><text x="' + (30 + 8 * 26) + '" y="66" text-anchor="middle" class="hpt">+3</text>' +
      '<circle cx="' + (30 + 2 * 26) + '" cy="60" r="16" class="hn"/><text x="' + (30 + 2 * 26) + '" y="66" text-anchor="middle" class="hpt">−3</text></svg></div></section>' +

      '<section class="modus-velger" aria-labelledby="modus-tittel"><h2 id="modus-tittel" class="seksjon-tittel">Hvordan vil du jobbe?</h2><div class="modus-rad">' +
      '<a class="modus-kort utforsk' + (!steg ? ' valgt' : '') + '" href="' + H('utforsk') + '" ' + (!steg ? 'aria-current="true"' : '') + '><span class="modus-ikon" aria-hidden="true">🔭</span><strong>Utforsk</strong><span class="lesbar">Grundige forklaringer, modeller og oppgaver fra enkle til utfordrende.</span></a>' +
      '<a class="modus-kort steg' + (steg ? ' valgt' : '') + '" href="' + H('steg') + '" ' + (steg ? 'aria-current="true"' : '') + '><span class="modus-ikon" aria-hidden="true">🪜</span><strong>Steg for steg</strong><span class="lesbar">Små steg, mange eksempler og mye hjelp underveis. Du bestemmer tempoet.</span></a>' +
      '</div></section>' +

      '<section aria-labelledby="trinn-tittel"><h2 id="trinn-tittel" class="seksjon-tittel">Velg trinn</h2><div class="trinn-grid">' +
      CUR.map(t => '<a class="trinn-kort ' + t.farge + '" href="' + H(mode, t.trinn) + '"><span class="trinn-nr">' + t.trinn + '.</span><span class="trinn-info"><strong>' + t.tittel + '</strong><span class="lesbar">' + t.undertittel + '</span><span class="trinn-status">' + ant(t) + '</span></span><span class="pil" aria-hidden="true">→</span></a>').join('') +
      '</div></section>' +

      '<section aria-labelledby="mer-tittel"><h2 id="mer-tittel" class="seksjon-tittel">Mer å utforske</h2><div class="mer-grid">' +
      '<a class="mer-kort" href="' + H(mode, 'ekstra') + '"><span class="mini-ikon" aria-hidden="true">📚</span><strong>Ekstra oppgaver</strong><span class="lesbar">Mange flere oppgaver, delt inn i trinn og temaer. Fasit står til slutt.</span></a>' +
      '<a class="mer-kort" href="' + H(mode, 'verktoy') + '"><span class="mini-ikon" aria-hidden="true">🛠️</span><strong>Python, GeoGebra og Excel</strong><span class="lesbar">Lær å bruke digitale verktøy i matte, helt fra start.</span></a>' +
      '</div></section>';
  }

  function pageTrinn(mode, trinn) {
    const t = findTrinn(trinn); if (!t) return pageIkkeFunnet(mode);
    return '<nav class="brødsmule" aria-label="Du er her"><a href="' + H(mode) + '">Forsiden</a> › <span>' + t.tittel + '</span></nav>' +
      '<header class="side-hode ' + t.farge + '"><h1>' + t.tittel + '</h1><p class="lesbar">' + t.undertittel + '</p></header>' +
      '<div class="tema-grid">' + t.temaer.map(x => x.klar
        ? '<a class="tema-kort klar ' + t.farge + '" href="' + H(mode, t.trinn, x.id) + '"><span class="tema-ikon" aria-hidden="true">' + x.ikon + '</span><strong>' + x.tittel + '</strong><span class="lesbar">' + x.kort + '</span><span class="merke klar-merke">Åpne →</span></a>'
        : '<div class="tema-kort snart" aria-disabled="true"><span class="tema-ikon" aria-hidden="true">' + x.ikon + '</span><strong>' + x.tittel + '</strong><span class="lesbar">' + x.kort + '</span><span class="merke">Kommer snart</span></div>').join('') + '</div>' +
      '<p class="lenke-rad"><a class="knapp" href="' + H(mode, 'ekstra') + '">📚 Ekstra oppgaver</a></p>' + malOversikt(t, mode);
  }

  /* Kompetansemål fra læreplanen (MAT01-06) og hvilke temaer som dekker dem */
  function malOversikt(t, mode) {
    if (!t.kompetansemal) return '';
    return '<details class="mal-oversikt"><summary>🎯 Kompetansemål etter ' + t.tittel + ' (fra læreplanen)</summary><ol>' + t.kompetansemal.map(function (m, i) {
      const tema = t.temaer.filter(x => (x.dekker || []).indexOf(i + 1) >= 0);
      return '<li><span class="lesbar">Eleven skal kunne ' + m + '</span>' + (tema.length ? '<div class="mal-temaer">' + tema.map(x => (x.klar ? '<a href="' + H(mode, t.trinn, x.id) + '">' + x.ikon + ' ' + x.tittel + '</a>' : '<span>' + x.ikon + ' ' + x.tittel + '</span>')).join('') + '</div>' : '') + '</li>';
    }).join('') + '</ol></details>';
  }

  function dekkerHTML(tr, meta) {
    if (!meta.dekker || !tr.kompetansemal) return meta.repetisjon ? '<p class="dekker lesbar">📌 Repetisjon fra 7. trinn («bruke og utforske negative tall både praktisk og teoretisk»).</p>' : '';
    return '<details class="dekker"><summary>Kompetansemål i læreplanen</summary><ul>' + meta.dekker.map(i => '<li class="lesbar">Eleven skal kunne ' + tr.kompetansemal[i - 1] + '</li>').join('') + '</ul></details>';
  }

  /* ---------- temaside ---------- */
  function pageTopic(mode, trinn, id) {
    const tr = findTrinn(trinn), meta = findTema(trinn, id);
    if (!tr || !meta) return pageIkkeFunnet(mode);
    const topic = M.topics[mode][trinn + '/' + id] || (trinn === 'verktoy' ? M.topics.utforsk[trinn + '/' + id] || M.topics.steg[trinn + '/' + id] : null);
    const crumbs = '<nav class="brødsmule" aria-label="Du er her"><a href="' + H(mode) + '">Forsiden</a> › <a href="' + H(mode, trinn) + '">' + tr.tittel + '</a> › <span>' + meta.tittel + '</span></nav>';
    if (!topic) {
      return crumbs + '<header class="side-hode ' + tr.farge + '"><h1>' + meta.ikon + ' ' + meta.tittel + '</h1></header>' +
        '<div class="callout tips"><div class="callout-ikon">🚧</div><div class="callout-tekst"><strong>Dette temaet er under arbeid.</strong><div>Her kommer forklaringer, modeller og oppgaver snart.</div></div></div>';
    }
    const ctx = { ordliste: topic.ordliste || [], seen: {}, widgets: [], wid: 0, topicKey: trinn + '-' + id, blokkN: 0 };
    M.setOrdliste(ctx.ordliste);
    const andre = mode === 'steg' ? 'utforsk' : 'steg';
    const bytt = mode === 'steg'
      ? '<a class="bytt-lenke" href="' + H('utforsk', trinn, id) + '">Vil du ha den fulle forklaringen med flere utfordringer? Gå til Utforsk →</a>'
      : '<a class="bytt-lenke" href="' + H('steg', trinn, id) + '">Vil du ta det i mindre steg? Gå til Steg for steg →</a>';
    let h = crumbs +
      '<header class="topic-hode ' + tr.farge + '"><div class="topic-ikon" aria-hidden="true">' + meta.ikon + '</div><div><p class="over-tittel">' + tr.tittel + (mode === 'steg' ? ' · Steg for steg' : '') + '</p><h1>' + (topic.tittel || meta.tittel) + '</h1>' +
      (topic.ingress ? '<p class="ingress lesbar">' + M.markup(topic.ingress, ctx) + '</p>' : '') + '</div></header>' +
      '<div class="topic-topp">' + (topic.mal ? '<section class="mal-boks"><h2>🎯 ' + (mode === 'steg' ? 'Dette skal du lære' : 'Mål for temaet') + '</h2><ul>' + topic.mal.map(m => '<li class="lesbar">' + M.markup(m, ctx) + '</li>').join('') + '</ul>' + (mode !== 'steg' ? dekkerHTML(tr, meta) : '') + '</section>' : '') + '</div>';
    h += '<div class="topic-layout"><nav class="toc ' + (mode === 'steg' ? 'toc-sti' : '') + '" aria-label="Innhold"><h2>' + (mode === 'steg' ? 'Stien din' : 'Innhold') + '</h2><ol>' +
      topic.seksjoner.map((s, i) => '<li><button type="button" class="toc-lenke" data-scroll="s' + (i + 1) + '" data-toc="s' + (i + 1) + '"><span class="toc-nr">' + (i + 1) + '</span><span class="toc-tittel">' + (mode === 'steg' ? (s.kort || s.tittel) : s.tittel) + '</span></button></li>').join('') +
      '</ol>' + (M.ekstra[trinn + '/' + id] ? '<div class="toc-lenker"><a href="' + H(mode, 'ekstra', trinn, id) + '">📚 Ekstra oppgaver</a></div>' : '') + '</nav><div class="topic-innhold">';
    topic.seksjoner.forEach(function (s, i) {
      ctx.seen = {}; ctx.sek = 's' + (i + 1); ctx.blokkN = 0;
      h += '<section class="seksjon farge-' + ((i % 6) + 1) + '" id="s' + (i + 1) + '"><header class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">' + (s.ikon || (i + 1)) + '</span><h2>' + s.tittel + '</h2></header>' +
        s.blokker.map(b => blockHTML(b, ctx)).join('') + '</section>';
    });
    h += '<p class="lenke-rad slutt-rad">' + (M.ekstra[trinn + '/' + id] ? '<a class="knapp primær" href="' + H(mode, 'ekstra', trinn, id) + '">📚 Øv mer med ekstra oppgaver</a> ' : '') + (trinn === 'verktoy' ? '' : bytt) + '</p></div></div>';
    M._after = function () { mountWidgets(ctx); M.initTaskCounters(document.getElementById('main')); };
    return h;
  }

  /* ---------- ekstra oppgaver ---------- */
  const ekstraState = {};
  function pageEkstraIndex(mode) {
    return '<nav class="brødsmule"><a href="' + H(mode) + '">Forsiden</a> › <span>Ekstra oppgaver</span></nav>' +
      '<header class="side-hode t8"><h1>📚 Ekstra oppgaver</h1><p class="lesbar">Velg trinn og tema. Her er det mange flere oppgaver. Fasit står nederst i hver del, og du kan lage nye sett så mange ganger du vil.</p></header>' +
      CUR.map(t => '<section class="ekstra-trinn"><h2 class="' + t.farge + '-tekst">' + t.tittel + '</h2><div class="tema-grid liten">' + t.temaer.map(x => (x.klar && M.ekstra[t.trinn + '/' + x.id])
        ? '<a class="tema-kort klar ' + t.farge + '" href="' + H(mode, 'ekstra', t.trinn, x.id) + '"><span class="tema-ikon" aria-hidden="true">' + x.ikon + '</span><strong>' + x.tittel + '</strong><span class="merke klar-merke">Åpne →</span></a>'
        : '<div class="tema-kort snart" aria-disabled="true"><span class="tema-ikon" aria-hidden="true">' + x.ikon + '</span><strong>' + x.tittel + '</strong><span class="merke">Kommer snart</span></div>').join('') + '</div></section>').join('');
  }

  function ekstraItems(sek, seed) {
    const r = M.rng(seed); const items = [];
    for (let i = 0; i < sek.antall; i++) items.push(sek.lag(r, i));
    return items;
  }
  function ekstraSekHTML(sek, i) {
    const items = ekstraState[sek.id].items;
    return '<ol class="ekstra-liste">' + items.map((it, k) =>
      '<li data-k="' + k + '"><span class="eq lesbar">' + it.q + '</span><span class="svar-gruppe"><label class="sr-only" for="e-' + sek.id + '-' + k + '">Svar på oppgave ' + (k + 1) + '</label>' +
      '<input id="e-' + sek.id + '-' + k + '" class="ekstra-felt" type="text" autocomplete="off" spellcheck="false" placeholder="svar"><span class="ekstra-status" aria-live="polite"></span></span></li>').join('') + '</ol>' +
      '<details class="fasit-liste"><summary>Vis fasit for «' + sek.tittel + '»</summary><ol>' + items.map(it => '<li>' + it.a + '</li>').join('') + '</ol></details>';
  }
  function pageEkstra(mode, trinn, id) {
    const key = trinn + '/' + id; const meta = findTema(trinn, id), tr = findTrinn(trinn);
    if (!meta || !M.ekstra[key]) return pageEkstraIndex(mode);
    const def = M.ekstra[key](mode);
    M.setOrdliste((M.topics[mode][key] || M.topics.utforsk[key] || {}).ordliste || []);
    let h = '<nav class="brødsmule"><a href="' + H(mode) + '">Forsiden</a> › <a href="' + H(mode, 'ekstra') + '">Ekstra oppgaver</a> › <span>' + meta.tittel + '</span></nav>' +
      '<header class="side-hode ' + tr.farge + '"><h1>📚 ' + def.tittel + '</h1><p class="lesbar">' + def.intro + '</p><p><button type="button" class="knapp liten skriv-ut">🖨️ Skriv ut</button> <a class="knapp liten" href="' + H(mode, trinn, id) + '">← Tilbake til forklaringen</a></p></header>';
    def.seksjoner.forEach(function (sek, i) {
      ekstraState[sek.id] = { def: sek, items: ekstraItems(sek, Math.floor(Math.random() * 1e9)) };
      h += '<section class="seksjon ekstra-seksjon farge-' + ((i % 6) + 1) + '" id="x-' + sek.id + '" data-sek="' + sek.id + '"><header class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">' + sek.ikon + '</span><h2>' + sek.tittel + '</h2><button type="button" class="knapp liten nytt-sett" data-sek="' + sek.id + '">🎲 Nytt sett</button></header>' +
        (sek.intro ? '<p class="lesbar">' + M.markup(sek.intro) + '</p>' : '') + '<div class="ekstra-innhold">' + ekstraSekHTML(sek, i) + '</div></section>';
    });
    M._after = function () { /* ingenting */ };
    return h;
  }
  function ekstraSjekk(input) {
    const li = input.closest('li'); const sekEl = input.closest('[data-sek]'); const st = ekstraState[sekEl.dataset.sek];
    const it = st.items[+li.dataset.k]; const stat = li.querySelector('.ekstra-status');
    const v = input.value.trim(); if (!v) { stat.textContent = ''; li.classList.remove('ok', 'nei'); return; }
    let ok;
    if (it.str !== undefined) ok = v.replace(/\s+/g, '') === it.str;
    else { const n = M.parseNum(v); ok = !isNaN(n) && Math.abs(n - it.num) < 1e-9; }
    li.classList.toggle('ok', ok); li.classList.toggle('nei', !ok);
    stat.textContent = ok ? '✅' : '❌ Prøv igjen';
  }

  /* ---------- verktøy ---------- */
  function pageVerktoy(mode) {
    return '<nav class="brødsmule"><a href="' + H(mode) + '">Forsiden</a> › <span>Python, GeoGebra og regneark</span></nav>' +
      '<header class="side-hode t10"><h1>🛠️ Python, GeoGebra og regneark</h1><p class="lesbar">Tre verktøy som gjør matte både enklere og morsommere. Du lærer dem helt fra start, steg for steg, med bilder og små oppdrag. Du kan prøve alt rett på siden, uten å installere noe.</p></header>' +
      '<div class="tema-grid">' + verktoyTrinn.temaer.map(v => v.klar
        ? '<a class="tema-kort klar t10" href="' + H(mode, 'verktoy', v.id) + '"><span class="tema-ikon" aria-hidden="true">' + v.ikon + '</span><strong>' + v.tittel + '</strong><span class="lesbar">' + v.kort + '</span><span class="merke klar-merke">Åpne →</span></a>'
        : '<div class="tema-kort snart" aria-disabled="true"><span class="tema-ikon" aria-hidden="true">' + v.ikon + '</span><strong>' + v.tittel + '</strong><span class="lesbar">' + v.kort + '</span><span class="merke">Kommer snart</span></div>').join('') + '</div>';
  }
  function pageIkkeFunnet(mode) {
    return '<header class="side-hode t8"><h1>Å nei, her var det ingenting</h1><p>Siden finnes ikke. <a href="' + H(mode) + '">Gå til forsiden</a>.</p></header>';
  }

  M.pages = { home: pageHome, trinn: pageTrinn, topic: pageTopic, ekstraIndex: pageEkstraIndex, ekstra: pageEkstra, verktoy: pageVerktoy, ikkeFunnet: pageIkkeFunnet };

  /* ---------- hendelser på sider ---------- */
  M.bindPages = function () {
    document.addEventListener('click', function (e) {
      const t = e.target;
      const sc = t.closest('[data-scroll]');
      if (sc) { const el = document.getElementById(sc.dataset.scroll); if (el) { el.scrollIntoView({ behavior: M.reduced() ? 'auto' : 'smooth', block: 'start' }); el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); } return; }
      const nxt = t.closest('.eks-neste');
      if (nxt) {
        const eks = nxt.closest('.eksempel'); const skjult = eks.querySelector('.eks-steg li[hidden]');
        if (skjult) { skjult.hidden = false; skjult.classList.add('synlig', 'ny'); if (M.addReadButtons) M.addReadButtons(skjult.parentNode); }
        if (!eks.querySelector('.eks-steg li[hidden]')) eks.querySelector('.eks-knapper').hidden = true;
        return;
      }
      const alle = t.closest('.eks-alle');
      if (alle) { const eks = alle.closest('.eksempel'); eks.querySelectorAll('.eks-steg li[hidden]').forEach(li => { li.hidden = false; li.classList.add('synlig'); }); eks.querySelector('.eks-knapper').hidden = true; if (M.addReadButtons) M.addReadButtons(eks); return; }
      if (t.closest('.skriv-ut')) { document.querySelectorAll('.fasit-liste').forEach(d => d.open = true); window.print(); return; }
      const ny = t.closest('.nytt-sett');
      if (ny) {
        const st = ekstraState[ny.dataset.sek]; st.items = ekstraItems(st.def, Math.floor(Math.random() * 1e9));
        const sek = document.getElementById('x-' + ny.dataset.sek); sek.querySelector('.ekstra-innhold').innerHTML = ekstraSekHTML(st.def);
        if (M.addReadButtons) M.addReadButtons(sek);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('ekstra-felt')) ekstraSjekk(e.target);
    });
    document.addEventListener('focusout', function (e) {
      if (e.target.classList && e.target.classList.contains('ekstra-felt')) ekstraSjekk(e.target);
    });
  };
})();
