import Link from "next/link";
import { redirect } from "next/navigation";
import { editorIsConfigured, isEditorAuthenticated } from "@/lib/editor-auth";
import { loginAction } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Private editor",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isEditorAuthenticated()) redirect("/edit");
  const configured = await editorIsConfigured();
  const { error } = await searchParams;
  return (
    <main className="editor-login">
      <Link className="editor-back" href="/">
        ← Portfolio
      </Link>
      <div className="editor-login-card">
        <p className="eyebrow">PRIVATE WORKSPACE</p>
        <h1>Sign in to edit</h1>
        {configured ? (
          <form action={loginAction}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
            />
            {error && (
              <p role="alert" className="editor-error">
                Incorrect password. Try again.
              </p>
            )}
            <button className="primary-button" type="submit">
              Sign in
            </button>
          </form>
        ) : (
          <p>
            Set an editor password on the local server with{" "}
            <code>npm run editor:setup</code>, then return here.
          </p>
        )}
      </div>
    </main>
  );
}
