"use client";
import { cn } from "@heroui/theme";

const statusColor = {
  Available: "bg-green-100 text-green-800",
  Occupied: "bg-blue-100 text-blue-800",
  Booked: "bg-purple-100 text-purple-800",
  Cleaning: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

export function BookingCard({ room, dayIndex }: any) {
  // Example dummy booking shown on first few days
  const showBooking = room.status !== "Available" && dayIndex === 1;

  if (!showBooking) return null;

  return (
    <div
      className={cn(
        "absolute top-2 left-1 right-1 rounded-lg p-2 text-xs shadow-sm",
        statusColor[room.status as keyof typeof statusColor]
      )}
    >
      <div className="font-semibold">{room.status}</div>
      <div className="opacity-75 text-[11px]">1 Night • Guest Name</div>
    </div>
  );
}
