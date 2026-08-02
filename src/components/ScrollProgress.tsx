import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Thin gradient bar pinned to the top of the viewport that fills as the user
 * scrolls through the page. A soft glow dot rides the leading edge.
 */
export default function ScrollProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        gsap.to(fillRef.current, { scaleX: p, duration: 0.1, ease: "none", overwrite: true });
        gsap.to(dotRef.current, { left: `${p * 100}%`, duration: 0.1, ease: "none", overwrite: true });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="scroll-progress" ref={trackRef} aria-hidden="true">
      <div className="scroll-progress__fill" ref={fillRef} />
      <div className="scroll-progress__dot" ref={dotRef} />
    </div>
  );
}
