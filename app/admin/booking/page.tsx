"use client";
import Header from "./_components/header";
import React from "react";
import { Tab, Tabs } from "@heroui/react";
import Overview from "./overview/page";
import Calendar from "./calendar/page";
import BookingList from "./booking-list/page";

export default function Room() {
  return (
    <div>
      <Header />
      <div>
        <Tabs aria-label="Tabs variants" variant="underlined" color="primary">
          <Tab
            key="overview"
            title={
              <span className="text-gray-800 dark:text-gray-100 font-medium">
                Overview
              </span>
            }
          >
            <Overview />
          </Tab>
          <Tab
            key="calendar"
            title={
              <span className="text-gray-800 dark:text-gray-100 font-medium">
                Calendar
              </span>
            }
          >
            <Calendar />
          </Tab>
          <Tab
            key="bookings"
            title={
              <span className="text-gray-800 dark:text-gray-100 font-medium">
                Booking List
              </span>
            }
          >
            <BookingList />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
