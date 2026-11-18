/* Spill D: Løgnjegeren, Prisdetektiven, Rente-raketten, Feiljegeren (8. og 10. trinn) */
(function () {
  'use strict';
  const M = window.MATTE, G = M.G, F = M.fmt;
  const R = (x, d) => { const p = Math.pow(10, d || 0); return Math.round(x * p) / p; };
  const tmpl = (hud, spm, bokser) => '<div class="sp-hud">' + hud + '</div>' + (spm ? '<div class="sp-spm lesbar">' + spm + '</div>' : '') + bokser;
  const svg = (inner, tittel) => '<svg viewBox="0 0 300 190" class="lj-svg" role="img" aria-label="' + tittel + '">' + inner + '</svg>';

  /* ===================== Løgnjegeren ===================== */
  function søyler(verdier, navn, y0, y1, farger, tittel, enhet) {
    let g = '<text x="150" y="16" text-anchor="middle" font-weight="800" font-size="13">' + tittel + '</text>';
    for (let i = 0; i <= 4; i++) { const v = y0 + (y1 - y0) * i / 4, y = 160 - i * 34; g += '<line x1="40" x2="290" y1="' + y + '" y2="' + y + '" stroke="#e2e8f0"/><text x="34" y="' + (y + 4) + '" text-anchor="end" font-size="11" fill="#52617a">' + F(R(v, 1)) + '</text>'; }
    verdier.forEach((v, i) => { const h = (v - y0) / (y1 - y0) * 136, w = 250 / verdier.length, x = 40 + i * w + w * .2; g += '<rect x="' + x + '" y="' + (160 - h) + '" width="' + (w * .6) + '" height="' + h + '" fill="' + farger[i % farger.length] + '" rx="3"/><text x="' + (x + w * .3) + '" y="178" text-anchor="middle" font-size="12" font-weight="700">' + navn[i] + '</text><text x="' + (x + w * .3) + '" y="' + (156 - h) + '" text-anchor="middle" font-size="11" font-weight="800">' + v + (enhet || '') + '</text>'; });
    return g;
  }
  function linje(pkt, x0, x1, y0, y1, tittel, xs) {
    let g = '<text x="150" y="16" text-anchor="middle" font-weight="800" font-size="13">' + tittel + '</text>';
    for (let i = 0; i <= 4; i++) { const v = y0 + (y1 - y0) * i / 4, y = 160 - i * 34; g += '<line x1="40" x2="290" y1="' + y + '" y2="' + y + '" stroke="#e2e8f0"/><text x="34" y="' + (y + 4) + '" text-anchor="end" font-size="11" fill="#52617a">' + F(R(v, 0)) + '</text>'; }
    const X = x => 50 + (x - x0) / (x1 - x0) * 230, Y = y => 160 - (y - y0) / (y1 - y0) * 136;
    g += '<polyline fill="none" stroke="#2563eb" stroke-width="3" points="' + pkt.map(p => X(p[0]) + ',' + Y(p[1])).join(' ') + '"/>' + pkt.map(p => '<circle cx="' + X(p[0]) + '" cy="' + Y(p[1]) + '" r="3.5" fill="#2563eb"/>').join('');
    xs.forEach(x => { const ps = Array.isArray(x) ? x[0] : x, lb = Array.isArray(x) ? x[1] : x; g += '<text x="' + X(ps) + '" y="178" text-anchor="middle" font-size="11">' + lb + '</text>'; });
    return g;
  }
  const SC = [
    { tittel: 'Salget skyter i været', påstand: '«Se hvor kraftig salget har økt!» (reklame for en butikk)', gal: svg(søyler([95, 98], ['2023', '2024'], 94, 98.5, ['#f97316', '#2563eb'], 'Salg (mill. kr)'), 'Søylediagram med avkortet akse'), ærlig: svg(søyler([95, 98], ['2023', '2024'], 0, 100, ['#f97316', '#2563eb'], 'Salg (mill. kr)'), 'Søylediagram med akse fra null'),
      alt: ['Y-aksen starter ikke på 0, så en liten økning ser enorm ut', 'Søylene har ulik farge', 'Det er bare to søyler, og derfor er diagrammet ulovlig', 'Tallene på y-aksen er for små'], hva: 'Salget økte fra 95 til 98, altså litt over 3 %. Når aksen starter på 0, ser du at søylene nesten er like høye. En avkortet akse overdriver forskjellen.' },
    { tittel: 'Prisene stiger bare', påstand: '«Boligprisene stiger og stiger!» (viser bare de tre siste årene)', gal: svg(linje([[2022, 40], [2023, 46], [2024, 53]], 2022, 2024, 38, 55, 'Pris (indeks)', [2022, 2023, 2024]), 'Linjediagram med kort tidsperiode'), ærlig: svg(linje([[2016, 60], [2017, 66], [2018, 62], [2019, 52], [2020, 44], [2021, 38], [2022, 40], [2023, 46], [2024, 53]], 2016, 2024, 36, 68, 'Pris (indeks)', [2016, 2018, 2020, 2022, 2024]), 'Linjediagram med hele tidsperioden'),
      alt: ['Bare et lite utsnitt av tidsperioden er vist (plukker ut de årene som passer)', 'Linja har feil farge', 'Prisene kan ikke måles med et linjediagram', 'Det mangler en tittel'], hva: 'Når du ser hele perioden, ser du at prisene falt først og bare har steget igjen de siste årene. Å velge ut en tidsperiode som passer budskapet kalles «kirsebærplukking».' },
    { tittel: 'Snittlønnen er 62 000', påstand: '«Snittlønnen hos oss er 62 000 kr i måneden!» (stillingsannonse)', gal: svg('<text x="150" y="16" text-anchor="middle" font-weight="800" font-size="13">Gjennomsnittslønn per måned</text><rect x="90" y="40" width="120" height="120" fill="#16a34a" rx="6"/><text x="150" y="110" text-anchor="middle" fill="#fff" font-weight="900" font-size="22">62 000 kr</text>', 'Én søyle med snittlønn'), ærlig: svg(søyler([30, 31, 32, 34, 35, 36, 38, 40, 250], ['', '', '', '', '', '', '', '', ''], 0, 260, ['#3b82f6'], 'Alle 9 lønningene (tusen kr)'), 'Søyler for alle lønningene'),
      alt: ['Ett par veldig høye lønninger drar gjennomsnittet opp, medianen er mye lavere', 'Gjennomsnitt kan aldri brukes om lønn', 'Søylen er for bred', 'Prosent burde vært brukt'], hva: 'Åtte av ni tjener 30–40 tusen. Én leder tjener 250 tusen. Gjennomsnittet blir 62 tusen, men det er ingen som tjener nær det. Medianen (midterste lønn) er 35 tusen og sier mer om en vanlig ansatt.' },
    { tittel: 'Dobbelt så stor!', påstand: '«Vi har doblet antall kunder!» (bildediagram)', gal: svg('<text x="150" y="16" text-anchor="middle" font-weight="800" font-size="13">Antall kunder</text><text x="70" y="178" text-anchor="middle" font-size="12" font-weight="700">2023</text><text x="215" y="178" text-anchor="middle" font-size="12" font-weight="700">2024</text><circle cx="70" cy="140" r="20" fill="#f97316"/><rect x="62" y="158" width="16" height="0" /><circle cx="215" cy="100" r="40" fill="#2563eb"/><text x="70" y="145" text-anchor="middle" fill="#fff" font-weight="800" font-size="12">100</text><text x="215" y="105" text-anchor="middle" fill="#fff" font-weight="800" font-size="12">200</text>', 'To sirkler, den ene med dobbel bredde og høyde'), ærlig: svg('<text x="150" y="16" text-anchor="middle" font-weight="800" font-size="13">Antall kunder</text><text x="70" y="178" text-anchor="middle" font-size="12" font-weight="700">2023</text><text x="215" y="178" text-anchor="middle" font-size="12" font-weight="700">2024</text><circle cx="70" cy="120" r="24" fill="#f97316"/><circle cx="190" cy="120" r="24" fill="#2563eb"/><circle cx="244" cy="120" r="24" fill="#2563eb"/><text x="70" y="125" text-anchor="middle" fill="#fff" font-weight="800" font-size="12">100</text><text x="217" y="150" text-anchor="middle" font-size="12">2 × 100 = 200</text>', 'Ett symbol i 2023 og to like store i 2024'),
      alt: ['Figuren er dobbelt så høy og dobbelt så bred, så arealet blir fire ganger så stort', 'Figurene har ulike farger', 'Figurene er runde', 'Årstallene står under figurene'], hva: 'Når både bredde og høyde dobles, blir arealet 2 · 2 = 4 ganger så stort. Øyet ser areal, så dobling ser ut som firedobling. Bruk like store symboler, og tegn flere av dem.' },
    { tittel: '9 av 10 anbefaler', påstand: '«9 av 10 anbefaler produktet vårt!»', gal: svg('<text x="150" y="16" text-anchor="middle" font-weight="800" font-size="13">Anbefaler produktet</text><circle cx="150" cy="95" r="60" fill="#16a34a"/><text x="150" y="108" text-anchor="middle" fill="#fff" font-weight="900" font-size="34">90 %</text>', 'Stor sirkel med 90 prosent'), ærlig: svg('<text x="150" y="16" text-anchor="middle" font-weight="800" font-size="13">Anbefaler produktet</text><text x="150" y="60" text-anchor="middle" font-size="16" font-weight="800">9 av 10 spurte</text>' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => '<circle cx="' + (60 + i * 20) + '" cy="100" r="8" fill="' + (i < 9 ? '#16a34a' : '#dc2626') + '"/>').join('') + '<text x="150" y="150" text-anchor="middle" font-size="13">Bare 10 personer er spurt – kanskje kjente</text>', 'Ti personer, ni anbefaler'),
      alt: ['Det er spurt veldig få personer, så prosenten sier lite', 'Sirkelen er grønn', 'Prosent kan ikke brukes om anbefalinger', 'Det står ikke hva produktet heter'], hva: '90 % høres overbevisende ut, men hvis bare 10 personer er spurt (kanskje venner av selgeren), er det lite å bygge på. Spør alltid: hvor mange, og hvem ble spurt? Et stort, tilfeldig utvalg gir mer pålitelige tall.' },
    { tittel: 'Is gir drukning?', påstand: '«Når isforbruket øker, øker antall drukningsulykker. Is er farlig!»', gal: svg(linje([[1, 10], [2, 14], [3, 22], [4, 34], [5, 40], [6, 28], [7, 14]], 1, 7, 0, 45, 'Is-salg (blå) og drukninger (rød) per måned', [[1, 'jan'], [2, 'mar'], [3, 'mai'], [4, 'jul'], [5, 'sep'], [6, 'nov']]).replace('</svg>', '') + '<polyline fill="none" stroke="#dc2626" stroke-width="3" points="' + [[1, 2], [2, 3], [3, 6], [4, 9], [5, 10], [6, 6], [7, 3]].map(p => (50 + (p[0] - 1) / 6 * 230) + ',' + (160 - p[1] / 45 * 136)).join(' ') + '"/></svg>', 'To linjer som stiger og faller sammen'), ærlig: svg('<text x="150" y="16" text-anchor="middle" font-weight="800" font-size="13">Hva ligger bak?</text><text x="150" y="70" text-anchor="middle" font-size="40">☀️</text><text x="60" y="140" text-anchor="middle" font-size="34">🍦</text><text x="240" y="140" text-anchor="middle" font-size="34">🏊</text><path d="M130 85 L75 118" stroke="#334155" stroke-width="3" fill="none"/><path d="M170 85 L225 118" stroke="#334155" stroke-width="3" fill="none"/><text x="150" y="175" text-anchor="middle" font-size="12" font-weight="700">Sol og varme gir både is og bading</text>', 'Sola er årsak til begge deler'),
      alt: ['Begge øker om sommeren, men det er ikke isen som er årsaken. Sammenheng er ikke det samme som årsak', 'Kurvene har feil farger', 'Det er for mange måneder', 'Drukning kan ikke vises i en graf'], hva: 'To ting som endrer seg samtidig, har en sammenheng (korrelasjon). Det betyr ikke at den ene forårsaker den andre. Her er det en tredje faktor, sommervarmen, som får folk til å spise is og bade mer.' }
  ];

  const FIKS = [
    ['Starte y-aksen på 0', 'Bruke lavere tall på aksen', 'Gjøre søylene bredere'],
    ['Vise hele tidsperioden', 'Fjerne tallene på aksen', 'Bare vise det siste året'],
    ['Oppgi medianen i tillegg til gjennomsnittet', 'Bare oppgi den høyeste lønnen', 'Fjerne lederen fra annonsen'],
    ['Bruke søyler med lik bredde, der bare høyden viser tallet', 'Gjøre figuren tre ganger så stor', 'Bruke samme farge på begge'],
    ['Oppgi hvor mange som ble spurt', 'Bruke en større sirkel', 'Skrive prosenten med større skrift'],
    ['Si at det ikke er bevist at isen forårsaker noe, og lete etter felles forklaring (sommer)', 'Forby is', 'Tegne grafen med andre farger']
  ];
  SC.push(
    { tittel: 'Ulykkene økte 100 %!', påstand: '«Antall ulykker i kommunen økte med 100 %!» (avisoverskrift)', gal: svg(søyler([1, 2], ['I fjor', 'I år'], 0, 2.5, ['#f97316', '#dc2626'], 'Ulykker (antall)'), 'Søylediagram som viser en dobling'), ærlig: svg(søyler([1, 2], ['I fjor', 'I år'], 0, 20, ['#f97316', '#dc2626'], 'Ulykker (antall, rimelig skala)'), 'Søylediagram med stor skala'),
      alt: ['Prosenten høres stor ut, men det er bare én ulykke mer', 'Det er for få søyler', 'Rødt er en farlig farge', 'Det mangler årstall'], hva: 'Fra 1 til 2 er en dobling, 100 %. Men det er bare én ulykke mer. Prosent kan høres dramatisk ut når tallene er små. Spør alltid: hvor mange er det egentlig?' },
    { tittel: 'Temperaturen stiger ikke', påstand: '«Gjennomsnittstemperaturen har knapt endret seg!»', gal: svg(linje([[1980, 14.0], [2000, 14.4], [2020, 15.0]], 1980, 2020, 0, 100, 'Temperatur (°C)', [1980, 2000, 2020]), 'Linjediagram der aksen går fra 0 til 100'), ærlig: svg(linje([[1980, 14.0], [2000, 14.4], [2020, 15.0]], 1980, 2020, 13, 16, 'Temperatur (°C), tydelig skala', [1980, 2000, 2020]), 'Linjediagram med passende akse'),
      alt: ['Aksen går til 100, så en endring på ca. 1 grad ser helt flat ut', 'Linja er blå', 'Det er bare tre punkter', 'Årstallene mangler'], hva: 'Aksen kan lure begge veier: for stor skala skjuler en endring, avkortet akse overdriver. Se alltid på tallene på aksen, og spør hvor stor endringen er (her ca. 1 grad på 40 år).' },
    { tittel: 'Et flertall velger oss', påstand: '«Et flertall av kundene foretrekker oss!» (48 % mot 46 % og 6 % ubesvart)', gal: svg(søyler([48, 46, 6], ['Oss', 'Dem', 'Vet ikke'], 0, 60, ['#16a34a', '#94a3b8', '#cbd5e1'], 'Foretrekker (%)', ' %'), 'Søylediagram der den ene er høyest'), ærlig: svg(søyler([48, 46, 6], ['Oss', 'Dem', 'Vet ikke'], 0, 100, ['#16a34a', '#94a3b8', '#cbd5e1'], 'Foretrekker (%), skala til 100', ' %'), 'Søylediagram med skala til 100'),
      alt: ['48 % er ikke et flertall. Flertall betyr mer enn halvparten, og forskjellen til 46 % er liten', 'Det er for mange søyler', 'Grønn er en uærlig farge', 'Det står prosenttegn'], hva: 'Flertall betyr mer enn 50 %. Her har ingen over halvparten. 48 mot 46 er også en liten forskjell som kan skyldes tilfeldigheter i utvalget.' },
    { tittel: 'Alle liker leksefri skole', påstand: '«Alle elever vil ha leksefri skole!» (spurte 20 elever i fritidsklubben)', gal: svg(søyler([18, 2], ['Ja', 'Nei'], 0, 20, ['#16a34a', '#dc2626'], 'Vil du ha leksefri skole? (n = 20)'), 'Søylediagram med få svar'), ærlig: svg(søyler([120, 130], ['Ja', 'Nei'], 0, 150, ['#16a34a', '#dc2626'], 'Alle elever (n = 250)'), 'Søylediagram med stort utvalg'),
      alt: ['Utvalget er lite og skjevt. Bare noen få fra én gruppe er spurt', 'Søylene har feil rekkefølge', 'Det burde vært en sirkel', 'Svarene er for tydelige'], hva: 'Et godt utvalg er stort nok og ligner på alle det handler om. Spør du bare 20 elever fra fritidsklubben, vet du lite om hele skolen.' }
  );
  FIKS.push(
    ['Vise antallet (1 og 2) i stedet for bare prosenten', 'Gjøre søylene større', 'Bruke en annen farge'],
    ['Velge en akse som passer og vise tydelig hvor den starter', 'Gjøre aksen enda større', 'Fjerne grafen'],
    ['Skrive prosentene for alle og si at ingen har over 50 %', 'Skrive «et stort flertall»', 'Fjerne «Vet ikke»'],
    ['Spørre et tilfeldig utvalg som er stort og ligner på alle elevene', 'Spørre enda færre', 'Bare spørre venner']
  );
  G.add({
    id: 'lognjegeren', tittel: 'Løgnjegeren', ikon: '🕵️', trinn: 9, temaer: ['9/statistikk-media'],
    kort: 'Finn trikset som får statistikken til å lure deg.',
    hvordan: 'Du ser en graf eller et tall fra «media» eller reklame, sammen med en påstand. Finn ut hva som er misvisende. Etter svaret ditt får du se en ærlig versjon av det samme.',
    lærer: 'Å lese statistikk kritisk: avkortede akser, utvalgte tidsperioder, gjennomsnitt som skjuler ekstremverdier, symboler der areal lurer øyet, små utvalg og sammenheng som ikke er det samme som årsak.',
    start: function (el) {
      let rekke, runde = 0, poeng = 0;
      function ny() { rekke = G.shuffle(SC.map((_, i) => i)).slice(0, G.pr(6, 8, 10)); runde = 0; poeng = 0; vis(); }
      function vis() {
        const s = SC[rekke[runde]];
        el.innerHTML = tmpl('<span>Sak ' + (runde + 1) + ' av ' + rekke.length + '</span><span>Poeng: ' + poeng + '</span>', '<em>' + s.påstand + '</em>', '<div class="figur lj-figur">' + s.gal + '</div><p class="sp-spm lesbar">Hva er misvisende her?</p><div class="sp-rad lj-valg lj-kolonne"></div><div class="sp-fb" aria-live="polite"></div><div class="lj-fiks"></div><div class="lj-ærlig"></div><div class="sp-rad lj-nav"></div>');
        const alt = G.niv() === 0 ? s.alt.slice(0, 3) : s.alt;
        if (G.niv() === 0) G.q(el, '.lj-valg').insertAdjacentHTML('beforebegin', '<p class="lesbar lj-tips">💡 Tips: se først på aksene og på hvor mange som er spurt.</p>');
        const si = SC.indexOf(s);
        function ærlig(poengFiks) {
          G.q(el, '.lj-ærlig').innerHTML = '<p class="lesbar"><strong>Før og etter:</strong></p><div class="sp-rad lj-bytt" role="group" aria-label="Velg visning"><button type="button" class="knapp liten lj-b1">Slik den ble vist</button><button type="button" class="knapp liten primær lj-b2">Slik den burde vært</button></div><div class="figur lj-figur lj-vis">' + s.ærlig + '</div>';
          const v = G.q(el, '.lj-vis'), b1 = G.q(el, '.lj-b1'), b2 = G.q(el, '.lj-b2');
          b1.addEventListener('click', () => { v.innerHTML = s.gal; b1.classList.add('primær'); b2.classList.remove('primær'); });
          b2.addEventListener('click', () => { v.innerHTML = s.ærlig; b2.classList.add('primær'); b1.classList.remove('primær'); });
          const slutt = runde + 1 >= rekke.length; G.q(el, '.lj-nav').innerHTML = '<button type="button" class="knapp primær lj-neste">' + (slutt ? 'Se resultatet' : 'Neste sak ▶') + '</button>';
          G.q(el, '.lj-neste').addEventListener('click', () => { runde++; if (runde >= rekke.length) return G.slutt(el, { ikon: '🕵️', tittel: 'Sakene er oppklart!', stjerner: G.stjerner(el, poeng, maks()), tekst: 'Du fikk ' + poeng + ' av ' + maks() + ' poeng.', lær: 'Spør deg selv: Starter aksen på null? Hvilken tidsperiode er vist? Hvor mange er spurt? Er det gjennomsnitt eller median? Er det en sammenheng, eller faktisk en årsak?', igjen: ny }); vis(); });
        }
        G.mc(G.q(el, '.lj-valg'), G.shuffle(alt.map((t, i) => ({ t: t, ok: i === 0 }))), ok => {
          if (ok) poeng++; G.feedback(el, ok, (ok ? 'Godt oppdaget! ' : 'Ikke helt. ') + s.hva);
          if (G.niv() === 0) return ærlig();
          G.q(el, '.lj-fiks').innerHTML = '<p class="sp-spm lesbar"><strong>Fiks den! Hva må til for å gjøre dette ærlig?</strong></p><div class="sp-rad lj-valg2 lj-kolonne"></div><div class="sp-fb2 lesbar" aria-live="polite"></div>';
          G.mc(G.q(el, '.lj-valg2'), G.shuffle(FIKS[si].map((t, i) => ({ t: t, ok: i === 0 }))), ok2 => {
            if (ok2) poeng++; G.q(el, '.sp-fb2').innerHTML = ok2 ? '✅ Ja! Det er riktig måte å rette det på.' : '❌ Riktig fiks: <strong>' + FIKS[si][0] + '</strong>.'; G.q(el, '.sp-fb2').className = 'sp-fb2 lesbar ' + (ok2 ? 'ok' : 'feil'); G.q(el, '.sp-hud').innerHTML = '<span>Sak ' + (runde + 1) + ' av ' + rekke.length + '</span><span>Poeng: ' + poeng + '</span>'; ærlig();
          });
        });
      }
      function maks() { return rekke.length * (G.niv() === 0 ? 1 : 2); }
      ny();
    }
  });

  /* ===================== Prisdetektiven ===================== */
  const PARTY = [['kake', 'brus'], ['sjokolade', 'is'], ['penn', 'viskelær'], ['ball', 'hanske'], ['pizza', 'cola'], ['bok', 'tegneserie']];
  G.add({
    id: 'prisdetektiven', tittel: 'Prisdetektiven', ikon: '🔎', trinn: 10, temaer: ['10/ligningssett'],
    kort: 'To kvitteringer, to ukjente priser. Bruk addisjon eller subtraksjon for å løse saken.',
    hvordan: 'Du får to opplysninger om priser eller tall. Løs saken i tre steg: Først velger du hva som skjer når du trekker likningene fra hverandre (eller legger dem sammen). Så finner du den første ukjente, og til slutt den andre. På Rolig velger du svar hele veien. På Vanlig og Utfordring skriver du selv de to siste stegene (du får to forsøk og hint). På Utfordring får du også sett der du må legge sammen i stedet for å trekke fra.',
    lærer: 'Å løse likningssett med to ukjente ved å legge sammen eller trekke fra likningene slik at den ene ukjente forsvinner, og deretter sette svaret inn i en av likningene for å finne den andre. Til slutt sjekker du i begge likningene.',
    start: function (el) {
      let RUNDER, runde = 0, poeng = 0, p, steg;
      const koef = (a, v) => (a === 1 ? '' : a) + v;
      function lag() {
        const niv = G.niv(), enkel = G.pr(5, 4, 3);
        if (runde < enkel) {
          const a2 = G.rnd(1, niv === 2 ? 4 : 3), d = runde < 2 ? 1 : G.rnd(1, niv === 0 ? 1 : 2), a1 = a2 + d, x = G.rnd(8, G.pr(20, 30, 40)), y = G.rnd(5, G.pr(14, 20, 30)), nav = G.pick(PARTY);
          return { t: 'pris', a1: a1, a2: a2, x: x, y: y, c1: a1 * x + y, c2: a2 * x + y, nav: nav, d: d };
        }
        if (niv === 2 && (runde - enkel) % 2 === 0) { const k = G.rnd(2, 3), x = G.rnd(8, 20), y = G.rnd(3, x - 2); return { t: 'blandet', k: k, x: x, y: y, S: x + y, D: k * x - y }; }
        const x = G.rnd(9, G.pr(16, 20, 30)), y = G.rnd(3, x - 2); return { t: 'tall', x: x, y: y, S: x + y, D: x - y };
      }
      function vis() { p = lag(); steg = 0; visSteg(); }
      function stegDef() {
        const T = p.t;
        if (steg === 0) {
          if (T === 'pris') return { tekst: 'Steg 1 av 3: Hva får du når du <strong>trekker (2) fra (1)</strong>?', mc: [koef(p.d, 'x') + ' = ' + (p.c1 - p.c2), koef(p.a1 + p.a2, 'x') + ' + 2y = ' + (p.c1 + p.c2), koef(p.d, 'x') + ' = ' + (p.c1 + p.c2), koef(p.d, 'x') + ' + y = ' + (p.c1 - p.c2)].map((t, i) => ({ t: t, ok: i === 0 })), fb: 'y-ene forsvinner: (' + koef(p.a1, 'x') + ' + y) − (' + koef(p.a2, 'x') + ' + y) = ' + koef(p.d, 'x') + ', og ' + p.c1 + ' − ' + p.c2 + ' = ' + (p.c1 - p.c2) + '.' };
          if (T === 'tall') return { tekst: 'Steg 1 av 3: Hva får du når du <strong>legger sammen</strong> (1) og (2)?', mc: ['2x = ' + (p.S + p.D), '2y = ' + (p.S + p.D), '2x = ' + (p.S - p.D), 'x = ' + (p.S + p.D) + ' og y = 0'].map((t, i) => ({ t: t, ok: i === 0 })), fb: 'y og −y utligner hverandre: x + x = 2x, og ' + p.S + ' + ' + p.D + ' = ' + (p.S + p.D) + '.' };
          return { tekst: 'Steg 1 av 3: Hva får du når du <strong>legger sammen</strong> (1) og (2)? (Se på fortegnene foran y.)', mc: [(p.k + 1) + 'x = ' + (p.S + p.D), (p.k - 1) + 'x = ' + (p.S + p.D), (p.k + 1) + 'x = ' + (p.S - p.D), (p.k + 1) + 'x + 2y = ' + (p.S + p.D)].map((t, i) => ({ t: t, ok: i === 0 })), fb: 'y og −y utligner hverandre, så du legger sammen: x + ' + koef(p.k, 'x') + ' = ' + (p.k + 1) + 'x, og ' + p.S + ' + ' + p.D + ' = ' + (p.S + p.D) + '.' };
        }
        if (steg === 1) {
          const tekst = 'Steg 2 av 3: Hva er <strong>x</strong>?';
          if (T === 'pris') return { tekst: tekst, fasit: p.x, mcAlt: G.alt(p.x, [p.c1 - p.c2 + 1, p.c1, p.x + 2, p.x - 1]), hint: [koef(p.d, 'x') + ' = ' + (p.c1 - p.c2) + '.', p.d === 1 ? 'Her står det bare x, så svaret står der.' : 'Del begge sider på ' + p.d + '.'], fb: koef(p.d, 'x') + ' = ' + (p.c1 - p.c2) + (p.d === 1 ? '' : ', så x = ' + (p.c1 - p.c2) + ' ÷ ' + p.d) + ' = ' + p.x + '.' };
          if (T === 'tall') return { tekst: tekst, fasit: p.x, mcAlt: G.alt(p.x, [p.S + p.D, p.S, p.x + 2, p.x - 1]), hint: ['Du har 2x = ' + (p.S + p.D) + '.', 'Del begge sider på 2.'], fb: '2x = ' + (p.S + p.D) + ', så x = ' + (p.S + p.D) + ' ÷ 2 = ' + p.x + '.' };
          return { tekst: tekst, fasit: p.x, mcAlt: G.alt(p.x, [p.S + p.D, p.S, p.x + 2, p.x - 1]), hint: ['Du har ' + (p.k + 1) + 'x = ' + (p.S + p.D) + '.', 'Del begge sider på ' + (p.k + 1) + '.'], fb: (p.k + 1) + 'x = ' + (p.S + p.D) + ', så x = ' + (p.S + p.D) + ' ÷ ' + (p.k + 1) + ' = ' + p.x + '.' };
        }
        const tekst = 'Steg 3 av 3: Sett x = ' + p.x + ' inn i (2). Hva er <strong>y</strong>?';
        if (T === 'pris') return { tekst: tekst, fasit: p.y, mcAlt: G.alt(p.y, [p.c2 - p.a2, p.c2, p.y + 2, p.y - 1]), hint: ['(2) er ' + koef(p.a2, 'x') + ' + y = ' + p.c2 + '. Sett inn x = ' + p.x + '.', p.a2 + ' · ' + p.x + ' + y = ' + p.c2 + '. Hva er ' + p.a2 + ' · ' + p.x + '?'], fb: koef(p.a2, 'x') + ' + y = ' + p.c2 + ' gir ' + p.a2 * p.x + ' + y = ' + p.c2 + ', så y = ' + p.y + '. Sjekk i (1): ' + p.a1 * p.x + ' + ' + p.y + ' = ' + p.c1 + ' ✔.' };
        if (T === 'tall') return { tekst: tekst, fasit: p.y, mcAlt: G.alt(p.y, [p.x + p.D, p.x, p.y + 2, p.y - 1]), hint: ['(2) er x − y = ' + p.D + '. Sett inn x = ' + p.x + ': ' + p.x + ' − y = ' + p.D + '.', 'Hva må y være for at ' + p.x + ' − y skal bli ' + p.D + '?'], fb: p.x + ' − y = ' + p.D + ' gir y = ' + p.x + ' − ' + p.D + ' = ' + p.y + '. Sjekk i (1): ' + p.x + ' + ' + p.y + ' = ' + p.S + ' ✔.' };
        return { tekst: 'Steg 3 av 3: Sett x = ' + p.x + ' inn i (1). Hva er <strong>y</strong>?', fasit: p.y, mcAlt: G.alt(p.y, [p.S + p.x, p.S, p.y + 2, p.y - 1]), hint: ['(1) er x + y = ' + p.S + '. Sett inn x = ' + p.x + '.', p.x + ' + y = ' + p.S + '.'], fb: p.x + ' + y = ' + p.S + ' gir y = ' + p.S + ' − ' + p.x + ' = ' + p.y + '. Sjekk i (2): ' + p.k + ' · ' + p.x + ' − ' + p.y + ' = ' + (p.k * p.x - p.y) + ' = ' + p.D + ' ✔.' };
      }
      function visSteg() {
        const d = stegDef(), T = p.t;
        const ekv = T === 'pris' ? '<div class="pd-ekv"><div><strong>(1)</strong> ' + koef(p.a1, 'x') + ' + y = ' + p.c1 + '</div><div><strong>(2)</strong> ' + koef(p.a2, 'x') + ' + y = ' + p.c2 + '</div></div>' : T === 'tall' ? '<div class="pd-ekv"><div><strong>(1)</strong> x + y = ' + p.S + '</div><div><strong>(2)</strong> x − y = ' + p.D + '</div></div>' : '<div class="pd-ekv"><div><strong>(1)</strong> x + y = ' + p.S + '</div><div><strong>(2)</strong> ' + koef(p.k, 'x') + ' − y = ' + p.D + '</div></div>';
        const hist = T === 'pris' ? '<p class="lesbar">Ola kjøper ' + p.a1 + ' ' + p.nav[0] + (p.a1 > 1 ? 'r' : '') + ' og 1 ' + p.nav[1] + ' og betaler ' + p.c1 + ' kr. Mia kjøper ' + p.a2 + ' ' + p.nav[0] + (p.a2 > 1 ? 'r' : '') + ' og 1 ' + p.nav[1] + ' og betaler ' + p.c2 + ' kr. La <strong>x</strong> være prisen på en ' + p.nav[0] + ' og <strong>y</strong> prisen på en ' + p.nav[1] + '.</p>' : T === 'tall' ? '<p class="lesbar">Tallgåten: To tall, x og y, har summen ' + p.S + ' og differansen ' + p.D + '. Finn tallene.</p>' : '<p class="lesbar">Tallgåten: To tall, x og y. Summen er ' + p.S + '. Når du ganger x med ' + p.k + ' og trekker fra y, får du ' + p.D + '. Finn tallene.</p>';
        el.innerHTML = tmpl('<span>Sak ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Poeng: ' + poeng + '</span>', '', hist + ekv + '<p class="sp-spm lesbar">' + d.tekst + '</p><div class="sp-rad pd-valg"></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad pd-nav"></div>');
        const sisteSteg = steg === 2, slutt = sisteSteg && runde + 1 >= RUNDER;
        function etter(ok, pt) {
          poeng += pt; G.q(el, '.sp-hud').innerHTML = '<span>Sak ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Poeng: ' + poeng + '</span>';
          G.feedback(el, ok, (ok ? 'Riktig! ' : 'Ikke helt. ') + d.fb);
          G.q(el, '.pd-nav').innerHTML = '<button type="button" class="knapp primær pd-neste">' + (slutt ? 'Se resultatet' : sisteSteg ? 'Neste sak ▶' : 'Neste steg ▶') + '</button>';
          G.q(el, '.pd-neste').addEventListener('click', () => {
            if (!sisteSteg) { steg++; return visSteg(); }
            runde++; if (runde >= RUNDER) return G.slutt(el, { ikon: '🔎', tittel: 'Saken er oppklart!', stjerner: G.stjerner(el, poeng, RUNDER * 3), tekst: 'Du fikk ' + poeng + ' av ' + (RUNDER * 3) + ' poeng.', lær: 'I et likningssett kan du legge sammen eller trekke fra likningene slik at en av de ukjente forsvinner. Da får du én likning med én ukjent. Så setter du svaret inn for å finne den andre, og sjekker i begge likningene.', igjen: () => { RUNDER = G.pr(5, 6, 7); runde = 0; poeng = 0; vis(); } }); vis();
          });
        }
        if (d.mc) G.mc(G.q(el, '.pd-valg'), d.mc, ok => etter(ok, ok ? 1 : 0));
        else if (G.niv() === 0) G.mc(G.q(el, '.pd-valg'), d.mcAlt, ok => etter(ok, ok ? 1 : 0));
        else G.skriv(el, G.q(el, '.pd-valg'), { fasit: d.fasit, hint: d.hint, ledetekst: 'Svar', fn: (ok, f) => etter(ok, ok ? (f <= 1 ? 1 : .5) : 0) });
      }
      RUNDER = G.pr(5, 6, 7); vis();
    }
  });

  /* ===================== Rente-raketten ===================== */
  G.add({
    id: 'rente-raketten', tittel: 'Rente-raketten', ikon: '🚀', trinn: 10, temaer: ['10/kjop-sparing-lan', '10/vekstfaktor', '10/okonomi-prosjekt'],
    kort: 'Send pengene dine opp med rentesrente, og se hvor fort lån og sparing vokser.',
    hvordan: 'Du får fem oppdrag. I hvert oppdrag er to av tre ting låst (startbeløp, rente, år), og du skal justere den siste glidebryteren så målet nås. Den blå kurven viser rentes rente, den stiplede grå viser enkel rente. Trykk «Sjekk» når du tror du har truffet.',
    lærer: 'Rentes rente og vekstfaktor: saldo = start · (1 + rente)^år. Pengene vokser raskere og raskere, fordi du får renter på rentene. Det gjelder både sparing og lån, så det betaler seg å spare tidlig og å betale ned lån fort.',
    start: function (el) {
      const bel = x => F(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' kr';
      const O = [
        { tekst: 'Du setter inn <strong>10 000 kr</strong> med <strong>5 %</strong> rente. Finn det <strong>minste antall år</strong> du trenger for å nå minst <strong>16 000 kr</strong>.', fast: { s: 10000, r: 5 }, fri: 'ar', mål: 16000, ok: (v, f) => f(v.ar) >= 16000 && f(v.ar - 1) < 16000, fasit: 10, tips: '1,05^10 ≈ 1,63, så 10 000 · 1,63 ≈ 16 289.' },
        { tekst: 'Du setter inn <strong>8 000 kr</strong> i <strong>10 år</strong>. Finn en rente slik at du ender på <strong>mellom 12 000 og 13 000 kr</strong>.', fast: { s: 8000, ar: 10 }, fri: 'r', mål: 12000, mål2: 13000, ok: (v, f) => f(v.ar) >= 12000 && f(v.ar) <= 13000, fasit: 4.5, tips: 'Vekstfaktoren må være mellom 1,5^(1/10) ≈ 1,041 og 1,625^(1/10) ≈ 1,050, altså mellom ca. 4,1 % og 5,0 % rente.' },
        { tekst: 'Renten er <strong>3 %</strong>, og du sparer i <strong>20 år</strong>. Hvor mye må du sette inn i starten for å ha <strong>minst 30 000 kr</strong>, uten å sette av mer enn nødvendig (maks 33 000 kr til slutt)?', fast: { r: 3, ar: 20 }, fri: 's', mål: 30000, mål2: 33000, ok: (v, f) => f(v.ar) >= 30000 && f(v.ar) <= 33000, fasit: 17000, tips: '1,03^20 ≈ 1,806. Du trenger start · 1,806 ≥ 30 000, altså start ≥ 16 600.' },
        { tekst: 'Du setter inn <strong>5 000 kr</strong> med <strong>6 %</strong> rente. Finn det <strong>minste antall år</strong> til du har minst <strong>20 000 kr</strong> (fire ganger så mye).', fast: { s: 5000, r: 6 }, fri: 'ar', mål: 20000, ok: (v, f) => f(v.ar) >= 20000 && f(v.ar - 1) < 20000, fasit: 24, tips: '1,06^24 ≈ 4,05, og 1,06^23 ≈ 3,82. Da må du vente 24 år.' },
        { tekst: '⚠️ <strong>Lån:</strong> Du låner <strong>50 000 kr</strong> med <strong>8 %</strong> rente og betaler ikke ned noe. Etter hvor mange år har gjelden <strong>passert 100 000 kr</strong> (minste antall år)?', fast: { s: 50000, r: 8 }, fri: 'ar', mål: 100000, ok: (v, f) => f(v.ar) >= 100000 && f(v.ar - 1) < 100000, fasit: 10, tips: '1,08^9 ≈ 1,999 (nesten dobbelt), og 1,08^10 ≈ 2,159. Gjeld vokser akkurat som sparing, bare mot deg.' },
        { tekst: 'Du setter inn <strong>20 000 kr</strong> med <strong>4 %</strong> rente. Finn det <strong>minste antall år</strong> til du har minst <strong>30 000 kr</strong> (halvannen gang så mye).', fast: { s: 20000, r: 4 }, fri: 'ar', mål: 30000, ok: (v, f) => f(v.ar) >= 30000 && f(v.ar - 1) < 30000, fasit: 11, tips: '1,04^10 ≈ 1,480, som gir 29 605 kr: litt for lite. 1,04^11 ≈ 1,539 gir 30 787 kr. Da må du vente 11 år.' },
        { tekst: 'Du setter inn <strong>10 000 kr</strong> i <strong>20 år</strong>. Finn en rente slik at pengene <strong>dobler seg</strong> (mellom 20 000 og 22 000 kr).', fast: { s: 10000, ar: 20 }, fri: 'r', mål: 20000, mål2: 22000, ok: (v, f) => f(v.ar) >= 20000 && f(v.ar) <= 22000, fasit: 3.8, tips: 'Vekstfaktoren må være mellom 2^(1/20) ≈ 1,0353 og 2,2^(1/20) ≈ 1,0402, altså fra ca. 3,6 % til 4,0 % rente.' }
      ];
      let nr = 0, poeng = 0, v, flyttet, har;
      const SL = { s: ['Startbeløp', 1000, 30000, 500, ' kr'], r: ['Rente', 1, 10, .1, ' %'], ar: ['Antall år', 1, 30, 1, ' år'] };
      function vis() {
        const o = O[nr]; v = Object.assign({ s: 10000, r: 5, ar: 5 }, o.fast); v[o.fri] = o.fri === 'ar' ? 5 : o.fri === 'r' ? 2 : 5000; flyttet = false; har = false;
        el.innerHTML = tmpl('<span>Oppdrag ' + (nr + 1) + ' av ' + O.length + '</span><span>Poeng: ' + poeng + '</span>', o.tekst,
          (o.fri !== 's' ? '<div class="rr-gjett"><p class="lesbar"><strong>🤔 Gjett først, før du bruker glidebryteren:</strong> hva tror du <em>' + (o.fri === 'ar' ? 'antall år' : 'renten') + '</em> må bli?</p><div class="sp-rad rr-g"></div><div class="rr-gfb lesbar" aria-live="polite"></div></div>' : '') + '<div class="figur"><svg viewBox="0 0 440 230" class="rr-svg" role="img" aria-label="Graf over saldo med rentes rente og enkel rente"></svg></div><div class="rr-lest lesbar" aria-live="polite"></div>' +
          ['s', 'r', 'ar'].map(k => '<div class="sp-slider"><label for="rr-' + k + '">' + SL[k][0] + (o.fri === k ? '' : ' (låst)') + ' <span class="rr-v-' + k + '"></span></label><input id="rr-' + k + '" type="range" min="' + SL[k][1] + '" max="' + SL[k][2] + '" step="' + SL[k][3] + '" value="' + v[k] + '"' + (o.fri === k ? '' : ' disabled') + '></div>').join('') +
          '<div class="sp-rad"><button type="button" class="knapp primær rr-sjekk">🚀 Sjekk</button><button type="button" class="knapp liten rr-eks">💡 Se løsningen</button></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad rr-nav"></div>');
        const s = G.q(el, '#rr-' + o.fri); s.addEventListener('input', () => { v[o.fri] = +s.value; flyttet = true; tegn(); });
        if (o.fri !== 's') {
          const fa = o.fasit, fm = o.fri === 'ar' ? (x => F(x) + ' år') : (x => F(x) + ' %');
          const alt = o.fri === 'ar' ? [fa * 2, Math.max(2, Math.round(fa / 2)), fa + 6] : [fa * 2, Math.max(1, R(fa / 2, 1)), fa + 3];
          G.mc(G.q(el, '.rr-g'), G.alt(fa, alt, fm), (ok, i) => { G.q(el, '.rr-gfb').innerHTML = (ok ? '👍 Godt gjettet! ' : '🙂 Det var en grei start. ') + 'Bruk glidebryteren og se hvor nær du var. Rentes rente vokser fortere enn de fleste tror.'; });
        }
        G.q(el, '.rr-sjekk').addEventListener('click', sjekk); G.q(el, '.rr-eks').addEventListener('click', eks); tegn();
      }
      const saldo = (n) => v.s * Math.pow(1 + v.r / 100, n);
      function tegn() {
        const o = O[nr], maks = Math.max(saldo(30), (o.mål2 || o.mål) * 1.1), X = n => 50 + n / 30 * 370, Y = y => 200 - y / maks * 180;
        let g = ''; for (let i = 0; i <= 4; i++) { const y = maks * i / 4; g += '<line x1="50" x2="420" y1="' + Y(y) + '" y2="' + Y(y) + '" stroke="#e2e8f0"/><text x="46" y="' + (Y(y) + 4) + '" text-anchor="end" font-size="10" fill="#52617a">' + F(Math.round(y / 1000)) + 'k</text>'; }
        for (let n = 0; n <= 30; n += 5) g += '<text x="' + X(n) + '" y="220" text-anchor="middle" font-size="11">' + n + ' år</text>';
        g += '<line x1="50" x2="420" y1="' + Y(o.mål) + '" y2="' + Y(o.mål) + '" stroke="#16a34a" stroke-width="2" stroke-dasharray="6 4"/><text x="422" y="' + (Y(o.mål) + 4) + '" font-size="10" fill="#15803d">mål</text>';
        if (o.mål2) g += '<line x1="50" x2="420" y1="' + Y(o.mål2) + '" y2="' + Y(o.mål2) + '" stroke="#16a34a" stroke-width="2" stroke-dasharray="6 4"/>';
        let pk = '', pe = ''; for (let n = 0; n <= 30; n++) { pk += X(n) + ',' + Y(saldo(n)) + ' '; pe += X(n) + ',' + Y(v.s * (1 + v.r / 100 * n)) + ' '; }
        g += '<polyline fill="none" stroke="#9ca3af" stroke-width="2" stroke-dasharray="4 4" points="' + pe + '"/><polyline fill="none" stroke="#2563eb" stroke-width="3.5" points="' + pk + '"/><circle cx="' + X(v.ar) + '" cy="' + Y(saldo(v.ar)) + '" r="7" fill="#f97316" stroke="#fff" stroke-width="2"/><text x="' + X(v.ar) + '" y="' + (Y(saldo(v.ar)) - 12) + '" text-anchor="' + (v.ar > 22 ? 'end' : 'middle') + '" font-size="18">🚀</text>';
        G.q(el, '.rr-svg').innerHTML = g; ['s', 'r', 'ar'].forEach(k => G.q(el, '.rr-v-' + k).textContent = '= ' + (k === 's' ? bel(v[k]) : F(v[k]) + SL[k][4]));
        G.q(el, '.rr-lest').innerHTML = 'Etter <strong>' + v.ar + ' år</strong> er saldoen <strong>' + bel(saldo(v.ar)) + '</strong>. Med enkel rente (grå) ville den vært ' + bel(v.s * (1 + v.r / 100 * v.ar)) + '.';
      }
      function sjekk() {
        const o = O[nr], f = n => saldo(n); if (!flyttet) return G.feedback(el, false, 'Flytt på glidebryteren først, og se hva som skjer med kurven. 🙂'); har = true;
        if (o.ok(v, f)) { poeng++; G.feedback(el, true, 'Mål nådd! 🎉 Saldoen er ' + bel(saldo(v.ar)) + '. Formelen er saldo = start · (1 + r)^år = ' + v.s + ' · ' + F(R(1 + v.r / 100, 3)) + '^' + v.ar + '. ' + o.tips); ferdig(); }
        else G.feedback(el, false, 'Ikke helt. Saldoen er ' + bel(saldo(v.ar)) + (saldo(v.ar) < o.mål ? ', som er for lite.' : o.mål2 && saldo(v.ar) > o.mål2 ? ', som er for mye.' : ', og du kan nå målet på færre år.') + ' Prøv igjen.');
      }
      function eks() { if (!har) return G.feedback(el, false, 'Prøv først, og trykk «Sjekk». Så kan du få se løsningen. 🙂'); G.feedback(el, true, 'En løsning: ' + SL[O[nr].fri][0].toLowerCase() + ' = ' + (O[nr].fri === 's' ? bel(O[nr].fasit) : F(O[nr].fasit) + SL[O[nr].fri][4]) + '. ' + O[nr].tips); ferdig(); }
      function ferdig() {
        const rad = G.q(el, '.rr-nav'); if (rad.children.length) return; rad.innerHTML = '<button type="button" class="knapp primær rr-neste">' + (nr + 1 >= O.length ? 'Se resultatet' : 'Neste oppdrag ▶') + '</button>';
        G.q(el, '.rr-neste').addEventListener('click', () => { nr++; if (nr >= O.length) return G.slutt(el, { ikon: '🚀', tittel: 'Lift-off!', stjerner: G.stjerner(el, poeng, O.length), tekst: 'Du klarte ' + poeng + ' av ' + O.length + ' oppdrag på første riktige svar.', lær: 'Saldo = start · (1 + rente)^år. Vekstfaktoren 1,05 betyr 5 % økning per år. Rentes rente gjør at kurven bøyer oppover, mens enkel rente er en rett linje.', igjen: () => { nr = 0; poeng = 0; vis(); } }); vis(); });
      }
      vis();
    }
  });

  /* ===================== Feiljegeren ===================== */
  function feil(id, tittel, trinn, temaer, kort, lærer, saker) {
    G.add({
      id: id, tittel: tittel, ikon: '🐞', trinn: trinn, temaer: temaer, kort: kort,
      hvordan: 'Du ser en utregning med flere steg. Trykk på linja der den første feilen er. På Rolig er det alltid en feil, og du får tips om hva du bør se etter. På Vanlig og Utfordring kan utregningen også være helt riktig (trykk da «Ingen feil»), og når du har funnet feilen må du også velge hva som er riktig utregning. Etterpå får du se hva som er riktig, og hvorfor.',
      lærer: lærer,
      start: function (el) {
        let rekke, runde = 0, poeng = 0, RUNDER, maks;
        function ny() {
          RUNDER = G.pr(6, 7, 8); const niv = G.niv(), med = saker.filter(s => s.feil >= 0), uten = saker.filter(s => s.feil < 0);
          if (niv === 0) rekke = G.shuffle(med).slice(0, RUNDER);
          else { const nUten = Math.min(uten.length, niv === 1 ? 1 : 2); rekke = G.shuffle(G.shuffle(med).slice(0, RUNDER - nUten).concat(G.shuffle(uten).slice(0, nUten))); }
          maks = rekke.reduce((s, x) => s + (x.feil >= 0 && niv > 0 ? 2 : 1), 0); runde = 0; poeng = 0; vis();
        }
        function hud() { return '<span>Utregning ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Poeng: ' + poeng + '</span>'; }
        function vis() {
          const s = rekke[runde], niv = G.niv();
          el.innerHTML = tmpl(hud(), 'Finn linja med den første feilen.' + (niv > 0 ? ' Er alt riktig, trykk «Ingen feil».' : ''),
            (niv === 0 ? '<p class="lesbar fj-tips">💡 Tips: sjekk fortegn (+ og −), regnerekkefølge og at du har gjort det samme på begge sider.</p>' : '') +
            '<div class="fj-oppg">' + s.oppg + '</div><div class="fj-linjer" role="group" aria-label="Steg i utregningen">' + s.steg.map((t, i) => '<button type="button" class="fj-linje" data-i="' + i + '">' + t + '</button>').join('') + '</div>' + (niv > 0 ? '<div class="sp-rad"><button type="button" class="knapp liten fj-ingen">✅ Ingen feil, alt stemmer</button></div>' : '') + '<div class="sp-fb" aria-live="polite"></div><div class="fj-fiks"></div><div class="sp-rad fj-nav"></div>');
          const bs = el.querySelectorAll('.fj-linje'), ingen = G.q(el, '.fj-ingen');
          function svar(i) {
            const ok = i === s.feil; bs.forEach(x => x.disabled = true); if (ingen) ingen.disabled = true;
            if (s.feil >= 0) bs[s.feil].classList.add('rett'); if (!ok && i >= 0) bs[i].classList.add('feil');
            if (ok) poeng++;
            const tekst = s.feil < 0 ? (ok ? 'Riktig! Her er alt riktig. Det er lurt å sjekke hvert steg før du leter etter feil. ✅' : 'Her var ingen feil. Linje ' + (i + 1) + ' stemmer: sjekk den en gang til, steg for steg.') : (ok ? 'Bra jakt! ' : (i < 0 ? 'Det var en feil her. ' : 'Ikke den. ') + 'Den første feilen er i linje ' + (s.feil + 1) + '. ') + s.hva;
            G.feedback(el, ok, tekst + (s.feil >= 0 ? ' Riktig: <strong>' + s.rett + '</strong>' : ''));
            G.q(el, '.sp-hud').innerHTML = hud();
            if (ok && s.feil >= 0 && niv > 0) return fiks(s); neste();
          }
          bs.forEach(b => b.addEventListener('click', () => svar(+b.dataset.i)));
          if (ingen) ingen.addEventListener('click', () => svar(-1));
        }
        function fiks(s) {
          const alt = G.shuffle([{ t: s.rett, ok: true }].concat(s.galne.map(t => ({ t: t, ok: false }))));
          G.q(el, '.fj-fiks').innerHTML = '<p class="sp-spm lesbar"><strong>Fiks den!</strong> Hva er riktig utregning?</p><div class="sp-rad fj-valg fj-kolonne"></div><div class="sp-fb2 lesbar" aria-live="polite"></div>';
          G.mc(G.q(el, '.fj-valg'), alt, ok => {
            if (ok) poeng++; const f = G.q(el, '.sp-fb2'); f.className = 'sp-fb2 lesbar ' + (ok ? 'ok' : 'feil'); f.innerHTML = ok ? '✅ Ja, slik skal det være.' : '❌ Riktig er: <strong>' + s.rett + '</strong>.';
            G.q(el, '.sp-hud').innerHTML = hud(); neste();
          });
        }
        function neste() {
          const slutt = runde + 1 >= RUNDER; G.q(el, '.fj-nav').innerHTML = '<button type="button" class="knapp primær fj-neste">' + (slutt ? 'Se resultatet' : 'Neste ▶') + '</button>';
          G.q(el, '.fj-neste').addEventListener('click', () => { runde++; if (runde >= RUNDER) return G.slutt(el, { ikon: '🐞', tittel: 'Feilfri jakt!', stjerner: G.stjerner(el, poeng, maks), tekst: 'Du fikk ' + poeng + ' av ' + maks + ' poeng.', lær: lærer, igjen: ny }); vis(); });
        }
        ny();
      }
    });
  }
  feil('feiljegeren-8', 'Feiljegeren', 8, ['8/regneregler', '8/potenser', '8/negative-tall', '8/uttrykk', '8/ligninger', '8/kvadratrot'],
    'Finn feilen i utregningen. Hvilket steg gikk galt? Og er det i det hele tatt en feil?',
    'Å oppdage vanlige feil: regnerekkefølge, potenser, minus og minus, å slå sammen ledd som ikke er like, å løse ligninger og kvadratrøtter. Den som kan finne feil i andres utregninger, gjør færre feil selv.',
    [
      { oppg: 'Regn ut 4 + 3 · 5', steg: ['= 7 · 5', '= 35'], feil: 0, hva: 'Gange regnes før pluss.', rett: '4 + 3 · 5 = 4 + 15 = 19', galne: ['4 + 3 · 5 = 7 · 5 = 35', '4 + 3 · 5 = 12 + 5 = 17'] },
      { oppg: 'Regn ut 2³', steg: ['= 2 · 3', '= 6'], feil: 0, hva: '2³ betyr at du ganger 2 med seg selv 3 ganger, ikke at du ganger 2 med 3.', rett: '2³ = 2 · 2 · 2 = 8', galne: ['2³ = 2 · 3 = 6', '2³ = 2 + 2 + 2 = 6'] },
      { oppg: 'Forenkle 3x + 2x + 4', steg: ['= 5x + 4', '= 9x'], feil: 1, hva: 'x-ledd og tall er ikke like ledd og kan ikke slås sammen.', rett: '3x + 2x + 4 = 5x + 4 (ferdig)', galne: ['3x + 2x + 4 = 9x', '3x + 2x + 4 = 5x² + 4'] },
      { oppg: 'Regn ut 5 − (−2)', steg: ['= 5 − 2', '= 3'], feil: 0, hva: 'Minus et negativt tall blir pluss.', rett: '5 − (−2) = 5 + 2 = 7', galne: ['5 − (−2) = 5 − 2 = 3', '5 − (−2) = −7'] },
      { oppg: 'Løs 2x + 3 = 11', steg: ['2x = 11 + 3', '2x = 14', 'x = 7'], feil: 0, hva: 'Når du flytter +3 over til den andre siden, må du trekke fra 3 (gjør det motsatte).', rett: '2x = 11 − 3 = 8, så x = 4', galne: ['2x = 11 + 3 = 14, så x = 7', '2x = 8, så x = 6'] },
      { oppg: 'Regn ut (−3)²', steg: ['= −3 · 2', '= −6'], feil: 0, hva: 'Opphøyd i 2 betyr å gange tallet med seg selv, ikke med 2.', rett: '(−3)² = (−3) · (−3) = 9', galne: ['(−3)² = −3 · 2 = −6', '(−3)² = −9'] },
      { oppg: 'Forenkle 2(x + 4) + 3x', steg: ['= 2x + 4 + 3x', '= 5x + 4'], feil: 0, hva: 'Tallet utenfor parentesen skal ganges med begge leddene inni.', rett: '2(x + 4) + 3x = 2x + 8 + 3x = 5x + 8', galne: ['2(x + 4) + 3x = 2x + 4 + 3x = 5x + 4', '2(x + 4) + 3x = 5x + 8x = 13x'] },
      { oppg: 'Regn ut 10 − 4 − 3', steg: ['= 10 − 1', '= 9'], feil: 0, hva: 'Du regner fra venstre mot høyre: først 10 − 4.', rett: '10 − 4 − 3 = 6 − 3 = 3', galne: ['10 − 4 − 3 = 10 − 1 = 9', '10 − 4 − 3 = 7 − 3 = 4'] },
      { oppg: 'Forenkle x² · x³', steg: ['= x^(2 · 3)', '= x⁶'], feil: 0, hva: 'Når du ganger potenser med samme grunntall, legger du sammen eksponentene.', rett: 'x² · x³ = x²⁺³ = x⁵', galne: ['x² · x³ = x⁶', 'x² · x³ = 2x⁵'] },
      { oppg: 'Regn ut √16 + √9', steg: ['= √25', '= 5'], feil: 0, hva: 'Du kan ikke slå sammen under rottegnet på den måten. Regn ut hver rot for seg.', rett: '√16 + √9 = 4 + 3 = 7', galne: ['√16 + √9 = √25 = 5', '√16 + √9 = 4 · 3 = 12'] },
      { oppg: 'Løs x ÷ 3 = 4', steg: ['x = 4 − 3', 'x = 1'], feil: 0, hva: 'Det motsatte av å dele på 3 er å gange med 3.', rett: 'x = 4 · 3 = 12', galne: ['x = 4 − 3 = 1', 'x = 4 ÷ 3 ≈ 1,3'] },
      { oppg: 'Regn ut 6 + 4 · 3 − 5', steg: ['= 6 + 12 − 5', '= 18 − 5', '= 15'], feil: 2, hva: '18 − 5 er 13, ikke 15. De første stegene er riktige.', rett: '6 + 4 · 3 − 5 = 6 + 12 − 5 = 13', galne: ['6 + 4 · 3 − 5 = 10 · 3 − 5 = 25', '6 + 4 · 3 − 5 = 18 − 5 = 15'] },
      { oppg: 'Løs 3x − 5 = 10', steg: ['3x = 10 + 5', '3x = 15', 'x = 15 − 3', 'x = 12'], feil: 2, hva: 'Når du har 3x = 15, må du dele på 3 (motsatt av å gange), ikke trekke fra 3.', rett: 'x = 15 ÷ 3 = 5', galne: ['x = 15 · 3 = 45', 'x = 15 + 3 = 18'] },
      { oppg: 'Regn ut (−4) · (−3)', steg: ['= −(4 · 3)', '= −12'], feil: 0, hva: 'Minus ganger minus gir pluss.', rett: '(−4) · (−3) = 12', galne: ['(−4) · (−3) = −12', '(−4) · (−3) = −7'] },
      { oppg: 'Forenkle 4x − 7x + 2', steg: ['= (4 − 7)x + 2', '= −3x + 2', '= −5x'], feil: 2, hva: 'x-ledd og tallet 2 er ikke like ledd, og kan ikke slås sammen.', rett: '4x − 7x + 2 = −3x + 2 (ferdig)', galne: ['4x − 7x + 2 = −5x', '4x − 7x + 2 = 3x + 2'] },
      { oppg: 'Regn ut 2² + 3²', steg: ['= 2 · 2 + 3 · 3', '= 4 + 9', '= 5²', '= 25'], feil: 2, hva: 'Du kan ikke legge sammen grunntallene og beholde potensen. Svaret på 4 + 9 er 13.', rett: '2² + 3² = 4 + 9 = 13', galne: ['2² + 3² = (2 + 3)² = 25', '2² + 3² = 2 · 2 + 3 · 3 = 10'] },
      { oppg: 'Løs x − 7 = 3', steg: ['x = 3 − 7', 'x = −4'], feil: 0, hva: 'Det motsatte av å trekke fra 7 er å legge til 7 på begge sider.', rett: 'x = 3 + 7 = 10', galne: ['x = 3 − 7 = −4', 'x = 7 − 3 = 4'] },
      { oppg: 'Regn ut 3 + 2 · (4 − 1)', steg: ['= 3 + 2 · 3', '= 5 · 3', '= 15'], feil: 1, hva: 'Gange regnes før pluss: 2 · 3 = 6, og først etterpå legger du til 3.', rett: '3 + 2 · 3 = 3 + 6 = 9', galne: ['3 + 2 · 3 = 5 · 3 = 15', '3 + 2 · 3 = 3 + 5 = 8'] },
      { oppg: 'Regn ut (−2)³', steg: ['= (−2) · (−2) · (−2)', '= 4 · (−2)', '= 8'], feil: 2, hva: '4 · (−2) er −8. Pluss ganger minus gir minus.', rett: '(−2)³ = 4 · (−2) = −8', galne: ['(−2)³ = 8', '(−2)³ = −6'] },
      { oppg: 'Løs 4(x − 2) = 12', steg: ['4x − 2 = 12', '4x = 14', 'x = 3,5'], feil: 0, hva: 'Husk å gange 4 med begge leddene i parentesen: 4 · x og 4 · 2.', rett: '4x − 8 = 12, 4x = 20, x = 5', galne: ['4x − 2 = 12, x = 3,5', '4x − 8 = 12, x = 2,5'] },
      { oppg: 'Regn ut 20 − (5 − 2)', steg: ['= 20 − 5 − 2', '= 13'], feil: 0, hva: 'Minus foran en parentes gjelder hele parentesen. Regn først ut det inni: 5 − 2 = 3.', rett: '20 − (5 − 2) = 20 − 3 = 17', galne: ['20 − (5 − 2) = 20 − 5 − 2 = 13', '20 − (5 − 2) = 15 − 2 = 13'] },
      { oppg: 'Regn ut −3 + (−5)', steg: ['= −3 − 5', '= −8'], feil: -1, hva: '', rett: '', galne: [] },
      { oppg: 'Forenkle 2(x + 3) − x', steg: ['= 2x + 6 − x', '= x + 6'], feil: -1, hva: '', rett: '', galne: [] },
      { oppg: 'Regn ut √49 − √16', steg: ['= 7 − 4', '= 3'], feil: -1, hva: '', rett: '', galne: [] },
      { oppg: 'Løs 5x = 20', steg: ['x = 20 ÷ 5', 'x = 4'], feil: -1, hva: '', rett: '', galne: [] },
      { oppg: 'Regn ut 3 · 4 + 2 · 5', steg: ['= 12 + 10', '= 22'], feil: -1, hva: '', rett: '', galne: [] }
    ]);
  feil('feiljegeren-10', 'Feiljegeren: algebra', 10, ['10/algebra', '10/kvadratsetninger', '10/vekstfaktor', '10/ligningssett', '10/stigningstall'],
    'Finn feilen i utregningene fra algebra, kvadratsetninger og vekstfaktor. Og er det i det hele tatt en feil?',
    'Å oppdage typiske feil: å glemme det doble produktet i kvadratsetningene, å bruke feil vekstfaktor, å faktorisere feil, å regne feil på stigningstall og å glemme negative løsninger.',
    [
      { oppg: 'Utvid (x + 3)²', steg: ['= x² + 3²', '= x² + 9'], feil: 0, hva: 'Du må huske det doble produktet: (a + b)² = a² + 2ab + b².', rett: '(x + 3)² = x² + 6x + 9', galne: ['(x + 3)² = x² + 9', '(x + 3)² = x² + 3x + 9'] },
      { oppg: 'Utvid (x − 4)²', steg: ['= x² − 2 · x · 4 + 4²', '= x² − 8x − 16'], feil: 1, hva: '4² = +16. Siste ledd i (a − b)² er alltid pluss b².', rett: '(x − 4)² = x² − 8x + 16', galne: ['(x − 4)² = x² − 8x − 16', '(x − 4)² = x² − 16'] },
      { oppg: 'Utvid (x + 5)(x − 5)', steg: ['= x² − 5²', '= x² + 25'], feil: 1, hva: 'Konjugatsetningen gir x² − 25, og 5² trekkes fra.', rett: '(x + 5)(x − 5) = x² − 25', galne: ['(x + 5)(x − 5) = x² + 25', '(x + 5)(x − 5) = x² − 10x − 25'] },
      { oppg: 'En pris på 800 kr øker med 15 %. Finn ny pris.', steg: ['Vekstfaktor = 0,15', 'Ny pris = 800 · 0,15 = 120 kr'], feil: 0, hva: 'Vekstfaktoren ved 15 % økning er 1 + 0,15 = 1,15.', rett: 'Ny pris = 800 · 1,15 = 920 kr', galne: ['Ny pris = 800 · 0,15 = 120 kr', 'Ny pris = 800 · 0,85 = 680 kr'] },
      { oppg: 'En verdi faller med 20 %. Finn vekstfaktoren.', steg: ['Vekstfaktor = 1 + 0,20', 'Vekstfaktor = 1,20'], feil: 0, hva: 'Ved nedgang trekker du prosenten fra 1.', rett: 'Vekstfaktor = 1 − 0,20 = 0,80', galne: ['Vekstfaktor = 1,20', 'Vekstfaktor = 0,20'] },
      { oppg: 'Løs x + y = 10 og x − y = 2', steg: ['Legg sammen: 2x = 10 − 2', '2x = 8', 'x = 4'], feil: 0, hva: 'Når du legger sammen likningene, legger du sammen høyresidene: 10 + 2.', rett: '2x = 10 + 2 = 12, så x = 6', galne: ['2x = 10 − 2 = 8, så x = 4', '2x = 12, så x = 12'] },
      { oppg: 'Stigningstall for punktene (1, 3) og (3, 11)', steg: ['a = Δx / Δy = (3 − 1) / (11 − 3)', 'a = 2 / 8 = 0,25'], feil: 0, hva: 'Stigningstallet er endring i y delt på endring i x.', rett: 'a = Δy / Δx = (11 − 3) / (3 − 1) = 4', galne: ['a = (3 − 1) / (11 − 3) = 0,25', 'a = (11 + 3) / (3 + 1) = 3,5'] },
      { oppg: 'Faktoriser 6x + 9', steg: ['= 3 · (2x + 9)', '= 6x + 27'], feil: 0, hva: 'Når du setter 3 utenfor, må du dele begge leddene på 3: 9 ÷ 3 = 3.', rett: '6x + 9 = 3(2x + 3)', galne: ['6x + 9 = 3(2x + 9)', '6x + 9 = 6(x + 9)'] },
      { oppg: 'Utvid (2x)³', steg: ['= 2 · x³', '= 2x³'], feil: 0, hva: 'Hele parentesen opphøyes, også tallet 2: 2³ = 8.', rett: '(2x)³ = 8x³', galne: ['(2x)³ = 2x³', '(2x)³ = 6x³'] },
      { oppg: 'Løs x² = 49', steg: ['x = √49', 'x = 7 (og ingen andre løsninger)'], feil: 1, hva: 'Både 7 og −7 gir 49 når du kvadrerer.', rett: 'x = 7 eller x = −7', galne: ['x = 7 (bare én løsning)', 'x = 24,5'] },
      { oppg: 'Verdien 2000 kr øker 5 % per år i 3 år. Hva er verdien etter 3 år?', steg: ['Vekstfaktor = 1,05', 'Verdi = 2000 · 1,05 · 3', 'Verdi = 6300 kr'], feil: 1, hva: 'Når veksten gjentas, bruker du potens: vekstfaktoren 1,05 opphøyd i 3, ikke gange med 3.', rett: 'Verdi = 2000 · 1,05³ ≈ 2315 kr', galne: ['Verdi = 2000 · 1,05 · 3 = 6300 kr', 'Verdi = 2000 · 1,15 = 2300 kr'] },
      { oppg: 'Løs 2x + y = 11 og x + y = 7', steg: ['Trekk fra: (2x + y) − (x + y) = 11 − 7', 'x = 4', 'y = 7 + 4 = 11'], feil: 2, hva: 'Sett x = 4 inn i x + y = 7, og trekk fra: y = 7 − 4.', rett: 'y = 7 − 4 = 3', galne: ['y = 7 + 4 = 11', 'y = 11 − 4 = 7'] },
      { oppg: 'Stigningstall for (2, 5) og (6, 13)', steg: ['a = (13 − 5) / (6 − 2)', 'a = 8 / 4', 'a = 4'], feil: 2, hva: '8 delt på 4 er 2, ikke 4.', rett: 'a = 8 ÷ 4 = 2', galne: ['a = 4', 'a = 0,5'] },
      { oppg: 'Faktoriser x² − 9', steg: ['= x² − 3²', '= (x − 3)(x − 3)'], feil: 1, hva: 'Det er konjugatsetningen: a² − b² = (a + b)(a − b), med ett pluss og ett minus.', rett: 'x² − 9 = (x + 3)(x − 3)', galne: ['x² − 9 = (x − 3)(x − 3)', 'x² − 9 = (x + 3)(x + 3)'] },
      { oppg: 'Finn f(−2) når f(x) = x² + 1', steg: ['f(−2) = −2² + 1', '= −4 + 1', '= −3'], feil: 0, hva: 'Du setter inn −2 i parentes: (−2)² = 4, ikke −4.', rett: 'f(−2) = (−2)² + 1 = 4 + 1 = 5', galne: ['f(−2) = −2² + 1 = −3', 'f(−2) = −4 + 1 = 3'] },
      { oppg: 'Prisen øker 10 %, og så faller den 10 %. Hva er samlet endring?', steg: ['Vekstfaktorene er 1,10 og 0,90', 'Samlet: 1,10 · 0,90 = 0,99', 'Prisen er tilbake til start'], feil: 2, hva: 'Vekstfaktoren 0,99 betyr en nedgang på 1 %. Prisen er ikke helt tilbake.', rett: 'Samlet vekstfaktor 0,99 gir en nedgang på 1 %', galne: ['Prisen er uendret', 'Prisen har gått opp 1 %'] },
      { oppg: 'Løs 3x + y = 12 når y = 2x − 3', steg: ['3x + (2x − 3) = 12', '5x − 3 = 12', '5x = 9', 'x = 1,8'], feil: 2, hva: 'Du må legge til 3 på begge sider: 12 + 3 = 15, ikke 12 − 3.', rett: '5x = 15, så x = 3', galne: ['5x = 9, så x = 1,8', '5x = 15, så x = 75'] },
      { oppg: 'Utvid (3x + 2)²', steg: ['= (3x)² + 2 · 3x · 2 + 2²', '= 9x² + 12x + 4'], feil: -1, hva: '', rett: '', galne: [] },
      { oppg: 'En vare koster 500 kr og går ned 30 %. Finn ny pris.', steg: ['Vekstfaktor = 1 − 0,30 = 0,70', 'Ny pris = 500 · 0,70 = 350 kr'], feil: -1, hva: '', rett: '', galne: [] },
      { oppg: 'Løs x² − 16 = 0', steg: ['x² = 16', 'x = 4 eller x = −4'], feil: -1, hva: '', rett: '', galne: [] },
      { oppg: 'Finn f(4) når f(x) = 3x − 2', steg: ['f(4) = 3 · 4 − 2', '= 12 − 2', '= 10'], feil: -1, hva: '', rett: '', galne: [] }
    ]);

  /* ===================== Skyggemåleren ===================== */
  G.add({
    id: 'skyggemaaleren', tittel: 'Skyggemåleren', ikon: '🌳', trinn: 9, temaer: ['9/formlikhet-praksis'],
    kort: 'Mål høyden på et tre, en flaggstang eller et hus ved hjelp av skygger.',
    hvordan: 'Sola står likt for alle ting. Du kjenner høyden og skyggen til én ting, og skyggen til noe høyere. Finn den ukjente høyden (eller skyggen). Tegningen viser de to trekantene. Velg riktig svar. På Vanlig og Utfordring skriver du svaret selv i de siste oppgavene, og skalafaktoren kan være et desimaltall.',
    lærer: 'Formlikhet: to trekanter med samme vinkler er formlike, og sidene har samme forhold. Høyde ÷ skygge er like for begge, så du kan regne ut en høyde du ikke kan måle. Det er ofte feil å legge til det samme (additiv tenkning), i stedet for å gange med skalafaktoren.',
    start: function (el) {
      const RUNDER = 6, ST = [['et tre', '🌳'], ['en flaggstang', '🚩'], ['et hus', '🏠'], ['et tårn', '🗼']];
      let runde = 0, poeng = 0, p;
      function lag() {
        const desim = G.niv() >= 1 && runde >= 4, k = desim ? G.pick([1.5, 2.5]) : G.pick([2, 3, 4, 5, 6, 8]), s1 = desim ? G.pick([2, 4]) : G.pick([2, 3, 4]), h1 = desim ? G.pick([2, 4]) : G.pick([1, 2, 3, 4]), ukj = runde < 4 ? 'h' : 's', st = G.pick(ST);
        return { k: k, s1: s1, h1: h1, s2: s1 * k, h2: h1 * k, ukj: ukj, st: st, lite: G.pick([['en pinne', '📏'], ['en person', '🧍'], ['en stolpe', '🪧']]) };
      }
      function tegn() {
        const sk = 90 / Math.max(p.h2, 1), sx = 140 / Math.max(p.s2, p.s1, 1), b = 160;
        const hit = (x0, h, s, ikon, lbl, rød) => '<line x1="' + x0 + '" y1="' + b + '" x2="' + x0 + '" y2="' + (b - h) + '" stroke="#475569" stroke-width="4"/><line x1="' + x0 + '" y1="' + b + '" x2="' + (x0 + s) + '" y2="' + b + '" stroke="#64748b" stroke-width="5" stroke-dasharray="2 5"/><line x1="' + x0 + '" y1="' + (b - h) + '" x2="' + (x0 + s) + '" y2="' + b + '" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4"/><text x="' + x0 + '" y="' + (b - h - 6) + '" text-anchor="middle" font-size="22">' + ikon + '</text>' + lbl;
        const h1 = Math.max(18, p.h1 * sk * 1.6), s1 = p.s1 * sx * .5, h2 = Math.max(40, p.h2 * sk), s2 = Math.max(p.s2 * sx * .5, h2 * .8);
        const hl = h1 / 2, hr = h2 / 2;
        return '<svg viewBox="0 0 440 210" class="sm-svg" role="img" aria-label="To gjenstander med skygger"><rect x="0" y="' + b + '" width="440" height="40" fill="#bbf7d0"/><text x="400" y="30" font-size="34" aria-hidden="true">☀️</text>' +
          hit(30, h1, s1, p.lite[1], '<text x="22" y="' + (b - hl) + '" text-anchor="end" font-weight="800" font-size="13">' + (p.h1) + ' m</text><text x="' + (30 + s1 / 2) + '" y="' + (b + 18) + '" text-anchor="middle" font-size="13" font-weight="800">' + p.s1 + ' m</text>') +
          hit(200, h2, s2, p.st[1], '<text x="192" y="' + (b - hr) + '" text-anchor="end" font-weight="800" font-size="14" fill="' + (p.ukj === 'h' ? '#dc2626' : '#14213d') + '">' + (p.ukj === 'h' ? '?' : p.h2 + ' m') + '</text><text x="' + (200 + s2 / 2) + '" y="' + (b + 18) + '" text-anchor="middle" font-size="14" font-weight="800" fill="' + (p.ukj === 's' ? '#dc2626' : '#14213d') + '">' + (p.ukj === 's' ? '?' : p.s2 + ' m') + '</text>') + '</svg>';
      }
      function vis() {
        p = lag(); const fasit = p.ukj === 'h' ? p.h2 : p.s2;
        const spm = p.ukj === 'h' ? p.lite[0].replace(/^./, c => c.toUpperCase()) + ' på ' + p.h1 + ' m kaster en skygge på ' + p.s1 + ' m. Samtidig kaster ' + p.st[0] + ' en skygge på ' + p.s2 + ' m. Hvor høyt er ' + p.st[0] + '?' : p.lite[0].replace(/^./, c => c.toUpperCase()) + ' på ' + p.h1 + ' m kaster en skygge på ' + p.s1 + ' m. ' + p.st[0].replace(/^./, c => c.toUpperCase()) + ' er ' + p.h2 + ' m høyt. Hvor lang er skyggen til ' + p.st[0] + ' samtidig?';
        const feil = p.ukj === 'h' ? [p.h1 + (p.s2 - p.s1), p.s2, p.h1 * p.s2, p.h2 + p.k] : [p.s1 + (p.h2 - p.h1), p.h2, p.s1 * p.h2, p.s2 + p.k];
        const opts = G.alt(fasit, feil, x => F(x) + ' m');
        el.innerHTML = tmpl('<span>Oppgave ' + (runde + 1) + ' av ' + RUNDER + '</span><span>Poeng: ' + F(poeng) + '</span>', spm, '<div class="figur">' + tegn() + '</div><div class="sp-rad sm-valg"></div><div class="sp-fb" aria-live="polite"></div><div class="sp-rad sm-nav"></div>');
        const skriv = G.niv() >= 1 && runde >= (G.niv() === 2 ? 2 : 3); let forsøk = 0;
        const hint = ['Hvor mange ganger så lang er skyggen til den store som skyggen til den lille? Regn ' + p.s2 + ' ÷ ' + p.s1 + '.', 'Skalafaktoren er ' + p.k + '. Gang den med ' + (p.ukj === 'h' ? p.h1 : p.s1) + '.'];
        function ferdig(ok) {
          if (ok) poeng += forsøk <= 1 ? 1 : .5;
          G.feedback(el, ok, (ok ? 'Riktig! ' : 'Ikke helt. ') + 'Trekantene er formlike, så skalafaktoren er den samme begge veier: ' + p.s2 + ' ÷ ' + p.s1 + ' = ' + p.k + '. ' + (p.ukj === 'h' ? 'Høyden blir ' + p.h1 + ' · ' + p.k + ' = ' + p.h2 + ' m.' : 'Skyggen blir ' + p.s1 + ' · ' + p.k + ' = ' + p.s2 + ' m (skalafaktoren er ' + p.h2 + ' ÷ ' + p.h1 + ' = ' + p.k + ').') + ' Du skal gange med faktoren, ikke legge til det samme.');
          const slutt = runde + 1 >= RUNDER; G.q(el, '.sm-nav').innerHTML = '<button type="button" class="knapp primær sm-neste">' + (slutt ? 'Se resultatet' : 'Neste ▶') + '</button>';
          G.q(el, '.sm-neste').addEventListener('click', () => { runde++; if (runde >= RUNDER) return G.slutt(el, { ikon: '🌳', tittel: 'Skyggemester!', stjerner: G.stjerner(el, poeng, RUNDER), tekst: 'Du fikk ' + F(poeng) + ' av ' + RUNDER + ' riktige.', lær: 'Formlike figurer har samme form, og sidene henger sammen med en skalafaktor. Du ganger (eller deler) alle lengder med samme tall. Å legge til det samme tallet gir feil svar.', igjen: () => { runde = 0; poeng = 0; vis(); } }); vis(); });
        }
        if (!skriv) G.mc(G.q(el, '.sm-valg'), opts, ok => { forsøk = 1; ferdig(ok); });
        else {
          G.q(el, '.sm-valg').innerHTML = '<label class="sr-only" for="sm-inp">Svar i meter</label><input id="sm-inp" class="tallfelt" type="text" inputmode="decimal" autocomplete="off" placeholder="svar"> m <button type="button" class="knapp primær sm-sjekk">Sjekk</button> <button type="button" class="knapp liten sm-hjelp">💡 Hint</button><div class="sm-hint lesbar" hidden></div>';
          const inp = G.q(el, '#sm-inp'); let hn = 0;
          const sjekk = () => {
            const v = M.parseNum(inp.value); if (isNaN(v)) return G.feedback(el, false, 'Skriv et tall.');
            forsøk++; const ok = Math.abs(v - fasit) < 1e-9;
            if (ok) { inp.disabled = true; ferdig(true); } else if (forsøk >= 2) { inp.disabled = true; ferdig(false); }
            else G.feedback(el, false, 'Ikke helt. Prøv en gang til. Hint: ' + hint[0]);
          };
          G.q(el, '.sm-sjekk').addEventListener('click', sjekk); inp.addEventListener('keydown', e => { if (e.key === 'Enter') sjekk(); });
          G.q(el, '.sm-hjelp').addEventListener('click', () => { hn = Math.min(hn + 1, hint.length); const h = G.q(el, '.sm-hint'); h.hidden = false; h.innerHTML = '<strong>Hint:</strong><ol>' + hint.slice(0, hn).map(x => '<li>' + x + '</li>').join('') + '</ol>'; });
        }
      }
      vis();
    }
  });
})();
