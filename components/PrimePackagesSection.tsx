"use client";

import React, { useEffect, useRef, useState } from "react";

type PackageTier = {
  id: string;
  name: string;
  subtitle: string;
  volume: string;
  summary: string;
  cta: string;
  featured?: boolean;
  liquidity: string[];
  connectivity: string[];
  risk: string[];
  service: string[];
};

const packages: PackageTier[] = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "For brokers launching or building their flow",
    volume: "Up to $1B / month",
    summary: "Liquidity and connectivity only",
    cta: "Start with Starter",
    liquidity: [
      "Aggregated Tier-1 standard stream",
      "FX majors, minors & precious metals",
      "Market execution, standard routing",
      "Standard commission tier",
    ],
    connectivity: [
      "FIX 4.4: 1 price + 1 trade session",
      "MT4/MT5 bridge via VPN to LD4",
    ],
    risk: ["Risk management dashboard", "Risk tools & server plugins"],
    service: ["Daily trade & statement reports", "24/5 email support"],
  },
  {
    id: "advanced",
    name: "Advanced",
    subtitle: "For established brokers and prop firms",
    volume: "$1B – $1.5B / month",
    summary: "Adds risk dashboard & core plugins",
    cta: "Choose Advanced",
    featured: true,
    liquidity: [
      "Tier-1 + non-bank, custom stream",
      "Adds indices & energies",
      "Smart order routing, partial fills",
      "Reduced commission tier",
    ],
    connectivity: [
      "FIX 4.4: 2 price + 2 trade + drop copy",
      "LD4 cross-connect with LD5 backup",
    ],
    risk: [
      "Risk dashboard: exposure, P&L, margin, alerts",
      "Exposure & NOP limits",
      "A/B-book & hybrid routing",
      "Markup manager + auto-hedge plugins",
    ],
    service: [
      "Daily TCA & execution-quality reports",
      "24/5 priority prime desk",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    subtitle: "For high-volume brokers, funds and venues",
    volume: "$2B+ / month",
    summary: "Full suite, bespoke terms",
    cta: "Talk to sales",
    liquidity: [
      "Bespoke LP mix, dedicated streams",
      "Full multi-asset incl. crypto & equity CFDs",
      "Custom execution logic & last-look controls",
      "Preferential pricing + volume rebates",
    ],
    connectivity: [
      "Unlimited FIX sessions + drop copy",
      "Dual LD4 + LD5 cross-connect, full failover",
    ],
    risk: [
      "Full dashboard + custom risk rules",
      "Toxic-flow & latency-arbitrage detection",
      "Complete plugin suite incl. dynamic leverage & swap-free",
      "Multi-server, multi-entity view + risk API",
    ],
    service: [
      "Custom reporting & data exports",
      "Dedicated account & technical manager",
    ],
  },
];

const comparisonRows = [
  {
    label: "Monthly volume",
    starter: "Up to $1B",
    advanced: "$1B – $1.5B",
    pro: "$2B+",
  },
  {
    label: "Liquidity",
    starter: "Tier-1 standard stream",
    advanced: "Tier-1 + non-bank custom stream",
    pro: "Bespoke LP mix & dedicated streams",
  },
  {
    label: "Markets",
    starter: "FX + precious metals",
    advanced: "FX + metals + indices + energies",
    pro: "Full multi-asset incl. crypto & equity CFDs",
  },
  {
    label: "FIX sessions",
    starter: "1 price + 1 trade",
    advanced: "2 price + 2 trade + drop copy",
    pro: "Unlimited + drop copy",
  },
  {
    label: "Risk tools",
    starter: "Basic dashboard / tools",
    advanced: "Dashboard + core plugins",
    pro: "Full suite + custom rules + API",
  },
  {
    label: "Support",
    starter: "24/5 email support",
    advanced: "24/5 priority prime desk",
    pro: "Dedicated account & technical manager",
  },
];

function TickIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="pps-tick-icon">
      <path
        d="M7.8 13.9 4.6 10.7l-1.4 1.4 4.6 4.6L16.8 7.7l-1.4-1.4z"
        fill="currentColor"
      />
    </svg>
  );
}

