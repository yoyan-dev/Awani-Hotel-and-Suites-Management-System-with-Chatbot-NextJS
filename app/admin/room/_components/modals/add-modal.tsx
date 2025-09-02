import React from "react";
import {
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

export default function AddModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [room, setRoom] = React.useState<Partial<Room>>({});

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
                    value={room.room_number}
                    onChange={(e) => setRoom({...room, room_number: e.target.value})}
                    variant="bordered"
                    labelPlacement="outside"
                  />
                  <Select color="primary" label="Room type" onChange={(e) => setRoom({...room, room_type: e.target.value})} labelPlacement="outside" defaultSelectedKeys={room.room_type} value={room.room_type} placeholder="Select Room Type" variant="bordered" className="w-full">
                    <SelectItem key="single" >Single</SelectItem>
                    <SelectItem key="double">Double</SelectItem>
                    <SelectItem key="suite">Suite</SelectItem>
                  </Select>
                </div>
                <Input
                  color="primary"
                  value={room.description}
                  onChange={(e) => setRoom({...room, description: e.target.value})}
                  label="Description"
                  labelPlacement="outside"
                  variant="bordered"
                />
                <div className="flex gap-4">
                  <Select color="primary" label="Floor" labelPlacement="outside" defaultSelectedKeys={room.room_type} value={room.room_type} placeholder="Select floor" variant="bordered" className="w-full">
                    <SelectItem key="1">1</SelectItem>
                    <SelectItem key="2">2</SelectItem>
                    <SelectItem key="3">3</SelectItem>
                  </Select>
                  <Input
                    color="primary"
                    type="number"
                    value={room.max_guest}
                    onChange={(e) => setRoom({...room, max_guest: e.target.value})}
                    label="Max Guest"
                    labelPlacement="outside"
                    variant="bordered"
                  />
                </div>
                <Input
                  color="primary"
                value={room.base_price}
                onChange={(e) => setRoom({...room, base_price: e.target.value})}
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
