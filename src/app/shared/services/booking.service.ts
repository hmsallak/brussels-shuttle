import {inject, Injectable} from "@angular/core";
import {BookingGateway} from "../../core/ports/booking.gateway";
import {StripeService} from "./stripe.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {BookingRequest} from "../../core/models/api/request/booking-request";
import {PaymentMethodEnum} from "../../core/models/enum/payment-method.enum";
import {catchError, finalize, map, of, switchMap, tap, throwError} from "rxjs";
import {NotificationService} from "./notification.service";
import {ErrorResponse} from "../../core/models/api/response/error-response";

@Injectable({
  providedIn: 'root'
})
export class BookingService{
  private bookingGateway = inject(BookingGateway);
  private stripeService = inject(StripeService);
  private notificationService = inject(NotificationService);

  private spinner= inject(NgxSpinnerService);
  private router = inject(Router);

  createBooking(bookingRequest: BookingRequest) {
    if (bookingRequest.paymentMethodType === PaymentMethodEnum.Cash){
      this.bookWithCash(bookingRequest);
    } else if (bookingRequest.paymentMethodType === PaymentMethodEnum.Stripe){
      this.bookWithStripe(bookingRequest);
    }
  }

  private bookWithCash(request: BookingRequest){
    this.spinner.show();
    this.bookingGateway.createBooking(request).pipe(
      finalize(() => this.spinner.hide()),
      map(response => {
        this.router.navigate(['/success'], { queryParams: { session: response.sessionToken } })
      }),
      catchError(error => this.handleBookingError(error))
    ).subscribe();
  }

  private bookWithStripe(request: BookingRequest) {
    this.spinner.show();
    this.bookingGateway.createBooking(request).pipe(
      switchMap(response =>
        this.stripeService.startPaymentCheckout(response.sessionToken).pipe()
      ),
      finalize(() => this.spinner.hide()),
      catchError(error => this.handleBookingError(error))
    ).subscribe();
  }

  private handleBookingError(error: ErrorResponse) {
    if (error.status === 404) {
      this.notificationService.showError('error.bookingExpired');
    } else {
      this.notificationService.showError('error.bookingNotFound');
    }
    return throwError(() => error);
  }
}
