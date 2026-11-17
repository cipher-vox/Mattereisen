/* ============================================================
   Verktøy: Python fra scratch – UTFORSK
   Alt kan prøves rett i nettleseren. Ingenting installeres.
   Læreplan: 8.10 (algoritmer), 9.11 (simulering), 10.10–10.11 (programmering og Python)
   ============================================================ */
(function () {
  const M = window.MATTE;
  const ORD = [
    { ord: ['programmering'], forklaring: 'Å skrive instruksjoner som en datamaskin kan følge.' },
    { ord: ['algoritmen', 'algoritme', 'algoritmer'], forklaring: 'En oppskrift med steg som må gjøres i riktig rekkefølge for å løse et problem.' },
    { ord: ['variabel', 'variabelen', 'variabler'], forklaring: 'Et navn på en boks i datamaskinen. I boksen ligger en verdi, for eksempel et tall.' },
    { ord: ['streng', 'tekststreng'], forklaring: 'Tekst i Python. Den står mellom anførselstegn, for eksempel "hei".' },
    { ord: ['heltall'], forklaring: 'Tall uten komma, som 5 eller -12. I Python kalles de int.' },
    { ord: ['desimaltall'], forklaring: 'Tall med komma. I Python skriver vi punktum: 3.14. De kalles float.' },
    { ord: ['funksjonen', 'funksjon', 'funksjoner'], forklaring: 'En liten oppskrift som du gir et navn. Du kan bruke den mange ganger.' },
    { ord: ['løkke', 'løkker', 'løkka'], forklaring: 'En måte å gjenta det samme flere ganger uten å skrive det om og om igjen.' },
    { ord: ['betingelse', 'betingelsen'], forklaring: 'Et spørsmål som er sant eller usant, for eksempel alder >= 13.' },
    { ord: ['innrykk'], forklaring: 'Mellomrom i begynnelsen av en linje. I Python viser innrykk hva som hører sammen.' },
    { ord: ['feilmelding', 'feilmeldingen'], forklaring: 'Teksten som datamaskinen skriver når noe er galt. Den sier hvilken linje du skal se på.' },
    { ord: ['liste', 'lister', 'listen'], forklaring: 'Flere verdier i en rekke, skrevet i firkantparenteser: [3, 5, 8].' },
    { ord: ['kommentar', 'kommentarer'], forklaring: 'Tekst som begynner med # . Datamaskinen hopper over den. Den er til for oss mennesker.' },
    { ord: ['debugging', 'feilsøking'], forklaring: 'Å lete etter og rette feil i et program.' }
  ];

  const S = [];

  /* ---------- 1 ---------- */
  S.push({
    tittel: 'Hva er programmering?', ikon: '🤖',
    blokker: [
      { t: 'p', tekst: 'Programmering er å gi en datamaskin <strong>nøyaktige instruksjoner</strong>. Datamaskinen er superrask, men den tenker ikke selv. Den gjør akkurat det du skriver, ikke det du mente å skrive.' },
      { t: 'kort', kort: [
        { ikon: '🍳', tittel: 'Som en oppskrift', tekst: 'En algoritme er en oppskrift: gjør dette, så dette, så dette. Rekkefølgen er viktig.' },
        { ikon: '🧱', tittel: 'Som lego', tekst: 'Store programmer bygges av små biter. Vi starter med de minste.' },
        { ikon: '🔍', tittel: 'Prøv og feil', tekst: 'Ingen skriver riktig første gang. Å finne feil og rette dem er en del av jobben.' }
      ] },
      { t: 'callout', stil: 'virkelighet', tittel: 'Hvorfor i mattetimen?', tekst: 'Datamaskinen kan regne tusenvis av regnestykker på et øyeblikk. Da kan vi utforske mønstre, teste mange tall og se sammenhenger som er vanskelige å se for hånd.' },
      { t: 'h', tekst: 'Prøv selv: ditt første program' },
      { t: 'p', tekst: 'Boksen under er en ekte Python-editor. Trykk <strong>Kjør</strong> og se hva som skjer. Deretter kan du endre teksten mellom anførselstegnene og kjøre på nytt.' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Hei, verden!', kode: 'print("Hei, verden!")', forvent: 'Hei, verden!', ros: 'Du har skrevet og kjørt ditt første program.' } },
      { t: 'callout', stil: 'tips', tittel: 'Hva skjedde?', tekst: '<code>print</code> betyr «skriv ut». Teksten i parentesen kommer opp i resultatet. Anførselstegnene <code>" "</code> forteller at dette er tekst.' },
      { t: 'oppgaver', niva: 1, oppgaver: [
        { type: 'valg', tekst: 'Hva gjør <code>print("Matte er gøy")</code>?', valg: ['Skriver ut: Matte er gøy', 'Regner ut Matte', 'Lager en liste', 'Ingenting'], riktig: 0, hint: 'print betyr skriv ut.', losning: 'print skriver teksten mellom anførselstegnene ut i resultatfeltet.' },
        { type: 'valg', tekst: 'Hva er en algoritme?', valg: ['En oppskrift med steg i riktig rekkefølge', 'En type datamaskin', 'Et tall', 'En feilmelding'], riktig: 0, fast: true, hint: 'Tenk på en matoppskrift.', losning: 'En algoritme er en oppskrift: steg som gjøres i riktig rekkefølge.' }
      ] },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Oppdrag: si hei til deg selv', intro: 'Endre programmet slik at det skriver ut <strong>Hei, jeg heter</strong> etterfulgt av navnet ditt. Hvis du ikke vil bruke ditt eget navn, finner du på et.', kode: 'print("Hei!")', sjekk: (u) => /^Hei, jeg heter .+/.test(u.trim()), hint: 'Skriv for eksempel print("Hei, jeg heter Sara").', ros: 'Flott! Nå kan du skrive ut tekst.' } }
    ]
  });

  /* ---------- 2 ---------- */
  S.push({
    tittel: 'Tekst og print', ikon: '💬',
    blokker: [
      { t: 'p', tekst: 'Tekst i Python kalles en <strong>streng</strong>. Du kan bruke enkle eller doble anførselstegn, men begynn og slutt med de samme. Du kan skrive ut flere ting i én print ved å sette komma mellom.' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Flere print', kode: 'print("Matte")\nprint("er")\nprint("gøy!")\nprint("Tall:", 5, 12)\nprint("Å")  # dette er en kommentar', forvent: 'Matte\ner\ngøy!\nTall: 5 12\nÅ', hint: '' } },
      { t: 'callout', stil: 'regel', tittel: 'Regler for tekst', punkter: ['Tekst står mellom <code>" "</code> eller <code>\' \'</code>.', 'Hver <code>print</code> skriver på en ny linje.', 'Komma mellom ting i print gir mellomrom i utskriften.', 'Alt etter <code>#</code> er en <strong>kommentar</strong>. Datamaskinen hopper over den.'] },
      { t: 'callout', stil: 'advarsel', tittel: 'Vanlig feil', tekst: 'Glemmer du ett anførselstegn eller en parentes, får du en feilmelding. Prøv selv under, og les hva datamaskinen sier.' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Finn feilen', losningKode: 'print("Hei på deg")', kode: 'print("Hei på deg)', tillatFeil: true, intro: 'Kjør programmet. Hva er galt? Rett feilen og kjør på nytt.', forvent: 'Hei på deg', hint: 'Teksten mangler et anførselstegn til slutt.' } },
      { t: 'oppgaver', niva: 2, oppgaver: [
        { type: 'valg', tekst: 'Hva skriver koden ut?<br><code>print("a")<br>print("b")</code>', valg: ['a og b på hver sin linje', 'ab på én linje', 'a, b', 'Ingenting'], riktig: 0, hint: 'Hver print gir ny linje.', losning: 'Hver print skriver ut på en ny linje: først a, så b.' },
        { type: 'valg', tekst: 'Hva skriver <code>print("Pris:", 50)</code> ut?', kjor: 'print("Pris:", 50)', valg: ['Pris: 50', 'Pris:50', 'Pris: "50"', 'Feil'], riktig: 0, fast: true, hint: 'Komma i print gir et mellomrom.', losning: 'Komma mellom ting i print gir et mellomrom: Pris: 50.' },
        { type: 'valg', tekst: 'Hva er en kommentar i Python?', valg: ['Tekst etter # som datamaskinen ikke kjører', 'En feilmelding', 'Et tall', 'En løkke'], riktig: 0, hint: 'Den begynner med #.', losning: 'Kommentarer begynner med # og er bare til for de som leser koden.' }
      ] }
    ]
  });

  /* ---------- 3 ---------- */
  S.push({
    tittel: 'Variabler: bokser med navn', ikon: '📦',
    blokker: [
      { t: 'p', tekst: 'En <strong>variabel</strong> er som en boks med et navn på. I boksen kan du legge en verdi, for eksempel et tall eller en tekst. Du lager en variabel med <strong>=</strong>. Tenk at likhetstegnet betyr «legg inn i boksen».' },
      { t: 'html', html: '<div class="py-bokser" role="img" aria-label="Tre bokser: alder med 13, pris med 49.9 og navn med Mia"><div class="py-boks"><div class="py-boks-navn">alder</div><div class="py-boks-verdi int">13</div><div class="py-boks-type">heltall (int)</div></div><div class="py-boks"><div class="py-boks-navn">pris</div><div class="py-boks-verdi flt">49.9</div><div class="py-boks-type">desimaltall (float)</div></div><div class="py-boks"><div class="py-boks-navn">navn</div><div class="py-boks-verdi str">"Mia"</div><div class="py-boks-type">tekst (str)</div></div></div>' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Lag og bruk variabler', kode: 'alder = 13\npris = 49.9\nnavn = "Mia"\nprint(navn, "er", alder, "år")\nprint("Prisen er", pris)\nalder = alder + 1\nprint("Neste år er hun", alder)', forvent: 'Mia er 13 år\nPrisen er 49.9\nNeste år er hun 14' } },
      { t: 'callout', stil: 'regel', tittel: 'Tre typer verdier', punkter: ['<strong>int</strong>: heltall, for eksempel <code>7</code> eller <code>-3</code>.', '<strong>float</strong>: desimaltall. Skriv <strong>punktum</strong>, ikke komma: <code>2.5</code>.', '<strong>str</strong>: tekst i anførselstegn, for eksempel <code>"hei"</code>.'] },
      { t: 'callout', stil: 'advarsel', tittel: 'Likhetstegn betyr noe annet her', tekst: 'I matte betyr <code>x = x + 1</code> at noe er galt. I Python betyr det: <strong>ta verdien av x, legg til 1, og legg svaret tilbake i x</strong>. Det er en instruksjon, ikke en påstand.' },
      { t: 'callout', stil: 'tips', tittel: 'Navn på variabler', tekst: 'Velg navn som sier hva som ligger i boksen: <code>pris</code> er bedre enn <code>p</code>. Navnet kan ikke begynne med et tall og kan ikke ha mellomrom (bruk <code>_</code>, for eksempel <code>antall_epler</code>).' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Hvilken type er det?', kode: 'print(type(5))\nprint(type(5.0))\nprint(type("5"))', forvent: "<class 'int'>\n<class 'float'>\n<class 'str'>", intro: 'Tallet 5, desimaltallet 5.0 og teksten "5" ser like ut, men er tre ulike typer.' } },
      { t: 'oppgaver', niva: 2, oppgaver: [
        { type: 'valg', tekst: 'Hva skrives ut?<br><code>x = 4<br>x = x + 3<br>print(x)</code>', kjor: 'x = 4\nx = x + 3\nprint(x)', valg: ['7', '4', '3', 'x'], riktig: 0, hint: 'Gå linje for linje. Hva ligger i boksen x etter hver linje?', losning: ['x starter som 4.', 'Så blir x = 4 + 3 = 7.', 'print skriver ut 7.'] },
        { type: 'valg', tekst: 'Hvilken type er <code>3.5</code>?', valg: ['float', 'int', 'str', 'bool'], riktig: 0, fast: true, hint: 'Den har desimaler.', losning: 'Tall med desimaler er float.' },
        { type: 'valg', tekst: 'Hvilket variabelnavn er <strong>ikke</strong> lov?', valg: ['2tall', 'tall2', 'mitt_tall', 'tall'], riktig: 0, hint: 'Se på hva et navn ikke kan begynne med.', losning: 'Et variabelnavn kan ikke begynne med et tall. 2tall er ikke lov, men tall2 er greit.' },
        { type: 'tall', tekst: 'Hva skrives ut? <code>a = 6<br>b = a * 2<br>a = 1<br>print(b)</code>', kjor: 'a = 6\nb = a * 2\na = 1\nprint(b)', svar: 12, hint: 'b får verdien 12 når linjen kjøres. Endres b når a endres?', losning: 'b = 6 · 2 = 12. Når a senere blir 1, ligger 12 fortsatt i b. Svaret er 12.' }
      ] },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Oppdrag: pizzaregning', intro: 'En pizza koster 129 kroner. Lag variabelen <code>pris</code> med den verdien og variabelen <code>antall</code> med verdien 3. Skriv ut <code>pris * antall</code>.', losningKode: 'pris = 129\nantall = 3\nprint(pris * antall)', kode: '# skriv koden din her\n', forvent: '387', hint: 'pris = 129, antall = 3, og så print(pris * antall).', ros: '129 · 3 = 387 kroner.' } }
    ]
  });

  /* ---------- 4 ---------- */
  S.push({
    tittel: 'Regne med Python', ikon: '🧮',
    blokker: [
      { t: 'p', tekst: 'Python er en kjempekalkulator. De fleste regnetegn er som du er vant til, men gange og potens ser litt annerledes ut.' },
      { t: 'tabell', hode: ['I matte', 'I Python', 'Eksempel', 'Svar'], rader: [['Pluss', '+', '7 + 2', '9'], ['Minus', '-', '7 - 2', '5'], ['Gange', '*', '7 * 2', '14'], ['Dele', '/', '7 / 2', '3.5'], ['Heltallsdivisjon', '//', '7 // 2', '3'], ['Rest', '%', '7 % 2', '1'], ['Potens', '**', '7 ** 2', '49']] },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Utforsk regnetegnene', kode: 'print(7 + 2)\nprint(7 / 2)\nprint(7 // 2)\nprint(7 % 2)\nprint(7 ** 2)\nprint(2 + 3 * 4)\nprint((2 + 3) * 4)', forvent: '9\n3.5\n3\n1\n49\n14\n20' } },
      { t: 'callout', stil: 'regel', tittel: 'Samme regnerekkefølge som i matte', tekst: 'Potens først, så gange og dele, så pluss og minus. Parenteser regnes først. <code>2 + 3 * 4</code> blir 14, men <code>(2 + 3) * 4</code> blir 20.' },
      { t: 'callout', stil: 'tips', tittel: 'Rest med %', tekst: '<code>%</code> gir resten etter deling. <code>17 % 5</code> er 2, fordi 17 = 3 · 5 + 2. Er et tall <code>n</code> et partall, er <code>n % 2</code> lik 0. Smart å bruke til å sjekke delelighet!' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Kvadratrot og mer med math', intro: 'Noen funksjoner finner du i «math»-verktøykassen. Du henter den med <code>import math</code>.', kode: 'import math\nprint(math.sqrt(49))\nprint(math.sqrt(2))\nprint(math.pi)\nprint(round(math.sqrt(2), 3))', forvent: '7.0\n1.4142135623730951\n3.141592653589793\n1.414' } },
      { t: 'oppgaver', niva: 2, oppgaver: [
        { type: 'tall', tekst: 'Hva skrives ut? <code>print(3 + 4 * 2)</code>', kjor: 'print(3 + 4 * 2)', svar: 11, hint: 'Gange før pluss.', losning: '4 · 2 = 8, og 3 + 8 = 11.' },
        { type: 'tall', tekst: 'Hva skrives ut? <code>print(17 % 5)</code>', kjor: 'print(17 % 5)', svar: 2, hint: '17 delt på 5 er 3 med rest …', losning: '17 = 3 · 5 + 2, så resten er 2.' },
        { type: 'tall', tekst: 'Hva skrives ut? <code>print(2 ** 5)</code>', kjor: 'print(2 ** 5)', svar: 32, hint: '2 ganget med seg selv 5 ganger.', losning: '2 · 2 · 2 · 2 · 2 = 32.' },
        { type: 'valg', tekst: 'Hva skrives ut? <code>print(9 // 2)</code>', kjor: 'print(9 // 2)', valg: ['4', '4.5', '5', '1'], riktig: 0, hint: '// kaster bort desimalene når den deler.', losning: '9 / 2 = 4,5. Heltallsdivisjon gir bare hele antall ganger det går opp: 4.' },
        { type: 'valg', tekst: 'Hva er sant om <code>n % 2 == 0</code>?', valg: ['n er et partall', 'n er et oddetall', 'n er null', 'n er negativ'], riktig: 0, fast: true, hint: 'Partall har ingen rest når de deles på 2.', losning: 'Er resten 0 etter å ha delt på 2, er tallet et partall.' }
      ] },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Oppdrag: areal og omkrets', intro: 'Et rektangel har lengde 12 og bredde 7. Skriv ut arealet på én linje, og omkretsen på neste linje (bare tallene).', losningKode: 'lengde = 12\nbredde = 7\nprint(lengde * bredde)\nprint(2 * (lengde + bredde))', kode: 'lengde = 12\nbredde = 7\n', forvent: '84\n38', hint: 'Areal: lengde * bredde. Omkrets: 2 * (lengde + bredde).' } }
    ]
  });

  /* ---------- 5 ---------- */
  S.push({
    tittel: 'Spør brukeren og lag samtaler', ikon: '🗣️',
    blokker: [
      { t: 'p', tekst: 'Med <code>input()</code> kan programmet <strong>spørre</strong> og vente på et svar. Svaret kommer alltid som <strong>tekst</strong>. Vil du regne med det, må du gjøre det om til tall med <code>int()</code> (heltall) eller <code>float()</code> (desimaltall).' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Spør om navn og alder', input: true, testInput: ['Ida', '13'], kode: 'navn = input("Hva heter du? ")\nalder = int(input("Hvor gammel er du? "))\nprint("Hei", navn)\nprint("Om 10 år er du", alder + 10)', intro: 'Skriv svarene i feltet «Svar til input()» under koden (ett svar per linje), og trykk Kjør. Prøv for eksempel <strong>Ida</strong> på første linje og <strong>13</strong> på neste.', forvent: undefined } },
      { t: 'callout', stil: 'advarsel', tittel: 'Tekst er ikke tall', tekst: 'Uten <code>int()</code> er svaret tekst. Da blir <code>"5" + "3"</code> lik <code>"53"</code> (tekstene settes sammen), ikke 8. Prøv under!' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Tekst mot tall', kode: 'print("5" + "3")\nprint(5 + 3)\nprint(int("5") + int("3"))', forvent: '53\n8\n8' } },
      { t: 'h', tekst: 'f-tekst: sett variabler inn i tekst' },
      { t: 'p', tekst: 'Skriver du <code>f</code> foran anførselstegnet, kan du sette variabler inni <strong>krøllparenteser</strong>. Du kan også styre antall desimaler med <code>:.2f</code> (to desimaler).' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'f-tekst', kode: 'pris = 49.9\nantall = 3\nsum = pris * antall\nprint(f"{antall} stk à {pris} kr gir {sum:.2f} kr")', forvent: '3 stk à 49.9 kr gir 149.70 kr' } },
      { t: 'oppgaver', niva: 2, oppgaver: [
        { type: 'valg', tekst: 'Hva gjør <code>int("42")</code>?', valg: ['Gjør teksten "42" om til tallet 42', 'Skriver ut 42', 'Gjør 42 om til tekst', 'Gir en feilmelding'], riktig: 0, hint: 'int betyr heltall.', losning: 'int() gjør tekst som ser ut som et heltall, om til et ekte tall.' },
        { type: 'valg', tekst: 'Hva skrives ut? <code>print("2" + "3")</code>', kjor: 'print("2" + "3")', valg: ['23', '5', '"23"', 'Feil'], riktig: 0, hint: 'Tekster settes sammen.', losning: 'Tekst + tekst setter tekstene etter hverandre: 23.' },
        { type: 'valg', tekst: 'Hva skrives ut? <code>x = 4<br>print(f"x er {x * 2}")</code>', kjor: 'x = 4\nprint(f"x er {x * 2}")', valg: ['x er 8', 'x er x * 2', 'x er 4', 'Feil'], riktig: 0, hint: 'Det som står i krøllparentesen, regnes ut.', losning: 'Uttrykket {x * 2} regnes ut til 8 og settes inn i teksten.' }
      ] },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Oppdrag: dobbel og halv', input: true, intro: 'Lag et program som spør om et tall og skriver ut <strong>dobbelt</strong> og <strong>halvparten</strong> av tallet. Test med svaret 10 i svarfeltet. Programmet skal skrive <code>Dobbelt: 20</code> og <code>Halvparten: 5.0</code>.', losningKode: 'x = int(input(\"Skriv et tall: \"))\nprint(\"Dobbelt:\", x * 2)\nprint(\"Halvparten:\", x / 2)', kode: 'x = int(input("Skriv et tall: "))\n', testInput: ['10'], sjekk: (u) => /Dobbelt: 20/.test(u) && /Halvparten: 5(\.0)?/.test(u), hint: 'Bruk print("Dobbelt:", x * 2) og print("Halvparten:", x / 2).' } }
    ]
  });

  /* ---------- 6 ---------- */
  S.push({
    tittel: 'Valg: hvis, ellers', ikon: '🔀',
    blokker: [
      { t: 'p', tekst: 'Programmer kan velge hva de gjør. Vi bruker <strong>if</strong> («hvis»), <strong>elif</strong> («ellers hvis») og <strong>else</strong> («ellers»). Etter betingelsen kommer et <strong>kolon</strong>, og linjene som hører til må ha <strong>innrykk</strong> (4 mellomrom).' },
      { t: 'html', html: '<div class="py-flyt" role="img" aria-label="Flytskjema: er alder minst 13? Ja: du kan bruke appen. Nei: du er for ung."><div class="py-f-boks sp">alder &gt;= 13 ?</div><div class="py-f-grener"><div><div class="py-f-pil ja">Ja</div><div class="py-f-boks ok">print("Velkommen!")</div></div><div><div class="py-f-pil nei">Nei</div><div class="py-f-boks no">print("Du er for ung")</div></div></div></div>' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'if og else', kode: 'alder = 14\nif alder >= 13:\n    print("Velkommen!")\nelse:\n    print("Du er for ung")', forvent: 'Velkommen!', intro: 'Endre alderen til 11 og kjør på nytt. Hva skjer?' } },
      { t: 'tabell', hode: ['Sammenligning', 'Betyr', 'Eksempel', 'Svar'], rader: [['==', 'er lik', '5 == 5', 'True'], ['!=', 'er ikke lik', '5 != 3', 'True'], ['<', 'mindre enn', '3 < 2', 'False'], ['<=', 'mindre enn eller lik', '3 <= 3', 'True'], ['>', 'større enn', '4 > 1', 'True'], ['>=', 'større enn eller lik', '2 >= 5', 'False']] },
      { t: 'callout', stil: 'advarsel', tittel: '= og == er ikke det samme', tekst: '<code>=</code> betyr «legg verdien i boksen». <code>==</code> betyr «er disse like?». Å blande dem er en av de vanligste feilene.' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Flere valg: karakterer', kode: 'poeng = 78\nif poeng >= 90:\n    print("Karakter 6")\nelif poeng >= 75:\n    print("Karakter 5")\nelif poeng >= 60:\n    print("Karakter 4")\nelse:\n    print("Karakter 3 eller lavere")', forvent: 'Karakter 5', intro: 'Datamaskinen sjekker ovenfra og ned og stopper ved første betingelse som er sann.' } },
      { t: 'callout', stil: 'tips', tittel: 'og, eller, ikke', tekst: '<code>and</code> betyr at begge må stemme, <code>or</code> at minst én må stemme, og <code>not</code> snur svaret. Eksempel: <code>if x &gt; 0 and x &lt; 10:</code> sjekker at x ligger mellom 0 og 10.' },
      { t: 'oppgaver', niva: 3, oppgaver: [
        { type: 'valg', tekst: 'Hva skrives ut?<br><code>x = 5<br>if x &gt; 3:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("A")<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("B")</code>', kjor: 'x = 5\nif x > 3:\n    print("A")\nelse:\n    print("B")', valg: ['A', 'B', 'A og B', 'Ingenting'], riktig: 0, hint: 'Er 5 større enn 3?', losning: '5 > 3 er sant, så koden under if kjøres: A.' },
        { type: 'valg', tekst: 'Hva skrives ut?<br><code>x = 10<br>if x &lt; 5:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("liten")<br>elif x &lt; 20:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("middels")<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("stor")</code>', kjor: 'x = 10\nif x < 5:\n    print("liten")\nelif x < 20:\n    print("middels")\nelse:\n    print("stor")', valg: ['middels', 'liten', 'stor', 'liten og middels'], riktig: 0, hint: 'Sjekk betingelsene ovenfra og ned.', losning: '10 < 5 er usant. 10 < 20 er sant, så «middels» skrives ut, og resten hoppes over.' },
        { type: 'valg', tekst: 'Hva skrives ut? <code>print(7 % 2 == 1)</code>', kjor: 'print(7 % 2 == 1)', valg: ['True', 'False', '1', 'Feil'], riktig: 0, hint: '7 % 2 er resten av 7 delt på 2.', losning: '7 % 2 = 1, og 1 == 1 er sant: True.' },
        { type: 'valg', tekst: 'Hvilken linje mangler for at koden skal virke? <code>if x &gt; 3<br>&nbsp;&nbsp;&nbsp;&nbsp;print("stor")</code>', valg: ['Kolon (:) etter betingelsen', 'Anførselstegn rundt x', 'En likhetstegn', 'Et komma'], riktig: 0, fast: true, hint: 'if-linjer slutter med noe spesielt.', losning: 'En if-linje må slutte med kolon: if x > 3:' }
      ] },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Oppdrag: partall eller oddetall?', intro: 'Variabelen <code>n</code> har en verdi. Lag et program som skriver <strong>partall</strong> hvis n er et partall, og <strong>oddetall</strong> ellers. Test med flere verdier for n!', losningKode: 'n = 14\nif n % 2 == 0:\n    print(\"partall\")\nelse:\n    print(\"oddetall\")', kode: 'n = 14\n', sjekk: (u, kode) => u.trim() === 'partall' && /if/.test(kode), hint: 'if n % 2 == 0: print("partall") else: print("oddetall") (med kolon og innrykk).', ros: 'Bytt n til 7 og se at det skrives «oddetall».' } }
    ]
  });

  /* ---------- 7 ---------- */
  S.push({
    tittel: 'Løkker: gjenta uten å skrive om', ikon: '🔁',
    blokker: [
      { t: 'p', tekst: 'Skal du skrive tallene fra 1 til 100? Da vil du ikke skrive 100 linjer. En <strong>løkke</strong> gjentar kode for deg. Den mest brukte heter <strong>for</strong>, og den bruker <code>range()</code> til å lage rekker av tall.' },
      { t: 'tabell', hode: ['Skriver du', 'Får du tallene', 'Husk'], rader: [['range(5)', '0, 1, 2, 3, 4', 'Starter på 0 og stopper <strong>før</strong> 5'], ['range(1, 6)', '1, 2, 3, 4, 5', 'Start og stopp-før'], ['range(0, 10, 2)', '0, 2, 4, 6, 8', 'Tredje tall er steget']] },
      { t: 'widget', navn: 'kode', opts: { tittel: 'En for-løkke', kode: 'for i in range(1, 6):\n    print(i, "ganger 3 er", i * 3)', forvent: '1 ganger 3 er 3\n2 ganger 3 er 6\n3 ganger 3 er 9\n4 ganger 3 er 12\n5 ganger 3 er 15', intro: 'Variabelen <code>i</code> får ny verdi for hver runde. Linjene med innrykk gjentas.' } },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Summere med en løkke', kode: 'sum = 0\nfor tall in range(1, 101):\n    sum = sum + tall\nprint("Summen av 1 til 100 er", sum)', forvent: 'Summen av 1 til 100 er 5050', intro: 'Den berømte summen 1 + 2 + … + 100. Datamaskinen bruker et øyeblikk. Gauss brukte tre minutter som liten gutt!' } },
      { t: 'h', tekst: 'while: gjenta så lenge noe er sant' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'while-løkke: dobling', kode: 'penger = 100\nar = 0\nwhile penger < 1000:\n    penger = penger * 2\n    ar = ar + 1\nprint("Etter", ar, "dobblinger har du", penger)', forvent: 'Etter 4 dobblinger har du 1600', intro: 'while sjekker betingelsen før hver runde. Se opp: glemmer du å endre noe inni løkka, går den for alltid!' } },
      { t: 'callout', stil: 'advarsel', tittel: 'Uendelig løkke', tekst: 'Hvis betingelsen aldri blir usann, stopper aldri løkka. Her på siden stopper programmet etter en stund og gir en melding, men på en vanlig datamaskin må du avbryte det selv.' },
      { t: 'oppgaver', niva: 3, oppgaver: [
        { type: 'valg', tekst: 'Hvilke tall skrives ut? <code>for i in range(4): print(i)</code>', kjor: 'for i in range(4):\n    print(i, end=" ")', valg: ['0 1 2 3', '1 2 3 4', '0 1 2 3 4', '1 2 3'], riktig: 0, hint: 'range(4) starter på 0 og stopper før 4.', losning: 'range(4) gir 0, 1, 2 og 3. Fire tall, men uten 4.' },
        { type: 'tall', tekst: 'Hva blir svaret?<br><code>s = 0<br>for i in range(1, 5):<br>&nbsp;&nbsp;&nbsp;&nbsp;s = s + i<br>print(s)</code>', kjor: 's = 0\nfor i in range(1, 5):\n    s = s + i\nprint(s)', svar: 10, hint: 'i tar verdiene 1, 2, 3 og 4.', losning: 's = 1 + 2 + 3 + 4 = 10.' },
        { type: 'tall', tekst: 'Hvor mange ganger skrives «hei» ut?<br><code>for i in range(2, 9):<br>&nbsp;&nbsp;&nbsp;&nbsp;print("hei")</code>', svar: 7, hint: 'Tell tallene 2, 3, …, 8.', losning: 'range(2, 9) gir 2, 3, 4, 5, 6, 7 og 8: sju runder.' },
        { type: 'valg', tekst: 'Hva skrives ut? <code>for i in range(0, 10, 3): print(i, end=" ")</code>', kjor: 'for i in range(0, 10, 3):\n    print(i, end=" ")', valg: ['0 3 6 9', '0 3 6', '3 6 9', '0 1 2 3'], riktig: 0, hint: 'Det siste tallet er steget.', losning: 'Start 0, steg 3: 0, 3, 6, 9. Neste ville vært 12, som er over 10.' }
      ] },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Oppdrag: gangetabellen', intro: 'Skriv ut 7-gangen fra 7 · 1 til 7 · 10, ett tall per linje (bare svarene: 7, 14, 21, …, 70).', losningKode: 'for i in range(1, 11):\n    print(i * 7)', kode: 'for i in range(1, 11):\n    print(i)', forvent: '7\n14\n21\n28\n35\n42\n49\n56\n63\n70', hint: 'Skriv ut i * 7 i stedet for i.' } },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Utfordring: kvadrattall', intro: 'Skriv ut de ti første kvadrattallene (1, 4, 9, …, 100) på én linje med mellomrom imellom. Tips: print(x, end=" ") skriver uten linjeskift.', losningKode: 'for i in range(1, 11):\n    print(i * i, end=\" \")', kode: '', sjekk: (u) => u.trim() === '1 4 9 16 25 36 49 64 81 100', hint: 'for i in range(1, 11): print(i * i, end=" ")' } }
    ]
  });

  /* ---------- 8 ---------- */
  S.push({
    tittel: 'Lister og data', ikon: '📋',
    blokker: [
      { t: 'p', tekst: 'En <strong>liste</strong> holder mange verdier i én variabel. Den skrives med firkantparenteser. Plassene telles fra <strong>0</strong>.' },
      { t: 'html', html: '<div class="py-liste" role="img" aria-label="Liste med fem tall og plassnumre 0 til 4"><div class="py-liste-rad"><div class="py-l-c"><span>12</span><i>0</i></div><div class="py-l-c"><span>15</span><i>1</i></div><div class="py-l-c"><span>9</span><i>2</i></div><div class="py-l-c"><span>20</span><i>3</i></div><div class="py-l-c"><span>15</span><i>4</i></div></div><div class="py-l-tekst">tall = [12, 15, 9, 20, 15] &nbsp; → &nbsp; tall[0] er 12, tall[3] er 20</div></div>' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Bruke lister', kode: 'tall = [12, 15, 9, 20, 15]\nprint(tall[0], tall[3])\nprint(len(tall))\ntall.append(7)\nprint(tall)\nprint(sum(tall), max(tall), min(tall))', forvent: '12 20\n5\n[12, 15, 9, 20, 15, 7]\n78 20 7' } },
      { t: 'h', tekst: 'Statistikk med kode' },
      { t: 'p', tekst: 'Med lister kan du regne ut gjennomsnitt og median på sekunder, også for hundrevis av tall. Det er dette statistikere gjør i virkeligheten.' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Gjennomsnitt og median', kode: 'import statistics\ntall = [12, 15, 9, 20, 15]\nsnitt = sum(tall) / len(tall)\nprint("Gjennomsnitt:", snitt)\nprint("Median:", statistics.median(tall))\nprint("Typetall:", statistics.mode(tall))\nprint("Variasjonsbredde:", max(tall) - min(tall))', forvent: 'Gjennomsnitt: 14.2\nMedian: 15.0\nTypetall: 15\nVariasjonsbredde: 11' } },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Gå gjennom en liste', kode: 'temp = [3, -2, 0, 7, -5]\nfor t in temp:\n    if t < 0:\n        print(t, "er under null")\n    else:\n        print(t, "er null eller over")', forvent: '3 er null eller over\n-2 er under null\n0 er null eller over\n7 er null eller over\n-5 er under null' } },
      { t: 'callout', stil: 'regel', tittel: 'Nyttige listeting', punkter: ['<code>len(liste)</code>: hvor mange elementer', '<code>liste.append(x)</code>: legg til x på slutten', '<code>sum(liste)</code>, <code>min(liste)</code>, <code>max(liste)</code>', '<code>sorted(liste)</code>: ny liste i rekkefølge', '<code>liste[-1]</code>: siste element'] },
      { t: 'oppgaver', niva: 3, oppgaver: [
        { type: 'tall', tekst: 'Hva skrives ut? <code>a = [4, 8, 15, 16]<br>print(a[2])</code>', kjor: 'a = [4, 8, 15, 16]\nprint(a[2])', svar: 15, hint: 'Første plass er 0.', losning: 'Plass 0 er 4, plass 1 er 8, plass 2 er 15.' },
        { type: 'tall', tekst: 'Hva skrives ut? <code>print(len([5, 1, 9, 2, 7]))</code>', kjor: 'print(len([5, 1, 9, 2, 7]))', svar: 5, hint: 'len teller elementene.', losning: 'Listen har 5 tall, så len gir 5.' },
        { type: 'tall', tekst: 'Hva skrives ut? <code>a = [2, 4, 6]<br>a.append(8)<br>print(sum(a))</code>', kjor: 'a = [2, 4, 6]\na.append(8)\nprint(sum(a))', svar: 20, hint: 'Først legges 8 til i listen.', losning: 'Listen blir [2, 4, 6, 8] og summen er 2 + 4 + 6 + 8 = 20.' },
        { type: 'valg', tekst: 'Hva skrives ut? <code>print([1, 2, 3][-1])</code>', kjor: 'print([1, 2, 3][-1])', valg: ['3', '1', '-1', 'Feil'], riktig: 0, hint: 'Negativ plass teller bakfra.', losning: '[-1] er siste element. Det er 3.' }
      ] },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Oppdrag: karakterer i klassen', intro: 'Listen <code>poeng</code> har resultatene fra en prøve. Skriv ut gjennomsnittet (avrundet til 1 desimal) med <code>round(…, 1)</code>.', losningKode: 'poeng = [23, 31, 28, 35, 19, 30]\nprint(round(sum(poeng) / len(poeng), 1))', kode: 'poeng = [23, 31, 28, 35, 19, 30]\n', forvent: '27.7', hint: 'sum(poeng) / len(poeng) gir 166 / 6. Pakk det inn i round(..., 1).' } }
    ]
  });

  /* ---------- 9 ---------- */
  S.push({
    tittel: 'Funksjoner: lag dine egne verktøy', ikon: '⚙️',
    blokker: [
      { t: 'p', tekst: 'Du kjenner allerede funksjoner fra matte: <em>f(x) = 2x + 1</em>. I Python lager du en funksjon med <strong>def</strong>. Funksjonen tar imot verdier (<strong>parametere</strong>), gjør noe, og gir tilbake et svar med <strong>return</strong>.' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'f(x) = 2x + 1 som kode', kode: 'def f(x):\n    return 2 * x + 1\n\nprint(f(0))\nprint(f(3))\nprint(f(-2))', forvent: '1\n7\n-3', intro: 'Det som står etter <code>def</code>, er navnet. Verdien i parentesen er x. <code>return</code> sender svaret tilbake.' } },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Funksjon med flere parametere', kode: 'def areal(lengde, bredde):\n    return lengde * bredde\n\nprint(areal(4, 5))\nprint(areal(10, 2.5))', forvent: '20\n25.0' } },
      { t: 'callout', stil: 'tips', tittel: 'Hvorfor funksjoner?', tekst: 'Skriver du en regel én gang, kan du bruke den hundre ganger. Og blir regelen endret, retter du bare på ett sted.' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Funksjon og tabell', kode: 'def f(x):\n    return x * x - 3\n\nfor x in range(-3, 4):\n    print("f(", x, ") =", f(x))', forvent: 'f( -3 ) = 6\nf( -2 ) = 1\nf( -1 ) = -2\nf( 0 ) = -3\nf( 1 ) = -2\nf( 2 ) = 1\nf( 3 ) = 6', intro: 'En verditabell til funksjonen, laget med en løkke.' } },
      { t: 'oppgaver', niva: 3, oppgaver: [
        { type: 'tall', tekst: 'Hva skrives ut?<br><code>def g(x):<br>&nbsp;&nbsp;&nbsp;&nbsp;return 3 * x - 1<br>print(g(4))</code>', kjor: 'def g(x):\n    return 3 * x - 1\nprint(g(4))', svar: 11, hint: 'Sett x = 4.', losning: '3 · 4 − 1 = 12 − 1 = 11.' },
        { type: 'tall', tekst: 'Hva skrives ut?<br><code>def kv(n):<br>&nbsp;&nbsp;&nbsp;&nbsp;return n ** 2<br>print(kv(5) + kv(2))</code>', kjor: 'def kv(n):\n    return n ** 2\nprint(kv(5) + kv(2))', svar: 29, hint: 'Regn ut hver funksjon for seg.', losning: 'kv(5) = 25 og kv(2) = 4. Summen er 29.' },
        { type: 'valg', tekst: 'Hva gjør <code>return</code>?', valg: ['Sender svaret ut av funksjonen', 'Skriver ut på skjermen', 'Lager en liste', 'Starter en løkke'], riktig: 0, fast: true, hint: 'Den sender en verdi tilbake til den som kalte funksjonen.', losning: 'return gir svaret fra funksjonen tilbake til koden som brukte den. print skriver derimot ut på skjermen.' }
      ] },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Oppdrag: lag din egen funksjon', intro: 'Lag funksjonen <code>omkrets(r)</code> som gir omkretsen av en sirkel med radius r. Bruk <code>math.pi</code>. Skriv ut <code>round(omkrets(5), 2)</code>.', losningKode: 'import math\n\ndef omkrets(r):\n    return 2 * math.pi * r\n\nprint(round(omkrets(5), 2))', kode: 'import math\n\n', forvent: '31.42', hint: 'def omkrets(r): return 2 * math.pi * r. Husk innrykk.' } }
    ]
  });

  /* ---------- 10 ---------- */
  S.push({
    tittel: 'Feilsøking: bli detektiv', ikon: '🕵️',
    blokker: [
      { t: 'p', tekst: 'Alle som programmerer, gjør feil hver dag, også de beste. Ferdigheten er å <strong>finne</strong> og <strong>rette</strong> dem. Feilmeldingen er din venn: den sier <strong>hvilken linje</strong> og <strong>hva slags feil</strong>.' },
      { t: 'tabell', hode: ['Feil', 'Hva det betyr', 'Typisk årsak'], rader: [['SyntaxError', 'Koden er skrevet feil', 'Mangler kolon, parentes eller anførselstegn'], ['NameError', 'Navnet finnes ikke', 'Skrivefeil i variabelnavn, eller glemt å lage den'], ['TypeError', 'Feil type', 'Blander tekst og tall'], ['ValueError', 'Verdien passer ikke', 'int("abc")'], ['ZeroDivisionError', 'Delt på 0', 'x / 0'], ['IndentationError', 'Feil innrykk', 'Ulike antall mellomrom'], ['IndexError', 'Plassen finnes ikke', 'Liste med 3 elementer, men du ber om plass 5']] },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Detektivoppdrag 1', intro: 'Programmet skal skrive ut gjennomsnittet av 8, 6 og 10, men noe er galt. Finn feilen!', losningKode: 'tall = [8, 6, 10]\nsnitt = sum(tall) / len(tall)\nprint(snitt)', kode: 'tall = [8, 6, 10]\nsnitt = sum(tal) / len(tall)\nprint(snitt)', tillatFeil: true, forvent: '8.0', hint: 'Les feilmeldingen. Navnet på variabelen er skrevet feil i linje 2.' } },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Detektivoppdrag 2', intro: 'Programmet skal skrive ut «Hei 5». Finn feilen!', losningKode: 'x = 5\nprint(\"Hei\", x)', kode: 'x = 5\nprint("Hei " + x)', tillatFeil: true, forvent: 'Hei 5', hint: 'Du kan ikke legge sammen tekst og tall. Bruk str(x), eller print("Hei", x).' } },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Detektivoppdrag 3', intro: 'Programmet skal skrive ut 1, 2, 3, 4, 5, men det blir ikke riktig. Finn feilen! (Dette er en logisk feil: ingen feilmelding, men feil svar.)', losningKode: 'for i in range(1, 6):\n    print(i)', kode: 'for i in range(5):\n    print(i)', forvent: '1\n2\n3\n4\n5', hint: 'range(5) starter på 0 og stopper før 5. Hvilken range trenger du?' } },
      { t: 'callout', stil: 'regel', tittel: 'Slik feilsøker du', punkter: ['<strong>1. Les</strong> feilmeldingen. Hvilken linje? Hvilken type feil?', '<strong>2. Se</strong> på linjen (og linjen over). Er det en skrivefeil, et kolon eller en parentes som mangler?', '<strong>3. Skriv ut</strong> verdier med print for å se hva som faktisk ligger i variablene.', '<strong>4. Gjør en liten endring</strong> om gangen og kjør på nytt.', '<strong>5. Forklar</strong> koden høyt for noen (eller for en gummiand). Da oppdager du ofte feilen selv!'] },
      { t: 'oppgaver', niva: 3, oppgaver: [
        { type: 'valg', tekst: 'Hva slags feil gir <code>print(5 / 0)</code>?', valg: ['ZeroDivisionError', 'NameError', 'SyntaxError', 'IndexError'], riktig: 0, fast: true, hint: 'Hva skjer når du deler på null?', losning: 'Å dele på 0 er ikke mulig, og Python gir ZeroDivisionError.' },
        { type: 'valg', tekst: 'Hva er galt?<br><code>print(navn)</code> (uten at navn er laget først)', valg: ['Variabelen navn er ikke laget (NameError)', 'Manglende kolon', 'Feil type', 'Delt på null'], riktig: 0, hint: 'Variabler må lages før de brukes.', losning: 'Python kjenner ikke navnet «navn» før du har gitt det en verdi.' },
        { type: 'valg', tekst: 'Programmet skriver ut 6 i stedet for 8. Hva slags feil er det?', valg: ['En logisk feil (koden kjører, men gjør feil ting)', 'SyntaxError', 'NameError', 'Ingen feil'], riktig: 0, hint: 'Det kom ingen feilmelding.', losning: 'Når koden kjører uten feilmelding, men gir feil svar, er det en logisk feil. Da må du tenke over hva koden egentlig gjør.' }
      ] }
    ]
  });

  /* ---------- 11 ---------- */
  S.push({
    tittel: 'Python som mattehjelper: små prosjekter', ikon: '🚀',
    blokker: [
      { t: 'p', tekst: 'Nå skal du bruke alt du har lært. Disse prosjektene er typiske for matte på ungdomstrinnet.' },
      { t: 'h', tekst: 'Prosjekt 1: primtall' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Er tallet et primtall?', kode: 'def er_primtall(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\nfor tall in range(1, 31):\n    if er_primtall(tall):\n        print(tall, end=" ")', forvent: '2 3 5 7 11 13 17 19 23 29', intro: 'Et tall er et primtall hvis ingen tall mellom 2 og tallet selv går opp i det. Prøv å endre 31 til 100! Kan du forklare hva hver linje gjør?' } },
      { t: 'h', tekst: 'Prosjekt 2: Pytagoras' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Lengden på hypotenusen', kode: 'import math\n\ndef hypotenus(a, b):\n    return math.sqrt(a ** 2 + b ** 2)\n\nprint(hypotenus(3, 4))\nprint(round(hypotenus(5, 8), 2))', forvent: '5.0\n9.43' } },
      { t: 'h', tekst: 'Prosjekt 3: renters rente' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Sparing med 4 % rente', kode: 'sum = 10000\nfor ar in range(1, 11):\n    sum = sum * 1.04\n    print("År", ar, ":", round(sum, 2))', forvent: undefined, intro: 'Hvert år ganges beløpet med vekstfaktoren 1,04. Hvor mange år tar det før pengene er doblet? Endre programmet og finn ut!' } },
      { t: 'h', tekst: 'Prosjekt 4: terningkast (simulering)' },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Kast terning 6000 ganger', kode: 'import random\n\nantall = [0, 0, 0, 0, 0, 0]\nfor kast in range(6000):\n    øyne = random.randint(1, 6)\n    antall[øyne - 1] = antall[øyne - 1] + 1\n\nfor i in range(6):\n    print(i + 1, ":", antall[i])', intro: 'Hver gang du kjører, får du litt forskjellige tall. Hva forventer du for hvert tall? Hvor nær er resultatet?' } },
      { t: 'oppgaver', niva: 4, oppgaver: [
        { type: 'fritekst', tekst: 'Forklar med egne ord hva programmet i «Prosjekt 1» gjør, linje for linje. Hva betyr <code>n % d == 0</code>?', losning: ['Funksjonen sjekker om n er et primtall.', 'Hvis n er mindre enn 2, er det ikke et primtall.', 'Løkka går gjennom alle tall d fra 2 og opp til n − 1.', '<code>n % d == 0</code> betyr at d går opp i n uten rest. Da er n delelig på d og dermed ikke et primtall: funksjonen svarer False.', 'Hvis ingen d gikk opp i n, svarer funksjonen True.'] },
        { type: 'fritekst', tekst: 'I renters-rente-programmet: hva forteller tallet 1.04? Hva ville du endret for å simulere 7 % rente?', losning: ['1,04 er vekstfaktoren for 4 % vekst: 100 % + 4 % = 104 % = 1,04.', 'For 7 % rente skriver du 1.07, for 100 % + 7 % = 107 %.'] },
        { type: 'fritekst', tekst: 'Terningsimuleringen: hvorfor får du aldri nøyaktig 1000 av hvert tall, selv om en terning er rettferdig? Hva skjer med forskjellene om du øker til 600 000 kast?', losning: ['Terningkast er tilfeldige, så resultatet svinger rundt det vi forventer (1000).', 'Når antall kast øker, blir den relative frekvensen (andelen) mer lik sannsynligheten 1/6. De absolutte forskjellene kan godt øke litt, men prosentvis blir de mindre.'] }
      ] },
      { t: 'widget', navn: 'kode', opts: { tittel: 'Utfordring: summen av partall', intro: 'Skriv ut summen av alle partall fra 1 til 100 (2 + 4 + … + 100).', losningKode: 'sum = 0\nfor i in range(2, 101, 2):\n    sum = sum + i\nprint(sum)', kode: '', forvent: '2550', hint: 'for i in range(2, 101, 2), og legg til i en sum.' } }
    ]
  });

  /* ---------- 12 ---------- */
  S.push({
    tittel: 'Les og forklar kode', ikon: '👓',
    blokker: [
      { t: 'p', tekst: 'I læreplanen skal du kunne <strong>lese og forklare</strong> kode, ikke bare skrive den. Det er som å lese en oppskrift: forstå hva hvert steg gjør, og hva som blir resultatet. Her trener du på akkurat det.' },
      { t: 'callout', stil: 'tips', tittel: 'Slik leser du kode', punkter: ['Gå <strong>linje for linje</strong>, ovenfra og ned.', 'Skriv gjerne en tabell med variablene og hvordan de endres.', 'I løkker: gå gjennom første, andre og siste runde.', 'Forklar til slutt <strong>hva programmet gjør i hele</strong>, med egne ord.'] },
      { t: 'widget', navn: 'kodevis', opts: { tittel: 'Lese: hva gjør dette?', kode: 'tall = 1\nsum = 0\nwhile sum < 30:\n    sum = sum + tall\n    tall = tall + 2\nprint(tall, sum)', intro: 'Les koden og finn ut hva som skrives ut før du trykker Kjør.' } },
      { t: 'oppgaver', niva: 4, oppgaver: [
        { type: 'valg', tekst: 'Hva skriver koden over ut?', kjor: 'tall = 1\nsum = 0\nwhile sum < 30:\n    sum = sum + tall\n    tall = tall + 2\nprint(tall, sum)', valg: ['13 36', '11 25', '12 30', '9 16'], riktig: 0, hint: 'Summen av oddetall: 1, 4, 9, 16, 25, 36. Stopper når sum ≥ 30.', losning: ['Vi legger til oddetall: 1, 3, 5, 7, 9, 11.', 'Summen blir 1, 4, 9, 16, 25, 36. Først da er sum ikke lenger under 30.', 'Siste tall som ble lagt til var 11, så tall er nå 13. Utskrift: 13 36.'] },
        { type: 'valg', tekst: 'Hva gjør denne funksjonen?<br><code>def f(n):<br>&nbsp;&nbsp;&nbsp;&nbsp;s = 0<br>&nbsp;&nbsp;&nbsp;&nbsp;for i in range(1, n + 1):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;s = s + i<br>&nbsp;&nbsp;&nbsp;&nbsp;return s</code>', valg: ['Regner ut summen 1 + 2 + … + n', 'Regner ut n ganger n', 'Finner største tall', 'Teller til n og skriver ut'], riktig: 0, hint: 'Hva ligger i s etter løkka?', losning: 'Løkka legger til 1, 2, …, n i s. Funksjonen gir summen av de n første hele tallene.' },
        { type: 'tall', tekst: 'Hva blir svaret?<br><code>x = 2<br>for i in range(3):<br>&nbsp;&nbsp;&nbsp;&nbsp;x = x * 2<br>print(x)</code>', kjor: 'x = 2\nfor i in range(3):\n    x = x * 2\nprint(x)', svar: 16, hint: 'x dobles tre ganger.', losning: 'x går 2 → 4 → 8 → 16. Svaret er 16, det samme som 2 · 2³.' },
        { type: 'fritekst', tekst: 'Forklar med egne ord hva dette programmet gjør:<br><code>penger = 500<br>mnd = 0<br>while penger &lt; 2000:<br>&nbsp;&nbsp;&nbsp;&nbsp;penger = penger + 250<br>&nbsp;&nbsp;&nbsp;&nbsp;mnd = mnd + 1<br>print(mnd)</code>', losning: ['Du starter med 500 kr og sparer 250 kr hver måned.', 'Løkka teller måneder (mnd) til du har minst 2000 kr.', 'Programmet skriver ut hvor mange måneder det tar: 6. (500 + 6 · 250 = 2000)'] }
      ] },
      { t: 'sjekkliste', tittel: 'Dette kan du nå', punkter: ['Skrive ut tekst og tall med print', 'Lage og bruke variabler (int, float, str)', 'Regne med Python, inkludert %, // og **', 'Bruke input() og gjøre svaret om til tall', 'Bruke if, elif og else', 'Bruke for- og while-løkker', 'Lage og bruke lister', 'Lage egne funksjoner med def og return', 'Lese en feilmelding og rette feilen', 'Lese kode og forklare hva den gjør'] },
      { t: 'callout', stil: 'mestring', tittel: 'Skikkelig bra!', tekst: 'Du har lært grunnene i programmering. Nå kan du bruke Python i alle matteemner: som regnemaskin, til å lage verditabeller for funksjoner, til å simulere sannsynlighet og til å teste hypoteser.' }
    ]
  });

  M.register('utforsk', 'verktoy/python', {
    tittel: 'Python fra scratch',
    ingress: 'Lær programmering fra første linje. Alt kan prøves rett på siden, og feil er helt lov. Du trenger ingenting installert.',
    mal: ['skrive, kjøre og rette små Python-programmer', 'bruke variabler, valg, løkker, lister og funksjoner', 'bruke programmering til å utforske matte', 'lese og forklare kode'],
    ordliste: ORD, seksjoner: S
  });
})();
