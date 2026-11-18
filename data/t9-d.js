/* ============================================================
   9. trinn: Statistikk i media + Sentralmål og spredning
   Læreplan 9.7, 9.8 og 9.9
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, SJ, S, ord } = H;

  /* ================= SENTRALMÅL OG SPREDNING ================= */
  const ORD2 = [
    ord(['gjennomsnitt', 'gjennomsnittet'], 'Summen av alle tallene delt på hvor mange det er.'),
    ord(['median', 'medianen'], 'Tallet i midten når alle tallene er sortert fra minst til størst. Er det to i midten, tar vi gjennomsnittet av dem.'),
    ord(['typetall'], 'Tallet som forekommer flest ganger.'),
    ord(['sentralmål'], 'Tall som viser hva som er «typisk» i et datasett: gjennomsnitt, median og typetall.'),
    ord(['spredningsmål', 'spredning'], 'Tall som viser hvor mye dataene varierer: variasjonsbredde og kvartilbredde.'),
    ord(['variasjonsbredde'], 'Største verdi minus minste verdi.'),
    ord(['kvartil', 'kvartiler', 'nedre kvartil', 'øvre kvartil'], 'Verdier som deler de sorterte dataene i fire like deler. Nedre kvartil (Q1) er medianen i nedre halvdel. Øvre kvartil (Q3) er medianen i øvre halvdel.'),
    ord(['kvartilbredde'], 'Øvre kvartil minus nedre kvartil. Viser spredningen i de midterste 50 %.'),
    ord(['ekstremverdi', 'ekstremverdier', 'avvik'], 'En verdi som er veldig mye større eller mindre enn de andre.'),
    ord(['datasett'], 'En samling med målinger eller observasjoner.')
  ];
  const U2 = [];
  U2.push(S('Hva er typisk? Tre sentralmål', '🎯', [
    P('Et datasett kan ha mange tall. Vi vil ofte beskrive det med <strong>ett tall</strong> som viser hva som er «typisk». Det finnes tre slike <strong>sentralmål</strong>:'),
    K([{ ikon: '➗', tittel: 'Gjennomsnitt', tekst: 'Legg sammen alle tallene og del på antallet.' }, { ikon: '🎯', tittel: 'Median', tekst: 'Tallet i midten når alt er sortert.' }, { ikon: '🏆', tittel: 'Typetall', tekst: 'Tallet som er flest ganger.' }]),
    W('sentralmal', { data: [2, 3, 3, 4, 5, 7], tittel: 'Legg til og fjern prikker. Se hvordan sentralmålene endrer seg' }),
    E('Finn gjennomsnitt, median og typetall for: 2, 3, 3, 4, 5, 7.', ['Gjennomsnitt: 2 + 3 + 3 + 4 + 5 + 7 = 24, og 24 ÷ 6 = 4.', 'Median: tallene er sortert. Det er 6 tall, så det er to i midten: 3 og 4. Gjennomsnittet av dem er 3,5.', 'Typetall: 3 forekommer to ganger, flest. Svar: 4, 3,5 og 3.']),
    O(1, [
      T('Hva er gjennomsnittet av 2, 4 og 6?', 4, 'Summen delt på 3.', '(2 + 4 + 6) ÷ 3 = 12 ÷ 3 = 4.'),
      T('Hva er medianen av 3, 5, 9?', 5, 'Tallet i midten.', 'Midterste tall er 5.'),
      T('Hva er typetallet i 1, 2, 2, 3, 4?', 2, 'Hva er flest?', '2 forekommer to ganger.'),
      T('Hva er gjennomsnittet av 10, 20, 30, 40?', 25, '100 ÷ 4.', '(10 + 20 + 30 + 40) ÷ 4 = 25.')
    ])
  ]));
  U2.push(S('Regne gjennomsnitt', '➗', [
    P('Gjennomsnittet kalles også <strong>middelverdien</strong>. Du kan se det som «hvis alle fikk like mye»: tallene ville vært jevnt fordelt.'),
    C('regel', 'Gjennomsnitt', ['gjennomsnitt = sum av alle verdier ÷ antall verdier', 'Hvis du kjenner snittet og antallet, er summen = snitt · antall.']),
    E('Karakterer: 4, 5, 3, 6, 2. Hva er snittet?', ['Sum: 4 + 5 + 3 + 6 + 2 = 20.', 'Antall: 5.', '20 ÷ 5 = 4. Svar: 4.']),
    E('Fire elever har snitt 6 på prøven. Tre av dem fikk 5, 6 og 7. Hva fikk den fjerde?', ['Summen må være 4 · 6 = 24.', 'De tre har 5 + 6 + 7 = 18.', '24 − 18 = 6. Svar: 6.']),
    O(2, [
      T('Hva er gjennomsnittet av 4, 5, 3, 6, 2?', 4, 'Sum ÷ 5.', '20 ÷ 5 = 4.'),
      T('Hva er snittet av 12, 15, 18?', 15, '45 ÷ 3.', '45 ÷ 3 = 15.'),
      T('Fem elever har snitt 8 poeng. Hvor mange poeng har de til sammen?', 40, 'snitt · antall.', '8 · 5 = 40.', 'poeng'),
      T('Tre prøver: 5, 7 og x. Snittet er 6. Hva er x?', 6, 'Summen må være 3 · 6 = 18.', '18 − 5 − 7 = 6.'),
      T('Fire tall har snitt 10. Tre av dem er 8, 9 og 13. Hva er det fjerde?', 10, 'Summen er 40.', '40 − 8 − 9 − 13 = 10.')
    ])
  ]));
  U2.push(S('Median og typetall', '🎯', [
    P('For å finne <strong>medianen</strong> må du først <strong>sortere</strong> tallene. Er det et oddetall antall, er medianen tallet i midten. Er det et partall antall, tar du gjennomsnittet av de to i midten.'),
    E('Finn medianen av 7, 2, 9, 4, 5.', ['Sorter: 2, 4, 5, 7, 9.', 'Det er 5 tall. Det i midten er nr. 3.', 'Median = 5.']),
    E('Finn medianen av 8, 3, 6, 10.', ['Sorter: 3, 6, 8, 10.', '4 tall. De to i midten er 6 og 8.', '(6 + 8) ÷ 2 = 7. Median = 7.']),
    C('tips', 'Typetall', ['Typetallet er det som forekommer flest ganger.', 'Det kan være flere typetall, eller ingen.', 'Typetall kan også brukes for ord: «Hva er den vanligste farge på bilene?»']),
    O(3, [
      T('Hva er medianen av 7, 2, 9, 4, 5?', 5, 'Sorter først.', '2, 4, 5, 7, 9 gir 5.'),
      T('Hva er medianen av 3, 6, 8, 10?', 7, 'Snitt av 6 og 8.', '(6 + 8) ÷ 2 = 7.'),
      T('Hva er medianen av 1, 5, 2, 8, 3, 9, 4?', 4, 'Sorter først: 1, 2, 3, 4, 5, 8, 9.', 'Midterste er 4.'),
      T('Hva er typetallet av 4, 6, 4, 3, 6, 4, 5?', 4, 'Hva er flest?', '4 forekommer 3 ganger.'),
      V('Hva er medianen av 1, 1, 2, 2, 3, 3?', ['2', '1', '3', '2,5'], 0, 'To i midten.', '2 og 2 i midten, snitt 2.')
    ])
  ]));
  U2.push(S('Avvikere: når snittet lurer deg', '⚠️', [
    P('Én <strong>ekstremverdi</strong> kan dra gjennomsnittet langt vekk fra det som er typisk. <strong>Medianen</strong> blir mye mindre påvirket.'),
    E('En bedrift har 9 ansatte med lønn 400 000 kr og en sjef med lønn 4 000 000 kr. Finn snitt og median.', ['Sum: 9 · 400 000 + 4 000 000 = 3 600 000 + 4 000 000 = 7 600 000.', 'Snitt: 7 600 000 ÷ 10 = 760 000.', 'Median: sortert er de to midterste begge 400 000, så median = 400 000. Snittet gir et skjevt bilde!']),
    C('mestring', 'Hvilket skal du bruke?', ['Gjennomsnitt: når dataene er jevne og uten ekstremverdier.', 'Median: når det finnes ekstremverdier, for eksempel lønn og boligpriser.', 'Typetall: for kategorier, som vanligste skostørrelse.']),
    O(4, [
      T('Tallene er 2, 3, 3, 4, 38. Hva er gjennomsnittet?', 10, '50 ÷ 5.', '(2 + 3 + 3 + 4 + 38) ÷ 5 = 50 ÷ 5 = 10.'),
      T('Tallene er 2, 3, 3, 4, 38. Hva er medianen?', 3, 'Midterste tall.', '2, 3, 3, 4, 38 gir 3.'),
      V('Hvilket sentralmål passer best for boligpriser i et område med noen få svært dyre villaer?', ['Median', 'Gjennomsnitt', 'Variasjonsbredde', 'Ingen'], 0, 'Hvilket påvirkes minst av ekstremverdier?', 'Median. Noen få dyre boliger drar snittet opp.'),
      T('En klasse på 20 elever har snitt 4 på en prøve. Så oppdages det at én elev fikk 6 poeng, ikke 2. Summen øker da med 4. Hvor mye øker snittet?', 0.2, 'Økning i sum ÷ antall.', '4 ÷ 20 = 0,2.')
    ])
  ]));
  U2.push(S('Spredning: variasjonsbredde', '↔️', [
    P('To klasser kan ha samme gjennomsnitt, men helt ulik <strong>spredning</strong>. <strong>Variasjonsbredden</strong> er forskjellen mellom største og minste verdi.'),
    TAB(['Klasse', 'Karakterer', 'Snitt', 'Variasjonsbredde'], [['A', '3, 4, 4, 5', '4', '5 − 3 = 2'], ['B', '1, 3, 5, 7', '4', '7 − 1 = 6']]),
    C('regel', 'Variasjonsbredde', 'største verdi − minste verdi'),
    O(3, [
      T('Hva er variasjonsbredden til 3, 8, 5, 12, 6?', 9, '12 − 3.', '12 − 3 = 9.'),
      T('Hva er variasjonsbredden til 20, 25, 22, 21?', 5, '25 − 20.', '25 − 20 = 5.'),
      V('Klasse X: 4, 4, 4, 4. Klasse Y: 1, 3, 5, 7. Begge har snitt 4. Hvilken har størst spredning?', ['Y', 'X', 'Like', 'Vet ikke'], 0, 'Se på forskjellen mellom høyeste og laveste.', 'Y har variasjonsbredde 6. X har 0.', true)
    ])
  ]));
  U2.push(S('Kvartiler og kvartilbredde', '📦', [
    P('Variasjonsbredden påvirkes av ekstremverdier. <strong>Kvartilene</strong> deler de sorterte tallene i fire like store deler. <strong>Nedre kvartil (Q1)</strong> er medianen i nedre halvdel. <strong>Øvre kvartil (Q3)</strong> er medianen i øvre halvdel. <strong>Kvartilbredden</strong> er Q3 − Q1.'),
    E('Finn median, kvartiler og kvartilbredde for 2, 4, 5, 7, 8, 9, 12, 15.', ['8 tall. Median = (7 + 8) ÷ 2 = 7,5.', 'Nedre halvdel: 2, 4, 5, 7. Q1 = (4 + 5) ÷ 2 = 4,5. Øvre halvdel: 8, 9, 12, 15. Q3 = (9 + 12) ÷ 2 = 10,5.', 'Kvartilbredde = 10,5 − 4,5 = 6.']),
    C('tips', 'Tenk firedeler', 'Fire like store deler: 25 % under Q1, 25 % mellom Q1 og medianen, 25 % mellom medianen og Q3, og 25 % over Q3.'),
    O(5, [
      T('Hva er nedre kvartil (Q1) til 2, 4, 5, 7, 8, 9, 12, 15?', 4.5, 'Medianen av 2, 4, 5, 7.', '(4 + 5) ÷ 2 = 4,5.'),
      T('Hva er øvre kvartil (Q3) til 2, 4, 5, 7, 8, 9, 12, 15?', 10.5, 'Medianen av 8, 9, 12, 15.', '(9 + 12) ÷ 2 = 10,5.'),
      T('Hva er kvartilbredden til 2, 4, 5, 7, 8, 9, 12, 15?', 6, 'Q3 − Q1.', '10,5 − 4,5 = 6.'),
      T('Tallene: 1, 3, 4, 6, 7, 9, 10 (7 tall). Medianen er 6. Hva er Q1? (Nedre halvdel er 1, 3, 4.)', 3, 'Midten av 1, 3, 4.', 'Q1 = 3.'),
      T('Tallene: 1, 3, 4, 6, 7, 9, 10. Hva er kvartilbredden? (Q1 = 3, Q3 = 9)', 6, 'Q3 − Q1.', '9 − 3 = 6.')
    ])
  ]));
  U2.push(S('Beskrive og sammenlikne datasett', '🔎', [
    P('Bruk <strong>sentralmål</strong> og <strong>spredningsmål</strong> sammen til å beskrive et datasett. Da får du hele bildet.'),
    TAB(['Mål', 'Viser', 'Påvirkes av ekstremverdi?'], [['Gjennomsnitt', 'Typisk verdi', 'Ja, mye'], ['Median', 'Typisk verdi', 'Lite'], ['Typetall', 'Vanligste verdi', 'Nei'], ['Variasjonsbredde', 'Total spredning', 'Ja'], ['Kvartilbredde', 'Spredning i midten', 'Lite']]),
    O(5, [
      F('Gruppe A har tid på 100 m: 14, 15, 15, 16, 17 (sekunder). Gruppe B har: 12, 13, 15, 17, 18. Sammenlikn gruppene med sentralmål og spredning.', ['Snitt A: 77 ÷ 5 = 15,4. Snitt B: 75 ÷ 5 = 15. Median begge 15.', 'Variasjonsbredde A: 17 − 14 = 3. B: 18 − 12 = 6.', 'Omtrent samme typiske tid, men B varierer mer.']),
      F('Forklar hvorfor medianen er bedre enn gjennomsnittet når du skal beskrive typisk boligpris.', ['Noen få svært dyre boliger drar gjennomsnittet opp.', 'Medianen er tallet i midten og påvirkes lite av ekstremverdier.', 'Derfor gir medianen et bedre bilde av hva en vanlig bolig koster.']),
      F('Lag et datasett med 5 tall der gjennomsnitt og median er forskjellige. Forklar hvorfor.', ['Eksempel: 1, 2, 3, 4, 40.', 'Median 3. Snitt (1 + 2 + 3 + 4 + 40) ÷ 5 = 10.', 'Tallet 40 drar snittet opp, men medianen er uendret.'])
    ]),
    SJ('Dette kan du nå', ['Regne gjennomsnitt, median og typetall', 'Velge sentralmål som passer', 'Regne variasjonsbredde og kvartilbredde', 'Beskrive og sammenlikne datasett'])
  ]));
  M.register('utforsk', '9/sentralmal-spredning', {
    tittel: 'Sentralmål og spredning',
    ingress: 'Gjennomsnitt, median og typetall sier hva som er typisk. Variasjonsbredde og kvartiler sier hvor mye dataene varierer.',
    mal: ['regne på sentralmål og spredningsmål', 'bruke resultatene til å beskrive dataene'], ordliste: ORD2, seksjoner: U2
  });
  const T2 = [];
  T2.push(S('Steg 1: Gjennomsnitt', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('<strong>Gjennomsnitt</strong>: legg sammen alle tallene, og del på hvor mange tall det er.', true),
    E('Hva er gjennomsnittet av 2, 4 og 6?', ['Legg sammen: 2 + 4 + 6 = 12.', 'Det er 3 tall, så del på 3.', '12 ÷ 3 = 4. 🎉']),
    OS([
      T('Hva er summen av 3, 5 og 7?', 15, '3 + 5 + 7.', '3 + 5 + 7 = 15.'),
      T('Hva er gjennomsnittet av 3, 5 og 7?', 5, '15 ÷ 3.', '15 ÷ 3 = 5.'),
      T('Hva er gjennomsnittet av 10, 20 og 30?', 20, '60 ÷ 3.', '(10 + 20 + 30) ÷ 3 = 20.')
    ])
  ]));
  T2.push(S('Steg 2: Median', '2', [
    G('Medianen er tallet i midten.'),
    P('Først <strong>sorter</strong> tallene fra minst til størst. Så finner du det som står i midten.', true),
    E('Hva er medianen av 7, 2, 5?', ['Sorter: 2, 5, 7.', 'Tallet i midten er 5.', 'Median = 5. 🎉']),
    OS([
      T('Hva er medianen av 9, 1, 4? (Sorter: 1, 4, 9)', 4, 'Tallet i midten.', 'Midterste tall er 4.'),
      T('Hva er medianen av 6, 2, 8, 4, 10? (Sorter først: 2, 4, 6, 8, 10)', 6, 'Det tredje tallet.', 'Midterste tall er 6.'),
      V('Hva er medianen av 1, 3, 5, 7? (Det er to i midten.)', ['4', '3', '5', '6'], 0, 'Snitt av 3 og 5.', '(3 + 5) ÷ 2 = 4.')
    ])
  ]));
  T2.push(S('Steg 3: Typetall og spredning', '3', [
    G('To små ting til.'),
    C('regel', 'Husk', ['Typetall: det som kommer flest ganger.', 'Variasjonsbredde: største tall minus minste tall.']),
    E('Tallene: 3, 5, 5, 8. Finn typetall og variasjonsbredde.', ['Typetall: 5 kommer to ganger.', 'Variasjonsbredde: 8 − 3 = 5.', 'Svar: typetall 5 og variasjonsbredde 5. 🎉']),
    OS([
      T('Hva er typetallet i 2, 4, 4, 6?', 4, 'Hva kommer flest ganger?', '4 kommer to ganger.'),
      T('Hva er variasjonsbredden i 2, 4, 4, 9?', 7, '9 − 2.', '9 − 2 = 7.'),
      T('Hva er variasjonsbredden i 10, 15, 12?', 5, 'Største minus minste.', '15 − 10 = 5.')
    ]),
    SJ('Dette kan du nå', ['Regne gjennomsnitt', 'Finne median', 'Finne typetall og variasjonsbredde'])
  ]));
  M.register('steg', '9/sentralmal-spredning', {
    tittel: 'Sentralmål og spredning',
    ingress: 'Små steg: gjennomsnitt, median, typetall og variasjonsbredde med tydelige eksempler.',
    mal: ['regne sentralmål og variasjonsbredde'], ordliste: ORD2, seksjoner: T2
  });
  M.ekstra['9/sentralmal-spredning'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    const lag = (r, n, lo, hi) => { const a = []; for (let i = 0; i < n; i++) a.push(r.int(lo, hi)); return a; };
    sek.push(H.ek('snitt', '➗', 'Gjennomsnitt', 8, 'Regn ut gjennomsnittet.', function (r) {
      const n = lett ? 3 : r.pick([4, 5]); let a = lag(r, n, 2, 15); const s = a.reduce((x, y) => x + y, 0); const rem = s % n; a[0] += (n - rem) % n; const sum = a.reduce((x, y) => x + y, 0);
      return H.e(a.join(', '), sum / n, a.join(' + ') + ' = ' + sum + ', og ' + sum + ' ÷ ' + n + ' = ' + sum / n);
    }));
    sek.push(H.ek('med', '🎯', 'Median (oddetall)', 8, 'Finn medianen. Husk å sortere!', function (r) {
      const n = lett ? 3 : r.pick([5, 7]); const a = lag(r, n, 1, 30); const so = a.slice().sort((x, y) => x - y); const m = so[(n - 1) / 2];
      return H.e(a.join(', '), m, 'Sortert: ' + so.join(', ') + '. Median = ' + m);
    }));
    sek.push(H.ek('med2', '🎯', 'Median (partall)', 6, 'Finn medianen. Tar snittet av de to i midten.', function (r) {
      const n = lett ? 4 : r.pick([4, 6]); const a = lag(r, n, 1, 30); const so = a.slice().sort((x, y) => x - y); const m = (so[n / 2 - 1] + so[n / 2]) / 2;
      return H.e(a.join(', '), m, 'Sortert: ' + so.join(', ') + '. Median = (' + so[n / 2 - 1] + ' + ' + so[n / 2] + ') ÷ 2 = ' + M.fmt(m));
    }));
    sek.push(H.ek('bredde', '↔️', 'Variasjonsbredde', 6, 'Regn ut variasjonsbredden.', function (r) {
      const a = lag(r, 5, 1, 40); const mx = Math.max(...a), mn = Math.min(...a); return H.e(a.join(', '), mx - mn, mx + ' − ' + mn + ' = ' + (mx - mn));
    }));
    sek.push(H.ek('mangler', '❓', 'Finn det manglende tallet', 6, 'Finn det manglende tallet når du kjenner gjennomsnittet.', function (r) {
      const n = r.int(3, lett ? 4 : 5), snitt = r.int(4, 12); const a = lag(r, n - 1, 1, 14); const x = snitt * n - a.reduce((p, q) => p + q, 0); if (x < 0) return H.e('Snittet av 3 tall er 5. To av dem er 4 og 6. Hva er det tredje?', 5, '3 · 5 = 15, og 15 − 4 − 6 = 5');
      return H.e(n + ' tall har snitt ' + snitt + '. ' + (n - 1) + ' av dem er ' + a.join(', ') + '. Hva er det siste?', x, 'Sum ' + n + ' · ' + snitt + ' = ' + snitt * n + ', og ' + snitt * n + ' − ' + a.reduce((p, q) => p + q, 0) + ' = ' + x);
    }));
    return H.ekDef('Sentralmål og spredning', sek);
  };

  /* ================= STATISTIKK I MEDIA ================= */
  const ORD1 = [
    ord(['statistikk'], 'Tall og data samlet inn og fortalt med tabeller, grafer og regning.'),
    ord(['utvalg'], 'De som faktisk er spurt, når vi ikke spør alle.'),
    ord(['populasjon'], 'Alle vi vil si noe om, for eksempel alle elever i Norge.'),
    ord(['representativt', 'representativ'], 'Når utvalget ligner på hele populasjonen.'),
    ord(['misvisende'], 'Som gir et feil bilde, selv om tallene stemmer.'),
    ord(['akse', 'y-aksen', 'aksen'], 'Linjen langs en graf med tall på. Hvor den starter påvirker hvordan grafen ser ut.'),
    ord(['prosentpoeng'], 'Forskjellen mellom to prosenttall. Fra 10 % til 15 % er 5 prosentpoeng.'),
    ord(['korrelasjon', 'sammenheng'], 'To ting skjer ofte samtidig. Det betyr ikke at det ene forårsaker det andre.'),
    ord(['årsak'], 'Det som får noe annet til å skje.'),
    ord(['kilde'], 'Hvor opplysningene kommer fra.')
  ];
  const U1 = [];
  U1.push(S('Tall i nyhetene', '📰', [
    P('Hver dag leser du tall i nyhetene: «Prisene økte med 5 %», «80 % av ungdom sover for lite», «Flere ulykker i år». Men er tallene presentert ærlig? Du skal lære å <strong>stille spørsmål</strong> til statistikk.'),
    C('regel', 'Sju spørsmål til en statistikk', ['Hvem har laget den, og hvorfor?', 'Hvem er spurt, og hvor mange?', 'Hva er sammenlikningen?', 'Starter aksen på 0?', 'Er det prosent eller antall?', 'Er det gjennomsnitt eller median?', 'Er det en sammenheng eller en årsak?']),
    O(1, [
      V('Hvorfor er det lurt å spørre «hvem har laget statistikken?»', ['Avsenderen kan ønske å vise noe bestemt', 'Tall er alltid feil', 'Det er ikke lurt', 'Det spiller ingen rolle'], 0, 'Tenk på reklame.', 'Avsenderen kan velge ut tall som passer budskapet.'),
      V('«Alle er enige!» står det. 3 av 3 spurte, alle familie til avsenderen. Er det god statistikk?', ['Nei', 'Ja'], 0, 'Utvalget er lite og ikke tilfeldig.', 'Utvalget er altfor lite og skjevt.', true)
    ])
  ]));
  U1.push(S('Utvalg: hvem er spurt?', '🧑‍🤝‍🧑', [
    P('Vi kan ikke alltid spørre alle. Da spør vi et <strong>utvalg</strong>. Utvalget bør være <strong>stort nok</strong> og <strong>representativt</strong>: det skal ligne på hele <strong>populasjonen</strong>.'),
    TAB(['Undersøkelse', 'Problem?'], [['«Liker du fotball?» spurt på en fotballkamp', 'Ja: kun fotballinteresserte'], ['100 tilfeldige elever fra hele skolen', 'Nei: bedre utvalg'], ['Nettavisa spør: «Er du fornøyd med regjeringen?» Bare folk som klikker svarer', 'Ja: selvvalgt utvalg']]),
    C('tips', 'Tilfeldig utvalg', 'Når alle har like stor sjanse til å bli spurt, er utvalget bedre. Dobbelt så mange svar gir ikke bedre resultat hvis utvalget er skjevt.'),
    O(2, [
      V('Du vil vite hva elevene på skolen synes om skolematen. Hvilket utvalg er best?', ['20 tilfeldige elever fra alle trinn', 'Bare de i kantina', 'Bare vennene dine', 'Bare 8. trinn'], 0, 'Alle skal ha lik sjanse.', 'Tilfeldig fra alle trinn gir et representativt utvalg.', true),
      V('Hva menes med «populasjon»?', ['Alle vi vil si noe om', 'De som svarer', 'Tallet 100', 'Gjennomsnittet'], 0, 'Det store «hele».', 'Alle vi vil si noe om.', true),
      T('Du spør 20 av 400 elever. Hvor mange prosent er spurt?', 5, '20 ÷ 400.', '20 ÷ 400 = 0,05 = 5 %.', '%')
    ])
  ]));
  U1.push(S('Grafer som lurer: aksen', '📉', [
    P('En graf kan gi et helt annet inntrykk avhengig av hvor <strong>aksen starter</strong>. Hvis y-aksen kappes (starter ikke på 0), ser små forskjeller store ut.'),
    W('mediegraf', { navn: ['Hotell A', 'Hotell B', 'Hotell C'], verdier: [92, 95, 100], start: 90, tittel: 'Samme tall, to ulike inntrykk' }),
    C('advarsel', 'Sjekk alltid aksen!', ['Starter aksen på 0?', 'Hvis ikke, hvor stor er forskjellen egentlig?', 'Regn selv ut forholdet mellom tallene.']),
    O(3, [
      V('Hva er det som gjør at forskjellen ser stor ut i grafen med akse fra 90?', ['Aksen starter ikke på 0', 'Tallene er forskjellige', 'Fargene', 'Det er feil tall'], 0, 'Se på aksen.', 'Når aksen kappes, blir søylene kortere og forskjellene virker store.', true),
      T('En graf viser A = 95 og B = 100 med akse fra 90. Søyle A ser ut til å være 5 høy og B 10 høy. Hvor mange ganger høyere ser B ut til å være enn A?', 2, '10 ÷ 5.', '10 ÷ 5 = 2 ganger høyere (ser ut). Egentlig er B bare 100 ÷ 95 ≈ 1,05 ganger høyere.'),
      V('Hvilken akse er mest ærlig for søylediagram?', ['Starter på 0', 'Starter på laveste verdi', 'Starter på 90', 'Det spiller ingen rolle'], 0, 'Søylelengden skal følge verdien.', 'Søylelengde skal være proporsjonal med verdien, og det krever start på 0.', true)
    ])
  ]));
  U1.push(S('Prosent eller antall?', '％', [
    P('«Økte med 50 %!» kan høres mye ut, men hva er utgangspunktet? Hvis det var 2 og ble 3, er økningen 50 %, men bare 1 mer.'),
    E('En butikk selger 2 sykler i fjor og 3 i år. Økning i prosent?', ['Økning: 3 − 2 = 1.', '1 ÷ 2 = 0,5.', '0,5 = 50 %. Svar: 50 %.']),
    C('regel', 'Prosentpoeng', 'Går noe fra 10 % til 15 %, er det en økning på <strong>5 prosentpoeng</strong>, men en økning på <strong>50 %</strong> (5 ÷ 10 = 0,5).'),
    O(4, [
      T('Antallet øker fra 4 til 6. Hvor mange prosent økte det?', 50, '(6 − 4) ÷ 4.', '2 ÷ 4 = 0,5 = 50 %.', '%'),
      T('Andelen røykere gikk fra 20 % til 15 %. Hvor mange prosentpoeng er nedgangen?', 5, '20 − 15.', '20 − 15 = 5 prosentpoeng.', 'prosentpoeng'),
      T('Andelen gikk fra 20 % til 15 %. Hvor mange prosent har andelen sunket? (5 ÷ 20)', 25, '5 ÷ 20 = 0,25.', '5 ÷ 20 = 0,25 = 25 %.', '%'),
      V('«Ulykkene doblet seg!» Fra 1 til 2 per år. Hva bør du spørre om?', ['Hvor mange er det egentlig?', 'Hvorfor dobbelt?', 'Hvem skrev det?', 'Det er ingenting å spørre om'], 0, 'Prosent kan skjule små tall.', 'Fra 1 til 2 er en dobling, men fortsatt små tall.')
    ])
  ]));
  U1.push(S('Snitt, median og lønn', '💼', [
    P('Når en avis skriver «gjennomsnittslønnen er 700 000 kr», kan et fåtall høye lønner dra snittet opp. <strong>Medianen</strong> gir ofte et bedre bilde. Derfor må du alltid spørre: <em>er dette gjennomsnitt eller median?</em>'),
    O(4, [
      T('Fire personer tjener 300, 320, 330 og 350 tusen. En femte tjener 2 000 tusen. Hva er gjennomsnittet (i tusen)?', 660, 'Sum 3300 ÷ 5.', '(300 + 320 + 330 + 350 + 2000) ÷ 5 = 3300 ÷ 5 = 660.', 'tusen kr'),
      T('Samme gruppe. Hva er medianen (i tusen)?', 330, 'Midterste av fem.', 'Sortert: 300, 320, 330, 350, 2000. Median = 330.', 'tusen kr'),
      V('En politiker sier: «Gjennomsnittslønnen er 660 000, så vi har det bra!» Hva er problemet?', ['Én høy lønn drar snittet opp', 'Ingen problemer', 'Snittet er for lavt', 'Medianen er høyere'], 0, 'Se på tallene over.', 'De fleste tjener ca. 330 000, men én lønn på 2 millioner drar snittet opp.')
    ])
  ]));
  U1.push(S('Sammenheng er ikke årsak', '🍦', [
    P('Når to ting skjer samtidig, betyr det ikke at det ene <strong>forårsaker</strong> det andre. Is-salg og drukningsulykker øker begge om sommeren. Men isen får ingen til å drukne: det er <strong>varmen</strong> som gjør at både flere kjøper is og flere bader.'),
    C('mestring', 'Skjult faktor', 'Ofte finnes det en tredje ting (en <em>skjult faktor</em>) som påvirker begge. I eksempelet er det været.'),
    O(5, [
      V('Skoene i en by og antall paraplyer øker begge i regnvær. Hva er årsaken til begge?', ['Regnvær', 'Paraplyene', 'Skoene', 'Tilfeldigheter'], 0, 'Hva skjer når det regner?', 'Regn er den felles årsaken.'),
      V('Elever som spiser frokost har bedre karakterer. Kan vi konkludere at frokost gir bedre karakterer?', ['Nei, ikke alene', 'Ja, helt sikkert', 'Nei, aldri', 'Bare for gutter'], 0, 'Andre ting kan spille inn.', 'Elevene kan ha trygg hverdag og mer overskudd. Det kan være andre årsaker.')
    ])
  ]));
  U1.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('En reklame viser to søyler: «Vår kjeks: 98» og «Konkurrenten: 100». Aksen starter på 96. Hva er misvisende, og hvordan kan du gjøre den ærlig?', ['Med akse fra 96 er vår søyle 2 høy og konkurrentens 4 høy, så den ser dobbelt så høy ut.', 'Egentlig er forskjellen bare 2 av 100.', 'Ærlig graf: la aksen starte på 0.']),
      F('«9 av 10 tannleger anbefaler …» Hvilke spørsmål bør du stille?', ['Hvor mange tannleger er spurt? Kan det være bare 10?', 'Hvem er spurt og hvem har betalt for undersøkelsen?', 'Hva er anbefalt? Var det flere valg?']),
      F('Lag en egen overskrift med tall som kan misforstås, og forklar hvordan den kan skrives mer ærlig.', ['Eksempel: «Ulykkene økte med 100 %!» (fra 1 til 2).', 'Mer ærlig: «Antall ulykker økte fra 1 til 2.»', 'Gi alltid tall og utgangspunkt, ikke bare prosent.'])
    ]),
    SJ('Dette kan du nå', ['Stille spørsmål til statistikk', 'Vurdere utvalg', 'Oppdage misvisende grafer', 'Skille prosent og prosentpoeng', 'Velge snitt eller median', 'Skille sammenheng fra årsak'])
  ]));
  M.register('utforsk', '9/statistikk-media', {
    tittel: 'Statistikk i media',
    ingress: 'Tall kan fortelle sannheten eller lure deg. Du lærer å lese grafer og overskrifter kritisk.',
    mal: ['tolke og kritisk vurdere statistiske framstillinger fra media', 'sammenligne framstillinger som fremmer ulike synspunkter'], ordliste: ORD1, seksjoner: U1
  });
  const T1 = [];
  T1.push(S('Steg 1: Se på aksen', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('En graf kan lure deg. Se alltid på <strong>hvor aksen starter</strong>.', true),
    W('mediegraf', { navn: ['A', 'B'], verdier: [95, 100], start: 90, tittel: 'Trykk mellom de to grafene' }),
    OS([
      V('Hvor bør aksen starte for å være mest ærlig?', ['0', '90', '95'], 0, 'Søylene skal vise hele tallet.', 'Starter aksen på 0, er søylehøydene i riktig forhold til tallene. Starter den høyere, ser forskjellene større ut enn de er.', true),
      V('Når aksen starter på 90, ser forskjellen ut…', ['større enn den er', 'mindre enn den er', 'akkurat riktig'], 0, 'Søylene blir kortere.', 'Større enn den er.', true)
    ])
  ]));
  T1.push(S('Steg 2: Hvem er spurt?', '2', [
    G('Hvem som blir spurt er viktig.'),
    P('Et godt utvalg ligner på alle vi vil vite noe om, og er stort nok.', true),
    OS([
      V('Du vil vite hva elevene på skolen liker å spise. Hvem bør du spørre?', ['Tilfeldige elever fra hele skolen', 'Bare vennene dine', 'Bare dem i 8. trinn'], 0, 'Alle skal ha lik sjanse.', 'Tilfeldige elever fra hele skolen.', true),
      T('Du spør 10 av 100 elever. Hvor mange prosent er spurt?', 10, '10 ÷ 100.', '10 ÷ 100 = 0,10 = 10 %.', '%')
    ])
  ]));
  T1.push(S('Steg 3: Snitt og median', '3', [
    G('Snitt og median kan gi ulike svar.'),
    E('Tallene 2, 3, 3, 4, 38. Hva er snitt og median?', ['Snitt: 50 ÷ 5 = 10.', 'Median: 3 (midterste).', 'Snittet 10 er mye større enn det som er typisk. Medianen 3 er bedre. 🎉']),
    OS([
      T('Fem tall: 1, 2, 3, 4, 40. Hva er medianen?', 3, 'Det midterste.', 'Median er 3.'),
      T('Samme tall. Hva er snittet? (Sum er 50)', 10, '50 ÷ 5.', '50 ÷ 5 = 10.'),
      V('Hvilket gir best bilde av hva som er typisk her?', ['Medianen', 'Snittet'], 0, 'En stor verdi dytter snittet opp.', 'Medianen.', true)
    ])
  ]));
  T1.push(S('Steg 4: Prosent eller antall', '4', [
    G('Siste steg: prosent kan lure deg.'),
    E('Fra 2 til 3. Hvor mange prosent økte det?', ['Økning: 1.', '1 ÷ 2 = 0,5 = 50 %.', 'En liten økning (1) kan se stor ut i prosent (50 %). 🎉']),
    OS([
      T('Fra 4 til 6. Hvor mange prosent økte det?', 50, '2 ÷ 4.', '2 ÷ 4 = 0,5 = 50 %.', '%'),
      T('Fra 10 til 20. Hvor mange prosent økte det?', 100, '10 ÷ 10.', '10 ÷ 10 = 1 = 100 %.', '%')
    ]),
    SJ('Dette kan du nå', ['Sjekke aksen på grafer', 'Vurdere hvem som er spurt', 'Se forskjell på snitt og median', 'Forstå at prosent kan lure'])
  ]));
  M.register('steg', '9/statistikk-media', {
    tittel: 'Statistikk i media',
    ingress: 'Små steg: du lærer å stille spørsmål til grafer og tall i nyhetene.',
    mal: ['kritisk vurdere statistikk'], ordliste: ORD1, seksjoner: T1
  });
  M.ekstra['9/statistikk-media'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('pst', '％', 'Prosentvis økning', 8, 'Hvor mange prosent økte det? (Svar i %.)', function (r) {
      const a = r.pick([2, 4, 5, 10, 20, 25, 50]), p = r.pick(lett ? [50, 100] : [10, 20, 25, 50, 100]); const b = a + a * p / 100;
      return H.e('Fra ' + a + ' til ' + M.fmt(b) + '.', p, '(' + M.fmt(b) + ' − ' + a + ') ÷ ' + a + ' = ' + M.fmt(p / 100) + ' = ' + p + ' %');
    }));
    sek.push(H.ek('pp', '📉', 'Prosentpoeng', 6, 'Hvor mange prosentpoeng er forskjellen?', function (r) {
      const a = r.int(10, 60), b = r.int(5, 9); return H.e('Andelen gikk fra ' + a + ' % til ' + (a - b) + ' %.', b, a + ' − ' + (a - b) + ' = ' + b + ' prosentpoeng');
    }));
    sek.push(H.ek('utv', '🧑‍🤝‍🧑', 'Utvalg i prosent', 6, 'Hvor mange prosent er spurt?', function (r) {
      const n = r.pick([100, 200, 400, 500]), k = r.pick([5, 10, 20, 25, 50]); const p = k / n * 100; return H.e(k + ' av ' + n + ' er spurt.', p, k + ' ÷ ' + n + ' = ' + M.fmt(p / 100) + ' = ' + M.fmt(p) + ' %');
    }));
    sek.push(H.ek('snittmed', '💼', 'Snitt med en høy verdi', 6, 'Regn ut gjennomsnittet.', function (r) {
      const a = r.int(3, 6) * 100, b = r.int(3, 6) * 100, c = r.int(3, 6) * 100, d = r.int(3, 6) * 100; const s = a + b + c + d + 2000 - 0; const snitt = s / 5; return H.e('Fem lønner (i tusen): ' + a + ', ' + b + ', ' + c + ', ' + d + ' og 2000.', snitt, '(' + a + ' + ' + b + ' + ' + c + ' + ' + d + ' + 2000) ÷ 5 = ' + M.fmt(snitt));
    }));
    return H.ekDef('Statistikk i media', sek);
  };
})();
