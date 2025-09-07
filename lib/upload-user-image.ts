import { supabase } from "./supabase-client";

export async function uploadUserImage(file: File, id: string) {
  const filePath = `user-${id}/${file.name}`;

  const { error } = await supabase.storage
    .from("user-images")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("user-images").getPublicUrl(filePath);

  return data.publicUrl;
}
