/* ============================================================
   Les, tolk og begrunn – innhold for 9. trinn
   Tema: sammensatte måleenheter, Pytagoras, statistikk i media, sentralmål, sannsynlighet.
   Markering: [[t|tall og enheter]] [[s|det oppgaven spør om]] [[u|unødvendig info]]
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;

  const tekst = {
    rolig: [
      { tittel: 'Fart', tekst: 'En syklist sykler [[t|30 km]] på [[t|2 timer]]. [[u|Hun har en blå sykkel.]] [[s|Hva er farten i km/t?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['30 : 2', 1], ['30 · 2', 0, 'Fart er hvor langt du kommer på én time. Da skal du dele, ikke gange.'], ['2 : 30', 0, 'Du skal dele distansen på tiden, ikke tiden på distansen.'], ['30 + 2', 0, 'Å legge sammen km og timer gir ikke mening.']], forkl: 'Fart = distanse : tid = 30 km : 2 t = 15 km/t.' } },
      { tittel: 'Gjennomsnitt', tekst: 'Fem elever fikk disse karakterene på en prøve: [[t|3, 4, 5, 4, 6]]. [[u|Prøven var på tirsdag.]] [[s|Hva er gjennomsnittet?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['(3 + 4 + 5 + 4 + 6) : 5', 1], ['3 + 4 + 5 + 4 + 6', 0, 'Det er summen. For å få gjennomsnittet må du dele på antall karakterer.'], ['(3 + 6) : 2', 0, 'Det er midtpunktet mellom den laveste og den høyeste karakteren, ikke gjennomsnittet.'], ['4', 0, '4 er tallet som kommer oftest (typetallet). Gjennomsnittet er summen delt på antallet.']], forkl: 'Summen er 22. 22 : 5 = 4,4. Gjennomsnittet er 4,4.' } },
      { tittel: 'Terning', tekst: 'Du kaster en vanlig terning med [[t|6 sider]]. [[u|Terningen er rød.]] [[s|Hva er sannsynligheten for å få en femmer?]]',
        spm: { q: 'Hva er riktig sannsynlighet?', valg: [['1/6', 1], ['5/6', 0, '5/6 er sannsynligheten for å ikke få en femmer.'], ['1/5', 0, 'Det er seks mulige utfall på en terning, ikke fem.'], ['5', 0, 'Sannsynlighet er et tall mellom 0 og 1, og ikke et tall som 5.']], forkl: 'Det er 1 gunstig utfall (femmeren) av 6 mulige. Sannsynligheten er 1/6.' } }
    ],
    vanlig: [
      { tittel: 'Stige', tekst: 'En stige er [[t|5 m]] lang og står [[t|3 m]] ut fra en vegg. [[u|Stigen er laget av aluminium.]] Veggen står vinkelrett på bakken. [[s|Hvor høyt opp på veggen når stigen?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['√(5² − 3²)', 1], ['√(5² + 3²)', 0, 'Stigen er den lengste siden (hypotenusen). Du skal finne en av de korte sidene, og da må du trekke fra.'], ['5 − 3', 0, 'Sidene i en rettvinklet trekant regnes ikke ut slik. Bruk Pytagoras.'], ['5 · 3', 0, 'Å gange lengdene gir et areal, ikke en høyde.']], forkl: '5² − 3² = 25 − 9 = 16, og √16 = 4. Stigen når 4 m opp på veggen.' } },
      { tittel: 'Bensin', mangler: true, instr: 'Marker det du har, og avgjør så om oppgaven kan løses slik den står.', tekst: 'En bil bruker [[t|0,6 liter]] bensin per mil. [[s|Hva koster det å kjøre til Trondheim?]]',
        spm: { q: 'Kan oppgaven løses slik den står?', valg: [['Nei. Vi mangler avstanden og prisen per liter.', 1], ['Ja. Det koster 0,6 kr.', 0, '0,6 liter er en mengde bensin, ikke penger.'], ['Ja. Svaret er 0,6 · 10.', 0, 'Hvor kommer 10 fra? Det står ikke i teksten.']], forkl: 'Vi må vite hvor mange mil det er, og hva en liter bensin koster. Uten det kan vi ikke svare.' } },
      { tittel: 'Skolevei', tekst: 'Ti elever målte hvor mange minutter de brukte på skoleveien: [[t|5, 8, 8, 10, 12, 15, 15, 20, 25, 40]]. [[u|Målingen ble gjort på en regnfull dag.]] [[s|Hva er medianen?]]',
        spm: { q: 'Hvordan finner du medianen her?', valg: [['(12 + 15) : 2', 1], ['12', 0, 'Med 10 verdier finnes det to midterste (nummer 5 og 6). Du må bruke begge.'], ['(5 + 40) : 2', 0, 'Det er midtpunktet mellom minste og største verdi, ikke medianen.'], ['Summen delt på 10', 0, 'Det er gjennomsnittet.']], forkl: 'Verdiene står allerede i rekkefølge. De to midterste er 12 og 15. Medianen er (12 + 15) : 2 = 13,5 minutter.' } }
    ],
    utfordring: [
      { tittel: 'Poteter', tekst: 'En bonde har [[t|1,2 tonn]] poteter og selger dem for [[t|12 kr per kg]]. [[u|Potetene ble høstet i september, og været var fint.]] Kostnadene var [[t|3000 kr]]. [[s|Hva ble overskuddet?]]',
        spm: { q: 'Hvilket regnestykke passer?', valg: [['1200 · 12 − 3000', 1], ['1,2 · 12 − 3000', 0, 'Prisen er per kg, men mengden er oppgitt i tonn. Gjør om til kg først (1 tonn = 1000 kg).'], ['1200 · 12 + 3000', 0, 'Kostnader trekkes fra. Overskudd er inntekt minus kostnader.'], ['12 · 3000 − 1200', 0, 'Tallene står på feil plass. Inntekten er mengde i kg ganger pris per kg.']], forkl: '1,2 tonn = 1200 kg. Inntekt: 1200 · 12 = 14 400 kr. Overskudd: 14 400 − 3000 = 11 400 kr.' } },
      { tittel: 'Kuler', tekst: 'En pose har [[t|4 røde]] og [[t|6 blå]] kuler. [[u|Posen er laget av stoff.]] Du trekker to kuler uten å legge dem tilbake. [[s|Hva er sannsynligheten for at begge er røde?]]',
        spm: { q: 'Hvilken beregning passer?', valg: [['4/10 · 3/9', 1], ['4/10 · 4/10', 0, 'Du legger ikke kulen tilbake. Etter at du har trukket én rød, er det bare 3 røde igjen blant 9 kuler.'], ['4/10 + 3/9', 0, 'Begge hendelsene må skje etter hverandre. Da ganger du sannsynlighetene.'], ['4/10 · 6/9', 0, '6 er antall blå. Du skal finne sannsynligheten for to røde.']], forkl: '4/10 · 3/9 = 12/90 = 2/15, som er ca. 0,13 eller 13 %.' } },
      { tittel: 'Gjennomsnittslønn', tekst: 'En avis skriver: «Gjennomsnittslønnen i firmaet er 50 000 kr i måneden.» I firmaet er det [[t|9 ansatte]] som tjener [[t|35 000 kr]] og [[t|1 sjef]] som tjener [[t|185 000 kr]]. [[u|Firmaet selger kaffe.]] [[s|Gir gjennomsnittet et godt bilde av hva en vanlig ansatt tjener?]]',
        spm: { q: 'Hva er best svar?', valg: [['Nei. Sjefens høye lønn drar gjennomsnittet opp. En vanlig ansatt tjener 35 000 kr.', 1], ['Ja. Gjennomsnittet er alltid det beste målet.', 0, 'Det finnes ikke ett mål som alltid er best. Prøv å regne ut hva de ni ansatte tjener i snitt.'], ['Ja. Alle tjener 50 000 kr.', 0, 'Se på tallene i teksten. Ni av ti tjener bare 35 000 kr.']], forkl: '(9 · 35 000 + 185 000) : 10 = 500 000 : 10 = 50 000 kr. Men ni av ti tjener 35 000 kr, så medianen (35 000 kr) sier mer om en vanlig ansatt.' } },
      { tittel: 'Trekant', mangler: true, instr: 'Marker det du har, og avgjør så om oppgaven kan løses slik den står.', tekst: 'En rettvinklet trekant har en katet på [[t|6 cm]]. [[s|Hvor lang er hypotenusen?]]',
        spm: { q: 'Kan oppgaven løses slik den står?', valg: [['Nei. Vi må kjenne lengden på den andre kateten.', 1], ['Ja. Hypotenusen er 12 cm.', 0, 'Det er ingen regel som sier at hypotenusen er dobbelt så lang som en katet.'], ['Ja. Hypotenusen er 6 cm.', 0, 'Hypotenusen er alltid lengre enn kateten, så den kan ikke være 6 cm.']], forkl: 'Med Pytagoras trenger vi to sider for å finne den tredje. Med bare én katet kan hypotenusen være mange ulike lengder.' } }
    ]
  };

  const graf = {
    rolig: [
      { tittel: 'Sykkeltur', tekst: 'Grafen viser hvor langt Lise har syklet etter hver time.',
        graf: { type: 'linje', tittel: 'Lises sykkeltur', xTittel: 'Tid (timer)', yTittel: 'Avstand (km)', kat: ['0', '1', '2', '3', '4'], verdier: [0, 15, 30, 45, 60], yMin: 0, yMax: 60, steg: 10 },
        oppg: [
          { t: 'klikk', q: 'Trykk på det som forteller hva x-aksen viser.', mål: 'xakse', forkl: 'X-aksen viser tid i timer.', hint: 'X-aksen er den vannrette. Se etter teksten under den.' },
          { q: 'Hvor langt hadde Lise syklet etter 2 timer?', valg: [['30 km', 1], ['15 km', 0, 'Det var etter 1 time.'], ['2 km', 0, '2 er antall timer. Les av y-aksen.']], forkl: 'Etter 2 timer hadde hun syklet 30 km.' },
          { q: 'Hvor mange kilometer sykler Lise per time?', valg: [['15 km/t', 1], ['60 km/t', 0, '60 km er hele turen på 4 timer. Hvor mye er det per time?'], ['4 km/t', 0, '4 er antall timer, ikke farten.']], forkl: 'Hver time øker avstanden med 15 km. Farten er 15 km/t.' }
        ] },
      { tittel: 'Terningkast', tekst: 'Mia kastet en terning 30 ganger og skrev ned hvor mange ganger hun fikk hvert tall.',
        graf: { type: 'sol', tittel: 'Resultater fra 30 terningkast', xTittel: 'Antall øyne', yTittel: 'Antall kast', kat: ['1', '2', '3', '4', '5', '6'], verdier: [4, 6, 5, 7, 3, 5], yMin: 0, yMax: 8, steg: 2 },
        oppg: [
          { t: 'klikk', q: 'Trykk på søylen for tallet som kom oftest.', mål: 'topp', forkl: 'Fireren kom oftest: 7 ganger. Det er typetallet.', hint: 'Det som kom oftest, har den høyeste søylen.' },
          { t: 'klikk', q: 'Trykk på søylen for tallet som kom sjeldnest.', mål: 'bunn', forkl: 'Femmeren kom sjeldnest: 3 ganger.', hint: 'Sjeldnest er den laveste søylen.' },
          { q: 'Hvor mange ganger fikk Mia tallet 3?', valg: [['5', 1], ['3', 0, 'Det er antall femmere.'], ['7', 0, 'Det er antall firere.']], forkl: 'Søylen for tallet 3 når opp til 5.' },
          { q: 'Hvor mange kast var det til sammen?', valg: [['30', 1], ['6', 0, 'Det er antall søyler.'], ['7', 0, 'Det er den høyeste søylen, ikke summen.']], forkl: '4 + 6 + 5 + 7 + 3 + 5 = 30 kast.' }
        ] }
    ],
    vanlig: [
      { tittel: 'Omsetning', tekst: 'Avisen skriver: «Firmaets omsetning skyter i været!» De viser denne grafen.',
        graf: { type: 'sol', tittel: 'Omsetning (millioner kr)', xTittel: 'År', yTittel: 'Omsetning (mill. kr)', kat: ['2022', '2023', '2024'], verdier: [98, 100, 103], yMin: 96, yMax: 104, steg: 2 },
        oppg: [
          { t: 'klikk', q: 'Trykk på tallet der y-aksen starter.', mål: 'start', forkl: 'Y-aksen starter på 96, ikke på 0.', hint: 'Se på det nederste tallet på y-aksen.' },
          { q: 'Stemmer overskriften «skyter i været»?', valg: [['Nei. Aksen starter på 96, så økningen ser stor ut. Egentlig er den fra 98 til 103, ca. 5 %.', 1], ['Ja. Søylen for 2024 er mye høyere.', 0, 'Se på hvor aksen starter. Det er det som får søylen til å se høy ut.'], ['Ja. Grafen viser det tydelig.', 0, 'En graf kan se tydelig ut uten at den er ærlig. Sjekk aksen.']], forkl: 'Økningen er 5 av 98, altså ca. 5 %. Det er ikke å «skyte i været». Aksen som starter på 96 forstørrer forskjellen.' }
        ] },
      { tittel: 'Skoleveien', tekst: 'En klasse målte hvor lenge elevene bruker på skoleveien. Hver søyle viser hvor mange elever som brukte tid innenfor et intervall.',
        graf: { type: 'sol', tittel: 'Tid brukt på skoleveien', xTittel: 'Minutter', yTittel: 'Antall elever', kat: ['0–5', '5–10', '10–15', '15–20', '20–25'], verdier: [4, 9, 7, 3, 1], yMin: 0, yMax: 10, steg: 2 },
        oppg: [
          { t: 'klikk', q: 'Trykk på den høyeste søylen.', mål: 'topp', forkl: 'De fleste (9 elever) bruker mellom 5 og 10 minutter.', hint: 'Høyest søyle = flest elever.' },
          { q: 'Hvor mange elever bruker mindre enn 10 minutter?', valg: [['13', 1], ['9', 0, 'Det er bare søylen for 5–10 minutter. Husk søylen for 0–5 også.'], ['24', 0, 'Det er alle elevene. Du skal bare ha de som bruker under 10 minutter.']], forkl: '4 + 9 = 13 elever.' },
          { q: 'Hvor mange elever er det i klassen?', valg: [['24', 1], ['5', 0, 'Det er antall søyler.'], ['9', 0, 'Det er den høyeste søylen.']], forkl: '4 + 9 + 7 + 3 + 1 = 24 elever.' }
        ] }
    ],
    utfordring: [
      { tittel: 'Bensinpris', tekst: 'En avis skriver at bensinprisen har «eksplodert». De viser denne grafen.',
        graf: { type: 'sol', tittel: 'Bensinpris (kr per liter)', xTittel: 'Måned', yTittel: 'Pris (kr per liter)', kat: ['Jan', 'Feb', 'Mar', 'Apr'], verdier: [20, 21, 22, 23], yMin: 19, yMax: 24, steg: 1 },
        oppg: [
          { t: 'klikk', q: 'Trykk på tallet der y-aksen starter.', mål: 'start', forkl: 'Y-aksen starter på 19.', hint: 'Se på det laveste tallet på y-aksen.' },
          { q: 'Hvor mange prosent økte prisen fra januar til april?', valg: [['15 %', 1], ['3 %', 0, 'Prisen økte med 3 kr. Men hvor mange prosent er 3 kr av 20 kr?'], ['23 %', 0, '23 er prisen i april, ikke prosentøkningen.'], ['300 %', 0, 'Det er det bildet gir inntrykk av fordi aksen starter på 19. Regn ut 3 : 20.']], forkl: 'Økning: 23 − 20 = 3 kr. 3 : 20 = 0,15, altså 15 %. Det er en vesentlig økning, men grafen får den til å se mye større ut.' },
          { q: 'Hva bør grafen gjøre for å bli mer ærlig?', valg: [['La y-aksen starte på 0', 1], ['Bruke en annen farge', 0, 'Fargen endrer ikke hva grafen viser.'], ['Fjerne månedene', 0, 'Da blir det vanskeligere å lese grafen.']], forkl: 'Når y-aksen starter på 0, er søylehøydene proporsjonale med prisene.' }
        ] },
      { tittel: 'Karakterer', tekst: 'Grafen viser hvor mange elever som fikk hver karakter på en prøve i en klasse på 25 elever.',
        graf: { type: 'sol', tittel: 'Karakterer på prøven', xTittel: 'Karakter', yTittel: 'Antall elever', kat: ['1', '2', '3', '4', '5', '6'], verdier: [2, 3, 4, 8, 5, 3], yMin: 0, yMax: 8, steg: 2 },
        oppg: [
          { t: 'klikk', q: 'Trykk på søylen som viser typetallet.', mål: 'topp', forkl: 'Typetallet er karakteren som forekommer oftest: 4.', hint: 'Typetallet er den høyeste søylen.' },
          { q: 'Hvor mange elever fikk 4 eller bedre?', valg: [['16', 1], ['8', 0, 'Det er bare de som fikk 4. «Eller bedre» betyr også 5 og 6.'], ['25', 0, 'Det er alle elevene.']], forkl: '8 + 5 + 3 = 16 elever.' },
          { q: 'Hva er gjennomsnittet?', valg: [['3,8', 1], ['4', 0, '4 er typetallet (og medianen), ikke gjennomsnittet. Regn ut summen av alle karakterene og del på 25.'], ['6', 0, 'Det er den høyeste karakteren.']], forkl: 'Summen er 2 · 1 + 3 · 2 + 4 · 3 + 8 · 4 + 5 · 5 + 3 · 6 = 95. 95 : 25 = 3,8.' }
        ] }
    ]
  };

  const foring = {
    mal: [
      { navn: 'Oppgavenummer', hva: 'Skriv hvilken oppgave det er.', eks: 'Oppgave 4' },
      { navn: 'Skisse og gitt', hva: 'Tegn en skisse hvis det er geometri. Skriv det du vet, med enhet.', eks: 'Rettvinklet trekant, katet a = 6 cm, katet b = 8 cm\nFinn: hypotenusen c' },
      { navn: 'Formel', hva: 'Skriv regelen du bruker.', eks: 'Pytagoras: a² + b² = c²' },
      { navn: 'Utregning', hva: 'Ett steg per linje. Likhetstegnene står under hverandre.', eks: '6² + 8² = c²\n36 + 64 = c²\n100 = c²\nc = √100 = 10' },
      { navn: 'Svarsetning', hva: 'Svar med en hel setning og enhet.', eks: 'Svar: Hypotenusen er 10 cm.' },
      { navn: 'Sjekk', hva: 'Er svaret rimelig? Hypotenusen skal være lengst.', eks: 'Sjekk: 10 cm er lengre enn 8 cm ✓' }
    ],
    regler: [
      '**Ett steg per linje.** Da ser du og læreren hvor en eventuell feil er.',
      '**Likhetstegn betyr «er like mye som».** 100 = 10 er galt. Skriv √100 = 10 på en ny linje.',
      '**Regn med enheter, og gjør om før du regner.** 1 t 30 min er 1,5 t, ikke 1,30 t.',
      '**Tegn en skisse** når oppgaven handler om figurer, og sett lengdene inn på skissen.',
      '**Skriv en svarsetning og sjekk at svaret er rimelig.**'
    ],
    sammenlign: {
      rolig: [
        { oppg: 'Per sykler 30 km på 2 timer. Hva er farten?', darlig: ['15'], feil: ['Ingen utregning.', 'Ingen enhet. 15 hva?', 'Ingen svarsetning.'],
          bra: ['Fart = distanse : tid', '     = 30 km : 2 t', '     = 15 km/t', 'Svar: Farten er 15 km/t.'] }
      ],
      vanlig: [
        { oppg: 'En rettvinklet trekant har kateter på 6 cm og 8 cm. Finn hypotenusen.', darlig: ['6² + 8² = 36 + 64 = 100 = 10'], feil: ['Det står at 100 er lik 10, og det er galt. Du må ta kvadratroten på en ny linje.', 'Ingen formel og ingen skisse.', 'Ingen enhet og ingen svarsetning.'],
          bra: ['Pytagoras: a² + b² = c²', '6² + 8² = c²', '36 + 64 = c²', '100 = c²', 'c = √100 = 10', 'Sjekk: 10 er lengre enn 8 ✓', 'Svar: Hypotenusen er 10 cm.'] }
      ],
      utfordring: [
        { oppg: 'En bil kjører 150 km på 1 t 30 min. Hva er farten i km/t?', darlig: ['150 : 1,30 = 115,4'], feil: ['1 t 30 min er 1,5 timer, ikke 1,30 timer.', 'Ingen enhet. Svaret 115,4 ser heller ikke rimelig ut: 1,5 t · 115 km/t er mer enn 150 km.', 'Ingen svarsetning og ingen sjekk.'],
          bra: ['1 t 30 min = 1,5 t', 'Fart = distanse : tid', '     = 150 km : 1,5 t', '     = 100 km/t', 'Sjekk: 100 km/t · 1,5 t = 150 km ✓', 'Svar: Farten er 100 km/t.'] },
        { oppg: 'Finn gjennomsnittet av 4, 7, 9 og 12.', darlig: ['4 + 7 + 9 + 12 = 32 : 4 = 8'], feil: ['Her står det at 4 + 7 + 9 + 12 er lik 32 : 4, og det er galt (32 er ikke lik 8).', 'Det står ingen formel, og tallene er ikke delt opp i steg.', 'Ingen svarsetning.'],
          bra: ['Gjennomsnitt = sum : antall', 'Sum = 4 + 7 + 9 + 12 = 32', 'Gjennomsnitt = 32 : 4', '             = 8', 'Sjekk: 4 · 8 = 32 ✓', 'Svar: Gjennomsnittet er 8.'] }
      ]
    },
    rekke: {
      rolig: [
        { tittel: 'Terning', oppg: 'Du kaster en terning. Hva er sannsynligheten for å få et partall?', linjer: ['Gunstige utfall: 2, 4, 6 (3 stykker)', 'Mulige utfall: 6', 'P(partall) = gunstige : mulige', '          = 3/6', '          = 1/2', 'Svar: Sannsynligheten er 1/2, altså 50 %.'], hint: 'Først teller du utfallene. Så bruker du formelen. Svaret kommer til slutt.' }
      ],
      vanlig: [
        { tittel: 'Pytagoras', oppg: 'En rettvinklet trekant har kateter på 6 cm og 8 cm. Finn hypotenusen.', linjer: ['Pytagoras: a² + b² = c²', '6² + 8² = c²', '36 + 64 = c²', '100 = c²', 'c = √100 = 10', 'Sjekk: 10 er lengre enn 8 ✓', 'Svar: Hypotenusen er 10 cm.'], hint: 'Formelen kommer først, så setter du inn tall.' },
        { tittel: 'Gjennomsnitt', oppg: 'Finn gjennomsnittet av 4, 7, 9 og 12.', linjer: ['Gjennomsnitt = sum : antall', 'Sum = 4 + 7 + 9 + 12 = 32', 'Gjennomsnitt = 32 : 4', '             = 8', 'Svar: Gjennomsnittet er 8.'], hint: 'Regelen først, så summen, så delingen.' }
      ],
      utfordring: [
        { tittel: 'Fart og tid', oppg: 'En bil kjører 150 km på 1 t 30 min. Hva er farten i km/t?', linjer: ['1 t 30 min = 1,5 t', 'Fart = distanse : tid', '     = 150 km : 1,5 t', '     = 100 km/t', 'Sjekk: 100 km/t · 1,5 t = 150 km ✓', 'Svar: Farten er 100 km/t.'], hint: 'Gjør om tiden til timer før du regner.' },
        { tittel: 'Stige', oppg: 'En stige er 5 m lang og står 3 m ut fra en vegg. Hvor høyt opp når den?', linjer: ['Skisse: rettvinklet trekant, hypotenus 5 m, katet 3 m', 'a² + b² = c²', 'a² + 3² = 5²', 'a² + 9 = 25', 'a² = 25 − 9', 'a² = 16', 'a = √16 = 4', 'Sjekk: 3² + 4² = 9 + 16 = 25 = 5² ✓', 'Svar: Stigen når 4 m opp på veggen.'], hint: 'Skisse og formel først. Stigen er hypotenusen.' }
      ]
    },
    vurder: {
      rolig: [
        { tittel: 'Gjennomsnitt', oppg: 'Finn gjennomsnittet av 3, 5 og 10.', spm: 'Hvilken elev har den beste føringen?',
          svar: [{ tekst: '6', best: false, kom: 'Svaret stemmer, men det står ingen utregning, ingen enhet og ingen svarsetning.' },
            { tekst: '3 + 5 + 10 = 18\n18 : 3 = 6\nSvar: Gjennomsnittet er 6.', best: true, kom: '' },
            { tekst: '3 + 5 + 10 : 3 = 6', best: false, kom: 'Regnerekkefølgen sier at 10 : 3 regnes først. Du må sette parentes rundt summen: (3 + 5 + 10) : 3.' }],
          forkl: 'Elev B viser summen og delingen på hver sin linje, og skriver en svarsetning.' }
      ],
      vanlig: [
        { tittel: 'Diagonal', oppg: 'En rektangulær hage er 12 m lang og 5 m bred. Hvor lang er diagonalen?', spm: 'Hvilken elev har den beste føringen?',
          svar: [{ tekst: 'd² = 12² + 5²\nd² = 144 + 25\nd² = 169\nd = √169 = 13\nSvar: Diagonalen er 13 m.', best: true, kom: '' },
            { tekst: '12 + 5 = 17', best: false, kom: 'Å legge sammen sidene gir ikke diagonalen. Diagonalen er hypotenusen, og da trenger du Pytagoras.' },
            { tekst: '12² + 5² = 169 = 13', best: false, kom: 'Det står at 169 er lik 13, og det er galt. Kvadratroten må stå på en egen linje.' }],
          forkl: 'Elev A bruker Pytagoras, tar kvadratroten på en egen linje, og skriver svaret med enhet.' }
      ],
      utfordring: [
        { tittel: 'Fart og strekning', oppg: 'Farten er 90 km/t. Hvor langt kjører bilen på 40 minutter?', spm: 'Hvilken elev har den beste føringen?',
          svar: [{ tekst: '40 min = 40/60 t = 2/3 t\nStrekning = fart · tid\n          = 90 km/t · 2/3 t\n          = 60 km\nSvar: Bilen kjører 60 km.', best: true, kom: '' },
            { tekst: '90 · 40 = 3600 km', best: false, kom: 'Her er timer og minutter blandet sammen. 3600 km på 40 minutter er heller ikke rimelig.' },
            { tekst: '90 · 0,40 = 36 km', best: false, kom: '40 minutter er ikke 0,40 timer. En time har 60 minutter, så 40 min = 40/60 = 2/3 time.' }],
          forkl: 'Elev A gjør om minutter til timer først, og bruker riktig formel med enheter.' }
      ]
    },
    sjekkliste: ['Jeg har skrevet oppgavenummer.', 'Jeg har tegnet skisse når det er geometri.', 'Jeg har skrevet formelen eller regelen jeg bruker.', 'Hvert steg står på en egen linje.', 'Likhetstegnene står under hverandre og stemmer.', 'Jeg har gjort om enheter (for eksempel minutter til timer) før jeg regnet.', 'Svaret har enhet, og jeg har skrevet en svarsetning.', 'Jeg har sjekket at svaret er rimelig.']
  };

  const kommando = {
    ord: [
      { ikon: '🧮', ord: 'Regn ut', betyr: 'Finn svaret ved å regne.', ha: 'Utregning og svar med enhet.', oppg: 'Regn ut 5² − 3².', svakt: '16', godt: '5² − 3² = 25 − 9 = 16' },
      { ikon: '📝', ord: 'Vis at', betyr: 'Svaret er gitt. Du skal vise at det stemmer.', ha: 'Hele veien fram, slik at leseren ser at det stemmer.', oppg: 'Vis at trekanten med sidene 5, 12 og 13 er rettvinklet.', svakt: 'Ja, den er det.', godt: '5² + 12² = 25 + 144 = 169, og 13² = 169. Siden a² + b² = c², er trekanten rettvinklet.' },
      { ikon: '💬', ord: 'Forklar', betyr: 'Fortell med egne ord hva du gjør, og hvorfor.', ha: 'Hele setninger, riktige begreper og riktig rekkefølge, gjerne med et eksempel.', oppg: 'Forklar hvordan du finner gjennomsnittet.', svakt: 'Du legger sammen og deler.', godt: 'Jeg legger sammen alle verdiene og deler summen på hvor mange verdier det er. For eksempel: 4, 6 og 8 gir (4 + 6 + 8) : 3 = 18 : 3 = 6.' },
      { ikon: '🧠', ord: 'Begrunn', betyr: 'Si hvorfor noe er riktig.', ha: 'En påstand og en grunn: en regel, et tall eller en sammenheng.', oppg: 'Begrunn at sannsynligheten for å få en sekser på en terning ikke er 1/2.', svakt: 'Fordi det er det.', godt: 'En terning har 6 like sannsynlige utfall, og bare ett av dem er en sekser. Sannsynligheten er derfor 1/6, ikke 1/2.' },
      { ikon: '⚖️', ord: 'Sammenlign', betyr: 'Finn likheter og forskjeller, ofte med tall.', ha: 'Begge ting, med tall, og en konklusjon.', oppg: 'Sammenlign gjennomsnitt og median for 2, 3, 4, 5 og 36.', svakt: 'De er ulike.', godt: 'Gjennomsnittet er (2 + 3 + 4 + 5 + 36) : 5 = 50 : 5 = 10. Medianen er 4. Den store verdien 36 drar gjennomsnittet opp, mens medianen ikke blir påvirket.' },
      { ikon: '🔍', ord: 'Vurder', betyr: 'Ta stilling: er det rimelig, riktig eller best?', ha: 'En konklusjon, et argument og gjerne en sjekk med tall.', oppg: 'Vurder overskriften «Prisene har tredoblet seg», når grafen har en akse som starter på 40.', svakt: 'Nei.', godt: 'Nei. Aksen starter ikke på null, så søylene ser mye høyere ut. Prisene økte fra 45 til 55 kr, altså ca. 22 %.' },
      { ikon: '📈', ord: 'Tolk', betyr: 'Fortell hva tallene eller grafen betyr i situasjonen.', ha: 'Hva grafen viser, med tall og enheter, og hva det betyr.', oppg: 'Tolk en graf som viser avstand mot tid for en sykkeltur.', svakt: 'Den går opp.', godt: 'Grafen er en rett linje som stiger. Det betyr at farten er jevn. Etter 2 timer er avstanden 30 km, så farten er 15 km/t.' },
      { ikon: '🗣️', ord: 'Drøft', betyr: 'Se på flere sider av saken og konkluder.', ha: 'Argumenter for og mot, og en egen konklusjon.', oppg: 'Drøft: Er gjennomsnittet alltid det beste målet for hva som er typisk?', svakt: 'Ja, det bruker alle tallene.', godt: 'For: gjennomsnittet bruker alle verdiene. Mot: ekstreme verdier drar det opp eller ned. For lønninger er median ofte bedre. Konklusjon: Det kommer an på dataene.' }
    ],
    oppg: {
      rolig: [
        { q: 'Oppgaven sier: «Regn ut farten når en syklist sykler 30 km på 2 timer.» Hva må svaret ha med?', valg: [['Utregning og svar med enhet: 30 km : 2 t = 15 km/t', 1], ['Bare tallet 15', 0, 'Tallet mangler både utregning og enhet.'], ['En lang forklaring uten tall', 0, '«Regn ut» betyr at du skal regne.']], forkl: '«Regn ut» betyr utregning, og i denne oppgaven også enhet.' },
        { q: 'Oppgaven sier: «Vis at trekanten med sider 3, 4 og 5 er rettvinklet.» Hva må du gjøre?', valg: [['Regne 3² + 4² og 5² og vise at de er like', 1], ['Bare skrive «ja»', 0, 'Du skal vise hvorfor det stemmer.'], ['Måle vinklene med gradskive', 0, 'Å måle er unøyaktig. Bruk Pytagoras, og regn.']], forkl: '3² + 4² = 9 + 16 = 25 = 5². Da er trekanten rettvinklet.' },
        { q: 'Oppgaven sier: «Forklar hva typetallet er.» Hva er best?', valg: [['Typetallet er tallet som forekommer oftest. I 2, 4, 4, 5 er typetallet 4.', 1], ['4', 0, '«Forklar» ber om mer enn et tall.'], ['Det er det samme som gjennomsnittet.', 0, 'Det stemmer ikke.']], forkl: 'En forklaring sier hva begrepet betyr, gjerne med et eksempel.' }
      ],
      vanlig: [
        { q: 'Oppgaven sier: «Sammenlign gjennomsnitt og median for 2, 3, 4, 5 og 36.» Hva må svaret ha med?', valg: [['Begge tallene (10 og 4) og en kommentar om forskjellen', 1], ['Bare gjennomsnittet', 0, 'Du skal sammenligne to ting, så begge må være med.'], ['Bare at de er ulike', 0, 'Du må også si hvor mye, og hvorfor.']], forkl: '«Sammenlign» betyr tall fra begge og en konklusjon.' },
        { q: 'Oppgaven sier: «Tolk grafen.» Hva er best?', valg: [['Si hva grafen viser, med tall og enheter, og hva det betyr', 1], ['Si at den går opp', 0, 'Det er for lite. Hva betyr det i situasjonen?'], ['Si hvilken farge den har', 0, 'Fargen sier ikke noe om hva grafen betyr.']], forkl: '«Tolk» betyr å si hva tallene betyr i virkeligheten.' },
        { q: 'Hvilket svar følger «Begrunn at 6, 8 og 10 danner en rettvinklet trekant»?', valg: [['6² + 8² = 36 + 64 = 100 = 10², så a² + b² = c²', 1], ['Fordi det er pene tall', 0, 'Pene tall er ikke en begrunnelse.'], ['Fordi 6 + 8 er mer enn 10', 0, 'Det sier bare at trekanten finnes, ikke at den er rettvinklet.']], forkl: 'En begrunnelse viser at regelen stemmer.' }
      ],
      utfordring: [
        { q: 'Oppgaven sier: «Vurder om gjennomsnittet er et godt mål for lønnen i dette firmaet.» Hva må du gjøre?', valg: [['Ta stilling, og begrunne med tall, for eksempel ved å sammenligne gjennomsnitt og median', 1], ['Bare regne ut gjennomsnittet', 0, 'Det er ikke en vurdering.'], ['Svare ja eller nei', 0, 'Uten begrunnelse er svaret ikke en vurdering.']], forkl: '«Vurder» krever en konklusjon og et argument.' },
        { q: 'Oppgaven sier: «Drøft om sannsynligheten for å få minst én sekser på to terningkast er 2/6.» Hva må svaret ha?', valg: [['Argumenter for og mot, en utregning, og en konklusjon', 1], ['Bare tallet 11/36', 0, 'Du må også drøfte påstanden om 2/6.'], ['Bare «nei»', 0, '«Drøft» krever at du veier argumenter.']], forkl: 'Når du drøfter, ser du på flere sider av saken, regner, og konkluderer.' },
        { q: 'Hva er forskjellen på «Vis at» og «Regn ut»?', valg: [['Ved «Vis at» er svaret gitt, og du viser hvorfor det stemmer. Ved «Regn ut» må du finne svaret.', 1], ['Ingen forskjell', 0, 'Les på nytt. De ber om ulike ting.'], ['«Vis at» betyr at du kan hoppe over utregningen', 0, 'Tvert imot: Utregningen er det som viser at det stemmer.']], forkl: 'Ved «Vis at» er svaret kjent. Utregningen er beviset.' }
      ]
    }
  };

  const begrunn = {
    pastand: 'Gjennomsnittet er ikke alltid et godt mål på hva som er typisk.',
    trapp: ['Fordi det kan være feil.', 'Fordi én veldig stor verdi kan trekke gjennomsnittet opp.', 'Gjennomsnittet bruker alle verdiene, også de ekstreme. I tallene 2, 3, 4, 5 og 36 er gjennomsnittet 10, men fire av fem tall er mindre enn 6. Derfor passer medianen (4) bedre som typisk verdi.'],
    startere: ['Jeg mener at … fordi …', 'Regelen sier at …, så …', 'Jeg kan vise det med tall: …', 'Det betyr at …', 'Derfor …', 'Et moteksempel er …', 'Det stemmer bare hvis …'],
    rangere: {
      rolig: [
        { pastand: 'Påstand: Sannsynligheten for å få en sekser på en terning er 1/6.', svar: [['Fordi det finnes 6 like sannsynlige utfall, og bare ett av dem er en sekser.', 1], ['Fordi seks er et fint tall.', 0, 'Det sier ingenting om sannsynlighet.'], ['Fordi jeg tror det.', 0, 'En begrunnelse må bygge på noe mer enn en følelse.']], forkl: 'Sannsynlighet = gunstige utfall : mulige utfall. Her er det 1 av 6.' },
        { pastand: 'Påstand: En trekant med sidene 3, 4 og 5 er rettvinklet.', svar: [['3² + 4² = 9 + 16 = 25, og 5² = 25. Altså stemmer a² + b² = c².', 1], ['Fordi 3, 4 og 5 er tall på rad.', 0, '4, 5 og 6 er også tall på rad, men 4² + 5² = 41 og 6² = 36. Tall på rad er ikke en grunn.'], ['Fordi den ser rettvinklet ut.', 0, 'Å se er ikke nok. Du må regne.']], forkl: 'Pytagoras sier at hvis a² + b² = c², er trekanten rettvinklet.' }
      ],
      vanlig: [
        { pastand: 'Påstand: Medianen av 3, 5, 6, 8 og 100 er 6.', svar: [['Tallene står i rekkefølge, og det midterste av fem tall er nummer 3, nemlig 6.', 1], ['Fordi 6 er nesten som gjennomsnittet.', 0, 'Gjennomsnittet er 24,4. Det er ikke nesten 6.'], ['Fordi 100 er så stort.', 0, 'Medianen påvirkes ikke av hvor stor den største verdien er.']], forkl: 'Medianen er den midterste verdien når tallene står i rekkefølge.' },
        { pastand: 'Påstand: Overskriften «Salget tredoblet seg» er misvisende hvis y-aksen starter på 50 og salget gikk fra 52 til 56.', svar: [['Aksen starter ikke på null, så små forskjeller ser store ut. Økningen er bare 4 av 52, under 8 %.', 1], ['Fordi grafer ikke er pålitelige.', 0, 'Grafer kan være pålitelige. Her er det aksen som forvrenger.'], ['Fordi tall kan lyve.', 0, 'Tallene stemmer. Det er framstillingen som er misvisende.']], forkl: 'Det beste svaret peker på hva som er galt (aksen) og viser det med tall (4 av 52).' }
      ],
      utfordring: [
        { pastand: 'Påstand: Sannsynligheten for to seksere på to terningkast er 1/36.', svar: [['1/6 · 1/6 = 1/36, fordi kastene ikke påvirker hverandre og vi ganger sannsynlighetene.', 1], ['Fordi 6 + 6 = 12.', 0, 'Å legge sammen antall øyne sier ikke noe om sannsynligheten for to seksere.'], ['Fordi to kast gir halve sannsynligheten.', 0, 'Halvparten av 1/6 ville vært 1/12. Ved uavhengige hendelser ganger du sannsynlighetene.']], forkl: 'Når to hendelser er uavhengige, er sannsynligheten for begge produktet av sannsynlighetene.' },
        { pastand: 'Påstand: Trekanten med sider 4, 5 og 7 er ikke rettvinklet.', svar: [['4² + 5² = 16 + 25 = 41, men 7² = 49. Siden 41 ≠ 49, stemmer ikke Pytagoras.', 1], ['Fordi 7 er et rart tall.', 0, 'Ingen tall er «rare» i matte. Du må vise det med regning.'], ['Fordi 4 + 5 er større enn 7.', 0, 'Det viser bare at trekanten finnes, ikke om den er rettvinklet.']], forkl: 'Bruk Pytagoras omvendt: hvis a² + b² ikke er lik c², er trekanten ikke rettvinklet.' }
      ]
    },
    skriv: {
      rolig: [
        { oppg: 'Begrunn at 4 er typetallet i 2, 4, 4, 5, 7.', svakt: 'Fordi det er 4.', modell: 'Typetallet er tallet som forekommer oftest. 4 forekommer to ganger, mens alle de andre tallene bare forekommer én gang. Derfor er 4 typetallet.', merk: 'Har du forklart hva typetall er, og brukt tallene?' },
        { oppg: 'Begrunn at sannsynligheten for å få en femmer på en terning er mindre enn 1/2.', svakt: 'Fordi det er lite.', modell: 'Sannsynligheten er 1/6, som er ca. 0,17. 1/2 er 0,5. Siden 0,17 er mindre enn 0,5, er sannsynligheten for en femmer mindre enn 1/2.', merk: 'Har du regnet om til samme form (desimaltall) og sammenlignet?' }
      ],
      vanlig: [
        { oppg: 'Begrunn at en trekant med sider 6, 8 og 10 er rettvinklet.', svakt: 'Fordi den ser sånn ut.', modell: '6² + 8² = 36 + 64 = 100, og 10² = 100. Siden summen av kvadratene på de to korteste sidene er lik kvadratet på den lengste siden, er trekanten rettvinklet.', merk: 'Har du brukt Pytagoras og vist tallene?' },
        { oppg: 'En avis sier at gjennomsnittslønnen er 50 000 kr, men de fleste tjener under 40 000. Forklar hvordan det kan stemme.', svakt: 'Det kan skje.', modell: 'Noen få veldig høye lønner kan dra gjennomsnittet opp. For eksempel: 9 personer tjener 35 000 kr og én tjener 185 000 kr. Gjennomsnittet er (9 · 35 000 + 185 000) : 10 = 50 000 kr, men ni av ti tjener bare 35 000 kr.', merk: 'Har du brukt et eksempel med tall som viser at det kan stemme?' }
      ],
      utfordring: [
        { oppg: 'Begrunn at sannsynligheten for minst én sekser på to terningkast ikke er 2/6.', svakt: 'Fordi det ikke er det.', modell: 'Sannsynligheten for ingen sekser i ett kast er 5/6. For to kast er den 5/6 · 5/6 = 25/36. Da er sannsynligheten for minst én sekser 1 − 25/36 = 11/36, som er ca. 0,31. 2/6 er det samme som 12/36, og det er for mye, fordi tilfellet «to seksere» da telles to ganger.', merk: 'Har du regnet ut riktig svar og forklart hva som er galt med 2/6?' },
        { oppg: 'Begrunn om 30 km/t er det samme som 30 m/s.', svakt: 'Nei.', modell: 'Nei. 30 km/t = 30 000 m per 3600 s, som er ca. 8,3 m/s. 30 m/s er mye raskere, nemlig 30 · 3,6 = 108 km/t.', merk: 'Har du regnet om enhetene og sammenlignet tallene?' }
      ]
    },
    sjekk: ['Jeg har sagt hva jeg mener.', 'Jeg har brukt tall eller et eksempel.', 'Jeg har brukt en regel eller et matematisk begrep.', 'Jeg har brukt ord som «fordi», «derfor» eller «siden».', 'En klassekamerat kan forstå sammenhengen.']
  };

  const diskusjon = {
    pastander: {
      rolig: [
        { pastand: 'Hvis du kaster en mynt fem ganger og får kron hver gang, er det større sjanse for mynt neste gang.', for: 'Enig. Det må jevne seg ut, så nå er det mer sannsynlig med mynt.', mot: 'Uenig. Mynten husker ikke tidligere kast. Sjansen er 1/2 hver gang.', forkl: 'Påstanden stemmer ikke. Hvert kast er uavhengig av de forrige. Sannsynligheten for mynt er 1/2, også etter fem kron.' },
        { pastand: 'Hypotenusen er alltid den lengste siden i en rettvinklet trekant.', for: 'Enig. Den ligger rett overfor den rette vinkelen, som er den største. I tillegg er c² = a² + b² større enn både a² og b².', mot: 'Kanskje en katet kan være lengst hvis den er lang nok?', forkl: 'Påstanden stemmer. c² = a² + b² er større enn både a² og b², så c er større enn både a og b.' }
      ],
      vanlig: [
        { pastand: 'Median er alltid et bedre mål enn gjennomsnitt.', for: 'Enig. Median blir ikke påvirket av ekstreme verdier.', mot: 'Uenig. Gjennomsnittet bruker alle verdiene, og det passer bra når verdiene ligger nær hverandre, for eksempel prøveresultater.', forkl: 'Ingen av dem er alltid best. Median passer bedre når noen få verdier er ekstreme (som høye lønner). Gjennomsnitt passer når verdiene ligger jevnt.' },
        { pastand: 'Hvis en graf viser en kraftig økning, betyr det at økningen er stor.', for: 'Enig. Grafen viser det jo tydelig.', mot: 'Uenig. Du må se på aksene. Hvis aksen starter på 50, kan en liten økning se stor ut.', forkl: 'Ikke nødvendigvis. Hvor aksen starter og hvilke enheter som brukes avgjør hvor stor økningen egentlig er.' }
      ],
      utfordring: [
        { pastand: 'En prisøkning på 5 %, etterfulgt av en nedgang på 5 %, gir samme pris som før.', for: 'Enig. +5 og −5 tar ut hverandre.', mot: 'Uenig. 100 kr + 5 % = 105 kr. 105 kr − 5 % = 105 · 0,95 = 99,75 kr. Det er ikke 100 kr.', forkl: 'Påstanden stemmer ikke. Prosentene regnes av ulike tall, og prisen blir litt lavere enn før (faktor 1,05 · 0,95 = 0,9975).' },
        { pastand: 'Hvis sannsynligheten for regn er 30 % i dag og 30 % i morgen, er sannsynligheten for regn begge dager 60 %.', for: 'Enig. 30 + 30 = 60.', mot: 'Uenig. For begge dager må vi gange: 0,3 · 0,3 = 0,09, altså 9 % (hvis dagene er uavhengige).', forkl: 'Påstanden stemmer ikke. Sannsynligheten for at begge skjer, er et produkt. Når dagene er uavhengige, blir den 0,3 · 0,3 = 0,09 = 9 %.' }
      ]
    },
    hvem: {
      rolig: [
        { q: 'Hva er medianen av 2, 9 og 4?', a: { navn: 'Mia', tekst: '«9, for det står i midten.»' }, b: { navn: 'Jonas', tekst: '«4. Jeg sorterte først: 2, 4, 9. Det midterste er 4.»' }, fasit: 'b', hintA: 'Mia har ikke sortert tallene først. Medianen er det midterste tallet etter at de står i rekkefølge.', forkl: 'Jonas har rett. Tallene må stå i rekkefølge: 2, 4, 9. Medianen er 4.' }
      ],
      vanlig: [
        { q: 'En pose har 3 røde og 7 blå kuler. Hva er sannsynligheten for å trekke en rød?', a: { navn: 'Sara', tekst: '«3/7, for det er 3 røde og 7 blå.»' }, b: { navn: 'Amir', tekst: '«3/10, for det er 3 røde av 10 kuler til sammen.»' }, fasit: 'b', hintA: 'Sara sammenligner røde med blå. Sannsynlighet er gunstige utfall delt på alle mulige.', forkl: 'Amir har rett. Alle mulige utfall er 10 kuler. Sannsynligheten er 3/10.' }
      ],
      utfordring: [
        { q: 'En bil kjører 60 km på 30 minutter. Hva er farten i km/t?', a: { navn: 'Emma', tekst: '«60 : 30 = 2 km/t.»' }, b: { navn: 'Noah', tekst: '«30 min er 0,5 t. 60 km : 0,5 t = 120 km/t.»' }, fasit: 'b', hintA: 'Emma deler km på minutter. Men farten skal være km per time, så tiden må gjøres om til timer.', forkl: 'Noah har rett. 30 min = 0,5 t, og 60 : 0,5 = 120 km/t. Emmas svar er i km per minutt, ikke km/t.' },
        { q: 'Trekanten har sider på 5, 12 og 13. Er den rettvinklet?', a: { navn: 'Lina', tekst: '«Nei, for 5 + 12 = 17, og det er ikke 13.»' }, b: { navn: 'Omar', tekst: '«Ja. 5² + 12² = 25 + 144 = 169, og 13² = 169.»' }, fasit: 'b', hintA: 'Lina legger sammen sidene. Pytagoras handler om kvadratene av sidene.', forkl: 'Omar har rett. Siden 5² + 12² = 13², er trekanten rettvinklet.' }
      ]
    },
    sparring: ['Hvorfor?', 'Hvordan vet du det?', 'Gjelder det alltid?', 'Kan du vise det med et eksempel?', 'Hva hvis tallene var andre?']
  };

  M.les.reg(9, { tekst: tekst, graf: graf, foring: foring, kommando: kommando, begrunn: begrunn, diskusjon: diskusjon });
})();
