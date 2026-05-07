import Link from "next/link";
import { Section, SectionHeader } from "@/components/section";

type Card = {
  title: string;
  blurb: string;
  cta: string;
  href: string;
};

const cards: Card[] = [
  {
    title: "Discord",
    blurb:
      "Ask questions, share what you're building, and get help from other Nebius builders and the team.",
    cta: "Join Discord →",
    href: "https://discord.gg/CncTn9zVzS",
  },
  {
    title: "Hackathons & Events",
    blurb:
      "Hands-on sessions for inference, training, and real workloads. Bring a laptop, ship something real.",
    cta: "See upcoming events →",
    href: "/events",
  },
  {
    title: "Builder Hours",
    blurb:
      "Regular office hours with Nebius engineers and Dev Advocates. Debug, tune performance, and get unblocked fast.",
    cta: "View schedule →",
    href: "/advocates",
  },
  {
    title: "GitHub",
    blurb:
      "Examples, templates, and reference architectures to copy-paste into your stack.",
    cta: "Go to repos →",
    href: "https://github.com/nebius",
  },
  {
    title: "YouTube",
    blurb: "Walkthroughs, demos, and technical deep dives from the Nebius team.",
    cta: "See videos →",
    href: "https://www.youtube.com/@nebiusofficial/videos",
  },
  {
    title: "The Library",
    blurb:
      "Workshops, videos, and example repos curated by Nebius DevRel and the community. Hands-on, ready to run.",
    cta: "Browse library →",
    href: "/library",
  },
];

export function Community() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Community"
        title="Join the community"
        body="Get help, share what you're building, and connect with other Nebius builders."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const isExternal = c.href.startsWith("http");
          const Outer: any = isExternal ? "a" : Link;
          const outerProps: any = isExternal
            ? { href: c.href, target: "_blank", rel: "noreferrer" }
            : { href: c.href };
          return (
            <Outer
              key={c.title}
              {...outerProps}
              className="group flex h-full flex-col gap-3 rounded-card border border-ink-200 bg-white p-6 transition-all hover:border-ink-300 hover:shadow-soft"
            >
              <h3 className="text-lg font-semibold text-ink-900 group-hover:text-navy-700">
                {c.title}
              </h3>
              <p className="flex-1 text-sm text-ink-600">{c.blurb}</p>
              <p className="border-t border-ink-200 pt-3 text-xs font-semibold text-navy-700 group-hover:underline">
                {c.cta.replace("→", isExternal ? "↗" : "→")}
              </p>
            </Outer>
          );
        })}
      </div>
    </Section>
  );
}
