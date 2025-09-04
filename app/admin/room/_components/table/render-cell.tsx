import {
  Image,
  Chip,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Select,
  SelectItem,
} from "@heroui/react";
import type { Room } from "@/types/room";
import { statusColorMap } from "./constants";
import { EllipsisVertical } from "lucide-react";
import ViewModal from "../modals/view-modal";
import UpdateModal from "../modals/edit-modal";
import DeleteModal from "../modals/delete-modal";
import { formatPHP } from "@/lib/format-php";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { updateRoom } from "@/features/room/room-thunk";

interface RenderCellProps {
  room: Room;
  columnKey: string;
}

export const RenderCell: React.FC<RenderCellProps> = ({ room, columnKey }) => {
  const cellValue = room[columnKey as keyof Room];
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.room);

  function handleStatusChange(e: any) {
    dispatch(updateRoom({ ...room, status: e.target.value }));
  }

  switch (columnKey) {
    case "image":
      return (
        <Image
          alt="HeroUI hero Image"
          src={room.image || "https://via.placeholder.com/100"}
          width={100}
        />
      );
    case "base_price":
      return formatPHP(room.base_price || 0);
    case "status":
      return (
        <div>
          <Select
            isLoading={isLoading}
            size="sm"
            defaultSelectedKeys={[room.status || ""]}
            value={room.status}
            onChange={handleStatusChange}
            color={
              statusColorMap[room.status as keyof typeof statusColorMap] ||
              "default"
            }
          >
            <SelectItem key="available">Available</SelectItem>
            <SelectItem key="cleaning">Cleaning</SelectItem>
            <SelectItem key="reserved">Reserved</SelectItem>
            <SelectItem key="occupied">Occupied</SelectItem>
            <SelectItem key="maintenance">Maintenance</SelectItem>
          </Select>
          {/* <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={
              statusColorMap[room.status as keyof typeof statusColorMap] ||
              "default"
            }
            size="sm"
            variant="dot"
          >
            {room.status}
          </Chip> */}
        </div>
      );
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown
            className="bg-background border-1 border-default-200"
            closeOnSelect={false}
          >
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm" variant="light">
                <EllipsisVertical className="text-default-400" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="view">
                <ViewModal room={room} />
              </DropdownItem>
              <DropdownItem key="edit" color="success" className="text-success">
                <UpdateModal room={room} />
              </DropdownItem>
              <DropdownItem key="delete" color="danger" className="text-danger">
                <DeleteModal room={room} />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      return cellValue;
  }
};
