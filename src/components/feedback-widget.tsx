"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "done" | "error";

const STORAGE_KEY = "nb-feedback-meta";

type Meta = { name: string; email: string };

function readMeta(): Meta {
  if (typeof window === "undefined") return { name: "", email: "" };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { name: "", email: "" };
    const parsed = JSON.parse(raw);
    return {
      name: typeof parsed?.name === "string" ? parsed.name : "",
      email: typeof parsed?.email === "string" ? parsed.email : "",
    };
  } catch {
    return { name: "", email: "" };
  }
}

function writeMeta(meta: Meta) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(meta));
  } catch {
    /* ignore */
  }
}

export function FeedbackWidget() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [persisted, setPersisted] = useState<boolean | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
    const meta = readMeta();
    setName(meta.name);
    setEmail(meta.email);
  }, []);

  useEffect(() => {
    if (open) {
      // Focus textarea when the panel opens
      const t = setTimeout(() => textareaRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
    // Reset success/error state when the user closes the panel
    if (status === "done" || status === "error") {
      const t = setTimeout(() => {
        setStatus("idle");
        setError(null);
        setBody("");
        setPersisted(null);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [open, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) {
      setError("Add a comment before submitting.");
      setStatus("error");
      return;
    }
    if (email && !email.includes("@")) {
      setError("Email looks off.");
      setStatus("error");
      return;
    }
    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pagePath: pathname, body: body.trim(), name: name.trim(), email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data?.error === "string" ? data.error : `HTTP ${res.status}`);
        setStatus("error");
        return;
      }
      // Persist name/email for next time so the user doesn't retype
      if (name || email) writeMeta({ name: name.trim(), email: email.trim() });
      setPersisted(Boolean(data?.persisted));
      setStatus("done");
    } catch (err: any) {
      setError(err?.message ?? "Network error");
      setStatus("error");
    }
  }

  if (!mounted) return null;

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="feedback-panel"
        aria-label={open ? "Close feedback panel" : "Open feedback panel"}
        className="fixed bottom-5 right-5 z-[90] inline-flex h-12 items-center gap-2 rounded-pill border border-navy-700 bg-navy-700 px-5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 dark:border-lime dark:bg-lime dark:text-navy-700 dark:focus-visible:ring-lime dark:focus-visible:ring-offset-ink-900 sm:bottom-6 sm:right-6"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {open ? (
            <path d="M6 6l12 12M6 18L18 6" />
          ) : (
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          )}
        </svg>
        {open ? "Close" : "Feedback"}
      </button>

      {/* Panel */}
      <div
        id="feedback-panel"
        role="dialog"
        aria-label="Page feedback"
        className={cn(
          "fixed bottom-20 right-5 z-[95] w-[min(380px,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-card border border-ink-200 bg-white shadow-soft transition-all duration-200 dark:border-ink-700 dark:bg-ink-900 sm:bottom-24 sm:right-6",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <div className="border-b border-ink-200 bg-ink-50 px-5 py-4 dark:border-ink-700 dark:bg-ink-800">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-700 dark:text-lime">
            Feedback
          </p>
          <h3 className="mt-1 text-base font-semibold text-ink-900 dark:text-ink-50">
            What's on this page?
          </h3>
          <p className="mt-1 text-xs text-ink-600 dark:text-ink-300">
            Tied to{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[11px] text-ink-900 dark:bg-ink-900 dark:text-ink-50">
              {pathname}
            </code>
            . Anything — bug, copy, suggestion.
          </p>
        </div>

        {status === "done" ? (
          <div className="space-y-3 px-5 py-5 text-sm text-ink-700 dark:text-ink-200">
            <p className="font-semibold text-ink-900 dark:text-ink-50">Thanks — got it.</p>
            <p>
              {persisted
                ? "Saved to the database. The team will see it next time they sweep the feedback queue."
                : "Logged for the team (database not connected on this preview — comments will still reach us)."}
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setBody("");
                setPersisted(null);
              }}
              className="btn-outline text-xs"
            >
              Leave another →
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3 px-5 py-5">
            <label className="block">
              <span className="sr-only">Feedback</span>
              <textarea
                ref={textareaRef}
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setError(null);
                  }
                }}
                placeholder="What's broken, what's confusing, what's missing…"
                rows={4}
                maxLength={5000}
                className="block w-full resize-y rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50 dark:placeholder:text-ink-500 dark:focus:border-lime dark:focus:ring-lime/30"
              />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="block">
                <span className="sr-only">Name (optional)</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name (optional)"
                  maxLength={80}
                  className="input text-sm"
                />
              </label>
              <label className="block">
                <span className="sr-only">Email (optional)</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                  maxLength={200}
                  className="input text-sm"
                />
              </label>
            </div>
            {error ? (
              <p
                role="alert"
                className="text-xs font-medium text-red-600 dark:text-red-400"
              >
                {error}
              </p>
            ) : null}
            <div className="flex items-center justify-between gap-3 pt-1">
              <p className="text-[11px] text-ink-500 dark:text-ink-400">
                {body.length}/5000
              </p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-lime text-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
