"use client";

import { useId, type ReactNode } from "react";
import styles from "./JKVConnectivity.module.css";

type IconName =
  | "bank"
  | "layers"
  | "network"
  | "code"
  | "candles"
  | "monitor"
  | "server"
  | "lock"
  | "link"
  | "headset";

// All positions use the screenshot's inner-screen coordinate system (1230 × 695).
// The laptop and its light/reflections remain a photograph; the entire visible
// display (text, cards, routing, animations) is rendered as independent SVG.

interface IconProps {
  name: IconName;
  x: number;
  y: number;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

function Icon({
  name,
  x,
  y,
  size = 35,
  color = "#075441",
  strokeWidth = 1.9,
}: IconProps) {
  let content: ReactNode;
  switch (name) {
    case "bank":
      content = (
        <>
          <path d="M2.5 8 12 3l9.5 5M4 9h16M5.5 10.5v8M9.7 10.5v8M14.3 10.5v8M18.5 10.5v8M3.5 19h17M2.5 21h19" />
        </>
      );
      break;
    case "layers":
      content = (
        <>
          <path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5" />
        </>
      );
      break;
    case "network":
      content = (
        <>
          <circle cx="12" cy="4" r="2.5" />
          <circle cx="4" cy="19" r="2.5" />
          <circle cx="20" cy="19" r="2.5" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 6.5v3M10 13.7l-4.2 3.5M14 13.7l4.2 3.5" />
        </>
      );
      break;
    case "code":
      content = <path d="m8 5-6 7 6 7m8-14 6 7-6 7M14 3l-4 18" />;
      break;
    case "candles":
      content = (
        <>
          <path d="M5 2v20M12 2v20M19 2v20" />
          <rect x="2.5" y="9" width="5" height="9" rx="1" fill={color} />
          <rect x="9.5" y="5" width="5" height="11" rx="1" fill={color} />
          <rect x="16.5" y="8" width="5" height="9" rx="1" fill={color} />
        </>
      );
      break;
    case "monitor":
      content = (
        <>
          <rect x="2" y="3" width="20" height="15" rx="1.5" />
          <path d="m5 14 4-4 3.2 2.5 5.8-6M8 22h8m-4-4v4" />
        </>
      );
      break;
    case "server":
      content = (
        <>
          <rect x="2.7" y="3" width="18.6" height="5.3" rx="1.3" />
          <rect x="2.7" y="9.5" width="18.6" height="5.3" rx="1.3" />
          <rect x="2.7" y="16" width="18.6" height="5.3" rx="1.3" />
          <circle cx="17.8" cy="5.6" r=".7" fill={color} stroke="none" />
          <circle cx="17.8" cy="12.1" r=".7" fill={color} stroke="none" />
          <circle cx="17.8" cy="18.6" r=".7" fill={color} stroke="none" />
        </>
      );
      break;
    case "lock":
      content = (
        <>
          <rect x="5" y="10" width="14" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
        </>
      );
      break;
    case "link":
      content = (
        <>
          <path d="M10 14a4.5 4.5 0 0 0 6.5 0l3-3a4.5 4.5 0 0 0-6.5-6.5l-2 2" />
          <path d="M14 10a4.5 4.5 0 0 0-6.5 0l-3 3A4.5 4.5 0 0 0 11 19.5l2-2" />
        </>
      );
      break;
    case "headset":
      content = (
        <>
          <path d="M3.5 13V11a8.5 8.5 0 0 1 17 0v2" />
          <rect x="2" y="12" width="4" height="7" rx="1.5" />
          <rect x="18" y="12" width="4" height="7" rx="1.5" />
          <path d="M20 19a4 4 0 0 1-4 3h-3" />
        </>
      );
      break;
  }
  return (
    <svg
      x={x}
      y={y}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}

interface CardProps {
  x: number;
  y: number;
  title: string;
  lines: string[];
  icon: IconName;
  mintId: string;
  glowId: string;
}

function EndpointCard({ x, y, title, lines, icon, mintId, glowId }: CardProps) {
  return (
    <g className={styles.endpointCard}>
      <rect
        className={styles.endpointHalo}
        x={x - 2}
        y={y - 2}
        width="316"
        height="104"
        rx="16"
        fill="none"
        stroke="#16B8A6"
        strokeWidth="2.5"
        filter={`url(#${glowId})`}
      />
      <rect
        x={x}
        y={y}
        width="312"
        height="100"
        rx="14"
        fill={`url(#${mintId})`}
        stroke="#9edbd0"
        strokeWidth="1"
      />
      <rect x={x + 13} y={y + 14} width="67" height="67" rx="15" fill="#D2F1EA" />
      <Icon name={icon} x={x + 29} y={y + 29} size={36} />
      <text x={x + 94} y={y + 42} className={styles.cardTitle}>
        {title}
      </text>
      <text x={x + 94} y={y + 67} className={styles.cardDescription}>
        {lines.map((line, i) => (
          <tspan key={`${title}-${i}`} x={x + 94} dy={i === 0 ? 0 : 20}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

interface ColumnHeaderProps {
  x: number;
  width: number;
  number: string;
  label: string;
  pillId: string;
}

function ColumnHeader({ x, width, number, label, pillId }: ColumnHeaderProps) {
  return (
    <g>
      <rect x={x} y="146" width={width} height="41" rx="13" fill="#F0FAF7" />
      <rect x={x + 12} y="150" width="51" height="34" rx="9" fill={`url(#${pillId})`} />
      <text x={x + 37.5} y="173" textAnchor="middle" className={styles.columnNumber}>
        {number}
      </text>
      <text x={x + 78} y="174" className={styles.columnTitle}>
        {label}
      </text>
    </g>
  );
}

const routes = [
  // Price sources (left) -> LD4 (central price engine).
  { d: "M332 263 H341 C372 263 367 311 402 311 H419", delay: "-0.1s" },
  { d: "M332 387 H351 C378 387 372 338 403 338 H419", delay: "-1.3s" },
  { d: "M332 512 H351 C393 512 375 338 408 338 H419", delay: "-2.4s" },
  // LD4 -> broker / institutional client endpoints (right).
  { d: "M783 311 H797 C835 311 826 263 876 263", delay: "-1.6s" },
  { d: "M783 338 H800 C836 338 826 387 876 387", delay: "-0.5s" },
  { d: "M783 338 H809 C848 338 830 512 876 512", delay: "-2.8s" },
] as const;

export interface JKVConnectivityProps {
  /** Optional outer container class for site-specific sizing. */
  className?: string;
  /** Animation on by default; can be disabled for screenshots / performance. */
  animated?: boolean;
}

export default function JKVConnectivity({
  className = "",
  animated = true,
}: JKVConnectivityProps) {
  const id = useId().replace(/:/g, "");
  const mintId = `${id}-mint`;
  const pillId = `${id}-pill`;
  const coreId = `${id}-core`;
  const haloId = `${id}-halo`;
  const glowId = `${id}-glow`;

  return (
    <section
      aria-label="JKV Prime institutional connectivity topology"
      className={`${styles.wrapper} ${className}`.trim()}
    >
      <div className={styles.viewport}>
        <div className={`${styles.canvas} ${animated ? styles.animated : styles.static}`}>
          {/* Fixed, photorealistic laptop hardware, provided with this component. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.laptop}
            src="/images/jkv-connectivity-laptop.webp"
            alt=""
            draggable={false}
            decoding="async"
          />

          {/* The white display and every element on it are live vector elements. */}
          <svg
            className={styles.display}
            viewBox="0 0 1230 695"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Connectivity topology in London. Tier-one banks, non-bank liquidity providers and aggregated streams route through the primary LD4 pricing engine, backed up by LD5, and connect to FIX 4.4, MT4/MT5 and risk monitoring endpoints."
          >
            <defs>
              <linearGradient id={mintId} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#F0FBF8" />
                <stop offset="1" stopColor="#DDF6F0" />
              </linearGradient>
              <linearGradient id={pillId} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#00886D" />
                <stop offset="1" stopColor="#00644F" />
              </linearGradient>
              <linearGradient id={coreId} x1="0" x2="0.85" y1="0" y2="1">
                <stop offset="0" stopColor="#11B99F" />
                <stop offset="0.35" stopColor="#047B64" />
                <stop offset="1" stopColor="#003F33" />
              </linearGradient>
              <linearGradient id={haloId} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#E7FFF9" />
                <stop offset="1" stopColor="#D3F1E9" />
              </linearGradient>
              <filter id={glowId} x="-70%" y="-70%" width="240%" height="240%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id={`${id}-screenclip`}>
                <rect width="1230" height="695" rx="2" />
              </clipPath>
            </defs>

            <g clipPath={`url(#${id}-screenclip)`}>
              <rect width="1230" height="695" fill="#FFFFFF" />

              {/* Brand: extracted unchanged from the supplied JKV reference. */}
              <image
                href="/images/jkv-connectivity-logo.png"
                x="25"
                y="9"
                width="264"
                height="105"
                preserveAspectRatio="xMidYMid meet"
              />
              <path d="M303 33 V91" stroke="#B5CFC7" strokeWidth="1.6" />
              <text x="335" y="74" className={styles.mainTitle}>
                CONNECTIVITY TOPOLOGY / LONDON
              </text>
              <rect x="970" y="42" width="210" height="42" rx="14" fill="#D9F5ED" />
              <Icon name="lock" x={985} y={52} size={22} color="#065642" />
              <text x="1025" y="69" className={styles.secureBadge}>
                Protected routing
              </text>

              <ColumnHeader x={20} width={315} number="01" label="PRICE SOURCES" pillId={pillId} />
              <ColumnHeader x={433} width={353} number="02" label="JKV PRIME CORE" pillId={pillId} />
              <ColumnHeader x={877} width={315} number="03" label="CLIENT ENDPOINTS" pillId={pillId} />

              {/* Glow sits behind the endpoint cards; all connections stay inside screen. */}
              <g className={styles.connectors}>
                {routes.map(({ d, delay }, i) => (
                  <g key={`route-${i}`}>
                    <path d={d} fill="none" stroke="#16B8A6" strokeWidth="6" opacity=".13" filter={`url(#${glowId})`} />
                    <path d={d} fill="none" stroke="#16B8A6" strokeWidth="2.7" strokeLinecap="round" />
                    <path d={d} fill="none" className={styles.travelLine} stroke="#D0FFF3" strokeWidth="1.4" strokeDasharray="4 20" />
                    {animated && (
                      <circle r="3.1" fill="#ADFFEB" filter={`url(#${glowId})`}>
                        <animateMotion path={d} dur="3.7s" begin={delay} repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                ))}
                {/* Direction chevrons adjacent to active core. */}
                <path d="m392 312 8 8-8 8 M402 312l8 8-8 8" className={styles.chevrons} />
                <path d="m805 312 8 8-8 8 M815 312l8 8-8 8" className={styles.chevrons} />
              </g>

              {/* Sources */}
              <EndpointCard x={20} y={215} title="Tier-1 banks" lines={["Primary price contributors"]} icon="bank" mintId={mintId} glowId={glowId} />
              <EndpointCard x={20} y={339} title="Non-bank LPs" lines={["Supplemental depth &", "spread competition"]} icon="layers" mintId={mintId} glowId={glowId} />
              <EndpointCard x={20} y={464} title="Aggregated streams" lines={["Multi-source"]} icon="network" mintId={mintId} glowId={glowId} />

              {/* Client endpoints */}
              <EndpointCard x={876} y={215} title="FIX 4.4" lines={["Streaming prices · orders ·", "drop copies"]} icon="code" mintId={mintId} glowId={glowId} />
              <EndpointCard x={876} y={339} title="MT4 / MT5 bridges" lines={["Bridge connectivity for", "venue execution"]} icon="candles" mintId={mintId} glowId={glowId} />
              <EndpointCard x={876} y={464} title="Risk dashboard" lines={["Live monitoring and", "control visibility"]} icon="monitor" mintId={mintId} glowId={glowId} />

              {/* Core: primary LD4 engine */}
              <g className={styles.coreCard}>
                <rect x="416" y="216" width="370" height="155" rx="18" fill="none" stroke="#16B8A6" strokeWidth="5" opacity=".65" filter={`url(#${glowId})`} className={styles.primaryAura} />
                <rect x="420" y="220" width="363" height="147" rx="16" fill={`url(#${coreId})`} stroke="#47FAD1" strokeWidth="2" />
                <rect x="552" y="235" width="102" height="27" rx="13.5" fill="#CEFFF0" />
                <text x="603" y="254" textAnchor="middle" className={styles.primaryBadge}>PRIMARY</text>
                <g transform="translate(455 253)">
                  <path d="m0 14 36-16 38 15-37 16Z" fill="#8BEBD4" stroke="#C8FFF0" strokeWidth="1.5" />
                  <path d="m0 14 37 15v12L0 26Z" fill="#0A9D80" stroke="#B0FFE7" strokeWidth="1.2" />
                  <path d="m37 29 37-16v13L37 41Z" fill="#0A6D59" stroke="#99EED9" strokeWidth="1.2" />
                  <path d="m0 29 37 15 37-15v15L37 60 0 44Z" fill="#17A98A" stroke="#8CEAD1" strokeWidth="1.2" />
                  <path d="m0 46 37 15 37-15v14L37 77 0 60Z" fill="#087D68" stroke="#8CEAD1" strokeWidth="1.2" />
                  <path d="M37 44v16m0 1v16" stroke="#B6FFE9" strokeWidth="1" />
                  <circle cx="65" cy="36" r="2.2" fill="#D9FFF1" />
                  <circle cx="65" cy="53" r="2.2" fill="#D9FFF1" />
                  <circle cx="65" cy="69" r="2.2" fill="#D9FFF1" />
                </g>
                <text x="551" y="311" className={styles.ld4}>LD4</text>
                <text x="552" y="340" className={styles.coreCaption}>Pricing engine · FIX sessions</text>
              </g>

              {/* Explicit operational failover and replicated state */}
              <g className={styles.failover}>
                <path d="M602 367 V463" fill="none" stroke="#18BDA5" strokeWidth="3" />
                <path d="M602 369 V463" className={styles.failoverTravel} fill="none" stroke="#C8FFF1" strokeWidth="1.6" strokeDasharray="5 16" />
                <circle cx="602" cy="367" r="9" fill="#16B8A6" opacity=".25" filter={`url(#${glowId})`} />
                <circle cx="602" cy="367" r="5" fill="#FFFFFF" stroke="#18BDA5" strokeWidth="3" />
                <circle cx="602" cy="463" r="9" fill="#16B8A6" opacity=".35" filter={`url(#${glowId})`} />
                <circle cx="602" cy="463" r="5" fill="#FFFFFF" stroke="#18BDA5" strokeWidth="3" />
                <rect x="461" y="398" width="282" height="27" rx="13.5" fill="#FFFFFF" stroke="#1CB9A2" strokeWidth="1.1" />
                <text x="602" y="416" className={styles.failoverLabel} textAnchor="middle">Session failover + replicated state</text>
              </g>

              {/* Core: LD5 hot standby */}
              <g className={styles.standbyCard}>
                <rect x="418" y="463" width="370" height="111" rx="15" fill={`url(#${haloId})`} stroke="#9DDDCF" strokeWidth="1.2" />
                <g transform="translate(451 488) scale(.84)">
                  <path d="m0 14 36-16 38 15-37 16Z" fill="#9DEEDD" stroke="#CAFFF2" strokeWidth="1.5" />
                  <path d="m0 14 37 15 37-16v14L37 44 0 27Z" fill="#6DD0B7" stroke="#B9FFEE" />
                  <path d="m0 31 37 15 37-15v14L37 62 0 45Z" fill="#47B79D" stroke="#A6F2DF" />
                  <path d="m0 48 37 15 37-15v14L37 79 0 62Z" fill="#31967F" stroke="#9DEED8" />
                  <path d="M37 30v47" stroke="#B5FFEC" strokeWidth="1.3" />
                  <circle cx="64" cy="37" r="2.1" fill="#E7FFF8" />
                  <circle cx="64" cy="55" r="2.1" fill="#E7FFF8" />
                  <circle cx="64" cy="71" r="2.1" fill="#E7FFF8" />
                </g>
                <rect x="539" y="475" width="141" height="27" rx="13.5" fill="#C8F7E9" stroke="#89DCC7" strokeWidth="1" />
                <text x="609.5" y="494" textAnchor="middle" className={styles.standbyBadge}>HOT STANDBY</text>
                <text x="539" y="538" className={styles.ld5}>LD5</text>
                <text x="539" y="558" className={styles.standbyCaption}>Redundant engine · database replica</text>
              </g>

              {/* Small luminous socket nodes terminate at the cards. */}
              {[263, 387, 512].map((cy) => (
                <g key={`leftnode-${cy}`}>
                  <circle cx="332" cy={cy} r="8" fill="#33E9C0" opacity=".22" filter={`url(#${glowId})`} />
                  <circle cx="332" cy={cy} r="5.7" fill="#FFFFFF" stroke="#16D8B4" strokeWidth="2.6" />
                </g>
              ))}
              {[263, 387, 512].map((cy) => (
                <g key={`rightnode-${cy}`}>
                  <circle cx="876" cy={cy} r="8" fill="#33E9C0" opacity=".22" filter={`url(#${glowId})`} />
                  <circle cx="876" cy={cy} r="5.7" fill="#FFFFFF" stroke="#16D8B4" strokeWidth="2.6" />
                </g>
              ))}

              {/* Capability ribbon */}
              <rect x="29" y="604" width="1152" height="59" rx="16" fill="#EAF8F4" />
              <path d="M455 621 V650 M865 621 V650" stroke="#79BBAE" strokeWidth="1.3" />
              <Icon name="link" x={86} y={619} size={32} color="#00745C" />
              <text x="140" y="640" className={styles.statusText}>Cross-connect / VPN onboarding</text>
              <Icon name="layers" x={510} y={616} size={35} color="#00745C" />
              <text x="564" y="640" className={styles.statusText}>Automatic session resilience</text>
              <Icon name="headset" x={914} y={617} size={34} color="#00745C" />
              <text x="967" y="640" className={styles.statusText}>24/5 monitoring</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
