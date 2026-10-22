# Idee: Digitale Bibliothek als Knowledge Graph

- **Von:** @LivienMajer
- **Status:** Entwurf
- **Barriere:** B5 Vergessen

## Problem

Gelesenes Wissen verschwindet. Notizen liegen verstreut und werden nie wieder angeschaut. Zusammenhänge zwischen Papern sieht man nicht.

## Vorschlag

Alle gelesenen Paper (von mir und der Gruppe) landen in einer **gemeinsamen Bibliothek**, verknüpft als **Knowledge Graph**:

- **Knoten:** Paper, Konzepte (z. B. „Transformer“, „Consensus“), Autoren, Personen aus der Gruppe
- **Kanten:** zitiert, baut auf, verwendet Konzept, widerspricht, „X hat das gelesen“
- Eigene Notizen und Takeaways hängen am Paper
- Visuelle Graph-Ansicht und Suche („Was haben wir alles zu Graph Neural Networks gelesen?“)
- Nutzt die anderen Ideen: Empfehlungen aus dem Graphen ([001](001-paper-empfehlungen.md)), Fachbegriffe verlinken auf Konzept-Knoten ([002](002-lesehilfe-fachbegriffe.md))

## Hypothese

> Wir glauben, dass **eine verknüpfte Bibliothek** dazu führt, dass **Leute alte Paper und Notizen wieder aufrufen**. Wir wissen es, wenn **Notizen anderer bzw. alte Einträge regelmäßig geöffnet werden**.

## Kleinste testbare Version

Ein gemeinsamer Obsidian-Vault, über dieses Repo synchronisiert: eine Markdown-Datei pro Paper, Konzepte als `[[Links]]`. Die Graph-Ansicht ist in Obsidian schon eingebaut.

## Offene Fragen

- Konzepte automatisch extrahieren (LLM) oder manuell verlinken?
- Brauchen wir eine Graph-Datenbank (Neo4j), oder reicht Postgres?
- Wird der Graph wirklich benutzt, oder ist er nur schön anzusehen?
