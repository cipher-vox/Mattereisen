/* ============================================================
   Utskriftsark for «Les, tolk og begrunn»:
   - Før pent og rett: malen for hvordan oppgaver føres, med god og dårlig føring og blanke malark
   - Les og tolk: tekst- og grafoppgaver å skrive ut, med fasit
   - Sparringskort: påstandskort og roller til samtale i par eller grupper
   Alt bygges i nettleseren. Ingenting lagres.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE, I = M.arkInt, D = M.dok, esc = I.esc;
  const NIV = ['rolig', 'vanlig', 'utfordring'];
  const mono = s => '<span style="font-family:ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap">' + esc(s) + '</span>';
  const data = c => (M.les.data[Number(c.trinn)] || M.les.data[8]);
  const nivNavn = n => ({ rolig: '🌱 Rolig', vanlig: '🌿 Vanlig', utfordring: '🚀 Utfordring' }[n]);

  /* ---------- Før pent og rett ---------- */
  function byggForing(c) {
    const d = data(c), f = d.foring, niv = c.nivå || 'vanlig', b = [];
    b.push({ t: 'tittel', tekst: 'Før pent og rett', under: c.trinn + '. trinn · mal for føring i boka og på prøver' });
    b.push({ t: 'p', html: 'Bruk denne malen når du løser oppgaver. Du trenger ikke alle delene i alle oppgaver, men jo mer du viser, jo lettere er det å finne feil, og jo mer kan læreren gi poeng for.' });
    b.push({ t: 'tabell', rader: [['Del', 'Hva skal stå der?', 'Eksempel']].concat(f.mal.map(r => ['<b>' + esc(r.navn) + '</b>', esc(r.hva), mono(r.eks)])) });
    b.push({ t: 'boks', tittel: '📐 Fem faste regler', liste: true, farge: 'E8F0FF', rader: f.regler.map(r => esc(r).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')) });
    (f.sammenlign[niv] || f.sammenlign.vanlig).slice(0, 1).forEach(s => {
      b.push({ t: 'h2', tekst: 'Slik ikke – slik ja' }); b.push({ t: 'p', html: '<b>Oppgave:</b> ' + esc(s.oppg) });
      b.push({ t: 'tabell', rader: [['❌ Slik ikke', '✅ Slik ja'], [mono(s.darlig.join('\n')) + '<br><br>' + s.feil.map(x => '• ' + esc(x)).join('<br>'), mono(s.bra.join('\n'))]] });
    });
    b.push({ t: 'side' });
    b.push({ t: 'tittel', tekst: 'Min føring', under: 'Bruk malen. Én oppgave per boks.' }); b.push({ t: 'navn' });
    for (let i = 0; i < 2; i++) {
      b.push({ t: 'boks', tittel: 'Oppgave nr. ______', farge: 'FFFFFF', rader: f.mal.slice(1).map(r => '<b>' + esc(r.navn) + ':</b> <span style="display:inline-block;border-bottom:1px solid #999;width:70%">&nbsp;</span>' + (r.navn === 'Utregning' ? '<br><br><span style="display:block;border-bottom:1px solid #bbb">&nbsp;</span><span style="display:block;border-bottom:1px solid #bbb;margin-top:6mm">&nbsp;</span>' : '')) });
    }
    b.push({ t: 'boks', tittel: '✅ Sjekkliste før du leverer', liste: true, farge: 'E1F6E8', rader: f.sjekkliste.map(x => '☐ ' + esc(x)) });
    return b;
  }
  M.arkRegistrer({
    id: 'foring', ikon: '✍️', navn: 'Før pent og rett', kort: 'Mal for hvordan oppgaver føres i boka og på prøver, med god og dårlig føring og blanke malark.',
    felt: ['trinn', 'nivå'],
    bygg: c => D.html(byggForing(c), { fot: 'Før pent og rett · ' + c.trinn + '. trinn' })
  }, 'feil');

  /* ---------- Les og tolk ---------- */
  /* Flytter riktig svar til en fast, men varierende plass, slik at det ikke alltid står på a) */
  function plasser(valg, nr) {
    const v = valg.slice(), i = v.findIndex(x => x[1]), k = nr % v.length, r = v.splice(i, 1)[0];
    v.splice(k, 0, r); return { valg: v.map(x => esc(x[0])), ok: 'abcd'[k] };
  }
  const slutt = t => t.replace(/[.!?\s]+$/, '');
  function ren(s) { return s.replace(/\[\[(?:t|s|u)\|([^\]]+)\]\]/g, '$1'); }
  function liste(s, k) { const r = []; s.replace(/\[\[(t|s|u)\|([^\]]+)\]\]/g, (m, kk, t) => { if (kk === k) r.push(t); return m; }); return r; }
  function byggLes(c) {
    const d = data(c), niv = c.nivå || 'vanlig', b = [], fasit = [];
    b.push({ t: 'tittel', tekst: 'Les og tolk · ' + c.trinn + '. trinn', under: nivNavn(niv) }); b.push({ t: 'navn' });
    b.push({ t: 'boks', tittel: 'Slik gjør du', farge: 'FFF9C4', liste: true, rader: ['Les teksten to ganger.', 'Ring rundt <b>tall og enheter</b>.', 'Understrek <b>det oppgaven spør om</b>.', 'Kryss ut det som <b>ikke trengs</b>.', 'Svar på spørsmålet under.'] });
    let nr = 1;
    (d.tekst[niv] || []).forEach(it => {
      const pl = plasser(it.spm.valg, nr);
      b.push({ t: 'opp', nr: nr, html: '<b>' + esc(it.tittel) + '.</b> ' + esc(ren(it.tekst)) + '<br><i>' + esc(it.spm.q) + '</i>', valg: pl.valg, linjer: 2 });
      fasit.push('<b>' + nr + '.</b> Tall og enheter: ' + (liste(it.tekst, 't').map(esc).join(', ') || '–') + '. Spørsmål: ' + (liste(it.tekst, 's').map(x => esc(slutt(x))).join(', ')) + '. Unødvendig: ' + (liste(it.tekst, 'u').map(x => esc(slutt(x))).join(', ') || '–') + '. <b>Riktig: ' + pl.ok + ')</b> ' + esc(it.spm.forkl));
      nr++;
    });
    (d.graf[niv] || []).forEach(it => {
      b.push({ t: 'h2', tekst: it.tittel }); if (it.tekst) b.push({ t: 'p', html: esc(it.tekst) });
      b.push({ t: 'p', html: '<div style="max-width:120mm">' + M.les.grafSvg(it.graf, true) + '</div>' });
      it.oppg.forEach(o => {
        if (o.t === 'klikk') { b.push({ t: 'opp', nr: nr, html: esc(o.q.replace(/^Trykk på/, 'Ring rundt')) + ' <i>(Ring rundt i grafen.)</i>' }); fasit.push('<b>' + nr + '.</b> ' + esc(o.forkl)); }
        else { const pl = plasser(o.valg, nr); b.push({ t: 'opp', nr: nr, html: esc(o.q), valg: pl.valg }); fasit.push('<b>' + nr + '.</b> <b>' + pl.ok + ')</b> ' + esc(o.forkl)); }
        nr++;
      });
    });
    if (c.fasit !== 'ingen') { b.push({ t: 'side' }); b.push({ t: 'tittel', tekst: 'Fasit: Les og tolk', under: c.trinn + '. trinn · ' + nivNavn(niv) }); b.push({ t: 'liste', items: fasit }); }
    return b;
  }
  M.arkRegistrer({
    id: 'les', ikon: '🔎', navn: 'Les og tolk', kort: 'Tekst- og grafoppgaver å skrive ut: ring rundt, understrek og kryss ut. Fasit på eget ark.',
    felt: ['trinn', 'nivå', 'fasit'],
    bygg: c => D.html(byggLes(c), { fot: 'Les og tolk · ' + c.trinn + '. trinn' })
  }, 'foring');

  /* ---------- Sparringskort ---------- */
  function byggSparring(c) {
    const d = data(c), niv = c.nivå || 'vanlig', b = [], p = d.diskusjon.pastander[niv] || [];
    b.push({ t: 'tittel', tekst: 'Sparringskort · ' + c.trinn + '. trinn', under: nivNavn(niv) });
    b.push({ t: 'p', html: 'Klipp ut kortene. Tre roller: <b>🛡️ forsvarer</b> (sier hva du mener og hvorfor), <b>🔍 utfordrer</b> (spør) og <b>📝 observatør</b> (lytter). Bytt rolle etter hver påstand.' });
    b.push({ t: 'tabell', hode: false, rader: [p.concat(d.diskusjon.hvem[niv] || []).slice(0, 4).map((o, i) => '<b>Kort ' + (i + 1) + '</b><br>' + (o.pastand ? esc(o.pastand) + '<br><br>P – Jeg mener at …<br>B – fordi …<br>E – for eksempel …' : esc(o.q) + '<br><br><i>' + esc(o.a.navn) + ':</i> ' + esc(o.a.tekst) + '<br><i>' + esc(o.b.navn) + ':</i> ' + esc(o.b.tekst) + '<br><br>Hvem har rett, og hvorfor?'))] });
    b.push({ t: 'boks', tittel: '🔍 Utfordreren kan spørre', liste: true, farge: 'E8F0FF', rader: d.diskusjon.sparring.map(esc) });
    b.push({ t: 'boks', tittel: '🧱 Setningsstartere', liste: true, farge: 'FFF9C4', rader: d.begrunn.startere.map(esc) });
    if (c.fasit !== 'ingen') {
      b.push({ t: 'side' }); b.push({ t: 'tittel', tekst: 'Lærerark: sparringskort', under: c.trinn + '. trinn · ' + nivNavn(niv) });
      p.forEach((o, i) => b.push({ t: 'boks', tittel: 'Påstand: ' + esc(o.pastand), farge: 'F4F6FA', rader: ['<b>For:</b> ' + esc(o.for), '<b>Mot:</b> ' + esc(o.mot), '<b>Hva stemmer?</b> ' + esc(o.forkl)] }));
      (d.diskusjon.hvem[niv] || []).forEach(o => b.push({ t: 'boks', tittel: 'Hvem har rett? ' + esc(o.q), farge: 'F4F6FA', rader: [esc(o.a.navn) + ': ' + esc(o.a.tekst), esc(o.b.navn) + ': ' + esc(o.b.tekst), '<b>Fasit:</b> ' + esc(o.forkl)] }));
    }
    return b;
  }
  M.arkRegistrer({
    id: 'sparring', ikon: '🗣️', navn: 'Sparringskort', kort: 'Påstandskort, roller og spørsmål for samtale i par eller grupper. Lærerark med forslag til svar.',
    felt: ['trinn', 'nivå', 'fasit'],
    bygg: c => D.html(byggSparring(c), { fot: 'Sparringskort · ' + c.trinn + '. trinn' })
  }, 'les');
})();
