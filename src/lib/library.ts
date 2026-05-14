// Library — workshops, videos, and example repos.
// Content seeded from nebius-builders repo #1 (content/library/seed.json + src/lib/mock.ts)
// and re-rendered with repo #2's brand.

export type LibraryEntryType = "WORKSHOP" | "VIDEO" | "REPO";
export type LibraryLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type LibraryEntry = {
  slug: string;
  type: LibraryEntryType;
  title: string;
  blurb: string;
  level: LibraryLevel;
  durationMin?: number;
  productFocus: string[];
  externalUrl?: string;
  isOfficial: boolean;
  submitterHandle?: string;
  submitterDisplayName?: string;
  metadata?: {
    stars?: number;
    languages?: string[];
    primaryLanguage?: string;
    lastPushedAt?: string;
  };
};

export const library: LibraryEntry[] = [
  // ===== Featured workshop =====
  {
    slug: "running-openclaw-on-nebius",
    type: "WORKSHOP",
    title: "Running OpenClaw on Nebius",
    blurb:
      "From zero to a live AI agent in 15 minutes. Walks through Token Factory, three deploy methods (npm / Docker / Nebius Serverless), and a hands-on agent build.",
    level: "BEGINNER",
    durationMin: 30,
    productFocus: ["openclaw", "tokenfactory"],
    externalUrl:
      "https://github.com/opencolin/clawcamp-site/blob/master/workshops/running-openclaw-on-nebius.md",
    isOfficial: true,
  },
  {
    slug: "gemma-finetune-rayyanzahid",
    type: "REPO",
    title: "QLoRA Fine-tune Gemma 4 on Nebius",
    blurb:
      "Validated recipe + Nebius infra skill + 9-node workshop fleet runbook. Built and run live at Sandbox VR SF (May 2026, ~30 attendees).",
    level: "INTERMEDIATE",
    durationMin: 90,
    productFocus: ["aicloud", "tokenfactory"],
    externalUrl: "https://github.com/RayyanZahid/gemma-finetune",
    isOfficial: false,
    submitterHandle: "rayyanzahid",
    submitterDisplayName: "Ray Zahid",
    metadata: {
      stars: 3,
      languages: ["Shell", "Python"],
      primaryLanguage: "Shell",
      lastPushedAt: "2026-05-06T18:45:25Z",
    },
  },

  // ===== Nebius Academy courses =====
  {
    slug: "academy-nebius-ai-cloud-onboarding",
    type: "WORKSHOP",
    title: "Nebius AI Cloud Onboarding Course",
    blurb:
      "Free, self-paced course. Get from your first login to real cloud workflows in 30 minutes — navigate the console, launch storage and VMs, deploy and run an LLM, configure access for a dev environment.",
    level: "BEGINNER",
    durationMin: 30,
    productFocus: ["aicloud"],
    externalUrl: "https://academy.nebius.com/nebius-cloud-onboarding-course",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "academy-coding-with-cursor",
    type: "WORKSHOP",
    title: "Make the Most of Cursor as an AI-Powered Coding Environment",
    blurb:
      "Free short video course featuring Cursor's co-founder + Nebius Academy experts. Learn agentic development end-to-end: context management, parallel agents, browser/CLI testing, custom rules, automated docs, and prompt patterns that hold up in production.",
    level: "INTERMEDIATE",
    durationMin: 90,
    productFocus: ["openclaw"],
    externalUrl: "https://academy.nebius.com/aicoding/cursor",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "futurecoding-ai",
    type: "WORKSHOP",
    title: "The Future of Software Development (Nebius x JetBrains)",
    blurb:
      "Become an AI-powered engineer through self-paced training in AI-assisted programming. Industry experts and tutors from leading tech companies. Includes 3 months of any JetBrains IDE free.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw"],
    externalUrl: "https://futurecoding.ai/",
    isOfficial: true,
  },
  {
    slug: "nebius-science",
    type: "WORKSHOP",
    title: "Nebius Science",
    blurb:
      "Follow how AI and science co-evolve through the lens of the cloud powering it. Research, interviews, and case studies on AI's impact on scientific discovery.",
    level: "INTERMEDIATE",
    productFocus: ["aicloud"],
    externalUrl: "https://nebius.science/",
    isOfficial: true,
  },

  // ===== Nebius-Academy GitHub repos =====
  {
    slug: "repo-llm-engineering-essentials",
    type: "REPO",
    title: "LLM Engineering Essentials",
    blurb:
      "Materials for the LLM Engineering Essentials course. Notebooks covering training, fine-tuning, evals, and deployment patterns.",
    level: "INTERMEDIATE",
    durationMin: 240,
    productFocus: ["tokenfactory", "aicloud"],
    externalUrl: "https://github.com/Nebius-Academy/LLM-Engineering-Essentials",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
    metadata: { stars: 809, primaryLanguage: "Jupyter Notebook", lastPushedAt: "2026-03-30T23:07:52Z" },
  },
  {
    slug: "repo-ai-in-math-course",
    type: "REPO",
    title: "AI in Mathematical Research",
    blurb:
      "Course materials for AI in Mathematical Research. Lean-based exercises and lectures on AI-assisted theorem proving and mathematical discovery.",
    level: "ADVANCED",
    durationMin: 180,
    productFocus: ["aicloud"],
    externalUrl: "https://github.com/Nebius-Academy/ai-in-math-course",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
    metadata: { stars: 104, primaryLanguage: "Lean", lastPushedAt: "2026-04-29T18:29:55Z" },
  },
  {
    slug: "repo-ml-starter-pack",
    type: "REPO",
    title: "Machine Learning Starter Pack",
    blurb:
      "Open ML course — fundamentals through hands-on Jupyter notebooks. Good first stop for anyone newer to ML before going deeper.",
    level: "BEGINNER",
    durationMin: 180,
    productFocus: ["aicloud"],
    externalUrl: "https://github.com/Nebius-Academy/ML-Starter-Pack",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
    metadata: { stars: 39, primaryLanguage: "Jupyter Notebook", lastPushedAt: "2024-10-28T17:35:37Z" },
  },
  {
    slug: "repo-llmops-essentials",
    type: "REPO",
    title: "LLMOps Essentials",
    blurb:
      "LLMOps educational project — covers deployment, monitoring, and lifecycle management for LLM systems in production.",
    level: "INTERMEDIATE",
    durationMin: 120,
    productFocus: ["tokenfactory", "aicloud"],
    externalUrl: "https://github.com/Nebius-Academy/LLMOps-Essentials",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
    metadata: { stars: 29, primaryLanguage: "Python", lastPushedAt: "2025-05-09T09:26:51Z" },
  },
  {
    slug: "repo-boltz2-mk8s",
    type: "REPO",
    title: "Boltz-2 Inference on Managed Kubernetes",
    blurb:
      "Step-by-step manifests + commands to run Boltz-2 protein structure inference at scale on Nebius Managed Kubernetes. Pairs with the YouTube tutorial.",
    level: "INTERMEDIATE",
    durationMin: 60,
    productFocus: ["aicloud"],
    externalUrl: "https://github.com/Nebius-Academy/boltz2-mk8s",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
    metadata: { stars: 2, primaryLanguage: "Shell", lastPushedAt: "2025-11-13T13:22:50Z" },
  },
  {
    slug: "repo-knowledge-base",
    type: "REPO",
    title: "LLM Engineering Knowledge Base",
    blurb:
      "Supporting reference materials for the LLM Engineering Essentials course. Lookup-style HTML pages organized by topic.",
    level: "INTERMEDIATE",
    productFocus: ["tokenfactory"],
    externalUrl: "https://github.com/Nebius-Academy/knowledge-base",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
    metadata: { stars: 8, primaryLanguage: "HTML", lastPushedAt: "2025-11-03T14:22:39Z" },
  },

  // ===== Nebius-hosted webinar recordings =====
  {
    slug: "webinar-running-openclaw-on-nebius",
    type: "VIDEO",
    title: "Workshop: Running OpenClaw on Nebius",
    blurb:
      "Live webinar with Colin Lowenberg + Michal from Nebius demoing OpenClaw end-to-end: install locally with Token Factory, deploy to Nebius Serverless via Docker (with a CLI skill that automates it), configure sub-agents, and Q&A covering cost, model switching, GitHub deployment roadmap, and Tavily for web search.",
    level: "BEGINNER",
    durationMin: 60,
    productFocus: ["openclaw", "tokenfactory", "aicloud"],
    externalUrl:
      "https://nebius.zoom.us/rec/share/W7W_7xxYZBSGjcHEro0egvt2xhH00z3CIjdcSwuLI0-AZ0sDr7PiYrPJ5WeB_rnC.YsDri-mrKWuiSVj8",
    isOfficial: true,
    submitterHandle: "opencolin",
    submitterDisplayName: "Colin Lowenberg + Michal (Nebius)",
  },

  // ===== Nebius main YouTube videos =====
  {
    slug: "yt-soperator-overview",
    type: "VIDEO",
    title: "Managed Soperator: Slurm on Kubernetes",
    blurb:
      "Marouane Khoukh introduces Managed Soperator — Slurm on Kubernetes for scalable AI workloads on Nebius.",
    level: "INTERMEDIATE",
    durationMin: 11,
    productFocus: ["soperator"],
    externalUrl: "https://www.youtube.com/watch?v=iQstLUA0oiA",
    isOfficial: true,
    submitterDisplayName: "Nebius",
  },
  {
    slug: "yt-welcome-token-factory",
    type: "VIDEO",
    title: "Welcome to Nebius Token Factory",
    blurb:
      "2-minute introduction to Nebius Token Factory — the next evolution of AI Studio with OpenAI-compatible API.",
    level: "BEGINNER",
    durationMin: 2,
    productFocus: ["tokenfactory"],
    externalUrl: "https://www.youtube.com/watch?v=mMdnzO6rBDU",
    isOfficial: true,
    submitterDisplayName: "Nebius",
  },
  {
    slug: "yt-boltz2-tutorial",
    type: "VIDEO",
    title: "How to Run Boltz-2 at Scale on Kubernetes",
    blurb:
      "End-to-end tutorial on running Boltz-2 protein structure inference at scale on Nebius MK8s. Pairs with the boltz2-mk8s repo.",
    level: "INTERMEDIATE",
    durationMin: 10,
    productFocus: ["aicloud"],
    externalUrl: "https://www.youtube.com/watch?v=tMvAWi1Wfiw",
    isOfficial: true,
    submitterDisplayName: "Nebius",
  },

  // ===== Nebius Academy YouTube videos =====
  {
    slug: "yt-ai-day-nemotron",
    type: "VIDEO",
    title: "AI Day: Nemotron — Open and Accelerated (Bryan Catanzaro, NVIDIA)",
    blurb:
      "AI Day by Nebius Academy. Bryan Catanzaro on NVIDIA's open-model approach with Nemotron and the future of accelerated AI infrastructure.",
    level: "INTERMEDIATE",
    productFocus: ["aicloud"],
    externalUrl: "https://www.youtube.com/watch?v=n9BTl3tQWlU",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-welcome-nebius-cloud",
    type: "VIDEO",
    title: "Welcome to Nebius Cloud",
    blurb:
      "Orientation video for new Nebius Cloud users. Tour of the console and core concepts.",
    level: "BEGINNER",
    productFocus: ["aicloud"],
    externalUrl: "https://www.youtube.com/watch?v=N_DRDMiBfl4",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-object-storage-buckets",
    type: "VIDEO",
    title: "How to Create Object Storage Buckets on Nebius",
    blurb:
      "Quick walkthrough for creating Object Storage buckets on Nebius — fundamentals you'll use for every training and inference job.",
    level: "BEGINNER",
    productFocus: ["aicloud"],
    externalUrl: "https://www.youtube.com/watch?v=DRSdfi0mINs",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-finetune-serverless-jobs",
    type: "VIDEO",
    title: "How to Fine-tune a Model with Nebius Serverless Jobs",
    blurb:
      "End-to-end fine-tuning workflow using Nebius Serverless Jobs — from data prep to deployed checkpoint.",
    level: "INTERMEDIATE",
    productFocus: ["aicloud"],
    externalUrl: "https://www.youtube.com/watch?v=Cx7BlL6PdKk",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-deploy-serverless-endpoints",
    type: "VIDEO",
    title: "How to Deploy a Model with Nebius Serverless Endpoints",
    blurb:
      "From container to live API. Walks through deploying a model as a serverless endpoint on Nebius.",
    level: "BEGINNER",
    productFocus: ["aicloud"],
    externalUrl: "https://www.youtube.com/watch?v=Zjq8HSMgFr4",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-recap-next-steps",
    type: "VIDEO",
    title: "Recap & Next Steps with Nebius Cloud",
    blurb:
      "Recap of what you've learned about Nebius Cloud and a roadmap for what to explore next.",
    level: "BEGINNER",
    productFocus: ["aicloud"],
    externalUrl: "https://www.youtube.com/watch?v=ZjD489E0lls",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-ai-dna-amsterdam",
    type: "VIDEO",
    title: "AI DNA Amsterdam — Recap",
    blurb:
      "Talks, discussions, and connections from the AI DNA event in Amsterdam. Highlight reel.",
    level: "BEGINNER",
    productFocus: ["aicloud"],
    externalUrl: "https://www.youtube.com/watch?v=Ftr-6JF08ZI",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-ai-coders-fail",
    type: "VIDEO",
    title: "Why AI Coders Like Cursor and Claude Code Fail Long-Term",
    blurb:
      "Failure modes of AI coding agents and patterns that hold up in production. Honest critique + remediation.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw"],
    externalUrl: "https://www.youtube.com/watch?v=AF2vqs8Trfo",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-english-programming-language",
    type: "VIDEO",
    title: "English = New Programming Language",
    blurb:
      "The future of coding agents and natural-language software development. Where the agent paradigm is heading.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw"],
    externalUrl: "https://www.youtube.com/watch?v=rZ2eVAeXx6k",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-agents-md-bad",
    type: "VIDEO",
    title: "AGENTS.md Is Making Your Agent Worse",
    blurb:
      "Common pitfalls in agent prompt engineering — what AGENTS.md gets wrong and what to do instead.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw"],
    externalUrl: "https://www.youtube.com/watch?v=cQFTK3NiO6U",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-claude-subagents-tutorial",
    type: "VIDEO",
    title: "Claude Code Subagents Tutorial",
    blurb:
      "Parallel execution and custom agent patterns with Claude Code. Worked examples + best practices.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw"],
    externalUrl: "https://www.youtube.com/watch?v=6VC-TuWVlCc",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-agent-testing",
    type: "VIDEO",
    title: "Agent Testing: Browser and CLI",
    blurb:
      "End-to-end testing strategies for browser and CLI agents. Practical patterns for keeping agents reliable.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw"],
    externalUrl: "https://www.youtube.com/watch?v=wYZU5AUkI-M",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-defining-cursor-rules",
    type: "VIDEO",
    title: "Defining Cursor's Rules",
    blurb:
      "Get consistent, predictable behavior from your AI pair programmer. How to author Cursor rules that hold.",
    level: "BEGINNER",
    productFocus: ["openclaw"],
    externalUrl: "https://www.youtube.com/watch?v=GV62OTdLLhw",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-automated-docs",
    type: "VIDEO",
    title: "Automated Documentation: Backend & Frontend",
    blurb:
      "Practical patterns for keeping docs in sync with code, backend and frontend. Tooling + agent flows.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw"],
    externalUrl: "https://www.youtube.com/watch?v=DFEgod82SlM",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },
  {
    slug: "yt-sharing-agent-rules",
    type: "VIDEO",
    title: "Sharing Rules Between Agents",
    blurb:
      "Keep coding agents consistent across teams and codebases. Patterns for shared rules and config.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw"],
    externalUrl: "https://www.youtube.com/watch?v=9aMa7KBExuc",
    isOfficial: true,
    submitterDisplayName: "Nebius Academy",
  },

  // ===== Builders Network team + community repos =====
  {
    slug: "repo-openclaw-nebius",
    type: "REPO",
    title: "OpenClaw + Nebius",
    blurb:
      "OpenClaw provider plugin for Nebius, plus the deployment UI (claw.moi) and the Claude Code skill. The reference implementation if you want to wire OpenClaw to Nebius end-to-end.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw", "tokenfactory", "aicloud"],
    externalUrl: "https://github.com/opencolin/openclaw-nebius",
    isOfficial: false,
    submitterHandle: "opencolin",
    submitterDisplayName: "Colin Lowenberg",
    metadata: { stars: 8, primaryLanguage: "JavaScript", lastPushedAt: "2026-05-06T07:06:43Z" },
  },
  {
    slug: "repo-openclaw-nebius-plugin",
    type: "REPO",
    title: "OpenClaw Nebius Token Factory Plugin",
    blurb:
      "Token Factory provider plugin for OpenClaw — 44+ open-source models via a single endpoint. The TypeScript provider that powers the rest of the OpenClaw + Nebius stack.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw", "tokenfactory"],
    externalUrl: "https://github.com/opencolin/openclaw-nebius-plugin",
    isOfficial: false,
    submitterHandle: "opencolin",
    submitterDisplayName: "Colin Lowenberg",
    metadata: { stars: 0, primaryLanguage: "TypeScript", lastPushedAt: "2026-04-08T14:17:27Z" },
  },
  {
    slug: "repo-nebius-skill",
    type: "REPO",
    title: "Nebius Skill (Claude Code + OpenClaw)",
    blurb:
      "Dual-compatible Claude Code + OpenClaw skill for managing Nebius AI Cloud infrastructure via CLI. Drop it in, get instant Nebius CLI mastery in your agent.",
    level: "BEGINNER",
    productFocus: ["openclaw", "aicloud"],
    externalUrl: "https://github.com/opencolin/nebius-skill",
    isOfficial: false,
    submitterHandle: "opencolin",
    submitterDisplayName: "Colin Lowenberg",
    metadata: { stars: 1, primaryLanguage: "Shell", lastPushedAt: "2026-04-19T23:25:50Z" },
  },
  {
    slug: "repo-nebius-mcp",
    type: "REPO",
    title: "Nebius MCP Server",
    blurb:
      "Model Context Protocol server for Nebius. Lets MCP-aware clients (Claude Code, OpenClaw) operate Nebius resources as native tools.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw", "aicloud"],
    externalUrl: "https://github.com/opencolin/nebius-mcp",
    isOfficial: false,
    submitterHandle: "opencolin",
    submitterDisplayName: "Colin Lowenberg",
    metadata: { stars: 0, primaryLanguage: "Python", lastPushedAt: "2026-05-03T17:16:46Z" },
  },
  {
    slug: "repo-contree-mcp",
    type: "REPO",
    title: "ConTree MCP Server",
    blurb:
      "Run code in isolated cloud containers. ConTree gives AI agents secure sandboxed execution environments with full root access, network, and persistent images. MCP-compatible.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw"],
    externalUrl: "https://github.com/opencolin/contree-mcp",
    isOfficial: false,
    submitterHandle: "opencolin",
    submitterDisplayName: "Colin Lowenberg",
    metadata: { stars: 0, lastPushedAt: "2026-05-03T20:24:57Z" },
  },
  {
    slug: "repo-contree-skill",
    type: "REPO",
    title: "ConTree Skill",
    blurb:
      "Claude Code skill for using ConTree — sandboxed container execution with Git-like branching of agent state.",
    level: "BEGINNER",
    productFocus: ["openclaw"],
    externalUrl: "https://github.com/opencolin/contree-skill",
    isOfficial: false,
    submitterHandle: "opencolin",
    submitterDisplayName: "Colin Lowenberg",
    metadata: { stars: 0, lastPushedAt: "2026-04-17T16:48:07Z" },
  },
  {
    slug: "repo-langchain-nebius",
    type: "REPO",
    title: "LangChain + Nebius",
    blurb:
      "Configure Nebius Token Factory as the inference provider in LangChain apps. Drop-in replacement for OpenAI client.",
    level: "INTERMEDIATE",
    productFocus: ["tokenfactory"],
    externalUrl: "https://github.com/opencolin/langchain-nebius",
    isOfficial: false,
    submitterHandle: "opencolin",
    submitterDisplayName: "Colin Lowenberg",
    metadata: { stars: 0, primaryLanguage: "Python", lastPushedAt: "2026-05-04T17:39:36Z" },
  },
  {
    slug: "repo-codex-nebius",
    type: "REPO",
    title: "Codex CLI + Nebius",
    blurb:
      "Wire OpenAI's Codex CLI to Nebius Token Factory. Use Codex's coding workflow with open-source models at lower cost.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw", "tokenfactory"],
    externalUrl: "https://github.com/opencolin/codex-nebius",
    isOfficial: false,
    submitterHandle: "opencolin",
    submitterDisplayName: "Colin Lowenberg",
    metadata: { stars: 0, primaryLanguage: "Shell", lastPushedAt: "2026-04-18T21:16:33Z" },
  },
  {
    slug: "repo-claude-code-proxy",
    type: "REPO",
    title: "Claude Code → OpenAI API Proxy",
    blurb:
      "Proxy Claude Code requests through any OpenAI-compatible endpoint — point it at Nebius Token Factory and run Claude Code on open-source models.",
    level: "INTERMEDIATE",
    productFocus: ["openclaw", "tokenfactory"],
    externalUrl: "https://github.com/KiranChilledOut/claude-code-proxy",
    isOfficial: false,
    submitterHandle: "KiranChilledOut",
    submitterDisplayName: "Kiran (community)",
    metadata: { stars: 8, primaryLanguage: "Python", lastPushedAt: "2026-05-05T09:46:16Z" },
  },

  // ===== Nebius ML Cookbook =====
  {
    slug: "cookbook-ml-skypilot",
    type: "REPO",
    title: "ML Cookbook · SkyPilot on Nebius",
    blurb:
      "Run multi-cloud ML workloads on Nebius using SkyPilot. Recipe with sample configs and run scripts.",
    level: "INTERMEDIATE",
    productFocus: ["aicloud"],
    externalUrl: "https://github.com/nebius/ml-cookbook/tree/main/skypilot",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { primaryLanguage: "Shell", lastPushedAt: "2026-04-07T21:04:07Z" },
  },
  {
    slug: "cookbook-ml-slurm",
    type: "REPO",
    title: "ML Cookbook · Slurm on Nebius",
    blurb:
      "Slurm-based training on Nebius compute clusters. Job submission scripts, sbatch templates, and orchestration patterns.",
    level: "INTERMEDIATE",
    productFocus: ["aicloud", "soperator"],
    externalUrl: "https://github.com/nebius/ml-cookbook/tree/main/slurm",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { lastPushedAt: "2026-04-07T21:04:07Z" },
  },
  {
    slug: "cookbook-ml-runai",
    type: "REPO",
    title: "ML Cookbook · Run:ai on Nebius",
    blurb:
      "Run:ai-based GPU orchestration on Nebius. Setup, scheduler config, and multi-tenant patterns.",
    level: "ADVANCED",
    productFocus: ["aicloud"],
    externalUrl: "https://github.com/nebius/ml-cookbook/tree/main/runai",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { lastPushedAt: "2026-04-07T21:04:07Z" },
  },
  {
    slug: "cookbook-ml-volcano",
    type: "REPO",
    title: "ML Cookbook · Volcano on Nebius MK8s",
    blurb:
      "Volcano scheduler on Nebius Managed Kubernetes for batch ML workloads. Manifests + queue configurations.",
    level: "ADVANCED",
    productFocus: ["aicloud"],
    externalUrl: "https://github.com/nebius/ml-cookbook/tree/main/volcano",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { lastPushedAt: "2026-04-07T21:04:07Z" },
  },
  {
    slug: "cookbook-ml-deepep",
    type: "REPO",
    title: "ML Cookbook · DeepEP",
    blurb:
      "DeepEP (DeepSpeed Expert Parallelism) on Nebius. Configs and example launches for MoE training at scale.",
    level: "ADVANCED",
    productFocus: ["aicloud"],
    externalUrl: "https://github.com/nebius/ml-cookbook/tree/main/deepep",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { lastPushedAt: "2026-04-07T21:04:07Z" },
  },

  // ===== Token Factory Cookbook =====
  {
    slug: "cookbook-tf-agents",
    type: "REPO",
    title: "TF Cookbook · Building Agents",
    blurb:
      "Recipes for building agents on Nebius Token Factory. Tool-using LLMs, memory patterns, and orchestration examples.",
    level: "INTERMEDIATE",
    productFocus: ["tokenfactory", "openclaw"],
    externalUrl: "https://github.com/nebius/token-factory-cookbook/tree/main/agents",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { stars: 101, primaryLanguage: "Jupyter Notebook", lastPushedAt: "2026-03-15T17:51:16Z" },
  },
  {
    slug: "cookbook-tf-rag",
    type: "REPO",
    title: "TF Cookbook · RAG Patterns",
    blurb:
      "Retrieval-augmented generation recipes using Token Factory inference. Vector stores, chunking, hybrid retrieval, and evals.",
    level: "INTERMEDIATE",
    productFocus: ["tokenfactory"],
    externalUrl: "https://github.com/nebius/token-factory-cookbook/tree/main/rag",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { stars: 101, primaryLanguage: "Jupyter Notebook", lastPushedAt: "2026-03-15T17:51:16Z" },
  },
  {
    slug: "cookbook-tf-tool-calling",
    type: "REPO",
    title: "TF Cookbook · Tool Calling",
    blurb:
      "Tool-calling patterns on Token Factory. Schema design, parallel calls, error handling, structured outputs.",
    level: "INTERMEDIATE",
    productFocus: ["tokenfactory"],
    externalUrl: "https://github.com/nebius/token-factory-cookbook/tree/main/tool-calling",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { stars: 101, primaryLanguage: "Jupyter Notebook", lastPushedAt: "2026-03-15T17:51:16Z" },
  },
  {
    slug: "cookbook-tf-lora",
    type: "REPO",
    title: "TF Cookbook · LoRA Fine-tuning",
    blurb:
      "LoRA / QLoRA fine-tuning recipes for Token Factory models. Includes sample datasets, training scripts, and serving the adapter.",
    level: "INTERMEDIATE",
    productFocus: ["tokenfactory", "aicloud"],
    externalUrl: "https://github.com/nebius/token-factory-cookbook/tree/main/lora",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { stars: 101, primaryLanguage: "Jupyter Notebook", lastPushedAt: "2026-03-15T17:51:16Z" },
  },
  {
    slug: "cookbook-tf-post-training",
    type: "REPO",
    title: "TF Cookbook · Post-Training",
    blurb:
      "Post-training techniques for open-source models on Nebius — RLHF, DPO, instruction tuning. End-to-end working examples.",
    level: "ADVANCED",
    productFocus: ["aicloud", "tokenfactory"],
    externalUrl: "https://github.com/nebius/token-factory-cookbook/tree/main/post-training",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { stars: 101, primaryLanguage: "Jupyter Notebook", lastPushedAt: "2026-03-15T17:51:16Z" },
  },
  {
    slug: "cookbook-tf-distillation",
    type: "REPO",
    title: "TF Cookbook · Distillation",
    blurb:
      "Model distillation recipes — teach smaller, cheaper models from a larger teacher. Run on Nebius compute, serve via Token Factory.",
    level: "ADVANCED",
    productFocus: ["aicloud", "tokenfactory"],
    externalUrl: "https://github.com/nebius/token-factory-cookbook/tree/main/distillation",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { stars: 101, primaryLanguage: "Jupyter Notebook", lastPushedAt: "2026-03-15T17:51:16Z" },
  },

  // ===== Nebius Solutions Library =====
  {
    slug: "solutions-soperator",
    type: "REPO",
    title: "Solutions · Soperator (Slurm on Kubernetes)",
    blurb:
      "Reference Terraform setup for Soperator — Nebius's Slurm-on-Kubernetes operator. Deploy a Slurm cluster on managed K8s with one terraform apply.",
    level: "INTERMEDIATE",
    productFocus: ["soperator", "aicloud"],
    externalUrl: "https://github.com/nebius/nebius-solutions-library/tree/main/soperator",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { stars: 94, primaryLanguage: "HCL", lastPushedAt: "2026-05-06T12:28:09Z" },
  },
  {
    slug: "solutions-k8s-training",
    type: "REPO",
    title: "Solutions · Kubernetes Training Cluster",
    blurb:
      "Terraform module for a Nebius Managed Kubernetes cluster optimized for distributed training. GPU node pools, NCCL networking, fast storage.",
    level: "INTERMEDIATE",
    productFocus: ["aicloud"],
    externalUrl: "https://github.com/nebius/nebius-solutions-library/tree/main/k8s-training",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { stars: 94, primaryLanguage: "HCL", lastPushedAt: "2026-05-06T12:28:09Z" },
  },
  {
    slug: "solutions-anyscale",
    type: "REPO",
    title: "Solutions · Anyscale on Nebius",
    blurb:
      "Run Anyscale (managed Ray) on Nebius infrastructure. Terraform module for the integration plus reference workloads.",
    level: "ADVANCED",
    productFocus: ["aicloud"],
    externalUrl: "https://github.com/nebius/nebius-solutions-library/tree/main/anyscale",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { stars: 94, primaryLanguage: "HCL", lastPushedAt: "2026-05-06T12:28:09Z" },
  },
  {
    slug: "solutions-gpu-slicing",
    type: "REPO",
    title: "Solutions · GPU Slicing",
    blurb:
      "Multi-tenant GPU slicing setup for Nebius — partition a GPU across workloads with MIG / time-slicing. For shared dev environments.",
    level: "ADVANCED",
    productFocus: ["aicloud"],
    externalUrl: "https://github.com/nebius/nebius-solutions-library/tree/main/gpu_slicing",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { stars: 94, primaryLanguage: "HCL", lastPushedAt: "2026-05-06T12:28:09Z" },
  },
  {
    slug: "solutions-vm-instance",
    type: "REPO",
    title: "Solutions · VM Instance (Terraform)",
    blurb:
      "Baseline Terraform module for a Nebius VM. Building block — fork it as the starting point for your own infra modules.",
    level: "BEGINNER",
    productFocus: ["aicloud"],
    externalUrl: "https://github.com/nebius/nebius-solutions-library/tree/main/vm-instance",
    isOfficial: true,
    submitterDisplayName: "Nebius",
    metadata: { stars: 94, primaryLanguage: "HCL", lastPushedAt: "2026-05-06T12:28:09Z" },
  },
];

export const findLibrary = (slug: string) => library.find((l) => l.slug === slug);

export function formatLevel(level: LibraryLevel): string {
  return level.charAt(0) + level.slice(1).toLowerCase();
}

export function formatProductFocus(products: string[]): string {
  const map: Record<string, string> = {
    tokenfactory: "Token Factory",
    aicloud: "AI Cloud",
    soperator: "Soperator",
    openclaw: "OpenClaw",
    tavily: "Tavily",
    other: "Other",
  };
  return products.map((p) => map[p] ?? p).join(" · ");
}
