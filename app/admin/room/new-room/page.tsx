"use client";
import React, { useState } from "react";
import {
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  Textarea,
  Image,
} from "@heroui/react";
import { Plus, Upload } from "lucide-react";

interface RoomImage {
  file: File;
  preview: string;
}

export default function Page() {
  const [images, setImages] = useState<RoomImage[]>([]);
  const [beds, setBeds] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [bedInput, setBedInput] = useState("");
  const [facilityInput, setFacilityInput] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const newImage = {
        file,
        preview: URL.createObjectURL(file),
      };

      setImages((prev) => [...prev, newImage]);
    }
  }

  const addItem = (
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (input.trim()) {
      setList((prev) => [...prev, input.trim()]);
      setInput("");
    }
  };

  const renderChips = (
    items: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => (
    <div className="flex gap-2 flex-wrap">
      {items.map((item, index) => (
        <Chip
          key={index}
          radius="none"
          variant="bordered"
          className="capitalize"
          color="success"
          onClose={() => setList(items.filter((_, i) => i !== index))}
        >
          {item}
        </Chip>
      ))}
    </div>
  );

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded space-y-2">
      <h1 className="text-2xl semi-bold">New Room</h1>
      <div className="flex gap-8">
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col gap-4">
          <h1>Basic Information</h1>
          <hr className="border border-gray-400" />

          <Input
            className="w-full"
            label="Room Name"
            placeholder="Enter room name"
            name="name"
            variant="bordered"
            radius="none"
            labelPlacement="outside"
          />

          <div className="flex gap-4">
            <Input
              className="w-full"
              label="Room Number"
              placeholder="room number"
              name="room_number"
              type="number"
              variant="bordered"
              radius="none"
              labelPlacement="outside"
            />
            <Input
              className="w-full"
              label="Area"
              placeholder="room area"
              name="area"
              variant="bordered"
              radius="none"
              labelPlacement="outside"
            />
            <Select
              radius="none"
              className="flex-1 w-full"
              name="room_type"
              label="Room type"
              labelPlacement="outside"
              placeholder="Select Room Type"
              variant="bordered"
            >
              <SelectItem key="single">Single</SelectItem>
              <SelectItem key="double">Double</SelectItem>
              <SelectItem key="suite">Suite</SelectItem>
            </Select>
          </div>

          <div className="flex gap-4">
            <Input
              className="w-full"
              label="Max guest"
              placeholder="room max occupancy"
              name="max_guest"
              type="number"
              variant="bordered"
              radius="none"
              labelPlacement="outside"
            />
            <Input
              name="base_price"
              label="Base Price"
              radius="none"
              labelPlacement="outside"
              placeholder="0.00"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              type="number"
              variant="bordered"
            />
          </div>

          <Textarea
            radius="none"
            className="w-full"
            label="Description"
            name="description"
            labelPlacement="outside"
            placeholder="Briefly describe the hotel room..."
            variant="bordered"
          />

          {/* Bed Section */}
          <div className="flex flex-col gap-4">
            <h1>Bed</h1>
            <hr className="border border-gray-400" />
            <div className="flex gap-4">
              <Input
                className="w-full"
                placeholder="Add bed"
                value={bedInput}
                onChange={(e) => setBedInput(e.target.value)}
                variant="bordered"
                radius="none"
                labelPlacement="outside"
              />
              <Button
                radius="none"
                color="primary"
                isIconOnly
                onPress={() => addItem(bedInput, setBedInput, setBeds)}
                aria-label="Add new bed"
              >
                <Plus />
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {renderChips(beds, setBeds)}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col gap-4 ">
          <h1>Room photo</h1>
          <hr className="border border-gray-400" />
          <div className="flex flex-col gap-2 w-full items-start">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition"
            >
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Upload size={32} />
                <span className="text-sm">Click or drag file to upload</span>
              </div>
            </label>

            <input
              id="image-upload"
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Image Preview */}
            <div className="flex gap-2 flex-wrap w-full">
              {images.map((img, index) => (
                <Image
                  key={index}
                  alt="Room Image"
                  src={img.preview}
                  width={200}
                />
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="flex flex-col gap-4">
            <h1>Facilities and services</h1>
            <hr className="border border-gray-400" />
            <div className="flex gap-4">
              <Input
                className="w-full"
                placeholder="Add facilities..."
                value={facilityInput}
                onChange={(e) => setFacilityInput(e.target.value)}
                variant="bordered"
                radius="none"
                labelPlacement="outside"
              />
              <Button
                radius="none"
                color="primary"
                isIconOnly
                onPress={() =>
                  addItem(facilityInput, setFacilityInput, setFacilities)
                }
                aria-label="Add new facility"
              >
                <Plus />
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {renderChips(facilities, setFacilities)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
