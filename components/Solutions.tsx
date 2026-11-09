"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import SolutionParticles from "./SolutionParticles";
import styles from "./Solutions.module.css";

const solutions = [
  {
    number: "01",
    title: "Prime Brokerage",
    description:
      "Trade across multiple liquidity venues under one agreement, one margin pool and one settlement cycle, without managing a separate relationship for each provider.",
    features: [
      "Single credit line across all venues",
      "Cross-margining and consolidated statements",
      "Margin terms set by your flow profile",
    ],
  },
  {
    number: "02",
    title: "Execution Services",
    description:
      "Orders are routed to the best available price in the aggregated book, and every fill is measured, so you can see exactly how your flow is handled.",
    features: [
      "Smart order routing across the LP pool",
      "Partial fills and configurable last-look settings",
      "Transaction cost analysis on every session",
    ],
  },
  {
    number: "03",
    title: "Platforms & API",
    description:
      "Connect through the stack you already run, whether that's a MetaTrader bridge, a FIX engine or your own trading system.",
    features: [
      "FIX 4.4 price, trade and drop-copy sessions",
      "MT4 / MT5 compatibility through leading bridges",
      "REST access for reporting and reconciliation",
    ],
  },
  {
    number: "04",
    title: "Liquidity Solutions",
    description:
      "Tier-1 bank and non-bank pricing aggregated into streams built around your client mix, trade sizes and trading hours.",
    features: [
      "Custom tiered streams with full book depth",
      "FX, metals, indices, energies and crypto CFDs",
      "Stable spreads through news and rollover",
    ],
  },
] as const;

type CardProps = {
  item: (typeof solutions)[number];
  index: number;
};

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

