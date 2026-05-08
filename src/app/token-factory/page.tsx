import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  ProductCTA,
  ProductGrid,
  ProductHero,
} from "@/components/product-page";

export const metadata = {
  title: "Token Factory — Nebius Builders",
  description:
    "Open-source models on an OpenAI-compatible API, with dedicated endpoints, batch inference, and post-training paths to production.",
};

export default function TokenFactoryPage() {
  return (
    <>
      <TopNav />
      <main>
        <ProductHero
          eyebrow="Product · Token Factory"
          title={
            <>
              Inference for open models, OpenAI-compatible.
            </>
          }
          body="Hit the same /v1/chat/completions endpoint your app already speaks. Use shared inference for prototyping, dedicated endpoints when traffic gets serious, and post-train your own checkpoint when you need it."
          primary={{ label: "Quickstart", href: "https://docs.tokenfactory.nebius.com/quickstart", external: true }}
          secondary={{ label: "Read the docs", href: "https://docs.tokenfactory.nebius.com/", external: true }}
          bullets={[
            "OpenAI-compatible /v1 API",
            "Dedicated endpoints + autoscaling",
            "Batch inference for offline jobs",
          ]}
        />

        <ProductGrid
          eyebrow="Get oriented"
          title="Four ways into Token Factory"
          body="Start where you're comfortable: docs, API reference, an interactive playground, or migrating off another provider."
          cols={4}
          cards={[
            {
              title: "Start building",
              body: "Sign up, grab a key, and ship your first request. The quickstart walks through model selection and pricing.",
              links: [
                { label: "Quickstart", href: "https://docs.tokenfactory.nebius.com/quickstart" },
                { label: "API reference", href: "https://docs.tokenfactory.nebius.com/api-reference" },
              ],
            },
            {
              title: "Optimize for production",
              body: "Dedicated endpoints, cache-aware routing, and batch inference for the workloads where shared rate limits get in the way.",
              links: [
                { label: "Dedicated endpoints", href: "https://docs.tokenfactory.nebius.com/" },
                { label: "Batch inference", href: "https://docs.tokenfactory.nebius.com/" },
              ],
            },
            {
              title: "Customize the model",
              body: "Bring your own fine-tune via post-training jobs, or upload a custom adapter and serve it behind the same API.",
              links: [
                { label: "Post-training docs", href: "https://docs.tokenfactory.nebius.com/" },
                { label: "Cookbook", href: "https://github.com/nebius/token-factory-cookbook" },
              ],
            },
            {
              title: "Integrate with your stack",
              body: "Drop-in for OpenAI clients, plus first-party support for LiteLLM, Aisuite, LangChain, LlamaIndex, Agno, Crew AI, and Pydantic-AI.",
              links: [
                { label: "Integrations", href: "https://docs.tokenfactory.nebius.com/" },
                { label: "OpenClaw plugin", href: "https://github.com/opencolin/openclaw-nebius-plugin" },
              ],
              highlight: true,
            },
          ]}
        />

        <section className="border-y border-ink-200 bg-ink-50 dark:border-ink-800 dark:bg-ink-800">
          <div className="container-page py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Drop-in compatibility
            </p>
            <h2 className="h-display mt-3 max-w-2xl text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50 md:text-4xl">
              Same client, new base URL.
            </h2>
            <p className="mt-4 max-w-2xl text-ink-600 dark:text-ink-300">
              Most apps switch to Token Factory by changing one line. Your existing OpenAI SDK, prompt
              format, streaming logic, and tool-call schemas keep working.
            </p>
            <pre className="mt-8 overflow-x-auto rounded-card border border-ink-200 bg-navy-700 p-6 text-sm text-ink-50 dark:border-ink-700">
              <code>{`from openai import OpenAI

client = OpenAI(
    base_url="https://api.studio.nebius.com/v1/",
    api_key=os.environ["NEBIUS_API_KEY"],
)

res = client.chat.completions.create(
    model="meta-llama/Meta-Llama-3.1-70B-Instruct",
    messages=[{"role": "user", "content": "What's a good first agent to build?"}],
)
print(res.choices[0].message.content)`}</code>
            </pre>
          </div>
        </section>

        <ProductGrid
          eyebrow="Watch the team build"
          title="Playlists from Nebius DevRel"
          body="Walkthroughs, deep dives, and pattern videos for production inference."
          cols={2}
          cards={[
            {
              title: "Token Factory channel",
              body: "Welcome video, model spotlights, and feature releases — short, narrated, source-code linked.",
              links: [
                { label: "Watch", href: "https://www.youtube.com/@nebiusofficial/videos" },
              ],
            },
            {
              title: "Builders showcase",
              body: "Community projects shipped on Token Factory — what they built, what tripped them up, what they kept.",
              links: [
                { label: "Watch", href: "/projects" },
                { label: "Get in", href: "/signup" },
              ],
            },
          ]}
        />

        <ProductGrid
          bg="tint"
          eyebrow="Engineering reading"
          title="Production inference, written down"
          body="Patterns from the Nebius blog and the wider builder community."
          cards={[
            {
              title: "Architecting production inference",
              body: "What the request path actually looks like under load — caches, batching, pre-warm, fallback.",
              links: [{ label: "Read", href: "https://nebius.com/blog?tags=builder-updates" }],
            },
            {
              title: "Designing chat applications",
              body: "Conversation state, streaming, retry semantics, abandonment, cost ceilings — the unsexy half of chat UX.",
              links: [{ label: "Read", href: "https://nebius.com/blog?tags=builder-updates" }],
            },
            {
              title: "Routing across LLMs",
              body: "Pick a model per request, not per app. Cost-aware routing patterns, and where they break.",
              links: [{ label: "Read", href: "https://nebius.com/blog?tags=builder-updates" }],
            },
          ]}
        />

        <ProductCTA
          title="Ship your first Token Factory request."
          body="Free tier to start, dedicated endpoints when you grow, and a real human on the team if you get stuck."
          primary={{ label: "Sign up", href: "/signup" }}
          secondary={{ label: "Open the docs", href: "https://docs.tokenfactory.nebius.com/", external: true }}
        />
      </main>
      <Footer />
    </>
  );
}
