/* ============================================================
   Nivåer og hjelp.
   Tre nivåer som gjelder for alle: Rolig, Vanlig og Utfordring. Navnene sier noe om
   tempo og hvor mye du vil strekke deg, ikke noe om hvem du er. Valget finnes bare mens
   siden er åpen og kan byttes når som helst. Ingenting lagres.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;
  M.NIVAA = [
    { id: 'rolig', ikon: '🌱', navn: 'Rolig', kort: 'Små tall, ett steg om gangen og mye hjelp underveis.' },
    { id: 'vanlig', ikon: '🌿', navn: 'Vanlig', kort: 'Passe mengde og vanskelighetsgrad.' },
    { id: 'utfordring', ikon: '🚀', navn: 'Utfordring', kort: 'Større tall, flere steg og mer å tenke på.' }
  ];
  M.nivå = 'vanlig';
  M.nivåNr = () => Math.max(0, M.NIVAA.findIndex(n => n.id === M.nivå));
  M.nivaaVelger = function (tittel) {
    return '<div class="nivaa-velger" role="group" aria-label="' + (tittel || 'Velg nivå') + '"><span class="nivaa-tittel">' + (tittel || 'Velg nivå:') + '</span>' +
      M.NIVAA.map(n => '<button type="button" class="nivaa-knapp' + (n.id === M.nivå ? ' valgt' : '') + '" data-nivaa="' + n.id + '" aria-pressed="' + (n.id === M.nivå) + '" title="' + n.kort + '"><span aria-hidden="true">' + n.ikon + '</span> ' + n.navn + '</button>').join('') +
      '</div><p class="nivaa-forklaring lesbar">' + M.NIVAA[M.nivåNr()].kort + ' Du kan bytte når du vil.</p>';
  };
  M.settNivå = function (id) {
    if (!M.NIVAA.some(n => n.id === id)) return;
    M.nivå = id; document.dispatchEvent(new CustomEvent('nivaa', { detail: id }));
  };

  /* ---------- hjelpepanel ---------- */
  const TENKESTEG = [
    ['👀', 'Les oppgaven to ganger', 'Les sakte. Strek under tallene og det oppgaven spør om.'],
    ['📝', 'Hva vet jeg?', 'Skriv opp det som er oppgitt, med enheter.'],
    ['❓', 'Hva skal jeg finne?', 'Si det med egne ord: «Jeg skal finne …»'],
    ['🧰', 'Hvilken regel eller metode passer?', 'Se i Husk-lista under, eller i forklaringen øverst på siden.'],
    ['✏️', 'Regn ett steg om gangen', 'Skriv hvert steg på en ny linje. Da er det lett å finne en feil.'],
    ['✅', 'Sjekk svaret', 'Er svaret rimelig? Kan du sette det inn og få det til å stemme?']
  ];
  function panelHTML(key) {
    const L = (M.laerer && M.laerer[key]) || null;
    let h = '<div class="hjelp-hode"><h2>🧰 Hjelp</h2><button type="button" class="knapp liten hjelp-lukk" aria-label="Lukk hjelpen">✕ Lukk</button></div>';
    h += '<section><h3>Slik tenker du</h3><ol class="tenkesteg">' + TENKESTEG.map(s => '<li><span aria-hidden="true">' + s[0] + '</span> <strong>' + s[1] + '</strong><br><span class="lesbar">' + s[2] + '</span></li>').join('') + '</ol></section>';
    if (L && L.husk) h += '<section><h3>Husk dette i dette temaet</h3><ul class="husk-liste">' + L.husk.map(x => '<li class="lesbar">' + M.markup(x) + '</li>').join('') + '</ul></section>';
    if (L && L.feil) h += '<section><h3>Vanlige feil å se opp for</h3><ul class="husk-liste">' + L.feil.map(x => '<li class="lesbar">' + M.markup(x) + '</li>').join('') + '</ul></section>';
    h += '<section><details><summary>✖️ Gangetabellen</summary>' + gangetabell() + '</details></section>';
    h += '<section><details><summary>↔️ Tallinje −10 til 10</summary>' + tallinje() + '</details></section>';
    return h;
  }
  function gangetabell() {
    let t = '<table class="gange" aria-label="Gangetabell"><thead><tr><th>×</th>' + [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => '<th>' + x + '</th>').join('') + '</tr></thead><tbody>';
    for (let a = 1; a <= 10; a++) { t += '<tr><th>' + a + '</th>'; for (let b = 1; b <= 10; b++) t += '<td>' + (a * b) + '</td>'; t += '</tr>'; }
    return t + '</tbody></table>';
  }
  function tallinje() {
    let s = '<svg viewBox="0 0 440 60" class="hjelp-tallinje" role="img" aria-label="Tallinje fra minus 10 til 10"><line x1="10" y1="30" x2="430" y2="30" stroke="#14213d" stroke-width="3"/>';
    for (let i = -10; i <= 10; i++) { const x = 220 + i * 20; s += '<line x1="' + x + '" y1="' + (i % 5 ? 25 : 20) + '" x2="' + x + '" y2="' + (i % 5 ? 35 : 40) + '" stroke="' + (i < 0 ? '#c2410c' : i > 0 ? '#1d4ed8' : '#15803d') + '" stroke-width="2"/>' + (i % 5 === 0 ? '<text x="' + x + '" y="56" text-anchor="middle" font-size="12" font-weight="700">' + (i < 0 ? '−' + (-i) : i) + '</text>' : ''); }
    return s + '</svg>';
  }
  M.hjelpKnapp = function (key) {
    M._hjelpKey = key || '';
  };
  function sett() {
    const gammel = document.getElementById('hjelp-fab'); if (gammel) gammel.remove();
    const gp = document.getElementById('hjelp-panel'); if (gp) gp.remove();
    if (M._hjelpKey === undefined || M._hjelpKey === null || M._hjelpKey === false) return;
    const b = document.createElement('button'); b.type = 'button'; b.id = 'hjelp-fab'; b.className = 'knapp primær hjelp-fab'; b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', 'hjelp-panel'); b.innerHTML = '🧰 Hjelp';
    document.body.appendChild(b);
    b.addEventListener('click', function () {
      let p = document.getElementById('hjelp-panel');
      if (p) { p.remove(); b.setAttribute('aria-expanded', 'false'); return; }
      p = document.createElement('aside'); p.id = 'hjelp-panel'; p.className = 'hjelp-panel'; p.setAttribute('aria-label', 'Hjelp'); p.innerHTML = panelHTML(M._hjelpKey);
      document.body.appendChild(p); b.setAttribute('aria-expanded', 'true');
      p.querySelector('.hjelp-lukk').addEventListener('click', () => { p.remove(); b.setAttribute('aria-expanded', 'false'); b.focus(); });
      if (M.addReadButtons) M.addReadButtons(p);
    });
  }
  M.hjelpOppdater = sett;
  document.addEventListener('click', function (e) {
    const b = e.target.closest('[data-nivaa]'); if (b) M.settNivå(b.dataset.nivaa);
  });
})();
