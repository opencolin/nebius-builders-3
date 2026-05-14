// Nebius Dev Advocates. Only Colin is real today — additional advocates land
// here as the team grows.

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
];

export const findAdvocate = (slug: string) => advocates.find((a) => a.slug === slug);
