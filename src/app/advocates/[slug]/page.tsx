import Link from "next/link";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Avatar } from "@/components/avatar";
import { advocates, findAdvocate } from "@/lib/advocates";

export function generateStaticParams() {
  return advocates.map((a) => ({ slug: a.slug }));
}

export default function AdvocateDetail({ params }: { params: { slug: string } }) {
  const adv = findAdvocate(params.slug);
  if (!adv) return notFound();

  return (
    <>
      <TopNav />
      <main className="bg-white">
        <section className="container-page pt-12 pb-6">
          <Link href="/advocates" className="text-sm text-ink-500 dark:text-ink-400 hover:text-ink-700">
            ← All advocates
          </Link>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
            <Avatar name={adv.name} handle={adv.githubHandle ?? adv.slug} size={104} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                {adv.title.replace(", Nebius", "")} · {adv.region}
              </p>
              <h1 className="h-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                {adv.name}
              </h1>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {adv.expertise.map((e) => (
                  <span key={e} className="pill-outline">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-page grid gap-8 pb-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-lg font-semibold">About</h2>
              <p className="mt-3 whitespace-pre-line text-ink-700 dark:text-ink-200">{adv.bio}</p>
            </div>
            <div className="card mt-6">
              <h2 className="text-lg font-semibold">What to talk about</h2>
              <ul className="mt-3 grid gap-2 text-sm text-ink-700 dark:text-ink-200">
                <li>• Setting up a Nebius event in your city — meetup, hackathon, workshop, demo night</li>
                <li>• Picking a Token Factory model for your use case</li>
                <li>• AI Cloud onboarding — VMs, K8s, Soperator, GPU sizing</li>
                <li>• Submitting content to the library and getting feedback</li>
                <li>• Becoming a Nebius Ambassador</li>
              </ul>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="card">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                Reach out
              </h3>
              <dl className="mt-3 space-y-2 text-sm">
                {adv.email ? (
                  <Field label="Email" value={adv.email} href={`mailto:${adv.email}`} />
                ) : null}
                {adv.calendlyUrl ? (
                  <Field label="Calendly" value="Book 15 min →" href={adv.calendlyUrl} external />
                ) : null}
                {adv.githubHandle ? (
                  <Field
                    label="GitHub"
                    value={`@${adv.githubHandle}`}
                    href={`https://github.com/${adv.githubHandle}`}
                    external
                  />
                ) : null}
                {adv.twitterHandle ? (
                  <Field
                    label="X / Twitter"
                    value={`@${adv.twitterHandle}`}
                    href={`https://twitter.com/${adv.twitterHandle}`}
                    external
                  />
                ) : null}
                <Field label="Timezone" value={adv.timezone} />
                <Field label="Languages" value={adv.languages.join(", ").toUpperCase()} />
              </dl>
            </div>
            {adv.calendlyUrl ? (
              <div className="card bg-navy-700 text-white">
                <p className="text-sm font-semibold">15-minute office hours.</p>
                <p className="mt-2 text-sm text-ink-100">
                  Bring an ambition and {adv.name.split(" ")[0]} will help you scope it.
                </p>
                <Link href={adv.calendlyUrl} className="btn-lime mt-4 w-full">
                  Pick a time →
                </Link>
              </div>
            ) : null}
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink-500 dark:text-ink-400">{label}</dt>
      <dd className="text-right text-ink-900 dark:text-ink-50">
        {href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="font-medium text-navy-700 dark:text-lime underline-offset-4 hover:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
