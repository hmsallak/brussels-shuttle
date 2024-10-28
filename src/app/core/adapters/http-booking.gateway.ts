import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BookingRequest} from "../models/api/request/booking-request";
import {map, Observable} from "rxjs";
import {Booking} from "../models/booking";
import {environment} from "../../../environments/environment";
import {BookingResponse} from "../models/api/booking-response";

@Injectable({
  providedIn: 'root'
})
export class HttpBookingGateway{
  http = inject(HttpClient);

  private readonly BOOKING_URL = '/public/booking';

  createBooking(bookingRequest: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(environment.baseUrl + this.BOOKING_URL, bookingRequest).pipe(
      map(booking => ({
        ...booking,
      }))
    );
  }

  getBookingBySessionToken(token: string): Observable<Booking> {
    return this.http.get<Booking>(environment.baseUrl + this.BOOKING_URL + '/by-session-token?token=' + token).pipe(
      map(booking => ({
        ...booking,
      }))
    );
  }
}
