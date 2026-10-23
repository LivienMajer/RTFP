# RTFP Web-App (Prototyp)

Next.js-App für das tägliche Lesen: Paper zuweisen, verständlich erklären, Begriffe nachschlagen, per Quiz abhaken, Streak und Gruppe sehen.

## Starten

```bash
cd web
npm install
cp .env.example .env.local   # dann ANTHROPIC_API_KEY und RTFP_BOT_TOKEN eintragen
npm run dev
```

Dann http://localhost:3000 öffnen und deinen Namen wählen.

## Was es kann

| Seite | Funktion | Idee |
|---|---|---|
| **Heute** (`/`) | Dein nächstes Paper aus dem aktiven Lernpfad, Streak, Wochenziel, wer heute schon gelesen hat | 001, 004, 011 |
| **Paper** (`/paper/<arXiv-ID>`) | „Einfach erklärt“ statt Abstract, Fachbegriffe, PDF-Link | 003 |
| | „Hängen geblieben?“: Begriff, englisches Wort oder Satz erklären lassen | 002, Interview LM |
| | Quiz in zwei Leveln (kurz/ganz). Bestanden = Tag zählt | 005, H1 |
| | Notizen: Takeaway und offene Frage, plus die Notizen der anderen | 006, 009 |
| **Glossar** | Alles, was du nachgeschlagen hast | Interview LM |
| **Bibliothek** | Alle gelesenen Paper der Gruppe mit Notizen | 006 |

**Streak-Regel:** Ein verpasster Tag pro Kalenderwoche wird automatisch überbrückt (Interview SL: ein gerissener Streak beendet sonst die Gewohnheit).

## Wie es funktioniert

- **Lernpfade** liegen als Markdown in [`../paths/`](../paths/). `RTFP_PATH` wählt den aktiven Pfad. Jede Person arbeitet ihn in eigenem Tempo ab.
- **Paper-Daten** kommen von der arXiv-API. Claude bekommt das PDF direkt per URL (`lib/claude.ts`).
- **Claude-Ergebnisse** (Einführung, Quiz) werden pro Paper gespeichert und von allen geteilt. Jede Generierung kostet also nur einmal.
- **Daten** liegen in `data/db.json` (gitignored). Das reicht für den Prototyp auf einem Rechner. Vor dem Hosting brauchen wir eine echte DB.
- **Login** ist nur „Namen wählen“, ohne Passwort. **Nicht öffentlich ins Internet stellen**, solange es keine echte Anmeldung gibt.
- **Bot-Schnittstelle:** `GET /api/bot/status` mit `Authorization: Bearer $RTFP_BOT_TOKEN`, siehe [`../bot/`](../bot/).

## Kosten

Pro Paper ein Aufruf für die Einführung, ein bis zwei für das Quiz (kurz/ganz) und einer pro nachgeschlagenem Begriff. Modell: Claude Opus 5.5. Das PDF wird gecacht, wiederholte Fragen zum selben Paper sind deshalb günstiger.
