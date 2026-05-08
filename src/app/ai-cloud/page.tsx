import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  ProductCTA,
  ProductGrid,
  ProductHero,
} from "@/components/product-page";

export const metadata = {
  title: "AI Cloud — Nebius Builders",
  description:
    "VMs, Managed Kubernetes, and Slurm on Nebius GPU infrastructure. The full-control path for training, fine-tuning, and custom inference stacks.",
};

export default function AiCloudPage() {
  return (
    <>
      <TopNav />
      <main>
        <ProductHero
          eyebrow="Product · AI Cloud"
          title={
            <>
              GPU VMs, Kubernetes, and Slurm for AI training and inference.
            </>
          }
          body="Pick how you want to operate Nebius compute: spin up a single VM, drop into Managed Kubernetes, or run multi-node training under Slurm. NVIDIA-class GPUs, fast NVMe, and InfiniBand networking — wired through one console."
          primary={{ label: "Quick start", href: "https://docs.nebius.com/cloud", external: true }}
          secondary={{ label: "Read the docs", href: "https://docs.nebius.com", external: true }}
          bullets={[
            "GPU VMs on demand",
            "Managed Kubernetes (mk8s)",
            "Slurm via Soperator",
          ]}
        />

        <ProductGrid
          eyebrow="Quickstarts"
          title="Three short paths to a running workload"
          body="Pick the entry point that matches how you ship — first-VM, full architecture deep-dive, or a console tour."
          cards={[
            {
              title: "Get started with AI Cloud",
              body: "Provision a GPU VM, attach storage, and SSH in. Ten-minute path from sign-up to first job.",
              links: [
                { label: "Quickstart", href: "https://docs.nebius.com/cloud/quickstart" },
                { label: "Sign in to console", href: "https://console.nebius.com" },
              ],
            },
            {
              title: "Architecture overview",
              body: "How VMs, mk8s, Slurm, networking, and Object Storage fit together — and which combination to pick for your workload.",
              links: [{ label: "Architecture", href: "https://docs.nebius.com/cloud/concepts" }],
            },
            {
              title: "Console tour",
              body: "A 4-minute video tour of the AI Cloud console — projects, GPU pools, K8s clusters, and observability.",
              links: [
                {
                  label: "Watch on YouTube",
                  href: "https://www.youtube.com/@nebiusofficial/videos",
                },
              ],
            },
          ]}
        />

        <ProductGrid
          bg="tint"
          eyebrow="Resources & guides"
          title="Recipes that go beyond hello-world"
          body="Reference patterns from the Nebius DevRel team — written for production, not slideware."
          cols={2}
          cards={[
            {
              title: "Data preparation for LLM training",
              body: "End-to-end pipeline: ingest, dedupe, filter, shard, and stream into your training run on AI Cloud.",
              links: [
                { label: "Open the guide", href: "https://github.com/Nebius-Academy/LLM-Engineering-Essentials" },
              ],
            },
            {
              title: "Inference with vLLM on a GPU VM",
              body: "Deploy an open-source model behind a vLLM server. Includes autoscaling notes and a sample load test.",
              links: [
                { label: "Open the guide", href: "https://docs.nebius.com" },
                {
                  label: "GitHub example",
                  href: "https://github.com/nebius/ml-cookbook",
                },
              ],
            },
          ]}
        />

        <ProductGrid
          eyebrow="Solutions"
          title="Pick how you want to drive the cluster"
          body="Same hardware, three operational shapes — choose what fits your team."
          cards={[
            {
              title: "Managed Kubernetes (mk8s)",
              body: "GPU-enabled K8s with NCCL networking, Soperator integration, and the cookbook templates teams actually use.",
              links: [
                { label: "GitHub", href: "https://github.com/nebius/nebius-solutions-library/tree/main/k8s-training" },
                { label: "Docs", href: "https://docs.nebius.com" },
              ],
            },
            {
              title: "Soperator (Slurm on K8s)",
              body: "Run Slurm jobs on top of mk8s without operating a Slurm controller. Familiar sbatch + queueing, modern infra.",
              links: [
                { label: "GitHub", href: "https://github.com/nebius/nebius-solutions-library/tree/main/soperator" },
                { label: "Docs", href: "https://docs.nebius.com" },
              ],
            },
            {
              title: "SkyPilot on Nebius",
              body: "Multi-cloud orchestration with the same yaml that runs on AWS or GCP. Falls back across regions when a queue is full.",
              links: [
                { label: "GitHub", href: "https://github.com/nebius/ml-cookbook/tree/main/skypilot" },
                { label: "Docs", href: "https://docs.nebius.com" },
              ],
            },
          ]}
        />

        <ProductGrid
          bg="tint"
          eyebrow="Reference implementations"
          title="Built end-to-end on AI Cloud"
          body="Domain-specific blueprints from the Nebius solutions library and community."
          cards={[
            {
              title: "Boltz-2 protein structure inference",
              body: "Run Boltz-2 at scale on Managed Kubernetes — manifests, autoscaling, and a paired YouTube tutorial.",
              links: [
                { label: "Repo", href: "https://github.com/Nebius-Academy/boltz2-mk8s" },
                {
                  label: "Tutorial",
                  href: "https://www.youtube.com/watch?v=tMvAWi1Wfiw",
                },
              ],
            },
            {
              title: "Gemma 4 fine-tuning fleet",
              body: "QLoRA recipe + 9-node workshop runbook — same pattern that ran live with ~30 attendees at Sandbox VR SF.",
              links: [
                { label: "Repo", href: "https://github.com/RayyanZahid/gemma-finetune" },
                { label: "Workshop write-up", href: "/library/gemma-finetune-rayyanzahid" },
              ],
            },
            {
              title: "ML Cookbook",
              body: "Production reference recipes — DeepEP, MXFP8, Volcano, Run:ai, SkyPilot, Slurm — kept current by the Nebius team.",
              links: [
                { label: "Open the cookbook", href: "https://github.com/nebius/ml-cookbook" },
              ],
            },
          ]}
        />

        <ProductCTA
          title="Get hands on with AI Cloud."
          body="Sign up, claim $100 of intro credits, and have a GPU VM in your console in under five minutes."
          primary={{ label: "Sign up", href: "/signup" }}
          secondary={{ label: "Talk to the team", href: "/team/colin" }}
        />
      </main>
      <Footer />
    </>
  );
}
