"use client";
import { useBookings } from "@/hooks/use-bookings";
import Header from "./_components/header";
import BookingTable from "./_components/table/booking-table";
import React from "react";
import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
} from "./_components/table/constants";

export default function Room() {
  const { bookings, isLoading, error, fetchBookings } = useBookings();

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<any>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(bookings.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredBookings = [...bookings];

    if (hasSearchFilter) {
      filteredBookings = filteredBookings.filter((item) =>
        item.user.full_name?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length) {
      filteredBookings = filteredBookings.filter((item) =>
        Array.from(statusFilter).includes(item.status)
      );
    }

    return filteredBookings;
  }, [bookings, filterValue, statusFilter, hasSearchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  React.useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-2 md:p-4 bg-white dark:bg-gray-900 rounded space-y-2">
      <Header />
      <BookingTable
        items={items}
        bookings={bookings}
        headerColumns={headerColumns}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        onRowsPerPageChange={onRowsPerPageChange}
        hasSearchFilter={hasSearchFilter}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        page={page}
        setPage={setPage}
        pages={pages}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        isLoading={isLoading}
      />
    </div>
  );
}
