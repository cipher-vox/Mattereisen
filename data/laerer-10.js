/* Lærerveiledning 10. trinn */
(function () {
  const H = window.MATTE.H, L = H.LAERER;

  L('10/algebra', {
    tid: '4–5 timer',
    forkunn: ['Uttrykk og ligninger fra 8. og 9. trinn'],
    husk: ['Fordelingsregelen: a(b + c) = ab + ac.', 'Trekk sammen like ledd.', 'For å vise at noe alltid stemmer: bruk bokstaver, ikke bare eksempler.'],
    feil: ['Å glemme å gange med alle ledd i parentesen.', 'Å trekke sammen ulike ledd.', 'Å tro at eksempler er bevis.'],
    start: 'Tenk på et tall, legg til 3, gang med 2, trekk fra 6, del på 2. Alle får samme som de startet med! Hvorfor?',
    midt: 'Generaliser tallmagi og regneregler. La elevene forklare med bokstaver hvorfor noe alltid er sant.',
    slutt: 'Utgangsbillett: «Vis at summen av tre påfølgende tall alltid er delelig på 3.»',
    samtale: ['Hvorfor er ett eksempel ikke nok?', 'Hva betyr det å forenkle et uttrykk?', 'Finn et uttrykk for alle partall.'],
    diff: { rolig: 'Sett inn tall og trekk sammen.', vanlig: 'Forenkling med parenteser.', utfordring: 'Argumenter for at noe alltid gjelder.' },
    vurdering: 'Se etter om eleven bruker bokstaver for å argumentere generelt.'
  });

  L('10/kvadratsetninger', {
    tid: '3–4 timer',
    forkunn: ['Algebra og parenteser', 'Areal'],
    husk: ['(a + b)² = a² + 2ab + b².', '(a − b)² = a² − 2ab + b².', '(a + b)(a − b) = a² − b².'],
    feil: ['Å skrive (a + b)² = a² + b² (mangler 2ab).', 'Å bruke feil fortegn i midtleddet.', 'Å glemme tredje kvadratsetning: ingen midtledd.'],
    start: 'Tegn et kvadrat med side a + b og del det i fire deler. Hvor stort er hvert areal? Hva er totalen?',
    midt: 'Geometrisk forklaring, så algebraisk. Bruk setningene til hoderegning (51², 49 · 51).',
    slutt: 'Utgangsbillett: «Regn 99 · 101 med tredje kvadratsetning.»',
    samtale: ['Hvor ser du 2ab i tegningen?', 'Når lønner det seg å bruke kvadratsetningene?', 'Hvorfor forsvinner midtleddet i tredje?'],
    diff: { rolig: 'Fyll ut midtleddet og regn tallmessige eksempler.', vanlig: 'Bruk setningene på uttrykk.', utfordring: 'Bruk baklengs (faktorisering).' },
    vurdering: 'Se etter om eleven kobler setningen til arealtegningen.'
  });

  L('10/ligningssett', {
    tid: '5 timer',
    forkunn: ['Ligninger', 'Lineære funksjoner'],
    husk: ['Løsningen er skjæringspunktet mellom to linjer.', 'Innsettingsmetoden: løs for én variabel og sett inn.', 'Addisjonsmetoden: legg sammen ligningene for å fjerne en variabel.'],
    feil: ['Å løse for bare én variabel.', 'Å regne feil fortegn når ligninger trekkes fra hverandre.', 'Å ikke sette prøve i begge ligningene.'],
    start: 'To mobilabonnement: ett med 100 kr fast og 2 kr per GB, ett med 50 kr fast og 4 kr per GB. Når er de like dyre?',
    midt: 'Grafisk løsning først (GeoGebra), deretter innsetting og addisjon. Lag ligningssett fra tekst.',
    slutt: 'Utgangsbillett: «Løs x + y = 8 og x − y = 2 og sett prøve.»',
    samtale: ['Hva forteller skjæringspunktet i situasjonen?', 'Når passer innsetting best?', 'Kan et ligningssett ha ingen eller uendelig mange løsninger?'],
    diff: { rolig: 'Sett inn og finn y.', vanlig: 'Løs med en metode.', utfordring: 'Velg metode, tolk og sjekk.' },
    vurdering: 'Se etter om eleven setter prøve og tolker løsningen i situasjonen.'
  });

  L('10/stigningstall', {
    tid: '4 timer',
    forkunn: ['Funksjoner', 'Koordinatsystem'],
    husk: ['a = (y₂ − y₁) ÷ (x₂ − x₁).', 'y = ax + b: a er stigning, b er startverdi.', 'Stigningstallet er endring per enhet.'],
    feil: ['Å dele x-endring på y-endring.', 'Å bytte rekkefølge på tall i teller og nevner.', 'Å blande stigningstall og konstantledd.'],
    start: 'Vis en bakke som 8 % stigning. Hva betyr det? Finn tilsvarende tall for en trapp.',
    midt: 'Fra fart og pris til stigningstall. Finn formelen fra to punkter. Bruk Myntjakt (linje).',
    slutt: 'Utgangsbillett: «Finn linjen gjennom (1, 3) og (3, 7).»',
    samtale: ['Hva forteller stigningstallet i situasjonen?', 'Hva betyr negativt stigningstall?', 'Hva skjer når stigningstallet er 0?'],
    diff: { rolig: 'Les av stigning fra formel og tabell.', vanlig: 'Finn formelen fra to punkter.', utfordring: 'Parallelle og normale linjer og tolkning.' },
    vurdering: 'Se etter om eleven tolker stigning og startverdi i situasjonen.'
  });

  L('10/funksjonstyper', {
    tid: '5 timer',
    forkunn: ['Lineære funksjoner', 'Potenser'],
    husk: ['Lineær: lik økning. Eksponentiell: lik faktor. Kvadratisk: bøyd, med topp- eller bunnpunkt.', 'Brøkfunksjon: y = k/x.', 'Bruk GeoGebra til å utforske endring av parametere.'],
    feil: ['Å tro at alle økende grafer er lineære.', 'Å blande y = 2x og y = x².', 'Å ikke teste flere verdier.'],
    start: 'Fire tabeller på tavla. Elevene sorterer dem etter vekstmønster uten å kjenne navnene.',
    midt: 'Utforsk typene i GeoGebra. Endre parametere og se hva som skjer. Bruk Myntjakt (kurver).',
    slutt: 'Utgangsbillett: «Hvilken funksjonstype passer? 2, 6, 18, 54.»',
    samtale: ['Hva er felles for alle lineære funksjoner?', 'Hvorfor vokser eksponentiell raskere til slutt?', 'Hvor ser du andregradsfunksjoner i virkeligheten?'],
    diff: { rolig: 'Kjenn igjen type fra tabell.', vanlig: 'Sammenlign grafer og formler.', utfordring: 'Velg type til modell.' },
    vurdering: 'Se etter om eleven begrunner valg av type med mønsteret i data.'
  });

  L('10/vekstfaktor', {
    tid: '4 timer',
    forkunn: ['Prosent', 'Potenser'],
    husk: ['Vekstfaktor = 1 + endring (som desimaltall).', 'Ny verdi = gammel verdi · vekstfaktor.', 'Etter n perioder: gammel verdi · vekstfaktorⁿ.'],
    feil: ['Å legge til prosent i stedet for å gange med faktor.', 'Å tro at 10 % opp og 10 % ned gir samme tall.', 'Å regne prosent av feil grunnlag.'],
    start: 'En pris øker 10 % og synker så 10 %. Er den tilbake til start? La elevene regne med ulike startpriser.',
    midt: 'Fra enkelt prosentregning til vekstfaktor, flere perioder og eksponentiell vekst. Bruk Rente-raketten.',
    slutt: 'Utgangsbillett: «Hva er vekstfaktoren for 15 % nedgang, og hva blir 800 kr etter 2 nedganger?»',
    samtale: ['Hvorfor er vekstfaktor praktisk?', 'Hvordan finner du prosent endring fra to tall?', 'Hvor ser du eksponentiell vekst?'],
    diff: { rolig: 'En endring av gangen.', vanlig: 'Flere perioder.', utfordring: 'Baklengs regning og sammensatte endringer.' },
    vurdering: 'Se etter at eleven bruker vekstfaktor og tolker prosent riktig.'
  });

  L('10/kjop-sparing-lan', {
    tid: '5 timer',
    forkunn: ['Vekstfaktor', 'Prosent'],
    husk: ['Rente er prisen for å låne penger eller belønning for å spare.', 'Renters rente: saldo · vekstfaktor for hvert år.', 'Kredittkjøp koster ekstra: sammenlign totalprisen.'],
    feil: ['Å glemme at rente kommer på rente.', 'Å bare se på månedsbeløpet, ikke totalen.', 'Å blande nominell og effektiv rente.'],
    start: 'Kjøp en mobil for 6000 kr kontant eller 400 kr i 18 måneder. Hva er forskjellen?',
    midt: 'Sparing med rente, lån og kredittkjøp. Bruk regneark til tabeller. Bruk Rente-raketten.',
    slutt: 'Utgangsbillett: «Hvor mye har du etter 3 år på 5000 kr med 4 % rente?»',
    samtale: ['Hvorfor er sparing mer verdt over lang tid?', 'Når kan et lån være lurt?', 'Hva må du huske på ved kredittkjøp?'],
    diff: { rolig: 'Rente ett år og enkle sammenligninger.', vanlig: 'Flere år og tabeller.', utfordring: 'Lån, avdrag og totalkostnad.' },
    vurdering: 'Se etter at eleven sammenligner totalpris og forklarer valg.'
  });

  L('10/okonomi-prosjekt', {
    tid: '6–8 timer (prosjekt)',
    forkunn: ['Kjøp, sparing og lån', 'Regneark'],
    husk: ['Planlegg: problemstilling, data, regning, presentasjon.', 'Bruk regneark og diagram.', 'Vurder hvor sikre svarene er.'],
    feil: ['For stor problemstilling.', 'Å ikke begrunne antakelser.', 'Å presentere tall uten å forklare dem.'],
    start: 'Vis et eksempelbudsjett for en ungdom. Hva mangler? Hva er urealistisk? La elevene velge sin egen problemstilling.',
    midt: 'Arbeid i grupper eller alene med eget prosjekt. Veiled med spørsmål, ikke svar. Bruk sjekkliste for innhold.',
    slutt: 'Presentasjon: «Hva fant du, og hvor sikker er du?»',
    samtale: ['Hvilke antakelser har du gjort?', 'Hva ville endret konklusjonen din?', 'Hvordan kan andre sjekke utregningen?'],
    diff: { rolig: 'Lag enkelt budsjett med færre poster.', vanlig: 'Budsjett og sparing.', utfordring: 'Scenarioer og følsomhetsanalyse.' },
    vurdering: 'Se på planlegging, utregning, presentasjon og refleksjon. Bruk gjerne kriterier elevene kjenner på forhånd. Prosjektene bør ikke inneholde reelle personopplysninger.'
  });

  L('10/modellering', {
    tid: '5 timer',
    forkunn: ['Funksjonstyper', 'Regneark eller GeoGebra'],
    husk: ['Modell: en enkel regel som beskriver virkeligheten.', 'Test modellen mot data.', 'Vurder gyldighet: Når fungerer modellen, og når fungerer den ikke?'],
    feil: ['Å velge modell uten å teste.', 'Å tro at modellen er sannheten.', 'Å bruke modellen utenfor området.'],
    start: 'Vis data: folketall over tid eller pris mot antall. «Hvilken regel passer?»',
    midt: 'Samle data, velg modelltype, finn formelen med regneark eller GeoGebra, test og vurder.',
    slutt: 'Utgangsbillett: «Hvor langt kan vi stole på modellen din? Hvorfor?»',
    samtale: ['Hva er forenklet i modellen?', 'Når slutter modellen å stemme?', 'Hvordan kan modellen forbedres?'],
    diff: { rolig: 'Bruk gitt modell og regn ut verdier.', vanlig: 'Velg og test modell.', utfordring: 'Sammenlign flere modeller og vurder.' },
    vurdering: 'Se etter om eleven begrunner modellvalget og vurderer gyldigheten.'
  });

  L('10/python', {
    tid: '5 timer',
    forkunn: ['Algoritmer og enkel programmering fra 8. trinn'],
    husk: ['Variabler lagrer verdier.', 'for-løkke gjentar, if tester.', 'Les koden linje for linje og forutsi hva den gjør.'],
    feil: ['Å glemme innrykk og kolon.', 'Å bruke = i stedet for ==.', 'Å tro at koden kjører alle linjer samtidig.'],
    start: 'Vis fem linjer kode og la elevene gjette hva som skrives ut. Sjekk og diskuter.',
    midt: 'Lese og forklare kode, så endre og skrive egne små program. Bruk Python-kurset og Kode-knekkeren.',
    slutt: 'Utgangsbillett: «Forklar hva koden gjør, linje for linje.»',
    samtale: ['Hva skjer i hver runde i løkken?', 'Hvorfor kan samme matte løses på flere måter i kode?', 'Hvordan finner du en feil?'],
    diff: { rolig: 'Forutsi utskrift av korte programmer.', vanlig: 'Endre og skrive små program.', utfordring: 'Utforsk matte med kode.' },
    vurdering: 'Se etter at eleven kan forklare koden og forutsi resultatet.'
  });
})();
