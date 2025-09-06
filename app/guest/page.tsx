"use client";

import { useDispatch, useSelector } from "react-redux";
import About from "./_components/sections/about-section";
import { RoomsCarousel } from "./_components/sections/collection-section";
import HeroBanner from "./_components/sections/hero-section";
import Stats from "./_components/sections/stat-section";
import { AppDispatch, RootState } from "@/store/store";
import React from "react";
import { fetchRooms } from "@/features/room/room-thunk";

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
    </div>
  );
}
