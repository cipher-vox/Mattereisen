/* ============================================================
   Tema: Ulikheter (8. trinn) – UTFORSK + STEG + EKSTRA
   Læreplan 8.7: bruke ulike strategier for å løse ulikheter og
   vurdere om løsninger er gyldige
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, H2, SJ, S, ord } = H;
  const ORD = [
    ord(['ulikhet', 'ulikheter', 'ulikheten'], 'To uttrykk med < , > , ≤ eller ≥ mellom. Den har ofte mange løsninger.'),
    ord(['løsning', 'løsninger', 'løsningsmengde'], 'Alle tallene som gjør ulikheten sann.'),
    ord(['større enn'], 'Tegnet >. 7 > 3 betyr at 7 er større enn 3.'),
    ord(['mindre enn'], 'Tegnet <. 3 < 7 betyr at 3 er mindre enn 7.'),
    ord(['større enn eller lik'], 'Tegnet ≥. x ≥ 5 betyr at x kan være 5 eller større.'),
    ord(['mindre enn eller lik'], 'Tegnet ≤. x ≤ 5 betyr at x kan være 5 eller mindre.'),
    ord(['åpen sirkel', 'åpen ring'], 'På tallinja: tallet er ikke med. Brukes for < og >.'),
    ord(['fylt sirkel', 'lukket sirkel', 'fylt ring'], 'På tallinja: tallet er med. Brukes for ≤ og ≥.'),
    ord(['gyldig', 'gyldige'], 'En løsning er gyldig hvis den også gir mening i situasjonen, for eksempel et helt antall.')
  ];

  /* ====================== UTFORSK ====================== */
  const U = [];
  U.push(S('Mer enn, mindre enn', '↔️', [
    P('En ligning har ofte <strong>én</strong> løsning. En <strong>ulikhet</strong> har ofte <strong>mange</strong>. Se på ulikheten <strong>x &gt; 4</strong>. Alle tall større enn 4 passer: 5, 6, 10, 4,5, 100 … Det er uendelig mange.'),
    TAB(['Tegn', 'Betyr', 'Eksempel', 'Er 5 med?'], [['<', 'mindre enn', 'x < 5', 'Nei'], ['≤', 'mindre enn eller lik', 'x ≤ 5', 'Ja'], ['>', 'større enn', 'x > 5', 'Nei'], ['≥', 'større enn eller lik', 'x ≥ 5', 'Ja']]),
    C('tips', 'Husketrikset', 'Tegnet åpner seg mot det største tallet, som en munn som vil sluke det: 7 &gt; 3. Streken under (≤, ≥) betyr «eller lik».'),
    W('ulikhet', { a: 4, op: '>', t: 6, tittel: 'Utforsk ulikhet på tallinja' }),
    O(1, [
      V('Er x = 6 en løsning på x > 4?', ['Ja', 'Nei'], 0, 'Er 6 større enn 4?', '6 er større enn 4.', true),
      V('Er x = 4 en løsning på x > 4?', ['Nei', 'Ja'], 0, 'Er 4 større enn 4?', '4 er ikke større enn 4. (Hadde det stått ≥, hadde 4 vært med.)', true),
      V('Er x = 4 en løsning på x ≥ 4?', ['Ja', 'Nei'], 0, '≥ betyr «større enn eller lik».', '4 er lik 4, så det er med.', true),
      V('Hvilket av disse tallene er en løsning på x < 3?', ['−1', '3', '5', '10'], 0, 'Du trenger et tall mindre enn 3.', '−1 er mindre enn 3. De andre er 3 eller større.'),
      T('Hvor mange hele tall fra 1 til 10 er løsning på x > 6?', 4, 'Tallene 7, 8, 9, 10.', '7, 8, 9 og 10. Det er 4.')
    ])
  ]));

  U.push(S('Ulikheter på tallinja', '📏', [
    P('Vi viser løsningene på <strong>tallinja</strong>. Vi bruker en <strong>sirkel</strong> ved grensetallet og en <strong>pil</strong> i retningen løsningene ligger.'),
    K([{ ikon: '⚪', tittel: 'Åpen sirkel', tekst: 'Brukes for &lt; og &gt;. Grensetallet er <strong>ikke</strong> med.' }, { ikon: '⚫', tittel: 'Fylt sirkel', tekst: 'Brukes for ≤ og ≥. Grensetallet er <strong>med</strong>.' }]),
    W('ulikhet', { a: 2, op: '≥', t: 2, tittel: 'Prøv ulike tegn og grensetall' }),
    E('Vis x ≤ 3 på tallinja.', ['Tegn en fylt sirkel på 3, fordi 3 er med.', 'Løsningene er alle tall som er 3 eller mindre. Tegn pil mot venstre.', 'Tallene 3, 2, 1, 0, −1 … er løsninger.']),
    O(2, [
      V('Hva viser en åpen sirkel på tallinja?', ['Tallet er ikke med', 'Tallet er med', 'Tallet er negativt', 'Tallet er null'], 0, 'Åpen er «tom».', 'En åpen sirkel betyr at grensetallet ikke er med.', true),
      V('Hvilken retning går pila for x > 5?', ['Mot høyre', 'Mot venstre', 'Ingen', 'Opp'], 0, 'Større tall ligger til høyre.', 'Større enn 5 ligger til høyre for 5.', true),
      V('Hvilken ulikhet passer til en fylt sirkel på 2 og pil mot venstre?', ['x ≤ 2', 'x < 2', 'x ≥ 2', 'x > 2'], 0, 'Fylt betyr «med». Venstre betyr mindre.', 'Fylt sirkel: ≤ eller ≥. Venstre: mindre. Altså x ≤ 2.'),
      V('Hvilken ulikhet passer til en åpen sirkel på −1 og pil mot høyre?', ['x > −1', 'x ≥ −1', 'x < −1', 'x ≤ −1'], 0, 'Åpen: ikke med. Høyre: større.', 'Åpen sirkel og høyre: x > −1.')
    ])
  ]));

  U.push(S('Løse ulikheter', '🧮', [
    P('Du kan løse ulikheter <strong>nesten som ligninger</strong>. Det du gjør på ene siden, gjør du på den andre. Tegnet beholdes.'),
    E('Løs x + 3 < 10.', ['Trekk fra 3 på begge sider.', 'x < 7.', 'Løsningene er alle tall mindre enn 7. Sjekk: x = 6 gir 6 + 3 = 9 < 10 ✓.']),
    E('Løs 2x − 1 ≥ 9.', ['Legg til 1 på begge sider: 2x ≥ 10.', 'Del på 2: x ≥ 5.', 'Sjekk: x = 5 gir 2 · 5 − 1 = 9 ≥ 9 ✓. x = 4 gir 7, som er for lite.']),
    C('regel', 'Slik gjør du', ['1. Behandle ulikheten som en ligning: fjern pluss/minus, så del/gang.', '2. Behold ulikhetstegnet.', '3. Sjekk med et tall inni løsningen og et tall utenfor.']),
    C('advarsel', 'Spesialregel (kommer senere på 9.–10. trinn)', 'Hvis du ganger eller deler med et <strong>negativt tall</strong>, må du snu ulikhetstegnet. Hvorfor? 2 &lt; 5, men −2 &gt; −5. Kontroller alltid ved å teste.'),
    O(3, [
      T('Løs x + 4 < 11. Hva er det største hele tallet som passer?', 6, 'x < 7.', 'x < 7, så det største hele tallet er 6.'),
      T('Løs 2x ≥ 12. Hva er det minste hele tallet som passer?', 6, 'x ≥ 6.', 'x ≥ 6, så minste er 6.'),
      T('Løs 3x − 2 < 13. Hva er det største hele tallet som passer?', 4, '3x < 15, så x < 5.', 'x < 5, så største hele tall er 4.'),
      T('Løs 5x + 1 ≥ 21. Hva er det minste hele tallet som passer?', 4, '5x ≥ 20.', 'x ≥ 4, så minste er 4.'),
      T('Løs x − 6 > 2. Hva er det minste hele tallet som passer?', 9, 'x > 8.', 'x > 8 (8 er ikke med), så minste hele tall er 9.'),
      T('Løs 4x < 18. Hva er det største hele tallet som passer?', 4, 'x < 4,5.', 'x < 4,5, så største hele tall er 4.'),
      V('Hvilken løsning er riktig for x + 5 ≤ 12?', ['x ≤ 7', 'x ≥ 7', 'x < 7', 'x > 17'], 0, 'Trekk fra 5.', 'x ≤ 7. Tegnet beholdes.')
    ])
  ]));

  U.push(S('Ulikheter i hverdagen', '🛒', [
    P('Ulikheter passer når du har en <strong>grense</strong>: «maks 100 kr», «minst 3 poeng», «under 60 km/t».'),
    E('Du har 100 kr. En bok koster 25 kr og hver kaffe koster 15 kr. Hvor mange kaffer kan du kjøpe?', ['x kaffer koster 15x. Totalen er 25 + 15x, og den må være maks 100.', '25 + 15x ≤ 100.', '15x ≤ 75, så x ≤ 5.', 'Svar: maks 5 kaffer.']),
    C('tips', 'Vurder om svaret er gyldig', ['Antall må være et <strong>helt</strong> tall.', 'Antall kan ikke være <strong>negativt</strong>.', 'Hvis x ≤ 5,6, er det største gyldige antallet 5.']),
    O(4, [
      T('Du har 200 kr. Hver kinobillett koster 70 kr. Hvor mange billetter kan du kjøpe?', 2, '70x ≤ 200.', 'x ≤ 2,86. Du kan bare kjøpe hele billetter, så maks 2.'),
      T('Et abonnement koster 99 kr + 3 kr per GB. Du vil bruke maks 150 kr. Hvor mange GB kan du bruke?', 17, '3x + 99 ≤ 150.', '3x ≤ 51, så x ≤ 17 GB.', 'GB'),
      T('For å bestå må du ha minst 24 poeng. Du har 15 poeng etter første del. Hvor mange poeng må du minst få på neste del?', 9, '15 + x ≥ 24.', 'x ≥ 9 poeng.', 'poeng'),
      T('Heisen tåler maks 400 kg. Fire like bokser veier hver x kg, og du står i heisen med 80 kg. Hva er maks vekt per boks (hele kg)?', 80, '80 + 4x ≤ 400.', '4x ≤ 320, så x ≤ 80 kg.', 'kg'),
      F('Ei jente har 50 kr og vil kjøpe pizzabiter til 12 kr stykket. Ulikheten gir x ≤ 4,17. Hvorfor er det ikke 4,17 biter hun kan kjøpe? Hva er riktig svar?', ['Man kan ikke kjøpe en brøkdel av en pizzabit hvis de selges hele.', 'Løsningen x ≤ 4,17 betyr at x må være 4,17 eller mindre, og siden x må være et helt tall, er det største antallet 4.', 'Sjekk: 4 · 12 = 48 ≤ 50, men 5 · 12 = 60 > 50.'])
    ])
  ]));

  U.push(S('Undersøk og argumenter', '🔎', [
    P('Vi kan sjekke løsninger ved å <strong>teste tall</strong>: ett tall som skal være med, og ett tall som ikke skal være med.'),
    O(4, [
      V('Mia løste x + 3 > 8 og fikk x > 11. Stemmer det?', ['Nei, det skal være x > 5', 'Ja', 'Nei, x < 5', 'Nei, x > 24'], 0, 'Du skal trekke fra 3.', 'Trekk fra 3: x > 5. Sjekk: x = 6 gir 6 + 3 = 9 > 8 ✓, men x = 6 er ikke med i x > 11. Derfor er x > 11 feil.'),
      V('Påstand: «Hvis x > 3, så er x² > 9.» Stemmer det for positive tall?', ['Ja', 'Nei', 'Bare for 4', 'Bare for hele tall'], 0, 'Prøv x = 4, x = 3,1.', '4² = 16 > 9 og 3,1² = 9,61 > 9. For x > 3 stemmer det alltid.'),
      V('Påstand: «Hvis x < 3, så er x² < 9.» Hvilket moteksempel viser at den er feil?', ['x = −5', 'x = 2', 'x = 0', 'x = 1'], 0, 'Prøv et negativt tall.', 'x = −5 er mindre enn 3, men (−5)² = 25 er ikke mindre enn 9.'),
      F('Forklar forskjellen på løsningen av ligningen x + 2 = 7 og ulikheten x + 2 > 7.', ['Ligningen har én løsning: x = 5.', 'Ulikheten har mange løsninger: alle tall større enn 5, som 6, 7, 5,5 og 100.', 'Du kan vise ulikheten på tallinja med en åpen sirkel på 5 og pil mot høyre.'])
    ]),
    SJ('Dette kan du nå', ['Lese og bruke tegnene <, >, ≤ og ≥', 'Vise en ulikhet på tallinja', 'Løse enkle ulikheter', 'Bruke ulikheter i hverdagen', 'Vurdere om en løsning er gyldig'])
  ]));

  M.register('utforsk', '8/ulikheter', {
    tittel: 'Ulikheter',
    ingress: 'Ulikheter har ofte mange løsninger. Du lærer å vise dem på tallinja, løse dem og vurdere om løsningen passer til situasjonen.',
    mal: ['bruke ulike strategier for å løse ulikheter', 'vurdere om løsninger er gyldige'],
    ordliste: ORD, seksjoner: U
  });

  /* ====================== STEG ====================== */
  const T1 = [];
  T1.push(S('Steg 1: Større og mindre', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Vi bruker tegn for å sammenligne tall: <strong>&gt;</strong> betyr «større enn» og <strong>&lt;</strong> betyr «mindre enn».', true),
    C('regel', 'Husk', ['7 &gt; 3: sju er større enn tre.', '3 &lt; 7: tre er mindre enn sju.', '≥ betyr «større enn eller lik».', '≤ betyr «mindre enn eller lik».']),
    E('Er 5 en løsning på x &gt; 3?', ['Er 5 større enn 3?', 'Ja.', 'Svar: ja. 🎉']),
    OS([
      V('Er 6 en løsning på x &gt; 4?', ['Ja', 'Nei'], 0, 'Er 6 større enn 4?', 'Ja, 6 er større enn 4.', true),
      V('Er 2 en løsning på x &gt; 4?', ['Nei', 'Ja'], 0, 'Er 2 større enn 4?', 'Nei, 2 er mindre enn 4.', true),
      V('Er 4 en løsning på x ≥ 4?', ['Ja', 'Nei'], 0, '≥ betyr større eller lik.', 'Ja, 4 er lik 4.', true),
      V('Er 4 en løsning på x &gt; 4?', ['Nei', 'Ja'], 0, '4 er ikke større enn 4.', 'Nei, > betyr at tallet ikke er med.', true)
    ])
  ]));
  T1.push(S('Steg 2: Tallinja', '2', [
    G('Vi kan tegne ulikheter på tallinja.'),
    P('Alle løsningene til <strong>x &gt; 4</strong> ligger til høyre for 4. Vi tegner en <strong>åpen sirkel</strong> på 4 (4 er ikke med) og en pil mot høyre.', true),
    W('ulikhet', { a: 4, op: '>', t: 6, tittel: 'Ulikhet på tallinja' }),
    C('regel', 'Husk', ['Åpen sirkel: tallet er <strong>ikke</strong> med (&lt; og &gt;).', 'Fylt sirkel: tallet er <strong>med</strong> (≤ og ≥).', 'Større: pil mot høyre. Mindre: pil mot venstre.']),
    OS([
      V('Åpen sirkel på 3 og pil mot høyre. Hvilken ulikhet?', ['x > 3', 'x ≥ 3', 'x < 3'], 0, 'Åpen: ikke med. Høyre: større.', 'x > 3.', true),
      V('Fylt sirkel på 5 og pil mot venstre. Hvilken ulikhet?', ['x ≤ 5', 'x < 5', 'x ≥ 5'], 0, 'Fylt: med. Venstre: mindre.', 'x ≤ 5.', true),
      T('Hvor mange hele tall fra 1 til 10 er løsning på x ≥ 8? (8, 9, 10)', 3, 'Tell dem.', 'Det er 3: 8, 9 og 10.'),
      T('Hvor mange hele tall fra 1 til 10 er løsning på x < 4?', 3, '1, 2 og 3.', 'Det er 3.')
    ])
  ]));
  T1.push(S('Steg 3: Løse en ulikhet', '3', [
    G('Vi løser ulikheter nesten som ligninger.'),
    P('Du regner på begge sider, og beholder tegnet.', true),
    E('Løs x + 2 &lt; 8.', ['Trekk fra 2 på begge sider.', 'x &lt; 6.', 'Alle tall mindre enn 6 er løsninger. 🎉']),
    E('Løs 2x ≥ 10.', ['Del begge sider på 2.', 'x ≥ 5.', 'Tallet 5 og alle større tall er løsninger. 🎉']),
    OS([
      T('Løs x + 3 < 10. Hva er det største hele tallet som passer?', 6, 'x < 7.', 'x < 7, så største hele tall er 6.'),
      T('Løs x − 2 > 5. Hva er det minste hele tallet som passer?', 8, 'x > 7.', 'x > 7, så minste hele tall er 8.'),
      T('Løs 3x ≥ 12. Hva er det minste hele tallet som passer?', 4, 'x ≥ 4.', 'x ≥ 4, så minste er 4.'),
      T('Løs 2x < 10. Hva er det største hele tallet som passer?', 4, 'x < 5.', 'x < 5, så største er 4.')
    ])
  ]));
  T1.push(S('Steg 4: Ulikheter i hverdagen', '4', [
    G('Siste steg! Hva hvis det finnes en grense?'),
    P('«Maks 50 kr» betyr at du kan bruke 50 kr eller mindre: ≤ 50. «Minst 3 poeng» betyr 3 eller flere: ≥ 3.', true),
    E('Du har 50 kr. En bolle koster 10 kr. Hvor mange boller kan du maks kjøpe?', ['x boller koster 10x. Det må være maks 50: 10x ≤ 50.', 'Del på 10: x ≤ 5.', 'Svar: maks 5 boller. 🎉']),
    OS([
      T('Du har 30 kr. Hver is koster 6 kr. Hvor mange is kan du maks kjøpe?', 5, '6x ≤ 30.', 'x ≤ 5, så maks 5 is.'),
      T('Du har 100 kr. Hver kinobillett koster 40 kr. Hvor mange billetter kan du maks kjøpe?', 2, '40x ≤ 100.', 'x ≤ 2,5. Du kan bare kjøpe hele billetter, så maks 2.'),
      T('Du må ha minst 20 poeng. Du har 12. Hvor mange poeng mangler minst?', 8, '12 + x ≥ 20.', 'x ≥ 8.', 'poeng'),
      T('En heis tåler maks 300 kg. Du veier 70 kg. Hva kan du maks ha med deg?', 230, '70 + x ≤ 300.', 'x ≤ 230 kg.', 'kg')
    ]),
    SJ('Dette kan du nå', ['Bruke tegnene < > ≤ ≥', 'Vise ulikheter på tallinja', 'Løse enkle ulikheter', 'Bruke ulikheter i hverdagen'])
  ]));

  M.register('steg', '8/ulikheter', {
    tittel: 'Ulikheter',
    ingress: 'Små steg, tydelige eksempler og hjelp hele veien. Du lærer å bruke og løse ulikheter.',
    mal: ['bruke tegnene < > ≤ ≥', 'vise ulikheter på tallinja', 'løse enkle ulikheter'],
    ordliste: ORD, seksjoner: T1
  });

  /* ====================== EKSTRA ====================== */
  M.ekstra['8/ulikheter'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('tell', '🔢', 'Tell løsninger', 8, 'Hvor mange hele tall fra 1 til 20 er løsning?', function (r, i) {
      const k = r.int(3, 17), t = i % 4;
      if (t === 0) return H.e('x > ' + k, 20 - k, 'Tallene ' + (k + 1) + ' til 20: ' + (20 - k) + ' tall');
      if (t === 1) return H.e('x ≥ ' + k, 21 - k, 'Tallene ' + k + ' til 20: ' + (21 - k) + ' tall');
      if (t === 2) return H.e('x < ' + k, k - 1, 'Tallene 1 til ' + (k - 1) + ': ' + (k - 1) + ' tall');
      return H.e('x ≤ ' + k, k, 'Tallene 1 til ' + k + ': ' + k + ' tall');
    }));
    sek.push(H.ek('stor', '⬆️', 'Største hele tall', 8, 'Løs ulikheten. Hva er det største hele tallet som passer?', function (r) {
      const a = r.int(2, lett ? 5 : 9), b = r.int(1, 9), c = r.int(20, 60);
      const lim = (c - b) / a; const best = Number.isInteger(lim) ? lim - 1 : Math.floor(lim);
      return H.e(a + 'x + ' + b + ' < ' + c, best, a + 'x < ' + (c - b) + ', så x < ' + M.fmt(Math.round(lim * 100) / 100) + '. Størst: ' + best);
    }));
    sek.push(H.ek('liten', '⬇️', 'Minste hele tall', 8, 'Løs ulikheten. Hva er det minste hele tallet som passer?', function (r) {
      const a = r.int(2, lett ? 5 : 9), b = r.int(1, 9), c = r.int(20, 60);
      const lim = (c + b) / a; const best = Math.ceil(lim);
      return H.e(a + 'x − ' + b + ' ≥ ' + c, best, a + 'x ≥ ' + (c + b) + ', så x ≥ ' + M.fmt(Math.round(lim * 100) / 100) + '. Minst: ' + best);
    }));
    sek.push(H.ek('hverdag', '🛒', 'Hverdagen', 6, 'Hvor mange kan du maks kjøpe?', function (r) {
      const p = r.int(4, 25), pen = r.int(60, 300);
      return H.e('Du har ' + pen + ' kr. Hver vare koster ' + p + ' kr. Hvor mange varer kan du maks kjøpe?', Math.floor(pen / p), p + 'x ≤ ' + pen + ', så x ≤ ' + M.fmt(Math.round(pen / p * 100) / 100) + '. Maks ' + Math.floor(pen / p));
    }));
    return H.ekDef('Ulikheter', sek);
  };
})();
