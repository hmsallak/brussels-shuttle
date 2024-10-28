import {PlaceAddress} from "../../place-address";
import {TripEnum} from "../../enum/trip.enum";

export interface TripRequest {
  startAddress: PlaceAddress;
  endAddress: PlaceAddress;
  startTime: string;
  type: TripEnum;
}
