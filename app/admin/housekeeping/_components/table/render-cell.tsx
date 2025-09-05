import React from "react";
import {
  User,
  Chip,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@heroui/react";
import { Housekeeping } from "@/types/housekeeping";
import { levelColorMap, priorityLevel, statusColorMap } from "./constants";
import { EllipsisVertical, Link } from "lucide-react";

export const RenderCell = (housekeeping: Housekeeping, columnKey: string) => {
  const cellValue = housekeeping[columnKey as keyof Housekeeping];

  switch (columnKey) {
    case "assigned_to":
      return (
        <User
          avatarProps={{ radius: "full", size: "sm", src: "" }}
          classNames={{ description: "text-default-500" }}
          name={housekeeping.users.full_name}
        />
      );
    case "attachment":
      return (
        <div className="text-gray-500">
          <Link size={10} />
        </div>
      );
    case "priority":
      return (
        <Chip
          className="capitalize border-none gap-1"
          color={levelColorMap[housekeeping.priority]}
          size="sm"
          variant="flat"
        >
          {housekeeping.priority}
        </Chip>
      );
    case "category":
      return (
        <Chip className="capitalize border-none gap-1" size="sm" variant="flat">
          {housekeeping.category}
        </Chip>
      );
    case "status":
      return (
        <Chip
          className="capitalize border-none gap-1 text-default-600"
          color={statusColorMap[housekeeping.status]}
          size="sm"
          variant="dot"
        >
          {housekeeping.status}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown className="bg-background border-1 border-default-200">
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm" variant="light">
                <EllipsisVertical className="text-default-400" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="view">View</DropdownItem>
              <DropdownItem key="edit">Edit</DropdownItem>
              <DropdownItem key="delete">Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      return cellValue;
  }
};
