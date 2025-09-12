import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  // Create a response so Supabase can attach refreshed cookies if needed
  let res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

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

  // if (pathname.startsWith("/front_office")) {
  //   if (
  //     !user ||
  //     !(user.app_metadata?.roles || user.user_metadata?.roles)?.includes(
  //       "front_office"
  //     )
  //   ) {
  //     return NextResponse.redirect(new URL("/auth", req.url));
  //   }
  // }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/auth",
    "/admin/:path*",
    "/housekeeping/:path*",
    "/front_office/:path*",
  ],
};
