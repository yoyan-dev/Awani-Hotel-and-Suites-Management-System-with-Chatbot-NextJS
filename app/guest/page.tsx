"use client";

import { useDispatch, useSelector } from "react-redux";
import About from "./_components/sections/about-section";
import { RoomsCarousel } from "./_components/sections/room-carousel";
import { RoomsAndSuites } from "./_components/sections/collection-section";
import HeroBanner from "./_components/sections/hero-section";
import Stats from "./_components/sections/stat-section";
import { AppDispatch, RootState } from "@/store/store";
import React from "react";
import { fetchRooms } from "@/features/room/room-thunk";
import HotelPoolSection from "./_components/sections/pool-section";
import FAQSection from "./_components/sections/faq-section";
import Testimonials from "./_components/sections/review-section";

export default function page() {
  const { rooms, isLoading, error } = useSelector(
    (state: RootState) => state.room
  );
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);
  return (
    <div>
      <HeroBanner />
      <About />
      <Stats />
      <RoomsCarousel rooms={rooms} isLoading={isLoading} />
      <HotelPoolSection />
      <RoomsAndSuites rooms={rooms} isLoading={isLoading} />
      <Testimonials />
    </div>
  );
}
