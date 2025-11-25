import { Select, SelectItem } from "@heroui/react";
import GuestForm from "../guest/guest-form";
import SelectedGuest from "../../selected-guest";
import { Guest } from "@/types/guest";

export default function GuestInfoSection({ guest }: { guest: Guest }) {
  return (
    <div className="space-y-4 w-full flex flex-col items-start">
      <h1 className="w-full bg-primary px-2 py-1 text-white">
        Guest Information
      </h1>
      <div className="w-full">
        <SelectedGuest guest={guest} />
      </div>
    </div>
  );
}
