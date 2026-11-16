import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

export const runtime = "nodejs";

const CLIENT_TYPES = ["broker", "fund", "exchange", "bank", "other"];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // Honeypot protection
  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const clientType = clean(body.clientType);

  const lead = {
    full_name: clean(body.fullName, 120),
    email: clean(body.email, 200).toLowerCase(),
    company: clean(body.company, 160) || null,
    client_type: CLIENT_TYPES.includes(clientType) ? clientType : "other",
    interest: Array.isArray(body.interest)
      ? body.interest
          .map((i) => clean(i, 40))
          .filter(Boolean)
          .slice(0, 6)
      : [],
    monthly_volume: clean(body.monthlyVolume, 40) || null,
    message: clean(body.message, 3000) || null,
  };

  const errors: Record<string, string> = {};

  if (lead.full_name.length < 2) {
    errors.fullName = "Please enter your name.";
  }

  if (!isEmail(lead.email)) {
    errors.email = "Please enter a valid work email.";
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // STEP 1: Save lead in Supabase
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.error("[contact] Supabase not configured");

    return NextResponse.json(
      {
        ok: false,
        error: "Contact service is unavailable.",
      },
      { status: 503 },
    );
  }

  const { error: dbError } = await supabase.from("leads").insert(lead);

  if (dbError) {
    console.error("[contact] Supabase insert failed:", dbError.message);

    return NextResponse.json(
      {
        ok: false,
        error: "Could not submit right now. Please try again.",
      },
      { status: 500 },
    );
  }

  // STEP 2: Send notification through Resend
  let notified = false;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && from && to) {
    try {
      const resend = new Resend(apiKey);

      const emailBody = [
        "New JKV Prime Website Enquiry",
        "",
        `Full Name: ${lead.full_name}`,
        `Email: ${lead.email}`,
        `Company: ${lead.company || "Not provided"}`,
        `Client Type: ${lead.client_type}`,
        `Interest: ${lead.interest.join(", ") || "Not provided"}`,
        `Monthly Volume: ${lead.monthly_volume || "Not provided"}`,
        "",
        "Message:",
        lead.message || "No message provided",
        "",
        "Submitted via JKV Prime website.",
      ].join("\n");

      const { error: emailError } = await resend.emails.send({
        from,
        to: [to],
        replyTo: lead.email,
        subject: `New JKV Prime Enquiry - ${lead.full_name}`,
        text: emailBody,
      });

      if (emailError) {
        console.error("[contact] Resend failed:", emailError.message);
      } else {
        notified = true;
      }
    } catch (error) {
      console.error(
        "[contact] Email notification exception:",
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  } else {
    console.warn("[contact] Resend environment variables missing");
  }

  // STEP 3: Return success after lead is safely stored
  return NextResponse.json({
    ok: true,
    stored: true,
    notified,
  });
}
