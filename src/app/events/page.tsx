import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { EventsBrowser } from "@/components/events-browser";
import { EventsMap } from "@/components/events-map";
import { completedBuilderEvents, publishedBuilderEvents } from "@/lib/builder-events";
import { programMetrics, formatNumber, formatCurrency } from "@/lib/network";

export default function EventsIndex() {
  const upcoming = publishedBuilderEvents();
  const past = completedBuilderEvents();
  const mappable = upcoming.filter((e) => !e.isOnline && (e.lat !== 0 || e.lng !== 0));

  return (
    <>
      <TopNav />
      <main>
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Events
            </p>
            <h1 className="h-display text-4xl font-bold tracking-tight md:text-5xl">
              Find an event. Show up. Ship.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
              Builder-hosted Nebius events worldwide, plus the Nebius official tour. Every entry has
              Token Factory keys ready, a Contree workspace one click away, and a base station for
              live demos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/companies/login" className="btn-lime text-sm">
                Host an event →
              </Link>
              <Link href="/ambassadors" className="btn-outline text-sm">
                Become an ambassador
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
              {[
                ["Events run", `${formatNumber(programMetrics.eventsRun)}`],
                ["Sign-ups attributed", `${formatNumber(programMetrics.signupsAttributed)}`],
                ["Credits claimed", `${formatCurrency(programMetrics.creditsClaimedUsd)}`],
                ["Active builders", `${formatNumber(programMetrics.activeBuilders)}`],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                    {label}
                  </dt>
                  <dd className="mt-2 text-3xl font-bold text-navy-700 dark:text-lime">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section bg-ink-50 dark:bg-ink-800">
          <div className="container-page">
            <div className="mb-12">
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                    Map
                  </p>
                  <h2 className="mt-1 h-display text-2xl font-bold tracking-tight">
                    Where builders are showing up
                  </h2>
                </div>
                <p className="text-xs text-ink-500 dark:text-ink-400">
                  {mappable.length} events shown · online and global tours excluded
                </p>
              </div>
              <EventsMap events={mappable} />
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500 dark:text-ink-400">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-lime bg-navy-700" />
                  Builder-hosted
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-navy-700 bg-lime" />
                  Nebius official
                </span>
                <span>· click a dot for details</span>
              </p>
            </div>
            <EventsBrowser upcoming={upcoming} past={past} />
            <p className="mt-12 text-sm text-ink-500 dark:text-ink-400">
              Hosting an event?{" "}
              <Link className="font-medium text-navy-700 dark:text-lime underline-offset-4 hover:underline" href="/companies/login">
                Apply to host →
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
