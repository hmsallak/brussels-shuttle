import {Booking} from "../models/booking";
import {BookingRequest} from "../models/request/booking-request";
import {Observable} from "rxjs";
import {BookingResponse} from "../models/request/booking-response";

export abstract class BookingGateway {
  abstract createBooking(bookingRequest: BookingRequest): Observable<BookingResponse>;
  abstract getBookingBySessionToken(token: string): Observable<Booking>
}
