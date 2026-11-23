import Image from "next/image";
import Link from "next/link";
import styles from "./AboutPrime.module.css";

const highlights = [
  {
    id: "fsc",
    number: "01",
    kicker: "REGULATORY FOOTPRINT",
    heading: "FSC",
    description: "Group licensed in Mauritius",
    image: "/images/jkv-about/jkv-prime-fsc-03.webp",
    alt: "Illustration of a Mauritius flag, island scenery, and an FSC-themed glass plaque",
    className: styles.fsc,
    imagePosition: "50% 50%",
  },
  {
    id: "infrastructure",
    number: "02",
    kicker: "LONDON INFRASTRUCTURE",
    heading: "LD4 · LD5",
    description: "Equinix London presence",
    image: "/images/jkv-about/jkv-prime-ld4-ld5-02.webp",
    alt: "Concept illustration of LD4 and LD5 server racks and London connectivity",
    className: styles.infrastructure,
    imagePosition: "50% 50%",
  },
  {
    id: "packages",
    number: "03",
    kicker: "SCALED TO YOUR FLOW",
    heading: "3 prime packages",
    description: "Volume-based prime packages",
    image: "/images/jkv-about/jkv-prime-packages-01.webp",
    alt: "Starter, Advanced and Pro prime service tiers displayed as three glass cards",
    className: styles.packages,
    imagePosition: "50% 50%",
  },
  {
    id: "operations",
    number: "04",
    kicker: "PRIME DESK & SUPPORT",
    heading: "24/5",
    description: "Prime desk & network operations",
    image: "/images/jkv-about/prime-desk-operations-04.webp",
    alt: "Concept illustration of an institutional prime desk and network operations room",
    className: styles.operations,
    imagePosition: "50% 50%",
  },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
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

export default function AboutPrime() {
  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="about-prime-title"
    >
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.introMain}>
            <span className={styles.eyebrow}>ABOUT US / JKV PRIME</span>
            <h2 id="about-prime-title" className={styles.title}>
              The institutional <br className={styles.desktopBreak} />
              arm of <span>JKV PRIME.</span>
            </h2>
          </div>
          <div className={styles.introBody}>
            <p>
              JKV Prime brings JKV PRIME&apos;s market infrastructure to
              professional counterparties. We offer B2B liquidity, connectivity
              and risk technology to brokers, funds and venues that need
              dependable execution and a partner who understands their business.
            </p>
            <p>
              Our approach is simple: transparent pricing, infrastructure in the
              right data centres, and risk tools as standard rather than as
              extras.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="#contact">
                Get in touch <ArrowIcon />
              </Link>
              <Link className={styles.secondaryAction} href="#solutions">
                Our solutions <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>

        <div
          className={styles.bento}
          aria-label="JKV Prime institutional capabilities"
        >
          {highlights.map((item) => (
            <article
              key={item.id}
              className={`${styles.card} ${item.className}`}
            >
              <div className={styles.imageArea}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 90vw, 65vw"
                  className={styles.cardImage}
                  style={{ objectPosition: item.imagePosition }}
                />
                <span className={styles.imageSheen} aria-hidden="true" />
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.cardInfo}>
                  <span className={styles.kicker}>
                    {item.number} / {item.kicker}
                  </span>
                  <h3>{item.heading}</h3>
                  <p>{item.description}</p>
                </div>
                <span className={styles.cornerMark} aria-hidden="true">
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
