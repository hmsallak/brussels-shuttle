import {Component, computed, ElementRef, input, Signal, ViewChild} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, TitleCasePipe} from "@angular/common";
import {Payment} from "../../../core/models/payment";
import {GoogleMapComponent} from "../../../shared/components/google-map/google-map.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCalendarPlus, faCheckCircle, faPrint} from "@fortawesome/free-solid-svg-icons";
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
  protected readonly faCalendarPlus = faCalendarPlus;

  generateCalendarLink(): string {
    const trip = this.booking()?.trips?.[0];
    if (!trip) return '';
    const start = new Date(trip.startTime);
    const end = new Date(trip.startTime);
    end.setHours(end.getHours() + 2);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const title = encodeURIComponent('Brussels Shuttle — ' + trip.startAddress.locality + ' → ' + trip.endAddress.locality);
    const details = encodeURIComponent('Réservation #' + this.booking().reference);
    const location = encodeURIComponent(trip.startAddress.name);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=${location}`;
  }
}
