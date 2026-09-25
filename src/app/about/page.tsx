import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSiteContent } from "@/lib/site-store";

export const metadata = { title: "About" };

export const dynamic = "force-dynamic";

export default async function AboutPage({ searchParams }: { searchParams: Promise<{ draft?: string }> }) {
  const { about } = await getSiteContent((await searchParams).draft === "1");
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="content-page">
        <header className="content-hero">
          <p className="eyebrow">ABOUT / THE ENGINEER</p>
          <h1>{about.title}</h1>
          <p className="content-lead">{about.lead}</p>
        </header>

        <section className="content-section about-story" aria-labelledby="about-story-title">
          <div>
            <p className="eyebrow">MY APPROACH</p>
            <h2 id="about-story-title">{about.approachTitle}</h2>
          </div>
          <div className="prose-copy">
            {about.approachParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <Link className="text-link" href="/projects">Explore the work <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="content-section" aria-labelledby="principles-title">
          <div className="section-heading">
            <p className="eyebrow">ENGINEERING PRINCIPLES</p>
            <h2 id="principles-title">What I try to make explicit.</h2>
          </div>
          <div className="editorial-grid">
            {about.principles.map((principle, index) => (
              <article className="editorial-card" key={index}>
                <span className="card-index">{principle.number || String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" aria-labelledby="experience-title">
          <div className="section-heading">
            <p className="eyebrow">EXPERIENCE</p>
            <h2 id="experience-title">Working across AI and backend engineering.</h2>
          </div>
          <article className="experience-entry">
            <div>
              <h3>{about.experience.role}</h3>
              <p>{about.experience.company}</p>
            </div>
            <div>
              <span>{about.experience.period}</span>
              <p>{about.experience.description}</p>
            </div>
          </article>
        </section>

        <section className="content-section" aria-labelledby="capabilities-title">
          <div className="section-heading">
            <p className="eyebrow">WORKING TOOLKIT</p>
            <h2 id="capabilities-title">The areas I keep returning to.</h2>
          </div>
          <div className="capability-list">
            {about.capabilities.map((capability, index) => (
              <div className="capability-row" key={index}>
                <h3>{capability.title}</h3>
                <p>{capability.items}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="page-cta">
          <p className="eyebrow">LET&apos;S CONNECT</p>
          <h2>Working on a problem in this space?</h2>
          <p>I&apos;m always interested in thoughtful conversations about systems, products, and the details that make them dependable.</p>
          <Link className="primary-button" href="/contact">Get in touch <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
