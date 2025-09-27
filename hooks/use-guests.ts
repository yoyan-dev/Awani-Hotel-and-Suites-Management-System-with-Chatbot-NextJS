import {
  addGuest,
  deleteGuest,
  fetchGuest,
  fetchGuests,
  updateGuest,
} from "@/features/guest/guest-thunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Guest } from "@/types/guest";

export function useGuests() {
  const dispatch = useAppDispatch();
  const { guests, guest, isLoading, error } = useAppSelector(
    (state) => state.guests
  );
  return {
    guests,
    guest,
    isLoading,
    error,
    fetchGuests: () => dispatch(fetchGuests()),
    fetchGuest: (id: string) => dispatch(fetchGuest(id)),
    addGuest: (payload: FormData) => dispatch(addGuest(payload)),
    updateGuest: (payload: Guest) => dispatch(updateGuest(payload)),
    deleteGuest: (id: string) => dispatch(deleteGuest(id)),
  };
}
