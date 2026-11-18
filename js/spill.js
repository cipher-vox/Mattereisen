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
  G.hearts = (n, max) => '❤️'.repeat(Math.max(0, n)) + '🖤'.repeat(Math.max(0, (max || G.liv()) - n));
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
    G.q(el, '.sp-igjen').addEventListener('click', function () { G.rekke = 0; G.besteRekke = 0; o.igjen(); });
    if ((o.stjerner || '').indexOf('⭐⭐') >= 0) { G.konfetti(el); G.lyd('slutt'); }
    if (G.besteRekke >= 3) { const lær = G.q(el, '.sp-slutt h3'); if (lær) lær.insertAdjacentHTML('afterend', '<p class="sp-rekke">🔥 Lengste rekke: ' + G.besteRekke + ' riktige på rad</p>'); }
  };
  G.feedback = function (el, ok, html) {
    const f = G.q(el, '.sp-fb'); if (!f) return;
    G.rekke = ok ? G.rekke + 1 : 0; if (G.rekke > G.besteRekke) G.besteRekke = G.rekke;
    f.className = 'sp-fb ' + (ok ? 'ok' : 'feil');
    f.innerHTML = html + (ok && G.rekke >= 3 ? ' <span class="sp-rekke">🔥 ' + G.rekke + ' på rad!</span>' : '');
    G.puls(el, ok); G.lyd(ok ? 'ok' : 'feil');
  };
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


  /* ---------- felles: nivå, liv, lyd, konfetti, rekke ---------- */
  G.niv = () => M.nivåNr ? M.nivåNr() : 1;            // 0 Rolig, 1 Vanlig, 2 Utfordring
  G.liv = () => [5, 3, 2][G.niv()];
  G.pr = (lett, vanlig, hard) => [lett, vanlig, hard][G.niv()];   // velg verdi etter nivå
  G.utenTid = false; G.lydPå = false; G.rekke = 0; G.besteRekke = 0;
  let ac = null;
  G.lyd = function (type) {
    if (!G.lydPå) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const t0 = ac.currentTime, toner = type === 'ok' ? [523, 659, 784] : type === 'slutt' ? [523, 659, 784, 1047] : [196, 147];
      toner.forEach(function (f, i) { const o = ac.createOscillator(), g = ac.createGain(); o.type = type === 'feil' ? 'triangle' : 'sine'; o.frequency.value = f; g.gain.setValueAtTime(.0001, t0 + i * .09); g.gain.exponentialRampToValueAtTime(.12, t0 + i * .09 + .02); g.gain.exponentialRampToValueAtTime(.0001, t0 + i * .09 + .16); o.connect(g); g.connect(ac.destination); o.start(t0 + i * .09); o.stop(t0 + i * .09 + .18); });
    } catch (e) { /* lyd er valgfritt */ }
  };
  G.konfetti = function (el) {
    if (M.reduced && M.reduced()) return;
    const w = document.createElement('div'); w.className = 'sp-konfetti'; w.setAttribute('aria-hidden', 'true');
    const farger = ['#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#a855f7', '#ef4444'];
    for (let i = 0; i < 40; i++) { const s = document.createElement('span'); s.style.left = Math.random() * 100 + '%'; s.style.background = farger[i % farger.length]; s.style.animationDelay = Math.random() * .5 + 's'; s.style.animationDuration = 1.4 + Math.random() * 1.2 + 's'; w.appendChild(s); }
    el.appendChild(w); G.after(function () { w.remove(); }, 3200);
  };
  G.puls = function (el, ok) {
    if (M.reduced && M.reduced()) return;
    const f = G.q(el, '.sp-fb'); if (!f) return;
    f.classList.remove('puls-ok', 'puls-feil'); void f.offsetWidth; f.classList.add(ok ? 'puls-ok' : 'puls-feil');
  };


  /* felles: skrevet svar med forsøk og trinnvise hint.
     o = { fasit: tall, tol: toleranse, hint: [tekst…], forsøk: 2, enhet: 'm', ledetekst: 'Svar', fn(ok, antallForsøk) }
     Første gale svar gir første hint. 💡-knappen viser ett nytt hint om gangen. */
  G.skriv = function (el, boks, o) {
    const maks = o.forsøk || 2, hint = o.hint || [], tol = o.tol === undefined ? 1e-9 : o.tol; let f = 0, hn = 0, ferdig = false;
    boks.innerHTML = '<div class="sp-rad"><label class="sr-only" for="sk-inn">' + (o.ledetekst || 'Svar') + '</label><input id="sk-inn" class="tallfelt sk-inn" type="text" inputmode="text" autocomplete="off" placeholder="svar">' + (o.enhet ? ' <span class="sk-enhet">' + o.enhet + '</span>' : '') + ' <button type="button" class="knapp primær sk-sjekk">Sjekk</button>' + (hint.length ? ' <button type="button" class="knapp liten sk-hjelp">💡 Hint</button>' : '') + '</div><div class="sp-hint lesbar" hidden></div>';
    const inn = G.q(boks, '.sk-inn'), hb = G.q(boks, '.sp-hint');
    const visHint = n => { hn = Math.max(hn, Math.min(n, hint.length)); if (!hn) return; hb.hidden = false; hb.innerHTML = '<strong>Hint:</strong><ol>' + hint.slice(0, hn).map(x => '<li>' + x + '</li>').join('') + '</ol>'; };
    function stopp(ok) { ferdig = true; inn.disabled = true; boks.querySelectorAll('button').forEach(b => b.disabled = true); o.fn(ok, f); }
    function sjekk() {
      if (ferdig) return;
      const v = o.les ? o.les(inn.value) : M.parseNum(inn.value);
      if (v === null || (typeof v === 'number' && isNaN(v))) return G.feedback(el, false, o.feilFormat || 'Skriv et tall.');
      f++; const ok = o.test ? o.test(v) : Math.abs(v - o.fasit) <= tol;
      if (ok) return stopp(true);
      if (f >= maks) return stopp(false);
      G.feedback(el, false, 'Ikke helt. Prøv en gang til.' + (hint.length ? ' Her er et hint: ' + hint[Math.min(f - 1, hint.length - 1)] : ''));
      visHint(f); inn.select();
    }
    G.q(boks, '.sk-sjekk').addEventListener('click', sjekk); inn.addEventListener('keydown', e => { if (e.key === 'Enter') sjekk(); });
    const hj = G.q(boks, '.sk-hjelp'); if (hj) hj.addEventListener('click', () => visHint(hn + 1));
    try { inn.focus({ preventScroll: true }); } catch (e) { }
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
    M._after = function () { G.rekke = 0; G.besteRekke = 0; const lb = document.getElementById('sp-lyd'); if (lb) lb.addEventListener('change', () => { G.lydPå = lb.checked; if (G.lydPå) G.lyd('ok'); }); const tb = document.getElementById('sp-tid'); if (tb) tb.addEventListener('change', () => { G.utenTid = tb.checked; document.dispatchEvent(new CustomEvent('nivaa')); }); const rom = document.getElementById('spill-rom'); if (rom) { try { g.start(rom); } catch (e) { rom.innerHTML = '<p>Spillet kunne ikke starte.</p>'; console.error(e); } } };
    return '<nav class="brødsmule"><a href="' + H(mode) + '">Forsiden</a> › <a href="' + H(mode, 'spill') + '">Spill for å lære</a> › <span>' + g.tittel + '</span></nav>' +
      '<header class="side-hode spill-hode t' + g.trinn + '"><h1>' + g.ikon + ' ' + g.tittel + '</h1><p class="lesbar">' + g.kort + '</p></header>' +
      '<section class="sp-hvordan"><h2>Slik spiller du</h2><p class="lesbar">' + g.hvordan + '</p></section>' +
      '<section class="sp-kontroll">' + M.nivaaVelger('Nivå i spillet:') + '<div class="sp-valg"><label><input type="checkbox" id="sp-lyd"' + (G.lydPå ? ' checked' : '') + '> 🔊 Lyd</label>' + (g.tid ? '<label><input type="checkbox" id="sp-tid"' + (G.utenTid ? ' checked' : '') + '> 🐢 Uten tidtaker</label>' : '') + '</div></section>' +
      '<section class="sp-rom-wrap"><div id="spill-rom" class="spill-rom" aria-live="polite"></div></section>' +
      '<section class="sp-læring"><h2>Hva øver dette på?</h2><p class="lesbar">' + g.lærer + '</p><p class="tema-tagger">' + temaTagger(g, mode) + '</p></section>';
  }
  M.pages.spillIndex = spillIndex; M.pages.spill = spill;
})();