function PackageList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="pps-group">
      <div className="pps-group-title">{title}</div>
      <ul className="pps-list">
        {items.map((item) => (
          <li key={item}>
            <TickIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PrimePackagesSection() {
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [circleOrigin, setCircleOrigin] = useState({
    x: "50%",
    y: "50%",
    radius: "170px",
  });
  const expandButtonRef = useRef<HTMLButtonElement>(null);

  const openComparison = () => {
    const rect = expandButtonRef.current?.getBoundingClientRect();
    if (rect) {
      setCircleOrigin({
        x: `${rect.left + rect.width / 2}px`,
        y: `${rect.top + rect.height / 2}px`,
        radius: `${rect.width / 2}px`,
      });
    }
    setComparisonOpen(true);
  };

  useEffect(() => {
    if (!comparisonOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setComparisonOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [comparisonOpen]);

  return (
    <section className="pps" id="packages" aria-labelledby="pps-heading">
      <div className="pps-shell">
        <div className="pps-top">
          <div className="pps-top-left">
            <span className="pps-overline">PRIME PACKAGES</span>
            <h2 id="pps-heading">
              <span className="pps-heading-first">Three packages,</span>
              <span className="pps-heading-second">priced by volume</span>
            </h2>
          </div>

          <div className="pps-top-right">
            <p>
              Your package is set by monthly notional volume. Each step up adds
              connectivity, risk tools, plugins and support, and the full
              comparison is below.
            </p>
          </div>
        </div>

        <div className="pps-grid">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`pps-card ${pkg.featured ? "pps-card-featured" : ""}`}
            >
              {pkg.featured && <div className="pps-badge">Most popular</div>}

              <div className="pps-card-inner">
                <div className="pps-card-head">
                  <div className="pps-card-name-wrap">
                    <div className="pps-card-kicker">
                      Package / {pkg.name.toLowerCase()}
                    </div>
                    <h3>{pkg.name}</h3>
                    <p className="pps-subtitle">{pkg.subtitle}</p>
                  </div>

                  <div className="pps-volume-box">
                    <span>Monthly volume</span>
                    <strong>{pkg.volume}</strong>
                    <small>{pkg.summary}</small>
                  </div>
                </div>

                <div className="pps-card-body">
                  <PackageList
                    title="Liquidity & execution"
                    items={pkg.liquidity}
                  />
                  <PackageList title="Connectivity" items={pkg.connectivity} />
                  <PackageList title="Risk & plugins" items={pkg.risk} />
                  <PackageList title="Service" items={pkg.service} />
                </div>

                <div className="pps-card-foot">
                  <a href="#contact" className="pps-btn">
                    {pkg.cta}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="pps-expand-area">
          <button
            type="button"
            ref={expandButtonRef}
            className="pps-expand-button"
            onClick={openComparison}
            aria-expanded={comparisonOpen}
            aria-controls="pps-full-comparison"
          >
            <svg
              className="pps-expand-ring"
              viewBox="0 0 340 340"
              aria-hidden="true"
            >
              <circle
                className="pps-expand-ring-track"
                cx="170"
                cy="170"
                r="158"
                pathLength="100"
              />
              <circle
                className="pps-expand-ring-progress"
                cx="170"
                cy="170"
                r="158"
                pathLength="100"
              />
            </svg>
            <span className="pps-expand-fill" aria-hidden="true" />
            <span className="pps-expand-label">
              <span className="pps-expand-hint">Explore the details</span>
              <strong>Compare all packages</strong>
              <span className="pps-expand-arrow" aria-hidden="true">
                ↗
              </span>
            </span>
          </button>
        </div>

        {/* The circle itself expands into this full-viewport comparison panel. */}
        <div
          id="pps-full-comparison"
          className={`pps-circle-screen ${comparisonOpen ? "pps-circle-screen-open" : ""}`}
          style={
            {
              "--pps-origin-x": circleOrigin.x,
              "--pps-origin-y": circleOrigin.y,
              "--pps-origin-radius": circleOrigin.radius,
            } as React.CSSProperties
          }
          aria-hidden={!comparisonOpen}
          inert={!comparisonOpen}
          role="dialog"
          aria-modal={comparisonOpen}
          aria-label="JKV Prime packages full comparison"
        >
          <div className="pps-circle-screen-scroll">
            <div className="pps-circle-screen-inner">
              <div className="pps-screen-heading">
                <span className="pps-screen-kicker">
                  JKV PRIME / PACKAGE COMPARISON
                </span>
                <button
                  type="button"
                  className="pps-screen-close"
                  onClick={() => setComparisonOpen(false)}
                  aria-label="Close full comparison"
                >
                  Close <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="pps-screen-content">
                <h2 className="pps-screen-title">
                  Compare every <span>advantage.</span>
                </h2>
                <p className="pps-screen-description">
                  Explore the differences in liquidity, execution, connectivity,
                  risk tools and support.
                </p>
                <div className="pps-compare">
                  <div className="pps-compare-head">
                    <span className="pps-compare-kicker">FULL COMPARISON</span>
                    <h3>At a glance</h3>
                  </div>
                  <div className="pps-compare-table-wrap">
                    <div className="pps-compare-table">
                      <div className="pps-row pps-row-head">
                        <div className="pps-col pps-col-label">Feature</div>
                        <div className="pps-col">Starter</div>
                        <div className="pps-col pps-col-featured">Advanced</div>
                        <div className="pps-col">Pro</div>
                      </div>
                      {comparisonRows.map((row) => (
                        <div className="pps-row" key={row.label}>
                          <div className="pps-col pps-col-label">
                            {row.label}
                          </div>
                          <div className="pps-col">{row.starter}</div>
                          <div className="pps-col pps-col-featured">
                            {row.advanced}
                          </div>
                          <div className="pps-col">{row.pro}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pps-screen-bottom">
                  <a
                    className="pps-screen-contact"
                    href="#contact"
                    onClick={() => setComparisonOpen(false)}
                  >
                    Discuss your requirements <span aria-hidden="true">↗</span>
                  </a>
                  <button
                    type="button"
                    className="pps-screen-back"
                    onClick={() => setComparisonOpen(false)}
                  >
                    ← Back to packages
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pps {
          --pps-navy: #071F1B;
          --pps-navy-2: #103A32;
          --pps-teal: #16b8a6;
          --pps-teal-soft: #dff6f1;
          --pps-mint: #e6f6f2;
          --pps-bg: #f4f7fa;
          --pps-white: #ffffff;
          --pps-text: #0f1b34;
          --pps-text-soft: #5f6d84;
          --pps-line: rgba(11, 22, 48, 0.1);
          --pps-shadow: 0 24px 70px rgba(11, 22, 48, 0.08);
          --pps-shadow-strong: 0 28px 90px rgba(11, 22, 48, 0.14);

          padding: clamp(24px, 3vw, 45px) 0 clamp(70px, 7vw, 110px);
          background:
            radial-gradient(circle at top right, rgba(22, 184, 166, 0.08), transparent 28%),
            linear-gradient(180deg, #ffffff 0%, var(--pps-bg) 100%);
          color: var(--pps-text);
          overflow: hidden;
        }

        .pps * {
          box-sizing: border-box;
        }

        .pps-shell {
          width: min(1440px, calc(100% - 40px));
          margin: 0 auto;
        }

        .pps-top {
          display: grid;
          grid-template-columns: minmax(0, 1.6fr) minmax(0, 0.7fr);
          gap: clamp(28px, 5vw, 80px);
          align-items: end;
          margin-bottom: clamp(38px, 5vw, 58px);
        }

        .pps-overline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--pps-teal);
          margin-bottom: 16px;
        }

        .pps-overline::before {
          content: "";
          width: 26px;
          height: 1px;
          background: currentColor;
        }

        .pps h2 {
          margin: 0;
          font-size: clamp(38px, 4.65vw, 72px);
          line-height: 1.02;
          letter-spacing: -0.06em;
          font-weight: 750;
          color: var(--pps-navy);
          max-width: none;
        }

        .pps h2 .pps-heading-first,
        .pps h2 .pps-heading-second {
          display: block;
          white-space: nowrap;
        }
        .pps h2 .pps-heading-first { color: var(--pps-navy); }
        .pps h2 .pps-heading-second { color: var(--pps-teal); }

        .pps-top-right p {
          margin: 0;
          max-width: 580px;
          font-size: clamp(16px, 1.3vw, 19px);
          line-height: 1.8;
          color: var(--pps-text-soft);
        }

        .pps-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          align-items: stretch;
        }

        .pps-card {
          position: relative;
          display: flex;
          min-height: 100%;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid var(--pps-line);
          backdrop-filter: blur(10px);
          box-shadow: var(--pps-shadow);
          overflow: hidden;
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .pps-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--pps-shadow-strong);
          border-color: rgba(22, 184, 166, 0.22);
        }

        .pps-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top right, rgba(22, 184, 166, 0.09), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0.96));
          pointer-events: none;
        }

        .pps-card-featured {
          border-color: #16B8A6;
          background: #16B8A6;
          color: #ffffff;
          box-shadow: 0 30px 100px rgba(11, 22, 48, 0.16);
          transform: translateY(-8px);
        }

        .pps-card-featured::before {
          background: none;
        }

        .pps-badge {
          position: absolute;
          top: 18px;
          right: 18px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: #071F1B;
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 10px 28px rgba(22, 184, 166, 0.28);
        }

        .pps-card-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 28px;
        }

        .pps-card-head {
          display: grid;
          gap: 18px;
          margin-bottom: 26px;
        }

        .pps-card-kicker {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--pps-teal);
          margin-bottom: 10px;
        }

        .pps-card-featured .pps-card-kicker {
          color: #FFFFFF;
        }

        .pps-card h3 {
          margin: 0;
          font-size: clamp(28px, 2vw, 40px);
          line-height: 1;
          letter-spacing: -0.05em;
          font-weight: 760;
          color: inherit;
        }

        .pps-subtitle {
          margin: 12px 0 0;
          font-size: 15px;
          line-height: 1.7;
          color: var(--pps-text-soft);
        }

        .pps-card-featured .pps-subtitle {
          color: #FFFFFF;
          opacity: .92;
        }

        .pps-volume-box {
          display: grid;
          gap: 8px;
          padding: 16px 18px;
          border-radius: 20px;
          background: rgba(11, 22, 48, 0.04);
          border: 1px solid rgba(11, 22, 48, 0.08);
        }

        .pps-card-featured .pps-volume-box {
          background: rgba(255, 255, 255, 0.13);
          border-color: rgba(255, 255, 255, 0.38);
        }

        .pps-volume-box span {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--pps-text-soft);
        }

        .pps-card-featured .pps-volume-box span {
          color: #FFFFFF;
          opacity: .9;
        }

        .pps-volume-box strong {
          font-size: 28px;
          line-height: 1.05;
          letter-spacing: -0.05em;
          color: inherit;
        }

        .pps-volume-box small {
          font-size: 14px;
          line-height: 1.5;
          color: var(--pps-teal);
          font-weight: 700;
        }

        .pps-card-featured .pps-volume-box small {
          color: #FFFFFF;
        }

        .pps-card-body {
          display: grid;
          gap: 18px;
          flex: 1;
        }

        .pps-group {
          border-top: 1px solid rgba(11, 22, 48, 0.08);
          padding-top: 16px;
        }

        .pps-card-featured .pps-group {
          border-color: rgba(255, 255, 255, 0.35);
        }

        .pps-group-title {
          margin-bottom: 12px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: inherit;
          opacity: 0.94;
        }

        .pps-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }

        .pps-list li {
          display: grid;
          grid-template-columns: 16px 1fr;
          gap: 10px;
          align-items: start;
          color: var(--pps-text-soft);
          font-size: 14px;
          line-height: 1.65;
        }

        .pps-card-featured .pps-list li {
          color: #FFFFFF;
          opacity: .95;
        }

        .pps-tick-icon {
          width: 16px;
          height: 16px;
          color: var(--pps-teal);
          margin-top: 3px;
          flex: none;
        }

        .pps-card-featured .pps-tick-icon {
          color: #FFFFFF;
        }

        .pps-card-foot {
          margin-top: 26px;
          padding-top: 24px;
          border-top: 1px solid rgba(11, 22, 48, 0.08);
        }

        .pps-card-featured .pps-card-foot {
          border-color: rgba(255, 255, 255, 0.35);
        }

        .pps-btn {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          width: 100%;
          min-height: 54px;
          padding: 14px 18px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
          color: #FFFFFF;
          background: #16B8A6;
          transition:
            transform 0.28s ease,
            background 0.28s ease,
            box-shadow 0.28s ease;
          box-shadow: 0 12px 30px rgba(11, 22, 48, 0.16);
        }

        .pps-btn:hover {
          transform: translateY(-2px);
          background: #ffffff;
          color: #071F1B;
          outline: 1px solid #16B8A6;
        }

        .pps-card-featured .pps-btn {
          background: #FFFFFF;
          color: #071F1B;
          box-shadow: 0 16px 38px rgba(7, 31, 27, 0.16);
        }

        .pps-card-featured .pps-btn:hover {
          background: #F4FAF7;
        }

        /* Circular NextWave-inspired reveal: packages remain visible; comparison is optional. */
        .pps-expand-area {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(45px, 7vw, 95px) 0 clamp(10px, 2vw, 25px);
        }

        .pps-expand-button {
          position: relative;
          isolation: isolate;
          display: grid;
          place-items: center;
          width: min(340px, 82vw);
          aspect-ratio: 1;
          padding: 30px;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: var(--pps-navy);
          font: inherit;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: transform 450ms cubic-bezier(.16,1,.3,1);
        }

        .pps-expand-button:hover { transform: scale(1.035); }
        .pps-expand-button:focus-visible { outline: 3px solid var(--pps-teal); outline-offset: 6px; }
        .pps-expand-ring {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
          pointer-events: none;
        }
        .pps-expand-ring circle { fill: none; stroke-width: 1.5; }
        .pps-expand-ring-track { stroke: rgba(11, 22, 48, .18); }
        .pps-expand-ring-progress {
          stroke: var(--pps-teal);
          stroke-width: 2.5 !important;
          stroke-linecap: round;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          transition: stroke-dashoffset 900ms cubic-bezier(.16,1,.3,1);
        }
        .pps-expand-button:hover .pps-expand-ring-progress,
        .pps-expand-button-open .pps-expand-ring-progress { stroke-dashoffset: 0; }
        .pps-expand-fill {
          position: absolute;
          inset: 17px;
          border-radius: 50%;
          background: var(--pps-teal);
          transform: scale(0);
          transition: transform 750ms cubic-bezier(.65,0,.15,1);
          z-index: -1;
        }
        .pps-expand-button:hover .pps-expand-fill { transform: scale(.13); }
        .pps-expand-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
          transition: color 350ms ease;
        }
        .pps-expand-hint { font-size: clamp(14px, 1.4vw, 18px); color: var(--pps-text-soft); }
        .pps-expand-label strong {
          font-size: clamp(24px, 3vw, 38px);
          line-height: 1.05;
          letter-spacing: -.055em;
          font-weight: 750;
          max-width: 11ch;
        }
        .pps-expand-arrow { font-size: 23px; margin-top: 4px; }
        .pps-expand-button:hover .pps-expand-label,
        .pps-expand-button-open .pps-expand-label { color: #052e2a; }
        .pps-expand-button:hover .pps-expand-hint,
        .pps-expand-button-open .pps-expand-hint { color: #064e46; }

        /* Portal-like fixed layer. A clip-path circle grows from the clicked button
           to cover the entire viewport, rather than revealing a section below. */
        .pps-circle-screen {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: #16b8a6;
          color: #09252c;
          clip-path: circle(0px at var(--pps-origin-x) var(--pps-origin-y));
          visibility: hidden;
          pointer-events: none;
          transition: clip-path 1000ms cubic-bezier(.65,0,.15,1), visibility 1000ms;
        }
        .pps-circle-screen-open {
          clip-path: circle(150vmax at var(--pps-origin-x) var(--pps-origin-y));
          visibility: visible;
          pointer-events: auto;
        }
        .pps-circle-screen-scroll {
          height: 100%;
          width: 100%;
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .pps-circle-screen-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: clamp(24px, 4vw, 56px) clamp(20px, 4vw, 58px) 70px;
        }
        .pps-screen-heading { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        .pps-screen-kicker { font-size: 12px; font-weight: 850; letter-spacing: .15em; }
        .pps-screen-close { display: inline-flex; align-items: center; gap: 16px; border: 1px solid rgba(9,37,44,.35); border-radius: 99px; background: transparent; color: inherit; padding: 12px 18px; cursor: pointer; font: inherit; font-weight: 800; }
        .pps-screen-close span { font-size: 26px; line-height: .7; }
        .pps-screen-close:hover { background: #09252c; color: white; }
        .pps-screen-content {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 550ms ease, transform 700ms cubic-bezier(.16,1,.3,1);
        }
        .pps-circle-screen-open .pps-screen-content {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 520ms;
        }
        .pps-screen-title { max-width: 1100px !important; margin: clamp(60px,10vh,120px) 0 16px !important; font-size: clamp(52px,8vw,124px) !important; line-height: .95 !important; color: #082b2a !important; }
        .pps-screen-title span { color: #fff !important; }
        .pps-screen-description { font-size: clamp(16px,1.5vw,22px); max-width: 720px; line-height: 1.6; margin-bottom: 44px; }
        .pps-screen-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; margin-top: 34px; }
        .pps-screen-contact, .pps-screen-back { display: inline-flex; align-items: center; gap: 14px; padding: 15px 22px; border-radius: 99px; font: inherit; font-weight: 800; text-decoration: none; cursor: pointer; }
        .pps-screen-contact { background: #071F1B; color: white; }
        .pps-screen-back { background: transparent; color: #082b2a; border: 1px solid rgba(8,43,42,.35); }
        .pps-screen-contact:hover { background: #173d4c; }
        .pps-screen-back:hover { background: rgba(255,255,255,.3); }

        .pps-compare {
          margin-top: clamp(12px, 2vw, 24px);
          margin-bottom: 8px;
          padding: clamp(24px, 3vw, 32px);
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid var(--pps-line);
          box-shadow: var(--pps-shadow);
          backdrop-filter: blur(10px);
        }

        .pps-compare-head {
          margin-bottom: 22px;
        }

        .pps-compare-kicker {
          display: inline-block;
          margin-bottom: 10px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--pps-teal);
        }

        .pps-compare-head h3 {
          margin: 0;
          font-size: clamp(26px, 2vw, 36px);
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--pps-navy);
        }

        .pps-compare-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .pps-compare-table {
          min-width: 780px;
          display: grid;
        }

        .pps-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1fr;
          border-bottom: 1px solid rgba(11, 22, 48, 0.08);
        }

        .pps-row:last-child {
          border-bottom: 0;
        }

        .pps-row-head {
          background: linear-gradient(180deg, rgba(22,184,166,0.06), rgba(22,184,166,0.02));
          border-radius: 18px 18px 0 0;
        }

        .pps-col {
          padding: 16px 14px;
          font-size: 14px;
          line-height: 1.55;
          color: var(--pps-text-soft);
        }

        .pps-row-head .pps-col {
          font-weight: 800;
          color: var(--pps-navy);
        }

        .pps-col-label {
          color: var(--pps-navy);
          font-weight: 700;
        }

        .pps-col-featured {
          background: rgba(22, 184, 166, 0.06);
        }

        .pps-disclaimer {
          margin-top: 14px;
        }

        @media (prefers-reduced-motion: reduce) {
          .pps-expand-button, .pps-expand-fill, .pps-expand-ring-progress,
          .pps-circle-screen, .pps-screen-content { transition: none !important; }
        }

        @media (max-width: 1180px) {
          .pps-grid {
            grid-template-columns: 1fr;
          }

          .pps-card-featured {
            transform: none;
          }
        }

        @media (max-width: 860px) {
          .pps-top {
            grid-template-columns: 1fr;
          }

          .pps-shell {
            width: min(100%, calc(100% - 24px));
          }

          .pps-card-inner {
            padding: 22px;
          }

          .pps-volume-box strong {
            font-size: 24px;
          }

          .pps-row {
            grid-template-columns: 1.15fr 1fr 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .pps {
            padding: 24px 0 70px;
          }

          .pps h2 {
            font-size: clamp(36px, 8.5vw, 50px);
          }
          .pps h2 .pps-heading-first,
          .pps h2 .pps-heading-second {
            white-space: normal;
          }

          .pps-top-right p {
            font-size: 15px;
            line-height: 1.7;
          }

          .pps-card {
            border-radius: 24px;
          }

          .pps-card-inner {
            padding: 18px;
          }

          .pps-card h3 {
            font-size: 28px;
          }

          .pps-volume-box {
            padding: 14px 15px;
            border-radius: 16px;
          }

          .pps-list li {
            font-size: 13.5px;
          }

          .pps-compare {
            padding: 18px;
            border-radius: 24px;
          }

          .pps-col {
            padding: 14px 12px;
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}
