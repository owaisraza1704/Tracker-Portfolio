import { ProjectCard } from "@/components/FeaturedProjects";
import { projects } from "@/data/projects";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function ProjectsPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="projects-page">
        <header className="projects-page-header">
          <p className="eyebrow">SYSTEMS &amp; ENGINEERING</p>
          <h1>Selected work</h1>
          <p>
            Products, prototypes, and measured experiments across AI systems,
            retrieval, backend engineering, and agent interfaces.
          </p>
        </header>

        <div className="projects-list">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
