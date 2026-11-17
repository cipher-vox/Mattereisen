/* ============================================================
   Tema: Negative tall (8. trinn) – UTFORSK
   Tegnforklaring i tekst:
     {-3} = blått negativt tall, {+5} / {5} = oransje positivt tall, {0} = grønn null
     **fet**
   ============================================================ */
(function () {
  const M = window.MATTE;

  /* Ordliste brukes av begge arbeidsmåtene */
  M.negOrd = [
    { ord: ['negative tall', 'negativt tall'], forklaring: 'Et tall som er <strong>mindre enn 0</strong>. Det har minustegn foran, for eksempel {-3}.' },
    { ord: ['positive tall', 'positivt tall'], forklaring: 'Et tall som er <strong>større enn 0</strong>, for eksempel {+3}.' },
    { ord: ['tallinja', 'tallinje'], forklaring: 'En rett linje der tallene ligger i rekkefølge. Tall lenger til høyre er større. Tall lenger til venstre er mindre.' },
    { ord: ['motsatte tall'], forklaring: 'To tall som er like langt fra 0, men på hver sin side av 0. {3} og {-3} er motsatte tall.' },
    { ord: ['fortegnet', 'fortegn'], forklaring: 'Plusstegnet (+) eller minustegnet (−) foran et tall. Det viser om tallet er positivt eller negativt.' },
    { ord: ['nullpar'], forklaring: 'En positiv og en negativ brikke som er like store, for eksempel +1 og −1. Sammen blir de 0.' },
    { ord: ['frysepunktet', 'frysepunkt'], forklaring: '0 grader. Det er temperaturen der vann fryser til is.' },
    { ord: ['gjeld'], forklaring: 'Penger du skylder noen. På en konto kan gjeld vises som et negativt tall.' },
    { ord: ['saldoen', 'saldo'], forklaring: 'Hvor mye penger det er på en konto. Er saldoen negativ, har du brukt mer enn du hadde.' },
    { ord: ['parentesen', 'parenteser', 'parentes'], forklaring: 'Tegnene ( ) som viser at noe hører sammen. Det som står i parentes, regner du ut først.' },
    { ord: ['differanse', 'forskjellen'], forklaring: 'Svaret når du trekker et tall fra et annet. Det viser hvor langt det er mellom tallene.' },
    { ord: ['produktet', 'produkt'], forklaring: 'Svaret når du ganger tall med hverandre.' },
    { ord: ['kvotienten', 'kvotient'], forklaring: 'Svaret når du deler et tall på et annet.' },
    { ord: ['summen', 'sum'], forklaring: 'Svaret når du legger tall sammen.' },
    { ord: ['havflaten'], forklaring: 'Overflaten på havet. Den regnes som 0 meter. Under havflaten er dybden negativ.' }
  ];

  const S = [];

  /* ------------------------------------------------------------
     1. Tall under null
     ------------------------------------------------------------ */
  S.push({
    tittel: 'Tall under null', ikon: '🌡️',
    blokker: [
      { t: 'p', tekst: 'Har du sett et termometer en kald vinterdag? Da viser det ofte tall <strong>under 0</strong>. En dag kan det for eksempel være {-10} grader ute. Det betyr <strong>10 grader under null</strong>. Tall under 0 kalles <strong>negative tall</strong>.' },
      {
        t: 'kort', kort: [
          { ikon: '🌡️', tittel: 'Temperatur', tekst: '{-5} grader er 5 grader under frysepunktet.' },
          { ikon: '🏢', tittel: 'Etasjer', tekst: 'Kjelleren kan være etasje {-1}. Gateplanet er 0.' },
          { ikon: '🤿', tittel: 'Dybde', tekst: 'En dykker 8 meter under havflaten er på {-8} meter.' },
          { ikon: '💳', tittel: 'Penger', tekst: 'Er du 150 kr i minus på kontoen, er saldoen {-150} kr.' }
        ]
      },
      { t: 'widget', navn: 'termometer', opts: { v: -5, tittel: 'Prøv selv: termometeret' } },
      {
        t: 'callout', stil: 'regel', tittel: 'Positive og negative tall',
        punkter: ['{+5} er et <strong>positivt tall</strong>. Det er større enn 0.', '{-5} er et <strong>negativt tall</strong>. Det er mindre enn 0.', '{0} er verken positivt eller negativt. Det er midt imellom.']
      },
      { t: 'callout', stil: 'husk', tittel: 'Fortegn', tekst: 'Plusstegnet eller minustegnet foran et tall kalles <strong>fortegnet</strong>. Minustegnet i {-5} hører til tallet. Det viser at tallet ligger på den negative siden av 0.' },
      {
        t: 'oppgaver', niva: 1, oppgaver: [
          { type: 'valg', tekst: 'Hvilket tall passer best til «7 grader under null»?', valg: ['7', '−7', '0', '17'], riktig: 1, hint: 'Under null betyr et negativt tall.', losning: 'Under null er negativt. 7 grader under null skrives som {-7}.' },
          { type: 'valg', tekst: 'En dykker er 12 meter under havflaten. Hvilket tall viser dybden?', valg: ['12', '−12', '21', '−21'], riktig: 1, hint: 'Havflaten er 0. Under havflaten er tallene negative.', losning: 'Havflaten er 0. 12 meter under havflaten er {-12}.' },
          { type: 'valg', tekst: 'Hvilken temperatur er kaldest?', valg: ['3 grader', '0 grader', '−4 grader', '−1 grad'], riktig: 2, hint: 'Jo lenger under null, jo kaldere.', losning: 'Av disse ligger {-4} lengst under null, så det er kaldest.' },
          { type: 'valg', tekst: 'Kontoen din viser {-150} kr. Hva betyr det?', valg: ['Du har 150 kr å bruke', 'Du har brukt 150 kr mer enn du hadde (gjeld)', 'Du har 15 kr igjen', 'Det er ikke mulig'], riktig: 1, fast: true, hint: 'Et negativt tall på kontoen betyr gjeld.', losning: 'Negativ saldo betyr at du skylder penger. Her er gjelden 150 kr.' },
          { type: 'valg', tekst: 'Ola står i etasje {-2}. Hvor er han?', valg: ['I 2. etasje over bakken', 'To etasjer under gateplanet (i kjelleren)', 'I 1. etasje', 'På taket'], riktig: 1, fast: true, hint: 'Gateplanet er 0. Negative etasjer er under bakken.', losning: 'Etasje {-2} er to etasjer under gateplanet, altså i kjelleren.' }
        ]
      }
    ]
  });

  /* ------------------------------------------------------------
     2. Tallinja
     ------------------------------------------------------------ */
  S.push({
    tittel: 'Tallinja', ikon: '📏',
    blokker: [
      { t: 'p', tekst: 'Alle tall har sin plass på <strong>tallinja</strong>. {0} ligger i midten. De positive tallene ligger til <strong>høyre</strong> for 0, og de negative tallene ligger til <strong>venstre</strong>.' },
      { t: 'widget', navn: 'tallinje-vis', opts: { punkter: [{ v: -7, label: '−7' }, { v: -2, label: '−2' }, { v: 3, label: '3' }, { v: 8, label: '8' }], alt: 'Tallinje med tallene minus 7, minus 2, 3 og 8' } },
      { t: 'callout', stil: 'regel', tittel: 'Størst og minst', tekst: 'Jo lenger <strong>til høyre</strong> et tall ligger, jo <strong>større</strong> er det. Jo lenger <strong>til venstre</strong>, jo <strong>mindre</strong> er det.' },
      { t: 'callout', stil: 'advarsel', tittel: 'Pass på!', tekst: '{-9} er <strong>mindre</strong> enn {-2}, selv om 9 er større enn 2. Tenk på temperatur: Det er kaldere med −9 grader enn med −2 grader. Tegnene vi bruker er &lt; (mindre enn) og &gt; (større enn). Eksempler: {-9} &lt; {-2} og {3} &gt; {-5}.' },
      { t: 'p', tekst: 'To tall som er like langt fra 0, men på hver sin side, kalles <strong>motsatte tall</strong>. Dra i glideren og se hva som skjer.' },
      { t: 'widget', navn: 'motsatte', opts: { x: 4 } },
      {
        t: 'oppgaver', niva: 1, oppgaver: [
          { type: 'tall', tekst: 'Hvilket tall viser markeringen på tallinja?', svar: -4, visual: { widget: 'tallinje-vis', opts: { punkter: [{ v: -4, label: '?' }] } }, hint: 'Start i 0 og tell skritt mot venstre.', losning: 'Markeringen ligger 4 skritt til venstre for 0. Tallet er {-4}.' },
          { type: 'tall', tekst: 'Hvilket tall viser markeringen på tallinja?', svar: 2, visual: { widget: 'tallinje-vis', opts: { punkter: [{ v: 2, label: '?' }] } }, hint: 'Til høyre for 0 er tallene positive.', losning: 'Markeringen ligger 2 skritt til høyre for 0. Tallet er {2}.' },
          { type: 'tall', tekst: 'Hvilket tall viser markeringen på tallinja?', svar: -8, visual: { widget: 'tallinje-vis', opts: { punkter: [{ v: -8, label: '?' }] } }, hint: 'Tell skritt til venstre fra 0.', losning: 'Markeringen ligger 8 skritt til venstre for 0. Tallet er {-8}.' },
          { type: 'valg', tekst: 'Hvilket tall er størst?', valg: ['−7', '−2', '−9', '−5'], riktig: 1, hint: 'Det største tallet ligger lengst til høyre på tallinja.', losning: 'Av disse ligger {-2} lengst til høyre, så det er størst.' },
          { type: 'valg', tekst: 'Hvilket tall er minst?', valg: ['−3', '4', '−8', '0'], riktig: 2, hint: 'Det minste tallet ligger lengst til venstre.', losning: '{-8} ligger lengst til venstre, så det er minst.' },
          { type: 'valg', tekst: 'Hvilket tegn passer? &nbsp; {-6} ? {-1}', valg: ['&lt;', '&gt;', '='], riktig: 0, fast: true, hint: 'Tegn begge tallene på tallinja. Hvilket ligger lengst til venstre?', losning: '{-6} ligger til venstre for {-1}, så {-6} &lt; {-1}.' },
          { type: 'rekke', tekst: 'Skriv tallene i rekkefølge fra minst til størst: {3}, {-5}, {0}, {-1}', svar: [-5, -1, 0, 3], hint: 'Begynn med det som ligger lengst til venstre på tallinja.', losning: 'Fra venstre til høyre: {-5}, {-1}, {0}, {3}.', feilmelding: 'Husk: det minste tallet står først, og det ligger lengst til venstre.' }
        ]
      },
      {
        t: 'oppgaver', niva: 2, oppgaver: [
          { type: 'tall', tekst: 'Hva er det motsatte tallet til {8}?', svar: -8, hint: 'Motsatte tall er like langt fra 0, men på hver sin side.', losning: '{8} ligger 8 skritt til høyre for 0. Det motsatte tallet ligger 8 skritt til venstre: {-8}.' },
          { type: 'tall', tekst: 'Hva er det motsatte tallet til {-13}?', svar: 13, hint: 'Bytt fortegn.', losning: 'Det motsatte tallet til {-13} er {13}.' },
          { type: 'rekke', tekst: 'Sorter fra minst til størst: {-12}, {7}, {-3}, {-20}, {0}', svar: [-20, -12, -3, 0, 7], hint: 'Negative tall med stort tall etter minus er minst.', losning: 'Rekkefølgen er {-20}, {-12}, {-3}, {0}, {7}.' },
          { type: 'tall', tekst: 'Hvilket tall ligger midt mellom {-6} og {2}?', svar: -2, hint: 'Hvor mange skritt er det fra −6 til 2? Gå halvparten av dem.', losning: 'Det er 8 skritt fra {-6} til {2}. Halvparten er 4 skritt. {-6} + 4 = {-2}.' },
          { type: 'valg', tekst: 'Hvor mange hele tall ligger mellom {-3} og {2}? (Ikke regn med {-3} og {2}.)', valg: ['3', '4', '5', '6'], riktig: 1, hint: 'Skriv opp tallene: −2, −1, 0, ...', losning: 'Tallene er {-2}, {-1}, {0} og {1}. Det er 4 tall.' }
        ]
      }
    ]
  });

  /* ------------------------------------------------------------
     3. Pluss
     ------------------------------------------------------------ */
  S.push({
    tittel: 'Pluss med negative tall', ikon: '➕',
    blokker: [
      { t: 'p', tekst: '<strong>Pluss</strong> betyr at du flytter deg <strong>mot høyre</strong> på tallinja. Prøv selv! Start i {-3} og legg til {5}. Trykk på «Hopp!».' },
      { t: 'widget', navn: 'tallinje', opts: { a: -3, op: '+', b: 5, tittel: 'Pluss på tallinja' } },
      { t: 'p', tekst: 'Hva skjer når du legger til et <strong>negativt</strong> tall? Sett tallet nede til {-4} og start i {2}, og se hvilken vei du hopper.' },
      { t: 'callout', stil: 'regel', tittel: 'Å legge til et negativt tall', tekst: 'Å legge til et negativt tall er det samme som å <strong>trekke fra</strong> tallet uten minus.', punkter: ['{5} + ({-3}) = {5} − {3} = {2}'] },
      { t: 'eksempel', regn: '-3+5', steg: ['Start i {-3} på tallinja.', '<strong>Pluss</strong> {5} betyr: hopp 5 skritt mot høyre.', 'Fra {-3} hopper du til −2, −1, 0, 1 og 2.', 'Du lander på {2}. Altså er {-3} + {5} = {2}.'] },
      { t: 'eksempel', regn: '3+(-5)', steg: ['Start i {3}.', 'Vi legger til {-5}. Det er et negativt tall, så vi hopper 5 skritt <strong>mot venstre</strong>.', 'Fra {3} hopper du til 2, 1, 0, −1 og −2.', 'Du lander på {-2}. Altså er {3} + ({-5}) = {-2}.'] },
      { t: 'eksempel', regn: '-4+(-3)', steg: ['Start i {-4}.', 'Vi legger til {-3}: hopp 3 skritt mot venstre.', 'Fra {-4} hopper du til −5, −6 og −7.', 'Svar: {-4} + ({-3}) = {-7}. To negative tall gir et enda mer negativt tall.'] },
      {
        t: 'callout', stil: 'tips', tittel: 'Tre snarveier',
        punkter: ['<strong>Begge negative:</strong> legg sammen tallene uten fortegn og sett minus foran. {-4} + ({-3}) = {-7}.', '<strong>Ulike fortegn:</strong> finn forskjellen mellom tallene (uten fortegn). Svaret får fortegnet til tallet som ligger lengst fra 0. {-7} + {3}: forskjellen er 4, og {-7} er lengst fra 0, så svaret er {-4}.', '<strong>Motsatte tall:</strong> summen er alltid 0. {5} + ({-5}) = {0}.']
      },
      { t: 'p', tekst: 'Du kan også tenke på <strong>brikker</strong>. Positive brikker (+) og negative brikker (−) som er like store, blir til sammen 0. Et slikt par kalles et <strong>nullpar</strong>. Trykk deg gjennom stegene.' },
      { t: 'widget', navn: 'brikker', opts: { a: -3, op: '+', b: 5, tittel: 'Pluss med brikker' } },
      {
        t: 'oppgaver', niva: 1, oppgaver: [
          { regn: '-2+5', hint: 'Start i −2 og hopp 5 skritt mot høyre.' },
          { regn: '4+(-3)', hint: 'Å legge til −3 betyr å hoppe 3 skritt mot venstre.' },
          { regn: '-3+(-2)', hint: 'To negative tall: legg sammen og sett minus foran.' },
          { regn: '7+(-7)', hint: 'Dette er motsatte tall.', losning: '{7} og {-7} er motsatte tall. Summen av motsatte tall er alltid {0}.' }
        ]
      },
      {
        t: 'oppgaver', niva: 2, oppgaver: [
          { regn: '-8+5', hint: 'Ulike fortegn: forskjellen mellom 8 og 5 er 3. Hvem ligger lengst fra 0?' },
          { regn: '5+(-9)', hint: 'Hopp 9 skritt mot venstre fra 5.' },
          { regn: '-4+(-6)', hint: 'Begge er negative.' },
          { tekst: 'Temperaturen er {-6} grader. Den stiger 9 grader. Hva er temperaturen nå?', svar: 3, enhet: 'grader', hint: 'Skriv regnestykket −6 + 9.', losning: 'Regnestykket er {-6} + {9} = {3}. Temperaturen er nå 3 grader.' }
        ]
      },
      {
        t: 'oppgaver', niva: 3, oppgaver: [
          { regn: '-15+8', hint: 'Forskjellen mellom 15 og 8 er 7. Svaret får fortegnet til −15.' },
          { regn: '9+(-14)', hint: 'Forskjellen mellom 14 og 9 er 5.' },
          { tekst: 'Finn tallet som mangler: &nbsp; ? + {6} = {-2}', svar: -8, hint: 'Hvor langt må du hoppe tilbake fra −2 for å komme til tallet du starter i?', losning: 'Vi må finne tallet vi startet i. Gå baklengs: {-2} − {6} = {-8}. Sjekk: {-8} + {6} = {-2}. ✓' },
          { tekst: 'Finn tallet som mangler: &nbsp; {-7} + ? = {-3}', svar: 4, hint: 'Hvor mange skritt er det fra −7 til −3?', losning: 'Fra {-7} til {-3} er det 4 skritt mot høyre. Tallet er {4}. Sjekk: {-7} + {4} = {-3}. ✓' }
        ]
      }
    ]
  });

  /* ------------------------------------------------------------
     4. Minus
     ------------------------------------------------------------ */
  S.push({
    tittel: 'Minus med negative tall', ikon: '➖',
    blokker: [
      { t: 'p', tekst: '<strong>Minus</strong> betyr at du hopper <strong>mot venstre</strong>. Men hva skjer når du trekker fra et <strong>negativt</strong> tall? Start i {3} og trekk fra {-2}. Hvilken vei hopper du?' },
      { t: 'widget', navn: 'tallinje', opts: { a: 3, op: '-', b: -2, tittel: 'Minus på tallinja' } },
      { t: 'callout', stil: 'regel', tittel: 'Minus minus blir pluss', tekst: 'Å trekke fra et negativt tall er det samme som å <strong>legge til</strong> tallet uten minus.', punkter: ['{3} − ({-2}) = {3} + {2} = {5}'] },
      { t: 'p', tekst: '<strong>Hvorfor?</strong> Med brikker: Du skal ta bort to negative brikker, men du har ingen. Da legger vi først til nullpar (en + og en −) uten at verdien forandrer seg. Nå kan du ta bort de negative brikkene, og igjen har du bare positive.' },
      { t: 'widget', navn: 'brikker', opts: { a: 3, op: '-', b: -2, tittel: 'Minus med brikker' } },
      { t: 'p', tekst: 'Minus kan også bety <strong>forskjellen</strong> mellom to tall. Hvis temperaturen går fra {-4} til {3}, er endringen {3} − ({-4}) = {7} grader. Prøv selv!' },
      { t: 'widget', navn: 'tempendring', opts: { fra: -4, til: 3 } },
      { t: 'eksempel', regn: '-2-5', steg: ['Start i {-2}.', '<strong>Minus</strong> {5} betyr: hopp 5 skritt mot venstre.', 'Fra {-2} hopper du til −3, −4, −5, −6 og −7.', 'Svar: {-2} − {5} = {-7}.'] },
      { t: 'eksempel', regn: '4-(-3)', steg: ['Start i {4}.', 'Minus {-3}: minus og minus blir pluss. Vi regner {4} + {3}.', 'Hopp 3 skritt mot høyre fra {4}: 5, 6 og 7.', 'Svar: {4} − ({-3}) = {7}.'] },
      { t: 'eksempel', regn: '-5-(-2)', steg: ['Start i {-5}.', 'Minus {-2} er det samme som pluss {2}.', 'Hopp 2 skritt mot høyre fra {-5}: −4 og −3.', 'Svar: {-5} − ({-2}) = {-3}.'] },
      {
        t: 'tabell', hode: ['Regnestykke', 'Hva gjør du på tallinja?', 'Svar'], rader: [
          ['5 − 3', 'Hopp 3 mot venstre', '2'], ['5 + (−3)', 'Hopp 3 mot venstre', '2'], ['5 − (−3)', 'Hopp 3 mot høyre', '8'], ['5 + 3', 'Hopp 3 mot høyre', '8']]
      },
      { t: 'callout', stil: 'tips', tittel: 'Legg merke til', tekst: '5 − 3 og 5 + (−3) gir samme svar. Det samme gjelder 5 − (−3) og 5 + 3. Å trekke fra og å legge til det motsatte tallet er det samme.' },
      {
        t: 'oppgaver', niva: 1, oppgaver: [
          { regn: '2-5', hint: 'Start i 2 og hopp 5 skritt mot venstre.' },
          { regn: '-1-4', hint: 'Hopp 4 skritt mot venstre fra −1.' },
          { regn: '3-(-2)', hint: 'Minus minus blir pluss.' },
          { regn: '6-(-1)', hint: 'Minus minus blir pluss.' },
          { regn: '-4-(-4)', hint: 'Dette er det samme som −4 + 4.' }
        ]
      },
      {
        t: 'oppgaver', niva: 2, oppgaver: [
          { regn: '-3-(-5)', hint: 'Skriv om til −3 + 5.' },
          { regn: '4-(-9)', hint: 'Skriv om til 4 + 9.' },
          { regn: '-7-(-2)', hint: 'Skriv om til −7 + 2.' },
          { regn: '-2-9', hint: 'Begge hopp går mot venstre.' },
          { tekst: 'Temperaturen går fra {-8} til {2}. Hvor mange grader har den endret seg? (Endring = slutt − start)', svar: 10, enhet: 'grader', hint: 'Regn 2 − (−8).', losning: 'Endring = slutt − start = {2} − ({-8}) = {2} + {8} = {10}. Det ble 10 grader varmere.' }
        ]
      },
      {
        t: 'oppgaver', niva: 3, oppgaver: [
          { regn: '-15-(-6)', hint: 'Skriv om til −15 + 6.' },
          { regn: '8-(-12)', hint: 'Skriv om til 8 + 12.' },
          { tekst: 'Finn tallet som mangler: &nbsp; ? − {4} = {-9}', svar: -5, hint: 'Du går baklengs: legg til 4 på −9.', losning: 'Start-tallet er {-9} + {4} = {-5}. Sjekk: {-5} − {4} = {-9}. ✓' },
          { tekst: 'Finn tallet som mangler: &nbsp; {3} − ? = {8}', svar: -5, hint: 'Hvilket tall må du trekke fra 3 for å få 8? Det må være et negativt tall.', losning: '{3} − ({-5}) = {3} + {5} = {8}. Tallet er {-5}.' },
          { tekst: 'Temperaturen faller fra {4} til {-7} grader. Hvor stor er endringen? (Endring = slutt − start)', svar: -11, enhet: 'grader', hint: 'Regn −7 − 4. Blir det kaldere, er endringen negativ.', feil: { '11': 'Det ble kaldere, så endringen er negativ.' }, losning: 'Endring = slutt − start = {-7} − {4} = {-11}. Det ble 11 grader kaldere.' }
        ]
      }
    ]
  });

  /* ------------------------------------------------------------
     5. Gange
     ------------------------------------------------------------ */
  S.push({
    tittel: 'Gange med negative tall', ikon: '✖️',
    blokker: [
      { t: 'p', tekst: 'Gange er gjentatt addisjon: 3 · 2 = 2 + 2 + 2 = 6. På samme måte er 3 · ({-2}) = ({-2}) + ({-2}) + ({-2}) = {-6}. Men hva skjer når det <strong>første</strong> tallet er negativt? Se på mønsteret!' },
      { t: 'widget', navn: 'monster', opts: { b: -3 } },
      {
        t: 'callout', stil: 'regel', tittel: 'Fortegnsreglene for gange',
        punkter: ['<strong>Like fortegn</strong> gir <strong>positivt</strong> svar: (+) · (+) = + og (−) · (−) = +', '<strong>Ulike fortegn</strong> gir <strong>negativt</strong> svar: (+) · (−) = − og (−) · (+) = −']
      },
      { t: 'widget', navn: 'fortegn', opts: { op: '*' } },
      { t: 'eksempel', regn: '(-4)*3', steg: ['Fortegnene er ulike (− og +), så svaret blir negativt.', 'Regn uten fortegn: 4 · 3 = 12.', 'Sett på minus: {-12}.'] },
      { t: 'eksempel', regn: '(-5)*(-6)', steg: ['Fortegnene er like (begge −), så svaret blir positivt.', 'Regn uten fortegn: 5 · 6 = 30.', 'Svar: {30}.'] },
      { t: 'eksempel', tittel: 'Eksempel med tre tall', regn: '2*(-3)*(-4)', steg: ['Regn fra venstre: 2 · ({-3}) = {-6}.', 'Så: ({-6}) · ({-4}) = {24}, fordi like fortegn gir pluss.', 'Svar: {24}.'] },
      { t: 'callout', stil: 'tips', tittel: 'Tell de negative tallene', tekst: 'Når du ganger flere tall, kan du telle hvor mange som er negative. <strong>Partall</strong> antall negative gir <strong>positivt</strong> svar. <strong>Oddetall</strong> antall gir <strong>negativt</strong> svar.' },
      { t: 'callout', stil: 'virkelighet', tittel: 'Fra hverdagen', tekst: 'Du bruker 25 kr hver dag i 4 dager. Hver dag er endringen på kontoen {-25} kr. Totalt: 4 · ({-25}) = {-100} kr.' },
      {
        t: 'oppgaver', niva: 1, oppgaver: [
          { regn: '3*(-2)', hint: 'Ulike fortegn gir negativt svar.' },
          { regn: '(-4)*2', hint: 'Ulike fortegn gir negativt svar.' },
          { regn: '(-3)*(-3)', hint: 'Like fortegn gir positivt svar.' },
          { regn: '5*(-1)', hint: 'Å gange med −1 gir det motsatte tallet.' },
          { type: 'valg', tekst: 'Er svaret på ({-7}) · ({-2}) positivt eller negativt?', valg: ['Positivt', 'Negativt'], riktig: 0, fast: true, hint: 'Begge tallene er negative. Er fortegnene like eller ulike?', losning: 'Fortegnene er like (begge −), så svaret er positivt: ({-7}) · ({-2}) = {14}.' }
        ]
      },
      {
        t: 'oppgaver', niva: 2, oppgaver: [
          { regn: '(-6)*7', hint: 'Regn 6 · 7 og sett riktig fortegn.' },
          { regn: '(-8)*(-5)', hint: 'Like fortegn gir positivt svar.' },
          { regn: '9*(-4)', hint: 'Ulike fortegn gir negativt svar.' },
          { regn: '(-12)*0', hint: 'Alt ganget med 0 er 0.', losning: 'Alt ganget med 0 er {0}.' },
          { tekst: 'Du bruker 35 kr hver dag i 3 dager. Hva er den totale endringen på kontoen din? (Svar i kroner, som et tall.)', svar: -105, enhet: 'kr', hint: 'Hver dag er endringen −35 kr. Regn 3 · (−35).', feil: { '105': 'Du bruker penger, så endringen på kontoen er negativ.' }, losning: '3 · ({-35}) = {-105}. Kontoen går ned med 105 kr.' }
        ]
      },
      {
        t: 'oppgaver', niva: 3, oppgaver: [
          { regn: '(-2)*(-3)*(-4)', hint: 'Regn to og to. Eller tell hvor mange negative tall det er.', losning: ['Regn de to første: ({-2}) · ({-3}) = {6}.', 'Så: 6 · ({-4}) = {-24}.', 'Du kan også telle: tre negative tall (oddetall) gir negativt svar. 2 · 3 · 4 = 24, så svaret er {-24}.'] },
          { regn: '(-5)*4*(-3)', hint: 'To negative tall gir positivt.', losning: ['Regn de to første: ({-5}) · 4 = {-20}.', 'Så: ({-20}) · ({-3}) = {60}, fordi like fortegn gir pluss.', 'Du kan også telle: to negative tall (partall) gir positivt svar. 5 · 4 · 3 = 60.'] },
          { tekst: 'Finn tallet som mangler: &nbsp; ? · ({-3}) = {21}', svar: -7, hint: 'Hvilket tall ganget med −3 gir 21? Svaret må være negativt.', losning: '{-7} · ({-3}) = {21}. Tallet er {-7}.' },
          { type: 'valg', tekst: 'Hvilket regnestykke har svaret {-20}?', valg: ['({-4}) · ({-5})', '({-4}) · 5', '4 · 5', '({-20}) · ({-1})'], riktig: 1, hint: 'Svaret er negativt, så fortegnene må være ulike.', losning: '({-4}) · 5 = {-20}. De andre gir {20}.' }
        ]
      }
    ]
  });

  /* ------------------------------------------------------------
     6. Dele
     ------------------------------------------------------------ */
  S.push({
    tittel: 'Dele med negative tall', ikon: '➗',
    blokker: [
      { t: 'p', tekst: 'Å dele er det motsatte av å gange. Derfor kan vi bruke gange til å sjekke svaret. Se på tabellen.' },
      {
        t: 'tabell', hode: ['Deling', 'Svar', 'Sjekk med gange'], rader: [
          ['12 : 3', '{4}', '4 · 3 = 12 ✓'], ['(−12) : 3', '{-4}', '(−4) · 3 = −12 ✓'], ['(−12) : (−3)', '{4}', '4 · (−3) = −12 ✓'], ['12 : (−3)', '{-4}', '(−4) · (−3) = 12 ✓']]
      },
      { t: 'callout', stil: 'regel', tittel: 'Samme fortegnsregler som for gange', punkter: ['<strong>Like fortegn</strong> gir <strong>positivt</strong> svar.', '<strong>Ulike fortegn</strong> gir <strong>negativt</strong> svar.'] },
      { t: 'widget', navn: 'fortegn', opts: { op: '/', tittel: 'Fortegnsmaskinen: dele' } },
      { t: 'callout', stil: 'advarsel', tittel: 'Husk', tekst: 'Du kan <strong>aldri dele på 0</strong>. Regnestykket 5 : 0 har ikke noe svar. Men 0 : 5 = 0 er helt greit.' },
      { t: 'eksempel', regn: '(-24)/6', steg: ['Fortegnene er ulike, så svaret blir negativt.', 'Regn uten fortegn: 24 : 6 = 4.', 'Svar: {-4}. Sjekk: ({-4}) · 6 = {-24}. ✓'] },
      { t: 'eksempel', regn: '(-35)/(-5)', steg: ['Fortegnene er like (begge −), så svaret blir positivt.', 'Regn uten fortegn: 35 : 5 = 7.', 'Svar: {7}. Sjekk: 7 · ({-5}) = {-35}. ✓'] },
      {
        t: 'oppgaver', niva: 1, oppgaver: [
          { regn: '(-10)/2', hint: 'Ulike fortegn gir negativt svar.' },
          { regn: '12/(-4)', hint: 'Ulike fortegn gir negativt svar.' },
          { regn: '(-9)/(-3)', hint: 'Like fortegn gir positivt svar.' },
          { regn: '(-20)/5', hint: 'Regn 20 : 5 og sett riktig fortegn.' },
          { type: 'valg', tekst: 'Er svaret på ({-18}) : 6 positivt eller negativt?', valg: ['Positivt', 'Negativt'], riktig: 1, fast: true, hint: 'Er fortegnene like eller ulike?', losning: 'Fortegnene er ulike (− og +), så svaret er negativt: ({-18}) : 6 = {-3}.' }
        ]
      },
      {
        t: 'oppgaver', niva: 2, oppgaver: [
          { regn: '(-48)/(-6)', hint: 'Like fortegn gir positivt svar.' },
          { regn: '56/(-7)', hint: 'Ulike fortegn gir negativt svar.' },
          { regn: '(-81)/9', hint: 'Regn 81 : 9.' },
          { regn: '0/(-5)', hint: '0 delt på noe er 0.', losning: '0 delt på et tall (som ikke er 0) er alltid {0}.' },
          { tekst: 'Tre venner deler en gjeld på 450 kr likt. Hva blir hver sin del? (Gjeld skriver du som et negativt tall.)', svar: -150, enhet: 'kr', hint: 'Gjelden er −450. Regn (−450) : 3.', feil: { '150': 'Det er gjeld, så svaret skal være negativt.' }, losning: '({-450}) : 3 = {-150}. Hver av dem har {-150} kr, altså 150 kr i gjeld.' }
        ]
      },
      {
        t: 'oppgaver', niva: 3, oppgaver: [
          { regn: '(-144)/(-12)', hint: 'Like fortegn gir positivt svar.' },
          { regn: '(-7)*(-6)/(-2)', hint: 'Regn fra venstre: først gange, så dele.', losning: 'Først: ({-7}) · ({-6}) = {42}. Så: 42 : ({-2}) = {-21}.' },
          { tekst: 'Finn tallet som mangler: &nbsp; ? : ({-4}) = {9}', svar: -36, hint: 'Gange svaret med tallet du deler på: 9 · (−4).', losning: 'Gå baklengs: {9} · ({-4}) = {-36}. Sjekk: ({-36}) : ({-4}) = {9}. ✓' }
        ]
      }
    ]
  });

  /* ------------------------------------------------------------
     7. Parenteser og regnerekkefølge
     ------------------------------------------------------------ */
  S.push({
    tittel: 'Parenteser og regnerekkefølge', ikon: '🧩',
    blokker: [
      { t: 'p', tekst: 'Vi bruker <strong>parenteser</strong> når et negativt tall kommer etter et regnetegn. Da ser vi tydelig hva som hører sammen. Skriv 5 + (−3), ikke 5 + −3.' },
      {
        t: 'callout', stil: 'regel', tittel: 'Regnerekkefølge',
        punkter: ['<strong>1.</strong> Regn ut det som står i parentes først.', '<strong>2.</strong> Gange og dele, fra venstre mot høyre.', '<strong>3.</strong> Pluss og minus, fra venstre mot høyre.']
      },
      { t: 'callout', stil: 'tips', tittel: 'Minus foran en parentes', tekst: 'Et minustegn foran en parentes betyr «det motsatte av». −({-3}) betyr det motsatte av {-3}, som er {3}. Og −(2 + 4) betyr det motsatte av 6, som er {-6}.' },
      { t: 'eksempel', regn: '-(-3)', steg: ['Minus foran en parentes betyr det motsatte tallet.', 'Det motsatte av {-3} er {3}.', 'Svar: {3}.'] },
      { t: 'eksempel', regn: '3*(-2)+10', steg: ['Gange kommer før pluss: 3 · ({-2}) = {-6}.', 'Så pluss: {-6} + {10} = {4}.', 'Svar: {4}.'] },
      { t: 'eksempel', regn: '(2-7)*(-3)', steg: ['Parentesen først: 2 − 7 = {-5}.', 'Så: ({-5}) · ({-3}) = {15}, fordi like fortegn gir pluss.', 'Svar: {15}.'] },
      { t: 'eksempel', tittel: 'Eksempel med flere ledd', regn: '-5+8-(-3)-10', steg: ['Regn fra venstre: {-5} + {8} = {3}.', 'Så: {3} − ({-3}) = {3} + {3} = {6}.', 'Så: {6} − {10} = {-4}.', 'Svar: {-4}.'] },
      {
        t: 'oppgaver', niva: 2, oppgaver: [
          { regn: '8+(-3)*2', hint: 'Gange før pluss.', losning: 'Gange først: ({-3}) · 2 = {-6}. Så: 8 + ({-6}) = {2}.' },
          { regn: '-6+4*(-2)', hint: 'Gange før pluss.', losning: 'Gange først: 4 · ({-2}) = {-8}. Så: {-6} + ({-8}) = {-14}.' },
          { regn: '(5-9)*3', hint: 'Parentesen først.', losning: 'Parentesen først: 5 − 9 = {-4}. Så: ({-4}) · 3 = {-12}.' },
          { regn: '-(-8)+3', hint: 'Minus foran parentes betyr det motsatte tallet.', losning: 'Det motsatte av {-8} er {8}. Så: 8 + 3 = {11}.' },
          { regn: '20/(-4)+7', hint: 'Dele før pluss.', losning: 'Dele først: 20 : ({-4}) = {-5}. Så: {-5} + 7 = {2}.' }
        ]
      },
      {
        t: 'oppgaver', niva: 3, oppgaver: [
          { regn: '(-3)*(-4)-10', hint: 'Gange før minus.', losning: 'Gange først: ({-3}) · ({-4}) = {12}. Så: 12 − 10 = {2}.' },
          { regn: '-2*(3-8)', hint: 'Parentesen først.', losning: 'Parentesen først: 3 − 8 = {-5}. Så: {-2} · ({-5}) = {10}.' },
          { regn: '(-12)/(4-7)', hint: 'Parentesen først.', losning: 'Parentesen først: 4 − 7 = {-3}. Så: ({-12}) : ({-3}) = {4}.' },
          { regn: '5-(2-9)*2', hint: 'Parentesen først, så gange, så minus.', losning: 'Parentesen: 2 − 9 = {-7}. Gange: ({-7}) · 2 = {-14}. Til slutt: 5 − ({-14}) = 5 + 14 = {19}.' }
        ]
      },
      {
        t: 'oppgaver', niva: 4, oppgaver: [
          { regn: '-4*(-3+5)-(-6)', hint: 'Parentesen først, så gange, så minus.', losning: 'Parentesen: {-3} + 5 = {2}. Gange: {-4} · 2 = {-8}. Til slutt: {-8} − ({-6}) = {-8} + 6 = {-2}.' }
        ]
      }
    ]
  });

  /* ------------------------------------------------------------
     8. Hverdagen
     ------------------------------------------------------------ */
  S.push({
    tittel: 'Negative tall i hverdagen', ikon: '🌍',
    blokker: [
      { t: 'p', tekst: 'Negative tall brukes til temperatur, penger, høyde og dybde, etasjer og poeng i spill. Her får du bruk for alt du har lært.' },
      { t: 'callout', stil: 'husk', tittel: 'Slik løser du tekstoppgaver', punkter: ['Les oppgaven to ganger.', 'Finn tallene. Skriv «under», «gjeld» og «minus» som negative tall.', 'Skriv regnestykket.', 'Regn ut.', 'Sjekk at svaret passer til historien.'] },
      { t: 'eksempel', tittel: 'Eksempel', oppgave: 'Temperaturen er {-7} grader klokka 06. Til klokka 14 har den steget 11 grader. Utover kvelden synker den 5 grader. Hva er temperaturen på kvelden?', steg: ['Skriv regnestykket: {-7} + 11 − 5.', 'Først: {-7} + 11 = {4}.', 'Så: {4} − 5 = {-1}.', 'Svar: Temperaturen er {-1} grad på kvelden.'] },
      {
        t: 'oppgaver', niva: 3, oppgaver: [
          { tekst: 'En dykker er 15 meter under havflaten. Hun svømmer 6 meter opp. Hvor dypt er hun nå? (Svar som tall, der under havflaten er negativt.)', svar: -9, enhet: 'm', hint: 'Start i −15 og legg til 6.', losning: '{-15} + 6 = {-9}. Hun er 9 meter under havflaten.' },
          { tekst: 'Saldoen på kontoen din er {-80} kr. Du setter inn 200 kr. Hva er saldoen nå?', svar: 120, enhet: 'kr', hint: 'Regn −80 + 200.', losning: '{-80} + 200 = {120}. Saldoen er 120 kr.' },
          { tekst: 'Du er i 3. etasje. Heisen går ned til kjelleren, etasje {-2}. Hvor mange etasjer går heisen ned?', svar: 5, hint: 'Regn forskjellen: 3 − (−2).', losning: '3 − ({-2}) = 3 + 2 = {5}. Heisen går ned 5 etasjer.' },
          { tekst: 'Temperaturen er {2} grader og faller 3 grader hver time i 4 timer. Hva er temperaturen etter 4 timer?', svar: -10, enhet: 'grader', hint: 'Totalt fall: 4 · (−3). Legg det til 2.', losning: '4 · ({-3}) = {-12}. Så: 2 + ({-12}) = {-10}. Temperaturen er {-10} grader.' },
          { tekst: 'I et spill får du 5 poeng for hvert riktige svar og {-3} poeng for hvert feil svar. Kari har 7 riktige og 4 feil. Hvor mange poeng har hun?', svar: 23, enhet: 'poeng', hint: 'Regn 7 · 5 og 4 · (−3) hver for seg og legg sammen.', losning: 'Riktige: 7 · 5 = 35. Feil: 4 · ({-3}) = {-12}. Sum: 35 + ({-12}) = {23}.' }
        ]
      },
      {
        t: 'oppgaver', niva: 4, oppgaver: [
          { tekst: 'Fire venner låner 1 200 kr og deler gjelden likt. Hver av dem betaler så tilbake 150 kr. Hva er hver sin saldo nå? (Gjeld er negativt.)', svar: -150, enhet: 'kr', hint: 'Hver har −300 først. Hva blir saldoen når de betaler 150?', losning: 'Hver sin del av gjelden: ({-1200}) : 4 = {-300}. De betaler tilbake 150: {-300} + 150 = {-150}.' },
          { tekst: 'En fryser holder {-18} grader. Det er 22 grader i rommet utenfor. Hvor mange grader er forskjellen?', svar: 40, enhet: 'grader', hint: 'Forskjellen = største − minste = 22 − (−18).', losning: '22 − ({-18}) = 22 + 18 = {40}. Forskjellen er 40 grader.' }
        ]
      }
    ]
  });

  /* ------------------------------------------------------------
     9. Utfordringer
     ------------------------------------------------------------ */
  S.push({
    tittel: 'Utfordringer for deg som vil lenger', ikon: '🏔️',
    blokker: [
      { t: 'p', tekst: 'Disse oppgavene krever at du tenker selv, forklarer og setter flere ideer sammen. Ta det med ro, prøv på ark, og bruk hint hvis du står fast.' },
      {
        t: 'oppgaver', niva: 5, oppgaver: [
          { tekst: '<strong>Tallgåten.</strong> Jeg tenker på et tall. Jeg ganger det med {-3} og legger til 5. Svaret er {-7}. Hvilket tall tenker jeg på?', svar: 4, hint: 'Gå baklengs. Hva gjør du først, og hva er det motsatte?', losning: ['Svaret er {-7}. Før vi la til 5, var tallet {-7} − 5 = {-12}.', 'Før vi ganget med {-3}, var tallet ({-12}) : ({-3}) = {4}.', 'Sjekk: 4 · ({-3}) + 5 = {-12} + 5 = {-7}. ✓'] },
          { tekst: '<strong>Finn feilen.</strong> Emil regner {-3} − 5 = 2. Hva er riktig svar?', svar: -8, hint: 'Minus betyr å hoppe mot venstre. Start i −3.', feil: { '2': 'Emil har hoppet mot høyre. Minus betyr mot venstre.' }, losning: ['Start i {-3}. Minus 5 betyr å hoppe 5 skritt mot venstre.', '{-3} − 5 = {-8}. Emil har hoppet mot høyre og fikk 2.'] },
          { type: 'valg', tekst: 'Hvilken påstand er alltid riktig?', valg: ['Produktet av to negative tall er alltid positivt', 'Summen av to negative tall er alltid positiv', 'Et negativt tall minus et negativt tall er alltid negativt', 'Kvotienten av et positivt og et negativt tall er positiv'], riktig: 0, hint: 'Prøv å finne et eksempel som motbeviser hver påstand.', forklar: [null, 'Nei: {-2} + ({-3}) = {-5}. Summen er negativ.', 'Nei: {-2} − ({-5}) = {3}. Svaret er positivt.', 'Nei: 6 : ({-3}) = {-2}. Svaret er negativt.'], losning: 'Like fortegn gir alltid positivt ved gange. For de andre påstandene finnes det eksempler der de ikke stemmer: {-2} + ({-3}) = {-5}, {-2} − ({-5}) = {3} og 6 : ({-3}) = {-2}.' },
          { type: 'fritekst', tekst: '<strong>Forklar.</strong> Forklar med egne ord (og gjerne en tegning av tallinja eller brikker) hvorfor 5 − ({-2}) blir 7.', losning: ['Minus betyr å ta bort. Å ta bort noe negativt gjør at verdien går <em>opp</em>.', 'Med brikker: Du har 5 positive brikker og skal ta bort 2 negative. Du har ingen negative, så du legger først til 2 nullpar (+ og −). Verdien er den samme. Nå kan du ta bort de 2 negative brikkene, og da er det 7 positive igjen.', 'Med tallinja: Minus et negativt tall er pluss, så du hopper 2 skritt mot høyre fra 5 og lander på 7.'] },
          { type: 'fritekst', tekst: '<strong>Undersøk.</strong> Er det alltid sant at a − b = b − a? Prøv med ulike tall og forklar.', losning: ['Nei. For eksempel er 5 − 2 = 3, men 2 − 5 = {-3}. Svarene er motsatte tall.', 'Det er bare når a og b er like store at svarene er like. Da er begge 0.'] },
          { regn: '-5+8-(-3)-10', tekst: 'Regn ut: {u}', hint: 'Regn fra venstre og ta ett regnetegn av gangen.', losning: ['{-5} + 8 = {3}', '{3} − ({-3}) = {3} + 3 = {6}', '{6} − 10 = {-4}'] },
          { tekst: 'Tre tall har summen 0. To av dem er {-8} og {5}. Hva er det tredje tallet?', svar: 3, hint: 'Hva er {-8} + 5? Hva må du legge til for å få 0?', losning: '{-8} + 5 = {-3}. Det tredje tallet må være det motsatte av {-3}, altså {3}. Sjekk: {-8} + 5 + 3 = {0}. ✓' },
          { tekst: 'To tall har produktet {-36} og summen 5. Hva er det største av de to tallene?', svar: 9, hint: 'Prøv tallpar som gir −36 når du ganger: (−4 og 9), (−6 og 6), ... Hvilket par har summen 5?', losning: 'Produktet er negativt, så det ene er positivt og det andre negativt. Paret {9} og {-4} gir 9 · ({-4}) = {-36} og 9 + ({-4}) = {5}. Det største tallet er {9}.' },
          { tekst: 'Temperaturen i et fryserom er {-20} grader. Rommet varmes opp med 2,5 grader hver time. Etter hvor mange timer er temperaturen 0 grader?', svar: 8, enhet: 'timer', hint: 'Hvor mange ganger må du legge til 2,5 for å komme fra −20 til 0? Regn 20 : 2,5.', losning: 'Rommet må varmes opp 20 grader. 20 : 2,5 = 8. Etter 8 timer er temperaturen 0 grader. Sjekk: {-20} + 8 · 2,5 = {-20} + 20 = {0}. ✓' }
        ]
      }
    ]
  });

  /* ------------------------------------------------------------
     10. Oppsummering
     ------------------------------------------------------------ */
  S.push({
    tittel: 'Oppsummering', ikon: '⭐',
    blokker: [
      {
        t: 'tabell', hode: ['Regneart', 'Regel', 'Eksempel'], rader: [
          ['Legge til negativt tall', 'a + (−b) = a − b', '5 + (−3) = 2'],
          ['Trekke fra negativt tall', 'a − (−b) = a + b', '5 − (−3) = 8'],
          ['Gange / dele, like fortegn', 'Svaret er positivt', '(−2) · (−4) = 8 og (−8) : (−2) = 4'],
          ['Gange / dele, ulike fortegn', 'Svaret er negativt', '(−2) · 4 = −8 og 8 : (−2) = −4'],
          ['Motsatte tall', 'Summen er 0', '7 + (−7) = 0'],
          ['Regnerekkefølge', 'Parentes, så gange og dele, så pluss og minus', '3 · (−2) + 10 = 4']]
      },
      {
        t: 'sjekkliste', tittel: 'Sjekk deg selv: Jeg kan …', punkter: [
          'forklare hva et negativt tall er og gi eksempler fra hverdagen',
          'plassere tall på tallinja og sammenligne dem',
          'regne pluss og minus med negative tall',
          'forklare hvorfor minus minus blir pluss',
          'gange og dele med negative tall',
          'regne med parenteser og riktig regnerekkefølge',
          'løse tekstoppgaver med negative tall'
        ]
      },
      { t: 'callout', stil: 'mestring', tittel: 'Bra jobba!', tekst: 'Negative tall brukes igjen i algebra, likninger, funksjoner og koordinatsystem. Det du har lært her, kommer du til å få bruk for hele veien.' }
    ]
  });

  M.register('utforsk', '8/negative-tall', {
    tittel: 'Negative tall',
    ingress: 'Hvordan regner du når tallene går under null? Her lærer du å bruke negative tall, fra termometeret til tallinja, med pluss, minus, gange og dele.',
    mal: [
      'Jeg kan forklare hva negative tall er, og finne eksempler fra hverdagen.',
      'Jeg kan plassere tall på tallinja og sammenligne positive og negative tall.',
      'Jeg kan regne pluss og minus med negative tall og forklare hvorfor minus minus blir pluss.',
      'Jeg kan gange og dele med negative tall og bruke fortegnsreglene.',
      'Jeg kan bruke parenteser og regnerekkefølge, og løse oppgaver fra hverdagen.'
    ],
    ordliste: M.negOrd,
    seksjoner: S
  });
})();
