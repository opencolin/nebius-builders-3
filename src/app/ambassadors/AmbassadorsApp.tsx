"use client";

import Link from "next/link";
import { useState } from "react";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section, SectionHeader } from "@/components/section";
import { ProductCTA } from "@/components/product-page";
import { cn } from "@/lib/utils";

type EventType = "hackathon" | "workshop";

type Tier = {
  name: string;
  touch: string;
  body: string;
  bestFor: string;
  perks: string[];
  highlight?: boolean;
};

type Criterion = { title: string; body: string };
type Provision = { title: string; body: string };
type Step = { n: number; label: string; body: string };

type EventConfig = {
  hero: {
    headline: string;
    underline: string;
    body: string;
  };
  tiers: Tier[];
  criteria: Criterion[];
  preCall: string[];
  provides: Provision[];
  steps: Step[];
  tierOptions: string[];
  needsOptions: string[];
};

const hackathon: EventConfig = {
  hero: {
    headline: "Run a hackathon.",
    underline: "We bring Nebius.",
    body:
      "For organizers running 100+ professional builders. Pick a tier — Partner-led, Community, or Credit-only — and we'll commit credits, an engineer, and a clear technical focus. You bring the people; we bring the platform.",
  },
  tiers: [
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
    },
  ],
  criteria: [
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
  ],
  preCall: [
    "Expected attendee count (be honest, not aspirational)",
    "Location, dates, and physical or hybrid format",
    "Partner companies already confirmed",
    "What you specifically need from Nebius (credits, engineer, prize)",
    "Whether you've run hackathons before — and the receipts",
    "Any branded track prize ideas you'd want us to underwrite",
    "Distribution: how attendees hear about it",
  ],
  provides: [
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
  ],
  steps: [
    { n: 1, label: "Apply", body: "Fill the form below. Two-minute job." },
    { n: 2, label: "Intake call", body: "30-minute call to align on tier, theme, and partner stack." },
    { n: 3, label: "Onboarding", body: "Credits provisioned, content shared, engineer scheduled if applicable." },
    { n: 4, label: "Event", body: "We show up; you run the show. Helpdesk, judging, photos." },
    { n: 5, label: "Recap", body: "Post-event summary, attendee survey, and a path back for the next one." },
  ],
  tierOptions: ["Partner-led", "Community", "Credit-only", "Not sure yet"],
  needsOptions: [
    "Token Factory credits",
    "On-site engineer",
    "Workshop content",
    "Branded track prize",
    "Discord support",
    "Theme & criteria help",
  ],
};

