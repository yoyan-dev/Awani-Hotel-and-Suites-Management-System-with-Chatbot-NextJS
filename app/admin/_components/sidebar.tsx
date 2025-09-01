import NextLink from "next/link";
import { ChartPie, Blinds, ShoppingCart, Notebook, Bookmark , ShieldUser, Settings, CircleArrowOutDownLeft } from 'lucide-react';
import {Listbox, ListboxItem, cn} from "@heroui/react";
import { Logo } from "@/components/icons";

export const ListboxWrapper = ({children}: any) => (
  <div className="w-64 h-screen max-w-64 space-y-4 border-small px-2 py-4 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function Sidebar() {
  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";

  return (
    <div className="bg-white dark:bg-gray-800">
      <ListboxWrapper>
        <NextLink className="flex justify-start items-center gap-1" href="/">
          <Logo />
          <p className="font-bold text-inherit">Awani</p>
        </NextLink>
        <Listbox aria-label="Listbox menu with icons" variant="faded">
          <ListboxItem key="new" startContent={<ChartPie className={iconClasses} />}>
            Dashboard
          </ListboxItem>
          <ListboxItem key="copy" startContent={<Blinds className={iconClasses} />}>
            Rooms
          </ListboxItem>
          <ListboxItem
            key="edit"
            startContent={<ShoppingCart className={iconClasses} />}
          >
            Inventory
          </ListboxItem>
          <ListboxItem
            key="edit"
            startContent={<Notebook className={iconClasses} />}
          >
            Bookings
          </ListboxItem>
          <ListboxItem
            key="edit"
            startContent={<Bookmark className={iconClasses} />}
          >
            Feedbacks
          </ListboxItem>
          <ListboxItem
            key="edit"
            startContent={<ShieldUser className={iconClasses} />}
          >
            Users
          </ListboxItem>
          <ListboxItem
            key="edit"
            showDivider
            startContent={<Settings className={iconClasses} />}
          >
            Settings
          </ListboxItem>
          <ListboxItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<CircleArrowOutDownLeft className={cn(iconClasses, "text-danger")} />}
          >
            Log out
          </ListboxItem>
        </Listbox>
      </ListboxWrapper>
    </div>
  );
}
