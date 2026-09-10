import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Github,
} from "lucide-react";
import type { PortfolioProject } from "@/data/projects";

function ProjectSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="project-detail-section">
      <div className="project-detail-section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </section>
  );
}

export default function ProjectDetail({ project }: { project: PortfolioProject }) {
  const runtimeSteps = project.runtimeFlow.split(" → ");

  return (
    <div className="site-shell">
      <main className="project-detail-page">
        <header className="project-detail-header">
          <Link className="project-back-link" href="/projects">
            <ArrowLeft aria-hidden="true" />
            <span>BACK TO PROJECTS</span>
          </Link>

          <div className="project-detail-meta">
            <span className="project-system">{project.system}</span>
            {project.status && (
              <>
                <span className="project-meta-dot" />
                <span>{project.status}</span>
              </>
            )}
          </div>

          <h1>{project.name}</h1>
          <p className="project-detail-subtitle">{project.subtitle}</p>
          <p className="project-detail-insight">{project.heroIntro}</p>

          <div className="project-detail-actions">
            {project.githubUrl && (
              <a
                className="secondary-button"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Github aria-hidden="true" />
                View repository
                <ArrowUpRight aria-hidden="true" />
              </a>
            )}
          </div>

          <div className="project-detail-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>

        <ProjectSection
          eyebrow="FOUNDATION"
          title="Overview"
          description="What the system is designed to do and why it exists."
        >
          <p className="project-detail-copy">{project.overview}</p>
        </ProjectSection>

        <ProjectSection
          eyebrow="SYSTEM TOPOLOGY"
          title="Runtime path"
          description="The stages that move the system from an initial input toward a useful, verifiable result."
        >
          <div className="project-runtime-detail">
            {runtimeSteps.map((step, index) => (
              <div className="project-runtime-step" key={step}>
                <span>0{index + 1}</span>
                <strong>{step}</strong>
                {index < runtimeSteps.length - 1 && (
                  <ArrowRight className="project-runtime-arrow" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </ProjectSection>

        <ProjectSection
          eyebrow="DECOMPOSED SUBSYSTEMS"
          title="Core system areas"
          description="The main responsibilities that make the project understandable as a system rather than a single model call."
        >
          <div className="project-area-grid">
            {project.systemAreas.map((area) => (
              <article className="project-area-card" key={area.title}>
                <div className="project-area-card-header">
                  <h3>{area.title}</h3>
                  <span>{area.tag}</span>
                </div>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </ProjectSection>

        <ProjectSection
          eyebrow="ENGINEERING QUESTIONS"
          title="What I am working through"
          description="The difficult questions behind the implementation."
        >
          <div className="project-question-list">
            {project.engineeringQuestions.map((question) => (
              <div className="project-question" key={question}>
                <CheckCircle2 aria-hidden="true" />
                <span>{question}</span>
              </div>
            ))}
          </div>
        </ProjectSection>

        <ProjectSection eyebrow="IMPLEMENTATION" title="Technology and principles">
          <div className="project-detail-tags project-stack-tags">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </ProjectSection>

        <ProjectSection eyebrow="LIFECYCLE" title="Current status">
          <div className="project-status-panel">
            <div>
              <p className="project-status-label">{project.currentStatus}</p>
              <p>{project.currentStatusDescription}</p>
            </div>
            <span className="project-status-indicator" aria-hidden="true" />
          </div>
        </ProjectSection>

        <nav className="project-next-link" aria-label="Project navigation">
          <Link href="/projects">
            <span>View all systems</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
