import { Booking } from "@/types/booking";
import { calculateBookingPrice, getNights } from "./pricing";

export function generateSummary(
  booking: Booking,
  specialRequests: { name: string; price: string; quantity: number }[]
) {
  const totalAddOnsPrice = specialRequests.reduce(
    (acc: number, item: { price: string; quantity: number }) =>
      acc + Number(item.price) * (item.quantity || 0),
    0
  );

  const nights = getNights(booking.check_in, booking.check_out);
  const totalPerNights = calculateBookingPrice(booking);
  const total = totalPerNights + totalAddOnsPrice;
  const balance = total - (booking.amount_paid || 0);
  return {
    specialRequests,
    roomPrice: booking.room_type.price,
    totalAddOnsPrice,
    nights,
    totalPerNights,
    total,
    paymentMethod: booking.payment_method,
    ammountPaid: booking.amount_paid,
    balance,
    status: balance <= 0 ? "paid" : "deposit",
  };
}
