import Link from "next/link";
import { BuilderEventCard } from "@/components/builder-event-card";
import { Section, SectionHeader } from "@/components/section";
import { publishedBuilderEvents } from "@/lib/builder-events";

export function ActiveEvents() {
  const next = publishedBuilderEvents().slice(0, 3);
  return (
    <Section bg="tint">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeader
          eyebrow="Next up"
          title="Upcoming Nebius builder events"
          body="Builder-hosted meetups and the Nebius official tour. Token Factory keys load on the day."
        />
        <Link href="/events" className="btn-outline">
          See all on the map →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {next.map((e) => (
          <BuilderEventCard key={e.id} event={e} />
        ))}
      </div>
    </Section>
  );
}
