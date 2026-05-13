"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { EventsBrowser } from "@/components/events-browser";
import type { BuilderEvent } from "@/lib/builder-events";
import { cn } from "@/lib/utils";

// Leaflet renders only in the browser — pull the map in client-side.
const EventsMap = dynamic(() => import("@/components/events-map").then((m) => m.EventsMap), {
  ssr: false,
  loading: () => (
    <div className="h-[460px] w-full rounded-card border border-dashed border-ink-200 bg-ink-50 dark:border-ink-700 dark:bg-ink-800" />
  ),
});

type SourceStatus = {
  ok: boolean;
  count: number;
  error?: string;
  url: string;
};

type RefreshPayload = {
  fetchedAt: string;
  events: BuilderEvent[];
  sources: {
    luma: SourceStatus;
    nebius: SourceStatus;
  };
};

type Status = "idle" | "refreshing" | "done" | "error";

function relativeTime(iso: string | null): string {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 0) return "just now";
  const secs = Math.round(diff / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export function EventsView({
  initialUpcoming,
  initialPast,
  initialFetchedAt,
}: {
  initialUpcoming: BuilderEvent[];
  initialPast: BuilderEvent[];
  initialFetchedAt: string | null;
}) {
  const [upcoming, setUpcoming] = useState<BuilderEvent[]>(initialUpcoming);
  const [past] = useState<BuilderEvent[]>(initialPast);
  const [fetchedAt, setFetchedAt] = useState<string | null>(initialFetchedAt);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [sources, setSources] = useState<RefreshPayload["sources"] | null>(null);

  const mappable = useMemo(
    () => upcoming.filter((e) => !e.isOnline && (e.lat !== 0 || e.lng !== 0)),
    [upcoming],
  );

  async function refresh() {
    setStatus("refreshing");
    setError(null);
    try {
      const res = await fetch("/api/events/refresh", { method: "POST" });
      const data = (await res.json()) as RefreshPayload | { error: string };
      if (!res.ok || "error" in data) {
        const msg = "error" in data ? data.error : `HTTP ${res.status}`;
        setError(msg);
        setStatus("error");
        return;
      }
      if (!data.events?.length) {
        setError("Sources returned no events — keeping current list.");
        setSources(data.sources);
        setStatus("error");
        return;
      }
      setUpcoming(data.events);
      setFetchedAt(data.fetchedAt);
      setSources(data.sources);
      setStatus("done");
    } catch (err: any) {
      setError(err?.message ?? "Network error");
      setStatus("error");
    }
  }

  return (
    <section className="section bg-ink-50 dark:bg-ink-800">
      <div className="container-page">
        <div className="mb-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                Map
              </p>
              <h2 className="mt-1 h-display text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
                Where builders are showing up
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-ink-500 dark:text-ink-400">
              <span>
                {mappable.length} events shown · online and global tours excluded
              </span>
            </div>
          </div>

          {/* Refresh strip */}
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-card border border-ink-200 bg-white px-4 py-3 text-sm dark:border-ink-700 dark:bg-ink-900">
            <button
              type="button"
              onClick={refresh}
              disabled={status === "refreshing"}
              className={cn(
                "inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                "border-navy-700 bg-navy-700 text-white hover:bg-navy-600 dark:border-lime dark:bg-lime dark:text-navy-700 dark:hover:bg-lime-300",
              )}
              aria-label="Refresh events from luma.com/NebiusAI and nebius.com/events"
            >
              <span
                className={cn(
                  "inline-block transition-transform",
                  status === "refreshing" && "animate-spin",
                )}
                aria-hidden
              >
                ↻
              </span>
              {status === "refreshing" ? "Refreshing…" : "Refresh"}
            </button>
            <span className="text-xs text-ink-500 dark:text-ink-400">
              Last updated <strong className="text-ink-900 dark:text-ink-50">{relativeTime(fetchedAt)}</strong>
            </span>
            {status === "done" && sources ? (
              <span className="ml-auto flex flex-wrap items-center gap-2 text-xs">
                <SourceBadge label="Luma" status={sources.luma} />
                <SourceBadge label="Nebius" status={sources.nebius} />
              </span>
            ) : null}
            {status === "error" && error ? (
              <span
                role="alert"
                className="ml-auto rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300"
              >
                {error}
              </span>
            ) : null}
          </div>

          <EventsMap events={mappable} />
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500 dark:text-ink-400">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-lime bg-navy-700" />
              Builder-hosted
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-navy-700 bg-lime" />
              Nebius official
            </span>
            <span>· click a dot for details</span>
          </p>
        </div>

        <EventsBrowser upcoming={upcoming} past={past} />

        <p className="mt-12 text-sm text-ink-500 dark:text-ink-400">
          Hosting an event?{" "}
          <Link
            className="font-medium text-navy-700 underline-offset-4 hover:underline dark:text-lime"
            href="/companies/login"
          >
            Apply to host →
          </Link>
        </p>
      </div>
    </section>
  );
}

function SourceBadge({ label, status }: { label: string; status: SourceStatus }) {
  if (status.ok) {
    return (
      <span className="inline-flex items-center gap-1 rounded-pill border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {label} · {status.count}
      </span>
    );
  }
  return (
    <span
      title={status.error}
      className="inline-flex items-center gap-1 rounded-pill border border-red-300 bg-red-50 px-2 py-0.5 text-red-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
      {label} · failed
    </span>
  );
}
