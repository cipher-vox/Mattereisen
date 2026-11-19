# Mattereisen

Matematikk for 8.–10. trinn, bygget langs kompetansemålene i Udirs læreplan (MAT01-06).
En ren statisk nettside: HTML, CSS og JavaScript uten avhengigheter eller eksterne tjenester.
Ingenting lagres, ingen navn eller personopplysninger samles inn, og det finnes ingen vurdering eller innlogging.

## Innhold
- **8. trinn** – 12 temaer (negative tall, regneregler, potenser, kvadratrot, uttrykk, likninger, ulikheter, funksjoner, mønstre, faktorisering, representasjoner, programmering)
- **9. trinn** – 10 temaer (målenheter, figurer, Pytagoras, trekanter og formlikhet, overflate og volum, sentralmål og spredning, statistikk og medier, sannsynlighet, simulering)
- **10. trinn** – 10 temaer (algebra, kvadratsetningene, likningssett, stigningstall, funksjonstyper, vekstfaktor, kjøp/sparing/lån, økonomiprosjekt, modellering, Python)
- **Tre nivåer i hvert tema:** 🌱 *Rolig* (små tall, ett steg om gangen, hint på alle oppgaver, eget enkelt oppgavesett), 🌿 *Vanlig* og 🚀 *Utfordring*. Nivåene er tempobeskrivelser: alle kan velge fritt, ingen blir pekt ut, og valget ligger bare i minnet mens siden er åpen. Det flytende «🧰 Hjelp»-panelet viser huskeregler og vanlige feil for temaet. Hvert tema har også visningene *Utforsk* og *Steg for steg*.
- **🎚️ Tre nivåer (egen visning, `#/tempo/<trinn>/<tema>`):** tredje valg ved siden av Utforsk og Steg for steg, for alle 32 temaer. Eleven velger 🌱 Rolig, 🌿 Vanlig eller 🚀 Utfordring på selve siden, og siden bygges opp på nytt: *Rolig* = én regel om gangen i store fargekort med korte setninger, modell å prøve selv, eksempel steg for steg, rolige oppgaver med hint i flere steg, ordkort; *Vanlig* = alle regler, modeller, tre eksempler, oppgaver fra Utforsk og «test deg selv»; *Utfordring* = reglene i kortform, utfordringsoppgaver og nivå 4–5-oppgaver. Alle tre har generert «flere oppgaver» (nytt sett hver gang). Siden sier ingenting om hvem nivået er for. Innholdet hentes fra regelboka og eksisterende oppgaver (`js/tempo.js`).
- **📒 Regelbok** (`#/ark/regelbok`, `data/regelbok-8/9/10.js`): 1–2 sider med regler, eksempler, «pass opp», huskeregel, ord og et par testspørsmål for hvert av de 32 temaene. Bytt tema med nedtrekksmenyen, skriv ut eller last ned som Word. Kan også lages for alle temaene på et trinn.
- **🧪 Kapittelprøve** (`#/ark/kapittel`, `js/ark-nye.js`): for hvert tema og trinn, med bryter mellom *ordinær prøve* (del 1 uten hjelpemidler, del 2 med, med vurderingsforslag og fasit) og *tilrettelagt prøve* (færre og kortere oppgaver, hjelpebokser, mer plass, uten karakter). Skrives ut eller lastes ned som ekte Word-fil (`.docx`, bygd i nettleseren av `js/dok.js`). Du velger deler (1, 2, 3), antall oppgaver (6–20) og plass til regning. **Redigering på siden:** hver oppgave har «Rediger» (tekst, tall og fasit), «Bytt ut» (ny oppgave fra banken) og «Fjern», og hver del har «➕ Oppgave fra banken» og «➕ Egen oppgave». Endringene følger med til utskrift og Word. **Fasit og løsningsforslag lages automatisk** som eget dokument ved siden av prøven (forhåndsvis, skriv ut eller last ned som Word), og følger redigeringene: endrede og egne oppgaver løses av en liten regnemotor når det er en vanlig «Regn ut …»-oppgave eller en lineær likning i x (med trinnvis løsning og prøving); ellers brukes fasiten du skrev, og står den tom vises «⚠ Fasit mangler». Prøvene er automatisk satt sammen fra oppgavebanken og bør leses gjennom før bruk.
- **🔒 Kodelås:** *Kort test* og *Kapittelprøve* er låst med koden `43210` (endres i `js/ark.js`: sjekksummen `KODE_SJEKK`, laget av strengen `mattereisen|<kode>`). Åpningen finnes bare i minnet og forsvinner når siden lastes på nytt. Vær klar over at dette er en barriere mot nysgjerrighet, ikke sikker beskyttelse: siden kjører i nettleseren, så en elev som leser koden til nettsiden kan komme rundt den. Trenger du ekte beskyttelse, kan du ikke legge prøvene på en åpen nettside.
- **Verktøykursene (Python, GeoGebra, regneark)** finnes både som Utforsk og som Steg for steg, med hint på alle oppgaver.
- **Ekstra oppgaver** per tema: generert på nytt for hvert sett, med fasit.
- **Forklaringsseksjoner (📖 Les først):** alle 32 temaer har, i både Utforsk og Steg for steg, egne seksjoner før oppgavene med grundig forklaring, trinnvise eksempler og figurer. Temaer med flere nye delemner har flere slike seksjoner, plassert foran riktig oppgavegruppe.
- **Spill for å lære** (`#/spill`): 25 spill der poeng og liv bare finnes mens spillet er åpent (ingenting lagres). Hvert tema som har et passende spill, lenker til det. Spillene følger valgt nivå (antall liv, tallstørrelse, hint) og har lyd (valgfritt), konfetti og rekker. Flere er bygd ut med forutsigelse først (Rente-raketten, Brusboks), skrevne svar med hint (Redningsstigen, Skyggemåleren), «fiks feilen»-runder (Kode-knekkeren, Løgnjegeren) og laboratorier med glidebryter (Pinnebyggeren, Sjansejegeren). Også de øvrige er nå nivåtilpasset: Rolig har flervalg med fremgangsmåte, Vanlig og Utfordring har skrevne svar med to forsøk og trinnvise hint (felles hjelper `G.skriv`), forutsigelse først (Ulikhets-vakten, Like-ledd, Rotjegeren), «angre» og test av svaret (Likningsmaskinen), hint (Tallknuseren), flere oppgaver og «ingen feil»-valg med «fiks feilen» (Feiljegeren), og minnespill med 6, 8 eller 10 par.
- **🔎 Les, tolk og begrunn** (`#/les`, `js/les.js`, `data/les-8.js`, `data/les-9.js`, `data/les-10.js`): egen del for 8., 9. og 10. trinn med seks moduler i tre nivåer: *Les teksten* (marker tall og enheter, det som spørres om og unødvendig info), *Les grafen* (trykk på aksetitler, startverdi og punkter, avles og tolk, misvisende akser), *Før pent og rett* (mal for føring, sammenlign god og dårlig føring, sorter stegene, vurder en elevløsning, sjekkliste), *Hva spørs det om?* (kommandoord og oppgaver), *Begrunn svaret* (påstand–begrunnelse–eksempel, setningsstartere, rangering og skriving) og *Diskuter og argumenter* (påstander, «Hvem har rett?», sparringsspørsmål). Fritekstsvar rettes ikke av siden: eleven skriver, får et modellsvar og en sjekkliste, og sammenligner selv. Ingenting skrives ned eller lagres.
- **Opptrening før fritekst** (`js/les-begrunn.js`, `data/les-begrunn.js`): modulen *Begrunn svaret* starter med en ordbank i tre vanskelighetsgrader (lett, middels, vanskelig) med korte ordøvelser, et vist eksempel med fargede deler (påstand, begrunnelse, eksempel, konklusjon), og *Bygg setningen*: eleven trykker på en brikke og så på ruta (eller drar), og kan bygge ulike riktige setninger. Rolig har 3 ruter, Vanlig 5 og Utfordring 7 (med lurende brikker og hint først etter andre forsøk). Først etter dette kommer begrunnelsestrappa, rangering og fritekst. *Finn viktig info i tekst* har et steg-for-steg-eksempel på hvordan man leser en oppgavetekst. Test: `node tests/les-begrunn-test.js`.
- **🎯 Jeopardy** (`#/spill/jeopardy-8`, `-9`, `-10`, `js/spill-j.js`, `data/les-jeopardy.js`): fire kategorier med fire oppgaver (100–400 poeng) per trinn, der laget får en tekst eller graf og skal finne riktig spørsmål. 1–4 lag, én dobbeltpoengrute, og valgfritt «Læreren dømmer». Følger nivået (Rolig: tre alternativer og tips, Utfordring: minuspoeng).
- **🗂️ Ark for Les og begrunn** (`js/ark-les.js`, under Ark): *Før pent og rett* (mal, regler, god/dårlig føring og blanke malark), *Les og tolk* (tekst- og grafoppgaver med fasit på eget ark) og *Sparringskort* (påstandskort, roller og lærerark). Kun utskrift, ikke Word.
- **Lærerveiledning** (`#/laerer`, med innholdsfortegnelse som blir stående på siden når du scroller): kom i gang, de tre nivåene, arbeidsmåter, årsplanforslag per trinn og en egen veiledning for hvert av de 32 temaene (tid, forkunnskaper, vanlige feil, start/midt/slutt, samtalespørsmål, differensiering, vurdering).
- **Utskriftsark** (`#/ark`, også `#/ark/<trinn>/<tema>`): 14 arktyper (kapittelprøve, regelbok, oppgaveark, test, startsjekk, husk-ark, hva kan jeg, utgangsbillett, samtalekort, bingo, par-ark, stasjonsrotasjon, finn feilen, malark som koordinatsystem, rutenett og tallinjer). Velg tema og nivå, forhåndsvis, skriv ut (A4), last ned som HTML-fil, og Word (.docx) for kapittelprøve og regelbok. Fasit kan skrives ut på eget ark. Arkene lagres ikke noe sted.
- **Fasit etter forsøk:** løsninger og fasit åpnes først etter at eleven har prøvd (svar, tekst i fritekstfeltet, kjørt kode eller redigert regneark). Ekstraoppgavene låser fasit til alle oppgavene i en del er forsøkt.
- **Verktøy:** kurs fra bunnen i Python (egen tolk i nettleseren), GeoGebra og regneark.
- **Lesehjelp:** opplesning, ordforklaringer og luftigere tekst. Kan slås av og på.

