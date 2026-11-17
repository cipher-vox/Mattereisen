/* ============================================================
   Tema: Funksjoner – tabell, graf og uttrykk (8. trinn)
   Læreplan 8.8–8.9: situasjoner, tabeller, grafer og uttrykk som
   representasjoner av funksjoner, og sammenhengen mellom dem
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, H2, SJ, S, ord } = H;
  const ORD = [
    ord(['representasjon', 'representasjoner'], 'En måte å vise det samme på: med tekst, tabell, graf eller formel.'),
    ord(['verditabell', 'tabell'], 'Tabell med x-verdier og y-verdier.'),
    ord(['graf', 'grafen'], 'Tegningen av en funksjon i et koordinatsystem. For lineære funksjoner er den en rett linje.'),
    ord(['koordinatsystem', 'koordinatsystemet'], 'To tallinjer som krysser hverandre: x-aksen (vannrett) og y-aksen (loddrett).'),
    ord(['punkt', 'punktet'], 'En posisjon (x, y) i koordinatsystemet.'),
    ord(['skjæringspunkt', 'skjæringspunktet'], 'Stedet der to grafer krysser hverandre. Her har funksjonene samme verdi.'),
    ord(['stigningstall'], 'Hvor mye y endres når x øker med 1. Står foran x i f(x) = ax + b.'),
    ord(['startverdi', 'konstantledd'], 'Verdien når x = 0. Her krysser grafen y-aksen. Er b i f(x) = ax + b.'),
    ord(['akse', 'aksene'], 'Tallinjene i koordinatsystemet.')
  ];

  /* ====================== UTFORSK ====================== */
  const U = [];
  U.push(S('Fire måter å vise det samme på', '🎭', [
    P('Det samme kan sies på <strong>fire måter</strong>. Hver måte har sine fordeler. En god matematiker kan bytte mellom dem.'),
    K([{ ikon: '💬', tittel: 'Situasjon (ord)', tekst: '«En taxi tar 50 kr i start og 20 kr per km.»' }, { ikon: '📋', tittel: 'Tabell', tekst: 'x = 0, 1, 2, 3 gir y = 50, 70, 90, 110.' }, { ikon: '📈', tittel: 'Graf', tekst: 'En rett linje som starter i 50 og stiger bratt.' }, { ikon: '🔤', tittel: 'Uttrykk', tekst: 'f(x) = 20x + 50' }]),
    W('graf', { params: { a: { min: 0, max: 5, v: 2, navn: 'a (endring per x)' }, b: { min: 0, max: 5, v: 1, navn: 'b (start)' } }, funksjoner: [{ f: 'a*x+b', pen: 'lin', navn: 'f(x)' }], xmin: -1, xmax: 6, ymin: -1, ymax: 20, tabell: true, tabellx: [0, 1, 2, 3, 4, 5], tittel: 'Samme funksjon i uttrykk, graf og tabell', alt: 'Graf av en lineær funksjon' }),
    C('tips', 'Hva er best?', ['<strong>Uttrykket</strong>: kort og nøyaktig. Du kan regne ut hvilken som helst x.', '<strong>Tabellen</strong>: gir mange tall på en gang. Lett å se mønsteret.', '<strong>Grafen</strong>: du ser utviklingen med én gang (stiger, synker, hvor fort).', '<strong>Situasjonen</strong>: viser hva tallene betyr i virkeligheten.']),
    O(1, [
      V('Hvilken representasjon viser best hvordan noe endrer seg over tid, med et blikk?', ['Graf', 'Tabell', 'Uttrykk', 'Alle like'], 0, 'Tenk på et bilde.', 'En graf viser utviklingen med én gang.'),
      V('Hvilken representasjon passer best for å regne ut f(100)?', ['Uttrykk', 'Graf', 'Tabell med x opp til 5', 'Ingen'], 0, 'Du trenger en regel du kan bruke på alle x.', 'Med et uttrykk kan du sette inn hvilken som helst x.'),
      T('f(x) = 20x + 50. Hva er f(3)?', 110, 'Sett inn 3.', '20 · 3 + 50 = 110.')
    ])
  ]));

  U.push(S('Fra uttrykk til tabell og graf', '🧮', [
    P('For å tegne en graf starter du med en <strong>verditabell</strong>. Finn noen punkter, sett dem i koordinatsystemet, og trekk en linje gjennom dem (hvis funksjonen er lineær).'),
    E('Tegn grafen til f(x) = 2x − 1.', ['Lag tabell: x = 0 gir −1. x = 1 gir 1. x = 2 gir 3. x = 3 gir 5.', 'Punktene er (0, −1), (1, 1), (2, 3) og (3, 5).', 'Sett punktene i koordinatsystemet og trekk en rett linje gjennom dem.', 'Grafen er stigende og krysser y-aksen i −1.']),
    W('graf', { params: {}, funksjoner: [{ f: '2*x-1', navn: 'f(x) = 2x − 1' }], xmin: -3, xmax: 5, ymin: -4, ymax: 8, tabell: true, tabellx: [-1, 0, 1, 2, 3, 4], punkt: true, px: 2, tittel: 'Dra «Velg x» og se punktet på grafen', alt: 'Graf av f(x) = 2x − 1' }),
    C('regel', 'To punkt er nok for en rett linje', 'Er du sikker på at funksjonen er lineær, trenger du bare to punkter. Bruk et tredje punkt som kontroll.'),
    O(2, [
      T('f(x) = 3x + 2. Hva er y når x = 4?', 14, 'Sett inn 4.', '3 · 4 + 2 = 14. Punktet er (4, 14).'),
      T('f(x) = 2x − 1. Hva er y når x = 0? (Der grafen krysser y-aksen.)', -1, 'Sett inn 0.', '2 · 0 − 1 = −1. Grafen krysser y-aksen i −1.'),
      T('f(x) = x + 5. Hva er y når x = −3?', 2, 'Sett inn −3.', '−3 + 5 = 2.'),
      T('f(x) = 10 − 2x. Hva er y når x = 5?', 0, 'Sett inn 5.', '10 − 10 = 0.'),
      V('Hvilke punkter ligger på grafen til f(x) = 2x + 1?', ['(0, 1) og (2, 5)', '(0, 2) og (1, 3)', '(1, 2) og (2, 3)', '(0, 0) og (1, 1)'], 0, 'Sett inn x i uttrykket.', 'f(0) = 1 og f(2) = 5.')
    ])
  ]));

  U.push(S('Lese av grafer', '👀', [
    P('Å lese av en graf betyr å finne y for en gitt x, eller x for en gitt y. Fra x går du <strong>opp til grafen</strong> og så <strong>bort til y-aksen</strong>.'),
    W('graf', { params: {}, funksjoner: [{ f: '1.5*x+2', navn: 'f(x)' }], xmin: 0, xmax: 10, ymin: 0, ymax: 18, punkt: true, px: 4, tabell: true, tabellx: [0, 2, 4, 6, 8, 10], tittel: 'Se hva y er for ulike x', alt: 'Graf av en stigende linje' }),
    C('tips', 'Husk', ['Les av punktet som <strong>(x, y)</strong>. x først.', 'Der grafen krysser <strong>y-aksen</strong> er x = 0. Det er startverdien.', 'Der grafen krysser <strong>x-aksen</strong> er y = 0.']),
    O(2, [
      T('Grafen over: f(x) = 1,5x + 2. Hva er y når x = 4?', 8, 'Se på punktet.', '1,5 · 4 + 2 = 8.'),
      T('Hva er startverdien (x = 0) i grafen over?', 2, 'Der linja treffer y-aksen.', 'f(0) = 2.'),
      T('For hvilken x er y = 14? (1,5x + 2 = 14)', 8, '1,5x = 12.', 'x = 12 : 1,5 = 8.'),
      V('Grafen går nedover fra venstre mot høyre. Hva betyr det?', ['Funksjonen er synkende', 'Funksjonen er stigende', 'Funksjonen er konstant', 'Den er feil tegnet'], 0, 'Tenk på en bakke ned.', 'En graf som går nedover er synkende.', true)
    ])
  ]));

  U.push(S('Fra graf og tabell til uttrykk', '🔎', [
    P('Hvis du kjenner startverdien og hvor mye y endres per x, kan du skrive uttrykket selv:'),
    C('regel', 'Lineær funksjon', ['<strong>f(x) = a·x + b</strong>', '<strong>b</strong> = startverdien: y når x = 0 (der grafen krysser y-aksen).', '<strong>a</strong> = endring i y når x øker med 1 (hvor bratt).']),
    E('Tabellen viser x = 0, 1, 2, 3 og y = 4, 7, 10, 13. Finn uttrykket.', ['Startverdi: x = 0 gir y = 4. Så b = 4.', 'Endring: y øker med 3 for hver x. Så a = 3.', 'Uttrykk: f(x) = 3x + 4.', 'Sjekk: f(3) = 3 · 3 + 4 = 13 ✓.']),
    E('Grafen går gjennom (0, 10) og (2, 4). Finn uttrykket.', ['Startverdi: b = 10.', 'Fra x = 0 til x = 2 går y fra 10 til 4. Endringen er −6 på 2 steg, altså −3 per steg.', 'Uttrykk: f(x) = −3x + 10.', 'Sjekk: f(2) = −6 + 10 = 4 ✓.']),
    O(3, [
      T('Tabell: x = 0, 1, 2 gir y = 5, 7, 9. Hva er a (endring per x)?', 2, '7 − 5.', 'y øker med 2 for hver x. a = 2.'),
      T('Samme tabell: hva er f(10)? (f(x) = 2x + 5)', 25, '2 · 10 + 5.', '20 + 5 = 25.'),
      T('Grafen krysser y-aksen i 6 og øker med 4 per x. Hva er f(5)?', 26, 'f(x) = 4x + 6.', '4 · 5 + 6 = 26.'),
      T('Grafen går gjennom (0, 20) og (4, 8). Hva er a?', -3, '(8 − 20) : 4.', '(8 − 20) : 4 = −12 : 4 = −3.'),
      V('Hvilken funksjon passer til punktene (0, 3), (1, 5), (2, 7)?', ['f(x) = 2x + 3', 'f(x) = 3x + 2', 'f(x) = x + 3', 'f(x) = 2x'], 0, 'Startverdi 3, endring 2.', 'f(0) = 3, og y øker med 2: f(x) = 2x + 3.'),
      V('Hvilken funksjon passer til situasjonen «300 kr på konto, tar ut 25 kr per uke»?', ['f(x) = 300 − 25x', 'f(x) = 300 + 25x', 'f(x) = 25x', 'f(x) = 300x − 25'], 0, 'Startverdi 300 og endring −25.', 'Beløpet starter på 300 og synker med 25: f(x) = 300 − 25x.')
    ])
  ]));

  U.push(S('Sammenligne grafer og skjæringspunkt', '✖️', [
    P('Når to funksjoner tegnes i samme koordinatsystem, ser du med én gang hvilken som er størst hvor. <strong>Skjæringspunktet</strong> viser hvor de er like.'),
    W('graf', { params: { a: { min: 1, max: 5, v: 3, navn: 'a (stigning)' }, b: { min: -2, max: 6, v: 0, navn: 'b (start)' } }, funksjoner: [{ f: 'a*x+b', navn: 'f', pen: 'lin', farge: '#0e8f9b' }, { f: '2*x+3', navn: 'g', farge: '#e8964a' }], xmin: -1, xmax: 8, ymin: -2, ymax: 25, skjaering: true, tittel: 'Hvor krysser f og g = 2x + 3 hverandre?', alt: 'To linjer' }),
    E('Finn skjæringspunktet mellom f(x) = 3x og g(x) = 2x + 3.', ['Vi vil ha f(x) = g(x): 3x = 2x + 3.', 'Trekk fra 2x: x = 3.', 'y = f(3) = 9. Skjæringspunktet er (3, 9).']),
    O(4, [
      T('f(x) = 3x og g(x) = 2x + 3. For hvilken x er f(x) = g(x)?', 3, '3x = 2x + 3.', 'x = 3.'),
      T('For samme funksjoner: hva er y i skjæringspunktet?', 9, 'f(3) = 3 · 3.', 'y = 9.'),
      T('f(x) = x + 4 og g(x) = 2x. For hvilken x er de like?', 4, 'x + 4 = 2x.', 'x = 4.'),
      V('Når x er større enn skjæringspunktet, er f(x) = 3x større eller mindre enn g(x) = 2x + 3?', ['Større', 'Mindre', 'Lik', 'Kan ikke avgjøres'], 0, 'Prøv x = 10.', 'f(10) = 30, g(10) = 23. f er større. 3x vokser fortere.')
    ])
  ]));

  U.push(S('Kritisk blikk på grafer', '🧐', [
    P('Grafer kan <strong>lure</strong>. Se på aksene, enhetene og hvor akseren starter, før du trekker slutninger.'),
    C('advarsel', 'Pass på', ['Starter y-aksen på 0? Eller er den klippet?', 'Er enhetene på aksene like for hele aksen?', 'Er det tallene eller utseendet som overbeviser?']),
    O(4, [
      V('En graf viser at pris øker fra 100 til 105, men y-aksen starter på 98. Hva er galt?', ['Økningen ser mye større ut enn den er', 'Ingenting', 'Pris kan ikke øke', 'Grafen er rund'], 0, 'Se på aksen.', 'Når aksen starter høyt, ser små endringer store ut.'),
      F('Lag en funksjon som beskriver en situasjon fra egen hverdag (for eksempel sparing eller pris). Beskriv den på alle fire måter: ord, tabell, uttrykk og graf.', ['Svarene er ulike. Et godt svar har: situasjon med startverdi og endring, en tabell med minst 4 verdier, et uttrykk f(x) = ax + b, og en graf der aksene er navngitt.', 'Sjekk at alle fire måtene viser det samme, for eksempel at f(3) fra tabell og uttrykk er likt.'])
    ]),
    SJ('Dette kan du nå', ['Lage verditabell og tegne graf', 'Lese av punkter på en graf', 'Finne uttrykket f(x) = ax + b fra tabell eller graf', 'Finne skjæringspunkt', 'Velge best representasjon og se om en graf kan lure'])
  ]));

  M.register('utforsk', '8/representasjoner', {
    tittel: 'Funksjoner: tabell, graf og uttrykk',
    ingress: 'Samme funksjon kan vises på fire måter. Du lærer å bytte mellom situasjon, tabell, graf og uttrykk.',
    mal: ['bruke situasjoner, tabeller, grafer og uttrykk til å representere funksjoner', 'vise sammenhengen mellom representasjonene'],
    ordliste: ORD, seksjoner: U
  });

  /* ====================== STEG ====================== */
  const T1 = [];
  T1.push(S('Steg 1: Tabell', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('En <strong>tabell</strong> viser x og y side om side. Vi regner ut y for noen x.', true),
    E('Lag tabell for f(x) = 2x + 1.', ['x = 0: 2 · 0 + 1 = 1.', 'x = 1: 2 · 1 + 1 = 3.', 'x = 2: 2 · 2 + 1 = 5.', 'x = 3: 2 · 3 + 1 = 7. 🎉']),
    TAB(['x', '0', '1', '2', '3'], [['y', '1', '3', '5', '7']]),
    OS([
      T('f(x) = 3x. Hva er y når x = 2?', 6, '3 · 2.', '3 · 2 = 6.'),
      T('f(x) = x + 4. Hva er y når x = 5?', 9, '5 + 4.', '5 + 4 = 9.'),
      T('f(x) = 2x + 1. Hva er y når x = 4?', 9, '2 · 4 + 1.', '8 + 1 = 9.'),
      T('f(x) = 2x + 1. Hva er y når x = 0?', 1, '2 · 0 + 1.', '0 + 1 = 1.')
    ])
  ]));
  T1.push(S('Steg 2: Punkter og graf', '2', [
    G('Nå tegner vi tallene.'),
    P('Hvert par (x, y) er et <strong>punkt</strong>. x sier hvor langt til høyre, y sier hvor langt opp. Setter vi alle punktene sammen, får vi en <strong>graf</strong>.', true),
    W('graf', { params: {}, funksjoner: [{ f: '2*x+1', navn: 'f(x) = 2x + 1' }], xmin: -1, xmax: 5, ymin: -1, ymax: 12, punkt: true, px: 2, tabell: true, tabellx: [0, 1, 2, 3, 4], tittel: 'Graf og tabell', alt: 'Graf' }),
    E('Hvilket punkt på grafen hører til x = 2?', ['Se i tabellen: x = 2 gir y = 5.', 'Punktet er (2, 5).', 'x først, så y. 🎉']),
    OS([
      T('Punktet er (3, 7). Hva er x?', 3, 'x kommer først.', 'x = 3.'),
      T('Punktet er (3, 7). Hva er y?', 7, 'y kommer sist.', 'y = 7.'),
      T('Grafen til f(x) = 2x + 1 går gjennom x = 4. Hva er y?', 9, '2 · 4 + 1.', '8 + 1 = 9.'),
      T('Hva er y når x = 0 i f(x) = 2x + 1?', 1, 'Der grafen starter på y-aksen.', '2 · 0 + 1 = 1.')
    ])
  ]));
  T1.push(S('Steg 3: Start og endring', '3', [
    G('Her er nøkkelen til å lage uttrykk.'),
    P('Se på tabellen. <strong>Startverdien</strong> er y når x = 0. <strong>Endringen</strong> er hvor mye y øker hver gang x øker med 1.', true),
    TAB(['x', '0', '1', '2', '3'], [['y', '4', '7', '10', '13']]),
    E('Finn uttrykket for tabellen over.', ['Startverdi: x = 0 gir 4.', 'Endring: 7 − 4 = 3. Det øker med 3.', 'Uttrykk: f(x) = 3x + 4. 🎉']),
    OS([
      T('Tabell: y = 2, 5, 8, 11 for x = 0, 1, 2, 3. Hva er startverdien?', 2, 'y når x = 0.', 'Startverdien er 2.'),
      T('Samme tabell: hvor mye øker y per steg?', 3, '5 − 2.', 'y øker med 3.'),
      V('Samme tabell: hvilket uttrykk passer?', ['f(x) = 3x + 2', 'f(x) = 2x + 3', 'f(x) = 3x'], 0, 'Endring 3 og start 2.', 'f(x) = 3x + 2.', true),
      T('f(x) = 3x + 2. Hva er f(10)?', 32, '3 · 10 + 2.', '30 + 2 = 32.')
    ])
  ]));
  T1.push(S('Steg 4: Lese av en graf', '4', [
    G('Siste steg! Fra grafen til svaret.'),
    P('Se på grafen. Gå fra x opp til linja, og så bort til y.', true),
    W('graf', { params: {}, funksjoner: [{ f: '2*x+2', navn: 'f(x)' }], xmin: 0, xmax: 8, ymin: 0, ymax: 20, punkt: true, px: 3, tabell: true, tabellx: [0, 1, 2, 3, 4, 5], tittel: 'Les av grafen', alt: 'Graf' }),
    OS([
      T('Grafen: hva er y når x = 3? (2x + 2)', 8, '2 · 3 + 2.', '6 + 2 = 8.'),
      T('Hva er y når x = 0? (Der linja starter.)', 2, '2 · 0 + 2.', 'y = 2.'),
      T('Hva er y når x = 5?', 12, '2 · 5 + 2.', '10 + 2 = 12.'),
      V('Grafen går oppover. Er funksjonen stigende eller synkende?', ['Stigende', 'Synkende'], 0, 'Oppover er stigende.', 'En graf som går oppover er stigende.', true)
    ]),
    SJ('Dette kan du nå', ['Lage verditabell', 'Forstå punkter og grafer', 'Finne startverdi og endring', 'Lese av en graf'])
  ]));

  M.register('steg', '8/representasjoner', {
    tittel: 'Funksjoner: tabell, graf og uttrykk',
    ingress: 'Små steg, tydelige eksempler og hjelp hele veien. Du lærer å lage tabeller og lese grafer.',
    mal: ['lage tabell fra et uttrykk', 'forstå punkter og grafer', 'finne start og endring'],
    ordliste: ORD, seksjoner: T1
  });

  /* ====================== EKSTRA ====================== */
  M.ekstra['8/representasjoner'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('tabell', '📋', 'Verditabell', 8, 'Regn ut y.', function (r) {
      const a = r.int(2, lett ? 5 : 9), b = r.int(-5, 9), x = r.int(-2, lett ? 6 : 10); const v = a * x + b;
      return H.e('f(x) = ' + a + 'x ' + (b < 0 ? '− ' + -b : '+ ' + b) + '. Hva er y når x = ' + (x < 0 ? '−' + -x : x) + '?', v, a + ' · ' + (x < 0 ? '(−' + -x + ')' : x) + (b < 0 ? ' − ' + -b : ' + ' + b) + ' = ' + (v < 0 ? '−' + -v : v));
    }));
    sek.push(H.ek('uttrykk', '🔤', 'Fra tabell til uttrykk', 8, 'Tabellen viser x = 0, 1, 2, 3. Finn f(10).', function (r) {
      const a = r.int(2, lett ? 5 : 8), b = r.int(1, 12); const t = [0, 1, 2, 3].map(x => a * x + b);
      return H.e('y = ' + t.join(', ') + '. Hva er f(10)?', a * 10 + b, 'Startverdi ' + b + ', endring ' + a + ': f(x) = ' + a + 'x + ' + b + '. f(10) = ' + (a * 10 + b));
    }));
    sek.push(H.ek('graf', '📈', 'Fra to punkter', 6, 'Grafen er en rett linje gjennom to punkter. Finn y for ny x.', function (r) {
      const a = r.int(-4, 6) || 3, b = r.int(0, 15); const x2 = r.int(2, 5), n = r.int(6, 12);
      return H.e('Linja går gjennom (0, ' + b + ') og (' + x2 + ', ' + (a * x2 + b) + '). Hva er y når x = ' + n + '?', a * n + b, 'Endring per x: (' + (a * x2 + b) + ' − ' + b + ') : ' + x2 + ' = ' + a + '. y = ' + a + ' · ' + n + ' + ' + b + ' = ' + (a * n + b));
    }));
    if (!lett) sek.push(H.ek('skj', '✖️', 'Skjæringspunkt', 6, 'Finn x der funksjonene er like.', function (r) {
      const x = r.int(1, 12), a = r.int(1, 5), d = r.int(1, 4), b = r.int(1, 10);
      return H.e('f(x) = ' + (a + d) + 'x + ' + b + ' og g(x) = ' + a + 'x + ' + (b + d * x) + '. For hvilken x er f(x) = g(x)?', x, (a + d) + 'x + ' + b + ' = ' + a + 'x + ' + (b + d * x) + ' gir ' + d + 'x = ' + d * x + ', så x = ' + x);
    }));
    return H.ekDef('Funksjoner: tabell, graf og uttrykk', sek);
  };
})();
