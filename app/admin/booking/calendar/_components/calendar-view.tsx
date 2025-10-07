"use client";

import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import React from "react";
import { Room } from "@/types/room";
import { Booking } from "@/types/booking";
import { getNights } from "@/utils/pricing";

export function CalendarView({
  rooms,
  bookings,
}: {
  rooms: Room[];
  bookings: Booking[];
}) {
  const [events, setEvents] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!bookings) return;
    const mapped = bookings.map((b) => ({
      id: b.id,
      resourceId: b.room_id,
      title:
        `${b.user?.full_name} ⚫ ${getNights(b.check_in, b.check_out)}` ||
        "Unknown Guest",
      start: b.check_in,
      end: b.check_out,
      color:
        b.status === "check-in"
          ? "#60a5fa"
          : b.status === "reserved"
            ? "#a78bfa"
            : "#f87171",
    }));
    setEvents(mapped);
  }, [bookings]);

  const resources = React.useMemo(() => {
    if (!rooms) return [];
    return rooms.map((room) => ({
      id: room.id,
      title: room.room_number,
    }));
  }, [rooms]);

  const handleEventDrop = (info: any) => {
    const event = info.event;
    const updated = {
      id: event.id,
      resourceId: event.getResources()[0]?.id,
      start: event.startStr,
      end: event.endStr,
    };

    setEvents((prev) =>
      prev.map((ev) => (ev.id === updated.id ? { ...ev, ...updated } : ev))
    );
  };

  const handleDateSelect = (info: any) => {
    alert(
      `Add booking from ${info.startStr} to ${info.endStr} for ${info.resource?.title}`
    );
  };

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[resourceTimelinePlugin, interactionPlugin, dayGridPlugin]}
        initialView="resourceTimelineWeek"
        editable={true}
        selectable={true}
        eventResourceEditable={true}
        resourceAreaHeaderContent="Rooms"
        resources={resources}
        events={events}
        eventDrop={handleEventDrop}
        select={handleDateSelect}
        height="auto"
        slotMinWidth={100}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "resourceTimelineDay,resourceTimelineWeek,dayGridMonth",
        }}
        views={{
          resourceTimelineMonth: {
            type: "resourceTimeline",
            duration: { days: 30 },
            buttonText: "Timeline Month",
          },
        }}
        eventContent={(arg) => (
          <div className="p-1 text-xs font-medium truncate">
            {arg.event.title}
          </div>
        )}
      />
    </div>
  );
}
