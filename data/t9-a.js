/* ============================================================
   9. trinn: Sammensatte måleenheter + Figurer, formlikhet og kongruens
   Læreplan 9.1 og 9.2
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, SJ, S, ord } = H;

  /* ================= SAMMENSATTE MÅLEENHETER ================= */
  const ORD1 = [
    ord(['sammensatt måleenhet', 'sammensatte måleenheter', 'sammensatt enhet'], 'En enhet laget av to enheter med «per» mellom, for eksempel km/t (kilometer per time).'),
    ord(['fart'], 'Hvor langt du kommer på en bestemt tid. Måles i for eksempel km/t eller m/s.'),
    ord(['strekning'], 'Hvor langt du har gått eller kjørt.'),
    ord(['tetthet'], 'Hvor mye masse det er i en bestemt mengde volum. For eksempel g/cm³.'),
    ord(['gjennomsnittsfart'], 'Total strekning delt på total tid.'),
    ord(['omregning'], 'Å skrive den samme størrelsen med en annen enhet.'),
    ord(['enhetspris'], 'Prisen for én enhet, for eksempel kr per kilo.')
  ];
  const U1 = [];
  U1.push(S('Hva betyr «per»?', '🚗', [
    P('Noen enheter har <strong>to deler</strong>. «<strong>km/t</strong>» leses «kilometer per time». Streken betyr «per», eller «for hver». Fart 60 km/t betyr at du kommer <strong>60 km for hver time</strong>.'),
    TAB(['Enhet', 'Leses', 'Eksempel'], [['km/t', 'kilometer per time', 'Bil: 80 km/t'], ['m/s', 'meter per sekund', 'Løper: 6 m/s'], ['kr/kg', 'kroner per kilo', 'Epler: 25 kr/kg'], ['g/cm³', 'gram per kubikkcentimeter', 'Vann: 1 g/cm³'], ['kWh', 'kilowattime', 'Strøm: 1,2 kr/kWh'], ['l/mil', 'liter per mil', 'Bil: 0,6 l/mil']]),
    C('virkelighet', 'Du bruker dette hver dag', ['Fartsgrensa på veien er en sammensatt enhet.', 'Prisen på godteri i butikken står ofte i kr/kg.', 'Strømregningen regnes i kr/kWh.']),
    O(1, [
      V('Hva betyr 50 km/t?', ['50 km for hver time', '50 timer for hver km', '50 km til sammen', '50 minutter'], 0, '«per» betyr «for hver».', '50 km/t betyr 50 kilometer for hver time.', true),
      V('Hvilken enhet passer til prisen på epler?', ['kr/kg', 'km/t', 'm/s', 'g/cm³'], 0, 'Pris og vekt.', 'Kroner per kilo.', true),
      V('Hvilken enhet måler fart?', ['m/s', 'kr/kg', 'g/cm³', 'liter'], 0, 'Fart = strekning per tid.', 'Meter per sekund er en fartsenhet.', true)
    ])
  ]));
  U1.push(S('Fart, strekning og tid', '⏱️', [
    P('Fart, strekning og tid henger sammen. Husk <strong>trekanten</strong>: strekning øverst, fart og tid nederst. Dekk til det du vil finne.'),
    TAB(['Du vil finne', 'Formel', 'Eksempel'], [['Fart', 'fart = strekning ÷ tid', '120 km ÷ 2 t = 60 km/t'], ['Strekning', 'strekning = fart · tid', '60 km/t · 2 t = 120 km'], ['Tid', 'tid = strekning ÷ fart', '120 km ÷ 60 km/t = 2 t']]),
    C('regel', 'Husk', ['Fart: <strong>s ÷ t</strong> (strekning delt på tid).', 'Strekning: <strong>v · t</strong>.', 'Tid: <strong>s ÷ v</strong>.', 'Enhetene må passe sammen: km/t med timer og km.']),
    E('En bil kjører 240 km på 3 timer. Hva er farten?', ['Fart = strekning ÷ tid.', '240 km ÷ 3 t = 80 km/t.', 'Svar: 80 km/t.']),
    O(2, [
      T('Du sykler 30 km på 2 timer. Hva er farten i km/t?', 15, 'Strekning delt på tid.', '30 ÷ 2 = 15 km/t.', 'km/t'),
      T('En bil kjører 80 km/t i 3 timer. Hvor langt kommer den?', 240, 'strekning = fart · tid.', '80 · 3 = 240 km.', 'km'),
      T('Et tog skal kjøre 300 km med fart 100 km/t. Hvor mange timer tar det?', 3, 'tid = strekning ÷ fart.', '300 ÷ 100 = 3 timer.', 't'),
      T('Du går 4 km/t i 2,5 timer. Hvor langt går du?', 10, '4 · 2,5.', '4 · 2,5 = 10 km.', 'km'),
      T('En buss kjører 150 km på 2 timer og 30 minutter. Hva er farten i km/t? (2 t 30 min = 2,5 t)', 60, 'Gjør om til timer først.', '150 ÷ 2,5 = 60 km/t.', 'km/t')
    ])
  ]));
  U1.push(S('Minutter og timer', '🕐', [
    P('Fart i km/t krever tid i <strong>timer</strong>. Hvis tiden er gitt i minutter, må du regne om. Husk at <strong>30 min = 0,5 t</strong> og <strong>15 min = 0,25 t</strong>, ikke 0,30 og 0,15.'),
    TAB(['Minutter', 'Timer'], [['60 min', '1 t'], ['30 min', '0,5 t'], ['15 min', '0,25 t'], ['45 min', '0,75 t'], ['6 min', '0,1 t']]),
    E('Du kjører 80 km/t i 45 minutter. Hvor langt kommer du?', ['45 min = 0,75 t.', 'strekning = 80 · 0,75.', '80 · 0,75 = 60. Svar: 60 km.']),
    C('advarsel', 'Vanlig feil', 'Å skrive 1 time og 30 min som 1,30 t. Riktig er 1,5 t, fordi 30 min er en halv time.'),
    O(3, [
      T('Du kjører 60 km/t i 30 minutter. Hvor langt kommer du?', 30, '30 min = 0,5 t.', '60 · 0,5 = 30 km.', 'km'),
      T('Du sykler 20 km/t i 15 minutter. Hvor langt kommer du?', 5, '15 min = 0,25 t.', '20 · 0,25 = 5 km.', 'km'),
      T('Du går 12 km i 3 timer. Hva er farten?', 4, 'Del på 3.', '12 ÷ 3 = 4 km/t.', 'km/t'),
      T('Du skal gå 6 km med fart 4 km/t. Hvor mange minutter tar det? (Regn først i timer.)', 90, '6 ÷ 4 = 1,5 t. Gang med 60.', '6 ÷ 4 = 1,5 t, og 1,5 · 60 = 90 minutter.', 'min'),
      T('Du løper 5 km på 30 minutter. Hva er farten i km/t?', 10, 'Hvor langt løper du på 60 minutter?', 'På 30 min (0,5 t) løper du 5 km, så på 1 time løper du 10 km. Eller 5 ÷ 0,5 = 10 km/t.', 'km/t')
    ])
  ]));
  U1.push(S('Gjennomsnittsfart', '🚦', [
    P('<strong>Gjennomsnittsfart</strong> = total strekning ÷ total tid. Det er <strong>ikke</strong> det samme som å ta gjennomsnittet av to farter, når tidene er ulike.'),
    E('Du kjører 60 km med 60 km/t, og så 60 km med 30 km/t. Hva er gjennomsnittsfarten?', ['Første del tar 60 ÷ 60 = 1 time.', 'Andre del tar 60 ÷ 30 = 2 timer.', 'Totalt 120 km på 3 timer: 120 ÷ 3 = 40 km/t. Ikke 45 km/t!']),
    C('tips', 'Hvorfor ikke 45?', 'Du bruker lengre tid på den sakte delen. Derfor teller den sakte farten mer.'),
    O(4, [
      T('Du kjører 100 km på 2 timer, og så 50 km på 1 time. Hva er gjennomsnittsfarten?', 50, 'Total strekning ÷ total tid.', '150 km ÷ 3 t = 50 km/t.', 'km/t'),
      T('Du kjører 90 km med 90 km/t og så 90 km med 45 km/t. Hva er gjennomsnittsfarten?', 60, '1 time + 2 timer.', '180 km ÷ 3 t = 60 km/t.', 'km/t'),
      V('Kari sykler opp bakken med 10 km/t og ned igjen med 30 km/t. Er gjennomsnittsfarten 20 km/t?', ['Nei, lavere enn 20', 'Ja, nøyaktig 20', 'Nei, høyere enn 20', 'Ikke mulig å vite'], 0, 'Hun bruker mest tid oppover.', 'Prøv 30 km hver vei: opp 3 t, ned 1 t. 60 km ÷ 4 t = 15 km/t. Lavere enn 20.')
    ])
  ]));
  U1.push(S('Pris og tetthet', '💰', [
    P('«<strong>Per</strong>» finnes også i priser og i materialer. <strong>Enhetspris</strong> (kr per kg) hjelper deg å sammenligne. <strong>Tetthet</strong> (g/cm³) sier hvor tungt et materiale er.'),
    TAB(['Stoff', 'Tetthet'], [['Vann', '1 g/cm³'], ['Is', '0,9 g/cm³'], ['Aluminium', '2,7 g/cm³'], ['Jern', '7,9 g/cm³'], ['Gull', '19,3 g/cm³']]),
    C('regel', 'Tetthet', ['tetthet = masse ÷ volum', 'masse = tetthet · volum', 'Stoffer med tetthet under 1 g/cm³ flyter på vann.']),
    E('5 kg epler koster 75 kr. Hva koster 1 kg?', ['Del prisen på antall kilo.', '75 ÷ 5 = 15.', 'Svar: 15 kr/kg.']),
    O(4, [
      T('Et stykke metall veier 200 g og har volum 50 cm³. Hva er tettheten i g/cm³?', 4, 'masse ÷ volum.', '200 ÷ 50 = 4 g/cm³.', 'g/cm³'),
      T('Aluminium har tetthet 2,7 g/cm³. Hva veier 100 cm³ aluminium?', 270, 'masse = tetthet · volum.', '2,7 · 100 = 270 g.', 'g'),
      T('3 kg ost koster 450 kr. Hva er enhetsprisen i kr/kg?', 150, 'pris ÷ kilo.', '450 ÷ 3 = 150 kr/kg.', 'kr/kg'),
      T('Strøm koster 1,5 kr/kWh. Du bruker 800 kWh. Hva koster det?', 1200, 'pris · kWh.', '1,5 · 800 = 1200 kr.', 'kr'),
      V('Hva er billigst: 2 kg for 50 kr eller 5 kg for 110 kr?', ['5 kg for 110 kr (22 kr/kg)', '2 kg for 50 kr (25 kr/kg)', 'Like billig', 'Kan ikke vite'], 0, 'Regn ut kr per kg.', '50 ÷ 2 = 25 kr/kg, og 110 ÷ 5 = 22 kr/kg.')
    ])
  ]));
  U1.push(S('Regne om enheter', '🔄', [
    P('Hvis du skal regne om <strong>km/t til m/s</strong>, regner du om begge delene: 1 km = 1000 m og 1 t = 3600 s. Resultatet er at du <strong>deler på 3,6</strong>. Og motsatt: m/s til km/t gjør du <strong>· 3,6</strong>.'),
    E('Regn om 72 km/t til m/s.', ['72 km = 72 000 m, og 1 time = 3600 s.', '72 000 ÷ 3600 = 20.', 'Svar: 20 m/s. (Snarvei: 72 ÷ 3,6 = 20.)']),
    C('mestring', 'Fartsgrenser i m/s', '50 km/t er omtrent 14 m/s. 80 km/t er omtrent 22 m/s. 100 km/t er omtrent 28 m/s.'),
    O(5, [
      T('Regn om 36 km/t til m/s.', 10, 'Del på 3,6.', '36 ÷ 3,6 = 10 m/s.', 'm/s'),
      T('Regn om 20 m/s til km/t.', 72, 'Gang med 3,6.', '20 · 3,6 = 72 km/t.', 'km/t'),
      T('Usain Bolt løp 100 m på ca. 10 s. Hva er det i m/s?', 10, 'strekning ÷ tid.', '100 ÷ 10 = 10 m/s.', 'm/s'),
      T('Hvor mange km/t er 10 m/s?', 36, 'Gang med 3,6.', '10 · 3,6 = 36 km/t.', 'km/t'),
      T('Et fly flyr 900 km/t. Hvor mange meter flyr det per sekund?', 250, '900 ÷ 3,6.', '900 ÷ 3,6 = 250 m/s.', 'm/s'),
      F('Forklar hvorfor man deler på 3,6 når man regner fra km/t til m/s.', ['1 km er 1000 m, så tallet blir 1000 ganger større.', '1 time er 3600 sekunder, så tallet blir 3600 ganger mindre.', '1000 ÷ 3600 = 1 ÷ 3,6. Derfor deler vi på 3,6.'])
    ])
  ]));
  U1.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('To biler: A kjører 100 km på 1,5 timer. B kjører 150 km på 2 timer. Hvem har høyest gjennomsnittsfart? Vis utregning.', ['A: 100 ÷ 1,5 ≈ 66,7 km/t.', 'B: 150 ÷ 2 = 75 km/t.', 'B har høyest gjennomsnittsfart.']),
      F('En kollega sier: «Gjennomsnittsfart er alltid gjennomsnittet av fartene.» Gi et moteksempel.', ['Kjør 60 km med 60 km/t (1 time) og 60 km med 30 km/t (2 timer).', 'Gjennomsnittet av fartene er 45 km/t, men gjennomsnittsfarten er 120 ÷ 3 = 40 km/t.', 'Påstanden stemmer bare hvis tiden er lik i begge deler.']),
      F('Lag en egen oppgave som bruker tetthet, og regn den ut.', ['Eksempel: En terning av jern har volum 10 cm³. Tettheten er 7,9 g/cm³.', 'Masse = 7,9 · 10 = 79 g.', 'Sjekk at enhetene stemmer: g/cm³ · cm³ = g.'])
    ]),
    SJ('Dette kan du nå', ['Forklare hva en sammensatt måleenhet er', 'Regne med fart, strekning og tid', 'Regne om minutter til timer', 'Regne gjennomsnittsfart riktig', 'Regne enhetspris og tetthet', 'Regne om km/t og m/s'])
  ]));
  M.register('utforsk', '9/sammensatte-maleenheter', {
    tittel: 'Sammensatte måleenheter',
    ingress: 'km/t, kr/kg og g/cm³ er enheter med «per». Du lærer å regne med dem og å gjøre dem om.',
    mal: ['regne med sammensatte måleenheter', 'regne om mellom enheter'], ordliste: ORD1, seksjoner: U1
  });
  const T11 = [];
  T11.push(S('Steg 1: Hva er km/t?', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('<strong>km/t</strong> leses «kilometer per time». Det betyr hvor mange kilometer du kommer på <strong>én time</strong>.', true),
    E('Fart 60 km/t. Hvor langt kommer du på 2 timer?', ['På 1 time: 60 km.', 'På 2 timer: 60 + 60 = 120 km.', 'Svar: 120 km. 🎉']),
    OS([
      V('Du kjører 40 km/t. Hvor langt kommer du på 1 time?', ['40 km', '4 km', '400 km'], 0, 'Det står «per time».', '40 km på 1 time.', true),
      T('Du kjører 50 km/t i 2 timer. Hvor langt kommer du?', 100, '50 + 50.', '50 · 2 = 100 km.', 'km'),
      T('Du sykler 15 km/t i 3 timer. Hvor langt kommer du?', 45, '15 + 15 + 15.', '15 · 3 = 45 km.', 'km')
    ])
  ]));
  T11.push(S('Steg 2: Finn farten', '2', [
    G('Nå skal vi finne farten selv.'),
    P('Fart = strekning <strong>delt på</strong> tid.', true),
    C('regel', 'Husk', ['fart = strekning ÷ tid', 'Eksempel: 100 km på 2 timer er 100 ÷ 2 = 50 km/t.']),
    E('Du går 12 km på 3 timer. Hva er farten?', ['Strekning delt på tid: 12 ÷ 3.', '12 ÷ 3 = 4.', 'Svar: 4 km/t. 🎉']),
    OS([
      T('Du kjører 120 km på 2 timer. Hva er farten i km/t?', 60, 'Del på 2.', '120 ÷ 2 = 60.', 'km/t'),
      T('Du sykler 45 km på 3 timer. Hva er farten i km/t?', 15, 'Del på 3.', '45 ÷ 3 = 15.', 'km/t'),
      T('Et tog kjører 300 km på 3 timer. Hva er farten i km/t?', 100, 'Del på 3.', '300 ÷ 3 = 100.', 'km/t')
    ])
  ]));
  T11.push(S('Steg 3: Finn tiden og strekningen', '3', [
    G('Vi bruker de samme tallene på tre måter.'),
    TAB(['Finn', 'Regn slik'], [['Fart', 'strekning ÷ tid'], ['Strekning', 'fart · tid'], ['Tid', 'strekning ÷ fart']]),
    E('Du kjører 150 km med fart 50 km/t. Hvor lang tid tar det?', ['Tid = strekning ÷ fart.', '150 ÷ 50 = 3.', 'Svar: 3 timer. 🎉']),
    OS([
      T('Du kjører 200 km med fart 100 km/t. Hvor mange timer tar det?', 2, '200 ÷ 100.', '200 ÷ 100 = 2.', 't'),
      T('Du kjører 70 km/t i 2 timer. Hvor langt kommer du?', 140, '70 · 2.', '70 · 2 = 140.', 'km'),
      T('Du går 9 km med fart 3 km/t. Hvor mange timer tar det?', 3, '9 ÷ 3.', '9 ÷ 3 = 3.', 't')
    ])
  ]));
  T11.push(S('Steg 4: Pris per kilo', '4', [
    G('Siste steg: «per» i butikken.'),
    P('Enhetspris er prisen for <strong>1 kg</strong>. Del prisen på antall kilo.', true),
    E('3 kg epler koster 60 kr. Hva koster 1 kg?', ['Del prisen på antall kilo.', '60 ÷ 3 = 20.', 'Svar: 20 kr/kg. 🎉']),
    OS([
      T('4 kg poteter koster 48 kr. Hva er prisen per kg?', 12, '48 ÷ 4.', '48 ÷ 4 = 12 kr/kg.', 'kr/kg'),
      T('Ost koster 100 kr/kg. Hva koster 3 kg?', 300, '100 · 3.', '100 · 3 = 300 kr.', 'kr'),
      V('Hva er billigst: 2 kg for 30 kr eller 3 kg for 36 kr?', ['3 kg for 36 kr (12 kr/kg)', '2 kg for 30 kr (15 kr/kg)'], 0, 'Regn ut kr per kg.', '30 ÷ 2 = 15 og 36 ÷ 3 = 12.', true)
    ]),
    SJ('Dette kan du nå', ['Forklare hva km/t betyr', 'Finne fart, strekning og tid', 'Regne enhetspris'])
  ]));
  M.register('steg', '9/sammensatte-maleenheter', {
    tittel: 'Sammensatte måleenheter',
    ingress: 'Små steg om fart og pris per kilo, med tydelige eksempler og hjelp hele veien.',
    mal: ['forklare km/t og kr/kg', 'regne fart, strekning og tid'], ordliste: ORD1, seksjoner: T11
  });
  M.ekstra['9/sammensatte-maleenheter'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('fart', '🚗', 'Finn farten', 8, 'Regn ut farten i km/t.', function (r) {
      const v = r.int(3, lett ? 12 : 18) * 5, t = r.int(2, lett ? 4 : 6); return H.e('Strekning ' + v * t + ' km på ' + t + ' timer.', v, v * t + ' ÷ ' + t + ' = ' + v + ' km/t');
    }));
    sek.push(H.ek('strek', '📏', 'Finn strekningen', 8, 'Regn ut strekningen i km.', function (r) {
      const v = r.int(2, lett ? 9 : 16) * 10, t = r.int(2, lett ? 4 : 7); return H.e('Fart ' + v + ' km/t i ' + t + ' timer.', v * t, v + ' · ' + t + ' = ' + v * t + ' km');
    }));
    sek.push(H.ek('min', '🕐', 'Minutter', 6, 'Regn ut strekningen i km. Gjør minuttene om til timer.', function (r) {
      const v = r.pick([40, 60, 80, 100, 120]), m = r.pick([15, 30, 45]); const d = v * m / 60;
      return H.e('Fart ' + v + ' km/t i ' + m + ' minutter.', d, v + ' · ' + M.fmt(m / 60) + ' = ' + M.fmt(d) + ' km');
    }));
    sek.push(H.ek('omr', '🔄', 'Km/t til m/s', 6, 'Regn om til m/s (del på 3,6).', function (r) {
      const m = r.int(2, lett ? 10 : 30); return H.e(M.fmt(m * 3.6) + ' km/t', m, M.fmt(m * 3.6) + ' ÷ 3,6 = ' + m + ' m/s');
    }));
    sek.push(H.ek('pris', '💰', 'Enhetspris', 6, 'Regn ut kr per kg.', function (r) {
      const p = r.int(5, 40), kg = r.int(2, lett ? 5 : 9); return H.e(kg + ' kg koster ' + p * kg + ' kr.', p, p * kg + ' ÷ ' + kg + ' = ' + p + ' kr/kg');
    }));
    return H.ekDef('Sammensatte måleenheter', sek);
  };

  /* ================= FIGURER, FORMLIKHET OG KONGRUENS ================= */
  const ORD2 = [
    ord(['kongruent', 'kongruente', 'kongruens'], 'To figurer er kongruente hvis de er helt like: samme form og samme størrelse.'),
    ord(['formlike', 'formlik', 'formlikhet'], 'To figurer er formlike hvis de har samme form, men kan ha ulik størrelse. Vinklene er like og sidene har samme forhold.'),
    ord(['målestokk', 'skalafaktor'], 'Tallet som viser hvor mange ganger større eller mindre en figur er.'),
    ord(['vinkelsum'], 'Summen av alle vinklene i en figur.'),
    ord(['likebeint'], 'En trekant med to sider som er like lange. To vinkler er også like.'),
    ord(['likesidet'], 'En trekant der alle sidene er like lange. Alle vinkler er 60°.'),
    ord(['parallellogram'], 'En firkant der motstående sider er parallelle og like lange.'),
    ord(['rombe'], 'En firkant med fire like lange sider.'),
    ord(['trapes'], 'En firkant med minst ett par parallelle sider.'),
    ord(['diagonal'], 'En rett linje mellom to hjørner som ikke ligger ved siden av hverandre.'),
    ord(['symmetrilinje'], 'En linje som deler figuren i to speilbilder.')
  ];
  const U2 = [];
  U2.push(S('Trekanter og firkanter', '🔶', [
    P('Alle figurer med rette sider kalles <strong>mangekanter</strong>. Vi sorterer dem etter egenskaper. Det er egenskapene som avgjør hva figuren heter, ikke hvordan den ligger på arket.'),
    TAB(['Firkant', 'Sider', 'Vinkler', 'Symmetrilinjer'], [['Kvadrat', 'Fire like', 'Fire 90°', '4'], ['Rektangel', 'Motstående like', 'Fire 90°', '2'], ['Rombe', 'Fire like', 'Motstående like', '2'], ['Parallellogram', 'Motstående like og parallelle', 'Motstående like', '0'], ['Trapes', 'Minst ett par parallelle', '–', '0 eller 1']]),
    K([{ ikon: '🔺', tittel: 'Likesidet', tekst: 'Alle sider like. Alle vinkler 60°.' }, { ikon: '📐', tittel: 'Likebeint', tekst: 'To sider like. To vinkler like.' }, { ikon: '⊾', tittel: 'Rettvinklet', tekst: 'Har én vinkel på 90°.' }]),
    C('tips', 'Et kvadrat er også...', 'Et kvadrat er et spesialtilfelle av et rektangel, en rombe og et parallellogram. Alle egenskapene til disse gjelder også for kvadratet.'),
    O(1, [
      V('Hvor mange like sider har et kvadrat?', ['4', '2', '3', '0'], 0, 'Fire like.', 'Alle fire sidene er like lange.', true),
      V('Hvilken firkant har fire like sider, men trenger ikke ha rette vinkler?', ['Rombe', 'Rektangel', 'Trapes', 'Parallellogram'], 0, 'Tenk på en «skjev» ruter.', 'En rombe har fire like sider.'),
      T('Hvor mange symmetrilinjer har et rektangel (som ikke er kvadrat)?', 2, 'Én loddrett og én vannrett.', 'Rektangelet har 2 symmetrilinjer.')
    ])
  ]));
  U2.push(S('Vinkelsummer', '📐', [
    P('Vinklene i en trekant er alltid <strong>180°</strong> til sammen. I en firkant er de <strong>360°</strong>. For en mangekant med <strong>n</strong> sider er vinkelsummen <strong>(n − 2) · 180°</strong>.'),
    TAB(['Figur', 'Sider', 'Vinkelsum'], [['Trekant', '3', '180°'], ['Firkant', '4', '360°'], ['Femkant', '5', '540°'], ['Sekskant', '6', '720°']]),
    C('tips', 'Hvorfor?', 'Du kan dele en firkant i to trekanter med en diagonal: 2 · 180° = 360°. En femkant deler seg i 3 trekanter: 3 · 180° = 540°.'),
    E('En trekant har vinklene 50° og 60°. Hva er den tredje?', ['Summen skal være 180°.', '50 + 60 = 110.', '180 − 110 = 70. Svar: 70°.']),
    E('Likebeint trekant med toppvinkel 40°. Hva er grunnvinklene?', ['De to like vinklene deler det som er igjen.', '180 − 40 = 140.', '140 ÷ 2 = 70. Svar: 70° hver.']),
    O(2, [
      T('En trekant har vinklene 70° og 45°. Hva er den tredje vinkelen?', 65, '180 − 70 − 45.', '180 − 115 = 65°.', '°'),
      T('En firkant har tre vinkler: 90°, 90° og 70°. Hva er den fjerde?', 110, '360 − 250.', '360 − 250 = 110°.', '°'),
      T('Likebeint trekant med toppvinkel 80°. Hva er grunnvinkelen?', 50, '(180 − 80) ÷ 2.', '(180 − 80) ÷ 2 = 50°.', '°'),
      T('Hva er vinkelsummen i en sekskant?', 720, '(6 − 2) · 180.', '4 · 180 = 720°.', '°'),
      T('Hvor mange diagonaler har en sekskant? Bruk n(n − 3) ÷ 2.', 9, '6 · 3 ÷ 2.', '6 · 3 ÷ 2 = 9.', ''),
      T('En likesidet trekant har sider på 7 cm. Hva er omkretsen?', 21, '3 · 7.', '3 · 7 = 21 cm.', 'cm')
    ])
  ]));
  U2.push(S('Kongruente figurer', '👯', [
    P('To figurer er <strong>kongruente</strong> hvis de er <strong>helt like</strong>: samme form og samme størrelse. Du kan flytte, snu eller speile den ene så den dekker den andre nøyaktig.'),
    C('regel', 'Når er trekanter kongruente?', ['Alle tre sidene er parvis like (SSS).', 'To sider og vinkelen mellom dem er parvis like (SVS).', 'To vinkler og en side er parvis like (VSV).']),
    C('advarsel', 'Pass på', 'Tre like vinkler er <strong>ikke nok</strong> for kongruens. Slike trekanter har samme form, men kan ha ulik størrelse. Da er de <strong>formlike</strong>.'),
    O(3, [
      V('To trekanter har sidene 3, 4, 5 og 3, 4, 5. Er de kongruente?', ['Ja', 'Nei', 'Bare hvis de er rettvinklede', 'Vet ikke'], 0, 'Alle tre sidene er like.', 'Alle tre sidene er parvis like, så de er kongruente (SSS).', true),
      V('To trekanter har vinklene 60°, 60°, 60°. Er de kongruente?', ['Ikke nødvendigvis', 'Ja, alltid', 'Nei, aldri', 'Bare hvis de er store'], 0, 'De kan ha ulik størrelse.', 'De er formlike, men kan ha ulike sidelengder.'),
      V('Et rektangel er 3 × 8 cm. Et annet er 6 × 4 cm. Er de kongruente?', ['Nei', 'Ja', 'Ja, de har samme omkrets', 'Vet ikke'], 0, 'Sjekk sidene.', 'Sidene er ulike, så de er ikke kongruente. (Begge har areal 24, men ulik form.)')
    ])
  ]));
  U2.push(S('Formlike figurer', '🔍', [
    P('To figurer er <strong>formlike</strong> hvis de har <strong>samme form</strong>. Alle vinkler er like, og alle sider er forstørret (eller forminsket) med <strong>samme tall</strong>. Dette tallet kalles <strong>målestokk</strong> eller skalafaktor.'),
    W('formlikhet', { a: 3, b: 2, k: 2, tittel: 'Forstørr rektangelet' }),
    E('Trekant A har sidene 3, 4 og 5. Trekant B er formlik og har korteste side 6. Hva er de to andre sidene?', ['Målestokk: 6 ÷ 3 = 2.', 'Gang de andre sidene med 2: 4 · 2 = 8 og 5 · 2 = 10.', 'Svar: 8 og 10.']),
    C('regel', 'Husk', ['Lengder: gang med k.', 'Vinkler: forblir like.', 'Areal: gang med k · k (se neste tema).']),
    O(3, [
      T('Trekant A har sidene 3, 4 og 5. Trekant B er formlik med korteste side 9. Hva er den lengste siden?', 15, 'k = 9 ÷ 3 = 3.', 'k = 3. Lengste side: 5 · 3 = 15.'),
      T('To formlike rektangler. Det minste er 2 × 3. Det største har korteste side 8. Hva er den lengste siden?', 12, 'k = 4.', 'k = 8 ÷ 2 = 4, og 3 · 4 = 12.'),
      T('En trekant har sidene 4 og 6. I en formlik trekant er den korte siden 10. Hvor lang er den andre?', 15, 'k = 10 ÷ 4 = 2,5.', 'k = 2,5, og 6 · 2,5 = 15.'),
      T('Målestokk 1 : 50. En vegg er 6 cm på tegningen. Hvor lang er den i virkeligheten? (svar i cm)', 300, 'Gang med 50.', '6 · 50 = 300 cm.', 'cm'),
      T('Målestokk 1 : 100. En stue er 400 cm lang i virkeligheten. Hvor lang blir den på tegningen? (svar i cm)', 4, 'Del på 100.', '400 ÷ 100 = 4 cm.', 'cm'),
      V('Er alle kvadrater formlike?', ['Ja', 'Nei', 'Bare noen', 'Bare små'], 0, 'Alle har fire 90° og alle sider like.', 'Alle kvadrater har samme form, så de er formlike.')
    ])
  ]));
  U2.push(S('Kongruent eller formlik?', '⚖️', [
    TAB(['', 'Kongruent', 'Formlik'], [['Samme form?', 'Ja', 'Ja'], ['Samme størrelse?', 'Ja', 'Nei, ikke nødvendigvis'], ['Vinkler', 'Like', 'Like'], ['Sider', 'Like', 'Forhold k'], ['Målestokk k', '1', 'Et tall (kan være 1)']]),
    C('mestring', 'Alle kongruente figurer er formlike', 'Fordi k = 1. Men ikke alle formlike figurer er kongruente.'),
    O(4, [
      V('Er alle kongruente trekanter formlike?', ['Ja', 'Nei', 'Bare likesidede', 'Vet ikke'], 0, 'Tenk k = 1.', 'Kongruente figurer har målestokk 1, så de er også formlike.'),
      V('Er alle formlike trekanter kongruente?', ['Nei', 'Ja', 'Bare rettvinklede', 'Bare små'], 0, 'En 3-4-5 og en 6-8-10.', 'De er formlike, men har ulik størrelse. Da er de ikke kongruente.'),
      F('Argumenter for at et kvadrat med side 3 og et kvadrat med side 5 er formlike, men ikke kongruente.', ['Begge har fire 90° vinkler og alle sider like, så formen er den samme.', 'Målestokken er 5 ÷ 3.', 'Sidene har ulik lengde, så de er ikke kongruente.']),
      F('En elev sier: «To firkanter med like omkrets er alltid kongruente.» Finn et moteksempel.', ['Kvadrat med side 4 har omkrets 16.', 'Rektangel 6 × 2 har også omkrets 16.', 'De er ikke kongruente, så påstanden er feil.'])
    ]),
    SJ('Dette kan du nå', ['Beskrive egenskaper ved firkanter og trekanter', 'Regne vinkelsummer', 'Forklare kongruens', 'Bruke målestokk og formlikhet', 'Argumentere for forskjellen på kongruent og formlik'])
  ]));
  M.register('utforsk', '9/figurer', {
    tittel: 'Figurer, formlikhet og kongruens',
    ingress: 'Du utforsker egenskaper ved trekanter og firkanter, og lærer forskjellen på figurer som er like og figurer som bare har samme form.',
    mal: ['utforske og argumentere for egenskaper ved geometriske figurer', 'bruke formlikhet og kongruens'], ordliste: ORD2, seksjoner: U2
  });
  const T12 = [];
  T12.push(S('Steg 1: Navn på figurer', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    TAB(['Figur', 'Sider', 'Vinkler'], [['Kvadrat', '4 like', 'Fire 90°'], ['Rektangel', 'Motstående like', 'Fire 90°'], ['Rombe', '4 like', 'Ikke 90° (vanligvis)']]),
    P('Trekanter: <strong>likesidet</strong> (3 like sider), <strong>likebeint</strong> (2 like sider).', true),
    OS([
      V('Hvilken figur har fire like sider og fire 90°-vinkler?', ['Kvadrat', 'Rektangel', 'Trapes'], 0, 'Alt er likt.', 'Et kvadrat.', true),
      V('En trekant har tre like sider. Hva heter den?', ['Likesidet', 'Likebeint', 'Rettvinklet'], 0, 'Tre like sider.', 'Likesidet trekant.', true),
      T('Hvor mange hjørner har en firkant?', 4, 'Tell.', 'En firkant har 4 hjørner.')
    ])
  ]));
  T12.push(S('Steg 2: Vinkler', '2', [
    G('Vinklene i en trekant er alltid 180° til sammen.'),
    C('regel', 'Husk', ['Trekant: 180°.', 'Firkant: 360°.']),
    E('To vinkler i en trekant er 50° og 60°. Finn den tredje.', ['50 + 60 = 110.', '180 − 110 = 70.', 'Svar: 70°. 🎉']),
    OS([
      T('To vinkler i en trekant er 90° og 30°. Finn den tredje.', 60, '180 − 90 − 30.', '180 − 120 = 60°.', '°'),
      T('Tre vinkler i en firkant er 90°, 90° og 100°. Finn den fjerde.', 80, '360 − 280.', '360 − 280 = 80°.', '°'),
      T('En likesidet trekant. Hva er hver vinkel?', 60, '180 ÷ 3.', '180 ÷ 3 = 60°.', '°')
    ])
  ]));
  T12.push(S('Steg 3: Like eller formlike?', '3', [
    G('To figurer kan ligne på hverandre på to måter.'),
    K([{ ikon: '👯', tittel: 'Kongruente', tekst: 'Helt like. Samme form og samme størrelse.' }, { ikon: '🔍', tittel: 'Formlike', tekst: 'Samme form. Størrelsen kan være ulik.' }]),
    OS([
      V('To kvadrater, ett med side 2 og ett med side 4. Hva er de?', ['Formlike', 'Kongruente'], 0, 'Samme form, ulik størrelse.', 'De har samme form, men ulik størrelse: formlike.', true),
      V('To like trekanter, begge med sidene 3, 4, 5. Hva er de?', ['Kongruente', 'Bare formlike'], 0, 'Helt like.', 'Samme form og samme størrelse: kongruente.', true)
    ])
  ]));
  T12.push(S('Steg 4: Målestokk', '4', [
    G('Målestokk sier hvor mange ganger større figuren er.'),
    E('En trekant har en side på 3 cm. I en formlik trekant er den siden 6 cm. Hva er målestokken?', ['Del 6 på 3.', '6 ÷ 3 = 2.', 'Målestokken er 2. Alle sider blir doblet. 🎉']),
    OS([
      T('En side er 4 cm. I en formlik figur er den 12 cm. Hva er målestokken?', 3, '12 ÷ 4.', '12 ÷ 4 = 3.'),
      T('Målestokken er 2. En annen side er 5 cm. Hvor lang er den i den store figuren?', 10, '5 · 2.', '5 · 2 = 10 cm.', 'cm'),
      T('Målestokken er 3. En side er 7 cm. Hvor lang er den i den store figuren?', 21, '7 · 3.', '7 · 3 = 21 cm.', 'cm')
    ]),
    SJ('Dette kan du nå', ['Navn på figurer', 'Regne vinkler i trekant og firkant', 'Forskjellen på kongruent og formlik', 'Bruke målestokk'])
  ]));
  M.register('steg', '9/figurer', {
    tittel: 'Figurer, formlikhet og kongruens',
    ingress: 'Små steg om figurer, vinkler og målestokk, med tydelige eksempler og hjelp hele veien.',
    mal: ['bruke vinkelsum', 'forklare kongruent og formlik', 'bruke målestokk'], ordliste: ORD2, seksjoner: T12
  });
  M.ekstra['9/figurer'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('tri', '🔺', 'Manglende vinkel i trekant', 8, 'Finn den tredje vinkelen.', function (r) {
      const a = r.int(2, 12) * 5, b = r.int(2, 12) * 5; const c = 180 - a - b; if (c <= 0) return H.e('To vinkler i en trekant er 40° og 60°.', 80, '180 − 100 = 80°');
      return H.e('To vinkler i en trekant er ' + a + '° og ' + b + '°.', c, '180 − ' + (a + b) + ' = ' + c + '°');
    }));
    sek.push(H.ek('fir', '⬜', 'Manglende vinkel i firkant', 6, 'Finn den fjerde vinkelen.', function (r) {
      const a = r.int(6, 17) * 5, b = r.int(6, 17) * 5, c = r.int(6, 17) * 5; const d = 360 - a - b - c; if (d <= 0) return H.e('Tre vinkler i en firkant er 90°, 90° og 80°.', 100, '360 − 260 = 100°');
      return H.e('Tre vinkler i en firkant er ' + a + '°, ' + b + '° og ' + c + '°.', d, '360 − ' + (a + b + c) + ' = ' + d + '°');
    }));
    sek.push(H.ek('lb', '📐', 'Likebeint trekant', 6, 'Finn grunnvinkelen.', function (r) {
      const g = r.int(4, 16) * 5; const top = 180 - 2 * g; return H.e('Likebeint trekant med toppvinkel ' + top + '°.', g, '(180 − ' + top + ') ÷ 2 = ' + g + '°');
    }));
    sek.push(H.ek('vsum', '➕', 'Vinkelsum i mangekant', 5, 'Regn ut vinkelsummen med (n − 2) · 180.', function (r) {
      const n = r.int(5, lett ? 7 : 12); return H.e(n + '-kant', (n - 2) * 180, '(' + n + ' − 2) · 180 = ' + (n - 2) * 180 + '°');
    }));
    sek.push(H.ek('form', '🔍', 'Formlike trekanter', 8, 'Finn den manglende siden.', function (r) {
      const k = r.int(2, lett ? 4 : 6), a = r.int(2, 6), b = a + r.int(1, 5);
      return H.e('Trekant A har sidene ' + a + ' og ' + b + '. I en formlik trekant er den korteste siden ' + a * k + '. Hvor lang er den andre siden?', b * k, 'k = ' + a * k + ' ÷ ' + a + ' = ' + k + ', så ' + b + ' · ' + k + ' = ' + b * k);
    }));
    return H.ekDef('Figurer, formlikhet og kongruens', sek);
  };
})();
