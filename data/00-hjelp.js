/* ============================================================
   Skrivehjelp for innholdsfilene (forkortelser).
   Brukes av alle temafiler. Her er ingen elevtekst.
   ============================================================ */
(function () {
  const M = window.MATTE; const N = M.num;
  const H = M.H = {};
  /* oppgaver */
  H.V = (tekst, valg, riktig, hint, losning, fast) => { const o = { type: 'valg', tekst: tekst, valg: valg, riktig: riktig, hint: hint, losning: losning }; if (fast) o.fast = true; return o; };
  H.T = (tekst, svar, hint, losning, enhet) => { const o = { tekst: tekst, svar: svar, hint: hint, losning: losning }; if (enhet) o.enhet = enhet; return o; };
  H.F = (tekst, losning) => ({ type: 'fritekst', tekst: tekst, losning: losning });
  /* blokker */
  H.P = (tekst, stor) => (stor ? { t: 'p', stor: true, tekst: tekst } : { t: 'p', tekst: tekst });
  H.G = tekst => ({ t: 'guide', ikon: '🧭', tekst: tekst });
  H.C = (stil, tittel, x) => Array.isArray(x) ? { t: 'callout', stil: stil, tittel: tittel, punkter: x } : { t: 'callout', stil: stil, tittel: tittel, tekst: x };
  H.E = (oppgave, steg, regn) => regn ? { t: 'eksempel', regn: regn, steg: steg } : { t: 'eksempel', tittel: 'Vi gjør den første sammen', oppgave: oppgave, steg: steg };
  H.O = (niva, oppgaver) => ({ t: 'oppgaver', niva: niva, oppgaver: oppgaver });
  H.OS = oppgaver => ({ t: 'oppgaver', tittel: 'Nå du! ⭐', ikon: '✏️', oppgaver: oppgaver });
  H.W = (navn, opts) => ({ t: 'widget', navn: navn, opts: opts || {} });
  H.TAB = (hode, rader) => ({ t: 'tabell', hode: hode, rader: rader });
  H.K = kort => ({ t: 'kort', kort: kort });
  H.H2 = tekst => ({ t: 'h', tekst: tekst });
  H.SJ = (tittel, punkter) => ({ t: 'sjekkliste', tittel: tittel, punkter: punkter });
  H.S = (tittel, ikon, blokker, kort) => { const o = { tittel: tittel, ikon: ikon, blokker: blokker }; if (kort) o.kort = kort; return o; };
  H.TIPS = 'Du kan prøve så mange ganger du vil. Det er helt greit å gjøre feil – det er sånn vi lærer.';
  /* ekstra */
  H.regn = expr => ({ q: M.prettyExpr(expr) + ' =', num: M.evalExpr(expr), a: M.prettyExpr(expr) + ' = ' + N(M.evalExpr(expr)) });
  H.e = (q, num, a) => ({ q: M.markup(q), num: num, a: a === undefined ? N(num) : a });
  H.ek = (id, ikon, tittel, antall, intro, lag) => ({ id: id, ikon: ikon, tittel: tittel, antall: antall, intro: intro, lag: lag });
  H.ekDef = (tittel, sek) => ({ tittel: 'Ekstra oppgaver: ' + tittel, intro: 'Skriv svaret i feltet og trykk Enter for å sjekke. Fasit står nederst i hver del, og «Nytt sett» lager nye oppgaver.', seksjoner: sek });
  H.tilfeldig = r => ({ pick: a => a[r.int(0, a.length - 1)] });
  H.ord = (ord, forklaring) => ({ ord: Array.isArray(ord) ? ord : [ord], forklaring: forklaring });

  /* ---------- forklaringsseksjoner (settes inn før oppgavene, i både Utforsk og Steg for steg) ---------- */
  H.EK = (tittel, oppgave, steg, visual) => { const o = { t: 'eksempel', tittel: tittel, oppgave: oppgave, steg: steg }; if (visual) o.visual = visual; return o; };
  H.FORK = (tittel, ikon, blokker) => { const s = { tittel: 'Forklaring: ' + tittel, ikon: ikon || '📖', blokker: blokker, forklaring: true, kort: tittel }; return s; };
  /* liste: [[posisjon, seksjon], ...]. posisjon = indeksen til den opprinnelige seksjonen den settes foran (0 = først) */
  H.FK = function (key, liste) {
    ['utforsk', 'steg'].forEach(function (mode) {
      const t = M.topics[mode][key]; if (!t) return;
      const orig = t.seksjoner.filter(s => !s.forklaring); const ut = [];
      for (let i = 0; i <= orig.length; i++) {
        liste.forEach(function (x) { if (Math.min(x[0], orig.length) === i) ut.push(x[1]); });
        if (i < orig.length) ut.push(orig[i]);
      }
      t.seksjoner = ut;
    });
  };
  /* små SVG-hjelpere til figurer */
  const esc = s => String(s).replace(/"/g, '&quot;');
  const sv = H.sv = {
    t: (x, y, s, o) => '<text x="' + x + '" y="' + y + '" text-anchor="' + ((o && o.a) || 'middle') + '" font-size="' + ((o && o.s) || 14) + '" font-weight="' + ((o && o.w) || 700) + '" fill="' + ((o && o.f) || '#14213d') + '">' + s + '</text>',
    r: (x, y, w, h, f, st, rx) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx === undefined ? 6 : rx) + '" fill="' + (f || 'none') + '" stroke="' + (st || 'none') + '" stroke-width="2"/>',
    l: (x1, y1, x2, y2, col, w, dash) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (col || '#14213d') + '" stroke-width="' + (w || 2) + '" stroke-linecap="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>',
    c: (x, y, r, f, st) => '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + (f || 'none') + '" stroke="' + (st || 'none') + '" stroke-width="2"/>',
    p: (d, f, st, w) => '<path d="' + d + '" fill="' + (f || 'none') + '" stroke="' + (st || 'none') + '" stroke-width="' + (w || 2) + '" stroke-linejoin="round" stroke-linecap="round"/>',
    pil: (x1, y1, x2, y2, col) => { const a = Math.atan2(y2 - y1, x2 - x1), L = 9; return sv.l(x1, y1, x2, y2, col, 3) + '<path d="M' + x2 + ' ' + y2 + ' L' + (x2 - L * Math.cos(a - .5)) + ' ' + (y2 - L * Math.sin(a - .5)) + ' L' + (x2 - L * Math.cos(a + .5)) + ' ' + (y2 - L * Math.sin(a + .5)) + 'Z" fill="' + (col || '#14213d') + '"/>'; }
  };
  H.FIG = (inner, w, h, tekst) => ({ t: 'html', html: '<figure class="figur"><svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(tekst) + '">' + inner + '</svg><figcaption class="lesbar">' + tekst + '</figcaption></figure>' });
})();
/* ---------- nivåsett: egne oppgaver for Rolig og Utfordring ---------- */
(function () {
  const M = window.MATTE, H = M.H;
  H.t = (q, a, hint, los, enhet) => H.T(q, a, hint, los, enhet);
  H.v = (q, valg, riktig, hint, los) => H.V(q, valg, riktig, hint, los);
  /* NIV(nøkkel, ingress for Rolig, [eksempeloppgave, steg], rolige oppgaver, ingress for Utfordring, utfordringsoppgaver) */
  H.NIV = function (key, introR, eks, rolig, introU, utf) {
    M.register('rolig', key, { seksjoner: [H.S('Rolig start: små tall, ett steg om gangen', '🌱', [H.P(introR), H.E(eks[0], eks[1]), H.OS(rolig)])] });
    M.register('utfordring', key, { seksjoner: [H.S('Utfordring: strekk deg litt lenger', '🚀', [H.P(introU), H.OS(utf)])] });
  };
})();

/* Lærerdata: M.laerer[key] = {tid, forkunn, husk, feil, start, midt, slutt, samtale, diff, vurdering} */
(function () {
  const M = window.MATTE, H = M.H;
  M.laerer = M.laerer || {};
  H.LAERER = function (key, o) { M.laerer[key] = o; };
})();
