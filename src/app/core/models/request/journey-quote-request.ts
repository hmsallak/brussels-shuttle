
import {PlaceAddress} from "../PlaceAddress";

export interface JourneyQuoteRequest {
  startAddress: PlaceAddress;
  endAddress: PlaceAddress;
  startTime: Date | null;
}
