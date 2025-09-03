import React from "react";
import {
  Form,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Select,
  SelectItem,
  Image,
} from "@heroui/react";
import { MailIcon, LockIcon, Plus } from "lucide-react";
import type { Room } from "@/types/room";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, type RootState } from "@/store/store";
import { addRoom } from "@/features/room/room-thunk";

export default function AddModal() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, error } =  useSelector((state: RootState) => state.room);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [room, setRoom] = React.useState<Partial<Room>>({});
  const [submitted, setSubmitted] = React.useState(null);

   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    dispatch(addRoom(data));
    console.log(error)
  };

  return (
    <>
        <Button color="primary" endContent={<Plus />} size="sm" onPress={onOpen}>
        Add New
        </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add New Room</ModalHeader>
              <ModalBody>
                <Form
                  className="w-full justify-center items-center space-y-4"
                  onReset={() => setSubmitted(null)}
                  onSubmit={onSubmit}
                >
                  <Image
                    alt="HeroUI hero Image"
                    src="https://via.placeholder.com/100"
                    width={200}
                  />
                  <div className="flex gap-4">
                    <Input
                      color="primary"
                      label="Room Number"
                      type="number"
                      name="room_number"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Select color="primary" name="room_type" label="Room type" onChange={(e) => setRoom({...room, room_type: e.target.value})} labelPlacement="outside" defaultSelectedKeys={room.room_type} value={room.room_type} placeholder="Select Room Type" variant="bordered" className="w-full">
                      <SelectItem key="single" >Single</SelectItem>
                      <SelectItem key="double">Double</SelectItem>
                      <SelectItem key="suite">Suite</SelectItem>
                    </Select>
                  </div>
                  <Input
                    color="primary"
                    name="description"
                    value={room.description}
                    onChange={(e) => setRoom({...room, description: e.target.value})}
                    label="Description"
                    labelPlacement="outside"
                    variant="bordered"
                  />
                  <div className="flex gap-4">
                    <Select color="primary" label="Floor" name="floor" labelPlacement="outside" value={room.floor} placeholder="Select floor" variant="bordered" className="w-full">
                      <SelectItem key="1">1</SelectItem>
                      <SelectItem key="2">2</SelectItem>
                      <SelectItem key="3">3</SelectItem>
                    </Select>
                    <Input
                      color="primary"
                      type="number"
                      name="max_guest"
                      label="Max Guest"
                      labelPlacement="outside"
                      variant="bordered"
                    />
                  </div>
                  <Input
                    color="primary"
                    name="base_price"
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
                  <div className="flex justify-end gap-4">
                    <Button onPress={onClose} variant="bordered">
                      Cancel
                    </Button>
                    <Button  color="primary" type="submit" isLoading={isLoading}>
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
