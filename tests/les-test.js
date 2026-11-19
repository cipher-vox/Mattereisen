/* Tester «Les, tolk og begrunn»: laster alle moduler for alle trinn og nivåer, og spiller gjennom øvelsene.
   Kjør: NODE_PATH=$(npm root -g) node tests/les-test.js */
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const root = path.join(__dirname, '..');
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const page = await b.newPage({ viewport: { width: 390, height: 800 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  let bad = 0, n = 0; const fail = (m) => { bad++; console.log('✗', m); };
  await page.goto('file://' + root + '/index.html#/les'); await page.waitForTimeout(200);
  const trinn = await page.evaluate(() => [8, 9, 10].filter(t => MATTE.les.data[t]));
  const mod = ['tekst', 'graf', 'foring', 'kommando', 'begrunn', 'diskusjon'];
  // hub
  const hub = await page.evaluate(() => ({ kort: document.querySelectorAll('.les-modul').length, t: document.getElementById('main').innerText.length }));
  if (hub.kort < 7 || hub.t < 300 || errs.length) fail('hub ' + JSON.stringify(hub) + errs.slice(0, 2));
  for (const t of trinn) for (const m of mod) for (const niv of ['rolig', 'vanlig', 'utfordring']) {
    n++; errs.length = 0;
    await page.goto('file://' + root + '/index.html#/les/' + m + '/' + t); await page.waitForTimeout(120);
    await page.evaluate(v => MATTE.settNivå(v), niv); await page.waitForTimeout(120);
    const r = await page.evaluate(async (m) => {
      const out = { ant: 0, prob: [], over: document.body.scrollWidth - window.innerWidth };
      const main = document.getElementById('main'); const $$ = (e, s) => Array.from(e.querySelectorAll(s));
      const klikkMc = (rot) => { const ok = rot.querySelector('.les-valg-knapp[data-ok="1"]'); if (!ok) { out.prob.push('mc uten riktig valg'); return; } rot.querySelectorAll('.les-valg-knapp[data-ok="0"]').forEach(x => { if (!x.disabled) x.click(); }); ok.click(); if (!rot.querySelector('.les-mc-svar').innerText.includes('Riktig')) out.prob.push('mc ga ikke riktig-melding'); out.ant++; };
      if (m === 'tekst') {
        const d = MATTE.les.data[+location.hash.split('/')[3]].tekst[MATTE.nivå];
        $$(main, '.les-kort').forEach((kort, i) => {
          const it = d[i]; const en = MATTE.les.parseTekst(it.tekst);
          // først feil: marker et vanlig ord
          const ord = $$(kort, '.les-ord');
          en.forEach(e => { if (e.k) { kort.querySelector('.les-verk[data-k="' + e.k + '"]').click(); ord[e.i].click(); } });
          kort.querySelector('.les-sjekk-knapp').click();
          if (!kort.querySelector('.les-resultat').innerText.includes('Alt er markert riktig')) out.prob.push('tekst ' + i + ' ikke alt riktig: ' + kort.querySelector('.les-resultat').innerText.slice(0, 80));
          if (kort.querySelector('.les-etter').hidden) out.prob.push('spm ikke vist');
          klikkMc(kort.querySelector('.les-mc'));
        });
      }
      if (m === 'graf') {
        const d = MATTE.les.data[+location.hash.split('/')[3]].graf[MATTE.nivå];
        $$(main, '.les-kort').forEach((kort, i) => {
          const it = d[i];
          for (let k = 0; k < it.oppg.length; k++) {
            const o = it.oppg[k]; const boks = kort.querySelector('.les-graf-oppg');
            if (o.t === 'klikk') {
              const mål = Array.from(kort.querySelectorAll('svg [data-d]')).filter(e => e.getAttribute('data-d').split(' ').includes(o.mål));
              if (mål.length !== 1) { out.prob.push('graf ' + i + ' mål ' + o.mål + ' antall ' + mål.length); return; }
              const feil = Array.from(kort.querySelectorAll('svg [data-d]')).find(e => !e.getAttribute('data-d').split(' ').includes(o.mål));
              feil.dispatchEvent(new MouseEvent('click', { bubbles: true }));
              mål[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
              out.ant++;
            } else klikkMc(boks.querySelector('.les-mc'));
            const nb = boks.querySelector('.knapp'); if (!nb) { out.prob.push('graf ' + i + ' oppg ' + k + ' ingen neste-knapp'); return; } nb.click();
          }
          if (!kort.querySelector('.les-ferdig')) out.prob.push('graf ' + i + ' ikke ferdig');
        });
      }
      if (m === 'foring') {
        const d = MATTE.les.data[+location.hash.split('/')[3]].foring.rekke[MATTE.nivå];
        $$(main, '.les-rekke').forEach((kort, i) => {
          const linjer = d[i].linjer; const knapper = $$(kort, '.les-linje');
          knapper[(linjer.length > 1) ? knapper.findIndex(x => +x.dataset.i === 1) : 0].click(); // feil rekkefølge først
          for (let j = 0; j < linjer.length; j++) kort.querySelector('.les-linje[data-i="' + j + '"]').click();
          if (!kort.querySelector('.les-mc-svar').innerText.includes('Ferdig')) out.prob.push('rekke ' + i + ' ikke ferdig'); out.ant++;
        });
        $$(main, '.les-vurder').forEach(k => klikkMc(k.querySelector('.les-mc')));
        const d2 = MATTE.les.data[+location.hash.split('/')[3]].foring.vurder[MATTE.nivå]; d2.forEach(x => { if (x.svar.filter(s => s.best).length !== 1) out.prob.push('vurder: nøyaktig en best'); });
      }
      if (m === 'kommando') $$(main, '.les-kort').forEach(k => klikkMc(k.querySelector('.les-mc')));
      if (m === 'begrunn') {
        $$(main, '.les-kort').forEach(k => { const mc = k.querySelector('.les-mc'); if (mc) klikkMc(mc); });
        $$(main, '.les-skrivkort').forEach(k => { const f = k.querySelector('.les-felt'); const v = k.querySelector('.les-vis'); if (!v.disabled) out.prob.push('vis-knapp aktiv for tidlig'); f.value = 'Dette er en begrunnelse som er lang nok til å teste.'; f.dispatchEvent(new Event('input')); if (v.disabled) out.prob.push('vis-knapp ikke aktiv'); v.click(); if (k.querySelector('.les-modell').hidden) out.prob.push('modell ikke vist'); out.ant++; });
      }
      if (m === 'diskusjon') {
        $$(main, '.les-pastand').forEach(k => { const f = k.querySelector('.les-b'); f.value = 'Fordi det er en lang nok begrunnelse.'; f.dispatchEvent(new Event('input')); k.querySelector('.les-vis').click(); if (k.querySelector('.les-modell').hidden) out.prob.push('samtale ikke vist'); out.ant++; });
        $$(main, '.les-hvem').forEach(k => klikkMc(k.querySelector('.les-mc')));
      }
      return out;
    }, m);
    if (errs.length || r.prob.length || r.over > 2 || (m !== 'kommando' && m !== 'foring' && r.ant < 1)) fail(t + '/' + m + '/' + niv + ' ' + JSON.stringify(r) + ' ' + errs.slice(0, 2));
  }

  // ---------- Jeopardy ----------
  for (const t of trinn) for (const niv of ['rolig', 'vanlig', 'utfordring']) for (const lærer of [false, true]) {
    n++; errs.length = 0;
    await page.goto('file://' + root + '/index.html#/spill/jeopardy-' + t); await page.waitForTimeout(150);
    await page.evaluate(v => MATTE.settNivå(v), niv); await page.waitForTimeout(150);
    const r = await page.evaluate(async ([lærer, niv]) => {
      const out = { prob: [], poeng: 0, forventet: 0 };
      const rom = document.getElementById('spill-rom');
      rom.querySelector('.jp-n[data-n="2"]').click();
      const inn = rom.querySelectorAll('.jp-lagnavn'); if (inn.length !== 2) out.prob.push('lagnavn ' + inn.length);
      if (lærer) rom.querySelector('#jp-laerer').click();
      rom.querySelector('.jp-start').click();
      const D = MATTE.les.jeopardy[+location.hash.split('-')[1]];
      let tot = 0;
      for (let i = 0; i < 16; i++) {
        const rute = rom.querySelector('.jp-rute:not([disabled])'); if (!rute) { out.prob.push('ingen rute ' + i); break; }
        const c = D.kategorier[+rute.dataset.k].rader[+rute.dataset.r];
        rute.click();
        const dd = /DOBBEL/.test(rom.querySelector('.jp-clue-hode').innerText);
        if (c.graf && !rom.querySelector('.jp-graf svg')) out.prob.push('graf mangler');
        if (rom.querySelector('.jp-graf [data-d]')) out.prob.push('graf er klikkbar i jeopardy');
        if (lærer) { rom.querySelector('.jp-riktig').click(); }
        else {
          const alt = rom.querySelectorAll('.jp-alt'); const forventet = niv === 'rolig' ? 3 : 4;
          if (alt.length !== forventet) out.prob.push('antall alternativer ' + alt.length);
          if (rom.querySelectorAll('.jp-alt[data-ok="1"]').length !== 1) out.prob.push('ikke nøyaktig ett riktig');
          rom.querySelector('.jp-alt[data-ok="1"]').click();
        }
        tot += c.p * (dd ? 2 : 1);
        rom.querySelector('.jp-videre').click();
      }
      out.forventet = tot;
      out.poeng = Array.from(rom.querySelectorAll('.sp-slutt')).length ? rom.querySelector('.sp-slutt').innerText : 'ingen sluttskjerm';
      if (!/Ferdig/.test(out.poeng)) out.prob.push('ingen sluttskjerm');
      const sum = (out.poeng.match(/Lag \d: (-?\d+) poeng/g) || []).reduce((a, x) => a + parseInt(x.split(': ')[1], 10), 0); if (sum !== tot) out.prob.push('poengsum ' + sum + ' forventet ' + tot);
      return out;
    }, [lærer, niv]);
    if (errs.length || r.prob.length) fail('jeopardy-' + t + '/' + niv + (lærer ? '/lærer ' : ' ') + JSON.stringify(r.prob) + ' ' + errs.slice(0, 2));
  }
  // datakvalitet i Jeopardy
  const dq = await page.evaluate(() => { const p = []; [8, 9, 10].forEach(t => MATTE.les.jeopardy[t].kategorier.forEach(k => { if (k.rader.length !== 4) p.push(t + ' ' + k.navn + ' antall rader'); k.rader.forEach((c, i) => { const alle = [c.ok].concat(c.feil); if (new Set(alle).size !== 4) p.push(t + ' ' + k.navn + ' ' + c.p + ' dupliserte spørsmål'); if (c.p !== (i + 1) * 100) p.push(t + ' ' + k.navn + ' poeng ' + c.p); if (!c.svar || !c.tekst) p.push('mangler tekst/svar'); }); })); return p; });
  if (dq.length) fail('Jeopardy-data: ' + dq.join('; '));
  console.log(n + ' modul/nivå-kombinasjoner testet, ' + bad + ' med problemer'); await b.close(); process.exit(bad ? 1 : 0);
})();
