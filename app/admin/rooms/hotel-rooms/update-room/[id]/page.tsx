"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Room } from "@/types/room";
import { uploadRoomImage } from "@/lib/upload-room-image";
import RoomForm from "./_components/room-form";
import Header from "./_components/header";
import { useRooms } from "@/hooks/use-rooms";
import { useRoomTypes } from "@/hooks/use-room-types";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const {
    room,
    isLoading: roomLoading,
    setLoading,
    fetchRoom,
    updateRoom,
  } = useRooms();
  const {
    room_types,
    isLoading: typesLoading,
    error,
    fetchRoomTypes,
  } = useRoomTypes();

  const [formData, setFormData] = React.useState<Room>({});
  const [images, setImages] = React.useState<any[]>([]);
  const [beds, setBeds] = React.useState<string[]>([]);
  const [facilities, setFacilities] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (id) fetchRoom(id as string);
    fetchRoomTypes({});
  }, [error, id]);

  React.useEffect(() => {
    if (room) {
      setFormData(room);
      setImages([
        ...(room.images?.map((url) => ({ file: null, preview: url })) ?? []),
        ...images,
      ]);
    }
  }, [room]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading();

    const uploadedUrls = await Promise.all(
      images.map(async (img) => {
        if (img.file) {
          const imageUrl = await uploadRoomImage(
            img.file,
            Number(formData.room_number)
          );
          return imageUrl;
        }
        return img.preview;
      })
    );

    const updatedRoom: Room = {
      ...formData,
      images: [...uploadedUrls],
    };

    await updateRoom(updatedRoom);
    router.push("/admin/rooms/hotel-rooms");
  }

  return (
    <div className="space-y-4">
      <Header />
      <RoomForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        beds={beds}
        setBeds={setBeds}
        facilities={facilities}
        setFacilities={setFacilities}
        images={images}
        setImages={setImages}
        roomTypes={room_types}
        typesLoading={typesLoading}
        roomLoading={roomLoading}
      />
    </div>
  );
}
