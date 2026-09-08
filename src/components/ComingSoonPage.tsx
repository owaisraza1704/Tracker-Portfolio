import Link from "next/link";

type ComingSoonPageProps = {
  title: string;
  description: string;
};

export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <main className="placeholder-page">
      <section className="placeholder-card" aria-labelledby="page-title">
        <p className="eyebrow">PUBLIC PORTFOLIO · FOUNDATION</p>
        <h1 id="page-title">{title}</h1>
        <p>{description}</p>
        <Link className="primary-button" href="/">
          Back home
        </Link>
      </section>
    </main>
  );
}
