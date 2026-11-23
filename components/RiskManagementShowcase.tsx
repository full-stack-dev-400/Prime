"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";

type FeatureKind =
  | "exposure"
  | "routing"
  | "detection"
  | "hedge"
  | "spread"
  | "leverage";

type Feature = {
  kind: FeatureKind;
  category: string;
  title: string;
  description: string;
  tags: string[];
  theme: "light" | "teal" | "navy";
};

const features: Feature[] = [
  {
    kind: "exposure",
    category: "exposure",
    title: "Exposure & NOP limits",
    description:
      "Net and gross positions by symbol, group and login, with hard and soft limits you set.",
    tags: ["Net / gross", "Limit monitoring", "By symbol"],
    theme: "light",
  },
  {
    kind: "routing",
    category: "routing",
    title: "A/B-book & hybrid routing",
    description:
      "Route flow by client profile, symbol, size or profitability, and switch rules without a restart.",
    tags: ["A-book", "B-book", "Hybrid rules"],
    theme: "teal",
  },
  {
    kind: "detection",
    category: "detection",
    title: "Toxic-flow detection",
    description:
      "Flag latency arbitrage, news scalping and coordinated copy-trading clusters early.",
    tags: ["Latency arbitrage", "News scalping", "Cluster alerts"],
    theme: "navy",
  },
  {
    kind: "hedge",
    category: "plugin",
    title: "Auto-hedge",
    description:
      "Hedge net exposure automatically into the JKV Prime pool once it crosses your thresholds.",
    tags: ["Threshold rules", "Auto execution", "Fill history"],
    theme: "light",
  },
  {
    kind: "spread",
    category: "plugin",
    title: "Markup & spread manager",
    description:
      "Set markups per group, widen spreads around news and manage swaps from one panel.",
    tags: ["Group markups", "News profiles", "Swap control"],
    theme: "teal",
  },
  {
    kind: "leverage",
    category: "plugin",
    title: "Dynamic leverage & swap-free",
    description:
      "Leverage that adjusts to exposure and events, plus rule-based Islamic account handling.",
    tags: ["Event leverage", "Margin controls", "Swap-free rules"],
    theme: "navy",
  },
];

const candleData = [
  [58, 73, 52, 79],
  [73, 66, 61, 79],
  [66, 45, 40, 70],
  [45, 38, 31, 54],
  [38, 50, 33, 57],
  [50, 30, 25, 56],
  [30, 35, 23, 46],
  [35, 48, 31, 53],
  [48, 42, 37, 56],
  [42, 56, 39, 61],
  [56, 49, 45, 63],
  [49, 32, 29, 54],
  [32, 26, 19, 43],
  [26, 36, 23, 48],
  [36, 39, 30, 46],
  [39, 31, 25, 46],
  [31, 44, 29, 52],
  [44, 41, 35, 55],
  [41, 53, 39, 60],
  [53, 48, 43, 62],
  [48, 60, 44, 66],
  [60, 57, 51, 70],
  [57, 64, 53, 73],
  [64, 59, 55, 75],
];

function Candles({ active }: { active: boolean }) {
  return (
    <svg
      className="rms-candles"
      viewBox="0 0 280 118"
      role="img"
      aria-label="Illustrative EUR/USD candlestick price chart"
    >
      {[24, 48, 72, 96].map((y) => (
        <line
          key={y}
          x1="0"
          x2="280"
          y1={y}
          y2={y}
          stroke="#293549"
          strokeWidth="0.7"
        />
      ))}
      {candleData.map(([open, close, high, low], i) => {
        const x = 8 + i * 11;
        const bullish = close < open;
        const color = bullish ? "#34d6b6" : "#f3bf65";
        return (
          <g
            key={i}
            className={active ? "rms-candle rms-candle-on" : "rms-candle"}
            style={{ animationDelay: `${i * 38}ms` }}
          >
            <line
              x1={x}
              x2={x}
              y1={high + 10}
              y2={low + 10}
              stroke={color}
              strokeWidth="1.1"
            />
            <rect
              x={x - 2.5}
              y={Math.min(open, close) + 10}
              width="5"
              height={Math.max(2, Math.abs(close - open))}
              rx=".5"
              fill={bullish ? "#153d40" : color}
              stroke={color}
              strokeWidth="1"
            />
          </g>
        );
      })}
      <line
        x1="0"
        x2="280"
        y1="74"
        y2="74"
        stroke="#34d6b6"
        strokeDasharray="3 4"
        opacity=".8"
      />
    </svg>
  );
}

