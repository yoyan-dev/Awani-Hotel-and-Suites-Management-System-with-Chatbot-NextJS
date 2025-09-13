"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchRooms } from "@/features/room/room-thunk";
import { RoomsList } from "./_components/room-list";
import { FetchRoomsParams } from "@/types/room";

export default function Page() {
  const [query, setQuery] = React.useState<FetchRoomsParams>({});
  const { rooms, isLoading, error } = useSelector(
    (state: RootState) => state.room
  );
  const dispatch = useDispatch<AppDispatch>();

  function fetchQuery() {
    dispatch(fetchRooms(query));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchQuery();
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch, query.roomType]);

  return (
    <div className="p-4">
      <RoomsList
        rooms={rooms}
        isLoading={isLoading}
        query={query}
        setQuery={setQuery}
        fetchQuery={fetchQuery}
      />
    </div>
  );
}
