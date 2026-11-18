/* ============================================================
   Mattereisen – oversikt over trinn og temaer
   Her styrer du hva som vises på forsiden.
   klar:true  = temaet har innhold og kan åpnes
   klar:false = vises som «Snart»
   ============================================================ */
window.MATTE = window.MATTE || {};
MATTE.siteName = 'Mattereisen';

MATTE.curriculum = [
  {
    trinn: 8, tittel: '8. trinn', farge: 't8', ikon: '🧭',
    undertittel: 'Potenser, algebra, likninger og funksjoner',
    kompetansemal: [
      'regne med potenser og kvadratrøtter og forklare framgangsmåter og resultater',
      'bruke kommutative, assosiative og distributive egenskaper til å utvikle og kommunisere strategier for hoderegning og skriftlig regning',
      'beskrive og utforske faktorisering og primtallsfaktorisering og bruke det i brøkregning',
      'utforske og generalisere geometriske mønstre og tallmønstre med egne ord og algebraisk',
      'lage og forklare regneuttrykk med tall, variabler og konstanter knyttet til praktiske situasjoner',
      'lage og løse likninger knyttet til praktiske situasjoner og kritisk vurdere løsninger',
      'bruke ulike strategier for å løse ulikheter og vurdere om løsninger er gyldige',
      'beskrive, sammenligne og utforske funksjoner knyttet til praktiske situasjoner',
      'bruke situasjoner, tabeller, grafer og uttrykk til å representere funksjoner og vise sammenhenger mellom representasjonene',
      'utforske hvordan algoritmer kan skapes, testes og forbedres ved hjelp av programmering'
    ],
    temaer: [
      { id: 'negative-tall', tittel: 'Negative tall', ikon: '🌡️', klar: true, repetisjon: true,
        kort: 'Repetisjon fra 7. trinn: grunnmuren for alt som kommer.' },
      { id: 'regneregler', tittel: 'Regneregler og hoderegning', ikon: '🧠', dekker: [2], klar: true,
        kort: 'Bytte om, gruppere og dele opp. Smarte strategier for å regne i hodet.' },
      { id: 'faktorisering', tittel: 'Faktorisering og primtall', ikon: '🌳', dekker: [3], klar: true,
        kort: 'Primtall, faktortrær, felles faktorer og brøkregning.' },
      { id: 'potenser', tittel: 'Potenser', ikon: '⚡', dekker: [1], klar: true,
        kort: 'Gjentatt gange, tierpotenser, regneregler og standardform.' },
      { id: 'kvadratrot', tittel: 'Kvadratrøtter', ikon: '√', dekker: [1], klar: true,
        kort: 'Kvadrattall, røtter og hva som ligger mellom.' },
      { id: 'monstre', tittel: 'Mønstre og generalisering', ikon: '🔷', dekker: [4], klar: true,
        kort: 'Figurtall og tallmønstre: fra ord til formel.' },
      { id: 'uttrykk', tittel: 'Regneuttrykk og variabler', ikon: '🔤', dekker: [5], klar: true,
        kort: 'Bokstaver som tall. Lag og forklar uttrykk fra hverdagen.' },
      { id: 'ligninger', tittel: 'Likninger', ikon: '⚖️', dekker: [6], klar: true,
        kort: 'Løs likninger med vekt-modellen og sjekk at svaret gir mening.' },
      { id: 'ulikheter', tittel: 'Ulikheter', ikon: '↔️', dekker: [7], klar: true,
        kort: 'Mer enn, mindre enn og alle løsningene på tallinja.' },
      { id: 'funksjoner', tittel: 'Hva er en funksjon?', ikon: '🎛️', dekker: [8], klar: true,
        kort: 'Regnemaskinen: inn med x, ut med y. Beskriv og sammenlign.' },
      { id: 'representasjoner', tittel: 'Funksjoner: tabell, graf og uttrykk', ikon: '📈', dekker: [8, 9], klar: true,
        kort: 'Fire måter å vise det samme på, og hvordan de henger sammen.' },
      { id: 'programmering', tittel: 'Algoritmer og programmering', ikon: '🤖', dekker: [10], klar: true,
        kort: 'Lag, test og forbedre algoritmer. Første møte med kode.' }
    ]
  },
  {
    trinn: 9, tittel: '9. trinn', farge: 't9', ikon: '🧭',
    undertittel: 'Geometri, statistikk og sannsynlighet',
    kompetansemal: [
      'lage og løse problemer som handler om sammensatte måleenheter',
      'utforske egenskapene ved ulike todimensjonale figurer og forklare begrepene formlikhet og kongruens',
      'bruke formlikhet og Pytagoras’ læresetning til utforsking av praktiske situasjoner',
      'utforske, beskrive og argumentere for sammenhenger mellom sidelengdene i trekanter',
      'utforske og argumentere for hvordan det å endre forutsetninger i geometriske problemstillinger påvirker løsninger både praktisk og algebraisk',
      'bruke og argumentere for formler for overflateareal og volum av tredimensjonale figurer',
      'tolke og kritisk vurdere statistiske framstillinger fra media og lokalsamfunnet',
      'regne på sentralmål og spredningsmål i egne og reelle datasett og bruke resultatene til å beskrive dataene',
      'sammenligne og argumentere for hvordan framstillinger av tall og data kan brukes for å fremme ulike synspunkter',
      'beregne og vurdere sannsynlighet i statistikk og spill',
      'simulere utfall i tilfeldige forsøk og beregne sannsynligheten for at noe skal inntreffe, ved å bruke programmering'
    ],
    temaer: [
      { id: 'sammensatte-maleenheter', tittel: 'Sammensatte måleenheter', ikon: '🚗', dekker: [1], klar: true,
        kort: 'km/t, kr/kg, g/cm³ og andre «per»-størrelser.' },
      { id: 'figurer', tittel: 'Figurer, formlikhet og kongruens', ikon: '🔶', dekker: [2], klar: true,
        kort: 'Egenskaper ved firkanter og trekanter. Like og lignende figurer.' },
      { id: 'pytagoras', tittel: 'Pytagoras’ læresetning', ikon: '🔺', dekker: [3], klar: true,
        kort: 'Rette trekanter, avstander og hva som er rett vinkel.' },
      { id: 'trekanter', tittel: 'Sidene i en trekant', ikon: '📐', dekker: [4], klar: true,
        kort: 'Hvilke tre lengder kan bli en trekant? Utforsk og argumenter.' },
      { id: 'formlikhet-praksis', tittel: 'Formlikhet i praksis og endrede forutsetninger', ikon: '🔍', dekker: [3, 5], klar: true,
        kort: 'Målestokk, skygger og hva som skjer når vi gjør figurer større.' },
      { id: 'overflate-volum', tittel: 'Overflate og volum', ikon: '📦', dekker: [6], klar: true,
        kort: 'Prisme, sylinder, pyramide, kjegle og kule.' },
      { id: 'statistikk-media', tittel: 'Statistikk i media', ikon: '📰', dekker: [7, 9], klar: true,
        kort: 'Er grafen ærlig? Lær å se hvordan tall kan vinkles.' },
      { id: 'sentralmal-spredning', tittel: 'Sentralmål og spredning', ikon: '📊', dekker: [8], klar: true,
        kort: 'Gjennomsnitt, median, typetall, variasjonsbredde og kvartiler.' },
      { id: 'sannsynlighet', tittel: 'Sannsynlighet', ikon: '🎲', dekker: [10], klar: true,
        kort: 'Utfall, valgtre, spill og hva som er rettferdig.' },
      { id: 'simulering', tittel: 'Simulering med programmering', ikon: '🎰', dekker: [11], klar: true,
        kort: 'La datamaskinen kaste terning tusen ganger.' }
    ]
  },
  {
    trinn: 10, tittel: '10. trinn', farge: 't10', ikon: '🧭',
    undertittel: 'Algebra, funksjoner, økonomi og modellering',
    kompetansemal: [
      'bruke regneregler og generalisere sammenhenger algebraisk',
      'utforske kvadratsetningene geometrisk og algebraisk og bruke kvadratsetningene som regnestrategier',
      'lage, løse og forklare likningssett knyttet til praktiske situasjoner',
      'utforske og sammenligne egenskaper ved lineære funksjoner, eksponentialfunksjoner, brøkfunksjoner og andregradsfunksjoner ved å bruke digitale verktøy',
      'forklare begrepet endring per enhet og regne ut stigningstallet til lineære funksjoner',
      'utforske og forklare sammenhengen mellom konstant prosentvis endring, vekstfaktor og eksponentialfunksjoner',
      'hente ut og tolke relevant informasjon og reflektere over mulige konsekvenser ved kjøp og salg, renter på sparing, lån og kredittkjøp',
      'planlegge, utføre og presentere et utforskende arbeid knyttet til personlig økonomi',
      'modellere situasjoner, presentere resultatene og vurdere hvor gyldige modellene er',
      'utforske matematiske egenskaper og sammenhenger ved å bruke programmering',
      'lese og forklare tekstbasert programkode i Python'
    ],
    temaer: [
      { id: 'algebra', tittel: 'Algebra og generalisering', ikon: '🔤', dekker: [1], klar: true,
        kort: 'Regneregler, forenkling og å vise at noe alltid stemmer.' },
      { id: 'kvadratsetninger', tittel: 'Kvadratsetningene', ikon: '🟪', dekker: [2], klar: true,
        kort: 'Se dem som arealer. Bruk dem som smarte regnetriks.' },
      { id: 'ligningssett', tittel: 'Likningssett', ikon: '⚔️', dekker: [3], klar: true,
        kort: 'To ukjente, to likninger: grafisk og med regning.' },
      { id: 'stigningstall', tittel: 'Endring per enhet og stigningstall', ikon: '📏', dekker: [5], klar: true,
        kort: 'Hvor bratt? Fra fart og pris til stigningstall.' },
      { id: 'funksjonstyper', tittel: 'Funksjonstyper', ikon: '🎢', dekker: [4], klar: true,
        kort: 'Lineære, eksponentielle, brøk- og andregradsfunksjoner.' },
      { id: 'vekstfaktor', tittel: 'Prosentvis endring og vekstfaktor', ikon: '％', dekker: [6], klar: true,
        kort: 'Vekstfaktor, eksponentiell vekst og forfall.' },
      { id: 'kjop-sparing-lan', tittel: 'Kjøp, sparing og lån', ikon: '💳', dekker: [7], klar: true,
        kort: 'Renter, rentes rente, lån og kredittkjøp. Hva koster det egentlig?' },
      { id: 'okonomi-prosjekt', tittel: 'Utforskende arbeid: din økonomi', ikon: '💰', dekker: [8], klar: true,
        kort: 'Planlegg, regn ut og presenter et eget økonomiprosjekt.' },
      { id: 'modellering', tittel: 'Modellering', ikon: '🧪', dekker: [9], klar: true,
        kort: 'Lag en modell, test den og vurder hvor godt den passer.' },
      { id: 'python', tittel: 'Programmering og Python', ikon: '🐍', dekker: [10, 11], klar: true,
        kort: 'Les og forklar Python-kode, og utforsk matte med programmering.' }
    ]
  }
];

MATTE.verktoy = [
  { id: 'python', tittel: 'Python fra scratch', ikon: '🐍',
    kort: 'Skriv din første kode, lag variabler, løkker og funksjoner, og bruk Python til å løse matteoppgaver.' },
  { id: 'geogebra', tittel: 'GeoGebra fra scratch', ikon: '📐',
    kort: 'Tegn punkter, linjer og grafer. Utforsk geometri og funksjoner steg for steg.' },
  { id: 'regneark', tittel: 'Regneark (Excel) fra scratch', ikon: '🧮',
    kort: 'Celler, formler og diagrammer. Lag tabeller og grafer til matteoppgaver.' }
];
