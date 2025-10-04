"use client";

import BookingForm from "./_components/booking-form";
import SelectedRoom from "./_components/selected-room";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import AvailableRooms from "./_components/available-rooms";
import { supabase } from "@/lib/supabase/supabase-client";
import { useGuests } from "@/hooks/use-guests";
import { useRoomTypes } from "@/hooks/use-room-types";
import { useBookings } from "@/hooks/use-bookings";

export default function Page() {
  const { id } = useParams();
  const { guest, isLoading: guestIsLoading, fetchGuest } = useGuests();
  const [selectedRoom, setSelectedRoom] = useState(id || null);
  const { room_types, isLoading, fetchRoomTypes } = useRoomTypes();
  const { isLoading: bookingIsLoading, addBooking } = useBookings();

  const [specialRequests, setSpecialRequests] = useState<
    { name: string; price: string; quantity: number }[]
  >([]);

  async function getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (user?.id) {
      await fetchGuest(user.id);
      return;
    }
  }

  useEffect(() => {
    fetchRoomTypes();
    getCurrentUser();
  }, []);

  const room = useMemo(() => {
    if (selectedRoom) {
      return room_types.find((room) => room.id === selectedRoom);
    }
    return null;
  }, [room_types, selectedRoom]);

  useEffect(() => {
    if (room?.add_ons) {
      setSpecialRequests(
        room.add_ons.map((item: any) => ({
          name: item.name,
          price: item.price,
          quantity: 0,
        }))
      );
    } else {
      setSpecialRequests([]);
    }
  }, [room]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const filtereSpecialRequest = specialRequests.filter(
      (req) => req.quantity > 0
    );

    formData.append("guest_id", guest.id || "");
    formData.append(
      "special_requests",
      JSON.stringify(filtereSpecialRequest || [])
    );
    console.log(formData);
    await addBooking(formData);
  }

  return (
    <div>
      <Card className="border-none shadow-none">
        <CardHeader className="text-xl font-semibold text-center dark:bg-gray-900 ">
          Hotel Reservation
        </CardHeader>
        <CardBody className="dark:bg-gray-900  w-full flex flex-col lg:flex-row items-start gap-8">
          <BookingForm
            onSubmit={handleSubmit}
            guest={guest}
            guestIsLoading={guestIsLoading}
            room_types={room_types}
            room={room || null}
            isLoading={isLoading}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            specialRequests={specialRequests}
            setSpecialRequests={setSpecialRequests}
            bookingIsLoading={bookingIsLoading}
          />
          {room ? (
            <SelectedRoom room={room} isLoading={isLoading} />
          ) : (
            <AvailableRooms
              rooms={room_types}
              isLoading={isLoading}
              setSelectedRoom={setSelectedRoom}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
