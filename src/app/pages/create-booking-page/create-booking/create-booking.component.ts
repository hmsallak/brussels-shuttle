import {Component, computed, effect, inject, Signal, signal} from '@angular/core';
import {GoogleMapComponent} from "../../../shared/components/google-map/google-map.component";
import {Quote} from "../../../core/models/quote";
import {JourneyQuoteComponent} from "../../../shared/components/journey-quote/journey-quote.component";
import {BookingDetails} from "../../../core/models/booking-details";
import {VehicleModel} from "../../../core/models/vehicle-model";
import {PersonalInformationComponent} from "../../../shared/components/personal-information/personal-information.component";
import {PaymentMethodButtonComponent} from "../../../shared/components/payment-method-button/payment-method-button.component";
import {PaymentMethodEnum} from "../../../core/models/enum/payment-method.enum";
import {Passenger} from "../../../core/models/passenger";
import {BookingRequest} from "../../../core/models/api/request/booking-request";
import {BannerComponent} from "../../../shared/components/banner/banner.component";
import {Router, RouterLink} from '@angular/router';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {BookingFormComponent} from "../../../shared/components/booking-from/booking-form.component";
import {BookingResumeComponent} from "./booking-final-step/booking-resume/booking-resume.component";
import {CreateQuoteComponent} from "./create-quote/create-quote.component";
import {StepComponent} from "../../../shared/components/stepper/step/step.component";
import {StepperComponent} from "../../../shared/components/stepper/stepper.component";
import {CurrencyPipe, JsonPipe, NgIf} from "@angular/common";
import {BookingBuilder} from "../../../core/models/booking-builder";
import {TuiButtonModule, TuiLabelModule} from "@taiga-ui/core";
import {BookingFinalStepComponent} from "./booking-final-step/booking-final-step.component";
import {BookingService} from "../../../shared/services/booking.service";

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
    StepComponent,
    NgIf,
    CurrencyPipe,
    TuiButtonModule,
    TuiLabelModule,
    PersonalInformationComponent,
    JsonPipe,
    BookingFinalStepComponent,
    StepperComponent,
    CreateQuoteComponent,

  ],
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.css'
})
export class CreateBookingComponent {
  private bookingService = inject(BookingService);

  vehicleModel = signal<VehicleModel | null>(null);
  bookingDetails = signal<BookingDetails | null>(null);
  quote = signal<Quote | null>(null);
  personalInformation = signal<Passenger | null>(null);
  paymentMethod = signal<PaymentMethodEnum | null>(null);

  currentBooking: Signal<BookingBuilder> = computed(() => {
    return  {
      quote: this.quote() ?? undefined,
      passengerCount: this.bookingDetails()?.passengerCount,
      vehicleModel: this.vehicleModel() ?? undefined,
      paymentMethodType: this.paymentMethod() ?? undefined,
    }
  });

  isBookingDetailsCompleted = computed(() => {
    return !!this.bookingDetails();
  });

  isVehicleModelCompleted = computed(() => {
    return !!(this.vehicleModel() && this.quote());
  });

  isFinalStepCompleted = computed(() => {
    return !!(this.personalInformation() && this.paymentMethod());
  });

  setupBookingStateWatcher = effect(() => {
    if (!this.isBookingDetailsCompleted()) {
      this.vehicleModel.set(null);
      this.quote.set(null);
      this.paymentMethod.set(null);
    }
  }, { allowSignalWrites: true });

  totalPrice = computed(() => {
    return this.quote()?.vehicleModelPrices.find(vmp => vmp.vehicleModel.id === this.vehicleModel()?.id)?.price;
  });

  book() {
    if(!this.isBookingDetailsCompleted && !this.isVehicleModelCompleted && !this.isFinalStepCompleted()){
      return;
    }

    const request: BookingRequest = {
      quoteId: this.quote()!.id,
      passenger: this.personalInformation()!,
      passengerCount: this.bookingDetails()!.passengerCount,
      paymentMethodType: this.paymentMethod()!,
      vehicleModelId: this.vehicleModel()!.id,
    }

    this.bookingService.createBooking(request);

  }


}
