// Live scrapers for /api/events/refresh.
//
// Both pages are SSR'd Next.js — their __NEXT_DATA__ JSON payload carries the
// event metadata we need (no headless browser required). If either page
// changes its embed format, swap in a Massive Web Render call (env-gated)
// by replacing the fetchHtml() body.

import type { BuilderEvent, BuilderEventFormat } from "./builder-events";
import { dedupeEvents } from "./event-dedupe";

// ---------------------------------------------------------------------------
// HTML fetching
// ---------------------------------------------------------------------------

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; NebiusBuildersBot/1.0; +https://builders.nebius.com)",
      accept: "text/html,*/*",
    },
    // Don't let Next's Data Cache pin a stale response — this endpoint is
    // specifically for "refresh me right now".
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.text();
}

function extractNextData(html: string): any {
  const m = html.match(
    /<script id="__NEXT_DATA__" type="application\/json"[^>]*>([\s\S]+?)<\/script>/,
  );
  if (!m) throw new Error("No __NEXT_DATA__ block found");
  return JSON.parse(m[1]);
}

// ---------------------------------------------------------------------------
// City → lat/lng for the events map. Anything not here gets {0, 0} and
// is filtered out of the map view (still appears in the list).
// ---------------------------------------------------------------------------

const cityCoords: Record<string, { lat: number; lng: number; country: string }> = {
  "San Francisco": { lat: 37.7749, lng: -122.4194, country: "US" },
  "San Francisco, CA": { lat: 37.7749, lng: -122.4194, country: "US" },
  "San Jose, CA": { lat: 37.3382, lng: -121.8863, country: "US" },
  "New York": { lat: 40.7128, lng: -74.006, country: "US" },
  "New York, NY": { lat: 40.7128, lng: -74.006, country: "US" },
  Seattle: { lat: 47.6062, lng: -122.3321, country: "US" },
  "Palo Alto": { lat: 37.4275, lng: -122.1697, country: "US" },
  London: { lat: 51.5074, lng: -0.1278, country: "GB" },
  Paris: { lat: 48.8566, lng: 2.3522, country: "FR" },
  Berlin: { lat: 52.52, lng: 13.405, country: "DE" },
  Munich: { lat: 48.1351, lng: 11.582, country: "DE" },
  München: { lat: 48.1351, lng: 11.582, country: "DE" },
  Amsterdam: { lat: 52.3676, lng: 4.9041, country: "NL" },
  Cannes: { lat: 43.5528, lng: 7.0174, country: "FR" },
  Cambridge: { lat: 52.2053, lng: 0.1218, country: "GB" },
  Vienna: { lat: 48.2082, lng: 16.3738, country: "AT" },
  Mumbai: { lat: 19.076, lng: 72.8777, country: "IN" },
  "Mexico City": { lat: 19.4326, lng: -99.1332, country: "MX" },
  "Ciudad de México": { lat: 19.4326, lng: -99.1332, country: "MX" },
};

function lookupCoords(city: string | null | undefined): { lat: number; lng: number; country: string } {
  if (!city) return { lat: 0, lng: 0, country: "" };
  if (cityCoords[city]) return cityCoords[city];
  // Try the first comma-segment ("Berlin, Germany" → "Berlin")
  const head = city.split(",")[0].trim();
  if (cityCoords[head]) return cityCoords[head];
  return { lat: 0, lng: 0, country: "" };
}

// ---------------------------------------------------------------------------
// Luma calendar — luma.com/NebiusAI
// ---------------------------------------------------------------------------

function lumaFormat(title: string): BuilderEventFormat {
  const t = title.toLowerCase();
  if (/hackathon/.test(t)) return "HACKATHON";
  if (/office hour|brews|build friday/.test(t)) return "OFFICE_HOURS";
  if (/build night|build day|vibe coding|workshop|hands.?on/.test(t)) return "WORKSHOP";
  if (/demo|fight|dance/.test(t)) return "DEMO_NIGHT";
  if (/talk|webinar|deep dive/.test(t)) return "TALK";
  return "OTHER";
}

