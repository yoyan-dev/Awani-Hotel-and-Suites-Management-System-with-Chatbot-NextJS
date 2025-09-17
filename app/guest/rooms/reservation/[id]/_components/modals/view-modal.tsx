import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@heroui/react";
import { RoomType } from "@/types/room";
import { formatPHP } from "@/lib/format-php";
import { Bed, Tv, UserCircle, Wifi } from "lucide-react";
interface ViewModalProps {
  room: RoomType;
}

const ViewModal: React.FC<ViewModalProps> = ({ room }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpen} className="text-primary cursor-pointer">
        View room details.
      </div>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {room.name}
              </ModalHeader>
              <ModalBody>
                <div>
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex gap-2 overflow-x-auto">
                      <Image src={room.image} alt="room image" width="100%" />
                    </div>
                    <div className="flex justify-between items-center flex-wrap  w-full">
                      <div className="flex gap-2">
                        <h2 className="text-2xl font-semibold capitalize">
                          {room.name}
                        </h2>
                        <span className="text-gray-500 dark:text-gray-300 ">
                          ({room.room_size})
                        </span>
                      </div>
                      <p className="text-xl font-semibold">
                        {formatPHP(Number(room.price))}
                      </p>
                    </div>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">
                      {room.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Room Features
                      </h3>
                      <div className="flex gap-4 text-gray-700 flex-wrap">
                        <div className="flex items-center gap-2">
                          <UserCircle size={20} /> 2 Guests
                        </div>
                        <div className="flex items-center gap-2">
                          <Bed size={20} /> 1 Queen Bed
                        </div>
                        <div className="flex items-center gap-2">
                          <Wifi size={20} /> Free WiFi
                        </div>
                        <div className="flex items-center gap-2">
                          <Tv size={20} /> Smart TV
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewModal;
