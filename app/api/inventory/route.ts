import { NextResponse } from "next/server";
import type { Inventory, InventoryStatus } from "@/types/inventory";

const inventory: Inventory[] = [
  {
    id: "1",
    name: "Item A",
    quantity: 100,
    description: "Description for Item A",
    createdAt: new Date(),
    status: "in-stock",
  },
];

export async function GET() {
  return NextResponse.json(inventory);
}

// CREATE room
export async function POST(req: Request) {
  const formData = await req.formData();

  const newItem: Inventory = {
    id: (inventory.length + 1).toString(),
    name: formData.get("name") as string,
    quantity: Number(formData.get("quantity")),
    description: formData.get("description") as string,
    createdAt: new Date(),
    status: formData.get("status") as InventoryStatus,
  };

  inventory.push(newItem);
  return NextResponse.json(
    {
      success: true,
      message: {
        title: "Success",
        description: "Item added successfully",
        color: "success",
      },
      inventory: newItem,
    },
    { status: 200 }
  );
}
