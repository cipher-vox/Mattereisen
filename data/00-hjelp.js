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
})();
