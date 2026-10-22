# Idee: Paper-Landkarte zum Erkunden

- **Von:** @LivienMajer
- **Status:** Entwurf
- **Barriere:** B4 Motivation, B1 Auswahl
- **Erweitert:** [006](006-knowledge-graph-bibliothek.md)

## Problem

Man sieht nicht, wie viel man schon weiß, und auch nicht, was es noch zu entdecken gibt. Fortschritt fühlt sich abstrakt an.

## Vorschlag

Die ganze **Landschaft der Paper eines Fachgebiets** als großer Graph oder Karte, wie die Weltkarte in einem Spiel:

- Paper sind Punkte, Nähe = thematische Ähnlichkeit (Embeddings) oder Zitationen
- Cluster bilden „Regionen“ (z. B. NLP, Computer Vision, Distributed Systems)
- **Gelesene Paper sind „erkundet“** und leuchten auf. Der Rest liegt im Nebel (Fog of War).
- Rund um Gelesenes wird der Nebel teilweise gelichtet. Man sieht also, was als Nächstes nah dran ist.
- Größe des Punkts = Zitationszahl / Bedeutung
- Gruppenansicht: Wer hat welche Region erkundet? Wer ist „Experte“ für was?
- Erfolge: „Erste Paper in Region Security“, „Region NLP zu 20 % erkundet“

Daten: OpenAlex oder Semantic Scholar (Metadaten, Zitationen, Embeddings), Layout z. B. mit UMAP. Vorbild sind Tools wie Connected Papers und Litmaps, aber mit Fortschritt und Gruppenbezug.

## Hypothese

> Wir glauben, dass **sichtbarer Erkundungsfortschritt** dazu führt, dass **Leute langfristig motiviert bleiben** (nicht nur durch Streaks). Wir wissen es, wenn **Leute die Karte regelmäßig öffnen und Paper bewusst aus unerkundeten Bereichen wählen**.

## Kleinste testbare Version

Connected Papers oder Litmaps für ein Thema benutzen und gelesene Paper von Hand markieren. Oder ein Python-Notebook: 500 Paper eines Themas aus OpenAlex laden, mit UMAP plotten und gelesene einfärben. Ist das motivierend?

## Offene Fragen

- Wie groß ist „die ganze Landschaft“? Pro Fachgebiet oder pro Interessen?
- Performance: Tausende Knoten im Browser darstellen (WebGL, z. B. Sigma.js, Cosmograph)?
- Ist das ein v0-Feature oder etwas für später? (Eher später, aber gut für die Vision.)
