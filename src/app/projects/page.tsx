import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { ProjectsBrowser } from "@/components/projects-browser";
import { projects } from "@/lib/projects";
import { formatNumber } from "@/lib/network";

export default function ProjectsIndex() {
  const featured = projects.find((p) => p.awards?.length) ?? projects[0];
  const stats = {
    total: projects.length,
    awarded: projects.filter((p) => p.awards?.length).length,
    builders: new Set(projects.flatMap((p) => p.authors.map((a) => a.handle))).size,
    techs: new Set(projects.flatMap((p) => p.technologies)).size,
  };

  return (
    <>
      <TopNav />
      <main>
        <section className="border-b border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900">
          <div className="container-page py-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Projects
            </p>
            <h1 className="h-display text-4xl font-bold tracking-tight md:text-5xl">
              What builders shipped on Nebius.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
              A live showcase of projects from Nebius Builders, Ambassadors, and the team —
              hack nights, hackathons, demo nights, and side projects shipped with Token Factory,
              AI Cloud, Soperator, and OpenClaw.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-lime text-sm">
                Submit a project →
              </Link>
              <Link href="/events" className="btn-outline text-sm">
                Find an event to ship at
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
              {[
                ["Projects shipped", formatNumber(stats.total)],
                ["Awarded", formatNumber(stats.awarded)],
                ["Builders represented", formatNumber(stats.builders)],
                ["Technologies", formatNumber(stats.techs)],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                    {label}
                  </dt>
                  <dd className="mt-2 text-3xl font-bold text-navy-700 dark:text-lime">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section bg-ink-50 dark:bg-ink-800">
          <div className="container-page">
            <div className="mb-12">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                Featured
              </p>
              <ProjectCard project={featured} featured />
            </div>
            <ProjectsBrowser />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
