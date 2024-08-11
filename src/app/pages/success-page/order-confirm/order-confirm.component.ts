import {Component, computed, ElementRef, input, ViewChild} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, TitleCasePipe} from "@angular/common";
import {Payment} from "../../../core/models/payment";
import {GoogleMapComponent} from "../../../shared/components/google-map/google-map.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCheckCircle, faPrint} from "@fortawesome/free-solid-svg-icons";
import {PlaceAddressLinkComponent} from "../../../shared/components/place-address-link/place-address-link.component";
import {Booking} from "../../../core/models/booking";
import {CurrencyEnum} from "../../../core/models/enum/currency.enum";
import {RouterLink} from "@angular/router";

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
    RouterLink
  ],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.css'
})
export class OrderConfirmComponent {

  payment = input.required<Payment>();
  booking = input.required<Booking>() ;

  passengerName = computed(() => this.booking()?.passenger.firstName + ' ' + this.booking()?.passenger.lastName);
  bookingDate = computed(() => new Date(this.booking()?.timestamp));
  tripStartDateTime = computed(() => new Date(this.booking()?.trip!.startTime));
  tripName = computed(() => this.booking()?.trip.startAddress.locality + ' - ' + this.booking()?.trip.endAddress.locality);

  @ViewChild('printableSection') printableSection!: ElementRef;
  protected readonly faCheckCircle = faCheckCircle;
  protected readonly CurrencyEnum = CurrencyEnum;

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
