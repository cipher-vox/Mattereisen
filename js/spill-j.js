/* Jeopardy: finn spørsmålet (8., 9. og 10. trinn).
   Svaret og opplysningene er gitt, og laget skal finne spørsmålet som passer.
   Lag, navn og poeng finnes bare i minnet mens spillet pågår. Ingenting lagres. */
(function () {
  'use strict';
  const M = window.MATTE, G = M.G;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  function lagSpill(trinn) {
    G.add({
      id: 'jeopardy-' + trinn, tittel: 'Jeopardy: finn spørsmålet', ikon: '🎲', trinn: trinn, temaer: [],
      kort: 'Svaret er gitt. Hva er spørsmålet? Spill alene eller i lag.',
      hvordan: 'Velg en rute på brettet. Du får noen opplysninger (tekst og noen ganger en graf) og et svar. Finn spørsmålet som passer til både opplysningene og svaret. Rolig: ett alternativ færre og tips. Utfordring: feil svar trekker poeng. Du kan også la læreren dømme: da sier laget spørsmålet høyt.',
      lærer: 'Å lese en sammensatt tekst eller graf, skille viktig fra uviktig og finne hvilket spørsmål opplysningene og svaret hører sammen med. Dette er den omvendte øvelsen av vanlige tekstoppgaver, og den trener presis lesing.',
      start: function (el) { start(el, trinn); }
    });
  }

  function start(el, trinn) {
    const D = M.les.jeopardy[trinn];
    const kat = D.kategorier;
    let lag = [], aktiv = 0, brukt = {}, lærerDømmer = false, dobbelt = null;

    function oppsett() {
      el.innerHTML = '<div class="jp-oppsett"><h3>Hvor mange lag?</h3><div class="jp-antall" role="group" aria-label="Antall lag">' +
        [1, 2, 3, 4].map(n => '<button type="button" class="knapp' + (n === 2 ? ' primær' : '') + ' jp-n" data-n="' + n + '" aria-pressed="' + (n === 2) + '">' + (n === 1 ? '1 (alene)' : n + ' lag') + '</button>').join('') + '</div>' +
        '<div class="jp-navn"></div>' +
        '<label class="jp-laerer"><input type="checkbox" id="jp-laerer"> 👩‍🏫 Læreren dømmer (laget sier spørsmålet høyt, ingen svaralternativer)</label>' +
        '<p class="les-lagres-ikke">Lagnavn og poeng finnes bare mens spillet pågår. Ingenting lagres.</p>' +
        '<button type="button" class="knapp primær stor jp-start">▶ Start spillet</button></div>';
      let n = 2;
      function navn() {
        const boks = G.q(el, '.jp-navn'); const gamle = Array.prototype.map.call(boks.querySelectorAll('input'), i => i.value);
        boks.innerHTML = Array.from({ length: n }, (_, i) => '<label>' + (n === 1 ? 'Navn (valgfritt)' : 'Lag ' + (i + 1)) + '<input type="text" class="jp-lagnavn" maxlength="20" value="' + esc(gamle[i] || (n === 1 ? 'Deg' : 'Lag ' + (i + 1))) + '"></label>').join('');
      }
      navn();
      el.querySelectorAll('.jp-n').forEach(b => b.addEventListener('click', () => { n = +b.dataset.n; el.querySelectorAll('.jp-n').forEach(x => { x.classList.toggle('primær', x === b); x.setAttribute('aria-pressed', x === b); }); navn(); }));
      G.q(el, '.jp-start').addEventListener('click', () => {
        lag = Array.prototype.map.call(el.querySelectorAll('.jp-lagnavn'), (i, k) => ({ navn: (i.value || '').trim() || (n === 1 ? 'Deg' : 'Lag ' + (k + 1)), poeng: 0 }));
        lærerDømmer = G.q(el, '#jp-laerer').checked; aktiv = 0; brukt = {};
        const alle = []; kat.forEach((k, ki) => k.rader.forEach((_, ri) => alle.push(ki + '-' + ri)));
        dobbelt = G.pick(alle.filter(x => +x.split('-')[1] >= 1));
        bord();
      });
    }

    function tavle() {
      return '<div class="jp-tavle" role="list" aria-label="Poengtavle">' + lag.map((l, i) => '<div class="jp-lag' + (i === aktiv && lag.length > 1 ? ' aktiv' : '') + '" role="listitem"><span class="jp-lag-navn">' + esc(l.navn) + '</span><span class="jp-lag-poeng">' + l.poeng + '</span></div>').join('') + '</div>';
    }
    function bord() {
      const ferdig = Object.keys(brukt).length === kat.length * 4;
      if (ferdig) return slutt();
      let h = tavle() + (lag.length > 1 ? '<p class="jp-tur lesbar">Det er <strong>' + esc(lag[aktiv].navn) + '</strong> sin tur. Velg en rute.</p>' : '<p class="jp-tur lesbar">Velg en rute.</p>');
      h += '<div class="jp-brett" style="--kol:' + kat.length + '">' + kat.map(k => '<div class="jp-kat"><span aria-hidden="true">' + k.ikon + '</span> ' + esc(k.navn) + '</div>').join('');
      for (let r = 0; r < 4; r++) kat.forEach((k, ki) => {
        const id = ki + '-' + r, b = !!brukt[id];
        h += '<button type="button" class="jp-rute' + (b ? ' brukt' : '') + '" data-k="' + ki + '" data-r="' + r + '"' + (b ? ' disabled' : '') + ' aria-label="' + esc(k.navn) + ', ' + k.rader[r].p + ' poeng' + (b ? ', brukt' : '') + '">' + (b ? '✓' : k.rader[r].p) + '</button>';
      });
      h += '</div>';
      el.innerHTML = h;
      el.querySelectorAll('.jp-rute:not([disabled])').forEach(b => b.addEventListener('click', () => rute(+b.dataset.k, +b.dataset.r)));
    }

    function rute(ki, ri) {
      const c = kat[ki].rader[ri], id = ki + '-' + ri, dd = id === dobbelt, niv = G.niv();
      const poeng = c.p * (dd ? 2 : 1);
      let valg = c.feil.map(t => ({ t: t, ok: false }));
      if (niv === 0) valg = valg.slice(0, 2);
      valg = G.shuffle(valg.concat([{ t: c.ok, ok: true }]));
      let h = tavle() + '<div class="jp-clue"><div class="jp-clue-hode"><span>' + kat[ki].ikon + ' ' + esc(kat[ki].navn) + ' · ' + poeng + ' poeng' + (dd ? ' · 🌟 DOBBEL POENG!' : '') + '</span><span>' + esc(lag[aktiv].navn) + '</span></div>' +
        '<div class="jp-opplysninger lesbar"><strong>Opplysninger:</strong> ' + esc(c.tekst) + '</div>' +
        (c.graf ? '<div class="les-svg-boks jp-graf">' + M.les.grafSvg(c.graf, true) + '</div>' : '') +
        '<div class="jp-svar"><span>Svaret er</span><strong>' + esc(c.svar) + '</strong></div>' +
        '<p class="sp-spm">Hva er spørsmålet?</p>' + (niv === 0 && c.tips ? '<p class="les-merk lesbar">💡 Tips: ' + esc(c.tips) + '</p>' : '');
      if (lærerDømmer) {
        h += '<p class="lesbar">Laget sier spørsmålet høyt. Læreren avgjør.</p><button type="button" class="knapp liten jp-vis">👁️ Vis forslag til spørsmål</button><div class="jp-forslag" hidden><p><strong>Godt spørsmål:</strong> ' + esc(c.ok) + (c.alt ? '</p><p><strong>Også godt:</strong> ' + esc(c.alt) : '') + '</p></div>' +
          '<div class="jp-dom"><button type="button" class="knapp primær jp-riktig">✅ Riktig</button> <button type="button" class="knapp jp-feil">❌ Ikke riktig</button></div>';
      } else {
        h += '<div class="les-valg">' + valg.map(v => '<button type="button" class="les-valg-knapp jp-alt" data-ok="' + (v.ok ? 1 : 0) + '">' + esc(v.t) + '</button>').join('') + '</div>';
      }
      h += '<div class="sp-fb" aria-live="polite"></div><div class="jp-under"></div></div>';
      el.innerHTML = h;
      function ferdigRute(ok) {
        brukt[id] = true;
        const strekk = niv === 2 && !ok ? Math.round(poeng / 2) : 0;
        if (ok) lag[aktiv].poeng += poeng; else lag[aktiv].poeng -= strekk;
        G.feedback(el, ok, ok ? '✅ <strong>Riktig!</strong> +' + poeng + ' poeng.' : '🤔 <strong>Ikke helt.</strong> Det beste spørsmålet er «' + esc(c.ok) + '».' + (strekk ? ' −' + strekk + ' poeng.' : ''));
        G.q(el, '.jp-clue').querySelectorAll('button.jp-alt, .jp-dom button, .jp-vis').forEach(b => { b.disabled = true; });
        const f = G.q(el, '.jp-forslag'); if (f) f.hidden = false;
        const under = G.q(el, '.jp-under');
        under.innerHTML = '<p class="lesbar jp-hvorfor"><strong>Slik finner du det:</strong> ' + esc(hvorfor(c)) + '</p><button type="button" class="knapp primær jp-videre">' + (Object.keys(brukt).length === kat.length * 4 ? '🏁 Se resultatet' : 'Tilbake til brettet →') + '</button>';
        const v = G.q(el, '.jp-videre'); v.focus();
        v.addEventListener('click', () => { aktiv = (aktiv + 1) % lag.length; bord(); });
      }
      if (lærerDømmer) {
        G.q(el, '.jp-vis').addEventListener('click', () => { G.q(el, '.jp-forslag').hidden = false; });
        G.q(el, '.jp-riktig').addEventListener('click', () => ferdigRute(true));
        G.q(el, '.jp-feil').addEventListener('click', () => ferdigRute(false));
      } else {
        el.querySelectorAll('.jp-alt').forEach(b => b.addEventListener('click', () => {
          const ok = b.dataset.ok === '1'; b.classList.add(ok ? 'ok' : 'feil');
          el.querySelectorAll('.jp-alt').forEach(x => { if (x.dataset.ok === '1') x.classList.add('ok'); });
          ferdigRute(ok);
        }));
      }
    }
    function hvorfor(c) {
      return 'Se på svaret («' + c.svar + '») og enheten i det. Spørsmålet må kunne ha akkurat det svaret, og bruke opplysningene i teksten eller grafen. Opplysninger som ikke trengs, kan du se bort fra.';
    }

    function slutt() {
      const sortert = lag.slice().sort((a, b) => b.poeng - a.poeng), best = sortert[0].poeng;
      const vinnere = sortert.filter(l => l.poeng === best).map(l => esc(l.navn));
      const tekst = (lag.length > 1 ? '<strong>' + (vinnere.length > 1 ? 'Delt førsteplass: ' : 'Vinner: ') + vinnere.join(' og ') + '</strong> med ' + best + ' poeng.<br>' : '') +
        sortert.map(l => esc(l.navn) + ': ' + l.poeng + ' poeng').join('<br>');
      G.slutt(el, { ikon: '🏆', tittel: 'Ferdig!', stjerner: '', tekst: tekst, lær: 'Å finne spørsmålet bak en oppgave: hva svaret måler, hvilke opplysninger som trengs, og hva som er støy.', igjen: oppsett });
    }
    oppsett();
  }

  [8, 9, 10].forEach(lagSpill);
})();
