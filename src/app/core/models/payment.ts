import {PaymentMethodEnum} from "./enum/payment-method.enum";
import {CurrencyEnum} from "./enum/currency.enum";
import {Booking} from "./booking";

export interface Payment {
  id?: number;
  booking: Booking;
  amount: number;
  paymentMethodType: PaymentMethodEnum;
  currencyType: CurrencyEnum;
  sessionStripeId?: string;
  timestamp: string;
}
