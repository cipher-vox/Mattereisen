/* Rolig og Utfordring: 9. trinn. */
(function () {
  const H = window.MATTE.H, t = H.t, v = H.v;

  H.NIV('9/sammensatte-maleenheter',
    '«Per» betyr «for hver». 60 km/t betyr 60 km for hver time. Tenk på hva du har og hva du skal finne.',
    ['En bil kjører 120 km på 2 timer. Hva er farten?', ['Fart = strekning ÷ tid.', '120 ÷ 2 = 60.', 'Farten er 60 km/t.']],
    [
      t('En bil kjører 150 km på 3 timer. Hva er farten i km/t?', 50, ['Fart = strekning ÷ tid.'], '150 ÷ 3 = 50 km/t.', 'km/t'),
      t('Du holder 60 km/t i 2 timer. Hvor langt kommer du?', 120, ['Strekning = fart · tid.'], '60 · 2 = 120 km.', 'km'),
      t('Du går 12 km med fart 4 km/t. Hvor mange timer tar det?', 3, ['Tid = strekning ÷ fart.'], '12 ÷ 4 = 3 timer.', 'timer'),
      t('Hvor mange minutter er 2 timer?', 120, ['1 time er 60 minutter.'], '2 · 60 = 120 minutter.', 'min'),
      t('En pakke koster 90 kr for 3 kg. Hva er prisen per kg?', 30, ['Del prisen på antall kg.'], '90 ÷ 3 = 30 kr per kg.', 'kr/kg'),
      v('Hva er 45 minutter i timer?', ['0,45', '0,75', '0,5', '4,5'], 1, ['Del minuttene på 60.'], '45 ÷ 60 = 0,75 timer.')
    ],
    'Her blander du enheter og regner om.',
    [
      t('Du sykler 20 km på 1 time og 15 minutter. Hva er gjennomsnittsfarten i km/t?', 16, ['1 t 15 min er 1,25 timer.'], '20 ÷ 1,25 = 16 km/t.', 'km/t'),
      t('Regn om 72 km/t til m/s.', 20, ['Del på 3,6.'], '72 ÷ 3,6 = 20 m/s.', 'm/s'),
      t('Et stykke metall veier 540 g og har volum 200 cm³. Hva er tettheten i g/cm³?', 2.7, ['Tetthet = masse ÷ volum.'], '540 ÷ 200 = 2,7 g/cm³.', 'g/cm³')
    ]);

  H.NIV('9/figurer',
    'Vinkelsummen i en trekant er alltid 180°, og i en firkant 360°. Kongruente figurer er helt like. Formlike figurer har samme form, men kan ha ulik størrelse.',
    ['To vinkler i en trekant er 50° og 60°. Hva er den tredje?', ['Vinkelsummen er 180°.', '50 + 60 = 110.', '180 − 110 = 70. Den tredje vinkelen er 70°.']],
    [
      t('To vinkler i en trekant er 50° og 60°. Hva er den tredje (i grader)?', 70, ['Vinkelsummen er 180°.'], '180 − 50 − 60 = 70°.', '°'),
      t('Hvor mange grader er vinkelsummen i en firkant?', 360, ['Del firkanten i to trekanter.'], 'To trekanter gir 2 · 180 = 360°.', '°'),
      t('I en likesidet trekant er alle vinklene like store. Hvor stor er hver (i grader)?', 60, ['180 delt på 3.'], '180 ÷ 3 = 60°.', '°'),
      v('To figurer er kongruente hvis …', ['de er helt like (samme form og størrelse)', 'de har samme form, men ulik størrelse', 'de har samme areal', 'de har samme farge'], 0, ['Kongruente figurer kan legges oppå hverandre.'], 'Kongruente figurer er helt like.'),
      t('En trekant forstørres så alle sidene blir doblet. En side var 4 cm. Hvor lang er den nå?', 8, ['Dobbelt så lang.'], '4 · 2 = 8 cm.', 'cm'),
      t('I en rettvinklet trekant er en vinkel 90° og en 35°. Hva er den tredje (i grader)?', 55, ['180 − 90 − 35.'], '180 − 90 − 35 = 55°.', '°')
    ],
    'Her bruker du reglene i litt lengre resonnementer.',
    [
      t('En likebeint trekant har toppvinkel 40°. Hva er hver av grunnvinklene (i grader)?', 70, ['Grunnvinklene er like store.', 'Resten av 180° deles på to.'], '(180 − 40) ÷ 2 = 70°.', '°'),
      t('To formlike trekanter har skalafaktor 3. Den lille har areal 5 cm². Hva er arealet av den store?', 45, ['Areal skaleres med skalafaktoren i andre potens.'], '3² = 9, og 5 · 9 = 45 cm².', 'cm²'),
      t('Vinkelsummen i en femkant er 540°. Hvor stor er hver vinkel i en regulær femkant (i grader)?', 108, ['Alle vinklene er like store.'], '540 ÷ 5 = 108°.', '°')
    ]);

  H.NIV('9/pytagoras',
    'I en rettvinklet trekant er a² + b² = c², der c er hypotenusen, den lengste siden. Tegn alltid en skisse og skriv hva som er hva.',
    ['Katetene er 3 og 4. Hva er hypotenusen?', ['c² = 3² + 4².', '9 + 16 = 25.', 'c = √25 = 5.']],
    [
      t('Katetene er 6 og 8. Hva er hypotenusen?', 10, ['Regn 6² + 8².'], '36 + 64 = 100, og √100 = 10.'),
      t('Katetene er 5 og 12. Hva er hypotenusen?', 13, ['Regn 5² + 12².'], '25 + 144 = 169, og √169 = 13.'),
      t('Hypotenusen er 13 og en katet er 5. Hva er den andre?', 12, ['Nå skal du trekke fra: c² − a².'], '13² − 5² = 169 − 25 = 144, og √144 = 12.'),
      t('En stige på 5 m står 3 m ut fra en vegg. Hvor høyt opp på veggen når den?', 4, ['Stigen er hypotenusen.'], '5² − 3² = 25 − 9 = 16, og √16 = 4 m.', 'm'),
      v('Hva er hypotenusen?', ['Den lengste siden, overfor den rette vinkelen', 'Den korteste siden', 'Siden nederst', 'En av katetene'], 0, ['Den ligger overfor 90°-vinkelen.'], 'Hypotenusen er den lengste siden og ligger overfor den rette vinkelen.'),
      t('Katetene er 9 og 12. Hva er hypotenusen?', 15, ['81 + 144 = ?'], '81 + 144 = 225, og √225 = 15.')
    ],
    'Her bruker du Pytagoras i virkelige situasjoner og koordinatsystemet.',
    [
      t('En skjerm er 40 cm bred og 30 cm høy. Hvor lang er diagonalen?', 50, ['Diagonalen er hypotenusen.'], '40² + 30² = 1600 + 900 = 2500, og √2500 = 50 cm.', 'cm'),
      t('Er trekanten med sidene 7, 24 og 25 rettvinklet? Hva er 7² + 24²?', 625, ['Regn ut hvert kvadrat for seg.', 'Er svaret lik 25²?'], '49 + 576 = 625 = 25². Ja, den er rettvinklet.'),
      t('Hva er avstanden fra (0, 0) til (6, 8) i et koordinatsystem?', 10, ['Lag en rettvinklet trekant med katetene 6 og 8.'], '6² + 8² = 100, og √100 = 10.')
    ]);

  H.NIV('9/trekanter',
    'Tre pinner kan bare bli en trekant hvis de to korteste til sammen er lengre enn den lengste. Prøv gjerne å tegne.',
    ['Kan 3, 4 og 8 bli en trekant?', ['Legg sammen de to korteste: 3 + 4 = 7.', '7 er mindre enn 8.', 'Da rekker ikke endene sammen. Nei.']],
    [
      v('Kan pinnene 3, 4 og 5 bli en trekant?', ['Ja', 'Nei'], 0, ['3 + 4 = 7. Er 7 større enn 5?'], '3 + 4 = 7 er større enn 5, så ja.'),
      v('Kan pinnene 2, 3 og 7 bli en trekant?', ['Ja', 'Nei'], 1, ['2 + 3 = 5. Er 5 større enn 7?'], '2 + 3 = 5 er mindre enn 7, så nei.'),
      v('Kan pinnene 5, 5 og 10 bli en trekant?', ['Ja', 'Nei'], 1, ['5 + 5 = 10. Er det større enn 10?'], '5 + 5 = 10 er ikke større enn 10. Pinnene legger seg flatt, så det blir ingen trekant.'),
      t('To sider er 4 og 6. Hva er den lengste hele siden den tredje kan ha?', 9, ['Den må være mindre enn 4 + 6.'], 'Må være mindre enn 10, så den lengste hele lengden er 9.'),
      t('To sider er 4 og 9. Hva er den korteste hele siden den tredje kan ha?', 6, ['Den må være større enn 9 − 4.'], 'Må være større enn 5, så den korteste hele lengden er 6.'),
      v('En trekant har sidene 6, 8 og 10. Er den spiss, rett eller stump?', ['Rett', 'Spiss', 'Stump', 'Kan ikke vites'], 0, ['Sjekk om 6² + 8² er lik 10².'], '36 + 64 = 100 = 10². Den er rettvinklet.')
    ],
    'Her undersøker du grenser og typer trekanter.',
    [
      t('To sider er 7 og 12. Hvor mange hele lengder kan den tredje siden ha?', 13, ['Må være større enn 12 − 7 = 5 og mindre enn 7 + 12 = 19.'], 'Lengdene er 6, 7, …, 18. Det er 13 muligheter.'),
      v('Sidene er 5, 6 og 9. Er trekanten spiss, rett eller stump?', ['Spiss', 'Rett', 'Stump'], 2, ['Sammenlign 5² + 6² med 9².'], '25 + 36 = 61, som er mindre enn 81 = 9². Da er vinkelen stump.'),
      t('En likebeint trekant har omkrets 30 cm og to sider på 12 cm. Hvor lang er den tredje siden?', 6, ['Omkrets er summen av alle sidene.'], '30 − 12 − 12 = 6 cm. (Sjekk: 6 + 12 er større enn 12.)', 'cm')
    ]);

  H.NIV('9/formlikhet-praksis',
    'Målestokken forteller hvor mange ganger tingen er forminsket. 1 : 100 betyr at 1 cm på tegningen er 100 cm i virkeligheten.',
    ['Et kart har målestokk 1 : 1000. En vei er 3 cm på kartet. Hvor lang er den i virkeligheten?', ['3 · 1000 = 3000 cm.', '3000 cm = 30 m.']],
    [
      t('Målestokk 1 : 100. En lengde er 5 cm på tegningen. Hvor mange cm er det i virkeligheten?', 500, ['Gang med 100.'], '5 · 100 = 500 cm.', 'cm'),
      t('Målestokk 1 : 50000. Det er 2 cm på kartet. Hvor mange km er det i virkeligheten?', 1, ['2 · 50000 = 100000 cm.', '100000 cm = 1000 m.'], '100000 cm = 1000 m = 1 km.', 'km'),
      t('En 2 m lang stolpe har 3 m skygge. Samtidig har et tre 12 m skygge. Hvor høyt er treet?', 8, ['Hvor mange ganger lengre er trærs skygge enn stolpens?'], '12 ÷ 3 = 4, så treet er 4 · 2 = 8 m.', 'm'),
      t('Alle lengdene i en figur dobles. Hvor mange ganger større blir arealet?', 4, ['Areal er lengde · bredde. Begge dobles.'], '2 · 2 = 4 ganger så stort.'),
      t('Alle lengdene i en kasse dobles. Hvor mange ganger større blir volumet?', 8, ['Volum er lengde · bredde · høyde.'], '2 · 2 · 2 = 8 ganger så stort.'),
      t('En modellbil i målestokk 1 : 20 er 15 cm lang. Hvor lang er den virkelige bilen i cm?', 300, ['Gang med 20.'], '15 · 20 = 300 cm.', 'cm')
    ],
    'Her regner du areal og volum med målestokk og skygger.',
    [
      t('Et kart har målestokk 1 : 25000. En skog er 8 cm² på kartet. Hvor mange km² er den i virkeligheten?', 0.5, ['1 cm på kartet er 250 m.', 'Areal: 1 cm² på kartet er 250 · 250 m².'], '1 cm² er 62500 m². 8 · 62500 = 500000 m² = 0,5 km².', 'km²'),
      t('En kube har kantlengde 3 cm. Kantlengden tredobles. Hvor mange ganger større blir volumet?', 27, ['Volum skaleres med skalafaktoren i tredje.'], '3 · 3 · 3 = 27 ganger så stort.'),
      t('En person på 1,8 m har 2,4 m skygge. Samtidig har et tårn 48 m skygge. Hvor høyt er tårnet?', 36, ['Hvor mange ganger lengre er tårnets skygge?'], '48 ÷ 2,4 = 20, så tårnet er 20 · 1,8 = 36 m.', 'm')
    ]);

  H.NIV('9/overflate-volum',
    'Volum er hvor mye en ting rommer (cm³). Overflate er summen av alle flatene (cm²). Tegn figuren og skriv ned hver flate.',
    ['Finn volumet av en kasse på 4 cm · 3 cm · 2 cm.', ['Volum = lengde · bredde · høyde.', '4 · 3 · 2 = 24.', 'Volumet er 24 cm³.']],
    [
      t('En kasse er 5 cm lang, 4 cm bred og 3 cm høy. Hva er volumet?', 60, ['Volum = l · b · h.'], '5 · 4 · 3 = 60 cm³.', 'cm³'),
      t('En terning har kantlengde 4 cm. Hva er volumet?', 64, ['4 · 4 · 4.'], '4 · 4 · 4 = 64 cm³.', 'cm³'),
      t('En terning har kantlengde 3 cm. Hva er overflaten? (Terningen har 6 like sider.)', 54, ['Én side er 3 · 3.'], 'En side er 9 cm². 6 · 9 = 54 cm².', 'cm²'),
      t('Hvor mange liter er 2000 cm³? (1 liter = 1000 cm³)', 2, ['Del på 1000.'], '2000 ÷ 1000 = 2 liter.', 'liter'),
      t('Et prisme har grunnflate 10 cm² og høyde 6 cm. Hva er volumet?', 60, ['Volum = grunnflate · høyde.'], '10 · 6 = 60 cm³.', 'cm³'),
      v('Hva er formelen for volumet av en sylinder?', ['π · r² · h', '2 · π · r', 'π · r · h', 'r² · h'], 0, ['Grunnflaten er en sirkel: π · r².'], 'Volum = grunnflate · høyde = π · r² · h.')
    ],
    'Her bruker du formlene i litt lengre oppgaver.',
    [
      t('En sylinder har radius 3 cm og høyde 10 cm. Hva er volumet, avrundet til nærmeste hele cm³?', 283, ['V = π · r² · h.', 'r² = 9.'], 'V = π · 9 · 10 ≈ 282,7, som blir 283 cm³.', 'cm³'),
      t('En boks er 20 cm lang, 15 cm bred og 10 cm høy. Hvor mange liter rommer den?', 3, ['Finn volumet i cm³ først.'], '20 · 15 · 10 = 3000 cm³ = 3 liter.', 'liter'),
      t('Volumet av en kule er 4/3 · π · r³. Hva er volumet når r = 3 cm, avrundet til nærmeste hele cm³?', 113, ['r³ = 27.', '4/3 · 27 = 36.'], '4/3 · π · 27 = 36π ≈ 113,1, som blir 113 cm³.', 'cm³')
    ]);

  H.NIV('9/sentralmal-spredning',
    'Gjennomsnittet er summen delt på antall. Medianen er midterste tall når de er sortert. Typetallet er det som kommer oftest. Variasjonsbredden er største minus minste.',
    ['Finn gjennomsnittet av 2, 4 og 6.', ['Legg sammen: 2 + 4 + 6 = 12.', 'Del på antall tall: 12 ÷ 3.', 'Gjennomsnittet er 4.']],
    [
      t('Finn gjennomsnittet av 3, 5 og 7.', 5, ['Summen delt på antall.'], '(3 + 5 + 7) ÷ 3 = 15 ÷ 3 = 5.'),
      t('Finn medianen av 2, 9, 4, 7 og 5.', 5, ['Sorter først: 2, 4, 5, 7, 9.'], 'Midterste tall er 5.'),
      t('Finn typetallet: 3, 5, 3, 8, 3, 5.', 3, ['Hvilket tall kommer oftest?'], '3 kommer tre ganger. Typetallet er 3.'),
      t('Finn variasjonsbredden: 4, 12, 7, 9.', 8, ['Største minus minste.'], '12 − 4 = 8.'),
      t('Finn medianen av 3, 5, 8 og 10.', 6.5, ['Her er det to tall i midten.', 'Finn gjennomsnittet av dem.'], '(5 + 8) ÷ 2 = 6,5.'),
      v('Hvilket mål påvirkes mest av ett svært høyt tall?', ['Gjennomsnitt', 'Median', 'Typetall', 'Variasjonsbredde'], 0, ['Tenk på hva som skjer med summen.'], 'Ett svært høyt tall trekker gjennomsnittet opp. Medianen endrer seg lite.')
    ],
    'Her bruker du sentralmål og spredning til å resonnere.',
    [
      t('Gjennomsnittet av fem tall er 8. Fire av dem er 6, 7, 9 og 10. Hva er det femte?', 8, ['Summen av alle fem er 5 · 8.'], 'Sum = 40. 6 + 7 + 9 + 10 = 32. Det femte er 40 − 32 = 8.'),
      t('Finn gjennomsnittet av 2, 3, 3, 4, 5, 6 og 12.', 5, ['Legg sammen alle sju.'], '35 ÷ 7 = 5.'),
      t('Datasett: 1, 3, 4, 6, 7, 8, 9. Hva er kvartilbredden?', 5, ['Medianen er 6.', 'Nedre kvartil er medianen i 1, 3, 4. Øvre er medianen i 7, 8, 9.'], 'Nedre kvartil er 3 og øvre er 8. Kvartilbredden er 8 − 3 = 5.')
    ]);

  H.NIV('9/statistikk-media',
    'Tall i nyhetene kan lure oss. Spør alltid: Hvor mange er spurt? Hva er sammenlignet? Hvor starter aksen?',
    ['En graf viser at salget økte fra 95 til 98, men y-aksen starter på 94. Hva er problemet?', ['Når aksen ikke starter på 0, ser små forskjeller store ut.', 'Økningen er bare litt over 3 %.']],
    [
      v('En graf har y-aksen startende på 90, ikke 0. Hva skjer?', ['Små forskjeller ser store ut', 'Ingenting', 'Alt blir feil', 'Tallene blir mindre'], 0, ['Tenk på hvor høye søylene blir.'], 'Små forskjeller blir overdrevet.'),
      t('10 av 40 elever liker fisk. Hvor mange prosent er det?', 25, ['10 ÷ 40 = ?'], '10 ÷ 40 = 0,25 = 25 %.', '%'),
      v('Hvilket utvalg er best for å si noe om alle elevene på skolen?', ['Tilfeldig valgte elever fra alle trinn', 'Bare elevene i fotballaget', 'Bare venner', 'Bare 8. trinn'], 0, ['Utvalget bør ligne på alle.'], 'Tilfeldig utvalg fra alle trinn gir best bilde.'),
      t('En pris økte fra 100 til 120. Hvor mange prosent økning er det?', 20, ['Økningen er 20 kr. Hvor mye er det av 100?'], '20 ÷ 100 = 20 %.', '%'),
      v('Det selges mye is og skjer mange drukningsulykker om sommeren. Betyr det at is forårsaker drukning?', ['Nei, sommervarmen påvirker begge', 'Ja', 'Bare på stranda', 'Kan ikke vites'], 0, ['Er det noe som kan påvirke begge deler?'], 'Sommeren gir både mer is og mer bading.'),
      t('Snittlønnen i en bedrift er 600000 kr, og medianen er 450000 kr. Hva er forskjellen i kr?', 150000, ['Trekk fra det minste fra det største.'], '600000 − 450000 = 150000 kr.', 'kr')
    ],
    'Her avslører du triks i tall og grafer.',
    [
      t('Salget økte fra 40 til 50 en måned. Hvor mange prosent økning er det?', 25, ['Økningen er 10. Hvor mye er det av 40?'], '10 ÷ 40 = 0,25 = 25 %.', '%'),
      t('En avis skriver at antall ulykker økte med 100 % da tallet gikk fra 1 til 2. Hvor mange flere ulykker var det?', 1, ['100 % av 1 er?'], 'Det var bare 1 ulykke mer. Prosent kan høres dramatisk ut når tallene er små.'),
      v('Hva gjør «9 av 10 tannleger anbefaler» mest misvisende?', ['Kanskje bare 10 ble spurt', 'Tannleger vet ingenting', '9 er et dårlig tall', 'Det er for høyt'], 0, ['Spør: Hvor mange ble egentlig spurt?'], 'Er bare 10 spurt, sier tallet lite om alle tannleger.')
    ]);

  H.NIV('9/sannsynlighet',
    'Sannsynlighet = antall gunstige utfall delt på antall mulige utfall. Det er alltid et tall mellom 0 og 1.',
    ['Hva er sannsynligheten for å få en sekser med en terning?', ['Det er 6 mulige utfall.', 'Bare 1 av dem er en sekser.', 'Sannsynligheten er 1/6.']],
    [
      t('Hvor mange gunstige utfall er det for «partall» når du kaster en terning? (2, 4, 6)', 3, ['Tell partallene fra 1 til 6.'], 'Partallene er 2, 4 og 6. Det er 3.'),
      v('En pose har 3 røde og 7 blå kuler. Hva er sannsynligheten for rød?', ['3/10', '3/7', '7/10', '1/3'], 0, ['Hvor mange kuler er det totalt?'], 'Det er 3 røde av 10 kuler: 3/10.'),
      t('Hva er sannsynligheten for kron på et myntkast, i prosent?', 50, ['Ett gunstig av to mulige.'], '1/2 = 50 %.', '%'),
      t('Sannsynligheten for regn er 0,3. Hva er sannsynligheten for ikke regn?', 0.7, ['De to sannsynlighetene summerer til 1.'], '1 − 0,3 = 0,7.'),
      t('Du kaster en terning. Hvor mange utfall er større enn 4?', 2, ['Hvilke tall er større enn 4?'], '5 og 6. Det er 2 utfall.'),
      v('Hva er sannsynligheten for et utfall som er helt sikkert?', ['1', '0', '0,5', '10'], 0, ['Sannsynligheten for noe som alltid skjer.'], 'Et sikkert utfall har sannsynlighet 1.')
    ],
    'Her regner du på flere forsøk og på sjanser uten tilbakelegging.',
    [
      t('Du kaster to terninger. Hva er sannsynligheten (i prosent, avrundet til hel) for at summen blir 7?', 17, ['Det er 36 mulige utfall.', 'Hvor mange av dem gir sum 7?'], '6 av 36 gir sum 7. 6/36 = 1/6 ≈ 16,7 %, som blir 17 %.', '%'),
      t('En pose har 4 røde og 6 blå kuler. Du trekker to uten å legge tilbake. Hva er sannsynligheten for to røde, i prosent avrundet til hel?', 13, ['Første: 4/10. Andre: 3/9.', 'Gang sannsynlighetene.'], '4/10 · 3/9 = 12/90 ≈ 13,3 %, som blir 13 %.', '%'),
      t('Du kaster en mynt tre ganger. Hvor mange mulige utfall er det totalt?', 8, ['Hvert kast har 2 utfall.'], '2 · 2 · 2 = 8 utfall.')
    ]);

  H.NIV('9/simulering',
    'I en simulering lar vi datamaskinen gjøre mange tilfeldige forsøk for oss. Jo flere forsøk, jo nærmere kommer vi den ekte sannsynligheten.',
    ['Hva gjør random.randint(1, 6)?', ['Den lager et tilfeldig heltall.', 'Tallet er mellom 1 og 6, med begge inkludert.', 'Det er som å kaste en terning.']],
    [
      v('Hva gjør random.randint(1, 6)?', ['Velger et tilfeldig heltall fra 1 til 6', 'Alltid 6', 'Regner ut 1 · 6', 'Skriver ut tallene 1 til 6'], 0, ['Tenk på en terning.'], 'Den velger et tilfeldig heltall fra 1 til 6.'),
      t('Du simulerer 100 myntkast. Omtrent hvor mange kron forventer du?', 50, ['Halvparten.'], '100 ÷ 2 = 50.'),
      t('Du simulerer 600 terningkast. Omtrent hvor mange seksere forventer du?', 100, ['1/6 av kastene.'], '600 ÷ 6 = 100.'),
      t('Du fikk 47 kron på 100 kast. Hva er den relative frekvensen i prosent?', 47, ['Del antall kron på antall kast.'], '47 ÷ 100 = 0,47 = 47 %.', '%'),
      v('Hvorfor er det lurt å simulere mange ganger?', ['Resultatet nærmer seg sannsynligheten', 'Det blir mer tilfeldig', 'Det går fortere', 'Det endrer sannsynligheten'], 0, ['Tenk på 10 kast mot 10000 kast.'], 'Med mange forsøk jevner det tilfeldige seg ut.'),
      t('<code>for i in range(10):</code> kaster en terning i hver runde. Hvor mange kast blir det?', 10, ['Hvor mange runder gir range(10)?'], '10 runder, så 10 kast.')
    ],
    'Her regner du forventninger og vurderer om resultater er normale.',
    [
      t('Du kaster en terning 1200 ganger. Omtrent hvor mange seksere forventer du?', 200, ['1/6 av 1200.'], '1200 ÷ 6 = 200.'),
      t('To terninger kastes 360 ganger. Sannsynligheten for sum 7 er 1/6. Omtrent hvor mange kast gir sum 7?', 60, ['1/6 av 360.'], '360 ÷ 6 = 60.'),
      v('Du får 52 kron på 100 kast. Er mynten urettferdig?', ['Nei, det er normal variasjon', 'Ja, helt sikkert', 'Ja, mynten er tung', 'Det kan ikke være 52'], 0, ['Forventet er 50. Hvor langt unna er 52?'], 'Små avvik er normale i tilfeldige forsøk.')
    ]);
})();
