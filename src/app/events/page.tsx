import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { EventsBrowser } from "@/components/events-browser";
import { completedBuilderEvents, publishedBuilderEvents } from "@/lib/builder-events";
import { programMetrics, formatNumber, formatCurrency } from "@/lib/network";

export default function EventsIndex() {
  const upcoming = publishedBuilderEvents();
  const past = completedBuilderEvents();

  return (
    <>
      <TopNav />
      <main>
        <section className="border-b border-ink-200 bg-white">
          <div className="container-page py-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
              Events
            </p>
            <h1 className="h-display text-4xl font-bold tracking-tight md:text-5xl">
              Find an event. Show up. Ship.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-600">
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
                  <dt className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                    {label}
                  </dt>
                  <dd className="mt-2 text-3xl font-bold text-navy-700">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section bg-ink-50">
          <div className="container-page">
            <EventsBrowser upcoming={upcoming} past={past} />
            <p className="mt-12 text-sm text-ink-500">
              Hosting an event?{" "}
              <Link className="font-medium text-navy-700 underline-offset-4 hover:underline" href="/companies/login">
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
