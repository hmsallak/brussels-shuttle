import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {VehicleModel} from "../models/vehicle-model";
import {environment} from "../../../environments/environment";
import {PaymentIntentResponse} from "../models/request/payment-intent-response";
import {CheckoutSessionResponse} from "../models/request/checkout-session-response";

@Injectable({
  providedIn: 'root'
})
export class HttpStripeGateway {
  http = inject(HttpClient);

  CREATE_CHECKOUT_SESSION_URL = '/public/stripe/create-checkout-session';

  createCheckoutSession(sessionToken: string): Observable<CheckoutSessionResponse> {
    const params = new HttpParams()
      .set('token', sessionToken)
    return this.http.post<CheckoutSessionResponse>(environment.baseUrl + this.CREATE_CHECKOUT_SESSION_URL, null,{ params }).pipe(
      map(response => ({
          ...response,
        })
    ));
  }
}
