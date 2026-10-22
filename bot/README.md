# RTFP Discord-Bot

Der tägliche Auslöser (Barriere B7) und die Kontrolle durch die Gruppe (B4):

- **Lesezeit-Erinnerung** zur festen Uhrzeit (`REMINDER_TIME`) mit dem Stand aller und Links zu den Papern
- **Späte Erinnerung** (`LATE_REMINDER_TIME`) nur an die, die noch nicht gelesen haben
- **Erfolgsmeldung**, sobald jemand ein Quiz besteht: „✅ Daniel hat BERT gelesen · 6 🔥“
- **`/heute`**: Wer hat heute schon gelesen?

Der Bot liest alles von der Web-App (`/api/bot/status`), er hat keine eigene Datenbank.

## Einrichten

1. Auf https://discord.com/developers/applications eine App anlegen, unter **Bot** einen Token erzeugen.
2. Unter **OAuth2 → URL Generator** die Scopes `bot` und `applications.commands` und die Berechtigung „Send Messages“ wählen. Mit dem Link den Bot auf euren Server einladen.
3. In Discord den Entwicklermodus einschalten, dann Server-ID, Channel-ID und eure User-IDs per Rechtsklick kopieren.
4. Konfiguration anlegen und starten:

```bash
cd bot
npm install
cp .env.example .env   # Werte eintragen, RTFP_BOT_TOKEN = derselbe wie in web/.env.local
npm start
```

Die Web-App muss laufen und unter `RTFP_URL` erreichbar sein. Node 24 führt die TypeScript-Datei direkt aus, ein Build-Schritt ist nicht nötig.
