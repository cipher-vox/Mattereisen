/* Forklaringsseksjoner 10. trinn, del 1: algebra, kvadratsetninger, ligningssett, stigningstall, funksjonstyper */
(function () {
  const M = window.MATTE; const H = M.H; const sv = H.sv;
  const { P, C, E, EK, W, TAB, K, FORK, FK } = H;
  const NEG = '#1d4ed8', POS = '#c2410c', NUL = '#15803d', INK = '#14213d', TEAL = '#0e8a96', PLUM = '#6d3fc9', ORANGE = '#e8964a';

  /* ---------- Algebra ---------- */
  FK('10/algebra', [
    [0, FORK('Algebra: å regne med bokstaver', '📖', [
      P('<strong>Algebra</strong> er matte med bokstaver. En bokstav (variabel) står for et tall, og et <strong>algebrauttrykk</strong> er en regneoppskrift med bokstaver og tall. Fordelen er at ett uttrykk dekker <em>alle</em> tall på en gang.'),
      TAB(['Situasjon', 'Uttrykk', 'Hva betyr bokstaven?'], [['Taxi: 50 kr + 15 kr per km', '50 + 15x', 'x er antall km'], ['Omkretsen til et rektangel', '2a + 2b', 'a og b er sidene'], ['Et partall', '2n', 'n er et helt tall'], ['Et oddetall', '2n + 1', 'n er et helt tall']]),
      C('regel', 'Slik leser du uttrykk', ['3x betyr 3 · x.', 'x² betyr x · x.', 'a(b + c) betyr a · (b + c).', 'Et tall foran en bokstav kalles <strong>koeffisient</strong>: i 5x er koeffisienten 5.']),
      EK('Sett inn i et uttrykk', 'Finn verdien av 2a² − 3b når a = 3 og b = 4.', ['Sett inn: 2 · 3² − 3 · 4.', 'Potens først: 3² = 9, så 2 · 9 − 12.', 'Gange: 18 − 12.', 'Svar: 6.']),
      EK('Lag formel fra tekst', 'En ballong stiger 2 meter per sekund og starter på 5 meters høyde. Lag et uttrykk for høyden etter t sekunder.', ['Start: 5 m.', 'Hvert sekund legger til 2 m, så t sekunder gir 2t.', 'Uttrykk: høyde = 5 + 2t.', 'Test t = 10: 5 + 20 = 25 m.']),
      C('virkelighet', 'Hvorfor algebra?', 'Hver gang noe i et regneark, en app eller et dataprogram regnes ut fra variable tall, er det algebra. Algebra er språket som brukes i fysikk, økonomi og koding.')
    ])],
    [2, FORK('Parenteser, forenkling og faktorisering', '🧩', [
      P('Når du <strong>ganger inn i en parentes</strong>, ganger du tallet utenfor med <em>alle</em> leddene inni: a(b + c) = ab + ac. Å <strong>faktorisere</strong> er det motsatte: du finner en felles faktor og trekker den ut foran en parentes.'),
      W('arealmodell', { type: 'dist', a: 3, b: 4, c: 2, tittel: 'Arealmodell: 3(x + y) = 3x + 3y, vist med tall' }),
      EK('Gange inn i parentes', 'Regn ut 3(2x + 5).', ['Gang 3 med hvert ledd: 3 · 2x = 6x.', '3 · 5 = 15.', 'Svar: 6x + 15.']),
      EK('Parentes med minustegn', 'Regn ut 4x − (x − 3).', ['Minustegnet foran parentesen snur fortegnene inni: −(x − 3) = −x + 3.', 'Nå: 4x − x + 3.', 'Samle: 3x + 3.', 'Svar: 3x + 3.']),
      EK('Faktorisere', 'Faktoriser 6x + 12.', ['Finn største felles faktor. 6 går opp i både 6 og 12.', 'Sett 6 utenfor: 6(x + 2).', 'Sjekk: 6 · x + 6 · 2 = 6x + 12 ✓.', 'Svar: 6(x + 2).']),
      C('husk', 'Vanlig feil', 'Mange glemmer å gange med <em>alle</em> leddene. 2(x + 3) er 2x + 6, ikke 2x + 3.')
    ])],
    [5, FORK('Å bevise at noe alltid stemmer', '🔬', [
      P('At noe stemmer for noen eksempler, betyr ikke at det stemmer <em>alltid</em>. Et <strong>bevis</strong> viser at det stemmer for alle tall. Det gjør vi med algebra, ved å bruke bokstaver i stedet for bestemte tall.'),
      C('regel', 'Nyttige byggeklosser', ['Partall: <strong>2n</strong>', 'Oddetall: <strong>2n + 1</strong>', 'To tall etter hverandre: <strong>n og n + 1</strong>', 'Tre tall etter hverandre: <strong>n, n + 1, n + 2</strong>']),
      EK('Bevis: summen av to oddetall er et partall', 'Vis at summen av to oddetall alltid er et partall.', ['Kall to oddetall 2n + 1 og 2m + 1 (n og m er hele tall).', 'Summen: (2n + 1) + (2m + 1) = 2n + 2m + 2.', 'Sett 2 utenfor: 2(n + m + 1).', 'Det er 2 ganger et helt tall, altså et partall. Dette gjelder uansett n og m, så påstanden er bevist.']),
      EK('Bevis: summen av tre tall etter hverandre er delelig med 3', 'Vis at summen av tre tall etter hverandre alltid kan deles på 3.', ['Kall tallene n, n + 1 og n + 2.', 'Summen: n + (n + 1) + (n + 2) = 3n + 3.', 'Faktoriser: 3(n + 1).', 'Dette er 3 ganger et helt tall, så det er delelig med 3.']),
      C('virkelighet', 'Hvorfor er dette viktig?', 'I matte (og dataprogrammer!) må vi være sikre. Å teste noen få tilfeller er ikke nok. Bevis gir sikkerhet, og algebra er verktøyet.')
    ])]
  ]);

  /* ---------- Kvadratsetninger ---------- */
  FK('10/kvadratsetninger', [
    [0, FORK('Første kvadratsetning: (a + b)²', '📖', [
      P('Hva er (a + b)²? Mange tror det er a² + b², men det er <strong>feil</strong>. (a + b)² betyr (a + b) · (a + b). Tenk på et <strong>kvadrat med side a + b</strong>. Arealet kan deles inn i fire biter:'),
      H.FIG(
        sv.r(40, 20, 140, 140, '#dff4f6', TEAL, 2) + sv.r(180, 20, 70, 140, '#fff1e3', ORANGE, 2) + sv.r(40, 160, 140, 70, '#fff1e3', ORANGE, 2) + sv.r(180, 160, 70, 70, '#eee6fb', PLUM, 2) +
        sv.t(110, 98, 'a · a = a²', { s: 17, f: TEAL }) + sv.t(215, 98, 'a · b', { s: 15, f: POS }) + sv.t(110, 200, 'a · b', { s: 15, f: POS }) + sv.t(215, 200, 'b²', { s: 17, f: PLUM }) +
        sv.t(110, 14, 'a', { s: 15 }) + sv.t(215, 14, 'b', { s: 15 }) + sv.t(28, 98, 'a', { s: 15 }) + sv.t(28, 200, 'b', { s: 15 }),
        300, 245, 'Kvadratet med side (a + b) består av a², to ganger a·b og b².'),
      C('regel', 'Første kvadratsetning', '<strong>(a + b)² = a² + 2ab + b²</strong>. Det midterste leddet (2ab) er det mange glemmer.'),
      EK('Utvid (x + 3)²', 'Regn ut (x + 3)².', ['Her er a = x og b = 3.', 'a² = x², 2ab = 2 · x · 3 = 6x, b² = 9.', 'Svar: x² + 6x + 9.']),
      EK('Hoderegning med kvadratsetning', 'Regn ut 52² uten kalkulator.', ['Skriv 52 = 50 + 2.', '(50 + 2)² = 50² + 2 · 50 · 2 + 2² = 2500 + 200 + 4.', 'Svar: 2704.']),
      C('virkelighet', 'Hvor bruker vi det?', 'Når du regner på hvor mye areal en hage vokser med hvis sidene økes litt, og i fysikk og økonomi, der formler ofte inneholder kvadrater.'),
      C('tips', 'Prøv spillet', 'Feiljegeren i «Spill for å lære» lar deg avsløre feil i kvadratsetninger.')
    ])],
    [2, FORK('Andre og tredje kvadratsetning', '🟪', [
      P('<strong>Andre kvadratsetning</strong> er nesten lik den første, men med minus. Da blir det midterste leddet negativt: (a − b)² = a² − 2ab + b². Siste ledd b² er fortsatt <em>positivt</em>.'),
      C('regel', 'Andre kvadratsetning', '<strong>(a − b)² = a² − 2ab + b²</strong>'),
      EK('Utvid (x − 4)²', 'Regn ut (x − 4)².', ['a = x, b = 4.', 'a² = x², 2ab = 2 · x · 4 = 8x (med minus), b² = 16.', 'Svar: x² − 8x + 16.']),
      P('<strong>Tredje kvadratsetning</strong> kalles også <em>konjugatsetningen</em>. Her ganger du sum og differanse av de samme to tallene, og de midterste leddene <strong>kanselleres</strong> (faller bort).'),
      C('regel', 'Tredje kvadratsetning', '<strong>(a + b)(a − b) = a² − b²</strong>. Merk: ingen midtledd!'),
      W('arealmodell', { type: 'konj', a: 7, b: 3, tittel: 'Konjugatsetningen vist som areal' }),
      EK('Utvid (x + 5)(x − 5)', 'Regn ut (x + 5)(x − 5).', ['a = x, b = 5.', 'a² − b² = x² − 25.', 'Svar: x² − 25. Midtleddene 5x og −5x opphever hverandre.']),
      EK('Hoderegning', 'Regn ut 51 · 49 uten kalkulator.', ['51 = 50 + 1 og 49 = 50 − 1.', '(50 + 1)(50 − 1) = 50² − 1² = 2500 − 1.', 'Svar: 2499.'])
    ])],
    [4, FORK('Bruk kvadratsetningene: gjenkjenn og faktoriser', '🔄', [
      P('Kvadratsetningene kan også leses baklengs. Ser du et uttrykk som <strong>x² + 10x + 25</strong>, kan du kjenne igjen mønsteret fra første kvadratsetning og skrive det kort som (x + 5)². Det kalles å <strong>faktorisere</strong>.'),
      TAB(['Uttrykket ser slik ut', 'Kan skrives som'], [['a² + 2ab + b²', '(a + b)²'], ['a² − 2ab + b²', '(a − b)²'], ['a² − b²', '(a + b)(a − b)']]),
      EK('Faktoriser x² + 10x + 25', 'Faktoriser x² + 10x + 25.', ['Første ledd x² = x · x. Siste ledd 25 = 5 · 5.', 'Midtleddet 10x = 2 · x · 5. Det passer med 2ab!', 'Svar: (x + 5)².']),
      EK('Faktoriser 9x² − 16', 'Faktoriser 9x² − 16.', ['Dette er en differanse av kvadrater: 9x² = (3x)² og 16 = 4².', 'Bruk a² − b² = (a + b)(a − b) med a = 3x og b = 4.', 'Svar: (3x + 4)(3x − 4).']),
      C('husk', 'Sjekk alltid', 'Etter at du har faktorisert, kan du gange ut igjen for å sjekke at du får det du startet med.')
    ])]
  ]);

  /* ---------- Ligningssett ---------- */
  FK('10/ligningssett', [
    [0, FORK('To ukjente og to ligninger', '📖', [
      P('Noen problemer har <strong>to ukjente</strong>, for eksempel prisen på en kake og prisen på en kaffe. Én ligning er ikke nok. Men har du <strong>to ligninger</strong> som begge må stemme, kan du finne begge. Det kalles et <strong>ligningssett</strong>.'),
      TAB(['Fortelling', 'Ligninger'], [['Tre kaker og en kaffe koster 50 kr.', '3k + c = 50'], ['En kake og to kaffe koster 35 kr.', 'k + 2c = 35']]),
      P('Å løse ligningssettet betyr å finne det <strong>ene</strong> paret (k, c) som passer i begge. Her er k = 13 og c = 11. Sjekk: 3 · 13 + 11 = 50 ✓, og 13 + 22 = 35 ✓.'),
      P('<strong>Grafisk løsning:</strong> Hver ligning er en rett linje. Det punktet der linjene <strong>krysser hverandre</strong>, passer i begge. Det er løsningen.'),
      W('graf', { params: { b: { min: 0, max: 8, v: 5, steg: 1, navn: 'b (startverdi, linje 2)' } }, funksjoner: [{ f: 'x+1', navn: 'y = x + 1', farge: TEAL }, { f: '-x+b', navn: 'y = −x + b', farge: ORANGE }], xmin: -1, xmax: 8, ymin: -1, ymax: 9, skjaering: true, tittel: 'Der linjene krysser, er løsningen' }),
      EK('Les av løsningen', 'Linjene y = x + 1 og y = −x + 5 krysser hverandre. Hvor?', ['Sett y-ene like: x + 1 = −x + 5.', '2x = 4, så x = 2.', 'y = 2 + 1 = 3.', 'Svar: løsningen er (2, 3). Sjekk i begge: 2 + 1 = 3 ✓ og −2 + 5 = 3 ✓.']),
      C('virkelighet', 'Hvor bruker vi det?', 'Sammenlikne to abonnementer og finne når de koster likt, løse blandingsproblemer (kaffe og kake), og i fysikk og økonomi der to ting påvirker hverandre.'),
      C('tips', 'Prøv spillet', 'Prisdetektiven i «Spill for å lære» er laget for å øve på ligningssett.')
    ])],
    [2, FORK('Innsettingsmetoden og addisjonsmetoden', '🧪', [
      P('Det finnes to vanlige regnemetoder. Begge gjør om to ligninger med to ukjente til <strong>én ligning med én ukjent</strong>, som du allerede kan løse.'),
      C('regel', 'Innsettingsmetoden', ['1. Løs den ene ligningen for én av bokstavene (for eksempel y = …).', '2. Sett uttrykket inn i den andre ligningen.', '3. Løs ligningen du får, og finn så den andre bokstaven.']),
      EK('Innsetting', 'Løs: y = 2x og x + y = 9.', ['Den første ligningen gir y = 2x. Sett inn i den andre: x + 2x = 9.', '3x = 9, så x = 3.', 'y = 2 · 3 = 6.', 'Svar: x = 3 og y = 6. Sjekk: 3 + 6 = 9 ✓.']),
      C('regel', 'Addisjonsmetoden', ['1. Skriv ligningene under hverandre.', '2. Legg dem sammen (eller trekk dem fra hverandre) slik at én bokstav forsvinner.', '3. Løs for den som er igjen, og finn den andre.']),
      EK('Addisjon', 'Løs: x + y = 10 og x − y = 2.', ['Legg ligningene sammen: (x + y) + (x − y) = 10 + 2.', 'y-ene forsvinner: 2x = 12, så x = 6.', 'Sett inn i x + y = 10: 6 + y = 10, så y = 4.', 'Svar: x = 6 og y = 4.']),
      C('tips', 'Hvilken skal jeg velge?', 'Er en bokstav allerede alene, bruk innsetting. Har ligningene like (eller motsatte) ledd, bruk addisjon. Begge gir samme svar.')
    ])]
  ]);

  /* ---------- Stigningstall ---------- */
  FK('10/stigningstall', [
    [0, FORK('Endring per enhet og stigningstall', '📖', [
      P('<strong>Stigningstall</strong> forteller hvor mye en størrelse <strong>endrer seg for hver enhet</strong> den andre øker. Det er hvor bratt grafen er. En vei som stiger 10 meter på 100 meter, har stigning 10/100 = 0,1.'),
      H.FIG(
        sv.l(30, 160, 300, 160, '#94a3b8', 2) + sv.l(30, 160, 30, 30, '#94a3b8', 2) + sv.l(30, 160, 270, 40, POS, 5) + sv.l(150, 160, 270, 160, NUL, 3, '4 4') + sv.l(270, 160, 270, 40, NEG, 3, '4 4') +
        sv.t(210, 180, 'Δx = endring i x', { s: 13, f: NUL }) + sv.t(284, 105, 'Δy = endring i y', { s: 13, f: NEG, a: 'start' }),
        420, 195, 'Stigningstallet er endringen i y delt på endringen i x: a = Δy ÷ Δx.'),
      C('regel', 'Formelen', '<strong>a = endring i y ÷ endring i x</strong>. Positivt a: grafen stiger. Negativt a: grafen synker. a = 0: grafen er vannrett.'),
      W('graf', { params: { a: { min: -4, max: 4, v: 2, steg: 0.5, navn: 'a (stigningstall)' } }, funksjoner: [{ f: 'a*x', pen: 'lin', navn: 'y = ax', farge: TEAL }], xmin: -5, xmax: 5, ymin: -10, ymax: 10, tabell: true, tittel: 'Dra i a: se hvordan bratthet og retning endres' }),
      EK('Stigningstall fra to punkter', 'Grafen går gjennom (1, 3) og (3, 7). Finn stigningstallet.', ['Endring i y: 7 − 3 = 4.', 'Endring i x: 3 − 1 = 2.', 'a = 4 ÷ 2 = 2.', 'Svar: stigningstallet er 2. For hver gang x øker med 1, øker y med 2.']),
      EK('Stigningstall i hverdagen', 'En mobilregning er 250 kr etter 1 GB og 400 kr etter 4 GB. Hva koster hver ekstra GB?', ['Endring i pris: 400 − 250 = 150 kr.', 'Endring i GB: 4 − 1 = 3.', 'a = 150 ÷ 3 = 50.', 'Svar: 50 kr per GB. Det er stigningstallet.']),
      C('virkelighet', 'Hvor bruker vi det?', 'Fart er stigningstallet i en strekning-tid-graf. Hellingsgrad på veier og tak. Rente og prisutvikling. Alt som endrer seg jevnt, har et stigningstall.')
    ])],
    [3, FORK('Formelen y = ax + b', '🧮', [
      P('Alle rette linjer kan skrives som <strong>y = ax + b</strong>. Tallet <strong>a</strong> er stigningstallet, og <strong>b</strong> er <strong>startverdien</strong>: verdien av y når x er 0, der linja krysser y-aksen.'),
      W('graf', { params: { a: { min: -3, max: 3, v: 2, steg: 1, navn: 'a (stigning)' }, b: { min: -5, max: 5, v: 1, steg: 1, navn: 'b (startverdi)' } }, funksjoner: [{ f: 'a*x+b', pen: 'lin', navn: 'y = ax + b', farge: PLUM }], xmin: -5, xmax: 5, ymin: -10, ymax: 10, tabell: true, tittel: 'Dra i a og b' }),
      C('regel', 'Slik finner du formelen', ['1. Regn ut stigningstallet a fra to punkter.', '2. Sett inn ett punkt i y = ax + b og løs for b.', '3. Skriv formelen og sjekk med det andre punktet.']),
      EK('Finn formelen', 'Linja går gjennom (1, 3) og (3, 7). Finn formelen.', ['Stigningstallet: a = (7 − 3) ÷ (3 − 1) = 2.', 'Sett inn (1, 3): 3 = 2 · 1 + b, så b = 1.', 'Formel: y = 2x + 1.', 'Sjekk med (3, 7): 2 · 3 + 1 = 7 ✓.']),
      EK('Fra tekst til formel', 'Et lys er 20 cm høyt. Det brenner ned 4 cm per time. Lag formelen for høyden etter x timer.', ['Startverdi b = 20.', 'Det minker 4 per time, så stigningstallet er a = −4.', 'Formel: y = −4x + 20.', 'Når er lyset brent ned? −4x + 20 = 0 gir x = 5 timer.']),
      C('tips', 'Prøv spillet', 'Myntjakten i «Spill for å lære» lar deg dra i a og b for å treffe myntene.')
    ])]
  ]);

  /* ---------- Funksjonstyper ---------- */
  FK('10/funksjonstyper', [
    [0, FORK('Fire familier av funksjoner', '📖', [
      P('Det finnes mange funksjoner, men de fleste du møter hører til én av fire <strong>familier</strong>. Hver familie har sin egen form og sin egen type vekst.'),
      K([{ ikon: '📏', tittel: 'Lineær: y = ax + b', tekst: 'Rett linje. Endrer seg like mye for hver x. Eksempel: taxipris.' }, { ikon: '🥏', tittel: 'Andregrad: y = ax² + bx + c', tekst: 'Parabel (bue). Eksempel: banen til en ball.' }, { ikon: '🚀', tittel: 'Eksponentiell: y = a · bˣ', tekst: 'Vokser eller minker med samme prosent. Eksempel: bakterier, rente.' }, { ikon: '🔀', tittel: 'Brøk: y = k/x', tekst: 'Når den ene dobles, halveres den andre. Eksempel: tid = strekning/fart.' }]),
      W('graf', { params: { a: { min: -3, max: 3, v: 1, steg: 0.5, navn: 'a' }, c: { min: -5, max: 5, v: -4, steg: 1, navn: 'c' } }, funksjoner: [{ f: 'a*x^2+c', pen: 'kv', navn: 'y = ax² + c', farge: PLUM }], xmin: -5, xmax: 5, ymin: -10, ymax: 10, tabell: true, tittel: 'Andregradsfunksjon: dra i a og c' }),
      TAB(['Type', 'Formel', 'Grafen ser ut som'], [['Lineær', 'y = 2x + 1', 'rett linje'], ['Andregrad', 'y = x² − 4', 'bue (parabel)'], ['Eksponentiell', 'y = 3 · 2ˣ', 'stiger raskere og raskere'], ['Brøk', 'y = 12/x', 'faller i en krok']]),
      EK('Regn ut verdier', 'Regn ut y for x = 3 i de tre funksjonene y = 2x + 1, y = x² − 4 og y = 2ˣ.', ['y = 2 · 3 + 1 = 7.', 'y = 3² − 4 = 9 − 4 = 5.', 'y = 2³ = 8.', 'Svar: 7, 5 og 8.']),
      C('virkelighet', 'Hvor bruker vi det?', 'Taxipris (lineær), kastebane og bremselengde (andregrad), bankrente og virusspredning (eksponentiell), reisetid ved ulik fart (brøk).')
    ])],
    [5, FORK('Slik gjenkjenner du funksjonstypen fra en tabell', '🔎', [
      P('Har du en tabell med x- og y-verdier, kan du finne funksjonstypen ved å se på hvordan y endrer seg når x øker med 1.'),
      TAB(['Du ser', 'Typen er'], [['y øker med <strong>like mye</strong> hver gang (forskjellen er lik)', 'Lineær'], ['y <strong>ganges med samme tall</strong> hver gang (forholdet er likt)', 'Eksponentiell'], ['Forskjellene selv endrer seg jevnt', 'Andregrad'], ['x · y er alltid like stort', 'Brøk']]),
      EK('Lineær eller eksponentiell?', 'Tabellene: A: y = 3, 6, 9, 12. B: y = 3, 6, 12, 24. Hva slags funksjoner?', ['A: forskjellene er 3, 3, 3. Like forskjeller, så lineær.', 'B: forholdene er 6/3 = 2, 12/6 = 2, 24/12 = 2. Samme faktor, så eksponentiell.', 'Svar: A er lineær (y = 3x), B er eksponentiell (y = 3 · 2^(x−1)).']),
      EK('Andregrad fra tabell', 'y = 1, 4, 9, 16, 25 for x = 1, 2, 3, 4, 5. Hva slags funksjon?', ['Forskjellene er 3, 5, 7, 9. Ikke like.', 'Men forskjellene øker med 2 hver gang (3, 5, 7, 9), så det er jevn endring i endringen.', 'Dette er kvadrattallene: y = x².', 'Svar: andregradsfunksjon, y = x².']),
      C('tips', 'Prøv spillet', 'Myntjakten lar deg også tilpasse andregrads- og eksponentialfunksjoner til punkter.')
    ])]
  ]);
})();
