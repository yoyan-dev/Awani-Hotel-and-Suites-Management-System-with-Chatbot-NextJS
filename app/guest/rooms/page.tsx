"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchRooms } from "@/features/room/room-thunk";
import { RoomsList } from "./_components/room-list";
import { FetchRoomsParams, RoomPagination } from "@/types/room";
import Header from "./_components/header";

export default function Page() {
  const [query, setQuery] = React.useState<FetchRoomsParams>({});
  const { rooms, pagination, isLoading, error } = useSelector(
    (state: RootState) => state.room
  );
  const dispatch = useDispatch<AppDispatch>();

  function fetchQuery() {
    dispatch(
      fetchRooms({ ...query, page: pagination?.page ? pagination.page : 1 })
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchQuery();
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch, query.roomType]);

  return (
    <div className="m-0 md:m-4 p-4 bg-white dark:bg-gray-800">
      <Header />
      <RoomsList
        rooms={rooms}
        isLoading={isLoading}
        query={query}
        setQuery={setQuery}
        fetchQuery={fetchQuery}
        pagination={pagination as RoomPagination}
      />
    </div>
  );
}
