import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaymentGateway} from "../../core/ports/payment.gateway";
import {AsyncPipe} from "@angular/common";
import {catchError, map, of} from "rxjs";
import {OrderConfirmComponent} from "./order-confirm/order-confirm.component";
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {BookingGateway} from "../../core/ports/booking.gateway";

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [
    AsyncPipe,
    OrderConfirmComponent,
    LottieComponent
  ],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css'
})
export class SuccessPageComponent {
  private route = inject(ActivatedRoute);
  private paymentGateway = inject(PaymentGateway);
  private bookingGateway = inject(BookingGateway);

  sessionStripeId = this.route.snapshot.queryParams['session_stripe_id'];
  session = this.route.snapshot.queryParams['session'];

  payment$ = this.getPaymentByStripe();
  booking$ = this.getBookingBySession();

  notFound = false;


  options: AnimationOptions = {
    path: '/assets/animation/check.json',
  };

  getPaymentByStripe() {
    if(this.sessionStripeId == null){
      return of()
    }
    return this.paymentGateway.getPaymentBySessionId(this.sessionStripeId).pipe(
      catchError(() => {
        this.notFound = true;
        return of()
      })
    )
  }

  getBookingBySession() {
    if(this.session == null){
      if (this.sessionStripeId != null) {
        return this.payment$.pipe(
          map((payment) => payment?.booking)
        )

      }
      return of()
    }
    return this.bookingGateway.getBookingBySessionToken(this.session).pipe(
      catchError(() => {
        this.notFound = true;
        return of()
      })
    )
  }

}
