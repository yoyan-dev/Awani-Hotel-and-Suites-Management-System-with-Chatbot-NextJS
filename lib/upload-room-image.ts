import { supabase } from "./supabase-client";

export async function uploadRoomImage(file: File, roomNumber: number) {
  const filePath = `room-${roomNumber}/${file.name}`;

  const { error } = await supabase.storage
    .from("room-images")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("room-images").getPublicUrl(filePath);

  return data.publicUrl;
}
