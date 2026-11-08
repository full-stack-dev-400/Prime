"use client";

import { useState } from "react";
import Logo from "./Logo";

export default function Footer() {
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => null);
    setState(res?.ok ? "ok" : "err");
    if (res?.ok) e.currentTarget.reset();
  }

  return (
    <footer className="bg-navy-footer pt-16 text-sm">
      <div className="container-site grid gap-10 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Logo className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-mist-muted">Global markets. Local insight. Prime liquidity for brokers, funds and exchanges.</p>
        </div>
        <div>
          <p className="font-semibold text-offwhite">Solutions</p>
          <ul className="mt-4 space-y-2 text-mist-muted">
            <li><a href="#solutions" className="hover:text-offwhite">FX liquidity</a></li>
            <li><a href="#solutions" className="hover:text-offwhite">FIX connectivity</a></li>
            <li><a href="#solutions" className="hover:text-offwhite">Risk control</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-offwhite">Company</p>
          <ul className="mt-4 space-y-2 text-mist-muted">
            <li><a href="#infrastructure" className="hover:text-offwhite">Infrastructure</a></li>
            <li><a href="#clients" className="hover:text-offwhite">Who we serve</a></li>
            <li><a href="#contact" className="hover:text-offwhite">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-offwhite">Market insight</p>
          <p className="mt-4 text-mist-muted">Weekly FX liquidity notes from our London desk.</p>
          <form onSubmit={subscribe} className="mt-4 flex gap-2">
            <input name="email" type="email" required placeholder="you@company.com" className="field !rounded-full !py-2.5" aria-label="Email" />
            <button className="btn-primary !px-4 !py-2.5">Join</button>
          </form>
          {state === "ok" && <p className="mt-2 text-xs text-up">Subscribed — thank you.</p>}
          {state === "err" && <p className="mt-2 text-xs text-down">Please enter a valid email.</p>}
        </div>
      </div>
      <div className="border-t border-navy-4/40">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-mist-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} JKV Global. All rights reserved.</p>
          <p className="max-w-2xl md:text-right">
            Trading leveraged products carries a high level of risk. Prices shown on this site are indicative only.
          </p>
        </div>
      </div>
    </footer>
  );
}
