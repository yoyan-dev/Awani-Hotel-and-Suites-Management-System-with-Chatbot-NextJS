"use client";

import About from "./_components/sections/about-section";
import { RoomsCarousel } from "./_components/sections/room-carousel";
import HeroBanner from "./_components/sections/hero-section";
import Stats from "./_components/sections/stat-section";
import React from "react";
import HotelPoolSection from "./_components/sections/pool-section";
import Testimonials from "./_components/sections/review-section";
import { User } from "@/types/users";
import { supabase } from "@/lib/supabase/supabase-client";
import { useRoomTypes } from "@/hooks/use-room-types";

export default function page() {
  const { room_types, isLoading, fetchRoomTypes } = useRoomTypes();
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
    fetchRoomTypes();
  }, []);
  return (
    <div>
      <HeroBanner user={state.user} isLoading={state.isLoading} />
      <About />
      <Stats />
      <RoomsCarousel rooms={room_types} isLoading={isLoading} />
      <HotelPoolSection />
      {/* <RoomsAndSuites rooms={room_types} isLoading={isLoading} /> */}
      <Testimonials />
    </div>
  );
}
