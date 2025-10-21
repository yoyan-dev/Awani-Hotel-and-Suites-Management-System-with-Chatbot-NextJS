import React from "react";
import { Pagination } from "@heroui/react";
import { FetchHousekeepingParams } from "@/types/housekeeping";

interface Props {
  query: FetchHousekeepingParams;
  setQuery: React.Dispatch<React.SetStateAction<FetchHousekeepingParams>>;
  pages: number;
}

export const TableBottomContent: React.FC<Props> = ({
  query,
  setQuery,
  pages,
}) => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        showControls
        color="primary"
        page={query.page}
        total={pages}
        variant="light"
        onChange={(page: number) => setQuery({ ...query, page: page })}
      />
    </div>
  );
};
