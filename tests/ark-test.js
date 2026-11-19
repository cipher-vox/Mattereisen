/* Test av arksiden, lærersiden og nivåene: node tests/ark-test.js
   Bygger alle arktyper for alle temaer og sjekker at innholdet ser fornuftig ut. */
'use strict';
const path = require('path'); const fs = require('fs');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/npm-tools/node_modules/playwright'); }
const url = 'file://' + path.join(__dirname, '..', 'index.html');
const out = path.join(__dirname, 'skjermbilder'); fs.mkdirSync(out, { recursive: true });
let feil = 0; const ok = (c, m) => { if (!c) { feil++; console.log('  ✗ ' + m); } };
(async () => {
  const browser = await pw.chromium.launch({ executablePath: fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1100, height: 900 } })).newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url + '#/ark'); await page.waitForTimeout(300);
  const res = await page.evaluate(() => {
    const M = window.MATTE, rapport = []; M.arkAapne('43210');
    const temaer = []; M.curriculum.forEach(tr => tr.temaer.forEach(t => { if (t.klar) temaer.push(tr.trinn + '/' + t.id); }));
    const typer = ['oppgave', 'test', 'startsjekk', 'husk', 'billett', 'bingo', 'par', 'stasjon'];
    temaer.forEach(function (key) {
      typer.forEach(function (ty) {
        ['rolig', 'vanlig', 'utfordring'].forEach(function (niv) {
          if (['husk', 'billett'].indexOf(ty) >= 0 && niv !== 'vanlig') return;
          try {
            const h = M.arkBygg({ type: ty, tema: key, trinn: Number(key.split('/')[0]), nivå: niv, antall: 12, plass: 'middels', hjelp: niv === 'rolig', kol: 1, fasit: 'los', navn: true, symbol: true, kind: 'tema', bingo: 8, stasjon: 6, seed: 4242 });
            const n = (h.match(/class="ark-opp"/g) || []).length;
            rapport.push({ key, ty, niv, len: h.length, n, bad: /undefined|NaN|\[object/.test(h) });
          } catch (e) { rapport.push({ key, ty, niv, err: String(e) }); }
        });
      });
    });
    ['hvakan', 'samtale'].forEach(ty => { M.curriculum.forEach(tr => { ['trinn', tr.trinn + '/' + tr.temaer[0].id].forEach(tm => { try { const h = M.arkBygg({ type: ty, tema: tm, trinn: tr.trinn, nivå: 'vanlig' }); rapport.push({ key: tm, ty, niv: '-', len: h.length, n: 1, bad: /undefined|NaN/.test(h) }); } catch (e) { rapport.push({ key: tm, ty, niv: '-', err: String(e) }); } }); }); });
    [8, 9, 10].forEach(t => { const h = M.arkBygg({ type: 'feil', trinn: t, fasit: 'egen' }); rapport.push({ key: 'trinn' + t, ty: 'feil', niv: '-', len: h.length, n: 1, bad: /undefined|NaN/.test(h) }); });
    Object.keys(M.arkMaler).forEach(k => { const h = M.arkBygg({ type: 'mal', mal: k }); rapport.push({ key: k, ty: 'mal', niv: '-', len: h.length, n: 1, bad: /undefined|NaN/.test(h) }); });
    return rapport;
  });
  const feilRader = res.filter(r => r.err || r.bad || r.len < 500);
  feilRader.slice(0, 40).forEach(r => console.log('  ✗', JSON.stringify(r)));
  ok(feilRader.length === 0, 'alle ' + res.length + ' kombinasjoner bygger uten feil');
  const få = res.filter(r => ['oppgave', 'test'].indexOf(r.ty) >= 0 && r.n < 6);
  få.slice(0, 20).forEach(r => console.log('  ⚠ få oppgaver:', JSON.stringify(r)));
  ok(få.length === 0, 'oppgaveark og tester har minst 6 oppgaver');
  console.log(res.length + ' kombinasjoner sjekket');

  /* kodelås: Kort test og Kapittelprøve skal være låst til riktig kode er skrevet inn */
  await page.goto(url + '#/ark/kapittel/9/pytagoras'); await page.reload(); await page.waitForTimeout(300);
  ok(await page.$('#ark-kode') !== null, 'kapittelprøve er låst ved åpning');
  ok((await page.$$('#ark-forh .dok-opp, #ark-forh .ark-opp')).length === 0, 'ingen oppgaver synlige før koden er skrevet inn');
  ok(!(await page.textContent('main')).includes('Katetene'), 'ingen oppgavetekst lekker før koden er skrevet inn');
  await page.fill('#ark-kode', '12345'); await page.click('#ark-kode-ok'); await page.waitForTimeout(150);
  ok((await page.textContent('#ark-kode-feil')).includes('Feil'), 'feil kode gir feilmelding');
  ok((await page.$$('#ark-forh .dok-opp')).length === 0, 'fortsatt låst etter feil kode');
  await page.fill('#ark-kode', '43210'); await page.press('#ark-kode', 'Enter'); await page.waitForTimeout(300);
  ok((await page.$$('#ark-forh .dok-opp')).length > 5, 'riktig kode åpner kapittelprøven');
  await page.click('[data-arktype="test"]'); await page.waitForTimeout(200);
  ok(await page.$('#ark-kode') === null && (await page.$$('#ark-forh .ark-opp, #ark-forh .dok-opp')).length > 3, 'Kort test er åpen i samme økt');
  await page.click('#ark-las'); await page.waitForTimeout(150);
  ok(await page.$('#ark-kode') !== null, '«Lås igjen» låser');
  await page.goto(url + '#/ark/test'); await page.reload(); await page.waitForTimeout(300);
  ok(await page.$('#ark-kode') !== null, 'Kort test er låst etter ny åpning');
  await page.goto(url + '#/ark'); await page.waitForTimeout(150);
  await page.click('[data-arktype="oppgave"]'); await page.waitForTimeout(150);
  ok(await page.$('#ark-kode') === null, 'Øvingsark er ikke låst');

  /* kapittelprøve: valg for deler, antall og redigering på siden */
  await page.goto(url + '#/ark/kapittel/9/pytagoras'); await page.reload(); await page.waitForTimeout(300);
  await page.fill('#ark-kode', '43210'); await page.press('#ark-kode', 'Enter'); await page.waitForTimeout(300);
  const antO = () => page.evaluate(() => document.querySelectorAll('#ark-forh .dok-opp').length);
  ok(await antO() === 12, 'standard ordinær prøve har 12 oppgaver');
  await page.click('#ark-pantall-k'); await page.click('.dd-valg[data-v="8"]'); await page.waitForTimeout(200);
  ok(await antO() === 8, 'antall oppgaver kan velges (8)');
  await page.uncheck('#ark-delC'); await page.waitForTimeout(200);
  ok(!(await page.textContent('#ark-forh')).includes('Del 3: Forklar'), 'del 3 kan slås av');
  await page.check('#ark-delC'); await page.waitForTimeout(150);
  await page.click('#ark-plass-k'); await page.click('.dd-valg[data-v="stor"]'); await page.waitForTimeout(200);
  ok(await page.evaluate(() => Math.max(...[...document.querySelectorAll('#ark-forh .ark-regn')].map(e => parseInt(e.style.height))) >= 40), 'plass til regning kan velges (stor)');
  const før = await page.evaluate(() => document.querySelector('#ark-forh .dok-q').textContent);
  await page.click('#ark-forh [data-red="bytt"]'); await page.waitForTimeout(150);
  ok(før !== await page.evaluate(() => document.querySelector('#ark-forh .dok-q').textContent), 'en oppgave kan byttes ut');
  const n0 = await antO(); await page.click('#ark-forh [data-red="fjern"]'); await page.waitForTimeout(150);
  ok(await antO() === n0 - 1, 'en oppgave kan fjernes');
  await page.click('#ark-forh [data-red="ny"]'); await page.waitForTimeout(150);
  ok(await antO() === n0, 'en ny oppgave kan legges til fra banken');
  await page.click('#ark-forh .dok-opp:has(.ark-svar) [data-red="rediger"]'); await page.waitForTimeout(150);
  await page.fill('.red-q', 'Regn ut 7*8 og 3 - 9'); await page.fill('.red-a', '56 og -6'); await page.click('[data-red="lagre"]'); await page.waitForTimeout(150);
  ok((await page.textContent('#ark-forh')).includes('Regn ut 7·8 og 3 − 9'), 'en oppgave kan skrives om (tall og tekst)');
  await page.click('#ark-forh [data-red="egen"]'); await page.fill('.red-q', 'Egen oppgave om x'); await page.click('[data-red="lagre"]'); await page.waitForTimeout(150);
  ok((await page.textContent('#ark-forh')).includes('Egen oppgave om x'), 'en egen oppgave kan legges til');
  ok(!/red-verktoy|data-red/.test(await page.evaluate(() => MATTE.arkBygg({}))), 'redigeringsknapper kommer ikke med på utskrift');
  ok((await page.evaluate(() => MATTE.arkBygg({}))).includes('Regn ut 7·8 og 3 − 9') , 'endringene kommer med på utskrift/Word');
  /* fasit og løsningsforslag følger den redigerte prøven */
  ok((await page.textContent('#ark-forh')).includes('56 og -6') || (await page.textContent('#ark-forh')).includes('56 og −6'), 'lærerens fasit for en omskrevet oppgave kommer med i fasiten');
  await page.click('#ark-forh .dok-opp:has(.ark-svar) [data-red="rediger"]'); await page.fill('.red-q', 'Regn ut: 6*(2+3)^2 - 8'); await page.fill('.red-a', ''); await page.click('[data-red="lagre"]'); await page.waitForTimeout(200);
  const fasitTxt = await page.evaluate(() => [...document.querySelectorAll('#ark-forh .fasit-skille ~ .ark-side tr')].map(r => r.innerText.replace(/\s+/g, ' ')).join('\n'));
  ok(/6 · \(2 \+ 3\)² − 8[^\n]*142/.test(fasitTxt) && /= 150 − 8 = 142/.test(fasitTxt), 'beregnet svar (142) og løsningsforslag lages for en omskrevet regneoppgave');
  await page.click('#ark-forh [data-red="egen"]'); await page.fill('.red-q', 'Forklar med egne ord'); await page.click('[data-red="lagre"]'); await page.waitForTimeout(200);
  ok((await page.textContent('#ark-forh')).includes('Fasit mangler'), 'egen oppgave uten fasit får tydelig merknad');
  ok(await page.evaluate(() => { const L = MATTE.arkLøs; const a = L('3x + 5 = 20'), b = L('2(x − 3) = 10'), c = L('Regn ut: −2 · (3 − 7) + (−6) ÷ 2'); return a && a.svar === 'x = 5' && b && b.svar === 'x = 8' && c && c.svar === '5' && L('Forklar hva en hypotenus er') === null; }), 'automatisk løsning av likninger og regnestykker gir riktige svar');
  const [dlf] = await Promise.all([page.waitForEvent('download'), page.click('#ark-fasit-word')]);
  const fb = fs.readFileSync(await dlf.path()); ok(fb[0] === 80 && fb[1] === 75 && /fasit/.test(dlf.suggestedFilename()), 'fasit og løsningsforslag kan lastes ned som egen Word-fil');
  const [dlw] = await Promise.all([page.waitForEvent('download'), page.click('#ark-word')]);
  const bytes = fs.readFileSync(await dlw.path()); ok(bytes[0] === 80 && bytes[1] === 75, 'Word-filen er en gyldig zip/docx');
  ok(bytes.toString('latin1').includes('PK') && bytes.length > 4000, 'Word-filen har innhold');

  /* kapittelprøve og regelbok: alle temaer, alle utgaver, og Word-filene */
  const nye = await page.evaluate(async () => {
    const M = window.MATTE, rap = []; M.arkAapne('43210');
    const temaer = []; M.curriculum.forEach(tr => tr.temaer.forEach(t => { if (t.klar) temaer.push(tr.trinn + '/' + t.id); }));
    const typ = id => M.arkTyper.find(x => x.id === id);
    const sjekk = async (id, o) => {
      try {
        const h = M.arkBygg(Object.assign({ type: id, nivå: 'vanlig', fasit: 'los' }, o));
        const t = typ(id), blokker = t.modell ? t.modell(Object.assign({}, window.MATTE.arkInt.cfg ? M.arkInt.cfg() : {}, o)) : null;
        const blob = blokker ? M.dok.blob(blokker, { fot: 'test', tittel: 'test' }) : null;
        const bytes = blob ? new Uint8Array(await blob.arrayBuffer()) : null;
        rap.push({ id, o: JSON.stringify(o), len: h.length, bad: /undefined|NaN|\[object/.test(h), zip: bytes ? (bytes[0] === 80 && bytes[1] === 75 && bytes.length > 3000) : null });
      } catch (e) { rap.push({ id, o: JSON.stringify(o), err: String(e) }); }
    };
    for (const key of temaer) {
      const trinn = Number(key.split('/')[0]);
      for (const utgave of ['ordinaer', 'tilrettelagt']) await sjekk('kapittel', { tema: key, trinn, utgave });
      for (const omfang of ['full', 'kort']) await sjekk('regelbok', { tema: key, trinn, omfang });
    }
    for (const trinn of [8, 9, 10]) await sjekk('regelbok', { tema: 'trinn', trinn, omfang: 'full' });
    return rap;
  });
  const nyeFeil = nye.filter(r => r.err || r.bad || r.len < 1500 || r.zip === false);
  nyeFeil.slice(0, 20).forEach(r => console.log('  ✗', JSON.stringify(r)));
  console.log(nye.length + ' kapittel/regelbok-varianter sjekket');
  ok(nyeFeil.length === 0, 'kapittelprøve + regelbok (' + nye.length + ' varianter, inkl. Word-fil) bygger uten feil');

  /* UI */
  await page.goto(url + '#/ark/8/ligninger'); await page.reload(); await page.waitForTimeout(300);
  ok((await page.$$('.ark-type')).length === 17, '17 arktyper');
  ok((await page.$$('.ark-side')).length >= 2, 'forhåndsvisning har ark + fasit');
  await page.screenshot({ path: path.join(out, 'ark-1-side.png') });
  const el = await page.$('.ark-side'); if (el) await el.screenshot({ path: path.join(out, 'ark-2-oppgaveark.png') });
  await page.click('[data-arknivå="rolig"]'); await page.waitForTimeout(150);
  ok((await page.textContent('#ark-forh')).includes('Start slik'), 'Rolig-ark har hjelpetekst');
  for (const t of ['husk', 'hvakan', 'billett', 'bingo', 'stasjon', 'feil', 'mal']) { await page.click('[data-arktype="' + t + '"]'); await page.waitForTimeout(120); const e2 = await page.$('.ark-side'); if (e2) await e2.screenshot({ path: path.join(out, 'ark-t-' + t + '.png') }); }
  /* nedlasting og utskrift */
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#ark-last')]);
  const p = await dl.path(); const html = fs.readFileSync(p, 'utf8'); ok(html.includes('<!doctype html>') && html.includes('ark-side'), 'nedlastet fil er selvstendig HTML');
  fs.copyFileSync(p, path.join(out, 'ark-nedlastet.html'));
  await page.click('[data-arktype="oppgave"]'); await page.waitForTimeout(100);
  await page.evaluate(() => { window.print = () => { window.__print = document.getElementById('ark-print') ? document.getElementById('ark-print').innerHTML.length : 0; }; });
  await page.click('#ark-skriv'); await page.waitForTimeout(400);
  ok(await page.evaluate(() => window.__print > 1000), 'utskrift lager ark-print-rot');
  await page.goto(url + '#/ark/8/ligninger'); await page.reload(); await page.waitForTimeout(250);
  await page.evaluate(() => { document.body.classList.add('ark-skriver'); const r = document.createElement('div'); r.id = 'ark-print'; r.innerHTML = '<style>@page{size:A4;margin:10mm}</style>' + document.getElementById('ark-forh').innerHTML; document.body.appendChild(r); });
  await page.pdf({ path: path.join(out, 'ark-test.pdf'), preferCSSPageSize: true, printBackground: true });
  /* lærersiden */
  await page.goto(url + '#/laerer'); await page.reload(); await page.waitForTimeout(250);
  ok((await page.$$('.lv-tema')).length === 32, '32 temaer i lærerveiledningen');
  ok((await page.$$('.lv-tema .lv-inn h4')).length > 32 * 5, 'hvert tema har flere deler');
  await page.screenshot({ path: path.join(out, 'laerer-1.png') });
  /* nivåsider */
  await page.goto(url + '#/ekstra/9/pytagoras'); await page.reload(); await page.waitForTimeout(250);
  await page.click('[data-nivaa="rolig"]'); await page.waitForTimeout(200);
  ok((await page.$$('.nivaa-sek')).length === 1, 'Rolig-sett vises på øvingssiden');
  ok(await page.$('.hjelp-fab') !== null, 'Hjelp-knapp finnes');
  await page.click('.hjelp-fab'); await page.waitForTimeout(150);
  ok((await page.textContent('.hjelp-panel')).includes('Husk dette'), 'hjelp-panel har husk-liste');
  await page.screenshot({ path: path.join(out, 'nivaa-rolig.png') });
  ok(errors.length === 0, 'ingen JS-feil' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
  await browser.close();
  console.log(feil ? feil + ' FEIL' : 'Alt OK'); process.exit(feil ? 1 : 0);
})();
