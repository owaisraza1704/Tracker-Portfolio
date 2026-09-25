import { projects, type PortfolioProject } from "./projects";
import { notes, type EngineeringNote } from "./writing";

export type TextCard = {
  title: string;
  description: string;
  label?: string;
  number?: string;
};
export type LabCard = {
  number: string;
  label: string;
  title: string;
  detail: string;
  result?: string;
  status?: string;
  href?: string;
};

export type SiteContent = {
  home: {
    heroPill: string;
    heroBefore: string;
    heroAccent: string;
    heroAfter: string;
    heroDescription: string;
    heroCaption: string;
    introTitle: string;
    introDescription: string;
    domainsTitle: string;
    domainsDescription: string;
    focusDomains: TextCard[];
    careerTitle: string;
    careerDescription: string;
    careerEntry: {
      role: string;
      company: string;
      period: string;
      location: string;
      description: string;
    };
  };
  projects: PortfolioProject[];
  notes: EngineeringNote[];
  about: {
    title: string;
    lead: string;
    approachTitle: string;
    approachParagraphs: string[];
    principles: TextCard[];
    capabilities: { title: string; items: string }[];
    experience: {
      role: string;
      company: string;
      period: string;
      description: string;
    };
  };
  lab: {
    title: string;
    lead: string;
    experiments: LabCard[];
    smallerBuilds: LabCard[];
  };
  now: {
    title: string;
    lead: string;
    focus: {
      label: string;
      title: string;
      description: string;
      href: string;
    }[];
  };
  contact: {
    title: string;
    lead: string;
    channels: {
      label: string;
      detail: string;
      href: string;
      icon: "mail" | "github" | "linkedin";
    }[];
  };
};

const experiments: LabCard[] = [
  {
    number: "01",
    label: "MODEL EVALUATION",
    title: "Can fine-tuning improve a structured agent config?",
    detail:
      "A Qwen3-1.7B LoRA comparison across 30 held-out requirements measured schema validity and semantic quality separately.",
    result:
      "The base model remained the better end-to-end choice: 0.288 versus 0.278 for the best adapter.",
    href: "/projects/agentconfig-evaluation",
  },
  {
    number: "02",
    label: "RETRIEVAL",
    title: "Can a small research API keep its evidence inspectable?",
    detail:
      "Nexus stores the document snapshot, retrieved passages, answer, and citation locations for each query.",
    result:
      "A 20-question labeled synopsis set reached Recall@5 of 0.9317. That is a narrow retrieval baseline, not an answer-quality guarantee.",
    href: "/projects/nexus",
  },
  {
    number: "03",
    label: "WORKFLOW RUNTIME",
    title: "What state does an agent workflow need?",
    detail:
      "Cognia stores workflow versions, dispatches ordered agent steps, and persists run snapshots and traces.",
    result:
      "The backend supports inspection and resume; the visual workflow builder is still a product direction.",
    href: "/projects/cognia",
  },
  {
    number: "04",
    label: "AGENT INTERFACE",
    title: "Can an agent and a visitor share one application state?",
    detail:
      "Voyage exposes travel actions through WebMCP while the normal UI shows the same destination, filters, and itinerary.",
    result:
      "Booking is simulated and requires an explicit confirmation in the interaction flow.",
    href: "/projects/voyage",
  },
  {
    number: "05",
    label: "EXPLAINABLE PIPELINES",
    title: "Can a market signal show how it was assembled?",
    detail:
      "A small gold and silver intelligence prototype moves data through ingest, filter, classify, reason, and aggregate stages.",
    result:
      "Typed stage outputs and trace logs make skipped inputs and intermediate decisions inspectable. It remains a prototype, not a live market service.",
  },
];

