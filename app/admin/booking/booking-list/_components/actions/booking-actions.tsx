import { Booking } from "@/types/booking";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import {
  Eye,
  Pencil,
  Bed,
  RotateCcw,
  FileText,
  BrushCleaning,
  MessageSquare,
  EllipsisVertical,
} from "lucide-react";
import CheckOutButton from "./mark-check-out";
import CheckInButton from "./mark-check-in";
import MarkCancelled from "./mark-cancelled";
import React from "react";
import ExtendModal from "../../../_components/modals/extend-modal";

export default function BookingActionsDropdown({
  booking,
}: {
  booking: Booking;
}) {
  const [extendOpen, setExtendOpen] = React.useState(false);
  return (
    <>
      <ExtendModal
        booking={booking}
        isOpen={extendOpen}
        onClose={() => setExtendOpen(false)}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant="light" size="sm">
            <EllipsisVertical className="w-5 h-5 text-gray-600" />
          </Button>
        </DropdownTrigger>

        <DropdownMenu aria-label="Booking Actions" variant="faded">
          <DropdownItem
            key="view"
            startContent={<Eye className="w-4 h-4" />}
            href={`booking/${booking.id}`}
            color="primary"
          >
            View Details
          </DropdownItem>
          <DropdownItem
            key="edit"
            startContent={<Pencil className="w-4 h-4" />}
          >
            Edit Booking
          </DropdownItem>

          <DropdownItem
            key="message"
            startContent={<MessageSquare className="w-4 h-4 text-gray-600" />}
          >
            View Messages
          </DropdownItem>

          <DropdownItem isReadOnly key="div">
            <div className="border-t border-gray-200 my-1"></div>
          </DropdownItem>

          <DropdownItem
            key="assign"
            href={`booking/assign-room/${booking.id}`}
            startContent={<Bed className="w-4 h-4" />}
          >
            Assign Room
          </DropdownItem>
          {!["check-in", "pending"].includes(booking.status) ? (
            <DropdownItem key="checkin">
              <CheckInButton booking={booking} />
            </DropdownItem>
          ) : null}

          {booking.status === "check-in" ? (
            <DropdownItem key="checkout">
              <CheckOutButton booking={booking} />
            </DropdownItem>
          ) : null}
          <DropdownItem
            key="extend"
            startContent={<RotateCcw className="w-4 h-4 text-orange-500" />}
            onClick={() => setExtendOpen(true)}
          >
            Extend Stay
          </DropdownItem>

          <DropdownItem isReadOnly key="div2">
            <div className="border-t border-gray-200 my-1"></div>
          </DropdownItem>

          <DropdownItem
            key="invoice"
            startContent={<FileText className="w-4 h-4 text-gray-700" />}
          >
            Download Invoice
          </DropdownItem>
          <DropdownItem
            key="clean"
            startContent={<BrushCleaning className="w-4 h-4 text-purple-600" />}
          >
            Request Cleaning
          </DropdownItem>

          <DropdownItem isReadOnly key="div3">
            <div className="border-t border-gray-200 my-1"></div>
          </DropdownItem>

          <DropdownItem key="cancel" color="danger">
            <MarkCancelled id={booking.id} />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
