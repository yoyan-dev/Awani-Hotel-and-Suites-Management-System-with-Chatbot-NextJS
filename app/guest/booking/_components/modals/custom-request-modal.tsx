"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@heroui/react";
import { useRouter } from "next/navigation";

export default function CustomRequestModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Custom Request
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} hideCloseButton>
        <ModalContent>
          <ModalHeader>Request Stay</ModalHeader>
          <ModalBody>
            <Textarea
              label="Request"
              placeholder="Write something..."
            ></Textarea>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
