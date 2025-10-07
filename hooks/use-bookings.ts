import {
  addBooking,
  deleteBooking,
  fetchBooking,
  fetchBookings,
  updateBooking,
} from "@/features/booking/booking-thunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Booking, FetchBookingParams } from "@/types/booking";

export function useBookings() {
  const dispatch = useAppDispatch();
  const { bookings, booking, isLoading, error } = useAppSelector(
    (state) => state.booking
  );
  return {
    booking,
    bookings,
    isLoading,
    error,
    fetchBookings: (payload: FetchBookingParams | undefined) =>
      dispatch(fetchBookings(payload)),
    fetchBooking: (id: string) => dispatch(fetchBooking(id)),
    addBooking: (payload: FormData) => dispatch(addBooking(payload)),
    updateBooking: (payload: Booking) => dispatch(updateBooking(payload)),
    deleteBooking: (id: string) => dispatch(deleteBooking(id)),
  };
}
