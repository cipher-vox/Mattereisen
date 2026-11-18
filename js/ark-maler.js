/* ============================================================
   Maler til utskrift (koordinatsystem, rutepapir, tallinjer, tabeller ...).
   Hver mal gir HTML for én eller flere A4-sider (.ark-side).
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;
  const MINUS = '−';
  const tall = n => (n < 0 ? MINUS + Math.abs(n) : String(n)).replace('.', ',');
  const side = (inner, ekstra) => '<section class="ark-side' + (ekstra ? ' ' + ekstra : '') + '">' + inner + '</section>';
  const hode = (tittel, under) => '<header class="ark-hode"><div class="ark-logo">🧭 Mattereisen</div><h1>' + tittel + '</h1>' + (under ? '<div class="ark-under">' + under + '</div>' : '') + '</header>';
  const navn = '<div class="ark-navn"><span>Navn: <i></i></span><span>Dato: <i></i></span></div>';

  /* ---- koordinatsystem ---- */
  function koord(min, max, enhet, ox, oy, o) {
    o = o || {};
    const lo = o.lo === undefined ? min : o.lo; // laveste y
    let s = '<g transform="translate(' + ox + ',' + oy + ')">';
    const x0 = -min * enhet, y0 = max * enhet, W = (max - min) * enhet, Hh = (max - lo) * enhet;
    for (let i = min; i <= max; i++) s += '<line x1="' + ((i - min) * enhet) + '" y1="0" x2="' + ((i - min) * enhet) + '" y2="' + Hh + '" stroke="#b8c2d0" stroke-width="' + (i % 5 === 0 ? .6 : .25) + '"/>';
    for (let j = lo; j <= max; j++) s += '<line x1="0" y1="' + ((max - j) * enhet) + '" x2="' + W + '" y2="' + ((max - j) * enhet) + '" stroke="#b8c2d0" stroke-width="' + (j % 5 === 0 ? .6 : .25) + '"/>';
    s += '<line x1="' + x0 + '" y1="-3" x2="' + x0 + '" y2="' + (Hh + 3) + '" stroke="#000" stroke-width="1"/><line x1="-3" y1="' + y0 + '" x2="' + (W + 3) + '" y2="' + y0 + '" stroke="#000" stroke-width="1"/>';
    s += '<text x="' + (W + 6) + '" y="' + (y0 + 3) + '" font-size="5" font-style="italic">x</text><text x="' + (x0 + 2) + '" y="-5" font-size="5" font-style="italic">y</text>';
    const fs = o.fs || 3.6;
    for (let i = min; i <= max; i++) if (i !== 0 && (o.alle || i % (o.hver || 1) === 0)) s += '<text x="' + ((i - min) * enhet) + '" y="' + (y0 + 5) + '" font-size="' + fs + '" text-anchor="middle">' + tall(i) + '</text>';
    for (let j = lo; j <= max; j++) if (j !== 0 && (o.alle || j % (o.hver || 1) === 0)) s += '<text x="' + (x0 - 1.5) + '" y="' + ((max - j) * enhet + 1.2) + '" font-size="' + fs + '" text-anchor="end">' + tall(j) + '</text>';
    s += '<text x="' + (x0 - 1.5) + '" y="' + (y0 + 5) + '" font-size="' + fs + '" text-anchor="end">0</text>';
    return s + '</g>';
  }
  function svg(w, h, inner) { return '<svg class="ark-svg" viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,Arial,sans-serif">' + inner + '</svg>'; }

  function koord4() { return side(hode('Koordinatsystem', 'Fire kvadranter, −10 til 10') + navn + svg(190, 200, koord(-10, 10, 9, 5, 6, { hver: 1, fs: 3.2 }))); }
  function koord1() { return side(hode('Koordinatsystem', 'Første kvadrant, 0 til 12') + navn + svg(190, 200, koord(0, 12, 14.5, 10, 8, { hver: 1, fs: 4, alle: true }))); }
  function koordFire() {
    let s = '';
    [[0, 0], [95, 0], [0, 105], [95, 105]].forEach(p => { s += koord(-6, 6, 7, p[0] + 8, p[1] + 8, { fs: 2.8, alle: true }); });
    return side(hode('Fire små koordinatsystemer', 'Fra −6 til 6') + navn + svg(190, 205, s));
  }

  /* ---- rutepapir ---- */
  function mm() {
    let s = '';
    for (let i = 0; i <= 190; i++) s += '<line x1="' + i + '" y1="0" x2="' + i + '" y2="260" stroke="' + (i % 10 === 0 ? '#e08080' : i % 5 === 0 ? '#eaa' : '#f6d4d4') + '" stroke-width="' + (i % 10 === 0 ? .3 : i % 5 === 0 ? .2 : .1) + '"/>';
    for (let j = 0; j <= 260; j++) s += '<line x1="0" y1="' + j + '" x2="190" y2="' + j + '" stroke="' + (j % 10 === 0 ? '#e08080' : j % 5 === 0 ? '#eaa' : '#f6d4d4') + '" stroke-width="' + (j % 10 === 0 ? .3 : j % 5 === 0 ? .2 : .1) + '"/>';
    return side(svg(190, 260, s), 'ark-bar');
  }
  function rutenett() {
    let s = '';
    for (let i = 0; i <= 190; i += 10) s += '<line x1="' + i + '" y1="0" x2="' + i + '" y2="260" stroke="#9aa5b5" stroke-width=".25"/>';
    for (let j = 0; j <= 260; j += 10) s += '<line x1="0" y1="' + j + '" x2="190" y2="' + j + '" stroke="#9aa5b5" stroke-width=".25"/>';
    return side(svg(190, 260, s), 'ark-bar');
  }
  function rutenett5() {
    let s = '';
    for (let i = 0; i <= 190; i += 5) s += '<line x1="' + i + '" y1="0" x2="' + i + '" y2="260" stroke="#9aa5b5" stroke-width=".2"/>';
    for (let j = 0; j <= 260; j += 5) s += '<line x1="0" y1="' + j + '" x2="190" y2="' + j + '" stroke="#9aa5b5" stroke-width=".2"/>';
    return side(svg(190, 260, s), 'ark-bar');
  }
  function prikk() {
    let s = '';
    for (let i = 5; i < 190; i += 10) for (let j = 5; j < 260; j += 10) s += '<circle cx="' + i + '" cy="' + j + '" r=".5" fill="#334155"/>';
    return side(svg(190, 260, s), 'ark-bar');
  }

  /* ---- tallinjer ---- */
  function linje(y, a, b, steg, merk, over) {
    const n = Math.round((b - a) / steg), W = 170, x0 = 10;
    let s = '<line x1="' + (x0 - 5) + '" y1="' + y + '" x2="' + (x0 + W + 5) + '" y2="' + y + '" stroke="#000" stroke-width=".7"/>';
    for (let i = 0; i <= n; i++) {
      const x = x0 + W * i / n, v = Math.round((a + i * steg) * 1000) / 1000;
      const stor = merk ? true : (i % 5 === 0);
      s += '<line x1="' + x + '" y1="' + (y - (stor ? 3 : 2)) + '" x2="' + x + '" y2="' + (y + (stor ? 3 : 2)) + '" stroke="#000" stroke-width=".5"/>';
      if (!over && (n <= 20 || i % 5 === 0)) s += '<text x="' + x + '" y="' + (y + 8) + '" font-size="3.6" text-anchor="middle">' + tall(v) + '</text>';
    }
    return s;
  }
  function tallinjer() {
    let s = '', y = 12;
    [[-10, 10, 1], [0, 10, 1], [0, 1, .1], [0, 100, 10], [-5, 5, .5]].forEach(l => { s += linje(y, l[0], l[1], l[2], true); y += 22; });
    return side(hode('Tallinjer', 'Ferdig utfylte tallinjer') + svg(190, 125, s));
  }
  function tallinjerTomme() {
    let s = '', y = 12;
    for (let k = 0; k < 8; k++) { s += linje(y, 0, 20, 1, true, true); y += 26; }
    return side(hode('Tomme tallinjer', 'Skriv tallene selv. Marker start- og sluttverdi.') + navn + svg(190, 210, s));
  }

  /* ---- tabeller ---- */
  function gange(fylt) {
    let t = '<table class="ark-tab ark-gange"><thead><tr><th>×</th>' + [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => '<th>' + x + '</th>').join('') + '</tr></thead><tbody>';
    for (let a = 1; a <= 10; a++) { t += '<tr><th>' + a + '</th>'; for (let b = 1; b <= 10; b++) t += '<td>' + (fylt ? a * b : '') + '</td>'; t += '</tr>'; }
    return side(hode(fylt ? 'Gangetabellen' : 'Gangetabell å fylle ut', fylt ? '1 til 10' : 'Fyll inn så mange du kan, uten hjelp.') + (fylt ? '' : navn) + t + '</tbody></table>');
  }
  function hundre() {
    let t = '<table class="ark-tab ark-hundre"><tbody>';
    for (let r = 0; r < 10; r++) { t += '<tr>'; for (let c = 1; c <= 10; c++) t += '<td>' + (r * 10 + c) + '</td>'; t += '</tr>'; }
    return side(hode('100-tabell', 'Fargelegg mønstre: tabeller, primtall, kvadrattall') + t + '</tbody></table>');
  }
  function tabell() {
    function en() {
      let t = '<table class="ark-tab ark-xy"><thead><tr><th>x</th><th>y</th></tr></thead><tbody>';
      for (let i = 0; i < 9; i++) t += '<tr><td></td><td></td></tr>';
      return t + '</tbody></table>';
    }
    return side(hode('Verditabell', 'Regel: y = ______________') + navn + '<div class="ark-to">' + en() + en() + '</div><p class="ark-linje-tekst">Hva forteller tabellen?</p><div class="ark-boks ark-h30"></div>');
  }
  function statistikk() {
    let t = '<table class="ark-tab ark-stat"><thead><tr><th>Verdi</th><th>Strek</th><th>Antall</th></tr></thead><tbody>';
    for (let i = 0; i < 10; i++) t += '<tr><td></td><td></td><td></td></tr>';
    t += '</tbody></table>';
    let g = '';
    for (let i = 0; i <= 12; i++) g += '<line x1="12" y1="' + (5 + i * 8) + '" x2="182" y2="' + (5 + i * 8) + '" stroke="#b8c2d0" stroke-width=".3"/>';
    for (let i = 0; i <= 10; i++) g += '<line x1="' + (12 + i * 17) + '" y1="5" x2="' + (12 + i * 17) + '" y2="101" stroke="#b8c2d0" stroke-width=".3"/>';
    g += '<line x1="12" y1="5" x2="12" y2="101" stroke="#000" stroke-width=".8"/><line x1="12" y1="101" x2="182" y2="101" stroke="#000" stroke-width=".8"/>';
    return side(hode('Statistikk-mal', 'Frekvenstabell, diagram og mål') + navn + '<div class="ark-to ark-to-stat">' + t +
      '<div class="ark-mal-bokser"><div class="ark-boks"><b>Gjennomsnitt</b></div><div class="ark-boks"><b>Median</b></div><div class="ark-boks"><b>Typetall</b></div><div class="ark-boks"><b>Variasjonsbredde</b></div></div></div>' +
      '<p class="ark-linje-tekst">Tegn søylediagram:</p>' + svg(190, 108, g));
  }
  function tenkhoyt() {
    function ramme() {
      return '<div class="ark-tenk"><div class="ark-tenk-rad"><b>Gitt</b><span></span></div><div class="ark-tenk-rad"><b>Finn</b><span></span></div><div class="ark-tenk-rad ark-stor"><b>Regn</b><span></span></div><div class="ark-tenk-rad"><b>Svar</b><span></span></div><div class="ark-tenk-rad"><b>Sjekk</b><span class="ark-hint">Er svaret rimelig? Kan jeg sette det inn?</span></div></div>';
    }
    return side(hode('Tenk høyt', 'Gitt · Finn · Regn · Svar · Sjekk') + navn + ramme() + ramme());
  }
  function brok() {
    const rader = [1, 2, 3, 4, 5, 6, 8, 10, 12];
    let s = '<div class="ark-brok">';
    rader.forEach(n => {
      s += '<div class="ark-brok-rad"><div class="ark-brok-navn">' + (n === 1 ? '1' : '1/' + n) + '</div><div class="ark-brok-stripe">';
      for (let i = 0; i < n; i++) s += '<span>' + (n === 1 ? '1' : '1/' + n) + '</span>';
      s += '</div></div>';
    });
    return side(hode('Brøkstriper', 'Sammenlign brøker. Klipp ut om du vil.') + s + '</div>');
  }
  function prosjekt() {
    const seks = [['Problemstilling', 'Hva vil jeg finne ut?'], ['Antakelser', 'Hva forutsetter jeg? (inntekt, priser, tid …)'], ['Data og kilder', 'Hvilke tall bruker jeg, og hvor kommer de fra?'], ['Utregning', 'Regn og vis hvordan. Bruk gjerne regneark.'], ['Konklusjon', 'Hva svarer jeg på problemstillingen?'], ['Hvor sikker er jeg?', 'Hva kan gjøre at svaret blir feil? Hva ville endret konklusjonen?']];
    return side(hode('Prosjektark: utforskende arbeid', 'Planlegg, regn og presenter') + navn + seks.map(x => '<div class="ark-pros"><b>' + x[0] + '</b><i>' + x[1] + '</i><div class="ark-h18"></div></div>').join(''));
  }

  M.arkMaler = {
    koord4: { ikon: '➕', navn: 'Koordinatsystem (fire kvadranter)', html: koord4 },
    koord1: { ikon: '📈', navn: 'Koordinatsystem (første kvadrant)', html: koord1 },
    koordFire: { ikon: '🔲', navn: 'Fire små koordinatsystemer', html: koordFire },
    mm: { ikon: '🟥', navn: 'Millimeterpapir', html: mm },
    rutenett: { ikon: '🔳', navn: 'Rutepapir 1 cm', html: rutenett },
    rutenett5: { ikon: '▦', navn: 'Rutepapir 5 mm', html: rutenett5 },
    prikk: { ikon: '⚫', navn: 'Prikkpapir', html: prikk },
    tallinjer: { ikon: '↔️', navn: 'Tallinjer (utfylte)', html: tallinjer },
    tallinjerTomme: { ikon: '➖', navn: 'Tomme tallinjer', html: tallinjerTomme },
    gange: { ikon: '✖️', navn: 'Gangetabell', html: () => gange(true) },
    gangeTom: { ikon: '🔢', navn: 'Gangetabell å fylle ut', html: () => gange(false) },
    hundre: { ikon: '💯', navn: '100-tabell', html: hundre },
    tabell: { ikon: '🔤', navn: 'Verditabell (x og y)', html: tabell },
    statistikk: { ikon: '📊', navn: 'Statistikk-mal', html: statistikk },
    tenkhoyt: { ikon: '💭', navn: 'Tenk høyt-mal', html: tenkhoyt },
    brok: { ikon: '🍫', navn: 'Brøkstriper', html: brok },
    prosjekt: { ikon: '🗒️', navn: 'Prosjektark', html: prosjekt }
  };
})();
