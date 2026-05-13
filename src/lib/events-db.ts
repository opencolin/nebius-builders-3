// Persistence for scraped events. Uses the same Neon connection pattern as
// src/lib/feedback-db.ts. When DATABASE_URL is unset, logs and returns 0
// persisted — the refresh response stays ok:true so the UI flow completes.

import { neon } from "@neondatabase/serverless";
import type { BuilderEvent } from "./builder-events";

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
    CREATE TABLE IF NOT EXISTS scraped_events (
      id            TEXT        PRIMARY KEY,
      title         TEXT        NOT NULL,
      starts_at     TIMESTAMPTZ NOT NULL,
      ends_at       TIMESTAMPTZ,
      city          TEXT,
      country       TEXT,
      is_official   BOOLEAN     NOT NULL DEFAULT FALSE,
      luma_url      TEXT,
      official_url  TEXT,
      payload       JSONB       NOT NULL,
      first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_seen_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_scraped_events_starts_at ON scraped_events (starts_at)`;
  ensured = true;
}

export type PersistResult = {
  persistedDb: boolean;
  inserted: number;   // first-time rows
  updated: number;    // refreshed rows
  failed: number;
};

export async function saveScrapedEvents(events: BuilderEvent[]): Promise<PersistResult> {
  const sql = getSql();
  if (!sql) {
    console.log(
      `[events-db] DATABASE_URL not set — would persist ${events.length} events`,
    );
    return { persistedDb: false, inserted: 0, updated: 0, failed: 0 };
  }
  try {
    await ensureTable();
  } catch (err) {
    console.error("[events-db] ensureTable failed:", err);
    return { persistedDb: false, inserted: 0, updated: 0, failed: events.length };
  }
  let inserted = 0;
  let updated = 0;
  let failed = 0;
  for (const e of events) {
    try {
      // Postgres trick: `xmax = 0` on the returning row means this was a
      // fresh INSERT; non-zero means we hit DO UPDATE.
      const rows = (await sql`
        INSERT INTO scraped_events (
          id, title, starts_at, ends_at, city, country,
          is_official, luma_url, official_url, payload, last_seen_at
        )
        VALUES (
          ${e.id},
          ${e.title},
          ${e.startsAt},
          ${e.endsAt ?? null},
          ${e.city ?? null},
          ${e.country ?? null},
          ${Boolean(e.isOfficial)},
          ${e.lumaUrl ?? null},
          ${e.officialUrl ?? null},
          ${JSON.stringify(e)}::jsonb,
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          title        = EXCLUDED.title,
          starts_at    = EXCLUDED.starts_at,
          ends_at      = EXCLUDED.ends_at,
          city         = EXCLUDED.city,
          country      = EXCLUDED.country,
          is_official  = EXCLUDED.is_official,
          luma_url     = EXCLUDED.luma_url,
          official_url = EXCLUDED.official_url,
          payload      = EXCLUDED.payload,
          last_seen_at = NOW()
        RETURNING (xmax = 0) AS was_insert
      `) as Array<{ was_insert: boolean }>;
      if (rows[0]?.was_insert) inserted += 1;
      else updated += 1;
    } catch (err) {
      console.error(`[events-db] upsert failed for ${e.id}:`, err);
      failed += 1;
    }
  }
  return { persistedDb: true, inserted, updated, failed };
}
