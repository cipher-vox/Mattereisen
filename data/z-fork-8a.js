/* Forklaringsseksjoner 8. trinn, del 1: negative tall, regneregler, faktorisering, potenser */
(function () {
  const M = window.MATTE; const H = M.H; const sv = H.sv;
  const { P, C, E, EK, W, TAB, K, FIG, FORK, FK } = H;
  const NEG = '#1d4ed8', POS = '#c2410c', NUL = '#15803d', INK = '#14213d';

  /* ---------- Negative tall ---------- */
  FK('8/negative-tall', [
    [0, FORK('Hva er negative tall?', '📖', [
      P('Hittil har du brukt tall som 1, 2, 3 og så videre. De kalles <strong>positive tall</strong>. Men noen ganger trenger vi tall som er <strong>mindre enn null</strong>. Da bruker vi <strong>negative tall</strong>. De skrives med et minustegn foran, for eksempel −3.'),
      H.FIG(
        sv.r(20, 10, 300, 62, '#fff1e3', '#c2410c') + sv.r(20, 110, 300, 62, '#dbe6ff', '#1d4ed8') + sv.l(20, 91, 320, 91, NUL, 4) +
        sv.t(70, 50, '+3 °C', { f: POS, s: 20 }) + sv.t(235, 50, 'Varmt: over 0', { f: POS, s: 14 }) +
        sv.t(70, 148, '−3 °C', { f: NEG, s: 20 }) + sv.t(235, 148, 'Kaldt: under 0', { f: NEG, s: 14 }) + sv.t(332, 96, '0', { f: NUL, s: 16, a: 'start' }),
        360, 182, 'Null er grensen. Over null er tallene positive, under null er de negative.'),
            P('<strong>Hvor ser vi negative tall?</strong>'),
      K([{ ikon: '🌡️', tittel: 'Temperatur', tekst: '−5 °C betyr fem grader under frysepunktet.' }, { ikon: '🏦', tittel: 'Penger', tekst: 'Hvis du skylder 100 kr, kan det skrives som −100 kr på kontoen din.' }, { ikon: '🏢', tittel: 'Etasjer', tekst: 'I en parkeringskjeller er etasjene −1, −2 og −3.' }, { ikon: '🌊', tittel: 'Høyde', tekst: 'Havbunnen kan ligge på −200 meter, altså 200 meter under havet.' }]),
      P('Alle tall kan plasseres på en <strong>tallinje</strong>. Null ligger i midten. Positive tall ligger til høyre, negative til venstre. Jo lenger til høyre et tall ligger, jo større er det.'),
      W('tallinje', { a: -3, op: '+', b: 0, tittel: 'Tallinja: negative tall ligger til venstre for null' }),
      C('regel', 'Slik sammenlikner du', ['Alle positive tall er større enn alle negative tall.', 'Av to negative tall er det som ligger lengst til høyre, størst. Altså er −2 større enn −7.', 'Et negativt tall med stor verdi uten minus er «langt under null»: −9 er mindre enn −1.']),
      EK('Hvilket tall er størst: −8 eller −3?', 'Hvilket tall er størst: −8 eller −3?', ['Tegn tallinja i hodet. −8 ligger langt til venstre, −3 nærmere null.', 'Tallet som ligger lengst til høyre, er størst.', 'Svar: −3 er større enn −8. Tenk på kulde: −3 grader er varmere enn −8 grader.'], { widget: 'termometer', opts: { v: -3, tittel: '−3 grader eller −8 grader?' } }),
      EK('Sett i rekkefølge fra minst til størst: 4, −2, 0, −7, 3', 'Sett tallene i rekkefølge fra minst til størst: 4, −2, 0, −7, 3', ['Finn først de negative tallene: −2 og −7. Av dem er −7 minst (lengst til venstre).', 'Så kommer −2, deretter 0.', 'Til slutt de positive i rekkefølge: 3 og 4.', 'Svar: −7, −2, 0, 3, 4.']),
      C('virkelighet', 'Hvorfor trenger vi negative tall?', 'Uten negative tall kunne vi ikke beskrevet vinterkulda, gjeld på en konto eller hvor dypt en ubåt er. Når du regner med gjeld og kulde, bruker du negative tall hver dag, ofte uten å tenke over det.')
    ])],
    [2, FORK('Pluss og minus med negative tall', '➕', [
      P('Å regne med negative tall er lettest hvis du tenker på <strong>tallinja</strong>. Du starter på det første tallet og <strong>hopper</strong>. Pluss betyr hopp til <strong>høyre</strong>. Minus betyr hopp til <strong>venstre</strong>.'),
      W('tallinje', { a: -3, op: '+', b: 5, tittel: 'Prøv selv: start i −3 og legg til 5' }),
      TAB(['Regnestykke', 'Hva skjer på tallinja?', 'Svar'], [['3 + 4', 'Start i 3, hopp 4 mot høyre', '7'], ['3 − 4', 'Start i 3, hopp 4 mot venstre', '−1'], ['−3 + 4', 'Start i −3, hopp 4 mot høyre', '1'], ['−3 − 4', 'Start i −3, hopp 4 mot venstre', '−7']]),
      P('Nå kommer det som ofte forvirrer: <strong>to minustegn etter hverandre</strong>. Da gjelder en regel som er verdt å huske:'),
      C('regel', 'To minus blir pluss', ['Å trekke fra et negativt tall er det samme som å legge til: <strong>5 − (−3) = 5 + 3 = 8</strong>.', 'Å legge til et negativt tall er det samme som å trekke fra: <strong>5 + (−3) = 5 − 3 = 2</strong>.']),
      P('Hvorfor? Tenk på <strong>gjeld</strong>. Hvis noen tar bort en gjeld på 3 kr fra deg (du trekker fra −3), blir du 3 kr rikere. Å fjerne noe negativt er det samme som å få noe positivt.'),
      W('brikker', { a: 3, op: '-', b: -2, tittel: 'Minus et negativt tall med brikker: du fjerner blå brikker' }),
      EK('Regn ut: −2 − (−6)', 'Regn ut −2 − (−6)', ['Minus et negativt tall blir pluss. Skriv om: −2 − (−6) = −2 + 6.', 'Start i −2 på tallinja og hopp 6 mot høyre.', 'Svar: 4.'], { widget: 'tallinje', opts: { a: -2, op: '-', b: -6, tittel: '−2 − (−6)' } }),
      EK('Temperaturen er −4 °C og faller 5 grader. Hva blir den?', 'Temperaturen er −4 °C. Den faller 5 grader. Hva er temperaturen nå?', ['Faller betyr at vi trekker fra: −4 − 5.', 'Start i −4 og hopp 5 mot venstre: −5, −6, −7, −8, −9.', 'Svar: −9 °C.']),
      C('virkelighet', 'Hvor bruker vi dette?', 'Bankkonto (innskudd og uttak), temperaturendringer, høydeforskjell mellom fjell og havdyp, og poengsystemer i spill der du kan få minuspoeng.')
    ])],
    [4, FORK('Gange og dele med negative tall', '✖️', [
      P('Når du ganger eller deler, er det <strong>fortegnene</strong> som avgjør om svaret blir positivt eller negativt. Du kan finne reglene ved å se på et <strong>mønster</strong>:'),
      TAB(['Regnestykke', 'Svar'], [['3 · 3', '9'], ['2 · 3', '6'], ['1 · 3', '3'], ['0 · 3', '0'], ['−1 · 3', '−3'], ['−2 · 3', '−6']]),
      P('Se hvordan svaret går ned med 3 hver gang. Da må −1 · 3 bli −3 og −2 · 3 bli −6. Å gange et negativt tall med et positivt tall gir derfor et <strong>negativt</strong> svar.'),
      C('regel', 'Fortegnsreglene for gange og dele', ['<strong>Like fortegn</strong> gir positivt svar: (+) · (+) = +, og (−) · (−) = +.', '<strong>Ulike fortegn</strong> gir negativt svar: (+) · (−) = −, og (−) · (+) = −.', 'Samme regler gjelder for å dele.']),
      W('fortegn', { op: '*', tittel: 'Fortegnsmaskinen: prøv ulike tall' }),
      P('<strong>Slik gjør du:</strong> Først finner du fortegnet (like eller ulike?). Deretter regner du som vanlig uten fortegn.'),
      EK('Regn ut: (−4) · (−5)', 'Regn ut (−4) · (−5)', ['Fortegnene er like (begge er minus), så svaret blir positivt.', 'Regn uten fortegn: 4 · 5 = 20.', 'Svar: 20.']),
      EK('Regn ut: 18 : (−3)', 'Regn ut 18 : (−3)', ['Fortegnene er ulike (pluss og minus), så svaret blir negativt.', 'Regn uten fortegn: 18 : 3 = 6.', 'Svar: −6.']),
      C('husk', 'Vanlig feil', 'Mange tror at minus ganger minus blir minus. Husk at <strong>like fortegn gir pluss</strong>. Tenk: «venn av min fiende er min fiende», men «fiende av min fiende er min venn».')
    ])]
  ]);

  /* ---------- Regneregler og hoderegning ---------- */
  FK('8/regneregler', [
    [0, FORK('Regnerekkefølge og regneregler', '📖', [
      P('Når et regnestykke har flere regneoperasjoner, må alle regne i samme rekkefølge for å få samme svar. Det er derfor vi har <strong>regneregler</strong>. De sier hva du skal regne først.'),
      C('regel', 'Regnerekkefølgen', ['1. <strong>Parenteser</strong> først.', '2. Deretter <strong>potenser</strong> (som 3²).', '3. Så <strong>gange og dele</strong>, fra venstre mot høyre.', '4. Til slutt <strong>pluss og minus</strong>, fra venstre mot høyre.']),
      H.FIG(
        sv.r(10, 20, 150, 50, '#ffe4e1', '#dc2626') + sv.t(85, 52, '1. Parentes', { s: 16 }) + sv.pil(160, 45, 190, 45, INK) +
        sv.r(190, 20, 150, 50, '#ede9fe', '#6d3fc9') + sv.t(265, 52, '2. Potens', { s: 16 }) + sv.pil(340, 45, 370, 45, INK) +
        sv.r(370, 20, 150, 50, '#fff1e3', '#c2650b') + sv.t(445, 52, '3. · og :', { s: 16 }) + sv.pil(445, 70, 445, 100, INK) +
        sv.r(370, 100, 150, 50, '#dcfce7', '#15803d') + sv.t(445, 132, '4. + og −', { s: 16 }),
        540, 170, 'Regn i denne rekkefølgen: parentes, potens, gange og dele, pluss og minus.'),
      EK('Hvorfor blir 2 + 3 · 4 lik 14 og ikke 20?', 'Regn ut 2 + 3 · 4', ['Gange regnes før pluss, så vi regner 3 · 4 først. Det er 12.', 'Så er det 2 + 12.', 'Svar: 14. Ville vi regnet fra venstre, hadde vi fått 20, og det er feil.']),
      EK('Regn ut: (2 + 3) · 4', 'Regn ut (2 + 3) · 4', ['Parentesen står først, så vi regner 2 + 3 = 5.', 'Så er det 5 · 4.', 'Svar: 20. Parentesen endret svaret fra 14 til 20.']),
      EK('Regn ut: 20 − 2 · 3² + 4', 'Regn ut 20 − 2 · 3² + 4', ['Potens først: 3² = 9. Nå står det 20 − 2 · 9 + 4.', 'Gange: 2 · 9 = 18. Nå står det 20 − 18 + 4.', 'Pluss og minus fra venstre: 20 − 18 = 2, og 2 + 4 = 6.', 'Svar: 6.']),
      C('virkelighet', 'Hvorfor er dette viktig?', 'Kalkulatorer, regneark og programmering følger akkurat de samme reglene. Hvis du ikke kan dem, tror du at maskinen regner feil, mens det egentlig er regnestykket som er skrevet uklart.')
    ])],
    [1, FORK('Regnereglene som gjør hoderegning lettere', '🧠', [
      P('Tre regler lar deg flytte rundt på tall og dele opp regnestykker, slik at hoderegning blir enklere. De heter litt vanskelige navn, men ideen er enkel.'),
      K([{ ikon: '🔄', tittel: 'Kommutativ: bytt om', tekst: 'Rekkefølgen kan byttes ved pluss og gange: 4 + 9 = 9 + 4, og 3 · 7 = 7 · 3.' }, { ikon: '🧺', tittel: 'Assosiativ: grupper', tekst: 'Du kan velge hva som regnes først: (25 · 4) · 7 = 25 · (4 · 7).' }, { ikon: '✂️', tittel: 'Distributiv: del opp', tekst: 'a · (b + c) = a · b + a · c. Del opp det vanskelige tallet.' }]),
      W('arealmodell', { type: 'dist', a: 7, b: 6, c: 3, tittel: 'Del opp rektanglet: 7 · 9 = 7 · 6 + 7 · 3' }),
      C('regel', 'Merk', 'Pluss og gange kan byttes om. <strong>Minus og dele kan ikke byttes om:</strong> 10 − 4 er ikke det samme som 4 − 10.'),
      EK('Regn i hodet: 4 · 17 · 25', 'Regn ut 4 · 17 · 25 i hodet', ['Bytt om og grupper: 4 · 25 er lett, det er 100.', 'Nå står det 100 · 17.', 'Svar: 1700.']),
      EK('Regn i hodet: 6 · 98', 'Regn ut 6 · 98 i hodet', ['98 er nesten 100. Skriv 98 = 100 − 2.', 'Del opp: 6 · 100 − 6 · 2 = 600 − 12.', 'Svar: 588.']),
      C('virkelighet', 'Bruk i hverdagen', 'Handler du tre varer til 49 kr hver, tenk 3 · 50 − 3 = 147. Skal du dele regningen? Del opp tallene på en måte som passer deg.')
    ])]
  ]);

  /* ---------- Faktorisering og primtall ---------- */
  FK('8/faktorisering', [
    [0, FORK('Faktorer, delelighet og primtall', '📖', [
      P('En <strong>faktor</strong> er et tall som går opp i et annet tall. Faktorene til 12 er 1, 2, 3, 4, 6 og 12, fordi 12 kan deles på alle disse uten rest. Faktorer kommer alltid i par: 1 · 12, 2 · 6 og 3 · 4.'),
      H.FIG(
        sv.r(10, 10, 60, 40, '#dff4f6', '#0e8a96') + sv.t(40, 38, '1 · 12', { s: 15 }) + sv.r(80, 10, 60, 40, '#dff4f6', '#0e8a96') + sv.t(110, 38, '2 · 6', { s: 15 }) + sv.r(150, 10, 60, 40, '#dff4f6', '#0e8a96') + sv.t(180, 38, '3 · 4', { s: 15 }),
        220, 60, 'Tallet 12 kan skrives som produkt på tre måter. Det gir seks faktorer.'),
      C('regel', 'Delelighetsregler', ['Delelig med <strong>2</strong>: siste siffer er 0, 2, 4, 6 eller 8.', 'Delelig med <strong>5</strong>: siste siffer er 0 eller 5.', 'Delelig med <strong>10</strong>: siste siffer er 0.', 'Delelig med <strong>3</strong>: tverrsummen kan deles på 3 (for eksempel 123: 1 + 2 + 3 = 6).', 'Delelig med <strong>9</strong>: tverrsummen kan deles på 9.']),
      P('Et <strong>primtall</strong> er et tall som bare har to faktorer: 1 og seg selv. De første primtallene er 2, 3, 5, 7, 11, 13, 17, 19, 23 og 29. Tallet 1 er ikke et primtall, og 2 er det eneste partallet som er primtall. Tall som har flere faktorer, kalles <strong>sammensatte</strong> tall.'),
      EK('Er 91 et primtall?', 'Er 91 et primtall?', ['Test små primtall. Ikke 2 (oddetall), ikke 3 (9 + 1 = 10), ikke 5.', 'Prøv 7: 7 · 13 = 91.', 'Svar: Nei, 91 = 7 · 13. Det ser ut som et primtall, men er det ikke!']),
      EK('Er 123 delelig med 3?', 'Er 123 delelig med 3?', ['Finn tverrsummen: 1 + 2 + 3 = 6.', '6 er delelig med 3.', 'Svar: Ja, 123 = 3 · 41.']),
      C('virkelighet', 'Hvor brukes primtall?', 'Primtall brukes til å lage koder som beskytter nettbanken din og meldinger du sender. Det er lett å gange store primtall, men svært vanskelig å finne primtallene igjen fra produktet.')
    ])],
    [2, FORK('Primtallsfaktorisering og faktortre', '🌳', [
      P('Alle tall som ikke er primtall, kan skrives som et <strong>produkt av primtall</strong>. Det kalles <strong>primtallsfaktorisering</strong>. Hvert tall har bare én slik faktorisering (bortsett fra rekkefølgen).'),
      P('Et <strong>faktortre</strong> hjelper deg å finne den. Du deler tallet i to faktorer, og fortsetter til alle «greinene» ender på primtall.'),
      W('faktortre', { n: 60, tittel: 'Faktortre for 60: prøv andre tall' }),
      EK('Faktoriser 72 med faktortre', 'Skriv 72 som et produkt av primtall', ['Del 72 i to faktorer, for eksempel 8 · 9.', 'Del videre: 8 = 2 · 4 = 2 · 2 · 2, og 9 = 3 · 3.', 'Alle greinene ender nå på primtall: 2, 2, 2, 3, 3.', 'Svar: 72 = 2 · 2 · 2 · 3 · 3 = 2³ · 3².']),
      P('<strong>Hva kan vi bruke faktorisering til?</strong> Den største felles faktoren (SFF) og minste felles multiplum (MFM) finner du lettest slik.'),
      EK('Finn SFF og MFM for 12 og 18', 'Finn største felles faktor og minste felles multiplum for 12 og 18', ['Faktoriser: 12 = 2 · 2 · 3 og 18 = 2 · 3 · 3.', 'SFF er det de har felles: 2 · 3 = 6.', 'MFM tar med alle faktorene, men bare så mange ganger som trengs: 2 · 2 · 3 · 3 = 36.', 'Svar: SFF = 6 og MFM = 36.']),
      C('virkelighet', 'Hvor bruker vi det?', 'SFF brukes for å forkorte brøker. MFM brukes for å finne felles nevner, og til å finne når to ting som gjentar seg (for eksempel to busser) møtes igjen.')
    ])]
  ]);

  /* ---------- Potenser ---------- */
  FK('8/potenser', [
    [0, FORK('Hva er en potens?', '📖', [
      P('En <strong>potens</strong> er en kort måte å skrive gjentatt gange. I stedet for 2 · 2 · 2 · 2 · 2 skriver vi 2⁵. Tallet som gjentas (2), kalles <strong>grunntallet</strong>. Tallet som sier hvor mange ganger (5), kalles <strong>eksponenten</strong>.'),
      H.FIG(
        sv.t(110, 70, '2', { s: 56, f: '#c2410c' }) + sv.t(150, 40, '5', { s: 30, f: '#1d4ed8' }) + sv.pil(110, 110, 110, 90, '#c2410c') + sv.t(110, 130, 'grunntall', { s: 14, f: '#c2410c' }) + sv.pil(170, 20, 190, 20, '#1d4ed8') + sv.t(245, 25, 'eksponent', { s: 14, f: '#1d4ed8' }) +
        sv.t(360, 70, '= 2 · 2 · 2 · 2 · 2 = 32', { s: 24, a: 'start' }),
        660, 150, '2⁵ betyr at 2 ganges med seg selv 5 ganger. Svaret er 32.'),
      W('potens', { a: 2, n: 5, tittel: 'Potensbygger: se hvordan en potens vokser' }),
      P('<strong>Pass på:</strong> 2⁵ er <em>ikke</em> 2 · 5! Det er 2 · 2 · 2 · 2 · 2 = 32. Og 3² (« tre i andre ») er 3 · 3 = 9, ikke 6.'),
      TAB(['Potens', 'Betyr', 'Svar'], [['3²', '3 · 3', '9'], ['2³', '2 · 2 · 2', '8'], ['10⁴', '10 · 10 · 10 · 10', '10 000'], ['5¹', '5', '5'], ['7⁰', 'alt opphøyd i 0', '1']]),
      C('regel', 'Spesielle potenser', ['Eksponent 1: a¹ = a.', 'Eksponent 0: a⁰ = 1 (for alle tall unntatt 0).', 'Negative grunntall: (−2)² = 4, men (−2)³ = −8. Partall som eksponent gir positivt svar, oddetall gir negativt.']),
      EK('Regn ut 4³', 'Regn ut 4³', ['Eksponenten 3 sier at vi ganger 4 med seg selv 3 ganger.', '4 · 4 · 4 = 16 · 4.', 'Svar: 64.']),
      EK('Regn ut (−3)²', 'Regn ut (−3)²', ['Parentesen betyr at hele −3 er grunntallet: (−3) · (−3).', 'Like fortegn gir positivt svar. 3 · 3 = 9.', 'Svar: 9. (Merk: −3² uten parentes betyr −(3²) = −9.)']),
      C('virkelighet', 'Potenser i naturen', 'Potenser beskriver ting som vokser veldig fort: bakterier som dobler seg hver time (2, 4, 8, 16 …), rykter som sprer seg, og størrelsen på lagringsplass (1 GB = 2³⁰ byte).')
    ])],
    [3, FORK('Regneregler for potenser og tierpotenser', '🔟', [
      P('Når potenser har <strong>samme grunntall</strong>, kan vi regne dem sammen på en lur måte. Se hva som skjer når vi skriver ut:'),
      EK('Hvorfor er 2³ · 2⁴ = 2⁷?', 'Regn ut 2³ · 2⁴ på en lur måte', ['Skriv ut: 2³ = 2 · 2 · 2, og 2⁴ = 2 · 2 · 2 · 2.', 'Til sammen er det 3 + 4 = 7 toere som skal ganges.', 'Svar: 2³ · 2⁴ = 2⁷ = 128.']),
      C('regel', 'Tre regler', ['<strong>Gange:</strong> aᵐ · aⁿ = aᵐ⁺ⁿ. Pluss eksponentene.', '<strong>Dele:</strong> aᵐ : aⁿ = aᵐ⁻ⁿ. Trekk fra eksponentene.', '<strong>Potens av potens:</strong> (aᵐ)ⁿ = aᵐ·ⁿ. Gang eksponentene.']),
      P('<strong>Tierpotenser</strong> er potenser med grunntall 10. De er veldig nyttige, fordi eksponenten forteller hvor mange nuller det er:'),
      TAB(['Potens', 'Tall'], [['10²', '100'], ['10³', '1 000'], ['10⁶', '1 000 000'], ['10⁻¹', '0,1'], ['10⁻³', '0,001']]),
      W('potens', { tier: true, n: 3, tittel: 'Tierpotenser: dra i eksponenten' }),
      P('Med tierpotenser kan vi skrive veldig store og veldig små tall i <strong>standardform</strong>: et tall mellom 1 og 10 ganget med en tierpotens.'),
      EK('Skriv 4 500 000 i standardform', 'Skriv 4 500 000 på standardform', ['Flytt komma til det står rett bak første siffer: 4,5.', 'Tell hvor mange plasser du flyttet kommaet: 6 plasser.', 'Svar: 4,5 · 10⁶.']),
      C('virkelighet', 'Store og små tall', 'Avstanden til sola er omtrent 1,5 · 10⁸ km. Bredden på et hårstrå er omtrent 8 · 10⁻⁵ m. Standardform gjør at vi slipper å telle nuller.')
    ])]
  ]);
})();
