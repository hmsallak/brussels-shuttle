import {Observable} from "rxjs";
import {VehicleModel} from "../models/vehicle-model";
import {Payment} from "../models/payment";

export abstract class PaymentGateway {
  abstract getPaymentBySessionId(sessionStripeId: string): Observable<Payment>;
}
