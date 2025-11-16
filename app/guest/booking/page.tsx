"use client";
import React from "react";
import Header from "./_components/header";
import { Button } from "@heroui/button";
import CustomRequestModal from "./_components/modals/custom-request-modal";

export default function Booking() {
  const [isHousekeepingRequest, setIsHousekeepingRequest] =
    React.useState(false);
  return (
    <div className="m-0 md:m-4 p-4 bg-white dark:bg-gray-800 space-y-4 h-screen">
      <Header />
      <div className="flex gap-4">
        <Button>Extend Stay</Button>
        <Button onPress={() => setIsHousekeepingRequest(true)}>
          {isHousekeepingRequest ? "Request Sent" : "Request Housekeeping"}
        </Button>
        <CustomRequestModal />
      </div>
    </div>
  );
}
