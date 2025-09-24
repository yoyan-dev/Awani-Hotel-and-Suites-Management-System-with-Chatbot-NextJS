"use client";
import React, { useEffect } from "react";
import { RoomsList } from "./_components/room-list";
import Header from "./_components/header";
import { useRoomTypes } from "@/hooks/use-room-types";
import { User } from "@/types/users";
import { supabase } from "@/lib/supabase/supabase-client";

export default function Page() {
  const { room_types, isLoading, error, fetchRoomTypes } = useRoomTypes();
  const [state, setState] = React.useState<{
    user: User | null;
    isLoading: boolean;
  }>({ user: null, isLoading: true });

  useEffect(() => {
    async function getCurrentUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setState({ user: (user as User) ?? null, isLoading: false });
    }

    getCurrentUser();
    fetchRoomTypes();
    fetchRoomTypes();
  }, [error]);

  return (
    <div className="m-0 md:m-4 p-4 bg-white dark:bg-gray-800 space-y-4">
      <Header />
      <RoomsList
        user={state.user}
        rooms={room_types}
        typesLoading={isLoading}
        userLoading={state.isLoading}
      />
    </div>
  );
}
