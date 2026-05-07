// Nebius Dev Advocates — seeded from /content/advocates/seed.json
// (placeholder rows replaced with realistic mock profiles for screenshots).

export type Advocate = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  region: string;
  timezone: string;
  expertise: string[];
  languages: string[];
  active: boolean;
  email?: string;
  twitterHandle?: string;
  githubHandle?: string;
  linkedinUrl?: string;
  slackHandle?: string;
  calendlyUrl?: string;
};

export const advocates: Advocate[] = [
  {
    slug: "colin",
    name: "Colin",
    title: "Lead Developer Advocate, Nebius",
    bio: "Runs the Nebius Builders Network and works with community ambassadors hosting events worldwide. Background: forward-deployed engineering, DevRel at multiple AI infra companies, organizer of countless dev meetups and hackathons. Based in San Francisco; happy to grab coffee with any Bay Area builder.",
    region: "San Francisco, US-Pacific",
    timezone: "America/Los_Angeles",
    expertise: ["devrel", "events", "openclaw", "tokenfactory", "agents", "fine-tuning"],
    languages: ["en"],
    active: true,
    email: "collin@dabl.club",
    twitterHandle: "opencolin",
    githubHandle: "opencolin",
    slackHandle: "@colin",
    calendlyUrl: "https://calendly.com/opencolin/15min",
  },
  {
    slug: "amelia",
    name: "Amelia Chen",
    title: "Developer Advocate, EU",
    bio: "Based in London, covers EU and UK. Background in distributed systems and ML platform engineering. Hosts office hours every Thursday for European builders.",
    region: "London, EU-West",
    timezone: "Europe/London",
    expertise: ["distributed-systems", "soperator", "kubernetes", "training"],
    languages: ["en", "zh"],
    active: true,
    email: "amelia@example.com",
    twitterHandle: "amelia_chen_dev",
    githubHandle: "amelia-chen",
    slackHandle: "@amelia",
    calendlyUrl: "https://calendly.com/amelia/15min",
  },
  {
    slug: "kenji",
    name: "Kenji Tanaka",
    title: "Developer Advocate, APAC",
    bio: "Based in Singapore, covers APAC region. Specializes in fine-tuning, agents, and Token Factory integrations. Speaks at every major AI conference in the region.",
    region: "Singapore, APAC",
    timezone: "Asia/Singapore",
    expertise: ["fine-tuning", "agents", "tokenfactory", "content"],
    languages: ["en", "ja", "zh"],
    active: true,
    email: "kenji@example.com",
    twitterHandle: "kenji_dev",
    githubHandle: "ktanaka",
    slackHandle: "@kenji",
    calendlyUrl: "https://calendly.com/kenji/15min",
  },
  {
    slug: "raquel",
    name: "Raquel Santos",
    title: "Developer Advocate, Americas East",
    bio: "Based in NYC, covers East Coast US + Latin America. Focused on enterprise builders and AI Cloud onboarding. Bilingual EN/ES.",
    region: "New York, US-East",
    timezone: "America/New_York",
    expertise: ["enterprise", "aicloud", "onboarding"],
    languages: ["en", "es", "pt"],
    active: true,
    email: "raquel@example.com",
    twitterHandle: "raquel_dev",
    githubHandle: "rsantos",
    slackHandle: "@raquel",
    calendlyUrl: "https://calendly.com/raquel/15min",
  },
];

export const findAdvocate = (slug: string) => advocates.find((a) => a.slug === slug);
