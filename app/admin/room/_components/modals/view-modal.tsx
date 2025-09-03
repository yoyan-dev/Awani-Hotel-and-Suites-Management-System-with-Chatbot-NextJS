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
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Room Details
              </ModalHeader>
              <ModalBody>
                <Image
                  alt="HeroUI hero Image"
                  src={room.room.image}
                  width={200}
                />
                <div>
                  <h2>{room.room.room_number}</h2>
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
