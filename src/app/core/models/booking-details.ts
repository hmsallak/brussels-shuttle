import {TripRequest} from "./api/request/trip-request";

export interface BookingDetails {
  trips: Array<TripRequest>;
  passengerCount: number;
}
