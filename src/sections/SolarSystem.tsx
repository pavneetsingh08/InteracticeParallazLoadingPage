import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Starfield from "@/components/Starfield";

const PLANETS = [
  { name: "Mercury", dist: "57.9M km", size: 0.38, color: "#b8a99a", days: "88 days" },
  { name: "Venus", dist: "108.2M km", size: 0.95, color: "#e0b25e", days: "225 days" },
  { name: "Earth", dist: "149.6M km", size: 1.0, color: "#4a9eff", days: "365 days" },
  { name: "Mars", dist: "227.9M km", size: 0.53, color: "#d4542a", days: "687 days" },
  { name: "Jupiter", dist: "778.5M km", size: 2.4, color: "#c98b5a", days: "11.9 yrs" },
  { name: "Saturn", dist: "1.43B km", size: 2.0, color: "#d6a865", days: "29.5 yrs" },
  { name: "Uranus", dist: "2.87B km", size: 1.6, color: "#7fd0ff", days: "84 yrs" },
  { name: "Neptune", dist: "4.50B km", size: 1.55, color: "#2a6fd6", days: "165 yrs" },
];

/**
 * "Explore the Solar System" — an orbital visualization. The Sun pulses at the
 * center while planet markers travel along their orbit rings. As the section
 * scrolls into view the rings rotate subtly for depth.
 */
export default function SolarSystem() {
  const root = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // gentle continuous orbit rotation tied to scroll progress
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (s) => gsap.set(orbitRef.current, { rotate: s.progress * 60 - 30 }),
      });

      // planet markers revolve around the sun by rotating their orbit ring
      const orbits = gsap.utils.toArray<HTMLElement>(".ss-orbit");
      orbits.forEach((orbit, i) => {
        const speed = 36 - i * 3;
        gsap.to(orbit, {
          rotation: 360,
          duration: speed,
          repeat: -1,
          ease: "none",
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="solar-system" ref={root} className="section bg-solar section-pad">
      <Starfield className="ss-stars" density={0.6} />

      <div className="ss-sun" aria-hidden="true">
        <div className="ss-sun__core" />
        <div className="ss-sun__halo" />
      </div>

      <div className="container ss-content">
        <div className="section-head reveal">
          <span className="eyebrow">02 — The Solar System</span>
          <h2 className="section-title">Eight worlds, <span className="grad">one star</span></h2>
          <p className="section-lead">
            A delicate gravitational dance held together for 4.6 billion years. Each world
            carries its own weather, gravity, and secrets waiting to be uncovered.
          </p>
        </div>
      </div>

      <div className="ss-orbit-wrap" ref={orbitRef} aria-hidden="true">
        {PLANETS.map((p, i) => {
          const r = 90 + i * 38;
          return (
            <div
              key={p.name}
              className="ss-orbit"
              style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r }}
            >
              <div
                className="ss-planet"
                style={{
                  background: `radial-gradient(circle at 32% 30%, ${lighten(p.color)}, ${p.color} 55%, ${darken(p.color)} 100%)`,
                  boxShadow: `0 0 12px ${p.color}`,
                  width: 8 + p.size * 5,
                  height: 8 + p.size * 5,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="container ss-grid">
        {PLANETS.map((p, i) => (
          <div className="ss-card glass reveal" key={p.name}>
            <span className="ss-card__idx">0{i + 1}</span>
            <span
              className="ss-card__dot"
              style={{ background: `radial-gradient(circle at 32% 30%, ${lighten(p.color)}, ${p.color} 60%, ${darken(p.color)})` }}
            />
            <h3 className="ss-card__name">{p.name}</h3>
            <div className="ss-card__meta">
              <span>{p.dist}</span>
              <span>{p.days}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}
function lighten(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${Math.min(255, r + 70)}, ${Math.min(255, g + 70)}, ${Math.min(255, b + 70)})`;
}
function darken(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${Math.max(0, r - 90)}, ${Math.max(0, g - 90)}, ${Math.max(0, b - 90)})`;
}
