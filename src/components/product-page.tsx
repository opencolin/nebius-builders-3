import Link from "next/link";
import { Section, SectionHeader } from "@/components/section";
import { cn } from "@/lib/utils";

export type ProductLink = {
  label: string;
  href: string;
  external?: boolean;
};

export function ProductHero({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  bullets,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  primary: ProductLink;
  secondary?: ProductLink;
  bullets?: string[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
      <div className="absolute inset-0 grid-bg opacity-60 dark:opacity-100" aria-hidden />
      <div className="absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-lime/40 blur-3xl dark:bg-lime/20" aria-hidden />
      <div className="container-page relative pt-20 pb-24 sm:pt-24 sm:pb-28">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
          {eyebrow}
        </p>
        <h1 className="h-display max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 dark:text-ink-50 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-600 dark:text-ink-300">{body}</p>
        {bullets?.length ? (
          <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex gap-2 text-sm text-ink-700 dark:text-ink-200"
              >
                <span className="text-navy-700 dark:text-lime">●</span>
                {b}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <CtaLink {...primary} variant="primary" />
          {secondary ? <CtaLink {...secondary} variant="secondary" /> : null}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({
  title,
  body,
  links,
  highlight,
}: {
  title: string;
  body: string;
  links?: ProductLink[];
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-3 rounded-card border bg-white p-6 transition-colors dark:bg-ink-900 dark:hover:border-ink-600",
        highlight
          ? "border-navy-700 ring-2 ring-lime/40 dark:border-lime"
          : "border-ink-200 hover:border-ink-300 dark:border-ink-700",
      )}
    >
      <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{title}</h3>
      <p className="flex-1 text-sm text-ink-600 dark:text-ink-300">{body}</p>
      {links?.length ? (
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-ink-200 pt-4 text-sm dark:border-ink-800">
          {links.map((l, i) => (
            <CtaLink key={l.href + i} {...l} variant={i === 0 ? "primaryLink" : "secondaryLink"} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ProductGrid({
  title,
  body,
  eyebrow,
  cards,
  cols = 3,
  bg,
}: {
  title: string;
  body?: string;
  eyebrow?: string;
  cards: { title: string; body: string; links?: ProductLink[]; highlight?: boolean }[];
  cols?: 2 | 3 | 4;
  bg?: "white" | "tint";
}) {
  const colsClass = cols === 4 ? "lg:grid-cols-4" : cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <Section bg={bg ?? "white"}>
      <SectionHeader eyebrow={eyebrow ?? ""} title={title} body={body} />
      <div className={cn("grid gap-6 md:grid-cols-2", colsClass)}>
        {cards.map((c) => (
          <ProductCard key={c.title} {...c} />
        ))}
      </div>
    </Section>
  );
}

function CtaLink({ label, href, external, variant }: ProductLink & { variant: "primary" | "secondary" | "primaryLink" | "secondaryLink" }) {
  const isExternal = external ?? href.startsWith("http");
  const cls =
    variant === "primary"
      ? "btn-lime px-6 py-3 text-sm"
      : variant === "secondary"
      ? "btn-outline px-6 py-3 text-sm"
      : variant === "primaryLink"
      ? "font-semibold text-navy-700 underline-offset-4 hover:underline dark:text-lime"
      : "text-ink-600 underline-offset-4 hover:text-ink-900 hover:underline dark:text-ink-300 dark:hover:text-ink-50";
  const arrow = isExternal ? "↗" : "→";
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {label} {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label} {arrow}
    </Link>
  );
}

export function ProductCTA({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: ProductLink;
  secondary?: ProductLink;
}) {
  return (
    <section className="border-t border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
      <div className="container-page py-20 text-center">
        <h2 className="h-display text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50 md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">{body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaLink {...primary} variant="primary" />
          {secondary ? <CtaLink {...secondary} variant="secondary" /> : null}
        </div>
      </div>
    </section>
  );
}
