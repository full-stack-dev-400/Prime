"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "The Liquidity Architecture" – layered translucent glass slabs built with CSS 3D.
 * Each slab represents a pillar of JKV Prime. Cursor movement rotates the rig a few
 * degrees; scrolling separates the layers as the hero leaves the viewport.
 */
type SlabDef = {
  id: string;
  label: string;
  w: number; h: number; d: number; // width, height, depth (px)
  x: number; y: number; z: number; // centre position
  sep: [number, number, number]; // direction the slab drifts on scroll
  labelPos?: "top" | "front";
};

const SLABS: SlabDef[] = [
  { id: "fx", label: "FX Liquidity", w: 150, h: 400, d: 70, x: 120, y: -30, z: -40, sep: [60, -40, -60] },
  { id: "fix", label: "FIX Connectivity", w: 120, h: 250, d: 60, x: -10, y: 45, z: 40, sep: [10, -10, 30] },
  { id: "risk", label: "Risk Control", w: 280, h: 26, d: 150, x: -170, y: 110, z: 70, sep: [-80, 30, 40] },
  { id: "exec", label: "Execution", w: 140, h: 70, d: 110, x: -100, y: 60, z: 110, sep: [-30, -70, 80] },
];

function Face({ w, h, transform, children }: { w: number; h: number; transform: string; children?: React.ReactNode }) {
  return (
    <div className="face" style={{ width: w, height: h, left: -w / 2, top: -h / 2, transform }}>
      {children}
    </div>
  );
}

function Slab({ s, progress }: { s: SlabDef; progress: number }) {
  const k = progress * 1.6;
  const tx = s.x + s.sep[0] * k;
  const ty = s.y + s.sep[1] * k;
  const tz = s.z + s.sep[2] * k;
  const label = <span className="slab-label" style={{ left: 10, top: 7, maxWidth: s.w - 16, whiteSpace: "normal", lineHeight: 1.3 }}>{s.label}</span>;
  return (
    <div className="slab" style={{ transform: `translate3d(${tx}px, ${ty}px, ${tz}px)` }} aria-hidden>
      <Face w={s.w} h={s.h} transform={`translateZ(${s.d / 2}px)`}>{s.labelPos !== "top" && label}</Face>
      <Face w={s.w} h={s.h} transform={`rotateY(180deg) translateZ(${s.d / 2}px)`} />
      <Face w={s.d} h={s.h} transform={`rotateY(90deg) translateZ(${s.w / 2}px)`} />
      <Face w={s.d} h={s.h} transform={`rotateY(-90deg) translateZ(${s.w / 2}px)`} />
      <Face w={s.w} h={s.d} transform={`rotateX(90deg) translateZ(${s.h / 2}px)`}>{s.labelPos === "top" && label}</Face>
      <Face w={s.w} h={s.d} transform={`rotateX(-90deg) translateZ(${s.h / 2}px)`} />
    </div>
  );
}

export default function GlassArchitecture() {
  const wrap = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        setTilt({ x: nx, y: ny });
      });
    };
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));
      setProgress(p);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const rotY = -32 + tilt.x * 10;
  const rotX = -12 - tilt.y * 6;

  return (
    <div ref={wrap} className="scene relative h-[440px] w-full sm:h-[560px]" style={{ opacity: 1 - progress * 0.6 }}>
      {/* glow behind structure */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-[10%] top-[20%] h-[200px] w-[200px] rounded-full bg-[#7B6CF6]/20 blur-[90px]" />
      <div className="absolute left-1/2 top-1/2 origin-center scale-[0.72] sm:scale-100">
        <div className="rig" style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}>
          {SLABS.map((s) => (
            <Slab key={s.id} s={s} progress={progress} />
          ))}
          {/* reflective floor */}
          <div
            className="absolute"
            style={{
              width: 620, height: 420, left: -310, top: -210,
              transform: "translateY(240px) rotateX(90deg)",
              background: "radial-gradient(closest-side, rgba(22,184,166,0.18), transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
