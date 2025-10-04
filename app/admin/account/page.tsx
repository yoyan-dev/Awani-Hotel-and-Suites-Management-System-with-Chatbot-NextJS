"use client";
import { useStaff } from "@/hooks/use-staff";
import Header from "./_components/header";
import UserTable from "./_components/table/user-table";
import React from "react";
import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
} from "./_components/table/constants";

export default function Staff() {
  const { lists, isLoading, error, fetchAllStaff } = useStaff();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rolesStatusFilter, setRolesStatusFilter] = React.useState<any>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(lists.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredStaff = [...lists];

    if (hasSearchFilter) {
      filteredStaff = filteredStaff.filter((staff) =>
        staff.full_name?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (rolesStatusFilter !== "all" && Array.from(rolesStatusFilter).length) {
      filteredStaff = filteredStaff.filter((item) =>
        Array.from(rolesStatusFilter).includes(item.role)
      );
    }

    return filteredStaff;
  }, [lists, filterValue, rolesStatusFilter, hasSearchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  React.useEffect(() => {
    fetchAllStaff;
  }, [error]);
  return (
    <div className="p-2 bg-white dark:bg-gray-900 rounded space-y-2">
      <Header />
      <UserTable
        items={items}
        lists={lists}
        headerColumns={headerColumns}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        onRowsPerPageChange={onRowsPerPageChange}
        hasSearchFilter={hasSearchFilter}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        rolesStatusFilter={rolesStatusFilter}
        setRolesStatusFilter={setRolesStatusFilter}
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
