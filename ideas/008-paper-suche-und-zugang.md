# Idee: Paper-Suche und Volltext-Zugang (z. B. über KIT-Account)

- **Von:** @LivienMajer
- **Status:** Entwurf
- **Barriere:** B1 Auswahl, Zugang

## Problem

Man findet ein spannendes Paper und landet dann vor einer Paywall. Oder man muss in fünf verschiedenen Suchmaschinen suchen.

## Vorschlag

**Suche** über mehrere Quellen in einem Suchfeld:
- arXiv, Semantic Scholar, OpenAlex, DBLP (Informatik), Papers with Code
- Filter: Jahr, Venue, Zitationszahl, „Open Access verfügbar“

**Zugang** zum Volltext, in dieser Reihenfolge:
1. Frei verfügbare Version (arXiv, Unpaywall, Autoren-Seite)
2. Über den **Uni-Zugang** (z. B. KIT): Link über den Proxy oder Institutional Login (Shibboleth) der Bibliothek, sodass jede Person sich **selbst** mit dem eigenen Account einloggt
3. Sonst: Hinweis „nicht frei verfügbar“ und ein Link zur Fernleihe

## Wichtig: Lizenzen

- Lizenzierte PDFs, die über den KIT-Zugang geladen werden, dürfen in der Regel **nicht** an andere weitergegeben oder zentral gespeichert werden. Das gilt besonders für Leute, die nicht am KIT sind.
- Massenhaftes, automatisiertes Herunterladen kann den Zugang der ganzen Uni sperren lassen.
- Deshalb: RTFP speichert nur **Metadaten, Links und eigene Notizen**, keine lizenzierten PDFs. Jede Person öffnet den Volltext selbst über den eigenen Zugang.
- Wie der KIT-Zugang genau funktioniert (VPN, Proxy, Shibboleth) und was erlaubt ist, bei der KIT-Bibliothek nachfragen.

## Hypothese

> Wir glauben, dass **ein Klick bis zum Volltext** dazu führt, dass **weniger Leute vor dem Lesen abspringen**. Wir wissen es, wenn **der Anteil „Paper vorgeschlagen, aber nicht geöffnet“ sinkt**.

## Kleinste testbare Version

Bei jedem vorgeschlagenen Paper zwei Links mitposten: Open-Access-Version (falls vorhanden) und Link über den KIT-Zugang. Beobachten, wie oft ein Paper an fehlendem Zugang scheitert.

## Offene Fragen

- Sind alle in der Gruppe am KIT? Was ist mit Leuten von anderen Unis?
- Eigene Suchmaschine bauen oder bestehende APIs (Semantic Scholar, OpenAlex) nur zusammenführen?
