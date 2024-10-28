import {Passenger} from "../../passenger";
import {PaymentMethodEnum} from "../../enum/payment-method.enum";
import {BillingAddress} from "../../billing-address";

export interface BookingRequest {
  passenger: Passenger;
  passengerCount: number;
  quoteId: number;
  vehicleModelId: number;
  paymentMethodType: PaymentMethodEnum;
  billingAddress?: BillingAddress;
}
