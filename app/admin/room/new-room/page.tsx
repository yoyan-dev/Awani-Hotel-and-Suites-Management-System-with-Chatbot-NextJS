"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addRoom } from "@/features/room/room-thunk";
import { Room } from "@/types/room";
import { uploadRoomImage } from "@/lib/upload-room-image";
import { setLoading } from "@/features/room/room-slice";
import RoomForm from "./_components/room-form";
import Header from "./_components/header";
import { fetchRoomTypes } from "@/features/room-types/room-types-thunk";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.room);
  const { room_types, isLoading: roomTypeIsLoading } = useSelector(
    (state: RootState) => state.room_type
  );

  const [images, setImages] = useState<any[]>([]);
  const [beds, setBeds] = useState<string[]>([]);
  // const [facilities, setFacilities] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchRoomTypes());
  }, [dispatch, fetchRoomTypes]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // formData.append("beds", JSON.stringify(beds));
    images.forEach((img) => {
      formData.append("images", img.file);
    });
    // formData.append("facilities", JSON.stringify(facilities));
    dispatch(addRoom(formData));
  }

  return (
    <div className="space-y-4">
      <Header />
      <RoomForm
        onSubmit={handleSubmit}
        beds={beds}
        setBeds={setBeds}
        images={images}
        setImages={setImages}
        roomTypes={room_types}
        roomTypeIsLoading={roomTypeIsLoading}
        isLoading={isLoading}
      />
    </div>
  );
}
