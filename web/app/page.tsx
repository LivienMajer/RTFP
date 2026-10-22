import Link from "next/link";
import { getPaper } from "@/lib/arxiv";
import { config } from "@/lib/config";
import { readDb } from "@/lib/db";
import { loadPath } from "@/lib/paths";
import { progressFor } from "@/lib/progress";
import { requireUser } from "@/lib/session";

export default async function TodayPage() {
  const user = await requireUser();
  const path = await loadPath();
  const db = await readDb();
  const group = config.users.map((u) => progressFor(db, u, path));
  const mine = group.find((p) => p.user === user)!;
  const paper = mine.current ? await getPaper(mine.current.arxivId, mine.current.title) : null;

  return (
    <>
      <section className="card">
        <p className="eyebrow">
          {path.title} · Paper {mine.current?.position ?? path.entries.length} von {mine.pathLength}
        </p>
        {paper && mine.current ? (
          <>
            <h1>{paper.title}</h1>
            {paper.authors.length > 0 && (
              <p className="muted">
                {paper.authors.slice(0, 4).join(", ")}
                {paper.authors.length > 4 && " u. a."} {paper.published && `· ${paper.published.slice(0, 4)}`}
              </p>
            )}
            {mine.current.why && <p className="why">💡 {mine.current.why}</p>}
            <p>
              {mine.readToday ? (
                <span className="done">✅ Heute schon gelesen, stark! Das hier ist dein nächstes.</span>
              ) : (
                "Das ist dein Paper für heute."
              )}
            </p>
            <Link href={`/paper/${paper.id}`} className="button big">
              Los geht&apos;s →
            </Link>
          </>
        ) : (
          <h1>🎉 Pfad abgeschlossen! Zeit für einen neuen Lernpfad.</h1>
        )}
      </section>

      <section className="card">
        <h2>Deine Woche</h2>
        <div className="stats">
          <div>
            <strong>{mine.streak}</strong>
            <span>Tage Streak 🔥</span>
          </div>
          <div>
            <strong>
              {mine.thisWeek}/{mine.weeklyGoal}
            </strong>
            <span>Tage diese Woche</span>
          </div>
        </div>
        <p className="muted small">Ein verpasster Tag pro Woche lässt die Streak nicht reißen.</p>
      </section>

      <section className="card">
        <h2>Die Gruppe heute</h2>
        <ul className="group">
          {group.map((p) => (
            <li key={p.user}>
              <span>{p.readToday ? "✅" : "⏳"}</span>
              <strong>{p.user}</strong>
              <span className="muted">
                {p.streak} 🔥 · {p.thisWeek}/{p.weeklyGoal} diese Woche
                {p.current && ` · bei Paper ${p.current.position}`}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
