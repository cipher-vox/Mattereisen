/* Rolig og Utfordring: 10. trinn. */
(function () {
  const H = window.MATTE.H, t = H.t, v = H.v;

  H.NIV('10/algebra',
    'Algebra er regning med bokstaver. En bokstav står for et tall vi ikke kjenner ennå. Når vi vet tallet, setter vi det inn og regner.',
    ['Regn ut 3x + 2 når x = 4.', ['Sett inn 4 der x står: 3 · 4 + 2.', 'Gange først: 12 + 2 = 14.']],
    [
      t('Regn ut 2x + 1 når x = 5.', 11, ['Sett inn 5: 2 · 5 + 1.'], '2 · 5 + 1 = 10 + 1 = 11.'),
      t('Forenkle 3a + 2a. Hva er tallet foran a?', 5, ['Legg sammen tallene foran a.'], '3a + 2a = 5a.'),
      t('Regn ut 4(x + 2) når x = 1.', 12, ['Regn parentesen først: 1 + 2.'], '4 · 3 = 12.'),
      t('Forenkle 5x − 2x. Hva er tallet foran x?', 3, ['Trekk fra tallene foran x.'], '5x − 2x = 3x.'),
      t('Regn ut a · b når a = 6 og b = 7.', 42, ['Sett inn tallene og gang.'], '6 · 7 = 42.'),
      v('Hva er 2(x + 3) ganget ut?', ['2x + 6', '2x + 3', 'x + 6', '2x + 5'], 0, ['Gang 2 med begge leddene i parentesen.'], '2 · x + 2 · 3 = 2x + 6.')
    ],
    'Her bruker du algebra i litt lengre uttrykk og tekstoppgaver.',
    [
      t('Regn ut 3(2x − 1) + 4 når x = 3.', 19, ['Sett inn x = 3 først.', 'Regn parentesen, så gange, så legg til.'], '3 · (6 − 1) + 4 = 15 + 4 = 19.'),
      t('Et rektangel har sider x og x + 3. Hva er omkretsen når x = 5?', 26, ['Sidene er 5 og 8.', 'Omkrets = 2 · (b + h).'], '2 · (5 + 8) = 26.'),
      t('Forenkle 4x + 3 − 2x + 7. Hva blir tallet foran x?', 2, ['Samle x-leddene.'], '4x − 2x = 2x, og 3 + 7 = 10. Uttrykket blir 2x + 10.')
    ]);

  H.NIV('10/kvadratsetninger',
    'Kvadratsetningene hjelper oss å gange ut og trekke sammen raskt. (a + b)² er IKKE a² + b²: det er et ledd i midten også.',
    ['Regn ut (x + 3)².', ['Første kvadratsetning: (a + b)² = a² + 2ab + b².', 'a = x og b = 3.', 'x² + 6x + 9.']],
    [
      t('Regn ut (5 + 2)² på to måter. Hva blir svaret?', 49, ['7 · 7 = ?'], '7² = 49. Og 25 + 20 + 4 = 49.'),
      t('(x + 4)² = x² + □x + 16. Hva skal stå i □?', 8, ['Midtleddet er 2 · x · 4.'], '2 · 4 = 8.'),
      t('(x − 3)² = x² − □x + 9. Hva skal stå i □?', 6, ['Midtleddet er 2 · 3.'], '2 · 3 = 6.'),
      t('(x + 2)(x − 2) = x² − □. Hva skal stå i □?', 4, ['Tredje kvadratsetning: a² − b².'], '2² = 4. Svaret er x² − 4.'),
      t('Bruk 11 · 9 = (10 + 1)(10 − 1) = 10² − 1². Hva blir svaret?', 99, ['100 − 1.'], '100 − 1 = 99.'),
      v('Hva er (a + b)²?', ['a² + 2ab + b²', 'a² + b²', 'a² − b²', '2a + 2b'], 0, ['Det er et ledd i midten.'], 'Første kvadratsetning: a² + 2ab + b².')
    ],
    'Her bruker du setningene baklengs og til hoderegning.',
    [
      t('Bruk kvadratsetning til å regne 51² uten kalkulator. (50 + 1)²', 2601, ['2500 + 2 · 50 · 1 + 1.'], '2500 + 100 + 1 = 2601.'),
      t('Bruk 49 · 51 = (50 − 1)(50 + 1). Hva er svaret?', 2499, ['50² − 1².'], '2500 − 1 = 2499.'),
      t('x² + 10x + 25 = (x + □)². Hva skal stå i □?', 5, ['Kvadratroten av 25.'], '(x + 5)² = x² + 10x + 25.')
    ]);

  H.NIV('10/ligningssett',
    'Et likningssett har to likninger og to ukjente. Vi leter etter ett (x, y) som passer i begge. Tips: bruk innsetting eller samme grafer.',
    ['x + y = 5 og x = 2. Hva er y?', ['Sett x = 2 inn i første likning.', '2 + y = 5.', 'y = 3.']],
    [
      t('x + y = 7 og x = 3. Hva er y?', 4, ['Sett inn 3 for x.'], '3 + y = 7, så y = 4.'),
      t('y = 2x og x = 4. Hva er y?', 8, ['Sett inn 4 for x.'], 'y = 2 · 4 = 8.'),
      t('x + y = 10 og x − y = 2. Hva er x? (Legg likningene sammen.)', 6, ['Legg sammen venstre sider og høyre sider.'], '2x = 12, så x = 6.'),
      t('To tall har sum 9 og differanse 1. Hva er det største?', 5, ['Prøv deg fram: 5 og 4?'], '5 + 4 = 9 og 5 − 4 = 1. Det største er 5.'),
      t('y = x + 1 og y = 5. Hva er x?', 4, ['Sett inn 5 for y.'], '5 = x + 1, så x = 4.'),
      v('Hva betyr løsningen til et likningssett i en graf?', ['Der de to linjene krysser hverandre', 'Der linjene starter', 'Der linjene er parallelle', 'Toppunktet'], 0, ['Det punktet som passer begge.'], 'Løsningen er skjæringspunktet.')
    ],
    'Her setter du opp og løser likningssett fra tekst.',
    [
      t('En pose med 3 epler og 2 pærer koster 26 kr. 1 eple og 2 pærer koster 14 kr. Hva koster ett eple?', 6, ['Trekk den ene likningen fra den andre.'], '2 epler koster 12 kr, så ett eple koster 6 kr.', 'kr'),
      t('Løs: 2x + y = 11 og x − y = 1. Hva er x?', 4, ['Legg likningene sammen.'], '3x = 12, så x = 4.'),
      t('Løs: y = 3x − 2 og y = x + 4. Hva er x?', 3, ['Sett uttrykkene lik hverandre.'], '3x − 2 = x + 4, så 2x = 6 og x = 3.')
    ]);

  H.NIV('10/stigningstall',
    'Stigningstallet a forteller hvor mye y endrer seg når x øker med 1. Konstantleddet b er der linjen krysser y-aksen. y = ax + b.',
    ['Linjen går gjennom (0, 1) og (2, 5). Finn stigningstallet.', ['Endring i y: 5 − 1 = 4.', 'Endring i x: 2 − 0 = 2.', 'a = 4 ÷ 2 = 2.']],
    [
      t('y = 3x + 2. Hva er stigningstallet?', 3, ['Tallet foran x.'], 'a = 3.'),
      t('y = 3x + 2. Hva er y når x = 0?', 2, ['Sett inn 0.'], 'y = 2.'),
      t('y = 2x + 1. Hva er y når x = 4?', 9, ['Sett inn 4.'], '2 · 4 + 1 = 9.'),
      t('En linje går gjennom (0, 0) og (2, 6). Hva er stigningstallet?', 3, ['y-endring delt på x-endring.'], '6 ÷ 2 = 3.'),
      t('Et taxi koster 50 kr i startpris og 10 kr per km. Hva koster 5 km?', 100, ['50 + 10 · 5.'], '50 + 50 = 100 kr.', 'kr'),
      v('Hva betyr negativt stigningstall?', ['Linjen går nedover', 'Linjen går oppover', 'Linjen er vannrett', 'Linjen er loddrett'], 0, ['Hva skjer med y når x øker?'], 'y avtar når x øker, så linjen går nedover.')
    ],
    'Her finner du formler og tolker linjer.',
    [
      t('Linjen går gjennom (1, 3) og (3, 11). Hva er stigningstallet?', 4, ['(11 − 3) ÷ (3 − 1).'], '8 ÷ 2 = 4.'),
      t('Linjen y = 4x + b går gjennom (2, 10). Hva er b?', 2, ['Sett inn x = 2 og y = 10.'], '10 = 8 + b, så b = 2.'),
      t('Mobilabonnement: 99 kr fast og 2 kr per GB. Hvor mange GB kan du bruke for 199 kr?', 50, ['Trekk fra fast pris først.'], '199 − 99 = 100, og 100 ÷ 2 = 50 GB.', 'GB')
    ]);

  H.NIV('10/funksjonstyper',
    'Lineær: samme økning hver gang (y = ax + b). Eksponentiell: samme faktor hver gang (y = a · bˣ). Kvadratisk: bøyd kurve (y = ax² + bx + c).',
    ['Tabell: 2, 4, 8, 16. Hvilken type er dette?', ['2 → 4 → 8 → 16.', 'Hver gang ganger vi med 2.', 'Det er eksponentiell vekst.']],
    [
      v('2, 5, 8, 11. Hvilken funksjonstype er dette?', ['Lineær', 'Eksponentiell', 'Kvadratisk', 'Ingen'], 0, ['Er økningen lik hver gang?'], 'Det øker med 3 hver gang. Lineær.'),
      v('3, 6, 12, 24. Hvilken funksjonstype er dette?', ['Eksponentiell', 'Lineær', 'Kvadratisk', 'Ingen'], 0, ['Gang med 2 hver gang.'], 'Eksponentiell, faktor 2.'),
      t('y = 2x + 3. Hva er y når x = 5?', 13, ['Sett inn 5.'], '2 · 5 + 3 = 13.'),
      t('y = x². Hva er y når x = 6?', 36, ['6 · 6.'], '36.'),
      t('y = 2ˣ. Hva er y når x = 4?', 16, ['2 · 2 · 2 · 2.'], '16.'),
      v('Hvilken graf er en rett linje?', ['y = 3x + 1', 'y = x²', 'y = 2ˣ', 'y = x³'], 0, ['Bare x, ikke x²!'], 'y = 3x + 1 er lineær.')
    ],
    'Her skiller du typene og bruker dem.',
    [
      t('Et bakterieantall dobles hver time. Det er 100 nå. Hvor mange er det etter 3 timer?', 800, ['100, 200, 400, …'], '100 · 2 · 2 · 2 = 800.'),
      t('y = x² − 4x. Hva er y når x = 5?', 5, ['25 − 20.'], '25 − 20 = 5.'),
      v('3, 7, 13, 21. Hvilken funksjonstype er dette?', ['Kvadratisk', 'Lineær', 'Eksponentiell'], 0, ['Differansene er 4, 6, 8: de øker jevnt.'], 'Differansene 4, 6, 8 øker med 2 hver gang. Kvadratisk.')
    ]);

  H.NIV('10/vekstfaktor',
    'Vekstfaktoren er tallet vi ganger med for å få ny verdi. 5 % økning gir faktor 1,05. 5 % nedgang gir faktor 0,95.',
    ['Prisen 200 kr øker med 10 %. Hva blir den nye prisen?', ['Vekstfaktor: 1 + 0,10 = 1,10.', '200 · 1,10 = 220.', 'Ny pris: 220 kr.']],
    [
      t('Hva er vekstfaktoren for 20 % økning?', 1.2, ['1 + 0,20.'], '1 + 0,20 = 1,2.'),
      t('Hva er vekstfaktoren for 30 % nedgang?', 0.7, ['1 − 0,30.'], '1 − 0,30 = 0,7.'),
      t('En vare koster 400 kr og øker med 10 %. Hva blir prisen?', 440, ['400 · 1,10.'], '400 · 1,1 = 440 kr.', 'kr'),
      t('En vare koster 500 kr og settes ned 20 %. Hva blir prisen?', 400, ['500 · 0,8.'], '500 · 0,8 = 400 kr.', 'kr'),
      t('Hvilken prosent tilsvarer vekstfaktor 1,25? (Svar i %)', 25, ['Trekk fra 1.'], '1,25 − 1 = 0,25 = 25 %.', '%'),
      v('Vekstfaktor 0,9 betyr …', ['10 % nedgang', '10 % økning', '90 % økning', '9 % nedgang'], 0, ['1 − 0,9 = ?'], '1 − 0,9 = 0,1 = 10 % nedgang.')
    ],
    'Her bruker du vekstfaktor flere ganger og baklengs.',
    [
      t('1000 kr står i banken med 5 % rente per år. Hvor mye er det etter 2 år?', 1102.5, ['1000 · 1,05 · 1,05.'], '1000 · 1,05² = 1102,5 kr.', 'kr'),
      t('Prisen er 360 kr etter en økning på 20 %. Hva var prisen før?', 300, ['Del på vekstfaktoren 1,2.'], '360 ÷ 1,2 = 300 kr.', 'kr'),
      t('Først øker en pris 10 %, så synker den 10 %. Prisen var 100. Hva er den nå?', 99, ['100 · 1,1 · 0,9.'], '100 · 1,1 = 110, og 110 · 0,9 = 99.', 'kr')
    ]);

  H.NIV('10/kjop-sparing-lan',
    'Rente er prisen for å låne penger, eller belønningen for å spare. Renters rente betyr at du får rente på renten også.',
    ['Du sparer 1000 kr med 4 % rente. Hvor mye får du i rente etter 1 år?', ['4 % av 1000 = 0,04 · 1000.', 'Det er 40 kr.']],
    [
      t('Du sparer 2000 kr med 5 % rente. Hvor mye får du i rente etter 1 år?', 100, ['0,05 · 2000.'], '0,05 · 2000 = 100 kr.', 'kr'),
      t('Du lånte 5000 kr med 10 % rente. Hvor mye er renten etter 1 år?', 500, ['0,10 · 5000.'], '500 kr.', 'kr'),
      t('Du sparer 100 kr hver måned. Hvor mye har du spart etter 12 måneder (uten rente)?', 1200, ['100 · 12.'], '1200 kr.', 'kr'),
      t('Du kjøper en sykkel for 3000 kr på avbetaling: 250 kr i 14 måneder. Hva betaler du totalt?', 3500, ['250 · 14.'], '3500 kr.', 'kr'),
      t('Hvor mye mer enn sykkelprisen (3000 kr) betaler du i oppgaven over?', 500, ['3500 − 3000.'], '500 kr i ekstra kostnader.', 'kr'),
      v('Hva betyr «renters rente»?', ['Du får rente på renten også', 'Renten er alltid lav', 'Du betaler ikke rente', 'Renten fjernes'], 0, ['Tenk på at saldoen vokser.'], 'Du får rente på både innskuddet og tidligere renter.')
    ],
    'Her sammenligner du sparing og lån over flere år.',
    [
      t('Du setter inn 10000 kr med 3 % rente i 2 år. Hva er saldoen etter 2 år?', 10609, ['10000 · 1,03².'], '10000 · 1,0609 = 10609 kr.', 'kr'),
      t('Et lån på 20000 kr har 8 % rente. Hva er renten første år?', 1600, ['0,08 · 20000.'], '1600 kr.', 'kr'),
      t('Du sparer 500 kr i måneden i 10 år (uten rente). Hvor mye er det totalt?', 60000, ['500 · 12 · 10.'], '500 · 120 = 60000 kr.', 'kr')
    ]);

  H.NIV('10/okonomi-prosjekt',
    'Et budsjett viser inntekter og utgifter. Mål: inntekter minus utgifter skal ikke bli negativt. Det som blir til overs kan du spare.',
    ['Inntekt 8000 kr, utgifter 6500 kr. Hva er overskuddet?', ['8000 − 6500.', 'Overskuddet er 1500 kr.']],
    [
      t('Inntekt 5000 kr, utgifter 3800 kr. Hva er overskuddet?', 1200, ['5000 − 3800.'], '1200 kr.', 'kr'),
      t('Du bruker 1500 kr på mat, 800 på mobil og 700 på fritid. Hva er totalen?', 3000, ['Legg sammen.'], '1500 + 800 + 700 = 3000 kr.', 'kr'),
      t('Du tjener 12000 kr og bruker 25 % på mat. Hvor mye er det?', 3000, ['25 % er 1/4.'], '12000 ÷ 4 = 3000 kr.', 'kr'),
      t('Du vil spare 6000 kr på 12 måneder. Hvor mye per måned?', 500, ['6000 ÷ 12.'], '500 kr.', 'kr'),
      t('Mobilabonnement 299 kr per måned. Hvor mye er det på ett år?', 3588, ['299 · 12.'], '3588 kr.', 'kr'),
      v('Hva er best for et budsjett?', ['Utgifter lavere enn inntekter', 'Utgifter høyere enn inntekter', 'Ingen utgifter', 'Bare sparing'], 0, ['Tenk på hva som blir igjen.'], 'Da blir det penger til overs.')
    ],
    'Her gjør du overslag og vurderer valg.',
    [
      t('Du tjener 20000 kr i måneden. Utgiftene er 17500 kr. Hvor mange prosent sparer du?', 12.5, ['Overskuddet delt på inntekten.'], '2500 ÷ 20000 = 0,125 = 12,5 %.', '%'),
      t('Abonnement A: 199 kr/mnd. B: 149 kr/mnd + 300 kr oppstart. Hvor mange måneder til A koster mest totalt? (Hel verdi)', 7, ['Sett opp 199m og 149m + 300.'], 'A − B = 50m − 300. Ved 7 mnd koster A 1393 og B 1343. A er dyrest fra og med måned 7.'),
      t('Prisen på en vare er 800 kr. Du sparer 80 kr i måneden. Hvor mange måneder tar det?', 10, ['800 ÷ 80.'], '10 måneder.')
    ]);

  H.NIV('10/modellering',
    'En modell er en enkel regel som beskriver virkeligheten. Vi velger modell, tester den og vurderer om den er rimelig.',
    ['Jens sparer 200 kr i uka. Skriv modellen og finn hva han har etter 5 uker.', ['y = 200x.', '200 · 5 = 1000 kr.']],
    [
      t('Modell: y = 30x. Hva er y når x = 4?', 120, ['30 · 4.'], '120.'),
      t('Modell: y = 50 + 20x. Hva er y når x = 3?', 110, ['50 + 20 · 3.'], '110.'),
      t('En frisør tar 300 kr per klipp. Hva koster 5 klipp?', 1500, ['300 · 5.'], '1500 kr.', 'kr'),
      t('Temperaturen er 20 °C og faller 2 °C per time. Hva er den etter 4 timer?', 12, ['20 − 2 · 4.'], '12 °C.', '°C'),
      t('Modell: y = 100 − 5x. Når er y lik 0?', 20, ['Løs 100 − 5x = 0.'], '5x = 100, så x = 20.'),
      v('Hva gjør en god modell?', ['Passer med målingene', 'Er veldig kompleks', 'Er alltid lineær', 'Har ingen tall'], 0, ['Sammenlign med virkeligheten.'], 'En god modell stemmer med det vi har målt.')
    ],
    'Her tolker du og vurderer modeller.',
    [
      t('Modell: y = 2000 · 1,05ˣ (kr etter x år). Hva er y etter 2 år?', 2205, ['2000 · 1,05 · 1,05.'], '2000 · 1,1025 = 2205 kr.', 'kr'),
      t('Målinger: (0, 5), (1, 8), (2, 11). Lineær modell y = ax + b. Hva er a?', 3, ['Økning per steg i x.'], 'y øker med 3 hver gang, så a = 3.'),
      v('Modellen y = 5 + 2x gir 25 når x = 10, men målingen er 40. Hva bør du gjøre?', ['Vurdere en annen modell', 'Ignorere målingen', 'Endre målingen', 'Gi opp'], 0, ['Modellen passer ikke.'], 'Prøv en annen modelltype, for eksempel eksponentiell.')
    ]);

  H.NIV('10/python',
    'Python er et språk du bruker til å gi datamaskinen oppskrifter. En variabel er en boks med navn. En løkke gjentar noe.',
    ['Hva skriver <code>x = 3<br>print(x + 2)</code> ut?', ['x er 3.', 'x + 2 = 5.', 'Svaret er 5.']],
    [
      t('Hva skriver <code>print(2 + 3 * 4)</code> ut?', 14, ['Gange først.'], '3 · 4 = 12, så 2 + 12 = 14.'),
      t('<code>x = 5<br>x = x + 2<br>print(x)</code> Hva skrives ut?', 7, ['Først er x 5, så legger vi til 2.'], 'x blir 7.'),
      t('<code>for i in range(4):<br>&nbsp;&nbsp;print(i)</code> Hvor mange tall skrives ut?', 4, ['Hvor mange runder gir range(4)?'], '4 tall: 0, 1, 2 og 3.'),
      t('<code>print(10 // 3)</code> gir heltallsdivisjon. Hva skrives ut?', 3, ['Hvor mange ganger går 3 opp i 10?'], '3 ganger, så 3.'),
      t('<code>a = 4<br>b = a * 2<br>print(b)</code> Hva skrives ut?', 8, ['b er dobbelt så stor som a.'], '4 · 2 = 8.'),
      v('Hva er en variabel?', ['En boks som har et navn og holder en verdi', 'Et regnestykke', 'Et tall som aldri endres', 'En løkke'], 0, ['Tenk på en merket boks.'], 'En variabel lagrer en verdi under et navn.')
    ],
    'Her leser du og følger litt lengre kode.',
    [
      t('<code>s = 0<br>for i in range(1, 5):<br>&nbsp;&nbsp;s = s + i<br>print(s)</code> Hva skrives ut?', 10, ['Tallene er 1, 2, 3, 4.'], '1 + 2 + 3 + 4 = 10.'),
      t('<code>x = 7<br>if x % 2 == 0:<br>&nbsp;&nbsp;print(1)<br>else:<br>&nbsp;&nbsp;print(2)</code> Hva skrives ut?', 2, ['% gir resten ved divisjon.', 'Er 7 et partall?'], '7 er oddetall, så else-grenen kjører: 2.'),
      t('<code>k = 1<br>for i in range(3):<br>&nbsp;&nbsp;k = k * 2<br>print(k)</code> Hva skrives ut?', 8, ['k dobles tre ganger.'], '1 → 2 → 4 → 8.')
    ]);
})();
