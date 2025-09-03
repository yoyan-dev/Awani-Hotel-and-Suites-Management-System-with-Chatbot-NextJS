import React from "react";
import {
  Form,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Image,
} from "@heroui/react";
import type { Room } from "@/types/room";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, type RootState } from "@/store/store";
import { updateRoom } from "@/features/room/room-thunk";

export default function UpdateModal(room: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.room);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [newRoom, setRoom] = React.useState(room.room);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>, payload: Room) {
    e.preventDefault();
    await dispatch(updateRoom(payload));
    error === undefined ? onClose() : null;
  }

  return (
    <>
      <div onClick={onOpen}>Edit</div>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Room
              </ModalHeader>
              <ModalBody>
                <Form
                  className="w-full justify-center items-center space-y-4"
                  onSubmit={(e) => onSubmit(e, newRoom)}
                >
                  <Image
                    alt="HeroUI hero Image"
                    src={newRoom.image}
                    width={200}
                  />
                  <div className="flex gap-4">
                    <Input
                      color="primary"
                      label="Room Number"
                      type="number"
                      value={newRoom.room_number}
                      onChange={(e) =>
                        setRoom({
                          ...newRoom,
                          room_number: Number(e.target.value),
                        })
                      }
                      name="room_number"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Select
                      color="primary"
                      name="room_type"
                      label="Room type"
                      onChange={(e) =>
                        setRoom({ ...newRoom, room_type: e.target.value })
                      }
                      labelPlacement="outside"
                      defaultSelectedKeys={newRoom.room_type}
                      value={newRoom.room_type}
                      placeholder="Select Room Type"
                      variant="bordered"
                      className="w-full"
                    >
                      <SelectItem key="single">Single</SelectItem>
                      <SelectItem key="double">Double</SelectItem>
                      <SelectItem key="suite">Suite</SelectItem>
                    </Select>
                  </div>
                  <Input
                    color="primary"
                    name="description"
                    value={newRoom.description}
                    onChange={(e) =>
                      setRoom({ ...newRoom, description: e.target.value })
                    }
                    label="Description"
                    labelPlacement="outside"
                    variant="bordered"
                  />
                  <div className="flex gap-4">
                    <Select
                      color="primary"
                      label="Floor"
                      name="floor"
                      labelPlacement="outside"
                      value={newRoom.floor}
                      onChange={(e) =>
                        setRoom({ ...newRoom, floor: e.target.value })
                      }
                      placeholder="Select floor"
                      variant="bordered"
                      className="w-full"
                    >
                      <SelectItem key="1">1</SelectItem>
                      <SelectItem key="2">2</SelectItem>
                      <SelectItem key="3">3</SelectItem>
                    </Select>
                    <Input
                      color="primary"
                      type="number"
                      value={newRoom.max_guest}
                      onChange={(e) =>
                        setRoom({ ...newRoom, max_guest: e.target.value })
                      }
                      name="max_guest"
                      label="Max Guest"
                      labelPlacement="outside"
                      variant="bordered"
                    />
                  </div>
                  <Input
                    color="primary"
                    name="base_price"
                    value={newRoom.base_price}
                    onChange={(e) =>
                      setRoom({ ...newRoom, base_price: e.target.value })
                    }
                    label="Base Price"
                    labelPlacement="outside"
                    placeholder="0.00"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    type="number"
                    variant="bordered"
                  />
                  <div className="flex justify-end gap-4 w-full">
                    <Button onPress={onClose} variant="bordered">
                      Cancel
                    </Button>
                    <Button color="primary" type="submit" isLoading={isLoading}>
                      Submit
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
