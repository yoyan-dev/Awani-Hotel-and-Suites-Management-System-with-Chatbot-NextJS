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
import AmenitiesInput from "../amenities-input";
import { addRoomType } from "@/features/room-types/room-types-thunk";

export default function AddModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.inventory);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [amenities, setAmenities] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("amenities", JSON.stringify(amenities));

    await dispatch(addRoomType(formData));
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
      <Button color="primary" endContent={<Plus />} size="sm" onPress={onOpen}>
        Add New
      </Button>
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
                      />
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Input
                          className="flex-1"
                          label="Room Size"
                          placeholder="Room size"
                          name="room_size"
                          variant="bordered"
                          labelPlacement="outside"
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
                        />
                      </div>
                      <Textarea
                        name="description"
                        placeholder="Item description"
                        label="Description"
                        labelPlacement="outside"
                        variant="bordered"
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
                    </div>
                  </div>

                  <AmenitiesInput
                    amenities={amenities}
                    setAmenities={setAmenities}
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
