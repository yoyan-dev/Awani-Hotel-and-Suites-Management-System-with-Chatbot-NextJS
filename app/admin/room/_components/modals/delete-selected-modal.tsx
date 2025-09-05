import { Room } from "@/types/room";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { deleteRooms } from "@/features/room/room-thunk";

interface DeleteSelectedModalProps {
  selectedKeys: Set<number> | "all";
}

export default function DeleteSelectedModal({
  selectedKeys,
}: DeleteSelectedModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.room.isLoading);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handleDelete() {
    dispatch(deleteRooms({ selectedValues: selectedKeys }));
    onOpenChange();
  }

  return (
    <>
      <Button variant="bordered" color="danger" size="sm" onPress={onOpen}>
        Delete
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Delete
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this
                  {selectedKeys === "all"
                    ? " All"
                    : ` ${selectedKeys.size}`}{" "}
                  selected rooms? This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button
                  color="danger"
                  onPress={handleDelete}
                  isLoading={isLoading}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
