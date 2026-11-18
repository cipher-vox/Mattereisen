/* Lærerveiledning 9. trinn */
(function () {
  const H = window.MATTE.H, L = H.LAERER;

  L('9/sammensatte-maleenheter', {
    tid: '3–4 timer',
    forkunn: ['Brøk og prosent', 'Omgjøring mellom enheter'],
    husk: ['«Per» betyr «for hver». 60 km/t er 60 km for hver time.', 'Fart = strekning ÷ tid. Strekning = fart · tid. Tid = strekning ÷ fart.', 'Regn om til samme enhet før du regner ut.'],
    feil: ['Å blande minutter og timer (1 t 30 min er 1,5 timer, ikke 1,30).', 'Å bruke feil formel.', 'Å glemme enheten i svaret.'],
    start: 'Hvem kommer først til bussholdeplassen: en som går 5 km/t i 12 minutter, eller en som sykler 15 km/t i 4 minutter? La elevene gjette først.',
    midt: 'Fart, pris per enhet og tetthet. Bruk Enhets-memory. La elevene finne «per»-størrelser i butikk og på nyhetene.',
    slutt: 'Utgangsbillett: «Regn om 90 km/t til m/s og forklar hva du gjorde.»',
    samtale: ['Hva er «per» i situasjonen?', 'Hvorfor deler vi på 3,6 når vi går fra km/t til m/s?', 'Når er gjennomsnittsfart misvisende?'],
    diff: { rolig: 'Hele timer og hele tall.', vanlig: 'Minutter, desimaltall og tekst.', utfordring: 'Flere deler av en reise og omregning mellom flere enheter.' },
    vurdering: 'Se etter at eleven velger riktig formel, regner med riktige enheter og vurderer om svaret er rimelig.'
  });

  L('9/figurer', {
    tid: '4–5 timer',
    forkunn: ['Vinkler og trekanter fra tidligere år'],
    husk: ['Vinkelsum: trekant 180°, firkant 360°.', 'Kongruent: helt lik (samme form og størrelse). Formlik: samme form, ulik størrelse.', 'Formlike figurer har like vinkler og proporsjonale sider.'],
    feil: ['Å tro at like vinkler gir kongruente figurer.', 'Å blande skalafaktor for lengde og areal.', 'Å feilidentifisere tilsvarende sider.'],
    start: 'Del ut to papirtrekanter. Er de like? Hvordan kan du være sikker uten å måle alt?',
    midt: 'Utforsk egenskaper ved firkanter (kvadrat, rektangel, parallellogram, rombe, trapes). Kongruens og formlikhet med GeoGebra. Bruk Skyggemåleren til applikasjoner.',
    slutt: 'Utgangsbillett: «Forklar forskjellen på kongruente og formlike trekanter med en tegning.»',
    samtale: ['Hva må være likt for at to trekanter er kongruente?', 'Er alle kvadrater formlike? Alle rektangler?', 'Hvordan finner du en manglende vinkel?'],
    diff: { rolig: 'Finn manglende vinkler og kjenn igjen figurer.', vanlig: 'Begrunn og bruk skalafaktor.', utfordring: 'Bevis og sammensatte figurer.' },
    vurdering: 'Se etter bruk av fagord og begrunnelser, ikke bare svaret.'
  });

  L('9/pytagoras', {
    tid: '4–5 timer',
    forkunn: ['Kvadratrøtter', 'Potenser', 'Rette trekanter'],
    husk: ['a² + b² = c². c er hypotenusen, den lengste siden.', 'Tegn alltid en skisse og merk hypotenusen.', 'For å finne en katet: a² = c² − b².'],
    feil: ['Å legge sammen sidene i stedet for kvadratene.', 'Å bruke formelen på en trekant uten rett vinkel.', 'Å glemme å ta kvadratroten til slutt.'],
    start: 'Lag en 3-4-5-trekant av et tau med knuter. Er hjørnet rett? Hvorfor brukte oldtidens byggmestere dette?',
    midt: 'Kvadrater på sidene (areal). Fra bevis til formel til praktiske oppgaver. Bruk Pinnebyggeren og Redningsstigen.',
    slutt: 'Utgangsbillett: «En stige på 6 m står 2 m ut fra veggen. Hvor høyt når den? Tegn og regn.»',
    samtale: ['Hvorfor er hypotenusen alltid lengst?', 'Hvordan vet vi at en trekant er rettvinklet?', 'Hvor kan du bruke Pytagoras i hverdagen?'],
    diff: { rolig: 'Pytagoreiske tripler (3-4-5, 5-12-13) og hypotenusen.', vanlig: 'Finn alle sider og praktiske oppgaver.', utfordring: 'Avstander i koordinatsystem og tredimensjonale figurer.' },
    vurdering: 'Se etter skisse, riktig valg av hypotenusen og vurdering av svaret.'
  });

  L('9/trekanter', {
    tid: '2–3 timer',
    forkunn: ['Trekanter', 'Ulikheter'],
    husk: ['To sider til sammen må være lengre enn den tredje.', 'Den tredje siden ligger mellom differansen og summen av de to andre.', 'Utforsk med pinner eller GeoGebra.'],
    feil: ['Å glemme ulikheten for alle tre kombinasjoner.', 'Å regne «lik» som lov (flat trekant).', 'Å blande trekantulikheten med Pytagoras.'],
    start: 'Gi hver gruppe tre sugerør i ulike lengder. Hvem kan lage en trekant? Samle data og se etter regelen.',
    midt: 'Systematiske prøver, så generalisering. Tegn i GeoGebra. Argumenter for en regel.',
    slutt: 'Utgangsbillett: «Kan 4, 5 og 10 være sidene i en trekant? Begrunn.»',
    samtale: ['Hvorfor må to sider til sammen være lengre enn den tredje?', 'Hva skjer når summen er lik den tredje siden?', 'Hvor mange hele lengder kan den tredje siden ha?'],
    diff: { rolig: 'Sjekk om tre lengder fungerer.', vanlig: 'Finn grenser for tredje side.', utfordring: 'Klassifiser trekanter (spiss, rett, stump) fra sidene.' },
    vurdering: 'Se etter om eleven formulerer og begrunner regelen.'
  });

  L('9/formlikhet-praksis', {
    tid: '4 timer',
    forkunn: ['Formlikhet', 'Pytagoras'],
    husk: ['Målestokk 1 : n betyr at 1 cm på tegningen er n cm i virkeligheten.', 'Lengder skaleres med k, areal med k², volum med k³.', 'Samtidige skygger gir formlike trekanter.'],
    feil: ['Å skalere areal med k i stedet for k².', 'Å regne om enheter feil (cm til m til km).', 'Å sammenligne feil sider i formlike trekanter.'],
    start: 'Mål skyggen til en elev og til skolebygget/flaggstanga ute. Hvor høyt er bygget?',
    midt: 'Kart og målestokk, skyggemåling og hva som skjer med areal/volum når vi forstørrer. Bruk Skyggemåleren.',
    slutt: 'Utgangsbillett: «Alle lengder dobles. Hva skjer med areal og volum? Vis med en terning.»',
    samtale: ['Hvorfor blir volumet 8 ganger så stort?', 'Hvordan kan en liten modell brukes til å finne en stor lengde?', 'Hva skjer med kostnaden til maling hvis du dobler størrelsen på et rom?'],
    diff: { rolig: 'Målestokk og skalering av lengder.', vanlig: 'Skygger og areal.', utfordring: 'Volum og endrede forutsetninger.' },
    vurdering: 'Se etter om eleven skiller mellom lengde-, areal- og volumsskalering.'
  });

  L('9/overflate-volum', {
    tid: '5 timer',
    forkunn: ['Areal', 'Omkrets', 'Potenser'],
    husk: ['Prisme og sylinder: V = G · h.', 'Pyramide og kjegle: V = G · h ÷ 3.', 'Kule: V = 4/3 · π · r³. 1 liter = 1000 cm³.'],
    feil: ['Å blande volum (cm³) og overflate (cm²).', 'Å glemme ÷ 3 for pyramide og kjegle.', 'Å bruke diameter i stedet for radius.'],
    start: 'Vis to pakker som ser ulike ut. Hvilken rommer mest? La elevene gjette, deretter måle og regne.',
    midt: 'Nett og overflate for prisme og sylinder, volum med G · h, så pyramide, kjegle og kule. Bruk Brusboks.',
    slutt: 'Utgangsbillett: «Regn volum og overflate av en kasse 4 · 3 · 2 cm.»',
    samtale: ['Hvorfor trenger vi ÷ 3 for pyramiden?', 'Når er overflate viktigere enn volum?', 'Hvorfor lager brusbokser sylinder og ikke kasse?'],
    diff: { rolig: 'Kasse og terning.', vanlig: 'Prisme, sylinder og praktiske oppgaver.', utfordring: 'Kule, kjegle og sammensatte legemer.' },
    vurdering: 'Se etter riktig enhet, riktig formel og begrunnelse av valg.'
  });

  L('9/statistikk-media', {
    tid: '3–4 timer',
    forkunn: ['Diagrammer', 'Prosent'],
    husk: ['Se på aksene: starter de på 0?', 'Spør: Hvem er spurt? Hvor mange? Hva sammenlignes?', 'Samvariasjon er ikke det samme som årsak.'],
    feil: ['Å tro at høy søyle alltid betyr stor forskjell.', 'Å ikke sjekke utvalgsstørrelse.', 'Å blande prosent og prosentpoeng.'],
    start: 'Vis to grafer av samme tall med ulik y-akse. Hva ser du? Hvilken er mest ærlig?',
    midt: 'Samle eksempler fra aviser og nettsider. Bruk Data-smeden. La elevene lage en misvisende og en ærlig graf av samme tall.',
    slutt: 'Utgangsbillett: «Gi to spørsmål du ville stilt til en graf i en avis.»',
    samtale: ['Hvem tjener på at grafen ser slik ut?', 'Hva mangler i fremstillingen?', 'Hvordan ville du vist tallene ærlig?'],
    diff: { rolig: 'Les enkle diagrammer og se på aksene.', vanlig: 'Vurder framstillinger.', utfordring: 'Lag og forsvar egne framstillinger.' },
    vurdering: 'Se etter kritisk blikk: spør eleven hvorfor, ikke bare hva.'
  });

  L('9/sentralmal-spredning', {
    tid: '4 timer',
    forkunn: ['Gjennomsnitt fra tidligere år', 'Tabeller og diagrammer'],
    husk: ['Gjennomsnitt = summen ÷ antall.', 'Median = midterste tall (sorter først).', 'Variasjonsbredde = største − minste. Kvartiler deler data i fire.'],
    feil: ['Å glemme å sortere før median.', 'Å forveksle typetall og median.', 'Å regne gjennomsnitt uten å telle riktig antall.'],
    start: 'Samle data i klassen (f.eks. skonummer eller antall søsken). Hvilket tall beskriver klassen best?',
    midt: 'Sentralmål og spredning på egne data. Sammenlign to klasser eller to datasett. Bruk Data-smeden.',
    slutt: 'Utgangsbillett: «Gi et datasett med gjennomsnitt 5 og median 4.»',
    samtale: ['Når er median bedre enn gjennomsnitt?', 'Hva forteller spredningen som sentralmål ikke gjør?', 'Hva skjer med målene hvis du fjerner et ekstremtall?'],
    diff: { rolig: 'Små datasett med hele tall.', vanlig: 'Egne data og sammenlikning.', utfordring: 'Kvartiler, boksplott og utliggere.' },
    vurdering: 'Se etter om eleven kan velge og begrunne et sentralmål.'
  });

  L('9/sannsynlighet', {
    tid: '4 timer',
    forkunn: ['Brøk og prosent'],
    husk: ['Sannsynlighet = gunstige ÷ mulige, alltid mellom 0 og 1.', 'To uavhengige hendelser: gang sannsynlighetene.', 'Valgtre hjelper deg å holde oversikt.'],
    feil: ['Å tro at forrige utfall påvirker neste kast (gamblers fallacy).', 'Å legge sammen i stedet for å gange.', 'Å glemme at utfallene må være like sannsynlige.'],
    start: 'Er det like sannsynlig å få 5 kron på rad som kron, mynt, kron, mynt, kron? La elevene gjette og begrunne.',
    midt: 'Terning og mynt, så to kast, valgtre og uten tilbakelegging. Bruk Sjansejegeren.',
    slutt: 'Utgangsbillett: «Tegn valgtre for to myntkast og finn sannsynligheten for to kron.»',
    samtale: ['Hva betyr «rettferdig» i et spill?', 'Hvorfor blir sannsynligheten mindre når vi gjentar?', 'Hva er forskjellen på med og uten tilbakelegging?'],
    diff: { rolig: 'Ett utfall og enkle brøker.', vanlig: 'To kast og valgtre.', utfordring: 'Uten tilbakelegging og betinget sannsynlighet.' },
    vurdering: 'Se etter bruk av valgtre og riktig begrunnelse av regelen.'
  });

  L('9/simulering', {
    tid: '3–4 timer',
    forkunn: ['Sannsynlighet', 'Grunnleggende Python (løkker, variabler)'],
    husk: ['random.randint(1, 6) gir et tilfeldig heltall fra 1 til 6.', 'En løkke gjentar forsøket.', 'Relativ frekvens = antall gunstige ÷ antall forsøk.'],
    feil: ['Å glemme import random.', 'Å tro at 10 kast er nok til å se sannsynligheten.', 'Å glemme å nullstille telleren.'],
    start: 'Kast en terning 12 ganger. Hvor mange seksere? Samle klassens resultater. Nærmer det seg 1/6?',
    midt: 'Skriv en liten simulering i Python, øk antall forsøk og se at relativ frekvens nærmer seg sannsynligheten. Se verktøykurset i Python.',
    slutt: 'Utgangsbillett: «Hva skjer med resultatet hvis vi kaster 10 000 ganger i stedet for 100?»',
    samtale: ['Hvorfor stemmer ikke resultatet helt?', 'Når er simulering bedre enn å regne?', 'Hva forteller loven om store tall oss?'],
    diff: { rolig: 'Les kode og forutsi resultat.', vanlig: 'Endre og kjør ferdig kode.', utfordring: 'Skriv egen simulering.' },
    vurdering: 'Se etter om eleven forklarer koden og tolker resultatet.'
  });
})();
