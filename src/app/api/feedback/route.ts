import { NextResponse } from "next/server";
import { saveFeedback } from "@/lib/feedback-db";

// Tiny in-memory rate limiter so a runaway widget can't fill the table.
// Per-IP, 1 submission / 5s, 30 / 10min. Resets on cold start (fine).
const lastByIp = new Map<string, { last: number; tenMinCount: number; windowStart: number }>();

function checkRate(ip: string): { ok: true } | { ok: false; reason: string } {
  const now = Date.now();
  const rec = lastByIp.get(ip);
  if (!rec) {
    lastByIp.set(ip, { last: now, tenMinCount: 1, windowStart: now });
    return { ok: true };
  }
  if (now - rec.last < 5000) {
    return { ok: false, reason: "Slow down — one comment per 5 seconds." };
  }
  if (now - rec.windowStart > 10 * 60 * 1000) {
    rec.windowStart = now;
    rec.tenMinCount = 0;
  }
  if (rec.tenMinCount >= 30) {
    return { ok: false, reason: "Too many comments from this IP. Take a break." };
  }
  rec.last = now;
  rec.tenMinCount += 1;
  return { ok: true };
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let json: any;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const body = typeof json?.body === "string" ? json.body.trim() : "";
  const pagePath = typeof json?.pagePath === "string" ? json.pagePath.slice(0, 256) : "/";
  const name = typeof json?.name === "string" ? json.name.trim().slice(0, 80) : undefined;
  const email = typeof json?.email === "string" ? json.email.trim().slice(0, 200) : undefined;

  if (!body) {
    return NextResponse.json({ error: "Feedback body is required" }, { status: 400 });
  }
  if (body.length > 5000) {
    return NextResponse.json({ error: "Feedback is too long (max 5000 chars)" }, { status: 400 });
  }
  if (email && !email.includes("@")) {
    return NextResponse.json({ error: "Email address looks invalid" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const rate = checkRate(ip);
  if (!rate.ok) {
    return NextResponse.json({ error: rate.reason }, { status: 429 });
  }

  const result = await saveFeedback({
    pagePath,
    body,
    name: name || undefined,
    email: email || undefined,
    userAgent: req.headers.get("user-agent") ?? undefined,
    referrer: req.headers.get("referer") ?? undefined,
  });

  return NextResponse.json({
    ok: true,
    id: result.id,
    persisted: result.persisted,
  });
}
