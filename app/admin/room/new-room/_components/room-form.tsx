import React from "react";
import {
  Form,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { Room } from "@/types/room";
import BedsInput from "./beds-input";
import FacilitiesInput from "./facilities-input";
import ImagesUpload from "./image-upload";

interface RoomFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  beds: string[];
  setBeds: React.Dispatch<React.SetStateAction<string[]>>;
  facilities: string[];
  setFacilities: React.Dispatch<React.SetStateAction<string[]>>;
  images: any[];
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
  isLoading: boolean;
}

export default function RoomForm({
  onSubmit,
  beds,
  setBeds,
  facilities,
  setFacilities,
  images,
  setImages,
  isLoading,
}: RoomFormProps) {
  return (
    <Form
      onSubmit={onSubmit}
      className="p-4 bg-white dark:bg-gray-900 rounded space-y-2 w-full"
    >
      <h1 className="text-2xl semi-bold">New Room</h1>
      <div className="flex flex-col gap-8 w-full md:flex-row">
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

          <div className="flex flex-col gap-4 md:flex-row">
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

          <div className="flex gap-4 ">
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

          <BedsInput beds={beds} setBeds={setBeds} />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col gap-4">
          <h1>Room photo</h1>
          <hr className="border border-gray-400" />
          <ImagesUpload images={images} setImages={setImages} />
          <FacilitiesInput
            facilities={facilities}
            setFacilities={setFacilities}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          radius="none"
          type="submit"
          color="primary"
          isLoading={isLoading}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}
