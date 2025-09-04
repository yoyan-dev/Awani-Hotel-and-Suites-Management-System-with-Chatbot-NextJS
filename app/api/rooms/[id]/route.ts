import { NextRequest, NextResponse } from "next/server";
import type { Room } from "@/types/room";
import { supabase } from "@/lib/supabase-client";

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

  const { data, error } = await supabase
    .from("rooms")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      {
        success: false,
        message: {
          title: "Error",
          description: error.message,
          color: "error",
        },
      },
      { status: 500 }
    );
  }

  if (!data) {
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

  return NextResponse.json({
    success: true,
    message: {
      title: "Success",
      description: "Room updated successfully",
      color: "success",
    },
    room: data,
  });
}

// DELETE
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { error } = await supabase.from("rooms").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
