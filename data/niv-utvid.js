/* Utfordring: to ekstra oppgaver per tema (8.–10. trinn), lagt til etter at niv-8/9/10 er registrert. */
(function () {
  const M = window.MATTE, H = M.H, t = H.t, v = H.v;
  function U(key, liste, rolig) {
    const tema = M.topics[rolig ? 'rolig' : 'utfordring'][key];
    if (!tema) { return; }
    const blokk = tema.seksjoner[0].blokker.filter(b => b.t === 'oppgaver')[0];
    liste.forEach(o => blokk.oppgaver.push(o));
  }
  /* Delte hjelpere for utvid-8/9/10.js */
  H.UTV = {
    rolig: function (key, liste) { U(key, liste, true); },
    steg: function (key, liste) {
      const tema = M.topics.steg[key]; if (!tema) { return; }
      let blokk = null;
      tema.seksjoner.forEach(sek => sek.blokker.forEach(b => { if (b.t === 'oppgaver') { blokk = b; } }));
      if (blokk) { liste.forEach(o => blokk.oppgaver.push(o)); }
    },
    vurder: function (key, liste) {
      const tema = M.topics.utforsk[key]; if (!tema) { return; }
      tema.seksjoner.push(H.S('Finn feilen og vurder', '🕵️', [H.P('Her skal du ikke bare regne, men også tenke: Finn feilen, vurder om et svar er rimelig, og forklar med egne ord.'), H.O(3, liste)]));
    }
  };

  /* ---------- 8. trinn ---------- */
  U('8/negative-tall', [
    t('Klokken 08 er det −6 grader. Til klokken 14 stiger det 9 grader, og til midnatt faller det 12 grader. Hva er temperaturen ved midnatt?', -9, ['Regn ett steg om gangen.', 'Først −6 + 9, så trekker du fra 12.'], '−6 + 9 = 3. Så 3 − 12 = −9. Temperaturen er −9 grader.'),
    v('Hvilket uttrykk har størst verdi?', ['−3 − (−8)', '(−3) · (−8)', '−3 + (−8)', '(−3) − 8'], 1, ['Regn ut alle fire.'], '−3 − (−8) = 5. (−3) · (−8) = 24. −3 + (−8) = −11. (−3) − 8 = −11. Størst er 24.')
  ]);
  U('8/regneregler', [
    t('Regn ut: 2 · 3² − (10 − 4) ÷ 3', 16, ['Parentes og potens først.', 'Så gange og dele, til slutt minus.'], '3² = 9 og 10 − 4 = 6. 2 · 9 = 18 og 6 ÷ 3 = 2. 18 − 2 = 16.'),
    t('Sara regnet 8 − 2 · 3 = 18. Hva er det riktige svaret?', 2, ['Hvilken regneart skal du ta først?'], 'Gange regnes før minus: 2 · 3 = 6, og 8 − 6 = 2. Sara regnet fra venstre og fikk 18, men det er feil.')
  ]);
  U('8/potenser', [
    t('Hvor mange ganger større er 2⁸ enn 2⁵?', 8, ['Del: 2⁸ ÷ 2⁵.', 'Ved deling trekker du eksponentene fra hverandre.'], '2⁸ ÷ 2⁵ = 2³ = 8.'),
    t('Lyset går omtrent 3 · 10⁸ meter i sekundet. Hvor langt går det på 2 sekunder? Svar som a · 10⁸. Hva er a?', 6, ['Gang tallene foran 10-potensen: 2 · 3.'], '2 · 3 · 10⁸ = 6 · 10⁸ meter. a = 6.')
  ]);
  U('8/kvadratrot', [
    t('Et kvadratisk rom har areal 36 m². Du skal legge list langs alle veggene, bortsett fra en dør på 1 m. Hvor mange meter list trenger du?', 23, ['Finn siden først.', 'Omkrets minus døråpningen.'], 'Side = √36 = 6 m. Omkrets = 4 · 6 = 24 m. Trekker fra døra: 24 − 1 = 23 m.', 'm'),
    v('Er √(9 + 16) lik √9 + √16?', ['Nei: √25 = 5, men 3 + 4 = 7', 'Ja, begge er 7', 'Ja, begge er 5', 'Nei, √16 finnes ikke'], 0, ['Regn ut hver side for seg.'], 'Venstre side: √25 = 5. Høyre side: 3 + 4 = 7. De er ikke like.')
  ]);
  U('8/uttrykk', [
    t('Forenkle 3(x + 2) − 2(x − 1), og finn verdien når x = 4.', 12, ['Gang ut begge parentesene. Pass på minustegnet foran den andre.'], '3x + 6 − 2x + 2 = x + 8. Med x = 4 blir det 12.'),
    t('En taxi koster 55 kr + 18 kr per km, altså 55 + 18x. Hva koster en tur på 7 km?', 181, ['Sett inn x = 7.'], '55 + 18 · 7 = 55 + 126 = 181 kr.', 'kr')
  ]);
  U('8/ulikheter', [
    t('Løs 4x + 3 ≥ 19. Svar: x er minst hvilket tall?', 4, ['Trekk fra 3 på begge sider, og del så på 4.'], '4x ≥ 16, så x ≥ 4.'),
    v('Hvilket tall er IKKE en løsning av x − 3 > 4?', ['9', '8', '7', '10'], 2, ['Løs ulikheten først: x er større enn hva?'], 'x − 3 > 4 gir x > 7. Tallet 7 er ikke større enn 7, så 7 er ikke en løsning.')
  ]);
  U('8/funksjoner', [
    t('f(x) = 2x − 5. For hvilken x er f(x) = 11?', 8, ['Lag likningen 2x − 5 = 11.'], '2x = 16, så x = 8. Sjekk: 2 · 8 − 5 = 11.'),
    t('En rørlegger tar f(x) = 50 + 12x kroner for x timer. Hva er f(0)?', 50, ['Sett inn x = 0. Hva betyr det i virkeligheten?'], 'f(0) = 50. Selv om han jobber 0 timer, må du betale det faste beløpet på 50 kr.', 'kr')
  ]);
  U('8/monstre', [
    t('Rekka er 5, 9, 13, 17, … Hva er tall nummer 10?', 41, ['Hva øker rekka med for hvert tall?', 'Tall nummer 10 er 9 steg etter det første.'], 'Rekka øker med 4. 5 + 9 · 4 = 5 + 36 = 41.'),
    v('Regelen 2n + 3 gir tall nummer n i en rekke. Er 50 med i rekka?', ['Nei, 2n + 3 er alltid et oddetall', 'Ja, når n = 25', 'Ja, når n = 23,5', 'Nei, 50 er for stort'], 0, ['Prøv å løse 2n + 3 = 50.'], '2n = 47 gir n = 23,5, og n må være et helt tall. 2n er partall, og pluss 3 gir oddetall. 50 er partall, så det er ikke med.')
  ]);
  U('8/faktorisering', [
    t('Primtallsfaktoriser 90. Hvor mange primfaktorer er det totalt, hvis du teller like faktorer flere ganger?', 4, ['Del på 2, så 3, så 3 igjen.'], '90 = 2 · 3 · 3 · 5. Det er 4 primfaktorer.'),
    t('Finn SFF til 48 og 72.', 24, ['48 = 2 · 2 · 2 · 2 · 3.', '72 = 2 · 2 · 2 · 3 · 3.'], 'Felles er 2 · 2 · 2 · 3 = 24.')
  ]);
  U('8/representasjoner', [
    t('Tabell (rett linje): x = 1 gir y = 7, x = 2 gir y = 10, x = 3 gir y = 13. Hva er y når x = 0?', 4, ['Hvor mye øker y per steg?', 'Gå ett steg tilbake fra x = 1.'], 'y øker med 3. Ett steg tilbake fra 7 er 7 − 3 = 4.'),
    t('Hvor skjærer grafen til y = 2x − 6 x-aksen? Oppgi x-verdien.', 3, ['På x-aksen er y = 0.'], '2x − 6 = 0 gir 2x = 6, så x = 3.')
  ]);
  U('8/programmering', [
    t('<code>x = 10</code><br><code>for i in range(3):</code><br><code>&nbsp;&nbsp;x = x - 2</code><br><code>print(x)</code><br>Hva skrives ut?', 4, ['Løkka går 3 ganger.', 'Hver gang trekkes 2 fra x.'], 'x går 10 → 8 → 6 → 4. Det skrives ut 4.'),
    t('Du vil skrive ut 5-gangen fra 5 · 1 til 5 · 10 med <code>for i in range(1, □):</code>. Hvilket tall skal stå i □?', 11, ['range stopper før det siste tallet.'], 'i skal gå fra 1 til og med 10. range(1, 11) gir 1, 2, …, 10.')
  ]);

  /* ---------- 9. trinn ---------- */
  U('9/sammensatte-maleenheter', [
    t('Et basseng fylles med 30 liter i minuttet. Hvor mange timer tar det å fylle 5400 liter?', 3, ['Finn minutter først.', 'Gjør så om til timer.'], '5400 ÷ 30 = 180 minutter. 180 ÷ 60 = 3 timer.', 'timer'),
    t('Bensin koster 22 kr per liter. Bilen bruker 0,7 liter per mil. Hva koster 50 mil?', 770, ['Finn først hvor mange liter du trenger.'], '50 · 0,7 = 35 liter. 35 · 22 = 770 kr.', 'kr')
  ]);
  U('9/figurer', [
    t('I en trekant er vinkel A dobbelt så stor som vinkel B, og vinkel C er 20° større enn B. Hvor stor er A (i grader)?', 80, ['Kall B for x. Da er A = 2x og C = x + 20.', 'Summen er 180.'], 'x + 2x + x + 20 = 180, så 4x = 160 og x = 40. A = 2 · 40 = 80°.', '°'),
    v('Alle kvadrater er formlike. Gjelder det samme alle rektangler?', ['Nei, sidene kan ha ulikt forhold', 'Ja, alle har fire rette vinkler', 'Ja, alle er firkanter', 'Nei, rektangler kan aldri være formlike'], 0, ['Formlike figurer har samme sideforhold. Sammenlign 2 × 4 og 2 × 6.'], 'Et rektangel på 2 × 4 og et på 2 × 6 har ulikt sideforhold, så de er ikke formlike. Kvadrater har alltid forholdet 1 : 1.')
  ]);
  U('9/pytagoras', [
    t('En 4 m lang stige skal nå 3,2 m opp på en vegg. Hvor langt fra veggen må foten stå?', 2.4, ['Stigen er hypotenusen.', 'Regn c² − a².'], '4² − 3,2² = 16 − 10,24 = 5,76, og √5,76 = 2,4 m.', 'm'),
    t('Trekanten har sidene 8, 15 og 17. Er den rettvinklet? Hva er 8² + 15²?', 289, ['Regn hvert kvadrat for seg, og sammenlign med 17².'], '64 + 225 = 289 = 17². Ja, den er rettvinklet.')
  ]);
  U('9/trekanter', [
    t('To sider i en trekant er 4 cm og 6 cm. Hva er den største hele lengden (i cm) den tredje siden kan ha?', 9, ['Den må være mindre enn summen av de to andre.'], 'Tredje side må være mindre enn 4 + 6 = 10. Største hele tall er 9.', 'cm'),
    v('Kan en trekant ha to rette vinkler?', ['Nei, da ville vinkelsummen bli over 180°', 'Ja, hvis den er likebeint', 'Ja, hvis den er stor nok', 'Bare i et koordinatsystem'], 0, ['Hva er 90° + 90°?'], 'To rette vinkler gir allerede 180°. Da er det ingenting igjen til den tredje vinkelen.')
  ]);
  U('9/formlikhet-praksis', [
    t('Et bilde er 20 cm bredt og 30 cm høyt. Det forstørres slik at bredden blir 50 cm. Hvor høyt blir bildet (i cm)?', 75, ['Finn skalafaktoren: 50 ÷ 20.'], 'Skalafaktor = 50 ÷ 20 = 2,5. Høyden blir 30 · 2,5 = 75 cm.', 'cm'),
    t('En modellbil i målestokk 1 : 18 er 25 cm lang. Hvor lang er den ekte bilen i meter?', 4.5, ['Gang med 18, og gjør så om til meter.'], '25 · 18 = 450 cm = 4,5 m.', 'm')
  ]);
  U('9/overflate-volum', [
    t('Et telt har form som en pyramide med kvadratisk grunnflate 3 m × 3 m og høyde 2 m. Hva er volumet?', 6, ['V = 1/3 · grunnflate · høyde.'], '1/3 · 9 · 2 = 6 m³.', 'm³'),
    t('En sylinderformet boks har radius 5 cm og høyde 12 cm. Hva er hele overflaten (med lokk og bunn), avrundet til nærmeste hele cm²?', 534, ['Overflate = 2 · π · r² + 2 · π · r · h.'], '2 · π · 25 + 2 · π · 5 · 12 = 50π + 120π = 170π ≈ 534,07, som blir 534 cm².', 'cm²')
  ]);
  U('9/sentralmal-spredning', [
    t('Elleve elever har gjennomsnitt 40 poeng. En ny elev på 52 poeng kommer til. Hva er det nye gjennomsnittet?', 41, ['Finn summen av de elleve først.'], 'Sum = 11 · 40 = 440. Ny sum = 440 + 52 = 492. 492 ÷ 12 = 41.'),
    v('Månedslønner (i tusen kr): 30, 32, 34, 35, 36, 250. Hvilket mål beskriver en «vanlig» lønn best?', ['Medianen', 'Gjennomsnittet', 'Variasjonsbredden', 'Største verdi'], 0, ['Hva gjør den ene lønnen på 250 med gjennomsnittet?'], 'Medianen er 34,5, nær de fleste lønningene. Gjennomsnittet blir dratt opp til rundt 69 av den ene store verdien.')
  ]);
  U('9/statistikk-media', [
    t('En søylegraf har akse som starter på 90. Søyle 1 viser 95 og søyle 2 viser 100. Hvor mange ganger så høy ser søyle 2 ut til å være som søyle 1?', 2, ['Målt fra aksen: hvor høye er søylene?'], 'Søylene ser ut til å være 5 og 10 høye. 10 ÷ 5 = 2. Men i virkeligheten er forskjellen bare 5 %. Aksen lurer deg.'),
    v('Både iskremsalget og antall badende øker i juli. Hva er mest riktig å si?', ['Begge henger sammen med varmt vær: sammenheng er ikke det samme som årsak', 'Iskrem gjør at flere bader', 'Badingen gjør at det blir varmere', 'Det er helt tilfeldig'], 0, ['Er det noe tredje som påvirker begge?'], 'Varmt vær får folk til å kjøpe is og bade. At to ting henger sammen, betyr ikke at den ene forårsaker den andre.')
  ]);
  U('9/sannsynlighet', [
    t('En pose har 3 røde og 2 grønne kuler. Du trekker én. Hva er sannsynligheten for grønn, i prosent?', 40, ['Gunstige utfall delt på alle mulige.'], '2 av 5 er grønne. 2 ÷ 5 = 0,4 = 40 %.', '%'),
    t('Du kaster en terning to ganger. Hva er sannsynligheten for to seksere, i prosent avrundet til hel?', 3, ['1/6 · 1/6.'], '1/6 · 1/6 = 1/36 ≈ 0,028, som er omtrent 3 %.', '%')
  ]);
  U('9/simulering', [
    t('Du kaster to mynter 500 ganger. Omtrent hvor mange ganger forventer du kron på begge?', 125, ['Sannsynligheten er 1/2 · 1/2.'], '1/2 · 1/2 = 1/4. 500 ÷ 4 = 125.'),
    v('Simuleringen din gir én sekser på 12 kast. Hva er best å gjøre?', ['Kaste mange flere ganger', 'Konkludere at terningen er skjev', 'Slette resultatet', 'Kaste terningen hardere'], 0, ['Forventet er 2 seksere på 12 kast.'], 'Forventet er 2, så 1 er helt normalt. Få forsøk gir stor tilfeldig variasjon. Flere kast gir et mer pålitelig bilde.')
  ]);

  /* ---------- 10. trinn ---------- */
  U('10/algebra', [
    t('Løs: 3(x − 2) + x = 14', 5, ['Gang ut parentesen først.', 'Samle x-ene.'], '3x − 6 + x = 14, så 4x = 20 og x = 5. Sjekk: 3 · 3 + 5 = 14.'),
    t('Trekk ut størst mulig felles faktor i 6x + 9. Hvilket tall står utenfor parentesen?', 3, ['Hvilket tall går opp i både 6 og 9?'], '6x + 9 = 3(2x + 3). Tallet utenfor parentesen er 3.')
  ]);
  U('10/kvadratsetninger', [
    t('Regn ut 99² uten kalkulator ved å skrive (100 − 1)².', 9801, ['10000 − 2 · 100 · 1 + 1.'], '10000 − 200 + 1 = 9801.'),
    v('Hva er (x − 4)² skrevet uten parentes?', ['x² − 8x + 16', 'x² − 16', 'x² + 16', 'x² − 8x − 16'], 0, ['(a − b)² = a² − 2ab + b².'], '(x − 4)² = x² − 2 · x · 4 + 4² = x² − 8x + 16.')
  ]);
  U('10/ligningssett', [
    t('To tall har sum 20, og det ene er tre ganger så stort som det andre. Hva er det største?', 15, ['x + y = 20 og y = 3x.'], 'x + 3x = 20, så x = 5 og y = 15. Det største er 15.'),
    t('2 kopper og 1 tallerken koster 130 kr. 1 kopp og 1 tallerken koster 90 kr. Hva koster én kopp?', 40, ['Trekk den ene likningen fra den andre.'], '(2k + t) − (k + t) = 130 − 90, så k = 40 kr.', 'kr')
  ]);
  U('10/stigningstall', [
    t('En linje går gjennom (0, 5) og (4, 1). Hva er stigningstallet?', -4 / 4, ['Endring i y delt på endring i x.', 'y går ned.'], 'Endring i y er 1 − 5 = −4, og endring i x er 4. Stigningstallet er −4 ÷ 4 = −1.'),
    t('For y = −2x + 8: for hvilken x er y = 0?', 4, ['Sett −2x + 8 = 0.'], '−2x = −8, så x = 4.')
  ]);
  U('10/funksjonstyper', [
    t('f(x) = 5 · 3ˣ. Hva er f(3)?', 135, ['3³ = 27.'], '5 · 27 = 135.'),
    v('Verdien til en bil synker 15 % per år. Hvilken funksjonstype passer best?', ['Eksponentiell', 'Lineær', 'Kvadratisk', 'Brøk'], 0, ['Ganges verdien med samme tall hvert år, eller trekkes det fra det samme beløpet?'], 'Hvert år ganges verdien med 0,85. Samme faktor hver gang gir eksponentiell vekst (her: nedgang).')
  ]);
  U('10/vekstfaktor', [
    t('En vare koster 500 kr. Prisen går ned 30 %. Hva er den nye prisen?', 350, ['Vekstfaktoren er 1 − 0,30.'], 'Vekstfaktor 0,70. 500 · 0,70 = 350 kr.', 'kr'),
    t('En kommune har 50 000 innbyggere og vokser 2 % per år. Hvor mange er det etter 2 år?', 52020, ['Vekstfaktor 1,02, to ganger.'], '50000 · 1,02² = 50000 · 1,0404 = 52020.')
  ]);
  U('10/kjop-sparing-lan', [
    t('Et lån på 60000 kr nedbetales med like store avdrag over 5 år. Hvor stort er avdraget per år?', 12000, ['Del lånet på antall år.'], '60000 ÷ 5 = 12000 kr.', 'kr'),
    t('Du setter inn 2000 kr med 4 % rente i 3 år. Hva er saldoen etter 3 år, avrundet til hel krone?', 2250, ['2000 · 1,04³.'], '1,04³ = 1,124864. 2000 · 1,124864 = 2249,73, som blir 2250 kr.', 'kr')
  ]);
  U('10/okonomi-prosjekt', [
    t('En bruktbil koster 80000 kr og mister 10 % av verdien hvert år. Hva er den verdt etter 2 år?', 64800, ['Vekstfaktor 0,9.'], '80000 · 0,9 · 0,9 = 80000 · 0,81 = 64800 kr.', 'kr'),
    v('Hva er viktigst å sjekke før du tar opp et forbrukslån?', ['Effektiv rente og totalkostnad', 'Fargen på nettsiden', 'Hvor mange andre som har lånt', 'Navnet på banken'], 0, ['Hva ender du faktisk opp med å betale?'], 'Effektiv rente og totalkostnad viser hva lånet virkelig koster, med gebyrer og renter.')
  ]);
  U('10/modellering', [
    t('Modell for vannstand: y = 0,5x + 2 (meter etter x timer). Når er y = 6?', 8, ['Løs 0,5x + 2 = 6.'], '0,5x = 4, så x = 8 timer.', 'timer'),
    t('En eksponentiell modell er y = 400 · 1,1ˣ. Hva er y når x = 2?', 484, ['1,1² = 1,21.'], '400 · 1,21 = 484.')
  ]);
  U('10/python', [
    t('<code>x = 2<br>while x &lt; 50:<br>&nbsp;&nbsp;x = x * 3<br>print(x)</code> Hva skrives ut?', 54, ['Følg x: 2, 6, 18, …', 'Løkka stopper når x ikke lenger er under 50.'], 'x blir 6, 18 og 54. Da er 54 ≥ 50, og løkka stopper. Det skrives ut 54.'),
    t('<code>def f(x):<br>&nbsp;&nbsp;return x * x + 1<br>print(f(f(2)))</code> Hva skrives ut?', 26, ['Regn ut f(2) først.', 'Bruk svaret som ny x.'], 'f(2) = 2 · 2 + 1 = 5. f(5) = 5 · 5 + 1 = 26.')
  ]);
})();
