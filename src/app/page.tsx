import Link from "next/link";
import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";
import { ArrowDown } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import FeaturedProjects from "@/components/FeaturedProjects";

const plannedCapabilities = [
  {
    label: "01",
    title: "Public portfolio",
    description:
      "A polished, responsive view for projects, experience, writing, learning, and current work.",
  },
  {
    label: "02",
    title: "Visual editor",
    description:
      "Add sections, edit text, manage cards, and reorder content without opening the source code.",
  },
  {
    label: "03",
    title: "Draft and publish",
    description:
      "Preview changes privately and publish only when the portfolio is ready to update.",
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
          className="capabilities-section"
          id="capabilities"
          aria-labelledby="capabilities-title"
        >
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
