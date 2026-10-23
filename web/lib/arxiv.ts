import { readDb, updateDb, type Paper } from "./db";

function tag(xml: string, name: string): string {
  const m = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`).exec(xml);
  return m ? decode(m[1].replace(/\s+/g, " ").trim()) : "";
}

function decode(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

export function pdfUrl(id: string) {
  return `https://arxiv.org/pdf/${id}`;
}

export function absUrl(id: string) {
  return `https://arxiv.org/abs/${id}`;
}

// Returns cached metadata, fetching it from the arXiv API on first use.
export async function getPaper(id: string, fallbackTitle = id): Promise<Paper> {
  const cached = (await readDb()).papers[id];
  if (cached) return cached;

  let paper: Paper = { id, title: fallbackTitle, authors: [], abstract: "", published: "" };
  try {
    const res = await fetch(`https://export.arxiv.org/api/query?id_list=${encodeURIComponent(id)}`);
    const xml = await res.text();
    const entry = /<entry>([\s\S]*?)<\/entry>/.exec(xml)?.[1];
    if (res.ok && entry) {
      paper = {
        id,
        title: tag(entry, "title") || fallbackTitle,
        authors: [...entry.matchAll(/<name>([\s\S]*?)<\/name>/g)].map((m) => decode(m[1].trim())),
        abstract: tag(entry, "summary"),
        published: tag(entry, "published").slice(0, 10),
      };
    }
  } catch {
    // Offline or arXiv down: keep the path title and try again next time.
    return paper;
  }

  return updateDb((db) => {
    db.papers[id] = { ...paper, ...db.papers[id] };
    return db.papers[id];
  });
}
