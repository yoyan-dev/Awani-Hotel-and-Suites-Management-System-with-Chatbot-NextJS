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
import { Inventory } from "@/types/inventory";
import { deleteItem } from "@/features/inventory/inventory-thunk";

interface DeleteModalProps {
  inventory: Inventory;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ inventory }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.inventory.isLoading
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handleDelete() {
    dispatch(deleteItem(inventory.id || ""));
  }

  console.log(inventory);
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
                  Are you sure you want to delete this item? This action cannot
                  be undone.
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
