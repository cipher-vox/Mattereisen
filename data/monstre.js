/* ============================================================
   Tema: Mønstre og generalisering (8. trinn) – UTFORSK + STEG + EKSTRA
   Læreplan 8.4: utforske og generalisere geometriske mønstre og tallmønstre
   med egne ord og algebraisk
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, H2, SJ, S, ord } = H;
  const ORD = [
    ord(['mønster', 'mønstre', 'mønsteret'], 'Noe som gjentar seg eller vokser på en regelmessig måte.'),
    ord(['tallmønster', 'tallmønstre', 'tallrekke'], 'En rekke tall som følger en regel.'),
    ord(['figurtall'], 'Tall som viser antall ruter, prikker eller fyrstikker i en rekke figurer. Figurene vokser etter en regel.'),
    ord(['generalisere', 'generalisering'], 'Å finne en regel som gjelder for alle tilfeller, ikke bare noen få.'),
    ord(['formel', 'formelen'], 'En regel skrevet med bokstaver. 3n + 1 er en formel for fyrstikkmønsteret.'),
    ord(['variabel', 'variabelen'], 'En bokstav som står for et tall som kan variere, for eksempel n.'),
    ord(['differanse', 'differansen'], 'Forskjellen mellom to tall. Differansen mellom 7 og 11 er 4.'),
    ord(['trekanttall'], 'Tallene 1, 3, 6, 10, 15 … Du får dem ved å legge sammen 1 + 2 + 3 + …'),
    ord(['kvadrattall'], 'Tallene 1, 4, 9, 16, 25 … Du får dem ved å gange et tall med seg selv.')
  ];

  /* ====================== UTFORSK ====================== */
  const U = [];
  U.push(S('Tallmønstre: hva kommer så?', '🔷', [
    P('Hva kommer etter 3, 7, 11, 15, …? Du ser at det blir <strong>4 mer</strong> hver gang. Neste tall er 19. Det du gjorde, var å se et <strong>mønster</strong> og finne regelen.'),
    TAB(['Rekke', 'Regel', 'Neste'], [['3, 7, 11, 15, …', '+ 4 hver gang', '19'], ['50, 45, 40, 35, …', '− 5 hver gang', '30'], ['2, 4, 8, 16, …', '· 2 hver gang', '32'], ['1, 4, 9, 16, …', 'Kvadrattall', '25'], ['1, 3, 6, 10, …', 'Trekanttall: legg til 2, 3, 4, 5 …', '15']]),
    C('tips', 'Slik finner du regelen', ['1. Finn <strong>differansen</strong> mellom hvert tall.', '2. Er den alltid lik? Da legger du til (eller trekker fra) det samme.', '3. Vokser den? Se på om det er gange, kvadrat eller «økende hopp».']),
    E('Finn regelen: 5, 8, 11, 14, …', ['Differansene: 8 − 5 = 3, 11 − 8 = 3, 14 − 11 = 3.', 'Alle er 3. Regelen er «legg til 3».', 'Neste tall: 14 + 3 = 17.']),
    O(1, [
      T('Hva er neste tall? 2, 6, 10, 14, …', 18, 'Finn differansen.', 'Differansen er 4. 14 + 4 = 18.'),
      T('Hva er neste tall? 40, 35, 30, 25, …', 20, 'Det går nedover.', 'Differansen er −5. 25 − 5 = 20.'),
      T('Hva er neste tall? 3, 6, 12, 24, …', 48, 'Hvert tall er dobbelt så stort.', '24 · 2 = 48.'),
      T('Hva er neste tall? 1, 4, 9, 16, 25, …', 36, 'Kvadrattall.', '6 · 6 = 36.'),
      V('Hvilken regel passer for 1, 2, 4, 8, 16?', ['· 2', '+ 2', '+ 4', '· 4'], 0, '2 : 1 = 2, 4 : 2 = 2 …', 'Hvert tall er dobbelt så stort som det forrige: gange med 2.')
    ])
  ]));

  U.push(S('Figurtall: mønstre du kan se', '🧱', [
    P('Mønstre kan også vises som <strong>figurer</strong>. Hver figur har et antall ruter, prikker eller fyrstikker. Dra i glideren og se hvordan antallet vokser.'),
    W('figurtall', { type: 'kvadrat', n: 3, tittel: 'Kvadrattall' }),
    W('figurtall', { type: 'trapp', n: 4, tittel: 'Trekanttall (trapp)' }),
    TAB(['Figur nr.', '1', '2', '3', '4', '5'], [['Kvadrattall', '1', '4', '9', '16', '25'], ['Trekanttall', '1', '3', '6', '10', '15']]),
    C('tips', 'Se mønsteret på to måter', ['<strong>Rekursivt</strong>: fra figur til figur. Trekanttallene øker med 2, 3, 4, 5 …', '<strong>Direkte</strong>: en formel som gir figur nr. n med en gang. Kvadrattall: n · n.']),
    O(2, [
      T('Hvor mange ruter er det i kvadrat-figur nummer 6?', 36, 'n · n.', '6 · 6 = 36.'),
      T('Hvor mange ruter er det i trapp-figur nummer 5? (1 + 2 + 3 + 4 + 5)', 15, 'Legg sammen.', '1 + 2 + 3 + 4 + 5 = 15.'),
      T('Hvor mange mer ruter har kvadrat-figur 5 enn figur 4?', 9, '25 − 16.', '5² − 4² = 25 − 16 = 9.'),
      V('Hvilket tall er IKKE et kvadrattall?', ['50', '49', '64', '81'], 0, '7² = 49, 8² = 64.', '50 ligger mellom 49 og 64.', true),
      T('Hva er trekanttall nummer 10? (1 + 2 + … + 10)', 55, 'Bruk 10 · 11 : 2.', '10 · 11 : 2 = 55.')
    ])
  ]));

  U.push(S('Fra mønster til formel', '🔤', [
    P('En <strong>formel</strong> gjør at du kan finne figur nummer 100 uten å tegne de 99 første. Du bruker en bokstav, ofte <strong>n</strong>, for «figur nummer».'),
    W('figurtall', { type: 'fyrstikk', n: 3, maxN: 8, tittel: 'Fyrstikkmønster' }),
    E('Finn formelen for fyrstikkmønsteret: 4, 7, 10, 13, …', ['Figur 1 har 4, figur 2 har 7, figur 3 har 10.', 'Det kommer 3 nye for hver figur. Så formelen har «3 · n».', 'For n = 1 gir 3 · 1 = 3, men vi skal ha 4. Vi må legge til 1.', 'Formel: 3n + 1. Sjekk: n = 3 gir 3 · 3 + 1 = 10. ✓']),
    C('regel', 'Lineære mønstre', ['Når <strong>differansen er lik</strong> hver gang, er formelen <strong>a · n + b</strong>.', '<strong>a</strong> er hvor mye som legges til for hver figur (differansen).', '<strong>b</strong> får du ved å sjekke: ta verdi for n = 1 og se hva som mangler.']),
    TAB(['Mønster', 'Antall', 'Differanse', 'Formel'], [['Fyrstikkrekke', '4, 7, 10, 13, …', '3', '3n + 1'], ['Kors (pluss)', '5, 9, 13, 17, …', '4', '4n + 1'], ['Ramme', '8, 12, 16, 20, …', '4', '4n + 4'], ['Partall', '2, 4, 6, 8, …', '2', '2n'], ['Oddetall', '1, 3, 5, 7, …', '2', '2n − 1']]),
    E('Bruk formelen 3n + 1 til å finne figur nummer 20.', ['Sett n = 20 inn i formelen.', '3 · 20 + 1 = 60 + 1.', 'Svar: 61 fyrstikker.']),
    E('Hvilken figur har 100 fyrstikker?', ['Vi vil ha 3n + 1 = 100.', 'Trekk fra 1: 3n = 99.', 'Del på 3: n = 33.', 'Svar: figur nummer 33.']),
    O(3, [
      T('Fyrstikkmønsteret har formel 3n + 1. Hvor mange fyrstikker er det i figur 10?', 31, 'Sett n = 10.', '3 · 10 + 1 = 31.'),
      T('Hvilken figur har 40 fyrstikker? (3n + 1 = 40)', 13, 'Trekk fra 1 og del på 3.', '3n = 39, så n = 13.'),
      V('Hva er formelen for 2, 5, 8, 11, 14, …?', ['3n − 1', '3n + 1', '2n + 3', 'n + 3'], 0, 'Differansen er 3. For n = 1 skal du få 2.', '3 · 1 = 3, men vi skal ha 2, så trekk fra 1: 3n − 1.'),
      V('Hva er formelen for 6, 10, 14, 18, …?', ['4n + 2', '4n', '6n', 'n + 4'], 0, 'Differansen er 4. For n = 1 skal du få 6.', '4 · 1 = 4, men vi skal ha 6, så legg til 2: 4n + 2.'),
      T('Formelen for et mønster er 5n − 2. Hva er figur 8?', 38, 'Sett n = 8.', '5 · 8 − 2 = 38.'),
      T('Kors-mønsteret har formel 4n + 1. Hvilken figur har 81 ruter?', 20, '4n = 80.', '4n + 1 = 81 gir 4n = 80, så n = 20.')
    ])
  ]));

  U.push(S('Å forklare regelen med egne ord og med bokstaver', '🗣️', [
    P('I matte skal du kunne forklare mønsteret på <strong>tre måter</strong>: med ord, med en tabell og med en formel. Her er et eksempel.'),
    E('Mønster: Rammer av kvadrater rundt en tom plass i midten. Figur n har en indre firkant n × n og en ramme av ruter rundt.', ['<strong>Med ord</strong>: Rammen har like mange ruter langs de fire sidene. Hver side er n + 1 ruter hvis vi ikke teller hjørnene to ganger, så det blir 4 · (n + 1) ruter.', '<strong>Tabell</strong>: n = 1 gir 8, n = 2 gir 12, n = 3 gir 16.', '<strong>Formel</strong>: 4n + 4, som også kan skrives 4(n + 1). De to skrivemåtene er like (distributiv regel!).']),
    W('figurtall', { type: 'ramme', n: 3, maxN: 8, tittel: 'Ramme rundt en tom firkant' }),
    C('tips', 'Ulike formler kan være like', 'Elever kan se mønsteret på ulike måter og få formler som ser forskjellige ut, for eksempel 4n + 4 og 4(n + 1). De er like. Sjekk ved å sette inn noen verdier av n.'),
    O(4, [
      T('Rammen i figur 5 har 4n + 4 ruter. Hvor mange?', 24, 'Sett n = 5.', '4 · 5 + 4 = 24.'),
      V('To elever har formlene 4n + 4 og 4(n + 1). Hvem har rett?', ['Begge', 'Bare den første', 'Bare den andre', 'Ingen'], 0, 'Sett inn n = 3 i begge.', '4 · 3 + 4 = 16 og 4 · (3 + 1) = 16. De er like (distributiv regel).', true),
      F('Beskriv med egne ord hvordan figurene i fyrstikkmønsteret 4, 7, 10, 13 vokser. Forklar hvorfor formelen er 3n + 1.', ['Hver figur får 3 fyrstikker mer enn den forrige. Figuren har et «startpunkt» på 1 fyrstikk, og så 3 for hver kvadrat n.', 'Derfor: antall = 3 · n + 1.']),
      F('Lag ditt eget fyrstikkmønster eller figurmønster. Beskriv det med ord, tabell og formel.', ['Svarene er ulike. Et godt svar har: en tegning av figur 1–3, en tabell med n og antall, og en formel som gir riktig antall når du setter inn n = 1, 2 og 3.'])
    ])
  ]));

  U.push(S('Lineær vekst og dobling', '📈', [
    P('Noen mønstre vokser med like mye hver gang (<strong>lineært</strong>). Andre vokser <strong>raskere og raskere</strong>, som når noe dobles.'),
    TAB(['Figur nr.', '1', '2', '3', '4', '5', '6'], [['Lineær: 3n + 1', '4', '7', '10', '13', '16', '19'], ['Dobling: 2ⁿ', '2', '4', '8', '16', '32', '64']]),
    W('figurtall', { type: 'dobling', n: 4, tittel: 'Dobling: hver figur dobles' }),
    C('virkelighet', 'Hvorfor er dette viktig?', 'Lineær vekst er som å spare 50 kr hver uke. Dobling er som en bakteriekoloni eller et rykte som sprer seg. Om kort tid er doblingen langt større. Dette ser du igjen i funksjoner og rente på 10. trinn.'),
    O(3, [
      T('Hva er neste tall? 1, 2, 4, 8, 16, …', 32, 'Doble.', '16 · 2 = 32.'),
      T('Lineært mønster: 3n + 1 gir 31 i figur 10. Dobling 2ⁿ gir hva i figur 10?', 1024, '2¹⁰.', '2¹⁰ = 1024. Dobling vokser mye raskere.'),
      V('Hvilket vokser raskest på lang sikt?', ['Dobling', 'Legge til 3', 'Legge til 100', 'De er like'], 0, 'Tenk på figur 50.', 'Dobling til slutt overgår alle lineære mønstre, selv om det starter lavt.', true)
    ])
  ]));

  U.push(S('Undersøk og bevis', '🔎', [
    P('Mønstre er ikke bare gøy. De kan være vei til <strong>generelle sannheter</strong> som du kan forklare.'),
    E('Hvor mye er summen av de første n oddetallene?', ['1 = 1', '1 + 3 = 4', '1 + 3 + 5 = 9', '1 + 3 + 5 + 7 = 16.', 'Mønster: summen er alltid et kvadrattall, n · n. Du kan se det som L-formede lag som bygger et kvadrat.']),
    E('Gauss og tallene fra 1 til 100', ['Den unge Gauss regnet 1 + 2 + 3 + … + 100 slik: Par første og siste: 1 + 100 = 101, 2 + 99 = 101 …', 'Det er 50 slike par.', '50 · 101 = 5050.', 'Formelen for summen av 1 til n er n · (n + 1) : 2. Dette er trekanttallene.']),
    O(4, [
      T('1 + 3 + 5 + 7 + 9 = ? (Fem oddetall.)', 25, 'Kvadrattall.', 'Summen av de 5 første oddetallene er 5² = 25.'),
      T('Hva er summen 1 + 2 + 3 + … + 20? (n(n + 1) : 2)', 210, '20 · 21 : 2.', '20 · 21 = 420, og 420 : 2 = 210.'),
      T('Hva er summen 1 + 2 + … + 100?', 5050, '100 · 101 : 2.', '100 · 101 : 2 = 5050.'),
      F('Undersøk: Hva er summen av to etterfølgende trekanttall (1 + 3, 3 + 6, 6 + 10)? Hva ser du?', ['1 + 3 = 4, 3 + 6 = 9, 6 + 10 = 16, 10 + 15 = 25.', 'Summen av to etterfølgende trekanttall er et kvadrattall: 2², 3², 4², 5². Du kan se det ved å legge to trapper sammen til et kvadrat.']),
      F('Påstand: «Summen av tre etterfølgende tall er alltid delelig med 3.» Undersøk og forklar.', ['Prøv: 4 + 5 + 6 = 15, 10 + 11 + 12 = 33, 1 + 2 + 3 = 6. Alle er delelige med 3.', 'Forklaring: tallene er n, n + 1 og n + 2. Summen er 3n + 3 = 3(n + 1), som alltid har 3 som faktor.'])
    ]),
    SJ('Dette kan du nå', ['Finne regelen i et tallmønster', 'Forklare figurtall med ord, tabell og formel', 'Finne formelen a · n + b', 'Bruke formelen til å finne figur n og til å finne n', 'Skille lineær vekst fra dobling'])
  ]));

  M.register('utforsk', '8/monstre', {
    tittel: 'Mønstre og generalisering',
    ingress: 'Mønstre er overalt. Du lærer å se regelen, forklare den og skrive den som en formel som gjelder for alle figurer.',
    mal: ['utforske og generalisere geometriske mønstre og tallmønstre', 'beskrive mønstre med egne ord og algebraisk'],
    ordliste: ORD, seksjoner: U
  });

  /* ====================== STEG ====================== */
  const T1 = [];
  T1.push(S('Steg 1: Se mønsteret', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Et <strong>mønster</strong> er en rekke som følger en regel. Se her: 2, 4, 6, 8, … Hva kommer nå? Det er <strong>10</strong>. Du legger til 2 hver gang.', true),
    C('tips', 'Slik finner du regelen', ['Se på tallene ett og ett.', 'Hvor mye er det mellom hvert tall?', 'Hvis det er det samme hver gang, legg det til for å finne neste.']),
    E('Hva er neste tall? 3, 6, 9, 12, …', ['Hvor mye er det mellom tallene? 6 − 3 = 3. 9 − 6 = 3.', 'Det er 3 hver gang.', '12 + 3 = 15.', 'Svar: 15. 🎉']),
    OS([
      T('Hva er neste tall? 1, 3, 5, 7, …', 9, 'Legg til 2.', '7 + 2 = 9.'),
      T('Hva er neste tall? 5, 10, 15, 20, …', 25, 'Legg til 5.', '20 + 5 = 25.'),
      T('Hva er neste tall? 20, 18, 16, 14, …', 12, 'Trekk fra 2.', '14 − 2 = 12.'),
      T('Hva er neste tall? 1, 2, 4, 8, …', 16, 'Dobbelt så stort.', '8 · 2 = 16.')
    ])
  ]));
  T1.push(S('Steg 2: Figurer som vokser', '2', [
    G('Mønstre kan også være figurer.'),
    P('Her vokser figuren. Dra i glideren og tell fyrstikkene.', true),
    W('figurtall', { type: 'fyrstikk', n: 2, maxN: 6, tittel: 'Fyrstikker' }),
    C('regel', 'Husk', ['Tell antallet i hver figur.', 'Finn ut hvor mye mer det blir for hver figur.', 'Bruk det til å finne neste.']),
    E('Fyrstikker: figur 1 har 4, figur 2 har 7, figur 3 har 10. Hvor mange er det i figur 4?', ['Det blir 3 mer for hver figur.', '10 + 3 = 13.', 'Svar: 13 fyrstikker. 🎉']),
    OS([
      T('Figur 1: 5 ruter, figur 2: 8 ruter, figur 3: 11 ruter. Hvor mange i figur 4?', 14, 'Det blir 3 mer.', '11 + 3 = 14.'),
      T('Figur 1: 2 ruter, figur 2: 4 ruter, figur 3: 6 ruter. Hvor mange i figur 5?', 10, 'Legg til 2 hver gang.', 'Figur 4 har 8 og figur 5 har 10.'),
      T('Kvadratfigurer: 1, 4, 9, 16. Hvor mange er det i figur 5?', 25, '5 · 5.', '5 · 5 = 25.'),
      T('Hvor mange ruter er det i kvadratfigur 6?', 36, '6 · 6.', '6 · 6 = 36.')
    ])
  ]));
  T1.push(S('Steg 3: Regelen med bokstaver', '3', [
    G('Nå skriver vi regelen kort, med en bokstav.'),
    P('Vi bruker <strong>n</strong> som «figur nummer». For fyrstikkene (4, 7, 10, 13) er regelen <strong>3n + 1</strong>. Det betyr: «gang figurnummeret med 3 og legg til 1».', true),
    E('Bruk 3n + 1 til å finne figur 5.', ['n er 5. Vi setter 5 inn der n står.', '3 · 5 + 1.', '15 + 1 = 16.', 'Svar: 16 fyrstikker. 🎉']),
    E('Bruk 2n + 3 til å finne figur 4.', ['n er 4.', '2 · 4 + 3.', '8 + 3 = 11.', 'Svar: 11. 🎉']),
    OS([
      T('Regel: 3n + 1. Hva er figur 2?', 7, 'n = 2.', '3 · 2 + 1 = 7.'),
      T('Regel: 3n + 1. Hva er figur 10?', 31, 'n = 10.', '3 · 10 + 1 = 31.'),
      T('Regel: 2n + 3. Hva er figur 5?', 13, 'n = 5.', '2 · 5 + 3 = 13.'),
      T('Regel: 4n. Hva er figur 6?', 24, 'n = 6.', '4 · 6 = 24.')
    ])
  ]));
  T1.push(S('Steg 4: Finne regelen selv', '4', [
    G('Nå skal du finne regelen selv.'),
    C('regel', 'Slik gjør du', ['1. Finn hvor mye det øker for hver figur. Det tallet står foran n.', '2. Se på figur 1. Mangler det noe? Legg til eller trekk fra det.']),
    E('Finn regelen for 5, 8, 11, 14, …', ['Det øker med 3 hver gang. Regelen starter med 3n.', 'For figur 1 gir 3n = 3. Men figur 1 har 5.', 'Vi må legge til 2.', 'Regel: 3n + 2. 🎉']),
    OS([
      V('Regelen for 4, 7, 10, 13 er?', ['3n + 1', '4n', 'n + 3'], 0, 'Det øker med 3. 3 · 1 = 3, og vi skal ha 4.', 'Regel: 3n + 1.', true),
      V('Regelen for 2, 4, 6, 8 er?', ['2n', 'n + 2', '2n + 1'], 0, 'Det øker med 2. 2 · 1 = 2.', 'Regel: 2n.', true),
      V('Regelen for 3, 5, 7, 9 er?', ['2n + 1', '2n', '3n'], 0, 'Det øker med 2. 2 · 1 = 2, og vi skal ha 3.', 'Regel: 2n + 1.', true),
      T('Regelen er 4n + 1. Hva er figur 7?', 29, 'n = 7.', '4 · 7 + 1 = 29.')
    ]),
    SJ('Dette kan du nå', ['Finne neste tall i et mønster', 'Telle ruter og fyrstikker i figurer', 'Bruke en regel med n', 'Finne en enkel regel selv'])
  ]));

  M.register('steg', '8/monstre', {
    tittel: 'Mønstre og generalisering',
    ingress: 'Små steg, tydelige eksempler og hjelp hele veien. Du lærer å se mønstre og skrive regler.',
    mal: ['se regelen i et mønster', 'bruke en regel med n', 'finne en enkel regel selv'],
    ordliste: ORD, seksjoner: T1
  });

  /* ====================== EKSTRA ====================== */
  M.ekstra['8/monstre'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('neste', '➡️', 'Neste tall', 8, 'Finn regelen og skriv neste tall.', function (r, i) {
      const a = r.int(1, 20), d = r.int(2, lett ? 6 : 12) * (i % 4 === 3 && !lett ? -1 : 1); const s = [0, 1, 2, 3].map(k => a + d * k + (d < 0 ? 40 : 0));
      return H.e(s.join(', ') + ', … Hva er neste tall?', s[3] + d, s[3] + d + ' (differansen er ' + d + ')');
    }));
    sek.push(H.ek('formel', '🔤', 'Bruk formelen', 8, 'Sett inn n i formelen.', function (r) {
      const a = r.int(2, lett ? 5 : 9), b = r.int(1, 9), n = r.int(3, lett ? 8 : 25); const pm = lett || r.int(0, 1) === 0;
      const v = a * n + (pm ? b : -b);
      return H.e('Et mønster har formelen ' + a + 'n ' + (pm ? '+' : '−') + ' ' + b + '. Hva er figur ' + n + '?', v, a + ' · ' + n + (pm ? ' + ' : ' − ') + b + ' = ' + v);
    }));
    sek.push(H.ek('finn', '🔎', 'Hvilken figur?', 8, lett ? 'Finn n. Tips: trekk fra først, og del så.' : 'Hvilken figur har dette antallet? Løs ligningen.', function (r) {
      const a = r.int(2, lett ? 5 : 9), b = r.int(1, 9), n = r.int(3, lett ? 10 : 30); const v = a * n + b;
      return H.e('Formelen er ' + a + 'n + ' + b + '. Hvilken figur har ' + v + '?', n, a + 'n + ' + b + ' = ' + v + ' gir ' + a + 'n = ' + (v - b) + ', så n = ' + n);
    }));
    sek.push(H.ek('lag', '🧪', 'Finn formelen', 8, 'Finn tallet a og b i formelen an + b. Skriv summen a + b (som også er figur 1).', function (r) {
      const a = r.int(2, 8), b = r.int(0, 6); const s = [1, 2, 3, 4].map(n => a * n + b);
      return H.e('Antall i figur 1, 2, 3, 4 er ' + s.join(', ') + '. Hva er antallet i figur 10?', a * 10 + b, 'Differansen er ' + a + ', og formelen er ' + a + 'n' + (b ? ' + ' + b : '') + '. Figur 10: ' + a + ' · 10' + (b ? ' + ' + b : '') + ' = ' + (a * 10 + b));
    }));
    if (!lett) sek.push(H.ek('trekant', '🔺', 'Trekanttall og kvadrattall', 6, 'Bruk n(n+1):2 for trekanttall og n² for kvadrattall.', function (r, i) {
      const n = r.int(5, 30);
      return i % 2 === 0 ? H.e('Hva er summen 1 + 2 + 3 + … + ' + n + '?', n * (n + 1) / 2, n + ' · ' + (n + 1) + ' : 2 = ' + n * (n + 1) / 2) : H.e('Hva er summen av de ' + n + ' første oddetallene?', n * n, n + ' · ' + n + ' = ' + n * n);
    }));
    return H.ekDef('Mønstre og generalisering', sek);
  };
})();
