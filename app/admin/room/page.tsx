"use client";
import Header from "./_components/header";
import React from "react";
import { Tab, Tabs } from "@heroui/react";
import RoomList from "./room-list/page";
import RoomTypes from "./room-types/page";

export default function Rooms() {
  const [selected, setSelected] = React.useState("rooms");
  return (
    <div>
      <Header />
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key.toString())}
        variant="underlined"
        color="primary"
      >
        <Tab key="rooms" title="Rooms">
          <RoomList />
        </Tab>
        <Tab key="room-types" title="Room Types">
          <RoomTypes />
        </Tab>
      </Tabs>
    </div>
  );
}
