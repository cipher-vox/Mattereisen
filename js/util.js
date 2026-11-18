/* ============================================================
   Hjelpefunksjoner: tallformat, uttrykk, tekstmarkering
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE = window.MATTE || {};
  M.topics = M.topics || { utforsk: {}, steg: {}, rolig: {}, utfordring: {} };
  M.widgets = M.widgets || {};
  M.ekstra = M.ekstra || {};
  M.register = (mode, key, obj) => { M.topics[mode][key] = obj; };

  const MINUS = '−';

  /* ---------- tall ---------- */
  M.fmt = function (n) {
    const r = Math.round(n * 1e9) / 1e9;
    const s = String(Math.abs(r)).replace('.', ',');
    return r < 0 ? MINUS + s : s;
  };
  M.fmtS = n => (n > 0 ? '+' + M.fmt(n) : M.fmt(n));
  M.num = function (n, sign) {
    const cls = n < 0 ? 'neg' : (n > 0 ? 'pos' : 'zero');
    return '<span class="tall ' + cls + '">' + (sign ? M.fmtS(n) : M.fmt(n)) + '</span>';
  };

  M.parseNum = function (s) {
    if (s === null || s === undefined) return NaN;
    s = String(s).trim().replace(/[−–—]/g, '-').replace(/\s+/g, '').replace(',', '.');
    s = s.replace(/^\+/, '');
    let m = s.match(/^(-?\d+)\/(\d+)$/);
    if (m) return parseInt(m[1], 10) / parseInt(m[2], 10);
    if (!/^-?\d+(\.\d+)?$/.test(s)) return NaN;
    return parseFloat(s);
  };

  M.evalExpr = function (expr) {
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) throw new Error('Ugyldig uttrykk: ' + expr);
    // eslint-disable-next-line no-new-func
    const v = Function('"use strict"; return (' + expr + ');')();
    return Math.round(v * 1e9) / 1e9 + 0;
  };

  function tokenize(e) {
    const t = []; const re = /\s*(\d+(?:\.\d+)?|[()+\-*/])/g; let m;
    while ((m = re.exec(e))) t.push(m[1]);
    return t;
  }
  /* Gjør "-3+(-5)" om til pent uttrykk med fargede negative tall */
  M.prettyExpr = function (e) {
    const toks = tokenize(e); const out = []; let prev = null;
    for (let i = 0; i < toks.length; i++) {
      const tk = toks[i];
      const afterOp = prev === null || /^[(+\-*/]$/.test(prev);
      if (tk === '-' && afterOp) {
        const nx = toks[i + 1];
        if (nx && /^\d/.test(nx)) {
          out.push('<span class="tall neg">' + MINUS + nx.replace('.', ',') + '</span>');
          i++; prev = nx; continue;
        }
        out.push(MINUS); prev = '-'; continue;
      }
      if (/^\d/.test(tk)) { out.push(tk.replace('.', ',')); }
      else if (tk === '+') out.push(' + ');
      else if (tk === '-') out.push(' ' + MINUS + ' ');
      else if (tk === '*') out.push(' · ');
      else if (tk === '/') out.push(' : ');
      else out.push(tk);
      prev = tk;
    }
    return '<span class="uttrykk">' + out.join('') + '</span>';
  };

  /* ---------- tilfeldig (seedet) ---------- */
  M.rng = function (seed) {
    let a = seed >>> 0;
    const f = function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    f.int = (lo, hi) => lo + Math.floor(f() * (hi - lo + 1));
    f.pick = arr => arr[Math.floor(f() * arr.length)];
    f.shuffle = arr => { const a2 = arr.slice(); for (let i = a2.length - 1; i > 0; i--) { const j = Math.floor(f() * (i + 1)); [a2[i], a2[j]] = [a2[j], a2[i]]; } return a2; };
    return f;
  };

  /* ---------- tekstmarkering ----------
     {-3}  -> blått negativt tall      {+5} -> oransje positivt tall
     {5}   -> oransje tall              {0}  -> grønn null
     **fet**                            [[ord]] håndteres via ordlisten
  */
  const LETT = 'A-Za-zÆØÅæøåéèäöü0-9';
  M.markup = function (s, ctx) {
    if (s === undefined || s === null) return '';
    s = String(s);
    s = s.replace(/\{([+\-−]?)(\d+(?:[.,]\d+)?)\}/g, function (m, sg, num) {
      const neg = sg === '-' || sg === MINUS;
      let cls = neg ? 'neg' : 'pos';
      if (!sg && /^0([.,]0+)?$/.test(num)) cls = 'zero';
      if (sg === '+' && /^0$/.test(num)) cls = 'zero';
      return '<span class="tall ' + cls + '">' + (neg ? MINUS : (sg === '+' ? '+' : '')) + num + '</span>';
    });
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    if (ctx && ctx.ordliste && ctx.ordliste.length) {
      const parts = s.split(/(<[^>]+>)/);
      for (let p = 0; p < parts.length; p += 2) {
        let txt = parts[p];
        if (!txt) continue;
        ctx.ordliste.forEach(function (entry, idx) {
          if (ctx.seen && ctx.seen[idx]) return;
          entry.ord.forEach(function (variant) {
            if (ctx.seen && ctx.seen[idx]) return;
            const re = new RegExp('(^|[^' + LETT + '])(' + variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?![' + LETT + '])', 'i');
            if (re.test(txt)) {
              txt = txt.replace(re, function (m, pre, w) {
                return pre + '<button type="button" class="ord" data-ord="' + idx + '">' + w + '</button>';
              });
              if (ctx.seen) ctx.seen[idx] = true;
            }
          });
        });
        parts[p] = txt;
      }
      s = parts.join('');
    }
    return s;
  };

  /* ---------- gjør tekst klar for opplesing ---------- */
  M.forTale = function (t) {
    return String(t)
      .replace(/(\d)\s*:\s*(?=[\d(−])/g, '$1 delt på ')
      .replace(/−/g, ' minus ')
      .replace(/\+/g, ' pluss ')
      .replace(/[·×∙]/g, ' ganger ')
      .replace(/÷/g, ' delt på ')
      .replace(/=/g, ' er lik ')
      .replace(/</g, ' mindre enn ')
      .replace(/>/g, ' større enn ')
      .replace(/°/g, ' grader')
      .replace(/\s+/g, ' ')
      .trim();
  };

  M.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  M.reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
})();
