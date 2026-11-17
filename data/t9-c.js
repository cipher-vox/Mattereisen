/* ============================================================
   9. trinn: Overflate og volum
   Læreplan 9.6
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, SJ, S, ord } = H;
  const R = x => Math.round(x * 1000) / 1000;
  const ORD = [
    ord(['volum'], 'Hvor mye plass en tredimensjonal figur tar. Måles i kubikkenheter, for eksempel cm³.'),
    ord(['overflate', 'overflateareal'], 'Arealet av alle flatene utenpå en figur. Måles i kvadratenheter.'),
    ord(['grunnflate'], 'Flaten som figuren «står på». Arealet kalles G.'),
    ord(['prisme', 'prismet'], 'En figur med to like, parallelle grunnflater og rette sider. En kasse er et prisme.'),
    ord(['sylinder', 'sylinderen'], 'En figur med to like sirkler som topp og bunn.'),
    ord(['kjegle', 'kjeglen'], 'En figur med sirkel som bunn og en spiss på toppen.'),
    ord(['pyramide', 'pyramiden'], 'En figur med mangekant som bunn og trekanter som går opp til en spiss.'),
    ord(['kule', 'kula'], 'En helt rund figur. Alle punkter på overflaten er like langt fra sentrum.'),
    ord(['radius'], 'Avstanden fra sentrum til kanten av en sirkel eller kule.'),
    ord(['nett'], 'En figur brettet ut flat, slik at du ser alle flatene.'),
    ord(['kubikkcentimeter', 'cm³'], 'Volumet av en terning på 1 cm × 1 cm × 1 cm.'),
    ord(['liter'], 'Volum. 1 liter er 1000 cm³, eller 1 dm³.'),
    ord(['mantelflate'], 'Den krumme flaten på sylinder og kjegle, uten topp og bunn.'),
    ord(['pi', 'π'], 'Tallet som er omkretsen delt på diameteren i en sirkel, omtrent 3,14.')
  ];
  const U = [];
  U.push(S('Volum og overflate', '📦', [
    P('<strong>Overflate</strong> er arealet av alt som er <em>utenpå</em> en figur: det du må male eller pakke inn. <strong>Volum</strong> er hvor mye som er <em>inni</em>: hvor mye vann den rommer. Overflate måles i cm², volum i cm³.'),
    K([{ ikon: '🎁', tittel: 'Overflate', tekst: 'Papir for å pakke inn gaven. Enhet: cm², m².' }, { ikon: '🥛', tittel: 'Volum', tekst: 'Hvor mye som får plass inni. Enhet: cm³, m³, liter.' }]),
    O(1, [
      V('Du skal male en kasse utvendig. Skal du regne overflate eller volum?', ['Overflate', 'Volum'], 0, 'Du maler flatene.', 'Overflate.', true),
      V('Du skal fylle en tank med vann. Skal du regne overflate eller volum?', ['Volum', 'Overflate'], 0, 'Hvor mye får plass?', 'Volum.', true),
      V('Hvilken enhet passer til volum?', ['cm³', 'cm²', 'cm', 'km/t'], 0, 'Tre dimensjoner.', 'cm³ (kubikkcentimeter).', true)
    ])
  ]));
  U.push(S('Prisme og kasse', '🧱', [
    P('Et <strong>prisme</strong> har to like grunnflater. <strong>Volum = grunnflate · høyde</strong>, altså <strong>V = G · h</strong>. For en kasse er G = l · b, så V = l · b · h.'),
    W('volum', { type: 'prisme', tittel: 'Kasse: dra i lengde, bredde og høyde' }),
    TAB(['Figur', 'Volum', 'Overflate'], [['Kasse', 'l · b · h', '2(l·b + l·h + b·h)'], ['Terning (side s)', 's · s · s', '6 · s · s'], ['Prisme', 'G · h', '2 · G + omkrets · h']]),
    E('En kasse er 5 cm lang, 3 cm bred og 4 cm høy. Finn volum og overflate.', ['V = 5 · 3 · 4 = 60 cm³.', 'Flatene: 5·3 = 15 (topp og bunn), 5·4 = 20 (to sider), 3·4 = 12 (to ender).', 'O = 2 · (15 + 20 + 12) = 2 · 47 = 94 cm².']),
    C('tips', 'Nett', 'Tegn kassen brettet ut (nett). Da ser du alle seks rektanglene. Overflaten er summen av arealene.'),
    O(2, [
      T('Volumet av en kasse på 5 cm × 3 cm × 4 cm?', 60, 'l · b · h.', '5 · 3 · 4 = 60 cm³.', 'cm³'),
      T('En terning har side 4 cm. Hva er volumet?', 64, '4 · 4 · 4.', '4³ = 64 cm³.', 'cm³'),
      T('En terning har side 4 cm. Hva er overflaten? (6 like kvadrater)', 96, '6 · 4 · 4.', '6 · 16 = 96 cm².', 'cm²'),
      T('En kasse er 5 × 3 × 4 cm. Hva er overflaten?', 94, '2(15 + 20 + 12).', '2 · 47 = 94 cm².', 'cm²'),
      T('Grunnflaten i et prisme er en trekant med areal 6 cm². Høyden er 10 cm. Hva er volumet?', 60, 'G · h.', '6 · 10 = 60 cm³.', 'cm³')
    ])
  ]));
  U.push(S('Sylinder', '🥫', [
    P('En sylinder har en <strong>sirkel</strong> som grunnflate. G = π · r². Volum = G · h = <strong>π · r² · h</strong>. Overflaten består av to sirkler (topp og bunn) og en <strong>mantelflate</strong> som er et rektangel når du ruller den ut: bredde = omkrets 2π r, høyde = h.'),
    W('volum', { type: 'sylinder', tittel: 'Sylinder: dra i radius og høyde' }),
    C('regel', 'Formler (π ≈ 3,14)', ['V = π · r² · h', 'O = 2 · π · r² + 2 · π · r · h', 'Radius er halve diameteren!']),
    E('En boks har radius 2 cm og høyde 10 cm. Finn volumet. Bruk π = 3,14.', ['r² = 2 · 2 = 4.', 'V = 3,14 · 4 · 10.', '3,14 · 40 = 125,6. Svar: 125,6 cm³.']),
    C('advarsel', 'Pass på radius og diameter', 'Hvis oppgaven gir <strong>diameter</strong> 10 cm, er radius 5 cm. Mange regner feil her.'),
    O(3, [
      T('Sylinder: r = 5 cm, h = 4 cm. Volum med π = 3,14?', 314, '25 · 4 · 3,14.', '3,14 · 25 · 4 = 314 cm³.', 'cm³'),
      T('Sylinder: r = 2 cm, h = 10 cm. Volum med π = 3,14?', 125.6, '3,14 · 4 · 10.', '3,14 · 40 = 125,6 cm³.', 'cm³'),
      T('Sylinder: diameter 10 cm, høyde 10 cm. Hva er volumet med π = 3,14?', 785, 'Radius er 5.', 'r = 5, så 3,14 · 25 · 10 = 785 cm³.', 'cm³'),
      T('Sylinder: r = 2 cm, h = 3 cm. Hva er overflaten med π = 3,14? O = 2πr² + 2πrh', 62.8, '2·3,14·4 + 2·3,14·2·3.', '25,12 + 37,68 = 62,8 cm².', 'cm²'),
      T('Arealet av grunnflata til en sylinder er 78,5 cm². Høyden er 10 cm. Hva er volumet?', 785, 'G · h.', '78,5 · 10 = 785 cm³.', 'cm³')
    ])
  ]));
  U.push(S('Pyramide og kjegle', '🔻', [
    P('En <strong>pyramide</strong> og en <strong>kjegle</strong> har en spiss. Volumet er <strong>en tredjedel</strong> av et prisme eller en sylinder med samme grunnflate og høyde. <strong>V = ⅓ · G · h</strong>.'),
    W('volum', { type: 'pyramide', tittel: 'Pyramide: grunnkant og høyde' }),
    W('volum', { type: 'kjegle', tittel: 'Kjegle: radius og høyde' }),
    E('En pyramide har kvadratisk grunnflate med side 6 cm og høyde 5 cm. Finn volumet.', ['G = 6 · 6 = 36 cm².', 'V = ⅓ · 36 · 5 = ⅓ · 180.', '180 ÷ 3 = 60. Svar: 60 cm³.']),
    E('Kjegle: r = 3 cm og h = 4 cm. Finn volumet med π = 3,14.', ['G = 3,14 · 3 · 3 = 28,26.', 'V = ⅓ · 28,26 · 4 = 113,04 ÷ 3.', '113,04 ÷ 3 = 37,68. Svar: 37,68 cm³.']),
    C('mestring', 'Hvorfor ⅓?', 'Tre like pyramider passer akkurat inn i en kasse med samme grunnflate og høyde. Fyll en pyramide med vann og tøm den tre ganger i kassa: da er kassa full!'),
    O(4, [
      T('Pyramide: grunnflate 36 cm², høyde 5 cm. Volum?', 60, '⅓ · 36 · 5.', '36 · 5 ÷ 3 = 60 cm³.', 'cm³'),
      T('Pyramide: grunnflate 20 cm², høyde 9 cm. Volum?', 60, 'Gang og del på 3.', '20 · 9 ÷ 3 = 60 cm³.', 'cm³'),
      T('Kjegle: r = 3 cm, h = 4 cm, π = 3,14. Volum?', 37.68, '⅓ · 3,14 · 9 · 4.', '3,14 · 9 · 4 = 113,04, og 113,04 ÷ 3 = 37,68 cm³.', 'cm³'),
      T('Kjegle: r = 3 cm, høyde 4 cm. Hvor lang er skråsiden s? (Pytagoras: s² = r² + h²)', 5, '9 + 16 = 25.', 's² = 25, så s = 5 cm.', 'cm'),
      T('Overflaten til en kjegle er O = π · r · (r + s). r = 3, s = 5, π = 3,14. Hva er O?', 75.36, '3,14 · 3 · 8.', '3,14 · 3 · 8 = 75,36 cm².', 'cm²')
    ])
  ]));
  U.push(S('Kule', '⚽', [
    P('En <strong>kule</strong> er bestemt av radiusen. <strong>V = 4/3 · π · r³</strong> og <strong>O = 4 · π · r²</strong>. Overflaten til en kule er akkurat fire ganger arealet av den største sirkelen i kula.'),
    W('volum', { type: 'kule', tittel: 'Kule: dra i radius' }),
    E('Kule med r = 3 cm. Finn volum, π = 3,14.', ['r³ = 3 · 3 · 3 = 27.', 'V = 4/3 · 3,14 · 27 = 4 · 3,14 · 9 (siden 27 ÷ 3 = 9).', '4 · 3,14 · 9 = 113,04. Svar: 113,04 cm³.']),
    O(4, [
      T('Kule: r = 3 cm, π = 3,14. Volum?', 113.04, '4/3 · 3,14 · 27.', '4 · 3,14 · 9 = 113,04 cm³.', 'cm³'),
      T('Kule: r = 5 cm, π = 3,14. Overflaten?', 314, '4 · 3,14 · 25.', '4 · 3,14 · 25 = 314 cm².', 'cm²'),
      V('Radius på en kule dobles. Hvor mange ganger større blir volumet?', ['8 ganger', '2 ganger', '4 ganger', '6 ganger'], 0, 'r³: 2 · 2 · 2.', 'V avhenger av r³, så 2³ = 8 ganger.'),
      V('Radius på en kule dobles. Hvor mange ganger større blir overflaten?', ['4 ganger', '2 ganger', '8 ganger', '3 ganger'], 0, 'r²: 2 · 2.', 'O avhenger av r², så 2² = 4 ganger.')
    ])
  ]));
  U.push(S('Volum i praksis: liter og enheter', '🧴', [
    P('Volum angis ofte i <strong>liter</strong>. <strong>1 liter = 1000 cm³ = 1 dm³</strong>. Pass på at alle lengder har samme enhet før du regner!'),
    TAB(['Fra', 'Til', 'Regel'], [['cm³', 'liter', 'Del på 1000'], ['dm³', 'liter', 'Samme tall'], ['m³', 'liter', 'Gang med 1000'], ['liter', 'dl', 'Gang med 10']]),
    E('Et akvarium er 50 cm × 30 cm × 40 cm. Hvor mange liter vann får det plass til?', ['V = 50 · 30 · 40 = 60 000 cm³.', '60 000 ÷ 1000 = 60.', 'Svar: 60 liter.']),
    C('virkelighet', 'Bruksområder', 'Svømmebasseng, drivstofftank, maling til veggen og pakker som skal passe i en postkasse – alt dette er volum og overflate.'),
    O(5, [
      T('En kasse er 20 cm × 30 cm × 40 cm. Hvor mange liter rommer den?', 24, 'Regn volum og del på 1000.', '20 · 30 · 40 = 24 000 cm³ = 24 liter.', 'liter'),
      T('Et basseng er 10 m langt, 5 m bredt og 2 m dypt. Hvor mange m³ vann?', 100, 'l · b · h.', '10 · 5 · 2 = 100 m³.', 'm³'),
      T('Et rom er 4 m × 5 m og 2,5 m høyt. Du maler de fire veggene (ikke gulv og tak) og ser bort fra vinduer og dører. Hva er veggarealet i m²?', 45, 'Omkrets i bunn · høyde.', 'Omkrets 2(4 + 5) = 18 m. 18 · 2,5 = 45 m².', 'm²'),
      T('Maling dekker 8 m² per liter. Hvor mange liter trenger du til 45 m²? (Rund opp til hele liter.)', 6, '45 ÷ 8 = 5,6.', '45 ÷ 8 ≈ 5,6, så du trenger 6 liter.', 'liter')
    ])
  ]));
  U.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('En burk er en sylinder med r = 4 cm og h = 10 cm. En annen har r = 8 cm og samme høyde. Hvor mange ganger mer rommer den andre? Forklar.', ['Volum = π · r² · h.', 'Når r dobles blir r² fire ganger så stor.', 'Høyden er lik, så volumet blir 4 ganger så stort.']),
      F('Hvorfor bruker man ⅓ i volumformelen til pyramide og kjegle? Forklar med et bilde eller en tanke.', ['Tre like pyramider fyller en kasse med samme grunnflate og høyde.', 'Derfor er volumet av en pyramide en tredjedel av kassa: ⅓ · G · h.', 'Det samme gjelder kjegle og sylinder.']),
      F('Du har 24 cm² papp. Er det mulig å lage en terning med side 2 cm? Hva blir volumet?', ['En terning har 6 flater: 6 · 2 · 2 = 24 cm². Ja.', 'Volumet er 2 · 2 · 2 = 8 cm³.', 'Pappen går akkurat opp.']),
      F('To bokser har samme volum, 60 cm³. Den ene er 5 × 3 × 4 cm. Lag en annen kasse med volum 60 cm³ og sammenlikn overflaten.', ['Eksempel: 6 × 5 × 2 = 60 cm³.', 'Første: O = 94 cm². Andre: 2(30 + 12 + 10) = 104 cm².', 'Samme volum kan ha ulik overflate. Terningformen gir minst overflate.'])
    ]),
    SJ('Dette kan du nå', ['Skille mellom volum og overflate', 'Regne volum og overflate av kasse og prisme', 'Regne med sylinder', 'Bruke ⅓-formelen for pyramide og kjegle', 'Regne med kule', 'Regne om til liter'])
  ]));
  M.register('utforsk', '9/overflate-volum', {
    tittel: 'Overflate og volum',
    ingress: 'Hvor mye plass er det inni, og hvor mye papir trenger du utenpå? Du bruker formler for prisme, sylinder, pyramide, kjegle og kule.',
    mal: ['bruke og argumentere for formler for overflateareal og volum av tredimensjonale figurer'], ordliste: ORD, seksjoner: U
  });

  const T1 = [];
  T1.push(S('Steg 1: Volum av en kasse', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('<strong>Volum</strong> er hvor mye som er inni. For en kasse: <strong>lengde · bredde · høyde</strong>.', true),
    W('volum', { type: 'prisme', tittel: 'Kasse' }),
    E('En kasse er 5 cm lang, 3 cm bred og 4 cm høy. Hva er volumet?', ['Gang de tre tallene.', '5 · 3 = 15. Så 15 · 4 = 60.', 'Svar: 60 cm³. 🎉']),
    OS([
      T('Kasse: 2 cm, 3 cm og 4 cm. Hva er volumet?', 24, '2 · 3 = 6. Så 6 · 4.', '2 · 3 · 4 = 24 cm³.', 'cm³'),
      T('Kasse: 5 cm, 2 cm og 3 cm. Hva er volumet?', 30, '5 · 2 = 10. Så 10 · 3.', '5 · 2 · 3 = 30 cm³.', 'cm³'),
      T('En terning har side 3 cm. Hva er volumet?', 27, '3 · 3 · 3.', '3 · 3 · 3 = 27 cm³.', 'cm³')
    ])
  ]));
  T1.push(S('Steg 2: Overflate av en kasse', '2', [
    G('Overflate er alt utenpå. En kasse har 6 flater.'),
    C('regel', 'Husk', ['En kasse har 6 flater: topp, bunn, to sider og to ender.', 'Topp og bunn er like. Sidene er like. Endene er like.']),
    E('Kasse 3 × 2 × 4 cm. Hva er overflaten?', ['Topp og bunn: 3 · 2 = 6 hver, til sammen 12.', 'To sider: 3 · 4 = 12 hver, til sammen 24. To ender: 2 · 4 = 8 hver, til sammen 16.', '12 + 24 + 16 = 52. Svar: 52 cm². 🎉']),
    OS([
      T('En terning har side 2 cm. Hva er arealet av én flate?', 4, '2 · 2.', '2 · 2 = 4 cm².', 'cm²'),
      T('En terning har side 2 cm. Hva er hele overflaten? (6 flater)', 24, '6 · 4.', '6 · 4 = 24 cm².', 'cm²'),
      T('En terning har side 5 cm. Hva er hele overflaten?', 150, '6 · 25.', '6 · 25 = 150 cm².', 'cm²')
    ])
  ]));
  T1.push(S('Steg 3: Sylinder', '3', [
    G('En sylinder er som en boks med runde ender (som en brusboks).'),
    P('Volum = grunnflate · høyde. Grunnflaten er en sirkel: <strong>π · r · r</strong>. Vi bruker π = 3,14.', true),
    E('Sylinder: r = 2 cm, h = 10 cm. Hva er volumet?', ['Grunnflate: 3,14 · 2 · 2 = 12,56.', 'Volum: 12,56 · 10 = 125,6.', 'Svar: 125,6 cm³. 🎉']),
    OS([
      T('Sylinder: r = 1 cm. Hva er grunnflata? (3,14 · 1 · 1)', 3.14, '3,14 · 1 · 1.', '3,14 · 1 = 3,14 cm².', 'cm²'),
      T('Sylinder: r = 1 cm og h = 10 cm. Hva er volumet?', 31.4, 'Grunnflata 3,14 ganger 10.', '3,14 · 10 = 31,4 cm³.', 'cm³'),
      T('Sylinder: r = 5 cm og h = 4 cm. Hva er volumet? (3,14 · 25 · 4)', 314, '3,14 · 100.', '3,14 · 25 · 4 = 314 cm³.', 'cm³')
    ])
  ]));
  T1.push(S('Steg 4: Liter', '4', [
    G('Siste steg: hvor mye vann rommer en kasse?'),
    C('regel', 'Husk', ['1 liter = 1000 cm³.', 'Regn volum i cm³, og del på 1000.']),
    E('Et akvarium er 50 cm × 20 cm × 40 cm. Hvor mange liter?', ['V = 50 · 20 · 40 = 40 000 cm³.', '40 000 ÷ 1000 = 40.', 'Svar: 40 liter. 🎉']),
    OS([
      T('En kasse er 10 cm × 10 cm × 10 cm. Hvor mange cm³?', 1000, '10 · 10 · 10.', '1000 cm³.', 'cm³'),
      T('Hvor mange liter er 1000 cm³?', 1, 'Del på 1000.', '1000 ÷ 1000 = 1 liter.', 'liter'),
      T('En kasse er 20 cm × 20 cm × 50 cm. Hvor mange liter?', 20, '20 000 cm³ ÷ 1000.', '20 · 20 · 50 = 20 000 cm³ = 20 liter.', 'liter')
    ]),
    SJ('Dette kan du nå', ['Regne volum av kasse', 'Regne overflate av kasse', 'Regne volum av sylinder', 'Regne om til liter'])
  ]));
  M.register('steg', '9/overflate-volum', {
    tittel: 'Overflate og volum',
    ingress: 'Små steg: du regner volum og overflate av kasse og sylinder, og lærer liter.',
    mal: ['regne volum og overflate'], ordliste: ORD, seksjoner: T1
  });
  M.ekstra['9/overflate-volum'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('kasse', '📦', 'Volum av kasse', 8, 'Regn ut volumet.', function (r) {
      const a = r.int(2, lett ? 6 : 12), b = r.int(2, lett ? 6 : 10), c = r.int(2, lett ? 6 : 10); return H.e('Kasse ' + a + ' cm × ' + b + ' cm × ' + c + ' cm.', a * b * c, a + ' · ' + b + ' · ' + c + ' = ' + a * b * c + ' cm³');
    }));
    sek.push(H.ek('ovfl', '🎁', 'Overflate av kasse', 8, 'Regn ut overflaten.', function (r) {
      const a = r.int(2, lett ? 6 : 12), b = r.int(2, lett ? 6 : 10), c = r.int(2, lett ? 6 : 10); const o = 2 * (a * b + a * c + b * c); return H.e('Kasse ' + a + ' cm × ' + b + ' cm × ' + c + ' cm.', o, '2 · (' + a * b + ' + ' + a * c + ' + ' + b * c + ') = ' + o + ' cm²');
    }));
    sek.push(H.ek('syl', '🥫', 'Volum av sylinder (π = 3,14)', 8, 'Regn ut volumet. Bruk π = 3,14.', function (r) {
      const rr = r.int(1, lett ? 4 : 8), h = r.int(2, lett ? 6 : 12); const v = R(3.14 * rr * rr * h); return H.e('Sylinder med r = ' + rr + ' cm og h = ' + h + ' cm.', v, '3,14 · ' + rr * rr + ' · ' + h + ' = ' + M.fmt(v) + ' cm³');
    }));
    sek.push(H.ek('pyr', '🔺', 'Volum av pyramide', 6, 'Regn ut volumet ⅓ · G · h.', function (r) {
      const g = r.int(2, 12) * 3, h = r.int(2, 10); return H.e('Pyramide med grunnflate ' + g + ' cm² og høyde ' + h + ' cm.', g * h / 3, '⅓ · ' + g + ' · ' + h + ' = ' + g * h / 3 + ' cm³');
    }));
    sek.push(H.ek('liter', '🧴', 'Liter', 6, 'Hvor mange liter rommer kassa?', function (r) {
      const a = r.int(2, 8) * 5, b = r.int(2, 8) * 5, c = r.int(2, 8) * 2; const v = a * b * c / 1000; return H.e('Kasse ' + a + ' cm × ' + b + ' cm × ' + c + ' cm.', v, a + ' · ' + b + ' · ' + c + ' = ' + M.fmt(a * b * c) + ' cm³ = ' + M.fmt(v) + ' liter');
    }));
    return H.ekDef('Overflate og volum', sek);
  };
})();
