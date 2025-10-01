"use client";
import { useBookings } from "@/hooks/use-bookings";
import Header from "./_components/header";
import React, { useState } from "react";
import { columns, INITIAL_VISIBLE_COLUMNS } from "./_components/constants";
import { Booking } from "@/types/booking";
import { HousekeepingTask } from "@/types/housekeeping";
import { useHousekeeping } from "@/hooks/use-housekeeping";
import { Tab, Tabs } from "@heroui/react";
import Overview from "./overview/page";
import Calendar from "./calendar/page";
import BookingList from "./booking-list/page";

export default function Room() {
  const {
    bookings,
    isLoading: bookingLoading,
    error: bookingError,
    fetchBookings,
    updateBooking,
  } = useBookings();

  const { addHousekeepingTask } = useHousekeeping();

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
  }, [bookingError]);

  async function handleSubmit(payload: Booking) {
    console.log(payload);
    updateBooking({
      id: payload.id,
      room_id: payload.room_id,
      status: "confirmed",
    } as Booking);

    const specialRequests = (payload.special_requests ?? [])
      .map((req: any) => `${req.quantity} ${req.name}`)
      .join(", ");

    const tasks: Partial<HousekeepingTask> = {
      room_id: payload.room_id,
      guest_name: payload.user.full_name,
      task_type: "room_preparation",
      description:
        specialRequests && specialRequests.trim() !== ""
          ? `Prepare room for new arrival. Double-check the room is clean and ensure the following special requests are ready: ${specialRequests}.`
          : `Prepare room for new arrival. Double-check the room is clean and perform full room preparation with standard amenities.`,
      scheduled_time: new Date().toISOString(),
      arrival_date: payload.check_in,
      status: "pending",
    };
    addHousekeepingTask(tasks as HousekeepingTask);
    console.log(tasks);
  }

  return (
    <div>
      <Header />
      <div>
        <Tabs aria-label="Tabs variants" variant="underlined" color="primary">
          <Tab key="overview" title="Overview">
            <Overview />
          </Tab>
          <Tab key="calendar" title="Calendar">
            <Calendar />
          </Tab>
          <Tab key="bookings" title="Booking List">
            <BookingList
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
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
