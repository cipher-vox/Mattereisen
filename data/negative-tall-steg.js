/* ============================================================
   Tema: Negative tall (8. trinn) – STEG FOR STEG
   Små steg, korte tekster, mange eksempler og mye hjelp.
   Teksten sier aldri hvem dette er laget for. Alle kan bruke det.
   ============================================================ */
(function () {
  const M = window.MATTE;
  const S = [];
  const TIPS = 'Du kan prøve så mange ganger du vil. Det er helt greit å gjøre feil – det er sånn vi lærer.';

  /* ---------- Steg 1 ---------- */
  S.push({
    tittel: 'Steg 1: Tall under null', kort: 'Under null', ikon: '1',
    blokker: [
      { t: 'guide', ikon: '🧭', tekst: 'Hei! 👋 Vi tar ett lite steg om gangen. ' + TIPS },
      { t: 'p', stor: true, tekst: 'Har du sett et termometer en kald dag? Noen ganger står det et <strong>minus</strong> foran tallet. Det betyr at det er <strong>under null</strong>.' },
      { t: 'widget', navn: 'termometer', opts: { v: -5, tittel: 'Dra i glideren' } },
      { t: 'callout', stil: 'regel', tittel: 'Husk', punkter: ['{+5} er et <strong>positivt tall</strong>. Det er mer enn 0.', '{-5} er et <strong>negativt tall</strong>. Det er mindre enn 0.', '{0} er midt imellom.'] },
      { t: 'eksempel', tittel: 'Vi gjør den første sammen', oppgave: 'Det er 4 grader under null. Hvilket tall er det?', steg: ['«Under null» betyr at tallet er negativt.', 'Da setter vi minus foran 4.', 'Svaret er {-4}. 🎉'] },
      {
        t: 'oppgaver', tittel: 'Nå du! ⭐', ikon: '✏️', oppgaver: [
          { type: 'valg', tekst: 'Det er 5 grader under null. Hvilket tall er det?', valg: ['5', '−5'], riktig: 1, fast: true, hint: 'Under null betyr minus.', losning: 'Under null er negativt. Svaret er {-5}.' },
          { type: 'valg', tekst: 'Hvilket tall er et negativt tall?', valg: ['7', '−3', '12'], riktig: 1, hint: 'Negative tall har minus foran.', losning: '{-3} har minus foran. Det er et negativt tall.' },
          { type: 'valg', tekst: 'Hvilken temperatur er kaldest?', valg: ['2 grader', '−1 grad', '−6 grader'], riktig: 2, hint: 'Jo lenger under null, jo kaldere.', losning: '{-6} ligger lengst under null. Da er det kaldest.' },
          { type: 'valg', tekst: 'En dykker er 8 meter under havflaten. Hvilket tall viser det?', valg: ['8', '−8'], riktig: 1, fast: true, hint: 'Under havflaten er negativt.', losning: 'Havflaten er 0. Under havflaten er negativt. Svaret er {-8}.' }
        ]
      }
    ]
  });

  /* ---------- Steg 2 ---------- */
  S.push({
    tittel: 'Steg 2: Tallinja', kort: 'Tallinja', ikon: '2',
    blokker: [
      { t: 'guide', ikon: '🧭', tekst: 'Nå skal vi se hvor tallene bor. Tallinja er som en vei med tall på.' },
      { t: 'p', stor: true, tekst: 'På tallinja ligger {0} i midten. På <strong>høyre</strong> side ligger de positive tallene. På <strong>venstre</strong> side ligger de negative tallene.' },
      { t: 'widget', navn: 'tallinje-vis', opts: { punkter: [{ v: -5, label: '−5' }, { v: 3, label: '3' }], alt: 'Tallinje med minus 5 og 3' } },
      { t: 'callout', stil: 'regel', tittel: 'Størst og minst', punkter: ['Jo lenger <strong>til høyre</strong>, jo <strong>større</strong>.', 'Jo lenger <strong>til venstre</strong>, jo <strong>mindre</strong>.'] },
      { t: 'callout', stil: 'tips', tittel: 'Tenk på temperatur', tekst: '−8 grader er kaldere enn −2 grader. Derfor er {-8} <strong>mindre</strong> enn {-2}.' },
      { t: 'eksempel', tittel: 'Vi gjør den første sammen', oppgave: 'Hvilket tall er størst: {-7} eller {-2}?', steg: ['Tenk deg begge tallene på tallinja.', '{-2} ligger lengst til høyre.', 'Det som ligger lengst til høyre, er størst. Svar: {-2}. 🎉'] },
      {
        t: 'oppgaver', tittel: 'Nå du! ⭐', ikon: '✏️', oppgaver: [
          { tekst: 'Hvilket tall viser markeringen?', svar: -3, visual: { widget: 'tallinje-vis', opts: { punkter: [{ v: -3, label: '?' }] } }, hint: 'Tell skritt til venstre fra 0.', losning: 'Markeringen er 3 skritt til venstre for 0. Svaret er {-3}.' },
          { tekst: 'Hvilket tall viser markeringen?', svar: 4, visual: { widget: 'tallinje-vis', opts: { punkter: [{ v: 4, label: '?' }] } }, hint: 'Tell skritt til høyre fra 0.', losning: 'Markeringen er 4 skritt til høyre for 0. Svaret er {4}.' },
          { type: 'valg', tekst: 'Hvilket tall er størst?', valg: ['−6', '−1'], riktig: 1, fast: true, hint: 'Hvilket ligger lengst til høyre?', losning: '{-1} ligger lengst til høyre. Det er størst.' },
          { type: 'valg', tekst: 'Hvilket tall er minst?', valg: ['−2', '−9', '1'], riktig: 1, hint: 'Hvilket ligger lengst til venstre?', losning: '{-9} ligger lengst til venstre. Det er minst.' },
          { type: 'valg', tekst: 'Hvilket tegn passer? &nbsp; {-4} ? {1}', valg: ['&lt; (mindre enn)', '&gt; (større enn)'], riktig: 0, fast: true, hint: 'Hvilket tall ligger lengst til venstre?', losning: '{-4} ligger til venstre for {1}. Da er {-4} mindre: {-4} &lt; {1}.' }
        ]
      }
    ]
  });

  /* ---------- Steg 3 ---------- */
  S.push({
    tittel: 'Steg 3: Pluss', kort: 'Pluss', ikon: '3',
    blokker: [
      { t: 'guide', ikon: '🧭', tekst: 'Pluss er som å gå fremover. På tallinja går vi mot <strong>høyre</strong>.' },
      { t: 'p', stor: true, tekst: 'Når du <strong>legger til</strong> et tall, hopper du <strong>til høyre</strong>. Trykk på «Hopp!» og se.' },
      { t: 'widget', navn: 'tallinje', opts: { a: -4, op: '+', b: 3, tittel: 'Pluss på tallinja' } },
      { t: 'eksempel', tittel: 'Vi gjør den første sammen', regn: '-4+3', steg: ['Start i {-4} på tallinja.', 'Pluss {3} betyr: hopp 3 skritt til høyre.', 'Du går −3, −2, −1.', 'Du lander på {-1}. 🎉'] },
      {
        t: 'oppgaver', tittel: 'Nå du! ⭐', ikon: '✏️', oppgaver: [
          { regn: '-5+2', visual: { widget: 'tallinje-vis', opts: { punkter: [{ v: -5, label: 'start', cls: 'grå' }], buer: [{ from: -5, to: -3, label: '+2' }] } }, hint: 'Start i −5. Hopp 2 skritt til høyre.', losning: 'Start i {-5}. Hopp 2 til høyre: −4, −3. Svaret er {-3}.' },
          { regn: '-2+6', hint: 'Start i −2. Hopp 6 skritt til høyre. Du kommer forbi 0.', losning: 'Fra {-2}: −1, 0, 1, 2, 3, 4. Svaret er {4}.' },
          { regn: '-3+3', hint: 'Hvor mange skritt må du hoppe for å komme til 0?', losning: 'Fra {-3} hopper du 3 skritt og lander på {0}.' },
          { regn: '-6+4', hint: 'Hopp 4 skritt til høyre fra −6.', losning: 'Fra {-6}: −5, −4, −3, −2. Svaret er {-2}.' }
        ]
      }
    ]
  });

  /* ---------- Steg 4 ---------- */
  S.push({
    tittel: 'Steg 4: Minus', kort: 'Minus', ikon: '4',
    blokker: [
      { t: 'guide', ikon: '🧭', tekst: 'Minus er å gå bakover. På tallinja går vi mot <strong>venstre</strong>.' },
      { t: 'p', stor: true, tekst: 'Når du <strong>trekker fra</strong> et tall, hopper du <strong>til venstre</strong>.' },
      { t: 'widget', navn: 'tallinje', opts: { a: 2, op: '-', b: 5, tittel: 'Minus på tallinja' } },
      { t: 'callout', stil: 'mestring', tittel: 'Visste du?', tekst: 'Du kan godt komme under 0 når du trekker fra. Da får du et negativt tall. Det er helt vanlig!' },
      { t: 'eksempel', tittel: 'Vi gjør den første sammen', regn: '2-5', steg: ['Start i {2}.', 'Minus {5} betyr: hopp 5 skritt til venstre.', 'Du går 1, 0, −1, −2, −3.', 'Du lander på {-3}. 🎉'] },
      {
        t: 'oppgaver', tittel: 'Nå du! ⭐', ikon: '✏️', oppgaver: [
          { regn: '3-5', hint: 'Start i 3. Hopp 5 skritt til venstre.', losning: 'Fra {3}: 2, 1, 0, −1, −2. Svaret er {-2}.' },
          { regn: '-1-2', hint: 'Start i −1. Hopp 2 skritt til venstre.', losning: 'Fra {-1}: −2, −3. Svaret er {-3}.' },
          { regn: '1-4', hint: 'Start i 1. Hopp 4 skritt til venstre.', losning: 'Fra {1}: 0, −1, −2, −3. Svaret er {-3}.' },
          { regn: '-2-3', hint: 'Hopp 3 skritt til venstre fra −2.', losning: 'Fra {-2}: −3, −4, −5. Svaret er {-5}.' },
          { tekst: 'Temperaturen er 1 grad. Den synker 4 grader. Hva er temperaturen nå?', svar: -3, enhet: 'grader', hint: 'Regn 1 − 4.', losning: 'Regnestykket er 1 − 4 = {-3}. Temperaturen er {-3} grader.' }
        ]
      }
    ]
  });

  /* ---------- Steg 5 ---------- */
  S.push({
    tittel: 'Steg 5: Pluss et minus-tall', kort: 'Pluss minus-tall', ikon: '5',
    blokker: [
      { t: 'guide', ikon: '🧭', tekst: 'Nå kommer et lite triks. Hva om tallet vi legger til er <strong>negativt</strong>?' },
      { t: 'p', stor: true, tekst: 'Pluss et <strong>negativt</strong> tall betyr at du hopper <strong>til venstre</strong>. Det er det samme som å trekke fra.' },
      { t: 'callout', stil: 'regel', tittel: 'Lik regning', tekst: '{5} + ({-2}) er det samme som {5} − {2}. Begge gir {3}.' },
      { t: 'widget', navn: 'tallinje', opts: { a: 5, op: '+', b: -2, tittel: 'Pluss et negativt tall' } },
      { t: 'p', tekst: 'Du kan også se det med <strong>brikker</strong>. Trykk «Neste» for å se hvert steg.' },
      { t: 'widget', navn: 'brikker', opts: { a: 4, op: '+', b: -3, tittel: 'Se det med brikker' } },
      { t: 'eksempel', tittel: 'Vi gjør den første sammen', regn: '5+(-2)', steg: ['Start i {5}.', 'Vi legger til {-2}. Det er negativt, så vi hopper til venstre.', 'Hopp 2 skritt til venstre: 4, 3.', 'Svar: {3}. 🎉'] },
      {
        t: 'oppgaver', tittel: 'Nå du! ⭐', ikon: '✏️', oppgaver: [
          { regn: '4+(-1)', hint: 'Pluss et negativt tall: hopp mot venstre.', losning: 'Fra {4} hopper du 1 skritt til venstre. Svaret er {3}.' },
          { regn: '3+(-5)', hint: 'Hopp 5 skritt til venstre fra 3.', losning: 'Fra {3}: 2, 1, 0, −1, −2. Svaret er {-2}.' },
          { regn: '-2+(-3)', hint: 'Start i −2 og hopp 3 skritt til venstre.', losning: 'Fra {-2}: −3, −4, −5. Svaret er {-5}.' },
          { regn: '6+(-6)', hint: 'Hvor langt må du hoppe for å komme til 0?', losning: 'Fra {6} hopper du 6 skritt til venstre og lander på {0}.' },
          { regn: '-1+(-1)', hint: 'Hopp 1 skritt til venstre fra −1.', losning: 'Fra {-1} hopper du 1 skritt til venstre. Svaret er {-2}.' }
        ]
      }
    ]
  });

  /* ---------- Steg 6 ---------- */
  S.push({
    tittel: 'Steg 6: Minus et minus-tall', kort: 'Minus minus', ikon: '6',
    blokker: [
      { t: 'guide', ikon: '🧭', tekst: 'Dette er det som mange synes er vanskeligst. Men du skal få se at det går fint, steg for steg! 💪' },
      { t: 'p', stor: true, tekst: 'Når du trekker fra et <strong>negativt</strong> tall, blir <strong>minus og minus til pluss</strong>. Da hopper du <strong>til høyre</strong>.' },
      { t: 'callout', stil: 'tips', tittel: 'Tenk slik', tekst: 'Hvis noen tar bort gjelden din, blir du rikere. Å ta bort noe negativt gjør at du får mer.' },
      { t: 'widget', navn: 'tallinje', opts: { a: 3, op: '-', b: -2, tittel: 'Minus et negativt tall' } },
      { t: 'p', tekst: 'Med brikker: Vi tar bort negative brikker. Hvis vi ikke har noen, lager vi først <strong>nullpar</strong>.' },
      { t: 'widget', navn: 'brikker', opts: { a: 2, op: '-', b: -1, tittel: 'Minus med brikker' } },
      { t: 'eksempel', tittel: 'Vi gjør den første sammen', regn: '3-(-2)', steg: ['Start i {3}.', 'Minus {-2}: minus og minus blir pluss. Vi regner {3} + {2}.', 'Hopp 2 skritt til høyre: 4, 5.', 'Svar: {5}. 🎉'] },
      {
        t: 'oppgaver', tittel: 'Nå du! ⭐', ikon: '✏️', oppgaver: [
          { regn: '2-(-1)', hint: 'Minus minus blir pluss: regn 2 + 1.', losning: '{2} − ({-1}) = {2} + {1} = {3}.' },
          { regn: '4-(-3)', hint: 'Regn 4 + 3.', losning: '{4} − ({-3}) = {4} + {3} = {7}.' },
          { regn: '-1-(-4)', hint: 'Regn −1 + 4.', losning: '{-1} − ({-4}) = {-1} + {4} = {3}.' },
          { regn: '-3-(-3)', hint: 'Regn −3 + 3.', losning: '{-3} − ({-3}) = {-3} + {3} = {0}.' },
          { type: 'valg', tekst: 'Hva er det samme som 5 − ({-2})?', valg: ['5 − 2', '5 + 2'], riktig: 1, fast: true, hint: 'Minus minus blir pluss.', losning: 'Minus og minus blir pluss. 5 − ({-2}) er det samme som 5 + 2.' }
        ]
      }
    ]
  });

  /* ---------- Steg 7 ---------- */
  S.push({
    tittel: 'Steg 7: Gange', kort: 'Gange', ikon: '7',
    blokker: [
      { t: 'guide', ikon: '🧭', tekst: 'Gange har en enkel regel. Du får se den med farger!' },
      { t: 'p', stor: true, tekst: 'Gange betyr å legge til flere ganger. 3 · ({-2}) er det samme som ({-2}) + ({-2}) + ({-2}) = {-6}.' },
      { t: 'callout', stil: 'regel', tittel: 'Fortegnsregelen', punkter: ['<strong>Like</strong> fortegn gir <strong>pluss</strong> (+).', '<strong>Ulike</strong> fortegn gir <strong>minus</strong> (−).'] },
      { t: 'widget', navn: 'fortegn', opts: { op: '*', tittel: 'Fortegnsmaskinen' } },
      { t: 'p', tekst: 'Vil du se <strong>hvorfor</strong> det er sånn? Se på mønsteret.' },
      { t: 'widget', navn: 'monster', opts: { b: -2 } },
      { t: 'eksempel', tittel: 'Vi gjør den første sammen', regn: '(-3)*4', steg: ['Fortegnene er ulike (− og +). Svaret blir <strong>negativt</strong>.', 'Regn uten fortegn: 3 · 4 = 12.', 'Svar: {-12}. 🎉'] },
      { t: 'eksempel', tittel: 'Ett til', regn: '(-2)*(-5)', steg: ['Fortegnene er like (− og −). Svaret blir <strong>positivt</strong>.', 'Regn uten fortegn: 2 · 5 = 10.', 'Svar: {10}.'] },
      {
        t: 'oppgaver', tittel: 'Nå du! ⭐', ikon: '✏️', oppgaver: [
          { regn: '2*(-3)', hint: 'Ulike fortegn gir minus.', losning: 'Ulike fortegn. 2 · 3 = 6, så svaret er {-6}.' },
          { regn: '(-4)*2', hint: 'Ulike fortegn gir minus.', losning: 'Ulike fortegn. 4 · 2 = 8, så svaret er {-8}.' },
          { regn: '(-2)*(-2)', hint: 'Like fortegn gir pluss.', losning: 'Like fortegn. 2 · 2 = 4, så svaret er {4}.' },
          { regn: '(-3)*(-5)', hint: 'Like fortegn gir pluss.', losning: 'Like fortegn. 3 · 5 = 15, så svaret er {15}.' },
          { regn: '5*(-2)', hint: 'Ulike fortegn gir minus.', losning: 'Ulike fortegn. 5 · 2 = 10, så svaret er {-10}.' },
          { type: 'valg', tekst: 'Er svaret på ({-6}) · ({-2}) positivt eller negativt?', valg: ['Positivt', 'Negativt'], riktig: 0, fast: true, hint: 'Er fortegnene like eller ulike?', losning: 'Fortegnene er like, så svaret er positivt: {12}.' }
        ]
      }
    ]
  });

  /* ---------- Steg 8 ---------- */
  S.push({
    tittel: 'Steg 8: Dele og mestringsrunde', kort: 'Dele', ikon: '8',
    blokker: [
      { t: 'guide', ikon: '🧭', tekst: 'Siste steg! 🎉 Dele følger <strong>de samme fortegnsreglene</strong> som gange.' },
      { t: 'widget', navn: 'fortegn', opts: { op: '/', tittel: 'Fortegnsmaskinen: dele' } },
      { t: 'callout', stil: 'tips', tittel: 'Sjekk med gange', tekst: 'Du kan alltid sjekke svaret med gange. ({-12}) : 3 = {-4}, fordi ({-4}) · 3 = {-12}.' },
      { t: 'eksempel', tittel: 'Vi gjør den første sammen', regn: '(-12)/3', steg: ['Fortegnene er ulike, så svaret blir negativt.', 'Regn uten fortegn: 12 : 3 = 4.', 'Svar: {-4}. Sjekk: ({-4}) · 3 = {-12}. 🎉'] },
      {
        t: 'oppgaver', tittel: 'Nå du! ⭐', ikon: '✏️', oppgaver: [
          { regn: '(-8)/2', hint: 'Ulike fortegn gir minus.', losning: 'Ulike fortegn. 8 : 2 = 4, så svaret er {-4}.' },
          { regn: '10/(-5)', hint: 'Ulike fortegn gir minus.', losning: 'Ulike fortegn. 10 : 5 = 2, så svaret er {-2}.' },
          { regn: '(-6)/(-3)', hint: 'Like fortegn gir pluss.', losning: 'Like fortegn. 6 : 3 = 2, så svaret er {2}.' },
          { regn: '(-15)/3', hint: 'Ulike fortegn gir minus.', losning: 'Ulike fortegn. 15 : 3 = 5, så svaret er {-5}.' },
          { regn: '(-20)/(-4)', hint: 'Like fortegn gir pluss.', losning: 'Like fortegn. 20 : 4 = 5, så svaret er {5}.' }
        ]
      },
      {
        t: 'oppgaver', tittel: 'Mestringsrunde 🏆', ikon: '🏆', intro: 'Nå får du bruke alt du har lært. Ta det i ditt eget tempo.', oppgaver: [
          { regn: '-3+5', hint: 'Pluss: hopp til høyre.' },
          { regn: '2-6', hint: 'Minus: hopp til venstre.' },
          { regn: '4-(-2)', hint: 'Minus minus blir pluss.' },
          { regn: '(-3)*(-3)', hint: 'Like fortegn gir pluss.' },
          { regn: '(-18)/(-6)', hint: 'Like fortegn gir pluss.' },
          { tekst: 'Temperaturen er {-2} grader. Den stiger 5 grader. Hva er temperaturen nå?', svar: 3, enhet: 'grader', hint: 'Regn −2 + 5.', losning: 'Regnestykket er {-2} + {5} = {3}. Temperaturen er {3} grader.' }
        ]
      },
      { t: 'callout', stil: 'mestring', tittel: 'Du har kommet helt hit! 🌟', tekst: 'Nå kan du regne med negative tall: pluss, minus, gange og dele. Mange synes dette er vanskelig i begynnelsen, og du har tatt det steg for steg. Det er sånn alle lærer matte.' },
      { t: 'html', html: '<p class="lenke-rad"><a class="knapp primær" href="#/steg/ekstra/8/negative-tall">📚 Vil du øve mer?</a></p>' }
    ]
  });

  M.register('steg', '8/negative-tall', {
    tittel: 'Negative tall',
    ingress: 'Vi tar det steg for steg. Du bestemmer tempoet.',
    mal: [
      'Du skal forstå hva negative tall er.',
      'Du skal finne tall på tallinja.',
      'Du skal regne pluss og minus med negative tall.',
      'Du skal gange og dele med negative tall.'
    ],
    ordliste: M.negOrd,
    seksjoner: S
  });
})();
