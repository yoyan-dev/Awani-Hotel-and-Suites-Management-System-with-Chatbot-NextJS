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
import { MailIcon, LockIcon, Plus, Upload, ImageIcon } from "lucide-react";
import type { Room } from "@/types/room";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, type RootState } from "@/store/store";
import { addRoom } from "@/features/room/room-thunk";

export default function AddModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.room);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [room, setRoom] = React.useState<Partial<Room>>({});
  const [submitted, setSubmitted] = React.useState(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    await dispatch(addRoom(data));
    setPreview(null);
    error === undefined ? onClose() : null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Button color="primary" endContent={<Plus />} size="sm" onPress={onOpen}>
        Add New
      </Button>
      <Modal
        isOpen={isOpen}
        size="3xl"
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Room
              </ModalHeader>
              <ModalBody>
                <Form
                  className="w-full space-y-4"
                  onReset={() => setSubmitted(null)}
                  onSubmit={onSubmit}
                >
                  <div className="flex gap-2 w-full">
                    <div className="flex-1 space-y-4 flex flex-col">
                      <div className="flex-1 flex flex-col gap-2 w-full items-start">
                        <label className="text-sm font-medium text-gray-600">
                          Room Image
                        </label>

                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition"
                        >
                          {preview ? (
                            <img
                              src={preview}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-xl"
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                              <Upload size={32} />
                              <span className="text-sm">
                                Click or drag file to upload
                              </span>
                            </div>
                          )}
                        </label>

                        <input
                          id="image-upload"
                          type="file"
                          name="image"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                      {/* <div className="flex gap-2 items-center">
                        <Input
                          radius="sm"
                          type="number"
                          placeholder="room width"
                          name="width"
                          label="Width (inches)"
                          labelPlacement="outside"
                          variant="bordered"
                          className="flex-1 w-full"
                        />
                        x
                        <Input
                          radius="sm"
                          type="number"
                          placeholder="room height"
                          name="Height (inches)"
                          label="Width"
                          labelPlacement="outside"
                          variant="bordered"
                          className="flex-1 w-full"
                        />
                      </div> */}
                    </div>
                    <div className="flex-1 w-full p-4 border-l border-gray-500 space-y-8">
                      <Select
                        className="flex-1 w-full"
                        name="status"
                        label="Room status"
                        labelPlacement="outside"
                        placeholder="Select Room status"
                        variant="bordered"
                        defaultSelectedKeys={["available"]}
                      >
                        <SelectItem key="available">Available</SelectItem>
                        <SelectItem key="cleaning">Cleaning</SelectItem>
                        <SelectItem key="reserved">Reserved</SelectItem>
                        <SelectItem key="occupied">Occupied</SelectItem>
                        <SelectItem key="maintenance">Maintenance</SelectItem>
                        <SelectItem key="out_of_service">
                          Out of service
                        </SelectItem>
                      </Select>
                      <div className="flex gap-4 w-full">
                        <Input
                          className="flex-1 w-full"
                          label="Room Number"
                          placeholder="ex. 101"
                          type="number"
                          name="room_number"
                          variant="bordered"
                          labelPlacement="outside"
                        />
                        <Select
                          className="flex-1 w-full"
                          name="room_type"
                          label="Room type"
                          onChange={(e) =>
                            setRoom({ ...room, room_type: e.target.value })
                          }
                          labelPlacement="outside"
                          defaultSelectedKeys={room.room_type}
                          value={room.room_type}
                          placeholder="Select Room Type"
                          variant="bordered"
                        >
                          <SelectItem key="single">Single</SelectItem>
                          <SelectItem key="double">Double</SelectItem>
                          <SelectItem key="suite">Suite</SelectItem>
                        </Select>
                      </div>
                      <Input
                        name="description"
                        placeholder="Room description"
                        value={room.description}
                        onChange={(e) =>
                          setRoom({ ...room, description: e.target.value })
                        }
                        label="Description"
                        labelPlacement="outside"
                        variant="bordered"
                      />
                      <div className="flex gap-4 w-full">
                        <Select
                          className="flex-1 w-full"
                          label="Floor"
                          name="floor"
                          labelPlacement="outside"
                          value={room.floor}
                          placeholder="Select floor"
                          variant="bordered"
                        >
                          <SelectItem key="1">1</SelectItem>
                          <SelectItem key="2">2</SelectItem>
                          <SelectItem key="3">3</SelectItem>
                        </Select>
                        <Input
                          type="number"
                          placeholder="max guest"
                          name="max_guest"
                          label="Max Guest"
                          labelPlacement="outside"
                          variant="bordered"
                          className="flex-1 w-full"
                        />
                      </div>
                      <Input
                        name="base_price"
                        label="Base Price"
                        labelPlacement="outside"
                        placeholder="0.00"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              $
                            </span>
                          </div>
                        }
                        type="number"
                        variant="bordered"
                      />
                    </div>
                  </div>
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
