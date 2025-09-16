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
import { columns, INITIAL_VISIBLE_COLUMNS } from "./constants";
import { RenderCell } from "./render-cell";
import { TableTopContent } from "./top-content";
import { TableBottomContent } from "./bottom-content";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { fetchRoomTypes } from "@/features/room-types/room-types-thunk";

export default function RoomTypesTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { room_types, isLoading, error } = useSelector(
    (state: RootState) => state.room_type
  );

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(fetchRoomTypes());
    console.log(error);
  }, [dispatch, error]);

  const pages = Math.ceil(room_types.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredRoomTypes = [...room_types];

    if (hasSearchFilter) {
      filteredRoomTypes = filteredRoomTypes.filter((item) =>
        item.name?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredRoomTypes;
  }, [room_types, filterValue, hasSearchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  return (
    <Table
      isHeaderSticky
      classNames={{ wrapper: ["shadow-none", "dark:bg-gray-900", "p-0"] }}
      aria-label="Rooms Table"
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
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      topContent={
        <TableTopContent
          filterValue={filterValue}
          onSearchChange={setFilterValue}
          setFilterValue={setFilterValue}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          onRowsPerPageChange={onRowsPerPageChange}
          itemsCount={room_types.length}
          selectedKeys={selectedKeys}
        />
      }
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
        emptyContent="No room types found"
        items={items}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="capitalize">
                <RenderCell room_type={item} columnKey={columnKey as string} />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
