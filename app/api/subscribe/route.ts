import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

export const runtime = "nodejs";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export async function POST(req: Request) {
  // 1. Validate email
  const body = await req.json().catch(() => ({}));

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (email.length > 254 || !isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email." },
      { status: 422 },
    );
  }

  // 2. Save subscriber in Supabase
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.error("[subscribe] Supabase not configured");

    return NextResponse.json(
      {
        ok: false,
        error: "Subscription service unavailable.",
      },
      { status: 503 },
    );
  }

  // Check whether subscriber already exists
  const { data: existing, error: lookupError } = await supabase
    .from("subscribers")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (lookupError) {
    console.error("[subscribe] Lookup error:", lookupError.message);

    return NextResponse.json(
      { ok: false, error: "Please try again." },
      { status: 500 },
    );
  }

  // Avoid duplicate notifications
  if (existing) {
    return NextResponse.json({
      ok: true,
      stored: true,
      alreadySubscribed: true,
      notified: false,
    });
  }

  const { error: dbError } = await supabase
    .from("subscribers")
    .upsert({ email }, { onConflict: "email", ignoreDuplicates: true });

  if (dbError) {
    console.error("[subscribe] Supabase error:", dbError.message);

    return NextResponse.json(
      {
        ok: false,
        error: "Please try again.",
      },
      { status: 500 },
    );
  }

  // 3. Notify the JKV Prime team via Resend
  let notified = false;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && from && to) {
    try {
      const resend = new Resend(apiKey);

      const { error: emailError } = await resend.emails.send({
        from,
        to: [to],
        subject: "New JKV Prime Newsletter Subscriber",
        text: [
          "A new visitor subscribed to JKV Prime market insights.",
          "",
          `Subscriber Email: ${email}`,
          "",
          "Source: JKV Prime Website Footer",
        ].join("\n"),
      });

      if (emailError) {
        console.error("[subscribe] Resend error:", emailError.message);
      } else {
        notified = true;
      }
    } catch (error) {
      console.error(
        "[subscribe] Email exception:",
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  } else {
    console.warn("[subscribe] Resend configuration missing");
  }

  // 4. Return success
  return NextResponse.json({
    ok: true,
    stored: true,
    notified,
  });
}
