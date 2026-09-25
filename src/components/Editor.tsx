"use client";

import { useState } from "react";
import type { SiteContent } from "@/data/site-content";

type Path = (string | number)[];
type EditableObject = Record<string, unknown>;

const pages = [
  { key: "home", label: "Home", preview: "/?draft=1" },
  { key: "projects", label: "Work", preview: "/projects?draft=1" },
  { key: "notes", label: "Thoughts", preview: "/writing?draft=1" },
  { key: "about", label: "About", preview: "/about?draft=1" },
  { key: "lab", label: "Lab", preview: "/lab?draft=1" },
  { key: "now", label: "Now", preview: "/now?draft=1" },
  { key: "contact", label: "Contact", preview: "/contact?draft=1" },
] as const;

const labels: Record<string, string> = {
  heroPill: "Eyebrow",
  heroBefore: "Headline beginning",
  heroAccent: "Headline emphasis",
  heroAfter: "Headline ending",
  heroDescription: "Introduction",
  heroCaption: "Small caption",
  introTitle: "Intro heading",
  introDescription: "Intro text",
  domainsTitle: "Focus heading",
  domainsDescription: "Focus introduction",
  focusDomains: "Focus areas",
  careerTitle: "Career heading",
  careerDescription: "Career introduction",
  careerEntry: "Career entry",
  approachTitle: "Approach heading",
  approachParagraphs: "Approach paragraphs",
  principles: "Engineering principles",
  capabilities: "Working toolkit",
  experience: "Experience",
  experiments: "Focused experiments",
  smallerBuilds: "Smaller builds",
  focus: "Current focus",
  channels: "Contact channels",
  heroIntro: "Case study introduction",
  systemAreas: "Core system areas",
  engineeringQuestions: "Engineering questions",
  runtimeLabel: "Runtime label",
  runtimeFlow: "Runtime steps (use → between steps)",
  currentStatus: "Current status",
  currentStatusDescription: "Status detail",
  relatedHref: "Related project path",
  githubUrl: "Repository URL",
  sections: "Article sections",
  paragraphs: "Paragraphs",
  stack: "Stack items",
  tags: "Tags",
};

const blankItems: Record<string, unknown> = {
  projects: {
    slug: "",
    system: "SYSTEM",
    name: "",
    status: "",
    badge: "",
    subtitle: "",
    runtimeLabel: "RUNTIME",
    runtimeFlow: "INPUT → PROCESS → RESULT",
    description: "",
    githubUrl: "",
    heroIntro: "",
    overview: "",
    tags: [""],
    stack: [""],
    icon: "activity",
    featured: false,
    showcase: false,
    showcaseQuestion: "",
    systemAreas: [],
    engineeringQuestions: [],
    currentStatus: "",
    currentStatusDescription: "",
  },
  notes: {
    slug: "",
    category: "",
    title: "",
    summary: "",
    relatedHref: "/lab",
    sections: [],
  },
  focusDomains: { label: "", title: "", description: "" },
  principles: { number: "", title: "", description: "" },
  capabilities: { title: "", items: "" },
  experiments: {
    number: "",
    label: "",
    title: "",
    detail: "",
    result: "",
    href: "",
  },
  smallerBuilds: {
    number: "",
    label: "",
    title: "",
    detail: "",
    status: "",
    href: "",
  },
  focus: { label: "", title: "", description: "", href: "/projects/" },
  channels: { label: "", detail: "", href: "", icon: "mail" },
  systemAreas: { title: "", tag: "", description: "" },
  sections: { heading: "", paragraphs: [""] },
  tags: "",
  stack: "",
  engineeringQuestions: "",
  paragraphs: "",
  approachParagraphs: "",
};

const itemLabels: Record<string, string> = {
  paragraphs: "Paragraph",
  approachParagraphs: "Paragraph",
  tags: "Tag",
  stack: "Stack item",
  engineeringQuestions: "Question",
};

