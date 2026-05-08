import Link from "next/link";
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
    primaryHref: "/ai-cloud",
    primaryLabel: "Start building",
    secondaryHref: "https://docs.nebius.com/",
    secondaryLabel: "How-tos",
  },
  {
    name: "Token Factory",
    blurb:
      "Serve open-source models via an OpenAI-compatible API with real-time and batch inference, dedicated endpoints, and production SLAs.",
    primaryHref: "/token-factory",
    primaryLabel: "Start building",
    secondaryHref: "https://docs.tokenfactory.nebius.com/quickstart",
    secondaryLabel: "How-tos",
    highlight: true,
  },
  {
    name: "Serverless",
    blurb:
      "Build and deploy serverless AI jobs and endpoints from your container in minutes — no Kubernetes, no infrastructure.",
    primaryHref: "/serverless",
    primaryLabel: "Start building",
    secondaryHref: "https://docs.nebius.com/",
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
              "flex h-full flex-col gap-3 rounded-card border bg-white dark:bg-ink-900 p-6 transition-colors hover:border-ink-300",
              p.highlight ? "border-navy-700 ring-2 ring-lime/40" : "border-ink-200 dark:border-ink-700",
            )}
          >
            <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{p.name}</h3>
            <p className="flex-1 text-sm text-ink-600 dark:text-ink-300">{p.blurb}</p>
            <div className="flex flex-wrap gap-3 border-t border-ink-200 dark:border-ink-700 pt-4 text-xs">
              <ProductLinkLabel href={p.primaryHref} className="font-semibold text-navy-700 dark:text-lime underline-offset-4 hover:underline">
                {p.primaryLabel}
              </ProductLinkLabel>
              <ProductLinkLabel href={p.secondaryHref} className="text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-ink-50">
                {p.secondaryLabel}
              </ProductLinkLabel>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ProductLinkLabel({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children} ↗
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children} →
    </Link>
  );
}
