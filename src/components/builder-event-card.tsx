import Link from "next/link";
import type { BuilderEvent } from "@/lib/builder-events";
import { eventFormatLabel } from "@/lib/builder-events";
import { formatProductFocus } from "@/lib/library";
import { formatDate, formatTime } from "@/lib/utils";

function StatePill({ event }: { event: BuilderEvent }) {
  const start = +new Date(event.startsAt);
  const end = +new Date(event.endsAt);
  const now = Date.now();
  if (event.status === "COMPLETED") return <span className="pill-ink">Completed</span>;
  if (now >= start && now <= end) {
    return (
      <span className="pill-lime">
        <span className="live-dot" /> Live now
      </span>
    );
  }
  if (event.dateRange) return <span className="pill-outline">{event.dateRange}</span>;
  const days = Math.round((start - now) / 86_400_000);
  if (days >= 1 && days <= 14) {
    return (
      <span className="pill-outline">
        In {days} day{days === 1 ? "" : "s"}
      </span>
    );
  }
  return <span className="pill-outline">{formatDate(event.startsAt)}</span>;
}

export function BuilderEventCard({ event }: { event: BuilderEvent }) {
  const cover = event.isOfficial
    ? "from-navy-800 via-navy-700 to-navy-500"
    : event.format === "HACKATHON"
    ? "from-lime-300 via-lime-400 to-navy-500"
    : event.format === "WORKSHOP"
    ? "from-navy-700 via-navy-600 to-lime"
    : event.format === "DEMO_NIGHT"
    ? "from-lime-200 via-lime-300 to-lime-400"
    : "from-ink-100 via-ink-200 to-lime/30";

  const href = event.officialUrl ?? event.lumaUrl ?? "/events";
  const isExternal = href.startsWith("http");
  const Outer = isExternal ? "a" : Link;
  const outerProps: any = isExternal
    ? { href, target: "_blank", rel: "noreferrer noopener" }
    : { href };

  return (
    <Outer
      {...outerProps}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-ink-200 bg-white transition-all hover:border-ink-300 hover:shadow-soft dark:border-ink-700 dark:bg-ink-900 dark:hover:border-ink-600"
    >
      <div className={`relative h-36 bg-gradient-to-br ${cover}`}>
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <StatePill event={event} />
          {event.isOfficial ? (
            <span className="pill bg-white dark:bg-ink-900/90 text-navy-700">Nebius official</span>
          ) : null}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="pill bg-white dark:bg-ink-900/90 text-navy-700">{event.city}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
          {eventFormatLabel(event.format)} · {formatDate(event.startsAt)}
          {event.dateRange ? "" : ` · ${formatTime(event.startsAt)}`}
        </p>
        <h3 className="mb-2 text-base font-semibold leading-snug text-ink-900 group-hover:text-navy-700 dark:text-ink-50 dark:group-hover:text-lime">
          {event.title}
        </h3>
        <p className="mb-4 line-clamp-3 text-sm text-ink-600 dark:text-ink-300">{event.description}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-ink-500 dark:text-ink-400">
          <span className="truncate pr-3">
            {event.isOnline ? "Online" : event.venueName}
          </span>
          <span className="pill-outline">{formatProductFocus(event.productFocus)}</span>
        </div>
        <p className="mt-3 text-xs text-ink-500 dark:text-ink-400">
          Hosted by <span className="font-medium text-ink-700 dark:text-ink-200">{event.builderName}</span>
        </p>
      </div>
    </Outer>
  );
}
