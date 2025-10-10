"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Listbox, ListboxItem, cn } from "@heroui/react";
import { siteConfig } from "@/config/site";
import { useState } from "react";
import UserPopover from "./user-popover";

export const ListboxWrapper = ({ children, collapsed }: any) => {
  return (
    <div
      className={cn(
        "relative h-screen flex flex-col border-r border-default-200 dark:border-default-100 transition-all duration-300 ease-in-out",
        collapsed ? "w-[5rem]" : "w-[16rem]"
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
    <aside className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl hidden lg:flex shadow-xl">
      <ListboxWrapper collapsed={collapsed}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 z-40 bg-primary-500 text-white p-1.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        <div
          className={cn(
            "flex items-center gap-2 bg-gradient-to-r from-primary-100/70 to-primary-50/60 dark:from-gray-800 dark:to-gray-700 p-3 rounded-lg shadow-sm m-3 transition-all duration-300",
            collapsed && "justify-center bg-white  shadow-none"
          )}
        >
          <UserPopover collapsed={collapsed} />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-2 mt-3">
          <Listbox
            items={siteConfig.housekeepingNavMenuItems}
            aria-label="Housekeeping Menu"
            variant="faded"
            className="space-y-1"
          >
            {(item) => {
              const isActive = pathname === item.href;
              return (
                <ListboxItem
                  key={item.href}
                  as={NextLink}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 py-3 px-3 rounded-md transition-all duration-200",
                    isActive
                      ? "text-primary-500 font-semibold border-l-4 border-primary-500 bg-primary-50/30 dark:bg-primary-900/10"
                      : item.label === "Logout"
                        ? "text-red-500 hover:text-red-600"
                        : "text-gray-600 dark:text-gray-300 hover:text-primary-500"
                  )}
                  startContent={
                    <item.icon
                      size={20}
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "text-primary-500"
                          : "text-gray-400 group-hover:text-primary-500"
                      )}
                    />
                  }
                >
                  {!collapsed ? item.label : ""}
                </ListboxItem>
              );
            }}
          </Listbox>
        </nav>

        <div className="mt-auto mb-3 px-4 text-xs text-gray-400 dark:text-gray-500">
          {!collapsed && <p>© 2025 MA. AWANI</p>}
        </div>
      </ListboxWrapper>
    </aside>
  );
}
