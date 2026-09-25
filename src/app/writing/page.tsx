import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSiteContent } from "@/lib/site-store";

export const metadata = { title: "Thoughts" };

export const dynamic = "force-dynamic";

export default async function WritingPage({ searchParams }: { searchParams: Promise<{ draft?: string }> }) {
  const draft = (await searchParams).draft === "1";
  const { notes } = await getSiteContent(draft);
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="content-page">
        <header className="content-hero">
          <p className="eyebrow">THOUGHTS / FIELD NOTES</p>
          <h1>Notes from building and measuring.</h1>
          <p className="content-lead">
            Short pieces on decisions and lessons from my projects and small
            experiments: what exists, what remains open, and why a design
            choice matters.
          </p>
        </header>

        <section className="content-section" aria-label="Engineering notes">
          <div className="note-list">
            {notes.map((note, index) => (
              <article className="note-row" key={note.slug}>
                <span className="card-index">0{index + 1}</span>
                <div>
                  <p className="eyebrow">{note.category}</p>
                  <h2><Link href={`/writing/${note.slug}${draft ? "?draft=1" : ""}` as `/writing/${string}`}>{note.title}</Link></h2>
                  <p>{note.summary}</p>
                </div>
                <Link className="note-arrow" href={`/writing/${note.slug}${draft ? "?draft=1" : ""}` as `/writing/${string}`} aria-label={`Read ${note.title}`}>↗</Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
