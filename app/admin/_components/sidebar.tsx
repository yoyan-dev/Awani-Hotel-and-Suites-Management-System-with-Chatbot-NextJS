'use client'
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ChartPie, Blinds, ShoppingCart, Notebook, Bookmark , ShieldUser, Settings, CircleArrowOutDownLeft } from 'lucide-react';
import {Listbox, ListboxItem, cn} from "@heroui/react";
import { Logo } from "@/components/icons";

export const ListboxWrapper = ({children}: any) => {
  return(
    <div className="w-64 h-screen max-w-64 space-y-4 border-small px-2 py-4 rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  )
};

export default function Sidebar() {
   const pathname = usePathname();
  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";
  const boxClasses = pathname === '/admin' ? 'bg-gray-50 text-warning-800 dark:text-warning-600' : ''

  return (
    <div className="bg-white dark:bg-gray-800">
      <ListboxWrapper>
        <NextLink className="flex justify-start items-center gap-1" href="/admin">
          <Logo />
          <p className="font-bold text-inherit">Awani</p>
        </NextLink>
        <Listbox aria-label="Listbox menu with icons" variant="faded">
          <ListboxItem  className={boxClasses} as={NextLink} href="/admin" key="home" startContent={<ChartPie className={iconClasses} />}>
            Dashboard
          </ListboxItem>
          <ListboxItem  as={NextLink} href="/admin/room" key="room" startContent={<Blinds className={iconClasses} />}>
            Rooms
          </ListboxItem>
          <ListboxItem  as={NextLink} href="/admin/inventory"
            key="inventory"
            startContent={<ShoppingCart className={iconClasses} />}
          >
            Inventory
          </ListboxItem>
          <ListboxItem  as={NextLink} href="/admin/booking"
            key="booking"
            startContent={<Notebook className={iconClasses} />}
          >
            Bookings
          </ListboxItem>
          <ListboxItem  as={NextLink} href="/admin/feedback"
            key="feedback"
            startContent={<Bookmark className={iconClasses} />}
          >
            Feedbacks
          </ListboxItem>
          <ListboxItem  as={NextLink} href="/admin/users"
            key="user"
            startContent={<ShieldUser className={iconClasses} />}
          >
            Users
          </ListboxItem>
          <ListboxItem  as={NextLink} href="/admin/settings"
            key="setting"
            showDivider
            startContent={<Settings className={iconClasses} />}
          >
            Settings
          </ListboxItem>
          <ListboxItem  as={NextLink} href="/admin"
            key="logout"
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
