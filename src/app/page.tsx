import Link from "next/link";
import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";
import { ArrowDown } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import FeaturedProjects from "@/components/FeaturedProjects";

const focusDomains = [
  {
    label: "01",
    title: "AI Systems Engineering",
    description:
      "Building AI systems that connect models to real workflows, tools, state, and outcomes.",
  },
  {
    label: "02",
    title: "Agentic Workflows",
    description:
      "Exploring planning, delegation, orchestration, memory, and multi-step execution.",
  },
  {
    label: "03",
    title: "RAG & Research Intelligence",
    description:
      "Designing retrieval systems that give agents scoped context, verified sources, and useful answers.",
  },
  {
    label: "04",
    title: "Backend & Runtime Systems",
    description:
      "Working on APIs, async workflows, persistence, and the infrastructure that makes AI dependable.",
  },
  {
    label: "05",
    title: "Learning Systems",
    description:
      "Building structured learning experiences around curriculum state, practice, evidence, and mastery.",
  },
  {
    label: "06",
    title: "Evaluation & Reliability",
    description:
      "Making AI behavior observable and useful through evaluation, verification, failure handling, and feedback.",
  },
];

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
          <div className="section-heading">
            <div>
              <p className="eyebrow">DOMAINS OF FOCUS</p>
              <h2 id="domains-title">What I Spend My Time On</h2>
            </div>
            <p>
              The questions, systems, and engineering problems that keep me
              curious and moving deeper into applied AI.
            </p>
          </div>

          <div className="domains-grid">
            {focusDomains.map((domain) => (
              <article className="domain-card" key={domain.label}>
                <span className="card-number">{domain.label}</span>
                <h3>{domain.title}</h3>
                <p>{domain.description}</p>
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
