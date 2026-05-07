import { Section, SectionHeader } from "@/components/section";
import { cn } from "@/lib/utils";

type Product = {
  name: string;
  blurb: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  highlight?: boolean;
};

const products: Product[] = [
  {
    name: "AI Cloud",
    blurb:
      "Spin up GPU VMs and multi-node clusters for training and custom stacks, with full control.",
    primaryHref: "https://nebius.com/services/ai-cloud",
    primaryLabel: "Start building",
    secondaryHref: "https://docs.nebius.com/cloud",
    secondaryLabel: "How-tos",
  },
  {
    name: "Token Factory",
    blurb:
      "Serve open-source models via an OpenAI-compatible API with real-time and batch inference, dedicated endpoints, and production SLAs.",
    primaryHref: "https://nebius.com/services/token-factory",
    primaryLabel: "Start building",
    secondaryHref: "https://docs.nebius.com/token-factory",
    secondaryLabel: "How-tos",
    highlight: true,
  },
  {
    name: "Serverless",
    blurb:
      "Build and deploy serverless AI jobs and endpoints from your container in minutes — no Kubernetes, no infrastructure.",
    primaryHref: "https://nebius.com/services/serverless",
    primaryLabel: "Start building",
    secondaryHref: "https://docs.nebius.com/serverless",
    secondaryLabel: "How-tos",
  },
  {
    name: "Tavily",
    blurb: "Real-time web search and content extraction for LLMs and agents via API and SDKs.",
    primaryHref: "https://tavily.com",
    primaryLabel: "Start building",
    secondaryHref: "https://docs.tavily.com",
    secondaryLabel: "How-tos",
  },
];

export function Products() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Products"
        title="Choose a starting point for your work"
        body="Four products. Pick the one that fits how you want to build."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.name}
            className={cn(
              "flex h-full flex-col gap-3 rounded-card border bg-white p-6 transition-colors hover:border-ink-300",
              p.highlight ? "border-navy-700 ring-2 ring-lime/40" : "border-ink-200",
            )}
          >
            <h3 className="text-lg font-semibold text-ink-900">{p.name}</h3>
            <p className="flex-1 text-sm text-ink-600">{p.blurb}</p>
            <div className="flex flex-wrap gap-3 border-t border-ink-200 pt-4 text-xs">
              <a
                href={p.primaryHref}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-navy-700 underline-offset-4 hover:underline"
              >
                {p.primaryLabel} ↗
              </a>
              <a
                href={p.secondaryHref}
                target="_blank"
                rel="noreferrer"
                className="text-ink-600 hover:text-ink-900"
              >
                {p.secondaryLabel} ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
