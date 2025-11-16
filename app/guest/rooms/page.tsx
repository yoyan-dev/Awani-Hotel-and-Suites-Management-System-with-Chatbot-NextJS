"use client";
import React from "react";
import { RoomsList } from "./_components/room-list";
import Header from "./_components/header";
import { FetchRoomsParams, RoomType } from "@/types/room";
import { useRooms } from "@/hooks/use-rooms";
import { formatDate } from "@/utils/format-date";

export default function Page() {
  // const { room_types, isLoading, error, fetchRoomTypes } = useRoomTypes();
  const today = new Date().toISOString().split("T")[0];
  const { rooms, isLoading, error, fetchRooms } = useRooms();
  const [desiredGuest, setDesiredGuest] = React.useState<string>();
  const [roomQuery, setRoomQuery] = React.useState<FetchRoomsParams>({});

  React.useEffect(() => {
    fetchRooms({ checkIn: today, checkOut: today });
  }, []);

  function checkAvailability() {
    fetchRooms(roomQuery);
  }

  const room_types = React.useMemo(() => {
    const seen = new Set<string>();

    return rooms.reduce((acc, room) => {
      const room_type = room.room_type;
      const id = room.room_type_id;

      if (desiredGuest != null && (room_type.max_guest ?? 0) < desiredGuest)
        return acc;

      if (!seen.has(id || "")) {
        seen.add(id || "");
        acc.push(room_type);
      }
      return acc;
    }, [] as RoomType[]);
  }, [rooms]);

  return (
    <div className="m-0 md:m-4 p-4 bg-white dark:bg-gray-800 space-y-4">
      <Header
        roomQuery={roomQuery}
        setRoomQuery={setRoomQuery}
        desiredGuest={desiredGuest}
        setDesiredGuest={setDesiredGuest}
        checkAvailability={checkAvailability}
      />
      <div>
        <span className="text-sm text-gray-500 dark:text-gray-200">
          Current available rooms as of {formatDate(new Date(today))} -{" "}
          {formatDate(new Date(today))}
        </span>
        <RoomsList rooms={room_types} typesLoading={isLoading} />
      </div>
    </div>
  );
}
