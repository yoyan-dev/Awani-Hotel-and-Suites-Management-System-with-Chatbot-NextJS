"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { RoomsList } from "./_components/room-list";
import Header from "./_components/header";
import { fetchRoomTypes } from "@/features/room-types/room-types-thunk";

export default function Page() {
  const { room_types, isLoading, error } = useSelector(
    (state: RootState) => state.room_type
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchRoomTypes());
  }, [dispatch]);

  return (
    <div className="m-0 md:m-4 p-4 bg-white dark:bg-gray-800 space-y-4">
      <Header />
      <RoomsList rooms={room_types} isLoading={isLoading} />
    </div>
  );
}
