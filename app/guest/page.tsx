"use client";

import About from "./_components/sections/about-section";
import RoomsCarousel from "./_components/sections/collection-section";
import HeroBanner from "./_components/sections/hero-section";
import Stats from "./_components/sections/stat-section";

export default function page() {
  return (
    <div>
      <HeroBanner />
      <About />
      <Stats />
      <RoomsCarousel />
    </div>
  );
}
