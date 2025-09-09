import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./lib/supabase/server";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Middleware user:", user);

  // redirect root to guest
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/guest", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/auth") && user) {
    let redirectTo = "/";
    if (user.app_metadata?.roles?.includes("admin")) redirectTo = "/admin";
    else if (user.app_metadata?.roles?.includes("housekeeping"))
      redirectTo = "/housekeeping";
    else if (user.app_metadata?.roles?.includes("front_office"))
      redirectTo = "/front_office";

    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!user || !user.app_metadata?.roles?.includes("admin")) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/housekeeping")) {
    if (!user || !user.app_metadata?.roles?.includes("housekeeping")) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/front_office")) {
    if (!user || !user.app_metadata?.roles?.includes("front_office")) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

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
