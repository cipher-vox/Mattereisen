/* ============================================================
   Jeopardy: finn spørsmålet
   Hver rute har opplysninger (tekst og/eller graf) og et svar. Oppgaven er å finne spørsmålet som passer.
   C(poeng, opplysninger, svar, riktig spørsmål, tre feil spørsmål, annen mulig formulering, { graf, tips })
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;
  M.les = M.les || {};
  M.les.jeopardy = {};
  const C = (p, tekst, svar, ok, feil, alt, o) => Object.assign({ p: p, tekst: tekst, svar: svar, ok: ok, feil: feil, alt: alt || '' }, o || {});

  /* grafer som brukes i rutene */
  const FRUKT = { type: 'sol', tittel: 'Favorittfrukt i 8A', xTittel: 'Frukt', yTittel: 'Antall elever', kat: ['Eple', 'Banan', 'Pære', 'Appelsin'], verdier: [8, 12, 5, 7], yMin: 0, yMax: 14, steg: 2 };
  const TEMP = { type: 'linje', tittel: 'Temperatur i løpet av en dag', xTittel: 'Klokkeslett', yTittel: 'Temperatur (°C)', kat: ['06', '09', '12', '15', '18', '21'], verdier: [-3, 0, 4, 6, 2, -1], yMin: -4, yMax: 8, steg: 2 };
  const SPAR = { type: 'linje', tittel: 'Mias sparing', xTittel: 'Måned', yTittel: 'Sparte penger (kr)', kat: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun'], verdier: [200, 350, 500, 650, 800, 950], yMin: 0, yMax: 1000, steg: 200 };
  const SYKKEL = { type: 'sol', tittel: 'Elever som sykler til skolen', xTittel: 'År', yTittel: 'Antall elever', kat: ['2022', '2023', '2024'], verdier: [52, 54, 56], yMin: 50, yMax: 58, steg: 2 };
  const TERN = { type: 'sol', tittel: 'Resultater fra 30 terningkast', xTittel: 'Antall øyne', yTittel: 'Antall kast', kat: ['1', '2', '3', '4', '5', '6'], verdier: [4, 6, 5, 7, 3, 5], yMin: 0, yMax: 8, steg: 2 };
  const KARAK = { type: 'sol', tittel: 'Karakterer på prøven', xTittel: 'Karakter', yTittel: 'Antall elever', kat: ['1', '2', '3', '4', '5', '6'], verdier: [2, 3, 4, 8, 5, 3], yMin: 0, yMax: 8, steg: 2 };
  const TAXI = { type: 'linje', tittel: 'Pris for taxitur', xTittel: 'Kjørt strekning (km)', yTittel: 'Pris (kr)', kat: ['0', '2', '4', '6', '8'], verdier: [50, 90, 130, 170, 210], yMin: 0, yMax: 250, steg: 50 };
  const GJELD = { type: 'linje', tittel: 'Restgjeld på lån', xTittel: 'År', yTittel: 'Restgjeld (tusen kr)', kat: ['0', '1', '2', '3', '4', '5'], verdier: [50, 40, 30, 20, 10, 0], yMin: 0, yMax: 50, steg: 10 };
  const BALL = { type: 'linje', tittel: 'Høyden til ballen', xTittel: 'Tid (sekunder)', yTittel: 'Høyde (meter)', kat: ['0', '1', '2', '3', '4'], verdier: [0, 15, 20, 15, 0], yMin: 0, yMax: 20, steg: 5 };
  const BAKT = { type: 'linje', tittel: 'Antall bakterier', xTittel: 'Tid (timer)', yTittel: 'Antall bakterier', kat: ['0', '1', '2', '3', '4'], verdier: [100, 200, 400, 800, 1600], yMin: 0, yMax: 1600, steg: 400 };

  M.les.jeopardy[8] = { kategorier: [
    { navn: 'Tekst og tall', ikon: '🧾', rader: [
      C(100, 'Ola kjøper epler. Prisen er 25 kr per kg, og han kjøper 3 kg.', '75 kr', 'Hva må Ola betale?', ['Hva koster 1 kg epler?', 'Hvor mye får Ola igjen av 100 kr?', 'Hvor mange kr mer koster 3 kg enn 1 kg?'], 'Hva koster 3 kg epler?'),
      C(200, 'Mia har 100 kr. Hun kjøper 3 sjokolader til 12 kr hver. Hun liker best melkesjokolade.', '64 kr', 'Hvor mye har Mia igjen?', ['Hva betalte Mia for sjokoladene?', 'Hva koster én sjokolade?', 'Hvor mange sjokolader kunne hun kjøpt for 100 kr?'], 'Hvor mange kroner har Mia etter handelen?'),
      C(300, 'Et abonnement koster 99 kr fast og 2 kr per SMS. Selskapet ble startet i 2004. Per sender 15 SMS.', '129 kr', 'Hva koster abonnementet for Per?', ['Hva koster 15 SMS alene?', 'Hva koster én SMS?', 'Hvor mange SMS kan han sende for 129 kr?'], 'Hva må Per betale totalt?', { tips: 'Husk at noe betales bare én gang, og noe betales for hver SMS.' }),
      C(400, 'På en skole er det 240 elever. 35 % går i 8. klasse. Skolen ble bygget i 1987. Av elevene i 8. klasse vil 25 % ha leksehjelp.', '21 elever', 'Hvor mange elever i 8. klasse vil ha leksehjelp?', ['Hvor mange elever går i 8. klasse?', 'Hvor mange prosent av alle elevene vil ha leksehjelp?', 'Hvor mange elever går ikke i 8. klasse?'], 'Hvor mange 8.-klassinger vil ha leksehjelp?', { tips: 'Det er to prosenter, og den andre gjelder bare en del av elevene.' })
    ] },
    { navn: 'Negative tall', ikon: '🌡️', rader: [
      C(100, 'Klokka 08 er det −6 °C. Til lunsj har temperaturen steget med 9 grader.', '3 °C', 'Hva er temperaturen til lunsj?', ['Hvor mange grader har temperaturen steget?', 'Hva var temperaturen klokka 08?', 'Hvor mange grader er det mellom −6 og 0?'], 'Hvor varmt er det til lunsj?'),
      C(200, 'Mandag var det −12 °C. Tirsdag var det 5 grader kaldere. Onsdag var det 8 grader varmere enn tirsdag. Hun hadde med termos.', '−9 °C', 'Hva var temperaturen onsdag?', ['Hva var temperaturen tirsdag?', 'Hvor mange grader varmere var onsdag enn mandag?', 'Hvor mange grader kaldere var tirsdag enn mandag?'], 'Hvor kaldt var det onsdag?'),
      C(300, 'En ubåt er 25 m under havoverflaten. Den stiger 10 m.', '−15 m', 'Hvilken høyde har ubåten nå i forhold til havoverflaten?', ['Hvor mange meter steg den?', 'Hvor dypt var ubåten før den steg?', 'Hvor mange meter er det fra ubåten til havbunnen?'], 'Hvor dypt er ubåten nå?'),
      C(400, 'Anna skylder 50 kr (−50 kr på konto). Hun får 200 kr i lommepenger og kjøper en bok til 80 kr.', '70 kr', 'Hvor mye har Anna på kontoen etter bokkjøpet?', ['Hvor mye har hun etter lommepengene?', 'Hvor mye bruker hun totalt?', 'Hvor mye skyldte hun før?'], 'Hva er saldoen etter at hun har kjøpt boken?', { tips: 'Start på −50 og legg til og trekk fra i riktig rekkefølge.' })
    ] },
    { navn: 'Likninger og uttrykk', ikon: '🟰', rader: [
      C(100, 'Jonas tenker på et tall. Ganger han det med 4 og legger til 3, får han 23.', '5', 'Hvilket tall tenker Jonas på?', ['Hva er summen av 4, 3 og 23?', 'Hva får Jonas hvis han tenker på 4?', 'Hva er 23 delt på 4?'], 'Hva er tallet til Jonas?'),
      C(200, 'Per er 3 år eldre enn Lise. Sammen er de 35 år. Per bor i Bergen.', '16 år', 'Hvor gammel er Lise?', ['Hvor gammel er Per?', 'Hvor mange år er forskjellen mellom dem?', 'Hvor gammel er Per om 3 år?'], 'Hva er alderen til Lise?'),
      C(300, 'Et rektangel er 3 cm bredere enn det er høyt. Omkretsen er 26 cm.', '8 cm', 'Hvor bredt er rektangelet?', ['Hvor høyt er rektangelet?', 'Hva er arealet?', 'Hva er halve omkretsen?'], 'Hva er bredden?', { tips: 'La høyden være x. Da er bredden x + 3.' }),
      C(400, 'En tallmaskin gir 2x + 7 ut. En annen maskin gir 3x − 5.', 'x = 12', 'For hvilken verdi av x gir de to maskinene samme tall?', ['Hva gir den første maskinen når x = 5?', 'Hva er forskjellen på maskinene når x = 12?', 'Hva er 2x + 3x når x = 12?'], 'Løs likningen 2x + 7 = 3x − 5.')
    ] },
    { navn: 'Grafer og tabeller', ikon: '📈', rader: [
      C(100, 'Grafen viser hvilken frukt elevene i 8A liker best.', '12 elever', 'Hvor mange elever valgte banan?', ['Hvor mange elever valgte eple?', 'Hvor mange elever svarte til sammen?', 'Hvor mange flere valgte banan enn pære?'], 'Hvor mange liker banan best?', { graf: FRUKT }),
      C(200, 'Grafen viser temperaturen gjennom en vinterdag.', '7 grader', 'Hvor mange grader steg temperaturen fra klokka 06 til klokka 12?', ['Hva er forskjellen mellom høyeste og laveste temperatur?', 'Hva var temperaturen klokka 12?', 'Hvor mange grader steg temperaturen fra 06 til 15?'], 'Hvor mye varmere var det klokka 12 enn klokka 06?', { graf: TEMP }),
      C(300, 'Mia sparer til en ny telefon. Grafen viser sparingen ved slutten av hver måned. Hun fortsetter å spare like mye hver måned.', '1250 kr', 'Hvor mye har Mia spart etter 8 måneder?', ['Hvor mye har hun spart i juni?', 'Hvor mye sparer hun hver måned?', 'Hvor mye har hun spart i juli?'], 'Hva har Mia spart ved slutten av august?', { graf: SPAR, tips: 'Finn først hvor mye hun sparer per måned.' }),
      C(400, 'En skole sier: «Se hvor mye flere som sykler!» Grafen viser antall elever som sykler.', 'ca. 8 %', 'Hvor mange prosent økte antallet elever som sykler fra 2022 til 2024?', ['Hvor mange elever syklet i 2024?', 'Hvor mange flere syklet i 2024 enn i 2022?', 'Hvor mange prosent av alle elevene sykler?'], 'Hva er den prosentvise økningen fra 2022 til 2024?', { graf: SYKKEL, tips: 'Se hvor aksen starter. Regn økningen delt på det du startet med.' })
    ] }
  ] };

  M.les.jeopardy[9] = { kategorier: [
    { navn: 'Fart og enheter', ikon: '⏱️', rader: [
      C(100, 'En syklist sykler 30 km på 2 timer.', '15 km/t', 'Hva er farten til syklisten?', ['Hvor langt sykler hun på 1 time hvis farten dobles?', 'Hvor lang tid bruker hun?', 'Hvor langt sykler hun?'], 'Hvor fort sykler hun?'),
      C(200, 'En bil kjører 150 km på 1 time og 30 minutter. Bilen er rød.', '100 km/t', 'Hva er gjennomsnittsfarten til bilen?', ['Hvor mange minutter er turen?', 'Hvor mange timer er 1 time og 30 minutter?', 'Hvor langt kjører bilen?'], 'Hvor fort kjører bilen i gjennomsnitt?'),
      C(300, 'Farten til en bil er 90 km/t. Bilen er blå.', '60 km', 'Hvor langt kjører bilen på 40 minutter?', ['Hvor langt kjører bilen på 1 time?', 'Hvor lang tid tar 60 km?', 'Hva er farten i m/s?'], 'Hva er strekningen bilen kjører på 40 minutter?', { tips: '40 minutter er ikke 0,40 timer.' }),
      C(400, 'En bonde har 1,2 tonn poteter. Han selger dem for 12 kr per kg. Kostnadene var 3000 kr.', '11 400 kr', 'Hva ble overskuddet?', ['Hva ble inntekten?', 'Hvor mange kg poteter har han?', 'Hva er prisen per tonn?'], 'Hvor mye tjente bonden etter at kostnadene er trukket fra?', { tips: 'Gjør om tonn til kg før du regner.' })
    ] },
    { navn: 'Pytagoras', ikon: '📐', rader: [
      C(100, 'En rettvinklet trekant har kateter på 6 cm og 8 cm.', '10 cm', 'Hvor lang er hypotenusen?', ['Hva er arealet?', 'Hva er omkretsen?', 'Hvor mange cm lengre er den lengste kateten enn den korteste?'], 'Hva er lengden til den lengste siden?'),
      C(200, 'En stige er 5 m lang og står 3 m ut fra en vegg. Stigen er laget av aluminium.', '4 m', 'Hvor høyt opp på veggen når stigen?', ['Hvor lang er stigen?', 'Hvor langt er det fra veggen til foten av stigen?', 'Hvor høyt når stigen hvis foten står 4 m ut?'], 'Hvor høyt oppe er toppen av stigen?'),
      C(300, 'En trekant har sider på 5 cm, 12 cm og 13 cm.', 'Ja', 'Er trekanten rettvinklet?', ['Hva er hypotenusen?', 'Hva er omkretsen?', 'Hva er den korteste siden?'], 'Kan vi bruke Pytagoras på denne trekanten?', { tips: 'Spørsmålet har ja eller nei som svar.' }),
      C(400, 'En rektangulær hage er 12 m lang og 5 m bred.', '13 m', 'Hvor lang er diagonalen?', ['Hva er omkretsen?', 'Hva er arealet?', 'Hvor mye lengre er hagen enn den er bred?'], 'Hva er avstanden mellom to motstående hjørner?')
    ] },
    { navn: 'Statistikk og grafer', ikon: '📊', rader: [
      C(100, 'Mia kastet en terning 30 ganger. Grafen viser hvor mange ganger hun fikk hvert tall.', '4', 'Hvilket tall kom oftest?', ['Hvor mange firere kom?', 'Hvilket tall kom sjeldnest?', 'Hvor mange kast var det?'], 'Hva er typetallet?', { graf: TERN }),
      C(200, 'Ti elever målte skoleveien i minutter: 5, 8, 8, 10, 12, 15, 15, 20, 25, 40.', '13,5 minutter', 'Hva er medianen?', ['Hva er variasjonsbredden?', 'Hva er gjennomsnittet?', 'Hva er den lengste skoleveien?'], 'Hva er midtverdien?', { tips: 'Det er ti verdier, så det finnes to midterste.' }),
      C(300, 'Grafen viser karakterene til 25 elever på en prøve.', '3,8', 'Hva er gjennomsnittskarakteren?', ['Hva er typetallet?', 'Hva er medianen?', 'Hvor mange fikk 4 eller bedre?'], 'Hva er snittet i klassen?', { graf: KARAK }),
      C(400, '9 ansatte i et firma tjener 35 000 kr i måneden. 1 sjef tjener 185 000 kr. Firmaet selger kaffe.', '35 000 kr', 'Hva er medianlønnen?', ['Hva er gjennomsnittslønnen?', 'Hva er variasjonsbredden?', 'Hva er summen av alle lønningene?'], 'Hva tjener den midterste ansatte?')
    ] },
    { navn: 'Sannsynlighet', ikon: '🎲', rader: [
      C(100, 'Du kaster en vanlig terning med seks sider.', '1/6', 'Hva er sannsynligheten for å få en femmer?', ['Hva er sannsynligheten for å få et partall?', 'Hva er sannsynligheten for ikke å få en femmer?', 'Hvor mange sider har en terning?'], 'Hvor stor er sjansen for en femmer?'),
      C(200, 'En pose har 3 røde og 7 blå kuler. Du trekker én kule uten å se.', '3/10', 'Hva er sannsynligheten for å trekke en rød kule?', ['Hva er sannsynligheten for å trekke en blå kule?', 'Hvor mange kuler er det i posen?', 'Hva er sannsynligheten for å trekke rød og så blå?'], 'Hvor stor er sjansen for rød kule?'),
      C(300, 'En mynt kastes to ganger.', '1/4', 'Hva er sannsynligheten for kron begge gangene?', ['Hva er sannsynligheten for minst én kron?', 'Hva er sannsynligheten for én kron og én mynt?', 'Hva er sannsynligheten for mynt i første kast?'], 'Hvor stor er sjansen for to kron på rad?'),
      C(400, 'En pose har 4 røde og 6 blå kuler. Du trekker to kuler uten å legge dem tilbake. Posen er av stoff.', '2/15', 'Hva er sannsynligheten for at begge kulene er røde?', ['Hva er sannsynligheten for at begge kulene er blå?', 'Hva er sannsynligheten for at den første er rød?', 'Hva er sannsynligheten for én rød og én blå?'], 'Hvor stor er sjansen for to røde kuler?', { tips: 'Etter første trekning er det én kule mindre i posen.' })
    ] }
  ] };

  M.les.jeopardy[10] = { kategorier: [
    { navn: 'Prosent og vekst', ikon: '📈', rader: [
      C(100, 'En vare koster 500 kr. Prisen øker med 10 %.', '550 kr', 'Hva er den nye prisen?', ['Hva er økningen i kroner?', 'Hva er vekstfaktoren?', 'Hva er prisen hvis den synker 10 %?'], 'Hva koster varen etter prisøkningen?'),
      C(200, 'En vare koster 800 kr. Den settes ned 25 %.', '600 kr', 'Hva er den nye prisen?', ['Hvor mye er avslaget?', 'Hva er vekstfaktoren?', 'Hva blir prisen hvis den settes opp 25 %?'], 'Hva koster varen etter nedsettelsen?'),
      C(300, 'En jakke koster 1000 kr. Prisen settes først opp 20 %, og deretter ned 20 %. Jakka er grønn.', '960 kr', 'Hva er prisen til slutt?', ['Hva er prisen etter økningen?', 'Hva er prisen etter bare nedgangen?', 'Hvor mange prosent endret prisen seg totalt?'], 'Hva koster jakka etter begge endringene?', { tips: 'Vekstfaktorene er 1,20 og 0,80.' }),
      C(400, 'Prisen på en kaffe økte fra 45 kr til 55 kr. Kafeen ligger i Bergen.', 'ca. 22 %', 'Hvor mange prosent økte prisen?', ['Hvor mange kroner økte prisen?', 'Hvor mange prosent av 55 kr er 45 kr?', 'Hva er prisen etter en økning til på 10 %?'], 'Hva er den prosentvise økningen?', { tips: 'Regn økningen delt på det du startet med.' })
    ] },
    { navn: 'Likninger', ikon: '🟰', rader: [
      C(100, 'To tall har summen 10 og differansen 2.', '6 og 4', 'Hva er de to tallene?', ['Hva er produktet av tallene?', 'Hva er gjennomsnittet av tallene?', 'Hva er summen av tallene?'], 'Hvilke to tall passer?'),
      C(200, '2 kaffe og 1 kake koster 90 kr. 1 kaffe og 2 kaker koster 105 kr.', '25 kr', 'Hva koster én kaffe?', ['Hva koster én kake?', 'Hva koster 3 kaffe og 3 kaker?', 'Hva koster 1 kaffe og 1 kake?'], 'Hva er prisen på en kaffe?'),
      C(300, 'Likningen 3x + 2 = 5x − 6.', 'x = 4', 'Hvilken verdi av x gjør at begge sidene blir like?', ['Hva er 3x + 2 når x = 2?', 'Hva er forskjellen på 5x og 3x når x = 4?', 'Hva er 5x − 6 når x = 4?'], 'Løs likningen.'),
      C(400, 'Likningssettet x + y = 4 og 2x + 2y = 9.', 'Ingen løsning', 'Hvor mange løsninger har likningssettet?', ['Hva er x når y = 0?', 'Hva er 2x + 2y hvis x + y = 4?', 'Hvor mange løsninger har x + y = 4 og 2x + 2y = 8?'], 'Finnes det tall x og y som passer i begge likningene?', { tips: 'Del den andre likningen på 2.' })
    ] },
    { navn: 'Funksjoner og grafer', ikon: '📉', rader: [
      C(100, 'Grafen viser hva en taxitur koster, avhengig av hvor langt du kjører.', '50 kr', 'Hva er startprisen?', ['Hva koster 4 km?', 'Hvor mye øker prisen for hver km?', 'Hva koster 8 km?'], 'Hva koster en tur på 0 km?', { graf: TAXI }),
      C(200, 'Grafen viser hvor mye du skylder banken ved starten av hvert år. Banken ligger i sentrum.', '20 000 kr', 'Hva er restgjelden etter 3 år?', ['Hvor mye er nedbetalt per år?', 'Hvor stort var lånet?', 'Hva er restgjelden etter 4 år?'], 'Hvor mye skylder du etter 3 år?', { graf: GJELD, tips: 'Enheten på y-aksen er tusen kr.' }),
      C(300, 'Grafen viser høyden til en ball som kastes rett opp.', '20 meter', 'Hva er den største høyden til ballen?', ['Hvor lenge er ballen i luften?', 'Hva er høyden etter 1 sekund?', 'Hvor høyt er ballen etter 4 sekunder?'], 'Hvor høyt kommer ballen?', { graf: BALL }),
      C(400, 'Grafen viser antall bakterier i en prøve over fire timer.', 'Eksponentiell', 'Hvilken type vekst viser grafen?', ['Hvor mange bakterier er det etter 3 timer?', 'Hvor mange bakterier var det i starten?', 'Hva er stigningstallet?'], 'Er veksten lineær eller eksponentiell?', { graf: BAKT, tips: 'Se på hva som skjer med tallene for hver time.' })
    ] },
    { navn: 'Sparing og lån', ikon: '💰', rader: [
      C(100, 'Du setter 10 000 kr i banken med 5 % rente per år.', '10 500 kr', 'Hva har du etter 1 år?', ['Hva er renten i kroner etter 1 år?', 'Hva har du etter 2 år?', 'Hva er vekstfaktoren?'], 'Hvor mye er på kontoen etter ett år?'),
      C(200, 'Du setter 20 000 kr i banken med 4 % rente per år. Banken har røde kontorer.', 'ca. 22 497 kr', 'Hva har du etter 3 år?', ['Hva har du etter 1 år?', 'Hvor mye er renten det første året?', 'Hva har du etter 2 år?'], 'Hvor mye er på kontoen etter 3 år?', { tips: 'Bruk vekstfaktoren 1,04.' }),
      C(300, 'Du låner 50 000 kr med 6 % rente per år og betaler ikke ned noe.', '56 180 kr', 'Hva skylder du etter 2 år?', ['Hva skylder du etter 1 år?', 'Hvor mye er renten over to år uten rentes rente?', 'Hva skylder du etter 3 år?'], 'Hvor mye skylder du banken etter to år?'),
      C(400, 'Du låner 50 000 kr og betaler tilbake 60 000 kr etter 2 år.', '20 %', 'Hvor mange prosent har lånet økt totalt?', ['Hvor mye betaler du i renter?', 'Hva er vekstfaktoren for de to årene?', 'Hva er renten per år hvis den bare regnes av 50 000 kr?'], 'Hva er den totale prosentøkningen?')
    ] }
  ] };
})();
