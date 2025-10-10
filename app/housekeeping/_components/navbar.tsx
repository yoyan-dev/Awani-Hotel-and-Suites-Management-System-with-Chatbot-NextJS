"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Image, Input, User } from "@heroui/react";
import { Link } from "@heroui/link";
import { SearchIcon } from "lucide-react";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <HeroUINavbar
      isBlurred
      maxWidth="xl"
      position="sticky"
      className="top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 
                 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-sm"
    >
      <NavbarContent className="gap-3" justify="start">
        <NavbarBrand as="li">
          <NextLink
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            <Image
              alt="Awani logo"
              src="/awani-logo.png"
              width={42}
              height={42}
            />
            <div className="leading-tight">
              <p className="font-semibold text-base text-gray-800 dark:text-gray-100">
                Awani
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Hotel & Suites
              </span>
            </div>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-3" justify="end">
        <Input
          startContent={<SearchIcon size={16} />}
          placeholder="Search..."
          classNames={{
            inputWrapper:
              "bg-gray-100 dark:bg-gray-800 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition",
            input: "text-sm",
          }}
          size="sm"
        />
        <ThemeSwitch />
        <User
          name="Admin"
          description="Housekeeping"
          avatarProps={{
            src: "/avatar-placeholder.png",
          }}
          className="cursor-pointer"
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-2" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/80">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.housekeepingNavMenuItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <Link
                as={NextLink}
                href={item.href}
                color={pathname === item.href ? "primary" : "foreground"}
                size="lg"
                className={`${
                  pathname === item.href
                    ? "font-semibold text-primary-600 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary-500"
                } transition`}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          <NavbarMenuItem key="logout">
            <Link
              href="/"
              color="danger"
              size="lg"
              className="font-semibold text-red-500 hover:text-red-600 transition"
            >
              Logout
            </Link>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
}
