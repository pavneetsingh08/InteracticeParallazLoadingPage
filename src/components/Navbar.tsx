import { useEffect, useRef, useState } from "react";
import { gsap, ScrollToPlugin } from "@/lib/gsap";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "solar-system", label: "Solar System" },
  { id: "planets", label: "Planets" },
  { id: "gallery", label: "Gallery" },
  { id: "timeline", label: "Timeline" },
  { id: "facts", label: "Facts" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section spy
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const target = document.getElementById(id);
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: target ? target.getBoundingClientRect().top + window.scrollY : 0 },
      ease: "power3.inOut",
    });
  };

  return (
    <header ref={ref} className={`nav ${solid ? "nav--solid" : ""}`}>
      <div className="nav__inner container">
        <button className="nav__brand" onClick={() => go("hero")} aria-label="Back to top">
          <span className="nav__logo" />
          <span className="nav__brand-text">Aether<span>·</span>Orbit</span>
        </button>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <button
              key={l.id}
              className={`nav__link ${active === l.id ? "is-active" : ""}`}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          className={`nav__toggle ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav__mobile ${open ? "is-open" : ""}`}>
        {LINKS.map((l) => (
          <button key={l.id} onClick={() => go(l.id)} className="nav__mobile-link">
            {l.label}
          </button>
        ))}
      </div>
    </header>
  );
}
