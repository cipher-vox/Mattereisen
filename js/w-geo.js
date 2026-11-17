/* ============================================================
   Interaktive modeller: geometri
   pytagoras, trekant, formlikhet, volum
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE; const W = M.widgets; const F = M.fmt;
  const TEAL = '#0e8f9b', ORANGE = '#e8964a', PLUM = '#8a5fbf', GREEN = '#4c9f5a', INK = '#1b2540';
  function frame(root, tittel, inner) { root.classList.add('wg'); root.innerHTML = '<div class="wg-tittel"><span aria-hidden="true">🎮</span> ' + tittel + '</div>' + inner; }
  function slider(id, tekst, min, max, steg, v) { return '<div class="ctl"><label for="' + id + '">' + tekst + ' <output></output></label><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + steg + '" value="' + v + '"></div>'; }
  let uid = 0; const nid = p => p + (++uid) + '-' + Math.floor(Math.random() * 1e4);
  const q = (r, s) => r.querySelector(s);
  function bind(root, fn) { root.querySelectorAll('input[type=range]').forEach(r => { const upd = () => { const o = r.parentNode.querySelector('output'); if (o) o.textContent = F(+r.value); fn(r); }; r.addEventListener('input', upd); const o = r.parentNode.querySelector('output'); if (o) o.textContent = F(+r.value); }); }
  const r2 = x => Math.round(x * 100) / 100;

  /* ---------- Pytagoras ---------- */
  W.pytagoras = function (root, o) {
    const st = { a: o.a || 3, b: o.b || 4 }; const id = nid('py');
    frame(root, o.tittel || 'Pytagoras: kvadratene på sidene',
      '<div class="wg-kontroller">' + slider(id + 'a', 'Katet a', 1, 12, 1, st.a) + slider(id + 'b', 'Katet b', 1, 12, 1, st.b) + '</div><div class="svg-wrap py-bilde"></div><div class="wg-uttrykk py-uttr" aria-live="polite"></div><div class="wg-forklaring lesbar py-tekst" aria-live="polite"></div>');
    const bilde = q(root, '.py-bilde'), ut = q(root, '.py-uttr'), tx = q(root, '.py-tekst');
    function draw() {
      const a = st.a, b = st.b, c = Math.sqrt(a * a + b * b); const sc = 26 * 10 / Math.max(a + b, 10) + 6; const VW = 560, VH = 320;
      // rett vinkel i (ox, oy); katet a går vannrett til høyre, katet b loddrett opp
      const ox = 150, oy = 270 - 0; const A = [ox, oy], B = [ox + a * sc, oy], C = [ox, oy - b * sc];
      let s = '<svg viewBox="0 0 ' + VW + ' ' + VH + '" class="py-svg" role="img" aria-label="Rett trekant med kvadrat på hver side: ' + a * a + ' + ' + b * b + ' = ' + r2(c * c) + '">';
      // kvadrat på a (under)
      s += '<rect x="' + A[0] + '" y="' + A[1] + '" width="' + a * sc + '" height="' + a * sc + '" fill="' + TEAL + '" fill-opacity=".25" stroke="' + TEAL + '" stroke-width="2"/>';
      s += '<text x="' + (A[0] + a * sc / 2) + '" y="' + (A[1] + a * sc / 2 + 6) + '" text-anchor="middle" font-weight="800" fill="' + INK + '">' + a + '² = ' + a * a + '</text>';
      // kvadrat på b (til venstre)
      s += '<rect x="' + (A[0] - b * sc) + '" y="' + (C[1]) + '" width="' + b * sc + '" height="' + b * sc + '" fill="' + ORANGE + '" fill-opacity=".28" stroke="' + ORANGE + '" stroke-width="2"/>';
      s += '<text x="' + (A[0] - b * sc / 2) + '" y="' + (C[1] + b * sc / 2 + 6) + '" text-anchor="middle" font-weight="800" fill="' + INK + '">' + b + '² = ' + b * b + '</text>';
      // trekant
      s += '<polygon points="' + A + ' ' + B + ' ' + C + '" fill="#fff" stroke="' + INK + '" stroke-width="3"/>';
      // kvadrat på hypotenusen (utenfor, mot høyre-opp)
      const dx = B[0] - C[0], dy = B[1] - C[1]; // fra C til B
      const nx = -dy, ny = dx; // normal (peker oppover-høyre når y går ned?)
      const P1 = [C[0], C[1]], P2 = [B[0], B[1]], P3 = [B[0] + nx, B[1] + ny], P4 = [C[0] + nx, C[1] + ny];
      // vi vil ha kvadratet på siden bort fra origo; sjekk retning
      const cen = [(P1[0] + P3[0]) / 2, (P1[1] + P3[1]) / 2]; const flip = ((cen[0] - A[0]) * (cen[0] - A[0]) + (cen[1] - A[1]) * (cen[1] - A[1])) < ((P1[0] + P2[0]) / 2 - A[0]) * ((P1[0] + P2[0]) / 2 - A[0]) + ((P1[1] + P2[1]) / 2 - A[1]) * ((P1[1] + P2[1]) / 2 - A[1]);
      const sg = flip ? -1 : 1; const Q3 = [B[0] + sg * nx, B[1] + sg * ny], Q4 = [C[0] + sg * nx, C[1] + sg * ny];
      s += '<polygon points="' + C + ' ' + B + ' ' + Q3 + ' ' + Q4 + '" fill="' + PLUM + '" fill-opacity=".22" stroke="' + PLUM + '" stroke-width="2"/>';
      s += '<text x="' + ((C[0] + Q3[0]) / 2) + '" y="' + ((C[1] + Q3[1]) / 2 + 6) + '" text-anchor="middle" font-weight="800" fill="' + INK + '">c² = ' + r2(c * c) + '</text>';
      s += '<path d="M' + (A[0] + 14) + ' ' + A[1] + ' L' + (A[0] + 14) + ' ' + (A[1] - 14) + ' L' + A[0] + ' ' + (A[1] - 14) + '" fill="none" stroke="' + INK + '" stroke-width="2"/>';
      s += '</svg>';
      { const pts = [A, B, C, [A[0] - b * sc, C[1]], [A[0] - b * sc, A[1]], [A[0], A[1] + a * sc], [B[0], A[1] + a * sc], Q3, Q4];
        const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); const x0 = Math.min(...xs) - 12, y0 = Math.min(...ys) - 12, x1 = Math.max(...xs) + 12, y1 = Math.max(...ys) + 12;
        s = s.replace('viewBox="0 0 ' + VW + ' ' + VH + '"', 'viewBox="' + x0 + ' ' + y0 + ' ' + (x1 - x0) + ' ' + (y1 - y0) + '" style="max-height:340px;width:100%"'); }
      bilde.innerHTML = s;
      ut.innerHTML = '<span style="color:' + TEAL + '">' + a + '² = ' + a * a + '</span> + <span style="color:' + ORANGE + '">' + b + '² = ' + b * b + '</span> = <span style="color:' + PLUM + '">' + (a * a + b * b) + '</span>';
      tx.innerHTML = 'Hypotenusen er c = √' + (a * a + b * b) + ' ≈ <strong>' + F(r2(c)) + '</strong>. ' + (Number.isInteger(c) ? '🎉 Dette er en <strong>pytagoreisk trippel</strong>: alle tre sidene er hele tall.' : 'Summen av de to små kvadratene er lik det store kvadratet.');
    }
    bind(root, r => { st[r.id === id + 'a' ? 'a' : 'b'] = +r.value; draw(); }); draw();
  };

  /* ---------- Trekanter fra tre sidelengder ---------- */
  W.trekant = function (root, o) {
    const st = { a: o.a || 3, b: o.b || 4, c: o.c || 5 }; const id = nid('tk');
    frame(root, o.tittel || 'Kan tre lengder bli en trekant?',
      '<div class="wg-kontroller">' + slider(id + 'a', 'Side a', 1, 12, 1, st.a) + slider(id + 'b', 'Side b', 1, 12, 1, st.b) + slider(id + 'c', 'Side c', 1, 12, 1, st.c) + '</div><div class="svg-wrap tk-bilde"></div><div class="wg-uttrykk tk-uttr" aria-live="polite"></div><div class="wg-forklaring lesbar tk-tekst" aria-live="polite"></div>');
    const bilde = q(root, '.tk-bilde'), ut = q(root, '.tk-uttr'), tx = q(root, '.tk-tekst');
    function draw() {
      const a = st.a, b = st.b, c = st.c; const sd = [a, b, c].sort((x, y) => x - y); const ok = sd[0] + sd[1] > sd[2]; const VW = 560, VH = 240;
      ut.innerHTML = a + ' + ' + b + ' = ' + (a + b) + (a + b > c ? ' &gt; ' : a + b === c ? ' = ' : ' &lt; ') + c + ' &nbsp;|&nbsp; ' + a + ' + ' + c + ' = ' + (a + c) + (a + c > b ? ' &gt; ' : a + c === b ? ' = ' : ' &lt; ') + b + ' &nbsp;|&nbsp; ' + b + ' + ' + c + ' = ' + (b + c) + (b + c > a ? ' &gt; ' : b + c === a ? ' = ' : ' &lt; ') + a;
      if (!ok) {
        const sc = 560 / (a + b + c + 4) * 1.2; let s = '<svg viewBox="0 0 ' + VW + ' 170" class="tk-svg" role="img" aria-label="Tre staver som ikke rekker til en trekant">';
        const L = [[a, TEAL], [b, ORANGE], [c, PLUM]]; const big = sd[2];
        s += '<g font-weight="800" fill="' + INK + '">'; let y = 20; L.forEach(l => { s += '<rect x="30" y="' + y + '" width="' + l[0] * sc + '" height="16" rx="8" fill="' + l[1] + '"/><text x="' + (40 + l[0] * sc) + '" y="' + (y + 13) + '">' + l[0] + '</text>'; y += 40; }); s += '</g></svg>';
        bilde.innerHTML = s; tx.innerHTML = '❌ De to korteste sidene (' + sd[0] + ' + ' + sd[1] + ' = ' + (sd[0] + sd[1]) + ') rekker ikke til den lengste (' + sd[2] + '). Det kan <strong>ikke</strong> bli en trekant.';
        return;
      }
      // tegn: legg c langs bunnen
      const sc = Math.min(44, 440 / Math.max(a, b, c)); const x0 = 60, y0 = 200;
      const cosA = (b * b + c * c - a * a) / (2 * b * c); const sinA = Math.sqrt(Math.max(0, 1 - cosA * cosA));
      const Pa = [x0, y0], Pb = [x0 + c * sc, y0], Pc = [x0 + b * cosA * sc, y0 - b * sinA * sc];
      const rett = Math.abs(a * a + b * b - c * c) < 1e-9 || Math.abs(a * a + c * c - b * b) < 1e-9 || Math.abs(b * b + c * c - a * a) < 1e-9;
      const maxS = sd[2], sumSq = sd[0] * sd[0] + sd[1] * sd[1]; const type = rett ? 'rettvinklet' : sumSq > maxS * maxS ? 'spissvinklet' : 'stumpvinklet';
      let s = '<svg viewBox="0 0 ' + VW + ' ' + VH + '" class="tk-svg" role="img" aria-label="Trekant med sider ' + a + ', ' + b + ' og ' + c + '">';
      s += '<polygon points="' + Pa + ' ' + Pb + ' ' + Pc + '" fill="' + TEAL + '" fill-opacity=".2" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
      const lab = (P1, P2, t, col, dxy) => '<text x="' + ((P1[0] + P2[0]) / 2 + dxy[0]) + '" y="' + ((P1[1] + P2[1]) / 2 + dxy[1]) + '" text-anchor="middle" font-weight="800" fill="' + col + '">' + t + '</text>';
      s += lab(Pa, Pb, 'c = ' + c, PLUM, [0, 22]) + lab(Pa, Pc, 'b = ' + b, ORANGE, [-24, -4]) + lab(Pb, Pc, 'a = ' + a, TEAL, [26, -4]) + '</svg>';
      bilde.innerHTML = s; tx.innerHTML = '✅ Det blir en trekant. Den er <strong>' + type + '</strong>' + (a === b && b === c ? ' og <strong>likesidet</strong>' : (a === b || b === c || a === c) ? ' og <strong>likebeint</strong>' : '') + '.';
    }
    bind(root, r => { st[r.id.slice(-1)] = +r.value; draw(); }); draw();
  };

  /* ---------- Formlikhet og skalering ---------- */
  W.formlikhet = function (root, o) {
    const st = { k: o.k || 2 }; const id = nid('fl'); const a = o.a || 3, b = o.b || 2;
    frame(root, o.tittel || 'Formlikhet: forstørr en figur',
      '<div class="wg-kontroller">' + slider(id + 'k', 'Målestokk (forstørring) k', 0.5, 4, 0.5, st.k) + '</div><div class="svg-wrap fl-bilde"></div><div class="fl-tab"></div><div class="wg-forklaring lesbar fl-tekst" aria-live="polite"></div>');
    const bilde = q(root, '.fl-bilde'), tab = q(root, '.fl-tab'), tx = q(root, '.fl-tekst');
    function draw() {
      const k = st.k; const u = 24; const VW = 560, VH = 240; const w2 = a * k * u, h2 = b * k * u; const w1 = a * u, h1 = b * u;
      let s = '<svg viewBox="0 0 ' + VW + ' ' + VH + '" class="fl-svg" role="img" aria-label="Rektangel og forstørret rektangel med målestokk ' + k + '">';
      s += '<rect x="20" y="' + (230 - h1) + '" width="' + w1 + '" height="' + h1 + '" fill="' + TEAL + '" fill-opacity=".3" stroke="' + TEAL + '" stroke-width="3"/><text x="' + (20 + w1 / 2) + '" y="' + (230 - h1 / 2 + 5) + '" text-anchor="middle" font-weight="800" fill="' + INK + '">' + a + ' × ' + b + '</text>';
      const x2 = 40 + w1; if (x2 + w2 < 548 && h2 < 220) s += '<rect x="' + x2 + '" y="' + (230 - h2) + '" width="' + w2 + '" height="' + h2 + '" fill="' + ORANGE + '" fill-opacity=".3" stroke="' + ORANGE + '" stroke-width="3"/><text x="' + (x2 + w2 / 2) + '" y="' + (230 - h2 / 2 + 5) + '" text-anchor="middle" font-weight="800" fill="' + INK + '">' + F(a * k) + ' × ' + F(b * k) + '</text>';
      else s += '<text x="300" y="150" text-anchor="middle" fill="' + INK + '">(Den forstørrede figuren er for stor til å vises, men tallene stemmer.)</text>';
      s += '</svg>'; bilde.innerHTML = s;
      tab.innerHTML = '<table class="tabell"><thead><tr><th></th><th>Original</th><th>Forstørret (k = ' + F(k) + ')</th><th>Forhold</th></tr></thead><tbody>' +
        '<tr><th>Sidelengder</th><td>' + a + ' og ' + b + '</td><td>' + F(a * k) + ' og ' + F(b * k) + '</td><td>k = ' + F(k) + '</td></tr>' +
        '<tr><th>Omkrets</th><td>' + 2 * (a + b) + '</td><td>' + F(2 * (a + b) * k) + '</td><td>k = ' + F(k) + '</td></tr>' +
        '<tr><th>Areal</th><td>' + a * b + '</td><td>' + F(a * b * k * k) + '</td><td>k² = ' + F(k * k) + '</td></tr></tbody></table>';
      tx.innerHTML = 'Lengder blir <strong>' + F(k) + '</strong> ganger så store, men arealet blir <strong>' + F(k) + '² = ' + F(k * k) + '</strong> ganger så stort. Vinklene er uendret.';
    }
    bind(root, r => { st.k = +r.value; draw(); }); draw();
  };

  /* ---------- Volum og overflate ---------- */
  const SOLIDS = {
    prisme: { navn: 'Rett prisme (kasse)', par: [['l', 'Lengde', 1, 12, 5], ['b', 'Bredde', 1, 12, 3], ['h', 'Høyde', 1, 12, 4]], V: p => p.l * p.b * p.h, O: p => 2 * (p.l * p.b + p.l * p.h + p.b * p.h), fV: 'V = l · b · h', fO: 'O = 2(l·b + l·h + b·h)' },
    sylinder: { navn: 'Sylinder', par: [['r', 'Radius', 1, 10, 3], ['h', 'Høyde', 1, 12, 6]], V: p => Math.PI * p.r * p.r * p.h, O: p => 2 * Math.PI * p.r * (p.r + p.h), fV: 'V = π · r² · h', fO: 'O = 2π·r·(r + h)' },
    kjegle: { navn: 'Kjegle', par: [['r', 'Radius', 1, 10, 3], ['h', 'Høyde', 1, 12, 4]], V: p => Math.PI * p.r * p.r * p.h / 3, O: p => Math.PI * p.r * (p.r + Math.sqrt(p.r * p.r + p.h * p.h)), fV: 'V = ⅓ · π · r² · h', fO: 'O = π·r·(r + s), s = √(r² + h²)' },
    pyramide: { navn: 'Pyramide (kvadratisk grunnflate)', par: [['s', 'Grunnkant', 1, 12, 4], ['h', 'Høyde', 1, 12, 6]], V: p => p.s * p.s * p.h / 3, O: p => p.s * p.s + 2 * p.s * Math.sqrt(p.h * p.h + p.s * p.s / 4), fV: 'V = ⅓ · G · h', fO: 'O = G + 4 trekanter' },
    kule: { navn: 'Kule', par: [['r', 'Radius', 1, 10, 3]], V: p => 4 / 3 * Math.PI * p.r * p.r * p.r, O: p => 4 * Math.PI * p.r * p.r, fV: 'V = 4/3 · π · r³', fO: 'O = 4 · π · r²' }
  };
  function drawSolid(type, p) {
    const VW = 560, VH = 240, c = '#fff'; let s = '<svg viewBox="0 0 ' + VW + ' ' + VH + '" class="vo-svg" role="img" aria-label="Tegning av ' + SOLIDS[type].navn + '">';
    const col = TEAL, col2 = ORANGE;
    if (type === 'prisme') { const k = 20; const l = p.l * k, b = p.b * k * 0.6, h = p.h * k; const x = 150, y = 225;
      s += '<polygon points="' + x + ',' + y + ' ' + (x + l) + ',' + y + ' ' + (x + l) + ',' + (y - h) + ' ' + x + ',' + (y - h) + '" fill="' + col + '" fill-opacity=".35" stroke="' + INK + '" stroke-width="2.5"/>';
      s += '<polygon points="' + x + ',' + (y - h) + ' ' + (x + b) + ',' + (y - h - b * .6) + ' ' + (x + l + b) + ',' + (y - h - b * .6) + ' ' + (x + l) + ',' + (y - h) + '" fill="' + col2 + '" fill-opacity=".35" stroke="' + INK + '" stroke-width="2.5"/>';
      s += '<polygon points="' + (x + l) + ',' + y + ' ' + (x + l + b) + ',' + (y - b * .6) + ' ' + (x + l + b) + ',' + (y - h - b * .6) + ' ' + (x + l) + ',' + (y - h) + '" fill="' + PLUM + '" fill-opacity=".3" stroke="' + INK + '" stroke-width="2.5"/></svg>'; return s; }
    if (type === 'sylinder') { const k = 17; const r = p.r * k, h = p.h * k * 0.9; const cx = 280, y = 215; const ry = r * 0.35;
      s += '<path d="M' + (cx - r) + ' ' + (y - h) + ' L' + (cx - r) + ' ' + y + ' A' + r + ' ' + ry + ' 0 0 0 ' + (cx + r) + ' ' + y + ' L' + (cx + r) + ' ' + (y - h) + ' Z" fill="' + col + '" fill-opacity=".35" stroke="' + INK + '" stroke-width="2.5"/>';
      s += '<ellipse cx="' + cx + '" cy="' + (y - h) + '" rx="' + r + '" ry="' + ry + '" fill="' + col2 + '" fill-opacity=".4" stroke="' + INK + '" stroke-width="2.5"/></svg>'; return s; }
    if (type === 'kjegle') { const k = 16; const r = p.r * k, h = p.h * k * 1.1; const cx = 280, y = 215; const ry = r * 0.35;
      s += '<path d="M' + (cx - r) + ' ' + y + ' L' + cx + ' ' + (y - h) + ' L' + (cx + r) + ' ' + y + ' A' + r + ' ' + ry + ' 0 0 1 ' + (cx - r) + ' ' + y + ' Z" fill="' + col + '" fill-opacity=".35" stroke="' + INK + '" stroke-width="2.5"/>';
      s += '<path d="M' + (cx - r) + ' ' + y + ' A' + r + ' ' + ry + ' 0 0 0 ' + (cx + r) + ' ' + y + '" fill="' + col2 + '" fill-opacity=".35" stroke="' + INK + '" stroke-width="2.5"/></svg>'; return s; }
    if (type === 'pyramide') { const k = 17; const sd = p.s * k, h = p.h * k; const x = 180, y = 215; const dx = sd * 0.5, dy = sd * 0.3;
      const A = [x, y], B = [x + sd, y], C = [x + sd + dx, y - dy], D = [x + dx, y - dy], T = [x + (sd + dx) / 2, y - dy / 2 - h];
      s += '<polygon points="' + A + ' ' + B + ' ' + C + ' ' + D + '" fill="' + col2 + '" fill-opacity=".25" stroke="' + INK + '" stroke-width="2"/>';
      s += '<polygon points="' + A + ' ' + B + ' ' + T + '" fill="' + col + '" fill-opacity=".4" stroke="' + INK + '" stroke-width="2.5"/><polygon points="' + B + ' ' + C + ' ' + T + '" fill="' + PLUM + '" fill-opacity=".3" stroke="' + INK + '" stroke-width="2.5"/><line x1="' + A[0] + '" y1="' + A[1] + '" x2="' + D[0] + '" y2="' + D[1] + '" stroke="' + INK + '" stroke-dasharray="4 4"/><line x1="' + D[0] + '" y1="' + D[1] + '" x2="' + C[0] + '" y2="' + C[1] + '" stroke="' + INK + '" stroke-dasharray="4 4"/><line x1="' + D[0] + '" y1="' + D[1] + '" x2="' + T[0] + '" y2="' + T[1] + '" stroke="' + INK + '" stroke-dasharray="4 4"/></svg>'; return s; }
    const r = Math.min(100, p.r * 20); s += '<circle cx="280" cy="130" r="' + r + '" fill="' + col + '" fill-opacity=".35" stroke="' + INK + '" stroke-width="2.5"/><ellipse cx="280" cy="130" rx="' + r + '" ry="' + r * .3 + '" fill="none" stroke="' + INK + '" stroke-dasharray="5 4"/></svg>'; return s;
  }
  W.volum = function (root, o) {
    const type = o.type || 'sylinder'; const def = SOLIDS[type]; const id = nid('vo'); const st = {}; def.par.forEach(p => { st[p[0]] = (o.verdier && o.verdier[p[0]]) || p[4]; });
    frame(root, o.tittel || def.navn,
      '<div class="wg-kontroller">' + def.par.map(p => slider(id + p[0], p[1], p[2], p[3], 1, st[p[0]])).join('') + '</div><div class="svg-wrap vo-bilde"></div><div class="wg-uttrykk vo-uttr" aria-live="polite"></div><div class="wg-forklaring lesbar vo-tekst" aria-live="polite"></div>');
    const bilde = q(root, '.vo-bilde'), ut = q(root, '.vo-uttr'), tx = q(root, '.vo-tekst');
    function draw() {
      bilde.innerHTML = drawSolid(type, st);
      ut.innerHTML = '<span style="color:' + TEAL + '">' + def.fV + ' = ' + F(r2(def.V(st))) + '</span>';
      tx.innerHTML = '<strong>Volum:</strong> ' + F(r2(def.V(st))) + ' (kubikkenheter). <strong>Overflate:</strong> ' + F(r2(def.O(st))) + ' (kvadratenheter). <span class="lesbar">' + def.fO + '.</span>';
    }
    bind(root, r => { st[r.id.slice(id.length)] = +r.value; draw(); }); draw();
  };
})();
