import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Starfield from "@/components/Starfield";
import Particles from "@/components/Particles";
import { useMousePosition } from "@/hooks/useMousePosition";

/**
 * Fullscreen hero: animated starfield, large moon with parallax, floating
 * planets, mouse-driven depth drift, and scroll-driven fade/zoom of the
 * headline as the user descends into the page.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const planet1 = useRef<HTMLDivElement>(null);
  const planet2 = useRef<HTMLDivElement>(null);
  const planet3 = useRef<HTMLDivElement>(null);
  const mountBg = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();

  // Mouse parallax — different layers move at different magnitudes
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const loop = () => {
      const { x, y } = mouse.current;
      if (moonRef.current) gsap.set(moonRef.current, { x: x * 30, y: y * 24 });
      if (planet1.current) gsap.set(planet1.current, { x: x * 60, y: y * 40 });
      if (planet2.current) gsap.set(planet2.current, { x: x * -45, y: y * -30 });
      if (planet3.current) gsap.set(planet3.current, { x: x * 90, y: y * 60 });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mouse]);

  // Scroll parallax + intro timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      // intro
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 24, opacity: 0, duration: 0.9, delay: 0.3 })
        .from(".hero-title-line", { y: 60, opacity: 0, duration: 1.1, stagger: 0.12 }, "-=0.5")
        .from(".hero-lead", { y: 24, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-cta", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.5")
        .from(".hero-stat", { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.4")
        .from(".hero-scroll-hint", { opacity: 0, duration: 0.8 }, "-=0.3");

      // scroll: content drifts up & fades, moon scales/floats
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (s) => {
          const p = s.progress;
          gsap.set(contentRef.current, { y: p * -120, opacity: 1 - p * 1.3 });
          gsap.set(moonRef.current, { y: p * 180, scale: 1 + p * 0.2 });
          gsap.set(mountBg.current, { opacity: 1 - p });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const target = document.getElementById("solar-system");
    gsap.to(window, {
      duration: 1.3,
      scrollTo: { y: target ? target.getBoundingClientRect().top + window.scrollY : 0 },
      ease: "power3.inOut",
    });
  };

  return (
    <section id="hero" ref={root} className="section bg-hero" style={{ minHeight: "100vh" }}>
      {/* Fixed-ish background layers (parallax via scroll) */}
      <div className="hero-bg" ref={mountBg}>
        <Starfield className="hero-starfield" />
        <Particles className="hero-particles" count={30} hues={[190, 200, 175]} />

        {/* Moon — large, subtle parallax */}
        <div className="hero-moon" ref={moonRef} aria-hidden="true">
          <div className="hero-moon__body" />
          <div className="hero-moon__glow" />
        </div>

        {/* Floating planets */}
        <div className="hero-planet hero-planet--1 planet planet--earth" ref={planet1} aria-hidden="true" />
        <div className="hero-planet hero-planet--2 planet planet--mars" ref={planet2} aria-hidden="true" />
        <div className="hero-planet hero-planet--3 planet planet--neptune" ref={planet3} aria-hidden="true" />

        {/* soft horizon glow */}
        <div className="hero-horizon" aria-hidden="true" />
      </div>

      <div className="container hero-content" ref={contentRef}>
        <span className="eyebrow hero-eyebrow">Journey Through Space</span>
        <h1 className="hero-title">
          <span className="hero-title-line">Beyond the</span>
          <span className="hero-title-line grad-text">Edge of Stars</span>
        </h1>
        <p className="hero-lead">
          Drift across the cosmos in an immersive parallax voyage — from the burning surface
          of the Sun to the icy plains beyond Neptune. This is the universe, reimagined for the web.
        </p>

        <div className="hero-actions">
          <button className="btn btn--primary hero-cta" onClick={scrollToNext}>
            Begin the Journey
            <span className="arrow">→</span>
          </button>
          <button className="btn hero-cta" onClick={() => {
            const target = document.getElementById("gallery");
            gsap.to(window, {
              duration: 1.3,
              scrollTo: { y: target ? target.getBoundingClientRect().top + window.scrollY : 0 },
              ease: "power3.inOut",
            });
          }}>
            View Gallery
          </button>
        </div>

        <div className="hero-stats">
          {[
            { k: "8", v: "Planets" },
            { k: "200B+", v: "Galaxies" },
            { k: "13.8B", v: "Years Old" },
            { k: "∞", v: "Possibilities" },
          ].map((s) => (
            <div className="hero-stat glass" key={s.v}>
              <span className="hero-stat__k">{s.k}</span>
              <span className="hero-stat__v">{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="hero-scroll-hint" onClick={scrollToNext} aria-label="Scroll to explore">
        <span>Scroll</span>
        <span className="hero-scroll-hint__line" />
      </button>
    </section>
  );
}
