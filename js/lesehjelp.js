/* ============================================================
   Lesehjelp
   - Opplesing (nettleserens innebygde talesyntese), også av enkeltord
   - Ordforklaringer (fungerer for alle, også uten lesehjelp)
   - Lettlest tekst, tekststørrelse, bakgrunnsfarge, leselinjal
   Ingenting lagres. Valgene gjelder bare mens siden er åpen.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;
  const LH = { on: false, les: true, skrift: true, storrelse: 1, bg: 'krem', linjal: false, fart: 0.95 };
  const STORRELSER = [1, 1.12, 1.25, 1.4];
  let ordliste = [];
  let queue = [], qi = 0, aktivt = null, spiller = false;
  let panel, popup, rTopp, rBunn, popAnker = null;

  M.setOrdliste = function (l) { ordliste = l || []; };

  /* ---------- tale ---------- */
  const harTale = () => 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  function norskStemme() {
    if (!harTale()) return null;
    const vs = window.speechSynthesis.getVoices();
    return vs.find(v => /^nb/i.test(v.lang)) || vs.find(v => /^no/i.test(v.lang)) || vs.find(v => /norw|norsk|bokm/i.test(v.name)) || null;
  }
  function stotte() {
    const el = document.getElementById('lh-stotte'); if (!el) return;
    if (!harTale()) el.textContent = 'Denne nettleseren kan ikke lese opp tekst. Prøv Chrome, Edge eller Safari.';
    else if (!norskStemme()) el.textContent = 'Fant ingen norsk stemme på denne enheten. Opplesingen kan høres uvanlig ut. Du kan som regel legge til en norsk stemme i enhetens innstillinger.';
    else el.textContent = '';
  }
  function tale(tekst, ferdig) {
    if (!harTale()) { stotte(); if (ferdig) ferdig(); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(M.forTale(tekst));
    u.lang = 'nb-NO'; const v = norskStemme(); if (v) u.voice = v; u.rate = LH.fart;
    u.onend = () => { if (ferdig) ferdig(); };
    u.onerror = () => { if (ferdig) ferdig(); };
    window.speechSynthesis.speak(u);
  }
  function tekstFra(el) {
    const k = el.cloneNode(true);
    k.querySelectorAll('.les-knapp,script,style,.skjul-for-tale').forEach(x => x.remove());
    return k.textContent.replace(/\s+/g, ' ').trim();
  }
  function fjernMarkering() { document.querySelectorAll('.leses').forEach(x => x.classList.remove('leses')); }
  function stopp() {
    queue = []; qi = 0; spiller = false; fjernMarkering();
    if (harTale()) window.speechSynthesis.cancel();
    const p = document.getElementById('lh-pause'); if (p) p.textContent = '⏸ Pause';
  }
  function lesEn(el) {
    stopp(); el.classList.add('leses');
    tale(tekstFra(el), () => el.classList.remove('leses'));
  }
  function nesteIKo() {
    fjernMarkering();
    if (qi >= queue.length) { spiller = false; return; }
    const el = queue[qi++];
    el.classList.add('leses');
    try { el.scrollIntoView({ block: 'center', behavior: M.reduced() ? 'auto' : 'smooth' }); } catch (e) { /* ignore */ }
    tale(tekstFra(el), nesteIKo);
  }
  function lesSiden() {
    stopp();
    const main = document.getElementById('main');
    queue = Array.from(main.querySelectorAll('.lesbar')).filter(el => el.offsetParent !== null && !el.closest('[hidden]') && !el.closest('.skjul-for-tale'));
    qi = 0; spiller = true; nesteIKo();
  }
  function pause() {
    if (!harTale()) return;
    const p = document.getElementById('lh-pause');
    if (window.speechSynthesis.paused) { window.speechSynthesis.resume(); p.textContent = '⏸ Pause'; }
    else { window.speechSynthesis.pause(); p.textContent = '▶ Fortsett'; }
  }
  M.lesehjelpStopp = stopp;

  /* ---------- lese-knapper ved tekst ---------- */
  M.addReadButtons = function (root) {
    (root || document).querySelectorAll('.lesbar').forEach(el => {
      if (el.querySelector(':scope > .les-knapp')) return;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'les-knapp'; b.setAttribute('aria-label', 'Les opp denne teksten'); b.title = 'Les opp';
      b.textContent = '🔊';
      el.insertBefore(b, el.firstChild);
    });
  };

  /* ---------- ordforklaring ---------- */
  function visPopup(rect, ord, forklaring, lesTekst) {
    popup.querySelector('.ord-ord').textContent = ord;
    popup.querySelector('.ord-forklaring').innerHTML = forklaring ? M.markup(forklaring) : '<em>Trykk på høyttaleren for å høre ordet.</em>';
    popup.dataset.les = lesTekst || ord;
    popup.querySelector('.ord-les').hidden = !(LH.on && LH.les);
    popup.hidden = false;
    const w = popup.offsetWidth, h = popup.offsetHeight;
    let left = rect.left + window.scrollX; left = Math.max(8, Math.min(left, window.scrollX + document.documentElement.clientWidth - w - 8));
    let top = rect.top + window.scrollY - h - 10; if (top < window.scrollY + 8) top = rect.bottom + window.scrollY + 10;
    popup.style.left = left + 'px'; popup.style.top = top + 'px';
  }
  function lukkPopup() {
    if (!popup) return; popup.hidden = true; popAnker = null;
    if (window.CSS && CSS.highlights) CSS.highlights.delete('lesord');
  }
  function finnOrd(ord) {
    const lo = ord.toLowerCase();
    return ordliste.find(e => e.ord.some(v => v.toLowerCase() === lo)) || null;
  }
  function ordVedPunkt(x, y) {
    let node, off;
    if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(x, y); if (!p) return null; node = p.offsetNode; off = p.offset; }
    else if (document.caretRangeFromPoint) { const r = document.caretRangeFromPoint(x, y); if (!r) return null; node = r.startContainer; off = r.startOffset; }
    else return null;
    if (!node || node.nodeType !== 3) return null;
    const txt = node.textContent; const re = /[\p{L}\p{N}−-]/u;
    let s = off, e = off;
    while (s > 0 && re.test(txt[s - 1])) s--;
    while (e < txt.length && re.test(txt[e])) e++;
    if (s === e) return null;
    const range = document.createRange(); range.setStart(node, s); range.setEnd(node, e);
    return { ord: txt.slice(s, e), range: range };
  }

  /* ---------- bruk valgene ---------- */
  function apply() {
    const b = document.body;
    b.classList.toggle('lh', LH.on);
    b.classList.toggle('lh-skrift', LH.on && LH.skrift);
    b.classList.toggle('lh-les', LH.on && LH.les);
    b.dataset.bg = LH.on ? LH.bg : 'standard';
    document.documentElement.style.setProperty('--fs', LH.on ? STORRELSER[LH.storrelse] : 1);
    rTopp.hidden = rBunn.hidden = !(LH.on && LH.linjal);
    const kn = document.getElementById('lh-knapp'); if (kn) kn.setAttribute('aria-pressed', LH.on ? 'true' : 'false');
    document.getElementById('lh-på').checked = LH.on;
    document.getElementById('lh-les').checked = LH.les;
    document.getElementById('lh-skrift').checked = LH.skrift;
    document.getElementById('lh-linjal').checked = LH.linjal;
    panel.querySelectorAll('[data-bg]').forEach(x => x.setAttribute('aria-pressed', x.dataset.bg === LH.bg ? 'true' : 'false'));
    panel.querySelectorAll('[data-fart]').forEach(x => x.setAttribute('aria-pressed', Math.abs(+x.dataset.fart - LH.fart) < 0.01 ? 'true' : 'false'));
    panel.querySelector('.lh-valg').classList.toggle('av', !LH.on);
    if (LH.on) M.addReadButtons(document.getElementById('main'));
    if (!LH.on) stopp();
  }

  M.lesehjelpInit = function () {
    panel = document.createElement('aside');
    panel.id = 'lh-panel'; panel.className = 'lh-panel'; panel.hidden = true;
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-labelledby', 'lh-tittel');
    panel.innerHTML =
      '<div class="lh-hode"><h2 id="lh-tittel">📖 Lesehjelp</h2><button type="button" class="lukk" id="lh-lukk" aria-label="Lukk lesehjelp">✕</button></div>' +
      '<p class="lh-intro">Her kan du få teksten lest opp, gjøre den lettere å lese og få forklart ord.</p>' +
      '<label class="bryter hoved"><input type="checkbox" id="lh-på"><span class="glider" aria-hidden="true"></span><span>Slå på lesehjelp</span></label>' +
      '<div class="lh-valg">' +
      '<label class="bryter"><input type="checkbox" id="lh-les"><span class="glider" aria-hidden="true"></span><span>Opplesning<small>🔊 ved teksten. Trykk på et ord for å høre det.</small></span></label>' +
      '<label class="bryter"><input type="checkbox" id="lh-skrift"><span class="glider" aria-hidden="true"></span><span>Lettlest tekst<small>Tydeligere skrift og mer luft</small></span></label>' +
      '<label class="bryter"><input type="checkbox" id="lh-linjal"><span class="glider" aria-hidden="true"></span><span>Leselinjal<small>Gjør det bare en linje lyst om gangen</small></span></label>' +
      '<div class="lh-rad"><span>Tekststørrelse</span><div class="seg"><button type="button" id="lh-mindre" aria-label="Mindre tekst">A−</button><button type="button" id="lh-storre" aria-label="Større tekst">A+</button></div></div>' +
      '<div class="lh-rad"><span>Bakgrunn</span><div class="farger">' +
      '<button type="button" class="farge f-krem" data-bg="krem" aria-label="Krem"></button><button type="button" class="farge f-hvit" data-bg="hvit" aria-label="Hvit"></button>' +
      '<button type="button" class="farge f-blaa" data-bg="blå" aria-label="Lys blå"></button><button type="button" class="farge f-gronn" data-bg="grønn" aria-label="Lys grønn"></button></div></div>' +
      '<div class="lh-rad"><span>Lesetempo</span><div class="seg"><button type="button" data-fart="0.75">Sakte</button><button type="button" data-fart="0.95">Vanlig</button></div></div>' +
      '<div class="lh-spill"><button type="button" class="knapp primær" id="lh-les-side">▶ Les opp siden</button><button type="button" class="knapp" id="lh-pause">⏸ Pause</button><button type="button" class="knapp" id="lh-stopp">⏹ Stopp</button></div>' +
      '</div><p class="lh-merk" id="lh-stotte"></p>';
    document.body.appendChild(panel);

    popup = document.createElement('div');
    popup.className = 'ord-popup'; popup.hidden = true; popup.setAttribute('role', 'dialog'); popup.setAttribute('aria-label', 'Ordforklaring');
    popup.innerHTML = '<div class="ord-topp"><strong class="ord-ord"></strong><button type="button" class="lukk" aria-label="Lukk">✕</button></div><div class="ord-forklaring"></div><button type="button" class="knapp liten ord-les">🔊 Les opp</button>';
    document.body.appendChild(popup);

    rTopp = document.createElement('div'); rTopp.className = 'linjal linjal-topp'; rTopp.hidden = true; rTopp.setAttribute('aria-hidden', 'true');
    rBunn = document.createElement('div'); rBunn.className = 'linjal linjal-bunn'; rBunn.hidden = true; rBunn.setAttribute('aria-hidden', 'true');
    document.body.appendChild(rTopp); document.body.appendChild(rBunn);
    function flytLinjal(y) { rTopp.style.height = Math.max(0, y - 34) + 'px'; rBunn.style.top = (y + 34) + 'px'; }
    flytLinjal(window.innerHeight / 2);
    window.addEventListener('pointermove', e => { if (LH.on && LH.linjal) flytLinjal(e.clientY); }, { passive: true });
    window.addEventListener('pointerdown', e => { if (LH.on && LH.linjal) flytLinjal(e.clientY); }, { passive: true });

    /* valg */
    const $ = id => document.getElementById(id);
    $('lh-på').addEventListener('change', e => { LH.on = e.target.checked; apply(); });
    $('lh-les').addEventListener('change', e => { LH.les = e.target.checked; apply(); });
    $('lh-skrift').addEventListener('change', e => { LH.skrift = e.target.checked; apply(); });
    $('lh-linjal').addEventListener('change', e => { LH.linjal = e.target.checked; apply(); });
    $('lh-mindre').addEventListener('click', () => { LH.storrelse = Math.max(0, LH.storrelse - 1); apply(); });
    $('lh-storre').addEventListener('click', () => { LH.storrelse = Math.min(STORRELSER.length - 1, LH.storrelse + 1); apply(); });
    panel.querySelectorAll('[data-bg]').forEach(b => b.addEventListener('click', () => { LH.bg = b.dataset.bg; apply(); }));
    panel.querySelectorAll('[data-fart]').forEach(b => b.addEventListener('click', () => { LH.fart = +b.dataset.fart; apply(); }));
    $('lh-les-side').addEventListener('click', lesSiden);
    $('lh-pause').addEventListener('click', pause);
    $('lh-stopp').addEventListener('click', stopp);
    $('lh-lukk').addEventListener('click', () => { panel.hidden = true; const k = $('lh-knapp'); if (k) k.focus(); });

    M.toggleLesehjelp = function () {
      if (panel.hidden) { panel.hidden = false; if (!LH.on) { LH.on = true; apply(); } stotte(); $('lh-på').focus(); }
      else { panel.hidden = true; }
    };

    /* klikk: les opp blokk / ord / ordforklaring */
    document.addEventListener('click', function (e) {
      const t = e.target;
      const lk = t.closest('.les-knapp');
      if (lk) { lesEn(lk.parentNode); return; }
      const ordKnapp = t.closest('.ord');
      if (ordKnapp) {
        const e2 = ordliste[+ordKnapp.dataset.ord];
        if (popAnker === ordKnapp && !popup.hidden) { lukkPopup(); return; }
        popAnker = ordKnapp;
        visPopup(ordKnapp.getBoundingClientRect(), ordKnapp.textContent, e2 ? e2.forklaring : '', ordKnapp.textContent + '. ' + (e2 ? e2.forklaring : ''));
        if (LH.on && LH.les && e2) tale(ordKnapp.textContent + '. ' + tekstFraHTML(e2.forklaring));
        return;
      }
      if (t.closest('.ord-popup .lukk')) { lukkPopup(); return; }
      if (t.closest('.ord-les')) { tale(popup.dataset.les.replace(/<[^>]+>/g, '')); return; }
      if (t.closest('.ord-popup')) return;
      if (!popup.hidden) lukkPopup();
      /* trykk på vilkårlig ord når opplesing er på */
      if (!(LH.on && LH.les)) return;
      if (t.closest('button,a,input,textarea,select,summary,#lh-panel,.seg')) return;
      if (!t.closest('.lesbar')) return;
      const o = ordVedPunkt(e.clientX, e.clientY);
      if (!o) return;
      if (window.CSS && CSS.highlights && window.Highlight) { CSS.highlights.set('lesord', new Highlight(o.range)); }
      const f = finnOrd(o.ord);
      popAnker = null;
      visPopup(o.range.getBoundingClientRect(), o.ord, f ? f.forklaring : '', o.ord);
      tale(o.ord + (f ? '. ' + tekstFraHTML(f.forklaring) : ''));
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { if (!popup.hidden) lukkPopup(); else if (!panel.hidden) panel.hidden = true; }
    });
    if (harTale()) window.speechSynthesis.onvoiceschanged = stotte;
    apply();
  };

  function tekstFraHTML(h) { const d = document.createElement('div'); d.innerHTML = M.markup(h); return d.textContent; }
})();
