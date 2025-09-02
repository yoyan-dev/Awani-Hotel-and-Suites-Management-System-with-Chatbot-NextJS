import React from "react";
import { User, Chip, Button, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from "@heroui/react";
import { UserType } from "./types";
import { statusColorMap } from "./constants";
import { EllipsisVertical } from 'lucide-react';

export const RenderCell = (user: UserType, columnKey: string) => {
  const cellValue = user[columnKey as keyof UserType];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
          classNames={{ description: "text-default-500" }}
          description={user.email}
          name={user.name}
        />
      );
    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{user.role}</p>
          <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p>
        </div>
      );
    case "status":
      return (
        <Chip
          className="capitalize border-none gap-1 text-default-600"
          color={statusColorMap[user.status]}
          size="sm"
          variant="dot"
        >
          {user.status}
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
