/* Spill A: heis (negative tall), Tallknuseren (regneregler), Primtalljakten (faktorisering), Match-parene (potenser, vekstfaktor, enheter), Rotjegeren (kvadratrot) */
(function () {
  'use strict';
  const M = window.MATTE, G = M.G, F = M.fmt;
  const colr = n => n < 0 ? 'var(--neg)' : n > 0 ? 'var(--pos)' : 'var(--zero)';

  /* ===================== Heisen i gruva ===================== */
  G.add({
    id: 'heisen', tittel: 'Heisen i gruva', ikon: '⛏️', trinn: 8, temaer: ['8/negative-tall'],
    kort: 'Kjør heisen opp og ned i en gruve. Bakken er 0, dypet er negativt.',
    hvordan: 'Du får et spørsmål om hvor heisen skal. Trykk på etasjen som er riktig svar. Du har tre liv, og 10 spørsmål. De siste spørsmålene bruker pluss og minus med negative tall.',
    lærer: 'Å plassere negative tall på en tallinje, og å regne pluss og minus med negative tall: å legge til et negativt tall er å gå ned, og å trekke fra et negativt tall er å gå opp.',
    start: function (el) {
      let runde = 0, liv = 3, poeng = 0, q = null, låst = false, pos = 0;
      const LO = -6, HI = 6, RH = 30;
      function lag() {
        const hard = runde >= 5;
        for (;;) {
          const s = G.rnd(-5, 5), n = G.rnd(1, 6);
          let t, tekst, forklar;
          if (!hard || Math.random() < .25) {
            const opp = Math.random() < .5; t = opp ? s + n : s - n;
            tekst = 'Heisen står i etasje ' + M.num(s) + '. Den kjører <strong>' + (opp ? 'opp' : 'ned') + '</strong> ' + n + ' etasjer. Hvor stopper den?';
            forklar = opp ? F(s) + ' + ' + n + ' = ' + F(t) + '. Opp betyr at tallet blir større.' : F(s) + ' − ' + n + ' = ' + F(t) + '. Ned betyr at tallet blir mindre.';
          } else {
            const k = G.rnd(0, 2);
            if (k === 0) { t = s + (-n); tekst = 'Regn ut, og kjør heisen til svaret: ' + F(s) + ' + (' + F(-n) + ')'; forklar = 'Å legge til et negativt tall er det samme som å trekke fra: ' + F(s) + ' + (' + F(-n) + ') = ' + F(s) + ' − ' + n + ' = ' + F(t) + '.'; }
            else if (k === 1) { t = s - (-n); tekst = 'Regn ut, og kjør heisen til svaret: ' + F(s) + ' − (' + F(-n) + ')'; forklar = 'Minus et negativt tall blir pluss: ' + F(s) + ' − (' + F(-n) + ') = ' + F(s) + ' + ' + n + ' = ' + F(t) + '.'; }
            else { t = s - n; tekst = 'Regn ut, og kjør heisen til svaret: ' + F(s) + ' − ' + n; forklar = F(s) + ' − ' + n + ' = ' + F(t) + '. Du går ' + n + ' skritt mot venstre på tallinja (ned i gruva).'; }
          }
          if (t >= LO && t <= HI) return { s: s, t: t, tekst: tekst, forklar: forklar };
        }
      }
      function etasje(y) { return (HI - y) * RH + 4; }
      function tegn() {
        let rows = '';
        for (let y = HI; y >= LO; y--) {
          const dyp = y < 0;
          rows += '<g class="hs-rad" data-y="' + y + '" style="cursor:pointer"><rect x="0" y="' + etasje(y) + '" width="400" height="' + (RH - 2) + '" rx="6" fill="' + (dyp ? '#dbe6ff' : y === 0 ? '#d3f0dc' : '#fff1e3') + '" stroke="#fff"/><text x="16" y="' + (etasje(y) + 21) + '" font-weight="800" font-size="17" fill="' + colr(y) + '">' + F(y) + '</text><text x="70" y="' + (etasje(y) + 20) + '" font-size="13" fill="#52617a">' + (y === 0 ? 'Bakkenivå' : y > 0 ? y + ' over bakken' : -y + ' under bakken') + '</text></g>';
        }
        return '<svg viewBox="0 0 400 ' + ((HI - LO + 1) * RH + 8) + '" class="heis-svg" role="group" aria-label="Gruveheis med etasjer fra −6 til 6">' + rows +
          '<g id="kabin" style="transition:transform .6s ease;transform:translateY(' + etasje(pos) + 'px)"><rect x="332" y="0" width="52" height="' + (RH - 2) + '" rx="6" fill="#475569"/><text x="358" y="21" text-anchor="middle" font-size="18">🛗</text></g></svg>';
      }
      function vis() {
        q = lag(); låst = false;
        el.innerHTML = '<div class="sp-hud"><span>Spørsmål ' + (runde + 1) + ' av 10</span><span>Poeng: ' + poeng + '</span><span>' + G.hearts(liv) + '</span></div>' +
          '<div class="heis-rom"><div class="heis-venstre"><div class="sp-spm lesbar">' + q.tekst + '</div><div class="sp-fb" aria-live="polite"></div><button type="button" class="knapp primær sp-neste" hidden>Neste ▶</button></div><div class="heis-hoyre">' + tegn() + '</div></div>';
        pos = q.s; const k = G.q(el, '#kabin'); k.style.transition = 'none'; k.style.transform = 'translateY(' + etasje(q.s) + 'px)';
        el.querySelectorAll('.hs-rad').forEach(r => r.addEventListener('click', () => svar(+r.dataset.y)));
        G.q(el, '.sp-neste').addEventListener('click', neste);
        setTimeout(() => { k.style.transition = 'transform .6s ease'; }, 30);
      }
      function svar(y) {
        if (låst) return; låst = true;
        const kabin = G.q(el, '#kabin'); kabin.style.transform = 'translateY(' + etasje(y) + 'px)';
        const ok = y === q.t;
        if (ok) { poeng++; G.feedback(el, true, 'Riktig! 🎉 ' + q.forklar); } else { liv--; G.feedback(el, false, 'Ikke helt. Riktig etasje er ' + F(q.t) + '. ' + q.forklar); setTimeout(() => { kabin.style.transform = 'translateY(' + etasje(q.t) + 'px)'; }, 900); }
        const b = G.q(el, '.sp-neste'); b.hidden = false; b.focus();
        G.q(el, '.sp-hud').innerHTML = '<span>Spørsmål ' + (runde + 1) + ' av 10</span><span>Poeng: ' + poeng + '</span><span>' + G.hearts(liv) + '</span>';
      }
      function neste() {
        runde++;
        if (liv <= 0 || runde >= 10) return G.slutt(el, { ikon: liv > 0 ? '🏆' : '⛑️', tittel: liv > 0 ? 'Du kom deg trygt opp!' : 'Heisen stoppet i dypet', stjerner: G.stjerner(el, poeng, 10), tekst: 'Du fikk ' + poeng + ' av ' + runde + ' riktige.', lær: 'Negative tall ligger til venstre for null på tallinja (eller under bakken). Pluss et negativt tall tar deg ned, minus et negativt tall tar deg opp.', igjen: start2 });
        vis();
      }
      function start2() { runde = 0; liv = 3; poeng = 0; pos = 0; vis(); }
      start2();
    }
  });

  /* ===================== Tallknuseren ===================== */
  function løs(liste, mål) {
    if (liste.length === 1) return Math.abs(liste[0].v - mål) < 1e-9 ? liste[0].s : null;
    for (let i = 0; i < liste.length; i++) for (let j = i + 1; j < liste.length; j++) {
      const a = liste[i], b = liste[j]; const rest = liste.filter((_, k) => k !== i && k !== j);
      const c = [{ v: a.v + b.v, s: '(' + a.s + '+' + b.s + ')' }, { v: a.v * b.v, s: '(' + a.s + '×' + b.s + ')' }, { v: a.v - b.v, s: '(' + a.s + '−' + b.s + ')' }, { v: b.v - a.v, s: '(' + b.s + '−' + a.s + ')' }];
      if (b.v !== 0) c.push({ v: a.v / b.v, s: '(' + a.s + '÷' + b.s + ')' });
      if (a.v !== 0) c.push({ v: b.v / a.v, s: '(' + b.s + '÷' + a.s + ')' });
      for (const x of c) { const r = løs(rest.concat([x]), mål); if (r) return r; }
    }
    return null;
  }
  G.add({
    id: 'tallknuseren', tittel: 'Tallknuseren', ikon: '🧮', trinn: 8, temaer: ['8/regneregler'],
    kort: 'Bruk alle fire tallene nøyaktig én gang, og lag målet med +, −, × og ÷.',
    hvordan: 'Du får fire tall og et mål. Lag et regnestykke som bruker hvert tall én gang og gir akkurat målet. Du kan bruke parenteser. Trykk på tallene og tegnene, eller skriv selv. Står du helt fast, kan du få se en løsning etter at du har prøvd minst én gang.',
    lærer: 'Regnerekkefølge og parenteser: hva som regnes ut først, og hvordan parenteser endrer svaret. Dessuten kreativ hoderegning.',
    start: function (el) {
      let runde = 0, riktige = 0, tall, mål, uttr = '', forsøk = 0;
      const MÅL = [10, 10, 24, 24, 24];
      function ny() {
        mål = MÅL[runde];
        for (let k = 0; k < 300; k++) { const maks = runde < 2 ? 6 : runde < 4 ? 8 : 9; tall = [1, 2, 3, 4].map(() => G.rnd(1, maks)); if (løs(tall.map(v => ({ v: v, s: String(v) })), mål)) break; }
        uttr = ''; forsøk = 0; vis();
      }
      function bruktOK() { const brukt = (uttr.match(/\d+/g) || []).map(Number).sort().join(','); return brukt === tall.slice().sort().join(','); }
      function oppdater() {
        const v = G.regn(uttr); const out = G.q(el, '.tk-uttr'); out.textContent = uttr || 'Lag regnestykket her …';
        const bruk = {}; (uttr.match(/\d+/g) || []).forEach(x => bruk[x] = (bruk[x] || 0) + 1);
        const teller = {}; el.querySelectorAll('.tk-tall').forEach(b => { const n = b.dataset.n; teller[n] = (teller[n] || 0) + 1; b.disabled = teller[n] > (bruk[n] || 0) && false; });
        const st = G.q(el, '.tk-verdi'); st.textContent = v && bruktOK() ? '= ' + F(Math.round(v.verdi * 1e6) / 1e6) : '';
      }
      function vis() {
        el.innerHTML = '<div class="sp-hud"><span>Runde ' + (runde + 1) + ' av 5</span><span>Løst: ' + riktige + '</span></div>' +
          '<p class="sp-spm">Lag <span class="tk-mål">' + mål + '</span> med disse tallene:</p>' +
          '<div class="sp-rad tk-tallrad">' + tall.map(n => '<button type="button" class="sp-valg tk-tall" data-n="' + n + '">' + n + '</button>').join('') + '</div>' +
          '<div class="sp-rad tk-ops">' + ['+', '−', '×', '÷', '(', ')'].map(o => '<button type="button" class="sp-valg tk-op" data-o="' + o + '">' + o + '</button>').join('') + '<button type="button" class="sp-valg tk-slett" aria-label="Slett siste tegn">⌫</button></div>' +
          '<div class="tk-skjerm"><span class="tk-uttr"></span> <strong class="tk-verdi"></strong></div>' +
          '<div class="sp-rad"><label class="sr-only" for="tk-inn">Skriv regnestykket</label><input id="tk-inn" class="sp-input tk-inn" type="text" autocomplete="off" placeholder="Eller skriv her" inputmode="text"><button type="button" class="knapp primær tk-sjekk">Sjekk</button><button type="button" class="knapp liten tk-vis">👀 Se en løsning</button></div><div class="sp-fb" aria-live="polite"></div>';
        el.querySelectorAll('.tk-tall').forEach(b => b.addEventListener('click', () => { uttr += b.dataset.n; G.q(el, '.tk-inn').value = uttr; oppdater(); b.classList.add('brukt'); }));
        el.querySelectorAll('.tk-op').forEach(b => b.addEventListener('click', () => { uttr += b.dataset.o; G.q(el, '.tk-inn').value = uttr; oppdater(); }));
        G.q(el, '.tk-slett').addEventListener('click', () => { uttr = uttr.slice(0, -1); G.q(el, '.tk-inn').value = uttr; oppdater(); });
        G.q(el, '.tk-inn').addEventListener('input', e => { uttr = e.target.value; oppdater(); });
        G.q(el, '.tk-inn').addEventListener('keydown', e => { if (e.key === 'Enter') sjekk(); });
        G.q(el, '.tk-sjekk').addEventListener('click', sjekk);
        G.q(el, '.tk-vis').addEventListener('click', visLøsning);
        oppdater();
      }
      function sjekk() {
        const v = G.regn(uttr); forsøk++;
        if (!v) return G.feedback(el, false, 'Det der ble ikke et regnestykke jeg forstår. Sjekk at parentesene er riktige. 🙂');
        if (!bruktOK()) return G.feedback(el, false, 'Bruk hvert av de fire tallene nøyaktig én gang. (Du har brukt: ' + ((uttr.match(/\d+/g) || []).join(', ') || 'ingen') + ')');
        const verdi = Math.round(v.verdi * 1e6) / 1e6;
        if (Math.abs(verdi - mål) < 1e-9) { riktige++; G.feedback(el, true, 'Ja! ' + uttr.replace(/\s/g, '') + ' = ' + mål + ' 🎉'); neste(true); }
        else G.feedback(el, false, 'Regnestykket ditt blir ' + F(verdi) + ', ikke ' + mål + '. Prøv med andre parenteser eller andre tegn. Husk: gange og dele regnes før pluss og minus.');
      }
      function visLøsning() {
        if (!forsøk) return G.feedback(el, false, 'Prøv først! Trykk «Sjekk» på et forsøk, så kan du få se en løsning. 🙂');
        const l = løs(tall.map(v => ({ v: v, s: String(v) })), mål); const t = l.replace(/^\((.*)\)$/, '$1');
        G.feedback(el, true, 'En løsning: <strong>' + t + ' = ' + mål + '</strong>'); neste(false);
      }
      function neste() {
        el.querySelectorAll('button,input').forEach(b => b.disabled = true);
        const b = document.createElement('button'); b.type = 'button'; b.className = 'knapp primær'; b.textContent = runde >= 4 ? 'Se resultatet' : 'Neste runde ▶';
        el.appendChild(b); b.focus();
        b.addEventListener('click', function () { runde++; if (runde >= 5) G.slutt(el, { ikon: '🧮', tittel: 'Ferdig!', stjerner: G.stjerner(el, riktige, 5), tekst: 'Du klarte ' + riktige + ' av 5 selv.', lær: 'Parenteser bestemmer hva som regnes først. (3 + 5) × 2 = 16, men 3 + 5 × 2 = 13.', igjen: () => { runde = 0; riktige = 0; ny(); } }); else ny(); });
      }
      ny();
    }
  });

  /* ===================== Primtalljakten ===================== */
  const erPrim = n => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
  const faktorer = n => { const f = []; for (let d = 2; n > 1; d++) while (n % d === 0) { f.push(d); n /= d; } return f; };
  G.add({
    id: 'primtalljakten', tittel: 'Primtalljakten', ikon: '🎯', trinn: 8, temaer: ['8/faktorisering'],
    kort: 'Fang primtallene før tiden går ut. Men pass deg for de sammensatte!',
    hvordan: 'Du har 45 sekunder. Trykk på bobler som er primtall. Trykker du på et tall som ikke er et primtall, mister du et poeng, og du får se hvorfor. Tallene blir større etter hvert. Husk at 1 ikke er et primtall.',
    lærer: 'Å kjenne igjen primtall, og å se hvilke faktorer et tall har. Hver gang du bommer, får du se primtallsfaktoriseringen.',
    start: function (el) {
      let poeng = 0, tid = 45, maks = 30, bobler = [];
      const ny = (prim) => { for (let k = 0; k < 200; k++) { const n = G.rnd(1, maks); if (n === 1 ? !prim && Math.random() < .08 : erPrim(n) === prim) return n; } return prim ? 7 : 9; };
      function fyll() { bobler = []; for (let i = 0; i < 16; i++) bobler.push(ny(i < 6)); bobler = G.shuffle(bobler); }
      function tegn() {
        el.innerHTML = '<div class="sp-hud"><span class="pj-tid">⏱️ ' + tid + ' s</span><span class="pj-poeng">Poeng: ' + poeng + '</span></div><div class="pj-brett">' + bobler.map((n, i) => '<button type="button" class="pj-boble" data-i="' + i + '">' + n + '</button>').join('') + '</div><div class="sp-fb" aria-live="polite"></div>';
        el.querySelectorAll('.pj-boble').forEach(b => b.addEventListener('click', () => trykk(+b.dataset.i)));
      }
      function trykk(i) {
        const n = bobler[i], ok = erPrim(n);
        if (ok) { poeng++; G.feedback(el, true, n + ' er et primtall! ✅'); }
        else { poeng = Math.max(0, poeng - 1); G.feedback(el, false, n === 1 ? '1 er ikke et primtall (det har bare én faktor).' : n + ' er ikke et primtall: ' + n + ' = ' + faktorer(n).join(' · ') + '.'); }
        const antPrim = bobler.filter(erPrim).length - (ok ? 1 : 0);
        bobler[i] = ny(antPrim < 5 ? true : Math.random() < .35);
        const b = el.querySelectorAll('.pj-boble')[i]; b.textContent = bobler[i]; b.classList.add(ok ? 'pj-ok' : 'pj-feil'); setTimeout(() => b.classList.remove('pj-ok', 'pj-feil'), 350);
        G.q(el, '.pj-poeng').textContent = 'Poeng: ' + poeng;
      }
      function start2() {
        poeng = 0; tid = 45; maks = 30; fyll(); tegn();
        G.every(function () {
          tid--; const t = G.q(el, '.pj-tid'); if (!t) return; t.textContent = '⏱️ ' + tid + ' s';
          if (tid === 30) maks = 60; if (tid === 15) maks = 100;
          if (tid <= 0) { G.stopp(); G.slutt(el, { ikon: '🎯', tittel: 'Tiden er ute!', stjerner: G.stjerner(el, poeng, 20), tekst: 'Du fanget ' + poeng + ' poeng.', lær: 'Primtall under 30: 2, 3, 5, 7, 11, 13, 17, 19, 23 og 29. Alle andre tall (unntatt 1) kan skrives som et produkt av primtall.', igjen: start2 }); }
        }, 1000);
      }
      start2();
    }
  });

  /* ===================== Match-parene (memory) ===================== */
  const SETT = {
    potenser: [['2³', '8', '2 · 2 · 2 = 8'], ['3²', '9', '3 · 3 = 9'], ['10³', '1000', '10 · 10 · 10 = 1000'], ['5²', '25', '5 · 5 = 25'], ['2⁵', '32', '2 · 2 · 2 · 2 · 2 = 32'], ['4³', '64', '4 · 4 · 4 = 64'], ['7²', '49', '7 · 7 = 49'], ['2⁴', '16', '2 · 2 · 2 · 2 = 16'], ['3³', '27', '3 · 3 · 3 = 27'], ['6²', '36', '6 · 6 = 36'], ['9²', '81', '9 · 9 = 81'], ['5⁰', '1', 'Alt opphøyd i 0 er 1.'], ['(−2)²', '4', '(−2) · (−2) = 4'], ['(−2)³', '−8', '(−2) · (−2) · (−2) = −8'], ['10⁻¹', '0,1', '10⁻¹ = 1 ÷ 10 = 0,1'], ['2⁻²', '0,25', '2⁻² = 1 ÷ 4 = 0,25']],
    vekst: [['+25 %', '1,25', '1 + 0,25 = 1,25'], ['−10 %', '0,9', '1 − 0,10 = 0,9'], ['+3 %', '1,03', '1 + 0,03 = 1,03'], ['−35 %', '0,65', '1 − 0,35 = 0,65'], ['+100 %', '2', '1 + 1 = 2 (dobling)'], ['−50 %', '0,5', '1 − 0,5 = 0,5 (halvering)'], ['+7,5 %', '1,075', '1 + 0,075 = 1,075'], ['+150 %', '2,5', '1 + 1,5 = 2,5'], ['−2 %', '0,98', '1 − 0,02 = 0,98'], ['+12 %', '1,12', '1 + 0,12 = 1,12'], ['−25 %', '0,75', '1 − 0,25 = 0,75'], ['+60 %', '1,6', '1 + 0,6 = 1,6']],
    enheter: [['36 km/t', '10 m/s', '36 000 m ÷ 3600 s = 10 m/s'], ['72 km/t', '20 m/s', '72 000 m ÷ 3600 s = 20 m/s'], ['90 min', '1,5 timer', '90 ÷ 60 = 1,5'], ['45 min', '0,75 timer', '45 ÷ 60 = 0,75'], ['2500 g', '2,5 kg', '2500 ÷ 1000 = 2,5'], ['1 L', '1 dm³', 'En liter er en kube på 10 cm × 10 cm × 10 cm.'], ['0,5 tonn', '500 kg', '1 tonn = 1000 kg'], ['60 km/t i 2,5 t', '150 km', 'strekning = fart · tid = 60 · 2,5'], ['120 km på 1,5 t', '80 km/t', 'fart = strekning ÷ tid = 120 ÷ 1,5'], ['50 kr/kg, 3 kg', '150 kr', '50 · 3 = 150'], ['1 m/s', '3,6 km/t', '3600 m/s per time = 3,6 km/t'], ['2 t 30 min', '2,5 timer', '30 min = 0,5 timer']]
  };
  function memory(id, tittel, ikon, trinn, tema, sett, kort, hvordan, lærer) {
    G.add({
      id: id, tittel: tittel, ikon: ikon, trinn: trinn, temaer: [tema], kort: kort, hvordan: hvordan, lærer: lærer,
      start: function (el) {
        let kort_, åpne = [], par = 0, trekk = 0, låst = false;
        function ny() {
          const valg = G.shuffle(SETT[sett]).slice(0, 8); kort_ = [];
          valg.forEach((p, i) => { kort_.push({ t: p[0], p: i, why: p[2] }); kort_.push({ t: p[1], p: i, why: p[2] }); });
          kort_ = G.shuffle(kort_); åpne = []; par = 0; trekk = 0; låst = false; tegn();
        }
        function tegn() {
          el.innerHTML = '<div class="sp-hud"><span>Trekk: <b class="mm-trekk">0</b></span><span>Par: <b class="mm-par">0</b> av 8</span></div><div class="mm-brett">' +
            kort_.map((k, i) => '<button type="button" class="mm-kort" data-i="' + i + '" aria-label="Kort ' + (i + 1) + ', lukket"><span class="mm-bak">?</span><span class="mm-fram">' + k.t + '</span></button>').join('') + '</div><div class="sp-fb" aria-live="polite"></div>';
          el.querySelectorAll('.mm-kort').forEach(b => b.addEventListener('click', () => snu(+b.dataset.i)));
        }
        function snu(i) {
          const b = el.querySelectorAll('.mm-kort')[i]; if (låst || b.classList.contains('åpen') || b.classList.contains('funnet')) return;
          b.classList.add('åpen'); b.setAttribute('aria-label', kort_[i].t); åpne.push(i);
          if (åpne.length === 2) {
            trekk++; G.q(el, '.mm-trekk').textContent = trekk;
            const a = kort_[åpne[0]], c = kort_[åpne[1]]; const bs = el.querySelectorAll('.mm-kort');
            if (a.p === c.p) { par++; bs[åpne[0]].classList.add('funnet'); bs[åpne[1]].classList.add('funnet'); G.feedback(el, true, '✅ ' + a.why); åpne = []; G.q(el, '.mm-par').textContent = par;
              if (par === 8) G.after(() => G.slutt(el, { ikon: '🧠', tittel: 'Alle parene funnet!', stjerner: G.stjerner(el, 24 - Math.min(trekk, 24), 12), tekst: 'Du brukte ' + trekk + ' trekk. Færre trekk er bedre!', lær: lærer, igjen: ny }), 900); }
            else { låst = true; G.feedback(el, false, 'Ikke et par: «' + a.t + '» og «' + c.t + '» hører ikke sammen.'); G.after(() => { bs[åpne[0]].classList.remove('åpen'); bs[åpne[1]].classList.remove('åpen'); åpne = []; låst = false; }, 1100); }
          }
        }
        ny();
      }
    });
  }
  memory('potens-memory', 'Potens-memory', '🃏', 8, '8/potenser', 'potenser', 'Finn potensen og verdien den er lik. Åtte par å finne.', 'Snu to kort om gangen. Hvis de hører sammen, blir de liggende. Finn alle 8 parene med så få trekk som mulig.', 'Å regne ut potenser raskt, også med negative grunntall og negative eksponenter.');
  memory('vekstfaktor-memory', 'Vekstfaktor-memory', '📈', 10, '10/vekstfaktor', 'vekst', 'Match prosentvis endring med riktig vekstfaktor.', 'Snu to kort om gangen. Finn parene: en prosentvis endring og vekstfaktoren som hører til.', 'Vekstfaktor = 1 + endringen i desimaltall. +25 % gir 1,25, og −10 % gir 0,9.');
  memory('enhets-memory', 'Enhets-memory', '📏', 9, '9/sammensatte-maleenheter', 'enheter', 'Match måleenheter og regnestykker som betyr det samme.', 'Snu to kort om gangen. Finn parene som er like mye, bare skrevet på to ulike måter.', 'Å regne om mellom enheter (km/t og m/s, minutter og timer) og å bruke fart = strekning ÷ tid.');

  /* ===================== Rotjegeren ===================== */
  G.add({
    id: 'rotjegeren', tittel: 'Rotjegeren', ikon: '🔭', trinn: 8, temaer: ['8/kvadratrot'],
    kort: 'Plasser kvadratroten på tallinja uten kalkulator. Hvor nær kommer du?',
    hvordan: 'Du får et tall, for eksempel √10. Dra i glidebryteren til du tror det er riktig sted på tallinja, og trykk «Sjekk». Jo nærmere du er, jo flere stjerner. Tips: finn de to kvadrattallene tallet ligger mellom.',
    lærer: 'Å anslå kvadratrøtter: √10 ligger mellom √9 = 3 og √16 = 4. Det gir en god følelse for hva kvadratrot betyr, og at røtter som ikke går opp, er tall mellom heltallene.',
    start: function (el) {
      const TALL = G.shuffle([2, 3, 5, 6, 7, 8, 10, 11, 12, 14, 15, 18, 20, 24, 28, 33, 40, 50, 65, 75, 90, 110, 130]);
      let runde = 0, poeng = 0, n, gjort;
      const X = v => 20 + v * 46;
      function vis() {
        n = TALL[runde]; gjort = false;
        let linje = '<line x1="20" x2="572" y1="60" y2="60" stroke="#14213d" stroke-width="4" stroke-linecap="round"/>';
        for (let i = 0; i <= 12; i++) linje += '<line x1="' + X(i) + '" x2="' + X(i) + '" y1="50" y2="70" stroke="#14213d" stroke-width="3"/><text x="' + X(i) + '" y="92" text-anchor="middle" font-weight="700" font-size="15">' + i + '</text>';
        el.innerHTML = '<div class="sp-hud"><span>Runde ' + (runde + 1) + ' av 8</span><span>Poeng: ' + poeng + '</span></div><p class="sp-spm">Hvor ligger <span class="rot-n">√' + n + '</span> på tallinja?</p>' +
          '<svg viewBox="0 0 592 130" class="rot-svg" role="img" aria-label="Tallinje fra 0 til 12"><g>' + linje + '</g><g id="rot-mark"><circle cx="' + X(6) + '" cy="60" r="12" fill="var(--pos)" stroke="#fff" stroke-width="3"/><text x="' + X(6) + '" y="28" text-anchor="middle" font-weight="800" font-size="15" fill="var(--pos)">6</text></g><g id="rot-fasit"></g></svg>' +
          '<div class="sp-slider"><label for="rot-s">Ditt anslag: <span id="rot-v">6,0</span></label><input id="rot-s" type="range" min="0" max="12" step="0.05" value="6"></div>' +
          '<div class="sp-rad"><button type="button" class="knapp primær rot-sjekk">Sjekk</button></div><div class="sp-fb" aria-live="polite"></div>';
        const s = G.q(el, '#rot-s');
        s.addEventListener('input', () => { const v = +s.value; const g = G.q(el, '#rot-mark'); g.innerHTML = '<circle cx="' + X(v) + '" cy="60" r="12" fill="var(--pos)" stroke="#fff" stroke-width="3"/><text x="' + X(v) + '" y="28" text-anchor="middle" font-weight="800" font-size="15" fill="var(--pos)">' + F(Math.round(v * 10) / 10) + '</text>'; G.q(el, '#rot-v').textContent = F(Math.round(v * 10) / 10); });
        G.q(el, '.rot-sjekk').addEventListener('click', sjekk);
      }
      function sjekk() {
        if (gjort) { runde++; if (runde >= 8) return G.slutt(el, { ikon: '🔭', tittel: 'Godt sikta!', stjerner: G.stjerner(el, poeng, 24), tekst: 'Du fikk ' + poeng + ' av 24 mulige poeng.', lær: 'Kvadratroten av n er tallet som ganget med seg selv gir n. Ligger n mellom to kvadrattall, ligger roten mellom de to tilsvarende heltallene.', igjen: () => { runde = 0; poeng = 0; TALL.sort(() => Math.random() - .5); vis(); } }); return vis(); }
        gjort = true; const v = +G.q(el, '#rot-s').value, r = Math.sqrt(n), d = Math.abs(v - r), p = d <= .15 ? 3 : d <= .35 ? 2 : d <= .8 ? 1 : 0; poeng += p;
        const lo = Math.floor(r), hi = lo + 1;
        G.q(el, '#rot-fasit').innerHTML = '<circle cx="' + X(r) + '" cy="60" r="9" fill="var(--zero)" stroke="#fff" stroke-width="3"/><text x="' + X(r) + '" y="118" text-anchor="middle" font-weight="800" font-size="14" fill="var(--zero)">√' + n + ' ≈ ' + F(Math.round(r * 100) / 100) + '</text>';
        G.feedback(el, p > 0, (p === 3 ? 'Superbra! ' : p ? 'Bra! ' : 'Litt langt unna. ') + '+' + p + ' poeng. ' + n + ' ligger mellom ' + (lo * lo) + ' (= ' + lo + '²) og ' + (hi * hi) + ' (= ' + hi + '²), så √' + n + ' ligger mellom ' + lo + ' og ' + hi + '.');
        G.q(el, '.rot-sjekk').textContent = runde >= 7 ? 'Se resultatet' : 'Neste ▶'; G.q(el, '#rot-s').disabled = true;
      }
      vis();
    }
  });
})();
