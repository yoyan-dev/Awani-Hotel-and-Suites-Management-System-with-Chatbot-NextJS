import { NextResponse } from "next/server";
import type { Room } from "@/types/room";

let rooms: Room[] = []; 

// UPDATE
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();

  const index = rooms.findIndex((r) => r.id === id);
  if (index === -1) return NextResponse.json({ error: "Room not found" }, { status: 404 });

  rooms[index] = { ...rooms[index], ...body };
  return NextResponse.json(rooms[index]);
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  rooms = rooms.filter((r) => r.id !== id);
  return NextResponse.json({ success: true });
}
