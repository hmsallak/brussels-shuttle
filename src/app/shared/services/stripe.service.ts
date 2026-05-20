import {inject, Injectable} from "@angular/core";
import {injectStripe} from "ngx-stripe";
import {environment} from "../../../environments/environment";
import {catchError, map, of} from "rxjs";
import {StripeGateway} from "../../core/ports/stripe.gateway";

@Injectable({
  providedIn: 'root'
})
export class StripeService{
  stripeService = injectStripe(environment.STRIPE_PUBLIC_KEY);
  stripeGateway = inject(StripeGateway);

  startPaymentCheckout(sessionToken: string) {
    return this.stripeGateway.createCheckoutSession(sessionToken).pipe(
      map(checkoutSession => {
        this.stripeService.redirectToCheckout({ sessionId: checkoutSession.sessionId }).subscribe(() => {
        });
      }),
      catchError(error => {
        console.error('Error:', error);
        return of(error);
      })
    );
  }
}
