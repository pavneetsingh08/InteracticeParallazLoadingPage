import ParallaxSection from "@/components/ParallaxSection";
import Particles from "@/components/Particles";

type Planet = {
  name: string;
  tag: string;
  blurb: string;
  variant: "earth" | "mars" | "jupiter" | "saturn" | "neptune" | "venus";
  stats: { label: string; value: string }[];
  ring?: boolean;
};

const PLANETS: Planet[] = [
  {
    name: "Earth",
    tag: "The Pale Blue Dot",
    blurb:
      "The only world known to harbor life. A thin atmosphere, liquid oceans, and a magnetic shield make it a rare oasis in the cold void.",
    variant: "earth",
    stats: [
      { label: "Diameter", value: "12,742 km" },
      { label: "Moons", value: "1" },
      { label: "Day", value: "24 h" },
    ],
  },
  {
    name: "Mars",
    tag: "The Red Frontier",
    blurb:
      "A frozen desert of iron oxide dunes and the tallest volcano in the solar system. Mars is humanity's most reachable next home.",
    variant: "mars",
    stats: [
      { label: "Diameter", value: "6,779 km" },
      { label: "Moons", value: "2" },
      { label: "Day", value: "24.6 h" },
    ],
  },
  {
    name: "Jupiter",
    tag: "The Gas Giant",
    blurb:
      "A storm-banded colossus more massive than all other planets combined. Its Great Red Spot has raged for over 350 years.",
    variant: "jupiter",
    stats: [
      { label: "Diameter", value: "139,820 km" },
      { label: "Moons", value: "95" },
      { label: "Day", value: "9.9 h" },
    ],
  },
  {
    name: "Saturn",
    tag: "The Ringed Jewel",
    blurb:
      "Wrapped in glittering rings of ice and rock spanning 280,000 km yet barely 10 m thick. Saturn is the solar system's masterpiece.",
    variant: "saturn",
    ring: true,
    stats: [
      { label: "Diameter", value: "116,460 km" },
      { label: "Moons", value: "146" },
      { label: "Day", value: "10.7 h" },
    ],
  },
  {
    name: "Neptune",
    tag: "The Wind World",
    blurb:
      "The farthest planet, wrapped in supersonic winds reaching 2,100 km/h. Its deep blue hue comes from methane in its atmosphere.",
    variant: "neptune",
    stats: [
      { label: "Diameter", value: "49,244 km" },
      { label: "Moons", value: "16" },
      { label: "Day", value: "16 h" },
    ],
  },
  {
    name: "Venus",
    tag: "The Morning Star",
    blurb:
      "Earth's twin in size, a hellscape in nature. A crushing CO₂ atmosphere traps heat at 465 °C — hotter than Mercury despite being further from the Sun.",
    variant: "venus",
    stats: [
      { label: "Diameter", value: "12,104 km" },
      { label: "Moons", value: "0" },
      { label: "Day", value: "243 d" },
    ],
  },
];

export default function FeaturedPlanets() {
  return (
    <ParallaxSection
      id="planets"
      className="bg-planets section-pad"
      layers={[
        { selector: ".fp-bg-planet--1", speed: 0.5 },
        { selector: ".fp-bg-planet--2", speed: -0.8 },
        { selector: ".fp-bg-planet--3", speed: 0.3 },
      ]}
    >
      <Particles className="fp-particles" count={20} hues={[190, 175, 45]} />

      {/* decorative bg planets that parallax slower */}
      <div className="planet planet--jupiter fp-bg-planet fp-bg-planet--1" aria-hidden="true" />
      <div className="planet planet--neptune fp-bg-planet fp-bg-planet--2" aria-hidden="true" />
      <div className="planet planet--mars fp-bg-planet fp-bg-planet--3" aria-hidden="true" />

      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">03 — Featured Planets</span>
          <h2 className="section-title">Worlds worth <span className="grad">visiting</span></h2>
          <p className="section-lead">
            Six destinations, each a study in extremes. Hover to see them turn in the light.
          </p>
        </div>

        <div className="fp-grid">
          {PLANETS.map((p, i) => (
            <article className={`fp-card glass reveal fp-card--${i % 3}`} key={p.name}>
              <div className="fp-card__visual">
                <div className={`fp-sphere planet planet--${p.variant}`}>
                  {p.ring && <div className="saturn-ring" />}
                </div>
                <div className="fp-card__glow" />
              </div>

              <div className="fp-card__body">
                <span className="fp-card__tag">{p.tag}</span>
                <h3 className="fp-card__name">{p.name}</h3>
                <p className="fp-card__blurb">{p.blurb}</p>

                <div className="fp-card__stats">
                  {p.stats.map((s) => (
                    <div className="fp-stat" key={s.label}>
                      <span className="fp-stat__v">{s.value}</span>
                      <span className="fp-stat__l">{s.label}</span>
                    </div>
                  ))}
                </div>

                <button className="fp-card__cta">
                  Explore {p.name}
                  <span className="arrow">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
