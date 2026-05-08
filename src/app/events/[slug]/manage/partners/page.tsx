import { EventManagerShell } from "@/components/event-manager-shell";
import { events } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

const tiers = ["Title", "Platinum", "Gold", "Silver", "Bronze"];

const partners = [
  { name: "Nebius", tier: "Title", challengeUrl: "https://nebius.com/challenge", discord: "#nebius" },
  { name: "OpenClaw", tier: "Platinum", challengeUrl: "https://github.com/opencolin/openclaw-deploy", discord: "#openclaw" },
  { name: "Wordware", tier: "Gold", challengeUrl: "", discord: "#wordware" },
  { name: "Tavily", tier: "Silver", challengeUrl: "https://tavily.com/builders", discord: "#tavily" },
  { name: "Stripe", tier: "Bronze", challengeUrl: "", discord: "" },
];

export default function PartnersTab({ params }: { params: { slug: string } }) {
  return (
    <EventManagerShell eventSlug={params.slug} active="Partners">
      <section className="section">
        <div className="container-page">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="h-display text-2xl font-bold">Partner companies</h2>
              <p className="text-sm text-ink-500">Add before doors open so builders see complementary tools day one.</p>
            </div>
            <button className="btn-lime">+ Add partner</button>
          </div>

          <div className="overflow-hidden rounded-card border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900">
            <table className="w-full text-sm">
              <thead className="bg-ink-50 dark:bg-ink-800 text-xs font-semibold uppercase tracking-widest text-ink-500">
                <tr>
                  <th className="px-4 py-3 text-left">Company</th>
                  <th className="px-4 py-3 text-left">Tier</th>
                  <th className="px-4 py-3 text-left">Challenge URL</th>
                  <th className="px-4 py-3 text-left">Discord</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200">
                {partners.map((p) => (
                  <tr key={p.name} className="hover:bg-ink-50">
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3"><span className="pill-outline">{p.tier}</span></td>
                    <td className="px-4 py-3 text-xs text-ink-700">{p.challengeUrl || <span className="text-ink-400">—</span>}</td>
                    <td className="px-4 py-3 text-xs text-ink-700">{p.discord || <span className="text-ink-400">—</span>}</td>
                    <td className="px-4 py-3 text-right"><button className="text-xs font-medium text-navy-700 hover:underline">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 card">
            <h3 className="text-lg font-semibold">Add partner</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label className="label">Company</label>
                <input className="input" placeholder="Search the partner directory…" />
              </div>
              <div>
                <label className="label">Sponsorship tier</label>
                <select className="input">
                  {tiers.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Technical challenge URL <span className="text-ink-400">(optional)</span></label>
                <input className="input" placeholder="https://..." />
              </div>
              <div>
                <label className="label">Discord channel <span className="text-ink-400">(optional)</span></label>
                <input className="input" placeholder="#partner-name" />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="btn-outline">Cancel</button>
              <button className="btn-lime">Add partner</button>
            </div>
          </div>
        </div>
      </section>
    </EventManagerShell>
  );
}
