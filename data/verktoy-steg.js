/* ============================================================
   Verktøy: «Steg for steg»-versjoner av Python, GeoGebra og regneark.
   Samme modeller og oppdrag som i Utforsk, men hver del starter med en
   oppskrift i små steg (vis ett steg om gangen) og en Husk-boks.
   ============================================================ */
(function () {
  const M = window.MATTE, H = M.H;
  const HINT = [
    [/Prosjekt 1/, ['Les én linje om gangen.', 'n % d er resten når n deles på d.', 'Hvis resten er 0, går d opp i n.']],
    [/1\.04/, ['Tallet ganges med beløpet hvert år.', 'Hvilken prosentvis økning gir faktoren 1,04?', 'For 7 % blir faktoren 1,07.']],
    [/Terningsimuleringen/, ['Tilfeldige kast jevner seg ikke akkurat ut.', 'Tenk på 6 kast: kan hvert tall komme nøyaktig én gang hver gang?', 'Se på forskjellene i prosent når antall kast øker.']],
    [/while/, ['Se hva penger er i starten og hva som skjer i hver runde.', 'Når stopper løkka?', 'Skriv opp verdiene: 500, 750, 1000 …']],
    [/skjæringspunktene/, ['Skriv begge funksjonene i inntastingsfeltet.', 'Bruk Skjæring(f,g).', 'Les x-koordinatene i listen.']],
    [/trekant/, ['Lag tre punkter og en mangekant.', 'Bruk Omkrets(t) og Areal(t).', 'Dra i et hjørne og se på tallene.']],
    [/negativ/, ['Regn ut summen av utgiftene.', 'Hva er forskjellen fra inntekten?', 'Du kan senke en utgift eller øke inntekten.']],
    [/månedsbudsjett/, ['Skriv utgiftene i en kolonne.', 'Bruk =SUMMER(...) til å finne totalen.', 'Hva er størst? Er den nødvendig?']]
  ];
  function medHint(s) {
    const ny = Object.assign({}, s);
    ny.blokker = s.blokker.map(function (b) {
      if (b.t !== 'oppgaver') return b;
      const nb = Object.assign({}, b);
      nb.oppgaver = b.oppgaver.map(function (q) {
        if (q.hint) return q;
        const h = HINT.find(x => x[0].test(q.tekst || ''));
        return Object.assign({}, q, { hint: h ? h[1] : ['Les oppgaven sakte.', 'Prøv det du gjorde i eksemplene over.'] });
      });
      return nb;
    });
    return ny;
  }
  function STEG(key, ekstra, ingress) {
    const u = M.topics.utforsk[key]; if (!u) return;
    const seksjoner = u.seksjoner.map(function (s0, i) {
      const s = medHint(s0);
      const x = ekstra[i]; if (!x) return s;
      const ny = Object.assign({}, s);
      ny.blokker = [H.G(x[0]), H.E(x[1], x[2]), H.C('husk', 'Husk', x[3])].concat(s.blokker);
      return ny;
    });
    M.register('steg', key, { tittel: u.tittel, ingress: ingress || u.ingress, mal: u.mal, ordliste: u.ordliste, seksjoner: seksjoner });
  }

  /* ---------------- Python ---------------- */
  STEG('verktoy/python', [
    ['Vi går i små steg. Først ser du hvordan det gjøres, så prøver du selv.', 'Hva er en algoritme? Lag en oppskrift for å lage en brødskive med pålegg.', ['Finn frem brød, smør og pålegg.', 'Smør brødskiven.', 'Legg pålegget på.', 'Spis! Rekkefølgen er viktig: pålegg før smør blir rotete.'], 'En algoritme er en oppskrift med steg i riktig rekkefølge. Et program er en algoritme som datamaskinen kan lese.'],
    ['Nå skriver du din første kode. Ett lite steg om gangen.', 'Skriv ut ordet Hei.', ['Skriv <code>print(</code>.', 'Skriv teksten i anførselstegn: <code>"Hei"</code>.', 'Lukk parentesen: <code>print("Hei")</code>.', 'Trykk Kjør.'], 'print() skriver ut. Tekst står mellom anførselstegn. Hver parentes og hvert anførselstegn må ha en partner.'],
    ['En variabel er som en boks med navn. Vi lager den i tre steg.', 'Lag en variabel alder med verdien 13 og skriv den ut.', ['Velg et navn: <code>alder</code>.', 'Gi den en verdi med likhetstegn: <code>alder = 13</code>.', 'Bruk den: <code>print(alder)</code>.', 'Resultat: 13.'], 'Likhetstegnet i Python betyr «legg verdien i boksen». Variabelen kan endres senere.'],
    ['Python er en kalkulator. Husk regnerekkefølgen.', 'Regn ut 2 + 3 * 4 i Python.', ['Skriv <code>print(2 + 3 * 4)</code>.', 'Python regner gange før pluss: 3 · 4 = 12.', 'Så 2 + 12 = 14.', 'Vil du ha pluss først, bruk parentes: <code>(2 + 3) * 4</code>.'], '+ − * / er pluss, minus, gange og dele. ** er potens, // er heltallsdivisjon og % er resten.'],
    ['Nå lærer programmet å spørre.', 'Spør om et tall og skriv ut dobbelt så mye.', ['Spør: <code>x = input("Tall: ")</code>.', 'input gir tekst. Gjør den om til tall: <code>x = int(input("Tall: "))</code>.', 'Regn: <code>print(x * 2)</code>.', 'Test med 10. Svaret skal bli 20.'], 'input() gir alltid tekst. Bruk int() eller float() for å regne med svaret.'],
    ['Programmet kan velge. Vi bygger valget steg for steg.', 'Skriv «partall» eller «oddetall».', ['Sjekk resten: <code>n % 2 == 0</code>.', 'Skriv <code>if n % 2 == 0:</code> og trykk Enter.', 'Rykk inn neste linje: <code>print("partall")</code>.', 'Legg til <code>else:</code> og en linje med innrykk: <code>print("oddetall")</code>.'], 'if, elif og else avslutter med kolon. Linjene som hører til har innrykk. == sammenligner, = lagrer.'],
    ['En løkke gjentar. Vi leser den først.', 'Hva gjør <code>for i in range(1, 4): print(i)</code>?', ['range(1, 4) gir tallene 1, 2 og 3. (4 er ikke med.)', 'i er 1 i første runde. Linjen med innrykk kjører: 1 skrives ut.', 'Runde 2: i er 2. Runde 3: i er 3.', 'Resultat: 1, 2 og 3 på hver sin linje.'], 'range(a, b) går fra a til rett før b. Linjene med innrykk er det som gjentas.'],
    ['En liste holder mange verdier.', 'Finn gjennomsnittet av [4, 8, 6].', ['Lag listen: <code>tall = [4, 8, 6]</code>.', 'Summen: <code>sum(tall)</code> gir 18.', 'Antall: <code>len(tall)</code> gir 3.', 'Del: <code>sum(tall) / len(tall)</code> gir 6.0.'], 'Første plass i en liste har nummer 0. sum, len, max og min fungerer på lister.'],
    ['En funksjon er en maskin du lager selv.', 'Lag en funksjon som dobler et tall.', ['Skriv <code>def dobbel(x):</code>.', 'Rykk inn: <code>return x * 2</code>.', 'Bruk den: <code>print(dobbel(5))</code>.', 'Svaret er 10.'], 'def lager funksjonen. return gir svaret tilbake. Du kan bruke funksjonen så mange ganger du vil.'],
    ['Feil er normalt. Her er en metode for å finne dem.', 'Programmet gir en feilmelding. Hva gjør du?', ['Les feilmeldingen. Se på linjenummeret.', 'Se på linjen: er det skrivefeil, mangler kolon eller anførselstegn?', 'Rett én ting om gangen og kjør på nytt.', 'Hvis det ikke gir feilmelding men feil svar: sjekk med små tall du vet svaret på.'], 'Feilmeldingen forteller hvor og hva. En logisk feil gir feil svar uten melding.'],
    ['Nå setter vi det sammen i små prosjekter.', 'Skal vi sjekke om 7 er et primtall?', ['Et primtall er delelig bare med 1 og seg selv.', 'Prøv tallene fra 2 til 6: går noen opp i 7?', 'Bruk % for å sjekke: <code>7 % d == 0</code>.', 'Ingen går opp. Altså er 7 et primtall.'], 'Del store oppgaver i små. Test hver del før du går videre.'],
    ['Å lese kode er en egen ferdighet. Gå linje for linje.', 'Hva skriver koden ut? <code>x = 3<br>x = x + 2<br>print(x)</code>', ['Linje 1: x er 3.', 'Linje 2: x blir 3 + 2 = 5.', 'Linje 3: skriver ut 5.', 'Svar: 5.'], 'Følg koden som datamaskinen: én linje om gangen, ovenfra og ned.']
  ], 'Lær programmering i små steg. Hver del starter med en oppskrift der du ser ett steg om gangen. Så prøver du selv. Du trenger ingenting installert, og feil er helt lov.');

  /* ---------------- GeoGebra ---------------- */
  STEG('verktoy/geogebra', [
    ['Først blir du kjent med flaten.', 'Tegn grafen til f(x) = x².', ['Finn inntastingsfeltet.', 'Skriv <code>f(x)=x^2</code>.', 'Trykk Enter.', 'Grafen dukker opp. Dra i flaten for å flytte den.'], 'Skriv ^ for potens. Alt du lager havner i listen til venstre, og du kan skjule eller slette det.'],
    ['Punkter har to tall: x og y.', 'Sett et punkt A i (2, 3).', ['Skriv <code>A=(2,3)</code>.', 'Trykk Enter.', 'Se punktet: 2 til høyre, 3 opp.', 'Dra i punktet og se koordinatene endre seg.'], 'Første tall er x (sidelengs). Andre tall er y (opp og ned).'],
    ['En glider er et tall du kan dra i.', 'Utforsk linja y = ax + b.', ['Lag glidere: <code>a=1</code> og <code>b=0</code>.', 'Skriv <code>f(x)=a*x+b</code>.', 'Dra i a: hva skjer med linja? (Den blir brattere.)', 'Dra i b: linja flytter seg opp eller ned.'], 'a er stigningstallet, b er der linja krysser y-aksen.'],
    ['Skjæringspunktet er der to grafer møtes.', 'Finn skjæringspunktet mellom f(x) = 2x + 1 og g(x) = −x + 4.', ['Skriv <code>f(x)=2x+1</code>.', 'Skriv <code>g(x)=-x+4</code>.', 'Skriv <code>Skjæring(f,g)</code>.', 'Les koordinatene i listen: (1, 3).'], 'Skjæringspunktet er løsningen på ligningssettet.'],
    ['Figurer lages av punkter.', 'Tegn en trekant og finn arealet.', ['Lag tre punkter: <code>A=(0,0)</code>, <code>B=(4,0)</code>, <code>C=(1,3)</code>.', 'Lag trekanten: <code>t=Mangekant(A,B,C)</code>.', 'Finn arealet: <code>Areal(t)</code>.', 'Dra i C og se hva som skjer med arealet.'], 'Mangekant lager en flate. Areal gir arealet. Flytt hjørnene og se hva som endrer seg.'],
    ['Nå lager du noe selv.', 'Lag en figur og forklar hva du oppdager.', ['Velg hva du vil utforske.', 'Lag punkter eller grafer.', 'Dra i dem og se hva som endrer seg.', 'Skriv ned det du fant, med egne ord.'], 'Du kan alltid angre eller slette og begynne på nytt. Utforsk!']
  ], 'Lær GeoGebra i små steg. Hver del starter med en oppskrift der du ser ett steg om gangen, og så prøver du selv.');

  /* ---------------- Regneark ---------------- */
  STEG('verktoy/regneark', [
    ['Vi starter med å finne frem i regnearket.', 'Hva heter cellen i kolonne B og rad 3?', ['Finn kolonne B (bokstav øverst).', 'Finn rad 3 (tall til venstre).', 'Cellen der de møtes heter B3.', 'Klikk på B3 og se adressen.'], 'En celle har adresse: kolonnebokstav først, så radnummer.'],
    ['Tall og tekst oppfører seg ulikt.', 'Skriv navn og poeng i regnearket.', ['Klikk på A2 og skriv <code>Ola</code>. Trykk Enter.', 'Klikk på B2 og skriv <code>25</code>. Trykk Enter.', 'Se at tekst står til venstre og tall til høyre.', 'Bruk komma i desimaltall: <code>31,5</code>.'], 'Tall til høyre kan regnes med. Tekst til venstre kan ikke.'],
    ['En formel starter alltid med =.', 'Legg sammen B2 og B3.', ['Klikk på cellen der svaret skal stå.', 'Skriv <code>=B2+B3</code>.', 'Trykk Enter.', 'Endre B2 og se at svaret endrer seg selv.'], 'Formler starter med =. Bruk celleadresser, ikke tallene selv, så oppdaterer regnearket seg.'],
    ['Funksjoner gjør lange formler korte.', 'Finn summen og gjennomsnittet av B2 til B6.', ['Skriv <code>=SUMMER(B2:B6)</code> i en celle.', 'Skriv <code>=GJENNOMSNITT(B2:B6)</code> i en annen.', 'B2:B6 betyr cellene fra B2 til B6.', 'Trykk Enter og les svarene.'], 'Kolon mellom to celler betyr et område. SUMMER og GJENNOMSNITT bruker området.'],
    ['Slik kopierer du en formel nedover.', 'Regn dobbelt av hvert tall i kolonne A.', ['Skriv <code>=A2*2</code> i B2.', 'Merk B2 og dra i fyllhåndtaket (nede til høyre).', 'Dra nedover. Formelen blir =A3*2, =A4*2 …', 'Alle radene regnes ut.'], 'Når du kopierer nedover, følger celleadressene med. $-tegn (som $B$1) holder en adresse fast.'],
    ['Diagram gjør tall lett å se.', 'Lag et søylediagram av poengene.', ['Merk tabellen (navn og poeng).', 'Velg diagram og søylediagram.', 'Gi diagrammet en tittel og navn på aksene.', 'Les av: hvem har flest poeng?'], 'Alle diagrammer trenger tittel og navn på aksene. Velg en diagramtype som passer til dataene.'],
    ['Regneark er flinke til verditabeller.', 'Lag en tabell for y = 2x + 1.', ['Skriv x-verdiene i kolonne A: 0, 1, 2, 3 …', 'Skriv <code>=2*A2+1</code> i B2.', 'Kopier nedover.', 'Lag et linjediagram og se at det blir en rett linje.'], 'Samme formel nedover gir en hel verditabell.'],
    ['HVIS lar regnearket velge.', 'Skriv «bestått» hvis poeng er minst 20.', ['Skriv <code>=HVIS(B2&gt;=20;"bestått";"ikke bestått")</code>.', 'Først betingelsen, så svar hvis sant, så svar hvis usant.', 'Skilletegn er semikolon.', 'Kopier nedover til alle.'], 'HVIS(betingelse; hvis sant; hvis usant).'],
    ['Nå bygger du et lite budsjett.', 'Planlegg budsjettet i tre steg.', ['Skriv inntekter og utgifter i hver sin kolonne.', 'Bruk SUMMER til å finne totalen av hver.', 'Trekk fra: inntekter minus utgifter.', 'Lag et diagram og forklar hva det viser.'], 'Bruk formler, ikke tall du har regnet selv. Da stemmer budsjettet når du endrer noe.']
  ], 'Lær regneark i små steg. Hver del starter med en oppskrift der du ser ett steg om gangen, og så prøver du selv.');
})();
