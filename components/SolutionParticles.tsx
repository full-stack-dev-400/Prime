"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type Props = {
  variant: number;
  cardRef: RefObject<HTMLElement | null>;
  progressRef: RefObject<{ current: number }>;
  className?: string;
};

export default function SolutionParticles({
  variant,
  cardRef,
  progressRef,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;

    if (!canvas || !card) return;

    let disposed = false;
    let teardown = () => {};

    void (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;

      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
        });
      } catch {
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0xffffff, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;

      // One consistent mint-green object palette on every solution card.
      // Keep the variant-specific geometry/movement from the original scenes.
      const colors = ["#FFFFFF", "#9BE3D3", "#65E0BA", "#D7F5EE", "#16B8A6"];

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(30, 2.35, 0.1, 100);
      camera.position.set(0, 0, 14);

      scene.add(new THREE.HemisphereLight(0xffffff, colors[1], 0.95));

      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(-4, 6, 8);
      scene.add(key);

      const rim = new THREE.DirectionalLight(colors[2], 1.1);
      rim.position.set(6, -3, -4);
      scene.add(rim);

      const group = new THREE.Group();
      scene.add(group);

      const capsule = (r: number, len: number) => {
        const pts: InstanceType<typeof THREE.Vector2>[] = [];

        const seg = 12;

        for (let i = 0; i <= seg; i++) {
          const a = -Math.PI / 2 + (i / seg) * (Math.PI / 2);

          pts.push(
            new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r - len / 2),
          );
        }

        for (let i = 0; i <= seg; i++) {
          const a = (i / seg) * (Math.PI / 2);

          pts.push(
            new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r + len / 2),
          );
        }

        return new THREE.LatheGeometry(pts, 32);
      };

      const geometries = [
        new THREE.SphereGeometry(1, 48, 48),
        new THREE.TorusGeometry(0.75, 0.34, 32, 72),
        capsule(0.55, 1.3),
        new THREE.SphereGeometry(1, 48, 48),
      ];

      let seed = (variant + 1) * 197 + 9;

      const rand = () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;

        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);

        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };

      type Item = {
        mesh: InstanceType<typeof THREE.Mesh>;
        base: InstanceType<typeof THREE.Vector3>;
        spin: InstanceType<typeof THREE.Vector3>;
        rotation: InstanceType<typeof THREE.Vector3>;
        phase: number;
        depth: number;
      };

      const items: Item[] = [];
      const n = variant === 1 ? 24 : 16;

      for (let i = 0; i < n; i++) {
        const glass = i % 5 === 3;
        const idx = i % geometries.length;

        const material = new THREE.MeshPhysicalMaterial({
          color: colors[i % colors.length],
          roughness: glass ? 0.05 : 0.32,
          metalness: 0,
          clearcoat: 1,
          clearcoatRoughness: glass ? 0.03 : 0.2,
          transparent: glass,
          opacity: glass ? 0.6 : 1,
        });

        const mesh = new THREE.Mesh(geometries[idx], material);

        const size = variant === 1 ? 0.3 + rand() * 0.45 : 0.65 + rand() * 0.7;

        mesh.scale.setScalar(size);

        if (idx === 3) {
          mesh.scale.set(size * 1.3, size * 0.75, size);
        }

        let x = 0;
        let y = 0;
        let z = 0;

        if (variant === 0) {
          x = (rand() - 0.5) * 11;
          y = (rand() - 0.5) * 3.2;
          z = (rand() - 0.5) * 3;
        } else if (variant === 1) {
          x = (rand() - 0.5) * 15;
          y = (rand() - 0.5) * 7;
          z = (rand() - 0.5) * 6;
        } else {
          const a = (i / n) * Math.PI * 2;
          const r = 2.4 + rand() * 2;

          x = Math.cos(a) * r * 1.6;
          y = Math.sin(a) * r * 0.55;
          z = Math.sin(a) * 2;
        }

        const rotation = new THREE.Vector3(rand() * 6, rand() * 6, rand() * 6);

        mesh.rotation.set(rotation.x, rotation.y, rotation.z);

        items.push({
          mesh,
          base: new THREE.Vector3(x, y, z),
          rotation,
          spin: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5),
          phase: rand() * 6.28,
          depth: 0.5 + rand(),
        });

        group.add(mesh);
      }

      const ptr = {
        x: 0,
        y: 0,
        tx: 0,
        ty: 0,
      };

      let visible = true;
      let raf = 0;

      const resize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        if (!w || !h) return;

        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };

      const pointerMove = (event: PointerEvent) => {
        const r = canvas.getBoundingClientRect();

        ptr.tx = Math.max(-0.75, Math.min(0.75,
          (event.clientX - r.left) / Math.max(1, r.width) - 0.5));

        ptr.ty = Math.max(-0.75, Math.min(0.75,
          (event.clientY - r.top) / Math.max(1, r.height) - 0.5));
      };

      const pointerLeave = () => {
        ptr.tx = 0;
        ptr.ty = 0;
      };

      const draw = (time: number) => {
        ptr.x += (ptr.tx - ptr.x) * 0.06;
        ptr.y += (ptr.ty - ptr.y) * 0.06;

        const p = progressRef.current?.current ?? 0;

        for (const it of items) {
          let x = it.base.x;
          let y = it.base.y;
          let z = it.base.z;

          if (variant === 0) {
            x += p * it.depth * 2.4 * (x > 0 ? 1 : -1);

            y +=
              Math.sin(time * 0.8 + it.phase) * 0.18 -
              Math.abs(p) * it.depth * 0.5;
          } else if (variant === 1) {
            y =
              ((((it.base.y - p * 7 * it.depth - time * 0.3 * it.depth) % 8) +
                8) %
                8) -
              4;

            x += Math.sin(time * 0.5 + it.phase) * 0.45;
          } else {
            const bx = it.base.x / 1.6;
            const by = it.base.y / 0.55;

            const angle = Math.atan2(by, bx) + p * 1.8 + time * 0.12;

            const r = Math.hypot(bx, by);

            x = Math.cos(angle) * r * 1.6;

            y = Math.sin(angle) * r * 0.55;

            z = Math.sin(angle) * 2;
          }

          it.mesh.position.set(
            x + ptr.x * it.depth * 1.3,
            y - ptr.y * it.depth * 0.9,
            z,
          );

          it.mesh.rotation.set(
            it.rotation.x + it.spin.x * (time * 0.6 + p * 4),
            it.rotation.y + it.spin.y * (time * 0.6 + p * 4),
            it.rotation.z + it.spin.z * (time * 0.6 + p * 4),
          );
        }

        group.rotation.y = p * 0.45 + ptr.x * 0.3;

        group.rotation.x = ptr.y * 0.2;

        renderer.render(scene, camera);
      };

      const loop = (now: number) => {
        if (visible) {
          draw(reduce.matches ? 0 : now / 1000);
        }

        if (!reduce.matches) {
          raf = requestAnimationFrame(loop);
        }
      };

      const onMotionChange = () => {
        cancelAnimationFrame(raf);
        loop(0);
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { rootMargin: "150px" },
      );

      observer.observe(canvas);

      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      // Reference Flagship effect reacts to the whole card, including heading.
      card.addEventListener("pointermove", pointerMove);

      card.addEventListener("pointerleave", pointerLeave);

      reduce.addEventListener("change", onMotionChange);

      resize();
      loop(0);

      teardown = () => {
        cancelAnimationFrame(raf);

        reduce.removeEventListener("change", onMotionChange);

        card.removeEventListener("pointermove", pointerMove);

        card.removeEventListener("pointerleave", pointerLeave);

        observer.disconnect();
        ro.disconnect();

        items.forEach((item) => {
          (
            item.mesh.material as InstanceType<
              typeof THREE.MeshPhysicalMaterial
            >
          ).dispose();
        });

        geometries.forEach((geometry) => {
          geometry.dispose();
        });

        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      teardown();
    };
  }, [variant, cardRef, progressRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
