import { workshops } from "@/lib/data";
import { WorkshopCard } from "@/components/workshop-card";
import { Section, SectionHeader } from "@/components/section";
import Link from "next/link";

export function WorkshopSpotlight() {
  const [featured, ...rest] = workshops;
  return (
    <Section bg="tint">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeader
          eyebrow="Workshops"
          title="Watch what shipped, run it yourself."
          body="Every workshop links to a Contree-ready workspace so you can replay the demo and keep building."
        />
        <Link href="/workshops" className="btn-outline">All workshops →</Link>
      </div>
      <WorkshopCard workshop={featured} featured />
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map((w) => (
          <WorkshopCard key={w.slug} workshop={w} />
        ))}
      </div>
    </Section>
  );
}
