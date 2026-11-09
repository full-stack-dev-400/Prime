import Image from "next/image";
import type { CSSProperties } from "react";
import MetricsReveal from "./MetricsReveal";
import { metricsDisplay } from "./fonts";
import styles from "./metrics.module.css";

// Figures supplied by JKV Global (redesign brief). Keep values and labels
// exactly as approved; confirm with compliance before any change.
type Metric = {
  prefix?: string;
  core: string;
  suffix?: string;
  spoken: string;
  label: string;
  icon: string;
};

const METRICS: Metric[] = [
  {
    prefix: "$",
    core: "50B",
    suffix: "+",
    spoken: "More than 50 billion US dollars",
    label: "Monthly notional capacity",
    icon: "/images/metrics/monthly-notional-capacity.webp",
  },
  {
    core: "1,000",
    suffix: "+",
    spoken: "More than 1,000",
    label: "Instruments in one stream",
    icon: "/images/metrics/instruments-one-stream.webp",
  },
  {
    prefix: "<",
    core: "1",
    suffix: "ms",
    spoken: "Less than 1 millisecond",
    label: "Order-to-fill at LD4 / LD5",
    icon: "/images/metrics/order-fill-latency.webp",
  },
  {
    core: "24/5",
    spoken: "24 hours a day, 5 days a week",
    label: "Prime desk coverage",
    icon: "/images/metrics/prime-desk-coverage.webp",
  },
];

export default function InstitutionalMetrics() {
  return (
    <section aria-labelledby="metrics-title" className={`${styles.section} ${metricsDisplay.variable}`}>
      <h2 id="metrics-title" className={styles.srOnly}>
        JKV Global in figures
      </h2>
      <div className="container-site">
        <MetricsReveal className={styles.reveal}>
          <ul className={styles.row}>
            {METRICS.map((m, i) => (
              <li key={m.label} className={styles.metric} style={{ "--i": i } as CSSProperties}>
                <div className={styles.iconWrap} aria-hidden="true">
                  <span className={styles.pool} />
                  <Image
                    src={m.icon}
                    alt=""
                    width={1254}
                    height={1254}
                    sizes="(min-width: 1024px) 7.5rem, 6rem"
                    quality={85}
                    className={styles.icon}
                  />
                </div>
                <p className={styles.valueWrap}>
                  <span className={styles.value} aria-hidden="true">
                    {m.prefix && (
                      <span className={m.prefix === "<" ? styles.unitLead : styles.unit}>{m.prefix}</span>
                    )}
                    {m.core}
                    {m.suffix && (
                      <span className={m.suffix === "ms" ? styles.unitBase : styles.unit}>{m.suffix}</span>
                    )}
                  </span>
                  <span className={styles.srOnly}>{m.spoken}, </span>
                </p>
                <p className={styles.label}>{m.label}</p>
              </li>
            ))}
          </ul>
          <span className={styles.glint} aria-hidden="true" />
        </MetricsReveal>
      </div>
    </section>
  );
}
