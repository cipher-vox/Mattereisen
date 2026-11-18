/* Regelbok 8. trinn.
   M.regelbok[key] = { kort, regler:[[ikon, tittel, tekst]], eks:[[oppgave, [steg], svar]], pass:[], trick, ord:[[ord, forklaring]], test:[[spørsmål, svar]] }
   Brukes til regelbok-sider (utskrift/Word) og til forklaringene i Tempo-visningen. */
(function () {
  const M = window.MATTE; M.regelbok = M.regelbok || {};
  const R = (key, o) => { M.regelbok[key] = o; };

  R('8/negative-tall', {
    kort: 'Negative tall er tall som er mindre enn null, som temperaturer under null grader.',
    regler: [
      ['🧭', 'Tallinja', 'Tall til høyre er større. Tall til venstre er mindre. −2 er større enn −10, fordi −2 ligger lenger til høyre.'],
      ['↔️', 'Pluss og minus på tallinja', 'Start på det første tallet. Pluss flytter deg til høyre, minus til venstre. −3 + 5 = 2 og 2 − 6 = −4.'],
      ['🔁', 'To minus blir pluss', 'Å trekke fra et minustall er det samme som å legge til. 5 − (−2) = 5 + 2 = 7.'],
      ['✖️', 'Gange og dele', 'Like fortegn gir pluss: (−3) · (−4) = 12. Ulike fortegn gir minus: (−3) · 4 = −12. Det samme gjelder når du deler.']
    ],
    eks: [
      ['Regn ut −3 + 5', ['Start i −3 på tallinja.', 'Pluss 5 betyr fem skritt til høyre.', '−3 → −2 → −1 → 0 → 1 → 2.'], '2'],
      ['Regn ut 4 − (−3)', ['To minus ved siden av hverandre blir pluss.', '4 − (−3) = 4 + 3.', '4 + 3 = 7.'], '7'],
      ['Regn ut (−2) · (−6) − 5', ['Gange først. Like fortegn gir pluss: (−2) · (−6) = 12.', '12 − 5 = 7.'], '7']
    ],
    pass: ['−5 er ikke større enn −2, selv om 5 er større enn 2.', '3 − 5 er ikke 2. Du får −2.', 'Sett parentes rundt minustall: 4 + (−1), ikke 4 + −1.'],
    trick: 'Tenk temperatur eller heis: opp er pluss, ned er minus.',
    ord: [['Motsatt tall', 'Tallet på andre siden av 0, like langt unna. 3 og −3 er motsatte.'], ['Absoluttverdi', 'Hvor langt et tall er fra 0. |−4| = 4.'], ['Fortegn', 'Pluss eller minus foran tallet.']],
    test: [['Regn ut: −7 + 10', '3'], ['Regn ut: (−5) · (−2)', '10']]
  });

  R('8/regneregler', {
    kort: 'Regneregler hjelper deg å regne både riktig og smart, på papir og i hodet.',
    regler: [
      ['📋', 'Rekkefølgen', 'Parentes først, så potens, så gange og dele (fra venstre), til slutt pluss og minus (fra venstre). 3 + 4 · 2 = 3 + 8 = 11.'],
      ['🔄', 'Bytte om', 'Pluss og gange kan byttes om: 4 · 7 = 7 · 4. Minus og dele kan ikke byttes om: 7 − 4 er ikke det samme som 4 − 7.'],
      ['🧩', 'Gruppere', 'Du kan gruppere gange som du vil: 4 · 7 · 25 = 4 · 25 · 7 = 100 · 7 = 700.'],
      ['➗', 'Deletegn', 'Både : og ÷ betyr «dele»: 12 : 4 = 12 ÷ 4 = 3. Du ser begge i bøker, på kalkulator og i oppgaver. Brøkstrek betyr også dele: 12/4 = 3.'],
      ['🍰', 'Fordelingsregelen', 'a(b + c) = ab + ac. Bruk den til å dele opp: 7 · 98 = 7 · (100 − 2) = 700 − 14 = 686.']
    ],
    eks: [
      ['Regn ut 5 + 2 · 3', ['Gange regnes før pluss.', '2 · 3 = 6.', '5 + 6 = 11.'], '11'],
      ['Regn 12 · 15 i hodet', ['Del opp 15 = 10 + 5.', '12 · 10 = 120 og 12 · 5 = 60.', '120 + 60 = 180.'], '180']
    ],
    pass: ['Å regne fra venstre uten å tenke på gange først: 5 + 2 · 3 er 11, ikke 21.', 'Å glemme å gange med alle leddene i parentesen: 3(x + 2) = 3x + 6.', 'a − b er ikke det samme som b − a.'],
    trick: 'Strek under det du skal regne først. Regn bare det, og skriv resten av stykket om.',
    ord: [['Faktor', 'Et tall som blir ganget. I 3 · 4 er 3 og 4 faktorer.'], ['Produkt', 'Svaret når du ganger.'], ['Sum', 'Svaret når du legger sammen.'], ['Ledd', 'Det som legges sammen i et uttrykk.']],
    test: [['Regn ut: 6 + 4 · 3', '18'], ['Regn ut smart: 25 · 4 · 9', '900']]
  });

  R('8/faktorisering', {
    kort: 'Faktorisering betyr å skrive et tall som et produkt av mindre tall.',
    regler: [
      ['🔢', 'Primtall', 'Et primtall kan bare deles på 1 og seg selv: 2, 3, 5, 7, 11, 13, 17, 19, 23. Tallet 1 er ikke et primtall.'],
      ['🌳', 'Primfaktorisering', 'Del tallet opp til alle faktorene er primtall. 60 = 2 · 2 · 3 · 5 = 2² · 3 · 5.'],
      ['🤝', 'Største felles faktor', 'Finn primfaktorene til begge tallene og ta de som er felles. 12 = 2 · 2 · 3 og 18 = 2 · 3 · 3. Felles: 2 · 3 = 6.'],
      ['🍕', 'Forkorte brøk', 'Del teller og nevner på det samme tallet. 12/18 = 2/3 (delt på 6).']
    ],
    eks: [
      ['Primfaktoriser 84', ['84 = 2 · 42.', '42 = 2 · 21.', '21 = 3 · 7.', '84 = 2 · 2 · 3 · 7 = 2² · 3 · 7.'], '2² · 3 · 7'],
      ['Forkort 24/36', ['24 = 2 · 2 · 2 · 3 og 36 = 2 · 2 · 3 · 3.', 'Felles faktorer: 2 · 2 · 3 = 12.', '24 ÷ 12 = 2 og 36 ÷ 12 = 3.'], '2/3']
    ],
    pass: ['1 er ikke et primtall.', '2 er et primtall, og det eneste partallet som er det.', 'Fortsett å dele til alle faktorene er primtall.'],
    trick: 'Prøv å dele på 2, så 3, så 5, så 7. Delelig på 3 hvis tverrsummen er delelig på 3.',
    ord: [['Faktor', 'Et tall som går opp i et annet tall. 3 er en faktor i 12.'], ['Primtall', 'Et tall med bare to faktorer: 1 og seg selv.'], ['Primfaktor', 'En faktor som er et primtall.']],
    test: [['Primfaktoriser 30', '2 · 3 · 5'], ['Er 91 et primtall?', 'Nei, 91 = 7 · 13']]
  });

  R('8/potenser', {
    kort: 'En potens er en kort måte å skrive gjentatt gange på.',
    regler: [
      ['✖️', 'Hva er en potens?', 'a³ = a · a · a. a er grunntallet og 3 er eksponenten. 2⁴ = 2 · 2 · 2 · 2 = 16.'],
      ['➕', 'Gange med samme grunntall', 'Legg sammen eksponentene: a² · a³ = a<sup>5</sup>. 2³ · 2² = 2<sup>5</sup> = 32.'],
      ['➗', 'Dele med samme grunntall', 'Trekk fra eksponentene: a<sup>5</sup> ÷ a² = a³.'],
      ['0️⃣', 'Spesialtilfeller', 'a<sup>0</sup> = 1 og a<sup>1</sup> = a. 10<sup>0</sup> = 1.'],
      ['🔟', 'Tierpotenser og standardform', '10³ = 1000 og 10<sup>−2</sup> = 0,01. Standardform: et tall mellom 1 og 10 ganger en tierpotens. 45 000 = 4,5 · 10<sup>4</sup>.']
    ],
    eks: [
      ['Regn ut 2³ · 2⁴', ['Samme grunntall: legg sammen eksponentene.', '3 + 4 = 7.', '2<sup>7</sup> = 128.'], '128'],
      ['Skriv 0,0032 på standardform', ['Flytt kommaet til det står ett siffer foran: 3,2.', 'Kommaet ble flyttet 3 plasser til høyre.', '0,0032 = 3,2 · 10<sup>−3</sup>.'], '3,2 · 10<sup>−3</sup>']
    ],
    pass: ['2³ er 8, ikke 6. Du ganger 2 med seg selv tre ganger.', '(−2)² = 4, men −2² = −4.', 'a² · a³ = a<sup>5</sup>, ikke a<sup>6</sup>. Du legger sammen eksponentene.'],
    trick: 'Nuller i tierpotenser: 10³ har tre nuller. Negativ eksponent flytter kommaet til venstre.',
    ord: [['Grunntall', 'Tallet som ganges med seg selv.'], ['Eksponent', 'Tallet som sier hvor mange ganger.'], ['Standardform', 'a · 10<sup>n</sup> der a er mellom 1 og 10.']],
    test: [['Regn ut 2<sup>5</sup>', '32'], ['Skriv 3 · 3 · 3 · 3 som potens', '3<sup>4</sup>']]
  });

  R('8/kvadratrot', {
    kort: 'Kvadratroten av et tall er tallet du må gange med seg selv for å få det tallet.',
    regler: [
      ['⬛', 'Kvadrattall', '1, 4, 9, 16, 25, 36, 49, 64, 81, 100. Kvadratet av 7 er 7² = 49.'],
      ['√', 'Kvadratrot', '√49 = 7, fordi 7 · 7 = 49. Kvadratroten er aldri negativ.'],
      ['📏', 'Mellom to hele tall', 'Er tallet ikke et kvadrattall, ligger roten mellom to hele tall. √20 ligger mellom 4 og 5, fordi 16 < 20 < 25.'],
      ['🟦', 'Areal og sidelengde', 'Et kvadrat med areal 36 cm² har sidelengde √36 = 6 cm.']
    ],
    eks: [
      ['Regn ut √81 + 3²', ['√81 = 9, fordi 9 · 9 = 81.', '3² = 9.', '9 + 9 = 18.'], '18'],
      ['Omtrent hva er √30?', ['5² = 25 og 6² = 36.', '30 ligger mellom 25 og 36.', 'Så √30 ligger mellom 5 og 6, nærmere 5,5 (5,5² = 30,25).'], 'ca. 5,5']
    ],
    pass: ['√16 er 4, ikke 8.', '√25 = 5, men √9 + √16 = 7. Du kan ikke ta roten av hvert ledd.', 'Det finnes ingen kvadratrot av et negativt tall blant tallene vi bruker nå.'],
    trick: 'Lær kvadrattallene til 12² = 144 utenat. Da kjenner du igjen mange røtter med en gang.',
    ord: [['Kvadrattall', 'Et tall du får når du ganger et helt tall med seg selv.'], ['Kvadratrot', 'Det motsatte av å kvadrere: √a.'], ['Rot', 'Kort for kvadratrot.']],
    test: [['Hva er √64?', '8'], ['Mellom hvilke hele tall ligger √50?', '7 og 8 (49 < 50 < 64)']]
  });

  R('8/monstre', {
    kort: 'Et mønster følger en regel. Når du finner regelen, kan du finne hvilket tall som helst i rekka.',
    regler: [
      ['🔍', 'Finn forskjellen', 'Se hvor mye tallene øker for hver gang. 3, 7, 11, 15 øker med 4 hver gang.'],
      ['🧮', 'Formel for like store hopp', 'Tall nr n = første tall + (n − 1) · økningen. For 3, 7, 11, … er tall nr n = 3 + (n − 1) · 4 = 4n − 1.'],
      ['🧱', 'Figurtall', 'Tell brikkene i figur 1, 2 og 3 og se hva som endres. Skriv regelen først med ord, så med bokstaver.'],
      ['✅', 'Sjekk formelen', 'Sett inn n = 1, 2 og 3 og se om du får tallene i rekka.']
    ],
    eks: [
      ['Rekka 5, 8, 11, 14, … Finn tall nr 20', ['Økning: 8 − 5 = 3.', 'Formel: 5 + (n − 1) · 3 = 3n + 2.', 'Tall nr 20: 3 · 20 + 2 = 62.'], '62'],
      ['Figur 1 har 4 fyrstikker, og hver ny figur får 3 til. Hvor mange i figur 10?', ['Start 4. Legg til 3 for hver ny figur.', 'Formel: 4 + (n − 1) · 3 = 3n + 1.', 'Figur 10: 3 · 10 + 1 = 31.'], '31']
    ],
    pass: ['Økning 3 betyr ikke at formelen alltid er 3n. Sjekk det første tallet.', 'Sjekk at formelen virker for figur 1.', 'n er nummeret i rekka, ikke tallet i rekka.'],
    trick: 'Lag en tabell med n i den ene raden og tallet i den andre. Da ser du hoppene tydelig.',
    ord: [['Mønster', 'Noe som gjentar seg etter en regel.'], ['Formel', 'En regel skrevet med bokstaver.'], ['Generalisere', 'Å finne en regel som gjelder for alle tilfeller.']],
    test: [['Rekke: 2, 6, 10, 14. Hva er neste tall?', '18'], ['Formel for tall nr n i 2, 6, 10, …', '4n − 2']]
  });

  R('8/uttrykk', {
    kort: 'Et uttrykk bruker bokstaver for tall vi ikke kjenner, eller som kan variere.',
    regler: [
      ['🔤', 'Variabel', 'En bokstav står for et tall. 3x betyr 3 · x. Når x = 4 er 3x = 12.'],
      ['🧮', 'Sette inn', 'Bytt bokstaven med tallet og regn ut. 2x + 5 når x = 3: 2 · 3 + 5 = 11.'],
      ['🧩', 'Like ledd', 'Du kan slå sammen ledd med samme bokstav. 3x + 2x = 5x, men 3x + 2 kan ikke slås sammen.'],
      ['🍰', 'Gange inn i parentes', '2(x + 4) = 2x + 8. Gang med alle leddene i parentesen.']
    ],
    eks: [
      ['Forenkle 4x + 3 + 2x − 1', ['Slå sammen x-leddene: 4x + 2x = 6x.', 'Slå sammen tallene: 3 − 1 = 2.', 'Svar: 6x + 2.'], '6x + 2'],
      ['Pizza koster 120 kr, drikke d kr. Skriv et uttrykk for 3 pizzaer og 2 drikke.', ['3 pizzaer: 3 · 120 = 360.', '2 drikke: 2 · d = 2d.', 'Uttrykk: 360 + 2d.'], '360 + 2d']
    ],
    pass: ['3x + 2 er ikke 5x.', 'x · x er x², ikke 2x.', 'Fortegnet følger med leddet: 5x − 2x = 3x.'],
    trick: 'Tenk på bokstaven som en eske med et tall i. Du kan regne med den uten å åpne den.',
    ord: [['Variabel', 'En bokstav som kan stå for ulike tall.'], ['Ledd', 'En del av et uttrykk som legges sammen eller trekkes fra.'], ['Koeffisient', 'Tallet foran bokstaven. I 5x er 5 koeffisienten.']],
    test: [['Forenkle 5a + 3 − 2a', '3a + 3'], ['Finn verdien av 4x − 1 når x = 3', '11']]
  });

  R('8/ligninger', {
    kort: 'En likning er som en vekt i balanse. Det du gjør på den ene siden, må du gjøre på den andre.',
    regler: [
      ['⚖️', 'Balanse', 'Gjør det samme på begge sider av likhetstegnet. Da holder likningen seg sann.'],
      ['↩️', 'Motsatt regneart', 'Pluss fjernes med minus, og gange fjernes med dele. x + 5 = 12 gir x = 12 − 5 = 7.'],
      ['🪜', 'Flere steg', 'Fjern pluss og minus først, så gange og dele. 3x + 4 = 19 gir 3x = 15 og x = 5.'],
      ['✅', 'Sjekk', 'Sett svaret inn i den første likningen. 3 · 5 + 4 = 19 ✓.']
    ],
    eks: [
      ['Løs 2x − 3 = 9', ['Legg til 3 på begge sider: 2x = 12.', 'Del på 2 på begge sider: x = 6.', 'Sjekk: 2 · 6 − 3 = 9 ✓.'], 'x = 6'],
      ['Løs x ÷ 4 + 1 = 6', ['Trekk fra 1: x ÷ 4 = 5.', 'Gang med 4: x = 20.', 'Sjekk: 20 ÷ 4 + 1 = 6 ✓.'], 'x = 20']
    ],
    pass: ['Gjør du noe på den ene siden, må du gjøre det samme på den andre.', 'Når du deler, må alle leddene deles.', 'Sjekk alltid svaret ved å sette det inn.'],
    trick: 'Tegn en vekt. Hver side må veie det samme hele tiden.',
    ord: [['Likning', 'To uttrykk med likhetstegn mellom.'], ['Løsning', 'Tallet som gjør likningen sann.'], ['Ukjent', 'Tallet vi leter etter, ofte x.']],
    test: [['Løs: x + 9 = 15', 'x = 6'], ['Løs: 4x − 2 = 18', 'x = 5']]
  });

  R('8/ulikheter', {
    kort: 'En ulikhet sier at noe er større eller mindre enn noe annet. Svaret er ofte mange tall.',
    regler: [
      ['🔣', 'Tegnene', '< betyr mindre enn, > betyr større enn, ≤ betyr mindre enn eller lik, ≥ betyr større enn eller lik.'],
      ['📏', 'Løs som en likning', 'Gjør det samme på begge sider. x + 3 > 7 gir x > 4.'],
      ['⭕', 'Tallinja', 'Åpen ring: tallet er ikke med (< og >). Fylt ring: tallet er med (≤ og ≥).'],
      ['🔁', 'Snu tegnet', 'Når du ganger eller deler med et negativt tall, snur ulikhetstegnet. −2x > 6 gir x < −3.']
    ],
    eks: [
      ['Løs 2x + 1 ≤ 9', ['Trekk fra 1: 2x ≤ 8.', 'Del på 2: x ≤ 4.', 'Tallinja: fylt ring i 4 og strek mot venstre.'], 'x ≤ 4'],
      ['Hvilke hele tall passer for x > 2 og x ≤ 5?', ['x må være større enn 2: 3, 4, 5, …', 'x må være mindre enn eller lik 5.', 'Begge krav: 3, 4 og 5.'], '3, 4 og 5']
    ],
    pass: ['x > 4 betyr ikke x = 4. Tallet 4 er ikke med.', 'Åpen ring for < og >, fylt ring for ≤ og ≥.', 'Sjekk med et tall fra løsningen din.'],
    trick: 'Sjekk svaret med ett tall. Passer det i den første ulikheten?',
    ord: [['Ulikhet', 'To uttrykk med <, >, ≤ eller ≥ mellom.'], ['Løsningsmengde', 'Alle tallene som passer.']],
    test: [['Løs: x − 3 < 5', 'x < 8'], ['Hvilke hele tall passer for 1 ≤ x < 4?', '1, 2 og 3']]
  });

  R('8/funksjoner', {
    kort: 'En funksjon er en regel som gjør hvert tall x om til ett bestemt tall y.',
    regler: [
      ['🏭', 'Regnemaskinen', 'Du putter inn x, funksjonen regner, og ut kommer y. Til hver x hører nøyaktig én y.'],
      ['✍️', 'Skrive funksjon', 'f(x) = 2x + 1 betyr: gang x med 2 og legg til 1. f(3) = 2 · 3 + 1 = 7.'],
      ['📊', 'Verditabell', 'Sett inn flere x-verdier og skriv opp y-verdiene i en tabell.'],
      ['📈', 'Stigende og synkende', 'Blir y større når x blir større, er funksjonen stigende. Blir y mindre, er den synkende.']
    ],
    eks: [
      ['f(x) = 3x − 2. Finn f(4).', ['Sett inn x = 4.', '3 · 4 − 2 = 12 − 2.', 'f(4) = 10.'], '10'],
      ['Lag en tabell for y = x + 2', ['x = 0 gir y = 2.', 'x = 1 gir y = 3.', 'x = 2 gir y = 4. y øker med 1 for hver gang x øker med 1.'], 'y = 2, 3, 4']
    ],
    pass: ['f(3) betyr ikke f ganger 3. Det betyr funksjonen når x = 3.', 'Hver x skal gi bare én y.', 'x står på den vannrette aksen, y på den loddrette.'],
    trick: 'Tenk maskin: inn med x, ut med y.',
    ord: [['Funksjon', 'En regel der hver x gir én y.'], ['Variabel', 'Et tall som kan endre seg, som x.'], ['Verditabell', 'En tabell med x- og y-verdier.']],
    test: [['f(x) = 2x + 3. Finn f(5).', '13'], ['Til hver x hører hvor mange y?', 'Nøyaktig én']]
  });

  R('8/representasjoner', {
    kort: 'Den samme funksjonen kan vises med tekst, tabell, graf og formel. De hører sammen.',
    regler: [
      ['🗣️', 'Fire måter', 'Ord, tabell, graf og formel viser det samme på ulike måter.'],
      ['🟢', 'Startverdi og endring', 'I y = ax + b er b startverdien (der grafen krysser y-aksen), og a er hvor mye y endres når x øker med 1.'],
      ['📈', 'Lese av en graf', 'Gå opp fra x på den vannrette aksen til grafen, og bort til y-aksen. Der leser du y.'],
      ['🔄', 'Fra tabell til formel', 'Finn hvor mye y øker for hver x (a), og hva y er når x = 0 (b).']
    ],
    eks: [
      ['Tabell: x = 0, 1, 2, 3 og y = 4, 7, 10, 13. Finn formelen.', ['y øker med 3 hver gang, så a = 3.', 'Når x = 0 er y = 4, så b = 4.', 'Formel: y = 3x + 4.'], 'y = 3x + 4'],
      ['Taxi: 50 kr + 20 kr per km. Formel og pris for 6 km?', ['Startpris 50 og 20 per km.', 'y = 20x + 50.', 'x = 6: 20 · 6 + 50 = 170 kr.'], '170 kr']
    ],
    pass: ['Startverdien er y når x = 0.', 'Sjekk at aksene har lik skala hele veien.', 'Hvis y øker like mye hver gang, skal punktene ligge på en rett linje.'],
    trick: 'Test formelen: sett inn to x-verdier fra tabellen.',
    ord: [['Graf', 'Tegningen av funksjonen i et koordinatsystem.'], ['Koordinatsystem', 'To tallinjer som står vinkelrett på hverandre.'], ['Skjæringspunkt', 'Der to linjer krysser hverandre.']],
    test: [['y = 5x + 2. Hva er startverdien?', '2'], ['Taxi: 30 kr + 10 kr per km. Pris for 4 km?', '70 kr']]
  });

  R('8/programmering', {
    kort: 'En algoritme er en oppskrift en datamaskin kan følge. Programmering er å skrive den slik at maskinen forstår den.',
    regler: [
      ['📋', 'Algoritme', 'En liste med tydelige steg som gjøres i rekkefølge. Da får du samme resultat hver gang.'],
      ['📦', 'Variabel', 'En variabel er en boks med et navn. x = 5 legger tallet 5 i boksen x.'],
      ['🔁', 'Løkke', 'for i in range(3): gjentar det som står under tre ganger (i = 0, 1, 2).'],
      ['🔀', 'Valg', 'if x > 5: gjør noe hvis x er større enn 5. else: gjør noe annet.'],
      ['🐞', 'Feilsøking', 'Les koden linje for linje. Skriv opp hva variablene er etter hver linje.']
    ],
    eks: [
      ['for i in range(3): print(i * 2). Hva skrives ut?', ['Løkken kjører tre ganger: i = 0, 1 og 2.', 'print(i * 2) skriver 0, 2 og 4.', 'Hver verdi kommer på en egen linje.'], '0, 2, 4'],
      ['x = 7. if x > 5: print("stor") else: print("liten"). Hva skrives ut?', ['x er 7.', '7 > 5 er sant, så den første delen kjøres.', 'Programmet skriver stor.'], 'stor']
    ],
    pass: ['Innrykk (mellomrom foran linja) er viktig i Python.', '= legger inn en verdi, == sjekker om to ting er like.', 'range(3) gir 0, 1, 2. Ikke 1, 2, 3.'],
    trick: 'Skriv en tabell med variablene og fyll ut en rad for hver linje du kjører.',
    ord: [['Algoritme', 'Steg-for-steg-oppskrift.'], ['Løkke', 'Kode som gjentas.'], ['Betingelse', 'Noe som er sant eller usant, som x > 5.']],
    test: [['Hva skriver print(2 + 3 * 4) ut?', '14'], ['Hvor mange ganger kjører for i in range(5)?', '5 ganger']]
  });
})();
