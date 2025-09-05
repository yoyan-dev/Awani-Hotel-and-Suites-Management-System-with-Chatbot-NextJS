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
  Textarea,
} from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, type RootState } from "@/store/store";
import { addItem } from "@/features/inventory/inventory-thunk";
import { Plus } from "lucide-react";

export default function AddModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector(
    (state: RootState) => state.inventory
  );
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [submitted, setSubmitted] = React.useState(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    await dispatch(addItem(data));
    onClose();
  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  return (
    <>
      <Button color="primary" endContent={<Plus />} size="sm" onPress={onOpen}>
        Add New
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Item
              </ModalHeader>
              <ModalBody>
                <Form
                  className="w-full space-y-4"
                  onReset={() => setSubmitted(null)}
                  onSubmit={onSubmit}
                >
                  <div className="flex gap-2 w-full">
                    {/* <div className="flex-1 space-y-4 flex flex-col">
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
                    </div> */}
                    <div className="flex-1 w-full p-4 border-l border-gray-500 space-y-8">
                      <div className="flex gap-4 w-full">
                        <Input
                          className="flex-1 w-full"
                          label="Name"
                          placeholder="Item name"
                          name="name"
                          variant="bordered"
                          labelPlacement="outside"
                        />
                        <Input
                          className="flex-1 w-full"
                          label="Quantity"
                          placeholder="Item quantity"
                          name="quantity"
                          variant="bordered"
                          labelPlacement="outside"
                        />
                      </div>
                      <Textarea
                        name="description"
                        placeholder="Item description"
                        label="Description"
                        labelPlacement="outside"
                        variant="bordered"
                      />
                      <Select
                        className="flex-1 w-full"
                        name="status"
                        label="Item status"
                        labelPlacement="outside"
                        placeholder="Select Item status"
                        variant="bordered"
                        defaultSelectedKeys={["in-stock"]}
                      >
                        <SelectItem key="in-stock">In stock</SelectItem>
                        <SelectItem key="out-of-stock">Out of stock</SelectItem>
                        <SelectItem key="unavailable">unavailable</SelectItem>
                      </Select>
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
