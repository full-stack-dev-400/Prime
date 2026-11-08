import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-navy py-20 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Get in touch</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-offwhite md:text-4xl">
            Let&apos;s build your liquidity set-up.
          </h2>
          <p className="mt-4 max-w-md text-mist-body">
            Tell us about your flow and platforms. We&apos;ll come back with a tailored liquidity and connectivity
            proposal — usually within one business day.
          </p>
          <ul className="mt-10 space-y-5 text-sm">
            <li>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-mist-muted">Sales</p>
              <a href="mailto:sales@jkvprime.com" className="text-offwhite hover:text-teal-bright">sales@jkvprime.com</a>
            </li>
            <li>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-mist-muted">Connectivity & support</p>
              <a href="mailto:support@jkvprime.com" className="text-offwhite hover:text-teal-bright">support@jkvprime.com</a>
            </li>
            <li>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-mist-muted">Office</p>
              <p className="text-offwhite">London, United Kingdom</p>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
