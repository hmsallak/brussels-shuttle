import {Passenger} from "./passenger";
import {VehicleModel} from "./vehicle-model";
import {Trip} from "./trip";
import {PaymentMethodEnum} from "./enum/payment-method.enum";
import {BillingAddress} from "./billing-address";

export interface Booking {
  id: number;
  passenger: Passenger;
  passengerCount: number;
  billingAddress?: BillingAddress;
  timestamp: Date;
  trips: Array<Trip>;
  vehicleModel: VehicleModel;
  amount: number;
  paymentMethodType: PaymentMethodEnum;
}
