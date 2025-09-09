"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartPie,
  Bed,
  ShoppingCart,
  Notebook,
  Bookmark,
  ShieldUser,
  Settings,
  CircleArrowOutDownLeft,
  BrushCleaning,
  Users,
} from "lucide-react";
import { Listbox, ListboxItem, cn, User } from "@heroui/react";
import { siteConfig } from "@/config/site";

export const ListboxWrapper = ({ children }: any) => {
  return (
    <div className="w-64 h-screen max-w-64 space-y-4 border-small px-2 py-4 text-white rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  );
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-primary dark:bg-primary-100 hidden lg:block">
      <ListboxWrapper>
        <NextLink
          className="flex justify-start items-center gap-1 bg-white text-gray-900 dark:text-white dark:bg-gray-800 p-4 rounded"
          href="/admin"
        >
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            description="Admin"
            name="Jane Doe"
          />
        </NextLink>
        <Listbox
          items={siteConfig.housekeepingNavMenuItems}
          aria-label="Listbox menu with icons"
          variant="faded"
          defaultSelectedKeys={[pathname]}
        >
          {(item) => (
            <ListboxItem
              className={
                pathname === item.href
                  ? "bg-primary-400 text-white dark:text-primary-50"
                  : item.label === "Logout"
                    ? "text-warning"
                    : ""
              }
              as={NextLink}
              href={item.href}
              key={item.href}
              startContent={<item.icon />}
            >
              {item.label}
            </ListboxItem>
          )}
        </Listbox>
      </ListboxWrapper>
    </div>
  );
}
