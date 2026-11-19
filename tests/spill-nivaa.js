/* Kjøres med: NODE_PATH=$(npm root -g) node tests/spill-nivaa.js [filter]
   Spiller hvert spill på alle tre nivåer (Rolig, Vanlig, Utfordring) med tilfeldige klikk og tilfeldig skrevne svar.
   Feiler ved JavaScript-feil, tom spillflate, sidelengs rulling, eller hvis spillet aldri når sluttskjermen. */
const { chromium } = require('playwright');
(async () => {
  const filter = process.argv[2] || '';
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  const url = '#/spill/'; const base = 'file://' + __dirname + '/../index.html';
  await p.goto(base + '#/spill'); await p.waitForTimeout(300);
  const ids = await p.evaluate(() => MATTE.games.map(g => g.id));
  let dårlige = 0;
  for (const id of ids.filter(i => i.includes(filter) && !i.startsWith('jeopardy'))) {   // Jeopardy testes i les-test.js
    for (const niv of ['rolig', 'vanlig', 'utfordring']) {
      errs.length = 0;
      await p.evaluate(n => { MATTE.nivå = n; }, niv);
      await p.goto(base + url + id); await p.waitForTimeout(150);
      await p.evaluate(n => { MATTE.nivå = n; }, niv);
      await p.evaluate(id => { location.hash = '#/spill'; }, id); await p.waitForTimeout(80);
      await p.evaluate(id => { location.hash = '#/spill/' + id; }, id); await p.waitForTimeout(250);
      const ok0 = await p.evaluate(() => { const r = document.getElementById('spill-rom'); return r && r.innerText.trim().length > 5; });
      let klikk = 0, slutt = 0, maksOver = 0;
      if (/memory/.test(id)) {
        const antall = (await p.$$('#spill-rom .mm-kort')).length; const forvent = { rolig: 12, vanlig: 16, utfordring: 20 }[niv];
        if (antall !== forvent) { errs.push('Forventet ' + forvent + ' kort, fant ' + antall); }
        if (niv === 'rolig') {
          for (let g = 0; g < 80 && !(await p.$('#spill-rom .sp-slutt')); g++) {
            const kort = await p.$$('#spill-rom .mm-kort:not(.funnet)'); if (kort.length < 2) { await p.waitForTimeout(1300); continue; }
            let funn = false;
            for (let j = 1; j < kort.length && !funn; j++) {
              await kort[0].click({ force: true }).catch(() => { }); await kort[j].click({ force: true }).catch(() => { }); klikk += 2; await p.waitForTimeout(1250);
              funn = await kort[0].evaluate(e => e.classList.contains('funnet'));
            }
          }
          await p.waitForTimeout(1200);
        } else { slutt = 1; }
      } else

      for (let i = 0; i < 260 && !/memory/.test(id); i++) {
        if (await p.$('#spill-rom .sp-slutt')) { slutt++; if (slutt >= 1) break; }
        const ins = await p.$$('#spill-rom input[type=text]:not([disabled])');
        for (const s of ins) { try { await s.fill(String(Math.floor(Math.random() * 30) - 5)); } catch (e) { } }
        const sl = await p.$$('#spill-rom input[type=range]:not([disabled])');
        for (const s of sl) { try { await s.evaluate(e => { e.value = String(+e.min + Math.random() * (+e.max - +e.min)); e.dispatchEvent(new Event('input', { bubbles: true })); }); } catch (e) { } }
        const knapper = await p.$$('#spill-rom button:not([disabled]), #spill-rom .hs-rad');
        if (!knapper.length) break;
        // foretrekk Sjekk/Neste-knapper en del av tiden så vi kommer videre
        let k = knapper[Math.floor(Math.random() * knapper.length)];
        if (Math.random() < .5) { for (const kn of knapper) { const t = (await kn.innerText().catch(() => '')) || ''; if (/Sjekk|Neste|Se resultatet|Start|Åpne|Slå sammen/.test(t) && Math.random() < .6) { k = kn; break; } } }
        try { await k.click({ timeout: 800, force: true }); klikk++; } catch (e) { }
        maksOver = Math.max(maksOver, await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
      }
      const nåSlutt = !!(await p.$('#spill-rom .sp-slutt'));
      const tomt = !ok0 || (await p.evaluate(() => { const r = document.getElementById('spill-rom'); return !r || r.innerText.trim().length < 5; }));
      const bad = errs.length || tomt || maksOver > 2 || !(slutt || nåSlutt);
      if (bad) dårlige++;
      console.log((bad ? '✗ ' : '✓ ') + id + ' [' + niv + '] ' + klikk + ' klikk' + ((slutt || nåSlutt) ? ', nådde slutt' : ', NÅDDE IKKE SLUTT') + (maksOver > 2 ? ', sidelengs ' + maksOver + 'px' : '') + (tomt ? ', TOM (' + (await p.evaluate(() => location.hash)) + ')' : '') + (errs.length ? ' FEIL: ' + errs.slice(0, 2).join(' | ') : ''));
    }
  }
  console.log(dårlige ? dårlige + ' kombinasjoner med problemer' : 'Alle spill OK på alle nivåer');
  await b.close(); process.exit(dårlige ? 1 : 0);
})();
