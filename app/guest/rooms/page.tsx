"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchRooms } from "@/features/room/room-thunk";
import { RoomsList } from "./_components/room-list";

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
      <RoomsList rooms={rooms} isLoading={isLoading} />
    </div>
  );
}
