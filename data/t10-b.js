/* ============================================================
   10. trinn: Ligningssett + Endring per enhet og stigningstall
   Læreplan 10.3 og 10.5
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, SJ, S, ord } = H;
  const TEAL = '#0e8f9b', ORANGE = '#e8964a';

  /* ================= LIGNINGSSETT ================= */
  const ORD1 = [
    ord(['ligningssett', 'ligningssettet'], 'To eller flere ligninger med de samme ukjente. Løsningen må passe i alle.'),
    ord(['ukjent', 'ukjente'], 'Tall vi ikke vet ennå, skrevet som bokstav, for eksempel x og y.'),
    ord(['løsning', 'løsningen'], 'Verdiene av x og y som gjør begge ligningene sanne.'),
    ord(['innsettingsmetoden'], 'Løs den ene ligningen for en ukjent, og sett uttrykket inn i den andre.'),
    ord(['addisjonsmetoden'], 'Legg sammen eller trekk fra ligningene slik at en ukjent forsvinner.'),
    ord(['skjæringspunkt', 'skjæringspunktet'], 'Punktet der to grafer krysser hverandre. Her er løsningen på ligningssettet.'),
    ord(['graf'], 'En tegning som viser alle punktene (x, y) som passer til en ligning.'),
    ord(['koeffisient'], 'Tallet foran en ukjent.'),
    ord(['sette prøve', 'prøve'], 'Sette løsningen inn i begge ligningene for å se at begge blir sanne.')
  ];
  const U1 = [];
  U1.push(S('To ukjente, to ligninger', '⚔️', [
    P('Noen ganger har vi <strong>to ukjente</strong>, og trenger <strong>to opplysninger</strong> for å finne dem. Eksempel: «To tall har sum 10 og differanse 2.» Det gir to ligninger: <strong>x + y = 10</strong> og <strong>x − y = 2</strong>. Sammen kalles de et <strong>ligningssett</strong>.'),
    TAB(['x', 'y', 'x + y = 10?', 'x − y = 2?'], [['7', '3', 'Ja', 'Nei (4)'], ['5', '5', 'Ja', 'Nei (0)'], ['6', '4', 'Ja', 'Ja ✓'], ['8', '2', 'Ja', 'Nei (6)']]),
    C('regel', 'Løsning av ligningssett', 'Løsningen er parene (x, y) som passer i <strong>begge</strong> ligningene samtidig. Her er det (6, 4).'),
    O(1, [
      T('Sjekk x = 6 og y = 4 i x + y = 10. Hva er x + y?', 10, '6 + 4.', '6 + 4 = 10.'),
      T('Sjekk x = 6 og y = 4 i x − y = 2. Hva er x − y?', 2, '6 − 4.', '6 − 4 = 2.'),
      V('Er x = 5 og y = 5 en løsning på x + y = 10 og x − y = 2?', ['Nei', 'Ja'], 0, 'Sjekk begge.', '5 + 5 = 10 stemmer, men 5 − 5 = 0, ikke 2.', true)
    ])
  ]));
  U1.push(S('Grafisk løsning', '📈', [
    P('Hver ligning med to ukjente gir en <strong>rett linje</strong> i et koordinatsystem. Løsningen til ligningssettet er der linjene <strong>krysser</strong>: <strong>skjæringspunktet</strong>.'),
    W('graf', { params: {}, funksjoner: [{ f: '10-x', navn: 'x + y = 10', farge: TEAL }, { f: 'x-2', navn: 'x − y = 2', farge: ORANGE }], xmin: 0, xmax: 12, ymin: 0, ymax: 12, skjaering: true, tabell: true, tabellx: [0, 2, 4, 6, 8, 10], tittel: 'Linjene krysser i (6, 4)', alt: 'To linjer som krysser i punktet seks komma fire' }),
    C('tips', 'Fra ligning til linje', ['x + y = 10 betyr y = 10 − x.', 'x − y = 2 betyr y = x − 2.', 'Løs hver ligning for y, så kan du tegne dem.']),
    O(2, [
      T('Skriv x + y = 10 som y = 10 − x. Hva er y når x = 3?', 7, '10 − 3.', '10 − 3 = 7.'),
      T('Skriv x − y = 2 som y = x − 2. Hva er y når x = 6?', 4, '6 − 2.', '6 − 2 = 4.'),
      T('Linjene y = 10 − x og y = x − 2 krysser når x = 6. Hva er y?', 4, 'Sett x = 6 i en av dem.', 'y = 10 − 6 = 4.'),
      V('Hva viser skjæringspunktet mellom to linjer?', ['Løsningen på ligningssettet', 'Lengden av linjene', 'Stigningstallet', 'Ingenting'], 0, 'Der begge ligningene er sanne.', 'Punktet ligger på begge linjene, så begge ligningene er sanne.')
    ])
  ]));
  U1.push(S('Innsettingsmetoden', '🔁', [
    P('Med <strong>innsettingsmetoden</strong> løser du den ene ligningen for en ukjent, og <strong>setter uttrykket inn</strong> i den andre.'),
    E('Løs: y = x + 2 og 2x + y = 11.', ['Ligning 1 sier at y er det samme som x + 2. Sett det inn i ligning 2: 2x + (x + 2) = 11.', '3x + 2 = 11, så 3x = 9 og x = 3.', 'Finn y: y = 3 + 2 = 5. Svar: x = 3 og y = 5. Sjekk: 2 · 3 + 5 = 11 ✓.']),
    C('regel', 'Slik gjør du', ['1. Løs en ligning for en ukjent (gjerne den som er enklest).', '2. Sett inn i den andre ligningen.', '3. Løs ligningen med én ukjent.', '4. Finn den andre ukjente. Sett prøve!']),
    O(3, [
      T('y = x + 2 og 2x + y = 11. Hva er x?', 3, '3x + 2 = 11.', 'x = 3.'),
      T('y = x + 2 og 2x + y = 11. Hva er y?', 5, 'y = 3 + 2.', 'y = 5.'),
      T('y = 2x og x + y = 12. Hva er x?', 4, 'x + 2x = 12.', '3x = 12, så x = 4.'),
      T('y = 2x og x + y = 12. Hva er y?', 8, 'y = 2 · 4.', 'y = 8.'),
      T('x = y − 1 og x + y = 9. Hva er y?', 5, '(y − 1) + y = 9.', '2y − 1 = 9, så y = 5.')
    ])
  ]));
  U1.push(S('Addisjonsmetoden', '➕', [
    P('Med <strong>addisjonsmetoden</strong> legger du ligningene sammen (eller trekker dem fra hverandre) slik at en ukjent <strong>forsvinner</strong>.'),
    E('Løs: x + y = 10 og x − y = 2.', ['Legg sammen: (x + y) + (x − y) = 10 + 2.', 'y og −y tar hverandre ut: 2x = 12, så x = 6.', 'Sett inn i x + y = 10: 6 + y = 10, så y = 4. Svar: x = 6 og y = 4.']),
    E('Løs: 2x + y = 11 og x + y = 7.', ['Trekk andre ligning fra første: (2x + y) − (x + y) = 11 − 7.', 'y forsvinner: x = 4.', 'Sett inn: 4 + y = 7, så y = 3. Svar: x = 4 og y = 3.']),
    C('tips', 'Når bruker jeg hva?', ['Innsetting: når en ligning allerede har en ukjent alene (y = …).', 'Addisjon: når leddene med x eller y er like eller motsatte.']),
    O(3, [
      T('x + y = 10 og x − y = 2. Legg sammen. Hva blir 2x?', 12, '10 + 2.', '2x = 12.'),
      T('x + y = 10 og x − y = 2. Hva er x?', 6, '2x = 12.', 'x = 6.'),
      T('2x + y = 11 og x + y = 7. Hva er x?', 4, 'Trekk fra.', 'x = 4.'),
      T('x + y = 15 og x − y = 5. Hva er x?', 10, '2x = 20.', 'x = 10.'),
      T('x + y = 15 og x − y = 5. Hva er y?', 5, '10 + y = 15.', 'y = 5.')
    ])
  ]));
  U1.push(S('Fra tekst til ligningssett', '🎟️', [
    P('Praktiske problemer kan gi ligningssett. Slik gjør du det: <strong>1) Velg bokstaver. 2) Skriv ligninger for hver opplysning. 3) Løs. 4) Svar med ord og enhet.</strong>'),
    E('Kinobilletter: 2 voksne og 3 barn koster 380 kr. 1 voksen og 2 barn koster 220 kr. Finn prisene.', ['v = voksenbillett, b = barnebillett. 2v + 3b = 380 og v + 2b = 220.', 'Gang andre ligning med 2: 2v + 4b = 440. Trekk fra første: b = 60.', 'Sett inn: v + 2 · 60 = 220, så v = 100. Voksen 100 kr, barn 60 kr. Sjekk: 2 · 100 + 3 · 60 = 380 ✓.']),
    O(4, [
      T('To tall har sum 20 og differanse 6. Hva er det største tallet?', 13, 'x + y = 20 og x − y = 6.', '2x = 26, så x = 13.'),
      T('To tall har sum 20 og differanse 6. Hva er det minste tallet?', 7, '13 + y = 20.', 'y = 7.'),
      T('En kaffe og en kake koster til sammen 70 kr. Kaka koster 10 kr mer enn kaffen. Hva koster kaffen?', 30, 'k + m = 70 og m = k + 10.', 'k + k + 10 = 70, så 2k = 60 og k = 30 kr.', 'kr'),
      T('I en bil sitter 5 personer: voksne og barn. Billetter: voksne 20 kr, barn 10 kr, total 70 kr. Hvor mange voksne? (v + b = 5, 20v + 10b = 70)', 2, 'b = 5 − v.', '20v + 10(5 − v) = 70, 10v = 20, v = 2.'),
      T('Mia har 10-kroner og 20-kroner, til sammen 8 mynter og 110 kr. Hvor mange 20-kroner? (a + b = 8, 10a + 20b = 110)', 3, 'a = 8 − b.', '80 − 10b + 20b = 110, 10b = 30, b = 3.')
    ])
  ]));
  U1.push(S('Spesialtilfeller', '🧩', [
    P('Ikke alle ligningssett har nøyaktig én løsning. To linjer kan være <strong>parallelle</strong> (aldri krysse: <strong>ingen løsning</strong>) eller være <strong>samme linje</strong> (<strong>uendelig mange løsninger</strong>).'),
    TAB(['Ligningssett', 'Linjene', 'Antall løsninger'], [['y = x + 1 og y = x + 3', 'Parallelle', 'Ingen'], ['y = 2x og y = 2x', 'Samme linje', 'Uendelig mange'], ['y = x og y = 2x', 'Krysser i (0, 0)', 'Én']]),
    W('graf', { params: { b: { min: -4, max: 4, v: 2, navn: 'b' } }, funksjoner: [{ f: 'x', navn: 'y = x', farge: TEAL }, { f: 'x+b', navn: 'y = x + b', farge: ORANGE }], xmin: -6, xmax: 6, ymin: -8, ymax: 8, skjaering: true, tittel: 'Dra i b: når krysser linjene?', forklaring: v => v.b === 0 ? 'Linjene er <strong>samme linje</strong>: uendelig mange løsninger.' : 'Linjene er <strong>parallelle</strong>: de krysser aldri, så ingen løsning.' }),
    O(5, [
      V('y = x + 1 og y = x + 3. Hvor mange løsninger?', ['Ingen', 'Én', 'To', 'Uendelig mange'], 0, 'Er linjene parallelle?', 'Samme stigning, ulik startverdi: parallelle, ingen løsning.', true),
      V('y = 3x og y = 3x. Hvor mange løsninger?', ['Uendelig mange', 'Ingen', 'Én', 'To'], 0, 'Er det samme linje?', 'Samme linje, alle punkter er løsninger.', true),
      F('Forklar hvorfor x + y = 5 og x + y = 8 ikke kan ha en felles løsning.', ['x + y kan ikke være 5 og 8 samtidig.', 'Linjene y = 5 − x og y = 8 − x er parallelle.', 'Derfor krysser de aldri, og ligningssettet har ingen løsning.'])
    ])
  ]));
  U1.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('Løs x + y = 12 og 2x + y = 17. Vis hvordan du kontrollerer svaret.', ['Trekk første fra andre: (2x + y) − (x + y) = 17 − 12, så x = 5.', 'Sett inn: 5 + y = 12, så y = 7.', 'Kontroll: 5 + 7 = 12 ✓ og 2 · 5 + 7 = 17 ✓.']),
      F('Du har to ulike metoder for å løse ligningssett. Beskriv når du ville valgt hver av dem.', ['Innsetting når en ukjent allerede er alene i en ligning, som y = 2x + 1.', 'Addisjon når x- eller y-leddene er like eller motsatte, som x + y og x − y.', 'Begge gir samme svar. Grafisk løsning gir et bilde, men er mindre nøyaktig.']),
      F('Lag selv en praktisk oppgave som gir et ligningssett med løsning x = 4 og y = 6.', ['Eksempel: «To tall har sum 10 og differanse 2.» (x + y = 10 og x − y = 2 gir x = 6, y = 4.)', 'For x = 4 og y = 6: «x + y = 10 og y − x = 2.»', 'Kontroll: 4 + 6 = 10 ✓ og 6 − 4 = 2 ✓.'])
    ]),
    SJ('Dette kan du nå', ['Forklare hva et ligningssett er', 'Løse grafisk', 'Bruke innsetting', 'Bruke addisjon', 'Lage ligningssett fra tekst', 'Se når det ikke er én løsning'])
  ]));
  M.register('utforsk', '10/ligningssett', {
    tittel: 'Ligningssett',
    ingress: 'Når du har to ukjente trenger du to ligninger. Du løser dem med grafer, innsetting og addisjon, og bruker dem på praktiske problemer.',
    mal: ['lage, løse og forklare ligningssett knyttet til praktiske situasjoner'], ordliste: ORD1, seksjoner: U1
  });
  const T1 = [];
  T1.push(S('Steg 1: To ligninger', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Noen ganger er det <strong>to tall</strong> vi ikke vet. Da trenger vi <strong>to opplysninger</strong>. «Sum 10 og differanse 2» gir <strong>x + y = 10</strong> og <strong>x − y = 2</strong>.', true),
    E('Passer x = 6 og y = 4 i x + y = 10 og x − y = 2?', ['6 + 4 = 10. Ja.', '6 − 4 = 2. Ja.', 'Begge passer! Løsningen er x = 6 og y = 4. 🎉']),
    OS([
      T('x = 7 og y = 3. Hva er x + y?', 10, '7 + 3.', '7 + 3 = 10.'),
      T('x = 7 og y = 3. Hva er x − y?', 4, '7 − 3.', '7 − 3 = 4.'),
      V('Passer x = 7 og y = 3 i x + y = 10 og x − y = 2?', ['Nei', 'Ja'], 0, 'x − y = 4, ikke 2.', 'Den første stemmer, men ikke den andre.', true)
    ])
  ]));
  T1.push(S('Steg 2: Tegn linjene', '2', [
    G('Vi kan tegne begge ligningene. Der de krysser, er svaret.'),
    W('graf', { params: {}, funksjoner: [{ f: '10-x', navn: 'x + y = 10', farge: TEAL }, { f: 'x-2', navn: 'x − y = 2', farge: ORANGE }], xmin: 0, xmax: 12, ymin: 0, ymax: 12, skjaering: true, tittel: 'Der linjene krysser' }),
    OS([
      T('Linjene krysser i punktet (6, 4). Hva er x?', 6, 'Første tall.', 'x = 6.'),
      T('Linjene krysser i punktet (6, 4). Hva er y?', 4, 'Andre tall.', 'y = 4.')
    ])
  ]));
  T1.push(S('Steg 3: Legg sammen', '3', [
    G('Her er et triks: legg sammen ligningene, så forsvinner y.'),
    E('x + y = 10 og x − y = 2. Finn x.', ['Legg sammen: x + y + x − y.', 'y og −y forsvinner: 2x = 12.', 'x = 6. 🎉']),
    OS([
      T('x + y = 14 og x − y = 4. Legg sammen. Hva blir 2x?', 18, '14 + 4.', '14 + 4 = 18.'),
      T('x + y = 14 og x − y = 4. Hva er x?', 9, '18 ÷ 2.', 'x = 9.'),
      T('x + y = 14. Når x = 9, hva er y?', 5, '14 − 9.', 'y = 5.')
    ])
  ]));
  T1.push(S('Steg 4: En historie', '4', [
    G('Siste steg: ligninger fra en historie.'),
    E('En kaffe og en kake koster til sammen 50 kr. Kaka koster 10 kr mer enn kaffen. Hva koster kaffen?', ['k + m = 50 og m = k + 10.', 'k + (k + 10) = 50, så 2k + 10 = 50.', '2k = 40, k = 20. Kaffen koster 20 kr. 🎉']),
    OS([
      T('To tall har sum 12 og differanse 2. Hva er det største tallet?', 7, 'x + y = 12 og x − y = 2.', '2x = 14, x = 7.'),
      T('To tall har sum 12 og differanse 2. Hva er det minste?', 5, '12 − 7.', '5.')
    ]),
    SJ('Dette kan du nå', ['Skjønne hva et ligningssett er', 'Lese løsningen av en graf', 'Bruke addisjon', 'Lage ligninger fra en historie'])
  ]));
  M.register('steg', '10/ligningssett', {
    tittel: 'Ligningssett',
    ingress: 'Små steg: to ukjente, to ligninger. Du leser løsningen av grafer og regner den ut.',
    mal: ['løse enkle ligningssett'], ordliste: ORD1, seksjoner: T1
  });
  M.ekstra['10/ligningssett'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('sum', '➕', 'Sum og differanse', 8, 'Finn det største tallet.', function (r) {
      const x = r.int(5, 20), y = r.int(1, x - 1); return H.e('To tall har sum ' + (x + y) + ' og differanse ' + (x - y) + '.', x, 'x + y = ' + (x + y) + ' og x − y = ' + (x - y) + '. Legg sammen: 2x = ' + 2 * x + ', så x = ' + x);
    }));
    sek.push(H.ek('min', '➖', 'Det minste tallet', 6, 'Finn det minste tallet.', function (r) {
      const x = r.int(5, 20), y = r.int(1, x - 1); return H.e('To tall har sum ' + (x + y) + ' og differanse ' + (x - y) + '.', y, 'Største = ' + x + ', så minste = ' + (x + y) + ' − ' + x + ' = ' + y);
    }));
    sek.push(H.ek('ins', '🔁', 'Innsetting', 6, 'Finn x.', function (r) {
      const k = r.int(2, 5), x = r.int(1, 9), s = x + k * x; return H.e('y = ' + k + 'x og x + y = ' + s, x, 'x + ' + k + 'x = ' + s + ', så ' + (k + 1) + 'x = ' + s + ' og x = ' + x);
    }));
    sek.push(H.ek('bill', '🎟️', 'Billetter', 6, 'Finn prisen på en voksenbillett (v).', function (r) {
      const v = r.int(8, 20) * 10, b = r.int(3, 7) * 10; return H.e('1 voksen og 1 barn koster ' + (v + b) + ' kr. 1 voksen koster ' + (v - b) + ' kr mer enn 1 barn.', v, 'v + b = ' + (v + b) + ' og v − b = ' + (v - b) + '. 2v = ' + 2 * v + ', så v = ' + v + ' kr');
    }));
    return H.ekDef('Ligningssett', sek);
  };

  /* ================= STIGNINGSTALL ================= */
  const ORD2 = [
    ord(['endring per enhet'], 'Hvor mye y endrer seg når x øker med 1.'),
    ord(['stigningstall', 'stigningstallet'], 'Hvor bratt en rett linje er. Tallet a i y = ax + b.'),
    ord(['lineær funksjon', 'lineære funksjoner'], 'En funksjon med rett linje som graf: y = ax + b.'),
    ord(['konstantledd', 'startverdi'], 'Tallet b i y = ax + b. Verdien av y når x = 0.'),
    ord(['stigende'], 'Grafen går oppover. Stigningstallet er positivt.'),
    ord(['synkende'], 'Grafen går nedover. Stigningstallet er negativt.'),
    ord(['differanse'], 'Forskjellen mellom to tall (svaret når du trekker dem fra hverandre).'),
    ord(['koordinat', 'koordinater'], 'Tallparet (x, y) som viser posisjonen til et punkt.')
  ];
  const U2 = [];
  U2.push(S('Endring per enhet', '📏', [
    P('Hvor mye endrer noe seg for <strong>hver ene enhet</strong>? Bilen kjører 80 km <strong>per time</strong>. Prisen er 25 kr <strong>per kilo</strong>. Temperaturen synker 2 grader <strong>per time</strong>. Dette er <strong>endring per enhet</strong>.'),
    TAB(['Situasjon', 'Endring per enhet'], [['Du betaler 15 kr per kilo epler', '+15 kr per kg'], ['Temperaturen synker 3° hver time', '−3° per time'], ['Bilen kjører 80 km hver time', '+80 km per time'], ['Vannstanden synker 2 cm per dag', '−2 cm per dag']]),
    E('Du sparer 200 kr hver måned. Hvor mye har du spart etter 6 måneder?', ['Endring per måned er 200.', 'Etter 6 måneder: 6 · 200 = 1200.', 'Svar: 1200 kr.']),
    O(1, [
      T('Prisen er 25 kr per kg. Hva koster 4 kg?', 100, '4 · 25.', '100 kr.', 'kr'),
      T('Temperaturen synker 3 grader per time. Hvor mye synker den på 5 timer?', 15, '3 · 5.', '15 grader.', '°'),
      T('Du går 5 km hver time. Hvor langt går du på 3 timer?', 15, '5 · 3.', '15 km.', 'km')
    ])
  ]));
  U2.push(S('Stigningstall: hvor bratt?', '⛰️', [
    P('Grafen til en <strong>lineær funksjon</strong> er en rett linje: <strong>y = ax + b</strong>. Tallet <strong>a</strong> er <strong>stigningstallet</strong>. Det sier hvor mye y endrer seg når x øker med 1. Tallet <strong>b</strong> er <strong>startverdien</strong>: der linja krysser y-aksen.'),
    W('graf', { params: { a: { min: -4, max: 4, v: 2, navn: 'a (stigningstall)' }, b: { min: -5, max: 5, v: 1, navn: 'b (startverdi)' } }, funksjoner: [{ f: 'a*x+b', pen: 'lin', navn: 'f(x)' }], xmin: -5, xmax: 5, ymin: -10, ymax: 10, tabell: true, tittel: 'Dra i a og b', forklaring: v => 'For hvert steg 1 til høyre, ' + (v.a > 0 ? 'går linja <strong>opp</strong> ' + v.a : v.a < 0 ? 'går linja <strong>ned</strong> ' + (-v.a) : 'går linja <strong>ikke opp eller ned</strong>') + '. Den krysser y-aksen i ' + v.b + '.' }),
    TAB(['Stigningstall a', 'Graf'], [['a > 0', 'Går oppover (stigende)'], ['a < 0', 'Går nedover (synkende)'], ['a = 0', 'Vannrett']]),
    O(2, [
      T('f(x) = 3x + 2. Hva er stigningstallet?', 3, 'Tallet foran x.', 'a = 3.'),
      T('f(x) = −2x + 5. Hva er stigningstallet?', -2, 'Tallet foran x med fortegn.', 'a = −2.'),
      T('f(x) = 3x + 2. Hva er f(0)?', 2, 'Startverdien.', 'f(0) = 2.'),
      T('f(x) = 4x − 1. Hva er f(3)?', 11, '4 · 3 − 1.', '12 − 1 = 11.'),
      V('Hva betyr negativt stigningstall?', ['Linja går nedover', 'Linja går oppover', 'Linja er vannrett', 'Linja er loddrett'], 0, 'Når x øker, hva skjer med y?', 'y blir mindre når x øker.')
    ])
  ]));
  U2.push(S('Regne ut stigningstall fra to punkter', '🧮', [
    P('Kjenner du to punkter på linja, finner du stigningstallet slik: <strong>a = (endring i y) ÷ (endring i x)</strong>, altså a = (y₂ − y₁) ÷ (x₂ − x₁).'),
    E('En linje går gjennom (1, 3) og (4, 12). Finn stigningstallet.', ['Endring i y: 12 − 3 = 9.', 'Endring i x: 4 − 1 = 3.', 'a = 9 ÷ 3 = 3. For hvert steg i x går y opp 3.']),
    C('tips', 'Hold orden', 'Trekk fra i <strong>samme rekkefølge</strong> for y og x: «slutt minus start» for begge. Bytter du rekkefølge i bare én, får du feil fortegn.'),
    O(3, [
      T('Punktene (1, 3) og (4, 12). Hva er stigningstallet?', 3, '(12 − 3) ÷ (4 − 1).', '9 ÷ 3 = 3.'),
      T('Punktene (0, 2) og (5, 12). Hva er stigningstallet?', 2, '10 ÷ 5.', '2.'),
      T('Punktene (2, 10) og (6, 2). Hva er stigningstallet?', -2, '(2 − 10) ÷ (6 − 2).', '−8 ÷ 4 = −2.'),
      T('Punktene (1, 5) og (4, 5). Hva er stigningstallet?', 0, 'Endring i y er 0.', '0 ÷ 3 = 0. Linja er vannrett.'),
      T('Punktene (−1, −3) og (3, 5). Hva er stigningstallet?', 2, '8 ÷ 4.', '(5 − (−3)) ÷ (3 − (−1)) = 8 ÷ 4 = 2.')
    ])
  ]));
  U2.push(S('Finne formelen y = ax + b', '✍️', [
    P('Når du har stigningstallet <strong>a</strong> og ett punkt, finner du <strong>b</strong> ved å sette inn punktet i y = ax + b.'),
    E('En linje har stigningstall 2 og går gjennom (3, 9). Finn formelen.', ['y = 2x + b. Sett inn x = 3 og y = 9: 9 = 2 · 3 + b.', '9 = 6 + b, så b = 3.', 'Formel: y = 2x + 3.']),
    O(4, [
      T('Stigningstall 2, punktet (3, 9). Hva er b?', 3, '9 = 6 + b.', 'b = 3.'),
      T('Stigningstall 3, punktet (2, 10). Hva er b?', 4, '10 = 6 + b.', 'b = 4.'),
      T('y = 2x + 3. Hva er y når x = 10?', 23, '2 · 10 + 3.', '23.'),
      T('Linja går gjennom (0, 5) og (2, 11). Hva er stigningstallet? (b = 5 er allerede gitt)', 3, '(11 − 5) ÷ 2.', '6 ÷ 2 = 3.'),
      T('y = −x + 8. Hva er x når y = 3?', 5, '3 = −x + 8.', 'x = 5.')
    ])
  ]));
  U2.push(S('Stigningstall i hverdagen', '🚕', [
    P('I praktiske situasjoner betyr stigningstallet <strong>endring per enhet</strong>, og b betyr <strong>startverdi</strong>. Taxipris: P = 15x + 50. Her er 15 kr per km, og 50 kr er startprisen.'),
    W('graf', { params: {}, funksjoner: [{ f: '15*x+50', navn: 'Taxi A: 15x + 50', farge: TEAL }, { f: '25*x+10', navn: 'Taxi B: 25x + 10', farge: ORANGE }], xmin: 0, xmax: 10, ymin: 0, ymax: 300, skjaering: true, tabell: true, tabellx: [0, 2, 4, 6, 8, 10], tittel: 'Hvilken taxi er billigst?' }),
    E('En vannbeholder inneholder 100 liter. Hver time renner det ut 8 liter. Finn formelen og tid til tom.', ['Startverdi 100, endring −8 per time: V = −8t + 100.', 'Tom når V = 0: −8t + 100 = 0, så 8t = 100.', 't = 12,5. Beholderen er tom etter 12,5 timer.']),
    O(5, [
      T('Taxi A: 15x + 50. Hva koster 10 km?', 200, '150 + 50.', '200 kr.', 'kr'),
      T('Taxi A: 15x + 50. Hva er endring per km?', 15, 'Stigningstallet.', '15 kr per km.', 'kr'),
      T('Taxi B: 25x + 10. Hvor mye koster 4 km?', 110, '100 + 10.', '110 kr.', 'kr'),
      T('Taxi A og B er like dyre når 15x + 50 = 25x + 10. Hva er x?', 4, '10x = 40.', 'x = 4 km.', 'km'),
      T('Vannbeholder: V = −8t + 100. Hvor mange liter er igjen etter 5 timer?', 60, '−40 + 100.', '60 liter.', 'liter')
    ])
  ]));
  U2.push(S('Fart er et stigningstall', '🏃', [
    P('Fart er <strong>strekning per tid</strong>: det er stigningstallet i en graf med tid på x-aksen og strekning på y-aksen. Bratt linje betyr høy fart. Vannrett linje betyr at du står stille.'),
    E('Grafen går gjennom (0, 0) og (2, 100) (tid i timer, strekning i km). Hva er farten?', ['Endring i y: 100. Endring i x: 2.', '100 ÷ 2 = 50.', 'Farten er 50 km/t.']),
    O(4, [
      T('Strekning 120 km på 3 timer. Hva er stigningstallet (km/t)?', 40, '120 ÷ 3.', '40.', 'km/t'),
      V('To grafer viser strekning mot tid. Linje A er brattere enn linje B. Hva betyr det?', ['A har høyere fart', 'A har lavere fart', 'Samme fart', 'A står stille'], 0, 'Brattere betyr større stigning.', 'Brattere linje betyr større endring per tid, altså høyere fart.', true),
      V('Hva betyr en vannrett linje i en tid-strekning-graf?', ['Personen står stille', 'Personen går fort', 'Personen går baklengs', 'Ingenting'], 0, 'Stigningstall 0.', 'Strekningen endres ikke, så personen står stille.', true)
    ])
  ]));
  U2.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('Mia sier at linja y = 2x + 3 og linja y = 2x − 1 krysser hverandre. Stemmer det? Argumenter.', ['Begge har stigningstall 2, så de har samme bratthet.', 'De er parallelle med ulik startverdi (3 og −1).', 'Parallelle linjer krysser aldri. Mia tar feil.']),
      F('Forklar hvordan du ser av grafen om stigningstallet er positivt, negativt eller null.', ['Positivt: grafen går oppover mot høyre.', 'Negativt: grafen går nedover mot høyre.', 'Null: grafen er vannrett.']),
      F('En mobilabonnement koster 199 kr i måneden pluss 2 kr per ekstra GB. Skriv funksjonen, og forklar hva a og b betyr.', ['P(g) = 2g + 199.', 'a = 2: prisen øker med 2 kr per GB.', 'b = 199: fastbeløpet når du bruker 0 ekstra GB.'])
    ]),
    SJ('Dette kan du nå', ['Forklare endring per enhet', 'Lese stigningstall fra formel og graf', 'Regne stigningstall fra to punkter', 'Finne formelen y = ax + b', 'Tolke a og b i praktiske situasjoner'])
  ]));
  M.register('utforsk', '10/stigningstall', {
    tittel: 'Endring per enhet og stigningstall',
    ingress: 'Hvor bratt er linja? Stigningstallet forteller endring per enhet. Du regner det ut og bruker det i hverdagen.',
    mal: ['forklare begrepet endring per enhet og regne ut stigningstallet til lineære funksjoner'], ordliste: ORD2, seksjoner: U2
  });
  const T2 = [];
  T2.push(S('Steg 1: Endring per enhet', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('<strong>Per</strong> betyr «for hver». 5 kr <strong>per</strong> kilo betyr 5 kr for hvert kilo.', true),
    E('Epler koster 20 kr per kg. Hva koster 3 kg?', ['20 kr for hvert kilo.', '3 · 20 = 60.', 'Svar: 60 kr. 🎉']),
    OS([
      T('Epler koster 10 kr per kg. Hva koster 5 kg?', 50, '5 · 10.', '50 kr.', 'kr'),
      T('Du sparer 100 kr per uke. Hvor mye etter 4 uker?', 400, '4 · 100.', '400 kr.', 'kr'),
      T('Temperaturen synker 2 grader per time. Hvor mye synker den på 3 timer?', 6, '3 · 2.', '6 grader.', '°')
    ])
  ]));
  T2.push(S('Steg 2: Stigningstall', '2', [
    G('Stigningstallet er den samme endringen per enhet, men for en linje.'),
    W('graf', { params: { a: { min: -4, max: 4, v: 2, navn: 'a (stigningstall)' } }, funksjoner: [{ f: 'a*x', pen: 'lin', navn: 'f(x)' }], xmin: -5, xmax: 5, ymin: -10, ymax: 10, tabell: true, tittel: 'Dra i a' }),
    C('regel', 'Husk', ['y = ax + b', 'a er stigningstallet: hvor mye y endres per steg i x.', 'b er startverdien: y når x = 0.']),
    OS([
      T('y = 3x + 1. Hva er stigningstallet?', 3, 'Tallet foran x.', 'a = 3.'),
      T('y = 5x + 2. Hva er startverdien b?', 2, 'Tallet uten x.', 'b = 2.'),
      T('y = 2x + 1. Hva er y når x = 4?', 9, '2 · 4 + 1.', '8 + 1 = 9.')
    ])
  ]));
  T2.push(S('Steg 3: Fra to punkter', '3', [
    G('Slik regner du stigningstallet fra to punkter.'),
    C('regel', 'Formel', ['a = (endring i y) ÷ (endring i x)']),
    E('Punktene (1, 3) og (3, 9). Finn stigningstallet.', ['Endring i y: 9 − 3 = 6.', 'Endring i x: 3 − 1 = 2.', 'a = 6 ÷ 2 = 3. 🎉']),
    OS([
      T('Punktene (0, 1) og (2, 7). Endring i y?', 6, '7 − 1.', '6.'),
      T('Punktene (0, 1) og (2, 7). Endring i x?', 2, '2 − 0.', '2.'),
      T('Punktene (0, 1) og (2, 7). Stigningstall?', 3, '6 ÷ 2.', 'a = 3.')
    ]),
    SJ('Dette kan du nå', ['Forklare endring per enhet', 'Finne a og b i y = ax + b', 'Regne stigningstall fra to punkter'])
  ]));
  M.register('steg', '10/stigningstall', {
    tittel: 'Endring per enhet og stigningstall',
    ingress: 'Små steg: du lærer hva stigningstall er og hvordan du regner det ut.',
    mal: ['finne stigningstall'], ordliste: ORD2, seksjoner: T2
  });
  M.ekstra['10/stigningstall'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('to', '📍', 'Stigningstall fra to punkter', 8, 'Regn ut stigningstallet.', function (r) {
      const a = r.int(lett ? 1 : -4, 5) || 2, x1 = r.int(0, 4), dx = r.int(1, 4), y1 = r.int(-3, 8); const x2 = x1 + dx, y2 = y1 + a * dx;
      return H.e('Punktene (' + x1 + ', ' + y1 + ') og (' + x2 + ', ' + y2 + ')', a, '(' + y2 + ' − ' + y1 + ') ÷ (' + x2 + ' − ' + x1 + ') = ' + (y2 - y1) + ' ÷ ' + dx + ' = ' + M.fmt(a));
    }));
    sek.push(H.ek('verdi', '🔢', 'Funksjonsverdi', 8, 'Regn ut f(x).', function (r) {
      const a = r.int(lett ? 1 : -4, 6) || 2, b = r.int(-5, 9), x = r.int(1, 8); const y = a * x + b; return H.e('f(x) = ' + (a === 1 ? '' : a === -1 ? '−' : M.fmt(a)) + 'x ' + (b < 0 ? '− ' + (-b) : '+ ' + b) + '. Hva er f(' + x + ')?', y, M.fmt(a) + ' · ' + x + ' ' + (b < 0 ? '− ' + (-b) : '+ ' + b) + ' = ' + M.fmt(y));
    }));
    sek.push(H.ek('b', '✍️', 'Finn b', 6, 'Finn b i y = ax + b.', function (r) {
      const a = r.int(2, 6), b = r.int(-5, 9), x = r.int(1, 6); const y = a * x + b; return H.e('Stigningstall ' + a + ', punktet (' + x + ', ' + y + ').', b, y + ' = ' + a + ' · ' + x + ' + b, så b = ' + y + ' − ' + a * x + ' = ' + M.fmt(b));
    }));
    sek.push(H.ek('pris', '🚕', 'Pris', 6, 'Regn ut prisen.', function (r) {
      const a = r.int(2, 8) * 5, b = r.int(2, 8) * 10, x = r.int(2, 10); return H.e('Startpris ' + b + ' kr og ' + a + ' kr per km. Hva koster ' + x + ' km?', a * x + b, a + ' · ' + x + ' + ' + b + ' = ' + (a * x + b) + ' kr');
    }));
    return H.ekDef('Stigningstall', sek);
  };
})();
