/* ============================================================
   Start og ruting (hash-basert, fungerer på GitHub Pages)
   #/                       forsiden (Utforsk)
   #/steg/...               samme sider i «Steg for steg»
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
    return { mode: mode, parts: parts };
  }

  function header(mode, parts) {
    const rest = parts.join('/');
    const hU = '#/' + rest, hS = '#/steg' + (rest ? '/' + rest : '');
    const ntt = document.body.classList.contains('lh');
    return '<div class="topbar-inn"><a class="logo" href="' + M.href(mode) + '"><span aria-hidden="true">🧭</span> ' + M.siteName + '</a>' +
      '<div class="seg" role="group" aria-label="Velg hvordan du vil jobbe">' +
      '<a href="' + hU + '"' + (mode === 'utforsk' ? ' aria-current="true"' : '') + '>🔭 Utforsk</a>' +
      '<a href="' + hS + '"' + (mode === 'steg' ? ' aria-current="true"' : '') + '>🪜 Steg for steg</a></div>' +
      '<nav class="topnav" aria-label="Meny"><a href="' + M.href(mode, 'ekstra') + '">📚 Ekstra oppgaver</a><a href="' + M.href(mode, 'verktoy') + '">🛠️ Verktøy</a></nav>' +
      '<button type="button" id="lh-knapp" class="knapp liten lh-knapp" aria-pressed="' + ntt + '" aria-controls="lh-panel">📖 Lesehjelp</button></div>';
  }

  function render() {
    const r = parse(), mode = r.mode, parts = r.parts, P = M.pages;
    document.body.classList.toggle('modus-steg', mode === 'steg');
    document.body.classList.toggle('modus-utforsk', mode !== 'steg');
    if (M.lesehjelpStopp) M.lesehjelpStopp();
    M._after = null;
    let html;
    const tr = parts[0] && M.findTrinn(parts[0]);
    if (!parts.length) html = P.home(mode);
    else if (parts[0] === 'verktoy') html = parts.length >= 2 ? P.topic(mode, 'verktoy', parts[1]) : P.verktoy(mode);
    else if (parts[0] === 'ekstra') html = parts.length >= 3 ? P.ekstra(mode, parts[1], parts[2]) : P.ekstraIndex(mode);
    else if (tr) html = parts.length === 1 ? P.trinn(mode, parts[0]) : P.topic(mode, parts[0], parts[1]);
    else html = P.ikkeFunnet(mode);

    document.getElementById('topbar').innerHTML = header(mode, parts);
    const main = document.getElementById('main');
    main.innerHTML = html;
    document.body.dataset.trinn = tr ? tr.trinn : '';
    const akse = tr ? tr.farge : 't8';
    document.body.style.setProperty('--aksent', mode === 'steg' ? 'var(--s4)' : 'var(--' + akse + ')');
    document.body.style.setProperty('--aksent-bg', mode === 'steg' ? '#e1f6e8' : 'var(--' + akse + '-bg)');
    const h1 = main.querySelector('h1');
    document.title = (h1 ? h1.textContent.replace(/\s+/g, ' ').trim() + ' – ' : '') + M.siteName + (mode === 'steg' ? ' (Steg for steg)' : '');
    if (M._after) M._after();
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
    render();
  });
})();
