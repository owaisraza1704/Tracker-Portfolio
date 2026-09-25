import { ProjectCard } from "@/components/FeaturedProjects";
import { getSiteContent } from "@/lib/site-store";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ draft?: string }> }) {
  const draft = (await searchParams).draft === "1";
  const { projects } = await getSiteContent(draft);
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
            <ProjectCard key={project.slug} project={project} draft={draft} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
