import {Passenger} from "./passenger";
import {VehicleModel} from "./vehicle-model";
import {Trip} from "./Trip";
import {PaymentMethodEnum} from "./enum/payment-method.enum";

export interface Booking {
  id: number;
  passenger: Passenger;
  timestamp: Date;
  trip: Trip;
  vehicleModel: VehicleModel;
  amount: number;
  paymentMethodType: PaymentMethodEnum;
}
