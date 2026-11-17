/* Besøker alle ferdige temaer i begge arbeidsmåter + ekstra og verktøy. Sjekker JS-feil, tomme sider og horisontal overflow på mobil.
   Kjør: NODE_PATH=$(npm root -g) node tests/alle-sider.js [filter] */
const { chromium } = require('playwright'); const path = require('path'); const vm = require('vm'); const fs = require('fs');
(async () => {
  const root = path.join(__dirname, '..'); const ctx = { window: {}, console }; ctx.window = ctx; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(root, 'data/curriculum.js'), 'utf8'), ctx);
  const CUR = ctx.MATTE.curriculum || ctx.MATTE.trinn; const filt = process.argv[2] || '';
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] }); const page = await b.newPage({ viewport: { width: 390, height: 800 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const urls = [];
  CUR.forEach(t => t.temaer.filter(x => x.klar).forEach(x => { ['', 'steg/', 'ekstra/', 'steg/ekstra/'].forEach(m => urls.push('#/' + m + t.trinn + '/' + x.id)); }));
  ['python', 'geogebra', 'regneark'].forEach(v => urls.push('#/verktoy/' + v));
  let bad = 0, n = 0;
  for (const u of urls) {
    if (filt && !u.includes(filt)) continue; n++;
    errs.length = 0; await page.goto('file://' + root + '/index.html' + u); await page.waitForTimeout(250);
    const r = await page.evaluate(() => ({ h: document.body.scrollWidth - window.innerWidth, wg: document.querySelectorAll('.wg').length, sek: document.querySelectorAll('.seksjon').length, t: (document.querySelector('main')||document.body).innerText.length, ek: document.querySelectorAll('.ekstra-sek, .ekstra').length }));
    const problem = errs.length || r.h > 2 || r.t < 300;
    if (problem) { bad++; console.log('✗', u, JSON.stringify(r), errs.slice(0, 2)); }
  }
  console.log(n + ' sider besøkt, ' + bad + ' med problemer'); await b.close(); process.exit(bad ? 1 : 0);
})();
