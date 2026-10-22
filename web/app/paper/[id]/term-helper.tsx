"use client";

import { useState, useTransition } from "react";
import { explain } from "@/app/actions";
import type { GlossaryEntry } from "@/lib/db";

export function TermHelper({ paperId }: { paperId: string }) {
  const [answers, setAnswers] = useState<GlossaryEntry[]>([]);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    const term = String(formData.get("term") ?? "");
    const context = String(formData.get("context") ?? "");
    setError("");
    startTransition(async () => {
      const res = await explain(paperId, term, context);
      if (res.ok) setAnswers((a) => [res.data, ...a]);
      else setError(res.error);
    });
  }

  return (
    <section className="card">
      <h2>Hängen geblieben?</h2>
      <p className="muted small">
        Begriff, englisches Wort oder Satz eingeben. Die Erklärung bezieht sich auf dieses Paper und landet in deinem
        Glossar.
      </p>
      <form action={onSubmit} className="stack">
        <input name="term" placeholder="z. B. „self-attention“ oder „to alleviate“" required />
        <textarea name="context" rows={2} placeholder="Optional: der Satz, in dem es vorkommt" />
        <button disabled={pending}>{pending ? "Claude erklärt …" : "Erklär mir das"}</button>
      </form>
      {error && <p className="error">{error}</p>}
      {answers.map((a) => (
        <div key={a.at} className="answer">
          <strong>{a.term}</strong>
          {a.translation && <span className="muted"> · 🇩🇪 {a.translation}</span>}
          <p>{a.explanation}</p>
        </div>
      ))}
    </section>
  );
}
