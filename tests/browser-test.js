/* Nettlesertest (valgfri). Krever Playwright:  node tests/browser-test.js
   Åpner siden lokalt, klikker gjennom viktige funksjoner og tar skjermbilder i tests/skjermbilder/ */
'use strict';
const path = require('path'); const fs = require('fs');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/npm-tools/node_modules/playwright'); }
const url = 'file://' + path.join(__dirname, '..', 'index.html');
const out = path.join(__dirname, 'skjermbilder'); fs.mkdirSync(out, { recursive: true });

let feil = 0;
const ok = (c, m) => { if (!c) { feil++; console.log('  ✗ ' + m); } else console.log('  ✓ ' + m); };

(async () => {
  const browser = await pw.chromium.launch({ executablePath: fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  const go = async h => { await page.goto(url + h); await page.reload(); await page.waitForTimeout(250); };
  const shot = async n => page.screenshot({ path: path.join(out, n + '.png'), fullPage: false });
  const shotEl = async (sel, n) => { const el = await page.$(sel); if (el) { await el.scrollIntoViewIfNeeded(); await el.screenshot({ path: path.join(out, n + '.png') }); } };

  console.log('Forsiden');
  await go('#/');
  ok((await page.textContent('h1')).includes('Mattereisen'), 'h1 Mattereisen');
  ok((await page.$$('.trinn-kort')).length === 3, '3 trinn-kort');
  ok((await page.$$('.modus-kort')).length === 2, '2 arbeidsmåter');
  await shot('01-forside');

  console.log('Trinn 8');
  await go('#/8');
  ok((await page.$$('.tema-kort')).length === 12, '12 temaer på 8. trinn');
  ok((await page.$$('.tema-kort.klar')).length === 12, 'alle 12 temaer er klare');
  await shot('02-trinn8');

  console.log('Tema: Utforsk');
  await go('#/8/negative-tall');
  ok((await page.$$('.seksjon')).length === 10, '10 seksjoner');
  ok((await page.$$('.oppg')).length === 97, '97 oppgaver');
  ok((await page.$$('.wg')).length >= 12, 'modeller er montert (' + (await page.$$('.wg')).length + ')');
  ok((await page.$$('.ord')).length > 3, 'ordforklaringer er markert (' + (await page.$$('.ord')).length + ')');
  await shot('03-tema-topp');
  await shotEl('#s1 .wg', '04-termometer');

  /* ---- modeller ---- */
  await page.evaluate(() => document.getElementById('s3').scrollIntoView());
  const tl = await page.$('#s3 .wg-tallinje');
  await tl.scrollIntoViewIfNeeded();
  await page.click('#s3 .wg-tallinje .hopp');
  await page.waitForTimeout(3300);
  ok((await page.textContent('#s3 .wg-tallinje .wg-uttrykk')).replace(/\s+/g, '').includes('=2'), 'tallinje: -3 + 5 = 2 etter hopp');
  await shotEl('#s3 .wg-tallinje', '05-tallinje');

  
  const brikkeRot = await page.evaluateHandle(() => document.querySelector('#s3 .brikke-bord').closest('.wg'));
  for (let i = 0; i < 6; i++) { const n = await brikkeRot.asElement().$('.b-neste'); if (await n.isEnabled()) await n.click(); }
  const brTxt = await brikkeRot.asElement().textContent();
  ok(/Svar:.*= ?2/.test(brTxt.replace(/\s+/g, ' ')), 'brikker: svar 2 nås');
  await shotEl('#s4 .wg-tempendring', '06-tempendring');

  await page.evaluate(() => document.getElementById('s5').scrollIntoView());
  const mon = await page.evaluateHandle(() => document.querySelector('#s5 .monster-tabell').closest('.wg'));
  for (let i = 0; i < 8; i++) await (await mon.asElement().$('.m-neste')).click();
  ok((await mon.asElement().textContent()).includes('negativt · negativt = positivt'), 'monster: konklusjon vises');
  await mon.asElement().screenshot({ path: path.join(out, '07-monster.png') });
  const fm = await page.evaluateHandle(() => document.querySelector('#s5 .fortegn-tabell').closest('.wg'));
  await fm.asElement().screenshot({ path: path.join(out, '08-fortegn.png') });

  /* ---- oppgaver ---- */
  console.log('Oppgaver');
  await page.evaluate(() => document.getElementById('s3').scrollIntoView());
  const li = (await page.$$('#s3 .oppg'))[0];
  await li.scrollIntoViewIfNeeded();
  await (await li.$('.losning-knapp')).click();
  ok((await (await li.$('.tilbakemelding')).textContent()).includes('Prøv først'), 'løsning er låst før man har prøvd');
  await (await li.$('.svar-felt')).fill('7');
  await (await li.$('.sjekk')).click();
  ok(await li.evaluate(e => e.querySelector('.tilbakemelding').classList.contains('feil')), 'feil svar gir vennlig tilbakemelding');
  await (await li.$('.svar-felt')).fill('3');
  await (await li.$('.svar-felt')).press('Enter');
  ok(await li.evaluate(e => e.classList.contains('riktig')), 'riktig svar (3) godtas');
  await (await li.$('.losning-knapp')).click();
  ok(await li.evaluate(e => !e.querySelector('.losning-boks').hidden), 'løsning vises etter forsøk');
  const teller = await page.textContent('#s3 .oppg-blokk .teller');
  ok(teller.includes('1 av'), 'teller oppdateres: ' + teller.replace(/\s+/g, ' ').trim());
  await shotEl('#s3 .oppg-blokk', '09-oppgaver');

  /* minus-tegn varianter */
  const li2 = (await page.$$('#s3 .oppg'))[2];
  await (await li2.$('.svar-felt')).fill('- 5');
  await (await li2.$('.sjekk')).click();
  ok(await li2.evaluate(e => e.classList.contains('riktig')), 'svaret «- 5» (med mellomrom) godtas som −5');

  /* valg og rekke */
  const sec2 = (await page.$$('#s2 .oppg'));
  const rek = await page.$('#s2 .oppg[data-type="rekke"]');
  await (await rek.$('.svar-felt')).fill('−5, −1, 0, 3');
  await (await rek.$('.sjekk')).click();
  ok(await rek.evaluate(e => e.classList.contains('riktig')), 'rekke-oppgave godtar sortert svar');
  const valg = await page.$('#s1 .oppg[data-type="valg"]');
  const knapper = await valg.$$('.valg-knapp');
  for (const k of knapper) { const txt = await k.textContent(); if (txt.trim() === '−7') await k.click(); }
  ok(await valg.evaluate(e => e.classList.contains('riktig')), 'flervalg: riktig alternativ godtas');

  /* ---- Lesehjelp ---- */
  console.log('Lesehjelp');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.click('#lh-knapp');
  ok(await page.evaluate(() => !document.getElementById('lh-panel').hidden), 'panelet åpnes');
  ok(await page.evaluate(() => document.body.classList.contains('lh')), 'lesehjelp slås på');
  ok(await page.evaluate(() => getComputedStyle(document.querySelector('.les-knapp')).display !== 'none'), '🔊-knapper vises');
  await shot('10-lesehjelp');
  await page.click('#lh-storre'); await page.click('label:has(#lh-linjal)'); await page.click('[data-bg="blå"]');
  await page.mouse.move(600, 400);
  await shot('11-lesehjelp-linjal');
  await page.click('#lh-lukk');
  /* trykk på ord */
  const ordEl = await page.$('#s1 p.lesbar');
  const bb = await ordEl.boundingBox();
  await page.mouse.click(bb.x + 120, bb.y + 14);
  await page.waitForTimeout(200);
  /* ordforklaring */
  const ordKnapp = await page.$('#s1 .ord');
  if (ordKnapp) { await ordKnapp.scrollIntoViewIfNeeded(); await ordKnapp.click(); ok(await page.evaluate(() => !document.querySelector('.ord-popup').hidden), 'ordforklaring åpnes ved trykk'); await shot('12-ordforklaring'); }
  /* slå av */
  await page.click('#lh-knapp');
  await page.click('label:has(#lh-på)');
  ok(await page.evaluate(() => !document.body.classList.contains('lh')), 'lesehjelp kan slås av');

  /* ---- Steg for steg ---- */
  console.log('Steg for steg');
  await go('#/steg/8/negative-tall');
  ok((await page.$$('.seksjon')).length === 8, '8 steg');
  ok(await page.evaluate(() => document.body.classList.contains('modus-steg')), 'steg-stil er på');
  await shot('13-steg-topp');
  /* løs steg 1 */
  const tasks = await page.$$('#s1 .oppg');
  const svarSteg1 = ['−5', '−3', '−6 grader', '−8'];
  for (let i = 0; i < tasks.length; i++) {
    const kn = await tasks[i].$$('.valg-knapp');
    for (const k of kn) { if ((await k.textContent()).trim() === svarSteg1[i]) await k.click(); }
  }
  ok(await page.evaluate(() => document.getElementById('s1').classList.contains('ferdig')), 'steg 1 markeres som ferdig');
  ok(await page.evaluate(() => document.querySelector('[data-toc="s1"]').classList.contains('ferdig')), 'stien viser steg 1 som klart');
  await shotEl('#s1', '14-steg1-ferdig');
  await page.evaluate(() => document.getElementById('s6').scrollIntoView());
  await shotEl('#s6', '15-steg6');
  /* eksempel: vis neste steg */
  const eks = await page.$('#s3 .eksempel');
  await eks.scrollIntoViewIfNeeded();
  const antFør = await eks.$$('.eks-steg li:not([hidden])');
  await (await eks.$('.eks-neste')).click();
  ok((await eks.$$('.eks-steg li:not([hidden])')).length === antFør.length + 1, 'eksempel: «Vis neste steg» viser ett steg til');

  /* ---- Ekstra ---- */
  console.log('Ekstra oppgaver');
  await go('#/ekstra/8/negative-tall');
  ok((await page.$$('.ekstra-seksjon')).length === 8, '8 deler med ekstraoppgaver');
  const pl = await page.$('#x-pluss');
  await pl.scrollIntoViewIfNeeded();
  await (await pl.$('.fasit-liste summary')).click();
  const fasit = await pl.$$eval('.fasit-liste li', l => l.map(x => x.textContent));
  const forste = fasit[0].split('=').pop().trim();
  const felt = (await pl.$$('.ekstra-felt'))[0];
  await felt.fill(forste); await felt.press('Enter');
  ok(await pl.evaluate(e => e.querySelector('li').classList.contains('ok')), 'ekstraoppgave: riktig svar gir ✅ (' + fasit[0] + ')');
  await felt.fill('999'); await felt.press('Enter');
  ok(await pl.evaluate(e => e.querySelector('li').classList.contains('nei')), 'ekstraoppgave: feil svar markeres');
  const førTekst = (await pl.$$eval('.eq', l => l.map(x => x.textContent))).join('|');
  await (await pl.$('.nytt-sett')).click();
  const etterTekst = (await pl.$$eval('.eq', l => l.map(x => x.textContent))).join('|');
  ok(førTekst !== etterTekst, 'nytt sett lager nye oppgaver');
  await shotEl('#x-pluss', '16-ekstra-pluss');
  await shot('17-ekstra');

  /* ---- mobil ---- */
  console.log('Mobil');
  await page.setViewportSize({ width: 390, height: 844 });
  await go('#/');
  await shot('18-mobil-forside');
  await go('#/8/negative-tall');
  await shot('19-mobil-tema');
  await page.evaluate(() => document.getElementById('s3').scrollIntoView());
  await shotEl('#s3 .wg-tallinje', '20-mobil-tallinje');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(overflow <= 1, 'ingen sidelengs scrolling på mobil (overflow ' + overflow + 'px)');
  await go('#/steg/8/negative-tall');
  await shot('21-mobil-steg');

  ok(errors.length === 0, 'ingen JavaScript-feil' + (errors.length ? ': ' + errors.slice(0, 5).join(' | ') : ''));
  await browser.close();
  console.log(feil ? `\n${feil} feil` : '\nAlle nettlesertester besto');
  process.exit(feil ? 1 : 0);
})();
