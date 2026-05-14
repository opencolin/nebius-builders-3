"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { projects, projectEvents, projectTechs } from "@/lib/projects";
import { cn } from "@/lib/utils";

const PRODUCTS = ["ALL", "tokenfactory", "aicloud", "soperator", "openclaw", "tavily", "other"];
const productLabels: Record<string, string> = {
  ALL: "All",
  tokenfactory: "Token Factory",
  aicloud: "AI Cloud",
  soperator: "Soperator",
  openclaw: "OpenClaw",
  tavily: "Tavily",
  other: "Other",
};

const AWARDS = ["ALL", "AWARDED"] as const;

export function ProjectsBrowser() {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState<string>("ALL");
  const [eventId, setEventId] = useState<string>("ALL");
  const [tech, setTech] = useState<string>("ALL");
  const [award, setAward] = useState<(typeof AWARDS)[number]>("ALL");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (product !== "ALL" && !p.productFocus.includes(product)) return false;
      if (eventId !== "ALL" && p.eventId !== eventId) return false;
      if (tech !== "ALL" && !p.technologies.includes(tech)) return false;
      if (award === "AWARDED" && !p.awards?.length) return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack = [
          p.title,
          p.lede,
          p.description,
          p.eventTitle ?? "",
          ...p.technologies,
          ...p.authors.map((a) => `${a.name} ${a.handle}`),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, product, eventId, tech, award]);

  return (
    <>
      <div className="flex flex-col gap-5 border-b border-ink-200 pb-6 dark:border-ink-800">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              Search
            </span>
            <input
              type="search"
              placeholder="title, builder, technology…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              Event
            </span>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="input"
            >
              <option value="ALL">All events</option>
              {projectEvents.map(([id, title]) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              Technology
            </span>
            <select value={tech} onChange={(e) => setTech(e.target.value)} className="input">
              <option value="ALL">All technologies</option>
              {projectTechs.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <FilterGroup
            label="Product"
            options={PRODUCTS}
            value={product}
            onChange={setProduct}
            formatLabel={(o) => productLabels[o] ?? o}
          />
          <FilterGroup
            label="Awards"
            options={AWARDS as readonly string[]}
            value={award}
            onChange={(v) => setAward(v as (typeof AWARDS)[number])}
            formatLabel={(o) => (o === "ALL" ? "All projects" : "Awarded only")}
          />
        </div>
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
        Showing {filtered.length} of {projects.length}
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 text-center text-ink-500 dark:text-ink-400">
          No projects match these filters.
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
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
              opt === value
                ? "border-navy-700 bg-navy-700 text-white dark:border-lime dark:bg-lime dark:text-navy-700"
                : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:text-ink-900 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:hover:border-ink-600 dark:hover:text-ink-50",
            )}
          >
            {formatLabel(opt)}
          </button>
        ))}
      </div>
    </div>
  );
}
