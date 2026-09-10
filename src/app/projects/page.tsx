import { ProjectCard } from "@/components/FeaturedProjects";
import { projects } from "@/data/projects";
import SiteHeader from "@/components/SiteHeader";

export default function ProjectsPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="projects-page">
        <header className="projects-page-header">
          <p className="eyebrow">SYSTEMS &amp; ENGINEERING</p>
          <h1>Things I&apos;m Building</h1>
          <p>
            These are the projects taking most of my attention right now — and
            occasionally most of my sleep.
          </p>
        </header>

        <div className="projects-list">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </main>
      <footer className="site-footer">
        <span>Owais Raza</span>
        <span>Selected systems and engineering work</span>
      </footer>
    </div>
  );
}
