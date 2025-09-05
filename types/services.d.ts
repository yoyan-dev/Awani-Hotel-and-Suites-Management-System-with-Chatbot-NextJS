type service_category = "room_service" | "housekeeping" | "minibar" | "other";

export interface Service {
  id: number;
  service_id: string;
  name: string;
  price: number;
  category: service_category;
}
