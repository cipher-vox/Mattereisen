/* ============================================================
   Verktøy-modeller: Python-editor, regneark og GeoGebra-lignende tegner
   Alt kjører i nettleseren. Ingenting sendes noe sted og ingenting lagres.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE; const W = M.widgets; const F = M.fmt;
  const q = (r, s) => r.querySelector(s);
  const esc = M.esc || (s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])));
  function frame(root, tittel, inner) { root.classList.add('wg'); root.innerHTML = '<div class="wg-tittel"><span aria-hidden="true">🛠️</span> ' + tittel + '</div>' + inner; }

  /* ---------- fargelegging av Python ---------- */
  const PYKW = /^(if|elif|else|while|for|in|def|return|break|continue|pass|and|or|not|is|import|from|as|lambda|try|except|finally|global|True|False|None)$/;
  const PYBI = /^(print|input|len|range|int|float|str|bool|list|dict|tuple|abs|round|min|max|sum|sorted|enumerate|zip|type)$/;
  M.highlightPy = function (code) {
    const re = /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|f?"(?:\\.|[^"\\\n])*"|f?'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b)|([A-Za-z_æøåÆØÅ][A-Za-z0-9_æøåÆØÅ]*)/g;
    let out = '', last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      if (m[1]) out += '<span class="py-k">' + esc(m[1]) + '</span>'; else if (m[2]) out += '<span class="py-s">' + esc(m[2]) + '</span>'; else if (m[3]) out += '<span class="py-n">' + esc(m[3]) + '</span>';
      else if (PYKW.test(m[4])) out += '<span class="py-w">' + esc(m[4]) + '</span>'; else if (PYBI.test(m[4])) out += '<span class="py-b">' + esc(m[4]) + '</span>'; else out += esc(m[4]);
      last = re.lastIndex;
    }
    return out + esc(code.slice(last));
  };

  /* ============================================================
     Python-editor
     ============================================================ */
  W.kode = function (root, o) {
    const start = (o.kode || '').replace(/^\n/, '');
    const les = !!o.lesbar;
    frame(root, o.tittel || 'Skriv og kjør Python',
      (o.intro ? '<p class="lesbar kode-intro">' + o.intro + '</p>' : '') +
      '<div class="kode-editor' + (les ? ' kode-les' : '') + '"><pre class="kode-hl" aria-hidden="true"></pre><textarea class="kode-ta" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Pythonkode"' + (les ? ' readonly' : '') + '></textarea></div>' +
      (o.input ? '<label class="kode-in">Svar til input() (ett svar per linje): <textarea class="kode-svar" rows="2" spellcheck="false"></textarea></label>' : '') +
      '<div class="forslag"><button type="button" class="knapp primær kode-kjor">▶ Kjør</button>' + (les ? '' : '<button type="button" class="knapp liten kode-reset">↺ Tilbake til start</button>') + (o.losningKode ? '<button type="button" class="knapp liten kode-losning-knapp">💡 Vis løsningsforslag</button>' : '') + '</div><div class="kode-losning" hidden></div>' +
      '<div class="kode-ut" aria-live="polite" hidden><div class="kode-ut-tittel">Resultat</div><pre class="kode-pre"></pre></div><div class="kode-sjekk" aria-live="polite"></div>');
    const ta = q(root, '.kode-ta'), hl = q(root, '.kode-hl'), pre = q(root, '.kode-pre'), sj = q(root, '.kode-sjekk'), svar = q(root, '.kode-svar');
    ta.value = start; const lines = () => Math.max(3, ta.value.split('\n').length);
    function sync() { hl.innerHTML = M.highlightPy(ta.value) + '\n'; ta.rows = lines(); hl.style.minHeight = ta.offsetHeight + 'px'; }
    ta.addEventListener('input', sync); ta.addEventListener('scroll', () => { hl.scrollLeft = ta.scrollLeft; });
    ta.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') { e.preventDefault(); const s = ta.selectionStart; ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(ta.selectionEnd); ta.selectionStart = ta.selectionEnd = s + 4; sync(); }
      else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); kjor(); }
      else if (e.key === 'Enter') { const s = ta.selectionStart; const ln = ta.value.slice(0, s).split('\n').pop(); const ind = /^ */.exec(ln)[0] + (/:\s*$/.test(ln) ? '    ' : ''); e.preventDefault(); ta.value = ta.value.slice(0, s) + '\n' + ind + ta.value.slice(ta.selectionEnd); ta.selectionStart = ta.selectionEnd = s + 1 + ind.length; sync(); }
    });
    function kjor() {
      const inputs = svar ? svar.value.split('\n').filter((x, i, a) => !(i === a.length - 1 && x === '')) : [];
      const r = M.py.run(ta.value, { inputs: inputs, extraModules: o.moduler });
      let h = esc(r.out);
      if (r.error) h += (h && !/\n$/.test(h) ? '\n' : '') + '<span class="kode-feil">Feil i linje ' + r.error.line + ' (' + r.error.type + '):\n' + esc(r.error.msg) + '</span>';
      pre.innerHTML = h || '<span class="kode-tom">(ingenting ble skrevet ut)</span>';
      q(root, '.kode-ut').hidden = false; q(root, '.kode-ut').classList.toggle('har-feil', !!r.error);
      if (o.forvent !== undefined || o.sjekk) {
        const ok = !r.error && (o.sjekk ? o.sjekk(r.out, ta.value) : r.out.trim() === String(o.forvent).trim());
        sj.innerHTML = ok ? '<div class="callout mestring"><div class="callout-ikon">🎉</div><div class="callout-tekst"><strong>Riktig!</strong> ' + (o.ros || 'Koden din gjør det den skal.') + '</div></div>' : '<p class="lesbar">' + (r.error ? 'Se på feilmeldingen over. Den sier hvilken linje du skal sjekke.' : (o.hint || 'Ikke helt ennå. Les oppgaven en gang til og prøv igjen.')) + '</p>';
      }
      if (M.addReadButtons) { /* utskrift leses ikke opp automatisk */ }
    }
    q(root, '.kode-kjor').addEventListener('click', kjor);
    const rs = q(root, '.kode-reset'); if (rs) rs.addEventListener('click', () => { ta.value = start; sync(); pre.textContent = ''; q(root, '.kode-ut').hidden = true; sj.innerHTML = ''; });
    const lk = q(root, '.kode-losning-knapp');
    if (lk) lk.addEventListener('click', function () { const b = q(root, '.kode-losning'); b.hidden = !b.hidden; b.innerHTML = b.hidden ? '' : '<strong>Løsningsforslag</strong> (det finnes flere måter å løse det på):<pre class="kode-hl kode-lf">' + M.highlightPy(o.losningKode) + '</pre>'; lk.textContent = b.hidden ? '💡 Vis løsningsforslag' : 'Skjul løsningsforslag'; });
    sync(); setTimeout(sync, 50);
    if (o.autokjor) kjor();
  };

  /* statisk kodeblokk (kan kjøres) */
  W.kodevis = function (root, o) { W.kode(root, Object.assign({ lesbar: true, tittel: o.tittel || 'Kode' }, o)); };

  /* ============================================================
     Regneark
     ============================================================ */
  const colName = c => { let s = ''; c++; while (c > 0) { const m = (c - 1) % 26; s = String.fromCharCode(65 + m) + s; c = Math.floor((c - 1) / 26); } return s; };
  const colNum = s => { let n = 0; for (let i = 0; i < s.length; i++) n = n * 26 + (s.charCodeAt(i) - 64); return n - 1; };
  const ERR = n => ({ err: n });
  const isErr = v => v && typeof v === 'object' && v.err;

  function makeSheet(cols, rows) {
    const raw = {}; let cache = null; let busy = null;
    function ref(c, r) { return colName(c) + (r + 1); }
    function evalCell(key) {
      if (cache[key] !== undefined) return cache[key];
      if (busy[key]) return ERR('#SIRKEL!');
      busy[key] = 1; let v; const s = raw[key];
      if (s === undefined || s === '') v = '';
      else if (s[0] === '=') { try { v = formula(s.slice(1), key); } catch (e) { v = e && e.err ? e : ERR('#VERDI!'); } }
      else { const n = M.parseNum ? numOf(s) : null; v = n === null ? s : n; }
      delete busy[key]; cache[key] = v; return v;
    }
    function numOf(s) { const t = String(s).trim().replace(/\s/g, '').replace(',', '.'); if (/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(t)) return parseFloat(t); if (/^[+-]?\d+(\.\d+)?%$/.test(t)) return parseFloat(t) / 100; return null; }
    function num(v) { if (isErr(v)) throw v; if (v === '' || v === undefined) return 0; if (typeof v === 'boolean') return v ? 1 : 0; if (typeof v === 'number') return v; const n = numOf(v); if (n === null) throw ERR('#VERDI!'); return n; }
    function formula(src, self) {
      const harFunk = /[A-Za-zÆØÅæøå.]\s*\(/.test(src);
      const sep = /;/.test(src) || !harFunk ? ';' : ',';
      if (sep === ';') src = src.replace(/(\d),(\d)/g, '$1.$2');
      const toks = []; let i = 0;
      while (i < src.length) {
        const ch = src[i];
        if (/\s/.test(ch)) { i++; continue; }
        if (ch === '"') { let j = i + 1, b = ''; while (j < src.length && src[j] !== '"') { b += src[j++]; } toks.push({ t: 's', v: b }); i = j + 1; continue; }
        let m;
        if ((m = /^\$?[A-Za-z]{1,2}\$?\d+(?::\$?[A-Za-z]{1,2}\$?\d+)?/.exec(src.slice(i))) && !/^[A-Za-z]+\d*\(/.test(src.slice(i))) { toks.push({ t: 'r', v: m[0] }); i += m[0].length; continue; }
        if ((m = /^\d+\.?\d*(e[+-]?\d+)?|^\.\d+/i.exec(src.slice(i)))) { toks.push({ t: 'n', v: parseFloat(m[0]) }); i += m[0].length; continue; }
        if ((m = /^[A-Za-zÆØÅæøå][A-Za-zÆØÅæøå0-9_.]*/.exec(src.slice(i)))) { toks.push({ t: 'f', v: m[0].toUpperCase() }); i += m[0].length; continue; }
        const two = src.substr(i, 2); if (['<>', '<=', '>='].indexOf(two) >= 0) { toks.push({ t: 'o', v: two }); i += 2; continue; }
        if ('+-*/^&=<>()%'.indexOf(ch) >= 0 || ch === sep) { toks.push({ t: 'o', v: ch }); i++; continue; }
        throw ERR('#NAVN?');
      }
      let p = 0; const pk = () => toks[p], isO = v => pk() && pk().t === 'o' && pk().v === v;
      function rng(s) { const [a, b] = s.replace(/\$/g, '').split(':'); const A = /^([A-Za-z]+)(\d+)$/.exec(a); const B = b ? /^([A-Za-z]+)(\d+)$/.exec(b) : A; const out = []; const c1 = colNum(A[1].toUpperCase()), c2 = colNum(B[1].toUpperCase()), r1 = +A[2] - 1, r2 = +B[2] - 1; for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) out.push(evalCell(ref(c, r))); return out; }
      function cmpE() { let a = cat(); while (pk() && pk().t === 'o' && ['=', '<>', '<', '>', '<=', '>='].indexOf(pk().v) >= 0) { const op = pk().v; p++; const b = cat(); a = compare(op, a, b); } return a; }
      function compare(op, a, b) { if (isErr(a)) throw a; if (isErr(b)) throw b; if (a === '') a = typeof b === 'string' ? '' : 0; if (b === '') b = typeof a === 'string' ? '' : 0; let c; if (typeof a === 'string' && typeof b === 'string') c = a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0; else c = num(a) < num(b) ? -1 : num(a) > num(b) ? 1 : 0; return op === '=' ? c === 0 : op === '<>' ? c !== 0 : op === '<' ? c < 0 : op === '>' ? c > 0 : op === '<=' ? c <= 0 : c >= 0; }
      function cat() { let a = add(); while (isO('&')) { p++; const b = add(); a = fmtV(a) + fmtV(b); } return a; }
      function add() { let a = mul(); while (isO('+') || isO('-')) { const op = pk().v; p++; const b = mul(); a = op === '+' ? num(a) + num(b) : num(a) - num(b); } return a; }
      function mul() { let a = pw(); while (isO('*') || isO('/')) { const op = pk().v; p++; const b = pw(); if (op === '/') { if (num(b) === 0) throw ERR('#DIV/0!'); a = num(a) / num(b); } else a = num(a) * num(b); } return a; }
      function pw() { let a = un(); while (isO('^')) { p++; const b = un(); a = Math.pow(num(a), num(b)); } return a; }
      function un() { if (isO('-')) { p++; return -num(un()); } if (isO('+')) { p++; return un(); } return pc(); }
      function pc() { let a = at(); while (isO('%')) { p++; a = num(a) / 100; } return a; }
      function args() { const r = []; if (isO(')')) { p++; return r; } for (;;) { r.push(cmpE()); if (isO(sep)) { p++; continue; } if (isO(')')) { p++; break; } throw ERR('#NAVN?'); } return r; }
      function flat(a) { const r = []; a.forEach(x => { if (Array.isArray(x)) x.forEach(y => r.push(y)); else r.push(x); }); return r; }
      const nums = a => flat(a).filter(x => { if (isErr(x)) throw x; return typeof x === 'number'; });
      function at() {
        const t = pk(); if (!t) throw ERR('#VERDI!'); p++;
        if (t.t === 'n') return t.v; if (t.t === 's') return t.v;
        if (t.t === 'r') { if (/:/.test(t.v)) return rng(t.v); const v = rng(t.v)[0]; return v; }
        if (t.t === 'o' && t.v === '(') { const v = cmpE(); if (!isO(')')) throw ERR('#NAVN?'); p++; return v; }
        if (t.t === 'f') {
          if (t.v === 'TRUE' || t.v === 'SANN') return true; if (t.v === 'FALSE' || t.v === 'USANN') return false;
          if (t.v === 'PI') { if (isO('(')) { p++; args(); } return Math.PI; }
          if (!isO('(')) throw ERR('#NAVN?'); p++;
          const f = t.v;
          if (f === 'IF' || f === 'HVIS') { const a = args(); return (a[0] && !isErr(a[0])) ? (a[1] === undefined ? true : a[1]) : (a[2] === undefined ? false : a[2]); }
          const a = args();
          switch (f) {
            case 'SUM': case 'SUMMA': return nums(a).reduce((s, x) => s + x, 0);
            case 'AVERAGE': case 'GJENNOMSNITT': { const n = nums(a); if (!n.length) throw ERR('#DIV/0!'); return n.reduce((s, x) => s + x, 0) / n.length; }
            case 'MIN': { const n = nums(a); return n.length ? Math.min.apply(null, n) : 0; } case 'MAX': case 'MAKS': { const n = nums(a); return n.length ? Math.max.apply(null, n) : 0; }
            case 'COUNT': case 'ANTALL': return nums(a).length; case 'COUNTA': case 'ANTALLA': return flat(a).filter(x => x !== '').length;
            case 'MEDIAN': { const n = nums(a).sort((x, y) => x - y); if (!n.length) throw ERR('#VERDI!'); const k = n.length; return k % 2 ? n[(k - 1) / 2] : (n[k / 2 - 1] + n[k / 2]) / 2; }
            case 'MODE': case 'MODUS': case 'MODE.SNGL': { const n = nums(a); const c = {}; let b = null, bc = 0; n.forEach(x => { c[x] = (c[x] || 0) + 1; if (c[x] > bc) { bc = c[x]; b = x; } }); return b; }
            case 'ROUND': case 'AVRUND': { const k = Math.pow(10, a[1] === undefined ? 0 : num(a[1])); const x = num(a[0]) * k; return Math.sign(x) * Math.round(Math.abs(x) + 1e-9) / k; }
            case 'SQRT': case 'ROT': if (num(a[0]) < 0) throw ERR('#TALL!'); return Math.sqrt(num(a[0]));
            case 'ABS': return Math.abs(num(a[0])); case 'POWER': case 'EKSP': case 'POTENS': return Math.pow(num(a[0]), num(a[1]));
            case 'INT': case 'HELTALL': return Math.floor(num(a[0])); case 'MOD': case 'REST': return ((num(a[0]) % num(a[1])) + num(a[1])) % num(a[1]);
            case 'AND': case 'OG': return flat(a).every(x => x === true || (typeof x === 'number' && x !== 0)); case 'OR': case 'ELLER': return flat(a).some(x => x === true || (typeof x === 'number' && x !== 0)); case 'NOT': case 'IKKE': return !a[0];
            case 'RAND': case 'TILFELDIG': return Math.random(); case 'RANDBETWEEN': case 'TILFELDIGMELLOM': return num(a[0]) + Math.floor(Math.random() * (num(a[1]) - num(a[0]) + 1));
            case 'FLOOR': case 'AVRUND.NED': return Math.floor(num(a[0])); case 'CEILING': case 'AVRUND.OPP': return Math.ceil(num(a[0]));
            case 'COUNTIF': case 'ANTALL.HVIS': { const cr = String(a[1]); const m2 = /^(<=|>=|<>|<|>|=)?(.*)$/.exec(cr); const op = m2[1] || '='; const val = numOf(m2[2]) === null ? m2[2] : numOf(m2[2]); return flat([a[0]]).filter(x => x !== '' && compare(op, x, val)).length; }
            case 'SUMIF': case 'SUM.HVIS': { const cr = String(a[1]); const m2 = /^(<=|>=|<>|<|>|=)?(.*)$/.exec(cr); const op = m2[1] || '='; const val = numOf(m2[2]) === null ? m2[2] : numOf(m2[2]); const rr = flat([a[0]]), sr = a[2] ? flat([a[2]]) : rr; return rr.reduce((s, x, i) => s + (x !== '' && compare(op, x, val) && typeof sr[i] === 'number' ? sr[i] : 0), 0); }
            case 'TEXT': case 'TEKST': return fmtV(a[0]); case 'LEN': case 'LENGDE': return String(a[0]).length; case 'CONCAT': case 'KJEDE.SAMMEN': case 'SAMMENFØY': return flat(a).map(fmtV).join('');
          }
          throw ERR('#NAVN?');
        }
        throw ERR('#VERDI!');
      }
      const v = cmpE(); if (p < toks.length) throw ERR('#NAVN?');
      if (Array.isArray(v)) return v[0]; if (typeof v === 'number' && !isFinite(v)) throw ERR('#TALL!'); return v;
    }
    function fmtV(v) { if (isErr(v)) return v.err; if (v === true) return 'SANN'; if (v === false) return 'USANN'; if (typeof v === 'number') return F(Math.round(v * 1e9) / 1e9).replace('−', '-'); return v === undefined ? '' : String(v); }
    function fmtShow(v) { if (isErr(v)) return v.err; if (v === true) return 'SANN'; if (v === false) return 'USANN'; if (typeof v === 'number') { const r = Math.round(v * 1e8) / 1e8; return String(r).replace('.', ','); } return v === undefined ? '' : String(v); }
    function shift(f, dr, dc) { return f.replace(/(\$?)([A-Za-z]{1,2})(\$?)(\d+)/g, function (m, d1, c, d2, r) { if (/^[A-Za-z]+$/.test(c) && c.length > 2) return m; const nc = d1 ? c : colName(colNum(c.toUpperCase()) + dc); const nr = d2 ? r : String(+r + dr); if (!d1 && colNum(c.toUpperCase()) + dc < 0) return '#REF!'; if (!d2 && +r + dr < 1) return '#REF!'; return d1 + nc + d2 + nr; }); }
    return { raw: raw, recalc: () => { cache = {}; busy = {}; }, get: key => evalCell(key), show: key => fmtShow(evalCell(key)), val: key => evalCell(key), shift: shift, ref: ref, numOf: numOf };
  }

  W.regneark = function (root, o) {
    const cols = o.kolonner || 6, rows = o.rader || 12; const S = makeSheet(cols, rows);
    Object.keys(o.start || {}).forEach(k => { S.raw[k] = String(o.start[k]); });
    const låst = o.laast || {};
    const st = { c: 0, r: 0, c2: 0, r2: 0 };
    frame(root, o.tittel || 'Regneark',
      (o.intro ? '<p class="lesbar">' + o.intro + '</p>' : '') +
      '<div class="rn-formelrad"><span class="rn-celle-navn" aria-label="Valgt celle">A1</span><span class="rn-fx">fx</span><input type="text" class="rn-formel" aria-label="Innhold i valgt celle" autocomplete="off" spellcheck="false"></div>' +
      '<div class="rn-wrap"><table class="rn-tabell" tabindex="0" aria-label="Regneark"></table></div>' +
      '<div class="forslag"><button type="button" class="knapp liten rn-fyll">⬇ Fyll ned</button><button type="button" class="knapp liten rn-diagram">📊 Lag søylediagram</button><button type="button" class="knapp liten rn-linje">📈 Lag linjediagram</button>' + (o.sjekk ? '<button type="button" class="knapp primær rn-sjekk">✔ Sjekk</button>' : '') + '<button type="button" class="knapp liten rn-reset">↺ Start på nytt</button>' + (o.losning ? '<button type="button" class="knapp liten rn-losning">💡 Vis løsningsforslag</button>' : '') + '</div>' +
      '<div class="rn-hjelp lesbar">Klikk på en celle og skriv. Formler starter med <strong>=</strong>. Merk flere celler med Shift+klikk.</div><div class="rn-diag"></div><div class="rn-sjekk-ut lesbar" aria-live="polite"></div>');
    const tab = q(root, '.rn-tabell'), fi = q(root, '.rn-formel'), navn = q(root, '.rn-celle-navn'), diag = q(root, '.rn-diag'), sjUt = q(root, '.rn-sjekk-ut');
    const orig = Object.assign({}, S.raw);
    const key = (c, r) => colName(c) + (r + 1);
    function sel() { return { c1: Math.min(st.c, st.c2), c2: Math.max(st.c, st.c2), r1: Math.min(st.r, st.r2), r2: Math.max(st.r, st.r2) }; }
    function draw() {
      S.recalc(); const s = sel();
      let h = '<thead><tr><th class="rn-hj"></th>' + Array.from({ length: cols }, (_, c) => '<th class="rn-kol' + (c >= s.c1 && c <= s.c2 ? ' valgt' : '') + '">' + colName(c) + '</th>').join('') + '</tr></thead><tbody>';
      for (let r = 0; r < rows; r++) {
        h += '<tr><th class="rn-rad' + (r >= s.r1 && r <= s.r2 ? ' valgt' : '') + '">' + (r + 1) + '</th>';
        for (let c = 0; c < cols; c++) {
          const k = key(c, r), v = S.get(k), inn = c >= s.c1 && c <= s.c2 && r >= s.r1 && r <= s.r2;
          h += '<td data-c="' + c + '" data-r="' + r + '" class="rn-c' + (inn ? ' valgt' : '') + (c === st.c && r === st.r ? ' aktiv' : '') + (typeof v === 'number' ? ' tall' : '') + (isErr(v) ? ' feil' : '') + (låst[k] ? ' last' : '') + '">' + esc(S.show(k)) + '</td>';
        }
        h += '</tr>';
      }
      tab.innerHTML = h + '</tbody>';
      navn.textContent = key(st.c, st.r); if (document.activeElement !== fi) fi.value = S.raw[key(st.c, st.r)] || '';
    }
    function commit(move) {
      const k = key(st.c, st.r); if (låst[k]) { fi.value = S.raw[k] || ''; return; }
      const v = fi.value; if (v === '' ) delete S.raw[k]; else S.raw[k] = v;
      if (move === 'down') { st.r = Math.min(rows - 1, st.r + 1); st.r2 = st.r; st.c2 = st.c; } else if (move === 'right') { st.c = Math.min(cols - 1, st.c + 1); st.r2 = st.r; st.c2 = st.c; }
      draw();
    }
    tab.addEventListener('mousedown', function (e) {
      const td = e.target.closest('td.rn-c'); if (!td) return;
      if (document.activeElement === fi) commit();
      const c = +td.dataset.c, r = +td.dataset.r;
      if (e.shiftKey) { st.c2 = c; st.r2 = r; } else { st.c = st.c2 = c; st.r = st.r2 = r; }
      draw(); tab.focus(); e.preventDefault();
    });
    tab.addEventListener('keydown', function (e) {
      const mv = { ArrowDown: [0, 1], ArrowUp: [0, -1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
      if (mv) { e.preventDefault(); st.c = Math.max(0, Math.min(cols - 1, st.c + mv[0])); st.r = Math.max(0, Math.min(rows - 1, st.r + mv[1])); if (!e.shiftKey) { st.c2 = st.c; st.r2 = st.r; } else { st.c2 = st.c; st.r2 = st.r; } draw(); return; }
      if (e.key === 'Delete' || e.key === 'Backspace') { const s = sel(); for (let r = s.r1; r <= s.r2; r++) for (let c = s.c1; c <= s.c2; c++) if (!låst[key(c, r)]) delete S.raw[key(c, r)]; e.preventDefault(); draw(); return; }
      if (e.key === 'Enter' || e.key === 'F2') { e.preventDefault(); fi.focus(); fi.select(); return; }
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); fi.value = e.key; fi.focus(); }
    });
    fi.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); commit('down'); tab.focus(); }
      else if (e.key === 'Tab') { e.preventDefault(); commit('right'); tab.focus(); }
      else if (e.key === 'Escape') { fi.value = S.raw[key(st.c, st.r)] || ''; tab.focus(); }
    });
    fi.addEventListener('blur', () => { if (fi.value !== (S.raw[key(st.c, st.r)] || '')) commit(); });
    q(root, '.rn-fyll').addEventListener('click', function () {
      const s = sel(); if (s.r2 === s.r1 && s.c2 === s.c1) { sjUt.textContent = 'Merk først cellen med formelen og cellene under den (Shift+klikk), og trykk så «Fyll ned».'; return; }
      for (let c = s.c1; c <= s.c2; c++) { const src = S.raw[key(c, s.r1)]; if (src === undefined) continue; for (let r = s.r1 + 1; r <= s.r2; r++) if (!låst[key(c, r)]) S.raw[key(c, r)] = src[0] === '=' ? '=' + S.shift(src.slice(1), r - s.r1, 0) : src; }
      sjUt.textContent = ''; draw();
    });
    function diagram(type) {
      const s = sel(); S.recalc(); const data = [], labels = [];
      const flatCols = s.c2 - s.c1 + 1;
      const useLabels = flatCols >= 2 && typeof S.get(key(s.c1, s.r1)) === 'string' && S.get(key(s.c1, s.r1)) !== '';
      const c0 = useLabels ? s.c1 + 1 : s.c1;
      for (let r = s.r1; r <= s.r2; r++) { const row = []; for (let c = c0; c <= s.c2; c++) { const v = S.get(key(c, r)); row.push(typeof v === 'number' ? v : null); } if (row.some(x => x !== null)) { data.push(row); labels.push(useLabels ? S.get(key(s.c1, r)) : String(r + 1)); } }
      if (!data.length) { diag.innerHTML = '<p class="lesbar">Merk celler med tall først (og gjerne en kolonne med navn til venstre), og trykk på diagramknappen.</p>'; return; }
      const nS = data[0].length, all = [].concat.apply([], data).filter(x => x !== null); const mx = Math.max(0, Math.max.apply(null, all)), mn = Math.min(0, Math.min.apply(null, all)); const VW = 560, VH = 300, L = 46, B = 38, T = 14, Rr = 10;
      const Y = v => T + (VH - T - B) * (1 - (v - mn) / ((mx - mn) || 1)); const cw = (VW - L - Rr) / data.length; const COL = ['#0e8a96', '#d9730d', '#6d3fc9', '#15803d', '#be185d'];
      let sv = '<svg viewBox="0 0 ' + VW + ' ' + VH + '" class="graf-svg" role="img" aria-label="Diagram">';
      for (let k = 0; k <= 4; k++) { const v = mn + (mx - mn) * k / 4; sv += '<line x1="' + L + '" x2="' + (VW - Rr) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" class="rutenett"/><text x="' + (L - 5) + '" y="' + (Y(v) + 4) + '" text-anchor="end" class="aks-txt">' + F(Math.round(v * 100) / 100) + '</text>'; }
      sv += '<line x1="' + L + '" x2="' + (VW - Rr) + '" y1="' + Y(0) + '" y2="' + Y(0) + '" class="aks"/>';
      if (type === 'bar') data.forEach((row, i) => { const bw = (cw * 0.8) / nS; row.forEach((v, j) => { if (v === null) return; const x = L + i * cw + cw * 0.1 + j * bw, y0 = Y(0), y1 = Y(v); sv += '<rect x="' + x + '" y="' + Math.min(y0, y1) + '" width="' + (bw - 2) + '" height="' + Math.abs(y1 - y0) + '" fill="' + COL[j % 5] + '" rx="3"/>'; }); });
      else for (let j = 0; j < nS; j++) { let pts = data.map((row, i) => row[j] === null ? null : (L + i * cw + cw / 2) + ',' + Y(row[j])).filter(Boolean); sv += '<polyline points="' + pts.join(' ') + '" class="kurve" style="stroke:' + COL[j % 5] + '"/>'; data.forEach((row, i) => { if (row[j] !== null) sv += '<circle cx="' + (L + i * cw + cw / 2) + '" cy="' + Y(row[j]) + '" r="4.5" fill="' + COL[j % 5] + '"/>'; }); }
      labels.forEach((l, i) => { sv += '<text x="' + (L + i * cw + cw / 2) + '" y="' + (VH - 16) + '" text-anchor="middle" class="aks-txt">' + esc(String(l).slice(0, 10)) + '</text>'; });
      diag.innerHTML = sv + '</svg>';
    }
    q(root, '.rn-diagram').addEventListener('click', () => diagram('bar')); q(root, '.rn-linje').addEventListener('click', () => diagram('line'));
    q(root, '.rn-reset').addEventListener('click', () => { Object.keys(S.raw).forEach(k => delete S.raw[k]); Object.assign(S.raw, orig); diag.innerHTML = ''; sjUt.textContent = ''; draw(); });
    const lb = q(root, '.rn-losning');
    if (lb) lb.addEventListener('click', function () { Object.keys(o.losning).forEach(k => { S.raw[k] = String(o.losning[k]); }); sjUt.innerHTML = '<p class="lesbar">💡 Løsningsforslaget er skrevet inn i regnearket. ' + (o.losningTekst || '') + '</p>'; draw(); });
    const sk = q(root, '.rn-sjekk');
    if (sk) sk.addEventListener('click', function () {
      S.recalc(); let ok = 0; const msg = [];
      o.sjekk.forEach(function (c) { const v = S.get(c.celle); const raw = S.raw[c.celle] || ''; const good = typeof c.verdi === 'function' ? c.verdi(v, raw, S) : (typeof c.verdi === 'number' ? (typeof v === 'number' && Math.abs(v - c.verdi) < 1e-6) : String(v) === String(c.verdi)); const frm = c.formel === false || raw[0] === '='; if (good && frm) ok++; else msg.push('<li>' + (c.celle) + ': ' + (good && !frm ? 'Verdien er riktig, men bruk en <strong>formel</strong> (start med =).' : (c.hint || 'Ikke helt riktig ennå.')) + '</li>'); });
      sjUt.innerHTML = ok === o.sjekk.length ? '<div class="callout mestring"><div class="callout-ikon">🎉</div><div class="callout-tekst"><strong>Riktig!</strong> ' + (o.ros || 'Regnearket gjør det det skal.') + '</div></div>' : '<p>' + ok + ' av ' + o.sjekk.length + ' er riktig.</p><ul>' + msg.join('') + '</ul>';
    });
    draw();
  };

  /* ============================================================
     GeoGebra-lignende tegner
     ============================================================ */
  W.geo = function (root, o) {
    const objs = []; const view = { x0: -8, x1: 8, y0: -5.5, y1: 5.5 };
    const FARGER = ['#1d4ed8', '#c2410c', '#15803d', '#a21caf', '#0e7490', '#be185d', '#a16207'];
    let fargeN = 0; let sletteId = 0;
    frame(root, o.tittel || 'Tegneverktøy (som GeoGebra)',
      '<div class="geo-rad"><div class="geo-alg"><div class="geo-inn-rad"><input type="text" class="geo-inn" placeholder="Skriv her, f.eks. f(x)=2x+1" aria-label="Skriv inn et uttrykk eller en kommando" autocomplete="off" spellcheck="false"><button type="button" class="knapp liten geo-ok" aria-label="Legg til">↵</button></div><div class="geo-melding" aria-live="polite"></div><ol class="geo-liste"></ol>' +
      '<details class="geo-hjelp"><summary>Hva kan jeg skrive?</summary><ul><li><code>f(x)=x^2-2</code> – funksjon</li><li><code>A=(2,3)</code> – punkt (du kan dra i det)</li><li><code>a=1</code> – glider (tall du kan endre)</li><li><code>Linje(A,B)</code>, <code>Linjestykke(A,B)</code></li><li><code>Sirkel(A,3)</code>, <code>Mangekant(A,B,C)</code></li><li><code>Skjæring(f,g)</code>, <code>Midtpunkt(A,B)</code></li><li><code>Avstand(A,B)</code>, <code>Areal(c)</code></li></ul></details></div>' +
      '<div class="geo-tegn"><div class="svg-wrap geo-svg-wrap"></div><div class="geo-knapper"><button type="button" class="knapp liten geo-zin" aria-label="Zoom inn">＋</button><button type="button" class="knapp liten geo-zut" aria-label="Zoom ut">－</button><button type="button" class="knapp liten geo-hjem" aria-label="Tilbakestill visning">⌂</button></div></div></div>');
    const inn = q(root, '.geo-inn'), liste = q(root, '.geo-liste'), meld = q(root, '.geo-melding'), wrap = q(root, '.geo-svg-wrap');
    const NAMES_TR = { line: ['linje', 'line'], seg: ['linjestykke', 'segment'], circle: ['sirkel', 'circle'], poly: ['mangekant', 'polygon'], inter: ['skjæring', 'skjaering', 'intersect'], mid: ['midtpunkt', 'midpoint'], dist: ['avstand', 'distance'], area: ['areal', 'area'], perp: ['normal', 'perpendicular'], par: ['parallell', 'parallel'] };
    const byName = n => objs.find(x => x.name === n);
    function splitArgs(s) { const r = []; let d = 0, cur = ''; for (const ch of s) { if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && d === 0) { r.push(cur.trim()); cur = ''; } else cur += ch; } if (cur.trim()) r.push(cur.trim()); return r; }
    function varsNow() { const v = {}; objs.forEach(x => { if (x.t === 'num') v[x.name] = x.v; }); return v; }
    function pointOf(x) {
      if (!x) return null;
      if (x.t === 'pt') { const vs = varsNow(); const ex = x.ex ? x.ex(vs) : null; return ex || { x: x.x, y: x.y }; }
      if (x.t === 'mid') { const a = pointOf(byName(x.a)), b = pointOf(byName(x.b)); return a && b ? { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } : null; }
      return null;
    }
    function fnOf(x) { if (!x) return null; if (x.t === 'fn') return v => x.f(Object.assign({}, varsNow(), { x: v })); if (x.t === 'line') { const a = pointOf(byName(x.a)), b = pointOf(byName(x.b)); if (!a || !b || a.x === b.x) return null; const k = (b.y - a.y) / (b.x - a.x); return v => a.y + k * (v - a.x); } return null; }
    function autoName(prefix) { const abc = prefix === 'P' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : prefix === 'f' ? 'fghpqrs' : 'abcdefghijklmnop'; for (const ch of abc) if (!byName(ch)) return ch; return prefix + (objs.length + 1); }
    function add(ob) {
      const ex = objs.findIndex(x => x.name === ob.name); ob.farge = ob.farge || FARGER[fargeN++ % FARGER.length]; ob.vis = ob.vis !== false; ob.id = ++sletteId;
      if (ex >= 0) { ob.farge = objs[ex].farge; ob.vis = objs[ex].vis; objs[ex] = ob; } else objs.push(ob); return ob;
    }
    function numExpr(s) { const f = M.expr(s); if (!f) throw new Error('Jeg forstår ikke uttrykket «' + s + '».'); return f; }
    function cmdOf(n) { n = n.toLowerCase(); for (const k in NAMES_TR) if (NAMES_TR[k].indexOf(n) >= 0) return k; return null; }
    function parse(src) {
      src = src.trim(); if (!src) return null; let m;
      if ((m = /^([A-Za-zæøå][A-Za-z0-9]*)\s*\(\s*x\s*\)\s*=\s*(.+)$/.exec(src))) { const f = numExpr(m[2]); return add({ t: 'fn', name: m[1], src: m[2], f: f }); }
      if ((m = /^y\s*=\s*(.+)$/i.exec(src))) { const f = numExpr(m[1]); return add({ t: 'fn', name: autoName('f'), src: m[1], f: f, yform: true }); }
      if ((m = /^([A-Za-zæøå][A-Za-z0-9]*)\s*=\s*\(\s*(.+)\)\s*$/.exec(src)) && splitArgs(m[2]).length === 2) { const a = splitArgs(m[2]); return mkPoint(m[1], a); }
      if ((m = /^\(\s*(.+)\)\s*$/.exec(src)) && splitArgs(m[1]).length === 2) return mkPoint(autoName('P'), splitArgs(m[1]));
      if ((m = /^(?:([A-Za-zæøå][A-Za-z0-9]*)\s*=\s*)?([A-Za-zæøå]+)\s*\((.*)\)\s*$/.exec(src)) && cmdOf(m[2])) return mkCmd(m[1], cmdOf(m[2]), splitArgs(m[3]));
      if ((m = /^([a-zæøå][A-Za-z0-9]*)\s*=\s*(.+)$/.exec(src))) { const f = numExpr(m[2]); const vv = f(varsNow()); if (!isFinite(vv)) throw new Error('Verdien kunne ikke regnes ut.'); return add({ t: 'num', name: m[1], v: Math.round(vv * 1e9) / 1e9, slider: true }); }
      throw new Error('Jeg forstår ikke «' + src + '». Se «Hva kan jeg skrive?».');
    }
    function mkPoint(name, a) {
      const fx = numExpr(a[0]), fy = numExpr(a[1]); const vs = varsNow(); const x = fx(vs), y = fy(vs); if (!isFinite(x) || !isFinite(y)) throw new Error('Punktet trenger to tall.');
      const frie = /^-?[0-9.,]+$/.test(a[0].replace(/\s/g, '')) && /^-?[0-9.,]+$/.test(a[1].replace(/\s/g, ''));
      return add({ t: 'pt', name: name, x: x, y: y, frie: frie, ex: frie ? null : (v => ({ x: fx(v), y: fy(v) })), srcx: a[0], srcy: a[1] });
    }
    function need(a, n, navn) { if (a.length < n) throw new Error(navn + ' trenger ' + n + ' verdier.'); a.slice(0, n).forEach(nm => { if (!byName(nm) && !/^-?[0-9.]+$/.test(nm)) throw new Error('Jeg finner ikke «' + nm + '». Lag den først.'); }); }
    function mkCmd(name, c, a) {
      switch (c) {
        case 'line': need(a, 2, 'Linje'); return add({ t: 'line', name: name || autoName('f'), a: a[0], b: a[1] });
        case 'seg': need(a, 2, 'Linjestykke'); return add({ t: 'seg', name: name || autoName('f'), a: a[0], b: a[1] });
        case 'circle': need(a, 1, 'Sirkel'); return add({ t: 'circle', name: name || 'c', a: a[0], r: a[1] });
        case 'poly': need(a, 3, 'Mangekant'); return add({ t: 'poly', name: name || 'p', pts: a });
        case 'mid': need(a, 2, 'Midtpunkt'); return add({ t: 'mid', name: name || autoName('P'), a: a[0], b: a[1] });
        case 'dist': need(a, 2, 'Avstand'); return add({ t: 'dist', name: name || autoName('d'), a: a[0], b: a[1], vis: true });
        case 'area': need(a, 1, 'Areal'); return add({ t: 'area', name: name || autoName('d'), a: a[0] });
        case 'inter': { need(a, 2, 'Skjæring'); const nm = name || autoName('P'); return add({ t: 'inter', name: nm, a: a[0], b: a[1], idx: a[2] ? +a[2] : 1 }); }
      }
    }
    function interPts(x) {
      const A = byName(x.a), Bo = byName(x.b); const f = fnOf(A), g = fnOf(Bo); const res = [];
      if (f && g) { const d = v => f(v) - g(v); let pv = view.x0, pd = d(pv); for (let k = 1; k <= 600; k++) { const v = view.x0 + (view.x1 - view.x0) * k / 600, dv = d(v); if (isFinite(pd) && isFinite(dv) && pd * dv <= 0 && !(pd === 0 && dv === 0)) { let a = pv, b = v; for (let i = 0; i < 40; i++) { const mid = (a + b) / 2; if (d(a) * d(mid) <= 0) b = mid; else a = mid; } const xs = (a + b) / 2; res.push({ x: xs, y: f(xs) }); } pv = v; pd = dv; } }
      else if (A && Bo && ((A.t === 'circle' && fnOf(Bo)) || (Bo.t === 'circle' && fnOf(A)))) { const C = A.t === 'circle' ? A : Bo, L = A.t === 'circle' ? g : f; const c = pointOf(byName(C.a)); const r = circR(C); if (c && L) { const h = v => (v - c.x) * (v - c.x) + (L(v) - c.y) * (L(v) - c.y) - r * r; let pv = view.x0, ph = h(pv); for (let k = 1; k <= 800; k++) { const v = view.x0 + (view.x1 - view.x0) * k / 800, hv = h(v); if (ph * hv <= 0) { let a = pv, b = v; for (let i = 0; i < 40; i++) { const mid = (a + b) / 2; if (h(a) * h(mid) <= 0) b = mid; else a = mid; } res.push({ x: (a + b) / 2, y: L((a + b) / 2) }); } pv = v; ph = hv; } } }
      return res;
    }
    function circR(c) { const rr = c.r; if (rr === undefined) return 1; if (/^-?[0-9.,]+$/.test(rr)) return parseFloat(rr.replace(',', '.')); const pb = pointOf(byName(rr)); const pa = pointOf(byName(c.a)); if (pb && pa) return Math.hypot(pb.x - pa.x, pb.y - pa.y); const f = M.expr(rr); return f ? f(varsNow()) : 1; }
    function polyArea(pts) { let s = 0; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; s += a.x * b.y - b.x * a.y; } return Math.abs(s) / 2; }
    function valueOf(x) {
      switch (x.t) {
        case 'dist': { const a = pointOf(byName(x.a)), b = pointOf(byName(x.b)); return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : NaN; }
        case 'area': { const t = byName(x.a); if (!t) return NaN; if (t.t === 'circle') return Math.PI * circR(t) * circR(t); if (t.t === 'poly') { const pts = t.pts.map(n => pointOf(byName(n))); return pts.every(Boolean) ? polyArea(pts) : NaN; } return NaN; }
        case 'num': return x.v; default: return NaN;
      }
    }
    const r2 = v => F(Math.round(v * 100) / 100);
    function textOf(x) {
      switch (x.t) {
        case 'fn': return x.name + '(x) = ' + x.src.replace(/\*/g, '·').replace(/\^2/g, '²').replace(/\^3/g, '³');
        case 'pt': { const p = pointOf(x); return p ? x.name + ' = (' + r2(p.x) + ', ' + r2(p.y) + ')' : x.name; }
        case 'mid': { const p = pointOf(x); return p ? x.name + ' = (' + r2(p.x) + ', ' + r2(p.y) + ')' : x.name; }
        case 'num': return x.name + ' = ' + F(x.v);
        case 'line': { const f = fnOf(x); if (!f) { const a = pointOf(byName(x.a)); return x.name + ': x = ' + (a ? r2(a.x) : '?'); } const b = f(0) , k = f(1) - f(0); return x.name + ': y = ' + M.linTekst(Math.round(k * 100) / 100, Math.round(b * 100) / 100); }
        case 'seg': return x.name + ' = Linjestykke(' + x.a + ', ' + x.b + ')'; case 'circle': return x.name + ': sirkel, r = ' + r2(circR(x)); case 'poly': return x.name + ' = Mangekant(' + x.pts.join(', ') + ')';
        case 'dist': case 'area': return x.name + ' = ' + r2(valueOf(x)); case 'inter': return x.name + ' = Skjæring(' + x.a + ', ' + x.b + ')';
      }
      return x.name;
    }
    function listDraw() {
      liste.innerHTML = objs.map(x => '<li data-id="' + x.id + '"><button type="button" class="geo-vis' + (x.vis ? ' på' : '') + '" style="--c:' + x.farge + '" aria-label="' + (x.vis ? 'Skjul ' : 'Vis ') + x.name + '" data-id="' + x.id + '"></button><div class="geo-tekst">' + esc(x.t === 'inter' ? (interPts(x).map((p, i) => x.name + (interPts(x).length > 1 ? i + 1 : '') + ' = (' + r2(p.x) + ', ' + r2(p.y) + ')').join(', ') || x.name + ': ingen skjæring i bildet') : textOf(x)) + (x.t === 'num' && x.slider ? '' : '') + '</div>' + (x.t === 'num' && x.slider ? '<input type="range" class="geo-gl" min="' + Math.min(-5, Math.floor(x.v - 5)) + '" max="' + Math.max(5, Math.ceil(x.v + 5)) + '" step="0.1" value="' + x.v + '" data-id="' + x.id + '" aria-label="Glider for ' + x.name + '">' : '') + '<button type="button" class="geo-slett" aria-label="Slett ' + x.name + '" data-id="' + x.id + '">✕</button></li>').join('');
    }
    function svgDraw() {
      const VW = 720, VH = 480; const X = v => (v - view.x0) / (view.x1 - view.x0) * VW, Y = v => VH - (v - view.y0) / (view.y1 - view.y0) * VH;
      const step = r => { const raw = r / 10; const p = Math.pow(10, Math.floor(Math.log10(raw))); const f = raw / p; return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p; };
      const sx = step(view.x1 - view.x0), sy = step(view.y1 - view.y0);
      let s = '<svg viewBox="0 0 ' + VW + ' ' + VH + '" class="geo-svg" role="img" aria-label="Tegneområde" style="touch-action:none"><rect width="' + VW + '" height="' + VH + '" fill="#fff"/>';
      for (let v = Math.ceil(view.x0 / sx) * sx; v <= view.x1; v += sx) { const vv = Math.round(v / sx) * sx; s += '<line x1="' + X(vv) + '" x2="' + X(vv) + '" y1="0" y2="' + VH + '" class="' + (Math.abs(vv) < 1e-9 ? 'aks' : 'rutenett') + '"/>' + (Math.abs(vv) > 1e-9 ? '<text x="' + X(vv) + '" y="' + (Math.min(VH - 4, Math.max(14, Y(0) + 15))) + '" text-anchor="middle" class="aks-txt">' + F(Math.round(vv * 1e6) / 1e6) + '</text>' : ''); }
      for (let v = Math.ceil(view.y0 / sy) * sy; v <= view.y1; v += sy) { const vv = Math.round(v / sy) * sy; s += '<line x1="0" x2="' + VW + '" y1="' + Y(vv) + '" y2="' + Y(vv) + '" class="' + (Math.abs(vv) < 1e-9 ? 'aks' : 'rutenett') + '"/>' + (Math.abs(vv) > 1e-9 ? '<text x="' + Math.max(18, Math.min(VW - 4, X(0) - 5)) + '" y="' + (Y(vv) + 4) + '" text-anchor="end" class="aks-txt">' + F(Math.round(vv * 1e6) / 1e6) + '</text>' : ''); }
      const pts = [];
      objs.forEach(function (x) {
        if (!x.vis) return;
        const c = x.farge;
        if (x.t === 'fn' || x.t === 'line') {
          const f = fnOf(x); if (!f) { const a = pointOf(byName(x.a)); if (a) s += '<line x1="' + X(a.x) + '" x2="' + X(a.x) + '" y1="0" y2="' + VH + '" class="kurve" style="stroke:' + c + '"/>'; return; }
          const parts = []; let cur = [], prev = null;
          for (let k = 0; k <= 600; k++) { const v = view.x0 + (view.x1 - view.x0) * k / 600; const y = f(v); const bad = !isFinite(y) || Math.abs(y) > 1e5 || (prev !== null && Math.abs(y - prev) > (view.y1 - view.y0) * 1.5); if (bad) { if (cur.length) parts.push(cur); cur = []; prev = null; continue; } cur.push(X(v).toFixed(1) + ',' + Y(y).toFixed(1)); prev = y; }
          if (cur.length) parts.push(cur); parts.forEach(p => { s += '<polyline points="' + p.join(' ') + '" class="kurve" style="stroke:' + c + '"/>'; });
        } else if (x.t === 'seg') { const a = pointOf(byName(x.a)), b = pointOf(byName(x.b)); if (a && b) s += '<line x1="' + X(a.x) + '" y1="' + Y(a.y) + '" x2="' + X(b.x) + '" y2="' + Y(b.y) + '" class="kurve" style="stroke:' + c + '"/>'; }
        else if (x.t === 'circle') { const a = pointOf(byName(x.a)); const r = circR(x); if (a && isFinite(r)) s += '<ellipse cx="' + X(a.x) + '" cy="' + Y(a.y) + '" rx="' + (r / (view.x1 - view.x0) * VW) + '" ry="' + (r / (view.y1 - view.y0) * VH) + '" fill="' + c + '" fill-opacity=".08" class="kurve" style="stroke:' + c + '"/>'; }
        else if (x.t === 'poly') { const p = x.pts.map(n => pointOf(byName(n))); if (p.every(Boolean)) s += '<polygon points="' + p.map(q2 => X(q2.x) + ',' + Y(q2.y)).join(' ') + '" fill="' + c + '" fill-opacity=".15" class="kurve" style="stroke:' + c + '"/>'; }
        else if (x.t === 'pt' || x.t === 'mid') { const p = pointOf(x); if (p) pts.push({ o: x, p: p }); }
        else if (x.t === 'inter') { interPts(x).forEach((p, i, arr) => pts.push({ o: x, p: p, lab: x.name + (arr.length > 1 ? i + 1 : '') })); }
      });
      pts.forEach(function (q2) { const free = q2.o.t === 'pt' && q2.o.frie; s += '<g class="geo-pkt' + (free ? ' fri' : '') + '" data-id="' + q2.o.id + '"><circle cx="' + X(q2.p.x) + '" cy="' + Y(q2.p.y) + '" r="' + (free ? 9 : 7) + '" fill="' + q2.o.farge + '" stroke="#fff" stroke-width="3"/><text x="' + (X(q2.p.x) + 11) + '" y="' + (Y(q2.p.y) - 10) + '" class="pkt-txt">' + (q2.lab || q2.o.name) + '</text></g>'; });
      wrap.innerHTML = s + '</svg>';
      view._X = X; view._Y = Y; view._VW = VW; view._VH = VH;
    }
    function render() { listDraw(); svgDraw(); }
    function legg(src) {
      meld.textContent = '';
      try { const ob = parse(src); if (ob) { render(); } return true; } catch (e) { meld.textContent = e.message; return false; }
    }
    function inngang() { if (inn.value.trim() && legg(inn.value)) inn.value = ''; }
    inn.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); inngang(); } });
    q(root, '.geo-ok').addEventListener('click', inngang);
    liste.addEventListener('click', function (e) {
      const id = +(e.target.dataset && e.target.dataset.id); if (!id) return;
      if (e.target.classList.contains('geo-slett')) { const i = objs.findIndex(x => x.id === id); const nm = objs[i].name; objs.splice(i, 1); for (let k = objs.length - 1; k >= 0; k--) { const x = objs[k]; if ([x.a, x.b, x.r].concat(x.pts || []).indexOf(nm) >= 0) objs.splice(k, 1); } render(); }
      else if (e.target.classList.contains('geo-vis')) { const x = objs.find(z => z.id === id); x.vis = !x.vis; render(); }
    });
    liste.addEventListener('input', function (e) { if (e.target.classList.contains('geo-gl')) { const x = objs.find(z => z.id === +e.target.dataset.id); x.v = +e.target.value; svgDraw(); liste.querySelectorAll('li').forEach(li => { const ob = objs.find(z => z.id === +li.dataset.id); if (ob) li.querySelector('.geo-tekst').textContent = ob.t === 'inter' ? li.querySelector('.geo-tekst').textContent : textOf(ob); }); } });
    function zoom(f, cx, cy) { const mx = cx === undefined ? (view.x0 + view.x1) / 2 : cx, my = cy === undefined ? (view.y0 + view.y1) / 2 : cy; view.x0 = mx + (view.x0 - mx) * f; view.x1 = mx + (view.x1 - mx) * f; view.y0 = my + (view.y0 - my) * f; view.y1 = my + (view.y1 - my) * f; svgDraw(); listDraw(); }
    q(root, '.geo-zin').addEventListener('click', () => zoom(0.7)); q(root, '.geo-zut').addEventListener('click', () => zoom(1.4));
    q(root, '.geo-hjem').addEventListener('click', () => { Object.assign(view, { x0: -8, x1: 8, y0: -5.5, y1: 5.5 }); svgDraw(); listDraw(); });
    // dra punkter og flytt bildet
    let drag = null;
    wrap.addEventListener('pointerdown', function (e) {
      const svg = wrap.querySelector('svg'); if (!svg) return; const rect = svg.getBoundingClientRect(); const g = e.target.closest('.geo-pkt.fri');
      const toX = px => view.x0 + (px - rect.left) / rect.width * (view.x1 - view.x0), toY = py => view.y1 - (py - rect.top) / rect.height * (view.y1 - view.y0);
      if (g) drag = { t: 'pt', id: +g.dataset.id, toX: toX, toY: toY }; else drag = { t: 'pan', sx: e.clientX, sy: e.clientY, v: Object.assign({}, view), rect: rect };
      wrap.setPointerCapture && wrap.setPointerCapture(e.pointerId); e.preventDefault();
    });
    wrap.addEventListener('pointermove', function (e) {
      if (!drag) return;
      if (drag.t === 'pt') { const x = objs.find(z => z.id === drag.id); if (x) { const sn = v => Math.round(v * 10) / 10; x.x = sn(drag.toX(e.clientX)); x.y = sn(drag.toY(e.clientY)); x.srcx = String(x.x); x.srcy = String(x.y); svgDraw(); liste.querySelectorAll('li').forEach(li => { const ob = objs.find(z => z.id === +li.dataset.id); if (ob) li.querySelector('.geo-tekst').textContent = ob.t === 'inter' ? '' : textOf(ob); }); } }
      else { const dx = (e.clientX - drag.sx) / drag.rect.width * (drag.v.x1 - drag.v.x0), dy = (e.clientY - drag.sy) / drag.rect.height * (drag.v.y1 - drag.v.y0); view.x0 = drag.v.x0 - dx; view.x1 = drag.v.x1 - dx; view.y0 = drag.v.y0 + dy; view.y1 = drag.v.y1 + dy; svgDraw(); }
    });
    const slipp = () => { if (drag && drag.t === 'pt') listDraw(); drag = null; }; wrap.addEventListener('pointerup', slipp); wrap.addEventListener('pointercancel', slipp);
    wrap.addEventListener('wheel', function (e) { e.preventDefault(); const svg = wrap.querySelector('svg'); const rect = svg.getBoundingClientRect(); const cx = view.x0 + (e.clientX - rect.left) / rect.width * (view.x1 - view.x0), cy = view.y1 - (e.clientY - rect.top) / rect.height * (view.y1 - view.y0); zoom(e.deltaY > 0 ? 1.15 : 0.87, cx, cy); }, { passive: false });
    (o.start || []).forEach(s => { try { parse(s); } catch (e) { /* ignorer */ } });
    render();
  };
})();
