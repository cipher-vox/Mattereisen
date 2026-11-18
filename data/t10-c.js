/* ============================================================
   10. trinn: Funksjonstyper + Prosentvis endring og vekstfaktor
   Læreplan 10.4 og 10.6
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, SJ, S, ord } = H;
  const TEAL = '#0e8f9b', ORANGE = '#e8964a', PLUM = '#8a5fbf';
  const EKS = { a: { min: 1, max: 200, v: 100, steg: 10, navn: 'a (startverdi)' }, b: { min: 0.5, max: 2, v: 1.5, steg: 0.1, navn: 'b (vekstfaktor)' } };

  /* ================= FUNKSJONSTYPER ================= */
  const ORD1 = [
    ord(['funksjon', 'funksjonen'], 'En regel som gir nøyaktig én y-verdi for hver x-verdi.'),
    ord(['lineær funksjon', 'lineære funksjoner'], 'En funksjon som gir en rett linje: y = ax + b.'),
    ord(['andregradsfunksjon', 'andregradsfunksjoner'], 'En funksjon med x² som høyeste potens: y = ax² + bx + c. Grafen er en parabel.'),
    ord(['parabel', 'parabelen'], 'Den buede grafen til en andregradsfunksjon. Den har et toppunkt eller bunnpunkt.'),
    ord(['eksponentialfunksjon', 'eksponentialfunksjoner'], 'En funksjon der x står i eksponenten: y = a · bˣ. Brukes om vekst og forfall.'),
    ord(['brøkfunksjon', 'brøkfunksjoner'], 'En funksjon med x i nevneren, for eksempel y = 6/x.'),
    ord(['vekstfaktor'], 'Tallet du ganger med for hver ny periode, for eksempel 1,05 for 5 % økning.'),
    ord(['toppunkt', 'bunnpunkt'], 'Det høyeste (eller laveste) punktet på en parabel.'),
    ord(['nullpunkt', 'nullpunkter'], 'Der grafen krysser x-aksen: y = 0.'),
    ord(['symmetri', 'symmetrilinje'], 'Parabelen er et speilbilde av seg selv om en loddrett linje gjennom toppunktet.'),
    ord(['nevner'], 'Tallet under brøkstreken.'),
    ord(['verditabell'], 'En tabell som viser x og tilhørende y.'),
    ord(['omvendt proporsjonal', 'omvendt proporsjonale'], 'Når den ene dobles, halveres den andre. Produktet er alltid det samme.')
  ];
  const U1 = [];
  U1.push(S('Fire familier av funksjoner', '🎢', [
    P('Funksjoner finnes i familier. Fire av dem skal vi bli kjent med. Hver familie har sin egen <strong>formel</strong> og sin egen <strong>graf</strong>, og passer til ulike situasjoner.'),
    TAB(['Type', 'Formel', 'Grafen', 'Eksempel'], [['Lineær', 'y = ax + b', 'Rett linje', 'Taxi: 15 kr per km + startpris'], ['Andregrad', 'y = ax² + bx + c', 'Parabel', 'Ball som kastes opp'], ['Eksponential', 'y = a · bˣ', 'Krum, skyter fart eller flater ut', 'Penger på konto, bakterier'], ['Brøk', 'y = k/x', 'To buer (hyperbel)', 'Tid = strekning ÷ fart']]),
    C('virkelighet', 'Matematikk som modell', 'Hver familie passer til én type endring. Å velge riktig familie er første steg i modellering.'),
    O(1, [
      V('Hvilken funksjonstype har formelen y = 2x + 5?', ['Lineær', 'Andregrad', 'Eksponential', 'Brøk'], 0, 'Rett linje.', 'Lineær: y = ax + b.', true),
      V('Hvilken funksjonstype har formelen y = x² − 4?', ['Andregrad', 'Lineær', 'Eksponential', 'Brøk'], 0, 'Høyeste potens er 2.', 'Andregradsfunksjon.', true),
      V('Hvilken funksjonstype har formelen y = 3 · 2ˣ?', ['Eksponential', 'Lineær', 'Andregrad', 'Brøk'], 0, 'x står i eksponenten.', 'Eksponentialfunksjon.', true),
      V('Hvilken funksjonstype har formelen y = 12/x?', ['Brøk', 'Lineær', 'Andregrad', 'Eksponential'], 0, 'x står i nevneren.', 'Brøkfunksjon.', true)
    ])
  ]));
  U1.push(S('Lineære funksjoner', '📏', [
    P('Lineære funksjoner har <strong>konstant endring</strong>: y øker (eller minker) like mye for hvert steg i x. Formel: <strong>y = ax + b</strong>.'),
    W('graf', { params: { a: { min: -4, max: 4, v: 2, navn: 'a (stigningstall)' }, b: { min: -5, max: 5, v: 1, navn: 'b (startverdi)' } }, funksjoner: [{ f: 'a*x+b', pen: 'lin', navn: 'f(x)', farge: TEAL }], xmin: -5, xmax: 5, ymin: -10, ymax: 10, tabell: true, tittel: 'Lineær funksjon' }),
    C('regel', 'Kjennetegn', ['Konstant endring: legger du til like mye hver gang.', 'Graf: rett linje.', 'a: endring per steg. b: verdien når x = 0.']),
    O(2, [
      T('f(x) = 3x + 2. Hva er f(4)?', 14, '3 · 4 + 2.', '14.'),
      T('f(x) = −x + 7. Hva er f(2)?', 5, '−2 + 7.', 'Sett inn x = 2: f(2) = −2 + 7 = 5.'),
      T('Tabell: x = 0, 1, 2, 3 gir y = 4, 7, 10, 13. Hvor mye øker y per steg?', 3, '7 − 4.', 'y går 4, 7, 10, 13. Hvert steg er +3 (7 − 4 = 3), så y øker med 3 per steg.')
    ])
  ]));
  U1.push(S('Andregradsfunksjoner og parabler', '🏀', [
    P('Hvis x² er med i formelen, får vi en <strong>parabel</strong>. Parabelen har et <strong>toppunkt</strong> eller <strong>bunnpunkt</strong>, og er <strong>symmetrisk</strong> om en loddrett linje. Hvis <strong>a &gt; 0</strong> åpner parabelen seg <strong>oppover</strong> (smilemunn). Hvis <strong>a &lt; 0</strong> åpner den seg <strong>nedover</strong> (surmunn).'),
    W('graf', { params: { a: { min: -3, max: 3, v: 1, navn: 'a', steg: 0.5 }, c: { min: -5, max: 5, v: -4, navn: 'c' } }, funksjoner: [{ f: 'a*x^2+c', pen: 'kv', navn: 'f(x)', farge: PLUM }], xmin: -5, xmax: 5, ymin: -10, ymax: 10, tabell: true, tittel: 'Parabel: dra i a og c' }),
    E('Lag verditabell for f(x) = x² − 4.', ['x = −2: (−2)² − 4 = 4 − 4 = 0.', 'x = 0: 0 − 4 = −4. x = 2: 4 − 4 = 0.', 'Tabellen er symmetrisk: f(−2) = f(2). Nullpunktene er x = −2 og x = 2.']),
    C('advarsel', 'Pass på', '(−3)² = 9, men −3² = −9. Parentesen betyr alt!'),
    O(3, [
      T('f(x) = x². Hva er f(5)?', 25, '5 · 5.', '25.'),
      T('f(x) = x². Hva er f(−5)?', 25, '(−5) · (−5).', '25. Symmetri: f(−5) = f(5).'),
      T('f(x) = x² − 4. Hva er f(3)?', 5, '9 − 4.', 'Sett inn x = 3: 3² − 4 = 9 − 4 = 5.'),
      T('f(x) = x² − 4. Hva er f(0)?', -4, '0 − 4.', '−4. Det er bunnpunktet.'),
      T('f(x) = 2x² + 1. Hva er f(3)?', 19, '2 · 9 + 1.', '19.'),
      V('Parabelen y = −x² + 3 åpner seg…', ['nedover', 'oppover', 'mot høyre', 'ikke i det hele tatt'], 0, 'a = −1.', 'a er negativ, så den åpner nedover.')
    ])
  ]));
  U1.push(S('Eksponentialfunksjoner', '📈', [
    P('I en <strong>eksponentialfunksjon</strong> står x i eksponenten: <strong>y = a · bˣ</strong>. Tallet <strong>a</strong> er startverdien (x = 0), og <strong>b</strong> er <strong>vekstfaktoren</strong>: y ganges med b for hvert steg i x. Hvis b &gt; 1 vokser den. Hvis 0 &lt; b &lt; 1 avtar den.'),
    W('graf', { params: EKS, funksjoner: [{ f: 'a*b^x', pen: 'eks', navn: 'f(x)', farge: ORANGE }], xmin: 0, xmax: 10, ymin: 0, ymax: 600, tabell: true, tittel: 'Eksponentiell: dra i a og b' }),
    E('f(x) = 100 · 2ˣ. Lag verditabell.', ['x = 0: 100 · 2⁰ = 100 · 1 = 100.', 'x = 1: 100 · 2 = 200. x = 2: 100 · 4 = 400.', 'Hver gang x øker med 1, <strong>dobles</strong> y: 100, 200, 400, 800 …']),
    C('regel', 'Kjennetegn', ['Konstant <strong>forhold</strong>: y ganges med samme tall hver gang.', 'Graf: krum, stiger raskere og raskere (b > 1) eller flater ut (b < 1).', 'Bruk: renter, bakterier, forfall.']),
    O(4, [
      T('f(x) = 5 · 2ˣ. Hva er f(3)?', 40, '5 · 8.', '5 · 2³ = 5 · 8 = 40.'),
      T('f(x) = 100 · 2ˣ. Hva er f(4)?', 1600, '100 · 16.', '1600.'),
      T('f(x) = 80 · 0,5ˣ. Hva er f(2)?', 20, '80 · 0,25.', '80 · 0,25 = 20.'),
      T('f(x) = 3 · 10ˣ. Hva er f(2)?', 300, '3 · 100.', '300.'),
      T('Startverdien er 50 og vekstfaktoren er 3. Hva er y etter 2 steg?', 450, '50 · 3 · 3.', '50 · 9 = 450.')
    ])
  ]));
  U1.push(S('Brøkfunksjoner', '➗', [
    P('En <strong>brøkfunksjon</strong> har x i nevneren: <strong>y = k/x</strong>. Når x øker, <strong>minker</strong> y. Produktet x · y er alltid <strong>k</strong>. Man sier at x og y er <strong>omvendt proporsjonale</strong>. Funksjonen finnes ikke for x = 0, siden man ikke kan dele på 0.'),
    W('graf', { params: { k: { min: 1, max: 12, v: 6, navn: 'k' } }, funksjoner: [{ f: 'k/x', navn: 'y = k/x', farge: TEAL }], xmin: -8, xmax: 8, ymin: -8, ymax: 8, tabell: true, tittel: 'Brøkfunksjon y = k/x' }),
    E('Du skal kjøre 120 km. Hvor lang tid tar det med fart x km/t?', ['Tid = strekning ÷ fart: t = 120/x.', 'Fart 60 gir t = 2 timer. Fart 120 gir t = 1 time.', 'Dobler du farten, halveres tiden. Det er omvendt proporsjonalitet.']),
    C('advarsel', 'x kan ikke være 0', 'Å dele på 0 er ikke definert. Grafen har derfor ingen punkt for x = 0.'),
    O(4, [
      T('f(x) = 12/x. Hva er f(3)?', 4, '12 ÷ 3.', 'Sett inn x = 3: f(3) = 12 ÷ 3 = 4.'),
      T('f(x) = 12/x. Hva er f(4)?', 3, '12 ÷ 4.', 'Sett inn x = 4: f(4) = 12 ÷ 4 = 3.'),
      T('f(x) = 12/x. Hva er f(6)?', 2, '12 ÷ 6.', 'Sett inn x = 6: f(6) = 12 ÷ 6 = 2.'),
      T('Det går 60 km. Du kjører 20 km/t. Hvor mange timer? (t = 60/x)', 3, '60 ÷ 20.', '3 timer.', 't'),
      V('Når x blir dobbelt så stor i y = k/x, hva skjer med y?', ['Y halveres', 'Y dobles', 'Y er uendret', 'Y blir 0'], 0, 'Prøv k = 12: x = 2 gir 6, x = 4 gir 3.', 'y halveres: omvendt proporsjonal.')
    ])
  ]));
  U1.push(S('Gjenkjenne funksjonstype fra tabell', '🕵️', [
    P('Du kan se på en verditabell hvilken funksjonstype det er:'),
    TAB(['Mønster i tabellen', 'Type', 'Eksempel'], [['y øker med like mye (<strong>differanse</strong> konstant)', 'Lineær', '3, 7, 11, 15'], ['y ganges med likt tall (<strong>forhold</strong> konstant)', 'Eksponential', '3, 6, 12, 24'], ['Forskjellene øker jevnt (andre differanse konstant)', 'Andregrad', '0, 1, 4, 9'], ['x · y er konstant', 'Brøk', '12, 6, 4, 3']]),
    E('Hva slags funksjon er x: 0, 1, 2, 3 og y: 5, 10, 20, 40?', ['Differanser: 5, 10, 20. Ikke konstante, så ikke lineær.', 'Forhold: 10 ÷ 5 = 2, 20 ÷ 10 = 2, 40 ÷ 20 = 2. Konstant!', 'Det er en eksponentialfunksjon: y = 5 · 2ˣ.']),
    O(5, [
      V('y: 2, 5, 8, 11. Hvilken type?', ['Lineær', 'Eksponential', 'Andregrad', 'Brøk'], 0, 'Differansen er 3 hver gang.', 'Differanse konstant: lineær.', true),
      V('y: 2, 6, 18, 54. Hvilken type?', ['Eksponential', 'Lineær', 'Andregrad', 'Brøk'], 0, 'Forholdet er 3.', 'Hver gang ganges med 3: eksponentiell.', true),
      V('y: 0, 1, 4, 9, 16. Hvilken type?', ['Andregrad', 'Lineær', 'Eksponential', 'Brøk'], 0, 'Kvadrattall.', 'Dette er x²: andregrad.', true),
      V('y: 12, 6, 4, 3. Hvilken type? (x = 1, 2, 3, 4)', ['Brøk', 'Lineær', 'Eksponential', 'Andregrad'], 0, 'x · y = 12.', 'Produktet er 12: brøkfunksjon y = 12/x.', true),
      T('y: 3, 6, 12, 24. Hva blir neste tall?', 48, 'Gang med 2.', '24 · 2 = 48.')
    ])
  ]));
  U1.push(S('Digitale verktøy og sammenlikning', '💻', [
    P('Regneark og GeoGebra tegner grafer raskt. Skriv inn formelen, og se hvordan grafen endrer seg. Du kan også sammenlikne flere typer i samme koordinatsystem.'),
    W('graf', { params: {}, funksjoner: [{ f: '10*x', navn: 'lineær 10x', farge: TEAL }, { f: 'x^2', navn: 'andregrad x²', farge: PLUM }, { f: '2^x', navn: 'eksponential 2ˣ', farge: ORANGE }], xmin: 0, xmax: 10, ymin: 0, ymax: 100, tabell: true, tabellx: [0, 2, 4, 6, 8, 10], tittel: 'Hvem vinner til slutt?' }),
    C('tips', 'Se på bildet', ['Lineær starter bratt men blir forbigått.', 'Andregrad stiger fortere og fortere.', 'Eksponentiell starter sakte, men vinner til slutt, og går til himmels.']),
    O(5, [
      T('Sammenlikn 10x, x² og 2ˣ for x = 10. Hva er 2¹⁰?', 1024, '2 · 2 · … ti ganger.', '1024.'),
      T('x = 10: Hva er x²?', 100, '10 · 10.', '100.'),
      V('Hvilken funksjon vokser raskest for store x: 10x, x² eller 2ˣ?', ['2ˣ', '10x', 'x²', 'Alle like'], 0, 'Se på x = 10.', '2¹⁰ = 1024, mens x² = 100 og 10x = 100.')
    ])
  ]));
  U1.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('En bakteriekultur dobler seg hver time og starter med 10 bakterier. Skriv funksjon, og regn ut antall etter 5 timer.', ['y = 10 · 2ˣ.', 'x = 5: 10 · 2⁵ = 10 · 32.', '320 bakterier.']),
      F('Forklar forskjellen på lineær og eksponentiell vekst med ord og et eksempel.', ['Lineær: legger til like mye hver gang (spar 100 kr hver uke).', 'Eksponentiell: ganger med samme tall hver gang (dobler hver uke).', 'Eksponentiell vekst begynner sakte, men tar til slutt av.']),
      F('Mia sier at y = x² er en lineær funksjon fordi grafen går opp til høyre. Hva er feil?', ['Lineære funksjoner har konstant endring og gir rett linje.', 'For y = x² er endringene 1, 3, 5, 7 … Det er ikke konstant.', 'Grafen er en parabel, ikke en rett linje.'])
    ]),
    SJ('Dette kan du nå', ['Skille mellom lineære, andregrads-, eksponential- og brøkfunksjoner', 'Lage verditabell', 'Kjenne igjen type fra tabell og graf', 'Sammenlikne funksjoner med digitale verktøy'])
  ]));
  M.register('utforsk', '10/funksjonstyper', {
    tittel: 'Funksjonstyper',
    ingress: 'Lineære, andregrads-, eksponential- og brøkfunksjoner har hver sin graf og sin type endring. Du lærer å kjenne dem igjen og sammenlikne dem.',
    mal: ['utforske og sammenligne egenskaper ved lineære funksjoner, eksponentialfunksjoner, brøkfunksjoner og andregradsfunksjoner ved å bruke digitale verktøy'], ordliste: ORD1, seksjoner: U1
  });
  const T1 = [];
  T1.push(S('Steg 1: Navnene', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    TAB(['Formel', 'Navn'], [['y = 2x + 1', 'Lineær: rett linje'], ['y = x²', 'Andregrad: parabel'], ['y = 3 · 2ˣ', 'Eksponentiell: vokser fort'], ['y = 6/x', 'Brøk: avtar']]),
    OS([
      V('y = 3x + 2 er…', ['lineær', 'andregrad', 'eksponentiell'], 0, 'Rett linje.', 'Lineær.', true),
      V('y = x² er…', ['andregrad', 'lineær', 'brøk'], 0, 'x i andre.', 'Andregrad.', true)
    ])
  ]));
  T1.push(S('Steg 2: Parabel', '2', [
    G('x² gir en kurve som en smilemunn.'),
    W('graf', { params: { c: { min: -5, max: 5, v: 0, navn: 'c' } }, funksjoner: [{ f: 'x^2+c', pen: 'kv', navn: 'f(x)', farge: PLUM }], xmin: -5, xmax: 5, ymin: -10, ymax: 15, tabell: true, tittel: 'Parabel: dra i c' }),
    E('f(x) = x². Hva er f(3)?', ['x = 3. Regn 3 · 3.', '9.', 'Svar: 9. 🎉']),
    OS([
      T('f(x) = x². Hva er f(4)?', 16, '4 · 4.', '16.'),
      T('f(x) = x². Hva er f(−2)?', 4, '(−2) · (−2).', 'Sett inn x = −2: (−2)² = (−2) · (−2) = 4. Minus ganger minus gir pluss.'),
      T('f(x) = x² + 1. Hva er f(3)?', 10, '9 + 1.', '10.')
    ])
  ]));
  T1.push(S('Steg 3: Dobling', '3', [
    G('En eksponentiell funksjon ganger med samme tall hver gang.'),
    E('Start 5. Dobler hver gang: 5, 10, 20, …. Hva er neste?', ['Gang med 2.', '20 · 2 = 40.', 'Svar: 40. 🎉']),
    OS([
      T('Start 3, dobler hver gang: 3, 6, 12, … Neste tall?', 24, '12 · 2.', '24.'),
      T('Start 100, halveres hver gang: 100, 50, 25 … Hva er neste? (25 ÷ 2)', 12.5, '25 ÷ 2.', '12,5.'),
      T('Start 2, ganges med 3: 2, 6, 18 … Neste tall?', 54, '18 · 3.', '54.')
    ])
  ]));
  T1.push(S('Steg 4: Finn typen', '4', [
    G('Se på tallene i tabellen.'),
    C('regel', 'Husk', ['Legger til like mye → lineær.', 'Ganger med like mye → eksponentiell.']),
    OS([
      V('2, 5, 8, 11: legges det til eller ganges det med?', ['Legges til 3', 'Ganges med 3'], 0, '5 − 2 = 3.', 'Legges til 3: lineær.', true),
      V('2, 6, 18, 54: legges det til eller ganges det med?', ['Ganges med 3', 'Legges til 4'], 0, '6 ÷ 2 = 3.', 'Ganges med 3: eksponentiell.', true),
      T('4, 8, 12, 16. Hvor mye legges til hver gang?', 4, '8 − 4.', '8 − 4 = 4, 12 − 8 = 4, 16 − 12 = 4. Det legges til 4 hver gang.')
    ]),
    SJ('Dette kan du nå', ['Navn på funksjonstyper', 'Regne verdier i x²', 'Forstå dobling', 'Se forskjell på lineær og eksponentiell'])
  ]));
  M.register('steg', '10/funksjonstyper', {
    tittel: 'Funksjonstyper',
    ingress: 'Små steg: du møter funksjoner som lager rette linjer, parabler og doblinger.',
    mal: ['kjenne igjen funksjonstyper'], ordliste: ORD1, seksjoner: T1
  });
  M.ekstra['10/funksjonstyper'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('kv', '🏀', 'x² + c', 8, 'Regn ut funksjonsverdien.', function (r) {
      const a = r.int(1, lett ? 2 : 4), c = r.int(-6, 9), x = r.int(-5, 6); const y = a * x * x + c; return H.e('f(x) = ' + (a === 1 ? '' : a) + 'x² ' + (c < 0 ? '− ' + (-c) : '+ ' + c) + '. Hva er f(' + (x < 0 ? '−' + (-x) : x) + ')?', y, a + ' · ' + x * x + ' ' + (c < 0 ? '− ' + (-c) : '+ ' + c) + ' = ' + M.fmt(y));
    }));
    sek.push(H.ek('eks', '📈', 'a · bˣ', 8, 'Regn ut funksjonsverdien.', function (r) {
      const a = r.int(1, 9), b = r.pick(lett ? [2, 3] : [2, 3, 4, 5, 10]), x = r.int(1, lett ? 3 : 4); return H.e('f(x) = ' + a + ' · ' + b + 'ˣ. Hva er f(' + x + ')?', a * Math.pow(b, x), a + ' · ' + b + '^' + x + ' = ' + a + ' · ' + Math.pow(b, x) + ' = ' + a * Math.pow(b, x));
    }));
    sek.push(H.ek('brok', '➗', 'k/x', 6, 'Regn ut funksjonsverdien.', function (r) {
      const x = r.int(2, 9), q = r.int(1, 9), k = x * q; return H.e('f(x) = ' + k + '/x. Hva er f(' + x + ')?', q, k + ' ÷ ' + x + ' = ' + q);
    }));
    sek.push(H.ek('neste', '🔮', 'Neste tall', 6, 'Finn neste tall i rekka (lineær eller eksponentiell).', function (r) {
      const ek = r.int(0, 1) === 1 && !lett; if (ek) { const a = r.int(1, 5), b = r.int(2, 3); return H.e(a + ', ' + a * b + ', ' + a * b * b + ', …', a * b * b * b, 'Ganges med ' + b + ': ' + a * b * b + ' · ' + b + ' = ' + a * b * b * b); }
      const a = r.int(1, 9), d = r.int(2, 8); return H.e(a + ', ' + (a + d) + ', ' + (a + 2 * d) + ', …', a + 3 * d, 'Legger til ' + d + ': ' + (a + 2 * d) + ' + ' + d + ' = ' + (a + 3 * d));
    }));
    return H.ekDef('Funksjonstyper', sek);
  };

  /* ================= VEKSTFAKTOR ================= */
  const ORD2 = [
    ord(['vekstfaktor', 'vekstfaktoren'], 'Tallet du ganger med for å få ny verdi. 5 % økning gir 1,05. 20 % nedgang gir 0,80.'),
    ord(['prosent'], 'Hundredeler. 5 % er 5 av 100, altså 0,05.'),
    ord(['økning', 'prosentvis økning'], 'Når noe blir større. Vekstfaktoren er da større enn 1.'),
    ord(['nedgang', 'reduksjon', 'prosentvis nedgang'], 'Når noe blir mindre. Vekstfaktoren er da mindre enn 1.'),
    ord(['eksponentiell vekst'], 'Når noe vokser med samme prosent hver periode. Verdien ganges med vekstfaktoren gang på gang.'),
    ord(['eksponentielt forfall', 'forfall'], 'Når noe avtar med samme prosent hver periode.'),
    ord(['startverdi'], 'Verdien du starter med.'),
    ord(['periode', 'perioder'], 'Et tidsrom, for eksempel et år eller en time.'),
    ord(['fordobling', 'doble'], 'Når noe blir 2 ganger så stort. Vekstfaktor 2.'),
    ord(['halveringstid'], 'Tiden det tar før noe er halvert.'),
    ord(['opprinnelig'], 'Den verdien du hadde før endringen.')
  ];
  const U2 = [];
  U2.push(S('Fra prosent til vekstfaktor', '％', [
    P('Å finne 20 % av noe og legge det til er to regnestykker. Med <strong>vekstfaktor</strong> gjør du det i ett: <strong>ganger med 1,20</strong>. Hvorfor? 100 % + 20 % = 120 % = 1,20.'),
    TAB(['Endring', 'Regn', 'Vekstfaktor'], [['Økning 20 %', '100 % + 20 % = 120 %', '1,20'], ['Økning 5 %', '100 % + 5 % = 105 %', '1,05'], ['Nedgang 20 %', '100 % − 20 % = 80 %', '0,80'], ['Nedgang 3 %', '100 % − 3 % = 97 %', '0,97'], ['Dobling (100 % økning)', '100 % + 100 % = 200 %', '2']]),
    C('regel', 'Regel', ['Økning p %: vekstfaktor = 1 + p/100', 'Nedgang p %: vekstfaktor = 1 − p/100', 'ny verdi = gammel verdi · vekstfaktor']),
    O(1, [
      T('Hva er vekstfaktoren ved 10 % økning?', 1.1, '1 + 0,10.', '1,1.'),
      T('Hva er vekstfaktoren ved 25 % økning?', 1.25, '1 + 0,25.', '1,25.'),
      T('Hva er vekstfaktoren ved 10 % nedgang?', 0.9, '1 − 0,10.', '0,9.'),
      T('Hva er vekstfaktoren ved 30 % nedgang?', 0.7, '1 − 0,30.', '0,7.'),
      T('Hva er vekstfaktoren ved 100 % økning (dobling)?', 2, '1 + 1.', 'Økning på 100 % betyr 1 + 1,00 = 2. Vekstfaktoren er 2.')
    ])
  ]));
  U2.push(S('Regne med vekstfaktor', '🧮', [
    P('<strong>Ny verdi = gammel verdi · vekstfaktor.</strong> Én multiplikasjon gjør jobben.'),
    E('En jakke koster 800 kr. Prisen går opp 15 %. Hva er den nye prisen?', ['Vekstfaktor: 1 + 0,15 = 1,15.', '800 · 1,15 = 920.', 'Svar: 920 kr.']),
    E('En sofa koster 6000 kr. Den får 25 % rabatt. Hva koster den nå?', ['Vekstfaktor: 1 − 0,25 = 0,75.', '6000 · 0,75 = 4500.', 'Svar: 4500 kr.']),
    O(2, [
      T('800 kr økes med 15 %. Ny pris?', 920, '800 · 1,15.', '920.', 'kr'),
      T('6000 kr reduseres med 25 %. Ny pris?', 4500, '6000 · 0,75.', '4500.', 'kr'),
      T('200 kr økes med 10 %. Ny pris?', 220, '200 · 1,1.', '220.', 'kr'),
      T('500 kr reduseres med 20 %. Ny pris?', 400, '500 · 0,8.', '400.', 'kr'),
      T('Befolkningen er 40 000 og øker med 5 %. Hvor mange er det nå?', 42000, '40 000 · 1,05.', '42000.')
    ])
  ]));
  U2.push(S('Finne prosentvis endring', '🔎', [
    P('Hvis du kjenner gammel og ny verdi, regner du <strong>vekstfaktor = ny ÷ gammel</strong>. Så leser du av prosenten: 1,25 betyr 25 % økning. 0,85 betyr 15 % nedgang.'),
    E('Prisen gikk fra 400 kr til 460 kr. Hvor mange prosent økte den?', ['Vekstfaktor = 460 ÷ 400 = 1,15.', '1,15 er 15 % mer.', 'Svar: 15 % økning.']),
    E('En vare ble satt ned fra 500 kr til 400 kr. Hvor mange prosent?', ['Vekstfaktor = 400 ÷ 500 = 0,8.', '1 − 0,8 = 0,2.', 'Svar: 20 % nedgang.']),
    O(3, [
      T('Fra 400 kr til 460 kr. Hva er vekstfaktoren?', 1.15, '460 ÷ 400.', '1,15.'),
      T('Fra 400 kr til 460 kr. Hvor mange prosent økning?', 15, '1,15 gir 15 %.', '15 %.', '%'),
      T('Fra 500 kr til 400 kr. Hvor mange prosent nedgang?', 20, '400 ÷ 500 = 0,8.', '20 %.', '%'),
      T('Fra 80 til 100. Hvor mange prosent økning?', 25, '100 ÷ 80 = 1,25.', '25 %.', '%'),
      T('Fra 200 til 150. Hvor mange prosent nedgang?', 25, '150 ÷ 200 = 0,75.', '25 %.', '%')
    ])
  ]));
  U2.push(S('Flere perioder: potenser av vekstfaktor', '📅', [
    P('Hvis noe endrer seg med samme prosent flere ganger på rad, ganger du med vekstfaktoren <strong>flere ganger</strong>. Etter n perioder: <strong>ny = start · vⁿ</strong>.'),
    E('Du setter 1000 kr på konto med 10 % rente i året. Hvor mye har du etter 3 år?', ['Vekstfaktor: 1,10.', 'Etter 3 år: 1000 · 1,10³.', '1,10³ = 1,331. 1000 · 1,331 = 1331. Svar: 1331 kr.']),
    C('advarsel', 'Ikke bare legg til!', '10 % i 3 år er ikke 30 %. Du får rente på renten: 1,1³ = 1,331, altså 33,1 %.'),
    O(4, [
      T('1000 kr, 10 % rente, 2 år. Hva har du?', 1210, '1000 · 1,21.', '1,1² = 1,21. 1210.', 'kr'),
      T('1000 kr, 10 % rente, 3 år. Hva har du?', 1331, '1000 · 1,331.', '1331.', 'kr'),
      T('200 kr øker 50 % to ganger. Hva er verdien? (1,5² = 2,25)', 450, '200 · 2,25.', '450.'),
      T('1000 kr taper 10 % verdi hvert år i 2 år. Hva er verdien? (0,9² = 0,81)', 810, '1000 · 0,81.', '810.', 'kr'),
      T('Verdien dobles tre ganger. Startverdi 5. Hva er verdien? (2³ = 8)', 40, '5 · 8.', '40.')
    ])
  ]));
  U2.push(S('Eksponentiell vekst og forfall', '📈', [
    P('Hvis noe øker eller minker med <strong>samme prosent</strong> hver periode, er det en <strong>eksponentialfunksjon</strong>: <strong>y = a · vˣ</strong>. Tallet a er startverdien og v er vekstfaktoren. Hvis v &gt; 1 vokser det (vekst), hvis v &lt; 1 avtar det (forfall).'),
    W('graf', { params: EKS, funksjoner: [{ f: 'a*b^x', pen: 'eks', navn: 'y', farge: ORANGE }], xmin: 0, xmax: 10, ymin: 0, ymax: 600, tabell: true, tittel: 'Prøv vekst og forfall' }),
    O(4, [
      V('Vekstfaktor 1,05. Hva skjer?', ['Øker 5 % per periode', 'Minker 5 %', 'Øker 105 %', 'Ingenting'], 0, 'Over 1 betyr vekst.', '1,05 er 5 % økning.', true),
      V('Vekstfaktor 0,9. Hva skjer?', ['Minker 10 % per periode', 'Øker 9 %', 'Øker 90 %', 'Minker 90 %'], 0, '1 − 0,9 = 0,1.', '0,9 er 10 % nedgang.', true),
      T('Bakterier: start 100, vekstfaktor 2 per time. Hvor mange etter 4 timer?', 1600, '100 · 2⁴.', '100 · 16 = 1600.'),
      T('Verdien til en bil faller 10 % hvert år fra 200 000 kr. Hva er den etter 1 år?', 180000, '200 000 · 0,9.', '180000 kr.', 'kr'),
      T('Verdien til en bil faller 10 % hvert år fra 200 000 kr. Hva er den etter 2 år? (0,9² = 0,81)', 162000, '200 000 · 0,81.', '162000 kr.', 'kr')
    ])
  ]));
  U2.push(S('Å finne opprinnelig verdi', '⏪', [
    P('Hvis du kjenner prisen <strong>etter</strong> endringen, deler du på vekstfaktoren for å få prisen <strong>før</strong>.'),
    E('Etter 20 % rabatt koster en vare 400 kr. Hva var prisen før?', ['Vekstfaktor: 0,80.', 'ny = gammel · 0,80, så gammel = 400 ÷ 0,80.', '400 ÷ 0,8 = 500. Svar: 500 kr.']),
    C('advarsel', 'Pass på', 'Å regne 20 % av 400 og legge til gir 480, men det er feil. Rabatten på 20 % ble regnet av den <em>gamle</em> prisen, ikke den nye.'),
    O(5, [
      T('Etter 20 % rabatt koster en vare 400 kr. Hva var prisen før?', 500, '400 ÷ 0,8.', '500.', 'kr'),
      T('Etter 25 % økning er prisen 250 kr. Hva var den før?', 200, '250 ÷ 1,25.', '200.', 'kr'),
      T('Etter 10 % rabatt koster varen 90 kr. Hva var prisen før?', 100, '90 ÷ 0,9.', '100.', 'kr'),
      T('Etter 50 % økning er verdien 60. Hva var den før?', 40, '60 ÷ 1,5.', '40.')
    ])
  ]));
  U2.push(S('Sammensatte endringer', '🔀', [
    P('Hva skjer hvis noe øker 20 % og så minker 20 %? Du er ikke tilbake der du startet! Fordi prosentene regnes av ulike tall.'),
    E('En aksje på 100 kr stiger 20 % og faller så 20 %. Hva er verdien?', ['Stiger 20 %: 100 · 1,2 = 120.', 'Faller 20 %: 120 · 0,8 = 96.', 'Svar: 96 kr. Den er 4 kr mindre enn start!']),
    O(5, [
      T('100 kr øker 20 % og minker så 20 %. Hva er verdien?', 96, '100 · 1,2 · 0,8.', '96.', 'kr'),
      T('Hva er 1,2 · 0,8?', 0.96, '1,2 · 0,8.', '0,96.'),
      V('Prisen øker 50 % og så minker 50 %. Er prisen tilbake?', ['Nei, den er lavere', 'Ja', 'Nei, den er høyere', 'Vet ikke'], 0, '1,5 · 0,5.', '1,5 · 0,5 = 0,75. Prisen er 25 % lavere enn start.'),
      F('Forklar hvorfor 20 % opp og så 20 % ned ikke gir tilbake startverdien.', ['20 % opp: vekstfaktor 1,2. 20 % ned: vekstfaktor 0,8.', '1,2 · 0,8 = 0,96, ikke 1.', '20 % av en større verdi (120) er mer enn 20 % av startverdien (100).'])
    ])
  ]));
  U2.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('To banker: Bank A gir 3 % rente i året. Bank B gir 2,5 % rente. Du setter 10 000 kr i begge. Hva har du etter 1 år i hver? Hva etter 2 år i A? (1,03² = 1,0609)', ['A etter 1 år: 10 000 · 1,03 = 10 300. B: 10 000 · 1,025 = 10 250.', 'A etter 2 år: 10 000 · 1,0609 = 10 609.', 'A er best. Forskjellen vokser med tiden.']),
      F('Vis hvordan du regner ut hvor mange prosent økning som tilsvarer vekstfaktor 1,15, og hvorfor 15 % to ganger ikke er 30 %.', ['1,15 = 1 + 0,15, så 15 % økning.', 'To ganger: 1,15² = 1,3225, altså 32,25 %.', 'Du får vekst på veksten (rente på rente).']),
      F('Et rykte sprer seg slik at antallet som kjenner det dobles hver time. Hvorfor er dette eksponentiell vekst, og hva skjer etter 10 timer hvis 1 person startet? (2¹⁰ = 1024)', ['Vekstfaktoren er 2 hver time.', 'Etter 10 timer: 1 · 2¹⁰ = 1024 personer.', 'Eksponentiell vekst starter sakte, men blir enorm.'])
    ]),
    SJ('Dette kan du nå', ['Gjøre om prosent til vekstfaktor', 'Regne ny og opprinnelig verdi', 'Regne flere perioder med vⁿ', 'Skille vekst og forfall', 'Forklare eksponentiell vekst'])
  ]));
  M.register('utforsk', '10/vekstfaktor', {
    tittel: 'Prosentvis endring og vekstfaktor',
    ingress: 'Vekstfaktoren gjør prosentregning enkel. Du bruker den på priser, rente og eksponentiell vekst.',
    mal: ['utforske og forklare sammenhengen mellom konstant prosentvis endring, vekstfaktor og eksponentialfunksjoner'], ordliste: ORD2, seksjoner: U2
  });
  const T2 = [];
  T2.push(S('Steg 1: Vekstfaktor', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Vekstfaktor er tallet du ganger med. <strong>10 % økning</strong> betyr at du har 110 % = <strong>1,10</strong>. <strong>10 % nedgang</strong> betyr at du har 90 % = <strong>0,90</strong>.', true),
    TAB(['Endring', 'Vekstfaktor'], [['Økning 10 %', '1,10'], ['Økning 50 %', '1,50'], ['Nedgang 10 %', '0,90'], ['Nedgang 50 %', '0,50']]),
    OS([
      T('Hva er vekstfaktoren ved 20 % økning?', 1.2, '1 + 0,20.', '1,2.'),
      T('Hva er vekstfaktoren ved 20 % nedgang?', 0.8, '1 − 0,20.', '0,8.'),
      V('Hva er vekstfaktoren ved 50 % økning?', ['1,5', '0,5', '5'], 0, '100 % + 50 % = 150 %.', '1,5.', true)
    ])
  ]));
  T2.push(S('Steg 2: Ny pris', '2', [
    G('Nå bruker vi vekstfaktoren.'),
    C('regel', 'Regel', ['ny verdi = gammel verdi · vekstfaktor']),
    E('En vare koster 200 kr og øker 10 %. Ny pris?', ['Vekstfaktor: 1,10.', '200 · 1,10 = 220.', 'Svar: 220 kr. 🎉']),
    OS([
      T('100 kr øker 10 %. Ny pris?', 110, '100 · 1,1.', '110.', 'kr'),
      T('100 kr reduseres 20 %. Ny pris?', 80, '100 · 0,8.', '80.', 'kr'),
      T('500 kr øker 20 %. Ny pris?', 600, '500 · 1,2.', '600.', 'kr')
    ])
  ]));
  T2.push(S('Steg 3: Finn prosenten', '3', [
    G('Hvis vi kjenner begge prisene, finner vi vekstfaktoren.'),
    C('regel', 'Regel', ['vekstfaktor = ny ÷ gammel']),
    E('Fra 200 kr til 250 kr. Hvor mange prosent økning?', ['250 ÷ 200 = 1,25.', '1,25 er 25 % økning.', 'Svar: 25 %. 🎉']),
    OS([
      T('Fra 100 til 120. Hva er vekstfaktoren?', 1.2, '120 ÷ 100.', '1,2.'),
      T('Fra 100 til 120. Hvor mange prosent økning?', 20, 'Vekstfaktoren er 120 ÷ 100. Hva er det over 1?', 'Vekstfaktor 120 ÷ 100 = 1,2. Det er 0,2 over 1, altså 20 % økning.', '%'),
      T('Fra 50 til 25. Hva er vekstfaktoren?', 0.5, '25 ÷ 50.', '0,5.')
    ]),
    SJ('Dette kan du nå', ['Gjøre prosent om til vekstfaktor', 'Regne ny verdi', 'Finne prosenten når du kjenner begge verdier'])
  ]));
  M.register('steg', '10/vekstfaktor', {
    tittel: 'Prosentvis endring og vekstfaktor',
    ingress: 'Små steg: vekstfaktor gjør prosentregning til en enkel gangeoppgave.',
    mal: ['regne med vekstfaktor'], ordliste: ORD2, seksjoner: T2
  });
  M.ekstra['10/vekstfaktor'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('fakt', '％', 'Vekstfaktor', 8, 'Hva er vekstfaktoren?', function (r) {
      const p = r.pick(lett ? [10, 20, 50] : [5, 10, 15, 20, 25, 30, 40, 50, 75]), opp = r.int(0, 1) === 1; const v = opp ? 1 + p / 100 : 1 - p / 100; return H.e(p + ' % ' + (opp ? 'økning' : 'nedgang'), Math.round(v * 100) / 100, (opp ? '1 + ' : '1 − ') + M.fmt(p / 100) + ' = ' + M.fmt(Math.round(v * 100) / 100));
    }));
    sek.push(H.ek('ny', '🧮', 'Ny verdi', 8, 'Regn ut ny verdi.', function (r) {
      const g = r.pick([100, 200, 400, 500, 800, 1000, 2000]), p = r.pick(lett ? [10, 20, 50] : [5, 10, 15, 20, 25, 30, 50]), opp = r.int(0, 1) === 1; const v = opp ? 1 + p / 100 : 1 - p / 100; const n = Math.round(g * v * 1000) / 1000;
      return H.e(g + ' kr ' + (opp ? 'øker' : 'reduseres') + ' med ' + p + ' %. Ny pris?', n, g + ' · ' + M.fmt(Math.round(v * 100) / 100) + ' = ' + M.fmt(n) + ' kr');
    }));
    sek.push(H.ek('pst', '🔎', 'Prosentvis endring', 6, 'Hvor mange prosent økte det? (Svar som positivt tall.)', function (r) {
      const g = r.pick([20, 40, 50, 80, 100, 200, 400]), p = r.pick([10, 20, 25, 50, 75, 100]); const n = g * (1 + p / 100); if (Math.abs(n * 1000 - Math.round(n * 1000)) > 1e-6) return H.e('Fra 100 til 125.', 25, '125 ÷ 100 = 1,25, så 25 %');
      return H.e('Fra ' + g + ' til ' + M.fmt(n) + '.', p, M.fmt(n) + ' ÷ ' + g + ' = ' + M.fmt(1 + p / 100) + ', så ' + p + ' %');
    }));
    sek.push(H.ek('rente', '🏦', 'Rente på rente', 6, 'Regn ut saldoen.', function (r) {
      const s = r.pick([1000, 2000, 5000, 10000]), p = r.pick([10, 20, 50, 100]), n = lett ? 2 : r.int(2, 3); const v = 1 + p / 100; const res = Math.round(s * Math.pow(v, n) * 1000) / 1000;
      return H.e(s + ' kr med ' + p + ' % økning per år i ' + n + ' år.', res, s + ' · ' + M.fmt(v) + '^' + n + ' = ' + M.fmt(res));
    }));
    return H.ekDef('Vekstfaktor', sek);
  };
})();
