import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A custom glowing cursor: a small dot that tracks instantly and a soft ring
 * that lags behind with spring easing. Grows on hover over interactive
 * elements. Only activates on fine-pointer devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xToDot(e.clientX); yToDot(e.clientY);
      xToRing(e.clientX); yToRing(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, input, textarea, [data-cursor='hover']");
      gsap.to(ring, {
        scale: interactive ? 1.9 : 1,
        borderColor: interactive ? "rgba(43,212,255,0.9)" : "rgba(43,212,255,0.4)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: interactive ? 0.5 : 1, duration: 0.35, ease: "power3.out" });
    };

    const onDown = () => gsap.to(ring, { scale: 0.7, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3 });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div className="cursor-root" aria-hidden="true">
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </div>
  );
}
