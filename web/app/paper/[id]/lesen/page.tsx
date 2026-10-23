import Link from "next/link";
import { notFound } from "next/navigation";
import { getPaper } from "@/lib/arxiv";
import { readDb } from "@/lib/db";
import { loadPath } from "@/lib/paths";
import { requireUser } from "@/lib/session";
import { ReaderLoader } from "./reader-loader";

export default async function ReadPage({ params }: PageProps<"/paper/[id]/lesen">) {
  await requireUser();
  const { id } = await params;
  const entry = (await loadPath()).entries.find((e) => e.arxivId === id);
  if (!entry && !(await readDb()).papers[id]) notFound();
  const paper = await getPaper(id, entry?.title);

  return (
    <div className="reader">
      <div className="reader-head">
        <Link href={`/paper/${id}`}>← Zurück</Link>
        <strong>{paper.title}</strong>
        <Link href={`/paper/${id}#quiz`} className="button">
          Fertig? Zum Quiz
        </Link>
      </div>
      <ReaderLoader paperId={id} />
    </div>
  );
}
