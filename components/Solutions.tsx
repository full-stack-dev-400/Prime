import { IconBolt, IconCheck, IconLayers, IconPlug, IconShield } from "./Icons";

const SOLUTIONS = [
  {
    icon: IconLayers,
    title: "Aggregated FX liquidity",
    body: "Tier-1 bank and non-bank streams aggregated into a single, customisable book — spot FX, metals and CFDs.",
    points: ["Full-amount & sweepable streams", "Custom spread & markup profiles", "Last-look-free options"],
  },
  {
    icon: IconPlug,
    title: "FIX connectivity",
    body: "FIX 4.4 sessions with cross-connects at Equinix LD4 and LD5, plus bridges for MT4/MT5, cTrader and in-house OMS.",
    points: ["Dedicated market-data & order sessions", "LD4/LD5 cross-connect or VPN", "Certification in days, not weeks"],
  },
  {
    icon: IconShield,
    title: "Real-time risk control",
    body: "Pre-trade limits, exposure monitoring and A/B-book routing rules managed from one live dashboard.",
    points: ["Credit, NOP & max-order limits", "Toxic-flow analytics", "Instant kill-switch per account"],
  },
  {
    icon: IconBolt,
    title: "Execution & reporting",
    body: "Low-latency execution with transparent TCA, end-of-day statements and drop-copy for your back office.",
    points: ["Fill-ratio & slippage reporting", "Drop-copy & STP to your systems", "Regulatory trade reporting support"],
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="scroll-mt-20 bg-navy py-20 md:py-28">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">Solutions</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-offwhite md:text-4xl">
            Every layer of your trading stack, under one prime relationship.
          </h2>
          <p className="mt-4 text-mist-body">
            Stop juggling LPs, bridges and risk tools from different vendors. JKV Prime unifies liquidity, connectivity and
            control so your team can focus on clients.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {SOLUTIONS.map(({ icon: Icon, title, body, points }) => (
            <article key={title} className="card group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-teal-bright">
                <Icon />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-offwhite">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-body">{body}</p>
              <ul className="mt-5 space-y-2">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-mist-body">
                    <span className="mt-0.5 text-teal"><IconCheck /></span>
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
