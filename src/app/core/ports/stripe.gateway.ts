import {Observable} from "rxjs";
import {PaymentIntentResponse} from "../models/request/payment-intent-response";
import {CheckoutSessionResponse} from "../models/request/checkout-session-response";

export abstract class StripeGateway {
  abstract createCheckoutSession(sessionToken: string): Observable<CheckoutSessionResponse>;
}
