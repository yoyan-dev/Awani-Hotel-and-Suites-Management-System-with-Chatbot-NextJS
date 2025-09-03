"use client";
import { Card, CardBody, Image } from "@heroui/react";

const rooms = [
  { name: "Deluxe Room", price: "$300/Night", img: "/deluxe.jpg" },
  { name: "Standard Room", price: "$200/Night", img: "/standard.jpg" },
  { name: "Superior Room", price: "$350/Night", img: "/superior.jpg" },
];

export default function RoomsCarousel() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto py-12">
      {rooms.map((room, i) => (
        <Card key={i} isHoverable>
          <CardBody>
            <Image src={room.img} alt={room.name} className="rounded-lg" />
            <div className="mt-4 text-center">
              <p className="font-semibold">{room.name}</p>
              <p className="text-gray-500">{room.price}</p>
            </div>
          </CardBody>
        </Card>
      ))}
    </section>
  );
}
