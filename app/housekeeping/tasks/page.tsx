"use client";
import { useHousekeeping } from "@/hooks/use-housekeeping";
import Header from "./_components/header";
import TaskTable from "./_components/table/Tasks-table";
import React from "react";
import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
} from "./_components/table/constants";
import { FetchHousekeepingParams } from "@/types/housekeeping";
import { Tab, Tabs } from "@heroui/react";

export default function Housekeeping() {
  const { tasks, isLoading, pagination, error, fetchHousekeepingTasks } =
    useHousekeeping();

  const [query, setQuery] = React.useState<FetchHousekeepingParams>({});
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  React.useEffect(() => {
    fetchHousekeepingTasks(query);
  }, [query]);

  return (
    <div className="p-2 rounded space-y-2">
      <Header />

      <Tabs aria-label="Tabs variants" variant="underlined" color="primary">
        <Tab
          key="pending"
          title={
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Pending
            </span>
          }
        >
          <div className="bg-white dark:bg-gray-900 p-4 rounded">
            <TaskTable
              tasks={tasks}
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
          key="completed"
          title={
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Completed
            </span>
          }
        >
          <div className="bg-white dark:bg-gray-900 p-4 rounded">
            <TaskTable
              tasks={tasks}
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
          key="cancelled"
          title={
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Cancelled
            </span>
          }
        >
          <div className="bg-white dark:bg-gray-900 p-4 rounded">
            <TaskTable
              tasks={tasks}
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
