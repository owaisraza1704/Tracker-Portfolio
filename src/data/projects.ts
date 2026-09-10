export type ProjectIcon = "activity" | "network" | "brain";

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
    status: "Production project",
    badge: "ENTERPRISE AI",
    subtitle: "Enterprise Research Intelligence",
    runtimeLabel: "RESEARCH RUNTIME",
    runtimeFlow: "PLAN → RETRIEVE → REASON → VERIFY → SYNTHESIZE",
    description:
      "An agentic research system designed to turn complex business questions into structured, evidence-backed insights — combining agentic retrieval, tool use, reasoning, and source verification across multi-step research workflows.",
    heroIntro:
      "Useful research is not just retrieval followed by generation. It is a workflow for deciding what to investigate, checking what was found, and making the result traceable.",
    overview:
      "Nexus is designed for research workflows where a question cannot be answered reliably with a single search or model call. It coordinates planning, retrieval, reasoning, verification, and synthesis so that complex questions can become structured outputs with visible supporting evidence.",
    tags: [
      "Agentic RAG",
      "Tool Use",
      "Web Retrieval",
      "Source Verification",
      "Structured Outputs",
      "Async Workflows",
    ],
    stack: [
      "Agentic Retrieval",
      "Web Search",
      "Source Verification",
      "Tool Calling",
      "Structured Outputs",
      "Async Workflows",
    ],
    icon: "network",
    systemAreas: [
      {
        title: "Research Planning",
        tag: "PLAN",
        description:
          "Breaks a complex business question into research steps, constraints, and evidence requirements.",
      },
      {
        title: "Agentic Retrieval",
        tag: "RETRIEVE",
        description:
          "Uses retrieval and tools iteratively rather than assuming one search result contains the complete answer.",
      },
      {
        title: "Source Verification",
        tag: "VERIFY",
        description:
          "Checks claims against their supporting sources before they are allowed into the synthesized result.",
      },
      {
        title: "Structured Synthesis",
        tag: "OUTPUT",
        description:
          "Converts multi-step research into organized, evidence-backed insights that are easier to review and use.",
      },
    ],
    engineeringQuestions: [
      "How should an agent decide that it has enough evidence to stop researching?",
      "How can sources remain connected to the claims they support through synthesis?",
      "How should asynchronous retrieval and tool failures affect the research plan?",
      "How can structured outputs stay useful when the underlying evidence is incomplete?",
    ],
    currentStatus: "Production project",
    currentStatusDescription:
      "A research-oriented system focused on dependable retrieval, verification, and structured delivery across multi-step workflows.",
  },
  {
    slug: "cognia",
    system: "SYSTEM 03",
    name: "Cognia",
    status: "Experimental development",
    subtitle: "A Multi-Agent Framework, Built From Scratch",
    runtimeLabel: "AGENT RUNTIME",
    runtimeFlow: "DEFINE → DELEGATE → EXECUTE → COMMUNICATE → OBSERVE",
    description:
      "An experimental agent framework built from the ground up to explore the primitives behind multi-agent systems — from agent lifecycle and coordination to task execution, communication, and state management.",
    heroIntro:
      "Multi-agent systems become interesting when coordination is treated as a runtime problem, not just a collection of prompts with different names.",
    overview:
      "Cognia is an exploration of the machinery beneath multi-agent applications. It focuses on how agents are defined, how work is delegated, how execution and communication happen, and how shared state and observations shape the next action.",
    tags: [
      "Agent Runtime",
      "Multi-Agent Systems",
      "Task Delegation",
      "Agent Communication",
      "Tool Execution",
      "State Management",
      "Orchestration",
    ],
    stack: [
      "Agent Lifecycle",
      "Task Delegation",
      "Message Passing",
      "Tool Execution",
      "Shared State",
      "Orchestration",
    ],
    icon: "brain",
    systemAreas: [
      {
        title: "Agent Lifecycle",
        tag: "DEFINE",
        description:
          "Defines the responsibilities, capabilities, and state transitions that make an agent a runtime participant.",
      },
      {
        title: "Task Delegation",
        tag: "DELEGATE",
        description:
          "Explores how a larger objective can be divided, assigned, tracked, and brought back together.",
      },
      {
        title: "Agent Communication",
        tag: "COMMUNICATE",
        description:
          "Makes messages, handoffs, and coordination explicit so collaboration is observable instead of hidden in prompts.",
      },
      {
        title: "State & Observation",
        tag: "OBSERVE",
        description:
          "Maintains the runtime information needed to understand what happened and choose the next meaningful step.",
      },
    ],
    engineeringQuestions: [
      "What belongs in an individual agent, and what belongs in the orchestration runtime?",
      "How should agents communicate without creating an unbounded message history?",
      "How can delegated work be observed, interrupted, retried, or completed safely?",
      "What shared state is necessary for coordination without making every agent tightly coupled?",
    ],
    currentStatus: "Experimental development",
    currentStatusDescription:
      "An evolving framework for understanding multi-agent primitives through small, inspectable runtime experiments.",
  },
];
