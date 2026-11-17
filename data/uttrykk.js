/* ============================================================
   Tema: Regneuttrykk og variabler (8. trinn) – UTFORSK + STEG + EKSTRA
   Læreplan 8.5: lage og forklare regneuttrykk med tall, variabler og
   konstanter knyttet til praktiske situasjoner
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, H2, SJ, S, ord } = H;
  const ORD = [
    ord(['variabel', 'variabler', 'variabelen'], 'En bokstav som står for et tall som kan endre seg, for eksempel x eller n.'),
    ord(['konstant', 'konstanter', 'konstantledd'], 'Et tall som ikke endrer seg. I 3x + 5 er 5 en konstant.'),
    ord(['uttrykk', 'regneuttrykk', 'uttrykket'], 'Tall, bokstaver og regnetegn satt sammen, som 3x + 5. Et uttrykk har ikke likhetstegn.'),
    ord(['ledd'], 'Delene i et uttrykk som er skilt med + eller −. I 3x + 5 er leddene 3x og 5.'),
    ord(['koeffisient'], 'Tallet som står foran bokstaven. I 3x er koeffisienten 3.'),
    ord(['forenkle', 'forenkling'], 'Å skrive et uttrykk kortere uten å endre verdien, for eksempel 2x + 3x = 5x.'),
    ord(['verdi', 'verdien'], 'Tallet du får når du setter inn et tall for bokstaven og regner ut.'),
    ord(['sette inn'], 'Å bytte ut bokstaven med et tall. Setter du x = 4 inn i 3x + 5, får du 3 · 4 + 5 = 17.'),
    ord(['parentes', 'parenteser'], 'Tegnet ( ) som viser hva som skal regnes først.')
  ];

  /* ====================== UTFORSK ====================== */
  const U = [];
  U.push(S('Bokstaver som tall', '🔤', [
    P('I matte bruker vi <strong>bokstaver</strong> når vi ikke vet tallet ennå, eller når tallet kan variere. Slike bokstaver kalles <strong>variabler</strong>. Tall som ikke endrer seg, kalles <strong>konstanter</strong>.'),
    C('virkelighet', 'Eksempel: en bursdagsfest', 'En pizza koster 99 kr. Hvis x personer skal ha hver sin pizza, koster det 99 · x kr. Kommer det 5 personer, er x = 5 og prisen er 99 · 5 = 495 kr. Kommer det 8, er x = 8 og prisen er 792 kr. Bokstaven x gjør at vi har ett uttrykk som passer for alle antall.'),
    TAB(['Uttrykk', 'Variabel', 'Konstant', 'Koeffisient'], [['3x + 5', 'x', '5', '3'], ['2n − 7', 'n', '−7', '2'], ['x + 12', 'x', '12', '1'], ['5a', 'a', 'ingen', '5']]),
    C('regel', 'Skrivemåter', ['3x betyr 3 · x. Vi hopper over gangetegnet.', 'x · x skriver vi x². a · b skriver vi ab.', 'x : 4 kan skrives x/4.']),
    O(1, [
      V('Hva er variabelen i uttrykket 4y + 9?', ['y', '4', '9', '+'], 0, 'Bokstaven.', 'Bokstaven y kan endre seg, så den er variabelen.'),
      T('Hva er konstantleddet i 7x + 12?', 12, 'Tallet uten bokstav.', '12 er konstanten.'),
      T('Hva er koeffisienten i 8a − 3?', 8, 'Tallet foran bokstaven.', '8 står foran a.'),
      V('Hvordan skriver vi 5 · x kortere?', ['5x', 'x5', '5 + x', '5/x'], 0, 'Hopp over gangetegnet.', '5 · x skrives 5x.')
    ])
  ]));

  U.push(S('Sette inn og regne ut verdi', '🔢', [
    P('Når du vet hva bokstaven står for, kan du <strong>sette inn</strong> tallet og regne ut <strong>verdien</strong> av uttrykket. Husk regnerekkefølgen: gange før pluss.'),
    E('Finn verdien av 3x + 5 når x = 4.', ['Skriv inn 4 der x står: 3 · 4 + 5.', 'Gange først: 3 · 4 = 12.', '12 + 5 = 17.', 'Svar: 17.']),
    E('Finn verdien av 2a − b når a = 6 og b = 5.', ['Sett inn: 2 · 6 − 5.', '12 − 5 = 7.', 'Svar: 7.']),
    W('maskin', { regel: '3*x+5', navn: '3x + 5', x: 4, tittel: 'Uttrykksmaskin: skriv inn x og se verdien' }),
    C('tips', 'Bruk parentes når du setter inn negative tall', 'Når x = −2, skriver du 3 · (−2) + 5 = −6 + 5 = −1. Parentesen hindrer at tegnene blir feil.'),
    O(2, [
      T('Finn verdien av 4x + 3 når x = 5.', 23, '4 · 5 + 3.', '4 · 5 = 20, og 20 + 3 = 23.'),
      T('Finn verdien av 10 − 2n når n = 3.', 4, '10 − 2 · 3.', '2 · 3 = 6, og 10 − 6 = 4.'),
      T('Finn verdien av x² + 1 når x = 6.', 37, 'x² = 6 · 6.', '6 · 6 + 1 = 37.'),
      T('Finn verdien av 5a − 2b når a = 4 og b = 3.', 14, 'Sett inn begge.', '5 · 4 − 2 · 3 = 20 − 6 = 14.'),
      T('Finn verdien av 3x + 5 når x = −2.', -1, 'Bruk parentes: 3 · (−2).', '3 · (−2) = −6, og −6 + 5 = −1.'),
      T('Finn verdien av 2(x + 3) når x = 7.', 20, 'Parentes først.', '7 + 3 = 10, og 2 · 10 = 20.')
    ])
  ]));

  U.push(S('Lage uttrykk fra tekst', '✍️', [
    P('Det viktigste du gjør i algebra, er å <strong>oversette fra ord til uttrykk</strong>. Les teksten, finn hva som varierer (det blir variabelen) og hva som er fast (konstanter).'),
    TAB(['På norsk', 'Uttrykk'], [['Et tall pluss 5', 'x + 5'], ['Et tall minus 3', 'x − 3'], ['Tre ganger et tall', '3x'], ['Halvparten av et tall', 'x/2'], ['Dobbelt så mye som et tall, pluss 1', '2x + 1'], ['5 mer enn tre ganger et tall', '3x + 5'], ['Summen av et tall og tallet etter', 'n + (n + 1)']]),
    E('En kino tar 40 kr i startgebyr og 80 kr per film. Lag et uttrykk for prisen på n filmer.', ['Fast del (konstant): 40 kr.', 'Del som varierer: 80 kr for hver film, så 80 · n.', 'Uttrykk: 80n + 40.', 'For 3 filmer: 80 · 3 + 40 = 280 kr.']),
    C('virkelighet', 'Hverdagen: mobilabonnement', 'Et abonnement koster 99 kr i måneden og 2 kr per GB ekstra data. Uttrykk for månedsprisen med x GB ekstra: 2x + 99.'),
    O(3, [
      V('Hva er «tre mer enn et tall»?', ['x + 3', '3x', 'x − 3', 'x/3'], 0, '«Mer enn» betyr pluss.', 'x + 3.'),
      V('Hva er «dobbelt så mye som n, minus 4»?', ['2n − 4', '2(n − 4)', 'n − 4', '4 − 2n'], 0, 'Dobbelt først, så minus.', '2n − 4.'),
      T('Et gjerde koster 500 kr i oppstart og 120 kr per meter. Hva koster 10 meter?', 1700, 'Uttrykk: 120x + 500.', '120 · 10 + 500 = 1700 kr.', 'kr'),
      T('En taxi koster 55 kr og 18 kr per km. Hva koster en tur på 7 km?', 181, '18x + 55.', '18 · 7 + 55 = 126 + 55 = 181 kr.', 'kr'),
      V('Et rektangel har bredde x og lengde x + 4. Hva er omkretsen?', ['4x + 8', '2x + 4', 'x² + 4x', '4x + 4'], 0, '2 · (x + x + 4).', 'Omkrets = x + (x + 4) + x + (x + 4) = 4x + 8.'),
      V('Et rektangel har bredde x og lengde x + 4. Hva er arealet?', ['x(x + 4)', '2x + 4', '4x + 8', 'x + x + 4'], 0, 'Areal = bredde · lengde.', 'Areal = x · (x + 4).')
    ])
  ]));

  U.push(S('Forenkle uttrykk', '🧹', [
    P('Å <strong>forenkle</strong> betyr å skrive uttrykket kortere uten å endre verdien. Det gjør du ved å samle <strong>like ledd</strong>: ledd med samme bokstav.'),
    K([{ ikon: '🍎', tittel: 'Eple-bildet', tekst: '3 epler + 2 epler = 5 epler. På samme måte: 3x + 2x = 5x.' }, { ikon: '🍎🍌', tittel: 'Ulike ting', tekst: '3 epler + 2 bananer lar seg ikke slå sammen. Slik er 3x + 2y også ferdig forenklet.' }]),
    E('Forenkle 5x + 3 + 2x − 1.', ['Samle x-leddene: 5x + 2x = 7x.', 'Samle tallene: 3 − 1 = 2.', 'Svar: 7x + 2.']),
    H2('Parenteser'),
    P('Bruk den distributive regelen du kjenner fra regneregler: <strong>a(b + c) = ab + ac</strong>.'),
    E('Forenkle 3(x + 4).', ['Gang 3 med begge ledd i parentesen.', '3 · x = 3x og 3 · 4 = 12.', 'Svar: 3x + 12.']),
    C('advarsel', 'Vanlig feil', '3(x + 4) er <strong>ikke</strong> 3x + 4. Alle ledd i parentesen skal ganges med 3. Prøv med x = 1: 3 · 5 = 15, men 3 · 1 + 4 = 7.'),
    O(3, [
      T('Forenkle 3x + 5x. Hva er koeffisienten foran x?', 8, 'Legg sammen 3 og 5.', '3x + 5x = 8x.'),
      T('Forenkle 7x − 2x + 4. Hva er koeffisienten foran x?', 5, '7 − 2.', '7x − 2x = 5x, så uttrykket er 5x + 4.'),
      T('Forenkle 4a + 3 + 2a + 7. Hva er konstantleddet?', 10, 'Samle tallene.', '3 + 7 = 10. Uttrykket er 6a + 10.'),
      T('Forenkle 5(x + 2). Hva er konstantleddet?', 10, '5 · 2.', '5(x + 2) = 5x + 10.'),
      T('Forenkle 2(3x + 4). Hva er koeffisienten foran x?', 6, '2 · 3.', '2(3x + 4) = 6x + 8.'),
      V('Hvilket uttrykk er likt 4x + 2x + 3?', ['6x + 3', '9x', '8x + 3', '6x²+3'], 0, 'Samle x-leddene.', '4x + 2x = 6x, så 6x + 3.'),
      V('Er 2x + 3y lik 5xy?', ['Nei', 'Ja', 'Bare hvis x = y', 'Bare for positive tall'], 0, 'Prøv x = 1, y = 1.', '2 + 3 = 5 og 5 · 1 · 1 = 5 for x = y = 1, men x = 2, y = 1 gir 7 og 10. De er ulike.')
    ])
  ]));

  U.push(S('Argumenter: stemmer uttrykkene?', '🔎', [
    P('To uttrykk er like hvis de gir <strong>samme verdi for alle tall</strong>. Du kan teste ved å sette inn flere tall. Ett eksempel som ikke stemmer, er nok for å avvise (moteksempel).'),
    E('Er 2(x + 3) lik 2x + 3?', ['Prøv x = 1: 2(1 + 3) = 8, og 2 · 1 + 3 = 5.', '8 ≠ 5. Det er et moteksempel.', 'Så de er ikke like. Riktig forenkling er 2x + 6.']),
    O(4, [
      V('Er x + x lik 2x?', ['Ja, alltid', 'Nei', 'Bare for x = 0', 'Bare for positive x'], 0, 'x + x er to x-er.', 'To like ledd legges sammen: x + x = 2x.', true),
      V('Er x · x lik 2x?', ['Bare for x = 0 og x = 2', 'Ja, alltid', 'Nei, aldri', 'Bare for x = 1'], 0, 'Prøv x = 3: 9 og 6.', 'x · x = x². For x = 0: 0 = 0. For x = 2: 4 = 4. Ellers er de ulike.'),
      V('Stemmer det at 3 + x = 3x for alle x? Prøv x = 4 og x = 1,5.', ['Nei. Det stemmer bare for x = 1,5', 'Ja, for alle x', 'Nei, det stemmer aldri', 'Det stemmer bare for x = 4'], 0, '3 + 4 = 7 og 3 · 4 = 12. Men 3 + 1,5 = 4,5 og 3 · 1,5 = 4,5.', 'For x = 4 er de ulike (7 og 12), så uttrykkene er ikke like. Men tilfeldigvis er begge 4,5 når x = 1,5. Et uttrykk er bare like et annet hvis det gjelder for alle x.'),
      F('Lise skriver 3(x + 2) = 3x + 2. Forklar hva hun har gjort feil og rett det.', ['Lise ganget bare det første leddet med 3. Alle ledd i parentesen skal ganges.', 'Riktig: 3(x + 2) = 3x + 6.', 'Du kan sjekke med x = 1: 3 · 3 = 9 og 3 · 1 + 6 = 9, men 3 · 1 + 2 = 5.']),
      F('Lag et uttrykk for omkretsen av en firkant med sidene x, x + 2, x + 3 og x + 5. Forenkle det. Hva er omkretsen når x = 4?', ['Omkrets: x + (x + 2) + (x + 3) + (x + 5) = 4x + 10.', 'Når x = 4: 4 · 4 + 10 = 26.'])
    ]),
    SJ('Dette kan du nå', ['Forklare hva en variabel og en konstant er', 'Sette inn tall og regne ut verdi', 'Lage uttrykk fra tekst', 'Forenkle ved å samle like ledd og gange inn i parentes', 'Teste om to uttrykk er like'])
  ]));

  M.register('utforsk', '8/uttrykk', {
    tittel: 'Regneuttrykk og variabler',
    ingress: 'Bokstaver kan stå for tall. Du lærer å lage uttrykk fra hverdagssituasjoner, regne ut verdien og forenkle dem.',
    mal: ['lage og forklare regneuttrykk med tall, variabler og konstanter', 'forenkle uttrykk og teste om de er like'],
    ordliste: ORD, seksjoner: U
  });

  /* ====================== STEG ====================== */
  const T1 = [];
  T1.push(S('Steg 1: Bokstav som tall', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('I matte bruker vi noen ganger en <strong>bokstav</strong> i stedet for et tall. Da er bokstaven et tall vi ikke vet ennå. Den kalles en <strong>variabel</strong>.', true),
    C('regel', 'Husk', ['3x betyr 3 · x (tre ganger x).', 'x + 5 betyr «et tall pluss 5».', 'Et tall uten bokstav kalles en <strong>konstant</strong>.']),
    E('Hva betyr 4x når x = 3?', ['4x betyr 4 · x.', 'Vi setter 3 inn for x: 4 · 3.', 'Svar: 12. 🎉']),
    OS([
      V('Hva betyr 5x?', ['5 · x', '5 + x', 'x − 5'], 0, 'Tallet foran bokstaven ganges.', '5x betyr 5 · x.', true),
      T('Finn 2x når x = 4.', 8, '2 · 4.', '2 · 4 = 8.'),
      T('Finn x + 5 når x = 3.', 8, '3 + 5.', '3 + 5 = 8.'),
      T('Finn 10 − x når x = 7.', 3, '10 − 7.', '10 − 7 = 3.')
    ])
  ]));
  T1.push(S('Steg 2: Sette inn tall', '2', [
    G('Nå regner vi ut verdien av uttrykk.'),
    P('Vi bytter ut bokstaven med et tall og regner ut. Husk å gange før du legger til.', true),
    W('maskin', { regel: '2*x+1', navn: '2x + 1', x: 3, tittel: 'Uttrykksmaskin' }),
    E('Finn verdien av 3x + 2 når x = 5.', ['Sett 5 inn for x: 3 · 5 + 2.', 'Gange først: 3 · 5 = 15.', '15 + 2 = 17.', 'Svar: 17. 🎉']),
    OS([
      T('Finn 2x + 1 når x = 3.', 7, '2 · 3 + 1.', '6 + 1 = 7.'),
      T('Finn 4x + 2 når x = 2.', 10, '4 · 2 + 2.', '8 + 2 = 10.'),
      T('Finn 5x − 3 når x = 4.', 17, '5 · 4 − 3.', '20 − 3 = 17.'),
      T('Finn 10 − 2x når x = 3.', 4, '10 − 2 · 3.', '10 − 6 = 4.')
    ])
  ]));
  T1.push(S('Steg 3: Fra tekst til uttrykk', '3', [
    G('Nå skal du lage uttrykk fra en historie.'),
    P('Finn først det som er <strong>fast</strong>, og så det som <strong>varierer</strong>. Det som varierer, blir bokstaven.', true),
    E('En taxi koster 50 kr i start og 10 kr per km. Lag et uttrykk for prisen på x km.', ['Fast del: 50 kr.', 'Varierer: 10 kr for hver km. Det blir 10 · x.', 'Uttrykk: 10x + 50.', 'For 3 km: 10 · 3 + 50 = 80 kr. 🎉']),
    OS([
      V('Et abonnement koster 100 kr + 5 kr per film (x filmer). Hva er uttrykket?', ['5x + 100', '100x + 5', '105x'], 0, 'Fast: 100. Varierer: 5 per film.', '5x + 100.', true),
      T('Uttrykket er 5x + 100. Hva koster 4 filmer?', 120, '5 · 4 + 100.', '20 + 100 = 120 kr.', 'kr'),
      T('Taxi: 10x + 50. Hva koster 5 km?', 100, '10 · 5 + 50.', '50 + 50 = 100 kr.', 'kr'),
      T('Et gjerde koster 20x kr for x meter. Hva koster 6 meter?', 120, '20 · 6.', '20 · 6 = 120 kr.', 'kr')
    ])
  ]));
  T1.push(S('Steg 4: Samle og forenkle', '4', [
    G('Nå gjør vi uttrykk kortere.'),
    P('Lik bokstav kan legges sammen, som epler: 3 epler + 2 epler = 5 epler. Slik er 3x + 2x = 5x.', true),
    E('Forenkle 4x + 3x.', ['Begge har x.', '4 + 3 = 7.', 'Svar: 7x. 🎉']),
    E('Forenkle 2x + 5 + 3x + 1.', ['Samle x-ene: 2x + 3x = 5x.', 'Samle tallene: 5 + 1 = 6.', 'Svar: 5x + 6. 🎉']),
    OS([
      T('3x + 2x = ?x. Hva er tallet?', 5, '3 + 2.', '3x + 2x = 5x.'),
      T('6x − 2x = ?x. Hva er tallet?', 4, '6 − 2.', '6x − 2x = 4x.'),
      T('2x + 5 + 3x + 1 = ?x + 6. Hva er tallet foran x?', 5, '2 + 3.', '2x + 3x = 5x.'),
      T('2(x + 3) = 2x + ?. Hva mangler?', 6, '2 · 3.', '2 · 3 = 6.')
    ]),
    SJ('Dette kan du nå', ['Forstå at en bokstav kan stå for et tall', 'Sette inn tall og regne ut', 'Lage uttrykk fra en tekst', 'Samle like ledd'])
  ]));

  M.register('steg', '8/uttrykk', {
    tittel: 'Regneuttrykk og variabler',
    ingress: 'Små steg, tydelige eksempler og hjelp hele veien. Du lærer å bruke bokstaver i regning.',
    mal: ['forstå variabler', 'regne ut verdien av et uttrykk', 'lage og forenkle enkle uttrykk'],
    ordliste: ORD, seksjoner: T1
  });

  /* ====================== EKSTRA ====================== */
  M.ekstra['8/uttrykk'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('verdi', '🔢', 'Sette inn og regne ut', 8, 'Regn ut verdien av uttrykket.', function (r, i) {
      const a = r.int(2, lett ? 5 : 9), b = r.int(1, 9), x = r.int(1, lett ? 6 : 12); const pm = lett || i % 2 === 0;
      const v = a * x + (pm ? b : -b);
      return H.e(a + 'x ' + (pm ? '+' : '−') + ' ' + b + ', når x = ' + x + '.', v, a + ' · ' + x + (pm ? ' + ' : ' − ') + b + ' = ' + v);
    }));
    sek.push(H.ek('hverdag', '🚕', 'Pris-uttrykk', 6, 'Sett inn i uttrykket for pris.', function (r) {
      const f = r.int(2, 9) * 10, p = r.int(2, 9) * (lett ? 5 : 3), n = r.int(2, 12);
      return H.e('Et leiebil-firma tar ' + f + ' kr i startpris og ' + p + ' kr per km. Hva koster en tur på ' + n + ' km?', p * n + f, p + ' · ' + n + ' + ' + f + ' = ' + (p * n + f) + ' kr');
    }));
    sek.push(H.ek('samle', '🧹', 'Samle like ledd', 8, 'Forenkle og skriv koeffisienten foran x.', function (r) {
      const a = r.int(2, 9), b = r.int(2, 9), c = r.int(1, 9);
      if (lett || r.int(0, 1) === 0) return H.e(a + 'x + ' + b + 'x = ?x. Hva er ?', a + b, a + ' + ' + b + ' = ' + (a + b));
      const d = r.int(1, a - 1 > 0 ? a - 1 : 1); return H.e(a + 'x + ' + c + ' + ' + b + 'x − ' + d + 'x = ?x + ' + c + '. Hva er ?', a + b - d, a + ' + ' + b + ' − ' + d + ' = ' + (a + b - d));
    }));
    sek.push(H.ek('parentes', '📦', 'Gange inn i parentes', 8, 'Gang ut parentesen. Skriv konstantleddet.', function (r) {
      const a = r.int(2, 9), b = r.int(2, 9);
      return H.e(a + '(x + ' + b + ') = ' + a + 'x + ?. Hva er ?', a * b, a + ' · ' + b + ' = ' + a * b);
    }));
    return H.ekDef('Regneuttrykk og variabler', sek);
  };
})();
