// Product-shape placeholders + real reference data.
//
// All mock entries (fake events, fake teams, fake testimonial quote, fake
// in-event content) were removed. What's left here is either real (partners,
// the user's own profile, doc structure) or product-shape placeholders that
// don't pretend to be data (pricing tiers).

export type EventFormat =
  | "HACKATHON"
  | "HACK_DAY"
  | "HACK_NIGHT"
  | "MEETUP"
  | "MINI_CONFERENCE"
  | "DEMO_NIGHT";

export type EventState = "LIVE" | "UPCOMING" | "COMPLETED";

export type Event = {
  id: string;
  slug: string;
  title: string;
  format: EventFormat;
  state: EventState;
  startDateTime: string;
  endDateTime?: string;
  city: string;
  venue: string;
  isOnline: boolean;
  cover: string;
  description: string;
  capacity: number;
  registered: number;
  partners: string[];
  prizePool?: string;
};

export type Workshop = {
  slug: string;
  title: string;
  hosts: { name: string; role: string; company: string; avatarUrl?: string }[];
  recordedAt: string;
  durationSeconds: number;
  videoProvider: "ZOOM" | "YOUTUBE" | "MUX";
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  chapters: { startSec: number; title: string }[];
  tags: string[];
  ctaUrl: string;
  ctaLabel: string;
  watchCount: number;
};

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  eventsPerMonth: string;
  blurb: string;
  features: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
};

// Real partners — names pulled from sponsor walls of actual events.
export const partners: { name: string; tag?: string }[] = [
  { name: "Anthropic" },
  { name: "AWS" },
  { name: "GitHub" },
  { name: "Nebius", tag: "host" },
  { name: "OpenAI" },
  { name: "Telnyx" },
  { name: "Wordware" },
  { name: "Zep" },
  { name: "Runpod" },
  { name: "Distil Labs" },
  { name: "Moss" },
  { name: "SovrenAI" },
  { name: "Symbiotic AI" },
  { name: "Tavily" },
  { name: "Qdrant" },
  { name: "Tessl" },
  { name: "MotherDuck" },
  { name: "Stripe" },
  { name: "Redis" },
  { name: "IBM Watsonx" },
  { name: "Tandem AI" },
  { name: "Qualcomm" },
  { name: "ClawMax" },
  { name: "OpenMind" },
  { name: "Tremendous" },
  { name: "OpenClaw" },
];

// Event listings live in `builder-events.ts` (curated + Luma-scraped).
// This array stays for the manager-screen mockups; empty so no fake rows appear.
export const events: Event[] = [];

// Workshop entries live in `library.ts` now. The richer detail shape stays
// available as a type for any future custom workshop pages.
export const workshops: Workshop[] = [];

export const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "/mo",
    eventsPerMonth: "3 events / month",
    blurb: "Run a small meetup or test the platform.",
    features: ["Streaming", "Basic analytics", "Project view", "Public event page"],
    cta: { label: "Start free", href: "/companies/login" },
  },
  {
    name: "Starter",
    price: "$1,000",
    cadence: "/mo",
    eventsPerMonth: "10 events / month",
    blurb: "Capture content from every event you run.",
    features: ["Everything in Free", "Content recording", "Feedback capture", "Raffle tools"],
    cta: { label: "Choose Starter", href: "/companies/login" },
  },
  {
    name: "Pro",
    price: "$2,000",
    cadence: "/mo",
    eventsPerMonth: "15 events / month",
    blurb: "Most teams pick this — IDE included.",
    features: [
      "Everything in Starter",
      "1,000 IDE workspace minutes",
      "Token Factory integration",
      "Advanced analytics",
      "Nebius CPU Serverless deploy",
    ],
    cta: { label: "Choose Pro", href: "/companies/login" },
    highlight: true,
  },
  {
    name: "Scale",
    price: "$3,500",
    cadence: "/mo",
    eventsPerMonth: "25 events / month",
    blurb: "For DevRel orgs running global programs.",
    features: [
      "Everything in Pro",
      "2,000 IDE workspace minutes",
      "Nebius GPU Serverless (NemoClaw)",
      "White-label event pages",
      "Priority support",
    ],
    cta: { label: "Choose Scale", href: "/companies/login" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    eventsPerMonth: "Unlimited",
    blurb: "Dedicated Contree pool, SLAs, on-prem option.",
    features: ["Everything in Scale", "SSO (SAML / OIDC)", "Custom SLAs", "Dedicated Contree pool", "On-prem option"],
    cta: { label: "Talk to us", href: "#contact" },
  },
];

