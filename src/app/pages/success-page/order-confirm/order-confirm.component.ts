import {Component, computed, ElementRef, input, Signal, ViewChild} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, TitleCasePipe} from "@angular/common";
import {Payment} from "../../../core/models/payment";
import {GoogleMapComponent} from "../../../shared/components/google-map/google-map.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCheckCircle, faPrint} from "@fortawesome/free-solid-svg-icons";
import {PlaceAddressLinkComponent} from "../../../shared/components/place-address-link/place-address-link.component";
import {Booking} from "../../../core/models/booking";
import {CurrencyEnum} from "../../../core/models/enum/currency.enum";
import {RouterLink} from "@angular/router";
import {Trip} from "../../../core/models/trip";
import {BookingBuilder} from "../../../core/models/booking-builder";
import {Quote} from "../../../core/models/quote";
import {
  BookingResumeComponent
} from "../../create-booking-page/create-booking/booking-final-step/booking-resume/booking-resume.component";

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    DatePipe,
    CurrencyPipe,
    GoogleMapComponent,
    JsonPipe,
    FaIconComponent,
    PlaceAddressLinkComponent,
    RouterLink,
    BookingResumeComponent
  ],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.css'
})
export class OrderConfirmComponent {

  payment = input.required<Payment>();
  booking = input.required<Booking>() ;

  passengerName = computed(() => this.booking()?.passenger.firstName + ' ' + this.booking()?.passenger.lastName);
  bookingDate = computed(() => new Date(this.booking()?.timestamp));

  bookingBuilder: Signal<BookingBuilder> = computed(() => {
    const quote: Quote = {
      expirationTime: new Date(),
      id: 0,
      trips: this.booking()?.trips,
      vehicleModelPrices: []

    }
    return  {
      quote: quote,
      passengerCount: this.booking()?.passengerCount,
      vehicleModel: this.booking().vehicleModel ?? undefined,
      paymentMethodType: this.booking().paymentMethodType ?? undefined,
    }
  });

  @ViewChild('printableSection') printableSection!: ElementRef;
  protected readonly faCheckCircle = faCheckCircle;
  protected readonly CurrencyEnum = CurrencyEnum;

  getTripName(trip: Trip): string {
    return trip.startAddress.locality + ' - ' + trip.endAddress.locality
  }

  print(): void {
    const printContents = this.printableSection.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // reload to restore the original state of the page
  }

  protected readonly faPrint = faPrint;
}
