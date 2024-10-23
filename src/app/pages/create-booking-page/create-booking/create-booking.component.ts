import {Component, computed, effect, inject, QueryList, Signal, signal} from '@angular/core';
import {GoogleMapComponent} from "../../../shared/components/google-map/google-map.component";
import {catchError, map, of, switchMap, tap, throwError} from "rxjs";
import {JourneyQuote} from "../../../core/models/journey-quote";
import {JourneyQuoteComponent} from "../../../shared/components/journey-quote/journey-quote.component";
import {BookingDetails} from "../../../core/models/booking-details";
import {VehicleModel} from "../../../core/models/vehicle-model";
import {PersonalInformationComponent} from "../../../shared/components/personal-information/personal-information.component";
import {PaymentMethodButtonComponent} from "../../../shared/components/payment-method-button/payment-method-button.component";
import {PaymentMethodEnum} from "../../../core/models/enum/payment-method.enum";
import {StripeService} from "../../../shared/services/stripe.service";
import {Passenger} from "../../../core/models/passenger";
import {BookingGateway} from "../../../core/ports/booking.gateway";
import {BookingRequest} from "../../../core/models/request/booking-request";
import {BannerComponent} from "../../../shared/components/banner/banner.component";
import {Router, RouterLink} from '@angular/router';
import {NgxSpinnerService} from "ngx-spinner";
import {formatLocalDate} from "../../../shared/utils/date.utils";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {BookingFormComponent} from "../../../shared/components/booking-from/booking-form.component";
import {BookingResumeComponent} from "./booking-final-step/booking-resume/booking-resume.component";
import {SearchJourneyQuoteComponent} from "./search-journey-quote/search-journey-quote.component";
import {StepComponent} from "../../../shared/components/stepper/step/step.component";
import {StepperComponent} from "../../../shared/components/stepper/stepper.component";
import {CurrencyPipe, JsonPipe, NgIf} from "@angular/common";
import {BookingBuilder} from "../../../core/models/booking-builder";
import {TuiButtonModule, TuiLabelModule} from "@taiga-ui/core";
import {BookingFinalStepComponent} from "./booking-final-step/booking-final-step.component";

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [
    BookingFormComponent,
    BannerComponent,
    JourneyQuoteComponent,
    PaymentMethodButtonComponent,
    GoogleMapComponent,
    RouterLink,
    FaIconComponent,
    BookingResumeComponent,
    SearchJourneyQuoteComponent,
    StepComponent,
    NgIf,
    CurrencyPipe,
    TuiButtonModule,
    TuiLabelModule,
    PersonalInformationComponent,
    JsonPipe,
    BookingFinalStepComponent,
    StepperComponent,

  ],
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.css'
})
export class CreateBookingComponent {
  private bookingGateway = inject(BookingGateway);
  private stripeService = inject(StripeService);
  private spinner= inject(NgxSpinnerService);
  private router = inject(Router);

  vehicleModel = signal<VehicleModel | null>(null);
  bookingDetails = signal<BookingDetails | null>(null);
  journeyQuote = signal<JourneyQuote | null>(null);
  personalInformation = signal<Passenger | null>(null);
  paymentMethod = signal<PaymentMethodEnum | null>(null);

  currentBooking: Signal<BookingBuilder> = computed(() => {
    return  {
      startTime: this.bookingDetails()?.startTime,
      journeyQuote: this.journeyQuote() ?? undefined,
      passengerCount: this.bookingDetails()?.passengerCount,
      vehicleModel: this.vehicleModel() ?? undefined,
      paymentMethodType: this.paymentMethod() ?? undefined,
    }
  });

  isBookingDetailsCompleted = computed(() => {
    return !!this.bookingDetails();
  });

  isVehicleModelCompleted = computed(() => {
    return !!(this.vehicleModel() && this.journeyQuote());
  });

  isFinalStepCompleted = computed(() => {
    return !!(this.personalInformation() && this.paymentMethod());
  });

  setupBookingStateWatcher = effect(() => {
    if (!this.isBookingDetailsCompleted()) {
      this.vehicleModel.set(null);
      this.journeyQuote.set(null);
      this.paymentMethod.set(null);
    }
  }, { allowSignalWrites: true });

  totalPrice = computed(() => {
    return this.journeyQuote()?.vehicleModelPrices.find(vmp => vmp.vehicleModel.id === this.vehicleModel()?.id)?.price;
  });

  book() {
    if(!this.isBookingDetailsCompleted && !this.isVehicleModelCompleted && !this.isFinalStepCompleted()){
      return;
    }

    const request: BookingRequest = {
      journeyQuoteId: this.journeyQuote()!.id,
      passenger: this.personalInformation()!,
      passengerCount: this.bookingDetails()!.passengerCount,
      paymentMethodType: this.paymentMethod()!,
      startTime: formatLocalDate(this.bookingDetails()!.startTime),
      vehicleModelId: this.vehicleModel()!.id
    }
    if (this.paymentMethod() === PaymentMethodEnum.Cash){
      this.bookWithCash(request);
    } else if (this.paymentMethod() === PaymentMethodEnum.Stripe){
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
        this.spinner.hide();
        return of(error);
      })
    ).subscribe();
  }

  private bookWithStripe(request: BookingRequest) {
    this.spinner.show();
    this.bookingGateway.createBooking(request).pipe(
      switchMap(response =>
        this.stripeService.startPaymentCheckout(response.sessionToken).pipe(
          tap(() => this.spinner.hide()),
          catchError(error => {
            this.spinner.hide();
            return throwError(() => error);
          })
        )
      ),
      catchError(error => {
        this.spinner.hide();
        return of(error);
      })
    ).subscribe();
  }
}
