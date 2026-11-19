/* Test av opptreningen før fritekst: node tests/les-begrunn-test.js
   - alle byggeoppgaver (3 trinn × 3 nivåer × 2): feil først, så riktig, med flere riktige kombinasjoner
   - ordøvelser, eksempelsvar, leseintro, og at alle ruter har minst to riktige brikker */
'use strict';
const fs = require('fs'); const path = require('path');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/npm-tools/node_modules/playwright'); }
const root = path.join(__dirname, '..');
let feil = 0; const f = m => { feil++; console.log('  ✗ ' + m); };
(async () => {
  const b = await pw.chromium.launch({ executablePath: fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1000, height: 1000 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  let n = 0;
  for (const t of [8, 9, 10]) for (const niv of ['rolig', 'vanlig', 'utfordring']) {
    n++;
    await p.goto('file://' + root + '/index.html#/les/begrunn/' + t); await p.waitForTimeout(100);
    await p.evaluate(v => MATTE.settNivå(v), niv); await p.waitForTimeout(120);
    const r = await p.evaluate(() => {
      const M = window.MATTE, out = [], main = document.getElementById('main'); const $$ = (e, s) => Array.from(e.querySelectorAll(s));
      const trinn = M.les.sistTrinn, niv = ['rolig', 'vanlig', 'utfordring'][M.nivåNr()], D = M.les.bx.data[trinn];
      if (!main.querySelector('.les-ordbank')) out.push('mangler ordbank');
      if ($$(main, '.les-ordniv').length !== 3) out.push('ordbanken har ikke tre nivåer');
      if (!main.querySelector('.les-ordniv.na')) out.push('nivået er ikke markert i ordbanken');
      if ($$(main, '.les-del').length !== 4) out.push('eksempelsvaret har ikke fire deler');
      if (!main.querySelector('.les-se .les-svakt')) out.push('mangler «svakt svar»');
      if (!main.querySelector('.les-signal')) out.push('signalord er ikke utheva');
      // ordøvelser
      $$(main, '.les-ordtr').forEach(k => { const mc = k.querySelector('.les-mc'); const ok = mc.querySelector('[data-ok="1"]'); mc.querySelector('[data-ok="0"]').click(); ok.click(); if (!mc.querySelector('.les-mc-svar').innerText.includes('Riktig')) out.push('ordøvelse ga ikke riktig-melding'); });
      // byggeoppgaver
      const kort = $$(main, '.les-bygg-kort'); if (kort.length !== D.bygg[niv].length) out.push('feil antall byggeoppgaver');
      kort.forEach((k, i) => {
        const o = D.bygg[niv][i];
        const pool = () => $$(k, '.les-brikke'); const rut = () => $$(k, '.les-rute');
        const ta = tekst => { const br = pool().find(x => x.textContent === tekst); if (!br) { out.push('fant ikke brikke ' + tekst); return false; } br.click(); return true; };
        const sjekk = () => k.querySelector('.les-bygg-sjekk').click();
        // 1) tom sjekk: ingen riktig-melding
        sjekk(); if (k.dataset.ferdig) out.push('tom setning godkjent');
        // 2) feil: legg en gal brikke i hver rute der det finnes en
        const gale = o.brikker.filter(x => !x.ok.length);
        rut().forEach((r, s) => { const g = gale[s % gale.length]; if (ta(g.t)) r.click(); });
        sjekk(); if (k.dataset.ferdig) out.push('feil setning godkjent'); if (!k.querySelector('.les-resultat').innerText.includes('av ' + o.ruter.length)) out.push('mangler tellemelding');
        if (!k.querySelector('.les-rute.feil')) out.push('ingen rute merket feil');
        if (niv === 'utfordring' && /Prøv å bytte/.test(k.querySelector('.les-resultat').innerText) === false) out.push('utfordring skulle holde igjen hint første gang');
        sjekk(); const hintTekst = k.querySelector('.les-resultat').innerText; if (!/:/.test(hintTekst)) out.push('ingen hint etter andre sjekk');
        // 3) rydd og bygg riktig – med alternativ nummer to der det finnes
        k.querySelector('.les-bygg-reset').click();
        [0, 1].forEach(alt => {
          k.querySelector('.les-bygg-reset').click();
          o.ruter.forEach((r, s) => { const ok = o.brikker.filter(x => x.ok.indexOf(s) >= 0); const valg = ok[Math.min(alt, ok.length - 1)]; if (ta(valg.t)) rut()[s].click(); });
          sjekk();
          if (!k.dataset.ferdig) out.push('riktig setning ikke godkjent (valg ' + alt + ')');
          const bygd = k.querySelector('.les-bygd'); if (bygd.hidden || bygd.textContent.length < 20 || /…|undefined/.test(bygd.textContent)) out.push('sammensatt setning ser feil ut: ' + bygd.textContent);
          if (!/\.$/.test(bygd.textContent)) out.push('setningen mangler punktum');
        });
        // 4) ta ut en brikke igjen
        rut()[0].click(); if (rut()[0].classList.contains('fylt')) out.push('brikke ble ikke tatt ut'); if (k.dataset.ferdig) out.push('ferdig-merket ble stående etter endring');
      });
      return out;
    });
    r.forEach(m => f(t + '/' + niv + ': ' + m));
  }
  // leseintro
  for (const t of [8, 9, 10]) {
    n++;
    await p.goto('file://' + root + '/index.html#/les/tekst/' + t); await p.waitForTimeout(150);
    const r = await p.evaluate(() => {
      const out = [], root = document.querySelector('.les-intro'); if (!root) return ['mangler leseintro'];
      const neste = root.querySelector('.les-intro-neste'); const marks = () => ['m-s', 'm-t', 'm-u'].map(c => root.querySelectorAll('.' + c).length);
      if (marks().some(x => x)) out.push('markeringer vises før steg 1');
      neste.click(); if (marks().some(x => x)) out.push('steg 1 skal ikke markere');
      neste.click(); let m = marks(); if (!(m[0] > 0 && m[1] === 0 && m[2] === 0)) out.push('steg 2 skal markere bare spørsmålet');
      neste.click(); m = marks(); if (!(m[0] > 0 && m[1] > 0 && m[2] === 0)) out.push('steg 3 skal legge til tall');
      neste.click(); m = marks(); if (!(m[0] > 0 && m[1] > 0 && m[2] > 0)) out.push('steg 4 skal legge til unødvendig');
      if (!root.querySelector('.les-intro-plan').hidden) out.push('plan vises for tidlig');
      neste.click(); if (root.querySelector('.les-intro-plan').hidden) out.push('plan vises ikke i steg 5');
      root.querySelector('.les-intro-reset').click(); if (marks().some(x => x)) out.push('fra start nullstiller ikke');
      return out;
    });
    r.forEach(m => f('leseintro ' + t + ': ' + m));
  }
  if (errs.length) f('konsollfeil: ' + errs.slice(0, 3).join(' | '));
  console.log(n + ' kombinasjoner testet, ' + feil + ' feil');
  await b.close(); process.exit(feil ? 1 : 0);
})();
