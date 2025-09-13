"use client";
import React, { useEffect } from "react";
import { Chip, Image } from "@heroui/react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchRoom } from "@/features/room/room-thunk";
import { statusColorMap } from "../_components/table/constants";
import { formatPHP } from "@/lib/format-php";

export default function RoomDetails() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { room, isLoading } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    if (id) {
      dispatch(fetchRoom(id as string));
    }
  }, [dispatch, id]);

  if (isLoading || !room) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="p-6 bg-white dark:bg-gray-900 rounded space-y-6">
        <h1 className="text-2xl font-semibold">{room.name}</h1>
        <div className="flex gap-2 items-center">
          <Chip color={statusColorMap[room.status || "default"]} radius="sm">
            {room.status}
          </Chip>
          <span className="text-gray-500">Room #{room.room_number}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="font-semibold">Basic Information</h2>
            <p>
              <span className="font-medium">Type:</span> {room.room_type}
            </p>
            <p>
              <span className="font-medium">Area:</span> {room.area}
            </p>
            <p>
              <span className="font-medium">Max Guests:</span> {room.max_guest}
            </p>
            <p>
              <span className="font-medium">Base Price:</span>

              {formatPHP(Number(room.base_price))}
            </p>
            <p className="text-gray-400">{room.description}</p>
          </div>

          {/* Room Photos */}
          <div>
            <h2 className="font-semibold mb-2">Photos</h2>
            <div className="flex flex-wrap gap-2">
              {room.images?.map((url: string, i: number) => (
                <Image
                  key={i}
                  src={url}
                  alt={`Room photo ${i}`}
                  width={180}
                  radius="sm"
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Beds</h2>
            <div className="flex flex-wrap gap-2">
              {room.beds?.map((bed: string, i: number) => (
                <Chip key={i} radius="sm">
                  {bed}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Facilities & Services</h2>
            <div className="flex flex-wrap gap-2">
              {room.facilities?.map((fac: string, i: number) => (
                <Chip key={i} radius="sm">
                  {fac}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
