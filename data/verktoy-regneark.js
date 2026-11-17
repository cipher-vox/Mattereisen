/* ============================================================
   Verktøy: Regneark (Excel) fra scratch – UTFORSK
   Regnearket her fungerer som Excel og Google Regneark.
   Læreplan: digitale ferdigheter (regneark), 7.–10. trinn
   ============================================================ */
(function () {
  const M = window.MATTE;
  const ORD = [
    { ord: ['regneark', 'regnearket'], forklaring: 'Et program med en stor tabell av ruter. Du kan skrive tall og formler i rutene, og regnearket regner for deg.' },
    { ord: ['celle', 'celler', 'cellen'], forklaring: 'Én rute i regnearket. Den har en adresse, for eksempel B3.' },
    { ord: ['kolonne', 'kolonner'], forklaring: 'En loddrett rekke med celler. Kolonnene har bokstaver: A, B, C …' },
    { ord: ['rad', 'rader'], forklaring: 'En vannrett rekke med celler. Radene har tall: 1, 2, 3 …' },
    { ord: ['formel', 'formler', 'formelen'], forklaring: 'En regneregel du skriver i en celle. Den starter alltid med likhetstegn (=).' },
    { ord: ['cellereferanse', 'celleadresse', 'adresse'], forklaring: 'Navnet på en celle: kolonnebokstav og radnummer, som C4.' },
    { ord: ['område', 'området'], forklaring: 'Flere celler sammen, skrevet med kolon: B2:B6 er cellene fra B2 til B6.' },
    { ord: ['diagram', 'diagrammer'], forklaring: 'Et bilde av tall, for eksempel et søylediagram eller et linjediagram.' },
    { ord: ['absolutt adresse', 'absolutt'], forklaring: 'En celleadresse med dollartegn, som $B$1. Den endrer seg ikke når du kopierer formelen.' },
    { ord: ['gjennomsnitt', 'gjennomsnittet'], forklaring: 'Summen av tallene delt på hvor mange det er.' }
  ];
  const S = [];
  const fyll = (kol, fra, til, f) => { const o = {}; for (let r = fra; r <= til; r++) o[kol + r] = f(r); return o; };

  /* ---------- 1 ---------- */
  S.push({
    tittel: 'Hva er et regneark?', ikon: '🧮',
    blokker: [
      { t: 'p', tekst: 'Et <strong>regneark</strong> (som Excel eller Google Regneark) er en stor tabell. Hver rute heter en <strong>celle</strong>. Du kan skrive tall, tekst og <strong>formler</strong> i cellene, og regnearket regner ut svar for deg. Endrer du et tall, regnes alt som henger sammen ut på nytt av seg selv.' },
      { t: 'kort', kort: [
        { ikon: '↔️', tittel: 'Kolonner', tekst: 'Loddrette rekker. De har <strong>bokstaver</strong>: A, B, C …' },
        { ikon: '↕️', tittel: 'Rader', tekst: 'Vannrette rekker. De har <strong>tall</strong>: 1, 2, 3 …' },
        { ikon: '📍', tittel: 'Celleadresse', tekst: 'Kolonne + rad. Cellen i kolonne B og rad 3 heter <strong>B3</strong>.' }
      ] },
      { t: 'widget', navn: 'regneark', opts: { tittel: 'Utforsk et regneark', kolonner: 5, rader: 6, intro: 'Klikk på ulike celler. Se på adressen til venstre over regnearket og på innholdet i feltet ved siden av.', start: { A1: 'Frukt', B1: 'Pris', A2: 'Eple', B2: '12', A3: 'Banan', B3: '8', A4: 'Appelsin', B4: '15' } } },
      { t: 'callout', stil: 'tips', tittel: 'Slik bruker du regnearket her', punkter: ['<strong>Klikk</strong> på en celle og begynn å skrive. Trykk <strong>Enter</strong> når du er ferdig.', 'Piltastene flytter deg rundt. <strong>Delete</strong> tømmer cellen.', '<strong>Shift + klikk</strong> merker flere celler.', 'Alt du gjør, forsvinner når du laster siden på nytt. Ingenting lagres.'] },
      { t: 'oppgaver', niva: 1, oppgaver: [
        { type: 'valg', tekst: 'Hva heter cellen i <strong>kolonne C</strong> og <strong>rad 5</strong>?', valg: ['C5', '5C', 'C 5', 'E3'], riktig: 0, hint: 'Først kolonnebokstaven, så radnummeret.', losning: 'Celleadressen skrives med kolonnebokstav først, deretter radnummer: C5.' },
        { type: 'valg', tekst: 'I regnearket over: hva står i celle B3?', valg: ['8', '12', 'Banan', '15'], riktig: 0, hint: 'Kolonne B, rad 3.', losning: 'Rad 3 er bananen, og prisen står i kolonne B: 8.' },
        { type: 'valg', tekst: 'Hvilken celle inneholder teksten «Appelsin»?', valg: ['A4', 'B4', 'A3', 'A1'], riktig: 0, hint: 'Teksten står i første kolonne, i rad 4.', losning: 'Appelsin står i kolonne A, rad 4: A4.' },
        { type: 'valg', tekst: 'Hva er en celle?', valg: ['Én rute i regnearket', 'En hel rad', 'Et diagram', 'En formel'], riktig: 0, fast: true, hint: 'Tenk på én rute i tabellen.', losning: 'En celle er én rute i regnearket. Den har en adresse, som B3.' }
      ] }
    ]
  });

  /* ---------- 2 ---------- */
  S.push({
    tittel: 'Skrive tall og tekst', ikon: '⌨️',
    blokker: [
      { t: 'p', tekst: 'Tall og tekst oppfører seg litt ulikt. <strong>Tall</strong> havner ofte til <strong>høyre</strong> i cellen og kan brukes i regning. <strong>Tekst</strong> havner til <strong>venstre</strong>. Desimaltall skriver du med komma, som du er vant til: <code>2,5</code>.' },
      { t: 'widget', navn: 'regneark', opts: { tittel: 'Oppdrag: fyll ut tabellen', kolonner: 4, rader: 5, intro: 'Skriv <strong>Ola</strong> i A2 og tallet <strong>25</strong> i B2. Skriv deretter <strong>Mia</strong> i A3 og tallet <strong>31,5</strong> i B3. Trykk Sjekk.', start: { A1: 'Navn', B1: 'Poeng' }, laast: { A1: 1, B1: 1 }, sjekk: [{ celle: 'A2', verdi: 'Ola', formel: false, hint: 'Skriv Ola i A2.' }, { celle: 'B2', verdi: 25, formel: false, hint: 'Skriv 25 i B2.' }, { celle: 'A3', verdi: 'Mia', formel: false, hint: 'Skriv Mia i A3.' }, { celle: 'B3', verdi: 31.5, formel: false, hint: 'Skriv 31,5 i B3. Bruk komma.' }], losning: { A2: 'Ola', B2: '25', A3: 'Mia', B3: '31,5' } } },
      { t: 'callout', stil: 'advarsel', tittel: 'Tall som tekst', tekst: 'Hvis et tall står til venstre i cellen, tror regnearket at det er tekst. Da kan du ikke regne med det. Sjekk at du har brukt komma (ikke punktum) og ingen bokstaver i tallet.' },
      { t: 'oppgaver', niva: 1, oppgaver: [
        { type: 'valg', tekst: 'Du skriver <code>3,5</code> i en celle. Hvor havner det vanligvis?', valg: ['Til høyre (det er et tall)', 'Til venstre (det er tekst)', 'Det går ikke', 'I en ny rad'], riktig: 0, hint: 'Tall står til høyre.', losning: 'Regnearket gjenkjenner 3,5 som et tall, og tall står til høyre.' },
        { type: 'valg', tekst: 'Hva må du gjøre for å kunne regne med tallet i en celle?', valg: ['Bare skrive tallet (uten bokstaver)', 'Sette anførselstegn rundt', 'Skrive det med store bokstaver', 'Ingenting'], riktig: 0, hint: 'Rene tall kan regnes med.', losning: 'Skriver du tallet uten bokstaver eller anførselstegn, regner regnearket det som et tall.' }
      ] }
    ]
  });

  /* ---------- 3 ---------- */
  S.push({
    tittel: 'Formler: la regnearket regne', ikon: '➕',
    blokker: [
      { t: 'p', tekst: 'En <strong>formel</strong> starter alltid med <strong>=</strong>. Du kan regne med vanlige tall (<code>=5+3</code>), men det fine er at du kan regne med <strong>andre celler</strong>: <code>=A1+B1</code> betyr «legg sammen det som står i A1 og B1». Endrer du tallene, endres svaret av seg selv.' },
      { t: 'tabell', hode: ['Regneart', 'Tegn', 'Eksempel'], rader: [['Pluss', '+', '=A1+B1'], ['Minus', '-', '=A1-B1'], ['Gange', '*', '=A1*B1'], ['Dele', '/', '=A1/B1'], ['Potens', '^', '=A1^2'], ['Parentes', '( )', '=(A1+B1)*2']] },
      { t: 'widget', navn: 'regneark', opts: { tittel: 'Endre tallene og se hva som skjer', kolonner: 5, rader: 5, intro: 'C1 og D1 inneholder formler. Endre tallet i A1 eller B1, og se at svarene endres umiddelbart.', start: { A1: '5', B1: '3', C1: '=A1+B1', D1: '=A1*B1', A3: 'Summen står i C1 og produktet i D1.' } } },
      { t: 'callout', stil: 'regel', tittel: 'Husk', punkter: ['Formler starter med <strong>=</strong>. Uten = er det bare tekst.', 'Bruk <strong>celleadresser</strong> i stedet for å skrive tallene selv. Da oppdateres svaret når tallene endres.', 'Regnerekkefølgen er som i matte: parenteser, potens, gange og dele, pluss og minus.'] },
      { t: 'widget', navn: 'regneark', opts: { tittel: 'Oppdrag: lag en formel', kolonner: 4, rader: 4, intro: 'I A1 står 5 og i B1 står 3. Skriv en formel i <strong>C1</strong> som regner ut <strong>A1 opphøyd i 2, pluss B1</strong>. Svaret skal bli 28. Bruk celleadressene, ikke tallene.', start: { A1: '5', B1: '3', A3: 'Svar i C1:' }, sjekk: [{ celle: 'C1', verdi: 28, hint: 'Bruk =A1^2+B1' }], losning: { C1: '=A1^2+B1' }, losningTekst: 'A1^2 betyr 5 · 5 = 25, og 25 + 3 = 28.' } },
      { t: 'oppgaver', niva: 2, oppgaver: [
        { type: 'tall', tekst: 'A1 inneholder 6 og B1 inneholder 4. Hva blir svaret i cellen med formelen <code>=A1*B1-2</code>?', svar: 22, hint: 'Gange før minus.', losning: '6 · 4 = 24, og 24 − 2 = 22.' },
        { type: 'tall', tekst: 'A1 inneholder 10. Hva blir svaret av <code>=A1/4+1</code>?', svar: 3.5, hint: '10 / 4 først.', losning: '10 / 4 = 2,5, og 2,5 + 1 = 3,5.' },
        { type: 'tall', tekst: 'A1 = 3 og B1 = 4. Hva blir <code>=A1^2+B1^2</code>?', svar: 25, hint: 'Kvadrer hver for seg.', losning: '3² = 9 og 4² = 16. Summen er 25. (Pytagoras: 3-4-5!)' },
        { type: 'valg', tekst: 'Hva skjer med svaret i C1 (<code>=A1+B1</code>) hvis du endrer A1?', valg: ['Svaret oppdateres automatisk', 'Ingenting', 'Formelen slettes', 'Du får en feilmelding'], riktig: 0, fast: true, hint: 'Regnearket regner på nytt.', losning: 'Formler bruker verdiene i cellene, så svaret oppdateres av seg selv når cellene endres.' }
      ] }
    ]
  });

  /* ---------- 4 ---------- */
  S.push({
    tittel: 'Funksjoner: summer og gjennomsnitt', ikon: '🧰',
    blokker: [
      { t: 'p', tekst: 'Regnearket har innebygde funksjoner som gjør mye arbeid for deg. Du skriver et funksjonsnavn og setter et <strong>område</strong> av celler i parentes. Området B2:B6 betyr «alle cellene fra B2 til B6».' },
      { t: 'tabell', hode: ['Norsk', 'Engelsk', 'Hva den gjør', 'Eksempel'], rader: [['SUMMA', 'SUM', 'Legger sammen', '=SUMMA(B2:B6)'], ['GJENNOMSNITT', 'AVERAGE', 'Gjennomsnitt', '=GJENNOMSNITT(B2:B6)'], ['MAKS', 'MAX', 'Største tall', '=MAKS(B2:B6)'], ['MIN', 'MIN', 'Minste tall', '=MIN(B2:B6)'], ['ANTALL', 'COUNT', 'Teller tall', '=ANTALL(B2:B6)'], ['MEDIAN', 'MEDIAN', 'Medianen', '=MEDIAN(B2:B6)'], ['AVRUND', 'ROUND', 'Runder av', '=AVRUND(A1;2)']] },
      { t: 'callout', stil: 'tips', tittel: 'Norsk eller engelsk?', tekst: 'Norsk Excel bruker norske navn (SUMMA) og semikolon mellom verdiene. Engelsk Excel bruker SUM og komma. Regnearket her forstår begge delene.' },
      { t: 'widget', navn: 'regneark', opts: { tittel: 'Oppdrag: statistikk for en prøve', kolonner: 3, rader: 11, intro: 'Under er poengene til fem elever. Bruk funksjoner (ikke regn selv) og skriv: <strong>B8</strong> = summen, <strong>B9</strong> = gjennomsnittet, <strong>B10</strong> = største poengsum, <strong>B11</strong> = minste poengsum.', start: { A1: 'Elev', B1: 'Poeng', A2: 'Ali', B2: '24', A3: 'Bea', B3: '31', A4: 'Carl', B4: '18', A5: 'Dina', B5: '27', A6: 'Eli', B6: '31', A8: 'Sum', A9: 'Gjennomsnitt', A10: 'Størst', A11: 'Minst' }, laast: { A1: 1, B1: 1, A2: 1, B2: 1, A3: 1, B3: 1, A4: 1, B4: 1, A5: 1, B5: 1, A6: 1, B6: 1 }, sjekk: [{ celle: 'B8', verdi: 131, hint: '=SUMMA(B2:B6)' }, { celle: 'B9', verdi: 26.2, hint: '=GJENNOMSNITT(B2:B6)' }, { celle: 'B10', verdi: 31, hint: '=MAKS(B2:B6)' }, { celle: 'B11', verdi: 18, hint: '=MIN(B2:B6)' }], losning: { B8: '=SUMMA(B2:B6)', B9: '=GJENNOMSNITT(B2:B6)', B10: '=MAKS(B2:B6)', B11: '=MIN(B2:B6)' }, ros: 'Sum 131, gjennomsnitt 26,2, største 31 og minste 18.' } },
      { t: 'oppgaver', niva: 2, oppgaver: [
        { type: 'tall', tekst: 'A1 til A4 inneholder 3, 5, 7 og 9. Hva blir <code>=SUMMA(A1:A4)</code>?', svar: 24, hint: 'Legg sammen alle fire.', losning: '3 + 5 + 7 + 9 = 24.' },
        { type: 'tall', tekst: 'Samme celler (3, 5, 7, 9). Hva blir <code>=GJENNOMSNITT(A1:A4)</code>?', svar: 6, hint: 'Summen delt på antall.', losning: '24 / 4 = 6.' },
        { type: 'tall', tekst: 'Cellene inneholder 12, 4, 19, 7. Hva blir <code>=MAKS(A1:A4)-MIN(A1:A4)</code>? (Det kalles variasjonsbredden.)', svar: 15, hint: 'Største minus minste.', losning: 'Største er 19 og minste er 4. 19 − 4 = 15.' },
        { type: 'valg', tekst: 'Hva betyr <code>B2:B6</code> i en formel?', valg: ['Alle cellene fra B2 til B6', 'Bare B2 og B6', 'B2 delt på B6', 'En feil'], riktig: 0, fast: true, hint: 'Kolon er «til».', losning: 'Kolon mellom to celler betyr hele området mellom dem.' }
      ] }
    ]
  });

  /* ---------- 5 ---------- */
  S.push({
    tittel: 'Kopiere formler (fyll ned)', ikon: '⬇️',
    blokker: [
      { t: 'p', tekst: 'Du trenger ikke skrive formelen på nytt i hver rad. Du kan <strong>kopiere</strong> den nedover, og regnearket flytter celleadressene for deg. Står det <code>=A2*7</code> i rad 2, blir det <code>=A3*7</code> i rad 3, og så videre. Her bruker du knappen <strong>Fyll ned</strong>. I Excel dobbeltklikker du på lille firkant nederst i hjørnet på cellen, eller drar den.' },
      { t: 'widget', navn: 'regneark', opts: { tittel: 'Oppdrag: 7-gangen', kolonner: 3, rader: 12, intro: 'I kolonne A står tallene 1 til 10. Skriv formelen <code>=A2*7</code> i B2. Merk så B2 til B11 (klikk B2, hold Shift og klikk B11) og trykk <strong>Fyll ned</strong>.', start: Object.assign({ A1: 'n', B1: '7 ganger n' }, fyll('A', 2, 11, r => String(r - 1))), laast: Object.assign({ A1: 1, B1: 1 }, fyll('A', 2, 11, () => 1)), sjekk: [{ celle: 'B2', verdi: 7, hint: 'B2 skal være =A2*7' }, { celle: 'B6', verdi: 35, hint: 'Fyll formelen ned til B11.' }, { celle: 'B11', verdi: 70, hint: 'Fyll formelen ned til B11.' }], losning: fyll('B', 2, 11, r => '=A' + r + '*7'), ros: '7 · 10 = 70. Slik lager du en tabell på sekunder.' } },
      { t: 'h', tekst: 'Absolutte adresser: $ låser cellen' },
      { t: 'p', tekst: 'Noen ganger vil du at <strong>én celle</strong> skal bli stående fast når du kopierer, for eksempel en felles prosent. Da setter du <strong>dollartegn</strong>: <code>$B$1</code>. Uten dollartegn flytter adressen seg nedover.' },
      { t: 'widget', navn: 'regneark', opts: { tittel: 'Oppdrag: pris med merverdiavgift', kolonner: 4, rader: 6, intro: 'Prisene i A2:A5 er uten mva. Faktoren for 25 % mva (1,25) står i B1. Skriv i <strong>C2</strong> en formel som ganger A2 med B1, men bruk <strong>$B$1</strong>. Fyll ned til C5.', start: { A1: 'Uten mva', B1: '1,25', C1: 'Med mva', A2: '100', A3: '200', A4: '300', A5: '400' }, sjekk: [{ celle: 'C2', verdi: 125, hint: '=A2*$B$1' }, { celle: 'C5', verdi: 500, hint: 'Fyll ned til C5' }, { celle: 'C5', verdi: (v, raw) => /\$B\$1/.test(raw), hint: 'Bruk $B$1 i formelen, slik at den ikke flytter seg.', formel: false }], losning: fyll('C', 2, 5, r => '=A' + r + '*$B$1'), ros: 'Hvis du ender på en ny faktor i B1, oppdateres alle prisene.' } },
      { t: 'oppgaver', niva: 3, oppgaver: [
        { type: 'valg', tekst: 'Du har <code>=A2*7</code> i B2 og kopierer den til B3. Hva står i B3?', valg: ['=A3*7', '=A2*7', '=A3*8', '=B3*7'], riktig: 0, hint: 'Adressen flytter seg én rad ned.', losning: 'Når formelen flyttes en rad ned, flyttes alle celleadresser også en rad ned. A2 blir A3.' },
        { type: 'valg', tekst: 'Du har <code>=A2*$B$1</code> i C2 og kopierer den til C3. Hva står i C3?', valg: ['=A3*$B$1', '=A3*$B$2', '=A2*$B$1', '=A3*B2'], riktig: 0, hint: 'Dollartegnene låser B1.', losning: 'A2 flytter seg til A3, men $B$1 er låst og står fast.' },
        { type: 'valg', tekst: 'Hvorfor bruker vi <code>$</code> i adressen <code>$B$1</code>?', valg: ['For at cellen ikke skal flytte seg når formelen kopieres', 'For å gjøre tallet til kroner', 'For å skjule cellen', 'For å runde av'], riktig: 0, hint: 'Tenk på en felles verdi som alle formler skal bruke.', losning: 'Dollartegnene låser kolonnen og raden, så adressen blir den samme i alle kopiene.' }
      ] }
    ]
  });

  /* ---------- 6 ---------- */
  S.push({
    tittel: 'Diagrammer: se tallene', ikon: '📊',
    blokker: [
      { t: 'p', tekst: 'Et diagram gjør tall enkle å forstå. Men det finnes ulike typer, og du må velge den som passer til det du vil vise.' },
      { t: 'kort', kort: [
        { ikon: '📊', tittel: 'Søylediagram', tekst: 'Sammenligner ulike <strong>kategorier</strong>, for eksempel favorittfrukt eller poeng per elev.' },
        { ikon: '📈', tittel: 'Linjediagram', tekst: 'Viser hvordan noe <strong>endrer seg over tid</strong>, som temperatur gjennom året.' },
        { ikon: '🥧', tittel: 'Sektordiagram', tekst: 'Viser hvor stor <strong>del</strong> hver kategori er av en helhet.' }
      ] },
      { t: 'widget', navn: 'regneark', opts: { tittel: 'Lag et diagram', kolonner: 3, rader: 8, intro: 'Merk cellene A1:B6 (klikk A2, hold Shift og klikk B6) og trykk <strong>Lag søylediagram</strong>. Prøv så linjediagram. Hva passer best til disse tallene?', start: { A1: 'Måned', B1: 'Temperatur', A2: 'Jan', B2: '-4', A3: 'Feb', B3: '-3', A4: 'Mar', B4: '1', A5: 'Apr', B5: '6', A6: 'Mai', B6: '12' } } },
      { t: 'callout', stil: 'advarsel', tittel: 'Gode diagrammer er ærlige', punkter: ['Gi diagrammet en <strong>tittel</strong> og navn på aksene.', 'La y-aksen starte på <strong>0</strong> i søylediagram. Ellers ser små forskjeller store ut.', 'Bruk ikke fargene eller størrelsene til å lure leseren. (Mer om dette i «Statistikk i media» på 9. trinn.)'] },
      { t: 'oppgaver', niva: 2, oppgaver: [
        { type: 'valg', tekst: 'Du vil vise hvordan antall følgere har endret seg hver måned det siste året. Hvilket diagram passer best?', valg: ['Linjediagram', 'Sektordiagram', 'Søylediagram for én måned', 'Ingen'], riktig: 0, hint: 'Endring over tid.', losning: 'Et linjediagram viser utvikling over tid på en tydelig måte.' },
        { type: 'valg', tekst: 'Du vil sammenligne hvor mange elever som velger pizza, taco eller pasta. Hvilket diagram passer best?', valg: ['Søylediagram', 'Linjediagram', 'Ingen av dem', 'Alle like bra'], riktig: 0, hint: 'Ulike kategorier som skal sammenlignes.', losning: 'Kategorier sammenlignes best med et søylediagram.' },
        { type: 'valg', tekst: 'Hvorfor bør y-aksen i et søylediagram starte på 0?', valg: ['Ellers kan forskjellene se større ut enn de er', 'Fordi regnearket krever det', 'Det ser penere ut', 'Det er ikke viktig'], riktig: 0, hint: 'Høyden på søylene skal være ærlig.', losning: 'Hvis aksen starter høyere opp, ser en liten forskjell ut som en stor. Det kan lure leseren.' }
      ] }
    ]
  });

  /* ---------- 7 ---------- */
  S.push({
    tittel: 'Matte i regneark: tabeller og funksjoner', ikon: '📈',
    blokker: [
      { t: 'p', tekst: 'Regneark er perfekt til å lage <strong>verditabeller</strong> for funksjoner. Du skriver x-verdiene i én kolonne og en formel i neste, og fyller ned. Så kan du lage en graf med linjediagram.' },
      { t: 'widget', navn: 'regneark', opts: { tittel: 'Oppdrag: tabell for y = 2x + 1', kolonner: 3, rader: 9, intro: 'x-verdiene −3 til 3 står i A2:A8. Skriv formelen for y i B2 (bruk A2), og fyll ned til B8. Lag deretter et linjediagram av A1:B8.', start: Object.assign({ A1: 'x', B1: 'y = 2x + 1' }, fyll('A', 2, 8, r => String(r - 5))), laast: Object.assign({ A1: 1, B1: 1 }, fyll('A', 2, 8, () => 1)), sjekk: [{ celle: 'B2', verdi: -5, hint: '=2*A2+1' }, { celle: 'B5', verdi: 1, hint: 'Når x er 0, blir y 1. Fyll ned.' }, { celle: 'B8', verdi: 7, hint: 'Fyll formelen ned til B8.' }], losning: fyll('B', 2, 8, r => '=2*A' + r + '+1'), ros: 'Punktene ligger på en rett linje. Det er en lineær funksjon!' } },
      { t: 'widget', navn: 'regneark', opts: { tittel: 'Oppdrag: sparing med rente', kolonner: 3, rader: 8, intro: 'Du setter inn 1000 kr, og får 5 % rente hvert år (vekstfaktor 1,05). I B2 står startbeløpet. Skriv i <strong>B3</strong> en formel som ganger B2 med 1,05, og fyll ned til B7.', start: { A1: 'År', B1: 'Saldo', A2: '0', B2: '1000', A3: '1', A4: '2', A5: '3', A6: '4', A7: '5' }, sjekk: [{ celle: 'B3', verdi: 1050, hint: '=B2*1,05' }, { celle: 'B7', verdi: (v) => typeof v === 'number' && Math.abs(v - 1276.28) < 0.01, hint: 'Fyll ned til B7. Etter 5 år skal det stå ca. 1276,28.' }], losning: fyll('B', 3, 7, r => '=B' + (r - 1) + '*1,05'), ros: 'Etter 5 år har du 1276,28 kr. Dette er eksponentiell vekst. Du møter det igjen på 10. trinn.' } },
      { t: 'callout', stil: 'virkelighet', tittel: 'Bruk regnearket til å teste', tekst: 'Hva om renten var 8 % i stedet? Bytt ut 1,05 med 1,08 og se hva som skjer. Det er styrken i et regneark: du kan prøve «hva om?» uten å regne alt på nytt.' },
      { t: 'oppgaver', niva: 3, oppgaver: [
        { type: 'tall', tekst: 'Du lager en tabell for y = 3x − 2 med formelen <code>=3*A2-2</code>. A2 inneholder 4. Hva blir svaret?', svar: 10, hint: 'Sett inn 4 for A2.', losning: '3 · 4 − 2 = 12 − 2 = 10.' },
        { type: 'tall', tekst: 'Du har 2000 kr og 10 % rente per år (vekstfaktor 1,1). Hva er saldoen etter 1 år? (<code>=B2*1,1</code>)', svar: 2200, hint: '2000 · 1,1.', losning: '2000 · 1,1 = 2200 kr.' },
        { type: 'tall', tekst: 'Samme sparing, men saldoen etter <strong>2 år</strong>? (Ganger med 1,1 to ganger.)', svar: 2420, hint: '2200 · 1,1.', losning: '2200 · 1,1 = 2420 kr.' }
      ] }
    ]
  });

  /* ---------- 8 ---------- */
  S.push({
    tittel: 'HVIS: la regnearket ta valg', ikon: '🔀',
    blokker: [
      { t: 'p', tekst: 'Funksjonen <strong>HVIS</strong> (engelsk IF) lar regnearket velge mellom to svar. Den har tre deler: <code>=HVIS(betingelse; svar hvis sant; svar hvis usant)</code>.' },
      { t: 'widget', navn: 'regneark', opts: { tittel: 'Oppdrag: bestått eller ikke?', kolonner: 3, rader: 6, intro: 'Du består med 25 poeng eller mer. Skriv i <strong>C2</strong>: <code>=HVIS(B2>=25;"Bestått";"Ikke bestått")</code> og fyll ned til C6.', start: { A1: 'Elev', B1: 'Poeng', C1: 'Resultat', A2: 'Ali', B2: '24', A3: 'Bea', B3: '31', A4: 'Carl', B4: '18', A5: 'Dina', B5: '27', A6: 'Eli', B6: '25' }, sjekk: [{ celle: 'C2', verdi: 'Ikke bestått', hint: 'Ali har 24 poeng. Det er under 25.' }, { celle: 'C3', verdi: 'Bestått', hint: 'Bea har 31 poeng.' }, { celle: 'C6', verdi: 'Bestått', hint: 'Eli har akkurat 25. Bruk >= (større enn eller lik).' }], losning: fyll('C', 2, 6, r => '=HVIS(B' + r + '>=25;"Bestått";"Ikke bestått")'), ros: 'Legg merke til at Eli, med akkurat 25, består fordi du brukte >=.' } },
      { t: 'tabell', hode: ['Tegn', 'Betyr'], rader: [['=', 'er lik'], ['<>', 'er ikke lik'], ['<', 'mindre enn'], ['<=', 'mindre enn eller lik'], ['>', 'større enn'], ['>=', 'større enn eller lik']] },
      { t: 'oppgaver', niva: 3, oppgaver: [
        { type: 'valg', tekst: 'B2 inneholder 30. Hva blir svaret av <code>=HVIS(B2&gt;20;"stor";"liten")</code>?', valg: ['stor', 'liten', '30', 'Feil'], riktig: 0, hint: 'Er 30 større enn 20?', losning: '30 > 20 er sant, så svaret er «stor».' },
        { type: 'valg', tekst: 'B2 inneholder 20. Hva blir svaret av <code>=HVIS(B2&gt;20;"stor";"liten")</code>?', valg: ['liten', 'stor', '20', 'Feil'], riktig: 0, hint: 'Er 20 større enn 20?', losning: '20 er ikke større enn 20, så betingelsen er usann: «liten». Med >= hadde svaret blitt «stor».' },
        { type: 'valg', tekst: 'Hva er den første delen i <code>=HVIS(A1&lt;0;"minus";"pluss eller null")</code>?', valg: ['Betingelsen: A1<0', 'Svaret hvis sant', 'Svaret hvis usant', 'Funksjonsnavnet'], riktig: 0, hint: 'Det første i parentesen er spørsmålet.', losning: 'Første del er betingelsen (A1<0). Så kommer svaret hvis den er sann og svaret hvis den er usann.' }
      ] }
    ]
  });

  /* ---------- 9 ---------- */
  S.push({
    tittel: 'Prosjekt: eget budsjett', ikon: '💰',
    blokker: [
      { t: 'p', tekst: 'Nå skal du bruke regneark til noe ekte: et <strong>månedsbudsjett</strong>. Det er også en god forberedelse til personlig økonomi på 10. trinn.' },
      { t: 'widget', navn: 'regneark', opts: { tittel: 'Budsjett', kolonner: 3, rader: 12, intro: 'Fyll ut utgiftene i kolonne B (tallene er forslag, du kan endre dem). Skriv formler i B9, B10 og B11.', start: { A1: 'Inntekter', A2: 'Lommepenger', B2: '800', A3: 'Utgifter', A4: 'Mat og drikke', B4: '250', A5: 'Busskort', B5: '300', A6: 'Mobil', B6: '149', A7: 'Fritid', B7: '200', A9: 'Sum utgifter', A10: 'Rest', A11: 'Brukt andel av inntekten' }, sjekk: [{ celle: 'B9', verdi: 899, hint: '=SUMMA(B4:B7)' }, { celle: 'B10', verdi: -99, hint: '=B2-B9' }], losning: { B9: '=SUMMA(B4:B7)', B10: '=B2-B9', B11: '=B9/B2' }, losningTekst: 'Hva ser du? Utgiftene er større enn inntektene, så resten er negativ. Hva ville du gjort?' } },
      { t: 'oppgaver', niva: 4, oppgaver: [
        { type: 'fritekst', tekst: 'I budsjettet over er resten negativ. Foreslå to måter å få budsjettet i balanse, og vis med et tall hvor mye du må endre.', losning: ['Utgiftene er 899 kr og inntekten er 800 kr. Vi mangler 99 kr.', 'Forslag 1: kutt i fritid fra 200 til 100 kr.', 'Forslag 2: få 100 kr mer i inntekt, for eksempel ved å jobbe litt ekstra.', 'Endre tallene i regnearket og se at resten blir 0 eller positiv.'] },
        { type: 'fritekst', tekst: 'Lag ditt eget månedsbudsjett i regnearket. Skriv utgifter som passer deg, og bruk SUMMA for å finne totalen. Hva er den største utgiften din, og hva forteller det deg?', losning: ['Svarene er ulike. En god løsning har inntekter, utgifter, en SUMMA-formel og en rest (inntekt minus utgifter).', 'Bruk gjerne MAKS for å finne den største utgiften og lag et søylediagram av utgiftene.'] }
      ] },
      { t: 'callout', stil: 'virkelighet', tittel: 'Ekte Excel og Google Regneark', tekst: 'Alt du har lært her fungerer også i Excel og Google Regneark. Der kan du også formatere celler (farger, valuta), sortere, filtrere og lagre filer. Prøv å lage budsjettet på nytt der. Kjenner du igjen funksjonene?' },
      { t: 'sjekkliste', tittel: 'Dette kan du nå', punkter: ['Forklare hva en celle, rad og kolonne er, og lese celleadresser', 'Skrive tall og tekst i celler', 'Lage formler med =, +, -, *, / og ^', 'Bruke SUMMA, GJENNOMSNITT, MAKS og MIN', 'Kopiere formler nedover (fyll ned)', 'Bruke $ til å låse en celle', 'Lage søyle- og linjediagram og velge riktig type', 'Lage en verditabell for en funksjon', 'Bruke HVIS til å la regnearket ta et valg'] }
    ]
  });

  M.register('utforsk', 'verktoy/regneark', {
    tittel: 'Regneark (Excel) fra scratch',
    ingress: 'Lær regneark fra første celle. Du øver i et regneark rett på siden, og alt du lærer virker også i Excel og Google Regneark.',
    mal: ['skrive tall, tekst og formler i et regneark', 'bruke funksjoner som SUMMA og GJENNOMSNITT', 'kopiere formler og lage verditabeller', 'lage og velge riktig diagram'],
    ordliste: ORD, seksjoner: S
  });
})();
