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
import { fetchRoomTypes } from "@/features/room-types/room-types-thunk";
import { User } from "@/types/users";
import { supabase } from "@/lib/supabase/supabase-client";

export default function page() {
  const { room_types, isLoading: roomTypeIsLoading } = useSelector(
    (state: RootState) => state.room_type
  );
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = React.useState<{
    user: User | null;
    isLoading: boolean;
  }>({ user: null, isLoading: true });

  React.useEffect(() => {
    async function getCurrentUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setState({ user: (user as User) ?? null, isLoading: false });
    }

    getCurrentUser();
    dispatch(fetchRooms());
    dispatch(fetchRoomTypes());
  }, [dispatch]);
  return (
    <div>
      <HeroBanner user={state.user} isLoading={state.isLoading} />
      <About />
      <Stats />
      <RoomsCarousel rooms={room_types} isLoading={roomTypeIsLoading} />
      <HotelPoolSection />
      {/* <RoomsAndSuites rooms={room_types} isLoading={isLoading} /> */}
      <Testimonials />
    </div>
  );
}
