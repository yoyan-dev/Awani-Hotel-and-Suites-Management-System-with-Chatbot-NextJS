import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { Bed, Edit } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <div>
      <Breadcrumbs
        itemClasses={{
          item: ["data-[current=true]:text-primary transition-colors"],
        }}
      >
        <BreadcrumbItem startContent={<Bed size={14} />} href="/admin/room">
          Rooms
        </BreadcrumbItem>
        <BreadcrumbItem startContent={<Edit size={14} />}>
          Add New Room
        </BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
}
