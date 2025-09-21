import React from "react";
import {
  Form,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { Room, RoomType } from "@/types/room";
import BedsInput from "./beds-input";
import FacilitiesInput from "./facilities-input";
import ImagesUpload from "./image-upload";

interface RoomFormProps {
  formData: Room;
  setFormData: React.Dispatch<React.SetStateAction<Room>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  beds: string[];
  setBeds: React.Dispatch<React.SetStateAction<string[]>>;
  facilities: string[];
  setFacilities: React.Dispatch<React.SetStateAction<string[]>>;
  images: any[];
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
  roomTypes: RoomType[];
  roomTypeIsLoading: boolean;
  isLoading: boolean;
}

export default function RoomForm({
  formData,
  setFormData,
  onSubmit,
  beds,
  setBeds,
  facilities,
  setFacilities,
  images,
  setImages,
  roomTypes,
  roomTypeIsLoading,
  isLoading,
}: RoomFormProps) {
  return (
    <Form
      onSubmit={onSubmit}
      className="p-4 bg-white dark:bg-gray-900 rounded space-y-2 w-full"
    >
      <h1 className="text-2xl semi-bold">Update Room</h1>
      <div className="flex flex-col gap-8 w-full md:flex-row">
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col gap-4">
          <h1>Basic Information</h1>
          <hr className="border border-gray-400" />

          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              className="w-full"
              label="Room Number"
              value={formData?.room_number?.toString() ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  room_number: Number(e.target.value),
                })
              }
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
              value={formData?.area ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
              placeholder="room area"
              name="area"
              variant="bordered"
              radius="none"
              labelPlacement="outside"
            />
          </div>
          <Select
            isLoading={roomTypeIsLoading}
            radius="none"
            className="flex-1 w-full min-w-40"
            name="room_type"
            label="Room type"
            defaultSelectedKeys={[formData.room_type_id || ""]}
            onChange={(e) =>
              setFormData({ ...formData, room_type_id: e.target.value })
            }
            labelPlacement="outside"
            placeholder="Select Room Type"
            variant="bordered"
          >
            {roomTypes.map((type) => (
              <SelectItem key={type.id} textValue={type.name}>
                <div className="flex flex-col">
                  <span className="text-small">{type.name}</span>
                  <span className="text-tiny text-gray-600 dark:text-gray-300">
                    {type.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </Select>

          <div className="flex gap-4">
            <Input
              className="w-full"
              label="Max guest"
              value={formData?.max_guest?.toString() ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, max_guest: Number(e.target.value) })
              }
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
              value={formData?.base_price?.toString() ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, base_price: Number(e.target.value) })
              }
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
            value={formData?.description ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            label="Description"
            name="description"
            labelPlacement="outside"
            placeholder="Briefly describe the hotel room..."
            variant="bordered"
          />
          <Textarea
            radius="none"
            className="w-full"
            value={formData?.remarks ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, remarks: e.target.value })
            }
            label="Remarks"
            name="remarks"
            labelPlacement="outside"
            placeholder="Room remarks..."
            variant="bordered"
          />
          {/* <BedsInput beds={beds} setBeds={setBeds} /> */}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col gap-4 ">
          <h1>Room photo</h1>
          <hr className="border border-gray-400" />
          <ImagesUpload images={images} setImages={setImages} />
          {/* <FacilitiesInput
            facilities={facilities}
            setFacilities={setFacilities}
          /> */}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          radius="none"
          type="submit"
          color="primary"
          isLoading={isLoading}
        >
          Update Room
        </Button>
      </div>
    </Form>
  );
}
