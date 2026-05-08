import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LibraryBrowser } from "@/components/library-browser";
import { library } from "@/lib/library";

export default function LibraryIndex() {
  return (
    <>
      <TopNav />
      <main>
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Library
            </p>
            <h1 className="h-display text-4xl font-bold tracking-tight md:text-5xl">
              Workshops, videos, and example repos
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
              {library.length} Nebius-tested entries — workshops, videos, and example repos. Pick one
              and run it tonight. Submit your own and earn 75 points.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-lime text-sm">
                Submit a workshop / video / repo →
              </Link>
              <Link href="/workshops" className="btn-outline text-sm">
                Just the workshops →
              </Link>
            </div>
          </div>
        </section>

        <section className="section bg-ink-50 dark:bg-ink-800">
          <div className="container-page">
            <LibraryBrowser />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
