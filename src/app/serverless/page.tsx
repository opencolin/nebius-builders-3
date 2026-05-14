import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  ProductCTA,
  ProductGrid,
  ProductHero,
} from "@/components/product-page";
import { Section, SectionHeader } from "@/components/section";

export const metadata = {
  title: "Serverless — Nebius Builders",
  description:
    "Run containerized AI on Nebius GPUs without operating infrastructure. Jobs for batch work, Endpoints for live services — both autoscale to zero.",
};

export default function ServerlessPage() {
  return (
    <>
      <TopNav />
      <main>
        <ProductHero
          eyebrow="Product · Serverless"
          title={<>GPU-backed containers, no Kubernetes to babysit.</>}
          body="Two execution shapes: Jobs for batch work that runs and exits, Endpoints for long-lived inference services. Provision on submit, scale to zero on idle, pay for the seconds you use."
          primary={{ label: "Open the docs", href: "https://docs.nebius.com", external: true }}
          secondary={{ label: "Cookbook examples", href: "https://github.com/nebius/ml-cookbook", external: true }}
          bullets={[
            "Jobs · run-to-completion batch",
            "Endpoints · always-on inference",
            "Autoscale to zero between bursts",
          ]}
        />

        <Section bg="tint">
          <SectionHeader
            eyebrow="Get to know Serverless"
            title="One platform, two shapes."
            body="Pick Jobs when the work has a defined end (training a checkpoint, scoring a dataset, encoding a video corpus). Pick Endpoints when the work needs to stay warm (an inference API, a chat backend, a real-time agent). Same container, same image, different lifecycle."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-card border border-ink-200 bg-white p-8 dark:border-ink-700 dark:bg-ink-900">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-700 dark:text-lime">Jobs</p>
              <h3 className="mt-3 text-xl font-semibold text-ink-900 dark:text-ink-50">Run, finish, exit.</h3>
              <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
                Submit a container with arguments, optional GPU spec, and a command. Serverless allocates,
                runs, captures logs + artifacts, and tears down. Ideal for nightly fine-tunes, batch
                inference passes, dataset prep, eval suites.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-700 dark:text-ink-200">
                <li>● Submit by CLI, API, or workflow tool</li>
                <li>● Cancel anytime, retry-friendly logs</li>
                <li>● Output to Object Storage by default</li>
              </ul>
            </div>
            <div className="rounded-card border border-ink-200 bg-white p-8 dark:border-ink-700 dark:bg-ink-900">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-700 dark:text-lime">Endpoints</p>
              <h3 className="mt-3 text-xl font-semibold text-ink-900 dark:text-ink-50">Stay warm, scale on traffic.</h3>
              <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
                Deploy your container as an HTTPS endpoint. Autoscale on request volume, drop to zero
                between bursts, and front it with the Nebius gateway for auth + rate limiting. Use it for
                LLM serving, embedding services, RAG backends.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-700 dark:text-ink-200">
                <li>● HTTPS in, JSON out</li>
                <li>● Cold start &lt; 5 s for warm-pool images</li>
                <li>● Plug into Token Factory or your own model</li>
              </ul>
            </div>
          </div>
        </Section>

        <ProductGrid
          eyebrow="Start building"
          title="The first 30 minutes"
          body="Two parallel paths — same registry image, different lifecycle. Pick whichever fits the work."
          cols={2}
          cards={[
            {
              title: "Submit your first Job",
              body: "Push a container, point Serverless at it, hand it a GPU spec, and watch logs stream. Cancel and resubmit cleanly.",
              links: [
                { label: "Docs", href: "https://docs.nebius.com" },
                { label: "Tutorial", href: "https://www.youtube.com/watch?v=Cx7BlL6PdKk" },
                { label: "GitHub", href: "https://github.com/nebius/ml-cookbook" },
              ],
            },
            {
              title: "Deploy your first Endpoint",
              body: "Same container, exposed as an HTTPS service. Set min/max replicas, idle scale-down, and traffic auth.",
              links: [
                { label: "Docs", href: "https://docs.nebius.com" },
                { label: "Tutorial", href: "https://www.youtube.com/watch?v=Zjq8HSMgFr4" },
                { label: "GitHub", href: "https://github.com/nebius/ml-cookbook" },
              ],
            },
          ]}
        />

        <ProductGrid
          bg="tint"
          eyebrow="Core patterns"
          title="What teams actually run on Serverless"
          cols={2}
          cards={[
            {
              title: "vLLM inference behind an Endpoint",
              body: "Stand up an OpenAI-compatible model with vLLM, autoscaled by request rate. Drop-in cookbook with a sample load test.",
              links: [
                { label: "Guide", href: "https://github.com/nebius/ml-cookbook" },
                {
                  label: "GitHub",
                  href: "https://github.com/nebius/ml-cookbook/tree/main/skypilot",
                },
              ],
            },
            {
              title: "Training & fine-tuning Jobs",
              body: "Submit a fine-tune as a Job, write the adapter to Object Storage, hand it off to Token Factory or another Endpoint.",
              links: [
                { label: "Guide", href: "https://github.com/nebius/ml-cookbook" },
                { label: "GitHub", href: "https://github.com/nebius/token-factory-cookbook/tree/main/lora" },
              ],
            },
          ]}
        />

        <ProductGrid
          eyebrow="Advanced workflows"
          title="When the simple shapes aren't enough"
          cols={4}
          cards={[
            {
              title: "RAG pipelines",
              body: "Embed → store → retrieve → generate, every stage on Serverless. Chunkers and rerankers as Jobs, retrieval as an Endpoint.",
              links: [
                { label: "Guide", href: "https://github.com/nebius/token-factory-cookbook/tree/main/rag" },
              ],
            },
            {
              title: "Agentic workflows",
              body: "Sub-agent fleets running on Serverless Endpoints, orchestrated by OpenClaw. MCP-friendly out of the box.",
              links: [
                { label: "OpenClaw", href: "https://github.com/opencolin/openclaw-nebius" },
              ],
            },
            {
              title: "Batch + data processing",
              body: "Scoring, transcription, embedding generation across millions of items — split as fan-out Jobs with shared output.",
              links: [{ label: "Guide — coming soon", href: "/library" }],
            },
            {
              title: "Hybrid pipelines",
              body: "Mix Jobs, Endpoints, and Token Factory in one DAG. Common pattern: nightly fine-tune + auto-deploy as an Endpoint.",
              links: [{ label: "Cookbook", href: "https://github.com/nebius/ml-cookbook" }],
            },
          ]}
        />

        <ProductGrid
          bg="tint"
          eyebrow="Verticals"
          title="Domain workflows on Serverless"
          body="Reference patterns from teams already running production workloads."
          cards={[
            {
              title: "Life sciences",
              body: "Molecular dynamics simulations, protein folding (Boltz-2), and assay scoring as Jobs; Endpoints for downstream inference services.",
              links: [
                { label: "Boltz-2 recipe", href: "https://github.com/Nebius-Academy/boltz2-mk8s" },
              ],
            },
            {
              title: "Voice & media",
              body: "Transcription, diarization, and TTS in batch with Jobs; live phone agents (Telnyx + Token Factory) on Endpoints.",
              links: [{ label: "K1 Walking & Talking", href: "/projects/k1-walking-talking" }],
            },
            {
              title: "Robotics",
              body: "Sim-train, perception inference, and policy serving — Jobs for the training side, Endpoints in front of the robot.",
              links: [{ label: "Solutions library", href: "https://github.com/nebius/nebius-solutions-library" }],
            },
          ]}
        />

        <Section>
          <SectionHeader
            eyebrow="Get started"
            title="Five places to land"
            body="From console to community to cookbook — pick what unblocks you next."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <a className="card text-sm font-semibold text-ink-900 dark:text-ink-50" href="https://console.nebius.com" target="_blank" rel="noreferrer">
              Open the console ↗
            </a>
            <a className="card text-sm font-semibold text-ink-900 dark:text-ink-50" href="https://discord.gg/CncTn9zVzS" target="_blank" rel="noreferrer">
              Join Discord ↗
            </a>
            <a className="card text-sm font-semibold text-ink-900 dark:text-ink-50" href="https://github.com/nebius/ml-cookbook" target="_blank" rel="noreferrer">
              Cookbook on GitHub ↗
            </a>
            <a className="card text-sm font-semibold text-ink-900 dark:text-ink-50" href="https://docs.nebius.com" target="_blank" rel="noreferrer">
              Open the docs ↗
            </a>
            <a className="card text-sm font-semibold text-ink-900 dark:text-ink-50" href="https://www.youtube.com/@nebiusofficial/videos" target="_blank" rel="noreferrer">
              Watch on YouTube ↗
            </a>
          </div>
        </Section>

        <ProductCTA
          title="Ship serverless today."
          body="Sign up, claim $100 in intro credits, and your first Job runs before your coffee finishes."
          primary={{ label: "Sign up", href: "/signup" }}
          secondary={{ label: "Talk to the team", href: "/team/colin" }}
        />
      </main>
      <Footer />
    </>
  );
}