const workshop: EventConfig = {
  hero: {
    headline: "Run a workshop.",
    underline: "We bring the curriculum.",
    body:
      "For instructors and meetup leads teaching working developers. Pick a category — Themed series, One-off, or Embedded — and we'll supply credits, ready-to-run content, and an engineer to co-deliver if you want one. You bring the room; we bring the runbook.",
  },
  tiers: [
    {
      name: "Themed series",
      touch: "Recurring",
      body:
        "Five or more sessions over a quarter on one technical arc — e.g., agents from zero to production. We commit a content track, an engineer for roughly half the sessions, and underwrite credits for every attendee across the series.",
      bestFor:
        "Universities, code clubs, and meetups that already meet on a schedule and want a curriculum that holds together over months.",
      perks: [
        "Credits across all sessions, per-attendee",
        "Engineer co-delivers ~half the sessions",
        "Curriculum arc designed jointly",
        "Series promo on /events + featured slot in /library after each session",
      ],
      highlight: true,
    },
    {
      name: "One-off",
      touch: "Single session",
      body:
        "A single 2–4 hour workshop on one technical objective — fine-tune a model, build a RAG agent, ship a vLLM endpoint. We supply pre-built content and per-attendee credits; an engineer drops in if the schedule works.",
      bestFor:
        "Standalone teach-ins, lunch-and-learns, and one-shot workshops at a partner office or a meetup that wants a deeper format than a talk.",
      perks: [
        "Pre-built deck + runnable notebooks",
        "Per-attendee Token Factory credit codes",
        "Optional engineer drop-in",
        "Recording + edit if you record it",
      ],
    },
    {
      name: "Embedded",
      touch: "Slot inside another event",
      body:
        "A workshop slot inside a larger partner event — a hackathon kickoff, a conference track, a partner's user-day. We hand you ready-to-run content and a credit code; you deliver it.",
      bestFor:
        "Hackathon organizers running their own kickoff workshop, conference track leads, partner DevRel teams.",
      perks: [
        "Plug-and-play deck + notebook",
        "Credit code for the room",
        "Discord channel for follow-up Q&A",
      ],
    },
  ],
  criteria: [
    {
      title: "Working developers, not first-coders",
      body: "Devs, ML engineers, technical founders, or grad students. The format assumes shell + Python familiarity.",
    },
    {
      title: "50+ registrants minimum",
      body: "Workshops below this size are great — but we point you at the Embedded category and a credit code instead.",
    },
    {
      title: "One technical objective",
      body: "One model, one library, or one workflow per workshop. Two-objective sessions overrun and lose people in the middle.",
    },
    {
      title: "2–4 hours with hands-on time",
      body: "At least half the time is keyboard-on-the-table. Pure-talk formats live at /events as Talks, not workshops.",
    },
    {
      title: "Recording rights to publish",
      body: "If you record it, we want permission to edit and publish to the library. Attendees get the recording for free either way.",
    },
  ],
  preCall: [
    "In-person, online, or hybrid — and which platform if online",
    "Audience: working devs, ML engineers, founders, students, mixed",
    "The single technical objective for the session(s)",
    "Room AV + attendee notebook setup (will they have laptops?)",
    "Recording + publish-to-library permission",
    "Prior workshops you've taught — links if you have them",
  ],
  provides: [
    {
      title: "Token Factory credits",
      body: "Per-attendee codes, scaled to session length, covering hands-on time + a few days of post-workshop tinkering.",
    },
    {
      title: "Content templates",
      body: "Pre-built decks + runnable Jupyter / Colab notebooks for the most common topics. Adapt or use as-is.",
    },
    {
      title: "Engineer to co-deliver",
      body: "Optional. A Nebius engineer co-leads the hands-on portion or runs Q&A while you teach.",
    },
    {
      title: "Recording + edit",
      body: "If you record it, we'll cut it down, add chapters, and publish it under your byline.",
    },
    {
      title: "Library publish",
      body: "Post the finished recording + materials to /library so future builders can run it themselves.",
    },
    {
      title: "Discord support",
      body: "Channel for the cohort during the workshop and for ~2 weeks of follow-up questions afterward.",
    },
  ],
  steps: [
    { n: 1, label: "Apply", body: "Fill the form below. Two-minute job." },
    { n: 2, label: "Intake call", body: "30-minute call to align on category, topic, and audience." },
    { n: 3, label: "Content prep", body: "Templates shared, credits provisioned, engineer scheduled if applicable." },
    { n: 4, label: "Workshop", body: "You teach; we run the helpdesk. Recording happens here if you want one." },
    { n: 5, label: "Publish to library", body: "Edit, byline, and a link in /library so the work compounds." },
  ],
  tierOptions: ["Themed series", "One-off", "Embedded", "Not sure yet"],
  needsOptions: [
    "Token Factory credits",
    "Content templates",
    "Engineer to co-deliver",
    "Recording + edit",
    "Library publish",
    "Discord support",
  ],
};

const configs: Record<EventType, EventConfig> = { hackathon, workshop };

