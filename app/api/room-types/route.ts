import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-client";
import { ApiResponse } from "@/types/response";
import { RoomType } from "@/types/room";
import { uploadRoomImage } from "@/lib/upload-room-image";

let roomTypes: RoomType[];

export async function GET(): Promise<NextResponse<ApiResponse>> {
  const { data: item, error } = await supabase.from("room_types").select("*");

  if (error) {
    console.error("Error fetching room types:", error.message);
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

  console.log("Room types data:", item);
  roomTypes = item || [];
  return NextResponse.json(
    {
      success: true,
      message: {
        title: "success",
        description: "",
        color: "success",
      },
      data: roomTypes,
    },
    { status: 201 }
  );
}

// CREATE
export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const formData = await req.formData();

    const formObj = Object.fromEntries(formData.entries());
    const image = formData.get("image") as File;
    const add_ons = JSON.parse(formObj.add_ons as string);

    const newData = {
      ...formObj,
      add_ons: add_ons,
      image:
        image && image.size > 0
          ? await uploadRoomImage(image, "type-image")
          : "",
    };
    const { data, error } = await supabase
      .from("room_types")
      .insert([newData])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      if (error.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            message: {
              title: "Error",
              description: "Item already exists.",
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
          description: "Item successfully added.",
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
