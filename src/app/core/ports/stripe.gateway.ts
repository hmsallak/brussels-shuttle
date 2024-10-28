import {Observable} from "rxjs";
import {PaymentIntentResponse} from "../models/api/payment-intent-response";
import {CheckoutSessionResponse} from "../models/api/checkout-session-response";

export abstract class StripeGateway {
  abstract createCheckoutSession(sessionToken: string): Observable<CheckoutSessionResponse>;
}
