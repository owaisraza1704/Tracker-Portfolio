import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { initialContent, type SiteContent } from "@/data/site-content";
import { dataDirectory, isEditorAuthenticated } from "./editor-auth";

type ContentFile = { draft: SiteContent; published: SiteContent };
const contentPath = path.join(dataDirectory, "site-content.json");

async function readContentFile(): Promise<ContentFile> {
  try {
    return JSON.parse(await readFile(contentPath, "utf8")) as ContentFile;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return {
        draft: structuredClone(initialContent),
        published: structuredClone(initialContent),
      };
    }
    throw error;
  }
}

async function writeContentFile(content: ContentFile) {
  await mkdir(dataDirectory, { recursive: true, mode: 0o700 });
  const temporaryPath = `${contentPath}.${randomUUID()}.tmp`;
  await writeFile(temporaryPath, JSON.stringify(content, null, 2), {
    mode: 0o600,
  });
  await rename(temporaryPath, contentPath);
}

export async function getSiteContent(draftRequested = false) {
  const file = await readContentFile();
  return draftRequested && (await isEditorAuthenticated())
    ? file.draft
    : file.published;
}

export async function getEditorContent() {
  return (await readContentFile()).draft;
}

export async function saveDraft(draft: SiteContent) {
  const file = await readContentFile();
  await writeContentFile({ ...file, draft });
}

export async function publishDraft() {
  const file = await readContentFile();
  await writeContentFile({
    draft: file.draft,
    published: structuredClone(file.draft),
  });
}
