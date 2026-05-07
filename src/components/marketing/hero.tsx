import Link from "next/link";
import { formatNumber, programMetrics } from "@/lib/network";
import { library } from "@/lib/library";
import { publishedBuilderEvents } from "@/lib/builder-events";

export function Hero() {
  const eventsLive = publishedBuilderEvents().filter((e) => {
    const now = Date.now();
    return now >= +new Date(e.startsAt) && now <= +new Date(e.endsAt);
  }).length;

  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
      <div className="absolute inset-0 grid-bg opacity-60 dark:opacity-100" aria-hidden />
      <div className="absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-lime/40 blur-3xl dark:bg-lime/20" aria-hidden />
      <div className="container-page relative pt-20 pb-24 sm:pt-28 sm:pb-28 lg:pt-36">
        <span className="pill-lime mb-6">
          <span className="live-dot" />
          {eventsLive > 0
            ? `${eventsLive} event${eventsLive === 1 ? "" : "s"} live`
            : "Next event in the next 7 days"}
          {" · "}
          {formatNumber(programMetrics.activeBuilders)} active builders
        </span>
        <h1 className="h-display max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl dark:text-ink-50">
          Nebius for{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-lime/80" aria-hidden />
            <span className="relative">AI Builders</span>
          </span>
          .
        </h1>
        <p className="mt-7 max-w-2xl text-xl text-ink-600 dark:text-ink-300">
          From training and fine-tuning to production inference at scale. Plus a community of
          builders shipping real work — workshops, demos, hackathons, office hours. Get started
          with $100 of Token Factory or AI Cloud credits.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/signup" className="btn-lime px-6 py-3.5 text-sm">
            Start building →
          </Link>
          <Link href="/events" className="btn-outline px-6 py-3.5 text-sm">
            Find an event near you
          </Link>
          <Link href="/library/running-openclaw-on-nebius" className="btn-ghost text-sm">
            Watch: Running OpenClaw on Nebius →
          </Link>
        </div>
        <dl className="mt-16 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
          {[
            ["Active builders", formatNumber(programMetrics.activeBuilders)],
            ["Events run", formatNumber(programMetrics.eventsRun)],
            ["Library entries", `${library.length}`],
            ["Sign-ups attributed", formatNumber(programMetrics.signupsAttributed)],
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
  );
}
