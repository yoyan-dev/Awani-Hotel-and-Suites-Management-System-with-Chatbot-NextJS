import { NextResponse } from "next/server";
import type { Room } from "@/types/room";

const rooms: Room[] = [
  {
    id: "1",
    room_id: "101",
    room_number: 101,
    room_type: "single",
    floor: 1,
    description: "a cozy single room",
    max_guest: 1,
    base_price: 100,
    status: "available",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
  },
  {
    id: "2",
    room_id: "102",
    room_number: 102,
    room_type: "double",
    floor: 1,
    description: "spacious double room",
    max_guest: 2,
    base_price: 180,
    status: "occupied",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
  },
];

export async function GET() {
  return NextResponse.json(rooms);
}

// CREATE room
export async function POST(req: Request) {
  const formData = await req.formData();

  const newRoom: Room = {
    id: Date.now().toString(),
    room_id: `R-${Math.floor(1000 + Math.random() * 9000)}`,
    room_number: Number(formData.get("room_number")),
    room_type: formData.get("room_type") as Room["room_type"],
    description: formData.get("description") as string,
    floor: Number(formData.get("floor")),
    max_guest: Number(formData.get("max_guest")),
    base_price: Number(formData.get("base_price")),
    status: "available",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
  };

  rooms.push(newRoom);

  return NextResponse.json(newRoom, { status: 201 });
}

