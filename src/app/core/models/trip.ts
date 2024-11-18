import {Booking} from "./booking";
import {PlaceAddress} from "./place-address";
import {RouteMetrics} from "./route-metrics";
import {TripEnum} from "./enum/trip.enum";

export interface Trip {
  id?: number;
  startTime: string;
  startAddress: PlaceAddress;
  type: TripEnum;
  endAddress: PlaceAddress;
  routeMetrics: RouteMetrics;
}
