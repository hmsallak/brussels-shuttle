import {Component, inject, signal} from '@angular/core';
import {BookingDetailsComponent} from "./booking-details/booking-details.component";
import {GoogleMapComponent} from "../../../shared/components/google-map/google-map.component";
import {JourneyQuoteGateway} from "../../../core/ports/journey-quote.gateway";
import {JourneyQuoteRequest} from "../../../core/models/request/journey-quote-request";
import {catchError, map, of} from "rxjs";
import {JourneyQuote} from "../../../core/models/journey-quote";
import {JourneyQuoteComponent} from "./journey-quote/journey-quote.component";
import {BookingDetails} from "../../../core/models/booking-details";
import {VehicleModel} from "../../../core/models/vehicle-model";
import {
  PersonalInformationDialogComponent
} from "../../../shared/components/personal-information-dialog/personal-information-dialog.component";
import {PlaceAddress} from "../../../core/models/PlaceAddress";
import {
  PaymentMethodButtonComponent
} from "../../../shared/components/payment-method-button/payment-method-button.component";
import {PaymentMethodEnum} from "../../../core/models/enum/payment-method.enum";
import {StripeService} from "../../../shared/services/stripe.service";
import {Passenger} from "../../../core/models/passenger";
import {BookingGateway} from "../../../core/ports/booking.gateway";
import {BookingRequest} from "../../../core/models/request/booking-request";
import {BannerComponent} from "../../../shared/components/banner/banner.component";
import { Router } from '@angular/router';
import {NgxSpinnerService} from "ngx-spinner";
import {formatLocalDate} from "../../../shared/utils/date.utils";

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [
    BookingDetailsComponent,
    BannerComponent,
    JourneyQuoteComponent,
    PersonalInformationDialogComponent,
    PaymentMethodButtonComponent,
    GoogleMapComponent

  ],
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.css'
})
export class CreateBookingComponent {
  private journeyQuoteGateway = inject(JourneyQuoteGateway);
  private bookingGateway = inject(BookingGateway);
  private stripeService = inject(StripeService);
  private spinner= inject(NgxSpinnerService);
  private router = inject(Router);

  vehicleModel = signal<VehicleModel | null>(null);
  bookingDetails = signal<BookingDetails | null>(null);
  journeyQuote = signal<JourneyQuote | null>(null);
  personalInformation = signal<Passenger | null>(null);

  bookTouched = false;

  isBookInvalid() {
    return !this.journeyQuote() || !this.bookingDetails() || !this.vehicleModel() || !this.personalInformation();
  }

  isVehicleModelInvalid(){
    return !this.vehicleModel() && this.bookTouched;
  }

  isPersonalInformationInvalid(){
    return !this.personalInformation() && this.bookTouched;
  }

  setBookingDetails(bookingDetails: BookingDetails) {
    this.bookingDetails.set(bookingDetails)
    if (this.bookingDetails()){
      this.searchJourneyQuote(this.bookingDetails()!.startAddress.place, this.bookingDetails()!.endAddress.place);
    } else {
      this.vehicleModel.set(null);
      this.journeyQuote.set(null);
    }
  }

  searchJourneyQuote(startAddress: PlaceAddress, endAddress: PlaceAddress, startTime?: Date) {
    const request: JourneyQuoteRequest = {
      startAddress: startAddress,
      endAddress:  endAddress,
      startTime: startTime ?? null
    }
    this.journeyQuoteGateway.computeJourneyQuotesForAllModels(request).pipe(
      map(journeyQuote => {
        this.journeyQuote.set(journeyQuote)
      })
    ).subscribe();
  }

  book(paymentMethod: PaymentMethodEnum) {
    if (this.isBookInvalid()) {
      return;
    }

    const request: BookingRequest = {
      journeyQuoteId: this.journeyQuote()!.id,
      passenger: this.personalInformation()!,
      passengerCount: this.bookingDetails()!.passengerCount,
      paymentMethodType: paymentMethod,
      startTime: formatLocalDate(this.bookingDetails()!.startTime),
      vehicleModelId: this.vehicleModel()!.id
    }
    if (paymentMethod === PaymentMethodEnum.Cash){
      this.bookWithCash(request);
    } else if (paymentMethod === PaymentMethodEnum.Stripe){
      this.bookWithStripe(request);
    }
  }

  private bookWithCash(request: BookingRequest){
    this.spinner.show();
    this.bookingGateway.createBooking(request).pipe(
      map(response => {
        this.spinner.hide();
        this.router.navigate(['/success'], { queryParams: { session: response.sessionToken } })
      }),
      catchError(error => {
        console.log(error)
        return of(error);
      })
    ).subscribe();
  }

  private bookWithStripe(request: BookingRequest){
    this.spinner.show();
    this.bookingGateway.createBooking(request).pipe(
      map(response => {
        this.spinner.hide();
        this.stripeService.startPaymentCheckout(response.sessionToken);
      }),
      catchError(error => {
        return of(error);
      })
    ).subscribe()
  }
}
