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
} from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import ViewModal from "./modals/view-modal";
interface BookingFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  room_types: RoomType[];
  room: RoomType | null;
  isLoading: boolean;
  selectedRoom: any;
  setSelectedRoom: React.Dispatch<React.SetStateAction<any>>;
  bookingIsLoading: boolean;
}

export default function BookingForm({
  onSubmit,
  room_types,
  room,
  isLoading,
  selectedRoom,
  setSelectedRoom,
  bookingIsLoading,
}: BookingFormProps) {
  const [selectedPurpose, SetSelectedPurpose] = useState<string>("");
  const [step, setStep] = useState(1);

  return (
    <Form onSubmit={onSubmit} className="flex-1 px-4 w-full space-y-4">
      <div className="space-y-4 w-full">
        <h1>
          <Chip color="primary" className="text-sm">
            1
          </Chip>
          -Booking Details
        </h1>
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
          variant="underlined"
          isRequired
          label="Number of Guests"
          type="number"
          min={1}
          name="number_of_guests"
        />
        <div className="flex justify-end">
          <Button color="primary" onPress={() => setStep(step + 1)} isIconOnly>
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <h1>
          <Chip color="primary" className="text-sm">
            2
          </Chip>
          -Health Declaration
        </h1>
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
          color="secondary"
          label="Please check if you have any of the following at the present or during the past 30 days."
          orientation="horizontal"
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
        <div className="flex justify-between">
          <Button color="primary" onPress={() => setStep(step - 1)} isIconOnly>
            <ArrowLeft />
          </Button>
          <Button color="primary" onPress={() => setStep(step + 1)} isIconOnly>
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="px-2 bg-primary text-white md:text-xl">Declaration</h1>
        <div>
          <p>
            The information I have given is true, correct and complete. I
            understand failure to answer any question may have serious
            consequences,(Article 171&172 of the revised penal code of the
            Philippines)
          </p>
          <p>Notes and Regulations</p>
          <ol>
            <li>1. First item</li>
            <li>2. Second item</li>
            <li>3. Third item</li>
          </ol>
        </div>
        <div className="flex justify-between">
          <Button color="primary" onPress={() => setStep(step - 1)}>
            <ArrowLeft />
          </Button>
          <Button isLoading={bookingIsLoading} type="submit" color="primary">
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
}
