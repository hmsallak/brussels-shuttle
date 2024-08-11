import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Payment} from "../models/payment";

@Injectable({
  providedIn: 'root'
})
export class HttpPaymentGateway {
  http = inject(HttpClient);

  PAYMENT_STRIPE_URL = '/public/payment/';

  getPaymentBySessionId(sessionStripeId: string): Observable<Payment> {
    const params = new HttpParams()
      .set('sessionStripeId', sessionStripeId);

    return this.http.get<Payment>(environment.baseUrl + this.PAYMENT_STRIPE_URL + 'by-session-stripe/' + sessionStripeId).pipe(
      map(response => ({
          ...response,
        })
      ));
  }
}
