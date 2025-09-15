import { Booking } from "@/types/booking";
import {
  Button,
  Chip,
  Input,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  Textarea,
  CheckboxGroup,
  Checkbox,
} from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState<Partial<Booking>>({});
  const [selectedPurpose, SetSelectedPurpose] = useState<string>("");
  const [step, setStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
  };

  return (
    <div className="flex-1 px-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 ? (
          <div className="space-y-4">
            <h1>
              <Chip color="primary" className="text-sm">
                1
              </Chip>
              -Booking Details
            </h1>
            <Input
              variant="underlined"
              isRequired
              label="Full Name"
              name="fullName"
              placeholder="Enter your name"
            />

            <div className="flex gap-4">
              <Input
                variant="underlined"
                isRequired
                type="date"
                label="Check-in Date"
                name="check_in"
                value={formData.check_in}
                onChange={handleChange}
              />

              <Input
                variant="underlined"
                isRequired
                type="date"
                label="Check-out Date"
                name="check_out"
                value={formData.check_out}
                onChange={handleChange}
              />
            </div>

            <Input
              variant="underlined"
              isRequired
              label="Number of Guests"
              type="number"
              min={1}
              name="guests"
              onChange={handleChange}
            />
            <div className="flex justify-end">
              <Button
                color="primary"
                onPress={() => setStep(step + 1)}
                isIconOnly
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        ) : step === 2 ? (
          <div className="space-y-4">
            <h1>
              <Chip color="primary" className="text-sm">
                2
              </Chip>
              -Health Declaration
            </h1>
            <Textarea
              classNames={{ label: "text-gray-600 dark:text-gray-300" }}
              label="City/Country work visited and transited in the last 30 days."
              labelPlacement="outside"
              variant="bordered"
              name="places_last_visited"
              value={formData.places_last_visited}
              placeholder="Please separate it with commas."
            />
            <RadioGroup
              isRequired
              classNames={{ label: "text-gray-600 dark:text-gray-300" }}
              label="Purpose of Travel"
              orientation="horizontal"
              color="primary"
              value={selectedPurpose}
              onValueChange={SetSelectedPurpose}
            >
              <Radio value="Visiting friends and family">
                Visiting friends and family
              </Radio>
              <Radio value="Business">Business</Radio>
              <Radio value="San Francisco">San Francisco</Radio>
              <Radio value="Mice">Mice</Radio>
              <Radio value="Leisure">Leisure</Radio>
              <Radio value="others">Others</Radio>
            </RadioGroup>

            {selectedPurpose === "others" && (
              <Input
                fullWidth
                placeholder="Please specify"
                variant="underlined"
                className="max-w-xs mt-2"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
              />
            )}
            <CheckboxGroup
              classNames={{ label: "text-gray-600 dark:text-gray-300" }}
              color="secondary"
              label="Please check if you have any of the following at the present or during the past 30 days."
              orientation="horizontal"
              value={formData.recent_sickness}
              onChange={(values) =>
                setFormData({ ...formData, recent_sickness: values })
              }
            >
              <Checkbox value="fever">Fever</Checkbox>
              <Checkbox value="sore throat">Sore Throat</Checkbox>
              <Checkbox value="headeache">Headeache</Checkbox>
              <Checkbox value="body weakness">Body weakness</Checkbox>
              <Checkbox value="difficulty of breathing">
                Difficulty of Breathing
              </Checkbox>
              <Checkbox value="severe diarhea">Severe Diarhea</Checkbox>
            </CheckboxGroup>
            <div className="flex justify-between">
              <Button color="primary" onPress={() => setStep(step - 1)}>
                <ArrowLeft />
              </Button>
              <Button color="primary" onPress={() => setStep(step + 1)}>
                <ArrowRight />
              </Button>
              <Button type="submit" color="primary">
                Book Now
              </Button>
            </div>
          </div>
        ) : step === 3 ? (
          <div className="space-y-4">
            <h1 className="px-2 bg-primary text-white md:text-xl">
              Declaration
            </h1>
            <div>
              <p>
                The information I have given is true, correct and complete. I
                understand failure to answer any question may have serious
                consequences,(Article 171&172 of the revised penal code of the
                Philippines)
              </p>
              <p>Notes and Regulations</p>
              <ol>
                <li>1. First item</li>
                <li>2. Second item</li>
                <li>3. Third item</li>
              </ol>
            </div>
            <div className="flex justify-between">
              <Button color="primary" onPress={() => setStep(step - 1)}>
                <ArrowLeft />
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}
