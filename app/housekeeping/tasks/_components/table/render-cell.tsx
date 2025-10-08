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
import { HousekeepingTask } from "@/types/housekeeping";
import { statusColorMap } from "./constants";
import { EllipsisVertical } from "lucide-react";
import ViewRequests from "../popover/view-requests";
import MarkDone from "../actions/mark-done";
import MarkCancelled from "../actions/mark-cancelled";

export const RenderCell = ({
  task,
  columnKey,
}: {
  task: HousekeepingTask;
  columnKey: string;
}) => {
  const cellValue = task[columnKey as keyof HousekeepingTask];

  switch (columnKey) {
    case "room_number":
      return task.room_number;
    case "requests":
      return task.requests ? (
        <ViewRequests requests={task.requests} />
      ) : (
        "no special requests"
      );
    case "status":
      return (
        <Chip
          className="capitalize border-none gap-1 text-default-600"
          color={statusColorMap[task.status || "default"]}
          size="sm"
          variant="dot"
        >
          {task.status}
        </Chip>
      );
    case "actions":
      return (
        <div className="flex gap-2 items-center justify-end">
          <MarkDone id={task.id} />
          <MarkCancelled id={task.id} />
        </div>
        // <div className="relative flex justify-end items-center gap-2">
        //   <Dropdown className="bg-background border-1 border-default-200">
        //     <DropdownTrigger>
        //       <Button isIconOnly radius="full" size="sm" variant="light">
        //         <EllipsisVertical className="text-default-400" />
        //       </Button>
        //     </DropdownTrigger>
        //     <DropdownMenu>
        //       <DropdownItem key="view">View</DropdownItem>
        //       <DropdownItem key="edit">Edit</DropdownItem>
        //       <DropdownItem key="delete">Delete</DropdownItem>
        //     </DropdownMenu>
        //   </Dropdown>
        // </div>
      );
    default:
      return cellValue;
  }
};
