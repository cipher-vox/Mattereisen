/* ============================================================
   Start og ruting (hash-basert, fungerer på GitHub Pages)
   #/                       forsiden (Utforsk)
   #/steg/...               samme sider i «Steg for steg»
   #/tempo/8/tema           samme tema med tre nivåer (Rolig, Vanlig, Utfordring)
   #/8                      trinn
   #/8/negative-tall        tema
   #/ekstra/8/negative-tall ekstra oppgaver
   #/verktoy                Python, GeoGebra og Excel
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;

  function parse() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
    let mode = 'utforsk';
    if (parts[0] === 'steg') { mode = 'steg'; parts.shift(); }
    else if (parts[0] === 'tempo') { mode = 'tempo'; parts.shift(); }
    return { mode: mode, parts: parts };
  }

  function header(mode, parts) {
    const rest = parts.join('/');
    const hU = '#/' + rest, hS = '#/steg' + (rest ? '/' + rest : ''), hT = '#/tempo' + (rest ? '/' + rest : '');
    const ntt = document.body.classList.contains('lh');
    return '<div class="topbar-logo"><a class="logo" href="' + M.href(mode) + '"><span class="logo-ikon" aria-hidden="true">🧭</span><span class="logo-tekst"><strong>' + M.siteName + '</strong><small>Matte for 8., 9. og 10. trinn</small></span></a></div>' +
      '<div class="topbar-meny"><div class="topbar-inn">' +
      '<div class="seg" role="group" aria-label="Velg hvordan du vil jobbe">' +
      '<a href="' + hU + '"' + (mode === 'utforsk' ? ' aria-current="true"' : '') + '>🔭 Utforsk</a>' +
      '<a href="' + hS + '"' + (mode === 'steg' ? ' aria-current="true"' : '') + '>🪜 Steg for steg</a>' +
      '<a href="' + hT + '"' + (mode === 'tempo' ? ' aria-current="true"' : '') + '>🎚️ Tre nivåer</a></div>' +
      '<nav class="topnav" aria-label="Meny"><a href="' + M.href(mode, 'les') + '">🔎 Les og begrunn</a><a href="' + M.href(mode, 'spill') + '">🎮 Spill</a><a href="' + M.href(mode, 'ekstra') + '">📚 Ekstra oppgaver</a><a href="' + M.href(mode, 'verktoy') + '">🛠️ Verktøy</a><a href="' + M.href(mode, 'ark') + '">🗂️ Ark</a><a href="' + M.href(mode, 'ark', 'regelbok') + '">📒 Regelbok</a><a href="' + M.href(mode, 'laerer') + '">👩‍🏫 Lærere</a>' +
      '<button type="button" id="lh-knapp" class="knapp liten lh-knapp" aria-pressed="' + ntt + '" aria-controls="lh-panel">📖 Lesehjelp</button></nav></div></div>';
  }

  /* høyden på den faste menyraden, brukt av alt som skal «klistre» seg under den */
  let toppObs = null;
  function målTopp() {
    const m = document.querySelector('.topbar-meny'); if (!m) return;
    document.documentElement.style.setProperty('--topp', m.offsetHeight + 'px');
    if (toppObs) toppObs.disconnect();
    if (window.ResizeObserver) { toppObs = new ResizeObserver(() => document.documentElement.style.setProperty('--topp', m.offsetHeight + 'px')); toppObs.observe(m); }
  }

  function render() {
    const r = parse(), mode = r.mode, parts = r.parts, P = M.pages;
    document.body.classList.toggle('modus-steg', mode === 'steg');
    document.body.classList.toggle('modus-utforsk', mode !== 'steg' && mode !== 'tempo');
    document.body.classList.toggle('modus-tempo', mode === 'tempo');
    if (M.lesehjelpStopp) M.lesehjelpStopp();
    if (M.spillStopp) M.spillStopp();
    M._after = null; M._hjelpKey = null;
    let html;
    const tr = parts[0] && M.findTrinn(parts[0]);
    if (!parts.length) html = P.home(mode);
    else if (parts[0] === 'verktoy') html = parts.length >= 2 ? P.topic(mode, 'verktoy', parts[1]) : P.verktoy(mode);
    else if (parts[0] === 'spill') html = parts.length >= 2 ? P.spill(mode, parts[1]) : P.spillIndex(mode);
    else if (parts[0] === 'les') html = P.les(mode, parts[1], parts[2]);
    else if (parts[0] === 'laerer') html = P.laerer(mode);
    else if (parts[0] === 'ark') html = P.ark(mode, parts[1], parts[2], parts[3]);
    else if (parts[0] === 'ekstra') html = parts.length >= 3 ? P.ekstra(mode, parts[1], parts[2]) : P.ekstraIndex(mode);
    else if (tr) html = parts.length === 1 ? P.trinn(mode, parts[0]) : (mode === 'tempo' ? P.tempo(parts[0], parts[1]) : P.topic(mode, parts[0], parts[1]));
    else html = P.ikkeFunnet(mode);

    document.getElementById('topbar').innerHTML = header(mode, parts);
    målTopp();
    const main = document.getElementById('main');
    main.innerHTML = html;
    document.body.dataset.trinn = tr ? tr.trinn : '';
    document.body.dataset.nivaa = mode === 'tempo' ? M.nivå : '';
    const akse = tr ? tr.farge : 't8';
    document.body.style.setProperty('--aksent', mode === 'steg' ? 'var(--s4)' : 'var(--' + akse + ')');
    document.body.style.setProperty('--aksent-bg', mode === 'steg' ? '#e1f6e8' : 'var(--' + akse + '-bg)');
    const h1 = main.querySelector('h1');
    document.title = (h1 ? h1.textContent.replace(/\s+/g, ' ').trim() + ' – ' : '') + M.siteName + (mode === 'steg' ? ' (Steg for steg)' : mode === 'tempo' ? ' (Tre nivåer)' : '');
    if (M._after) M._after();
    if (M.hjelpOppdater) M.hjelpOppdater();
    M.addReadButtons(main);
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    M.lesehjelpInit();
    M.bindTasks();
    M.bindPages();
    document.addEventListener('click', function (e) { if (e.target.closest('#lh-knapp')) M.toggleLesehjelp(); });
    window.addEventListener('hashchange', render);
    document.addEventListener('nivaa', function () { const y = window.scrollY; render(); window.scrollTo(0, y); });
    render();
  });
})();
