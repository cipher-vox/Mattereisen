/* ============================================================
   9. trinn: Sannsynlighet + Simulering med programmering
   Læreplan 9.10 og 9.11
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, SJ, S, ord } = H;

  /* ================= SANNSYNLIGHET ================= */
  const ORD1 = [
    ord(['sannsynlighet'], 'Et tall mellom 0 og 1 (eller 0 % og 100 %) som sier hvor sannsynlig det er at noe skjer.'),
    ord(['utfall'], 'Et mulig resultat av et forsøk. Ved terningkast er utfallene 1, 2, 3, 4, 5 og 6.'),
    ord(['gunstig', 'gunstige', 'gunstige utfall'], 'Utfallene vi ønsker. Hvis vi vil ha en sekser, er det ett gunstig utfall.'),
    ord(['mulig', 'mulige', 'mulige utfall'], 'Alle utfallene som kan skje.'),
    ord(['hendelse', 'hendelsen'], 'Noe som kan skje, for eksempel «få en sekser» eller «få partall».'),
    ord(['uavhengige', 'uavhengig'], 'To hendelser er uavhengige hvis den ene ikke påvirker sannsynligheten for den andre.'),
    ord(['komplementær', 'komplementet'], 'Motsatt hendelse. Sannsynligheten for at noe ikke skjer er 1 minus sannsynligheten for at det skjer.'),
    ord(['valgtre'], 'Et tre med grener som viser alle mulige utfall steg for steg.'),
    ord(['tilfeldig', 'tilfeldige'], 'Ingen vet på forhånd hva som skjer, men det finnes ofte en sannsynlighet for hvert utfall.'),
    ord(['relativ frekvens'], 'Hvor mange ganger noe skjedde delt på hvor mange forsøk du gjorde.'),
    ord(['rettferdig'], 'Et spill er rettferdig når alle spillere har like stor sjanse til å vinne.')
  ];
  const U1 = [];
  U1.push(S('Hva er sannsynlighet?', '🎲', [
    P('<strong>Sannsynlighet</strong> sier hvor sannsynlig noe er. Det er et tall fra <strong>0</strong> (umulig) til <strong>1</strong> (helt sikkert). Vi kan også bruke prosent: 0 % til 100 %.'),
    TAB(['Sannsynlighet', 'Betyr', 'Eksempel'], [['0 (0 %)', 'Umulig', 'Å kaste 7 med én terning'], ['0,5 (50 %)', 'Like sannsynlig som ikke', 'Kron på et myntkast'], ['1 (100 %)', 'Helt sikkert', 'At solen står opp i morgen']]),
    C('regel', 'Formelen', ['sannsynlighet = <strong>gunstige utfall ÷ mulige utfall</strong>', 'Gjelder når alle utfallene er like sannsynlige.']),
    E('Hva er sannsynligheten for å få en sekser med en terning?', ['Mulige utfall: 6 (1, 2, 3, 4, 5, 6).', 'Gunstige utfall: 1 (bare 6).', 'Sannsynlighet = 1/6 ≈ 0,17 = 17 %.']),
    O(1, [
      V('Hva er sannsynligheten for kron på en rettferdig mynt?', ['1/2', '1/3', '1/6', '1'], 0, 'To utfall, ett gunstig.', '1 av 2 = 1/2 = 50 %.', true),
      V('Hvilken sannsynlighet er umulig?', ['0', '1', '0,5', '100 %'], 0, 'Skjer aldri.', 'Sannsynlighet 0 betyr umulig.', true),
      T('Hvor mange mulige utfall har en terning?', 6, 'Tell 1 til 6.', '6 utfall.')
    ])
  ]));
  U1.push(S('Regne sannsynlighet', '🧮', [
    P('Del antall <strong>gunstige</strong> utfall på antall <strong>mulige</strong>. Du kan skrive svaret som brøk, desimaltall eller prosent.'),
    E('En pose har 3 røde, 5 blå og 2 grønne kuler. Du trekker en tilfeldig. Hva er sannsynligheten for rød?', ['Mulige: 3 + 5 + 2 = 10.', 'Gunstige: 3.', '3/10 = 0,3 = 30 %.']),
    TAB(['Brøk', 'Desimal', 'Prosent'], [['1/2', '0,5', '50 %'], ['1/4', '0,25', '25 %'], ['1/5', '0,2', '20 %'], ['1/10', '0,1', '10 %'], ['3/4', '0,75', '75 %']]),
    O(2, [
      T('Pose med 3 røde, 5 blå og 2 grønne. Hva er sannsynligheten for rød i prosent?', 30, '3 av 10.', '3 ÷ 10 = 0,3 = 30 %.', '%'),
      T('Terning: sannsynlighet for partall (2, 4 eller 6) i prosent?', 50, '3 av 6.', '3 ÷ 6 = 0,5 = 50 %.', '%'),
      T('Pose med 4 røde og 16 blå kuler. Sannsynlighet for rød i prosent?', 20, '4 av 20.', '4 ÷ 20 = 0,2 = 20 %.', '%'),
      T('Kortstokk: 52 kort, 13 av dem er hjerter. Sannsynlighet for hjerter i prosent?', 25, '13 ÷ 52.', '13 ÷ 52 = 0,25 = 25 %.', '%'),
      T('Lotteri: 100 lodd og 5 vinnerlodd. Sannsynlighet for å vinne i prosent?', 5, '5 ÷ 100.', '5 ÷ 100 = 0,05 = 5 %.', '%')
    ])
  ]));
  U1.push(S('Det motsatte', '🔄', [
    P('Sannsynligheten for at noe <strong>ikke</strong> skjer, er <strong>1 minus</strong> sannsynligheten for at det skjer. Det kalles <strong>komplementet</strong>.'),
    C('regel', 'Komplement', ['P(ikke A) = 1 − P(A)', 'I prosent: 100 % − P(A)']),
    E('Sannsynlighet for regn i morgen er 30 %. Hva er sannsynligheten for ikke regn?', ['100 % − 30 % = 70 %.', 'Eller 1 − 0,3 = 0,7.', 'Svar: 70 %.']),
    O(2, [
      T('Sannsynlighet for å vinne er 15 %. Hva er sannsynligheten for å ikke vinne?', 85, '100 − 15.', '100 − 15 = 85 %.', '%'),
      T('Sannsynlighet for å få en sekser er 1/6. Hvor mange av de 6 utfallene er ikke sekser?', 5, '6 − 1.', '5 av 6.'),
      T('Sannsynlighet for å treffe er 0,7. Hva er sannsynligheten for å bomme?', 0.3, '1 − 0,7.', '1 − 0,7 = 0,3.')
    ])
  ]));
  U1.push(S('Flere forsøk: valgtre og tabell', '🌳', [
    P('Hva hvis du gjør <strong>to ting</strong> etter hverandre? Et <strong>valgtre</strong> viser alle kombinasjonene. For to myntkast: <strong>MM, MK, KM, KK</strong>: fire like sannsynlige utfall.'),
    TAB(['', 'Mynt', 'Kron'], [['Mynt', 'MM', 'MK'], ['Kron', 'KM', 'KK']]),
    C('regel', 'Multiplikasjonsregelen', ['Når to hendelser er uavhengige: <strong>P(A og B) = P(A) · P(B)</strong>.', 'To kron på rad: 1/2 · 1/2 = 1/4 = 25 %.']),
    E('Du kaster to terninger. Hva er sannsynligheten for to seksere?', ['Hver terning: 1/6.', '1/6 · 1/6 = 1/36.', 'Det er 1 av 36 mulige kombinasjoner.']),
    O(3, [
      T('Hvor mange ulike kombinasjoner er det når du kaster to terninger?', 36, '6 · 6.', '6 · 6 = 36.'),
      T('Hvor mange av de 36 kombinasjonene gir sum 7? (1+6, 2+5, 3+4, 4+3, 5+2, 6+1)', 6, 'Tell dem.', '6 kombinasjoner.'),
      T('Sannsynlighet for kron to ganger på rad i prosent?', 25, '1/2 · 1/2.', '1/4 = 25 %.', '%'),
      T('Du kaster tre mynter. Hvor mange ulike kombinasjoner er det?', 8, '2 · 2 · 2.', '2 · 2 · 2 = 8.'),
      V('Hva er mest sannsynlig med to terninger: sum 7 eller sum 12?', ['Sum 7', 'Sum 12', 'Like sannsynlig', 'Ingen av dem'], 0, 'Sum 7 har 6 kombinasjoner, sum 12 har 1.', 'Sum 7: 6/36. Sum 12: 1/36.')
    ])
  ]));
  U1.push(S('Med og uten tilbakelegging', '🎒', [
    P('Hvis du <strong>legger tilbake</strong> det du trakk, er hvert trekk uavhengig. Hvis du <strong>ikke legger tilbake</strong>, endres sannsynligheten for neste trekk.'),
    E('En pose har 2 røde og 2 blå kuler. Du trekker to uten å legge tilbake. Hvor mange par kan du trekke, og hvor mange er to røde?', ['Første trekk: 4 muligheter. Andre trekk: 3 muligheter (en er borte). Totalt 4 · 3 = 12 ordnede par.', 'To røde: første rød (2 muligheter), andre rød (1 igjen). 2 · 1 = 2 par.', '2 av 12 par: 2/12 = 1/6 ≈ 17 %.']),
    O(4, [
      T('En pose har 5 røde og 3 blå kuler. Du trekker to uten tilbakelegging. Hvor mange ordnede par kan trekkes? (8 · 7)', 56, '8 · 7.', '8 · 7 = 56.'),
      T('Samme pose. Hvor mange par er rød-rød? (5 · 4)', 20, '5 · 4.', '5 · 4 = 20.'),
      V('Samme pose. Hva er sannsynligheten for to røde uten tilbakelegging?', ['20/56', '25/64', '5/8', '1/2'], 0, '5/8 · 4/7.', '5/8 · 4/7 = 20/56 = 5/14.', true),
      V('Hva er sannsynligheten for to røde med tilbakelegging?', ['25/64', '20/56', '5/8', '1/2'], 0, '5/8 · 5/8.', '5/8 · 5/8 = 25/64.', true)
    ])
  ]));
  U1.push(S('Tester vi sannsynlighet? Relativ frekvens', '🔬', [
    P('Hvis du kaster mange ganger, vil <strong>relativ frekvens</strong> (antall ganger ÷ antall forsøk) nærme seg den teoretiske sannsynligheten. Prøv selv!'),
    W('simulering', { type: 'terning', tittel: 'Kast terning mange ganger' }),
    W('simulering', { type: 'to', tittel: 'Kast to terninger. Hvilken sum er vanligst?' }),
    O(4, [
      T('Du kaster en mynt 50 ganger og får 28 kron. Hva er relativ frekvens i prosent?', 56, '28 ÷ 50.', '28 ÷ 50 = 0,56 = 56 %.', '%'),
      T('Du kaster en terning 60 ganger og får 12 seksere. Relativ frekvens i prosent?', 20, '12 ÷ 60.', '12 ÷ 60 = 0,2 = 20 %.', '%'),
      V('Hva skjer ofte med relativ frekvens når du kaster flere ganger?', ['Den nærmer seg sannsynligheten', 'Den blir 0', 'Den blir 1', 'Ingenting'], 0, 'Se på simuleringen.', 'Den nærmer seg den teoretiske sannsynligheten.')
    ])
  ]));
  U1.push(S('Rettferdige spill', '⚖️', [
    P('Et spill er <strong>rettferdig</strong> hvis begge spillere har like stor sjanse til å vinne. Vi kan regne ut om et spill er rettferdig ved å telle utfall.'),
    E('To terninger kastes. Mia vinner om summen er 7. Ole vinner om summen er 6 eller 8. Er spillet rettferdig?', ['Sum 7: 6 kombinasjoner av 36.', 'Sum 6: 5 kombinasjoner. Sum 8: 5 kombinasjoner. Til sammen 10 av 36.', 'Mia: 6/36. Ole: 10/36. Ole har størst sjanse, så spillet er ikke rettferdig.']),
    O(5, [
      V('Du vinner hvis du får partall på en terning. Jeg vinner hvis jeg får 1, 2 eller 3. Er spillet rettferdig?', ['Ja', 'Nei'], 0, 'Tell utfallene.', 'Begge har 3 av 6 gunstige. Rettferdig.', true),
      V('Du vinner med sekser. Jeg vinner med 1 eller 2. Er spillet rettferdig?', ['Nei', 'Ja'], 0, '1 mot 2 utfall.', 'Du har 1/6, jeg har 2/6. Ikke rettferdig.', true),
      T('To terninger. Hvor mange kombinasjoner gir sum 8? (2+6, 3+5, 4+4, 5+3, 6+2)', 5, 'Tell dem.', '5 kombinasjoner.'),
      F('Foreslå en regel for terningspillet slik at begge spillerne har lik sjanse.', ['Du kan gi begge spillere 3 av de 6 utfallene på én terning, for eksempel partall mot oddetall.', 'Da har begge sannsynlighet 3/6 = 50 %.', 'Eller to mynter: Mia vinner på MM og KK, Ole på MK og KM.'])
    ])
  ]));
  U1.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('Kari sier: «Jeg har kastet kron fem ganger på rad. Nå er det mer sannsynlig at jeg får mynt.» Stemmer det?', ['Nei. Hvert kast er uavhengig.', 'Sannsynligheten for kron er fortsatt 1/2.', 'Mynten «husker» ikke tidligere kast.']),
      F('Forklar hvorfor sannsynligheten for sum 7 med to terninger er større enn for sum 2.', ['Sum 2 kan bare skje som 1 + 1: 1 av 36.', 'Sum 7 kan skje på 6 måter: 6 av 36.', 'Flere kombinasjoner gir høyere sannsynlighet.']),
      F('I et lotteri er det 1000 lodd og 10 vinnerlodd. Hva er sannsynligheten for å vinne, og hva er sannsynligheten for å ikke vinne?', ['Vinne: 10 ÷ 1000 = 0,01 = 1 %.', 'Ikke vinne: 1 − 0,01 = 0,99 = 99 %.', 'Du taper nesten alltid.'])
    ]),
    SJ('Dette kan du nå', ['Regne sannsynlighet som gunstige ÷ mulige', 'Bruke komplementet', 'Lage valgtre og tabell', 'Regne med to uavhengige hendelser', 'Vurdere om et spill er rettferdig'])
  ]));
  M.register('utforsk', '9/sannsynlighet', {
    tittel: 'Sannsynlighet',
    ingress: 'Terning, mynt og lotteri: du regner ut hvor sannsynlig noe er, og vurderer om spill er rettferdige.',
    mal: ['beregne og vurdere sannsynlighet i statistikk og spill'], ordliste: ORD1, seksjoner: U1
  });
  const T1 = [];
  T1.push(S('Steg 1: Hva er sannsynlighet?', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Sannsynlighet sier hvor sannsynlig noe er. Vi regner: <strong>gunstige ÷ mulige</strong>.', true),
    E('En terning har 6 sider. Hva er sannsynligheten for en sekser?', ['Mulige: 6.', 'Gunstige: 1.', 'Sannsynligheten er 1 av 6. 🎉']),
    OS([
      T('Hvor mange sider har en terning?', 6, 'Tell.', '6.'),
      T('Hvor mange sider har en mynt?', 2, 'Mynt og kron.', '2.'),
      V('Hva er sannsynligheten for kron på en mynt?', ['1 av 2', '1 av 6', '2 av 2'], 0, 'En gunstig av to mulige.', '1 av 2.', true)
    ])
  ]));
  T1.push(S('Steg 2: Kuler i en pose', '2', [
    G('Tell antall kuler. Det er alt du trenger.'),
    E('Posen har 3 røde og 7 blå kuler. Sannsynlighet for rød?', ['Mulige: 3 + 7 = 10.', 'Gunstige: 3.', '3 av 10. Det er 0,3 = 30 %. 🎉']),
    OS([
      T('Posen har 2 røde og 8 blå. Hvor mange kuler er det totalt?', 10, '2 + 8.', '2 + 8 = 10.'),
      T('Posen har 2 røde og 8 blå. Sannsynlighet for rød i prosent?', 20, '2 av 10.', '2 ÷ 10 = 0,2 = 20 %.', '%'),
      T('Posen har 5 røde og 5 blå. Sannsynlighet for rød i prosent?', 50, '5 av 10.', '5 ÷ 10 = 0,5 = 50 %.', '%')
    ])
  ]));
  T1.push(S('Steg 3: Motsatt', '3', [
    G('Hva er sannsynlig at noe IKKE skjer?'),
    C('regel', 'Husk', ['Ikke-sannsynlighet = 100 % − sannsynlighet.']),
    E('Sannsynlighet for å vinne er 10 %. Hva er sannsynligheten for å ikke vinne?', ['100 % − 10 %.', '= 90 %.', 'Svar: 90 %. 🎉']),
    OS([
      T('Sannsynlighet for regn er 20 %. Sannsynlighet for ikke regn?', 80, '100 − 20.', '100 − 20 = 80 %.', '%'),
      T('Sannsynlighet for å treffe er 60 %. Sannsynlighet for å ikke treffe?', 40, '100 − 60.', '100 − 60 = 40 %.', '%')
    ])
  ]));
  T1.push(S('Steg 4: To kast', '4', [
    G('Hva skjer hvis vi kaster to ganger?'),
    E('To myntkast: MM, MK, KM, KK. Hvor mange kombinasjoner er det? Hvor mange er to kron?', ['Fire kombinasjoner: MM, MK, KM, KK.', 'To kron er KK: én kombinasjon.', '1 av 4 = 25 %. 🎉']),
    OS([
      T('Hvor mange kombinasjoner er det med to myntkast?', 4, 'MM, MK, KM, KK.', '4.'),
      T('Hvor mange kombinasjoner med to terningkast? (6 · 6)', 36, '6 · 6.', '6 · 6 = 36.'),
      T('To myntkast: sannsynlighet for to kron i prosent?', 25, '1 av 4.', '1 ÷ 4 = 25 %.', '%')
    ]),
    SJ('Dette kan du nå', ['Regne sannsynlighet', 'Bruke motsatt hendelse', 'Telle kombinasjoner'])
  ]));
  M.register('steg', '9/sannsynlighet', {
    tittel: 'Sannsynlighet',
    ingress: 'Små steg: du regner sannsynlighet med terning, mynt og kuler.',
    mal: ['regne sannsynlighet'], ordliste: ORD1, seksjoner: T1
  });
  M.ekstra['9/sannsynlighet'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('pose', '🎒', 'Kuler i pose', 8, 'Hva er sannsynligheten for rød, i prosent?', function (r) {
      const tot = r.pick(lett ? [10, 20] : [10, 20, 25, 50]); const rod = r.int(1, tot / 2); const p = rod / tot * 100;
      return H.e('Posen har ' + rod + ' røde og ' + (tot - rod) + ' blå kuler.', p, rod + ' ÷ ' + tot + ' = ' + M.fmt(p / 100) + ' = ' + M.fmt(p) + ' %');
    }));
    sek.push(H.ek('komp', '🔄', 'Det motsatte', 6, 'Regn ut sannsynligheten for at det ikke skjer, i prosent.', function (r) {
      const p = r.int(1, 19) * 5; return H.e('Sannsynlighet for at det skjer er ' + p + ' %.', 100 - p, '100 − ' + p + ' = ' + (100 - p) + ' %');
    }));
    sek.push(H.ek('komb', '🌳', 'Kombinasjoner', 6, 'Hvor mange kombinasjoner finnes det?', function (r) {
      const a = r.pick([2, 3, 4, 6]), b = r.pick([2, 3, 4, 6]); return H.e('Ett kast med en ' + a + '-sidet terning og ett kast med en ' + b + '-sidet terning.', a * b, a + ' · ' + b + ' = ' + a * b);
    }));
    sek.push(H.ek('rel', '🔬', 'Relativ frekvens', 6, 'Regn ut relativ frekvens i prosent.', function (r) {
      const n = r.pick([20, 50, 100, 200]), k = r.int(1, n / 2); const p = k / n * 100; if (Math.abs(p * 1000 - Math.round(p * 1000)) > 1e-6) return H.e('Av 20 kast ble 5 sekser.', 25, '5 ÷ 20 = 25 %');
      return H.e(k + ' av ' + n + ' kast ble sekser.', p, k + ' ÷ ' + n + ' = ' + M.fmt(p / 100) + ' = ' + M.fmt(p) + ' %');
    }));
    return H.ekDef('Sannsynlighet', sek);
  };

  /* ================= SIMULERING ================= */
  const ORD2 = [
    ord(['simulering', 'simulere'], 'Å la datamaskinen etterligne et tilfeldig forsøk mange ganger, for eksempel terningkast.'),
    ord(['tilfeldig', 'tilfeldige tall'], 'Tall som datamaskinen trekker uten mønster.'),
    ord(['random'], 'En modul i Python som lager tilfeldige tall. Du må skrive import random først.'),
    ord(['løkke', 'løkka'], 'En kode som gjentar noe mange ganger. for-løkke: for i in range(100).'),
    ord(['variabel'], 'Et navn som husker en verdi.'),
    ord(['teller'], 'En variabel du øker med 1 hver gang noe skjer.'),
    ord(['modul'], 'En samling ferdige funksjoner du kan hente inn med import.')
  ];
  const U2 = [];
  U2.push(S('Hvorfor simulere?', '🎰', [
    P('Hvis du kaster en terning 1000 ganger for hånd, tar det lang tid. En datamaskin gjør det på et øyeblikk. Å <strong>simulere</strong> betyr å la datamaskinen etterligne et tilfeldig forsøk mange ganger, og så telle resultatene.'),
    C('virkelighet', 'Bruk i virkeligheten', ['Spill og lotteri', 'Værmodeller og epidemier', 'Trafikk og flyplasser', 'Forsikring og risiko']),
    O(1, [
      V('Hva betyr det å simulere et terningkast?', ['La datamaskinen trekke et tilfeldig tall 1–6', 'Kaste en ekte terning', 'Regne 6 · 6', 'Tegne en terning'], 0, 'Datamaskinen gjør det.', 'En datamaskin kan velge et tilfeldig tall mellom 1 og 6.', true)
    ])
  ]));
  U2.push(S('Tilfeldige tall i Python', '🐍', [
    P('For å trekke tilfeldige tall bruker vi modulen <code>random</code>. <code>random.randint(1, 6)</code> gir et tilfeldig <strong>helt</strong> tall fra og med 1 til og med 6. Kjør programmet flere ganger. Du får forskjellige svar!'),
    W('kode', { tittel: 'Ett terningkast', kode: 'import random\n\nkast = random.randint(1, 6)\nprint("Du kastet", kast)', intro: 'Trykk «Kjør» flere ganger og se at svaret endrer seg.' }),
    W('kode', { tittel: 'Oppdrag: kast to terninger', intro: 'Lag et program som kaster <strong>to</strong> terninger og skriver ut summen.', kode: 'import random\n\n# skriv koden din her\n', losningKode: 'import random\n\na = random.randint(1, 6)\nb = random.randint(1, 6)\nprint(a + b)', sjekk: (u) => { const n = parseInt(u.trim(), 10); return n >= 2 && n <= 12 && String(n) === u.trim(); }, hint: 'Lag to variabler a og b med random.randint(1, 6), og skriv ut a + b.', ros: 'Flott! Summen er alltid mellom 2 og 12.' }),
    O(2, [
      V('Hva gir random.randint(1, 6)?', ['Et helt tall fra 1 til 6', 'Et tall mellom 0 og 1', 'Bare tallet 6', 'En liste'], 0, '1 og 6 er med.', 'Et tilfeldig helt tall fra og med 1 til og med 6.', true),
      V('Hva må du skrive først for å bruke random?', ['import random', 'use random', 'random()', 'include random'], 0, 'Hent inn modulen.', 'import random.', true),
      V('Hvilke tall kan random.randint(1, 3) gi?', ['1, 2 eller 3', 'Bare 1 og 3', '0, 1, 2 eller 3', '1, 2'], 0, 'Begge endene er med.', 'Både 1, 2 og 3 kan komme.')
    ])
  ]));
  U2.push(S('Mange kast med løkke', '🔁', [
    P('For å gjøre noe mange ganger bruker vi en <strong>for-løkke</strong>. <code>for i in range(5):</code> kjører koden under 5 ganger. Koden som skal gjentas, skrives <strong>innrykket</strong> (med mellomrom foran).'),
    W('kode', { tittel: 'Fem terningkast', kode: 'import random\n\nfor i in range(5):\n    kast = random.randint(1, 6)\n    print(kast)', intro: 'Hvor mange linjer skrives ut?', forvent: undefined }),
    C('advarsel', 'Innrykk', 'Linjene som hører til løkka må ha 4 mellomrom foran. Uten innrykk gir Python en feilmelding.'),
    O(3, [
      T('for i in range(10): …  Hvor mange ganger gjentas koden?', 10, 'Tell.', '10 ganger.'),
      T('Du vil kaste en terning 1000 ganger. Hva skal stå i range( )?', 1000, 'Antall ganger.', 'range(1000).'),
      V('Hva skjer hvis du glemmer innrykket under for-linja?', ['Feilmelding', 'Koden kjører fint', 'Terningen blir større', 'Ingenting'], 0, 'Python bruker innrykk.', 'Python gir en IndentationError.')
    ])
  ]));
  U2.push(S('Telle resultatene', '🔢', [
    P('Vi vil telle hvor mange ganger noe skjer. Lag en <strong>teller</strong> som starter på 0, og øk den med 1 hver gang hendelsen skjer. Bruk <code>if</code> for å sjekke.'),
    W('kode', { tittel: '1000 kast: hvor mange seksere?', kode: 'import random\n\nseksere = 0\nfor i in range(1000):\n    kast = random.randint(1, 6)\n    if kast == 6:\n        seksere = seksere + 1\n\nprint("Seksere:", seksere)\nprint("Relativ frekvens:", seksere / 1000)', intro: 'Kjør flere ganger. Hva er seksere omtrent hver gang? Teorien sier 1/6 av 1000 ≈ 167.' }),
    W('kode', { tittel: 'Oppdrag: tell antall kron', intro: 'Simuler 1000 myntkast. La 0 være mynt og 1 være kron: <code>random.randint(0, 1)</code>. Skriv ut antall kron.', kode: 'import random\n\nkron = 0\n# skriv koden din her\n', losningKode: 'import random\n\nkron = 0\nfor i in range(1000):\n    kast = random.randint(0, 1)\n    if kast == 1:\n        kron = kron + 1\nprint(kron)', sjekk: (u) => { const n = parseInt(u.trim(), 10); return String(n) === u.trim() && n > 400 && n < 600; }, hint: 'Bruk en for-løkke med range(1000), kast random.randint(0, 1), og øk kron med 1 hvis kast == 1.', ros: 'Riktig! Tallet er nær 500.' }),
    O(4, [
      V('Hva er seksere = 0 i koden?', ['Telleren settes til 0 før vi begynner', 'Vi vinner 0', 'Terningen er 0', 'Det er en feil'], 0, 'Før vi har kastet noe.', 'Vi starter telleren på 0.', true),
      V('Hva gjør seksere = seksere + 1?', ['Øker telleren med 1', 'Tegner en sekser', 'Setter telleren til 1', 'Fjerner en sekser'], 0, 'Nytt verdi = gammel + 1.', 'Telleren øker med 1.', true),
      T('Du simulerer 1000 terningkast. Omtrent hvor mange seksere forventer du? (1000 ÷ 6, rundet til nærmeste tier)', 170, '1000 ÷ 6 ≈ 167.', '1000 ÷ 6 ≈ 167, så omtrent 170.')
    ])
  ]));
  U2.push(S('Simulere to terninger', '🎲', [
    P('Hva er sannsynligheten for sum 7 med to terninger? Teori: 6/36 ≈ 17 %. La oss sjekke med simulering.'),
    W('kode', { tittel: 'Sum 7 med to terninger', kode: 'import random\n\nantall = 0\nforsok = 10000\nfor i in range(forsok):\n    a = random.randint(1, 6)\n    b = random.randint(1, 6)\n    if a + b == 7:\n        antall = antall + 1\n\nprint("Sum 7 skjedde", antall, "ganger")\nprint("Relativ frekvens:", antall / forsok)', intro: 'Sammenlikn svaret med 6/36 = 0,1667.' }),
    W('kode', { tittel: 'Oppdrag: sum 12', intro: 'Endre programmet over, slik at du teller hvor ofte <strong>summen er 12</strong>. Skriv ut den relative frekvensen. Teorien sier 1/36 ≈ 0,028.', kode: 'import random\n\nantall = 0\nforsok = 10000\n# fortsett her\n', losningKode: 'import random\n\nantall = 0\nforsok = 10000\nfor i in range(forsok):\n    a = random.randint(1, 6)\n    b = random.randint(1, 6)\n    if a + b == 12:\n        antall = antall + 1\nprint(antall / forsok)', sjekk: (u) => { const x = parseFloat(u.trim().replace(',', '.')); return x > 0.01 && x < 0.06; }, hint: 'Samme som over, men if a + b == 12.', ros: 'Riktig! Svaret er rundt 0,028.' }),
    O(4, [
      T('Mellom 2 og 12 er det hvor mange mulige summer med to terninger?', 11, '2, 3, …, 12.', '11 ulike summer.'),
      V('Hvorfor er sum 7 mer vanlig enn sum 12?', ['Flere kombinasjoner gir 7', 'Terningen liker 7', 'Det er flaks', 'Feil i koden'], 0, '6 kombinasjoner mot 1.', 'Sum 7 har 6 av 36 kombinasjoner. Sum 12 har bare 1.'),
      V('Hvorfor bruker vi mange forsøk, f.eks. 10 000?', ['Resultatet nærmer seg sannsynligheten', 'Det blir mer tilfeldig', 'Koden krever det', 'Det er penere'], 0, 'Flere forsøk gir mer stabilt resultat.', 'Relativ frekvens nærmer seg den teoretiske sannsynligheten når vi har mange forsøk.')
    ])
  ]));
  U2.push(S('Egne simuleringer', '🧪', [
    P('Nå kan du simulere nesten hva som helst. Tenk deg: «Hvor mange kast trenger jeg før jeg får en sekser?» Det kan ikke svares med én formel. Men det kan simuleres!'),
    W('kode', { tittel: 'Hvor mange kast til første sekser?', kode: 'import random\n\nkast = 0\nsekser = False\nwhile not sekser:\n    kast = kast + 1\n    if random.randint(1, 6) == 6:\n        sekser = True\n\nprint("Det tok", kast, "kast")', intro: 'Kjør mange ganger. Hva er typisk?' }),
    O(5, [
      F('Beskriv med ord hvordan du vil simulere «Hva er sannsynligheten for minst én sekser når jeg kaster to terninger?»', ['Gjenta mange ganger (for-løkke): kast to terninger med random.randint(1, 6).', 'Hvis minst én av dem er 6, øk telleren med 1.', 'Skriv ut telleren delt på antall forsøk. Teorien: 11/36 ≈ 0,31.']),
      F('Hva er forskjellen på teoretisk sannsynlighet og relativ frekvens fra en simulering?', ['Teoretisk: regnet ut med gunstige ÷ mulige.', 'Relativ frekvens: tellet fra faktiske (simulerte) forsøk.', 'Med mange forsøk blir de omtrent like.']),
      F('Skriv koden (eller en plan) for å simulere 1000 myntkast og skrive ut andelen kron.', ['import random', 'kron = 0; for i in range(1000): hvis random.randint(0, 1) == 1: kron = kron + 1', 'print(kron / 1000). Resultatet ligger nær 0,5.'])
    ]),
    SJ('Dette kan du nå', ['Bruke random.randint', 'Bruke for-løkke', 'Telle med en teller', 'Simulere terning og mynt', 'Sammenlikne simulering og teori'])
  ]));
  M.register('utforsk', '9/simulering', {
    tittel: 'Simulering med programmering',
    ingress: 'La datamaskinen kaste terning tusen ganger og telle for deg. Du skriver Python-kode som simulerer tilfeldige forsøk.',
    mal: ['simulere utfall i tilfeldige forsøk ved å bruke programmering', 'beregne sannsynligheten for at noe skal inntreffe'], ordliste: ORD2, seksjoner: U2
  });
  const T2 = [];
  T2.push(S('Steg 1: Et terningkast', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Datamaskinen kan kaste en terning for oss. Vi bruker <code>random.randint(1, 6)</code>.', true),
    W('kode', { tittel: 'Kast en terning', kode: 'import random\n\nkast = random.randint(1, 6)\nprint(kast)', intro: 'Trykk «Kjør» flere ganger. Svaret endrer seg hver gang.' }),
    OS([
      V('Hvilke tall kan komme fra random.randint(1, 6)?', ['1, 2, 3, 4, 5 og 6', 'Bare 6', '0 og 1'], 0, 'Som en vanlig terning.', '1 til 6.', true),
      V('Hva må stå øverst i programmet?', ['import random', 'print(random)', 'for random'], 0, 'Hent inn modulen.', 'import random.', true)
    ])
  ]));
  T2.push(S('Steg 2: Gjenta', '2', [
    G('Vi vil kaste flere ganger. Da bruker vi en løkke.'),
    P('<code>for i in range(5):</code> betyr «gjør dette 5 ganger». Linjene under må ha <strong>innrykk</strong> (4 mellomrom).', true),
    W('kode', { tittel: 'Fem kast', kode: 'import random\n\nfor i in range(5):\n    print(random.randint(1, 6))', intro: 'Kjør koden. Hvor mange tall får du?' }),
    OS([
      T('for i in range(8): …  Hvor mange ganger gjentas koden?', 8, 'Tallet i parentesen.', '8 ganger.'),
      V('Hva trenger linjene som hører til løkka?', ['Innrykk', 'Utropstegn', 'Ingenting'], 0, '4 mellomrom foran.', 'Innrykk.', true)
    ])
  ]));
  T2.push(S('Steg 3: Telle', '3', [
    G('Nå teller vi hvor mange ganger vi får en sekser.'),
    C('regel', 'Teller', ['Start med seksere = 0.', 'Hver gang kast er 6: seksere = seksere + 1.']),
    W('kode', { tittel: 'Tell seksere i 100 kast', kode: 'import random\n\nseksere = 0\nfor i in range(100):\n    kast = random.randint(1, 6)\n    if kast == 6:\n        seksere = seksere + 1\n\nprint(seksere)', intro: 'Kjør flere ganger. Hva er tallet omtrent? (Teorien: 100 ÷ 6 ≈ 17.)' }),
    OS([
      V('Hva gjør seksere = seksere + 1?', ['Øker telleren med 1', 'Setter telleren til 6', 'Fjerner telleren'], 0, 'Legger til 1.', 'Øker telleren med 1.', true),
      T('Du kaster 600 ganger. Omtrent hvor mange seksere forventer du? (600 ÷ 6)', 100, '600 ÷ 6.', '600 ÷ 6 = 100.')
    ]),
    SJ('Dette kan du nå', ['Bruke random.randint', 'Bruke en løkke', 'Telle resultater'])
  ]));
  M.register('steg', '9/simulering', {
    tittel: 'Simulering med programmering',
    ingress: 'Små steg: du lærer å la datamaskinen kaste terning mange ganger, og telle.',
    mal: ['simulere terningkast med kode'], ordliste: ORD2, seksjoner: T2
  });
  M.ekstra['9/simulering'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('forv', '🎯', 'Forventet antall', 8, 'Omtrent hvor mange treff forventer du?', function (r) {
      const n = r.pick([600, 1200, 1800, 3000]), s = r.pick(lett ? [6] : [6, 2, 3]); const tekst = s === 6 ? 'seksere' : s === 2 ? 'kron' : 'treff på 1 eller 2';
      const p = s === 6 ? 1 / 6 : s === 2 ? 1 / 2 : 1 / 3; const ant = n * p;
      return H.e('Du kaster ' + n + ' ganger. Sannsynligheten er 1/' + s + (s === 3 ? ' (1 eller 2 på en terning)' : '') + '. Hvor mange ' + (s === 6 ? 'seksere' : s === 2 ? 'kron' : 'treff') + ' forventer du?', ant, n + ' ÷ ' + s + ' = ' + M.fmt(ant));
    }));
    sek.push(H.ek('rng', '🔢', 'Antall mulige tall', 6, 'Hvor mange ulike tall kan randint gi?', function (r) {
      const a = r.int(1, 5), b = a + r.int(1, 9); return H.e('random.randint(' + a + ', ' + b + ')', b - a + 1, b + ' − ' + a + ' + 1 = ' + (b - a + 1));
    }));
    sek.push(H.ek('lop', '🔁', 'Antall gjentakelser', 6, 'Hvor mange ganger gjentas koden?', function (r) {
      const n = r.int(2, 20) * (lett ? 1 : 5); return H.e('for i in range(' + n + '):', n, 'Koden gjentas ' + n + ' ganger');
    }));
    return H.ekDef('Simulering', sek);
  };
})();
