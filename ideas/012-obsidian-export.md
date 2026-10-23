# Idee: Obsidian als Ablage für das Wissen

- **Von:** @LivienMajer
- **Status:** Entwurf
- **Barriere:** B5 Vergessen
- **Erweitert:** [006](006-knowledge-graph-bibliothek.md), [007](007-zotero-integration.md)

## Problem

Was wir in RTFP lesen und notieren, bleibt in der App. Viele nutzen für ihr „Second Brain“ aber schon Obsidian. Den Wissensgraphen, eine Datenbank-Ansicht und Karteikarten selbst zu bauen (006, 010) wäre viel Aufwand, und Obsidian kann das alles bereits.

## Vorschlag

**Rollenteilung:** In RTFP wird gelesen, verstanden und geprüft (Reader, Erklärungen, Quiz). Obsidian ist die Ablage dafür, was man mitnimmt.

Was Obsidian dafür schon mitbringt:

| Werkzeug | Nutzen für uns |
|---|---|
| Graph-Ansicht (eingebaut) | `[[Links]]` zwischen Papern und Begriffen ergeben automatisch den Wissensgraphen (006) |
| Bases (eingebaut seit 1.9) | Tabellen- und Kartenansichten aus den Eigenschaften im Notiz-Kopf, z. B. „alle gelesenen Paper“ |
| Spaced Repetition (Plugin) | Karteikarten direkt aus den Notizen, z. B. aus unseren Glossar-Begriffen |
| Zotero Integration / ZotLit (Plugins) | Zotero-Einträge und PDF-Markierungen als Literatur-Notizen (007) |
| PDF++ (Plugin) | Markierungen im PDF verlinken auf Markdown-Notizen |

### Drei Wege der Anbindung

**A) Button „In Obsidian speichern“** (Empfehlung zum Start)
- Obsidian hat ein eingebautes Link-Schema: `obsidian://new?vault=…&file=…&content=…` legt eine Notiz im eigenen Vault an, ohne Plugin.
- RTFP baut daraus eine Notiz pro gelesenem Paper (Vorlage siehe unten).
- Jede Person nutzt ihren eigenen Vault, es gibt keine Konflikte und keine Einrichtung.

**B) Gemeinsamer Gruppen-Vault im Git-Repo**
- Ein Vault-Ordner im Repo, synchronisiert über das Obsidian-Git-Plugin oder Plugins, die nur einen Ordner teilen (z. B. CoNote Git). Das passt zu Issue #7.
- Ergibt einen gemeinsamen Wissensgraphen der Gruppe.
- Risiko: Merge-Konflikte, wenn zwei Leute dieselbe Datei ändern. Abhilfe: eine Datei pro Person und Paper.
- Obsidian Sync scheint für gemeinsame Team-Vaults nicht gedacht zu sein. Das ist nicht offiziell bestätigt.

**C) Local REST API Plugin** (eher nicht)
- Das Plugin öffnet eine API auf dem eigenen Rechner. Die gehostete Web-App kommt da aber nicht heran.
- Jede Person müsste ein Plugin installieren, einen Key einrichten und ein selbst-signiertes Zertifikat akzeptieren. Das ist zu umständlich.

### Notiz-Vorlage (Entwurf)

```markdown
---
title: "Attention Is All You Need"
authors: [Vaswani, Shazeer, …]
arxiv: 1706.03762
url: https://arxiv.org/abs/1706.03762
gelesen: 2026-10-23
level: ganz
quiz: 4/5
pfad: "[[NLP-Einstieg]]"
tags: [paper, rtfp]
---

## Worum geht's
(verständliche Einführung aus RTFP)

## Was ich mitnehme
(eigenes Takeaway)

## Offene Frage
(eigene Frage)

## Begriffe
- [[Self-Attention]]: Erklärung …
- [[Encoder-Decoder]]: Erklärung …

## Karteikarten
Was ersetzt der Transformer im Vergleich zu RNNs?::Rekurrenz, nur noch Attention
```

- Begriffe als `[[Links]]` → jeder Begriff wird ein Knoten im Graphen und verbindet Paper, die ihn verwenden.
- Die Eigenschaften im Kopf → direkt nutzbar in Bases.
- `Frage::Antwort` ist das Karteikarten-Format des Spaced-Repetition-Plugins. Das adressiert das Vergessen von Begriffen (Interview LM).

## Hypothese

> Wir glauben, dass **ein Export in den eigenen Obsidian-Vault** dazu führt, dass **Obsidian-Nutzer*innen ihr Paper-Wissen später wieder aufrufen und wiederholen**. Wir wissen es, wenn **exportierte Notizen und Karteikarten nach 2 Wochen noch geöffnet bzw. geübt werden**.

## Kleinste testbare Version

Ohne Code: Nach dem Lesen die Notiz von Hand (oder mit Claude) nach der Vorlage oben in den eigenen Vault kopieren, eine Woche lang. Danach fragen: Hast du Graph, Bases oder die Karteikarten wirklich benutzt?

## Offene Fragen

- **Wer nutzt Obsidian überhaupt?** In den nächsten Interviews fragen. Für alle anderen muss die Bibliothek in der App reichen.
- Interview LM: Notizen werden nie wieder angeschaut. Hilft ein Export, oder nur die aktive Abfrage über Karteikarten?
- Interview SL: Notizen dienen beim Schreiben zum Merken, nicht zum Nachlesen. Bringt dann ein automatischer Export überhaupt etwas, oder sollte man die Notiz selbst schreiben?
- Wie lang darf eine Notiz im `obsidian://`-Link sein? URLs haben Längengrenzen. Alternativ eine `.md`-Datei zum Download anbieten.
- Doppelte Daten: Was ist die „Wahrheit“, die App oder Obsidian? Vorschlag: Export ist eine Kopie, Änderungen in Obsidian fließen nicht zurück.

## Quellen

- Obsidian URI: https://obsidian.md/help/uri
- Bases: https://heise.de/-10590574
- Spaced Repetition: https://community.obsidian.md/plugins/obsidian-spaced-repetition
- Zotero → Obsidian Workflow: https://groundwater.usu.edu/blog/2023/A-Zotero-to-Obsidian-Workflow/
- PDF++: https://community.obsidian.md/plugins/pdf-plus
- CoNote Git: https://community.obsidian.md/plugins/conote-git
- Local REST API: https://github.com/GGonnerman/obsidian-local-rest-api
