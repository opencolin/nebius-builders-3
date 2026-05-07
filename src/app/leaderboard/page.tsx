import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Avatar } from "@/components/avatar";
import {
  formatCurrency,
  formatNumber,
  programMetrics,
  relativeTime,
  sortedBuilders,
  tierLabel,
} from "@/lib/network";

export default function LeaderboardPage() {
  const ranking = sortedBuilders();

  return (
    <>
      <TopNav />
      <main>
        <section className="border-b border-ink-200 bg-white">
          <div className="container-page py-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
              Leaderboard
            </p>
            <h1 className="h-display text-4xl font-bold tracking-tight md:text-5xl">
              Top builders this quarter
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-600">
              Ranked by points earned across events, content, attributed sign-ups, and onboarding
              milestones. Tiers auto-promote at 500 (Contributor) and on Ambassador application
              approval.
            </p>
          </div>
        </section>

        <section className="section bg-ink-50">
          <div className="container-page">
            <div className="mb-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
              <Stat label="Active builders" value={formatNumber(programMetrics.activeBuilders)} />
              <Stat label="Events run" value={formatNumber(programMetrics.eventsRun)} />
              <Stat label="Sign-ups attributed" value={formatNumber(programMetrics.signupsAttributed)} />
              <Stat label="Credits claimed" value={formatCurrency(programMetrics.creditsClaimedUsd)} />
            </div>

            <div className="overflow-hidden rounded-card border border-ink-200 bg-white">
              <div className="grid grid-cols-[60px_1fr_120px_140px_140px] gap-4 border-b border-ink-200 bg-ink-50 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-ink-500">
                <div>Rank</div>
                <div>Builder</div>
                <div className="text-right">Points</div>
                <div>Tier</div>
                <div>Last active</div>
              </div>
              {ranking.map((b, i) => (
                <div
                  key={b.id}
                  className={`grid grid-cols-[60px_1fr_120px_140px_140px] items-center gap-4 border-b border-ink-200 px-5 py-4 last:border-b-0 ${
                    i === 0 ? "bg-lime/15" : i % 2 === 0 ? "bg-white" : "bg-ink-50/40"
                  }`}
                >
                  <div className="text-base font-semibold text-ink-900">#{i + 1}</div>
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar name={b.name} handle={b.githubHandle} size={36} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">@{b.handle}</p>
                      <p className="truncate text-xs text-ink-500">
                        {b.name} · {b.city}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-base font-semibold text-navy-700">
                    {formatNumber(b.pointsTotal)}
                  </div>
                  <div>
                    <span className="pill-outline text-[10px]">{tierLabel(b.tier)}</span>
                  </div>
                  <div className="text-xs text-ink-500">{relativeTime(b.lastActiveAt)}</div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-ink-500">
              Snapshots taken nightly · last refreshed {relativeTime(new Date().toISOString())}
            </p>

            <div className="mt-12 rounded-card border border-ink-200 bg-white p-8 text-center">
              <h2 className="text-xl font-semibold">Want on this list?</h2>
              <p className="mx-auto mt-3 max-w-xl text-ink-600">
                Sign up, host an event, ship a repo, give a talk. Points come from real work — not
                badge scans.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/signup" className="btn-lime">
                  Join the network →
                </Link>
                <Link href="/ambassadors" className="btn-outline">
                  How tiers work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <p className="text-3xl font-bold text-navy-700">{value}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-ink-500">{label}</p>
    </div>
  );
}
