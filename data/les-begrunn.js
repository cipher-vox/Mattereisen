/* ============================================================
   Les, tolk og begrunn: opptrening før fritekst
   - se:   et vist eksempel med fargede deler (påstand, begrunnelse, eksempel, konklusjon)
   - bygg: bygg en setning av brikker (trykk på brikken, så på ruta). Flere brikker kan være riktige.
   - tekstIntro: «slik leser du en oppgavetekst», trinn for trinn
   Brikke: [tekst, [ruter den passer i], hint hvis den er feil]
   Rute som begynner med «.» starter en ny setning.
   {{ord}} i eksempelsvar er signalord som utheves.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE; M.les = M.les || {}; M.les.bx = M.les.bx || {}; M.les.bx.data = M.les.bx.data || {};
  const T = (oppg, graf, ruter, brikker, alt) => ({ oppg: oppg, graf: graf || null, ruter: ruter, brikker: brikker.map(b => ({ t: b[0], ok: b[1], hint: b[2] || '' })), alt: alt || '' });
  const B = (t, ok, hint) => [t, ok, hint];

  /* ---------------- 8. trinn ---------------- */
  const SPARING = { type: 'linje', tittel: 'Mias sparing', xTittel: 'Måned', yTittel: 'Sparte penger (kr)', kat: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun'], verdier: [200, 350, 500, 650, 800, 950], yMin: 0, yMax: 1000, steg: 200 };
  const FRUKT = { type: 'sol', tittel: 'Favorittfrukt i 8A', xTittel: 'Frukt', yTittel: 'Antall elever', kat: ['Eple', 'Banan', 'Pære', 'Appelsin'], verdier: [8, 12, 5, 7], yMin: 0, yMax: 14, steg: 2 };
  M.les.bx.data[8] = {
    tekstIntro: {
      tekst: 'På et bakeri koster en bolle [[t|25 kr]]. [[u|Bakeren heter Per og har drevet bakeriet i 12 år.]] Ola kjøper [[t|4 boller]] og betaler med en [[t|200-kroneseddel]]. [[s|Hvor mye får han tilbake?]]',
      plan: 'Plan: Først prisen for bollene: 4 · 25 = 100 kr. Så vekslepengene: 200 − 100 = 100 kr.'
    },
    se: {
      oppg: 'Mia sier: «Sparingen min øker jevnt.» Grafen viser hva hun hadde spart ved slutten av hver måned. Stemmer det?',
      graf: SPARING,
      deler: [
        ['P', 'Ja, det stemmer. Sparingen øker jevnt.', 'Svar på spørsmålet først, med egne ord.'],
        ['B', '{{Det stemmer fordi}} økningen er like stor fra en måned til neste.', 'Bindeordet «fordi» viser at nå kommer grunnen.'],
        ['E', '{{For eksempel}} går den fra 200 kr i januar til 350 kr i februar, og det er 150 kr mer. {{Fra}} februar til mars går den fra 350 til 500 kr, også 150 kr mer.', 'Tall fra grafen viser at du faktisk har lest den.'],
        ['K', '{{Derfor}} blir grafen en rett linje, og sparingen øker jevnt med 150 kr hver måned.', 'Knytt svaret tilbake til spørsmålet.']
      ],
      svakt: 'Ja, fordi grafen går oppover.',
      mangler: ['«Oppover» betyr ikke «jevnt». En graf kan gå oppover og likevel øke mer og mer.', 'Ingen tall fra grafen.', 'Ingen kobling tilbake til spørsmålet.']
    },
    bygg: {
      rolig: [
        T('−3 og −7 ligger på tallinja. Påstand: −3 er større enn −7. Bygg en setning som begrunner det.', null, ['Påstand', 'Bindeord', 'Begrunnelse'], [
          B('Jeg mener at −3 er større enn −7', [0]), B('−3 er større enn −7', [0]), B('−3 er mindre enn −7', [], 'Se på tallinja. Tall lenger til høyre er større.'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» står foran en konklusjon. Her trenger vi grunnen først, så bruk «fordi» eller «siden».'),
          B('−3 ligger lenger til høyre på tallinja', [2]), B('−3 er bare 3 under null, mens −7 er 7 under null', [2]), B('−3 ligger lenger til venstre på tallinja', [], 'Lenger til venstre betyr mindre. Hva ligger til høyre, −3 eller −7?')
        ]),
        T('Påstand: x = 4 er løsningen på likningen 2x + 1 = 9. Bygg en setning som begrunner det.', null, ['Påstand', 'Bindeord', 'Begrunnelse'], [
          B('Løsningen er x = 4', [0]), B('Jeg mener at løsningen er x = 4', [0]), B('Løsningen er x = 5', [], 'Sett inn 5: 2 · 5 + 1 = 11, og det er ikke 9.'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon, ikke en grunn.'),
          B('2 · 4 + 1 = 9, og da blir begge sidene like', [2]), B('når vi setter inn 4, blir venstre side 9, og det er lik høyre side', [2]), B('2 · 4 + 1 = 8, og da blir begge sidene like', [], '2 · 4 = 8, og så + 1 gir 9, ikke 8.'), B('4 er et pent tall', [], 'Et pent tall er ikke en grunn. Sett inn i likningen.')
        ])
      ],
      vanlig: [
        T('Grafen viser favorittfrukten i 8A. Påstand: Banan er mest populær. Bygg et svar med påstand, begrunnelse og et eksempel fra grafen.', FRUKT, ['Påstand', 'Bindeord', 'Begrunnelse', '.Eksempelord', 'Eksempel'], [
          B('Banan er den mest populære frukten', [0]), B('Jeg mener at banan er mest populær', [0]), B('Eple er den mest populære frukten', [], 'Se på søylene. Hvilken er høyest?'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her trenger vi grunnen.'),
          B('søylen for banan er høyest', [2]), B('flest elever har valgt banan', [2]), B('søylen for banan er lavest', [], 'Se igjen. Det er pære som har den laveste søylen.'),
          B('For eksempel kan vi se at', [3]), B('Et eksempel er at', [3]), B('Derfor', [], '«Derfor» hører til en konklusjon. Her skal du gi et eksempel.'),
          B('banan har 12 elever, mens eple har 8', [4]), B('12 elever har valgt banan, og det er flere enn de 8 som har valgt eple', [4]), B('banan har 8 elever, mens eple har 12', [], 'Les av grafen igjen: banan 12, eple 8.'), B('banan er god', [], 'Det er ikke et tall fra grafen. Vis med tall.')
        ]),
        T('Påstand: 25 % av 80 er 20. Bygg et svar som viser at det stemmer.', null, ['Påstand', 'Bindeord', 'Begrunnelse', '.Eksempelord', 'Eksempel'], [
          B('25 % av 80 er 20', [0]), B('Jeg mener at 25 % av 80 er 20', [0]), B('25 % av 80 er 25', [], '25 % er en fjerdedel. En fjerdedel av 80 er ikke 25.'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her trenger vi grunnen.'),
          B('25 % er det samme som en fjerdedel', [2]), B('25 % er det samme som 0,25', [2]), B('25 % er det samme som halvparten', [], 'Halvparten er 50 %.'),
          B('Utregningen viser at', [3]), B('Det kan vi vise slik:', [3]), B('Selv om', [], '«Selv om» viser en motsetning. Her skal du vise utregningen.'),
          B('80 : 4 = 20', [4]), B('80 · 0,25 = 20', [4]), B('80 : 4 = 25', [], '80 : 4 er 20.')
        ])
      ],
      utfordring: [
        T('Påstand: −4 − (−6) er lik 2. Bygg en fullstendig begrunnelse: påstand, grunn, utregning og konklusjon.', null, ['Påstand', 'Bindeord', 'Begrunnelse', '.Mellomord', 'Utregning', '.Avslutningsord', 'Konklusjon'], [
          B('−4 − (−6) er lik 2', [0]), B('Jeg mener at −4 − (−6) er lik 2', [0]), B('−4 − (−6) er lik −10', [], 'Å trekke fra −6 er ikke det samme som å trekke fra 6. Prøv å regne −4 + 6.'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her skal grunnen komme.'),
          B('å trekke fra et negativt tall er det samme som å legge til det motsatte tallet', [2]), B('å trekke fra −6 gjør det samme som å legge til 6', [2]), B('å trekke fra et negativt tall er det samme som å trekke fra et positivt tall', [], 'Det er ikke det samme. To minustegn på rad gir pluss.'),
          B('Det betyr at', [3]), B('Det vil si at', [3]), B('Selv om', [], '«Selv om» viser en motsetning. Her følger neste steg direkte av regelen.'),
          B('−4 − (−6) = −4 + 6', [4]), B('−4 − (−6) = −4 + 6 = 2', [4]), B('−4 − (−6) = −4 − 6', [], 'Da mister du det ene minustegnet. Parentesen med minus foran snur fortegnet.'),
          B('Derfor', [5]), B('Altså', [5]), B('Fordi', [], '«Fordi» innleder en grunn. Nå skal du konkludere.'),
          B('blir svaret 2', [6]), B('er svaret 2', [6]), B('blir svaret −10', [], '−4 + 6 = 2. Tenk på tallinja.')
        ]),
        T('Påstand: Hvis en pris først settes opp 20 % og så ned 20 %, blir prisen lavere enn den var. Bygg en begrunnelse med eksempel.', null, ['Påstand', 'Bindeord', 'Begrunnelse', '.Eksempelord', 'Eksempel', '.Avslutningsord', 'Konklusjon'], [
          B('Prisen blir lavere enn den var', [0]), B('Jeg mener at prisen blir lavere enn den var', [0]), B('Prisen blir den samme som før', [], 'Prøv med 100 kr: 20 % opp, og så 20 % ned. Blir det 100 igjen?'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her skal grunnen komme.'),
          B('20 % ned gjelder en større pris enn 20 % opp', [2]), B('prosentene gjelder ulike tall: først den gamle prisen, så den nye', [2]), B('+20 % og −20 % er like store og tar ut hverandre', [], 'De er like mange prosent, men prosentene gjelder ulike tall.'),
          B('For eksempel', [3]), B('Et eksempel er at', [3]), B('Selv om', [], '«Selv om» viser en motsetning. Her skal du gi et eksempel.'),
          B('100 kr + 20 % = 120 kr, og 20 % av 120 kr er 24 kr, så prisen blir 96 kr', [4]), B('120 kr − 24 kr = 96 kr når vi starter på 100 kr', [4]), B('100 kr + 20 % = 120 kr, og 120 kr − 20 kr = 100 kr', [], 'Nedsettingen er 20 % av 120 kr, ikke 20 kr.'),
          B('Derfor', [5]), B('Altså', [5]), B('Fordi', [], '«Fordi» innleder en grunn. Nå skal du konkludere.'),
          B('ender vi på 96 kr, ikke 100 kr', [6]), B('er prisen 4 kr lavere enn før', [6]), B('er prisen 20 kr lavere enn før', [], 'Se utregningen: 100 − 96 = 4.')
        ])
      ]
    }
  };

  /* ---------------- 9. trinn ---------------- */
  const VAFLER = { type: 'sol', tittel: 'Solgte vafler i kantina', xTittel: 'Ukedag', yTittel: 'Antall vafler', kat: ['Man', 'Tir', 'Ons', 'Tor', 'Fre'], verdier: [40, 55, 45, 80, 60], yMin: 0, yMax: 90, steg: 10 };
  const TERNING = { type: 'sol', tittel: 'Resultater fra 30 terningkast', xTittel: 'Antall øyne', yTittel: 'Antall kast', kat: ['1', '2', '3', '4', '5', '6'], verdier: [4, 6, 5, 7, 3, 5], yMin: 0, yMax: 8, steg: 2 };
  M.les.bx.data[9] = {
    tekstIntro: {
      tekst: 'Et tog kjører [[t|180 km]] på [[t|2 timer]]. [[u|Toget er rødt og har 6 vogner.]] [[s|Hva er gjennomsnittsfarten i km/t?]]',
      plan: 'Plan: Fart = strekning : tid. Altså 180 km : 2 timer = 90 km/t.'
    },
    se: {
      oppg: 'Elevrådet sier: «Torsdag solgte kantina dobbelt så mange vafler som mandag.» Grafen viser salget. Stemmer det?',
      graf: VAFLER,
      deler: [
        ['P', 'Ja, det stemmer. Torsdag solgte kantina dobbelt så mange vafler som mandag.', 'Svar på spørsmålet først, med egne ord.'],
        ['B', '{{Det stemmer fordi}} søylen for torsdag er dobbelt så høy som søylen for mandag.', '«Fordi» viser at nå kommer grunnen.'],
        ['E', '{{For eksempel}} ser vi at mandag ble det solgt 40 vafler, og torsdag 80. {{Siden}} 80 : 40 = 2, er torsdag dobbelt så mye.', 'Tall fra grafen og en utregning viser at påstanden er sjekket.'],
        ['K', '{{Derfor}} er påstanden riktig. Y-aksen starter på 0, så søylene gir et ærlig bilde.', 'Knytt svaret tilbake til spørsmålet, og husk å sjekke aksen.']
      ],
      svakt: 'Ja, for torsdag er høyest.',
      mangler: ['«Høyest» betyr ikke «dobbelt». Du må sammenligne tallene.', 'Ingen tall fra grafen.', 'Ingen utregning som viser at det er dobbelt.']
    },
    bygg: {
      rolig: [
        T('Sara sykler 30 km på 2 timer. Påstand: Farten hennes er 15 km/t. Bygg en setning som begrunner det.', null, ['Påstand', 'Bindeord', 'Begrunnelse'], [
          B('Farten er 15 km/t', [0]), B('Jeg mener at farten er 15 km/t', [0]), B('Farten er 60 km/t', [], '60 er 30 · 2. Fart er strekning delt på tid.'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her trenger vi grunnen.'),
          B('30 km : 2 timer = 15 km/t', [2]), B('fart er strekning delt på tid, og 30 : 2 = 15', [2]), B('30 km · 2 timer = 60 km/t', [], 'Fart finner du ved å dele strekning på tid, ikke ved å gange.')
        ]),
        T('En trekant har sidene 3, 4 og 5. Påstand: Trekanten er rettvinklet. Bygg en setning som begrunner det.', null, ['Påstand', 'Bindeord', 'Begrunnelse'], [
          B('Trekanten er rettvinklet', [0]), B('Jeg mener at trekanten er rettvinklet', [0]), B('Trekanten er ikke rettvinklet', [], 'Sjekk med Pytagoras: Hva er 3² + 4²?'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her trenger vi grunnen.'),
          B('3² + 4² = 9 + 16 = 25, og det er det samme som 5²', [2]), B('kvadratene av de to korteste sidene er til sammen like store som kvadratet av den lengste', [2]), B('3 + 4 = 7, og det er mer enn 5', [], 'Det sier bare at sidene kan danne en trekant. Bruk Pytagoras.')
        ])
      ],
      vanlig: [
        T('Grafen viser 30 terningkast. Påstand: Fire øyne kom oftest. Bygg et svar med påstand, begrunnelse og et eksempel fra grafen.', TERNING, ['Påstand', 'Bindeord', 'Begrunnelse', '.Eksempelord', 'Eksempel'], [
          B('Fire øyne kom oftest', [0]), B('Jeg mener at fire øyne kom oftest', [0]), B('Seks øyne kom oftest', [], 'Se på den høyeste søylen. Hvilket tall står under?'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her trenger vi grunnen.'),
          B('søylen for 4 er høyest', [2]), B('4 har flere kast enn noen av de andre tallene', [2]), B('søylen for 4 er lavest', [], 'Se igjen. Det er 5 som har den laveste søylen.'),
          B('For eksempel kan vi se at', [3]), B('Et eksempel er at', [3]), B('Derfor', [], '«Derfor» hører til en konklusjon. Her skal du gi et eksempel.'),
          B('4 kom 7 ganger, mens 6 kom 5 ganger', [4]), B('fire øyne kom 7 ganger, og 2 kom 6 ganger', [4]), B('4 kom 5 ganger, mens 6 kom 7 ganger', [], 'Les av grafen igjen: 4 kom 7 ganger og 6 kom 5 ganger.')
        ]),
        T('En rettvinklet trekant har katetene 6 og 8. Påstand: Hypotenusen er 10. Bygg et svar som viser at det stemmer.', null, ['Påstand', 'Bindeord', 'Begrunnelse', '.Eksempelord', 'Utregning'], [
          B('Hypotenusen er 10', [0]), B('Jeg mener at hypotenusen er 10', [0]), B('Hypotenusen er 14', [], '6 + 8 = 14 er feil metode. Bruk Pytagoras.'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her trenger vi grunnen.'),
          B('kvadratet av hypotenusen er summen av kvadratene til katetene', [2]), B('Pytagoras sier at a² + b² = c²', [2]), B('hypotenusen er summen av katetene', [], 'Det er kvadratene som legges sammen, ikke sidene.'),
          B('Det kan vi regne slik:', [3]), B('Utregningen er:', [3]), B('Selv om', [], '«Selv om» viser en motsetning. Her skal du vise utregningen.'),
          B('6² + 8² = 36 + 64 = 100, og √100 = 10', [4]), B('36 + 64 = 100, og kvadratroten av 100 er 10', [4]), B('6² + 8² = 36 + 64 = 100, og √100 = 50', [], '√100 er 10, fordi 10 · 10 = 100.'), B('6 + 8 = 14, og √14 ≈ 3,7', [], 'Du må kvadrere først: 6² og 8².')
        ])
      ],
      utfordring: [
        T('Påstand: Sannsynligheten for to seksere på rad er 1/36. Bygg en fullstendig begrunnelse: påstand, grunn, utregning og konklusjon.', null, ['Påstand', 'Bindeord', 'Begrunnelse', '.Mellomord', 'Utregning', '.Avslutningsord', 'Konklusjon'], [
          B('Sannsynligheten for to seksere på rad er 1/36', [0]), B('Jeg mener at sannsynligheten for to seksere på rad er 1/36', [0]), B('Sannsynligheten for to seksere på rad er 1/12', [], 'Å legge sammen 1/6 + 1/6 er feil. Ved to uavhengige kast ganger du.'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her skal grunnen komme.'),
          B('hvert kast har sannsynlighet 1/6 for sekser, og kastene påvirker ikke hverandre', [2]), B('kastene er uavhengige, og hvert kast gir sekser med sannsynlighet 1/6', [2]), B('andre kast avhenger av første kast', [], 'En terning husker ingenting. Kastene er uavhengige.'),
          B('Det betyr at', [3]), B('Det vil si at', [3]), B('Selv om', [], '«Selv om» viser en motsetning. Her følger neste steg direkte av grunnen.'),
          B('vi ganger: 1/6 · 1/6 = 1/36', [4]), B('sannsynligheten blir 1/6 · 1/6 = 1/36', [4]), B('vi legger sammen: 1/6 + 1/6 = 1/3', [], '«Og» mellom to uavhengige hendelser betyr gange, ikke pluss.'),
          B('Derfor', [5]), B('Altså', [5]), B('Fordi', [], '«Fordi» innleder en grunn. Nå skal du konkludere.'),
          B('er det bare 1 av 36 mulige utfall som gir to seksere', [6]), B('er det 1 mulighet av 36 for to seksere på rad', [6]), B('er det 2 muligheter av 36', [], 'Det finnes bare ett utfall med to seksere: (6, 6).')
        ]),
        T('Tallene er 2, 3, 3, 4 og 48. Påstand: Medianen passer bedre enn gjennomsnittet som et typisk tall. Bygg en begrunnelse med eksempel.', null, ['Påstand', 'Bindeord', 'Begrunnelse', '.Eksempelord', 'Eksempel', '.Avslutningsord', 'Konklusjon'], [
          B('Medianen passer bedre enn gjennomsnittet', [0]), B('Jeg mener at medianen passer bedre enn gjennomsnittet', [0]), B('Gjennomsnittet passer bedre enn medianen', [], 'Tenk på hva ett veldig stort tall gjør med gjennomsnittet.'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her skal grunnen komme.'),
          B('ett tall er mye større enn de andre og trekker gjennomsnittet opp', [2]), B('48 er et ekstremt tall som påvirker gjennomsnittet mye, men medianen lite', [2]), B('alle tallene er omtrent like store', [], 'Se på 48. Er det omtrent som de andre?'),
          B('For eksempel', [3]), B('Et eksempel er at', [3]), B('Selv om', [], '«Selv om» viser en motsetning. Her skal du gi et eksempel.'),
          B('gjennomsnittet er (2 + 3 + 3 + 4 + 48) : 5 = 12, mens medianen er 3', [4]), B('summen er 60, og 60 : 5 = 12, mens midterste tall er 3', [4]), B('gjennomsnittet er 3, mens medianen er 12', [], 'Medianen er det midterste tallet: 3. Gjennomsnittet er 60 : 5 = 12.'),
          B('Derfor', [5]), B('Altså', [5]), B('Fordi', [], '«Fordi» innleder en grunn. Nå skal du konkludere.'),
          B('beskriver medianen et vanlig tall bedre', [6]), B('gir medianen et mer rettferdig bilde', [6]), B('er 12 et godt typisk tall', [], 'Ingen av tallene er i nærheten av 12, bortsett fra 48 som er mye større.')
        ])
      ]
    }
  };

  /* ---------------- 10. trinn ---------------- */
  const SPAR10 = { type: 'linje', tittel: 'Sparing med 4 % rente', xTittel: 'År', yTittel: 'Beløp (kr)', kat: ['0', '1', '2', '3', '4'], verdier: [20000, 20800, 21632, 22497, 23397], yMin: 20000, yMax: 24000, steg: 1000 };
  const TAXI = { type: 'linje', tittel: 'Pris for taxitur', xTittel: 'Kjørt strekning (km)', yTittel: 'Pris (kr)', kat: ['0', '2', '4', '6', '8'], verdier: [50, 90, 130, 170, 210], yMin: 0, yMax: 250, steg: 50 };
  M.les.bx.data[10] = {
    tekstIntro: {
      tekst: 'Maja setter inn [[t|30 000 kr]] på en konto med [[t|3 % rente]] per år. [[u|Banken har kontor i Bergen.]] Hun lar pengene stå i [[t|2 år]]. [[s|Hvor mye har hun på kontoen etter 2 år?]]',
      plan: 'Plan: Vekstfaktoren er 1,03. Etter 2 år: 30 000 · 1,03² = 30 000 · 1,0609 = 31 827 kr.'
    },
    se: {
      oppg: 'Noen sier: «Når du sparer med fast rente, øker beløpet like mye hvert år.» Grafen viser 20 000 kr med 4 % rente per år. Stemmer påstanden? (Legg merke til at y-aksen starter på 20 000.)',
      graf: SPAR10,
      deler: [
        ['P', 'Nei, det stemmer ikke. Beløpet øker litt mer for hvert år.', 'Svar på spørsmålet først, med egne ord.'],
        ['B', '{{Det stemmer ikke fordi}} renten regnes av et beløp som blir større og større.', '«Fordi» viser at nå kommer grunnen.'],
        ['E', '{{For eksempel}} øker beløpet med 800 kr det første året (20 000 til 20 800), men med 832 kr det andre året (20 800 til 21 632).', 'To like utregninger side om side viser forskjellen.'],
        ['K', '{{Derfor}} er det ikke en rett linje, men en kurve som krummer oppover. Du får rente på renten.', 'Knytt svaret tilbake til spørsmålet, og bruk riktig fagord.']
      ],
      svakt: 'Nei, fordi den ikke er rett.',
      mangler: ['«Ikke rett» er bare en beskrivelse, ikke en grunn.', 'Ingen tall fra grafen.', 'Ingen forklaring på hvorfor økningen blir større.']
    },
    bygg: {
      rolig: [
        T('En pris er 200 kr og øker med 10 %. Påstand: Den nye prisen er 220 kr. Bygg en setning som begrunner det.', null, ['Påstand', 'Bindeord', 'Begrunnelse'], [
          B('Den nye prisen er 220 kr', [0]), B('Jeg mener at den nye prisen er 220 kr', [0]), B('Den nye prisen er 210 kr', [], '10 % av 200 er 20, ikke 10.'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her trenger vi grunnen.'),
          B('10 % av 200 er 20, og 200 + 20 = 220', [2]), B('vekstfaktoren er 1,10, og 200 · 1,10 = 220', [2]), B('10 % av 200 er 10, og 200 + 10 = 210', [], '10 % av 200 er 20, siden 200 : 10 = 20.')
        ]),
        T('Likningene er x + y = 5 og x − y = −1. Påstand: Løsningen er x = 2 og y = 3. Bygg en setning som begrunner det.', null, ['Påstand', 'Bindeord', 'Begrunnelse'], [
          B('Løsningen er x = 2 og y = 3', [0]), B('Jeg mener at løsningen er x = 2 og y = 3', [0]), B('Løsningen er x = 3 og y = 2', [], 'Sett inn i x − y: 3 − 2 = 1, og det er ikke −1.'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her trenger vi grunnen.'),
          B('begge likningene stemmer når vi setter inn tallene', [2]), B('2 + 3 = 5 og 2 − 3 = −1', [2]), B('bare den første likningen stemmer', [], 'Sjekk begge. 2 − 3 = −1 stemmer også.')
        ])
      ],
      vanlig: [
        T('Grafen viser prisen for en taxitur. Påstand: Prisen øker med 20 kr for hver km. Bygg et svar med påstand, begrunnelse og et eksempel fra grafen.', TAXI, ['Påstand', 'Bindeord', 'Begrunnelse', '.Eksempelord', 'Eksempel'], [
          B('Prisen øker med 20 kr for hver km', [0]), B('Jeg mener at prisen øker med 20 kr per km', [0]), B('Prisen øker med 40 kr for hver km', [], '40 kr er økningen på 2 km. Del på 2.'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her trenger vi grunnen.'),
          B('grafen er en rett linje, så økningen er lik hele veien', [2]), B('prisen øker like mye for hver nye 2 km', [2]), B('grafen krummer oppover', [], 'Se igjen. Punktene ligger på en rett linje.'),
          B('For eksempel kan vi se at', [3]), B('Et eksempel er at', [3]), B('Derfor', [], '«Derfor» hører til en konklusjon. Her skal du gi et eksempel.'),
          B('prisen går fra 50 kr til 90 kr på 2 km, og 40 : 2 = 20', [4]), B('prisen går fra 90 kr til 130 kr på 2 km, og 40 : 2 = 20', [4]), B('prisen går fra 50 kr til 70 kr på 2 km', [], 'Les av grafen igjen. Ved 2 km er prisen 90 kr.')
        ]),
        T('Påstand: Vekstfaktoren for en økning på 5 % er 1,05. Bygg et svar som viser at det stemmer.', null, ['Påstand', 'Bindeord', 'Begrunnelse', '.Eksempelord', 'Eksempel'], [
          B('Vekstfaktoren er 1,05', [0]), B('Jeg mener at vekstfaktoren er 1,05', [0]), B('Vekstfaktoren er 1,5', [], '5 % er 0,05. Du legger til 1 for økning: 1 + 0,05.'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her trenger vi grunnen.'),
          B('100 % + 5 % = 105 %, og 105 % er 1,05', [2]), B('du beholder hele beløpet (1) og legger til 0,05', [2]), B('5 % er 0,5', [], '5 % er 0,05. Del 5 på 100.'),
          B('Vi kan sjekke med 200 kr:', [3]), B('Et eksempel er at', [3]), B('Selv om', [], '«Selv om» viser en motsetning. Her skal du vise med et tall.'),
          B('200 · 1,05 = 210, og 210 − 200 = 10, som er 5 % av 200', [4]), B('200 · 1,05 = 210, som er 10 kr mer enn 200', [4]), B('200 · 1,05 = 205, og 205 − 200 = 5, som er 5 % av 200', [], '200 · 1,05 = 210, ikke 205. Og 5 % av 200 er 10.')
        ])
      ],
      utfordring: [
        T('Påstand: Linjene y = 2x + 1 og y = 2x + 5 har ingen felles løsning. Bygg en fullstendig begrunnelse: påstand, grunn, utregning og konklusjon.', null, ['Påstand', 'Bindeord', 'Begrunnelse', '.Mellomord', 'Utregning', '.Avslutningsord', 'Konklusjon'], [
          B('Linjene har ingen felles løsning', [0]), B('Jeg mener at linjene ikke har noen felles løsning', [0]), B('Linjene har nøyaktig én felles løsning', [], 'Sammenlign stigningstallene. Hva skjer når de er like?'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her skal grunnen komme.'),
          B('linjene har samme stigningstall, så de er parallelle', [2]), B('begge har stigningstall 2, men de skjærer y-aksen i ulike punkt', [2]), B('linjene har ulike stigningstall', [], 'Begge har 2 foran x.'),
          B('Det betyr at', [3]), B('Det vil si at', [3]), B('Selv om', [], '«Selv om» viser en motsetning. Her følger neste steg direkte av grunnen.'),
          B('2x + 1 = 2x + 5 gir 1 = 5, og det er aldri sant', [4]), B('når vi trekker fra 2x på begge sider, står det 1 = 5', [4]), B('2x + 1 = 2x + 5 gir x = 4', [], 'Trekk fra 2x på begge sider. Hva står igjen?'),
          B('Derfor', [5]), B('Altså', [5]), B('Fordi', [], '«Fordi» innleder en grunn. Nå skal du konkludere.'),
          B('krysser ikke linjene hverandre', [6]), B('finnes det ikke noe punkt der begge likningene stemmer', [6]), B('krysser linjene hverandre én gang', [], 'Parallelle linjer krysser aldri hverandre.')
        ]),
        T('Påstand: 10 000 kr med 5 % rente per år er mer enn 11 000 kr etter 2 år. Bygg en begrunnelse med utregning.', null, ['Påstand', 'Bindeord', 'Begrunnelse', '.Mellomord', 'Utregning', '.Avslutningsord', 'Konklusjon'], [
          B('Beløpet er over 11 000 kr etter 2 år', [0]), B('Jeg mener at beløpet er over 11 000 kr etter 2 år', [0]), B('Beløpet er under 11 000 kr etter 2 år', [], 'Regn ut: Hva blir 10 000 · 1,05²?'),
          B('fordi', [1]), B('siden', [1]), B('derfor', [], '«Derfor» innleder en konklusjon. Her skal grunnen komme.'),
          B('vekstfaktoren 1,05 brukes to ganger, og du får rente på renten', [2]), B('rentene det andre året regnes av et større beløp', [2]), B('renten er 5 % av 10 000 hvert år, og ingenting mer', [], 'Det andre året regnes renten av et større beløp.'),
          B('Det betyr at', [3]), B('Utregningen er', [3]), B('Selv om', [], '«Selv om» viser en motsetning. Her skal du vise utregningen.'),
          B('10 000 · 1,05² = 10 000 · 1,1025 = 11 025', [4]), B('10 000 · 1,05 · 1,05 = 11 025', [4]), B('10 000 · 1,05 · 2 = 21 000', [], '1,05² er 1,05 · 1,05, ikke 1,05 · 2.'), B('10 000 · 1,10 = 11 000', [], '5 % to ganger er mer enn 10 %, fordi du får rente på renten.'),
          B('Derfor', [5]), B('Altså', [5]), B('Fordi', [], '«Fordi» innleder en grunn. Nå skal du konkludere.'),
          B('er beløpet 25 kr over 11 000 kr', [6]), B('stemmer påstanden', [6]), B('er beløpet akkurat 11 000 kr', [], '11 025 er 25 kr mer enn 11 000.')
        ])
      ]
    }
  };
})();
