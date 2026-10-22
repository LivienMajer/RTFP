# Idee: Empfehlungs-Graph aus Gelesenem und offenen Fragen

- **Von:** @LivienMajer
- **Status:** Entwurf
- **Barriere:** B1 Auswahl
- **Erweitert:** [001](001-paper-empfehlungen.md), [006](006-knowledge-graph-bibliothek.md)

## Problem

Allgemeine Empfehlungen kennen meine Neugier nicht. Die besten Hinweise auf das nächste Paper entstehen eigentlich beim Lesen: „Wie funktioniert eigentlich X?“, „Gibt es dazu was Neueres?“

## Vorschlag

**1. Offene Fragen am Ende jedes Papers**
- Nach dem Lesen (oder im Quiz, [005](005-lese-quiz.md)): „Welche Frage ist offen geblieben?“
- Zusätzlich schlägt das System Fragen vor („Wie verhält sich das bei großen Datenmengen?“), aus denen ich auswählen kann
- Die Frage wird zur Suchanfrage → passende Paper werden vorgeschlagen
- Fragen bleiben in der Bibliothek gespeichert. Wenn jemand später ein Paper liest, das eine offene Frage beantwortet, wird sie verknüpft und als beantwortet markiert.

**2. Empfehlungs-Graph aus den gelesenen Papern**
- Ausgehend von meinen gelesenen Papern: zitierte Paper (Grundlagen), zitierende Paper (was darauf aufbaut), ähnliche Paper (Embeddings)
- Gewichtet nach meinen Bewertungen, offenen Fragen und dem, was die Gruppe gelesen hat
- Erklärbar: „Vorgeschlagen, weil du X gelesen hast und gefragt hast: …“

**3. Scores und Metadaten**
- Zitationszahl, „einflussreiche Zitationen“ (Semantic Scholar), Venue, Jahr
- Als **Hinweis**, nicht als alleiniges Kriterium. Sonst sieht man nur alte Klassiker, und neue Paper haben keine Chance.
- Optional: Gruppen-Score (wie gut fanden wir es?)

## Hypothese

> Wir glauben, dass **Empfehlungen auf Basis meiner eigenen offenen Fragen** dazu führen, dass **ich das nächste Paper lieber lese**. Wir wissen es, wenn **Paper aus offenen Fragen öfter zu Ende gelesen und besser bewertet werden** als andere Vorschläge.

## Kleinste testbare Version

Jeder schreibt nach dem Lesen eine offene Frage in den Channel. Eine andere Person (oder ein LLM mit Semantic-Scholar-Suche) sucht dazu ein Paper heraus. Das wird das nächste Paper.

## Offene Fragen

- Wie gut sind automatisch erzeugte Fragen im Vergleich zu eigenen?
- Wie mischen wir Signale (eigene Fragen, Zitationen, Gruppe, Scores)?
