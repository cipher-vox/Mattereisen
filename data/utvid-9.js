/* Utvidelse 9. trinn: flere Rolig-oppgaver, flere Steg-oppgaver i de tynneste temaene og en Utforsk-del «Finn feilen og vurder». */
(function () {
  const H = window.MATTE.H, t = H.t, v = H.v, T = H.T, V = H.V, F = H.F, R = H.UTV.rolig, S = H.UTV.steg, VUR = H.UTV.vurder;

  /* ---------- Rolig + Finn feilen ---------- */
  R('9/sammensatte-maleenheter', [
    t('En sykkel kjører 30 km på 2 timer. Hva er farten i km/t?', 15, ['Fart = strekning ÷ tid.'], '30 ÷ 2 = 15 km/t.', 'km/t'),
    t('Du går 4 km/t i 3 timer. Hvor langt kommer du?', 12, ['Strekning = fart · tid.'], '4 · 3 = 12 km.', 'km'),
    t('Hvor mange sekunder er 3 minutter?', 180, ['1 minutt er 60 sekunder.'], '3 · 60 = 180 sekunder.', 'sek'),
    t('Fire like skjorter koster 600 kr. Hva koster én skjorte?', 150, ['Del prisen på antall skjorter.'], '600 ÷ 4 = 150 kr.', 'kr')
  ]);
  VUR('9/sammensatte-maleenheter', [
    V('Kari sier at 60 km/t betyr at du kjører 60 km hvert minutt. Hva er riktig?', ['60 km for hver time', '60 km for hvert sekund', '60 km til sammen, uansett tid', '60 minutter for hver km'], 0, '«Per» betyr «for hver».', '60 km/t betyr 60 km for hver time.'),
    T('En bil kjører 90 km på 1 time og 30 minutter. Hva er farten i km/t?', 60, 'Gjør 1 t 30 min om til timer først.', '1 t 30 min er 1,5 timer. 90 ÷ 1,5 = 60 km/t.', 'km/t'),
    F('Ola regner 90 km ÷ 1,30 timer og får 69 km/t. Hva har han gjort feil?', ['1 time og 30 minutter er 1,5 timer, ikke 1,30.', 'Minutter må deles på 60 når du gjør dem om til timer.', 'Riktig regning: 90 ÷ 1,5 = 60 km/t.'])
  ]);

  R('9/figurer', [
    t('En trekant har vinklene 60° og 80°. Hvor stor er den tredje (i grader)?', 40, ['Vinkelsummen er 180°.'], '180 − 60 − 80 = 40°.', '°'),
    t('En firkant har tre vinkler på 90°. Hvor stor er den fjerde (i grader)?', 90, ['Vinkelsummen i en firkant er 360°.'], '360 − 3 · 90 = 90°.', '°'),
    t('To trekanter er kongruente. En side i den ene er 7 cm. Hvor lang er den tilsvarende siden i den andre?', 7, ['Kongruente figurer er helt like.'], 'Den tilsvarende siden er også 7 cm.', 'cm'),
    v('Hvilken figur har vinkelsum 360°?', ['Firkant', 'Trekant', 'Linje', 'Vinkel'], 0, ['Del figuren i to trekanter.'], 'En firkant kan deles i to trekanter: 2 · 180° = 360°.')
  ]);
  VUR('9/figurer', [
    V('Ola sier at en trekant kan ha vinklene 70°, 60° og 60°. Stemmer det?', ['Nei, summen er 190°, ikke 180°', 'Ja', 'Bare hvis den er likebeint', 'Ja, alle vinklene er under 90°'], 0, 'Legg sammen vinklene.', '70 + 60 + 60 = 190, men vinkelsummen skal være 180°.'),
    T('En likebeint trekant har toppvinkel 100°. Hvor stor er hver grunnvinkel (i grader)?', 40, 'Resten av 180° deles på to.', '(180 − 100) ÷ 2 = 40°.', '°'),
    F('Forklar forskjellen på kongruente og formlike figurer.', ['Kongruente figurer er helt like: samme form og størrelse.', 'Formlike figurer har samme form, men kan ha ulik størrelse.', 'Kongruente figurer er alltid formlike, men formlike er ikke alltid kongruente.'])
  ]);

  R('9/pytagoras', [
    t('Katetene er 12 og 16. Hva er hypotenusen?', 20, ['Regn 12² + 16².'], '144 + 256 = 400, og √400 = 20.'),
    t('Hypotenusen er 10 og en katet er 6. Hva er den andre?', 8, ['Trekk fra: c² − a².'], '100 − 36 = 64, og √64 = 8.'),
    t('Hvor lang er diagonalen i et rektangel på 15 cm × 20 cm?', 25, ['Diagonalen er hypotenusen.'], '225 + 400 = 625, og √625 = 25 cm.', 'cm'),
    v('Hvilken side er hypotenusen i en rettvinklet trekant med sidene 5, 12 og 13?', ['13', '5', '12', 'Alle tre'], 0, ['Hypotenusen er den lengste siden.'], 'Den lengste siden er 13, så hypotenusen er 13.')
  ]);
  VUR('9/pytagoras', [
    V('Eli regnet 3 + 4 = 7 og sa at hypotenusen er 7. Hva er riktig?', ['5, fordi 3² + 4² = 25 og √25 = 5', 'Svaret 7 er riktig', '25', '12'], 0, 'Hva sier Pytagoras’ læresetning?', 'c² = 3² + 4² = 25, så c = 5. Du må opphøye i andre før du legger sammen.'),
    T('Trekanten har sidene 6, 8 og 11. Er den rettvinklet? Hva er 6² + 8²?', 100, 'Sammenlign med 11².', '36 + 64 = 100, men 11² = 121. De er ikke like, så trekanten er ikke rettvinklet.'),
    F('Når kan du bruke Pytagoras’ læresetning?', ['Bare i rettvinklede trekanter.', 'Du må kjenne to av sidene for å finne den tredje.', 'Hypotenusen er den lengste siden.'])
  ]);

  R('9/trekanter', [
    t('To sider i en trekant er 5 og 8, og den tredje er 6. Hva er omkretsen?', 19, ['Legg sammen alle tre sidene.'], '5 + 8 + 6 = 19.'),
    t('En likesidet trekant har omkrets 18 cm. Hvor lang er hver side?', 6, ['Alle sidene er like lange.'], '18 ÷ 3 = 6 cm.', 'cm'),
    t('Vinklene i en trekant er 90° og 30°. Hvor stor er den tredje (i grader)?', 60, ['Vinkelsummen er 180°.'], '180 − 90 − 30 = 60°.', '°'),
    v('Kan sidene 2, 3 og 10 danne en trekant?', ['Nei, 2 + 3 er mindre enn 10', 'Ja', 'Bare hvis den er rettvinklet', 'Ja, alle tall passer'], 0, ['De to korteste må til sammen være lengre enn den lengste.'], '2 + 3 = 5, og 5 er mindre enn 10. Da rekker ikke sidene sammen.')
  ]);
  VUR('9/trekanter', [
    V('Kari sier: «Trekanten med sidene 4, 4 og 4 er likebeint, men ikke likesidet.» Hva er feil?', ['Den er også likesidet, for alle sidene er like', 'Ingenting, det stemmer', 'Den er rettvinklet', 'Den har en vinkel på 100°'], 0, 'Hvor mange sider er like?', 'En likesidet trekant er også likebeint. Alle tre sidene er 4.'),
    T('To sider i en trekant er 9 og 4. Hva er den minste hele lengden den tredje siden kan ha?', 6, 'Den tredje siden må være lengre enn differansen mellom de to andre.', 'Den må være større enn 9 − 4 = 5. Minste hele tall er 6.'),
    F('Kan en trekant ha to stumpe vinkler? Forklar.', ['En stump vinkel er over 90°.', 'To stumpe vinkler gir mer enn 180°.', 'Vinkelsummen er 180°, så det er umulig.'])
  ]);

  R('9/formlikhet-praksis', [
    t('To formlike trekanter har skalafaktor 2. En side er 5 cm i den lille. Hvor lang er den tilsvarende siden i den store?', 10, ['Gang med skalafaktoren.'], '5 · 2 = 10 cm.', 'cm'),
    t('Et kart har målestokk 1 : 1000. En strekning er 4 cm på kartet. Hvor mange meter er det i virkeligheten?', 40, ['4 cm · 1000 = ? cm.', '100 cm er 1 m.'], '4 · 1000 = 4000 cm = 40 m.', 'm'),
    t('Et bilde er 10 cm × 15 cm. Det forstørres med skalafaktor 3. Hvor bredt blir det?', 30, ['Gang bredden med 3.'], '10 · 3 = 30 cm.', 'cm'),
    v('Hva betyr målestokk 1 : 100?', ['1 cm på tegningen er 100 cm i virkeligheten', '100 cm på tegningen er 1 cm i virkeligheten', 'Tegningen er 100 cm bred', 'Alt er 100 m langt'], 0, ['Første tall er tegningen, andre tall er virkeligheten.'], '1 cm på tegningen tilsvarer 100 cm i virkeligheten.')
  ]);
  VUR('9/formlikhet-praksis', [
    V('Et kvadrat har side 2 cm, og et annet har side 4 cm. Ola sier at arealet også er dobbelt så stort. Hva er riktig?', ['Arealet blir 4 ganger så stort', 'Arealet er dobbelt så stort', 'Arealet blir 8 ganger så stort', 'Arealet er likt'], 0, 'Regn ut begge arealene.', '2 · 2 = 4 og 4 · 4 = 16. 16 ÷ 4 = 4 ganger.'),
    T('En 2 m høy lyktestolpe har 3 m skygge. Et tre har 12 m skygge samtidig. Hvor høyt er treet?', 8, 'Hvor mange ganger lengre er treets skygge?', '12 ÷ 3 = 4 ganger lengre, så treet er 2 · 4 = 8 m høyt.', 'm'),
    F('Forklar hvorfor volumet blir 8 ganger så stort når alle kantene på en kube dobles.', ['Volum er lengde · bredde · høyde.', 'Hver av de tre målene blir 2 ganger så store.', '2 · 2 · 2 = 8.'])
  ]);

  R('9/overflate-volum', [
    t('En boks er 2 cm × 3 cm × 7 cm. Hva er volumet?', 42, ['Volum = lengde · bredde · høyde.'], '2 · 3 · 7 = 42 cm³.', 'cm³'),
    t('En kube har kantlengde 5 cm. Hva er volumet?', 125, ['5 · 5 · 5.'], '5 · 5 · 5 = 125 cm³.', 'cm³'),
    t('En sylinder har grunnflate 10 cm² og høyde 7 cm. Hva er volumet?', 70, ['Volum = grunnflate · høyde.'], '10 · 7 = 70 cm³.', 'cm³'),
    t('En kube har kantlengde 2 cm. Hva er hele overflaten?', 24, ['En kube har 6 like sideflater.', 'Hver sideflate er 2 · 2.'], '6 · 4 = 24 cm².', 'cm²')
  ]);
  VUR('9/overflate-volum', [
    V('Ola regner volumet av en boks på 2 × 3 × 4 cm som 2 + 3 + 4 = 9 cm³. Hva er riktig?', ['2 · 3 · 4 = 24 cm³', '9 cm³ er riktig', '12 cm³', '14 cm³'], 0, 'Volum er ikke en sum.', 'Volum = lengde · bredde · høyde = 2 · 3 · 4 = 24 cm³.'),
    T('Et akvarium er 50 cm langt, 30 cm bredt og 40 cm høyt. Hvor mange liter rommer det? (1 liter = 1000 cm³)', 60, 'Regn ut volumet i cm³ først, og del så på 1000.', '50 · 30 · 40 = 60 000 cm³. 60 000 ÷ 1000 = 60 liter.', 'liter'),
    F('Forklar hvorfor volum måles i kubikkenheter, men overflate i kvadratenheter.', ['Volum sier hvor mange små terninger som fyller figuren, i tre dimensjoner.', 'Overflate er et areal i to dimensjoner, målt i små kvadrater.', 'Derfor er cm³ for volum og cm² for overflate.'])
  ]);

  R('9/sentralmal-spredning', [
    t('Hva er gjennomsnittet av 4, 6 og 8?', 6, ['Legg sammen og del på 3.'], '4 + 6 + 8 = 18, og 18 ÷ 3 = 6.'),
    t('Hva er medianen av 3, 7 og 9?', 7, ['Medianen er det midterste tallet når de står i rekkefølge.'], 'Midterste tall er 7.'),
    t('Hva er variasjonsbredden til 2, 5, 9 og 12?', 10, ['Største minus minste.'], '12 − 2 = 10.'),
    v('Hvilket tall er typetallet i 2, 3, 3, 5, 7?', ['3', '2', '5', '7'], 0, ['Typetallet er det som forekommer flest ganger.'], '3 forekommer to ganger, de andre bare én. Typetallet er 3.')
  ]);
  VUR('9/sentralmal-spredning', [
    V('Fem elever fikk 4, 5, 5, 6 og 30 poeng. Hvilket mål gir det beste bildet av et «vanlig» resultat?', ['Medianen, som er 5', 'Gjennomsnittet', 'Største verdi', 'Variasjonsbredden'], 0, 'Hva gjør 30 med gjennomsnittet?', 'Gjennomsnittet blir 10, trukket opp av ett høyt tall. Medianen 5 er mer lik de fleste resultatene.'),
    T('Gjennomsnittet av fire tall er 10. Tre av dem er 8, 9 og 13. Hva er det fjerde tallet?', 10, 'Summen av alle fire er 4 · 10.', 'Sum = 40. 8 + 9 + 13 = 30. Det fjerde er 40 − 30 = 10.'),
    F('Hvorfor kan gjennomsnittet være misvisende når noen få verdier er ekstremt store?', ['De store verdiene trekker gjennomsnittet opp.', 'Da ligner ikke gjennomsnittet på de fleste verdiene.', 'Medianen blir ikke påvirket på samme måte.'])
  ]);

  R('9/statistikk-media', [
    t('Av 20 elever har 5 tatt bussen. Hvor mange prosent er det?', 25, ['Del 5 på 20.'], '5 ÷ 20 = 0,25 = 25 %.', '%'),
    t('Hvor mange prosent er 10 av 50?', 20, ['Del 10 på 50.'], '10 ÷ 50 = 0,2 = 20 %.', '%'),
    t('I en undersøkelse svarer 30 av 200 ja. Hvor mange prosent er det?', 15, ['Del 30 på 200.'], '30 ÷ 200 = 0,15 = 15 %.', '%'),
    v('Hva betyr «utvalget» i en undersøkelse?', ['De som faktisk er spurt', 'Alle i landet', 'Svaret på spørsmålet', 'Resultatet i prosent'], 0, ['Tenk på hvem som ble spurt.'], 'Utvalget er gruppen som er spurt. Resultatet gjelder bare for dem, med mindre utvalget er representativt.')
  ]);
  VUR('9/statistikk-media', [
    V('Overskrift: «Salget doblet seg!» Salget gikk fra 2 til 4 stk. Hva bør du spørre om?', ['Hvor stort var salget i utgangspunktet?', 'Hvem skrev overskriften?', 'Hvilken farge har avisen?', 'Ingenting, overskriften er nok'], 0, 'Er det mye å doble fra?', 'Fra 2 til 4 er det en dobling, men bare 2 flere. Prosent kan høres stort ut uten å være det.'),
    T('En søylegraf har akse som starter på 70. Søylene viser 80 og 90. Hvor mange prosent høyere ser den andre søylen ut til å være enn den første?', 100, 'Mål høyden fra aksen: 80 − 70 og 90 − 70.', 'Høydene ser ut som 10 og 20. 20 er 100 % mer enn 10. I virkeligheten er forskjellen bare 12,5 %.', '%'),
    F('Forklar hvorfor en spørreundersøkelse med bare 10 deltakere kan gi et dårlig bilde.', ['Med få deltakere kan tilfeldigheter slå sterkt ut.', 'De 10 representerer kanskje ikke alle.', 'Flere deltakere gir et mer pålitelig resultat.'])
  ]);

  R('9/sannsynlighet', [
    t('Hva er sannsynligheten, i prosent, for kron på en mynt?', 50, ['Det er to like sannsynlige utfall.'], '1 av 2 er kron, altså 50 %.', '%'),
    t('Du kaster en terning. Hvor mange av utfallene 1 til 6 er partall?', 3, ['Partall: 2, 4, 6.'], '2, 4 og 6 er partall. Det er 3 stykker.'),
    t('En pose har 1 rød og 4 blå kuler. Hva er sannsynligheten for rød, i prosent?', 20, ['1 av hvor mange?'], '1 av 5 er rød. 1 ÷ 5 = 0,2 = 20 %.', '%'),
    v('Hva er sannsynligheten for å få 7 på en vanlig terning?', ['0', '1/6', '1/2', '7/6'], 0, ['Hvilke tall står på en terning?'], 'En terning har bare 1 til 6. 7 er umulig, så sannsynligheten er 0.')
  ]);
  VUR('9/sannsynlighet', [
    V('Etter fem kron på rad sier Ola: «Nå må det bli mynt!» Stemmer det?', ['Nei, hvert kast er uavhengig. Sjansen er fortsatt 50 %', 'Ja, nå er det mynt sin tur', 'Ja, ellers er mynten jukset', 'Sjansen for mynt er 100 %'], 0, 'Husker mynten hva som skjedde i forrige kast?', 'Hvert kast er uavhengig av de forrige. Sjansen er 50 % hver gang.'),
    T('En pose har 5 røde og 5 blå kuler. Du trekker én, legger den tilbake og trekker en til. Hva er sannsynligheten for to røde, i prosent?', 25, 'Sannsynligheten for rød hver gang er 1/2.', '1/2 · 1/2 = 1/4 = 25 %.', '%'),
    F('Forklar forskjellen på å trekke med og uten tilbakelegging.', ['Med tilbakelegging legger du kulen tilbake før neste trekning, så sjansene er like hver gang.', 'Uten tilbakelegging er det færre kuler igjen, så sjansene endrer seg.'])
  ]);

  R('9/simulering', [
    t('Du kaster en terning 60 ganger. Omtrent hvor mange seksere forventer du?', 10, ['Sjansen for sekser er 1/6.'], '60 ÷ 6 = 10.'),
    t('Du kaster en mynt 100 ganger. Omtrent hvor mange kron forventer du?', 50, ['Sjansen for kron er 1/2.'], '100 ÷ 2 = 50.'),
    t('Du simulerer 20 myntkast og får 12 kron. Hva er den relative frekvensen i prosent?', 60, ['Del 12 på 20.'], '12 ÷ 20 = 0,6 = 60 %.', '%'),
    v('Hva gir <code>random.randint(1, 6)</code> i Python?', ['Et tilfeldig heltall fra 1 til 6', 'Tallet 16', 'Alle tallene fra 1 til 6', 'Summen 1 + 6'], 0, ['Tenk på en terning.'], 'randint(1, 6) trekker ett tilfeldig heltall fra 1 til 6, som et terningkast.')
  ]);
  VUR('9/simulering', [
    V('Etter 10 terningkast har Eli ingen seksere. Er terningen skjev?', ['Ikke nødvendigvis: slik tilfeldig variasjon er vanlig', 'Ja, helt sikkert', 'Ja, den er tung på 6', 'Nei, du må få minst én sekser på 10 kast'], 0, 'Forventet er omtrent 1 til 2 seksere.', 'Det er ganske vanlig å få ingen seksere på 10 kast. Du trenger mange flere kast for å konkludere.'),
    T('To terninger kastes 720 ganger. Sannsynligheten for to like er 1/6. Omtrent hvor mange par forventer du?', 120, 'Finn 1/6 av 720.', '720 ÷ 6 = 120.'),
    F('Hvorfor gir flere kast i en simulering oftest et bedre svar?', ['Tilfeldig variasjon jevner seg ut når du gjør mange forsøk.', 'Den relative frekvensen nærmer seg den teoretiske sannsynligheten.', 'Få forsøk kan lett gi tilfeldig skjeve resultater.'])
  ]);

  /* ---------- Steg: flere oppgaver i de tynneste temaene ---------- */
  S('9/trekanter', [
    T('Sidene i en trekant er 3 cm, 4 cm og 5 cm. Hva er omkretsen?', 12, 'Legg sammen alle sidene.', '3 + 4 + 5 = 12 cm.', 'cm'),
    T('To vinkler i en trekant er 50° og 70°. Hvor stor er den tredje?', 60, 'Vinkelsummen er 180°.', '180 − 50 − 70 = 60°.', '°'),
    T('I en likebeint trekant er toppvinkelen 80°. Hvor stor er hver grunnvinkel?', 50, 'Resten av 180° deles på to.', '(180 − 80) ÷ 2 = 50°.', '°'),
    V('Kan en trekant ha sidene 2, 3 og 6?', ['Nei, 2 + 3 er mindre enn 6', 'Ja', 'Bare hvis den er rettvinklet', 'Ja, hvis sidene er hele tall'], 0, 'Legg sammen de to korteste sidene.', '2 + 3 = 5 er mindre enn 6, så sidene rekker ikke sammen.')
  ]);
  S('9/formlikhet-praksis', [
    T('To formlike trekanter har skalafaktor 3. En side er 5 cm i den lille. Hvor lang er den i den store?', 15, 'Gang med skalafaktoren.', '5 · 3 = 15 cm.', 'cm'),
    T('Målestokken er 1 : 50. En vegg er 6 cm på tegningen. Hvor mange cm er den i virkeligheten?', 300, 'Gang med 50.', '6 · 50 = 300 cm.', 'cm'),
    T('Et bilde er 12 cm bredt og 8 cm høyt. Det forminskes til bredde 6 cm. Hvor høyt blir det?', 4, 'Bredden halveres. Hva skjer med høyden?', 'Skalafaktor 6 ÷ 12 = 1/2. Høyden blir 8 ÷ 2 = 4 cm.', 'cm'),
    T('Skalafaktoren er 2. Arealet av den lille figuren er 5 cm². Hvor stort er arealet av den store?', 20, 'Areal skaleres med skalafaktoren i andre potens.', '2² = 4, og 5 · 4 = 20 cm².', 'cm²')
  ]);
  S('9/sentralmal-spredning', [
    T('Hva er gjennomsnittet av 10, 20 og 30?', 20, 'Legg sammen og del på 3.', '(10 + 20 + 30) ÷ 3 = 20.'),
    T('Hva er medianen av 1, 5, 9, 11 og 20?', 9, 'Medianen er det midterste tallet.', 'Tallene står i rekkefølge, og det midterste er 9.'),
    T('Hva er medianen av 2, 4, 6 og 8?', 5, 'Når det er et partall antall tall, tar du gjennomsnittet av de to i midten.', '(4 + 6) ÷ 2 = 5.'),
    T('Hva er variasjonsbredden til 7, 3, 12 og 5?', 9, 'Største minus minste.', '12 − 3 = 9.')
  ]);
  S('9/statistikk-media', [
    T('Hvor mange prosent er 9 av 60?', 15, 'Del 9 på 60.', '9 ÷ 60 = 0,15 = 15 %.', '%'),
    T('En vare koster 200 kr og settes ned 10 %. Hva koster den nå?', 180, 'Finn 10 % av 200 først.', '10 % av 200 er 20. 200 − 20 = 180 kr.', 'kr'),
    T('Av 50 elever svarte 35 at de liker pizza. Hvor mange prosent er det?', 70, 'Del 35 på 50.', '35 ÷ 50 = 0,7 = 70 %.', '%'),
    V('En søylegraf har akse som starter på 50, ikke 0. Hva blir resultatet?', ['Forskjellene ser større ut enn de er', 'Forskjellene ser mindre ut enn de er', 'Ingenting endres', 'Grafen blir mer riktig'], 0, 'Hva skjer med søylenes høyde når aksen starter høyt?', 'Søylene blir kortere, men forskjellene mellom dem fyller mer av grafen. Det virker som om forskjellene er store.')
  ]);
  S('9/simulering', [
    T('<code>for i in range(10):</code> Hvor mange ganger gjentas koden under?', 10, 'Tallet i parentesen.', '10 ganger.'),
    T('Du kaster en terning 30 ganger. Omtrent hvor mange femmere forventer du?', 5, 'Sjansen for en bestemt side er 1/6.', '30 ÷ 6 = 5.'),
    T('<code>random.randint(1, 2)</code> brukes til å simulere en mynt. Hvor mange mulige verdier kan den gi?', 2, 'Hvilke tall er med fra 1 til 2?', 'Den kan gi 1 eller 2, altså 2 verdier.'),
    T('Du fikk 18 kron på 30 myntkast. Hva er den relative frekvensen i prosent?', 60, 'Del 18 på 30.', '18 ÷ 30 = 0,6 = 60 %.', '%')
  ]);
})();
