import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section, SectionHeader } from "@/components/section";
import { ProductCTA } from "@/components/product-page";

export const metadata = {
  title: "Ambassador program — Nebius Builders",
  description:
    "Run a hackathon. We bring Nebius. Three tiers of support — credits, an on-site engineer, and a clear technical focus — for serious organizers running 100+ pro events.",
};

const tiers = [
  {
    name: "Partner-led",
    touch: "High touch",
    body:
      "Co-hosted with Nebius. We commit a meaningful credit pool, send an engineer on-site for the full event, and put up a branded track prize. We work in on the technical focus, the prize criteria, and the partner stack with you.",
    bestFor:
      "Flagship events, university partnerships, and conference-anchored hackathons that need a real product story on stage.",
    perks: [
      "Up to $10K in Token Factory credits",
      "Nebius engineer on-site, judging + helpdesk",
      "Branded track prize (cash or hardware)",
      "Joint pre-event content + workshop",
    ],
    cta: { label: "Apply", href: "#apply" },
    highlight: true,
  },
  {
    name: "Community",
    touch: "Medium touch",
    body:
      "Sponsor model. We supply credits, contribute pre-built workshop material, and join virtually for office hours during the event. An engineer can drop in if the schedule works.",
    bestFor:
      "Recurring meetups going up-tempo, regional hackathons, and clubhouses building a 6–12 month rhythm.",
    perks: [
      "Up to $3K in Token Factory credits",
      "Workshop content delivered ready-to-run",
      "Optional engineer rep, virtual or in person",
      "Discord office-hours during the event",
    ],
    cta: { label: "Apply", href: "#apply" },
  },
  {
    name: "Credit-only",
    touch: "Low touch",
    body:
      "We sponsor credits and a banner mention; you run the show. Best for short events where a heavyweight partnership would be overkill.",
    bestFor:
      "Hack nights, demo nights, and 5–10-hour mini-events where the lift is a credit code and a logo.",
    perks: [
      "Up to $500 in Token Factory credits",
      "Logo + one-line mention on your event page",
      "Discord support channel access",
    ],
    cta: { label: "Apply", href: "#apply" },
  },
];

const criteria = [
  {
    title: "Professional builders, not beginners",
    body: "Working developers, founders, ML engineers, and grad students. We're not the right fit for first-code-ever events.",
  },
  {
    title: "100+ participants minimum",
    body: "Hard floor on attendance. If you're below 100, look at the Credit-only tier instead — same credits, less ceremony.",
  },
  {
    title: "2–5 partner companies",
    body: "Hackathons co-sponsored across a small partner stack outperform single-sponsor events for builders and for us.",
  },
  {
    title: "A clear technical theme",
    body: "Agents, fine-tuning, RAG, robotics — pick a focus. The sharper the theme, the better the projects ship.",
  },
];

const preCall = [
  "Expected attendee count (be honest, not aspirational)",
  "Location, dates, and physical or hybrid format",
  "Partner companies already confirmed",
  "What you specifically need from Nebius (credits, engineer, prize)",
  "Whether you've run hackathons before — and the receipts",
  "Any branded track prize ideas you'd want us to underwrite",
  "Distribution: how attendees hear about it",
];

const provides = [
  {
    title: "Token Factory credits",
    body: "Per-attendee credit codes you hand out at registration. They cover prototyping straight through to demo time.",
  },
  {
    title: "On-site engineer (Partner-led)",
    body: "A Nebius DevRel engineer on the floor: helpdesk, code review, and a real face on the judging panel.",
  },
  {
    title: "Technical focus guidance",
    body: "We've helped run dozens of these. We'll help you pick a theme that lands well with builders and sponsors.",
  },
  {
    title: "Workshop content",
    body: "Pre-built decks + runnable notebooks for the kickoff workshop — Token Factory, fine-tuning, vLLM, OpenClaw.",
  },
  {
    title: "Branded track prize",
    body: "On Partner-led, we put up cash or hardware for a Nebius-themed track. Criteria written together.",
  },
  {
    title: "Discord support",
    body: "Dedicated channel during the event. Builders get unblocked, you get a transcript for follow-up.",
  },
];

