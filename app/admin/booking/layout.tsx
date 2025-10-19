"use client";
import { Tab, Tabs } from "@heroui/react";
import Header from "./_components/header";
import { usePathname } from "next/navigation";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div>
      <Header />
      <div>
        <Tabs
          selectedKey={pathname}
          aria-label="Tabs variants"
          variant="underlined"
          color="primary"
        >
          <Tab
            key="/admin/booking"
            href="/admin/booking"
            title={
              <span className="text-gray-800 dark:text-gray-100 font-medium">
                Overview
              </span>
            }
          />
          <Tab
            key="/admin/booking/calendar"
            href="/admin/booking/calendar"
            title={
              <span className="text-gray-800 dark:text-gray-100 font-medium">
                Calendar
              </span>
            }
          />
          <Tab
            key="/admin/booking/booking-list"
            href="/admin/booking/booking-list"
            title={
              <span className="text-gray-800 dark:text-gray-100 font-medium">
                Booking List
              </span>
            }
          />
        </Tabs>
        {children}
      </div>
    </div>
  );
}
