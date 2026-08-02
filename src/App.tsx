import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

import Hero from "@/sections/Hero";
import SolarSystem from "@/sections/SolarSystem";
import FeaturedPlanets from "@/sections/FeaturedPlanets";
import SpaceGallery from "@/sections/SpaceGallery";
import Timeline from "@/sections/Timeline";
import FunFacts from "@/sections/FunFacts";
import Contact from "@/sections/Contact";

import "@/styles/components.css";
import "@/styles/hero.css";
import "@/styles/solar.css";
import "@/styles/planets.css";
import "@/styles/gallery.css";
import "@/styles/timeline.css";
import "@/styles/facts.css";
import "@/styles/contact.css";

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger once all sections/images mount so positions are right.
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <SolarSystem />
        <FeaturedPlanets />
        <SpaceGallery />
        <Timeline />
        <FunFacts />
        <Contact />
      </main>
    </>
  );
}
