import { Section, SectionHeader } from "@/components/section";

export function Contact() {
  return (
    <Section id="contact" bg="tint">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeader
            eyebrow="Get in touch"
            title="Run your next event with us."
            body="Tell us what you're planning. We'll come back inside 24 hours with a venue, a partner shortlist, and a budget."
          />
          <ul className="grid gap-3 text-sm text-ink-700 dark:text-ink-200">
            <li>📍 San Francisco · NYC · London · Remote</li>
            <li>✉️ <a href="mailto:builders@nebius.com" className="underline-offset-4 hover:underline">builders@nebius.com</a></li>
            <li>🟢 Accepting Q3 bookings</li>
          </ul>
        </div>
        <form className="card grid gap-4 p-8">
          <div>
            <label className="label" htmlFor="name">Name</label>
            <input id="name" className="input" placeholder="Colin Lowenberg" />
          </div>
          <div>
            <label className="label" htmlFor="email">Work email</label>
            <input id="email" type="email" className="input" placeholder="colin@nebius.com" />
          </div>
          <div>
            <label className="label" htmlFor="company">Company</label>
            <input id="company" className="input" placeholder="Nebius" />
          </div>
          <div>
            <label className="label" htmlFor="msg">What are you planning?</label>
            <textarea id="msg" rows={4} className="input" placeholder="A 200-builder hackathon on agents in Q3..." />
          </div>
          <button type="button" className="btn-lime mt-2 w-full">Send →</button>
          <p className="text-xs text-ink-500 dark:text-ink-400">By submitting, you agree to our (placeholder) privacy policy. We won't add you to a marketing list.</p>
        </form>
      </div>
    </Section>
  );
}
