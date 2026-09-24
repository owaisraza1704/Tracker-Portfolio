export type EngineeringNote = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  relatedHref: "/projects/agentconfig-evaluation" | "/projects/nexus" | "/projects/voyage" | "/projects/trellis" | "/projects/cognia" | "/lab";
  sections: { heading: string; paragraphs: string[] }[];
};

export const notes: EngineeringNote[] = [
  {
    slug: "schema-validity-before-semantic-score",
    category: "MODEL EVALUATION",
    title: "The checkpoint that sounded better and worked worse",
    summary: "What a Qwen3 AgentConfig experiment taught me about measuring the whole structured-output path.",
    relatedHref: "/projects/agentconfig-evaluation",
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
    relatedHref: "/projects/nexus",
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
    relatedHref: "/projects/voyage",
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
  {
    slug: "a-learning-tangent-needs-its-own-context",
    category: "LEARNING SYSTEMS",
    title: "A learning tangent needs its own context",
    summary: "The Trellis design separates a learner's path, active topic, exploratory threads, and evidence so a useful detour does not erase progress.",
    relatedHref: "/projects/trellis",
    sections: [
      {
        heading: "One conversation is too many jobs",
        paragraphs: [
          "A learner may be studying process scheduling, ask for an example, then follow a question about memory. A single conversation can hold all of those messages, but it does not say which answer belongs to the main lesson, which belongs to the detour, or what should be waiting when the learner returns. Trellis starts with a structured path and a focused workspace for each learning node.",
          "The design keeps four kinds of context distinct. Global learning state records the path and active position. Primary-node context holds the current topic's interactions and progress. An exploratory thread holds the messages for one tangent. Evidence context contains the source material used to support a response. Each has a different job and a different reason to persist.",
        ],
      },
      {
        heading: "A detour should have a return path",
        paragraphs: [
          "An exploratory thread can begin with enough information to understand the related question, but its later messages stay in the thread. Asking more about memory should not silently add those messages to the scheduling node, mark that node complete, or change the selected place in the path. Returning should restore the primary node as the learner left it.",
          "That separation also makes the model's input easier to reason about. A response for the active node needs the relevant path position, that node's prior messages, and any retrieved evidence. It does not need every question the learner has ever asked in every tangent.",
        ],
      },
      {
        heading: "The test is a resumed journey",
        paragraphs: [
          "The useful proof is a sequence of actions: create a path, study a node, open a tangent, ask a question there, return to the node, close the app, and resume. At each step the path, node, thread, and evidence should still point to the right place. A polished chat screen alone cannot establish that behavior.",
          "This is a product and implementation boundary in the Trellis requirements. The current UI explores the experience; the complete persisted learning loop is still work to build and test. The design is valuable because it makes that missing runtime behavior explicit.",
        ],
      },
    ],
  },
  {
    slug: "an-agent-run-needs-a-durable-record",
    category: "AGENT RUNTIMES",
    title: "An agent run needs a durable record",
    summary: "Cognia separates a workflow definition, live execution state, and saved run record so an interrupted run can be inspected and resumed.",
    relatedHref: "/projects/cognia",
    sections: [
      {
        heading: "The definition and the run are different things",
        paragraphs: [
          "In Cognia, a workflow version is an immutable description of ordered agent steps. A run is one attempt to execute a selected version with particular inputs. Keeping those identities separate matters when a workflow changes: a past run should still refer to the version it actually used, not inherit the newest definition by accident.",
          "The live workflow runner needs mutable state while it advances through steps. The application also needs a durable run record containing lifecycle status, outputs, step results, and agent traces. The first helps execution proceed; the second lets someone inspect what happened after the request or worker has ended.",
        ],
      },
      {
        heading: "A checkpoint gives resume a place to start",
        paragraphs: [
          "Cognia persists snapshots at meaningful points in the workflow. A saved checkpoint can identify completed steps and a partial agent execution, allowing the runner to continue from stored state. The current implementation rewrites the durable snapshot at checkpoints; it is not an append-only event log.",
          "A resume request is a controlled redispatch of an existing run. The service checks whether the run is eligible, including whether a running worker appears stale. It does not treat every running or completed execution as something to restart. The HTTP route accepts the request; the execution service still owns the actual continuation.",
        ],
      },
      {
        heading: "The boundary is intentionally narrow",
        paragraphs: [
          "This backend supports linear workflows, versioned definitions, inline or Celery-backed processing, saved traces, and resumable runs. Tests cover version selection, partial checkpoints, and active versus stale resume cases. Those are concrete runtime properties rather than a promise that any arbitrary agent workflow can recover safely.",
          "Branching graphs, parallel steps, cancellation, and first-class tool calls remain outside the current runtime. The lesson from Cognia is to make the state needed for inspection and continuation explicit before adding more forms of orchestration.",
        ],
      },
    ],
  },
  {
    slug: "a-live-stream-is-not-a-broadcast",
    category: "LIVE UPDATES",
    title: "A live stream is not a broadcast",
    summary: "A small SSE prototype shows why a browser connection and a shared event queue solve different problems.",
    relatedHref: "/lab",
    sections: [
      {
        heading: "The first live path is simple",
        paragraphs: [
          "The realtime update prototype stores resources through a FastAPI API. Its Next.js page first fetches the saved rows, then opens an EventSource connection to receive newly created ones. The server sends each update as a text/event-stream response. This is a useful way to test a one-way live feed without making the browser poll for every change.",
          "The database holds the resource rows. The stream carries recent changes while the page is open. That distinction matters: a user who opens the page later can still load the current list from storage, even though the stream only observed events after connection.",
        ],
      },
      {
        heading: "One queue gives one consumer each item",
        paragraphs: [
          "The prototype puts new-resource events into one process-wide asyncio.Queue. Each connected stream waits on that same queue. When an event arrives, one waiting stream takes it. A second browser does not automatically receive a copy. The code demonstrates streaming, but the queue does not implement broadcast to every connected client.",
          "There is no event ID or replay path either. EventSource can reconnect after a broken connection, but a reconnect alone cannot recover an update that was emitted while the browser was away. The stored resource list remains the place to reconcile the screen with reality.",
        ],
      },
      {
        heading: "Delivery is a separate design choice",
        paragraphs: [
          "A multi-client version would need an explicit fan-out path, such as a queue per subscriber or a broker that publishes to each server instance. It would also need to decide what a reconnecting client should do: replay missed event IDs, fetch a fresh snapshot, or both. Those choices depend on the product's tolerance for missed updates.",
          "The current prototype does not make those guarantees. Its useful lesson is narrower: an open HTTP response makes updates visible, while delivery to all interested people requires its own state and routing design.",
        ],
      },
    ],
  },
  {
    slug: "a-task-id-is-only-the-beginning",
    category: "BACKGROUND WORK",
    title: "A task ID is only the beginning",
    summary: "The queue manager experiment separates an accepted HTTP request from completed work and a durable product outcome.",
    relatedHref: "/lab",
    sections: [
      {
        heading: "The request finishes before the work does",
        paragraphs: [
          "The mini queue manager accepts text at a FastAPI endpoint and sends a Celery task to Redis. The response returns a task ID immediately. A second endpoint looks up that ID and reports the current status, result, or failure. This small path makes a basic truth visible: receiving a request and finishing its work are different events.",
          "The worker intentionally sleeps and sometimes fails. It can retry before succeeding with a simple uppercase and length result. The artificial workload is useful for observing state transitions, but it does not establish the behavior of a real ingestion or payment job.",
        ],
      },
      {
        heading: "A result backend is not the product record",
        paragraphs: [
          "The demo reads status through Celery's AsyncResult. Its configuration expires stored results after one hour. That is reasonable for an experiment, but a task ID and a temporary result are not enough if a person must return tomorrow and see a reliable business outcome.",
          "For a longer workflow, I would store the job's own record: who requested it, what input or source it refers to, when it was accepted, and what final state the product should show. The worker can still use a queue, while the application record remains the source a user can reopen.",
        ],
      },
      {
        heading: "Retries need an operation they can repeat",
        paragraphs: [
          "The demo's retries are easy to see because the task only transforms text. A real task may write rows, send messages, or call another service before it fails. Repeating it can repeat those effects unless the operation has a clear identity and safe checkpoint or deduplication rule.",
          "This project stops at the small submit-and-poll loop. It taught me to ask what the status means, where the durable outcome lives, and what happens if the worker runs the same work again before calling a background job complete.",
        ],
      },
    ],
  },
];
