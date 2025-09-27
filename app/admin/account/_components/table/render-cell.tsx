import React from "react";
import {
  User as UserUi,
  Chip,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  MenuItem,
} from "@heroui/react";
import { statusColorMap } from "./constants";
import { EllipsisVertical } from "lucide-react";
import DeleteModal from "../modals/delete-modal";
import EditModal from "../modals/edit-modal";
import { Staff } from "@/types/staff";

interface RenderCellProps {
  item: Staff;
  columnKey: string;
}

const RenderCell: React.FC<RenderCellProps> = ({ item, columnKey }) => {
  const cellValue = item[columnKey as keyof Staff];

  switch (columnKey) {
    case "name":
      return (
        <UserUi
          avatarProps={{ radius: "full", size: "sm", src: "" }}
          classNames={{ description: "text-default-500" }}
          description={item.email}
          name={item.full_name}
        />
      );
    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {item.role || "Guest"}
          </p>
          <p className="text-bold text-tiny capitalize text-default-500">
            {item.role || "Guest"}
          </p>
        </div>
      );
    case "position":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {item.position || "N/A"}
          </p>
          <p className="text-bold text-tiny capitalize text-default-500">
            {item.position || "N/A"}
          </p>
        </div>
      );
    case "phone":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{item.phone}</p>
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
          <Dropdown
            closeOnSelect={false}
            className="bg-background border-1 border-default-200"
          >
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm" variant="light">
                <EllipsisVertical className="text-default-400" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="view">View</DropdownItem>
              {/* <DropdownItem key="edit" color="success">
                <EditModal user={MenuItem} />
              </DropdownItem>
              <DropdownItem key="delete" color="danger">
                <DeleteModal user={item} />
              </DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      // Convert objects to strings for rendering
      if (typeof cellValue === "object" && cellValue !== null) {
        return <pre>{JSON.stringify(cellValue, null, 2)}</pre>;
      }
      return <>{cellValue}</>;
  }
};

export default RenderCell;
