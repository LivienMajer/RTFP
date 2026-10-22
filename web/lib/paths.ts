import fs from "node:fs/promises";
import path from "node:path";
import { config } from "./config";

export type PathEntry = { title: string; arxivId: string; why: string };
export type ReadingPath = { slug: string; title: string; entries: PathEntry[] };

// Matches lines like:
// 1. [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — Warum hier: ...
const ENTRY = /^\s*\d+\.\s+\[(.+?)\]\(https?:\/\/arxiv\.org\/(?:abs|pdf)\/([^)\s]+?)(?:v\d+)?(?:\.pdf)?\)\s*(?:[—–-]\s*(.*))?$/;

export function parsePath(slug: string, markdown: string): ReadingPath {
  const lines = markdown.split(/\r?\n/);
  const heading = lines.find((l) => l.startsWith("# "));
  const entries: PathEntry[] = [];
  for (const line of lines) {
    const m = ENTRY.exec(line);
    if (m) entries.push({ title: m[1], arxivId: m[2], why: (m[3] ?? "").trim() });
  }
  return { slug, title: heading ? heading.slice(2).trim() : slug, entries };
}

export async function loadPath(slug = config.activePath): Promise<ReadingPath> {
  const file = path.join(config.pathsDir, `${slug}.md`);
  return parsePath(slug, await fs.readFile(file, "utf8"));
}
