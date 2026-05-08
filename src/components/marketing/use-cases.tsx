import { Section, SectionHeader } from "@/components/section";

const cases = [
  {
    title: "Inference",
    blurb:
      "Serve open models in production with a simple API, real-time or batch inference, dedicated endpoints, and autoscaling for traffic spikes.",
    href: "https://docs.tokenfactory.nebius.com/ai-models-inference/overview",
  },
  {
    title: "Training & Fine-tuning",
    blurb:
      "Train new models or fine-tune existing ones with scalable GPU jobs, track experiments, and push the best checkpoint into production.",
    href: "https://github.com/nebius/nebius-solutions-library/blob/main/k8s-training",
  },
  {
    title: "Industries AI Applications",
    blurb:
      "Build domain-specific workflows in healthcare, robotics, and more with secure data access, guardrails, and reusable patterns for RAG, copilots, and automation.",
    href: "https://docs.nebius.com/applications/standalone/nvidia-nim",
  },
];

export function UseCases() {
  return (
    <Section bg="tint">
      <SectionHeader
        eyebrow="Use cases"
        title="What can you build"
        body="A few examples to get you going. More in the docs and cookbooks."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {cases.map((c) => (
          <a
            key={c.title}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col gap-3 rounded-card border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 p-6 transition-all hover:border-ink-300 hover:shadow-soft"
          >
            <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50 group-hover:text-navy-700">
              {c.title}
            </h3>
            <p className="flex-1 text-sm text-ink-600 dark:text-ink-300">{c.blurb}</p>
            <p className="border-t border-ink-200 dark:border-ink-700 pt-3 text-xs font-semibold text-navy-700 dark:text-lime group-hover:underline">
              View guides ↗
            </p>
          </a>
        ))}
      </div>
    </Section>
  );
}
