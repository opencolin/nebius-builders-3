import Link from "next/link";
import { Avatar } from "@/components/avatar";
import type { Project } from "@/lib/projects";
import { formatProductFocus } from "@/lib/library";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-card border border-ink-200 bg-white transition-all hover:border-ink-300 hover:shadow-soft dark:border-ink-700 dark:bg-ink-900 dark:hover:border-ink-600 ${featured ? "md:flex-row" : ""}`}
    >
      <div
        className={`relative aspect-video bg-gradient-to-br ${project.cover} ${featured ? "md:aspect-auto md:w-1/2" : ""}`}
      >
        {project.awards?.length ? (
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {project.awards.map((a, i) => (
              <span key={i} className="pill bg-lime text-navy-700">
                ★ {a.label}
              </span>
            ))}
          </div>
        ) : null}
        <div className="absolute right-3 top-3 pill bg-white/90 text-navy-700 dark:bg-ink-900/90 dark:text-ink-50">
          {formatProductFocus(project.productFocus)}
        </div>
      </div>
      <div className={`flex flex-1 flex-col p-6 ${featured ? "md:p-8" : ""}`}>
        {project.eventTitle ? (
          <p className="text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
            {project.eventTitle}
          </p>
        ) : null}
        <h3
          className={`mt-2 font-semibold leading-snug text-ink-900 group-hover:text-navy-700 dark:text-ink-50 dark:group-hover:text-lime ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mt-3 text-sm text-ink-600 dark:text-ink-300 ${
            featured ? "line-clamp-4" : "line-clamp-3"
          }`}
        >
          {project.lede}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, featured ? 6 : 4).map((t) => (
            <span key={t} className="pill-outline">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink-200 pt-4 text-xs text-ink-500 dark:border-ink-800 dark:text-ink-400">
          <div className="flex items-center -space-x-2">
            {project.authors.slice(0, 3).map((a) => (
              <Avatar key={a.handle} name={a.name} handle={a.handle} size={28} className="ring-2 ring-white dark:ring-ink-900" />
            ))}
            <span className="ml-3 truncate text-ink-700 dark:text-ink-200">
              {project.authors.map((a) => a.name).join(", ")}
            </span>
          </div>
          <span className="shrink-0 font-medium">
            {project.authors.some((a) => a.role === "ambassador")
              ? "Ambassador"
              : project.authors.some((a) => a.role === "advocate")
              ? "Nebius DevRel"
              : "Builder"}
          </span>
        </div>
      </div>
    </Link>
  );
}
