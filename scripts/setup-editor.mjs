import { randomBytes, scryptSync } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);
const password = Buffer.concat(chunks).toString("utf8").trimEnd();
if (password.length < 12) {
  console.error("Use an editor password of at least 12 characters.");
  process.exit(1);
}

const dataDirectory =
  process.env.PORTFOLIO_DATA_DIR ?? path.join(process.cwd(), ".local");
const salt = randomBytes(32).toString("hex");
const passwordHash = scryptSync(password, salt, 64).toString("hex");
await mkdir(dataDirectory, { recursive: true, mode: 0o700 });
await writeFile(
  path.join(dataDirectory, "editor-auth.json"),
  JSON.stringify({ salt, passwordHash }, null, 2),
  { mode: 0o600 },
);
console.log("Editor password set. Open /edit/login to sign in.");
