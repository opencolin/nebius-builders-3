import { EventManagerShell } from "@/components/event-manager-shell";
import { events, eventBlasts } from "@/lib/data";
import { formatTime } from "@/lib/utils";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default function BlastsTab({ params }: { params: { slug: string } }) {
  return (
    <EventManagerShell eventSlug={params.slug} active="Blasts">
      <section className="section">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          <div className="card lg:col-span-2">
            <h2 className="text-lg font-semibold">Compose blast</h2>
            <p className="text-sm text-ink-500">Lands on every builder's dashboard for this event. No email — keep it short and action-oriented.</p>
            <div className="mt-5 grid gap-4">
              <div>
                <label className="label">Body</label>
                <textarea rows={4} className="input" placeholder="Pizza is here on the second floor. Sponsor table for Wordware just opened — first 20 builders get an early-access invite." />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-ink-500">Audience: 187 builders registered for this event</span>
                <div className="flex gap-2">
                  <button className="btn-outline text-sm">Save draft</button>
                  <button className="btn-lime text-sm">Send blast →</button>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-500">Templates</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><button className="text-left hover:text-navy-700">📍 Doors are open — check-in starts now</button></li>
              <li><button className="text-left hover:text-navy-700">🍕 Food's here on floor 2</button></li>
              <li><button className="text-left hover:text-navy-700">⏰ 30 min until demos — pin a snapshot</button></li>
              <li><button className="text-left hover:text-navy-700">🏆 Prize ceremony in 10 minutes</button></li>
            </ul>
          </div>
          <div className="card lg:col-span-3">
            <h3 className="text-lg font-semibold">Sent</h3>
            <ul className="mt-3 divide-y divide-ink-200">
              {eventBlasts.map((b) => (
                <li key={b.id} className="grid gap-2 py-3 md:grid-cols-12">
                  <p className="md:col-span-2 text-xs uppercase tracking-widest text-ink-500">{formatTime(b.sentAt)}</p>
                  <p className="md:col-span-9 text-ink-800">{b.body}</p>
                  <span className="md:col-span-1 pill-outline justify-self-end">delivered</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </EventManagerShell>
  );
}
