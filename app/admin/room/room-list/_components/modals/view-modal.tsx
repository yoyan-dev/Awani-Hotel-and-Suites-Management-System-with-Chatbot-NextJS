import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
  Card,
  CardHeader,
  Chip,
  CardBody,
  ModalFooter,
} from "@heroui/react";
import { Room } from "@/types/room";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { Copyright } from "lucide-react";
interface RoomDetailsProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ room, isOpen, onClose }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        size="3xl"
        placement="top-center"
        scrollBehavior="outside"
        radius="none"
        onOpenChange={(open) => !open && onClose()}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-full text-white bg-primary">
                Room Details
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-6 w-full">
                  {room.images && room.images.length > 0 && (
                    <Carousel className="w-full rounded-2xl overflow-hidden">
                      {room.images.map((img, idx) => (
                        <CarouselItem key={idx}>
                          <Image
                            src={img}
                            alt={`Room image ${idx + 1}`}
                            width="100%"
                            className="object-cover w-full h-[300px] md:h-[400px]"
                          />
                        </CarouselItem>
                      ))}
                    </Carousel>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">
                        {room.room_type?.name} – Room #{room.room_number}
                      </h1>
                      <p className="text-gray-500">{room.area}</p>
                    </div>
                    <Chip
                      color={
                        room.status === "available"
                          ? "success"
                          : room.status === "maintenance"
                            ? "warning"
                            : "secondary"
                      }
                      className="uppercase"
                    >
                      {room.status}
                    </Chip>
                  </div>

                  {/* Key Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card
                      className="shadow-none bg-gray-50 dark:bg-gray-900"
                      radius="sm"
                    >
                      <CardHeader className="text-sm font-medium">
                        Size
                      </CardHeader>
                      <CardBody className="text-lg">
                        {room.room_type?.room_size}
                      </CardBody>
                    </Card>
                    <Card
                      className="shadow-none bg-gray-50 dark:bg-gray-900"
                      radius="sm"
                    >
                      <CardHeader className="text-sm font-medium">
                        Max Guests
                      </CardHeader>
                      <CardBody className="text-lg">
                        {room.room_type?.max_guest || 1}
                      </CardBody>
                    </Card>
                    <Card
                      className="shadow-none bg-gray-50 dark:bg-gray-900"
                      radius="sm"
                    >
                      <CardHeader className="text-sm font-medium">
                        Price/Night
                      </CardHeader>
                      <CardBody className="text-lg">
                        ₱{room.room_type?.price?.toLocaleString()}
                      </CardBody>
                    </Card>
                  </div>

                  <div className="rounded border border-gray-300 p-6 bg-white dark:bg-gray-900">
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {room.description}
                    </p>
                    {room.remarks && (
                      <p className="text-sm text-gray-500 mt-4 italic">
                        {room.remarks}
                      </p>
                    )}
                  </div>
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
};

export default RoomDetails;
