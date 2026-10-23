import { notFound } from "next/navigation";
import { saveNote } from "@/app/actions";
import { absUrl, getPaper, pdfUrl } from "@/lib/arxiv";
import { readDb } from "@/lib/db";
import { loadPath } from "@/lib/paths";
import { requireUser } from "@/lib/session";
import { IntroPanel } from "./intro-panel";
import { Quiz } from "./quiz";
import { TermHelper } from "./term-helper";

export default async function PaperPage({ params }: PageProps<"/paper/[id]">) {
  const user = await requireUser();
  const { id } = await params;
  const entry = (await loadPath()).entries.find((e) => e.arxivId === id);
  const known = (await readDb()).papers[id];
  // Only papers from a reading path, so nobody triggers Claude calls on arbitrary IDs.
  if (!entry && !known) notFound();

  const paper = await getPaper(id, entry?.title);
  const db = await readDb();
  const note = db.notes[user]?.[id];
  const myReads = db.reads.filter((r) => r.user === user && r.paperId === id);
  const others = Object.entries(db.notes)
    .filter(([u, notes]) => u !== user && notes[id])
    .map(([u, notes]) => ({ user: u, ...notes[id] }));

  return (
    <>
      <section className="card">
        <p className="eyebrow">
          <a href={absUrl(id)} target="_blank" rel="noreferrer">
            arXiv:{id}
          </a>
          {paper.published && ` · ${paper.published.slice(0, 4)}`}
          {myReads.length > 0 && " · ✅ gelesen"}
        </p>
        <h1>{paper.title}</h1>
        {paper.authors.length > 0 && <p className="muted">{paper.authors.join(", ")}</p>}
        {entry?.why && <p className="why">💡 {entry.why}</p>}
        <div className="row">
          <a href={pdfUrl(id)} target="_blank" rel="noreferrer" className="button">
            📄 PDF öffnen
          </a>
        </div>
      </section>

      <IntroPanel paperId={id} initial={paper.intro ?? null} abstract={paper.abstract} />

      <TermHelper paperId={id} />

      <Quiz paperId={id} />

      <section className="card">
        <h2>Deine Notizen</h2>
        <form action={saveNote.bind(null, id)} className="stack">
          <label>
            Was nimmst du mit? (1–3 Sätze)
            <textarea name="takeaway" rows={3} defaultValue={note?.takeaway} />
          </label>
          <label>
            Welche Frage ist offen geblieben?
            <textarea name="question" rows={2} defaultValue={note?.question} />
          </label>
          <button>Speichern</button>
        </form>
        {others.length > 0 && (
          <div className="others">
            <h3>Das haben die anderen notiert</h3>
            {others.map((o) => (
              <blockquote key={o.user}>
                <strong>{o.user}:</strong> {o.takeaway}
                {o.question && <em> Offene Frage: {o.question}</em>}
              </blockquote>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
