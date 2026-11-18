/* Kjøres med: NODE_PATH=$(npm root -g) node tests/spill-test.js [filter]
   Åpner hvert spill, klikker på tilfeldige knapper og leter etter JavaScript-feil. */
const { chromium } = require('playwright');
(async () => {
  const filter = process.argv[2] || '';
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await p.goto('file://' + __dirname + '/../index.html#/spill');
  await p.waitForTimeout(300);
  const ids = await p.evaluate(() => MATTE.games.map(g => g.id));
  let dårlige = 0;
  for (const id of ids.filter(i => i.includes(filter))) {
    errs.length = 0;
    await p.goto('file://' + __dirname + '/../index.html#/spill/' + id); await p.waitForTimeout(250);
    const ok0 = await p.evaluate(() => { const r = document.getElementById('spill-rom'); return r && r.innerText.trim().length > 5; });
    let klikk = 0;
    for (let i = 0; i < 80; i++) {
      const knapper = await p.$$('#spill-rom button:not([disabled]), #spill-rom [data-y], #spill-rom .hs-rad');
      if (!knapper.length) break;
      const k = knapper[Math.floor(Math.random() * knapper.length)];
      try { await k.click({ timeout: 800, force: true }); klikk++; } catch (e) { }
      if (!(await p.evaluate(() => location.hash.indexOf('#/spill/') === 0))) { await p.goto('file://' + __dirname + '/../index.html#/spill/' + id); await p.waitForTimeout(150); }
      // flytt glidebrytere
      const sl = await p.$$('#spill-rom input[type=range]');
      for (const s of sl) { try { await s.evaluate(e => { e.value = String(+e.min + Math.random() * (+e.max - +e.min)); e.dispatchEvent(new Event('input', { bubbles: true })); }); } catch (e) { } }
      const ins = await p.$$('#spill-rom input[type=text]:not([disabled])');
      for (const s of ins) { try { await s.fill(String(Math.floor(Math.random() * 20))); } catch (e) { } }
    }
    const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const bad = errs.length || !ok0 || over > 2;
    if (bad) dårlige++;
    console.log((bad ? '✗ ' : '✓ ') + id + ' (' + klikk + ' klikk)' + (over > 2 ? ' sidelengs ' + over + 'px' : '') + (ok0 ? '' : ' TOM') + (errs.length ? ' FEIL: ' + errs.slice(0, 2).join(' | ') : ''));
  }
  console.log(dårlige ? dårlige + ' spill med problemer' : 'Alle spill OK');
  await b.close(); process.exit(dårlige ? 1 : 0);
})();
