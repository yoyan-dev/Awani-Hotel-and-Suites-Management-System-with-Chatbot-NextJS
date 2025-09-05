import React from "react";
import {
  User as UserUi,
  Chip,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@heroui/react";
import { User } from "@/types/users";
import { statusColorMap } from "./constants";
import { EllipsisVertical } from "lucide-react";

export const RenderCell = (user: User, columnKey: string) => {
  const cellValue = user[columnKey as keyof User];

  switch (columnKey) {
    case "name":
      return (
        <UserUi
          avatarProps={{ radius: "full", size: "sm", src: "" }}
          classNames={{ description: "text-default-500" }}
          description={user.email}
          name={user.full_name}
        />
      );
    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{user.role}</p>
          <p className="text-bold text-tiny capitalize text-default-500">
            {user.role}
          </p>
        </div>
      );
    case "status":
      return (
        <Chip
          className="capitalize border-none gap-1 text-default-600"
          color={statusColorMap["default"]}
          size="sm"
          variant="flat"
        >
          active
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
