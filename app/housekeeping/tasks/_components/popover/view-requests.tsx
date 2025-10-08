import { formatPHP } from "@/lib/format-php";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Chip,
} from "@heroui/react";

interface RequestProps {
  requests: string;
}

export default function ViewRequests({ requests }: RequestProps) {
  return (
    <Popover showArrow offset={10} placement="bottom">
      <PopoverTrigger>
        <Button color="primary" variant="flat" size="sm">
          View requests
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Guest requests
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">{requests}</div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
