import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { notes } from "@/data/writing";

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);
  return note ? { title: note.title, description: note.summary } : {};
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);

  if (!note) notFound();

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="article-page">
        <Link className="project-back-link" href="/writing">← BACK TO THOUGHTS</Link>
        <header className="article-header">
          <p className="eyebrow">{note.category} / ENGINEERING NOTE</p>
          <h1>{note.title}</h1>
          <p className="content-lead">{note.summary}</p>
        </header>
        <div className="article-body">
          {note.sections.map((section) => (
            <section className="article-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>
        <div className="article-end">
          <p>Continue exploring this idea.</p>
          <Link className="text-link" href={note.relatedHref}>See related work <span aria-hidden="true">↗</span></Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
