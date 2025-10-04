"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/navigation";

export default function LoginPromptModal({ name }: { name: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Button className="mt-6" color="primary" onPress={onOpen}>
        {name}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} hideCloseButton>
        <ModalContent>
          <ModalHeader>Please log in first</ModalHeader>
          <ModalBody>
            <p>You need to be logged in to book an apartment.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={() => router.push("/auth")}>
              Go to Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
