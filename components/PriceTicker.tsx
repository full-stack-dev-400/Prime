"use client";

import { useEffect, useRef, useState } from "react";
import type { Quote } from "@/lib/prices";

export default function PriceTicker() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const prev = useRef<Record<string, number>>({});
  const [dir, setDir] = useState<Record<string, 1 | -1 | 0>>({});

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/prices", { cache: "no-store" });
        const data = (await res.json()) as { quotes: Quote[] };
        if (!alive) return;
        const d: Record<string, 1 | -1 | 0> = {};
        data.quotes.forEach((q) => {
          const p = prev.current[q.symbol];
          d[q.symbol] = p === undefined ? 0 : q.bid > p ? 1 : q.bid < p ? -1 : 0;
          prev.current[q.symbol] = q.bid;
        });
        setDir(d);
        setQuotes(data.quotes);
      } catch {
        /* ignore transient errors */
      }
    };
    load();
    const id = setInterval(load, 1500);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const row = quotes.length ? [...quotes, ...quotes] : [];

  return (
    <div className="relative border-y border-navy-4/60 bg-navy-2/70">
      <div className="flex items-center">
        <div className="z-10 hidden shrink-0 items-center gap-2 border-r border-navy-4/60 bg-navy-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mist-muted md:flex">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-up" /> Indicative · LD4
        </div>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
          <ul className="marquee flex w-max gap-10 py-3 pl-6">
            {row.length === 0 && <li className="font-mono text-xs text-mist-muted">Connecting to price stream…</li>}
            {row.map((q, i) => {
              const d = dir[q.symbol];
              return (
                <li key={`${q.symbol}-${i}`} className="flex items-center gap-3 font-mono text-xs">
                  <span className="font-semibold text-offwhite">{q.symbol}</span>
                  <span className={d === 1 ? "text-up" : d === -1 ? "text-down" : "text-mist-body"}>
                    {q.bid.toFixed(q.digits)} / {q.ask.toFixed(q.digits)}
                  </span>
                  <span className={q.change >= 0 ? "text-up" : "text-down"}>
                    {q.change >= 0 ? "▲" : "▼"} {Math.abs(q.change).toFixed(2)}%
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
