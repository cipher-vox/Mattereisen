/* Kjøres med:  node tests/check-data.js
   Sjekker alle oppgaver, fasiter, eksempler og ekstraoppgaver uten nettleser. */
'use strict';
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { console, Math, Date, JSON, Array, Object, String, Number, RegExp, Error, isNaN, parseFloat, parseInt, Function };
ctx.window = ctx; ctx.document = { body: { classList: { contains: () => false } }, addEventListener() { } };
vm.createContext(ctx);
const dataFiles = fs.readdirSync(path.join(root, 'data')).filter(f => f.endsWith('.js') && f !== 'curriculum.js').sort().map(f => 'data/' + f);
['data/curriculum.js', 'js/util.js', 'js/tasks.js', 'js/pyinterp.js'].concat(dataFiles)
  .forEach(f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }));
const WIDGETS = new Set(); ['js/widgets.js', 'js/w-alg.js', 'js/w-verktoy.js', 'js/w-geo.js', 'js/w-stat.js'].forEach(f => { const fp = path.join(root, f); if (fs.existsSync(fp)) (fs.readFileSync(fp, 'utf8').match(/\bW\.([a-zæøå0-9_]+) = function/g) || []).forEach(m => WIDGETS.add(m.replace(/^W\./, '').replace(/ = function$/, ''))); });
WIDGETS.add('tallinje-vis'); WIDGETS.add('tallinje-vis');
const M = ctx.MATTE;

let feil = 0, antall = 0;
const rap = [];
function bad(msg) { feil++; console.log('  ✗ ' + msg); }
const MIN = '−';
function plain(s) {
  return String(s).replace(/<[^>]+>/g, '').replace(/\{([+\-−]?)(\d+(?:[.,]\d+)?)\}/g, (m, sg, n) => (sg === '-' ? MIN : '') + n).replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/-(?=\d)/g, MIN);
}
const fmt = n => M.fmt(n);

for (const mode of ['utforsk', 'steg']) {
  for (const key of Object.keys(M.topics[mode])) {
    const t = M.topics[mode][key];
    console.log('\n== ' + mode + ' / ' + key + ' (' + t.seksjoner.length + ' seksjoner)');
    let oppg = 0;
    t.seksjoner.forEach((s, si) => s.blokker.forEach((b, bi) => {
      if (b.t === 'eksempel' && b.regn !== undefined) {
        const r = M.evalExpr(b.regn); const last = plain(b.steg[b.steg.length - 1]);
        if (!last.includes(fmt(r))) bad(`eksempel ${b.regn} (seksjon ${si + 1}): siste steg mangler ${fmt(r)} -> "${last}"`);
      }
      if (b.t === 'widget' && !WIDGETS.has(b.navn)) bad('ukjent modell ' + b.navn);
      if (b.t === 'widget' && (b.navn === 'kode' || b.navn === 'kodevis') && b.opts && (b.opts.forvent !== undefined)) {
        const r = M.py.run((b.opts.losningKode || b.opts.kode).replace(/^\n/, ''), { inputs: (b.opts.testInput || []) });
        if (r.error) bad('kode i seksjon ' + (si + 1) + ' gir feil: ' + r.error.msg + ' (linje ' + r.error.line + ')');
        else if (r.out.trim() !== String(b.opts.forvent).trim()) bad('kode i seksjon ' + (si + 1) + ': forventet ' + JSON.stringify(b.opts.forvent) + ' men fikk ' + JSON.stringify(r.out));
      }
      if (b.t === 'widget' && b.navn === 'kode' && b.opts && b.opts.sjekk && b.opts.losningKode) {
        const r = M.py.run(b.opts.losningKode, { inputs: (b.opts.testInput || []) });
        if (r.error || !b.opts.sjekk(r.out, b.opts.losningKode)) bad('losningKode i seksjon ' + (si + 1) + ' består ikke sjekk: ' + JSON.stringify(r.out) + (r.error ? ' ' + r.error.msg : ''));
      }
      if (b.t === 'widget' && b.navn === 'kode' && b.opts && b.opts.kode && b.opts.visFeil === undefined && b.opts.forvent === undefined && !b.opts.forventFeil) {
        const r = M.py.run(b.opts.kode.replace(/^\n/, ''), { inputs: (b.opts.testInput || []) });
        if (r.error && !b.opts.tillatFeil) bad('kode i seksjon ' + (si + 1) + ' kjører med feil: ' + r.error.msg + ' (linje ' + r.error.line + ')');
      }
      if (b.t === 'oppgaver') {
        b.oppgaver.forEach((raw, i) => {
          oppg++; antall++;
          const q = M.normTask(raw); const id = `${si + 1}.${bi}.${i + 1}`;
          if (q.kjor) {
            const r = M.py.run(q.kjor, {});
            const fasit = q.type === 'valg' ? plain(q.valg[q.riktig]) : String(q.svar);
            if (r.error) bad(id + ' kjor: kodefeil ' + r.error.msg);
            else if (r.out.trim().replace(/\./g, '.') !== fasit.trim() && M.fmt(parseFloat(r.out)) !== fasit.trim()) bad(id + ' kjor: koden skriver ' + JSON.stringify(r.out.trim()) + ' men fasit er ' + JSON.stringify(fasit));
          }
          if (q.type === 'valg') {
            if (!(q.riktig >= 0 && q.riktig < q.valg.length)) bad(id + ' valg: ugyldig riktig');
            if (new Set(q.valg.map(plain)).size !== q.valg.length) bad(id + ' valg: dobbelte alternativer');
          } else if (q.type === 'tall') {
            const sv = Array.isArray(q.svar) ? q.svar : [q.svar];
            if (sv.some(x => typeof x !== 'number' || isNaN(x))) bad(id + ' tall: ugyldig svar');
            const los = q.losning ? (Array.isArray(q.losning) ? q.losning.join(' ') : q.losning) : (q.regn ? (M.autoLosning(q.regn) || ['']).join(' ') : '');
            if (!los) bad(id + ' mangler løsning');
            else if (!plain(los).includes(fmt(sv[0]))) bad(`${id} løsningen nevner ikke svaret ${fmt(sv[0])}: "${plain(los)}"`);
          } else if (q.type === 'rekke') {
            const sorted = q.svar.slice().sort((a, b) => a - b);
            if (JSON.stringify(sorted) !== JSON.stringify(q.svar)) bad(id + ' rekke: svaret er ikke sortert');
          } else if (q.type === 'fritekst') {
            if (!q.losning) bad(id + ' fritekst mangler løsningsforslag');
          }
          if (!q.hint && mode === 'steg') bad(id + ' mangler hint (steg)');
          rap.push([mode, id, q.type, plain(String(q.tekst).replace('{u}', q.regn !== undefined ? q.regn : '')), q.type === 'valg' ? plain(q.valg[q.riktig]) : (q.svar === undefined ? '' : (Array.isArray(q.svar) ? q.svar.map(fmt).join(', ') : fmt(q.svar)))]);
        });
      }
    }));
    console.log('   oppgaver: ' + oppg);
  }
}

