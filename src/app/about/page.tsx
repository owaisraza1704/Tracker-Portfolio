import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const principles = [
  {
    number: "01",
    title: "Make the state visible",
    description: "Whether it is a learner's progress, an agent run, or a support request, I want the system to show where it is and why it moved there.",
  },
  {
    number: "02",
    title: "Keep evidence attached",
    description: "Retrieval and model output are useful only when someone can inspect the source, measure the result, and understand what remains uncertain.",
  },
  {
    number: "03",
    title: "Design for the full workflow",
    description: "I enjoy connecting the model, API, data, interface, and failure path into one experience that a person can actually use.",
  },
];

const capabilities = [
  { title: "AI systems", items: "Agent runtimes, tool use, structured outputs, model evaluation" },
  { title: "Retrieval", items: "Document ingestion, vector search, source grounding, citations" },
  { title: "Backend", items: "Python APIs, data models, PostgreSQL, stateful workflows" },
  { title: "Interfaces", items: "Next.js, React, TypeScript, human and agent interactions" },
];

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="content-page">
        <header className="content-hero">
          <p className="eyebrow">ABOUT / THE ENGINEER</p>
          <h1>Curious about what happens after the model responds.</h1>
          <p className="content-lead">
            I&apos;m Owais Raza, a backend and AI engineer based in Chennai. I build
            systems where models, data, tools, and application state have to work
            together reliably.
          </p>
        </header>

        <section className="content-section about-story" aria-labelledby="about-story-title">
          <div>
            <p className="eyebrow">MY APPROACH</p>
            <h2 id="about-story-title">From an interesting idea to an inspectable system.</h2>
          </div>
          <div className="prose-copy">
            <p>
              My work usually begins with a practical question: what would it take
              for an AI system to help someone complete a real task? That question
              has led me through retrieval, agent execution, learning systems,
              structured model evaluation, and the backend machinery around them.
            </p>
            <p>
              I like breaking a large idea into a small runtime that can be
              exercised and understood. The interface matters, but so do the
              state transitions, stored evidence, failure behavior, and the
              measurements that tell us whether the system is improving.
            </p>
            <Link className="text-link" href="/projects">Explore the work <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="content-section" aria-labelledby="principles-title">
          <div className="section-heading">
            <p className="eyebrow">ENGINEERING PRINCIPLES</p>
            <h2 id="principles-title">What I try to make explicit.</h2>
          </div>
          <div className="editorial-grid">
            {principles.map((principle) => (
              <article className="editorial-card" key={principle.number}>
                <span className="card-index">{principle.number}</span>
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
              <h3>System Engineer</h3>
              <p>Tata Consultancy Services</p>
            </div>
            <div>
              <span>Apr 2024 — Present · Chennai, India</span>
              <p>
                Building and working with LLM-powered systems, backend APIs, and
                production workflows. My public project work explores the same
                questions through independent prototypes and experiments.
              </p>
            </div>
          </article>
        </section>

        <section className="content-section" aria-labelledby="capabilities-title">
          <div className="section-heading">
            <p className="eyebrow">WORKING TOOLKIT</p>
            <h2 id="capabilities-title">The areas I keep returning to.</h2>
          </div>
          <div className="capability-list">
            {capabilities.map((capability) => (
              <div className="capability-row" key={capability.title}>
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
