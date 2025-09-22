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
import { bookingStatusColorMap } from "./constants";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  EllipsisVertical,
} from "lucide-react";
import { Booking } from "@/types/booking";
import { formatPHP } from "@/lib/format-php";
import { calculateBookingPrice, getNights } from "@/utils/pricing";

export const RenderCell = (booking: Booking, columnKey: string) => {
  const cellValue = booking[columnKey as keyof Booking];
  const nights = getNights(booking.check_in, booking.check_out);

  switch (columnKey) {
    case "room":
      return booking.room?.room_number || "No yet assigned";
    case "guest_name":
      return booking.user?.full_name || "undefined";
    case "room_type":
      return booking.room_type?.name;
    case "nights":
      return nights;
    case "check_in":
      return (
        <div className="flex gap-2">
          <Chip
            startContent={<CalendarArrowDown size={18} />}
            color="success"
            variant="flat"
          >
            {booking.check_in}
          </Chip>
          -
          <Chip
            startContent={<CalendarArrowUp size={18} />}
            color="warning"
            variant="flat"
          >
            {booking.check_out}
          </Chip>
        </div>
      );
    case "total_price":
      return formatPHP(
        calculateBookingPrice(booking) + Number(booking.total_add_ons || 0)
      );
    case "status":
      return (
        <Chip
          className="capitalize border-none gap-1 text-default-600"
          color={bookingStatusColorMap[booking.status]}
          size="sm"
          variant="dot"
        >
          {booking.status}
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
