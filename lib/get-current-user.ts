import { User } from "@/types/users";
import { supabase } from "./supabase-client";

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user as User;
}
