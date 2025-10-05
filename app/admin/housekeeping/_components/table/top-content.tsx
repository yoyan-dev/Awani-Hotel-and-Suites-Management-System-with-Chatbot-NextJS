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
import { columns, statusOptions } from "./constants";
import { capitalize } from "@/app/utils/capitalize";
import AddModal from "../modals/add-modal";
import { FetchHousekeepingParams } from "@/types/housekeeping";

interface Props {
  query: FetchHousekeepingParams;
  setQuery: React.Dispatch<React.SetStateAction<FetchHousekeepingParams>>;
  visibleColumns: any;
  setVisibleColumns: (val: any) => void;
  tasksCount: any;
  selectedKeys: Set<number> | "all";
}

export const TableTopContent: React.FC<Props> = ({
  query,
  setQuery,
  visibleColumns,
  setVisibleColumns,
  tasksCount,
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
          value={query.query}
          variant="bordered"
          onClear={() => setQuery({ ...query, query: "" })}
          onValueChange={(value) => setQuery({ ...query, query: value })}
        />
        <div className="flex gap-3">
          <AddModal />
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
              selectionMode="single"
              selectedKeys={query.status || "all"}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-600 text-small">
          Total {tasksCount} housekeeping tasks
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page: 10
        </label>
      </div>
    </div>
  );
};
