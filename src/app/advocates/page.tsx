import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Avatar } from "@/components/avatar";
import { advocates } from "@/lib/advocates";

export default function AdvocatesIndex() {
  return (
    <>
      <TopNav />
      <main>
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Dev Advocates
            </p>
            <h1 className="h-display text-4xl font-bold tracking-tight md:text-5xl">
              Meet the Nebius DevRel team
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
              Reach the right Nebius DevRel person directly. 15-minute office hours, no gatekeeping.
              Cover questions about events, content, infrastructure, hiring leads — whatever helps
              you ship.
            </p>
          </div>
        </section>

        <section className="section bg-ink-50">
          <div className="container-page">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {advocates.map((adv) => (
                <Link key={adv.slug} href={`/advocates/${adv.slug}`} className="group block">
                  <div className="flex h-full flex-col gap-4 rounded-card border border-ink-200 bg-white p-6 transition-colors hover:border-ink-300 hover:shadow-soft">
                    <div className="flex items-start gap-4">
                      <Avatar name={adv.name} handle={adv.githubHandle ?? adv.slug} size={64} />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50 group-hover:text-navy-700">
                          {adv.name}
                        </h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                          {adv.title.replace(", Nebius", "")}
                        </p>
                        <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{adv.region}</p>
                      </div>
                    </div>
                    <p className="text-sm text-ink-600 dark:text-ink-300 line-clamp-3">{adv.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {adv.expertise.slice(0, 4).map((e) => (
                        <span key={e} className="pill-outline">
                          {e}
                        </span>
                      ))}
                    </div>
                    {adv.calendlyUrl ? (
                      <p className="mt-auto pt-3 text-sm font-semibold text-navy-700 dark:text-lime group-hover:underline">
                        Book office hours →
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 rounded-card border border-ink-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50">Don't see your region covered?</h3>
              <p className="mt-2 max-w-2xl text-ink-600 dark:text-ink-300">
                Reach out to Colin — he handles unrouted requests and can pull in a
                Nebius engineer for technical questions outside DevRel's scope.
              </p>
              <Link href="/advocates/colin" className="btn-navy mt-5">
                Contact Colin →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
