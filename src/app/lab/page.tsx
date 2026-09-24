import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const experiments = [
  {
    number: "01",
    label: "MODEL EVALUATION",
    title: "Can fine-tuning improve a structured agent config?",
    detail: "A Qwen3-1.7B LoRA comparison across 30 held-out requirements measured schema validity and semantic quality separately.",
    result: "The base model remained the better end-to-end choice: 0.288 versus 0.278 for the best adapter.",
    href: "/projects/agentconfig-evaluation" as const,
  },
  {
    number: "02",
    label: "RETRIEVAL",
    title: "Can a small research API keep its evidence inspectable?",
    detail: "Nexus stores the document snapshot, retrieved passages, answer, and citation locations for each query.",
    result: "A 20-question labeled synopsis set reached Recall@5 of 0.9317. That is a narrow retrieval baseline, not an answer-quality guarantee.",
    href: "/projects/nexus" as const,
  },
  {
    number: "03",
    label: "AGENT RUNTIME",
    title: "What state does an agent run need?",
    detail: "Cognia explores agent definitions, reasoning strategies, execution steps, and checkpoints in a Python backend.",
    result: "The runtime is a prototype for inspecting agent behavior; broader coordination remains open.",
    href: "/projects/cognia" as const,
  },
  {
    number: "04",
    label: "AGENT INTERFACE",
    title: "Can an agent and a visitor share one application state?",
    detail: "Voyage exposes travel actions through WebMCP while the normal UI shows the same destination, filters, and itinerary.",
    result: "Booking is simulated and requires an explicit confirmation in the interaction flow.",
    href: "/projects/voyage" as const,
  },
  {
    number: "05",
    label: "EXPLAINABLE PIPELINES",
    title: "Can a market signal show how it was assembled?",
    detail: "A small gold and silver intelligence prototype moves data through ingest, filter, classify, reason, and aggregate stages.",
    result: "Typed stage outputs and trace logs make skipped inputs and intermediate decisions inspectable. It remains a prototype, not a live market service.",
  },
];

export const metadata = { title: "Lab" };

export default function LabPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="content-page">
        <header className="content-hero">
          <p className="eyebrow">LAB / OPEN QUESTIONS</p>
          <h1>Small experiments. Clear evidence.</h1>
          <p className="content-lead">
            A place for the prototypes and measurements behind the larger
            projects. Each result has a boundary; the unanswered questions are
            part of the work.
          </p>
        </header>

        <section className="content-section" aria-label="Experiments">
          <div className="lab-grid">
            {experiments.map((experiment) => (
              <article className="lab-card" key={experiment.number}>
                <div className="lab-card-top">
                  <span className="card-index">{experiment.number}</span>
                  <span className="eyebrow">{experiment.label}</span>
                </div>
                <h2>{experiment.title}</h2>
                <p>{experiment.detail}</p>
                <div className="lab-result"><span>WHAT I FOUND</span><p>{experiment.result}</p></div>
                {experiment.href && <Link className="text-link" href={experiment.href}>Explore project <span aria-hidden="true">↗</span></Link>}
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