/* ekstra */
for (const key of Object.keys(M.ekstra)) for (const mode of ['utforsk', 'steg']) {
  const def = M.ekstra[key](mode);
  let tot = 0;
  for (let seed = 1; seed <= 400; seed++) {
    def.seksjoner.forEach(sek => {
      const r = M.rng(seed * 7919 + sek.id.length);
      for (let i = 0; i < sek.antall; i++) {
        const it = sek.lag(r, i); tot++;
        if (it.str === undefined) {
          if (typeof it.num !== 'number' || isNaN(it.num)) bad(`ekstra ${mode} ${sek.id}: ugyldig svar`);
          else if (Math.abs(it.num) > 1e6) bad(`ekstra ${mode} ${sek.id}: stort tall ${it.num}`);
          else if (Math.abs(it.num * 1000 - Math.round(it.num * 1000)) > 1e-6) bad(`ekstra ${mode} ${sek.id}: ikke heltall ${it.num} (${plain(it.q)})`);
          if (Object.is(it.num, -0)) bad(`ekstra ${mode} ${sek.id}: -0`);
          if (!plain(it.a).includes(fmt(it.num))) bad(`ekstra ${mode} ${sek.id}: fasit viser ikke ${fmt(it.num)}: ${plain(it.a)}`);
        } else if (typeof it.str !== 'string' || !it.str) bad('ekstra str ' + it.str);
      }
    });
  }
  console.log(`\n== ekstra ${key} ${mode}: ${def.seksjoner.length} deler, ${tot} generte oppgaver sjekket`);
}
/* skriv ut eksempler */
const def = M.ekstra['8/negative-tall']('utforsk');
def.seksjoner.forEach(sek => { const r = M.rng(42); const it = sek.lag(r, 1); console.log('  ' + sek.id.padEnd(10) + plain(it.q) + '   -> ' + plain(it.a)); });

fs.writeFileSync(path.join(__dirname, 'oppgaveliste.txt'), rap.map(r => r.join(' | ')).join('\n'));
console.log(`\n${antall} oppgaver i innholdet. ${feil ? feil + ' FEIL' : 'Ingen feil funnet'}.`);
process.exit(feil ? 1 : 0);
