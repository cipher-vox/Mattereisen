/* Forklaringsseksjoner 8. trinn, del 3: ulikheter, funksjoner, representasjoner, programmering */
(function () {
  const M = window.MATTE; const H = M.H; const sv = H.sv;
  const { P, C, E, EK, W, TAB, K, FORK, FK } = H;
  const NEG = '#1d4ed8', POS = '#c2410c', NUL = '#15803d', INK = '#14213d', TEAL = '#0e8a96', PLUM = '#6d3fc9', ORANGE = '#e8964a';

  /* ---------- Ulikheter ---------- */
  function tallinje(fra, til, markFra, åpen, retning) {
    const x = v => 30 + (v - fra) * (440 / (til - fra)); let o = sv.l(20, 60, 480, 60, INK, 3);
    for (let v = fra; v <= til; v++) o += sv.l(x(v), 52, x(v), 68, INK, 2) + sv.t(x(v), 90, String(v).replace('-', '−'), { s: 13 });
    const x0 = x(markFra);
    o += sv.l(x0, 60, retning > 0 ? 475 : 25, 60, '#dc2626', 7) + (åpen ? sv.c(x0, 60, 9, '#fff', '#dc2626') : sv.c(x0, 60, 9, '#dc2626', '#dc2626'));
    return o;
  }
  FK('8/ulikheter', [
    [0, FORK('Ulikheter og tallinja', '📖', [
      P('En <strong>ulikhet</strong> sier at to ting <em>ikke</em> er like, men at den ene er større eller mindre. Vi bruker disse tegnene:'),
      TAB(['Tegn', 'Betyr', 'Eksempel'], [['<', 'mindre enn', '3 < 5'], ['>', 'større enn', '7 > 2'], ['≤', 'mindre enn eller lik', 'x ≤ 4 (x kan være 4)'], ['≥', 'større enn eller lik', 'x ≥ 4 (x kan være 4)']]),
      P('Tips: Tegnet peker alltid mot det <strong>minste</strong> tallet, som en sulten munn som vil spise det største.'),
      P('En ulikhet som <strong>x &gt; 3</strong> har uendelig mange løsninger: 3,1 og 4 og 100 og 3,0001 og så videre. Vi viser dem på en tallinje:'),
      H.FIG(tallinje(0, 8, 3, true, 1), 500, 105, 'x > 3: den åpne sirkelen betyr at 3 ikke er med. Den røde linja viser alle løsningene.'),
      H.FIG(tallinje(0, 8, 3, false, 1), 500, 105, 'x ≥ 3: den fylte sirkelen betyr at 3 er med som løsning.'),
      C('regel', 'Åpen og fylt sirkel', ['<strong>Åpen sirkel</strong> (○) brukes ved &lt; og &gt;: grensetallet er <em>ikke</em> med.', '<strong>Fylt sirkel</strong> (●) brukes ved ≤ og ≥: grensetallet <em>er</em> med.', 'Pilen peker mot de tallene som er løsninger.']),
      W('ulikhet', { a: 4, op: '>', t: 6, tittel: 'Utforsk ulikhet på tallinja' }),
      EK('Er 6 en løsning på x > 4?', 'Er x = 6 en løsning på x > 4?', ['Sett inn 6 for x: 6 > 4.', 'Er det sant? Ja, 6 er større enn 4.', 'Svar: Ja, 6 er en løsning. (Men 4 er ikke en løsning, for 4 > 4 er usant.)']),
      C('virkelighet', 'Ulikheter i hverdagen', '«Du må være minst 140 cm for å kjøre denne karusellen» betyr høyde ≥ 140. «Maks 5 personer i heisen» betyr personer ≤ 5. Ulikheter beskriver grenser og krav.')
    ])],
    [2, FORK('Å løse ulikheter', '🧮', [
      P('Ulikheter løser vi nesten som ligninger. Vi vil ha x alene, og vi bruker de samme reglene: du kan <strong>legge til, trekke fra og gange eller dele</strong> med det samme tallet på begge sider (positivt tall), og ulikheten gjelder fortsatt.'),
      EK('Løs x + 4 > 9', 'Løs ulikheten x + 4 > 9', ['Trekk fra 4 på begge sider: x + 4 − 4 > 9 − 4.', 'x > 5.', 'Svar: alle tall større enn 5. Sjekk: 6 + 4 = 10 > 9 ✓.']),
      EK('Løs 3x ≤ 12', 'Løs ulikheten 3x ≤ 12', ['Del begge sider på 3: x ≤ 4.', 'Svar: alle tall som er 4 eller mindre. På tallinja: fylt sirkel i 4, pil mot venstre.'], { widget: 'ulikhet', opts: { a: 4, op: '≤', t: 2, tittel: 'x ≤ 4' } }),
      EK('Løs 2x + 1 < 9', 'Løs ulikheten 2x + 1 < 9', ['Trekk fra 1: 2x < 8.', 'Del på 2: x < 4.', 'Svar: alle tall mindre enn 4 (4 er ikke med).']),
      C('virkelighet', 'Eksempel fra livet', 'Du har 200 kr. Hvert spill koster 30 kr. Hvor mange kan du kjøpe? 30x ≤ 200, så x ≤ 6,67. Siden du ikke kan kjøpe deler av et spill, er svaret 6 spill.')
    ])]
  ]);

  /* ---------- Funksjoner ---------- */
  FK('8/funksjoner', [
    [0, FORK('Hva er en funksjon?', '📖', [
      P('En <strong>funksjon</strong> er som en maskin. Du putter inn et tall, maskinen gjør noe med det etter en fast regel, og et nytt tall kommer ut. Hver gang du putter inn det samme tallet, får du alltid det samme svaret ut.'),
      H.FIG(
        sv.t(40, 60, 'x = 3', { s: 18, f: POS }) + sv.pil(75, 55, 130, 55, INK) + sv.r(130, 20, 140, 80, '#eee6fb', PLUM, 14) + sv.t(200, 55, 'f(x) = 2x + 1', { s: 16, f: PLUM }) + sv.t(200, 78, 'regelen', { s: 13, f: '#52617a', w: 600 }) + sv.pil(270, 55, 325, 55, INK) + sv.t(375, 62, '7', { s: 26, f: NUL }),
        420, 120, 'Funksjonsmaskinen: inn kommer 3, regelen ganger med 2 og legger til 1, ut kommer 7.'),
      W('maskin', { regel: '2*x+1', navn: 'f(x) = 2x + 1', x: 3, tittel: 'Funksjonsmaskinen f(x) = 2x + 1' }),
      C('regel', 'Ord du må kjenne', ['<strong>x</strong> er det du putter inn (inngangsverdi).', '<strong>f(x)</strong> er det som kommer ut (utgangsverdi). Les «f av x».', '<strong>f(3)</strong> betyr: sett inn 3 der det står x.', 'Hver x har nøyaktig <strong>ett</strong> f(x). Det er det som gjør noe til en funksjon.']),
      EK('Finn f(4) når f(x) = 3x − 2', 'En funksjon er f(x) = 3x − 2. Finn f(4).', ['Sett inn 4 der x står: f(4) = 3 · 4 − 2.', '3 · 4 = 12.', '12 − 2 = 10.', 'Svar: f(4) = 10.']),
      EK('Lag en tabell for f(x) = x + 5', 'Lag en tabell for f(x) = x + 5 når x er 0, 1, 2 og 3', ['f(0) = 0 + 5 = 5.', 'f(1) = 1 + 5 = 6.', 'f(2) = 7, og f(3) = 8.', 'Tabell: (0, 5), (1, 6), (2, 7), (3, 8).']),
      C('virkelighet', 'Funksjoner overalt', 'Prisen på et kinobesøk avhenger av hvor mange billetter du kjøper. Strømregningen avhenger av hvor mye strøm du bruker. Hastigheten til bilen avhenger av hvor hardt du trykker på gassen. Alt som avhenger av noe annet, kan beskrives med en funksjon.')
    ])],
    [4, FORK('Stigende, synkende og konstant', '📈', [
      P('Vi kan se på en funksjon og si hva den gjør når x blir større. Det gir tre mulige oppførsler:'),
      K([{ ikon: '📈', tittel: 'Stigende', tekst: 'Når x øker, øker f(x). Eksempel: Jo mer du jobber, jo mer tjener du.' }, { ikon: '📉', tittel: 'Synkende', tekst: 'Når x øker, minker f(x). Eksempel: Jo mer av batteriet du bruker, jo mindre er igjen.' }, { ikon: '➖', tittel: 'Konstant', tekst: 'f(x) endrer seg ikke. Eksempel: Fast månedsavgift uansett bruk.' }]),
      H.FIG(
        sv.l(20, 100, 140, 100, '#94a3b8', 1) + sv.l(20, 20, 20, 100, '#94a3b8', 1) + sv.l(30, 90, 130, 30, POS, 4) + sv.t(80, 118, 'stigende', { s: 14, f: POS }) +
        sv.l(190, 100, 310, 100, '#94a3b8', 1) + sv.l(190, 20, 190, 100, '#94a3b8', 1) + sv.l(200, 30, 300, 90, NEG, 4) + sv.t(250, 118, 'synkende', { s: 14, f: NEG }) +
        sv.l(360, 100, 480, 100, '#94a3b8', 1) + sv.l(360, 20, 360, 100, '#94a3b8', 1) + sv.l(370, 55, 470, 55, NUL, 4) + sv.t(420, 118, 'konstant', { s: 14, f: NUL }),
        500, 130, 'En stigende graf går oppover mot høyre, en synkende graf nedover, og en konstant graf er vannrett.'),
      EK('Hva slags funksjon er f(x) = −2x + 10?', 'Er f(x) = −2x + 10 stigende, synkende eller konstant?', ['Se på tallet foran x. Det er −2, altså negativt.', 'Det betyr at f(x) blir mindre når x øker. Prøv: f(1) = 8, f(2) = 6, f(3) = 4.', 'Svar: synkende.']),
      EK('Sammenlikn to mobilabonnement', 'Abonnement A: 100 + 5x kr. Abonnement B: 40 + 10x kr. Hvilket er billigst ved x = 10 timer?', ['A: 100 + 5 · 10 = 150 kr.', 'B: 40 + 10 · 10 = 140 kr.', 'Svar: B er billigst ved 10 timer. B stiger fortere, så ved nok timer blir A billigst.'])
    ])]
  ]);

  /* ---------- Representasjoner ---------- */
  FK('8/representasjoner', [
    [0, FORK('Fire måter å vise det samme på', '📖', [
      P('En funksjon kan vises på <strong>fire måter</strong>. De viser alle det samme, men er nyttige til ulike ting. Her tar vi funksjonen «Taxi koster 50 kr pluss 10 kr for hver km».'),
      K([{ ikon: '💬', tittel: 'Ord', tekst: '«50 kr pluss 10 kr per km.»' }, { ikon: '🧮', tittel: 'Uttrykk (formel)', tekst: 'f(x) = 10x + 50, der x er antall km.' }, { ikon: '📋', tittel: 'Tabell', tekst: 'x: 0, 1, 2, 3 gir f(x): 50, 60, 70, 80.' }, { ikon: '📈', tittel: 'Graf', tekst: 'En rett linje som starter i 50 og stiger 10 for hver km.' }]),
      W('graf', { params: { a: { min: 1, max: 20, v: 10, steg: 1, navn: 'a (kr per km)' }, b: { min: 0, max: 100, v: 50, steg: 10, navn: 'b (startpris)' } }, funksjoner: [{ f: 'a*x+b', pen: 'lin', navn: 'f(x)', farge: TEAL }], xmin: 0, xmax: 10, ymin: 0, ymax: 200, tabell: true, tabellx: [0, 1, 2, 3, 4, 5], tittel: 'Prøv: dra i a og b, og se grafen og tabellen endre seg' }),
      C('regel', 'Hva er best til hva?', ['<strong>Formel:</strong> kort og nøyaktig. Kan brukes til å regne ut hva som helst.', '<strong>Tabell:</strong> gir bestemte verdier raskt.', '<strong>Graf:</strong> viser utviklingen og sammenlikner lett.', '<strong>Ord:</strong> forklarer hva det handler om.']),
      EK('Fra formel til tabell', 'Lag en tabell for f(x) = 10x + 50 med x = 0, 1, 2, 3', ['x = 0: 10 · 0 + 50 = 50.', 'x = 1: 10 · 1 + 50 = 60.', 'x = 2: 70, x = 3: 80.', 'Tabellen: (0, 50), (1, 60), (2, 70), (3, 80). Hvert par er et punkt i grafen.']),
      EK('Fra tabell til graf', 'Tegn punktene (0, 50), (1, 60), (2, 70) i et koordinatsystem. Hva ser du?', ['Første tall er x (vannrett), andre er y (loddrett).', 'Sett prikker i (0, 50), (1, 60) og (2, 70).', 'Prikkene ligger på en rett linje som stiger jevnt. Det passer med en formel av typen «ax + b».'])
    ])],
    [3, FORK('Lese av grafer og finne formelen', '🔎', [
      P('Et <strong>koordinatsystem</strong> har en vannrett akse (x-aksen) og en loddrett akse (y-aksen). Et punkt skrives (x, y): først hvor langt til høyre, så hvor langt opp. Når du leser av en graf, er det to tall du alltid bør finne:'),
      K([{ ikon: '🏁', tittel: 'Startverdien (b)', tekst: 'Hvor grafen krysser y-aksen, altså verdien når x = 0.' }, { ikon: '⛰️', tittel: 'Stigningen (a)', tekst: 'Hvor mye grafen går opp (eller ned) når x øker med 1.' }]),
      W('graf', { params: { a: { min: -3, max: 3, v: 2, steg: 1, navn: 'a (stigning)' }, b: { min: -5, max: 5, v: 1, steg: 1, navn: 'b (startverdi)' } }, funksjoner: [{ f: 'a*x+b', pen: 'lin', navn: 'f(x)', farge: PLUM }], xmin: -5, xmax: 5, ymin: -10, ymax: 10, tabell: true, tittel: 'Dra i a og b: hvordan endrer linja seg?' }),
      C('regel', 'Formelen for en rett linje', 'f(x) = <strong>a</strong>x + <strong>b</strong>. Her er a stigningen og b startverdien. Går linja nedover, er a negativ.'),
      EK('Finn formelen fra to punkter', 'En rett linje går gjennom (0, 3) og (2, 7). Finn formelen.', ['Startverdien er verdien når x = 0. Det er 3, så b = 3.', 'Fra x = 0 til x = 2 øker y fra 3 til 7. Det er 4 på 2 skritt, altså 2 per skritt. Stigningen er a = 2.', 'Formel: f(x) = 2x + 3.', 'Test: f(2) = 2 · 2 + 3 = 7 ✓.']),
      EK('Les av en graf', 'Grafen går gjennom (0, 10) og (5, 0). Hva sier den om en vannbeholder?', ['Start: 10 liter (verdien når x = 0).', 'Etter 5 minutter er det 0 liter igjen. Vannet minker 10 liter på 5 minutter, altså 2 liter per minutt.', 'Formel: f(x) = −2x + 10. Grafen synker, så a er negativ.'])
    ])]
  ]);

  /* ---------- Algoritmer og programmering ---------- */
  FK('8/programmering', [
    [0, FORK('Hva er en algoritme, og hva er et program?', '📖', [
      P('En <strong>algoritme</strong> er en oppskrift med tydelige steg som løser et problem, og som vil gi riktig svar hver gang. En kakeoppskrift er en algoritme. Så er også «slik finner du største tall i en liste». Et <strong>program</strong> er en algoritme skrevet slik at en datamaskin kan utføre den.'),
      H.FIG(
        sv.r(10, 30, 120, 60, '#dff4f6', TEAL, 12) + sv.t(70, 65, 'Start', { s: 16 }) + sv.pil(130, 60, 170, 60, INK) +
        sv.r(170, 30, 150, 60, '#fff1e3', ORANGE, 12) + sv.t(245, 55, 'Gjør noe', { s: 15 }) + sv.t(245, 74, '(et steg)', { s: 12, f: '#52617a', w: 600 }) + sv.pil(320, 60, 360, 60, INK) +
        sv.r(360, 30, 130, 60, '#eee6fb', PLUM, 12) + sv.t(425, 65, 'Ferdig?', { s: 16 }) + sv.pil(425, 90, 425, 120, INK) + sv.t(425, 138, 'ja: stopp', { s: 13, f: NUL }) + sv.l(360, 60, 360, 130, '#94a3b8', 2, '4 4') + sv.t(345, 125, 'nei: gjenta', { s: 12, f: '#dc2626', a: 'end' }),
        500, 150, 'En algoritme består av steg som gjøres i rekkefølge. Noen ganger gjentar vi steg til vi er ferdige.'),
      C('regel', 'Algoritmer må være', ['<strong>Tydelige:</strong> hvert steg er klart, uten gjetting.', '<strong>I riktig rekkefølge:</strong> rekkefølgen betyr noe.', '<strong>Ferdige til slutt:</strong> de må stoppe og gi et svar.']),
      EK('Algoritme: finn største tall av tre', 'Skriv en algoritme som finner det største av tre tall.', ['Steg 1: Se på det første tallet, og kall det «største».', 'Steg 2: Se på det andre. Er det større enn «største»? Bytt i så fall.', 'Steg 3: Gjør det samme med det tredje.', 'Steg 4: «Største» er svaret.']),
      C('virkelighet', 'Algoritmer er overalt', 'Når TikTok velger hvilken video du får se, når Google Maps finner raskeste vei, og når spillet ditt avgjør hva fienden gjør, er det algoritmer som styrer. Programmering er å skrive dem.')
    ])],
    [2, FORK('Din første Python-kode', '⌨️', [
      P('Vi bruker programmeringsspråket <strong>Python</strong>. Koden skrives linje for linje, og datamaskinen leser den ovenfra og ned. Her er tre ting du trenger å vite:'),
      K([{ ikon: '🖨️', tittel: 'print()', tekst: 'Skriver noe på skjermen. print(5) skriver 5.' }, { ikon: '📦', tittel: 'Variabel', tekst: 'En boks med navn som husker en verdi: x = 5.' }, { ikon: '🧮', tittel: 'Regning', tekst: '+ − * / (der * betyr gange og / betyr dele).' }]),
      W('kode', { tittel: 'Prøv selv: print og variabler', kode: 'x = 5\nprint(x)\nprint(x * 2)', forvent: '5\n10', intro: 'Trykk Kjør. Endre 5 til et annet tall og kjør igjen.' }),
      EK('Hva skrives ut?', 'Hva skriver programmet ut?\n<code>a = 3<br>b = a + 4<br>print(b)</code>', ['Linje 1: a får verdien 3.', 'Linje 2: b = a + 4 = 3 + 4 = 7.', 'Linje 3: print(b) skriver ut verdien til b.', 'Svar: 7.']),
      P('En <strong>løkke</strong> lar datamaskinen gjenta kode. <code>for i in range(3):</code> gjentar 3 ganger. Linjene som skal gjentas, har <strong>innrykk</strong>. Med <code>if</code> kan programmet <strong>velge</strong>, avhengig av en betingelse.'),
      W('kode', { tittel: 'Løkke og if', kode: 'for tall in range(1, 6):\n    if tall % 2 == 0:\n        print(tall, "er partall")\n    else:\n        print(tall, "er oddetall")', forvent: '1 er oddetall\n2 er partall\n3 er oddetall\n4 er partall\n5 er oddetall', intro: '% gir resten ved deling. Et partall har rest 0 når det deles på 2.' }),
      C('husk', 'Feil er normalt!', 'Alle som programmerer gjør feil hele tiden. Feilmeldingen forteller deg hvor det gikk galt. Å lese den og rette feilen er en viktig del av jobben.')
    ])]
  ]);
})();
