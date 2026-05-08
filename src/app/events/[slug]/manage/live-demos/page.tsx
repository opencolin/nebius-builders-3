import { EventManagerShell } from "@/components/event-manager-shell";
import { events } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

const queue = [
  { name: "Muglife", team: "Muglife", state: "presenting", duration: "8:00", snapshot: "ready-for-demo" },
  { name: "Quiver", team: "Arrow Labs", state: "queued", duration: "5:00", snapshot: "v1.2-pre-demo" },
  { name: "Orbital", team: "Heliotrope", state: "queued", duration: "5:00", snapshot: "—" },
  { name: "Thunder", team: "Sky Patrol", state: "needs approval", duration: "5:00", snapshot: "main" },
];

export default function LiveDemos({ params }: { params: { slug: string } }) {
  return (
    <EventManagerShell eventSlug={params.slug} active="Live demos">
      <section className="section">
        <div className="container-page">
          <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="h-display text-2xl font-bold">Base station</h2>
              <p className="text-sm text-ink-500 dark:text-ink-400">Run on the room display. Accept incoming demo + presentation requests.</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-outline text-sm">Pair display</button>
              <button className="btn-navy text-sm">Start session</button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card lg:col-span-2 overflow-hidden p-0">
              <div className="aspect-video bg-gradient-to-br from-navy-700 via-navy-600 to-navy-800 p-6 text-white">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="pill-lime"><span className="live-dot" /> ON AIR</span>
                    <span className="text-xs font-mono text-ink-100">07:42 / 08:00</span>
                  </div>
                  <div className="my-auto text-center">
                    <p className="text-sm text-lime/80">Now demoing</p>
                    <p className="mt-2 text-3xl font-bold">Muglife</p>
                    <p className="text-sm text-ink-100">Snapshot: ready-for-demo</p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Webcam: Colin · Screen: workspace</span>
                    <span>Audio: -16 dB</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink-200 dark:border-ink-700 p-4">
                <div className="flex gap-2">
                  <button className="btn-outline text-xs">Zoom in</button>
                  <button className="btn-outline text-xs">Zoom out</button>
                  <button className="btn-outline text-xs">Pause capture</button>
                </div>
                <div className="flex gap-2">
                  <button className="btn-outline text-xs">Skip to next</button>
                  <button className="btn-navy text-xs">End session</button>
                </div>
              </div>
            </div>
            <div className="card">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">Queue</h3>
              <ol className="mt-3 space-y-3">
                {queue.map((q) => (
                  <li key={q.name} className="rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{q.name}</p>
                      <span className={q.state === "presenting" ? "pill-lime" : q.state === "needs approval" ? "pill bg-amber-100 text-amber-800" : "pill-outline"}>{q.state}</span>
                    </div>
                    <p className="text-xs text-ink-500 dark:text-ink-400">{q.team} · {q.duration} · snapshot {q.snapshot}</p>
                    {q.state === "needs approval" ? (
                      <div className="mt-2 flex gap-2">
                        <button className="btn-ghost text-xs">Reject</button>
                        <button className="btn-lime text-xs">Approve</button>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-8 card">
            <h3 className="text-lg font-semibold">Capture pipeline</h3>
            <p className="text-sm text-ink-500 dark:text-ink-400">Each demo records video, screen share, and presenter webcam. Files land in the post-event summary automatically.</p>
            <ol className="mt-4 grid gap-4 md:grid-cols-4">
              {[
                ["Request", "Builder hits Present"],
                ["Approve", "Operator confirms"],
                ["Stream", "WebRTC → base station"],
                ["Capture", "HLS + post-production"],
              ].map(([t, b], i) => (
                <li key={t} className="rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 p-4">
                  <span className="pill-lime">Step {i + 1}</span>
                  <p className="mt-2 font-medium">{t}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400">{b}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </EventManagerShell>
  );
}
