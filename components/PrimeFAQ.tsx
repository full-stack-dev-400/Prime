"use client";

import { useState } from "react";
import styles from "./PrimeFAQ.module.css";

const faqs = [
  {
    question: "Where does JKV Prime's liquidity come from?",
    answer:
      "We aggregate pricing from Tier-1 banks, non-bank market makers and institutional ECN venues. The pool is weighted to your flow, so your stream reflects your trade sizes, sessions and instruments.",
  },
  {
    question: "How do I connect: FIX, bridge or cross-connect?",
    answer:
      "All three are supported. Starter connects over VPN to LD4. Advanced adds an LD4 cross-connect with LD5 backup. Pro runs dual cross-connects with full failover. FIX 4.4 and the leading MT4/MT5 bridges are supported on every package.",
  },
  {
    question: "Why doesn't Starter include risk management?",
    answer:
      "Starter is a pure liquidity and connectivity package for brokers who already manage risk in-house. The risk dashboard, routing tools and server plugins start at Advanced, and you can upgrade when your volume reaches that tier.",
  },
  {
    question: "What happens if my volume moves between tiers?",
    answer:
      "We review volume monthly. If you consistently trade above your tier, we move you up to the next package and its features with no migration. If volume falls, we discuss the options with you before changing anything.",
  },
  {
    question: "Is the infrastructure redundant?",
    answer:
      "Yes. Pricing and trading sessions run from LD4 with a hot-standby server and replicated database at LD5. Sessions fail over automatically, and every package includes 24/5 monitoring.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Most clients go live within two to four weeks of signing. That includes KYC, credit setup, FIX certification or bridge configuration, and a UAT period on a test stream.",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PrimeFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className={styles.faq} aria-labelledby="faq-title">
      <div className={styles.wrap}>
        <div className={styles.faqLayout}>
          <div className={styles.faqIntro}>
            <span className={styles.eyebrow}>FAQ / JKV PRIME</span>
            <h2 id="faq-title">
              Questions prime clients <em>ask first.</em>
            </h2>
            <p>
              Everything you need to know about liquidity, connectivity, risk
              management and onboarding.
            </p>
            <a className={styles.textLink} href="#contact">
              Still have questions? <ArrowIcon />
            </a>
          </div>
          <div className={styles.accordion}>
            {faqs.map((item, i) => {
              const expanded = open === i;
              return (
                <div
                  className={`${styles.faqItem} ${expanded ? styles.faqItemActive : ""}`}
                  key={item.question}
                >
                  <h3>
                    <button
                      type="button"
                      className={styles.question}
                      aria-expanded={expanded}
                      aria-controls={`prime-faq-panel-${i}`}
                      id={`prime-faq-button-${i}`}
                      onClick={() => setOpen(expanded ? null : i)}
                    >
                      <span className={styles.faqNumber}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.questionText}>
                        {item.question}
                      </span>
                      <span className={styles.faqToggle} aria-hidden="true">
                        {expanded ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  <div
                    className={styles.answerOuter}
                    id={`prime-faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`prime-faq-button-${i}`}
                    hidden={!expanded}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
