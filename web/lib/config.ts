import path from "node:path";

// All settings come from web/.env.local (see .env.example).
export const config = {
  users: (process.env.RTFP_USERS ?? "Livien,Daniel,Sebastian")
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean),
  activePath: process.env.RTFP_PATH ?? "nlp-einstieg",
  pathsDir: process.env.RTFP_PATHS_DIR ?? path.join(process.cwd(), "..", "paths"),
  dataFile: process.env.RTFP_DATA_FILE ?? path.join(process.cwd(), "data", "db.json"),
  timeZone: process.env.RTFP_TIMEZONE ?? "Europe/Berlin",
  weeklyGoal: Number(process.env.RTFP_WEEKLY_GOAL ?? 5),
  botToken: process.env.RTFP_BOT_TOKEN ?? "",
  model: "claude-opus-5-5",
};
