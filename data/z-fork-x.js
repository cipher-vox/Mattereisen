/* Tilleggsfigurer til forklaringsseksjoner som mangler visuell hjelp */
(function () {
  const M = window.MATTE; const H = M.H; const sv = H.sv;
  const NEG = '#1d4ed8', POS = '#c2410c', NUL = '#15803d', INK = '#14213d', TEAL = '#0e8a96', PLUM = '#6d3fc9', ORANGE = '#e8964a', GRAY = '#52617a';
  /* setter en blokk inn i forklaringsseksjonen (begge versjoner) som har tittel med gitt tekst. pos = indeks blant blokkene */
  function leggTil(key, tittelDel, pos, blokk) {
    ['utforsk', 'steg'].forEach(function (mode) {
      const t = M.topics[mode][key]; if (!t) return;
      const s = t.seksjoner.find(x => x.forklaring && x.tittel.indexOf(tittelDel) >= 0); if (!s) return;
      s.blokker.splice(pos, 0, blokk);
    });
  }
  const dots = (n, x0, y, f) => { let o = ''; for (let i = 0; i < n; i++) o += sv.c(x0 + (i % 2) * 22 + Math.floor(i / 2) * 46, y + 0, 9, f); return o; };

  leggTil('10/algebra', 'å regne med bokstaver', 2, H.FIG(
    sv.t(150, 56, '3x + 2', { s: 44 }) + sv.pil(98, 98, 98, 72, POS) + sv.t(60, 118, 'koeffisient', { s: 14, f: POS }) + sv.pil(132, 146, 132, 72, NEG) + sv.t(132, 166, 'variabel', { s: 14, f: NEG }) + sv.pil(198, 98, 198, 72, NUL) + sv.t(240, 118, 'konstantledd', { s: 14, f: NUL }),
    330, 180, 'Et uttrykk har koeffisienter (tallet foran bokstaven), variabler (bokstavene) og konstantledd (tall uten bokstav).'));
  leggTil('10/algebra', 'bevise', 2, H.FIG(
    dots(6, 40, 40, ORANGE) + sv.t(95, 90, 'Partall: 2n (alltid i par)', { s: 14 }) + dots(6, 300, 40, TEAL) + sv.c(300 + 138, 40, 9, '#dc2626') + sv.t(360, 90, 'Oddetall: 2n + 1 (ett til overs)', { s: 14 }),
    520, 110, 'Et partall kan deles i par uten rest. Et oddetall har alltid én prikk til overs.'));
  leggTil('10/kvadratsetninger', 'Bruk kvadratsetningene', 2, { t: 'widget', navn: 'arealmodell', opts: { type: 'konj', a: 7, b: 3, tittel: 'a² − b² som areal: (7 + 3)(7 − 3) = 49 − 9' } });
  leggTil('10/ligningssett', 'Innsettingsmetoden', 1, H.FIG(
    sv.t(100, 40, 'x + y = 10', { s: 24, a: 'start' }) + sv.t(70, 82, '+', { s: 24 }) + sv.t(100, 82, 'x − y = 2', { s: 24, a: 'start' }) + sv.l(60, 98, 270, 98, INK, 3) + sv.t(100, 130, '2x = 12', { s: 24, a: 'start', f: NUL }) + sv.t(300, 82, '← y-ene forsvinner!', { s: 14, f: POS, a: 'start' }),
    470, 150, 'Addisjonsmetoden: legg ligningene sammen, og én av bokstavene forsvinner.'));
  leggTil('10/funksjonstyper', 'gjenkjenner', 1, H.FIG(
    sv.t(70, 20, 'Lineær', { s: 15, f: TEAL }) + [3, 6, 9, 12].map((v, i) => sv.r(20 + i * 0, 30 + i * 36, 50, 28, '#dff4f6', TEAL, 4) + sv.t(45, 50 + i * 36, String(v), { s: 15 }) + (i < 3 ? sv.t(95, 60 + i * 36, '+3', { s: 14, f: POS }) : '')).join('') +
    sv.t(300, 20, 'Eksponentiell', { s: 15, f: PLUM }) + [3, 6, 12, 24].map((v, i) => sv.r(255, 30 + i * 36, 50, 28, '#eee6fb', PLUM, 4) + sv.t(280, 50 + i * 36, String(v), { s: 15 }) + (i < 3 ? sv.t(335, 60 + i * 36, '· 2', { s: 14, f: POS }) : '')).join(''),
    420, 170, 'Lineær: legg til det samme hver gang. Eksponentiell: gang med det samme hver gang.'));
  leggTil('10/kjop-sparing-lan', 'Rabatt, mva', 1, H.FIG(
    sv.r(10, 20, 90, 46, '#fff1e3', ORANGE, 10) + sv.t(55, 50, '800 kr', { s: 17 }) + sv.pil(100, 43, 160, 43, INK) + sv.t(130, 32, '· 0,75', { s: 15, f: NEG }) + sv.r(160, 20, 90, 46, '#dbe6ff', NEG, 10) + sv.t(205, 50, '600 kr', { s: 17 }) + sv.t(130, 84, '25 % rabatt', { s: 13, f: GRAY, w: 600 }) +
    sv.r(300, 20, 90, 46, '#dbe6ff', NEG, 10) + sv.t(345, 50, '400 kr', { s: 17 }) + sv.pil(390, 43, 450, 43, INK) + sv.t(420, 32, '· 1,25', { s: 15, f: POS }) + sv.r(450, 20, 90, 46, '#fff1e3', ORANGE, 10) + sv.t(495, 50, '500 kr', { s: 17 }) + sv.t(420, 84, '25 % mva', { s: 13, f: GRAY, w: 600 }),
    560, 100, 'Rabatt gir vekstfaktor under 1. Mva gir vekstfaktor over 1.'));
  leggTil('10/kjop-sparing-lan', 'Lån og renter', 3, H.FIG(
    sv.r(20, 40, 300, 40, '#dbe6ff', NEG, 4) + sv.t(170, 66, 'Prisen: 6000 kr', { s: 15 }) + sv.r(320, 40, 36, 40, '#ffd9b8', POS, 4) + sv.t(338, 30, '+720', { s: 14, f: POS }) + sv.t(188, 112, 'Du betaler 6720 kr totalt', { s: 14 }),
    400, 125, 'Ved kredittkjøp betaler du prisen pluss kostnaden ved å låne: 720 kr ekstra (12 %).'));
  leggTil('10/modellering', 'gyldig', 1, H.FIG(
    sv.l(40, 150, 320, 150, '#94a3b8', 2) + sv.l(40, 150, 40, 20, '#94a3b8', 2) + sv.l(100, 120, 200, 85, TEAL, 5) + sv.l(200, 85, 300, 50, TEAL, 4, '7 6') + sv.c(100, 120, 5, POS) + sv.c(200, 85, 5, POS) +
    sv.t(150, 170, 'målt: 10–16 år', { s: 13, f: TEAL }) + sv.t(262, 170, 'ikke målt', { s: 13, f: '#dc2626' }) + sv.t(262, 38, '❌ urealistisk', { s: 13, f: '#dc2626' }),
    340, 185, 'Modellen (heltrukken linje) passer der vi har målinger. Utenfor (stiplet) vet vi ikke om den stemmer.'));
  leggTil('9/sammensatte-maleenheter', 'regne om', 1, H.FIG(
    sv.l(30, 60, 450, 60, INK, 4) + [0, 15, 30, 45, 60].map((m, i) => sv.l(30 + i * 105, 48, 30 + i * 105, 72, INK, 3) + sv.t(30 + i * 105, 40, m + ' min', { s: 14 }) + sv.t(30 + i * 105, 96, ['0 t', '0,25 t', '0,5 t', '0,75 t', '1 t'][i], { s: 15, f: POS })).join(''),
    480, 115, 'En time har 60 minutter. 15 minutter er en kvart time (0,25), 30 minutter er en halv (0,5) og 45 minutter er tre kvart (0,75).'));
  const tri = (pts, f, lab, x) => sv.p('M' + pts + ' Z', f, INK, 3) + sv.t(x, 160, lab, { s: 14 });
  leggTil('9/trekanter', 'Spiss, rett', 2, H.FIG(
    tri('20 120 120 120 70 30', '#dff4f6', 'spiss: alle < 90°', 70) + tri('180 120 280 120 180 40', '#e1f6e8', 'rett: en vinkel = 90°', 230) + sv.r(180, 104, 16, 16, 'none', INK, 0) + tri('340 120 470 120 360 80', '#ffe4e1', 'stump: en vinkel > 90°', 405),
    500, 180, 'Tre sorter trekanter: spiss (alle vinkler under 90°), rettvinklet og stump (en vinkel over 90°).'));
  leggTil('9/simulering', 'Python', 99, H.EK('Spor en simulering', 'Hva gjør denne koden?\n<code>antall = 0<br>for i in range(100):<br>&nbsp;&nbsp;&nbsp;&nbsp;if random.randint(1, 2) == 1:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;antall = antall + 1</code>', ['random.randint(1, 2) gir enten 1 eller 2, som et myntkast.', 'Løkka gjentar 100 ganger, og hver gang vi får 1, øker antall med 1.', 'Til slutt er antall omtrent 50 (men ikke nøyaktig). Det er antall «kron» på 100 kast.', 'Svar: antall kron på 100 myntkast, som blir omtrent 50.']));
})();
