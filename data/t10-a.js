/* ============================================================
   10. trinn: Algebra og generalisering + Kvadratsetningene
   Læreplan 10.1 og 10.2
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, SJ, S, ord } = H;

  /* ================= ALGEBRA ================= */
  const ORD1 = [
    ord(['algebra'], 'Å regne med bokstaver i stedet for tall.'),
    ord(['uttrykk', 'uttrykket'], 'Tall, bokstaver og regnetegn satt sammen, for eksempel 3x + 5.'),
    ord(['ledd'], 'Delene i et uttrykk som er skilt med + eller −. I 3x + 5 er 3x og 5 to ledd.'),
    ord(['koeffisient'], 'Tallet som står foran bokstaven. I 3x er koeffisienten 3.'),
    ord(['konstantledd'], 'Leddet uten bokstav, for eksempel 5 i 3x + 5.'),
    ord(['forenkle'], 'Skrive et uttrykk kortere og enklere uten å endre verdien.'),
    ord(['faktorisere'], 'Skrive et uttrykk som et produkt. 6x + 12 = 6(x + 2).'),
    ord(['generalisere', 'generalisering'], 'Å finne en regel som gjelder for alle tall, ikke bare noen få.'),
    ord(['formel'], 'En regel skrevet med bokstaver, for eksempel A = l · b.'),
    ord(['bevis', 'bevise'], 'En forklaring som viser at noe alltid stemmer.'),
    ord(['parentes', 'parenteser'], 'Tegn som viser hva som skal regnes først.'),
    ord(['variabel'], 'En bokstav som står for et tall som kan variere.')
  ];
  const U1 = [];
  U1.push(S('Bokstaver er tall i forkledning', '🔤', [
    P('I algebra bruker vi <strong>bokstaver</strong> når vi ikke kjenner tallet, eller når en regel skal gjelde for <strong>alle</strong> tall. <strong>n + 3</strong> betyr «et tall pluss 3». <strong>2n</strong> betyr «to ganger tallet». Skriver du 2 · n, trenger du ikke gangetegn: 2n.'),
    TAB(['Med ord', 'Algebra'], [['et tall pluss 5', 'n + 5'], ['tredoblet av et tall', '3n'], ['et tall minus 2', 'n − 2'], ['halvparten av et tall', 'n/2'], ['kvadratet av et tall', 'n²'], ['to mer enn det dobbelte av et tall', '2n + 2']]),
    C('tips', 'Sette inn tall', 'For å regne ut 3x + 5 når x = 4 setter du 4 der x står: 3 · 4 + 5 = 17.'),
    E('Regn ut 2x + 7 når x = 5.', ['Sett inn 5: 2 · 5 + 7.', '10 + 7.', 'Svar: 17.']),
    O(1, [
      T('Hva er 3x + 2 når x = 4?', 14, 'Sett inn 4.', '3 · 4 + 2 = 14.'),
      T('Hva er 5n − 3 når n = 6?', 27, '5 · 6 − 3.', '30 − 3 = 27.'),
      T('Hva er x² når x = 7?', 49, '7 · 7.', '7 · 7 = 49.'),
      T('Hva er 2a + 3b når a = 4 og b = 5?', 23, '2 · 4 + 3 · 5.', '8 + 15 = 23.'),
      V('Hvilket uttrykk betyr «tre mer enn det dobbelte av n»?', ['2n + 3', '3n + 2', '2(n + 3)', 'n + 5'], 0, 'Dobbelt først, så pluss 3.', 'Dobbelt av n er 2n, og 3 mer er 2n + 3.')
    ])
  ]));
  U1.push(S('Mønster og generalisering', '🧩', [
    P('Algebra er et språk for mønstre. Hvis du finner regelen for figur nummer <strong>n</strong>, kan du regne ut figur nummer 100 uten å tegne den.'),
    W('figurtall', { type: 'fyrstikk', n: 4, maxN: 10, tittel: 'Fyrstikkmønster: hvor mange fyrstikker i figur n?' }),
    E('Fyrstikkmønsteret har 4 fyrstikker i figur 1, 7 i figur 2 og 10 i figur 3. Finn regel for figur n.', ['Hver gang kommer 3 flere. Differansen er 3, så regelen starter med 3n.', 'Figur 1: 3 · 1 = 3, men vi har 4. Vi må legge til 1.', 'Regel: 3n + 1. Sjekk: n = 3 gir 3 · 3 + 1 = 10 ✓.']),
    C('regel', 'Slik finner du regelen', ['1. Finn differansen mellom tallene. Den blir tallet foran n.', '2. Sjekk hva figur 1 gir, og juster med et konstantledd.', '3. Test regelen på en figur du ikke brukte til å finne den.']),
    O(2, [
      T('Mønster: 5, 8, 11, 14 … Hva er differansen?', 3, '8 − 5.', '8 − 5 = 3.'),
      T('Regelen er 3n + 2. Hva er tall nummer 10?', 32, 'Sett inn n = 10.', '3 · 10 + 2 = 32.'),
      T('Regelen er 4n − 1. Hva er tall nummer 25?', 99, '4 · 25 − 1.', '100 − 1 = 99.'),
      T('Mønster: 2, 5, 8, 11 … Regelen er 3n − 1. Hvilket nummer har tallet 29?', 10, '3n − 1 = 29.', '3n = 30, så n = 10.'),
      V('Mønster: 4, 7, 10, 13 … Hvilken regel passer?', ['3n + 1', '4n', 'n + 3', '3n + 4'], 0, 'Differanse 3, og figur 1 er 4.', '3 · 1 + 1 = 4 og 3 · 2 + 1 = 7. Regelen er 3n + 1.')
    ])
  ]));
  U1.push(S('Regneregler og parenteser', '🧮', [
    P('Algebra bruker de samme regnereglene som vanlig regning. Den viktigste er den <strong>distributive loven</strong>: <strong>a(b + c) = ab + ac</strong>. Ganger du med en parentes, må du gange <em>alle</em> leddene inni.'),
    W('arealmodell', { type: 'dist', a: 3, b: 4, c: 2, tittel: 'Arealmodell for a(b + c)' }),
    E('Gang ut 3(x + 4).', ['Gang 3 med hvert ledd i parentesen.', '3 · x = 3x og 3 · 4 = 12.', 'Svar: 3x + 12.']),
    E('Gang ut 2(x − 5).', ['Gang 2 med x og med −5.', '2x og −10.', 'Svar: 2x − 10.']),
    C('advarsel', 'Pass på minus!', 'Foran parentesen står −: −(x + 3) = −x − 3. Minus snur <strong>alle</strong> fortegnene inni. Ikke bare det første!'),
    O(3, [
      T('Gang ut 3(x + 4). Hva blir konstantleddet?', 12, '3 · 4.', '3(x + 4) = 3x + 12. Konstantleddet er 12.'),
      T('Gang ut 5(2x + 3). Hva blir koeffisienten foran x?', 10, '5 · 2.', '5(2x + 3) = 10x + 15. Koeffisienten er 10.'),
      T('Gang ut 4(x − 2). Hva blir konstantleddet?', -8, '4 · (−2).', '4(x − 2) = 4x − 8. Konstantleddet er −8.'),
      T('Regn ut verdien av 3(x + 4) når x = 2.', 18, '3 · 6.', '3 · (2 + 4) = 3 · 6 = 18.'),
      T('Gang ut −(x − 5). Hva blir konstantleddet?', 5, 'Minus snur begge fortegn.', '−(x − 5) = −x + 5. Konstantleddet er 5.')
    ])
  ]));
  U1.push(S('Forenkle uttrykk', '✂️', [
    P('Å <strong>forenkle</strong> betyr å samle like ledd. Ledd med samme bokstav kan legges sammen: 3x + 2x = 5x. Ledd uten bokstav (konstantledd) legges sammen for seg: 4 + 7 = 11. Men x og x² er <strong>ikke</strong> like ledd!'),
    E('Forenkle 3x + 5 + 2x − 1.', ['Samle x-leddene: 3x + 2x = 5x.', 'Samle tallene: 5 − 1 = 4.', 'Svar: 5x + 4.']),
    E('Forenkle 2(x + 3) + 4x.', ['Gang ut: 2x + 6 + 4x.', 'Samle x-ledd: 6x.', 'Svar: 6x + 6.']),
    C('tips', 'Sjekk svaret', 'Test med et tall, for eksempel x = 1. Gir uttrykket før og etter forenkling samme verdi, er du på rett vei. 2(1 + 3) + 4 = 12 og 6 + 6 = 12 ✓.'),
    O(3, [
      T('Forenkle 3x + 5 + 2x − 1. Hva blir koeffisienten foran x?', 5, '3 + 2.', '5x + 4. Koeffisienten er 5.'),
      T('Forenkle 3x + 5 + 2x − 1. Hva blir konstantleddet?', 4, '5 − 1.', '5x + 4. Konstantleddet er 4.'),
      T('Forenkle 2(x + 3) + 4x. Hva blir koeffisienten foran x?', 6, '2 + 4.', '6x + 6. Koeffisienten er 6.'),
      T('Forenkle 5x − 2x + 7 − 3. Hva er verdien når x = 2?', 10, '3x + 4.', '3x + 4, og 3 · 2 + 4 = 10.'),
      V('Hva er 3x + 4x²?', ['Kan ikke forenkles', '7x³', '7x²', '12x³'], 0, 'x og x² er ulike ledd.', 'x og x² er ulike ledd, så uttrykket kan ikke slås sammen.')
    ])
  ]));
  U1.push(S('Faktorisere', '🧱', [
    P('Å <strong>faktorisere</strong> er å gjøre motsatt av å gange ut. Du finner det <strong>største tallet</strong> (og bokstaven) som går opp i alle leddene, og setter det utenfor en parentes. <strong>6x + 12 = 6(x + 2)</strong>.'),
    E('Faktoriser 8x + 12.', ['Største felles faktor for 8 og 12 er 4.', '8x = 4 · 2x og 12 = 4 · 3.', 'Svar: 4(2x + 3). Kontroll: 4 · 2x + 4 · 3 = 8x + 12 ✓.']),
    C('tips', 'Kontroller alltid', 'Gang ut svaret ditt. Da skal du få det du startet med.'),
    O(4, [
      T('Hva er største felles faktor for 6 og 12?', 6, 'Hvilket tall går opp i begge?', '6 går opp i 6 og 12.'),
      T('Faktoriser 6x + 12 = ?(x + 2). Hva står foran parentesen?', 6, 'Størst felles faktor.', '6x + 12 = 6(x + 2).'),
      T('Faktoriser 10x + 15 = ?(2x + 3). Hva står foran parentesen?', 5, 'Største felles faktor for 10 og 15.', '10x + 15 = 5(2x + 3).'),
      T('Faktoriser 12x − 18 = 6(?x − 3). Hva er tallet i spørsmålstegnet?', 2, '12 ÷ 6.', '12x − 18 = 6(2x − 3).'),
      T('Beregn 7 · 13 + 7 · 7 smart ved å faktorisere: 7(13 + 7).', 140, '7 · 20.', '7 · 20 = 140.')
    ])
  ]));
  U1.push(S('Bevise at noe alltid stemmer', '🏛️', [
    P('Hvis du prøver 5 tall og det stemmer hver gang, har du ikke bevist noe. Men med algebra kan du vise at noe <strong>alltid</strong> stemmer. Vi bruker bokstaver for alle tall.'),
    E('Vis at summen av tre påfølgende tall alltid er delelig med 3.', ['Tre påfølgende tall: n, n + 1 og n + 2.', 'Summen: n + (n + 1) + (n + 2) = 3n + 3.', '3n + 3 = 3(n + 1). Det er 3 ganger et helt tall, så det er alltid delelig med 3. ✓']),
    C('regel', 'Nyttige uttrykk', ['Partall: 2n', 'Oddetall: 2n + 1', 'Tre påfølgende tall: n, n + 1, n + 2', 'Et tall delelig med 5: 5n']),
    O(5, [
      F('Vis at summen av to partall alltid er et partall.', ['To partall: 2a og 2b.', 'Summen er 2a + 2b = 2(a + b).', 'Det er 2 ganger et helt tall, så summen er et partall.']),
      F('Vis at summen av to oddetall alltid er et partall.', ['To oddetall: 2a + 1 og 2b + 1.', 'Summen: 2a + 2b + 2 = 2(a + b + 1).', 'Det er 2 ganger et helt tall, så summen er et partall.']),
      F('Vis at produktet av to oddetall alltid er et oddetall.', ['(2a + 1)(2b + 1) = 4ab + 2a + 2b + 1.', 'Det er 2(2ab + a + b) + 1.', 'Det er på formen 2k + 1, så det er et oddetall.']),
      F('Tenk et tall. Gang med 2. Legg til 6. Del på 2. Trekk fra det du tenkte. Hva får du alltid? Vis med algebra.', ['n → 2n → 2n + 6 → (2n + 6) ÷ 2 = n + 3 → n + 3 − n.', 'Svaret er 3.', 'Uansett hvilket tall du velger, blir svaret 3.'])
    ])
  ]));
  U1.push(S('Formler og praktisk algebra', '🛠️', [
    P('<strong>Formler</strong> er algebra i praksis. A = l · b er arealet av et rektangel. Du kan sette inn tall, eller snu formelen for å finne en ukjent.'),
    E('Prisen for en taxi er P = 50 + 20k, der k er antall kilometer. Hvor langt kommer du for 250 kr?', ['Sett P = 250: 50 + 20k = 250.', 'Trekk fra 50: 20k = 200.', 'k = 10. Du kommer 10 km.']),
    O(4, [
      T('P = 50 + 20k. Hva er P når k = 6?', 170, '50 + 20 · 6.', '50 + 120 = 170 kr.', 'kr'),
      T('P = 50 + 20k. Hvor mange km får du for 250 kr?', 10, '20k = 200.', 'k = 10 km.', 'km'),
      T('Arealet av en trekant er A = (g · h) ÷ 2. Grunnlinje 8 og høyde 5. Hva er A?', 20, '8 · 5 ÷ 2.', '40 ÷ 2 = 20.'),
      T('Omkrets av et rektangel er O = 2l + 2b. l = 7 og b = 4. Hva er O?', 22, '14 + 8.', '2 · 7 + 2 · 4 = 22.'),
      T('Temperaturen er F = 1,8C + 32. Hva er F når C = 10?', 50, '1,8 · 10 + 32.', '18 + 32 = 50.')
    ]),
    SJ('Dette kan du nå', ['Bruke bokstaver som variabler', 'Finne regel for et mønster', 'Gange ut parenteser', 'Forenkle uttrykk', 'Faktorisere', 'Bevise at noe alltid stemmer', 'Bruke formler'])
  ]));
  M.register('utforsk', '10/algebra', {
    tittel: 'Algebra og generalisering',
    ingress: 'Algebra er matematikkens språk. Du lærer å regne med bokstaver, finne regler for mønstre og bevise at noe alltid stemmer.',
    mal: ['bruke regneregler og generalisere sammenhenger algebraisk'], ordliste: ORD1, seksjoner: U1
  });
  const T1 = [];
  T1.push(S('Steg 1: Bokstaver som tall', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('En bokstav kan stå for et tall. <strong>3x</strong> betyr 3 ganger x. Hvis x = 4, er 3x = 3 · 4 = 12.', true),
    E('Hva er 2x + 1 når x = 5?', ['Sett inn 5 for x: 2 · 5 + 1.', '2 · 5 = 10. Så 10 + 1 = 11.', 'Svar: 11. 🎉']),
    OS([
      T('Hva er 3x når x = 4?', 12, '3 · 4.', '3 · 4 = 12.'),
      T('Hva er x + 5 når x = 7?', 12, '7 + 5.', '7 + 5 = 12.'),
      T('Hva er 2x + 1 når x = 3?', 7, '2 · 3 + 1.', '6 + 1 = 7.')
    ])
  ]));
  T1.push(S('Steg 2: Mønster', '2', [
    G('Et mønster har en regel.'),
    P('Fyrstikk-figurer: 4, 7, 10, 13 … Hver gang kommer 3 flere. Regelen er <strong>3n + 1</strong>.', true),
    E('Regelen er 3n + 1. Hvor mange fyrstikker i figur 5?', ['Sett n = 5.', '3 · 5 + 1 = 15 + 1.', 'Svar: 16. 🎉']),
    OS([
      T('Regelen er 2n + 1. Hva er tall nummer 4?', 9, '2 · 4 + 1.', '2 · 4 + 1 = 9.'),
      T('Regelen er 3n. Hva er tall nummer 10?', 30, '3 · 10.', '3 · 10 = 30.'),
      T('Mønster: 5, 8, 11, 14. Hvor mye øker det for hvert steg?', 3, '8 − 5.', '8 − 5 = 3.')
    ])
  ]));
  T1.push(S('Steg 3: Gange ut parentes', '3', [
    G('Parentes: gang med alt som står inni.'),
    E('Gang ut 2(x + 3).', ['Gang 2 med x: 2x.', 'Gang 2 med 3: 6.', 'Svar: 2x + 6. 🎉']),
    OS([
      T('2(x + 5) = 2x + ?', 10, '2 · 5.', '2(x + 5) = 2x + 10.'),
      T('3(x + 4) = 3x + ?', 12, '3 · 4.', '3(x + 4) = 3x + 12.'),
      T('4(x + 2) = ?x + 8. Hva er tallet foran x?', 4, 'Tallet utenfor parentesen.', '4(x + 2) = 4x + 8.')
    ])
  ]));
  T1.push(S('Steg 4: Samle ledd', '4', [
    G('Ledd med samme bokstav kan slås sammen.'),
    E('Forenkle 3x + 2x + 4.', ['3x + 2x = 5x.', 'Tallet 4 står for seg selv.', 'Svar: 5x + 4. 🎉']),
    OS([
      T('3x + 2x = ?x', 5, '3 + 2.', '3x + 2x = 5x.'),
      T('4x + x = ?x (husk at x er 1x)', 5, '4 + 1.', '4x + x = 5x.'),
      T('2x + 5 + 3x + 1 = ?x + 6. Hva er tallet foran x?', 5, '2 + 3.', '5x + 6.')
    ]),
    SJ('Dette kan du nå', ['Sette inn tall i et uttrykk', 'Bruke en regel for et mønster', 'Gange ut en parentes', 'Samle like ledd'])
  ]));
  M.register('steg', '10/algebra', {
    tittel: 'Algebra og generalisering',
    ingress: 'Små steg i algebra: sett inn tall, finn regler, gang ut og samle ledd.',
    mal: ['regne med bokstaver'], ordliste: ORD1, seksjoner: T1
  });
  M.ekstra['10/algebra'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('inn', '🔢', 'Sett inn tall', 8, 'Regn ut verdien av uttrykket.', function (r) {
      const a = r.int(2, lett ? 5 : 9), b = r.int(1, 9), x = r.int(2, lett ? 6 : 10); return H.e(a + 'x + ' + b + ' når x = ' + x, a * x + b, a + ' · ' + x + ' + ' + b + ' = ' + (a * x + b));
    }));
    sek.push(H.ek('mons', '🧩', 'Mønster', 6, 'Bruk regelen til å finne tallet.', function (r) {
      const a = r.int(2, 6), b = r.int(0, 5), n = r.int(8, 30); return H.e('Regelen er ' + a + 'n + ' + b + '. Hva er tall nummer ' + n + '?', a * n + b, a + ' · ' + n + ' + ' + b + ' = ' + (a * n + b));
    }));
    sek.push(H.ek('ut', '🧮', 'Gang ut parentes', 8, 'Gang ut. Hva blir konstantleddet (tallet uten x)?', function (r) {
      const k = r.int(2, 9), m = r.int(1, 9); const neg = !lett && r.int(0, 1) === 1; return H.e(k + '(x ' + (neg ? '−' : '+') + ' ' + m + ')', neg ? -k * m : k * m, k + '(x ' + (neg ? '−' : '+') + ' ' + m + ') = ' + k + 'x ' + (neg ? '−' : '+') + ' ' + k * m + '. Konstantleddet er ' + M.fmt(neg ? -k * m : k * m));
    }));
    sek.push(H.ek('sam', '✂️', 'Samle ledd', 8, 'Forenkle. Hva blir tallet foran x?', function (r) {
      const a = r.int(2, 9), b = r.int(2, 9), c = r.int(1, 9), d = r.int(1, 9); return H.e(a + 'x + ' + c + ' + ' + b + 'x + ' + d, a + b, 'Samle x-ledd: ' + a + 'x + ' + b + 'x = ' + (a + b) + 'x, og tallene ' + c + ' + ' + d + ' = ' + (c + d) + '. Tallet foran x er ' + (a + b));
    }));
    sek.push(H.ek('fak', '🧱', 'Faktorisere', 6, 'Hva er største felles faktor?', function (r) {
      const f = r.int(2, 9), a = r.int(2, 5), b = a + r.int(1, 4); if (a === b) return H.e('6x + 12', 6, '6x + 12 = 6(x + 2)'); const g = (x, y) => y ? g(y, x % y) : x; const gg = g(a, b); const fac = f * gg;
      return H.e(f * a + 'x + ' + f * b, fac, M.fmt(f * a) + 'x + ' + M.fmt(f * b) + ' = ' + fac + '(' + (a / gg) + 'x + ' + (b / gg) + ')');
    }));
    return H.ekDef('Algebra og generalisering', sek);
  };

  /* ================= KVADRATSETNINGENE ================= */
  const ORD2 = [
    ord(['kvadratsetning', 'kvadratsetningene', 'kvadratsetninger'], 'Tre regler for å regne ut kvadrater og produkter av parenteser raskt.'),
    ord(['første kvadratsetning'], '(a + b)² = a² + 2ab + b².'),
    ord(['andre kvadratsetning'], '(a − b)² = a² − 2ab + b².'),
    ord(['tredje kvadratsetning', 'konjugatsetningen'], '(a + b)(a − b) = a² − b².'),
    ord(['kvadrat'], 'Et tall ganget med seg selv. Også en firkant med fire like sider.'),
    ord(['dobbeltprodukt'], 'Leddet 2ab i kvadratsetningene.'),
    ord(['gange ut'], 'Fjerne parenteser ved å gange hvert ledd med hvert ledd.')
  ];
  const U2 = [];
  U2.push(S('Arealer gir regler', '🟪', [
    P('Hva er (a + b)²? Det er arealet av et kvadrat med side a + b. Vi kan dele det i <strong>fire deler</strong>: et kvadrat a², to rektangler a · b og et kvadrat b². Det gir <strong>(a + b)² = a² + 2ab + b²</strong>.'),
    W('arealmodell', { type: 'sum', a: 3, b: 2, tittel: 'Første kvadratsetning som areal' }),
    C('advarsel', 'Vanlig feil', '(a + b)² er <strong>ikke</strong> a² + b². Det mangler to rektangler! Tester: (3 + 2)² = 25, men 3² + 2² = 13.'),
    O(1, [
      T('Hva er (3 + 2)²?', 25, 'Regn parentesen først.', '5² = 25.'),
      T('Hva er 3² + 2²?', 13, '9 + 4.', '9 + 4 = 13.'),
      T('Hvor mye mangler? 25 − 13 = ? (Det er 2 · a · b = 2 · 3 · 2.)', 12, '25 − 13.', '25 − 13 = 12 = 2 · 3 · 2.')
    ])
  ]));
  U2.push(S('Første kvadratsetning: (a + b)²', '➕', [
    P('<strong>(a + b)² = a² + 2ab + b²</strong>. «Kvadratet av første, pluss to ganger første ganger andre, pluss kvadratet av andre.»'),
    E('Regn ut (x + 3)².', ['a = x og b = 3.', 'a² = x². 2ab = 2 · x · 3 = 6x. b² = 9.', 'Svar: x² + 6x + 9.']),
    E('Regn ut (2x + 5)².', ['a = 2x og b = 5.', '(2x)² = 4x². 2 · 2x · 5 = 20x. 5² = 25.', 'Svar: 4x² + 20x + 25.']),
    O(2, [
      T('(x + 4)² = x² + ?x + 16. Hva er tallet foran x?', 8, '2 · 4.', '2 · x · 4 = 8x.'),
      T('(x + 5)² = x² + 10x + ?. Hva er konstantleddet?', 25, '5².', '5² = 25.'),
      T('(2x + 3)². Hva er konstantleddet?', 9, '3².', '3² = 9.'),
      T('(3x + 2)². Hva er tallet foran x? (2 · 3 · 2)', 12, '2 · 3x · 2.', '2 · 3x · 2 = 12x.'),
      T('(x + 6)². Hva er verdien når x = 2?', 64, '(2 + 6)².', '8² = 64. Sjekk: 4 + 24 + 36 = 64 ✓.')
    ])
  ]));
  U2.push(S('Andre kvadratsetning: (a − b)²', '➖', [
    P('<strong>(a − b)² = a² − 2ab + b²</strong>. Midtleddet er negativt, men siste ledd (b²) er <strong>positivt</strong>.'),
    W('arealmodell', { type: 'diff', a: 5, b: 2, tittel: 'Andre kvadratsetning som areal' }),
    E('Regn ut (x − 4)².', ['a = x og b = 4.', 'a² = x². −2ab = −2 · x · 4 = −8x. b² = 16.', 'Svar: x² − 8x + 16.']),
    C('advarsel', 'Pass på', '(x − 4)² = x² − 8x <strong>+ 16</strong>. Siste ledd er positivt fordi (−4)² = 16.'),
    O(3, [
      T('(x − 5)² = x² − 10x + ?. Hva er siste ledd?', 25, '5².', '25.'),
      T('(x − 3)². Hva blir tallet foran x? (Svar med fortegn.)', -6, '−2 · 3.', '−2 · 3 = −6, så −6x.'),
      T('(2x − 1)². Hva er konstantleddet?', 1, '(−1)².', '(−1)² = 1.'),
      T('(x − 7)² når x = 10?', 9, '3².', '(10 − 7)² = 9.'),
      V('Hva er (x − 2)²?', ['x² − 4x + 4', 'x² − 4', 'x² + 4x + 4', 'x² − 2x + 4'], 0, '2 · x · 2 = 4x.', 'x² − 2 · x · 2 + 2² = x² − 4x + 4.')
    ])
  ]));
  U2.push(S('Tredje kvadratsetning: (a + b)(a − b)', '⚖️', [
    P('<strong>(a + b)(a − b) = a² − b²</strong>. Midtleddene tar hverandre ut. Også kalt <strong>konjugatsetningen</strong>.'),
    W('arealmodell', { type: 'konj', a: 6, b: 2, tittel: 'Tredje kvadratsetning som areal' }),
    E('Regn ut (x + 5)(x − 5).', ['Kvadratet av første minus kvadratet av andre.', 'x² − 25.', 'Kontroll: x² − 5x + 5x − 25. Midtleddene forsvinner ✓.']),
    O(3, [
      T('(x + 4)(x − 4) = x² − ?', 16, '4².', 'x² − 16.'),
      T('(x + 9)(x − 9). Hva er konstantleddet? (Svar med fortegn.)', -81, '−9².', 'x² − 81, så −81.'),
      T('(3 + 2)(3 − 2) = ?', 5, '5 · 1.', '5 · 1 = 5. Og 3² − 2² = 9 − 4 = 5 ✓.'),
      T('(2x + 3)(2x − 3). Hva er konstantleddet? (Svar med fortegn.)', -9, '−3².', '4x² − 9, så −9.'),
      V('Hvilket produkt gir x² − 49?', ['(x + 7)(x − 7)', '(x − 7)²', '(x + 7)²', '(x − 49)(x + 1)'], 0, '49 = 7².', '(x + 7)(x − 7) = x² − 49.')
    ])
  ]));
  U2.push(S('Smarte regnetriks', '⚡', [
    P('Kvadratsetningene lar deg regne i hodet. <strong>51² = (50 + 1)²</strong> = 2500 + 100 + 1 = 2601. <strong>49² = (50 − 1)²</strong> = 2500 − 100 + 1 = 2401. <strong>52 · 48 = (50 + 2)(50 − 2)</strong> = 2500 − 4 = 2496.'),
    E('Regn ut 102² uten kalkulator.', ['102 = 100 + 2.', '(100 + 2)² = 100² + 2 · 100 · 2 + 2² = 10 000 + 400 + 4.', 'Svar: 10 404.']),
    E('Regn ut 98 · 102.', ['98 = 100 − 2 og 102 = 100 + 2.', '(100 − 2)(100 + 2) = 100² − 2² = 10 000 − 4.', 'Svar: 9996.']),
    O(4, [
      T('Regn ut 51² med (50 + 1)².', 2601, '2500 + 100 + 1.', '2601.'),
      T('Regn ut 49² med (50 − 1)².', 2401, '2500 − 100 + 1.', '2401.'),
      T('Regn ut 102².', 10404, '(100 + 2)².', '10 000 + 400 + 4 = 10404.'),
      T('Regn ut 98 · 102.', 9996, '100² − 2².', '10 000 − 4 = 9996.'),
      T('Regn ut 31² − 29².  (Tredje kvadratsetning baklengs: (31 + 29)(31 − 29))', 120, '60 · 2.', '60 · 2 = 120.'),
      T('Regn ut 99².', 9801, '(100 − 1)².', '10 000 − 200 + 1 = 9801.')
    ])
  ]));
  U2.push(S('Gjenkjenne og faktorisere', '🔍', [
    P('Kvadratsetningene fungerer også baklengs. Ser du <strong>x² + 6x + 9</strong>, kan du skrive det som <strong>(x + 3)²</strong>. Sjekk: første og siste ledd er kvadrater (x² og 3²), og midtleddet er 2 · x · 3 = 6x ✓.'),
    E('Faktoriser x² − 16.', ['x² er kvadratet av x, og 16 er kvadratet av 4.', 'Differansen mellom to kvadrater: tredje kvadratsetning baklengs.', 'Svar: (x + 4)(x − 4).']),
    TAB(['Uttrykk', 'Faktorisert'], [['x² + 10x + 25', '(x + 5)²'], ['x² − 12x + 36', '(x − 6)²'], ['x² − 49', '(x + 7)(x − 7)'], ['4x² − 9', '(2x + 3)(2x − 3)']]),
    O(5, [
      V('Hva er x² + 8x + 16 faktorisert?', ['(x + 4)²', '(x + 8)²', '(x + 4)(x − 4)', '(x − 4)²'], 0, '4² = 16 og 2 · 4 = 8.', '(x + 4)² = x² + 8x + 16.'),
      V('Hva er x² − 25 faktorisert?', ['(x + 5)(x − 5)', '(x − 5)²', '(x + 5)²', '(x − 25)(x + 1)'], 0, '25 = 5².', 'Tredje kvadratsetning: (x + 5)(x − 5).'),
      V('Hva er x² − 6x + 9 faktorisert?', ['(x − 3)²', '(x + 3)²', '(x − 6)²', '(x + 3)(x − 3)'], 0, '3² = 9 og 2 · 3 = 6.', '(x − 3)² = x² − 6x + 9.'),
      T('x² + 14x + 49 = (x + ?)². Hva står i spørsmålstegnet?', 7, '7² = 49.', '(x + 7)².'),
      F('Mia sier at (x + 3)² = x² + 9. Hva er feil, og hva er riktig svar?', ['Hun har glemt midtleddet 2 · x · 3 = 6x.', 'Riktig: (x + 3)² = x² + 6x + 9.', 'Test med x = 1: (1 + 3)² = 16, men 1² + 9 = 10. De er ikke like.'])
    ])
  ]));
  U2.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('Vis at (n + 1)² − n² = 2n + 1 for alle tall n. Hva sier det om forskjellen mellom to påfølgende kvadrattall?', ['(n + 1)² = n² + 2n + 1.', 'Trekker vi fra n², står 2n + 1 igjen.', 'Forskjellen mellom to påfølgende kvadrattall er alltid et oddetall: f.eks. 25 − 16 = 9 = 2 · 4 + 1.']),
      F('Forklar med en figur eller med ord hvorfor (a − b)² ikke er a² − b².', ['Test: (5 − 2)² = 9, men 5² − 2² = 21.', 'Kvadratet med side a − b får ikke plass til de to rektanglene av b som må trekkes fra.', 'Riktig er a² − 2ab + b².']),
      F('Bruk tredje kvadratsetning til å regne 63 · 57 i hodet. Forklar.', ['63 = 60 + 3 og 57 = 60 − 3.', '(60 + 3)(60 − 3) = 60² − 3² = 3600 − 9.', 'Svar: 3591.'])
    ]),
    SJ('Dette kan du nå', ['Forklare kvadratsetningene som arealer', 'Bruke alle tre kvadratsetningene', 'Regne smart i hodet', 'Gjenkjenne og faktorisere med kvadratsetningene'])
  ]));
  M.register('utforsk', '10/kvadratsetninger', {
    tittel: 'Kvadratsetningene',
    ingress: 'Tre smarte regler for kvadrater og produkter. Du ser dem som arealer og bruker dem som regnetriks.',
    mal: ['utforske kvadratsetningene geometrisk og algebraisk', 'bruke kvadratsetningene som regnestrategier'], ordliste: ORD2, seksjoner: U2
  });
  const T2 = [];
  T2.push(S('Steg 1: Kvadrat som areal', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Et kvadrat med side 5 har areal 5 · 5 = 25. Vi skriver 5² = 25. Hva om siden er <strong>3 + 2</strong>?', true),
    W('arealmodell', { type: 'sum', a: 3, b: 2, tittel: 'Kvadrat med side 3 + 2' }),
    OS([
      T('Hva er (3 + 2)²?', 25, '5 · 5.', '5² = 25.'),
      T('Hva er 3² + 2²?', 13, '9 + 4.', '9 + 4 = 13.'),
      V('Er (3 + 2)² det samme som 3² + 2²?', ['Nei', 'Ja'], 0, 'Sammenlikn 25 og 13.', '25 og 13 er ikke like.', true)
    ])
  ]));
  T2.push(S('Steg 2: Regelen', '2', [
    G('Her er regelen for å regne ut (a + b)².'),
    C('regel', 'Første kvadratsetning', ['(a + b)² = a² + 2ab + b²', 'Første i kvadrat. To ganger første og andre. Andre i kvadrat.']),
    E('Regn ut (x + 2)².', ['a = x og b = 2.', 'x² + 2 · x · 2 + 2².', 'Svar: x² + 4x + 4. 🎉']),
    OS([
      T('(x + 3)² = x² + ?x + 9. Hva er tallet foran x? (2 · 3)', 6, '2 · 3.', '2 · 3 = 6.'),
      T('(x + 5)² = x² + 10x + ?', 25, '5².', '25.'),
      T('(x + 1)² = x² + ?x + 1', 2, '2 · 1.', '(x + 1)² = (x + 1)(x + 1) = x² + x + x + 1 = x² + 2x + 1. Midtleddet er 2 · x · 1 = 2x.')
    ])
  ]));
  T2.push(S('Steg 3: Hodetriks', '3', [
    G('Kvadratsetningene gjør hoderegning lettere.'),
    E('Regn ut 51². Tenk 51 = 50 + 1.', ['(50 + 1)² = 50² + 2 · 50 · 1 + 1².', '2500 + 100 + 1.', 'Svar: 2601. 🎉']),
    OS([
      T('Regn ut 11² som (10 + 1)².', 121, '100 + 20 + 1.', '121.'),
      T('Regn ut 21² som (20 + 1)².', 441, '400 + 40 + 1.', '441.'),
      T('Regn ut 31² som (30 + 1)².', 961, '900 + 60 + 1.', '961.')
    ]),
    SJ('Dette kan du nå', ['Se (a + b)² som et areal', 'Bruke første kvadratsetning', 'Regne smart i hodet'])
  ]));
  M.register('steg', '10/kvadratsetninger', {
    tittel: 'Kvadratsetningene',
    ingress: 'Små steg: du ser kvadratsetningene som arealer og bruker dem som hoderegnings-triks.',
    mal: ['bruke første kvadratsetning'], ordliste: ORD2, seksjoner: T2
  });
  M.ekstra['10/kvadratsetninger'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('mid', '➕', 'Midtleddet', 8, 'Hva blir tallet foran x når du regner ut kvadratet?', function (r) {
      const b = r.int(1, lett ? 6 : 12); const neg = !lett && r.int(0, 1) === 1; return H.e('(x ' + (neg ? '−' : '+') + ' ' + b + ')²', neg ? -2 * b : 2 * b, '(x ' + (neg ? '−' : '+') + ' ' + b + ')² = x² ' + (neg ? '−' : '+') + ' ' + 2 * b + 'x + ' + b * b + '. Tallet foran x er ' + M.fmt(neg ? -2 * b : 2 * b));
    }));
    sek.push(H.ek('sist', '🔚', 'Siste ledd', 6, 'Hva blir konstantleddet (tallet uten x)?', function (r) {
      const b = r.int(2, 12), neg = r.int(0, 1) === 1; return H.e('(x ' + (neg ? '−' : '+') + ' ' + b + ')²', b * b, 'Siste ledd er ' + b + '² = ' + b * b);
    }));
    sek.push(H.ek('kvad', '🟪', 'Hoderegning med kvadrat', 8, 'Regn ut. Bruk kvadratsetningene.', function (r) {
      const t = r.pick(lett ? [10, 20, 30] : [10, 20, 30, 40, 50, 100]), d = r.int(1, lett ? 2 : 3), neg = !lett && r.int(0, 1) === 1; const n = neg ? t - d : t + d;
      return H.e(n + '²', n * n, '(' + t + (neg ? ' − ' : ' + ') + d + ')² = ' + t * t + (neg ? ' − ' : ' + ') + 2 * t * d + ' + ' + d * d + ' = ' + n * n);
    }));
    sek.push(H.ek('konj', '⚖️', 'Konjugat-triks', 6, 'Regn ut med (a + b)(a − b) = a² − b².', function (r) {
      const t = r.pick([10, 20, 30, 40, 50, 100]), d = r.int(1, 4); return H.e((t - d) + ' · ' + (t + d), t * t - d * d, '(' + t + ' − ' + d + ')(' + t + ' + ' + d + ') = ' + t * t + ' − ' + d * d + ' = ' + (t * t - d * d));
    }));
    return H.ekDef('Kvadratsetningene', sek);
  };
})();