function lumaProductFocus(title: string): string[] {
  const t = title.toLowerCase();
  if (/voice|agent/.test(t)) return ["tokenfactory", "openclaw"];
  if (/fine.?tune|train/.test(t)) return ["aicloud", "tokenfactory"];
  if (/soperator|slurm|kubernetes|gpu/.test(t)) return ["aicloud", "soperator"];
  return ["tokenfactory"];
}

export async function fetchLumaCalendar(
  url = "https://luma.com/NebiusAI",
): Promise<BuilderEvent[]> {
  const html = await fetchHtml(url);
  const data = extractNextData(html);
  const items: any[] = data?.props?.pageProps?.initialData?.data?.featured_items ?? [];
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Luma payload did not contain featured_items");
  }
  return items
    .map((item): BuilderEvent | null => {
      const ev = item?.event;
      if (!ev?.name || !ev?.start_at) return null;
      const geo = ev.geo_address_info ?? {};
      const cityRaw = geo.city_state ?? geo.city ?? null;
      const coords = lookupCoords(cityRaw);
      const slug = ev.url ?? "";
      const hostName =
        item.hosts?.map((h: any) => h?.name).filter(Boolean).slice(0, 3).join(", ") ||
        "Nebius community";
      const primaryHandle =
        (item.hosts?.[0]?.username as string | undefined) ||
        (item.hosts?.[0]?.name?.toLowerCase().replace(/[^a-z0-9]+/g, "") as string | undefined) ||
        "luma";
      const lumaUrl = slug.startsWith("http")
        ? slug
        : slug
          ? `https://luma.com/${slug}`
          : url;
      return {
        id: `luma_${ev.api_id ?? slug ?? Math.random().toString(36).slice(2, 10)}`,
        title: ev.name,
        description: ev.tagline ?? `Hosted by ${hostName}.`,
        format: lumaFormat(ev.name),
        startsAt: ev.start_at,
        endsAt: ev.end_at ?? ev.start_at,
        timezone: ev.timezone ?? "UTC",
        venueName: geo.address ?? geo.full_address ?? cityRaw ?? "TBA",
        venueAddress: geo.full_address ?? undefined,
        city: cityRaw?.split(",")[0].trim() ?? "Online",
        country: coords.country || "ZZ",
        lat: coords.lat,
        lng: coords.lng,
        isOnline: !cityRaw,
        productFocus: lumaProductFocus(ev.name),
        builderHandle: primaryHandle,
        builderName: hostName,
        status: "PUBLISHED",
        lumaUrl,
      };
    })
    .filter((e): e is BuilderEvent => e !== null);
}

// ---------------------------------------------------------------------------
// Nebius corporate events — nebius.com/events
// Uses the Apollo state baked into __NEXT_DATA__.
// ---------------------------------------------------------------------------

function nebiusFormat(eventType: string | null): BuilderEventFormat {
  switch (eventType) {
    case "Hackathon":
      return "HACKATHON";
    case "Webinar":
      return "TALK";
    case "Workshop":
      return "WORKSHOP";
    case "Conference":
    case "Special event":
    case "Meetup":
    default:
      return eventType === "Meetup" ? "OTHER" : "OTHER";
  }
}

function nebiusProductFocus(title: string): string[] {
  const t = title.toLowerCase();
  if (/token factory|inference/.test(t)) return ["tokenfactory", "aicloud"];
  if (/soperator|slurm|gpu cluster/.test(t)) return ["soperator", "aicloud"];
  if (/build|inflection|ai summit/.test(t)) return ["aicloud", "tokenfactory"];
  return ["aicloud"];
}

function combineDateTz(date: string, time: string | null, tz: string | null): string {
  // nebius.com/events doesn't always give time/tz. Fall back to midnight UTC.
  const t = time && /^\d{2}:\d{2}/.test(time) ? time : "12:00";
  const offset =
    tz && /^UTC[+\-]\d{2}:\d{2}$/.test(tz)
      ? tz.replace("UTC", "")
      : tz === "PT"
        ? "-08:00"
        : "+00:00";
  return `${date}T${t.length === 5 ? t + ":00" : t}${offset}`;
}

function nebiusDateRange(start: string, end: string | null): string | undefined {
  if (!end || end === start) return undefined;
  const s = new Date(start);
  const e = new Date(end);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const yr = e.getFullYear();
  return `${fmt(s)} – ${fmt(e)}, ${yr}`;
}

