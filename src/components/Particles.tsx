import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  alpha: number;
};

type Props = {
  className?: string;
  count?: number;
  /** palette of hsl hues to sample from */
  hues?: number[];
};

/**
 * Lightweight floating particle layer rendered to a single canvas. Particles
 * drift upward, wrap around the viewport, and twinkle in hue. Sits above the
 * starfield but below content.
 */
export default function Particles({
  className,
  count = 36,
  hues = [190, 200, 175, 45],
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let parts: Particle[] = [];
    let w = 0, h = 0, dpr = 1;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = new Array(count).fill(0).map(() => spawn(true));
    };

    const spawn = (initial: boolean): Particle => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 20,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.2 - Math.random() * 0.6,
      r: 1 + Math.random() * 2.4,
      hue: hues[Math.floor(Math.random() * hues.length)] ?? 200,
      alpha: 0.15 + Math.random() * 0.5,
    });

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -20 || p.x < -20 || p.x > w + 20) {
          parts[i] = spawn(false);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 70%, ${p.alpha})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };

    build();
    if (reduced) {
      // draw a single static frame
      for (const p of parts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.alpha})`;
        ctx.fill();
      }
      return () => cancelAnimationFrame(raf);
    }
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
    };
  }, [count, hues]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
