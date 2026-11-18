/* ============================================================
   «Tre nivåer»: samme tema i tre utgaver som eleven velger selv.
   🌱 Rolig: enkle tall, korte steg, farger og bilder, mye hjelp.
   🌿 Vanlig: regler, eksempler og oppgaver i passe mengde.
   🚀 Utfordring: færre forklaringer, flere steg og mer å tenke på.
   Navnene sier noe om tempo, ikke om hvem du er. Valget finnes bare mens siden er åpen.
   Innholdet hentes fra regelboka (M.regelbok), nivåoppgavene (M.topics.rolig/utfordring)
   og oppgavene i Utforsk, så alt er skrevet ett sted.
   Rute: #/tempo/8/negative-tall
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE, P = M.pages, I = M.pagesInt, H = M.href;
  M.topics.tempo = M.topics.utforsk;     // sider som ikke har egen tempo-utgave (f.eks. verktøy) bruker Utforsk

  const FARGER = ['k1', 'k2', 'k3', 'k4', 'k5', 'k6'];

  /* Del en tekst i setninger slik at hver tanke får sin egen linje (brukes i Rolig). */
  function setninger(t) {
    return String(t).split(/(?<=[a-zæøåA-ZÆØÅ0-9)»%][.!?])\s+(?=[A-ZÆØÅ(−\d«])/);
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function reglerRolig(rb, ctx) {
    return '<div class="tp-regler rolig">' + rb.regler.map(function (r, i) {
      return '<article class="tp-kort ' + FARGER[i % 6] + '"><div class="tp-ikon" aria-hidden="true">' + r[0] + '</div><div class="tp-tekst"><h3 class="lesbar"><span class="tp-nr">Regel ' + (i + 1) + '</span> ' + M.markup(r[1], ctx) + '</h3>' +
        setninger(r[2]).map(x => '<p class="lesbar tp-linje">' + M.markup(x, ctx) + '</p>').join('') + '</div></article>';
    }).join('') + '</div>';
  }
  function reglerVanlig(rb, ctx) {
    return '<div class="tp-regler vanlig">' + rb.regler.map(function (r, i) {
      return '<article class="tp-kort ' + FARGER[i % 6] + '"><div class="tp-ikon" aria-hidden="true">' + r[0] + '</div><div class="tp-tekst"><h3 class="lesbar">' + M.markup(r[1], ctx) + '</h3><p class="lesbar">' + M.markup(r[2], ctx) + '</p></div></article>';
    }).join('') + '</div>';
  }
  function reglerKompakt(rb, ctx) {
    return '<details class="tp-apne"><summary>📏 Reglene du trenger (trykk for å åpne)</summary><ul class="tp-kompakt">' + rb.regler.map(r => '<li class="lesbar"><strong>' + r[0] + ' ' + M.markup(r[1], ctx) + '.</strong> ' + M.markup(r[2], ctx) + '</li>').join('') + '</ul></details>';
  }
  function ordKort(rb, ctx) {
    if (!rb.ord || !rb.ord.length) return '';
    return '<div class="tp-ord">' + rb.ord.map((o, i) => '<div class="tp-ordkort ' + FARGER[i % 6] + '"><strong class="lesbar">' + M.markup(o[0], ctx) + '</strong><span class="lesbar">' + M.markup(o[1], ctx) + '</span></div>').join('') + '</div>';
  }
  function eksBlokker(rb, maks, hopp) {
    return (rb.eks || []).filter(e => !hopp || e[0] !== hopp).slice(0, maks).map((e, i) => ({ t: 'eksempel', tittel: 'Eksempel ' + (i + 1), oppgave: e[0], steg: e[1] }));
  }
  function passOpp(rb, n, ctx) {
    if (!rb.pass || !rb.pass.length) return '';
    return I.blockHTML({ t: 'callout', stil: 'advarsel', tittel: 'Pass opp!', punkter: rb.pass.slice(0, n) }, ctx);
  }
  function trick(rb, ctx) {
    return rb.trick ? I.blockHTML({ t: 'callout', stil: 'tips', tittel: 'Husk slik', tekst: rb.trick }, ctx) : '';
  }

  /* hent blokker fra Utforsk-siden */
  function utforskBlokker(topic, type, filter) {
    const ut = [];
    (topic ? topic.seksjoner : []).forEach(s => s.blokker.forEach(b => { if (b.t === type && (!filter || filter(b))) ut.push(b); }));
    return ut;
  }
  /* velg et spredt utvalg: først blokker fra nivåene i rekkefølge, så flere hvis det er plass */
  function utvalg(blokker, nivaaer, maks) {
    const per = nivaaer.map(n => blokker.filter(b => b.niva === n));
    const ut = [];
    for (let k = 0; ut.length < maks; k++) {
      let lagtTil = false;
      per.forEach(function (lst) { if (lst[k] && ut.length < maks) { ut.push(lst[k]); lagtTil = true; } });
      if (!lagtTil) break;
    }
    return ut.sort((a, b) => blokker.indexOf(a) - blokker.indexOf(b));
  }

  function seksjon(nr, ikon, tittel, inn, kl) {
    return '<section class="seksjon farge-' + (((nr - 1) % 6) + 1) + ' tp-sek ' + (kl || '') + '"><header class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">' + ikon + '</span><h2>' + tittel + '</h2></header>' + inn + '</section>';
  }

  function pageTempo(trinn, id) {
    const mode = 'tempo', key = trinn + '/' + id;
    const tr = M.findTrinn(trinn), meta = M.findTema(trinn, id);
    if (!tr || !meta) return P.ikkeFunnet(mode);
    const rb = M.regelbok && M.regelbok[key], utf = M.topics.utforsk[key];
    if (!rb || !utf) return P.topic('utforsk', trinn, id);       // temaer uten tre nivåer: vanlig side
    const niv = M.nivå, nr = M.nivåNr(), nd = M.NIVAA[nr];
    const rolig = M.topics.rolig[key], utfordring = M.topics.utfordring[key];
    const spillHer = M.gamesFor ? M.gamesFor(key) : []; M._hjelpKey = key;
    const ctx = { ordliste: utf.ordliste || [], seen: {}, widgets: [], wid: 0, topicKey: 't-' + niv + '-' + trinn + '-' + id, blokkN: 0, sek: 'a' };
    M.setOrdliste(ctx.ordliste);
    const blokk = b => I.blockHTML(b, ctx);
    const ny = s => { ctx.seen = {}; ctx.sek = s; ctx.blokkN = 0; };
    const modeller = utforskBlokker(utf, 'widget').slice(0, niv === 'rolig' ? 2 : niv === 'vanlig' ? 2 : 0);
    const oppgBlokker = utforskBlokker(utf, 'oppgaver');
    const genMode = niv === 'rolig' ? 'steg' : 'utforsk';
    const ekstraDef = M.ekstra[key] ? M.ekstra[key](genMode) : null;

    let h = '<nav class="brødsmule" aria-label="Du er her"><a href="' + H(mode) + '">Forsiden</a> › <a href="' + H(mode, trinn) + '">' + tr.tittel + '</a> › <span>' + meta.tittel + '</span></nav>' +
      '<header class="topic-hode ' + tr.farge + '"><div class="topic-ikon" aria-hidden="true">' + meta.ikon + '</div><div><p class="over-tittel">' + tr.tittel + ' · Tre nivåer</p><h1>' + (utf.tittel || meta.tittel) + '</h1>' +
      '<p class="ingress lesbar">' + M.markup(rb.kort, ctx) + '</p></div></header>' +
      '<div class="tp-velger">' + M.nivaaVelger('Velg nivå:') +
      '<p class="tp-hva lesbar">' + ({
        rolig: '🌱 <strong>Rolig:</strong> små tall, én regel om gangen, mange bilder og hjelp i hver oppgave.',
        vanlig: '🌿 <strong>Vanlig:</strong> alle reglene, flere eksempler og oppgaver i passe mengde.',
        utfordring: '🚀 <strong>Utfordring:</strong> reglene i kortform og oppgaver der du må tenke i flere steg.'
      })[niv] + '</p></div>';

    let n = 0;
    h += '<div class="tempo tempo-' + niv + '">';

    if (niv === 'rolig') {
      ny('r1'); h += seksjon(++n, '📏', 'Reglene, én og én', '<p class="lesbar">Les én regel om gangen. Ta deg god tid.</p>' + reglerRolig(rb, ctx));
      if (modeller.length) { ny('r2'); h += seksjon(++n, '🔍', 'Se det selv', '<p class="lesbar">Prøv modellen. Trykk, dra og se hva som skjer.</p>' + modeller.map(blokk).join('')); }
      ny('r3');
      const niv1 = rolig ? utforskBlokker(rolig, 'eksempel')[0] : null;
      const eksR = (niv1 ? [Object.assign({}, niv1, { tittel: 'Vi gjør den første sammen' })] : []).concat(niv1 ? eksBlokker(rb, 2).slice(1, 2) : eksBlokker(rb, 2));
      h += seksjon(++n, '👀', 'Se hvordan det gjøres', '<p class="lesbar">Trykk «Vis neste steg» og følg med, ett steg av gangen.</p>' + eksR.map(blokk).join('') + trick(rb, ctx));
      ny('r4');
      h += seksjon(++n, '✏️', 'Nå du! Med hjelp underveis', (rolig ? utforskBlokker(rolig, 'oppgaver').map(blokk).join('') : '') + passOpp(rb, 2, ctx));
      if (rb.ord && rb.ord.length) { h += seksjon(++n, '🔤', 'Ord du kan', ordKort(rb, ctx)); }
    } else if (niv === 'vanlig') {
      ny('v1'); h += seksjon(++n, '📏', 'Reglene', reglerVanlig(rb, ctx));
      if (modeller.length) { ny('v2'); h += seksjon(++n, '🔍', 'Prøv selv', '<p class="lesbar">Utforsk modellen før du regner.</p>' + modeller.map(blokk).join('')); }
      ny('v3'); h += seksjon(++n, '📘', 'Eksempler', eksBlokker(rb, 3).map(blokk).join('') + trick(rb, ctx) + passOpp(rb, 3, ctx));
      ny('v4');
      const valgt = utvalg(oppgBlokker, [2, 3], 3);
      h += seksjon(++n, '✏️', 'Oppgaver', valgt.map(blokk).join('') || '<p class="lesbar">Se «Flere oppgaver» under.</p>');
      if (rb.test && rb.test.length) { ny('v5'); h += seksjon(++n, '🎯', 'Test deg selv', blokk({ t: 'oppgaver', tittel: 'Test deg selv', ikon: '🎯', oppgaver: rb.test.map(t => M.H.F(t[0], 'Svar: ' + t[1])) })); }
      if (rb.ord && rb.ord.length) h += seksjon(++n, '🔤', 'Ord og begreper', ordKort(rb, ctx));
    } else {
      ny('u1'); h += seksjon(++n, '📏', 'Reglene dine', reglerKompakt(rb, ctx) + passOpp(rb, 3, ctx), 'tp-kompakt-sek');
      ny('u2');
      const ekstraU = utvalg(oppgBlokker, [4, 5], 3);
      const utfBlokker = (utfordring ? utforskBlokker(utfordring, 'oppgaver') : []);
      h += seksjon(++n, '🚀', 'Utfordringer', (utfordring ? '<p class="lesbar">' + M.markup(utforskBlokker(utfordring, 'p')[0] ? utforskBlokker(utfordring, 'p')[0].tekst : '', ctx) + '</p>' : '') + utfBlokker.map(blokk).join(''));
      ny('u3');
      if (ekstraU.length) h += seksjon(++n, '🔥', 'Flere utfordringer', ekstraU.map(blokk).join(''));
    }

    if (ekstraDef) {
      h += '<section class="seksjon tp-sek farge-' + (((++n - 1) % 6) + 1) + '"><header class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">🎲</span><h2>Flere oppgaver på ' + nd.navn + '-nivå</h2></header><p class="lesbar">Her lager du nye oppgaver så mange ganger du vil. Skriv svaret, trykk Enter, og se om det stemmer. Fasit får du når du har prøvd alle.</p></section>' +
        I.ekstraSeksjoner(ekstraDef);
    }
    h += '</div>';

    h += '<p class="lenke-rad slutt-rad tp-slutt">' +
      '<a class="knapp primær" href="' + H(mode, 'ark', 'regelbok', trinn, id) + '">📒 Skriv ut regelbok-siden</a> ' +
      '<a class="knapp" href="' + H(mode, 'ark', 'kapittel', trinn, id) + '">🧪 Lag kapittelprøve</a> ' +
      '<a class="knapp" href="' + H('utforsk', trinn, id) + '">🔭 Full forklaring i Utforsk</a> ' +
      '<a class="knapp" href="' + H('steg', trinn, id) + '">🪜 Steg for steg</a> ' +
      spillHer.map(g => '<a class="knapp" href="' + H('spill', g.id) + '">' + g.ikon + ' Spill: ' + g.tittel + '</a> ').join('') + '</p>';

    M._after = function () { I.mountWidgets(ctx); M.initTaskCounters(document.getElementById('main')); };
    return h;
  }
  P.tempo = pageTempo;
})();
