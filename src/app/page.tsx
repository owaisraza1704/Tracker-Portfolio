import Link from "next/link";
import { Activity, ArrowRight, Check, Compass, Network } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import FeaturedProjects from "@/components/FeaturedProjects";
import SiteFooter from "@/components/SiteFooter";

const focusDomains = [
  {
    label: "01",
    title: "AI Systems",
    description:
      "How models, tools, state, and runtime logic work together when the system has to do more than produce an answer.",
  },
  {
    label: "02",
    title: "Backend Engineering",
    description:
      "The boring-but-important machinery that keeps everything alive — APIs, services, databases, performance, and reliability.",
  },
  {
    label: "03",
    title: "Retrieval & Memory",
    description:
      "Helping systems remember the right thing without drowning the model in context.",
  },
  {
    label: "04",
    title: "System Design",
    description:
      "State, failures, recovery, reliability, and all the things architecture has to account for.",
  },
  {
    label: "05",
    title: "Agentic Workflows",
    description:
      "Planning, delegation, tool use, and orchestration across multi-step AI workflows.",
  },
  {
    label: "06",
    title: "Learning & Evaluation",
    description:
      "Building systems around practice, evidence, feedback, and reliable evaluation.",
  },
];

const careerEntry = {
  role: "System Engineer",
  company: "Tata Consultancy Services",
  period: "Apr 2024 – Present",
  location: "Chennai, India",
  description:
    "Working across AI systems and backend engineering — building LLM-powered agent and retrieval systems, enterprise APIs, and reliable backend services for production workflows.",
};

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-top">
        <div className="site-shell">
          <SiteHeader />
        </div>
      </div>
      <main>
        <div className="home-top">
          <div className="site-shell">
            <section className="portfolio-hero" aria-labelledby="hero-title">
              <div className="portfolio-hero-copy">
                <p className="hero-pill">
                  <span aria-hidden="true" /> Backend &amp; AI engineer · Chennai
                </p>
                <h1 id="hero-title">
                  Building AI as <em>useful systems,</em> not isolated answers.
                </h1>
                <p className="portfolio-hero-description">
                  I turn questions into working products — connecting models,
                  evidence, application state, and the interfaces people use.
                </p>
                <div className="hero-actions">
                  <Link className="primary-button" href="/projects">
                    Explore my work <ArrowRight aria-hidden="true" />
                  </Link>
                  <Link className="secondary-button" href="/about">
                    More about me
                  </Link>
                </div>
                <p className="hero-caption">
                  Thoughtful systems, built one clear step at a time.
                </p>
              </div>

              <div className="hero-showcase" aria-label="A map of three selected projects">
                <div className="showcase-context">
                  <span>Current focus</span>
                  <strong>
                    <span aria-hidden="true" /> Inspectable systems
                  </strong>
                  <small>Learning · research · agents</small>
                </div>
                <div className="showcase-panel">
                  <div className="showcase-heading">
                    <span>SELECTED WORK / THE SYSTEMS</span>
                    <span className="showcase-example">Explore</span>
                  </div>
                  <h2>Ideas with a runtime behind them.</h2>
                  <div className="showcase-progress" aria-hidden="true">
                    <span /><span /><span />
                  </div>
                  <p className="showcase-label">THREE QUESTIONS I KEEP RETURNING TO</p>
                  <div className="showcase-projects">
                    <Link href="/projects/trellis">
                      <Activity aria-hidden="true" />
                      <strong>Trellis</strong>
                      <span>How does learning persist?</span>
                    </Link>
                    <Link href="/projects/nexus">
                      <Network aria-hidden="true" />
                      <strong>Nexus</strong>
                      <span>Where is the evidence?</span>
                    </Link>
                    <Link href="/projects/voyage">
                      <Compass aria-hidden="true" />
                      <strong>Voyage</strong>
                      <span>Can agents share the UI?</span>
                    </Link>
                  </div>
                  <div className="showcase-connector" aria-hidden="true" />
                  <div className="showcase-evidence">
                    <div>
                      <span>THE ENGINEERING THREAD</span>
                      <Check aria-hidden="true" />
                    </div>
                    <p>Make state explicit. Keep evidence attached. Let people see what changed.</p>
                    <small>Across learning, research, and agent-driven workflows</small>
                  </div>
                  <div className="showcase-result">
                    <span>THE GOAL</span>
                    <p>AI that is useful because the surrounding system is understandable.</p>
                  </div>
                </div>
                <div className="showcase-footer-note">
                  <span>↗</span>
                  <div>
                    <strong>Follow the work</strong>
                    <small>From the idea to the actual runtime</small>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="site-shell">
          <section
            className="intro-section"
            id="vision"
            aria-labelledby="vision-title"
          >
            <div className="section-label">
              <span>THE IDEA</span>
            </div>
            <div>
              <h2 id="vision-title">A living view of the work.</h2>
              <p>
                The portfolio brings together the systems I am building, the ideas
                I am exploring, and the engineering questions that keep pulling me
                deeper.
              </p>
            </div>
          </section>

          <FeaturedProjects />

          <section
            className="domains-section"
            id="domains"
            aria-labelledby="domains-title"
          >
            <div className="domains-intro">
              <p className="eyebrow">DOMAINS OF FOCUS</p>
              <h2 id="domains-title">What I Spend My Time On</h2>
              <p>
                Core engineering problems bridging intelligent model reasoning
                with deterministic backend infrastructure.
              </p>
            </div>

            <div className="domains-list">
              {focusDomains.map((domain) => (
                <article className="domain-row" key={domain.label}>
                  <span className="domain-number">{domain.label}</span>
                  <h3 className="domain-title">{domain.title}</h3>
                  <p>{domain.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className="career-section"
            id="career"
            aria-labelledby="career-title"
          >
            <div className="career-intro">
              <div>
                <p className="eyebrow">CAREER</p>
                <h2 id="career-title">Where I Do This Professionally</h2>
                <p>
                  Working across AI systems and backend engineering — building
                  LLM-powered agent and retrieval systems, enterprise APIs, and
                  reliable backend services for production workflows.
                </p>
              </div>
              <Link className="secondary-button career-link" href="/about">
                More about me <span aria-hidden="true">→</span>
              </Link>
            </div>

            <article className="career-card">
              <div className="career-card-header">
                <div>
                  <h3>{careerEntry.role}</h3>
                  <p className="career-company">{careerEntry.company}</p>
                </div>
                <p className="career-meta">
                  <span className="career-status" aria-hidden="true" />
                  {careerEntry.period} · {careerEntry.location}
                </p>
              </div>
              <p className="career-description">{careerEntry.description}</p>
            </article>
          </section>
        </div>
      </main>
      <div className="site-shell">
        <SiteFooter />
      </div>
    </div>
  );
}
