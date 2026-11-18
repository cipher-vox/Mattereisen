/* ============================================================
   Tema: Hva er en funksjon? (8. trinn) – UTFORSK + STEG + EKSTRA
   Læreplan 8.8: beskrive, sammenligne og utforske funksjoner
   knyttet til praktiske situasjoner
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, H2, SJ, S, ord } = H;
  const ORD = [
    ord(['funksjon', 'funksjoner', 'funksjonen'], 'En regel som gir nøyaktig én y-verdi for hver x-verdi.'),
    ord(['variabel', 'variabler'], 'En størrelse som kan endre seg, som tid eller pris.'),
    ord(['verditabell', 'tabell'], 'En tabell som viser sammenhengen mellom x og y.'),
    ord(['inn', 'input'], 'Tallet du putter inn i funksjonen. Kalles x.'),
    ord(['ut', 'output'], 'Tallet du får ut av funksjonen. Kalles y eller f(x).'),
    ord(['funksjonsverdi'], 'y-verdien du får for en gitt x. f(3) = 7 betyr at x = 3 gir y = 7.'),
    ord(['startverdi'], 'Verdien når x = 0, for eksempel startprisen.'),
    ord(['stigende', 'økende'], 'En funksjon som øker når x øker.'),
    ord(['synkende', 'avtagende'], 'En funksjon som minker når x øker.'),
    ord(['konstant'], 'En verdi som ikke endrer seg.')
  ];

  /* ====================== UTFORSK ====================== */
  const U = [];
  U.push(S('Funksjonsmaskinen', '🎛️', [
    P('En <strong>funksjon</strong> er som en <strong>maskin</strong>. Du putter et tall inn (<strong>x</strong>), maskinen følger en regel, og ut kommer et nytt tall (<strong>y</strong>). Samme regel brukes hver gang.'),
    W('maskin', { regel: '2*x+1', navn: 'f(x) = 2x + 1', x: 3, tittel: 'Funksjonsmaskinen f(x) = 2x + 1' }),
    C('regel', 'Skrivemåter', ['<strong>f(x) = 2x + 1</strong> er regelen: gang x med 2 og legg til 1.', '<strong>f(3) = 7</strong> leses «f av 3 er 7»: setter vi x = 3, får vi y = 7.', 'Vi bruker f, g, h til å navngi funksjoner. y og f(x) betyr det samme.']),
    E('Finn f(5) når f(x) = 3x − 2.', ['Sett x = 5 inn i regelen.', '3 · 5 − 2 = 15 − 2.', 'f(5) = 13.']),
    C('virkelighet', 'Funksjoner finnes overalt', ['Pris = antall · pris per stykk', 'Strekning = fart · tid', 'Lønn = timelønn · antall timer', 'Alle har én regel som gir ett svar for hvert tall du putter inn.']),
    O(1, [
      T('f(x) = x + 4. Hva er f(6)?', 10, 'Sett inn 6.', '6 + 4 = 10.'),
      T('f(x) = 3x. Hva er f(5)?', 15, '3 · 5.', '3 · 5 = 15.'),
      T('f(x) = 2x + 1. Hva er f(0)?', 1, 'Sett inn 0.', '2 · 0 + 1 = 1.'),
      T('f(x) = 10 − x. Hva er f(7)?', 3, '10 − 7.', '10 − 7 = 3.'),
      T('f(x) = 2x + 1. Hvilket tall må du putte inn for å få ut 9?', 4, '2x + 1 = 9.', '2 · 4 + 1 = 9, så x = 4.')
    ])
  ]));

  U.push(S('Beskrive funksjoner med regel og tabell', '📋', [
    P('Vi kan beskrive en funksjon på flere måter. To av dem er <strong>regelen</strong> (formelen) og en <strong>verditabell</strong>. Verditabellen lages ved å sette inn flere x-verdier og regne ut y.'),
    E('Lag en verditabell for f(x) = 3x − 1.', ['x = 0: 3 · 0 − 1 = −1', 'x = 1: 3 · 1 − 1 = 2', 'x = 2: 3 · 2 − 1 = 5', 'x = 3: 3 · 3 − 1 = 8. Tabellen viser at y øker med 3 for hver gang x øker med 1.']),
    TAB(['x', '0', '1', '2', '3', '4'], [['f(x) = 3x − 1', '−1', '2', '5', '8', '11']]),
    C('tips', 'Se mønsteret i tabellen', 'Øker y med like mye hver gang x øker med 1? Da er funksjonen lineær, og tallet den øker med er tallet foran x (her 3).'),
    O(2, [
      T('Lag verditabell for f(x) = 2x + 5. Hva er f(4)?', 13, '2 · 4 + 5.', '8 + 5 = 13.'),
      T('f(x) = x² . Hva er f(6)?', 36, '6 · 6.', '6² = 36.'),
      T('I en tabell er f(1) = 5, f(2) = 8, f(3) = 11. Hva er f(4)?', 14, 'y øker med 3.', '11 + 3 = 14.'),
      T('I samme tabell: hva er f(0)?', 2, 'y går ned med 3 når x går ned med 1.', '5 − 3 = 2.'),
      T('f(x) = 4x − 3. Hva er x når f(x) = 17?', 5, '4x − 3 = 17.', '4x = 20, så x = 5.')
    ])
  ]));

  U.push(S('Funksjoner i praktiske situasjoner', '🚕', [
    P('Når vi beskriver en situasjon med en funksjon, må vi velge hva som er <strong>x</strong> (det vi kan velge, som antall km) og hva som er <strong>y</strong> (det som avhenger av det, som prisen). Funksjonen gir da prisen for ethvert antall km.'),
    E('En taxi tar 50 kr i start og 15 kr per km. Lag funksjonen og finn prisen for 8 km.', ['x er antall km og y er prisen i kr.', 'f(x) = 15x + 50.', 'f(8) = 15 · 8 + 50 = 170.', 'Svar: 170 kr.']),
    TAB(['Situasjon', 'x', 'y', 'Funksjon'], [['Taxi: 50 kr + 15 kr/km', 'km', 'pris', 'f(x) = 15x + 50'], ['Cykel: 20 km/t', 'timer', 'km', 's(t) = 20t'], ['Sparegris: 200 kr + 50 kr/uke', 'uker', 'kr', 'f(x) = 50x + 200'], ['Vannstand synker 3 cm/time fra 40 cm', 'timer', 'cm', 'f(x) = 40 − 3x']]),
    C('tips', 'Startverdi og endring', ['<strong>Startverdien</strong> er verdien når x = 0. (Taxi: 50 kr.)', '<strong>Endringen per enhet</strong> er hvor mye y endres når x øker med 1. (Taxi: 15 kr per km.)']),
    O(3, [
      T('En sparegris har 200 kr og får 50 kr hver uke. Hva er det i den etter 6 uker?', 500, 'f(x) = 50x + 200.', '50 · 6 + 200 = 500 kr.', 'kr'),
      T('En sykkel holder 20 km/t. Hvor langt kommer den på 3,5 time?', 70, 's = 20 · t.', '20 · 3,5 = 70 km.', 'km'),
      T('Vannstanden er 40 cm og synker 3 cm per time. Hva er vannstanden etter 5 timer?', 25, '40 − 3 · 5.', '40 − 15 = 25 cm.', 'cm'),
      T('Et fotoalbum koster 90 kr, og hvert bilde som fremkalles koster 4 kr. Hva koster 25 bilder?', 190, '4x + 90.', '4 · 25 + 90 = 190 kr.', 'kr'),
      V('Hvilken funksjon beskriver pris på x kinobilletter à 120 kr?', ['f(x) = 120x', 'f(x) = x + 120', 'f(x) = 120 − x', 'f(x) = x/120'], 0, 'Prisen er antall ganger pris.', '120 kr per billett gir 120 · x.'),
      T('Hvor mange km kan du kjøre for 290 kr med taxi f(x) = 15x + 50?', 16, '15x + 50 = 290.', '15x = 240, så x = 16 km.', 'km')
    ])
  ]));

  U.push(S('Sammenligne funksjoner', '⚖️', [
    P('To tilbud kan se like ut, men være best i ulike situasjoner. Vi sammenligner funksjonene.'),
    W('graf', { params: {}, funksjoner: [{ f: '15*x+50', navn: 'Taxi A', farge: '#0e8f9b' }, { f: '25*x+10', navn: 'Taxi B', farge: '#e8964a' }], xmin: 0, xmax: 12, ymin: 0, ymax: 250, tabell: true, tabellx: [0, 2, 4, 6, 8, 10], skjaering: true, tittel: 'Taxi A: 15x + 50. Taxi B: 25x + 10', alt: 'To linjer som krysser hverandre' }),
    E('Når koster taxi A og B like mye?', ['A: 15x + 50. B: 25x + 10.', 'Like: 15x + 50 = 25x + 10.', 'Trekk fra 15x og 10: 40 = 10x, så x = 4.', 'Ved 4 km koster begge 110 kr. Under 4 km er B billigst. Over 4 km er A billigst.']),
    C('tips', 'Fra tabell eller graf', ['Se på <strong>tabellen</strong>: hvor bytter den som er størst?', 'Se på <strong>grafen</strong>: der linjene krysser, er funksjonene like.']),
    O(4, [
      T('Taxi A: 15x + 50. Taxi B: 25x + 10. Hva koster A for 10 km?', 200, '15 · 10 + 50.', '150 + 50 = 200 kr.', 'kr'),
      T('Hva koster taxi B for 10 km?', 260, '25 · 10 + 10.', '250 + 10 = 260 kr.', 'kr'),
      V('For en tur på 8 km, hvilken taxi er billigst?', ['A', 'B', 'De er like', 'Kan ikke avgjøres'], 0, 'Regn ut begge.', 'A: 170 kr. B: 210 kr. A er billigst.'),
      T('Mobil A: 100 kr + 2 kr per GB. Mobil B: 0 kr + 4 kr per GB. Ved hvor mange GB er de like dyre?', 50, '100 + 2x = 4x.', '100 = 2x, så x = 50 GB.', 'GB'),
      F('Mobil A koster 100 + 2x og mobil B koster 4x. Hvilken bør du velge hvis du bruker 20 GB? Og hvis du bruker 80 GB?', ['20 GB: A = 100 + 40 = 140, B = 80. B er billigst.', '80 GB: A = 100 + 160 = 260, B = 320. A er billigst.', 'Skjæringspunktet ligger ved 50 GB: under 50 er B best, over 50 er A best.'])
    ])
  ]));

  U.push(S('Stigende, synkende og konstant', '📈', [
    P('Funksjoner kan <strong>øke</strong>, <strong>minke</strong> eller være <strong>konstante</strong>.'),
    K([{ ikon: '📈', tittel: 'Stigende', tekst: 'y øker når x øker. Eksempel: f(x) = 2x + 1.' }, { ikon: '📉', tittel: 'Synkende', tekst: 'y minker når x øker. Eksempel: f(x) = 10 − 3x.' }, { ikon: '➖', tittel: 'Konstant', tekst: 'y endrer seg ikke. Eksempel: f(x) = 5.' }]),
    W('graf', { params: { a: { min: -3, max: 3, v: 1, navn: 'a (endring per x)' }, b: { min: -5, max: 5, v: 0, navn: 'b (startverdi)' } }, funksjoner: [{ f: 'a*x+b', pen: 'lin', navn: 'f(x)' }], xmin: -6, xmax: 6, ymin: -8, ymax: 8, tabell: true, tittel: 'Dra i a og b: stigende eller synkende?', forklaring: (v) => v.a > 0 ? 'Funksjonen er <strong>stigende</strong>: y blir større når x blir større.' : v.a < 0 ? 'Funksjonen er <strong>synkende</strong>: y blir mindre når x blir større.' : 'Funksjonen er <strong>konstant</strong>: y er den samme for alle x.' }),
    O(3, [
      V('Er f(x) = 5x + 2 stigende eller synkende?', ['Stigende', 'Synkende', 'Konstant', 'Verken eller'], 0, 'Se på tallet foran x.', 'Tallet 5 foran x er positivt, så y øker.', true),
      V('Er f(x) = 20 − 4x stigende eller synkende?', ['Synkende', 'Stigende', 'Konstant', 'Verken eller'], 0, 'Tallet foran x er −4.', 'x har koeffisient −4. Da minker y når x øker.', true),
      V('Hvilken funksjon er konstant?', ['f(x) = 8', 'f(x) = 8x', 'f(x) = x + 8', 'f(x) = 8 − x'], 0, 'Ingen x i regelen.', 'f(x) = 8 gir y = 8 uansett x.', true),
      T('f(x) = 40 − 3x. Hva er f(10)?', 10, 'Sett inn 10.', '40 − 30 = 10.'),
      F('Beskriv med egne ord hva som skjer med y når x øker for funksjonen som beskriver vannstand 40 − 3x. Hva forteller tallene 40 og −3?', ['40 er startverdien (vannstanden når x = 0).', '−3 forteller at vannstanden synker 3 enheter for hver ekstra time.', 'Funksjonen er synkende.'])
    ])
  ]));

  U.push(S('Er det en funksjon?', '🧐', [
    P('En funksjon må gi <strong>nøyaktig én y</strong> for hver x. Hvis samme x kan gi to ulike y-verdier, er det ikke en funksjon.'),
    TAB(['x', 'y', 'Funksjon?'], [['1 → 3, 2 → 5, 3 → 7', 'Hver x har én y', '✅ Ja'], ['1 → 3, 1 → 5', 'x = 1 gir både 3 og 5', '❌ Nei'], ['1 → 4, 2 → 4, 3 → 4', 'Alle gir 4, men hver x har bare én y', '✅ Ja (konstant)']]),
    C('tips', 'Husketrikset', 'Samme x kan godt gi samme y flere ganger. Men samme x kan aldri gi flere y.'),
    O(4, [
      V('Er dette en funksjon? (x → y): 1 → 2, 2 → 4, 3 → 6, 4 → 8', ['Ja', 'Nei'], 0, 'Hver x har én y.', 'Ja. Regelen er y = 2x.', true),
      V('Er dette en funksjon? (x → y): 1 → 2, 1 → 3, 2 → 4', ['Nei', 'Ja'], 0, 'x = 1 gir to ulike y.', 'Nei. x = 1 gir både 2 og 3.', true),
      V('Er prisen på en vare en funksjon av vekten (kg), når prisen er 30 kr/kg?', ['Ja', 'Nei'], 0, 'Én vekt gir én pris.', 'Ja. f(x) = 30x gir én pris for hver vekt.', true),
      V('Er vekten din en funksjon av alderen din?', ['Ja, for deg: hvert alderstrinn har én vekt', 'Nei, vekt er tilfeldig', 'Nei, alder gir ikke vekt', 'Ja, alle har lik vekt'], 0, 'Hvis du måler deg på bursdagen din.', 'For deg gir hver alder (på bursdagen) en bestemt vekt. Men vekten er ikke gitt ved en enkel regel som en formel.'),
      F('Forklar med egne ord hva en funksjon er, og gi et eksempel fra hverdagen.', ['En funksjon er en regel der hver x gir nøyaktig én y.', 'Eksempel: prisen for x kg epler er 25x kr. For 2 kg betaler du 50 kr, og for 3 kg 75 kr. Hver mengde har én pris.'])
    ]),
    SJ('Dette kan du nå', ['Forklare hva en funksjon er', 'Regne ut f(x) når jeg kjenner x', 'Lage en verditabell', 'Beskrive en situasjon med en funksjon', 'Sammenligne to funksjoner og se om de er stigende eller synkende'])
  ]));

  M.register('utforsk', '8/funksjoner', {
    tittel: 'Hva er en funksjon?',
    ingress: 'Funksjoner er matematikken bak pris, fart, sparing og alt som endrer seg etter en regel. Du lærer å beskrive og sammenligne dem.',
    mal: ['beskrive, sammenligne og utforske funksjoner', 'knytte funksjoner til praktiske situasjoner'],
    ordliste: ORD, seksjoner: U
  });

  /* ====================== STEG ====================== */
  const T1 = [];
  T1.push(S('Steg 1: Maskinen', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('En <strong>funksjon</strong> er som en maskin. Du putter inn et tall, maskinen gjør noe med det, og ut kommer et nytt tall.', true),
    W('maskin', { regel: '2*x', navn: 'f(x) = 2x', x: 3, tittel: 'Dobler-maskinen' }),
    E('Maskinen dobler. Hva kommer ut hvis du putter inn 4?', ['Maskinen gjør tallet dobbelt så stort.', '2 · 4 = 8.', 'Ut kommer 8. 🎉']),
    OS([
      T('Maskinen legger til 5. Hva kommer ut hvis du putter inn 3?', 8, '3 + 5.', '3 + 5 = 8.'),
      T('Maskinen dobler. Hva kommer ut hvis du putter inn 6?', 12, '2 · 6.', '2 · 6 = 12.'),
      T('Maskinen ganger med 3. Hva kommer ut hvis du putter inn 5?', 15, '3 · 5.', '3 · 5 = 15.'),
      T('Maskinen trekker fra 2. Hva kommer ut hvis du putter inn 9?', 7, '9 − 2.', '9 − 2 = 7.')
    ])
  ]));
  T1.push(S('Steg 2: f(x) og tabell', '2', [
    G('Vi gir maskinen en regel med bokstav.'),
    P('Vi skriver regelen som <strong>f(x) = 2x + 1</strong>. Det betyr «ta x, gang med 2, legg til 1». <strong>f(3)</strong> betyr «sett inn 3 for x».', true),
    E('Finn f(3) når f(x) = 2x + 1.', ['Sett 3 inn for x.', '2 · 3 + 1.', '6 + 1 = 7.', 'f(3) = 7. 🎉']),
    TAB(['x', '0', '1', '2', '3'], [['f(x) = 2x + 1', '1', '3', '5', '7']]),
    OS([
      T('f(x) = x + 4. Hva er f(2)?', 6, 'Sett inn 2.', '2 + 4 = 6.'),
      T('f(x) = 3x. Hva er f(4)?', 12, '3 · 4.', '3 · 4 = 12.'),
      T('f(x) = 2x + 1. Hva er f(5)?', 11, '2 · 5 + 1.', '10 + 1 = 11.'),
      T('f(x) = 10 − x. Hva er f(6)?', 4, '10 − 6.', '10 − 6 = 4.')
    ])
  ]));
  T1.push(S('Steg 3: Funksjoner i hverdagen', '3', [
    G('Funksjoner brukes når vi regner pris og fart.'),
    P('En taxi tar <strong>50 kr</strong> i start og <strong>10 kr per km</strong>. Prisen for x km er <strong>f(x) = 10x + 50</strong>.', true),
    E('Hva koster en taxi på 4 km?', ['f(x) = 10x + 50. Vi setter x = 4.', '10 · 4 + 50.', '40 + 50 = 90.', 'Svar: 90 kr. 🎉']),
    OS([
      T('Taxi: f(x) = 10x + 50. Hva koster 3 km?', 80, '10 · 3 + 50.', '30 + 50 = 80 kr.', 'kr'),
      T('Taxi: f(x) = 10x + 50. Hva koster 0 km? (Startprisen.)', 50, 'Sett inn 0.', '10 · 0 + 50 = 50 kr.', 'kr'),
      T('En billett koster 40 kr. Hva koster 5 billetter? f(x) = 40x.', 200, '40 · 5.', '40 · 5 = 200 kr.', 'kr'),
      T('Sparegrisen har 100 kr og får 20 kr per uke. f(x) = 20x + 100. Hva er det etter 3 uker?', 160, '20 · 3 + 100.', '60 + 100 = 160 kr.', 'kr')
    ])
  ]));
  T1.push(S('Steg 4: Øker eller minker?', '4', [
    G('Siste steg! Hvordan endrer y seg?'),
    P('Se på tallet foran x. Er det <strong>positivt</strong>, øker y. Er det <strong>negativt</strong>, minker y.', true),
    W('graf', { params: { a: { min: -3, max: 3, v: 1, navn: 'a' } }, funksjoner: [{ f: 'a*x', pen: 'lin', navn: 'f(x)' }], xmin: -5, xmax: 5, ymin: -8, ymax: 8, tittel: 'Dra i a', forklaring: (v) => v.a > 0 ? 'Linja går <strong>oppover</strong>. y øker.' : v.a < 0 ? 'Linja går <strong>nedover</strong>. y minker.' : 'Linja er flat.' }),
    OS([
      V('f(x) = 3x + 1. Øker eller minker y når x blir større?', ['Øker', 'Minker'], 0, 'Tallet foran x er 3.', '3 er positivt, så y øker.', true),
      V('f(x) = 10 − 2x. Øker eller minker y når x blir større?', ['Minker', 'Øker'], 0, 'Tallet foran x er −2.', '−2 er negativt, så y minker.', true),
      T('f(x) = 10 − 2x. Hva er f(3)?', 4, '10 − 2 · 3.', '10 − 6 = 4.'),
      T('f(x) = 10 − 2x. Hva er f(5)?', 0, '10 − 2 · 5.', '10 − 10 = 0.')
    ]),
    SJ('Dette kan du nå', ['Forklare en funksjon som en maskin', 'Regne ut f(x)', 'Bruke funksjoner på pris og sparing', 'Se om en funksjon øker eller minker'])
  ]));

  M.register('steg', '8/funksjoner', {
    tittel: 'Hva er en funksjon?',
    ingress: 'Små steg, tydelige eksempler og hjelp hele veien. Du lærer hva en funksjon er.',
    mal: ['forstå hva en funksjon er', 'regne ut f(x)', 'bruke funksjoner på hverdagssituasjoner'],
    ordliste: ORD, seksjoner: T1
  });

  /* ====================== EKSTRA ====================== */
  M.ekstra['8/funksjoner'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('verdi', '🎛️', 'Regn ut f(x)', 10, 'Sett inn x og regn ut.', function (r, i) {
      const a = r.int(2, lett ? 5 : 9), b = r.int(1, 12), x = r.int(1, lett ? 6 : 12); const pm = lett || i % 3 !== 2;
      const v = a * x + (pm ? b : -b);
      return H.e('f(x) = ' + a + 'x ' + (pm ? '+' : '−') + ' ' + b + '. Hva er f(' + x + ')?', v, a + ' · ' + x + (pm ? ' + ' : ' − ') + b + ' = ' + v);
    }));
    sek.push(H.ek('invers', '↩️', 'Hvilken x gir dette?', 8, 'Hvilken x gir denne y-verdien? Løs likningen.', function (r) {
      const a = r.int(2, lett ? 5 : 9), b = r.int(1, 12), x = r.int(2, lett ? 8 : 15);
      return H.e('f(x) = ' + a + 'x + ' + b + '. For hvilken x er f(x) = ' + (a * x + b) + '?', x, a + 'x + ' + b + ' = ' + (a * x + b) + ', så ' + a + 'x = ' + a * x + ' og x = ' + x);
    }));
    sek.push(H.ek('pris', '🚕', 'Pris-funksjoner', 8, 'Regn ut prisen.', function (r, i) {
      const f = r.int(2, 10) * 10, p = r.int(2, lett ? 6 : 15), n = r.int(2, 15);
      return i % 2 === 0 ? H.e('En utleier tar ' + f + ' kr i startgebyr og ' + p + ' kr per time. Hva koster ' + n + ' timer?', p * n + f, p + ' · ' + n + ' + ' + f + ' = ' + (p * n + f) + ' kr')
        : H.e('Du sparer ' + p * 10 + ' kr per uke og starter med ' + f + ' kr. Hvor mye har du etter ' + n + ' uker?', p * 10 * n + f, p * 10 + ' · ' + n + ' + ' + f + ' = ' + (p * 10 * n + f) + ' kr');
    }));
    if (!lett) sek.push(H.ek('sammenlign', '⚖️', 'Når er de like dyre?', 6, 'Finn x der de to funksjonene gir samme verdi.', function (r) {
      const x = r.int(2, 15), a = r.int(2, 6), d = r.int(1, 5); const s1 = r.int(5, 20) * 10; // f1 = a x + s1 ; f2 = (a+d) x + (s1 - d x)
      return H.e('A koster ' + a + 'x + ' + (s1 + d * x) + ' og B koster ' + (a + d) + 'x + ' + s1 + '. For hvilken x er de like?', x, a + 'x + ' + (s1 + d * x) + ' = ' + (a + d) + 'x + ' + s1 + ' gir ' + d * x + ' = ' + d + 'x, så x = ' + x);
    }));
    return H.ekDef('Hva er en funksjon?', sek);
  };
})();
