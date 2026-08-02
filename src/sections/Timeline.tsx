import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Starfield from "@/components/Starfield";

type Milestone = {
  year: string;
  title: string;
  desc: string;
  icon: string;
};

const MILESTONES: Milestone[] = [
  { year: "1957", title: "Sputnik 1", desc: "The first artificial satellite orbits Earth, starting the Space Age.", icon: "S" },
  { year: "1961", title: "First Human in Space", desc: "Yuri Gagarin completes a single orbit aboard Vostok 1.", icon: "G" },
  { year: "1969", title: "Apollo 11", desc: "Neil Armstrong and Buzz Aldrin become the first humans on the Moon.", icon: "M" },
  { year: "1977", title: "Voyager Launches", desc: "Twin probes begin a grand tour of the outer planets — still flying today.", icon: "V" },
  { year: "1990", title: "Hubble Space Telescope", desc: "Humanity's eye above the atmosphere opens for the first time.", icon: "H" },
  { year: "1998", title: "ISS Assembly Begins", desc: "The International Space Station starts taking shape in orbit.", icon: "I" },
  { year: "2012", title: "Curiosity on Mars", desc: "A car-sized rover lands on Mars and begins searching for habitable conditions.", icon: "C" },
  { year: "2021", title: "James Webb Telescope", desc: "The most powerful space telescope ever built launches to see the first galaxies.", icon: "J" },
];

/**
 * Timeline of Space Exploration — a vertical spine with alternating milestone
 * cards. A glowing progress line draws itself as the user scrolls, and each
 * milestone reveals with a stagger.
 */
export default function Timeline() {
  const root = useRef<HTMLElement>(null);
  const lineFill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // progress line draws from top to bottom
      ScrollTrigger.create({
        trigger: ".tl-track",
        start: "top 70%",
        end: "bottom 70%",
        scrub: 0.5,
        onUpdate: (s) => gsap.set(lineFill.current, { scaleY: s.progress }),
      });

      // nodes pop in
      gsap.utils.toArray<HTMLElement>(".tl-node").forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              node,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)" }
            );
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={root} className="section bg-timeline section-pad">
      <Starfield className="tl-stars" density={0.5} />

      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">05 — Timeline</span>
          <h2 className="section-title">A brief history of <span className="grad">leaving Earth</span></h2>
          <p className="section-lead">
            Six decades of milestones that turned science fiction into routine achievement.
          </p>
        </div>

        <div className="tl-track">
          <div className="tl-track__line" />
          <div className="tl-track__fill" ref={lineFill} />

          <div className="tl-list">
            {MILESTONES.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <div className={`tl-row ${right ? "tl-row--right" : ""}`} key={m.year}>
                  <div className="tl-node glass" aria-hidden="true">{m.icon}</div>
                  <article className="tl-card glass reveal">
                    <span className="tl-card__year">{m.year}</span>
                    <h3 className="tl-card__title">{m.title}</h3>
                    <p className="tl-card__desc">{m.desc}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
