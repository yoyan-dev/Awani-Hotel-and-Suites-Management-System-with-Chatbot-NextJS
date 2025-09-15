import { Bed, Home, Inbox, LogOut, Settings, User } from "lucide-react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Awani Hotel Management System",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Dashboard",
      href: "/admin",
    },
    {
      label: "Rooms",
      href: "/admin/room",
    },
    {
      label: "Inventory",
      href: "/admin/inventory",
    },
    {
      label: "Bookings",
      href: "/admin/booking",
    },
    {
      label: "Housekeeping",
      href: "/housekeeping",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/admin",
    },
    {
      label: "Rooms",
      href: "/admin/room",
    },
    {
      label: "Inventory",
      href: "/admin/inventory",
    },
    {
      label: "Bookings",
      href: "/admin/booking",
    },
    {
      label: "Housekeeping",
      href: "/admin/housekeeping",
    },
    {
      label: "Guest",
      href: "/admin/guest",
    },
    {
      label: "Account Management",
      href: "/admin/account",
    },
    {
      label: "Settings",
      href: "/admin/settings",
    },
  ],
  housekeepingNavMenuItems: [
    {
      label: "Dashboard",
      href: "/housekeeping",
      icon: Home,
    },
    {
      label: "Rooms",
      href: "/housekeeping/rooms",
      icon: Bed,
    },
    {
      label: "Guest",
      href: "/housekeeping/guest",
      icon: User,
    },
    {
      label: "Guest Requests",
      href: "/housekeeping/requests",
      icon: Inbox,
    },
    {
      label: "Settings",
      href: "/housekeeping/settings",
      icon: Settings,
    },
    {
      label: "Logout",
      href: "/",
      icon: LogOut,
    },
  ],
  guestNavMenuItems: [
    {
      label: "Home",
      href: "/guest",
    },
    {
      label: "Rooms",
      href: "/guest/rooms",
    },
    {
      label: "About Us",
      href: "/guest/about",
    },
    {
      label: "Contact",
      href: "/guest/contact",
    },
  ],
};
