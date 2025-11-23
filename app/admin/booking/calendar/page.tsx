"use client";

import React from "react";
import { Tabs, Tab, Spinner, Skeleton, Card } from "@heroui/react";
import { useRoomTypes } from "@/hooks/use-room-types";
import { useRooms } from "@/hooks/use-rooms";
import { useBookings } from "@/hooks/use-bookings";
import { CalendarView } from "./_components/calendar-view";

export default function Calendar() {
  const {
    room_types,
    isLoading: roomTypeLoading,
    fetchRoomTypes,
  } = useRoomTypes();

  const { rooms, isLoading: roomLoading, fetchRooms } = useRooms();
  const { bookings, isLoading: bookingsLoading, fetchBookings } = useBookings();

  const [selectedRoomType, setSelectedRoomType] = React.useState<string>("");
  const [delayed, setDelayed] = React.useState(false);

  React.useEffect(() => {
    fetchRoomTypes({});
  }, []);

  React.useEffect(() => {
    if (room_types && room_types.length > 0 && !selectedRoomType) {
      setSelectedRoomType(String(room_types[0].id));
    }
  }, [room_types]);

  React.useEffect(() => {
    if (!selectedRoomType) return;
    setDelayed(false);
    const timer = setTimeout(() => {
      fetchRooms({ roomTypeID: selectedRoomType });
      fetchBookings({ roomTypeID: selectedRoomType });
      setDelayed(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [selectedRoomType]);

  return (
    <div className="p-2 md:p-4 bg-white dark:bg-gray-900 rounded space-y-2">
      <h1 className="text-2xl font-bold">Front Desk Calendar</h1>

      {!roomTypeLoading && room_types?.length ? (
        <Tabs
          className="overflow-x-auto"
          aria-label="Room Types"
          selectedKey={selectedRoomType}
          onSelectionChange={(key) => setSelectedRoomType(String(key))}
          variant="underlined"
          color="primary"
          items={room_types}
        >
          {(item) => (
            <Tab
              key={item.id}
              title={
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {item.name}
                </span>
              }
            >
              {delayed && !roomLoading && !bookingsLoading ? (
                <CalendarView rooms={rooms} bookings={bookings} />
              ) : (
                <div className="p-4">
                  <Card className="w-full shadow-none" radius="none">
                    <Skeleton className="rounded-sm">
                      <div className="h-24 w-full rounded-lg bg-default-300" />
                    </Skeleton>
                  </Card>
                </div>
              )}
            </Tab>
          )}
        </Tabs>
      ) : (
        <div className="text-center p-4 text-gray-500">
          Loading room types...
        </div>
      )}
    </div>
  );
}
