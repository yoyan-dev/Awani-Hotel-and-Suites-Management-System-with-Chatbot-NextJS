"use client";
import { useBookings } from "@/hooks/use-bookings";
import Header from "./_components/header";
import BookingTable from "./_components/table/booking-table";
import React, { useState } from "react";
import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
} from "./_components/table/constants";
import { Booking } from "@/types/booking";
import { HousekeepingTask } from "@/types/housekeeping";
import { useHousekeeping } from "@/hooks/use-housekeeping";
import { ColumnType } from "@/types/column";
import { Selection } from "@heroui/react";

interface BookingListProps {
  items: Booking[];
  bookings: Booking[];

  headerColumns: ColumnType[];
  visibleColumns: Set<string>;
  setVisibleColumns: React.Dispatch<React.SetStateAction<Set<string>>>;

  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  hasSearchFilter: boolean;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: any;
  setStatusFilter: React.Dispatch<React.SetStateAction<any | "all">>;

  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pages: number;

  selectedKeys: Selection;
  setSelectedKeys: React.Dispatch<React.SetStateAction<Selection>>;

  bookingLoading: boolean;
  handleSubmit: (payload: Booking) => void;
}

export default function BookingList({
  items,
  bookings,
  headerColumns,
  visibleColumns,
  setVisibleColumns,
  onRowsPerPageChange,
  hasSearchFilter,
  filterValue,
  setFilterValue,
  statusFilter,
  setStatusFilter,
  page,
  setPage,
  pages,
  selectedKeys,
  setSelectedKeys,
  bookingLoading,
  handleSubmit,
}: BookingListProps) {
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
        bookingLoading={bookingLoading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
