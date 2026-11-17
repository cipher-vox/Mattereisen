/* ============================================================
   Verktøy: GeoGebra fra scratch – UTFORSK
   Tegneren her bruker de samme kommandoene som GeoGebra.
   Læreplan: funksjoner og geometri 8.–10. trinn, digitale verktøy
   ============================================================ */
(function () {
  const M = window.MATTE;
  const ORD = [
    { ord: ['algebrafeltet', 'algebrafelt'], forklaring: 'Listen til venstre der du skriver inn og ser alle objektene dine.' },
    { ord: ['tegneområdet', 'tegneområde'], forklaring: 'Området til høyre der tegningen vises, med et koordinatsystem.' },
    { ord: ['glider', 'glideren'], forklaring: 'Et tall du kan endre ved å dra i en strek. Tegningen oppdateres mens du drar.' },
    { ord: ['koordinatsystem', 'koordinatsystemet'], forklaring: 'To tallinjer som krysser hverandre, x-aksen og y-aksen.' },
    { ord: ['skjæringspunkt', 'skjæringspunktet'], forklaring: 'Stedet der to linjer eller grafer krysser hverandre.' },
    { ord: ['stigningstall'], forklaring: 'Tallet a i y = ax + b. Det sier hvor bratt linjen er.' },
    { ord: ['konstantledd', 'konstantleddet'], forklaring: 'Tallet b i y = ax + b. Det er der linjen krysser y-aksen.' },
    { ord: ['mangekant'], forklaring: 'En figur med rette sider, som en trekant eller firkant.' }
  ];
  const S = [];

  S.push({
    tittel: 'Hva er GeoGebra?', ikon: '📐',
    blokker: [
      { t: 'p', tekst: '<strong>GeoGebra</strong> er et gratis program der du kan tegne grafer og geometriske figurer og utforske hva som skjer når du endrer noe. «Geo» er geometri og «gebra» er algebra. Programmet viser begge deler samtidig: <strong>regningen</strong> til venstre og <strong>tegningen</strong> til høyre.' },
      { t: 'widget', navn: 'geo', opts: { tittel: 'Din første funksjon', start: ['f(x)=x^2-2'], intro: 'Under er funksjonen f(x) = x² − 2 allerede tegnet. Skriv en ny funksjon i feltet, for eksempel <code>g(x)=2x+1</code>, og trykk Enter. Du kan skjule eller slette objekter med knappene i listen.' } },
      { t: 'callout', stil: 'tips', tittel: 'Slik bruker du tegneren', punkter: ['Skriv i feltet øverst til venstre og trykk <strong>Enter</strong>.', '<strong>Zoom</strong> med + og − under tegningen, og ⌂ går tilbake.', 'Punkter du lager med <code>A=(2,3)</code> kan du <strong>dra</strong> i.', 'Ingenting lagres. Når du laster siden på nytt, er alt borte.'] },
      { t: 'oppgaver', niva: 1, oppgaver: [
        { type: 'valg', tekst: 'Hva skriver du for å lage funksjonen y = 3x − 4?', valg: ['f(x)=3x-4', 'f=3x-4x', 'y3x-4', 'Linje(3,4)'], riktig: 0, hint: 'Funksjoner skrives f(x)= og så uttrykket.', losning: 'En funksjon skrives f(x)=3x-4. Da tegner GeoGebra grafen.' },
        { type: 'valg', tekst: 'Hva viser algebrafeltet?', valg: ['Listen over objektene du har laget', 'Bare tegningen', 'Fasit', 'Knappene'], riktig: 0, fast: true, hint: 'Det står til venstre.', losning: 'Algebrafeltet er listen til venstre med alle objektene dine og deres verdier.' }
      ] }
    ]
  });

  S.push({
    tittel: 'Punkter og koordinater', ikon: '📍',
    blokker: [
      { t: 'p', tekst: 'Et punkt har to koordinater, <strong>(x, y)</strong>. Første tall sier hvor langt til høyre (eller venstre) du går. Andre tall sier hvor langt opp (eller ned). Du lager et punkt ved å skrive <code>A=(2,3)</code>.' },
      { t: 'widget', navn: 'geo', opts: { tittel: 'Dra i punktene', start: ['A=(2,3)', 'B=(-3,1)', 'Linjestykke(A,B)', 'Midtpunkt(A,B)', 'Avstand(A,B)'], intro: 'Dra i A og B. Se hvordan midtpunktet og avstanden endrer seg i listen til venstre.' } },
      { t: 'oppgaver', niva: 2, oppgaver: [
        { type: 'valg', tekst: 'Hvor ligger punktet (−2, 4)?', valg: ['2 til venstre og 4 opp', '2 til høyre og 4 opp', '4 til venstre og 2 opp', '2 til venstre og 4 ned'], riktig: 0, hint: 'Negativ x betyr til venstre.', losning: 'x = −2 betyr 2 til venstre. y = 4 betyr 4 opp.' },
        { type: 'tall', tekst: 'Hva er x-koordinaten til midtpunktet mellom A = (2, 6) og B = (8, 2)?', svar: 5, hint: 'Gjennomsnittet av 2 og 8.', losning: '(2 + 8) / 2 = 5. Midtpunktet er (5, 4).' },
        { type: 'tall', tekst: 'Hva er y-koordinaten til midtpunktet mellom A = (2, 6) og B = (8, 2)?', svar: 4, hint: 'Gjennomsnittet av 6 og 2.', losning: '(6 + 2) / 2 = 4.' }
      ] }
    ]
  });

  S.push({
    tittel: 'Lineære funksjoner og glidere', ikon: '📈',
    blokker: [
      { t: 'p', tekst: 'En lineær funksjon har formelen <strong>y = ax + b</strong>. Her er <strong>a</strong> stigningstallet og <strong>b</strong> konstantleddet. Med <strong>glidere</strong> kan du endre a og b og se hva som skjer med linjen.' },
      { t: 'widget', navn: 'geo', opts: { tittel: 'Utforsk y = ax + b', start: ['a=1', 'b=0', 'f(x)=a*x+b'], intro: 'Dra i glideren for a. Hva skjer med linjen? Dra så i glideren for b. Hva er det som endrer seg da?' } },
      { t: 'callout', stil: 'regel', tittel: 'Dette ser du', punkter: ['<strong>a</strong> styrer hvor bratt linjen er. Er a negativ, går linjen nedover.', '<strong>b</strong> er der linjen krysser y-aksen. Den flytter linjen opp og ned.'] },
      { t: 'oppgaver', niva: 3, oppgaver: [
        { type: 'valg', tekst: 'Hva skjer med linjen når a går fra 1 til 3?', valg: ['Den blir brattere', 'Den flytter seg opp', 'Den blir slakere', 'Ingenting'], riktig: 0, hint: 'a er stigningstallet.', losning: 'Større a gir en brattere linje.' },
        { type: 'valg', tekst: 'Hvor krysser y = 2x + 5 y-aksen?', valg: ['(0, 5)', '(5, 0)', '(0, 2)', '(2, 5)'], riktig: 0, hint: 'Sett inn x = 0.', losning: 'Når x = 0, er y = 2 · 0 + 5 = 5. Punktet er (0, 5).' },
        { type: 'tall', tekst: 'Hva er stigningstallet til y = −4x + 7?', svar: -4, hint: 'Tallet foran x.', losning: 'Tallet foran x er stigningstallet: −4. Linjen går nedover.' }
      ] }
    ]
  });

  S.push({
    tittel: 'Skjæringspunkt: to funksjoner møtes', ikon: '✖️',
    blokker: [
      { t: 'p', tekst: 'Hvor krysser to linjer hverandre? Det er der de har samme x og samme y. Slike punkter kalles <strong>skjæringspunkt</strong>. Med kommandoen <code>Skjæring(f,g)</code> finner GeoGebra dem for deg.' },
      { t: 'widget', navn: 'geo', opts: { tittel: 'Finn skjæringspunktet', start: ['f(x)=2x+1', 'g(x)=-x+4', 'Skjæring(f,g)'], intro: 'To funksjoner og skjæringspunktet deres. Se hvilke koordinater som står i listen. Endre g(x) og se hva som skjer.' } },
      { t: 'callout', stil: 'virkelighet', tittel: 'Hverdagen', tekst: 'To mobilabonnement: ett koster 100 kr + 2 kr per minutt, det andre 0 kr + 4 kr per minutt. Skjæringspunktet viser når de koster like mye.' },
      { t: 'oppgaver', niva: 3, oppgaver: [
        { type: 'tall', tekst: 'Hvor krysser f(x) = 2x + 1 og g(x) = −x + 4 hverandre? Hva er x-koordinaten?', svar: 1, hint: '2x + 1 = −x + 4.', losning: '2x + 1 = −x + 4 gir 3x = 3, så x = 1. Punktet er (1, 3).' },
        { type: 'tall', tekst: 'Og hva er y-koordinaten i skjæringspunktet over?', svar: 3, hint: 'Sett x = 1 inn i f.', losning: 'f(1) = 2 · 1 + 1 = 3.' },
        { type: 'tall', tekst: 'Abonnementene over: Etter hvor mange minutter koster de like mye? (100 + 2x = 4x)', svar: 50, hint: '100 = 2x.', losning: '100 + 2x = 4x gir 100 = 2x, så x = 50 minutter.' }
      ] }
    ]
  });

  S.push({
    tittel: 'Geometri: figurer og areal', ikon: '🔷',
    blokker: [
      { t: 'p', tekst: 'Du kan tegne figurer med punkter og <code>Mangekant(A,B,C)</code>, og GeoGebra regner ut arealet. Du kan også tegne en sirkel med <code>Sirkel(A,3)</code>.' },
      { t: 'widget', navn: 'geo', opts: { tittel: 'Trekant med areal', start: ['A=(-3,-2)', 'B=(4,-2)', 'C=(1,3)', 't=Mangekant(A,B,C)', 'Areal(t)'], intro: 'Dra i hjørnene. Hvordan endrer arealet seg? Hva skjer med arealet hvis du flytter C rett opp, og hva hvis du flytter C sidelengs?' } },
      { t: 'widget', navn: 'geo', opts: { tittel: 'Sirkel', start: ['M=(0,0)', 'c=Sirkel(M,3)', 'Areal(c)'], intro: 'En sirkel med radius 3. Se arealet. Det er π · 3² ≈ 28,27. Prøv å endre radien.' } },
      { t: 'oppgaver', niva: 3, oppgaver: [
        { type: 'tall', tekst: 'En trekant har grunnlinje 8 og høyde 5. Hva er arealet?', svar: 20, hint: 'g · h / 2.', losning: '8 · 5 / 2 = 20.' },
        { type: 'valg', tekst: 'Grunnlinjen AB ligger vannrett. Du flytter C rett oppover. Hva skjer med arealet?', valg: ['Det blir større (høyden øker)', 'Det blir mindre', 'Det er uendret', 'Det blir 0'], riktig: 0, hint: 'Høyden endres.', losning: 'Høyden blir større, og arealet = g · h / 2 blir da større.' },
        { type: 'valg', tekst: 'Du flytter C vannrett sideveis, uten å endre høyden over AB. Hva skjer med arealet?', valg: ['Det er uendret', 'Det blir større', 'Det blir mindre', 'Det blir 0'], riktig: 0, hint: 'Høyden endres ikke.', losning: 'Høyden og grunnlinjen er like, så arealet er det samme. Dette kalles at trekanter med lik grunnlinje og høyde har likt areal.' }
      ] }
    ]
  });

  S.push({
    tittel: 'Prosjekt: egen oppdagelse', ikon: '🔭',
    blokker: [
      { t: 'p', tekst: 'Nå er du klar for å utforske selv. Velg ett av prosjektene og skriv ned det du oppdager.' },
      { t: 'widget', navn: 'geo', opts: { tittel: 'Din arbeidsflate', start: [], intro: 'Tom flate. Prøv for eksempel å tegne tre punkter, lag en trekant og finn midtpunktene på sidene.' } },
      { t: 'oppgaver', niva: 4, oppgaver: [
        { type: 'fritekst', tekst: 'Tegn f(x) = x² og g(x) = x + 2 og finn skjæringspunktene. Hva er x-koordinatene?', losning: ['x² = x + 2 gir x² − x − 2 = 0, som har løsningene x = −1 og x = 2.', 'Skjæringspunktene er (−1, 1) og (2, 4).'] },
        { type: 'fritekst', tekst: 'Lag en trekant og beskriv hva som skjer med omkretsen og arealet når du drar i et hjørne. Er det noe som alltid er likt?', losning: ['Svarene er ulike. Mange oppdager at arealet er likt så lenge hjørnet beveges parallelt med motsatt side.', 'Omkretsen endrer seg nesten alltid når du drar i et hjørne.'] }
      ] },
      { t: 'sjekkliste', tittel: 'Dette kan du nå', punkter: ['Skrive en funksjon og se grafen', 'Lage punkter og dra i dem', 'Bruke glidere til å utforske a og b', 'Finne skjæringspunkt', 'Tegne mangekanter og lese av areal'] }
    ]
  });

  M.register('utforsk', 'verktoy/geogebra', {
    tittel: 'GeoGebra fra scratch',
    ingress: 'Lær å tegne funksjoner og figurer og oppdag sammenhenger. Tegneren her bruker de samme kommandoene som det ekte GeoGebra.',
    mal: ['tegne funksjoner og punkter', 'bruke glidere til å utforske', 'finne skjæringspunkter og areal'],
    ordliste: ORD, seksjoner: S
  });
})();