function Bar({
  value,
  tone = "teal",
}: {
  value: number;
  tone?: "teal" | "amber" | "red";
}) {
  return (
    <div className="rms-meter">
      <span
        className={`rms-meter-fill rms-fill-${tone}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="rms-metric">
      <span>{label}</span>
      <strong className={tone ? `rms-${tone}` : ""}>{value}</strong>
    </div>
  );
}

function Header({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rms-phone-header">
      <div className="rms-phone-brand">
        <span className="rms-brand-mark">
          <Image
            src="/brand/jkv-logo.png"
            alt="JKV Prime"
            width={120}
            height={40}
            className="rms-logo"
          />
        </span>

        <div>
          <strong>{title}</strong>
          <small>JKV PRIME / RISK OS</small>
        </div>
      </div>

      <div className="rms-phone-state">
        <strong>{value}</strong>
        <span>{sub}</span>
      </div>
    </div>
  );
}

function ExposureScreen({ phase }: { phase: number }) {
  const reading = ["$48.6M", "$48.9M", "$48.4M", "$48.7M"][phase % 4];
  return (
    <>
      <Header title="Net exposure" value={reading} sub="USD / NOP" />
      <div className="rms-screen-heading">
        <span>INTRADAY EXPOSURE</span>
        <span className="rms-tiny-live">
          <i /> DEMO
        </span>
      </div>
      <div className="rms-panel rms-chart-panel">
        <div className="rms-chart-head">
          <b>EUR/USD</b>
          <span className="rms-positive">+0.28%</span>
        </div>
        <Candles active={true} />
        <div className="rms-price-line">
          <span>08:10</span>
          <span>08:25</span>
          <span>08:40</span>
        </div>
      </div>
      <div className="rms-two-metrics">
        <Metric label="Gross exposure" value="$96.2M" />
        <Metric label="Floating P&L" value="+$212,480" tone="positive" />
      </div>
      <div className="rms-section-label">
        LIMIT UTILISATION <span>SOFT / HARD</span>
      </div>
      <div className="rms-panel rms-stack-sm">
        <div className="rms-row">
          <b>EURUSD</b>
          <span>62%</span>
        </div>
        <Bar value={62 + (phase % 3)} />
        <div className="rms-row">
          <b>XAUUSD</b>
          <span className="rms-warning">85%</span>
        </div>
        <Bar value={85} tone="amber" />
        <div className="rms-row">
          <b>GBPUSD</b>
          <span>41%</span>
        </div>
        <Bar value={41 + (phase % 2)} />
      </div>
      <div className="rms-note">
        <span className="rms-dot rms-dot-amber" /> XAUUSD approaching soft limit
      </div>
    </>
  );
}

function RoutingScreen({ phase }: { phase: number }) {
  const active = phase % 3;
  return (
    <>
      <Header title="Order routing" value="2,418" sub="ORDERS / DEMO" />
      <div className="rms-screen-heading">
        <span>EXECUTION SPLIT</span>
        <span className="rms-tiny-live">
          <i /> DEMO
        </span>
      </div>
      <div className="rms-panel rms-routing-panel">
        <div className="rms-routing-ring">
          <div>
            <b>48%</b>
            <span>A-BOOK</span>
          </div>
        </div>
        <div className="rms-ring-key">
          <span>
            <i className="rms-key-a" /> A-book <b>48%</b>
          </span>
          <span>
            <i className="rms-key-b" /> B-book <b>28%</b>
          </span>
          <span>
            <i className="rms-key-c" /> Hybrid <b>24%</b>
          </span>
        </div>
      </div>
      <div className="rms-section-label">
        ROUTING ENGINE <span>ACTIVE</span>
      </div>
      <div className="rms-panel rms-flow-panel">
        <div className="rms-flow-node">Client order</div>
        <div className="rms-flow-lines">
          <span />
          <span />
          <span />
        </div>
        <div className="rms-flow-dests">
          <span className={active === 0 ? "rms-selected" : ""}>A-BOOK</span>
          <span className={active === 1 ? "rms-selected" : ""}>HYBRID</span>
          <span className={active === 2 ? "rms-selected" : ""}>B-BOOK</span>
        </div>
      </div>
      <div className="rms-section-label">RECENT RULE MATCHES</div>
      <div className="rms-panel rms-list">
        <div className="rms-list-row">
          <span>EURUSD · VIP-2</span>
          <b className="rms-positive">A-book</b>
        </div>
        <div className="rms-list-row">
          <span>XAUUSD · 2.50 lots</span>
          <b className="rms-warning">Hybrid</b>
        </div>
        <div className="rms-list-row">
          <span>GBPUSD · Retail</span>
          <b>B-book</b>
        </div>
      </div>
    </>
  );
}

function DetectionScreen({ phase }: { phase: number }) {
  return (
    <>
      <Header title="Flow intelligence" value="03" sub="OPEN FLAGS" />
      <div className="rms-screen-heading">
        <span>RISK SIGNALS</span>
        <span className="rms-tiny-live">
          <i /> DEMO
        </span>
      </div>
      <div className="rms-panel rms-risk-score">
        <div>
          <small>COMPOSITE RISK SCORE</small>
          <strong>
            {[76, 78, 81, 78][phase % 4]}
            <em>/100</em>
          </strong>
          <span>Elevated activity detected</span>
        </div>
        <div className="rms-risk-gauge">
          <svg viewBox="0 0 100 60">
            <path
              d="M10 50 A40 40 0 0 1 90 50"
              stroke="#26374a"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M10 50 A40 40 0 0 1 90 50"
              stroke="#f2b544"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="105 126"
            />
          </svg>
        </div>
      </div>
      <div className="rms-section-label">
        DETECTION FEED <span>3 ALERTS</span>
      </div>
      <div className="rms-alert">
        <span className="rms-alert-icon rms-alert-red">!</span>
        <div>
          <strong>Latency arbitrage</strong>
          <small>Login 80412 · EURUSD</small>
          <p>Execution pattern deviation identified</p>
        </div>
        <b className="rms-risk-chip rms-risk-high">HIGH</b>
      </div>
      <div className="rms-alert">
        <span className="rms-alert-icon rms-alert-amber">!</span>
        <div>
          <strong>News scalping</strong>
          <small>NFP event window · XAUUSD</small>
          <p>Elevated burst frequency</p>
        </div>
        <b className="rms-risk-chip">MED</b>
      </div>
      <div className="rms-alert">
        <span className="rms-alert-icon rms-alert-amber">!</span>
        <div>
          <strong>Copy-trading cluster</strong>
          <small>4 related logins</small>
          <p>Synchronized entry timestamps</p>
        </div>
        <b className="rms-risk-chip">MED</b>
      </div>
      <div className="rms-note">
        <span className="rms-dot rms-dot-teal" /> Monitoring rules enabled
      </div>
    </>
  );
}

function HedgeScreen({ phase }: { phase: number }) {
  const complete = phase % 4 >= 2;
  return (
    <>
      <Header title="Auto-hedge" value="EURUSD" sub="RISK COVERAGE" />
      <div className="rms-screen-heading">
        <span>THRESHOLD MONITOR</span>
        <span className="rms-tiny-live">
          <i /> DEMO
        </span>
      </div>
      <div className="rms-panel rms-threshold">
        <div className="rms-row">
          <span>Net exposure</span>
          <b>$12.8M</b>
        </div>
        <strong>Limit $12.0M</strong>
        <Bar value={complete ? 61 : 92} tone={complete ? "teal" : "amber"} />
        <small>
          {complete
            ? "Residual exposure back in range"
            : "Threshold exceeded · hedge triggered"}
        </small>
      </div>
      <div className="rms-section-label">EXECUTION WORKFLOW</div>
      <div className="rms-panel rms-timeline">
        <div className="rms-timeline-item rms-done">
          <span>1</span>
          <div>
            <b>Threshold crossed</b>
            <small>EURUSD · $12.8M exposure</small>
          </div>
          <i>✓</i>
        </div>
        <div className="rms-timeline-item rms-done">
          <span>2</span>
          <div>
            <b>Hedge submitted</b>
            <small>Sell · 2.50 lots · JKV pool</small>
          </div>
          <i>✓</i>
        </div>
        <div
          className={`rms-timeline-item ${complete ? "rms-done" : "rms-pending"}`}
        >
          <span>3</span>
          <div>
            <b>{complete ? "Fill confirmed" : "Awaiting fill"}</b>
            <small>
              {complete ? "2.50 / 2.50 lots executed" : "Processing order…"}
            </small>
          </div>
          <i>{complete ? "✓" : "·"}</i>
        </div>
      </div>
      <div className="rms-two-metrics">
        <Metric label="Hedge side" value="SELL" />
        <Metric label="Volume" value="2.50 lots" />
      </div>
      <div className={`rms-hedge-toast ${complete ? "rms-toast-on" : ""}`}>
        ✓ Hedge completed in demo
      </div>
    </>
  );
}

function SpreadScreen({ phase }: { phase: number }) {
  const widen = phase % 4 >= 2;
  return (
    <>
      <Header title="Pricing control" value="VIP-2" sub="ACTIVE GROUP" />
      <div className="rms-screen-heading">
        <span>BID / ASK MONITOR</span>
        <span className="rms-tiny-live">
          <i /> DEMO
        </span>
      </div>
      <div className="rms-panel rms-quotes">
        <div className="rms-quote-head">
          <span>SYMBOL</span>
          <span>BID</span>
          <span>ASK</span>
        </div>
        {[
          ["EURUSD", "1.08421", widen ? "1.08440" : "1.08433"],
          ["GBPUSD", "1.27184", widen ? "1.27210" : "1.27201"],
          ["XAUUSD", "2349.21", widen ? "2350.01" : "2349.68"],
        ].map(([symbol, bid, ask]) => (
          <div className="rms-quote" key={symbol}>
            <strong>{symbol}</strong>
            <span>{bid}</span>
            <span className="rms-positive">{ask}</span>
          </div>
        ))}
      </div>
      <div className="rms-section-label">MARKUP PROFILE</div>
      <div className="rms-panel rms-stack-sm">
        <div className="rms-row">
          <span>VIP-2 / EURUSD markup</span>
          <b>+0.3 pip</b>
        </div>
        <Bar value={30} />
        <div className="rms-row">
          <span>Retail / EURUSD markup</span>
          <b>+0.8 pip</b>
        </div>
        <Bar value={72} tone="amber" />
      </div>
      <div className={`rms-news ${widen ? "rms-news-on" : ""}`}>
        <b>◉ HIGH IMPACT EVENT</b>
        <span>
          {widen ? "News-spread profile active" : "US CPI · protection armed"}
        </span>
        <small>
          {widen ? "Temporary widening applied" : "Configured rule: +0.6 pip"}
        </small>
      </div>
      <div className="rms-panel rms-list">
        <div className="rms-list-row">
          <span>Swap profile / VIP-2</span>
          <b>Custom</b>
        </div>
        <div className="rms-list-row">
          <span>Wednesday rollover</span>
          <b>3×</b>
        </div>
      </div>
    </>
  );
}

function LeverageScreen({ phase }: { phase: number }) {
  const protectedMode = phase % 4 >= 2;
  return (
    <>
      <Header
        title="Leverage rules"
        value={protectedMode ? "1:75" : "1:200"}
        sub="CORE FX"
      />
      <div className="rms-screen-heading">
        <span>EVENT-BASED PROFILES</span>
        <span className="rms-tiny-live">
          <i /> DEMO
        </span>
      </div>
      <div className="rms-panel rms-leverage-main">
        <small>EFFECTIVE LEVERAGE</small>
        <strong>{protectedMode ? "1:75" : "1:200"}</strong>
        <span>
          {protectedMode
            ? "Protective event rule active"
            : "Standard dynamic profile"}
        </span>
        <Bar
          value={protectedMode ? 35 : 83}
          tone={protectedMode ? "amber" : "teal"}
        />
      </div>
      <div className="rms-section-label">SYMBOL PROFILES</div>
      <div className="rms-panel rms-list">
        <div className="rms-list-row">
          <span>EURUSD</span>
          <b>{protectedMode ? "1:75" : "1:200"}</b>
        </div>
        <div className="rms-list-row">
          <span>XAUUSD</span>
          <b>1:100</b>
        </div>
        <div className="rms-list-row">
          <span>GBPUSD</span>
          <b>{protectedMode ? "1:75" : "1:200"}</b>
        </div>
      </div>
      <div className="rms-section-label">SWAP-FREE HANDLING</div>
      <div className="rms-panel rms-swap">
        <div className="rms-row">
          <strong>Islamic account policy</strong>
          <span className="rms-toggle">
            <i />
          </span>
        </div>
        <p>Eligibility, holding-period checks and symbol-level exemptions.</p>
        <div className="rms-swap-tags">
          <span>APPROVED</span>
          <span>HOLDING CHECK</span>
        </div>
      </div>
      <div className="rms-note">
        <span className="rms-dot rms-dot-teal" /> Rules evaluated automatically
      </div>
    </>
  );
}

function Phone({ kind, active }: { kind: FeatureKind; active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setPhase((p) => (p + 1) % 12), 2700);
    return () => window.clearInterval(timer);
  }, [active]);
  return (
    <div
      className="rms-phone-shell"
      aria-label={`${kind} mobile dashboard illustration with simulated data`}
    >
      <div className="rms-phone-side rms-phone-side-left" />
      <div className="rms-phone-side rms-phone-side-right" />
      <div className="rms-phone-glass">
        <div className="rms-status">
          <span>9:41</span>
          <div className="rms-island" />
          <span className="rms-signals">▮▮▮ ◕ ▰</span>
        </div>
        <div className="rms-app-body">
          {kind === "exposure" && <ExposureScreen phase={phase} />}
          {kind === "routing" && <RoutingScreen phase={phase} />}
          {kind === "detection" && <DetectionScreen phase={phase} />}
          {kind === "hedge" && <HedgeScreen phase={phase} />}
          {kind === "spread" && <SpreadScreen phase={phase} />}
          {kind === "leverage" && <LeverageScreen phase={phase} />}
        </div>
        <div className="rms-home-indicator" />
      </div>
    </div>
  );
}

export default function RiskManagementShowcase() {
  const root = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState<Set<number>>(() => new Set());
  const [motionAllowed, setMotionAllowed] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const cards =
      root.current?.querySelectorAll<HTMLElement>("[data-risk-index]");
    if (!cards) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(new Set(features.map((_, i) => i)));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((old) => {
          const next = new Set(old);
          entries.forEach((entry) => {
            const index = Number(
              (entry.target as HTMLElement).dataset.riskIndex,
            );
            if (entry.isIntersecting) next.add(index);
          });
          return next;
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px 60px 0px" },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // Pinned scroll stage: every card has a full arrival interval, including 06.
  // The scene remains sticky through the entire sixth transition and final hold.
  useEffect(() => {
    const stack = root.current?.querySelector<HTMLElement>(".rms-stack");
    if (!stack) return;
    const cards = Array.from(
      stack.querySelectorAll<HTMLElement>("[data-risk-index]"),
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 880px)");
    let frame = 0;
    const clamp = (x: number) => Math.max(0, Math.min(1, x));
    const smooth = (x: number) => x * x * (3 - 2 * x);

    const updateDeck = () => {
      frame = 0;
      if (reduceMotion.matches || narrow.matches) {
        cards.forEach((card) => {
          card.style.removeProperty("--deck-translate");
          card.style.removeProperty("--deck-scale");
          card.style.removeProperty("--deck-opacity");
        });
        return;
      }

      const vh = window.innerHeight;
      const stickyTop = Math.min(115, Math.max(76, vh * 0.115));
      const distancePerCard = vh * 0.78;
      const scrolled = Math.max(
        0,
        stickyTop - stack.getBoundingClientRect().top,
      );
      const progress = Math.min(cards.length - 1, scrolled / distancePerCard);
      const enterDistance = Math.min(vh * 0.8, 650);

      cards.forEach((card, index) => {
        const arrival = index === 0 ? 1 : smooth(clamp(progress - (index - 1)));
        // Only earlier cards recede. New cards slide to precisely the same front position.
        const depth = Math.max(0, progress - index);
        const scale = 1 - Math.min(depth, 5) * 0.038;
        const rise = Math.min(depth, 5) * 22;
        const entering = (1 - arrival) * enterDistance;
        const translateY =
          index === 0 || arrival > 0 ? entering - rise : enterDistance;
        card.style.setProperty(
          "--deck-translate",
          `${translateY.toFixed(2)}px`,
        );
        card.style.setProperty("--deck-scale", scale.toFixed(4));
        card.style.setProperty(
          "--deck-opacity",
          index === 0 || arrival > 0 ? "1" : "0",
        );
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDeck);
    };
    updateDeck();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    reduceMotion.addEventListener("change", requestUpdate);
    narrow.addEventListener("change", requestUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener("change", requestUpdate);
      narrow.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <section id="risk" className="rms" ref={root} aria-labelledby="rms-heading">
      <div className="rms-container">
        <div className="rms-intro">
          <div className="rms-intro-left">
            <span className="rms-eyebrow">
              <span className="rms-star">★</span> RARELY OFFERED BY LIQUIDITY
              PROVIDERS
            </span>
            <span className="rms-overline">RISK MANAGEMENT DASHBOARD</span>
          </div>
          <div className="rms-intro-right">
            <h2 id="rms-heading">
              See every position.
              <br />
              <span>Control every risk.</span>
            </h2>
            <p>
              Advanced and Pro packages include a real-time risk dashboard with
              no third-party licence: exposure, P&amp;L, toxic-flow alerts and
              A/B-book routing in one place.
            </p>
            <a className="rms-cta" href="#contact">
              Book a live demo <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="rms-stack">
          <div className="rms-deck-viewport">
            {features.map((feature, index) => {
              const isVisible = visible.has(index);
              return (
                <article
                  data-risk-index={index}
                  key={feature.kind}
                  className={`rms-feature rms-theme-${feature.theme} ${isVisible ? "rms-in" : ""}`}
                  style={{ "--rms-index": index } as CSSProperties}
                >
                  <div className="rms-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="rms-feature-copy">
                    <span className="rms-kicker">
                      <i /> {feature.category}
                    </span>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    <div className="rms-tags">
                      {feature.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rms-feature-art">
                    <div className="rms-art-halo" />
                    <div className="rms-phone-stage">
                      <Phone
                        kind={feature.kind}
                        active={isVisible && motionAllowed}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <p className="rms-disclaimer">
          Illustrative interface. All displayed prices, positions, accounts and
          events are simulated for demonstration purposes.
        </p>
      </div>
      <style>{styles}</style>
    </section>
  );
}

const styles = `
.rms{--rm-navy:#0B1630;--rm-teal:#16B8A6;--rm-mint:#E6F6F2;--rm-light:#F4F7FA;--rm-ease:cubic-bezier(.22,1,.36,1);background:#F4F7FA;color:#0B1630;padding:clamp(80px,10vw,148px) 0;font-family:Manrope,Inter,system-ui,-apple-system,sans-serif;overflow:visible}
.rms *{box-sizing:border-box}.rms-container{max-width:1480px;margin:auto;padding:0 clamp(18px,3.2vw,48px)}
.rms-intro{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2.1fr);gap:clamp(28px,5vw,90px);align-items:start}.rms-intro-left{display:grid;justify-items:start;gap:18px}.rms-eyebrow{display:inline-flex;align-items:center;gap:9px;background:#0B1630;color:#fff;border-radius:99px;padding:10px 15px;font-size:10px;font-weight:800;letter-spacing:.06em}.rms-star{color:#46e6c8}.rms-overline{font-size:11px;font-weight:800;letter-spacing:.17em;color:#148f83}.rms-intro h2{font-size:clamp(38px,5.1vw,76px);font-weight:750;line-height:.99;letter-spacing:-.06em;margin:0}.rms-intro h2 span{color:#16a995}.rms-intro p{margin:26px 0;max-width:660px;font-size:clamp(16px,1.45vw,19px);line-height:1.75;color:#5A6880}
.rms-cta {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 36px;
  padding: 15px 21px;
  border-radius: 999px;

  background: #16B8A6;
  color: #FFFFFF;
  border: 1px solid #16B8A6;

  text-decoration: none;
  font-weight: 800;
  font-size: 14px;

  transition:
    background-color .3s ease,
    color .3s ease,
    border-color .3s ease,
    transform .3s ease;
}

.rms-cta:hover {
  background: #FFFFFF;
  color: #071F1B;
  border-color: #16B8A6;
  transform: translateY(-2px);
}

.rms-cta span {
  font-size: 19px;
}

.rms-stack{margin-top:clamp(58px,8vw,110px)}.rms-feature{position:sticky;top:calc(90px + var(--rms-index)*7px);z-index:calc(var(--rms-index) + 1);display:grid;grid-template-columns:minmax(70px,.4fr) minmax(230px,1.28fr) minmax(350px,1.52fr);align-items:stretch;gap:clamp(20px,3vw,46px);padding:clamp(24px,3.3vw,48px);min-height:600px;height:min(690px,80vh);margin-bottom:clamp(30px,7vh,80px);border-radius:clamp(24px,2.8vw,40px);overflow:hidden;box-shadow:0 18px 60px -35px rgba(11,22,48,.35)}.rms-feature:last-child{margin-bottom:0}.rms-theme-light{background:#fff;color:#0B1630}.rms-theme-teal{background:#0B9B8D;color:white}
.rms-theme-navy {
  background:
    radial-gradient(
      ellipse 65% 70% at 52% 42%,
      #18584a 0%,
      transparent 95%
    ),
    linear-gradient(
      135deg,
      #103a32 5%,
      #071f1b 100%
    );
  color: #ffffff;
}
.rms-number{font-size:clamp(68px,8vw,134px);line-height:.83;font-weight:400;letter-spacing:-.09em;white-space:nowrap}.rms-feature-copy{align-self:end;padding-bottom:22px;min-width:0}.rms-kicker{display:flex;align-items:center;gap:8px;margin-bottom:24px;text-transform:uppercase;font-size:12px;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-weight:600;letter-spacing:.08em;opacity:.8}.rms-kicker i{width:8px;height:8px;background:currentColor;border-radius:50%}.rms-feature h3{font-size:clamp(35px,3.7vw,59px);letter-spacing:-.06em;line-height:1.03;font-weight:700;max-width:13ch;margin:0}.rms-feature-copy>p{font-size:clamp(15px,1.15vw,18px);line-height:1.65;opacity:.78;max-width:41ch;margin:22px 0 0}.rms-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:26px}.rms-tags span{border:1px solid currentColor;border-radius:99px;padding:7px 13px;font-size:11px;font-weight:800;opacity:.8}
.rms-feature-art{min-height:0;position:relative;display:grid;place-items:center;border-radius:26px;overflow:hidden;isolation:isolate;background:rgba(11,22,48,.045)}.rms-theme-teal .rms-feature-art,.rms-theme-navy .rms-feature-art{background:rgba(255,255,255,.09)}.rms-art-halo{position:absolute;width:80%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(22,184,166,.20),transparent 67%);filter:blur(7px);z-index:-1}.rms-theme-teal .rms-art-halo{background:radial-gradient(circle,rgba(255,255,255,.24),transparent 70%)}.rms-phone-stage{width:100%;height:100%;display:grid;place-items:center;overflow:hidden;padding:30px 12px 0}.rms-phone-shell{width:clamp(234px,24vw,309px);height:clamp(475px,48vw,622px);flex:none;position:relative;background:linear-gradient(130deg,#606b79 0%,#0b0e14 12%,#030609 50%,#303946 92%,#10131a 100%);border:3px solid #151a22;border-radius:47px;padding:10px;box-shadow:0 32px 65px rgba(0,0,0,.34),inset 0 0 0 1px rgba(255,255,255,.2);transform:translateY(60px) scale(.96);opacity:0;transition:transform 1s var(--rm-ease),opacity .8s ease}.rms-in .rms-phone-shell{opacity:1;transform:translateY(18px) scale(1)}.rms-phone-side{position:absolute;background:linear-gradient(90deg,#3b4654,#151922);width:4px;border-radius:4px}.rms-phone-side-left{left:-5px;top:105px;height:55px;box-shadow:0 65px 0 #202732}.rms-phone-side-right{right:-5px;top:165px;height:65px}.rms-phone-glass{height:100%;border-radius:36px;background:#101923;overflow:hidden;position:relative;color:#f6f9ff;border:1px solid #263445}.rms-status{height:36px;display:flex;align-items:center;justify-content:space-between;padding:5px 19px 0;position:relative;font-size:11px;font-weight:800}.rms-island{position:absolute;top:7px;left:50%;transform:translateX(-50%);width:86px;height:22px;background:#020407;border-radius:99px}.rms-signals{font-size:9px;letter-spacing:-1px}.rms-app-body{padding:7px 12px 20px;height:calc(100% - 43px);overflow:hidden;font-size:11px}.rms-home-indicator{position:absolute;left:50%;bottom:7px;transform:translateX(-50%);height:4px;width:89px;border-radius:99px;background:#a8b0b7}.rms-phone-header{display:flex;justify-content:space-between;gap:5px;align-items:center;margin-bottom:16px}.rms-phone-brand{display:flex;align-items:center;gap:7px;min-width:0}.rms-brand-mark{height:29px;width:29px;border-radius:9px;background:linear-gradient(145deg,#0b786f,#16B8A6);display:grid;place-items:center;font-size:18px;font-weight:900}.rms-phone-brand strong{display:block;font-size:12px;white-space:nowrap}.rms-phone-brand small{display:block;font-size:7px;letter-spacing:.08em;color:#8193a8;white-space:nowrap}.rms-phone-state{text-align:right}.rms-phone-state strong{font-size:14px;display:block;white-space:nowrap;font-variant-numeric:tabular-nums}.rms-phone-state>span{font-size:7px;letter-spacing:.07em;color:#8b9cb0;display:block;white-space:nowrap}.rms-screen-heading,.rms-section-label{display:flex;justify-content:space-between;gap:5px;align-items:center;font-size:8px;letter-spacing:.12em;color:#9dabbd;font-weight:800;margin:13px 0 8px}.rms-section-label span{color:#50d8bb}.rms-tiny-live{color:#65e4c3;display:flex;align-items:center;gap:4px}.rms-tiny-live i,.rms-dot{width:6px;height:6px;border-radius:50%;background:#34d6b6;display:inline-block;animation:rmsPulse 2s infinite}.rms-panel{background:#192536;border:1px solid #2b3b50;border-radius:13px;padding:11px}.rms-chart-panel{padding:10px 8px}.rms-chart-head,.rms-row{display:flex;align-items:center;justify-content:space-between;gap:9px}.rms-chart-head b,.rms-row b{font-size:11px}.rms-chart-head span{font-size:10px}.rms-positive{color:#4be1b6!important}.rms-warning{color:#ffc96c!important}.rms-candles{width:100%;height:116px;display:block;margin-top:4px}.rms-candle{transform-origin:center;opacity:0;animation:rmsCandle .45s ease forwards}.rms-price-line{display:flex;justify-content:space-between;font-size:8px;color:#77899d}.rms-two-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:9px}.rms-metric{background:#192536;border:1px solid #2b3b50;padding:10px 9px;border-radius:11px}.rms-metric span{display:block;font-size:8px;color:#91a3b7}.rms-metric strong{font-size:12px;display:block;margin-top:4px;font-variant-numeric:tabular-nums}.rms-stack-sm{display:grid;gap:7px}.rms-stack-sm .rms-row{margin-top:3px;font-size:10px}.rms-meter{width:100%;height:5px;border-radius:20px;background:#314053;overflow:hidden}.rms-meter-fill{display:block;height:100%;border-radius:inherit;transition:width 1.2s ease}.rms-fill-teal{background:#34d6b6}.rms-fill-amber{background:#f2b544}.rms-fill-red{background:#f2616d}.rms-note{margin-top:10px;font-size:9px;color:#9cb0c4;display:flex;gap:6px;align-items:center}.rms-dot-amber{background:#f2b544}.rms-dot-teal{background:#34d6b6}.rms-routing-panel{display:flex;align-items:center;gap:15px}.rms-routing-ring{width:108px;height:108px;border-radius:50%;background:conic-gradient(#34d6b6 0 48%,#f2b544 48% 76%,#6577ca 76% 100%);display:grid;place-items:center;flex-shrink:0}.rms-routing-ring>div{width:75px;height:75px;background:#192536;border-radius:50%;display:grid;place-content:center;text-align:center}.rms-routing-ring b{font-size:23px}.rms-routing-ring span{font-size:8px;color:#9fb1c4}.rms-ring-key{display:grid;gap:11px;flex:1}.rms-ring-key>span{display:flex;gap:4px;align-items:center;justify-content:space-between;font-size:9px}.rms-ring-key i{width:6px;height:6px;border-radius:50%}.rms-key-a{background:#34d6b6}.rms-key-b{background:#f2b544}.rms-key-c{background:#6577ca}.rms-flow-panel{text-align:center;padding:12px 9px}.rms-flow-node{background:#0d6d67;border:1px solid #249c91;border-radius:9px;padding:8px;width:128px;margin:auto;font-size:10px;font-weight:800}.rms-flow-lines{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin:0 20px;height:29px}.rms-flow-lines span{height:100%;border-left:1px dashed #3edcba;justify-self:center;animation:rmsFlow 1.1s linear infinite}.rms-flow-lines span:nth-child(2){animation-delay:.25s}.rms-flow-lines span:nth-child(3){animation-delay:.5s}.rms-flow-dests{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.rms-flow-dests span{border:1px solid #3b4c60;border-radius:7px;padding:8px 1px;font-size:8px;font-weight:800;color:#869aad;transition:.3s}.rms-flow-dests .rms-selected{background:rgba(52,214,182,.14);border-color:#34d6b6;color:#60edc9}.rms-list{padding:3px 10px}.rms-list-row{display:flex;align-items:center;justify-content:space-between;gap:5px;padding:11px 0;border-bottom:1px solid #2d3d50;font-size:10px}.rms-list-row:last-child{border-bottom:0}.rms-list-row span{color:#a6b6c6}.rms-risk-score{display:flex;justify-content:space-between;align-items:center;gap:10px}.rms-risk-score small{font-size:8px;letter-spacing:.1em;color:#9fb0c2}.rms-risk-score strong{display:block;font-size:37px;line-height:1;margin:7px 0}.rms-risk-score em{font-size:13px;font-style:normal;color:#8ea0b3}.rms-risk-score span{display:block;color:#f2b544;font-size:9px}.rms-risk-gauge{width:100px;align-self:center}.rms-alert{padding:10px 8px;margin-bottom:8px;display:grid;grid-template-columns:22px 1fr auto;align-items:start;gap:6px;background:#192536;border:1px solid #2b3b50;border-radius:11px}.rms-alert-icon{width:21px;height:21px;border-radius:7px;display:grid;place-items:center;font-size:11px;font-weight:900}.rms-alert-red{color:#ffb3b9;background:#592e3e}.rms-alert-amber{color:#ffd68b;background:#55442d}.rms-alert strong{font-size:10px}.rms-alert small{display:block;color:#a0b1c4;font-size:8px;margin-top:4px}.rms-alert p{font-size:8px;line-height:1.4;color:#7f93a8;margin:5px 0 0}.rms-risk-chip{padding:4px 5px;border-radius:5px;background:rgba(242,181,68,.15);color:#ffd68b;font-size:7px}.rms-risk-high{background:rgba(242,97,109,.16);color:#ffb3b9}.rms-threshold strong{display:block;font-size:10px;margin:7px 0}.rms-threshold small{display:block;color:#b0c2d2;font-size:9px;margin-top:8px}.rms-timeline{padding:2px 10px}.rms-timeline-item{display:grid;grid-template-columns:24px 1fr 16px;gap:7px;align-items:center;padding:12px 0;border-bottom:1px solid #2e3f53}.rms-timeline-item:last-child{border-bottom:none}.rms-timeline-item>span{height:23px;width:23px;border-radius:50%;display:grid;place-items:center;background:#34465a;font-size:10px}.rms-timeline-item b{font-size:10px;display:block}.rms-timeline-item small{display:block;font-size:8px;color:#92a5ba;margin-top:4px}.rms-timeline-item i{color:#45e2b7;font-style:normal;font-weight:800}.rms-pending i{color:#f2b544;animation:rmsPulse 1.5s infinite}.rms-hedge-toast{padding:10px;border:1px solid #39bda4;border-radius:11px;margin-top:10px;background:rgba(52,214,182,.12);color:#5ef0ca;font-size:10px;font-weight:800;opacity:.28;transition:.4s}.rms-toast-on{opacity:1}.rms-quote-head,.rms-quote{display:grid;grid-template-columns:1.1fr 1fr 1fr;align-items:center;gap:4px;padding:10px 0;text-align:right;border-bottom:1px solid #2e3f53}.rms-quote-head{padding:3px 0 9px;color:#8295a9;font-size:8px}.rms-quote-head span:first-child,.rms-quote strong{text-align:left}.rms-quote{font-size:10px}.rms-quote:last-child{border:0}.rms-news{margin:12px 0 10px;padding:11px;background:#3c3528;border:1px solid #705735;border-radius:12px;transition:background .5s}.rms-news-on{background:#56402a}.rms-news b{display:block;color:#ffcc78;font-size:8px;letter-spacing:.08em}.rms-news span{display:block;margin-top:7px;font-size:11px;font-weight:800}.rms-news small{display:block;margin-top:3px;font-size:8px;color:#d0b992}.rms-leverage-main{text-align:center;padding:20px}.rms-leverage-main small{font-size:8px;color:#94a7ba;letter-spacing:.1em}.rms-leverage-main strong{display:block;font-size:47px;letter-spacing:-.05em;margin:5px 0}.rms-leverage-main>span{font-size:9px;color:#75e8ca;display:block;margin-bottom:15px}.rms-swap p{font-size:9px;color:#a3b6c8;line-height:1.6;margin:12px 0}.rms-toggle{width:30px;height:17px;border-radius:99px;background:#24ae99;display:flex;align-items:center;justify-content:flex-end;padding:3px}.rms-toggle i{width:11px;height:11px;background:white;border-radius:50%}.rms-swap-tags{display:flex;gap:6px;flex-wrap:wrap}.rms-swap-tags span{padding:6px;background:rgba(52,214,182,.12);border-radius:7px;color:#73efce;font-size:8px;font-weight:800}.rms-art-note{position:absolute;bottom:12px;right:14px;font-size:8px;font-weight:800;letter-spacing:.08em;opacity:.45}.rms-disclaimer{margin:22px 0 0;text-align:center;font-size:12px;color:#78859a}
@keyframes rmsCandle{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}@keyframes rmsPulse{50%{opacity:.25}}@keyframes rmsFlow{to{border-left-color:rgba(62,220,186,.12)}}
@media(max-width:1150px){.rms-feature{grid-template-columns:90px minmax(200px,1.2fr) minmax(310px,1fr);gap:22px;min-height:570px}.rms-feature h3{font-size:clamp(31px,3.6vw,46px)}.rms-phone-shell{width:255px;height:515px}}
@media(max-width:880px){.rms-intro{grid-template-columns:1fr;gap:20px}.rms-feature{position:relative;top:auto;grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr;gap:16px;height:auto;min-height:530px;margin-bottom:20px}.rms-number{grid-column:1/-1;font-size:64px}.rms-feature-copy{align-self:center;padding-bottom:0}.rms-feature-art{min-height:440px}.rms-phone-shell{width:224px;height:453px}.rms-feature h3{font-size:34px}}
@media(max-width:600px){.rms{padding:75px 0}.rms-intro h2{font-size:clamp(37px,9.3vw,54px)}.rms-intro p{margin:16px 0 22px}.rms-feature{display:flex;flex-direction:column;padding:22px;min-height:0;border-radius:26px;gap:15px}.rms-number{font-size:58px}.rms-feature-copy{align-self:stretch}.rms-feature h3{font-size:clamp(32px,9vw,43px);max-width:18ch}.rms-feature-copy>p{font-size:15px;line-height:1.55;margin-top:12px}.rms-kicker{margin-bottom:12px}.rms-tags{margin-top:17px}.rms-feature-art{height:450px;min-height:450px;margin-top:10px;border-radius:20px}.rms-phone-shell{width:225px;height:455px}.rms-phone-stage{padding-top:20px}.rms-art-note{font-size:7px}.rms-stack{margin-top:55px}}
@media(max-width:360px){.rms-feature-art{height:426px;min-height:426px}.rms-phone-shell{width:210px;height:430px}.rms-feature{padding:17px}.rms-tags span{font-size:10px}}
@media(prefers-reduced-motion:reduce){.rms *, .rms *::before,.rms *::after{animation:none!important;transition:none!important}.rms-candle{opacity:1}.rms-phone-shell{opacity:1;transform:translateY(18px) scale(1)}}

/* ===== JKV PRIME — COMPACT REFERENCE-STYLE STACK FIX =====
   Card stays entirely within viewport; phone extends below the art viewport
   and is intentionally cropped at the bottom, like the reference. */
.rms-stack{position:relative;margin-top:clamp(54px,8vh,90px);padding-bottom:0;overflow:visible}
.rms-feature{
  position:sticky;
  top:clamp(76px,11vh,105px);
  height:clamp(390px,calc(100svh - 145px),540px);
  min-height:0;
  grid-template-columns:clamp(72px,8vw,116px) minmax(0,1fr) minmax(0,1.13fr);
  gap:clamp(14px,1.9vw,28px);
  padding:clamp(20px,2.6vw,36px);
  margin-bottom:clamp(60px,15vh,130px);
  overflow:hidden;
}
.rms-feature:last-child{margin-bottom:0}
.rms-number{font-size:clamp(62px,7vw,108px);line-height:.83}
.rms-feature-copy{align-self:center;padding:0 0 8px}
.rms-kicker{margin-bottom:14px}
.rms-feature h3{font-size:clamp(29px,3.15vw,48px);line-height:1.04}
.rms-feature-copy>p{margin-top:14px;font-size:clamp(14px,1.05vw,17px);line-height:1.52}
.rms-tags{margin-top:18px;gap:6px}
.rms-tags span{padding:6px 10px;font-size:10px}
.rms-feature-art{height:100%;min-height:0;overflow:hidden}
.rms-phone-stage{
  position:absolute;
  inset:0;
  display:block;
  overflow:hidden;
  padding:0;
}
.rms-phone-shell{
  position:absolute;
  top:clamp(15px,3vh,28px);
  left:50%;
  width:clamp(230px,23vw,295px);
  height:clamp(465px,46vw,595px);
  max-width:calc(100% - 24px);
  transform:translate(-50%,38px) scale(.97);
}
.rms-in .rms-phone-shell{transform:translate(-50%,0) scale(1)}
.rms-art-note{z-index:2;bottom:10px;right:12px;background:rgba(11,22,48,.6);color:#fff;border-radius:6px;padding:4px 6px;opacity:.8}
.rms-brand-mark{overflow:hidden;background:#fff;padding:3px;display:grid;place-items:center;flex:none}
.rms-brand-mark img{display:block;width:100%;height:100%;object-fit:contain}
/* Taller screens still use a compact card rather than stretching phones. */
@media (min-width:881px) and (max-height:620px){
  .rms-feature{top:64px;height:calc(100svh - 95px);min-height:320px;padding:18px}
  .rms-number{font-size:58px}.rms-feature h3{font-size:29px}
  .rms-feature-copy>p{font-size:13px}.rms-tags{display:none}
}
@media(max-width:880px){
  /* On narrow screens: no sticky cards, avoid viewport-sized giant panels. */
  .rms-feature{position:relative;top:auto;height:auto;min-height:0;
    grid-template-columns:70px minmax(0,1fr);grid-template-rows:auto auto;
    gap:14px;padding:24px;margin-bottom:22px}
  .rms-number{grid-column:1;grid-row:1;font-size:64px}
  .rms-feature-copy{grid-column:2;grid-row:1;align-self:start;padding:0}
  .rms-feature h3{font-size:clamp(27px,4vw,36px)}
  .rms-feature-art{grid-column:1/-1;grid-row:2;height:345px;min-height:0}
  .rms-phone-shell{width:235px;height:475px;top:16px}
  .rms-tags{margin-top:12px}
}
@media(max-width:600px){
  .rms-feature{display:grid;grid-template-columns:58px minmax(0,1fr);
    grid-template-rows:auto auto;gap:12px;padding:17px;margin-bottom:18px}
  .rms-number{font-size:51px;grid-column:1;grid-row:1}
  .rms-feature-copy{grid-column:2;grid-row:1}
  .rms-kicker{font-size:10px;margin-bottom:9px}
  .rms-feature h3{font-size:clamp(23px,6vw,32px);line-height:1.1}
  .rms-feature-copy>p{font-size:13px;line-height:1.45;margin-top:9px}
  .rms-tags{margin-top:10px}
  .rms-tags span{font-size:9px;padding:5px 8px}
  .rms-feature-art{grid-column:1/-1;grid-row:2;margin-top:0;height:295px;min-height:0}
  .rms-phone-shell{width:218px;height:440px;top:12px}
}
@media(max-width:360px){
  .rms-feature{padding:14px;grid-template-columns:49px minmax(0,1fr)}
  .rms-number{font-size:44px}
  .rms-feature-art{height:270px;min-height:0}
  .rms-phone-shell{width:205px;height:413px;top:10px}
}
@media(prefers-reduced-motion:reduce){
  .rms-phone-shell,.rms-in .rms-phone-shell{opacity:1;transform:translate(-50%,0) scale(1)}
}


/* ===== PINNED LAYERED STACK: COMPLETE SIXTH-CARD ARRIVAL ===== */
@media (min-width:881px) {
  .rms-stack {
    --deck-step: 78svh;
    height: calc(5 * var(--deck-step) + 110svh);
    position: relative;
    overflow: visible;
    padding: 0;
    margin-top: clamp(54px,8vh,90px);
  }
  .rms-deck-viewport {
    position: sticky;
    top: clamp(76px,11.5vh,115px);
    height: clamp(400px,calc(100svh - 180px),585px);
    isolation: isolate;
    overflow: visible;
  }
  .rms-feature {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    min-height: 0;
    margin: 0;
    top: 0;
    z-index: calc(var(--rms-index) + 1);
    grid-template-columns: clamp(75px,7.4vw,112px) minmax(0,1.34fr) minmax(0,1.04fr);
    gap: clamp(14px,2.2vw,34px);
    padding: clamp(24px,3vw,43px);
    transform: translate3d(0,var(--deck-translate,900px),0) scale(var(--deck-scale,1));
    transform-origin: center top;
    opacity: var(--deck-opacity,0);
    will-change: transform;
    backface-visibility: hidden;
    box-shadow: 0 24px 65px -30px rgba(11,22,48,.38);
  }
  .rms-feature:first-child {
    --deck-translate: 0px;
    --deck-opacity: 1;
  }
  .rms-number {font-size: clamp(73px,7.6vw,120px);letter-spacing:-.095em}
  .rms-feature-copy {align-self:center;padding-bottom:0}
  .rms-kicker {font-size:clamp(12px,1.03vw,15px);letter-spacing:.11em;margin-bottom:clamp(16px,2.6vh,27px)}
  .rms-feature h3 {font-size:clamp(43px,4.25vw,69px);line-height:1.01;letter-spacing:-.061em;max-width:16ch;text-wrap:balance}
  .rms-feature-copy>p {max-width:42ch;font-size:clamp(17px,1.38vw,21px);line-height:1.55;margin-top:clamp(16px,2.4vh,24px)}
  .rms-tags {margin-top:clamp(16px,2.6vh,25px)}
  .rms-tags span {font-size:11px;padding:8px 12px}
  .rms-feature-art {border-radius:clamp(19px,2vw,30px)}
}
@media (min-width:881px) and (max-width:1150px) {
  .rms-feature {grid-template-columns:73px minmax(0,1.22fr) minmax(0,1fr);gap:16px}
  .rms-feature h3 {font-size:clamp(39px,4.2vw,51px)}
  .rms-feature-copy>p {font-size:17px}
}
@media (min-width:881px) and (max-height:650px) {
  .rms-deck-viewport {top:64px;height:calc(100svh - 112px);min-height:330px}
  .rms-feature {padding:20px 26px}
  .rms-feature h3 {font-size:clamp(32px,3.1vw,45px)}
  .rms-feature-copy>p {font-size:15px;margin-top:12px}
  .rms-kicker {margin-bottom:10px}
  .rms-tags {margin-top:12px}
  .rms-tags span {padding:6px 10px;font-size:10px}
}
@media (max-width:880px) {
  .rms-stack {height:auto; padding:0}
  .rms-deck-viewport {position:static;height:auto;display:grid;gap:20px}
  .rms-feature {position:relative;top:auto;inset:auto;opacity:1!important;transform:none!important;margin:0;will-change:auto}
  .rms-feature h3 {font-size:clamp(30px,4.8vw,42px)}
  .rms-feature-copy>p {font-size:clamp(15px,2.2vw,18px)}
}
@media (max-width:600px) {
  .rms-feature h3 {font-size:clamp(27px,6.4vw,36px)}
  .rms-feature-copy>p {font-size:14px;line-height:1.5}
}
@media (prefers-reduced-motion:reduce) and (min-width:881px) {
  .rms-feature {transform:translate3d(0,0,0)!important;opacity:1!important;will-change:auto}
  .rms-stack {height:auto;display:grid;gap:18px}
  .rms-deck-viewport {position:static;height:auto;display:grid;gap:18px}
  .rms-feature {position:relative;height:clamp(400px,calc(100svh - 180px),585px)}
}

`;
