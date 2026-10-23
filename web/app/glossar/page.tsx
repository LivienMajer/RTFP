import Link from "next/link";
import { readDb } from "@/lib/db";
import { requireUser } from "@/lib/session";

export default async function GlossaryPage() {
  const user = await requireUser();
  const db = await readDb();
  const entries = [...(db.glossary[user] ?? [])].reverse();

  return (
    <section className="card">
      <h1>Dein Glossar</h1>
      <p className="muted small">Alles, was du beim Lesen nachgeschlagen hast, damit es nicht direkt wieder weg ist.</p>
      {entries.length === 0 && <p>Noch leer. Nutze „Hängen geblieben?“ auf einer Paper-Seite.</p>}
      <dl>
        {entries.map((e) => (
          <div key={e.at}>
            <dt>
              {e.term}
              {e.translation && <span className="muted"> · 🇩🇪 {e.translation}</span>}
            </dt>
            <dd>
              {e.explanation}{" "}
              <Link href={`/paper/${e.paperId}`} className="muted small">
                ({db.papers[e.paperId]?.title ?? e.paperId})
              </Link>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
