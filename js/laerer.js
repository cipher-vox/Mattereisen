/* ============================================================
   Lærerveiledning (#/laerer). Ren lesing: ingenting lagres.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE, H = M.href;
  const CUR = M.curriculum;

  const KOMIGANG = [
    ['🔭 Utforsk og 🪜 Steg for steg', 'Utforsk er standard. Steg for steg har mindre tekst per skjerm, flere hint og skjuler fasit til eleven har prøvd. Elevene kan bytte når som helst med knappen øverst. Dere trenger ikke dele elevene i grupper: valget er enkelt og synlig for alle.'],
    ['🎚️ Tre nivåer (egen visning)', 'Ved siden av Utforsk og Steg for steg finnes «Tre nivåer» øverst på alle temasider. Der velger eleven 🌱 Rolig, 🌿 Vanlig eller 🚀 Utfordring, og siden bygges opp på nytt: Rolig har én regel om gangen i store fargekort, enklere tall, korte setninger, eksempel steg for steg og hjelp i hver oppgave. Vanlig har alle reglene, flere eksempler og oppgaver. Utfordring har reglene i kortform og oppgaver med flere steg. Alle tre har «flere oppgaver» som lages på nytt hver gang. Siden sier ikke noe om hvem nivået er for.'],
    ['📒 Regelbok og 🧪 Kapittelprøve', 'Under Ark finnes Regelbok (1–2 sider med regler, eksempler, «pass opp» og ord for hvert tema, til regelboka) og Kapittelprøve for hvert tema. Begge kan skrives ut eller lastes ned som Word. Kapittelprøven finnes i to utganger: ordinær (med vurderingsforslag og fasit) og tilrettelagt (færre og kortere oppgaver, hjelpebokser, mer plass, uten karakter). Du velger hvilke deler som skal være med (del 1, 2 og 3), antall oppgaver og hvor mye plass elevene får til regning. Før utskrift kan du redigere prøven rett på siden: bytte ut, skrive om (endre tall og tekst), fjerne eller legge til oppgaver, også dine egne. Kort test og Kapittelprøve er låst med kode (43210), slik at elevene ikke kan se hvilken prøve de får. Koden gjelder til siden lastes på nytt, og «Lås igjen» låser med en gang. Ved siden av prøven lages fasit og løsningsforslag automatisk, og de følger med når du redigerer (forhåndsvis, skriv ut eller last ned som Word). Enkle «Regn ut»-oppgaver og lineære likninger løses trinn for trinn av siden selv; for andre oppgaver du skriver om eller legger til, brukes fasiten du fyller inn, og ellers står det «Fasit mangler». Prøvene er automatisk laget fra oppgavebanken: les gjennom og juster før bruk.'],
    ['🌱 Rolig · 🌿 Vanlig · 🚀 Utfordring', 'Alle tre nivåene har samme status. Rolig har mindre tall, ett steg om gangen og mer hjelp. Vanlig er standard. Utfordring har større tall og flere steg. Elevene velger selv, og kan bytte midt i en økt. Valget lagres ikke, så ingen blir merket.'],
    ['🧰 Hjelp-knappen', 'På tema- og øvingssidene finnes en flytende Hjelp-knapp med «Slik tenker du» (seks steg), husk-liste og vanlige feil for temaet, gangetabell og tallinje. Den er til alle.'],
    ['💡 Hint i flere steg', 'I Rolig og Steg for steg gir «Hjelp meg i gang» ett steg om gangen. Eleven får akkurat så mye hjelp som trengs.'],
    ['🔒 Fasit', 'Fasit er låst til eleven har prøvd alle oppgavene i en del. Lærer kan skrive ut med fasit fra arksiden.'],
    ['🎮 Spill', 'Spillene er laget som oppvarming, repetisjon eller utforsking. Poeng og liv lever bare mens spillet er åpent. Spillene følger nivået (Rolig: flervalg og hint, Vanlig og Utfordring: skrevne svar og forutsigelser).'],
    ['🗂️ Utskriftsark', 'Arksiden lager oppgaveark i tre nivåer, husk-ark, tester, «Hva kan jeg?», utgangsbilletter, spillark og maler. Alt kan skrives ut eller lastes ned som egen fil.'],
    ['🔎 Les, tolk og begrunn', 'Egen del (toppmenyen) med seks moduler: Les teksten, Les grafen, Før pent og rett, Hva spørs det om?, Begrunn svaret og Diskuter og argumenter, i tre nivåer for 8., 9. og 10. trinn. I tillegg Jeopardy der laget finner riktig spørsmål til en tekst eller graf, og utskriftsark med fasit under Ark. Se «Les, tolk og begrunn» lenger ned for vurderingskriterier og samtalestartere.'],
    ['📖 Lesehjelp', 'Lesehjelpen leser opp tekst, og ordlista forklarer fagord. Den er tilgjengelig for alle fra toppmenyen.'],
    ['🔒 Personvern', 'Siden samler ikke inn navn, resultater eller noe annet. Alt som skjer i nettleseren forsvinner når siden lukkes. Ark har felt for navn og dato som elevene fyller ut for hånd.']
  ];

  const RUTINER = [
    ['Tenk – par – del', 'Elevene tenker alene i 1 minutt, forteller sidemannen, og deler så med klassen. Brukes til åpningsspørsmålene i hvert tema.'],
    ['Mini-tavle', 'Alle viser svaret samtidig på liten tavle eller papir. Du ser raskt hvem som trenger mer støtte, uten at noen blir pekt ut.'],
    ['Utgangsbillett', 'Ett spørsmål på slutten av timen. Les gjennom for å planlegge neste time. Se arksiden for ferdige billetter.'],
    ['Stasjonsløype', 'Fire til seks stasjoner med oppgaver på ulike nivåer. Elevene roterer. Arksiden lager ferdige stasjonskort.'],
    ['Tenk høyt-mal', 'Gitt – Finn – Regn – Svar – Sjekk. Hjelper elever med å strukturere løsningen og gir deg bedre innsyn i tankegangen.'],
    ['Finn feilen', 'Vis en løsning med en feil. Elevene finner og forklarer den. Svært effektivt mot vanlige misoppfatninger.'],
    ['Matematikksamtale', 'Bruk samtalespørsmålene under hvert tema. Be elevene begrunne og høre på hverandres strategier.']
  ];

  const VURD = [
    'Vurder hva eleven viser av forståelse, ikke bare riktige svar: forklaringer, tegninger, valg av metode og sjekk av svar.',
    'Gi tilbakemelding underveis: «Dette får du til», «Prøv dette neste».',
    'Bruk utgangsbilletter og «Hva kan jeg?» til å følge med uten å teste.',
    'Elever på ulike nivåer vurderes mot de samme kompetansemålene. Nivå er en vei til målet, ikke en vurdering.',
    'Siden lagrer ingenting, så alle vurderinger må dokumenteres på dine egne måter.'
  ];

  function maalFor(tr, tema) {
    return (tema.dekker || []).map(n => tr.kompetansemal[n - 1]).filter(Boolean);
  }
  function li(a) { return a.map(x => '<li class="lesbar">' + M.markup(x) + '</li>').join(''); }

  function temaHTML(mode, tr, tema) {
    const key = tr.trinn + '/' + tema.id, L = M.laerer[key] || {};
    const spill = (M.gamesFor ? M.gamesFor(key) : []);
    const mal = maalFor(tr, tema);
    let h = '<details class="lv-tema" id="lv-' + tr.trinn + '-' + tema.id + '"><summary><span aria-hidden="true">' + tema.ikon + '</span> <strong>' + tema.tittel + '</strong>' + (L.tid ? ' <span class="merke">' + L.tid + '</span>' : '') + '</summary><div class="lv-inn">';
    h += '<p class="lesbar">' + tema.kort + '</p>';
    if (mal.length) h += '<h4>Kompetansemål</h4><ul class="liste">' + li(mal) + '</ul>';
    if (L.forkunn) h += '<h4>Forkunnskaper</h4><ul class="liste">' + li(L.forkunn) + '</ul>';
    if (L.start || L.midt || L.slutt) h += '<h4>Forslag til opplegg</h4><ol class="liste"><li class="lesbar"><strong>Start:</strong> ' + M.markup(L.start || '') + '</li><li class="lesbar"><strong>Hoveddel:</strong> ' + M.markup(L.midt || '') + '</li><li class="lesbar"><strong>Avslutning:</strong> ' + M.markup(L.slutt || '') + '</li></ol>';
    if (L.samtale) h += '<h4>Samtalespørsmål</h4><ul class="liste">' + li(L.samtale) + '</ul>';
    if (L.husk) h += '<h4>Viktig å huske</h4><ul class="liste">' + li(L.husk) + '</ul>';
    if (L.feil) h += '<h4>Vanlige misoppfatninger</h4><ul class="liste">' + li(L.feil) + '</ul>';
    if (L.diff) h += '<h4>Differensiering</h4><ul class="liste"><li class="lesbar"><strong>🌱 Rolig:</strong> ' + M.markup(L.diff.rolig) + '</li><li class="lesbar"><strong>🌿 Vanlig:</strong> ' + M.markup(L.diff.vanlig) + '</li><li class="lesbar"><strong>🚀 Utfordring:</strong> ' + M.markup(L.diff.utfordring) + '</li></ul>';
    if (L.vurdering) h += '<h4>Vurdering</h4><p class="lesbar">' + M.markup(L.vurdering) + '</p>';
    h += '<p class="lenke-rad"><a class="knapp liten" href="' + H(mode, tr.trinn, tema.id) + '">📖 Åpne temaet</a> ' +
      (M.ekstra[key] ? '<a class="knapp liten" href="' + H(mode, 'ekstra', tr.trinn, tema.id) + '">📚 Øv mer</a> ' : '') +
      spill.map(g => '<a class="knapp liten" href="' + H(mode, 'spill', g.id) + '">' + g.ikon + ' ' + g.tittel + '</a> ').join('') +
      '<a class="knapp liten primær" href="' + H(mode, 'ark', tr.trinn, tema.id) + '">🗂️ Lag ark</a></p>';
    return h + '</div></details>';
  }

  function arsplan(tr) {
    const rader = tr.temaer.map((t, i) => {
      const L = M.laerer[tr.trinn + '/' + t.id] || {};
      return '<tr><td class="første">' + (i + 1) + '</td><td><a href="#lv-' + tr.trinn + '-' + t.id + '">' + t.ikon + ' ' + t.tittel + '</a></td><td>' + (L.tid || '') + '</td><td>' + ((t.dekker || []).join(', ') || '–') + '</td></tr>';
    }).join('');
    return '<div class="tabell-wrap"><table class="tabell"><thead><tr><th>#</th><th>Tema</th><th>Forslag til tid</th><th>Kompetansemål nr.</th></tr></thead><tbody>' + rader + '</tbody></table></div>';
  }

  function laerer(mode) {
    let h = '<nav class="brødsmule"><a href="' + H(mode) + '">Forsiden</a> › <span>For lærere</span></nav>' +
      '<header class="side-hode t10"><h1>👩‍🏫 For lærere</h1><p class="lesbar">Her finner du en kort veiledning til hele siden, forslag til årsplan og et opplegg for hvert av de 32 temaene: mål, forkunnskaper, start, hoveddel, avslutning, samtalespørsmål, vanlige misoppfatninger, differensiering og vurdering. Alt er forslag du kan bruke slik du vil.</p>' +
      '<p><a class="knapp primær" href="' + H(mode, 'ark') + '">🗂️ Gå til utskriftsarkene</a></p></header>';
    let toc = '<aside class="lv-side"><nav class="lv-toc2" aria-label="Innhold"><strong class="lv-toc-tittel">Innhold</strong><ol class="lv-toc-liste">' +
      '<li><a href="#lv-komigang">🚀 Kom i gang</a></li><li><a href="#lv-nivaa">🌱 Tre nivåer</a></li><li><a href="#lv-rutiner">🧩 Arbeidsmåter</a></li><li><a href="#lv-les">🔎 Les, tolk og begrunn</a></li>';
    CUR.forEach(function (tr) {
      toc += '<li class="lv-toc-gruppe"><a href="#lv-' + tr.trinn + '">🧭 ' + tr.tittel + '</a><ol class="lv-toc-tema">' + tr.temaer.map(t => '<li><a href="#lv-' + tr.trinn + '-' + t.id + '" data-apne="1">' + t.ikon + ' ' + t.tittel + '</a></li>').join('') + '</ol></li>';
    });
    toc += '<li><a href="#lv-vurd">📝 Vurdering</a></li></ol></nav></aside>';
    h += '<div class="lv-layout">' + toc + '<div class="lv-main">';
    h += '<section class="seksjon farge-1" id="lv-komigang"><header class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">🚀</span><h2>Kom i gang</h2></header><div class="kort-rad">' +
      KOMIGANG.map(k => '<div class="mini-kort"><strong class="lesbar">' + k[0] + '</strong><div class="lesbar">' + k[1] + '</div></div>').join('') + '</div></section>';
    h += '<section class="seksjon farge-2" id="lv-nivaa"><header class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">🌱</span><h2>Tre nivåer i praksis</h2></header>' +
      '<p class="lesbar">Navnene beskriver tempo og utstrekning, ikke evne. Alle nivåer har samme mål og samme verdi.</p>' +
      '<div class="tabell-wrap"><table class="tabell"><thead><tr><th>Nivå</th><th>Hva er annerledes</th><th>Passer når</th></tr></thead><tbody>' +
      '<tr><td class="første">🌱 Rolig</td><td>Små tall, ett steg om gangen, hint i flere steg, eget oppgavesett med eksempel først.</td><td>Eleven trenger tid, vil bygge trygghet eller ser temaet for første gang.</td></tr>' +
      '<tr><td class="første">🌿 Vanlig</td><td>Passe mengde og vanskelighetsgrad.</td><td>Standard for de fleste.</td></tr>' +
      '<tr><td class="første">🚀 Utfordring</td><td>Større tall, flere steg og tolkning.</td><td>Eleven vil strekke seg eller er ferdig tidlig.</td></tr></tbody></table></div>' +
      '<aside class="callout tips"><div class="callout-ikon" aria-hidden="true">💡</div><div class="callout-tekst"><strong class="lesbar callout-tittel">Slik unngår du at noen blir pekt ut</strong><div class="lesbar">Bruk de samme navnene for alle. La elevene velge nivå selv og bytte underveis. Del ut arkene i en blandet bunke, eller legg alle tre nivåene på et bord. Ikke referer til nivå høyt i klassen.</div></div></aside></section>';
    h += '<section class="seksjon farge-3" id="lv-rutiner"><header class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">🧩</span><h2>Arbeidsmåter</h2></header><div class="kort-rad">' +
      RUTINER.map(k => '<div class="mini-kort"><strong class="lesbar">' + k[0] + '</strong><div class="lesbar">' + k[1] + '</div></div>').join('') + '</div></section>';

    h += '<section class="seksjon farge-2" id="lv-les"><header class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">🔎</span><h2>Les, tolk og begrunn</h2></header>' +
      '<p class="lesbar">Dette er en øvingsdel for det mange elever sliter med på prøver: å forstå hva det spørres om, finne riktig informasjon, føre oppgaven ryddig og forklare hvorfor. Fritekstsvar rettes ikke av siden. Der får eleven en modellsvar-sjekkliste å sammenligne med, og du eller en medelev vurderer.</p>' +
      '<p><a class="knapp primær" href="' + H(mode, 'les') + '">🔎 Åpne Les, tolk og begrunn</a> <a class="knapp liten" href="' + H(mode, 'spill', 'jeopardy-8') + '">🎯 Jeopardy 8</a> <a class="knapp liten" href="' + H(mode, 'spill', 'jeopardy-9') + '">🎯 Jeopardy 9</a> <a class="knapp liten" href="' + H(mode, 'spill', 'jeopardy-10') + '">🎯 Jeopardy 10</a> <a class="knapp liten" href="' + H(mode, 'ark') + '">🗂️ Ark: Før pent og rett, Les og tolk, Sparringskort</a></p>' +
      '<h3>Slik kan det brukes</h3><ul class="liste">' + li([
        '**Begrunn svaret** er bygd opp i faste steg: ordbank i tre vanskelighetsgrader, et vist eksempel, setningsbygging av brikker (trykk og plasser, eller dra) og først til slutt fritekst. Flere brikker kan være riktige i hver rute, så elevene får øve på ulike formuleringer. Siden sjekker at setningen er bygd riktig, men kan ikke vurdere en fritt skrevet begrunnelse.',
        '**Les teksten** starter med et steg-for-steg-eksempel på hvordan man markerer spørsmål, tall og unødvendig info, før elevene markerer selv.',
        '**Før pent og rett** har tre håndskrevne eksempelsider per trinn på ruteark (vanlig oppgave, begrunnelse og prøve med deloppgaver). Forklaringene lyser opp den delen av siden de gjelder. Elevene kan også finne fem føringsfeil på en slurvete side. Sidene er ment som mal for hvordan du vil at oppgaver føres i boka og på prøver. Tilpass gjerne kravene dine, for eksempel om svarsetning eller sjekk.',
        '**Før pent og rett** er malen for føring. Skriv ut ark med mal og bruk samme mal i boka og på prøver, slik at elevene kjenner igjen strukturen.',
        '**Les og tolk** (arkene): elevene ringer rundt tall og enheter, understreker spørsmålet og krysser ut det som ikke trengs, før de svarer.',
        '**Jeopardy**: laget får en tekst eller graf og skal finne riktig spørsmål. Velg «Læreren dømmer» hvis dere vil høre begrunnelsene i klassen.',
        '**Sparringskort**: tre roller (forsvarer, utfordrer, observatør). Bytt rolle etter hver påstand.'
      ]) + '</ul>' +
      '<h3>Vurderingskriterier for begrunnelse (forslag)</h3><div class="tabell-wrap"><table class="tabell"><thead><tr><th>Svaret viser …</th><th>Eksempel på tegn</th></tr></thead><tbody>' +
      '<tr><td class="første">Påstand</td><td>Svaret sier tydelig hva eleven mener eller har funnet. Ikke bare et tall.</td></tr>' +
      '<tr><td class="første">Begrunnelse</td><td>Svaret har et «fordi» som bruker en regel, et begrep eller en sammenheng. «Fordi det er riktig» teller ikke.</td></tr>' +
      '<tr><td class="første">Eksempel eller utregning</td><td>Eleven viser med tall, tegning eller en graf at påstanden holder.</td></tr>' +
      '<tr><td class="første">Fagspråk</td><td>Eleven bruker ord som variabel, vekstfaktor, stigningstall, prosentpoeng riktig for sitt trinn.</td></tr>' +
      '<tr><td class="første">Sjekk og svarsetning</td><td>Svaret har enhet, er satt inn i teksten og er sjekket mot spørsmålet.</td></tr></tbody></table></div>' +
      '<h3>Vurderingskriterier for føring (forslag)</h3><ul class="liste">' + li([
        'Oppgavenummer, gitt og finn, regel/formel, utregning med ett steg per linje, svarsetning med enhet og sjekk.',
        'Likhetstegn brukes riktig, og feil er strøket over, ikke visket ut.',
        'Poeng kan gis for hver del, slik at en elev med riktig metode, men en regnefeil, fortsatt får uttelling.'
      ]) + '</ul>' +
      '<h3>Samtalestartere</h3><ul class="liste">' + li(['«Hva er det oppgaven egentlig spør om? Si det med egne ord.»', '«Hvilke tall trenger vi, og hvilke kan vi la ligge?»', '«Hvordan vet du at svaret er rimelig?»', '«Gjelder det alltid, eller bare her?»', '«Kan du vise det på en annen måte, for eksempel med en tegning eller en graf?»']) + '</ul>' +
      '<aside class="callout advarsel"><div class="callout-ikon" aria-hidden="true">⚠️</div><div class="callout-tekst"><strong class="lesbar callout-tittel">Gjennomgå innholdet selv</strong><div class="lesbar">Tekstoppgaver, grafer, påstander og Jeopardy-spørsmål er laget av Claude og er ikke testet med elever. Les gjennom det du skal bruke, og rett det som ikke passer klassen din. Kriteriene over er forslag, ikke en offisiell vurderingsmal.</div></div></aside></section>';
    CUR.forEach(function (tr) {
      h += '<section class="seksjon farge-' + (tr.trinn === 8 ? 4 : tr.trinn === 9 ? 5 : 6) + '" id="lv-' + tr.trinn + '"><header class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">🧭</span><h2>' + tr.tittel + ': årsplan og opplegg</h2></header>' + arsplan(tr) +
        '<p class="lesbar">Tidsforslagene er veiledende og må tilpasses timetall og klasse. Rekkefølgen følger forsiden.</p>' + tr.temaer.map(t => temaHTML(mode, tr, t)).join('') + '</section>';
    });
    h += '<section class="seksjon farge-1" id="lv-vurd"><header class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">📝</span><h2>Vurdering</h2></header><ul class="liste">' + li(VURD) + '</ul>' +
      '<aside class="callout advarsel"><div class="callout-ikon" aria-hidden="true">⚠️</div><div class="callout-tekst"><strong class="lesbar callout-tittel">Gjennomgå innholdet selv</strong><div class="lesbar">Oppgaver, fasit og veiledningstekster er laget for å være riktige, men du kjenner klassen din. Se gjennom det du bruker, særlig før utskrift.</div></div></aside></section>';
    h += '</div></div>';
    M._after = function () {
      const topp = () => { const t = document.querySelector('.topbar-meny'); return (t ? t.offsetHeight : 60) + 10; };
      const root = document.querySelector('.lv-layout'); if (!root) return;
      const sett = () => root.style.setProperty('--lv-topp', topp() + 'px'); sett(); window.addEventListener('resize', sett);
      const lenker = Array.prototype.slice.call(root.querySelectorAll('.lv-toc2 a'));
      lenker.forEach(a => a.addEventListener('click', function (e) {
        const mål = document.getElementById(a.getAttribute('href').slice(1)); if (!mål) return; e.preventDefault();
        if (mål.tagName === 'DETAILS') mål.open = true;
        const y = mål.getBoundingClientRect().top + window.scrollY - topp() - (window.innerWidth <= 900 ? 56 : 0);
        window.scrollTo({ top: y, behavior: 'smooth' });
      }));
      if (!('IntersectionObserver' in window)) return;
      const mål = lenker.map(a => document.getElementById(a.getAttribute('href').slice(1)));
      const obs = new IntersectionObserver(function () {
        let aktiv = -1; mål.forEach((m, i) => { if (m && m.getBoundingClientRect().top <= topp() + 80) aktiv = i; });
        lenker.forEach((a, i) => { a.classList.toggle('aktiv', i === aktiv); if (i === aktiv) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
        const a = lenker[aktiv]; if (a && window.innerWidth <= 900) { const l = root.querySelector('.lv-toc-liste'); if (l && a.offsetParent) l.scrollLeft = a.offsetLeft - 20; }
      }, { rootMargin: '0px', threshold: [0, 1] });
      mål.forEach(m => m && obs.observe(m));
      window.addEventListener('scroll', function f() { if (!document.body.contains(root)) return window.removeEventListener('scroll', f); obs.takeRecords(); const aktiv = (() => { let a = -1; mål.forEach((m, i) => { if (m && m.getBoundingClientRect().top <= topp() + 80) a = i; }); return a; })(); lenker.forEach((x, i) => x.classList.toggle('aktiv', i === aktiv)); }, { passive: true });
    };
    return h;
  }
  M.pages.laerer = laerer;
})();
