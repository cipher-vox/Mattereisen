/* ============================================================
   10. trinn: Modellering + Programmering og Python
   Læreplan 10.9, 10.10 og 10.11
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, SJ, S, ord } = H;
  const TEAL = '#0e8f9b', ORANGE = '#e8964a', PLUM = '#8a5fbf';
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const kodeTekst = (kode, spm) => (spm || 'Hva skrives ut?') + '<br><code>' + esc(kode).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;') + '</code>';
  /* TK: tallsvar som verifiseres ved å kjøre koden. VK: flervalg som verifiseres ved å kjøre koden. */
  const TK = (kode, svar, hint, losning, spm) => Object.assign(T(kodeTekst(kode, spm), svar, hint, losning), { kjor: kode });
  const VK = (kode, valg, riktig, hint, losning, spm) => Object.assign(V(kodeTekst(kode, spm), valg, riktig, hint, losning, true), { kjor: kode });

  /* ================= MODELLERING ================= */
  const ORD1 = [
    ord(['modell', 'modeller', 'modellen'], 'En forenklet beskrivelse av virkeligheten i matematikk, for eksempel en formel eller en graf.'),
    ord(['modellering'], 'Å lage og bruke en matematisk modell for å forstå en situasjon.'),
    ord(['forenkling', 'forenkle'], 'Å se bort fra det som ikke er viktigst, for å kunne regne.'),
    ord(['antakelse', 'antakelser'], 'Noe vi bestemmer oss for å regne med, selv om det ikke er helt sikkert.'),
    ord(['gyldig', 'gyldighet', 'gyldige'], 'Hvor godt modellen passer med virkeligheten, og for hvilke verdier.'),
    ord(['prediksjon', 'prediktere', 'forutsi'], 'Å bruke modellen til å si hva som vil skje.'),
    ord(['interpolering'], 'Å bruke modellen mellom de kjente målingene. Det er som regel trygt.'),
    ord(['ekstrapolering'], 'Å bruke modellen utenfor det området dataene dekker. Det er usikkert.'),
    ord(['regresjon'], 'En metode (i regneark eller GeoGebra) for å finne den funksjonen som passer best til målepunktene.'),
    ord(['parameter', 'parametere'], 'Tallene i en modell, som a og b i y = ax + b.'),
    ord(['avvik'], 'Forskjellen mellom modellens verdi og den målte verdien.'),
    ord(['målepunkt', 'data'], 'Tall du har målt eller funnet i en undersøkelse.')
  ];
  const U1 = [];
  U1.push(S('Hva er en modell?', '🧪', [
    P('En <strong>matematisk modell</strong> er en <strong>forenkling</strong> av virkeligheten som du kan regne på. Et kart er en modell av terrenget. En formel for taxi-prisen er en modell av hva du må betale. Modellen er aldri helt riktig, men den er nyttig!'),
    TAB(['Situasjon', 'Mulig modell'], [['Taxi: 50 kr + 15 kr per km', 'y = 15x + 50 (lineær)'], ['Sparing med 4 % rente', 'y = 1000 · 1,04ˣ (eksponentiell)'], ['Ball som kastes opp', 'y = −5x² + 10x (andregrad)'], ['Tid for å kjøre 120 km', 't = 120/x (brøk)']]),
    C('mestring', 'Alle modeller er forenklinger', 'Kunsten er å lage en modell som er <strong>enkel nok til å regne på</strong>, og <strong>god nok til å være nyttig</strong>.'),
    O(1, [
      V('Hva er en matematisk modell?', ['En forenkling av virkeligheten du kan regne på', 'En perfekt kopi av virkeligheten', 'En tegning', 'Et regneark'], 0, 'Tenk på et kart.', 'En modell er en forenkling.', true),
      V('Hvilken funksjonstype passer best til «pris per km pluss startpris»?', ['Lineær', 'Eksponentiell', 'Brøk', 'Andregrad'], 0, 'Konstant endring.', 'Lineær: y = ax + b.', true)
    ])
  ]));
  U1.push(S('Modelleringsprosessen', '🔄', [
    P('Modellering er en <strong>sirkel</strong> du kan gå rundt flere ganger: du <strong>forenkler</strong> en situasjon, lager en <strong>modell</strong>, <strong>regner</strong>, <strong>tolker</strong> svaret og <strong>vurderer</strong> om det stemmer. Hvis ikke, forbedrer du modellen.'),
    K([{ ikon: '🌍', tittel: '1. Situasjonen', tekst: 'Hva vil du finne ut? Hva vet du?' }, { ikon: '✂️', tittel: '2. Forenkle', tekst: 'Hva er viktigst? Hva kan du se bort fra? Hva antar du?' }, { ikon: '📐', tittel: '3. Modell', tekst: 'Velg funksjonstype. Finn tallene (a, b).' }, { ikon: '🧮', tittel: '4. Regn', tekst: 'Bruk modellen: tabell, graf, formel.' }, { ikon: '💬', tittel: '5. Tolk', tekst: 'Hva betyr svaret i virkeligheten?' }, { ikon: '⚖️', tittel: '6. Vurder', tekst: 'Stemmer det? Hva er modellens begrensninger?' }]),
    C('tips', 'Gå gjerne en runde til', 'Passer ikke modellen? Endre antakelsene eller velg en annen funksjonstype, og prøv igjen.'),
    O(2, [
      V('Hva gjør du etter at du har regnet ut svaret med modellen?', ['Tolker og vurderer svaret', 'Er ferdig', 'Sletter modellen', 'Bytter oppgave'], 0, 'Er svaret rimelig?', 'Du tolker svaret i situasjonen og vurderer om det er rimelig.', true),
      V('Hva menes med «antakelse»?', ['Noe du bestemmer deg for å regne med', 'Et feil svar', 'Et målt tall', 'En formel'], 0, 'Du må forenkle.', 'En antakelse er noe du velger å regne med, for eksempel at farten er konstant.', true)
    ])
  ]));
  U1.push(S('Lineær modell fra to målinger', '📏', [
    P('Hvis du har to målinger og tror at endringen er <strong>konstant</strong>, kan du lage en <strong>lineær modell</strong>: finn stigningstallet a, så startverdien b.'),
    E('Et lys brenner. Etter 1 time er det 18 cm langt, etter 3 timer 12 cm. Lag modell og finn lengden etter 5 timer.', ['a = (12 − 18) ÷ (3 − 1) = −6 ÷ 2 = −3. Lyset minker 3 cm per time.', 'Sett inn (1, 18): 18 = −3 · 1 + b, så b = 21. Modell: L = −3t + 21.', 'Etter 5 timer: L = −3 · 5 + 21 = 6 cm.']),
    W('graf', { params: {}, funksjoner: [{ f: '-3*x+21', navn: 'L = −3t + 21', farge: ORANGE }], xmin: 0, xmax: 8, ymin: 0, ymax: 24, tabell: true, tabellx: [0, 1, 3, 5, 7], punkt: [1, 18], tittel: 'Lysets lengde (cm) over tid (t)' }),
    O(3, [
      T('Lyset: 18 cm etter 1 time og 12 cm etter 3 timer. Stigningstall?', -3, '(12 − 18) ÷ 2.', '−3.'),
      T('Modellen er L = −3t + 21. Hva er L etter 5 timer?', 6, '−15 + 21.', '6 cm.', 'cm'),
      T('Når er lyset brent ned (L = 0)? −3t + 21 = 0.', 7, '3t = 21.', 't = 7 timer.', 't'),
      T('Et basseng har 500 liter etter 1 time og 400 liter etter 3 timer. Hvor mye minker det per time?', 50, '(400 − 500) ÷ 2.', '−50, altså 50 liter per time.', 'liter'),
      T('Samme basseng: V = −50t + 550. Hva er V etter 5 timer?', 300, '−250 + 550.', '300 liter.', 'liter')
    ])
  ]));
  U1.push(S('Eksponentiell modell', '📈', [
    P('Hvis noe øker med <strong>samme prosent</strong> hver gang, passer en <strong>eksponentiell modell</strong>: y = a · bˣ. Vi finner b ved å dele to påfølgende verdier.'),
    E('Bakterier: 100 ved start, 200 etter 1 time, 400 etter 2 timer. Lag modell, og finn antall etter 5 timer.', ['Hver time dobles det: b = 200 ÷ 100 = 2. Startverdi a = 100.', 'Modell: y = 100 · 2ˣ.', 'Etter 5 timer: 100 · 2⁵ = 100 · 32 = 3200 bakterier.']),
    W('graf', { params: { a: { min: 1, max: 200, v: 100, steg: 10, navn: 'a (start)' }, b: { min: 0.5, max: 2, v: 2, steg: 0.1, navn: 'b (vekstfaktor)' } }, funksjoner: [{ f: 'a*b^x', pen: 'eks', navn: 'y', farge: PLUM }], xmin: 0, xmax: 10, ymin: 0, ymax: 1000, tabell: true, tittel: 'Eksponentiell modell' }),
    O(4, [
      T('100, 200, 400. Hva er vekstfaktoren?', 2, '200 ÷ 100.', '200 ÷ 100 = 2 og 400 ÷ 200 = 2. Vekstfaktoren er 2.'),
      T('Modell y = 100 · 2ˣ. Hva er y etter 5 timer?', 3200, '100 · 32.', '3200.'),
      T('En befolkning er 20 000 og øker 3 % per år. Hva er vekstfaktoren?', 1.03, '1 + 0,03.', '1,03.'),
      T('En befolkning på 1000 øker 10 % per år. Hvor mange etter 2 år?', 1210, '1000 · 1,21.', '1210.'),
      V('Du har målt 80, 40, 20 over tre like perioder. Hvilken modell passer?', ['Eksponentiell med vekstfaktor 0,5', 'Lineær', 'Andregrad', 'Brøk'], 0, 'Forholdet er det samme.', 'Hver gang halveres verdien: vekstfaktor 0,5.', true)
    ])
  ]));
  U1.push(S('Velge riktig modell', '🎛️', [
    P('Før du regner, må du velge funksjonstype. <strong>Se på tallene</strong> og <strong>tenk på situasjonen</strong>:'),
    TAB(['Du ser', 'Prøv modell'], [['Like store forskjeller hver gang', 'Lineær (y = ax + b)'], ['Samme faktor hver gang (×2, ×1,05)', 'Eksponentiell (y = a · bˣ)'], ['Farten øker, fall og kast', 'Andregrad (y = ax² + bx + c)'], ['Når den ene dobles, halveres den andre', 'Brøk (y = k/x)']]),
    O(3, [
      V('Pris per kg er fast. Hva er modellen for totalpris?', ['Lineær', 'Eksponentiell', 'Brøk', 'Andregrad'], 0, 'Like mye mer per kilo.', 'Lineær.', true),
      V('En virus sprer seg slik at antall smittede dobles hver uke. Hvilken modell?', ['Eksponentiell', 'Lineær', 'Brøk', 'Andregrad'], 0, 'Dobling = ×2.', 'Eksponentiell.', true),
      V('Å kjøre 120 km. Tid avhenger av fart. Hvilken modell?', ['Brøk (t = 120/v)', 'Lineær', 'Eksponentiell', 'Andregrad'], 0, 'Dobler farten, halv tid.', 'Brøk.', true),
      V('Du slipper en ball. Høyden over tid? (ball i fritt fall)', ['Andregrad', 'Lineær', 'Eksponentiell', 'Brøk'], 0, 'Farten øker hele tiden.', 'Andregrad.', true)
    ])
  ]));
  U1.push(S('Tilpasse en modell med digitale verktøy', '💻', [
    P('Har du mange målepunkter, kan regneark eller GeoGebra finne den kurven som passer best. Dette kalles <strong>regresjon</strong>. I regneark: marker dataene, lag et punktdiagram, høyreklikk på punktene og velg «Legg til trendlinje». Velg lineær, eksponentiell eller polynom (grad 2).'),
    C('tips', 'Se også', 'Under «Verktøy» øverst finner du kurs i regneark og GeoGebra, fra bunnen.'),
    E('Tabell: x = 1, 2, 3, 4 og y = 3, 5, 7, 9. Hva er modellen, og hva gir x = 10?', ['Differanse: 5 − 3 = 2, 7 − 5 = 2. Konstant, så lineær med a = 2.', 'b: 3 = 2 · 1 + b, så b = 1. Modell: y = 2x + 1.', 'x = 10: y = 2 · 10 + 1 = 21.']),
    O(4, [
      T('Tabell: y = 3, 5, 7, 9 for x = 1, 2, 3, 4. Hva er stigningstallet?', 2, '5 − 3.', 'y øker med 2 for hver ene x (5 − 3 = 2). Stigningstallet er 2.'),
      T('Modellen y = 2x + 1. Hva er y for x = 10?', 21, '20 + 1.', '21.'),
      V('Du legger inn punktene (1, 3), (2, 6), (3, 12), (4, 24). Hvilken trendlinje passer best?', ['Eksponentiell', 'Lineær', 'Brøk', 'Ingen'], 0, '×2 hver gang.', 'Eksponentiell: y = 1,5 · 2ˣ.', true)
    ])
  ]));
  U1.push(S('Hvor gyldig er modellen?', '⚖️', [
    P('Alle modeller har <strong>begrensninger</strong>. En modell gjelder bare i et visst område. <strong>Interpolering</strong> (mellom målingene) er som regel trygt. <strong>Ekstrapolering</strong> (utenfor målingene) kan gi tull.'),
    E('Du er 1,50 m høy 10 år gammel og 1,70 m 14 år gammel. Lineær modell: h = 5x + 100 cm (x = alder i år). Hva sier modellen om en 40-åring?', ['h = 5 · 40 + 100 = 300 cm.', '3 meter er ikke realistisk!', 'Modellen gjelder bare for barn og ungdom. Mennesker slutter å vokse, så modellen er ikke gyldig utenfor 10–16 år.']),
    C('advarsel', 'Spør alltid', ['Gir svaret mening i virkeligheten?', 'Hvilke antakelser har jeg gjort?', 'For hvilke verdier gjelder modellen?', 'Hvordan kan jeg forbedre den?']),
    O(5, [
      T('Modell h = 5x + 100 (cm) for x = alder. Hva gir 12 år?', 160, '5 · 12 + 100.', '160 cm.', 'cm'),
      T('Hva gir modellen for 40 år?', 300, '5 · 40 + 100.', '300 cm. Det er urealistisk.', 'cm'),
      V('Hva kalles det å bruke en modell utenfor området dataene dekker?', ['Ekstrapolering', 'Interpolering', 'Regresjon', 'Forenkling'], 0, 'Utenfor = ekstra.', 'Ekstrapolering.', true),
      F('En bakteriemodell sier y = 100 · 2ˣ. Etter 40 timer sier den 100 · 2⁴⁰ ≈ 10¹⁴ bakterier. Hvorfor er ikke dette realistisk?', ['Bakterier får til slutt ikke nok mat og plass.', 'Veksten blir derfor ikke eksponentiell for alltid.', 'Modellen gjelder bare i begynnelsen.'])
    ])
  ]));
  U1.push(S('Eksempel: Hvor lang tid tar det å fylle badekaret?', '🛁', [
    P('<strong>Situasjon:</strong> Et badekar rommer 200 liter. Kranen fyller 12 liter per minutt. Det er 20 liter i karet nå.'),
    E('Lag en modell. Hvor lang tid tar det før karet er fullt?', ['Antakelser: Jevn vannstrøm, ingen avløp.', 'Modell: V = 12t + 20 (V i liter, t i minutter).', 'Fullt: 12t + 20 = 200, så 12t = 180 og t = 15 minutter.']),
    E('Vurder modellen.', ['Hva om kranen ikke er helt jevn? Tiden blir litt annerledes.', 'Hva om noen drar ut proppen? Da stemmer ikke modellen.', 'Modellen er god nok for en grov beregning.']),
    O(4, [
      T('V = 12t + 20. Hva er V etter 5 minutter?', 80, '60 + 20.', '80 liter.', 'liter'),
      T('Hvor mange minutter til karet er fullt (200 liter)?', 15, '180 ÷ 12.', '15 minutter.', 'min'),
      T('Hvis kranen fyller 15 liter per minutt, hvor mange minutter tar det? (200 − 20 = 180)', 12, '180 ÷ 15.', '12 minutter.', 'min'),
      V('Hvilken antakelse er viktigst for modellen?', ['Vannstrømmen er jevn', 'Karet er rødt', 'Det er sommer', 'Det er ingen antakelser'], 0, 'Modellen er lineær.', 'Vi antok jevn vannstrøm.', true)
    ])
  ]));
  U1.push(S('Mal for en modelleringsoppgave', '📝', [
    P('Når du skal presentere en modell, kan du følge denne malen. Den virker for alle temaer.'),
    TAB(['Del', 'Spørsmål'], [['Situasjon', 'Hva undersøker du, og hvorfor?'], ['Antakelser', 'Hva forenkler du? Hva regner du med?'], ['Modell', 'Hvilken funksjonstype, og hvordan fant du tallene?'], ['Beregning', 'Tabell, graf og utregninger.'], ['Tolkning', 'Hva betyr svaret i situasjonen?'], ['Vurdering', 'Hvor godt passer modellen? For hvilke verdier? Hva kan forbedres?']]),
    C('mestring', 'Det som løfter svaret', ['Du forklarer hvorfor du valgte akkurat denne modellen.', 'Du bruker både tabell, graf og formel.', 'Du vurderer gyldigheten og foreslår forbedringer.', 'Du sammenlikner to ulike modeller.'])
  ]));
  U1.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('Lag en lineær modell for dette: En bil har 40 liter bensin ved start og bruker 6 liter per 100 km. Hvor langt kommer den før tanken er tom?', ['Modell: V = 40 − 0,06x (x i km).', 'Tom: 40 − 0,06x = 0, så x = 40 ÷ 0,06 ≈ 667 km.', 'Antakelse: konstant forbruk. I virkeligheten varierer det med fart og kjøremåte.']),
      F('En klassekamerat sier at modellen y = 5x + 100 for høyde gjelder hele livet. Argumenter for hvorfor det ikke stemmer.', ['Modellen gir 300 cm for en 40-åring.', 'Mennesker slutter å vokse omkring 18–20 år.', 'Modellen gjelder bare i barne- og ungdomsårene.']),
      F('Velg en situasjon du selv er interessert i (sport, spill, dyr, økonomi). Beskriv hvilken funksjonstype som passer, og hvorfor.', ['Eksempel: Antall følgere som dobles hver måned: eksponentiell, fordi det ganges med samme faktor.', 'Eksempel: Pris per spill pluss fast abonnement: lineær.', 'Begrens modellen: ingen vekst varer evig.'])
    ]),
    SJ('Dette kan du nå', ['Forklare hva en modell er', 'Gå gjennom modelleringsprosessen', 'Lage lineære og eksponentielle modeller', 'Velge funksjonstype', 'Vurdere gyldighet og begrensninger'])
  ]));
  M.register('utforsk', '10/modellering', {
    tittel: 'Modellering',
    ingress: 'Du lager matematiske modeller av virkelige situasjoner, bruker dem til å forutsi, og vurderer hvor gode de er.',
    mal: ['modellere situasjoner, presentere resultatene og vurdere hvor gyldige modellene er'], ordliste: ORD1, seksjoner: U1
  });
  const T1 = [];
  T1.push(S('Steg 1: Hva er en modell?', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('En <strong>modell</strong> er en forenkling av virkeligheten. Vi bruker en formel for å regne på den.', true),
    E('Taxi: 50 kr + 15 kr per km. Modellen er y = 15x + 50. Hva koster 4 km?', ['x = 4: 15 · 4 + 50.', '60 + 50 = 110.', 'Svar: 110 kr. 🎉']),
    OS([
      T('Modell y = 15x + 50. Hva koster 2 km?', 80, '15 · 2 + 50.', '80 kr.', 'kr'),
      T('Modell y = 15x + 50. Hva koster 0 km? (startprisen)', 50, '15 · 0 + 50.', '50 kr.', 'kr'),
      T('Modell y = 15x + 50. Hva koster 10 km?', 200, '150 + 50.', '200 kr.', 'kr')
    ])
  ]));
  T1.push(S('Steg 2: Lage en modell', '2', [
    G('Vi lager en modell fra to tall.'),
    P('Sparegris: 100 kr i dag. Du legger i 20 kr hver uke. Modell: <strong>y = 20x + 100</strong>.', true),
    E('Hvor mye er i sparegrisen etter 6 uker?', ['x = 6.', '20 · 6 + 100 = 120 + 100.', 'Svar: 220 kr. 🎉']),
    OS([
      T('Sparegris: y = 20x + 100. Etter 5 uker?', 200, '100 + 100.', '200 kr.', 'kr'),
      T('Etter 10 uker?', 300, '200 + 100.', '300 kr.', 'kr'),
      T('Når har du 400 kr? 20x + 100 = 400, så 20x = 300. x = ?', 15, '300 ÷ 20.', '15 uker.', 'uker')
    ])
  ]));
  T1.push(S('Steg 3: Passer modellen?', '3', [
    G('En modell er ikke alltid sann. Vi må vurdere den.'),
    P('Sparegris-modellen sier at du har 20 · 100 + 100 = 2100 kr etter 100 uker. Men hva om du slutter å spare?', true),
    OS([
      V('Gir modellen alltid riktig svar?', ['Nei, den er en forenkling', 'Ja, alltid'], 0, 'Folk er uforutsigbare.', 'Nei, en modell er en forenkling.', true),
      V('Hva bør du gjøre med et svar fra en modell?', ['Vurdere om det er rimelig', 'Stole blindt på det'], 0, 'Tenk selv.', 'Vurdere om svaret er rimelig.', true)
    ]),
    SJ('Dette kan du nå', ['Bruke en modell til å regne', 'Lage en enkel modell', 'Vurdere om en modell er rimelig'])
  ]));
  M.register('steg', '10/modellering', {
    tittel: 'Modellering',
    ingress: 'Små steg: du bruker en formel til å forutsi, lager en enkel modell og vurderer om den er rimelig.',
    mal: ['bruke og vurdere en enkel modell'], ordliste: ORD1, seksjoner: T1
  });
  M.ekstra['10/modellering'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('lin', '📏', 'Lineær modell: bruk den', 8, 'Bruk modellen til å regne ut svaret.', function (r) {
      const a = r.int(2, 12), b = r.int(10, 100), x = r.int(2, 15); return H.e('Modell: y = ' + a + 'x + ' + b + '. Hva er y når x = ' + x + '?', a * x + b, a + ' · ' + x + ' + ' + b + ' = ' + (a * x + b));
    }));
    sek.push(H.ek('tid', '⏱️', 'Når når vi målet?', 8, 'Løs for x.', function (r) {
      const a = r.int(2, 10), b = r.int(5, 50), x = r.int(3, 20); const y = a * x + b; return H.e('Modell y = ' + a + 'x + ' + b + '. For hvilken x er y = ' + y + '?', x, a + 'x + ' + b + ' = ' + y + ', så ' + a + 'x = ' + (y - b) + ' og x = ' + x);
    }));
    sek.push(H.ek('eks', '📈', 'Eksponentiell modell', 6, 'Regn ut verdien.', function (r) {
      const a = r.pick([10, 20, 50, 100]), b = r.pick(lett ? [2] : [2, 3]), x = r.int(2, 5); return H.e('Modell: y = ' + a + ' · ' + b + 'ˣ. Hva er y når x = ' + x + '?', a * Math.pow(b, x), a + ' · ' + b + '^' + x + ' = ' + a + ' · ' + Math.pow(b, x) + ' = ' + a * Math.pow(b, x));
    }));
    sek.push(H.ek('to', '📍', 'Fra to målinger', 6, 'Finn stigningstallet.', function (r) {
      const a = r.int(-5, 8) || 3, x1 = r.int(0, 3), dx = r.int(1, 4), y1 = r.int(10, 40); return H.e('Målt ' + y1 + ' ved x = ' + x1 + ' og ' + (y1 + a * dx) + ' ved x = ' + (x1 + dx) + '.', a, '(' + (y1 + a * dx) + ' − ' + y1 + ') ÷ ' + dx + ' = ' + M.fmt(a));
    }));
    return H.ekDef('Modellering', sek);
  };

  /* ================= PROGRAMMERING OG PYTHON ================= */
  const ORD2 = [
    ord(['kode', 'programkode'], 'Teksten du skriver for å få datamaskinen til å gjøre noe.'),
    ord(['variabel', 'variabler'], 'Et navn som husker en verdi: x = 5.'),
    ord(['løkke', 'løkker'], 'Kode som gjentas. for-løkke gjentar et bestemt antall ganger.'),
    ord(['betingelse', 'betingelser'], 'Et ja/nei-spørsmål i koden, brukt i if.'),
    ord(['funksjon'], 'En navngitt kodebit du kan bruke mange ganger, definert med def.'),
    ord(['parameter'], 'Verdien du sender inn i en funksjon, for eksempel x i f(x).'),
    ord(['return'], 'Gir en verdi tilbake fra en funksjon.'),
    ord(['range'], 'Lager en rekke tall: range(5) gir 0, 1, 2, 3, 4.'),
    ord(['innrykk'], 'Mellomrom foran en linje som viser at den hører til en løkke, if eller funksjon.'),
    ord(['feilsøking', 'debugging'], 'Å finne og rette feil i koden.'),
    ord(['modulus', 'rest'], 'Resten etter divisjon: 7 % 3 = 1. Brukes til å teste partall (x % 2 == 0).'),
    ord(['algoritme'], 'En oppskrift i steg som kan gjøres av en datamaskin.')
  ];
  const U2 = [];
  U2.push(S('Lese kode: hva skjer?', '📖', [
    P('Det første steget i programmering er å <strong>lese</strong> kode. Gå linje for linje, og skriv ned hva hver variabel er etter hver linje. Det kalles å <strong>spore</strong> koden.'),
    E('Les koden og finn hva som skrives ut.\n<code>x = 3\ny = x * 2\nx = 10\nprint(y)</code>', ['x = 3.', 'y = x · 2 = 6. (Dette regnes ut nå, med x = 3.)', 'x blir 10, men y er fortsatt 6. print(y) skriver ut 6.']),
    W('kode', { tittel: 'Prøv selv: spor og kjør', kode: 'x = 3\ny = x * 2\nx = 10\nprint(y)', forvent: '6', intro: 'Gjett først hva som skrives ut. Kjør deretter og se.' }),
    O(1, [
      TK('x = 4\nx = x + 3\nprint(x)', 7, 'Hva er x etter hver linje?', 'x = 4, så x = 4 + 3 = 7.'),
      TK('a = 6\nb = a * 2\nprint(b)', 12, '6 · 2.', 'b = 12.'),
      TK('print(2 + 3 * 4)', 14, 'Gange før pluss.', '3 · 4 = 12, og 2 + 12 = 14.'),
      TK('print(10 / 4)', 2.5, 'Vanlig divisjon.', '10 ÷ 4 = 2,5.'),
      TK('print(7 % 3)', 1, '% gir resten.', '7 = 2 · 3 + 1, resten er 1.')
    ])
  ]));
  U2.push(S('Variabler og regning', '🔢', [
    P('En <strong>variabel</strong> er en boks med et navn. <code>x = 5</code> legger 5 i boksen x. Du kan regne med variabler som i algebra. <code>**</code> betyr potens, <code>//</code> betyr heltallsdivisjon, og <code>%</code> gir resten.'),
    TAB(['Kode', 'Betyr', 'Resultat'], [['3 + 4', 'pluss', '7'], ['3 * 4', 'gange', '12'], ['7 / 2', 'divisjon', '3.5'], ['7 // 2', 'heltallsdivisjon', '3'], ['7 % 2', 'rest', '1'], ['2 ** 3', 'potens', '8']]),
    W('kode', { tittel: 'Areal og omkrets', kode: 'lengde = 8\nbredde = 5\nareal = lengde * bredde\nomkrets = 2 * lengde + 2 * bredde\nprint("Areal:", areal)\nprint("Omkrets:", omkrets)', forvent: 'Areal: 40\nOmkrets: 26', intro: 'Endre lengde og bredde. Hva skjer?' }),
    O(2, [
      TK('print(2 ** 5)', 32, '2 gange seg selv 5 ganger.', '2 · 2 · 2 · 2 · 2 = 32.'),
      TK('print(17 // 5)', 3, 'Hvor mange ganger går 5 opp i 17?', '3 ganger (15), rest 2.'),
      TK('print(17 % 5)', 2, 'Resten.', '17 − 15 = 2.'),
      TK('x = 5\nprint(x ** 2 + 1)', 26, '5 i andre er 25.', '25 + 1 = 26.'),
      TK('pris = 200\nrabatt = 0.2\nprint(pris * (1 - rabatt))', 160, '200 · 0,8.', '160. (Python skriver 160.0.)')
    ])
  ]));
  U2.push(S('Løkker: la datamaskinen gjenta', '🔁', [
    P('En <strong>for-løkke</strong> gjentar kode. <code>for i in range(5):</code> kjører 5 ganger, med i = 0, 1, 2, 3, 4. <code>range(1, 6)</code> gir 1, 2, 3, 4, 5. Linjene som skal gjentas, må ha <strong>innrykk</strong> (4 mellomrom).'),
    W('kode', { tittel: '7-gangen', kode: 'for i in range(1, 11):\n    print(7 * i)', forvent: '7\n14\n21\n28\n35\n42\n49\n56\n63\n70', intro: 'Endre 7 til et annet tall for å se en annen gangetabell.' }),
    W('kode', { tittel: 'Summen av 1 til 100', kode: 'sum = 0\nfor tall in range(1, 101):\n    sum = sum + tall\nprint(sum)', forvent: '5050', intro: 'Gauss regnet dette i hodet som barn. Datamaskinen gjør det på et øyeblikk.' }),
    O(3, [
      TK('sum = 0\nfor i in range(1, 5):\n    sum = sum + i\nprint(sum)', 10, '1 + 2 + 3 + 4.', '1 + 2 + 3 + 4 = 10.'),
      TK('for i in range(3):\n    print(i)', 0, 'range(3) gir 0, 1, 2. Hva skrives ut først?', '0, 1, 2. Første linje er 0.', 'Hva skrives ut på første linje?'),
      TK('n = 0\nfor i in range(10):\n    n = n + 2\nprint(n)', 20, '10 ganger + 2.', '10 · 2 = 20.'),
      TK('prod = 1\nfor i in range(1, 6):\n    prod = prod * i\nprint(prod)', 120, '1 · 2 · 3 · 4 · 5.', '5! = 120.'),
      TK('antall = 0\nfor i in range(1, 21):\n    antall = antall + 1\nprint(antall)', 20, '1 til 20.', '20 tall.')
    ])
  ]));
  U2.push(S('Betingelser: if og else', '🔀', [
    P('<code>if</code> lar koden velge. <code>if x &gt; 5:</code> kjører den innrykkede koden bare hvis x er større enn 5. <code>else</code> er «ellers». Sammenlikning: <code>==</code> (lik), <code>!=</code> (ikke lik), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Husk: ett <code>=</code> gir en verdi, to <code>==</code> sammenlikner.'),
    W('kode', { tittel: 'Partall eller oddetall?', kode: 'tall = 17\nif tall % 2 == 0:\n    print("Partall")\nelse:\n    print("Oddetall")', forvent: 'Oddetall', intro: 'Endre tall til 18 og kjør igjen.' }),
    O(3, [
      VK('x = 8\nif x > 5:\n    print("Stor")\nelse:\n    print("Liten")', ['Stor', 'Liten', 'Begge', 'Ingenting'], 0, 'Er 8 større enn 5?', '8 > 5 er sant, så «Stor» skrives ut.'),
      VK('x = 4\nif x % 2 == 0:\n    print("Partall")\nelse:\n    print("Oddetall")', ['Partall', 'Oddetall', 'Begge', 'Feil'], 0, '4 % 2 er resten av 4 ÷ 2.', '4 % 2 = 0, så partall.'),
      TK('antall = 0\nfor i in range(1, 11):\n    if i % 2 == 0:\n        antall = antall + 1\nprint(antall)', 5, 'Hvor mange partall fra 1 til 10?', '2, 4, 6, 8, 10: 5 partall.'),
      TK('s = 0\nfor i in range(1, 11):\n    if i % 3 == 0:\n        s = s + i\nprint(s)', 18, 'Tall delelige med 3: 3, 6, 9.', '3 + 6 + 9 = 18.')
    ])
  ]));
  U2.push(S('Funksjoner: gjenbruk', '⚙️', [
    P('En <strong>funksjon</strong> er en navngitt kodebit. Du <strong>definerer</strong> den med <code>def</code>, og <strong>kaller</strong> den når du trenger den. Den kan ta inn <strong>parametere</strong> og gi tilbake et svar med <code>return</code>. Det er akkurat som f(x) i matte!'),
    W('kode', { tittel: 'f(x) = 2x + 1 i Python', kode: 'def f(x):\n    return 2 * x + 1\n\nprint(f(3))\nprint(f(10))', forvent: '7\n21', intro: 'Skriv egen funksjon med formelen din, og test noen verdier.' }),
    C('tips', 'Matte og kode', 'I matte skriver du f(x) = 2x + 1. I Python skriver du def f(x): return 2 * x + 1. Samme idé, ulik skrivemåte.'),
    O(4, [
      TK('def f(x):\n    return 3 * x - 2\nprint(f(4))', 10, 'Sett inn 4.', '3 · 4 − 2 = 10.'),
      TK('def kvadrat(x):\n    return x * x\nprint(kvadrat(7))', 49, '7 · 7.', '49.'),
      TK('def f(x):\n    return x ** 2 - 4\nprint(f(3))', 5, '9 − 4.', 'f(3) = 3² − 4 = 9 − 4 = 5. (** betyr «opphøyd i».)'),
      TK('def areal(l, b):\n    return l * b\nprint(areal(6, 7))', 42, '6 · 7.', '42.'),
      TK('def f(x):\n    return 2 * x + 1\nprint(f(f(1)))', 7, 'f(1) = 3 først. Så f(3).', 'f(1) = 3 og f(3) = 7.')
    ])
  ]));
  U2.push(S('Utforske matte med kode: mønstre', '🧩', [
    P('Programmering lar deg <strong>utforske</strong>. Du kan teste en regel for tusen tall på et sekund. Det er ikke et bevis, men det kan gi deg gode gjetninger.'),
    W('kode', { tittel: 'Kvadrattall og differanser', kode: 'forrige = 0\nfor n in range(1, 8):\n    kv = n * n\n    print(n, kv, kv - forrige)\n    forrige = kv', forvent: '1 1 1\n2 4 3\n3 9 5\n4 16 7\n5 25 9\n6 36 11\n7 49 13', intro: 'Se på siste kolonne. Hvilket mønster ser du? (Oddetall! Tenk på (n + 1)² − n² = 2n + 1.)' }),
    W('kode', { tittel: 'Finn primtall', kode: 'for tall in range(2, 31):\n    er_primtall = True\n    for d in range(2, tall):\n        if tall % d == 0:\n            er_primtall = False\n    if er_primtall:\n        print(tall)', forvent: '2\n3\n5\n7\n11\n13\n17\n19\n23\n29', intro: 'Et primtall kan bare deles på 1 og seg selv. Koden tester alle mulige delere.' }),
    O(4, [
      TK('antall = 0\nfor tall in range(2, 31):\n    er_primtall = True\n    for d in range(2, tall):\n        if tall % d == 0:\n            er_primtall = False\n    if er_primtall:\n        antall = antall + 1\nprint(antall)', 10, 'Se på listen over.', 'Det er 10 primtall mellom 2 og 30.', 'Hvor mange primtall er det mellom 2 og 30?'),
      TK('a = 0\nb = 1\nfor i in range(8):\n    c = a + b\n    a = b\n    b = c\nprint(a)', 21, 'Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21 …', 'Etter 8 steg er a = 21.', 'Hva skrives ut? (Fibonacci-tallene)'),
      TK('n = 27\nsteg = 0\nwhile n != 1 and steg < 3:\n    if n % 2 == 0:\n        n = n // 2\n    else:\n        n = 3 * n + 1\n    steg = steg + 1\nprint(n)', 124, '27 → 82 → 41 → 124.', 'Collatz: 27 er oddetall, 3·27+1 = 82. Partall: 41. Oddetall: 3·41+1 = 124.', 'Hva skrives ut? (Collatz-mønster, 3 steg)')
    ])
  ]));
  U2.push(S('Test kvadratsetningene med kode', '🟪', [
    P('Du kan sjekke om (a + b)² = a² + 2ab + b² stemmer, for mange tall på én gang. Datamaskinen tester alle kombinasjonene.'),
    W('kode', { tittel: 'Test første kvadratsetning', kode: 'alle_ok = True\nfor a in range(1, 21):\n    for b in range(1, 21):\n        venstre = (a + b) ** 2\n        hoyre = a ** 2 + 2 * a * b + b ** 2\n        if venstre != hoyre:\n            alle_ok = False\nprint("Stemmer alltid:", alle_ok)', forvent: 'Stemmer alltid: True', intro: '400 kombinasjoner testes. Prøv å endre høyre side til a ** 2 + b ** 2 og se hva som skjer.' }),
    C('mestring', 'Test er ikke bevis', 'At det stemmer for 400 tall betyr ikke at det stemmer for alle. Det trengs algebra for et bevis (se Kvadratsetningene). Men koden finner moteksempler raskt!'),
    O(5, [
      VK('alle_ok = True\nfor a in range(1, 6):\n    for b in range(1, 6):\n        if (a + b) ** 2 != a ** 2 + b ** 2:\n            alle_ok = False\nprint(alle_ok)', ['False', 'True', '0', 'Feil'], 0, 'Er (a + b)² = a² + b²?', 'Nei: for a = 1 og b = 1 er (1 + 1)² = 4, men 1 + 1 = 2. Resultatet er False.', 'Hva skrives ut? (testen av en FEIL regel)')
    ])
  ]));
  U2.push(S('Feilsøking', '🐞', [
    P('Alle som programmerer, gjør feil. Å <strong>finne og rette</strong> dem er en viktig ferdighet. Les feilmeldingen: den sier ofte hvilken linje det gjelder. De vanligste feilene: glemt innrykk, glemt kolon, skrevet = i stedet for ==, og skrivefeil i navn.'),
    W('kode', { tittel: 'Finn feilen', kode: 'def dobbel(x):\n    return x * 2\nprint(dobbel(5)', losningKode: 'def dobbel(x):\n    return x * 2\nprint(dobbel(5))', forvent: '10', tillatFeil: true, intro: 'Kjør koden. Hva sier feilmeldingen? Rett feilen.', hint: 'En parentes mangler på siste linje.' }),
    W('kode', { tittel: 'Finn logikkfeilen', kode: 'sum = 0\nfor i in range(1, 10):\n    sum = sum + i\nprint(sum)', losningKode: 'sum = 0\nfor i in range(1, 11):\n    sum = sum + i\nprint(sum)', sjekk: (u) => u.trim() === '55', tillatFeil: true, intro: 'Koden skal summere 1 til 10 (= 55), men skriver et annet tall. Rett feilen!', hint: 'range(1, 10) stopper før 10. Hva må det stå i stedet?', ros: 'Riktig! range stopper alltid <em>før</em> det siste tallet.' }),
    O(4, [
      V('Hva kalles det når koden kjører, men gir feil svar?', ['Logikkfeil', 'Syntaksfeil', 'Navnefeil', 'Ingen feil'], 0, 'Datamaskinen klager ikke.', 'En logikkfeil: koden følger reglene, men gjør ikke det du ville.', true),
      V('Hva er det vanligste problemet hvis Python sier IndentationError?', ['Manglende eller feil innrykk', 'Manglende parentes', 'Feil tall', 'Feil navn'], 0, 'Innrykk.', 'Innrykket (mellomrommene) er feil.', true),
      V('Hvilken linje er riktig?', ['if x == 5:', 'if x = 5:', 'if x == 5', 'if (x = 5)'], 0, 'Du trenger == og kolon.', 'if x == 5: er riktig.', true)
    ])
  ]));
  U2.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('Forklar med egne ord hva koden gjør:<br><code>s = 0<br>for i in range(1, 6):<br>&nbsp;&nbsp;&nbsp;&nbsp;s = s + i * i<br>print(s)</code>', ['s starter som 0.', 'For i fra 1 til 5 legger koden til i · i (kvadratet) i s.', 'Summen er 1 + 4 + 9 + 16 + 25 = 55.']),
      F('Skriv en Python-funksjon som tar inn et tall og gir tilbake kvadratet pluss 1. Test den med 3.', ['def f(x):', '    return x * x + 1', 'f(3) gir 10.']),
      F('Hva er forskjellen mellom en for-løkke og en funksjon? Når bruker du hver av dem?', ['En for-løkke gjentar kode et antall ganger.', 'En funksjon er en navngitt kodebit du kan kalle mange ganger, med ulike verdier.', 'De kan kombineres: kall funksjonen inne i en løkke for å teste mange tall.'])
    ]),
    SJ('Dette kan du nå', ['Lese og spore kode', 'Bruke variabler, løkker og betingelser', 'Skrive og bruke funksjoner', 'Utforske mønstre med kode', 'Finne og rette feil'])
  ]));
  M.register('utforsk', '10/python', {
    tittel: 'Programmering og Python',
    ingress: 'Du leser og forklarer Python-kode, og bruker den til å utforske matematikk: mønstre, tall og kvadratsetningene.',
    mal: ['utforske matematiske egenskaper og sammenhenger ved å bruke programmering', 'lese og forklare tekstbasert programkode i Python'], ordliste: ORD2, seksjoner: U2
  });
  const T2 = [];
  T2.push(S('Steg 1: Lese kode', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Kode leses <strong>linje for linje</strong>, ovenfra og ned. <code>x = 5</code> legger tallet 5 i boksen x. <code>print(x)</code> skriver ut det som ligger i x.', true),
    W('kode', { tittel: 'Prøv selv', kode: 'x = 5\nprint(x)\nprint(x + 2)', forvent: '5\n7', intro: 'Trykk Kjør. Endre 5 til et annet tall.' }),
    OS([
      TK('x = 3\nprint(x)', 3, 'Hva ligger i x?', 'Linje 1 legger 3 i x. Linje 2 skriver ut det som ligger i x: 3.'),
      TK('x = 3\nprint(x + 4)', 7, 'Hva ligger i x? Legg til 4.', 'x er 3. print(x + 4) regner ut 3 + 4 og skriver ut 7.'),
      TK('x = 2\ny = x * 5\nprint(y)', 10, '2 · 5.', '10.')
    ])
  ]));
  T2.push(S('Steg 2: Gjenta med løkke', '2', [
    G('Vi lar datamaskinen gjenta.'),
    P('<code>for i in range(3):</code> gjentar 3 ganger. Linjene under må ha innrykk.', true),
    W('kode', { tittel: 'Løkke', kode: 'for i in range(3):\n    print("Hei")', forvent: 'Hei\nHei\nHei', intro: 'Endre 3 til 5.' }),
    E('Hvor mange ganger skrives «Hei» ut hvis du bytter 3 med 5?', ['range(5) gjentar 5 ganger.', 'Hver gang skrives «Hei».', 'Svar: 5 ganger. 🎉']),
    OS([
      TK('s = 0\nfor i in range(3):\n    s = s + 2\nprint(s)', 6, '2 + 2 + 2.', 'Løkka går 3 ganger og legger til 2 hver gang: 0 → 2 → 4 → 6.'),
      TK('s = 0\nfor i in range(1, 4):\n    s = s + i\nprint(s)', 6, '1 + 2 + 3.', 'i er 1, 2 og 3. s blir 0 + 1 + 2 + 3 = 6.')
    ])
  ]));
  T2.push(S('Steg 3: Funksjon', '3', [
    G('En funksjon er som en maskin: du putter inn et tall og får et nytt ut.'),
    W('kode', { tittel: 'Funksjon f(x) = 2x + 1', kode: 'def f(x):\n    return 2 * x + 1\n\nprint(f(3))', forvent: '7', intro: 'Endre 3 til 5. Hva skrives ut?' }),
    OS([
      TK('def f(x):\n    return x + 10\nprint(f(5))', 15, '5 + 10.', '15.'),
      TK('def f(x):\n    return 3 * x\nprint(f(4))', 12, '3 · 4.', '12.')
    ]),
    SJ('Dette kan du nå', ['Lese enkel kode', 'Bruke en løkke', 'Bruke en funksjon'])
  ]));
  M.register('steg', '10/python', {
    tittel: 'Programmering og Python',
    ingress: 'Små steg: du leser kode linje for linje, bruker løkker og skriver en funksjon.',
    mal: ['lese og forklare enkel Python-kode'], ordliste: ORD2, seksjoner: T2
  });
  M.ekstra['10/python'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('var', '🔢', 'Variabler', 8, 'Hva skrives ut?', function (r) {
      const x = r.int(2, 9), a = r.int(2, 6), b = r.int(1, 9); return H.e('x = ' + x + ' · y = x * ' + a + ' + ' + b + ' · print(y)', x * a + b, 'y = ' + x + ' · ' + a + ' + ' + b + ' = ' + (x * a + b));
    }));
    sek.push(H.ek('lop', '🔁', 'Løkke: sum', 6, 'Hva skrives ut? Koden summerer 1 til n.', function (r) {
      const n = r.int(3, lett ? 8 : 12); return H.e('s = 0 · for i in range(1, ' + (n + 1) + '): s = s + i · print(s)', n * (n + 1) / 2, '1 + 2 + … + ' + n + ' = ' + n * (n + 1) / 2);
    }));
    sek.push(H.ek('rest', '➗', 'Rest og heltall', 6, 'Hva skrives ut?', function (r) {
      const b = r.int(3, 9), q = r.int(2, 9), rest = r.int(0, b - 1); const a = b * q + rest; const del = r.int(0, 1) === 1 && !lett;
      return del ? H.e('print(' + a + ' // ' + b + ')', q, a + ' = ' + q + ' · ' + b + ' + ' + rest + ', så ' + a + ' // ' + b + ' = ' + q) : H.e('print(' + a + ' % ' + b + ')', rest, a + ' = ' + q + ' · ' + b + ' + ' + rest + ', så resten er ' + rest);
    }));
    sek.push(H.ek('fun', '⚙️', 'Funksjon', 6, 'Hva skrives ut?', function (r) {
      const a = r.int(2, 6), b = r.int(1, 9), x = r.int(1, 9); return H.e('def f(x): return ' + a + ' * x + ' + b + ' · print(f(' + x + '))', a * x + b, a + ' · ' + x + ' + ' + b + ' = ' + (a * x + b));
    }));
    return H.ekDef('Programmering og Python', sek);
  };
})();
