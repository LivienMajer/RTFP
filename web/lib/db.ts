import fs from "node:fs/promises";
import path from "node:path";
import { config } from "./config";

// Prototype storage: one JSON file, written atomically. Good enough for a
// handful of users on one server; swap for SQLite/Postgres before hosting.

export type Intro = {
  worumGehts: string;
  warumWichtig: string;
  wasIstNeu: string;
  voraussetzungen: string[];
  lesezeitMinuten: number;
  schwierigkeit: number;
  fachbegriffe: { begriff: string; erklaerung: string }[];
};

export type QuizQuestion = {
  frage: string;
  optionen: string[];
  richtigeAntwort: number;
  erklaerung: string;
};

export type Level = "kurz" | "ganz";

export type Paper = {
  id: string; // arXiv id, e.g. "1706.03762"
  title: string;
  authors: string[];
  abstract: string;
  published: string;
  intro?: Intro;
  quizzes?: Partial<Record<Level, QuizQuestion[]>>;
};

export type Read = {
  user: string;
  paperId: string;
  date: string; // YYYY-MM-DD in config.timeZone
  level: Level;
  score: number;
  total: number;
  at: string; // ISO timestamp
};

export type Note = { takeaway: string; question: string; updatedAt: string };

export type GlossaryEntry = {
  term: string;
  explanation: string;
  translation: string;
  paperId: string;
  at: string;
};

export type Db = {
  papers: Record<string, Paper>;
  reads: Read[];
  notes: Record<string, Record<string, Note>>;
  glossary: Record<string, GlossaryEntry[]>;
};

const empty: Db = { papers: {}, reads: [], notes: {}, glossary: {} };

let queue: Promise<unknown> = Promise.resolve();

export async function readDb(): Promise<Db> {
  try {
    const raw = await fs.readFile(config.dataFile, "utf8");
    return { ...empty, ...JSON.parse(raw) };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return structuredClone(empty);
    throw err;
  }
}

// Serializes read-modify-write cycles so concurrent requests don't clobber each other.
export function updateDb<T>(fn: (db: Db) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const db = await readDb();
    const result = await fn(db);
    await fs.mkdir(path.dirname(config.dataFile), { recursive: true });
    const tmp = `${config.dataFile}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(db, null, 2));
    await fs.rename(tmp, config.dataFile);
    return result;
  });
  queue = run.catch(() => {});
  return run;
}
