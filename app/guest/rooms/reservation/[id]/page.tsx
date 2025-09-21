"use client";

import BookingForm from "./_components/booking-form";
import SelectedRoom from "./_components/selected-room";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useMemo, useState } from "react";
import { fetchRoom } from "@/features/room/room-thunk";
import { fetchRoomTypes } from "@/features/room-types/room-types-thunk";
import { RoomType } from "@/types/room";
import AvailableRooms from "./_components/available-rooms";
import { addBooking } from "@/features/booking/booking-thunk";
import { supabase } from "@/lib/supabase/supabase-client";
import { fetchGuest } from "@/features/guest/guest-thunk";

export default function Page() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { guest, isLoading: guestIsLoading } = useSelector(
    (state: RootState) => state.guests
  );
  const [selectedRoom, setSelectedRoom] = useState(id || null);
  const { room_types, isLoading } = useSelector(
    (state: RootState) => state.room_type
  );
  const { isLoading: bookingIsLoading } = useSelector(
    (state: RootState) => state.booking
  );

  const [specialRequests, setSpecialRequests] = useState<
    { name: string; price: string; quantity: number }[]
  >([]);

  async function getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (user?.id) {
      await dispatch(fetchGuest(user.id));
      return;
    }
  }

  useEffect(() => {
    dispatch(fetchRoomTypes());
    getCurrentUser();
  }, [dispatch]);

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

    formData.append("guest_id", guest.id || "");
    formData.append("special_requests", JSON.stringify(specialRequests));
    console.log(formData);
    await dispatch(addBooking(formData));
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
