import { useHousekeeping } from "@/hooks/use-housekeeping";
import { HousekeepingTask } from "@/types/housekeeping";
import { Button, Tooltip } from "@heroui/react";
import { CircleX } from "lucide-react";
import React from "react";

export default function MarkCancelled({ id }: { id: string }) {
  const { isLoading, updateHousekeepingTask } = useHousekeeping();
  return (
    <Tooltip content="mark cancelled">
      <Button
        variant="flat"
        color="danger"
        isIconOnly
        isLoading={isLoading}
        size="sm"
        onPress={() =>
          updateHousekeepingTask({
            id: id,
            status: "cancelled",
          } as HousekeepingTask)
        }
      >
        <CircleX size={15} />
      </Button>
    </Tooltip>
  );
}
