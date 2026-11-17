# Mattereisen

Matematikk for 8.–10. trinn, bygget langs kompetansemålene i Udirs læreplan (MAT01-06).
En ren statisk nettside: HTML, CSS og JavaScript uten avhengigheter eller eksterne tjenester.
Ingenting lagres, ingen navn eller personopplysninger samles inn, og det finnes ingen vurdering eller innlogging.

## Innhold
- **8. trinn** – 12 temaer (negative tall, regneregler, potenser, kvadratrot, uttrykk, ligninger, ulikheter, funksjoner, mønstre, faktorisering, representasjoner, programmering)
- **9. trinn** – 10 temaer (målenheter, figurer, Pytagoras, trekanter og formlikhet, overflate og volum, sentralmål og spredning, statistikk og medier, sannsynlighet, simulering)
- **10. trinn** – 10 temaer (algebra, kvadratsetningene, ligningssett, stigningstall, funksjonstyper, vekstfaktor, kjøp/sparing/lån, økonomiprosjekt, modellering, Python)
- **To versjoner av hvert tema:** *Utforsk* (full) og *Steg for steg* (små steg, færre oppgaver, hint på alle).
- **Ekstra oppgaver** per tema: generert på nytt for hvert sett, med fasit.
- **Verktøy:** kurs fra bunnen i Python (egen tolk i nettleseren), GeoGebra og regneark.
- **Lesehjelp:** opplesning, ordforklaringer og luftigere tekst. Kan slås av og på.

Alle oppgaver har fasit og løsningsforslag som kan åpnes. Kompetansemålene hvert tema dekker står i `data/curriculum.js` (`dekker`).

## Publisere på GitHub Pages
1. Opprett et nytt repository på GitHub (f.eks. `mattereisen`).
2. Last opp alle filene i denne mappen (`tests/` er valgfritt).
3. Gå til **Settings → Pages**, velg **Deploy from a branch**, branch `main`, mappe `/ (root)`.
4. Etter et minutt er siden live på `https://<brukernavn>.github.io/mattereisen/`.

Siden har `noindex`, så den dukker ikke opp i Google. Den virker også ved å åpne `index.html` direkte i nettleseren.

## Struktur
- `index.html` – skallet som laster alt (skriptene lastes i rekkefølge, `js/app.js` sist)
- `css/style.css` – utseende
- `js/` – motor: oppgaver (`tasks.js`), interaktive modeller (`widgets.js`, `w-alg.js`, `w-geo.js`, `w-stat.js`, `w-verktoy.js`), Python-tolk (`pyinterp.js`), Lesehjelp, sider og ruting
- `data/curriculum.js` – oversikt over trinn og temaer (`klar: true` når et tema er ferdig)
- `data/00-hjelp.js` – hjelpefunksjoner for å skrive innhold (se under)
- `data/*.js` – innhold. 8. trinn: ett tema per fil. 9. og 10. trinn: `t9-a…e.js` og `t10-a…e.js`, to temaer per fil
- `data/verktoy-*.js` – kursene i Python, GeoGebra og regneark

Adresser: `#/` forside, `#/9` trinn, `#/9/<tema>` Utforsk, `#/steg/9/<tema>` Steg for steg, `#/ekstra/9/<tema>` ekstraoppgaver, `#/verktoy`.

## Legge til eller endre et tema
Et tema registreres slik (se `data/t10-a.js` for ferdige eksempler):

```js
M.register('utforsk', '10/algebra', { tittel, ingress, mal, ordliste, seksjoner });
M.register('steg',    '10/algebra', { ... });
M.ekstra['10/algebra'] = function (mode) { ... return H.ekDef('Algebra', seksjoner); };
```

Hjelpefunksjonene i `M.H`: `V` (flervalg), `T` (tallsvar), `F` (åpent svar med løsningsforslag), `P` (avsnitt), `C` (farget boks), `E` (utregnet eksempel), `O`/`OS` (oppgavesett), `W` (interaktiv modell), `TAB`, `K`, `SJ`, `S` (seksjon), `ord` (ordforklaring).

1. Skriv innholdet i en `data/`-fil og legg `<script>`-linjen i `index.html` før `js/app.js`.
2. Sett `klar: true` på temaet i `data/curriculum.js`.
3. Kjør testene.

## Tester
Krever Node (og Playwright + Chrome for nettlesertestene).
- `node tests/check-data.js` – sjekker alle oppgaver: fasit og løsningsforslag stemmer overens, hint finnes på Steg-oppgaver, Python-oppgaver gir faktisk det oppgitte svaret, og ekstraoppgavene testes med 400 tilfeldige sett i begge versjoner.
- `node tests/browser-test.js` – åpner siden og tester navigasjon, oppgaver, Lesehjelp og mobilvisning.
- `node tests/alle-sider.js [filter]` – besøker alle ferdige temaer i fire visninger (+ verktøy) på mobilbredde og leter etter feil og sidelengs scrolling.

## Merknader
- Opplesning bruker nettleserens innebygde talesyntese. Kvaliteten på norsk stemme varierer mellom enheter.
- Verktøykursene har foreløpig ingen egen Steg for steg-versjon; de viser Utforsk-versjonen i begge moduser.
- Innholdet er automatisk testet for regnefeil, men bør leses gjennom av en lærer før bruk i klasserommet.
