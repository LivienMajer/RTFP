import { config } from "./config";

// YYYY-MM-DD for a moment in the group's time zone.
export function dayKey(d: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: config.timeZone }).format(d);
}

export function addDays(key: string, n: number): string {
  const d = new Date(`${key}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

// Monday of the week containing `key`.
export function weekStart(key: string): string {
  const day = new Date(`${key}T12:00:00Z`).getUTCDay(); // 0 = Sunday
  return addDays(key, -((day + 6) % 7));
}
