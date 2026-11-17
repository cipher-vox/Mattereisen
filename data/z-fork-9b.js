/* Forklaringsseksjoner 9. trinn, del 2: overflate/volum, statistikk i media, sentralmål, sannsynlighet, simulering */
(function () {
  const M = window.MATTE; const H = M.H; const sv = H.sv;
  const { P, C, E, EK, W, TAB, K, FORK, FK } = H;
  const NEG = '#1d4ed8', POS = '#c2410c', NUL = '#15803d', INK = '#14213d', TEAL = '#0e8a96', PLUM = '#6d3fc9', ORANGE = '#e8964a';

  /* ---------- Overflate og volum ---------- */
  FK('9/overflate-volum', [
    [0, FORK('Volum og overflate: hva er forskjellen?', '📖', [
      P('<strong>Volum</strong> forteller hvor mye en figur <em>rommer</em>: hvor mye vann du kan fylle i den. Det måles i <strong>kubikkenheter</strong> (cm³, m³) eller liter. <strong>Overflate</strong> forteller hvor stor <em>utsiden</em> er: hvor mye papir du trenger for å pakke den inn. Det måles i <strong>kvadratenheter</strong> (cm², m²).'),
      H.FIG(
        sv.p('M30 70 L110 70 L110 140 L30 140 Z', '#dff4f6', TEAL, 3) + sv.p('M30 70 L60 40 L140 40 L110 70 Z', '#c4e9ee', TEAL, 3) + sv.p('M110 70 L140 40 L140 110 L110 140 Z', '#a9dce3', TEAL, 3) + sv.t(80, 165, 'Volum = rom inni', { s: 14 }) +
        sv.p('M250 90 L330 90 L330 160 L250 160 Z M250 20 L330 20 L330 90 L250 90 Z M180 90 L250 90 L250 160 L180 160 Z M330 90 L400 90 L400 160 L330 160 Z M250 160 L330 160 L330 230 L250 230 Z', '#fff1e3', ORANGE, 2) + sv.t(290, 252, 'Overflate = alle sidene utbrettet', { s: 14 }),
        440, 262, 'Volum er rommet inni. Overflaten er summen av alle flatene, som når du folder ut en eske.'),
      TAB(['Figur', 'Volum', 'Overflate'], [['Kasse (l × b × h)', 'V = l · b · h', 'O = 2(l·b + l·h + b·h)'], ['Terning (s)', 'V = s³', 'O = 6s²'], ['Prisme', 'V = G · h (grunnflate · høyde)', 'O = alle flatene lagt sammen']]),
      W('volum', { type: 'prisme', tittel: 'Kasse: dra i lengde, bredde og høyde' }),
      EK('Volum og overflate av en kasse', 'En kasse er 4 cm lang, 3 cm bred og 5 cm høy. Finn volum og overflate.', ['Volum: 4 · 3 · 5 = 60 cm³.', 'Overflaten består av tre par flater: 4 · 3 = 12, 4 · 5 = 20, 3 · 5 = 15.', 'O = 2 · (12 + 20 + 15) = 2 · 47 = 94 cm².', 'Svar: volum 60 cm³, overflate 94 cm².']),
      C('husk', 'Enheter', '1 liter = 1 dm³ = 1000 cm³. En kube på 10 cm × 10 cm × 10 cm rommer nøyaktig 1 liter.')
    ])],
    [2, FORK('Sylinder, kjegle, pyramide og kule', '🥫', [
      P('En <strong>sylinder</strong> er som en stabel av like sirkler. Volumet er grunnflaten (en sirkel) ganget med høyden. Sirkelens areal er π · r², der r er radien og π ≈ 3,14.'),
      W('volum', { type: 'sylinder', tittel: 'Sylinder: dra i radius og høyde' }),
      EK('Volumet av en brusboks', 'En sylinder har radius 3 cm og høyde 10 cm. Finn volumet.', ['Grunnflaten: π · 3² = π · 9 ≈ 28,3 cm².', 'Volum = grunnflate · høyde = 28,3 · 10 ≈ 283 cm³.', 'Svar: omtrent 283 cm³ (0,28 liter).']),
      P('<strong>Kjegle og pyramide</strong> kommer til en spiss. De rommer akkurat <strong>en tredjedel</strong> av en sylinder eller et prisme med samme grunnflate og høyde.'),
      W('volum', { type: 'pyramide', tittel: 'Pyramide: volum = ⅓ · grunnflate · høyde' }),
      TAB(['Figur', 'Volum'], [['Sylinder', 'π · r² · h'], ['Kjegle', '⅓ · π · r² · h'], ['Pyramide', '⅓ · G · h'], ['Kule', '4/3 · π · r³']]),
      EK('Volumet av en pyramide', 'En pyramide har kvadratisk grunnflate 6 m × 6 m og høyde 5 m. Finn volumet.', ['Grunnflaten er 6 · 6 = 36 m².', 'Volum = ⅓ · 36 · 5 = 60 m³.', 'Svar: 60 m³.']),
      EK('Volumet av en kule', 'Finn volumet av en ball med radius 3 cm.', ['V = 4/3 · π · r³ = 4/3 · π · 27.', '4/3 · 27 = 36, så V = 36π.', '36 · 3,14 ≈ 113.', 'Svar: omtrent 113 cm³.']),
      C('virkelighet', 'Hvor bruker vi det?', 'Beregne hvor mye vann et basseng eller en tank rommer, hvor mye betong du trenger, hvor mye en isbaug rommer, og hvor mye aluminium som går med til en brusboks. Se spillet Brusboks-designeren.')
    ])]
  ]);

  /* ---------- Statistikk i media ---------- */
  FK('9/statistikk-media', [
    [0, FORK('Å lese tall og grafer kritisk', '📖', [
      P('Tall og grafer i nyheter og reklame kan gi et riktig bilde, men også lure oss. For å bli en kritisk leser må du spørre om tre ting hver gang du ser en tallpåstand:'),
      K([{ ikon: '👥', tittel: 'Hvem er spurt?', tekst: 'Et <strong>utvalg</strong> bør ligne hele gruppen. Hvis bare 10 venner er spurt, sier det lite om alle.' }, { ikon: '📊', tittel: 'Hvordan er grafen tegnet?', tekst: 'Starter y-aksen på 0? Hvis ikke, ser små forskjeller store ut.' }, { ikon: '🔢', tittel: 'Hva er tallet egentlig?', tekst: 'Snitt, median, prosent eller antall? De kan gi helt ulike bilder.' }]),
      W('mediegraf', { navn: ['Hotell A', 'Hotell B', 'Hotell C'], verdier: [92, 95, 100], start: 90, tittel: 'Samme tall, to ulike inntrykk: dra i startpunktet for aksen' }),
      C('regel', 'Triks du må kjenne igjen', ['<strong>Avkortet akse:</strong> y-aksen starter ikke på 0, så forskjellene virker større.', '<strong>Lite eller skjevt utvalg:</strong> de som svarer, er ikke typiske.', '<strong>Utelatte tall:</strong> «50 % mer» av hva? Fra 2 til 3 er også 50 %.']),
      EK('Vurder en påstand', '«Vår tannkrem er 20 % bedre!» Hva bør du spørre om?', ['Bedre enn hva? Hva sammenliknes den med?', 'Hvordan er «bedre» målt? Hvem har testet den?', 'Hvor mange ble spurt? Fem tannleger eller tusen?', 'Svar: Uten svar på dette sier tallet nesten ingenting.']),
      EK('Les en graf med avkortet akse', 'En graf viser at salget økte fra 98 til 102. Y-aksen starter på 96. Er økningen stor?', ['Økningen er 4 enheter, fra 98 til 102.', 'Regn prosent: 4 ÷ 98 ≈ 0,04 = 4 %.', 'Grafen ser dramatisk ut fordi aksen starter på 96, men økningen er liten.', 'Svar: bare 4 %. Grafen lurer.']),
      C('tips', 'Prøv spillet', 'Løgnjegeren i «Spill for å lære» lar deg avsløre grafer og påstander som lurer.')
    ])],
    [3, FORK('Snitt, median, prosent og sammenheng', '💬', [
      P('<strong>Snitt (gjennomsnitt)</strong> og <strong>median</strong> er to «typiske» verdier, men de kan være veldig ulike. Snittet påvirkes av enkeltverdier som er veldig store eller små. Medianen er verdien i midten, og påvirkes ikke.'),
      EK('Snitt og median for lønn', 'Fem ansatte tjener 400, 420, 430, 450 og 2000 (tusen kr). Finn snitt og median.', ['Snitt: (400 + 420 + 430 + 450 + 2000) ÷ 5 = 3700 ÷ 5 = 740.', 'Median: sorter (allerede sortert). Midterste verdi er 430.', 'Svar: snitt 740 000 kr, median 430 000 kr.', 'Snittet lyver litt: ingen av de fire første tjener i nærheten av 740.']),
      P('<strong>Prosent eller antall?</strong> «Ulykkene økte med 100 %!» høres dramatisk ut, men kan bety at det gikk fra 1 til 2. Spør alltid om det faktiske tallet i tillegg til prosenten.'),
      P('<strong>Sammenheng er ikke det samme som årsak.</strong> Is-salget og antall drukningsulykker øker samtidig om sommeren. Det betyr ikke at is gir drukning: det er varmen som er årsaken til begge.'),
      H.FIG(
        sv.r(20, 30, 130, 54, '#fff1e3', ORANGE, 10) + sv.t(85, 63, '☀️ Varmt vær', { s: 15 }) + sv.pil(150, 45, 200, 20, NUL) + sv.pil(150, 70, 200, 95, NUL) + sv.r(205, 0, 130, 40, '#dff4f6', TEAL, 10) + sv.t(270, 26, '🍦 Mer iskrem', { s: 14 }) + sv.r(205, 75, 130, 40, '#dbe6ff', NEG, 10) + sv.t(270, 101, '🏊 Mer bading', { s: 14 }) + sv.t(270, 134, 'Is og bading henger sammen, men en tredje ting forårsaker begge.', { s: 11, f: '#52617a', w: 600 }),
        360, 145, 'To ting som skjer samtidig, trenger ikke å påvirke hverandre. En tredje faktor kan være årsaken.'),
      C('virkelighet', 'Hvorfor er dette viktig?', 'Når du ser overskrifter som «Studie viser at…», må du kunne spørre om utvalget var stort nok, hva som er målt, og om det virkelig er årsak eller bare sammenheng.')
    ])]
  ]);

  /* ---------- Sentralmål og spredning ---------- */
  FK('9/sentralmal-spredning', [
    [0, FORK('Sentralmål: gjennomsnitt, median og typetall', '📖', [
      P('Et datasett kan ha mange tall. Et <strong>sentralmål</strong> er ett tall som beskriver hva som er «typisk». Det finnes tre vanlige:'),
      K([{ ikon: '➗', tittel: 'Gjennomsnitt (snitt)', tekst: 'Legg sammen alle tallene og del på hvor mange det er.' }, { ikon: '🎯', tittel: 'Median', tekst: 'Det midterste tallet når tallene er sortert fra minst til størst. Er det to i midten, finner du snittet av dem.' }, { ikon: '🏆', tittel: 'Typetall', tekst: 'Tallet som forekommer flest ganger.' }]),
      W('sentralmal', { data: [2, 3, 3, 4, 8], tittel: 'Legg til og fjern prikker, og se hvordan sentralmålene endrer seg' }),
      EK('Regn ut alle tre', 'Tallene er 2, 3, 3, 4 og 8. Finn gjennomsnitt, median og typetall.', ['Gjennomsnitt: (2 + 3 + 3 + 4 + 8) ÷ 5 = 20 ÷ 5 = 4.', 'Median: tallene er sortert. Det midterste (tredje) er 3.', 'Typetall: 3 forekommer to ganger, flest.', 'Svar: snitt 4, median 3, typetall 3.']),
      EK('Median med partall antall', 'Tallene er 1, 4, 6 og 9. Finn medianen.', ['Fire tall, så to står i midten: 4 og 6.', 'Medianen er snittet av dem: (4 + 6) ÷ 2 = 5.', 'Svar: median 5.']),
      C('regel', 'Når bruker du hva?', ['<strong>Snitt:</strong> når tallene ligger jevnt og vi vil ha totalen delt rettferdig.', '<strong>Median:</strong> når noen verdier er veldig store eller små (som lønninger).', '<strong>Typetall:</strong> når du vil vite hva som er vanligst (skostørrelse, mest solgte vare).'])
    ])],
    [4, FORK('Spredning og kvartiler', '📏', [
      P('To datasett kan ha <strong>samme snitt</strong> og likevel være helt ulike. 5, 5, 5, 5, 5 og 1, 3, 5, 7, 9 har begge snitt 5. I det første er alle like, i det andre varierer de mye. <strong>Spredning</strong> sier hvor mye tallene varierer.'),
      C('regel', 'Variasjonsbredde og kvartiler', ['<strong>Variasjonsbredde</strong> = største verdi − minste verdi.', '<strong>Kvartiler</strong> deler de sorterte tallene i fire like store deler. Q1 er medianen i nedre halvdel, Q2 er medianen, Q3 er medianen i øvre halvdel.', '<strong>Kvartilbredde</strong> = Q3 − Q1. Den viser spredningen for de midterste 50 %.']),
      H.FIG(
        sv.l(30, 70, 470, 70, INK, 2) + sv.r(130, 40, 230, 60, '#fff1e3', ORANGE, 4) + sv.l(250, 40, 250, 100, POS, 4) + sv.l(30, 55, 30, 85, INK, 3) + sv.l(470, 55, 470, 85, INK, 3) + sv.l(30, 70, 130, 70, INK, 2) + sv.l(360, 70, 470, 70, INK, 2) +
        sv.t(30, 115, 'minst 1', { s: 13 }) + sv.t(130, 115, 'Q1 = 3', { s: 13 }) + sv.t(250, 115, 'median 7', { s: 13, f: POS }) + sv.t(360, 115, 'Q3 = 11', { s: 13 }) + sv.t(470, 115, 'størst 13', { s: 13 }),
        500, 130, 'Et boksplott viser minste verdi, Q1, median, Q3 og største verdi. Boksen er kvartilbredden.'),
      EK('Kvartiler', 'Tallene er 1, 3, 5, 7, 9, 11, 13. Finn median, Q1, Q3 og kvartilbredde.', ['Sju tall. Median er det midterste: 7.', 'Nedre halvdel (1, 3, 5): median Q1 = 3. Øvre halvdel (9, 11, 13): Q3 = 11.', 'Kvartilbredde = 11 − 3 = 8.', 'Variasjonsbredde = 13 − 1 = 12.']),
      C('virkelighet', 'Hvor bruker vi det?', 'Når du sammenlikner to klasser eller to fotballag er det ikke nok å se på snittet. To lag kan ha samme snittscore, men det ene er veldig jevnt, mens det andre svinger fra seier til tap.'),
      C('tips', 'Prøv spillet', 'Data-smeden i «Spill for å lære» utfordrer deg til å lage et datasett med gitt snitt, median og variasjonsbredde.')
    ])]
  ]);

  /* ---------- Sannsynlighet ---------- */
  FK('9/sannsynlighet', [
    [0, FORK('Hva er sannsynlighet?', '📖', [
      P('<strong>Sannsynlighet</strong> forteller hvor sannsynlig det er at noe skjer. Vi måler den som et tall fra <strong>0</strong> (umulig) til <strong>1</strong> (helt sikkert). Vi kan skrive den som brøk, desimaltall eller prosent.'),
      H.FIG(
        sv.l(30, 60, 470, 60, INK, 4) + sv.c(30, 60, 8, INK) + sv.c(250, 60, 8, INK) + sv.c(470, 60, 8, INK) +
        sv.t(30, 90, '0', { s: 18 }) + sv.t(30, 110, 'umulig', { s: 13, f: '#52617a', w: 600 }) + sv.t(250, 90, '0,5', { s: 18 }) + sv.t(250, 110, '50-50', { s: 13, f: '#52617a', w: 600 }) + sv.t(470, 90, '1', { s: 18 }) + sv.t(470, 110, 'helt sikkert', { s: 13, f: '#52617a', w: 600 }) +
        sv.t(140, 40, '🌧️ lite sannsynlig', { s: 13, f: NEG }) + sv.t(360, 40, 'svært sannsynlig ☀️', { s: 13, f: POS }),
        500, 125, 'Sannsynlighet er et tall mellom 0 og 1. Jo nærmere 1, jo mer sannsynlig.'),
      C('regel', 'Formelen', '<strong>P(hendelse) = antall gunstige utfall ÷ antall mulige utfall</strong>, når alle utfall er like sannsynlige. «Gunstige» er de som passer med det vi spør om.'),
      EK('Terningkast', 'Du kaster en vanlig terning. Hva er sannsynligheten for å få et partall?', ['Mulige utfall: 1, 2, 3, 4, 5, 6. Det er 6.', 'Gunstige utfall (partall): 2, 4, 6. Det er 3.', 'P = 3 ÷ 6 = 1/2 = 0,5 = 50 %.', 'Svar: 50 %.']),
      EK('Trekke en kule', 'I en pose er det 3 røde og 5 blå kuler. Du trekker én. Hva er sannsynligheten for rød?', ['Mulige: 3 + 5 = 8 kuler.', 'Gunstige: 3 røde.', 'P(rød) = 3/8 = 0,375 = 37,5 %.', 'Svar: 3/8 (37,5 %).']),
      C('husk', 'Det motsatte', 'P(ikke A) = 1 − P(A). Sannsynligheten for å <em>ikke</em> få rød er 1 − 3/8 = 5/8. Det er ofte en snarvei: «minst én» er lettest å regne som 1 minus «ingen».')
    ])],
    [3, FORK('Flere forsøk: valgtre og regelen om og', '🌳', [
      P('Når du gjør flere ting etter hverandre, for eksempel kaster to mynter, må du telle alle mulige utfall. Et <strong>valgtre</strong> hjelper deg å holde oversikt. Hver gren er et utfall, og du <strong>ganger sannsynlighetene langs grenene</strong>.'),
      H.FIG(
        sv.t(20, 100, 'Start', { s: 14, a: 'start' }) + sv.l(70, 98, 150, 50, INK, 2) + sv.l(70, 98, 150, 150, INK, 2) +
        sv.t(170, 56, 'K', { s: 17, f: POS }) + sv.t(170, 156, 'M', { s: 17, f: NEG }) + sv.l(190, 52, 270, 24, INK, 2) + sv.l(190, 52, 270, 78, INK, 2) + sv.l(190, 152, 270, 124, INK, 2) + sv.l(190, 152, 270, 178, INK, 2) +
        sv.t(290, 30, 'KK', { s: 16, a: 'start' }) + sv.t(290, 84, 'KM', { s: 16, a: 'start' }) + sv.t(290, 130, 'MK', { s: 16, a: 'start' }) + sv.t(290, 184, 'MM', { s: 16, a: 'start' }) +
        sv.t(340, 30, '1/2 · 1/2 = 1/4', { s: 13, a: 'start', f: '#52617a' }) + sv.t(340, 84, '1/4', { s: 13, a: 'start', f: '#52617a' }) + sv.t(340, 130, '1/4', { s: 13, a: 'start', f: '#52617a' }) + sv.t(340, 184, '1/4', { s: 13, a: 'start', f: '#52617a' }),
        470, 200, 'Valgtre for to myntkast. Det er fire like sannsynlige utfall, hvert med sannsynlighet 1/4.'),
      EK('To mynter', 'Du kaster to mynter. Hva er sannsynligheten for to kron?', ['Første kast: kron har sannsynlighet 1/2.', 'Andre kast: kron har sannsynlighet 1/2.', 'Gang langs grenen: 1/2 · 1/2 = 1/4.', 'Svar: 1/4 = 25 %.']),
      P('<strong>Med og uten tilbakelegging:</strong> Trekker du fra en pose og legger tilbake, er sannsynlighetene like hver gang. Legger du ikke tilbake, endres posen for neste trekning.'),
      EK('Uten tilbakelegging', 'I en pose er det 5 røde og 3 blå kuler. Du trekker to uten å legge tilbake. Hva er sannsynligheten for to røde?', ['Første rød: 5/8.', 'Nå er det 4 røde og 7 kuler igjen. Andre rød: 4/7.', 'Gang: 5/8 · 4/7 = 20/56 = 5/14.', 'Svar: 5/14 ≈ 0,36 = 36 %.']),
      C('virkelighet', 'Hvor bruker vi det?', 'Spill og lotterier, vær (30 % regn), forsikringsselskaper (hvor sannsynlig er skade?) og medisin (hvor sannsynlig er det at en test er riktig?).'),
      C('tips', 'Prøv spillet', 'Sjansejegeren i «Spill for å lære» lar deg gjette hvilken hendelse som er mest sannsynlig, og sjekke med simulering.')
    ])]
  ]);

  /* ---------- Simulering ---------- */
  FK('9/simulering', [
    [0, FORK('Hva er simulering, og hvorfor gjør vi det?', '📖', [
      P('Noen ganger er det vanskelig å regne ut en sannsynlighet. Da kan vi <strong>simulere</strong>: vi lar datamaskinen gjøre forsøket mange tusen ganger og teller hva som skjer. Resultatet kalles <strong>relativ frekvens</strong>: antall ganger noe skjedde ÷ antall forsøk.'),
      W('simulering', { type: 'terning', tittel: 'Kast terning mange ganger: se hvordan fordelingen jevner seg ut' }),
      C('regel', 'Loven om store tall', 'Jo flere forsøk du gjør, jo nærmere kommer den relative frekvensen den teoretiske sannsynligheten. Etter 6 kast kan det se skjevt ut, men etter 6000 kast er hver side nær 1/6.'),
      EK('Relativ frekvens', 'Du kaster en terning 60 ganger og får 12 seksere. Hva er relativ frekvens for seks?', ['Relativ frekvens = antall seksere ÷ antall kast.', '12 ÷ 60 = 0,2 = 20 %.', 'Svar: 0,2. Den teoretiske sannsynligheten er 1/6 ≈ 0,167, så vi ligger litt over.']),
      C('virkelighet', 'Hvorfor simulere?', 'Værvarsling, trafikkflyt, finansmarkeder og spill bruker simulering fordi det er for vanskelig å regne ut direkte. Datamaskiner kan prøve ut millioner av tilfeller.')
    ])],
    [1, FORK('Simulere med Python', '🐍', [
      P('I Python finner du tilfeldige tall i modulen <code>random</code>. Du henter den med <code>import random</code>, og <code>random.randint(1, 6)</code> gir et tilfeldig heltall fra 1 til 6, som et terningkast. Med en <strong>løkke</strong> kan vi gjenta kastet mange ganger.'),
      W('kode', { tittel: 'Ett terningkast', kode: 'import random\nkast = random.randint(1, 6)\nprint("Du fikk", kast)', intro: 'Kjør flere ganger. Får du samme tall hver gang?' }),
      W('kode', { tittel: 'Mange kast: tell seksere', kode: 'import random\nantall = 0\nfor i in range(1000):\n    if random.randint(1, 6) == 6:\n        antall = antall + 1\nprint("Seksere:", antall, "av 1000")\nprint("Relativ frekvens:", antall / 1000)', intro: 'Kjør flere ganger. Svaret er ulikt hver gang, men nær 1/6 ≈ 0,167.' }),
      C('regel', 'Oppskrift for en simulering', ['1. Lag en tom teller: antall = 0.', '2. Bruk en løkke som gjentar forsøket mange ganger.', '3. Inni løkka: gjør forsøket med random, og bruk if for å telle det du er ute etter.', '4. Etter løkka: regn ut antall ÷ forsøk.']),
      C('tips', 'Prøv spillet', 'Sjansejegeren og Kode-knekkeren i «Spill for å lære» bruker begge ideene fra denne delen.')
    ])]
  ]);
})();
