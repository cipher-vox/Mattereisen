/* ============================================================
   Tema: Potenser (8. trinn) – UTFORSK + STEG + EKSTRA
   Læreplan 8.1: regne med potenser og forklare framgangsmåter og resultater
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, H2, SJ, S, ord } = H;
  const ORD = [
    ord(['potens', 'potenser', 'potensen'], 'En kort måte å skrive gjentatt gange. 2³ betyr 2 · 2 · 2.'),
    ord(['grunntall', 'grunntallet'], 'Tallet som blir gangt med seg selv. I 2³ er grunntallet 2.'),
    ord(['eksponent', 'eksponenten'], 'Det lille hevede tallet. Det sier hvor mange ganger grunntallet er med. I 2³ er eksponenten 3.'),
    ord(['kvadrat', 'kvadrattall'], 'Et tall ganget med seg selv, som 5² = 25.'),
    ord(['kube', 'kubikktall'], 'Et tall ganget med seg selv tre ganger, som 2³ = 8.'),
    ord(['tierpotens', 'tierpotenser'], 'En potens med 10 som grunntall, som 10⁴ = 10 000.'),
    ord(['standardform'], 'En måte å skrive store og små tall på: et tall mellom 1 og 10 ganger en tierpotens, for eksempel 3,5 · 10⁶.'),
    ord(['opphøyd'], 'Uttrykk for potens. 2³ leses «2 opphøyd i 3».')
  ];

  /* ====================== UTFORSK ====================== */
  const U = [];
  U.push(S('Hva er en potens?', '⚡', [
    P('Hva om du skulle skrive 2 · 2 · 2 · 2 · 2 · 2 · 2 · 2? Det blir langt. Heldigvis finnes det en kortere skrivemåte: <strong>2⁸</strong>. Det leses «to opphøyd i åtte» og kalles en <strong>potens</strong>.'),
    W('potens', { a: 2, n: 5, tittel: 'Potensbygger: se hvordan en potens vokser' }),
    C('regel', 'Deler i en potens', ['Tallet nederst er <strong>grunntallet</strong>: det som ganges.', 'Det lille tallet oppe til høyre er <strong>eksponenten</strong>: hvor mange ganger grunntallet er med.', 'Eksempel: 3⁴ = 3 · 3 · 3 · 3 = 81. Grunntall 3, eksponent 4.']),
    C('advarsel', 'Vanlig feil', '3⁴ er <strong>ikke</strong> 3 · 4 = 12. Det er 3 · 3 · 3 · 3 = 81. Eksponenten sier hvor mange ganger du skal skrive grunntallet, ikke hva du skal gange med.'),
    C('virkelighet', 'Potenser vokser fort', 'Brett et papir på midten. Det blir 2 lag. Brett igjen: 4 lag. Etter 10 brett er det 2¹⁰ = 1024 lag! Potenser brukes til å beskrive ting som vokser fort, som bakterier og rente på rente.'),
    O(1, [
      T('Regn ut: 2⁴', 16, '2 · 2 · 2 · 2.', '2 · 2 = 4, 4 · 2 = 8, 8 · 2 = 16.'),
      T('Regn ut: 3³', 27, '3 · 3 · 3.', '3 · 3 = 9, 9 · 3 = 27.'),
      T('Regn ut: 5²', 25, '5 · 5.', '5 · 5 = 25.'),
      T('Regn ut: 10³', 1000, '10 · 10 · 10.', '10 · 10 = 100, 100 · 10 = 1000.'),
      V('Hva er eksponenten i 7⁵?', ['5', '7', '35', '12'], 0, 'Det lille tallet.', 'Eksponenten er det lille tallet oppe til høyre: 5.'),
      V('Hvilket uttrykk betyr 4 · 4 · 4?', ['4³', '3⁴', '4 · 3', '12'], 0, 'Tallet som gjentas er grunntallet.', '4 er med 3 ganger, så det er 4³ = 64.')
    ])
  ]));

  U.push(S('Kvadrat og kube', '🟦', [
    P('Potenser med eksponent 2 og 3 har egne navn fordi de passer med figurer:'),
    K([{ ikon: '🟦', tittel: 'Kvadrat: a²', tekst: 'Arealet av et kvadrat med side a. 5² = 25 er arealet av et kvadrat med side 5.' }, { ikon: '🧊', tittel: 'Kube: a³', tekst: 'Volumet av en kube med kant a. 3³ = 27 er volumet av en kube med kant 3.' }]),
    W('kvadrat', { s: 4, tittel: 'Kvadrat og areal' }),
    TAB(['n', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [['n²', '1', '4', '9', '16', '25', '36', '49', '64', '81', '100'], ['n³', '1', '8', '27', '64', '125', '216', '343', '512', '729', '1000']]),
    C('tips', 'Lær kvadrattallene', 'Kvadrattallene opp til 15² er nyttige å kunne: 11² = 121, 12² = 144, 13² = 169, 14² = 196, 15² = 225. De dukker opp igjen i kvadratrøtter og Pytagoras.'),
    O(2, [
      T('Hva er arealet av et kvadrat med side 9 cm?', 81, 'Side · side.', '9 · 9 = 81 cm².', 'cm²'),
      T('Hva er volumet av en kube med kant 4 cm?', 64, 'Kant · kant · kant.', '4 · 4 · 4 = 64 cm³.', 'cm³'),
      T('Regn ut: 12²', 144, '12 · 12.', '12 · 12 = 144.'),
      T('Regn ut: 6³', 216, '6 · 6 · 6.', '6 · 6 = 36, og 36 · 6 = 216.'),
      T('Et kvadrat har areal 49 cm². Hvor lang er siden?', 7, 'Hvilket tall ganget med seg selv gir 49?', '7 · 7 = 49. Siden er 7 cm.', 'cm')
    ])
  ]));

  U.push(S('Spesielle potenser og negative grunntall', '🔍', [
    P('Noen potenser trenger litt ekstra oppmerksomhet.'),
    C('regel', 'Eksponent 1 og 0', ['a¹ = a. Tallet er med én gang: 7¹ = 7.', 'a⁰ = 1 (når a ikke er 0). Det er en avtale som gjør at reglene våre fungerer. 5⁰ = 1, 100⁰ = 1.']),
    E('Hvorfor er 5⁰ = 1?', ['Se på mønsteret: 5³ = 125, 5² = 25, 5¹ = 5.', 'Hver gang eksponenten blir én mindre, deler vi på 5: 125 : 5 = 25, 25 : 5 = 5.', 'Neste steg er 5 : 5 = 1. Altså er 5⁰ = 1.']),
    H2('Negative tall som grunntall'),
    P('Her må du passe på parentesene. <strong>(−2)³</strong> betyr (−2) · (−2) · (−2). Men <strong>−2³</strong> betyr −(2 · 2 · 2).'),
    TAB(['Uttrykk', 'Regning', 'Svar'], [['(−3)²', '(−3) · (−3)', '9'], ['−3²', '−(3 · 3)', '−9'], ['(−2)³', '(−2) · (−2) · (−2)', '−8'], ['(−2)⁴', '(−2) · (−2) · (−2) · (−2)', '16']]),
    C('regel', 'Fortegnsregel for potenser', ['Negativt grunntall og <strong>partall</strong> som eksponent gir <strong>positivt</strong> svar.', 'Negativt grunntall og <strong>oddetall</strong> som eksponent gir <strong>negativt</strong> svar.']),
    O(3, [
      T('Regn ut: 9¹', 9, 'Eksponent 1.', '9¹ = 9.'),
      T('Regn ut: 25⁰', 1, 'Alt opphøyd i 0 er 1.', '25⁰ = 1.'),
      T('Regn ut: (−4)²', 16, '(−4) · (−4).', 'Minus ganger minus er pluss: 16.'),
      T('Regn ut: −4²', -16, 'Regn 4² først, og sett minus foran.', '4² = 16, så −4² = −16.'),
      T('Regn ut: (−2)³', -8, 'Tre faktorer gir negativt.', '(−2) · (−2) = 4, og 4 · (−2) = −8.'),
      T('Regn ut: (−1)⁹⁹', -1, 'Oddetall som eksponent.', 'Negativt grunntall og odde eksponent gir negativt: −1.'),
      V('Hva er størst: (−3)² eller −3²?', ['(−3)²', '−3²', 'De er like', 'Kan ikke avgjøres'], 0, 'Regn ut begge.', '(−3)² = 9 og −3² = −9. 9 er størst.')
    ])
  ]));

  U.push(S('Regneregler for potenser', '📐', [
    P('Potensreglene sparer deg for mye regning. Og du kan <strong>forklare</strong> hvorfor de stemmer ved å skrive ut.'),
    H2('Gange potenser med samme grunntall'),
    E('Hva er 2³ · 2⁴?', ['2³ = 2 · 2 · 2 og 2⁴ = 2 · 2 · 2 · 2.', 'Til sammen er 2 med 3 + 4 = 7 ganger.', 'Altså 2³ · 2⁴ = 2⁷ = 128.', 'Regel: aᵐ · aⁿ = aᵐ⁺ⁿ.']),
    H2('Dele potenser med samme grunntall'),
    E('Hva er 5⁶ : 5⁴?', ['5⁶ = 5 · 5 · 5 · 5 · 5 · 5 og 5⁴ = 5 · 5 · 5 · 5.', 'Fire femtall kan forkortes bort. Det er to igjen.', 'Altså 5⁶ : 5⁴ = 5² = 25.', 'Regel: aᵐ : aⁿ = aᵐ⁻ⁿ.']),
    H2('Potens av en potens'),
    E('Hva er (2³)²?', ['(2³)² = 2³ · 2³.', 'Det er 2 med 3 + 3 = 6 ganger. Altså 2⁶ = 64.', 'Regel: (aᵐ)ⁿ = aᵐ·ⁿ. Du ganger eksponentene.']),
    TAB(['Regel', 'Eksempel'], [['aᵐ · aⁿ = aᵐ⁺ⁿ', '3² · 3⁴ = 3⁶'], ['aᵐ : aⁿ = aᵐ⁻ⁿ', '7⁵ : 7² = 7³'], ['(aᵐ)ⁿ = aᵐ·ⁿ', '(5²)³ = 5⁶'], ['(a · b)ⁿ = aⁿ · bⁿ', '(2 · 3)² = 2² · 3² = 36']]),
    C('advarsel', 'Regelene gjelder bare med samme grunntall', '2³ · 3⁴ kan <strong>ikke</strong> skrives som en enkelt potens. Du må regne ut 8 · 81 = 648.'),
    O(3, [
      T('2³ · 2⁴ = 2^?. Hva er eksponenten?', 7, 'Legg sammen eksponentene.', '3 + 4 = 7.'),
      T('5⁶ : 5⁴ = 5^?. Hva er eksponenten?', 2, 'Trekk fra eksponentene.', '6 − 4 = 2.'),
      T('(3²)³ = 3^?. Hva er eksponenten?', 6, 'Gang eksponentene.', '2 · 3 = 6.'),
      T('Regn ut: 2³ · 2²', 32, '2⁵.', '2³ · 2² = 2⁵ = 32.'),
      T('Regn ut: 10⁵ : 10²', 1000, '10³.', '10⁵ : 10² = 10³ = 1000.'),
      T('Regn ut: (2²)³', 64, '2⁶.', '(2²)³ = 2⁶ = 64.'),
      F('Forklar hvorfor 4² · 4³ = 4⁵ ved å skrive ut produktene.', ['4² = 4 · 4 og 4³ = 4 · 4 · 4.', 'Sammen er det 4 · 4 · 4 · 4 · 4, altså 5 firere. Det er 4⁵ = 1024.'])
    ])
  ]));

  U.push(S('Tierpotenser', '🔟', [
    P('Potenser med grunntall 10 kalles <strong>tierpotenser</strong>. De er enkle fordi eksponenten forteller hvor mange nuller det er.'),
    W('potens', { tier: true, n: 3, tittel: 'Tierpotenser: dra i eksponenten' }),
    TAB(['Potens', 'Tall', 'Navn'], [['10¹', '10', 'ti'], ['10²', '100', 'hundre'], ['10³', '1 000', 'tusen'], ['10⁶', '1 000 000', 'million'], ['10⁹', '1 000 000 000', 'milliard'], ['10⁰', '1', 'én'], ['10⁻¹', '0,1', 'en tidel'], ['10⁻²', '0,01', 'en hundredel'], ['10⁻³', '0,001', 'en tusendel']]),
    C('regel', 'Mønster', ['Positiv eksponent: <strong>så mange nuller</strong> som eksponenten viser.', 'Negativ eksponent: <strong>så mange desimaler</strong> som eksponenten viser. 10⁻³ = 0,001 har tre desimaler.']),
    O(2, [
      T('Regn ut: 10⁴', 10000, 'Fire nuller.', '10⁴ = 10000 (ti tusen).'),
      T('Hvor mange nuller er det i 10⁷?', 7, 'Eksponenten viser antallet.', '10⁷ = 10 000 000 har 7 nuller.'),
      T('Regn ut: 10⁻²', 0.01, 'To desimaler.', '10⁻² = 0,01.'),
      T('Regn ut: 3 · 10³', 3000, '3 ganger tusen.', '3 · 1000 = 3000.'),
      T('Regn ut: 45 · 10²', 4500, 'Flytt komma to plasser.', '45 · 100 = 4500.'),
      V('Hvilket av disse er størst?', ['10³', '9 · 10²', '99 · 10', '999'], 0, 'Regn dem ut.', '10³ = 1000, 9 · 10² = 900, 99 · 10 = 990 og 999. Størst er 1000.')
    ])
  ]));

  U.push(S('Standardform: skrive store og små tall', '🪐', [
    P('Noen tall er så store eller små at det blir tungvint å skrive dem ut. Lysets fart er 300 000 000 m/s. Tykkelsen på et hårstrå er omtrent 0,00007 m. Med <strong>standardform</strong> skriver vi det kort.'),
    C('regel', 'Standardform', ['Et tall mellom 1 og 10 ganger en tierpotens: <strong>a · 10ⁿ</strong> der 1 ≤ a < 10.', 'Store tall får <strong>positiv</strong> eksponent, små tall får <strong>negativ</strong> eksponent.']),
    TAB(['Vanlig skrivemåte', 'Standardform', 'Hva skjedde?'], [['300 000 000', '3 · 10⁸', 'Komma flyttet 8 plasser mot venstre'], ['4 500 000', '4,5 · 10⁶', 'Komma flyttet 6 plasser mot venstre'], ['0,00007', '7 · 10⁻⁵', 'Komma flyttet 5 plasser mot høyre'], ['0,0032', '3,2 · 10⁻³', 'Komma flyttet 3 plasser mot høyre']]),
    E('Skriv 5 200 000 i standardform.', ['Vi flytter kommaet til det står bak første siffer: 5,2.', 'Vi flyttet kommaet 6 plasser mot venstre.', 'Altså er eksponenten 6.', 'Svar: 5,2 · 10⁶.']),
    E('Skriv 0,0046 i standardform.', ['Vi flytter kommaet til det står bak første siffer som ikke er null: 4,6.', 'Vi flyttet kommaet 3 plasser mot høyre.', 'Eksponenten er da negativ: −3.', 'Svar: 4,6 · 10⁻³.']),
    C('virkelighet', 'Store og små i virkeligheten', ['Avstand Jorda–Solen: omtrent 1,5 · 10⁸ km.', 'Jordas befolkning: omtrent 8 · 10⁹.', 'Størrelsen på et virus: omtrent 1 · 10⁻⁷ m.']),
    O(3, [
      T('Skriv 3 000 000 som 3 · 10^? Hva er eksponenten?', 6, 'Tell nullene.', '3 000 000 = 3 · 10⁶. Eksponenten er 6.'),
      T('Skriv 4 500 000 som 4,5 · 10^? Hva er eksponenten?', 6, 'Flytt kommaet.', '4,5 · 10⁶ = 4 500 000. Eksponenten er 6.'),
      T('Skriv 0,0003 som 3 · 10^? Hva er eksponenten?', -4, 'Små tall får negativ eksponent.', '0,0003 = 3 · 10⁻⁴. Eksponenten er −4.'),
      T('Regn ut: 2,5 · 10³', 2500, '2,5 ganger tusen.', '2,5 · 1000 = 2500.'),
      T('Regn ut: 6 · 10⁻²', 0.06, '6 hundredeler.', '6 · 0,01 = 0,06.'),
      V('Hvilket tall er ikke skrevet riktig i standardform?', ['25 · 10⁴', '2,5 · 10⁵', '9 · 10⁻³', '1 · 10⁸'], 0, 'Tallet foran skal være mellom 1 og 10.', '25 er ikke mellom 1 og 10. Riktig er 2,5 · 10⁵.'),
      T('Lysets fart er omtrent 3 · 10⁸ m/s. Hvor mange meter går lyset på 2 sekunder? Svar i millioner meter (600 millioner = 600).', 600, '3 · 10⁸ = 300 millioner.', '300 millioner · 2 = 600 millioner meter.', 'millioner meter')
    ])
  ]));

  U.push(S('Problemløsing med potenser', '🧠', [
    P('Potenser dukker opp når noe <strong>dobles</strong>, <strong>tredobles</strong> eller vokser med samme faktor om og om igjen.'),
    O(4, [
      T('En bakterie deler seg i to hvert 20. minutt. Du starter med 1 bakterie. Hvor mange er det etter 2 timer (6 delinger)?', 64, '2⁶.', 'Etter 6 delinger: 2⁶ = 64.'),
      T('Et rykte sprer seg slik at hver som hører det, forteller det til 3 nye neste time. Ingen forteller det flere ganger. 1 person starter. Hvor mange får høre det i time nummer 4?', 81, '3⁴.', 'Time 1: 3, time 2: 9, time 3: 27, time 4: 81. Det er 3⁴.'),
      V('Hva er størst: 2¹⁰ eller 10²?', ['2¹⁰', '10²', 'De er like', 'Det kommer an på'], 0, 'Regn ut.', '2¹⁰ = 1024 og 10² = 100.'),
      V('Hva er størst: 3⁴ eller 4³?', ['3⁴', '4³', 'De er like', 'Det kommer an på'], 0, 'Regn ut begge.', '3⁴ = 81 og 4³ = 64.'),
      T('Hvilket tall mangler? 2^? = 256', 8, 'Dobbel igjen og igjen: 2, 4, 8, 16, 32, 64, 128, 256.', 'Eksponenten er 8, fordi 2⁸ = 256.'),
      F('Du får velge: 1 000 kr hver dag i 30 dager, eller 1 øre den første dagen og så dobbelt opp hver dag (2 øre, 4 øre …) i 30 dager. Hva velger du? Begrunn med regning.', ['Første valg: 30 · 1000 = 30 000 kr.', 'Andre valg: på dag 30 får du 2²⁹ = 536 870 912 øre = omtrent 5,4 millioner kroner bare den dagen!', 'Til sammen blir det 2³⁰ − 1 = 1 073 741 823 øre, over 10 millioner kroner. Det andre valget er best. Dobling vokser veldig fort.']),
      F('Forklar med egne ord hvorfor 2³ ikke er det samme som 3 · 2, og hvorfor 2³ · 2² = 2⁵.', ['2³ = 2 · 2 · 2 = 8, men 3 · 2 = 6. Eksponenten sier hvor mange ganger 2 er med, ikke hva vi ganger med.', '2³ · 2² = (2 · 2 · 2) · (2 · 2) = fem toere = 2⁵ = 32.'])
    ]),
    SJ('Dette kan du nå', ['Forklare hva en potens er', 'Regne ut potenser, også med negative grunntall', 'Bruke potensreglene og forklare dem', 'Regne med tierpotenser', 'Skrive store og små tall i standardform'])
  ]));

  M.register('utforsk', '8/potenser', {
    tittel: 'Potenser',
    ingress: 'Potenser er en kort måte å skrive gjentatt gange på. De trengs for å beskrive både enorme og bittesmå tall.',
    mal: ['regne med potenser', 'forklare framgangsmåter og resultater', 'skrive store og små tall i standardform'],
    ordliste: ORD, seksjoner: U
  });

  /* ====================== STEG ====================== */
  const T1 = [];
  T1.push(S('Steg 1: Gjentatt gange', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Når du ganger det samme tallet om og om igjen, kan du skrive det kort. 2 · 2 · 2 skriver vi <strong>2³</strong>.', true),
    W('potens', { a: 2, n: 3, tittel: 'Potensbygger' }),
    C('regel', 'Dette må du huske', ['Tallet nederst er <strong>grunntallet</strong>. Det er tallet vi ganger.', 'Det lille tallet er <strong>eksponenten</strong>. Det sier hvor mange ganger tallet er med.', '2³ betyr 2 · 2 · 2.']),
    E('Hva betyr 3⁴?', ['Grunntallet er 3. Eksponenten er 4.', 'Det betyr 3 · 3 · 3 · 3.', '3 · 3 = 9. 9 · 3 = 27. 27 · 3 = 81.', 'Svar: 81. 🎉']),
    OS([
      V('Hva betyr 2³?', ['2 · 2 · 2', '2 · 3', '2 + 2 + 2'], 0, '2 er med 3 ganger.', '2³ = 2 · 2 · 2 = 8.', true),
      V('Hva er grunntallet i 5²?', ['5', '2'], 0, 'Det store tallet.', 'Grunntallet er 5.', true),
      T('Regn ut: 2³', 8, '2 · 2 · 2.', '2 · 2 = 4. 4 · 2 = 8.'),
      T('Regn ut: 3²', 9, '3 · 3.', '3 · 3 = 9.')
    ])
  ]));
  T1.push(S('Steg 2: Kvadrat og kube', '2', [
    G('To potenser har egne navn.'),
    P('<strong>a²</strong> er et <strong>kvadrat</strong>: arealet av en firkant med side a. <strong>a³</strong> er en <strong>kube</strong>: volumet av en terning med kant a.', true),
    W('kvadrat', { s: 3, tittel: 'Kvadrat med side 3' }),
    C('tips', 'Kvadrattallene', '1, 4, 9, 16, 25, 36, 49, 64, 81, 100. Prøv å lære dem etter hvert.'),
    E('Hvor stort er arealet av et kvadrat med side 5?', ['Areal er side ganger side.', '5 · 5 = 25.', 'Det er 5². Svar: 25. 🎉']),
    OS([
      T('Regn ut: 4²', 16, '4 · 4.', '4 · 4 = 16.'),
      T('Regn ut: 7²', 49, '7 · 7.', '7 · 7 = 49.'),
      T('Regn ut: 10²', 100, '10 · 10.', '10 · 10 = 100.'),
      T('Regn ut: 2³ · 1 (kuben med kant 2)', 8, '2 · 2 · 2.', '2 · 2 · 2 = 8.')
    ])
  ]));
  T1.push(S('Steg 3: Tierpotenser', '3', [
    G('Dette er det enkleste. Potenser med 10.'),
    P('Potenser med 10 er lette. Eksponenten sier hvor mange <strong>nuller</strong> det er.', true),
    W('potens', { tier: true, n: 3, tittel: 'Tierpotenser' }),
    C('regel', 'Husk', ['10² = 100 (to nuller)', '10³ = 1 000 (tre nuller)', '10⁶ = 1 000 000 (seks nuller)']),
    E('Regn ut 10⁴.', ['Eksponenten er 4.', 'Det betyr fire nuller.', '10⁴ = 10 000. 🎉']),
    E('Regn ut 3 · 10².', ['10² = 100.', '3 · 100 = 300.', 'Svar: 300. 🎉']),
    OS([
      T('Regn ut: 10³', 1000, 'Tre nuller.', '10³ = 1000.'),
      T('Hvor mange nuller er det i 10⁵?', 5, 'Eksponenten sier det.', '10⁵ = 100 000. Det er 5 nuller.'),
      T('Regn ut: 2 · 10²', 200, '2 · 100.', '2 · 100 = 200.'),
      T('Regn ut: 7 · 10³', 7000, '7 · 1000.', '7 · 1000 = 7000.')
    ])
  ]));
  T1.push(S('Steg 4: Regneregler', '4', [
    G('Her er et lurt trick for å gange potenser.'),
    P('Når grunntallet er <strong>likt</strong>, kan du legge sammen eksponentene når du ganger.', true),
    E('Regn ut 2² · 2³.', ['2² = 2 · 2 og 2³ = 2 · 2 · 2.', 'Til sammen er 2 med 2 + 3 = 5 ganger.', '2⁵ = 32. 🎉']),
    C('regel', 'Regelen', ['2² · 2³ = 2⁵ (legg sammen eksponentene)', '5⁶ : 5⁴ = 5² (trekk fra eksponentene)']),
    OS([
      T('3² · 3¹ = 3^?. Hva er eksponenten?', 3, '2 + 1.', '2 + 1 = 3.'),
      T('2⁴ · 2² = 2^?. Hva er eksponenten?', 6, '4 + 2.', '4 + 2 = 6.'),
      T('10⁵ : 10² = 10^?. Hva er eksponenten?', 3, '5 − 2.', '5 − 2 = 3.'),
      T('Regn ut: 2² · 2²', 16, '2⁴.', '2² · 2² = 2⁴ = 16.')
    ])
  ]));
  T1.push(S('Steg 5: Store tall kort', '5', [
    G('Siste steg! Hvordan skrive veldig store tall kort?'),
    P('Standardform brukes til å skrive store tall kort. 3 000 000 skriver vi <strong>3 · 10⁶</strong>.', true),
    E('Skriv 4 000 000 i standardform.', ['Første siffer er 4. Resten er nuller.', 'Det er seks nuller. Det blir 10⁶.', 'Svar: 4 · 10⁶. 🎉']),
    E('Regn ut 5 · 10⁴.', ['10⁴ = 10000 (ti tusen).', '5 · 10 000 = 50 000.', 'Svar: 50 000. 🎉']),
    OS([
      T('3 000 = 3 · 10^?. Hva er eksponenten?', 3, 'Tell nullene.', '3000 har tre nuller.'),
      T('8 000 000 = 8 · 10^?. Hva er eksponenten?', 6, 'Tell nullene.', 'Det er 6 nuller.'),
      T('Regn ut: 6 · 10³', 6000, '6 · 1000.', '6 · 1000 = 6000.'),
      T('Regn ut: 4 · 10⁵', 400000, '4 · 100 000.', '4 · 100 000 = 400000 (400 000).')
    ]),
    SJ('Dette kan du nå', ['Forklare hva en potens er', 'Regne ut kvadrat og kube', 'Regne med tierpotenser', 'Gange potenser med samme grunntall', 'Skrive store tall i standardform'])
  ]));

  M.register('steg', '8/potenser', {
    tittel: 'Potenser',
    ingress: 'Små steg, tydelige eksempler og hjelp hele veien. Du lærer å regne med potenser.',
    mal: ['forstå hva en potens er', 'regne med kvadrat, kube og tierpotenser', 'bruke enkle potensregler'],
    ordliste: ORD, seksjoner: T1
  });

  /* ====================== EKSTRA ====================== */
  M.ekstra['8/potenser'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('verdi', '⚡', 'Regn ut potensen', lett ? 8 : 10, 'Skriv ut gangestykket og regn.', function (r, i) {
      const a = lett ? r.int(2, 5) : r.int(2, 9); const n = lett ? r.int(2, 3) : r.int(2, a > 5 ? 3 : 5);
      return H.e(a + '<sup>' + n + '</sup> =', Math.pow(a, n), a + '<sup>' + n + '</sup> = ' + Array(n).fill(a).join(' · ') + ' = ' + Math.pow(a, n));
    }));
    sek.push(H.ek('kvadrat', '🟦', 'Kvadrattall', 8, 'Regn ut kvadratet.', function (r) {
      const n = r.int(2, lett ? 10 : 16); return H.e(n + '<sup>2</sup> =', n * n, n + '<sup>2</sup> = ' + n + ' · ' + n + ' = ' + n * n);
    }));
    sek.push(H.ek('regel', '📐', 'Potensregler', 8, 'Bruk potensreglene. Skriv eksponenten i svaret.', function (r, i) {
      const a = r.int(2, 9), m = r.int(2, 6), n = r.int(2, 5);
      if (lett || i % 3 === 0) return H.e(a + '<sup>' + m + '</sup> · ' + a + '<sup>' + n + '</sup> = ' + a + '<sup>?</sup>', m + n, 'Legg sammen eksponentene: ' + m + ' + ' + n + ' = ' + (m + n));
      if (i % 3 === 1) { const mm = m + n; return H.e(a + '<sup>' + mm + '</sup> : ' + a + '<sup>' + n + '</sup> = ' + a + '<sup>?</sup>', m, 'Trekk fra eksponentene: ' + mm + ' − ' + n + ' = ' + m); }
      return H.e('(' + a + '<sup>' + m + '</sup>)<sup>' + n + '</sup> = ' + a + '<sup>?</sup>', m * n, 'Gang eksponentene: ' + m + ' · ' + n + ' = ' + (m * n));
    }));
    sek.push(H.ek('tier', '🔟', 'Tierpotenser', 8, 'Regn ut tallet.', function (r, i) {
      const k = r.int(2, 6), a = r.int(2, 9);
      if (i % 2 === 0) return H.e('10<sup>' + k + '</sup> =', Math.pow(10, k), '10<sup>' + k + '</sup> = ' + M.fmt(Math.pow(10, k)));
      return H.e(a + ' · 10<sup>' + Math.min(k, 5) + '</sup> =', a * Math.pow(10, Math.min(k, 5)), a + ' · ' + M.fmt(Math.pow(10, Math.min(k, 5))) + ' = ' + M.fmt(a * Math.pow(10, Math.min(k, 5))));
    }));
    if (!lett) sek.push(H.ek('std', '🪐', 'Standardform', 8, 'Skriv tallet som a · 10<sup>n</sup>. Hva er eksponenten n?', function (r, i) {
      const a = r.int(1, 9), n = r.int(3, 9);
      if (i % 2 === 0) return H.e(a + '·10^' + n + ' = ' + M.fmt(a * Math.pow(10, n)) + '. Hva er eksponenten n?', n, 'Antall nuller: ' + n);
      const k = r.int(2, 6); return H.e('0,' + '0'.repeat(k - 1) + a + ' = ' + a + ' · 10<sup>n</sup>. Hva er n?', -k, 'Kommaet flyttes ' + k + ' plasser mot høyre, så n = −' + k);
    }));
    return H.ekDef('Potenser', sek);
  };
})();
