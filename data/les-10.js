/* ============================================================
   Les, tolk og begrunn – innhold for 10. trinn
   Tema: algebra og kvadratsetninger, likningssett, lineære funksjoner, funksjonstyper,
   vekstfaktor, sparing og lån.
   Markering: [[t|tall og enheter]] [[s|det oppgaven spør om]] [[u|unødvendig info]]
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;

  const tekst = {
    rolig: [
      { tittel: 'Treningsstudio', tekst: 'Et treningsstudio koster [[t|300 kr]] i innmelding og [[t|250 kr]] per måned. [[u|Studioet har basseng.]] [[s|Hva koster det totalt etter 6 måneder?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['300 + 250 · 6', 1], ['(300 + 250) · 6', 0, 'Innmeldingen betaler du bare én gang, ikke hver måned.'], ['250 · 6', 0, 'Da har du glemt innmeldingen på 300 kr.'], ['300 · 6 + 250', 0, 'Du har byttet om: 250 kr er prisen per måned, og 300 kr betales bare én gang.']], forkl: '250 · 6 = 1500 kr. Med innmeldingen blir det 300 + 1500 = 1800 kr.' } },
      { tittel: 'Prisøkning', tekst: 'En vare koster [[t|500 kr]]. Prisen øker med [[t|10 %]]. [[u|Varen er produsert i Italia.]] [[s|Hva er den nye prisen?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['500 · 1,10', 1], ['500 + 10', 0, '10 % er ikke 10 kr. 10 % av 500 kr er 50 kr.'], ['500 · 0,10', 0, 'Det er bare økningen (50 kr), ikke den nye prisen.'], ['500 · 0,90', 0, 'Prisen øker, så vekstfaktoren må være større enn 1.']], forkl: 'Vekstfaktoren for 10 % økning er 1,10. 500 · 1,10 = 550. Ny pris er 550 kr.' } },
      { tittel: 'To tall', tekst: 'To tall har summen [[t|10]] og differansen [[t|2]]. [[u|Anna og Per har tenkt på hvert sitt tall.]] [[s|Hva er de to tallene?]]',
        spm: { q: 'Hvilket likningssett passer? La de to tallene være x og y.', valg: [['x + y = 10 og x − y = 2', 1], ['x · y = 10 og x − y = 2', 0, 'Summen betyr at du legger sammen, ikke ganger.'], ['x + y = 2 og x − y = 10', 0, 'Du har byttet: summen er 10 og differansen er 2.'], ['x + y = 10 og x + y = 2', 0, 'Da sier du at samme sum er både 10 og 2. Det går ikke.']], forkl: 'Legger vi likningene sammen, får vi 2x = 12, så x = 6. Da er y = 4. De to tallene er 6 og 4.' } }
    ],
    vanlig: [
      { tittel: 'Sparing', tekst: 'Du setter [[t|20 000 kr]] i banken med [[t|4 %]] rente per år. [[u|Banken har røde kontorer.]] [[s|Hvor mye har du etter 3 år?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['20 000 · 1,04³', 1], ['20 000 · 1,04 · 3', 0, 'Renten legges til beløpet, så neste år regnes renten av et større beløp. Da må du bruke potens, ikke gange med 3.'], ['20 000 + 0,04 · 3', 0, 'Du har ikke regnet prosenten av beløpet.'], ['20 000 · 0,04³', 0, 'Det blir et lite tall. Vekstfaktoren er 1,04, ikke 0,04.']], forkl: '20 000 · 1,04³ = 20 000 · 1,124864 ≈ 22 497 kr.' } },
      { tittel: 'Rett linje', mangler: true, instr: 'Marker det du har, og avgjør så om oppgaven kan løses slik den står.', tekst: 'En rett linje går gjennom punktet [[t|(0, 3)]]. [[s|Hva er funksjonsuttrykket?]]',
        spm: { q: 'Kan oppgaven løses slik den står?', valg: [['Nei. Vi må kjenne stigningstallet eller et punkt til.', 1], ['Ja. y = 3x.', 0, 'Hvor kommer stigningstallet 3 fra? Det står ikke i teksten.'], ['Ja. y = 3.', 0, 'Det er en vannrett linje, men oppgaven sier ikke at linja er vannrett.']], forkl: 'Mange ulike rette linjer går gjennom (0, 3). Vi trenger et stigningstall eller et nytt punkt.' } },
      { tittel: 'Taxi', tekst: 'En taxi tar [[t|60 kr]] i startpris. Etter [[t|10 km]] koster turen [[t|240 kr]]. [[u|Taxien er svart.]] [[s|Hva koster det per kilometer?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['(240 − 60) : 10', 1], ['240 : 10', 0, 'Da regner du startprisen med i prisen per kilometer.'], ['60 : 10', 0, 'Startprisen er ikke prisen per kilometer.'], ['(240 + 60) : 10', 0, 'Startprisen er allerede med i 240 kr. Du skal trekke den fra.']], forkl: 'Selve kjøringen koster 240 − 60 = 180 kr. 180 : 10 = 18 kr per km.' } }
    ],
    utfordring: [
      { tittel: 'Bakterier', tekst: 'Antallet bakterier blir [[t|dobbelt så stort]] hver [[t|time]]. Det er [[t|100 bakterier]] ved start. [[u|Laboratoriet har 12 ansatte.]] [[s|Hvor mange bakterier er det etter 5 timer?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['100 · 2⁵', 1], ['100 · 2 · 5', 0, 'Dobling hver time er gjentatt gange med 2: 2 · 2 · 2 · 2 · 2, ikke 2 · 5.'], ['100 + 2 · 5', 0, 'Det gir en jevn økning på 2 per time, og ikke en dobling.'], ['100 · 5²', 0, 'Du har byttet grunntall og eksponent. Faktoren er 2, og den gjentas 5 ganger.']], forkl: '2⁵ = 32. 100 · 32 = 3200 bakterier.' } },
      { tittel: 'Kafé', tekst: 'På en kafé koster [[t|2 kaffe og 1 kake]] [[t|90 kr]], og [[t|1 kaffe og 2 kaker]] koster [[t|105 kr]]. [[u|Kafeen ligger i Bergen.]] [[s|Hva koster én kaffe, og hva koster én kake?]]',
        spm: { q: 'Hvilket likningssett passer? La x være prisen på en kaffe og y prisen på en kake.', valg: [['2x + y = 90 og x + 2y = 105', 1], ['2x + y = 105 og x + 2y = 90', 0, 'Du har byttet prisene. 2 kaffe og 1 kake koster 90 kr.'], ['x + y = 90 og x + y = 105', 0, 'Da har du glemt at det er flere av hver. Hva betyr «2 kaffe»?'], ['2x + 2y = 195', 0, 'Det er bare én likning. Du trenger to for å finne to ukjente.']], forkl: 'Løser du likningssettet, får du x = 25 og y = 40. En kaffe koster 25 kr og en kake koster 40 kr.' } },
      { tittel: 'Lån', tekst: 'Du låner [[t|50 000 kr]] og betaler tilbake [[t|60 000 kr]] etter [[t|2 år]]. [[u|Banken åpnet i 1998.]] [[s|Hvor mange prosent har lånet økt totalt?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['(60 000 − 50 000) : 50 000', 1], ['10 000 : 60 000', 0, 'Prosentøkning regnes alltid av det du startet med, altså 50 000.'], ['60 000 : 50 000', 0, 'Det gir vekstfaktoren 1,2, ikke prosenten. Økningen er 1,2 − 1 = 0,2.'], ['20 000 : 50 000', 0, 'Hvor kommer 20 000 fra? Økningen er 60 000 − 50 000.']], forkl: 'Økningen er 10 000 kr. 10 000 : 50 000 = 0,20, altså 20 %.' } },
      { tittel: 'Lineær funksjon', mangler: true, instr: 'Marker det du har, og avgjør så om oppgaven kan løses slik den står.', tekst: 'Funksjonen f er lineær, og [[t|f(2) = 7]]. [[s|Hva er f(10)?]]',
        spm: { q: 'Kan oppgaven løses slik den står?', valg: [['Nei. Vi må kjenne stigningstallet eller et punkt til.', 1], ['Ja. f(10) = 35.', 0, 'Det ville gjeldt hvis funksjonen gikk gjennom (0, 0), men det vet vi ikke.'], ['Ja. f(10) = 7.', 0, 'Det ville gjeldt hvis funksjonen var konstant, men det vet vi ikke.']], forkl: 'Mange lineære funksjoner har f(2) = 7, men de har ulike verdier for f(10). Vi trenger mer informasjon.' } }
    ]
  };

  const graf = {
    rolig: [
      { tittel: 'Taxipris', tekst: 'Grafen viser hva en taxitur koster, avhengig av hvor langt du kjører.',
        graf: { type: 'linje', tittel: 'Pris for taxitur', xTittel: 'Kjørt strekning (km)', yTittel: 'Pris (kr)', kat: ['0', '2', '4', '6', '8'], verdier: [50, 90, 130, 170, 210], yMin: 0, yMax: 250, steg: 50 },
        oppg: [
          { t: 'klikk', q: 'Trykk på aksetittelen som forteller hva y-aksen viser.', mål: 'yakse', forkl: 'Y-aksen viser pris i kroner.', hint: 'Y-aksen er den loddrette. Se etter teksten ved siden av den.' },
          { q: 'Hva er startprisen (prisen før du har kjørt noen kilometer)?', valg: [['50 kr', 1], ['0 kr', 0, 'Se på punktet der x = 0. Hvor høyt oppe er det?'], ['250 kr', 0, 'Det er det høyeste tallet på aksen, ikke startprisen.']], forkl: 'Ved 0 km er prisen 50 kr. Det er startprisen.' },
          { q: 'Hva koster en tur på 4 km?', valg: [['130 kr', 1], ['90 kr', 0, 'Det er prisen for 2 km.'], ['170 kr', 0, 'Det er prisen for 6 km.']], forkl: 'Punktet for 4 km ligger på 130 kr.' },
          { q: 'Hvor mye øker prisen for hver ekstra kilometer?', valg: [['20 kr', 1], ['40 kr', 0, 'Det er økningen for 2 km. Hvor mye er det per km?'], ['50 kr', 0, 'Det er startprisen.']], forkl: 'For hver 2 km øker prisen med 40 kr. Per km er det 40 : 2 = 20 kr. Det er stigningstallet.' }
        ] },
      { tittel: 'Bakterier', tekst: 'Grafen viser antall bakterier i en prøve etter hver time.',
        graf: { type: 'linje', tittel: 'Antall bakterier', xTittel: 'Tid (timer)', yTittel: 'Antall bakterier', kat: ['0', '1', '2', '3', '4'], verdier: [100, 200, 400, 800, 1600], yMin: 0, yMax: 1600, steg: 400 },
        oppg: [
          { t: 'klikk', q: 'Trykk på punktet med flest bakterier.', mål: 'topp', forkl: 'Etter 4 timer er det flest: 1600.', hint: 'Flest er høyest oppe.' },
          { q: 'Hvor mange bakterier er det etter 3 timer?', valg: [['800', 1], ['400', 0, 'Det er etter 2 timer.'], ['1600', 0, 'Det er etter 4 timer.']], forkl: 'Punktet for 3 timer ligger på 800.' },
          { q: 'Hva skjer med antallet for hver time?', valg: [['Det dobles', 1], ['Det øker med 100', 0, 'Se på tallene: 100, 200, 400, 800. Øker det med like mye hver gang?'], ['Det er det samme hele tiden', 0, 'Grafen stiger, så antallet endrer seg.']], forkl: '100, 200, 400, 800, 1600. Hver gang ganger vi med 2. Det er eksponentiell vekst.' }
        ] }
    ],
    vanlig: [
      { tittel: 'Nedbetaling av lån', tekst: 'Grafen viser hvor mye du skylder banken ved starten av hvert år.',
        graf: { type: 'linje', tittel: 'Restgjeld på lån', xTittel: 'År', yTittel: 'Restgjeld (tusen kr)', kat: ['0', '1', '2', '3', '4', '5'], verdier: [50, 40, 30, 20, 10, 0], yMin: 0, yMax: 50, steg: 10 },
        oppg: [
          { t: 'klikk', q: 'Trykk på det som forteller hva y-aksen måler, og i hvilken enhet.', mål: 'yakse', forkl: 'Y-aksen viser restgjeld i tusen kroner.', hint: 'Se etter teksten ved siden av y-aksen.' },
          { q: 'Hvor mye er nedbetalt per år?', valg: [['10 000 kr', 1], ['10 kr', 0, 'Enheten er tusen kr. Hvor mye er det i kroner?'], ['50 000 kr', 0, 'Det er hele lånet.']], forkl: 'Restgjelden synker med 10 (tusen kr) hvert år, altså 10 000 kr.' },
          { q: 'Hva er restgjelden etter 3 år?', valg: [['20 000 kr', 1], ['30 000 kr', 0, 'Det er etter 2 år.'], ['3 000 kr', 0, 'Se på y-aksen igjen: enheten er tusen kr.']], forkl: 'Punktet for 3 år ligger på 20, altså 20 000 kr.' },
          { q: 'Hvilket funksjonsuttrykk passer? (y = restgjeld i tusen kr, x = år)', valg: [['y = 50 − 10x', 1], ['y = 50 + 10x', 0, 'Restgjelden synker, så stigningstallet må være negativt.'], ['y = 10x', 0, 'Da starter y på 0, men gjelden starter på 50.']], forkl: 'Start: 50. Hvert år synker verdien med 10. Da er y = 50 − 10x.' }
        ] },
      { tittel: 'Aksjekurs', tekst: 'En nettavis skriver: «Aksjen har steget kraftig denne uken!» De viser denne grafen.',
        graf: { type: 'linje', tittel: 'Aksjekurs (kr)', xTittel: 'Ukedag', yTittel: 'Kurs (kr)', kat: ['Man', 'Tir', 'Ons', 'Tor', 'Fre'], verdier: [100, 101, 102, 101, 103], yMin: 99, yMax: 104, steg: 1 },
        oppg: [
          { t: 'klikk', q: 'Trykk på tallet der y-aksen starter.', mål: 'start', forkl: 'Y-aksen starter på 99.', hint: 'Se på det nederste tallet på y-aksen.' },
          { q: 'Hvor mange prosent har kursen steget fra mandag til fredag?', valg: [['3 %', 1], ['103 %', 0, '103 er kursen på fredag, ikke prosentøkningen.'], ['300 %', 0, 'Det er det grafen gir inntrykk av. Regn ut 3 : 100.']], forkl: 'Økning: 103 − 100 = 3 kr. 3 : 100 = 0,03 = 3 %. Det er ikke «kraftig», men grafen får det til å se sånn ut.' }
        ] }
    ],
    utfordring: [
      { tittel: 'Ballen', tekst: 'Grafen viser høyden til en ball som kastes rett opp.',
        graf: { type: 'linje', tittel: 'Høyden til ballen', xTittel: 'Tid (sekunder)', yTittel: 'Høyde (meter)', kat: ['0', '1', '2', '3', '4'], verdier: [0, 15, 20, 15, 0], yMin: 0, yMax: 20, steg: 5 },
        oppg: [
          { t: 'klikk', q: 'Trykk på ballens høyeste punkt.', mål: 'topp', forkl: 'Ballen er høyest etter 2 sekunder: 20 meter.', hint: 'Høyest er det punktet som ligger lengst opp.' },
          { q: 'Etter hvor mange sekunder treffer ballen bakken igjen?', valg: [['4 sekunder', 1], ['2 sekunder', 0, 'Da er ballen på det høyeste. Når er høyden 0 igjen?'], ['20 sekunder', 0, 'Det er høyden, ikke tiden.']], forkl: 'Ved 4 sekunder er høyden 0 meter igjen.' },
          { q: 'Er dette en lineær funksjon?', valg: [['Nei. Endringen per sekund er ikke den samme (15, 5, −5, −15).', 1], ['Ja. Grafen går opp og ned.', 0, 'En lineær funksjon er en rett linje. Går denne grafen rett?'], ['Ja. Den har tall i tabell.', 0, 'Det er ikke det som avgjør. Se på hvor mye y endrer seg for hver gang x øker med 1.']], forkl: 'Stigningen er 15, 5, −5, −15. For en lineær funksjon skulle den vært lik hele tiden. Dette er en annen funksjonstype (kvadratisk).' }
        ] },
      { tittel: 'Sparing over tid', tekst: 'Grafen viser hvordan en sparekonto vokser når renten legges til hvert år.',
        graf: { type: 'linje', tittel: 'Sparebeløp', xTittel: 'År', yTittel: 'Beløp (tusen kr)', kat: ['0', '5', '10', '15', '20'], verdier: [10, 12, 15, 18, 22], yMin: 0, yMax: 24, steg: 4 },
        oppg: [
          { q: 'Hvor mye økte beløpet de første 10 årene (ca.)?', valg: [['Ca. 5 000 kr', 1], ['Ca. 15 000 kr', 0, 'Det er beløpet etter 10 år. Hvor mye har det økt fra starten?'], ['Ca. 10 000 kr', 0, 'Det er startbeløpet.']], forkl: 'Fra 10 til 15 tusen er en økning på ca. 5 tusen kr.' },
          { q: 'Hvor mye økte beløpet de siste 10 årene (fra år 10 til år 20, ca.)?', valg: [['Ca. 7 000 kr', 1], ['Ca. 5 000 kr', 0, 'Det var økningen de første 10 årene.'], ['Ca. 22 000 kr', 0, 'Det er beløpet etter 20 år.']], forkl: 'Fra 15 til 22 tusen er økningen ca. 7 tusen kr.' },
          { q: 'Hvorfor øker beløpet mer de siste 10 årene enn de første 10?', valg: [['Renten regnes av et større beløp (rentes rente).', 1], ['Fordi renten blir høyere.', 0, 'Renten er den samme hver år i denne modellen.'], ['Fordi grafen er laget feil.', 0, 'Grafen er riktig. Hva skjer med renten når beløpet blir større?']], forkl: 'Hvert år legges renten til beløpet. Neste år regnes renten av et større beløp, og økningen blir større. Det er eksponentiell vekst.' }
        ] }
    ]
  };

  const foring = {
    mal: [
      { navn: 'Oppgavenummer', hva: 'Skriv hvilken oppgave det er.', eks: 'Oppgave 5c' },
      { navn: 'Definer variabler', hva: 'Si hva x og y står for, med enhet.', eks: 'La x = antall måneder\nLa y = totalpris i kr' },
      { navn: 'Sett opp', hva: 'Skriv uttrykket, funksjonen eller likningen.', eks: 'y = 300 + 250x' },
      { navn: 'Utregning', hva: 'Ett steg per linje. Likhetstegnene står under hverandre.', eks: 'x = 6:\ny = 300 + 250 · 6\n  = 300 + 1500\n  = 1800' },
      { navn: 'Svarsetning', hva: 'Si hva svaret betyr i situasjonen, med enhet.', eks: 'Svar: Etter 6 måneder har du betalt 1800 kr.' },
      { navn: 'Sjekk', hva: 'Sjekk svaret i teksten: passer det til situasjonen?', eks: 'Sjekk: 6 · 250 = 1500, pluss 300 gir 1800 ✓' }
    ],
    regler: [
      '**Definer variablene.** Skriv «La x = …», så vet leseren hva x betyr.',
      '**Ett steg per linje,** og likhetstegn under hverandre. Skriv aldri flere ulike regnestykker på én linje.',
      '**Prosent betyr vekstfaktor.** Skriv vekstfaktoren: 1,10 for +10 % og 0,90 for −10 %.',
      '**Svar i hele setninger, med enhet,** og si hva svaret betyr i situasjonen.',
      '**Sjekk svaret i teksten,** ikke bare i likningen. Passer det til historien?'
    ],
    sammenlign: {
      rolig: [
        { oppg: 'En vare koster 500 kr. Prisen øker med 10 %. Hva er den nye prisen?', darlig: ['500 + 10 = 510'], feil: ['10 % er ikke 10 kr. 10 % av 500 kr er 50 kr.', 'Ingen vekstfaktor eller utregning av prosenten.', 'Ingen enhet og ingen svarsetning.'],
          bra: ['Vekstfaktor for 10 % økning: 1,10', 'Ny pris = 500 kr · 1,10', '         = 550 kr', 'Sjekk: 10 % av 500 er 50, og 500 + 50 = 550 ✓', 'Svar: Ny pris er 550 kr.'] }
      ],
      vanlig: [
        { oppg: 'Løs likningssettet x + y = 10 og x − y = 2.', darlig: ['x = 6 og y = 4'], feil: ['Svaret stemmer, men man ser ikke hvordan du kom frem til det.', 'Ingen metode (innsetting eller addisjon) er vist.', 'Ingen sjekk. Stemmer begge likningene?'],
          bra: ['(1) x + y = 10', '(2) x − y = 2', 'Legger sammen (1) og (2):', '2x = 12', 'x = 6', 'Setter inn i (1): 6 + y = 10, så y = 4', 'Sjekk (2): 6 − 4 = 2 ✓', 'Svar: x = 6 og y = 4'] }
      ],
      utfordring: [
        { oppg: 'Du setter 20 000 kr i banken med 4 % rente per år. Hvor mye har du etter 3 år?', darlig: ['20 000 · 0,04 · 3 = 2400 kr'], feil: ['2400 kr er renten uten rentes rente, ikke saldoen. Oppgaven spør om hvor mye du har.', 'Ingen vekstfaktor. Renten regnes av et større beløp hvert år.', 'Ingen svarsetning, som ville avslørt misforståelsen.'],
          bra: ['Vekstfaktor = 1,04', 'Saldo = 20 000 · 1,04³', '      = 20 000 · 1,124864', '      ≈ 22 497 kr', 'Sjekk: 3 år med ca. 4 % gir ca. 12 % økning, 20 000 · 1,12 ≈ 22 400 ✓', 'Svar: Etter 3 år har du ca. 22 497 kr.'] },
        { oppg: 'Finn funksjonsuttrykket til linja gjennom punktene (0, 2) og (3, 8).', darlig: ['8 − 2 = 6 : 3 = 2 y = 2x + 2'], feil: ['Her står det at 8 − 2 er lik 2, og det er galt. Hver utregning må ha sin egen linje.', 'Ingen formel for stigningstall.', 'Ingen sjekk og ingen svarsetning.'],
          bra: ['Stigningstall a = (y₂ − y₁) : (x₂ − x₁)', 'a = (8 − 2) : (3 − 0)', 'a = 6 : 3 = 2', 'Skjæring med y-aksen: b = 2 (punktet (0, 2))', 'y = 2x + 2', 'Sjekk: x = 3 gir y = 2 · 3 + 2 = 8 ✓', 'Svar: Funksjonsuttrykket er y = 2x + 2.'] }
      ]
    },
    rekke: {
      rolig: [
        { tittel: 'Treningsstudio', oppg: 'Et studio koster 300 kr i innmelding og 250 kr per måned. Hva koster 6 måneder?', linjer: ['La x = antall måneder, y = pris i kr', 'y = 300 + 250x', 'x = 6:', 'y = 300 + 250 · 6', '  = 300 + 1500', '  = 1800', 'Svar: Etter 6 måneder har du betalt 1800 kr.'], hint: 'Først sier du hva x og y er. Så setter du opp uttrykket. Så regner du.' }
      ],
      vanlig: [
        { tittel: 'Likningssett', oppg: 'Løs likningssettet x + y = 10 og x − y = 2.', linjer: ['(1) x + y = 10', '(2) x − y = 2', 'Legger sammen (1) og (2):', '2x = 12', 'x = 6', 'Setter inn i (1): 6 + y = 10, så y = 4', 'Sjekk (2): 6 − 4 = 2 ✓', 'Svar: x = 6 og y = 4'], hint: 'Først setter du opp likningene. Så velger du en metode. Til slutt sjekker du.' },
        { tittel: 'Prisøkning', oppg: 'En vare koster 500 kr. Prisen øker med 10 %. Hva er den nye prisen?', linjer: ['Vekstfaktor for 10 % økning: 1,10', 'Ny pris = 500 kr · 1,10', '         = 550 kr', 'Sjekk: 10 % av 500 er 50, og 500 + 50 = 550 ✓', 'Svar: Ny pris er 550 kr.'], hint: 'Først finner du vekstfaktoren. Så ganger du.' }
      ],
      utfordring: [
        { tittel: 'Sparing', oppg: 'Du setter 20 000 kr i banken med 4 % rente per år. Hvor mye har du etter 3 år?', linjer: ['Vekstfaktor = 1,04', 'Saldo = 20 000 · 1,04³', '      = 20 000 · 1,124864', '      ≈ 22 497 kr', 'Sjekk: 3 år med ca. 4 % gir ca. 12 % økning, 20 000 · 1,12 ≈ 22 400 ✓', 'Svar: Etter 3 år har du ca. 22 497 kr.'], hint: 'Vekstfaktor først. Så potens. Så svaret.' },
        { tittel: 'Kafé', oppg: '2 kaffe og 1 kake koster 90 kr. 1 kaffe og 2 kaker koster 105 kr. Finn prisen på kaffe og kake.', linjer: ['La x = pris på kaffe, y = pris på kake (kr)', '(1) 2x + y = 90', '(2) x + 2y = 105', 'Fra (1): y = 90 − 2x', 'Setter inn i (2): x + 2(90 − 2x) = 105', 'x + 180 − 4x = 105', '−3x = −75', 'x = 25', 'y = 90 − 2 · 25 = 40', 'Sjekk (2): 25 + 2 · 40 = 105 ✓', 'Svar: Kaffe koster 25 kr og kake koster 40 kr.'], hint: 'Definer variablene, sett opp to likninger, løs den ene for y, sett inn i den andre.' }
      ]
    },
    vurder: {
      rolig: [
        { tittel: 'Prisnedsettelse', oppg: 'En vare koster 800 kr. Den settes ned 25 %. Hva er den nye prisen?', spm: 'Hvilken elev har den beste føringen?',
          svar: [{ tekst: 'Vekstfaktor = 1 − 0,25 = 0,75\nNy pris = 800 kr · 0,75\n         = 600 kr\nSvar: Ny pris er 600 kr.', best: true, kom: '' },
            { tekst: '800 − 25 = 775', best: false, kom: '25 % er ikke 25 kr. 25 % av 800 kr er 200 kr.' },
            { tekst: '600', best: false, kom: 'Svaret stemmer, men det står ingen utregning, ingen enhet og ingen svarsetning.' }],
          forkl: 'Elev A bruker vekstfaktor og viser hvert steg, med enhet og svarsetning.' }
      ],
      vanlig: [
        { tittel: 'Likning', oppg: 'Løs likningen 3x + 2 = 5x − 6.', spm: 'Hvilken elev har den beste føringen?',
          svar: [{ tekst: '3x + 2 = 5x − 6\n3x − 5x = −6 − 2\n−2x = −8\nx = 4\nSjekk: 3 · 4 + 2 = 14 og 5 · 4 − 6 = 14 ✓\nSvar: x = 4', best: true, kom: '' },
            { tekst: 'x = 4', best: false, kom: 'Riktig svar, men uten utregning. På en prøve får du ikke full uttelling for bare et tall.' },
            { tekst: '3x + 2 = 5x − 6 = 8 = 2x = 4', best: false, kom: 'Alt står på én linje, og likhetstegnene sier noe galt: for eksempel at 5x − 6 er lik 8.' }],
          forkl: 'Elev A viser hvert steg og sjekker svaret ved å sette inn i begge sider.' }
      ],
      utfordring: [
        { tittel: 'Lån', oppg: 'Du har et lån på 50 000 kr med 6 % rente per år, og betaler ikke ned noe de første to årene. Hva skylder du etter 2 år?', spm: 'Hvilken elev har den beste føringen?',
          svar: [{ tekst: 'Vekstfaktor = 1,06\nGjeld = 50 000 · 1,06²\n      = 50 000 · 1,1236\n      = 56 180 kr\nSvar: Etter 2 år skylder du 56 180 kr.', best: true, kom: '' },
            { tekst: '50 000 · 0,06 · 2 = 6000 kr', best: false, kom: 'Det er bare renten uten rentes rente, og ikke gjelden. Oppgaven spør hva du skylder.' },
            { tekst: '50 000 · 1,12 = 56 000 kr', best: false, kom: 'To år med 6 % er ikke 12 %. Vekstfaktoren er 1,06 · 1,06 = 1,1236.' }],
          forkl: 'Elev A bruker vekstfaktor og potens, og skriver svaret med enhet.' }
      ]
    },
    sjekkliste: ['Jeg har definert variablene (hva x og y står for).', 'Jeg har satt opp uttrykket eller likningen.', 'Hvert steg står på en egen linje.', 'Jeg har brukt vekstfaktor når det er prosent.', 'Likhetstegnene stemmer.', 'Svaret har enhet og står i en svarsetning som passer til spørsmålet.', 'Jeg har sjekket svaret i teksten: passer det til situasjonen?']
  };

  const kommando = {
    ord: [
      { ikon: '🧮', ord: 'Regn ut', betyr: 'Finn svaret ved å regne.', ha: 'Utregning og svar, med enhet hvis det er en enhet.', oppg: 'Regn ut 1,05³.', svakt: '1,16', godt: '1,05³ = 1,05 · 1,05 · 1,05 ≈ 1,16' },
      { ikon: '📝', ord: 'Vis at', betyr: 'Svaret er gitt. Du skal vise at det stemmer.', ha: 'Hele veien fram, slik at leseren ser at det stemmer.', oppg: 'Vis at (x + 3)² = x² + 6x + 9.', svakt: 'Det stemmer.', godt: '(x + 3)² = (x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9.' },
      { ikon: '💬', ord: 'Forklar', betyr: 'Fortell med egne ord hva du gjør, og hvorfor.', ha: 'Hele setninger, riktige begreper og riktig rekkefølge.', oppg: 'Forklar hva stigningstallet i y = 250x + 300 betyr hvis x er måneder og y er kr.', svakt: 'Det er 250.', godt: 'Stigningstallet 250 betyr at y øker med 250 når x øker med 1. Altså koster det 250 kr mer for hver ekstra måned.' },
      { ikon: '🧠', ord: 'Begrunn', betyr: 'Si hvorfor noe er riktig.', ha: 'En påstand og en grunn: en regel, et tall eller en sammenheng.', oppg: 'Begrunn at 10 % vekst gir vekstfaktor 1,10.', svakt: 'Fordi det er sånn.', godt: '10 % av et tall er 0,10 ganger tallet. Ny verdi = tallet + 0,10 · tallet = 1,10 · tallet. Derfor er vekstfaktoren 1,10.' },
      { ikon: '⚖️', ord: 'Sammenlign', betyr: 'Finn likheter og forskjeller, ofte med tall.', ha: 'Begge ting, med tall, og en konklusjon.', oppg: 'Sammenlign to sparealternativer over 10 år: A med 5 % rente og B med 4 % rente.', svakt: 'A er best.', godt: 'A: 1,05¹⁰ ≈ 1,63. B: 1,04¹⁰ ≈ 1,48. A gir ca. 63 % vekst og B ca. 48 %. A gir ca. 15 prosentpoeng mer.' },
      { ikon: '🔍', ord: 'Vurder', betyr: 'Ta stilling: er det rimelig, riktig eller best?', ha: 'En konklusjon, et argument og gjerne en sjekk med tall.', oppg: 'Vurder om en lineær modell passer til tallene 100, 200, 400, 800.', svakt: 'Nei.', godt: 'Nei. Økningen er 100, 200 og 400, altså ikke lik hver gang. Verdiene dobles. En eksponentiell modell passer bedre.' },
      { ikon: '📈', ord: 'Tolk', betyr: 'Fortell hva tallene eller grafen betyr i situasjonen.', ha: 'Hva grafen viser, med tall og enheter, og hva det betyr.', oppg: 'Tolk skjæringspunktet mellom grafene til to abonnement.', svakt: 'De krysser.', godt: 'Skjæringspunktet viser når de to abonnementene koster det samme. For eksempel: ved 6 måneder koster begge 1800 kr. Etter det er det ene billigere enn det andre.' },
      { ikon: '🗣️', ord: 'Drøft', betyr: 'Se på flere sider av saken og konkluder.', ha: 'Argumenter for og mot, og en egen konklusjon.', oppg: 'Drøft: Er det alltid lurest å velge lånet med lavest rente?', svakt: 'Ja, lav rente er billigst.', godt: 'For: lavere rente gir lavere kostnad. Mot: gebyrer, løpetid og hvordan du betaler tilbake kan også spille inn. Konklusjon: Se på total kostnad, ikke bare renten.' }
    ],
    oppg: {
      rolig: [
        { q: 'Oppgaven sier: «Regn ut 300 + 250 · 6.» Hva må svaret ha med?', valg: [['Utregning med riktig regnerekkefølge og svaret 1800', 1], ['Bare ordet «ja»', 0, 'Oppgaven ber deg regne ut noe.'], ['En forklaring uten tall', 0, '«Regn ut» betyr at du skal regne.']], forkl: '250 · 6 = 1500 regnes først. Så 300 + 1500 = 1800.' },
        { q: 'Oppgaven sier: «Vis at x = 6, y = 4 er en løsning på x + y = 10 og x − y = 2.» Hva må du gjøre?', valg: [['Sette inn x = 6 og y = 4 i begge likningene og vise at de stemmer', 1], ['Bare skrive x = 6 og y = 4', 0, 'Det står jo i oppgaven. Du skal vise at det stemmer.'], ['Løse en annen likning', 0, 'Du skal bruke likningene i oppgaven.']], forkl: '6 + 4 = 10 og 6 − 4 = 2. Begge stemmer.' },
        { q: 'Oppgaven sier: «Forklar hva y = 2x + 5 betyr hvis x er timer og y er kr.» Hva er best?', valg: [['Si at 5 er startprisen og at prisen øker med 2 kr for hver time', 1], ['Skrive tallsvaret 5', 0, '«Forklar» ber om mer enn et tall.'], ['Gjette', 0, 'En forklaring må bygge på uttrykket.']], forkl: 'Du forklarer hva tallene betyr i situasjonen: 5 er startverdien og 2 er økningen per time.' }
      ],
      vanlig: [
        { q: 'Oppgaven sier: «Sammenlign abonnement A (100 kr fast + 2 kr per GB) og B (60 kr fast + 5 kr per GB) for 20 GB.» Hva må svaret ha med?', valg: [['Begge prisene (140 kr og 160 kr) og en konklusjon', 1], ['Bare prisen til A', 0, 'Du skal sammenligne to ting, så begge må være med.'], ['Bare at A er best', 0, 'Du må vise tallene og si hvor mye.']], forkl: 'A: 100 + 2 · 20 = 140 kr. B: 60 + 5 · 20 = 160 kr. A er 20 kr billigere.' },
        { q: 'Oppgaven sier: «Tolk grafen som viser restgjeld mot år.» Hva må svaret ha med?', valg: [['Hva grafen viser, med tall og enheter, og hva det betyr (for eksempel nedbetaling per år)', 1], ['Bare at den synker', 0, 'Det er for lite. Hva betyr det for lånet?'], ['Hvilken farge den har', 0, 'Fargen sier ikke noe om hva grafen betyr.']], forkl: '«Tolk» betyr å si hva tallene betyr i situasjonen.' },
        { q: 'Hvilket svar følger «Begrunn at (a + b)² ≠ a² + b²»?', valg: [['Med a = 1 og b = 2 er (1 + 2)² = 9, men 1² + 2² = 5. De er ikke like.', 1], ['Fordi det er sånn.', 0, 'Du må vise det med tall eller regel.'], ['Fordi kvadrater er vanskelige.', 0, 'Vanskelig er ikke en begrunnelse.']], forkl: 'Et moteksempel med tall er en sterk begrunnelse for at noe ikke stemmer.' }
      ],
      utfordring: [
        { q: 'Oppgaven sier: «Vurder om en lineær modell passer til 100, 200, 400, 800.» Hva må du gjøre?', valg: [['Ta stilling og begrunne med tall, for eksempel ved å se på økningen mellom tallene', 1], ['Bare svare ja eller nei', 0, 'Uten begrunnelse er det ikke en vurdering.'], ['Regne ut gjennomsnittet', 0, 'Det svarer ikke på om modellen passer.']], forkl: 'Økningene er 100, 200, 400. De er ikke like, så en lineær modell passer ikke.' },
        { q: 'Oppgaven sier: «Drøft om det alltid er best å velge lånet med lavest rente.» Hva må svaret ha?', valg: [['Argumenter for og mot, og en egen konklusjon', 1], ['Bare ja eller nei', 0, '«Drøft» ber om flere sider av saken.'], ['Bare en utregning', 0, 'En utregning kan være med, men den er ikke nok.']], forkl: 'Å drøfte er å veie argumenter mot hverandre og konkludere.' },
        { q: 'Hvilke kommandoord krever at du bruker regning for å støtte en konklusjon?', valg: [['Sammenlign og vurder', 1], ['Bare «Regn ut»', 0, '«Regn ut» ber om en utregning, men ikke om en konklusjon.'], ['Bare «Forklar»', 0, '«Forklar» kan gjøres uten regning, men det er ofte bra å ha med et eksempel.']], forkl: 'Når du sammenligner eller vurderer, regner du ofte først og konkluderer etterpå.' }
      ]
    }
  };

  const begrunn = {
    pastand: 'En vekst på 10 % etterfulgt av en nedgang på 10 % gir ikke samme verdi som før.',
    trapp: ['Fordi det er galt.', 'Fordi prosentene regnes av ulike tall.', 'Starter du på 100: +10 % gir 110. 10 % av 110 er 11, så etter nedgangen er verdien 99. Vekstfaktorene er 1,10 og 0,90, og 1,10 · 0,90 = 0,99, ikke 1. Derfor blir verdien 1 % lavere enn før.'],
    startere: ['Jeg mener at … fordi …', 'Regelen sier at …, så …', 'Jeg kan vise det med tall: …', 'Et moteksempel er …', 'Det betyr at …', 'Derfor …', 'Det stemmer bare hvis …'],
    rangere: {
      rolig: [
        { pastand: 'Påstand: Stigningstallet til y = 3x + 2 er 3.', svar: [['Tallet foran x sier hvor mye y øker når x øker med 1.', 1], ['Fordi 3 står først.', 0, 'Rekkefølgen er ikke grunnen.'], ['Fordi det er det største tallet.', 0, 'Størrelsen på tallet er ikke grunnen. Hva betyr tallet foran x?']], forkl: 'Stigningstallet er tallet som ganges med x.' },
        { pastand: 'Påstand: x = 2 og y = 3 er en løsning på x + y = 5 og x − y = −1.', svar: [['2 + 3 = 5 og 2 − 3 = −1, så begge likningene stemmer.', 1], ['Fordi 2 og 3 er små tall.', 0, 'Størrelsen på tallene er ikke en grunn.'], ['Fordi 5 er summen.', 0, 'Det sjekker bare den ene likningen.']], forkl: 'Du må sjekke at tallene passer i begge likningene.' }
      ],
      vanlig: [
        { pastand: 'Påstand: (x + 2)² er ikke lik x² + 4.', svar: [['(x + 2)² = x² + 4x + 4. Leddet 4x mangler, så de er ikke like. Med x = 1 får vi 9 og 5.', 1], ['Fordi kvadrater er vanskelige.', 0, 'Vanskelig er ikke en begrunnelse.'], ['Fordi læreren har sagt det.', 0, 'Du må kunne vise det selv.']], forkl: 'Første kvadratsetning: (a + b)² = a² + 2ab + b².' },
        { pastand: 'Påstand: f(x) = 2x + 1 er en lineær funksjon.', svar: [['Grafen er en rett linje, og y øker med 2 hver gang x øker med 1.', 1], ['Fordi den har x i seg.', 0, 'Det har også x². Det er ikke nok.'], ['Fordi den er enkel.', 0, 'Enkelhet er ikke en matematisk grunn.']], forkl: 'En lineær funksjon har konstant endring: y øker like mye hver gang x øker med 1.' }
      ],
      utfordring: [
        { pastand: 'Påstand: Med 20 % vekst per år dobles verdien på mindre enn 4 år.', svar: [['1,2³ = 1,728 er under 2, men 1,2⁴ ≈ 2,07 er over 2. Altså passeres dobbel verdi mellom år 3 og år 4.', 1], ['Fordi 20 % · 5 = 100 %.', 0, 'Det regner med like store økninger hvert år. Med vekstfaktor er økningen større jo mer du har.'], ['Fordi 20 er et stort tall.', 0, 'Størrelsen på prosenten sier ikke noe om hvor lang tid det tar uten utregning.']], forkl: 'Eksponentiell vekst regnes med vekstfaktor og potens: 1,2⁴ ≈ 2,07.' },
        { pastand: 'Påstand: Likningssettet x + y = 4 og 2x + 2y = 9 har ingen løsning.', svar: [['Deler vi den andre likningen på 2, får vi x + y = 4,5. Da skulle x + y vært både 4 og 4,5, og det er umulig.', 1], ['Fordi det er to likninger.', 0, 'To likninger kan ha en løsning, så det er ikke grunnen.'], ['Fordi vi ikke fant noen løsning.', 0, 'At du ikke fant en, betyr ikke at det ikke finnes noen. Hva viser at det er umulig?']], forkl: 'Når to likninger motsier hverandre, har likningssettet ingen løsning.' }
      ]
    },
    skriv: {
      rolig: [
        { oppg: 'Begrunn at y = 11 når x = 3 i y = 2x + 5.', svakt: 'Fordi det blir 11.', modell: 'Jeg setter x = 3 inn i uttrykket: y = 2 · 3 + 5 = 6 + 5 = 11. Derfor er y = 11 når x = 3.', merk: 'Har du satt inn tallet og vist utregningen?' },
        { oppg: 'Forklar hva 5 betyr i y = 2x + 5, hvis x er antall timer og y er prisen i kr.', svakt: 'Det er et tall.', modell: '5 er verdien av y når x = 0. Det er startprisen: 5 kr før du har brukt noen timer. Etter det legges det til 2 kr for hver time.', merk: 'Har du sagt hva tallet betyr i situasjonen?' }
      ],
      vanlig: [
        { oppg: 'Begrunn at x = 4 og y = 3 er løsningen på x + y = 7 og x − y = 1.', svakt: 'Det stemmer.', modell: '4 + 3 = 7 og 4 − 3 = 1. Begge likningene stemmer med disse verdiene, så (4, 3) er løsningen.', merk: 'Har du sjekket begge likningene?' },
        { oppg: 'Forklar hvorfor 1,05 er vekstfaktoren for en økning på 5 %.', svakt: 'Fordi 5 % er 1,05.', modell: '5 % av et tall er 0,05 ganger tallet. Ny verdi = tallet + 0,05 · tallet = 1,05 · tallet. Derfor er vekstfaktoren 1,05.', merk: 'Har du vist hvorfor, og ikke bare sagt tallet?' }
      ],
      utfordring: [
        { oppg: 'Begrunn at (a + b)² ikke er lik a² + b².', svakt: 'Fordi det ikke er det.', modell: 'Prøv a = 1 og b = 2. Da er (1 + 2)² = 9, men 1² + 2² = 5. Generelt er (a + b)² = a² + 2ab + b², og leddet 2ab mangler i a² + b².', merk: 'Har du både et eksempel med tall og en forklaring med regelen?' },
        { oppg: 'Begrunn at lån A (6 % rente, 5 år) ikke nødvendigvis er billigere enn lån B (7 % rente, 3 år).', svakt: 'Fordi renten ikke er alt.', modell: 'Renten er bare en del av prisen. Lån A går over flere år, så vi betaler rente i lengre tid. I tillegg kan det være gebyrer. For å sammenligne må vi regne ut total kostnad for begge lånene.', merk: 'Har du sagt hva mer enn renten som påvirker kostnaden?' }
      ]
    },
    sjekk: ['Jeg har sagt hva jeg mener.', 'Jeg har brukt tall eller et eksempel.', 'Jeg har brukt en regel eller et matematisk begrep.', 'Jeg har brukt ord som «fordi», «derfor» eller «siden».', 'En klassekamerat kan forstå sammenhengen.']
  };

  const diskusjon = {
    pastander: {
      rolig: [
        { pastand: 'Hvis stigningstallet er negativt, synker grafen.', for: 'Enig. Negativt stigningstall betyr at y blir mindre når x blir større. For eksempel: y = −2x har y = 0, −2, −4 for x = 0, 1, 2.', mot: 'Uenig. Jeg tror grafen alltid går oppover.', forkl: 'Påstanden stemmer. Er stigningstallet negativt, synker y når x øker, og grafen går nedover mot høyre.' },
        { pastand: 'To likninger med to ukjente har alltid nøyaktig én løsning.', for: 'Enig. Du trenger to likninger for to ukjente, så da går det alltid.', mot: 'Uenig. x + y = 4 og x + y = 5 har ingen løsning. Og x + y = 4 og 2x + 2y = 8 har uendelig mange.', forkl: 'Påstanden stemmer ikke. Et likningssett kan ha én løsning, ingen løsning eller uendelig mange løsninger.' }
      ],
      vanlig: [
        { pastand: 'Det er alltid best å velge sparekontoen med høyest rente.', for: 'Enig. Høyere rente gir mer penger.', mot: 'Uenig. Det kan være gebyrer eller at pengene er bundet i mange år. Du må se på hele bildet.', forkl: 'Ikke alltid. Rente er viktig, men bindingstid, gebyrer og hvor lenge du sparer spiller også inn.' },
        { pastand: 'Hvis prisen øker med 50 % og så synker med 50 %, er den lik som før.', for: 'Enig. +50 og −50 tar ut hverandre.', mot: 'Uenig. 100 → 150 → 75. Du ender på 75, ikke 100.', forkl: 'Påstanden stemmer ikke. Vekstfaktorene 1,5 og 0,5 gir 1,5 · 0,5 = 0,75. Prisen er 25 % lavere enn før.' }
      ],
      utfordring: [
        { pastand: 'Eksponentiell vekst er alltid raskere enn lineær vekst.', for: 'Enig. Eksponentiell vekst dobler seg om og om igjen, og vinner til slutt.', mot: 'Uenig. For små x kan en lineær funksjon være høyere. For eksempel er 100x = 300 mens 2ˣ = 8 når x = 3.', forkl: 'Over lang tid vinner eksponentiell vekst. Men «alltid» stemmer ikke, for i begynnelsen kan en lineær funksjon ligge høyere.' },
        { pastand: 'Et lån med lav rente er alltid billigere enn et lån med høy rente.', for: 'Enig. Lav rente betyr at du betaler mindre.', mot: 'Uenig. Hvis lånet med lav rente har høye gebyrer eller går over mange flere år, kan totalkostnaden bli høyere.', forkl: 'Ikke alltid. Se på total kostnad, ikke bare renten: gebyrer, løpetid og avdrag påvirker prisen.' }
      ]
    },
    hvem: {
      rolig: [
        { q: 'En vare koster 200 kr og settes ned 10 %. Hva er den nye prisen?', a: { navn: 'Mia', tekst: '«200 − 10 = 190 kr.»' }, b: { navn: 'Jonas', tekst: '«200 · 0,90 = 180 kr.»' }, fasit: 'b', hintA: '10 % betyr ikke 10 kr. Hva er 10 % av 200 kr?', forkl: 'Jonas har rett. 10 % av 200 er 20 kr, så ny pris er 180 kr. Mia har trukket fra 10 kr i stedet for 10 %.' }
      ],
      vanlig: [
        { q: 'Løs x + y = 10 og x − y = 2.', a: { navn: 'Sara', tekst: '«x = 6 og y = 4.»' }, b: { navn: 'Amir', tekst: '«x = 4 og y = 6.»' }, fasit: 'a', hintB: 'Sjekk i den andre likningen: 4 − 6 = −2, ikke 2.', forkl: 'Sara har rett. 6 + 4 = 10 og 6 − 4 = 2. Amir har byttet om x og y.' }
      ],
      utfordring: [
        { q: 'Du setter 20 000 kr på konto med 4 % rente per år. Hva har du etter 2 år?', a: { navn: 'Emma', tekst: '«20 000 · 1,04 · 2 = 41 600 kr.»' }, b: { navn: 'Noah', tekst: '«20 000 · 1,04² = 21 632 kr.»' }, fasit: 'b', hintA: 'Er det rimelig at 20 000 kr blir mer enn dobbelt så mye etter 2 år med bare 4 % rente?', forkl: 'Noah har rett. Hvert år ganges beløpet med 1,04, så etter 2 år ganger vi med 1,04². Emma har ganget med 2, og det er ikke det samme.' },
        { q: 'Er f(x) = 2x² en lineær funksjon?', a: { navn: 'Lina', tekst: '«Ja, for den har x i seg.»' }, b: { navn: 'Omar', tekst: '«Nei. f(1) = 2, f(2) = 8, f(3) = 18. Økningene (6 og 10) er ikke like.»' }, fasit: 'b', hintA: 'Det er ikke nok at x er med. En lineær funksjon har like store økninger hver gang x øker med 1.', forkl: 'Omar har rett. For en lineær funksjon skulle økningen vært lik hver gang. Her er den 6 og så 10, så funksjonen er ikke lineær.' }
      ]
    },
    sparring: ['Hvorfor?', 'Hvordan vet du det?', 'Gjelder det alltid?', 'Kan du vise det med et eksempel?', 'Hva hvis tallene var andre?']
  };

  M.les.reg(10, { tekst: tekst, graf: graf, foring: foring, kommando: kommando, begrunn: begrunn, diskusjon: diskusjon });
})();
