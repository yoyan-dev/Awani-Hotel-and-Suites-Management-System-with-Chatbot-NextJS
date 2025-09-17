"use client";

import { Card, CardBody, Image } from "@heroui/react";
import { formatPHP } from "@/lib/format-php";
import React from "react";
import { RoomType } from "@/types/room";

interface AvailableRoomProps {
  rooms: RoomType[];
  isLoading: boolean;
}
export const AvailableRooms: React.FC<AvailableRoomProps> = ({
  rooms,
  isLoading,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Available Rooms</h3>
      <div className="grid grid-cols-4 gap-4">
        {rooms.map((room) => (
          <Card key={room.id} isPressable isHoverable>
            <CardBody className="flex items-center gap-4">
              <Image
                src={room.image}
                alt={room.name}
                className="w-24 h-20 object-cover rounded-lg"
              />
              <div className="flex flex-col">
                <p className="font-medium">{room.name}</p>
                <p className="text-gray-500 text-sm">
                  {formatPHP(Number(room.price))}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
