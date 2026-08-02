import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth 0..1, drives size + parallax
  baseAlpha: number;
  twinkle: number;
  twinkleSpeed: number;
};

type Props = {
  /** multiplies star count on low-DPI / small screens */
  density?: number;
  className?: string;
};

/**
 * Full-bleed canvas starfield with depth-based parallax and gentle twinkle.
 * Reacts to mouse position for a subtle 3D drift. Designed to sit behind every
 * section as a shared, performant background layer.
 */
export default function Starfield({ density = 1, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stars: Star[] = [];
    let w = 0, h = 0, dpr = 1;
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = w * h;
      const count = Math.min(420, Math.floor((area / 5200) * density));
      stars = new Array(count).fill(0).map(() => {
        const z = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          baseAlpha: 0.35 + z * 0.6,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.6 + Math.random() * 1.8,
        };
      });
    };

    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!reduced) s.twinkle += 0.016 * s.twinkleSpeed;
        const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.twinkle));
        const size = 0.4 + s.z * 1.8;
        const px = s.x + mouse.x * s.z * 26;
        const py = s.y + mouse.y * s.z * 26;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 235, 255, ${alpha})`;
        ctx.fill();

        // brighter stars get a soft halo
        if (s.z > 0.78) {
          ctx.beginPath();
          ctx.arc(px, py, size * 3.2, 0, Math.PI * 2);
          const g = ctx.createRadialGradient(px, py, 0, px, py, size * 3.2);
          g.addColorStop(0, `rgba(180, 225, 255, ${alpha * 0.4})`);
          g.addColorStop(1, "rgba(180, 225, 255, 0)");
          ctx.fillStyle = g;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    build();
    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
      // single static frame
      return () => cancelAnimationFrame(raf);
    }
    raf = requestAnimationFrame(draw);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", build);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
