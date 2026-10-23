"use client";

import dynamic from "next/dynamic";

// pdf.js needs the browser (canvas, workers), so skip SSR for the reader.
const Reader = dynamic(() => import("./reader").then((m) => m.Reader), {
  ssr: false,
  loading: () => <p className="muted loading">Reader wird geladen …</p>,
});

export function ReaderLoader({ paperId }: { paperId: string }) {
  return <Reader paperId={paperId} />;
}
