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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Listbox, ListboxItem, cn, User } from "@heroui/react";
import { siteConfig } from "@/config/site";
import { useState } from "react";
import UserPopover from "./user-popover";

export const ListboxWrapper = ({ children, collapsed }: any) => {
  return (
    <div
      className={cn(
        "relative h-screen border-r border-default-200 dark:border-default-100 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {children}
    </div>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md hidden lg:block shadow-lg">
      <ListboxWrapper collapsed={collapsed}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 z-10 bg-primary-500 text-white p-1.5 rounded-full shadow hover:scale-105 transition"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        <div
          className={cn(
            "flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm transition-all duration-300",
            collapsed && "justify-center"
          )}
        >
          <UserPopover collapsed={collapsed} />
        </div>
        <Listbox
          items={siteConfig.navItems}
          aria-label="Listbox menu with icons"
          variant="faded"
          className="mt-4"
        >
          {(item) => {
            const isActive = pathname === item.href;
            return (
              <ListboxItem
                key={item.href}
                as={NextLink}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary-500 text-white shadow-md"
                    : item.label === "Logout"
                      ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                startContent={<item.icon size={20} />}
              >
                {!collapsed ? item.label : ""}
              </ListboxItem>
            );
          }}
        </Listbox>
      </ListboxWrapper>
    </div>
  );
}
