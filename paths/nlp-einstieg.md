# Einstieg in NLP: von Word Embeddings zu großen Sprachmodellen

Beispielpfad für den Prototyp. Die Reihenfolge baut aufeinander auf. Issue #5 ersetzt oder verbessert ihn.

**Format** (wird von der App gelesen): eine nummerierte Zeile pro Paper, `[Titel](arXiv-Link) — Warum hier`.

1. [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781) — Grundlage: Wörter als Vektoren (Word2Vec). Alles danach baut auf Embeddings auf.
2. [Sequence to Sequence Learning with Neural Networks](https://arxiv.org/abs/1409.3215) — Encoder-Decoder: eine Sequenz rein, eine andere raus. Das Grundgerüst für Übersetzung.
3. [Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473) — Erste Attention: Der Decoder schaut gezielt auf passende Stellen der Eingabe.
4. [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — Der Transformer: nur noch Attention, keine Rekurrenz mehr. Basis aller heutigen Sprachmodelle.
5. [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805) — Vortrainieren und dann feintunen: ein Modell für viele Aufgaben.
6. [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) — GPT-3: Mit genug Größe lernt ein Modell neue Aufgaben aus wenigen Beispielen im Prompt.
