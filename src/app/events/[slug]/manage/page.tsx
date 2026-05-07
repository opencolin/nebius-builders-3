import { EventManagerShell } from "@/components/event-manager-shell";
import { events, eventBlasts, eventProjects, eventVolunteerOpportunities } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default function EventManageOverview({ params }: { params: { slug: string } }) {
  const total = eventProjects.reduce((acc, p) => acc + p.votes, 0);
  return (
    <EventManagerShell eventSlug={params.slug} active="Overview">
      <section className="section">
        <div className="container-page">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Registered", "187 / 200"],
              ["On-floor now", "163"],
              ["Projects in progress", "42"],
              ["Demos booked", "18"],
            ].map(([l, v]) => (
              <div key={l} className="card">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">{l}</p>
                <p className="mt-2 text-2xl font-bold text-navy-700">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="card lg:col-span-2">
              <h2 className="text-lg font-semibold">Top projects right now</h2>
              <ol className="mt-4 divide-y divide-ink-200">
                {eventProjects.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-lime text-xs font-bold text-navy-700">{p.rank}</span>
                      <div>
                        <p className="font-medium text-ink-900">{p.name}</p>
                        <p className="text-xs text-ink-500">{p.team} · {p.partners.join(" · ")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="pill-outline">{p.votes} votes</span>
                      {p.demoApproved ? <span className="pill-lime">Demo OK</span> : <span className="pill-outline">Pending</span>}
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-ink-500">{total.toLocaleString()} total votes across all projects · refreshed live</p>
            </div>
            <div className="card">
              <h2 className="text-lg font-semibold">Live demo queue</h2>
              <ol className="mt-4 space-y-3 text-sm">
                {[
                  ["Now", "Muglife", "8m left"],
                  ["Next", "Quiver", "queued"],
                  ["Slot 3", "Orbital", "queued"],
                  ["Slot 4", "Thunder", "needs approval"],
                ].map(([when, name, note]) => (
                  <li key={when} className="flex items-center justify-between rounded-lg border border-ink-200 bg-white p-3">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-ink-500">{when}</p>
                      <p className="font-medium">{name}</p>
                    </div>
                    <span className="pill-ink">{note}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="card">
              <h2 className="text-lg font-semibold">Recent blasts</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {eventBlasts.map((b) => (
                  <li key={b.id} className="rounded-lg border border-ink-200 bg-white p-3">
                    <p className="text-xs uppercase tracking-widest text-ink-500">just sent</p>
                    <p className="mt-1 text-ink-800">{b.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card lg:col-span-2">
              <h2 className="text-lg font-semibold">Volunteer coverage</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {eventVolunteerOpportunities.map((o) => (
                  <li key={o.title} className="rounded-lg border border-ink-200 bg-white p-4">
                    <p className="font-medium">{o.title}</p>
                    <p className="text-xs text-ink-500">{o.timeSlot} · {o.location}</p>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100"><div className="h-2 bg-lime-500" style={{ width: `${(o.filled / o.max) * 100}%` }} /></div>
                    <p className="mt-2 text-xs text-ink-500">{o.filled} / {o.max}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </EventManagerShell>
  );
}
