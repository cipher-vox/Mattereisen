/* Forklaringsseksjoner 8. trinn, del 2: kvadratrot, mønstre, uttrykk, likninger */
(function () {
  const M = window.MATTE; const H = M.H; const sv = H.sv;
  const { P, C, E, EK, W, TAB, K, FORK, FK } = H;
  const NEG = '#1d4ed8', POS = '#c2410c', NUL = '#15803d', INK = '#14213d';

  /* ---------- Kvadratrot ---------- */
  function ruter(n, x0, y0, s, f, st) { let o = ''; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) o += sv.r(x0 + j * s, y0 + i * s, s - 2, s - 2, f, st, 3); return o; }
  FK('8/kvadratrot', [
    [0, FORK('Hva er en kvadratrot?', '📖', [
      P('Du vet at et <strong>kvadrat</strong> med sidelengde 3 har arealet 3 · 3 = 9. Det kalles å «kvadrere» et tall: 3² = 9. <strong>Kvadratroten</strong> gjør det motsatte. Den starter med arealet og finner sidelengden.'),
      H.FIG(ruter(3, 20, 15, 34, '#dff4f6', '#0e8a96') + sv.t(70, 138, 'sidelengde 3', { s: 14 }) + sv.t(70, 156, 'areal 9', { s: 14, f: POS }) +
        sv.pil(140, 66, 200, 66, INK) + sv.t(235, 52, '√9 = 3', { s: 26, f: NUL }) + sv.t(235, 80, '(3 · 3 = 9)', { s: 15 }),
        340, 170, 'Kvadratrota av 9 er 3, fordi et kvadrat med areal 9 har sidelengde 3.'),
      W('kvadrat', { s: 5, tittel: 'Kvadrat og areal: dra i siden' }),
      C('regel', 'Definisjon', 'Kvadratroten av et tall a, skrevet <strong>√a</strong>, er det tallet som ganget med seg selv gir a. Så √25 = 5, fordi 5 · 5 = 25.'),
      TAB(['Kvadrattall', 'Kvadratrot'], [['1 = 1²', '√1 = 1'], ['4 = 2²', '√4 = 2'], ['9 = 3²', '√9 = 3'], ['16 = 4²', '√16 = 4'], ['25 = 5²', '√25 = 5'], ['36 = 6²', '√36 = 6'], ['49 = 7²', '√49 = 7'], ['64 = 8²', '√64 = 8'], ['81 = 9²', '√81 = 9'], ['100 = 10²', '√100 = 10']]),
      EK('Finn √49', 'Hva er √49?', ['Vi spør: hvilket tall ganget med seg selv gir 49?', 'Prøv 7: 7 · 7 = 49. Det stemmer!', 'Svar: √49 = 7.']),
      EK('Et kvadratisk hageteppe har areal 81 m². Hvor lang er hver side?', 'Et kvadratisk hageteppe har areal 81 m². Hvor lang er hver side?', ['Arealet er side · side = 81.', 'Sidelengden er kvadratroten av arealet: √81.', 'Siden 9 · 9 = 81, er svaret 9 meter.']),
      C('virkelighet', 'Hvor bruker vi kvadratrot?', 'Når du skal finne sidelengden til et kvadrat ut fra arealet, når håndverkere bruker Pytagoras for å lage rette vinkler, og til å regne ut avstander på kart.')
    ])],
    [2, FORK('Røtter som ikke går opp', '🔍', [
      P('De fleste tall er ikke kvadrattall. Hva er for eksempel √10? Ingen heltall ganget med seg selv gir 10. Men vi kan <strong>anslå</strong>: 3 · 3 = 9 og 4 · 4 = 16, så √10 må ligge <strong>mellom 3 og 4</strong>. Siden 10 ligger nær 9, er √10 litt over 3.'),
      W('kvadrat', { rot: true, mal: 50, tittel: 'Finn √50 ved å prøve' }),
      C('regel', 'Slik anslår du', ['Finn de to nærmeste kvadrattallene.', 'Kvadratroten ligger mellom de to tilsvarende heltallene.', 'Er tallet nærmest det ene kvadrattallet, er roten nærmest det ene heltallet.', 'Bruk kalkulator for å få flere desimaler (√10 ≈ 3,16).']),
      EK('Anslå √20', 'Hvor ligger √20 omtrent?', ['4² = 16 og 5² = 25. 20 ligger mellom disse.', 'Så √20 ligger mellom 4 og 5.', '20 er nærmere 16 enn 25, men ikke veldig. Vi anslår 4,5.', 'Kalkulator: √20 ≈ 4,47.']),
      EK('Er √30 nærmest 5 eller 6?', 'Er √30 nærmest 5 eller 6?', ['5² = 25 og 6² = 36.', '30 ligger mellom 25 og 36. Avstanden til 25 er 5, til 36 er 6.', '30 er litt nærmere 25, så √30 er litt nærmere 5. Kalkulator: √30 ≈ 5,48.', 'Svar: √30 ligger mellom 5 og 6, og er litt nærmere 5,5.']),
      C('husk', 'Likhetstegn eller omtrentlig?', 'Når du avrunder en kvadratrot, bruker du tegnet ≈ (omtrent lik). Skriv √10 ≈ 3,16, ikke √10 = 3,16.'),
      C('tips', 'Prøv spillet', 'I «Spill for å lære» finner du Rotjegeren, der du plasserer kvadratrøtter på tallinja.')
    ])]
  ]);

  /* ---------- Mønstre ---------- */
  FK('8/monstre', [
    [0, FORK('Tallmønstre og figurtall', '📖', [
      P('Et <strong>mønster</strong> følger en regel. Hvis du finner regelen, kan du si hva som kommer neste, og til og med hva som kommer langt ute i rekka. Det er det vi kaller å <strong>generalisere</strong>.'),
      TAB(['Mønster', 'Regel', 'Neste tall'], [['3, 6, 9, 12, …', 'legg til 3 hver gang', '15'], ['2, 4, 8, 16, …', 'gang med 2 hver gang', '32'], ['1, 4, 9, 16, …', 'kvadrattall (n · n)', '25'], ['20, 17, 14, 11, …', 'trekk fra 3 hver gang', '8']]),
      P('<strong>Figurtall</strong> er mønstre vi kan se i figurer. Her bygger vi rekker av firkanter med fyrstikker:'),
      W('figurtall', { type: 'fyrstikk', n: 4, maxN: 10, tittel: 'Fyrstikkmønster: hvor mange fyrstikker i figur n?' }),
      C('regel', 'Slik finner du et mønster', ['Se på <strong>forskjellen</strong> mellom tallene. Er den lik hele tiden, øker det jevnt (lineært).', 'Dobles hvert tall? Da ganger vi med 2.', 'Lag en <strong>tabell</strong>: figurnummer og antall. Se hva som endrer seg.']),
      EK('Finn neste tall: 5, 9, 13, 17, …', 'Hva er neste tall i rekka 5, 9, 13, 17, …?', ['Regn ut forskjellene: 9 − 5 = 4, 13 − 9 = 4, 17 − 13 = 4.', 'Forskjellen er alltid 4. Regelen er «legg til 4».', 'Neste tall: 17 + 4 = 21.']),
      EK('Hvor mange kvadrater har figur 5 i kvadrattallene?', 'Figur 1 har 1 rute, figur 2 har 4, figur 3 har 9. Hvor mange har figur 5?', ['Figur n er et kvadrat med n ruter på hver side.', 'Antall ruter er n · n. For n = 5 er det 5 · 5.', 'Svar: 25 ruter.']),
      C('virkelighet', 'Mønstre rundt oss', 'Mønstre finnes i musikk, i naturen (solsikkefrø, sneglehus), i byggekonstruksjoner, i datakode, og i hvordan bankkontoer vokser over tid.')
    ])],
    [2, FORK('Fra mønster til formel', '🧩', [
      P('En <strong>formel</strong> forteller deg regelen for <em>hvilken som helst</em> figur i mønsteret. Da slipper du å tegne figur etter figur. Vi bruker en bokstav, ofte <strong>n</strong>, som står for figurnummeret.'),
      P('Ta fyrstikkmønsteret hvor figur 1 har 4 fyrstikker, figur 2 har 7, og figur 3 har 10. Det blir 3 flere hver gang.'),
      TAB(['Figur n', '1', '2', '3', '4', '10'], [['Fyrstikker', '4', '7', '10', '13', '31']]),
      C('regel', 'Slik finner du formelen', ['1. Finn hvor mye det øker for hver figur. Her: 3. Da er formelen «3 · n + noe».', '2. Sett inn figur 1: 3 · 1 = 3, men vi har 4. Så mangler det 1.', '3. Formelen er <strong>antall = 3 · n + 1</strong>.', '4. Test med figur 3: 3 · 3 + 1 = 10 ✓.']),
      W('figurtall', { type: 'fyrstikk', n: 3, maxN: 10, tittel: 'Sjekk formelen mot figurene' }),
      EK('Bruk formelen 3 · n + 1 til å finne figur 20', 'Hvor mange fyrstikker er det i figur 20, når formelen er 3 · n + 1?', ['Sett inn n = 20: 3 · 20 + 1.', '3 · 20 = 60.', '60 + 1 = 61.', 'Svar: 61 fyrstikker. Uten formel hadde vi måttet tegne 20 figurer!']),
      EK('Finn formelen: 5, 8, 11, 14, …', 'Finn formelen for rekka 5, 8, 11, 14, … (n er nummer i rekka)', ['Forskjellen er 3 hver gang, så formelen starter med 3 · n.', 'For n = 1 gir 3 · 1 = 3, men rekka har 5. Vi må legge til 2.', 'Formel: 3 · n + 2.', 'Test n = 4: 3 · 4 + 2 = 14 ✓.']),
      C('husk', 'Formel er et kraftig verktøy', 'Når du har formelen, kan du finne figur nr. 100 på et sekund, og du kan forklare hvorfor mønsteret virker, og ikke bare at det virker.')
    ])]
  ]);

  /* ---------- Uttrykk og variabler ---------- */
  FK('8/uttrykk', [
    [0, FORK('Bokstaver som tall', '📖', [
      P('I matte bruker vi ofte <strong>bokstaver</strong> i stedet for tall. En bokstav kalles en <strong>variabel</strong>, og står for et tall som kan variere (eller som vi ikke vet ennå). Et <strong>uttrykk</strong> er en regneoppskrift med tall og bokstaver, for eksempel 3x + 2.'),
      P('Tegnet · mellom et tall og en bokstav skrives ofte ikke: <strong>3x</strong> betyr 3 · x, og <strong>x</strong> alene betyr 1 · x.'),
      W('maskin', { regel: '3*x+2', navn: '3x + 2', x: 4, tittel: 'Maskinen 3x + 2: velg x og se hva som kommer ut' }),
      C('regel', 'Å sette inn verdi', 'Skal du finne verdien av et uttrykk, erstatter du bokstaven med tallet, og regner ut etter regnerekkefølgen. Skriv gjerne tallet i parentes.'),
      EK('Regn ut 3x + 2 når x = 4', 'Finn verdien av 3x + 2 når x = 4', ['Sett inn 4 der x står: 3 · 4 + 2.', 'Gange først: 3 · 4 = 12.', 'Så pluss: 12 + 2 = 14.', 'Svar: 14.']),
      EK('Regn ut 2a − b når a = 5 og b = 3', 'Finn verdien av 2a − b når a = 5 og b = 3', ['Sett inn: 2 · 5 − 3.', '2 · 5 = 10.', '10 − 3 = 7.', 'Svar: 7.']),
      C('virkelighet', 'Uttrykk rundt oss', 'Taxi: 50 + 15x kr for x km. Mobilabonnement: 199 + 49y kr hvis du kjøper y GB ekstra. Uttrykk lar oss regne på alle slike situasjoner med én regel.')
    ])],
    [2, FORK('Lage og forenkle uttrykk', '🛠️', [
      P('<strong>Å lage uttrykk fra tekst:</strong> Finn først hva som er ukjent og kall det x. Les så teksten og oversett ord til regnetegn.'),
      TAB(['Tekst', 'Uttrykk'], [['et tall pluss 5', 'x + 5'], ['dobbelt så mye som et tall', '2x'], ['5 mindre enn et tall', 'x − 5'], ['tre ganger tallet pluss 2', '3x + 2'], ['summen av to tall', 'a + b']]),
      EK('Lag et uttrykk: Du kjøper x brusflasker til 20 kr og betaler 5 kr i pant.', 'Lag et uttrykk for prisen på x brusflasker til 20 kr, pluss 5 kr i pose.', ['Hver flaske koster 20 kr. x flasker koster 20 · x = 20x.', 'Posen koster 5 kr ekstra.', 'Uttrykk: 20x + 5.']),
      P('<strong>Å forenkle:</strong> Du kan trekke sammen <strong>like ledd</strong>. Det er ledd som har samme bokstav (eller ingen bokstav). 3x og 5x er like ledd. 3x og 5 er ikke det.'),
      H.FIG(sv.r(10, 20, 62, 44, '#fff1e3', '#c2410c') + sv.t(41, 50, '3x', { s: 20, f: POS }) + sv.t(88, 50, '+', { s: 22 }) + sv.r(104, 20, 62, 44, '#fff1e3', '#c2410c') + sv.t(135, 50, '5x', { s: 20, f: POS }) + sv.t(190, 50, '=', { s: 22 }) + sv.r(210, 20, 70, 44, '#ffd9b8', '#c2410c') + sv.t(245, 50, '8x', { s: 22, f: POS }) + sv.t(145, 100, '3 av x og 5 av x blir 8 av x', { s: 14, f: '#52617a', w: 600 }),
        300, 112, 'Like ledd kan legges sammen: 3x + 5x = 8x, som å legge sammen 3 epler og 5 epler.'),
      C('regel', 'Regler for å forenkle', ['Legg sammen tall foran <strong>samme</strong> bokstav: 4x + 2x = 6x.', 'Tall uten bokstav legges sammen for seg: 7 + 3 = 10.', 'Ulike bokstaver kan ikke slås sammen: 2x + 3y er ferdig forenklet.']),
      EK('Forenkle 4x + 3 + 2x − 1', 'Forenkle uttrykket 4x + 3 + 2x − 1', ['Samle x-leddene: 4x + 2x = 6x.', 'Samle tallene: 3 − 1 = 2.', 'Svar: 6x + 2.']),
      C('tips', 'Prøv spillet', 'I «Spill for å lære» kan du trene på å finne like ledd i spillet Like-ledd-fisking.')
    ])]
  ]);

  /* ---------- Likninger ---------- */
  FK('8/ligninger', [
    [0, FORK('Hva er en likning, og hvordan løser vi den?', '📖', [
      P('En <strong>likning</strong> er en påstand om at to uttrykk er like, med et ukjent tall (ofte x). Å <strong>løse</strong> likningen betyr å finne tallet som gjør påstanden sann. I likningen x + 3 = 8 er svaret x = 5, fordi 5 + 3 = 8.'),
      P('Tenk på en <strong>vekt i balanse</strong>. Venstre side må alltid veie like mye som høyre side. Hvis du tar noe bort fra den ene siden, må du ta like mye bort fra den andre. Det er hele hemmeligheten:'),
      C('regel', 'Gjør det samme på begge sider', ['Du kan legge til det samme tallet på begge sider.', 'Du kan trekke fra det samme tallet på begge sider.', 'Du kan gange eller dele begge sider med det samme tallet (ikke 0).', 'Likheten blir da fortsatt sann.']),
      W('balanse', { a: 1, b: 3, c: 8, tittel: 'Vekta: løs x + 3 = 8' }),
      EK('Løs x + 3 = 8', 'Løs likningen x + 3 = 8', ['Vi vil ha x alene. Fjern 3 fra venstre side ved å trekke fra 3.', 'Gjør det samme på høyre side: x + 3 − 3 = 8 − 3.', 'x = 5.', 'Prøve: 5 + 3 = 8 ✓.'], { widget: 'balanse', opts: { a: 1, b: 3, c: 8, tittel: 'x + 3 = 8' } }),
      EK('Løs 4x = 20', 'Løs likningen 4x = 20', ['4x betyr 4 · x. Det motsatte av å gange med 4 er å dele med 4.', 'Del begge sider på 4: 4x ÷ 4 = 20 ÷ 4.', 'x = 5.', 'Prøve: 4 · 5 = 20 ✓.']),
      C('husk', 'Sjekk alltid svaret', 'Sett svaret tilbake i likningen. Hvis begge sider blir like, har du løst den riktig. Det tar bare noen sekunder.')
    ])],
    [2, FORK('Likninger med flere steg', '🪜', [
      P('Noen likninger trenger flere steg, for eksempel 2x + 5 = 17. Her er det både noe som legges til (+ 5) og noe som ganges (2 · x). Da gjør du som når du pakker ut en gave: <strong>pakk ut i motsatt rekkefølge</strong> av hvordan den ble pakket.'),
      W('balanse', { a: 2, b: 5, c: 17, tittel: 'Vekta: løs 2x + 5 = 17' }),
      C('regel', 'Slik løser du likninger med to steg', ['1. Fjern det som legges til eller trekkes fra (pluss/minus).', '2. Fjern det som ganges med x (del).', '3. Sjekk svaret ved å sette inn.']),
      EK('Løs 2x + 5 = 17', 'Løs likningen 2x + 5 = 17', ['Trekk fra 5 på begge sider: 2x + 5 − 5 = 17 − 5, så 2x = 12.', 'Del begge sider på 2: x = 12 ÷ 2 = 6.', 'Prøve: 2 · 6 + 5 = 12 + 5 = 17 ✓.']),
      P('Er x på <strong>begge sider</strong>, samler vi alle x-ene på den ene siden først.'),
      EK('Løs 5x − 3 = 2x + 9', 'Løs likningen 5x − 3 = 2x + 9', ['Trekk fra 2x på begge sider, så x-ene samles på venstre side: 5x − 2x − 3 = 9, altså 3x − 3 = 9.', 'Legg til 3 på begge sider: 3x = 12.', 'Del på 3: x = 4.', 'Prøve: venstre 5 · 4 − 3 = 17, høyre 2 · 4 + 9 = 17 ✓.']),
      C('virkelighet', 'Hvor bruker vi likninger?', 'Når du skal finne hvor mange timer du må jobbe for å tjene til en PlayStation, hvor lang tid en reise tar, eller hvor mye et abonnement koster per måned.')
    ])]
  ]);
})();
