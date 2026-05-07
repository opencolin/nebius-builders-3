import Link from "next/link";
import { LibraryCard } from "@/components/library-card";
import { Section, SectionHeader } from "@/components/section";
import { library } from "@/lib/library";

export function WorkshopSpotlight() {
  const featured =
    library.find((l) => l.slug === "running-openclaw-on-nebius") ?? library[0];
  const rest = library
    .filter((l) => l.slug !== featured.slug && l.type === "WORKSHOP")
    .slice(0, 2);

  return (
    <Section>
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeader
          eyebrow="Library"
          title="Watch what shipped, run it yourself."
          body="Workshops, videos, and example repos curated by Nebius DevRel and the community."
        />
        <Link href="/library" className="btn-outline">
          Browse the full library →
        </Link>
      </div>
      <LibraryCard entry={featured} featured />
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map((w) => (
          <LibraryCard key={w.slug} entry={w} />
        ))}
      </div>
    </Section>
  );
}
