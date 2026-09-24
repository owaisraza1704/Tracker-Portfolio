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
    label: "WORKFLOW RUNTIME",
    title: "What state does an agent workflow need?",
    detail: "Cognia stores workflow versions, dispatches ordered agent steps, and persists run snapshots and traces.",
    result: "The backend supports inspection and resume; the visual workflow builder is still a product direction.",
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

const smallerBuilds = [
  {
    number: "06",
    label: "SYSTEMS LEARNING",
    title: "Fundamental Journey",
    detail: "An interactive 3D map connecting programs, processes, threads, scheduling, cores, and context switching.",
    status: "The React and Three.js prototype has a guided road, topic scenes, and notes. It is an exploration of how to teach invisible systems concepts visually.",
  },
  {
    number: "07",
    label: "EVENTS",
    title: "An order event, then an inventory decision",
    detail: "A small FastAPI and RabbitMQ flow publishes OrderCreated and lets an inventory consumer emit InventoryReserved or OutOfStock.",
    status: "A learning prototype for event flow, with a simulated stock check rather than a complete order system.",
  },
  {
    number: "08",
    label: "BACKGROUND WORK",
    title: "A task outside the request path",
    detail: "A FastAPI endpoint queues text processing with Celery and Redis, then exposes task status and results by ID.",
    status: "The worker deliberately simulates delay and failures to exercise retries. The workload itself is only a demo.",
  },
  {
    number: "09",
    label: "LIVE UPDATES",
    title: "A small server-sent events loop",
    detail: "A Next.js page lists resources while a FastAPI endpoint streams newly created rows from a PostgreSQL-backed API.",
    status: "The prototype demonstrates one live update path. Its in-process event queue is not a multi-client broadcast system.",
  },
  {
    number: "10",
    label: "RAG FOUNDATIONS",
    title: "Building a retrieval service from the first slice",
    detail: "An early FastAPI RAG service experiment covers health and database setup, document loading, word chunks, and an embedding sketch.",
    status: "The production RAG design is a plan; the query and citation path is not implemented in this smaller experiment.",
  },
  {
    number: "11",
    label: "MEDIA API",
    title: "A local camera and microphone mirror",
    detail: "A browser experiment uses getUserMedia and enumerateDevices to preview a local stream, switch devices, and mute video.",
    status: "This tests media-device basics locally; it does not establish a peer-to-peer call.",
  },
  {
    number: "12",
    label: "MULTI-AGENT WRITING",
    title: "Research, brief, then article",
    detail: "A small CrewAI experiment moves a topic through web research, analysis, and Markdown drafting, saving both the final article and task outputs.",
    status: "A workflow exploration with saved sample output, not an editorial or factual-accuracy guarantee.",
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
          <div className="section-heading">
            <p className="eyebrow">FOCUSED EXPERIMENTS</p>
            <h2>Experiments behind the systems.</h2>
          </div>
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

        <section className="content-section" aria-labelledby="smaller-builds-title">
          <div className="section-heading">
            <p className="eyebrow">SMALLER BUILDS</p>
            <h2 id="smaller-builds-title">Learning by making a narrow path work.</h2>
          </div>
          <div className="lab-grid">
            {smallerBuilds.map((build) => (
              <article className="lab-card" key={build.number}>
                <div className="lab-card-top">
                  <span className="card-index">{build.number}</span>
                  <span className="eyebrow">{build.label}</span>
                </div>
                <h2>{build.title}</h2>
                <p>{build.detail}</p>
                <div className="lab-result"><span>CURRENT STATE</span><p>{build.status}</p></div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
