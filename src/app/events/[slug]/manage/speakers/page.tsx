import { EventManagerShell } from "@/components/event-manager-shell";
import { events, eventSpeakers } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default function SpeakersTab({ params }: { params: { slug: string } }) {
  return (
    <EventManagerShell eventSlug={params.slug} active="Speakers">
      <section className="section">
        <div className="container-page">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="h-display text-2xl font-bold">Speakers</h2>
              <p className="text-sm text-ink-500">Invite by email — they fill the form, you approve, the Present button appears on their dashboard.</p>
            </div>
            <button className="btn-lime">+ Invite speaker</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eventSpeakers.map((s) => (
              <div key={s.name} className="card">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{s.name}</p>
                  <span className={s.status === "APPROVED" ? "pill-lime" : "pill-outline"}>{s.status.toLowerCase()}</span>
                </div>
                <p className="mt-1 text-xs text-ink-500">{s.company}</p>
                <p className="mt-3 text-sm">{s.talk}</p>
                <div className="mt-4 flex gap-2">
                  {s.status === "INVITED" ? (
                    <>
                      <button className="btn-ghost text-xs">Resend invite</button>
                      <button className="btn-lime text-xs">Approve</button>
                    </>
                  ) : (
                    <>
                      <button className="btn-outline text-xs">Edit talk</button>
                      <button className="btn-outline text-xs">Pair to base station</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 card">
            <h3 className="text-lg font-semibold">Invite speaker</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div><label className="label">Name</label><input className="input" /></div>
              <div><label className="label">Email</label><input className="input" type="email" /></div>
              <div><label className="label">Company</label><input className="input" /></div>
              <div><label className="label">Talk title</label><input className="input" /></div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="btn-outline">Cancel</button>
              <button className="btn-lime">Send invite</button>
            </div>
            <p className="mt-3 text-xs text-ink-500">We'll email a form requesting their bio, photo, and slide deck.</p>
          </div>
        </div>
      </section>
    </EventManagerShell>
  );
}
