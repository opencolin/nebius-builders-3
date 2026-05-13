"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "nb-mockup-seen";

export function MockupReviewModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const seen = window.localStorage.getItem(STORAGE_KEY);
      if (!seen) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!mounted || !open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mockup-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-6 py-12"
    >
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-card border border-ink-200 bg-white shadow-soft dark:border-ink-700 dark:bg-ink-900">
        <div className="relative border-b border-ink-200 bg-lime/30 px-7 py-6 dark:border-ink-700 dark:bg-lime/10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-700 dark:text-lime">
            Heads up
          </p>
          <h2
            id="mockup-modal-title"
            className="mt-2 text-2xl font-bold text-ink-900 dark:text-ink-50 sm:text-3xl"
          >
            Mock-up for review.
          </h2>
        </div>
        <div className="space-y-4 px-7 py-6 text-sm text-ink-700 dark:text-ink-200">
          <p>
            This is a working prototype of the Nebius Builders site — not a live Nebius product.
            Copy, structure, and numbers are placeholders meant to give the team something concrete
            to react to.
          </p>
          <p>
            Forms are demo-only (no real sign-ups, no real emails, no real credits). Click around,
            poke at the rough edges, then leave feedback using the button in the bottom-right of
            any page.
          </p>
          <ul className="grid gap-1.5 text-xs text-ink-600 dark:text-ink-300">
            <li>· Built on Next.js 14 + Tailwind, deployed on Vercel.</li>
            <li>· Dark mode toggle in the top right; defaults to your system preference.</li>
            <li>· Feedback button stores comments tied to whichever page you were on.</li>
          </ul>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-ink-200 bg-ink-50 px-7 py-4 dark:border-ink-700 dark:bg-ink-800">
          <button
            type="button"
            onClick={dismiss}
            className="btn-lime"
            autoFocus
          >
            Got it — show me the site →
          </button>
        </div>
      </div>
    </div>
  );
}