function SolutionCard({ item, index }: CardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<SVGGElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  // The Three.js scene observes this directly; no state updates per frame.
  const motionProgress = useRef({ current: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const mobile = window.matchMedia("(max-width: 899px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = card.getBoundingClientRect();
      const progress = mobile.matches
        ? clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height))
        : clamp((window.innerWidth - rect.left) / (window.innerWidth + rect.width));
      const p = progress * 2 - 1;
      motionProgress.current.current = p;

      // Exact orbit choreography from the reference HTML.
      orbitRef.current?.setAttribute("transform", `rotate(${p * 30} 500 300)`);
      const angle = 1.15 + p * 1.6;
      dotRef.current?.setAttribute("cx", String(240 + 260 * Math.cos(angle)));
      dotRef.current?.setAttribute("cy", String(60 + 260 * Math.sin(angle)));

      // Reference Flagships GSAP: heading xPercent 16 -> -8,
      // oval xPercent -12 -> 6 as the card passes through the viewport.
      if (!mobile.matches && !reduce.matches) {
        headingRef.current?.style.setProperty("--scroll-x", `${16 - progress * 24}%`);
        mediaRef.current?.style.setProperty("--scroll-x", `${-12 + progress * 18}%`);
      } else {
        headingRef.current?.style.removeProperty("--scroll-x");
        mediaRef.current?.style.removeProperty("--scroll-x");
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mobile.addEventListener("change", schedule);
    reduce.addEventListener("change", schedule);
    update();

    // Reference mobile entrance, but never hide content if reduced motion is set.
    let io: IntersectionObserver | undefined;
    if (mobile.matches && !reduce.matches && "IntersectionObserver" in window) {
      card.classList.add(styles.cardEntering);
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            card.classList.add(styles.cardEntered);
            io?.disconnect();
          }
        },
        { threshold: 0.08 },
      );
      io.observe(card);
    }

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mobile.removeEventListener("change", schedule);
      reduce.removeEventListener("change", schedule);
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  // Small magnetic heading response on mouse hover. Scroll-parallax remains intact.
  const onTitlePointerMove = (event: ReactPointerEvent<HTMLHeadingElement>) => {
    if (event.pointerType !== "mouse") return;
    const heading = event.currentTarget;
    const rect = heading.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / Math.max(1, rect.width), 0, 1);
    const y = clamp((event.clientY - rect.top) / Math.max(1, rect.height), 0, 1);
    heading.style.setProperty("--hover-x", `${(x - 0.5) * 20}px`);
    heading.style.setProperty("--hover-y", `${(y - 0.5) * 12}px`);
  };

  const onTitlePointerLeave = (event: ReactPointerEvent<HTMLHeadingElement>) => {
    event.currentTarget.style.setProperty("--hover-x", "0px");
    event.currentTarget.style.setProperty("--hover-y", "0px");
  };

  return (
    <article ref={cardRef} className={styles.card} data-solution-cursor>
      <svg className={styles.orbits} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g ref={orbitRef}>
          <circle cx="240" cy="60" r="260" />
          <circle cx="540" cy="-150" r="380" />
          <circle ref={dotRef} className={styles.dot} cx="346" cy="297" r="6" />
        </g>
      </svg>

      <span className={styles.number}>{item.number} / 04</span>

      <div ref={mediaRef} className={styles.media} aria-hidden="true">
        <SolutionParticles
          variant={index}
          cardRef={cardRef}
          progressRef={motionProgress}
          className={styles.canvas}
        />
      </div>

      <div className={styles.content}>
        <h3
          ref={headingRef}
          className={styles.cardHeading}
          onPointerMove={onTitlePointerMove}
          onPointerLeave={onTitlePointerLeave}
          data-solution-heading
        >
          {item.title}
        </h3>
        <div className={styles.foot}>
          <p>{item.description}</p>
          <ul>
            {item.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const counter = counterRef.current;
    const fill = fillRef.current;
    if (!pin || !viewport || !track || !counter || !fill) return;

    const mobile = window.matchMedia("(max-width: 899px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let distance = 0;
    let active = false;
    let frame = 0;

    const draw = () => {
      if (!active) return;
      const top = pin.getBoundingClientRect().top + window.scrollY;
      const scrolled = clamp(window.scrollY - top, 0, distance);
      const ratio = distance ? scrolled / distance : 0;
      track.style.transform = `translate3d(${-scrolled}px, 0, 0)`;
      // Progress counter updates without React renders.
      const number = Math.min(4, Math.max(1, Math.round(ratio * 3) + 1));
      counter.textContent = `${String(number).padStart(2, "0")} / 04`;
      fill.style.transform = `scaleX(${0.25 + ratio * 0.75})`;
    };

    const measure = () => {
      active = !mobile.matches && !reduce.matches;
      if (!active) {
        pin.style.height = "";
        track.style.transform = "";
        return;
      }
      distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      // Native position:sticky + scroll-linked translation; GSAP not required.
      pin.style.height = `${viewport.clientHeight + distance}px`;
      draw();
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        draw();
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(viewport);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    mobile.addEventListener("change", measure);
    reduce.addEventListener("change", measure);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      mobile.removeEventListener("change", measure);
      reduce.removeEventListener("change", measure);
      cancelAnimationFrame(frame);
      pin.style.height = "";
      track.style.transform = "";
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let raf = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const target = event.target;
      const onCard = target instanceof Element && !!target.closest("[data-solution-cursor]");
      cursor.classList.toggle(styles.cursorLarge, onCard);
    };
    const enter = (event: PointerEvent) => {
      targetX = currentX = event.clientX;
      targetY = currentY = event.clientY;
      cursor.classList.add(styles.cursorVisible);
      if (!raf) animate();
    };
    const leave = () => {
      cursor.classList.remove(styles.cursorVisible, styles.cursorLarge);
      cancelAnimationFrame(raf);
      raf = 0;
    };

    section.addEventListener("pointerenter", enter);
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointerenter", enter);
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className={styles.section}
      aria-labelledby="solutions-heading"
    >
      <div className={styles.head}>
        <div>
          <span className={styles.kicker}>JKV GLOBAL / SOLUTIONS</span>
          <h2 id="solutions-heading">
            One prime relationship.
            <br />
            <span>Four ways to scale.</span>
          </h2>
        </div>
        <div className={styles.headRight}>
          <p>
            Take the full stack or pick the modules you need. Each solution plugs
            into the same liquidity, credit and risk framework, so you can add
            more as your flow grows.
          </p>
          <a href="#contact" className={styles.cta}>
            Design your setup <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div ref={pinRef} className={styles.pin}>
        <div ref={viewportRef} className={styles.viewport}>
          <div ref={trackRef} className={styles.track}>
            {solutions.map((item, index) => (
              <SolutionCard key={item.number} item={item} index={index} />
            ))}
          </div>
          <div className={styles.progress} aria-hidden="true">
            <div className={styles.rail}>
              <div ref={fillRef} className={styles.fill} />
            </div>
            <span ref={counterRef}>01 / 04</span>
          </div>
        </div>
      </div>
      <span ref={cursorRef} className={styles.cursor} aria-hidden="true" />
    </section>
  );
}
