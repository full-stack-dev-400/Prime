"use client";

import { useEffect, useRef } from "react";

/**
 * Progressive-enhancement entrance for the metrics row.
 *
 * Server HTML is fully visible. On mount, if motion is allowed and the row is
 * still below the viewport, it is "armed" (hidden by CSS), then revealed once
 * it scrolls into view. If the row is already on screen, or the visitor
 * prefers reduced motion, nothing is hidden and nothing animates.
 */
export default function MetricsReveal({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.dataset.state = "armed";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.state = "in";
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
