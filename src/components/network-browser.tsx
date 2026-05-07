"use client";

import { useMemo, useState } from "react";
import { Avatar } from "@/components/avatar";
import { type BuilderProfile, formatNumber, sortedBuilders, tierLabel } from "@/lib/network";
import { cn } from "@/lib/utils";

const TIERS = ["ALL", "AMBASSADOR", "CONTRIBUTOR", "BUILDER"] as const;

export function NetworkBrowser() {
  const [tier, setTier] = useState<(typeof TIERS)[number]>("ALL");
  const [search, setSearch] = useState("");

  const filtered = useMemo<BuilderProfile[]>(() => {
    return sortedBuilders().filter((b) => {
      const tierMatch = tier === "ALL" || b.tier === tier;
      if (!search) return tierMatch;
      const q = search.toLowerCase();
      const searchMatch =
        b.handle.toLowerCase().includes(q) ||
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.expertise.some((e) => e.toLowerCase().includes(q));
      return tierMatch && searchMatch;
    });
  }, [tier, search]);

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-ink-200 pb-6 md:flex-row md:items-end">
        <div className="flex-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-500">Search</p>
          <input
            type="text"
            placeholder="handle, name, city, expertise…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-500">Tier</p>
          <div className="flex flex-wrap gap-2">
            {TIERS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTier(t)}
                className={cn(
                  "rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
                  t === tier
                    ? "border-navy-700 bg-navy-700 text-white"
                    : "border-ink-200 bg-white text-ink-700 hover:border-ink-300",
                )}
              >
                {t === "ALL" ? "All" : t.charAt(0) + t.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink-500">
        Showing {filtered.length} of {sortedBuilders().length}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => (
          <div key={b.id} className="card flex h-full flex-col gap-3">
            <div className="flex items-start gap-3">
              <Avatar name={b.name} handle={b.githubHandle} size={56} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">@{b.handle}</p>
                <p className="truncate text-sm text-ink-600">{b.name}</p>
                <p className="mt-1 text-xs text-ink-500">
                  {b.city}, {b.country}
                </p>
              </div>
              <span className="pill-outline text-[10px]">{tierLabel(b.tier)}</span>
            </div>
            <p className="text-sm text-ink-600 line-clamp-3">{b.bio}</p>
            <div className="flex flex-wrap gap-1.5">
              {b.expertise.slice(0, 4).map((e) => (
                <span key={e} className="pill-outline">
                  {e}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-ink-200 pt-3 text-xs text-ink-500">
              <span className="font-semibold text-navy-700">{formatNumber(b.pointsTotal)} pts</span>
              {b.githubHandle ? (
                <a
                  href={`https://github.com/${b.githubHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-navy-700 underline-offset-4 hover:underline"
                >
                  github ↗
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 text-center text-ink-500">No builders match. Try a different filter.</div>
      ) : null}
    </>
  );
}
