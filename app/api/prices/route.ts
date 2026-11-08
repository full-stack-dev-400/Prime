import { NextResponse } from "next/server";
import { quotes } from "@/lib/prices";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ ts: Date.now(), source: "LD4", quotes: quotes() });
}
