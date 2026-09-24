import { Activity, ArrowUpRight, Brain, Compass, FlaskConical, Layers3, Network } from "lucide-react";
import Link from "next/link";
import { projects, type PortfolioProject, type ProjectIcon } from "@/data/projects";

const projectIcons: Record<ProjectIcon, typeof Activity> = {
  activity: Activity,
  network: Network,
  brain: Brain,
  compass: Compass,
  layers: Layers3,
  flask: FlaskConical,
};

export function ProjectCard({ project }: { project: PortfolioProject }) {
  const Icon = projectIcons[project.icon];

  return (
    <article
      className={`project-card${project.featured ? " project-card-featured" : ""}`}
    >
      <div className="project-card-header">
        <div className="project-card-meta">
          <span className="project-system">{project.system}</span>
          {project.status && <span className="project-meta-dot" />}
          {project.status && <span>{project.status}</span>}
          {project.badge && (
            <span className="project-badge">{project.badge}</span>
          )}
        </div>
        <span className="project-icon" aria-hidden="true">
          <Icon />
        </span>
      </div>

      <div className="project-card-title-row">
        <div>
          <h3>{project.name}</h3>
          <p>{project.subtitle}</p>
        </div>
      </div>

      <div className="project-runtime">
        <span>{project.runtimeLabel}</span>
        <span>{project.runtimeFlow}</span>
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-card-footer">
        <Link href={`/projects/${project.slug}`}>
          <span>View case study</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            Repository ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function FeaturedProjects() {
  const flagship = projects.find((project) => project.featured) ?? projects[0];
  const secondaryProjects = projects.filter(
    (project) => project.slug !== flagship.slug,
  ).slice(0, 2);

  return (
    <section
      className="featured-projects"
      id="featured-projects"
      aria-labelledby="featured-projects-title"
    >
      <div className="featured-projects-heading">
        <div>
          <p className="eyebrow">SELECTED WORK</p>
          <h2 id="featured-projects-title">Things I&apos;m Building</h2>
          <p className="featured-projects-description">
            These are the projects taking most of my attention right now — and
            occasionally most of my sleep.
          </p>
        </div>
        <Link className="all-projects-link" href="/projects">
          All Projects ({projects.length}) <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="featured-projects-grid">
        <ProjectCard project={flagship} />
        <div className="secondary-projects-grid">
          {secondaryProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
