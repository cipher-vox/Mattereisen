/* ============================================================
   Ekstra oppgaver: Negative tall (8. trinn)
   Oppgavene lages tilfeldig hver gang. Trykk «Nytt sett» for flere.
   Hvert sett har fasit nederst.
   ============================================================ */
(function () {
  const M = window.MATTE;
  const N = M.num;
  const c = n => '{' + (n < 0 ? '-' : '') + Math.abs(n) + '}';          // tall til markup
  const s = n => (n < 0 ? '(-' + (-n) + ')' : String(n));               // tall i uttrykk (parentes om negativt)
  const first = n => (n < 0 ? '-' + (-n) : String(n));                  // første tall i uttrykk
  const sign = r => (r() < 0.5 ? -1 : 1);

  function regn(expr) {
    const v = M.evalExpr(expr);
    return { q: M.prettyExpr(expr) + ' =', num: v, a: M.prettyExpr(expr) + ' = ' + N(v) };
  }
  function tekst(q, v, enhet) {
    return { q: M.markup(q), num: v, a: N(v) + (enhet ? ' ' + enhet : '') };
  }

  M.ekstra['8/negative-tall'] = function (mode) {
    const lett = mode === 'steg';
    const R = lett ? 6 : 20;           // største tall i enkle oppgaver
    const G = lett ? 5 : 9;            // største tall i gange og dele
    const mellom = (r, lo, hi) => r.int(lo, hi);

    const sek = [];

    sek.push({
      id: 'sammenlign', ikon: '⚖️', tittel: 'Sammenligne tall', antall: lett ? 8 : 12,
      intro: 'Skriv &lt; (mindre enn) eller &gt; (større enn) i svarfeltet.',
      lag: function (r) {
        let a, b; do { a = r.int(-R, R); b = r.int(-R, R); } while (a === b);
        return { q: N(a) + ' &nbsp;?&nbsp; ' + N(b), str: a < b ? '<' : '>', a: N(a) + (a < b ? ' &lt; ' : ' &gt; ') + N(b) };
      }
    });

    if (!lett) {
      sek.push({
        id: 'storst', ikon: '🔝', tittel: 'Størst og minst', antall: 6,
        intro: 'Skriv tallet som svar.',
        lag: function (r, i) {
          const set = []; while (set.length < 4) { const x = r.int(-R, R); if (!set.includes(x)) set.push(x); }
          const stor = i % 2 === 0; const v = stor ? Math.max.apply(null, set) : Math.min.apply(null, set);
          return { q: 'Hvilket tall er ' + (stor ? '<strong>størst</strong>' : '<strong>minst</strong>') + '? &nbsp;' + set.map(x => N(x)).join(', '), num: v, a: N(v) };
        }
      });
    }

    sek.push({
      id: 'pluss', ikon: '➕', tittel: 'Pluss', antall: lett ? 8 : 12,
      intro: 'Regn ut. Husk at pluss et negativt tall betyr å hoppe mot venstre.',
      lag: function (r, i) {
        const a = r.int(1, R), b = r.int(1, R), t = i % 3;
        if (t === 0) return regn(first(-a) + '+' + b);
        if (t === 1) return regn(a + '+' + s(-b));
        return regn(first(-a) + '+' + s(-b));
      }
    });

    sek.push({
      id: 'minus', ikon: '➖', tittel: 'Minus', antall: lett ? 8 : 12,
      intro: 'Regn ut. Husk at minus et negativt tall er det samme som pluss.',
      lag: function (r, i) {
        const t = i % 4; const a = r.int(1, R), b = r.int(1, R);
        if (t === 0) { const x = r.int(1, R - 1), y = r.int(x + 1, R); return regn(x + '-' + y); }
        if (t === 1) return regn(first(-a) + '-' + b);
        if (t === 2) return regn(a + '-' + s(-b));
        return regn(first(-a) + '-' + s(-b));
      }
    });

    sek.push({
      id: 'gange', ikon: '✖️', tittel: 'Gange', antall: lett ? 8 : 12,
      intro: 'Like fortegn gir pluss. Ulike fortegn gir minus.',
      lag: function (r, i) {
        const a = r.int(2, G), b = r.int(2, G), t = i % 3;
        if (t === 0) return regn(s(-a) + '*' + b);
        if (t === 1) return regn(a + '*' + s(-b));
        return regn(s(-a) + '*' + s(-b));
      }
    });

    sek.push({
      id: 'dele', ikon: '➗', tittel: 'Dele', antall: lett ? 8 : 12,
      intro: 'Samme fortegnsregler som for gange. Sjekk svaret med gange.',
      lag: function (r, i) {
        const b = r.int(2, G), q = r.int(2, G), A = b * q, t = i % 3;
        if (t === 0) return regn(s(-A) + '/' + b);
        if (t === 1) return regn(A + '/' + s(-b));
        return regn(s(-A) + '/' + s(-b));
      }
    });

    if (!lett) {
      sek.push({
        id: 'blandet', ikon: '🎯', tittel: 'Blandede regnestykker', antall: 10,
        intro: 'Her må du tenke på regnerekkefølgen: parentes først, så gange og dele, så pluss og minus.',
        lag: function (r, i) {
          const t = i % 4;
          if (t === 0) { const a = sign(r) * r.int(1, 12), b = sign(r) * r.int(1, 12), cc = sign(r) * r.int(1, 12); return regn(first(a) + '+' + s(b) + '-' + s(cc)); }
          if (t === 1) { const x = sign(r) * r.int(2, 6), y = sign(r) * r.int(2, 6), z = sign(r) * r.int(1, 15); return regn(s(x) + '*' + s(y) + '+' + s(z)); }
          if (t === 2) { const a = sign(r) * r.int(1, 9), b = sign(r) * r.int(1, 9), cc = sign(r) * r.int(2, 5); return regn('(' + first(a) + '+' + s(b) + ')*' + s(cc)); }
          const a = sign(r) * r.int(1, 12), b = sign(r) * r.int(2, 5), cc = sign(r) * r.int(2, 5); return regn(first(a) + '-' + s(b) + '*' + s(cc));
        }
      });
    }

    sek.push({
      id: 'hverdag', ikon: '📖', tittel: 'Tekstoppgaver', antall: lett ? 6 : 8,
      intro: 'Skriv svaret som et tall. Under null, gjeld og minus skriver du som negative tall.',
      lag: function (r, i) {
        const t = i % (lett ? 6 : 9);
        if (t === 0) { const m = r.int(2, lett ? 8 : 15), up = r.int(m + 1, m + (lett ? 8 : 15)); return tekst('Klokka 07 er det ' + c(-m) + ' grader. Til klokka 15 har temperaturen steget ' + up + ' grader. Hva er temperaturen klokka 15?', -m + up, 'grader'); }
        if (t === 1) { const x = r.int(1, lett ? 5 : 10), f = r.int(x + 1, x + (lett ? 6 : 15)); return tekst('Temperaturen er ' + x + ' grader. Den faller ' + f + ' grader. Hva er temperaturen nå?', x - f, 'grader'); }
        if (t === 2) { const d = r.int(3, lett ? 12 : 30), u = r.int(1, d - 1); return tekst('En dykker er ' + d + ' meter under havflaten. Hun svømmer ' + u + ' meter opp. Hvor dypt er hun nå? (Under havflaten er negativt.)', -d + u, 'm'); }
        if (t === 3) { const e = r.int(1, 6), k = r.int(1, 3); return tekst('Du er i etasje ' + e + '. Heisen går ned til etasje ' + c(-k) + '. Hvor mange etasjer går heisen ned?', e + k); }
        if (t === 4) { const sl = r.int(20, lett ? 100 : 200), d = r.int(10, lett ? 150 : 400); return tekst('Saldoen på kontoen din er ' + c(-sl) + ' kr. Du setter inn ' + d + ' kr. Hva er saldoen nå?', -sl + d, 'kr'); }
        if (t === 5) { const a = r.int(1, lett ? 6 : 12), b = r.int(1, lett ? 6 : 12); return tekst('Temperaturen går fra ' + c(-a) + ' til ' + b + ' grader. Hva er endringen? (Endring = slutt − start)', b + a, 'grader'); }
        if (t === 6) { const d = r.int(2, 6), n = r.int(2, 6); return tekst('Temperaturen faller ' + d + ' grader hver dag i ' + n + ' dager. Hva er den totale endringen? (Fall er negativt.)', -d * n, 'grader'); }
        if (t === 7) { const n = r.int(2, 6), k = r.int(10, 90); return tekst(n + ' venner deler en gjeld på ' + (n * k) + ' kr likt. Hva er hver sin del? (Gjeld er negativt.)', -k, 'kr'); }
        const rig = r.int(3, 8), pi = r.int(2, 5), x = r.int(3, 9), y = r.int(1, 6);
        return tekst('I et spill får du ' + rig + ' poeng for hvert riktige svar og ' + c(-pi) + ' poeng for hvert feil svar. Du har ' + x + ' riktige og ' + y + ' feil. Hvor mange poeng har du?', x * rig - y * pi, 'poeng');
      }
    });

    return {
      tittel: 'Ekstra oppgaver: Negative tall',
      intro: lett
        ? 'Her kan du øve mer. Skriv svaret i feltet og trykk Enter. Du ser med en gang om det er riktig. Fasit står nederst i hver del. Trykk «Nytt sett» for nye oppgaver.'
        : 'Mange flere oppgaver om negative tall. Skriv svaret i feltet og trykk Enter for å sjekke. Fasit står nederst i hver del, og «Nytt sett» lager helt nye oppgaver.',
      seksjoner: sek
    };
  };
})();
