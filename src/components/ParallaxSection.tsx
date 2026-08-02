import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Layer = {
  /** query selector for elements to parallax inside this section */
  selector: string;
  /** -1 = moves up as you scroll, +1 = moves down. Magnitude controls speed. */
  speed: number;
};

type Props = {
  id: string;
  className?: string;
  children: ReactNode;
  /** parallax layers to wire up relative to the section's scroll progress */
  layers?: Layer[];
  /** optional element to pin while the section scrolls (e.g. a big visual) */
  pinSelector?: string;
};

/**
 * Section scaffold that wires GSAP ScrollTrigger parallax for the declared
 * layers. Layers move at different speeds based on their `speed` value, which
 * is the core of the "background and foreground move at different speeds"
 * requirement. Reveal animations for `.reveal` children are also wired here.
 */
export default function ParallaxSection({
  id,
  className = "",
  children,
  layers = [],
  pinSelector,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const triggers: ScrollTrigger[] = [];

    // Parallax layers
    layers.forEach(({ selector, speed }) => {
      const targets = el.querySelectorAll<HTMLElement>(selector);
      targets.forEach((target) => {
        const amt = speed * 120;
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(target, { y: (self.progress - 0.5) * amt });
          },
        });
        triggers.push(st);
      });
    });

    // Optional pinned visual
    if (pinSelector) {
      const pin = el.querySelector<HTMLElement>(pinSelector);
      if (pin) {
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom top",
          pin: pin,
          pinSpacing: false,
        });
        triggers.push(st);
      }
    }

    // Reveal-on-scroll for .reveal children
    const reveals = el.querySelectorAll<HTMLElement>(".reveal");
    reveals.forEach((r, i) => {
      const st = ScrollTrigger.create({
        trigger: r,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(r, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            delay: (i % 6) * 0.08,
          });
        },
      });
      triggers.push(st);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [layers, pinSelector]);

  return (
    <section id={id} ref={ref} className={`section ${className}`}>
      {children}
    </section>
  );
}
