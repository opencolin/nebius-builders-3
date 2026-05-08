// Showcase projects shipped by Nebius Builders, Ambassadors, and Advocates.
// Inspired by ethglobal.com/showcase: cover + title + lede + builders + tech +
// hackathon/event + awards.

export type ProjectAuthorRole = "builder" | "ambassador" | "advocate";

export type ProjectAuthor = {
  name: string;
  handle: string;
  role: ProjectAuthorRole;
};

export type ProjectAward = {
  label: string;
  sponsor?: string;
};

export type Project = {
  slug: string;
  title: string;
  lede: string;
  description: string;
  cover: string;
  productFocus: string[];
  technologies: string[];
  authors: ProjectAuthor[];
  eventId?: string;
  eventTitle?: string;
  awards?: ProjectAward[];
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  shippedAt: string;
};

export const projects: Project[] = [
  {
    slug: "muglife",
    title: "Muglife",
    lede: "OpenClaw concierge agent that books, reorders, and routes loyalty perks across coffee chains.",
    description:
      "Multi-shop coffee concierge: ranks current cup quality, optimizes loyalty stack, and pre-orders so you skip the line. Token Factory powers the planner; Tavily handles real-time menu scrapes; Stripe handles payment.",
    cover: "from-lime-300 via-lime-200 to-navy-700",
    productFocus: ["openclaw", "tokenfactory"],
    technologies: ["OpenClaw", "Token Factory", "Tavily", "Stripe"],
    authors: [
      { name: "Colin Lowenberg", handle: "opencolin", role: "advocate" },
      { name: "Priya Iyer", handle: "priya", role: "builder" },
    ],
    eventId: "evt_clawcamp",
    eventTitle: "ClawCamp: Personal Agent Superpowers",
    awards: [{ label: "1st place — Best Use of OpenClaw", sponsor: "OpenClaw" }],
    githubUrl: "https://github.com/opencolin/muglife",
    demoUrl: "https://muglife.demo",
    shippedAt: "2026-04-16T22:00:00Z",
  },
  {
    slug: "quiver",
    title: "Quiver",
    lede: "Vector-memory benchmarking harness with deterministic replay across MotherDuck and Qdrant.",
    description:
      "Benchmark eval suite for agentic memory. Replays the same workload across MotherDuck and Qdrant, scores recall + latency + cost, and renders a side-by-side report. Open source under MIT.",
    cover: "from-navy-600 via-navy-700 to-navy-900",
    productFocus: ["tokenfactory", "aicloud"],
    technologies: ["OpenClaw", "MotherDuck", "Qdrant", "Token Factory"],
    authors: [{ name: "Alex Boros", handle: "aboros", role: "ambassador" }],
    eventId: "evt_qdrant",
    eventTitle: "OpenAI x Qdrant x Tandem AI Revenue Hackathon",
    awards: [{ label: "2nd place", sponsor: "Qdrant" }],
    githubUrl: "https://github.com/aboros/quiver",
    shippedAt: "2026-03-16T19:00:00Z",
  },
  {
    slug: "orbital",
    title: "Orbital",
    lede: "Multi-agent ground-station scheduler that ranks burn windows and auto-files FCC paperwork.",
    description:
      "Sub-agent fleet plans satellite contacts, optimizes burn windows for minimum fuel, and files the FCC special-temporary-authority paperwork in the right format. Built in 36 hours at Clash of Prompts.",
    cover: "from-navy-800 via-navy-700 to-lime/50",
    productFocus: ["tokenfactory", "openclaw"],
    technologies: ["OpenClaw", "Token Factory", "GLM-5"],
    authors: [
      { name: "Jason Lee", handle: "jlee", role: "builder" },
      { name: "Mei Miao", handle: "mmiao", role: "builder" },
    ],
    eventId: "evt_clash",
    eventTitle: "Clash of Prompts by Symbiotic",
    githubUrl: "https://github.com/jlee/orbital",
    shippedAt: "2026-05-08T19:00:00Z",
  },
  {
    slug: "thunder",
    title: "Thunder",
    lede: "Weather-aware power-grid agent that pre-buys hedges before storms hit.",
    description:
      "Watches NOAA models + ERCOT prices, simulates outage probability hour-by-hour, and pre-positions PJM/ERCOT hedges so utilities don't get caught short.",
    cover: "from-lime-400 via-lime-200 to-ink-200",
    productFocus: ["tokenfactory"],
    technologies: ["OpenClaw", "Token Factory"],
    authors: [{ name: "Daniel Perez", handle: "dperez", role: "builder" }],
    eventId: "evt_om1",
    eventTitle: "OpenMind OM1 Build Night",
    awards: [{ label: "Honorable mention" }],
    githubUrl: "https://github.com/dperez/thunder",
    demoUrl: "https://thunder.demo",
    shippedAt: "2026-05-06T22:00:00Z",
  },
  {
    slug: "gemma-finetune",
    title: "QLoRA Fine-tune Gemma 4 on Nebius",
    lede: "Validated 9-node fine-tune recipe + workshop runbook. Lifted ~30 attendees to a deployed adapter live.",
    description:
      "Reference recipe for hands-on fine-tuning workshops. Bash + Python infra skills wrap Nebius AI Cloud, allocate GPU pools per attendee, and hand out usable adapters by the end of the session.",
    cover: "from-navy-700 via-lime-300 to-lime-200",
    productFocus: ["aicloud", "tokenfactory"],
    technologies: ["Nebius AI Cloud", "Token Factory", "QLoRA", "Gemma 4"],
    authors: [{ name: "Ray Zahid", handle: "rayyanzahid", role: "ambassador" }],
    eventId: "e_8",
    eventTitle: "Sandbox VR SF — Fine-tuning Workshop",
    awards: [{ label: "Curated by Nebius DevRel" }],
    githubUrl: "https://github.com/RayyanZahid/gemma-finetune",
    shippedAt: "2026-05-05T22:00:00Z",
  },
  {
    slug: "nebius-mcp",
    title: "Nebius MCP Server",
    lede: "Model Context Protocol server that lets MCP-aware clients operate Nebius resources as native tools.",
    description:
      "Expose AI Cloud + Token Factory as MCP tools to Claude Code, OpenClaw, and any MCP client. Manage VMs, deploy endpoints, and rotate keys without leaving your agent.",
    cover: "from-navy-700 via-navy-500 to-lime/50",
    productFocus: ["openclaw", "aicloud"],
    technologies: ["MCP", "Python", "Nebius AI Cloud"],
    authors: [{ name: "Colin Lowenberg", handle: "opencolin", role: "advocate" }],
    githubUrl: "https://github.com/opencolin/nebius-mcp",
    shippedAt: "2026-05-03T17:16:00Z",
  },
  {
    slug: "evals-week",
    title: "Evals Week",
    lede: "Open-source eval harness benchmarked across the entire Token Factory model catalog in one week.",
    description:
      "Drop in a yaml of evals; the harness runs them in parallel across all open-source Token Factory models, computes the cost/quality frontier, and ships a weekly report. Used by ~50 builders at the Brooklyn meetup.",
    cover: "from-navy-800 via-navy-600 to-lime",
    productFocus: ["tokenfactory"],
    technologies: ["OpenClaw", "Token Factory", "Python"],
    authors: [{ name: "Alex Boros", handle: "aboros", role: "ambassador" }],
    eventId: "e_2",
    eventTitle: "LLM Evals — A Workshop for Builders",
    githubUrl: "https://github.com/aboros/evals-week",
    shippedAt: "2026-04-30T01:00:00Z",
  },
  {
    slug: "soperator-tui",
    title: "Soperator TUI",
    lede: "Terminal dashboard for managed Slurm clusters on Nebius. Tail jobs, cancel runs, view GPU heat.",
    description:
      "ncurses-style TUI that reads Soperator's state and lets cluster operators tail jobs, cancel runs, and see per-GPU temperature/utilization at a glance. Goes well with a giant monitor and a desk fan.",
    cover: "from-ink-800 via-navy-700 to-lime/50",
    productFocus: ["soperator", "aicloud"],
    technologies: ["Soperator", "Python", "Slurm"],
    authors: [{ name: "Jia Wen", handle: "jwen", role: "ambassador" }],
    eventId: "e_3",
    eventTitle: "GPU Cluster Office Hours",
    githubUrl: "https://github.com/jwen/soperator-tui",
    shippedAt: "2026-05-20T19:00:00Z",
  },
  {
    slug: "voicedeck",
    title: "VoiceDeck",
    lede: "Telnyx-driven phone agent that joins your standup, takes notes, and files JIRA tickets.",
    description:
      "Dial-in agent. Joins standups via SIP, transcribes with Token Factory's Whisper-class model, summarizes, and files JIRA tickets for action items. Won the OpenMind Build Night Best Demo.",
    cover: "from-lime-200 via-lime-300 to-lime-400",
    productFocus: ["tokenfactory", "openclaw"],
    technologies: ["OpenClaw", "Telnyx", "Token Factory", "JIRA"],
    authors: [
      { name: "Sarah Koshy", handle: "skoshy", role: "ambassador" },
      { name: "Henry Wang", handle: "hwang", role: "builder" },
    ],
    eventId: "evt_om1",
    eventTitle: "OpenMind OM1 Build Night",
    awards: [{ label: "Best Demo", sponsor: "OpenMind" }],
    githubUrl: "https://github.com/skoshy/voicedeck",
    demoUrl: "https://voicedeck.demo",
    videoUrl: "https://youtu.be/example-voicedeck",
    shippedAt: "2026-05-06T22:30:00Z",
  },
  {
    slug: "nemoclaw-tui",
    title: "NemoClaw Inspector",
    lede: "Live GPU memory + sub-agent visualizer for OpenClaw running on Nebius GPU Serverless (NemoClaw).",
    description:
      "When a sub-agent forks, you can see the new context window, the GPU layer it landed on, and how much vRAM headroom remains. Drops into any OpenClaw + NemoClaw deployment.",
    cover: "from-navy-900 via-navy-700 to-lime/40",
    productFocus: ["aicloud", "openclaw"],
    technologies: ["OpenClaw", "NemoClaw", "TypeScript"],
    authors: [{ name: "Marek Fischer", handle: "marek", role: "advocate" }],
    githubUrl: "https://github.com/marek/nemoclaw-inspector",
    shippedAt: "2026-04-12T12:00:00Z",
  },
  {
    slug: "ar-pricing",
    title: "AR Pricing Agent",
    lede: "Arabic-NLP pricing concierge that negotiates B2B SaaS contracts in MENA Arabic dialects.",
    description:
      "Fine-tuned on Qwen-2.5 with Token Factory inference. Handles Egyptian, Gulf, and Levantine dialects, sticks to the company price-floor, and never hallucinates SLAs. Pilot live with two SF startups expanding to MENA.",
    cover: "from-lime-400 via-lime-200 to-navy-500",
    productFocus: ["tokenfactory", "aicloud"],
    technologies: ["Token Factory", "Qwen-2.5", "QLoRA"],
    authors: [{ name: "Esra Hassan", handle: "ehassan", role: "builder" }],
    eventId: "e_7",
    eventTitle: "Cairo AI Founder Mixer",
    githubUrl: "https://github.com/ehassan/ar-pricing",
    shippedAt: "2026-05-30T20:00:00Z",
  },
  {
    slug: "claude-code-proxy",
    title: "Claude Code → Token Factory Proxy",
    lede: "Run Claude Code on open-source models via Nebius Token Factory.",
    description:
      "Drop-in HTTP proxy that translates Claude API requests into OpenAI-compatible Token Factory calls. Lets you run Claude Code with any of the 44+ open-source models hosted on Nebius.",
    cover: "from-navy-700 via-navy-600 to-lime/50",
    productFocus: ["openclaw", "tokenfactory"],
    technologies: ["Python", "Token Factory", "OpenAI SDK"],
    authors: [{ name: "Kiran (community)", handle: "KiranChilledOut", role: "builder" }],
    githubUrl: "https://github.com/KiranChilledOut/claude-code-proxy",
    shippedAt: "2026-05-05T09:46:00Z",
  },
];

export type AwardFilter = "ALL" | "AWARDED" | "OFFICIAL";

export function projectAuthorRoleLabel(role: ProjectAuthorRole) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export const projectTechs = Array.from(
  new Set(projects.flatMap((p) => p.technologies)),
).sort();

export const projectEvents = Array.from(
  new Map(
    projects
      .filter((p) => p.eventId && p.eventTitle)
      .map((p) => [p.eventId!, p.eventTitle!]),
  ).entries(),
);

export const findProject = (slug: string) => projects.find((p) => p.slug === slug);
