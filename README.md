# RTFP — Read The F***ing Paper 📄

> Jeden Tag ein Paper. Gemeinsam. Und das Wissen bleibt.

RTFP ist ein Projekt von Informatik-Studierenden, die die Gewohnheit aufbauen wollen, **täglich ein wissenschaftliches Paper zu lesen** und das Gelernte in einer **gemeinsamen Wissensbasis** abzulegen.

## Status

🧪 **Phase 0: Anforderungen finden.** Wir finden heraus, *warum* regelmäßiges Paper-Lesen bisher nicht klappt. Parallel entsteht ein erster Prototyp zum Selbst-Benutzen.

## Prototyp

| Teil | Was | Doku |
|---|---|---|
| [`web/`](web/) | Next.js-App: Paper des Tages, „Einfach erklärt“, Begriffe nachschlagen, Quiz, Streak, Glossar, Bibliothek | [`web/README.md`](web/README.md) |
| [`bot/`](bot/) | Discord-Bot: Erinnerung zur festen Uhrzeit, Erfolgsmeldungen, `/heute` | [`bot/README.md`](bot/README.md) |
| [`paths/`](paths/) | Lernpfade als Markdown, die die App abarbeitet | [Beispiel](paths/nlp-einstieg.md) |

Warum so: [`docs/decisions/0001-prototyp-stack.md`](docs/decisions/0001-prototyp-stack.md)

## Vorgehen

| Phase | Was | Wo im Repo |
|---|---|---|
| 1 | Interviews: echtes Verhalten verstehen | [`research/interviews/`](research/interviews/) |
| 2 | Hypothesen formulieren und priorisieren | [`research/hypotheses.md`](research/hypotheses.md) |
| 3 | Kleinste v0 bauen und selbst benutzen (Dogfooding) | [`web/`](web/), [`bot/`](bot/) |
| 4 | Wöchentliches Treffen: was nervt, was machen wir als Nächstes | [`retros/`](retros/) |

Mehr zur Idee: [`docs/vision.md`](docs/vision.md)

## Mitmachen

- 💡 **Schnelle Idee?** → [Issue mit Template „Idee“](../../issues/new/choose) öffnen
- 📝 **Ausgearbeiteter Vorschlag?** → Datei in [`ideas/`](ideas/) anlegen (siehe [Template](ideas/_template.md))
- 🐛 **Etwas nervt an der v0?** → Issue „Feedback“
- 🗳️ **Abstimmen:** 👍 auf Issues = „will ich auch“

Details in [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Grundregel

**Lesen kommt vor Bauen.** Wer an einem Tag committet, hat an dem Tag auch ein Paper gelesen. 😉