const smallerBuilds: LabCard[] = [
  {
    number: "06",
    label: "SYSTEMS LEARNING",
    title: "Fundamental Journey",
    detail:
      "An interactive 3D map connecting programs, processes, threads, scheduling, cores, and context switching.",
    status:
      "The React and Three.js prototype has a guided road, topic scenes, and notes. It is an exploration of how to teach invisible systems concepts visually.",
  },
  {
    number: "07",
    label: "EVENTS",
    title: "An order event, then an inventory decision",
    detail:
      "A small FastAPI and RabbitMQ flow publishes OrderCreated and lets an inventory consumer emit InventoryReserved or OutOfStock.",
    status:
      "A learning prototype for event flow, with a simulated stock check rather than a complete order system.",
  },
  {
    number: "08",
    label: "BACKGROUND WORK",
    title: "A task outside the request path",
    detail:
      "A FastAPI endpoint queues text processing with Celery and Redis, then exposes task status and results by ID.",
    status:
      "The worker deliberately simulates delay and failures to exercise retries. The workload itself is only a demo.",
  },
  {
    number: "09",
    label: "LIVE UPDATES",
    title: "A small server-sent events loop",
    detail:
      "A Next.js page lists resources while a FastAPI endpoint streams newly created rows from a PostgreSQL-backed API.",
    status:
      "The prototype demonstrates one live update path. Its in-process event queue is not a multi-client broadcast system.",
  },
  {
    number: "10",
    label: "RAG FOUNDATIONS",
    title: "Building a retrieval service from the first slice",
    detail:
      "An early FastAPI RAG service experiment covers health and database setup, document loading, word chunks, and an embedding sketch.",
    status:
      "The production RAG design is a plan; the query and citation path is not implemented in this smaller experiment.",
  },
  {
    number: "11",
    label: "MEDIA API",
    title: "A local camera and microphone mirror",
    detail:
      "A browser experiment uses getUserMedia and enumerateDevices to preview a local stream, switch devices, and mute video.",
    status:
      "This tests media-device basics locally; it does not establish a peer-to-peer call.",
  },
  {
    number: "12",
    label: "MULTI-AGENT WRITING",
    title: "Research, brief, then article",
    detail:
      "A small CrewAI experiment moves a topic through web research, analysis, and Markdown drafting, saving both the final article and task outputs.",
    status:
      "A workflow exploration with saved sample output, not an editorial or factual-accuracy guarantee.",
  },
];

