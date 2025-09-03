import { NextRequest, NextResponse } from "next/server";
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

// UPDATE
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const index = rooms.findIndex((r) => r.id === id);
  if (index === -1) {
    return NextResponse.json(
      {
        success: false,
        message: {
          title: "Error",
          description: "Room not found",
          color: "error",
        },
      },
      { status: 404 }
    );
  }

  rooms[index] = { ...rooms[index], ...body };

  return NextResponse.json({
    success: true,
    message: {
      title: "Success",
      description: "Room updated successfully",
      color: "success",
    },
    room: rooms[index],
  });
}

// DELETE
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  // rooms = rooms.filter((r) => r.id !== id);
  return NextResponse.json({ success: true });
}
