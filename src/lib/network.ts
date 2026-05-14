// Public Builders Network — directory of community builders.
//
// The list is derived from `projects.ts` so every gallery entrant lands here
// automatically. As we scrape more hackathons in, those builders join the
// network without anyone editing this file. A small `curated` list overrides
// the auto-derivation for people we know personally (custom bio, city, etc.).

import { projects, type Project } from "@/lib/projects";

export type BuilderTier = "BUILDER" | "CONTRIBUTOR" | "AMBASSADOR" | "FOUNDING";

export type BuilderProfile = {
  id: string;
  handle: string;
  name: string;
  bio: string;
  /** Optional — derived builders may not have a known location. */
  city?: string;
  country?: string;
  /** Shown in place of "City, Country" when location is unknown. */
  subline?: string;
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
  /** Project slugs they're credited on. Empty for non-hackathon builders. */
  projectSlugs?: string[];
  /** How many awards they hold across all their projects. */
  awardsCount?: number;
};

// -- Curated (real people we know, with full profiles) -----------------------

const curated: BuilderProfile[] = [
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
];

// -- Derived from project galleries ------------------------------------------

type Accum = {
  handle: string;
  name: string;
  projectSlugs: string[];
  awards: number;
  events: Set<string>;
  techs: Map<string, number>;
  focuses: Set<string>;
  latestEventDate: string;
};

function shortenEvent(title: string): string {
  // "Nebius.Build SF Hackathon — March 2026" → "Nebius.Build SF"
  // "JetBrains × OpenAI Codex Hackathon — April 2026" → "JetBrains × OpenAI Codex"
  const head = title.split(" Hackathon")[0] ?? title;
  return head.trim();
}

function projectTitleBySlug(slug: string, all: Project[]): string {
  return all.find((p) => p.slug === slug)?.title ?? slug;
}

function bioFor(a: Accum, all: Project[]): string {
  const eventsArr = [...a.events].map(shortenEvent);
  const titles = a.projectSlugs.slice(0, 2).map((s) => projectTitleBySlug(s, all));
  if (a.projectSlugs.length === 1) {
    return `Built ${titles[0]} at ${eventsArr[0] ?? "a recent hackathon"}.`;
  }
  if (a.projectSlugs.length === 2 && eventsArr.length === 1) {
    return `Built ${titles[0]} and ${titles[1]} at ${eventsArr[0]}.`;
  }
  if (a.projectSlugs.length === 2) {
    return `Built ${titles[0]} and ${titles[1]} across ${eventsArr.join(" and ")}.`;
  }
  return `Shipped ${a.projectSlugs.length} projects across ${eventsArr.join(" and ")}.`;
}

function tierFor(a: Accum): BuilderTier {
  if (a.awards >= 1) return "AMBASSADOR";
  if (a.projectSlugs.length >= 2) return "CONTRIBUTOR";
  return "BUILDER";
}

function pointsFor(a: Accum): number {
  // 250 base + 200/project + 1000/award. A solo finalist lands at ~1450,
  // a winner with 2 projects at ~1850, a no-award single-project at 450.
  return 250 + a.projectSlugs.length * 200 + a.awards * 1000;
}

function expertiseFor(a: Accum): string[] {
  // Top techs by frequency, with productFocus tags blended in afterward.
  const byFreq = [...a.techs.entries()]
    .sort((x, y) => y[1] - x[1])
    .map(([t]) => t);
  const focusLabels: Record<string, string> = {
    tokenfactory: "Token Factory",
    aicloud: "AI Cloud",
    openclaw: "OpenClaw",
    soperator: "Soperator",
    tavily: "Tavily",
  };
  const focusTags = [...a.focuses]
    .filter((f) => f !== "other")
    .map((f) => focusLabels[f] ?? f);
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const t of [...byFreq, ...focusTags]) {
    const key = t.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(t);
    if (merged.length >= 4) break;
  }
  return merged;
}

function sublineFor(a: Accum): string {
  const events = [...a.events].map(shortenEvent);
  const n = a.projectSlugs.length;
  const eventLabel = events.length > 1 ? `${events.length} hackathons` : events[0] ?? "Hackathon";
  return `${eventLabel} · ${n} ${n === 1 ? "project" : "projects"}`;
}

function buildDerivedBuilders(): BuilderProfile[] {
  const acc = new Map<string, Accum>();
  for (const p of projects) {
    for (const a of p.authors) {
      if (!a.handle) continue;
      let entry = acc.get(a.handle);
      if (!entry) {
        entry = {
          handle: a.handle,
          name: a.name,
          projectSlugs: [],
          awards: 0,
          events: new Set(),
          techs: new Map(),
          focuses: new Set(),
          latestEventDate: p.shippedAt,
        };
        acc.set(a.handle, entry);
      }
      entry.projectSlugs.push(p.slug);
      entry.awards += p.awards?.length ?? 0;
      if (p.eventTitle) entry.events.add(p.eventTitle);
      for (const t of p.technologies ?? []) {
        entry.techs.set(t, (entry.techs.get(t) ?? 0) + 1);
      }
      for (const f of p.productFocus ?? []) entry.focuses.add(f);
      if (p.shippedAt > entry.latestEventDate) entry.latestEventDate = p.shippedAt;
    }
  }

  // Filter out anyone we've already curated by handle (case-insensitive).
  const curatedHandles = new Set(curated.map((b) => b.handle.toLowerCase()));

  return [...acc.values()]
    .filter((a) => !curatedHandles.has(a.handle.toLowerCase()))
    .map<BuilderProfile>((a) => ({
      id: `b_${a.handle.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
      handle: a.handle,
      name: a.name,
      bio: bioFor(a, projects),
      subline: sublineFor(a),
      tier: tierFor(a),
      pointsTotal: pointsFor(a),
      githubHandle: a.handle,
      expertise: expertiseFor(a),
      signedUpAt: a.latestEventDate,
      lastActiveAt: a.latestEventDate,
      wantsToHost: false,
      projectSlugs: a.projectSlugs,
      awardsCount: a.awards,
    }));
}

const derived = buildDerivedBuilders();

export const builders: BuilderProfile[] = [...curated, ...derived];

export const sortedBuilders = () =>
  [...builders].sort((a, b) => b.pointsTotal - a.pointsTotal);

// Top-line program metrics — `activeBuilders` is grounded in the real number
// of unique people on the gallery; the other counts are still placeholder.
export const programMetrics = {
  eventsRun: 142,
  signupsAttributed: 1847,
  creditsClaimedUsd: 284_000,
  activeBuilders: builders.length,
  creditsClaimedUsdDelta: 24_000,
  eventsRunDelta: 12,
  signupsDelta: 183,
  buildersDelta: derived.length,
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
