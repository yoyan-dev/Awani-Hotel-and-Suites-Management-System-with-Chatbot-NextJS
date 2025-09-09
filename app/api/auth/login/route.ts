import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabase-client";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    // Try login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: {
            title: "Error",
            description: error.message,
            color: "danger",
          },
        },
        { status: 400 }
      );
    }

    const user = data.user;

    // Check if email is not confirmed
    if (user && !user.email_confirmed_at) {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
      });

      if (resendError) {
        return NextResponse.json(
          {
            success: false,
            message: {
              title: "Error",
              description: "Failed to resend confirmation link.",
              color: "danger",
            },
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: {
            title: "Verify Email",
            description:
              "Email not confirmed. A new verification link has been sent.",
            color: "warning",
          },
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: {
        title: "Success",
        description: "Login successful",
        color: "success",
      },
      data: user,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: {
          title: "Error",
          description: err.message,
          color: "danger",
        },
      },
      { status: 500 }
    );
  }
}
