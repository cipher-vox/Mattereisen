/* ============================================================
   Tema: Algoritmer og programmering (8. trinn)
   Læreplan 8.10: utforske hvordan algoritmer kan skapes, testes og
   forbedres ved hjelp av programmering
   (For mer: se «Python fra scratch» under Verktøy.)
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, H2, SJ, S, ord } = H;
  const ORD = [
    ord(['algoritme', 'algoritmer', 'algoritmen'], 'En oppskrift med nøyaktige steg som løser et problem. Rekkefølgen er viktig.'),
    ord(['program', 'programmet'], 'En algoritme skrevet i et språk som en datamaskin forstår.'),
    ord(['programmering'], 'Å skrive instruksjoner (kode) som datamaskinen kan følge.'),
    ord(['variabel', 'variabler'], 'Et navn på en boks i datamaskinen der vi lagrer en verdi.'),
    ord(['løkke', 'løkker'], 'Gjentar det samme flere ganger.'),
    ord(['betingelse', 'betingelsen'], 'Et spørsmål som er sant eller usant. Programmet velger vei ut fra svaret.'),
    ord(['debugging', 'feilsøking', 'feil'], 'Å lete etter og rette feil i et program.'),
    ord(['teste', 'testing'], 'Å kjøre programmet med ulike tall og se om svaret er riktig.'),
    ord(['kode'], 'Teksten du skriver i et programmeringsspråk.')
  ];

  /* ====================== UTFORSK ====================== */
  const U = [];
  U.push(S('Algoritmer: oppskrifter for å løse problemer', '📜', [
    P('En <strong>algoritme</strong> er en oppskrift med nøyaktige steg som alltid løser et problem. Du bruker algoritmer hele tiden: når du lager kakao, finner en kamerat i en telefonliste eller regner ut 24 · 13 på papir.'),
    E('Algoritme: Finn det største av tre tall.', ['1. Se på det første tallet. Husk det som «største så langt».', '2. Se på det neste. Er det større? Da er det nye «største så langt».', '3. Gjør det samme med det tredje.', '4. Det du husker til slutt, er det største.']),
    C('tips', 'Gode algoritmer er', ['<strong>Presise</strong>: hvert steg er klart, ingen gjetning.', '<strong>I riktig rekkefølge</strong>: bytter du rekkefølge, kan svaret bli feil.', '<strong>Ferdige</strong>: de stopper og gir et svar.']),
    O(1, [
      V('Hva er en algoritme?', ['En oppskrift med presise steg som løser et problem', 'Et tall', 'En datamaskin', 'En graf'], 0, 'Tenk på en kakeoppskrift.', 'En algoritme er en oppskrift med steg i riktig rekkefølge.', true),
      V('Hvilket steg må komme først i en algoritme for å regne 3 · (4 + 2)?', ['4 + 2', '3 · 4', '3 + 4', '3 · 2'], 0, 'Parentes først.', '4 + 2 = 6 først, så 3 · 6 = 18.'),
      V('Hva skjer hvis du bytter rekkefølge på stegene i en algoritme?', ['Svaret kan bli feil', 'Ingenting', 'Svaret blir alltid riktig', 'Programmet blir raskere'], 0, 'Tenk på å steke et egg før du knekker det.', 'Rekkefølgen er viktig. Noen steg må komme før andre.', true)
    ])
  ]));

  U.push(S('Algoritme for å gjette et tall', '🎯', [
    P('«Jeg tenker på et tall mellom 1 og 100. Gjett det!» Du kan gjette tilfeldig, men det finnes en smartere algoritme: <strong>halvering</strong>. Gjett midten hver gang, og spør «høyere eller lavere?».'),
    E('Finn tallet 73 mellom 1 og 100 ved halvering.', ['Gjett 50. «Høyere.» Nå er tallet mellom 51 og 100.', 'Gjett 75. «Lavere.» Nå er tallet mellom 51 og 74.', 'Gjett 62. «Høyere.» Nå er det mellom 63 og 74.', 'Gjett 68. «Høyere.» Mellom 69 og 74. Gjett 71. «Høyere.» Mellom 72 og 74. Gjett 73. Riktig!']),
    C('virkelighet', 'Så raskt er halvering', ['Mellom 1 og 100: maks 7 gjett.', 'Mellom 1 og 1000: maks 10 gjett.', 'Mellom 1 og 1 000 000: maks 20 gjett.', 'Datamaskiner bruker dette til å søke i enorme lister.']),
    O(2, [
      T('Du gjetter på et tall mellom 1 og 100. Første gjett er 50 og svaret er «lavere». Hva gjetter du nå (midten av 1 til 49)?', 25, 'Midt mellom 1 og 49.', '(1 + 49) : 2 = 25.'),
      T('Tallet ligger mellom 1 og 16. Hvor mange gjett trenger du maks med halvering?', 4, '16 → 8 → 4 → 2 → 1.', 'Hvert gjett halverer: 16, 8, 4, 2, 1. Det er 4 gjett.'),
      T('Tallet ligger mellom 1 og 64. Hvor mange gjett trenger du maks med halvering?', 6, '64 → 32 → 16 → 8 → 4 → 2 → 1.', '6 halveringer fra 64 til 1.'),
      V('Hvorfor er halvering bedre enn å gjette 1, 2, 3, 4 …?', ['Du kutter bort halvparten av mulighetene hver gang', 'Det er tilfeldig', 'Det er mer morsomt', 'Det finnes ingen forskjell'], 0, 'Tenk på hvor mange tall som er igjen.', 'Hvert gjett eliminerer halvparten, så du kommer raskt i mål.', true)
    ])
  ]));

  U.push(S('Din første kode', '⌨️', [
    P('Nå skal vi gjøre algoritmer om til <strong>kode</strong>. Vi bruker språket <strong>Python</strong>. Prøv selv i boksen. Trykk <strong>Kjør</strong>.'),
    W('kode', { tittel: 'Print og regning', kode: 'print("Hei!")\nprint(2 + 3)\nprint(4 * 5)', forvent: 'Hei!\n5\n20', intro: 'print() skriver noe ut. Prøv å endre tallene!' }),
    C('regel', 'Noen grunnregler', ['<code>print(...)</code> skriver ut tekst eller tall.', 'Tekst står mellom anførselstegn: <code>"Hei"</code>.', 'Regnetegn: <code>+</code> pluss, <code>-</code> minus, <code>*</code> gange, <code>/</code> dele, <code>**</code> potens.', '<code>#</code> starter en kommentar som datamaskinen hopper over.']),
    H2('Variabler'),
    P('En <strong>variabel</strong> er en boks med et navn. Du legger en verdi i boksen og kan bruke den senere.'),
    W('kode', { tittel: 'Variabler', kode: 'side = 5\nareal = side * side\nprint("Arealet er", areal)', forvent: 'Arealet er 25', intro: 'Endre side til 8 og kjør igjen.' }),
    W('kode', { tittel: 'Oppdrag: omkrets', intro: 'Lag variabelen <code>side</code> med verdi 6. Regn ut omkretsen av kvadratet (4 ganger siden) og skriv den ut.', kode: '# skriv koden din her\n', losningKode: 'side = 6\nprint(4 * side)', forvent: '24', hint: 'side = 6, og så print(4 * side).' }),
    O(2, [
      T('Hva skrives ut? <code>a = 6<br>b = a * 2<br>print(b)</code>', 12, 'a er 6.', 'b = 6 · 2 = 12.'),
      T('Hva skrives ut? <code>x = 4<br>x = x + 3<br>print(x)</code>', 7, 'Linje for linje.', 'x = 4 og så x = 4 + 3 = 7.'),
      V('Hva skriver <code>print(10 / 4)</code> ut?', ['2.5', '2', '40', '6'], 0, '/ er vanlig deling.', '10 : 4 = 2,5. Python skriver tall med punktum: 2.5.')
    ])
  ]));

  U.push(S('Løkker: gjenta det samme', '🔁', [
    P('Hva om du skal regne ut 7-gangen? Du kan skrive ti linjer, eller du kan la datamaskinen <strong>gjenta</strong> det. Det kalles en <strong>løkke</strong>.'),
    W('kode', { tittel: '7-gangen', kode: 'for i in range(1, 11):\n    print(7 * i)', forvent: '7\n14\n21\n28\n35\n42\n49\n56\n63\n70', intro: 'range(1, 11) gir tallene 1 til 10. Innrykket (mellomrommene) viser hva som gjentas.' }),
    C('regel', 'Slik leser du en løkke', ['<code>for i in range(1, 11):</code> betyr: la i være 1, så 2, så 3 … til 10.', 'Linjene med <strong>innrykk</strong> under blir gjentatt hver gang.']),
    W('kode', { tittel: 'Oppdrag: summer', intro: 'Skriv en løkke som legger sammen tallene fra 1 til 100, og skriv ut summen. (Gauss fikk 5050.)', kode: 'sum = 0\n# skriv løkken din her\nprint(sum)', losningKode: 'sum = 0\nfor i in range(1, 101):\n    sum = sum + i\nprint(sum)', forvent: '5050', hint: 'Bruk for i in range(1, 101): og legg i til sum.' }),
    O(3, [
      T('Hva skriver løkken ut til slutt? <code>s = 0<br>for i in range(1, 5):<br>&nbsp;&nbsp;&nbsp;&nbsp;s = s + i<br>print(s)</code>', 10, 'i er 1, 2, 3 og 4.', '1 + 2 + 3 + 4 = 10.'),
      T('Hvor mange ganger gjentas <code>for i in range(5):</code>?', 5, 'range(5) gir 0, 1, 2, 3, 4.', 'Den gjentas 5 ganger.'),
      V('Hva skriver <code>for i in range(3):<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Hei")</code> ut?', ['Hei tre ganger', 'Hei én gang', 'Tallet 3', 'Ingenting'], 0, 'Løkken gjentas 3 ganger.', 'Den skriver «Hei» tre ganger.')
    ])
  ]));

  U.push(S('Betingelser: la programmet velge', '🔀', [
    P('Noen ganger skal datamaskinen velge. Da bruker vi <strong>if</strong>, som betyr «hvis». Vi kan også bruke <strong>else</strong>, som betyr «ellers».'),
    W('kode', { tittel: 'Partall eller oddetall?', kode: 'tall = 17\nif tall % 2 == 0:\n    print("partall")\nelse:\n    print("oddetall")', forvent: 'oddetall', intro: '% gir resten ved deling. tall % 2 == 0 betyr «resten er 0 når tallet deles på 2». Endre tallet til 18.' }),
    C('regel', 'Sammenlikninger i Python', ['<code>==</code> er lik (to likhetstegn!).', '<code>!=</code> er ikke lik.', '<code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.', '<code>%</code> gir resten: 17 % 5 er 2.']),
    W('kode', { tittel: 'Oppdrag: delelig med 3', intro: 'Sett <code>tall = 21</code>. Skriv «ja» hvis tallet er delelig med 3 og «nei» ellers.', kode: 'tall = 21\n# skriv koden din her\n', losningKode: 'tall = 21\nif tall % 3 == 0:\n    print("ja")\nelse:\n    print("nei")', forvent: 'ja', hint: 'Bruk if tall % 3 == 0:' }),
    O(3, [
      V('Hva skriver dette ut? <code>x = 10<br>if x &gt; 5:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("stor")<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("liten")</code>', ['stor', 'liten', 'Ingenting', 'Feil'], 0, 'Er 10 større enn 5?', '10 > 5 er sant, så «stor» skrives ut.'),
      T('Hva er 23 % 5 (resten når du deler 23 på 5)?', 3, '23 = 4 · 5 + 3.', '23 : 5 er 4 og rest 3.'),
      V('Hva må stå i betingelsen for å sjekke om x er lik 7?', ['x == 7', 'x = 7', 'x := 7', 'x equals 7'], 0, 'To likhetstegn.', 'Ett likhetstegn gir x en verdi. To (==) sammenligner.', true)
    ])
  ]));

  U.push(S('Teste og forbedre', '🧪', [
    P('Ingen skriver riktig kode første gang. Gode programmerere <strong>tester</strong> programmet med mange verdier og <strong>forbedrer</strong> det. Når du leter etter feil, kalles det <strong>debugging</strong>.'),
    C('regel', 'Test-listen', ['Prøv et <strong>vanlig</strong> tall.', 'Prøv et <strong>grensetall</strong> (0, 1, det største du forventer).', 'Prøv noe <strong>uventet</strong> (et negativt tall).']),
    W('kode', { tittel: 'Finn feilen', intro: 'Programmet skal skrive ut summen 1 + 2 + 3 + 4 + 5 = 15, men noe er galt. Finn og rett feilen.', kode: 'sum = 0\nfor i in range(1, 5):\n    sum = sum + i\nprint(sum)', losningKode: 'sum = 0\nfor i in range(1, 6):\n    sum = sum + i\nprint(sum)', forvent: '15', hint: 'range(1, 5) stopper før 5. Hva må du skrive for å få med 5?' }),
    E('Forbedre en algoritme: summen 1 + 2 + … + 100.', ['Algoritme A: legg sammen ett og ett tall i en løkke (100 steg).', 'Algoritme B: bruk Gauss-trikset: 100 · 101 : 2 = 5050 (1 steg).', 'Begge gir riktig svar, men B er mye raskere. Å finne en bedre algoritme er å forbedre.']),
    W('kode', { tittel: 'Sammenlign de to algoritmene', kode: 'sum = 0\nfor i in range(1, 101):\n    sum = sum + i\nprint(sum)\nprint(100 * 101 // 2)', forvent: '5050\n5050', intro: 'Begge gir samme svar. // betyr heltallsdeling.' }),
    O(4, [
      V('Du tester et program for å finne det største av to tall og det gir feil når tallene er like. Hva bør du gjøre?', ['Teste flere grensetilfeller og rette betingelsen', 'Ignorere det', 'Slette programmet', 'Bare teste ulike tall'], 0, 'Feil som skjer i spesielle tilfeller må finnes og rettes.', 'Gode tester inkluderer spesialtilfeller som like tall.', true),
      F('Beskriv en algoritme (ikke kode) for å finne ut om et tall er et primtall. Hvordan kan du teste at den virker?', ['Algoritme: Prøv å dele tallet på 2, 3, 4 … opp til tallet minus 1. Hvis noen deling går opp uten rest, er det ikke et primtall. Hvis ingen går opp, er det et primtall.', 'Test med kjente tall: 7 (primtall), 9 (ikke), 1 og 2 (spesialtilfeller), 91 (ikke, 7 · 13).', 'Forbedring: det holder å prøve opp til kvadratroten av tallet.'])
    ]),
    SJ('Dette kan du nå', ['Forklare hva en algoritme er', 'Lage en algoritme for en enkel oppgave', 'Skrive enkel kode med print og variabler', 'Bruke en løkke og en if-setning', 'Teste og forbedre en algoritme'])
  ]));

  M.register('utforsk', '8/programmering', {
    tittel: 'Algoritmer og programmering',
    ingress: 'Lag, test og forbedre algoritmer. Du skriver din første kode i Python, rett i nettleseren.',
    mal: ['utforske hvordan algoritmer kan skapes, testes og forbedres', 'skrive enkel kode med variabler, løkker og betingelser'],
    ordliste: ORD, seksjoner: U
  });

  /* ====================== STEG ====================== */
  const T1 = [];
  T1.push(S('Steg 1: Hva er en algoritme?', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('En <strong>algoritme</strong> er en oppskrift. Den sier hva du skal gjøre, <strong>steg for steg</strong>. Rekkefølgen er viktig.', true),
    E('Algoritme for å lage en brødskive.', ['1. Ta frem en skive.', '2. Smør på smør.', '3. Legg på pålegg.', 'Hvis du bytter rekkefølge, blir det rot! 🎉']),
    OS([
      V('Hva er en algoritme?', ['En oppskrift med steg', 'Et tall', 'En tegning'], 0, 'Tenk på en kakeoppskrift.', 'En algoritme er en oppskrift med steg.', true),
      V('Hva må du gjøre først for å regne 2 · (3 + 4)?', ['3 + 4', '2 · 3'], 0, 'Parentesen først.', '3 + 4 = 7. Så 2 · 7 = 14.', true),
      V('Hva skjer om du bytter rekkefølge på steg i en algoritme?', ['Det kan bli feil', 'Ingenting'], 0, 'Rekkefølgen er viktig.', 'Det kan bli feil.', true)
    ])
  ]));
  T1.push(S('Steg 2: Første kode', '2', [
    G('Nå skriver vi kode! Det er helt ufarlig.'),
    P('Vi bruker <strong>print</strong> for å få datamaskinen til å skrive. Trykk <strong>Kjør</strong>.', true),
    W('kode', { tittel: 'Din første kode', kode: 'print("Hei!")', forvent: 'Hei!', intro: 'Trykk Kjør. Endre så teksten mellom anførselstegnene og kjør på nytt.' }),
    W('kode', { tittel: 'Regning', kode: 'print(3 + 4)\nprint(5 * 2)', forvent: '7\n10', intro: '+ er pluss og * er gange.' }),
    C('regel', 'Husk', ['Tekst står mellom anførselstegn: <code>"Hei"</code>.', 'Tall skrives uten anførselstegn.', '<code>*</code> betyr gange.']),
    OS([
      T('Hva skriver <code>print(6 + 2)</code> ut?', 8, '6 + 2.', '6 + 2 = 8.'),
      T('Hva skriver <code>print(3 * 4)</code> ut?', 12, '3 gange 4.', '3 · 4 = 12.'),
      V('Hva gjør <code>print("Hei")</code>?', ['Skriver ut Hei', 'Regner ut Hei', 'Sletter Hei'], 0, 'print betyr skriv ut.', 'Skriver ut Hei.', true)
    ])
  ]));
  T1.push(S('Steg 3: Variabler', '3', [
    G('En variabel er som en boks med navn.'),
    P('Vi kan lagre et tall i en <strong>variabel</strong>. Det er som en boks med et navn på.', true),
    W('kode', { tittel: 'Variabel', kode: 'a = 5\nb = 3\nprint(a + b)', forvent: '8', intro: 'a er en boks med 5. b er en boks med 3. Endre tallene og kjør på nytt.' }),
    E('Hva skriver dette ut? a = 4, b = a * 2, print(b)', ['a er 4.', 'b blir 4 · 2 = 8.', 'print(b) skriver ut 8. 🎉']),
    OS([
      T('<code>a = 5<br>b = 3<br>print(a + b)</code> Hva skrives ut?', 8, '5 + 3.', '5 + 3 = 8.'),
      T('<code>x = 10<br>print(x - 4)</code> Hva skrives ut?', 6, '10 − 4.', '10 − 4 = 6.'),
      T('<code>a = 4<br>b = a * 2<br>print(b)</code> Hva skrives ut?', 8, 'a er 4.', 'b = 4 · 2 = 8.')
    ])
  ]));
  T1.push(S('Steg 4: Gjenta med løkke', '4', [
    G('Siste steg! La datamaskinen gjenta for oss.'),
    P('En <strong>løkke</strong> gjentar det samme. Se på 3-gangen:', true),
    W('kode', { tittel: '3-gangen', kode: 'for i in range(1, 6):\n    print(3 * i)', forvent: '3\n6\n9\n12\n15', intro: 'Her gjentas print 5 ganger. i er 1, så 2, så 3, 4 og 5.' }),
    C('regel', 'Husk', ['<code>for i in range(1, 6):</code> betyr: la i være 1, 2, 3, 4, 5.', 'Linjen under har <strong>innrykk</strong>. Den blir gjentatt.']),
    OS([
      T('Hvor mange tall skrives ut av <code>for i in range(1, 6):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</code>?', 5, 'i er 1, 2, 3, 4, 5.', 'Det er 5 tall.'),
      V('Hvilke tall skrives ut av <code>for i in range(1, 4):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</code>?', ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3'], 0, 'range(1, 4) stopper før 4.', '1, 2 og 3.', true)
    ]),
    SJ('Dette kan du nå', ['Forklare hva en algoritme er', 'Bruke print', 'Lage variabler', 'Forstå en enkel løkke'])
  ]));

  M.register('steg', '8/programmering', {
    tittel: 'Algoritmer og programmering',
    ingress: 'Små steg, tydelige eksempler og hjelp hele veien. Du skriver din første kode.',
    mal: ['forstå hva en algoritme er', 'bruke print og variabler', 'forstå en enkel løkke'],
    ordliste: ORD, seksjoner: T1
  });

  /* ====================== EKSTRA ====================== */
  M.ekstra['8/programmering'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('print', '🖨️', 'Hva skrives ut?', 8, 'Gå linje for linje og finn hva som skrives ut.', function (r, i) {
      const a = r.int(2, 9), b = r.int(2, lett ? 6 : 9);
      if (i % 3 === 0) return H.e('<code>a = ' + a + '<br>b = ' + b + '<br>print(a + b)</code>', a + b, a + ' + ' + b + ' = ' + (a + b));
      if (i % 3 === 1) return H.e('<code>a = ' + a + '<br>a = a * ' + b + '<br>print(a)</code>', a * b, 'a blir ' + a + ' · ' + b + ' = ' + a * b);
      return H.e('<code>x = ' + (a + b) + '<br>y = x - ' + b + '<br>print(y)</code>', a, 'y = ' + (a + b) + ' − ' + b + ' = ' + a);
    }));
    sek.push(H.ek('lokke', '🔁', 'Løkker', 8, 'Hva er summen som skrives ut i slutten?', function (r) {
      const n = r.int(3, lett ? 6 : 10); const s = n * (n + 1) / 2;
      return H.e('<code>s = 0<br>for i in range(1, ' + (n + 1) + '):<br>&nbsp;&nbsp;&nbsp;&nbsp;s = s + i<br>print(s)</code>', s, '1 + 2 + … + ' + n + ' = ' + s);
    }));
    sek.push(H.ek('rest', '➗', 'Rest med %', 8, 'Hva er resten? (a % b)', function (r) {
      const b = r.int(2, 9), a = r.int(b + 1, 60);
      return H.e('Hva skriver <code>print(' + a + ' % ' + b + ')</code> ut?', a % b, a + ' = ' + Math.floor(a / b) + ' · ' + b + ' + ' + (a % b) + ', så resten er ' + (a % b));
    }));
    sek.push(H.ek('halv', '🎯', 'Gjette med halvering', 6, 'Hvor mange gjett trenger du maks med halvering?', function (r) {
      const n = r.pick([4, 8, 16, 32, 64, 128, 256, 1024]); const k = Math.log2(n);
      return H.e('Tallet er mellom 1 og ' + n + '. Hvor mange gjett trenger du maks med halvering?', k, n + ' halveres ' + k + ' ganger til 1.');
    }));
    return H.ekDef('Algoritmer og programmering', sek);
  };
})();
