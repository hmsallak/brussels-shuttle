import {Component, computed, input, model, output, signal} from '@angular/core';
import {PaymentMethodEnum} from "../../../../core/models/enum/payment-method.enum";
import {BookingBuilder} from "../../../../core/models/booking-builder";
import {Passenger} from "../../../../core/models/passenger";
import {CurrencyEnum} from "../../../../core/models/enum/currency.enum";
import {BannerComponent} from "../../../../shared/components/banner/banner.component";
import {BookingResumeComponent} from "./booking-resume/booking-resume.component";
import {CurrencyPipe} from "@angular/common";
import {
  PaymentMethodButtonComponent
} from "../../../../shared/components/payment-method-button/payment-method-button.component";
import {
  PassengerComponent
} from "./personal-information/passenger.component";
import {RouterLink} from "@angular/router";
import {TuiButtonModule} from "@taiga-ui/core";
import {FormsModule} from "@angular/forms";
import {BillingAddress} from "../../../../core/models/billing-address";
import {BillingAddressComponent} from "./billing-address/billing-address.component";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {tuiPure} from "@taiga-ui/cdk";
import {VALIDATION_ERRORS} from "../../../../shared/utils/error.utils";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-booking-final-step',
  standalone: true,
  imports: [
    BookingResumeComponent,
    BannerComponent,
    PassengerComponent,
    BillingAddressComponent,
    PaymentMethodButtonComponent,
    CurrencyPipe,
    FormsModule,
    RouterLink,
    TuiButtonModule,
    TranslateModule

  ],
  templateUrl: './booking-final-step.component.html',
  styleUrl: './booking-final-step.component.css',
  providers: [
    { provide: TUI_VALIDATION_ERRORS, useValue: VALIDATION_ERRORS }
  ],
})
export class BookingFinalStepComponent {
  currentBooking = input.required<BookingBuilder>();
  passenger = model<Passenger | null>(null);
  billingAddress = model<BillingAddress | null>(null);
  totalPrice = input<number>();
  paymentMethod = model<PaymentMethodEnum | null>(null);
  termsAndConditions = signal<boolean>(false);
  isBillingAddressVisible = signal<boolean>(false);
  book = output();
  protected readonly CurrencyEnum = CurrencyEnum;
  protected readonly PaymentMethodEnum = PaymentMethodEnum;


  isBookingValid = computed(() => {
    return !!(this.passenger() && this.paymentMethod()  && this.termsAndConditions());
  });

  bookEvent() {
    if (!this.isBookingValid()) {
      return;
    }
    this.book.emit();
  }
}
