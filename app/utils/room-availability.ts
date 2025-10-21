import { Room } from "@/types/room";

export function getAvailableRooms(
  rooms: Room[],
  check_in: any,
  check_out: any
) {
  return rooms.map((room) => {
    const hasOverlap = room.bookings?.some(
      (b) => b.check_in < check_out && b.check_out > check_in
    );

    return {
      ...room,
      availability: hasOverlap
        ? "Not available on the selected date"
        : "Available on the selected date",
    };
  });
}
