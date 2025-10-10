"use client";
import Header from "./_components/header";
import TaskTable from "./_components/table/guest-table";
import React from "react";
import {
  columns,
  INITIAL_HOUSEKEEPING_VISIBLE_COLUMNS,
} from "@/app/constants/booking";
import { Tab, Tabs } from "@heroui/react";
import { useBookings } from "@/hooks/use-bookings";
import { FetchBookingParams } from "@/types/booking";

export default function Housekeeping() {
  const { bookings, pagination, isLoading, error, fetchBookings } =
    useBookings();

  const [query, setQuery] = React.useState<FetchBookingParams>({
    status: "check-in",
  });
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(INITIAL_HOUSEKEEPING_VISIBLE_COLUMNS)
  );

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  React.useEffect(() => {
    fetchBookings(query);
  }, [query]);

  return (
    <div className="p-2 rounded space-y-2">
      <Header />

      <Tabs
        aria-label="Options"
        selectedKey={query.status}
        onSelectionChange={(key) => setQuery({ ...query, status: String(key) })}
        variant="underlined"
        color="primary"
      >
        <Tab
          key="check-in"
          title={
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Arrival
            </span>
          }
        >
          <div className="bg-white dark:bg-gray-900 p-4 rounded">
            <TaskTable
              bookings={bookings}
              pagination={pagination}
              query={query}
              setQuery={setQuery}
              selectedKeys={selectedKeys}
              setSelectedKeys={setSelectedKeys}
              visibleColumns={visibleColumns}
              setVisibleColumns={setVisibleColumns}
              headerColumns={headerColumns}
              isLoading={isLoading}
            />
          </div>
        </Tab>

        <Tab
          key="check-out"
          title={
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Departure
            </span>
          }
        >
          <div className="bg-white dark:bg-gray-900 p-4 rounded">
            <TaskTable
              bookings={bookings}
              pagination={pagination}
              query={query}
              setQuery={setQuery}
              selectedKeys={selectedKeys}
              setSelectedKeys={setSelectedKeys}
              visibleColumns={visibleColumns}
              setVisibleColumns={setVisibleColumns}
              headerColumns={headerColumns}
              isLoading={isLoading}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
