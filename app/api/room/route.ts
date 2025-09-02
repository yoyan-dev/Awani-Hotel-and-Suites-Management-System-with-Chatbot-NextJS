import { NextResponse } from "next/server";
import type { Room } from "@/types/room";

const mockRooms: Room[] = [
  {
    id: "1",
    room_id: "101",
    room_number: 101,
    room_type: "Single",
    floor: 1,
    description: "A cozy single room",
    max_guest: 1,
    base_price: 100,
    status: "available",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
  },
  {
    id: "2",
    room_id: "102",
    room_number: 102,
    room_type: "Double",
    floor: 1,
    description: "Spacious double room",
    max_guest: 2,
    base_price: 180,
    status: "occupied",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
  },
];

export async function GET() {
  return NextResponse.json(mockRooms);
}
