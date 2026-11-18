/* ============================================================
   Nye arktyper: Kapittelprøve (ordinær og tilrettelagt) og Regelbok.
   Begge bygges som en dokumentmodell (js/dok.js) som kan vises, skrives ut
   og lastes ned som Word (.docx). Ingenting sendes eller lagres.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE, I = M.arkInt, D = M.dok, esc = I.esc;
  const markup = s => M.markup(String(s));
  const FARGER = ['FFF2CC', 'E1F6E8', 'DDEBFF', 'FCE7F3', 'EDE9FE', 'FFE8D6'];
  I.S.utgave = 'ordinaer'; I.S.omfang = 'full';

  const temaNavn = I.temaNavn;
  const trinnTittel = key => I.trinnFor(key).tittel;
  const temaer = trinn => { const tr = I.CUR.find(t => t.trinn === trinn); return tr ? tr.temaer.filter(t => t.klar).map(t => trinn + '/' + t.id) : []; };

  /* ---------- Kapittelprøve ---------- */
  /* Prøven bygges som en liste med oppgaver per del (P). Læreren kan endre den på siden før utskrift:
     bytte, fjerne, legge til og skrive om oppgaver. P finnes bare i minnet. */
  const DELER = {
    ordinaer: [
      { id: 'A', tittel: 'Del 1: Uten hjelpemidler', kort: 'Del 1: uten hjelpemidler', niv: 'vanlig', off: 0, poeng: 2, rom: 22 },
      { id: 'B', tittel: 'Del 2: Med hjelpemidler', kort: 'Del 2: med hjelpemidler', niv: 'utfordring', off: 11, poeng: 4, rom: 32 },
      { id: 'C', tittel: 'Del 3: Forklar og vis', kort: 'Del 3: forklar og vis', apen: true, poeng: 6, linjer: 5 }
    ],
    tilrettelagt: [
      { id: 'A', tittel: 'Del 1: Varm opp', kort: 'Del 1: varm opp', niv: 'rolig', off: 3, poeng: 0, rom: 30, hjelp: true },
      { id: 'B', tittel: 'Del 2: Nå du', kort: 'Del 2: nå du', niv: 'rolig', off: 17, poeng: 0, rom: 30, hjelp: true },
      { id: 'C', tittel: 'Del 3: Fortell', kort: 'Del 3: fortell', apen: true, poeng: 0, linjer: 4 }
    ]
  };
  const PLASS = { ingen: 0, liten: .6, middels: 1, stor: 1.5 };
  I.S.pDel = { A: true, B: true, C: true }; I.S.pAntall = 12; I.S.plass = 'middels';
  const P = { sig: null, deler: { A: [], B: [], C: [] }, rest: {}, brukt: {}, teller: 0, uid: 0, endret: false, red: null, melding: '', key: '', utgave: '' };

  function åpneSpm(key, seed, n) {
    const L = M.laerer[key] || {}, r = M.rng(seed + 5);
    const kilde = (L.samtale || []).filter(s => !/^Når møter|^Hva er forskjellen mellom/.test(s));
    const liste = r.shuffle(kilde.length ? kilde : [I.billettSpm(key)]).slice(0, n);
    const b = I.billettSpm(key); if (liste.indexOf(b) < 0) liste.push(b);
    return liste;
  }
  function fotKapittel(c) { const tn = c.tema && c.tema !== 'trinn' ? temaNavn(c.tema) : ''; return 'Kapittelprøve' + (tn ? ': ' + D.tekst(tn) : ''); }
  const tilTekst = h => D.tekst(String(h || '').replace(/<br\s*\/?>/gi, '\n'));
  const fraTekst = t => esc(String(t || '').trim()).replace(/(^|[\s(=])-(?=\d)/g, '$1−').replace(/ - /g, ' − ').replace(/\*/g, '·').replace(/\n/g, '<br>');


  /* ---------- automatisk fasit og løsningsforslag for oppgaver som er skrevet om ---------- */
  const R1 = x => Math.round(x * 1e9) / 1e9;
  const vis = t => String(t).replace(/([+\-*/])-(\d+(?:\.\d+)?)/g, '$1(-$2)').replace(/\*\*2/g, '²').replace(/\*\*3/g, '³').replace(/\*\*/g, '^').replace(/\*/g, ' · ').replace(/\//g, ' : ').replace(/(\d)\.(\d)/g, '$1,$2').replace(/(^|[^\d)²³])-(?=\d)/g, '$1−').replace(/([\d)²³])-(?=[\d(])/g, '$1 − ').replace(/\+/g, ' + ').replace(/\s+/g, ' ').trim();
  const NUM = '(-?\\d+(?:\\.\\d+)?)';
  function normUttrykk(t) {
    return String(t).replace(/[−–—]/g, '-').replace(/[·×]/g, '*').replace(/[÷:]/g, '/').replace(/(\d),(\d)/g, '$1.$2').replace(/\^/g, '**')
      .replace(/²/g, '**2').replace(/³/g, '**3').replace(/\s+/g, '');
  }
  const TRYGT = /^[0-9+\-*/().]+$/;
  const verdi = e => { if (!TRYGT.test(e)) throw new Error('ugyldig'); const v = Function('"use strict"; return (' + e + ');')(); if (typeof v !== 'number' || !isFinite(v)) throw new Error('ugyldig'); return R1(v); };
  /* regn ut ett uttrykk i trinn: parentes, potens, gange/dele, pluss/minus */
  function uttrykkTrinn(e) {
    const steg = [e]; let cur = e, vakt = 0;
    const bytt = (re, f) => { const n = cur.replace(re, f); if (n !== cur) { cur = n; steg.push(cur); return true; } return false; };
    while (vakt++ < 60) {
      if (/\((?![+-]?\d+(?:\.\d+)?\))[^()]+\)/.test(cur)) { bytt(/\(([^()]+)\)/, (m, inn) => /^[+-]?\d+(\.\d+)?$/.test(inn) ? m : (v => v < 0 ? '(' + v + ')' : String(v))(verdi(inn))); continue; }
      cur = cur.replace(/\((-?\d+(?:\.\d+)?)\)/g, '$1');
      if (bytt(new RegExp('(?<![\\d.])' + NUM + '\\*\\*(\\d+)'), (m, a, b) => String(R1(Math.pow(+a, +b))))) continue;
      if (bytt(new RegExp('(?<![\\d.])' + NUM + '([*/])' + NUM), (m, a, o, b) => String(R1(o === '*' ? +a * +b : +a / +b)))) continue;
      if (bytt(new RegExp('^' + NUM + '([+-])' + NUM), (m, a, o, b) => String(R1(o === '+' ? +a + +b : +a - +b)))) continue;
      if (bytt(new RegExp('(?<![\\d.])' + NUM + '([+-])' + NUM), (m, a, o, b) => String(R1(o === '+' ? +a + +b : +a - +b)))) continue;
      break;
    }
    return steg;
  }
  function løsUttrykk(t) {
    let r = t.replace(/[=?]+\s*$/, '').replace(/\.\s*$/, '').trim();
    r = r.replace(/^(Regn ut|Hva er|Hva blir|Beregn|Finn verdien av|Finn)\s*:?\s*/i, '').trim();
    if (!r || !/^[\d\s+\-−–·×÷:*/().,^²³]+$/.test(r) || !/\d\s*[+\-−–·×÷:*/^²³]\s*[\d(]|\)\s*[²³^]|[²³]/.test(r)) return null;
    let e; try { e = normUttrykk(r); const v = verdi(e); const steg = uttrykkTrinn(e);
      const rekke = steg.map(vis); const sluttTall = M.fmt(v);
      if (rekke.length === 1) rekke.push(sluttTall);
      return { svar: sluttTall, num: v, los: 'Regn etter rekkefølgen: parentes, potens, gange og dele, så pluss og minus.<br>' + rekke.join(' = ') };
    } catch (err) { return null; }
  }
  function løsLikning(t) {
    const m = t.match(/([0-9x().,+\-−–·*/\s^²]+=[0-9x().,+\-−–·*/\s^²]+)/); if (!m || !/x/.test(m[1])) return null;
    const deler = m[1].split('='); if (deler.length !== 2) return null;
    const norm = x => normUttrykk(x).replace(/(\d|\))(x|\()/g, '$1*$2').replace(/x(\d|\()/g, 'x*$1');
    try {
      const L = norm(deler[0]), Rr = norm(deler[1]);
      if (!/^[0-9+\-*/().x]+$/.test(L + Rr)) return null;
      const f = x => Function('x', '"use strict"; return (' + L + ')-(' + Rr + ');')(x);
      const f0 = f(0), f1 = f(1), f2 = f(2), a = f1 - f0;
      if (![f0, f1, f2].every(isFinite) || Math.abs(f2 - 2 * f1 + f0) > 1e-9) return null;
      const lhs = x => Function('x', '"use strict"; return (' + L + ');')(x), rhs = x => Function('x', '"use strict"; return (' + Rr + ');')(x);
      if (Math.abs(a) < 1e-12) return { svar: Math.abs(f0) < 1e-12 ? 'Alle tall er løsning' : 'Ingen løsning', los: Math.abs(f0) < 1e-12 ? 'Begge sidene er like for alle x.' : 'Når x forsvinner, står det en usann påstand igjen.' };
      const x = R1(-f0 / a);
      const sjekk = 'Sjekk: sett inn x = ' + M.fmt(x) + '. Venstre side: ' + M.fmt(R1(lhs(x))) + '. Høyre side: ' + M.fmt(R1(rhs(x))) + '.';
      return { svar: 'x = ' + M.fmt(x), num: x, los: 'Samle x-leddene på én side og tallene på den andre, og del på tallet foran x.<br>' + vis(deler[0].replace(/[−–—]/g, '-')) + ' = ' + vis(deler[1].replace(/[−–—]/g, '-')) + '<br>x = ' + M.fmt(x) + '<br>' + sjekk };
    } catch (err) { return null; }
  }
  function løs(html) { const t = tilTekst(html).replace(/\s+/g, ' ').trim(); return løsLikning(t) || løsUttrykk(t); }
  M.arkLøs = løs;

  function tilOpp(it, nr, o) {
    const valg = it.type === 'valg' && it.valg ? it.valg.map(markup) : null;
    const fri = it.type === 'fritekst';
    return { t: 'opp', id: o.id, nr: nr, html: it.q || '<i>(skriv oppgaven her)</i>', valg: valg, rom: valg ? 0 : fri ? 0 : o.rom, linjer: fri ? 4 : 0, svar: !valg && !fri, enhet: it.enhet || '', poeng: o.poeng, hjelp: o.hjelp && it.hjelp ? 'Start slik: ' + it.hjelp : '' };
  }

  /* trekk en ny oppgave til en del (aldri samme oppgave to ganger) */
  function tegn(c, d) {
    const key = c.tema;
    for (let forsok = 0; forsok < 6; forsok++) {
      const rest = P.rest[d.id] = P.rest[d.id] || [];
      while (rest.length) {
        const x = rest.shift(), k = d.apen ? x : D.tekst(x.q);
        if (P.brukt[k]) continue; P.brukt[k] = 1;
        return d.apen ? { uid: ++P.uid, it: { q: esc(x), apen: true, a: '' } } : { uid: ++P.uid, it: Object.assign({}, x) };
      }
      if (d.apen) return null;
      P.teller++;
      P.rest[d.id] = I.nivåItems(key, d.niv, 24, c.seed + d.off + 101 * P.teller);
    }
    return null;
  }
  function fordel(n, akt, utgave) {
    const r = { A: 0, B: 0, C: 0 };
    if (akt.C) r.C = (akt.A || akt.B) ? (utgave === 'ordinaer' ? (n >= 16 ? 3 : n >= 9 ? 2 : 1) : 1) : Math.min(n, 6);
    const rest = n - r.C;
    if (akt.A && akt.B) { r.A = Math.ceil(rest * (utgave === 'ordinaer' ? .6 : .5)); r.B = rest - r.A; }
    else if (akt.A) r.A = rest; else if (akt.B) r.B = rest;
    return r;
  }
  function aktive(c) { const a = Object.assign({ A: true, B: true, C: true }, c.pDel || {}); if (!a.A && !a.B && !a.C) a.A = true; return a; }
  function sikreProve(c) {
    const akt = aktive(c), utg = c.utgave === 'tilrettelagt' ? 'tilrettelagt' : 'ordinaer', n = Number(c.pAntall) || (utg === 'tilrettelagt' ? 8 : 12);
    const sig = [c.tema, utg, c.seed, akt.A ? 1 : 0, akt.B ? 1 : 0, akt.C ? 1 : 0, n].join('|');
    if (P.sig === sig) return;
    Object.assign(P, { sig: sig, deler: { A: [], B: [], C: [] }, rest: {}, brukt: {}, teller: 0, endret: false, red: null, melding: '', key: c.tema, utgave: utg });
    const defs = DELER[utg], tell = fordel(n, akt, utg);
    defs.forEach(function (d) {
      P.rest[d.id] = d.apen ? åpneSpm(c.tema, c.seed, 8) : I.nivåItems(c.tema, d.niv, 24, c.seed + d.off);
    });
    defs.forEach(function (d) { for (let i = 0; i < tell[d.id]; i++) { const e = tegn(c, d); if (e) P.deler[d.id].push(e); } });
  }
  function romFor(d, c) { const f = PLASS[c.plass] === undefined ? 1 : PLASS[c.plass]; return Math.round((d.rom || 0) * f); }
  function linjerFor(d, c) { const f = PLASS[c.plass] === undefined ? 1 : PLASS[c.plass]; return f === 0 ? 1 : Math.max(2, Math.round((d.linjer || 3) * f)); }

  function byggProve(c) {
    sikreProve(c);
    const key = c.tema, tn = temaNavn(key), utg = P.utgave, defs = DELER[utg], akt = aktive(c), RB = M.regelbok && M.regelbok[key];
    const blokker = [{ t: 'tittel', tekst: 'Kapittelprøve: ' + esc(tn), under: esc(trinnTittel(key)) + ' · Tid: 60 minutter' }];
    if (c.navn) blokker.push({ t: 'navn' });
    if (utg === 'ordinaer') {
      let tekst = 'Vis utregninger og tankegang. Svar med enhet der det trengs.';
      if (akt.A) tekst += ' Del 1 løser du uten hjelpemidler.';
      if (akt.B || akt.C) tekst += ' Til ' + (akt.B && akt.C ? 'del 2 og del 3' : akt.B ? 'del 2' : 'del 3') + ' kan du bruke kalkulator hvis læreren sier det.';
      blokker.push({ t: 'p', html: tekst, liten: true });
    } else {
      blokker.push({ t: 'p', html: 'Ta det i ditt eget tempo. Vis hvordan du tenker. Du kan bruke boksene med hjelp og eksempel under.', liten: true });
      if (RB) {
        blokker.push({ t: 'boks', tittel: '🧠 Husk dette', rader: RB.regler.slice(0, 3).map(r => '<b>' + r[1] + ':</b> ' + r[2]), farge: 'FFF2CC' });
        const e = RB.eks[0];
        blokker.push({ t: 'boks', tittel: '👀 Eksempel: ' + e[0], rader: e[1].map((s, i) => (i + 1) + '. ' + s).concat(['<b>Svar: ' + e[2] + '</b>']), farge: 'E1F6E8' });
      }
    }
    let tot = 0; defs.forEach(d => { if (akt[d.id]) tot += d.poeng * P.deler[d.id].length; });
    if (utg === 'ordinaer') blokker.push({ t: 'tekstlinje', html: '<b>Poeng: ______ / ' + tot + '</b>' });
    let nr = 1; const rader = [];
    defs.forEach(function (d) {
      if (!akt[d.id]) return;
      blokker.push({ t: 'h2', tekst: d.tittel, did: d.id });
      P.deler[d.id].forEach(function (e) {
        rader.push({ nr: nr, it: e.it, apen: !!d.apen, poeng: d.poeng });
        if (d.apen) blokker.push({ t: 'opp', id: e.uid, nr: nr++, html: e.it.q || '<i>(skriv oppgaven her)</i>', linjer: linjerFor(d, c), poeng: d.poeng });
        else blokker.push(tilOpp(e.it, nr++, { id: e.uid, rom: romFor(d, c), poeng: d.poeng, hjelp: d.hjelp }));
      });
    });
    const fasit = fasitBlokker(c, tn, rader, tot, utg, defs, akt);
    return { blokker: blokker, fasit: fasit };
  }

  /* Fasit og løsningsforslag for prøven slik den ser ut nå. Rekkefølge for hver oppgave:
     1) oppgaver som er skrevet om og kan regnes ut (uttrykk og likninger): beregnet svar og løsningsforslag
     2) oppgaver fra banken: svar og løsningsforslag fra banken
     3) egne oppgaver: lærerens fasit, eller en tydelig merknad om at fasit mangler */
  function fasitFor(it) {
    const funnet = it.endret || it.egen ? løs(it.q) : null;
    if (funnet) {
      const lærer = it.a ? tilTekst(it.a).replace(/\s+/g, '') : '';
      const avvik = lærer && lærer !== funnet.svar.replace(/\s+/g, '') && M.parseNum(lærer.replace(/^x=/, '')) !== funnet.num;
      return { svar: funnet.svar, los: funnet.los + (avvik ? '<br><b>⚠ Du har skrevet «' + esc(tilTekst(it.a)) + '» som fasit, men utregningen gir ' + funnet.svar + '. Sjekk oppgaven.</b>' : ''), auto: true };
    }
    if (it.a) return { svar: it.a, los: it.los || (it.endret || it.egen ? '<i>Ingen automatisk løsning for denne oppgaven. Fasiten er skrevet av læreren.</i>' : '') };
    return { svar: '<b>⚠ Fasit mangler</b>', los: '<i>Skriv inn fasit under «Rediger» på prøven.</i>', mangler: true };
  }
  function fasitBlokker(c, tn, rader0, tot, utgave, defs, akt) {
    const b = [{ t: 'tittel', tekst: 'Fasit og løsningsforslag: ' + esc(tn), under: 'Kun for læreren · ' + esc(trinnTittel(c.tema)) }];
    const RB = M.regelbok && M.regelbok[c.tema];
    const rader = [['Oppgave', 'Svar', 'Løsningsforslag']]; let mangler = 0;
    rader0.forEach(function (r) {
      const q = esc(tilTekst(r.it.q).slice(0, 110)) + (tilTekst(r.it.q).length > 110 ? '…' : '');
      const hode = '<b>' + r.nr + '.</b> ' + (q || '<i>(tom oppgave)</i>') + (r.poeng ? ' <i>(' + r.poeng + ' p)</i>' : '');
      if (r.apen) {
        const ord = RB && RB.ord ? RB.ord.slice(0, 4).map(o => o[0]).join(', ') : '';
        rader.push([hode, 'Åpen oppgave', 'Se etter: riktig bruk av begreper og regler, en utregning eller tegning som støtter forklaringen, og et konkret eksempel.' + (ord ? ' Sentrale begreper: ' + esc(ord) + '.' : '') + (r.it.a ? '<br><b>Lærerens notat:</b> ' + r.it.a : '')]);
      } else {
        const f = fasitFor(r.it); if (f.mangler) mangler++;
        rader.push([hode, f.svar + (r.it.enhet && !f.auto && !/\s/.test(String(f.svar)) ? '' : ''), f.los || '']);
      }
    });
    b.push({ t: 'tabell', rader: rader });
    if (mangler) b.push({ t: 'p', html: '<b>⚠ ' + mangler + ' oppgave' + (mangler > 1 ? 'r' : '') + ' mangler fasit.</b> Åpne «Rediger» ved oppgaven og skriv inn svaret, så kommer det med her.', liten: true });
    if (utgave === 'ordinaer') {
      b.push({ t: 'h2', tekst: 'Poeng og vurderingsforslag' });
      const per = defs.filter(d => akt[d.id] && P.deler[d.id].length).map(d => d.kort.charAt(0).toUpperCase() + d.kort.slice(1) + ': ' + P.deler[d.id].length + ' oppgave' + (P.deler[d.id].length > 1 ? 'r' : '') + ' × ' + d.poeng + ' p = ' + P.deler[d.id].length * d.poeng + ' p');
      b.push({ t: 'liste', items: per.concat(['<b>Maks ' + tot + ' poeng.</b> Gi delpoeng for riktig metode, selv om svaret er feil.']) });
      const g = (p) => Math.round(tot * p);
      b.push({ t: 'tabell', rader: [['Andel', 'Poeng', 'Tolkning (forslag)'], ['90–100 %', g(.9) + '–' + tot, 'Høy måloppnåelse'], ['75–89 %', g(.75) + '–' + (g(.9) - 1), 'Mye over middels'], ['60–74 %', g(.6) + '–' + (g(.75) - 1), 'God måloppnåelse'], ['45–59 %', g(.45) + '–' + (g(.6) - 1), 'Middels måloppnåelse'], ['30–44 %', g(.3) + '–' + (g(.45) - 1), 'Noe måloppnåelse'], ['Under 30 %', '0–' + (g(.3) - 1), 'Lav måloppnåelse']] });
      b.push({ t: 'p', html: 'Dette er et forslag. Bruk dine egne vurderingskriterier og kompetansemålene for trinnet.', liten: true });
    } else {
      b.push({ t: 'h2', tekst: 'Forslag til vurdering' });
      b.push({ t: 'liste', items: ['Se på om eleven viser metoden, ikke bare svaret.', 'Gi tilbakemelding på én ting eleven mestrer, og ett neste steg.', 'Eleven kan få oppgavene lest opp, og bruke tallinje, gangetabell eller regelboka.', 'Den åpne oppgaven kan besvares muntlig.'] });
    }
    return b;
  }

  /* ---------- redigering på siden ---------- */
  function finn(uid) { for (const id of ['A', 'B', 'C']) { const i = P.deler[id].findIndex(e => e.uid === uid); if (i >= 0) return { del: id, i: i, e: P.deler[id][i] }; } return null; }
  function defFor(id) { return DELER[P.utgave].find(d => d.id === id); }
  function cNå() { return I.cfg(); }
  const HANDLING = {
    fjern: function (uid) { const f = finn(uid); if (f) { P.deler[f.del].splice(f.i, 1); P.endret = true; if (P.red === uid) P.red = null; } },
    bytt: function (uid) {
      const f = finn(uid); if (!f) return; const d = defFor(f.del), e = tegn(cNå(), d);
      if (e) { f.e.it = e.it; P.endret = true; if (P.red === uid) P.red = null; } else P.melding = 'Fant ingen flere ' + (d.apen ? 'åpne spørsmål' : 'oppgaver') + ' å bytte med. Bruk «Rediger» og skriv selv.';
    },
    ny: function (id) {
      const d = defFor(id), e = tegn(cNå(), d);
      if (e) { P.deler[id].push(e); P.endret = true; } else P.melding = 'Fant ingen flere ' + (d.apen ? 'åpne spørsmål' : 'oppgaver') + ' i banken. Bruk «Egen oppgave».';
    },
    egen: function (id) { const d = defFor(id), e = { uid: ++P.uid, it: d.apen ? { q: '', apen: true, a: '' } : { q: '', type: 'tall', a: '', egen: true } }; P.deler[id].push(e); P.red = e.uid; P.endret = true; },
    rediger: function (uid) { P.red = uid; },
    avbryt: function (uid) { const f = finn(uid); if (f && f.e.it.egen !== undefined && !f.e.it.q) P.deler[f.del].splice(f.i, 1); else if (f && f.e.it.apen && !f.e.it.q) P.deler[f.del].splice(f.i, 1); P.red = null; },
    lagre: function (uid, rot) {
      const f = finn(uid); if (!f) return; const it = f.e.it;
      const nyQ = fraTekst(rot.querySelector('.red-q').value); if (nyQ !== it.q) it.endret = true; it.q = nyQ;
      const a = rot.querySelector('.red-a'); if (a) it.a = fraTekst(a.value);
      if (a && !it.a && !it.apen) { const l = løs(it.q); if (l) it.a = esc(l.svar); }
      const v = rot.querySelector('.red-valg');
      if (v) {
        it.valg = v.value.split('\n').map(x => x.trim()).filter(Boolean).map(x => fraTekst(x));
        const bk = (rot.querySelector('.red-riktig').value || 'a').trim().toLowerCase().charCodeAt(0) - 97;
        const bi = Math.max(0, Math.min(it.valg.length - 1, bk)); it.a = String.fromCharCode(97 + bi) + ') ' + it.valg[bi];
      }
      if (it.egen) { it.type = it.valg ? 'valg' : 'tall'; }
      P.red = null; P.endret = true;
    }
  };
  function editorHTML(e, d) {
    const it = e.it, apen = !!d.apen;
    return '<div class="red-boks" data-uid="' + e.uid + '"><label>Oppgaveteksten<textarea class="red-q" rows="3">' + esc(tilTekst(it.q)) + '</textarea></label>' +
      (it.type === 'valg' && it.valg ? '<label>Svaralternativer (ett per linje)<textarea class="red-valg" rows="4">' + esc(it.valg.map(tilTekst).join('\n')) + '</textarea></label><label>Riktig alternativ (a, b, c …)<input class="red-riktig" maxlength="1" value="' + esc((it.a || 'a')[0]) + '"></label>'
        : apen ? '' : '<label>Fasit (kun lærerarket)<span class="red-a-rad"><input class="red-a" value="' + esc(tilTekst(it.a)) + '"> <button type="button" class="knapp liten" data-red="regn">🧮 Foreslå fasit</button></span></label>') +
      '<p class="red-tips">Tips: Skriv vanlige tegn. «-5» blir −5 og «*» blir ·. Fasit og løsningsforslag lages automatisk for regnestykker og likninger («Regn ut …», «3x + 5 = 20»). For andre oppgaver skriver du fasiten selv.</p>' +
      '<div class="red-knapper"><button type="button" class="knapp primær liten" data-red="lagre" data-uid="' + e.uid + '">✔ Lagre</button> <button type="button" class="knapp liten" data-red="avbryt" data-uid="' + e.uid + '">Avbryt</button></div></div>';
  }
  /* legger redigeringsknapper på forhåndsvisningen (vises aldri på utskrift eller i Word) */
  function etter(el) {
    el.classList.add('redigerbar');
    if (P.melding) { const m = document.createElement('p'); m.className = 'red-melding'; m.setAttribute('role', 'status'); m.textContent = P.melding; el.insertBefore(m, el.firstChild); P.melding = ''; }
    const info = document.createElement('p'); info.className = 'red-info lesbar';
    info.innerHTML = '✏️ <b>Du kan redigere prøven her før du skriver ut.</b> Bruk knappene ved hver oppgave for å bytte, skrive om eller fjerne den, og «➕» under hver deloverskrift for å legge til. Endrer du valgene over (tema, utgave, deler eller antall), lages prøven på nytt.' + (P.endret ? ' <span class="red-endret">Prøven er endret.</span>' : '');
    el.insertBefore(info, el.firstChild);
    el.querySelectorAll('h2[data-did]').forEach(function (h) {
      const d = defFor(h.dataset.did); if (!d) return;
      const bar = document.createElement('div'); bar.className = 'red-verktoy red-del';
      bar.innerHTML = '<span>Legg til i denne delen:</span> <button type="button" class="knapp liten" data-red="ny" data-did="' + d.id + '">➕ ' + (d.apen ? 'Åpent spørsmål' : 'Oppgave fra banken') + '</button> <button type="button" class="knapp liten" data-red="egen" data-did="' + d.id + '">➕ Egen oppgave</button>';
      h.insertAdjacentElement('afterend', bar);
    });
    el.querySelectorAll('.dok-opp[data-oid]').forEach(function (o) {
      const uid = Number(o.dataset.oid), f = finn(uid); if (!f) return;
      const bar = document.createElement('div'); bar.className = 'red-verktoy red-opp';
      bar.innerHTML = '<button type="button" class="knapp liten" data-red="rediger" data-uid="' + uid + '">✏️ Rediger</button><button type="button" class="knapp liten" data-red="bytt" data-uid="' + uid + '">🔄 Bytt ut</button><button type="button" class="knapp liten" data-red="fjern" data-uid="' + uid + '">✕ Fjern</button>';
      const q0 = o.querySelector('.dok-q'); q0.insertAdjacentElement('afterend', bar);
      if (P.red === uid) { q0.insertAdjacentHTML('afterend', editorHTML(f.e, defFor(f.del))); bar.hidden = true; const q = o.querySelector('.red-q'); if (q) setTimeout(() => q.focus({ preventScroll: true }), 30); }
    });
  }
  document.addEventListener('click', function (e) {
    const k = e.target.closest('[data-red]'); if (!k || !k.closest('.ark-forh')) return;
    const h = k.dataset.red, uid = k.dataset.uid ? Number(k.dataset.uid) : null;
    if (h === 'regn') {
      const rot = k.closest('.red-boks'), l = løs(fraTekst(rot.querySelector('.red-q').value)), tips = rot.querySelector('.red-tips');
      if (l) { rot.querySelector('.red-a').value = l.svar; tips.textContent = '✔ Fasit foreslått ut fra oppgaveteksten.'; } else tips.textContent = 'Fant ikke noe jeg kan regne ut automatisk i denne oppgaven. Skriv fasiten selv.';
      return;
    }
    if (h === 'ny' || h === 'egen') HANDLING[h](k.dataset.did);
    else if (h === 'lagre') HANDLING.lagre(uid, k.closest('.red-boks'));
    else if (HANDLING[h]) HANDLING[h](uid);
    I.forhand();
  });

  const kapittel = {
    id: 'kapittel', laast: true, ikon: '📘', navn: 'Kapittelprøve', kort: 'Full prøve for temaet, ordinær eller tilrettelagt. Du kan redigere oppgavene før utskrift. Word-nedlasting.',
    felt: ['tema', 'plass', 'navn'],
    eget: function (S, h) {
      const utg = S.utgave === 'tilrettelagt' ? 'tilrettelagt' : 'ordinaer', def = DELER[utg];
      return h.sel('ark-utgave', 'Utgave', [['ordinaer', 'Ordinær prøve (60 min, med poeng)'], ['tilrettelagt', 'Tilrettelagt prøve (enklere, med hjelp)']], utg) +
        h.sel('ark-pantall', 'Antall oppgaver', [[6, '6'], [8, '8'], [10, '10'], [12, '12'], [14, '14'], [16, '16'], [20, '20']], S.pAntall) +
        '<fieldset class="ark-felt ark-deler"><legend>Deler som skal være med</legend>' + def.map(d => '<label class="ark-chk"><input type="checkbox" id="ark-del' + d.id + '"' + (S.pDel[d.id] ? ' checked' : '') + '> ' + d.kort + '</label>').join('') + '</fieldset>';
    },
    les: function (g, S) {
      if (g('ark-utgave') && g('ark-utgave').value !== S.utgave) { S.utgave = g('ark-utgave').value; S.pAntall = S.utgave === 'tilrettelagt' ? 8 : 12; S._refelt = true; return; }
      if (g('ark-pantall')) S.pAntall = Number(g('ark-pantall').value);
      ['A', 'B', 'C'].forEach(id => { if (g('ark-del' + id)) S.pDel[id] = g('ark-del' + id).checked; });
      if (!S.pDel.A && !S.pDel.B && !S.pDel.C) { S.pDel.A = true; S._refelt = true; }
    },
    fot: fotKapittel, etter: etter, erEndret: () => P.endret,
    modell: function (c) { return byggProve(c).blokker; },
    fasitModell: function (c) { return byggProve(c).fasit; },
    fasitFot: function (c) { return 'Fasit og løsningsforslag: ' + D.tekst(temaNavn(c.tema)); },
    fasitHTML: function (c) { return D.html(byggProve(c).fasit, { fot: 'Fasit og løsningsforslag: ' + D.tekst(temaNavn(c.tema)) }); },
    forhandMer: function (c) { return '<div class="fasit-skille"><b>🔑 Fasit og løsningsforslag for prøven over</b><br>Oppdateres automatisk når du endrer prøven. Last ned eller skriv ut med knappene «Fasit …» over forhåndsvisningen.</div>' + D.html(byggProve(c).fasit, { fot: 'Fasit og løsningsforslag' }); },
    bygg: function (c) { return D.html(byggProve(c).blokker, { fot: fotKapittel(c) }); }
  };
  I.kapittelProve = P;

  /* ---------- Regelbok ---------- */
  function sideTittel(key, del) { return { t: 'tittel', tekst: '📒 Regelbok: ' + esc(temaNavn(key)), under: esc(trinnTittel(key)) + (del ? ' · ' + del : '') }; }
  function regelBlokker(key, omfang) {
    const RB = M.regelbok && M.regelbok[key]; if (!RB) return [];
    const b = [sideTittel(key, omfang === 'full' ? 'side 1' : '')];
    b.push({ t: 'p', html: '<b>Dette handler om:</b> ' + RB.kort });
    b.push({ t: 'h2', tekst: 'Reglene' });
    RB.regler.forEach((r, i) => b.push({ t: 'boks', tittel: r[0] + ' ' + r[1], rader: [r[2]], farge: FARGER[i % FARGER.length] }));
    const eks = (e, i) => {
      b.push({ t: 'boks', tittel: '👀 Eksempel ' + (i + 1) + ': ' + e[0], rader: e[1].map((s, k) => (k + 1) + '. ' + s).concat(['<b>Svar: ' + e[2] + '</b>']), farge: 'F4F6FA' });
    };
    if (omfang !== 'full') {
      b.push({ t: 'h2', tekst: 'Eksempel' }); eks(RB.eks[0], 0);
      b.push({ t: 'boks', tittel: '⚠️ Pass opp', rader: RB.pass, liste: true, farge: 'FFE0D1' });
      return b;
    }
    if (RB.trick) b.push({ t: 'boks', tittel: '💡 Huskeregel', rader: [RB.trick], farge: 'FFF9C4' });
    b.push({ t: 'boks', tittel: '⚠️ Pass opp', rader: RB.pass, liste: true, farge: 'FFE0D1' });
    b.push({ t: 'side' }); b.push(sideTittel(key, 'side 2'));
    b.push({ t: 'h2', tekst: 'Eksempler med utregning' });
    RB.eks.forEach(eks);
    if (RB.ord && RB.ord.length) { b.push({ t: 'h2', tekst: 'Ord og begreper' }); b.push({ t: 'tabell', rader: [['Ord', 'Betyr']].concat(RB.ord.map(o => ['<b>' + o[0] + '</b>', o[1]])) }); }
    if (RB.test && RB.test.length) { b.push({ t: 'h2', tekst: 'Test deg selv' }); b.push({ t: 'tabell', rader: [['Spørsmål', 'Svar (skjul og prøv først)']].concat(RB.test.map(o => [o[0], o[1]])) }); }
    return b;
  }
  function byggRegelbok(c) {
    const nøkler = c.heleTrinn ? temaer(c.trinn) : [c.tema];
    let b = [];
    nøkler.forEach((k, i) => { const x = regelBlokker(k, c.omfang); if (x.length) { if (i && b.length) b.push({ t: 'side' }); b = b.concat(x); } });
    return b;
  }
  function fotRegel(c) { return c.heleTrinn ? 'Regelbok · ' + c.trinn + '. trinn' : 'Regelbok: ' + D.tekst(temaNavn(c.tema)); }
  const regelbok = {
    id: 'regelbok', ikon: '📒', navn: 'Regelbok', kort: 'Regler, eksempler og «pass opp» for temaet, 1–2 sider. Også for hele trinnet. Kan lastes ned som Word.',
    felt: ['temaTrinn'],
    eget: function (S, h) { return h.sel('ark-omfang', 'Omfang', [['full', 'To sider: regler, eksempler, begreper og selvtest'], ['kort', 'Én side: regler, ett eksempel og «pass opp»']], S.omfang); },
    les: function (g, S) { if (g('ark-omfang')) S.omfang = g('ark-omfang').value; },
    fot: fotRegel, modell: byggRegelbok,
    bygg: function (c) { return D.html(byggRegelbok(c), { fot: fotRegel(c) }); }
  };

  M.arkRegistrer(kapittel, 'test');
  M.arkRegistrer(regelbok, 'husk');
  M.byggProve = byggProve; M.byggRegelbok = byggRegelbok; M.regelBlokker = regelBlokker;
})();
