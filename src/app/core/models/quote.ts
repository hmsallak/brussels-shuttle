import {VehicleModel} from "./vehicle-model";
import {Address} from "node:cluster";
import {PlaceAddress} from "./place-address";
import {Trip} from "./trip";

export interface Quote {
  id: number;
  trips: Array<Trip>;
  passengerCount: number;
  expirationTime: Date;
  vehicleModelPrices: VehicleModelPrice[];
}

export interface VehicleModelPrice {
  vehicleModel: VehicleModel;
  price: number;
}
