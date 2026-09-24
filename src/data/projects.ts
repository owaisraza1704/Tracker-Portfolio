export type ProjectIcon = "activity" | "network" | "brain" | "compass" | "layers" | "flask";

export type ProjectArea = {
  title: string;
  tag: string;
  description: string;
};

export type PortfolioProject = {
  slug: string;
  system: string;
  name: string;
  status?: string;
  badge?: string;
  subtitle: string;
  runtimeLabel: string;
  runtimeFlow: string;
  description: string;
  githubUrl?: string;
  heroIntro: string;
  overview: string;
  tags: string[];
  stack: string[];
  icon: ProjectIcon;
  featured?: boolean;
  systemAreas: ProjectArea[];
  engineeringQuestions: string[];
  currentStatus: string;
  currentStatusDescription: string;
};

export const projects: PortfolioProject[] = [
  {
    slug: "trellis",
    system: "SYSTEM 01",
    name: "Trellis",
    status: "Active development",
    badge: "FLAGSHIP SYSTEM",
    subtitle: "State-Anchored Learning Intelligence",
    runtimeLabel: "LEARNING RUNTIME",
    runtimeFlow: "CURRICULUM → CONTEXT → PRACTICE → EVIDENCE → MASTERY",
    description:
      "An AI learning system I'm building to make technical learning structured, adaptive, and deeply practical — combining deterministic curriculum state with scoped LLM tutoring, retrieval, and evidence-based evaluation.",
    heroIntro:
      "The interesting problem is not making an assistant explain a topic. It is making learning progress explicit, observable, and useful over time.",
    overview:
      "Trellis combines a deterministic learning state with focused AI assistance. The system represents what someone is learning, what context they need, what they have practiced, and what evidence supports their progress — while keeping the language model inside a clear, scoped tutoring role.",
    tags: [
      "State Machine",
      "Curriculum Graph",
      "Scoped Context",
      "RAG",
      "Evaluation",
      "Evidence",
      "Learning State",
    ],
    stack: [
      "State Machines",
      "Curriculum Graphs",
      "LLM Tutoring",
      "Retrieval",
      "Evaluation",
      "Evidence Modeling",
    ],
    icon: "activity",
    featured: true,
    githubUrl: "https://github.com/owaisraza1704/Trellis-LearningJourney",
    systemAreas: [
      {
        title: "Curriculum Graph",
        tag: "STRUCTURE",
        description:
          "Represents topics, dependencies, and progression as an explicit structure instead of an unbounded conversation.",
      },
      {
        title: "Scoped Context",
        tag: "RETRIEVAL",
        description:
          "Selects the material and learning context relevant to the current step without overwhelming the tutoring model.",
      },
      {
        title: "Practice Runtime",
        tag: "EXECUTION",
        description:
          "Turns understanding into focused exercises and practical tasks that produce observable learning evidence.",
      },
      {
        title: "Mastery State",
        tag: "EVALUATION",
        description:
          "Connects practice results and evidence back to a learning state that can guide what happens next.",
      },
    ],
    engineeringQuestions: [
      "How should a learning state change when evidence is incomplete or contradictory?",
      "What context does the tutor need for this step, and what should remain outside the prompt?",
      "How can evaluation measure practical understanding instead of only answer correctness?",
      "How should the system adapt without making the curriculum structure unpredictable?",
    ],
    currentStatus: "Active development",
    currentStatusDescription:
      "The core model is being shaped around explicit curriculum state, scoped context, practice, and evidence.",
  },
  {
    slug: "nexus",
    system: "SYSTEM 02",
    name: "Nexus",
    status: "Local API MVP",
    badge: "EVIDENCE-GROUNDED RESEARCH",
    subtitle: "A source-grounded research engine",
    runtimeLabel: "CURRENT API PATH",
    runtimeFlow: "UPLOAD → PARSE → INDEX → RETRIEVE → ANSWER",
    description:
      "A local research API that turns a question over an uploaded PDF or DOCX into a saved answer with inspectable citations, or an explicit insufficient-context result.",
    heroIntro:
      "A useful answer needs to show which document passage supports it and admit when the document does not contain enough evidence.",
    overview:
      "The current MVP accepts one text PDF or DOCX, parses and chunks it, embeds the chunks in PostgreSQL with pgvector, retrieves relevant passages, and produces a persisted answer. Citation references retain document and location details so a saved answer can be inspected later. Multi-document planning and broader research orchestration remain future work.",
    tags: [
      "Document Ingestion",
      "Vector Retrieval",
      "Structured Answers",
      "Citation Snapshots",
      "Evaluation",
    ],
    stack: [
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Docling",
      "Azure OpenAI",
      "Python",
    ],
    icon: "network",
    githubUrl: "https://github.com/owaisraza1704/Nexus-ResearchEngine",
    systemAreas: [
      {
        title: "Document ingestion",
        tag: "INGEST",
        description:
          "Parses PDFs and DOCX files into searchable chunks while retaining document structure and location details.",
      },
      {
        title: "Scoped retrieval",
        tag: "SEARCH",
        description:
          "Ranks passages from the selected document and saves the exact document snapshot used by the query.",
      },
      {
        title: "Grounded answer boundary",
        tag: "ANSWER",
        description:
          "Limits generation to retrieved context, validates citation references, and returns insufficient context when needed.",
      },
      {
        title: "Saved evidence",
        tag: "TRACE",
        description:
          "Persists retrieval results, answer metadata, and citation locations for later inspection.",
      },
    ],
    engineeringQuestions: [
      "Which retrieved passages actually support each generated claim?",
      "How can a citation remain stable after its source changes?",
      "When should the API return insufficient context instead of an answer?",
      "How well does retrieval work beyond the small labeled evaluation set?",
    ],
    currentStatus: "Local API MVP",
    currentStatusDescription:
      "Single-document upload, retrieval, grounded answer, persistence, and citation inspection are implemented. A frontend and multi-document research flow are outside this release.",
  },
  {
    slug: "cognia",
    system: "SYSTEM 03",
    name: "Cognia",
    status: "Workflow backend prototype",
    subtitle: "A versioned workflow and agent runtime",
    runtimeLabel: "WORKFLOW RUNTIME",
    runtimeFlow: "VERSION → START → RUN → CHECKPOINT → RESUME",
    description:
      "A FastAPI backend for versioned agent workflows, durable run records, checkpointed execution, and resumable traces.",
    heroIntro:
      "A useful agent workflow needs a versioned definition and a run history that can be inspected and resumed.",
    overview:
      "Cognia's backend stores immutable workflow versions and starts runs through inline or Celery-backed adapters. A workflow runner executes ordered agent steps, passes outputs forward, and saves run snapshots and detailed traces. The API can list runs, inspect one execution, and request a resume. A visual workflow builder remains a product direction rather than a finished interface.",
    tags: [
      "Workflow Versions",
      "Agent Runtime",
      "Durable Runs",
      "Checkpoints",
      "Resume",
      "Execution Traces",
    ],
    stack: [
      "FastAPI",
      "Python",
      "SQLAlchemy",
      "Celery",
      "Workflow Runner",
      "Agent Runner",
    ],
    icon: "brain",
    systemAreas: [
      {
        title: "Versioned workflows",
        tag: "AUTHOR",
        description:
          "Stores immutable workflow versions with ordered steps and an agent definition for each step.",
      },
      {
        title: "Run start",
        tag: "DISPATCH",
        description:
          "Creates a durable run record, then hands execution to an inline or Celery-backed start adapter.",
      },
      {
        title: "Agent and workflow runners",
        tag: "EXECUTE",
        description:
          "Runs linear workflow steps, resolves agent reasoning strategies, and passes completed outputs into later steps.",
      },
      {
        title: "Durable run history",
        tag: "INSPECT",
        description:
          "Persists lifecycle state, step results, agent traces, and checkpoints for inspection and resume.",
      },
    ],
    engineeringQuestions: [
      "What belongs in an agent step, and what belongs in the workflow runtime?",
      "How can a stored workflow version keep a past run reproducible?",
      "Which checkpoints are needed to resume without repeating completed steps?",
      "How should background execution report its state to the person inspecting a run?",
    ],
    currentStatus: "Workflow backend prototype",
    currentStatusDescription:
      "The FastAPI backend has workflow versioning, execution and resume endpoints, agent and workflow runners, durable run records, and tests around those paths. The visual builder is still a direction rather than a finished product.",
  },
  {
    slug: "voyage",
    system: "SYSTEM 04",
    name: "Voyage",
    status: "Interactive prototype",
    badge: "AGENT-NATIVE UI",
    subtitle: "Travel planning through a shared human and agent interface",
    runtimeLabel: "TRIP FLOW",
    runtimeFlow: "EXPLORE → FILTER → PLAN → CONFIRM → BOOK",
    description:
      "A travel prototype where a visitor can use the normal UI or ask an agent to update the same destination, stay filters, itinerary, and simulated booking.",
    githubUrl: "https://github.com/owaisraza1704/Voyage-AgentNativeTravelItinerary",
    heroIntro:
      "The interesting question is whether an agent can operate the application through meaningful capabilities while the person still sees and controls the same trip.",
    overview:
      "Voyage combines a browsable travel interface with a natural-language command dock. WebMCP exposes app actions to the agent; those actions update the same shared state as the graphical interface. Booking and cancellation ask for explicit confirmation. Destinations and stays are local data, and bookings are simulated rather than connected to a travel supplier.",
    tags: ["WebMCP", "Shared State", "Agent UX", "Realtime Voice", "Confirmation"],
    stack: ["Next.js", "React", "TypeScript", "WebMCP", "WebRTC", "SQLite"],
    icon: "compass",
    systemAreas: [
      { title: "Shared trip state", tag: "STATE", description: "Keeps destination, dates, travelers, filters, itinerary, and booking visible across UI and agent actions." },
      { title: "Semantic app tools", tag: "TOOLS", description: "Exposes meaningful travel operations through WebMCP instead of having the agent mimic browser clicks." },
      { title: "Voice and text", tag: "INPUT", description: "Provides a command dock with text input and a Realtime voice path for conversational planning." },
      { title: "Explicit confirmation", tag: "TRUST", description: "Pauses before simulated booking or cancellation so the visitor approves consequential actions." },
    ],
    engineeringQuestions: [
      "How do UI actions and agent actions remain consistent when they change the same trip?",
      "Which actions can happen immediately, and which require confirmation?",
      "How does a voice session show what changed in the visible interface?",
      "What should the app do when a requested stay is unavailable?",
    ],
    currentStatus: "Interactive prototype",
    currentStatusDescription:
      "Core browsing, itinerary, WebMCP, and simulated booking flows exist. The project does not connect to live inventory, real payments, or reservation providers.",
  },
  {
    slug: "rezolve",
    system: "SYSTEM 05",
    name: "Rezolve",
    status: "Design and prototype",
    subtitle: "A live room for urgent technical help",
    runtimeLabel: "SUPPORT FLOW",
    runtimeFlow: "REQUEST → MATCH → CLAIM → CONNECT → RESOLVE",
    description:
      "A support marketplace concept centered on the hard part of live assignment: one resolver wins a claim, while unclaimed requests can move to a later follow-up path.",
    githubUrl: "https://github.com/owaisraza1704/Project-Rezolve",
    heroIntro:
      "The core challenge is deciding who owns a request when several people try to claim it at once.",
    overview:
      "Rezolve explores urgent support as a stateful matching workflow. The design starts with requests and resolver claims, then expands toward an offline queue, notifications, and private communication. A UI and backend workspace exist, but the full realtime and load-tested workflow is still under development.",
    tags: ["Realtime Systems", "Claim Races", "State Transitions", "Support UX"],
    stack: ["React", "TypeScript", "FastAPI", "SQLAlchemy", "PostgreSQL"],
    icon: "layers",
    systemAreas: [
      { title: "Ticket lifecycle", tag: "STATE", description: "Models a request from creation through live availability, claim, and offline follow-up." },
      { title: "Single-winner claim", tag: "CORRECTNESS", description: "Treats concurrent claim attempts as the central backend correctness problem." },
      { title: "Resolver workspace", tag: "UI", description: "Presents available work and a clear path from assignment to a support room." },
      { title: "Later recovery", tag: "FOLLOW-UP", description: "Plans for unclaimed requests to remain useful when the live window closes." },
    ],
    engineeringQuestions: [
      "How is one claim winner guaranteed under a burst of requests?",
      "How does a request move from the live board into offline follow-up?",
      "How can both participants rejoin the correct private room?",
      "Where should notifications and realtime updates sit relative to the critical claim path?",
    ],
    currentStatus: "Design and prototype",
    currentStatusDescription:
      "The repository contains a UI, backend, and detailed implementation plan. The complete realtime matching flow and concurrency proof should not be treated as finished.",
  },
  {
    slug: "agentconfig-evaluation",
    system: "SYSTEM 06",
    name: "AgentConfig Evaluation",
    status: "Measured experiment",
    badge: "MODEL EVALUATION",
    subtitle: "Qwen3 fine-tuning measured against end-to-end reliability",
    runtimeLabel: "EVALUATION PATH",
    runtimeFlow: "DATASET → INFERENCE → VALIDATE → SCORE → DECIDE",
    description:
      "A reproducible experiment for converting requirements into structured agent configurations, comparing base Qwen3-1.7B with LoRA checkpoints on held-out cases.",
    heroIntro:
      "A model can sound better while becoming less useful if its structured responses stop matching the required schema.",
    overview:
      "The project defines an AgentConfig schema, a frozen 140/30/30 train-validation-test split, deterministic inference, structural checks, and semantic scoring. On 30 held-out requirements, the base model produced schema-valid outputs in 14 cases. Every evaluated fine-tuned checkpoint scored lower end-to-end, so the base model remained the baseline.",
    tags: ["Qwen3", "LoRA", "Schema Validation", "Evaluation", "Apple Silicon"],
    stack: ["Python", "MLX-LM", "vLLM-Metal", "Pydantic", "Qwen3-1.7B"],
    icon: "flask",
    systemAreas: [
      { title: "Frozen dataset", tag: "DATA", description: "Separates 140 training, 30 validation, and 30 held-out test examples." },
      { title: "Structural checks", tag: "VALIDATE", description: "Tests JSON parsing and required AgentConfig fields before judging semantic quality." },
      { title: "Checkpoint comparison", tag: "MEASURE", description: "Scores the base model and three training checkpoints on the same test requirements." },
      { title: "Deployment decision", tag: "DECIDE", description: "Retains the base model after adapters improved conditional semantics but reduced end-to-end reliability." },
    ],
    engineeringQuestions: [
      "How should invalid structured outputs affect an overall model score?",
      "When does fine-tuning improve a useful application outcome rather than one conditional metric?",
      "How can schema repair be measured separately from raw model behavior?",
      "What data or generation change would improve long task lists and no-tool cases?",
    ],
    currentStatus: "Evaluation complete",
    currentStatusDescription:
      "The documented 30-case comparison retained base Qwen3-1.7B: 46.7% schema-valid and 0.288 end-to-end versus a best adapter score of 0.278. Further experiments remain open.",
  },
];
