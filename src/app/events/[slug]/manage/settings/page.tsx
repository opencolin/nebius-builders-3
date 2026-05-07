import { EventManagerShell } from "@/components/event-manager-shell";
import { events } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

const team = [
  { name: "Colin Lowenberg", email: "colin@nebius.com", role: "Owner" },
  { name: "Michal", email: "michal@nebius.com", role: "Manager" },
  { name: "Anya Kuznetsova", email: "anya@nebius.com", role: "Manager" },
];

export default function Settings({ params }: { params: { slug: string } }) {
  const e = events.find((x) => x.slug === params.slug);
  return (
    <EventManagerShell eventSlug={params.slug} active="Settings">
      <section className="section">
        <div className="container-page space-y-8">
          <div className="card">
            <h2 className="text-lg font-semibold">Event details</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="label">Title</label>
                <input className="input" defaultValue={e?.title} />
              </div>
              <div>
                <label className="label">Format</label>
                <select className="input"><option>Hackathon</option><option>Hack night</option><option>Hack day</option><option>Meetup</option><option>Mini conference</option><option>Demo night</option></select>
              </div>
              <div>
                <label className="label">Capacity</label>
                <input className="input" type="number" defaultValue={e?.capacity} />
              </div>
              <div className="md:col-span-2">
                <label className="label">Venue</label>
                <input className="input" defaultValue={e?.venue} />
              </div>
              <div>
                <label className="label">Start</label>
                <input className="input" type="datetime-local" defaultValue={e?.startDateTime.slice(0, 16)} />
              </div>
              <div>
                <label className="label">End</label>
                <input className="input" type="datetime-local" defaultValue={e?.endDateTime?.slice(0, 16) ?? ""} />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="btn-outline">Cancel</button>
              <button className="btn-lime">Save event</button>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold">Team access</h2>
            <p className="text-sm text-ink-500">Anyone you add gets access to the full event management portal.</p>
            <table className="mt-5 w-full text-sm">
              <thead className="text-xs uppercase tracking-widest text-ink-500">
                <tr><th className="pb-2 text-left">Name</th><th className="pb-2 text-left">Email</th><th className="pb-2 text-left">Role</th><th></th></tr>
              </thead>
              <tbody className="divide-y divide-ink-200">
                {team.map((t) => (
                  <tr key={t.email}>
                    <td className="py-3 font-medium">{t.name}</td>
                    <td className="py-3 text-ink-700">{t.email}</td>
                    <td className="py-3"><span className="pill-outline">{t.role}</span></td>
                    <td className="py-3 text-right"><button className="text-xs text-ink-500 hover:text-ink-700">Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5 flex flex-col gap-2 border-t border-ink-200 pt-5 sm:flex-row">
              <input className="input flex-1" placeholder="teammate@nebius.com" />
              <button className="btn-lime">Add manager</button>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold">Danger zone</h2>
            <p className="text-sm text-ink-500">Cancel the event or transfer ownership.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button className="btn-outline">Transfer ownership</button>
              <button className="btn-outline border-red-300 text-red-700 hover:bg-red-50">Cancel event</button>
            </div>
          </div>
        </div>
      </section>
    </EventManagerShell>
  );
}
