import { NextResponse } from "next/server";
import type { Room } from "@/types/room";
import { supabase } from "@/lib/supabase-client";
import { uploadRoomImage } from "@/lib/upload-room-image";

let rooms: Room[];

export async function GET() {
  const { data: roomData, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.error("Error fetching rooms:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("Room data:", roomData);
  rooms = roomData || [];
  return NextResponse.json(rooms);
}

// CREATE room
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const roomNumber = Number(formData.get("room_number"));
    const file = formData.get("image") as File | null;

    let imageUrl: string | null = null;

    if (file && file.size > 0) {
      try {
        imageUrl = await uploadRoomImage(file, roomNumber);
      } catch (uploadErr: any) {
        console.error("Upload error:", uploadErr.message);
        return NextResponse.json(
          { error: "Image upload failed" },
          { status: 500 }
        );
      }
    }

    const newRoom = {
      room_id: `RM-${roomNumber}`,
      room_number: roomNumber,
      room_type: formData.get("room_type") as string,
      description: formData.get("description") as string,
      floor: Number(formData.get("floor")),
      max_guest: Number(formData.get("max_guest")),
      base_price: Number(formData.get("base_price")),
      status: formData.get("status") as string,
      image: imageUrl,
    };

    const { data, error } = await supabase
      .from("rooms")
      .insert([newRoom])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Room number already exists." },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
