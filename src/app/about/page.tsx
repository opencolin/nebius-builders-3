import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section, SectionHeader } from "@/components/section";

export default function AboutPage() {
  return (
    <>
      <TopNav />
      <main>
        <section className="border-b border-ink-200 bg-white">
          <div className="container-page py-20">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">About</p>
            <h1 className="h-display max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">A Nebius product, built next to the builders.</h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-600">We make events that turn on lights in the right brains. The platform is the part you see — the rest is venue, food, judging, and a green room with good coffee.</p>
          </div>
        </section>

        <Section bg="tint">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">What we measure</p>
              <p className="mt-2 text-lg">Token Factory calls, deploys to Nebius, projects shipped per event, sponsor follow-ups within 7 days. Not badge scans.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">What we don't</p>
              <p className="mt-2 text-lg">Pixel-tracked emails. Webinar attendance vanity. "Engagement scores" detached from a shipped artifact.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">Where we are</p>
              <p className="mt-2 text-lg">San Francisco · NYC · London · Berlin · Remote. Q3 2026 bookings open.</p>
            </div>
          </div>
        </Section>

        <Section id="careers">
          <SectionHeader eyebrow="Careers" title="Hiring builders who run events." body="We pay close to top of market, ship every two weeks, and travel together." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Founding Designer", l: "SF · full-time" },
              { t: "Solutions Engineer", l: "SF · NYC · full-time" },
              { t: "Senior PM, Builders", l: "SF · full-time" },
              { t: "Engineer, Live Capture", l: "Remote · full-time" },
              { t: "Engineer, Cloud IDE", l: "Remote · full-time" },
              { t: "Community Manager, EU", l: "London or Berlin · full-time" },
            ].map((r) => (
              <a key={r.t} className="card flex items-center justify-between hover:border-navy-700" href="#apply">
                <div>
                  <p className="font-semibold">{r.t}</p>
                  <p className="text-sm text-ink-500">{r.l}</p>
                </div>
                <span className="text-ink-400">→</span>
              </a>
            ))}
          </div>
        </Section>

        <Section id="privacy" bg="tint">
          <SectionHeader eyebrow="Privacy" title="What we keep, what we don't." />
          <div className="card max-w-3xl text-sm text-ink-700">
            <p>We collect what we need to run an event experience. We never sell builder data. Sponsors only see project-level data; per-builder follow-up requires the builder's per-project opt-in.</p>
            <p className="mt-3">Token Factory keys are scoped per user, never sent to the browser, and rotated automatically. Workspace state lives in Contree's image lineage and expires 30 days after the event closes.</p>
            <p className="mt-3">Full policy at <code className="kbd">/legal/privacy</code> (placeholder).</p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
