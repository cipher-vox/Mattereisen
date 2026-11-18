/* Rolig og Utfordring: 8. trinn. Hver oppgave har hjelp i flere steg. */
(function () {
  const H = window.MATTE.H, t = H.t, v = H.v;

  H.NIV('8/negative-tall',
    'Her får du små tall og én ting om gangen. Bruk tallinja: pluss betyr skritt til høyre, minus betyr skritt til venstre. Trykk på «Hjelp meg i gang» når du står fast.',
    ['Hva er −3 + 5?', ['Start på −3 på tallinja.', 'Pluss 5 betyr fem skritt til høyre.', '−3 → −2 → −1 → 0 → 1 → 2.', 'Svaret er 2.']],
    [
      t('Temperaturen er −4 grader. Den stiger 3 grader. Hva er temperaturen nå?', -1, ['Tegn en tallinje.', 'Start på −4 og gå 3 skritt til høyre.'], '−4 + 3 = −1. Temperaturen er −1 grader.', 'grader'),
      v('Hvilket tall er størst?', ['−7', '−2', '−10', '−5'], 1, ['Det som ligger lengst til høyre på tallinja er størst.', 'Tenk kulde: −2 grader er mindre kaldt enn −10 grader.'], '−2 er størst fordi det ligger lengst til høyre.'),
      t('Regn ut: 2 − 6', -4, ['Start på 2 og gå 6 skritt til venstre.', 'Du passerer 0 på veien.'], '2 − 6 = −4.'),
      t('Regn ut: −3 − 2', -5, ['Minus betyr skritt til venstre.', 'Start i −3 og gå 2 skritt til venstre.'], '−3 − 2 = −5.'),
      t('En heis står i etasje −2 (to etasjer under bakken). Den kjører opp 5 etasjer. Hvilken etasje er den i?', 3, ['Tegn heisen som en tallinje stående opp.', 'Start på −2 og gå 5 opp.'], '−2 + 5 = 3. Heisen er i etasje 3.'),
      t('Regn ut: 4 + (−1)', 3, ['Å legge til −1 er det samme som å trekke fra 1.'], '4 + (−1) = 4 − 1 = 3.')
    ],
    'Her er litt mer å tenke på: flere regneoperasjoner i samme oppgave, og å finne ukjente tall baklengs.',
    [
      t('Regn ut: (−3) · (−4) − 5', 7, ['Gange først: minus ganger minus gir pluss.', 'Så trekker du fra 5.'], '(−3) · (−4) = 12, og 12 − 5 = 7.'),
      t('Regn ut: −2 · (3 − 7) + (−6) ÷ 2', 5, ['Parentesen først: 3 − 7.', 'Så gange og dele, før du legger sammen.'], '3 − 7 = −4. −2 · (−4) = 8. (−6) ÷ 2 = −3. 8 + (−3) = 5.'),
      t('Et tall ganget med −3 gir 24. Hvilket tall er det?', -8, ['Det motsatte av å gange med −3 er å dele på −3.', '24 ÷ (−3) = ?'], '24 ÷ (−3) = −8. Sjekk: (−8) · (−3) = 24.')
    ]);

  H.NIV('8/regneregler',
    'Husk rekkefølgen: parentes først, så gange og dele, til slutt pluss og minus (fra venstre). Ta ett lite steg om gangen.',
    ['Regn ut 3 + 4 · 2', ['Gange regnes før pluss.', '4 · 2 = 8.', '3 + 8 = 11.', 'Svaret er 11.']],
    [
      t('Regn ut: 5 + 2 · 3', 11, ['Gange regnes først.', 'Hva er 2 · 3?'], '2 · 3 = 6, og 5 + 6 = 11.'),
      t('Regn ut: (5 + 2) · 3', 21, ['Parentesen regnes først.'], '5 + 2 = 7, og 7 · 3 = 21.'),
      t('Regn ut: 20 − 8 ÷ 2', 16, ['Dele regnes før minus.'], '8 ÷ 2 = 4, og 20 − 4 = 16.'),
      t('Regn ut smart: 7 · 5 + 3 · 5', 50, ['Begge leddene har ganger 5.', 'Sett 5 utenfor en parentes: (7 + 3) · 5.'], '(7 + 3) · 5 = 10 · 5 = 50.'),
      t('Regn ut: 18 − 6 + 4', 16, ['Pluss og minus regnes fra venstre mot høyre.', 'Først 18 − 6.'], '18 − 6 = 12, og 12 + 4 = 16.'),
      v('Hvilket regnestykke gir 24?', ['(2 + 4) · 4', '2 + 4 · 4', '2 · 4 + 4', '2 + 4 + 4'], 0, ['Regn ut hvert alternativ.', 'Husk: parentes først, gange før pluss.'], '(2 + 4) · 4 = 6 · 4 = 24. De andre gir 18, 12 og 10.')
    ],
    'Her trener du på flere regneregler i samme oppgave, og på å tenke smart.',
    [
      t('Regn ut: 3 · (8 − 2)² ÷ 6 + 1', 19, ['Parentes først, så potens, så gange og dele fra venstre, til slutt pluss.'], '8 − 2 = 6; 6² = 36; 3 · 36 = 108; 108 ÷ 6 = 18; 18 + 1 = 19.'),
      t('Regn ut smart: 98 · 7', 686, ['Skriv 98 som 100 − 2.'], '(100 − 2) · 7 = 700 − 14 = 686.'),
      v('Stemmer det alltid at a − b = b − a?', ['Ja, alltid', 'Nei, bare hvis a = b', 'Nei, aldri', 'Bare når a og b er positive'], 1, ['Prøv med tall: a = 5 og b = 3.'], '5 − 3 = 2, men 3 − 5 = −2. De er bare like hvis a = b.')
    ]);

  H.NIV('8/potenser',
    'En potens er gjentatt gange. 2³ betyr 2 · 2 · 2. Skriv det ut med gangetegn hvis du er usikker.',
    ['Regn ut 2³', ['2³ betyr 2 · 2 · 2.', '2 · 2 = 4.', '4 · 2 = 8.', 'Svaret er 8.']],
    [
      t('Skriv som potens og regn ut: 3 · 3 · 3 · 3', 81, ['Det er fire like faktorer.', 'Potensen er 3⁴.'], '3⁴ = 3 · 3 · 3 · 3 = 81.'),
      t('Regn ut: 5²', 25, ['5² = 5 · 5.'], '5² = 5 · 5 = 25.'),
      t('Regn ut: 10³', 1000, ['10 · 10 · 10.'], '10³ = 10 · 10 · 10 = 1000.'),
      t('Regn ut: 4⁰', 1, ['Alle tall (unntatt 0) opphøyd i 0 er like mye.'], '4⁰ = 1.'),
      t('En kube er 3 lang, 3 bred og 3 høy. Hvor mange små terninger er det i den?', 27, ['Volum = lengde · bredde · høyde.', 'Det er 3 · 3 · 3 = 3³.'], '3³ = 3 · 3 · 3 = 27 terninger.'),
      v('Hva er 2⁴?', ['8', '16', '6', '24'], 1, ['2⁴ betyr fire totall ganget sammen.'], '2⁴ = 2 · 2 · 2 · 2 = 16.')
    ],
    'Her får du bruk for potensreglene og standardform.',
    [
      t('Regn ut: 2³ · 2²', 32, ['Samme grunntall ved gange: legg sammen eksponentene.'], '2³ · 2² = 2⁵ = 32.'),
      t('45 000 000 = 4,5 · 10ⁿ. Hva er n?', 7, ['Hvor mange plasser må du flytte kommaet for å få 4,5?'], 'Kommaet flyttes 7 plasser, så 45 000 000 = 4,5 · 10⁷. n = 7.'),
      t('Regn ut: (−2)³ + 3²', 1, ['(−2)³ = (−2) · (−2) · (−2).', '3² = 9.'], '(−2)³ = −8 og 3² = 9. −8 + 9 = 1.')
    ]);

  H.NIV('8/kvadratrot',
    'Kvadratroten er det motsatte av å opphøye i andre. √25 er tallet som ganget med seg selv gir 25.',
    ['Hva er √49?', ['Hvilket tall ganget med seg selv gir 49?', '7 · 7 = 49.', 'Svaret er 7.']],
    [
      t('Regn ut: √25', 5, ['Hvilket tall ganget med seg selv gir 25?'], '5 · 5 = 25, så √25 = 5.'),
      t('Regn ut: √81', 9, ['9 · 9 = ?'], '9 · 9 = 81, så √81 = 9.'),
      t('Et kvadrat har areal 36 cm². Hvor lang er hver side?', 6, ['Areal = side · side.', 'Hvilket tall ganget med seg selv gir 36?'], '√36 = 6 cm.', 'cm'),
      t('Regn ut: 6²', 36, ['6² = 6 · 6.'], '6 · 6 = 36.'),
      v('Mellom hvilke to hele tall ligger √20?', ['3 og 4', '4 og 5', '5 og 6', '2 og 3'], 1, ['Finn kvadrattallene rundt 20: 16 og 25.'], '16 < 20 < 25, så √20 ligger mellom 4 og 5.'),
      t('Regn ut: √16 + √9', 7, ['Regn ut hver rot for seg.'], '√16 = 4 og √9 = 3. 4 + 3 = 7.')
    ],
    'Her bruker du kvadratrot i litt lengre oppgaver.',
    [
      t('En tomt er kvadratisk og har areal 169 m². Hvor mange meter gjerde trengs rundt hele tomten?', 52, ['Finn siden først.', 'Omkrets = 4 · side.'], 'Side = √169 = 13 m. Omkrets = 4 · 13 = 52 m.', 'm'),
      t('Hvilket heltall ligger nærmest √70?', 8, ['64 = 8² og 81 = 9².', 'Hvilket av dem ligger nærmest 70?'], '√70 ligger mellom 8 og 9. 70 er nærmere 64 enn 81, så svaret er 8 (√70 ≈ 8,4).'),
      t('Regn ut: √(5² + 12²)', 13, ['Regn ut under rottegnet først.'], '5² + 12² = 25 + 144 = 169, og √169 = 13.')
    ]);

  H.NIV('8/uttrykk',
    'En bokstav står for et tall. Når du får vite hva bokstaven er, bytter du den ut og regner.',
    ['Finn verdien av 3x + 2 når x = 4', ['Bytt ut x med 4.', '3 · 4 + 2.', '12 + 2 = 14.', 'Svaret er 14.']],
    [
      t('Finn verdien av x + 7 når x = 5', 12, ['Bytt ut x med 5.'], '5 + 7 = 12.'),
      t('Finn verdien av 2x når x = 6', 12, ['2x betyr 2 · x.'], '2 · 6 = 12.'),
      t('Finn verdien av 3x − 1 når x = 4', 11, ['3x betyr 3 · 4.', 'Så trekker du fra 1.'], '3 · 4 − 1 = 12 − 1 = 11.'),
      t('Et rundstykke koster x kroner. Hva koster 3 rundstykker når x = 12?', 36, ['3 rundstykker koster 3 · x.'], '3 · 12 = 36 kr.', 'kr'),
      t('Forenkle 2x + 3x. Hvilket tall står foran x i svaret?', 5, ['Legg sammen tallene foran x.'], '2x + 3x = 5x. Tallet er 5.'),
      v('Hvilket uttrykk betyr «et tall ganger 4, pluss 1»?', ['4x + 1', 'x + 4 + 1', '4(x + 1)', 'x + 41'], 0, ['«Et tall ganger 4» er 4x.'], '4x + 1.')
    ],
    'Her skal du forenkle før du regner ut, og lage uttrykk fra tekst.',
    [
      t('Forenkle, og finn verdien når x = 3: 4x + 2(x − 1) − x', 13, ['Gang ut parentesen: 2(x − 1) = 2x − 2.', 'Samle x-leddene.'], '4x + 2x − 2 − x = 5x − 2. Med x = 3 blir det 15 − 2 = 13.'),
      t('Kristin er x år. Mari er 3 år eldre enn dobbelt så gammel som Kristin. Hvor gammel er Mari når Kristin er 7?', 17, ['Dobbelt så gammel er 2x.', '3 år eldre betyr + 3.'], 'Mari er 2x + 3 år. Med x = 7 er hun 2 · 7 + 3 = 17 år.'),
      v('Hvilket par er alltid like?', ['2(x + 3) og 2x + 6', '2(x + 3) og 2x + 3', 'x + x og x²', '3x og x + 3'], 0, ['Gang ut parentesen i det første paret.'], '2(x + 3) = 2x + 6. De andre parene er ikke like for alle x.')
    ]);

  H.NIV('8/ligninger',
    'Ei likning er som ei vekt i balanse. Gjør det samme på begge sider, så holder den seg i balanse. Du vil ha x helt alene.',
    ['Løs x + 5 = 12', ['Vi vil ha x alene.', 'Trekk fra 5 på begge sider.', 'x + 5 − 5 = 12 − 5.', 'x = 7.']],
    [
      t('Løs: x + 3 = 10', 7, ['Trekk fra 3 på begge sider.'], 'x = 10 − 3 = 7.'),
      t('Løs: x − 4 = 6', 10, ['Legg til 4 på begge sider.'], 'x = 6 + 4 = 10.'),
      t('Løs: 3x = 18', 6, ['Del begge sider på 3.'], 'x = 18 ÷ 3 = 6.'),
      t('Løs: 2x + 1 = 11', 5, ['Først fjerner du +1: trekk fra 1 på begge sider.', 'Så deler du på 2.'], '2x = 10, så x = 5.'),
      t('Jeg tenker på et tall. Ganger jeg det med 4, får jeg 36. Hvilket tall tenker jeg på?', 9, ['Lag likningen 4x = 36.'], '4x = 36, så x = 36 ÷ 4 = 9.'),
      t('En pakke med tre like kjeks koster 24 kr. Hva koster ett kjeks?', 8, ['Lag likningen 3x = 24.'], '3x = 24, så x = 24 ÷ 3 = 8 kr.', 'kr'),
      t('Løs: x + 12 = 23', 11, ['Trekk fra 12 på begge sider.'], 'x = 23 − 12 = 11.'),
      v('Er x = 6 løsningen på 2x + 3 = 15?', ['Ja', 'Nei'], 0, ['Sett inn 6 for x og se om venstre og høyre side blir like.'], '2 · 6 + 3 = 15, så ja.')
    ],
    'Her får du likninger med x på begge sider og tekstoppgaver.',
    [
      t('Løs: 5x − 7 = 3x + 9', 8, ['Samle x-ene på én side: trekk fra 3x på begge sider.'], '2x − 7 = 9, så 2x = 16 og x = 8. Sjekk: 5 · 8 − 7 = 33 og 3 · 8 + 9 = 33.'),
      t('Tre like notatbøker og en penn til 15 kr koster 99 kr til sammen. Hva koster én notatbok?', 28, ['Lag likningen 3x + 15 = 99.'], '3x = 84, så x = 28 kr.', 'kr'),
      t('Løs: x + 8 = 3', -5, ['Trekk fra 8 på begge sider. Svaret kan bli negativt.'], 'x = 3 − 8 = −5. Sjekk: −5 + 8 = 3.'),
      t('Løs: 2(x + 5) = x + 13', 3, ['Gang ut parentesen først: 2x + 10.'], '2x + 10 = x + 13, så x = 3. Sjekk: 2 · 8 = 16 og 3 + 13 = 16.'),
      v('Du løser en likning for antall elever i en gruppe og får x = −4. Hva bør du gjøre?', ['Sjekke likningen, for svaret gir ikke mening', 'Svare −4 elever', 'Svare 4 elever uten å sjekke', 'Runde svaret opp'], 0, ['Kan en gruppe ha −4 elever?'], 'Antall elever kan ikke være negativt. Da må du sjekke om likningen er satt opp riktig.'),
      t('Løs: 2(x + 3) = 5x − 12', 6, ['Gang ut parentesen først.'], '2x + 6 = 5x − 12, så 18 = 3x og x = 6.')
    ]);

  H.NIV('8/ulikheter',
    'En ulikhet sier at noe er større eller mindre. Mange tall passer, ikke bare ett. Tegn gjerne en tallinje.',
    ['Løs x + 2 > 5', ['Trekk fra 2 på begge sider.', 'x > 3.', 'Alle tall som er større enn 3 passer.']],
    [
      v('Hvilket tall passer i x > 4?', ['3', '4', '5', '−5'], 2, ['x skal være større enn 4. Er 4 større enn 4?'], '5 er større enn 4. 4 er ikke større enn 4.'),
      v('Hvilket tall passer i x ≤ 2?', ['3', '2', '5', '10'], 1, ['≤ betyr «mindre enn eller lik».'], '2 er lik 2, så det passer.'),
      t('Løs x + 3 < 8. Svar: x er mindre enn hvilket tall?', 5, ['Trekk fra 3 på begge sider.'], 'x < 5. Tallet er 5.'),
      t('Du har 50 kr. Et rundstykke koster 12 kr. Hvor mange rundstykker kan du høyst kjøpe?', 4, ['12 · 4 = ?', 'Og 12 · 5 = ?'], '12 · 4 = 48, som er under 50. 12 · 5 = 60, som er for mye. Høyst 4.'),
      t('Løs 2x > 10. Svar: x er større enn hvilket tall?', 5, ['Del begge sider på 2.'], 'x > 5. Tallet er 5.'),
      v('Hva betyr x ≥ 3?', ['x er 3 eller større', 'x er mindre enn 3', 'x er bare 3', 'x er større enn 3, men ikke 3'], 0, ['Strek under ≥ på tegnet: større og lik.'], 'x ≥ 3 betyr at x er 3 eller et tall som er større.')
    ],
    'Her møter du ulikheter med flere steg, og ulikheter i hverdagen.',
    [
      t('Løs 3x − 5 < 10. Svar: x er mindre enn hvilket tall?', 5, ['Legg til 5 på begge sider, og del så på 3.'], '3x < 15, så x < 5.'),
      t('Løs −2x > 8. Svar: x er mindre enn hvilket tall?', -4, ['Når du deler med et negativt tall, snur ulikhetstegnet.'], 'x < 8 ÷ (−2), altså x < −4. Tallet er −4.'),
      t('Et abonnement koster 99 kr pluss 2 kr per sms. Du vil betale høyst 150 kr. Hvor mange sms kan du sende?', 25, ['Ulikheten er 99 + 2x ≤ 150.'], '2x ≤ 51, så x ≤ 25,5. Du kan sende høyst 25 sms.')
    ]);

  H.NIV('8/funksjoner',
    'En funksjon er som en maskin: du putter inn et tall (x), og regelen gir deg et nytt tall (y).',
    ['Regelen er y = 2x + 1. Hva kommer ut når x = 3?', ['Putt inn 3 der det står x.', '2 · 3 + 1.', '6 + 1 = 7.', 'Ut kommer 7.']],
    [
      t('Regel: y = x + 4. Hva er y når x = 6?', 10, ['Putt inn 6 for x.'], '6 + 4 = 10.'),
      t('Regel: y = 3x. Hva er y når x = 5?', 15, ['3x betyr 3 · x.'], '3 · 5 = 15.'),
      t('Regel: y = 2x − 1. Hva er y når x = 4?', 7, ['2 · 4 først, så minus 1.'], '2 · 4 − 1 = 8 − 1 = 7.'),
      t('En taxi koster 50 kr i startpris pluss 10 kr per km. Hva koster en tur på 6 km?', 110, ['Prisen er 50 + 10 · km.'], '50 + 10 · 6 = 110 kr.', 'kr'),
      v('Tabellen viser x = 1, 2, 3 og y = 5, 7, 9. Hva er regelen?', ['y = 2x + 3', 'y = x + 4', 'y = 3x + 2', 'y = 2x + 5'], 0, ['y øker med 2 for hver gang x øker med 1.', 'Prøv regelen på x = 1.'], 'y = 2x + 3 gir 5, 7 og 9.'),
      v('Hvordan går grafen til y = −2x + 5?', ['Oppover', 'Nedover', 'Flat', 'Loddrett'], 1, ['Se på tallet foran x. Er det positivt eller negativt?'], 'Tallet foran x er negativt (−2), så grafen går nedover.')
    ],
    'Her sammenligner du funksjoner og finner regler selv.',
    [
      t('Abonnement A koster 100 kr + 2 kr per minutt. B koster 40 kr + 5 kr per minutt. Ved hvor mange minutter koster de like mye?', 20, ['Sett 100 + 2x = 40 + 5x.'], '60 = 3x, så x = 20 minutter.'),
      t('f(x) = 3x² − 2. Finn f(−2).', 10, ['Regn (−2)² først.'], '(−2)² = 4. 3 · 4 − 2 = 10.'),
      t('En lineær funksjon har f(0) = 4 og f(3) = 13. Hva er f(5)?', 19, ['Stigningen er (13 − 4) ÷ 3.'], 'Stigning 3, så f(x) = 3x + 4. f(5) = 19.')
    ]);

  H.NIV('8/monstre',
    'Et mønster har en regel. Finn ut hvor mye det øker for hver gang, og bruk det til å finne neste.',
    ['Hva kommer etter 3, 6, 9, 12?', ['Se på forskjellen mellom tallene.', 'Det øker med 3 hver gang.', '12 + 3 = 15.']],
    [
      t('Hva kommer neste: 2, 4, 6, 8, …', 10, ['Hvor mye øker det?'], 'Det øker med 2, så neste er 10.'),
      t('Hva kommer neste: 5, 10, 15, 20, …', 25, ['Øker med 5.'], '20 + 5 = 25.'),
      t('Hva kommer neste: 1, 4, 9, 16, …', 25, ['Dette er kvadrattall: 1², 2², 3², 4², …'], 'Neste er 5² = 25.'),
      t('Figur 1 har 3 pinner, figur 2 har 5 og figur 3 har 7. Hvor mange har figur 4?', 9, ['Øker med 2 for hver figur.'], '7 + 2 = 9 pinner.'),
      t('Et mønster starter på 3 og øker med 4 hver gang: 3, 7, 11, … Hva er tall nummer 5?', 19, ['Skriv opp rekka: 3, 7, 11, …'], '3, 7, 11, 15, 19. Tall nummer 5 er 19.'),
      v('Hvilken regel passer til 4, 7, 10, 13? (n er plassen: 1, 2, 3, 4)', ['3n + 1', '4n', 'n + 3', '3n + 4'], 0, ['Det øker med 3, så regelen starter med 3n.', 'Prøv n = 1: hva må du legge til for å få 4?'], '3n + 1 gir 4, 7, 10, 13.')
    ],
    'Her skal du bruke regler til å finne tall langt ute i mønsteret.',
    [
      t('Figur n har 3n + 2 prikker. Hvor mange prikker har figur 20?', 62, ['Sett inn n = 20.'], '3 · 20 + 2 = 62.'),
      t('Rekka dobler hver gang: 3, 6, 12, 24, … Hva er tall nummer 8?', 384, ['Skriv opp rekka helt ut.'], '3, 6, 12, 24, 48, 96, 192, 384. Svar: 384.'),
      t('Figur n har 4n − 1 prikker. Hvilken figur har 107 prikker?', 27, ['Lag likningen 4n − 1 = 107.'], '4n = 108, så n = 27.')
    ]);

  H.NIV('8/faktorisering',
    'Faktorer er tall som går opp i et annet tall. Primtall har bare to faktorer: 1 og seg selv.',
    ['Primtallsfaktoriser 12', ['Del 12 i to faktorer: 12 = 2 · 6.', 'Del 6: 6 = 2 · 3.', '12 = 2 · 2 · 3. Nå er alle faktorene primtall.']],
    [
      v('Hvilket av disse er et primtall?', ['9', '11', '15', '21'], 1, ['Et primtall kan bare deles på 1 og seg selv.', '9 = 3 · 3 og 15 = 3 · 5.'], '11 er et primtall. De andre kan deles på 3.'),
      t('Hvor mange faktorer har 6? (Tell 1, 2, 3 og 6.)', 4, ['Hvilke tall går opp i 6?'], 'Faktorene er 1, 2, 3 og 6. Det er 4.'),
      t('Primtallsfaktoriser 18. Hvor mange ganger står primtallet 3 i faktoriseringen?', 2, ['Start med det minste primtallet som går opp i 18.', 'Fortsett å dele til alle faktorene er primtall.'], '18 = 2 · 3 · 3. Tallet 3 står to ganger.'),
      t('Hva er den største felles faktoren (SFF) til 8 og 12?', 4, ['Faktorer til 8: 1, 2, 4, 8.', 'Faktorer til 12: 1, 2, 3, 4, 6, 12.'], 'Felles faktorer er 1, 2 og 4. Den største er 4.'),
      t('Hva er det minste felles multiplum (MFM) til 4 og 6?', 12, ['Multipler av 4: 4, 8, 12, …', 'Multipler av 6: 6, 12, …'], 'Det første tallet i begge lister er 12.'),
      v('Kan 27 deles på 3?', ['Ja', 'Nei'], 0, ['Legg sammen sifrene: 2 + 7.', 'Kan summen deles på 3?'], '2 + 7 = 9, og 9 kan deles på 3. Så 27 = 3 · 9.')
    ],
    'Her bruker du primtallsfaktorisering til SFF, MFM og brøker.',
    [
      t('Finn SFF til 36 og 60.', 12, ['Primtallsfaktoriser begge tallene.', 'Ta de faktorene de har felles.'], '36 = 2 · 2 · 3 · 3 og 60 = 2 · 2 · 3 · 5. Felles er 2 · 2 · 3 = 12.'),
      t('To busser starter samtidig. Den ene kjører hvert 12. minutt og den andre hvert 18. minutt. Etter hvor mange minutter møtes de igjen?', 36, ['Du leter etter MFM til 12 og 18.'], 'Multipler av 12: 12, 24, 36. Multipler av 18: 18, 36. De møtes etter 36 minutter.', 'min'),
      t('Forkort brøken 84/126 så mye som mulig. Hva er nevneren?', 3, ['Finn SFF til 84 og 126 (det er 42).', 'Del teller og nevner med den.'], '84 ÷ 42 = 2 og 126 ÷ 42 = 3. Brøken er 2/3, og nevneren er 3.')
    ]);

  H.NIV('8/representasjoner',
    'Det samme kan vises på fire måter: tekst, tabell, graf og regel. Å se sammenhengen mellom dem gjør det lettere å forstå.',
    ['Tabellen viser x = 0, 1, 2 og y = 1, 3, 5. Hva er regelen?', ['Se på hvor mye y øker: 2 hver gang.', 'Når x = 0 er y = 1.', 'Regelen er y = 2x + 1.']],
    [
      t('En graf går gjennom (0, 2) og (1, 5) og er en rett linje. Hva er y når x = 2?', 8, ['Hvor mye øker y når x øker med 1?'], 'y øker med 3, så y er 2, 5, 8. Svar: 8.'),
      t('Regel: y = 2x + 3. Hva er y når x = 5?', 13, ['Putt inn 5 for x.'], '2 · 5 + 3 = 13.'),
      v('Hva viser punktet (3, 4)?', ['x = 3 og y = 4', 'x = 4 og y = 3', 'x = 7', 'y = 12'], 0, ['Første tall er x, andre er y.'], 'I (3, 4) er x = 3 og y = 4.'),
      t('En ballong stiger like fort hele tiden og er 20 m opp etter 4 sekunder. Hvor høyt er den etter 6 sekunder?', 30, ['Hvor mange meter per sekund? 20 ÷ 4.'], '20 ÷ 4 = 5 m per sekund. 6 · 5 = 30 m.', 'm'),
      t('Tabell: x = 1 gir 4, x = 2 gir 8 og x = 3 gir 12. Hva er y når x = 10?', 40, ['Regelen er y = 4x.'], '4 · 10 = 40.'),
      v('Hvilken regel passer? (x = 1, 2, 3 gir y = 3, 5, 7)', ['y = 2x + 1', 'y = 3x', 'y = x + 2', 'y = 2x + 3'], 0, ['y øker med 2. Hva må du legge til for x = 1?'], 'y = 2x + 1 gir 3, 5 og 7.')
    ],
    'Her skal du sammenligne og finne skjæringspunkt.',
    [
      t('To funksjoner: y = 2x + 1 og y = x + 5. For hvilken x er verdiene like?', 4, ['Sett 2x + 1 = x + 5.'], '2x + 1 = x + 5 gir x = 4.'),
      t('Hvor skjærer grafen til y = −x + 6 y-aksen? Oppgi y-verdien.', 6, ['På y-aksen er x = 0.'], 'x = 0 gir y = 6.'),
      t('Fra en tabell: x = 0 gir 5 og x = 4 gir 17 (rett linje). Hva er y når x = 10?', 35, ['Stigningen er (17 − 5) ÷ 4.'], 'Stigning 3, så y = 3x + 5. For x = 10 er y = 35.')
    ]);

  H.NIV('8/programmering',
    'Datamaskinen gjør nøyaktig det koden sier, linje for linje. Les koden sakte og følg med på hva tallene blir.',
    ['Hva skriver print(2 + 3) ut?', ['print skriver ut svaret på det som står i parentesen.', '2 + 3 = 5.', 'Det skrives ut 5.']],
    [
      t('Hva skrives ut? <code>print(4 + 5)</code>', 9, ['Regn ut det som står i parentesen.'], '4 + 5 = 9.'),
      t('Hva skrives ut?<br><code>x = 3</code><br><code>y = x + 2</code><br><code>print(y)</code>', 5, ['x er 3.', 'y = x + 2 = ?'], 'y = 3 + 2 = 5.'),
      t('<code>for i in range(3):</code><br><code>&nbsp;&nbsp;print("Hei")</code><br>Hvor mange ganger skrives «Hei» ut?', 3, ['range(3) gir tre runder.'], 'Løkka går 3 ganger, så «Hei» skrives 3 ganger.'),
      v('Hva gjør en løkke?', ['Gjentar kode', 'Stopper programmet', 'Lager en tegning', 'Sletter variabler'], 0, ['Tenk på ordet «gjenta».'], 'En løkke gjentar de samme linjene flere ganger.'),
      t('<code>x = 10</code><br><code>if x &gt; 5:</code><br><code>&nbsp;&nbsp;print(1)</code><br><code>else:</code><br><code>&nbsp;&nbsp;print(2)</code><br>Hva skrives ut?', 1, ['Er 10 større enn 5?'], 'Ja, 10 &gt; 5, så det som står under if kjøres: 1.'),
      t('Algoritme: Start på 0. Legg til 2, fem ganger. Hva er sluttverdien?', 10, ['0, 2, 4, …'], '0 → 2 → 4 → 6 → 8 → 10. Sluttverdien er 10.')
    ],
    'Her leser du litt lengre programmer med løkker og betingelser.',
    [
      t('<code>s = 0</code><br><code>for i in range(1, 5):</code><br><code>&nbsp;&nbsp;s = s + i</code><br><code>print(s)</code><br>Hva skrives ut?', 10, ['range(1, 5) gir tallene 1, 2, 3 og 4.'], '1 + 2 + 3 + 4 = 10.'),
      t('<code>x = 1</code><br><code>while x &lt; 20:</code><br><code>&nbsp;&nbsp;x = x * 3</code><br><code>print(x)</code><br>Hva skrives ut?', 27, ['Følg x: 1, 3, 9, …', 'Løkka stopper når x ikke lenger er mindre enn 20.'], 'x blir 3, 9 og 27. Da er 27 ≥ 20, og løkka stopper. Utskrift: 27.'),
      t('Hvor mange ganger kjøres løkka <code>for i in range(2, 12):</code>?', 10, ['range(2, 12) gir tallene fra og med 2 til og med 11.'], 'Tallene er 2, 3, …, 11. Det er 10 runder.')
    ]);
})();
