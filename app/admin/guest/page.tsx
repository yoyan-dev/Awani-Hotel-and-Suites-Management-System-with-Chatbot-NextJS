"use client";
import Header from "./_components/header";
import GuestTable from "./_components/table/guest-table";

export default function Room() {
  return (
    <div className="p-2 bg-white dark:bg-gray-900 rounded space-y-2">
      <Header />
      <GuestTable />
    </div>
  );
}
