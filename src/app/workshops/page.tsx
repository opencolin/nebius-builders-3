import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LibraryCard } from "@/components/library-card";
import { LibraryBrowser } from "@/components/library-browser";
import { library } from "@/lib/library";

export default function WorkshopsIndex() {
  const workshops = library.filter((l) => l.type === "WORKSHOP");
  const [featured, ...rest] = workshops;

  return (
    <>
      <TopNav />
      <main>
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Workshops
            </p>
            <h1 className="h-display text-4xl font-bold tracking-tight md:text-5xl">
              Pick a workshop. Run it tonight.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
              {workshops.length} Nebius-tested workshops across Token Factory, AI Cloud, Soperator,
              and OpenClaw. Self-paced or hands-on. Submit your own and earn 75 points.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/library" className="btn-outline text-sm">
                Browse the full library →
              </Link>
              <Link href="/signup" className="btn-lime text-sm">
                Submit a workshop
              </Link>
            </div>
          </div>
        </section>

        <section className="section bg-ink-50">
          <div className="container-page">
            {featured ? <LibraryCard entry={featured} featured /> : null}
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.slice(0, 6).map((w) => (
                <LibraryCard key={w.slug} entry={w} />
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container-page">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              All entries
            </p>
            <h2 className="h-display text-3xl font-bold tracking-tight">
              Filter the full library
            </h2>
            <p className="mt-3 max-w-2xl text-ink-600 dark:text-ink-300">
              Workshops, videos, and example repos in one place. Mix and match by type, level, and
              the Nebius product you're learning.
            </p>
            <div className="mt-10">
              <LibraryBrowser />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
