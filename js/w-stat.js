/* ============================================================
   Interaktive modeller: statistikk og sannsynlighet
   sentralmal (prikkdiagram), simulering (mynt/terning)
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE; const W = M.widgets; const F = M.fmt;
  const TEAL = '#0e8f9b', ORANGE = '#e8964a', PLUM = '#8a5fbf', INK = '#1b2540';
  function frame(root, tittel, inner) { root.classList.add('wg'); root.innerHTML = '<div class="wg-tittel"><span aria-hidden="true">🎮</span> ' + tittel + '</div>' + inner; }
  const q = (r, s) => r.querySelector(s);
  const r2 = x => Math.round(x * 100) / 100; let uid = 0;

  /* ---------- Sentralmål: klikk for å legge til/fjerne prikker ---------- */
  W.sentralmal = function (root, o) {
    const lo = o.min != null ? o.min : 0, hi = o.max != null ? o.max : 10;
    let data = (o.data || [2, 3, 3, 4, 5, 7]).slice();
    frame(root, o.tittel || 'Gjennomsnitt, median og typetall',
      '<p class="lesbar sm-hjelp">Trykk på et tall for å <strong>legge til</strong> en prikk. Trykk på «Fjern siste» for å ta bort.</p><div class="sm-knapper" role="group" aria-label="Velg tall"></div><div class="svg-wrap sm-bilde"></div><div class="sm-verdier" aria-live="polite"></div><div class="sm-ver"><button type="button" class="knapp sm-fjern">Fjern siste</button> <button type="button" class="knapp sm-nullstill">Start på nytt</button></div>');
    const kn = q(root, '.sm-knapper'); for (let v = lo; v <= hi; v++) { const b = document.createElement('button'); b.type = 'button'; b.className = 'knapp sm-tall'; b.textContent = F(v); b.addEventListener('click', () => { if (data.length < 40) { data.push(v); draw(); } }); kn.appendChild(b); }
    q(root, '.sm-fjern').addEventListener('click', () => { data.pop(); draw(); });
    q(root, '.sm-nullstill').addEventListener('click', () => { data = (o.data || [2, 3, 3, 4, 5, 7]).slice(); draw(); });
    function draw() {
      const n = data.length; const VW = 560; const bx = 30, bw = VW - 60; const step = bw / (hi - lo); const cnt = {}; data.forEach(v => cnt[v] = (cnt[v] || 0) + 1); const maxc = Math.max(1, ...Object.values(cnt)); const rad = Math.min(13, 160 / (maxc * 2 + 1)); const H = Math.max(100, 2 * rad * maxc + 60);
      let s = '<svg viewBox="0 0 ' + VW + ' ' + H + '" class="sm-svg" role="img" aria-label="Prikkdiagram med ' + n + ' verdier">';
      s += '<line x1="' + bx + '" y1="' + (H - 30) + '" x2="' + (bx + bw) + '" y2="' + (H - 30) + '" stroke="' + INK + '" stroke-width="2"/>';
      for (let v = lo; v <= hi; v++) { const x = bx + (v - lo) * step; s += '<line x1="' + x + '" y1="' + (H - 34) + '" x2="' + x + '" y2="' + (H - 26) + '" stroke="' + INK + '" stroke-width="2"/><text x="' + x + '" y="' + (H - 8) + '" text-anchor="middle" font-size="13" fill="' + INK + '">' + v + '</text>'; }
      Object.keys(cnt).forEach(k => { for (let i = 0; i < cnt[k]; i++) s += '<circle cx="' + (bx + (k - lo) * step) + '" cy="' + (H - 30 - rad - i * 2 * rad) + '" r="' + (rad - 1) + '" fill="' + TEAL + '" fill-opacity=".85"/>'; });
      if (n) { const mean = data.reduce((a, b) => a + b, 0) / n; const mx = bx + (mean - lo) * step; s += '<polygon points="' + (mx - 9) + ',' + (H - 20) + ' ' + (mx + 9) + ',' + (H - 20) + ' ' + mx + ',' + (H - 31) + '" fill="' + ORANGE + '" stroke="' + INK + '"/>'; }
      s += '</svg>'; q(root, '.sm-bilde').innerHTML = s;
      const out = q(root, '.sm-verdier');
      if (!n) { out.innerHTML = 'Legg til noen prikker.'; return; }
      const so = data.slice().sort((a, b) => a - b); const mean = so.reduce((a, b) => a + b, 0) / n; const med = n % 2 ? so[(n - 1) / 2] : (so[n / 2 - 1] + so[n / 2]) / 2;
      const mx = Math.max(...Object.values(cnt)); const modes = Object.keys(cnt).filter(k => cnt[k] === mx).map(Number);
      out.innerHTML = '<table class="tabell"><tbody><tr><th>Antall</th><td>' + n + '</td></tr><tr><th>Sortert</th><td>' + so.map(v => F(v)).join(', ') + '</td></tr><tr><th style="color:' + ORANGE + '">Gjennomsnitt</th><td>' + F(r2(mean)) + ' <span class="lesbar">(sum ' + F(so.reduce((a, b) => a + b, 0)) + ' ÷ ' + n + ')</span></td></tr><tr><th>Median</th><td>' + F(med) + '</td></tr><tr><th>Typetall</th><td>' + (mx === 1 ? 'Ingen (alle forskjellige)' : modes.map(v => F(v)).join(' og ')) + '</td></tr><tr><th>Variasjonsbredde</th><td>' + F(so[n - 1] - so[0]) + '</td></tr></tbody></table>';
    }
    draw();
  };

  /* ---------- Simulering: mynt, terning, to terninger ---------- */
  const SIM = {
    mynt: { navn: 'Kast en mynt', utfall: ['Mynt', 'Kron'], kast: () => Math.floor(Math.random() * 2), teori: [0.5, 0.5] },
    terning: { navn: 'Kast en terning', utfall: ['1', '2', '3', '4', '5', '6'], kast: () => Math.floor(Math.random() * 6), teori: [1, 1, 1, 1, 1, 1].map(x => x / 6) },
    to: { navn: 'Kast to terninger (sum)', utfall: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], kast: () => Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6), teori: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map(x => x / 36) }
  };
  W.simulering = function (root, o) {
    const type = o.type || 'terning'; const d = SIM[type]; let cnt = d.utfall.map(() => 0); let n = 0;
    frame(root, o.tittel || d.navn,
      '<div class="sm-ver"><button type="button" class="knapp sim-1">Kast 1 gang</button> <button type="button" class="knapp sim-10">Kast 10 ganger</button> <button type="button" class="knapp sim-100">Kast 100 ganger</button> <button type="button" class="knapp sim-1000">Kast 1000 ganger</button> <button type="button" class="knapp sim-0">Start på nytt</button></div><div class="svg-wrap sim-bilde"></div><div class="sim-tab" aria-live="polite"></div>');
    function kast(m) { for (let i = 0; i < m; i++) { cnt[d.kast()]++; n++; } draw(); }
    q(root, '.sim-1').addEventListener('click', () => kast(1)); q(root, '.sim-10').addEventListener('click', () => kast(10)); q(root, '.sim-100').addEventListener('click', () => kast(100)); q(root, '.sim-1000').addEventListener('click', () => kast(1000));
    q(root, '.sim-0').addEventListener('click', () => { cnt = d.utfall.map(() => 0); n = 0; draw(); });
    function draw() {
      const k = d.utfall.length; const VW = 560, VH = 220; const bw = (VW - 60) / k; const maxp = Math.max(...d.teori) * 1.25;
      let s = '<svg viewBox="0 0 ' + VW + ' ' + VH + '" class="sim-svg" role="img" aria-label="Søylediagram over relativ frekvens etter ' + n + ' kast">';
      s += '<line x1="30" y1="' + (VH - 30) + '" x2="' + (VW - 20) + '" y2="' + (VH - 30) + '" stroke="' + INK + '" stroke-width="2"/>';
      d.utfall.forEach((u, i) => { const rf = n ? cnt[i] / n : 0; const h = Math.min(1, rf / maxp) * (VH - 60); const x = 30 + i * bw; const th = d.teori[i] / maxp * (VH - 60);
        s += '<rect x="' + (x + bw * .15) + '" y="' + (VH - 30 - h) + '" width="' + bw * .7 + '" height="' + h + '" fill="' + TEAL + '" fill-opacity=".8"/>';
        s += '<line x1="' + x + '" y1="' + (VH - 30 - th) + '" x2="' + (x + bw) + '" y2="' + (VH - 30 - th) + '" stroke="' + ORANGE + '" stroke-width="3" stroke-dasharray="6 4"/>';
        s += '<text x="' + (x + bw / 2) + '" y="' + (VH - 10) + '" text-anchor="middle" font-size="13" fill="' + INK + '">' + u + '</text>'; });
      s += '<text x="36" y="16" font-size="13" fill="' + ORANGE + '" font-weight="800">- - -  teoretisk sannsynlighet</text></svg>';
      q(root, '.sim-bilde').innerHTML = s;
      q(root, '.sim-tab').innerHTML = '<p class="lesbar">Antall kast: <strong>' + n + '</strong>.</p><table class="tabell"><thead><tr><th>Utfall</th><th>Antall</th><th>Relativ frekvens</th><th>Teori</th></tr></thead><tbody>' + d.utfall.map((u, i) => '<tr><th>' + u + '</th><td>' + cnt[i] + '</td><td>' + (n ? F(r2(cnt[i] / n * 100)) + ' %' : '–') + '</td><td>' + F(r2(d.teori[i] * 100)) + ' %</td></tr>').join('') + '</tbody></table><p class="lesbar">Jo flere kast, desto nærmere kommer den relative frekvensen den teoretiske sannsynligheten.</p>';
    }
    draw();
  };

  /* ---------- Mediegraf: aksen kan lure deg ---------- */
  W.mediegraf = function (root, o) {
    const navn = o.navn || ['Hotell A', 'Hotell B', 'Hotell C']; const verdier = o.verdier || [92, 95, 100]; const start = o.start != null ? o.start : 90; const enhet = o.enhet || '';
    frame(root, o.tittel || 'Samme tall, to ulike grafer',
      '<div class="sm-ver"><label class="mg-valg"><input type="radio" name="mg' + (++uid) + '" class="mg-null" checked> Aksen starter på 0</label> <label class="mg-valg"><input type="radio" name="mg' + uid + '" class="mg-kappet"> Aksen starter på ' + start + '</label></div><div class="svg-wrap mg-bilde"></div><div class="mg-tekst lesbar" aria-live="polite"></div>');
    const kappet = q(root, '.mg-kappet'), nul = q(root, '.mg-null');
    function draw() {
      const y0 = kappet.checked ? start : 0; const mx = Math.max(...verdier); const VW = 560, VH = 240; const bw = (VW - 80) / verdier.length; const top = mx + (mx - y0) * 0.1;
      let s = '<svg viewBox="0 0 ' + VW + ' ' + VH + '" class="mg-svg" role="img" aria-label="Søylediagram. Aksen starter på ' + y0 + '">';
      s += '<line x1="50" y1="' + (VH - 30) + '" x2="' + (VW - 10) + '" y2="' + (VH - 30) + '" stroke="' + INK + '" stroke-width="2"/><line x1="50" y1="10" x2="50" y2="' + (VH - 30) + '" stroke="' + INK + '" stroke-width="2"/>';
      s += '<text x="44" y="' + (VH - 26) + '" text-anchor="end" font-size="12" fill="' + INK + '">' + y0 + '</text><text x="44" y="18" text-anchor="end" font-size="12" fill="' + INK + '">' + F(r2(top)) + '</text>';
      verdier.forEach((v, i) => { const h = (v - y0) / (top - y0) * (VH - 40); const x = 60 + i * bw; s += '<rect x="' + (x + bw * .15) + '" y="' + (VH - 30 - h) + '" width="' + bw * .7 + '" height="' + Math.max(0, h) + '" fill="' + [TEAL, ORANGE, PLUM, '#4c9f5a', '#c25b7a'][i % 5] + '"/><text x="' + (x + bw / 2) + '" y="' + (VH - 34 - h) + '" text-anchor="middle" font-weight="800" font-size="13" fill="' + INK + '">' + F(v) + enhet + '</text><text x="' + (x + bw / 2) + '" y="' + (VH - 10) + '" text-anchor="middle" font-size="13" fill="' + INK + '">' + navn[i] + '</text>'; });
      s += '</svg>'; q(root, '.mg-bilde').innerHTML = s;
      const hlo = (verdier[0] - y0), hhi = (verdier[verdier.length - 1] - y0);
      q(root, '.mg-tekst').innerHTML = kappet.checked ? 'Her <strong>ser</strong> ' + navn[verdier.length - 1] + ' ut til å være ' + (hlo > 0 ? F(r2(hhi / hlo)) : 'mange') + ' ganger så høy som ' + navn[0] + '. Men tallene er nesten like: ' + F(verdier[0]) + ' og ' + F(verdier[verdier.length - 1]) + '.' : 'Når aksen starter på 0, ser forskjellen ut slik den egentlig er: liten.';
    }
    kappet.addEventListener('change', draw); nul.addEventListener('change', draw); draw();
  };
})();
