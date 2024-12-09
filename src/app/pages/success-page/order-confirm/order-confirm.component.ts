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
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [
    TitleCasePipe,
    DatePipe,
    CurrencyPipe,
    GoogleMapComponent,
    FaIconComponent,
    PlaceAddressLinkComponent,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.css'
})
export class OrderConfirmComponent {

  payment = input.required<Payment>();
  booking = input.required<Booking>() ;

  passengerName = computed(() => this.booking()?.passenger.firstName + ' ' + this.booking()?.passenger.lastName);
  bookingDate = computed(() => new Date(this.booking()?.timestamp));

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
