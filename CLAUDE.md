# CLAUDE.md

Gemeinsamer Kontext für Claude. Wir sind drei Leute (Livien, Daniel, Sebastian), die alle mit Claude an diesem Repo arbeiten. Was hier steht, gilt für alle. Wenn wir etwas Wichtiges entscheiden, kommt es hierher.

## Projekt

RTFP („Read The F***ing Paper“): Informatik-Studierende bauen die Gewohnheit auf, täglich ein Paper zu lesen und das Wissen in einer gemeinsamen Wissensbasis abzulegen. Vision: [`docs/vision.md`](docs/vision.md).

**Aktuelle Phase:** Anforderungen finden, parallel ein erster Prototyp. Ideen liegen in [`ideas/`](ideas/), Hypothesen in [`research/hypotheses.md`](research/hypotheses.md).

**Code:**
- [`web/`](web/): Next.js 16 + Claude API. **Vor Next-Code `web/AGENTS.md` lesen**, die Version ist neuer als Claudes Training.
- [`bot/`](bot/): Discord-Bot, discord.js, Node 24 ohne Build.
- [`paths/`](paths/): Lernpfade als Markdown. Das Format steht in der Datei, die App parst es.

## Konventionen

- **Sprache:** Doku, Ideen und Issues auf Deutsch. Code, Kommentare und Commit-Messages auf Englisch.
- **Neue Ideen:** `ideas/NNN-kurzer-name.md` nach [`ideas/_template.md`](ideas/_template.md), fortlaufend nummeriert, und in die Tabelle in [`ideas/README.md`](ideas/README.md) eintragen. Verwandte Ideen gegenseitig verlinken.
- **Entscheidungen:** `docs/decisions/NNNN-titel.md` und eine Zeile unten unter „Entscheidungen“.
- **Git:** Doku und Ideen direkt auf `main`. Code auf einem Branch `feat/kurzer-name` mit PR. Vor dem Arbeiten `git pull`.

## Wie Claude hier arbeiten soll

- Kleine, fokussierte Änderungen. Wir arbeiten zu dritt parallel, große Umbauten erzeugen Merge-Konflikte.
- Keine Features bauen, die nicht zur aktuellen Phase passen. Im Zweifel nachfragen.
- Workflow locker halten: keine neuen Prozesse, Labels oder Pflicht-Templates einführen, ohne zu fragen.
- Lizenzierte PDFs (z. B. über den Uni-Zugang) nie ins Repo oder in eine zentrale Ablage. Nur Metadaten, Links und eigene Notizen (siehe [`ideas/008`](ideas/008-paper-suche-und-zugang.md)).

## Entscheidungen

<!-- Kurz und mit Datum, Details in docs/decisions/ -->
- 2026-10-22: Workflow bewusst locker: Board mit 3 Spalten, wöchentliches Treffen, Review freiwillig.
- 2026-10-23 (vorgeschlagen): Prototyp als Web-App (Next.js) + Discord-Bot, KI über Claude API (Opus 5.5), Daten vorerst als JSON-Datei. Siehe [`0001`](docs/decisions/0001-prototyp-stack.md).
