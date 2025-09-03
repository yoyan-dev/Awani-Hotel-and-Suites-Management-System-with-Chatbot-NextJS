"use client";
import BookingList from "./_components/booking-list";
import RoomList from "./_components/room-list";
export default function Booking() {
  return (
    <div className="p-2 flex flex-col gap-4">
      Booking page
      <div className="flex gap-4">
        <BookingList />
        <RoomList />
      </div>
    </div>
  );
}
