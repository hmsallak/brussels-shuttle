import {Component, EventEmitter, input, Output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {PlaceAddressLinkComponent} from "../../../../../shared/components/place-address-link/place-address-link.component";
import {BookingBuilder} from "../../../../../core/models/booking-builder";

@Component({
  selector: 'app-booking-resume',
  standalone: true,
  imports: [
    DatePipe,
    PlaceAddressLinkComponent
  ],
  templateUrl: './booking-resume.component.html',
  styleUrl: './booking-resume.component.css',
})
export class BookingResumeComponent {

  bookingResume = input.required<BookingBuilder>();
  @Output() cleanBooking = new EventEmitter<void>();
}
