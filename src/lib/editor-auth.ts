import "server-only";
import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies, headers } from "next/headers";

const cookieName = "portfolio_editor_session";
const sessionLifetime = 7 * 24 * 60 * 60 * 1000;

type AuthFile = {
  salt: string;
  passwordHash: string;
  sessionHash?: string;
  sessionExpires?: number;
};

export const dataDirectory =
  process.env.PORTFOLIO_DATA_DIR ?? path.join(process.cwd(), ".local");
const authPath = path.join(dataDirectory, "editor-auth.json");

async function readAuth(): Promise<AuthFile | null> {
  try {
    return JSON.parse(await readFile(authPath, "utf8")) as AuthFile;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function hashSession(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function editorIsConfigured() {
  return (await readAuth()) !== null;
}

export async function isEditorAuthenticated() {
  const token = (await cookies()).get(cookieName)?.value;
  const auth = await readAuth();
  if (
    !token ||
    !auth?.sessionHash ||
    !auth.sessionExpires ||
    auth.sessionExpires < Date.now()
  )
    return false;
  const actual = Buffer.from(hashSession(token), "hex");
  const expected = Buffer.from(auth.sessionHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function logIn(password: string) {
  const auth = await readAuth();
  if (!auth) return false;
  const actual = scryptSync(password, auth.salt, 64);
  const expected = Buffer.from(auth.passwordHash, "hex");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
    return false;

  const token = randomBytes(32).toString("hex");
  auth.sessionHash = hashSession(token);
  auth.sessionExpires = Date.now() + sessionLifetime;
  await writeFile(authPath, JSON.stringify(auth, null, 2), { mode: 0o600 });
  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    secure: (await headers()).get("x-forwarded-proto") === "https",
    sameSite: "strict",
    path: "/",
    maxAge: sessionLifetime / 1000,
  });
  return true;
}

export async function logOut() {
  const auth = await readAuth();
  if (auth) {
    delete auth.sessionHash;
    delete auth.sessionExpires;
    await writeFile(authPath, JSON.stringify(auth, null, 2), { mode: 0o600 });
  }
  (await cookies()).delete(cookieName);
}
