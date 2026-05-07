import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Avatar } from "@/components/avatar";
import { Section, SectionHeader } from "@/components/section";
import { LibraryCard } from "@/components/library-card";
import { BuilderEventCard } from "@/components/builder-event-card";
import { library } from "@/lib/library";
import { advocates } from "@/lib/advocates";
import {
  formatCurrency,
  formatNumber,
  programMetrics,
  sortedBuilders,
  tierLabel,
} from "@/lib/network";
import { publishedBuilderEvents } from "@/lib/builder-events";

export default function AmbassadorsPage() {
  const featuredLibrary = library.slice(0, 3);
  const nextEvents = publishedBuilderEvents().filter((e) => !e.isOfficial).slice(0, 3);
  const topBuilders = sortedBuilders().slice(0, 12);

  return (
    <>
      <TopNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-ink-200 bg-white">
          <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
          <div className="absolute -left-20 -bottom-20 h-[480px] w-[480px] rounded-full bg-lime/40 blur-3xl" aria-hidden />
          <div className="container-page relative pt-24 pb-20">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-navy-700 dark:text-lime">
              Nebius Ambassador Program
            </p>
            <h1 className="h-display max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 dark:text-ink-50 sm:text-6xl lg:text-7xl">
              Real builders. Real work.
              {" "}
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-lime/80" aria-hidden />
                <span className="relative">No theater.</span>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-xl text-ink-600 dark:text-ink-300">
              Host Nebius events in your city or run online office hours. Earn up to $2,600 of
              credits as you climb from Builder → Contributor → Ambassador. Get promoted on points
              alone — points come from real work: events run, repos built, sign-ups attributed.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/signup" className="btn-lime px-6 py-3.5 text-sm">
                Sign up with GitHub →
              </Link>
              <Link href="/advocates/colin" className="btn-outline px-6 py-3.5 text-sm">
                Talk to a Dev Advocate
              </Link>
            </div>
          </div>
        </section>

        {/* Live program metrics */}
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page grid grid-cols-2 gap-y-10 py-12 lg:grid-cols-4">
            <Metric
              label="Events run"
              value={`#${formatNumber(programMetrics.eventsRun)}`}
              delta={`+${programMetrics.eventsRunDelta} this month`}
            />
            <Metric
              label="Sign-ups attributed"
              value={`#${formatNumber(programMetrics.signupsAttributed)}`}
              delta={`+${formatNumber(programMetrics.signupsDelta)} this month`}
            />
            <Metric
              label="Credits claimed"
              value={formatCurrency(programMetrics.creditsClaimedUsd)}
              delta={`+${formatCurrency(programMetrics.creditsClaimedUsdDelta)} this month`}
            />
            <Metric
              label="Active builders"
              value={`#${formatNumber(programMetrics.activeBuilders)}`}
              delta={`+${programMetrics.buildersDelta} this quarter`}
            />
          </div>
        </section>

        {/* Tiers */}
        <Section bg="tint">
          <SectionHeader
            eyebrow="How it works"
            title="Three tiers. Promote on points."
            body="Every action — hosting an event, shipping a repo, attributed sign-ups — earns points. Hit the threshold, get promoted. No applications, no politics."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <TierCard
              tier="Builder · L1"
              points="0–499 pts"
              perks={[
                "$100 of Token Factory introductory credits",
                "$100 of AI Cloud credits",
                "Builder badge on your profile",
                "Submit to the library",
              ]}
            />
            <TierCard
              tier="Contributor · L2"
              points="500–1,499 pts"
              highlight
              perks={[
                "Everything in Builder",
                "Up to $500 of event credits per quarter",
                "Priority library review (24h)",
                "Featured on advocate calls",
              ]}
            />
            <TierCard
              tier="Ambassador · L3"
              points="1,500+ pts (application)"
              perks={[
                "Everything in Contributor",
                "Up to $2,600 of credits per year",
                "Co-branded events with Nebius",
                "Direct line to DevRel leads",
              ]}
            />
          </div>
        </Section>

        {/* Featured library */}
        <Section>
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Library"
              title="Pick a workshop and run it tonight."
              body={`${library.length} Nebius-tested workshops, videos, and example repos. Submit your own and earn points.`}
            />
            <Link href="/library" className="btn-outline">
              View all entries →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredLibrary.map((entry) => (
              <LibraryCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </Section>

        {/* Upcoming events */}
        <Section bg="tint">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Upcoming events"
              title="Builder-hosted Nebius events worldwide."
              body="RSVP via Luma; the rest is logistics. Token Factory keys are loaded on the day."
            />
            <Link href="/events" className="btn-outline">
              See all on the map →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {nextEvents.map((e) => (
              <BuilderEventCard key={e.id} event={e} />
            ))}
          </div>
        </Section>

        {/* Meet the team */}
        <Section>
          <SectionHeader
            eyebrow="Meet the team"
            title="Reach the right Nebius DevRel person directly."
            body="15-minute office hours, no gatekeeping."
          />
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {advocates.map((adv) => (
              <Link key={adv.slug} href={`/advocates/${adv.slug}`} className="group block">
                <div className="card flex h-full flex-col gap-3">
                  <Avatar name={adv.name} handle={adv.githubHandle ?? adv.slug} size={56} />
                  <h4 className="text-base font-semibold text-ink-900 dark:text-ink-50 group-hover:text-navy-700">
                    {adv.name}
                  </h4>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                    {adv.title.replace(", Nebius", "")}
                  </p>
                  <p className="text-sm text-ink-600 dark:text-ink-300">{adv.region}</p>
                  {adv.calendlyUrl ? (
                    <p className="mt-auto pt-2 text-sm font-semibold text-navy-700 dark:text-lime group-hover:underline">
                      Book office hours →
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Top builders */}
        <Section bg="tint">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Leaderboard"
              title="Top builders this quarter."
              body="Ranked by points earned across events, content, and attributed sign-ups."
            />
            <Link href="/leaderboard" className="btn-outline">
              Full leaderboard →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {topBuilders.map((b) => (
              <Link key={b.id} href={`/network?handle=${b.handle}`} className="block">
                <div className="card flex h-full flex-col items-start gap-2 p-4">
                  <Avatar name={b.name} handle={b.githubHandle} size={36} />
                  <p className="truncate text-sm font-semibold">@{b.handle}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400">{formatNumber(b.pointsTotal)} pts</p>
                  <span className="pill-outline text-[10px]">{tierLabel(b.tier)}</span>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <section className="border-t border-ink-200 bg-white">
          <div className="container-page py-20 text-center">
            <h2 className="h-display text-3xl font-bold tracking-tight md:text-4xl">
              Ready to host your first event?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
              Sign up takes 90 seconds. Claim $200 in introductory credits today. Run your first
              event next week.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/signup" className="btn-lime px-6 py-3.5">
                Sign up with GitHub →
              </Link>
              <Link href="/advocates/colin" className="btn-outline px-6 py-3.5">
                Talk to a Dev Advocate
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Metric({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div>
      <p className="text-3xl font-bold text-navy-700 dark:text-lime sm:text-4xl">{value}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">{label}</p>
      <p className="mt-1 text-xs text-emerald-600">{delta}</p>
    </div>
  );
}

function TierCard({
  tier,
  points,
  perks,
  highlight,
}: {
  tier: string;
  points: string;
  perks: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col gap-4 rounded-card border bg-white p-6 ${
        highlight ? "border-navy-700 shadow-soft" : "border-ink-200"
      }`}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">{tier}</p>
        <p className="mt-2 text-2xl font-bold text-navy-700 dark:text-lime">{points}</p>
      </div>
      <ul className="space-y-2 text-sm text-ink-700 dark:text-ink-200">
        {perks.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="text-navy-700 dark:text-lime">✓</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
