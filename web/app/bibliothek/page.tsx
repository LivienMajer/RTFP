import Link from "next/link";
import { readDb } from "@/lib/db";
import { requireUser } from "@/lib/session";

export default async function LibraryPage() {
  await requireUser();
  const db = await readDb();
  const readers = new Map<string, Set<string>>();
  for (const r of db.reads) {
    if (!readers.has(r.paperId)) readers.set(r.paperId, new Set());
    readers.get(r.paperId)!.add(r.user);
  }
  const papers = [...readers.keys()].map((id) => db.papers[id]).filter(Boolean);

  return (
    <section className="card">
      <h1>Bibliothek</h1>
      <p className="muted small">Alle Paper, die jemand aus der Gruppe gelesen hat, mit euren Notizen und offenen Fragen.</p>
      {papers.length === 0 && <p>Noch nichts gelesen. Das ändert sich heute 😉</p>}
      {papers.map((p) => (
        <article key={p.id} className="libitem">
          <h2>
            <Link href={`/paper/${p.id}`}>{p.title}</Link>
          </h2>
          <p className="muted small">Gelesen von {[...readers.get(p.id)!].join(", ")}</p>
          {Object.entries(db.notes)
            .filter(([, notes]) => notes[p.id])
            .map(([user, notes]) => (
              <blockquote key={user}>
                <strong>{user}:</strong> {notes[p.id].takeaway}
                {notes[p.id].question && <em> ❓ {notes[p.id].question}</em>}
              </blockquote>
            ))}
        </article>
      ))}
    </section>
  );
}
