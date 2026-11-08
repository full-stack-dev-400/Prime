import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const CLIENT_TYPES = ["broker", "fund", "exchange", "bank", "other"];
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // honeypot field – bots fill it, humans never see it
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const lead = {
    full_name: clean(body.fullName, 120),
    email: clean(body.email, 200).toLowerCase(),
    company: clean(body.company, 160) || null,
    client_type: CLIENT_TYPES.includes(clean(body.clientType)) ? clean(body.clientType) : "other",
    interest: Array.isArray(body.interest) ? body.interest.map((i) => clean(i, 40)).filter(Boolean).slice(0, 6) : [],
    monthly_volume: clean(body.monthlyVolume, 40) || null,
    message: clean(body.message, 3000) || null,
  };

  const errors: Record<string, string> = {};
  if (lead.full_name.length < 2) errors.fullName = "Please enter your name.";
  if (!isEmail(lead.email)) errors.email = "Please enter a valid work email.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.warn("[contact] Supabase not configured – lead not stored:", lead);
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from("leads").insert(lead);
  if (error) {
    console.error("[contact] Supabase insert failed:", error.message);
    return NextResponse.json({ ok: false, error: "Could not submit right now. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, stored: true });
}
