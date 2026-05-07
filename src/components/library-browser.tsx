"use client";

import { useMemo, useState } from "react";
import { LibraryCard } from "@/components/library-card";
import { library } from "@/lib/library";
import { cn } from "@/lib/utils";

const TYPES = ["ALL", "WORKSHOP", "VIDEO", "REPO"] as const;
const LEVELS = ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
const PRODUCTS = ["ALL", "tokenfactory", "aicloud", "soperator", "openclaw"];

type TypeKey = (typeof TYPES)[number];
type LevelKey = (typeof LEVELS)[number];

const productLabels: Record<string, string> = {
  ALL: "All",
  tokenfactory: "Token Factory",
  aicloud: "AI Cloud",
  soperator: "Soperator",
  openclaw: "OpenClaw",
};

export function LibraryBrowser({ initialType = "ALL" as TypeKey }: { initialType?: TypeKey }) {
  const [type, setType] = useState<TypeKey>(initialType);
  const [level, setLevel] = useState<LevelKey>("ALL");
  const [product, setProduct] = useState<string>("ALL");

  const filtered = useMemo(
    () =>
      library.filter(
        (e) =>
          (type === "ALL" || e.type === type) &&
          (level === "ALL" || e.level === level) &&
          (product === "ALL" || e.productFocus.includes(product)),
      ),
    [type, level, product],
  );

  return (
    <>
      <div className="flex flex-wrap gap-x-8 gap-y-5 border-b border-ink-200 bg-white px-1 pb-6">
        <FilterGroup
          label="Type"
          options={TYPES as readonly string[]}
          value={type}
          onChange={(v) => setType(v as TypeKey)}
          formatLabel={(o) => (o === "ALL" ? "All" : o.charAt(0) + o.slice(1).toLowerCase())}
        />
        <FilterGroup
          label="Level"
          options={LEVELS as readonly string[]}
          value={level}
          onChange={(v) => setLevel(v as LevelKey)}
          formatLabel={(o) => (o === "ALL" ? "All" : o.charAt(0) + o.slice(1).toLowerCase())}
        />
        <FilterGroup
          label="Product"
          options={PRODUCTS}
          value={product}
          onChange={setProduct}
          formatLabel={(o) => productLabels[o] ?? o}
        />
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink-500">
        Showing {filtered.length} of {library.length}
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((entry) => (
          <LibraryCard key={entry.slug} entry={entry} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 text-center text-ink-500">No entries match these filters.</div>
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
