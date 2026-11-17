/* ============================================================
   Spill for å lære – kjerne: register, sider og små hjelpere.
   Ingenting lagres: poeng og liv finnes bare mens spillet er åpent.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;
  M.games = [];
  const G = M.G = {};
  G.timers = [];
  G.rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  G.pick = a => a[Math.floor(Math.random() * a.length)];
  G.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  G.fmt = M.fmt;
  G.add = g => { M.games.push(g); };
  G.every = function (fn, ms) { const id = setInterval(fn, ms); G.timers.push(id); return id; };
  G.after = function (fn, ms) { const id = setTimeout(fn, ms); G.timers.push(id); return id; };
  G.stopp = function () { G.timers.forEach(id => { clearInterval(id); clearTimeout(id); }); G.timers = []; };
  M.spillStopp = G.stopp;
  G.hearts = (n, max) => '❤️'.repeat(Math.max(0, n)) + '🖤'.repeat(Math.max(0, (max || 3) - n));
  G.q = (el, s) => el.querySelector(s);
  G.stjerner = function (el, poeng, maks, tekst) {
    const f = maks ? poeng / maks : 0; const n = f >= .9 ? 3 : f >= .6 ? 2 : f > 0 ? 1 : 0;
    return '<div class="sp-stjerner" aria-label="' + n + ' av 3 stjerner">' + '⭐'.repeat(n) + '<span class="tomme">' + '☆'.repeat(3 - n) + '</span></div>';
  };
  /* sluttskjerm med «Spill igjen» */
  G.slutt = function (el, o) {
    el.innerHTML = '<div class="sp-slutt"><div class="sp-slutt-ikon" aria-hidden="true">' + (o.ikon || '🏁') + '</div><h3>' + (o.tittel || 'Ferdig!') + '</h3>' + (o.stjerner || '') +
      '<p class="lesbar">' + (o.tekst || '') + '</p>' + (o.lær ? '<div class="sp-lær lesbar"><strong>Dette lærte du:</strong> ' + o.lær + '</div>' : '') +
      '<p><button type="button" class="knapp primær stor sp-igjen">🔁 Spill igjen</button></p></div>';
    G.q(el, '.sp-igjen').addEventListener('click', o.igjen);
  };
  G.feedback = function (el, ok, html) { const f = G.q(el, '.sp-fb'); if (!f) return; f.className = 'sp-fb ' + (ok ? 'ok' : 'feil'); f.innerHTML = html; };
  /* enkel, trygg uttrykksevaluator for tall, + − * / og parenteser. Returnerer {verdi, tall:[brukte tall]} eller null */
  G.regn = function (s) {
    s = String(s).replace(/×|·|⋅/g, '*').replace(/÷|:/g, '/').replace(/[−–]/g, '-').replace(/,/g, '.').replace(/\s+/g, '');
    if (!s || /[^0-9+\-*/().]/.test(s)) return null;
    let i = 0; const tall = [];
    function tal() { const m = s.slice(i).match(/^\d+(\.\d+)?/); if (!m) throw 0; i += m[0].length; tall.push(parseFloat(m[0])); return parseFloat(m[0]); }
    function fakt() { if (s[i] === '(') { i++; const v = uttr(); if (s[i] !== ')') throw 0; i++; return v; } if (s[i] === '-') { i++; return -fakt(); } return tal(); }
    function ledd() { let v = fakt(); while (s[i] === '*' || s[i] === '/') { const o = s[i++]; const r = fakt(); v = o === '*' ? v * r : v / r; } return v; }
    function uttr() { let v = ledd(); while (s[i] === '+' || s[i] === '-') { const o = s[i++]; const r = ledd(); v = o === '+' ? v + r : v - r; } return v; }
    try { const v = uttr(); if (i !== s.length || !isFinite(v)) return null; return { verdi: v, tall: tall }; } catch (e) { return null; }
  };

  /* ---------- sider ---------- */
  const H = M.href;
  const TRINN = { 8: '8. trinn', 9: '9. trinn', 10: '10. trinn' };
  function temaTagger(g, mode) {
    return (g.temaer || []).map(k => { const p = k.split('/'); const m = M.findTema(p[0], p[1]); return m ? '<a class="merke tema-tag" href="' + H(mode, p[0], p[1]) + '">' + m.ikon + ' ' + m.tittel + '</a>' : ''; }).join('');
  }
  M.gamesFor = key => M.games.filter(g => (g.temaer || []).indexOf(key) >= 0);

  function spillIndex(mode) {
    let h = '<nav class="brødsmule"><a href="' + H(mode) + '">Forsiden</a> › <span>Spill for å lære</span></nav>' +
      '<header class="side-hode spill-hode"><h1>🎮 Spill for å lære</h1><p class="lesbar">Spill og puslespill der du øver matte uten å tenke på det som øving. Du kan spille så mange ganger du vil. Poeng og liv finnes bare mens spillet er åpent, og ingenting blir lagret.</p></header>';
    [8, 9, 10].forEach(function (t) {
      const gs = M.games.filter(g => g.trinn === t); if (!gs.length) return;
      h += '<section class="ekstra-trinn"><h2 class="t' + t + '-tekst">' + TRINN[t] + '</h2><div class="spill-grid">' +
        gs.map(g => '<a class="spill-kort-stor t' + t + '" href="' + H(mode, 'spill', g.id) + '"><span class="spill-ikon" aria-hidden="true">' + g.ikon + '</span><strong>' + g.tittel + '</strong><span class="lesbar">' + g.kort + '</span><span class="spill-tema">' + (g.temaer || []).map(k => { const p = k.split('/'); const m = M.findTema(p[0], p[1]); return m ? m.tittel : ''; }).filter(Boolean).join(' · ') + '</span></a>').join('') + '</div></section>';
    });
    return h;
  }
  function spill(mode, id) {
    const g = M.games.find(x => x.id === id);
    if (!g) return M.pages.ikkeFunnet(mode);
    M._after = function () { const rom = document.getElementById('spill-rom'); if (rom) { try { g.start(rom); } catch (e) { rom.innerHTML = '<p>Spillet kunne ikke starte.</p>'; console.error(e); } } };
    return '<nav class="brødsmule"><a href="' + H(mode) + '">Forsiden</a> › <a href="' + H(mode, 'spill') + '">Spill for å lære</a> › <span>' + g.tittel + '</span></nav>' +
      '<header class="side-hode spill-hode t' + g.trinn + '"><h1>' + g.ikon + ' ' + g.tittel + '</h1><p class="lesbar">' + g.kort + '</p></header>' +
      '<section class="sp-hvordan"><h2>Slik spiller du</h2><p class="lesbar">' + g.hvordan + '</p></section>' +
      '<section class="sp-rom-wrap"><div id="spill-rom" class="spill-rom" aria-live="polite"></div></section>' +
      '<section class="sp-læring"><h2>Hva øver dette på?</h2><p class="lesbar">' + g.lærer + '</p><p class="tema-tagger">' + temaTagger(g, mode) + '</p></section>';
  }
  M.pages.spillIndex = spillIndex; M.pages.spill = spill;
})();
