"use client";

import { Component, Suspense, useCallback, useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { explain } from "@/app/actions";
import type { GlossaryEntry } from "@/lib/db";

// Must be set in the module that renders <Document> (react-pdf docs).
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const PAGE_RATIO = 1.294; // letter/A4 height ÷ width, for placeholders before a page renders
const ZOOMS = [0.75, 1, 1.25, 1.5, 2];

class PdfErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p className="error">Das PDF konnte nicht geladen werden. Versuch es über „PDF öffnen“ auf der Paper-Seite.</p>
    ) : (
      this.props.children
    );
  }
}

type Selected = { text: string; context: string; x: number; y: number };
type Explained = (GlossaryEntry & { pending?: false }) | { term: string; pending: true; error?: string };

function LazyPage({
  pageNumber,
  width,
  onVisible,
}: {
  pageNumber: number;
  width: number;
  onVisible: (page: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Render pages shortly before they scroll into view, then keep them.
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setRender(true), { rootMargin: "800px 0px" });
    // Track which page is in the middle of the screen for "remember position".
    const current = new IntersectionObserver(([e]) => e.isIntersecting && onVisible(pageNumber), {
      rootMargin: "-50% 0px -50% 0px",
    });
    near.observe(el);
    current.observe(el);
    return () => {
      near.disconnect();
      current.disconnect();
    };
  }, [pageNumber, onVisible]);

  return (
    <div
      ref={ref}
      className="pdf-page"
      data-page={pageNumber}
      style={render ? undefined : { width, height: width * PAGE_RATIO }}
    >
      {render && (
        <Suspense fallback={<div style={{ height: width * PAGE_RATIO }} />}>
          <Page pageNumber={pageNumber} width={width} />
        </Suspense>
      )}
    </div>
  );
}

export function Reader({ paperId }: { paperId: string }) {
  const storageKey = `rtfp:page:${paperId}`;
  const viewerRef = useRef<HTMLDivElement>(null);
  const [baseWidth, setBaseWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Selected | null>(null);
  const [answers, setAnswers] = useState<Explained[]>([]);
  const [, startTransition] = useTransition();

  // Fit pages to the viewer width.
  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBaseWidth(Math.min(e.contentRect.width - 2, 1000)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The "explain" button is positioned in viewport coordinates, so drop it on scroll.
  useEffect(() => {
    const hide = () => setSelected(null);
    window.addEventListener("scroll", hide, { passive: true });
    return () => window.removeEventListener("scroll", hide);
  }, []);

  const onVisible = useCallback(
    (p: number) => {
      setPage(p);
      try {
        localStorage.setItem(storageKey, String(p));
      } catch {
        // storage unavailable (private mode): just don't remember
      }
    },
    [storageKey],
  );

  function onLoad({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    let saved = 1;
    try {
      saved = Number(localStorage.getItem(storageKey) ?? 1);
    } catch {}
    if (saved > 1 && saved <= numPages) {
      requestAnimationFrame(() =>
        viewerRef.current?.querySelector(`[data-page="${saved}"]`)?.scrollIntoView({ block: "start" }),
      );
    }
  }

  function onPointerUp() {
    const sel = window.getSelection();
    const text = sel?.toString().replace(/\s+/g, " ").trim() ?? "";
    if (!sel || sel.rangeCount === 0 || !text || text.length > 300) {
      setSelected(null);
      return;
    }
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const layer = (range.startContainer.parentElement ?? null)?.closest(".textLayer");
    const pageText = layer?.textContent?.replace(/\s+/g, " ") ?? "";
    const at = pageText.indexOf(text);
    const context = at >= 0 ? pageText.slice(Math.max(0, at - 250), at + text.length + 250) : "";
    setSelected({ text, context, x: rect.left + rect.width / 2, y: rect.top });
  }

  function explainSelection() {
    if (!selected) return;
    const { text, context } = selected;
    setSelected(null);
    window.getSelection()?.removeAllRanges();
    setAnswers((a) => [{ term: text, pending: true }, ...a]);
    startTransition(async () => {
      const res = await explain(paperId, text, context);
      setAnswers((a) =>
        a.map((item) =>
          item.pending && item.term === text
            ? res.ok
              ? res.data
              : { term: text, pending: true, error: res.error }
            : item,
        ),
      );
    });
  }

  const width = Math.round(baseWidth * zoom);

  return (
    <div className="reader-body">
      <div className="reader-main">
        <div className="reader-toolbar">
          <span className="muted small">
            Seite {page} / {numPages || "…"}
          </span>
          <span className="row">
            <button
              className="secondary"
              onClick={() => setZoom(ZOOMS[Math.max(0, ZOOMS.indexOf(zoom) - 1)])}
              disabled={zoom === ZOOMS[0]}
              aria-label="Verkleinern"
            >
              −
            </button>
            <button
              className="secondary"
              onClick={() => setZoom(ZOOMS[Math.min(ZOOMS.length - 1, ZOOMS.indexOf(zoom) + 1)])}
              disabled={zoom === ZOOMS[ZOOMS.length - 1]}
              aria-label="Vergrößern"
            >
              +
            </button>
          </span>
        </div>
        <div className="pdf-viewer" ref={viewerRef} onPointerUp={onPointerUp}>
          {baseWidth > 0 && (
            <PdfErrorBoundary>
              <Suspense fallback={<p className="muted loading">PDF wird geladen …</p>}>
                <Document file={`/api/pdf/${paperId}`} onLoadSuccess={onLoad}>
                  {Array.from({ length: numPages }, (_, i) => (
                    <LazyPage key={i + 1} pageNumber={i + 1} width={width} onVisible={onVisible} />
                  ))}
                </Document>
              </Suspense>
            </PdfErrorBoundary>
          )}
        </div>
      </div>

      <aside className="reader-side">
        <h2>Hängen geblieben?</h2>
        <p className="muted small">
          Markiere im PDF einen Begriff, ein Wort oder einen Satz und klick auf „Erklär mir das“. Alles landet in deinem
          Glossar.
        </p>
        {answers.map((a, i) => (
          <div key={`${a.term}-${i}`} className="answer">
            <strong>{a.term}</strong>
            {a.pending ? (
              a.error ? (
                <p className="error">{a.error}</p>
              ) : (
                <p className="muted loading">Claude erklärt …</p>
              )
            ) : (
              <>
                {a.translation && <span className="muted"> · 🇩🇪 {a.translation}</span>}
                <p>{a.explanation}</p>
              </>
            )}
          </div>
        ))}
      </aside>

      {selected && (
        <button
          className="explain-pop"
          style={{ left: selected.x, top: selected.y }}
          onPointerDown={(e) => e.preventDefault()}
          onClick={explainSelection}
        >
          💡 Erklär mir das
        </button>
      )}
    </div>
  );
}
