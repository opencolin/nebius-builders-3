import { EventManagerShell } from "@/components/event-manager-shell";
import { events } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

const submissions = [
  { id: "f1", from: "Priya I.", partner: "Tavily", llm: 8.4, ai: false, snippet: "Latency was great but rate-limit hit at 18 req/s without warning. Backoff doc would unblock." },
  { id: "f2", from: "Marcus Y.", partner: "Stripe", llm: 7.1, ai: false, snippet: "Stripe Agent Toolkit's first-call ergonomics felt like the SDK assumed I'd already read the docs." },
  { id: "f3", from: "Anonymous", partner: "OpenClaw", llm: 2.3, ai: true, snippet: "It was good. The tools work. I have no further feedback." },
  { id: "f4", from: "Jess P.", partner: "Qdrant", llm: 8.9, ai: false, snippet: "Vector hybrid scoring + Tavily worked unreasonably well together. Wrote a 200-line agent that beat my hand-tuned RAG." },
];

export default function FeedbackTab({ params }: { params: { slug: string } }) {
  return (
    <EventManagerShell eventSlug={params.slug} active="Feedback">
      <section className="section">
        <div className="container-page">
          <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="h-display text-2xl font-bold">Feedback</h2>
              <p className="text-sm text-ink-500">AI-graded for technical depth. Default view shows accepted only.</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-outline text-sm">Run raffle</button>
              <button className="btn-navy text-sm">Export CSV</button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Submissions", "184"],
              ["Accepted", "146"],
              ["Likely AI-generated", "38"],
              ["Avg LLM-score", "7.6"],
            ].map(([l, v]) => (
              <div key={l} className="card">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">{l}</p>
                <p className="mt-2 text-2xl font-bold text-navy-700">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 card">
            <div className="flex items-center justify-between border-b border-ink-200 pb-3">
              <h3 className="text-lg font-semibold">Recent feedback</h3>
              <div className="flex gap-2 text-xs">
                <button className="pill-lime">Accepted</button>
                <button className="pill-outline">All</button>
                <button className="pill-outline">AI-only</button>
              </div>
            </div>
            <ul className="divide-y divide-ink-200">
              {submissions.map((s) => (
                <li key={s.id} className="grid gap-2 py-4 md:grid-cols-12">
                  <div className="md:col-span-2 text-sm">
                    <p className="font-medium">{s.from}</p>
                    <p className="text-xs text-ink-500">→ {s.partner}</p>
                  </div>
                  <p className="md:col-span-7 text-sm text-ink-800">{s.snippet}</p>
                  <div className="md:col-span-3 flex items-center justify-end gap-2 text-xs">
                    <span className={`pill ${s.llm > 6 ? "bg-lime text-navy-700" : "bg-ink-100 text-ink-700"}`}>LLM {s.llm.toFixed(1)}</span>
                    {s.ai ? <span className="pill bg-amber-100 text-amber-800">Likely AI</span> : <span className="pill-outline">Human</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </EventManagerShell>
  );
}
