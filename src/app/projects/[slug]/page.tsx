import Link from "next/link";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Avatar } from "@/components/avatar";
import { findProject, projectAuthorRoleLabel, projects } from "@/lib/projects";
import { formatProductFocus } from "@/lib/library";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = findProject(params.slug);
  if (!project) return notFound();

  return (
    <>
      <TopNav />
      <main>
        <section
          className={`border-b border-ink-200 dark:border-ink-700 bg-gradient-to-br ${project.cover}`}
        >
          <div className="container-page py-20">
            <Link
              href="/projects"
              className="text-sm text-ink-700 hover:text-ink-900 dark:text-ink-200 dark:hover:text-ink-50"
            >
              ← All projects
            </Link>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="pill bg-white/90 text-navy-700 dark:bg-ink-900/90 dark:text-ink-50">
                {formatProductFocus(project.productFocus)}
              </span>
              {project.awards?.map((a, i) => (
                <span key={i} className="pill bg-lime text-navy-700">
                  ★ {a.label}
                </span>
              ))}
            </div>
            <h1 className="h-display mt-5 max-w-4xl text-4xl font-bold tracking-tight text-ink-900 md:text-6xl dark:text-ink-50">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-xl text-ink-700 dark:text-ink-200">{project.lede}</p>
          </div>
        </section>

        <section className="bg-white dark:bg-ink-900">
          <div className="container-page grid gap-10 py-16 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
                About this project
              </h2>
              <p className="mt-3 whitespace-pre-line text-ink-700 dark:text-ink-200">
                {project.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                {project.demoUrl ? (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-lime">
                    Open demo →
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-outline">
                    View on GitHub ↗
                  </a>
                ) : null}
                {project.videoUrl ? (
                  <a href={project.videoUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                    Watch demo video ↗
                  </a>
                ) : null}
              </div>

              <div className="mt-12">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                  Technologies
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li key={t} className="pill-outline">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="card">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                  Builders
                </h3>
                <ul className="mt-4 space-y-3">
                  {project.authors.map((a) => (
                    <li key={a.handle} className="flex items-center gap-3">
                      <Avatar name={a.name} handle={a.handle} size={40} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink-900 dark:text-ink-50">
                          {a.name}
                        </p>
                        <p className="truncate text-xs text-ink-500 dark:text-ink-400">
                          @{a.handle} · {projectAuthorRoleLabel(a.role)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {project.eventTitle ? (
                <div className="card">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                    Shipped at
                  </h3>
                  <p className="mt-3 text-ink-900 dark:text-ink-50">{project.eventTitle}</p>
                  <Link
                    href="/events"
                    className="mt-3 inline-block text-sm font-medium text-navy-700 underline-offset-4 hover:underline dark:text-lime"
                  >
                    See more events →
                  </Link>
                </div>
              ) : null}
              <div className="card bg-navy-700 text-white">
                <p className="text-sm font-semibold">Ship one of your own.</p>
                <p className="mt-2 text-sm text-ink-100">
                  Sign up, claim $200 of intro credits, and submit your project to the showcase.
                </p>
                <Link href="/signup" className="btn-lime mt-4 w-full">
                  Sign up →
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
