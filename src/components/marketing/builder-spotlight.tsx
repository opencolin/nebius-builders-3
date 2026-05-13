import Link from "next/link";
import { Section, SectionHeader } from "@/components/section";
import { Avatar } from "@/components/avatar";
import { projects } from "@/lib/projects";
import { formatProductFocus } from "@/lib/library";

/**
 * Picks the same project for every visitor in a given month, cycling through
 * the project list deterministically. New project on the 1st of each month.
 */
function pickMonthlySpotlight() {
  const now = new Date();
  const monthIndex = now.getUTCFullYear() * 12 + now.getUTCMonth();
  return projects[monthIndex % projects.length];
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function BuilderSpotlight() {
  const project = pickMonthlySpotlight();
  if (!project) return null;
  const now = new Date();
  const monthLabel = `${MONTHS[now.getUTCMonth()]} ${now.getUTCFullYear()}`;
  const leadAuthor = project.authors[0];
  const otherAuthorCount = project.authors.length - 1;

  return (
    <Section>
      <SectionHeader
        eyebrow={`Builder spotlight · ${monthLabel}`}
        title="One project, every month, picked by the team."
        body="A featured build from a Nebius Builder, Ambassador, or someone on the team. Rotates on the 1st."
      />
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col overflow-hidden rounded-card border border-ink-200 bg-white transition-all hover:border-ink-300 hover:shadow-soft dark:border-ink-700 dark:bg-ink-900 dark:hover:border-ink-600 md:flex-row"
      >
        <div
          className={`relative aspect-video bg-gradient-to-br ${project.cover} md:aspect-auto md:w-1/2`}
        >
          {project.awards?.length ? (
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {project.awards.map((a, i) => (
                <span key={i} className="pill bg-lime text-navy-700">
                  ★ {a.label}
                </span>
              ))}
            </div>
          ) : null}
          <div className="absolute right-3 top-3 pill bg-white/90 text-navy-700 dark:bg-ink-900/90 dark:text-ink-50">
            {formatProductFocus(project.productFocus)}
          </div>
          <div className="absolute bottom-4 left-4 hidden md:block">
            <span className="pill bg-navy-700 text-white dark:bg-lime dark:text-navy-700">
              {monthLabel}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
            {project.eventTitle ?? "Builder project"}
          </p>
          <h3 className="text-2xl font-semibold leading-snug text-ink-900 group-hover:text-navy-700 dark:text-ink-50 dark:group-hover:text-lime md:text-3xl">
            {project.title}
          </h3>
          <p className="line-clamp-4 text-base text-ink-600 dark:text-ink-300">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((t) => (
              <span key={t} className="pill-outline">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between gap-4 border-t border-ink-200 pt-5 dark:border-ink-700">
            <div className="flex items-center gap-3">
              <Avatar name={leadAuthor.name} handle={leadAuthor.handle} size={40} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink-900 dark:text-ink-50">
                  {leadAuthor.name}
                  {otherAuthorCount > 0 ? (
                    <span className="font-normal text-ink-500 dark:text-ink-400">
                      {" "}
                      +{otherAuthorCount} other
                      {otherAuthorCount === 1 ? "" : "s"}
                    </span>
                  ) : null}
                </p>
                <p className="truncate text-xs text-ink-500 dark:text-ink-400">
                  @{leadAuthor.handle} ·{" "}
                  {leadAuthor.role === "advocate"
                    ? "Team"
                    : leadAuthor.role.charAt(0).toUpperCase() + leadAuthor.role.slice(1)}
                </p>
              </div>
            </div>
            <span className="btn-lime pointer-events-none text-sm">Read more →</span>
          </div>
        </div>
      </Link>
    </Section>
  );
}
