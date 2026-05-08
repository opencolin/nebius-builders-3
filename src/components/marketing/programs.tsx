import Link from "next/link";
import { Section, SectionHeader } from "@/components/section";
import { cn } from "@/lib/utils";

const programs = [
  {
    name: "Builders Network",
    blurb:
      "Run events, post tutorials, build with Nebius. Earn up to $2,600 of credits as you climb tiers. Get promoted to Contributor and Ambassador on points.",
    cta: "Learn more →",
    href: "/ambassadors",
    highlight: true,
  },
  {
    name: "Startup Program",
    blurb: "Credits, guidance, and infrastructure support for teams building on Nebius.",
    cta: "More →",
    href: "https://nebius.com/startups/",
  },
  {
    name: "AI for Tech Academy",
    blurb: "Short courses for individuals and teams adopting AI.",
    cta: "More →",
    href: "https://academy.nebius.com/",
  },
];

export function Programs() {
  return (
    <Section bg="tint">
      <SectionHeader
        eyebrow="Programs for builders"
        title="Three ways to get more from Nebius"
        body="Credits, infrastructure support, and standing in the community."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {programs.map((p) => {
          const isExternal = p.href.startsWith("http");
          const Outer: any = isExternal ? "a" : Link;
          const outerProps: any = isExternal
            ? { href: p.href, target: "_blank", rel: "noreferrer" }
            : { href: p.href };
          return (
            <Outer
              key={p.name}
              {...outerProps}
              className={cn(
                "group flex h-full flex-col gap-3 rounded-card border bg-white dark:bg-ink-900 p-6 transition-all hover:shadow-soft",
                p.highlight ? "border-navy-700 ring-2 ring-lime/40" : "border-ink-200 dark:border-ink-700 hover:border-ink-300",
              )}
            >
              <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50 group-hover:text-navy-700 dark:group-hover:text-lime">
                {p.name}
              </h3>
              <p className="flex-1 text-sm text-ink-600 dark:text-ink-300">{p.blurb}</p>
              <p className="border-t border-ink-200 dark:border-ink-700 pt-3 text-xs font-semibold text-navy-700 dark:text-lime group-hover:underline">
                {p.cta.replace("→", isExternal ? "↗" : "→")}
              </p>
            </Outer>
          );
        })}
      </div>
    </Section>
  );
}
