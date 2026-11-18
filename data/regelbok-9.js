/* Regelbok 9. trinn (se regelbok-8.js for format). */
(function () {
  const M = window.MATTE; M.regelbok = M.regelbok || {};
  const R = (key, o) => { M.regelbok[key] = o; };

  R('9/sammensatte-maleenheter', {
    kort: 'Sammensatte enheter sier «hvor mye per» noe annet, som km per time eller kr per kg.',
    regler: [
      ['➗', '«Per» betyr delt på', 'Fart = strekning ÷ tid. 150 km på 3 timer: 150 ÷ 3 = 50 km/t.'],
      ['🔺', 'Fart, strekning og tid', 'Strekning = fart · tid. Tid = strekning ÷ fart. Fart = strekning ÷ tid.'],
      ['💰', 'Enhetspris', 'Pris per kg = pris ÷ antall kg. 3 kg koster 45 kr: 45 ÷ 3 = 15 kr/kg.'],
      ['⚖️', 'Tetthet', 'Tetthet = masse ÷ volum. 120 g på 40 cm³ gir 120 ÷ 40 = 3 g/cm³.'],
      ['🔄', 'Bytte enhet', 'Del eller gang med 60 mellom timer og minutter. 90 min = 1,5 t. Fra km/t til m/s: del på 3,6. 36 km/t = 10 m/s.']
    ],
    eks: [
      ['Du sykler 24 km på 90 minutter. Hva er farten i km/t?', ['90 minutter = 1,5 timer.', 'Fart = 24 ÷ 1,5.', '24 ÷ 1,5 = 16 km/t.'], '16 km/t'],
      ['500 g koster 35 kr, og 750 g koster 48 kr. Hva er billigst per kg?', ['Pris per kg: 35 ÷ 0,5 = 70 kr/kg.', '48 ÷ 0,75 = 64 kr/kg.', '750 g er billigst per kg.'], '750 g-pakken']
    ],
    pass: ['Gjør om til samme enhet før du regner. 90 minutter er 1,5 timer, ikke 1,30.', 'Del riktig vei: km per time er km ÷ timer.', 'Sjekk at svaret er rimelig. Er 200 km/t på sykkel realistisk?'],
    trick: 'Skriv enhetene i utregningen. km ÷ t gir km/t.',
    ord: [['Fart', 'Hvor langt du kommer per tidsenhet.'], ['Tetthet', 'Hvor mye masse det er i en volumenhet.'], ['Enhetspris', 'Prisen for én enhet, som 1 kg eller 1 liter.']],
    test: [['120 km på 2 timer. Hva er farten?', '60 km/t'], ['Hva er 72 km/t i m/s?', '20 m/s']]
  });

  R('9/figurer', {
    kort: 'Figurer har egenskaper vi kan bruke til å finne vinkler og sider. Kongruente figurer er helt like, og formlike figurer har samme form.',
    regler: [
      ['📐', 'Vinkelsum', 'Trekant: 180°. Firkant: 360°.'],
      ['🔷', 'Firkanter', 'Kvadrat og rektangel har fire rette vinkler. Rombe har fire like sider. Parallellogram har to par parallelle sider.'],
      ['🟰', 'Kongruente figurer', 'Like i form og størrelse. Alle sider og vinkler er like store.'],
      ['🔍', 'Formlike figurer', 'Alle vinkler er like, og sidene henger sammen med samme skalafaktor.'],
      ['🔺', 'Spesielle trekanter', 'Likebeint: to like sider og to like vinkler. Likesidet: tre like sider og alle vinkler er 60°.']
    ],
    eks: [
      ['En trekant har vinklene 50° og 70°. Hva er den tredje?', ['Vinkelsummen i en trekant er 180°.', '50 + 70 = 120.', '180 − 120 = 60°.'], '60°'],
      ['En trekant har sidene 3, 4 og 5 cm. En formlik trekant har lengste side 15 cm. Finn de andre sidene.', ['Skalafaktor: 15 ÷ 5 = 3.', '3 · 3 = 9 og 4 · 3 = 12.', 'Sidene er 9, 12 og 15 cm.'], '9 cm og 12 cm']
    ],
    pass: ['Kongruent og formlik er ikke det samme. Kongruente figurer er også formlike, men ikke omvendt.', 'I formlike figurer er vinklene like store, selv om figurene har ulik størrelse.', 'Sjekk at vinklene i en trekant gir sum 180°.'],
    trick: 'Skriv opp hvilke sider som svarer til hverandre, før du regner skalafaktor.',
    ord: [['Kongruent', 'Helt lik i form og størrelse.'], ['Formlik', 'Samme form, men kan ha ulik størrelse.'], ['Skalafaktor', 'Tallet du ganger alle lengder med.']],
    test: [['Vinkelsum i en firkant?', '360°'], ['To trekanter har samme form, men ulik størrelse. Hva kalles de?', 'Formlike']]
  });

  R('9/pytagoras', {
    kort: 'I en rettvinklet trekant henger de tre sidene sammen. Det kalles Pytagoras’ setning.',
    regler: [
      ['📐', 'Setningen', 'a² + b² = c². c er den lengste siden (hypotenusen). a og b er katetene, de som danner den rette vinkelen.'],
      ['🔎', 'Finne hypotenusen', 'c = √(a² + b²). Katetene 3 og 4: c = √(9 + 16) = √25 = 5.'],
      ['🔎', 'Finne en katet', 'a = √(c² − b²). Hypotenus 13 og katet 5: a = √(169 − 25) = √144 = 12.'],
      ['✅', 'Er trekanten rettvinklet?', 'Sjekk om a² + b² = c². Sidene 6, 8 og 10: 36 + 64 = 100 ✓.'],
      ['🧮', 'Kjente tripler', '3-4-5, 5-12-13, 8-15-17, og multiplum av dem, som 6-8-10.']
    ],
    eks: [
      ['En stige på 5 m står 3 m ut fra veggen. Hvor høyt opp når den?', ['Stigen er hypotenusen: c = 5. Avstanden er b = 3.', 'a² = 5² − 3² = 25 − 9 = 16.', 'a = √16 = 4 m.'], '4 m'],
      ['Katetene er 6 og 7. Finn hypotenusen (én desimal).', ['c² = 36 + 49 = 85.', 'c = √85.', 'c ≈ 9,2.'], '≈ 9,2']
    ],
    pass: ['Hypotenusen er alltid lengst. Blir svaret kortere enn en katet, er noe feil.', 'Du legger sammen kvadratene, ikke sidene: 3² + 4² = 5², men 3 + 4 ≠ 5.', 'For å finne en katet trekker du fra: c² − b².'],
    trick: 'Hypotenusen står alltid overfor den rette vinkelen. Tegn en figur og merk den.',
    ord: [['Hypotenus', 'Lengste siden i en rettvinklet trekant.'], ['Katet', 'En av de to korte sidene ved den rette vinkelen.'], ['Rettvinklet', 'Har en vinkel på 90°.']],
    test: [['Katetene er 6 og 8. Hva er hypotenusen?', '10'], ['Er 5, 6 og 9 sidene i en rettvinklet trekant?', 'Nei: 25 + 36 = 61, men 9² = 81']]
  });

  R('9/trekanter', {
    kort: 'Ikke alle tre lengder kan lage en trekant. Trekantulikheten forteller når det går.',
    regler: [
      ['📏', 'Trekantulikheten', 'De to korteste sidene må til sammen være lengre enn den lengste: a + b > c.'],
      ['❌', 'Når summen er lik', 'Er a + b = c, legger sidene seg flatt. Det blir ingen trekant.'],
      ['🧭', 'Den tredje siden', 'Er to sider a og b gitt, må den tredje være lengre enn differansen og kortere enn summen.'],
      ['✏️', 'Konstruksjon', 'Med lineal og passer kan du tegne en trekant når du kjenner tre sider.']
    ],
    eks: [
      ['Kan 4, 5 og 10 lage en trekant?', ['De to korteste: 4 + 5 = 9.', 'Den lengste er 10.', '9 er ikke større enn 10. Nei.'], 'Nei'],
      ['To sider er 5 og 8. Hvilke hele lengder kan den tredje siden ha?', ['Minst større enn 8 − 5 = 3, altså 4.', 'Mindre enn 5 + 8 = 13, altså 12 som størst.', 'Svar: 4, 5, 6, …, 12.'], '4 til 12']
    ],
    pass: ['Sjekk alltid den lengste siden mot summen av de to andre.', '«Lik» er ikke nok: summen må være større.', 'At tre lengder kan lage en trekant, betyr ikke at den er rettvinklet.'],
    trick: 'Test med de to korteste mot den lengste. Det er den eneste testen du trenger.',
    ord: [['Trekantulikheten', 'a + b > c for de tre sidene i en trekant.'], ['Differanse', 'Svaret på en subtraksjon.'], ['Konstruere', 'Å tegne nøyaktig med lineal og passer.']],
    test: [['Kan 3, 4 og 8 lage en trekant?', 'Nei, 3 + 4 = 7 er mindre enn 8'], ['To sider er 6 og 9. Hva er minste og største hele lengde for den tredje?', '4 og 14']]
  });

  R('9/formlikhet-praksis', {
    kort: 'Formlike figurer har samme form. Med skalafaktor kan vi regne ut lengder vi ikke kan måle.',
    regler: [
      ['🔍', 'Skalafaktor', 'k = ny lengde ÷ gammel lengde. Alle lengder ganges med k.'],
      ['🗺️', 'Målestokk', '1 : 50 000 betyr at 1 cm på kartet er 50 000 cm = 500 m i virkeligheten.'],
      ['🌳', 'Skygger', 'Samme tid på dagen gir formlike trekanter. Høyde ÷ skygge er lik for alle ting.'],
      ['📦', 'Areal og volum', 'Dobler du alle lengder (k = 2), blir arealet k² = 4 ganger så stort og volumet k³ = 8 ganger så stort.']
    ],
    eks: [
      ['En stolpe på 2 m har skygge 3 m. Et tre har skygge 12 m. Hvor høyt er treet?', ['Skalafaktor: 12 ÷ 3 = 4.', 'Høyde: 2 · 4 = 8.', 'Treet er 8 m høyt.'], '8 m'],
      ['Et kart har målestokk 1 : 20 000. Avstanden er 6 cm på kartet. Hva er den i virkeligheten?', ['6 · 20 000 = 120 000 cm.', '120 000 cm = 1 200 m.', '1 200 m = 1,2 km.'], '1,2 km']
    ],
    pass: ['Hold orden på hvilken figur som er «gammel» og hvilken som er «ny».', 'Areal og volum vokser raskere enn lengden.', 'Bruk samme enhet før du regner.'],
    trick: 'Skriv skalafaktoren først. Gang alle lengder med den.',
    ord: [['Målestokk', 'Forholdet mellom tegning og virkelighet.'], ['Skalafaktor', 'Tallet du ganger lengdene med.'], ['Forstørrelse', 'Når skalafaktoren er større enn 1.']],
    test: [['Målestokk 1 : 1000. 3 cm på kartet er hvor mange meter?', '30 m'], ['Skalafaktor 3. Hvor mange ganger større blir arealet?', '9 ganger']]
  });

  R('9/overflate-volum', {
    kort: 'Overflate er hvor mye som trengs for å dekke utsiden. Volum er hvor mye figuren rommer.',
    regler: [
      ['📦', 'Prisme', 'V = G · h, grunnflate ganger høyde. Eske: V = lengde · bredde · høyde.'],
      ['🥫', 'Sylinder', 'V = π · r² · h. Overflate: O = 2πr² + 2πrh.'],
      ['🔺', 'Pyramide og kjegle', 'V = (G · h) ÷ 3. En tredjedel av et prisme eller en sylinder med samme grunnflate og høyde.'],
      ['⚽', 'Kule', 'V = 4/3 · π · r³ og O = 4πr².'],
      ['🔄', 'Enheter', '1 dm³ = 1 liter = 1000 cm³.']
    ],
    eks: [
      ['Sylinder med r = 3 cm og h = 10 cm. Finn volumet.', ['V = π · r² · h.', 'V = π · 3² · 10 = π · 90.', 'V ≈ 282,7 cm³.'], '≈ 282,7 cm³'],
      ['Pyramide med kvadratisk grunnflate 6 cm · 6 cm og høyde 5 cm. Finn volumet.', ['G = 6 · 6 = 36 cm².', 'V = (36 · 5) ÷ 3 = 60.', 'V = 60 cm³.'], '60 cm³']
    ],
    pass: ['Pyramide og kjegle: ikke glem å dele på 3.', 'Radius er halve diameteren.', 'Volum har kubikkenheter (cm³), overflate har kvadratenheter (cm²).'],
    trick: 'Tegn figuren og skriv målene på den før du setter inn i formelen.',
    ord: [['Grunnflate', 'Flaten figuren står på.'], ['Overflate', 'Summen av alle flatene utenpå.'], ['Volum', 'Hvor mye figuren rommer.']],
    test: [['En eske er 4 · 5 · 3 cm. Hva er volumet?', '60 cm³'], ['Kjegle: G = 12 cm² og h = 5 cm. Volum?', '20 cm³']]
  });

  R('9/statistikk-media', {
    kort: 'Tall og grafer i media kan vinkles. Du må se på hvordan de er laget.',
    regler: [
      ['📊', 'Se på aksene', 'Starter y-aksen på 0? Hvis ikke, kan små forskjeller se store ut.'],
      ['🔎', 'Se på utvalget', 'Hvor mange er spurt, og hvem? Et lite eller skjevt utvalg gir svake konklusjoner.'],
      ['📉', 'Prosent og faktiske tall', 'En dobling fra 1 til 2 er 100 %, men det er bare 1 mer. Spør alltid: prosent av hva?'],
      ['🔗', 'Sammenheng er ikke årsak', 'To ting kan øke samtidig uten at den ene forårsaker den andre.'],
      ['📏', 'Gjennomsnitt og median', 'Noen få svært høye verdier drar gjennomsnittet opp. Medianen viser ofte det typiske bedre.']
    ],
    eks: [
      ['Søyle A er 98 og søyle B er 100, men aksen går fra 96 til 100. Hva er galt?', ['Aksen starter på 96, ikke 0.', 'B ser dobbelt så høy ut som A.', 'Forskjellen er bare 2 av 100, altså 2 %.'], 'Misvisende akse'],
      ['90 % anbefaler produktet, men bare 10 personer er spurt. Hva sier du?', ['9 av 10 er 90 %.', 'Utvalget er veldig lite.', 'Tallet sier lite om alle kjøperne.'], 'For lite utvalg']
    ],
    pass: ['Stol ikke på en graf før du har sett aksene.', 'Spør alltid: hvem er spurt, og hvor mange?', 'At to ting henger sammen, betyr ikke at den ene forårsaker den andre.'],
    trick: 'Fire spørsmål: Hvem? Hvor mange? Hvilke akser? Prosent av hva?',
    ord: [['Utvalg', 'De som faktisk er spurt eller målt.'], ['Misvisende', 'Gir et feil inntrykk.'], ['Årsak', 'Det som gjør at noe skjer.']],
    test: [['Hva bør du sjekke først på en søylegraf?', 'Hvor y-aksen starter'], ['Hva betyr det at to ting henger sammen?', 'Ikke nødvendigvis at den ene forårsaker den andre']]
  });

  R('9/sentralmal-spredning', {
    kort: 'Sentralmål forteller hva som er typisk. Spredning forteller hvor ulike tallene er.',
    regler: [
      ['➕', 'Gjennomsnitt', 'Summen av alle tall ÷ antall tall. 4, 6 og 8: (4 + 6 + 8) ÷ 3 = 6.'],
      ['🎯', 'Median', 'Midterste tall når tallene er sortert. Er det to i midten, tar du gjennomsnittet av dem.'],
      ['🏆', 'Typetall', 'Tallet som forekommer flest ganger.'],
      ['↔️', 'Variasjonsbredde', 'Største − minste. Viser hvor langt det er mellom ytterpunktene.'],
      ['📦', 'Kvartiler', 'Q1 og Q3 deler de sorterte tallene i fire like deler. Kvartilbredde = Q3 − Q1.']
    ],
    eks: [
      ['Tallene 3, 8, 5, 9, 5. Finn gjennomsnitt, median og typetall.', ['Sorter: 3, 5, 5, 8, 9.', 'Gjennomsnitt: (3 + 5 + 5 + 8 + 9) ÷ 5 = 30 ÷ 5 = 6.', 'Median er det midterste: 5. Typetall: 5.'], 'Gjennomsnitt 6, median 5, typetall 5'],
      ['Finn medianen til 2, 4, 6, 10.', ['Fire tall. De to i midten er 4 og 6.', '(4 + 6) ÷ 2 = 5.'], '5']
    ],
    pass: ['Sorter tallene før du finner medianen.', 'Typetallet er tallet som er flest, ikke hvor mange det er.', 'Ved to midterste tall: ta gjennomsnittet av dem.'],
    trick: 'Skriv tallene i rekkefølge og kryss av fra hver ende til du står i midten.',
    ord: [['Gjennomsnitt', 'Sum delt på antall.'], ['Median', 'Midterste tall i en sortert rekke.'], ['Typetall', 'Det som forekommer oftest.']],
    test: [['Hva er medianen av 1, 3 og 9?', '3'], ['Variasjonsbredde for 4, 9, 2 og 7?', '7']]
  });

  R('9/sannsynlighet', {
    kort: 'Sannsynlighet er et tall mellom 0 og 1 som sier hvor stor sjanse det er for at noe skjer.',
    regler: [
      ['🎲', 'Formelen', 'P = gunstige utfall ÷ mulige utfall, når alle utfall er like sannsynlige. Partall på en terning: 3 av 6 = 1/2.'],
      ['🔢', 'Skalaen', '0 betyr umulig og 1 betyr sikkert. Du kan skrive sannsynlighet som brøk, desimaltall eller prosent.'],
      ['❌', 'Komplementet', 'P(ikke A) = 1 − P(A). Sjansen for ikke å få 6: 1 − 1/6 = 5/6.'],
      ['🌳', 'Valgtre og gange', 'For uavhengige hendelser ganger du: P(A og B) = P(A) · P(B). To mynter, kron og kron: 1/2 · 1/2 = 1/4.'],
      ['🔁', 'Mange forsøk', 'Jo flere forsøk, desto nærmere kommer resultatet den teoretiske sannsynligheten.']
    ],
    eks: [
      ['En pose har 3 røde og 5 blå kuler. Hva er P(rød)?', ['Gunstige utfall: 3 røde.', 'Mulige utfall: 3 + 5 = 8.', 'P(rød) = 3/8.'], '3/8'],
      ['Hva er sannsynligheten for to seksere når du kaster to terninger?', ['En sekser: 1/6.', 'Gang: 1/6 · 1/6.', 'P = 1/36.'], '1/36']
    ],
    pass: ['Sannsynlighet kan aldri være større enn 1.', 'Formelen virker bare når alle utfall er like sannsynlige.', 'Terningen husker ikke forrige kast.'],
    trick: 'Tegn et valgtre eller en tabell og tell utfallene.',
    ord: [['Utfall', 'Et mulig resultat.'], ['Gunstig utfall', 'Et utfall som passer med det du spør om.'], ['Uavhengige hendelser', 'Hendelser som ikke påvirker hverandre.']],
    test: [['P(partall) på en terning?', '1/2'], ['P(ikke 6) på en terning?', '5/6']]
  });

  R('9/simulering', {
    kort: 'I en simulering lar vi datamaskinen gjøre mange tilfeldige forsøk for oss.',
    regler: [
      ['🎲', 'Tilfeldige tall', 'random.randint(1, 6) gir et tilfeldig heltall fra 1 til 6, begge med.'],
      ['🔁', 'Gjenta mange ganger', 'for i in range(1000): gjentar det som står under 1000 ganger.'],
      ['🧮', 'Telle', 'Start med antall = 0 og skriv antall += 1 hver gang noe skjer.'],
      ['📊', 'Relativ frekvens', 'Antall ganger noe skjedde ÷ antall forsøk. Tallet nærmer seg sannsynligheten.']
    ],
    eks: [
      ['Programmet kaster en terning 1000 ganger og teller seksere. Hva forteller utskriften?', ['Programmet kaster 1000 ganger.', 'Hver gang det er en sekser, øker antall med 1.', 'Utskriften antall / 1000 blir omtrent 0,17 (1/6).'], 'Omtrent 0,17']
    ],
    pass: ['== sjekker om noe er likt. = legger inn en verdi.', 'Hver kjøring gir litt ulikt svar. Det er normalt.', 'Flere forsøk gir sikrere svar.'],
    trick: 'Kjør simuleringen flere ganger og se om svaret holder seg nær den samme verdien.',
    ord: [['Simulering', 'En etterlikning av noe virkelig med datamaskin.'], ['Relativ frekvens', 'Andelen ganger noe har skjedd.'], ['Teller', 'En variabel som øker hver gang noe skjer.']],
    test: [['Hva gjør random.randint(1, 6)?', 'Gir et tilfeldig heltall fra 1 til 6'], ['Hva er relativ frekvens?', 'Antall ganger det skjedde ÷ antall forsøk']]
  });
})();
