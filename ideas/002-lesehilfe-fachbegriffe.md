# Idee: Direkte Lesehilfe und Fachbegriffe erklären

- **Von:** @LivienMajer
- **Status:** Entwurf
- **Barriere:** B3 Verständnis

## Problem

Man bleibt an Fachbegriffen, Formeln oder vorausgesetztem Wissen hängen und gibt frustriert auf oder liest nur noch oberflächlich.

## Vorschlag

Beim Lesen direkt Hilfe bekommen:
- Begriff markieren → kurze, verständliche Erklärung im Kontext des Papers
- Glossar pro Paper automatisch erzeugen
- „Erklär mir diesen Absatz / diese Formel einfacher“
- Fragen ans Paper stellen (Chat mit dem PDF)
- Verweis auf Grundlagen: „Für dieses Paper solltest du X kennen“, evtl. mit Link auf ein bereits gelesenes Paper in der Bibliothek ([006](006-knowledge-graph-bibliothek.md))

Technisch: LLM mit dem Paper-Text als Kontext.

## Hypothese

> Wir glauben, dass **Erklärungen direkt beim Lesen** dazu führen, dass **weniger Leute bei schweren Papern abbrechen**. Wir wissen es, wenn **die Abbruchquote bei als „schwer“ markierten Papern sinkt**.

## Kleinste testbare Version

Ohne eigene App: PDF in Claude oder ChatGPT laden und eine gemeinsame Prompt-Vorlage benutzen. Danach fragen: Hat es geholfen? Welche Fragen hast du gestellt?

## Offene Fragen

- Wie gehen wir mit falschen Erklärungen (Halluzinationen) um? Quelle/Textstelle anzeigen?
- Kosten für API-Aufrufe? Wer zahlt?
- PDF in der eigenen App lesen oder eine Erweiterung für bestehende Reader (z. B. Zotero, Browser-Extension)?