// Real account that drives the logged-in mockup screens.
export const currentUser = {
  id: "u_colin",
  name: "Colin Lowenberg",
  email: "collin@dabl.club",
  phone: null as string | null,
  image:
    "https://lh3.googleusercontent.com/a/ACg8ocKTnbT2BnjWt0ivcEbGHnVBACUTTF1Ma4WwZJOXbNG5UkCTEz9ZsQ=s96-c",
  memberSince: "December 31, 2025",
  linkedInUrl: null as string | null,
  githubUrl: "https://github.com/opencolin",
  discordHandle: null as string | null,
  twitterHandle: null as string | null,
};

// Team management is empty — joined-team data shipped real once we wire the
// Neon-backed team table. Until then the dashboard renders empty states.
export const teamsAsLeader: {
  id: string;
  name: string;
  event: Event;
  invitations: { email: string; status: "PENDING" }[];
  members: { name: string; role: string }[];
  project: { name: string; status: "DRAFT" | "PUBLISHED"; hasVideo: boolean };
}[] = [];

export const teamsAsMember: typeof teamsAsLeader = [];

export const pendingInvitations: {
  id: string;
  teamName: string;
  eventName: string;
  leaderName: string;
}[] = [];

export type ProjectSummary = {
  id: string;
  rank: number;
  name: string;
  team: string;
  description: string;
  technologies: string[];
  partners: string[];
  votes: number;
  demoApproved: boolean;
};

// In-event leaderboard / vote tally: empty until live events feed it.
export const eventProjects: ProjectSummary[] = [];

// Event-management mock arrays — all empty so manager screens render empty
// states instead of fictional rows.
export const eventBlasts: { id: string; sentAt: string; body: string }[] = [];

export const eventPrizes: { title: string; value: string; dollarValue: number }[] = [];

export const eventVolunteerOpportunities: {
  title: string;
  category: string;
  timeSlot: string;
  location: string;
  filled: number;
  max: number;
}[] = [];

export const eventSpeakers: {
  name: string;
  company: string;
  status: "APPROVED" | "INVITED" | "DECLINED";
  talk: string;
}[] = [];

// Real product surface area used by the /docs route.
export const docSections = [
  {
    title: "Get started",
    pages: [
      { slug: "quickstart", title: "Quickstart" },
      { slug: "index", title: "Welcome to Nebius Builders" },
    ],
  },
  {
    title: "Builders",
    pages: [
      { slug: "builders/install-openclaw", title: "Install OpenClaw" },
      { slug: "builders/create-a-team", title: "Create a team" },
      { slug: "builders/submit-a-project", title: "Submit a project" },
    ],
  },
  {
    title: "Event managers",
    pages: [
      { slug: "event-managers/create-an-event", title: "Create an event" },
      { slug: "event-managers/host-an-event", title: "Manage an event" },
      { slug: "event-managers/manage-event-managers", title: "Manage event managers" },
      { slug: "event-managers/manage-partner-companies", title: "Manage partner companies" },
      { slug: "event-managers/manage-prizes", title: "Manage prizes" },
      { slug: "event-managers/manage-volunteers", title: "Manage volunteers" },
      { slug: "event-managers/manage-feedback", title: "Manage feedback" },
      { slug: "event-managers/capture-live-demos", title: "Capture live demos" },
      { slug: "event-managers/capture-live-presentations", title: "Capture live presentations" },
      { slug: "event-managers/view-projects", title: "View projects" },
      { slug: "event-managers/send-event-blast", title: "Send event blast" },
      { slug: "event-managers/share-event-link", title: "Share event link" },
      { slug: "event-managers/post-event-summary", title: "Post-event summary" },
    ],
  },
  {
    title: "OpenClaw on Nebius",
    pages: [
      { slug: "openclaw/local-install", title: "Local install" },
      { slug: "openclaw/docker", title: "Docker" },
      { slug: "openclaw/nebius-cpu-serverless", title: "Nebius CPU Serverless" },
      { slug: "openclaw/nebius-gpu-serverless", title: "Nebius GPU Serverless" },
      { slug: "openclaw/token-factory", title: "Token Factory" },
    ],
  },
];
