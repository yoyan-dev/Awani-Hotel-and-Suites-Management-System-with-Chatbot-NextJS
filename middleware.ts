import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./lib/auth/index";

export async function middleware(req: NextRequest) {
  // Create a response so Supabase can attach refreshed cookies if needed
  let res = NextResponse.next();

  const { user, error } = await getCurrentUser();

  console.log("Middleware user:", user, "Error:", error);

  const { pathname } = req.nextUrl;

  // redirect root to guest
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/guest", req.url));
  }

  // prevent logged in user from visiting /auth
  if (pathname.startsWith("/auth") && user) {
    let redirectTo = "/guest";
    const roles = user.app_metadata?.roles || user.user_metadata?.roles;

    if (roles?.includes("admin")) {
      redirectTo = "/admin";
    } else if (roles?.includes("housekeeping")) {
      redirectTo = "/housekeeping";
    }

    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  // route protections
  // if (pathname.startsWith("/admin")) {
  //   if (
  //     !user ||
  //     !(user.app_metadata?.roles || user.user_metadata?.roles)?.includes(
  //       "admin"
  //     )
  //   ) {
  //     return NextResponse.redirect(new URL("/auth", req.url));
  //   }
  // }

  // if (pathname.startsWith("/housekeeping")) {
  //   if (
  //     !user ||
  //     !(user.app_metadata?.roles || user.user_metadata?.roles)?.includes(
  //       "housekeeping"
  //     )
  //   ) {
  //     return NextResponse.redirect(new URL("/auth", req.url));
  //   }
  // }

  return res;
}

export const config = {
  matcher: ["/", "/auth", "/admin/:path*", "/housekeeping/:path*"],
};
