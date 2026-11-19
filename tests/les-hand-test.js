/* Test av håndskrevne føringseksempler: node tests/les-hand-test.js */
'use strict';
const fs = require('fs'); const path = require('path');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/npm-tools/node_modules/playwright'); }
const root = path.join(__dirname, '..');
let feil = 0; const f = m => { feil++; console.log('  ✗ ' + m); };
(async () => {
  const b = await pw.chromium.launch({ executablePath: fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1100, height: 900 } }); const errs = []; let n = 0;
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  for (const w of [1100, 390]) for (const t of [8, 9, 10]) {
    n++; await p.setViewportSize({ width: w, height: 900 });
    await p.goto('file://' + root + '/index.html#/les/foring/' + t); await p.waitForTimeout(150);
    const r = await p.evaluate(() => {
      const out = [], main = document.getElementById('main'); const $$ = (e, s) => Array.from(e.querySelectorAll(s));
      if (document.body.scrollWidth - window.innerWidth > 0) out.push('vannrett rulling');
      if (!document.fonts.check('20px "Patrick Hand"')) out.push('håndskriftfonten er ikke lastet');
      const vis = $$(main, '.hs-visning'); if (vis.length !== 3) out.push('ikke tre eksempelsider');
      if (!main.querySelector('.les-hs-feil')) out.push('mangler finn-feilene');
      const tekst = main.querySelector('.les-hs').innerText + main.querySelector('.les-hs-feil').innerText;
      if (/\{\{|\}\}|<<|>>|==|~~|%%|undefined/.test(tekst)) out.push('rå merking i teksten');
      $$(main, '.hs-fane').forEach((fa, i) => {
        fa.click(); if (vis.filter(v => !v.hidden).length !== 1 || vis[i].hidden) out.push('fane ' + i + ' viser feil side');
        const v = vis[i], side = v.querySelector('.hs-side');
        const noter = $$(v, '.hs-note'); if (noter.length < 5) out.push('for få forklaringer på side ' + i);
        noter.forEach(nb => { nb.click(); const id = nb.dataset.n; const akt = side.querySelectorAll('.hs-n.akt').length; if (!akt && id !== '1') out.push('side ' + i + ': forklaring ' + id + ' lyser ikke opp noe'); if (id === '1' && !side.classList.contains('akt-marg')) out.push('marg lyser ikke'); nb.click(); if (side.querySelector('.hs-n.akt')) out.push('forklaring kan ikke skrus av'); });
        // alle ids brukt på siden finnes i forklaringene
        const ids = new Set($$(side, '.hs-n').map(e => e.dataset.n)), noteIds = new Set(noter.map(x => x.dataset.n));
        ids.forEach(x => { if (!noteIds.has(x)) out.push('side ' + i + ': merking ' + x + ' mangler forklaring'); });
        noteIds.forEach(x => { if (!ids.has(x) && x !== '1') out.push('side ' + i + ': forklaring ' + x + ' har ingenting å peke på'); });
        v.querySelector('.hs-tall-knapp').click(); if (side.classList.contains('med-tall')) out.push('tall kan ikke skjules'); v.querySelector('.hs-tall-knapp').click();
      });
      // finn feilene
      const rot = main.querySelector('.les-hs-feil'), side = rot.querySelector('.hs-bad'), tot = Number(side.dataset.ant);
      if (tot !== 5) out.push('forventet 5 feil, fant ' + tot);
      side.querySelector('.hs-l').click(); if (!rot.querySelector('.hs-melding').textContent.includes('Ikke her')) out.push('feil trykk ga ikke melding');
      const ids = new Set($$(side, '[data-f]').map(e => e.dataset.f)); if (ids.size !== tot) out.push('feil antall klikkbare feil: ' + ids.size);
      ['marg', 'nr'].forEach(id => { if (!ids.has(id)) out.push('mangler sone ' + id); });
      let i = 0; ids.forEach(id => { side.querySelector('[data-f="' + id + '"]').click(); i++; if (!rot.querySelector('.hs-teller').innerText.includes('Funnet: ' + i + ' av')) out.push('teller stemmer ikke ved ' + id); });
      if (rot.querySelectorAll('.hs-funnet li').length !== tot) out.push('forklaringsliste har feil lengde');
      if (rot.querySelector('.hs-se-riktig').hidden) out.push('knapp «se riktig føring» vises ikke');
      if (!/Du fant alle/.test(rot.querySelector('.hs-melding').innerText)) out.push('ingen fullført-melding');
      rot.querySelector('.hs-se-riktig').click(); if (vis[0].hidden) out.push('«se riktig føring» byttet ikke til side 1');
      return out;
    });
    r.forEach(m => f(w + 'px ' + t + '. trinn: ' + m));
    // «vis alle»
    await p.goto('file://' + root + '/index.html#/les/foring/' + t); await p.waitForTimeout(100);
    await p.click('.hs-vis-alle'); const li = await p.locator('.hs-funnet li').count(); if (li !== 5) f(t + ': «vis alle» viste ' + li + ' feil');
  }
  if (errs.length) f('konsollfeil: ' + errs.slice(0, 3).join(' | '));
  console.log(n + ' kombinasjoner testet, ' + feil + ' feil');
  await b.close(); process.exit(feil ? 1 : 0);
})();
