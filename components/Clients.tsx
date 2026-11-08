import { IconBuilding, IconChart, IconLayers } from "./Icons";

const CLIENTS = [
  {
    icon: IconChart,
    title: "Retail & institutional brokers",
    body: "Deep, stable pricing for your MT4/MT5 or cTrader server, with A/B-book routing and risk tools built in.",
  },
  {
    icon: IconLayers,
    title: "Hedge funds & prop firms",
    body: "Direct FIX access, tight spreads and prime-of-prime credit to trade size without bank-level onboarding.",
  },
  {
    icon: IconBuilding,
    title: "Exchanges & venues",
    body: "Reliable market-making liquidity and reference pricing to seed order books and support new listings.",
  },
];

export default function Clients() {
  return (
    <section id="clients" className="scroll-mt-20 bg-offwhite py-20 md:py-28">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-teal-hover">Who we serve</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Global markets. Local insight.
          </h2>
          <p className="mt-4 text-ink-body">
            Whether you run a brokerage, a fund or a venue, you get a dedicated team that understands your market and your
            regulators.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CLIENTS.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-2xl border border-ink-divider bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(11,22,48,0.25)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-teal-hover">
                <Icon />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
