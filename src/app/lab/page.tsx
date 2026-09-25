import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSiteContent } from "@/lib/site-store";

export const metadata = { title: "Lab" };

export const dynamic = "force-dynamic";

export default async function LabPage({ searchParams }: { searchParams: Promise<{ draft?: string }> }) {
  const { lab } = await getSiteContent((await searchParams).draft === "1");
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="content-page">
        <header className="content-hero">
          <p className="eyebrow">LAB / OPEN QUESTIONS</p>
          <h1>{lab.title}</h1>
          <p className="content-lead">{lab.lead}</p>
        </header>

        <section className="content-section" aria-label="Experiments">
          <div className="section-heading">
            <p className="eyebrow">FOCUSED EXPERIMENTS</p>
            <h2>Experiments behind the systems.</h2>
          </div>
          <div className="lab-grid">
            {lab.experiments.map((experiment, index) => (
              <article className="lab-card" key={index}>
                <div className="lab-card-top">
                  <span className="card-index">{experiment.number}</span>
                  <span className="eyebrow">{experiment.label}</span>
                </div>
                <h2>{experiment.title}</h2>
                <p>{experiment.detail}</p>
                <div className="lab-result"><span>WHAT I FOUND</span><p>{experiment.result}</p></div>
                {experiment.href && <Link className="text-link" href={experiment.href as `/projects/${string}`}>Explore project <span aria-hidden="true">↗</span></Link>}
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" aria-labelledby="smaller-builds-title">
          <div className="section-heading">
            <p className="eyebrow">SMALLER BUILDS</p>
            <h2 id="smaller-builds-title">Learning by making a narrow path work.</h2>
          </div>
          <div className="lab-grid">
            {lab.smallerBuilds.map((build, index) => (
              <article className="lab-card" key={index}>
                <div className="lab-card-top">
                  <span className="card-index">{build.number}</span>
                  <span className="eyebrow">{build.label}</span>
                </div>
                <h2>{build.title}</h2>
                <p>{build.detail}</p>
                <div className="lab-result"><span>CURRENT STATE</span><p>{build.status}</p></div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
