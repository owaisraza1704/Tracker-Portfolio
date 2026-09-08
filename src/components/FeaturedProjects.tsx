import { Activity, ArrowUpRight, Brain, Network } from "lucide-react";

type FeaturedProject = {
  name: string;
  system?: string;
  status?: string;
  badge?: string;
  subtitle: string;
  runtimeLabel: string;
  runtimeFlow: string;
  description: string;
  tags: string[];
  icon: typeof Activity;
  featured?: boolean;
};

const featuredProjects: FeaturedProject[] = [
  {
    name: "Trellis",
    system: "SYSTEM 01",
    status: "Active development",
    badge: "FLAGSHIP SYSTEM",
    subtitle: "State-Anchored Learning Intelligence",
    runtimeLabel: "LEARNING RUNTIME",
    runtimeFlow: "CURRICULUM → CONTEXT → PRACTICE → EVIDENCE → MASTERY",
    description:
      "An AI learning system I'm building to make technical learning structured, adaptive, and deeply practical — combining deterministic curriculum state with scoped LLM tutoring, retrieval, and evidence-based evaluation.",
    tags: [
      "State Machine",
      "Curriculum Graph",
      "Scoped Context",
      "RAG",
      "Evaluation",
      "Evidence",
      "Learning State",
    ],
    icon: Activity,
    featured: true,
  },
  {
    name: "Nexus",
    system: "SYSTEM 02",
    status: "Production project",
    badge: "ENTERPRISE AI",
    subtitle: "Enterprise Research Intelligence",
    runtimeLabel: "RESEARCH RUNTIME",
    runtimeFlow: "PLAN → RETRIEVE → REASON → VERIFY → SYNTHESIZE",
    description:
      "An agentic research system designed to turn complex business questions into structured, evidence-backed insights — combining agentic retrieval, tool use, reasoning, and source verification across multi-step research workflows.",
    tags: [
      "Agentic RAG",
      "Tool Use",
      "Web Retrieval",
      "Source Verification",
      "Structured Outputs",
      "Async Workflows",
    ],
    icon: Network,
  },
  {
    name: "Cognia",
    system: "SYSTEM 03",
    subtitle: "A Multi-Agent Framework, Built From Scratch",
    runtimeLabel: "AGENT RUNTIME",
    runtimeFlow: "DEFINE → DELEGATE → EXECUTE → COMMUNICATE → OBSERVE",
    description:
      "An experimental agent framework built from the ground up to explore the primitives behind multi-agent systems — from agent lifecycle and coordination to task execution, communication, and state management.",
    tags: [
      "Agent Runtime",
      "Multi-Agent Systems",
      "Task Delegation",
      "Agent Communication",
      "Tool Execution",
      "State Management",
      "Orchestration",
    ],
    icon: Brain,
  },
];

function ProjectCard({ project }: { project: FeaturedProject }) {
  const Icon = project.icon;

  return (
    <article
      className={`project-card${project.featured ? " project-card-featured" : ""}`}
    >
      <div className="project-card-header">
        <div className="project-card-meta">
          {project.system && (
            <span className="project-system">{project.system}</span>
          )}
          {project.system && project.status && (
            <span className="project-meta-dot" />
          )}
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
        <a href="/projects">
          <span>View case study</span>
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function FeaturedProjects() {
  const [flagship, ...secondaryProjects] = featuredProjects;

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
        <a className="all-projects-link" href="/projects">
          All Projects (3) <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="featured-projects-grid">
        <ProjectCard project={flagship} />
        <div className="secondary-projects-grid">
          {secondaryProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
