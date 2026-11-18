/* ============================================================
   Interaktive modeller: tall, algebra og funksjoner
   faktortre, potens, kvadrat, figurtall, arealmodell, balanse,
   ulikhet, maskin, graf
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE; const W = M.widgets; const F = M.fmt; const N = M.num;

  function frame(root, tittel, inner) {
    root.classList.add('wg');
    root.innerHTML = '<div class="wg-tittel"><span aria-hidden="true">🎮</span> ' + tittel + '</div>' + inner;
  }
  function slider(id, tekst, min, max, steg, v) {
    return '<div class="ctl"><label for="' + id + '">' + tekst + ' <output></output></label><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + steg + '" value="' + v + '"></div>';
  }
  let uid = 0; const nid = p => p + (++uid);
  const q = (root, s) => root.querySelector(s);
  function bindSliders(root, fn) {
    root.querySelectorAll('input[type=range]').forEach(function (r) {
      const upd = function () { const o = r.parentNode.querySelector('output'); if (o) o.textContent = F(+r.value); fn(r); };
      r.addEventListener('input', upd); const o = r.parentNode.querySelector('output'); if (o) o.textContent = F(+r.value);
    });
  }

  /* ---------- uttrykksleser (brukes av graf, maskin, GeoGebra-verktøyet) ---------- */
  M.expr = function (src) {
    src = String(src).replace(/−/g, '-').replace(/·|×/g, '*').replace(/÷/g, '/').replace(/(\d),(\d)/g, '$1.$2').replace(/²/g, '^2').replace(/³/g, '^3').replace(/\s+/g, '');
    const tok = []; let i = 0;
    while (i < src.length) {
      const ch = src[i];
      if (/[0-9.]/.test(ch)) { let j = i; while (j < src.length && /[0-9.]/.test(src[j])) j++; tok.push({ t: 'n', v: parseFloat(src.slice(i, j)) }); i = j; }
      else if (/[a-zA-ZæøåÆØÅπ]/.test(ch)) { let j = i; while (j < src.length && /[a-zA-ZæøåÆØÅπ_0-9]/.test(src[j]) && !(j > i && /[0-9]/.test(src[j]) && false)) j++; tok.push({ t: 'i', v: src.slice(i, j) }); i = j; }
      else if ('+-*/^()'.indexOf(ch) >= 0) { tok.push({ t: ch }); i++; }
      else return null;
    }
    // delt identifikator: «ab» uten funksjonsnavn blir a*b; «2x» blir 2*x
    const FUN = { sqrt: Math.sqrt, rot: Math.sqrt, abs: Math.abs, sin: Math.sin, cos: Math.cos, tan: Math.tan, ln: Math.log, lg: Math.log10, exp: Math.exp };
    const CONST = { pi: Math.PI, 'π': Math.PI, e: Math.E };
    const out = [];
    tok.forEach(function (t) {
      if (t.t === 'i' && !FUN[t.v.toLowerCase()] && !(t.v.toLowerCase() in CONST) && t.v.length > 1) {
        t.v.split('').forEach((c, k) => { if (k > 0) out.push({ t: '*' }); out.push({ t: 'i', v: c }); });
      } else out.push(t);
    });
    // implisitt gange
    const T = [];
    out.forEach(function (t, k) {
      const p = T[T.length - 1];
      const pEnd = p && (p.t === 'n' || p.t === ')' || (p.t === 'i' && !FUN[p.v.toLowerCase()]));
      const nStart = t.t === 'n' || t.t === '(' || t.t === 'i';
      if (pEnd && nStart) T.push({ t: '*' });
      T.push(t);
    });
    let pos = 0;
    function peek() { return T[pos]; }
    function eat(t) { if (peek() && peek().t === t) { pos++; return true; } return false; }
    function sum() { let a = prod(); for (;;) { if (eat('+')) { const b = prod(); const x = a; a = v => x(v) + b(v); } else if (eat('-')) { const b = prod(); const x = a; a = v => x(v) - b(v); } else return a; } }
    function prod() { let a = unary(); for (;;) { if (eat('*')) { const b = unary(); const x = a; a = v => x(v) * b(v); } else if (eat('/')) { const b = unary(); const x = a; a = v => x(v) / b(v); } else return a; } }
    function unary() { if (eat('-')) { const a = unary(); return v => -a(v); } if (eat('+')) return unary(); return pow(); }
    function pow() { const a = atom(); if (eat('^')) { const b = unary(); return v => Math.pow(a(v), b(v)); } return a; }
    function atom() {
      const t = peek(); if (!t) throw new Error('slutt');
      if (t.t === 'n') { pos++; return () => t.v; }
      if (t.t === '(') { pos++; const a = sum(); if (!eat(')')) throw new Error(')'); return a; }
      if (t.t === 'i') {
        pos++; const name = t.v.toLowerCase();
        if (FUN[name]) { if (!eat('(')) throw new Error('('); const a = sum(); if (!eat(')')) throw new Error(')'); const f = FUN[name]; return v => f(a(v)); }
        if (name in CONST) return () => CONST[name];
        return v => { if (!(t.v in v)) { const e = new Error('ukjent'); e.navn = t.v; throw e; } return v[t.v]; };
      }
      throw new Error('uventet');
    }
    try { const f = sum(); if (pos < T.length) return null; return function (vars) { try { return f(vars || {}); } catch (e) { return NaN; } }; } catch (e) { return null; }
  };

  /* pen skriving av uttrykk med tall */
  function sgnTerm(c, v) { // c * v, med fortegn, som tekst for lineære ledd
    if (c === 0) return ''; const a = Math.abs(c); const s = c < 0 ? ' − ' : ' + ';
    return s + (v ? (a === 1 ? '' : F(a)) + v : F(a));
  }
  function lin(a, b, xn) { // ax + b
    xn = xn || 'x'; let t = '';
    if (a !== 0) t = (a < 0 ? '−' : '') + (Math.abs(a) === 1 ? '' : F(Math.abs(a))) + xn;
    if (b !== 0) t += (t ? sgnTerm(b, '') : F(b)); if (!t) t = '0'; return t;
  }
  M.linTekst = lin;

  /* ============================================================
     Faktortre
     ============================================================ */
  W.faktortre = function (root, o) {
    let n = o.n || 60;
    frame(root, o.tittel || 'Faktortre og primtallsfaktorer',
      '<div class="wg-kontroller"><div class="ctl"><label for="ft-n">Velg et tall (2–999)</label><div class="stepper"><button type="button" class="knapp liten ft-ned" aria-label="Ett tall mindre">−</button><input type="number" id="ft-n" min="2" max="999" value="' + n + '" class="tallfelt"><button type="button" class="knapp liten ft-opp" aria-label="Ett tall mer">+</button></div></div>' +
      '<button type="button" class="knapp liten ft-ny">🎲 Tilfeldig tall</button></div><div class="svg-wrap ft-svg"></div><div class="wg-forklaring lesbar ft-tekst" aria-live="polite"></div>');
    const svgW = q(root, '.ft-svg'), tekst = q(root, '.ft-tekst'), inp = q(root, '#ft-n');
    function faktorer(m) { const r = []; let d = 2; while (m > 1) { while (m % d === 0) { r.push(d); m /= d; } d++; if (d * d > m && m > 1) { r.push(m); break; } } return r; }
    function draw() {
      n = Math.max(2, Math.min(999, Math.round(+inp.value) || 2)); inp.value = n;
      const fs = faktorer(n); const prim = fs.length === 1;
      const steps = []; let rest = n; fs.forEach(f => { steps.push({ a: rest, p: f, r: rest / f }); rest = rest / f; });
      const H = 70 + steps.length * 70, VW = 420;
      let s = '<svg viewBox="0 0 ' + VW + ' ' + H + '" class="ft-svg-el" role="img" aria-label="Faktortre for ' + n + '">';
      steps.forEach(function (st, i) {
        const y = 40 + i * 70, x = 150 - (i * 0);
        const cx = 210 - Math.min(i, 5) * 0 + 0; // senter
        s += '<g><circle cx="' + (150 + i * 0) + '" cy="' + y + '" r="24" class="ft-node"/><text x="150" y="' + (y + 6) + '" text-anchor="middle" class="ft-txt">' + st.a + '</text></g>';
        if (st.r > 1 || i === steps.length - 1) { /* barn */ }
        if (!(i === steps.length - 1)) {
          s += '<line x1="150" y1="' + (y + 24) + '" x2="95" y2="' + (y + 46) + '" class="ft-line"/><line x1="150" y1="' + (y + 24) + '" x2="205" y2="' + (y + 46) + '" class="ft-line"/>';
          s += '<circle cx="95" cy="' + (y + 70) + '" r="24" class="ft-prim"/><text x="95" y="' + (y + 76) + '" text-anchor="middle" class="ft-txt ft-ptxt">' + st.p + '</text>';
          // neste node flyttes til høyre barn
        }
      });
      // enkel kjedeløsning: tegn på nytt som kjede (primtall til venstre, rest til høyre)
      s = '<svg viewBox="0 0 ' + VW + ' ' + (60 + steps.length * 62) + '" class="ft-svg-el" role="img" aria-label="Faktortre for ' + n + '">';
      let x = 70;
      steps.forEach(function (st, i) {
        const y = 36 + i * 62;
        const node = (cx, cy, v, cls) => '<circle cx="' + cx + '" cy="' + cy + '" r="22" class="' + cls + '"/><text x="' + cx + '" y="' + (cy + 6) + '" text-anchor="middle" class="ft-txt' + (cls === 'ft-prim' ? ' ft-ptxt' : '') + '">' + v + '</text>';
        if (i < steps.length - 1) {
          s += '<line x1="' + x + '" y1="' + (y + 22) + '" x2="' + (x - 30) + '" y2="' + (y + 40) + '" class="ft-line"/><line x1="' + x + '" y1="' + (y + 22) + '" x2="' + (x + 30) + '" y2="' + (y + 40) + '" class="ft-line"/>';
          s += node(x, y, st.a, 'ft-node') + node(x - 30, y + 62, st.p, 'ft-prim');
          x += 30;
        } else {
          s += node(x, y, st.a, 'ft-prim');
        }
      });
      s += '</svg>';
      svgW.innerHTML = s;
      // gruppér
      const g = {}; fs.forEach(f => g[f] = (g[f] || 0) + 1);
      const sup = { 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
      const pot = Object.keys(g).map(k => k + (g[k] > 1 ? (sup[g[k]] || '^' + g[k]) : '')).join(' · ');
      const alle = []; for (let d = 1; d <= n; d++) if (n % d === 0) alle.push(d);
      tekst.innerHTML = prim ? '<p><strong>' + n + ' er et primtall.</strong> Det kan bare deles på 1 og seg selv.</p>'
        : '<p><strong>' + n + ' = ' + fs.join(' · ') + '</strong>' + (pot !== fs.join(' · ') ? ' = <strong>' + pot + '</strong>' : '') + '</p><p>De grønne tallene er <strong>primtall</strong>. Når treet er ferdig, er hele tallet delt opp i primtall.</p><p>Alle faktorene til ' + n + ': ' + alle.join(', ') + ' (' + alle.length + ' stk).</p>';
    }
    inp.addEventListener('input', draw);
    q(root, '.ft-ned').addEventListener('click', () => { inp.value = Math.max(2, n - 1); draw(); });
    q(root, '.ft-opp').addEventListener('click', () => { inp.value = Math.min(999, n + 1); draw(); });
    q(root, '.ft-ny').addEventListener('click', () => { inp.value = 4 + Math.floor(Math.random() * 200); draw(); });
    draw();
  };

  /* ============================================================
     Potens
     ============================================================ */
  W.potens = function (root, o) {
    const st = { a: o.a || 3, n: o.n === undefined ? 3 : o.n };
    const tier = !!o.tier;
    frame(root, o.tittel || (tier ? 'Tierpotenser' : 'Potensbygger'),
      '<div class="wg-kontroller">' + (tier ? '' : slider('po-a', 'Grunntall', 1, 10, 1, st.a)) + slider('po-n', tier ? 'Eksponent' : 'Eksponent (hvor mange ganger)', tier ? -4 : 0, tier ? 9 : 6, 1, st.n) + '</div>' +
      '<div class="wg-uttrykk po-uttrykk" aria-live="polite"></div><div class="svg-wrap po-bilde"></div><div class="wg-forklaring lesbar po-tekst"></div>');
    const ut = q(root, '.po-uttrykk'), bilde = q(root, '.po-bilde'), tx = q(root, '.po-tekst');
    const sup = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    const supp = n => (n < 0 ? '⁻' : '') + String(Math.abs(n)).split('').map(d => sup[+d]).join('');
    function draw() {
      const a = tier ? 10 : st.a, n = st.n;
      if (tier) {
        const v = Math.pow(10, n);
        let tall = n >= 0 ? '1' + '0'.repeat(n) : '0,' + '0'.repeat(-n - 1) + '1';
        if (n >= 4) tall = tall.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        ut.innerHTML = '<span class="stort">10' + supp(n) + ' = ' + tall + '</span>';
        bilde.innerHTML = '';
        tx.innerHTML = n > 0 ? '<p>Eksponenten ' + n + ' forteller hvor mange <strong>nuller</strong> som kommer etter 1.</p>' + (n >= 3 ? '<p>Standardform: et stort tall som <strong>' + F(3.4) + ' · 10' + supp(n) + '</strong> betyr ' + F(3.4) + ' ganget med ' + tall + ', altså ' + F(Math.round(3.4 * v * 1e6) / 1e6).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '.</p>' : '')
          : n === 0 ? '<p>10⁰ = 1. Alle tall (unntatt 0) opphøyd i 0 blir 1.</p>' : '<p>Negativ eksponent betyr at vi deler: 10' + supp(n) + ' = 1/10' + supp(-n) + ' = ' + tall + '.</p>';
        return;
      }
      const fak = n === 0 ? '1' : new Array(n).fill(a).join(' · ');
      const v = Math.pow(a, n);
      ut.innerHTML = '<span class="stort">' + a + supp(n) + ' = ' + fak + ' = ' + v.toLocaleString('nb-NO') + '</span>';
      let s = '';
      if (n === 2 && a <= 10) {
        const c = 26; s = '<svg viewBox="0 0 ' + (a * c + 20) + ' ' + (a * c + 20) + '" class="po-svg" role="img" aria-label="Kvadrat med ' + a + ' ganger ' + a + ' ruter">';
        for (let i = 0; i < a; i++) for (let j = 0; j < a; j++) s += '<rect x="' + (10 + i * c) + '" y="' + (10 + j * c) + '" width="' + (c - 3) + '" height="' + (c - 3) + '" rx="4" class="po-rute"/>'; bilde.innerHTML = s + '</svg>';
        tx.innerHTML = '<p>' + a + '² er arealet til et kvadrat med side ' + a + ': <strong>' + a + ' · ' + a + ' = ' + v + '</strong> ruter. Derfor sier vi «' + a + ' i andre» eller «' + a + ' i annen».</p>';
      } else if (n === 3 && a <= 6) {
        const c = a <= 4 ? 20 : 14, gap = 16, wl = a * c; s = '<svg viewBox="0 0 ' + (a * (wl + gap) + 10) + ' ' + (wl + 36) + '" class="po-svg" role="img" aria-label="' + a + ' lag med ' + a + ' ganger ' + a + ' kuber">';
        for (let k = 0; k < a; k++) { for (let j = 0; j < a; j++) for (let i = 0; i < a; i++) s += '<rect x="' + (10 + k * (wl + gap) + i * c) + '" y="' + (24 + j * c) + '" width="' + (c - 2) + '" height="' + (c - 2) + '" rx="3" class="po-rute k' + (k % 3) + '"/>'; s += '<text x="' + (10 + k * (wl + gap) + wl / 2) + '" y="16" text-anchor="middle" class="aks-txt">lag ' + (k + 1) + '</text>'; }
        bilde.innerHTML = s + '</svg>'; tx.innerHTML = '<p>' + a + '³ er volumet til en kube med side ' + a + ': like mange lag, hvert lag har ' + a + ' · ' + a + ' = ' + a * a + ' kuber. Til sammen <strong>' + a + ' · ' + a + ' · ' + a + ' = ' + v + '</strong>. Derfor sier vi «' + a + ' i tredje».</p>';
      } else {
        bilde.innerHTML = '';
        tx.innerHTML = n === 0 ? '<p>Alt opphøyd i 0 er 1. Det er en avtale som gjør at reglene for potenser alltid virker.</p>' : n === 1 ? '<p>Eksponent 1 betyr at tallet bare står én gang: ' + a + '¹ = ' + a + '.</p>' : '<p><strong>' + a + '</strong> er <em>grunntallet</em> og <strong>' + n + '</strong> er <em>eksponenten</em>. Eksponenten forteller hvor mange ganger grunntallet er med i gangestykket.</p>';
      }
    }
    bindSliders(root, r => { if (r.id === 'po-a') st.a = +r.value; else st.n = +r.value; draw(); }); draw();
  };

  /* ============================================================
     Kvadrat og kvadratrot
     ============================================================ */
  W.kvadrat = function (root, o) {
    const st = { s: o.s || 4, mal: o.mal || 50, x: 7 };
    const rotModus = !!o.rot;
    frame(root, o.tittel || (rotModus ? 'Finn kvadratroten' : 'Kvadrat og areal'),
      rotModus ? '<p class="lesbar">Kvadratroten av <strong>' + F(st.mal) + '</strong> er tallet som ganget med seg selv gir ' + F(st.mal) + '. Dra i glideren og finn det!</p><div class="wg-kontroller">' + slider('kv-x', 'Prøv tallet', 0, Math.ceil(Math.sqrt(st.mal)) + 2, 0.01, st.x) + '</div><div class="wg-uttrykk kv-uttrykk" aria-live="polite"></div><div class="svg-wrap kv-bilde"></div>'
        : '<div class="wg-kontroller">' + slider('kv-s', 'Sidelengde', 1, 12, 1, st.s) + '</div><div class="wg-uttrykk kv-uttrykk" aria-live="polite"></div><div class="svg-wrap kv-bilde"></div><div class="wg-forklaring lesbar kv-tekst"></div>');
    const ut = q(root, '.kv-uttrykk'), bilde = q(root, '.kv-bilde'), tx = q(root, '.kv-tekst');
    function rute(s, maxpx) {
      const c = Math.min(30, maxpx / Math.max(1, Math.ceil(s)));
      const tot = Math.ceil(s) * c + 20; let h = '<svg viewBox="0 0 ' + (tot + 20) + ' ' + (tot + 20) + '" class="kv-svg" role="img" aria-label="Kvadrat med side ' + F(s) + '">';
      h += '<rect x="10" y="10" width="' + (s * c) + '" height="' + (s * c) + '" class="kv-flate"/>';
      for (let i = 0; i <= Math.ceil(s); i++) { h += '<line x1="' + (10 + i * c) + '" y1="10" x2="' + (10 + i * c) + '" y2="' + (10 + Math.ceil(s) * c) + '" class="kv-rutenett"/><line x1="10" y1="' + (10 + i * c) + '" x2="' + (10 + Math.ceil(s) * c) + '" y2="' + (10 + i * c) + '" class="kv-rutenett"/>'; }
      return h + '</svg>';
    }
    function draw() {
      if (rotModus) {
        const x = st.x, a = x * x, d = a - st.mal;
        ut.innerHTML = '<span class="stort">' + F(Math.round(x * 100) / 100) + ' · ' + F(Math.round(x * 100) / 100) + ' = ' + F(Math.round(a * 100) / 100) + '</span> ' + (Math.abs(d) < 0.05 ? '<span class="ok">🎯 Nesten! √' + F(st.mal) + ' ≈ ' + F(Math.round(x * 100) / 100) + '</span>' : (d < 0 ? '<span class="feil-t">for lite – prøv et større tall</span>' : '<span class="feil-t">for mye – prøv et mindre tall</span>'));
        bilde.innerHTML = rute(x, 280);
      } else {
        const s = st.s; ut.innerHTML = '<span class="stort">' + s + ' · ' + s + ' = ' + s * s + '</span>';
        bilde.innerHTML = rute(s, 300);
        tx.innerHTML = '<p>Arealet er <strong>' + s * s + '</strong>. Da er ' + s * s + ' et <strong>kvadrattall</strong>, og <strong>√' + s * s + ' = ' + s + '</strong>. Kvadratroten er sidelengden når vi kjenner arealet.</p>';
      }
    }
    bindSliders(root, r => { if (r.id === 'kv-x') st.x = +r.value; else st.s = +r.value; draw(); }); draw();
  };

  /* ============================================================
     Figurtall
     ============================================================ */
  const FIG = {
    kvadrat: { navn: 'Kvadrat', pts: n => { const p = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) p.push([i, j, 0]); return p; }, f: n => n * n, formel: 'n · n = n²', ord: 'Rutenett med n rader og n kolonner.' },
    trapp: { navn: 'Trapp', pts: n => { const p = []; for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) p.push([j, n - 1 - i, i % 2]); return p; }, f: n => n * (n + 1) / 2, formel: 'n · (n + 1) / 2', ord: 'Trapp: 1 + 2 + 3 + … + n.' },
    fyrstikk: { navn: 'Fyrstikkrekke', pts: null, f: n => 3 * n + 1, formel: '3n + 1', ord: 'Kvadrater på rad av fyrstikker.' },
    plus: { navn: 'Kors', pts: n => { const p = [[0, 0, 2]]; for (let k = 1; k <= n; k++) { p.push([k, 0, 0], [-k, 0, 0], [0, k, 1], [0, -k, 1]); } return p; }, f: n => 4 * n + 1, formel: '4n + 1', ord: 'En midtpunkt og fire armer med n prikker.' },
    ramme: { navn: 'Ramme', pts: n => { const p = []; for (let i = 0; i < n + 2; i++) for (let j = 0; j < n + 2; j++) if (i === 0 || j === 0 || i === n + 1 || j === n + 1) p.push([i, j, 1]); return p; }, f: n => 4 * n + 4, formel: '4n + 4', ord: 'Ramme rundt et n × n kvadrat.' },
    dobling: { navn: 'Dobling', pts: n => { const c = Math.pow(2, n - 1), p = []; for (let i = 0; i < c; i++) p.push([i % 16, Math.floor(i / 16), i % 2]); return p; }, f: n => Math.pow(2, n - 1), formel: '2ⁿ⁻¹', ord: 'Antallet dobles hver gang.' }
  };
  W.figurtall = function (root, o) {
    const def = FIG[o.type || 'kvadrat']; const st = { n: o.n || 3 }; const maxN = o.maxN || (o.type === 'dobling' ? 6 : 8);
    frame(root, o.tittel || ('Figurtall: ' + def.navn),
      '<div class="wg-kontroller">' + slider('fg-n', 'Figur nummer', 1, maxN, 1, st.n) + '<button type="button" class="knapp liten fg-formel">🔍 Vis formelen</button></div><div class="svg-wrap fg-bilde"></div><div class="fg-tab"></div><div class="wg-forklaring lesbar fg-tekst" aria-live="polite"></div>');
    const bilde = q(root, '.fg-bilde'), tab = q(root, '.fg-tab'), tx = q(root, '.fg-tekst'); let visF = false;
    function draw() {
      const n = st.n; let s;
      if ((o.type || 'kvadrat') === 'fyrstikk') {
        const L = 44; s = '<svg viewBox="0 0 ' + (n * L + 30) + ' 90" class="fg-svg" role="img" aria-label="' + (3 * n + 1) + ' fyrstikker">';
        const l = (x1, y1, x2, y2, c) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="fy c' + c + '"/>';
        s += l(15, 70, 15, 20, 1);
        for (let i = 0; i < n; i++) { const x = 15 + i * L; s += l(x, 20, x + L, 20, 0) + l(x, 70, x + L, 70, 0) + l(x + L, 20, x + L, 70, 1); }
        bilde.innerHTML = s + '</svg>';
      } else {
        const pts = def.pts(n); let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; pts.forEach(p => { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); });
        const c = Math.min(30, 420 / Math.max(x1 - x0 + 1, y1 - y0 + 1, 1)), w = (x1 - x0 + 1) * c + 20, h = (y1 - y0 + 1) * c + 20;
        s = '<svg viewBox="0 0 ' + w + ' ' + h + '" class="fg-svg" role="img" aria-label="Figur ' + n + ' med ' + pts.length + ' prikker">';
        pts.forEach(p => { s += '<circle cx="' + (10 + (p[0] - x0) * c + c / 2) + '" cy="' + (10 + (y1 - p[1]) * c + c / 2) + '" r="' + (c * 0.38) + '" class="fp c' + p[2] + '"/>'; });
        bilde.innerHTML = s + '</svg>';
      }
      let t = '<table class="tabell fg-tabell"><thead><tr><th>Figur nr.</th>'; let r = '<tr><th>Antall</th>';
      for (let k = 1; k <= maxN; k++) { t += '<th' + (k === n ? ' class="valgt"' : '') + '>' + k + '</th>'; r += '<td' + (k === n ? ' class="valgt"' : '') + '>' + def.f(k) + '</td>'; }
      tab.innerHTML = t + '</tr></thead><tbody>' + r + '</tr></tbody></table>';
      tx.innerHTML = '<p>Figur ' + n + ' har <strong>' + def.f(n) + '</strong> ' + ((o.type === 'fyrstikk') ? 'fyrstikker' : 'prikker') + '. ' + def.ord + '</p>' + (visF ? '<p class="callout-mini">📐 Formel: antall = <strong>' + def.formel.replace(/n/g, 'n') + '</strong>. Sjekk: n = ' + n + ' gir ' + def.f(n) + '.</p>' : '<p>Klarer du å finne et mønster? Se på hvordan tallene i tabellen vokser.</p>');
    }
    bindSliders(root, () => { st.n = +q(root, '#fg-n').value; draw(); });
    q(root, '.fg-formel').addEventListener('click', () => { visF = !visF; draw(); });
    draw();
  };

  /* ============================================================
     Arealmodell: distributiv lov og kvadratsetninger
     ============================================================ */
  W.arealmodell = function (root, o) {
    const type = o.type || 'dist'; const st = { a: o.a || 3, b: o.b || 4, c: o.c || 2 };
    const kv = type !== 'dist';
    frame(root, o.tittel || (type === 'dist' ? 'Arealmodell: a · (b + c)' : type === 'sum' ? 'Kvadratsetning: (a + b)²' : type === 'diff' ? 'Kvadratsetning: (a − b)²' : 'Konjugatsetningen: (a + b)(a − b)'),
      '<div class="wg-kontroller">' + (type === 'dist' ? slider('am-a', 'a (høyde)', 1, 8, 1, st.a) + slider('am-b', 'b (bredde 1)', 1, 8, 1, st.b) + slider('am-c', 'c (bredde 2)', 1, 8, 1, st.c)
        : slider('am-a', 'a', type === 'sum' ? 1 : 2, 9, 1, Math.max(st.a, type === 'sum' ? 1 : 3)) + slider('am-b', 'b', 1, type === 'sum' ? 9 : 8, 1, st.b)) + '</div>' +
      '<div class="svg-wrap am-bilde"></div><div class="wg-uttrykk am-uttrykk" aria-live="polite"></div><div class="wg-forklaring lesbar am-tekst"></div>');
    const bilde = q(root, '.am-bilde'), ut = q(root, '.am-uttrykk'), tx = q(root, '.am-tekst');
    function draw() {
      const a = +q(root, '#am-a').value; let b = +q(root, '#am-b').value; const c = type === 'dist' ? +q(root, '#am-c').value : 0;
      let bb = b; if (type !== 'dist' && type !== 'sum' && b >= a) { bb = a - 1; q(root, '#am-b').value = bb; }
      b = bb; const k = 28; let s = '', h = '';
      const R = (x, y, w, hh, cls, txt) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" class="am ' + cls + '"/>' + (txt ? '<text x="' + (x + w / 2) + '" y="' + (y + hh / 2 + 5) + '" text-anchor="middle" class="am-t">' + txt + '</text>' : '');
      if (type === 'dist') {
        const w = (b + c) * k + 40, hh = a * k + 40; s = '<svg viewBox="0 0 ' + w + ' ' + hh + '" class="am-svg" role="img" aria-label="Rektangel delt i to">';
        s += R(20, 20, b * k, a * k, 'r1', a + '·' + b + '=' + a * b) + R(20 + b * k, 20, c * k, a * k, 'r2', a + '·' + c + '=' + a * c);
        s += '<text x="' + (20 + b * k / 2) + '" y="14" text-anchor="middle" class="am-m">' + b + '</text><text x="' + (20 + b * k + c * k / 2) + '" y="14" text-anchor="middle" class="am-m">' + c + '</text><text x="10" y="' + (20 + a * k / 2 + 5) + '" text-anchor="middle" class="am-m">' + a + '</text></svg>';
        h = '<span class="stort">' + a + ' · (' + b + ' + ' + c + ') = ' + a + ' · ' + b + ' + ' + a + ' · ' + c + ' = ' + a * (b + c) + '</span>';
        tx.innerHTML = '<p>Hele rektangelet har høyde ' + a + ' og bredde ' + b + ' + ' + c + '. Vi kan finne arealet <strong>samlet</strong>, eller regne ut de to delene og legge dem sammen. Begge gir ' + a * (b + c) + '. Det er den <strong>distributive egenskapen</strong>.</p>';
      } else if (type === 'sum') {
        const T = (a + b) * k + 40; s = '<svg viewBox="0 0 ' + T + ' ' + T + '" class="am-svg" role="img" aria-label="Kvadrat med side a pluss b">';
        s += R(20, 20, a * k, a * k, 'r1', 'a²=' + a * a) + R(20 + a * k, 20, b * k, a * k, 'r2', 'ab=' + a * b) + R(20, 20 + a * k, a * k, b * k, 'r2', 'ab=' + a * b) + R(20 + a * k, 20 + a * k, b * k, b * k, 'r3', 'b²=' + b * b) + '</svg>';
        h = '<span class="stort">(' + a + ' + ' + b + ')² = ' + a + '² + 2·' + a + '·' + b + ' + ' + b + '² = ' + (a * a + 2 * a * b + b * b) + '</span>';
        tx.innerHTML = '<p>Det store kvadratet har side <strong>a + b</strong>. Det består av fire deler: kvadratet <span class="chip c1">a²</span>, to like rektangler <span class="chip c2">ab</span> og kvadratet <span class="chip c3">b²</span>. Derfor er <strong>(a + b)² = a² + 2ab + b²</strong>, og ikke bare a² + b²!</p>';
      } else if (type === 'diff') {
        const T = a * k + 40; s = '<svg viewBox="0 0 ' + T + ' ' + T + '" class="am-svg" role="img" aria-label="Kvadrat med side a der b-strimler er markert">';
        s += R(20, 20, (a - b) * k, (a - b) * k, 'r4', '(a−b)²=' + (a - b) * (a - b)) + R(20 + (a - b) * k, 20, b * k, (a - b) * k, 'r2', 'b(a−b)') + R(20, 20 + (a - b) * k, (a - b) * k, b * k, 'r2', 'b(a−b)') + R(20 + (a - b) * k, 20 + (a - b) * k, b * k, b * k, 'r3', 'b²') + '</svg>';
        h = '<span class="stort">(' + a + ' − ' + b + ')² = ' + a + '² − 2·' + a + '·' + b + ' + ' + b + '² = ' + ((a - b) * (a - b)) + '</span>';
        tx.innerHTML = '<p>Hele kvadratet har areal <strong>a²</strong>. Det grønne kvadratet er <strong>(a − b)²</strong>. Vi finner det ved å ta bort de to strimlene (hver ab), men da har vi tatt bort kvadratet <span class="chip c3">b²</span> to ganger, så vi må legge det tilbake: <strong>(a − b)² = a² − 2ab + b²</strong>.</p>';
      } else {
        const T = a * k + 40; s = '<svg viewBox="0 0 ' + (2 * T + 60) + ' ' + T + '" class="am-svg" role="img" aria-label="Kvadrat der et hjørne er fjernet, og et rektangel">';
        s += R(20, 20, a * k, (a - b) * k, 'r1', '') + R(20, 20 + (a - b) * k, (a - b) * k, b * k, 'r1', '') + R(20 + (a - b) * k, 20 + (a - b) * k, b * k, b * k, 'rt', 'b²');
        const ox = T + 40;
        s += R(ox, 20, a * k, (a - b) * k, 'r1', '') + R(ox + a * k, 20, b * k, (a - b) * k, 'r2', '');
        s += '<text x="' + (ox + (a + b) * k / 2) + '" y="14" text-anchor="middle" class="am-m">a + b</text><text x="' + (ox - 6) + '" y="' + (20 + (a - b) * k / 2 + 5) + '" text-anchor="end" class="am-m">a − b</text></svg>';
        h = '<span class="stort">(' + a + ' + ' + b + ')(' + a + ' − ' + b + ') = ' + a + '² − ' + b + '² = ' + (a * a - b * b) + '</span>';
        tx.innerHTML = '<p>Ta bort kvadratet <strong>b²</strong> fra et kvadrat med side <strong>a</strong>. Det som er igjen, kan legges om til et rektangel med sider <strong>(a + b)</strong> og <strong>(a − b)</strong>. Derfor er <strong>(a + b)(a − b) = a² − b²</strong>.</p>';
      }
      bilde.innerHTML = s; ut.innerHTML = h;
    }
    bindSliders(root, draw); draw();
  };

  /* ============================================================
     Balansevekt (ligninger)
     ============================================================ */
  W.balanse = function (root, o) {
    const gen = () => { const a = [1, 2, 3, 4][Math.floor(Math.random() * 4)], x = 1 + Math.floor(Math.random() * 9), b = Math.floor(Math.random() * 9); return { a: a, b: b, c: a * x + b, x: x }; };
    let eq = o.a ? { a: o.a, b: o.b || 0, c: o.c, x: (o.c - (o.b || 0)) / o.a } : { a: 2, b: 3, c: 11, x: 4 };
    let log = [];
    frame(root, o.tittel || 'Vekta: løs ligningen',
      '<div class="bal-tekst lesbar">Ligningen er som en vekt i balanse. Det du gjør på <strong>ene</strong> siden, må du gjøre på <strong>den andre</strong> også.</div><div class="svg-wrap bal-bilde"></div><div class="wg-uttrykk bal-lign" aria-live="polite"></div>' +
      '<div class="forslag"><button type="button" class="knapp primær bal-minus">➖ Trekk fra</button><button type="button" class="knapp primær bal-del">➗ Del</button><button type="button" class="knapp liten bal-ny">🎲 Ny ligning</button><button type="button" class="knapp liten bal-reset">↺ Start på nytt</button></div><div class="bal-logg lesbar" aria-live="polite"></div>');
    const bilde = q(root, '.bal-bilde'), lign = q(root, '.bal-lign'), logg = q(root, '.bal-logg'), start = { a: eq.a, b: eq.b, c: eq.c, x: eq.x };
    let cur = null;
    function reset() { cur = { a: start.a, b: start.b, c: start.c }; log = []; draw(); }
    function draw() {
      const a = cur.a, b = cur.b, c = cur.c; const W2 = 560, Hh = 200;
      let s = '<svg viewBox="0 0 ' + W2 + ' ' + Hh + '" class="bal-svg" role="img" aria-label="Vekt i balanse: ' + lin(a, b) + ' = ' + c + '">';
      s += '<polygon points="280,185 255,195 305,195" class="bal-fot"/><line x1="280" y1="70" x2="280" y2="185" class="bal-stolpe"/><line x1="110" y1="70" x2="450" y2="70" class="bal-arm"/>';
      s += '<path d="M60 70 L160 70 L145 100 L75 100 Z" class="bal-skål"/><path d="M400 70 L500 70 L485 100 L415 100 Z" class="bal-skål"/>';
      // venstre: a x-bokser + b enhet-blokk
      let x = 80; const boks = (xx, yy, txt, cls) => '<rect x="' + xx + '" y="' + yy + '" width="30" height="30" rx="6" class="bal-bl ' + cls + '"/><text x="' + (xx + 15) + '" y="' + (yy + 21) + '" text-anchor="middle" class="bal-bt">' + txt + '</text>';
      for (let i = 0; i < a; i++) { s += boks(x + (i % 4) * 32, 66 - 34 * Math.floor(i / 4) - 30 + 0, 'x', 'bx'); }
      if (b > 0) s += '<rect x="' + (80 + Math.min(a, 4) * 32 + 4) + '" y="40" width="' + (20 + String(b).length * 8) + '" height="30" rx="15" class="bal-bl en"/><text x="' + (80 + Math.min(a, 4) * 32 + 4 + (20 + String(b).length * 8) / 2) + '" y="61" text-anchor="middle" class="bal-bt">' + b + '</text>';
      s += '<rect x="425" y="34" width="' + (30 + String(c).length * 10) + '" height="36" rx="18" class="bal-bl en"/><text x="' + (425 + (30 + String(c).length * 10) / 2) + '" y="58" text-anchor="middle" class="bal-bt">' + c + '</text>';
      bilde.innerHTML = s + '</svg>';
      const ferdig = a === 1 && b === 0;
      lign.innerHTML = '<span class="stort">' + lin(a, b) + ' = ' + c + '</span>' + (ferdig ? ' <span class="ok">🎉 x = ' + F(c) + '. Sjekk: ' + lin(start.a, start.b).replace('x', '(' + F(c) + ')').replace(/^(\d+)\(/, '$1·(') + ' = ' + start.c + ' ✔</span>' : '');
      q(root, '.bal-minus').disabled = b === 0 || ferdig; q(root, '.bal-del').disabled = a === 1 || b !== 0;
      logg.innerHTML = log.length ? '<ol>' + log.map(l => '<li>' + l + '</li>').join('') + '</ol>' : '<p>Tips: Fjern først det som står alene (tallet uten x). Del deretter på tallet foran x.</p>';
    }
    q(root, '.bal-minus').addEventListener('click', () => { const b = cur.b; log.push('Trekk fra ' + b + ' på begge sider: ' + lin(cur.a, 0) + ' = ' + (cur.c - b)); cur.c -= b; cur.b = 0; draw(); });
    q(root, '.bal-del').addEventListener('click', () => { const a = cur.a; log.push('Del begge sider på ' + a + ': x = ' + cur.c + ' / ' + a + ' = ' + F(cur.c / a)); cur.c = cur.c / a; cur.a = 1; draw(); });
    q(root, '.bal-ny').addEventListener('click', () => { const g = gen(); start.a = g.a; start.b = g.b; start.c = g.c; start.x = g.x; reset(); });
    q(root, '.bal-reset').addEventListener('click', reset);
    reset();
  };

  /* ============================================================
     Ulikhet på tallinja
     ============================================================ */
  W.ulikhet = function (root, o) {
    const st = { a: o.a === undefined ? 2 : o.a, op: o.op || '>', t: o.t === undefined ? 5 : o.t };
    frame(root, o.tittel || 'Ulikheter på tallinja',
      '<div class="wg-kontroller">' + slider('ul-a', 'Grensetall', -10, 10, 1, st.a) + '<div class="ctl"><span>Tegn</span><div class="valg-rad ul-ops">' + ['<', '≤', '>', '≥'].map(x => '<button type="button" class="knapp liten' + (x === st.op ? ' primær' : '') + '" data-op="' + x + '">x ' + x + '</button>').join('') + '</div></div>' + slider('ul-t', 'Test et tall', -10, 10, 1, st.t) + '</div>' +
      '<div class="wg-uttrykk ul-uttrykk" aria-live="polite"></div><div class="svg-wrap ul-bilde"></div><div class="wg-forklaring lesbar ul-tekst" aria-live="polite"></div>');
    const ut = q(root, '.ul-uttrykk'), bilde = q(root, '.ul-bilde'), tx = q(root, '.ul-tekst');
    const ok = (x, op, a) => op === '<' ? x < a : op === '≤' ? x <= a : op === '>' ? x > a : x >= a;
    function draw() {
      const a = st.a, op = st.op, VW = 600, pad = 30, u = (VW - 2 * pad) / 20, X = v => pad + (v + 10) * u;
      let s = '<svg viewBox="0 0 ' + VW + ' 90" class="tallinje-svg" role="img" aria-label="Tallinje med ulikheten x ' + op + ' ' + a + '">';
      const venstre = op === '<' || op === '≤';
      const x1 = venstre ? pad - 10 : X(a), x2 = venstre ? X(a) : VW - pad + 10;
      s += '<line x1="' + (pad - 10) + '" x2="' + (VW - pad + 10) + '" y1="50" y2="50" stroke="#94a3b8" stroke-width="3"/>';
      s += '<rect x="' + x1 + '" y="44" width="' + (x2 - x1) + '" height="12" rx="6" class="ul-farge"/>';
      for (let v = -10; v <= 10; v++) s += '<line x1="' + X(v) + '" x2="' + X(v) + '" y1="42" y2="58" stroke="#475569" stroke-width="' + (v === 0 ? 3 : 1.5) + '"/>' + (v % 2 === 0 ? '<text x="' + X(v) + '" y="78" text-anchor="middle" class="ticktxt">' + F(v) + '</text>' : '');
      const lukket = op === '≤' || op === '≥';
      s += '<circle cx="' + X(a) + '" cy="50" r="9" class="' + (lukket ? 'ul-lukket' : 'ul-åpen') + '"/>';
      const t = st.t, pass = ok(t, op, a); s += '<g transform="translate(' + X(t) + ',22)"><circle r="12" class="' + (pass ? 'ul-ja' : 'ul-nei') + '"/><text y="5" text-anchor="middle" class="ul-ttxt">' + (pass ? '✓' : '✗') + '</text></g>';
      bilde.innerHTML = s + '</svg>';
      ut.innerHTML = '<span class="stort">x ' + op + ' ' + F(a) + '</span>';
      tx.innerHTML = '<p>' + (lukket ? 'Den <strong>fylte</strong> sirkelen betyr at ' + F(a) + ' er med som løsning.' : 'Den <strong>åpne</strong> sirkelen betyr at ' + F(a) + ' ikke er med som løsning.') + '</p><p>Test: er x = ' + F(t) + ' en løsning? ' + F(t) + ' ' + op + ' ' + F(a) + ' er <strong>' + (pass ? 'sant ✓' : 'usant ✗') + '</strong>.</p>';
    }
    root.querySelectorAll('.ul-ops button').forEach(b => b.addEventListener('click', () => { st.op = b.dataset.op; root.querySelectorAll('.ul-ops button').forEach(x => x.classList.toggle('primær', x === b)); draw(); }));
    bindSliders(root, r => { if (r.id === 'ul-a') st.a = +r.value; else st.t = +r.value; draw(); }); draw();
  };

  /* ============================================================
     Funksjonsmaskin
     ============================================================ */
  W.maskin = function (root, o) {
    const uttr = o.regel || '2*x+1', navn = o.navn || 'f(x) = 2x + 1', fn = M.expr(uttr); let x = o.x === undefined ? 3 : o.x; const hist = [];
    frame(root, o.tittel || 'Funksjonsmaskinen',
      '<div class="maskin-rad"><div class="maskin-inn"><label for="mk-x">Inn (x)</label><div class="stepper"><button type="button" class="knapp liten mk-ned" aria-label="Ett tall mindre">−</button><input type="number" id="mk-x" class="tallfelt" value="' + x + '"><button type="button" class="knapp liten mk-opp" aria-label="Ett tall mer">+</button></div></div>' +
      '<div class="maskin-boks" aria-hidden="true"><div class="maskin-regel">' + navn + '</div><div class="maskin-tannhjul">⚙️</div></div><div class="maskin-ut"><span>Ut (y)</span><output class="stort mk-y"></output></div></div>' +
      '<div class="forslag"><button type="button" class="knapp primær mk-lagre">➕ Legg i tabell</button><button type="button" class="knapp liten mk-tom">Tøm tabell</button></div><div class="mk-tabell"></div><div class="svg-wrap mk-graf"></div>');
    const inp = q(root, '#mk-x'), y = q(root, '.mk-y'), tab = q(root, '.mk-tabell'), graf = q(root, '.mk-graf');
    function yv(v) { const r = fn({ x: v }); return Math.round(r * 1e6) / 1e6; }
    function draw() {
      x = +inp.value; if (isNaN(x)) x = 0; y.textContent = F(yv(x));
      if (hist.length) {
        tab.innerHTML = '<table class="tabell"><thead><tr><th>x</th>' + hist.map(h => '<td>' + F(h)+ '</td>').join('') + '</tr></thead><tbody><tr><th>y</th>' + hist.map(h => '<td>' + F(yv(h)) + '</td>').join('') + '</tr></tbody></table>';
        const xs = hist.map(h => h), ys = hist.map(yv); const lo = Math.min(-5, Math.min.apply(null, xs) - 1), hi = Math.max(5, Math.max.apply(null, xs) + 1), ylo = Math.min(-5, Math.min.apply(null, ys) - 1), yhi = Math.max(5, Math.max.apply(null, ys) + 1);
        const VW = 360, VH = 300, X = v => 20 + (v - lo) / (hi - lo) * (VW - 40), Y = v => VH - 20 - (v - ylo) / (yhi - ylo) * (VH - 40);
        let s = '<svg viewBox="0 0 ' + VW + ' ' + VH + '" class="graf-svg" role="img" aria-label="Punkter fra tabellen">';
        s += '<line x1="20" x2="' + (VW - 20) + '" y1="' + Y(0) + '" y2="' + Y(0) + '" class="aks"/><line y1="20" y2="' + (VH - 20) + '" x1="' + X(0) + '" x2="' + X(0) + '" class="aks"/>';
        hist.forEach(h => { s += '<circle cx="' + X(h) + '" cy="' + Y(yv(h)) + '" r="6" class="pkt"/>'; });
        graf.innerHTML = s + '</svg>';
      } else { tab.innerHTML = '<p class="lesbar">Prøv noen tall, og trykk «Legg i tabell». Ser du et mønster?</p>'; graf.innerHTML = ''; }
    }
    inp.addEventListener('input', draw);
    q(root, '.mk-ned').addEventListener('click', () => { inp.value = +inp.value - 1; draw(); });
    q(root, '.mk-opp').addEventListener('click', () => { inp.value = +inp.value + 1; draw(); });
    q(root, '.mk-lagre').addEventListener('click', () => { if (hist.indexOf(x) < 0) hist.push(x); hist.sort((a, b) => a - b); draw(); });
    q(root, '.mk-tom').addEventListener('click', () => { hist.length = 0; draw(); });
    draw();
  };

  /* ============================================================
     Koordinatsystem og grafer
     ============================================================ */
  const FARGER = ['#1d4ed8', '#c2410c', '#15803d', '#a21caf', '#0e7490'];
  M.tegnGraf = function (c) { // c: {wrap, funks:[{fn,vars,farge}], xmin,xmax,ymin,ymax, punkter:[{x,y,label,farge}], linjer:[...], VW,VH}
    const VW = c.VW || 640, VH = c.VH || 440, m = 36;
    const X = v => m + (v - c.xmin) / (c.xmax - c.xmin) * (VW - 2 * m), Y = v => VH - m - (v - c.ymin) / (c.ymax - c.ymin) * (VH - 2 * m);
    const step = r => { const raw = r / 10; const p = Math.pow(10, Math.floor(Math.log10(raw))); const f = raw / p; return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p; };
    const sx = c.stegx || step(c.xmax - c.xmin), sy = c.stegy || step(c.ymax - c.ymin);
    const id = 'cl' + (++uid);
    let s = '<svg viewBox="0 0 ' + VW + ' ' + VH + '" class="graf-svg" role="img" aria-label="' + (c.alt || 'Koordinatsystem') + '"><defs><clipPath id="' + id + '"><rect x="' + m + '" y="' + m + '" width="' + (VW - 2 * m) + '" height="' + (VH - 2 * m) + '"/></clipPath></defs>';
    s += '<rect x="' + m + '" y="' + m + '" width="' + (VW - 2 * m) + '" height="' + (VH - 2 * m) + '" class="graf-bg"/>';
    for (let v = Math.ceil(c.xmin / sx) * sx; v <= c.xmax + 1e-9; v += sx) { const vv = Math.round(v / sx) * sx; s += '<line x1="' + X(vv) + '" x2="' + X(vv) + '" y1="' + m + '" y2="' + (VH - m) + '" class="' + (Math.abs(vv) < 1e-9 ? 'aks' : 'rutenett') + '"/>'; if (Math.abs(vv) > 1e-9) s += '<text x="' + X(vv) + '" y="' + (Math.min(Math.max(Y(0), m), VH - m) + 16) + '" text-anchor="middle" class="aks-txt">' + F(Math.round(vv * 1e6) / 1e6) + '</text>'; }
    for (let v = Math.ceil(c.ymin / sy) * sy; v <= c.ymax + 1e-9; v += sy) { const vv = Math.round(v / sy) * sy; s += '<line x1="' + m + '" x2="' + (VW - m) + '" y1="' + Y(vv) + '" y2="' + Y(vv) + '" class="' + (Math.abs(vv) < 1e-9 ? 'aks' : 'rutenett') + '"/>'; if (Math.abs(vv) > 1e-9) s += '<text x="' + (Math.min(Math.max(X(0), m), VW - m) - 5) + '" y="' + (Y(vv) + 4) + '" text-anchor="end" class="aks-txt">' + F(Math.round(vv * 1e6) / 1e6) + '</text>'; }
    s += '<text x="' + (VW - m + 4) + '" y="' + (Y(0) - 6) + '" class="aks-navn">x</text><text x="' + (X(0) + 6) + '" y="' + (m - 8) + '" class="aks-navn">y</text>';
    s += '<g clip-path="url(#' + id + ')">';
    (c.areal || []).forEach(a => { s += a; });
    (c.funks || []).forEach(function (f, i) {
      const N2 = 500; const parts = []; let cur = []; let prev = null;
      for (let k = 0; k <= N2; k++) {
        const x = c.xmin + (c.xmax - c.xmin) * k / N2; const y = f.fn(x);
        const bad = !isFinite(y) || Math.abs(y) > 1e5 || (prev !== null && Math.abs(y - prev) > (c.ymax - c.ymin) * 1.5);
        if (bad) { if (cur.length) parts.push(cur); cur = []; prev = null; continue; }
        cur.push(X(x).toFixed(1) + ',' + Y(y).toFixed(1)); prev = y;
      }
      if (cur.length) parts.push(cur);
      parts.forEach(p => { s += '<polyline points="' + p.join(' ') + '" class="kurve" style="stroke:' + (f.farge || FARGER[i % 5]) + '"/>'; });
    });
    (c.punkter || []).forEach(p => {
      if (p.stiplet) s += '<line x1="' + X(p.x) + '" x2="' + X(p.x) + '" y1="' + Y(0) + '" y2="' + Y(p.y) + '" class="stiplet"/><line x1="' + X(0) + '" x2="' + X(p.x) + '" y1="' + Y(p.y) + '" y2="' + Y(p.y) + '" class="stiplet"/>';
      s += '<circle cx="' + X(p.x) + '" cy="' + Y(p.y) + '" r="' + (p.r || 6) + '" class="pkt" style="fill:' + (p.farge || '#14213d') + '"/>';
      if (p.label) s += '<text x="' + (X(p.x) + 9) + '" y="' + (Y(p.y) - 9) + '" class="pkt-txt">' + p.label + '</text>';
    });
    s += '</g></svg>';
    c.wrap.innerHTML = s;
    return { X: X, Y: Y, inv: { x: px => c.xmin + (px - m) / (VW - 2 * m) * (c.xmax - c.xmin), y: py => c.ymin + (VH - m - py) / (VH - 2 * m) * (c.ymax - c.ymin) }, m: m, VW: VW, VH: VH };
  };

  W.graf = function (root, o) {
    const P = o.params || {}; const vars = {}; Object.keys(P).forEach(k => vars[k] = P[k].v !== undefined ? P[k].v : P[k].min);
    const funks = (o.funksjoner || [{ f: 'a*x+b' }]).map((f, i) => ({ src: f.f, fn: M.expr(f.f), navn: f.navn || '', farge: f.farge || FARGER[i % 5], pen: f.pen }));
    const view = { xmin: o.xmin === undefined ? -6 : o.xmin, xmax: o.xmax === undefined ? 6 : o.xmax, ymin: o.ymin === undefined ? -6 : o.ymin, ymax: o.ymax === undefined ? 6 : o.ymax };
    let px = o.px === undefined ? 1 : o.px;
    frame(root, o.tittel || 'Graftegner',
      '<div class="wg-kontroller">' + Object.keys(P).map(k => slider('gr-' + k, P[k].navn || k, P[k].min, P[k].max, P[k].steg || 1, vars[k])).join('') + (o.punkt ? slider('gr-px', 'Velg x', view.xmin, view.xmax, 0.5, px) : '') + '</div>' +
      '<div class="wg-uttrykk gr-uttrykk" aria-live="polite"></div><div class="graf-rad"><div class="svg-wrap gr-bilde"></div>' + (o.tabell ? '<div class="gr-tabell"></div>' : '') + '</div><div class="wg-forklaring lesbar gr-tekst" aria-live="polite"></div>');
    const bilde = q(root, '.gr-bilde'), ut = q(root, '.gr-uttrykk'), tab = q(root, '.gr-tabell'), tx = q(root, '.gr-tekst');
    function pen(f) {
      if (f.pen === 'lin') return (f.navn || 'y') + ' = ' + lin(vars.a, vars.b || 0);
      if (f.pen === 'kv') return (f.navn || 'y') + ' = ' + (vars.a === 1 ? '' : vars.a === -1 ? '−' : F(vars.a)) + 'x²' + sgnTerm(vars.b || 0, 'x') + sgnTerm(vars.c || 0, '');
      if (f.pen === 'eks') return (f.navn || 'y') + ' = ' + F(vars.a) + ' · ' + F(vars.b) + 'ˣ';
      return (f.navn ? f.navn + ' = ' : 'y = ') + f.src.replace(/\*/g, '·').replace(/\b([a-z])\b/g, (m, v) => (v in vars ? '(' + F(vars[v]) + ')' : v)).replace(/\(([0-9.]+)\)/g, '$1');
    }
    function draw() {
      const fs = funks.map(f => ({ fn: x => f.fn(Object.assign({}, vars, { x: x })), farge: f.farge }));
      const pts = [];
      if (o.punkt) fs.forEach((f, i) => { const y = f.fn(px); if (isFinite(y)) pts.push({ x: px, y: y, label: '(' + F(px) + ', ' + F(Math.round(y * 100) / 100) + ')', stiplet: true, farge: funks[i].farge }); });
      if (o.skjaering && fs.length >= 2) {
        const d = x => fs[0].fn(x) - fs[1].fn(x); let prev = view.xmin, pv = d(prev);
        for (let k = 1; k <= 800; k++) { const x = view.xmin + (view.xmax - view.xmin) * k / 800, v = d(x); if (isFinite(pv) && isFinite(v) && pv * v <= 0 && !(pv === 0 && v === 0)) { let a = prev, b = x; for (let it = 0; it < 40; it++) { const mid = (a + b) / 2; if (d(a) * d(mid) <= 0) b = mid; else a = mid; } const xs = (a + b) / 2, ys = fs[0].fn(xs); pts.push({ x: xs, y: ys, label: '(' + F(Math.round(xs * 100) / 100) + ', ' + F(Math.round(ys * 100) / 100) + ')', farge: '#be185d', r: 7 }); }
          prev = x; pv = v; }
      }
      M.tegnGraf({ wrap: bilde, funks: fs, xmin: view.xmin, xmax: view.xmax, ymin: view.ymin, ymax: view.ymax, punkter: pts, alt: o.alt || 'Graf' });
      ut.innerHTML = funks.map(f => '<span class="gr-navn" style="color:' + f.farge + '">' + pen(f) + '</span>').join(' &nbsp; ');
      if (o.tabell) {
        const xs = o.tabellx || [-3, -2, -1, 0, 1, 2, 3];
        tab.innerHTML = '<table class="tabell"><thead><tr><th>x</th>' + funks.map((f, i) => '<th style="color:' + f.farge + '">y' + (funks.length > 1 ? (i + 1) : '') + '</th>').join('') + '</tr></thead><tbody>' + xs.map(x => '<tr><th>' + F(x) + '</th>' + fs.map(f => { const y = f.fn(x); return '<td>' + (isFinite(y) ? F(Math.round(y * 100) / 100) : '–') + '</td>'; }).join('') + '</tr>').join('') + '</tbody></table>';
      }
      if (o.forklaring) tx.innerHTML = o.forklaring(vars, px, M);
    }
    bindSliders(root, r => { if (r.id === 'gr-px') px = +r.value; else vars[r.id.slice(3)] = +r.value; draw(); });
    draw();
  };
})();
