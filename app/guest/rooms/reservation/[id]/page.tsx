"use client";

import BookingForm from "./_components/booking-form";
import SelectedRoom from "./_components/selected-room";
import AvailableRooms from "./_components/available-rooms";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchRoom } from "@/features/room/room-thunk";

export default function Page() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { room, isLoading } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    if (id) {
      dispatch(fetchRoom(id as string));
    }
  }, [dispatch, id]);
  return (
    <div>
      <Card className="border-none shadow-none">
        <CardHeader className="text-xl font-semibold text-center dark:bg-gray-900 ">
          Hotel Reservation
        </CardHeader>
        <CardBody className="dark:bg-gray-900  w-full flex flex-col lg:flex-row justify-center items-start gap-8">
          <BookingForm />
          <SelectedRoom room={room} isLoading={isLoading} />
        </CardBody>
      </Card>
    </div>
  );
}
