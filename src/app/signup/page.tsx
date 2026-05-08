import Link from "next/link";
import { TopNav } from "@/components/nav";
import { Footer } from "@/components/footer";

const stats = [
  { label: "+5 pts", desc: "Just for signing up" },
  { label: "+10 pts", desc: "Connect GitHub (one click)" },
  { label: "+50 pts", desc: "If a repo of yours already uses Nebius" },
  { label: "+25 pts", desc: "Claim $100 of Token Factory credits" },
  { label: "+25 pts", desc: "Apply for $100 of AI Cloud credits" },
  { label: "+$50", desc: "Sign-up credit if you came via an event" },
];

export default function SignupPage() {
  return (
    <>
      <TopNav />
      <main className="bg-white dark:bg-ink-900">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
          <div className="absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-lime/40 blur-3xl" aria-hidden />
          <div className="container-page relative grid gap-10 py-20 lg:grid-cols-2 lg:py-24">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                Sign up
              </p>
              <h1 className="h-display max-w-xl text-4xl font-bold tracking-tight md:text-5xl">
                Join the Nebius Builders Network
              </h1>
              <p className="mt-5 max-w-lg text-lg text-ink-600 dark:text-ink-300">
                Sign up takes 90 seconds. We'll auto-detect any of your public GitHub repos that
                use Nebius and credit you 50 points immediately.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {stats.map((s) => (
                  <div
                    key={s.desc}
                    className="flex items-center gap-3 rounded-card border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 py-3"
                  >
                    <span className="min-w-[64px] text-base font-bold text-navy-700 dark:text-lime">{s.label}</span>
                    <span className="text-sm text-ink-700 dark:text-ink-200">{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-card border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 p-8 shadow-soft">
                <h2 className="text-xl font-semibold">Pick a sign-in method</h2>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
                  We use OAuth so you don't have to remember another password. GitHub connect counts
                  for points immediately.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <Link href="/builders/login" className="btn-lime w-full justify-center">
                    Sign up with GitHub →
                  </Link>
                  <Link href="/builders/login" className="btn-outline w-full justify-center">
                    Continue with Google
                  </Link>
                  <Link href="/builders/login" className="btn-outline w-full justify-center">
                    Continue with LinkedIn
                  </Link>
                </div>

                <div className="mt-6 border-t border-ink-200 dark:border-ink-700 pt-5">
                  <p className="text-xs text-ink-500 dark:text-ink-400">
                    Or sign in with{" "}
                    <Link href="/builders/login" className="font-medium text-navy-700 dark:text-lime underline-offset-4 hover:underline">
                      email magic link
                    </Link>
                    .
                  </p>
                </div>

                <p className="mt-4 text-xs text-ink-500 dark:text-ink-400">
                  By signing up you agree to the{" "}
                  <a
                    href="https://nebius.com"
                    className="font-medium text-navy-700 dark:text-lime underline-offset-4 hover:underline"
                  >
                    Nebius Terms
                  </a>
                  .
                </p>
              </div>

              <div className="mt-6 rounded-card border border-ink-200 dark:border-ink-700 bg-navy-700 p-6 text-white">
                <p className="text-sm font-semibold">Already a builder?</p>
                <p className="mt-2 text-sm text-ink-100">
                  Open your portal to track points, claim credits, and submit content.
                </p>
                <Link href="/builders/login" className="btn-lime mt-4">
                  Open the portal →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
