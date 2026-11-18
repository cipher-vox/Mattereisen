/* Lærerveiledning 8. trinn */
(function () {
  const H = window.MATTE.H, L = H.LAERER;

  L('8/negative-tall', {
    tid: '3–4 timer (repetisjon)',
    forkunn: ['Tallinja og posisjonssystemet', 'Addisjon og subtraksjon med hele tall'],
    husk: ['Minus foran et tall betyr «motsatt». −(−3) = 3.', 'Pluss og minus ved siden av hverandre: tegnene slås sammen. 5 − (−2) = 5 + 2.', 'Negativt ganger negativt gir positivt. Negativt ganger positivt gir negativt.'],
    feil: ['Å tro at −5 er større enn −2 fordi 5 er større enn 2.', 'Å regne 3 − 5 som 2 (bytter om rekkefølgen).', 'Å glemme parentesen og få to regnetegn rett etter hverandre.'],
    start: 'Vis temperaturer en vinterdag på tavla (−8, −2, 3, −5). Be elevene sortere dem fra kaldest til varmest og forklare for sidemannen hvorfor.',
    midt: 'La elevene arbeide med tallinja og med vektmodellen (positive og negative brikker). Bruk spillene Heisen og Tallknuseren som oppvarming. Gå fra konkret modell til regel først etter at de har forklart med egne ord.',
    slutt: 'Utgangsbillett: «Forklar hvorfor 4 − (−3) = 7 på to forskjellige måter.»',
    samtale: ['Hva betyr det at to tall er hverandres motsatte?', 'Hvorfor blir −2 · −3 positivt? Finn et mønster i en tabell.', 'Når møter vi negative tall utenfor skolen?'],
    diff: { rolig: 'Hold deg til addisjon og små tall mellom −10 og 10. Bruk tallinja i Hjelp-panelet.', vanlig: 'Alle fire regneartene med hele tall, og tekstoppgaver.', utfordring: 'Uttrykk med flere parenteser og tall utenfor −20 til 20.' },
    vurdering: 'Se etter om eleven kan forklare fortegnsregler med en modell, ikke bare utenatlært regel. Be om en kort begrunnelse i hver oppgave.'
  });

  L('8/regneregler', {
    tid: '3–4 timer',
    forkunn: ['Fire regneartene', 'Gangetabellen'],
    husk: ['Regneartenes rekkefølge: parentes, potens, gange og dele, pluss og minus.', 'Gange kan byttes om og grupperes: 4 · 7 · 25 = 4 · 25 · 7.', 'Fordelingsregelen: a(b + c) = ab + ac.'],
    feil: ['Å regne fra venstre mot høyre uten å ta hensyn til regnerekkefølgen.', 'Å glemme å gange med begge leddene i parentesen.', 'Å tro at a − b = b − a.'],
    start: 'Skriv 7 · 98 på tavla og spør hvem som kan regne det i hodet. Samle strategier (7 · 100 − 7 · 2) og gi hver strategi et navn.',
    midt: 'La elevene lage egne strategier for hoderegning og vise dem med en tegning eller et uttrykk. Skriv ut et øvingsark fra arksiden.',
    slutt: 'Utgangsbillett: «Vis to måter å regne 15 · 12 i hodet.»',
    samtale: ['Hvilken strategi er raskest for deg? Hvorfor?', 'Når fungerer en strategi, og når fungerer den ikke?', 'Hvordan kan vi vise at strategien alltid stemmer?'],
    diff: { rolig: 'Bruk tierlignende tall (10, 100) og én strategi om gangen.', vanlig: 'Flere strategier og egne eksempler.', utfordring: 'Generaliser strategiene med bokstaver.' },
    vurdering: 'Vurder om eleven kan velge en smart strategi og forklare den, ikke bare få riktig svar.'
  });

  L('8/faktorisering', {
    tid: '4–5 timer',
    forkunn: ['Gangetabellen', 'Brøk som del av en helhet'],
    husk: ['Et primtall har nøyaktig to faktorer: 1 og seg selv. 1 er ikke et primtall.', 'Primtallsfaktorisering: del opp til bare primtall gjenstår.', 'Felles faktorer brukes til å forkorte brøker.'],
    feil: ['Å regne 1 som et primtall.', 'Å stoppe faktoriseringen for tidlig (f.eks. 12 = 3 · 4).', 'Å forkorte med et tall som ikke går opp i både teller og nevner.'],
    start: 'Gi hver elev et tall mellom 12 og 60. «Finn alle måter å dele det opp i faktorer.» Sammenlign: hvem fikk flest? Hvorfor?',
    midt: 'Faktortrær, deretter felles faktorer i to tall. Bruk Primtalljakten som øvelse. Gå til brøkforkorting når de behersker primtallsfaktorisering.',
    slutt: 'Utgangsbillett: «Primtallsfaktoriser 36 og bruk det til å forkorte 36/48.»',
    samtale: ['Hvorfor er 2 det eneste partallet som er primtall?', 'Gir faktortreet alltid samme svar uansett hvor du starter?', 'Hvordan hjelper faktorisering oss i brøkregning?'],
    diff: { rolig: 'Faktoriser tall under 50 med faktortre og gangetabell.', vanlig: 'Tall opp til 200 og brøkforkorting.', utfordring: 'Felles faktorer (største felles faktor) og minste felles multiplum.' },
    vurdering: 'Se etter om eleven kan begrunne at faktoriseringen er ferdig og bruke den på en ny oppgave.'
  });

  L('8/potenser', {
    tid: '4–5 timer',
    forkunn: ['Multiplikasjon', 'Tierpotenser i posisjonssystemet'],
    husk: ['aⁿ betyr a gangen n ganger: 2³ = 2 · 2 · 2 = 8.', 'a⁰ = 1.', 'Standardform: et tall mellom 1 og 10 ganger en tierpotens.'],
    feil: ['Å regne 2³ som 2 · 3 = 6.', 'Å tro at (−2)² og −2² er det samme.', 'Å gjøre potens og gange i feil rekkefølge.'],
    start: 'Papirbrettingsoppgaven: Hvor tykt blir et ark brettet 10 ganger? Gjett først, regn etterpå. Bruk det til å vise hvor raskt potenser vokser.',
    midt: 'Fra gjentatt multiplikasjon til regneregler (aⁿ · aᵐ). Bruk Potens-memory og Vekstfaktor-spillet. Standardform med store og små tall fra naturfag.',
    slutt: 'Utgangsbillett: «Skriv 4 500 000 i standardform og forklar hva eksponenten forteller.»',
    samtale: ['Hvorfor er a⁰ = 1? Finn mønsteret.', 'Hva er forskjellen på 3² og 2³?', 'Hvor brukes standardform?'],
    diff: { rolig: 'Små potenser av 2, 3 og 10. Skriv ut som gjentatt gange.', vanlig: 'Regneregler og standardform.', utfordring: 'Negative eksponenter og sammensatte uttrykk.' },
    vurdering: 'Se etter om eleven kan forklare hva eksponenten betyr, og bruke reglene i nye situasjoner.'
  });

  L('8/kvadratrot', {
    tid: '3 timer',
    forkunn: ['Potenser', 'Kvadrattall'],
    husk: ['Kvadratroten av a er tallet som ganget med seg selv gir a: √25 = 5.', 'Kvadrattall: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100.', 'Mellom kvadrattallene er roten et desimaltall.'],
    feil: ['Å tro at √16 = 8 (halvparten).', 'Å tro at √(a + b) = √a + √b.', 'Å glemme at roten av et negativt tall ikke finnes blant reelle tall.'],
    start: 'Vis et kvadrat med areal 49 cm². Hvor lang er siden? Gjenta med 50. Hva er forskjellen på de to?',
    midt: 'Bruk Rotjegeren til å trene kvadrattall. Estimer røtter mellom to hele tall og sjekk med kalkulator.',
    slutt: 'Utgangsbillett: «Mellom hvilke to hele tall ligger √30? Hvordan vet du det?»',
    samtale: ['Hva har kvadratroten med areal å gjøre?', 'Hvorfor kan vi ikke ta kvadratroten av −4?', 'Hvordan finner du omtrent √50 uten kalkulator?'],
    diff: { rolig: 'Kjenn igjen kvadrattallene til 100.', vanlig: 'Estimering og kalkulator.', utfordring: 'Forenkling av røtter, f.eks. √50 = 5√2.' },
    vurdering: 'Se etter om eleven kobler roten til sidelengde i kvadrat og kan estimere.'
  });

  L('8/monstre', {
    tid: '3–4 timer',
    forkunn: ['Tallmønstre fra barneskolen'],
    husk: ['Et mønster kan beskrives med ord, tabell, tegning og formel.', 'Regel for figur n: finn hva som endres hver gang og hva som er likt.', 'Sjekk formelen mot minst to figurer du ikke brukte til å lage den.'],
    feil: ['Å bare beskrive neste figur og ikke en generell regel.', 'Å bruke «+3» som formel i stedet for 3n + …', 'Å glemme startverdien i formelen.'],
    start: 'Vis de tre første figurene i et fyrstikkmønster. Be elevene tegne figur 4 og gjette antall på figur 10 før noen formel.',
    midt: 'Fra tegning til tabell til formel. Bruk Mønsterjakten. La elevene lage egne mønstre og la sidemannen finne regelen.',
    slutt: 'Utgangsbillett: «Skriv en formel for mønsteret og vis at den stemmer for figur 3.»',
    samtale: ['Er det flere formler som beskriver samme mønster?', 'Hvordan ser du på figuren at det er 3n + 1?', 'Hva forteller tallet foran n?'],
    diff: { rolig: 'Rekursive regler («legg til 3») og tabell.', vanlig: 'Formel i n.', utfordring: 'Kvadratiske mønstre og bevis for formelen.' },
    vurdering: 'Se etter om eleven kobler figur, tabell og formel, og kan teste formelen.'
  });

  L('8/uttrykk', {
    tid: '4 timer',
    forkunn: ['Regneregler', 'Mønstre'],
    husk: ['En variabel er en bokstav som står for et tall.', '3x betyr 3 · x.', 'Samme bokstav kan trekkes sammen: 2x + 3x = 5x.'],
    feil: ['Å skrive 3 + x som 3x.', 'Å tro at x² = 2x.', 'Å trekke sammen ulike ledd: 2x + 3 = 5x.'],
    start: 'En pizza koster 120 kr og hver ekstra topping 15 kr. «Skriv en regel for prisen.» Samle formuleringer og gjør dem om til et uttrykk.',
    midt: 'Fra tekst til uttrykk og tilbake. Regn ut verdien av uttrykk når bokstaven får en verdi. Bruk Feiljegeren.',
    slutt: 'Utgangsbillett: «Lag en situasjon som passer med uttrykket 50 + 10x.»',
    samtale: ['Hva står x for i uttrykket ditt?', 'Hvordan vet vi at to uttrykk er like?', 'Hva er forskjellen på et uttrykk og en ligning?'],
    diff: { rolig: 'Sett inn tall i enkle uttrykk.', vanlig: 'Lag uttrykk fra tekst og trekk sammen.', utfordring: 'Uttrykk med parenteser og flere variabler.' },
    vurdering: 'Se etter om eleven kan forklare hva bokstaven betyr, og skille ledd som kan trekkes sammen.'
  });

  L('8/ligninger', {
    tid: '5–6 timer',
    forkunn: ['Uttrykk og variabler', 'Negative tall'],
    husk: ['Ligningen er en vekt i balanse: gjør det samme på begge sider.', 'Sett prøve: sett svaret inn og sjekk.', 'Skriv hvert steg på en ny linje.'],
    feil: ['Å flytte et tall uten å bytte fortegn.', 'Å gjøre noe bare på den ene siden.', 'Å ikke sjekke svaret mot teksten.'],
    start: 'Vis en balansevekt: x + 3 på den ene siden og 8 på den andre. «Hva må x være?» La elevene forklare uten regler.',
    midt: 'Vektmodellen, så algebraisk løsning. Bruk Ligningsmaskinen. Tekstoppgaver der de lager ligningen selv.',
    slutt: 'Utgangsbillett: «Løs 3x + 2 = 14 og sett prøve.»',
    samtale: ['Hvorfor må vi gjøre det samme på begge sider?', 'Hvordan vet du at svaret er riktig?', 'Kan en ligning ha flere løsninger? Ingen?'],
    diff: { rolig: 'Ett-stegs ligninger og vektmodellen.', vanlig: 'To-stegs og tekstoppgaver.', utfordring: 'Ligninger med x på begge sider og parenteser.' },
    vurdering: 'Se etter at eleven viser stegene, setter prøve og vurderer om svaret gir mening i situasjonen.'
  });

  L('8/ulikheter', {
    tid: '3 timer',
    forkunn: ['Ligninger', 'Tallinja'],
    husk: ['Ulikhetstegn: &lt; mindre enn, &gt; større enn, ≤ mindre enn eller lik.', 'Løses som ligninger, men løsningen er mange tall.', 'Ved å gange eller dele med et negativt tall snus ulikhetstegnet.'],
    feil: ['Å glemme å snu tegnet ved negativt tall.', 'Å tro at løsningen bare er ett tall.', 'Å tegne åpen og lukket sirkel feil på tallinja.'],
    start: 'En berg-og-dal-bane krever høyde over 120 cm. Hvem får være med? La elevene vise alle mulige høyder på tallinja.',
    midt: 'Fra situasjon til ulikhet til tallinje. Bruk Ulikhetsvakten. Sammenlign med tilsvarende ligning.',
    slutt: 'Utgangsbillett: «Løs 2x + 1 &lt; 9 og tegn løsningen på tallinja.»',
    samtale: ['Hva er forskjellen på &lt; og ≤ på tallinja?', 'Hvorfor snur tegnet når vi deler med −2?', 'Gi et eksempel fra hverdagen.'],
    diff: { rolig: 'Enkle ulikheter og tallinje.', vanlig: 'To-stegs ulikheter.', utfordring: 'Negative koeffisienter og sammensatte ulikheter.' },
    vurdering: 'Se etter om eleven kan tolke løsningen som en mengde av tall og vise den på tallinja.'
  });

  L('8/funksjoner', {
    tid: '4 timer',
    forkunn: ['Uttrykk', 'Koordinatsystem'],
    husk: ['En funksjon gir nøyaktig én y for hver x.', 'Inn: x. Ut: y.', 'Funksjoner kan vises med tabell, graf, uttrykk og tekst.'],
    feil: ['Å tro at funksjonen er selve grafen og ikke sammenhengen.', 'Å bytte om x og y.', 'Å lese av graf feil på aksene.'],
    start: 'Maskinspill: læreren er en maskin. Elevene sier x, læreren sier y (y = 2x + 1). Hvem finner regelen?',
    midt: 'Lag tabeller, plott punkter og beskriv sammenhengen. Sammenlign to funksjoner.',
    slutt: 'Utgangsbillett: «Er dette en funksjon? Begrunn.» (vis en tabell med en x som gir to y)',
    samtale: ['Hva er x og hva er y i situasjonen din?', 'Hvilken funksjon vokser raskest?', 'Kan to ulike x gi samme y?'],
    diff: { rolig: 'Tabell og enkle regler.', vanlig: 'Graf og formel.', utfordring: 'Sammenlign to funksjoner og finn skjæringspunkt.' },
    vurdering: 'Se etter om eleven kan beskrive hva funksjonen gjør og bytte mellom representasjoner.'
  });

  L('8/representasjoner', {
    tid: '4 timer',
    forkunn: ['Funksjoner', 'Koordinatsystem'],
    husk: ['Tabell, graf, uttrykk og tekst viser samme sammenheng.', 'Startverdi: der grafen krysser y-aksen.', 'Stigning: hvor mye y øker når x øker med 1.'],
    feil: ['Å lese start og stigning feil.', 'Å velge skala som ikke passer.', 'Å forbinde punkter når det ikke gir mening (diskrete data).'],
    start: 'Vis tre grafer av taxipriser. Hvilket selskap er billigst ved 3 km? Ved 10 km? Hvorfor endrer det seg?',
    midt: 'Elevene lager alle fire representasjoner av én situasjon, og oversetter mellom dem.',
    slutt: 'Utgangsbillett: «Gå fra tabellen til formelen, og forklar startverdien.»',
    samtale: ['Hvilken representasjon passer best til spørsmålet ditt?', 'Hva forteller grafen som ikke står i tabellen?', 'Hva er likt og ulikt i to grafer?'],
    diff: { rolig: 'Gå fra tabell til graf.', vanlig: 'Alle fire og oversetting.', utfordring: 'Sammenlign to funksjoner og tolk skjæringspunkt.' },
    vurdering: 'Se etter om eleven kan gå mellom representasjoner og forklare hva hver av dem viser.'
  });

  L('8/programmering', {
    tid: '4–5 timer',
    forkunn: ['Ligninger og uttrykk (for variabler)'],
    husk: ['En algoritme er en oppskrift med klare steg.', 'Test koden med enkle tall du vet svaret på.', 'Les feilmeldingen: den sier hvilken linje og hva som er galt.'],
    feil: ['Å glemme kolon og innrykk.', 'Å bruke = når de mener ==.', 'Å ikke teste med flere verdier.'],
    start: 'Skriv en «oppskrift» for å finne det største av tre tall. La en elev følge den bokstavelig. Finn feilene sammen.',
    midt: 'Fra oppskrift (blokker eller tekst) til første Python-program. Bruk Kode-knekkeren. Forbedre koden: Kan den bli kortere eller raskere?',
    slutt: 'Utgangsbillett: «Hva skriver koden ut? Forklar linje for linje.»',
    samtale: ['Hva er forskjellen på en algoritme og et program?', 'Hvordan tester vi at algoritmen virker?', 'Hva skjer hvis vi bytter rekkefølgen på to linjer?'],
    diff: { rolig: 'Les og forutsi hva kort kode gjør.', vanlig: 'Skriv egne små program.', utfordring: 'Forbedre og generaliser algoritmen.' },
    vurdering: 'Se etter om eleven kan forklare koden og teste den, ikke bare kopiere den.'
  });
})();
