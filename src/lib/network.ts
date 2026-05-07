// Public Builders Network — directory of community builders and the leaderboard
// they fall on. Seeded from nebius-builders repo #1 (src/lib/mock.ts BUILDERS).

export type BuilderTier = "BUILDER" | "CONTRIBUTOR" | "AMBASSADOR" | "FOUNDING";

export type BuilderProfile = {
  id: string;
  handle: string;
  name: string;
  bio: string;
  city: string;
  country: string;
  tier: BuilderTier;
  pointsTotal: number;
  twitterHandle?: string;
  githubHandle: string;
  blogUrl?: string;
  youtubeChannel?: string;
  expertise: string[];
  signedUpAt: string;
  lastActiveAt: string;
  wantsToHost: boolean;
};

export const builders: BuilderProfile[] = [
  {
    id: "b_ray",
    handle: "rayyanzahid",
    name: "Ray Zahid",
    bio: "Runs Sandbox VR SF. Loves teaching fine-tuning workshops to small rooms with great pizza.",
    city: "San Francisco",
    country: "US",
    tier: "AMBASSADOR",
    pointsTotal: 2847,
    twitterHandle: "rayyanzahid",
    githubHandle: "RayyanZahid",
    expertise: ["fine-tuning", "agents", "events", "education"],
    signedUpAt: "2026-04-12T08:00:00Z",
    lastActiveAt: "2026-05-06T18:45:00Z",
    wantsToHost: true,
  },
  {
    id: "b_alex",
    handle: "aboros",
    name: "Alex Boros",
    bio: "Building agentic search infra. Hosts monthly LLM evals meetup in Brooklyn.",
    city: "Brooklyn",
    country: "US",
    tier: "CONTRIBUTOR",
    pointsTotal: 1924,
    twitterHandle: "aboros",
    githubHandle: "aboros",
    expertise: ["agents", "evals", "rag"],
    signedUpAt: "2026-04-15T14:22:00Z",
    lastActiveAt: "2026-05-05T22:11:00Z",
    wantsToHost: true,
  },
  {
    id: "b_jia",
    handle: "jwen",
    name: "Jia Wen",
    bio: "PhD in distributed systems. Teaches GPU workshops at Stanford.",
    city: "Palo Alto",
    country: "US",
    tier: "CONTRIBUTOR",
    pointsTotal: 1712,
    twitterHandle: "jiawen_dev",
    githubHandle: "jwen",
    expertise: ["gpu-clusters", "distributed-systems", "training"],
    signedUpAt: "2026-04-18T10:00:00Z",
    lastActiveAt: "2026-05-06T09:00:00Z",
    wantsToHost: true,
  },
  {
    id: "b_sk",
    handle: "skoshy",
    name: "Sarah Koshy",
    bio: "AI infra at Mem0. Berlin meetup organizer.",
    city: "Berlin",
    country: "DE",
    tier: "CONTRIBUTOR",
    pointsTotal: 1508,
    githubHandle: "skoshy",
    twitterHandle: "skoshy",
    expertise: ["memory", "agents", "fine-tuning"],
    signedUpAt: "2026-04-20T08:00:00Z",
    lastActiveAt: "2026-05-04T18:00:00Z",
    wantsToHost: true,
  },
  {
    id: "b_mm",
    handle: "mmiao",
    name: "Mei Miao",
    bio: "Indie hacker. Building Token Factory tutorials in Mandarin.",
    city: "Singapore",
    country: "SG",
    tier: "CONTRIBUTOR",
    pointsTotal: 982,
    githubHandle: "mmiao",
    youtubeChannel: "UCmiaoexample",
    expertise: ["tokenfactory", "tutorials", "content"],
    signedUpAt: "2026-04-22T16:00:00Z",
    lastActiveAt: "2026-05-06T01:30:00Z",
    wantsToHost: false,
  },
  {
    id: "b_dp",
    handle: "dperez",
    name: "Daniel Perez",
    bio: "Robotics at NVIDIA. Sometimes plays with Soperator at home.",
    city: "Austin",
    country: "US",
    tier: "CONTRIBUTOR",
    pointsTotal: 847,
    githubHandle: "dperez",
    twitterHandle: "dperezdev",
    expertise: ["robotics", "soperator", "kubernetes"],
    signedUpAt: "2026-04-25T11:00:00Z",
    lastActiveAt: "2026-05-05T14:00:00Z",
    wantsToHost: true,
  },
  {
    id: "b_eh",
    handle: "ehassan",
    name: "Esra Hassan",
    bio: "Cairo. Founder, AI for Arabic NLP startup.",
    city: "Cairo",
    country: "EG",
    tier: "CONTRIBUTOR",
    pointsTotal: 612,
    githubHandle: "ehassan",
    expertise: ["nlp", "fine-tuning", "founder"],
    signedUpAt: "2026-04-28T09:00:00Z",
    lastActiveAt: "2026-05-03T16:00:00Z",
    wantsToHost: false,
  },
  {
    id: "b_fn",
    handle: "fnakamura",
    name: "Fumi Nakamura",
    bio: "Tokyo. Recursive self-improvement enjoyer.",
    city: "Tokyo",
    country: "JP",
    tier: "CONTRIBUTOR",
    pointsTotal: 534,
    githubHandle: "fnakamura",
    twitterHandle: "fnakamura_dev",
    expertise: ["agents", "tokenfactory"],
    signedUpAt: "2026-04-29T03:00:00Z",
    lastActiveAt: "2026-05-06T10:00:00Z",
    wantsToHost: true,
  },
  {
    id: "b_go",
    handle: "goku",
    name: "Goku Patel",
    bio: "Just signed up. Has one repo using Token Factory already.",
    city: "Mumbai",
    country: "IN",
    tier: "BUILDER",
    pointsTotal: 487,
    githubHandle: "goku",
    expertise: ["llm-training"],
    signedUpAt: "2026-05-04T08:39:00Z",
    lastActiveAt: "2026-05-06T14:22:00Z",
    wantsToHost: false,
  },
  {
    id: "b_hw",
    handle: "hwang",
    name: "Henry Wang",
    bio: "London. Posts Token Factory benchmarks weekly.",
    city: "London",
    country: "GB",
    tier: "BUILDER",
    pointsTotal: 412,
    githubHandle: "hwang",
    blogUrl: "https://hwang.dev/blog",
    expertise: ["benchmarks", "tokenfactory", "content"],
    signedUpAt: "2026-04-30T15:00:00Z",
    lastActiveAt: "2026-05-06T08:00:00Z",
    wantsToHost: false,
  },
  {
    id: "b_iy",
    handle: "iyamamoto",
    name: "Ichi Yamamoto",
    bio: "Osaka. Tinkers with edge inference.",
    city: "Osaka",
    country: "JP",
    tier: "BUILDER",
    pointsTotal: 389,
    githubHandle: "iyamamoto",
    expertise: ["inference", "edge"],
    signedUpAt: "2026-05-01T07:00:00Z",
    lastActiveAt: "2026-05-05T09:00:00Z",
    wantsToHost: false,
  },
  {
    id: "b_jl",
    handle: "jlee",
    name: "Jason Lee",
    bio: "Toronto. Just claimed both intro credits.",
    city: "Toronto",
    country: "CA",
    tier: "BUILDER",
    pointsTotal: 301,
    githubHandle: "jlee",
    expertise: ["agents"],
    signedUpAt: "2026-05-02T10:00:00Z",
    lastActiveAt: "2026-05-06T13:00:00Z",
    wantsToHost: false,
  },
];

export const sortedBuilders = () =>
  [...builders].sort((a, b) => b.pointsTotal - a.pointsTotal);

export const programMetrics = {
  eventsRun: 142,
  signupsAttributed: 1847,
  creditsClaimedUsd: 284_000,
  activeBuilders: 312,
  creditsClaimedUsdDelta: 24_000,
  eventsRunDelta: 12,
  signupsDelta: 183,
  buildersDelta: 47,
};

export function tierLabel(tier: BuilderTier): string {
  const map: Record<BuilderTier, string> = {
    BUILDER: "Builder · L1",
    CONTRIBUTOR: "Contributor · L2",
    AMBASSADOR: "Ambassador · L3",
    FOUNDING: "Founding · L3",
  };
  return map[tier];
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - +new Date(iso);
  const mins = Math.round(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  return `${months}mo ago`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatCurrency(usd: number): string {
  if (usd >= 1000) return `$${(usd / 1000).toFixed(0)}K`;
  return `$${usd}`;
}
