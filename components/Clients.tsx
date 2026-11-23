"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

import styles from "./Clients.module.css";

type ClientType = {
  name: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  benefits: {
    title: string;
    description: string;
  }[];
};

const CLIENTS: ClientType[] = [
  {
    name: "Global Institutions",
    headline:
      "Treasury-grade FX access for banks, corporates and asset managers",
    description:
      "Hedge currency exposure and execute large FX tickets with predictable pricing, documented best execution and reporting your compliance team can rely on.",
    image: "/images/clients/global-institutions-jkv.webp",
    imageAlt:
      "Modern institutional trading floor with professional market workstations",
    benefits: [
      {
        title: "Block execution",
        description:
          "Large tickets worked across the pool to limit market impact.",
      },
      {
        title: "Audit-ready TCA",
        description:
          "Slippage, fill-rate and benchmark reports for every session.",
      },
      {
        title: "Bilateral credit",
        description: "Credit and margin agreed around your balance sheet.",
      },
    ],
  },
  {
    name: "Hedge Funds",
    headline: "Low-latency depth for systematic and discretionary strategies",
    description:
      "Run models close to the market at LD4, with full depth of book and execution logic that stays consistent from backtest to live trading.",
    image: "/images/clients/jkv-hedge-funds.webp",
    imageAlt:
      "Hedge fund investment professionals reviewing portfolio strategy",
    benefits: [
      {
        title: "Co-located access",
        description: "Cross-connect beside our matching servers in London.",
      },
      {
        title: "Full-depth streams",
        description: "Multiple price levels for size-aware algorithms.",
      },
      {
        title: "Drop-copy feed",
        description: "Real-time trade copies straight into your OMS.",
      },
    ],
  },
  {
    name: "Exchanges",
    headline: "Resilient market-making liquidity for trading venues",
    description:
      "Keep your order books two-sided and tight with continuous quoting, structured liquidity agreements and failover that holds when volatility spikes.",
    image: "/images/clients/jkv-exchange.webp",
    imageAlt:
      "Enterprise financial exchange connectivity and server infrastructure",
    benefits: [
      {
        title: "Continuous quoting",
        description: "Agreed spread and size commitments, 24/5.",
      },
      {
        title: "Dual-site failover",
        description: "LD4 primary with LD5 hot standby.",
      },
      {
        title: "Venue reporting",
        description: "Uptime, quote quality and fill statistics.",
      },
    ],
  },
  {
    name: "Brokers",
    headline: "Liquidity, plugins and risk control in one connection",
    description:
      "Connect your MT4/MT5 servers to aggregated pricing, then manage A-book, B-book and hybrid flow from a dashboard included with your package.",
    image: "/images/clients/jkv-brokers.webp",
    imageAlt:
      "Professional brokerage dealing desk with institutional trading monitors",
    benefits: [
      {
        title: "Bridge-ready",
        description: "Works with the bridges brokers already use.",
      },
      {
        title: "Risk dashboard",
        description: "Exposure, P&L and routing in real time.",
      },
      {
        title: "Server plugins",
        description: "Markup, auto-hedge, dynamic leverage and more.",
      },
    ],
  },
  {
    name: "Professional Traders",
    headline: "Institutional pricing for high-volume individual traders",
    description:
      "Algorithmic and high-frequency traders get direct access to the same aggregated book and execution standards as our institutional clients.",
    image: "/images/clients/jkv-professional-ttraders.webp",
    imageAlt:
      "Professional forex trader working at a multi-monitor trading workstation",
    benefits: [
      {
        title: "Raw pricing",
        description: "Interbank spreads with a transparent commission.",
      },
      {
        title: "API trading",
        description: "FIX or bridge access for automated strategies.",
      },
      {
        title: "Volume tiers",
        description: "Commission that falls as your volume grows.",
      },
    ],
  },
];

