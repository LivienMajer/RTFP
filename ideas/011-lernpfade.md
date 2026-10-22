# Idee: Lernpfade (Recommended Paths)

- **Von:** @LivienMajer
- **Status:** Entwurf
- **Barriere:** B1 Auswahl, B3 Verständnis
- **Erweitert:** [009](009-empfehlungen-aus-gelesenem.md), [010](010-paper-landkarte.md)

## Problem

Wer neu in ein Feld einsteigt, weiß nicht, wo er anfangen soll. Liest man ein aktuelles Paper zuerst, versteht man wenig, weil die Grundlagen fehlen. Die Klassiker kennt man aber noch nicht.

## Vorschlag

**Geführte Lesepfade** durch ein Feld, vom Fundament bis zum aktuellen Stand:

```
Einstieg in NLP:
  1. Word2Vec (2013)           ← Grundlage: Embeddings
  2. Seq2Seq (2014)            ← Encoder/Decoder
  3. Attention (Bahdanau 2014)
  4. Attention Is All You Need (2017)
  5. BERT (2018)
  6. GPT-3 (2020)
  7. → aktuelle Paper nach Wahl
```

- Jeder Schritt erklärt kurz, **warum** dieses Paper hier kommt und was es zum vorherigen hinzufügt
- Fortschrittsanzeige („3/7“), passt gut zu Streaks ([004](004-streak-tracking.md))
- Auf der Landkarte ([010](010-paper-landkarte.md)) als Route durch den Nebel sichtbar
- Abzweigungen: Nach Schritt 4 entweder Richtung „Effizienz“ oder Richtung „Multimodal“
- Schon gelesene Paper werden automatisch abgehakt oder übersprungen

**Woher kommen die Pfade?**
1. **Kuratiert von der Gruppe:** Wer sich in einem Feld auskennt, baut einen Pfad. Das ist auch eine gute Mitmach-Aufgabe.
2. **Halbautomatisch:** Aus dem Zitationsgraphen die einflussreichsten Vorgänger eines Ziel-Papers bestimmen und chronologisch ordnen. Ein Mensch prüft das Ergebnis.
3. **Individuell:** „Ich will Paper X verstehen. Was muss ich vorher lesen?“ erzeugt einen Pfad rückwärts von X, ohne bereits Gelesenes.

Quellen für erste Pfade: Survey-Paper, Kurs-Leselisten (z. B. Stanford CS224N, KIT-Vorlesungen), „Awesome-…“-Listen auf GitHub.

## Hypothese

> Wir glauben, dass **ein geführter Pfad** dazu führt, dass **Einsteiger ein neues Feld nicht nach wenigen Papern abbrechen** und die Paper besser verstehen. Wir wissen es, wenn **Pfade häufiger zu Ende gelesen werden als lose Empfehlungen** und Quiz-Ergebnisse ([005](005-lese-quiz.md)) besser sind.

## Kleinste testbare Version

Eine Person baut einen Pfad mit 5–7 Papern für ein Feld als Markdown-Datei in diesem Repo (z. B. `paths/nlp-einstieg.md`). Zwei bis drei Leute lesen ihn als ihre Daily Paper. Danach: Hat die Reihenfolge geholfen?

## Offene Fragen

- Wie lang darf ein Pfad sein, bevor er abschreckt? 5? 10?
- Klassiker sind oft lang und schwer. Hier helfen besonders die verständliche Zusammenfassung ([003](003-verstaendliche-zusammenfassung.md)) und die Lesehilfe ([002](002-lesehilfe-fachbegriffe.md)).
- Muss jeder Schritt ein ganzes Paper sein, oder reicht auch ein Blogpost oder Video als Einstieg?
