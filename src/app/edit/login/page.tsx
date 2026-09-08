import Link from "next/link";

export default function EditLoginPage() {
  return (
    <main className="placeholder-page">
      <section className="placeholder-card" aria-labelledby="login-title">
        <p className="eyebrow">PRIVATE AREA · EDIT MODE</p>
        <h1 id="login-title">The visual editor starts here.</h1>
        <p>
          Password authentication and the content builder will be added in the
          next step. The public portfolio foundation is ready.
        </p>
        <Link className="primary-button" href="/">
          Back to view mode
        </Link>
      </section>
    </main>
  );
}
