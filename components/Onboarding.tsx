const STEPS = [
  { n: "01", title: "Talk to our team", body: "Share your flow profile, platforms and target markets." },
  { n: "02", title: "KYC & credit", body: "Fast-track onboarding with a dedicated account manager." },
  { n: "03", title: "Connect & certify", body: "FIX or bridge set-up, UAT and certification at LD4/LD5." },
  { n: "04", title: "Go live", body: "Stream production prices with real-time risk control from day one." },
];

export default function Onboarding() {
  return (
    <section id="onboarding" className="scroll-mt-20 bg-offwhite pb-20 md:pb-28">
      <div className="container-site">
        <div className="rounded-3xl bg-navy p-8 md:p-12">
          <p className="eyebrow">Onboarding</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-offwhite">From first call to first fill.</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.n} className="relative">
                <span className="font-mono text-sm font-semibold text-teal-bright">{s.n}</span>
                {i < STEPS.length - 1 && (
                  <span className="absolute left-10 right-0 top-2.5 hidden h-px bg-gradient-to-r from-teal/60 to-transparent md:block" />
                )}
                <h3 className="mt-3 font-semibold text-offwhite">{s.title}</h3>
                <p className="mt-1 text-sm text-mist-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