export default function Clients() {
  const [active, setActive] = useState(0);

  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const current = CLIENTS[active];

  function selectClient(index: number) {
    setActive((index + CLIENTS.length) % CLIENTS.length);
  }

  function onTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number | undefined;

    if (event.key === "ArrowRight") {
      next = (index + 1) % CLIENTS.length;
    }

    if (event.key === "ArrowLeft") {
      next = (index - 1 + CLIENTS.length) % CLIENTS.length;
    }

    if (event.key === "Home") {
      next = 0;
    }

    if (event.key === "End") {
      next = CLIENTS.length - 1;
    }

    if (next === undefined) return;

    event.preventDefault();

    selectClient(next);

    tabsRef.current[next]?.focus();
  }

  return (
    <section
      className={styles.section}
      id="who-we-serve"
      aria-labelledby="clients-heading"
    >
      <div className={styles.container}>
        {/* SECTION HEADER */}

        <header className={styles.header}>
          <p className={styles.eyebrow}>Who we serve</p>

          <h2 className={styles.heading} id="clients-heading">
            Solutions built around <em>how you trade.</em>
          </h2>

          <p className={styles.intro}>
            Every client type needs something different from a prime provider.
            We set up liquidity, connectivity and risk to match your business
            model.
          </p>
        </header>

        {/* CLIENT NAVIGATION TABS */}

        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Explore client types"
        >
          {CLIENTS.map((client, index) => (
            <button
              key={client.name}
              ref={(element) => {
                tabsRef.current[index] = element;
              }}
              className={`${styles.tab} ${
                active === index ? styles.tabActive : ""
              }`}
              id={`client-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="client-showcase-panel"
              tabIndex={active === index ? 0 : -1}
              onClick={() => selectClient(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              <span className={styles.tabNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>{client.name}</span>

              <span className={styles.tabArrow} aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>

        {/* MAIN CLIENT SHOWCASE */}

        <div
          className={styles.showcase}
          id="client-showcase-panel"
          role="tabpanel"
          aria-labelledby={`client-tab-${active}`}
          tabIndex={0}
        >
          {/* LEFT CONTENT */}

          <div className={styles.copy} key={`copy-${active}`}>
            <p className={styles.counter}>
              <span>{String(active + 1).padStart(2, "0")}</span>

              <span className={styles.counterDivider}>/</span>

              <span>{String(CLIENTS.length).padStart(2, "0")}</span>

              <span className={styles.clientName}>{current.name}</span>
            </p>

            <h3 className={styles.title}>{current.headline}</h3>

            <p className={styles.description}>{current.description}</p>

            {/* CLIENT BENEFITS */}

            <ul className={styles.benefits}>
              {current.benefits.map((benefit) => (
                <li key={benefit.title} className={styles.benefit}>
                  <span className={styles.benefitCheck} aria-hidden="true">
                    ✓
                  </span>

                  <span>
                    <strong>{benefit.title}</strong>

                    <span className={styles.benefitDescription}>
                      {benefit.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT FULL COVER IMAGE */}

          <div className={styles.visual}>
            <div key={`image-${active}`} className={styles.imageStage}>
              <Image
                src={current.image}
                alt={current.imageAlt}
                fill
                sizes="(min-width: 1100px) 50vw, 100vw"
                className={styles.image}
                priority={active === 0}
                quality={85}
              />
            </div>

            {/* IMAGE CORNER LABEL */}

            <div className={styles.visualLabel} aria-hidden="true">
              <span className={styles.visualDot} />
              JKV PRIME / {String(active + 1).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* BOTTOM CONTROLS */}

        <div className={styles.controls}>
          <p className={styles.controlsHint}>Explore our client solutions</p>

          <div className={styles.pagination} aria-label="Client navigation">
            <button
              type="button"
              className={styles.navButton}
              aria-label="Previous client type"
              onClick={() => selectClient(active - 1)}
            >
              ←
            </button>

            <span className={styles.pageCount}>
              {String(active + 1).padStart(2, "0")}{" "}
              <span>/ {String(CLIENTS.length).padStart(2, "0")}</span>
            </span>

            <button
              type="button"
              className={styles.navButton}
              aria-label="Next client type"
              onClick={() => selectClient(active + 1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
