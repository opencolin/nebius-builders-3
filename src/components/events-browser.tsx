"use client";

import { useMemo, useState } from "react";
import { BuilderEventCard } from "@/components/builder-event-card";
import type { BuilderEvent } from "@/lib/builder-events";
import { cn } from "@/lib/utils";

const FORMATS = ["ALL", "WORKSHOP", "TALK", "HACKATHON", "OFFICE_HOURS", "DEMO_NIGHT", "OTHER"] as const;
const SOURCES = ["ALL", "Builder-hosted", "Nebius official"] as const;

const FORMAT_LABELS: Record<string, string> = {
  ALL: "All",
  WORKSHOP: "Workshop",
  TALK: "Talk",
  HACKATHON: "Hackathon",
  OFFICE_HOURS: "Office hours",
  DEMO_NIGHT: "Demo night",
  OTHER: "Other",
};

export function EventsBrowser({ upcoming, past }: { upcoming: BuilderEvent[]; past: BuilderEvent[] }) {
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("ALL");
  const [source, setSource] = useState<(typeof SOURCES)[number]>("ALL");
  const [city, setCity] = useState<string>("ALL");

  const cities = useMemo(() => {
    const set = new Set(upcoming.concat(past).map((e) => e.city));
    return ["ALL", ...Array.from(set).sort()];
  }, [upcoming, past]);

  const matches = (e: BuilderEvent) =>
    (format === "ALL" || e.format === format) &&
    (source === "ALL" ||
      (source === "Builder-hosted" && !e.isOfficial) ||
      (source === "Nebius official" && e.isOfficial)) &&
    (city === "ALL" || e.city === city);

  const filteredUpcoming = upcoming.filter(matches);
  const filteredPast = past.filter(matches);

  return (
    <>
      <div className="flex flex-wrap gap-x-8 gap-y-5 border-b border-ink-200 pb-6">
        <FilterGroup
          label="Format"
          value={format}
          onChange={(v) => setFormat(v as any)}
          options={FORMATS as readonly string[]}
          formatLabel={(o) => FORMAT_LABELS[o] ?? o}
        />
        <FilterGroup
          label="Source"
          value={source}
          onChange={(v) => setSource(v as any)}
          options={SOURCES as readonly string[]}
          formatLabel={(o) => o}
        />
        <FilterGroup
          label="City"
          value={city}
          onChange={setCity}
          options={cities}
          formatLabel={(o) => (o === "ALL" ? "All" : o)}
        />
      </div>

      <div className="mt-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="h-display text-2xl font-bold tracking-tight">Upcoming</h2>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">
            {filteredUpcoming.length} event{filteredUpcoming.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUpcoming.map((e) => (
            <BuilderEventCard key={e.id} event={e} />
          ))}
        </div>
        {filteredUpcoming.length === 0 ? (
          <div className="rounded-card border border-dashed border-ink-200 bg-white py-12 text-center text-ink-500">
            No upcoming events match these filters.
          </div>
        ) : null}
      </div>

      {filteredPast.length ? (
        <div className="mt-16">
          <h2 className="mb-6 h-display text-2xl font-bold tracking-tight">Past</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPast.map((e) => (
              <BuilderEventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
  formatLabel,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  formatLabel: (option: string) => string;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
              opt === value
                ? "border-navy-700 bg-navy-700 text-white"
                : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:text-ink-900",
            )}
          >
            {formatLabel(opt)}
          </button>
        ))}
      </div>
    </div>
  );
}
