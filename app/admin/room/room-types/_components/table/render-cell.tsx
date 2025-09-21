import React from "react";
import {
  User,
  Chip,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Image,
} from "@heroui/react";
import type { Inventory } from "@/types/inventory";
import { EllipsisVertical } from "lucide-react";
import UpdateModal from "../modals/edit-modal";
import DeleteModal from "../modals/delete-modal";
import { RoomType } from "@/types/room";
import { formatPHP } from "@/lib/format-php";
import ViewAddOns from "../popover/view-add-ons";
import ViewModal from "../modals/view-modal";

interface RenderCellProps {
  room_type: RoomType;
  columnKey: string;
}

export const RenderCell: React.FC<RenderCellProps> = ({
  room_type,
  columnKey,
}) => {
  const cellValue = room_type[columnKey as keyof RoomType];

  switch (columnKey) {
    case "image":
      return <Image src={room_type.image} width={200} />;
    case "add_ons":
      return room_type.add_ons && room_type.add_ons.length > 0 ? (
        <ViewAddOns addOns={room_type.add_ons ?? []} />
      ) : (
        "no add ons"
      );
    case "price":
      return formatPHP(Number(room_type.price));
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
              <DropdownItem key="view">
                <ViewModal room={room_type} />
              </DropdownItem>
              <DropdownItem key="edit">
                <UpdateModal room_type={room_type} />
              </DropdownItem>
              <DropdownItem key="delete">
                <DeleteModal room_type={room_type} />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      return cellValue;
  }
};
