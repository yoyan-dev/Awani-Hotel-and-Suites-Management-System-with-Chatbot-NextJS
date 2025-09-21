import React, { useState } from "react";
import {
  Form,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, type RootState } from "@/store/store";
import { Plus, Upload } from "lucide-react";
import AddOnsInput from "../add-ons-input";
import { updateRoomType } from "@/features/room-types/room-types-thunk";
import { RoomType } from "@/types/room";
import { uploadRoomImage } from "@/lib/upload-room-image";

interface UpdateModalProps {
  room_type: RoomType;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ room_type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.inventory);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<RoomType>(room_type);
  const [addOns, setAddOns] = useState<{ name: string; price: string }[]>(
    room_type.add_ons ?? []
  );
  const [preview, setPreview] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const file = data.get("image") as File;

    await dispatch(
      updateRoomType({
        ...formData,
        add_ons: addOns,
        image:
          file && file.size > 0
            ? await uploadRoomImage(file, "type-image")
            : formData.image,
      })
    );
    onClose();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div onClick={onOpen} className="text-success">
        Edit
      </div>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        size="3xl"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Room Type
              </ModalHeader>
              <ModalBody>
                <Form
                  className="w-full space-y-4"
                  onSubmit={onSubmit}
                  onReset={() => setPreview(null)}
                >
                  <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="flex-1 w-full md:border-r md:border-gray-300 md:pr-4 space-y-6">
                      <Input
                        className="w-full"
                        label="Name"
                        placeholder="Item room type"
                        name="name"
                        variant="bordered"
                        labelPlacement="outside"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Input
                          className="flex-1"
                          label="Room Size"
                          placeholder="Room size"
                          name="room_size"
                          variant="bordered"
                          labelPlacement="outside"
                          value={formData.room_size}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              room_size: e.target.value,
                            })
                          }
                        />
                        <Input
                          className="flex-1"
                          label="Price"
                          name="price"
                          type="number"
                          variant="bordered"
                          labelPlacement="outside"
                          placeholder="0.00"
                          startContent={
                            <span className="text-default-400 text-small">
                              $
                            </span>
                          }
                          value={formData.price?.toString() ?? ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                      <Textarea
                        name="description"
                        placeholder="Item description"
                        label="Description"
                        labelPlacement="outside"
                        variant="bordered"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex-1 space-y-4 flex flex-col">
                      <label className="text-sm font-medium text-gray-600">
                        Room Image
                      </label>
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition min-h-44"
                      >
                        {preview ? (
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : formData.image ? (
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-gray-400 py-6">
                            <Upload size={32} />
                            <span className="text-sm">
                              Click or drag file to upload
                            </span>
                          </div>
                        )}
                      </label>
                      <Input
                        id="image-upload"
                        type="file"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Input
                        className="flex-1"
                        label="Max Guest"
                        name="max_guest"
                        type="number"
                        variant="bordered"
                        radius="none"
                        value={formData.max_guest?.toString() ?? ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            max_guest: Number(e.target.value),
                          })
                        }
                        labelPlacement="outside"
                        min={1}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <AddOnsInput addOns={addOns} setAddOns={setAddOns} />

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
};
export default UpdateModal;
