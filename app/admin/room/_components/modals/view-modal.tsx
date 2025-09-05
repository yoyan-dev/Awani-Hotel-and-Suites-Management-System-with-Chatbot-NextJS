import React from "react";
import {
  Form,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Image,
} from "@heroui/react";

export default function ViewModal(room: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>View</div>
      <Modal
        isOpen={isOpen}
        size="3xl"
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Room Details
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Image
                      alt="HeroUI hero Image"
                      src={room.room.image}
                      width={500}
                    />
                    {/* <span>size: 4 x 4 feet</span> */}
                  </div>
                  <div className="flex-1">
                    <h2>room id: {room.room.room_id}</h2>
                    <p>{room.room.description}</p>
                    <p>status: {room.room.status}</p>
                    <p>price: {room.room.base_price}</p>
                    <p>max guest: {room.room.max_guest}</p>
                    <p>floor: {room.room.floor}</p>
                  </div>
                </div>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="danger">Yes</Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
