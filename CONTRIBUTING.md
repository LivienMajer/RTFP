# Mitmachen bei RTFP

Wir sind drei Leute, die alle mit Claude arbeiten. Der Workflow ist bewusst locker.

## Wie wir arbeiten

- **[Board](https://github.com/users/LivienMajer/projects/1):** GitHub Project mit drei Spalten: `Ideen` · `Machen wir gerade` · `Fertig`. Wer etwas anfängt, schiebt das Issue rüber und trägt sich ein.
- **Bescheid sagen**, woran man arbeitet, damit nicht zwei (oder drei Claudes) dasselbe bauen.
- **Einmal pro Woche treffen:** Was haben wir gelesen? Was nervt? Worauf haben wir Lust? Wichtige Entscheidungen schreibt einer kurz ins Repo.
- **Alles andere** läuft im Gruppenchat.

## Git

- **Kleinkram** (Doku, Ideen, Notizen) direkt auf `main`
- **Code-Features** auf einem eigenen Branch (`feat/kurzer-name`) mit PR. Review ist freiwillig. Wer will, schaut drüber (oder lässt Claude drüberschauen), sonst mergt man selbst.
- **Vor dem Arbeiten `git pull`**, nach dem Arbeiten pushen. Lieber oft und klein als selten und groß.

## Arbeiten mit Claude

- **[`CLAUDE.md`](CLAUDE.md) ist unser gemeinsames Gedächtnis.** Claude liest sie bei jedem von uns automatisch. Konventionen, Stack und wichtige Entscheidungen gehören dorthin und nicht nur in den eigenen Chat oder die eigene Claude-Memory, denn die sehen die anderen nicht.
- **Ergebnisse aus Claude-Sessions ins Repo:** Wenn Claude etwas herausfindet oder entscheidet, das die anderen wissen sollten, kommt es in eine Datei (Idee, Decision, CLAUDE.md).
- **Selbst reviewen, bevor man pusht:** Claude schreibt schnell viel Code. Du bist trotzdem verantwortlich für das, was du committest.
- **Parallel arbeiten:** Drei Claudes erzeugen schnell Merge-Konflikte. Deshalb kleine Branches, oft pullen, und absprechen, wer welche Dateien anfasst.
- **Projekt-Skills:** In [`.claude/skills/`](.claude/skills/) liegen gemeinsame Abkürzungen, z. B. `/idee`, um eine neue Idee als Datei anzulegen.

## Wo kommt was hin?

| Was | Wohin |
|---|---|
| Spontane Idee | Issue (Template 💡 Idee) |
| Ausgearbeitete Idee | `ideas/NNN-name.md` (oder `/idee` in Claude) |
| Feedback / Bug | Issue (Template 🗣️ Feedback / 🐛 Bug) |
| Interview-Notizen | `research/interviews/` |
| Hypothesen | `research/hypotheses.md` |
| Notizen vom Wochentreffen | `retros/` (optional) |
| Entscheidung (Stack, Scope, …) | `docs/decisions/` und kurz in `CLAUDE.md` |

## Und nicht vergessen

Das eigene Paper lesen. Darum geht's ja eigentlich. 📄
