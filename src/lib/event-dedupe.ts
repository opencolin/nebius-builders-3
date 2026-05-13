// Pure dedupe + merge utility. Safe to import from both the server (API route)
// and the client (EventsView state reducer).

import type { BuilderEvent } from "./builder-events";

/**
 * Canonical-ish key for a single event. Bucket on:
 *   - first 4 alphanumeric chars of the title (lowercased)
 *   - the start date as YYYY-MM-DD
 * Tight enough that "Nebius.Build/LON" and "Nebius.Build/LONDON" collide
 * (same day + same 4-char prefix), loose enough that unrelated events on
 * the same day rarely collide.
 */
export function dedupeKey(e: BuilderEvent): string {
  const norm = e.title.toLowerCase().replace(/[^a-z0-9]+/g, "");
  const day = e.startsAt.slice(0, 10);
  return `${norm.slice(0, 4)}_${day}`;
}

/**
 * Merge two events that we've decided are the same. The "winner" is kept
 * as the base; the "loser" fills in fields the winner is missing, and we
 * union the URL fields + the isOfficial flag so we never drop info.
 */
function mergeOne(winner: BuilderEvent, loser: BuilderEvent): BuilderEvent {
  return {
    ...loser,
    ...winner,
    description:
      winner.description && winner.description.length >= (loser.description?.length ?? 0)
        ? winner.description
        : loser.description ?? winner.description,
    venueName:
      winner.venueName && winner.venueName !== "TBA" ? winner.venueName : loser.venueName,
    venueAddress: winner.venueAddress ?? loser.venueAddress,
    lat: winner.lat || loser.lat,
    lng: winner.lng || loser.lng,
    lumaUrl: winner.lumaUrl ?? loser.lumaUrl,
    officialUrl: winner.officialUrl ?? loser.officialUrl,
    isOfficial: Boolean(winner.isOfficial || loser.isOfficial),
    dateRange: winner.dateRange ?? loser.dateRange,
  };
}

/**
 * Prefer the event that:
 *   1. Has the more specific (longer) title — "Nebius.Build/LONDON" beats "Nebius.Build/LON".
 *   2. Has a lumaUrl — those are public RSVP pages.
 *   3. Otherwise, first one wins.
 */
function pickWinner(a: BuilderEvent, b: BuilderEvent): BuilderEvent {
  if (a.title.length === b.title.length) {
    if (a.lumaUrl && !b.lumaUrl) return mergeOne(a, b);
    if (b.lumaUrl && !a.lumaUrl) return mergeOne(b, a);
    return mergeOne(a, b);
  }
  return a.title.length > b.title.length ? mergeOne(a, b) : mergeOne(b, a);
}

/**
 * Dedupe + merge a list of events. Stable enough to call on every state
 * update without churn.
 */
export function dedupeEvents(events: BuilderEvent[]): BuilderEvent[] {
  const byKey = new Map<string, BuilderEvent>();
  for (const e of events) {
    const key = dedupeKey(e);
    const existing = byKey.get(key);
    byKey.set(key, existing ? pickWinner(existing, e) : e);
  }
  return Array.from(byKey.values()).sort(
    (a, b) => +new Date(a.startsAt) - +new Date(b.startsAt),
  );
}

/**
 * Union of two event lists with dedupe. The first list "wins" ties on
 * structural fields when both sides agree on the dedupe key — useful for
 * the client to keep its hand-curated static list as a base and overlay
 * scraped updates without losing local edits.
 *
 * Order of inputs matters: prefer `base` shape, but if `incoming` has more
 * URLs/details (a lumaUrl that the base lacks), merge them in.
 */
export function mergeEventLists(
  base: BuilderEvent[],
  incoming: BuilderEvent[],
): BuilderEvent[] {
  return dedupeEvents([...base, ...incoming]);
}
