/* ============================================================
   Håndskrevne føringseksempler på ruteark:
   - «Se hvordan det ser ut»: tre sider per trinn, med nummererte forklaringer som lyser opp på siden
   - «Finn feilene»: en slurvete side der elevene trykker på det som er galt, også det som mangler
   Ingenting lagres.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE; const L = M.les; const H = L.hand = L.hand || {};
  const esc = s => String(s === undefined || s === null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const $ = (el, sel) => el.querySelector(sel);
  const $$ = (el, sel) => Array.prototype.slice.call(el.querySelectorAll(sel));

  function merk(s) {
    let h = esc(s);
    h = h.replace(/==(.+?)==/g, '<span class="hs-dbl">$1</span>').replace(/~~(.+?)~~/g, '<span class="hs-str">$1</span>').replace(/%%(.+?)%%/g, '<span class="hs-smuss">$1</span>');
    h = h.replace(/\{\{(\w+)\|(.+?)\}\}/g, (m, id, t) => '<span class="hs-n hs-b" data-n="' + id + '">' + t + '</span>');
    h = h.replace(/&lt;&lt;(\w+)\|(.+?)&gt;&gt;/g, (m, id, t) => '<span class="hs-f" data-f="' + id + '" tabindex="0" role="button" aria-label="Mulig feil">' + t + '</span>');
    return h;
  }
  const SKISSER = {
    trekant: '<svg viewBox="0 0 230 104" role="img" aria-label="Skisse av en rettvinklet trekant med sidene 6 cm, 8 cm og c" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#1e3a8a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 84 L176 84 L176 14 Z"/><path d="M164 84 L164 72 L176 72"/></g><g fill="#1e3a8a" font-family="Patrick Hand, Segoe Print, cursive" font-size="19"><text x="86" y="101">8 cm</text><text x="184" y="55">6 cm</text><text x="78" y="40">c</text></g></svg>'
  };
  function linje(l) {
    if (typeof l === 'string') l = { t: l };
    if (l.g) {
      return '<div class="hs-g">' + l.g.map((r, i) => {
        const nc = l.n ? ' hs-n' + (i === 0 ? ' hs-b' : '') + '" data-n="' + l.n : '', kc = l.k ? ' hs-n' + (i === 0 ? ' hs-b' : '') + '" data-n="' + l.k : '';
        return '<span class="hs-gv' + nc + '">' + merk(r[0]) + '</span><span class="hs-ge' + (l.n ? ' hs-n" data-n="' + l.n : '') + '">=</span><span class="hs-gh' + nc + '">' + merk(r[1]) + '</span><span class="hs-gk' + (r[2] ? kc : '') + '">' + (r[2] ? '| ' + merk(r[2]) : '') + '</span>';
      }).join('') + '</div>';
    }
    if (l.skisse) return '<div class="hs-l hs-skisse">' + SKISSER[l.skisse] + '</div>';
    if (l.tom) return '<div class="hs-l' + (l.n ? ' hs-n hs-b" data-n="' + l.n : '') + '">&nbsp;</div>';
    return '<div class="hs-l' + (l.i ? ' i' : '') + '">' + (l.nr ? '<span class="hs-nr hs-n hs-b" data-n="1">' + esc(l.nr) + '</span>' : '') + merk(l.t) + '</div>';
  }
  function ark(linjer, ekstra) { return '<div class="hs-side' + (ekstra || '') + '"><div class="hs-ark">' + linjer.map(linje).join('') + '</div></div>'; }

  function galleriHTML(d) {
    const N = H.NOTER;
    return '<div class="hs-faner" role="tablist" aria-label="Velg eksempel">' + d.sider.map((s, i) => '<button type="button" role="tab" class="hs-fane' + (i === 0 ? ' valgt' : '') + '" data-p="' + i + '" aria-selected="' + (i === 0) + '">' + (i + 1) + '. ' + esc(s.navn) + '</button>').join('') + '</div>' +
      d.sider.map((s, i) => '<div class="hs-visning" data-p="' + i + '"' + (i ? ' hidden' : '') + '>' +
        '<p class="hs-oppg lesbar"><strong>Oppgaven:</strong> ' + esc(s.oppg) + '</p>' +
        '<div class="hs-rad"><div class="hs-venstre">' + ark(s.linjer, ' med-tall') + '<button type="button" class="knapp liten hs-tall-knapp">Skjul tallene på siden</button></div>' +
        '<ol class="hs-noter" aria-label="Forklaringer. Trykk på en for å se hvor den hører til.">' + N[s.kort].map(n => '<li><button type="button" class="hs-note" data-n="' + n[0] + '" aria-pressed="false"><span class="hs-tallbadge">' + n[0] + '</span><span><strong>' + esc(n[1]) + '</strong> ' + esc(n[2]) + '</span></button></li>').join('') + '</ol></div></div>').join('');
  }
  function feilHTML(d) {
    const f = d.feil, F = H.FEIL;
    const sone = (id, nr) => '<span class="hs-zone hs-zone-' + id + '" data-f="' + id + '" tabindex="0" role="button" aria-label="Mulig feil"></span>';
    const ant = 3 + Object.keys(f.f).length;
    return '<p class="hs-oppg lesbar"><strong>Oppgaven:</strong> ' + esc(f.oppg) + '</p>' +
      '<div class="hs-side hs-bad" data-ant="' + ant + '"><div class="hs-ark">' + sone('marg') + sone('nr') + f.linjer.map(linje).join('') + '</div></div>' +
      '<p class="hs-teller lesbar" aria-live="polite"></p><div class="hs-melding lesbar" aria-live="polite"></div><ul class="hs-funnet"></ul>' +
      '<div class="les-knapper"><button type="button" class="knapp liten hs-vis-alle">Vis alle feilene</button> <button type="button" class="knapp primær liten hs-se-riktig" hidden>Se riktig føring ↑</button></div>';
  }
  H.html = function (trinn) {
    const d = H[trinn]; if (!d) return '';
    return '<section class="seksjon farge-2 les-hs"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">2</span><h2>Se hvordan det ser ut på ruteark</h2></div>' +
      '<p class="lesbar">Slik kan en fin side se ut for hånd. Trykk på en forklaring for å se hvor på siden den hører til. Du kan også bruke siden som mal i boka.</p><div class="hs-galleri">' + galleriHTML(d) + '</div></section>' +
      '<section class="seksjon farge-3 les-hs-feil"><div class="seksjon-hode"><span class="seksjon-nr" aria-hidden="true">3</span><h2>Finn feilene i føringen</h2></div>' +
      '<p class="lesbar">Her er en side som ikke er fint ført. Trykk på alt du synes er galt. Noen feil er ting som mangler, så se også på marg og oppgavenummer.</p>' + feilHTML(d) + '</section>';
  };
  H.init = function (main, trinn) {
    const d = H[trinn]; if (!d) return;
    // galleri
    const gal = $(main, '.hs-galleri');
    $$(gal, '.hs-fane').forEach(b => b.addEventListener('click', () => {
      $$(gal, '.hs-fane').forEach(x => { const a = x === b; x.classList.toggle('valgt', a); x.setAttribute('aria-selected', a); });
      $$(gal, '.hs-visning').forEach(v => { v.hidden = v.dataset.p !== b.dataset.p; });
    }));
    $$(gal, '.hs-visning').forEach(v => {
      const side = $(v, '.hs-side');
      function velg(id) {
        $$(v, '.hs-note').forEach(n => { const a = n.dataset.n === id; n.classList.toggle('aktiv', a); n.setAttribute('aria-pressed', a); });
        $$(side, '.hs-n').forEach(e => e.classList.toggle('akt', e.dataset.n === id));
        side.classList.toggle('akt-marg', id === '1'); side.classList.toggle('har-akt', !!id);
      }
      let na = '';
      $$(v, '.hs-note').forEach(n => n.addEventListener('click', () => { na = na === n.dataset.n ? '' : n.dataset.n; velg(na); }));
      $(v, '.hs-tall-knapp').addEventListener('click', e => { const p = side.classList.toggle('med-tall'); e.target.textContent = p ? 'Skjul tallene på siden' : 'Vis tallene på siden'; });
    });
    // finn feilene
    const rot = $(main, '.les-hs-feil'), side = $(rot, '.hs-bad'), tel = $(rot, '.hs-teller'), msg = $(rot, '.hs-melding'), liste = $(rot, '.hs-funnet');
    const total = Number(side.dataset.ant); const tekster = Object.assign({}, H.FEIL, d.feil.f); const funnet = {}; let galt = 0;
    function oppdater() {
      const n = Object.keys(funnet).length; tel.innerHTML = '<strong>Funnet: ' + n + ' av ' + total + '</strong>';
      if (n === total) { msg.innerHTML = '🎉 <strong>Du fant alle feilene.</strong> Se på riktig føring av samme type oppgave for å sammenligne.'; $(rot, '.hs-se-riktig').hidden = false; }
    }
    function marker(id, vis) {
      if (funnet[id]) return; funnet[id] = true;
      $$(side, '[data-f="' + id + '"]').forEach(e => e.classList.add('funnet'));
      const li = document.createElement('li'); li.innerHTML = '✅ <strong>' + esc(tekster[id][0]) + ':</strong> ' + esc(tekster[id][1]); liste.appendChild(li);
      if (!vis) { msg.textContent = ''; galt = 0; }
      oppdater();
    }
    side.addEventListener('click', e => {
      const t = e.target.closest('[data-f]');
      if (t) { marker(t.dataset.f); return; }
      if (Object.keys(funnet).length === total) return;
      galt++; msg.textContent = galt >= 3 ? 'Ikke her. Tips: Se på marg og oppgavenummer, likhetstegnene, hva som er overskrevet og hvordan svaret er skrevet.' : 'Ikke her. Se nøye etter.';
    });
    side.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset && e.target.dataset.f) { e.preventDefault(); marker(e.target.dataset.f); } });
    $(rot, '.hs-vis-alle').addEventListener('click', () => { Object.keys(tekster).filter(id => $(side, '[data-f="' + id + '"]')).forEach(id => marker(id, true)); });
    $(rot, '.hs-se-riktig').addEventListener('click', () => { const f0 = $(gal, '.hs-fane[data-p="0"]'); f0.click(); gal.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    oppdater();
  };
})();
