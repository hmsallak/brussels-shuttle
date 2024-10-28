import {Component, computed, EventEmitter, input, Output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {PlaceAddressLinkComponent} from "../../../../../shared/components/place-address-link/place-address-link.component";
import {BookingBuilder} from "../../../../../core/models/booking-builder";
import {PlaceAddress} from "../../../../../core/models/place-address";
import {RouteInfoComponent} from "../../../../../shared/components/route-info/route-info.component";
import {faCar, faCarSide, faLocationDot, faLocationPin, faRoute} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {Trip} from "../../../../../core/models/trip";

@Component({
  selector: 'app-booking-resume',
  standalone: true,
  imports: [
    DatePipe,
    PlaceAddressLinkComponent,
    RouteInfoComponent,
    FaIconComponent
  ],
  templateUrl: './booking-resume.component.html',
  styleUrl: './booking-resume.component.css',
})
export class BookingResumeComponent {

  bookingResume = input.required<BookingBuilder>();

  trips = computed(() => this.bookingResume()?.quote?.trips ?? []);
  @Output() cleanBooking = new EventEmitter<void>();

  getGoogleMapsUrl(address: PlaceAddress) {
    return `https://www.google.com/maps?q=${address.location.latitude},${address.location.longitude}`;
  }

  estimateEndDate(trip: Trip){
    const startTime = new Date(trip.startTime);

    return new Date(startTime.getTime() + trip.routeMetrics.tripDuration * 60000);
  }

  protected readonly faLocationPin = faLocationPin;
  protected readonly faLocationDot = faLocationDot;
}
