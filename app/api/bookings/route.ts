import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-client";
import { ApiResponse } from "@/types/response";
import { Booking } from "@/types/booking";

let bookings: Booking[];

export async function GET(req: Request): Promise<NextResponse<ApiResponse>> {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q") || "";
  const roomTypeID = searchParams.get("roomTypeID") || "";
  const status = searchParams.get("status") || "";
  const page = Number(searchParams.get("page") || "1");
  const limit = 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let q = supabase.from("bookings").select(
    `
    id,
    room_id,
    guest_id,
    room_type_id,
    check_in,
    check_out,
    special_requests,
    number_of_guests,
    status,
    total_add_ons,
    total,
    created_at,
    room_type:room_type_id(*),
    room:room_id (
      id,
      room_id,
      room_number,
      room_type_id,
      room_type:room_type_id(*),
      area,
      description,
      status,
      images,
      remarks
    ),
    user:guest_id (*)
  `,
    { count: "exact" }
  );

  if (query) {
    //   q = q.or(`
    //   r.ilike.%${query}%,
    // `);
  }

  if (roomTypeID) {
    q = q.eq("room_type_id", roomTypeID);
  }

  if (status) {
    q = q.eq("status", status);
  }

  const { data: bookingData, error, count } = await q.range(from, to);

  if (error) {
    console.error("Error fetching bookings:", error.message);
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

  console.log("Bookings data:", bookingData);
  bookings = bookingData || [];
  return NextResponse.json(
    {
      success: true,
      message: {
        title: "success",
        description: "",
        color: "success",
      },
      data: bookings,
      pagination: {
        page,
        limit,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / limit),
      },
    },
    { status: 201 }
  );
}

// CREATE
export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const formData = await req.formData();
    const formObj = Object.fromEntries(formData.entries());
    const specialRequests = JSON.parse(formObj.special_requests as string);

    const totalAddOnsPrice = specialRequests.reduce(
      (acc: number, item: { price: string; quantity: number }) =>
        acc + Number(item.price) * (item.quantity || 0),
      0
    );

    const newData = {
      ...formObj,
      special_requests: specialRequests,
      total_add_ons: totalAddOnsPrice,
    };
    const { data, error } = await supabase
      .from("bookings")
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
              description: "Booking already exists.",
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
          description: "Reservation successfully added.",
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

    let query = supabase.from("bookings").delete();

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
            description: "Failed to delete items.",
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
            ? "All items deleted successfully"
            : "Selected items deleted successfully",
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
          description: err.message,
          color: "error",
        },
        error: err.message,
      },
      { status: 500 }
    );
  }
}
