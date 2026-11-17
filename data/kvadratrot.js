/* ============================================================
   Tema: Kvadratrøtter (8. trinn) – UTFORSK + STEG + EKSTRA
   Læreplan 8.1: regne med kvadratrøtter og forklare framgangsmåter og resultater
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, H2, SJ, S, ord } = H;
  const ORD = [
    ord(['kvadratrot', 'kvadratroten', 'kvadratrøtter', 'kvadratrøtter'], 'Tallet som ganget med seg selv gir tallet under rottegnet. √25 = 5, fordi 5 · 5 = 25.'),
    ord(['kvadrattall', 'kvadrattallene'], 'Tall du får når du ganger et helt tall med seg selv: 1, 4, 9, 16, 25 …'),
    ord(['rottegn', 'rottegnet'], 'Tegnet √. Under tegnet står tallet vi skal finne kvadratroten av.'),
    ord(['kvadrat'], 'Et tall ganget med seg selv, som 5² = 25. Eller en firkant med like sider.'),
    ord(['areal', 'arealet'], 'Hvor mye flate en figur dekker. Måles i kvadratenheter som cm².'),
    ord(['overslag'], 'En grov utregning som gir et omtrentlig svar.'),
    ord(['irrasjonalt tall', 'irrasjonale tall'], 'Et tall som ikke kan skrives som en brøk, og som har uendelig mange desimaler uten mønster. √2 er et slikt tall.')
  ];

  /* ====================== UTFORSK ====================== */
  const U = [];
  U.push(S('Fra kvadrat til kvadratrot', '√', [
    P('Hvis et kvadrat har areal 25 cm², hvor lang er siden? Du må finne et tall som ganget med seg selv gir 25. Det tallet er <strong>5</strong>, fordi 5 · 5 = 25. Vi skriver <strong>√25 = 5</strong> og sier «kvadratroten av 25 er 5».'),
    W('kvadrat', { s: 5, tittel: 'Kvadrat og areal: dra i siden' }),
    C('regel', 'Kvadrat og kvadratrot er motsatte', ['5² = 25 (kvadrat: fra side til areal)', '√25 = 5 (kvadratrot: fra areal til side)', 'Det er som pluss og minus: de «angrer» hverandre.']),
    C('advarsel', 'Ikke bland med å dele på 2', '√16 er <strong>ikke</strong> 8. Det er 4, fordi 4 · 4 = 16. Kvadratroten er ikke halvparten.'),
    O(1, [
      T('Regn ut: √9', 3, 'Hvilket tall ganget med seg selv gir 9?', '3 · 3 = 9.'),
      T('Regn ut: √49', 7, '7 · 7?', '7 · 7 = 49.'),
      T('Regn ut: √100', 10, '10 · 10?', '10 · 10 = 100.'),
      T('Regn ut: √1', 1, '1 · 1?', '1 · 1 = 1.'),
      T('Regn ut: √0', 0, '0 · 0?', '0 · 0 = 0.'),
      T('Et kvadrat har areal 64 cm². Hvor lang er siden?', 8, 'Finn √64.', '8 · 8 = 64, så siden er 8 cm.', 'cm')
    ])
  ]));

  U.push(S('Kvadrattallene', '🔢', [
    P('Tallene du får når du kvadrerer hele tall, kalles <strong>kvadrattall</strong>. Kjenner du dem, kjenner du mange kvadratrøtter på rams.'),
    TAB(['n', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], [['n²', '1', '4', '9', '16', '25', '36', '49', '64', '81', '100', '121', '144', '169', '196', '225']]),
    C('tips', 'Slik husker du dem', ['Kvadrattall ender aldri på 2, 3, 7 eller 8.', 'Ser du et slikt siffer sist, er det ikke et kvadrattall.', 'Forskjellen mellom nabokvadrater er oddetallene: 4 − 1 = 3, 9 − 4 = 5, 16 − 9 = 7 …']),
    E('Er 144 et kvadrattall?', ['Prøv 12 · 12 = 144.', 'Ja, 144 = 12². Da er √144 = 12.', 'Svar: ja, √144 = 12.']),
    O(2, [
      T('Regn ut: √81', 9, '9 · 9.', '9 · 9 = 81.'),
      T('Regn ut: √121', 11, '11 · 11.', '11 · 11 = 121.'),
      T('Regn ut: √169', 13, '13 · 13.', '13 · 13 = 169.'),
      T('Regn ut: √225', 15, '15 · 15.', '15 · 15 = 225.'),
      V('Hvilket av disse er IKKE et kvadrattall?', ['72', '64', '81', '100'], 0, '8² = 64 og 9² = 81.', '72 ligger mellom 64 og 81. Det finnes ikke noe helt tall som ganget med seg selv gir 72.'),
      V('Hvilket tall kan ikke være et kvadrattall? (Se på siste siffer.)', ['1 237', '1 296', '1 225', '1 369'], 0, 'Kvadrattall ender ikke på 7.', '1 237 ender på 7, så det kan ikke være et kvadrattall. (1296 = 36², 1225 = 35², 1369 = 37².)')
    ])
  ]));

  U.push(S('Røtter som ikke går opp: anslå og bruk kalkulator', '🔍', [
    P('Hva er √50? 7² = 49 og 8² = 64, så √50 ligger <strong>mellom 7 og 8</strong>, og veldig nær 7. Mange kvadratrøtter er ikke hele tall. De har uendelig mange desimaler uten mønster. Slike tall kalles <strong>irrasjonale tall</strong>.'),
    W('kvadrat', { rot: true, mal: 50, tittel: 'Finn √50 ved å prøve' }),
    C('regel', 'Slik anslår du', ['1. Finn kvadrattallene på hver side. 50 ligger mellom 49 og 64.', '2. Da ligger √50 mellom 7 og 8.', '3. Er tallet nær 49? Da er roten nær 7.', '4. Bruk kalkulatoren for flere desimaler: √50 ≈ 7,07.']),
    C('tips', 'Kalkulator', 'På kalkulatoren heter knappen √ . Tegnet ≈ betyr «omtrent lik». Rund av til det antall desimaler oppgaven ber om.'),
    E('Mellom hvilke hele tall ligger √30?', ['Kvadrattallene: 5² = 25 og 6² = 36.', '30 ligger mellom 25 og 36.', 'Da ligger √30 mellom 5 og 6.', 'Siden 30 er nærmere 25 enn 36, er √30 litt over 5 (≈ 5,48).']),
    O(3, [
      T('√20 ligger mellom 4 og et annet helt tall. Hva er det andre tallet?', 5, '4² = 16 og ?² er over 20.', '4² = 16 og 5² = 25. √20 ligger mellom 4 og 5.'),
      T('√80 ligger mellom 8 og et annet helt tall. Hvilket?', 9, '8² = 64 og 9² = 81.', '64 < 80 < 81. √80 ligger mellom 8 og 9.'),
      T('Avrund √30 til nærmeste hele tall.', 5, '√30 ≈ 5,48.', '√30 ≈ 5,48, og det rundes til 5.'),
      T('Avrund √60 til nærmeste hele tall.', 8, '7² = 49 og 8² = 64.', '√60 ≈ 7,75, og det rundes til 8.'),
      V('Hvilket tall er nærmest √10?', ['3,2', '3,0', '3,5', '4,0'], 0, '3² = 9 og 4² = 16.', '√10 ≈ 3,16. Alternativet 3,2 er nærmest.'),
      V('Hvilket av disse er størst?', ['√50', '7', '√48', '6,9'], 0, '7² = 49.', '√50 ≈ 7,07, som er over 7. √48 ≈ 6,93, og 6,9 er mindre enn det.')
    ])
  ]));

  U.push(S('Regne med kvadratrøtter', '🧮', [
    P('Hva skjer når vi regner med røtter? Noen ting funker, andre ikke. Det er derfor vi må undersøke og ikke gjette.'),
    C('regel', 'Regler som stemmer', ['√(a · b) = √a · √b. For eksempel √(4 · 9) = √36 = 6 = 2 · 3.', '√(a : b) = √a : √b. For eksempel √(100 : 4) = 5 = 10 : 2.', '(√a)² = a. For eksempel (√7)² = 7.', '√(a²) = a (for positive a). For eksempel √(13²) = 13.']),
    C('advarsel', 'Regler som IKKE stemmer', ['√(a + b) er <strong>ikke</strong> √a + √b. √(9 + 16) = √25 = 5, men √9 + √16 = 3 + 4 = 7.', '√(a − b) er <strong>ikke</strong> √a − √b.']),
    E('Regn ut √(4 · 25) på to måter.', ['Måte 1: 4 · 25 = 100, og √100 = 10.', 'Måte 2: √4 · √25 = 2 · 5 = 10.', 'Begge gir 10. Svar: 10.']),
    E('Regn ut √36 + √64.', ['√36 = 6 og √64 = 8.', '6 + 8 = 14.', 'Svar: 14. (Det er ikke √100 = 10!)']),
    O(3, [
      T('Regn ut: √16 + √9', 7, 'Regn hver rot for seg.', '4 + 3 = 7.'),
      T('Regn ut: √(16 + 9)', 5, 'Legg sammen under rottegnet først.', '16 + 9 = 25, og √25 = 5.'),
      T('Regn ut: √(9 · 16)', 12, '9 · 16 = 144.', '√144 = 12. Eller √9 · √16 = 3 · 4 = 12.'),
      T('Regn ut: (√13)²', 13, 'Kvadrat og rot angrer hverandre.', '(√13)² = 13.'),
      T('Regn ut: 3 · √25', 15, 'Rot først, så gange.', '√25 = 5, og 3 · 5 = 15.'),
      V('Er √(25 + 144) lik √25 + √144?', ['Nei', 'Ja', 'Bare noen ganger', 'Det kan ikke regnes ut'], 0, 'Regn ut begge sider.', '√169 = 13, men √25 + √144 = 5 + 12 = 17. De er ulike.', true),
      F('Vis med et moteksempel at √(a + b) ikke alltid er √a + √b.', ['Velg a = 9 og b = 16.', '√(9 + 16) = √25 = 5.', '√9 + √16 = 3 + 4 = 7.', '5 ≠ 7, så regelen stemmer ikke.'])
    ])
  ]));

  U.push(S('Bruk i praksis', '🏠', [
    P('Kvadratrøtter brukes alltid når du kjenner et <strong>areal</strong> og vil vite en <strong>lengde</strong>.'),
    E('En tomt er kvadratisk og har areal 400 m². Hvor mye gjerde trenger du rundt?', ['Finn siden: √400 = 20 m.', 'Omkretsen er 4 · 20 = 80 m.', 'Svar: 80 m gjerde.']),
    C('virkelighet', 'Fra areal til side', 'Et kvadratisk gulv med areal 36 m² har side √36 = 6 m. Et kvadratisk bilde med areal 900 cm² er 30 cm på hver side.'),
    O(4, [
      T('Et kvadratisk gulv har areal 81 m². Hvor lang er hver side?', 9, '√81.', '√81 = 9 m.', 'm'),
      T('En kvadratisk tomt har areal 625 m². Hvor lang er omkretsen?', 100, 'Finn siden og gang med 4.', '√625 = 25, og 4 · 25 = 100 m.', 'm'),
      T('Et kvadrat har omkrets 40 cm. Hva er arealet?', 100, 'Siden er omkretsen delt på 4.', 'Siden er 40 : 4 = 10 cm, og arealet er 10² = 100 cm².', 'cm²'),
      T('Et rektangel har sidene 4 cm og 9 cm. Hvor lang er siden i et kvadrat med samme areal?', 6, 'Arealet er 36.', 'Arealet er 4 · 9 = 36, og √36 = 6 cm.', 'cm'),
      V('Hvilket tall ganget med seg selv gir et tall nær 20?', ['4,5', '4', '5', '3,9'], 0, 'Prøv 4,5 · 4,5.', '4,5 · 4,5 = 20,25. Det er nærmest 20.'),
      F('Er det mulig at kvadratroten av et tall er større enn tallet selv? Undersøk med tall mellom 0 og 1.', ['Ja! For tall mellom 0 og 1 er roten større. √0,25 = 0,5, og 0,5 > 0,25.', 'For tall over 1 er roten mindre: √9 = 3. For 0 og 1 er roten lik tallet.'])
    ]),
    SJ('Dette kan du nå', ['Forklare hva en kvadratrot er', 'Kjenne kvadrattallene til 15²', 'Anslå røtter som ikke går opp', 'Regne med røtter og vite hva som ikke stemmer', 'Bruke kvadratrot til å finne sidelengder'])
  ]));

  M.register('utforsk', '8/kvadratrot', {
    tittel: 'Kvadratrøtter',
    ingress: 'Fra areal til sidelengde. Kvadratroten er det motsatte av kvadratet, og den er en viktig nøkkel til Pytagoras senere.',
    mal: ['regne med kvadratrøtter', 'forklare framgangsmåter og resultater', 'anslå røtter som ikke går opp'],
    ordliste: ORD, seksjoner: U
  });

  /* ====================== STEG ====================== */
  const T1 = [];
  T1.push(S('Steg 1: Kvadrat og rot', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Et <strong>kvadrat</strong> har fire like sider. Hvis siden er 3, er arealet 3 · 3 = 9.', true),
    W('kvadrat', { s: 3, tittel: 'Kvadrat' }),
    P('Nå snur vi det. Arealet er 9. Hvor lang er siden? Svaret er 3. Vi skriver <strong>√9 = 3</strong>. Det kalles <strong>kvadratrot</strong>.', true),
    C('regel', 'Husk', ['5² = 25 (side 5 gir areal 25)', '√25 = 5 (areal 25 gir side 5)']),
    E('Finn √16.', ['Vi leter etter et tall som ganget med seg selv gir 16.', '4 · 4 = 16.', 'Svar: √16 = 4. 🎉']),
    OS([
      V('Hva er √4?', ['2', '4', '8'], 0, '2 · 2 = ?', '2 · 2 = 4, så √4 = 2.', true),
      T('Regn ut: √9', 3, '3 · 3 = 9.', '3 · 3 = 9.'),
      T('Regn ut: √25', 5, '5 · 5 = 25.', '5 · 5 = 25.'),
      T('Regn ut: √1', 1, '1 · 1 = 1.', '1 · 1 = 1.')
    ])
  ]));
  T1.push(S('Steg 2: Kvadrattall', '2', [
    G('Nå lærer vi tallene som går opp.'),
    P('Tallene du får når du ganger et tall med seg selv, kalles <strong>kvadrattall</strong>.', true),
    TAB(['Tall', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [['Kvadrat', '1', '4', '9', '16', '25', '36', '49', '64', '81', '100']]),
    C('tips', 'Husk', 'Du kan se i tabellen over når du trenger det. Etter hvert kan du dem utenat.'),
    E('Finn √49.', ['Se i tabellen: 49 står under 7.', '7 · 7 = 49.', 'Svar: √49 = 7. 🎉']),
    OS([
      T('Regn ut: √36', 6, '6 · 6 = 36.', '6 · 6 = 36.'),
      T('Regn ut: √64', 8, '8 · 8 = 64.', '8 · 8 = 64.'),
      T('Regn ut: √81', 9, '9 · 9 = 81.', '9 · 9 = 81.'),
      T('Regn ut: √100', 10, '10 · 10 = 100.', '10 · 10 = 100.')
    ])
  ]));
  T1.push(S('Steg 3: Finne siden i et kvadrat', '3', [
    G('Her bruker vi røtter til noe nyttig.'),
    P('Når du vet arealet av et kvadrat, finner du siden med kvadratrot.', true),
    E('Et kvadrat har areal 25 cm². Hvor lang er siden?', ['Vi trenger et tall som ganget med seg selv gir 25.', '√25 = 5.', 'Siden er 5 cm. 🎉']),
    OS([
      T('Et kvadrat har areal 16 cm². Hvor lang er siden?', 4, '√16.', '4 · 4 = 16. Siden er 4 cm.', 'cm'),
      T('Et kvadrat har areal 36 cm². Hvor lang er siden?', 6, '√36.', '6 · 6 = 36. Siden er 6 cm.', 'cm'),
      T('Et kvadrat har areal 100 m². Hvor lang er siden?', 10, '√100.', '10 · 10 = 100. Siden er 10 m.', 'm'),
      T('Et kvadrat har side 7 cm. Hva er arealet?', 49, '7 · 7.', '7 · 7 = 49 cm².', 'cm²')
    ])
  ]));
  T1.push(S('Steg 4: Mellom to tall', '4', [
    G('Noen røtter går ikke opp. Vi kan likevel anslå dem.'),
    P('√10 er ikke et helt tall. Men vi vet at √9 = 3 og √16 = 4. Da ligger √10 <strong>mellom 3 og 4</strong>.', true),
    E('Mellom hvilke hele tall ligger √20?', ['16 er et kvadrattall. √16 = 4.', '25 er et kvadrattall. √25 = 5.', '20 ligger mellom 16 og 25.', 'Så √20 ligger mellom 4 og 5. 🎉']),
    OS([
      T('√10 ligger mellom 3 og et annet tall. Hvilket? (9 og 16 er kvadrattall.)', 4, '√16 = ?', '√9 = 3 og √16 = 4. √10 er mellom 3 og 4.'),
      T('√30 ligger mellom 5 og et annet tall. Hvilket? (25 og 36 er kvadrattall.)', 6, '√36 = ?', '√25 = 5 og √36 = 6. √30 er mellom 5 og 6.'),
      V('Er √50 mer enn 7 eller mindre enn 7? (49 er 7 · 7.)', ['Mer enn 7', 'Mindre enn 7'], 0, '50 er større enn 49.', '50 er større enn 49, så √50 er større enn 7.', true),
      V('Er √8 mer enn 3? (9 er 3 · 3.)', ['Nei, mindre', 'Ja, mer'], 0, '8 er mindre enn 9.', '8 er mindre enn 9, så √8 er mindre enn 3.', true)
    ]),
    SJ('Dette kan du nå', ['Forklare hva en kvadratrot er', 'Finne √ av kvadrattall', 'Finne siden i et kvadrat', 'Anslå røtter som ikke går opp'])
  ]));

  M.register('steg', '8/kvadratrot', {
    tittel: 'Kvadratrøtter',
    ingress: 'Små steg, tydelige eksempler og hjelp hele veien. Du lærer å finne kvadratrøtter.',
    mal: ['forstå hva en kvadratrot er', 'kjenne kvadrattallene', 'anslå røtter'],
    ordliste: ORD, seksjoner: T1
  });

  /* ====================== EKSTRA ====================== */
  M.ekstra['8/kvadratrot'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('rot', '√', 'Regn ut kvadratroten', 10, 'Finn tallet som ganget med seg selv gir tallet under rottegnet.', function (r) {
      const n = r.int(1, lett ? 10 : 20); return H.e('√' + n * n + ' =', n, '√' + n * n + ' = ' + n + ', fordi ' + n + ' · ' + n + ' = ' + n * n);
    }));
    sek.push(H.ek('side', '🟦', 'Side fra areal', 8, 'Finn sidelengden i kvadratet.', function (r) {
      const n = r.int(2, lett ? 10 : 25); return H.e('Et kvadrat har areal ' + n * n + ' cm². Hvor lang er siden (cm)?', n, '√' + n * n + ' = ' + n + ' cm');
    }));
    sek.push(H.ek('mellom', '🔍', 'Mellom to tall', 8, 'Hvilket helt tall ligger kvadratroten rett under? Skriv det laveste hele tallet.', function (r) {
      const n = r.int(2, lett ? 8 : 14); const x = r.int(n * n + 1, (n + 1) * (n + 1) - 1);
      return H.e('√' + x + ' ligger mellom to hele tall. Hva er det laveste?', n, n + '² = ' + n * n + ' og ' + (n + 1) + '² = ' + (n + 1) * (n + 1) + ', så √' + x + ' ligger mellom ' + n + ' og ' + (n + 1) + '. Det laveste er ' + n);
    }));
    if (!lett) {
      sek.push(H.ek('sum', '🧮', 'Regn med røtter', 8, 'Regn ut hver rot for seg. Pass på rekkefølgen.', function (r, i) {
        const a = r.int(2, 12), b = r.int(2, 12);
        if (i % 3 === 0) return H.e('√' + a * a + ' + √' + b * b + ' =', a + b, a + ' + ' + b + ' = ' + (a + b));
        if (i % 3 === 1) { const k = r.int(2, 5); return H.e('√' + a * a + ' · ' + k + ' =', a * k, a + ' · ' + k + ' = ' + a * k); }
        const g = a + 5; return H.e('(√' + g + ')² =', g, '(√' + g + ')² = ' + g);
      }));
    }
    return H.ekDef('Kvadratrøtter', sek);
  };
})();
