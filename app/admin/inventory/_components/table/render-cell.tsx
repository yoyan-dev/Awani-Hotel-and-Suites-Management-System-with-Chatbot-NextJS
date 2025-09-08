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
import type { Inventory } from "@/types/inventory";
import { statusColorMap } from "./constants";
import { EllipsisVertical } from "lucide-react";
import UpdateModal from "../modals/edit-modal";
import DeleteModal from "../modals/delete-modal";

interface RenderCellProps {
  inventory: Inventory;
  columnKey: string;
}

export const RenderCell: React.FC<RenderCellProps> = ({
  inventory,
  columnKey,
}) => {
  const cellValue = inventory[columnKey as keyof Inventory];

  switch (columnKey) {
    case "status":
      return (
        <Chip
          className="capitalize border-none gap-1 text-default-600"
          color={
            statusColorMap[inventory.status as keyof typeof statusColorMap] ||
            "default"
          }
          size="sm"
          variant="dot"
        >
          {inventory.status}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown
            closeOnSelect={false}
            className="bg-background border-1 border-default-200 z-10"
          >
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm" variant="light">
                <EllipsisVertical className="text-default-400" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="view">View</DropdownItem>
              <DropdownItem key="edit">
                <UpdateModal inventory={inventory} />
              </DropdownItem>
              <DropdownItem key="delete">
                <DeleteModal inventory={inventory} />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      return cellValue;
  }
};
