"use client";
import { BookingCard } from "./booking-card";

const rooms = [
  {
    type: "Presidential Suite",
    rooms: [
      { number: 202, status: "Available" },
      { number: 203, status: "Occupied" },
      { number: 204, status: "Cleaning" },
    ],
  },
  {
    type: "Deluxe Room",
    rooms: [
      { number: 301, status: "Booked" },
      { number: 302, status: "Available" },
    ],
  },
];

export function CalendarGrid({ dateRange }: any) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(dateRange.start);
    d.setDate(d.getDate() + i);
    return d.toLocaleDateString("en-US", { day: "numeric", weekday: "short" });
  });

  return (
    <div className="overflow-x-auto border rounded-2xl">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr>
            <th className="sticky left-0 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-left">
              Room Type / Room No.
            </th>
            {days.map((day) => (
              <th key={day} className="px-4 py-2 text-center border-l">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rooms.map((group) => (
            <>
              <tr className="bg-slate-100 dark:bg-slate-700 font-semibold">
                <td colSpan={days.length + 1} className="px-4 py-2">
                  {group.type}
                </td>
              </tr>
              {group.rooms.map((r) => (
                <tr key={r.number}>
                  <td className="px-4 py-2 font-medium border-r">
                    {r.number} • {r.status}
                  </td>
                  {days.map((_, i) => (
                    <td key={i} className="relative border-t border-l h-20">
                      <BookingCard room={r} dayIndex={i} />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
