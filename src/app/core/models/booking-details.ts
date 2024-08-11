import {PlaceAddress} from "./PlaceAddress";

export interface BookingDetails {
  startTime: Date;
  startAddress: {
    address: string;
    place: PlaceAddress;
  };
  endAddress: {
    address: string;
    place: PlaceAddress;
  };
  passengerCount: number;
}
