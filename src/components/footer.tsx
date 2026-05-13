import Link from "next/link";
import { NebiusLogo } from "./nebius-logo";

const cols = [
  {
    title: "Build",
    links: [
      { href: "/events", label: "Events" },
      { href: "/projects", label: "Projects" },
      { href: "/library", label: "Library" },
      { href: "/workshops", label: "Workshops" },
      { href: "/ide", label: "Cloud IDE" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/ambassadors", label: "Ambassador program" },
      { href: "/office-hours", label: "Office hours" },
      { href: "/leaderboard", label: "Leaderboard" },
      { href: "/network", label: "Builder network" },
      { href: "/team", label: "Team" },
      { href: "/signup", label: "Sign up" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Docs" },
      { href: "https://docs.nebius.com/", label: "Nebius docs" },
      { href: "https://docs.tokenfactory.nebius.com/quickstart", label: "Token Factory quickstart" },
      { href: "http://docs.tavily.com/", label: "Tavily docs" },
      { href: "https://nebius.com/blog?tags=builder-updates", label: "Builder updates blog" },
      { href: "https://github.com/nebius", label: "GitHub" },
      { href: "https://www.youtube.com/@nebiusofficial/videos", label: "YouTube" },
    ],
  },
  {
    title: "Programs",
    links: [
      { href: "/ambassadors", label: "Builders Network" },
      { href: "https://nebius.com/startups/", label: "Startup Program" },
      { href: "https://academy.nebius.com/", label: "AI for Tech Academy" },
      { href: "/companies/login", label: "Host an event" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "https://nebius.com", label: "Nebius.com" },
      { href: "/about#privacy", label: "Privacy" },
      { href: "#contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
      <div className="container-page py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 space-y-4">
            <NebiusLogo />
            <p className="max-w-xs text-sm text-ink-600 dark:text-ink-300">
              Nebius for AI Builders. Training, fine-tuning, and inference at scale — plus the
              community that ships on it.
            </p>
            <p className="text-sm text-ink-500 dark:text-ink-400">
              San Francisco · Remote · builders@nebius.com
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => {
                  const isExternal = l.href.startsWith("http");
                  return (
                    <li key={l.href}>
                      {isExternal ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-ink-700 hover:text-ink-900 dark:text-ink-200 dark:hover:text-ink-50"
                        >
                          {l.label} ↗
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="text-sm text-ink-700 hover:text-ink-900 dark:text-ink-200 dark:hover:text-ink-50"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-200 pt-6 md:flex-row md:items-center dark:border-ink-800">
          <p className="text-xs text-ink-500 dark:text-ink-400">© 2026 Nebius B.V. — Builders is a Nebius product. All rights reserved.</p>
          <p className="text-xs text-ink-500 dark:text-ink-400">Response time &lt; 24 hours · builders@nebius.com</p>
        </div>
      </div>
    </footer>
  );
}
