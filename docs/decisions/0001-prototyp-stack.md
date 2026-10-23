# 0001: Stack und Scope für den ersten Prototyp

- **Datum:** 2026-10-23
- **Status:** vorgeschlagen (Prototyp auf Branch `feat/prototype`)
- **Beteiligt:** @LivienMajer

## Kontext

Nach den ersten zwei Interviews (LM, SL) wollen wir parallel zur Testphase einen Prototyp bauen und selbst benutzen. Die Interviews zeigen:
- Ein Paper soll **zugewiesen** werden (B1).
- Jemand soll **nachhalten**, ob gelesen wurde (B4).
- Hilfe bei **Fachbegriffen und englischen Wörtern** soll direkt beim Lesen kommen (B3, B6).
- Es braucht einen festen **Auslöser** (B7).
- Eine gerissene Streak beendet die Gewohnheit, Streaks müssen also **verzeihend** sein.

## Optionen

1. Nur Web-App
2. Nur Discord-Bot
3. Web-App + Discord-Bot

## Entscheidung

**Web-App + Discord-Bot**, KI über die **Claude API**:
- **Web-App:** Next.js (TypeScript). Lernpfade als Markdown in `paths/`, Daten vorerst in einer JSON-Datei, Login nur über Namensauswahl.
- **Claude:** Opus 5.5 liest das arXiv-PDF direkt per URL. Erzeugt werden Einführung, Begriffserklärungen und Quiz als strukturiertes JSON.
- **Bot:** discord.js. Er übernimmt Erinnerung zur festen Uhrzeit, Erfolgsmeldungen und `/heute` und liest alles über eine Token-geschützte API der Web-App.

## Konsequenzen

- Wir können sofort selbst testen, Claude-Kosten fallen pro Paper nur einmal an.
- **Noch offen:** Hosting (wer betreibt Web-App und Bot dauerhaft?), echte Datenbank und echte Anmeldung vor jedem öffentlichen Hosting, API-Kosten aufteilen.
- Nur arXiv-Paper (Open Access). Lizenzierte PDFs bleiben außen vor (siehe ideas/008).
