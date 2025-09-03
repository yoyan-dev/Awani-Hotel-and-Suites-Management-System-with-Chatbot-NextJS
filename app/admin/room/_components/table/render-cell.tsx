import React from "react";
import { Image, Chip, Button, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from "@heroui/react";
import type { Room } from "@/types/room";
import { statusColorMap } from "./constants";
import { EllipsisVertical } from 'lucide-react';
import UpdateModal from "../modals/edit-modal";
import DeleteModal from "../modals/delete-modal";

export const RenderCell = (room: Room, columnKey: string) => {
  const cellValue = room[columnKey as keyof Room];

  switch (columnKey) {
    case "image":
      return (
        <Image
          alt="HeroUI hero Image"
          src={room.image || "https://via.placeholder.com/100"}
          width={100}
        />
      );
    case "status":
      return (
        <Chip
          className="capitalize border-none gap-1 text-default-600"
          color={statusColorMap[room.status as keyof typeof statusColorMap] || "default"}
          size="sm"
          variant="dot"
        >
          {room.status}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown className="bg-background border-1 border-default-200" closeOnSelect={false}>
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm" variant="light">
                <EllipsisVertical className="text-default-400" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="view">View</DropdownItem>
              <DropdownItem key="edit" color="success" className="text-success"><UpdateModal room={room}/></DropdownItem>
              <DropdownItem key="delete" color="danger" className="text-danger"><DeleteModal room={room}/></DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      return cellValue;
  }
};
