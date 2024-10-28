import {Booking} from "./booking";
import {PlaceAddress} from "./place-address";
import {RouteMetrics} from "./route-metrics";

export interface Trip {
  id?: number;
  startTime: string;
  startAddress: PlaceAddress;
  endAddress: PlaceAddress;
  routeMetrics: RouteMetrics;
}
