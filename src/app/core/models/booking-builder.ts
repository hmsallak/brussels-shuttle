import {VehicleModel} from "./vehicle-model";
import {PaymentMethodEnum} from "./enum/payment-method.enum";
import {Quote} from "./quote";

export interface BookingBuilder {
  quote?: Quote;
  passengerCount?: number;
  vehicleModel?: VehicleModel;
  paymentMethodType?: PaymentMethodEnum;
}
