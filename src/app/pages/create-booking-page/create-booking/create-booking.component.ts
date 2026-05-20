import {Component, computed, effect, inject, input, model, OnInit, Signal, signal} from '@angular/core';
import {Quote} from "../../../core/models/quote";
import {VehicleStepComponent} from "./vehicle-step/vehicle-step.component";
import {VehicleModel} from "../../../core/models/vehicle-model";
import {PaymentMethodEnum} from "../../../core/models/enum/payment-method.enum";
import {Passenger} from "../../../core/models/passenger";
import {BookingRequest} from "../../../core/models/api/request/booking-request";
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CreateQuoteComponent} from "./create-quote-step/create-quote.component";
import {StepComponent} from "../../../shared/components/stepper/step/step.component";
import {StepperComponent} from "../../../shared/components/stepper/stepper.component";
import {BookingBuilder} from "../../../core/models/booking-builder";
import {BookingFinalStepComponent} from "./booking-final-step/booking-final-step.component";
import {BookingService} from "../../../shared/services/booking.service";
import {BillingAddress} from "../../../core/models/billing-address";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [
    StepComponent,
    VehicleStepComponent,
    CreateQuoteComponent,
    StepperComponent,
    BookingFinalStepComponent,
    TranslateModule
  ],
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.css'
})
export class CreateBookingComponent implements OnInit {
  private bookingService = inject(BookingService);
  private router = inject(Router);

  vehicleModel = model<VehicleModel>();
  quote = model<Quote>();
  passenger = signal<Passenger | null>(null);
  billingAddress = signal<BillingAddress | null>(null);
  paymentMethod = signal<PaymentMethodEnum | null>(null);

  protected exisingQuote?: Quote;

  currentBooking: Signal<BookingBuilder> = computed(() => {
    return  {
      quote: this.quote() ?? undefined,
      passengerCount: this.quote()?.passengerCount,
      vehicleModel: this.vehicleModel() ?? undefined,
      paymentMethodType: this.paymentMethod() ?? undefined,
    }
  });

  isQuoteRequestCompleted = computed(() => {
    return !!this.quote();
  });

  isVehicleModelCompleted = computed(() => {
    return !!(this.vehicleModel() && this.quote());
  });

  isFinalStepCompleted = computed(() => {
    return !!(this.passenger() && this.paymentMethod());
  });

  totalPrice = computed(() => {
    return this.quote()?.vehicleModelPrices.find(vmp => vmp.vehicleModel.id === this.vehicleModel()?.id)?.price;
  });

  quoteEffect = effect(() => {
    this.updateParam();
    if (!this.quote()) {
      this.vehicleModel.set(undefined);
      this.quote.set(undefined);
      this.paymentMethod.set(null);
    }
  }, { allowSignalWrites: true });

  vehicleModelEffect = effect(() => {
    this.updateParam();
    if (!this.vehicleModel()) {
      this.vehicleModel.set(undefined);
      this.paymentMethod.set(null);
    }
  }, { allowSignalWrites: true });

  ngOnInit(): void {
    this.exisingQuote = this.quote();
  }

  book() {
    if(!this.isQuoteRequestCompleted() && !this.isVehicleModelCompleted() && !this.isFinalStepCompleted()){
      return;
    }

    const request: BookingRequest = {
      quoteId: this.quote()!.id,
      passenger: this.passenger()!,
      passengerCount: this.quote()!.passengerCount,
      paymentMethodType: this.paymentMethod()!,
      vehicleModelId: this.vehicleModel()!.id,
      billingAddress: this.billingAddress() ?? undefined,
    }

    this.bookingService.createBooking(request);
  }

  private updateParam(){
    const scrollPosition = window.scrollY;
    this.router.navigate([], {
      queryParams: {
        vehicleModel: this.vehicleModel()?.id,
        quote: this.quote()?.id
      },
      queryParamsHandling: 'merge',
    })
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 1);
  }


}
