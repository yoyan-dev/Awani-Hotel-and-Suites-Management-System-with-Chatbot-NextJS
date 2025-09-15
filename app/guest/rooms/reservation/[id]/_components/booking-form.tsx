import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import React, { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
  };

  return (
    <Card className="w-full max-w-md p-4">
      <CardHeader className="text-xl font-semibold text-center">
        Hotel Reservation
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            isRequired
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <Input
            isRequired
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <Input
            isRequired
            type="date"
            label="Check-in Date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
          />

          <Input
            isRequired
            type="date"
            label="Check-out Date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
          />

          <Input
            isRequired
            label="Number of Guests"
            type="number"
            min={1}
            name="guests"
            onChange={handleChange}
          />

          <Select
            isRequired
            label="Room Type"
            name="roomType"
            onChange={(e) =>
              setFormData({ ...formData, roomType: e.target.value })
            }
          >
            <SelectItem key="single">Single Room</SelectItem>
            <SelectItem key="double">Double Room</SelectItem>
            <SelectItem key="suite">Suite</SelectItem>
          </Select>

          <Button type="submit" color="primary" className="w-full">
            Book Now
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
