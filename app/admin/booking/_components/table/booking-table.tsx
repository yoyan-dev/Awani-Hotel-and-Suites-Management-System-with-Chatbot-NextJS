import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Selection,
} from "@heroui/react";
import { RenderCell } from "./render-cell";
import { TableTopContent } from "./top-content";
import { TableBottomContent } from "./bottom-content";
import { Booking } from "@/types/booking";
import { ColumnType } from "@/types/column";

interface BookingTableProps {
  items: Booking[];
  bookings: Booking[];

  headerColumns: ColumnType[];
  hasSearchFilter: boolean;

  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pages: number;

  selectedKeys: Selection;
  setSelectedKeys: React.Dispatch<React.SetStateAction<Selection>>;

  bookingLoading: boolean;
  handleSubmit: (payload: Booking) => void;
}

export default function BookingTable({
  items,
  bookings,
  headerColumns,
  hasSearchFilter,
  page,
  setPage,
  pages,
  selectedKeys,
  setSelectedKeys,
  bookingLoading,
  handleSubmit,
}: BookingTableProps) {
  return (
    <Table
      className="mt-4"
      isHeaderSticky
      classNames={{
        wrapper: ["shadow-none", "dark:bg-gray-900", "p-0", "table-auto"],
      }}
      aria-label="Rooms Table"
      rowHeight={40}
      bottomContent={
        <TableBottomContent
          hasSearchFilter={hasSearchFilter}
          page={page}
          setPage={setPage}
          pages={pages}
          selectedKeys={selectedKeys}
          itemsLength={items.length}
        />
      }
      bottomContentPlacement="outside"
      topContent={<TableTopContent bookingsCount={bookings.length} />}
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
        isLoading={bookingLoading}
        loadingContent={<Spinner label="Loading..." />}
        emptyContent="No bookings found"
        items={items}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="capitalize">
                <RenderCell
                  booking={item}
                  columnKey={columnKey as string}
                  onAssign={handleSubmit}
                  bookingLoading={bookingLoading}
                />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
