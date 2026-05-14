// Showcase projects shipped by Nebius Builders.
// Seeded from the Nebius.Build SF Hackathon (March 15, 2026) — public repos
// the user pointed at; descriptions paraphrased from each repo's README.

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

const HACKATHON = "Nebius.Build SF Hackathon — March 2026";
const SHIPPED = "2026-03-16T00:00:00Z";

export const projects: Project[] = [
  {
    slug: "injester",
    title: "Injester",
    lede:
      "Drop any URL in, get back an AI-agent-actionable version of the page in seconds — and a side-by-side benchmark showing the agent succeed on the optimized version where it failed on the raw one.",
    description:
      "Pipeline: Tavily Extract strips the HTML noise, a Nebius Token Factory model (Llama 3.1 70B / Qwen) restructures the content into agent-friendly form, then a self-improvement loop iterates on its own restructuring prompt for three rounds. A three-panel UI shows the human web, the AI view, and the benchmark score. FastAPI on Python for the backend, React on the front.",
    cover: "from-lime-300 via-lime-200 to-navy-700",
    productFocus: ["tokenfactory"],
    technologies: ["Python", "FastAPI", "React", "Tavily", "Llama 3.1 70B", "Qwen"],
    authors: [{ name: "injester-ai", handle: "injester-ai", role: "builder" }],
    eventTitle: HACKATHON,
    githubUrl: "https://github.com/InjesterLol/Main",
    shippedAt: SHIPPED,
  },
  {
    slug: "runrobot",
    title: "runrobot",
    lede:
      "Open-source package + runtime tooling for robot policies. Train once, package once, run the same artifact in a browser demo, in simulation, and on the actual robot.",
    description:
      "A policy is a trained, packaged, and published software program. runrobot defines that package — policy.yaml, robot.yaml, scene.yaml, and a validator — plus the runtime to execute it across browser, sim, and hardware. The goal is to stop shipping robotics teams the integration tax of porting one policy at a time across three different runtimes. SDKs and APIs publish to RunRobot Cloud or an on-prem deployment.",
    cover: "from-navy-800 via-navy-700 to-lime/40",
    productFocus: ["aicloud"],
    technologies: ["TypeScript", "JavaScript", "Policy YAML", "WebGL"],
    authors: [{ name: "RunRobotics", handle: "runrobotics", role: "builder" }],
    eventTitle: HACKATHON,
    githubUrl: "https://github.com/runrobotics/runrobot",
    shippedAt: SHIPPED,
  },
  {
    slug: "robostore",
    title: "RoboStore",
    lede:
      "Self-expanding robot agent: it detects its own hardware gaps, shops a parts catalog, auto-generates the integration skill, installs it, and retries the task.",
    description:
      "Given a task it can't complete (\"navigate, pick up the red box, return\") the agent identifies what hardware it's missing, queries a real parts catalog via Tavily, generates a YAML skill file with install instructions and the ROS2 packages required, then re-attempts the task. Three Nebius-hosted agents run in parallel under OpenClaw orchestration: SCOUT (Qwen2-VL-72B) for vision, PLANNER (Qwen3-235B) for task decomposition, SAFETY for parallel risk-assessment rollouts.",
    cover: "from-lime-400 via-lime-200 to-navy-500",
    productFocus: ["openclaw", "tokenfactory", "aicloud"],
    technologies: ["Python", "OpenClaw", "Qwen2-VL-72B", "Qwen3-235B", "Token Factory", "ROS2"],
    authors: [{ name: "Joshua Iokua", handle: "joshuaiokua", role: "builder" }],
    eventTitle: HACKATHON,
    githubUrl: "https://github.com/joshuaiokua/nebius-hackathon",
    shippedAt: SHIPPED,
  },
  {
    slug: "topology",
    title: "TOPOLOGY",
    lede:
      "Evolutionary agent-organization discovery: ten LLM-agent teams with randomly generated org genomes compete on a task; the weakest dissolve, the strongest mutate, and over five generations evolution finds the optimal architecture.",
    description:
      "Every \"gene\" — hierarchy, communication pattern, decision-making style, work distribution, roles, team size — has mechanical consequences on how the team executes. A real-time Canvas2D viz shows all ten team topologies; teams fade when they die and bloom from their parent's position when they spawn. Three Nebius model tiers: Llama 3.1 8B-fast for agent execution and role generation, Llama 3.3 70B-fast for evaluation, DeepSeek-R1 for the final synthesis naming the winning archetype.",
    cover: "from-navy-700 via-navy-600 to-lime/40",
    productFocus: ["tokenfactory"],
    technologies: ["Python", "WebSockets", "Canvas2D", "Llama 3.1 8B", "Llama 3.3 70B", "DeepSeek-R1"],
    authors: [{ name: "nxrobins", handle: "nxrobins", role: "builder" }],
    eventTitle: HACKATHON,
    githubUrl: "https://github.com/nxrobins/topology",
    shippedAt: SHIPPED,
  },
  {
    slug: "k1-walking-talking",
    title: "K1 Walking & Talking",
    lede:
      "Voice-controlled humanoid: speak to the Booster K1 and it walks, follows you around, tracks objects, dances, waves, and remembers faces.",
    description:
      "Real-time voice loop on Gemini Live API drives a Booster K1 humanoid. YOLOv8 handles object detection on stereo cameras; ROS2 topics carry frames from the camera bridge; face recognition keeps track of who's in the room. The control machine talks to the robot over Ethernet — works equally well running on a laptop or on the K1's onboard Jetson.",
    cover: "from-lime-300 via-lime-400 to-navy-700",
    productFocus: ["tokenfactory", "aicloud"],
    technologies: ["Python", "Gemini Live API", "YOLOv8", "ROS2", "Booster K1", "Stereo Vision"],
    authors: [{ name: "Armin Foroughi", handle: "arminforoughi", role: "builder" }],
    eventTitle: HACKATHON,
    githubUrl: "https://github.com/arminforoughi/nebius_k1",
    shippedAt: SHIPPED,
  },
  {
    slug: "asha",
    title: "Asha",
    lede:
      "WhatsApp-native AI assistant for small home businesses. Takes orders in natural language (including Hinglish), remembers \"your usual,\" handles confirmations, and sends owners a daily summary.",
    description:
      "Built for owners who already live in WhatsApp — Asha sits inside the chat thread instead of asking them to download yet another app. Twilio routes the messages; a multi-agent system on Nebius Serverless handles intent extraction, customer memory, and order coordination; Supabase backs the database and the realtime owner dashboard. Asha means \"hope\" in Hindi.",
    cover: "from-lime-200 via-lime-300 to-lime-400",
    productFocus: ["tokenfactory", "aicloud"],
    technologies: ["TypeScript", "Python", "Twilio", "WhatsApp Business API", "Nebius Serverless", "Supabase"],
    authors: [{ name: "Mohammed Israfeel", handle: "misran3", role: "builder" }],
    eventTitle: HACKATHON,
    githubUrl: "https://github.com/misran3/asha",
    shippedAt: SHIPPED,
  },
  {
    slug: "linda-nebius",
    title: "Nebius Hackathon — @lindamao",
    lede:
      "Hackathon repo by @lindamao from Nebius.Build SF. Early-stage; README is still a placeholder, code is Python.",
    description:
      "Submitted at the Nebius.Build SF Hackathon. The repo is still being filled out — once @lindamao adds a description and live demo, this card will surface them. Sponsoring this card in the showcase for now since it represents a real builder shipping at the event.",
    cover: "from-navy-700 via-navy-500 to-lime/40",
    productFocus: ["tokenfactory"],
    technologies: ["Python"],
    authors: [{ name: "Linda Mao", handle: "lindamao", role: "builder" }],
    eventTitle: HACKATHON,
    githubUrl: "https://github.com/lindamao/nebius_hackathon",
    shippedAt: SHIPPED,
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
