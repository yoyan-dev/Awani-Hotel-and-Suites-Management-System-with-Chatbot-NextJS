import { useHousekeeping } from "@/hooks/use-housekeeping";
import { HousekeepingTask } from "@/types/housekeeping";
import { Button, Tooltip } from "@heroui/react";
import { CircleCheckBig } from "lucide-react";
import React from "react";

export default function MarkDone({ id }: { id: string }) {
  const { isLoading, updateHousekeepingTask } = useHousekeeping();

  return (
    <Tooltip content="mark done">
      <Button
        variant="bordered"
        isIconOnly
        color="success"
        isLoading={isLoading}
        size="sm"
        onPress={() =>
          updateHousekeepingTask({ id: id, status: "done" } as HousekeepingTask)
        }
      >
        <CircleCheckBig size={15} />
      </Button>
    </Tooltip>
  );
}
