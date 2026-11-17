/* ============================================================
   Interaktive modeller
   Hver modell er en funksjon: M.widgets.navn(element, valg)
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE; const W = M.widgets; const F = M.fmt; const N = M.num;
  let uid = 0;

  function plural(n, ent, flt) { return n === 1 ? ent : flt; }
  function skritt(n) { return n + ' ' + plural(n, 'skritt', 'skritt'); }
  function frame(root, tittel, inner) {
    root.classList.add('wg');
    root.innerHTML = '<div class="wg-tittel"><span aria-hidden="true">🎮</span> ' + tittel + '</div>' + inner;
  }

  /* ---------- felles tallinje (SVG) ---------- */
  function lineSVG(wrap, o) {
    const id = ++uid;
    const lo = o.lo, hi = o.hi, VW = 760, pad = 34, H = o.h || ((o.arcs || []).some(a => a.from !== a.to) ? 255 : 150), axisY = 108;
    const unit = (VW - 2 * pad) / (hi - lo);
    const X = v => pad + (v - lo) * unit;
    const px = ((wrap.clientWidth || 600) / VW) * unit;
    const step = px >= 27 ? 1 : (px >= 14 ? 2 : 5);
    let s = '<svg viewBox="0 0 ' + VW + ' ' + H + '" class="tallinje-svg" role="img" aria-label="' + (o.alt || 'Tallinje') + '">';
    s += '<defs>' +
      '<marker id="pn' + id + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#1d4ed8"/></marker>' +
      '<marker id="pp' + id + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#c2410c"/></marker>' +
      '</defs>';
    // bånd
    s += '<rect x="' + (pad - 10) + '" y="' + (axisY - 7) + '" width="' + (X(0) - pad + 10) + '" height="14" rx="7" class="band-neg"/>';
    s += '<rect x="' + X(0) + '" y="' + (axisY - 7) + '" width="' + (VW - pad + 10 - X(0)) + '" height="14" rx="7" class="band-pos"/>';
    // streker og tall
    for (let v = lo; v <= hi; v++) {
      const cls = v < 0 ? 'neg' : (v > 0 ? 'pos' : 'zero');
      const major = v % step === 0;
      s += '<line x1="' + X(v) + '" x2="' + X(v) + '" y1="' + (axisY - (major ? 11 : 6)) + '" y2="' + (axisY + (major ? 11 : 6)) + '" class="tick ' + cls + '"/>';
      if (major) s += '<text x="' + X(v) + '" y="' + (axisY + 32) + '" class="ticktxt ' + cls + '" text-anchor="middle">' + F(v) + '</text>';
    }
    s += '<text x="' + (pad - 6) + '" y="' + (axisY - 20) + '" class="sidetxt neg" text-anchor="start">← mindre</text>';
    s += '<text x="' + (VW - pad + 6) + '" y="' + (axisY - 20) + '" class="sidetxt pos" text-anchor="end">større →</text>';
    // piler (buer)
    (o.arcs || []).forEach(function (a) {
      if (a.from === a.to) return;
      const y0 = axisY + 46, x1 = X(a.from), x2 = X(a.to);
      const depth = Math.min(62, 22 + Math.abs(x2 - x1) * 0.1);
      const right = a.to > a.from;
      const cls = a.cls || (right ? 'pos' : 'neg');
      s += '<path d="M' + x1 + ' ' + y0 + ' Q' + ((x1 + x2) / 2) + ' ' + (y0 + depth * 1.6) + ' ' + x2 + ' ' + y0 + '" class="bue ' + cls + '" marker-end="url(#' + (cls === 'neg' ? 'pn' : 'pp') + id + ')"/>';
      if (a.label) s += '<text x="' + ((x1 + x2) / 2) + '" y="' + (y0 + depth * 0.8 + 18) + '" class="buetxt ' + cls + '" text-anchor="middle">' + a.label + '</text>';
    });
    // markører
    (o.markers || []).forEach(function (m) {
      const cls = m.cls || (m.v < 0 ? 'neg' : (m.v > 0 ? 'pos' : 'zero'));
      const lab = String(m.label || ''); const bred = Math.max(30, lab.length * 9 + 16);
      s += '<g class="pin ' + cls + '"><line x1="' + X(m.v) + '" x2="' + X(m.v) + '" y1="' + (axisY - 9) + '" y2="' + (axisY - 34) + '"/>' +
        (lab.length > 2 ? '<rect x="' + (X(m.v) - bred / 2) + '" y="' + (axisY - 62) + '" width="' + bred + '" height="30" rx="15"/>' : '<circle cx="' + X(m.v) + '" cy="' + (axisY - 46) + '" r="15"/>') +
        '<text x="' + X(m.v) + '" y="' + (axisY - 41) + '" text-anchor="middle">' + lab + '</text></g>';
    });
    if (o.token !== undefined && o.token !== null) {
      s += '<g class="token" transform="translate(' + X(o.token) + ',' + (axisY - 46) + ')"><rect x="-26" y="-16" width="52" height="32" rx="16"/><text y="6" text-anchor="middle">' + F(o.token) + '</text></g>';
    }
    s += '</svg>';
    wrap.innerHTML = s;
    const tok = wrap.querySelector('.token');
    return {
      X: X,
      setToken: function (v) {
        if (!tok) return;
        const bounce = 12 * Math.abs(Math.sin(Math.PI * v));
        tok.setAttribute('transform', 'translate(' + X(v) + ',' + (axisY - 46 - bounce) + ')');
        tok.querySelector('text').textContent = F(Math.round(v));
      }
    };
  }

  /* ============================================================
     1. Tallinje med hopp
     ============================================================ */
  W.tallinje = function (root, opts) {
    opts = opts || {};
    const st = { a: opts.a !== undefined ? opts.a : -3, op: opts.op || '+', b: opts.b !== undefined ? opts.b : 5, hopped: false };
    let raf = 0; let line = null;
    frame(root, opts.tittel || 'Hopp på tallinja',
      '<div class="wg-kontroller">' +
      '<label class="ctl">Start <input type="range" min="-10" max="10" step="1" class="r-a" aria-label="Starttall"><output class="o-a"></output></label>' +
      '<div class="ctl"><span>Regneart</span><div class="seg" role="group" aria-label="Velg pluss eller minus">' +
      '<button type="button" data-op="+">pluss +</button><button type="button" data-op="-">minus −</button></div></div>' +
      '<label class="ctl">Tall <input type="range" min="-10" max="10" step="1" class="r-b" aria-label="Tallet du regner med"><output class="o-b"></output></label>' +
      '<button type="button" class="knapp stor hopp">▶ Hopp!</button></div>' +
      '<div class="wg-uttrykk" aria-live="polite"></div>' +
      '<div class="svg-wrap"></div>' +
      '<div class="wg-forklaring lesbar"></div>');
    const ra = root.querySelector('.r-a'), rb = root.querySelector('.r-b');
    const oa = root.querySelector('.o-a'), ob = root.querySelector('.o-b');
    const wrap = root.querySelector('.svg-wrap'), utt = root.querySelector('.wg-uttrykk'), fork = root.querySelector('.wg-forklaring');
    const opBtns = root.querySelectorAll('[data-op]');
    ra.value = st.a; rb.value = st.b;

    const result = () => (st.op === '+' ? st.a + st.b : st.a - st.b);

    function text() {
      const a = st.a, b = st.b, r = result();
      const bTxt = b < 0 ? '(' + N(b) + ')' : N(b);
      utt.innerHTML = '<span class="stort">' + N(a) + ' ' + (st.op === '+' ? '+' : '−') + ' ' + bTxt + ' = ' + (st.hopped ? N(r) : '<span class="spm">?</span>') + '</span>';
      oa.innerHTML = N(a); ob.innerHTML = N(b);
      let l = '<p>🏁 Start i ' + N(a) + '.</p>';
      if (b === 0) l += '<p>Du regner med 0, så du blir stående der du er.</p>';
      else if (st.op === '+') {
        l += b > 0 ? '<p>➕ <strong>Pluss</strong> ' + N(b) + ' betyr: hopp <strong>' + skritt(b) + ' mot høyre</strong>.</p>'
          : '<p>➕ Du legger til et <strong>negativt</strong> tall (' + N(b) + '). Da hopper du <strong>' + skritt(-b) + ' mot venstre</strong>. Det er det samme som å trekke fra ' + N(-b) + '.</p>';
      } else {
        l += b > 0 ? '<p>➖ <strong>Minus</strong> ' + N(b) + ' betyr: hopp <strong>' + skritt(b) + ' mot venstre</strong>.</p>'
          : '<p>➖ <strong>Minus et negativt tall</strong> (' + N(b) + '): minus og minus blir pluss! Det er det samme som å legge til ' + N(-b) + '. Du hopper <strong>' + skritt(-b) + ' mot høyre</strong>.</p>';
      }
      if (st.hopped) l += '<p>✅ Du lander på ' + N(r) + '.</p>';
      fork.innerHTML = l;
    }
    function draw() {
      cancelAnimationFrame(raf);
      const r = result();
      const lo = Math.min(-10, st.a, r), hi = Math.max(10, st.a, r);
      const mv = r - st.a;
      line = lineSVG(wrap, {
        lo: lo, hi: hi, token: st.hopped ? r : st.a,
        markers: st.hopped ? [{ v: st.a, label: 'start', cls: 'grå' }] : [],
        arcs: st.hopped && mv !== 0 ? [{ from: st.a, to: r, label: (mv > 0 ? 'mot høyre ' : 'mot venstre ') + skritt(Math.abs(mv)) }] : [],
        alt: 'Tallinje fra ' + lo + ' til ' + hi
      });
      text();
    }
    function hop() {
      cancelAnimationFrame(raf);
      st.hopped = false; draw();
      const from = st.a, to = result(), n = Math.abs(to - from);
      if (M.reduced() || n === 0) { st.hopped = true; draw(); return; }
      const dur = Math.min(2800, 300 + n * 280); const t0 = performance.now();
      (function tick(now) {
        const t = Math.min(1, (now - t0) / dur);
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        line.setToken(from + (to - from) * e);
        if (t < 1) raf = requestAnimationFrame(tick); else { st.hopped = true; draw(); }
      })(t0);
    }
    function sync() { opBtns.forEach(b => b.setAttribute('aria-pressed', b.dataset.op === st.op ? 'true' : 'false')); }
    ra.addEventListener('input', () => { st.a = +ra.value; st.hopped = false; draw(); });
    rb.addEventListener('input', () => { st.b = +rb.value; st.hopped = false; draw(); });
    opBtns.forEach(b => b.addEventListener('click', () => { st.op = b.dataset.op; st.hopped = false; sync(); draw(); }));
    root.querySelector('.hopp').addEventListener('click', hop);
    sync(); draw();
    window.addEventListener('resize', () => { if (root.isConnected) draw(); });
  };

  /* ============================================================
     2. Termometer
     ============================================================ */
  W.termometer = function (root, opts) {
    opts = opts || {};
    const min = -30, max = 30; let v = opts.v !== undefined ? opts.v : -5;
    frame(root, opts.tittel || 'Termometeret',
      '<div class="term-rad"><div class="term-svg"></div><div class="term-info">' +
      '<label class="ctl">Dra for å endre temperaturen<input type="range" min="' + min + '" max="' + max + '" step="1" aria-label="Temperatur i grader"></label>' +
      '<div class="wg-uttrykk stort" aria-live="polite"></div>' +
      '<div class="wg-forklaring lesbar"></div>' +
      '<div class="forslag"><span>Prøv:</span>' +
      '<button type="button" class="chip" data-v="-18">🧊 Fryseren (−18°)</button>' +
      '<button type="button" class="chip" data-v="-15">🥶 Kald vinterdag (−15°)</button>' +
      '<button type="button" class="chip" data-v="0">❄️ Vann fryser (0°)</button>' +
      '<button type="button" class="chip" data-v="21">🏠 Inne (21°)</button></div>' +
      '</div></div>');
    const rng = root.querySelector('input'), svgW = root.querySelector('.term-svg'), out = root.querySelector('.wg-uttrykk'), fork = root.querySelector('.wg-forklaring');
    rng.value = v;
    const top = 24, bot = 300; const Y = t => top + (bot - top) * (1 - (t - min) / (max - min));
    function draw() {
      let s = '<svg viewBox="0 0 240 370" class="term" role="img" aria-label="Termometer som viser ' + F(v) + ' grader">';
      s += '<rect x="0" y="' + Y(0) + '" width="240" height="' + (370 - Y(0)) + '" class="sone-neg"/><rect x="0" y="0" width="240" height="' + Y(0) + '" class="sone-pos"/>';
      for (let t = min; t <= max; t += 10) {
        s += '<line x1="62" x2="' + (t % 10 === 0 ? 84 : 76) + '" y1="' + Y(t) + '" y2="' + Y(t) + '" class="tick ' + (t < 0 ? 'neg' : t > 0 ? 'pos' : 'zero') + '"/>';
        s += '<text x="54" y="' + (Y(t) + 5) + '" text-anchor="end" class="ticktxt ' + (t < 0 ? 'neg' : t > 0 ? 'pos' : 'zero') + '">' + F(t) + '°</text>';
      }
      s += '<line x1="62" x2="232" y1="' + Y(0) + '" y2="' + Y(0) + '" class="nullinje"/><text x="232" y="' + (Y(0) - 6) + '" text-anchor="end" class="nulltxt">frysepunkt</text>';
      s += '<rect x="96" y="' + (top - 6) + '" width="34" height="' + (bot - top + 14) + '" rx="17" class="rør"/>';
      s += '<circle cx="113" cy="' + (bot + 34) + '" r="28" class="kule ' + (v < 0 ? 'neg' : 'pos') + '"/>';
      s += '<rect x="104" y="' + Y(v) + '" width="18" height="' + (bot + 34 - Y(v)) + '" rx="9" class="væske ' + (v < 0 ? 'neg' : 'pos') + '"/>';
      s += '<g transform="translate(168,' + Y(v) + ')"><rect x="-4" y="-14" width="62" height="28" rx="14" class="boble ' + (v < 0 ? 'neg' : v > 0 ? 'pos' : 'zero') + '"/><text x="27" y="6" text-anchor="middle">' + F(v) + '°</text></g>';
      s += '</svg>';
      svgW.innerHTML = s;
      out.innerHTML = N(v) + '°C';
      let t;
      if (v < 0) t = N(v) + ' grader er <strong>' + -v + ' grader under null</strong>. Det er kaldere enn frysepunktet, så vann blir til is.';
      else if (v === 0) t = '0 grader er frysepunktet for vann. Her skifter tallene fra negative til positive.';
      else t = N(v) + ' grader er <strong>' + v + ' grader over null</strong>. Det er varmere enn frysepunktet.';
      fork.innerHTML = '<p>' + t + '</p>';
    }
    rng.addEventListener('input', () => { v = +rng.value; draw(); });
    root.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => { v = +b.dataset.v; rng.value = v; draw(); }));
    draw();
  };

  /* ============================================================
     3. Temperaturendring (differanse)
     ============================================================ */
  W.tempendring = function (root, opts) {
    opts = opts || {};
    const st = { fra: opts.fra !== undefined ? opts.fra : -4, til: opts.til !== undefined ? opts.til : 3 };
    frame(root, opts.tittel || 'Hvor mye endret temperaturen seg?',
      '<div class="wg-kontroller">' +
      '<label class="ctl">Før (morgen) <input type="range" min="-12" max="12" class="r-fra"><output class="o-fra"></output></label>' +
      '<label class="ctl">Etter (ettermiddag) <input type="range" min="-12" max="12" class="r-til"><output class="o-til"></output></label></div>' +
      '<div class="wg-uttrykk stort" aria-live="polite"></div><div class="svg-wrap"></div><div class="wg-forklaring lesbar"></div>');
    const rf = root.querySelector('.r-fra'), rt = root.querySelector('.r-til'), wrap = root.querySelector('.svg-wrap');
    const utt = root.querySelector('.wg-uttrykk'), fork = root.querySelector('.wg-forklaring');
    rf.value = st.fra; rt.value = st.til;
    function draw() {
      const d = st.til - st.fra;
      root.querySelector('.o-fra').innerHTML = N(st.fra) + '°'; root.querySelector('.o-til').innerHTML = N(st.til) + '°';
      lineSVG(wrap, {
        lo: -14, hi: 14, markers: [{ v: st.fra, label: 'før', cls: 'grå' }, { v: st.til, label: 'etter', cls: 'grønn' }],
        arcs: d !== 0 ? [{ from: st.fra, to: st.til, label: (d > 0 ? '+' : '−') + Math.abs(d) + ' grader' }] : []
      });
      const tilTxt = st.fra < 0 ? N(st.til) + ' − (' + N(st.fra) + ')' : N(st.til) + ' − ' + N(st.fra);
      utt.innerHTML = tilTxt + ' = ' + N(d);
      let t = '<p>Endring = <strong>slutt − start</strong>.</p>';
      if (d > 0) t += '<p>Det ble <strong>' + d + ' grader varmere</strong>. Endringen er ' + N(d, true) + '.</p>';
      else if (d < 0) t += '<p>Det ble <strong>' + (-d) + ' grader kaldere</strong>. Endringen er ' + N(d) + '.</p>';
      else t += '<p>Temperaturen er den samme. Endringen er 0.</p>';
      if (st.fra < 0) t += '<p>Fordi starten er negativ, får du «minus minus»: ' + N(st.til) + ' − (' + N(st.fra) + ') = ' + N(st.til) + ' + ' + N(-st.fra) + '.</p>';
      fork.innerHTML = t;
    }
    rf.addEventListener('input', () => { st.fra = +rf.value; draw(); });
    rt.addEventListener('input', () => { st.til = +rt.value; draw(); });
    draw();
    window.addEventListener('resize', () => { if (root.isConnected) draw(); });
  };

  /* ============================================================
     4. Brikker og nullpar
     ============================================================ */
  W.brikker = function (root, opts) {
    opts = opts || {};
    const st = { a: opts.a !== undefined ? opts.a : 2, op: opts.op || '-', b: opts.b !== undefined ? opts.b : -3, i: 0 };
    let steps = [];
    frame(root, opts.tittel || 'Brikker og nullpar',
      '<div class="wg-kontroller">' +
      '<label class="ctl">Første tall <input type="range" min="-6" max="6" class="r-a"><output class="o-a"></output></label>' +
      '<div class="ctl"><span>Regneart</span><div class="seg" role="group" aria-label="Pluss eller minus">' +
      '<button type="button" data-op="+">pluss +</button><button type="button" data-op="-">minus −</button></div></div>' +
      '<label class="ctl">Andre tall <input type="range" min="-6" max="6" class="r-b"><output class="o-b"></output></label></div>' +
      '<div class="wg-uttrykk stort" aria-live="polite"></div>' +
      '<div class="brikke-bord" aria-label="Brikker"></div>' +
      '<div class="brikke-verdi"></div>' +
      '<div class="wg-forklaring lesbar" aria-live="polite"></div>' +
      '<div class="steg-knapper"><button type="button" class="knapp liten b-start">⏮ Fra start</button><button type="button" class="knapp liten b-tilbake">◀ Tilbake</button><button type="button" class="knapp primær b-neste">Neste ▶</button><span class="teller-lite"></span></div>' +
      '<p class="forklar-liten">🟠 <strong>+</strong> = positiv brikke &nbsp; 🔵 <strong>−</strong> = negativ brikke &nbsp; En <strong>+</strong> og en <strong>−</strong> sammen er et <strong>nullpar</strong> (verdi 0).</p>');
    const ra = root.querySelector('.r-a'), rb = root.querySelector('.r-b'), bord = root.querySelector('.brikke-bord');
    const utt = root.querySelector('.wg-uttrykk'), fork = root.querySelector('.wg-forklaring'), verdi = root.querySelector('.brikke-verdi');
    const opBtns = root.querySelectorAll('[data-op]'), btNeste = root.querySelector('.b-neste'), btTilbake = root.querySelector('.b-tilbake'), tel = root.querySelector('.teller-lite');
    ra.value = st.a; rb.value = st.b;

    function bygg(a, op, b) {
      let p = a > 0 ? a : 0, n = a < 0 ? -a : 0; const S = [];
      const push = (text, extra) => S.push(Object.assign({ p: p, n: n, text: text }, extra || {}));
      push(a === 0 ? 'Start: Vi har ingen brikker (verdien er 0).' : (a > 0 ? 'Start: ' + a + ' positive brikker, altså ' + N(a) + '.' : 'Start: ' + (-a) + ' negative brikker, altså ' + N(a) + '.'));
      if (op === '+') {
        if (b > 0) { p += b; push('<strong>Pluss</strong> ' + N(b) + ': Legg til ' + b + ' positive brikker.', { nyPos: b }); }
        else if (b < 0) { n += -b; push('<strong>Pluss</strong> ' + N(b) + ': Legg til ' + (-b) + ' negative brikker.', { nyNeg: -b }); }
        else push('Pluss 0 forandrer ingenting.');
      } else {
        if (b > 0) {
          if (p < b) { const k = b - p; p += k; n += k; push('Vi skal ta bort ' + b + ' positive brikker, men har bare ' + (p - k) + '. Da legger vi til ' + k + ' <strong>nullpar</strong> (en + og en −). Verdien forandrer seg ikke!', { nyPos: k, nyNeg: k }); }
          p -= b; push('<strong>Minus</strong> ' + N(b) + ': Ta bort ' + b + ' positive brikker.');
        } else if (b < 0) {
          const m = -b;
          if (n < m) { const k = m - n; p += k; n += k; push('Vi skal ta bort ' + m + ' negative brikker, men har bare ' + (n - k) + '. Da legger vi til ' + k + ' <strong>nullpar</strong> (en + og en −). Verdien forandrer seg ikke!', { nyPos: k, nyNeg: k }); }
          n -= m; push('<strong>Minus</strong> ' + N(b) + ': Ta bort ' + m + ' negative brikker.');
        } else push('Minus 0 forandrer ingenting.');
      }
      if (p > 0 && n > 0) {
        const k = Math.min(p, n);
        push('Hver + sammen med en − er et <strong>nullpar</strong>. Her er det ' + k + ' nullpar.', { par: true });
        p -= k; n -= k; push('Nullparene blir 0, så vi tar dem bort.');
      }
      const exp = op === '+' ? a + b : a - b;
      if (p - n !== exp) throw new Error('brikker: feil svar ' + (p - n) + ' vs ' + exp);
      push('✅ <strong>Svar:</strong> ' + N(a) + (op === '+' ? ' + ' : ' − ') + (b < 0 ? '(' + N(b) + ')' : N(b)) + ' = ' + N(exp), { slutt: true });
      return S;
    }
    function chips(k, cls, sym, nyt, parN) {
      let h = '';
      for (let i = 0; i < k; i++) {
        h += '<span class="brikke ' + cls + (i >= k - nyt ? ' ny' : '') + (i < parN ? ' par' : '') + '" aria-hidden="true">' + sym + '</span>';
      }
      return h;
    }
    function draw() {
      const S = steps[st.i];
      const bTxt = st.b < 0 ? '(' + N(st.b) + ')' : N(st.b);
      utt.innerHTML = N(st.a) + ' ' + (st.op === '+' ? '+' : '−') + ' ' + bTxt + (S.slutt ? ' = ' + N(S.p - S.n) : ' = <span class="spm">?</span>');
      oaob();
      const parN = S.par ? Math.min(S.p, S.n) : 0;
      bord.innerHTML = '<div class="gruppe pos-gruppe">' + (S.p ? chips(S.p, 'pos', '+', S.nyPos || 0, parN) : '') + '</div><div class="gruppe neg-gruppe">' + (S.n ? chips(S.n, 'neg', '−', S.nyNeg || 0, parN) : '') + '</div>';
      if (!S.p && !S.n) bord.innerHTML = '<div class="tomt">Ingen brikker (0)</div>';
      verdi.innerHTML = 'Verdi akkurat nå: ' + S.p + ' positive − ' + S.n + ' negative = ' + N(S.p - S.n);
      fork.innerHTML = '<p>' + S.text + '</p>';
      tel.textContent = 'Steg ' + (st.i + 1) + ' av ' + steps.length;
      btNeste.disabled = st.i >= steps.length - 1; btTilbake.disabled = st.i === 0;
    }
    function oaob() { root.querySelector('.o-a').innerHTML = N(st.a); root.querySelector('.o-b').innerHTML = N(st.b); }
    function reset() { steps = bygg(st.a, st.op, st.b); st.i = 0; draw(); }
    function sync() { opBtns.forEach(b => b.setAttribute('aria-pressed', b.dataset.op === st.op ? 'true' : 'false')); }
    ra.addEventListener('input', () => { st.a = +ra.value; reset(); });
    rb.addEventListener('input', () => { st.b = +rb.value; reset(); });
    opBtns.forEach(b => b.addEventListener('click', () => { st.op = b.dataset.op; sync(); reset(); }));
    btNeste.addEventListener('click', () => { if (st.i < steps.length - 1) { st.i++; draw(); } });
    btTilbake.addEventListener('click', () => { if (st.i > 0) { st.i--; draw(); } });
    root.querySelector('.b-start').addEventListener('click', () => { st.i = 0; draw(); });
    sync(); reset();
  };

  /* ============================================================
     5. Mønster for gange
     ============================================================ */
  W.monster = function (root, opts) {
    opts = opts || {};
    const st = { b: opts.b !== undefined ? opts.b : -3, vis: 1 };
    const A = [4, 3, 2, 1, 0, -1, -2, -3, -4];
    frame(root, opts.tittel || 'Gangemønsteret',
      '<div class="wg-kontroller"><div class="ctl"><span>Tallet vi ganger med</span><div class="stepper"><button type="button" class="knapp liten m-ned" aria-label="Ett tall mindre">−</button><output class="o-b stort"></output><button type="button" class="knapp liten m-opp" aria-label="Ett tall mer">+</button></div></div>' +
      '<button type="button" class="knapp primær m-neste">Vis neste rad ▼</button><button type="button" class="knapp liten m-alle">Vis alle</button></div>' +
      '<div class="monster-tabell" role="table" aria-label="Gangemønster"></div>' +
      '<div class="wg-forklaring lesbar" aria-live="polite"></div>');
    const tab = root.querySelector('.monster-tabell'), fork = root.querySelector('.wg-forklaring'), ob = root.querySelector('.o-b');
    function draw() {
      const b = st.b; ob.innerHTML = N(b);
      let h = '<div class="mrad hode" role="row"><span>Regnestykke</span><span></span><span>Svar</span><span>Endring</span></div>';
      A.forEach(function (a, i) {
        const p = a * b; const vist = i < st.vis;
        const d = i > 0 ? p - A[i - 1] * b : null;
        h += '<div class="mrad' + (vist ? ' vist' : ' skjult') + (i === st.vis - 1 ? ' ny' : '') + '" role="row">' +
          '<span>' + N(a) + ' · ' + (b < 0 ? '(' + N(b) + ')' : N(b)) + '</span><span>=</span><span class="svar">' + (vist ? N(p) : '?') + '</span>' +
          '<span class="diff">' + (vist && d !== null ? (d === 0 ? '0' : (d > 0 ? '+' : '−') + Math.abs(d)) + ' ↓' : '') + '</span></div>';
      });
      tab.innerHTML = h;
      let t = '';
      if (b === 0) t = '<p>Alt ganger 0 er 0. Prøv et annet tall!</p>';
      else if (st.vis >= 3) t += '<p>🔎 Se på mønsteret: hver gang det første tallet blir <strong>1 mindre</strong>, ' + (b > 0 ? '<strong>minker</strong>' : '<strong>øker</strong>') + ' svaret med <strong>' + Math.abs(b) + '</strong>.</p>';
      else t = '<p>Trykk «Vis neste rad» og se hva som skjer med svaret.</p>';
      if (st.vis >= 7 && b !== 0) t += '<p>🚀 Mønsteret fortsetter også når det første tallet er negativt. Slik ser vi at ' + (b < 0 ? '<strong>negativt · negativt = positivt</strong>, for eksempel ' + N(-2) + ' · ' + '(' + N(b) + ') = ' + N(-2 * b) + '.' : '<strong>negativt · positivt = negativt</strong>, for eksempel ' + N(-2) + ' · ' + N(b) + ' = ' + N(-2 * b) + '.') + '</p>';
      fork.innerHTML = t;
    }
    root.querySelector('.m-neste').addEventListener('click', () => { st.vis = Math.min(A.length, st.vis + 1); draw(); });
    root.querySelector('.m-alle').addEventListener('click', () => { st.vis = A.length; draw(); });
    root.querySelector('.m-ned').addEventListener('click', () => { st.b = Math.max(-6, st.b - 1); st.vis = 1; draw(); });
    root.querySelector('.m-opp').addEventListener('click', () => { st.b = Math.min(6, st.b + 1); st.vis = 1; draw(); });
    draw();
  };

  /* ============================================================
     6. Fortegnsmaskin (gange og dele)
     ============================================================ */
  W.fortegn = function (root, opts) {
    opts = opts || {};
    const st = { s1: 1, s2: -1, op: opts.op || '*', a: 4, b: 3 };
    const r = M.rng(Date.now() & 0xffff);
    frame(root, opts.tittel || 'Fortegnsmaskinen',
      '<div class="wg-kontroller">' +
      '<div class="ctl"><span>Første tall</span><div class="seg" data-g="s1"><button type="button" data-s="1">+</button><button type="button" data-s="-1">−</button></div></div>' +
      '<div class="ctl"><span>Regneart</span><div class="seg" data-g="op"><button type="button" data-o="*">gange ·</button><button type="button" data-o="/">dele :</button></div></div>' +
      '<div class="ctl"><span>Andre tall</span><div class="seg" data-g="s2"><button type="button" data-s="1">+</button><button type="button" data-s="-1">−</button></div></div>' +
      '<button type="button" class="knapp liten nytt">🎲 Nye tall</button></div>' +
      '<div class="wg-uttrykk stort" aria-live="polite"></div>' +
      '<table class="fortegn-tabell" aria-label="Fortegnsregler"><tr><th></th><th>andre: +</th><th>andre: −</th></tr>' +
      '<tr><th>første: +</th><td data-c="1,1">+</td><td data-c="1,-1">−</td></tr>' +
      '<tr><th>første: −</th><td data-c="-1,1">−</td><td data-c="-1,-1">+</td></tr></table>' +
      '<div class="wg-forklaring lesbar" aria-live="polite"></div>');
    const utt = root.querySelector('.wg-uttrykk'), fork = root.querySelector('.wg-forklaring');
    function draw() {
      let A, B, res;
      if (st.op === '*') { A = st.s1 * st.a; B = st.s2 * st.b; res = A * B; }
      else { A = st.s1 * st.a * st.b; B = st.s2 * st.b; res = A / B; }
      const sym = st.op === '*' ? ' · ' : ' : ';
      utt.innerHTML = '(' + N(A) + ')' + sym + '(' + N(B) + ') = ' + N(res);
      root.querySelectorAll('[data-g="s1"] button').forEach(b => b.setAttribute('aria-pressed', (+b.dataset.s === st.s1) + ''));
      root.querySelectorAll('[data-g="s2"] button').forEach(b => b.setAttribute('aria-pressed', (+b.dataset.s === st.s2) + ''));
      root.querySelectorAll('[data-g="op"] button').forEach(b => b.setAttribute('aria-pressed', (b.dataset.o === st.op) + ''));
      root.querySelectorAll('td[data-c]').forEach(td => td.classList.toggle('aktiv', td.dataset.c === st.s1 + ',' + st.s2));
      const lik = st.s1 === st.s2;
      fork.innerHTML = '<p>' + (lik ? '<strong>Like fortegn</strong> (begge ' + (st.s1 > 0 ? 'positive' : 'negative') + ') gir <strong>positivt</strong> svar.' : '<strong>Ulike fortegn</strong> (ett positivt og ett negativt) gir <strong>negativt</strong> svar.') + '</p>' +
        '<p>Regn først uten fortegn: ' + st.a * st.b + (st.op === '*' ? ' = ' + st.a + ' · ' + st.b : ' : ' + st.b + ' = ' + st.a) + '. Sett så riktig fortegn på svaret: ' + N(res) + '.</p>';
    }
    root.querySelectorAll('[data-g] button').forEach(btn => btn.addEventListener('click', () => {
      const g = btn.parentNode.dataset.g;
      if (g === 'op') st.op = btn.dataset.o; else st[g] = +btn.dataset.s;
      draw();
    }));
    root.querySelector('.nytt').addEventListener('click', () => { st.a = r.int(2, 9); st.b = r.int(2, 9); draw(); });
    draw();
  };

  /* ============================================================
     7. Motsatte tall
     ============================================================ */
  W.motsatte = function (root, opts) {
    opts = opts || {};
    let x = opts.x || 4;
    frame(root, opts.tittel || 'Motsatte tall',
      '<div class="wg-kontroller"><label class="ctl">Velg et tall <input type="range" min="1" max="10"><output></output></label></div>' +
      '<div class="svg-wrap"></div><div class="wg-forklaring lesbar"></div>');
    const rg = root.querySelector('input'), wrap = root.querySelector('.svg-wrap'), fork = root.querySelector('.wg-forklaring');
    rg.value = x;
    function draw() {
      root.querySelector('output').innerHTML = N(x);
      lineSVG(wrap, {
        lo: -10, hi: 10, markers: [{ v: x, label: F(x) }, { v: -x, label: F(-x) }, { v: 0, label: '0' }],
        arcs: [{ from: 0, to: x, label: skritt(x) }, { from: 0, to: -x, label: skritt(x) }]
      });
      fork.innerHTML = '<p>' + N(x) + ' og ' + N(-x) + ' er <strong>motsatte tall</strong>. De ligger like langt fra 0, men på hver sin side.</p><p>Legger du dem sammen, får du alltid 0: ' + N(x) + ' + (' + N(-x) + ') = ' + N(0) + '.</p>';
    }
    rg.addEventListener('input', () => { x = +rg.value; draw(); });
    draw();
    window.addEventListener('resize', () => { if (root.isConnected) draw(); });
  };

  /* ============================================================
     8. Statisk tallinje i oppgaver
     ============================================================ */
  W['tallinje-vis'] = function (root, opts) {
    opts = opts || {};
    root.classList.add('wg', 'wg-enkel');
    root.innerHTML = '<div class="svg-wrap"></div>';
    const wrap = root.querySelector('.svg-wrap');
    function draw() {
      lineSVG(wrap, {
        lo: opts.lo !== undefined ? opts.lo : -10, hi: opts.hi !== undefined ? opts.hi : 10,
        markers: (opts.punkter || []).map(p => ({ v: p.v, label: p.label || '?', cls: p.cls || 'grå' })),
        arcs: opts.buer || [], token: opts.token,
        alt: opts.alt || 'Tallinje'
      });
    }
    draw();
    window.addEventListener('resize', () => { if (root.isConnected) draw(); });
  };

  M.mountWidget = function (el, name, opts) {
    if (!W[name]) { el.textContent = 'Modell mangler: ' + name; return; }
    el.classList.add('wg-' + name);
    W[name](el, opts || {});
  };
})();
