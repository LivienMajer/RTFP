# Idee: Lese-Check per Quiz

- **Von:** @LivienMajer
- **Status:** Entwurf
- **Barriere:** B4 Motivation, B5 Vergessen

## Problem

Ein Klick auf „gelesen“ beweist nichts. Wenn man Streaks ohne echtes Lesen halten kann, verlieren sie ihren Wert.

## Vorschlag

Nach dem Lesen ein **kurzes, gezieltes Quiz** (3–5 Fragen), das man bestehen muss, damit der Tag zählt.

- Fragen zum Kern-Beitrag, nicht zu Details („Welche Zahl stand in Tabelle 3?“)
- Mischung aus Multiple Choice und einer offenen Frage („Erkläre in einem Satz …“), die per LLM bewertet wird
- Fragen passen zum Leselevel (Zusammenfassung → leichter, Deep Read → tiefer)
- Falsche Antworten → kurze Erklärung, was gemeint war (Lerneffekt)
- Später: Fragen wiederholen sich nach Tagen oder Wochen (Spaced Repetition), damit man weniger vergisst

## Hypothese

> Wir glauben, dass **ein Quiz nach dem Lesen** dazu führt, dass **Leute aufmerksamer lesen und sich mehr merken**. Wir wissen es, wenn **Leute sich nach einer Woche an mehr Kernaussagen erinnern** als ohne Quiz.

Gegenhypothese: Das Quiz fühlt sich nach Schule oder Prüfung an und **senkt** die Motivation.

## Kleinste testbare Version

Ein LLM erzeugt zu jedem Paper 5 Fragen, die in der Gruppe gepostet werden. Jeder beantwortet sie. Danach: Wie hat sich das angefühlt?

## Offene Fragen

- Wie streng? Bestehen ab 60 %? Wiederholbar?
- Man kann das Quiz leicht mit einem LLM beantworten lassen. Ist das schlimm, wenn es nur um uns selbst geht?
- Alternative oder Ergänzung: eigene Zusammenfassung schreiben statt Quiz?
