/* ============================================================
   Les, tolk og begrunn: opptrening før fritekst
   - ordbank (lett, middels, vanskelig) med korte ordøvelser
   - «Se hvordan det gjøres»: eksempel med fargede deler
   - «Bygg setningen»: trykk på en brikke, så på ruta (eller dra). Flere svar kan være riktige.
   - «Slik leser du en oppgavetekst»: marker trinn for trinn
   Ingenting lagres. Alt forsvinner når siden lukkes.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE; const L = M.les; const X = L.bx = L.bx || {};
  const NIV = ['rolig', 'vanlig', 'utfordring'];
  const esc = s => String(s === undefined || s === null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const sig = s => esc(s).replace(/\{\{([^}]+)\}\}/g, '<mark class="les-signal">$1</mark>');
  const $ = (el, sel) => el.querySelector(sel);
  const $$ = (el, sel) => Array.prototype.slice.call(el.querySelectorAll(sel));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = b[i]; b[i] = b[j]; b[j] = t; } return b; };
  const dat = trinn => (X.data && X.data[trinn]) || null;

  /* ---------- ordbank ---------- */
  const BANK = [
    { id: 'rolig', ikon: '🌱', tittel: 'Lett', ord: [
      ['Jeg mener at …', 'sier hva du svarer', '«Jeg mener at farten er 15 km/t.»'],
      ['fordi / siden', 'innleder grunnen', '«… fordi 30 : 2 = 15.»'],
      ['derfor', 'innleder konklusjonen', '«Derfor er svaret 15 km/t.»'],
      ['for eksempel', 'viser med et tall', '«For eksempel er 30 : 2 = 15.»']
    ] },
    { id: 'vanlig', ikon: '🌿', tittel: 'Middels', ord: [
      ['det betyr at …', 'neste steg følger av det forrige', '«Det betyr at vi kan dele på 2.»'],
      ['i grafen ser vi at …', 'viser at du har lest grafen', '«I grafen ser vi at søylen for torsdag er 80.»'],
      ['regelen sier at …', 'bruker en regel eller formel', '«Regelen sier at fart = strekning : tid.»'],
      ['sammenlignet med …', 'setter to tall opp mot hverandre', '«Sammenlignet med mandag er torsdag 40 høyere.»'],
      ['til sammen', 'legger flere deler sammen', '«Til sammen ble det solgt 280 vafler.»']
    ] },
    { id: 'utfordring', ikon: '🚀', tittel: 'Vanskelig', ord: [
      ['dette gjelder bare hvis …', 'avgrenser når noe stemmer', '«Dette gjelder bare hvis x er større enn 0.»'],
      ['i motsetning til …', 'viser en forskjell', '«I motsetning til gjennomsnittet er medianen 3.»'],
      ['selv om … så …', 'viser at noe er sant til tross for noe annet', '«Selv om prisen øker, er den lavere enn før.»'],
      ['det som avgjør er …', 'peker ut det viktigste', '«Det som avgjør er stigningstallet.»'],
      ['det følger at …', 'trekker en slutning fra det som er vist', '«Det følger at linjene er parallelle.»'],
      ['derimot', 'setter to ting opp mot hverandre', '«A vokser jevnt. B derimot vokser stadig raskere.»']
    ] }
  ];
  const TRENING = {
    rolig: [
      { q: 'Velg ordet som passer: «Svaret er 15 ___ 30 : 2 = 15.»', valg: [['fordi', 1], ['derfor', 0, '«Derfor» innleder en konklusjon. Her kommer grunnen.'], ['men', 0, '«Men» viser en motsetning. Her er det ingen motsetning.']], forkl: '«Fordi» innleder grunnen: Svaret er 15 fordi 30 : 2 = 15.' },
      { q: 'Velg ordet som passer: «30 : 2 = 15. ___ er farten 15 km/t.»', valg: [['Derfor', 1], ['Fordi', 0, '«Fordi» innleder en grunn. Her er utregningen grunnen, og nå kommer konklusjonen.'], ['For eksempel', 0, 'Det er ikke et eksempel. Det er en konklusjon.']], forkl: '«Derfor» innleder konklusjonen som følger av utregningen.' },
      { q: 'Velg ordet som passer: «Prisen øker. ___ øker den fra 50 kr til 90 kr.»', valg: [['For eksempel', 1], ['Derfor', 0, '«Derfor» sier at noe følger av det forrige. Her skal du vise med et tall.'], ['Selv om', 0, '«Selv om» viser en motsetning.']], forkl: '«For eksempel» innleder et tall som viser at du har sett på grafen.' }
    ],
    vanlig: [
      { q: 'Velg ordet som passer: «Grafen er en rett linje. ___ øker beløpet like mye hver gang.»', valg: [['Det betyr at', 1], ['Selv om', 0, '«Selv om» viser en motsetning. Her følger neste steg av det forrige.'], ['I motsetning til', 0, '«I motsetning til» viser en forskjell. Her er det ingen forskjell.']], forkl: '«Det betyr at» knytter neste steg til det forrige.' },
      { q: 'Banan har 12 elever, eple har 8. Velg ordene som passer: «___ eple har banan 4 flere.»', valg: [['Sammenlignet med', 1], ['Derfor', 0, '«Derfor» innleder en konklusjon. Her setter du to tall opp mot hverandre.'], ['Til sammen', 0, '«Til sammen» legger tallene sammen. Her skal du sammenligne.']], forkl: '«Sammenlignet med» setter to tall opp mot hverandre.' },
      { q: 'Hvilken setning viser tydeligst at du har lest grafen?', valg: [['I grafen ser vi at søylen for torsdag er 80.', 1], ['Jeg tror at torsdag er best.', 0, 'Det er en mening uten tall fra grafen.'], ['Fordi det er sånn.', 0, 'Det er ikke en grunn.']], forkl: 'Du viser at du har lest grafen ved å bruke et tall derfra.' }
    ],
    utfordring: [
      { q: 'Likningen gir 1 = 5. Velg ordene som passer: «___ finnes det ingen løsning.»', valg: [['Det følger at', 1], ['I motsetning til', 0, '«I motsetning til» viser en forskjell. Her trekker du en slutning.'], ['Selv om', 0, '«Selv om» viser en motsetning. Her trekker du en slutning.']], forkl: '«Det følger at» trekker en slutning fra det du har vist.' },
      { q: 'Gjennomsnittet er 12. Velg ordene som passer: «___ gjennomsnittet er medianen 3.»', valg: [['I motsetning til', 1], ['Derfor', 0, '«Derfor» innleder en konklusjon. Her viser du en forskjell.'], ['Fordi', 0, '«Fordi» innleder en grunn. Her viser du en forskjell.']], forkl: '«I motsetning til» viser en forskjell mellom to tall.' },
      { q: 'Velg ordene som passer: «Dette gjelder ___ x er større enn 0.»', valg: [['bare hvis', 1], ['derimot', 0, '«Derimot» setter to ting opp mot hverandre. Her avgrenser du når noe stemmer.'], ['til sammen', 0, '«Til sammen» legger noe sammen. Her avgrenser du.']], forkl: '«Bare hvis» sier når påstanden gjelder.' }
    ]
  };

  X.ordbankHTML = function (niv) {
    const mc = L.mc;
    return '<section class="seksjon farge-1 les-ordbank"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">1</span><h2>Ordbanken</h2></div>' +
      '<p class="lesbar">Gode begrunnelser bruker faste ord. Lær de enkle først, og ta med flere etter hvert. Her er ordene du kan bruke. Nivået du har valgt er markert.</p>' +
      '<div class="les-ordniv-rad">' + BANK.map(b => '<article class="les-ordniv' + (b.id === niv ? ' na' : '') + '"><h3>' + b.ikon + ' ' + b.tittel + (b.id === niv ? ' <span class="les-na">start her</span>' : '') + '</h3><ul>' +
        b.ord.map(o => '<li><strong>' + esc(o[0]) + '</strong><span class="les-bruk">' + esc(o[1]) + '</span><em>' + esc(o[2]) + '</em></li>').join('') + '</ul></article>').join('') + '</div>' +
      '<h3>Øv på ordene</h3>' +
      (TRENING[niv] || []).map((o, i) => '<section class="les-kort les-ordtr" data-o="' + i + '"><h3>Ord ' + (i + 1) + '</h3>' + mc.html({ q: o.q, valg: o.valg, forkl: o.forkl }) + '</section>').join('') + '</section>';
  };
  X.ordbankInit = function (main, niv) {
    (TRENING[niv] || []).forEach((o, i) => L.mc.init($(main, '.les-ordtr[data-o="' + i + '"] .les-mc'), { forkl: o.forkl }));
  };
  X.ordbankKompakt = function (niv) {
    const til = NIV.indexOf(niv);
    return '<div class="les-ordtag-boks"><strong>🧱 Ordbanken</strong> ' + BANK.slice(0, til + 1).map(b => b.ord.map(o => '<span class="les-ordtag">' + esc(o[0]) + '</span>').join('')).join('') + '</div>';
  };

  /* ---------- se hvordan det gjøres ---------- */
  const ROLLE = { P: ['🟠', 'Påstand', 'p'], B: ['🔵', 'Begrunnelse', 'b'], E: ['🟢', 'Eksempel med tall', 'e'], K: ['🟣', 'Konklusjon', 'k'] };
  X.seHTML = function (trinn) {
    const d = dat(trinn); if (!d) return '';
    const s = d.se;
    return '<section class="seksjon farge-2 les-se"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">2</span><h2>Se hvordan det gjøres</h2></div>' +
      '<p class="lesbar">Her er en oppgave med et svar som er bygd opp i deler. Se på fargene og ordene som er uthevet.</p>' +
      '<div class="les-se-oppg"><p class="lesbar"><strong>Oppgave:</strong> ' + esc(s.oppg) + '</p>' + (s.graf ? '<div class="les-graf-stat">' + L.grafSvg(s.graf, true) + '</div>' : '') + '</div>' +
      '<div class="les-se-svar"><h3>✅ Et godt svar</h3>' + s.deler.map(x => {
        const r = ROLLE[x[0]];
        return '<div class="les-del les-del-' + r[2] + '"><span class="les-del-navn">' + r[0] + ' ' + r[1] + '</span><p class="lesbar">' + sig(x[1]) + '</p><p class="les-del-hvorfor">💡 ' + esc(x[2]) + '</p></div>';
      }).join('') + '</div>' +
      '<div class="les-se-svakt"><h3>❌ Et svar som ikke er godt</h3><p class="les-svakt">«' + esc(s.svakt) + '»</p><ul>' + s.mangler.map(m => '<li>' + esc(m) + '</li>').join('') + '</ul></div></section>';
  };

  /* ---------- bygg setningen ---------- */
  X.byggHTML = function (trinn, niv) {
    const d = dat(trinn); if (!d) return '';
    const liste = d.bygg[niv] || [];
    return '<section class="seksjon farge-3 les-bygg"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">3</span><h2>Bygg setningen</h2></div>' +
      '<p class="lesbar">Trykk på en brikke, og så på ruta der den skal stå. Du kan også dra brikken. Trykk på en brikke i ruta for å ta den ut igjen. Det kan finnes flere riktige måter å bygge setningen på.</p>' +
      liste.map((o, i) => '<section class="les-kort les-bygg-kort" data-k="' + i + '"><h3>Bygg ' + (i + 1) + '</h3><p class="les-oppg-tekst lesbar">' + esc(o.oppg) + '</p>' + (o.graf ? '<div class="les-graf-stat">' + L.grafSvg(o.graf, true) + '</div>' : '') +
        '<div class="les-ruter" aria-label="Setningen din">' + o.ruter.map((r, s) => '<button type="button" class="les-rute" data-r="' + s + '" aria-label="Rute: ' + esc(r.replace(/^\./, '')) + ', tom"><span class="les-rute-navn">' + esc(r.replace(/^\./, '')) + '</span><span class="les-rute-tekst">trykk her</span></button>').join('') + '</div>' +
        '<p class="les-pool-tittel"><strong>Brikker</strong></p><div class="les-pool"></div>' +
        '<div class="les-knapper"><button type="button" class="knapp primær liten les-bygg-sjekk">✔️ Sjekk setningen</button> <button type="button" class="knapp liten les-bygg-reset">↺ Start på nytt</button></div>' +
        '<div class="les-resultat lesbar" aria-live="polite"></div><div class="les-bygd" hidden></div></section>').join('') + '</section>';
  };
  function settSammen(o, placed) {
    let ut = '';
    o.ruter.forEach((r, s) => {
      const t = placed[s] === null ? '…' : o.brikker[placed[s]].t;
      if (!ut) ut = t; else if (r.charAt(0) === '.') ut = ut.replace(/[.:]?$/, m => (m === ':' ? ':' : '.')) + ' ' + t; else ut += ' ' + t;
    });
    return /[.!?:]$/.test(ut) ? ut : ut + '.';
  }
  function byggKort(kort, o, niv) {
    const pool = $(kort, '.les-pool'), res = $(kort, '.les-resultat'), bygd = $(kort, '.les-bygd');
    const rekke = shuffle(o.brikker.map((b, i) => i));
    let placed = o.ruter.map(() => null), valgt = null, sjekket = 0;
    function brukt(i) { return placed.indexOf(i) >= 0; }
    function tegn() {
      pool.innerHTML = rekke.filter(i => !brukt(i)).map(i => '<button type="button" class="les-brikke' + (valgt === i ? ' valgt' : '') + '" draggable="true" data-b="' + i + '" aria-pressed="' + (valgt === i) + '">' + esc(o.brikker[i].t) + '</button>').join('') || '<span class="les-pool-tom">Alle brikkene er brukt.</span>';
      $$(kort, '.les-rute').forEach((r, s) => {
        const i = placed[s]; const tek = $(r, '.les-rute-tekst');
        r.classList.toggle('fylt', i !== null);
        if (i === null) { tek.textContent = valgt === null ? 'trykk her' : 'sett inn her'; r.setAttribute('aria-label', 'Rute: ' + o.ruter[s].replace(/^\./, '') + ', tom'); }
        else { tek.textContent = o.brikker[i].t; r.setAttribute('aria-label', 'Rute: ' + o.ruter[s].replace(/^\./, '') + ', ' + o.brikker[i].t + '. Trykk for å ta ut.'); }
      });
      $$(pool, '.les-brikke').forEach(b => {
        b.addEventListener('click', () => { const i = Number(b.dataset.b); valgt = valgt === i ? null : i; tegn(); });
        b.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', b.dataset.b); e.dataTransfer.effectAllowed = 'move'; valgt = Number(b.dataset.b); });
      });
    }
    function plasser(s, i) {
      if (i === null || i === undefined || isNaN(i)) return;
      placed[s] = i; valgt = null; nullstillVisning(); tegn();
    }
    function nullstillVisning() { $$(kort, '.les-rute').forEach(r => r.classList.remove('ok', 'feil', 'mangler')); res.textContent = ''; bygd.hidden = true; delete kort.dataset.ferdig; }
    $$(kort, '.les-rute').forEach((r, s) => {
      r.addEventListener('click', () => {
        if (valgt !== null) plasser(s, valgt);
        else if (placed[s] !== null) { placed[s] = null; nullstillVisning(); tegn(); }
      });
      r.addEventListener('dragover', e => { e.preventDefault(); r.classList.add('over'); });
      r.addEventListener('dragleave', () => r.classList.remove('over'));
      r.addEventListener('drop', e => { e.preventDefault(); r.classList.remove('over'); plasser(s, parseInt(e.dataTransfer.getData('text/plain'), 10)); });
    });
    $(kort, '.les-bygg-reset').addEventListener('click', () => { placed = o.ruter.map(() => null); valgt = null; sjekket = 0; nullstillVisning(); tegn(); });
    $(kort, '.les-bygg-sjekk').addEventListener('click', () => {
      if (placed.some(x => x !== null)) sjekket++;
      let rett = 0, mangler = 0; const hint = [];
      $$(kort, '.les-rute').forEach((r, s) => {
        r.classList.remove('ok', 'feil', 'mangler'); const i = placed[s];
        if (i === null) { r.classList.add('mangler'); mangler++; return; }
        const b = o.brikker[i];
        if (b.ok.indexOf(s) >= 0) { r.classList.add('ok'); rett++; }
        else { r.classList.add('feil'); hint.push('<li><strong>' + esc(o.ruter[s].replace(/^\./, '')) + ':</strong> ' + esc(b.hint || (b.ok.length ? 'Den brikken passer et annet sted. Se på navnet på ruta.' : 'Prøv en annen brikke.')) + '</li>'); }
      });
      if (rett === o.ruter.length) {
        kort.dataset.ferdig = '1'; res.innerHTML = '✅ <strong>Setningen er riktig bygd.</strong> Les den høyt for sidemannen. Finnes det en annen måte å bygge den på? Trykk på en brikke i ruta og prøv en annen.';
        bygd.hidden = false; bygd.textContent = settSammen(o, placed);
      } else {
        bygd.hidden = true; delete kort.dataset.ferdig;
        const visHint = niv !== 'utfordring' || sjekket >= 2;
        res.innerHTML = '🤔 <strong>' + rett + ' av ' + o.ruter.length + ' ruter er riktige.</strong>' + (mangler ? ' ' + mangler + ' er tom' + (mangler > 1 ? 'me' : '') + '.' : '') +
          (hint.length ? (visHint ? '<ul>' + hint.join('') + '</ul>' : ' Prøv å bytte på de røde rutene og sjekk igjen. Du får hint hvis du sjekker en gang til.') : '');
      }
    });
    tegn();
  }
  X.byggInit = function (main, trinn, niv) {
    const d = dat(trinn); if (!d) return;
    (d.bygg[niv] || []).forEach((o, i) => byggKort($(main, '.les-bygg-kort[data-k="' + i + '"]'), o, niv));
  };

  /* ---------- slik leser du en oppgavetekst ---------- */
  const STEG = [
    ['Les hele teksten én gang uten å markere noe. Hva handler den om?', ''],
    ['Finn spørsmålet først 🟠. Det forteller hva svaret ditt skal inneholde.', 's'],
    ['Ring rundt tall og enheter 🔵. Ta alltid med enheten (kr, km, timer).', 't'],
    ['Stryk det som ikke trengs ⚪. Ikke alt i en tekst brukes i regnestykket.', 'u'],
    ['Skriv en plan i ett steg: Hva skal du regne ut?', 'plan']
  ];
  X.introHTML = function (trinn) {
    const d = dat(trinn); if (!d) return '';
    const en = L.parseTekst(d.tekstIntro.tekst);
    return '<section class="seksjon farge-1 les-intro" data-trinn="' + trinn + '"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">👀</span><h2>Slik leser du en oppgavetekst</h2></div>' +
      '<p class="lesbar">Gå gjennom eksempelet steg for steg. Så gjør du det samme selv i oppgavene under.</p>' +
      '<div class="les-tekstboks"><p class="les-tekst">' + en.map((e, n) => (n && !/^[.,;:!?)»]+$/.test(e.w) ? ' ' : '') + '<span class="les-ord les-intro-ord" data-k="' + e.k + '">' + esc(e.w) + '</span>').join('') + '</p></div>' +
      '<p class="les-intro-steg lesbar" aria-live="polite"></p><p class="les-intro-plan lesbar" hidden>' + esc(d.tekstIntro.plan) + '</p>' +
      '<div class="les-knapper"><button type="button" class="knapp primær liten les-intro-neste">Vis steg 1 →</button> <button type="button" class="knapp liten les-intro-reset" hidden>↺ Fra start</button></div></section>';
  };
  X.introInit = function (main) {
    const root = $(main, '.les-intro'); if (!root) return;
    let n = 0; const neste = $(root, '.les-intro-neste'), reset = $(root, '.les-intro-reset'), tek = $(root, '.les-intro-steg'), plan = $(root, '.les-intro-plan');
    function vis() {
      $$(root, '.les-intro-ord').forEach(w => { const k = w.dataset.k; ['s', 't', 'u'].forEach(x => w.classList.remove('m-' + x)); if (k) { const idx = STEG.findIndex(s => s[1] === k); if (idx >= 0 && idx < n) w.classList.add('m-' + k); } });
      tek.innerHTML = n ? '<strong>Steg ' + n + ' av ' + STEG.length + ':</strong> ' + esc(STEG[n - 1][0]) : '';
      plan.hidden = !(n >= STEG.length);
      neste.hidden = n >= STEG.length; reset.hidden = n === 0;
      neste.textContent = n + 1 >= STEG.length ? 'Vis steg ' + STEG.length + ' →' : 'Vis steg ' + (n + 1) + ' →';
    }
    neste.addEventListener('click', () => { if (n < STEG.length) n++; vis(); });
    reset.addEventListener('click', () => { n = 0; vis(); });
    vis();
  };
})();
