"use client";

import { useEffect, useRef, useState } from "react";
import { loadIntro } from "@/app/actions";
import type { Intro } from "@/lib/db";

export function IntroPanel({
  paperId,
  initial,
  abstract,
}: {
  paperId: string;
  initial: Intro | null;
  abstract: string;
}) {
  const [intro, setIntro] = useState(initial);
  const [error, setError] = useState("");
  const [showAbstract, setShowAbstract] = useState(false);

  // Ref instead of effect cleanup: React dev mode runs effects twice, which
  // would otherwise send two paid Claude requests.
  const requested = useRef(false);
  useEffect(() => {
    if (intro || requested.current) return;
    requested.current = true;
    loadIntro(paperId).then((res) => {
      if (res.ok) setIntro(res.data);
      else setError(res.error);
    });
  }, [paperId, intro]);

  return (
    <section className="card">
      <h2>Einfach erklärt</h2>
      {!intro && !error && <p className="muted loading">Claude liest das Paper und schreibt eine Einführung …</p>}
      {error && <p className="error">{error}</p>}
      {intro && (
        <>
          <p className="muted small">
            ⏱️ ca. {intro.lesezeitMinuten} min für das ganze Paper · Schwierigkeit {"●".repeat(intro.schwierigkeit)}
            {"○".repeat(5 - intro.schwierigkeit)}
          </p>
          <h3>Worum geht&apos;s?</h3>
          <p>{intro.worumGehts}</p>
          <h3>Warum ist das wichtig?</h3>
          <p>{intro.warumWichtig}</p>
          <h3>Was ist neu?</h3>
          <p>{intro.wasIstNeu}</p>
          {intro.voraussetzungen.length > 0 && (
            <>
              <h3>Gut, wenn du das schon kennst</h3>
              <ul>
                {intro.voraussetzungen.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </>
          )}
          {intro.fachbegriffe.length > 0 && (
            <details>
              <summary>Wichtige Fachbegriffe ({intro.fachbegriffe.length})</summary>
              <dl>
                {intro.fachbegriffe.map((f) => (
                  <div key={f.begriff}>
                    <dt>{f.begriff}</dt>
                    <dd>{f.erklaerung}</dd>
                  </div>
                ))}
              </dl>
            </details>
          )}
        </>
      )}
      {abstract && (
        <p>
          <button className="link" onClick={() => setShowAbstract((s) => !s)}>
            {showAbstract ? "Original-Abstract ausblenden" : "Original-Abstract zeigen"}
          </button>
        </p>
      )}
      {showAbstract && <p className="abstract">{abstract}</p>}
    </section>
  );
}
