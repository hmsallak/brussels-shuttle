import {Booking} from "./booking";
import {PlaceAddress} from "./PlaceAddress";

export interface Trip {
  id?: number;
  startTime: string;
  passengerCount: number;
  booking: Booking;
  startAddress: PlaceAddress;
  endAddress: PlaceAddress;
  distanceInKilometers: number;
  durationInSeconds: number;
  flightNumber?: string;
}