export function AmbassadorsApp() {
  const [tab, setTab] = useState<EventType>("hackathon");
  const cfg = configs[tab];
  const liveTabClass =
    "rounded-pill border px-5 py-2 text-sm font-semibold transition-colors";

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
              Ambassador program · {tab === "hackathon" ? "Hackathon" : "Workshop"} support
            </p>
            <h1 className="h-display max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 dark:text-ink-50 sm:text-6xl lg:text-7xl">
              {cfg.hero.headline}{" "}
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-lime/80" aria-hidden />
                <span className="relative">{cfg.hero.underline}</span>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-xl text-ink-600 dark:text-ink-300">{cfg.hero.body}</p>
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

        {/* Tab control */}
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              Event type
            </p>
            <div role="tablist" aria-label="Event type" className="flex flex-wrap gap-2">
              <button
                role="tab"
                aria-selected={tab === "hackathon"}
                aria-controls="ambassadors-panel"
                onClick={() => setTab("hackathon")}
                className={cn(
                  liveTabClass,
                  tab === "hackathon"
                    ? "border-navy-700 bg-navy-700 text-white dark:border-lime dark:bg-lime dark:text-navy-700"
                    : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:text-ink-900 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:hover:border-ink-600 dark:hover:text-ink-50",
                )}
              >
                Hackathons
              </button>
              <button
                role="tab"
                aria-selected={tab === "workshop"}
                aria-controls="ambassadors-panel"
                onClick={() => setTab("workshop")}
                className={cn(
                  liveTabClass,
                  tab === "workshop"
                    ? "border-navy-700 bg-navy-700 text-white dark:border-lime dark:bg-lime dark:text-navy-700"
                    : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:text-ink-900 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:hover:border-ink-600 dark:hover:text-ink-50",
                )}
              >
                Workshops
              </button>
            </div>
          </div>
        </section>

        <div role="tabpanel" id="ambassadors-panel">
          {/* Tiers */}
          <Section bg="tint">
            <SectionHeader
              eyebrow={
                tab === "hackathon" ? "Three tiers" : "Three categories"
              }
              title={
                tab === "hackathon"
                  ? "Pick how involved you want us to be."
                  : "Pick the shape that matches your room."
              }
              body={
                tab === "hackathon"
                  ? "Same credits per dollar at every tier — the difference is people, prizes, and on-the-ground presence."
                  : "Same support model under the hood — the difference is cadence and how much we deliver vs. you teach."
              }
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {cfg.tiers.map((t) => (
                <div
                  key={t.name}
                  className={cn(
                    "flex h-full flex-col gap-4 rounded-card border bg-white p-7 transition-colors dark:bg-ink-900",
                    t.highlight
                      ? "border-navy-700 ring-2 ring-lime/40 dark:border-lime"
                      : "border-ink-200 hover:border-ink-300 dark:border-ink-700 dark:hover:border-ink-600",
                  )}
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
                  <a href="#apply" className="btn-navy mt-auto self-start">
                    Apply →
                  </a>
                </div>
              ))}
            </div>
          </Section>

          {/* Criteria */}
          <Section id="criteria">
            <SectionHeader
              eyebrow="Selection criteria"
              title={
                tab === "hackathon" ? "Who we say yes to." : "What makes a workshop a fit."
              }
              body={
                tab === "hackathon"
                  ? "Hard rules, written down so we don't waste your time on a call where the answer was already no."
                  : "Hard rules, written down so we don't waste your time on a call where the answer was already no."
              }
            />
            <ol className={cn("grid gap-6", cfg.criteria.length > 4 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2")}>
              {cfg.criteria.map((c, i) => (
                <li
                  key={c.title}
                  className="rounded-card border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900"
                >
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
            <div className="grid gap-3 md:grid-cols-2">
              {cfg.preCall.map((q, i) => (
                <div
                  key={q}
                  className="flex gap-3 rounded-card border border-ink-200 bg-white px-5 py-4 text-sm text-ink-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
                >
                  <span className="font-mono text-xs text-navy-700 dark:text-lime">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {q}
                </div>
              ))}
            </div>
          </Section>

          {/* What we provide */}
          <Section>
            <SectionHeader
              eyebrow="What we provide"
              title={
                tab === "hackathon"
                  ? "Six things, depending on tier."
                  : "Six things, depending on category."
              }
              body={
                tab === "hackathon"
                  ? "Everything below is on the table at Partner-led; tiers below pick a subset that fits the format."
                  : "Everything below is on the table for Themed series; categories below pick a subset that fits the format."
              }
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cfg.provides.map((p) => (
                <div
                  key={p.title}
                  className="rounded-card border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900"
                >
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
              title={
                tab === "hackathon" ? "From application to recap." : "From application to library."
              }
              body={
                tab === "hackathon"
                  ? "Five steps. About four to six weeks end to end if you're starting from a blank page."
                  : "Five steps. About three to five weeks end to end if you're starting from a blank page."
              }
            />
            <ol className="grid gap-4 md:grid-cols-5">
              {cfg.steps.map((s) => (
                <li
                  key={s.n}
                  className="rounded-card border border-ink-200 bg-white p-5 dark:border-ink-700 dark:bg-ink-900"
                >
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
              body={
                tab === "hackathon"
                  ? "Answers go to hackathons@nebius.com. We reply within 24 hours on weekdays."
                  : "Answers go to workshops@nebius.com. We reply within 24 hours on weekdays."
              }
            />
            <form className="grid max-w-3xl gap-5">
              <input type="hidden" name="event_type" value={tab} />
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Your name" name="name" placeholder="Full name" />
                <Field label="Email" name="email" type="email" placeholder="you@example.com" />
              </div>
              <Field
                label="Organization"
                name="organization"
                placeholder="Sandbox VR SF, Stanford CodeX, …"
              />
              <SelectField
                label={tab === "hackathon" ? "Tier you're applying for" : "Category you're applying for"}
                name="tier"
                options={cfg.tierOptions}
              />
              <div className="grid gap-5 md:grid-cols-3">
                <Field
                  label="Date or window"
                  name="when"
                  placeholder={tab === "hackathon" ? "Sep 12–14, 2026" : "Tue Sep 30, 6–8pm PT"}
                />
                <Field
                  label="City"
                  name="where"
                  placeholder={tab === "hackathon" ? "SF · NYC · London · …" : "SF · NYC · Online · …"}
                />
                <Field
                  label={tab === "hackathon" ? "Attendee count" : "Registrant count"}
                  name="attendees"
                  type="number"
                  placeholder={tab === "hackathon" ? "120" : "75"}
                />
              </div>
              {tab === "hackathon" ? (
                <Field
                  label="Confirmed partner companies"
                  name="partners"
                  placeholder="Comma-separated, e.g. Tavily, Mem0, Composio"
                />
              ) : (
                <Field
                  label="Topic / single technical objective"
                  name="topic"
                  placeholder="e.g. Fine-tune Gemma 4 with QLoRA on a 1B-parameter checkpoint"
                />
              )}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                  What you need from us
                </p>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {cfg.needsOptions.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
                    >
                      <input
                        type="checkbox"
                        name="needs"
                        value={opt}
                        className="accent-lime"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
              <Field
                label={
                  tab === "hackathon"
                    ? "Have you run a hackathon before? (optional)"
                    : "Have you taught a workshop before? (optional)"
                }
                name="prior"
                placeholder={
                  tab === "hackathon"
                    ? "Drop a Luma link or a one-liner"
                    : "Drop a recording link or a one-liner"
                }
              />
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button type="submit" className="btn-lime">
                  Submit application →
                </button>
                <p className="text-xs text-ink-500 dark:text-ink-400">
                  Demo form — no backend wired. Send the same answers to{" "}
                  <a
                    className="font-medium text-navy-700 underline-offset-4 hover:underline dark:text-lime"
                    href={
                      tab === "hackathon"
                        ? "mailto:hackathons@nebius.com"
                        : "mailto:workshops@nebius.com"
                    }
                  >
                    {tab === "hackathon" ? "hackathons@nebius.com" : "workshops@nebius.com"}
                  </a>
                  .
                </p>
              </div>
            </form>
          </Section>
        </div>

        <ProductCTA
          title={
            tab === "hackathon" ? "Not sure which tier fits?" : "Not sure which category fits?"
          }
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
      <input type={type} name={name} placeholder={placeholder} className="input" />
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
