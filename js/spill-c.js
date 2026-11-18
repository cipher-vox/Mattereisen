/* Spill C: Kode-knekkeren, Pinnebyggeren, Redningsstigen, Brusboks-designeren, Data-smeden, Sjansejegeren */
(function () {
  'use strict';
  const M = window.MATTE, G = M.G, F = M.fmt;
  const R = (x, d) => { const p = Math.pow(10, d || 0); return Math.round(x * p) / p; };
  const tmpl = (hud, spm, bokser) => '<div class="sp-hud">' + hud + '</div>' + (spm ? '<div class="sp-spm lesbar">' + spm + '</div>' : '') + bokser;

  /* ===================== Kode-knekkeren ===================== */
  const PROG = [
    function () { const a = G.rnd(2, 9), b = G.rnd(2, 9); return { kode: 'x = ' + a + '\ny = ' + b + '\nx = x + y\nprint(x * 2)', tips: 'Variabelen x får en ny verdi: x = x + y betyr «ta gamle x, legg til y, og lagre i x».' }; },
    function () { const a = G.rnd(2, 6), b = G.rnd(2, 5); return { kode: 'tall = ' + a + '\nfor i in range(' + b + '):\n    tall = tall * 2\nprint(tall)', tips: 'Løkka gjentar linja inni seg like mange ganger som tallet i range().' }; },
    function () { const a = G.rnd(8, 20), g = G.rnd(11, 16); return { kode: 'alder = ' + a + '\nif alder >= ' + g + ':\n    print("Inn")\nelse:\n    print("Ute")', tips: 'if sjekker en betingelse. Er den sann, kjøres det som står rett under if. Ellers kjøres else.' }; },
    function () { const n = G.rnd(4, 7); return { kode: 'sum = 0\nfor i in range(1, ' + (n + 1) + '):\n    sum = sum + i\nprint(sum)', tips: 'range(1, ' + (n + 1) + ') gir tallene 1 til ' + n + ' (sluttverdien er ikke med). Her legges de sammen.' }; },
    function () { const m = G.pick(['Mia', 'Ola', 'Eli', 'Ada']), k = G.rnd(2, 4); return { kode: 'navn = "' + m + '"\nprint(navn * ' + k + ')', tips: 'Å gange en tekst med et tall gjentar teksten.' }; },
    function () { const l = [G.rnd(1, 9), G.rnd(1, 9), G.rnd(1, 9), G.rnd(1, 9)]; return { kode: 'tall = [' + l.join(', ') + ']\nprint(sum(tall) - max(tall))', tips: 'sum() legger sammen alle tallene i lista, max() gir det største.' }; },
    function () { const n = G.rnd(15, 30), d = G.pick([2, 3, 4, 5]); return { kode: 'antall = 0\nfor i in range(1, ' + n + '):\n    if i % ' + d + ' == 0:\n        antall += 1\nprint(antall)', tips: 'i % ' + d + ' er resten når i deles på ' + d + '. Er resten 0, kan i deles på ' + d + '. antall += 1 betyr antall = antall + 1.' }; },
    function () { const a = G.rnd(2, 4), b = G.rnd(1, 5), x = G.rnd(2, 8); return { kode: 'def f(x):\n    return ' + a + ' * x + ' + b + '\nprint(f(' + x + '))', tips: 'En funksjon f får inn verdien x og gir tilbake et svar. Her settes ' + x + ' inn der det står x.' }; },
    function () { const n = G.rnd(30, 100), s = G.rnd(2, 3); return { kode: 'x = 1\nteller = 0\nwhile x < ' + n + ':\n    x = x * ' + s + '\n    teller += 1\nprint(teller)', tips: 'En while-løkke gjentas så lenge betingelsen er sann. Her ganges x med ' + s + ' til x ikke lenger er mindre enn ' + n + '.' }; },
    function () { const a = G.rnd(20, 60), b = G.rnd(3, 7); return { kode: 'a = ' + a + '\nb = ' + b + '\nprint(a // b, a % b)', tips: '// gir hele ganger b går opp i a, og % gir resten. Skriv begge tallene med mellomrom.' }; }
  ];
  G.add({
    id: 'kode-knekkeren', tittel: 'Kode-knekkeren', ikon: '🔐', trinn: 8, temaer: ['8/programmering', '10/python', '9/simulering', 'verktoy/python'],
    kort: 'Hva skriver programmet ut? Les koden som en datamaskin og knekk den.',
    hvordan: 'Du får et lite Python-program. Uten å kjøre det må du finne ut hva det skriver ut. Skriver det ut flere linjer, skriver du den siste. Etter åtte programmer kommer en bonusrunde der programmet har en feil, og du trykker på linja som må endres.',
    lærer: 'Å lese kode og «være datamaskinen»: følge variabler, løkker (for og while), betingelser (if) og funksjoner steg for steg. Det er den viktigste ferdigheten for å finne feil i egne programmer.',
    start: function (el) {
      const RUNDER = 8; let runde = 0, poeng = 0, rekkefølge, p, svart;
      function ny() { rekkefølge = G.shuffle(PROG.map((_, i) => i)).slice(0, RUNDER); runde = 0; poeng = 0; neste(); }
      function neste() {
        let ok = null, ut = '';
        for (let k = 0; k < 20; k++) { p = PROG[rekkefølge[runde]](); const r = M.py.run(p.kode, { inputs: [] }); if (!r.error) { ut = r.out; break; } }
        p.ut = ut.replace(/\n$/, ''); p.sist = p.ut.split('\n').pop(); svart = false; vis();
      }
      function vis() {
        el.innerHTML = tmpl('<span>Program ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Poeng: ' + poeng + '</span>', 'Hva skriver programmet ut? <small>(siste linje)</small>',
          '<pre class="kode-hl kk-kode" aria-label="Python-program">' + M.highlightPy(p.kode) + '</pre><div class="sp-rad"><label class="sr-only" for="kk-svar">Svaret ditt</label><input id="kk-svar" class="sp-input kk-svar" type="text" autocomplete="off" placeholder="Skriv svaret ditt"><button type="button" class="knapp primær kk-sjekk">Sjekk</button></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad kk-nav"></div>');
        const inn = G.q(el, '.kk-svar'); G.q(el, '.kk-sjekk').addEventListener('click', sjekk); inn.addEventListener('keydown', e => { if (e.key === 'Enter') sjekk(); }); inn.focus && inn.focus();
      }
      const norm = s => String(s).trim().replace(/,/g, '.').replace(/\s+/g, ' ').replace(/^"|"$/g, '');
      function sjekk() {
        if (svart) return; const inn = G.q(el, '.kk-svar'); if (!inn.value.trim()) return G.feedback(el, false, 'Skriv inn et svar først. 🙂');
        svart = true; const ok = norm(inn.value).toLowerCase() === norm(p.sist).toLowerCase(); if (ok) poeng++;
        inn.disabled = true; G.q(el, '.kk-sjekk').disabled = true;
        G.feedback(el, ok, (ok ? 'Riktig! ' : 'Ikke helt. ') + 'Programmet skrev ut: <code>' + p.ut.replace(/\n/g, ' ⏎ ') + '</code><br>' + p.tips);
        const slutt = runde + 1 >= RUNDER; G.q(el, '.kk-nav').innerHTML = '<button type="button" class="knapp primær kk-neste">' + (slutt ? 'Se resultatet' : 'Neste program ▶') + '</button>';
        G.q(el, '.kk-neste').addEventListener('click', () => { runde++; if (runde >= RUNDER) return fiksFase(); neste(); });
      }
      /* Bonusrunde: finn og fiks feilen i koden */
      const FIKS = [
        { mål: 'Programmet skal summere tallene fra 1 til 5 (riktig svar: 15).', linjer: ['sum = 0', 'for i in range(1, 5):', '    sum += i', 'print(sum)'], feil: 1, fiks: 'for i in range(1, 6):', hva: 'range(1, 5) stopper før 5, så 5 blir aldri med. Sluttverdien i range er ikke med. Derfor må den være 6.' },
        { mål: 'Programmet skal skrive ut «stor» når x er større enn 5.', linjer: ['x = 10', 'if x < 5:', '    print("stor")', 'else:', '    print("liten")'], feil: 1, fiks: 'if x > 5:', hva: 'Betingelsen var snudd. Tegnet < betyr «mindre enn», og vi trenger > for «større enn».' },
        { mål: 'Programmet skal regne ut gjennomsnittet av 4, 8 og 6 (riktig svar: 6, Python skriver 6.0).', linjer: ['a = 4', 'b = 8', 'c = 6', 'print(a + b + c / 3)'], feil: 3, fiks: 'print((a + b + c) / 3)', hva: 'Divisjon regnes før addisjon, så bare c ble delt på 3. Du trenger parentes rundt summen, akkurat som i matte.' },
        { mål: 'Programmet skal regne ut arealet av et rektangel på 6 × 4 (riktig svar: 24).', linjer: ['bredde = 6', 'hoyde = 4', 'areal = bredde + hoyde', 'print(areal)'], feil: 2, fiks: 'areal = bredde * hoyde', hva: 'Areal er bredde ganger høyde, ikke pluss. I Python skriver vi gange som *.' },
        { mål: 'Programmet skal skrive ut 3-gangen: 3, 6 og 9.', linjer: ['for i in range(1, 4):', '    print(i + 3)'], feil: 1, fiks: '    print(i * 3)', hva: 'Her ble det pluss i stedet for gange. 1 + 3 = 4, men 1 · 3 = 3.' },
        { mål: 'Programmet skal skrive ut resten når 17 deles på 5 (riktig svar: 2).', linjer: ['print(17 // 5)'], feil: 0, fiks: 'print(17 % 5)', hva: '// gir hvor mange hele ganger 5 går opp i 17, altså 3. Resten får du med %, og den er 2.' }
      ];
      const BONUS = 3;
      function fiksFase() {
        const sett = G.shuffle(FIKS).slice(0, BONUS); let i = 0;
        function vis2() {
          const f = sett[i], r = M.py.run(f.linjer.join('\n'), { inputs: [] }), ut = r.error ? '(feilmelding)' : r.out.replace(/\n$/, '').replace(/\n/g, ' ⏎ ');
          el.innerHTML = tmpl('<span>Bonus: Fiks koden ' + (i + 1) + ' av ' + BONUS + '</span><span>Poeng: ' + poeng + '</span>', '<strong>Programmet har én feil.</strong> ' + f.mål + ' Det skriver ut: <code>' + ut + '</code>. Trykk på linja som må endres.',
            '<div class="kk-linjer" role="group" aria-label="Linjer i programmet">' + f.linjer.map((t, k) => '<button type="button" class="kk-linje" data-i="' + k + '"><code>' + t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/ /g, '&nbsp;') + '</code></button>').join('') + '</div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad kk-nav"></div>');
          const bs = el.querySelectorAll('.kk-linje');
          bs.forEach(b => b.addEventListener('click', () => {
            const ok = +b.dataset.i === f.feil; bs.forEach(x => x.disabled = true); bs[f.feil].classList.add('rett'); if (!ok) b.classList.add('feil'); if (ok) poeng++;
            G.feedback(el, ok, (ok ? 'Bra, den fant du! ' : 'Ikke den linja. Feilen er i linje ' + (f.feil + 1) + '. ') + 'Riktig: <code>' + f.fiks.trim() + '</code>. ' + f.hva);
            const sl = i + 1 >= BONUS; G.q(el, '.kk-nav').innerHTML = '<button type="button" class="knapp primær kk-neste2">' + (sl ? 'Se resultatet' : 'Neste ▶') + '</button>';
            G.q(el, '.kk-neste2').addEventListener('click', () => { i++; if (i >= BONUS) return avslutt(); vis2(); });
          }));
        }
        vis2();
      }
      function avslutt() {
        const T = RUNDER + BONUS; return G.slutt(el, { ikon: '🔐', tittel: 'Koden er knekt!', stjerner: G.stjerner(el, poeng, T), tekst: 'Du fikk ' + poeng + ' av ' + T + ' riktige (lese kode og fikse feil).', lær: 'Når du leser kode, følger du den linje for linje og holder styr på hva variablene er etter hvert steg. En løkke gjentar, en if velger. Å finne en feil handler om å sammenligne det koden gjør med det du ville at den skulle gjøre.', igjen: ny });
      }
      ny();
    }
  });

  /* ===================== Pinnebyggeren ===================== */
  G.add({
    id: 'pinnebyggeren', tittel: 'Pinnebyggeren', ikon: '📐', trinn: 9, temaer: ['9/trekanter'],
    kort: 'Tre pinner. Kan de bli en trekant? Se om endene møtes.',
    hvordan: 'Du får tre pinner med ulike lengder. Avgjør om de kan lages til en trekant. Du ser tegningen etter at du har svart. Senere runder spør hvilken lengde en tredje pinne kan ha, når to er gitt.',
    lærer: 'Trekantulikheten: i en trekant må de to korteste sidene til sammen være lengre enn den lengste siden. Er summen like stor, blir trekanten helt flat. Er den mindre, møtes ikke endene.',
    start: function (el) {
      const RUNDER = 9; let runde = 0, poeng = 0, p, svart;
      function lag() {
        if (runde < 6) {
          const kan = runde % 2 === 0 ? Math.random() < .5 : Math.random() < .5; const a = G.rnd(3, 9), b = G.rnd(3, 9); let c;
          if (kan) c = G.rnd(Math.abs(a - b) + 1, a + b - 1); else c = Math.random() < .3 ? a + b : G.rnd(a + b + 1, a + b + 6);
          if (!kan && runde === 4) c = a + b;
          return { type: 'kan', s: G.shuffle([a, b, c]) };
        }
        const a = G.rnd(4, 9), b = G.rnd(a + 2, 14); return { type: 'tredje', a: a, b: b, lo: b - a, hi: a + b };
      }
      function tegn(s) {
        const t = s.slice().sort((x, y) => x - y), c = t[2], b = t[1], a = t[0], sk = 260 / Math.max(c, 6);
        const x0 = 20, y0 = 150, x1 = x0 + c * sk;
        let g = '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="#475569" stroke-width="7" stroke-linecap="round"/><text x="' + ((x0 + x1) / 2) + '" y="' + (y0 + 24) + '" text-anchor="middle" font-weight="800" fill="#334155">' + c + '</text>';
        if (a + b > c) {
          const px = (c * c + b * b - a * a) / (2 * c), h = Math.sqrt(Math.max(0, b * b - px * px)), tx = x0 + px * sk, ty = y0 - h * sk;
          g += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + tx + '" y2="' + ty + '" stroke="#2563eb" stroke-width="7" stroke-linecap="round"/><line x1="' + x1 + '" y1="' + y0 + '" x2="' + tx + '" y2="' + ty + '" stroke="#16a34a" stroke-width="7" stroke-linecap="round"/><text x="' + ((x0 + tx) / 2 - 12) + '" y="' + ((y0 + ty) / 2) + '" font-weight="800" fill="#2563eb">' + b + '</text><text x="' + ((x1 + tx) / 2 + 8) + '" y="' + ((y0 + ty) / 2) + '" font-weight="800" fill="#16a34a">' + a + '</text>';
        } else {
          const ang = a + b === c ? 0 : Math.PI / 3.2;
          const e1x = x0 + Math.cos(ang) * b * sk, e1y = y0 - Math.sin(ang) * b * sk - (ang ? 0 : 14), e2x = x1 - Math.cos(ang) * a * sk, e2y = y0 - Math.sin(ang) * a * sk - (ang ? 0 : 28);
          g += '<line x1="' + x0 + '" y1="' + (ang ? y0 : y0 - 14) + '" x2="' + e1x + '" y2="' + e1y + '" stroke="#2563eb" stroke-width="7" stroke-linecap="round"/><line x1="' + x1 + '" y1="' + (ang ? y0 : y0 - 28) + '" x2="' + e2x + '" y2="' + e2y + '" stroke="#16a34a" stroke-width="7" stroke-linecap="round"/><text x="' + ((x0 + e1x) / 2) + '" y="' + (e1y - 8) + '" font-weight="800" fill="#2563eb">' + b + '</text><text x="' + ((x1 + e2x) / 2) + '" y="' + (e2y - 8) + '" font-weight="800" fill="#16a34a">' + a + '</text>';
          if (ang) g += '<circle cx="' + e1x + '" cy="' + e1y + '" r="9" fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="4 3"/><circle cx="' + e2x + '" cy="' + e2y + '" r="9" fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="4 3"/>';
        }
        return '<svg viewBox="0 0 300 190" class="pb-svg" role="img" aria-label="Tegning av tre pinner med lengdene ' + s.join(', ') + '">' + g + '</svg>';
      }
      function vis() {
        p = lag(); svart = false;
        let spm, opts;
        if (p.type === 'kan') {
          spm = 'Pinnene er <strong>' + p.s.join(' cm, ') + ' cm</strong> lange. Kan de lage en trekant?';
          const kan = p.s.slice().sort((x, y) => x - y); p.kan = kan[0] + kan[1] > kan[2]; opts = [{ t: '✅ Ja, en trekant', ok: p.kan }, { t: '❌ Nei', ok: !p.kan }];
        } else {
          spm = 'To pinner er <strong>' + p.a + ' cm</strong> og <strong>' + p.b + ' cm</strong>. Hvilken lengde kan den tredje pinnen <strong>ikke</strong> ha hvis det skal bli en trekant?';
          const bra = [p.lo + 1, G.rnd(p.lo + 1, p.hi - 1), p.hi - 1]; const dårlig = G.pick([p.lo, p.hi, p.hi + G.rnd(1, 4), Math.max(1, p.lo - 1)]);
          const set = bra.filter((v, i, ar) => ar.indexOf(v) === i && v !== dårlig).slice(0, 3); while (set.length < 3) { const v = G.rnd(p.lo + 1, p.hi - 1); if (set.indexOf(v) < 0 && v !== dårlig) set.push(v); }
          p.dårlig = dårlig; opts = G.shuffle(set.map(v => ({ t: v + ' cm', ok: false })).concat([{ t: dårlig + ' cm', ok: true }]));
        }
        el.innerHTML = tmpl('<span>Oppgave ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Poeng: ' + poeng + '</span>', spm, '<div class="sp-rad pb-valg"></div><div class="sp-fb" aria-live="polite"></div><div class="pb-figur"></div><div class="sp-rad pb-nav"></div>');
        G.mc(G.q(el, '.pb-valg'), opts, ok => {
          if (ok) poeng++;
          let fb, fig = '';
          if (p.type === 'kan') { const t = p.s.slice().sort((x, y) => x - y); fb = 'De to korteste, ' + t[0] + ' + ' + t[1] + ' = ' + (t[0] + t[1]) + ', er ' + (t[0] + t[1] > t[2] ? 'lengre enn' : t[0] + t[1] === t[2] ? 'like lange som' : 'kortere enn') + ' den lengste, ' + t[2] + '. ' + (p.kan ? 'Endene møtes, og det blir en trekant.' : t[0] + t[1] === t[2] ? 'Pinnene legger seg flatt, så det blir ingen trekant.' : 'Endene rekker ikke hverandre.'); fig = '<div class="figur">' + tegn(p.s) + '</div>'; }
          else fb = 'Den tredje siden må være lengre enn ' + p.b + ' − ' + p.a + ' = ' + p.lo + ' og kortere enn ' + p.b + ' + ' + p.a + ' = ' + p.hi + '. Derfor kan den ikke være ' + p.dårlig + ' cm.';
          G.feedback(el, ok, (ok ? 'Riktig! ' : 'Ikke helt. ') + fb); G.q(el, '.pb-figur').innerHTML = fig;
          const slutt = runde + 1 >= RUNDER; G.q(el, '.pb-nav').innerHTML = '<button type="button" class="knapp primær pb-neste">' + (slutt ? 'Se resultatet' : 'Neste ▶') + '</button>';
          G.q(el, '.pb-neste').addEventListener('click', () => { runde++; if (runde >= RUNDER) return lab(); vis(); });
        });
      }
      /* Lab: dra i pinnen og finn grensene */
      function lab() {
        const A = G.rnd(4, 8), B = G.rnd(A + 2, 12), lo = B - A + 1, hi = A + B - 1; let opg = 0, c = Math.round((lo + hi) / 2), flyttet = false, ferdig = false;
        const OPG = [{ t: 'den <strong>korteste</strong>', fasit: lo }, { t: 'den <strong>lengste</strong>', fasit: hi }];
        function vis3() {
          const o = OPG[opg]; flyttet = false; ferdig = false; c = Math.round((lo + hi) / 2);
          el.innerHTML = tmpl('<span>Lab ' + (opg + 1) + ' av 2</span><span>Poeng: ' + poeng + '</span>', 'To pinner er <strong>' + A + ' cm</strong> og <strong>' + B + ' cm</strong>. Dra i den tredje pinnen og finn ' + o.t + ' hele lengden (i cm) som fortsatt gir en trekant.',
            '<div class="figur pb-lab"></div><div class="pb-status lesbar" aria-live="polite"></div><div class="sp-slider"><label for="pb-c">Tredje pinne: <span class="pb-cv"></span></label><input id="pb-c" type="range" min="1" max="' + (A + B + 3) + '" step="1" value="' + c + '"></div><div class="sp-rad"><button type="button" class="knapp primær pb-her">Her er grensen</button></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad pb-nav"></div>');
          G.q(el, '#pb-c').addEventListener('input', e => { c = +e.target.value; flyttet = true; oppd(); });
          G.q(el, '.pb-her').addEventListener('click', () => {
            if (ferdig) return; if (!flyttet) return G.feedback(el, false, 'Dra i glidebryteren først. 🙂');
            const ok = c === o.fasit; ferdig = true; if (ok) poeng++; G.q(el, '.pb-her').disabled = true; G.q(el, '#pb-c').disabled = true;
            G.feedback(el, ok, (ok ? 'Riktig! ' : 'Ikke helt. Riktig er ' + o.fasit + ' cm. ') + 'Den tredje siden må være lengre enn ' + B + ' − ' + A + ' = ' + (B - A) + ' og kortere enn ' + B + ' + ' + A + ' = ' + (A + B) + '. Hele tall som funker: ' + lo + ' til ' + hi + '.');
            const sl = opg + 1 >= OPG.length; G.q(el, '.pb-nav').innerHTML = '<button type="button" class="knapp primær pb-neste3">' + (sl ? 'Se resultatet' : 'Neste ▶') + '</button>';
            G.q(el, '.pb-neste3').addEventListener('click', () => { opg++; if (opg >= OPG.length) return SL(); vis3(); });
          });
          oppd();
        }
        function oppd() {
          G.q(el, '.pb-lab').innerHTML = tegn([A, B, c]); G.q(el, '.pb-cv').textContent = c + ' cm';
          G.q(el, '.pb-status').innerHTML = (c + Math.min(A, B) > Math.max(A, B, c) && A + B > c && c + A > B && c + B > A) ? '✅ Endene møtes: dette blir en <strong>trekant</strong>.' : '❌ Endene møtes ikke (eller legger seg flatt): <strong>ingen trekant</strong>.';
        }
        function SL() { const T = RUNDER + 2; return G.slutt(el, { ikon: '📐', tittel: 'Pinnemester!', stjerner: G.stjerner(el, poeng, T), tekst: 'Du fikk ' + poeng + ' av ' + T + ' riktige.', lær: 'I en trekant må de to korteste sidene til sammen være lengre enn den lengste. Den tredje siden ligger alltid mellom differansen og summen av de to andre.', igjen: () => { runde = 0; poeng = 0; vis(); } }); }
        vis3();
      }
      vis();
    }
  });

  /* ===================== Redningsstigen ===================== */
  G.add({
    id: 'redningsstigen', tittel: 'Redningsstigen', ikon: '🚒', trinn: 9, temaer: ['9/pytagoras'],
    kort: 'Hvor lang må stigen være, og hvor langt ut skal den stå? Bruk Pytagoras og se stigen falle på plass.',
    hvordan: 'Brannbilen har en stige som står mot en vegg. Et av tre mål er ukjent: veggen opp, avstanden fra veggen eller stigen. På Rolig velger du mellom svar. På Vanlig og Utfordring skriver du svaret selv (rund av til én desimal). Du har to forsøk, og hint hjelper deg i gang. Veggen og bakken danner en rett vinkel.',
    lærer: 'Pytagoras\' setning i rettvinklede trekanter: a² + b² = c², der c er hypotenusen (den lengste siden, overfor den rette vinkelen). Du øver både på å finne hypotenusen og en katet, med hele tall og med avrunding.',
    start: function (el) {
      const TRIPLER = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]];
      const RUNDER = 8; let runde = 0, poeng = 0, p, forsøk = 0;
      function lag() {
        const niv = G.niv(), ikkeHel = niv === 2 ? runde >= 3 : niv === 1 ? runde >= 6 : false;
        if (ikkeHel) { const a = G.pick([4, 5, 6, 7]), b = G.pick([6, 7, 8, 9]); return { v: a, d: b, s: Math.sqrt(a * a + b * b), ukjent: 's', heltall: false }; }
        const t = G.pick(TRIPLER), flip = Math.random() < .5; const ukjent = runde < (niv === 0 ? 4 : 3) ? 's' : G.pick(['v', 'd']);
        return { v: flip ? t[0] : t[1], d: flip ? t[1] : t[0], s: t[2], ukjent: ukjent, heltall: true };
      }
      function tegn() {
        const sk = 150 / Math.max(p.v, p.d, 6) * (p.v + p.d > 16 ? .85 : 1), x0 = 50, y0 = 200, vy = y0 - p.v * sk, dx = x0 + p.d * sk;
        const merke = (k, t) => p.ukjent === k ? '<tspan fill="#dc2626">?</tspan>' : t;
        return '<svg viewBox="0 0 330 240" class="rs-svg" role="img" aria-label="Stige mot vegg, rettvinklet trekant"><rect x="8" y="' + (vy - 28) + '" width="42" height="' + (y0 - vy + 28) + '" fill="#cbd5e1"/><rect x="8" y="' + y0 + '" width="314" height="20" fill="#86efac"/><line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + vy + '" stroke="#64748b" stroke-width="3" stroke-dasharray="6 4"/><line x1="' + x0 + '" y1="' + y0 + '" x2="' + dx + '" y2="' + y0 + '" stroke="#64748b" stroke-width="3" stroke-dasharray="6 4"/><line class="rs-stige" x1="' + x0 + '" y1="' + vy + '" x2="' + dx + '" y2="' + y0 + '" stroke="#b45309" stroke-width="7" stroke-linecap="round"/><path d="M' + (x0 + 14) + ' ' + y0 + ' v-14 h-14" fill="none" stroke="#334155" stroke-width="2"/>' +
          '<text x="' + (x0 - 8) + '" y="' + ((y0 + vy) / 2) + '" text-anchor="end" font-weight="800" font-size="16">' + merke('v', p.v) + ' m</text><text x="' + ((x0 + dx) / 2) + '" y="' + (y0 + 38) + '" text-anchor="middle" font-weight="800" font-size="16">' + merke('d', p.d) + ' m</text><text x="' + ((x0 + dx) / 2 + 16) + '" y="' + ((y0 + vy) / 2 - 8) + '" font-weight="800" font-size="16" fill="#b45309">' + merke('s', F(R(p.s, 1))) + ' m</text><text class="rs-bil" x="' + (dx + 12) + '" y="' + (y0 - 6) + '" font-size="26" aria-hidden="true">🚒</text></svg>';
      }
      function vis() {
        p = lag(); forsøk = 0; const fasit = p[p.ukjent]; const navn = { v: 'hvor høyt opp på veggen stigen når', d: 'hvor langt ut fra veggen foten står', s: 'hvor lang stigen er' }[p.ukjent];
        const gitt = { v: 'veggen opp (høyde) er ' + p.v + ' m', d: 'avstanden ut fra veggen er ' + p.d + ' m', s: 'stigen er ' + F(R(p.s, 1)) + ' m lang' };
        const andre = ['v', 'd', 's'].filter(k => k !== p.ukjent).map(k => gitt[k]).join(' og ');
        const rett = p.heltall ? fasit : R(fasit, 1), o = p.ukjent === 'v' ? p.d : p.v;
        const hint = p.ukjent === 's' ? ['Stigen er den lengste siden, hypotenusen: s² = a² + b².', 'Regn ut ' + p.v + '² + ' + p.d + '² = ' + (p.v * p.v + p.d * p.d) + '.', 'Ta kvadratroten av summen.'] : ['Stigen (' + p.s + ' m) er hypotenusen, så den er c.', 'Katetens kvadrat er c² − den andre katetens kvadrat: ' + p.s + '² − ' + o + '² = ' + (p.s * p.s - o * o) + '.', 'Ta kvadratroten av svaret.'];
        const fb = p.ukjent === 's' ? 'Stigen er hypotenusen: s² = ' + p.v + '² + ' + p.d + '² = ' + (p.v * p.v + p.d * p.d) + ', så s = √' + (p.v * p.v + p.d * p.d) + (p.heltall ? ' = ' + p.s : ' ≈ ' + F(R(p.s, 1))) + '.' :
          'Stigen (' + p.s + ' m) er hypotenusen. ' + (p.ukjent === 'v' ? 'Høyde' : 'Avstand') + '² = ' + p.s + '² − ' + o + '² = ' + (p.s * p.s) + ' − ' + (o * o) + ' = ' + (fasit * fasit) + ', så svaret er √' + (fasit * fasit) + ' = ' + fasit + '.';
        el.innerHTML = tmpl('<span>Oppgave ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Poeng: ' + poeng + '</span>', 'Finn ' + navn + ', når ' + andre + '.', '<div class="figur">' + tegn() + '</div><div class="rs-formel" aria-hidden="true">a² + b² = c² · c er den lengste siden</div><div class="sp-rad rs-valg"></div><div class="sp-fb" aria-live="polite"></div><div class="rs-hint lesbar" hidden></div><div class="sp-rad rs-nav"></div>');
        function ferdig(ok) {
          if (ok) poeng += forsøk <= 1 ? 1 : .5;
          const svg = G.q(el, '.rs-svg'); if (svg) svg.classList.add(ok ? 'rs-ok' : 'rs-feil');
          G.feedback(el, ok, (ok ? 'Riktig! ' : 'Ikke helt. ') + fb);
          const slutt = runde + 1 >= RUNDER; G.q(el, '.rs-nav').innerHTML = '<button type="button" class="knapp primær rs-neste">' + (slutt ? 'Se resultatet' : 'Neste ▶') + '</button>';
          G.q(el, '.rs-neste').addEventListener('click', () => { runde++; if (runde >= RUNDER) return G.slutt(el, { ikon: '🚒', tittel: 'Redningen er vellykket!', stjerner: G.stjerner(el, poeng, RUNDER), tekst: 'Du fikk ' + poeng + ' av ' + RUNDER + ' poeng.', lær: 'a² + b² = c². Vil du ha hypotenusen, legger du sammen kvadratene av katetene og tar kvadratroten. Vil du ha en katet, trekker du den andre katetens kvadrat fra kvadratet av hypotenusen.', igjen: () => { runde = 0; poeng = 0; vis(); } }); vis(); });
        }
        if (G.niv() === 0) {
          let opts;
          if (p.ukjent === 's') opts = G.alt(rett, [p.v + p.d, p.v * p.v + p.d * p.d, Math.abs(p.v - p.d)]); else opts = G.alt(rett, [p.s + o, p.s - o, p.s * p.s - o * o]);
          G.mc(G.q(el, '.rs-valg'), G.shuffle(opts.map(x => ({ t: x.t + ' m', ok: x.ok }))), ok => { forsøk = 1; ferdig(ok); });
          G.q(el, '.rs-hint').hidden = false; G.q(el, '.rs-hint').innerHTML = '<strong>Slik gjør du:</strong><ol>' + hint.map(x => '<li>' + x + '</li>').join('') + '</ol>';
        } else {
          G.q(el, '.rs-valg').innerHTML = '<label class="sr-only" for="rs-inp">Svar i meter</label><input id="rs-inp" class="rs-inp tallfelt" type="text" inputmode="decimal" autocomplete="off" placeholder="svar"> m <button type="button" class="knapp primær rs-sjekk">Sjekk</button> <button type="button" class="knapp liten rs-hjelp">💡 Hint</button>';
          const inp = G.q(el, '.rs-inp'); inp.focus(); let hn = 0;
          function sjekk() {
            const v = M.parseNum(inp.value); if (isNaN(v)) { G.feedback(el, false, 'Skriv et tall.'); return; }
            forsøk++; const ok = Math.abs(v - fasit) <= (p.heltall ? 1e-9 : .06);
            if (ok) { inp.disabled = true; ferdig(true); }
            else if (forsøk >= 2) { inp.disabled = true; ferdig(false); }
            else { G.feedback(el, false, 'Ikke helt. Prøv en gang til. Her er et hint: ' + hint[0]); const svg = G.q(el, '.rs-svg'); svg.classList.remove('rs-feil'); void svg.getBoundingClientRect(); svg.classList.add('rs-feil'); inp.select(); }
          }
          G.q(el, '.rs-sjekk').addEventListener('click', sjekk); inp.addEventListener('keydown', e => { if (e.key === 'Enter') sjekk(); });
          G.q(el, '.rs-hjelp').addEventListener('click', () => { hn = Math.min(hn + 1, hint.length); const h = G.q(el, '.rs-hint'); h.hidden = false; h.innerHTML = '<strong>Hint:</strong><ol>' + hint.slice(0, hn).map(x => '<li>' + x + '</li>').join('') + '</ol>'; });
        }
      }
      vis();
    }
  });

  /* ===================== Brusboks-designeren ===================== */
  G.add({
    id: 'brusboks', tittel: 'Brusboks-designeren', ikon: '🥫', trinn: 9, temaer: ['9/overflate-volum'],
    kort: 'Lag boksen som rommer akkurat riktig mengde med minst mulig aluminium.',
    hvordan: 'Boksen skal romme et bestemt volum. Når du endrer radius, endrer høyden seg slik at volumet blir riktig. Prøv deg fram med glidebryteren og se hva som skjer med arealet av aluminium. Trykk «Lås inn designet» når du tror du har funnet det beste.',
    lærer: 'Volum og overflate av en sylinder: V = π·r²·h og O = 2π·r² + 2π·r·h. Du får se at samme volum kan pakkes inn på mange måter, og at en spesiell form bruker minst materiale.',
    start: function (el) {
      const VOL = G.pr([330, 500], [330, 500, 1000], [330, 500, 1000, 1500]); let runde = 0, poeng = 0, r, beste, prøvd;
      const høyde = (V, r) => V / (Math.PI * r * r), areal = (V, r) => 2 * Math.PI * r * r + 2 * Math.PI * r * høyde(V, r);
      function vis() {
        const V = VOL[runde]; r = 2; beste = Infinity; prøvd = {};
        el.innerHTML = tmpl('<span>Bokstype ' + (runde + 1) + ' av ' + VOL.length + '</span><span>Volum: ' + V + ' mL</span><span>Poeng: ' + poeng + '</span>', 'Lag en boks som rommer <strong>' + V + ' mL</strong> (= ' + V + ' cm³) med minst mulig aluminium.',
          '<div class="bb-rom"><svg viewBox="0 0 220 280" class="bb-svg" role="img" aria-label="Tegning av sylinderformet boks"></svg><div class="bb-tall"><div>Radius: <strong class="bb-r"></strong> cm</div><div>Høyde: <strong class="bb-h"></strong> cm</div><div>Aluminium: <strong class="bb-a"></strong> cm²</div><div class="bb-stolpe" aria-hidden="true"><span class="bb-fyll"></span></div><div class="bb-beste">Minste du har funnet: –</div></div></div><div class="bb-kurve-wrap"><svg viewBox="0 0 320 150" class="bb-kurve" role="img" aria-label="Graf: aluminium mot radius. Kurven synker først og stiger så."></svg><p class="lesbar bb-kurve-tekst">Grafen viser aluminium (opp) mot radius (bortover). Den lilla prikken er boksen din.</p></div>' +
          '<div class="sp-slider"><label for="bb-s">Radius <span class="bb-rl"></span></label><input id="bb-s" type="range" min="1.5" max="9" step="0.1" value="2"></div><div class="sp-rad"><button type="button" class="knapp primær bb-lås">🔒 Lås inn designet</button></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad bb-nav"></div>');
        const s = G.q(el, '#bb-s'); s.addEventListener('input', () => { r = +s.value; tegn(V); }); G.q(el, '.bb-lås').addEventListener('click', () => lås(V)); tegn(V);
      }
      function tegn(V) {
        const h = høyde(V, r), a = areal(V, r), sk = Math.min(5, 230 / høyde(V, 1.5)), w = r * sk * 2, ht = h * sk, cx = 110, topp = 140 - ht / 2 + 20;
        beste = Math.min(beste, a); prøvd[R(r, 1)] = 1;
        G.q(el, '.bb-svg').innerHTML = '<ellipse cx="' + cx + '" cy="' + (topp + ht) + '" rx="' + (w / 2) + '" ry="' + Math.max(6, w / 8) + '" fill="#94a3b8"/><rect x="' + (cx - w / 2) + '" y="' + topp + '" width="' + w + '" height="' + ht + '" fill="#cbd5e1"/><ellipse cx="' + cx + '" cy="' + topp + '" rx="' + (w / 2) + '" ry="' + Math.max(6, w / 8) + '" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/><rect x="' + (cx - w / 2) + '" y="' + topp + '" width="' + w + '" height="' + ht + '" fill="none"/><line x1="' + (cx - w / 2) + '" y1="' + topp + '" x2="' + (cx - w / 2) + '" y2="' + (topp + ht) + '" stroke="#64748b" stroke-width="2"/><line x1="' + (cx + w / 2) + '" y1="' + topp + '" x2="' + (cx + w / 2) + '" y2="' + (topp + ht) + '" stroke="#64748b" stroke-width="2"/>';
        G.q(el, '.bb-r').textContent = F(R(r, 1)); G.q(el, '.bb-rl').textContent = '= ' + F(R(r, 1)) + ' cm'; G.q(el, '.bb-h').textContent = F(R(h, 1)); G.q(el, '.bb-a').textContent = F(Math.round(a));
        kurve(V);
        G.q(el, '.bb-fyll').style.width = Math.min(100, (a - 200) / 4) + '%'; G.q(el, '.bb-beste').textContent = 'Minste du har funnet: ' + F(Math.round(beste)) + ' cm²';
      }
      function kurve(V, vis) {
        const svg = G.q(el, '.bb-kurve'); if (!svg) return;
        const R0 = 1.5, R1 = 9, A0 = areal(V, 5), top = areal(V, R0); const amax = Math.min(top, areal(V, R1) * 1.6, A0 * 3.2), amin = areal(V, Math.cbrt(V / (2 * Math.PI))) * .85;
        const X = x => 20 + (x - R0) / (R1 - R0) * 290, Y = a => 135 - (Math.min(a, amax) - amin) / (amax - amin) * 120;
        let d = ''; for (let x = R0; x <= R1 + 1e-9; x += .1) d += (d ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(areal(V, x)).toFixed(1);
        let s = '<line x1="20" y1="135" x2="312" y2="135" stroke="#64748b"/><line x1="20" y1="8" x2="20" y2="135" stroke="#64748b"/><path d="' + d + '" fill="none" stroke="#2563eb" stroke-width="3"/>';
        if (vis) { const rb = Math.cbrt(V / (2 * Math.PI)); s += '<circle cx="' + X(rb) + '" cy="' + Y(areal(V, rb)) + '" r="6" fill="#16a34a"/><text x="' + (X(rb) + 8) + '" y="' + (Y(areal(V, rb)) - 8) + '" font-size="11" fill="#166534" font-weight="800">minst</text>'; }
        s += '<circle cx="' + X(r) + '" cy="' + Y(areal(V, r)) + '" r="6" fill="#7c3aed"/><text x="165" y="148" font-size="10" text-anchor="middle" fill="#475569">radius (cm)</text>';
        svg.innerHTML = s;
      }
      function lås(V) {
        const rb = Math.cbrt(V / (2 * Math.PI)), amin = areal(V, rb), a = areal(V, r), d = (a - amin) / amin;
        if (Object.keys(prøvd).length < 4) return G.feedback(el, false, 'Prøv litt mer først! Flytt glidebryteren og se hvordan arealet endrer seg. Du har bare prøvd ' + Object.keys(prøvd).length + ' størrelser.');
        kurve(V, true);
        const p = d <= .01 ? 3 : d <= .04 ? 2 : d <= .12 ? 1 : 0; poeng += p; G.q(el, '#bb-s').disabled = true; G.q(el, '.bb-lås').disabled = true;
        G.feedback(el, p > 0, (p === 3 ? 'Fantastisk! ' : p ? 'Bra! ' : 'Det går an å gjøre det bedre. ') + 'Din boks bruker ' + F(Math.round(a)) + ' cm². Minst mulig er ca. ' + F(Math.round(amin)) + ' cm², med radius ' + F(R(rb, 1)) + ' cm og høyde ' + F(R(2 * rb, 1)) + ' cm. Merk: den beste boksen er like høy som den er bred (høyde = diameter). +' + p + ' poeng.');
        const slutt = runde + 1 >= VOL.length; G.q(el, '.bb-nav').innerHTML = '<button type="button" class="knapp primær bb-neste">' + (slutt ? 'Se resultatet' : 'Neste boks ▶') + '</button>';
        G.q(el, '.bb-neste').addEventListener('click', () => { runde++; if (runde >= VOL.length) return G.slutt(el, { ikon: '🥫', tittel: 'Ingeniørarbeid!', stjerner: G.stjerner(el, poeng, VOL.length * 3), tekst: 'Du fikk ' + poeng + ' av ' + (VOL.length * 3) + ' poeng.', lær: 'Volumet av en sylinder er V = π·r²·h, og overflaten er 2π·r² + 2π·r·h. Den sylinderen som bruker minst materiale, har høyde lik diameter. Ekte bokser er litt annerledes fordi de skal være lette å holde i.', igjen: () => { runde = 0; poeng = 0; vis(); } }); vis(); });
      }
      vis();
    }
  });

  /* ===================== Data-smeden ===================== */
  const STAT = vs => { const s = vs.slice().sort((a, b) => a - b), n = s.length, sum = s.reduce((x, y) => x + y, 0); return { snitt: sum / n, median: s[(n - 1) / 2], bredde: s[n - 1] - s[0], s: s }; };
  G.add({
    id: 'data-smeden', tittel: 'Data-smeden', ikon: '⚒️', trinn: 9, temaer: ['9/sentralmal-spredning'],
    kort: 'Smi fem tall som passer med gjennomsnitt, median og variasjonsbredde.',
    hvordan: 'Du får fem glidebrytere (tallene fra 0 til 12). Lag fem tall som oppfyller kravene på tavla. Du ser gjennomsnitt, median og variasjonsbredde oppdatere seg mens du justerer. Trykk «Sjekk» når du tror du har det.',
    lærer: 'Hva gjennomsnitt (summen delt på antall), median (midterste tall når de er sortert) og variasjonsbredde (største minus minste) betyr, og hvordan de påvirkes av enkeltverdier. Spesielt: ett ekstremt tall kan trekke gjennomsnittet langt vekk fra medianen.',
    start: function (el) {
      const N = [
        { krav: 'Gjennomsnitt = 6', ok: s => s.snitt === 6, ex: [2, 4, 6, 8, 10] },
        { krav: 'Median = 5 og gjennomsnitt = 7', ok: s => s.median === 5 && s.snitt === 7, ex: [3, 5, 5, 10, 12] },
        { krav: 'Variasjonsbredde = 9, median = 4 og gjennomsnitt = 5', ok: s => s.bredde === 9 && s.median === 4 && s.snitt === 5, ex: [1, 2, 4, 8, 10] },
        { krav: 'Gjennomsnitt = 5, median = 5 og variasjonsbredde = 2', ok: s => s.snitt === 5 && s.median === 5 && s.bredde === 2, ex: [4, 5, 5, 5, 6] },
        { krav: 'Gjennomsnitt = 6, men median = 3 (ett par høye tall drar snittet opp)', ok: s => s.snitt === 6 && s.median === 3, ex: [1, 2, 3, 12, 12] }
      ];
      let nr = 0, v, forsøk, løst;
      function vis() {
        v = [4, 4, 4, 4, 4]; forsøk = 0; løst = false;
        el.innerHTML = tmpl('<span>Oppdrag ' + (nr + 1) + ' av ' + N.length + '</span>', 'Krav: <strong>' + N[nr].krav + '</strong>',
          '<div class="figur ds-figur"><svg viewBox="0 0 440 130" class="ds-svg" role="img" aria-label="Tallinje fra 0 til 12 med de fem tallene dine"></svg></div><div class="ds-tavle sp-tavle" aria-live="polite"></div>' +
          v.map((x, i) => '<div class="sp-slider"><label for="ds-' + i + '">Tall ' + (i + 1) + ': <span class="ds-v' + i + '">' + x + '</span></label><input id="ds-' + i + '" type="range" min="0" max="12" step="1" value="' + x + '"></div>').join('') +
          '<div class="sp-rad"><button type="button" class="knapp primær ds-sjekk">Sjekk</button><button type="button" class="knapp liten ds-eks">💡 Se et eksempel</button></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad ds-nav"></div>');
        v.forEach((_, i) => { const s = G.q(el, '#ds-' + i); s.addEventListener('input', () => { v[i] = +s.value; G.q(el, '.ds-v' + i).textContent = v[i]; tegn(); }); });
        G.q(el, '.ds-sjekk').addEventListener('click', sjekk); G.q(el, '.ds-eks').addEventListener('click', eks); tegn();
      }
      function tegn() {
        const st = STAT(v), X = x => 20 + x * 33; let g = '<line x1="14" y1="90" x2="426" y2="90" stroke="#14213d" stroke-width="3"/>';
        for (let i = 0; i <= 12; i++) g += '<line x1="' + X(i) + '" y1="84" x2="' + X(i) + '" y2="96" stroke="#14213d" stroke-width="2"/><text x="' + X(i) + '" y="112" text-anchor="middle" font-size="12" font-weight="700">' + i + '</text>';
        const cnt = {}; v.forEach(x => { cnt[x] = (cnt[x] || 0) + 1; g += '<circle cx="' + X(x) + '" cy="' + (76 - (cnt[x] - 1) * 20) + '" r="9" fill="#3b82f6" stroke="#fff" stroke-width="2"/>'; });
        g += '<path d="M' + X(st.snitt) + ' 94 l-8 14 h16 z" fill="#f97316"/><text x="' + X(st.snitt) + '" y="124" text-anchor="middle" font-size="11" font-weight="800" fill="#c2410c">snitt</text><line x1="' + X(st.median) + '" y1="12" x2="' + X(st.median) + '" y2="86" stroke="#16a34a" stroke-width="3" stroke-dasharray="5 4"/><text x="' + X(st.median) + '" y="10" text-anchor="middle" font-size="11" font-weight="800" fill="#15803d">median</text>';
        G.q(el, '.ds-svg').innerHTML = g;
        G.q(el, '.ds-tavle').innerHTML = '<strong>Gjennomsnitt:</strong> ' + F(R(st.snitt, 2)) + ' &nbsp; <strong>Median:</strong> ' + F(st.median) + ' &nbsp; <strong>Variasjonsbredde:</strong> ' + st.bredde + '<br><small>Sortert: ' + st.s.join(', ') + '</small>';
      }
      function sjekk() {
        if (løst) return; forsøk++; const st = STAT(v);
        if (N[nr].ok(st)) { løst = true; G.feedback(el, true, 'Riktig! 🎉 Tallene ' + st.s.join(', ') + ' har gjennomsnitt ' + F(R(st.snitt, 2)) + ', median ' + F(st.median) + ' og variasjonsbredde ' + st.bredde + '.'); return ferdig(); }
        G.feedback(el, false, 'Ikke helt ennå. Du har gjennomsnitt ' + F(R(st.snitt, 2)) + ' (summen er ' + v.reduce((a, b) => a + b, 0) + '), median ' + F(st.median) + ' og variasjonsbredde ' + st.bredde + '. Husk at gjennomsnitt = sum ÷ 5, så et gitt gjennomsnitt betyr en bestemt sum.');
      }
      function eks() { if (!forsøk) return G.feedback(el, false, 'Prøv først! Trykk «Sjekk» på et forsøk, så kan du få se et eksempel. 🙂'); G.feedback(el, true, 'Et eksempel: <strong>' + N[nr].ex.join(', ') + '</strong>. Det finnes mange andre løsninger.'); if (!løst) ferdig(); }
      function ferdig() {
        const rad = G.q(el, '.ds-nav'); if (rad.children.length) return; rad.innerHTML = '<button type="button" class="knapp primær ds-neste">' + (nr + 1 >= N.length ? 'Se resultatet' : 'Neste oppdrag ▶') + '</button>';
        G.q(el, '.ds-neste').addEventListener('click', () => { nr++; if (nr >= N.length) return G.slutt(el, { ikon: '⚒️', tittel: 'Mesterlig smedarbeid!', tekst: 'Du har smidd data til alle kravene.', lær: 'Gjennomsnitt = sum ÷ antall. Median er midterste tall når de er sortert. Variasjonsbredde = største − minste. Ett ekstremt tall flytter gjennomsnittet mye, men medianen lite.', igjen: () => { nr = 0; vis(); } }); vis(); });
      }
      vis();
    }
  });

  /* ===================== Sjansejegeren ===================== */
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const brøk = (a, b) => { const g = gcd(a, b); return (a / g) + '/' + (b / g); };
  G.add({
    id: 'sjansejegeren', tittel: 'Sjansejegeren', ikon: '🎲', trinn: 9, temaer: ['9/sannsynlighet', '9/simulering'],
    kort: 'Gjett, kast terninger i fleng, og se sannsynligheten vokse fram.',
    hvordan: 'Del 1: Gjett hvilken terningsum som er vanligst når du kaster to terninger. Så kaster datamaskinen for deg, 10, 100 eller 1000 ganger, og du ser hvordan stolpene ordner seg. Del 2: Fem sannsynlighetsspørsmål. Del 3: Tre terningspill der du avgjør om spillet er rettferdig.',
    lærer: 'At sannsynlighet er hvor mange gunstige utfall delt på alle mulige. Med mange forsøk nærmer den relative frekvensen seg sannsynligheten (store talls lov). Ikke alle utfall er like sannsynlige: sum 7 kan lages på flere måter enn sum 2.',
    start: function (el) {
      let kast, antall, gjett, qn, poeng;
      function del1() {
        kast = {}; for (let s = 2; s <= 12; s++) kast[s] = 0; antall = 0; gjett = null;
        el.innerHTML = tmpl('<span>Del 1 av 3: Terningsum</span>', 'Du kaster <strong>to terninger</strong> og legger sammen øynene. Hvilken sum tror du kommer oftest?', '<div class="sp-rad sj-gjett">' + [2, 4, 6, 7, 9, 12].map(s => '<button type="button" class="sp-valg" data-s="' + s + '">' + s + '</button>').join('') + '</div><div class="sp-fb" aria-live="polite"></div>');
        el.querySelectorAll('.sj-gjett button').forEach(b => b.addEventListener('click', () => { gjett = +b.dataset.s; lab(); }));
      }
      function lab() {
        el.innerHTML = tmpl('<span>Del 1 av 3</span><span>Du gjettet: ' + gjett + '</span><span>Kast: <b class="sj-n">0</b></span>', 'Kast mange ganger og se hva som skjer.',
          '<div class="figur"><svg viewBox="0 0 440 220" class="sj-svg" role="img" aria-label="Søylediagram over terningsummer"></svg></div><div class="sp-rad"><button type="button" class="knapp primær" data-k="10">🎲 Kast 10</button><button type="button" class="knapp primær" data-k="100">🎲 Kast 100</button><button type="button" class="knapp primær" data-k="1000">🎲 Kast 1000</button></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad sj-nav"></div>');
        el.querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => { const k = +b.dataset.k; for (let i = 0; i < k; i++) kast[G.rnd(1, 6) + G.rnd(1, 6)]++; antall += k; tegn(); }));
        tegn();
      }
      function tegn() {
        const mx = Math.max(1, ...Object.keys(kast).map(s => kast[s] / Math.max(1, antall) * 100)), skala = Math.max(20, Math.ceil(mx / 5) * 5); let g = '';
        for (let y = 0; y <= skala; y += skala / 4) { const yy = 190 - y / skala * 170; g += '<line x1="30" x2="430" y1="' + yy + '" y2="' + yy + '" stroke="#e2e8f0"/><text x="26" y="' + (yy + 4) + '" text-anchor="end" font-size="11" fill="#52617a">' + Math.round(y) + ' %</text>'; }
        for (let s = 2; s <= 12; s++) { const pr = antall ? kast[s] / antall * 100 : 0, x = 42 + (s - 2) * 36, hh = pr / skala * 170, teori = (6 - Math.abs(s - 7)) / 36 * 100; g += '<rect x="' + x + '" y="' + (190 - hh) + '" width="28" height="' + hh + '" rx="4" fill="' + (s === gjett ? '#f97316' : '#3b82f6') + '"/><text x="' + (x + 14) + '" y="208" text-anchor="middle" font-size="12" font-weight="700">' + s + '</text>' + (antall >= 100 ? '<line x1="' + (x - 2) + '" x2="' + (x + 30) + '" y1="' + (190 - teori / skala * 170) + '" y2="' + (190 - teori / skala * 170) + '" stroke="#16a34a" stroke-width="3" stroke-dasharray="4 3"/>' : ''); }
        G.q(el, '.sj-svg').innerHTML = g; G.q(el, '.sj-n').textContent = antall;
        if (antall >= 100) {
          G.feedback(el, true, 'De grønne strekene viser den teoretiske sannsynligheten. Sum 7 kan lages på 6 måter (1+6, 2+5, 3+4, 4+3, 5+2, 6+1) av 36 mulige, så P(sum 7) = 6/36 = 1/6 ≈ 17 %. Sum 2 kan bare lages på én måte (1+1): 1/36 ≈ 3 %. ' + (gjett === 7 ? 'Du gjettet riktig!' : 'Du gjettet ' + gjett + ', men det er 7 som er vanligst.') + ' Jo flere kast, jo nærmere kommer stolpene de grønne strekene.');
          const rad = G.q(el, '.sj-nav'); if (!rad.children.length) { rad.innerHTML = '<button type="button" class="knapp primær sj-videre">Videre til spørsmålene ▶</button>'; G.q(el, '.sj-videre').addEventListener('click', del2); }
        }
      }
      function lagSpm() {
        const t = G.rnd(0, 4);
        if (t === 0) { const r = G.rnd(2, 6), b = G.rnd(2, 6), gr = G.rnd(1, 4), n = r + b + gr; const f = G.pick([['rød', r], ['blå', b], ['grønn', gr]]); return { t: 'En pose har <strong>' + r + ' røde</strong>, <strong>' + b + ' blå</strong> og <strong>' + gr + ' grønne</strong> kuler. Du trekker én kule uten å se. Hva er sannsynligheten for <strong>' + f[0] + '</strong>?', rett: brøk(f[1], n), gale: [brøk(f[1], n - f[1]), brøk(n - f[1], n), brøk(1, 3)], fb: 'Gunstige utfall: ' + f[1] + ' av ' + n + ' mulige, så ' + f[1] + '/' + n + (brøk(f[1], n) !== f[1] + '/' + n ? ' = ' + brøk(f[1], n) : '') + '.' }; }
        if (t === 1) return { t: 'Du kaster <strong>én terning</strong>. Hva er sannsynligheten for et <strong>partall</strong>?', rett: '1/2', gale: ['1/3', '1/6', '2/3'], fb: 'Partall: 2, 4 og 6. Det er 3 av 6 mulige, så 3/6 = 1/2.' };
        if (t === 2) return { t: 'Du kaster <strong>to terninger</strong>. Hva er sannsynligheten for sum <strong>7</strong>?', rett: '1/6', gale: ['1/12', '1/11', '7/36'], fb: 'Det er 6 gunstige utfall av 36 mulige: 6/36 = 1/6.' };
        if (t === 3) { const n = G.rnd(5, 9), r = G.rnd(1, n - 2); return { t: 'En pose har ' + n + ' kuler, og <strong>' + r + '</strong> av dem er røde. Hva er sannsynligheten for å <strong>ikke</strong> trekke rød?', rett: brøk(n - r, n), gale: [brøk(r, n), brøk(n - r, r), brøk(1, n)], fb: 'Ikke rød betyr de ' + (n - r) + ' andre av ' + n + ': ' + (n - r) + '/' + n + '. Eller 1 − ' + r + '/' + n + '.' }; }
        return { t: 'Du kaster <strong>to mynter</strong>. Hva er sannsynligheten for <strong>to kron</strong>?', rett: '1/4', gale: ['1/2', '1/3', '2/3'], fb: 'Mulige utfall: KK, KM, MK, MM. Bare ett av dem er to kron: 1/4.' };
      }
      function del2() {
        qn = 0; poeng = 0; spm();
      }
      function spm() {
        const s = lagSpm(); const set = [s.rett].concat(s.gale.filter(x => x !== s.rett)).slice(0, 4);
        el.innerHTML = tmpl('<span>Del 2 av 3</span><span>Spørsmål ' + (qn + 1) + ' av 5</span><span>Poeng: ' + poeng + '</span>', s.t, '<div class="sp-rad sj-valg"></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad sj-nav"></div>');
        G.mc(G.q(el, '.sj-valg'), G.shuffle(set.map(x => ({ t: x, ok: x === s.rett }))), ok => {
          if (ok) poeng++; G.feedback(el, ok, (ok ? 'Riktig! ' : 'Ikke helt. ') + s.fb);
          G.q(el, '.sj-nav').innerHTML = '<button type="button" class="knapp primær sj-neste">' + (qn >= 4 ? 'Se resultatet' : 'Neste ▶') + '</button>';
          G.q(el, '.sj-neste').addEventListener('click', () => { qn++; if (qn >= 5) return del3(); spm(); });
        });
      }
      /* Del 3: Er spillet rettferdig? */
      let p3 = 0;
      const SP = [
        { t: 'Spiller A vinner hvis <strong>summen er 7</strong>. Spiller B vinner hvis summen er <strong>6 eller 8</strong>.', a: (x, y) => x + y === 7, b: (x, y) => x + y === 6 || x + y === 8 },
        { t: 'Spiller A vinner hvis <strong>summen er et partall</strong>. Spiller B vinner hvis summen er <strong>et oddetall</strong>.', a: (x, y) => (x + y) % 2 === 0, b: (x, y) => (x + y) % 2 === 1 },
        { t: 'Spiller A vinner hvis <strong>begge terningene viser likt</strong>. Spiller B vinner hvis de <strong>skiller seg med 3 eller mer</strong>.', a: (x, y) => x === y, b: (x, y) => Math.abs(x - y) >= 3 },
        { t: 'Spiller A vinner hvis <strong>summen er 6 eller mindre</strong>. Spiller B vinner hvis summen er <strong>8 eller mer</strong>. Ved sum 7 vinner ingen.', a: (x, y) => x + y <= 6, b: (x, y) => x + y >= 8 },
        { t: 'Spiller A vinner hvis det er <strong>minst én sekser</strong>. Spiller B vinner hvis det er <strong>ingen sekser</strong>.', a: (x, y) => x === 6 || y === 6, b: (x, y) => x !== 6 && y !== 6 }
      ];
      function del3() {
        const sett = G.shuffle(SP).slice(0, 3); let k = 0; p3 = 0; vis3();
        function vis3() {
          const s = sett[k]; let na = 0, nb = 0; for (let x = 1; x <= 6; x++) for (let y = 1; y <= 6; y++) { if (s.a(x, y)) na++; if (s.b(x, y)) nb++; }
          const rett = na > nb ? 'A' : nb > na ? 'B' : 'L';
          el.innerHTML = tmpl('<span>Del 3: Rettferdig spill?</span><span>Spill ' + (k + 1) + ' av 3</span>', 'To spillere kaster <strong>to terninger</strong>. ' + s.t + ' Er spillet rettferdig?',
            '<div class="sp-rad sj-valg"></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad sj-nav"></div>');
          G.mc(G.q(el, '.sj-valg'), [{ t: 'A har størst sjanse', ok: rett === 'A' }, { t: 'B har størst sjanse', ok: rett === 'B' }, { t: 'Like stor sjanse (rettferdig)', ok: rett === 'L' }], ok => {
            if (ok) p3++; G.feedback(el, ok, (ok ? 'Riktig! ' : 'Ikke helt. ') + 'Av 36 mulige utfall vinner A i ' + na + ' (' + brøk(na, 36) + ') og B i ' + nb + ' (' + brøk(nb, 36) + '). ' + (rett === 'L' ? 'Det er like mange, så spillet er rettferdig.' : 'Den som har flest gunstige utfall, har størst sjanse.'));
            const sl = k + 1 >= 3; G.q(el, '.sj-nav').innerHTML = '<button type="button" class="knapp primær sj-neste3">' + (sl ? 'Se resultatet' : 'Neste ▶') + '</button>';
            G.q(el, '.sj-neste3').addEventListener('click', () => { k++; if (k >= 3) return SLUTT(); vis3(); });
          });
        }
      }
      function SLUTT() { return G.slutt(el, { ikon: '🎲', tittel: 'Sjansejeger!', stjerner: G.stjerner(el, poeng + p3, 8), tekst: 'Du fikk ' + (poeng + p3) + ' av 8 riktige (sannsynlighet og rettferdige spill).', lær: 'Sannsynlighet = gunstige utfall ÷ alle mulige utfall (når alle er like sannsynlige). Med to terninger er sum 7 vanligst, siden den kan lages på flest måter. Jo flere forsøk du gjør, jo nærmere kommer resultatene sannsynligheten.', igjen: del1 }); }
      del1();
    }
  });
})();
