import React from "react";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Search, ChevronDown } from "lucide-react";
import { columns, bookingStatusOptions } from "@/app/constants/booking";
import { capitalize } from "@/app/utils/capitalize";
import AddModal from "../modals/add-modal/index";

interface Props {
  filterValue: string;
  onSearchChange: (value: string) => void;
  setFilterValue: (val: string) => void;
  statusFilter: any;
  setStatusFilter: (val: any) => void;
  visibleColumns: any;
  setVisibleColumns: (val: any) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  bookingsCount: number;
}

export const TableTopContent: React.FC<Props> = ({
  filterValue,
  onSearchChange,
  setFilterValue,
  statusFilter,
  setStatusFilter,
  visibleColumns,
  setVisibleColumns,
  onRowsPerPageChange,
  bookingsCount,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          placeholder="Search by name..."
          size="sm"
          startContent={<Search className="text-default-300" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDown className="text-small" />}
                size="sm"
                variant="flat"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {bookingStatusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <AddModal />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {bookingsCount} bookings
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page: 10
        </label>
      </div>
    </div>
  );
};
