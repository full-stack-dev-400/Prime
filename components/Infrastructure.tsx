const NODES = [
  { code: "LD4", name: "Equinix LD4 · Slough", role: "Primary matching & pricing", status: "Live" },
  { code: "LD5", name: "Equinix LD5 · Slough", role: "Hot standby & order routing", status: "Live" },
  { code: "NY4", name: "Equinix NY4 · Secaucus", role: "US liquidity access", status: "Planned" },
  { code: "TY3", name: "Equinix TY3 · Tokyo", role: "Asia session access", status: "Planned" },
];

const METRICS = [
  { value: "0.3ms", label: "Median internal latency" },
  { value: "99.98%", label: "Platform uptime (12m)" },
  { value: "2,000+", label: "Quotes per second per symbol" },
  { value: "FIX 4.4", label: "Market-data & trading API" },
];

export default function Infrastructure() {
  return (
    <section id="infrastructure" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-navy-2 to-navy py-20 md:py-28">
      <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-teal/10 blur-[120px]" />
      <div className="container-site relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Infrastructure</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-offwhite md:text-4xl">
            Built where the market lives.
          </h2>
          <p className="mt-4 max-w-lg text-mist-body">
            Our pricing and matching engines sit inside Equinix LD4 and LD5 — next to the banks, ECNs and venues that make
            up the London FX ecosystem. Cross-connect directly, or connect over a managed VPN.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-4">
            {METRICS.map((m) => (
              <div key={m.label} className="rounded-2xl border border-navy-4/60 bg-navy-2/70 p-5">
                <dt className="font-mono text-2xl font-semibold text-teal-bright">{m.value}</dt>
                <dd className="mt-1 text-xs text-mist-muted">{m.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-3xl border border-navy-4/60 bg-navy-2/80 p-6 shadow-[0_0_80px_-20px_rgba(22,184,166,0.35)]">
          <div className="flex items-center justify-between border-b border-navy-4/60 pb-4">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-mist-muted">Data centre status</p>
            <p className="flex items-center gap-2 font-mono text-xs text-up">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-up" /> All systems operational
            </p>
          </div>
          <ul className="divide-y divide-navy-4/50">
            {NODES.map((n) => (
              <li key={n.code} className="flex items-center gap-4 py-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-tint font-mono text-sm font-semibold text-teal-bright">
                  {n.code}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-offwhite">{n.name}</p>
                  <p className="text-sm text-mist-muted">{n.role}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 font-mono text-[11px] ${
                    n.status === "Live" ? "bg-up/10 text-up" : "bg-amber/10 text-amber"
                  }`}
                >
                  {n.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
