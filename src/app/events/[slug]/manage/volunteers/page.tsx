import { EventManagerShell } from "@/components/event-manager-shell";
import { events, eventVolunteerOpportunities } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default function VolunteersTab({ params }: { params: { slug: string } }) {
  return (
    <EventManagerShell eventSlug={params.slug} active="Volunteers">
      <section className="section">
        <div className="container-page">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="h-display text-2xl font-bold">Volunteer opportunities</h2>
              <p className="text-sm text-ink-500">Builders sign up via the Volunteer button on their dashboard.</p>
            </div>
            <button className="btn-lime">+ New opportunity</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eventVolunteerOpportunities.map((o) => (
              <div key={o.title} className="card">
                <div className="flex items-start justify-between">
                  <p className="font-semibold">{o.title}</p>
                  <span className="pill-outline">{o.category}</span>
                </div>
                <p className="mt-2 text-sm text-ink-700">{o.timeSlot}</p>
                <p className="text-xs text-ink-500">{o.location}</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-ink-100"><div className="h-2 bg-lime-500" style={{ width: `${(o.filled / o.max) * 100}%` }} /></div>
                <p className="mt-2 text-xs text-ink-500">{o.filled} / {o.max} filled</p>
                <div className="mt-4 flex gap-2">
                  <button className="btn-outline text-xs">View signups</button>
                  <button className="btn-ghost text-xs">Edit</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 card">
            <h3 className="text-lg font-semibold">New opportunity</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2"><label className="label">Title</label><input className="input" placeholder="Check-in support" /></div>
              <div><label className="label">Category</label><input className="input" placeholder="Reception" /></div>
              <div><label className="label">Time slot</label><input className="input" placeholder="9:00 AM - 12:00 PM" /></div>
              <div><label className="label">Location</label><input className="input" placeholder="Main entrance" /></div>
              <div><label className="label">Max volunteers</label><input className="input" type="number" placeholder="3" /></div>
              <div className="md:col-span-2"><label className="label">Description</label><textarea rows={3} className="input" placeholder="Greet builders, scan QR codes, hand out swag." /></div>
              <div className="md:col-span-2"><label className="label">Requirements</label><textarea rows={2} className="input" placeholder="Comfortable speaking with strangers; please arrive 15 min early." /></div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="btn-outline">Cancel</button>
              <button className="btn-lime">Create opportunity</button>
            </div>
          </div>
        </div>
      </section>
    </EventManagerShell>
  );
}
