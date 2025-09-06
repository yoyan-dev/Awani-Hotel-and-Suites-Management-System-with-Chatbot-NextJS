"use client";
import React from "react";
import { Room } from "@/types/room";
import { Button, Card, CardBody, Image, Spinner } from "@heroui/react";
import { ArrowUpRight } from "lucide-react";
import { formatPHP } from "@/lib/format-php";

interface RoomProps {
  rooms: Room[];
  isLoading: boolean;
}
export const RoomsCarousel: React.FC<RoomProps> = ({ rooms, isLoading }) => {
  return (
    <div>
      {!isLoading ? (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto py-12">
          {rooms.map((room: Room) => (
            <Card key={room.id} isHoverable>
              <CardBody>
                <Image
                  src="/bg.jpg"
                  alt={room.room_type}
                  className="rounded-lg"
                />
                <div className="mt-4 flex flex-col h-full gap-4 justify-between">
                  <div>
                    <p className="font-semibold">{room.room_type}</p>
                    <p className="font-light text-gray-500">
                      {room.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700">
                      {formatPHP(Number(room.base_price))}
                    </p>
                    <Button color="primary">
                      <ArrowUpRight />
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </section>
      ) : (
        <Spinner label="Loading..." />
      )}
    </div>
  );
};