export const initialContent: SiteContent = {
  home: {
    heroPill: "Backend & AI engineer · Chennai",
    heroBefore: "Building AI as ",
    heroAccent: "useful systems,",
    heroAfter: " not isolated answers.",
    heroDescription:
      "I turn questions into working products — connecting models, evidence, application state, and the interfaces people use.",
    heroCaption: "Thoughtful systems, built one clear step at a time.",
    introTitle: "A living view of the work.",
    introDescription:
      "The portfolio brings together the systems I am building, the ideas I am exploring, and the engineering questions that keep pulling me deeper.",
    domainsTitle: "What I Spend My Time On",
    domainsDescription:
      "Core engineering problems bridging intelligent model reasoning with deterministic backend infrastructure.",
    focusDomains: [
      {
        label: "01",
        title: "AI Systems",
        description:
          "How models, tools, state, and runtime logic work together when the system has to do more than produce an answer.",
      },
      {
        label: "02",
        title: "Backend Engineering",
        description:
          "The boring-but-important machinery that keeps everything alive — APIs, services, databases, performance, and reliability.",
      },
      {
        label: "03",
        title: "Retrieval & Memory",
        description:
          "Helping systems remember the right thing without drowning the model in context.",
      },
      {
        label: "04",
        title: "System Design",
        description:
          "State, failures, recovery, reliability, and all the things architecture has to account for.",
      },
      {
        label: "05",
        title: "Agentic Workflows",
        description:
          "Planning, delegation, tool use, and orchestration across multi-step AI workflows.",
      },
      {
        label: "06",
        title: "Learning & Evaluation",
        description:
          "Building systems around practice, evidence, feedback, and reliable evaluation.",
      },
    ],
    careerTitle: "Where I Do This Professionally",
    careerDescription:
      "Working across AI systems and backend engineering — building LLM-powered agent and retrieval systems, enterprise APIs, and reliable backend services for production workflows.",
    careerEntry: {
      role: "System Engineer",
      company: "Tata Consultancy Services",
      period: "Apr 2024 – Present",
      location: "Chennai, India",
      description:
        "Working across AI systems and backend engineering — building LLM-powered agent and retrieval systems, enterprise APIs, and reliable backend services for production workflows.",
    },
  },
  projects,
  notes,
  about: {
    title: "Curious about what happens after the model responds.",
    lead: "I'm Owais Raza, a backend and AI engineer based in Chennai. I build systems where models, data, tools, and application state have to work together reliably.",
    approachTitle: "From an interesting idea to an inspectable system.",
    approachParagraphs: [
      "My work usually begins with a practical question: what would it take for an AI system to help someone complete a real task? That question has led me through retrieval, agent execution, learning systems, structured model evaluation, and the backend machinery around them.",
      "I like breaking a large idea into a small runtime that can be exercised and understood. The interface matters, but so do the state transitions, stored evidence, failure behavior, and the measurements that tell us whether the system is improving.",
      "I also keep working notes on processes, threads, scheduling, memory, polling, pub/sub, and streaming. Small builds help me turn those concepts into something I can observe: a queued task, an inventory event, a live browser update, or a visual teaching scene.",
    ],
    principles: [
      {
        number: "01",
        title: "Make the state visible",
        description:
          "Whether it is a learner's progress, an agent run, or a support request, I want the system to show where it is and why it moved there.",
      },
      {
        number: "02",
        title: "Keep evidence attached",
        description:
          "Retrieval and model output are useful only when someone can inspect the source, measure the result, and understand what remains uncertain.",
      },
      {
        number: "03",
        title: "Design for the full workflow",
        description:
          "I enjoy connecting the model, API, data, interface, and failure path into one experience that a person can actually use.",
      },
    ],
    capabilities: [
      {
        title: "AI systems",
        items: "Agent runtimes, tool use, structured outputs, model evaluation",
      },
      {
        title: "Retrieval",
        items: "Document ingestion, vector search, source grounding, citations",
      },
      {
        title: "Backend",
        items: "Python APIs, PostgreSQL, queues, events, and live updates",
      },
      {
        title: "Interfaces",
        items: "Next.js, React, TypeScript, human and agent interactions",
      },
    ],
    experience: {
      role: "System Engineer",
      company: "Tata Consultancy Services",
      period: "Apr 2024 — Present · Chennai, India",
      description:
        "Building and working with LLM-powered systems, backend APIs, and production workflows. My public project work explores the same questions through independent prototypes and experiments.",
    },
  },
  lab: {
    title: "Small experiments. Clear evidence.",
    lead: "A place for the prototypes and measurements behind the larger projects. Each result has a boundary; the unanswered questions are part of the work.",
    experiments,
    smallerBuilds,
  },
  now: {
    title: "Where my attention is going.",
    lead: "The projects and questions currently shaping my independent work.",
    focus: [
      {
        label: "01 / BUILDING",
        title: "Trellis",
        description:
          "Working toward a learning environment where a structured path, scoped AI help, exploration threads, and saved progress stay connected.",
        href: "/projects/trellis",
      },
      {
        label: "02 / TESTING",
        title: "Nexus",
        description:
          "Testing the local, single-document research API: ingestion, retrieval, bounded answers, citation snapshots, and explicit insufficient-context responses.",
        href: "/projects/nexus",
      },
      {
        label: "03 / MEASURING",
        title: "Model reliability",
        description:
          "Comparing structured-output checkpoints by schema validity and end-to-end usefulness, not by conditional semantic score alone.",
        href: "/projects/agentconfig-evaluation",
      },
    ],
  },
  contact: {
    title: "Let's talk about the work.",
    lead: "Reach out about AI systems, backend engineering, retrieval, agent interfaces, or a project that could use careful systems thinking.",
    channels: [
      {
        label: "Email",
        detail: "owaisraza1704@gmail.com",
        href: "mailto:owaisraza1704@gmail.com",
        icon: "mail",
      },
      {
        label: "GitHub",
        detail: "owaisraza1704",
        href: "https://github.com/owaisraza1704",
        icon: "github",
      },
      {
        label: "LinkedIn",
        detail: "owaisraza1704",
        href: "https://www.linkedin.com/in/owaisraza1704/",
        icon: "linkedin",
      },
    ],
  },
};
