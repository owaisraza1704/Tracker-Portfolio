import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSiteContent } from "@/lib/site-store";

const channelIcons = { mail: Mail, github: Github, linkedin: Linkedin };

export const metadata = { title: "Contact" };

export const dynamic = "force-dynamic";

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ draft?: string }> }) {
  const { contact } = await getSiteContent((await searchParams).draft === "1");
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="content-page">
        <header className="content-hero">
          <p className="eyebrow">CONTACT / START A CONVERSATION</p>
          <h1>{contact.title}</h1>
          <p className="content-lead">{contact.lead}</p>
        </header>

        <section className="content-section" aria-labelledby="contact-title">
          <div className="section-heading">
            <p className="eyebrow">FIND ME HERE</p>
            <h2 id="contact-title">Pick the channel that works for you.</h2>
          </div>
          <div className="contact-grid">
            {contact.channels.map(({ label, detail, href, icon }, index) => {
              const Icon = channelIcons[icon];
              return (
                <a className="contact-card" href={href} key={index} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                  <strong>{detail}</strong>
                  <ArrowUpRight className="contact-arrow" aria-hidden="true" />
                </a>
              );
            })}
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
