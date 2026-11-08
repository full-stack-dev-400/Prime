"use client";

import { useState } from "react";

const INTERESTS = ["FX liquidity", "FIX connectivity", "Risk control", "Bridge / MT5", "Reporting"];
type Status = "idle" | "sending" | "done" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [interest, setInterest] = useState<string[]>([]);

  const toggle = (i: string) => setInterest((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interest }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? {});
        setMessage(json.error ?? "Please check the highlighted fields.");
        setStatus("error");
        return;
      }
      form.reset();
      setInterest([]);
      setStatus("done");
    } catch {
      setMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-teal/40 bg-teal-tint p-8 text-center">
        <p className="text-2xl font-bold text-offwhite">Thank you.</p>
        <p className="mt-2 text-mist-body">A member of the JKV Prime team will be in touch within one business day.</p>
        <button className="btn-ghost mt-6" onClick={() => setStatus("idle")}>Send another enquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-2xl border border-navy-4/60 bg-navy-2 p-6 md:p-8">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-mist-body">Full name *</span>
          <input name="fullName" required className="field" placeholder="Jane Doe" aria-invalid={!!errors.fullName} />
          {errors.fullName && <span className="text-xs text-down">{errors.fullName}</span>}
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-mist-body">Work email *</span>
          <input name="email" type="email" required className="field" placeholder="jane@company.com" aria-invalid={!!errors.email} />
          {errors.email && <span className="text-xs text-down">{errors.email}</span>}
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-mist-body">Company</span>
          <input name="company" className="field" placeholder="Company Ltd" />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-mist-body">I represent a…</span>
          <select name="clientType" className="field" defaultValue="broker">
            <option value="broker">Broker</option>
            <option value="fund">Fund / Prop firm</option>
            <option value="exchange">Exchange / Venue</option>
            <option value="bank">Bank</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>
      <fieldset className="grid gap-2 text-sm">
        <legend className="mb-1.5 text-mist-body">Interested in</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => {
            const on = interest.includes(i);
            return (
              <button
                type="button"
                key={i}
                onClick={() => toggle(i)}
                aria-pressed={on}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                  on ? "border-teal bg-teal-tint text-teal-bright" : "border-navy-4 text-mist-body hover:border-teal/60"
                }`}
              >
                {i}
              </button>
            );
          })}
        </div>
      </fieldset>
      <label className="grid gap-1.5 text-sm">
        <span className="text-mist-body">Estimated monthly volume</span>
        <select name="monthlyVolume" className="field" defaultValue="">
          <option value="">Prefer not to say</option>
          <option>Under $500M</option>
          <option>$500M – $2B</option>
          <option>$2B – $10B</option>
          <option>Over $10B</option>
        </select>
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="text-mist-body">Message</span>
        <textarea name="message" rows={4} className="field resize-y" placeholder="Tell us about your platform and requirements" />
      </label>
      {status === "error" && <p className="text-sm text-down">{message}</p>}
      <button type="submit" className="btn-primary w-full sm:w-auto sm:justify-self-start" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry →"}
      </button>
      <p className="text-xs text-mist-muted">By submitting you agree to be contacted about JKV Prime services.</p>
    </form>
  );
}
