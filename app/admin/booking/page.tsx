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
          <Tab key="overview" title="Overview">
            <Overview />
          </Tab>
          <Tab key="calendar" title="Calendar">
            <Calendar />
          </Tab>
          <Tab key="bookings" title="Booking List">
            <BookingList />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
