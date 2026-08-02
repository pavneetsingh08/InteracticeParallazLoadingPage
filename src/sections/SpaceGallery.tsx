import ParallaxSection from "@/components/ParallaxSection";
import Starfield from "@/components/Starfield";

type Shot = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  span?: "wide" | "tall";
};

const SHOTS: Shot[] = [
  {
    src: "https://images.pexels.com/photos/37269529/pexels-photo-37269529.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Vibrant cosmic nebula with stars",
    title: "Carina Nebula",
    caption: "Stellar nursery, 7,500 light-years away",
    span: "wide",
  },
  {
    src: "https://images.pexels.com/photos/30596291/pexels-photo-30596291.png?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Earth viewed from space",
    title: "Blue Marble",
    caption: "Earth, as seen from orbit",
  },
  {
    src: "https://images.pexels.com/photos/29719662/pexels-photo-29719662.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Detailed lunar surface",
    title: "Lunar Detail",
    caption: "Cratered highlands of the Moon",
  },
  {
    src: "https://images.pexels.com/photos/38825275/pexels-photo-38825275.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Ringed planet in deep space",
    title: "Ringed Wanderer",
    caption: "A gas giant encircled by ice",
    span: "tall",
  },
  {
    src: "https://images.pexels.com/photos/2152/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Astronaut on a spacewalk",
    title: "EVA",
    caption: "A spacewalk above the curve of Earth",
  },
  {
    src: "https://images.pexels.com/photos/3083808/pexels-photo-3083808.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "The Milky Way at night",
    title: "River of Stars",
    caption: "The Milky Way arching overhead",
    span: "wide",
  },
];

/**
 * Space Gallery — a masonry-style grid of real astrophotography. Each tile
 * has a parallax offset and reveals with a staggered scale-in. Hover lifts
 * the image and fades in a caption overlay.
 */
export default function SpaceGallery() {
  return (
    <ParallaxSection
      id="gallery"
      className="bg-gallery section-pad"
      layers={[
        { selector: ".gal-bg", speed: 0.4 },
        { selector: ".gal-tile__img", speed: -0.25 },
      ]}
    >
      <div className="gal-bg" aria-hidden="true" />
      <Starfield className="gal-stars" density={0.4} />

      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">04 — Space Gallery</span>
          <h2 className="section-title">Postcards from <span className="grad">the void</span></h2>
          <p className="section-lead">
            A curated visual archive of the cosmos — nebulae, worlds, and the people who venture among them.
          </p>
        </div>

        <div className="gal-grid">
          {SHOTS.map((s, i) => (
            <figure className={`gal-tile glass reveal gal-tile--${s.span || "std"} gal-tile--${i}`} key={s.title}>
              <div className="gal-tile__media">
                <img className="gal-tile__img" src={s.src} alt={s.alt} loading="lazy" />
                <div className="gal-tile__overlay" />
              </div>
              <figcaption className="gal-tile__cap">
                <span className="gal-tile__title">{s.title}</span>
                <span className="gal-tile__sub">{s.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
