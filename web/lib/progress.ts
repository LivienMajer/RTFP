import { config } from "./config";
import { addDays, dayKey, weekStart } from "./dates";
import type { Db } from "./db";
import type { ReadingPath } from "./paths";

export type Progress = {
  user: string;
  readToday: boolean;
  streak: number;
  thisWeek: number;
  weeklyGoal: number;
  current: { arxivId: string; title: string; why: string; position: number } | null;
  pathLength: number;
};

// Forgiving streak (see ideas/004 and interview SL): one missed day per
// calendar week is covered automatically, and today still counts as open.
export function streak(days: Set<string>, today = dayKey()): number {
  let count = 0;
  const freezeUsed = new Set<string>();
  let cursor = days.has(today) ? today : addDays(today, -1);
  const earliest = [...days].sort()[0];
  while (earliest && cursor >= earliest) {
    if (days.has(cursor)) {
      count++;
    } else {
      const week = weekStart(cursor);
      if (freezeUsed.has(week)) break;
      freezeUsed.add(week);
    }
    cursor = addDays(cursor, -1);
  }
  return count;
}

export function progressFor(db: Db, user: string, path: ReadingPath): Progress {
  const reads = db.reads.filter((r) => r.user === user);
  const days = new Set(reads.map((r) => r.date));
  const today = dayKey();
  const monday = weekStart(today);
  const done = new Set(reads.map((r) => r.paperId));
  const index = path.entries.findIndex((e) => !done.has(e.arxivId));
  const entry = index >= 0 ? path.entries[index] : null;

  return {
    user,
    readToday: days.has(today),
    streak: streak(days, today),
    thisWeek: [...days].filter((d) => d >= monday && d <= today).length,
    weeklyGoal: config.weeklyGoal,
    current: entry ? { ...entry, position: index + 1 } : null,
    pathLength: path.entries.length,
  };
}
