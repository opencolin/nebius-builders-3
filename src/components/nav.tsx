import Link from "next/link";
import { NebiusLogo } from "./nebius-logo";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/events", label: "Events" },
  { href: "/projects", label: "Projects" },
  { href: "/library", label: "Library" },
  { href: "/ambassadors", label: "Ambassadors" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/team", label: "Team" },
];

const docsLinks: {
  title: string;
  blurb: string;
  href: string;
  external?: boolean;
}[] = [
  {
    title: "AI Cloud",
    blurb: "GPU VMs, Managed Kubernetes, and Slurm.",
    href: "https://docs.nebius.com/",
    external: true,
  },
  {
    title: "Token Factory",
    blurb: "OpenAI-compatible inference for open models.",
    href: "https://docs.tokenfactory.nebius.com/quickstart",
    external: true,
  },
  {
    title: "Serverless",
    blurb: "Containerized AI Jobs and Endpoints.",
    href: "https://docs.nebius.com/",
    external: true,
  },
  {
    title: "Tavily",
    blurb: "Web search and extraction for agents.",
    href: "http://docs.tavily.com/",
    external: true,
  },
];

const linkBaseClass =
  "rounded-md px-3 py-1.5 text-sm font-medium text-ink-700 hover:bg-ink-100 hover:text-ink-900 dark:text-ink-200 dark:hover:bg-ink-800 dark:hover:text-ink-50";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/85 backdrop-blur dark:border-ink-800 dark:bg-ink-900/85">
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <NebiusLogo />
          <nav className="hidden gap-1 md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkBaseClass}>
                {l.label}
              </Link>
            ))}
            <DocsMenu />
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/builders/login" className="btn-ghost">
            Log in
          </Link>
          <Link href="/signup" className="btn-lime">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}

function DocsMenu() {
  return (
    <div className="group relative">
      <Link
        href="/docs"
        className={`${linkBaseClass} inline-flex items-center gap-1 group-hover:bg-ink-100 group-hover:text-ink-900 dark:group-hover:bg-ink-800 dark:group-hover:text-ink-50`}
        aria-haspopup="true"
      >
        Docs
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          aria-hidden
          className="transition-transform group-hover:rotate-180"
        >
          <path
            d="M3 4.5l3 3 3-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <div
        role="menu"
        className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      >
        <div className="w-[420px] overflow-hidden rounded-card border border-ink-200 bg-white p-2 shadow-soft dark:border-ink-700 dark:bg-ink-900">
          <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
            Product docs
          </p>
          <ul className="grid gap-0.5">
            {docsLinks.map((d) => (
              <li key={d.title}>
                <a
                  href={d.href}
                  target={d.external ? "_blank" : undefined}
                  rel={d.external ? "noreferrer" : undefined}
                  className="block rounded-md px-3 py-2.5 hover:bg-ink-50 dark:hover:bg-ink-800"
                  role="menuitem"
                >
                  <div className="flex items-center justify-between gap-2 text-sm font-semibold text-ink-900 dark:text-ink-50">
                    <span>{d.title}</span>
                    <span aria-hidden className="text-ink-400 dark:text-ink-500">
                      ↗
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-ink-600 dark:text-ink-300">{d.blurb}</p>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 border-t border-ink-200 pt-2 dark:border-ink-800">
            <Link
              href="/docs"
              className="block rounded-md px-3 py-2 text-sm font-semibold text-navy-700 hover:bg-ink-50 dark:text-lime dark:hover:bg-ink-800"
              role="menuitem"
            >
              Builder docs (this site) →
            </Link>
            <a
              href="https://nebius.com/blog?tags=builder-updates"
              target="_blank"
              rel="noreferrer"
              className="block rounded-md px-3 py-2 text-sm text-ink-700 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
              role="menuitem"
            >
              Builder updates blog ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
