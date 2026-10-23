"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { loadQuiz, submitQuiz, type QuizResult, type QuizView } from "@/app/actions";
import type { Level } from "@/lib/db";

const LEVELS: Record<Level, string> = {
  kurz: "Kurz: Einführung + Abstract (~10 min)",
  ganz: "Ganz: das komplette Paper",
};

export function Quiz({ paperId }: { paperId: string }) {
  const router = useRouter();
  const [level, setLevel] = useState<Level | null>(null);
  const [questions, setQuestions] = useState<QuizView | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function start(l: Level) {
    setLevel(l);
    setQuestions(null);
    setResult(null);
    setError("");
    startTransition(async () => {
      const res = await loadQuiz(paperId, l);
      if (res.ok) {
        setQuestions(res.data);
        setAnswers(res.data.map(() => -1));
      } else setError(res.error);
    });
  }

  function submit() {
    if (!level) return;
    startTransition(async () => {
      const res = await submitQuiz(paperId, level, answers);
      if (res.ok) {
        setResult(res.data);
        if (res.data.passed) router.refresh();
      } else setError(res.error);
    });
  }

  return (
    <section className="card" id="quiz">
      <h2>Gelesen? Beweis es 😉</h2>
      <p className="muted small">Wer das Quiz besteht, bekommt den Tag für die Streak. Welches Level hast du gelesen?</p>
      <div className="row">
        {(Object.keys(LEVELS) as Level[]).map((l) => (
          <button key={l} onClick={() => start(l)} disabled={pending} className={l === level ? "" : "secondary"}>
            {LEVELS[l]}
          </button>
        ))}
      </div>
      {pending && !questions && <p className="muted loading">Claude baut dein Quiz …</p>}
      {error && <p className="error">{error}</p>}

      {questions && (
        <ol className="quiz">
          {questions.map((q, i) => {
            const detail = result?.details[i];
            return (
              <li key={i}>
                <p>{q.frage}</p>
                {q.optionen.map((o, j) => {
                  const mark = detail
                    ? j === detail.richtigeAntwort
                      ? "right"
                      : j === answers[i]
                        ? "wrong"
                        : ""
                    : "";
                  return (
                    <label key={j} className={`option ${mark}`}>
                      <input
                        type="radio"
                        name={`q${i}`}
                        checked={answers[i] === j}
                        disabled={!!result}
                        onChange={() => setAnswers((a) => a.map((v, k) => (k === i ? j : v)))}
                      />
                      {o}
                    </label>
                  );
                })}
                {detail && <p className="muted small">{detail.erklaerung}</p>}
              </li>
            );
          })}
        </ol>
      )}

      {questions && !result && (
        <button onClick={submit} disabled={pending || answers.includes(-1)}>
          {pending ? "Wird ausgewertet …" : "Abgeben"}
        </button>
      )}
      {result && (
        <p className={result.passed ? "done" : "error"}>
          {result.score}/{result.total} richtig.{" "}
          {result.passed
            ? "Bestanden! Der Tag zählt für deine Streak 🔥"
            : `Für den Tag brauchst du ${result.needed}. Schau nochmal ins Paper und versuch es erneut.`}
        </p>
      )}
      {result && !result.passed && level && (
        <button className="secondary" onClick={() => start(level)}>
          Nochmal versuchen
        </button>
      )}
    </section>
  );
}
