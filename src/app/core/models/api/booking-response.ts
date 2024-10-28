import {Booking} from "../booking";

export interface BookingResponse {
  booking: Booking;
  sessionToken: string;
}
