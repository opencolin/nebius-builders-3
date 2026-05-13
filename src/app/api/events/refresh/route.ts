import { NextResponse } from "next/server";
import { refreshAllSources } from "@/lib/event-sources";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await refreshAllSources();
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Refresh failed", events: [] },
      { status: 500 },
    );
  }
}

// Also support GET so a curl test or a server-side prefetch can hit it.
export const GET = POST;
