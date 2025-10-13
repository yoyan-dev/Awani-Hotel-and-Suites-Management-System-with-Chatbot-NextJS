"use client";
import { useRooms } from "@/hooks/use-rooms";
import Header from "./_components/header";
import RoomTable from "./_components/table/room-table";
import React, { useEffect, useState } from "react";
import { FetchRoomsParams } from "@/types/room";
import {
  columns,
  HOUSEKEEPING_INITIAL_VISIBLE_COLUMNS,
} from "@/app/constants/rooms";

export default function RoomList() {
  const { rooms, pagination, isLoading, fetchRooms } = useRooms();
  const [query, setQuery] = useState<FetchRoomsParams>({});
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(HOUSEKEEPING_INITIAL_VISIBLE_COLUMNS)
  );

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  useEffect(() => {
    fetchRooms(query);
  }, [query]);

  return (
    <div className="p-2 md:p-4 bg-white dark:bg-gray-900 rounded ">
      <Header />
      <RoomTable
        rooms={rooms}
        pagination={pagination}
        query={query}
        setQuery={setQuery}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        headerColumns={headerColumns}
        isLoading={isLoading}
      />
    </div>
  );
}
