import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section, SectionHeader } from "@/components/section";
import { Avatar } from "@/components/avatar";
import { BuilderEventCard } from "@/components/builder-event-card";
import { advocates, findAdvocate } from "@/lib/advocates";
import {
  officeHoursSlots,
  officeHoursFaq,
} from "@/lib/office-hours";
import { publishedBuilderEvents } from "@/lib/builder-events";

export const metadata = {
  title: "Office hours — Nebius Builders",
  description:
    "Weekly 1:1 office hours with the Nebius Builders team plus open public office-hours events. Bring a specific question, leave unblocked.",
};

export default function OfficeHoursPage() {
  const upcomingPublic = publishedBuilderEvents().filter(
    (e) => e.format === "OFFICE_HOURS",
  );

  return (
    <>
      <TopNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="absolute inset-0 grid-bg opacity-60 dark:opacity-100" aria-hidden />
          <div className="absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-lime/40 blur-3xl dark:bg-lime/20" aria-hidden />
          <div className="container-page relative pt-20 pb-20 sm:pt-24">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-navy-700 dark:text-lime">
              Office hours
            </p>
            <h1 className="h-display max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 dark:text-ink-50 sm:text-6xl lg:text-7xl">
              Drop in.{" "}
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-lime/80" aria-hidden />
                <span className="relative">Leave unblocked.</span>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-xl text-ink-600 dark:text-ink-300">
              Four weekly 1:1 slots with the Nebius Builders team — one per region — plus open
              public office-hours events. Bring a real question; we'll bring a real answer.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#book" className="btn-lime px-6 py-3.5 text-sm">
                Book a 1:1 →
              </a>
              <a href="#public" className="btn-outline px-6 py-3.5 text-sm">
                See public sessions
              </a>
              <Link href="/team" className="btn-ghost text-sm">
                Meet the team →
              </Link>
            </div>
          </div>
        </section>

        {/* Weekly 1:1 slots */}
        <Section id="book" bg="tint">
          <SectionHeader
            eyebrow="Weekly 1:1 slots"
            title="One slot per region, every week."
            body="15 minutes minimum, 60 minutes if you've got a working session in mind. Calendly takes care of time zones."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {officeHoursSlots.map((slot) => {
              const adv = findAdvocate(slot.advocateSlug);
              if (!adv) return null;
              return (
                <div
                  key={slot.advocateSlug}
                  className="flex h-full flex-col gap-5 rounded-card border border-ink-200 bg-white p-7 transition-colors hover:border-ink-300 dark:border-ink-700 dark:bg-ink-900 dark:hover:border-ink-600"
                >
                  <div className="flex items-start gap-4">
                    <Avatar
                      name={adv.name}
                      handle={adv.githubHandle ?? adv.slug}
                      size={64}
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/team/${adv.slug}`}
                        className="block text-lg font-semibold text-ink-900 hover:text-navy-700 dark:text-ink-50 dark:hover:text-lime"
                      >
                        {adv.name}
                      </Link>
                      <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                        {adv.title.replace(", Nebius", "")}
                      </p>
                      <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{adv.region}</p>
                    </div>
                  </div>

                  <dl className="grid gap-3 rounded-card border border-ink-200 bg-ink-50 p-4 text-sm dark:border-ink-700 dark:bg-ink-800">
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                        Cadence
                      </dt>
                      <dd className="font-medium text-ink-900 dark:text-ink-50">{slot.cadence}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                        Window
                      </dt>
                      <dd className="font-medium text-ink-900 dark:text-ink-50">{slot.timeWindow}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                        For
                      </dt>
                      <dd className="text-right font-medium text-ink-900 dark:text-ink-50">
                        {slot.audience}
                      </dd>
                    </div>
                  </dl>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                      In scope
                    </p>
                    <ul className="space-y-1.5 text-sm text-ink-700 dark:text-ink-200">
                      {slot.scope.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span className="text-navy-700 dark:text-lime">✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-ink-200 pt-5 dark:border-ink-700">
                    {adv.calendlyUrl ? (
                      <a
                        href={adv.calendlyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-lime text-sm"
                      >
                        Book with {adv.name.split(" ")[0]} →
                      </a>
                    ) : (
                      <span className="btn-outline pointer-events-none text-sm">
                        Calendly coming soon
                      </span>
                    )}
                    <Link
                      href={`/team/${adv.slug}`}
                      className="text-sm font-medium text-navy-700 underline-offset-4 hover:underline dark:text-lime"
                    >
                      Read bio →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Public office-hours events */}
        <Section id="public">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Public sessions"
              title="Open drop-in office hours."
              body="Recurring group office hours hosted by ambassadors and the team. Show up, ask anything, eat the pizza."
            />
            <Link href="/events" className="btn-outline">
              All events →
            </Link>
          </div>
          {upcomingPublic.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingPublic.map((e) => (
                <BuilderEventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <div className="rounded-card border border-dashed border-ink-200 bg-white p-10 text-center text-sm text-ink-500 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-400">
              No public office hours on the calendar this week. Book a 1:1 above, or follow{" "}
              <Link
                href="/events"
                className="font-medium text-navy-700 underline-offset-4 hover:underline dark:text-lime"
              >
                the full events calendar
              </Link>{" "}
              for the next one.
            </div>
          )}
        </Section>

        {/* FAQ */}
        <Section bg="tint">
          <SectionHeader
            eyebrow="FAQ"
            title="Quick answers before you book."
            body="The stuff people ask right after they click Schedule."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {officeHoursFaq.map((item) => (
              <div
                key={item.q}
                className="rounded-card border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900"
              >
                <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">{item.q}</h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{item.a}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <section className="border-t border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-20 text-center">
            <h2 className="h-display text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50 md:text-4xl">
              Can't make any of the slots?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
              Drop the question in the Discord office-hours channel. The team checks it daily and
              routes it to whoever can answer fastest.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://discord.gg/CncTn9zVzS"
                target="_blank"
                rel="noreferrer"
                className="btn-lime px-6 py-3.5"
              >
                Open Discord ↗
              </a>
              <Link href="/team" className="btn-outline px-6 py-3.5">
                Meet the team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
