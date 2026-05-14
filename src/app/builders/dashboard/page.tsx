import Link from "next/link";
import { AppHeader } from "@/components/app-chrome";
import { BuilderEventCard } from "@/components/builder-event-card";
import { currentUser } from "@/lib/data";
import {
  completedBuilderEvents,
  publishedBuilderEvents,
} from "@/lib/builder-events";
import { library } from "@/lib/library";
import { projects } from "@/lib/projects";

const builderNav = [
  { label: "Console", href: "/builders/dashboard" },
  { label: "Events", href: "/events" },
  { label: "Teams", href: "/builders/teams" },
  { label: "Workshops", href: "/workshops" },
  { label: "Network", href: "/network" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Profile", href: "/builders/dashboard/profile" },
];

export default function BuilderDashboard() {
  const upcoming = publishedBuilderEvents().slice(0, 6);
  const past = completedBuilderEvents().slice(0, 3);
  const watchNext = library
    .filter((l) => l.type === "WORKSHOP" || l.type === "VIDEO")
    .slice(0, 3);

  const eventsLive = upcoming.filter((e) => {
    const now = Date.now();
    return now >= +new Date(e.startsAt) && now <= +new Date(e.endsAt);
  }).length;

  const colinProjects = projects.filter((p) =>
    p.authors.some((a) => a.handle === "opencolin"),
  ).length;

  return (
    <>
      <AppHeader links={builderNav} />
      <main className="bg-ink-50 dark:bg-ink-800">
        <section className="border-b border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900">
          <div className="container-page py-10">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">Builder console</p>
                <h1 className="h-display mt-1 text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">Welcome back, {currentUser.name.split(" ")[0]}.</h1>
                <p className="mt-2 text-ink-600 dark:text-ink-300">
                  {eventsLive > 0
                    ? `${eventsLive} event${eventsLive === 1 ? "" : "s"} live right now`
                    : `${upcoming.length} upcoming events on the calendar`}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href="/ide" className="btn-navy">Open IDE →</Link>
                <Link href="/builders/teams" className="btn-outline">Teams</Link>
              </div>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["Upcoming events", `${upcoming.length}`],
                ["Past events", `${past.length}`],
                ["Library entries", `${library.length}`],
                ["Your projects", `${colinProjects}`],
              ].map(([l, v]) => (
                <div key={l} className="card">
                  <dt className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">{l}</dt>
                  <dd className="mt-2 text-2xl font-bold text-navy-700 dark:text-lime">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section">
          <div className="container-page">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="h-display text-2xl font-bold">Upcoming events</h2>
              <Link href="/events" className="btn-ghost text-sm">All events →</Link>
            </div>
            {upcoming.length === 0 ? (
              <p className="text-sm text-ink-500 dark:text-ink-400">No upcoming events on the calendar.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((e) => <BuilderEventCard key={e.id} event={e} />)}
              </div>
            )}
          </div>
        </section>

        <section className="section bg-white dark:bg-ink-900">
          <div className="container-page">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="h-display text-2xl font-bold">Watch next</h2>
              <Link href="/library" className="btn-ghost text-sm">All library entries →</Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {watchNext.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/library/${entry.slug}`}
                  className="card group flex h-full flex-col gap-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-navy-700 dark:text-lime">
                    {entry.type === "WORKSHOP" ? "Workshop" : "Video"}
                    {entry.durationMin ? ` · ${entry.durationMin} min` : ""}
                  </p>
                  <h3 className="text-base font-semibold leading-snug text-ink-900 dark:text-ink-50 group-hover:text-navy-700 dark:group-hover:text-lime">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-ink-600 dark:text-ink-300 line-clamp-3">{entry.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-page">
            <h2 className="mb-6 h-display text-2xl font-bold">Past events</h2>
            {past.length === 0 ? (
              <p className="text-sm text-ink-500 dark:text-ink-400">No past events recorded yet.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {past.map((e) => <BuilderEventCard key={e.id} event={e} />)}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
