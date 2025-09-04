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
  Textarea,
} from "@heroui/react";
import { Upload } from "lucide-react";
import type { Room } from "@/types/room";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, type RootState } from "@/store/store";
import { updateRoom } from "@/features/room/room-thunk";
import { uploadRoomImage } from "@/lib/upload-room-image";

export default function UpdateModal(room: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.room);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [newRoom, setRoom] = React.useState(room.room);
  const [preview, setPreview] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>, payload: Room) {
    e.preventDefault();
    const imageFile = (
      e.currentTarget.elements.namedItem("image") as HTMLInputElement
    )?.files?.[0];
    if (imageFile) {
      payload.image = await uploadRoomImage(
        imageFile,
        payload.room_number || newRoom.room_number
      );
    }
    await dispatch(updateRoom(payload));

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
      <div onClick={onOpen}>Edit</div>
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
                Update Room
              </ModalHeader>
              <ModalBody>
                <Form
                  className="w-full space-y-4"
                  onSubmit={(e) => onSubmit(e, newRoom)}
                >
                  <div className="flex gap-2 w-full">
                    <div className="flex-1 space-y-4 flex flex-col">
                      <div className="flex-1 flex flex-col gap-2 w-full items-start">
                        <label className="text-sm font-medium text-gray-600">
                          Room Image 'click to change image'
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
                          ) : newRoom.image ? (
                            <img
                              src={newRoom.image}
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
                      <div className="flex gap-2 items-center">
                        <Input
                          radius="sm"
                          type="number"
                          placeholder="room width by inches"
                          name="width"
                          label="Width"
                          value={newRoom.max_guest}
                          onChange={(e) =>
                            setRoom({ ...room, max_guest: e.target.value })
                          }
                          labelPlacement="outside"
                          variant="bordered"
                          className="flex-1 w-full"
                        />
                        x
                        <Input
                          radius="sm"
                          type="number"
                          placeholder="room height by inches"
                          name="Height"
                          label="Width"
                          value={newRoom.max_guest}
                          onChange={(e) =>
                            setRoom({ ...room, max_guest: e.target.value })
                          }
                          labelPlacement="outside"
                          variant="bordered"
                          className="flex-1 w-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1 w-full p-4 border-l border-gray-500 space-y-8">
                      <Select
                        radius="sm"
                        className="flex-1 w-full"
                        name="status"
                        label="Room status"
                        labelPlacement="outside"
                        placeholder="Select Room status"
                        variant="bordered"
                        defaultSelectedKeys={[newRoom.status]}
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
                          radius="sm"
                          className="flex-1 w-full"
                          label="Room Number"
                          placeholder="ex. 101"
                          type="number"
                          value={newRoom.room_number}
                          onChange={(e) =>
                            setRoom({ ...newRoom, room_number: e.target.value })
                          }
                          name="room_number"
                          variant="bordered"
                          labelPlacement="outside"
                        />
                        <Select
                          radius="sm"
                          className="flex-1 w-full"
                          name="room_type"
                          label="Room type"
                          onChange={(e) =>
                            setRoom({ ...newRoom, room_type: e.target.value })
                          }
                          labelPlacement="outside"
                          defaultSelectedKeys={[newRoom.room_type]}
                          value={newRoom.room_type}
                          placeholder="Select Room Type"
                          variant="bordered"
                        >
                          <SelectItem key="single">Single</SelectItem>
                          <SelectItem key="double">Double</SelectItem>
                          <SelectItem key="suite">Suite</SelectItem>
                        </Select>
                      </div>
                      <Textarea
                        radius="sm"
                        className="max-w-xs"
                        name="description"
                        value={newRoom.description}
                        onChange={(e) =>
                          setRoom({ ...newRoom, description: e.target.value })
                        }
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        variant="bordered"
                      />
                      <div className="flex gap-4 w-full">
                        <Select
                          radius="sm"
                          className="flex-1 w-full"
                          label="Floor"
                          name="floor"
                          labelPlacement="outside"
                          value={newRoom.floor}
                          defaultSelectedKeys={[newRoom.floor]}
                          onChange={(e) =>
                            setRoom({ ...newRoom, floor: e.target.value })
                          }
                          placeholder="Select floor"
                          variant="bordered"
                        >
                          <SelectItem key="1">1</SelectItem>
                          <SelectItem key="2">2</SelectItem>
                          <SelectItem key="3">3</SelectItem>
                        </Select>
                        <Input
                          radius="sm"
                          type="number"
                          placeholder="max guest"
                          name="max_guest"
                          label="Max Guest"
                          value={newRoom.max_guest}
                          onChange={(e) =>
                            setRoom({ ...newRoom, max_guest: e.target.value })
                          }
                          labelPlacement="outside"
                          variant="bordered"
                          className="flex-1 w-full"
                        />
                      </div>
                      <Input
                        radius="sm"
                        name="base_price"
                        label="Base Price"
                        labelPlacement="outside"
                        placeholder="0.00"
                        value={newRoom.base_price}
                        onChange={(e) =>
                          setRoom({ ...newRoom, base_price: e.target.value })
                        }
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
