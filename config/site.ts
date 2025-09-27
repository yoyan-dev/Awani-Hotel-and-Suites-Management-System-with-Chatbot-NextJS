import {
  Bed,
  BrushCleaning,
  ChartPie,
  Home,
  icons,
  Inbox,
  List,
  LogOut,
  Notebook,
  Settings,
  ShieldUser,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Awani Hotel Management System",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Dashboard",
      href: "/admin",
      isExpandable: false,
      icon: ChartPie,
    },
    {
      label: "Room Management",
      href: "/admin/room",
      isExpandable: true,
      icon: Bed,
    },
    {
      label: "Inventory",
      href: "/admin/inventory",
      isExpandable: false,
      icon: ShoppingCart,
    },
    {
      label: "Bookings",
      href: "/admin/booking",
      isExpandable: false,
      icon: Notebook,
    },
    {
      label: "Housekeeping",
      href: "/admin/housekeeping",
      isExpandable: false,
      icon: BrushCleaning,
    },
    {
      label: "Guest",
      href: "/admin/guest",
      isExpandable: false,
      icon: Users,
    },
    {
      label: "Staff Management",
      href: "/admin/account",
      isExpandable: false,
      icon: ShieldUser,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      isExpandable: false,
      icon: Settings,
    },
    {
      label: "Log out",
      href: "/",
      isExpandable: false,
      icon: LogOut,
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
      label: "Tasks",
      href: "/housekeeping/tasks",
      icon: List,
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
