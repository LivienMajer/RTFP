# Mitmachen bei RTFP

## Wo kommt was hin?

| Was | Wohin | Format |
|---|---|---|
| Spontane Idee, Wunsch, Gedanke | GitHub Issue → Template **💡 Idee** | 2–3 Sätze reichen |
| Ausgearbeiteter Vorschlag | `ideas/NNN-kurzer-name.md` per PR | [`ideas/_template.md`](ideas/_template.md) |
| Feedback zur aktuellen Version | GitHub Issue → Template **🗣️ Feedback** | Was ist passiert, was hast du erwartet |
| Annahme, die wir testen wollen | GitHub Issue → Template **🧪 Hypothese**, danach in [`research/hypotheses.md`](research/hypotheses.md) | „Wir glauben, dass …“ |
| Interview-Notizen | `research/interviews/YYYY-MM-DD-kuerzel.md` | [`research/interviews/_template.md`](research/interviews/_template.md) |
| Notizen zur Wochen-Retro | `retros/YYYY-Www.md` | [`retros/_template.md`](retros/_template.md) |
| Getroffene Entscheidung (Stack, Scope, …) | `docs/decisions/NNNN-titel.md` | [`docs/decisions/_template.md`](docs/decisions/_template.md) |

## Wie Ideen weiterkommen

```
Issue (💡 Idee)  →  Diskussion + 👍-Votes  →  Retro: priorisieren  →  Hypothese  →  bauen  →  messen
```

- **Labels** zeigen den Status: `status: neu` → `status: diskutieren` → `status: geplant` → `status: umgesetzt` / `status: verworfen`
- **Verworfen ist okay.** Verworfene Ideen bleiben dokumentiert, damit wir sie nicht dreimal diskutieren.
- Priorisiert wird in der **wöchentlichen Retro** (MoSCoW: Must / Should / Could / Won't).

## Interviews führen

Frag nach **echtem Verhalten**, nicht nach Wünschen. Nicht „Hättest du gern Feature X?“, sondern „Wann hast du zuletzt …? Was ist dann passiert?“. Leitfaden: [`research/interviews/README.md`](research/interviews/README.md).

## Code

- Branch von `main`, kleiner PR, kurze Beschreibung
- `main` bleibt benutzbar, denn wir benutzen das Ding selbst täglich
