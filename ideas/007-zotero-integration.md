# Idee: Zotero-Integration

- **Von:** @LivienMajer
- **Status:** Entwurf
- **Barriere:** B1 Auswahl, B5 Vergessen

## Problem

Viele benutzen Zotero schon als Literaturverwaltung. Ein zweites System, in das man alles doppelt eintragen muss, wird nicht benutzt.

## Vorschlag

RTFP und Zotero arbeiten zusammen statt nebeneinander:
- **Import:** Paper aus meiner Zotero-Bibliothek (oder einer „To Read“-Collection) als Leseliste und Empfehlungsbasis nutzen
- **Export:** Gelesene Paper samt Zusammenfassung, Takeaways und Tags zurück nach Zotero schreiben (als Notiz am Eintrag)
- **Gruppen:** Eine Zotero-Group-Library für die ganze RTFP-Gruppe
- PDF-Annotationen aus Zotero übernehmen (Highlights → Takeaways)

Technisch machbar über die **Zotero Web API** (lesen und schreiben, inkl. Group Libraries, Zugriff über einen API-Key pro Nutzer).

## Hypothese

> Wir glauben, dass **eine Zotero-Anbindung** dazu führt, dass **Leute ihre bestehende Leseliste tatsächlich abarbeiten**. Wir wissen es, wenn **ein relevanter Teil der gelesenen Paper aus Zotero kommt**.

## Kleinste testbare Version

Eine gemeinsame Zotero-Group-Library anlegen und dort zwei Wochen lang Paper und Notizen sammeln. Erst wenn das funktioniert, wird synchronisiert.

## Offene Fragen

- Wie viele aus der Gruppe benutzen Zotero wirklich? (In Interviews fragen!)
- Einweg- oder Zwei-Wege-Synchronisation? Was passiert bei Konflikten?
- Alternativen mitdenken: Mendeley, Paperpile, BibTeX-Datei?
