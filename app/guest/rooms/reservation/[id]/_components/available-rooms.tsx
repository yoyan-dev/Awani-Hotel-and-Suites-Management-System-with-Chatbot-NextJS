"use client";

import { Card, CardBody, Image } from "@heroui/react";
import { formatPHP } from "@/lib/format-php";
import React from "react";

interface Room {
  id: string;
  name: string;
  price: number;
  image: string;
}

const rooms: Room[] = [
  { id: "1", name: "Standard Room", price: 800, image: "/bg.jpg" },
  { id: "2", name: "Deluxe Room", price: 1000, image: "/bg.jpg" },
  { id: "3", name: "Suite Room", price: 1500, image: "/bg.jpg" },
  { id: "4", name: "Suite Room", price: 1500, image: "/bg.jpg" },
];

export default function AvailableRooms() {
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
                <p className="text-gray-500 text-sm">{formatPHP(room.price)}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
