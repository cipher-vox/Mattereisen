/* Utvidelse 10. trinn: flere Rolig-oppgaver, flere Steg-oppgaver i de tynneste temaene og en Utforsk-del «Finn feilen og vurder». */
(function () {
  const H = window.MATTE.H, t = H.t, v = H.v, T = H.T, V = H.V, F = H.F, R = H.UTV.rolig, S = H.UTV.steg, VUR = H.UTV.vurder;

  R('10/algebra', [
    t('Regn ut 2x + 3 når x = 5.', 13, ['Sett inn 5 for x.'], '2 · 5 + 3 = 10 + 3 = 13.'),
    t('Forenkle 5x − 2x. Svaret er □x. Hvilket tall står i □?', 3, ['Du har 5 x-er og tar bort 2.'], '5x − 2x = 3x.'),
    t('Løs: 2x = 18', 9, ['Del begge sider på 2.'], 'x = 18 ÷ 2 = 9.'),
    v('Hva er 3(x + 2) uten parentes?', ['3x + 6', '3x + 2', 'x + 6', '3x + 5'], 0, ['Gang 3 med begge leddene i parentesen.'], '3 · x = 3x og 3 · 2 = 6, så 3(x + 2) = 3x + 6.')
  ]);
  VUR('10/algebra', [
    V('Eli skriver 3(x + 2) = 3x + 2. Hva er feil?', ['Han må gange 3 med begge leddene: 3x + 6', 'Ingenting, det stemmer', 'Riktig er x + 6', 'Riktig er 3x + 5'], 0, 'Prøv med x = 1.', 'Med x = 1 er 3(1 + 2) = 9, men 3 · 1 + 2 = 5. Riktig er 3x + 6.'),
    T('Løs 2x + 6 = 3x − 2.', 8, 'Samle x-ene på én side og tallene på den andre.', '6 + 2 = 3x − 2x, så x = 8. Sjekk: 2 · 8 + 6 = 22 og 3 · 8 − 2 = 22.'),
    F('Forklar hvorfor 2x + 3x blir 5x, mens 2x · 3x blir 6x².', ['Ved pluss: 2 x-er og 3 x-er blir 5 x-er.', 'Ved gange: 2 · 3 = 6, og x · x = x².'])
  ]);

  R('10/kvadratsetninger', [
    t('Regn ut 11² ved å skrive (10 + 1)².', 121, ['100 + 2 · 10 · 1 + 1.'], '100 + 20 + 1 = 121.'),
    t('Regn ut 19 · 21 ved å skrive (20 − 1)(20 + 1).', 399, ['Konjugatsetningen: a² − b².'], '20² − 1² = 400 − 1 = 399.'),
    t('(x + 2)² = x² + □x + 4. Hvilket tall står i □?', 4, ['Midtleddet er 2 · x · 2.'], '2 · 2 = 4, så (x + 2)² = x² + 4x + 4.'),
    v('Hva er (a + b)² skrevet uten parentes?', ['a² + 2ab + b²', 'a² + b²', '2a + 2b', 'a² + ab + b²'], 0, ['Skriv (a + b)(a + b) og gang ut.'], '(a + b)(a + b) = a² + ab + ab + b² = a² + 2ab + b².')
  ]);
  VUR('10/kvadratsetninger', [
    V('Ola sier at (x + 3)² = x² + 9. Hva er riktig?', ['x² + 6x + 9', 'Ola har rett', 'x² + 3x + 9', 'x² + 6'], 0, 'Prøv med x = 1.', 'Med x = 1 er (1 + 3)² = 16, men 1 + 9 = 10. Riktig er x² + 6x + 9, med midtleddet 2 · x · 3.'),
    T('Bruk 99 · 101 = (100 − 1)(100 + 1). Hva er svaret?', 9999, 'Konjugatsetningen gir 100² − 1².', '10 000 − 1 = 9999.'),
    F('Hvorfor er (a − b)² ikke lik a² − b²?', ['(a − b)² = a² − 2ab + b².', 'Midtleddet −2ab mangler, og siste ledd er + b².', 'Eksempel: a = 3 og b = 1 gir (3 − 1)² = 4, men 9 − 1 = 8.'])
  ]);

  R('10/ligningssett', [
    t('x + y = 10 og x = 3. Hva er y?', 7, ['Sett inn x = 3 i den første likningen.'], '3 + y = 10, så y = 7.'),
    t('x + y = 9 og x − y = 5. Hva er x?', 7, ['Legg likningene sammen.'], '2x = 14, så x = 7.'),
    t('To like pennaler og én blyant koster 34 kr. Blyanten koster 6 kr. Hva koster ett pennal?', 14, ['Trekk fra prisen på blyanten først.'], '34 − 6 = 28, og 28 ÷ 2 = 14 kr.', 'kr'),
    v('Hva er løsningen på et likningssett?', ['Verdiene som passer i begge likningene samtidig', 'Et tall som bare passer i den ene likningen', 'Den lengste linja i grafen', 'Det finnes ingen løsning'], 0, ['Begge likningene skal stemme.'], 'Løsningen er x og y som gjør begge likningene sanne. I grafen er det der linjene krysser.')
  ]);
  VUR('10/ligningssett', [
    V('Pia fikk x = 6 og y = 2 for x + y = 8 og x − y = 2. Stemmer det?', ['Nei: 6 + 2 = 8 stemmer, men 6 − 2 = 4, ikke 2', 'Ja, begge stemmer', 'Nei, 6 + 2 er ikke 8', 'Ja, det holder at én likning stemmer'], 0, 'Sett inn i begge likningene.', 'Den første stemmer, men den andre gir 4. Riktig er x = 5 og y = 3.'),
    T('To tall har sum 15 og differanse 3. Hva er det største tallet?', 9, 'Legg likningene x + y = 15 og x − y = 3 sammen.', '2x = 18, så x = 9. Det minste er 6.'),
    F('Hvorfor må en løsning passe i begge likningene?', ['Likningssettet krever at begge stemmer samtidig.', 'I grafen er løsningen punktet der linjene krysser hverandre.', 'Passer den bare i én, er den ikke en løsning på hele settet.'])
  ]);

  R('10/stigningstall', [
    t('Hva er stigningstallet til y = 4x + 2?', 4, ['Det er tallet foran x.'], 'I y = ax + b er a stigningstallet, så a = 4.'),
    t('Linja går gjennom (0, 1) og (2, 7). Hva er endringen i y?', 6, ['Trekk de to y-verdiene fra hverandre.'], '7 − 1 = 6.'),
    t('Linja er y = 2x + 4. Hva er y når x = 5?', 14, ['Sett inn x = 5.'], '2 · 5 + 4 = 14.'),
    v('Hva forteller stigningstallet?', ['Hvor mye y endrer seg når x øker med 1', 'Hvor linja skjærer y-aksen', 'Hvor lang linja er', 'Hvor mange punkter som ligger på linja'], 0, ['Tenk på en trapp: hvor bratt er den?'], 'Stigningstallet er endringen i y for hver ene enhet x øker.')
  ]);
  VUR('10/stigningstall', [
    V('Eli sier at linja y = −2x + 5 stiger. Stemmer det?', ['Nei, stigningstallet er negativt, så den synker', 'Ja, 5 er positivt', 'Den er vannrett', 'Den stiger bare for x < 0'], 0, 'Se på tallet foran x.', 'Stigningstallet −2 er negativt. Når x øker, blir y mindre.'),
    T('En linje har stigningstall 3 og går gjennom (0, 4). Hva er y når x = 5?', 19, 'Formelen er y = 3x + 4.', 'y = 3 · 5 + 4 = 19.'),
    F('Hva betyr tallet b i y = ax + b?', ['b er y-verdien når x = 0.', 'Det er der linja skjærer y-aksen.', 'I mange praktiske oppgaver er det startverdien.'])
  ]);

  R('10/funksjonstyper', [
    t('f(x) = 2x + 1. Hva er f(4)?', 9, ['Sett inn 4 for x.'], '2 · 4 + 1 = 9.'),
    t('f(x) = x². Hva er f(5)?', 25, ['5 · 5.'], '5² = 25.'),
    t('f(x) = 2ˣ. Hva er f(4)?', 16, ['2 ganget med seg selv fire ganger.'], '2⁴ = 2 · 2 · 2 · 2 = 16.'),
    v('Hvilken funksjon har en rett linje som graf?', ['y = 3x + 1', 'y = x²', 'y = 2ˣ', 'y = 12/x'], 0, ['Linjer har formen y = ax + b.'], 'y = 3x + 1 er lineær. De andre gir kurver.')
  ]);
  VUR('10/funksjonstyper', [
    V('Verdiene er 5, 10, 20, 40, … Hvilken funksjonstype passer best?', ['Eksponentiell: verdien dobles hver gang', 'Lineær: den øker med 5 hver gang', 'Kvadratisk', 'Brøkfunksjon'], 0, 'Se på hvordan hvert tall henger sammen med det forrige.', '10 ÷ 5 = 2, 20 ÷ 10 = 2, 40 ÷ 20 = 2. Det ganges med 2 hver gang, så den er eksponentiell.'),
    T('f(x) = 12/x. For hvilken x er f(x) = 3?', 4, 'Løs 12 ÷ x = 3.', '12 ÷ 4 = 3, så x = 4.'),
    F('Forklar forskjellen på lineær og eksponentiell vekst.', ['Lineær: det legges til like mye hver gang.', 'Eksponentiell: det ganges med samme tall hver gang.', 'Eksponentiell vekst blir til slutt mye raskere.'])
  ]);

  R('10/vekstfaktor', [
    t('Hva er vekstfaktoren ved 10 % økning?', 1.1, ['1 pluss 0,10.'], '1 + 0,10 = 1,1.'),
    t('Hva er vekstfaktoren ved 25 % nedgang?', 0.75, ['1 minus 0,25.'], '1 − 0,25 = 0,75.'),
    t('En vare koster 200 kr. Prisen øker med 10 %. Hva er den nye prisen?', 220, ['Gang 200 med vekstfaktoren 1,1.'], '200 · 1,1 = 220 kr.', 'kr'),
    t('En pris på 50 kr ganges med vekstfaktoren 1,2. Hva blir den nye prisen?', 60, ['50 · 1,2.'], '50 · 1,2 = 60 kr.', 'kr')
  ]);
  VUR('10/vekstfaktor', [
    V('En pris går først opp 20 % og så ned 20 %. Er den tilbake til start?', ['Nei, den er litt lavere enn i starten', 'Ja', 'Nei, den er høyere', 'Ja, +20 og −20 gir 0'], 0, 'Regn 100 · 1,2 · 0,8.', '100 · 1,2 = 120, og 120 · 0,8 = 96. Den er 4 % lavere enn i starten.'),
    T('En vare koster 480 kr etter en økning på 20 %. Hva kostet den før?', 400, 'Del på vekstfaktoren 1,2.', '480 ÷ 1,2 = 400 kr.', 'kr'),
    F('Forklar hvorfor 30 % nedgang gir vekstfaktor 0,7 og ikke −0,3.', ['Vekstfaktoren er det vi ganger med for å få den nye verdien.', 'Etter nedgangen er 70 % igjen, altså 0,7.', '1 − 0,30 = 0,7.'])
  ]);

  R('10/kjop-sparing-lan', [
    t('Du sparer 300 kr i måneden. Hvor mye har du spart etter 6 måneder?', 1800, ['Gang 300 med 6.'], '300 · 6 = 1800 kr.', 'kr'),
    t('Du setter inn 1000 kr med 5 % rente. Hva er saldoen etter 1 år?', 1050, ['Gang med 1,05.'], '1000 · 1,05 = 1050 kr.', 'kr'),
    t('Du låner 10 000 kr med 10 % rente. Hva er renten for første år?', 1000, ['10 % av 10 000.'], '10 000 · 0,10 = 1000 kr.', 'kr'),
    v('Hva er rente?', ['Prisen for å låne penger, eller betalingen for å spare', 'Navnet på banken', 'Hvor mye du har på konto', 'En avgift på mat'], 0, ['Tenk på hva banken tar for å låne deg penger.'], 'Rente er prisen for å låne penger, og det du får for å spare.')
  ]);
  VUR('10/kjop-sparing-lan', [
    V('Lån A har 5 % rente og lån B har 8 %. Beløpet og tiden er like. Hvilket lån er billigst?', ['A, lavere rente gir lavere kostnad', 'B', 'De er like dyre', 'Det går ikke an å vite'], 0, 'Hvilket lån gir mest rente å betale?', 'Lavere rente gir lavere rentekostnad. Lån A er billigst.'),
    T('Du låner 20 000 kr til 6 % rente i 1 år. Hvor mye må du betale tilbake totalt?', 21200, 'Rente = 6 % av 20 000.', '20000 · 0,06 = 1200. 20000 + 1200 = 21200 kr.', 'kr'),
    F('Hvorfor er det lurt å se på effektiv rente og ikke bare nominell rente?', ['Effektiv rente tar med gebyrer og hvor ofte renter legges til.', 'Den viser den virkelige kostnaden ved lånet.', 'Da kan du sammenligne ulike lån rettferdig.'])
  ]);

  R('10/okonomi-prosjekt', [
    t('Du tjener 10 000 kr og bruker 8000 kr. Hvor mye sparer du?', 2000, ['Inntekt minus utgifter.'], '10 000 − 8000 = 2000 kr.', 'kr'),
    t('Du sparer 500 kr i måneden. Hvor mange måneder tar det å spare 3000 kr?', 6, ['Del 3000 på 500.'], '3000 ÷ 500 = 6 måneder.', 'måneder'),
    t('Budsjett: husleie 5000 kr, mat 2500 kr og annet 1500 kr. Hva er summen av utgiftene?', 9000, ['Legg sammen.'], '5000 + 2500 + 1500 = 9000 kr.', 'kr'),
    v('Hva er et budsjett?', ['En plan for inntekter og utgifter', 'Et lån i banken', 'En skatt', 'En type bankkonto'], 0, ['Tenk på planlegging av penger.'], 'Et budsjett viser hva du forventer å tjene og bruke.')
  ]);
  VUR('10/okonomi-prosjekt', [
    V('Et tilbud sier: «Kjøp nå og betal om 12 måneder, uten rente!» Hva bør du sjekke?', ['Gebyrer og hva som skjer hvis du ikke betaler i tide', 'Ingenting, det er gratis', 'Hvem som lagde reklamen', 'Fargen på produktet'], 0, 'Hva kan tilbudet skjule?', 'Slike tilbud kan ha gebyrer, og høy rente hvis du betaler for sent. Les vilkårene.'),
    T('Du sparer 400 kr i måneden og trenger 5200 kr. Hvor mange måneder tar det?', 13, 'Del 5200 på 400.', '5200 ÷ 400 = 13 måneder.', 'måneder'),
    F('Gi to eksempler på forskjellen mellom behov og ønsker i et budsjett.', ['Behov: husleie, mat, strøm.', 'Ønsker: spillkjøp, ny telefon som ikke trengs, kafébesøk.', 'Behov må dekkes først, ønsker kan vente.'])
  ]);

  R('10/modellering', [
    t('y = 2x + 3. Hva er y når x = 4?', 11, ['Sett inn 4 for x.'], '2 · 4 + 3 = 11.'),
    t('Målingene er (0, 4), (1, 6) og (2, 8). Hvor mye øker y per steg i x?', 2, ['Trekk fra: 6 − 4.'], '6 − 4 = 2, og 8 − 6 = 2. y øker med 2.'),
    t('Modellen er y = 5x. Hva er y når x = 7?', 35, ['5 ganger 7.'], '5 · 7 = 35.'),
    v('Hvorfor sier vi at en modell er en forenkling?', ['Den beskriver virkeligheten omtrentlig, ikke nøyaktig', 'Den er alltid helt riktig', 'Den bruker ikke tall', 'Den er bare en tegning'], 0, ['Er virkeligheten alltid helt enkel?'], 'En modell fanger de viktigste trekkene, men ikke alle detaljer.')
  ]);
  VUR('10/modellering', [
    V('Modellen y = 2x + 10 gir plantens høyde i cm etter x uker. Er den rimelig for x = 100?', ['Nei, planten vokser ikke jevnt i all evighet', 'Ja, modellen gjelder alltid', 'Bare hvis x = 100', 'Ja, 210 cm er normalt'], 0, 'Hva gir modellen for x = 100, og er det realistisk?', 'Etter 100 uker gir modellen 210 cm. Planter slutter å vokse, så modellen passer bare for en kort periode.'),
    T('Modellen er y = 4x + 6. For hvilken x er y = 30?', 6, 'Løs 4x + 6 = 30.', '4x = 24, så x = 6.'),
    F('Hvorfor bør du ikke stole på en modell langt utenfor området der du har målinger?', ['Modellen er laget ut fra målingene du har.', 'Utenfor kan situasjonen endre seg.', 'Resultatene kan bli urealistiske.'])
  ]);

  R('10/python', [
    t('<code>x = 4</code><br><code>print(x * 3)</code><br>Hva skrives ut?', 12, ['x er 4.'], '4 · 3 = 12.'),
    t('<code>for i in range(5):</code><br>Hvor mange runder gjør løkka?', 5, ['Tallet i parentesen.'], 'range(5) gir 5 runder.'),
    t('<code>def f(x):<br>&nbsp;&nbsp;return x + 1<br>print(f(9))</code> Hva skrives ut?', 10, ['Sett inn 9 for x.'], 'f(9) = 9 + 1 = 10.'),
    v('Hva betyr <code>==</code> i Python?', ['Er lik (en sammenligning)', 'Settes lik (gir en verdi)', 'Større enn', 'Ikke lik'], 0, ['Ett likhetstegn gir verdi, to sammenligner.'], '== sjekker om to ting er like. Ett = gir en variabel en verdi.')
  ]);
  VUR('10/python', [
    V('Hva er feil i <code>if x = 5:</code>?', ['Skal være == for å sammenligne', 'Mangler print', 'Skal være ≥', 'Ingenting er feil'], 0, 'Ett likhetstegn gir verdi.', 'I en if-setning skal du sammenligne med ==, ikke gi en verdi med =.'),
    T('<code>s = 0<br>for i in range(1, 4):<br>&nbsp;&nbsp;s = s + 2 * i<br>print(s)</code> Hva skrives ut?', 12, 'i er 1, 2 og 3.', 's = 2 + 4 + 6 = 12.'),
    F('Hva betyr innrykk i Python, og hvorfor er det viktig?', ['Innrykk viser hvilke linjer som hører til løkka eller if-en.', 'Uten riktig innrykk gjør programmet noe annet, eller gir feilmelding.', 'Vanlig er 4 mellomrom.'])
  ]);

  /* ---------- Steg: flere oppgaver i de tynneste temaene ---------- */
  S('10/kvadratsetninger', [
    T('(x + 4)² = x² + □x + 16. Hvilket tall står i □?', 8, 'Midtleddet er 2 · x · 4.', '2 · 4 = 8.'),
    T('Regn ut 31² ved å skrive (30 + 1)².', 961, '900 + 2 · 30 · 1 + 1.', '900 + 60 + 1 = 961.'),
    T('Regn ut 19 · 21 ved å skrive (20 − 1)(20 + 1).', 399, 'Konjugatsetningen: a² − b².', '400 − 1 = 399.'),
    V('Hva er (x − 2)² skrevet uten parentes?', ['x² − 4x + 4', 'x² − 4', 'x² + 4', 'x² − 2x + 4'], 0, 'Midtleddet er −2 · x · 2.', '(x − 2)² = x² − 2 · x · 2 + 2² = x² − 4x + 4.')
  ]);
  S('10/stigningstall', [
    T('Hva er stigningstallet til y = 5x − 3?', 5, 'Det er tallet foran x.', 'I y = ax + b er a stigningstallet, så a = 5.'),
    T('Linja går gjennom (0, 2) og (3, 11). Hva er stigningstallet?', 3, 'Endring i y delt på endring i x.', '(11 − 2) ÷ (3 − 0) = 9 ÷ 3 = 3.'),
    T('For y = 2x + 1: hva er y når x = 10?', 21, 'Sett inn x = 10.', '2 · 10 + 1 = 21.'),
    T('Linja y = −x + 6 skjærer y-aksen. Hva er y-verdien der?', 6, 'På y-aksen er x = 0.', 'x = 0 gir y = 6.')
  ]);
  S('10/vekstfaktor', [
    T('Hva er vekstfaktoren ved 15 % økning?', 1.15, '1 pluss 0,15.', '1 + 0,15 = 1,15.'),
    T('Hva er vekstfaktoren ved 40 % nedgang?', 0.6, '1 minus 0,40.', '1 − 0,40 = 0,6.'),
    T('En vare koster 500 kr. Prisen øker med 20 %. Hva er den nye prisen?', 600, 'Gang med vekstfaktoren 1,2.', '500 · 1,2 = 600 kr.', 'kr'),
    T('En jakke koster 80 kr og settes ned 25 %. Hva koster den nå?', 60, 'Vekstfaktoren er 0,75.', '80 · 0,75 = 60 kr.', 'kr')
  ]);
  S('10/okonomi-prosjekt', [
    T('Inntekten er 24 000 kr, og utgiftene er 21 000 kr. Hvor mye sparer du per måned?', 3000, 'Inntekt minus utgifter.', '24 000 − 21 000 = 3000 kr.', 'kr'),
    T('Du sparer 250 kr i måneden i 8 måneder. Hvor mye har du spart?', 2000, 'Gang 250 med 8.', '250 · 8 = 2000 kr.', 'kr'),
    T('En vare koster 1200 kr, og du får 25 % rabatt. Hva betaler du?', 900, 'Vekstfaktoren er 0,75.', '1200 · 0,75 = 900 kr.', 'kr'),
    T('Et abonnement koster 79 kr i måneden. Hva koster det på 12 måneder?', 948, 'Gang 79 med 12.', '79 · 12 = 948 kr.', 'kr')
  ]);
  S('10/modellering', [
    T('Modellen er y = 3x + 2. Hva er y når x = 5?', 17, 'Sett inn x = 5.', '3 · 5 + 2 = 17.'),
    T('Modellen er y = 3x + 2. For hvilken x er y = 20?', 6, 'Løs 3x + 2 = 20.', '3x = 18, så x = 6.'),
    T('Modellen er y = 10 · 2ˣ. Hva er y når x = 3?', 80, '2³ = 8.', '10 · 8 = 80.'),
    V('Hva er en matematisk modell?', ['En beskrivelse av en virkelig situasjon med tall og formler', 'Et nøyaktig bilde av virkeligheten', 'En tilfeldig formel', 'Et diagram uten tall'], 0, 'Tenk på hva vi bruker formler til.', 'En modell bruker matematikk til å beskrive en situasjon, ofte litt forenklet.')
  ]);
  S('10/python', [
    T('<code>x = 2<br>x = x * 5<br>print(x)</code> Hva skrives ut?', 10, 'Først er x 2, så ganges den med 5.', 'x blir 2 · 5 = 10.'),
    T('<code>for i in range(4):<br>&nbsp;&nbsp;print("Hei")</code> Hvor mange ganger skrives «Hei» ut?', 4, 'Tallet i parentesen.', 'Løkka går 4 ganger, så 4 ganger.'),
    T('<code>def f(x):<br>&nbsp;&nbsp;return 2 * x<br>print(f(6))</code> Hva skrives ut?', 12, 'Sett inn 6 for x.', 'f(6) = 2 · 6 = 12.'),
    T('<code>x = 8<br>if x &gt; 5:<br>&nbsp;&nbsp;print(1)<br>else:<br>&nbsp;&nbsp;print(2)</code> Hva skrives ut?', 1, 'Er 8 større enn 5?', '8 er større enn 5, så det skrives ut 1.')
  ]);
})();
