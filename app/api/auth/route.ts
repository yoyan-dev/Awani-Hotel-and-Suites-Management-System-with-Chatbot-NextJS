import { supabaseAdmin } from "@/lib/supabase/admin";
import { ApiResponse } from "@/types/response";
import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { Admin } from "@/types/admin";

// export async function GET() {
//   const { data, error } = await supabaseAdmin.auth.admin.createUser({
//     email: "admin@example.com",
//     password: "password",
//     email_confirm: true,
//     app_metadata: {
//       roles: ["admin"],
//       permissions: ["*"],
//     },
//     user_metadata: {
//       name: "System Admin",
//     },
//   });

//   if (error) {
//     console.error("Supabase create error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: {
//           title: "Error",
//           description: error.message,
//           color: "danger",
//         },
//       },
//       { status: 400 }
//     );
//   }

//   return NextResponse.json(
//     {
//       success: true,
//       message: {
//         title: "Success",
//         description: "Account registered successfully.",
//         color: "success",
//       },
//       data: data.user,
//     },
//     { status: 201 }
//   );
// }

// GET ALL

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();

    // Fetch all users from Supabase Auth
    const { data: users, error } = await supabase.auth.admin.listUsers();

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

    return NextResponse.json(
      {
        success: true,
        message: {
          title: "Success",
          description: "",
          color: "success",
        },
        data: users,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Unexpected error:", err);
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

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const formData = await req.formData();
    const formObj = Object.fromEntries(formData.entries());

    const { email, password, ...metadata } = formObj;

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: email as string,
      password: password as string,
      user_metadata: metadata,
      app_metadata: {
        roles: (formObj.roles as string)?.split(",") ?? ["guest"],
        department: (formObj.department as string) ?? "General",
        permissions: ["create", "update"],
      },
    });

    if (error) {
      console.error("Supabase create error:", error);
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

    return NextResponse.json(
      {
        success: true,
        message: {
          title: "Success",
          description: "Account registered successfully.",
          color: "success",
        },
        data: data.user,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Unexpected error:", err);
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
