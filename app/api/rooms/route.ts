import { NextResponse } from "next/server";
import type { Room } from "@/types/room";
import { supabase } from "@/lib/supabase-client";
import { uploadRoomImage } from "@/lib/upload-room-image";
import { ApiResponse } from "@/types/response";

let rooms: Room[];

export async function GET(): Promise<NextResponse<ApiResponse>> {
  const { data: roomData, error } = await supabase.from("rooms").select("*");

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

  console.log("Room data:", roomData);
  rooms = roomData || [];
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

// CREATE room
export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
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
          {
            success: false,
            message: {
              title: "Error",
              description: "Image upload failed.",
              color: "danger",
            },
          },
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
          {
            success: false,
            message: {
              title: "Error",
              description: "Room number already exists.",
              color: "danger",
            },
          },
          { status: 400 }
        );
      }
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

    return NextResponse.json(
      {
        success: true,
        message: {
          title: "Success",
          description: "Room added successfully",
          color: "success",
        },
        data: data[0],
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        message: {
          title: "Error",
          description: err.message,
          color: "danger",
        },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json();
    const selectedValues: number[] | "all" = body.selectedValues;

    let query = supabase.from("rooms").delete();

    if (selectedValues === "all") {
    } else if (Array.isArray(selectedValues) && selectedValues.length > 0) {
      query = query.in("id", selectedValues);
    } else {
      return NextResponse.json(
        {
          success: false,
          message: {
            title: "Error",
            description: selectedValues,
            color: "warning",
          },
        },
        { status: 400 }
      );
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: {
            title: "Error",
            description: "Failed to delete rooms",
            color: "error",
          },
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: {
        title: "Success",
        description:
          selectedValues === "all"
            ? "All rooms deleted successfully"
            : "Selected rooms deleted successfully",
        color: "success",
      },
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: {
          title: "Error",
          description: "Something went wrong",
          color: "error",
        },
        error: err.message,
      },
      { status: 500 }
    );
  }
}
