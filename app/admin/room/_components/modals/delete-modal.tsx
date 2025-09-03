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
import { deleteRoom } from "@/features/room/room-thunk";

export default function DeleteModal(room: any) {
    const dispatch = useDispatch<AppDispatch>()
    const isLoading =  useSelector((state: RootState) => state.room.isLoading);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    function handleDelete() {
        dispatch(deleteRoom(room.room.id))
    }

    console.log(room);
    return (
        <>
        <div onClick={onOpen}>Delete</div>
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Delete Room</ModalHeader>
                <ModalBody>
                    <p>
                    Are you sure you want to delete this room? This action cannot be undone.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light" onPress={onClose}>
                    No
                    </Button>
                    <Button color="danger" onPress={handleDelete} isLoading={isLoading}>
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
