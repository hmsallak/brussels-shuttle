import {Component, computed, EventEmitter, input, Input, model, Output, signal, Signal} from '@angular/core';
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
  PersonalInformationComponent
} from "../../../../shared/components/personal-information/personal-information.component";
import {RouterLink} from "@angular/router";
import {TuiButtonModule} from "@taiga-ui/core";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-booking-final-step',
  standalone: true,
  imports: [
    BannerComponent,
    BookingResumeComponent,
    CurrencyPipe,
    PaymentMethodButtonComponent,
    PersonalInformationComponent,
    RouterLink,
    TuiButtonModule,
    FormsModule
  ],
  templateUrl: './booking-final-step.component.html',
  styleUrl: './booking-final-step.component.css'
})
export class BookingFinalStepComponent {
  currentBooking = input.required<BookingBuilder>();
  personalInformation = model<Passenger | null>(null);
  totalPrice = input<number>();
  paymentMethod = model<PaymentMethodEnum | null>(null);
  termsAndConditions = signal<boolean>(false);

  isBookingValid = computed(() => {
    return !!(this.personalInformation() && this.paymentMethod()  && this.termsAndConditions());
  });

  bookEvent() {
    if (!this.isBookingValid()) {
      return;
    }
    this.book.emit();
  }

  @Output() book = new EventEmitter<void>();
  protected readonly CurrencyEnum = CurrencyEnum;
  protected readonly PaymentMethodEnum = PaymentMethodEnum;
}
