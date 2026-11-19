/* ============================================================
   Les, tolk og begrunn – innhold for 8. trinn
   Markering i tekst: [[t|tall og enheter]] [[s|det oppgaven spør om]] [[u|unødvendig info]]
   Flervalg: [tekst, riktig?, hint som vises hvis det er feil]
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;

  const tekst = {
    rolig: [
      { tittel: 'Temperatur', tekst: 'Klokka åtte om morgenen er det [[t|−6 °C]] ute. Til lunsj har temperaturen steget med [[t|9 grader]]. [[u|Anna har på seg rød lue.]] [[s|Hva er temperaturen til lunsj?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['−6 + 9', 1], ['−6 − 9', 0, '«Steget» betyr at det blir varmere. Da skal du legge til, ikke trekke fra.'], ['6 + 9', 0, 'Du må starte på temperaturen om morgenen, og den var −6, ikke 6.']], forkl: 'Steget med 9 grader betyr pluss 9. −6 + 9 = 3, så temperaturen er 3 °C.' } },
      { tittel: 'Epler', tekst: 'Ola kjøper [[t|3 kg]] epler. Hvert kilo koster [[t|25 kr]]. [[u|Butikken ligger ved siden av skolen.]] [[s|Hvor mye må han betale til sammen?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['3 · 25', 1], ['3 + 25', 0, 'Pris per kilo betyr at prisen gjelder for hvert kilo. Da må du gange, ikke legge sammen.'], ['25 − 3', 0, 'Det er ikke noe som skal trekkes fra her.'], ['25 : 3', 0, 'Du skal ikke dele prisen, du skal finne prisen for flere kilo.']], forkl: '3 kg til 25 kr per kg: 3 · 25 = 75. Ola må betale 75 kr.' } },
      { tittel: 'Tallet til Jonas', tekst: 'Jonas tenker på et tall. Når han ganger tallet med [[t|4]] og legger til [[t|3]], får han [[t|23]]. [[s|Hvilket tall tenker han på?]]',
        spm: { q: 'Hvilken likning passer? La x være tallet.', valg: [['4x + 3 = 23', 1], ['4x − 3 = 23', 0, 'Han legger til 3, han trekker ikke fra.'], ['x + 4 · 3 = 23', 0, 'Det er x som skal ganges med 4, ikke tallet 3.'], ['4 + x + 3 = 23', 0, '«Ganger med 4» betyr at 4 står ved siden av x, ikke at du legger til 4.']], forkl: '4x + 3 = 23 gir 4x = 20, og dermed x = 5.' } }
    ],
    vanlig: [
      { tittel: 'Mobilabonnement', tekst: 'Et mobilabonnement koster [[t|149 kr]] i måneden og gir [[t|10 GB]] data. Går du over, betaler du [[t|20 kr]] per ekstra GB. [[u|Selskapet har vunnet pris for kundeservice.]] I januar brukte Sara [[t|13 GB]]. [[s|Hva må hun betale i januar?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['149 + (13 − 10) · 20', 1], ['149 + 13 · 20', 0, 'De første 10 GB er allerede med i prisen på 149 kr. Du betaler bare for dem som er over.'], ['149 · 13', 0, '149 kr er prisen for hele måneden, ikke per GB.'], ['(149 + 20) · 3', 0, 'Se på hva 20 kr gjelder: det er prisen per ekstra GB, ikke et tillegg til hele abonnementet.']], forkl: 'Sara brukte 3 GB for mye: 13 − 10 = 3. Det koster 3 · 20 = 60 kr. Til sammen 149 + 60 = 209 kr.' } },
      { tittel: 'Sykkelsparing', mangler: true, instr: 'Les teksten og marker det du har. Avgjør så om oppgaven kan løses slik den står.', tekst: 'Eva sparer penger til en ny sykkel. Hun har allerede [[t|800 kr]] og sparer [[t|150 kr]] hver måned. [[s|Hvor mange måneder må hun spare før hun har råd til sykkelen?]]',
        spm: { q: 'Kan oppgaven løses slik den står?', valg: [['Nei. Vi vet ikke hva sykkelen koster.', 1], ['Ja. Svaret er 800 : 150.', 0, 'Da har du ikke brukt prisen på sykkelen. Hva er det du egentlig skal nå?'], ['Ja. Svaret er 150 måneder.', 0, 'Hvor kom det tallet fra? Tenk på hva Eva sparer mot.']], forkl: 'Prisen på sykkelen mangler. Uten den vet vi ikke hvor mye Eva må få spart. Når du ser at noe mangler, kan du spørre: «Hva koster sykkelen?»' } },
      { tittel: 'Taxi', tekst: 'En taxi tar [[t|50 kr]] i startpris og [[t|18 kr]] for hver kilometer. [[u|Taxien er en hvit Tesla.]] Oda skal kjøre [[t|12 km]]. [[s|Hva koster turen?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['50 + 18 · 12', 1], ['(50 + 18) · 12', 0, 'Startprisen betaler du bare én gang, ikke for hver kilometer.'], ['50 · 12 + 18', 0, 'Startprisen er 50 kr én gang, og 18 kr gjelder hver kilometer. Du har byttet dem.'], ['50 + 12', 0, 'Kilometerprisen på 18 kr mangler.']], forkl: 'Startprisen 50 kr kommer én gang. Så kommer 12 km · 18 kr = 216 kr. Til sammen 50 + 216 = 266 kr.' } }
    ],
    utfordring: [
      { tittel: 'Leksehjelp', tekst: 'På en ungdomsskole er det [[t|240 elever]]. [[t|35 %]] av elevene går i 8. klasse. [[u|Skolen ble bygget i 1987, og kantina ble pusset opp i fjor.]] Av elevene i 8. klasse har [[t|25 %]] sagt at de vil ha leksehjelp. [[s|Hvor mange elever i 8. klasse vil ha leksehjelp?]]',
        spm: { q: 'Hvilken beregning gir svaret?', valg: [['240 · 0,35 · 0,25', 1], ['240 · 0,25', 0, 'De 25 % gjelder bare elevene i 8. klasse, ikke alle 240.'], ['240 · 0,35 + 0,25', 0, 'Prosentene skal tas etter hverandre, ikke legges sammen med et tall.'], ['240 · 0,35', 0, 'Det er antall elever i 8. klasse. Du er ikke ferdig: oppgaven spør om hvor mange som vil ha leksehjelp.']], forkl: '35 % av 240 er 84 elever i 8. klasse. 25 % av 84 er 21. Det er 21 elever som vil ha leksehjelp.' } },
      { tittel: 'Svalbard', tekst: 'Under en tur til Svalbard noterer Kari temperaturen hver dag. Mandag var det [[t|−12 °C]]. Tirsdag var det [[t|5 grader]] kaldere enn mandag. [[u|Hun hadde med seg termos og kamera.]] Onsdag var det [[t|8 grader]] varmere enn tirsdag. [[s|Hva var temperaturen onsdag?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['−12 − 5 + 8', 1], ['−12 + 5 + 8', 0, '«Kaldere» betyr lavere temperatur. Tirsdag skal du trekke fra 5.'], ['12 − 5 + 8', 0, 'Mandag var temperaturen −12, ikke 12.'], ['−12 − 5 − 8', 0, '«Varmere» betyr at temperaturen går opp. Onsdag skal du legge til 8.']], forkl: 'Tirsdag: −12 − 5 = −17 °C. Onsdag: −17 + 8 = −9 °C.' } },
      { tittel: 'Alder', tekst: 'Per er [[t|3 år]] eldre enn Lise. Til sammen er de [[t|35 år]]. [[u|Per bor i Bergen.]] [[s|Hvor gammel er Lise?]]',
        spm: { q: 'Hvilken likning passer? La x være Lises alder.', valg: [['x + (x + 3) = 35', 1], ['x + 3 = 35', 0, '35 er summen av begge to. Da må begge alderne være med på venstre side.'], ['3x = 35', 0, 'Per er 3 år eldre. Han er ikke tre ganger så gammel.'], ['x − 3 = 35', 0, 'Per er eldre enn Lise, så hans alder er x + 3, ikke x − 3.']], forkl: 'x + x + 3 = 35 gir 2x = 32, så x = 16. Lise er 16 år og Per er 19 år.' } },
      { tittel: 'Rektangel', mangler: true, instr: 'Marker det du har, og avgjør så om oppgaven kan løses slik den står.', tekst: 'Et rektangel har omkrets [[t|36 cm]]. [[s|Hva er arealet?]]',
        spm: { q: 'Kan oppgaven løses slik den står?', valg: [['Nei. Mange ulike rektangler har omkrets 36 cm, og de har ulikt areal.', 1], ['Ja. Arealet er 36 cm².', 0, 'Omkrets og areal er ikke det samme. Se på enhetene: omkrets måles i cm, areal i cm².'], ['Ja. Arealet er 36 · 36.', 0, 'Det finnes ingen regel som sier det. Prøv med to forskjellige rektangler.']], forkl: 'Et rektangel på 10 cm · 8 cm har omkrets 36 cm og areal 80 cm². Et på 17 cm · 1 cm har også omkrets 36 cm, men areal bare 17 cm². Vi må vite lengde og bredde.' } }
    ]
  };

  const graf = {
    rolig: [
      { tittel: 'Favorittfrukt i 8A', tekst: 'Elevene i 8A ble spurt om hvilken frukt de liker best. Svarene er satt inn i et søylediagram.',
        graf: { type: 'sol', tittel: 'Favorittfrukt i 8A', xTittel: 'Frukt', yTittel: 'Antall elever', kat: ['Eple', 'Banan', 'Pære', 'Appelsin'], verdier: [8, 12, 5, 7], yMin: 0, yMax: 14, steg: 2 },
        oppg: [
          { t: 'klikk', q: 'Trykk på tittelen. Den forteller hva grafen handler om.', mål: 'tittel', forkl: 'Tittelen sier at grafen handler om favorittfrukt i 8A.', hint: 'Tittelen står øverst i grafen.' },
          { t: 'klikk', q: 'Trykk på aksetittelen som forteller hva y-aksen (den loddrette) måler.', mål: 'yakse', forkl: 'Y-aksen viser antall elever.', hint: 'Y-aksen er den som står rett opp. Leter du etter teksten ved siden av den?' },
          { t: 'klikk', q: 'Trykk på den høyeste søylen.', mål: 'topp', forkl: 'Banan har flest elever: 12.', hint: 'Hvilken søyle når høyest opp?' },
          { q: 'Hvor mange elever valgte pære?', valg: [['5', 1], ['7', 0, 'Det er appelsin. Se på navnet under søylen.'], ['12', 0, 'Det er banan.']], forkl: 'Søylen for pære når opp til 5.' },
          { q: 'Hvor mange elever svarte til sammen?', valg: [['32', 1], ['12', 0, 'Det er bare banan. Du skal legge sammen alle søylene.'], ['4', 0, 'Det er antall søyler, ikke antall elever.']], forkl: '8 + 12 + 5 + 7 = 32 elever.' }
        ] },
      { tittel: 'Temperatur gjennom en dag', tekst: 'Grafen viser temperaturen ute i løpet av en vinterdag.',
        graf: { type: 'linje', tittel: 'Temperatur i løpet av en dag', xTittel: 'Klokkeslett', yTittel: 'Temperatur (°C)', kat: ['06', '09', '12', '15', '18', '21'], verdier: [-3, 0, 4, 6, 2, -1], yMin: -4, yMax: 8, steg: 2 },
        oppg: [
          { t: 'klikk', q: 'Trykk på punktet der det var kaldest.', mål: 'bunn', forkl: 'Kaldest var det klokka 06: −3 °C.', hint: 'Kaldest er lavest ned i grafen.' },
          { t: 'klikk', q: 'Trykk på punktet der det var varmest.', mål: 'topp', forkl: 'Varmest var det klokka 15: 6 °C.', hint: 'Varmest er høyest opp i grafen.' },
          { q: 'Hva var temperaturen klokka 09?', valg: [['0 °C', 1], ['−3 °C', 0, 'Det var klokka 06.'], ['4 °C', 0, 'Det var klokka 12.']], forkl: 'Klokka 09 var temperaturen 0 °C. Punktet ligger på nullinja.' },
          { q: 'Hvor mange grader steg temperaturen fra klokka 06 til klokka 12?', valg: [['7 grader', 1], ['1 grad', 0, 'Du har regnet −3 + 4. Se på hva spørsmålet egentlig spør om: hvor langt er det fra −3 opp til 4?'], ['4 grader', 0, 'Det er temperaturen klokka 12, ikke endringen.']], forkl: 'Fra −3 til 4 er det 7 grader: 4 − (−3) = 4 + 3 = 7.' }
        ] }
    ],
    vanlig: [
      { tittel: 'Sparing', tekst: 'Mia sparer til en ny telefon. Grafen viser hvor mye hun hadde spart ved slutten av hver måned.',
        graf: { type: 'linje', tittel: 'Mias sparing', xTittel: 'Måned', yTittel: 'Sparte penger (kr)', kat: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun'], verdier: [200, 350, 500, 650, 800, 950], yMin: 0, yMax: 1000, steg: 200 },
        oppg: [
          { t: 'klikk', q: 'Trykk på det som forteller hva x-aksen (den vannrette) viser.', mål: 'xakse', forkl: 'X-aksen viser måned.', hint: 'X-aksen er den vannrette. Se etter teksten under den.' },
          { q: 'Hvor mye hadde Mia spart ved slutten av april?', valg: [['650 kr', 1], ['500 kr', 0, 'Det var i mars.'], ['800 kr', 0, 'Det var i mai.']], forkl: 'Punktet for april ligger på 650 kr.' },
          { q: 'Hvor mye øker sparingen hver måned?', valg: [['150 kr', 1], ['200 kr', 0, 'Det er det hun hadde i januar. Se hvor mye den øker fra en måned til neste.'], ['950 kr', 0, 'Det er sparingen i juni.']], forkl: 'Fra 200 til 350 er økningen 150 kr, og det samme fra 350 til 500. Sparingen øker jevnt med 150 kr per måned.' },
          { q: 'Hvis Mia fortsetter likt, hvor mye har hun spart ved slutten av august (måned 8)?', valg: [['1250 kr', 1], ['1100 kr', 0, 'Det er sparingen i juli. August er én måned til.'], ['1500 kr', 0, 'Det er for mye. Fra juni (950) er det to måneder til august: 950 + 150 + 150.']], forkl: 'Juni: 950. Juli: 1100. August: 1250 kr.' }
        ] },
      { tittel: 'Hvor starter aksen?', tekst: 'En skole skriver at «stadig flere elever sykler til skolen». De viser dette søylediagrammet.',
        graf: { type: 'sol', tittel: 'Elever som sykler til skolen', xTittel: 'År', yTittel: 'Antall elever', kat: ['2022', '2023', '2024'], verdier: [52, 54, 56], yMin: 50, yMax: 58, steg: 2 },
        oppg: [
          { t: 'klikk', q: 'Trykk på tallet der y-aksen starter.', mål: 'start', forkl: 'Y-aksen starter på 50, ikke på 0.', hint: 'Se på det nederste tallet på den loddrette aksen.' },
          { q: 'Søylen for 2024 ser ut til å være tre ganger så høy som søylen for 2022. Stemmer det?', valg: [['Nei. Aksen starter på 50, så forskjellen ser mye større ut enn den er.', 1], ['Ja. Søylen er tre ganger så høy.', 0, 'Se på hvor aksen starter. Er bunnen av søylene på null?'], ['Ja. Tallene viser at det er tre ganger så mange.', 0, 'Les tallene på aksen. Er 56 tre ganger så mye som 52?']], forkl: '56 er bare litt mer enn 52. Når aksen starter på 50, ser det ut som om søylen for 2024 er 6 høy og for 2022 bare 2 høy. Det gir et misvisende bilde.' },
          { q: 'Hva bør du alltid sjekke før du sammenligner søyler?', valg: [['Hvor y-aksen starter', 1], ['Hvilken farge søylene har', 0, 'Fargen sier ikke noe om størrelsen.'], ['Hvor mange søyler det er', 0, 'Antallet søyler hjelper ikke deg å se om bildet er misvisende.']], forkl: 'Sjekk alltid hvor aksen starter. En akse som ikke starter på null kan få små forskjeller til å se store ut.' }
        ] }
    ],
    utfordring: [
      { tittel: 'Kaffepriser', tekst: 'En avis skriver: «Kafé C er mye dyrere enn kafé A.» De viser denne grafen over prisen på en kopp kaffe.',
        graf: { type: 'sol', tittel: 'Pris på en kopp kaffe', xTittel: 'Kafé', yTittel: 'Pris (kr)', kat: ['Kafé A', 'Kafé B', 'Kafé C'], verdier: [45, 50, 55], yMin: 40, yMax: 60, steg: 5 },
        oppg: [
          { t: 'klikk', q: 'Trykk på tallet der y-aksen starter.', mål: 'start', forkl: 'Y-aksen starter på 40.', hint: 'Se på det nederste tallet på y-aksen.' },
          { q: 'Søylen for kafé C ser tre ganger så høy ut som for kafé A (over aksen). Hvor mye dyrere er kafé C egentlig, regnet i prosent av prisen til kafé A?', valg: [['Ca. 22 %', 1], ['200 %', 0, 'Det er det bildet ser ut til å vise, fordi aksen starter på 40. Regn ut forskjellen i kroner og del på prisen til A.'], ['10 %', 0, 'Forskjellen er 10 kr, men spørsmålet er hvor mange prosent det er av 45 kr.'], ['55 %', 0, '55 er prisen til kafé C, ikke prosentforskjellen.']], forkl: 'Forskjellen er 55 − 45 = 10 kr. 10 : 45 ≈ 0,22, altså ca. 22 %. Det er mye mindre enn søylene gir inntrykk av.' },
          { q: 'Hva ville gjort grafen mer ærlig?', valg: [['La y-aksen starte på 0', 1], ['Gjøre søylene smalere', 0, 'Bredden på søylene endrer ikke hvor høye de ser ut.'], ['Fjerne tittelen', 0, 'Da blir grafen vanskeligere å forstå, ikke mer ærlig.']], forkl: 'Med y-aksen fra 0 blir høydene proporsjonale med prisene. Da ser du at kafé C er litt dyrere, ikke mye.' }
        ] },
      { tittel: 'Månedstemperatur', tekst: 'Grafen viser gjennomsnittstemperaturen i seks måneder på et sted i Nord-Norge.',
        graf: { type: 'linje', tittel: 'Gjennomsnittstemperatur per måned', xTittel: 'Måned', yTittel: 'Temperatur (°C)', kat: ['Des', 'Jan', 'Feb', 'Mar', 'Apr', 'Mai'], verdier: [-3, -5, -4, -1, 2, 7], yMin: -6, yMax: 8, steg: 2 },
        oppg: [
          { t: 'klikk', q: 'Trykk på den kaldeste måneden.', mål: 'bunn', forkl: 'Kaldest er januar: −5 °C.', hint: 'Kaldest er det laveste punktet.' },
          { q: 'Hvor mange grader steg temperaturen fra januar til mai?', valg: [['12 grader', 1], ['2 grader', 0, 'Du har regnet 7 − 5. Men januar er −5, ikke 5.'], ['7 grader', 0, 'Det er temperaturen i mai. Du må finne endringen fra −5.']], forkl: '7 − (−5) = 7 + 5 = 12 grader.' },
          { q: 'Hva er gjennomsnittet av temperaturen i desember, januar og februar?', valg: [['−4 °C', 1], ['−12 °C', 0, 'Det er summen. For å finne gjennomsnittet må du dele på antall måneder.'], ['4 °C', 0, 'Alle tre temperaturene er under null, så gjennomsnittet må også være under null.']], forkl: '(−3 + (−5) + (−4)) : 3 = −12 : 3 = −4 °C.' },
          { q: 'Hvilken påstand om grafen er riktig?', valg: [['Mars var 4 grader varmere enn januar.', 1], ['Mars var 4 grader kaldere enn januar.', 0, 'Mars er −1 og januar er −5. Hvilken ligger høyest?'], ['Mars var like varmt som februar.', 0, 'Februar er −4 og mars er −1. Det er ikke det samme.']], forkl: '−1 − (−5) = −1 + 5 = 4. Mars var 4 grader varmere enn januar.' }
        ] }
    ]
  };

  const foring = {
    mal: [
      { navn: 'Oppgavenummer', hva: 'Skriv hvilken oppgave det er.', eks: 'Oppgave 3b' },
      { navn: 'Gitt og finn', hva: 'Skriv det du vet (med enhet) og det du skal finne.', eks: 'Gitt: 3 kg epler, 25 kr per kg\nFinn: hva Ola må betale' },
      { navn: 'Regel eller formel', hva: 'Skriv regelen du bruker, i ord eller med symboler.', eks: 'Totalpris = pris per kg · antall kg' },
      { navn: 'Utregning', hva: 'Ett steg på hver linje. Likhetstegnene står under hverandre.', eks: 'Totalpris = 25 kr · 3\n         = 75 kr' },
      { navn: 'Svarsetning', hva: 'Svar med en hel setning og enhet.', eks: 'Svar: Ola må betale 75 kr.' },
      { navn: 'Sjekk', hva: 'Er svaret rimelig? Prøv å regne baklengs eller overslag.', eks: 'Sjekk: 3 kg til ca. 25 kr er ca. 75 kr ✓' }
    ],
    regler: [
      '**Ett steg per linje.** Da kan du og læreren se hvor en eventuell feil er.',
      '**Likhetstegn betyr «er like mye som».** Skriv ikke 3 + 4 = 7 · 2 = 14. Det står at 7 er lik 14. Skriv en ny linje.',
      '**Alltid enhet.** 75 betyr ingenting. 75 kr, 75 cm eller 75 °C betyr noe.',
      '**Skriv en svarsetning.** Da ser du om svaret passer til spørsmålet.',
      '**Strek over, ikke visk ut.** Én strek over feilen, så skriver du videre. Da kan læreren se at du tenkte.'
    ],
    sammenlign: {
      rolig: [
        { oppg: 'Ola kjøper 3 kg epler til 25 kr per kg. Hva må han betale?', darlig: ['75'], feil: ['Ingen utregning. Hvordan kom du fram til 75?', 'Ingen enhet. 75 hva?', 'Ingen svarsetning.'],
          bra: ['Oppgave 2', 'Gitt: 3 kg epler, 25 kr per kg', 'Totalpris = 25 kr · 3', '         = 75 kr', 'Svar: Ola må betale 75 kr.'] }
      ],
      vanlig: [
        { oppg: 'Løs likningen 3x + 4 = 19.', darlig: ['3x + 4 = 19 = 3x = 15 = x = 5'], feil: ['Alt står på én linje med likhetstegn imellom. Det står at 19 er lik 3x, og at 3x er lik 15, og det er feil.', 'Man ser ikke hva du gjorde fra linje til linje.', 'Ingen sjekk og ingen svarsetning.'],
          bra: ['3x + 4 = 19', '3x + 4 − 4 = 19 − 4', '3x = 15', '3x : 3 = 15 : 3', 'x = 5', 'Sjekk: 3 · 5 + 4 = 15 + 4 = 19 ✓', 'Svar: x = 5'] }
      ],
      utfordring: [
        { oppg: 'Et rektangel har lengde 12 cm og bredde 5 cm. Finn omkretsen.', darlig: ['12 + 5 = 17 · 2 = 34'], feil: ['Likhetstegnet brukes feil. Det står at 12 + 5 er lik 34.', 'Ingen formel, så vi vet ikke hvorfor du ganger med 2.', 'Ingen enhet (cm) og ingen svarsetning.'],
          bra: ['Omkrets = 2 · lengde + 2 · bredde', '         = 2 · 12 cm + 2 · 5 cm', '         = 24 cm + 10 cm', '         = 34 cm', 'Sjekk: 12 + 5 = 17 er halve omkretsen, og 2 · 17 = 34 ✓', 'Svar: Omkretsen er 34 cm.'] },
        { oppg: 'En sparkesykkel koster 1200 kr. Prisen settes ned 25 %. Hva er den nye prisen?', darlig: ['1200 · 0,25 = 300'], feil: ['300 kr er avslaget, ikke den nye prisen. Oppgaven spør om ny pris.', 'Uten svarsetning ser du ikke at svaret ikke passer til spørsmålet.', 'Ingen enhet.'],
          bra: ['Avslag = 25 % av 1200 kr', '       = 0,25 · 1200 kr', '       = 300 kr', 'Ny pris = 1200 kr − 300 kr', '        = 900 kr', 'Sjekk: 75 % av 1200 = 0,75 · 1200 = 900 ✓', 'Svar: Ny pris er 900 kr.'] }
      ]
    },
    rekke: {
      rolig: [
        { tittel: 'Epler', oppg: 'Ola kjøper 3 kg epler til 25 kr per kg. Hva må han betale?', linjer: ['Gitt: 3 kg epler, 25 kr per kg', 'Finn: totalpris', 'Totalpris = 25 kr · 3', '         = 75 kr', 'Svar: Ola må betale 75 kr.'], hint: 'Først skriver du hva du vet og hva du skal finne. Så regner du. Til slutt kommer svaret.' }
      ],
      vanlig: [
        { tittel: 'Likning', oppg: 'Løs likningen 2x + 5 = 17.', linjer: ['2x + 5 = 17', '2x + 5 − 5 = 17 − 5', '2x = 12', '2x : 2 = 12 : 2', 'x = 6', 'Sjekk: 2 · 6 + 5 = 12 + 5 = 17 ✓'], hint: 'Start med likningen. Så fjerner du først det som er lagt til, og deretter det x er ganget med.' },
        { tittel: 'SMS-abonnement', oppg: 'Et abonnement koster 99 kr fast, pluss 2 kr per SMS. Hva koster 15 SMS?', linjer: ['Gitt: 99 kr fast, 2 kr per SMS, 15 SMS', 'Pris = 99 kr + 2 kr · 15', '     = 99 kr + 30 kr', '     = 129 kr', 'Svar: 15 SMS koster 129 kr.'], hint: 'Gange før du legger til: 2 kr · 15 kommer først.' }
      ],
      utfordring: [
        { tittel: 'Sparkesykkel', oppg: 'En sparkesykkel koster 1200 kr. Prisen settes ned 25 %. Hva er den nye prisen?', linjer: ['Avslag = 25 % av 1200 kr', '       = 0,25 · 1200 kr', '       = 300 kr', 'Ny pris = 1200 kr − 300 kr', '        = 900 kr', 'Sjekk: 75 % av 1200 = 0,75 · 1200 = 900 ✓', 'Svar: Ny pris er 900 kr.'], hint: 'Du må finne avslaget før du finner den nye prisen.' },
        { tittel: 'Alder', oppg: 'Per er 3 år eldre enn Lise. Sammen er de 35 år. Hvor gammel er Lise?', linjer: ['La x = Lises alder. Da er Per x + 3 år.', 'x + (x + 3) = 35', '2x + 3 = 35', '2x + 3 − 3 = 35 − 3', '2x = 32', 'x = 16', 'Sjekk: Lise 16 og Per 19 gir 16 + 19 = 35 ✓', 'Svar: Lise er 16 år.'], hint: 'Først bestemmer du hva x står for. Så setter du opp likningen.' }
      ]
    },
    vurder: {
      rolig: [
        { tittel: 'Sjokolade', oppg: 'Mia har 100 kr. Hun kjøper 3 sjokolader til 12 kr hver. Hvor mye har hun igjen?', spm: 'Hvilken elev har den beste føringen?',
          svar: [{ tekst: '64', best: false, kom: 'Svaret stemmer, men det står ingen utregning, ingen enhet og ingen svarsetning. Hvordan skal læreren vite at du har forstått?' },
            { tekst: '3 · 12 kr = 36 kr\n100 kr − 36 kr = 64 kr\nSvar: Mia har 64 kr igjen.', best: true, kom: '' },
            { tekst: '3 · 12 = 36 − 100 = 64', best: false, kom: 'Her står det at 36 − 100 er 64, og det er ikke riktig. 36 − 100 = −64. Likhetstegnet er brukt feil.' }],
          forkl: 'Elev B har utregning på hver sin linje, enheter og svarsetning. Elev A har bare svar, og elev C bruker likhetstegn feil.' }
      ],
      vanlig: [
        { tittel: 'Likning', oppg: 'Løs likningen 5x − 3 = 22.', spm: 'Hvilken elev har den beste føringen?',
          svar: [{ tekst: 'x = 5', best: false, kom: 'Riktig svar, men uten utregning. På en prøve kan du ikke få full uttelling for bare et tall.' },
            { tekst: '5x − 3 = 22\n5x − 3 + 3 = 22 + 3\n5x = 25\n5x : 5 = 25 : 5\nx = 5\nSjekk: 5 · 5 − 3 = 22 ✓\nSvar: x = 5', best: true, kom: '' },
            { tekst: '5x − 3 = 22 = 5x = 25 = x = 5', best: false, kom: 'Alt står på én linje, og likhetstegnene sier noe galt: for eksempel at 22 er lik 5x.' }],
          forkl: 'Elev B viser hvert steg, sjekker svaret og skriver en svarsetning. Da kan du finne en feil hvis du har gjort en.' }
      ],
      utfordring: [
        { tittel: 'Avslag', oppg: 'Du kjøper 2,5 kg epler som koster 36 kr per kg. Du får 10 % avslag. Hva betaler du?', spm: 'Hvilken elev har den beste føringen?',
          svar: [{ tekst: '36 kr · 2,5 = 90 kr\nAvslag: 90 kr · 0,10 = 9 kr\nBetaler: 90 kr − 9 kr = 81 kr\nSvar: Du betaler 81 kr.', best: true, kom: '' },
            { tekst: '36 · 2,5 = 90 · 0,10 = 9', best: false, kom: 'Likhetstegnet brukes feil (90 er ikke lik 9), og 9 kr er avslaget. Oppgaven spør om hva du betaler.' },
            { tekst: '90 − 10 = 80 kr', best: false, kom: '10 % av 90 er ikke 10 kr, men 9 kr. Svaret blir feil, og man ser ikke hvor 90 kom fra.' }],
          forkl: 'Elev A deler opp oppgaven, bruker enheter, og svarer på det oppgaven spør om. Elev B og C har ulike svakheter: kjedede likhetstegn og feil prosentregning.' }
      ]
    },
    sjekkliste: ['Jeg har skrevet oppgavenummer.', 'Jeg har skrevet hva som er gitt, og hva jeg skal finne.', 'Jeg har skrevet regelen eller formelen jeg bruker.', 'Hvert steg står på en egen linje.', 'Likhetstegnene står under hverandre og stemmer.', 'Svaret har enhet.', 'Jeg har skrevet en svarsetning.', 'Jeg har sjekket at svaret er rimelig.']
  };

  const kommando = {
    ord: [
      { ikon: '🧮', ord: 'Regn ut', betyr: 'Finn svaret ved å regne.', ha: 'Utregning med mellomregning, og svar med enhet hvis det er en enhet.', oppg: 'Regn ut −8 + 5.', svakt: '−3', godt: '−8 + 5 = −3' },
      { ikon: '📝', ord: 'Vis at', betyr: 'Svaret er allerede oppgitt. Du skal vise at det stemmer.', ha: 'Hele veien fram, slik at leseren ser at det stemmer. Det holder ikke å skrive svaret.', oppg: 'Vis at x = 4 er løsningen til 2x + 3 = 11.', svakt: 'x = 4', godt: 'Setter x = 4 inn: 2 · 4 + 3 = 8 + 3 = 11. Venstre side er lik høyre side, så x = 4 er løsningen.' },
      { ikon: '💬', ord: 'Forklar', betyr: 'Fortell med egne ord hva du gjør, og hvorfor.', ha: 'Hele setninger, riktige matematiske ord og riktig rekkefølge.', oppg: 'Forklar hvordan du løser x + 7 = 15.', svakt: 'Du tar 7 fra 15.', godt: 'Jeg vil ha x alene. Derfor trekker jeg fra 7 på begge sider: x + 7 − 7 = 15 − 7. Da står det x = 8.' },
      { ikon: '🧠', ord: 'Begrunn', betyr: 'Si hvorfor noe er riktig.', ha: 'En påstand og en grunn: en regel, et tall eller en sammenheng. «Fordi» alene er ikke nok.', oppg: 'Begrunn at −2 er større enn −9.', svakt: 'Fordi det er det.', godt: '−2 ligger lenger til høyre på tallinja enn −9. Det er 2 under null, mens −9 er 9 under null, så −2 er nærmere null og dermed størst.' },
      { ikon: '⚖️', ord: 'Sammenlign', betyr: 'Finn likheter og forskjeller, ofte med tall.', ha: 'Begge tingene, med tall, og en konklusjon.', oppg: 'Sammenlign abonnement A (100 kr fast + 2 kr per GB) og B (60 kr fast + 5 kr per GB) for 10 GB.', svakt: 'B er best.', godt: 'A: 100 + 2 · 10 = 120 kr. B: 60 + 5 · 10 = 110 kr. For 10 GB er B 10 kr billigere.' },
      { ikon: '🔍', ord: 'Vurder', betyr: 'Ta stilling: er det rimelig, riktig eller best?', ha: 'En konklusjon, et argument og gjerne en sjekk med tall.', oppg: 'Vurder om 250 kr er et rimelig svar for 3 kg epler til 25 kr per kg.', svakt: 'Nei.', godt: 'Nei, det er ikke rimelig. 3 kg til 25 kr per kg er ca. 3 · 25 = 75 kr, så 250 kr er altfor mye.' },
      { ikon: '📈', ord: 'Tolk', betyr: 'Fortell hva tallene eller grafen betyr i situasjonen.', ha: 'Hva grafen viser, med tall og enheter, og hva det betyr.', oppg: 'Tolk grafen som viser temperaturen gjennom en dag.', svakt: 'Den går opp og ned.', godt: 'Temperaturen er −3 °C klokka 06 og stiger til 6 °C klokka 15. Etter det synker den igjen. Det betyr at det er varmest midt på ettermiddagen.' },
      { ikon: '🗣️', ord: 'Drøft', betyr: 'Se på flere sider av saken og konkluder.', ha: 'Argumenter for og mot, og en egen konklusjon.', oppg: 'Drøft: Er det alltid best å velge abonnementet med lavest fast pris?', svakt: 'Ja, billig er best.', godt: 'For: lav fast pris gir lave kostnader når du bruker lite. Mot: hvis prisen per GB er høy, blir det dyrt når du bruker mye. Konklusjon: Det kommer an på hvor mye du bruker. Regn ut begge for din bruk.' }
    ],
    oppg: {
      rolig: [
        { q: 'Oppgaven sier: «Regn ut: 3 kg epler til 25 kr per kg.» Hva må svaret ha med?', valg: [['Utregningen og svar med enhet, for eksempel 3 · 25 kr = 75 kr', 1], ['Bare ordet «ja»', 0, 'Oppgaven spør om et tall, ikke om ja eller nei.'], ['En lang forklaring uten tall', 0, '«Regn ut» betyr at du skal regne.']], forkl: '«Regn ut» betyr at du viser utregningen og svarer med enhet.' },
        { q: 'Oppgaven sier: «Vis at x = 4 er løsning på x + 3 = 7.» Hva må du gjøre?', valg: [['Sette 4 inn for x og vise at begge sider blir like', 1], ['Bare skrive x = 4', 0, 'Det står jo i oppgaven. Du skal vise at det stemmer.'], ['Løse en annen likning', 0, 'Du skal bruke likningen i oppgaven.']], forkl: '4 + 3 = 7. Venstre side er lik høyre side, så x = 4 er riktig.' },
        { q: 'Oppgaven sier: «Forklar hvordan du regnet.» Hva er best?', valg: [['Skrive med egne ord hva du gjorde og hvorfor, i hele setninger', 1], ['Skrive bare tallsvaret', 0, '«Forklar» ber om mer enn et tall.'], ['Gjette', 0, 'En forklaring må vise at du har tenkt.']], forkl: 'En forklaring sier hva du gjorde, og hvorfor du gjorde det.' }
      ],
      vanlig: [
        { q: 'Oppgaven sier: «Sammenlign prisene: 3 for 29 kr og 5 for 45 kr.» Hvilket svar er best?', valg: [['29 : 3 ≈ 9,67 kr per stykk. 45 : 5 = 9 kr per stykk. 5 for 45 kr er billigst per stykk.', 1], ['5 for 45 kr er billigst.', 0, 'Du sier hva, men viser ikke tallene du sammenligner.'], ['29 og 45.', 0, '«Sammenlign» betyr at du må si noe om forskjellen.']], forkl: '«Sammenlign» krever at du bruker tall fra begge, og at du konkluderer.' },
        { q: 'Oppgaven sier: «Tolk grafen.» Hva må svaret ha med?', valg: [['Hva grafen viser, med tall og enheter, og hva det betyr i situasjonen', 1], ['Bare at grafen går opp', 0, 'Det er for lite. Hva betyr det i situasjonen?'], ['Hvilken farge grafen har', 0, 'Fargen sier ikke noe om hva grafen betyr.']], forkl: '«Tolk» betyr å forklare hva tallene betyr i virkeligheten.' },
        { q: 'Hva er forskjellen på «Regn ut» og «Begrunn»?', valg: [['«Regn ut» krever en utregning. «Begrunn» krever en grunn: regel, tall eller sammenheng.', 1], ['Det er ingen forskjell.', 0, 'Les på nytt. De ber om ulike ting.'], ['«Begrunn» betyr at du skal skrive mye.', 0, 'Det handler ikke om lengde, men om å gi en grunn.']], forkl: 'Å regne ut er å finne svaret. Å begrunne er å si hvorfor det er riktig.' }
      ],
      utfordring: [
        { q: 'Oppgaven sier: «Vurder om svaret 250 kr er rimelig for 3 kg epler til 25 kr per kg.» Hvilket svar er best?', valg: [['Nei. 3 kg til 25 kr per kg er ca. 3 · 25 = 75 kr, så 250 kr er altfor mye.', 1], ['Nei.', 0, 'Du tar stilling, men begrunner ikke.'], ['3 · 25 = 75', 0, 'Du har regnet, men ikke tatt stilling til om 250 kr er rimelig.']], forkl: '«Vurder» krever en konklusjon og et argument, gjerne med en sjekk i tall.' },
        { q: 'Oppgaven sier: «Drøft: Er det alltid best å velge abonnementet med lavest fast pris?» Hva må du ha med?', valg: [['Argumenter for og mot, og en egen konklusjon', 1], ['Bare ja eller nei', 0, '«Drøft» ber om flere sider av saken.'], ['Bare én utregning', 0, 'En utregning kan være med, men den er ikke nok.']], forkl: 'Å drøfte er å veie argumenter mot hverandre og konkludere.' },
        { q: 'Hvilket kommandoord krever at svaret ditt både inneholder en utregning og en konklusjon?', valg: [['Sammenlign og vurder', 1], ['Regn ut', 0, '«Regn ut» krever en utregning, men ikke nødvendigvis en konklusjon.'], ['Tolk', 0, 'Å tolke handler om å forklare hva noe betyr.']], forkl: 'Når du skal sammenligne eller vurdere, regner du ofte først og konkluderer etterpå.' }
      ]
    }
  };

  const begrunn = {
    pastand: '−3 er større enn −7.',
    trapp: ['Fordi det er sånn.', 'Fordi −3 ligger til høyre for −7 på tallinja.', '−3 er større fordi tall lenger til høyre på tallinja er større. −3 ligger 3 under null, mens −7 ligger 7 under null. Altså er −3 nærmere null og dermed større enn −7.'],
    startere: ['Jeg mener at … fordi …', 'Det stemmer fordi regelen sier at …', 'Jeg kan vise det med tall: …', 'Det betyr at …', 'Derfor …', 'Hvis … så …', 'Et eksempel er …'],
    rangere: {
      rolig: [
        { pastand: 'Påstand: 8 er større enn 5.', svar: [['Fordi det er sånn.', 0, 'Det er en påstand, ikke en grunn.'], ['Fordi 8 ligger til høyre for 5 på tallinja.', 1], ['8 er større.', 0, 'Det sier bare det samme om igjen. Hvorfor er det slik?']], forkl: 'En begrunnelse sier hvorfor, med noe vi kan se eller sjekke, for eksempel tallinja.' },
        { pastand: 'Påstand: x = 4 er løsningen på 2x + 1 = 9.', svar: [['Fordi jeg regnet det ut.', 0, 'Vis hva du regnet.'], ['Fordi 2 · 4 + 1 = 8 + 1 = 9, og da blir begge sider like.', 1], ['Fordi 4 er et pent tall.', 0, 'Pene tall er ikke en grunn i matte.']], forkl: 'Den beste begrunnelsen setter tallet inn og viser at likningen stemmer.' }
      ],
      vanlig: [
        { pastand: 'Påstand: −5 + 8 er lik 3.', svar: [['Fordi 8 er større enn 5.', 0, 'Det er riktig, men det forklarer ikke hvorfor svaret er 3.'], ['Jeg starter i −5 på tallinja og går 8 til høyre. Da lander jeg på 3.', 1], ['Fordi kalkulatoren sa det.', 0, 'Da har du ikke forklart hvorfor.']], forkl: 'En god begrunnelse viser tankegangen, her ved hjelp av tallinja.' },
        { pastand: 'Påstand: 2³ er ikke det samme som 2 · 3.', svar: [['Fordi det er forskjellige tegn.', 0, 'Det sier ikke hva forskjellen er.'], ['2³ = 2 · 2 · 2 = 8, men 2 · 3 = 6. Tallene er ikke like.', 1], ['Fordi læreren sa det.', 0, 'Du må kunne vise det selv.']], forkl: 'Regn ut begge sidene, og sammenlign.' }
      ],
      utfordring: [
        { pastand: 'Påstand: Hvis du øker en pris med 20 % og så setter den ned 20 %, er prisen akkurat som før.', svar: [['Det stemmer, for +20 og −20 tar ut hverandre.', 0, 'Tenk på hva 20 % er av. Er det av samme tall begge ganger?'], ['Det stemmer ikke. Prøv med 100 kr: +20 % gir 120 kr. 20 % av 120 er 24, så prisen blir 96 kr, ikke 100 kr.', 1], ['Det stemmer ikke, fordi det er vanskelig.', 0, 'Vanskelig er ikke en begrunnelse.']], forkl: 'Det beste er et eksempel med tall som viser at påstanden ikke holder. Prosentene regnes av ulike tall.' },
        { pastand: 'Påstand: Likningen x + 3 = x + 5 har ingen løsning.', svar: [['Fordi x er et ukjent tall.', 0, 'Det forklarer ikke hvorfor det ikke finnes noen løsning.'], ['Hvis vi trekker fra x på begge sider, står det 3 = 5, og det er aldri sant.', 1], ['Fordi jeg ikke fant noen løsning.', 0, 'At du ikke fant en, betyr ikke at det ikke finnes. Hva viser at det aldri blir riktig?']], forkl: 'En begrunnelse som viser at noe aldri stemmer, bruker regning som gir en motsigelse, her 3 = 5.' }
      ]
    },
    skriv: {
      rolig: [
        { oppg: 'Begrunn at −2 er større enn −9.', svakt: 'Fordi det er det.', modell: '−2 er større enn −9 fordi −2 ligger lenger til høyre på tallinja. −2 er bare 2 under null, mens −9 er 9 under null.', merk: 'Har du med både regelen (til høyre er større) og tallene (2 og 9 under null)?' },
        { oppg: 'Begrunn at 3 · 4 er det samme som 4 · 3.', svakt: 'Fordi man kan bytte.', modell: '3 · 4 betyr 4 + 4 + 4 = 12, og 4 · 3 betyr 3 + 3 + 3 + 3 = 12. Rekkefølgen endrer ikke svaret, så de er like.', merk: 'Et eksempel med tall gjør begrunnelsen konkret.' }
      ],
      vanlig: [
        { oppg: 'Begrunn at x = 6 er løsningen på 3x − 4 = 14.', svakt: 'Det stemmer.', modell: 'Jeg setter x = 6 inn i likningen: 3 · 6 − 4 = 18 − 4 = 14. Venstre side er lik høyre side, så x = 6 er løsningen.', merk: 'Har du satt inn tallet og vist at begge sider blir like?' },
        { oppg: 'En klassekamerat sier at 2 · 5² er 100. Begrunn om det stemmer.', svakt: 'Nei.', modell: 'Det stemmer ikke. Potensen regnes først: 5² = 25. Så ganger vi med 2: 2 · 25 = 50. Svaret er 50, ikke 100. 100 får du hvis du regner (2 · 5)².', merk: 'Har du sagt hva som er riktig, og hva klassekameraten kan ha gjort?' }
      ],
      utfordring: [
        { oppg: 'Begrunn at mobilabonnement A (100 kr fast + 2 kr per GB) er billigere enn B (60 kr fast + 5 kr per GB) hvis du bruker 20 GB.', svakt: 'Fordi A er billigere.', modell: 'A: 100 + 2 · 20 = 140 kr. B: 60 + 5 · 20 = 160 kr. A er 20 kr billigere ved 20 GB, fordi B har en høyere pris per GB som veier opp for den lave faste prisen.', merk: 'Har du regnet for begge og forklart hvorfor det ble slik?' },
        { oppg: 'Begrunn om følgende stemmer: «Hvis du dobler sidene i et kvadrat, dobles arealet.»', svakt: 'Nei, det stemmer ikke.', modell: 'Det stemmer ikke. Et kvadrat med side 3 cm har areal 9 cm². Dobler vi siden til 6 cm, blir arealet 36 cm². Det er 4 ganger så mye, ikke 2.', merk: 'Et godt moteksempel med tall er den sterkeste måten å vise at noe ikke stemmer.' }
      ]
    },
    sjekk: ['Jeg har sagt hva jeg mener.', 'Jeg har brukt tall eller et eksempel.', 'Jeg har brukt en regel eller et matematisk begrep.', 'Jeg har brukt ord som «fordi», «derfor» eller «siden».', 'En klassekamerat kan forstå sammenhengen.']
  };

  const diskusjon = {
    pastander: {
      rolig: [
        { pastand: 'Et negativt tall er alltid mindre enn et positivt tall.', for: 'Enig. Alle negative tall ligger til venstre for null på tallinja, og alle positive tall ligger til høyre. Ting til venstre er mindre. For eksempel er −100 mindre enn 1.', mot: 'Uenig. −100 er et stort tall, jo. Det er bare at det er stort i minus-retning. Men «stort» og «større enn» er ikke det samme.', forkl: 'Påstanden stemmer. Negative tall er alltid mindre enn positive tall. Men et negativt tall som −100 er «langt fra null», selv om det er lite.' },
        { pastand: 'Hvis du legger til 5 på den ene siden av en likning, må du legge til 5 på den andre siden også.', for: 'Enig. En likning er som en vekt i balanse. Legger jeg noe på den ene siden, må jeg legge like mye på den andre, ellers tipper vekta.', mot: 'Hvorfor kan jeg ikke bare legge til der jeg trenger det? Det er jo bare tall.', forkl: 'Påstanden stemmer. Likhetstegnet sier at begge sider er like mye verdt. Hvis du bare gjør noe på den ene siden, blir de ikke lenger like.' }
      ],
      vanlig: [
        { pastand: 'Potensen 2³ er det samme som 2 · 3.', for: 'Enig. Begge har 2 og 3 i seg, så det må bli det samme.', mot: 'Uenig. 2³ betyr 2 · 2 · 2 = 8, mens 2 · 3 = 6. Det er ikke det samme.', forkl: 'Påstanden stemmer ikke. 2³ = 8 og 2 · 3 = 6. Et tall i potens (eksponent) sier hvor mange ganger du ganger tallet med seg selv.' },
        { pastand: 'En graf som starter på 50 gir et riktig bilde av forskjellen mellom søylene.', for: 'Enig. Tallene stemmer jo, det er bare aksen som er kuttet.', mot: 'Uenig. Når aksen ikke starter på null, ser små forskjeller store ut. 56 ser ut som tre ganger 52, men er bare litt mer.', forkl: 'Tallene kan stemme, men bildet er misvisende. Små forskjeller ser store ut når aksen ikke starter på null. Se alltid på hvor aksen starter.' }
      ],
      utfordring: [
        { pastand: 'Når du ganger et tall med seg selv, blir svaret alltid større enn tallet.', for: 'Enig. 3 · 3 = 9, og 9 er større enn 3. 5 · 5 = 25.', mot: 'Uenig. Prøv 1 · 1 = 1, som ikke er større enn 1. Og 0,5 · 0,5 = 0,25, som er mindre enn 0,5. Så det gjelder ikke alltid.', forkl: 'Påstanden stemmer ikke alltid. Den gjelder tall større enn 1. For 0, 1 og tall mellom 0 og 1 gjelder den ikke. Ett moteksempel er nok til å vise at «alltid» ikke stemmer.' },
        { pastand: 'Hvis du dobler sidene i et kvadrat, dobles arealet.', for: 'Enig. Sidene dobles, så arealet må også dobles.', mot: 'Uenig. Side 3 gir areal 9. Side 6 gir areal 36. Det er 4 ganger så mye.', forkl: 'Påstanden stemmer ikke. Areal er side · side. Dobler du siden, blir arealet 2 · 2 = 4 ganger så stort.' }
      ]
    },
    hvem: {
      rolig: [
        { q: 'Hva er −3 + 5?', a: { navn: 'Mia', tekst: '«−8, for 3 + 5 = 8 og det er minus.»' }, b: { navn: 'Jonas', tekst: '«2. Jeg starter i −3 på tallinja og går 5 til høyre.»' }, fasit: 'b', hintA: 'Mia legger sammen som om begge tallene var negative. Men 5 er positivt.', forkl: 'Jonas har rett: −3 + 5 = 2. Mia glemte at +5 er positivt og går til høyre på tallinja.' }
      ],
      vanlig: [
        { q: 'Tre kaker og en brus koster til sammen 100 kr. Brusen koster 25 kr. Hva koster én kake?', a: { navn: 'Sara', tekst: '«100 − 25 = 75, så kaken koster 75 kr.»' }, b: { navn: 'Amir', tekst: '«(100 − 25) : 3 = 25, så hver kake koster 25 kr.»' }, fasit: 'b', hintA: 'Sara fant ut hva alle tre kakene koster. Oppgaven spør om én kake.', forkl: 'Amir har rett. 100 − 25 = 75 kr er prisen på alle tre kakene. Del på 3: 25 kr per kake.' }
      ],
      utfordring: [
        { q: 'Prisen på en jakke settes først ned 20 %, og så opp 20 %. Er prisen som før?', a: { navn: 'Emma', tekst: '«Ja. −20 % og +20 % tar ut hverandre.»' }, b: { navn: 'Noah', tekst: '«Nei. 20 % av en lavere pris er mindre, så jakka blir billigere enn før.»' }, fasit: 'b', hintA: 'Prøv med 1000 kr. Hva er prisen etter nedsettelsen, og hva er 20 % av den?', forkl: 'Noah har rett. 1000 kr − 20 % = 800 kr. 800 kr + 20 % = 960 kr. Prisen er 40 kr lavere enn før, fordi 20 % regnes av ulike tall.' },
        { q: 'Likningen x + 3 = x + 5. Hva er x?', a: { navn: 'Lina', tekst: '«x = 2, for 5 − 3 = 2.»' }, b: { navn: 'Omar', tekst: '«Det finnes ingen løsning. Trekker vi fra x på begge sider, står det 3 = 5.»' }, fasit: 'b', hintA: 'Prøv x = 2 i likningen. Er 2 + 3 lik 2 + 5?', forkl: 'Omar har rett. Setter vi inn x = 2, får vi 5 = 7, og det stemmer ikke. Likningen har ingen løsning.' }
      ]
    },
    sparring: ['Hvorfor?', 'Hvordan vet du det?', 'Gjelder det alltid?', 'Kan du vise det med et eksempel?', 'Hva hvis tallene var andre?']
  };

  M.les.reg(8, { tekst: tekst, graf: graf, foring: foring, kommando: kommando, begrunn: begrunn, diskusjon: diskusjon });
})();
