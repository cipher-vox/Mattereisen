/* Test av utskriftsarkene for Les og begrunn: node tests/ark-les-test.js
   Bygger «Før pent og rett», «Les og tolk» og «Sparringskort» for alle trinn og nivåer,
   og sjekker at fasitbokstavene peker på riktig svaralternativ. */
'use strict';
const fs = require('fs');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/npm-tools/node_modules/playwright'); }
let feil = 0; const ok = (c, m) => { if (!c) { feil++; console.log('  ✗ ' + m); } };
(async () => {
  const b = await pw.chromium.launch({ executablePath: fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined, args: ['--no-sandbox'] });
  const p = await b.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + require('path').join(__dirname, '..', 'index.html') + '#/ark'); await p.waitForTimeout(300);
  const res = await p.evaluate(() => {
    const M = window.MATTE, ut = []; const bokst = 'abcd';
    [8, 9, 10].forEach(t => ['rolig', 'vanlig', 'utfordring'].forEach(n => {
      ['foring', 'les', 'sparring'].forEach(ty => ['los', 'ingen'].forEach(f => {
        const h = M.arkBygg({ type: ty, trinn: t, nivå: n, fasit: f, navn: true });
        const d = document.createElement('div'); d.innerHTML = h;
        const r = { t, n, ty, f, problem: [] };
        if (/undefined|NaN|\[object|\[\[|\.\.[ <]/.test(h.replace(/…/g, ''))) r.problem.push('ugyldig tekst');
        if (ty === 'les') {
          const opps = [...d.querySelectorAll('.dok-opp')];
          const D = M.les.data[t]; const fasitLi = [...d.querySelectorAll('.dok-liste li')];
          if (f === 'ingen' && fasitLi.length) r.problem.push('fasit vises selv om den er skrudd av');
          if (f !== 'ingen') {
            const kilder = [];
            D.tekst[n].forEach(it => kilder.push(it.spm.valg));
            D.graf[n].forEach(it => it.oppg.forEach(o => kilder.push(o.valg || null)));
            if (kilder.length !== opps.length) r.problem.push('antall oppgaver ' + opps.length + ' ≠ ' + kilder.length);
            kilder.forEach((v, i) => {
              if (!v) return;
              const m = fasitLi[i] && fasitLi[i].innerHTML.match(/[ >]([a-d])\)<\/b>/g);
              const bokstav = m && m[m.length - 1].match(/([a-d])\)/)[1];
              const spans = [...opps[i].querySelectorAll('.ark-valg span')].map(s => s.textContent.replace(/^[a-d]\) /, ''));
              const rett = v.find(x => x[1])[0];
              if (!bokstav || spans[bokstav.charCodeAt(0) - 97] !== rett) r.problem.push('feil fasitbokstav i oppg. ' + (i + 1));
            });
          }
        }
        ut.push(r);
      }));
    }));
    // riktig svar skal ikke alltid stå på a)
    const h = M.arkBygg({ type: 'les', trinn: 9, nivå: 'vanlig', fasit: 'los', navn: true });
    const bokstaver = (h.match(/Riktig: ([a-d])\)/g) || []).concat(h.match(/<b>[a-d]\)<\/b>/g) || []).map(x => x.match(/([a-d])\)/)[1]);
    return { ut, ulike: new Set(bokstaver).size };
  });
  res.ut.forEach(r => r.problem.forEach(m => ok(false, r.t + '. trinn ' + r.ty + ' ' + r.n + ' (' + r.f + '): ' + m)));
  ok(res.ulike > 1, 'riktig svar står alltid på samme plass');
  ok(!errs.length, 'konsollfeil: ' + errs.slice(0, 3).join(' | '));
  console.log(res.ut.length + ' ark bygget, ' + feil + ' feil');
  await b.close(); process.exit(feil ? 1 : 0);
})();
