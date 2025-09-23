import React from "react";
import { Pagination } from "@heroui/react";

interface Props {
  page: number;
  setPage: (val: number) => void;
  pages: number;
  selectedKeys: any;
  roomsCount: any;
}

export const TableBottomContent: React.FC<Props> = ({
  page,
  setPage,
  pages,
  selectedKeys,
  roomsCount,
}) => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        showControls
        color="primary"
        page={page}
        total={pages}
        variant="light"
        onChange={setPage}
      />
      <span className="text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${roomsCount} selected`}
      </span>
    </div>
  );
};
