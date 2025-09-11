import { ApiResponse } from "@/types/response";
import { addToast } from "@heroui/react";

export async function apiHandler<T>(
  request: Promise<Response>,
  errorMessage: string
): Promise<T> {
  try {
    const res = await request;
    const data: ApiResponse<T> = await res.json();

    const message =
      typeof data.message === "string"
        ? {
            title: data.success ? "Success" : "Error",
            description: data.message,
          }
        : {
            title: data.message.title ?? "Notice",
            description: data.message.description ?? "",
          };

    addToast({
      title: message.title,
      description: message.description,
      color: data.success ? "success" : "danger",
    });

    if (!res.ok || !data.success) throw new Error(errorMessage);

    return data.data as T;
  } catch (err: any) {
    addToast({
      title: "Error",
      description: err.message ?? errorMessage,
      color: "danger",
    });
    throw err;
  }
}
