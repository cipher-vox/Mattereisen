/* Forklaringsseksjoner 10. trinn, del 2: vekstfaktor, kjøp/sparing/lån, økonomiprosjekt, modellering, Python */
(function () {
  const M = window.MATTE; const H = M.H; const sv = H.sv;
  const { P, C, E, EK, W, TAB, K, FORK, FK } = H;
  const NEG = '#1d4ed8', POS = '#c2410c', NUL = '#15803d', INK = '#14213d', TEAL = '#0e8a96', PLUM = '#6d3fc9', ORANGE = '#e8964a';

  /* ---------- Prosentvis endring og vekstfaktor ---------- */
  FK('10/vekstfaktor', [
    [0, FORK('Vekstfaktor: en snarvei for prosent', '📖', [
      P('<strong>Vekstfaktoren</strong> er tallet du <strong>ganger med</strong> for å få den nye verdien etter en prosentvis endring. Du slipper å regne ut prosenten og så legge til eller trekke fra: du gjør alt i ett steg.'),
      H.FIG(
        sv.r(10, 20, 100, 54, '#fff1e3', ORANGE, 10) + sv.t(60, 53, '800 kr', { s: 18 }) + sv.pil(110, 47, 170, 47, INK) + sv.t(140, 36, '· 1,2', { s: 17, f: POS }) + sv.r(170, 20, 100, 54, '#e1f6e8', NUL, 10) + sv.t(220, 53, '960 kr', { s: 18 }) +
        sv.t(140, 100, '+20 % ⇒ vekstfaktor 1,20', { s: 14, f: '#52617a', w: 600 }),
        290, 115, 'En økning på 20 % gir vekstfaktor 1,2. Prisen 800 kr blir 800 · 1,2 = 960 kr.'),
      C('regel', 'Slik finner du vekstfaktoren', ['<strong>Økning:</strong> vekstfaktor = 1 + prosent som desimaltall. +20 % gir 1 + 0,20 = <strong>1,2</strong>.', '<strong>Nedgang:</strong> vekstfaktor = 1 − prosent som desimaltall. −15 % gir 1 − 0,15 = <strong>0,85</strong>.', '<strong>Ny verdi = gammel verdi · vekstfaktor.</strong>']),
      TAB(['Endring', 'Vekstfaktor'], [['+5 %', '1,05'], ['+50 %', '1,5'], ['+100 % (dobling)', '2'], ['−10 %', '0,9'], ['−50 % (halvering)', '0,5']]),
      EK('Øke med prosent', 'En vare koster 800 kr. Prisen øker med 20 %. Hva blir den nye prisen?', ['Vekstfaktor for +20 %: 1 + 0,20 = 1,2.', 'Ny pris = 800 · 1,2 = 960.', 'Svar: 960 kr.']),
      EK('Minske med prosent', 'En jakke koster 1200 kr, med 15 % rabatt. Hva er prisen nå?', ['Vekstfaktor for −15 %: 1 − 0,15 = 0,85.', '1200 · 0,85 = 1020.', 'Svar: 1020 kr.']),
      EK('Finne prosentvis endring', 'Prisen går fra 250 kr til 300 kr. Hvor mange prosent økte den?', ['Vekstfaktor = ny ÷ gammel = 300 ÷ 250 = 1,2.', '1,2 betyr +20 %.', 'Svar: 20 % økning.']),
      C('tips', 'Prøv spillet', 'Vekstfaktor-memory i «Spill for å lære» trener på å koble prosent og vekstfaktor.')
    ])],
    [3, FORK('Flere perioder: eksponentiell vekst og forfall', '📈', [
      P('Hva skjer når noe vokser med samme prosent flere ganger på rad? Da ganger vi med vekstfaktoren <strong>flere ganger</strong>, og det blir en <strong>potens</strong>. Hvis noe starter på A og vokser med vekstfaktor v i n perioder, er verdien <strong>A · vⁿ</strong>.'),
      C('regel', 'Formelen', '<strong>Ny verdi = startverdi · vekstfaktorⁿ</strong>, der n er antall perioder (år, måneder …).'),
      W('graf', { params: { a: { min: 1, max: 200, v: 100, steg: 10, navn: 'a (startverdi)' }, b: { min: 0.5, max: 2, v: 1.2, steg: 0.05, navn: 'b (vekstfaktor)' } }, funksjoner: [{ f: 'a*b^x', pen: 'eks', navn: 'y = a · bˣ', farge: ORANGE }], xmin: 0, xmax: 10, ymin: 0, ymax: 600, tabell: true, tittel: 'Dra i a og b: vekstfaktor over 1 gir vekst, under 1 gir forfall' }),
      EK('Rente over flere år', 'Du setter 10 000 kr på en konto med 4 % rente per år. Hvor mye har du etter 3 år?', ['Vekstfaktor: 1 + 0,04 = 1,04.', 'Etter 3 år: 10 000 · 1,04³.', '1,04³ ≈ 1,1249. 10 000 · 1,1249 ≈ 11 249.', 'Svar: omtrent 11 249 kr. (Du har tjent renter på rentene!)']),
      EK('Forfall', 'En bil taper 15 % av verdien hvert år. Den kostet 300 000 kr ny. Hva er den verdt etter 2 år?', ['Vekstfaktor: 1 − 0,15 = 0,85.', 'Etter 2 år: 300 000 · 0,85².', '0,85² = 0,7225. 300 000 · 0,7225 = 216 750.', 'Svar: 216 750 kr.']),
      C('husk', 'Viktig!', 'To økninger på 10 % er <em>ikke</em> 20 %. Det er 1,1 · 1,1 = 1,21, altså 21 %. Prosentene bygger på hverandre.'),
      C('virkelighet', 'Hvor bruker vi det?', 'Sparerente, lån, befolkningsvekst, spredning av virus, verditap på bil og mobil, og radioaktiv nedbrytning.')
    ])]
  ]);

  /* ---------- Kjøp, sparing og lån ---------- */
  FK('10/kjop-sparing-lan', [
    [0, FORK('Rabatt, mva og sammenlikne priser', '📖', [
      P('I butikken trenger du prosentregning hele tiden. Rabatter, merverdiavgift (<strong>mva</strong>, 25 % på de fleste varer) og tilbud kan alle regnes med <strong>vekstfaktor</strong>.'),
      TAB(['Situasjon', 'Vekstfaktor', 'Eksempel'], [['25 % rabatt', '0,75', '800 kr blir 800 · 0,75 = 600 kr'], ['Legge på 25 % mva', '1,25', '400 kr blir 400 · 1,25 = 500 kr'], ['Fra pris med mva til uten', '÷ 1,25', '500 ÷ 1,25 = 400 kr']]),
      EK('To rabatter etter hverandre', 'En jakke koster 1000 kr. Den får 20 % rabatt, og så ytterligere 10 % på det nye. Hva er sluttprisen?', ['20 % rabatt: vekstfaktor 0,8. 10 % rabatt: vekstfaktor 0,9.', 'Pris: 1000 · 0,8 · 0,9 = 1000 · 0,72 = 720.', 'Det er 28 % rabatt til sammen, ikke 30 %.', 'Svar: 720 kr.']),
      EK('Beste kjøp', 'Pakke A: 500 g til 30 kr. Pakke B: 750 g til 42 kr. Hvilken er billigst per kg?', ['A: 30 kr for 0,5 kg = 60 kr/kg.', 'B: 42 kr for 0,75 kg = 56 kr/kg.', 'Svar: B er billigst per kilo.']),
      C('virkelighet', 'Hvorfor er dette viktig?', 'Butikkene vil at du skal tro at tilbudene er bedre enn de er. Å regne enhetspris og vekstfaktor gjør at du ikke blir lurt.')
    ])],
    [2, FORK('Sparing og rente: rentes rente', '🏦', [
      P('Når du sparer penger i banken, får du <strong>rente</strong>. Det er betaling for at banken får bruke pengene dine. Renten legges til beløpet hvert år, og året etter får du rente på <em>hele</em> det nye beløpet, også på rentene du fikk i fjor. Det kalles <strong>rentes rente</strong>.'),
      TAB(['År', 'Beløp (4 % rente)'], [['Start', '10 000'], ['Etter 1 år', '10 000 · 1,04 = 10 400'], ['Etter 2 år', '10 400 · 1,04 = 10 816'], ['Etter 3 år', '10 816 · 1,04 ≈ 11 249'], ['Etter 10 år', '10 000 · 1,04¹⁰ ≈ 14 802']]),
      W('graf', { params: { a: { min: 1000, max: 20000, v: 10000, steg: 1000, navn: 'a (startbeløp, kr)' }, b: { min: 1, max: 1.15, v: 1.04, steg: 0.01, navn: 'b (vekstfaktor)' } }, funksjoner: [{ f: 'a*b^x', pen: 'eks', navn: 'beløp', farge: TEAL }], xmin: 0, xmax: 20, ymin: 0, ymax: 60000, tabell: true, tittel: 'Sparing over tid: dra i startbeløp og rente' }),
      C('regel', 'Sparing med rente', '<strong>Sluttbeløp = startbeløp · (1 + rente)ⁿ</strong>. Jo lenger du sparer, jo mer vokser det, og veksten blir raskere og raskere.'),
      EK('Sparing i 10 år', 'Du sparer 5000 kr med 3 % rente i 10 år. Hva har du da?', ['Vekstfaktor: 1,03.', '5000 · 1,03¹⁰.', '1,03¹⁰ ≈ 1,3439. 5000 · 1,3439 ≈ 6720.', 'Svar: omtrent 6720 kr.']),
      C('tips', 'Prøv spillet', 'Rente-raketten i «Spill for å lære» lar deg finne hvilken rente du trenger for å nå et sparemål.')
    ])],
    [4, FORK('Lån og renter: hva koster det egentlig?', '💳', [
      P('Når du <strong>låner</strong> penger, betaler du <strong>rente</strong> til banken i tillegg til at du betaler tilbake det du lånte. Jo lenger du bruker på å betale tilbake, jo mer rente betaler du.'),
      K([{ ikon: '💰', tittel: 'Lånebeløp', tekst: 'Det du låner, for eksempel 100 000 kr.' }, { ikon: '📅', tittel: 'Rente', tekst: 'Prosent du betaler årlig. 5 % av 100 000 er 5000 kr første år.' }, { ikon: '📉', tittel: 'Avdrag', tekst: 'Det du betaler ned på selve lånet, i tillegg til renten.' }, { ikon: '🧾', tittel: 'Gebyrer', tekst: 'Faste avgifter som økes totalkostnaden.' }]),
      C('regel', 'Total kostnad', '<strong>Hva lånet koster = alt du betaler tilbake − det du lånte.</strong> Det er viktigere enn bare å se på prisen per måned.'),
      EK('Rente første år', 'Du låner 100 000 kr med 5 % rente. Hvor mye rente betaler du det første året (hvis du ikke betaler ned noe)?', ['Rente = 100 000 · 0,05.', 'Svar: 5000 kr.']),
      EK('Kredittkjøp: kjøp nå, betal senere', 'En sofa koster 6000 kr kontant. Du kan i stedet betale 12 måneder á 560 kr. Hva koster det ekstra?', ['Totalt: 12 · 560 = 6720 kr.', 'Ekstra: 6720 − 6000 = 720 kr.', 'Prosentvis: 720 ÷ 6000 = 0,12 = 12 %.', 'Svar: du betaler 720 kr (12 %) ekstra for å betale senere.']),
      C('virkelighet', 'Pass på', '«Kjøp nå, betal senere» og kredittkort kan ha svært høy rente (ofte over 20 %). Ta alltid regnestykket om hva det <em>faktisk</em> koster.')
    ])]
  ]);

  /* ---------- Økonomiprosjekt ---------- */
  FK('10/okonomi-prosjekt', [
    [0, FORK('Slik gjør du et utforskende arbeid', '📖', [
      P('Et <strong>utforskende arbeid</strong> er et lite forskningsprosjekt. Du velger et spørsmål (en problemstilling) du er nysgjerrig på, finner tall, regner, og forklarer hva du fant. Her handler det om økonomi: mobilabonnement, sparing, lån eller et kjøp.'),
      H.FIG(
        sv.r(10, 20, 100, 50, '#dff4f6', TEAL, 10) + sv.t(60, 50, '1 Spørsmål', { s: 13 }) + sv.pil(110, 45, 130, 45, INK) +
        sv.r(130, 20, 100, 50, '#fff1e3', ORANGE, 10) + sv.t(180, 50, '2 Samle tall', { s: 13 }) + sv.pil(230, 45, 250, 45, INK) +
        sv.r(250, 20, 100, 50, '#eee6fb', PLUM, 10) + sv.t(300, 50, '3 Regne', { s: 13 }) + sv.pil(350, 45, 370, 45, INK) +
        sv.r(370, 20, 100, 50, '#e1f6e8', NUL, 10) + sv.t(420, 50, '4 Konkludere', { s: 13 }),
        480, 90, 'Fire steg i et utforskende arbeid.'),
      C('regel', 'Fire steg', ['1. <strong>Spørsmål:</strong> Hva vil du finne ut? Er det mulig å måle?', '2. <strong>Samle tall:</strong> Hvor finner du dem? Skriv ned kilder.', '3. <strong>Regne:</strong> Bruk regneark, graf, vekstfaktor eller formel.', '4. <strong>Konkludere:</strong> Hva svarer tallene? Hva er usikkert?']),
      EK('Eksempel på spørsmål', 'Lag et godt spørsmål om mobilabonnement.', ['Dårlig: «Hva er billigst?» (for uklart).', 'Bedre: «Hvilket av to abonnement er billigst hvis jeg bruker 5 GB i måneden, og når bytter det?».', 'Det kan du regne på: to funksjoner, og skjæringspunktet viser når de koster like mye.']),
      C('mestring', 'Det som gir høy kvalitet', ['Du forklarer valgene dine.', 'Du viser regningen og bruker digitale verktøy (regneark eller GeoGebra).', 'Du vurderer om svaret er troverdig og hvilke forutsetninger du gjorde.'])
    ])]
  ]);

  /* ---------- Modellering ---------- */
  FK('10/modellering', [
    [0, FORK('Hva er en modell, og hvordan modellerer vi?', '📖', [
      P('En <strong>matematisk modell</strong> er en forenkling av virkeligheten som du kan regne på. Et kart er en modell av terrenget. En formel for taxiprisen er en modell av hva du må betale. Modellen er aldri helt riktig, men den er nyttig.'),
      H.FIG(
        sv.r(10, 30, 120, 50, '#fff1e3', ORANGE, 10) + sv.t(70, 60, 'Situasjon', { s: 14 }) + sv.pil(130, 55, 160, 55, INK) + sv.r(160, 30, 110, 50, '#dff4f6', TEAL, 10) + sv.t(215, 60, 'Forenkle', { s: 14 }) + sv.pil(270, 55, 300, 55, INK) + sv.r(300, 30, 100, 50, '#eee6fb', PLUM, 10) + sv.t(350, 60, 'Modell', { s: 14 }) + sv.pil(400, 55, 430, 55, INK) + sv.r(430, 30, 100, 50, '#e1f6e8', NUL, 10) + sv.t(480, 60, 'Regne', { s: 14 }) +
        sv.pil(480, 80, 480, 120, INK) + sv.r(430, 120, 100, 44, '#fef3c7', '#ca8a04', 10) + sv.t(480, 148, 'Tolke', { s: 14 }) + sv.pil(430, 142, 320, 142, INK) + sv.r(220, 120, 100, 44, '#ffe4e1', '#dc2626', 10) + sv.t(270, 148, 'Vurdere', { s: 14 }) + sv.pil(220, 142, 130, 142, '#dc2626') + sv.t(120, 168, 'Bedre modell? Prøv igjen', { s: 13, f: '#dc2626', a: 'end' }),
        550, 180, 'Modelleringsprosessen er en sirkel. Passer ikke modellen, forbedrer vi den og prøver igjen.'),
      C('regel', 'Å velge funksjonstype', ['Like store endringer hver gang: <strong>lineær</strong> (y = ax + b).', 'Samme prosent hver gang: <strong>eksponentiell</strong> (y = a · bˣ).', 'Kast og fall, bue: <strong>andregrad</strong>.', 'Når den ene dobles og den andre halveres: <strong>brøk</strong> (y = k/x).']),
      EK('Lag en lineær modell', 'Et lys er 18 cm etter 1 time og 12 cm etter 3 timer. Lag en modell, og finn lengden etter 5 timer.', ['Stigningstall: (12 − 18) ÷ (3 − 1) = −3. Lyset minker 3 cm per time.', 'Sett inn (1, 18): 18 = −3 · 1 + b, så b = 21. Modell: L = −3t + 21.', 'Etter 5 timer: L = −3 · 5 + 21 = 6 cm.', 'Svar: 6 cm.']),
      C('virkelighet', 'Hvor bruker vi modeller?', 'Værvarsel, trafikkplanlegging, smittespredning, strømforbruk og økonomi. Alle prognoser er modeller.')
    ])],
    [4, FORK('Hvor gyldig er modellen?', '⚖️', [
      P('En modell gjelder bare i et visst område. Å bruke den <strong>mellom</strong> målingene du har kalles <strong>interpolering</strong>, og er som regel trygt. Å bruke den <strong>utenfor</strong> kalles <strong>ekstrapolering</strong>, og kan gi tull.'),
      EK('Ekstrapolering som går galt', 'En modell for høyde er h = 5x + 100 cm, der x er alder i år (for 10–16 år). Hva gir den for en 40-åring?', ['h = 5 · 40 + 100 = 300 cm.', '3 meter er ikke realistisk.', 'Mennesker slutter å vokse. Modellen er bare gyldig for barn og ungdom.', 'Svar: modellen er ikke gyldig utenfor 10–16 år.']),
      C('advarsel', 'Spør alltid', ['Gir svaret mening i virkeligheten?', 'Hvilke antakelser har jeg gjort?', 'For hvilke verdier gjelder modellen?', 'Hvordan kan jeg forbedre den?']),
      C('tips', 'Prøv spillet', 'Myntjakten i «Spill for å lære» lar deg tilpasse en modell til målepunkter.')
    ])]
  ]);

  /* ---------- Programmering og Python ---------- */
  FK('10/python', [
    [0, FORK('Å lese og spore Python-kode', '📖', [
      P('Python er et programmeringsspråk som er lett å lese. Datamaskinen leser koden <strong>linje for linje, ovenfra og ned</strong>. For å forstå hva et program gjør, kan du <strong>spore</strong> det: skriv ned verdien til hver variabel etter hver linje.'),
      TAB(['Linje', 'Kode', 'Variabler etter linja'], [['1', 'x = 3', 'x = 3'], ['2', 'y = x * 2', 'x = 3, y = 6'], ['3', 'x = 10', 'x = 10, y = 6'], ['4', 'print(y)', 'skriver ut 6']]),
      P('Legg merke til linje 3: når x endres til 10, endres <em>ikke</em> y. y ble regnet ut én gang, da x var 3.'),
      W('kode', { tittel: 'Prøv selv: spor og kjør', kode: 'x = 3\ny = x * 2\nx = 10\nprint(y)', forvent: '6', intro: 'Gjett først hva som skrives ut. Kjør deretter og se.' }),
      C('regel', 'Nyttig å vite', ['<code>=</code> betyr «legg verdien i variabelen» (ikke «er lik»).', '<code>**</code> er potens, <code>//</code> er heltallsdivisjon og <code>%</code> er rest.', 'Innrykk (4 mellomrom) viser hva som hører til en løkke eller if.']),
      EK('Spor koden', 'Hva skrives ut?\n<code>a = 5<br>b = a + 2<br>a = b * 2<br>print(a)</code>', ['Linje 1: a = 5.', 'Linje 2: b = 5 + 2 = 7.', 'Linje 3: a = b · 2 = 14.', 'Svar: 14.'])
    ])],
    [2, FORK('Løkker og if: la datamaskinen gjenta og velge', '🔁', [
      P('En <strong>for-løkke</strong> gjentar kode. <code>for i in range(5):</code> kjører 5 ganger med i = 0, 1, 2, 3, 4. <code>range(1, 6)</code> gir 1, 2, 3, 4, 5. Husk: range stopper <em>før</em> det siste tallet!'),
      P('Med <code>if</code> kan programmet velge, avhengig av en <strong>betingelse</strong>. Bruk <code>==</code> for å sammenlikne (to likhetstegn), <code>!=</code> for «ikke lik», og <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.'),
      W('kode', { tittel: 'Summen 1 til 10', kode: 'sum = 0\nfor tall in range(1, 11):\n    sum = sum + tall\nprint(sum)', forvent: '55', intro: 'Endre 11 til 101 for å summere 1 til 100.' }),
      W('kode', { tittel: 'Partall og oddetall', kode: 'for tall in range(1, 6):\n    if tall % 2 == 0:\n        print(tall, "er partall")\n    else:\n        print(tall, "er oddetall")', forvent: '1 er oddetall\n2 er partall\n3 er oddetall\n4 er partall\n5 er oddetall', intro: 'tall % 2 gir resten ved deling på 2.' }),
      EK('Spor en løkke', 'Hva skrives ut?\n<code>s = 0<br>for i in range(1, 4):<br>&nbsp;&nbsp;&nbsp;&nbsp;s = s + i<br>print(s)</code>', ['i går gjennom 1, 2 og 3 (range stopper før 4).', 'Etter i = 1: s = 1. Etter i = 2: s = 3. Etter i = 3: s = 6.', 'Svar: 6.']),
      C('tips', 'Prøv spillet', 'Kode-knekkeren i «Spill for å lære» gir deg små programmer å spore, og poeng for riktig svar.')
    ])],
    [4, FORK('Funksjoner: gjenbruk og matte i kode', '⚙️', [
      P('En <strong>funksjon</strong> i Python er en navngitt kodebit du kan bruke mange ganger. Du <strong>definerer</strong> den med <code>def</code>, og bruker <code>return</code> for å gi tilbake et svar. Det ligner på f(x) i matte!'),
      TAB(['I matte', 'I Python'], [['f(x) = 2x + 1', 'def f(x):<br>&nbsp;&nbsp;&nbsp;&nbsp;return 2 * x + 1'], ['f(3)', 'f(3)'], ['f(3) = 7', 'print(f(3)) skriver ut 7']]),
      W('kode', { tittel: 'En funksjon', kode: 'def f(x):\n    return 2 * x + 1\n\nprint(f(3))\nprint(f(10))', forvent: '7\n21', intro: 'Skriv din egen funksjon, for eksempel x ** 2 - 4.' }),
      W('kode', { tittel: 'Test kvadratsetningen for mange tall', kode: 'alle_ok = True\nfor a in range(1, 11):\n    for b in range(1, 11):\n        if (a + b) ** 2 != a ** 2 + 2 * a * b + b ** 2:\n            alle_ok = False\nprint("Stemmer alltid:", alle_ok)', forvent: 'Stemmer alltid: True', intro: 'Datamaskinen tester 100 kombinasjoner på et øyeblikk. Det er ikke et bevis, men det gir deg tillit.' }),
      EK('Spor en funksjon', 'Hva skrives ut?\n<code>def f(x):<br>&nbsp;&nbsp;&nbsp;&nbsp;return 3 * x - 2<br>print(f(4))</code>', ['f(4) betyr at x får verdien 4.', 'return 3 * x − 2 gir 3 · 4 − 2 = 12 − 2 = 10.', 'print skriver ut det funksjonen gir tilbake.', 'Svar: 10.']),
      C('virkelighet', 'Hvorfor funksjoner?', 'Programmerere skriver aldri samme kode to ganger. De lager en funksjon og bruker den igjen og igjen. Spill, apper og nettsider er bygget av tusenvis av små funksjoner.')
    ])]
  ]);
})();