function titleFor(value: unknown, index: number) {
  if (typeof value === "string") return value || `Item ${index + 1}`;
  const item = value as EditableObject;
  return String(
    item.name ||
      item.title ||
      item.heading ||
      item.role ||
      item.label ||
      `Item ${index + 1}`,
  );
}

export default function Editor({
  initialContent,
  logoutAction,
}: {
  initialContent: SiteContent;
  logoutAction: () => Promise<void>;
}) {
  const [content, setContent] = useState(initialContent);
  const [page, setPage] = useState<(typeof pages)[number]["key"]>("home");
  const [status, setStatus] = useState("Draft saved");
  const [busy, setBusy] = useState(false);
  const currentPage = pages.find((item) => item.key === page)!;

  function change(path: Path, value: unknown) {
    setContent((current) => {
      const next = structuredClone(current);
      let target: unknown = next;
      for (const segment of path.slice(0, -1))
        target = (target as EditableObject)[segment];
      (target as EditableObject)[path[path.length - 1]] = value;
      return next;
    });
    setStatus("Unsaved changes");
  }

  async function save(value: SiteContent) {
    const response = await fetch("/api/edit/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });
    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || "Could not save draft");
    }
  }

  async function run(action: "save" | "publish") {
    setBusy(true);
    try {
      await save(content);
      if (action === "publish") {
        const response = await fetch("/api/edit/content", { method: "POST" });
        if (!response.ok) throw new Error("Could not publish draft");
      }
      setStatus(action === "publish" ? "Published to the site" : "Draft saved");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setBusy(false);
    }
  }

  function renderField(key: string, value: unknown, path: Path) {
    const label =
      typeof path[path.length - 1] === "number"
        ? `${itemLabels[String(path[path.length - 2])] ?? "Item"} ${Number(path[path.length - 1]) + 1}`
        : labels[key] ||
          key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (letter) => letter.toUpperCase());
    if (Array.isArray(value)) {
      return (
        <div className="editor-field editor-list" key={key}>
          <div className="editor-list-heading">
            <h3>{label}</h3>
            <button
              type="button"
              onClick={() => {
                const blank = structuredClone(blankItems[key] ?? "");
                if (key === "projects")
                  (blank as EditableObject).slug = `new-project-${Date.now()}`;
                if (key === "notes")
                  (blank as EditableObject).slug = `new-note-${Date.now()}`;
                if (typeof blank === "object" && blank && "number" in blank)
                  blank.number = String(value.length + 1).padStart(2, "0");
                if (
                  typeof blank === "object" &&
                  blank &&
                  "label" in blank &&
                  key === "focusDomains"
                )
                  blank.label = String(value.length + 1).padStart(2, "0");
                change(path, [...value, blank]);
              }}
            >
              + Add{" "}
              {key === "projects"
                ? "project"
                : key === "notes"
                  ? "note"
                  : "item"}
            </button>
          </div>
          {value.map((item, index) => {
            const itemPath = [...path, index];
            const editableItem =
              typeof item === "object" && item !== null
                ? {
                    ...(blankItems[key] as EditableObject | undefined),
                    ...(item as EditableObject),
                  }
                : item;
            return (
              <details
                className="editor-item"
                key={index}
                open={value.length < 4}
              >
                <summary>{titleFor(item, index)}</summary>
                <div className="editor-item-body">
                  {typeof editableItem === "object" && editableItem !== null
                    ? Object.entries(editableItem).map(
                        ([childKey, childValue]) =>
                          renderField(childKey, childValue, [
                            ...itemPath,
                            childKey,
                          ]),
                      )
                    : renderField(String(index), editableItem, itemPath)}
                  <div className="editor-item-actions">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => {
                        const next = [...value];
                        [next[index - 1], next[index]] = [
                          next[index],
                          next[index - 1],
                        ];
                        change(path, next);
                      }}
                    >
                      ↑ Move up
                    </button>
                    <button
                      type="button"
                      disabled={index === value.length - 1}
                      onClick={() => {
                        const next = [...value];
                        [next[index + 1], next[index]] = [
                          next[index],
                          next[index + 1],
                        ];
                        change(path, next);
                      }}
                    >
                      ↓ Move down
                    </button>
                    <button
                      type="button"
                      className="editor-delete"
                      onClick={() =>
                        change(
                          path,
                          value.filter((_, itemIndex) => itemIndex !== index),
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                  {key === "projects" && (
                    <a
                      className="editor-preview-item"
                      href={`/projects/${(item as EditableObject).slug}?draft=1`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Preview case study ↗
                    </a>
                  )}
                  {key === "notes" && (
                    <a
                      className="editor-preview-item"
                      href={`/writing/${(item as EditableObject).slug}?draft=1`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Preview note ↗
                    </a>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      );
    }
    if (typeof value === "object" && value !== null) {
      return (
        <div className="editor-field editor-group" key={key}>
          <h3>{label}</h3>
          {Object.entries(value).map(([childKey, childValue]) =>
            renderField(childKey, childValue, [...path, childKey]),
          )}
        </div>
      );
    }
    if (typeof value === "boolean") {
      return (
        <label className="editor-checkbox" key={key}>
          <input
            type="checkbox"
            checked={value}
            onChange={(event) => change(path, event.target.checked)}
          />
          {label}
        </label>
      );
    }
    if (key === "icon") {
      const choices = path.includes("channels")
        ? ["mail", "github", "linkedin"]
        : ["activity", "network", "brain", "compass", "layers", "flask"];
      return (
        <label className="editor-field" key={key}>
          <span>{label}</span>
          <select
            value={String(value)}
            onChange={(event) => change(path, event.target.value)}
          >
            {choices.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </label>
      );
    }
    const text = String(value ?? "");
    const isLong =
      text.length > 90 ||
      [
        "description",
        "detail",
        "result",
        "status",
        "overview",
        "heroIntro",
        "summary",
        "lead",
        "paragraphs",
      ].includes(key) ||
      typeof path[path.length - 1] === "number";
    return (
      <label className="editor-field" key={key}>
        <span>{label}</span>
        {isLong ? (
          <textarea
            value={text}
            rows={Math.max(3, Math.min(8, Math.ceil(text.length / 80)))}
            onChange={(event) => change(path, event.target.value)}
          />
        ) : (
          <input
            value={text}
            onChange={(event) => change(path, event.target.value)}
          />
        )}
      </label>
    );
  }

  const section = content[page];
  return (
    <main className="editor-shell">
      <header className="editor-header">
        <div>
          <p className="eyebrow">PRIVATE WORKSPACE</p>
          <h1>Portfolio content</h1>
          <p>
            Edit entries inside the existing pages. Save a draft, preview it,
            then publish when ready.
          </p>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="editor-logout">
            Sign out
          </button>
        </form>
      </header>
      <div className="editor-toolbar">
        <span
          role="status"
          className={
            status !== "Draft saved" && status !== "Published to the site"
              ? "editor-unsaved"
              : ""
          }
        >
          {status}
        </span>
        <div>
          <button type="button" disabled={busy} onClick={() => run("save")}>
            Save draft
          </button>
          <a href={currentPage.preview} target="_blank" rel="noreferrer">
            Preview draft ↗
          </a>
          <button
            type="button"
            className="editor-publish"
            disabled={busy}
            onClick={() => run("publish")}
          >
            Publish
          </button>
        </div>
      </div>
      <div className="editor-layout">
        <nav className="editor-nav" aria-label="Pages to edit">
          {pages.map((item) => (
            <button
              type="button"
              key={item.key}
              className={page === item.key ? "active" : ""}
              onClick={() => setPage(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <section className="editor-content">
          <div className="editor-content-heading">
            <p className="eyebrow">EDIT PAGE</p>
            <h2>{currentPage.label}</h2>
          </div>
          {Array.isArray(section)
            ? renderField(page, section, [page])
            : Object.entries(section).map(([key, value]) =>
                renderField(key, value, [page, key]),
              )}
        </section>
      </div>
    </main>
  );
}