const steps = [
  { n: 1, label: "Apply", body: "Fill the form below. Two-minute job." },
  { n: 2, label: "Intake call", body: "30-minute call to align on tier, theme, and partner stack." },
  { n: 3, label: "Onboarding", body: "Credits provisioned, content shared, engineer scheduled if applicable." },
  { n: 4, label: "Event", body: "We show up; you run the show. Helpdesk, judging, photos." },
  { n: 5, label: "Recap", body: "Post-event summary, attendee survey, and a path back for the next one." },
];

export default function AmbassadorsPage() {
  return (
    <>
      <TopNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="absolute inset-0 grid-bg opacity-60 dark:opacity-100" aria-hidden />
          <div className="absolute -left-20 -bottom-20 h-[480px] w-[480px] rounded-full bg-lime/40 blur-3xl dark:bg-lime/20" aria-hidden />
          <div className="container-page relative pt-24 pb-20">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-navy-700 dark:text-lime">
              Ambassador program · Hackathon support
            </p>
            <h1 className="h-display max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 dark:text-ink-50 sm:text-6xl lg:text-7xl">
              Run a hackathon.{" "}
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-lime/80" aria-hidden />
                <span className="relative">We bring Nebius.</span>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-xl text-ink-600 dark:text-ink-300">
              For organizers running 100+ professional builders. Pick a tier — Partner-led,
              Community, or Credit-only — and we'll commit credits, an engineer, and a clear
              technical focus. You bring the people; we bring the platform.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#apply" className="btn-lime px-6 py-3.5 text-sm">
                Apply for support →
              </a>
              <a href="#criteria" className="btn-outline px-6 py-3.5 text-sm">
                See the criteria
              </a>
              <Link href="/events" className="btn-ghost text-sm">
                View the event calendar →
              </Link>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <Section bg="tint">
          <SectionHeader
            eyebrow="Three tiers"
            title="Pick how involved you want us to be."
            body="Same credits per dollar at every tier — the difference is people, prizes, and on-the-ground presence."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={
                  "flex h-full flex-col gap-4 rounded-card border bg-white p-7 transition-colors dark:bg-ink-900 " +
                  (t.highlight
                    ? "border-navy-700 ring-2 ring-lime/40 dark:border-lime"
                    : "border-ink-200 hover:border-ink-300 dark:border-ink-700 dark:hover:border-ink-600")
                }
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold text-ink-900 dark:text-ink-50">{t.name}</h3>
                  <span className="pill-outline">{t.touch}</span>
                </div>
                <p className="text-sm text-ink-600 dark:text-ink-300">{t.body}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                  Best for
                </p>
                <p className="-mt-2 text-sm text-ink-700 dark:text-ink-200">{t.bestFor}</p>
                <ul className="space-y-2 text-sm text-ink-700 dark:text-ink-200">
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-navy-700 dark:text-lime">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a href={t.cta.href} className="btn-navy mt-auto self-start">
                  {t.cta.label} →
                </a>
              </div>
            ))}
          </div>
        </Section>

        {/* Criteria */}
        <Section id="criteria">
          <SectionHeader
            eyebrow="Selection criteria"
            title="Who we say yes to."
            body="Hard rules, written down so we don't waste your time on a call where the answer was already no."
          />
          <ol className="grid gap-6 md:grid-cols-2">
            {criteria.map((c, i) => (
              <li key={c.title} className="rounded-card border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-700 dark:text-lime">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-ink-900 dark:text-ink-50">{c.title}</h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{c.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Pre-call prep */}
        <Section bg="tint">
          <SectionHeader
            eyebrow="Before the call"
            title="Have answers to these on hand."
            body="We'll ask. The faster we get through these, the faster we can talk about what's actually unique about your event."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <ul className="space-y-3">
              {preCall.slice(0, 4).map((q, i) => (
                <li
                  key={q}
                  className="flex gap-3 rounded-card border border-ink-200 bg-white px-5 py-4 text-sm text-ink-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
                >
                  <span className="font-mono text-xs text-navy-700 dark:text-lime">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {q}
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {preCall.slice(4).map((q, i) => (
                <li
                  key={q}
                  className="flex gap-3 rounded-card border border-ink-200 bg-white px-5 py-4 text-sm text-ink-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
                >
                  <span className="font-mono text-xs text-navy-700 dark:text-lime">
                    {String(i + 5).padStart(2, "0")}
                  </span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* What we provide */}
        <Section>
          <SectionHeader
            eyebrow="What we provide"
            title="Six things, depending on tier."
            body="Everything below is on the table at Partner-led; tiers below pick a subset that fits the format."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {provides.map((p) => (
              <div key={p.title} className="rounded-card border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
                <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{p.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Process timeline */}
        <Section bg="tint">
          <SectionHeader
            eyebrow="Process"
            title="From application to recap."
            body="Five steps. About four to six weeks end to end if you're starting from a blank page."
          />
          <ol className="grid gap-4 md:grid-cols-5">
            {steps.map((s) => (
              <li key={s.n} className="rounded-card border border-ink-200 bg-white p-5 dark:border-ink-700 dark:bg-ink-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-base font-bold text-navy-700">
                  {s.n}
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink-900 dark:text-ink-50">{s.label}</h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Application form */}
        <Section id="apply">
          <SectionHeader
            eyebrow="Apply"
            title="Tell us about your event."
            body="Answers go to hackathons@nebius.com. We reply within 24 hours on weekdays."
          />
          <form className="grid max-w-3xl gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Your name" name="name" placeholder="Full name" />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" />
            </div>
            <Field label="Organization" name="organization" placeholder="Sandbox VR SF, Stanford CodeX, …" />
            <SelectField
              label="Tier you're applying for"
              name="tier"
              options={["Partner-led", "Community", "Credit-only", "Not sure yet"]}
            />
            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Date or window" name="when" placeholder="Sep 12–14, 2026" />
              <Field label="City" name="where" placeholder="SF · NYC · London · …" />
              <Field label="Attendee count" name="attendees" type="number" placeholder="120" />
            </div>
            <Field label="Confirmed partner companies" name="partners" placeholder="Comma-separated, e.g. Tavily, Mem0, Composio" />
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                What you need from us
              </p>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {[
                  "Token Factory credits",
                  "On-site engineer",
                  "Workshop content",
                  "Branded track prize",
                  "Discord support",
                  "Theme & criteria help",
                ].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
                  >
                    <input type="checkbox" name="needs" value={opt} className="accent-lime" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <Field
              label="Have you run a hackathon before? (optional)"
              name="prior"
              placeholder="Drop a Luma link or a one-liner"
            />
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="submit" className="btn-lime">
                Submit application →
              </button>
              <p className="text-xs text-ink-500 dark:text-ink-400">
                Demo form — no backend wired. Send the same answers to{" "}
                <a className="font-medium text-navy-700 underline-offset-4 hover:underline dark:text-lime" href="mailto:hackathons@nebius.com">
                  hackathons@nebius.com
                </a>
                .
              </p>
            </div>
          </form>
        </Section>

        <ProductCTA
          title="Not sure which tier fits?"
          body="Skip the form. Hop on a 15-minute call with the team and we'll point you at the right shape."
          primary={{ label: "Talk to the team", href: "/team/colin" }}
          secondary={{ label: "See past events", href: "/events" }}
        />
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
        {label}
      </span>
      <select name={name} className="input" defaultValue={options[options.length - 1]}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