Alle oppgaver har fasit og løsningsforslag som kan åpnes. Skrivemåten er «likning» (som i LK20); både «:» og «÷» brukes som deletegn, og dette forklares i regneregler. Kompetansemålene hvert tema dekker står i `data/curriculum.js` (`dekker`).

## Publisere på GitHub Pages
1. Opprett et nytt repository på GitHub (f.eks. `mattereisen`).
2. Last opp alle filene i denne mappen (`tests/` er valgfritt).
3. Gå til **Settings → Pages**, velg **Deploy from a branch**, branch `main`, mappe `/ (root)`.
4. Etter et minutt er siden live på `https://<brukernavn>.github.io/mattereisen/`.

Siden har `noindex`, så den dukker ikke opp i Google. Den virker også ved å åpne `index.html` direkte i nettleseren.

## Struktur
- `index.html` – skallet som laster alt (skriptene lastes i rekkefølge, `js/app.js` sist)
- `css/style.css` – utseende (inkludert topptekst med fast menyrad og egne rullegardiner på arksiden)
- `js/` – motor: oppgaver (`tasks.js`), interaktive modeller (`widgets.js`, `w-alg.js`, `w-geo.js`, `w-stat.js`, `w-verktoy.js`), Python-tolk (`pyinterp.js`), Lesehjelp, sider og ruting
- `data/curriculum.js` – oversikt over trinn og temaer (`klar: true` når et tema er ferdig)
- `data/00-hjelp.js` – hjelpefunksjoner for å skrive innhold (se under)
- `data/*.js` – innhold. 8. trinn: ett tema per fil. 9. og 10. trinn: `t9-a…e.js` og `t10-a…e.js`, to temaer per fil
- `data/verktoy-*.js` – kursene i Python, GeoGebra og regneark
- `data/z-fork-*.js` – forklaringsseksjonene (settes inn i begge versjoner av hvert tema med `H.FK`). Filnavnene begynner med `z-` slik at de lastes etter temaene.
- `js/nivaa.js` – nivåvalg (🌱🌿🚀) og Hjelp-panelet. `data/niv-8/9/10.js` – Rolig- og Utfordring-oppgaver per tema (`H.NIV`). `data/niv-utvid.js` legger to ekstra Utfordring-oppgaver til hvert tema (lastes etter niv-10). `data/utvid-8/9/10.js` legger til 4 Rolig-oppgaver per tema, flere Steg-oppgaver i de tynneste temaene på 9. og 10. trinn, og en Utforsk-del «Finn feilen og vurder» (feiljakt, rimelighet og forklaringer) i hvert tema. `data/laerer-8/9/10.js` + `js/laerer.js` – lærerveiledningen. `data/verktoy-steg.js` – Steg for steg-versjonene av verktøykursene.
- `js/ark.js`, `js/ark-maler.js` – utskriftsarkene (typer, maler, forhåndsvisning, utskrift og nedlasting). `js/ark-nye.js` – kapittelprøve og regelbok. `js/dok.js` – dokumentmodell som lager både HTML-forhåndsvisning og Word-fil. `js/tempo.js` – visningen «Tre nivåer». `js/ark-les.js` – ark for Les og begrunn. `js/les.js` – motoren for «Les, tolk og begrunn» (innholdet ligger i `data/les-*.js`). `js/spill-j.js` – Jeopardy.
- `js/spill.js` – spillkjerne (register, sider, hjelpere), `js/spill-a.js … spill-d.js` – selve spillene. Nye spill legges til med `M.G.add({ id, tittel, ikon, trinn, temaer, kort, hvordan, lærer, start(el) })`.

