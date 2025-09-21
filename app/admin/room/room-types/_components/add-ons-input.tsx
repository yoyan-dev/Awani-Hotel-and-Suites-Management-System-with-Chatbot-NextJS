"use client";
import React, { useState } from "react";
import { Input, Button, Chip } from "@heroui/react";
import { Plus } from "lucide-react";
import { formatPHP } from "@/lib/format-php";

interface AddOn {
  name: string;
  price: string;
}

interface AddOnsProps {
  addOns: AddOn[];
  setAddOns: React.Dispatch<React.SetStateAction<AddOn[]>>;
}

export default function AddOns({ addOns, setAddOns }: AddOnsProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addItem = () => {
    if (name.trim()) {
      setAddOns([...addOns, { name: name.trim(), price: price.trim() }]);
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold text-lg">Add-ons</h2>
      <p className="text-sm text-gray-500">
        Click the <span className="font-bold">➕</span> icon to add an item to
        your room.
      </p>

      <div className="flex gap-2">
        <Input
          placeholder="Add-on item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="bordered"
          radius="none"
        />
        <Input
          placeholder="Price 00.00"
          value={price}
          startContent="₱"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          variant="bordered"
          radius="none"
        />
        <Button isIconOnly color="primary" radius="none" onPress={addItem}>
          <Plus />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {addOns.map((row, index) => (
          <Chip
            key={index}
            onClose={() => setAddOns(addOns.filter((_, i) => i !== index))}
          >
            {row.name} {row.price && formatPHP(Number(row.price))}
          </Chip>
        ))}
      </div>
    </div>
  );
}
