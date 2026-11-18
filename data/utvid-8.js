/* Utvidelse 8. trinn: flere Rolig-oppgaver og en Utforsk-del «Finn feilen og vurder» i hvert tema. */
(function () {
  const H = window.MATTE.H, t = H.t, v = H.v, T = H.T, V = H.V, F = H.F, R = H.UTV.rolig, VUR = H.UTV.vurder;

  R('8/negative-tall', [
    t('Regn ut: −5 + 5', 0, ['Start på −5 på tallinja.', 'Gå 5 skritt til høyre.'], '−5 + 5 = 0.'),
    t('Regn ut: −2 − 4', -6, ['Minus betyr skritt til venstre.', 'Start på −2 og gå 4 skritt til venstre.'], '−2 − 4 = −6.'),
    v('Hvilket tall er minst?', ['−1', '−8', '0', '−3'], 1, ['Det som ligger lengst til venstre på tallinja er minst.'], '−8 ligger lengst til venstre, så −8 er minst.'),
    t('Du skylder en venn 20 kr, altså −20. Du får 50 kr og betaler tilbake. Hvor mye har du igjen?', 30, ['Start på −20 og gå 50 til høyre.'], '−20 + 50 = 30 kr.', 'kr')
  ]);
  VUR('8/negative-tall', [
    V('Ola regner −3 − 5 og får 2. Hva er riktig?', ['Han regnet −3 + 5. Riktig svar er −8', 'Svaret 2 er riktig', 'Riktig svar er 8', 'Riktig svar er −2'], 0, 'Minus betyr skritt til venstre fra −3.', '−3 − 5 = −8. Ola fikk 2, som er −3 + 5.'),
    V('Mari sier: «Minus ganger minus blir alltid minus.» Stemmer det?', ['Nei, minus ganger minus gir pluss', 'Ja, alltid', 'Bare med store tall', 'Bare når tallene er like'], 0, 'Prøv: (−4) · (−3).', '(−4) · (−3) = 12, som er positivt.'),
    F('Forklar med egne ord hvorfor −8 er mindre enn −2, selv om 8 er større enn 2.', ['Tegn tallinja: −8 ligger lengre til venstre enn −2.', 'Jo lenger til venstre, desto mindre er tallet.', 'Tenk kulde: −8 grader er kaldere enn −2 grader.'])
  ]);

  R('8/regneregler', [
    t('Regn ut: 10 − 2 · 3', 4, ['Gange regnes før minus.'], '2 · 3 = 6, og 10 − 6 = 4.'),
    t('Regn ut: (4 + 2) · 5', 30, ['Parentesen først.'], '4 + 2 = 6, og 6 · 5 = 30.'),
    t('Regn ut: 20 ÷ 4 + 3', 8, ['Dele før pluss.'], '20 ÷ 4 = 5, og 5 + 3 = 8.'),
    v('Hva skal du regne først i 6 + 3 · 2?', ['3 · 2', '6 + 3', 'Det spiller ingen rolle', '6 · 2'], 0, ['Gange og dele kommer før pluss og minus.'], 'Gange regnes først: 3 · 2 = 6. Så 6 + 6 = 12.')
  ]);
  VUR('8/regneregler', [
    V('Elias regnet 4 + 6 ÷ 2 og fikk 5. Hva er riktig?', ['Han la sammen først. Riktig svar er 7', 'Svaret 5 er riktig', 'Riktig svar er 10', 'Riktig svar er 2'], 0, 'Hva skal du regne først?', '6 ÷ 2 = 3, og 4 + 3 = 7. Elias regnet 4 + 6 = 10 først.'),
    V('Stemmer det at 5 · (2 + 3) = 5 · 2 + 3?', ['Nei: venstre side er 25 og høyre side er 13', 'Ja, de er like', 'Bare for små tall', 'Ja, parenteser betyr ingenting'], 0, 'Regn ut begge sidene.', '5 · 5 = 25, men 5 · 2 + 3 = 13. Du må gange 5 med begge tallene i parentesen.'),
    T('Regn smart: 25 · 36 = 25 · 4 · 9. Hva er svaret?', 900, '25 · 4 er et rundt tall.', '25 · 4 = 100, og 100 · 9 = 900.')
  ]);

  R('8/potenser', [
    t('Regn ut: 2⁴', 16, ['2⁴ = 2 · 2 · 2 · 2.'], '2 · 2 = 4, 4 · 2 = 8, 8 · 2 = 16.'),
    t('Regn ut: 10³', 1000, ['10 · 10 · 10.'], '10 · 10 = 100, og 100 · 10 = 1000.'),
    t('Regn ut: 4⁰', 1, ['Husk regelen for eksponent 0.'], 'Alt (unntatt 0) opphøyd i 0 er 1. Svaret er 1.'),
    v('Hva er 3 · 10⁴?', ['30 000', '3 000', '34', '12'], 0, ['10⁴ = 10 000.'], '3 · 10 000 = 30 000.')
  ]);
  VUR('8/potenser', [
    V('Eli sier 2³ = 6, fordi 2 · 3 = 6. Hva er riktig?', ['2³ = 8', 'Eli har rett', '2³ = 5', '2³ = 9'], 0, 'Eksponenten sier hvor mange 2-ere du ganger.', '2³ = 2 · 2 · 2 = 8.'),
    V('Stemmer det at (−2)² = −4?', ['Nei, (−2)² = 4', 'Ja, minus beholdes', 'Det kan ikke regnes ut', 'Ja, fordi 2² = 4'], 0, 'Skriv (−2) · (−2).', '(−2) · (−2) = 4, siden minus ganger minus gir pluss.'),
    T('En bakterie dobles hver time. Det er 1 nå. Hvor mange er det etter 6 timer?', 64, 'Etter 1 time er det 2, etter 2 timer 4, …', 'Etter 6 timer er det 2⁶ = 64.')
  ]);

  R('8/kvadratrot', [
    t('Regn ut: √49', 7, ['Hvilket tall ganget med seg selv gir 49?'], '7 · 7 = 49, så √49 = 7.'),
    t('Regn ut: √100', 10, ['10 · 10 = ?'], '10 · 10 = 100, så √100 = 10.'),
    t('Et kvadrat har areal 25 cm². Hvor lang er siden?', 5, ['Areal = side · side.'], '5 · 5 = 25, så siden er 5 cm.', 'cm'),
    v('Mellom hvilke to hele tall ligger √20?', ['4 og 5', '3 og 4', '5 og 6', '2 og 3'], 0, ['4² = 16 og 5² = 25.'], '20 ligger mellom 16 og 25, så √20 ligger mellom 4 og 5.')
  ]);
  VUR('8/kvadratrot', [
    V('Er √16 = 8?', ['Nei, 4 · 4 = 16, så √16 = 4', 'Ja, 16 ÷ 2 = 8', 'Ja, 8 · 2 = 16', 'Nei, √16 = 2'], 0, 'Kvadratrot er ikke det samme som å halvere.', '√16 = 4 fordi 4 · 4 = 16. Å dele på 2 er noe annet.'),
    T('Et kvadratisk bord har areal 1,44 m². Hvor lang er hver side i meter?', 1.2, 'Hvilket tall ganget med seg selv gir 1,44? Det ligger mellom 1 og 2.', '1,2 · 1,2 = 1,44, så siden er 1,2 m.', 'm'),
    F('Forklar hvorfor √2 ikke er et helt tall.', ['1 · 1 = 1 og 2 · 2 = 4.', '2 ligger mellom 1 og 4, så √2 ligger mellom 1 og 2.', 'Det finnes ikke noe helt tall mellom 1 og 2.'])
  ]);

  R('8/uttrykk', [
    t('Regn ut 3x når x = 6.', 18, ['3x betyr 3 · x.'], '3 · 6 = 18.'),
    t('Hva er x + 9 når x = 5?', 14, ['Sett inn 5 for x.'], '5 + 9 = 14.'),
    t('Forenkle 2x + 4x. Svaret er □x. Hvilket tall står i □?', 6, ['Du har 2 x-er og 4 x-er til.'], '2x + 4x = 6x.'),
    v('Hvilket uttrykk betyr «et tall pluss 5»?', ['x + 5', '5x', 'x − 5', '5 − x'], 0, ['«Et tall» kaller vi x.'], 'Et tall pluss 5 skrives x + 5.')
  ]);
  VUR('8/uttrykk', [
    V('Emil forenkler 3x + 2 til 5x. Hva er feil?', ['x-ledd og tall kan ikke slås sammen', 'Ingenting, svaret stemmer', 'Han skulle ganget i stedet', 'Riktig svar er 6x'], 0, 'Er 3x og 2 like ledd?', '3x og 2 er ulike ledd, så 3x + 2 kan ikke forenkles mer.'),
    V('Er 2(x + 3) og 2x + 3 like?', ['Nei: for x = 1 er de 8 og 5', 'Ja, alltid', 'Ja, bare når x = 0', 'Ja, de ser nesten like ut'], 0, 'Prøv med x = 1.', '2(1 + 3) = 8, men 2 · 1 + 3 = 5. Riktig er 2(x + 3) = 2x + 6.'),
    F('Forklar hva x betyr i uttrykket 5x + 2, og hva tallet 5 betyr.', ['x er et tall vi ikke vet, eller som kan variere.', '5x betyr 5 ganger x.', '+ 2 legges til til slutt.'])
  ]);

  R('8/ligninger', [
    t('Løs: x − 9 = 3', 12, ['Legg til 9 på begge sider.'], 'x = 3 + 9 = 12.'),
    t('Løs: 4x = 28', 7, ['Del begge sider på 4.'], 'x = 28 ÷ 4 = 7.'),
    t('Løs: 3x + 2 = 14', 4, ['Trekk fra 2 på begge sider.', 'Del så på 3.'], '3x = 12, så x = 4.'),
    v('Hva gjør du først for å løse 2x + 5 = 13?', ['Trekker fra 5 på begge sider', 'Legger til 5 på begge sider', 'Ganger med 2', 'Deler med 13'], 0, ['Fjern tallet som står alene først.'], 'Trekk fra 5: 2x = 8. Så deler du på 2 og får x = 4.')
  ]);
  VUR('8/ligninger', [
    V('Pia løste x + 6 = 10 og fikk x = 16. Hva er riktig?', ['Hun la til 6 i stedet for å trekke fra. Riktig er x = 4', 'Svaret x = 16 er riktig', 'Riktig er x = 60', 'Riktig er x = 1,6'], 0, 'Sett inn 16 for x og sjekk.', '16 + 6 = 22, ikke 10. Riktig: x = 10 − 6 = 4.'),
    V('Du løser en likning om antall elever i en klasse og får x = 2,5. Hva bør du gjøre?', ['Sjekke likningen, for antall elever må være et helt tall', 'Svare 2,5 elever', 'Runde til 3 uten å sjekke', 'Gå videre til neste oppgave'], 0, 'Gir svaret mening i virkeligheten?', 'Man kan ikke ha 2,5 elever. Da må du sjekke om likningen er satt opp riktig.'),
    F('Hvordan sjekker du at x = 5 er riktig løsning på 3x − 4 = 11?', ['Sett inn 5 for x.', '3 · 5 − 4 = 15 − 4 = 11.', 'Begge sider blir 11, så løsningen er riktig.'])
  ]);

  R('8/ulikheter', [
    v('Hvilket av disse tallene er større enn 5?', ['7', '3', '5', '−2'], 0, ['Tallet må være over 5 på tallinja.'], '7 er større enn 5. De andre er like store eller mindre.'),
    t('Løs x + 2 < 9. x er mindre enn hvilket tall?', 7, ['Trekk fra 2 på begge sider.'], 'x < 9 − 2, så x < 7.'),
    t('Løs 2x > 16. x er større enn hvilket tall?', 8, ['Del begge sider på 2.'], 'x > 16 ÷ 2, så x > 8.'),
    t('Du må ha minst 3 poeng. Du har 1. Hvor mange poeng mangler du minst?', 2, ['1 + x ≥ 3.'], 'x ≥ 3 − 1, så x ≥ 2. Du mangler minst 2 poeng.', 'poeng')
  ]);
  VUR('8/ulikheter', [
    V('Er x = 7 en løsning på x < 7?', ['Nei, 7 er ikke mindre enn 7', 'Ja', 'Bare hvis x er negativ', 'Ja, fordi 7 = 7'], 0, 'Er 7 mindre enn 7?', 'x < 7 betyr at tallet må være under 7. Tallet 7 selv er ikke med.'),
    V('Kim løste −2x > 6 og fikk x > −3. Hva er riktig?', ['Tegnet skal snus: x < −3', 'Svaret er riktig', 'x > 3', 'x < 3'], 0, 'Hva skjer med ulikhetstegnet når du deler med et negativt tall?', 'Når du deler med −2, snur tegnet: x < −3. Sjekk: x = −4 gir −2 · (−4) = 8 > 6.'),
    T('En heis tåler maks 400 kg. Fire personer veier til sammen 320 kg. Hva er den høyeste vekten en femte person kan ha, i kg?', 80, 'Lag ulikheten 320 + x ≤ 400.', 'x ≤ 400 − 320 = 80 kg.', 'kg')
  ]);

  R('8/funksjoner', [
    t('f(x) = x + 3. Hva er f(2)?', 5, ['Sett inn 2 for x.'], 'f(2) = 2 + 3 = 5.'),
    t('f(x) = 2x. Hva er f(6)?', 12, ['2 ganger 6.'], 'f(6) = 2 · 6 = 12.'),
    t('f(x) = 3x − 1. Hva er f(3)?', 8, ['Gang først, trekk så fra.'], 'f(3) = 3 · 3 − 1 = 9 − 1 = 8.'),
    t('Tabell: x = 1, 2, 3 gir y = 4, 8, 12. Hva er y når x = 4?', 16, ['Hvor mye øker y for hver x?'], 'y øker med 4 hver gang. 12 + 4 = 16.')
  ]);
  VUR('8/funksjoner', [
    V('Er y = x² en lineær funksjon?', ['Nei, grafen er en kurve', 'Ja, alle funksjoner er lineære', 'Ja, for positive x', 'Bare for x = 1'], 0, ['Regn y for x = 1, 2, 3: går y opp like mye hver gang?'], 'y blir 1, 4, 9. Økningen er 3, 5, ... og er ikke lik hver gang. Grafen er en kurve.'),
    T('Funksjonen f(x) = 20 + 5x gir prisen i kr for x timers leie. Eli regnet f(4) = 100. Hva er riktig?', 40, 'Gang først, legg så til.', '5 · 4 = 20, og 20 + 20 = 40 kr. Eli regnet (20 + 5) · 4.', 'kr'),
    F('Forklar hva som skiller en funksjon fra en likning.', ['I en funksjon gir hver x nøyaktig én y-verdi.', 'I en likning leter vi etter en x som passer.', 'Funksjonen viser sammenhengen for mange x-verdier.'])
  ]);

  R('8/monstre', [
    t('Rekka er 2, 4, 6, 8, … Hva er neste tall?', 10, ['Hva øker rekka med?'], 'Rekka øker med 2. 8 + 2 = 10.'),
    t('Rekka er 5, 10, 15, 20, … Hva er tall nummer 6?', 30, ['Hva øker rekka med?'], 'Rekka øker med 5. Tall nummer 5 er 25, og tall nummer 6 er 30.'),
    t('Figur n har n + 4 prikker. Hvor mange prikker har figur 5?', 9, ['Sett inn n = 5.'], '5 + 4 = 9.'),
    v('Rekka er 3, 7, 11, 15, … Hva øker den med hver gang?', ['4', '3', '7', '5'], 0, ['Regn ut 7 − 3.'], '7 − 3 = 4, og 11 − 7 = 4. Rekka øker med 4.')
  ]);
  VUR('8/monstre', [
    V('Rekka er 1, 2, 4, 8. Kari sier at neste tall er 16, og Ola sier 11. Hvem har rett?', ['Kari: rekka dobles hver gang', 'Ola: rekka øker med 3 hver gang', 'Begge har rett', 'Ingen av dem'], 0, 'Se på hvordan hvert tall henger sammen med det forrige.', '1 · 2 = 2, 2 · 2 = 4, 4 · 2 = 8. Neste er 8 · 2 = 16.'),
    T('Regelen 3n + 1 gir tall nummer n. Hvilket nummer n har tallet 22?', 7, 'Lag likningen 3n + 1 = 22.', '3n = 21, så n = 7.'),
    F('Hvorfor er tre tall ikke nok til å være sikker på regelen i et mønster?', ['Flere ulike regler kan passe de samme tre tallene.', 'Du må teste regelen på flere tall.', 'Regelen må også forklare hvorfor mønsteret fortsetter.'])
  ]);

  R('8/faktorisering', [
    t('Hvor mange faktorer har tallet 16?', 5, ['Hvilke tall går opp i 16?'], 'Faktorene er 1, 2, 4, 8 og 16. Det er 5 faktorer.'),
    v('Hvilket av tallene er et primtall?', ['11', '9', '15', '21'], 0, ['Et primtall kan bare deles på 1 og seg selv.'], '11 kan bare deles på 1 og 11. 9, 15 og 21 kan deles på 3.'),
    t('Primtallsfaktoriser 12. Hvor mange primfaktorer er det totalt, med like faktorer talt flere ganger?', 3, ['Del 12 på 2, og del videre.'], '12 = 2 · 2 · 3. Det er 3 primfaktorer.'),
    t('Finn SFF til 12 og 18.', 6, ['12 = 2 · 2 · 3.', '18 = 2 · 3 · 3.'], 'Felles er 2 · 3 = 6.')
  ]);
  VUR('8/faktorisering', [
    V('Hvilket partall er et primtall?', ['2', '4', '0', 'Ingen'], 0, 'Et primtall har nøyaktig to faktorer.', '2 har bare faktorene 1 og 2. Alle andre partall kan deles på 2, så de har flere faktorer.'),
    T('En lampe blinker hvert 6. sekund og en annen hvert 4. sekund. De blinker samtidig nå. Etter hvor mange sekunder blinker de samtidig igjen?', 12, 'Du leter etter MFM til 6 og 4.', 'Multiplene av 6: 6, 12 … Multiplene av 4: 4, 8, 12. Første felles er 12 sekunder.', 'sek'),
    F('Kari sier at 51 er et primtall. Sjekk om hun har rett.', ['Prøv å dele på 3: 5 + 1 = 6, og 3 går opp i 6.', '51 = 3 · 17.', 'Altså er 51 ikke et primtall.'])
  ]);

  R('8/representasjoner', [
    t('y = x + 2. Hva er y når x = 3?', 5, ['Sett inn 3 for x.'], 'y = 3 + 2 = 5.'),
    t('Tabell: x = 0, 1, 2 gir y = 1, 3, 5. Hva er y når x = 3?', 7, ['Hvor mye øker y?'], 'y øker med 2. 5 + 2 = 7.'),
    t('Formelen er y = 2x. Hva er x når y = 10?', 5, ['Hva ganget med 2 gir 10?'], '2x = 10, så x = 5.'),
    v('Hvilken formel passer til tabellen x = 1, 2, 3 og y = 3, 6, 9?', ['y = 3x', 'y = x + 2', 'y = 2x', 'y = x + 3'], 0, ['Se på hvordan y henger sammen med x.'], 'y er 3 ganger x: 3 · 1 = 3, 3 · 2 = 6, 3 · 3 = 9.')
  ]);
  VUR('8/representasjoner', [
    V('Kari sier at grafen til y = 2x + 1 går gjennom (2, 4). Stemmer det?', ['Nei, y = 5 når x = 2', 'Ja', 'Nesten, den er 1 for lav', 'Ja, fordi 2 · 2 = 4'], 0, 'Sett x = 2 i formelen.', 'y = 2 · 2 + 1 = 5. Punktet er (2, 5), ikke (2, 4).'),
    T('En rett linje går gjennom (1, 5) og (3, 9). Hva er y når x = 2?', 7, 'x = 2 ligger midt mellom 1 og 3.', 'y ligger midt mellom 5 og 9, altså 7.'),
    F('Nevn to fordeler med en graf sammenlignet med en tabell.', ['Grafen viser utviklingen med én gang.', 'Den viser verdier mellom punktene, ikke bare noen få.', 'Det er lett å sammenligne to funksjoner.'])
  ]);

  R('8/programmering', [
    t('<code>x = 5</code><br><code>print(x * 2)</code><br>Hva skrives ut?', 10, ['x er 5.'], '5 · 2 = 10.'),
    t('<code>for i in range(4):</code><br><code>&nbsp;&nbsp;print("A")</code><br>Hvor mange A-er skrives ut?', 4, ['range(4) gir fire runder.'], 'Løkka går 4 ganger, så 4 A-er.'),
    t('<code>x = 3</code><br><code>x = x + 4</code><br><code>print(x)</code><br>Hva skrives ut?', 7, ['Først er x 3, så legges 4 til.'], 'x blir 3 + 4 = 7.'),
    v('Hva gjør <code>print()</code> i Python?', ['Skriver ut på skjermen', 'Sletter koden', 'Lagrer et tall', 'Regner ut svaret i hodet'], 0, ['Tenk på ordet «print».'], 'print() viser det som står i parentesen, på skjermen.')
  ]);
  VUR('8/programmering', [
    V('Programmet har <code>x = 5</code> og <code>print(x + 1)</code>. Ola tror det skrives ut «x + 1». Hva er riktig?', ['Det skrives ut 6', 'Det skrives ut x + 1', 'Det skrives ut 5', 'Det kommer en feilmelding'], 0, 'x har verdien 5.', 'Python regner ut 5 + 1 og skriver ut 6.'),
    T('<code>for i in range(3):<br>&nbsp;&nbsp;print(i)</code> Hva er summen av tallene som skrives ut?', 3, 'range(3) gir tallene 0, 1 og 2.', '0 + 1 + 2 = 3.'),
    F('Hva er en logisk feil, og hvordan skiller den seg fra en feilmelding?', ['En feilmelding stopper programmet.', 'Ved en logisk feil kjører programmet, men gir feil svar.', 'Logiske feil finner du ved å sjekke svaret og følge koden linje for linje.'])
  ]);
})();
