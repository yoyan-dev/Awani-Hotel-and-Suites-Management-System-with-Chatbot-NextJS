"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchRoom, updateRoom } from "@/features/room/room-thunk";
import { Room } from "@/types/room";
import { uploadRoomImage } from "@/lib/upload-room-image";
import { setLoading } from "@/features/room/room-slice";
import RoomForm from "./_components/room-form";
import Header from "./_components/header";

export default function Page() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { room, isLoading } = useSelector((state: RootState) => state.room);

  const [formData, setFormData] = useState<Room>({});
  const [images, setImages] = useState<any[]>([]);
  const [beds, setBeds] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);

  useEffect(() => {
    if (id) dispatch(fetchRoom(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    if (room) {
      setFormData(room);
      setBeds(room.beds || []);
      setFacilities(room.facilities || []);
      setImages([
        ...(room.images?.map((url) => ({ file: null, preview: url })) ?? []),
        ...images,
      ]);
    }
  }, [room]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setLoading(true));

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
      beds,
      facilities,
      images: [...uploadedUrls],
    };

    dispatch(updateRoom(updatedRoom));
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
        isLoading={isLoading}
      />
    </div>
  );
}