Adresser: `#/` forside, `#/9` trinn, `#/9/<tema>` Utforsk, `#/steg/9/<tema>` Steg for steg, `#/tempo/9/<tema>` Tre nivåer, `#/ekstra/9/<tema>` ekstraoppgaver, `#/verktoy`, `#/steg/verktoy/<kurs>`, `#/spill`, `#/spill/<id>`, `#/laerer` `#/ark`, `#/ark/regelbok` og `#/ark/kapittel/<trinn>/<tema>`.

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
- `node tests/spill-nivaa.js [filter]` – spiller hvert spill på alle tre nivåer og sjekker at de ikke krasjer og (der det går an med tilfeldige klikk) når sluttskjermen.
- `node tests/les-test.js` – spiller gjennom alle Les-moduler (3 trinn × 6 moduler × 3 nivåer) og alle Jeopardy-varianter.
- `node tests/ark-les-test.js` – bygger de tre arktypene for alle trinn og nivåer og sjekker at fasitbokstavene peker på riktig alternativ.
- `node tests/spill-test.js [filter]` – åpner hvert spill på mobilbredde, klikker tilfeldig rundt og leter etter JavaScript-feil og sidelengs scrolling.
- `node tests/alle-sider.js [filter]` – besøker alle ferdige temaer i fem visninger (+ verktøy, lærerside og arkside) på mobilbredde og leter etter feil og sidelengs scrolling.
- `node tests/ark-test.js` – genererer alle kombinasjoner av arktype, tema og nivå og leter etter feil og tomme ark.

## Merknader
- Opplesning bruker nettleserens innebygde talesyntese. Kvaliteten på norsk stemme varierer mellom enheter.
- Innholdet er automatisk testet for regnefeil, men bør leses gjennom av en lærer før bruk i klasserommet.
