import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "Now" };

export default function NowPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="content-page">
        <header className="content-hero">
          <p className="eyebrow">NOW / SEPTEMBER 2026</p>
          <h1>Where my attention is going.</h1>
          <p className="content-lead">The projects and questions currently shaping my independent work.</p>
        </header>

        <section className="content-section" aria-label="Current focus">
          <div className="now-list">
            <article className="now-row">
              <span className="card-index">01 / BUILDING</span>
              <div><h2>Trellis</h2><p>Working toward a learning environment where a structured path, scoped AI help, exploration threads, and saved progress stay connected.</p></div>
              <Link className="text-link" href="/projects/trellis">View work ↗</Link>
            </article>
            <article className="now-row">
              <span className="card-index">02 / TESTING</span>
              <div><h2>Nexus</h2><p>Testing the local, single-document research API: ingestion, retrieval, bounded answers, citation snapshots, and explicit insufficient-context responses.</p></div>
              <Link className="text-link" href="/projects/nexus">View work ↗</Link>
            </article>
            <article className="now-row">
              <span className="card-index">03 / MEASURING</span>
              <div><h2>Model reliability</h2><p>Comparing structured-output checkpoints by schema validity and end-to-end usefulness, not by conditional semantic score alone.</p></div>
              <Link className="text-link" href="/projects/agentconfig-evaluation">View work ↗</Link>
            </article>
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
