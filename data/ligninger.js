/* ============================================================
   Tema: Likninger (8. trinn) – UTFORSK + STEG + EKSTRA
   Læreplan 8.6: lage og løse likninger knyttet til praktiske situasjoner
   og kritisk vurdere løsninger
   ============================================================ */
(function () {
  const M = window.MATTE; const H = M.H;
  const { V, T, F, P, G, C, E, O, OS, W, TAB, K, H2, SJ, S, ord } = H;
  const ORD = [
    ord(['likning', 'likninger', 'likningen'], 'To uttrykk med likhetstegn mellom. Den er sann bare for noen verdier av bokstaven.'),
    ord(['løsning', 'løsningen'], 'Tallet som gjør likningen sann. I x + 3 = 8 er løsningen x = 5.'),
    ord(['løse'], 'Å finne verdien av x som gjør likningen sann.'),
    ord(['likhetstegn', 'likhetstegnet'], 'Tegnet = som sier at venstre og høyre side er like store.'),
    ord(['invers', 'motsatt regneart', 'motsatte regnearter'], 'Regnearter som «angrer» hverandre. Pluss og minus er motsatte. Gange og dele er motsatte.'),
    ord(['ukjent', 'ukjente'], 'Tallet vi leter etter. Vi kaller det ofte x.'),
    ord(['sjekke', 'prøve'], 'Å sette løsningen inn i den opprinnelige likningen og se at begge sider blir like.'),
    ord(['modellere', 'modell'], 'Å bruke matte til å beskrive en situasjon fra virkeligheten.')
  ];

  /* ====================== UTFORSK ====================== */
  const U = [];
  U.push(S('Hva er en likning?', '⚖️', [
    P('En <strong>likning</strong> er som en vekt i balanse. Det er et <strong>likhetstegn</strong> i midten, og begge sidene veier like mye. I likningen <strong>x + 3 = 8</strong> vet vi ikke hva x er. Men vi kan finne det: Hvilket tall pluss 3 gir 8? Det er 5. Vi sier at <strong>løsningen er x = 5</strong>.'),
    C('regel', 'Ord du bør kunne', ['<strong>Ukjent</strong>: tallet vi leter etter (x).', '<strong>Løse</strong> likningen: finne x.', '<strong>Løsning</strong>: verdien av x som gjør at venstre og høyre side blir like.', '<strong>Sjekke</strong>: sette løsningen inn og se at det stemmer.']),
    E('Er x = 4 en løsning på 2x + 1 = 9?', ['Sett 4 inn for x på venstre side: 2 · 4 + 1 = 9.', 'Høyre side er 9.', '9 = 9. Det stemmer.', 'Svar: ja, x = 4 er en løsning.']),
    E('Er x = 3 en løsning på 2x + 1 = 9?', ['Venstre side: 2 · 3 + 1 = 7.', 'Høyre side er 9.', '7 ≠ 9. Det stemmer ikke.', 'Svar: nei.']),
    O(1, [
      V('Er x = 5 en løsning på x + 4 = 9?', ['Ja', 'Nei'], 0, '5 + 4 = ?', '5 + 4 = 9, og det er lik høyre side.', true),
      V('Er x = 2 en løsning på 3x = 9?', ['Nei', 'Ja'], 0, '3 · 2 = ?', '3 · 2 = 6, ikke 9. Løsningen er x = 3.', true),
      T('Hvilket tall gjør at x + 7 = 12?', 5, 'Hva pluss 7 er 12?', '5 + 7 = 12, så x = 5.'),
      T('Hvilket tall gjør at 4x = 20?', 5, 'Hva ganger 4 er 20?', '4 · 5 = 20, så x = 5.'),
      T('Hvilket tall gjør at x − 6 = 10?', 16, '10 + 6.', '16 − 6 = 10, så x = 16.')
    ])
  ]));

  U.push(S('Vektmodellen: gjør det samme på begge sider', '🪙', [
    P('Tenk deg en vekt. Hvis vekten er i balanse og du tar bort like mye fra begge sidene, er den fortsatt i balanse. Det er hele hemmeligheten bak å løse likninger: <strong>det du gjør på ene siden, må du gjøre på den andre også</strong>.'),
    W('balanse', { a: 1, b: 3, c: 8, tittel: 'Vekta: løs x + 3 = 8' }),
    C('regel', 'Motsatte regnearter', ['Står det <strong>+ 3</strong>? Trekk fra 3 på begge sider.', 'Står det <strong>− 3</strong>? Legg til 3 på begge sider.', 'Står det <strong>· 3</strong> (3x)? Del med 3 på begge sider.', 'Står det <strong>: 3</strong>? Gang med 3 på begge sider.', 'Deling skrives både <strong>:</strong> og <strong>÷</strong>. 12 : 3 og 12 ÷ 3 er det samme.']),
    E('Løs x + 7 = 12.', ['Vi vil ha x alene. Det står + 7, så vi trekker fra 7 på begge sider.', 'x + 7 − 7 = 12 − 7.', 'x = 5.', 'Sjekk: 5 + 7 = 12 ✓.']),
    E('Løs x − 4 = 9.', ['Det står − 4. Vi legger til 4 på begge sider.', 'x − 4 + 4 = 9 + 4.', 'x = 13.', 'Sjekk: 13 − 4 = 9 ✓.']),
    E('Løs 3x = 21.', ['Det står 3 ganger x. Vi deler begge sider på 3.', '3x : 3 = 21 : 3.', 'x = 7.', 'Sjekk: 3 · 7 = 21 ✓.']),
    O(2, [
      T('Løs: x + 9 = 15', 6, 'Trekk fra 9.', 'x = 15 − 9 = 6.'),
      T('Løs: x − 5 = 8', 13, 'Legg til 5.', 'x = 8 + 5 = 13.'),
      T('Løs: 4x = 28', 7, 'Del på 4.', 'x = 28 : 4 = 7.'),
      T('Løs: x : 3 = 6', 18, 'Gang med 3.', 'x = 6 · 3 = 18.'),
      T('Løs: 25 = x + 11', 14, 'Samme som x + 11 = 25.', 'x = 25 − 11 = 14.'),
      T('Løs: 8x = 56', 7, 'Del på 8.', 'x = 56 : 8 = 7.')
    ])
  ]));

  U.push(S('Likninger med to steg', '🪜', [
    P('Det vanligste er likninger som <strong>2x + 5 = 17</strong>. Her må du gjøre to ting. Fjern først tallet som er <strong>lagt til eller trukket fra</strong> (et vanlig tall uten x, også kalt en <em>konstant</em>), og del deretter.'),
    W('balanse', { a: 2, b: 5, c: 17, tittel: 'Vekta: løs 2x + 5 = 17' }),
    E('Løs 2x + 5 = 17.', ['Trekk fra 5 på begge sider: 2x = 12.', 'Del på 2 på begge sider: x = 6.', 'Sjekk: 2 · 6 + 5 = 17 ✓.', 'Svar: x = 6.']),
    E('Løs 4x − 3 = 21.', ['Legg til 3 på begge sider: 4x = 24.', 'Del på 4: x = 6.', 'Sjekk: 4 · 6 − 3 = 21 ✓.', 'Svar: x = 6.']),
    C('tips', 'Rekkefølge', 'Du pakker ut likningen i omvendt rekkefølge av hvordan den ble pakket: først pluss/minus, så gange/dele.'),
    O(3, [
      T('Løs: 2x + 9 = 25', 8, 'Trekk fra 9, og del på 2.', '2x = 16, så x = 8.'),
      T('Løs: 3x + 4 = 25', 7, 'Trekk fra 4.', '3x = 21, så x = 7.'),
      T('Løs: 5x − 2 = 28', 6, 'Legg til 2.', '5x = 30, så x = 6.'),
      T('Løs: 9x + 2 = 29', 3, 'Trekk fra 2.', '9x = 27, så x = 3.'),
      T('Løs: 2x − 9 = 1', 5, 'Legg til 9.', '2x = 10, så x = 5.'),
      T('Løs: x : 2 + 3 = 8', 10, 'Trekk fra 3, og gang med 2.', 'x : 2 = 5, så x = 10.')
    ])
  ]));

  U.push(S('X på begge sider og parenteser', '↔️', [
    P('Noen ganger står x på <strong>begge sidene</strong>. Da flytter du x-ene til én side ved å trekke fra eller legge til, på begge sider.'),
    E('Løs 5x + 3 = 2x + 15.', ['Trekk fra 2x på begge sider: 3x + 3 = 15.', 'Trekk fra 3: 3x = 12.', 'Del på 3: x = 4.', 'Sjekk: 5 · 4 + 3 = 23 og 2 · 4 + 15 = 23 ✓.']),
    C('tips', 'Hvilken side skal x-ene til?', 'Flytt de minste x-ene, så unngår du negative tall. I 5x + 3 = 2x + 15 flytter vi 2x.'),
    P('Noen likninger har <strong>parentes</strong>. Da ganger du tallet utenfor med <strong>alle</strong> leddene inni, før du løser videre.'),
    C('regel', 'Gang ut parentesen', '3(x + 2) = 3 · x + 3 · 2 = 3x + 6. Husk å gange begge leddene.'),
    E('Løs 3(x + 2) = 27.', ['Gang ut parentesen: 3x + 6 = 27.', 'Trekk fra 6: 3x = 21.', 'Del på 3: x = 7.', 'Sjekk: 3 · (7 + 2) = 3 · 9 = 27 ✓.']),
    O(4, [
      T('Løs: 4x + 2 = x + 14', 4, 'Trekk fra x.', '3x + 2 = 14, 3x = 12, x = 4.'),
      T('Løs: 7x − 5 = 3x + 19', 6, 'Trekk fra 3x.', '4x − 5 = 19, 4x = 24, x = 6.'),
      T('Løs: 6x = 2x + 20', 5, 'Trekk fra 2x.', '4x = 20, x = 5.'),
      T('Løs: 3(x + 2) = 24', 6, 'Gang ut parentesen: 3x + 6.', '3x + 6 = 24, 3x = 18, x = 6.'),
      T('Løs: 2(x + 3) = x + 11', 5, 'Gang ut parentesen først, og flytt så x.', '2x + 6 = x + 11, x = 5. Sjekk: 2 · 8 = 16 og 5 + 11 = 16.')
    ])
  ]));

  U.push(S('Når svaret blir negativt', '❄️', [
    P('Svaret på en likning kan bli et <strong>negativt tall</strong>. Du regner på nøyaktig samme måte. Husk reglene for negative tall når du trekker fra.'),
    E('Løs x + 9 = 4.', ['Trekk fra 9 på begge sider: x = 4 − 9.', '4 − 9 = −5, så x = −5.', 'Sjekk: −5 + 9 = 4 ✓.']),
    E('Løs 4x + 3 = −9.', ['Trekk fra 3 på begge sider: 4x = −12.', 'Del på 4: x = −3.', 'Sjekk: 4 · (−3) + 3 = −12 + 3 = −9 ✓.']),
    O(4, [
      T('Løs: x + 8 = 3', -5, 'Trekk fra 8. Svaret blir negativt.', 'x = 3 − 8 = −5. Sjekk: −5 + 8 = 3.'),
      T('Løs: 2x + 11 = 3', -4, 'Trekk fra 11, og del på 2.', '2x = −8, så x = −4. Sjekk: 2 · (−4) + 11 = 3.'),
      T('Løs: 5x − 3 = −18', -3, 'Legg til 3, og del på 5.', '5x = −15, så x = −3. Sjekk: 5 · (−3) − 3 = −18.'),
      T('Løs: 3x + 10 = 4', -2, 'Trekk fra 10, og del på 3.', '3x = −6, så x = −2. Sjekk: 3 · (−2) + 10 = 4.')
    ])
  ]));

  U.push(S('Fra historie til likning', '📖', [
    P('Likninger er mest nyttige når du bruker dem til å <strong>løse problemer fra hverdagen</strong>. Fremgangsmåte:'),
    C('regel', 'Fire steg', ['1. <strong>Les</strong> og finn det du ikke vet. Kall det x.', '2. <strong>Lag likningen</strong> som beskriver situasjonen.', '3. <strong>Løs</strong> likningen.', '4. <strong>Vurder</strong>: gir svaret mening? Svar med enhet.']),
    E('Sara har 120 kr. Hun kjøper 3 boller til samme pris og har 45 kr igjen. Hva koster en bolle?', ['Kall prisen x. Hun brukte 3x.', 'Likning: 120 − 3x = 45.', 'Legg til 3x og trekk fra 45: 3x = 75, så x = 25.', 'Sjekk: 120 − 3 · 25 = 45 ✓. Svar: en bolle koster 25 kr.']),
    E('Taxi: startpris 55 kr og 18 kr per km. Turen kostet 181 kr. Hvor langt kjørte de?', ['Kall antall km x.', 'Likning: 18x + 55 = 181.', 'Trekk fra 55: 18x = 126. Del på 18: x = 7.', 'Sjekk: 18 · 7 + 55 = 181 ✓. Svar: 7 km.']),
    O(4, [
      T('Jonas har 600 kr. Han kjøper 4 kinobilletter og har 40 kr igjen. Hva koster én billett?', 140, '600 − 4x = 40.', '4x = 560, så x = 140 kr.', 'kr'),
      T('Et mobilabonnement koster 99 kr i måneden pluss 20 kr per ekstra GB. Denne måneden kostet det 179 kr. Hvor mange ekstra GB var brukt?', 4, '20x + 99 = 179.', '20x = 80, så x = 4 GB.', 'GB'),
      T('Tre like notatbøker og en penn til 15 kr kostet 99 kr til sammen. Hva koster en notatbok?', 28, '3x + 15 = 99.', '3x = 84, så x = 28 kr.', 'kr'),
      T('Jeg tenker på et tall. Dobler jeg det og legger til 7, får jeg 31. Hvilket tall?', 12, '2x + 7 = 31.', '2x = 24, så x = 12.'),
      T('En rektangulær hage er 12 m lang og har omkrets 40 m. Lag en likning og finn bredden.', 8, 'Omkrets = 2 · lengde + 2 · bredde, altså 2 · 12 + 2x = 40.', '24 + 2x = 40, 2x = 16, så x = 8 m.', 'm'),
      F('Klassen har 100 kr til en fest. De kjøper en pose chips til 20 kr og x like pakker med kjeks til 15 kr hver. Likningen 15x + 20 = 100 gir x = 5,33. Hva betyr løsningen, og hva bør klassen gjøre?', ['x = 80 : 15 = 5,33 er løsningen matematisk.', 'Men du kan ikke kjøpe 5,33 pakker. Svaret må være et helt tall.', 'Med 5 pakker koster alt 15 · 5 + 20 = 95 kr. Med 6 pakker koster alt 110 kr, som er mer enn 100 kr. Så 5 pakker er det mest de har råd til, og de får 5 kr til overs.'])
    ])
  ]));

  U.push(S('Sjekk, vurder og forklar', '🔎', [
    P('Å løse en likning er ikke ferdig før du har <strong>sjekket</strong> og <strong>vurdert</strong> svaret.'),
    C('tips', 'Sjekkliste for en god løsning', ['Sett løsningen inn i den <strong>opprinnelige</strong> likningen. Blir begge sider like?', 'Gir svaret <strong>mening</strong> i situasjonen? (Antall personer kan ikke være −3.)', 'Har du skrevet <strong>enhet</strong>, som kr, m eller timer?']),
    O(4, [
      V('Mia løste 3x + 4 = 19 og fikk x = 7. Stemmer det?', ['Nei, x = 5', 'Ja', 'Nei, x = 23', 'Nei, x = 3'], 0, 'Sett inn 7.', '3 · 7 + 4 = 25 ≠ 19. Riktig er 3x = 15, så x = 5.'),
      V('En elev løste «5 + x = 12» ved å dele begge sider på 5. Hva er galt?', ['Hun skulle trukket fra 5', 'Ingenting', 'Hun skulle lagt til 5', 'Hun skulle ganget med 5'], 0, '5 ligger til x, ikke ganger.', 'Det står pluss. Motsatt regneart er minus: x = 12 − 5 = 7.'),
      V('Du løser 2x + 5 = 17 og får x = 11. Stemmer det?', ['Nei, x = 6', 'Ja', 'Nei, x = 12', 'Nei, x = 5'], 0, 'Sett 11 inn for x i den opprinnelige likningen.', '2 · 11 + 5 = 27, ikke 17. Riktig er 2x = 12, så x = 6.'),
      V('Du løser en likning for antall epler i en kurv og får x = −3. Hva bør du tenke?', ['Svaret gir ikke mening, jeg må sjekke likningen', 'Det er riktig: det er −3 epler', 'Jeg bytter fortegn og svarer 3 uten å sjekke', 'Likningen har to løsninger'], 0, 'Kan det være et negativt antall epler?', 'Antall epler kan ikke være negativt. Da er enten likningen satt opp feil, eller så finnes det ingen løsning i situasjonen.'),
      F('Du løser 2x + 3 = 11 og får x = 4. Forklar hvordan du kan sjekke svaret, og hva sjekken viser.', ['Sett x = 4 inn i den opprinnelige likningen: 2 · 4 + 3 = 8 + 3 = 11.', 'Venstre side er 11, og høyre side er 11. De er like, så x = 4 er riktig.']),
      F('Du kan kjøpe maks 3 baller på en skoleavslutning. En likning gir x = −2. Hva kan du si om situasjonen?', ['Et negativt antall baller gir ikke mening. Enten er likningen satt opp feil, eller så finnes det ingen løsning i situasjonen.', 'Det er viktig å vurdere svaret opp mot hva som er mulig i virkeligheten.'])
    ]),
    SJ('Dette kan du nå', ['Forklare hva en likning og en løsning er', 'Løse likninger med vektmodellen (samme på begge sider)', 'Løse likninger med to steg og x på begge sider', 'Lage en likning fra en tekst', 'Sjekke og vurdere om svaret gir mening'])
  ]));

  M.register('utforsk', '8/ligninger', {
    tittel: 'Likninger',
    ingress: 'Likninger er som vekter i balanse. Du lærer å løse dem og bruke dem til å finne ukjente i hverdagen.',
    mal: ['lage og løse likninger knyttet til praktiske situasjoner', 'kritisk vurdere løsninger'],
    ordliste: ORD, seksjoner: U
  });

  /* ====================== STEG ====================== */
  const T1 = [];
  T1.push(S('Steg 1: En vekt i balanse', '1', [
    G('Hei! 👋 Vi tar ett lite steg om gangen. ' + H.TIPS),
    P('En <strong>likning</strong> er som en vekt. Begge sider veier like mye. Se på <strong>x + 3 = 8</strong>. Hvilket tall pluss 3 er 8? Det er 5. Da er <strong>x = 5</strong>.', true),
    W('balanse', { a: 1, b: 3, c: 8, tittel: 'Vekt i balanse' }),
    C('regel', 'Husk', ['Likhetstegnet = betyr at begge sider er like.', 'x er tallet vi leter etter.', 'Svaret kalles løsningen.']),
    E('Er x = 4 en løsning på x + 3 = 7?', ['Sett 4 inn: 4 + 3 = 7.', 'Høyre side er 7. De er like.', 'Ja! 🎉']),
    OS([
      V('Er x = 5 en løsning på x + 2 = 7?', ['Ja', 'Nei'], 0, '5 + 2 = ?', '5 + 2 = 7. Ja.', true),
      V('Er x = 3 en løsning på x + 2 = 7?', ['Nei', 'Ja'], 0, '3 + 2 = ?', '3 + 2 = 5, ikke 7. Nei.', true),
      T('x + 4 = 10. Hva er x?', 6, 'Hva pluss 4 er 10?', '6 + 4 = 10.'),
      T('x + 6 = 9. Hva er x?', 3, 'Hva pluss 6 er 9?', '3 + 6 = 9.')
    ])
  ]));
  T1.push(S('Steg 2: Pluss og minus', '2', [
    G('Nå løser vi likninger ved å regne på begge sider.'),
    P('Det du gjør på den ene siden, må du gjøre på den andre. Står det <strong>+</strong>, bruker du <strong>−</strong>. Står det <strong>−</strong>, bruker du <strong>+</strong>.', true),
    E('Løs x + 7 = 12.', ['Det står + 7. Vi trekker fra 7 på begge sider.', 'x = 12 − 7.', 'x = 5. Sjekk: 5 + 7 = 12 ✓. 🎉']),
    E('Løs x − 4 = 9.', ['Det står − 4. Vi legger til 4 på begge sider.', 'x = 9 + 4.', 'x = 13. Sjekk: 13 − 4 = 9 ✓. 🎉']),
    OS([
      T('Løs: x + 5 = 11', 6, 'Trekk fra 5.', 'x = 11 − 5 = 6.'),
      T('Løs: x + 8 = 20', 12, 'Trekk fra 8.', 'x = 20 − 8 = 12.'),
      T('Løs: x − 3 = 7', 10, 'Legg til 3.', 'x = 7 + 3 = 10.'),
      T('Løs: x − 6 = 5', 11, 'Legg til 6.', 'x = 5 + 6 = 11.')
    ])
  ]));
  T1.push(S('Steg 3: Gange og dele', '3', [
    G('Nå likninger med gange.'),
    P('3x betyr 3 · x. Det motsatte av gange er <strong>dele</strong>. Del begge sider på 3.', true),
    E('Løs 3x = 12.', ['3x betyr 3 ganger x. Vi deler begge sider på 3.', 'x = 12 : 3.', 'x = 4. Sjekk: 3 · 4 = 12 ✓. 🎉']),
    OS([
      T('Løs: 2x = 10', 5, 'Del på 2.', 'x = 10 : 2 = 5.'),
      T('Løs: 4x = 32', 8, 'Del på 4.', 'x = 32 : 4 = 8.'),
      T('Løs: 5x = 35', 7, 'Del på 5.', 'x = 35 : 5 = 7.'),
      T('Løs: 6x = 54', 9, 'Del på 6.', 'x = 54 : 6 = 9.')
    ])
  ]));
  T1.push(S('Steg 4: To steg', '4', [
    G('Nå kombinerer vi det vi har lært.'),
    P('Ved to steg tar du <strong>pluss/minus først</strong>, og <strong>så dele</strong>.', true),
    E('Løs 2x + 5 = 17.', ['Trekk fra 5 på begge sider: 2x = 12.', 'Del på 2: x = 6.', 'Sjekk: 2 · 6 + 5 = 17 ✓. 🎉']),
    OS([
      T('Løs: 2x + 3 = 11', 4, 'Trekk fra 3, og del på 2.', '2x = 8, så x = 4.'),
      T('Løs: 3x + 2 = 17', 5, 'Trekk fra 2, og del på 3.', '3x = 15, så x = 5.'),
      T('Løs: 4x − 1 = 27', 7, 'Legg til 1, og del på 4.', '4x = 28, så x = 7.'),
      T('Løs: 5x + 5 = 35', 6, 'Trekk fra 5, og del på 5.', '5x = 30, så x = 6.')
    ])
  ]));
  T1.push(S('Steg 5: Likninger fra historier', '5', [
    G('Siste steg! Vi bruker likninger til å løse problemer.'),
    P('Finn først tallet du ikke vet, og kall det x. Skriv så en likning. Løs den, og sjekk om svaret gir mening.', true),
    E('Mia har 50 kr. Hun kjøper 2 is til samme pris og har 10 kr igjen. Hva koster en is?', ['Kall prisen x. Hun brukte 2x.', '50 − 2x = 10.', '2x = 40, så x = 20.', 'Sjekk: 50 − 2 · 20 = 10 ✓. Svar: 20 kr. 🎉']),
    OS([
      T('Jeg tenker på et tall. Legger jeg til 5, får jeg 12. Hvilket tall?', 7, 'x + 5 = 12.', 'x = 12 − 5 = 7.'),
      T('3 like pakker koster 15 kr. Hva koster en pakke?', 5, '3x = 15.', 'x = 15 : 3 = 5 kr.', 'kr'),
      T('Jeg tenker på et tall. Dobler jeg det og legger til 1, får jeg 9. Hvilket tall?', 4, '2x + 1 = 9.', '2x = 8, så x = 4.'),
      T('En bok koster 20 kr mer enn en penn. Boken koster 35 kr. Hva koster pennen?', 15, 'x + 20 = 35.', 'x = 35 − 20 = 15 kr.', 'kr'),
      V('Du løser 2x + 5 = 17 og får x = 11. Stemmer det?', ['Nei', 'Ja'], 0, 'Sett 11 inn for x: 2 · 11 + 5 = ?', '2 · 11 + 5 = 27, ikke 17. Riktig svar er x = 6.', true),
      V('Du regner ut hvor mange epler det er i en kurv og får x = −3. Gir svaret mening?', ['Nei', 'Ja'], 0, 'Kan det være −3 epler?', 'Nei. Antall epler kan ikke være negativt. Da må du sjekke likningen en gang til.', true)
    ]),
    SJ('Dette kan du nå', ['Forstå hva en likning er', 'Løse likninger med pluss, minus, gange og dele', 'Løse likninger med to steg', 'Lage en likning fra en tekst', 'Sjekke svaret'])
  ]));

  M.register('steg', '8/ligninger', {
    tittel: 'Likninger',
    ingress: 'Små steg, tydelige eksempler og hjelp hele veien. Du lærer å løse likninger.',
    mal: ['forstå hva en likning er', 'løse enkle likninger', 'bruke likninger i hverdagen'],
    ordliste: ORD, seksjoner: T1
  });

  /* ====================== EKSTRA ====================== */
  M.ekstra['8/ligninger'] = function (mode) {
    const lett = mode === 'steg'; const sek = [];
    sek.push(H.ek('en', '1️⃣', 'Ett steg', 8, 'Løs likningen.', function (r, i) {
      const x = r.int(2, lett ? 12 : 25), a = r.int(2, lett ? 9 : 12), t = i % 4;
      if (t === 0) return H.e('x + ' + a + ' = ' + (x + a), x, 'x = ' + (x + a) + ' − ' + a + ' = ' + x);
      if (t === 1) return H.e('x − ' + a + ' = ' + x, x + a, 'x = ' + x + ' + ' + a + ' = ' + (x + a));
      if (t === 2) return H.e(a + 'x = ' + a * x, x, 'x = ' + a * x + ' : ' + a + ' = ' + x);
      return H.e('x : ' + a + ' = ' + x, a * x, 'x = ' + x + ' · ' + a + ' = ' + a * x);
    }));
    sek.push(H.ek('to', '2️⃣', 'To steg', 10, 'Løs likningen. Trekk fra/legg til først, så del.', function (r, i) {
      const x = r.int(2, lett ? 8 : 15), a = r.int(2, lett ? 5 : 9), b = r.int(1, 12);
      return i % 2 === 0 ? H.e(a + 'x + ' + b + ' = ' + (a * x + b), x, a + 'x = ' + (a * x) + ', så x = ' + x) : H.e(a + 'x − ' + b + ' = ' + (a * x - b), x, a + 'x = ' + (a * x) + ', så x = ' + x);
    }));
    sek.push(H.ek('hist', '📖', 'Fra historie til likning', 6, 'Lag likningen i hodet og løs den.', function (r, i) {
      const x = r.int(5, 30), a = r.int(2, 6), b = r.int(2, 20); const t = i % 3;
      if (t === 0) return H.e('Du har ' + (a * x + b) + ' kr. Du kjøper ' + a + ' like ting og har ' + b + ' kr igjen. Hva koster én ting?', x, a + 'x + ' + b + ' = ' + (a * x + b) + ', så x = ' + x + ' kr');
      if (t === 1) return H.e('En taxi tar ' + b * 5 + ' kr i start og ' + a * 5 + ' kr per km. Turen kostet ' + (a * 5 * x + b * 5) + ' kr. Hvor mange km?', x, a * 5 + 'x + ' + b * 5 + ' = ' + (a * 5 * x + b * 5) + ', så x = ' + x + ' km');
      return H.e('Jeg tenker på et tall. Ganger jeg det med ' + a + ' og legger til ' + b + ', får jeg ' + (a * x + b) + '. Hvilket tall?', x, a + 'x + ' + b + ' = ' + (a * x + b) + ', så x = ' + x);
    }));
    const mn = n => (n < 0 ? '−' + (-n) : String(n));
    if (!lett) sek.push(H.ek('begge', '↔️', 'X på begge sider', 6, 'Samle x-ene på en side, flytt tallene, og løs.', function (r, i) {
      const x = r.int(2, 12), a = r.int(3, 8), c = r.int(1, a - 1);
      if (i % 2 === 0) { const b = r.int(1, 10), e = (a - c) * x + b; return H.e(a + 'x + ' + b + ' = ' + c + 'x + ' + e, x, 'Trekk fra ' + c + 'x: ' + (a - c) + 'x + ' + b + ' = ' + e + '. Trekk fra ' + b + ': ' + (a - c) + 'x = ' + (e - b) + ', så x = ' + x); }
      const b = r.int(1, (a - c) * x - 1), e = (a - c) * x - b; return H.e(a + 'x − ' + b + ' = ' + c + 'x + ' + e, x, 'Trekk fra ' + c + 'x: ' + (a - c) + 'x − ' + b + ' = ' + e + '. Legg til ' + b + ': ' + (a - c) + 'x = ' + (e + b) + ', så x = ' + x);
    }));
    if (!lett) sek.push(H.ek('neg', '❄️', 'Negativt svar', 4, 'Løs likningen. Svaret blir et negativt tall.', function (r) {
      const x = -r.int(1, 9), a = r.int(2, 6), b = r.int(1, 15), c = a * x + b;
      return H.e(a + 'x + ' + b + ' = ' + mn(c), x, a + 'x = ' + mn(c) + ' − ' + b + ' = ' + mn(a * x) + ', så x = ' + mn(a * x) + ' : ' + a + ' = ' + mn(x));
    }));
    return H.ekDef('Likninger', sek);
  };
})();
