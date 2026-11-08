import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  const value = (email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 422 });
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: true, stored: false });

  const { error } = await supabase.from("subscribers").upsert({ email: value }, { onConflict: "email" });
  if (error) return NextResponse.json({ ok: false, error: "Please try again." }, { status: 500 });
  return NextResponse.json({ ok: true, stored: true });
}
