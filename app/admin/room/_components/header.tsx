import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import React from "react";

export default function Header() {
  return (
    <div className="rounded mb-4 ">
      <div className="flex items-start justify-between ">
        <h1 className="text-2xl font-bold">Rooms</h1>
        <Button
          showAnchorIcon
          as={Link}
          color="primary"
          size="sm"
          href="/admin/room/room-types"
          variant="solid"
        >
          Manage Room Types
        </Button>
      </div>
      <div>
        <p className="text-gray-600">Manage your rooms and their statuses</p>
      </div>
    </div>
  );
}
