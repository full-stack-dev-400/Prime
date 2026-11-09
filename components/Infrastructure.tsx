"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./Infrastructure.module.css";

type StockSymbol = "AAPL" | "MSFT" | "NVDA";

type FloatingMarket = {
  label: string;
  subtitle: string;
  kind: "stock" | "fx";
  symbol?: StockSymbol;
  x: string;
  y: string;
  size: string;
  depth: number;
  delay: string;
};

const floatingMarkets: FloatingMarket[] = [
  { label: "AAPL", subtitle: "EQUITIES", kind: "stock", symbol: "AAPL", x: "-3%", y: "14%", size: "clamp(110px, 15vw, 220px)", depth: 1.2, delay: "-1s" },
  { label: "MSFT", subtitle: "EQUITIES", kind: "stock", symbol: "MSFT", x: "77%", y: "-14%", size: "clamp(115px, 16vw, 230px)", depth: 1.65, delay: "-3s" },
  { label: "EUR / USD", subtitle: "FX SPOT", kind: "fx", x: "78%", y: "58%", size: "clamp(110px, 12vw, 175px)", depth: -1.3, delay: "-2s" },
  { label: "NVDA", subtitle: "EQUITIES", kind: "stock", symbol: "NVDA", x: "10%", y: "76%", size: "clamp(90px, 11vw, 155px)", depth: -1.05, delay: "-4s" },
  { label: "GBP / USD", subtitle: "FX SPOT", kind: "fx", x: "52%", y: "-15%", size: "clamp(85px, 10vw, 145px)", depth: 0.9, delay: "-2.5s" },
  { label: "USD / JPY", subtitle: "FX SPOT", kind: "fx", x: "-5%", y: "63%", size: "clamp(75px, 9vw, 125px)", depth: 0.7, delay: "-5s" },
];

const features = [
  {
    number: "01",
    title: "FIX API connectivity",
    description:
      "Dedicated FIX 4.4 sessions for streaming prices, placing orders and receiving drop copies, certified against your engine before go-live.",
  },
  {
    number: "02",
    title: "LD4 / LD5 bridge connectivity",
    description:
      "Cross-connect or VPN into our servers, with native support for the leading MT4/MT5 bridges and aggregators.",
  },
  {
    number: "03",
    title: "Redundant by design",
    description:
      "A hot-standby server and replicated database in a second data centre, with automatic session failover.",
  },
  {
    number: "04",
    title: "Monitored around the clock",
    description:
      "Latency, session health and pricing quality are monitored continuously, and our engineers respond when thresholds are breached.",
  },
] as const;

function StockMark({ symbol }: { symbol: StockSymbol }) {
  if (symbol === "MSFT") {
    return (
      <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
        <rect x="3" y="3" width="15" height="15" rx="1.5" />
        <rect x="22" y="3" width="15" height="15" rx="1.5" />
        <rect x="3" y="22" width="15" height="15" rx="1.5" />
        <rect x="22" y="22" width="15" height="15" rx="1.5" />
      </svg>
    );
  }

  if (symbol === "AAPL") {
    // Small stylized apple-shaped mark, rendered in the JKV monochrome palette.
    return (
      <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
        <path d="M25.7 5.5c-2.6.4-4.7 2.2-5 5.3 3.2.2 5.4-1.7 5-5.3ZM20 12.5c-4.7-3.6-12.4-.6-13 6.8-.7 8.5 5.1 15.8 9.1 15.8 1.7 0 2.4-1 4.7-1 2.2 0 2.8 1 4.5 1 3.1 0 6.5-4.5 7.6-8.9-3.4-1.5-4.8-5.4-4.1-8.6-2.7-1-5.4-1-7.9.4Z" />
      </svg>
    );
  }

  // Stylized eye / signal motif for the NVDA stock badge.
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M3.5 20c6-9 26-10 33 0-5 9-25 11-33 0Z" stroke="currentColor" strokeWidth="3" />
      <path d="M10 21c4-6 17-7 20 0-4 6-16 6-20 0Z" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="20" cy="21" r="5" fill="currentColor" />
    </svg>
  );
}

