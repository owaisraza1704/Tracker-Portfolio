import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSiteContent } from "@/lib/site-store";

export const metadata = { title: "Now" };

export const dynamic = "force-dynamic";

export default async function NowPage({ searchParams }: { searchParams: Promise<{ draft?: string }> }) {
  const { now } = await getSiteContent((await searchParams).draft === "1");
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="content-page">
        <header className="content-hero">
          <p className="eyebrow">NOW / SEPTEMBER 2026</p>
          <h1>{now.title}</h1>
          <p className="content-lead">{now.lead}</p>
        </header>

        <section className="content-section" aria-label="Current focus">
          <div className="now-list">
            {now.focus.map((item, index) => (
              <article className="now-row" key={index}>
                <span className="card-index">{item.label}</span>
                <div><h2>{item.title}</h2><p>{item.description}</p></div>
                <Link className="text-link" href={item.href as `/projects/${string}`}>View work ↗</Link>
              </article>
            ))}
          </div>
        </section>
        <section className="page-cta">
          <p className="eyebrow">ALSO EXPLORING</p>
          <h2>Agent interfaces and live workflows.</h2>
          <p>Voyage and Rezolve explore how people interact with stateful systems when the next action matters as much as the answer.</p>
          <Link className="primary-button" href="/projects">See all work <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
