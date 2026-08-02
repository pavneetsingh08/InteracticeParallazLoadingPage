import ParallaxSection from "@/components/ParallaxSection";
import Particles from "@/components/Particles";

type Fact = {
  value: string;
  unit: string;
  title: string;
  desc: string;
};

const FACTS: Fact[] = [
  {
    value: "1M",
    unit: "Earths",
    title: "Inside the Sun",
    desc: "The Sun is so massive it could fit about one million Earths inside it.",
  },
  {
    value: "9.8",
    unit: "m/s²",
    title: "Earth's Gravity",
    desc: "The acceleration that keeps your feet on the ground — the same everywhere on Earth.",
  },
  {
    value: "299,792",
    unit: "km/s",
    title: "Speed of Light",
    desc: "Nothing in the universe travels faster. Sunlight takes 8 minutes 20 seconds to reach us.",
  },
  {
    value: "−173",
    unit: "°C",
    title: "Lunar Night",
    desc: "The Moon has no atmosphere to hold heat — its nights are colder than Antarctic winters.",
  },
  {
    value: "100K+",
    unit: "asteroids",
    title: "In the Belt",
    desc: "The asteroid belt between Mars and Jupiter holds over 100,000 catalogued rocky bodies.",
  },
  {
    value: "2T",
    unit: "galaxies",
    title: "In the Universe",
    desc: "Recent estimates suggest two trillion galaxies, each with billions of stars.",
  },
];

/**
 * Fun Facts — a grid of glassmorphism stat cards. Each card reveals on scroll
 * and its gradient accent blooms on hover.
 */
export default function FunFacts() {
  return (
    <ParallaxSection
      id="facts"
      className="bg-facts section-pad"
      layers={[
        { selector: ".ff-bg", speed: 0.5 },
      ]}
    >
      <div className="ff-bg" aria-hidden="true" />
      <Particles className="ff-particles" count={24} hues={[190, 175, 45, 200]} />

      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">06 — Fun Facts</span>
          <h2 className="section-title">Numbers that <span className="grad">boggle the mind</span></h2>
          <p className="section-lead">
            The universe operates at scales that defy intuition. Here are a few to carry with you.
          </p>
        </div>

        <div className="ff-grid">
          {FACTS.map((f) => (
            <div className="ff-card glass reveal" key={f.title}>
              <div className="ff-card__corner" aria-hidden="true" />
              <div className="ff-card__num">
                <span className="ff-card__value">{f.value}</span>
                <span className="ff-card__unit">{f.unit}</span>
              </div>
              <h3 className="ff-card__title">{f.title}</h3>
              <p className="ff-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
