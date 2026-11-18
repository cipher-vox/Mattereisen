/* Regelbok 10. trinn (se regelbok-8.js for format). */
(function () {
  const M = window.MATTE; M.regelbok = M.regelbok || {};
  const R = (key, o) => { M.regelbok[key] = o; };

  R('10/algebra', {
    kort: 'Algebra bruker bokstaver til å skrive regler som alltid stemmer.',
    regler: [
      ['🔤', 'Forenkle', 'Slå sammen ledd med lik bokstavdel. 3a + 2b + 5a − b = 8a + b.'],
      ['🍰', 'Gange inn i parentes', 'a(b + c) = ab + ac. 2x(3x − 4) = 6x² − 8x.'],
      ['🧩', 'Faktorisere', 'Sett felles faktor utenfor parentes. 6x + 9 = 3(2x + 3).'],
      ['🔁', 'Potenser med bokstaver', 'a² · a³ = a<sup>5</sup>, (a²)³ = a<sup>6</sup> og a<sup>5</sup> ÷ a² = a³.'],
      ['✅', 'Vise at noe alltid stemmer', 'Bruk n for et vilkårlig tall. Tre tall på rad: n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1). Summen er alltid delelig på 3.']
    ],
    eks: [
      ['Forenkle 2(x + 3) − (x − 4)', ['Gang inn: 2x + 6.', 'Minus foran parentesen snur fortegnene: −x + 4.', '2x + 6 − x + 4 = x + 10.'], 'x + 10'],
      ['Faktoriser 12x² + 8x', ['Felles faktor er 4x.', '12x² = 4x · 3x og 8x = 4x · 2.', '12x² + 8x = 4x(3x + 2).'], '4x(3x + 2)']
    ],
    pass: ['Minus foran en parentes snur alle fortegnene inni.', 'x² + x² er 2x², ikke x<sup>4</sup>.', '(a + b)² er ikke a² + b². Bruk kvadratsetningene.'],
    trick: 'Sjekk svaret ved å sette inn et tall, for eksempel x = 2, i uttrykket før og etter.',
    ord: [['Ledd', 'Del av et uttrykk som legges til eller trekkes fra.'], ['Faktorisere', 'Å skrive som et produkt.'], ['Generalisere', 'Å finne en regel som gjelder alltid.']],
    test: [['Forenkle 3x + 4 − x + 2', '2x + 6'], ['Faktoriser 10a + 15', '5(2a + 3)']]
  });

  R('10/kvadratsetninger', {
    kort: 'Kvadratsetningene er tre regler som lar deg gange ut og faktorisere raskt.',
    regler: [
      ['➕', '1. kvadratsetning', '(a + b)² = a² + 2ab + b². (x + 3)² = x² + 6x + 9.'],
      ['➖', '2. kvadratsetning', '(a − b)² = a² − 2ab + b². (x − 4)² = x² − 8x + 16.'],
      ['✖️', 'Konjugatsetningen', '(a + b)(a − b) = a² − b². (x + 5)(x − 5) = x² − 25.'],
      ['🧱', 'Se dem som areal', 'Et kvadrat med side a + b består av et a²-kvadrat, et b²-kvadrat og to rektangler ab.'],
      ['🧠', 'Hoderegning', '51² = (50 + 1)² = 2500 + 100 + 1 = 2601. 99 · 101 = (100 − 1)(100 + 1) = 10 000 − 1 = 9999.']
    ],
    eks: [
      ['Gang ut (2x + 3)²', ['a = 2x og b = 3.', 'a² = 4x², 2ab = 2 · 2x · 3 = 12x og b² = 9.', 'Svar: 4x² + 12x + 9.'], '4x² + 12x + 9'],
      ['Faktoriser x² − 49', ['x² = x · x og 49 = 7 · 7.', 'Bruk konjugatsetningen baklengs.', 'x² − 49 = (x + 7)(x − 7).'], '(x + 7)(x − 7)']
    ],
    pass: ['(a + b)² er ikke a² + b². Du må ha med 2ab.', 'I 2. kvadratsetning er siste ledd +b², ikke −b².', 'I konjugatsetningen forsvinner midtleddet.'],
    trick: 'Lær de tre setningene som mønster: kvadrat, dobbelt produkt, kvadrat.',
    ord: [['Kvadrere', 'Å gange et tall eller uttrykk med seg selv.'], ['Konjugat', 'To parenteser med samme ledd, men ulikt fortegn.']],
    test: [['Gang ut (x + 2)²', 'x² + 4x + 4'], ['Gang ut (x + 6)(x − 6)', 'x² − 36']]
  });

  R('10/ligningssett', {
    kort: 'Et likningssett har to ukjente, x og y, og to likninger. Løsningen må passe i begge.',
    regler: [
      ['📈', 'Grafisk', 'Tegn begge linjene. Skjæringspunktet er løsningen (x, y).'],
      ['🔁', 'Innsettingsmetoden', 'Løs den ene likningen for x eller y, og sett uttrykket inn i den andre.'],
      ['➕', 'Addisjonsmetoden', 'Legg likningene sammen eller trekk dem fra hverandre, slik at en ukjent forsvinner.'],
      ['✅', 'Sjekk', 'Sett x og y inn i begge likningene.'],
      ['⚠️', 'Spesialtilfeller', 'Parallelle linjer: ingen løsning. Samme linje: uendelig mange løsninger.']
    ],
    eks: [
      ['Løs x + y = 10 og x − y = 4', ['Legg sammen: 2x = 14, så x = 7.', '7 + y = 10, så y = 3.', 'Sjekk: 7 − 3 = 4 ✓.'], 'x = 7 og y = 3'],
      ['Løs y = 2x og x + y = 12', ['Sett y = 2x inn i den andre: x + 2x = 12.', '3x = 12, så x = 4.', 'y = 2 · 4 = 8.'], 'x = 4 og y = 8']
    ],
    pass: ['Du må finne både x og y.', 'Sett svaret inn i begge likningene.', 'Når du trekker en likning fra en annen, endre fortegn på alle leddene.'],
    trick: 'Velg metoden som gjør en ukjent borte raskest. Ligger y alene? Bruk innsetting.',
    ord: [['Likningssett', 'To likninger med to ukjente.'], ['Skjæringspunkt', 'Punktet der linjene krysser hverandre.']],
    test: [['x + y = 8 og x − y = 2. Finn x og y.', 'x = 5 og y = 3'], ['Hva er løsningen grafisk?', 'Skjæringspunktet mellom linjene']]
  });

  R('10/stigningstall', {
    kort: 'Stigningstallet sier hvor mye y endres når x øker med 1.',
    regler: [
      ['📐', 'Formel', 'a = (y<sub>2</sub> − y<sub>1</sub>) ÷ (x<sub>2</sub> − x<sub>1</sub>) = endring i y ÷ endring i x.'],
      ['📈', 'Rett linje', 'y = ax + b. a er stigningstallet, og b er startverdien (der linja krysser y-aksen).'],
      ['🔼', 'Stigende og synkende', 'a > 0: grafen stiger. a < 0: grafen synker. a = 0: linja er vannrett.'],
      ['🚗', 'I hverdagen', 'Fart (km/t), pris per enhet (kr/kg) og vekst per år er alle stigningstall.']
    ],
    eks: [
      ['Linja går gjennom (1, 3) og (4, 9). Finn likningen.', ['a = (9 − 3) ÷ (4 − 1) = 6 ÷ 3 = 2.', 'y = 2x + b. Sett inn (1, 3): 3 = 2 · 1 + b, så b = 1.', 'y = 2x + 1.'], 'y = 2x + 1'],
      ['En bil kjører 150 km på 2 timer og 300 km på 4 timer. Finn stigningstallet.', ['Endring i strekning: 300 − 150 = 150 km.', 'Endring i tid: 4 − 2 = 2 timer.', 'a = 150 ÷ 2 = 75 km/t.'], '75 km/t']
    ],
    pass: ['Hold samme rekkefølge i teller og nevner: y<sub>2</sub> − y<sub>1</sub> og x<sub>2</sub> − x<sub>1</sub>.', 'Stigningstallet er endringen, ikke y-verdien.', 'Negativt stigningstall betyr at linja synker.'],
    trick: 'Tegn en trapp mellom to punkter. Høyden på trappa delt på bredden er stigningstallet.',
    ord: [['Stigningstall', 'Hvor mye y endres når x øker med 1.'], ['Startverdi', 'y-verdien når x = 0.'], ['Lineær funksjon', 'En funksjon med en rett linje som graf.']],
    test: [['Linja går gjennom (0, 2) og (3, 8). Hva er stigningstallet?', '2'], ['y = −3x + 4. Stiger eller synker grafen?', 'Synker, fordi a = −3 er negativ']]
  });

  R('10/funksjonstyper', {
    kort: 'Ulike funksjoner passer til ulike situasjoner. Lær å kjenne dem igjen på formel, tabell og graf.',
    regler: [
      ['📏', 'Lineær', 'y = ax + b. Rett linje. y øker med like mye hver gang.'],
      ['📈', 'Eksponentiell', 'y = a · b<sup>x</sup>. y endres med samme faktor hver gang. Kurven blir brattere og brattere.'],
      ['🔀', 'Andregrad', 'y = ax² + bx + c. Parabel med topp- eller bunnpunkt. a > 0 gir en smilende parabel, a < 0 gir en sur.'],
      ['🧮', 'Brøkfunksjon', 'y = k ÷ x. Når x dobles, halveres y. x = 0 er ikke lov.'],
      ['🔍', 'Kjenne igjen i tabell', 'Legger du til det samme tallet hver gang: lineær. Ganger du med det samme tallet hver gang: eksponentiell.']
    ],
    eks: [
      ['Tabell: x = 0, 1, 2, 3 og y = 5, 10, 20, 40. Hvilken type funksjon?', ['y dobles hver gang: 5 · 2 = 10 og 10 · 2 = 20.', 'Samme faktor hver gang, så den er eksponentiell.', 'y = 5 · 2<sup>x</sup>.'], 'Eksponentiell'],
      ['Parabelen y = x² − 4. Hva er y når x = 3?', ['Sett inn x = 3.', '3² − 4 = 9 − 4.', 'y = 5.'], '5']
    ],
    pass: ['Lineær: pluss det samme. Eksponentiell: gange med det samme.', 'En parabel er symmetrisk om en loddrett linje.', 'I en brøkfunksjon kan du ikke dele på 0.'],
    trick: 'Se på hvordan y endres når x øker med 1. Like hopp i pluss: lineær. Like hopp i gange: eksponentiell.',
    ord: [['Eksponentiell', 'Vokser eller minker med samme faktor hver gang.'], ['Parabel', 'Grafen til en andregradsfunksjon.'], ['Topp-/bunnpunkt', 'Det høyeste eller laveste punktet på en parabel.']],
    test: [['y = 3, 6, 12, 24. Lineær eller eksponentiell?', 'Eksponentiell (ganger med 2)'], ['Hva heter grafen til y = x²?', 'Parabel']]
  });

  R('10/vekstfaktor', {
    kort: 'Vekstfaktoren er tallet du ganger med for å få en prosentvis endring.',
    regler: [
      ['🔼', 'Økning', 'Vekstfaktor = 1 + prosent ÷ 100. 20 % økning gir 1,20.'],
      ['🔽', 'Nedgang', 'Vekstfaktor = 1 − prosent ÷ 100. 15 % nedgang gir 0,85.'],
      ['✖️', 'Ny verdi', 'Ny verdi = gammel verdi · vekstfaktor. 800 kr økt med 25 %: 800 · 1,25 = 1000 kr.'],
      ['🔁', 'Flere perioder', 'Ny verdi = start · vekstfaktor<sup>antall perioder</sup>. 1000 kr med 5 % per år i 3 år: 1000 · 1,05³ ≈ 1 158 kr.'],
      ['↩️', 'Finne prosenten', 'Endring i prosent = (ny − gammel) ÷ gammel · 100.']
    ],
    eks: [
      ['En pris på 400 kr settes ned 30 %. Hva er ny pris?', ['Vekstfaktor: 1 − 0,30 = 0,70.', '400 · 0,70.', 'Ny pris: 280 kr.'], '280 kr'],
      ['Prisen økte fra 200 kr til 250 kr. Hvor mange prosent økte den?', ['Endring: 250 − 200 = 50.', '50 ÷ 200 = 0,25.', 'Økningen var 25 %.'], '25 %']
    ],
    pass: ['20 % økning og så 20 % nedgang gir ikke tilbake til start.', 'Ved nedgang er vekstfaktoren mindre enn 1.', 'Regn prosenten av den gamle verdien, ikke av den nye.'],
    trick: 'Sjekk svaret: økte det, skal ny verdi være større enn gammel.',
    ord: [['Vekstfaktor', 'Tallet du ganger med for å få ny verdi.'], ['Prosentvis endring', 'Endring som del av den gamle verdien.'], ['Eksponentiell vekst', 'Vekst med samme faktor hver periode.']],
    test: [['Hva er vekstfaktoren for 12 % økning?', '1,12'], ['500 kr minker med 10 %. Hva er ny verdi?', '450 kr']]
  });

  R('10/kjop-sparing-lan', {
    kort: 'Renter er prisen for å låne penger, eller belønningen for å spare.',
    regler: [
      ['💰', 'Rente', 'Rente = beløp · rentesats. 5 000 kr med 4 % rente i ett år: 5 000 · 0,04 = 200 kr.'],
      ['🔁', 'Rentes rente', 'Saldo = start · (1 + r)<sup>år</sup>. Du får rente på renter du har fått før.'],
      ['🏦', 'Lån', 'Du betaler tilbake lånet pluss renter og gebyrer. Annuitetslån: like terminbeløp. Serielån: like store avdrag og synkende renter.'],
      ['💳', 'Kreditt', 'Kredittkjøp og forbrukslån har ofte høy rente. Sammenlign totalprisen, ikke bare månedsbeløpet.'],
      ['📊', 'Effektiv rente', 'Effektiv rente tar med gebyrer og viser den virkelige kostnaden. Bruk den til å sammenligne lån.']
    ],
    eks: [
      ['20 000 kr står på konto i 4 år med 3 % rente. Hvor mye står der til slutt?', ['Vekstfaktor: 1,03.', '20 000 · 1,03⁴ (1,03⁴ ≈ 1,1255).', 'Saldo ≈ 22 510 kr.'], '≈ 22 510 kr'],
      ['En mobil koster 6 000 kr kontant, eller 300 kr i måneden i 24 måneder. Hva koster delbetalingen ekstra?', ['300 · 24 = 7 200 kr.', '7 200 − 6 000 = 1 200 kr.', 'Du betaler 1 200 kr ekstra.'], '1 200 kr']
    ],
    pass: ['Ved rentes rente regner du vekstfaktor<sup>år</sup>, ikke rente · år.', 'Sammenlign totalpris, ikke bare månedsbeløpet.', 'Husk gebyrer når du regner kostnaden for et lån.'],
    trick: 'Regn alltid hva du betaler til sammen. Trekk fra hva du fikk. Det er prisen for å låne.',
    ord: [['Rente', 'Prisen for å låne, eller belønningen for å spare.'], ['Saldo', 'Hvor mye penger som står på kontoen.'], ['Effektiv rente', 'Renten når du har tatt med gebyrer.']],
    test: [['2 000 kr, 5 % rente i ett år. Hvor mye rente?', '100 kr'], ['Hva viser effektiv rente?', 'Den virkelige kostnaden, med gebyrer']]
  });

  R('10/okonomi-prosjekt', {
    kort: 'I et økonomiprosjekt planlegger du, regner ut og forklarer en del av en egen eller en tenkt økonomi.',
    regler: [
      ['🧭', 'Planlegg', 'Skriv hva du vil finne ut, og hvilke tall du trenger: inntekt, utgifter, sparemål.'],
      ['🧮', 'Regn ut', 'Lag et budsjett. Inntekter − utgifter = overskudd. Vis utregningene.'],
      ['📊', 'Vis resultatene', 'Bruk tabell og diagram. Pass på tydelige akser og enheter.'],
      ['🗣️', 'Vurder', 'Er svaret realistisk? Hva skjer hvis tallene endrer seg?'],
      ['🧾', 'Presenter', 'Fortell med egne ord hva du gjorde, hva du fant og hva du lærte.']
    ],
    eks: [
      ['Inntekt 6 000 kr og utgifter 4 800 kr i måneden. Hvor lang tid tar det å spare 12 000 kr?', ['Overskudd: 6 000 − 4 800 = 1 200 kr i måneden.', '12 000 ÷ 1 200 = 10.', 'Det tar 10 måneder.'], '10 måneder']
    ],
    pass: ['Skriv forutsetningene dine, for eksempel «jeg antar at prisen er lik hele året».', 'Vis utregninger, ikke bare svar.', 'Sjekk at tallene er realistiske.'],
    trick: 'Lag en tabell med inntekt og utgifter måned for måned før du regner.',
    ord: [['Budsjett', 'En plan for inntekter og utgifter.'], ['Forutsetning', 'Noe du antar for å kunne regne.'], ['Overskudd', 'Det som er til overs etter utgiftene.']],
    test: [['Inntekt 8 000 og utgifter 6 500. Hva er overskuddet?', '1 500 kr'], ['Hvorfor skrive forutsetninger?', 'Så leseren ser hva svaret bygger på']]
  });

  R('10/modellering', {
    kort: 'En matematisk modell beskriver virkeligheten med en formel eller en graf. Den er aldri helt riktig, men kan være nyttig.',
    regler: [
      ['🧩', 'Lag modellen', 'Velg en funksjonstype som passer til tallene: lineær, eksponentiell eller andregrad.'],
      ['🎯', 'Tilpass', 'Finn verdiene i modellen med regresjon, eller med to punkter.'],
      ['🔍', 'Test', 'Sammenlign modellen med de virkelige tallene. Hvor godt passer den?'],
      ['⚠️', 'Begrens', 'Si hvor modellen gjelder. Utenfor området den er testet for, kan den bli urealistisk.'],
      ['📝', 'Forbedre', 'Avviker modellen mye? Prøv en annen funksjonstype eller flere data.']
    ],
    eks: [
      ['Data: x = 0, 1, 2, 3 og y = 100, 120, 140, 160. Lag en modell.', ['y øker med 20 hver gang, så modellen er lineær med a = 20.', 'Startverdien er 100.', 'Modell: y = 20x + 100. For x = 10 gir den 300.'], 'y = 20x + 100']
    ],
    pass: ['En modell er en forenkling.', 'Modellen gjelder bare innenfor området den er testet.', 'Vurder alltid om svaret gir mening.'],
    trick: 'Spør alltid: Passer modellen med virkeligheten? Hva har jeg forenklet?',
    ord: [['Modell', 'En forenklet beskrivelse av virkeligheten.'], ['Regresjon', 'Å finne funksjonen som passer best til dataene.'], ['Prediksjon', 'Å bruke modellen til å si noe om det som ikke er målt.']],
    test: [['Hva betyr det at en modell er en forenkling?', 'Den beskriver virkeligheten bare omtrent'], ['Hvordan tester du en modell?', 'Ved å sammenligne med virkelige tall']]
  });

  R('10/python', {
    kort: 'Python er et programmeringsspråk. Vi bruker det til å regne, tegne og utforske matte.',
    regler: [
      ['📦', 'Variabler og regning', 'x = 5 og y = x ** 2 gir y = 25. ** er potens, // er heltallsdivisjon og % er rest.'],
      ['🔁', 'Løkker', 'for i in range(1, 6): gir i = 1, 2, 3, 4, 5. while gjentar så lenge en betingelse er sann.'],
      ['🔀', 'Valg', 'if, elif og else velger mellom flere veier.'],
      ['🧰', 'Funksjoner', 'def f(x): return 2 * x + 1. Da er f(3) lik 7.'],
      ['📋', 'Lister', 'tall = [2, 4, 6]. len(tall) er 3, og sum(tall) er 12.']
    ],
    eks: [
      ['def f(x): return 3 * x - 2. Hva skriver print(f(4)) ut?', ['f(4) = 3 · 4 - 2.', '12 - 2 = 10.', 'Programmet skriver 10.'], '10'],
      ['summer = 0, for i in range(1, 5): summer += i, print(summer). Hva skrives ut?', ['i er 1, 2, 3 og 4.', '1 + 2 + 3 + 4.', 'Utskrift: 10.'], '10']
    ],
    pass: ['range(1, 5) stopper før 5.', 'Innrykk er viktig i Python.', '= legger inn en verdi, == sjekker om to ting er like.'],
    trick: 'Kjør koden i hodet: skriv opp variablene i en tabell, linje for linje.',
    ord: [['Variabel', 'Et navn på en verdi.'], ['Funksjon', 'En kodebit du kan bruke flere ganger.'], ['Liste', 'Flere verdier samlet i én variabel.']],
    test: [['Hva skriver print(7 // 2) ut?', '3'], ['Hva skriver print(7 % 2) ut?', '1']]
  });
})();
