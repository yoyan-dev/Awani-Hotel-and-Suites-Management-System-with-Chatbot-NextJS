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
    <div className="p-2 bg-white dark:bg-gray-900 rounded space-y-2">
      <Header />
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
  );
}
