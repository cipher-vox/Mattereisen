/* ============================================================
   9. trinn: Pytagoras, Sidene i en trekant, Formlikhet i praksis
   Læreplan 9.3, 9.4 og 9.5
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, SJ, S, ord } = H;

  /* ================= PYTAGORAS ================= */
  const ORD1 = [
    ord(['rettvinklet', 'rettvinklet trekant'], 'En trekant med én vinkel på 90°.'),
    ord(['katet', 'kateter', 'katetene'], 'De to korte sidene i en rettvinklet trekant. De danner den rette vinkelen.'),
    ord(['hypotenus', 'hypotenusen'], 'Den lengste siden i en rettvinklet trekant. Den ligger rett overfor den rette vinkelen.'),
    ord(['kvadratrot', 'kvadratroten'], 'Tallet som ganget med seg selv gir tallet under rottegnet. √25 = 5.'),
    ord(['pytagoreisk trippel', 'trippel'], 'Tre hele tall som passer i Pytagoras: 3-4-5, 5-12-13, 8-15-17.'),
    ord(['læresetning', 'læresetningen'], 'En regel som er bevist og alltid stemmer.'),
    ord(['avstand'], 'Hvor langt det er mellom to punkter.')
  ];
  const U1 = [];
  U1.push(S('Den rette trekanten', '🔺', [
    P('En <strong>rettvinklet trekant</strong> har én vinkel på 90°. Sidene har egne navn. De to som danner den rette vinkelen heter <strong>kateter</strong>. Den lengste siden, rett overfor den rette vinkelen, heter <strong>hypotenusen</strong>.'),
    K([{ ikon: '📏', tittel: 'Katetene (a og b)', tekst: 'De to sidene som møtes i den rette vinkelen. De er kortere enn hypotenusen.' }, { ikon: '📐', tittel: 'Hypotenusen (c)', tekst: 'Den lengste siden. Alltid rett overfor 90°.' }]),
    C('tips', 'Hvor finner du dem?', 'Rett vinkel er som hjørnet på et ark. Sidene som danner hjørnet er katetene. Linja som «lukker» trekanten er hypotenusen.'),
    O(1, [
      V('Hva heter den lengste siden i en rettvinklet trekant?', ['Hypotenus', 'Katet', 'Diagonal', 'Radius'], 0, 'Den ligger rett overfor 90°.', 'Hypotenusen er den lengste siden.', true),
      V('Hvor mange kateter har en rettvinklet trekant?', ['2', '1', '3', '0'], 0, 'De danner den rette vinkelen.', 'To, a og b.', true),
      V('Hva er en rett vinkel?', ['90°', '45°', '180°', '60°'], 0, 'Hjørnet på et ark.', '90°.', true)
    ])
  ]));
  U1.push(S('Pytagoras’ læresetning', '🧮', [
    P('I en rettvinklet trekant gjelder alltid: <strong>a² + b² = c²</strong>. Tegn et kvadrat på hver side. Arealet av de to små kvadratene på katetene er <strong>til sammen like stort</strong> som arealet av kvadratet på hypotenusen.'),
    W('pytagoras', { a: 3, b: 4, tittel: 'Dra i katetene og se kvadratene' }),
    C('regel', 'Pytagoras', ['a² + b² = c²', 'a og b er katetene, c er hypotenusen.', 'Gjelder <strong>bare</strong> i rettvinklede trekanter.']),
    E('Katetene er 3 og 4. Finn hypotenusen.', ['a² + b² = c².', '3² + 4² = 9 + 16 = 25.', 'c² = 25, så c = 5 (siden 5 · 5 = 25). Svar: 5.']),
    O(2, [
      T('Katetene er 6 og 8. Hva er hypotenusen? (a² + b² = c²)', 10, '36 + 64 = 100.', '6² + 8² = 36 + 64 = 100. c = 10.'),
      T('Katetene er 5 og 12. Hva er hypotenusen?', 13, '25 + 144 = 169.', '5² + 12² = 169. c = 13.'),
      T('Katetene er 9 og 12. Hva er hypotenusen?', 15, '81 + 144 = 225.', '9² + 12² = 225. c = 15.'),
      T('Katetene er 8 og 15. Hva er hypotenusen?', 17, '64 + 225 = 289.', '8² + 15² = 289. c = 17.'),
      T('Hvilket tall ganget med seg selv gir 169?', 13, 'Prøv 12, 13, 14.', '13 · 13 = 169.')
    ])
  ]));
  U1.push(S('Finne en katet', '↩️', [
    P('Kjenner du hypotenusen og én katet, snur du formelen: <strong>a² = c² − b²</strong>. Husk å trekke fra, ikke legge til!'),
    E('Hypotenusen er 13 og den ene kateten er 5. Finn den andre.', ['b² = c² − a² = 13² − 5².', '169 − 25 = 144.', 'b = 12 (siden 12 · 12 = 144). Svar: 12.']),
    C('advarsel', 'Vanlig feil', 'Å legge sammen når du skal finne en katet. Hypotenusen er alltid lengst. Hvis svaret ditt for en katet er lengre enn hypotenusen, har du gjort feil.'),
    O(3, [
      T('Hypotenusen er 10 og den ene kateten er 6. Hva er den andre kateten?', 8, '100 − 36 = 64.', '10² − 6² = 64. b = 8.'),
      T('Hypotenusen er 17 og den ene kateten er 8. Hva er den andre?', 15, '289 − 64 = 225.', '17² − 8² = 225. b = 15.'),
      T('Hypotenusen er 25 og den ene kateten er 7. Hva er den andre?', 24, '625 − 49 = 576.', '25² − 7² = 576. b = 24 fordi 24 · 24 = 576.'),
      T('Hypotenusen er 15 og den ene kateten er 9. Hva er den andre?', 12, '225 − 81 = 144.', '15² − 9² = 144. b = 12.')
    ])
  ]));
  U1.push(S('Pytagoras i hverdagen', '🪜', [
    P('Pytagoras brukes når du skal finne en <strong>avstand</strong> eller en lengde i en situasjon med rett vinkel: stige mot vegg, diagonal i en rute, snarvei over en plen, avstand mellom to punkter i et koordinatsystem.'),
    E('En stige er 5 m lang. Foten står 3 m fra veggen. Hvor høyt opp på veggen når stigen?', ['Veggen og bakken danner en rett vinkel. Stigen er hypotenusen (5), og 3 er en katet.', 'h² = 5² − 3² = 25 − 9 = 16.', 'h = 4. Stigen når 4 meter opp.']),
    C('virkelighet', 'Murere og tømrere', 'En 3-4-5-trekant brukes for å sjekke at et hjørne er 90°. Mål 3 på ene siden, 4 på den andre. Hvis diagonalen er 5, er hjørnet rett.'),
    O(4, [
      T('En stige på 13 m står 5 m fra veggen. Hvor høyt opp når den?', 12, 'Stigen er hypotenusen.', '13² − 5² = 144, så h = 12 m.', 'm'),
      T('En rektangulær tomt er 12 m × 16 m. Hvor lang er diagonalen?', 20, '144 + 256 = 400.', '12² + 16² = 400. Diagonalen er 20 m.', 'm'),
      T('To punkter: (0, 0) og (6, 8). Hva er avstanden mellom dem?', 10, 'Katetene er 6 og 8.', '6² + 8² = 100, så avstanden er 10.'),
      T('Du går 9 m mot nord og så 12 m mot øst. Hvor langt er det i luftlinje tilbake?', 15, 'Bruk Pytagoras.', '9² + 12² = 225, så 15 m.', 'm'),
      T('Hver side i en rombe er 5 cm og den ene diagonalen er 6 cm. Diagonalene står 90° på hverandre og halverer hverandre. Hvor lang er den andre diagonalen?', 8, 'Halve diagonaler: 3 og x. Hypotenusen er 5.', 'Halve diagonaler 3 og x: x² = 25 − 9 = 16, x = 4. Hele diagonalen er 2 · 4 = 8 cm.', 'cm')
    ])
  ]));
  U1.push(S('Er trekanten rettvinklet?', '🕵️', [
    P('Pytagoras virker også baklengs. Hvis <strong>a² + b² = c²</strong> for de tre sidene, <strong>da er trekanten rettvinklet</strong>. Sjekk alltid med den lengste siden som c.'),
    E('Er en trekant med sidene 6, 8 og 10 rettvinklet?', ['Lengste side er 10, så c = 10.', '6² + 8² = 36 + 64 = 100.', '10² = 100. Det stemmer, så trekanten er rettvinklet.']),
    W('trekant', { a: 6, b: 8, c: 10, tittel: 'Prøv ulike sider' }),
    O(4, [
      V('Er trekanten med sidene 5, 12 og 13 rettvinklet?', ['Ja', 'Nei'], 0, '25 + 144 = ?', '5² + 12² = 169 = 13². Ja.', true),
      V('Er trekanten med sidene 6, 7 og 8 rettvinklet?', ['Nei', 'Ja'], 0, '36 + 49 = ?', '6² + 7² = 85, men 8² = 64. Ikke lik, så nei.', true),
      V('Er trekanten med sidene 9, 12 og 15 rettvinklet?', ['Ja', 'Nei'], 0, '81 + 144.', '9² + 12² = 225 = 15². Ja.', true),
      V('Er trekanten med sidene 4, 5 og 7 rettvinklet?', ['Nei', 'Ja'], 0, '16 + 25 = ?', '16 + 25 = 41, men 7² = 49. Nei.', true)
    ])
  ]));
  U1.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('Vis at en trekant med sidene 20, 21 og 29 er rettvinklet.', ['Den lengste siden er 29, så c = 29.', '20² + 21² = 400 + 441 = 841.', '29² = 841. Det stemmer, så trekanten er rettvinklet.']),
      F('Pytagoreiske tripler kan ganges. Vis at 3-4-5 og 6-8-10 begge virker, og forklar hvorfor.', ['3² + 4² = 25 = 5² og 6² + 8² = 100 = 10².', 'Trekanten 6-8-10 er 3-4-5 forstørret med målestokk 2.', 'Formlike trekanter har like vinkler, så den er også rettvinklet.']),
      F('Mia sier at en trekant med sidene 5, 6 og 7 er rettvinklet fordi 5 + 6 = 11 er større enn 7. Hva er feil?', ['Å sjekke 5 + 6 > 7 viser bare at tre lengder kan danne en trekant, ikke at den er rettvinklet.', 'Riktig test: 5² + 6² = 61, men 7² = 49.', 'De er ikke like, så trekanten er ikke rettvinklet.']),
      F('Forklar med ord hva Pytagoras sier om kvadratene på sidene.', ['Tegn kvadrater på hver av de tre sidene.', 'Arealet av kvadratet på hypotenusen er like stort som summen av arealene av kvadratene på de to katetene.', 'Det gjelder bare i rettvinklede trekanter.'])
    ]),
    SJ('Dette kan du nå', ['Peke ut katet og hypotenus', 'Bruke a² + b² = c²', 'Finne en katet', 'Bruke Pytagoras i hverdagen', 'Sjekke om en trekant er rettvinklet'])
  ]));
  M.register('utforsk', '9/pytagoras', {
    tittel: 'Pytagoras’ læresetning',
    ingress: 'I en rettvinklet trekant er kvadratene på katetene til sammen like store som kvadratet på hypotenusen. Du lærer å bruke det til å finne lengder og avstander.',
    mal: ['bruke og argumentere for Pytagoras’ læresetning', 'finne lengder og avstander i rettvinklede trekanter'], ordliste: ORD1, seksjoner: U1
  });
  const T1 = [];
  T1.push(S('Steg 1: Sidene', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('En rettvinklet trekant har en vinkel på 90°. De to sidene som møtes der heter <strong>kateter</strong>. Den lengste siden heter <strong>hypotenus</strong>.', true),
    OS([
      V('Hva heter den lengste siden?', ['Hypotenus', 'Katet'], 0, 'Den er rett overfor 90°.', 'Hypotenus.', true),
      V('Hvor mange kateter er det?', ['2', '1', '3'], 0, 'To sider danner den rette vinkelen.', 'I en rettvinklet trekant er det to kateter: de to sidene som danner den rette vinkelen. Den tredje siden er hypotenusen.', true)
    ])
  ]));
  T1.push(S('Steg 2: Pytagoras', '2', [
    G('Her er den berømte regelen.'),
    C('regel', 'Pytagoras', ['a² + b² = c²', 'a og b er kateter. c er hypotenus.', 'a² betyr a · a.']),
    W('pytagoras', { a: 3, b: 4, tittel: 'Kvadratene på sidene' }),
    E('Katetene er 3 og 4. Finn hypotenusen.', ['3² = 9 og 4² = 16.', '9 + 16 = 25.', 'Hvilket tall ganget med seg selv gir 25? 5. Svar: 5. 🎉']),
    OS([
      T('Katetene er 6 og 8. Hva er 6² + 8²?', 100, '36 + 64.', '36 + 64 = 100.'),
      T('Katetene er 6 og 8. Hva er hypotenusen?', 10, '10 · 10 = 100.', 'c² = 100, så c = 10.', 'cm'),
      T('Katetene er 5 og 12. Hva er hypotenusen?', 13, '25 + 144 = 169. 13 · 13 = ?', '25 + 144 = 169. 13 · 13 = 169. c = 13.')
    ])
  ]));
  T1.push(S('Steg 3: Finn en katet', '3', [
    G('Nå kjenner vi hypotenusen, og skal finne en katet.'),
    P('Da <strong>trekker</strong> vi fra: a² = c² − b².', true),
    E('c = 5 og b = 3. Finn a.', ['c² = 25 og b² = 9.', '25 − 9 = 16.', 'a = 4 siden 4 · 4 = 16. Svar: 4. 🎉']),
    OS([
      T('c = 10 og b = 6. Hva er a²? (100 − 36)', 64, '100 − 36.', '100 − 36 = 64.'),
      T('c = 10 og b = 6. Hva er a?', 8, '8 · 8 = 64.', 'a = 8.', 'cm'),
      T('c = 13 og b = 5. Hva er a?', 12, '169 − 25 = 144.', '169 − 25 = 144, så a = 12.')
    ])
  ]));
  T1.push(S('Steg 4: Stigen', '4', [
    G('Siste steg: Pytagoras i virkeligheten.'),
    E('En stige på 5 m står 3 m fra veggen. Hvor høyt når den?', ['Stigen er hypotenusen: 5. Avstanden til veggen er en katet: 3.', '25 − 9 = 16.', 'Høyden er 4 m. 🎉']),
    OS([
      T('En stige på 13 m står 5 m fra veggen. Hvor høyt når den?', 12, '169 − 25 = 144.', 'Høyden er 12 m.', 'm'),
      T('En tomt er 6 m × 8 m. Hvor lang er diagonalen?', 10, '36 + 64 = 100.', 'Diagonalen er 10 m.', 'm'),
      V('Er en trekant med sidene 3, 4 og 5 rettvinklet?', ['Ja', 'Nei'], 0, '9 + 16 = 25.', '3² + 4² = 25 = 5². Ja.', true)
    ]),
    SJ('Dette kan du nå', ['Si hva katet og hypotenus er', 'Bruke a² + b² = c²', 'Finne en katet', 'Bruke Pytagoras i hverdagen'])
  ]));
  M.register('steg', '9/pytagoras', {
    tittel: 'Pytagoras’ læresetning',
    ingress: 'Små steg: du lærer Pytagoras med tegninger og tydelige eksempler.',
    mal: ['bruke Pytagoras’ læresetning'], ordliste: ORD1, seksjoner: T1
  });
  M.ekstra['9/pytagoras'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    const TR = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
    sek.push(H.ek('hyp', '🔺', 'Finn hypotenusen', 8, 'Regn ut hypotenusen.', function (r) {
      const t = lett ? [3, 4, 5] : r.pick(TR); const k = r.int(1, lett ? 3 : 4);
      return H.e('Katetene er ' + t[0] * k + ' og ' + t[1] * k + '.', t[2] * k, M.fmt(t[0] * k) + '² + ' + M.fmt(t[1] * k) + '² = ' + M.fmt((t[0] * k) ** 2 + (t[1] * k) ** 2) + ', så c = ' + M.fmt(t[2] * k));
    }));
    sek.push(H.ek('kat', '📏', 'Finn en katet', 8, 'Regn ut den manglende kateten.', function (r) {
      const t = lett ? [3, 4, 5] : r.pick(TR); const k = r.int(1, lett ? 3 : 4);
      return H.e('Hypotenusen er ' + t[2] * k + ' og den ene kateten er ' + t[0] * k + '.', t[1] * k, M.fmt(t[2] * k) + '² − ' + M.fmt(t[0] * k) + '² = ' + M.fmt((t[1] * k) ** 2) + ', så katet = ' + M.fmt(t[1] * k));
    }));
    sek.push(H.ek('stige', '🪜', 'Stigen', 6, 'Hvor høyt når stigen?', function (r) {
      const t = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]); const k = lett ? 1 : r.int(1, 2);
      return H.e('En stige på ' + t[2] * k + ' m står ' + t[0] * k + ' m fra veggen. Hvor høyt når den (i meter)?', t[1] * k, M.fmt(t[2] * k) + '² − ' + M.fmt(t[0] * k) + '² = ' + M.fmt((t[1] * k) ** 2) + ', så ' + M.fmt(t[1] * k) + ' m');
    }));
    sek.push(H.ek('avst', '📍', 'Avstand mellom punkter', 6, 'Finn avstanden fra origo (0, 0) til punktet.', function (r) {
      const t = r.pick(TR.slice(0, 2)); const k = r.int(1, 3); return H.e('Punktet (' + t[0] * k + ', ' + t[1] * k + ')', t[2] * k, M.fmt(t[0] * k) + '² + ' + M.fmt(t[1] * k) + '² = ' + M.fmt((t[2] * k) ** 2) + ', så ' + M.fmt(t[2] * k));
    }));
    return H.ekDef('Pytagoras', sek);
  };

  /* ================= SIDENE I EN TREKANT ================= */
  const ORD2 = [
    ord(['trekantulikheten', 'trekantulikhet'], 'Regel: to sider i en trekant er til sammen alltid lengre enn den tredje siden.'),
    ord(['omkrets'], 'Summen av alle sidene i en figur.'),
    ord(['spissvinklet'], 'En trekant der alle vinklene er mindre enn 90°.'),
    ord(['stumpvinklet'], 'En trekant med en vinkel som er større enn 90°.'),
    ord(['rettvinklet'], 'En trekant med en vinkel på 90°.'),
    ord(['moteksempel'], 'Et eksempel som viser at en påstand ikke alltid stemmer.')
  ];
  const U2 = [];
  U2.push(S('Kan tre pinner bli en trekant?', '🥢', [
    P('Tenk deg tre pinner. Er det alltid mulig å lage en trekant? Nei! Hvis én pinne er <strong>veldig lang</strong>, rekker ikke de to andre til å nå hverandre.'),
    W('trekant', { a: 3, b: 4, c: 5, tittel: 'Dra i sidene og se når det går' }),
    C('regel', 'Trekantulikheten', ['De to korteste sidene må til sammen være <strong>lengre</strong> enn den lengste.', 'a + b &gt; c, når c er lengst.', 'Hvis summen er lik, blir trekanten helt flat (en strek).']),
    O(1, [
      V('Kan 3, 4 og 5 bli en trekant?', ['Ja', 'Nei'], 0, '3 + 4 = 7, og 7 er mer enn 5.', '3 + 4 = 7 > 5. Ja.', true),
      V('Kan 1, 2 og 5 bli en trekant?', ['Nei', 'Ja'], 0, '1 + 2 = 3, og 3 er mindre enn 5.', '1 + 2 = 3 < 5. Nei.', true),
      V('Kan 2, 4 og 6 bli en trekant?', ['Nei', 'Ja'], 0, '2 + 4 = 6, ikke mer enn 6.', '2 + 4 = 6, ikke mer enn 6. Trekanten blir flat. Nei.', true)
    ])
  ]));
  U2.push(S('Teste lengdene', '✅', [
    P('For å teste: legg sammen de <strong>to korteste</strong> sidene og sammenlikn med den lengste.'),
    E('Kan 7, 10 og 15 bli en trekant?', ['De to korteste: 7 og 10. 7 + 10 = 17.', 'Den lengste er 15.', '17 &gt; 15. Ja, det blir en trekant.']),
    O(2, [
      V('Kan 5, 6 og 12 bli en trekant?', ['Nei', 'Ja'], 0, '5 + 6 = 11.', '11 < 12, så nei.', true),
      V('Kan 8, 9 og 10 bli en trekant?', ['Ja', 'Nei'], 0, '8 + 9 = 17.', '17 > 10, så ja.', true),
      V('Kan 4, 4 og 8 bli en trekant?', ['Nei', 'Ja'], 0, '4 + 4 = 8.', '8 er ikke mer enn 8, så nei.', true),
      T('To sider er 5 og 8. Hva er den største hele lengden den tredje siden kan ha?', 12, 'Mindre enn 5 + 8 = 13.', 'Den må være mindre enn 13, så størst er 12.'),
      T('To sider er 5 og 8. Hva er den minste hele lengden den tredje siden kan ha?', 4, 'Mer enn 8 − 5 = 3.', 'Den må være mer enn 3, så minst er 4.')
    ])
  ]));
  U2.push(S('Hvor mange muligheter?', '🔢', [
    P('Er to sider gitt, så er det en <strong>grense</strong> for den tredje: den må være <strong>mer enn forskjellen</strong> og <strong>mindre enn summen</strong>.'),
    E('To sider er 5 og 8. Hvilke hele lengder kan den tredje siden ha?', ['Summen er 13, og forskjellen er 3.', 'Den tredje må være mer enn 3 og mindre enn 13.', 'Mulige hele tall: 4, 5, 6, 7, 8, 9, 10, 11, 12. Det er 9 muligheter.']),
    TAB(['Sider', 'Mer enn', 'Mindre enn'], [['5 og 8', '3', '13'], ['3 og 7', '4', '10'], ['6 og 6', '0', '12']]),
    O(3, [
      T('To sider er 3 og 7. Hvor mange hele lengder kan den tredje siden ha?', 5, 'Mer enn 4 og mindre enn 10.', 'Mer enn 4 og mindre enn 10: 5, 6, 7, 8, 9. Det er 5.'),
      T('To sider er 4 og 4. Hvor mange hele lengder kan den tredje siden ha?', 7, 'Mer enn 0 og mindre enn 8.', 'Tallene 1 til 7: 7 muligheter.'),
      T('Omkretsen skal være størst mulig med hele tall når to sider er 6 og 9. Hva blir omkretsen?', 29, 'Tredje side maks 14.', 'Tredje side må være mindre enn 15, så størst er 14. Omkrets 6 + 9 + 14 = 29.'),
      T('To sider er 10 og 12. Hva er den minste hele lengden for den tredje siden?', 3, 'Mer enn 2.', 'Den må være mer enn 12 − 10 = 2, så minst er 3.')
    ])
  ]));
  U2.push(S('Spiss, rett eller stump?', '📐', [
    P('Når tre lengder kan bli en trekant, kan vi også si hvilken <strong>type</strong> det blir. Sammenlikn a² + b² med c², der c er lengst.'),
    TAB(['Sammenlikning', 'Type trekant'], [['a² + b² = c²', 'Rettvinklet (90°)'], ['a² + b² > c²', 'Spissvinklet (alle vinkler under 90°)'], ['a² + b² < c²', 'Stumpvinklet (én vinkel over 90°)']]),
    E('Hva slags trekant er 4, 5 og 6?', ['c = 6. a² + b² = 16 + 25 = 41.', 'c² = 36.', '41 &gt; 36, så den er spissvinklet.']),
    O(4, [
      V('Hva slags trekant er 5, 6 og 7?', ['Spissvinklet', 'Rettvinklet', 'Stumpvinklet', 'Ingen trekant'], 0, '25 + 36 = 61 og 49.', '61 > 49: spissvinklet.', true),
      V('Hva slags trekant er 3, 4 og 6?', ['Stumpvinklet', 'Rettvinklet', 'Spissvinklet', 'Ingen trekant'], 0, '9 + 16 = 25 og 36.', '25 < 36: stumpvinklet.', true),
      V('Hva slags trekant er 9, 12 og 15?', ['Rettvinklet', 'Spissvinklet', 'Stumpvinklet', 'Ingen trekant'], 0, '81 + 144 = 225.', '225 = 15²: rettvinklet.', true)
    ])
  ]));
  U2.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('Lag tre hele tall som ikke kan være sider i en trekant, og forklar hvorfor.', ['Eksempel: 2, 3 og 10.', '2 + 3 = 5, og 5 er ikke mer enn 10.', 'De to korteste rekker ikke til den lengste, så det blir ingen trekant.']),
      F('Påstand: «Hvis tre lengder kan danne en trekant, kan alle lengdene dobles og fortsatt danne en trekant.» Stemmer det? Argumenter.', ['Hvis a + b > c, så er 2a + 2b > 2c.', 'Det dobler begge sider av ulikheten, så den er fortsatt sann.', 'Påstanden stemmer: formlike trekanter.']),
      F('Du vet at to sider er 7 og 7 (likebeint). Hva er det største hele tallet den tredje kan være? Hva er det minste?', ['Må være mindre enn 14, så størst er 13.', 'Må være mer enn 0, så minst er 1.', 'Altså 1 til 13.'])
    ]),
    SJ('Dette kan du nå', ['Teste om tre lengder kan bli en trekant', 'Finne grenser for den tredje siden', 'Avgjøre om trekanten er spiss, rett eller stump', 'Argumentere med moteksempel'])
  ]));
  M.register('utforsk', '9/trekanter', {
    tittel: 'Sidene i en trekant',
    ingress: 'Ikke alle lengder kan danne en trekant. Du utforsker hvorfor, og lærer å teste og argumentere.',
    mal: ['utforske, beskrive og argumentere for sammenhenger mellom sidelengdene i trekanter'], ordliste: ORD2, seksjoner: U2
  });
  const T2 = [];
  T2.push(S('Steg 1: Pinner', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Du har tre pinner og vil lage en trekant. Hvis én pinne er altfor lang, går det ikke.', true),
    W('trekant', { a: 3, b: 4, c: 5, tittel: 'Dra i sidene' }),
    C('regel', 'Regelen', ['To korte sider må til sammen være <strong>lengre</strong> enn den lengste siden.', 'Eksempel: 3 + 4 = 7, og 7 er mer enn 5. Det går!']),
    OS([
      V('3, 4 og 5: går det an å lage en trekant?', ['Ja', 'Nei'], 0, '3 + 4 = 7. Er 7 mer enn 5?', '7 er mer enn 5. Ja.', true),
      V('1, 2 og 6: går det an å lage en trekant?', ['Nei', 'Ja'], 0, '1 + 2 = 3. Er 3 mer enn 6?', '3 er ikke mer enn 6. Nei.', true)
    ])
  ]));
  T2.push(S('Steg 2: Test selv', '2', [
    G('Slik tester du: legg sammen de to korteste. Sammenlikn med den lengste.'),
    E('Kan 4, 5 og 8 bli en trekant?', ['De to korteste: 4 + 5 = 9.', 'Den lengste er 8.', '9 er mer enn 8. Ja! 🎉']),
    OS([
      T('Hva er 5 + 6? (to korteste av 5, 6 og 12)', 11, '5 + 6.', '5 + 6 = 11.'),
      V('Kan 5, 6 og 12 bli en trekant?', ['Nei', 'Ja'], 0, '11 er mindre enn 12.', '11 < 12, så nei.', true),
      V('Kan 6, 7 og 9 bli en trekant?', ['Ja', 'Nei'], 0, '6 + 7 = 13. Mer enn 9?', '13 > 9, så ja.', true)
    ])
  ]));
  T2.push(S('Steg 3: Største lengde', '3', [
    G('To sider er gitt. Hvor lang kan den tredje maks være?'),
    P('Den må være <strong>mindre enn summen</strong> av de to andre.', true),
    E('To sider er 4 og 6. Hva er den største hele lengden den tredje kan ha?', ['4 + 6 = 10.', 'Den må være mindre enn 10.', 'Største hele tall er 9. 🎉']),
    OS([
      T('To sider er 3 og 5. Den tredje må være mindre enn…?', 8, '3 + 5.', '3 + 5 = 8.'),
      T('To sider er 3 og 5. Hva er den største hele lengden den tredje kan ha?', 7, 'Mindre enn 8.', 'Størst er 7.'),
      T('To sider er 6 og 6. Hva er den største hele lengden den tredje kan ha?', 11, 'Mindre enn 12.', 'Størst er 11.')
    ]),
    SJ('Dette kan du nå', ['Teste om tre lengder kan bli en trekant', 'Finne største lengde på tredje side'])
  ]));
  M.register('steg', '9/trekanter', {
    tittel: 'Sidene i en trekant',
    ingress: 'Små steg: Når kan tre lengder bli en trekant? Du tester med pinner og tall.',
    mal: ['teste om tre lengder kan bli en trekant'], ordliste: ORD2, seksjoner: T2
  });
  M.ekstra['9/trekanter'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('maks', '⬆️', 'Største tredje side', 8, 'Største hele lengde for den tredje siden.', function (r) {
      const a = r.int(2, 10), b = r.int(2, 10); return H.e('To sider er ' + a + ' og ' + b + '.', a + b - 1, 'Må være mindre enn ' + (a + b) + '. Størst: ' + (a + b - 1));
    }));
    sek.push(H.ek('min', '⬇️', 'Minste tredje side', 8, 'Minste hele lengde for den tredje siden.', function (r) {
      const a = r.int(lett ? 3 : 2, 12), b = r.int(2, 12); const d = Math.abs(a - b);
      return H.e('To sider er ' + a + ' og ' + b + '.', d + 1, 'Må være mer enn ' + d + '. Minst: ' + (d + 1));
    }));
    sek.push(H.ek('ant', '🔢', 'Antall muligheter', 6, 'Hvor mange hele lengder kan den tredje siden ha?', function (r) {
      const a = r.int(2, 9), b = r.int(2, 9); const lo = Math.abs(a - b) + 1, hi = a + b - 1;
      return H.e('To sider er ' + a + ' og ' + b + '.', hi - lo + 1, 'Fra ' + lo + ' til ' + hi + ': ' + (hi - lo + 1) + ' muligheter');
    }));
    sek.push(H.ek('omk', '〰️', 'Omkrets', 5, 'Største hele omkrets.', function (r) {
      const a = r.int(2, 9), b = r.int(2, 9); return H.e('To sider er ' + a + ' og ' + b + '. Hva er den største hele omkretsen?', 2 * (a + b) - 1, 'Tredje side maks ' + (a + b - 1) + ', så omkrets ' + (a + b) + ' + ' + (a + b - 1) + ' = ' + (2 * (a + b) - 1));
    }));
    return H.ekDef('Sidene i en trekant', sek);
  };

  /* ================= FORMLIKHET I PRAKSIS ================= */
  const ORD3 = [
    ord(['målestokk'], 'Forholdet mellom en lengde på tegningen og i virkeligheten. 1 : 100 betyr at 1 cm er 100 cm.'),
    ord(['skalafaktor', 'forstørringsfaktor'], 'Tallet k som alle lengder ganges med i formlike figurer.'),
    ord(['forutsetning', 'forutsetninger'], 'Det du antar at gjelder når du regner.'),
    ord(['areal'], 'Hvor mye flate figuren dekker. Måles i kvadratenheter.'),
    ord(['volum'], 'Hvor mye plass en kropp tar. Måles i kubikkenheter.'),
    ord(['skygge', 'skyggen'], 'Der lyset ikke kommer til. Lengden på skyggen er proporsjonal med høyden.')
  ];
  const U3 = [];
  U3.push(S('Målestokk og kart', '🗺️', [
    P('På et kart eller en tegning er alt <strong>forminsket</strong> med samme tall. Dette tallet er <strong>målestokken</strong>. «1 : 50 000» betyr at 1 cm på kartet er 50 000 cm = 500 m i virkeligheten.'),
    TAB(['Målestokk', '1 cm på kartet er', 'Passer til'], [['1 : 100', '1 m', 'Plantegning av hus'], ['1 : 1000', '10 m', 'Tomtekart'], ['1 : 50 000', '500 m', 'Turkart'], ['1 : 1 000 000', '10 km', 'Veikart']]),
    E('Et turkart har målestokk 1 : 50 000. To steder er 4 cm fra hverandre på kartet. Hvor langt er det i virkeligheten?', ['4 cm · 50 000 = 200 000 cm.', '100 000 cm = 1 km, så 200 000 cm = 2 km.', 'Svar: 2 km.']),
    O(2, [
      T('Målestokk 1 : 100. En vegg er 5 cm på tegningen. Hvor mange cm er den i virkeligheten?', 500, 'Gang med 100.', '5 · 100 = 500 cm.', 'cm'),
      T('Målestokk 1 : 1000. To hus er 7 cm fra hverandre på tegningen. Hvor mange meter er det i virkeligheten?', 70, '7 · 1000 = 7000 cm.', '7000 cm = 70 m.', 'm'),
      T('Målestokk 1 : 50 000. Hvor mange km er 6 cm på kartet?', 3, '6 · 50 000 = 300 000 cm.', '300 000 cm = 3 km.', 'km'),
      T('En bil er 4 m lang. En modell har målestokk 1 : 20. Hvor lang er modellen i cm?', 20, '4 m = 400 cm.', '400 ÷ 20 = 20 cm.', 'cm')
    ])
  ]));
  U3.push(S('Skygger og høyder', '🌳', [
    P('Formlikhet lar oss måle ting vi ikke rekker opp til. Solen lager <strong>formlike trekanter</strong>: en stang og skyggen dens, og et tre og skyggen dens. Samme tidspunkt gir samme vinkel.'),
    E('En 2 m lang stang har 3 m skygge. Samtidig har et tre 12 m skygge. Hvor høyt er treet?', ['Målestokk: 12 ÷ 3 = 4, siden skyggen ble 4 ganger så lang.', 'Treet er også 4 ganger så høyt: 2 · 4 = 8.', 'Svar: 8 m.']),
    C('virkelighet', 'Gamle triks', 'Slik målte grekerne høyden på pyramidene: de ventet til skyggen til en stokk var like lang som stokken.'),
    O(3, [
      T('En 1 m lang stav har 2 m skygge. Et tårn har 30 m skygge. Hvor høyt er tårnet?', 15, 'Hvor mange ganger lengre er tårnets skygge enn stavens?', 'Skyggen er 30 ÷ 2 = 15 ganger lengre, så tårnet er 1 · 15 = 15 m høyt.', 'm'),
      T('Ei jente på 1,5 m har 2 m skygge. En flaggstang har 8 m skygge. Hvor høy er flaggstangen?', 6, 'k = 4.', 'k = 8 ÷ 2 = 4, så 1,5 · 4 = 6 m.', 'm'),
      T('En stolpe på 4 m har 6 m skygge. Hvor lang er skyggen til en 10 m høy stolpe?', 15, 'k = 10 ÷ 4 = 2,5.', 'k = 2,5, så 6 · 2,5 = 15 m.', 'm')
    ])
  ]));
  U3.push(S('Når alt dobles: lengde, areal og volum', '📦', [
    P('Hva skjer når du forstørrer en figur med målestokk <strong>k</strong>? Lengder blir k ganger så store. <strong>Areal</strong> blir <strong>k²</strong> ganger så stort. <strong>Volum</strong> blir <strong>k³</strong> ganger så stort.'),
    W('formlikhet', { a: 3, b: 2, k: 2, tittel: 'Se hva som skjer med omkrets og areal' }),
    TAB(['Størrelse', 'Forstørres med k = 3', 'Faktor'], [['Lengde, omkrets', '3 ganger', 'k = 3'], ['Areal', '9 ganger', 'k² = 9'], ['Volum', '27 ganger', 'k³ = 27']]),
    E('Et kvadrat har side 2 og areal 4. Du dobler sidene. Hva blir arealet?', ['k = 2, så arealet blir k² = 4 ganger så stort.', '4 · 4 = 16.', 'Kontroll: ny side 4, 4 · 4 = 16. ✓']),
    C('advarsel', 'Vanlig feil', 'Mange tror at dobbel lengde gir dobbelt areal. Nei: dobbel lengde gir <strong>fire ganger</strong> så stort areal.'),
    O(4, [
      T('En figur har areal 5 cm². Målestokken er 3. Hva blir arealet?', 45, 'k² = 9.', '5 · 9 = 45 cm².', 'cm²'),
      T('En kube har volum 10 cm³. Alle lengder dobles (k = 2). Hva blir volumet?', 80, 'k³ = 8.', '10 · 8 = 80 cm³.', 'cm³'),
      T('Omkretsen til en trekant er 12 cm. Målestokken er 5. Hva blir omkretsen?', 60, 'Omkrets er en lengde.', '12 · 5 = 60 cm.', 'cm'),
      T('Arealet er 20 m². Du forminsker til halve lengder (k = 0,5). Hva blir arealet?', 5, 'k² = 0,25.', '20 · 0,25 = 5 m².', 'm²'),
      V('En pizza har diameter 20 cm. En annen har diameter 40 cm. Hvor mange ganger mer pizza er den store?', ['4 ganger', '2 ganger', '8 ganger', '3 ganger'], 0, 'Det er areal.', 'k = 2, så arealet er k² = 4 ganger så stort.')
    ])
  ]));
  U3.push(S('Endrede forutsetninger', '🔁', [
    P('I praktiske problemer endrer ting seg. Hva skjer med svaret hvis du <strong>endrer en forutsetning</strong>? For eksempel: hva hvis veggen er litt lengre, eller stigen litt kortere?'),
    E('En rektangulær hage er 4 m × 6 m (areal 24 m²). Du gjør begge sidene 1 m lengre. Hvor mye øker arealet?', ['Ny hage: 5 m × 7 m = 35 m².', 'Økning: 35 − 24 = 11 m².', 'Svar: 11 m². (Legg merke til at arealet ikke økte med 1.)']),
    E('En stige på 5 m står 3 m fra veggen og når 4 m opp. Du flytter foten 1 m lenger ut (4 m fra veggen). Hvor høyt når stigen nå?', ['Høyde² = 25 − 16 = 9.', 'Høyde = 3.', 'Stigen når 3 m. Den sank 1 m.']),
    O(5, [
      T('En rektangulær tomt er 10 m × 20 m. Du gjør begge sidene 5 m lengre. Hva blir det nye arealet? (15 · 25)', 375, 'Regn 15 · 25.', '15 · 25 = 375 m².', 'm²'),
      T('En stige på 13 m står først 5 m fra veggen (og når 12 m opp). Du flytter foten ut til 12 m fra veggen. Hvor høyt når stigen nå?', 5, 'Hypotenusen er fortsatt 13.', '13² − 12² = 169 − 144 = 25, så høyden er 5 m. Når foten flyttes ut, sank stigen 7 m.', 'm'),
      V('En trekant har sider 3, 4 og 5. Hvis du øker alle sidene med 1 (4, 5, 6), er den fortsatt rettvinklet?', ['Nei', 'Ja'], 0, '16 + 25 = 41 og 36.', '4² + 5² = 41, men 6² = 36. Nei.', true),
      V('En trekant har sider 3, 4 og 5. Hvis du dobler alle sidene (6, 8, 10), er den fortsatt rettvinklet?', ['Ja', 'Nei'], 0, '36 + 64 = 100.', '6² + 8² = 100 = 10². Ja. Den er formlik.', true),
      F('Et rom er 4 m × 5 m. Hvis du dobler begge sidene, hva skjer med arealet? Forklar.', ['Arealet var 4 · 5 = 20 m².', 'Nytt rom er 8 m × 10 m = 80 m².', '80 ÷ 20 = 4. Arealet blir 4 ganger så stort (k² = 2² = 4), ikke 2 ganger.'])
    ]),
    SJ('Dette kan du nå', ['Bruke målestokk på kart og tegninger', 'Bruke formlikhet til å måle høyder', 'Regne med k, k² og k³', 'Vurdere hva som skjer når en forutsetning endres'])
  ]));
  M.register('utforsk', '9/formlikhet-praksis', {
    tittel: 'Formlikhet i praksis og endrede forutsetninger',
    ingress: 'Du bruker formlikhet på kart, skygger og modeller, og utforsker hva som skjer med lengde, areal og volum når noe endres.',
    mal: ['bruke formlikhet i praktiske situasjoner', 'utforske hvordan endrede forutsetninger påvirker løsninger'], ordliste: ORD3, seksjoner: U3
  });
  const T3 = [];
  T3.push(S('Steg 1: Målestokk', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('På et kart er alt mindre. <strong>1 : 100</strong> betyr: 1 cm på tegningen er 100 cm i virkeligheten.', true),
    E('Målestokk 1 : 100. En vegg er 5 cm på tegningen. Hvor lang er den i virkeligheten?', ['Gang med 100.', '5 · 100 = 500 cm.', '500 cm = 5 m. 🎉']),
    OS([
      T('Målestokk 1 : 10. En strek er 4 cm. Hvor mange cm i virkeligheten?', 40, '4 · 10.', '4 · 10 = 40 cm.', 'cm'),
      T('Målestokk 1 : 100. En strek er 3 cm. Hvor mange cm i virkeligheten?', 300, '3 · 100.', '3 · 100 = 300 cm.', 'cm'),
      T('Målestokk 1 : 100. En strek er 6 cm. Hvor mange meter i virkeligheten? (100 cm = 1 m)', 6, '600 cm.', '600 cm = 6 m.', 'm')
    ])
  ]));
  T3.push(S('Steg 2: Skygger', '2', [
    G('Solen lager like trekanter. Det kan vi bruke!'),
    E('En 2 m stang har 3 m skygge. Et tre har 6 m skygge. Hvor høyt er treet?', ['Skyggen er 2 ganger så lang (6 ÷ 3).', 'Treet er 2 ganger så høyt: 2 · 2.', 'Treet er 4 m. 🎉']),
    OS([
      T('Skyggen til treet er 2 ganger så lang som skyggen til stangen. Stangen er 3 m. Hvor høyt er treet?', 6, '3 · 2.', '3 · 2 = 6 m.', 'm'),
      T('En 1 m stav har 2 m skygge. Et hus har 10 m skygge. Hvor høyt er huset?', 5, 'Hvor mange ganger lengre er husets skygge enn stavens?', 'Skyggen er 10 ÷ 2 = 5 ganger lengre, så huset er 1 · 5 = 5 m høyt.', 'm')
    ])
  ]));
  T3.push(S('Steg 3: Dobbel størrelse', '3', [
    G('Hva skjer når alt blir dobbelt så langt?'),
    C('regel', 'Husk', ['Lengde: 2 ganger.', 'Areal: 4 ganger (2 · 2).', 'Volum: 8 ganger (2 · 2 · 2).']),
    E('Et kvadrat har side 3 og areal 9. Du dobler sidene til 6. Hva blir arealet?', ['Ny side er 6.', '6 · 6 = 36.', 'Arealet ble 4 ganger så stort. 🎉']),
    OS([
      T('Et kvadrat har side 2. Hva er arealet?', 4, '2 · 2.', '2 · 2 = 4.'),
      T('Du dobler siden til 4. Hva er det nye arealet?', 16, '4 · 4.', '4 · 4 = 16.'),
      T('Hvor mange ganger større ble arealet? (16 ÷ 4)', 4, '16 ÷ 4.', '16 ÷ 4 = 4.')
    ]),
    SJ('Dette kan du nå', ['Bruke målestokk', 'Bruke skygger til å finne høyder', 'Vite at areal øker med k²'])
  ]));
  M.register('steg', '9/formlikhet-praksis', {
    tittel: 'Formlikhet i praksis og endrede forutsetninger',
    ingress: 'Små steg: målestokk, skygger og hva som skjer med arealet når en figur blir større.',
    mal: ['bruke målestokk', 'forstå hva som skjer med areal'], ordliste: ORD3, seksjoner: T3
  });
  M.ekstra['9/formlikhet-praksis'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('kart', '🗺️', 'Målestokk', 8, 'Regn ut lengden i virkeligheten (i cm).', function (r) {
      const m = r.pick([10, 20, 50, 100]), x = r.int(2, 12); return H.e('Målestokk 1 : ' + m + '. En strek er ' + x + ' cm på tegningen.', x * m, x + ' · ' + m + ' = ' + M.fmt(x * m) + ' cm');
    }));
    sek.push(H.ek('sky', '🌳', 'Skygger', 6, 'Finn høyden.', function (r) {
      const k = r.int(2, 6), h = r.int(1, 4), s = r.int(2, 5); return H.e('En ' + h + ' m stang har ' + s + ' m skygge. Samtidig har et tre ' + s * k + ' m skygge. Hvor høyt er treet (m)?', h * k, 'k = ' + s * k + ' ÷ ' + s + ' = ' + k + ', så ' + h + ' · ' + k + ' = ' + h * k + ' m');
    }));
    sek.push(H.ek('areal', '⬛', 'Areal og k²', 8, 'Regn ut det nye arealet.', function (r) {
      const k = r.int(2, lett ? 3 : 5), a = r.int(2, 10); return H.e('Arealet er ' + a + ' cm². Målestokken er ' + k + '. Hva blir det nye arealet?', a * k * k, a + ' · ' + k + '² = ' + a + ' · ' + k * k + ' = ' + a * k * k + ' cm²');
    }));
    sek.push(H.ek('vol', '🧊', 'Volum og k³', 5, 'Regn ut det nye volumet.', function (r) {
      const k = r.int(2, 4), v = r.int(1, 9); return H.e('Volumet er ' + v + ' cm³. Målestokken er ' + k + '. Hva blir det nye volumet?', v * k * k * k, v + ' · ' + k + '³ = ' + v + ' · ' + k * k * k + ' = ' + v * k * k * k + ' cm³');
    }));
    return H.ekDef('Formlikhet i praksis', sek);
  };
})();
