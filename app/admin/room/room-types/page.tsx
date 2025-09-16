"use client";
import Header from "./_components/header";
import RoomTypesTable from "./_components/table/room-types-table";

export default function Room() {
  return (
    <div className="p-2 bg-white dark:bg-gray-900 rounded space-y-2">
      <Header />
      <RoomTypesTable />
    </div>
  );
}
