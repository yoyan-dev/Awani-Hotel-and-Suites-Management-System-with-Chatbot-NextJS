"use client";
import { Button } from "@heroui/button";
import { CalendarDays, Filter } from "lucide-react";
// import { DateRangePicker } from "@/components/ui/date-range-picker";

export function CalendarHeader({ dateRange, onChange }: any) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search for booking no. or Guest Name"
          className="input input-bordered w-full md:w-80"
        />
        <Button variant="bordered">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {/* <DateRangePicker value={dateRange} onChange={onChange} /> */}
        <Button variant="bordered">
          <CalendarDays className="mr-2 h-4 w-4" /> Update Availability
        </Button>
        <Button>Add Reservation</Button>
      </div>
    </div>
  );
}
