/* ============================================================
   10. trinn: Kjøp, sparing og lån + Utforskende arbeid: din økonomi
   Læreplan 10.7 og 10.8
   (Ingen data lagres. Alt regnes ut i nettleseren og forsvinner når siden lukkes.)
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, SJ, S, ord } = H;
  const TEAL = '#0e8f9b', ORANGE = '#e8964a';

  /* ================= KJØP, SPARING OG LÅN ================= */
  const ORD1 = [
    ord(['rente', 'renter', 'renten'], 'Prisen for å låne penger, eller belønningen for å spare. Oppgis i prosent per år.'),
    ord(['rentes rente'], 'Når renten blir lagt til sparingen, og du får rente også på de rentepengene neste år.'),
    ord(['lån', 'lånet'], 'Penger du låner og betaler tilbake med renter.'),
    ord(['avdrag'], 'Den delen av lånet du betaler ned. Renter kommer i tillegg.'),
    ord(['termin', 'terminbeløp'], 'Beløpet du betaler hver gang, for eksempel hver måned: avdrag pluss renter.'),
    ord(['serielån'], 'Lån med like store avdrag hver gang. Rentene blir mindre, så terminbeløpet synker.'),
    ord(['annuitetslån'], 'Lån der du betaler like mye hver termin (renter og avdrag samlet).'),
    ord(['saldo'], 'Hva som står igjen på kontoen eller lånet.'),
    ord(['mva', 'merverdiavgift'], 'Skatt på varer og tjenester. Standardsatsen i Norge er 25 %.'),
    ord(['rabatt'], 'Avslag i prisen, ofte oppgitt i prosent.'),
    ord(['kredittkjøp', 'kreditt'], 'Å kjøpe nå og betale senere. Det koster ofte ekstra i gebyrer og renter.'),
    ord(['effektiv rente'], 'Hele kostnaden ved et lån, regnet som rente per år, inkludert gebyrer.'),
    ord(['gebyr', 'gebyrer'], 'Et fast beløp du betaler for en tjeneste.'),
    ord(['inntekt'], 'Penger du får inn, som lønn.'),
    ord(['utgift', 'utgifter'], 'Penger du bruker.')
  ];
  const U1 = [];
  U1.push(S('Pris, rabatt og mva', '🏷️', [
    P('Når du kjøper noe, kan prisen endres av <strong>rabatt</strong> (billigere) og <strong>merverdiavgift (mva)</strong> (dyrere). I Norge er mva vanligvis <strong>25 %</strong>. Du bruker <strong>vekstfaktor</strong>: rabatt 20 % gir 0,80, og mva 25 % gir 1,25.'),
    E('En jakke koster 800 kr uten mva. Hva koster den med 25 % mva?', ['Vekstfaktor for 25 % mva: 1,25.', '800 · 1,25 = 1000.', 'Svar: 1000 kr.']),
    E('En sykkel koster 5000 kr. Den får 30 % rabatt. Hva er den nye prisen?', ['Vekstfaktor: 1 − 0,30 = 0,70.', '5000 · 0,70 = 3500.', 'Svar: 3500 kr.']),
    C('advarsel', 'Prisen uten mva', 'Hvis du vet prisen <em>med</em> mva og vil ha prisen <em>uten</em>, <strong>deler</strong> du på 1,25. Ikke trekk fra 25 %!'),
    O(1, [
      T('Pris uten mva er 400 kr. Hva er prisen med 25 % mva?', 500, '400 · 1,25.', '500 kr.', 'kr'),
      T('En vare koster 1000 kr med 20 % rabatt. Ny pris?', 800, '1000 · 0,8.', '800 kr.', 'kr'),
      T('En vare koster 625 kr med 25 % mva. Hva er prisen uten mva?', 500, '625 ÷ 1,25.', '500 kr.', 'kr'),
      T('En skjorte koster 400 kr. Først 25 % rabatt, deretter 10 % til. Hva er den endelige prisen? (400 · 0,75 · 0,9)', 270, '300 · 0,9.', '300 · 0,9 = 270 kr.', 'kr')
    ])
  ]));
  U1.push(S('Sammenlikne tilbud', '🛒', [
    P('Hvilket tilbud er best? <strong>Enhetspris</strong> (pris per kilo, liter eller stykk) hjelper deg å sammenlikne. Pass også på <strong>«3 for 2»</strong>-tilbud: det er en rabatt på en tredjedel (33 %).'),
    E('Pakke A: 3 stk for 60 kr. Pakke B: 5 stk for 90 kr. Hva er billigst per stk?', ['A: 60 ÷ 3 = 20 kr per stk.', 'B: 90 ÷ 5 = 18 kr per stk.', 'B er billigst per stk.']),
    O(2, [
      T('Pakke A: 3 stk for 60 kr. Pris per stk?', 20, '60 ÷ 3.', '20.', 'kr'),
      T('Pakke B: 5 stk for 90 kr. Pris per stk?', 18, '90 ÷ 5.', '18.', 'kr'),
      T('3 for 2-tilbud: en vare koster 60 kr. Du kjøper 3 og betaler for 2. Hva er prisen per vare?', 40, '120 ÷ 3.', '40 kr.', 'kr'),
      T('En flaske med 1,5 liter koster 30 kr. Hva er prisen per liter?', 20, '30 ÷ 1,5.', '20 kr.', 'kr'),
      V('3 for 2: Hvor mange prosent rabatt får du?', ['Omtrent 33 %', '50 %', '20 %', '66 %'], 0, '1 av 3 er gratis.', '1 gratis av 3 er en tredjedel, ca. 33 %.')
    ])
  ]));
  U1.push(S('Sparing og rente', '🐖', [
    P('Når du sparer penger i banken, får du <strong>rente</strong>. Hvis renten er 5 % i året, har du <strong>1,05 ganger</strong> så mye etter ett år. Renten legges til saldoen, så neste år får du rente på <strong>hele</strong> beløpet, også renten fra året før. Det kalles <strong>rentes rente</strong>.'),
    E('Du sparer 10 000 kr med 5 % rente i året. Hva har du etter 3 år?', ['Vekstfaktor 1,05.', 'Etter 1 år: 10 000 · 1,05 = 10 500. Etter 2 år: 10 500 · 1,05 = 11 025. Etter 3 år: 11 025 · 1,05 = 11 576,25.', 'Svar: 11 576,25 kr. (Samme som 10 000 · 1,05³.)']),
    W('graf', { params: { a: { min: 1000, max: 20000, v: 10000, steg: 1000, navn: 'startbeløp (kr)' }, b: { min: 1, max: 1.2, v: 1.05, steg: 0.01, navn: 'vekstfaktor (1,05 = 5 %)' } }, funksjoner: [{ f: 'a*b^x', pen: 'eks', navn: 'Saldo', farge: TEAL }], xmin: 0, xmax: 20, ymin: 0, ymax: 80000, tabell: true, tabellx: [0, 5, 10, 15, 20], tittel: 'Sparing over 20 år: dra i startbeløp og rente' }),
    W('kode', { tittel: 'Sparing med Python', kode: 'saldo = 1000\nfor ar in range(1, 4):\n    saldo = saldo * 1.1\n    print("Etter", ar, "år:", round(saldo, 2))', forvent: 'Etter 1 år: 1100.0\nEtter 2 år: 1210.0\nEtter 3 år: 1331.0', intro: 'Her har vi 1000 kr og 10 % rente (vekstfaktor 1,1). Endre tallene og kjør igjen.' }),
    C('mestring', 'Tiden jobber for deg', 'Jo lenger du sparer, jo mer jobber rentene for deg. 10 000 kr på 5 % blir 16 289 kr etter 10 år og 26 533 kr etter 20 år (uten at du legger til noe).'),
    O(3, [
      T('1000 kr med 10 % rente i 2 år. Hva har du?', 1210, '1000 · 1,1².', '1210 kr.', 'kr'),
      T('2000 kr med 5 % rente i 1 år. Hva har du?', 2100, '2000 · 1,05.', '2100 kr.', 'kr'),
      T('10 000 kr med 10 % rente i 2 år. Hva har du?', 12100, '10 000 · 1,21.', '12100 kr.', 'kr'),
      T('Hvor mye rente får du første året på 20 000 kr med 4 % rente?', 800, '20 000 · 0,04.', '800 kr.', 'kr'),
      V('Hva gir mest: 5 % rente i 1 år på 1000 kr, eller 5 % rente i 2 år?', ['2 år', '1 år', 'Like mye', 'Kan ikke vite'], 0, 'Jo lenger, jo mer.', '2 år: 1102,50. 1 år: 1050.')
    ])
  ]));
  U1.push(S('Sparing hver måned', '📅', [
    P('Å spare litt hver måned bygger opp en sum over tid. Uten rente er det enkelt: <strong>månedlig beløp · antall måneder</strong>. Med rente blir det litt mer, men det kan du regne ut i regneark.'),
    E('Du sparer 500 kr i måneden i 2 år. Hvor mye har du spart (uten rente)?', ['2 år = 24 måneder.', '24 · 500 = 12 000.', 'Svar: 12 000 kr (pluss litt rente).']),
    W('kode', { tittel: 'Månedlig sparing i Python', kode: 'mnd = 500\nspart = 0\nfor m in range(12):\n    spart = spart + mnd\nprint(spart)', forvent: '6000', intro: '12 måneder á 500 kr. Endre til 24 måneder.' }),
    O(3, [
      T('Du sparer 500 kr i måneden i 2 år. Hvor mye (uten rente)?', 12000, '24 · 500.', '12000 kr.', 'kr'),
      T('Du vil spare 6000 kr på 12 måneder. Hvor mye må du spare per måned?', 500, '6000 ÷ 12.', '500 kr.', 'kr'),
      T('Du vil spare 15 000 kr til en sykkel og sparer 750 kr i måneden. Hvor mange måneder tar det?', 20, '15 000 ÷ 750.', '20 måneder.'),
      T('Du sparer 300 kr i måneden. Hvor mye har du etter 3 år? (36 måneder)', 10800, '36 · 300.', '10800 kr.', 'kr')
    ])
  ]));
  U1.push(S('Lån og renter', '🏦', [
    P('Når du <strong>låner</strong> penger, betaler du tilbake mer enn du fikk. Differansen er <strong>renter</strong>. Hver termin betaler du et <strong>avdrag</strong> (en del av selve lånet) og <strong>renter</strong>.'),
    TAB(['Lånetype', 'Avdrag', 'Terminbeløp'], [['Serielån', 'Like store hver termin', 'Synker over tid'], ['Annuitetslån', 'Øker over tid', 'Like stort hver termin']]),
    E('Du låner 120 000 kr over 10 år som serielån med 5 % rente. Finn avdrag per år, og rentene første år.', ['Avdrag per år: 120 000 ÷ 10 = 12 000 kr.', 'Rente første år: 5 % av 120 000 = 6000 kr.', 'Første års betaling: 12 000 + 6000 = 18 000 kr. Siden lånet blir mindre, blir rentene mindre hvert år.']),
    W('kode', { tittel: 'Serielån i Python: renter de tre første årene', kode: 'lan = 120000\nrente = 0.05\nfor ar in range(1, 4):\n    renter = lan * rente\n    print("År", ar, "renter:", round(renter))\n    lan = lan - 12000', forvent: 'År 1 renter: 6000\nÅr 2 renter: 5400\nÅr 3 renter: 4800', intro: 'Hvert år betaler du ned 12 000. Se at rentene synker.' }),
    O(4, [
      T('Lån på 120 000 kr over 10 år som serielån. Avdrag per år?', 12000, '120 000 ÷ 10.', '12000 kr.', 'kr'),
      T('Rente 5 % av 120 000 kr. Hva er rentene første år?', 6000, '120 000 · 0,05.', '6000 kr.', 'kr'),
      T('Etter første avdrag er lånet 108 000. Rente 5 % neste år?', 5400, '108 000 · 0,05.', '5400 kr.', 'kr'),
      T('Du låner 50 000 kr med 6 % rente. Rente første år?', 3000, '50 000 · 0,06.', '3000 kr.', 'kr'),
      T('Du låner 20 000 kr og betaler tilbake 22 000 kr totalt. Hvor mye er det i renter og gebyrer?', 2000, '22 000 − 20 000.', '2000 kr.', 'kr')
    ])
  ]));
  U1.push(S('Hva koster et lån egentlig?', '🧾', [
    P('Total kostnad = <strong>det du betaler tilbake − det du lånte</strong>. Fordi renten regnes av et mindre og mindre lån, koster et <strong>serielån</strong> mindre totalt enn et annuitetslån med samme rente og tid. Men de første årene er terminbeløpet høyere.'),
    E('Serielån: 120 000 kr, 5 % rente, 10 år. Summen av rentene er 33 000 kr. Hvor mye betaler du totalt?', ['Lånet: 120 000 kr.', 'Renter: 33 000 kr.', 'Totalt: 120 000 + 33 000 = 153 000 kr.']),
    C('tips', 'Spør alltid om', ['Hva er renten, og er den fast eller flytende?', 'Hva er gebyrene?', 'Hva er <strong>effektiv rente</strong> (alt inkludert)?', 'Hva er totalkostnaden?']),
    O(4, [
      T('Lånet er 120 000 og renter totalt 33 000. Hva betaler du totalt?', 153000, '120 000 + 33 000.', '153000 kr.', 'kr'),
      T('Du betaler tilbake 11 500 kr på et lån på 10 000 kr. Hvor mange prosent mer enn du lånte? (1500 av 10 000)', 15, '1500 ÷ 10 000.', '15 %.', '%'),
      V('Hvilket lån er billigst totalt (samme beløp og rente)?', ['Det med kortest løpetid', 'Det med lengst løpetid', 'Like dyrt', 'Vet ikke'], 0, 'Jo lengre tid, jo mer rente.', 'Kort løpetid gir mindre renter totalt, men høyere terminbeløp.')
    ])
  ]));
  U1.push(S('Kredittkjøp og «kjøp nå, betal senere»', '💳', [
    P('Å kjøpe på <strong>kreditt</strong> betyr å få varen nå og betale senere. Det virker billig: «Bare 199 kr i måneden!» Men <strong>gebyrer og renter</strong> kan gjøre det mye dyrere enn kontantprisen.'),
    E('En mobil koster 6000 kr kontant. Du kan i stedet betale 250 kr i måneden i 30 måneder. Hva er forskjellen?', ['Totalt: 250 · 30 = 7500 kr.', 'Kontantpris: 6000 kr.', 'Forskjell: 7500 − 6000 = 1500 kr. Det er 25 % ekstra.']),
    C('advarsel', 'Pass på faktura og purregebyr', 'Hvis du ikke betaler faktura i tide, kommer <strong>purregebyr</strong> (ca. 35 kr) og <strong>inkasso</strong> (hundrevis av kroner). Små beløp kan bli mye større.'),
    O(5, [
      T('Mobil: 6000 kr kontant. 250 kr i måneden i 30 måneder. Hva betaler du totalt?', 7500, '250 · 30.', '7500 kr.', 'kr'),
      T('Hvor mye ekstra betaler du i forhold til kontantprisen?', 1500, '7500 − 6000.', '1500 kr.', 'kr'),
      T('Hvor mange prosent dyrere er det? (1500 av 6000)', 25, '1500 ÷ 6000.', '25 %.', '%'),
      T('En faktura på 1200 kr får 35 kr i purregebyr. Hva er den nye summen?', 1235, '1200 + 35.', '1235 kr.', 'kr'),
      F('Forklar hvorfor «bare 199 kr i måneden» kan være misvisende.', ['Det små beløpet skjuler hvor mange måneder du må betale.', '199 · 36 = 7164, mye mer enn varens kontantpris.', 'Regn alltid ut totalprisen og sammenlikn med kontantprisen.'])
    ])
  ]));
  U1.push(S('Nytt eller brukt? Verditap', '🚗', [
    P('Mange ting <strong>taper verdi</strong> over tid. Bil, mobil og elektronikk faller ofte 10–20 % per år. Det er <strong>eksponentielt forfall</strong>: verdien ganges med samme faktor hvert år (se vekstfaktor).'),
    E('En ny mobil koster 10 000 kr og taper 20 % verdi i året. Hva er den verdt etter 2 år?', ['Vekstfaktor: 0,80.', '10 000 · 0,8 · 0,8 = 10 000 · 0,64.', 'Svar: 6400 kr.']),
    O(4, [
      T('Ny mobil 10 000 kr, taper 20 % per år. Verdi etter 2 år?', 6400, '10 000 · 0,64.', '6400 kr.', 'kr'),
      T('Ny bil 200 000 kr, taper 10 % per år. Verdi etter 1 år?', 180000, '200 000 · 0,9.', '180000 kr.', 'kr'),
      T('Sykkel kjøpt for 5000 kr taper 30 % første år. Verdi etter første år?', 3500, '5000 · 0,7.', '3500 kr.', 'kr'),
      V('Hva er ofte lurest økonomisk: kjøpe ny bil eller en som er 3 år gammel?', ['En som er 3 år gammel', 'Ny bil', 'Like dyrt', 'Vet ikke'], 0, 'Størst verditap første år.', 'De første årene taper man mest, så brukt er ofte billigere totalt.')
    ])
  ]));
  U1.push(S('Undersøk og argumenter', '🔎', [
    O(5, [
      F('Per får tilbud om 50 000 kr lån med 8 % rente, og Mia får 50 000 kr med 4 %. Hva er forskjellen på rentene første år? Hva betyr det?', ['Per: 50 000 · 0,08 = 4000 kr. Mia: 50 000 · 0,04 = 2000 kr.', 'Forskjellen er 2000 kr første år.', 'Halv rente gir halve rentekostnader. Over mange år blir forskjellen stor.']),
      F('Forklar med egne ord hvorfor det lønner seg å begynne å spare tidlig.', ['Rentes rente: pengene vokser eksponentielt.', 'Jo lenger tid, jo flere ganger ganges beløpet med vekstfaktoren.', 'Eksempel: 10 000 kr på 5 % blir 16 289 kr etter 10 år og 26 533 kr etter 20 år.']),
      F('Du får velge: 1000 kr i dag, eller 1050 kr om ett år. Bank gir 3 % rente. Hva velger du, og hvorfor?', ['1000 kr i dag med 3 % gir 1030 kr om ett år.', '1050 kr er mer enn 1030 kr.', 'Du bør vente og ta 1050 kr, siden 1050 > 1030.'])
    ]),
    SJ('Dette kan du nå', ['Regne med rabatt og mva', 'Sammenlikne priser og tilbud', 'Regne rente og rentes rente', 'Regne ut lån og avdrag', 'Vurdere kredittkjøp kritisk', 'Forklare verditap'])
  ]));
  M.register('utforsk', '10/kjop-sparing-lan', {
    tittel: 'Kjøp, sparing og lån',
    ingress: 'Hva koster det egentlig? Du regner med rabatt og mva, spareplaner, lån og kredittkjøp, og vurderer hva som lønner seg.',
    mal: ['hente ut og tolke relevant informasjon og reflektere over mulige konsekvenser ved kjøp og salg, renter på sparing, lån og kredittkjøp'], ordliste: ORD1, seksjoner: U1
  });
  const T1 = [];
  T1.push(S('Steg 1: Rabatt', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Rabatt betyr at prisen blir lavere. <strong>20 % rabatt</strong> betyr at du betaler <strong>80 %</strong> = 0,80 av prisen.', true),
    E('En sko koster 500 kr. Den får 20 % rabatt. Ny pris?', ['Du betaler 80 %, altså 0,8.', '500 · 0,8 = 400.', 'Svar: 400 kr. 🎉']),
    OS([
      T('En vare koster 100 kr og får 10 % rabatt. Ny pris?', 90, '100 · 0,9.', '90 kr.', 'kr'),
      T('En vare koster 200 kr og får 50 % rabatt. Ny pris?', 100, '200 · 0,5.', '100 kr.', 'kr'),
      T('En vare koster 300 kr og får 20 % rabatt. Ny pris?', 240, '300 · 0,8.', '240 kr.', 'kr')
    ])
  ]));
  T1.push(S('Steg 2: Rente', '2', [
    G('Rente er penger du får når du sparer.'),
    P('Hvis renten er <strong>5 %</strong> i året, får du 5 kr for hver 100 kr du har spart.', true),
    E('Du sparer 1000 kr med 5 % rente. Hvor mye rente får du første året?', ['5 % av 1000 = 1000 · 0,05.', '1000 · 0,05 = 50.', 'Svar: 50 kr. 🎉']),
    OS([
      T('Du sparer 1000 kr med 10 % rente. Rente første år?', 100, '1000 · 0,1.', '100 kr.', 'kr'),
      T('Du sparer 2000 kr med 5 % rente. Rente første år?', 100, '2000 · 0,05.', '100 kr.', 'kr'),
      T('Du sparer 1000 kr og får 50 kr i rente. Hva har du etter ett år?', 1050, '1000 + 50.', '1050 kr.', 'kr')
    ])
  ]));
  T1.push(S('Steg 3: Spare hver måned', '3', [
    G('Å spare litt hver måned blir mye over tid.'),
    E('Du sparer 200 kr i måneden. Hvor mye har du etter 12 måneder?', ['12 måneder · 200 kr.', '12 · 200 = 2400.', 'Svar: 2400 kr. 🎉']),
    OS([
      T('Du sparer 100 kr i måneden. Etter 12 måneder?', 1200, '12 · 100.', '1200 kr.', 'kr'),
      T('Du sparer 500 kr i måneden. Etter 6 måneder?', 3000, '6 · 500.', '3000 kr.', 'kr'),
      T('Du vil ha 1000 kr på 10 måneder. Hvor mye må du spare per måned?', 100, '1000 ÷ 10.', '100 kr.', 'kr')
    ])
  ]));
  T1.push(S('Steg 4: Lån', '4', [
    G('Å låne koster penger. Det kalles renter.'),
    E('Du låner 1000 kr og betaler tilbake 1100 kr. Hva er prisen for å låne?', ['Du betaler 1100, men fikk 1000.', '1100 − 1000 = 100.', 'Svar: 100 kr i renter. 🎉']),
    OS([
      T('Du låner 2000 kr og betaler tilbake 2200 kr. Renter?', 200, '2200 − 2000.', '200 kr.', 'kr'),
      T('Du låner 500 kr og betaler tilbake 550 kr. Renter?', 50, '550 − 500.', '50 kr.', 'kr'),
      V('Hva er billigst? Betale tilbake 1100 kr eller 1200 kr for å låne 1000 kr?', ['1100 kr', '1200 kr'], 0, 'Minst renter.', '1100 gir 100 i renter, 1200 gir 200.', true)
    ]),
    SJ('Dette kan du nå', ['Regne rabatt', 'Regne rente', 'Regne månedlig sparing', 'Regne hva et lån koster'])
  ]));
  M.register('steg', '10/kjop-sparing-lan', {
    tittel: 'Kjøp, sparing og lån',
    ingress: 'Små steg: rabatt, rente, sparing og hva det koster å låne penger.',
    mal: ['regne med rabatt, rente og lån'], ordliste: ORD1, seksjoner: T1
  });
  M.ekstra['10/kjop-sparing-lan'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('rab', '🏷️', 'Rabatt', 8, 'Regn ut ny pris.', function (r) {
      const g = r.pick([100, 200, 300, 400, 500, 800, 1000]), p = r.pick(lett ? [10, 20, 50] : [10, 20, 25, 30, 40, 50]); const n = g * (100 - p) / 100; return H.e('Pris ' + g + ' kr med ' + p + ' % rabatt.', n, g + ' · ' + M.fmt((100 - p) / 100) + ' = ' + M.fmt(n) + ' kr');
    }));
    sek.push(H.ek('mva', '🧾', 'Mva 25 %', 6, 'Regn ut prisen med 25 % mva.', function (r) {
      const g = r.int(1, 20) * 40; return H.e('Pris uten mva: ' + g + ' kr.', g * 1.25, g + ' · 1,25 = ' + M.fmt(g * 1.25) + ' kr');
    }));
    sek.push(H.ek('rente', '🏦', 'Rente første år', 8, 'Regn ut renten første år.', function (r) {
      const s = r.pick([1000, 2000, 5000, 10000, 20000]), p = r.pick([2, 3, 4, 5, 6, 8]); return H.e(s + ' kr med ' + p + ' % rente.', s * p / 100, s + ' · ' + M.fmt(p / 100) + ' = ' + M.fmt(s * p / 100) + ' kr');
    }));
    sek.push(H.ek('rr', '📈', 'Rentes rente', 6, 'Regn ut saldoen etter 2 år.', function (r) {
      const s = r.pick([1000, 2000, 5000, 10000]), p = r.pick([10, 20, 50]); const v = 1 + p / 100; const res = Math.round(s * v * v * 1000) / 1000; return H.e(s + ' kr med ' + p + ' % rente per år i 2 år.', res, s + ' · ' + M.fmt(Math.round(v * v * 100) / 100) + ' = ' + M.fmt(res) + ' kr');
    }));
    sek.push(H.ek('ser', '📆', 'Serielån: avdrag per år', 6, 'Regn ut avdraget per år.', function (r) {
      const n = r.pick([5, 10, 20]), a = r.int(2, 12) * 10000; return H.e('Serielån på ' + M.fmt(a * n) + ' kr over ' + n + ' år.', a, M.fmt(a * n) + ' ÷ ' + n + ' = ' + M.fmt(a) + ' kr');
    }));
    sek.push(H.ek('kred', '💳', 'Kredittkjøp', 6, 'Hvor mye ekstra betaler du?', function (r) {
      const k = r.int(2, 12) * 500, m = r.pick([12, 24, 36]); const mp = Math.ceil(k * 1.2 / m / 10) * 10; return H.e('Kontantpris ' + k + ' kr. Kreditt: ' + mp + ' kr i ' + m + ' måneder.', mp * m - k, mp + ' · ' + m + ' = ' + M.fmt(mp * m) + ', og ' + M.fmt(mp * m) + ' − ' + k + ' = ' + M.fmt(mp * m - k) + ' kr');
    }));
    return H.ekDef('Kjøp, sparing og lån', sek);
  };

  /* ================= UTFORSKENDE ARBEID: DIN ØKONOMI ================= */
  const ORD2 = [
    ord(['problemstilling'], 'Spørsmålet du vil undersøke og finne svar på.'),
    ord(['utforskende arbeid'], 'Et prosjekt der du selv planlegger, samler data, regner, vurderer og presenterer.'),
    ord(['budsjett'], 'En plan for inntekter og utgifter.'),
    ord(['inntekt', 'inntekter'], 'Penger du får inn.'),
    ord(['utgift', 'utgifter'], 'Penger du bruker.'),
    ord(['antakelse', 'antakelser'], 'Noe du velger å regne med, selv om du ikke vet helt sikkert.'),
    ord(['presentasjon'], 'Når du viser og forklarer arbeidet ditt for andre.'),
    ord(['datakilde', 'kilde', 'kilder'], 'Hvor tallene dine kommer fra.'),
    ord(['konklusjon'], 'Svaret på problemstillingen, begrunnet med utregninger.'),
    ord(['vurdering'], 'Å tenke over hvor godt svaret ditt holder, og hva som kan være feil.')
  ];
  const U2 = [];
  U2.push(S('Hva er et utforskende arbeid?', '🧭', [
    P('Et <strong>utforskende arbeid</strong> er et prosjekt der <strong>du</strong> velger spørsmålet. Du planlegger hvordan du skal finne svar, samler tall, regner, vurderer om svaret er troverdig, og presenterer. Her handler det om <strong>din økonomi</strong>: hva koster det å leve, spare og låne?'),
    K([{ ikon: '❓', tittel: '1. Spørsmål', tekst: 'Velg en problemstilling du er nysgjerrig på.' }, { ikon: '🔍', tittel: '2. Samle tall', tekst: 'Finn priser og satser. Skriv ned kildene.' }, { ikon: '🧮', tittel: '3. Regn', tekst: 'Regn i regneark, Python eller på papir.' }, { ikon: '⚖️', tittel: '4. Vurder', tekst: 'Hvor sikkert er svaret? Hva har du antatt?' }, { ikon: '📣', tittel: '5. Presenter', tekst: 'Forklar og vis hva du kom fram til.' }]),
    C('tips', 'Ingenting lagres', 'Ingen av tallene du skriver inn her blir lagret eller sendt noe sted. Bruk gjerne tall som er helt oppdiktede, eller tall fra en person du kjenner.'),
    O(1, [
      V('Hva er første steg i et utforskende arbeid?', ['Velge en problemstilling', 'Skrive konklusjon', 'Lage grafer', 'Presentere'], 0, 'Du må vite hva du vil finne ut.', 'Først velger du problemstillingen.', true),
      V('Hvorfor skriver vi ned kildene?', ['Så andre kan sjekke tallene', 'Det er pent', 'Det er påbudt for alle', 'Det er unødvendig'], 0, 'Troverdighet.', 'Så leseren kan se hvor tallene kommer fra og sjekke dem.', true)
    ])
  ]));
  U2.push(S('Velg en problemstilling', '🎯', [
    P('En god problemstilling kan <strong>besvares med tall</strong>, og er <strong>ikke for stor</strong>. Her er forslag. Velg ett, eller finn på ditt eget.'),
    TAB(['Problemstilling', 'Du trenger'], [['Hva koster det å eie en mobil i 3 år, med ulike abonnement?', 'Abonnementspriser, kjøpspris, verditap'], ['Hvor lenge tar det å spare til sykkel, PC eller reise?', 'Pris, sparebeløp per måned, rente'], ['Hvordan ser et realistisk månedsbudsjett ut for en student?', 'Husleie, mat, transport, inntekt'], ['Hva koster det å ta opp et studielån, og hva betaler jeg tilbake?', 'Lånebeløp, rente, avdragstid'], ['Hvilket er billigst: kjøpe, leie eller leie ut bruktbil?', 'Pris, verditap, drivstoff, forsikring']]),
    C('mestring', 'Gode kjennetegn', ['Du kan finne tall (priser, renter).', 'Du kan regne (vekstfaktor, rente, sum).', 'Du kan vurdere (hva hvis prisene endres?).', 'Det er noe du faktisk lurer på.']),
    O(2, [
      V('Hvilken problemstilling er best egnet?', ['Hvor mye har jeg spart etter 2 år om jeg sparer 400 kr i måneden med 3 % rente?', 'Er penger viktig?', 'Hva er lykke?', 'Hvem er rikest i verden?'], 0, 'Kan du regne det ut?', 'Den første kan besvares med tall og regning.'),
      F('Skriv en egen problemstilling om din (eller en tenkt persons) økonomi. Forklar hvilke tall du trenger.', ['Eksempel: «Hvor lenge må jeg spare for å kjøpe en sykkel til 6000 kr hvis jeg sparer 300 kr per måned?»', 'Tall som trengs: pris (6000), sparebeløp (300), eventuell rente.', 'Svaret kan regnes ut og vurderes med ulike sparebeløp.'])
    ])
  ]));
  U2.push(S('Samle og regne: et eksempel', '🧮', [
    P('La oss gjennomføre et lite prosjekt sammen. <strong>Problemstilling:</strong> «Hva koster det å spare til en PC til 12 000 kr?»'),
    E('Antakelser: Jeg sparer 400 kr i måneden på en konto med 3 % rente i året. Hvor lang tid tar det uten å regne med rente?', ['Mål: 12 000 kr. Månedlig sparing: 400 kr.', '12 000 ÷ 400 = 30.', 'Svar: 30 måneder (2,5 år), uten rente.']),
    E('Hvor mye mer sparer du hvis du får 3 % rente på hele beløpet i ett år, f.eks. på 4800 kr (12 måneder · 400)?', ['Rente i ett år på 4800: 4800 · 0,03 = 144 kr.', 'Dette er en forenkling: de første månedene har du spart mindre enn 4800, så renten blir litt lavere.', 'Maks 144 kr mer det første året. Rentene betyr lite for små beløp over kort tid.']),
    O(3, [
      T('Mål 12 000 kr. Du sparer 400 kr i måneden. Hvor mange måneder?', 30, '12 000 ÷ 400.', '30.'),
      T('Du øker til 600 kr i måneden. Hvor mange måneder da?', 20, '12 000 ÷ 600.', '20.'),
      T('Du sparer 400 kr i måneden. Hvor mye har du spart etter 12 måneder (uten rente)?', 4800, '12 · 400.', '4800 kr.', 'kr'),
      T('Hvor mange måneder kortere tid bruker du med 600 kr enn med 400 kr?', 10, '30 − 20.', '30 − 20 = 10 måneder.', 'måneder')
    ])
  ]));
  U2.push(S('Eksempel: sammenlikne mobilabonnement', '📱', [
    P('Her er et ferdig eksempel du kan bruke som mal. <strong>Problemstilling:</strong> «Hvilket mobilabonnement er billigst over 24 måneder?»'),
    TAB(['', 'Abonnement A', 'Abonnement B', 'Abonnement C'], [['Månedspris', '199 kr', '299 kr', '399 kr'], ['Data', '5 GB', '20 GB', 'Ubegrenset'], ['Startgebyr', '0 kr', '0 kr', '0 kr']]),
    E('Regn ut totalpris for 24 måneder for hvert abonnement.', ['A: 199 · 24 = 4776 kr.', 'B: 299 · 24 = 7176 kr.', 'C: 399 · 24 = 9576 kr.']),
    E('Pris per GB for A og B (bruker du alle GB-ene?).', ['A: 199 ÷ 5 = 39,80 kr per GB.', 'B: 299 ÷ 20 = 14,95 kr per GB.', 'Hvis du bruker 15 GB i måneden, er A ikke nok, og B er lønnsomt per GB. Konklusjonen avhenger av hvor mye data du bruker.']),
    O(3, [
      T('Abonnement A: 199 kr i måneden. Totalpris 24 måneder?', 4776, '199 · 24.', '4776 kr.', 'kr'),
      T('Abonnement B: 299 kr i måneden. Totalpris 24 måneder?', 7176, '299 · 24.', '7176 kr.', 'kr'),
      T('Hvor mye dyrere er B enn A over 24 måneder?', 2400, '7176 − 4776.', '2400 kr.', 'kr'),
      F('Skriv en kort konklusjon og en vurdering som inkluderer hva du har antatt.', ['Konklusjon: A er billigst per måned, men har bare 5 GB.', 'Antakelse: Jeg bruker ikke mer enn 5 GB i måneden. Hvis jeg bruker mer, er B bedre.', 'Vurdering: Prisene kan endre seg, og jeg har ikke regnet med mva eller tilleggstjenester.'])
    ])
  ]));
  U2.push(S('Mal for rapporten', '📝', [
    P('Du kan strukturere arbeidet slik. Skriv med egne ord og vis utregningene.'),
    TAB(['Del', 'Hva skriver du?'], [['1. Problemstilling', 'Hva vil du finne ut?'], ['2. Plan og antakelser', 'Hva må du vite? Hva antar du?'], ['3. Data og kilder', 'Tall og hvor de kommer fra.'], ['4. Utregning', 'Vis regningen: tabell, formel, graf.'], ['5. Resultat', 'Svaret på problemstillingen, med enhet.'], ['6. Vurdering', 'Hva kan være feil? Hva hvis tallene endres?'], ['7. Konklusjon', 'Kort svar og eventuelt råd.']]),
    C('tips', 'Presentasjon', ['Start med problemstillingen.', 'Vis én tabell eller graf som forklarer hovedpoenget.', 'Si hva du har antatt og hvorfor.', 'Avslutt med konklusjonen og hva du kunne gjort annerledes.']),
    C('mestring', 'Dette gir høy kvalitet', ['Du viser utregninger og forklarer hva tallene betyr.', 'Du bruker flere løsningsmetoder (for eksempel regneark og håndregning).', 'Du vurderer om svaret er troverdig, og hva som kan endre det.', 'Du sammenlikner alternativer og begrunner valget ditt.'])
  ]));
  U2.push(S('Verktøy: regneark og Python', '🛠️', [
    P('Du kan regne i <strong>regneark</strong>, <strong>Python</strong> eller <strong>GeoGebra</strong>. Se også «Verktøy» øverst på siden for å lære dem fra bunnen. Her er to små maler du kan tilpasse.'),
    W('kode', { tittel: 'Mal: hvor lang tid tar det å spare?', kode: 'mal = 12000\nmnd = 400\nspart = 0\nmaaneder = 0\nwhile spart < mal:\n    spart = spart + mnd\n    maaneder = maaneder + 1\nprint("Det tar", maaneder, "måneder")', forvent: 'Det tar 30 måneder', intro: 'Endre mal og mnd, og kjør igjen. Hva skjer?' }),
    W('kode', { tittel: 'Mal: sparing med rente', kode: 'saldo = 0\nrente = 0.03\nfor ar in range(1, 6):\n    saldo = saldo + 4800\n    saldo = saldo * (1 + rente)\n    print("År", ar, ":", round(saldo))', forvent: 'År 1 : 4944\nÅr 2 : 10036\nÅr 3 : 15281\nÅr 4 : 20684\nÅr 5 : 26248', intro: 'Her legger du 4800 kr på kontoen hvert år (400 kr i måneden), og det forrentes med 3 % årlig. Prøv å endre rente.' }),
    O(4, [
      V('Hva gjør while spart < mal i koden?', ['Gjentar så lenge du ikke har spart nok', 'Stopper med en gang', 'Skriver ut målet', 'Gjør ingenting'], 0, 'while betyr «så lenge».', 'Koden gjentar til spart er minst like stor som mal.'),
      T('I Python-malen: mal = 12000 og mnd = 400. Hvor mange måneder?', 30, '12 000 ÷ 400.', '30.'),
      T('Endrer du mnd til 600. Hvor mange måneder da?', 20, '12 000 ÷ 600.', '20.')
    ])
  ]));
  U2.push(S('Dine egne prosjekter: ideer', '💡', [
    P('Her er flere ideer. Velg en som passer deg:'),
    K([{ ikon: '🏠', tittel: 'Første bolig', tekst: 'Hvor mye må du spare i egenkapital (15 % av 3 000 000 kr)? Hvor lang tid tar det?' }, { ikon: '🚗', tittel: 'Bil', tekst: 'Sammenlikn en ny og en brukt bil over 5 år: verditap, drivstoff, forsikring.' }, { ikon: '🎓', tittel: 'Studielån', tekst: 'Hva betaler du tilbake på et lån på 400 000 kr over 20 år?' }, { ikon: '⚡', tittel: 'Strøm', tekst: 'Hva sparer du på LED-pærer eller varmepumpe?' }, { ikon: '🌍', tittel: 'Reise', tekst: 'Hva koster en tur til utlandet totalt, og hvordan sparer du?' }, { ikon: '📈', tittel: 'Aksjesparing', tekst: 'Hva skjer om du sparer 500 kr i måneden i 20 år med 5 % avkastning?' }]),
    O(4, [
      T('Egenkapital: 15 % av 3 000 000 kr. Hvor mye?', 450000, '3 000 000 · 0,15.', '450000 kr.', 'kr'),
      T('Du sparer 5000 kr i måneden. Hvor mange måneder til 450 000 kr?', 90, '450 000 ÷ 5000.', '90 måneder.'),
      T('90 måneder er hvor mange år? (÷ 12)', 7.5, '90 ÷ 12.', '7,5 år.', 'år')
    ]),
    SJ('Dette kan du nå', ['Velge en god problemstilling', 'Planlegge, regne og presentere et utforskende arbeid', 'Bruke regneark eller Python i prosjektet', 'Vurdere om resultatet er troverdig', 'Presentere med enkel struktur'])
  ]));
  M.register('utforsk', '10/okonomi-prosjekt', {
    tittel: 'Utforskende arbeid: din økonomi',
    ingress: 'Du velger et eget spørsmål om penger og finner svaret med tall og regning. Her får du fremgangsmåte, eksempler og maler.',
    mal: ['planlegge, utføre og presentere et utforskende arbeid knyttet til personlig økonomi'], ordliste: ORD2, seksjoner: U2
  });
  const T2 = [];
  T2.push(S('Steg 1: Hva er et prosjekt?', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('Du skal finne svar på et spørsmål om penger. Du går gjennom fem steg: <strong>spørsmål, tall, regning, vurdering, fortelle</strong>.', true),
    K([{ ikon: '❓', tittel: 'Spørsmål', tekst: 'Hva vil jeg finne ut?' }, { ikon: '🔍', tittel: 'Tall', tekst: 'Hvilke tall trenger jeg?' }, { ikon: '🧮', tittel: 'Regning', tekst: 'Regn ut svaret.' }, { ikon: '⚖️', tittel: 'Vurdering', tekst: 'Er svaret rimelig?' }, { ikon: '📣', tittel: 'Fortelle', tekst: 'Vis hva jeg fant ut.' }]),
    OS([
      V('Hva gjør du først?', ['Velger et spørsmål', 'Skriver konklusjon', 'Lager en graf'], 0, 'Du må vite hva du vil finne ut.', 'Velger et spørsmål.', true)
    ])
  ]));
  T2.push(S('Steg 2: Eksempel på spørsmål', '2', [
    G('Her er et eksempel vi kan følge.'),
    P('<strong>Spørsmål:</strong> Hvor mange måneder tar det å spare 6000 kr til en sykkel, hvis jeg sparer 300 kr i måneden?', true),
    E('Regn ut svaret.', ['Mål: 6000 kr. Sparer 300 kr per måned.', '6000 ÷ 300 = 20.', 'Svar: 20 måneder. 🎉']),
    OS([
      T('Mål 3000 kr, sparer 300 kr per måned. Hvor mange måneder?', 10, '3000 ÷ 300.', '10.'),
      T('Mål 6000 kr, sparer 500 kr per måned. Hvor mange måneder?', 12, '6000 ÷ 500.', '12.'),
      T('Mål 6000 kr, sparer 200 kr per måned. Hvor mange måneder?', 30, '6000 ÷ 200.', '30.')
    ])
  ]));
  T2.push(S('Steg 3: Hva om?', '3', [
    G('Gode prosjekter spør «hva om?».'),
    P('Hva om du kan spare mer per måned? Hva om prisen går opp?', true),
    E('Sykkelen koster 6000 kr. Prisen går opp 10 %. Hva er ny pris?', ['10 % opp betyr ganger 1,1.', '6000 · 1,1 = 6600.', 'Svar: 6600 kr. 🎉']),
    OS([
      T('Sykkelen koster 6600 kr, og du sparer 300 kr per måned. Hvor mange måneder?', 22, '6600 ÷ 300.', '22.'),
      T('Prisen faller til 5000 kr. Sparer 250 kr per måned. Hvor mange måneder?', 20, '5000 ÷ 250.', '20.')
    ])
  ]));
  T2.push(S('Steg 4: Fortell hva du fant', '4', [
    G('Til slutt forteller du svaret ditt.'),
    C('regel', 'Slik gjør du', ['1. Skriv spørsmålet.', '2. Vis tallene og utregningen.', '3. Skriv svaret med enhet.', '4. Skriv hva du har antatt.']),
    E('Skriv en kort konklusjon for sykkelprosjektet.', ['Spørsmål: Hvor lang tid tar det å spare 6000 kr med 300 kr i måneden?', 'Utregning: 6000 ÷ 300 = 20 måneder.', 'Antakelse: Prisen endrer seg ikke. Jeg klarer å spare hver måned. 🎉']),
    OS([
      V('Hva skal du skrive med svaret?', ['Enhet, for eksempel måneder eller kr', 'Ingenting', 'Bare et tall'], 0, 'Tall uten enhet gir ikke mening.', 'Skriv alltid enhet.', true)
    ]),
    SJ('Dette kan du nå', ['Velge et spørsmål', 'Regne et enkelt prosjekt', 'Stille «hva om»', 'Fortelle hva du fant'])
  ]));
  M.register('steg', '10/okonomi-prosjekt', {
    tittel: 'Utforskende arbeid: din økonomi',
    ingress: 'Små steg: du lager et lite prosjekt om sparing, steg for steg, med et ferdig eksempel.',
    mal: ['gjennomføre et enkelt prosjekt om økonomi'], ordliste: ORD2, seksjoner: T2
  });
  M.ekstra['10/okonomi-prosjekt'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('mal', '🎯', 'Hvor lang tid tar det å spare?', 8, 'Hvor mange måneder tar det?', function (r) {
      const m = r.pick([100, 200, 250, 300, 400, 500]), n = r.int(5, 30); return H.e('Du vil spare ' + M.fmt(m * n) + ' kr og sparer ' + m + ' kr per måned.', n, M.fmt(m * n) + ' ÷ ' + m + ' = ' + n + ' måneder');
    }));
    sek.push(H.ek('bud', '📋', 'Budsjett', 8, 'Hvor mye har du igjen etter utgiftene?', function (r) {
      const inn = r.int(10, 20) * 1000, hus = r.int(4, 8) * 1000, mat = r.int(2, 4) * 1000, tr = r.int(5, 15) * 100; return H.e('Inntekt ' + M.fmt(inn) + ' kr. Husleie ' + M.fmt(hus) + ' kr, mat ' + M.fmt(mat) + ' kr, transport ' + M.fmt(tr) + ' kr.', inn - hus - mat - tr, M.fmt(inn) + ' − ' + M.fmt(hus) + ' − ' + M.fmt(mat) + ' − ' + M.fmt(tr) + ' = ' + M.fmt(inn - hus - mat - tr) + ' kr');
    }));
    sek.push(H.ek('abo', '📱', 'Totalpris for abonnement', 6, 'Hva koster det totalt?', function (r) {
      const p = r.int(10, 40) * 10 - 1, n = r.pick([12, 24, 36]); return H.e('Abonnement: ' + p + ' kr i måneden i ' + n + ' måneder.', p * n, p + ' · ' + n + ' = ' + M.fmt(p * n) + ' kr');
    }));
    sek.push(H.ek('ekv', '🏠', 'Egenkapital 15 %', 5, 'Hvor mye er egenkapitalen?', function (r) {
      const pr = r.int(10, 40) * 100000; return H.e('Boligpris ' + M.fmt(pr) + ' kr. Egenkapital 15 %.', pr * 0.15, M.fmt(pr) + ' · 0,15 = ' + M.fmt(pr * 0.15) + ' kr');
    }));
    return H.ekDef('Utforskende arbeid: din økonomi', sek);
  };
})();
