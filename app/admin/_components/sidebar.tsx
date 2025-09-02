'use client'
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ChartPie, Bed, ShoppingCart, Notebook, Bookmark , ShieldUser, Settings, CircleArrowOutDownLeft } from 'lucide-react';
import {Listbox, ListboxItem, cn} from "@heroui/react";
import { Logo } from "@/components/icons";

export const ListboxWrapper = ({children}: any) => {
  return(
    <div className="w-64 h-screen max-w-64 space-y-4 border-small px-2 py-4 text-white rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  )
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-primary dark:bg-primary-100 hidden lg:block">
      <ListboxWrapper>
        <NextLink className="flex justify-start items-center gap-1" href="/admin">
          <Logo />
          <p className="font-bold text-inherit">Awani</p>
        </NextLink>
        <Listbox aria-label="Listbox menu with icons" variant="faded">
          <ListboxItem  className={pathname === '/admin' ? 'bg-primary-400 text-white dark:text-primary-300' : ''} as={NextLink} href="/admin" key="home" startContent={<ChartPie />}>
            Dashboard
          </ListboxItem>
          <ListboxItem className={pathname === '/admin/room' ? 'bg-primary-400 text-white dark:text-primary-300' : ''}  as={NextLink} href="/admin/room" key="room" startContent={<Bed />}>
            Rooms
          </ListboxItem>
          <ListboxItem  className={pathname === '/admin/inventory' ? 'bg-primary-400 text-white dark:text-primary-300' : ''}  as={NextLink} href="/admin/inventory"
            key="inventory"
            startContent={<ShoppingCart />}
          >
            Inventory
          </ListboxItem>
          <ListboxItem  className={pathname === '/admin/booking' ? 'bg-primary-400 text-white dark:text-primary-300' : ''}  as={NextLink} href="/admin/booking"
            key="booking"
            startContent={<Notebook />}
          >
            Bookings
          </ListboxItem>
          {/* <ListboxItem  as={NextLink} href="/admin/feedback"
            key="feedback"
            startContent={<Bookmark />}
          >
            Feedbacks
          </ListboxItem> */}
          <ListboxItem  className={pathname === '/admin/guest' ? 'bg-primary-400 text-white dark:text-primary-300' : ''}  as={NextLink} href="/admin/guest"
            key="guest"
            startContent={<ShieldUser />}
          >
            Guest
          </ListboxItem>
          <ListboxItem  className={pathname === '/admin/housekeeping' ? 'bg-primary-400 text-white dark:text-primary-300' : ''}  as={NextLink} href="/admin/housekeeping"
            key="housekeeping"
            startContent={<ShieldUser />}
          >
            Housekeeping
          </ListboxItem>
          <ListboxItem  className={pathname === '/admin/setting' ? 'bg-primary-400 text-white dark:text-primary-300' : ''}  as={NextLink} href="/admin/settings"
            key="setting"
            showDivider
            startContent={<Settings />}
          >
            Settings
          </ListboxItem>
          <ListboxItem  as={NextLink} href="/admin"
            key="logout"
            color="danger"
            startContent={<CircleArrowOutDownLeft />}
          >
            Log out
          </ListboxItem>
        </Listbox>
      </ListboxWrapper>
    </div>
  );
}
