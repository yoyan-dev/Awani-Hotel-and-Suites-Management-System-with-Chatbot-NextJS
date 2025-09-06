import { formatPHP } from "@/lib/format-php";
import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import { UserCircle, Bed, Wifi, Tv } from "lucide-react";
import React from "react";

export default function SelectedRoom() {
  return (
    <Card isHoverable className="max-w-2xl shadow-lg">
      <CardHeader className="flex flex-col items-start gap-2">
        <div className="flex justify-between items-center flex-wrap  w-full">
          <h2 className="text-2xl font-semibold">Deluxe Room</h2>
          <p className="text-xl font-semibold">{formatPHP(1000)}</p>
        </div>
        <p className="text-gray-500 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit amet
          accusantium voluptatibus.
        </p>
      </CardHeader>

      <CardBody className="space-y-6">
        <div className="flex gap-2 overflow-x-auto">
          <Image
            src="/bg.jpg"
            alt="room image"
            className="rounded-lg w-40 h-28 object-cover"
          />
          <Image
            src="/bg.jpg"
            alt="room image"
            className="rounded-lg w-40 h-28 object-cover"
          />
          <Image
            src="/bg.jpg"
            alt="room image"
            className="rounded-lg w-40 h-28 object-cover"
          />
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
      </CardBody>
    </Card>
  );
}
