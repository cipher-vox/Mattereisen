/* ============================================================
   Oppgavemotor
   Typer: valg, tall, rekke, fritekst
   Fasit og løsning vises først etter at eleven har prøvd.
   Ingenting lagres – status finnes bare mens siden er åpen.
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;
  M.taskReg = {};
  const S = {};            // id -> {forsok, riktig, vist}
  const ROS = ['Riktig! 🎉', 'Helt riktig! ⭐', 'Flott jobba! 👏', 'Det stemmer! ✅', 'Bra tenkt! 💪', 'Yes! Helt riktig! 🙌'];
  const ROS_STEG = ['Wow, riktig! 🎉 Du får det til!', 'Helt riktig! ⭐ Så flott!', 'Du klarte det! 👏', 'Perfekt! Du tenkte riktig! 💪', 'Ja! Det er helt riktig! 🌟'];
  const FEIL = ['Ikke helt ennå – prøv en gang til. Du er på vei! 🙂', 'Nesten! Se på oppgaven en gang til og prøv igjen. 🙂', 'Ikke helt, men det er helt greit å prøve på nytt. 🙂'];
  const steg = () => document.body.classList.contains('modus-steg');
  const pick = a => a[Math.floor(Math.random() * a.length)];

  function norm(t) {
    t = Object.assign({}, t);
    if (t.regn !== undefined) {
      t.svar = M.evalExpr(t.regn);
      t.type = t.type || 'tall';
      if (!t.tekst) t.tekst = 'Regn ut: {u}';
    }
    t.type = t.type || 'tall';
    return t;
  }
  M.normTask = norm;

  /* ---------- automatisk løsning for enkle regnestykker (to tall) ---------- */
  M.autoLosning = function (expr) {
    const m = String(expr).replace(/\s+/g, '').match(/^\(?(-?\d+)\)?([+\-*\/])\(?(-?\d+)\)?$/);
    if (!m) return null;
    const a = +m[1], op = m[2], b = +m[3], r = M.evalExpr(expr);
    const A = M.num(a), B = M.num(b), R = M.num(r), ab = Math.abs(a), bb = Math.abs(b);
    const out = [];
    if (op === '+') {
      if (b >= 0) out.push('Start i ' + A + '. <strong>Pluss</strong> ' + B + ' betyr å hoppe ' + b + ' skritt mot høyre.');
      else out.push('Å legge til et negativt tall er det samme som å trekke fra: ' + A + ' + (' + B + ') = ' + A + ' − ' + M.num(-b) + '.', 'Hopp ' + (-b) + ' skritt mot venstre fra ' + A + '.');
    } else if (op === '-') {
      if (b >= 0) out.push('Start i ' + A + '. <strong>Minus</strong> ' + B + ' betyr å hoppe ' + b + ' skritt mot venstre.');
      else out.push('Minus et negativt tall blir pluss: ' + A + ' − (' + B + ') = ' + A + ' + ' + M.num(-b) + '.', 'Hopp ' + (-b) + ' skritt mot høyre fra ' + A + '.');
    } else if (a === 0) {
      out.push(op === '*' ? '0 ganget med et tall er alltid 0.' : '0 delt på et tall er alltid 0.');
    } else if (b === 0) {
      out.push('Alt ganget med 0 er 0.');
    } else {
      out.push((a < 0) === (b < 0) ? 'Fortegnene er <strong>like</strong>, så svaret blir <strong>positivt</strong>.' : 'Fortegnene er <strong>ulike</strong>, så svaret blir <strong>negativt</strong>.');
      out.push('Regn uten fortegn: ' + ab + (op === '*' ? ' · ' : ' : ') + bb + ' = ' + Math.abs(r) + '.');
    }
    out.push('Svaret er ' + R + '.');
    return out;
  };

  function fasitTekst(t) {
    if (t.fasit) return t.fasit;
    if (t.type === 'valg') return t.valg[t.riktig];
    if (t.type === 'tall') return M.fmt(Array.isArray(t.svar) ? t.svar[0] : t.svar) + (t.enhet ? ' ' + t.enhet : '');
    if (t.type === 'rekke') return t.svar.map(M.fmt).join(', ');
    return '';
  }

  /* ---------- HTML for én oppgave ---------- */
  M.taskHTML = function (t0, i, ctx) {
    const t = norm(t0);
    const id = t.id || (ctx.prefix + '-' + i);
    t._id = id; M.taskReg[id] = t;
    const utt = t.regn !== undefined ? M.prettyExpr(t.regn) : '';
    const tekst = M.markup(String(t.tekst).replace('{u}', utt), ctx);
    let vis = '';
    if (t.visual) {
      const wid = 'w' + (++ctx.wid);
      ctx.widgets.push({ id: wid, name: t.visual.widget, opts: t.visual.opts });
      vis = '<div class="oppg-visual" id="' + wid + '"></div>';
    }
    let inn = '';
    if (t.type === 'valg') {
      let idx = t.valg.map((_, k) => k);
      if (!t.fast) idx = M.rng(Math.floor(Math.random() * 1e9)).shuffle(idx);
      inn = '<div class="valg" role="group" aria-label="Svaralternativer">' + idx.map(k =>
        '<button type="button" class="valg-knapp" data-k="' + k + '">' + M.markup(t.valg[k]) + '</button>').join('') + '</div>';
    } else if (t.type === 'tall') {
      inn = '<div class="svar-rad"><label class="sr-only" for="f-' + id + '">Svar</label><input id="f-' + id + '" class="svar-felt" type="text" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Skriv svaret ditt" />' +
        (t.enhet ? '<span class="enhet">' + t.enhet + '</span>' : '') +
        '<button type="button" class="knapp primær sjekk">Sjekk</button></div>' +
        '<p class="skrivehjelp">Tips: Minus skriver du med – eller −. Eksempel: −5</p>';
    } else if (t.type === 'rekke') {
      inn = '<div class="svar-rad"><label class="sr-only" for="f-' + id + '">Svar</label><input id="f-' + id + '" class="svar-felt bred" type="text" autocomplete="off" spellcheck="false" placeholder="Tallene med komma imellom, f.eks. −5, 0, 3" />' +
        '<button type="button" class="knapp primær sjekk">Sjekk</button></div>';
    } else {
      inn = '<p class="skrivehjelp">✏️ Skriv tankene dine her (teksten lagres ikke og forsvinner når du forlater siden). Når du har prøvd, kan du se et løsningsforslag.</p>' +
        '<label class="sr-only" for="f-' + id + '">Ditt forsøk</label><textarea id="f-' + id + '" class="fritekst-felt" rows="3" placeholder="Skriv forsøket ditt her …"></textarea>';
    }
    return '<li class="oppg" data-id="' + id + '" data-type="' + t.type + '">' +
      '<div class="oppg-tekst lesbar">' + tekst + '</div>' + vis + inn +
      '<div class="tilbakemelding" aria-live="polite"></div>' +
      '<div class="hint-boks" hidden></div>' +
      '<div class="oppg-knapper">' +
      (t.hint ? '<button type="button" class="knapp liten hint-knapp">' + (Array.isArray(t.hint) ? '💡 Hjelp meg i gang' : '💡 Hint') + '</button>' : '') +
      '<button type="button" class="knapp liten losning-knapp">' + (t.type === 'fritekst' ? '👀 Jeg har prøvd – vis løsningsforslag' : '👀 Vis fasit og løsning') + '</button></div>' +
      '<div class="losning-boks" hidden></div></li>';
  };

  /* ---------- tilstand og oppdatering ---------- */
  function st(id) { return S[id] || (S[id] = { forsok: 0, riktig: false, vist: false }); }

  function updateCounters(li) {
    li.classList.toggle('riktig', st(li.dataset.id).riktig);
    li.classList.toggle('klar', st(li.dataset.id).riktig || st(li.dataset.id).vist);
    const blokk = li.closest('.oppg-blokk');
    if (blokk) {
      const alle = blokk.querySelectorAll('.oppg').length;
      const ri = blokk.querySelectorAll('.oppg.riktig').length;
      const kl = blokk.querySelectorAll('.oppg.klar').length;
      const tel = blokk.querySelector('.teller');
      if (tel) tel.innerHTML = '<span class="stjerner" aria-hidden="true">' + '⭐'.repeat(ri) + '<span class="tomme">' + '☆'.repeat(alle - ri) + '</span></span> <span>' + ri + ' av ' + alle + ' riktige</span>';
      blokk.classList.toggle('blokk-ferdig', kl === alle);
    }
    const sek = li.closest('.seksjon');
    if (sek) {
      const alle = sek.querySelectorAll('.oppg').length;
      const kl = sek.querySelectorAll('.oppg.klar').length;
      const ri = sek.querySelectorAll('.oppg.riktig').length;
      const ferdig = alle > 0 && kl === alle;
      const var_ = sek.classList.contains('ferdig');
      sek.classList.toggle('ferdig', ferdig);
      const toc = document.querySelector('[data-toc="' + sek.id + '"]');
      if (toc) { toc.classList.toggle('ferdig', ferdig); toc.classList.toggle('pågår', !ferdig && kl > 0); }
      if (ferdig && !var_) M.sectionDone(sek, ri === alle);
    }
  }

  M.sectionDone = function (sek, alleRiktig) {
    let b = sek.querySelector('.seksjon-ferdig');
    if (!b) { b = document.createElement('div'); b.className = 'seksjon-ferdig'; b.setAttribute('role', 'status'); sek.appendChild(b); }
    const tittel = (sek.querySelector('h2') || {}).textContent || 'delen';
    b.innerHTML = alleRiktig
      ? '<span class="stor-emoji">🏆</span><div><strong>Du er ferdig med «' + M.esc(tittel) + '»!</strong><br>Alt riktig – så bra jobba!</div>'
      : '<span class="stor-emoji">🎉</span><div><strong>Du har gjennomført «' + M.esc(tittel) + '»!</strong><br>Det du har sett løsningen på, kan du prøve igjen senere. Flott innsats!</div>';
    if (!M.reduced()) M.confetti(b);
  };

  M.confetti = function (anchor) {
    const rect = anchor.getBoundingClientRect();
    const farger = ['#c2410c', '#1d4ed8', '#15803d', '#a21caf', '#ca8a04', '#0e7490'];
    const box = document.createElement('div'); box.className = 'konfetti'; box.setAttribute('aria-hidden', 'true');
    box.style.left = (rect.left + rect.width / 2 + window.scrollX) + 'px';
    box.style.top = (rect.top + window.scrollY) + 'px';
    for (let i = 0; i < 28; i++) {
      const s = document.createElement('span');
      s.style.background = farger[i % farger.length];
      s.style.setProperty('--dx', (Math.random() * 360 - 180) + 'px');
      s.style.setProperty('--dy', (Math.random() * 220 - 40) + 'px');
      s.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
      s.style.animationDelay = (Math.random() * 0.15) + 's';
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 1900);
  };

  function feedback(li, ok, html) {
    const f = li.querySelector('.tilbakemelding');
    f.className = 'tilbakemelding ' + (ok ? 'ok' : 'feil');
    f.innerHTML = html;
  }
  function showHint(li, force) {
    const t = M.taskReg[li.dataset.id]; if (!t || !t.hint) return;
    const h = li.querySelector('.hint-boks'), kn = li.querySelector('.hint-knapp');
    if (Array.isArray(t.hint)) {
      /* trinnvis hjelp: hvert trykk gir ett steg til */
      const s = st(li.dataset.id); const n = t.hint.length;
      if (force === true) s.hintN = Math.max(s.hintN || 0, 1); else s.hintN = Math.min(n, (s.hintN || 0) + 1);
      h.hidden = false;
      h.innerHTML = '<strong>💡 Hjelp (' + s.hintN + ' av ' + n + '):</strong><ol class="hint-liste">' + t.hint.slice(0, s.hintN).map(x => '<li>' + M.markup(x) + '</li>').join('') + '</ol>';
      if (kn) kn.textContent = s.hintN >= n ? '💡 Alle hjelpesteg er vist' : '💡 Gi meg et steg til';
      if (kn && s.hintN >= n) kn.disabled = true;
      return;
    }
    if (force === undefined) h.hidden = !h.hidden; else h.hidden = !force;
    if (!h.hidden) h.innerHTML = '<strong>💡 Hint:</strong> ' + M.markup(t.hint);
  }

  /* ---------- sjekk ---------- */
  function sjekkTall(li) {
    const id = li.dataset.id, t = M.taskReg[id], s = st(id);
    const inp = li.querySelector('.svar-felt');
    const v = M.parseNum(inp.value);
    if (isNaN(v)) { feedback(li, false, 'Skriv et tall som svar, for eksempel −5 eller 12. 🙂'); return; }
    s.forsok++;
    const svar = Array.isArray(t.svar) ? t.svar : [t.svar];
    if (svar.some(x => Math.abs(x - v) < 1e-9)) rett(li);
    else {
      const key = String(Math.round(v * 1e9) / 1e9);
      const msg = t.feil && t.feil[key];
      feilSvar(li, msg);
    }
  }
  function sjekkRekke(li) {
    const id = li.dataset.id, t = M.taskReg[id], s = st(id);
    const inp = li.querySelector('.svar-felt');
    const deler = inp.value.split(/[;,\s]+/).filter(Boolean).map(M.parseNum);
    if (!deler.length || deler.some(isNaN)) { feedback(li, false, 'Skriv tallene med komma imellom, for eksempel −5, 0, 3. 🙂'); return; }
    s.forsok++;
    if (deler.length === t.svar.length && deler.every((x, k) => Math.abs(x - t.svar[k]) < 1e-9)) rett(li);
    else feilSvar(li, t.feilmelding);
  }
  function rett(li) {
    const s = st(li.dataset.id); s.riktig = true;
    feedback(li, true, pick(steg() ? ROS_STEG : ROS));
    li.querySelectorAll('input,.sjekk').forEach(e => e.disabled = true);
    li.querySelectorAll('.valg-knapp').forEach(b => b.disabled = true);
    updateCounters(li);
  }
  function feilSvar(li, melding) {
    const t = M.taskReg[li.dataset.id];
    feedback(li, false, (melding ? M.markup(melding) + '<br>' : '') + pick(FEIL));
    if (steg() && t.hint) showHint(li, true);
    updateCounters(li);
  }

  function visLosning(li) {
    const id = li.dataset.id, t = M.taskReg[id], s = st(id);
    const box = li.querySelector('.losning-boks');
    let h = '';
    if (t.type !== 'fritekst') h += '<div class="fasit"><strong>Fasit:</strong> ' + M.markup(fasitTekst(t)) + '</div>';
    let l = t.losning;
    if (!l && t.regn !== undefined) l = M.autoLosning(t.regn) || (M.prettyExpr(t.regn) + ' = ' + M.num(Array.isArray(t.svar) ? t.svar[0] : t.svar));
    if (l) {
      if (Array.isArray(l)) h += '<div class="losning"><strong>' + (t.type === 'fritekst' ? 'Løsningsforslag' : 'Slik kan du tenke') + ':</strong><ol>' + l.map(x => '<li class="lesbar">' + M.markup(x) + '</li>').join('') + '</ol></div>';
      else h += '<div class="losning lesbar"><strong>' + (t.type === 'fritekst' ? 'Løsningsforslag' : 'Slik kan du tenke') + ':</strong> ' + M.markup(l) + '</div>';
    }
    box.innerHTML = h; box.hidden = false;
    s.vist = true;
    li.querySelector('.losning-knapp').textContent = '🙈 Skjul løsningen';
    updateCounters(li);
    if (M.addReadButtons) M.addReadButtons(box);
  }
  function losningKlikk(li) {
    const id = li.dataset.id, t = M.taskReg[id], s = st(id);
    const box = li.querySelector('.losning-boks');
    if (s.vist && !box.hidden) { box.hidden = true; li.querySelector('.losning-knapp').textContent = '👀 Vis fasit og løsning'; return; }
    if (s.vist) { box.hidden = false; li.querySelector('.losning-knapp').textContent = '🙈 Skjul løsningen'; return; }
    if (t.type === 'fritekst') {
      const ta = li.querySelector('.fritekst-felt');
      if (!s.forsok) {
        if (!ta || ta.value.trim().length < 4) {
          feedback(li, false, 'Prøv først! Skriv hva du tenker eller hvordan du ville startet (minst noen ord) – deretter kan du se løsningsforslaget. ✏️');
          if (ta) ta.focus();
          return;
        }
        s.forsok = 1;
      }
      feedback(li, true, 'Bra at du prøvde selv! Sammenlikn med løsningsforslaget under. 👇');
      visLosning(li); return;
    }
    if (!s.forsok) { feedback(li, false, 'Prøv først! Skriv et svar og trykk «Sjekk» – etterpå kan du se fasit og løsning. 🙂'); return; }
    visLosning(li);
  }

  /* ---------- hendelser (én gang) ---------- */
  M.bindTasks = function () {
    document.addEventListener('click', function (e) {
      const li = e.target.closest && e.target.closest('.oppg'); if (!li) return;
      if (e.target.closest('.sjekk')) { li.dataset.type === 'rekke' ? sjekkRekke(li) : sjekkTall(li); }
      else if (e.target.closest('.hint-knapp')) showHint(li);
      else if (e.target.closest('.losning-knapp')) losningKlikk(li);
      else if (e.target.closest('.valg-knapp')) {
        const b = e.target.closest('.valg-knapp'); const t = M.taskReg[li.dataset.id]; const s = st(li.dataset.id);
        const k = +b.dataset.k; s.forsok++;
        if (k === t.riktig) { b.classList.add('rett'); rett(li); }
        else { b.classList.add('feil'); b.disabled = true; feilSvar(li, t.forklar && t.forklar[k]); }
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      const inp = e.target.closest && e.target.closest('.oppg .svar-felt'); if (!inp) return;
      const li = inp.closest('.oppg'); li.dataset.type === 'rekke' ? sjekkRekke(li) : sjekkTall(li);
    });
  };

  /* ---------- blokk med oppgaver ---------- */
  const NIVA = { 1: ['Kom i gang', '🌱'], 2: ['Bygg videre', '🌿'], 3: ['Du kan dette', '🌳'], 4: ['Utfordring', '🔥'], 5: ['Mester (6-er-nivå)', '🏔️'] };
  M.taskBlockHTML = function (b, ctx) {
    const niva = b.niva || 0;
    const nv = NIVA[niva];
    const tittel = b.tittel || (nv ? 'Nivå ' + niva + ': ' + nv[0] : 'Prøv selv');
    const ikon = b.ikon || (nv ? nv[1] : '✏️');
    ctx.blokkN = (ctx.blokkN || 0) + 1;
    ctx.prefix = (ctx.topicKey || 'x') + '-' + (ctx.sek || 's') + '-' + ctx.blokkN;
    let h = '<div class="oppg-blokk niva-' + niva + '"><div class="blokk-hode"><h3><span aria-hidden="true">' + ikon + '</span> ' + tittel + '</h3><span class="teller"></span></div>';
    if (b.intro) h += '<p class="lesbar blokk-intro">' + M.markup(b.intro, ctx) + '</p>';
    h += '<ol class="oppg-liste">' + b.oppgaver.map((t, i) => M.taskHTML(t, i + 1, ctx)).join('') + '</ol></div>';
    return h;
  };
  M.initTaskCounters = function (root) {
    root.querySelectorAll('.oppg-blokk').forEach(bl => {
      const alle = bl.querySelectorAll('.oppg').length;
      const tel = bl.querySelector('.teller');
      if (tel) tel.innerHTML = '<span class="stjerner" aria-hidden="true"><span class="tomme">' + '☆'.repeat(alle) + '</span></span> <span>0 av ' + alle + ' riktige</span>';
    });
  };
})();
