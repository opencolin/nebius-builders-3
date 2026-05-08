import Link from "next/link";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { findLibrary, formatLevel, formatProductFocus, library } from "@/lib/library";
import { workshops } from "@/lib/data";
import { formatDate, formatDuration } from "@/lib/utils";

export function generateStaticParams() {
  return library.map((l) => ({ slug: l.slug }));
}

function secsToTimestamp(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const typeLabel: Record<string, string> = {
  WORKSHOP: "Workshop",
  VIDEO: "Video",
  REPO: "Repo",
};

export default function LibraryDetail({ params }: { params: { slug: string } }) {
  const entry = findLibrary(params.slug);
  if (!entry) return notFound();

  // Some entries also have a rich workshop (chapters, hosts, etc.) in data.ts.
  const rich = workshops.find((w) => w.slug === params.slug || params.slug === "running-openclaw-on-nebius" && w.slug === "running-openclaw-on-nebius");

  return (
    <>
      <TopNav />
      <main className="bg-white dark:bg-ink-900">
        <section className="container-page pt-12 pb-6">
          <Link href="/library" className="text-sm text-ink-500 dark:text-ink-400 hover:text-ink-700">
            ← All entries
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
            {typeLabel[entry.type]}
            {" · "}
            {formatLevel(entry.level)}
            {entry.durationMin ? ` · ${entry.durationMin}m` : ""}
            {rich ? ` · ${formatDate(rich.recordedAt)}` : ""}
          </p>
          <h1 className="h-display mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">
            {entry.title}
          </h1>
          {rich ? (
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-600 dark:text-ink-300">
              {rich.hosts.map((h) => (
                <span key={h.name} className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-lime text-xs font-semibold text-navy-700 dark:text-lime">
                    {h.name[0]}
                  </span>
                  <span>
                    <strong className="text-ink-900 dark:text-ink-50">{h.name}</strong> · {h.role}, {h.company}
                  </span>
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-ink-600 dark:text-ink-300">
              {entry.isOfficial ? "Nebius DevRel" : `@${entry.submitterHandle ?? "community"}`}
              {entry.submitterDisplayName ? ` · ${entry.submitterDisplayName}` : ""}
            </p>
          )}
        </section>

        <section className="container-page grid gap-8 pb-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {rich ? (
              <div className="aspect-video overflow-hidden rounded-card border border-ink-200 dark:border-ink-700 bg-navy-700">
                <a
                  href={rich.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-700 via-navy-600 to-lime/40"
                >
                  <div className="flex flex-col items-center gap-3 text-white">
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-white dark:bg-ink-900 text-navy-700 dark:text-lime shadow-soft transition group-hover:scale-105">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-sm">{rich.videoProvider === "ZOOM" ? "Watch on Zoom" : "Play"}</p>
                    <p className="text-xs text-ink-100/80">
                      {formatDuration(rich.durationSeconds)} · {rich.watchCount.toLocaleString()} watches
                    </p>
                  </div>
                </a>
              </div>
            ) : entry.externalUrl ? (
              <div
                className={`aspect-video overflow-hidden rounded-card border border-ink-200 dark:border-ink-700 ${
                  entry.type === "REPO"
                    ? "bg-gradient-to-br from-ink-100 via-ink-50 to-lime/30"
                    : "bg-gradient-to-br from-navy-700 via-navy-600 to-lime/40"
                }`}
              >
                <a
                  href={entry.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full w-full items-center justify-center"
                >
                  <div
                    className={`flex flex-col items-center gap-3 ${
                      entry.type === "REPO" ? "text-ink-700 dark:text-ink-200" : "text-white"
                    }`}
                  >
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-white dark:bg-ink-900 text-navy-700 dark:text-lime shadow-soft transition group-hover:scale-105">
                      {entry.type === "REPO" ? (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5z" />
                        </svg>
                      ) : (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm">
                      {entry.type === "REPO" ? "Open on GitHub" : entry.type === "VIDEO" ? "Watch video" : "Open workshop"}
                    </p>
                    {entry.metadata?.stars != null ? (
                      <p className="text-xs text-ink-100/80">★ {entry.metadata.stars}</p>
                    ) : null}
                  </div>
                </a>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {entry.externalUrl ? (
                <Link href={entry.externalUrl} className="btn-lime">
                  {entry.type === "REPO" ? "Open repo →" : entry.type === "VIDEO" ? "Watch video →" : "Run on Nebius →"}
                </Link>
              ) : null}
              <Link href="/ide" className="btn-outline">
                Open a workspace
              </Link>
              {entry.externalUrl ? (
                <a href={entry.externalUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                  Open in new tab ↗
                </a>
              ) : null}
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold tracking-tight">About this entry</h2>
              <p className="mt-3 whitespace-pre-line text-ink-700 dark:text-ink-200">{rich?.description ?? entry.blurb}</p>
            </div>

            {rich?.chapters?.length ? (
              <div className="mt-10">
                <h2 className="text-xl font-bold tracking-tight">Chapters</h2>
                <ol className="mt-3 space-y-2 text-sm">
                  {rich.chapters.map((c) => (
                    <li key={c.startSec} className="flex items-start gap-3">
                      <span className="kbd">{secsToTimestamp(c.startSec)}</span>
                      <span className="text-ink-700 dark:text-ink-200">{c.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            <div className="mt-10">
              <h2 className="text-xl font-bold tracking-tight">Recommended next</h2>
              <ul className="mt-3 grid gap-2 text-sm text-ink-700 dark:text-ink-200">
                <li>
                  <Link className="underline-offset-4 hover:underline" href="/library">
                    More library entries →
                  </Link>
                </li>
                <li>
                  <Link className="underline-offset-4 hover:underline" href="/events">
                    Upcoming live events →
                  </Link>
                </li>
                <li>
                  <Link className="underline-offset-4 hover:underline" href="/team">
                    Talk to the team →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">Details</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <Field label="Type" value={typeLabel[entry.type]} />
                <Field label="Level" value={formatLevel(entry.level)} />
                {entry.durationMin ? <Field label="Duration" value={`${entry.durationMin} min`} /> : null}
                <Field label="Product" value={formatProductFocus(entry.productFocus)} />
                <Field
                  label="Source"
                  value={entry.isOfficial ? "Nebius DevRel" : `@${entry.submitterHandle ?? "community"}`}
                />
                {entry.metadata?.primaryLanguage ? (
                  <Field label="Language" value={entry.metadata.primaryLanguage} />
                ) : null}
              </dl>
            </div>
            <div className="card bg-navy-700 text-white">
              <p className="text-sm font-semibold">Run it on Nebius.</p>
              <p className="mt-2 text-sm text-ink-100">
                Spin a Contree workspace preloaded for this lesson. Token Factory key included.
              </p>
              <Link href="/ide" className="btn-lime mt-4 w-full">
                Open workspace
              </Link>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink-500 dark:text-ink-400">{label}</dt>
      <dd className="text-right text-ink-900 dark:text-ink-50">{value}</dd>
    </div>
  );
}
