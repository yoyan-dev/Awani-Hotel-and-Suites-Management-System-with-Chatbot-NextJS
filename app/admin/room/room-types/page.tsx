"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import Header from "./_components/header";
import RoomTypesTable from "./_components/table/room-types-table";
import { Bed, Edit, House } from "lucide-react";

export default function Room() {
  return (
    <>
      <div className="p-2">
        <Breadcrumbs
          itemClasses={{
            item: ["data-[current=true]:text-primary transition-colors"],
          }}
        >
          <BreadcrumbItem startContent={<House size={14} />} href="/admin/room">
            Rooms
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<Bed size={14} />}>
            Room Types
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="p-2 bg-white dark:bg-gray-900 rounded space-y-2">
        <Header />
        <RoomTypesTable />
      </div>
    </>
  );
}
