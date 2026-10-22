import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "./actions";
import { currentUser } from "@/lib/session";
import "./globals.css";

export const metadata: Metadata = {
  title: "RTFP",
  description: "Read The F***ing Paper: jeden Tag ein Paper, gemeinsam.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await currentUser();
  return (
    <html lang="de">
      <body>
        <header className="topbar">
          <Link href="/" className="brand">
            RTFP <span>📄</span>
          </Link>
          {user && (
            <nav>
              <Link href="/">Heute</Link>
              <Link href="/bibliothek">Bibliothek</Link>
              <Link href="/glossar">Glossar</Link>
              <form action={logout}>
                <button className="link" title="Abmelden">
                  {user} ↩
                </button>
              </form>
            </nav>
          )}
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
