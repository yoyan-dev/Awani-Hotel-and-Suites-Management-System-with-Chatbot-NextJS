'use client'
import Header from "./_components/header"
import RoomTable from "./_components/table/room-table"

export default function Room() {
  return (
    <div className="p-2 bg-white dark:bg-gray-800 rounded space-y-2">
      <Header />
      <RoomTable />
    </div>
  )
}
