import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button, Image, Spinner, User, Skeleton } from "@heroui/react";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { usePathname } from "next/navigation";
import { User as UserType } from "@/types/users";

interface NavbarProps {
  user: UserType | null;
  isLoading: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user, isLoading }) => {
  const pathname = usePathname();
  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="top-0 z-50 bg-white dark:bg-gray-900 "
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <div className="sm:hidden">
          <NavbarMenuToggle />
        </div>
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image alt="Awani logo" src="/awani-logo.png" width={50} />
            <div>
              <p className="font-bold text-inherit">MA. Awani</p>
              <span className="text-gray-500 text-sm font-">
                Hotel and suites
              </span>
            </div>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {siteConfig.guestNavMenuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              color={item.href === pathname ? "primary" : "foreground"}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          {isLoading ? (
            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-10 h-10" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
          ) : user?.id ? (
            <User
              avatarProps={{
                src:
                  user?.user_metadata?.image ??
                  "https://www.bing.com/ck/a?!&&p=0cce35addb0ad145ee7f6c78e5bb7f91bc1b501db82614a39415208ae0ebf729JmltdHM9MTc1ODMyNjQwMA&ptn=3&ver=2&hsh=4&fclid=28034f8f-5cb8-698d-278e-59955dac6878&u=a1L2ltYWdlcy9zZWFyY2g_cT1kZWZhdWx0K3VzZXIraW1hZ2UmaWQ9MEE3NEI0ODAwNDYyRjE0Q0E4ODVEMEVBQzVFQ0JBN0M0MjRDNDhCRiZGT1JNPUlBQ0ZJUg&ntb=1",
              }}
              description={user?.app_metadata?.roles?.[0] || "Guest"}
              name={user?.user_metadata?.full_name}
            />
          ) : (
            <Button as={Link} href="/auth" color="primary" variant="bordered">
              Sign Up
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />

        {isLoading ? (
          <Skeleton className="flex rounded-full w-10 h-10" />
        ) : user?.id ? (
          <User
            avatarProps={{
              src:
                user?.user_metadata?.image ??
                "https://www.bing.com/ck/a?!&&p=0cce35addb0ad145ee7f6c78e5bb7f91bc1b501db82614a39415208ae0ebf729JmltdHM9MTc1ODMyNjQwMA&ptn=3&ver=2&hsh=4&fclid=28034f8f-5cb8-698d-278e-59955dac6878&u=a1L2ltYWdlcy9zZWFyY2g_cT1kZWZhdWx0K3VzZXIraW1hZ2UmaWQ9MEE3NEI0ODAwNDYyRjE0Q0E4ODVEMEVBQzVFQ0JBN0M0MjRDNDhCRiZGT1JNPUlBQ0ZJUg&ntb=1",
            }}
            description=""
            name=""
          />
        ) : (
          <Button as={Link} href="/auth" color="primary" variant="bordered">
            Sign Up
          </Button>
        )}
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.guestNavMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={item.href === pathname ? "primary" : "foreground"}
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};

export default Navbar;
