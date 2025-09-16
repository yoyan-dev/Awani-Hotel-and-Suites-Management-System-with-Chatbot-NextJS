"use client";
import React, { useState } from "react";
import { Input, Button, Chip } from "@heroui/react";
import { Plus } from "lucide-react";

interface AmenitiesInputProps {
  amenities: string[];
  setAmenities: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AmenitiesInput({
  amenities,
  setAmenities,
}: AmenitiesInputProps) {
  const [item, setItem] = useState("");

  const addBed = () => {
    if (item.trim()) {
      setAmenities([...amenities, item.trim()]);
      setItem("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2>Amenities</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Add amenities"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          variant="bordered"
          radius="none"
        />
        <Button isIconOnly color="primary" radius="none" onPress={addBed}>
          <Plus />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {amenities.map((ams, index) => (
          <Chip
            key={index}
            onClose={() =>
              setAmenities(amenities.filter((_, i) => i !== index))
            }
          >
            {ams}
          </Chip>
        ))}
      </div>
    </div>
  );
}
