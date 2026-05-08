import { partners } from "@/lib/data";
import { Section, SectionHeader } from "@/components/section";

export function PartnerWall() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Partners"
        title="Where the SDKs meet the builders."
        body="Sponsors load their integrations into the workspace. Builders pick what fits. Telemetry tells the rest."
        align="center"
      />
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-ink-200 dark:border-ink-700 bg-ink-200 sm:grid-cols-3 lg:grid-cols-6">
        {partners.map((p) => (
          <div key={p.name} className="flex h-20 items-center justify-center bg-white dark:bg-ink-900 px-4 text-center text-sm font-medium text-ink-700 dark:text-ink-200">
            {p.name}
            {p.tag === "host" ? <span className="ml-2 pill-lime">Host</span> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
