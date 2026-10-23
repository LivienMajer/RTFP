import { config } from "@/lib/config";
import { dayKey } from "@/lib/dates";
import { readDb } from "@/lib/db";
import { loadPath } from "@/lib/paths";
import { progressFor } from "@/lib/progress";
import { botUnauthorized } from "../auth";

// Used by the Discord bot: everyone's progress plus reads since `?since=`.
export async function GET(request: Request) {
  const denied = botUnauthorized(request);
  if (denied) return denied;

  const since = new URL(request.url).searchParams.get("since") ?? "";
  const path = await loadPath();
  const db = await readDb();
  const users = config.users.map((u) => progressFor(db, u, path));
  const reads = db.reads
    .filter((r) => r.at > since)
    .map((r) => ({
      ...r,
      title: db.papers[r.paperId]?.title ?? r.paperId,
      streak: users.find((u) => u.user === r.user)?.streak ?? 0,
    }));

  return Response.json({ date: dayKey(), path: path.title, users, reads });
}
