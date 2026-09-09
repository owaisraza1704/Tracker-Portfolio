import Link from "next/link";
import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";
import { ArrowDown } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import FeaturedProjects from "@/components/FeaturedProjects";

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
    <div className="site-shell">
      <SiteHeader />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-main">
            <div className="hero-copy">
              <p className="eyebrow">BACKEND AI ENGINEER · CHENNAI, INDIA</p>
              <h1 id="hero-title">
                Owais
                <br />
                <span className="hero-name-muted">Raza</span>
              </h1>
              <p className="hero-description">
                I build AI systems that actually solve problems — not just
                answer questions.
              </p>
              <div className="hero-supporting-copy">
                <p>Most of my work starts with a simple question:</p>
                <p className="hero-question">
                  What if AI can do this or solve that?
                </p>
                <p className="hero-muted-copy">
                  That keeps pulling me toward agentic workflows, RAG, backend
                  systems, inference, and the engineering needed to make AI
                  reliable in the real world.
                </p>
              </div>
              <div className="hero-actions">
                <a className="primary-button" href="#vision">
                  See what I&apos;m building
                </a>
                <Link className="secondary-button" href="/about">
                  More about me
                </Link>
              </div>
              <div className="hero-connect">
                <span>CONNECT</span>
                <SocialLinks variant="inline" />
              </div>
            </div>

            <div className="hero-panel">
              <Image
                className="hero-panel-image"
                src="/images/ai-system-threads.jpg"
                alt="A dark abstract network of connected digital threads"
                fill
                priority
                sizes="(max-width: 760px) 100vw, 440px"
              />
            </div>
          </div>

          <div className="hero-scroll">
            <a href="#vision">
              <span>Scroll to explore</span>
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </section>

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
      </main>

      <footer className="site-footer">
        <span>Personal Portfolio Tracker</span>
        <span>Next.js · TypeScript</span>
      </footer>
    </div>
  );
}
