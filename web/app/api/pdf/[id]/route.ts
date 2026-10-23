import fs from "node:fs/promises";
import path from "node:path";
import { pdfUrl } from "@/lib/arxiv";
import { config } from "@/lib/config";
import { readDb } from "@/lib/db";
import { loadPath } from "@/lib/paths";
import { currentUser } from "@/lib/session";

// Serves arXiv PDFs from our own origin so the in-app reader (pdf.js) can load
// them. Only open-access arXiv papers from a reading path, cached next to the
// JSON db. Never use this for licensed PDFs (see ideas/008).
const cacheDir = path.join(path.dirname(config.dataFile), "pdfs");

export async function GET(_request: Request, ctx: RouteContext<"/api/pdf/[id]">) {
  if (!(await currentUser())) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  const inPath = (await loadPath()).entries.some((e) => e.arxivId === id);
  if (!inPath && !(await readDb()).papers[id]) return new Response("Not found", { status: 404 });

  const file = path.join(cacheDir, `${id.replace(/[^\w.-]/g, "_")}.pdf`);
  let pdf: Buffer;
  try {
    pdf = await fs.readFile(file);
  } catch {
    const res = await fetch(pdfUrl(id));
    if (!res.ok || !res.headers.get("content-type")?.includes("pdf")) {
      return new Response("PDF not available from arXiv", { status: 502 });
    }
    pdf = Buffer.from(await res.arrayBuffer());
    await fs.mkdir(cacheDir, { recursive: true });
    await fs.writeFile(file, pdf);
  }

  return new Response(new Uint8Array(pdf), {
    headers: {
      "content-type": "application/pdf",
      "cache-control": "private, max-age=86400",
    },
  });
}
