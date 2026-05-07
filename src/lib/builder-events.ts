// Community + Nebius-corporate events.
// Seeded from nebius-builders repo #1 (src/lib/mock.ts EVENTS + OFFICIAL_EVENTS).
// These extend the marketing-only `events` list in data.ts with the builder-hosted
// rows the /events directory needs.

export type BuilderEventFormat =
  | "WORKSHOP"
  | "TALK"
  | "HACKATHON"
  | "OFFICE_HOURS"
  | "DEMO_NIGHT"
  | "OTHER";

export type BuilderEventStatus = "DRAFT" | "PUBLISHED" | "COMPLETED" | "CANCELLED";

export type BuilderEvent = {
  id: string;
  title: string;
  description: string;
  format: BuilderEventFormat;
  startsAt: string;
  endsAt: string;
  timezone: string;
  venueName: string;
  venueAddress?: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  isOnline: boolean;
  expectedAttendees?: number;
  actualAttendees?: number;
  productFocus: string[];
  builderHandle: string;
  builderName: string;
  status: BuilderEventStatus;
  lumaUrl?: string;
  isOfficial?: boolean;
  officialUrl?: string;
  dateRange?: string;
};

export const builderEvents: BuilderEvent[] = [
  {
    id: "e_1",
    title: "Fine-tuning Gemma on Nebius — Hands-on",
    description:
      "QLoRA fine-tune Gemma 4 on your own data. Bring a laptop, leave with a deployed adapter.",
    format: "WORKSHOP",
    startsAt: "2026-05-12T19:00:00Z",
    endsAt: "2026-05-12T22:00:00Z",
    timezone: "America/Los_Angeles",
    venueName: "Sandbox VR SF",
    venueAddress: "833 Market St, San Francisco, CA",
    city: "San Francisco",
    country: "US",
    lat: 37.7847,
    lng: -122.4072,
    isOnline: false,
    expectedAttendees: 30,
    productFocus: ["aicloud", "tokenfactory"],
    builderHandle: "rayyanzahid",
    builderName: "Ray Zahid",
    status: "PUBLISHED",
    lumaUrl: "https://lu.ma/example-fine-tune",
  },
  {
    id: "e_2",
    title: "LLM Evals — A Workshop for Builders",
    description: "How to actually measure if your fine-tune is better. With Token Factory examples.",
    format: "WORKSHOP",
    startsAt: "2026-05-15T23:00:00Z",
    endsAt: "2026-05-16T01:00:00Z",
    timezone: "America/New_York",
    venueName: "Newlab Brooklyn",
    venueAddress: "19 Morris Ave, Brooklyn, NY",
    city: "Brooklyn",
    country: "US",
    lat: 40.7008,
    lng: -73.9787,
    isOnline: false,
    expectedAttendees: 50,
    productFocus: ["tokenfactory"],
    builderHandle: "aboros",
    builderName: "Alex Boros",
    status: "PUBLISHED",
    lumaUrl: "https://lu.ma/example-evals",
  },
  {
    id: "e_3",
    title: "GPU Cluster Office Hours",
    description: "Bring your Slurm / Soperator questions. Drop-in style. Free pizza.",
    format: "OFFICE_HOURS",
    startsAt: "2026-05-20T17:00:00Z",
    endsAt: "2026-05-20T19:00:00Z",
    timezone: "America/Los_Angeles",
    venueName: "Stanford CodeX",
    venueAddress: "Stanford, CA",
    city: "Palo Alto",
    country: "US",
    lat: 37.4275,
    lng: -122.1697,
    isOnline: false,
    expectedAttendees: 25,
    productFocus: ["aicloud", "soperator"],
    builderHandle: "jwen",
    builderName: "Jia Wen",
    status: "PUBLISHED",
  },
  {
    id: "e_4",
    title: "Berlin Builders Meetup #4",
    description: "Token Factory show-and-tell. Bring a demo. Drinks after.",
    format: "DEMO_NIGHT",
    startsAt: "2026-05-22T18:00:00Z",
    endsAt: "2026-05-22T22:00:00Z",
    timezone: "Europe/Berlin",
    venueName: "Factory Berlin",
    venueAddress: "Lohmühlenstraße 65, Berlin",
    city: "Berlin",
    country: "DE",
    lat: 52.4985,
    lng: 13.4467,
    isOnline: false,
    expectedAttendees: 80,
    productFocus: ["tokenfactory"],
    builderHandle: "skoshy",
    builderName: "Sarah Koshy",
    status: "PUBLISHED",
    lumaUrl: "https://lu.ma/example-berlin",
  },
  {
    id: "e_5",
    title: "Tokyo Agents Hackathon",
    description: "8-hour build session. Top demo wins $500 of Nebius credits.",
    format: "HACKATHON",
    startsAt: "2026-05-25T01:00:00Z",
    endsAt: "2026-05-25T09:00:00Z",
    timezone: "Asia/Tokyo",
    venueName: "Roppongi Hills",
    venueAddress: "Roppongi, Tokyo",
    city: "Tokyo",
    country: "JP",
    lat: 35.6604,
    lng: 139.7292,
    isOnline: false,
    expectedAttendees: 60,
    productFocus: ["tokenfactory", "openclaw"],
    builderHandle: "fnakamura",
    builderName: "Fumi Nakamura",
    status: "PUBLISHED",
  },
  {
    id: "e_6",
    title: "Soperator Deep Dive (Online)",
    description:
      "Live walkthrough of running production agent fleets on Soperator. Q&A throughout.",
    format: "TALK",
    startsAt: "2026-05-28T16:00:00Z",
    endsAt: "2026-05-28T17:30:00Z",
    timezone: "America/Chicago",
    venueName: "Online — Zoom",
    isOnline: true,
    city: "Online",
    country: "US",
    lat: 30.2672,
    lng: -97.7431,
    expectedAttendees: 200,
    productFocus: ["soperator"],
    builderHandle: "dperez",
    builderName: "Daniel Perez",
    status: "PUBLISHED",
  },
  {
    id: "e_7",
    title: "Cairo AI Founder Mixer",
    description: "Founder-only mixer for Arabic NLP and MENA AI startups.",
    format: "OTHER",
    startsAt: "2026-05-30T17:00:00Z",
    endsAt: "2026-05-30T20:00:00Z",
    timezone: "Africa/Cairo",
    venueName: "AmCham Cairo",
    venueAddress: "Cairo",
    city: "Cairo",
    country: "EG",
    lat: 30.0444,
    lng: 31.2357,
    isOnline: false,
    expectedAttendees: 40,
    productFocus: ["tokenfactory"],
    builderHandle: "ehassan",
    builderName: "Esra Hassan",
    status: "PUBLISHED",
  },
  {
    id: "e_8",
    title: "Sandbox VR SF — Fine-tuning Workshop",
    description: "30 attendees fine-tuned Gemma live. The original.",
    format: "WORKSHOP",
    startsAt: "2026-05-05T19:00:00Z",
    endsAt: "2026-05-05T22:00:00Z",
    timezone: "America/Los_Angeles",
    venueName: "Sandbox VR SF",
    city: "San Francisco",
    country: "US",
    lat: 37.7847,
    lng: -122.4072,
    isOnline: false,
    expectedAttendees: 30,
    actualAttendees: 31,
    productFocus: ["aicloud", "tokenfactory"],
    builderHandle: "rayyanzahid",
    builderName: "Ray Zahid",
    status: "COMPLETED",
  },
];

