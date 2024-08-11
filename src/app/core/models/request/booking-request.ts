import {Passenger} from "../passenger";
import {PaymentMethodEnum} from "../enum/payment-method.enum";

export interface BookingRequest {
  passenger: Passenger;
  passengerCount: number;
  journeyQuoteId: number;
  vehicleModelId: number;
  startTime: string;
  paymentMethodType: PaymentMethodEnum;
}
