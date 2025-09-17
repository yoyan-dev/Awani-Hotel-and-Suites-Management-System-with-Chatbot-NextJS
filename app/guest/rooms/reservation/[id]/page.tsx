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

export default function Page() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedRoom, setSelectedRoom] = useState(id || null);
  const { room_types, isLoading } = useSelector(
    (state: RootState) => state.room_type
  );
  const { isLoading: bookingIsLoading } = useSelector(
    (state: RootState) => state.booking
  );

  useEffect(() => {
    dispatch(fetchRoomTypes());
  }, [dispatch]);

  const room = useMemo(() => {
    if (selectedRoom) {
      return room_types.find((room) => room.id === selectedRoom);
    }
    return null;
  }, [room_types, selectedRoom]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    // await dispatch(addBooking(formData));
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
            room_types={room_types}
            room={room || null}
            isLoading={isLoading}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
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
