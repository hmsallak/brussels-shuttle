import {VehicleModel} from "./vehicle-model";
import {Address} from "node:cluster";
import {PlaceAddress} from "./PlaceAddress";

export interface JourneyQuote {
  id: number;
  startAddress: PlaceAddress;
  endAddress: PlaceAddress;
  distanceInKilometers: number;
  durationInSeconds: number;
  expirationTime: Date;
  vehicleModelPrices: VehicleModelPrice[];
}

export interface VehicleModelPrice {
  vehicleModel: VehicleModel;
  price: number;
}