function MarketBubble({ market, index }: { market: FloatingMarket; index: number }) {
  const cssVars = {
    "--x": market.x,
    "--y": market.y,
    "--size": market.size,
    "--delay": market.delay,
  } as CSSProperties;

  return (
    <div
      className={`${styles.marketBubble} ${market.kind === "fx" ? styles.fxBubble : styles.stockBubble}`}
      style={cssVars}
      data-float={market.depth}
      data-bubble-index={index}
      aria-hidden="true"
    >
      <div className={styles.marketBubbleInner}>
        {market.symbol && (
          <span className={styles.stockMark}>
            <StockMark symbol={market.symbol} />
          </span>
        )}
        <span className={styles.bubbleLabel}>{market.label}</span>
        <span className={styles.bubbleSubtitle}>{market.subtitle}</span>
      </div>
    </div>
  );
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeInOut = (value: number) =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

export default function Infrastructure() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const showcase = showcaseRef.current;
    const panel = panelRef.current;
    const stepsList = stepsRef.current;
    if (!showcase || !panel || !stepsList) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const bubbles = Array.from(panel.querySelectorAll<HTMLElement>("[data-float]"));
    const stepElements = Array.from(stepsList.querySelectorAll<HTMLElement>("[data-step]"));
    let frame = 0;
    let scrollProgress = 0;
    let mouseX = 0;
    let mouseY = 0;

    const placeBubbles = () => {
      bubbles.forEach((bubble) => {
        if (reducedMotion.matches) {
          bubble.style.setProperty("--float-x", "0px");
          bubble.style.setProperty("--float-y", "0px");
          return;
        }
        const depth = Number(bubble.dataset.float || "1");
        bubble.style.setProperty(
          "--float-x",
          `${(mouseX * 11 + scrollProgress * 30) * depth}px`,
        );
        bubble.style.setProperty(
          "--float-y",
          `${(mouseY * 9 - scrollProgress * 48) * depth}px`,
        );
      });
    };

    const update = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const vw = window.innerWidth || 1;
      const rect = showcase.getBoundingClientRect();
      const availableScroll = Math.max(1, rect.height - vh);
      const progress = clamp01(-rect.top / availableScroll);
      const expanded = reducedMotion.matches ? 1 : easeInOut(clamp01(progress / 0.72));
      const mobile = vw < 760;

      panel.style.setProperty("--panel-width", `${(mobile ? 88 : 48) + (mobile ? 12 : 52) * expanded}vw`);
      panel.style.setProperty("--panel-height", `${(mobile ? 60 : 54) + (mobile ? 40 : 46) * expanded}svh`);
      panel.style.setProperty("--panel-radius", `${Math.round(32 * (1 - expanded))}px`);
      panel.style.setProperty("--text-scale", `${(mobile ? 0.84 : 0.6) + (mobile ? 0.16 : 0.4) * expanded}`);

      scrollProgress = progress;
      placeBubbles();

      const listRect = stepsList.getBoundingClientRect();
      const railProgress = clamp01((vh * 0.66 - listRect.top) / Math.max(listRect.height, 1));
      stepsList.style.setProperty("--rail-progress", String(railProgress));

      stepElements.forEach((step) => {
        const box = step.getBoundingClientRect();
        const isActive = box.top < vh * 0.72 && box.bottom > vh * 0.3;
        step.dataset.current = isActive ? "true" : "false";
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === "touch") return;
      const rect = panel.getBoundingClientRect();
      mouseX = clamp01((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      mouseY = clamp01((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
      requestUpdate();
    };
    const onPointerLeave = () => {
      mouseX = 0;
      mouseY = 0;
      requestUpdate();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.setAttribute("data-revealed", "true");
        });
      },
      { threshold: 0.16 },
    );

    if (!reducedMotion.matches) {
      stepElements.forEach((step) => {
        step.dataset.revealed = "false";
        observer.observe(step);
      });
    }

    const sceneObserver = new IntersectionObserver(
      ([entry]) => { panel.dataset.active = entry.isIntersecting ? "true" : "false"; },
      { rootMargin: "100px" },
    );
    sceneObserver.observe(showcase);

    panel.addEventListener("pointermove", onPointerMove, { passive: true });
    panel.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    reducedMotion.addEventListener("change", requestUpdate);
    update();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      sceneObserver.disconnect();
      panel.removeEventListener("pointermove", onPointerMove);
      panel.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <section id="infrastructure" className={styles.section} aria-labelledby="infrastructure-title">
      {/* Act I: the reference's sticky, scroll-expanding cinematic panel. */}
      <div ref={showcaseRef} className={styles.showcase}>
        <div className={styles.showcaseSticky}>
          <div ref={panelRef} className={styles.showcasePanel} data-active="true">
            <div className={styles.panelGrid} aria-hidden="true" />
            <div className={styles.panelGlow} aria-hidden="true" />
            <div className={styles.marketField} aria-hidden="true">
              {floatingMarkets.map((market, index) => (
                <MarketBubble key={market.label} market={market} index={index} />
              ))}
            </div>
            <div className={styles.showcaseCopy}>
              <span className={styles.showcaseEyebrow}>JKV PRIME / GLOBAL CONNECTIVITY</span>
              <h2 id="infrastructure-title">
                Infrastructure placed<br />where FX is priced.
              </h2>
              <p>
                Our servers run in Equinix LD4 and LD5 in London, the same data
                centres used by the major FX matching engines, with redundancy
                at every layer.
              </p>
              <div className={styles.showcasePills} aria-label="Infrastructure capabilities">
                <span>LD4 / LD5</span>
                <span>FIX 4.4</span>
                <span>Redundant routing</span>
              </div>
            </div>
            <div className={styles.showcaseFoot} aria-hidden="true">
              <span>PRIME CONNECTIVITY</span>
              <span>SCROLL TO EXPLORE ↓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Act II: reference's sticky-heading, four-step progression. */}
      <div className={styles.process}>
        <div className={styles.processGrid}>
          <div className={styles.processIntro}>
            <span className={styles.eyebrow}>THE INFRASTRUCTURE / 01—04</span>
            <h3>Built for the speed of the market.</h3>
            <p>
              From your first FIX session to round-the-clock network oversight,
              every layer is designed to keep your flow connected.
            </p>
            <div className={styles.introPill}>
              <span className={styles.introPillDot} aria-hidden="true" />
              Equinix LD4 · LD5 / London
            </div>
          </div>

          <ol ref={stepsRef} className={styles.steps}>
            {features.map((feature) => (
              <li key={feature.number} className={styles.step} data-step data-current="false">
                <span className={styles.stepNumber} aria-hidden="true">{feature.number}</span>
                <div className={styles.stepText}>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
