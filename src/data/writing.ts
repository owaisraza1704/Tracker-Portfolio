export type EngineeringNote = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  relatedProject: "/projects/agentconfig-evaluation" | "/projects/nexus" | "/projects/voyage";
  sections: { heading: string; paragraphs: string[] }[];
};

export const notes: EngineeringNote[] = [
  {
    slug: "schema-validity-before-semantic-score",
    category: "MODEL EVALUATION",
    title: "The checkpoint that sounded better and worked worse",
    summary: "What a Qwen3 AgentConfig experiment taught me about measuring the whole structured-output path.",
    relatedProject: "/projects/agentconfig-evaluation",
    sections: [
      {
        heading: "The task had a strict shape",
        paragraphs: [
          "The experiment asked Qwen3-1.7B to turn a business requirement into an AgentConfig JSON object: name, role, goal, ordered tasks, tools, and constraints. A useful answer needed both the right idea and the required schema. A missing task sequence or tools array made the configuration unusable even when the prose looked sensible.",
          "I froze a 140-example training set, a 30-example validation set, and 30 held-out test requirements. The prompt and test cases stayed the same across the base model and each LoRA checkpoint so the comparison would reflect the model change.",
        ],
      },
      {
        heading: "Two scores told different stories",
        paragraphs: [
          "The base model produced schema-valid outputs for 14 of 30 test cases and scored 0.288 end-to-end. The final checkpoint had the best conditional semantic score, 0.736 versus the base model's 0.618, but only 11 of its 30 responses matched the schema. Its end-to-end score fell to 0.270.",
          "The best fine-tuned checkpoint by end-to-end score was epoch 2 at 0.278. That was still below the base model. The decision was to keep the base model as the evaluation baseline and deploy no adapter yet.",
        ],
      },
      {
        heading: "What the result changes",
        paragraphs: [
          "Conditional semantic quality is a useful diagnostic, but it answers a narrower question: how good were the responses that passed the structural gate? For this application, invalid configurations cannot be treated as successes. The end-to-end score includes that failure cost.",
          "A later production path might validate, retry, or repair outputs. Those mechanisms should be measured separately from the raw model comparison. Otherwise a benchmark can hide the behavior it was meant to reveal.",
        ],
      },
    ],
  },
  {
    slug: "what-a-citation-needs-to-remember",
    category: "RETRIEVAL & EVIDENCE",
    title: "What a citation needs to remember",
    summary: "In Nexus, an answer is more useful when its evidence can still be inspected after the request is over.",
    relatedProject: "/projects/nexus",
    sections: [
      {
        heading: "A link to a source is not enough",
        paragraphs: [
          "A research answer can name a document and still leave the reader unable to check the claim. The useful unit is the passage the system actually retrieved, together with enough location information to find it in the source. That is the boundary the first Nexus API release explores.",
          "The local API accepts one PDF or DOCX, parses it into chunks, stores embeddings, and retrieves passages for a question. The answer service receives a bounded set of those chunks, then saves its answer and citation references.",
        ],
      },
      {
        heading: "Preserve the document snapshot",
        paragraphs: [
          "A source can be reprocessed later. If an old answer only points to the latest version, its citations may silently change meaning. Nexus saves the document snapshot searched by each query and copies display locations into the citation record. A saved answer can therefore be reopened against the evidence it actually used.",
          "The server also checks that cited labels belong to the retrieved context. Empty retrieval or an inadequate passage set can lead to an explicit insufficient-context result rather than a confident answer without support.",
        ],
      },
      {
        heading: "The limit is still real",
        paragraphs: [
          "A valid citation reference proves that a passage was available to the model. It does not prove every sentence in the answer follows from that passage. The current single-document MVP and its small evaluation set establish an inspectable path, not general factual correctness.",
          "The next research question is how to measure claim support across more documents and more varied questions without losing that inspectability.",
        ],
      },
    ],
  },
  {
    slug: "one-trip-two-interfaces",
    category: "AGENT INTERFACES",
    title: "One trip, two ways to use the app",
    summary: "The design idea behind Voyage: let people browse and let an agent help without splitting the trip into two realities.",
    relatedProject: "/projects/voyage",
    sections: [
      {
        heading: "The agent should know the app's actions",
        paragraphs: [
          "Voyage is a travel planning prototype with destination browsing, stay filters, an itinerary, and a simulated booking. A person can use the normal interface or issue requests in a command dock. The agent is given meaningful app capabilities through WebMCP, such as setting trip details, finding stays, and preparing a booking summary.",
          "That is a more stable contract than asking an agent to infer the app from pixels and imitate clicks. It also makes the action being requested easier to inspect.",
        ],
      },
      {
        heading: "Both paths must change the same trip",
        paragraphs: [
          "The graphical controls and agent tools update shared application state. When either path changes dates, filters, or an itinerary, the other path sees the same result. The user can switch between manual and agent-assisted planning without starting over.",
          "Text and voice are input modes around this same interaction model. The voice path adds Realtime speech, but the application still has to make state changes visible in the interface.",
        ],
      },
      {
        heading: "Consequential actions need a pause",
        paragraphs: [
          "Browsing and filtering can be immediate. A booking or cancellation changes a more consequential state, even in a simulation, so Voyage presents a summary and waits for explicit confirmation. The confirmation is part of the product behavior rather than a courtesy message from the assistant.",
          "The prototype uses local travel data and simulated bookings. It is a way to test this human-and-agent interaction pattern, not a live travel service.",
        ],
      },
    ],
  },
];
