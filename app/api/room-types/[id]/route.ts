import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-client";
import { ApiResponse } from "@/types/response";

// UPDATE
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse>> {
  const { id } = await context.params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("room_types")
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
        error: error.message,
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
          description: "Item not found",
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
      description: "Room types updated successfully",
      color: "success",
    },
    data: data,
  });
}

// DELETE
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse>> {
  const { id } = await context.params;

  const { data, error } = await supabase
    .from("room_types")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      {
        success: false,
        message: {
          title: "Error",
          description: error.message,
          color: "error",
        },
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: {
        title: "Success",
        description: "Room types deleted successfully",
        color: "success",
      },
      data: data,
    },
    { status: 200 }
  );
}
