"use client";
import Header from "./_components/header";
import UserTable from "./_components/table/user-table";

export default function Room() {
  return (
    <div className="p-2 bg-white dark:bg-gray-900 rounded space-y-2">
      <Header />
      <UserTable />
    </div>
  );
}
