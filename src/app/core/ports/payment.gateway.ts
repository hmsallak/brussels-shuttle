import {Observable} from "rxjs";
import {Payment} from "../models/payment";

export abstract class PaymentGateway {
  abstract getPaymentBySessionId(sessionStripeId: string): Observable<Payment>;
}
