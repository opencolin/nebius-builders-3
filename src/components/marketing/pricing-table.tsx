import Link from "next/link";
import { plans } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/section";

export function PricingTable({ embed = false }: { embed?: boolean }) {
  const inner = (
    <>
      <SectionHeader
        eyebrow="Pricing"
        title="Built for one event a quarter, or one a week."
        body="All tiers include event creation, builder dashboards, and project view. IDE and deploy targets unlock at Pro."
        align="center"
      />
      <div className="grid gap-4 lg:grid-cols-5">
        {plans.map((p) => (
          <div
            key={p.name}
            className={cn(
              "flex flex-col rounded-card border p-6 transition-all",
              p.highlight
                ? "border-navy-700 bg-navy-700 text-white shadow-soft"
                : "border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900"
            )}
          >
            {p.highlight ? <span className="pill-lime mb-3 self-start">Most popular</span> : <span className="mb-3 h-[26px]" />}
            <h3 className={cn("text-lg font-semibold", p.highlight ? "text-white" : "text-ink-900")}>{p.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className={cn("text-3xl font-bold", p.highlight ? "text-white" : "text-ink-900")}>{p.price}</span>
              {p.cadence ? <span className={cn("text-sm", p.highlight ? "text-ink-100" : "text-ink-500")}>{p.cadence}</span> : null}
            </div>
            <p className={cn("mt-2 text-sm", p.highlight ? "text-ink-100" : "text-ink-600")}>{p.eventsPerMonth}</p>
            <p className={cn("mt-3 text-xs", p.highlight ? "text-ink-100/80" : "text-ink-500")}>{p.blurb}</p>
            <ul className={cn("mt-5 space-y-2 text-sm", p.highlight ? "text-white" : "text-ink-700")}>
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className={cn("mt-0.5", p.highlight ? "text-lime" : "text-lime-600")}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={p.cta.href}
              className={cn("mt-6 w-full text-center", p.highlight ? "btn-lime" : "btn-outline")}
            >
              {p.cta.label}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
  if (embed) return <div>{inner}</div>;
  return <Section bg="tint">{inner}</Section>;
}
