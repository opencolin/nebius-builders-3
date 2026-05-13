import { NextResponse } from "next/server";
import { refreshAllSources } from "@/lib/event-sources";
import { saveScrapedEvents } from "@/lib/events-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await refreshAllSources();
    // Fire-and-mostly-forget persist. We await it so the response includes
    // counts, but failures don't take down the refresh — DB-down is fine.
    const persist = await saveScrapedEvents(result.events);
    return NextResponse.json({ ...result, persist });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Refresh failed", events: [] },
      { status: 500 },
    );
  }
}

// Also support GET so a curl test or a server-side prefetch can hit it.
export const GET = POST;