// Nebius corporate events scraped from nebius.com/events on 2026-05-06.
export const officialEvents: BuilderEvent[] = [
  {
    id: "off_robotour",
    title: "Nebius RoboTour",
    description:
      "A global series of gatherings across research labs, startup hubs, and industry moments — connecting the people solving the hardest problems in robotics and physical AI.",
    format: "OTHER",
    startsAt: "2026-04-01T00:00:00Z",
    endsAt: "2026-12-31T23:59:00Z",
    timezone: "UTC",
    venueName: "Multiple cities (global tour)",
    city: "Global",
    country: "ZZ",
    lat: 0,
    lng: 0,
    isOnline: false,
    productFocus: ["aicloud"],
    builderHandle: "nebius",
    builderName: "Nebius",
    status: "PUBLISHED",
    isOfficial: true,
    officialUrl: "https://nebius.com/events/robotour",
    dateRange: "Apr 1 – Dec 31, 2026",
  },
  {
    id: "off_build_london",
    title: "Nebius.Build / London",
    description:
      "The Nebius.Build Tour is a series of in-person technical gatherings designed for engineers working on real-world AI infrastructure. Join ML engineers, platform architects, and technical founders for deep dives into deploying, scaling, and operating AI systems in production.",
    format: "OTHER",
    startsAt: "2026-05-21T18:00:00Z",
    endsAt: "2026-05-21T21:00:00Z",
    timezone: "Europe/London",
    venueName: "London (TBA)",
    city: "London",
    country: "GB",
    lat: 51.5074,
    lng: -0.1278,
    isOnline: false,
    productFocus: ["aicloud"],
    builderHandle: "nebius",
    builderName: "Nebius",
    status: "PUBLISHED",
    isOfficial: true,
    officialUrl: "https://nebius.com/events/nebius-build-london",
    dateRange: "May 21, 2026",
  },
  {
    id: "off_applied_ai_berlin",
    title: "Applied AI Conference by {Tech: Europe} 2026",
    description:
      "Find us at Applied AI Conference by {Tech: Europe}, 28 May — a one-day conference in Berlin for engineers, CTOs, and teams building and running AI systems in production.",
    format: "TALK",
    startsAt: "2026-05-28T09:00:00Z",
    endsAt: "2026-05-28T18:00:00Z",
    timezone: "Europe/Berlin",
    venueName: "Berlin (TBA)",
    city: "Berlin",
    country: "DE",
    lat: 52.52,
    lng: 13.405,
    isOnline: false,
    productFocus: ["aicloud", "tokenfactory"],
    builderHandle: "nebius",
    builderName: "Nebius",
    status: "PUBLISHED",
    isOfficial: true,
    officialUrl: "https://nebius.com/events/applied-ai-conference-by-tech-europe-2026",
    dateRange: "May 28, 2026",
  },
  {
    id: "off_icra_2026",
    title: "ICRA 2026",
    description:
      "IEEE International Conference on Robotics and Automation (ICRA) 2026. Nebius will participate as an exhibitor and speaker, showcasing how modern AI infrastructure powers the next generation of robotics, Physical AI, and autonomous systems.",
    format: "TALK",
    startsAt: "2026-06-01T09:00:00Z",
    endsAt: "2026-06-05T18:00:00Z",
    timezone: "Europe/Vienna",
    venueName: "Vienna (TBA)",
    city: "Vienna",
    country: "AT",
    lat: 48.2082,
    lng: 16.3738,
    isOnline: false,
    productFocus: ["aicloud"],
    builderHandle: "nebius",
    builderName: "Nebius",
    status: "PUBLISHED",
    isOfficial: true,
    officialUrl: "https://nebius.com/events/icra-2026",
    dateRange: "Jun 1–5, 2026",
  },
  {
    id: "off_inflection",
    title: "Nebius Inflection",
    description:
      "An exclusive invite-only gathering of AI thought leaders, builders, operators, and investors, working at the frontier of AI and beyond.",
    format: "OTHER",
    startsAt: "2026-06-09T17:00:00Z",
    endsAt: "2026-06-09T22:00:00Z",
    timezone: "America/New_York",
    venueName: "USA (TBA)",
    city: "New York",
    country: "US",
    lat: 40.7128,
    lng: -74.006,
    isOnline: false,
    productFocus: ["aicloud", "tokenfactory"],
    builderHandle: "nebius",
    builderName: "Nebius",
    status: "PUBLISHED",
    isOfficial: true,
    officialUrl: "https://nebius.com/events/nebius-inflection",
    dateRange: "Jun 9, 2026",
  },
  {
    id: "off_ai_summit_london",
    title: "AI Summit London 2026",
    description:
      "Nebius is proud to be an Industry Partner at AI Summit London 2026. The headline AI event of London Tech Week, AI Summit London unites the UK and Europe's most innovative technologists and business leaders to explore AI's transformative real-world applications.",
    format: "TALK",
    startsAt: "2026-06-10T09:00:00Z",
    endsAt: "2026-06-11T18:00:00Z",
    timezone: "Europe/London",
    venueName: "London (TBA)",
    city: "London",
    country: "GB",
    lat: 51.5074,
    lng: -0.1278,
    isOnline: false,
    productFocus: ["aicloud"],
    builderHandle: "nebius",
    builderName: "Nebius",
    status: "PUBLISHED",
    isOfficial: true,
    officialUrl: "https://nebius.com/events/ai-summit-london-2026",
    dateRange: "Jun 10–11, 2026",
  },
  {
    id: "off_mlcon_munich",
    title: "MLcon Munich 2026",
    description:
      "Find us at ML Conference Munich 2026, June 25–26 — a leading conference for Generative AI and Machine Learning engineering, bringing together developers, ML engineers, architects, and AI practitioners working on real-world AI systems.",
    format: "TALK",
    startsAt: "2026-06-25T09:00:00Z",
    endsAt: "2026-06-26T18:00:00Z",
    timezone: "Europe/Berlin",
    venueName: "Munich (TBA)",
    city: "Munich",
    country: "DE",
    lat: 48.1351,
    lng: 11.582,
    isOnline: false,
    productFocus: ["aicloud", "tokenfactory"],
    builderHandle: "nebius",
    builderName: "Nebius",
    status: "PUBLISHED",
    isOfficial: true,
    officialUrl: "https://nebius.com/events/mlcon-munich-2026",
    dateRange: "Jun 25–26, 2026",
  },
];

const formatLabel: Record<BuilderEventFormat, string> = {
  WORKSHOP: "Workshop",
  TALK: "Talk",
  HACKATHON: "Hackathon",
  OFFICE_HOURS: "Office hours",
  DEMO_NIGHT: "Demo night",
  OTHER: "Event",
};

export function eventFormatLabel(f: BuilderEventFormat): string {
  return formatLabel[f];
}

export function publishedBuilderEvents(): BuilderEvent[] {
  return [...officialEvents, ...builderEvents.filter((e) => e.status === "PUBLISHED")].sort(
    (a, b) => +new Date(a.startsAt) - +new Date(b.startsAt),
  );
}

export function completedBuilderEvents(): BuilderEvent[] {
  return builderEvents.filter((e) => e.status === "COMPLETED");
}

export function findBuilderEvent(id: string): BuilderEvent | undefined {
  return [...builderEvents, ...officialEvents].find((e) => e.id === id);
}
