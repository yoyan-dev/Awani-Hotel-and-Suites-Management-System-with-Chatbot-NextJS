import { NextResponse } from "next/server";

const housekeeping: any = [
];

export async function GET() {
  return NextResponse.json(housekeeping);
}

// CREATE room
// export async function POST(req: Request) {
//   const formData = await req.formData();

//   const newRoom: Room = {
//     id: Date.now().toString(),
//     room_id: `R-${Math.floor(1000 + Math.random() * 9000)}`,
//     room_number: Number(formData.get("room_number")),
//     room_type: formData.get("room_type") as Room["room_type"],
//     description: formData.get("description") as string,
//     floor: Number(formData.get("floor")),
//     max_guest: Number(formData.get("max_guest")),
//     base_price: Number(formData.get("base_price")),
//     status: "available",
//     image: "https://heroui.com/images/hero-card-complete.jpeg",
//   };

//   rooms.push(newRoom);

//   return NextResponse.json(newRoom, { status: 201 });
// }

