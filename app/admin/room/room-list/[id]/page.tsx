"use client";
import React from "react";
import { Chip, Image } from "@heroui/react";
import { useParams } from "next/navigation";
import { statusColorMap } from "../../../../constants/rooms";
import { useRooms } from "@/hooks/use-rooms";

export default function RoomDetails() {
  const { id } = useParams();
  const { room, isLoading, error, fetchRoom } = useRooms();

  React.useEffect(() => {
    if (id) {
      fetchRoom(id as string);
    }
  }, [id, error]);

  if (isLoading || !room) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="p-6 bg-white dark:bg-gray-900 rounded space-y-6">
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
        </div>
      </div>
    </div>
  );
}
