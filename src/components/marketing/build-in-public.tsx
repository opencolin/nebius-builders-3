"use client";

import { useState } from "react";

export function BuildInPublic() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email.");
      setStatus("error");
      return;
    }
    setError(null);
    setStatus("submitting");
    // Demo: no backend wired. Pretend-submit so the UI flow is real.
    await new Promise((r) => setTimeout(r, 600));
    setStatus("done");
  }

  return (
    <section className="border-y border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
            Build in public
          </p>
          <h3 className="mt-1 text-xl font-semibold text-ink-900 dark:text-ink-50 sm:text-2xl">
            Builder updates in your inbox.
          </h3>
          <p className="mt-2 max-w-lg text-sm text-ink-600 dark:text-ink-300">
            Monthly digest: new workshops, library entries, builder spotlights, upcoming events,
            and what the team shipped. No marketing fluff, unsubscribe in one click.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              Also on
            </p>
            <a
              href="https://twitter.com/nebiuscloud"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-navy-700 underline-offset-4 hover:underline dark:text-lime"
            >
              X / Twitter ↗
            </a>
            <a
              href="https://linkedin.com/company/nebius"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-navy-700 underline-offset-4 hover:underline dark:text-lime"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://www.youtube.com/@nebiusofficial/videos"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-navy-700 underline-offset-4 hover:underline dark:text-lime"
            >
              YouTube ↗
            </a>
            <a
              href="https://nebius.com/blog?tags=builder-updates"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-navy-700 underline-offset-4 hover:underline dark:text-lime"
            >
              Blog ↗
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          {status === "done" ? (
            <div
              className="rounded-card border border-ink-200 bg-ink-50 px-5 py-4 text-sm dark:border-ink-700 dark:bg-ink-800"
              role="status"
              aria-live="polite"
            >
              <p className="font-semibold text-ink-900 dark:text-ink-50">You're on the list.</p>
              <p className="mt-1 text-ink-600 dark:text-ink-300">
                Watch for a confirmation email at <strong className="text-ink-900 dark:text-ink-50">{email}</strong>.
                Demo only — no real send is wired up.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") {
                      setError(null);
                      setStatus("idle");
                    }
                  }}
                  className="input flex-1"
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? "newsletter-error" : undefined}
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-lime whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "Subscribing…" : "Subscribe →"}
                </button>
              </div>
              {status === "error" && error ? (
                <p
                  id="newsletter-error"
                  className="text-xs font-medium text-red-600 dark:text-red-400"
                  role="alert"
                >
                  {error}
                </p>
              ) : (
                <p className="text-xs text-ink-500 dark:text-ink-400">
                  Monthly cadence. Unsubscribe link in every email.
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
