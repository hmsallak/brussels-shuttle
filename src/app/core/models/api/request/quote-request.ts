import {TripRequest} from "./trip-request";

export interface QuoteRequest {
  trips: Array<TripRequest>;
  passengerCount: number;
}
