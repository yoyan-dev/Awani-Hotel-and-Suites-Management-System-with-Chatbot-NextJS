import React, { useMemo, useState } from "react";
import BookingHeader from "./_components/header";
import KeyPerformanceIndicator from "./_components/key-performance-indicator";
import { ColumnType } from "@/types/column";
import BookingTable from "./_components/table/booking-table";
import { Selection } from "@heroui/react";
import { Booking } from "@/types/booking";
import CenterRow from "./_components/center-row";

function formatPHP(n: number) {
  return n.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  });
}

interface OverviewProps {
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

export default function Overview({
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
}: OverviewProps) {
  //   const filtered = useMemo(() => {
  //     const q = query.trim().toLowerCase();
  //     return data
  //       .filter((b) =>
  //         filterStatus === "All" ? true : b.status === filterStatus
  //       )
  //       .filter(
  //         (b) =>
  //           b.user?.fullname.toLowerCase().includes(q) ||
  //           b.room?.room_type?.name?.toLowerCase().includes(q) ||
  //           b.room_type?.name?.toLowerCase().includes(q)
  //       );
  //   }, [data, query, filterStatus]);

  const stats = useMemo(() => {
    const totalRevenue = bookings.reduce((s, b) => s + Number(b.total), 0);
    const upcoming = bookings.filter(
      (b) => new Date(b.check_in) >= new Date()
    ).length;
    const occupied = bookings.filter((b) => b.status === "check-in").length;
    return { totalRevenue, upcoming, occupied };
  }, [bookings]);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto spcae-y-4">
        <BookingHeader />
        <KeyPerformanceIndicator stats={stats} />
        <CenterRow />

        <BookingTable
          items={items}
          bookings={bookings}
          headerColumns={headerColumns}
          hasSearchFilter={hasSearchFilter}
          page={page}
          setPage={setPage}
          pages={pages}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          bookingLoading={bookingLoading}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
