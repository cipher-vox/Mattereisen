/* ============================================================
   Mini-Python for Mattereisen
   En liten Python som kjører direkte i nettleseren (ingenting sendes noe sted).
   Støtter det elever trenger på 8.–10. trinn: variabler, tall, tekst, lister,
   ordbøker, if/elif/else, for, while, def, return, f-strings, import math/random,
   try/except og de vanligste funksjonene.
   Heltall er BigInt, flyttall er Number, slik at 3 og 3.0 oppfører seg som i Python.
   ============================================================ */
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const M = root.MATTE = root.MATTE || {};

  class PyError extends Error { constructor(type, msg, line) { super(msg); this.pyType = type; this.pyLine = line || 0; } }
  const err = (type, msg) => new PyError(type, msg);

  /* ---------- tokenizer ---------- */
  const KW = new Set(['if', 'elif', 'else', 'while', 'for', 'in', 'def', 'return', 'break', 'continue', 'pass', 'and', 'or', 'not', 'is', 'True', 'False', 'None', 'import', 'from', 'as', 'lambda', 'try', 'except', 'finally', 'global', 'class', 'with', 'yield', 'del', 'raise', 'assert', 'nonlocal']);
  const OPS3 = ['**=', '//=', '...'];
  const OPS2 = ['**', '//', '==', '!=', '<=', '>=', '+=', '-=', '*=', '/=', '%=', '->'];
  function tokenize(src) {
    const toks = []; const lines = src.replace(/\r\n?/g, '\n').split('\n');
    const indents = [0]; let depth = 0; let i = 0, line = 1; const s = lines.join('\n'); let atStart = true;
    function push(t, v, extra) { const o = { t: t, v: v, line: line }; if (extra) Object.assign(o, extra); toks.push(o); }
    while (i < s.length) {
      if (atStart && depth === 0) {
        let col = 0, j = i;
        while (j < s.length && (s[j] === ' ' || s[j] === '\t')) { col += s[j] === '\t' ? 4 : 1; j++; }
        if (j >= s.length) { i = j; break; }
        if (s[j] === '\n') { i = j + 1; line++; continue; }
        if (s[j] === '#') { while (j < s.length && s[j] !== '\n') j++; i = j + 1; line++; continue; }
        if (col > indents[indents.length - 1]) { indents.push(col); push('indent'); }
        else { while (col < indents[indents.length - 1]) { indents.pop(); push('dedent'); } if (col !== indents[indents.length - 1]) throw new PyError('IndentationError', 'Innrykket stemmer ikke med linjene over. Bruk like mange mellomrom for hver blokk.', line); }
        i = j; atStart = false;
      }
      const ch = s[i];
      if (ch === '\n') { i++; if (depth === 0) { push('nl'); atStart = true; } line++; continue; }
      if (ch === ' ' || ch === '\t' || ch === '\r') { i++; continue; }
      if (ch === '#') { while (i < s.length && s[i] !== '\n') i++; continue; }
      if (ch === '\\' && s[i + 1] === '\n') { i += 2; line++; continue; }
      // tall
      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(s[i + 1] || ''))) {
        let j = i; while (j < s.length && /[0-9_]/.test(s[j])) j++;
        let flt = false;
        if (s[j] === '.' && /[0-9]/.test(s[j + 1] || '') || (s[j] === '.' && !/[A-Za-z_.]/.test(s[j + 1] || ''))) { flt = true; j++; while (j < s.length && /[0-9_]/.test(s[j])) j++; }
        if (/[eE]/.test(s[j] || '') && /[0-9+-]/.test(s[j + 1] || '')) { flt = true; j += 2; while (j < s.length && /[0-9]/.test(s[j])) j++; }
        const txt = s.slice(i, j).replace(/_/g, '');
        push('num', flt ? parseFloat(txt) : BigInt(txt)); i = j; continue;
      }
      // tekst
      const m = /^([fFrRbB]{0,2})('''|"""|'|")/.exec(s.slice(i, i + 5));
      if (m && (m[1] === '' || /^[fFrR]+$/.test(m[1]))) {
        const pre = m[1].toLowerCase(), q = m[2]; let j = i + m[0].length, buf = '';
        const raw = pre.indexOf('r') >= 0;
        for (;;) {
          if (j >= s.length) throw new PyError('SyntaxError', 'Teksten er ikke avsluttet. Husk anførselstegn i begge ender.', line);
          if (s.startsWith(q, j)) { j += q.length; break; }
          if (s[j] === '\n' && q.length === 1) throw new PyError('SyntaxError', 'Teksten er ikke avsluttet. Husk anførselstegn i begge ender.', line);
          if (s[j] === '\\' && !raw) {
            const n = s[j + 1]; const map = { n: '\n', t: '\t', '\\': '\\', "'": "'", '"': '"', '0': '\0' };
            if (n === '\n') { j += 2; line++; continue; }
            if (n in map) { buf += map[n]; j += 2; continue; }
            buf += '\\'; j++; continue;
          }
          if (s[j] === '\n') line++;
          buf += s[j]; j++;
        }
        if (pre.indexOf('f') >= 0) push('fstr', buf); else push('str', buf);
        i = j; continue;
      }
      if (/[A-Za-z_À-￿]/.test(ch)) { let j = i; while (j < s.length && /[A-Za-z0-9_À-￿]/.test(s[j])) j++; push('name', s.slice(i, j)); i = j; continue; }
      const o3 = s.substr(i, 3), o2 = s.substr(i, 2);
      if (OPS3.indexOf(o3) >= 0) { push('op', o3); i += 3; continue; }
      if (OPS2.indexOf(o2) >= 0) { push('op', o2); i += 2; continue; }
      if ('+-*/%<>=()[]{},:.;@'.indexOf(ch) >= 0) { if ('([{'.indexOf(ch) >= 0) depth++; if (')]}'.indexOf(ch) >= 0) depth = Math.max(0, depth - 1); push('op', ch); i++; continue; }
      throw new PyError('SyntaxError', 'Jeg forstår ikke tegnet «' + ch + '».', line);
    }
    if (toks.length && toks[toks.length - 1].t !== 'nl') push('nl');
    while (indents.length > 1) { indents.pop(); push('dedent'); }
    push('eof'); return toks;
  }

  /* ---------- parser ---------- */
  function parse(src) {
    const T = tokenize(src); let p = 0;
    const pk = () => T[p], nx = () => T[p++];
    const isOp = v => T[p].t === 'op' && T[p].v === v, isKw = v => T[p].t === 'name' && T[p].v === v;
    function synt(msg) { return new PyError('SyntaxError', msg, T[Math.min(p, T.length - 1)].line); }
    function expectOp(v, hint) { if (!isOp(v)) throw synt(hint || ('Her mangler «' + v + '».')); return nx(); }
    function expectKw(v) { if (!isKw(v)) throw synt('Her mangler «' + v + '».'); return nx(); }
    function name() { const t = pk(); if (t.t !== 'name' || KW.has(t.v)) throw synt('Her forventet jeg et navn.'); p++; return t.v; }

    function program() { const b = []; while (pk().t !== 'eof') { if (pk().t === 'nl') { p++; continue; } b.push(stmt()); } return b; }
    function block() {
      expectOp(':', 'Her mangler kolon (:) på slutten av linjen.');
      if (pk().t === 'nl') {
        p++; if (pk().t !== 'indent') throw synt('Etter kolon må neste linje være innrykket.');
        p++; const b = []; while (pk().t !== 'dedent' && pk().t !== 'eof') { if (pk().t === 'nl') { p++; continue; } b.push(stmt()); }
        if (pk().t === 'dedent') p++; return b;
      }
      return [simpleLine()];
    }
    function simpleLine() { const s = simple(); while (isOp(';')) { p++; } if (pk().t === 'nl') p++; else if (pk().t !== 'eof') throw synt('Noe er galt på denne linjen. Er det tegnsetting eller et ord som mangler?'); return s; }
    function stmt() {
      const t = pk(), line = t.line;
      if (t.t === 'indent') throw synt('Uventet innrykk. Linjen skal ikke være innrykket her.');
      if (t.t === 'name') {
        switch (t.v) {
          case 'if': { p++; const node = { k: 'if', line: line, arms: [] }; node.arms.push([expr(), block()]); while (isKw('elif')) { p++; node.arms.push([expr(), block()]); } if (isKw('else')) { p++; node.els = block(); } return node; }
          case 'while': { p++; const c = expr(); return { k: 'while', line: line, c: c, body: block() }; }
          case 'for': { p++; const tg = targetList(); expectKw('in'); const it = exprList(); return { k: 'for', line: line, tg: tg, it: it, body: block() }; }
          case 'def': { p++; const n = name(); expectOp('('); const ps = []; while (!isOp(')')) { const pn = name(); let d = null; if (isOp('=')) { p++; d = expr(); } ps.push({ n: pn, d: d }); if (isOp(',')) p++; else break; } expectOp(')'); if (isOp('->')) { p++; expr(); } return { k: 'def', line: line, n: n, ps: ps, body: block() }; }
          case 'try': { p++; const node = { k: 'try', line: line, body: block(), exc: [] }; while (isKw('except')) { p++; let ty = null, as = null; if (!isOp(':')) { ty = expr(); if (isKw('as')) { p++; as = name(); } } node.exc.push({ ty: ty, as: as, body: block() }); } if (isKw('else')) { p++; node.els = block(); } if (isKw('finally')) { p++; node.fin = block(); } return node; }
          case 'class': throw synt('Klasser (class) støttes ikke i denne enkle Python-en.');
          case 'with': throw synt('«with» støttes ikke her.');
        }
      }
      return simpleLine();
    }
    function simple() {
      const t = pk(), line = t.line;
      if (t.t === 'name') {
        switch (t.v) {
          case 'pass': p++; return { k: 'pass', line: line };
          case 'break': p++; return { k: 'break', line: line };
          case 'continue': p++; return { k: 'continue', line: line };
          case 'return': { p++; let e = null; if (pk().t !== 'nl' && pk().t !== 'eof' && !isOp(';')) e = exprList(); return { k: 'return', line: line, e: e }; }
          case 'global': case 'nonlocal': { p++; const ns = [name()]; while (isOp(',')) { p++; ns.push(name()); } return { k: 'global', line: line, ns: ns }; }
          case 'import': { p++; const items = []; do { if (isOp(',')) p++; let n = name(); while (isOp('.')) { p++; n += '.' + name(); } let as = null; if (isKw('as')) { p++; as = name(); } items.push([n, as]); } while (isOp(',')); return { k: 'import', line: line, items: items }; }
          case 'from': { p++; let n = name(); while (isOp('.')) { p++; n += '.' + name(); } expectKw('import'); let all = false, names = []; if (isOp('*')) { p++; all = true; } else { do { if (isOp(',')) p++; const a = name(); let as = null; if (isKw('as')) { p++; as = name(); } names.push([a, as]); } while (isOp(',')); } return { k: 'from', line: line, mod: n, all: all, names: names }; }
          case 'raise': { p++; const e = expr(); return { k: 'raise', line: line, e: e }; }
          case 'assert': { p++; const c = expr(); let m = null; if (isOp(',')) { p++; m = expr(); } return { k: 'assert', line: line, c: c, m: m }; }
          case 'del': { p++; const e = exprList(); return { k: 'del', line: line, e: e }; }
          case 'yield': throw synt('«yield» støttes ikke her.');
        }
      }
      const first = exprList();
      const aug = ['+=', '-=', '*=', '/=', '//=', '%=', '**='];
      if (pk().t === 'op' && aug.indexOf(pk().v) >= 0) { const op = nx().v.slice(0, -1); checkTarget(first); return { k: 'aug', line: line, op: op, tg: first, e: exprList() }; }
      if (isOp('=')) {
        const targets = [first]; let val;
        while (isOp('=')) { p++; val = exprList(); if (isOp('=')) targets.push(val); }
        targets.forEach(checkTarget);
        return { k: 'assign', line: line, tgs: targets, e: val };
      }
      return { k: 'expr', line: line, e: first };
    }
    function checkTarget(e) { if (e.k === 'name' || e.k === 'index') return; if (e.k === 'tuple' || e.k === 'list') { e.items.forEach(checkTarget); return; } throw new PyError('SyntaxError', 'Du kan bare gi en verdi til en variabel (som x = 5), ikke til dette.', e.line || 0); }
    function targetList() { const first = arith(); if (isOp(',')) { const items = [first]; while (isOp(',')) { p++; if (isKw('in')) break; items.push(arith()); } return { k: 'tuple', items: items }; } return first; }
    function exprList() { const first = expr(); if (isOp(',')) { const items = [first]; while (isOp(',')) { p++; if (pk().t === 'nl' || isOp('=') || isOp(')') || pk().t === 'eof') break; items.push(expr()); } return { k: 'tuple', items: items, line: first.line }; } return first; }
    function expr() {
      if (isKw('lambda')) { const line = nx().line; const ps = []; while (!isOp(':')) { ps.push({ n: name(), d: null }); if (isOp(',')) p++; else break; } expectOp(':'); return { k: 'lambda', line: line, ps: ps, e: expr() }; }
      const a = orExpr(); if (isKw('if')) { const line = nx().line; const c = orExpr(); expectKw('else'); const b = expr(); return { k: 'cond', line: line, c: c, a: a, b: b }; } return a;
    }
    function orExpr() { let a = andExpr(); while (isKw('or')) { const l = nx().line; a = { k: 'or', line: l, a: a, b: andExpr() }; } return a; }
    function andExpr() { let a = notExpr(); while (isKw('and')) { const l = nx().line; a = { k: 'and', line: l, a: a, b: notExpr() }; } return a; }
    function notExpr() { if (isKw('not')) { const l = nx().line; return { k: 'not', line: l, e: notExpr() }; } return cmp(); }
    function cmp() {
      const a = arith(); const ops = [], rest = [];
      for (;;) {
        const t = pk(); let op = null;
        if (t.t === 'op' && ['==', '!=', '<', '>', '<=', '>='].indexOf(t.v) >= 0) { op = t.v; p++; }
        else if (isKw('in')) { op = 'in'; p++; }
        else if (isKw('not') && T[p + 1].t === 'name' && T[p + 1].v === 'in') { op = 'not in'; p += 2; }
        else if (isKw('is')) { p++; if (isKw('not')) { p++; op = 'is not'; } else op = 'is'; }
        else break;
        ops.push(op); rest.push(arith());
      }
      return ops.length ? { k: 'cmp', line: a.line, a: a, ops: ops, rest: rest } : a;
    }
    function arith() { let a = term(); while (isOp('+') || isOp('-')) { const t = nx(); a = { k: 'bin', line: t.line, op: t.v, a: a, b: term() }; } return a; }
    function term() { let a = unary(); while (isOp('*') || isOp('/') || isOp('//') || isOp('%')) { const t = nx(); a = { k: 'bin', line: t.line, op: t.v, a: a, b: unary() }; } return a; }
    function unary() { if (isOp('-') || isOp('+')) { const t = nx(); return { k: 'neg', line: t.line, op: t.v, e: unary() }; } return power(); }
    function power() { const a = postfix(); if (isOp('**')) { const t = nx(); return { k: 'bin', line: t.line, op: '**', a: a, b: unary() }; } return a; }
    function postfix() {
      let a = atom();
      for (;;) {
        if (isOp('(')) { const line = nx().line; const args = [], kw = []; while (!isOp(')')) { if (pk().t === 'name' && T[p + 1].t === 'op' && T[p + 1].v === '=' && !KW.has(pk().v)) { const n = nx().v; p++; kw.push([n, expr()]); } else { const e = expr(); if (isKw('for')) { args.push(compFor(e, null)); } else args.push(e); } if (isOp(',')) p++; else break; } expectOp(')', 'Her mangler en slutt-parentes «)».'); a = { k: 'call', line: line, f: a, args: args, kw: kw }; }
        else if (isOp('[')) { const line = nx().line; a = { k: 'index', line: line, o: a, i: subscript() }; expectOp(']', 'Her mangler «]».'); }
        else if (isOp('.')) { const line = nx().line; const n = pk(); if (n.t !== 'name') throw synt('Her forventet jeg et navn etter punktum.'); p++; a = { k: 'attr', line: line, o: a, n: n.v }; }
        else return a;
      }
    }
    function subscript() {
      let lo = null, hi = null, st = null, slice = false;
      if (!isOp(':')) lo = expr();
      if (isOp(':')) { slice = true; p++; if (!isOp(']') && !isOp(':')) hi = expr(); if (isOp(':')) { p++; if (!isOp(']')) st = expr(); } }
      return slice ? { k: 'slice', lo: lo, hi: hi, st: st } : lo;
    }
    function compFor(e, close) { // [e for x in it if c]
      const line = nx().line; const tg = targetList(); expectKw('in'); const it = orExpr(); const conds = []; while (isKw('if')) { p++; conds.push(orExpr()); }
      let inner = null; if (isKw('for')) inner = compFor(e, close);
      return { k: 'comp', line: line, e: e, tg: tg, it: it, conds: conds, inner: inner };
    }
    function atom() {
      const t = nx();
      switch (t.t) {
        case 'num': return { k: 'num', line: t.line, v: t.v };
        case 'str': { let v = t.v; while (pk().t === 'str') v += nx().v; return { k: 'str', line: t.line, v: v }; }
        case 'fstr': return fstr(t);
        case 'name':
          if (t.v === 'True') return { k: 'const', v: true }; if (t.v === 'False') return { k: 'const', v: false }; if (t.v === 'None') return { k: 'const', v: null };
          if (KW.has(t.v)) { p--; throw synt('Her står «' + t.v + '», men jeg forventet en verdi eller et navn.'); }
          return { k: 'name', line: t.line, n: t.v };
        case 'op':
          if (t.v === '(') { if (isOp(')')) { p++; return { k: 'tuple', items: [], line: t.line }; } const e = exprList(); if (isKw('for')) { const c = compFor(e); expectOp(')'); return { k: 'gen', line: t.line, c: c }; } expectOp(')', 'Her mangler en slutt-parentes «)».'); if (e.k === 'tuple') return e; return { k: 'paren', e: e, line: t.line }; }
          if (t.v === '[') { const items = []; if (isOp(']')) { p++; return { k: 'list', items: items, line: t.line }; } const first = expr(); if (isKw('for')) { const c = compFor(first); expectOp(']'); return { k: 'listcomp', line: t.line, c: c }; } items.push(first); while (isOp(',')) { p++; if (isOp(']')) break; items.push(expr()); } expectOp(']', 'Her mangler «]».'); return { k: 'list', items: items, line: t.line }; }
          if (t.v === '{') { const keys = [], vals = []; while (!isOp('}')) { keys.push(expr()); expectOp(':', 'I en ordbok må hver nøkkel ha et kolon og en verdi.'); vals.push(expr()); if (isOp(',')) p++; else break; } expectOp('}', 'Her mangler «}».'); return { k: 'dict', line: t.line, keys: keys, vals: vals }; }
      }
      p--; const bad = pk();
      throw synt(bad.t === 'nl' || bad.t === 'eof' ? 'Linjen slutter for tidlig. Det mangler noe her.' : 'Dette skjønner jeg ikke: «' + (bad.v !== undefined ? bad.v : bad.t) + '».');
    }
    function fstr(t) {
      const s = t.v, parts = []; let i = 0, buf = '';
      while (i < s.length) {
        if (s[i] === '{' && s[i + 1] === '{') { buf += '{'; i += 2; continue; }
        if (s[i] === '}' && s[i + 1] === '}') { buf += '}'; i += 2; continue; }
        if (s[i] === '{') {
          let d = 0, j = i + 1, q = null; const st = j; let colon = -1, bang = -1;
          for (; j < s.length; j++) {
            const c = s[j];
            if (q) { if (c === q) q = null; continue; }
            if (c === "'" || c === '"') { q = c; continue; }
            if ('([{'.indexOf(c) >= 0) d++;
            else if (')]'.indexOf(c) >= 0) d--;
            else if (c === '}') { if (d === 0) break; d--; }
            else if (c === ':' && d === 0 && colon < 0) colon = j;
            else if (c === '!' && d === 0 && colon < 0 && s[j + 1] !== '=') bang = j;
          }
          if (j >= s.length) throw new PyError('SyntaxError', 'I f-teksten mangler en avsluttende «}».', t.line);
          const exprEnd = bang >= 0 ? bang : (colon >= 0 ? colon : j);
          let src2 = s.slice(st, exprEnd); let selfDoc = false; if (/=\s*$/.test(src2) && !/[=!<>]=\s*$/.test(src2)) { selfDoc = src2; src2 = src2.replace(/=\s*$/, ''); }
          const spec = colon >= 0 ? s.slice(colon + 1, j) : ''; const conv = bang >= 0 ? s[bang + 1] : '';
          if (buf) { parts.push(buf); buf = ''; }
          let sub; try { const toks = parse.__sub(src2.trim(), t.line); sub = toks; } catch (e) { if (e instanceof PyError) { e.pyLine = t.line; } throw e; }
          if (selfDoc) parts.push(selfDoc);
          parts.push({ e: sub, spec: spec, conv: conv }); i = j + 1; continue;
        }
        buf += s[i]; i++;
      }
      if (buf) parts.push(buf);
      return { k: 'fstr', line: t.line, parts: parts };
    }
    parse.__sub = function (src2, line) { const saveT = T.slice(), saveP = p; const toks = tokenize(src2); toks.forEach(x => x.line = line); T.length = 0; toks.forEach(x => T.push(x)); p = 0; let e; try { e = exprList(); if (pk().t !== 'nl' && pk().t !== 'eof') throw synt('Noe er galt inni { } i f-teksten.'); } finally { T.length = 0; saveT.forEach(x => T.push(x)); p = saveP; } return e; };
    return program();
  }

  /* ---------- verdier ---------- */
  class PyDict { constructor() { this.m = new Map(); } }
  const keyOf = k => (typeof k === 'bigint' ? 'i' + k : typeof k === 'number' && Number.isInteger(k) ? 'i' + BigInt(k) : typeof k === 'string' ? 's' + k : typeof k === 'boolean' ? 'i' + (k ? 1 : 0) : Array.isArray(k) ? 't' + k.map(keyOf).join(',') : k === null ? 'n' : 'f' + k);
  const dget = (d, k) => d.m.get(keyOf(k)); const dset = (d, k, v) => d.m.set(keyOf(k), [k, v]);
  const mkTuple = a => { a.__t = true; return a; };
  class PyRange { constructor(a, b, c) { this.a = a; this.b = b; this.c = c; } len() { const { a, b, c } = this; if (c > 0n) return b > a ? Number((b - a + c - 1n) / c) : 0; return a > b ? Number((a - b - c - 1n) / (-c)) : 0; } at(i) { return this.a + BigInt(i) * this.c; } }
  class PyFunc { constructor(n, ps, body, env, lam) { this.n = n; this.ps = ps; this.body = body; this.env = env; this.lam = lam; } }
  class Builtin { constructor(n, fn) { this.n = n; this.fn = fn; } }
  class PyModule { constructor(n, a) { this.n = n; this.a = a; } }
  class PyType { constructor(n) { this.n = n; } }

  const isInt = v => typeof v === 'bigint';
  const isNum = v => typeof v === 'bigint' || typeof v === 'number' || typeof v === 'boolean';
  const toF = v => (typeof v === 'bigint' ? Number(v) : typeof v === 'boolean' ? (v ? 1 : 0) : v);
  const toI = v => (typeof v === 'boolean' ? (v ? 1n : 0n) : v);
  function tname(v) {
    if (v === null) return 'NoneType'; if (typeof v === 'boolean') return 'bool'; if (typeof v === 'bigint') return 'int'; if (typeof v === 'number') return 'float'; if (typeof v === 'string') return 'str';
    if (Array.isArray(v)) return v.__t ? 'tuple' : 'list'; if (v instanceof PyDict) return 'dict'; if (v instanceof PyRange) return 'range'; if (v instanceof PyFunc || v instanceof Builtin) return 'function'; if (v instanceof PyModule) return 'module'; return 'object';
  }
  function fnum(v) {
    if (Number.isNaN(v)) return 'nan'; if (v === Infinity) return 'inf'; if (v === -Infinity) return '-inf';
    if (Number.isInteger(v) && Math.abs(v) < 1e16) return (Object.is(v, -0) ? '-0' : String(v)) + '.0';
    let s = String(v); if (/e/.test(s)) { s = s.replace(/e([+-])(\d)$/, 'e$10$2'); if (!/\./.test(s.split('e')[0]) && Math.abs(v) >= 1e16) { /* 1e+16 */ } } return s;
  }
  function repr(v, depth) {
    depth = depth || 0; if (depth > 8) return '...';
    if (typeof v === 'string') { const q = v.indexOf("'") >= 0 && v.indexOf('"') < 0 ? '"' : "'"; return q + v.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(q === "'" ? /'/g : /"/g, '\\' + q) + q; }
    if (Array.isArray(v)) { const inner = v.map(x => repr(x, depth + 1)); return v.__t ? '(' + inner.join(', ') + (v.length === 1 ? ',' : '') + ')' : '[' + inner.join(', ') + ']'; }
    if (v instanceof PyDict) return '{' + Array.from(v.m.values()).map(kv => repr(kv[0], depth + 1) + ': ' + repr(kv[1], depth + 1)).join(', ') + '}';
    return str(v);
  }
  function str(v) {
    if (v === null) return 'None'; if (v === true) return 'True'; if (v === false) return 'False'; if (typeof v === 'bigint') return v.toString(); if (typeof v === 'number') return fnum(v); if (typeof v === 'string') return v;
    if (Array.isArray(v) || v instanceof PyDict) return repr(v);
    if (v instanceof PyRange) return 'range(' + v.a + ', ' + v.b + (v.c !== 1n ? ', ' + v.c : '') + ')';
    if (v instanceof PyFunc) return '<function ' + v.n + '>'; if (v instanceof Builtin) return '<built-in function ' + v.n + '>'; if (v instanceof PyModule) return "<module '" + v.n + "'>"; if (v instanceof PyType) return "<class '" + v.n + "'>";
    return String(v);
  }
  function truthy(v) {
    if (v === null || v === false) return false; if (v === true) return true; if (typeof v === 'bigint') return v !== 0n; if (typeof v === 'number') return v !== 0; if (typeof v === 'string') return v.length > 0;
    if (Array.isArray(v)) return v.length > 0; if (v instanceof PyDict) return v.m.size > 0; if (v instanceof PyRange) return v.len() > 0; return true;
  }
  function eq(a, b) {
    if (isNum(a) && isNum(b)) return typeof a === 'bigint' && typeof b === 'bigint' ? a === b : toF(a) === toF(b) && (typeof a !== 'bigint' || typeof b !== 'bigint');
    if (typeof a === 'string' || typeof b === 'string') return a === b; if (a === null || b === null) return a === b;
    if (Array.isArray(a) && Array.isArray(b)) { if (a.length !== b.length || !!a.__t !== !!b.__t) return false; for (let i = 0; i < a.length; i++) if (!eq(a[i], b[i])) return false; return true; }
    if (a instanceof PyDict && b instanceof PyDict) { if (a.m.size !== b.m.size) return false; for (const [k, kv] of a.m) { const o = b.m.get(k); if (!o || !eq(kv[1], o[1])) return false; } return true; }
    return a === b;
  }
  function cmpv(a, b) {
    if (isNum(a) && isNum(b)) { if (typeof a === 'bigint' && typeof b === 'bigint') return a < b ? -1 : a > b ? 1 : 0; const x = toF(a), y = toF(b); return x < y ? -1 : x > y ? 1 : 0; }
    if (typeof a === 'string' && typeof b === 'string') return a < b ? -1 : a > b ? 1 : 0;
    if (Array.isArray(a) && Array.isArray(b)) { for (let i = 0; i < Math.min(a.length, b.length); i++) { const c = cmpv(a[i], b[i]); if (c) return c; } return a.length - b.length; }
    throw err('TypeError', 'Jeg kan ikke sammenligne ' + tname(a) + ' og ' + tname(b) + '. Er det tall mot tekst?');
  }
  function iter(v) {
    if (Array.isArray(v)) return v.slice(); if (typeof v === 'string') return Array.from(v);
    if (v instanceof PyRange) { const r = [], n = v.len(); for (let i = 0; i < n; i++) r.push(v.at(i)); return r; }
    if (v instanceof PyDict) return Array.from(v.m.values()).map(kv => kv[0]);
    throw err('TypeError', 'Du kan ikke gå gjennom en ' + tname(v) + ' med en løkke.');
  }
  function pyFloorDiv(a, b) {
    if (typeof a === 'bigint' && typeof b === 'bigint') { if (b === 0n) throw err('ZeroDivisionError', 'Du kan ikke dele på 0.'); let q = a / b; if ((a % b !== 0n) && ((a < 0n) !== (b < 0n))) q -= 1n; return q; }
    const x = toF(a), y = toF(b); if (y === 0) throw err('ZeroDivisionError', 'Du kan ikke dele på 0.'); return Math.floor(x / y);
  }
  function pyMod(a, b) {
    if (typeof a === 'bigint' && typeof b === 'bigint') { if (b === 0n) throw err('ZeroDivisionError', 'Du kan ikke ta rest av deling på 0.'); const r = a % b; return (r !== 0n && ((r < 0n) !== (b < 0n))) ? r + b : r; }
    const x = toF(a), y = toF(b); if (y === 0) throw err('ZeroDivisionError', 'Du kan ikke ta rest av deling på 0.'); const r = x % y; return (r !== 0 && ((r < 0) !== (y < 0))) ? r + y : r;
  }
  function binop(op, a, b) {
    if (isNum(a) && isNum(b)) {
      const bothInt = typeof a !== 'number' && typeof b !== 'number'; const x = toI(a), y = toI(b);
      switch (op) {
        case '+': return bothInt ? x + y : toF(a) + toF(b);
        case '-': return bothInt ? x - y : toF(a) - toF(b);
        case '*': return bothInt ? x * y : toF(a) * toF(b);
        case '/': if (toF(b) === 0) throw err('ZeroDivisionError', 'Du kan ikke dele på 0.'); return toF(a) / toF(b);
        case '//': return pyFloorDiv(x, y);
        case '%': return pyMod(x, y);
        case '**': if (bothInt) { if (y >= 0n) { if (y > 100000n) throw err('OverflowError', 'Tallet blir altfor stort.'); return x ** y; } if (x === 0n) throw err('ZeroDivisionError', 'Du kan ikke dele på 0.'); return Math.pow(Number(x), Number(y)); } if (toF(a) === 0 && toF(b) < 0) throw err('ZeroDivisionError', 'Du kan ikke dele på 0.'); return Math.pow(toF(a), toF(b));
      }
    }
    if (op === '+') {
      if (typeof a === 'string' && typeof b === 'string') return a + b;
      if (Array.isArray(a) && Array.isArray(b)) { const r = a.concat(b); if (a.__t) mkTuple(r); return r; }
      if (typeof a === 'string' || typeof b === 'string') throw err('TypeError', 'Du kan ikke legge sammen tekst og tall direkte. Bruk str(tall) for å gjøre tallet om til tekst, eller int(tekst) for å gjøre tekst om til tall.');
    }
    if (op === '*') {
      if (typeof a === 'string' && isInt(b)) return b > 0n ? a.repeat(Number(b)) : ''; if (typeof b === 'string' && isInt(a)) return a > 0n ? b.repeat(Number(a)) : '';
      if (Array.isArray(a) && isInt(b)) { let r = []; for (let i = 0n; i < b; i++) r = r.concat(a); if (a.__t) mkTuple(r); return r; }
      if (Array.isArray(b) && isInt(a)) return binop('*', b, a);
    }
    if (op === '%' && typeof a === 'string') return pctFormat(a, Array.isArray(b) ? b : [b]);
    throw err('TypeError', 'Jeg kan ikke regne «' + op + '» mellom ' + tname(a) + ' og ' + tname(b) + '.');
  }
  function pctFormat(f, args) { let i = 0; return f.replace(/%([sdif%])|%\.(\d+)f/g, (m, t, d) => { if (m === '%%') return '%'; const a = args[i++]; if (d !== undefined) return toF(a).toFixed(+d); if (t === 's') return str(a); if (t === 'f') return toF(a).toFixed(6); return String(toF(a) | 0); }); }

  /* ---------- formatering ---------- */
  function commas(s) { const m = /^(-?)(\d+)(.*)$/.exec(s); return m ? m[1] + m[2].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + m[3] : s; }
  function formatSpec(v, spec) {
    if (!spec) return str(v);
    const m = /^(?:(.)?([<>^=]))?([+\- ])?(0)?(\d+)?(,)?(?:\.(\d+))?([sdfeEgG%bxXo])?$/.exec(spec);
    if (!m) throw err('ValueError', 'Ugyldig formatering: «' + spec + '».');
    let [, fill, align, sign, zero, width, comma, prec, type] = m; let s;
    if (type === 'f' || type === 'F') { s = toF(v).toFixed(prec === undefined ? 6 : +prec); }
    else if (type === 'e') { s = toF(v).toExponential(prec === undefined ? 6 : +prec).replace(/e([+-])(\d)$/, 'e$10$2'); }
    else if (type === '%') { s = (toF(v) * 100).toFixed(prec === undefined ? 6 : +prec) + '%'; }
    else if (type === 'd') { if (!isNum(v) || typeof v === 'number') throw err('ValueError', 'Formatet «d» passer bare til heltall.'); s = String(toI(v)); }
    else if (type === 'x') s = toI(v).toString(16); else if (type === 'b') s = toI(v).toString(2);
    else if (type === 'g') s = String(+toF(v).toPrecision(prec === undefined ? 6 : (+prec || 1)));
    else if (type === 's' || (!type && typeof v === 'string')) { s = str(v); if (prec !== undefined) s = s.slice(0, +prec); }
    else if (isNum(v)) { s = typeof v === 'number' ? (prec !== undefined ? toF(v).toPrecision(+prec) : fnum(v)) : String(toI(v)); }
    else s = str(v);
    if (comma) s = commas(s);
    if (sign === '+' && isNum(v) && !/^-/.test(s)) s = '+' + s; else if (sign === ' ' && isNum(v) && !/^-/.test(s)) s = ' ' + s;
    if (width !== undefined) {
      const w = +width; const al = align || (zero ? '=' : (isNum(v) && type !== 's' ? '>' : '<')); const f = fill || (zero && !align ? '0' : ' ');
      if (s.length < w) {
        const pad = w - s.length;
        if (al === '<') s = s + f.repeat(pad); else if (al === '>') s = f.repeat(pad) + s; else if (al === '^') s = f.repeat(Math.floor(pad / 2)) + s + f.repeat(Math.ceil(pad / 2));
        else { const sg = /^[+\- ]/.test(s) ? s[0] : ''; s = sg + f.repeat(pad) + s.slice(sg.length); }
      }
    }
    return s;
  }
  function strFormat(f, args, kw) {
    let auto = 0;
    return f.replace(/\{\{|\}\}|\{([^{}:!]*)(?:!([rs]))?(?::([^{}]*))?\}/g, function (m, key, conv, spec) {
      if (m === '{{') return '{'; if (m === '}}') return '}';
      let v; if (key === '') v = args[auto++]; else if (/^\d+$/.test(key)) v = args[+key]; else if (kw && key in kw) v = kw[key]; else throw err('KeyError', 'Fant ikke «' + key + '» i format().');
      if (v === undefined) throw err('IndexError', 'Det er for få verdier i format().');
      if (conv === 'r') v = repr(v);
      return formatSpec(v, spec || '');
    });
  }

  /* ---------- interpreter ---------- */
  class Env { constructor(parent) { this.v = new Map(); this.parent = parent; this.glob = null; } get(n) { let e = this; while (e) { if (e.v.has(n)) return e.v.get(n); e = e.parent; } return undefined; } has(n) { let e = this; while (e) { if (e.v.has(n)) return true; e = e.parent; } return false; } rootEnv() { let e = this; while (e.parent) e = e.parent; return e; } set(n, val) { if (this.glob && this.glob.has(n)) this.rootEnv().v.set(n, val); else this.v.set(n, val); } }
  const BREAK = { b: 1 }, CONTINUE = { c: 1 };

  function run(code, opts) {
    opts = opts || {};
    const out = []; let outLen = 0; const maxSteps = opts.maxSteps || 1500000; let steps = 0;
    const inputs = (opts.inputs || []).slice(); let curLine = 0;
    const rnd = (function () { let a = (Date.now() ^ 0x9e3779b9) >>> 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; })();
    let rndFn = rnd;
    function emit(s) { outLen += s.length; if (outLen > 200000) throw err('OutputError', 'Programmet skriver ut for mye tekst.'); out.push(s); }
    const tick = () => { if (++steps > maxSteps) throw err('TimeoutError', 'Programmet kjører for lenge. Har du en løkke som aldri stopper? (while uten break?)'); };

    /* innebygde funksjoner */
    const B = new Map();
    const def = (n, fn) => B.set(n, new Builtin(n, fn));
    def('print', (a, kw) => { const sep = kw && kw.sep !== undefined ? str(kw.sep) : ' ', end = kw && kw.end !== undefined ? str(kw.end) : '\n'; emit(a.map(str).join(sep) + end); return null; });
    def('len', a => { const v = a[0]; if (typeof v === 'string' || Array.isArray(v)) return BigInt(v.length); if (v instanceof PyDict) return BigInt(v.m.size); if (v instanceof PyRange) return BigInt(v.len()); throw err('TypeError', 'len() virker ikke på ' + tname(v) + '.'); });
    def('range', a => { const n = a.map(x => { if (!isInt(x) && typeof x !== 'boolean') throw err('TypeError', 'range() trenger heltall, ikke ' + tname(x) + '.'); return toI(x); }); if (n.length === 1) return new PyRange(0n, n[0], 1n); if (n.length === 2) return new PyRange(n[0], n[1], 1n); if (n[2] === 0n) throw err('ValueError', 'Steget i range() kan ikke være 0.'); return new PyRange(n[0], n[1], n[2]); });
    def('int', a => {
      const v = a[0]; if (v === undefined) return 0n; if (typeof v === 'bigint') return v; if (typeof v === 'boolean') return v ? 1n : 0n;
      if (typeof v === 'number') { if (!isFinite(v)) throw err('ValueError', 'Kan ikke gjøre uendelig om til heltall.'); return BigInt(Math.trunc(v)); }
      if (typeof v === 'string') { const t = v.trim().replace(/_/g, ''); if (/^[+-]?\d+$/.test(t)) return BigInt(t); throw err('ValueError', 'Kan ikke gjøre «' + v + '» om til et heltall. Teksten må bare inneholde tall (ingen komma, punktum eller bokstaver).'); }
      throw err('TypeError', 'int() virker ikke på ' + tname(v) + '.');
    });
    def('float', a => { const v = a[0]; if (v === undefined) return 0; if (isNum(v)) return toF(v); if (typeof v === 'string') { const t = v.trim().replace(',', '.'); if (/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(t)) return parseFloat(t); if (/^[+-]?inf(inity)?$/i.test(t)) return t[0] === '-' ? -Infinity : Infinity; throw err('ValueError', 'Kan ikke gjøre «' + v + '» om til et desimaltall.'); } throw err('TypeError', 'float() virker ikke på ' + tname(v) + '.'); });
    def('str', a => (a.length ? str(a[0]) : ''));
    def('bool', a => truthy(a[0]));
    def('list', a => (a.length ? iter(a[0]) : [])); def('tuple', a => mkTuple(a.length ? iter(a[0]) : []));
    def('dict', (a, kw) => { const d = new PyDict(); if (a[0] instanceof PyDict) a[0].m.forEach(kv => dset(d, kv[0], kv[1])); else if (a[0]) iter(a[0]).forEach(p2 => dset(d, p2[0], p2[1])); if (kw) Object.keys(kw).forEach(k => dset(d, k, kw[k])); return d; });
    def('abs', a => (typeof a[0] === 'bigint' ? (a[0] < 0n ? -a[0] : a[0]) : Math.abs(toF(a[0]))));
    def('round', a => {
      const v = a[0], nd = a.length > 1 && a[1] !== null ? Number(a[1]) : null;
      const rh = x => { const f = Math.floor(x), d = x - f; if (d < 0.5) return f; if (d > 0.5) return f + 1; return f % 2 === 0 ? f : f + 1; };
      if (typeof v === 'bigint') return nd === null || nd >= 0 ? v : BigInt(rh(Number(v) / Math.pow(10, -nd)) * Math.pow(10, -nd));
      const x = toF(v); if (nd === null) return BigInt(rh(x));
      if (nd < 0) { const k = Math.pow(10, -nd); return rh(x / k) * k; }
      const ex = x.toFixed(Math.min(100, nd + 30)); const tail = ex.slice(ex.indexOf('.') + 1 + nd);
      if (/^50*$/.test(tail)) { const down = Number(ex.slice(0, ex.indexOf('.') + 1 + nd)); const lastDigit = +ex.replace('-', '').replace('.', '')[ex.replace('-', '').replace('.', '').length - tail.length - 1]; return lastDigit % 2 === 0 ? down : Number(x.toFixed(nd)); }
      return Number(x.toFixed(nd));
    });
    const seq = a => (a.length === 1 ? iter(a[0]) : a);
    def('min', (a, kw) => { const s = seq(a); if (!s.length) throw err('ValueError', 'min() fikk ingen verdier.'); const key = kw && kw.key ? x => call(kw.key, [x]) : x => x; return s.reduce((m, x) => (cmpv(key(x), key(m)) < 0 ? x : m)); });
    def('max', (a, kw) => { const s = seq(a); if (!s.length) throw err('ValueError', 'max() fikk ingen verdier.'); const key = kw && kw.key ? x => call(kw.key, [x]) : x => x; return s.reduce((m, x) => (cmpv(key(x), key(m)) > 0 ? x : m)); });
    def('sum', a => { let t = a.length > 1 ? a[1] : 0n; iter(a[0]).forEach(x => { t = binop('+', t, x); }); return t; });
    def('sorted', (a, kw) => sortList(iter(a[0]), kw));
    def('reversed', a => iter(a[0]).reverse());
    def('enumerate', (a) => iter(a[0]).map((x, i) => mkTuple([BigInt(i + (a[1] ? Number(a[1]) : 0)), x])));
    def('zip', a => { const ls = a.map(iter); const n = ls.length ? Math.min.apply(null, ls.map(l => l.length)) : 0; const r = []; for (let i = 0; i < n; i++) r.push(mkTuple(ls.map(l => l[i]))); return r; });
    def('map', a => iter(a[1]).map(x => call(a[0], [x]))); def('filter', a => iter(a[1]).filter(x => truthy(a[0] === null ? x : call(a[0], [x]))));
    def('any', a => iter(a[0]).some(truthy)); def('all', a => iter(a[0]).every(truthy));
    def('input', a => { if (a.length) emit(str(a[0])); if (inputs.length) { const v = inputs.shift(); emit(v + '\n'); return v; } if (opts.input) { const v = opts.input(a.length ? str(a[0]) : ''); if (v === null || v === undefined) throw err('EOFError', 'Programmet ba om input(), men det kom ingen svar. Skriv svarene i feltet «Svar til input()» under koden (ett svar per linje).'); emit(v + '\n'); return String(v); } throw err('EOFError', 'Programmet ba om input(), men det kom ingen svar. Skriv svarene i feltet «Svar til input()» under koden (ett svar per linje).'); });
    def('chr', a => String.fromCodePoint(Number(a[0]))); def('ord', a => BigInt(a[0].codePointAt(0)));
    def('pow', a => binop('**', a[0], a[1]));
    def('divmod', a => mkTuple([pyFloorDiv(a[0], a[1]), pyMod(a[0], a[1])]));
    def('type', a => new PyType(tname(a[0])));
    def('isinstance', a => { const t = a[1]; const names = Array.isArray(t) ? t.map(x => x.n) : [t.n]; const tn = tname(a[0]); return names.indexOf(tn) >= 0 || (tn === 'bool' && names.indexOf('int') >= 0); });
    ['int', 'float', 'str', 'bool', 'list', 'tuple', 'dict'].forEach(n => { /* typer kan brukes i isinstance */ });
    def('repr', a => repr(a[0]));
    def('format', a => formatSpec(a[0], a[1] || ''));

    function sortList(l, kw) {
      const key = kw && kw.key ? kw.key : null; const rev = kw && truthy(kw.reverse);
      const dec = l.map((x, i) => ({ k: key ? call(key, [x]) : x, x: x, i: i }));
      dec.sort((p1, p2) => { const c = cmpv(p1.k, p2.k); return (rev ? -c : c) || (p1.i - p2.i); });
      let r = dec.map(d => d.x); if (rev) { /* stabilt for like verdier */ } return r;
    }

    /* moduler */
    const fn1 = (n, f) => new Builtin(n, a => { const x = toF(a[0]); if (a[0] === undefined) throw err('TypeError', n + '() trenger et tall.'); return f(x); });
    const mathMod = new PyModule('math', {
      pi: Math.PI, e: Math.E, tau: 2 * Math.PI, inf: Infinity,
      sqrt: new Builtin('sqrt', a => { const x = toF(a[0]); if (x < 0) throw err('ValueError', 'Kvadratroten av et negativt tall finnes ikke (math domain error).'); return Math.sqrt(x); }),
      sin: fn1('sin', Math.sin), cos: fn1('cos', Math.cos), tan: fn1('tan', Math.tan), asin: fn1('asin', Math.asin), acos: fn1('acos', Math.acos), atan: fn1('atan', Math.atan), exp: fn1('exp', Math.exp), fabs: fn1('fabs', Math.abs),
      floor: new Builtin('floor', a => BigInt(Math.floor(toF(a[0])))), ceil: new Builtin('ceil', a => BigInt(Math.ceil(toF(a[0])))), trunc: new Builtin('trunc', a => BigInt(Math.trunc(toF(a[0])))),
      log: new Builtin('log', a => { const x = toF(a[0]); if (x <= 0) throw err('ValueError', 'Logaritmen finnes bare for positive tall (math domain error).'); return a.length > 1 ? Math.log(x) / Math.log(toF(a[1])) : Math.log(x); }),
      log10: new Builtin('log10', a => { const x = toF(a[0]); if (x <= 0) throw err('ValueError', 'Logaritmen finnes bare for positive tall (math domain error).'); return Math.log10(x); }), log2: fn1('log2', Math.log2),
      radians: fn1('radians', x => x * Math.PI / 180), degrees: fn1('degrees', x => x * 180 / Math.PI), pow: new Builtin('pow', a => Math.pow(toF(a[0]), toF(a[1]))), hypot: new Builtin('hypot', a => Math.hypot.apply(null, a.map(toF))),
      factorial: new Builtin('factorial', a => { let r = 1n; for (let i = 2n; i <= toI(a[0]); i++) r *= i; return r; }), gcd: new Builtin('gcd', a => { let x = toI(a[0]), y = toI(a[1]); x = x < 0n ? -x : x; y = y < 0n ? -y : y; while (y) { [x, y] = [y, x % y]; } return x; }),
      isqrt: new Builtin('isqrt', a => BigInt(Math.floor(Math.sqrt(toF(a[0]))))), isclose: new Builtin('isclose', a => Math.abs(toF(a[0]) - toF(a[1])) <= 1e-9 * Math.max(Math.abs(toF(a[0])), Math.abs(toF(a[1]))))
    });
    const randMod = new PyModule('random', {
      random: new Builtin('random', () => rndFn()),
      randint: new Builtin('randint', a => { const lo = Number(a[0]), hi = Number(a[1]); return BigInt(lo + Math.floor(rndFn() * (hi - lo + 1))); }),
      randrange: new Builtin('randrange', a => { const lo = a.length > 1 ? Number(a[0]) : 0, hi = a.length > 1 ? Number(a[1]) : Number(a[0]); return BigInt(lo + Math.floor(rndFn() * (hi - lo))); }),
      uniform: new Builtin('uniform', a => toF(a[0]) + rndFn() * (toF(a[1]) - toF(a[0]))),
      choice: new Builtin('choice', a => { const l = iter(a[0]); if (!l.length) throw err('IndexError', 'Kan ikke velge fra en tom liste.'); return l[Math.floor(rndFn() * l.length)]; }),
      shuffle: new Builtin('shuffle', a => { const l = a[0]; for (let i = l.length - 1; i > 0; i--) { const j = Math.floor(rndFn() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; } return null; }),
      seed: new Builtin('seed', a => { let s = Number(a[0]) || 0; rndFn = function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; return null; }),
      sample: new Builtin('sample', a => { const l = iter(a[0]).slice(); const k = Number(a[1]); for (let i = l.length - 1; i > 0; i--) { const j = Math.floor(rndFn() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; } return l.slice(0, k); })
    });
    const statMod = new PyModule('statistics', {
      mean: new Builtin('mean', a => { const l = iter(a[0]); if (!l.length) throw err('ValueError', 'mean() trenger minst ett tall.'); return l.reduce((s, x) => s + toF(x), 0) / l.length; }),
      median: new Builtin('median', a => { const l = iter(a[0]).map(toF).sort((x, y) => x - y); if (!l.length) throw err('ValueError', 'median() trenger minst ett tall.'); const n = l.length; return n % 2 ? l[(n - 1) / 2] : (l[n / 2 - 1] + l[n / 2]) / 2; }),
      mode: new Builtin('mode', a => { const l = iter(a[0]); const c = new Map(); let best = null, bc = 0; l.forEach(x => { const k = keyOf(x); const n = (c.get(k) || 0) + 1; c.set(k, n); if (n > bc) { bc = n; best = x; } }); return best; }),
      pstdev: new Builtin('pstdev', a => { const l = iter(a[0]).map(toF); const m = l.reduce((s, x) => s + x, 0) / l.length; return Math.sqrt(l.reduce((s, x) => s + (x - m) * (x - m), 0) / l.length); }),
      stdev: new Builtin('stdev', a => { const l = iter(a[0]).map(toF); const m = l.reduce((s, x) => s + x, 0) / l.length; return Math.sqrt(l.reduce((s, x) => s + (x - m) * (x - m), 0) / (l.length - 1)); })
    });
    const MODS = { math: mathMod, random: randMod, statistics: statMod };
    if (opts.extraModules) Object.keys(opts.extraModules).forEach(k => { MODS[k] = new PyModule(k, opts.extraModules[k]); });

    /* kall */
    let depth = 0;
    function call(f, args, kw, line) {
      if (f instanceof Builtin) { try { return f.fn(args, kw); } catch (e) { if (e instanceof PyError && !e.pyLine) e.pyLine = line || curLine; throw e; } }
      if (f instanceof PyType) { const b = B.get(f.n); if (b) return b.fn(args, kw); }
      if (f instanceof PyFunc) {
        tick(); if (++depth > 400) { depth = 0; throw err('RecursionError', 'Funksjonen kaller seg selv for mange ganger (uendelig rekursjon?).'); }
        const env = new Env(f.env); const ps = f.ps; kw = kw || {};
        if (args.length > ps.length) throw err('TypeError', f.n + '() tar ' + ps.length + ' verdier, men du ga ' + args.length + '.');
        ps.forEach(function (p2, i) {
          if (i < args.length) env.v.set(p2.n, args[i]); else if (p2.n in kw) env.v.set(p2.n, kw[p2.n]); else if (p2.dv !== undefined) env.v.set(p2.n, p2.dv); else throw err('TypeError', f.n + '() mangler en verdi for «' + p2.n + '».');
        });
        try {
          if (f.lam) return evalE(f.body, env);
          const r = execBlock(f.body, env); return r && r.ret !== undefined ? r.ret : null;
        } finally { depth--; }
      }
      throw err('TypeError', 'Dette er ikke en funksjon som kan kalles: ' + str(f) + '.');
    }

    /* metoder */
    function method(o, n, line) {
      const bm = (fn) => new Builtin(n, fn);
      if (typeof o === 'string') {
        switch (n) {
          case 'upper': return bm(() => o.toUpperCase()); case 'lower': return bm(() => o.toLowerCase());
          case 'strip': return bm(a => (a.length ? o.replace(new RegExp('^[' + a[0].replace(/[\]\\^-]/g, '\\$&') + ']+|[' + a[0].replace(/[\]\\^-]/g, '\\$&') + ']+$', 'g'), '') : o.trim()));
          case 'lstrip': return bm(() => o.trimStart()); case 'rstrip': return bm(() => o.trimEnd());
          case 'split': return bm(a => (a.length && a[0] !== null ? o.split(a[0]) : o.trim().split(/\s+/).filter(x => x.length)));
          case 'join': return bm(a => iter(a[0]).map(x => { if (typeof x !== 'string') throw err('TypeError', 'join() trenger tekster. Bruk str() på tallene først.'); return x; }).join(o));
          case 'replace': return bm(a => o.split(a[0]).join(a[1]));
          case 'startswith': return bm(a => o.startsWith(a[0])); case 'endswith': return bm(a => o.endsWith(a[0]));
          case 'find': return bm(a => BigInt(o.indexOf(a[0]))); case 'index': return bm(a => { const i = o.indexOf(a[0]); if (i < 0) throw err('ValueError', 'Fant ikke «' + a[0] + '» i teksten.'); return BigInt(i); });
          case 'count': return bm(a => BigInt(a[0] === '' ? o.length + 1 : o.split(a[0]).length - 1));
          case 'title': return bm(() => o.replace(/\b\w/g, c => c.toUpperCase()).replace(/(\w)(\w*)/g, (m, a, b) => a + b.toLowerCase())); case 'capitalize': return bm(() => o.charAt(0).toUpperCase() + o.slice(1).toLowerCase());
          case 'isdigit': return bm(() => /^\d+$/.test(o)); case 'isalpha': return bm(() => /^[A-Za-zÆØÅæøå]+$/.test(o)); case 'isupper': return bm(() => o === o.toUpperCase() && o !== o.toLowerCase()); case 'islower': return bm(() => o === o.toLowerCase() && o !== o.toUpperCase());
          case 'format': return bm((a, kw) => strFormat(o, a, kw));
          case 'zfill': return bm(a => o.padStart(Number(a[0]), '0')); case 'center': return bm(a => { const w = Number(a[0]); const pad = Math.max(0, w - o.length); return ' '.repeat(Math.floor(pad / 2)) + o + ' '.repeat(Math.ceil(pad / 2)); });
        }
      } else if (Array.isArray(o) && !o.__t) {
        switch (n) {
          case 'append': return bm(a => { o.push(a[0]); return null; }); case 'extend': return bm(a => { iter(a[0]).forEach(x => o.push(x)); return null; });
          case 'insert': return bm(a => { let i = Number(a[0]); if (i < 0) i = Math.max(0, o.length + i); o.splice(i, 0, a[1]); return null; });
          case 'pop': return bm(a => { if (!o.length) throw err('IndexError', 'Du kan ikke ta ut noe fra en tom liste.'); let i = a.length ? Number(a[0]) : o.length - 1; if (i < 0) i += o.length; if (i < 0 || i >= o.length) throw err('IndexError', 'Plassen finnes ikke i listen.'); return o.splice(i, 1)[0]; });
          case 'remove': return bm(a => { const i = o.findIndex(x => eq(x, a[0])); if (i < 0) throw err('ValueError', 'Fant ikke verdien i listen.'); o.splice(i, 1); return null; });
          case 'index': return bm(a => { const i = o.findIndex(x => eq(x, a[0])); if (i < 0) throw err('ValueError', 'Fant ikke verdien i listen.'); return BigInt(i); });
          case 'count': return bm(a => BigInt(o.filter(x => eq(x, a[0])).length));
          case 'sort': return bm((a, kw) => { const r = sortList(o, kw); r.forEach((x, i) => { o[i] = x; }); return null; });
          case 'reverse': return bm(() => { o.reverse(); return null; }); case 'copy': return bm(() => o.slice()); case 'clear': return bm(() => { o.length = 0; return null; });
        }
      } else if (Array.isArray(o) && o.__t) {
        if (n === 'count') return bm(a => BigInt(o.filter(x => eq(x, a[0])).length)); if (n === 'index') return bm(a => { const i = o.findIndex(x => eq(x, a[0])); if (i < 0) throw err('ValueError', 'Fant ikke verdien.'); return BigInt(i); });
      } else if (o instanceof PyDict) {
        switch (n) {
          case 'get': return bm(a => { const r = dget(o, a[0]); return r ? r[1] : (a.length > 1 ? a[1] : null); });
          case 'keys': return bm(() => Array.from(o.m.values()).map(kv => kv[0])); case 'values': return bm(() => Array.from(o.m.values()).map(kv => kv[1]));
          case 'items': return bm(() => Array.from(o.m.values()).map(kv => mkTuple([kv[0], kv[1]])));
          case 'pop': return bm(a => { const r = dget(o, a[0]); if (!r) { if (a.length > 1) return a[1]; throw err('KeyError', 'Nøkkelen ' + repr(a[0]) + ' finnes ikke.'); } o.m.delete(keyOf(a[0])); return r[1]; });
          case 'update': return bm(a => { a[0].m.forEach(kv => dset(o, kv[0], kv[1])); return null; });
          case 'setdefault': return bm(a => { const r = dget(o, a[0]); if (r) return r[1]; dset(o, a[0], a.length > 1 ? a[1] : null); return a.length > 1 ? a[1] : null; });
          case 'clear': return bm(() => { o.m.clear(); return null; }); case 'copy': return bm(() => { const d = new PyDict(); o.m.forEach(kv => dset(d, kv[0], kv[1])); return d; });
        }
      } else if (o instanceof PyModule) {
        if (n in o.a) return o.a[n]; throw err('AttributeError', 'Modulen «' + o.n + '» har ikke «' + n + '».');
      }
      throw err('AttributeError', 'Typen ' + tname(o) + ' har ingen funksjon som heter «' + n + '».');
    }

    /* uttrykk */
    function idx(o, i, line) {
      if (i && i.k === 'slice') { /* håndteres av kalleren */ }
      if (typeof o === 'string' || Array.isArray(o)) {
        if (!isInt(i) && typeof i !== 'boolean') throw err('TypeError', 'Plassen i en liste eller tekst må være et heltall, ikke ' + tname(i) + '.');
        let k = Number(toI(i)); if (k < 0) k += o.length; if (k < 0 || k >= o.length) throw err('IndexError', 'Plassen finnes ikke. Listen/teksten har ' + o.length + ' elementer, og første plass er 0.'); return o[k];
      }
      if (o instanceof PyRange) { let k = Number(i); const n = o.len(); if (k < 0) k += n; if (k < 0 || k >= n) throw err('IndexError', 'Plassen finnes ikke.'); return o.at(k); }
      if (o instanceof PyDict) { const r = dget(o, i); if (!r) throw err('KeyError', 'Nøkkelen ' + repr(i) + ' finnes ikke i ordboken.'); return r[1]; }
      throw err('TypeError', 'Du kan ikke bruke [ ] på ' + tname(o) + '.');
    }
    function sliceOf(o, s) {
      const L = o.length, st = s.st === null ? 1 : Number(s.st); if (st === 0) throw err('ValueError', 'Steget kan ikke være 0.');
      const fix = (v, d) => { if (v === null) return d; let x = Number(v); if (x < 0) x += L; return x; };
      let lo, hi; if (st > 0) { lo = Math.max(0, Math.min(L, fix(s.lo, 0))); hi = Math.max(0, Math.min(L, fix(s.hi, L))); } else { lo = Math.max(-1, Math.min(L - 1, fix(s.lo, L - 1))); hi = Math.max(-1, Math.min(L - 1, s.hi === null ? -1 : fix(s.hi, -1))); }
      const r = []; if (st > 0) for (let i = lo; i < hi; i += st) r.push(o[i]); else for (let i = lo; i > hi; i += st) r.push(o[i]);
      return typeof o === 'string' ? r.join('') : (o.__t ? mkTuple(r) : r);
    }
    function lookup(n, env, line) {
      if (env.has(n)) return env.get(n); if (B.has(n)) return B.get(n);
      if (['int', 'float', 'str', 'bool', 'list', 'tuple', 'dict'].indexOf(n) >= 0) return B.get(n);
      throw err('NameError', 'Navnet «' + n + '» er ikke definert. Har du skrevet det riktig, og laget variabelen før du bruker den?');
    }
    function evalE(e, env) {
      switch (e.k) {
        case 'num': return e.v; case 'str': return e.v; case 'const': return e.v; case 'paren': return evalE(e.e, env);
        case 'name': curLine = e.line || curLine; return lookup(e.n, env, e.line);
        case 'fstr': { let s = ''; e.parts.forEach(p2 => { if (typeof p2 === 'string') s += p2; else { let v = evalE(p2.e, env); if (p2.conv === 'r') v = repr(v); s += formatSpec(v, p2.spec); } }); return s; }
        case 'list': return e.items.map(x => evalE(x, env)); case 'tuple': return mkTuple(e.items.map(x => evalE(x, env)));
        case 'dict': { const d = new PyDict(); e.keys.forEach((k, i) => dset(d, evalE(k, env), evalE(e.vals[i], env))); return d; }
        case 'listcomp': return comp(e.c, env); case 'gen': return comp(e.c, env);
        case 'bin': curLine = e.line; return binop(e.op, evalE(e.a, env), evalE(e.b, env));
        case 'neg': { const v = evalE(e.e, env); if (!isNum(v)) throw err('TypeError', 'Du kan ikke bruke minus på ' + tname(v) + '.'); return e.op === '-' ? (typeof v === 'bigint' ? -v : typeof v === 'boolean' ? (v ? -1n : 0n) : -v) : v; }
        case 'not': return !truthy(evalE(e.e, env));
        case 'and': { const a = evalE(e.a, env); return truthy(a) ? evalE(e.b, env) : a; } case 'or': { const a = evalE(e.a, env); return truthy(a) ? a : evalE(e.b, env); }
        case 'cond': return truthy(evalE(e.c, env)) ? evalE(e.a, env) : evalE(e.b, env);
        case 'cmp': {
          curLine = e.line; let l = evalE(e.a, env);
          for (let i = 0; i < e.ops.length; i++) {
            const r = evalE(e.rest[i], env); const op = e.ops[i]; let ok;
            switch (op) {
              case '==': ok = eq(l, r); break; case '!=': ok = !eq(l, r); break;
              case '<': ok = cmpv(l, r) < 0; break; case '>': ok = cmpv(l, r) > 0; break; case '<=': ok = cmpv(l, r) <= 0; break; case '>=': ok = cmpv(l, r) >= 0; break;
              case 'in': case 'not in': { let f; if (typeof r === 'string') { if (typeof l !== 'string') throw err('TypeError', 'Du kan bare lete etter tekst i en tekst.'); f = r.indexOf(l) >= 0; } else if (r instanceof PyDict) f = !!dget(r, l); else f = iter(r).some(x => eq(x, l)); ok = op === 'in' ? f : !f; break; }
              case 'is': ok = l === r || (l === null && r === null); break; case 'is not': ok = !(l === r); break;
            }
            if (!ok) return false; l = r;
          }
          return true;
        }
        case 'index': {
          curLine = e.line; const o = evalE(e.o, env);
          if (e.i && e.i.k === 'slice') { if (!(typeof o === 'string' || Array.isArray(o))) throw err('TypeError', 'Du kan ikke dele opp ' + tname(o) + ' med [ : ].'); return sliceOf(o, { lo: e.i.lo ? evalE(e.i.lo, env) : null, hi: e.i.hi ? evalE(e.i.hi, env) : null, st: e.i.st ? evalE(e.i.st, env) : null }); }
          return idx(o, evalE(e.i, env), e.line);
        }
        case 'attr': { curLine = e.line; const o = evalE(e.o, env); return method(o, e.n, e.line); }
        case 'lambda': { const f = new PyFunc('<lambda>', e.ps.map(x => ({ n: x.n })), e.e, env, true); return f; }
        case 'call': {
          curLine = e.line; tick(); const f = evalE(e.f, env); const args = e.args.map(a => evalE(a, env)); let kw = null;
          if (e.kw.length) { kw = {}; e.kw.forEach(k => { kw[k[0]] = evalE(k[1], env); }); }
          return call(f, args, kw, e.line);
        }
        case 'comp': return comp(e, env);
      }
      throw err('SyntaxError', 'Ukjent uttrykk.');
    }
    function comp(c, env) {
      const res = [];
      (function rec(cc, en) {
        iter(evalE(cc.it, en)).forEach(function (v) {
          tick(); const e2 = new Env(en); assign(cc.tg, v, e2);
          for (let i = 0; i < cc.conds.length; i++) if (!truthy(evalE(cc.conds[i], e2))) return;
          if (cc.inner) rec(cc.inner, e2); else res.push(evalE(cc.e, e2));
        });
      })(c, env);
      return res;
    }
    function assign(tg, v, env) {
      if (tg.k === 'name') { env.set(tg.n, v); return; }
      if (tg.k === 'tuple' || tg.k === 'list') { const vs = iter(v); if (vs.length !== tg.items.length) throw err('ValueError', 'Du pakker ut ' + vs.length + ' verdier til ' + tg.items.length + ' variabler. Tallene må være like mange.'); tg.items.forEach((t, i) => assign(t, vs[i], env)); return; }
      if (tg.k === 'index') {
        const o = evalE(tg.o, env); const i = evalE(tg.i, env);
        if (Array.isArray(o) && !o.__t) { if (!isInt(i)) throw err('TypeError', 'Plassen må være et heltall.'); let k = Number(i); if (k < 0) k += o.length; if (k < 0 || k >= o.length) throw err('IndexError', 'Plassen finnes ikke i listen.'); o[k] = v; return; }
        if (o instanceof PyDict) { dset(o, i, v); return; }
        if (typeof o === 'string') throw err('TypeError', 'Tekst kan ikke endres på en plass. Lag en ny tekst i stedet.'); throw err('TypeError', 'Du kan ikke endre en plass i ' + tname(o) + '.');
      }
      throw err('SyntaxError', 'Dette kan ikke få en verdi.');
    }

    /* setninger */
    function execBlock(b, env) { for (let i = 0; i < b.length; i++) { const r = exec(b[i], env); if (r !== undefined) return r; } return undefined; }
    function exec(s, env) {
      tick(); curLine = s.line || curLine;
      switch (s.k) {
        case 'expr': evalE(s.e, env); return;
        case 'pass': return;
        case 'assign': { const v = evalE(s.e, env); s.tgs.forEach(t => assign(t, v, env)); return; }
        case 'aug': { const cur = evalE(s.tg, env); const r = evalE(s.e, env); const nv = (Array.isArray(cur) && !cur.__t && s.op === '+' ) ? (iter(r).forEach(x => cur.push(x)), cur) : binop(s.op, cur, r); assign(s.tg, nv, env); return; }
        case 'if': { for (const arm of s.arms) if (truthy(evalE(arm[0], env))) return execBlock(arm[1], env); if (s.els) return execBlock(s.els, env); return; }
        case 'while': { while (truthy(evalE(s.c, env))) { tick(); const r = execBlock(s.body, env); if (r === BREAK) break; if (r === CONTINUE) continue; if (r !== undefined) return r; } return; }
        case 'for': { const items = iter(evalE(s.it, env)); for (let i = 0; i < items.length; i++) { tick(); assign(s.tg, items[i], env); const r = execBlock(s.body, env); if (r === BREAK) break; if (r === CONTINUE) continue; if (r !== undefined) return r; } return; }
        case 'break': return BREAK; case 'continue': return CONTINUE;
        case 'return': return { ret: s.e ? evalE(s.e, env) : null };
        case 'def': { const ps = s.ps.map(p2 => ({ n: p2.n, dv: p2.d ? evalE(p2.d, env) : undefined })); env.set(s.n, new PyFunc(s.n, ps, s.body, env, false)); return; }
        case 'global': { env.glob = env.glob || new Set(); s.ns.forEach(n => env.glob.add(n)); return; }
        case 'import': { s.items.forEach(it => { const m = MODS[it[0]]; if (!m) throw err('ModuleNotFoundError', 'Modulen «' + it[0] + '» finnes ikke her. Du kan bruke math, random og statistics.'); env.set(it[1] || it[0], m); }); return; }
        case 'from': { const m = MODS[s.mod]; if (!m) throw err('ModuleNotFoundError', 'Modulen «' + s.mod + '» finnes ikke her. Du kan bruke math, random og statistics.'); if (s.all) Object.keys(m.a).forEach(k => env.set(k, m.a[k])); else s.names.forEach(n => { if (!(n[0] in m.a)) throw err('ImportError', 'Modulen «' + s.mod + '» har ikke «' + n[0] + '».'); env.set(n[1] || n[0], m.a[n[0]]); }); return; }
        case 'try': {
          let r;
          try { r = execBlock(s.body, env); if (s.els && r === undefined) r = execBlock(s.els, env); }
          catch (e) {
            if (!(e instanceof PyError) || e.pyType === 'TimeoutError') throw e;
            let h = null; for (const x of s.exc) { if (!x.ty) { h = x; break; } const t = evalE(x.ty, env); const names = Array.isArray(t) ? t.map(z => z.n || z.name) : [t.n || t.name]; if (names.some(nm => nm === e.pyType || nm === 'Exception')) { h = x; break; } }
            if (!h) throw e; if (h.as) env.set(h.as, e.message); r = execBlock(h.body, env);
          } finally { if (s.fin) { const fr = execBlock(s.fin, env); if (fr !== undefined) r = fr; } }
          return r;
        }
        case 'raise': { const v = evalE(s.e, env); throw err(typeof v === 'string' ? 'Exception' : 'Exception', str(v)); }
        case 'assert': { if (!truthy(evalE(s.c, env))) throw err('AssertionError', s.m ? str(evalE(s.m, env)) : 'Påstanden stemte ikke.'); return; }
        case 'del': { const t = s.e; (t.k === 'tuple' ? t.items : [t]).forEach(x => { if (x.k === 'index') { const o = evalE(x.o, env), i = evalE(x.i, env); if (Array.isArray(o)) o.splice(Number(i) < 0 ? o.length + Number(i) : Number(i), 1); else if (o instanceof PyDict) o.m.delete(keyOf(i)); } else if (x.k === 'name') env.v.delete(x.n); }); return; }
      }
      throw err('SyntaxError', 'Ukjent setning.');
    }

    ['Exception', 'ValueError', 'TypeError', 'ZeroDivisionError', 'KeyError', 'IndexError', 'NameError'].forEach(n => B.set(n, new PyType(n)));
    ['int', 'float', 'str', 'bool', 'list', 'tuple', 'dict'].forEach(n => { /* finnes allerede som Builtin */ });

    const result = { out: '', error: null };
    try {
      const ast = parse(code); const env = new Env(null); execBlock(ast, env);
    } catch (e) {
      if (e instanceof PyError) { result.error = { type: e.pyType, msg: e.message, line: e.pyLine || curLine }; }
      else if (e instanceof RangeError) { result.error = { type: 'RecursionError', msg: 'Funksjonen kaller seg selv for mange ganger (uendelig rekursjon?).', line: curLine }; }
      else { result.error = { type: 'InternFeil', msg: 'Noe gikk galt inni Python-simulatoren: ' + e.message, line: curLine }; }
    }
    result.out = out.join(''); result.steps = steps;
    return result;
  }
  M.py = { run: run, format: formatSpec };
  if (typeof module !== 'undefined' && module.exports) module.exports = M.py;
})();
