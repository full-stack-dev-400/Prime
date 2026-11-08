import GlassArchitecture from "./GlassArchitecture";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32">
      {/* background wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#152A54_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#A9B5CC_1px,transparent_1px),linear-gradient(90deg,#A9B5CC_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container-site relative grid items-center gap-6 pb-16 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal-tint px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-teal-bright">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-up" />
            Now streaming from Equinix LD4 &amp; LD5
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-offwhite sm:text-5xl lg:text-[3.6rem]">
            The world&apos;s financial centres, <span className="text-teal-bright">one liquidity source.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-mist-body">
            One prime relationship for aggregated FX liquidity, FIX connectivity at Equinix LD4/LD5 and real-time risk
            control, built for brokers, funds and exchanges.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#solutions" className="btn-primary">Explore solutions <span aria-hidden>→</span></a>
            <a href="#contact" className="btn-ghost">Get in touch</a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-navy-4/60 pt-6">
            {[
              ["<1ms", "LD4 ↔ LD5 cross-connect"],
              ["40+", "Tier-1 & non-bank LPs"],
              ["24/5", "Risk desk coverage"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-mono text-xl font-semibold text-offwhite">{v}</dt>
                <dd className="mt-1 text-xs leading-snug text-mist-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <GlassArchitecture />
      </div>
    </section>
  );
}
