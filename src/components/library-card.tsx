import Link from "next/link";
import { type LibraryEntry, formatLevel, formatProductFocus } from "@/lib/library";

const typePill: Record<LibraryEntry["type"], string> = {
  WORKSHOP: "Workshop",
  VIDEO: "Video",
  REPO: "Repo",
};

export function LibraryCard({ entry, featured = false }: { entry: LibraryEntry; featured?: boolean }) {
  const cover = entry.type === "WORKSHOP"
    ? "from-navy-700 via-navy-600 to-lime"
    : entry.type === "VIDEO"
    ? "from-navy-800 via-navy-700 to-navy-500"
    : "from-ink-100 via-ink-50 to-lime/40";

  return (
    <Link
      href={`/library/${entry.slug}`}
      className={`group flex flex-col overflow-hidden rounded-card border border-ink-200 bg-white transition-all hover:border-ink-300 hover:shadow-soft dark:border-ink-700 dark:bg-ink-900 dark:hover:border-ink-600 ${featured ? "md:flex-row" : ""}`}
    >
      <div
        className={`relative aspect-video bg-gradient-to-br ${cover} ${featured ? "md:aspect-auto md:w-1/2" : ""}`}
      >
        <div className="absolute right-3 top-3 pill-navy">{typePill[entry.type]}</div>
        <div className="absolute bottom-3 left-3 pill-outline bg-white dark:bg-ink-900/95">
          {formatLevel(entry.level)}
          {entry.durationMin ? ` · ${entry.durationMin}m` : ""}
        </div>
        {entry.type === "VIDEO" || entry.type === "WORKSHOP" ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white dark:bg-ink-900/95 text-navy-700 shadow-soft transition group-hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-3xl font-bold text-white/90">
            { }
          </div>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-6 ${featured ? "md:p-8" : ""}`}>
        <p className="text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
          {entry.isOfficial ? "Nebius DevRel" : `@${entry.submitterHandle ?? "community"}`}
          {entry.metadata?.stars != null ? ` · ★${entry.metadata.stars}` : ""}
        </p>
        <h3 className={`mt-2 font-semibold leading-snug text-ink-900 group-hover:text-navy-700 dark:text-ink-50 dark:group-hover:text-lime ${featured ? "text-2xl" : "text-base"}`}>
          {entry.title}
        </h3>
        <p className={`mt-3 text-sm text-ink-600 dark:text-ink-300 ${featured ? "line-clamp-4" : "line-clamp-3"}`}>
          {entry.blurb}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-500 dark:text-ink-400">
          <span className="pill-outline">{formatProductFocus(entry.productFocus)}</span>
          {entry.metadata?.primaryLanguage ? (
            <span className="pill-outline">{entry.metadata.primaryLanguage}</span>
          ) : null}
        </div>
        {featured ? (
          <div className="mt-6 flex items-center gap-3">
            <span className="btn-lime pointer-events-none">
              {entry.type === "REPO" ? "Open repo →" : entry.type === "VIDEO" ? "Watch video →" : "Open workshop →"}
            </span>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
