/* ============================================================
   Tema: Faktorisering og primtall (8. trinn) – UTFORSK + STEG + EKSTRA
   Læreplan 8.3: faktorisering og primtallsfaktorisering, brukt i brøkregning
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, SJ, S, ord } = H;
  const ORD = [
    ord(['faktor', 'faktorer', 'faktoren'], 'Et tall som går opp i et annet tall. 3 er en faktor i 12, fordi 3 · 4 = 12.'),
    ord(['primtall', 'primtallene'], 'Et tall større enn 1 som bare kan deles på 1 og seg selv. For eksempel 2, 3, 5, 7, 11.'),
    ord(['sammensatt tall', 'sammensatte tall'], 'Et tall som kan deles på flere enn 1 og seg selv, som 12.'),
    ord(['faktorisering', 'faktorisere'], 'Å skrive et tall som et produkt av faktorer.'),
    ord(['primtallsfaktorisering', 'primtallsfaktorer'], 'Å skrive et tall som et produkt av bare primtall, som 12 = 2 · 2 · 3.'),
    ord(['faktortre', 'faktortreet'], 'Et tre som deler et tall opp i faktorer helt til bare primtall er igjen.'),
    ord(['multiplum', 'multipler'], 'Tall i gangetabellen til et tall. Multiplene av 4 er 4, 8, 12, 16 …'),
    ord(['største felles faktor', 'SFF'], 'Det største tallet som går opp i begge tallene.'),
    ord(['minste felles multiplum', 'MFM'], 'Det minste tallet som både det ene og det andre tallet går opp i.'),
    ord(['delelig', 'delbar'], 'Et tall er delelig med 3 hvis du kan dele det på 3 uten rest.'),
    ord(['tverrsum', 'tverrsummen'], 'Summen av sifrene i et tall. Tverrsummen til 123 er 1 + 2 + 3 = 6.'),
    ord(['forkorte', 'forkorting'], 'Å dele teller og nevner på det samme tallet. Brøken har samme verdi.'),
    ord(['felles nevner'], 'To brøker har felles nevner når de har samme tall under brøkstreken.')
  ];

  /* ====================== UTFORSK ====================== */
  const U = [];
  U.push(S('Faktorer og delelighet', '🧩', [
    P('En <strong>faktor</strong> er et tall som går opp i et annet tall. 3 og 4 er faktorer i 12, fordi 3 · 4 = 12. Tallet 12 har faktorene <strong>1, 2, 3, 4, 6 og 12</strong>.'),
    C('tips', 'Slik finner du alle faktorene i et tall', 'Prøv å dele på 1, 2, 3 og så videre. Hvis det går opp, har du funnet to faktorer: 12 : 2 = 6 betyr at både 2 og 6 er faktorer. Du er ferdig når du kommer til tallet du allerede har funnet.'),
    H2x('Delelighetsregler'),
    TAB(['Delelig med', 'Regel', 'Eksempel'], [['2', 'Siste siffer er partall (0, 2, 4, 6, 8)', '348 ✓'], ['3', 'Tverrsummen er delelig med 3', '456: 4 + 5 + 6 = 15 ✓'], ['4', 'De to siste sifrene er delelige med 4', '716: 16 : 4 = 4 ✓'], ['5', 'Siste siffer er 0 eller 5', '735 ✓'], ['6', 'Delelig med både 2 og 3', '78: partall og 7 + 8 = 15 ✓'], ['9', 'Tverrsummen er delelig med 9', '738: 7 + 3 + 8 = 18 ✓'], ['10', 'Siste siffer er 0', '470 ✓']]),
    E('Er 612 delelig med 3? Og med 4?', ['Tverrsummen er 6 + 1 + 2 = 9. 9 er delelig med 3, så 612 er delelig med 3.', 'De to siste sifrene er 12. 12 : 4 = 3, så 612 er også delelig med 4.', 'Svar: ja på begge.']),
    O(1, [
      T('Hvor mange faktorer har tallet 12? (1, 2, 3, 4, 6, 12)', 6, 'Tell dem opp.', '1, 2, 3, 4, 6 og 12. Det er 6 faktorer.'),
      T('Hvor mange faktorer har tallet 20?', 6, 'Parene er 1·20, 2·10 og 4·5.', 'Faktorene er 1, 2, 4, 5, 10 og 20. Det er 6.'),
      V('Hvilket tall er delelig med 3?', ['231', '232', '235', '238'], 0, 'Finn tverrsummen.', '2 + 3 + 1 = 6, som er delelig med 3. De andre gir 7, 10 og 13.'),
      V('Hvilket tall er delelig med 9?', ['873', '874', '875', '876'], 0, 'Tverrsummen skal være delelig med 9.', '8 + 7 + 3 = 18, og 18 er delelig med 9.'),
      T('Hvor mange faktorer har 36? (Det er 1, 2, 3, 4, 6, 9, 12, 18, 36.)', 9, 'Tell opp.', 'Det er 9 faktorer. Merkelig nok er antallet odde: 36 er et kvadrattall.')
    ])
  ]));

  U.push(S('Primtall', '🔑', [
    P('Noen tall har bare to faktorer: 1 og seg selv. Slike tall kalles <strong>primtall</strong>. Tallet 7 er et primtall fordi bare 1 og 7 går opp i det. Tallet 8 er ikke et primtall, fordi 2 og 4 også går opp i det. Slike tall kalles <strong>sammensatte</strong>.'),
    TAB(['Tall', 'Faktorer', 'Type'], [['2', '1, 2', 'Primtall'], ['3', '1, 3', 'Primtall'], ['4', '1, 2, 4', 'Sammensatt'], ['5', '1, 5', 'Primtall'], ['6', '1, 2, 3, 6', 'Sammensatt'], ['7', '1, 7', 'Primtall'], ['9', '1, 3, 9', 'Sammensatt'], ['11', '1, 11', 'Primtall']]),
    C('regel', 'Fire ting å huske', ['<strong>1 er ikke et primtall</strong>. Det har bare én faktor.', '<strong>2 er det eneste partallet som er et primtall</strong>.', 'Primtallene opp til 30 er: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.', 'Det finnes uendelig mange primtall.']),
    C('virkelighet', 'Primtall beskytter deg på nettet', 'Når du betaler med kort på nett, bruker datamaskinene enorme primtall. Å gange to store primtall er lett. Å finne dem igjen fra produktet er nesten umulig. Det er det som gjør betalingen trygg.'),
    C('tips', 'Er 91 et primtall?', 'Test små primtall: 2, 3, 5, 7. Faktisk er 7 · 13 = 91, så 91 er sammensatt. Mange tror 91 er et primtall fordi det ser rart ut. Det er en klassisk felle.'),
    O(2, [
      V('Hvilket av disse er et primtall?', ['23', '21', '25', '27'], 0, 'Test om 3, 5 eller 7 går opp.', '21 = 3 · 7, 25 = 5 · 5, 27 = 3 · 9. Bare 23 har ingen andre faktorer enn 1 og 23.'),
      V('Hvilket av disse er IKKE et primtall?', ['51', '53', '47', '43'], 0, 'Prøv å dele på 3.', '51 = 3 · 17. De andre er primtall.'),
      T('Hvor mange primtall er det mellom 1 og 20?', 8, 'Se listen over.', 'De er 2, 3, 5, 7, 11, 13, 17, 19. Det er 8 stykker.'),
      V('Stemmer det at alle primtall er oddetall?', ['Nei, 2 er et partall', 'Ja, alltid', 'Nei, 1 er et primtall', 'Nei, 9 er et partall'], 0, 'Tenk på det minste primtallet.', '2 er et primtall og et partall. Alle andre primtall er oddetall.'),
      V('Er 1 et primtall?', ['Nei, det har bare én faktor', 'Ja', 'Ja, det er det første', 'Bare noen ganger'], 0, 'Et primtall skal ha nøyaktig to faktorer.', '1 har bare én faktor (seg selv). Primtall må ha nøyaktig to.', true),
      F('Hvorfor kan et partall større enn 2 aldri være et primtall?', ['Alle partall er delelige med 2.', 'Et partall større enn 2 har da minst faktorene 1, 2 og seg selv. Det er mer enn to faktorer, så tallet er sammensatt.'])
    ])
  ]));

  U.push(S('Primtallsfaktorisering og faktortre', '🌳', [
    P('Alle sammensatte tall kan skrives som et produkt av <strong>bare primtall</strong>. Det kalles <strong>primtallsfaktorisering</strong>. Du kan bruke et <strong>faktortre</strong>: del tallet i to faktorer, del de som ikke er primtall, og fortsett til alle greinene ender i primtall.'),
    W('faktortre', { n: 60, tittel: 'Faktortre: prøv ulike tall' }),
    C('regel', 'Viktig', ['Du får <strong>alltid</strong> de samme primtallene, uansett hvordan du deler.', 'Vi skriver gjerne med <strong>potens</strong>: 60 = 2 · 2 · 3 · 5 = 2² · 3 · 5.']),
    E('Primtallsfaktoriser 72.', ['72 = 8 · 9.', '8 = 2 · 2 · 2 og 9 = 3 · 3.', 'Så 72 = 2 · 2 · 2 · 3 · 3.', 'Med potens: 72 = 2³ · 3². Svar: 2³ · 3².']),
    E('Primtallsfaktoriser 84.', ['84 er delelig med 2: 84 = 2 · 42.', '42 = 2 · 21, og 21 = 3 · 7.', 'Så 84 = 2 · 2 · 3 · 7.', 'Med potens: 84 = 2² · 3 · 7.']),
    O(3, [
      V('Hva er primtallsfaktoriseringen av 30?', ['2 · 3 · 5', '5 · 6', '2 · 15', '3 · 10'], 0, 'Alle faktorene skal være primtall.', '30 = 2 · 15 = 2 · 3 · 5. De andre alternativene har sammensatte tall.'),
      V('Hva er primtallsfaktoriseringen av 90?', ['2 · 3² · 5', '2 · 3 · 15', '9 · 10', '2² · 3 · 5'], 0, '90 = 9 · 10.', '90 = 9 · 10 = 3 · 3 · 2 · 5 = 2 · 3² · 5.'),
      T('Hvor mange primtallsfaktorer har 24 (telt med gjentakelse)? 24 = 2 · 2 · 2 · 3.', 4, 'Tell hver faktor.', '24 = 2 · 2 · 2 · 3. Det er fire faktorer.'),
      T('Hva er det største primtallet i faktoriseringen av 98? (98 = 2 · 7 · 7)', 7, 'Se på faktorene 2 og 7.', '98 = 2 · 7². Det største primtallet er 7.'),
      T('Hvilket tall har primtallsfaktorene 2 · 2 · 3 · 5?', 60, 'Gang dem sammen.', '2 · 2 = 4, 4 · 3 = 12, 12 · 5 = 60.'),
      T('Hvilket tall er 2³ · 3 · 5?', 120, '2³ = 8.', '8 · 3 = 24, 24 · 5 = 120.'),
      F('Primtallsfaktoriser 150 med et faktortre og skriv svaret med potens.', ['150 = 10 · 15 = (2 · 5) · (3 · 5).', 'Så 150 = 2 · 3 · 5 · 5 = 2 · 3 · 5².'])
    ])
  ]));

  U.push(S('Største felles faktor og minste felles multiplum', '🤝', [
    P('Når du har to tall, kan du være interessert i hva de har <strong>felles</strong>.'),
    K([{ ikon: '⬇️', tittel: 'Største felles faktor (SFF)', tekst: 'Det største tallet som går opp i <strong>begge</strong> tallene. SFF(12, 18) = 6.' }, { ikon: '⬆️', tittel: 'Minste felles multiplum (MFM)', tekst: 'Det minste tallet som <strong>begge</strong> tallene går opp i. MFM(4, 6) = 12.' }]),
    E('Finn SFF og MFM for 12 og 18 med primtallsfaktorisering.', ['12 = 2² · 3 og 18 = 2 · 3².', '<strong>SFF</strong>: ta primtallene de har felles, med den minste potensen. Det er 2 · 3 = 6.', '<strong>MFM</strong>: ta alle primtallene, med den største potensen. Det er 2² · 3² = 36.', 'Svar: SFF = 6 og MFM = 36.']),
    C('tips', 'Sjekk', 'SFF · MFM er alltid lik produktet av de to tallene. 6 · 36 = 216 og 12 · 18 = 216. ✓'),
    E('Hvor ofte møtes to busser?', ['Buss A går hvert 4. minutt og buss B hvert 6. minutt. De starter sammen.', 'De møtes igjen etter MFM(4, 6) minutter.', 'Multipler av 4: 4, 8, 12, 16 … Multipler av 6: 6, 12, 18 …', 'Første felles er 12. Svar: Etter 12 minutter.']),
    O(3, [
      T('Hva er SFF(12, 18)?', 6, 'Største tall som går opp i begge.', '12 = 2² · 3 og 18 = 2 · 3². Felles: 2 · 3 = 6.'),
      T('Hva er SFF(24, 36)?', 12, '24 = 2³ · 3 og 36 = 2² · 3².', 'Felles: 2² · 3 = 12.'),
      T('Hva er SFF(28, 42)?', 14, '28 = 2² · 7 og 42 = 2 · 3 · 7.', 'Felles: 2 · 7 = 14.'),
      T('Hva er MFM(4, 6)?', 12, 'Skriv multiplene til begge.', '4, 8, 12 og 6, 12. Første felles er 12.'),
      T('Hva er MFM(6, 8)?', 24, 'Skriv multiplene.', '6, 12, 18, 24 og 8, 16, 24. Første felles er 24.'),
      T('Hva er MFM(12, 18)?', 36, 'Bruk primtallsfaktorene.', '2² · 3² = 36.'),
      T('To lysblink: ett blinker hvert 8. sekund og ett hvert 12. sekund. Etter hvor mange sekunder blinker de samtidig igjen?', 24, 'Finn MFM(8, 12).', 'MFM(8, 12) = 24 sekunder.', 'sekunder')
    ])
  ]));

  U.push(S('Faktorisering i brøkregning', '🍕', [
    P('Primtallsfaktorer gjør brøkregning enklere. Vi bruker dem til å <strong>forkorte</strong> og til å finne <strong>felles nevner</strong>.'),
    H2x('Forkorte brøker'),
    P('Å forkorte betyr å dele teller og nevner på det samme tallet. Den raskeste måten er å dele på <strong>SFF</strong>.'),
    E('Forkort 18/24 helt.', ['18 = 2 · 3² og 24 = 2³ · 3.', 'SFF(18, 24) = 2 · 3 = 6.', 'Del både teller og nevner på 6: 18 : 6 = 3 og 24 : 6 = 4.', 'Svar: 3/4.']),
    H2x('Legge sammen brøker med ulike nevnere'),
    C('regel', 'Slik gjør du', ['1. Finn <strong>MFM</strong> av nevnerne. Det er felles nevner.', '2. Utvid hver brøk til felles nevner.', '3. Legg sammen tellerne.', '4. Forkort om du kan.']),
    E('Regn ut 1/6 + 1/4.', ['MFM(6, 4) = 12. Felles nevner er 12.', '1/6 = 2/12 (utvid med 2) og 1/4 = 3/12 (utvid med 3).', '2/12 + 3/12 = 5/12.', 'Svar: 5/12.']),
    E('Regn ut 3/8 + 5/12.', ['8 = 2³ og 12 = 2² · 3. MFM = 2³ · 3 = 24.', '3/8 = 9/24 (utvid med 3). 5/12 = 10/24 (utvid med 2).', '9/24 + 10/24 = 19/24.', 'Svar: 19/24. Den kan ikke forkortes, fordi 19 er et primtall.']),
    O(4, [
      T('Forkort 18/24. Hva blir telleren?', 3, 'Del på 6.', '18 : 6 = 3 og 24 : 6 = 4. Svaret er 3/4, så telleren er 3.'),
      T('Forkort 36/48. Hva blir nevneren?', 4, 'SFF(36, 48) = 12.', '36 : 12 = 3 og 48 : 12 = 4. Svaret er 3/4, så nevneren er 4.'),
      T('Hva er felles nevner for 1/6 og 1/4?', 12, 'Finn MFM(6, 4).', 'MFM(6, 4) = 12.'),
      T('1/6 + 1/4 = ?/12. Hva er telleren?', 5, 'Utvid begge brøkene til tolvdeler.', '2/12 + 3/12 = 5/12.'),
      T('3/8 + 5/12 = ?/24. Hva er telleren?', 19, 'Utvid 3/8 og 5/12 til 24-deler.', '9/24 + 10/24 = 19/24.'),
      V('Hva er 1/2 + 1/3?', ['5/6', '2/5', '1/5', '2/6'], 0, 'MFM(2, 3) = 6.', '3/6 + 2/6 = 5/6.'),
      V('Hva er 5/6 − 1/4?', ['7/12', '4/2', '4/12', '1/2'], 0, 'MFM(6, 4) = 12.', '10/12 − 3/12 = 7/12.'),
      F('Forklar hvorfor 2/3 + 1/4 ikke blir 3/7. Hva er riktig svar?', ['Du kan ikke bare legge sammen tellerne og nevnerne. Brøkene må ha samme nevner først.', 'MFM(3, 4) = 12. 2/3 = 8/12 og 1/4 = 3/12.', '8/12 + 3/12 = 11/12. Riktig svar er 11/12.'])
    ])
  ]));

  U.push(S('Undersøk og argumenter', '🔎', [
    P('Nå skal du bruke det du har lært til å resonnere. Prøv noen eksempler før du svarer, og forklar hvorfor.'),
    O(4, [
      V('Påstand: «Summen av to primtall er alltid et partall.» Hva viser at den er feil?', ['2 + 3 = 5', '3 + 5 = 8', '7 + 11 = 18', '5 + 7 = 12'], 0, 'Du trenger et eksempel som gir oddetall.', '2 + 3 = 5 er et oddetall. Moteksempelet bruker primtallet 2, som er partall.'),
      V('Påstand: «Hvis et tall er delelig med 6, er det også delelig med 3.» Stemmer det?', ['Ja, alltid', 'Nei, aldri', 'Bare for partall', 'Bare for små tall'], 0, '6 = 2 · 3.', '6 = 2 · 3, så alle tall som er delelige med 6 har 3 som faktor.', true),
      V('Påstand: «Hvis et tall er delelig med 3, er det også delelig med 6.» Hvilket moteksempel viser at den er feil?', ['9', '12', '18', '24'], 0, 'Finn et oddetall delelig med 3.', '9 er delelig med 3, men ikke med 6 (9 : 6 = 1,5).'),
      F('Er 2 · 3 · 5 + 1 = 31 et primtall? Er 2 · 3 · 5 · 7 + 1 = 211 et primtall? Undersøk og kommenter.', ['31 er et primtall (ingen av 2, 3 eller 5 går opp).', '211 er også et primtall. (Test 2, 3, 5, 7, 11, 13: ingen går opp, og 15² = 225 er over 211.)', 'Men 2 · 3 · 5 · 7 · 11 · 13 + 1 = 30031 = 59 · 509 er IKKE et primtall. Mønsteret holder ikke alltid.']),
      F('Du har 36 blyanter og 48 viskelærer og skal lage like pakker uten rester. Hvor mange pakker kan du lage på det meste, og hva er i hver?', ['SFF(36, 48) = 12. Du kan lage 12 pakker.', 'I hver pakke er det 36 : 12 = 3 blyanter og 48 : 12 = 4 viskelærer.'])
    ]),
    SJ('Dette kan du nå', ['Finne faktorer og bruke delelighetsregler', 'Forklare hva et primtall er', 'Primtallsfaktorisere med faktortre', 'Finne SFF og MFM', 'Forkorte og legge sammen brøker med faktorisering'])
  ]));

  function H2x(t) { return H.H2(t); }

  M.register('utforsk', '8/faktorisering', {
    tittel: 'Faktorisering og primtall',
    ingress: 'Tall kan bygges av primtall, som legoklosser. Lær å ta dem fra hverandre, og bruk det i brøkregning.',
    mal: ['beskrive og utforske faktorisering og primtallsfaktorisering', 'bruke faktorisering i brøkregning'],
    ordliste: ORD, seksjoner: U
  });

  /* ====================== STEG ====================== */
  const T1 = [];
  T1.push(S('Steg 1: Faktorer', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Et tall <strong>går opp</strong> i et annet tall hvis du kan dele uten rest. 3 går opp i 12, fordi 12 : 3 = 4. Vi sier at 3 er en <strong>faktor</strong> i 12.', true),
    C('regel', 'Faktorene i 12', ['1 · 12 = 12', '2 · 6 = 12', '3 · 4 = 12', 'Faktorene er <strong>1, 2, 3, 4, 6 og 12</strong>.']),
    E('Finn faktorene i 10.', ['Hvilke tall ganget sammen gir 10?', '1 · 10 = 10 og 2 · 5 = 10.', 'Faktorene er 1, 2, 5 og 10. 🎉']),
    OS([
      V('Er 3 en faktor i 12?', ['Ja', 'Nei'], 0, '3 · 4 = 12.', 'Ja. 3 · 4 = 12.', true),
      V('Er 5 en faktor i 12?', ['Ja', 'Nei'], 1, 'Går 12 opp i femgangen?', 'Nei. 12 er ikke i 5-gangen (5, 10, 15 …).', true),
      T('Hvor mange faktorer har 6? (1, 2, 3, 6)', 4, 'Tell dem.', '1, 2, 3 og 6. Det er 4.'),
      T('Hvor mange faktorer har 8? (1, 2, 4, 8)', 4, 'Tell dem.', '1, 2, 4 og 8. Det er 4.')
    ])
  ]));
  T1.push(S('Steg 2: Primtall', '2', [
    G('Noen tall er spesielle. Se her!'),
    P('Et <strong>primtall</strong> har bare to faktorer: 1 og seg selv.', true),
    C('regel', 'Primtallene opp til 20', ['<strong>2, 3, 5, 7, 11, 13, 17, 19</strong>', '1 er <strong>ikke</strong> et primtall.', 'Alle andre partall enn 2 er <strong>ikke</strong> primtall.']),
    E('Er 9 et primtall?', ['Hvilke faktorer har 9? 1, 3 og 9.', 'Det er tre faktorer, ikke bare to.', 'Så 9 er ikke et primtall. 🎉']),
    OS([
      V('Hvilket er et primtall?', ['7', '9', '12'], 0, 'Bare 1 og seg selv går opp.', '7 går bare opp i 1 og 7.', true),
      V('Hvilket er IKKE et primtall?', ['15', '13', '11'], 0, '3 · 5 = 15.', '15 = 3 · 5. Det er ikke et primtall.', true),
      V('Er 2 et primtall?', ['Ja', 'Nei'], 0, '2 har faktorene 1 og 2.', 'Ja. 2 er det eneste partallet som er et primtall.', true),
      T('Hvor mange primtall er det mellom 1 og 10?', 4, 'Sjekk tallene 2 til 9 ett og ett: går det opp i noe annet enn 1 og seg selv?', 'Det er 4: 2, 3, 5 og 7.')
    ])
  ]));
  T1.push(S('Steg 3: Faktortre', '3', [
    G('Nå skal vi dele tall i små biter av primtall.'),
    P('Et <strong>faktortre</strong> deler et tall i to faktorer. Så deler du videre til du bare har primtall.', true),
    W('faktortre', { n: 12, tittel: 'Faktortre' }),
    E('Primtallsfaktoriser 12.', ['12 = 3 · 4.', '3 er et primtall. 4 = 2 · 2.', 'Så 12 = 2 · 2 · 3. 🎉']),
    E('Primtallsfaktoriser 30.', ['30 = 5 · 6.', '5 er et primtall. 6 = 2 · 3.', 'Så 30 = 2 · 3 · 5. 🎉']),
    OS([
      V('Hvilket er primtallsfaktoriseringen av 20?', ['2 · 2 · 5', '4 · 5', '2 · 10'], 0, '20 = 4 · 5 og 4 = 2 · 2.', '20 = 2 · 2 · 5. Alle er primtall.', true),
      V('Hvilket er primtallsfaktoriseringen av 18?', ['2 · 3 · 3', '3 · 6', '2 · 9'], 0, '18 = 2 · 9 og 9 = 3 · 3.', '18 = 2 · 3 · 3.', true),
      T('Hvilket tall er 2 · 2 · 3 · 3?', 36, 'Gang fra venstre.', '2 · 2 = 4. 4 · 3 = 12. 12 · 3 = 36.'),
      T('Hvilket tall er 2 · 3 · 5?', 30, 'Gang fra venstre.', '2 · 3 = 6. 6 · 5 = 30.')
    ])
  ]));
  T1.push(S('Steg 4: Felles faktor og forkorte', '4', [
    G('Nå bruker vi faktorer til å gjøre brøker enklere.'),
    P('Å <strong>forkorte</strong> en brøk betyr å dele teller og nevner på det samme tallet. Brøken er like stor etterpå.', true),
    E('Forkort 6/8.', ['Hvilket tall går opp i både 6 og 8? Det er 2.', '6 : 2 = 3 og 8 : 2 = 4.', 'Svar: 3/4. 🎉']),
    E('Forkort 12/18.', ['Det største tallet som går opp i begge er 6.', '12 : 6 = 2 og 18 : 6 = 3.', 'Svar: 2/3. 🎉']),
    OS([
      T('Forkort 4/8. Hva blir nevneren? (Del på 4.)', 2, 'Del både teller og nevner på 4.', '4 : 4 = 1 og 8 : 4 = 2. Svaret er 1/2. Nevneren er 2.'),
      T('Forkort 6/9. Hva blir telleren? (Del på 3.)', 2, 'Del på 3.', '6 : 3 = 2 og 9 : 3 = 3. Svaret er 2/3. Telleren er 2.'),
      T('Hva er det største tallet som går opp i både 12 og 18?', 6, 'Tenk på faktorene til begge.', '12 har 1, 2, 3, 4, 6, 12. 18 har 1, 2, 3, 6, 9, 18. Største felles er 6.'),
      T('Forkort 10/15. Hva blir telleren? (Del på 5.)', 2, 'Del på 5.', '10 : 5 = 2 og 15 : 5 = 3. Svaret er 2/3. Telleren er 2.')
    ])
  ]));
  T1.push(S('Steg 5: Legge sammen brøker', '5', [
    G('Siste steg! Her bruker vi felles nevner.'),
    P('For å legge sammen brøker må nevnerne være like. Vi finner et tall som begge nevnerne går opp i.', true),
    E('Regn ut 1/2 + 1/4.', ['Nevnerne er 2 og 4. Tallet 4 passer for begge.', '1/2 = 2/4 (gang teller og nevner med 2).', '2/4 + 1/4 = 3/4.', 'Svar: 3/4. 🎉']),
    E('Regn ut 1/3 + 1/2.', ['Nevnerne er 3 og 2. Tallet 6 passer for begge.', '1/3 = 2/6 og 1/2 = 3/6.', '2/6 + 3/6 = 5/6.', 'Svar: 5/6. 🎉']),
    OS([
      T('1/2 + 1/4 = ?/4. Hva er telleren?', 3, '1/2 = 2/4.', '2/4 + 1/4 = 3/4. Telleren er 3.'),
      T('1/3 + 1/6 = ?/6. Hva er telleren?', 3, '1/3 = 2/6.', '2/6 + 1/6 = 3/6. Telleren er 3.'),
      T('1/2 + 1/3 = ?/6. Hva er telleren?', 5, '1/2 = 3/6 og 1/3 = 2/6.', '3/6 + 2/6 = 5/6. Telleren er 5.'),
      T('Hva er felles nevner for 1/4 og 1/6? (Det minste tallet begge går opp i.)', 12, '4, 8, 12 og 6, 12.', 'Første felles er 12.')
    ]),
    SJ('Dette kan du nå', ['Finne faktorer', 'Kjenne igjen primtall', 'Lage et faktortre', 'Forkorte brøker', 'Legge sammen brøker med felles nevner'])
  ]));

  M.register('steg', '8/faktorisering', {
    tittel: 'Faktorisering og primtall',
    ingress: 'Små steg, tydelige eksempler og hjelp hele veien. Du lærer om faktorer, primtall og brøker.',
    mal: ['finne faktorer og primtall', 'lage faktortre', 'forkorte og legge sammen brøker'],
    ordliste: ORD, seksjoner: T1
  });

  /* ====================== EKSTRA ====================== */
  const gcd = (a, b) => b ? gcd(b, a % b) : a; const lcm = (a, b) => a / gcd(a, b) * b;
  const ant = n => { let c = 0; for (let i = 1; i <= n; i++) if (n % i === 0) c++; return c; };
  const pf = n => { const r = []; for (let p = 2; n > 1; p++) while (n % p === 0) { r.push(p); n /= p; } return r; };
  M.ekstra['8/faktorisering'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('faktorer', '🧩', 'Antall faktorer', 8, 'Hvor mange faktorer har tallet? Husk å telle med 1 og tallet selv.', function (r) {
      const n = r.pick(lett ? [6, 8, 9, 10, 12, 14, 15, 16, 18, 20] : [24, 28, 30, 36, 40, 42, 45, 48, 50, 60, 72]);
      return H.e('Hvor mange faktorer har ' + n + '?', ant(n), ant(n) + ' (faktorene er ' + Array.from({ length: n }, (_, i) => i + 1).filter(x => n % x === 0).join(', ') + ')');
    }));
    sek.push(H.ek('pf', '🌳', 'Primtallsfaktorer', 8, lett ? 'Hvor mange primtallsfaktorer har tallet? Tell med gjentakelse: 12 = 2 · 2 · 3 gir 3.' : 'Primtallsfaktoriser tallet. Svar med det største primtallet.', function (r) {
      const n = r.pick(lett ? [12, 18, 20, 24, 28, 30, 36] : [60, 84, 90, 126, 150, 220, 234, 280, 330]);
      const f = pf(n);
      return lett ? H.e('Hvor mange primtallsfaktorer har ' + n + '?', f.length, f.length + ' (' + n + ' = ' + f.join(' · ') + ')') : H.e('Hva er det største primtallet i faktoriseringen av ' + n + '?', f[f.length - 1], f[f.length - 1] + ' (' + n + ' = ' + f.join(' · ') + ')');
    }));
    sek.push(H.ek('sff', '⬇️', 'Største felles faktor', 8, 'Finn SFF.', function (r) {
      const g = r.pick(lett ? [2, 3, 4, 5, 6] : [4, 6, 8, 9, 12, 14, 15]); const k = r.pick([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 7], [2, 7]]);
      const a = g * k[0], b = g * k[1]; return H.e('SFF(' + a + ', ' + b + ') =', g, 'SFF(' + a + ', ' + b + ') = ' + g);
    }));
    sek.push(H.ek('mfm', '⬆️', 'Minste felles multiplum', 8, 'Finn MFM.', function (r) {
      const p = r.pick(lett ? [[2, 3], [3, 4], [4, 6], [2, 5], [3, 6], [4, 5]] : [[6, 8], [8, 12], [9, 12], [10, 15], [12, 18], [14, 21], [6, 10], [15, 20]]);
      return H.e('MFM(' + p[0] + ', ' + p[1] + ') =', lcm(p[0], p[1]), 'MFM(' + p[0] + ', ' + p[1] + ') = ' + lcm(p[0], p[1]));
    }));
    sek.push(H.ek('forkort', '🍕', 'Forkort brøker', 8, 'Forkort brøken helt. Skriv nevneren i svaret.', function (r) {
      const p = r.pick([[1, 2], [2, 3], [3, 4], [3, 5], [5, 6], [3, 8], [5, 8], [7, 9], [5, 12]]); const k = r.int(2, lett ? 4 : 9);
      return H.e('Forkort ' + p[0] * k + '/' + p[1] * k + '. Hva blir nevneren?', p[1], p[0] + '/' + p[1] + ' (delt på ' + k + '), nevneren er ' + p[1]);
    }));
    sek.push(H.ek('plussbrok', '➕', 'Legge sammen brøker', 8, 'Finn felles nevner og skriv telleren i svaret.', function (r) {
      const p = r.pick(lett ? [[2, 4], [2, 6], [3, 6], [2, 3], [4, 8]] : [[3, 4], [4, 6], [6, 8], [4, 10], [6, 9], [8, 12], [5, 6], [3, 10]]);
      const a = r.pick([1, 1, 1, 2, 3].filter(x => x < p[0])), b = r.pick([1, 1, 1, 2, 3].filter(x => x < p[1])); const m = lcm(p[0], p[1]);
      const t = a * (m / p[0]) + b * (m / p[1]);
      return H.e(a + '/' + p[0] + ' + ' + b + '/' + p[1] + ' = ?/' + m + '. Hva er telleren?', t, a + '/' + p[0] + ' + ' + b + '/' + p[1] + ' = ' + a * (m / p[0]) + '/' + m + ' + ' + b * (m / p[1]) + '/' + m + ' = ' + t + '/' + m + '. Telleren er ' + t);
    }));
    return H.ekDef('Faktorisering og primtall', sek);
  };
})();
