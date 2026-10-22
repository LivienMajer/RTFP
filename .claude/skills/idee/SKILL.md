---
name: idee
description: Legt aus einer kurzen Beschreibung eine neue ausgearbeitete Idee in ideas/ an. Verwenden, wenn jemand eine neue Idee für RTFP festhalten will.
---

# Neue Idee anlegen

Aus der Beschreibung des Users (Argumente oder letzte Nachricht) eine Ideen-Datei machen.

1. `git pull`, damit die Nummerierung aktuell ist.
2. Nächste freie Nummer in `ideas/` bestimmen (`NNN`, dreistellig).
3. `ideas/NNN-kurzer-name.md` nach `ideas/_template.md` anlegen:
   - **Von:** GitHub-Name aus `git config user.name` oder nachfragen
   - Passende Barriere(n) B1–B5 aus `research/hypotheses.md`
   - Problem, Vorschlag, messbare Hypothese, kleinste testbare Version **ohne Code**, offene Fragen
   - Kritische Punkte und Risiken ehrlich als offene Fragen aufnehmen
4. Verwandte Ideen in `ideas/` suchen und gegenseitig verlinken („Erweitert: …“).
5. Zeile in die Tabelle in `ideas/README.md` eintragen. Das Kreislauf-Diagramm nur anpassen, wenn die Idee eindeutig in eine Phase passt.
6. Dem User kurz zeigen, was angelegt wurde, und fragen, ob committet und gepusht werden soll (Commit-Message auf Englisch, z. B. `Add idea NNN: <title>`).
