/* ============================================================
   Håndskrevne føringseksempler (ruteark).
   Linjer:  «tekst»  eller  {t, nr, i}  |  {g:[[venstre, høyre, kommentar],…], n, k}  |  {tom:1, n}  |  {skisse:'trekant'}
   Merking i tekst:  {{id|tekst}} forklart del   ==tekst== to streker under   ~~tekst~~ strek over
                     %%tekst%% overskrevet       <<id|tekst>> feil som elevene skal finne
   Forklaring 1 er alltid marg og oppgavenummer.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE; M.les = M.les || {}; M.les.hand = M.les.hand || {};
  const MARG = [1, 'Marg og oppgavenummer', 'Skriv oppgavenummeret i margen, til venstre for marglinja. Skriv til høyre for linja.'];
  const NOTER = {
    oppg: [MARG,
      [2, 'Gitt og finn', 'Skriv hva du vet, og hva du skal finne.'],
      [3, 'Regel eller metode', 'Skriv regelen eller metoden du bruker, før du begynner å regne.'],
      [4, 'Ett steg per linje', 'Hver linje er ett steg, og likhetstegnene står rett under hverandre.'],
      [5, 'Forklaring til høyre', 'Skriv kort hva du gjør i hvert steg. Da ser læreren hvordan du tenkte.'],
      [6, 'Sjekk', 'Sett svaret inn og se at det stemmer.'],
      [7, 'Svar med to streker', 'Skriv en svarsetning med enhet eller navn, og sett to streker under.']],
    begr: [MARG,
      [2, 'Påstand først', 'Svar på spørsmålet med en gang: ja eller nei, og hva du mener.'],
      [3, 'Begrunnelsen', 'Skriv hvorfor. Bruk et signalord som «fordi», «siden» eller «derfor».'],
      [4, 'Eksempel med tall', 'Vis med tall eller en situasjon at det stemmer.'],
      [5, 'Svar med to streker', 'Avslutt med et kort svar, og sett to streker under.']],
    prove: [MARG,
      [2, 'Deloppgaver', 'Skriv a), b) og c) tydelig, så læreren ser hva du svarer på.'],
      [3, 'Strek over feil', 'Stryk over med én rett strek. Ikke visk ut og ikke skriv over. Skriv gjerne hva som var feil.'],
      [4, 'Eget svar med enhet', 'Hver deloppgave får sin egen svarlinje med enhet og to streker under.'],
      [5, 'Luft mellom deloppgavene', 'Hopp over en linje mellom deloppgavene. Da er det lett å lese og lett å rette.']]
  };
  const FEIL = {
    marg: ['Marg', 'Det mangler marg. Trekk en marglinje, og skriv oppgavenummeret til venstre for den.'],
    nr: ['Oppgavenummer', 'Oppgavenummeret mangler. Læreren må vite hvilken oppgave du svarer på.'],
    smuss: ['Overskrevet', 'Overskrevet og vanskelig å lese. Stryk over med én rett strek og skriv riktig ved siden av.']
  };
  const S = (navn, kort, oppg, linjer) => ({ navn: navn, kort: kort, oppg: oppg, linjer: linjer });

  M.les.hand[8] = {
    sider: [
      S('Vanlig oppgave', 'oppg', 'Oppgave 3: Løs likningen 3x − 5 = 10.', [
        { nr: '3', t: '{{2|Likning: 3x − 5 = 10. Finn x.}}' }, '{{3|Regel: Jeg gjør det samme på begge sider.}}',
        { g: [['3x − 5', '10', 'legger til 5 på begge sider'], ['3x', '15', 'deler på 3 på begge sider'], ['x', '5', '']], n: 4, k: 5 },
        { tom: 1 }, '{{6|Sjekk: 3 · 5 − 5 = 15 − 5 = 10. Det stemmer.}}', { tom: 1 }, '{{7|==Svar: x = 5==}}']),
      S('Oppgave med begrunnelse', 'begr', 'Oppgave 5: Ola sier at −3 er større enn −7. Har han rett? Begrunn svaret.', [
        { nr: '5', t: '{{2|Ja, Ola har rett.}} −3 er større enn −7.' },
        '{{3|Begrunnelse: −3 ligger lenger til høyre enn −7 på tallinja, og tall lenger til høyre er større.}}',
        '{{4|Eksempel: Hvis jeg skylder 3 kr, skylder jeg mindre enn hvis jeg skylder 7 kr.}}', { tom: 1 }, '{{5|==Svar: −3 > −7, så Ola har rett.==}}']),
      S('Prøve med deloppgaver', 'prove', 'Oppgave 7: En t-skjorte koster 400 kr. Prisen settes ned 25 %. a) Hva er rabatten i kroner? b) Hva er den nye prisen?', [
        { nr: '7', t: '{{2|a)}} Rabatt' }, '{{3|~~400 · 25 = 10 000~~ Feil: 25 % er 0,25, ikke 25.}}',
        { g: [['25 % av 400 kr', '400 kr : 4', ''], ['', '100 kr', '']] }, '{{4|==Svar a): Rabatten er 100 kr.==}}', { tom: 1, n: 5 },
        '{{2|b)}} Ny pris', { g: [['400 kr − 100 kr', '300 kr', '']] }, '{{4|==Svar b): Den nye prisen er 300 kr.==}}'])
    ],
    feil: { oppg: 'Oppgave 3: Løs likningen 3x − 5 = 10.', marg: true, nr: true, linjer: [
      '<<kjede|3x − 5 = 10 = 3x = 15 = x = 5>>', 'jeg tok +5 og så <<smuss|%%del på 3%%>>', { tom: 1 }, '<<svar|svar: 5>>'],
      f: { kjede: ['Likhetstegn', 'Likhetstegnene stemmer ikke: 3x − 5 er ikke lik 15. Skriv ett steg per linje, med likhetstegnene under hverandre.'],
        svar: ['Svar', 'Svaret står uten «x =» og uten to streker under. Skriv «Svar: x = 5» og sett to streker under.'] } }
  };
  M.les.hand[9] = {
    sider: [
      S('Vanlig oppgave', 'oppg', 'Oppgave 4: En rettvinklet trekant har katetene 6 cm og 8 cm. Finn hypotenusen.', [
        { nr: '4', t: '{{2|Gitt: a = 6 cm og b = 8 cm. Finn: hypotenusen c.}}' }, { skisse: 'trekant' }, '{{3|Regel (Pytagoras): a² + b² = c²}}',
        { g: [['c²', '6² + 8²', 'setter inn tallene'], ['c²', '36 + 64', 'regner ut kvadratene'], ['c²', '100', 'legger sammen'], ['c', '10', 'kvadratroten av 100 er 10']], n: 4, k: 5 },
        { tom: 1 }, '{{6|Sjekk: 6² + 8² = 36 + 64 = 100 = 10². Det stemmer.}}', { tom: 1 }, '{{7|==Svar: Hypotenusen er 10 cm.==}}']),
      S('Oppgave med begrunnelse', 'begr', 'Oppgave 6: Sara sier: «Gjennomsnittet er alltid et godt mål på hva som er typisk.» Er du enig? Tallene er 2, 3, 3, 4 og 48. Begrunn svaret.', [
        { nr: '6', t: '{{2|Nei, jeg er uenig.}} Gjennomsnittet er ikke alltid et godt mål.' },
        '{{3|Begrunnelse: 48 er mye større enn de andre tallene og trekker gjennomsnittet opp.}}',
        '{{4|Eksempel: (2 + 3 + 3 + 4 + 48) : 5 = 60 : 5 = 12, men fire av fem tall er 4 eller mindre.}}', { tom: 1 }, '{{5|==Svar: Medianen, 3, passer bedre her.==}}']),
      S('Prøve med deloppgaver', 'prove', 'Oppgave 8: Et tog kjører 180 km på 2 timer. a) Hva er farten? b) Hvor langt kjører toget på 5 timer med samme fart?', [
        { nr: '8', t: '{{2|a)}} Fart' }, '{{3|~~180 · 2 = 360~~ Feil: fart finner jeg ved å dele, ikke gange.}}',
        { g: [['fart', 'strekning : tid', ''], ['', '180 km : 2 t', ''], ['', '90 km/t', '']] }, '{{4|==Svar a): Farten er 90 km/t.==}}', { tom: 1, n: 5 },
        '{{2|b)}} Strekning på 5 timer', { g: [['strekning', 'fart · tid', ''], ['', '90 km/t · 5 t', ''], ['', '450 km', '']] }, '{{4|==Svar b): Toget kjører 450 km.==}}'])
    ],
    feil: { oppg: 'Oppgave 4: En rettvinklet trekant har katetene 6 cm og 8 cm. Finn hypotenusen.', marg: true, nr: true, linjer: [
      '<<kjede|6² + 8² = 36 + 64 = 100 = 10>>', 'først tok jeg <<smuss|%%6 + 8 = 14%%>>', { tom: 1 }, '<<svar|10>>'],
      f: { kjede: ['Likhetstegn', 'Likhetstegnene stemmer ikke: 100 er ikke lik 10. Skriv kvadratroten på en ny linje.'],
        svar: ['Svar', 'Svaret står uten enhet og uten svarsetning, og uten to streker under. Skriv «Svar: Hypotenusen er 10 cm.»'] } }
  };
  M.les.hand[10] = {
    sider: [
      S('Vanlig oppgave', 'oppg', 'Oppgave 8: Løs likningssettet  I: x + y = 7  og  II: x − y = 1.', [
        { nr: '8', t: '{{2|Gitt: I: x + y = 7 og II: x − y = 1. Finn x og y.}}' }, '{{3|Metode: Jeg legger likningene sammen, så y forsvinner.}}',
        { g: [['x + y + x − y', '7 + 1', 'I + II'], ['2x', '8', 'y forsvinner'], ['x', '4', 'deler på 2']], n: 4, k: 5 },
        { g: [['4 + y', '7', 'setter x = 4 inn i I'], ['y', '3', 'trekker fra 4']], n: 4, k: 5 },
        { tom: 1 }, '{{6|Sjekk i II: 4 − 3 = 1. Det stemmer.}}', { tom: 1 }, '{{7|==Svar: x = 4 og y = 3.==}}']),
      S('Oppgave med begrunnelse', 'begr', 'Oppgave 9: Anna sier: «Å øke prisen 5 % to år på rad er det samme som å øke den 10 % én gang.» Er du enig? Begrunn svaret.', [
        { nr: '9', t: '{{2|Nei, jeg er uenig.}} Det blir ikke akkurat det samme.' },
        '{{3|Begrunnelse: Andre året regnes 5 % av et større beløp, så du får rente på renten.}}',
        '{{4|Eksempel: 100 kr · 1,05 · 1,05 = 110,25 kr, men 100 kr · 1,10 = 110 kr.}}', { tom: 1 }, '{{5|==Svar: To ganger 5 % gir 110,25 kr. 10 % gir 110 kr.==}}']),
      S('Prøve med deloppgaver', 'prove', 'Oppgave 10: Maja sparer 20 000 kr med 4 % rente per år. a) Hva er vekstfaktoren? b) Hvor mye har hun etter 3 år?', [
        { nr: '10', t: '{{2|a)}} Vekstfaktor' }, { g: [['100 % + 4 %', '104 %', ''], ['', '1,04', '']] }, '{{4|==Svar a): Vekstfaktoren er 1,04.==}}', { tom: 1, n: 5 },
        '{{2|b)}} Beløp etter 3 år', '{{3|~~20 000 · 1,04 · 3~~ Feil: 1,04³ betyr 1,04 · 1,04 · 1,04.}}',
        { g: [['20 000 kr · 1,04³', '20 000 kr · 1,124864', ''], ['', '22 497,28 kr', '']] }, '{{4|==Svar b): Etter 3 år har hun ca. 22 497 kr.==}}'])
    ],
    feil: { oppg: 'Oppgave 8: Løs likningssettet  I: x + y = 7  og  II: x − y = 1.', marg: true, nr: true, linjer: [
      '<<kjede|x + y = 7 + x − y = 1 = 2x = 8>>', '<<smuss|%%x = 4, y = 4%%>> nei, y = 3', { tom: 1 }, '<<svar|4 og 3>>'],
      f: { kjede: ['Likhetstegn', 'Likhetstegnene stemmer ikke: x + y er ikke lik 2x. Skriv ett steg per linje, og forklar hva du gjør.'],
        svar: ['Svar', 'Svaret mangler navn og svarsetning, og har ikke to streker under. Skriv «Svar: x = 4 og y = 3.»'] } }
  };
  M.les.hand.NOTER = NOTER; M.les.hand.FEIL = FEIL;
})();
