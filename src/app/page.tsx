import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import FeaturedProjects, { projectIcons } from "@/components/FeaturedProjects";
import SiteFooter from "@/components/SiteFooter";
import { getSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ draft?: string }> }) {
  const draft = (await searchParams).draft === "1";
  const { home, projects } = await getSiteContent(draft);
  const showcaseProjects = projects.filter((project) => project.showcase).slice(0, 3);
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
                  <span aria-hidden="true" /> {home.heroPill}
                </p>
                <h1 id="hero-title">
                  {home.heroBefore}<em>{home.heroAccent}</em>{home.heroAfter}
                </h1>
                <p className="portfolio-hero-description">
                  {home.heroDescription}
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
                  {home.heroCaption}
                </p>
              </div>

              <div className="hero-showcase" aria-label="A map of selected projects">
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
                  <p className="showcase-label">QUESTIONS I KEEP RETURNING TO</p>
                  <div className="showcase-projects">
                    {showcaseProjects.map((project) => {
                      const Icon = projectIcons[project.icon];
                      return <Link key={project.slug} href={`/projects/${project.slug}${draft ? "?draft=1" : ""}` as `/projects/${string}`}>
                        <Icon aria-hidden="true" />
                        <strong>{project.name}</strong>
                        <span>{project.showcaseQuestion || project.subtitle}</span>
                      </Link>;
                    })}
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
              <h2 id="vision-title">{home.introTitle}</h2>
              <p>{home.introDescription}</p>
            </div>
          </section>

          <FeaturedProjects projects={projects} draft={draft} />

          <section
            className="domains-section"
            id="domains"
            aria-labelledby="domains-title"
          >
            <div className="domains-intro">
              <p className="eyebrow">DOMAINS OF FOCUS</p>
              <h2 id="domains-title">{home.domainsTitle}</h2>
              <p>{home.domainsDescription}</p>
            </div>

            <div className="domains-list">
              {home.focusDomains.map((domain, index) => (
                <article className="domain-row" key={`${domain.title}-${index}`}>
                  <span className="domain-number">{domain.label || String(index + 1).padStart(2, "0")}</span>
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
                <h2 id="career-title">{home.careerTitle}</h2>
                <p>{home.careerDescription}</p>
              </div>
              <Link className="secondary-button career-link" href="/about">
                More about me <span aria-hidden="true">→</span>
              </Link>
            </div>

            <article className="career-card">
              <div className="career-card-header">
                <div>
                  <h3>{home.careerEntry.role}</h3>
                  <p className="career-company">{home.careerEntry.company}</p>
                </div>
                <p className="career-meta">
                  <span className="career-status" aria-hidden="true" />
                  {home.careerEntry.period} · {home.careerEntry.location}
                </p>
              </div>
              <p className="career-description">{home.careerEntry.description}</p>
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
