"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Select,
  SelectItem,
  Button,
  Divider,
  Image,
  Chip,
} from "@heroui/react";
import {
  Search,
  BedDouble,
  Building2,
  UserRound,
  CalendarDays,
  ArrowRightCircle,
} from "lucide-react";

export default function AssignRoomPage() {
  const [selectedType, setSelectedType] = useState("deluxe");

  const roomTypes = [
    { key: "deluxe", label: "Deluxe Room" },
    { key: "suite", label: "Suite Room" },
    { key: "family", label: "Family Room" },
  ];

  const availableRooms = [
    {
      id: "R101",
      name: "Room 101",
      type: "Deluxe Room",
      area: "East Wing",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1560184897-80a0d3d2a0ba?w=800&q=80",
    },
    {
      id: "R205",
      name: "Room 205",
      type: "Suite Room",
      area: "West Wing",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1559599238-2a0cf19d8058?w=800&q=80",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <BedDouble className="w-6 h-6 text-primary" />
          Assign Room
        </h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <Input
            startContent={<Search className="text-gray-500" />}
            placeholder="Search room..."
            variant="bordered"
            className="w-full sm:w-64"
          />
          <Select
            placeholder="Filter by type"
            selectedKeys={[selectedType]}
            onSelectionChange={(keys) =>
              setSelectedType(Array.from(keys)[0] as string)
            }
            variant="bordered"
            className="w-full sm:w-56"
          >
            {roomTypes.map((type) => (
              <SelectItem key={type.key}>{type.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <Divider className="mb-6" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {availableRooms.map((room) => (
          <Card
            key={room.id}
            isPressable
            className="hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
          >
            <Image
              src={room.image}
              alt={room.name}
              className="rounded-t-xl h-40 object-cover"
            />
            <CardHeader className="flex flex-col items-start gap-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {room.name}
              </h3>
              <p className="text-sm text-gray-500">{room.type}</p>
            </CardHeader>
            <CardBody className="text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-2">
              <p className="flex items-center gap-2">
                <Building2 className="w-4 h-4" /> {room.area}
              </p>
              <p className="flex items-center gap-2">
                <UserRound className="w-4 h-4" /> Max 2 guests
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" /> Ready for check-in
              </p>
              <Chip
                size="sm"
                color="success"
                variant="flat"
                className="w-fit mt-2"
              >
                {room.status}
              </Chip>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                fullWidth
                color="primary"
                startContent={<ArrowRightCircle className="w-4 h-4" />}
              >
                Assign Room
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
