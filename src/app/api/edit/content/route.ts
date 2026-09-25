import { NextRequest, NextResponse } from "next/server";
import { initialContent, type SiteContent } from "@/data/site-content";
import { isEditorAuthenticated } from "@/lib/editor-auth";
import { publishDraft, saveDraft } from "@/lib/site-store";

function validText(value: unknown): value is string {
  return typeof value === "string" && value.length <= 20000;
}

function validLink(value: unknown) {
  return (
    validText(value) &&
    (value === "" ||
      (value.startsWith("/") && !value.startsWith("//")) ||
      value.startsWith("https://") ||
      value.startsWith("mailto:"))
  );
}

const optionalFields = new Set([
  "status",
  "badge",
  "githubUrl",
  "featured",
  "showcase",
  "showcaseQuestion",
  "href",
  "result",
  "label",
  "number",
]);

function matchesContentShape(value: unknown, example: unknown): boolean {
  if (typeof example === "string") return validText(value);
  if (typeof example === "boolean") return typeof value === "boolean";
  if (Array.isArray(example))
    return (
      Array.isArray(value) &&
      value.every((item) => matchesContentShape(item, example[0]))
    );
  if (
    !value ||
    !example ||
    typeof value !== "object" ||
    typeof example !== "object" ||
    Array.isArray(value)
  )
    return false;
  const candidate = value as Record<string, unknown>;
  return Object.entries(example).every(
    ([key, field]) =>
      (candidate[key] === undefined && optionalFields.has(key)) ||
      matchesContentShape(candidate[key], field),
  );
}

function validDraft(value: unknown): value is SiteContent {
  if (!matchesContentShape(value, initialContent)) return false;
  const content = value as SiteContent;

  const slugs = new Set<string>();
  for (const project of content.projects) {
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) ||
      slugs.has(`project:${project.slug}`) ||
      !validLink(project.githubUrl ?? "") ||
      !["activity", "network", "brain", "compass", "layers", "flask"].includes(
        project.icon,
      )
    )
      return false;
    slugs.add(`project:${project.slug}`);
  }
  for (const note of content.notes) {
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(note.slug) ||
      slugs.has(`note:${note.slug}`) ||
      !validLink(note.relatedHref)
    )
      return false;
    slugs.add(`note:${note.slug}`);
  }
  return (
    [...content.lab.experiments, ...content.lab.smallerBuilds].every((item) =>
      validLink(item.href ?? ""),
    ) &&
    content.now.focus.every((item) => validLink(item.href)) &&
    content.contact.channels.every(
      (item) =>
        validLink(item.href) &&
        ["mail", "github", "linkedin"].includes(item.icon),
    )
  );
}

export async function PUT(request: NextRequest) {
  if (!(await isEditorAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const raw = await request.text();
  if (raw.length > 2_000_000)
    return NextResponse.json({ error: "Draft is too large" }, { status: 413 });
  let content: unknown;
  try {
    content = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!validDraft(content))
    return NextResponse.json(
      { error: "Check slugs, links, and required lists" },
      { status: 400 },
    );
  await saveDraft(content);
  return NextResponse.json({ ok: true });
}

export async function POST() {
  if (!(await isEditorAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await publishDraft();
  return NextResponse.json({ ok: true });
}
