import Link from "next/link";

const plannedCapabilities = [
  {
    label: "01",
    title: "Public portfolio",
    description: "A polished, responsive view for projects, experience, writing, learning, and current work.",
  },
  {
    label: "02",
    title: "Visual editor",
    description: "Add sections, edit text, manage cards, and reorder content without opening the source code.",
  },
  {
    label: "03",
    title: "Draft and publish",
    description: "Preview changes privately and publish only when the portfolio is ready to update.",
  },
];

export default function HomePage() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/">
          PORTFOLIO TRACKER
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#vision">Vision</a>
          <a href="#capabilities">Capabilities</a>
          <a className="nav-button" href="/edit/login">
            Edit mode
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">PERSONAL SYSTEM · VIEW MODE</p>
            <h1 id="hero-title">
              A portfolio that keeps up with the work.
            </h1>
            <p className="hero-description">
              A visual portfolio tracker for projects, experiments, learning, and
              everything that happens between finished releases.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#capabilities">
                Explore the foundation
              </a>
              <span className="status-pill">
                <span className="status-dot" />
                Scaffolding in progress
              </span>
            </div>
          </div>

          <div className="hero-panel" aria-label="Product concept">
            <div className="panel-topline">
              <span>LIVE CONCEPT</span>
              <span>v0.1</span>
            </div>
            <div className="panel-line panel-line-long" />
            <div className="panel-line panel-line-medium" />
            <div className="panel-card-grid">
              <div />
              <div />
              <div />
            </div>
            <p className="panel-caption">
              Content stays structured. The presentation stays intentional.
            </p>
          </div>
        </section>

        <section className="intro-section" id="vision" aria-labelledby="vision-title">
          <div className="section-label">
            <span>01</span>
            <span>THE IDEA</span>
          </div>
          <div>
            <h2 id="vision-title">A personal CMS for an evolving career.</h2>
            <p>
              The normal portfolio workflow makes every small update a code change.
              This project turns the portfolio into a simple, private content system:
              update what you are building, studying, or exploring from a visual
              editor, then publish the result when it is ready.
            </p>
          </div>
        </section>

        <section className="capabilities-section" id="capabilities" aria-labelledby="capabilities-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FOUNDATION</p>
              <h2 id="capabilities-title">Built around three simple modes.</h2>
            </div>
            <p>
              The first version stays focused: a strong public view, a protected
              editor, and content that can be saved and published safely.
            </p>
          </div>

          <div className="capability-grid">
            {plannedCapabilities.map((capability) => (
              <article className="capability-card" key={capability.label}>
                <span className="card-number">{capability.label}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Personal Portfolio Tracker</span>
        <span>Next.js · TypeScript</span>
      </footer>
    </div>
  );
}
