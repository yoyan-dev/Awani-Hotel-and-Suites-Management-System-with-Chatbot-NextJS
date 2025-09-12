"use client";
import React from "react";
import { Room } from "@/types/room";
import { Button, Card, CardBody, Image, Link, Spinner } from "@heroui/react";
import { ArrowUpRight, Bed, Tv, UserCircle, Wifi } from "lucide-react";
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
                    <p className="font-semibold capitalize">{room.room_type}</p>
                    <p className="font-light text-gray-500">
                      {room.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Room Features</h3>
                    <div className="flex gap-4 text-gray-700 flex-wrap">
                      <div className="flex items-center gap-2">
                        <UserCircle size={20} /> 2 Guests
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed size={20} /> 1 Queen Bed
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi size={20} /> Free WiFi
                      </div>
                      <div className="flex items-center gap-2">
                        <Tv size={20} /> Smart TV
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700">
                      {formatPHP(Number(room.base_price))}
                    </p>
                    <Button
                      color="primary"
                      as={Link}
                      href={`/guest/room/${room.id}`}
                    >
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
