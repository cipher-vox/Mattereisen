/* ============================================================
   Tema: Regneregler og hoderegning (8. trinn)  – UTFORSK + STEG + EKSTRA
   Læreplan 8.2: kommutative, assosiative og distributive egenskaper
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, H2, SJ, S, ord, e } = H;
  const ORD = [
    ord(['regneregel', 'regneregler'], 'En regel som alltid stemmer når du regner, uansett hvilke tall du bruker.'),
    ord(['kommutativ', 'kommutative', 'kommutativ lov'], 'Du kan bytte om rekkefølgen og få samme svar. Det gjelder pluss og gange.'),
    ord(['assosiativ', 'assosiative'], 'Du kan flytte på parentesene når du bare legger sammen, eller bare ganger.'),
    ord(['distributiv', 'distributive', 'distributiv lov'], 'Gange inn i en parentes: a · (b + c) = a · b + a · c.'),
    ord(['hoderegning'], 'Å regne uten kalkulator og uten å skrive alt. Smarte strategier gjør det lettere.'),
    ord(['faktor', 'faktorer'], 'Et tall du ganger med. I 3 · 4 er 3 og 4 faktorer.'),
    ord(['sum', 'summen'], 'Svaret når du legger sammen.'),
    ord(['produkt', 'produktet'], 'Svaret når du ganger.'),
    ord(['regnerekkefølge'], 'Rekkefølgen vi regner i: parentes først, så potens, så gange og dele, til slutt pluss og minus.'),
    ord(['moteksempel', 'moteksempel'], 'Ett eksempel som viser at en påstand ikke alltid stemmer.')
  ];

  /* ====================== UTFORSK ====================== */
  const U = [];

  U.push(S('Hvorfor har vi regneregler?', '🧠', [
    P('Tenk deg at du skal regne ut <strong>25 · 36</strong> i hodet. Det er tungt. Men hvis du vet at 36 = 4 · 9, og at 25 · 4 = 100, blir det enkelt: 25 · 4 · 9 = 100 · 9 = <strong>900</strong>. Du brukte <strong>regneregler</strong> til å gjøre regnestykket lettere.'),
    P('Regnereglene er ikke noe vi bare skal pugge. De er <strong>verktøy</strong> som hjelper deg å regne smart, og som senere brukes i algebra.'),
    K([{ ikon: '🔄', tittel: 'Bytte om', tekst: '3 + 8 = 8 + 3. Rekkefølgen kan byttes når du legger sammen eller ganger.' }, { ikon: '🧩', tittel: 'Gruppere', tekst: 'Du kan velge hvilke tall du regner sammen først.' }, { ikon: '✂️', tittel: 'Dele opp', tekst: 'Et vanskelig tall kan deles i to lette: 7 · 13 = 7 · 10 + 7 · 3.' }]),
    C('virkelighet', 'Hvor brukes dette?', 'Kassadamer, bygningsarbeidere og regnskapsførere regner raskt i hodet hver dag. De bruker akkurat disse triksene. Du bruker dem også når du overslår hva noe koster.'),
    O(1, [
      V('Hva er 6 + 9 + 4 lettest å regne ut som?', ['(6 + 4) + 9', '6 + (9 · 4)', '9 − 6 + 4', '6 · 9 + 4'], 0, 'Se etter to tall som blir 10.', '6 + 4 = 10, og 10 + 9 = 19. Når du bare legger sammen, kan du velge rekkefølgen selv.'),
      T('Regn ut: 2 · 7 · 5', 70, 'Gang 2 og 5 først.', '2 · 5 = 10, og 10 · 7 = 70.')
    ])
  ]));

  U.push(S('Bytte om: den kommutative regelen', '🔄', [
    P('Når du <strong>legger sammen</strong> eller <strong>ganger</strong>, kan du bytte om rekkefølgen uten at svaret endres. Det kalles den <strong>kommutative</strong> regelen.'),
    TAB(['Regneart', 'Regelen', 'Eksempel'], [['Pluss', 'a + b = b + a', '3 + 8 = 8 + 3 = 11'], ['Gange', 'a · b = b · a', '4 · 7 = 7 · 4 = 28']]),
    C('tips', 'Se det som et rektangel', 'Tegn et rektangel med 3 rader og 4 ruter i hver rad. Det er 3 · 4 = 12 ruter. Snu rektanglet på siden: nå er det 4 rader med 3 ruter, altså 4 · 3 = 12. Det er de samme rutene, så svaret er likt.'),
    C('advarsel', 'Minus og dele kan ikke byttes om', 'Hvis du bytter om i et minusstykke, endres svaret: 8 − 3 = 5, men 3 − 8 = −5. Det samme gjelder dele: 8 : 2 = 4, men 2 : 8 = 0,25.'),
    E('Regn ut 4 + 17 + 6 på en smart måte.', ['Vi ser at 4 og 6 til sammen blir 10.', 'Vi bytter om: 4 + 6 + 17.', '4 + 6 = 10, og 10 + 17 = 27.', 'Svar: 27.']),
    O(2, [
      T('Regn ut smart: 8 + 13 + 2', 23, 'Hvilke to tall blir 10?', '8 + 2 = 10, og 10 + 13 = 23.'),
      T('Regn ut smart: 5 · 9 · 2', 90, 'Gang 5 og 2 først.', '5 · 2 = 10, og 10 · 9 = 90.'),
      T('Regn ut smart: 25 · 7 · 4', 700, '25 · 4 = 100.', '25 · 4 = 100, og 100 · 7 = 700.'),
      V('Hvilket regnestykke gir samme svar som 9 − 4?', ['4 − 9', '−4 + 9', '4 : 9', '9 : 4'], 1, 'Minus 4 er det samme som å legge til −4.', '9 − 4 = 5 og −4 + 9 = 5. Å bytte om på tallene i et minusstykke gir et annet svar, men vi kan flytte tallet med fortegnet.'),
      V('Stemmer det at 12 : 4 = 4 : 12?', ['Nei', 'Ja', 'Bare noen ganger', 'Det kan ikke regnes ut'], 0, 'Regn ut begge sidene.', '12 : 4 = 3, men 4 : 12 = 1/3. Å bytte om gjelder ikke for dele.')
    ])
  ]));

  U.push(S('Gruppere: den assosiative regelen', '🧩', [
    P('Når du bare <strong>legger sammen</strong> eller bare <strong>ganger</strong>, kan du flytte på parentesene. Det kalles den <strong>assosiative</strong> regelen.'),
    TAB(['Regneart', 'Regelen'], [['Pluss', '(a + b) + c = a + (b + c)'], ['Gange', '(a · b) · c = a · (b · c)']]),
    E('Regn ut 38 + 47 + 3 på en smart måte.', ['Vi leter etter tall som passer sammen. 47 + 3 = 50.', 'Vi skriver 38 + (47 + 3).', '38 + 50 = 88.', 'Svar: 88.']),
    E('Regn ut 5 · 17 · 2 på en smart måte.', ['5 · 2 gir 10. Det er lett å gange med 10.', 'Vi skriver 17 · (5 · 2) = 17 · 10.', '17 · 10 = 170.', 'Svar: 170.']),
    C('tips', 'Tall som passer sammen', ['Pluss: leter etter tall som blir <strong>10, 100 eller 1000</strong>.', 'Gange: 2 · 5 = 10, 4 · 25 = 100, 8 · 125 = 1000.']),
    O(2, [
      T('Regn ut smart: 36 + 29 + 4', 69, 'Hvilke to tall passer sammen?', '36 + 4 = 40, og 40 + 29 = 69.'),
      T('Regn ut smart: 4 · 13 · 25', 1300, '4 · 25 = 100.', '4 · 25 = 100, og 100 · 13 = 1300.'),
      T('Regn ut smart: 125 · 7 · 8', 7000, '125 · 8 = 1000.', '125 · 8 = 1000, og 1000 · 7 = 7000.'),
      V('Hva er riktig om (6 · 5) · 4 og 6 · (5 · 4)?', ['De er like', 'Det første er størst', 'Det andre er størst', 'Vi kan ikke vite det'], 0, 'Regn ut begge.', '(6 · 5) · 4 = 30 · 4 = 120 og 6 · (5 · 4) = 6 · 20 = 120.')
    ])
  ]));

  U.push(S('Dele opp: den distributive regelen', '✂️', [
    P('Dette er den aller mest nyttige regelen. Du kan <strong>dele opp</strong> et tall og gange hver del for seg:'),
    C('regel', 'Den distributive regelen', ['a · (b + c) = a · b + a · c', 'a · (b − c) = a · b − a · c']),
    W('arealmodell', { type: 'dist', a: 3, b: 4, c: 2, tittel: 'Arealmodell: a · (b + c)' }),
    P('Arealet av hele rektanglet er a · (b + c). Men vi kan også finne arealet av de to delene hver for seg og legge dem sammen: a · b + a · c. Det blir det samme.'),
    E('Regn ut 7 · 13 i hodet.', ['Del opp 13 i 10 + 3.', '7 · 13 = 7 · 10 + 7 · 3.', '7 · 10 = 70 og 7 · 3 = 21.', '70 + 21 = 91. Svar: 91.']),
    E('Regn ut 6 · 98 i hodet.', ['98 er nesten 100. Vi skriver 98 = 100 − 2.', '6 · 98 = 6 · 100 − 6 · 2.', '600 − 12 = 588.', 'Svar: 588.']),
    C('tips', 'Når bruker jeg pluss, og når minus?', 'Hvis tallet er rett under et rundt tall (98, 99, 197), er det ofte lettest å bruke minus. Hvis det er rett over (102, 51), bruker du pluss.'),
    O(3, [
      T('Regn ut: 8 · 12 (del opp 12)', 96, '12 = 10 + 2.', '8 · 10 + 8 · 2 = 80 + 16 = 96.'),
      T('Regn ut: 9 · 24', 216, '24 = 20 + 4.', '9 · 20 + 9 · 4 = 180 + 36 = 216.'),
      T('Regn ut: 5 · 99', 495, '99 = 100 − 1.', '5 · 100 − 5 · 1 = 500 − 5 = 495.'),
      T('Regn ut: 4 · 198', 792, '198 = 200 − 2.', '4 · 200 − 4 · 2 = 800 − 8 = 792.'),
      T('Regn ut: 3 · 17 + 3 · 13', 90, 'Trekk sammen: 3 · (17 + 13).', '3 · (17 + 13) = 3 · 30 = 90.'),
      V('Hvilket uttrykk er likt 6 · (10 + 4)?', ['6 · 10 + 6 · 4', '6 · 10 + 4', '6 + 10 · 6 + 4', '6 · 10 · 4'], 0, 'Gang 6 med begge delene.', 'Hver del i parentesen skal ganges med 6: 6 · 10 + 6 · 4 = 60 + 24 = 84.')
    ])
  ]));

  U.push(S('Regnerekkefølge: hva regner vi først?', '🔢', [
    P('Hva er 2 + 3 · 4? Er det 20 eller 14? Alle som regner riktig, får <strong>14</strong>, fordi vi har en felles avtale om rekkefølge.'),
    C('regel', 'Regnerekkefølgen', ['1. <strong>Parenteser</strong>', '2. <strong>Potenser</strong>', '3. <strong>Gange og dele</strong> (fra venstre mot høyre)', '4. <strong>Pluss og minus</strong> (fra venstre mot høyre)']),
    E('Regn ut 2 + 3 · 4', ['Gange kommer før pluss.', '3 · 4 = 12.', '2 + 12 = 14.', 'Svar: 14.']),
    E('Regn ut (2 + 3) · 4', ['Parentesen først: 2 + 3 = 5.', '5 · 4 = 20.', 'Svar: 20. Parentesen endret svaret!']),
    E('Regn ut 20 − 6 : 2 + 1', ['Dele før minus og pluss: 6 : 2 = 3.', 'Nå står 20 − 3 + 1.', 'Minus og pluss regnes fra venstre: 20 − 3 = 17, og 17 + 1 = 18.', 'Svar: 18.']),
    C('advarsel', 'Vanlig feil', 'Mange regner 2 + 3 · 4 som (2 + 3) · 4 fordi de regner fra venstre. Husk at gange kommer før pluss. Kalkulatorer følger også denne regelen.'),
    O(2, [
      T('Regn ut: 5 + 2 · 6', 17, 'Gange først.', '2 · 6 = 12, og 5 + 12 = 17.'),
      T('Regn ut: (5 + 2) · 6', 42, 'Parentes først.', '5 + 2 = 7, og 7 · 6 = 42.'),
      T('Regn ut: 30 − 4 · 5', 10, 'Gange først.', '4 · 5 = 20, og 30 − 20 = 10.'),
      T('Regn ut: 18 : 3 + 2 · 4', 14, 'Dele og gange først.', '18 : 3 = 6, 2 · 4 = 8, og 6 + 8 = 14.'),
      T('Regn ut: 2 · (9 − 4) + 7', 17, 'Parentes, så gange, så pluss.', '9 − 4 = 5, 2 · 5 = 10, og 10 + 7 = 17.'),
      V('Hvor skal du sette en parentes for at 3 + 4 · 5 skal bli 35?', ['(3 + 4) · 5', '3 + (4 · 5)', '3 + 4 · (5)', 'Ingen steder'], 0, 'Du vil at pluss skal regnes først.', '(3 + 4) · 5 = 7 · 5 = 35.')
    ])
  ]));

  U.push(S('Smarte strategier for hoderegning', '🚀', [
    P('Nå setter vi reglene sammen til strategier du kan bruke i hodet. Velg den som passer best til tallene.'),
    TAB(['Strategi', 'Slik gjør du det', 'Eksempel'], [
      ['Runde og justere', 'Rund til et rundt tall, og rett opp etterpå.', '49 + 38 = 50 + 38 − 1 = 87'],
      ['Dele opp', 'Del opp det ene tallet.', '6 · 14 = 6 · 10 + 6 · 4 = 84'],
      ['Doble og halvere', 'Doble det ene og halvere det andre.', '5 · 18 = 10 · 9 = 90'],
      ['Gange med 5', 'Gang med 10 og del på 2.', '5 · 34 = 340 : 2 = 170'],
      ['Gange med 9', 'Gang med 10 og trekk fra tallet.', '9 · 7 = 70 − 7 = 63'],
      ['Gange med 25', 'Del på 4 og gang med 100.', '25 · 24 = 6 · 100 = 600']
    ]),
    E('Regn ut 5 · 36 med «doble og halvere».', ['Vi halverer 36 til 18 og dobler 5 til 10.', '5 · 36 = 10 · 18.', '10 · 18 = 180.', 'Svar: 180.']),
    E('Regn ut 25 · 32.', ['25 er en fjerdedel av 100.', '32 : 4 = 8. Vi deler 32 på 4 og ganger med 100.', '8 · 100 = 800.', 'Svar: 800.']),
    O(3, [
      T('Regn ut: 59 + 27 (rund 59 til 60)', 86, '60 + 27 − 1.', '60 + 27 = 87, og 87 − 1 = 86.'),
      T('Regn ut: 83 − 49', 34, 'Rund 49 til 50.', '83 − 50 = 33, og 33 + 1 = 34.'),
      T('Regn ut: 9 · 8', 72, '10 · 8 − 8.', '80 − 8 = 72.'),
      T('Regn ut: 5 · 48', 240, 'Halver 48 og doble 5.', '10 · 24 = 240.'),
      T('Regn ut: 25 · 16', 400, 'Del 16 på 4.', '16 : 4 = 4, og 4 · 100 = 400.'),
      T('Regn ut: 15 · 14', 210, '15 · 14 = 15 · 10 + 15 · 4.', '150 + 60 = 210.'),
      F('Forklar med egne ord hvordan du regner 47 · 6 i hodet. Bruk gjerne en regneregel.', ['Mange løsninger er mulige. Eksempel: 47 · 6 = 40 · 6 + 7 · 6 = 240 + 42 = 282 (dele opp).', 'Eller: 47 · 6 = 50 · 6 − 3 · 6 = 300 − 18 = 282 (runde og justere).', 'Begge gir 282. En god forklaring sier hvilken regel du bruker.'])
    ])
  ]));

  U.push(S('Stemmer det alltid? Undersøk og argumenter', '🔎', [
    P('I matte er det ikke nok at noe stemmer noen ganger. Vi vil vite om det stemmer <strong>alltid</strong>. Du kan finne ut av det ved å <strong>prøve mange eksempler</strong>, og ett eneste <strong>moteksempel</strong> er nok til å vise at en påstand ikke stemmer.'),
    C('tips', 'Slik undersøker du en påstand', ['1. Prøv med flere ulike tall.', '2. Hvis du finner ett tilfelle der det ikke stemmer, er påstanden feil (moteksempel).', '3. Hvis det alltid stemmer, prøv å forklare hvorfor, for eksempel med en arealtegning.']),
    E('Påstand: «a − b = b − a». Stemmer det?', ['Prøv a = 5 og b = 3.', '5 − 3 = 2, men 3 − 5 = −2.', 'Resultatene er ikke like. Dette er et moteksempel.', 'Påstanden stemmer ikke.']),
    O(4, [
      V('Påstand: «Hvis du bytter om to tall i et plussstykke, blir svaret det samme.» Stemmer det?', ['Ja, alltid', 'Nei, aldri', 'Bare for små tall', 'Bare for like tall'], 0, 'Prøv noen eksempler.', 'Dette er den kommutative regelen for pluss. 3 + 8 = 8 + 3. Det gjelder alle tall.', true),
      V('Påstand: «a : b = b : a». Hvilket moteksempel viser at den er feil?', ['a = 6, b = 3: 6 : 3 = 2 men 3 : 6 = 0,5', 'a = 2, b = 2', 'a = 0', 'a = 1, b = 1'], 0, 'Du trenger tall som gir ulike svar.', '6 : 3 = 2, men 3 : 6 = 0,5. De er ulike, så påstanden stemmer ikke. (Der a = b stemmer den, men det er ikke nok.)'),
      V('Påstand: «a · (b + c) = a · b + c». Hvilket moteksempel viser at den er feil?', ['a = 2, b = 3, c = 4', 'a = 1, b = 3, c = 4', 'a = 1, b = 0, c = 4', 'Ingen, den stemmer'], 0, 'Du må gange med a begge steder. Prøv tall.', 'a = 2, b = 3, c = 4: 2 · (3 + 4) = 14, men 2 · 3 + 4 = 10. De er ulike. (Med a = 1 stemmer den tilfeldigvis, så den tester vi ikke.)'),
      F('Forklar med en arealtegning eller egne ord hvorfor 6 · (4 + 3) = 6 · 4 + 6 · 3.', ['Tegn et rektangel med høyde 6 og bredde 4 + 3 = 7. Arealet er 6 · 7 = 42.', 'Del rektanglet i to deler: bredde 4 og bredde 3. Arealene er 6 · 4 = 24 og 6 · 3 = 18.', 'Til sammen 24 + 18 = 42. Hele arealet er summen av delene, så uttrykkene er like.'])
    ]),
    SJ('Dette kan du nå', ['Bytte om og gruppere tall for å regne smart', 'Dele opp tall med den distributive regelen', 'Bruke riktig regnerekkefølge', 'Velge en strategi for hoderegning', 'Finne moteksempler og argumentere for at noe stemmer'])
  ]));

  M.register('utforsk', '8/regneregler', {
    tittel: 'Regneregler og hoderegning',
    ingress: 'Lær å regne smart i hodet ved å bytte om, gruppere og dele opp. Du får også bruk for reglene i algebra senere.',
    mal: ['bruke kommutative, assosiative og distributive egenskaper', 'utvikle strategier for hoderegning og skriftlig regning', 'forklare og argumentere for en regneregel'],
    ordliste: ORD, seksjoner: U
  });

  /* ====================== STEG ====================== */
  const T1 = [];
  T1.push(S('Steg 1: Bytte om', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Når du <strong>legger sammen</strong>, kan du bytte om tallene. 3 + 8 og 8 + 3 gir begge 11.', true),
    P('Gange kan byttes om også. Tenk på et rektangel med 3 rader og 4 ruter i hver rad. Hvis du snur det på siden, er det 4 rader med 3 ruter. Begge er 12 ruter.'),
    C('regel', 'Husk', ['Pluss kan byttes om: 3 + 8 = 8 + 3.', 'Gange kan byttes om: 3 · 4 = 4 · 3.', 'Minus og dele kan <strong>ikke</strong> byttes om.']),
    E('Regn ut 4 + 17 + 6 på en smart måte.', ['Vi leter etter to tall som blir 10. Det er 4 og 6.', 'Vi regner 4 + 6 først. Det er 10.', '10 + 17 = 27.', 'Svar: 27. 🎉']),
    OS([
      V('Hva er 9 + 5?', ['14', '4', '45'], 0, 'Legg sammen.', '9 + 5 = 14.', true),
      V('Hva er det samme som 6 + 7?', ['7 + 6', '7 − 6', '6 · 7'], 0, 'Bytt om rekkefølgen.', '6 + 7 = 7 + 6 = 13.', true),
      T('Regn ut smart: 8 + 13 + 2', 23, 'Hvilke to tall blir 10?', '8 + 2 = 10. Så 10 + 13 = 23.'),
      T('Regn ut smart: 5 · 7 · 2', 70, '5 · 2 blir 10.', '5 · 2 = 10. Så 10 · 7 = 70.')
    ])
  ]));
  T1.push(S('Steg 2: Parenteser og rekkefølge', '2', [
    G('Nå skal vi se hva vi regner først.'),
    P('Vi har en avtale om hva vi regner først:', true),
    C('regel', 'Regnerekkefølge', ['1. <strong>Parentes</strong>', '2. <strong>Gange og dele</strong>', '3. <strong>Pluss og minus</strong>']),
    E('Regn ut 2 + 3 · 4', ['Gange kommer før pluss.', '3 · 4 = 12.', '2 + 12 = 14.', 'Svar: 14. 🎉']),
    E('Regn ut (2 + 3) · 4', ['Parentes først. 2 + 3 = 5.', '5 · 4 = 20.', 'Svar: 20. 🎉']),
    OS([
      V('Hva regner du først i 5 + 2 · 6?', ['2 · 6', '5 + 2'], 0, 'Gange kommer før pluss.', 'Gange først. 2 · 6 = 12. Så 5 + 12 = 17.', true),
      T('Regn ut: 5 + 2 · 6', 17, 'Gange først.', '2 · 6 = 12. Så 5 + 12 = 17.'),
      T('Regn ut: (5 + 2) · 6', 42, 'Parentes først.', '5 + 2 = 7. Så 7 · 6 = 42.'),
      T('Regn ut: 20 − 3 · 4', 8, 'Gange først.', '3 · 4 = 12. Så 20 − 12 = 8.')
    ])
  ]));
  T1.push(S('Steg 3: Dele opp tall', '3', [
    G('Dette trikset gjør store gangestykker lette.'),
    P('Du kan dele opp et tall. For eksempel er 13 = 10 + 3. Da blir 7 · 13 to små stykker.', true),
    W('arealmodell', { type: 'dist', a: 7, b: 6, c: 3, tittel: 'Del opp rektanglet' }),
    E('Regn ut 7 · 13.', ['Del opp 13 i 10 + 3.', '7 · 10 = 70.', '7 · 3 = 21.', '70 + 21 = 91. Svar: 91. 🎉']),
    E('Regn ut 6 · 98.', ['98 er nesten 100. Vi skriver 98 = 100 − 2.', '6 · 100 = 600.', '6 · 2 = 12.', '600 − 12 = 588. Svar: 588. 🎉']),
    OS([
      T('Regn ut: 8 · 12', 96, 'Del opp 12 i 10 + 2.', '8 · 10 = 80. 8 · 2 = 16. 80 + 16 = 96.'),
      T('Regn ut: 9 · 24', 216, 'Del opp 24 i 20 + 4.', '9 · 20 = 180. 9 · 4 = 36. 180 + 36 = 216.'),
      T('Regn ut: 5 · 99', 495, '99 = 100 − 1.', '5 · 100 = 500. 500 − 5 = 495.'),
      T('Regn ut: 6 · 21', 126, '21 = 20 + 1.', '6 · 20 = 120. 120 + 6 = 126.')
    ])
  ]));
  T1.push(S('Steg 4: Runde og justere', '4', [
    G('Nesten rundt? Da kan vi lure litt.'),
    P('Når et tall er <strong>nesten</strong> rundt, regner du med det runde tallet og rydder opp etterpå.', true),
    E('Regn ut 59 + 27.', ['59 er nesten 60.', '60 + 27 = 87.', 'Vi la til 1 for mye, så vi trekker fra 1.', '87 − 1 = 86. Svar: 86. 🎉']),
    E('Regn ut 83 − 49.', ['49 er nesten 50.', '83 − 50 = 33.', 'Vi trakk fra 1 for mye, så vi legger til 1.', '33 + 1 = 34. Svar: 34. 🎉']),
    OS([
      T('Regn ut: 49 + 26', 75, 'Rund 49 til 50.', '50 + 26 = 76. Så 76 − 1 = 75.'),
      T('Regn ut: 71 − 29', 42, 'Rund 29 til 30.', '71 − 30 = 41. Så 41 + 1 = 42.'),
      T('Regn ut: 98 + 45', 143, 'Rund 98 til 100.', '100 + 45 = 145. Så 145 − 2 = 143.'),
      T('Regn ut: 9 · 7', 63, '10 · 7 − 7.', '10 · 7 = 70. Så 70 − 7 = 63.')
    ]),
    SJ('Dette kan du nå', ['Bytte om når jeg legger sammen og ganger', 'Regne i riktig rekkefølge', 'Dele opp tall for å gange lettere', 'Runde og justere'])
  ]));

  M.register('steg', '8/regneregler', {
    tittel: 'Regneregler og hoderegning',
    ingress: 'Små steg, tydelige eksempler og hjelp hele veien. Du lærer å regne smart i hodet.',
    mal: ['bytte om og gruppere tall', 'bruke riktig regnerekkefølge', 'dele opp tall og runde og justere'],
    ordliste: ORD, seksjoner: T1
  });

  /* ====================== EKSTRA ====================== */
  M.ekstra['8/regneregler'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('bytt', '🔄', 'Bytte om og gruppere', lett ? 8 : 10, 'Regn smart. Finn tallene som passer sammen.', function (r, i) {
      if (i % 2 === 0) { const a = r.int(2, 9), b = 10 - a, c = r.int(11, lett ? 30 : 80); const t = [a, c, b]; return H.regn(t.join('+')); }
      const p = r.pick([[2, 5], [4, 25], [5, 2], [25, 4]]); const c = r.int(3, lett ? 9 : 19); return H.regn(p[0] + '*' + c + '*' + p[1]);
    }));
    sek.push(H.ek('dele', '✂️', 'Dele opp', lett ? 8 : 10, 'Bruk den distributive regelen. Del opp det ene tallet.', function (r, i) {
      const a = r.int(3, 9); const b = lett ? r.int(11, 19) : r.int(12, 49); const t = i % 3;
      if (t === 2) { const base = r.pick([20, 30, 50, 100]); const c = r.int(1, 3); return H.regn(a + '*' + (base - c)); }
      return H.regn(a + '*' + b);
    }));
    sek.push(H.ek('rekkefolge', '🔢', 'Regnerekkefølge', lett ? 8 : 10, 'Husk: parentes, gange og dele, så pluss og minus.', function (r, i) {
      const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9), t = i % 4;
      if (t === 0) return H.regn(a + '+' + b + '*' + c);
      if (t === 1) return H.regn('(' + a + '+' + b + ')*' + c);
      if (t === 2) { const x = r.int(2, 6) * c; return H.regn(x + '/' + c + '+' + a); }
      return H.regn((a + b + 20) + '-' + b + '*' + c);
    }));
    if (!lett) sek.push(H.ek('runde', '🚀', 'Runde og justere', 10, 'Regn i hodet. Rund til et rundt tall og juster.', function (r, i) {
      const n = r.int(1, 3);
      if (i % 3 === 0) return H.regn((r.int(2, 8) * 10 - n) + '+' + r.int(12, 60));
      if (i % 3 === 1) { const t = r.int(3, 9) * 10 - n; return H.regn((t + r.int(40, 90)) + '-' + t); }
      return H.regn(r.int(3, 9) + '*' + (r.pick([2, 3]) * 50 - r.int(1, 2)));
    }));
    return H.ekDef('Regneregler og hoderegning', sek);
  };
})();
