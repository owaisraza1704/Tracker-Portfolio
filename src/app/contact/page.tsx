import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const channels = [
  { label: "Email", detail: "owaisraza1704@gmail.com", href: "mailto:owaisraza1704@gmail.com", icon: Mail },
  { label: "GitHub", detail: "owaisraza1704", href: "https://github.com/owaisraza1704", icon: Github },
  { label: "LinkedIn", detail: "owaisraza1704", href: "https://www.linkedin.com/in/owaisraza1704/", icon: Linkedin },
];

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="content-page">
        <header className="content-hero">
          <p className="eyebrow">CONTACT / START A CONVERSATION</p>
          <h1>Let&apos;s talk about the work.</h1>
          <p className="content-lead">
            Reach out about AI systems, backend engineering, retrieval, agent
            interfaces, or a project that could use careful systems thinking.
          </p>
        </header>

        <section className="content-section" aria-labelledby="contact-title">
          <div className="section-heading">
            <p className="eyebrow">FIND ME HERE</p>
            <h2 id="contact-title">Pick the channel that works for you.</h2>
          </div>
          <div className="contact-grid">
            {channels.map(({ label, detail, href, icon: Icon }) => (
              <a className="contact-card" href={href} key={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                <Icon aria-hidden="true" />
                <span>{label}</span>
                <strong>{detail}</strong>
                <ArrowUpRight className="contact-arrow" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className="page-cta">
          <p className="eyebrow">BEFORE YOU GO</p>
          <h2>Want to see what I&apos;ve been building?</h2>
          <p>The project pages show the problem, runtime path, engineering questions, and current state behind each system.</p>
          <Link className="primary-button" href="/projects">Explore work <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