export async function fetchNebiusOfficialEvents(
  url = "https://nebius.com/events",
): Promise<BuilderEvent[]> {
  const html = await fetchHtml(url);
  const data = extractNextData(html);
  const state = data?.props?.pageProps?.__APOLLO_STATE__;
  if (!state) throw new Error("Nebius events payload missing __APOLLO_STATE__");
  const rootKeys = Object.keys(state.ROOT_QUERY ?? {});
  const eventsKey = rootKeys.find(
    (k) => k.startsWith("events(") && k.includes("is_hidden"),
  );
  if (!eventsKey) throw new Error("Nebius events query key not found in Apollo state");
  const eventRefs: Array<{ __ref: string }> = state.ROOT_QUERY[eventsKey] ?? [];

  const todayIso = new Date().toISOString().slice(0, 10);
  return eventRefs
    .map((r) => state[r.__ref])
    .filter((ev: any) => ev && ev.start_date && ev.start_date >= todayIso)
    .map((ev: any): BuilderEvent | null => {
      const cityRef = ev.city?.__ref ? state[ev.city.__ref] : null;
      const typeRef = ev.event_type?.__ref ? state[ev.event_type.__ref] : null;
      const cityName = cityRef?.title ?? (ev.online ? "Online" : "Global");
      const coords = lookupCoords(cityName);
      const startsAt = combineDateTz(ev.start_date, ev.start_time, ev.event_timezone);
      const endsAt = ev.end_date
        ? combineDateTz(ev.end_date, ev.end_time ?? ev.start_time, ev.event_timezone)
        : startsAt;
      return {
        id: `off_${ev.name ?? ev.id}`,
        title: ev.title ?? ev.name ?? "Nebius event",
        description:
          ev.short_description ??
          `Official Nebius event in ${cityName}.`,
        format: nebiusFormat(typeRef?.title ?? null),
        startsAt,
        endsAt,
        timezone: ev.event_timezone ?? "UTC",
        venueName: cityName,
        city: cityName.split(",")[0].trim(),
        country: coords.country || "ZZ",
        lat: coords.lat,
        lng: coords.lng,
        isOnline: Boolean(ev.online),
        productFocus: nebiusProductFocus(ev.title ?? ""),
        builderHandle: "nebius",
        builderName: "Nebius",
        status: "PUBLISHED",
        isOfficial: true,
        officialUrl: `https://nebius.com/events/${ev.name}`,
        dateRange: nebiusDateRange(ev.start_date, ev.end_date),
      };
    })
    .filter((e): e is BuilderEvent => e !== null);
}

// ---------------------------------------------------------------------------
// Combined refresh
// ---------------------------------------------------------------------------

export type RefreshResult = {
  fetchedAt: string;
  events: BuilderEvent[];
  sources: {
    luma: { ok: boolean; count: number; error?: string; url: string };
    nebius: { ok: boolean; count: number; error?: string; url: string };
  };
};

export async function refreshAllSources(): Promise<RefreshResult> {
  const lumaUrl = "https://luma.com/NebiusAI";
  const nebiusUrl = "https://nebius.com/events";
  const [luma, nebius] = await Promise.allSettled([
    fetchLumaCalendar(lumaUrl),
    fetchNebiusOfficialEvents(nebiusUrl),
  ]);
  const lumaEvents = luma.status === "fulfilled" ? luma.value : [];
  const nebiusEvents = nebius.status === "fulfilled" ? nebius.value : [];
  // Dedupe across sources — Nebius.Build/LON ↔ Nebius.Build/LONDON, Applied
  // AI Conference appearing on both, etc. — and keep the richer copy of each.
  const merged = dedupeEvents([...nebiusEvents, ...lumaEvents]);
  return {
    fetchedAt: new Date().toISOString(),
    events: merged,
    sources: {
      luma: {
        ok: luma.status === "fulfilled",
        count: lumaEvents.length,
        error: luma.status === "rejected" ? String(luma.reason?.message ?? luma.reason) : undefined,
        url: lumaUrl,
      },
      nebius: {
        ok: nebius.status === "fulfilled",
        count: nebiusEvents.length,
        error: nebius.status === "rejected" ? String(nebius.reason?.message ?? nebius.reason) : undefined,
        url: nebiusUrl,
      },
    },
  };
}
