import { fetchGuests } from "@/features/guest/guest-thunk";
import { RootState } from "@/store/store";
import { Guest } from "@/types/guest";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Form,
  addToast,
} from "@heroui/react";
import { Copyright, Plus } from "lucide-react";
import React from "react";
import BookingDetailsSection from "./booking-details-section";
import HealthDeclarationSection from "./health-declaration-section";
import GuestInfoSection from "./guest-info-section";
import { useBookings } from "@/hooks/use-bookings";
import { useRoomTypes } from "@/hooks/use-room-types";
import { useRooms } from "@/hooks/use-rooms";
import { Booking } from "@/types/booking";

export default function EditModal({
  booking,
  isOpen,
  onClose,
}: {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    room_types,
    isLoading: typesLoading,
    fetchRoomTypes,
  } = useRoomTypes();
  const { isLoading: bookingIsLoading, error, updateBooking } = useBookings();
  const { rooms, isLoading: roomLoading, fetchRooms } = useRooms();
  const [formData, setFormData] = React.useState<Booking>(booking);
  const [selectedPurpose, setSelectedPurpose] = React.useState<string>();
  const [selectedRoomType, setSelectedRoomType] = React.useState<string>(
    booking.room_type_id
  );
  const [specialRequests, setSpecialRequests] = React.useState<
    { name: string; price: string; quantity: number }[]
  >(booking.special_requests);

  React.useEffect(() => {
    if (isOpen) fetchRoomTypes({});
  }, []);

  React.useEffect(() => {
    if (selectedRoomType && isOpen) {
      fetchRooms({ roomTypeID: selectedRoomType, status: "available" });
    }
  }, [selectedRoomType]);

  React.useEffect(() => {
    const room = room_types.find((room) => room.id === selectedRoomType);
    if (room?.add_ons) {
      setSpecialRequests(
        room.add_ons.map((item: any) => ({
          name: item.name,
          price: item.price,
          quantity: 0,
        }))
      );
    } else {
      setSpecialRequests([]);
    }
  }, [selectedRoomType]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // console.log(formData);
    // formData.append("special_requests", JSON.stringify([]));
    // await addBooking(formData);
    // if (error === undefined) {
    //   onClose();
    // }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => !open && onClose()}
        size="3xl"
        scrollBehavior="outside"
        placement="top-center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-primary text-white w-full">
                Update Booking
              </ModalHeader>
              <ModalBody>
                <div className="flex-1 px-4 w-full space-y-4 py-4">
                  <GuestInfoSection guest={booking.user} />
                  <Form onSubmit={handleSubmit}>
                    <BookingDetailsSection
                      formData={formData}
                      setFormData={setFormData}
                      room_types={room_types}
                      rooms={rooms}
                      selectedRoomType={selectedRoomType}
                      setSelectedRoomType={setSelectedRoomType}
                      specialRequests={specialRequests}
                      setSpecialRequests={setSpecialRequests}
                      typesLoading={typesLoading}
                      roomLoading={roomLoading}
                    />
                    <HealthDeclarationSection
                      selectedPurpose={selectedPurpose}
                      setSelectedPurpose={setSelectedPurpose}
                    />
                    <div className="flex gap-4 justify-end w-full pb-4">
                      <Button
                        onPress={onClose}
                        variant="bordered"
                        color="warning"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        color="primary"
                        isLoading={bookingIsLoading}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </ModalBody>
              <ModalFooter className="gap-1 w-full bg-primary flex justify-center items-center text-white text-sm font-thin">
                <Copyright size={10} /> Alright reserved Ma. Awani.
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
