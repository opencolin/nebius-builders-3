import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NetworkBrowser } from "@/components/network-browser";
import { sortedBuilders } from "@/lib/network";

export default function NetworkIndex() {
  return (
    <>
      <TopNav />
      <main>
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Builders Network
            </p>
            <h1 className="h-display text-4xl font-bold tracking-tight md:text-5xl">
              The Nebius Builders Network
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
              {sortedBuilders().length} active builders across the world. Each one signed up with
              their GitHub, completed onboarding milestones, and earned standing through real work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-lime text-sm">
                Join the network →
              </Link>
              <Link href="/leaderboard" className="btn-outline text-sm">
                See the leaderboard
              </Link>
            </div>
          </div>
        </section>

        <section className="section bg-ink-50">
          <div className="container-page">
            <NetworkBrowser />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
