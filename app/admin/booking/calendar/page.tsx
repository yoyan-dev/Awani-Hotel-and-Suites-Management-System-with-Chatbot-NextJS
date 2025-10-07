"use client";
import { useRoomTypes } from "@/hooks/use-room-types";
import { CalendarView } from "./_components/calendar-view";
import React from "react";
import { Tab, Tabs } from "@heroui/react";
import { useRooms } from "@/hooks/use-rooms";
import { useBookings } from "@/hooks/use-bookings";

export default function Calendar() {
  const {
    room_types,
    isLoading: roomTypeLoading,
    fetchRoomTypes,
  } = useRoomTypes();
  const { rooms, isLoading: roomLoading, fetchRooms } = useRooms();
  const [selectedRoomType, setSelectedRoomType] = React.useState(
    room_types?.[0].id || ""
  );
  const { bookings, isLoading: bookingsLoading, fetchBookings } = useBookings();

  React.useEffect(() => {
    fetchRoomTypes();
  }, []);

  React.useEffect(() => {
    fetchRooms({ roomTypeID: selectedRoomType });
    fetchBookings({ roomTypeID: selectedRoomType });
  }, [selectedRoomType]);

  return (
    <div className="p-2 md:p-4 bg-white dark:bg-gray-900 rounded space-y-2">
      <h1 className="text-2xl font-bold">Front Desk Calendar</h1>\
      {!roomTypeLoading ? (
        <Tabs
          aria-label="Options"
          selectedKey={selectedRoomType}
          onSelectionChange={(key) => setSelectedRoomType(String(key))}
          variant="underlined"
          color="primary"
          items={room_types}
        >
          {(item) => (
            <Tab key={item.id} title={item.name}>
              {!roomLoading && !bookingsLoading ? (
                <CalendarView rooms={rooms} bookings={bookings} />
              ) : (
                <div>loading...</div>
              )}
            </Tab>
          )}
        </Tabs>
      ) : null}
    </div>
  );
}
