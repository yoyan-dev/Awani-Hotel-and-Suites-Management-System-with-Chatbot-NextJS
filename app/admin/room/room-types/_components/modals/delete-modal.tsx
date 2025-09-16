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
import { RoomType } from "@/types/room";
import { deleteRoomType } from "@/features/room-types/room-types-thunk";

interface DeleteModalProps {
  room_type: RoomType;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ room_type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.room_type.isLoading
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handleDelete() {
    dispatch(deleteRoomType(room_type.id || ""));
  }

  console.log(room_type);
  return (
    <>
      <div onClick={onOpen}>Delete</div>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Delete
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this room type? This action
                  cannot be undone.
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
};

export default DeleteModal;
