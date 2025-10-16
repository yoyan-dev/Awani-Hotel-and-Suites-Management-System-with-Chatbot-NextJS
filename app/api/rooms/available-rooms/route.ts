import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-client";
import { ApiResponse } from "@/types/response";

export async function GET(req: Request): Promise<NextResponse<ApiResponse>> {
  const { searchParams } = new URL(req.url);

  const roomTypeID = searchParams.get("roomTypeID") || "";
  const status = searchParams.get("status") || "";

  let q = supabase.from("rooms").select(
    `
    id,
    room_id,
    room_number,
    room_type_id,
    room_type:room_type_id (*),
    area,
    description,
    status,
    images,
    remarks,
  `,
    { count: "exact" }
  );

  if (roomTypeID) {
    q = q.eq("room_type_id", roomTypeID);
  }

  if (status) {
    q = q.eq("status", status);
  }

  const { data: roomData, error, count } = await q;

  const orderByRoomTypes = roomData?.sort((a: any, b: any) => {
    return a.room_type?.name.localeCompare(b.room_type?.name);
  });

  if (error) {
    console.error("Error fetching rooms:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: {
          title: "Error",
          description: error.message,
          color: "danger",
        },
      },
      { status: 500 }
    );
  }

  console.log("Room data:", orderByRoomTypes);
  const rooms = orderByRoomTypes || [];
  return NextResponse.json(
    {
      success: true,
      message: {
        title: "success",
        description: "",
        color: "success",
      },
      data: rooms,
    },
    { status: 201 }
  );
}
