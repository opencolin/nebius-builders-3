import { EventManagerShell } from "@/components/event-manager-shell";
import { events } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

const tiles = [
  "from-lime-200 to-lime-400",
  "from-navy-500 to-navy-700",
  "from-lime-100 to-navy-500",
  "from-navy-400 to-lime",
  "from-ink-200 to-ink-400",
  "from-lime-300 to-navy-600",
  "from-navy-700 to-lime",
  "from-lime-400 to-lime-600",
];

export default function PhotosTab({ params }: { params: { slug: string } }) {
  return (
    <EventManagerShell eventSlug={params.slug} active="Photos">
      <section className="section">
        <div className="container-page">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="h-display text-2xl font-bold">Photo gallery</h2>
              <p className="text-sm text-ink-500 dark:text-ink-400">Upload here. The post-event summary picks the best 12 automatically.</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-outline text-sm">Reorder</button>
              <button className="btn-lime text-sm">+ Upload photos</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="aspect-square rounded-card border-2 border-dashed border-ink-300 dark:border-ink-600 bg-ink-50 dark:bg-ink-800 flex flex-col items-center justify-center text-center text-sm text-ink-500 dark:text-ink-400">
              <span className="text-2xl">＋</span>
              <span className="mt-1">Drop photos here</span>
            </div>
            {tiles.map((t, i) => (
              <div key={i} className={`aspect-square rounded-card bg-gradient-to-br ${t} relative overflow-hidden`}>
                <div className="absolute inset-0 grid place-items-center text-xs text-white/80 font-mono">IMG_{(i + 1).toString().padStart(4, "0")}.jpg</div>
                <div className="absolute right-2 top-2"><button className="pill bg-white dark:bg-ink-900/90 text-navy-700 dark:text-lime">×</button></div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-ink-500 dark:text-ink-400">Photos auto-flow into the post-event summary at <code className="kbd">/events/{events.find(e => e.slug === params.slug)?.slug}/recap</code> when the event ends.</p>
        </div>
      </section>
    </EventManagerShell>
  );
}
