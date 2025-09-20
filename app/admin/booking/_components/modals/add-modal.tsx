import { addBooking } from "@/features/booking/booking-thunk";
import { fetchGuests } from "@/features/guest/guest-thunk";
import { fetchRoomTypes } from "@/features/room-types/room-types-thunk";
import { fetchRooms } from "@/features/room/room-thunk";
import { AppDispatch, RootState } from "@/store/store";
import { Guest } from "@/types/guest";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Form,
  Chip,
  Select,
  RadioGroup,
  Radio,
  Textarea,
  SelectItem,
  CheckboxGroup,
} from "@heroui/react";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddModal() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();
  const { room_types, isLoading } = useSelector(
    (state: RootState) => state.room_type
  );
  const { isLoading: bookingIsLoading, error } = useSelector(
    (state: RootState) => state.booking
  );
  const { rooms, isLoading: roomIsLoading } = useSelector(
    (state: RootState) => state.room
  );
  const { guests, isLoading: guestIsLoading } = useSelector(
    (state: RootState) => state.guests
  );
  const [selectedGuest, SetSelectedGuest] = useState<string>();
  const [selectedPurpose, SetSelectedPurpose] = useState<string>();
  const [selectedRoomType, SetSelectedRoomType] = useState<string>();

  useEffect(() => {
    dispatch(fetchRoomTypes());
    dispatch(fetchGuests());
  }, [dispatch]);

  useEffect(() => {
    if (selectedRoomType) {
      dispatch(
        fetchRooms({ roomTypeID: selectedRoomType, status: "available" })
      );
    }
  }, [dispatch, selectedRoomType]);

  const filteredGuest = useMemo(
    () =>
      guests.find((guest) => guest.id === selectedGuest) ||
      ({ full_name: "", contact_number: "", address: "" } as Guest),
    [selectedGuest]
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    await dispatch(addBooking(formData));
    if (error !== undefined) {
      onClose();
    }
  }

  return (
    <>
      <Button color="primary" endContent={<Plus />} size="sm" onPress={onOpen}>
        Add Booking
      </Button>
      <Modal
        as={Form}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        size="3xl"
        scrollBehavior="outside"
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-primary text-white w-full">
                Add New Booking
              </ModalHeader>
              <ModalBody>
                <div className="flex-1 px-4 w-full space-y-4 py-4">
                  <div className="space-y-4 w-full">
                    <h1>
                      <Chip color="primary" className="text-sm">
                        1
                      </Chip>
                      -Guest Information
                    </h1>
                    <Select
                      isRequired
                      fullWidth
                      isLoading={isLoading}
                      radius="none"
                      className="flex-1 w-full min-w-40 pt-4"
                      name="guest_id"
                      label="Guest"
                      onChange={(e) => SetSelectedGuest(e.target.value)}
                      labelPlacement="outside"
                      placeholder="Select Guest"
                      variant="bordered"
                      items={[
                        ...guests,
                        {
                          id: "new",
                          full_name: "Register new guest",
                          email: "",
                        },
                      ]}
                    >
                      {(guest) => (
                        <SelectItem key={guest.id} textValue={guest.full_name}>
                          <div className="flex flex-col">
                            <span className="text-small">
                              {guest.full_name}
                            </span>
                            <span className="text-tiny text-gray-600 dark:text-gray-300">
                              {guest.email}
                            </span>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                    {selectedGuest ? (
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                          <Input
                            fullWidth
                            variant="bordered"
                            radius="none"
                            isReadOnly={selectedGuest !== "new"}
                            isDisabled={selectedGuest !== "new"}
                            labelPlacement="outside"
                            label="Full Name"
                            value={filteredGuest?.full_name}
                            placeholder="Enter guest fullname"
                          />
                          <Input
                            fullWidth
                            variant="bordered"
                            isReadOnly={selectedGuest !== "new"}
                            isDisabled={selectedGuest !== "new"}
                            labelPlacement="outside"
                            radius="none"
                            value={filteredGuest?.contact_number}
                            label="Contact Number"
                            placeholder="Enter guest contact number"
                          />
                        </div>
                        <Textarea
                          fullWidth
                          variant="bordered"
                          isReadOnly={selectedGuest !== "new"}
                          isDisabled={selectedGuest !== "new"}
                          radius="none"
                          labelPlacement="outside"
                          value={filteredGuest?.address}
                          label="Address"
                          placeholder="Enter guest address"
                        />
                        {selectedGuest === "new" ? (
                          <div className="flex flex-col md:flex-row gap-4">
                            <Input
                              fullWidth
                              variant="bordered"
                              radius="none"
                              labelPlacement="outside"
                              label="Nationality"
                              placeholder="e.g. Filipino"
                              className="flex-1"
                            />
                            <Select
                              fullWidth
                              label="Gender"
                              labelPlacement="outside"
                              radius="none"
                              placeholder="Select gender"
                              isRequired
                              variant="bordered"
                              className="flex-1"
                            >
                              <SelectItem key="male">Male</SelectItem>
                              <SelectItem key="female">Female</SelectItem>
                            </Select>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-4 w-full">
                    <h1>
                      <Chip color="primary" className="text-sm">
                        1
                      </Chip>
                      -Booking Details
                    </h1>
                    <div className="pt-4">
                      <Select
                        isRequired
                        fullWidth
                        isLoading={isLoading}
                        radius="none"
                        className="flex-1 w-full min-w-40"
                        name="room_type_id"
                        label="Room type"
                        onChange={(e) => SetSelectedRoomType(e.target.value)}
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
                    {selectedRoomType ? (
                      <div className="pt-4">
                        <Select
                          fullWidth
                          isLoading={roomIsLoading}
                          radius="none"
                          className="flex-1 w-full min-w-40"
                          name="room_id"
                          label="Assign Room"
                          labelPlacement="outside"
                          placeholder="Assign available room"
                          variant="bordered"
                        >
                          {rooms.map((room) => (
                            <SelectItem
                              key={room.id}
                              textValue={room.room_number?.toString() || ""}
                            >
                              <div className="flex flex-col">
                                <span className="text-small">
                                  {room.room_number}
                                </span>
                                <span className="text-tiny text-gray-600 dark:text-gray-300">
                                  {room.description}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    ) : null}
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
                      isRequired
                      variant="bordered"
                      label="Number of Guests"
                      placeholder="e.g. (1 adult, 1 child"
                      labelPlacement="outside"
                      name="number_of_guests"
                    />
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
                      isRequired
                      classNames={{ label: "text-gray-600 dark:text-gray-300" }}
                      color="primary"
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
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex gap-4 justify-end w-full bg-primary">
                <Button onPress={onClose} variant="bordered" color="warning">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isLoading={bookingIsLoading}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
