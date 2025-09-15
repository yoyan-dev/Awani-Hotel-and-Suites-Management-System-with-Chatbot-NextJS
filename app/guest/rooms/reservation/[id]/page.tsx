"use client";

import BookingForm from "./_components/booking-form";
import SelectedRoom from "./_components/selected-room";
import AvailableRooms from "./_components/available-rooms";

export default function Page() {
  return (
    <div className="px-4 py-8 flex flex-col lg:flex-row justify-center items-start min-h-screen gap-8 bg-gray-50">
      <div className="w-full lg:w-1/3 max-w-md">
        <BookingForm />
      </div>

      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <SelectedRoom />
      </div>
    </div>
  );
}
