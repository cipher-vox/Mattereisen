/* Forklaringsseksjoner 9. trinn, del 1: måleenheter, figurer, Pytagoras, trekanter, formlikhet */
(function () {
  const M = window.MATTE; const H = M.H; const sv = H.sv;
  const { P, C, E, EK, W, TAB, K, FORK, FK } = H;
  const NEG = '#1d4ed8', POS = '#c2410c', NUL = '#15803d', INK = '#14213d', TEAL = '#0e8a96', PLUM = '#6d3fc9', ORANGE = '#e8964a';

  /* ---------- Sammensatte måleenheter ---------- */
  FK('9/sammensatte-maleenheter', [
    [0, FORK('Hva betyr «per»? Sammensatte enheter', '📖', [
      P('En <strong>sammensatt måleenhet</strong> setter to enheter sammen. Ordet <strong>«per»</strong> betyr «for hver» og skrives som en brøkstrek eller /. <strong>km/t</strong> leses «kilometer per time» og betyr hvor mange kilometer du kommer for hver time. Du finner dem ved å <strong>dele</strong> den ene størrelsen på den andre.'),
      TAB(['Størrelse', 'Enhet', 'Regnes ut slik', 'Eksempel'], [['Fart', 'km/t eller m/s', 'strekning ÷ tid', '150 km på 2 t = 75 km/t'], ['Pris', 'kr/kg eller kr/L', 'pris ÷ mengde', '60 kr for 3 kg = 20 kr/kg'], ['Tetthet', 'g/cm³', 'masse ÷ volum', '540 g på 200 cm³ = 2,7 g/cm³'], ['Folketetthet', 'personer/km²', 'folk ÷ areal', '5 000 000 / 385 000 km²']]),
      H.FIG(
        sv.r(20, 20, 130, 54, '#dff4f6', TEAL, 10) + sv.t(85, 54, 'strekning', { s: 17 }) + sv.t(175, 54, '÷', { s: 26 }) + sv.r(200, 20, 130, 54, '#fff1e3', ORANGE, 10) + sv.t(265, 54, 'tid', { s: 17 }) + sv.t(355, 54, '=', { s: 26 }) + sv.r(380, 20, 130, 54, '#e1f6e8', NUL, 10) + sv.t(445, 54, 'fart', { s: 17 }),
        530, 96, 'Fart finner du ved å dele strekningen på tiden.'),
      C('regel', 'Fart, strekning og tid', ['<strong>fart = strekning ÷ tid</strong>', '<strong>strekning = fart · tid</strong>', '<strong>tid = strekning ÷ fart</strong>', 'Husk å bruke enheter som passer sammen (km med timer, m med sekunder).']),
      EK('Regn ut fart', 'Du sykler 24 km på 1,5 timer. Hva er farten?', ['fart = strekning ÷ tid.', '24 ÷ 1,5 = 16.', 'Svar: 16 km/t.']),
      EK('Regn ut strekning', 'Bilen holder 80 km/t i 2,5 timer. Hvor langt kommer den?', ['strekning = fart · tid.', '80 · 2,5 = 200.', 'Svar: 200 km.']),
      EK('Regn ut tetthet', 'En metallbit har masse 540 g og volum 200 cm³. Hva er tettheten?', ['tetthet = masse ÷ volum.', '540 ÷ 200 = 2,7.', 'Svar: 2,7 g/cm³. Det er tettheten til aluminium.']),
      C('virkelighet', 'Hvor bruker vi det?', 'Fartsgrenser (km/t), enhetspriser i butikken (kr/kg), drivstofforbruk (liter per mil), og hvor tett folk bor (personer per km²).')
    ])],
    [2, FORK('Å regne om mellom enheter og tid', '🔄', [
      P('Når du regner med tid, er det viktig å huske at <strong>1 time = 60 minutter</strong>, ikke 100. Derfor kan du ikke skrive 1 time 30 min som 1,30 timer. Det riktige er <strong>1,5 timer</strong>, fordi 30 minutter er en halv time.'),
      TAB(['Minutter', 'I timer'], [['15 min', '0,25 t'], ['30 min', '0,5 t'], ['45 min', '0,75 t'], ['20 min', '1/3 t ≈ 0,33 t'], ['90 min', '1,5 t']]),
      C('regel', 'Fra minutter til timer', 'Del minuttene på 60. Eksempel: 40 min = 40 ÷ 60 = 0,67 timer (omtrent).'),
      EK('Fart med minutter', 'Du løper 6 km på 45 minutter. Hva er farten i km/t?', ['Gjør om tiden til timer: 45 ÷ 60 = 0,75 timer.', 'fart = 6 ÷ 0,75 = 8.', 'Svar: 8 km/t.']),
      P('<strong>Fra km/t til m/s:</strong> 1 km = 1000 m og 1 time = 3600 s. Så 1 km/t = 1000/3600 m/s, altså litt over en kvart m/s. Praktisk: <strong>del på 3,6</strong> for å gå fra km/t til m/s, og <strong>gang med 3,6</strong> for å gå andre veien.'),
      EK('Regn om 90 km/t til m/s', 'Hvor mange m/s er 90 km/t?', ['90 km/t = 90 000 m per 3600 s.', '90 000 ÷ 3600 = 25.', 'Svar: 25 m/s. (Rask regel: 90 ÷ 3,6 = 25.)']),
      C('tips', 'Prøv spillet', 'Enhets-memory i «Spill for å lære» lar deg trene på sammenhenger mellom enheter.')
    ])]
  ]);

  /* ---------- Figurer, formlikhet og kongruens ---------- */
  FK('9/figurer', [
    [0, FORK('Trekanter, firkanter og vinkelsum', '📖', [
      P('Trekanter og firkanter er de mest brukte figurene i bygg og konstruksjon. Hver figur har en <strong>vinkelsum</strong>, som alltid er den samme uansett hvordan figuren ser ut.'),
      C('regel', 'Vinkelsummer', ['Vinkelsummen i en <strong>trekant</strong> er alltid <strong>180°</strong>.', 'Vinkelsummen i en <strong>firkant</strong> er alltid <strong>360°</strong> (to trekanter).', 'I en <strong>n-kant</strong> er vinkelsummen (n − 2) · 180°.']),
      H.FIG(
        sv.p('M30 130 L170 130 L110 30 Z', '#dff4f6', TEAL, 3) + sv.t(50, 122, '50°', { s: 14, f: POS }) + sv.t(148, 122, '65°', { s: 14, f: POS }) + sv.t(110, 62, '?', { s: 22, f: NEG }) + sv.t(110, 160, '50° + 65° + ? = 180°', { s: 14 }) +
        sv.p('M260 130 L400 130 L430 40 L280 30 Z', '#fff1e3', ORANGE, 3) + sv.t(345, 160, '4 hjørner · 360°', { s: 14 }),
        460, 175, 'Trekanten har vinkelsum 180°. Den manglende vinkelen i figuren er 180° − 50° − 65° = 65°.'),
      EK('Finn manglende vinkel', 'To vinkler i en trekant er 50° og 65°. Finn den tredje.', ['Vinkelsummen er 180°.', 'Legg sammen de to du kjenner: 50° + 65° = 115°.', '180° − 115° = 65°.', 'Svar: 65°.']),
      EK('Vinkel i firkant', 'Tre vinkler i en firkant er 90°, 100° og 80°. Hva er den fjerde?', ['Vinkelsummen i en firkant er 360°.', '90° + 100° + 80° = 270°.', '360° − 270° = 90°.', 'Svar: 90°.']),
      C('virkelighet', 'Hvor bruker vi det?', 'Snekkere, arkitekter og ingeniører bruker vinkelsummer til å få tak, rammer og bruer til å passe sammen riktig.')
    ])],
    [2, FORK('Kongruente og formlike figurer', '🔍', [
      P('To figurer kan ligne hverandre på to måter:'),
      K([{ ikon: '👯', tittel: 'Kongruente', tekst: 'Nøyaktig lik form <em>og</em> størrelse. Du kan legge den ene oppå den andre, og de passer perfekt. Alle sider og vinkler er like.' }, { ikon: '🔎', tittel: 'Formlike', tekst: 'Lik form, men kan ha ulik størrelse. Som et bilde og en forstørrelse av det. Vinklene er like, og sidene er forstørret med samme faktor.' }]),
      W('formlikhet', { a: 3, b: 2, k: 2, tittel: 'Forstørr rektangelet: det blir formlikt med det første' }),
      C('regel', 'Skalafaktor', 'Hvis to figurer er formlike, ganges alle sidene med samme tall. Det tallet kalles <strong>skalafaktoren k</strong>. Er k = 2, er alle sidene dobbelt så lange. Vinklene endres ikke.'),
      EK('Er trekantene formlike?', 'Trekant A har sider 3, 4 og 5. Trekant B har sider 6, 8 og 10. Er de formlike?', ['Del sidene på hverandre: 6 ÷ 3 = 2, 8 ÷ 4 = 2, 10 ÷ 5 = 2.', 'Alle forholdene er like. Skalafaktoren er 2.', 'Svar: Ja, de er formlike (men ikke kongruente, siden de har ulik størrelse).']),
      EK('Finn en manglende side', 'To formlike trekanter har skalafaktor 3. En side i den lille er 4 cm. Hvor lang er tilsvarende side i den store?', ['Ganger med skalafaktoren: 4 · 3.', 'Svar: 12 cm.']),
      C('virkelighet', 'Hvor bruker vi det?', 'Kart og tegninger er formlike med virkeligheten. Foto som forstørres. Modeller av bygg og biler. Kongruens brukes når mange deler skal være helt like, som i industri.')
    ])]
  ]);

  /* ---------- Pytagoras ---------- */
  FK('9/pytagoras', [
    [0, FORK('Pytagoras’ læresetning', '📖', [
      P('I en <strong>rettvinklet trekant</strong> er den ene vinkelen 90°. Den lengste siden, rett overfor den rette vinkelen, kalles <strong>hypotenusen</strong>. De to korteste, som danner den rette vinkelen, kalles <strong>kateter</strong>.'),
      P('<strong>Pytagoras’ læresetning</strong> sier at hvis du lager et kvadrat på hver side, så er arealet av de to små kvadratene til sammen like stort som arealet av det store.'),
      W('pytagoras', { a: 3, b: 4, tittel: 'Dra i katetene og se kvadratene: a² + b² = c²' }),
      C('regel', 'Læresetningen', '<strong>a² + b² = c²</strong>, der a og b er katetene og c er hypotenusen. Det virker bare for rettvinklede trekanter.'),
      EK('Finn hypotenusen', 'En rettvinklet trekant har kateter 3 og 4. Finn hypotenusen.', ['Setningen: a² + b² = c². Sett inn: 3² + 4² = c².', '9 + 16 = 25, så c² = 25.', 'c = √25 = 5.', 'Svar: hypotenusen er 5.'], { widget: 'pytagoras', opts: { a: 3, b: 4, tittel: '3, 4 og 5' } }),
      EK('Hypotenusen er ikke et heltall', 'Kateter er 5 og 6. Finn hypotenusen.', ['5² + 6² = 25 + 36 = 61.', 'c = √61.', 'Kalkulator: √61 ≈ 7,81.', 'Svar: omtrent 7,8.']),
      C('husk', 'Vanlig feil', 'Husk å ta <strong>kvadratroten</strong> til slutt! 3² + 4² = 25 er c² (arealet), ikke c selv. c er √25 = 5.')
    ])],
    [2, FORK('Å finne en katet og bruke Pytagoras i praksis', '🪜', [
      P('Kjenner du hypotenusen og én katet, kan du finne den andre ved å <strong>snu</strong> setningen: a² = c² − b². Trekk fra, i stedet for å legge til.'),
      EK('Finn en katet', 'Hypotenusen er 13 og en katet er 5. Finn den andre.', ['a² + 5² = 13², så a² = 13² − 5².', '13² = 169 og 5² = 25. 169 − 25 = 144.', 'a = √144 = 12.', 'Svar: den andre kateten er 12.']),
      EK('Stigen mot veggen', 'En stige er 5 m lang. Den står 1,5 m fra husveggen. Hvor høyt opp på veggen når den?', ['Stigen, veggen og bakken danner en rettvinklet trekant. Stigen er hypotenusen (5 m).', 'a² = 5² − 1,5² = 25 − 2,25 = 22,75.', 'a = √22,75 ≈ 4,77.', 'Svar: omtrent 4,8 m opp på veggen.']),
      H.FIG(
        sv.l(40, 150, 260, 150, INK, 4) + sv.l(40, 150, 40, 20, INK, 4) + sv.l(40, 20, 230, 150, POS, 5) + sv.t(135, 70, 'stige 5 m', { s: 14, f: POS, a: 'start' }) + sv.t(135, 168, '1,5 m', { s: 14 }) + sv.t(24, 90, '?', { s: 22, f: NEG }) + sv.r(40, 134, 16, 16, 'none', INK, 0),
        300, 180, 'Stigen er hypotenusen, veggen og bakken er katetene.'),
      C('virkelighet', 'Hvor bruker vi det?', 'Snekkere sjekker at en vegg står rett ved å måle 3, 4 og 5 (3-4-5-regelen). Du kan beregne snarveier over en tomt, lengden på en skrå takbjelke og hvor lang en TV-diagonal er.'),
      C('tips', 'Prøv spillet', 'Redningsstigen i «Spill for å lære» lar deg bruke Pytagoras med en stige og et brennende hus.')
    ])]
  ]);

  /* ---------- Trekanter ---------- */
  FK('9/trekanter', [
    [0, FORK('Kan tre sider bli en trekant?', '📖', [
      P('Har du tre pinner, kan du ikke alltid lage en trekant. Hvis den ene pinnen er for lang, rekker ikke de to andre å møtes. Her er regelen, kalt <strong>trekantulikheten</strong>:'),
      C('regel', 'Trekantulikheten', 'To sider i en trekant er til sammen <strong>alltid lengre</strong> enn den tredje. Det må gjelde for alle tre kombinasjoner. Det er nok å sjekke at de to korteste til sammen er lengre enn den lengste.'),
      W('trekant', { a: 3, b: 4, c: 5, tittel: 'Dra i sidene og se når det går' }),
      EK('Kan sidene 3, 4 og 8 danne en trekant?', 'Kan sidene 3 cm, 4 cm og 8 cm danne en trekant?', ['Sjekk de to korteste mot den lengste: 3 + 4 = 7.', '7 er mindre enn 8. De rekker ikke å møtes.', 'Svar: Nei. Det går ikke.']),
      EK('Kan sidene 5, 6 og 7 danne en trekant?', 'Kan sidene 5, 6 og 7 danne en trekant?', ['De to korteste: 5 + 6 = 11.', '11 er større enn 7.', 'Svar: Ja, det går.']),
      C('virkelighet', 'Hvorfor er dette nyttig?', 'Trekanter er den sterkeste formen i konstruksjon. Bruer, tak og stillaser bruker trekanter. Da må lengdene på bjelkene passe sammen.')
    ])],
    [3, FORK('Spiss, rett eller stump trekant', '📐', [
      P('Trekanter kan klassifiseres etter den <strong>største vinkelen</strong>:'),
      K([{ ikon: '🔺', tittel: 'Spiss', tekst: 'Alle vinkler er mindre enn 90°.' }, { ikon: '📐', tittel: 'Rettvinklet', tekst: 'En vinkel er nøyaktig 90°.' }, { ikon: '🔻', tittel: 'Stump', tekst: 'En vinkel er større enn 90°.' }]),
      P('Du kan finne ut hva slags trekant du har uten å måle vinkler. Bruk Pytagoras som test: sammenlikn <strong>a² + b²</strong> (de to korteste sidene) med <strong>c²</strong> (den lengste).'),
      TAB(['Test', 'Betyr', 'Trekanten er'], [['a² + b² = c²', 'Pytagoras stemmer', 'rettvinklet'], ['a² + b² > c²', 'de korte sidene er «lange nok»', 'spiss'], ['a² + b² < c²', 'de korte sidene er for korte', 'stump']]),
      EK('Test 5, 6, 7', 'Er trekanten med sider 5, 6 og 7 spiss, rett eller stump?', ['Lengste side er 7. Regn ut a² + b² = 5² + 6² = 25 + 36 = 61.', 'c² = 7² = 49.', '61 er større enn 49.', 'Svar: spiss.']),
      EK('Test 4, 5, 7', 'Er trekanten med sider 4, 5 og 7 spiss, rett eller stump?', ['Lengste side er 7. a² + b² = 16 + 25 = 41.', 'c² = 49.', '41 er mindre enn 49.', 'Svar: stump.']),
      C('tips', 'Prøv spillet', 'Pinnebyggeren i «Spill for å lære» lar deg bygge trekanter som er spisse, rette, stumpe eller umulige.')
    ])]
  ]);

  /* ---------- Formlikhet i praksis ---------- */
  FK('9/formlikhet-praksis', [
    [0, FORK('Målestokk, kart og skalafaktor', '📖', [
      P('Et kart eller en tegning er <strong>formlik</strong> med virkeligheten. <strong>Målestokken</strong> forteller hvor mye virkeligheten er forminsket. 1 : 50 000 betyr at 1 cm på kartet er 50 000 cm i virkeligheten.'),
      H.FIG(
        sv.r(20, 30, 110, 70, '#dff4f6', TEAL, 4) + sv.t(75, 70, '1 cm', { s: 16 }) + sv.t(150, 70, '→', { s: 26 }) + sv.r(175, 30, 300, 70, '#e8f1e2', NUL, 4) + sv.t(325, 70, '500 m i virkeligheten', { s: 16 }) + sv.t(250, 125, 'Målestokk 1 : 50 000', { s: 15, f: '#52617a' }),
        500, 140, '1 cm på kartet er 50 000 cm = 500 m i virkeligheten.'),
      C('regel', 'Slik regner du', ['Lengde i virkeligheten = lengde på kartet · nevneren i målestokken.', 'Husk å regne om til passende enhet: 100 cm = 1 m og 100 000 cm = 1 km.']),
      EK('Fra kart til virkelighet', 'På et kart med målestokk 1 : 50 000 er avstanden mellom to byer 8 cm. Hvor langt er det i virkeligheten?', ['8 cm · 50 000 = 400 000 cm.', '400 000 cm = 4000 m = 4 km.', 'Svar: 4 km.']),
      EK('Høyde med skygge', 'En person på 1,8 m kaster en skygge på 2,4 m. Et tre kaster samtidig en skygge på 12 m. Hvor høyt er treet?', ['Sola gir formlike trekanter: person og skygge, tre og skygge.', 'Forhold: høyde ÷ skygge = 1,8 ÷ 2,4 = 0,75.', 'Treet: høyde = 12 · 0,75 = 9.', 'Svar: treet er 9 m høyt.']),
      C('virkelighet', 'Hvor bruker vi det?', 'Fra gammelt av har folk målt høyden på pyramider og fjell ved å bruke skygger og formlikhet. Det gjøres fortsatt i oppmåling og kartlegging.')
    ])],
    [2, FORK('Når alt dobles: lengde, areal og volum', '🔎', [
      P('Dette er viktig og overraskende. Hvis du forstørrer en figur med skalafaktor <strong>k</strong>, endres lengde, areal og volum <strong>ulikt</strong>:'),
      TAB(['Størrelse', 'Endres med', 'Hvis k = 2', 'Hvis k = 3'], [['Lengde (sider, omkrets)', 'k', '2 ganger', '3 ganger'], ['Areal (flate)', 'k²', '4 ganger', '9 ganger'], ['Volum (rom)', 'k³', '8 ganger', '27 ganger']]),
      W('formlikhet', { a: 3, b: 2, k: 2, tittel: 'Se hva som skjer med omkrets og areal når k økes' }),
      H.FIG(
        sv.r(20, 90, 40, 40, '#dff4f6', TEAL, 2) + sv.t(40, 150, '1 · 1 = 1', { s: 13 }) + sv.t(100, 115, '→', { s: 24 }) + sv.r(130, 50, 80, 80, '#dff4f6', TEAL, 2) + sv.l(170, 50, 170, 130, TEAL, 1, '3 3') + sv.l(130, 90, 210, 90, TEAL, 1, '3 3') + sv.t(170, 150, '2 · 2 = 4 ruter', { s: 13 }),
        260, 165, 'Dobler du siden, passer det 4 ganger så mange små kvadrater i figuren. Arealet firedobles.'),
      EK('Areal og volum ved dobling', 'En terning har sidelengde 3 cm. Vi lager en terning med sidelengde 6 cm. Hva skjer med volumet?', ['Skalafaktoren er k = 6 ÷ 3 = 2.', 'Volumet endres med k³ = 2 · 2 · 2 = 8.', 'Den lille: 3 · 3 · 3 = 27 cm³. Den store: 6 · 6 · 6 = 216 cm³. 27 · 8 = 216 ✓.', 'Svar: volumet blir 8 ganger så stort.']),
      EK('Pizza-prisen', 'En pizza med diameter 20 cm koster 100 kr. En pizza med diameter 40 cm koster 250 kr. Hvilken er best kjøp?', ['Diameteren dobles, så k = 2. Arealet øker k² = 4 ganger.', 'Den store pizzaen har 4 ganger så mye pizza.', '4 · 100 kr ville vært 400 kr, men den koster bare 250 kr.', 'Svar: den store er klart best kjøp.']),
      C('virkelighet', 'Hvorfor er dette viktig?', 'Derfor kan ikke mus bli like store som elefanter og fortsatt stå på tynne bein, og derfor må dyrebein bli tykkere når dyr blir større. Det forklarer også hvorfor store pizzaer er bedre kjøp.')
    ])]
  ]);
})();
