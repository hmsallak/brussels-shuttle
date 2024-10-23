import {VehicleModel} from "./vehicle-model";
import {PaymentMethodEnum} from "./enum/payment-method.enum";
import {JourneyQuote} from "./journey-quote";

export interface BookingBuilder {
  startTime?: Date;
  journeyQuote?: JourneyQuote;
  passengerCount?: number;
  vehicleModel?: VehicleModel;
  paymentMethodType?: PaymentMethodEnum;
}
