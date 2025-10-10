import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@heroui/react";
import { RenderCell } from "./render-cell";
import { TableBottomContent } from "./bottom-content";
import { ColumnType } from "@/types/column";
import { FetchHousekeepingParams } from "@/types/housekeeping";
import { Booking, BookingPagination } from "@/types/booking";

interface GuestTableProps {
  bookings: Booking[];
  pagination: BookingPagination | null;
  query: FetchHousekeepingParams;
  setQuery: React.Dispatch<React.SetStateAction<FetchHousekeepingParams>>;
  selectedKeys: any;
  setSelectedKeys: React.Dispatch<React.SetStateAction<any>>;
  visibleColumns: any;
  setVisibleColumns: React.Dispatch<React.SetStateAction<any>>;
  headerColumns: ColumnType[];
  isLoading: boolean;
}

export default function TaskTable({
  bookings,
  pagination,
  query,
  setQuery,
  selectedKeys,
  setSelectedKeys,
  visibleColumns,
  setVisibleColumns,
  headerColumns,
  isLoading,
}: GuestTableProps) {
  return (
    <Table
      aria-label="Rooms Table"
      isHeaderSticky
      classNames={{
        wrapper: ["shadow-none", "dark:bg-gray-900", "p-0"],
        th: "bg-primary text-white",
      }}
      radius="none"
      rowHeight={40}
      bottomContent={
        <TableBottomContent
          query={query}
          setQuery={setQuery}
          pages={pagination?.totalPages ?? 0}
          selectedKeys={selectedKeys}
          tasksCount={pagination?.total}
        />
      }
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      // topContent={
      //   <TableTopContent
      //     query={query}
      //     setQuery={setQuery}
      //     visibleColumns={visibleColumns}
      //     setVisibleColumns={setVisibleColumns}
      //     tasksCount={pagination?.total}
      //     selectedKeys={selectedKeys}
      //   />
      // }
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
        emptyContent="No tasks found"
        items={bookings}
        className="overflow-x-auto"
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="capitalize min-w-40">
                <RenderCell booking={item} columnKey={columnKey as string} />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
