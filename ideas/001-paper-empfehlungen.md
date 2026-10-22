# Idee: Personalisierte Paper-Empfehlungen

- **Von:** @LivienMajer
- **Status:** Entwurf
- **Barriere:** B1 Auswahl

## Problem

Wer nicht weiß, was er lesen soll, liest gar nicht. Zufällige oder generische Paper interessieren einen nicht, und dann fehlt die Motivation.

## Vorschlag

Jeden Tag ein Paper (oder 2–3 zur Auswahl), das **wirklich zu meinen Interessen passt**.

Mögliche Signale:
- Interessen beim Onboarding (Themen, Kurse, Lieblingspaper)
- Was ich bisher gelesen und bewertet habe (👍/👎, „zu schwer“)
- Was meine Freunde gelesen haben („3 aus deiner Gruppe haben das gelesen“)
- Zitationsnetz: Paper, die meine gelesenen Paper zitieren oder von ihnen zitiert werden

Mögliche Quellen: arXiv API, Semantic Scholar API (inkl. Empfehlungs-Endpoint), Papers with Code, OpenAlex.

## Hypothese

> Wir glauben, dass **passende Vorschläge** dazu führen, dass **mehr Leute am Tag überhaupt anfangen zu lesen**. Wir wissen es, wenn **die Quote „Vorschlag geöffnet → gelesen“ steigt**.

## Kleinste testbare Version

Ohne Algorithmus: Jede Person nennt 3 Interessensgebiete, eine Person kuratiert pro Woche pro Gebiet eine Liste. Danach vergleichen: Wird mehr gelesen als bei einer zufälligen Auswahl?

## Offene Fragen

- Kaltstart: Was empfehlen wir am ersten Tag?
- Wie verhindern wir eine Filterblase? Ab und zu ein „Wildcard“-Paper?
- Klassiker (z. B. „Attention Is All You Need“) oder aktuelle Paper?
