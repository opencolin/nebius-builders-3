import { EventManagerShell } from "@/components/event-manager-shell";
import { events, eventProjects } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default function ProjectsTab({ params }: { params: { slug: string } }) {
  return (
    <EventManagerShell eventSlug={params.slug} active="Projects">
      <section className="section">
        <div className="container-page">
          <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="h-display text-2xl font-bold">Projects ({eventProjects.length})</h2>
              <p className="text-sm text-ink-500">Filter by partner, expand for details, export to CSV.</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-outline text-sm">Expand all</button>
              <button className="btn-outline text-sm">Filter by partner</button>
              <button className="btn-navy text-sm">Export CSV</button>
            </div>
          </div>

          <div className="space-y-3">
            {eventProjects.map((p) => (
              <details key={p.id} className="group rounded-card border border-ink-200 bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lime text-sm font-bold text-navy-700">{p.rank}</span>
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-ink-500">{p.team} · {p.partners.join(" · ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="pill-outline">{p.votes} votes</span>
                    {p.demoApproved ? <span className="pill-lime">Demo OK</span> : <span className="pill-outline">Pending</span>}
                    <span className="text-ink-400 transition group-open:rotate-90">▸</span>
                  </div>
                </summary>
                <div className="border-t border-ink-200 p-5">
                  <p className="text-sm text-ink-800">{p.description}</p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">Technologies</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {p.technologies.map((t) => <li key={t} className="pill-ink">{t}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">Partners</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {p.partners.map((t) => <li key={t} className="pill-outline">{t}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-ink-200 pt-4">
                    <button className="btn-outline text-xs">View video</button>
                    <button className="btn-outline text-xs">Approve demo</button>
                    <button className="btn-outline text-xs">Open repo ↗</button>
                    <button className="btn-navy text-xs">Award prize</button>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </EventManagerShell>
  );
}
