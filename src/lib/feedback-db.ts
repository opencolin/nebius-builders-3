// Feedback persistence — Neon Postgres via the @neondatabase/serverless driver.
// Set DATABASE_URL via the Vercel marketplace Neon integration (one-click).
// If DATABASE_URL is unset, writes log to stdout and return — the UI flow still
// completes so previews don't crash before the DB is provisioned.

import { neon } from "@neondatabase/serverless";

export type FeedbackInput = {
  pagePath: string;
  body: string;
  name?: string;
  email?: string;
  userAgent?: string;
  referrer?: string;
};

export type StoredFeedback = FeedbackInput & {
  id: number;
  createdAt: string;
};

let ensured = false;

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

async function ensureTable() {
  if (ensured) return;
  const sql = getSql();
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS feedback (
      id BIGSERIAL PRIMARY KEY,
      page_path TEXT NOT NULL,
      body TEXT NOT NULL,
      name TEXT,
      email TEXT,
      user_agent TEXT,
      referrer TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  ensured = true;
}

export async function saveFeedback(input: FeedbackInput): Promise<{ ok: true; id?: number; persisted: boolean }> {
  const sql = getSql();
  if (!sql) {
    // No DB configured — log and succeed so the UI flow completes.
    console.log("[feedback] DATABASE_URL not set — logging only:", JSON.stringify(input));
    return { ok: true, persisted: false };
  }
  try {
    await ensureTable();
    const rows = (await sql`
      INSERT INTO feedback (page_path, body, name, email, user_agent, referrer)
      VALUES (
        ${input.pagePath},
        ${input.body},
        ${input.name ?? null},
        ${input.email ?? null},
        ${input.userAgent ?? null},
        ${input.referrer ?? null}
      )
      RETURNING id
    `) as Array<{ id: number }>;
    return { ok: true, id: rows[0]?.id, persisted: true };
  } catch (err) {
    console.error("[feedback] insert failed:", err);
    // Don't bubble the error to the user — they shouldn't see DB internals.
    return { ok: true, persisted: false };
  }
}

export async function listFeedback(limit = 50): Promise<StoredFeedback[]> {
  const sql = getSql();
  if (!sql) return [];
  try {
    await ensureTable();
    const rows = (await sql`
      SELECT id, page_path, body, name, email, user_agent, referrer, created_at
      FROM feedback
      ORDER BY created_at DESC
      LIMIT ${limit}
    `) as Array<{
      id: number;
      page_path: string;
      body: string;
      name: string | null;
      email: string | null;
      user_agent: string | null;
      referrer: string | null;
      created_at: string;
    }>;
    return rows.map((r) => ({
      id: r.id,
      pagePath: r.page_path,
      body: r.body,
      name: r.name ?? undefined,
      email: r.email ?? undefined,
      userAgent: r.user_agent ?? undefined,
      referrer: r.referrer ?? undefined,
      createdAt: r.created_at,
    }));
  } catch (err) {
    console.error("[feedback] list failed:", err);
    return [];
  }
}
