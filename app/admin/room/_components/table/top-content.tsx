import React from "react";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
} from "@heroui/react";
import { Search, ChevronDown, Plus } from "lucide-react";
import { columns, statusOptions } from "./constants";
import { capitalize } from "@/app/utils/capitalize";
import AddModal from "../modals/add-modal";
import DeleteSelectedModal from "../modals/delete-selected-modal";

interface Props {
  filterValue: string;
  onSearchChange: (value: string) => void;
  setFilterValue: (val: string) => void;
  statusFilter: any;
  setStatusFilter: (val: any) => void;
  visibleColumns: any;
  setVisibleColumns: (val: any) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  usersCount: number;
  selectedKeys: Set<number> | "all";
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
  usersCount,
  selectedKeys,
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
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDown className="text-small" />}
                size="sm"
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {/* <AddModal /> */}
          <Button
            size="sm"
            as={Link}
            color="primary"
            href="room/new-room"
            variant="solid"
          >
            Add New <Plus />
          </Button>
          {(selectedKeys instanceof Set && selectedKeys.size > 0) ||
          selectedKeys === "all" ? (
            <DeleteSelectedModal selectedKeys={selectedKeys} />
          ) : null}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {usersCount} rooms
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page: 10
        </label>
      </div>
    </div>
  );
};
