import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { getSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ draft?: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { projects } = await getSiteContent((await searchParams).draft === "1");
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: project.name, description: project.description } : {};
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ draft?: string }>;
}) {
  const { slug } = await params;
  const { projects } = await getSiteContent((await searchParams).draft === "1");
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
