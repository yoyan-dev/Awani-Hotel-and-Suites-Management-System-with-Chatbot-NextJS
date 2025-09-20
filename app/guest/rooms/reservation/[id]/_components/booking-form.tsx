import { Booking } from "@/types/booking";
import { RoomType } from "@/types/room";
import {
  Button,
  Chip,
  Input,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  Textarea,
  CheckboxGroup,
  Checkbox,
  Form,
  Tooltip,
} from "@heroui/react";
import { ArrowLeft, ArrowRight, Info, Link } from "lucide-react";
import React, { useState } from "react";
import ViewModal from "./modals/view-modal";
import { Guest } from "@/types/guest";
import PolicyModal from "./modals/policy-modal";
interface BookingFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  guest: Guest;
  room_types: RoomType[];
  room: RoomType | null;
  isLoading: boolean;
  selectedRoom: any;
  setSelectedRoom: React.Dispatch<React.SetStateAction<any>>;
  bookingIsLoading: boolean;
}

export default function BookingForm({
  onSubmit,
  guest,
  room_types,
  room,
  isLoading,
  selectedRoom,
  setSelectedRoom,
  bookingIsLoading,
}: BookingFormProps) {
  const [selectedPurpose, SetSelectedPurpose] = useState<string>("");
  const [policySignature, setPolicySignature] = useState("");

  return (
    <Form onSubmit={onSubmit} className="flex-1 px-4 w-full space-y-4">
      <div className="space-y-4 w-full">
        <div className="flex justify-between flex-wrap">
          <h1>
            <Chip color="primary" className="text-sm">
              1
            </Chip>
            -Personal Information
          </h1>
          <div className="flex">
            <Link color="primary" href="#">
              Primary
            </Link>
            <Tooltip
              content="This field is automatically filled from your account. To change it, go to Account Settings."
              color="warning"
            >
              <Info />
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            fullWidth
            variant="bordered"
            radius="none"
            isReadOnly
            isDisabled
            labelPlacement="outside"
            label="Full Name"
            value={guest.full_name}
            placeholder="Enter your name"
          />
          <Input
            fullWidth
            variant="bordered"
            isReadOnly
            isDisabled
            labelPlacement="outside"
            radius="none"
            label="Contact Number"
            value={guest.contact_number}
            placeholder="Enter your name"
          />
        </div>
        <Textarea
          fullWidth
          variant="bordered"
          isReadOnly
          isDisabled
          radius="none"
          labelPlacement="outside"
          label="Address"
          value={guest.address}
          placeholder="Enter your name"
        />
      </div>
      <div className="space-y-4 w-full">
        <h1>
          <Chip color="primary" className="text-sm">
            2
          </Chip>
          -Booking Details
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-300 mb-3">
          Fill in your booking preferences below. All fields are editable.
        </p>
        {room ? (
          <div className="flex w-full justify-end md:hidden">
            <ViewModal room={room} />
          </div>
        ) : null}
        <div className="pt-4">
          <Select
            isRequired
            fullWidth
            isLoading={isLoading}
            radius="none"
            className="flex-1 w-full min-w-40"
            name="room_type_id"
            label="Room type"
            value={selectedRoom}
            defaultSelectedKeys={[selectedRoom || ""]}
            onChange={(e) => setSelectedRoom(e.target.value)}
            labelPlacement="outside"
            placeholder="Select Room Type"
            variant="bordered"
          >
            {room_types.map((type) => (
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
        </div>
        {/* <div>
            <Input
              fullWidth
              variant="underlined"
              isRequired
              label="Full Name"
              name="fullName"
              placeholder="Enter your name"
            />
          </div> */}

        <div className="flex gap-4">
          <Input
            fullWidth
            variant="underlined"
            isRequired
            type="date"
            label="Check-in Date"
            name="check_in"
          />

          <Input
            fullWidth
            variant="underlined"
            isRequired
            type="date"
            label="Check-out Date"
            name="check_out"
          />
        </div>

        <Input
          variant="bordered"
          isRequired
          radius="none"
          placeholder="e.g (1 adult, 1 child)"
          label="Number of Guests"
          name="number_of_guests"
        />
      </div>
      <div className="space-y-4">
        <h1>
          <Chip color="primary" className="text-sm">
            3
          </Chip>
          -Health Declaration
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-300 mb-3">
          Please complete this section honestly. These answers are required for
          your safety and for compliance with health regulations. <br />
        </p>
        <Textarea
          classNames={{ label: "text-gray-600 dark:text-gray-300" }}
          label="City/Country work visited and transited in the last 30 days."
          labelPlacement="outside"
          variant="bordered"
          name="places_last_visited"
          placeholder="Please separate it with commas."
        />
        <RadioGroup
          isRequired
          classNames={{ label: "text-gray-600 dark:text-gray-300" }}
          label="Purpose of Travel"
          orientation="horizontal"
          color="primary"
          name="purpose"
          value={selectedPurpose}
          size="sm"
          onValueChange={SetSelectedPurpose}
        >
          <Radio value="Visiting friends and family">
            Visiting friends and family
          </Radio>
          <Radio value="Business">Business</Radio>
          <Radio value="San Francisco">San Francisco</Radio>
          <Radio value="Mice">Mice</Radio>
          <Radio value="Leisure">Leisure</Radio>
          <Radio value="others">Others</Radio>
        </RadioGroup>

        {selectedPurpose === "others" && (
          <Input
            fullWidth
            placeholder="Please specify"
            variant="underlined"
            className="max-w-xs mt-2"
            name="purpose"
          />
        )}
        <CheckboxGroup
          classNames={{ label: "text-gray-600 dark:text-gray-300" }}
          color="primary"
          label="Please check if you have any of the following at the present or during the past 30 days."
          orientation="horizontal"
          size="sm"
        >
          <Checkbox value="fever">Fever</Checkbox>
          <Checkbox value="sore throat">Sore Throat</Checkbox>
          <Checkbox value="headeache">Headeache</Checkbox>
          <Checkbox value="body weakness">Body weakness</Checkbox>
          <Checkbox value="difficulty of breathing">
            Difficulty of Breathing
          </Checkbox>
          <Checkbox value="severe diarhea">Severe Diarhea</Checkbox>
        </CheckboxGroup>
      </div>
      <div className="space-y-4">
        <h1 className="px-2 bg-primary text-white md:text-xl">Declaration</h1>
        <div>
          <p className="text-sm text-gray-600">
            The information I have given is true, correct and complete. I
            understand failure to answer any question may have serious
            consequences.
          </p>
        </div>
        <div className="flex justify-between">
          <PolicyModal onConfirm={(sig) => setPolicySignature(sig)} />

          <Button
            isLoading={bookingIsLoading}
            isDisabled={policySignature ? false : true}
            type="submit"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
}
