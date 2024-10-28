import {
  Component,
  computed, effect,
  inject,
  model,
  output, signal,
} from '@angular/core';
import {BookingFormComponent} from "../../../../shared/components/booking-from/booking-form.component";
import {GoogleMapComponent} from "../../../../shared/components/google-map/google-map.component";
import {BookingDetails} from "../../../../core/models/booking-details";
import {TuiButtonModule} from "@taiga-ui/core";
import {Quote} from "../../../../core/models/quote";
import {QuoteGateway} from "../../../../core/ports/quote.gateway";
import {PlaceAddress} from "../../../../core/models/place-address";
import {QuoteRequest} from "../../../../core/models/api/request/quote-request";
import {map} from "rxjs";
import {JsonPipe, NgClass} from "@angular/common";
import {TripRequest} from "../../../../core/models/api/request/trip-request";
import {RouteInfoComponent} from "../../../../shared/components/route-info/route-info.component";
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {animate, style, transition, trigger} from "@angular/animations";
import {faClock, faRoute} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {KmPipe} from "../../../../shared/pipe/km.pipe";
import {MinutesPipe} from "../../../../shared/pipe/minutes.pipe";
import {TripEnum} from "../../../../core/models/enum/trip.enum";

@Component({
  selector: 'app-create-quote',
  standalone: true,
  imports: [
    BookingFormComponent,
    GoogleMapComponent,
    TuiButtonModule,
    JsonPipe,
    RouteInfoComponent,
    NgClass,
    FaIconComponent,
    KmPipe,
    MinutesPipe
  ],
  animations: [
    fadeInUpOnEnterAnimation({duration: 500}),
  ],
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.css'
})
export class CreateQuoteComponent {
  private quoteGateway = inject(QuoteGateway);

  bookingDetails = model<BookingDetails| null>(null);
  quote =  signal<Quote| null>(null)
  quoteEvent = output<Quote>();

  departureTrip = computed(() => {
    const bookingDetails = this.bookingDetails();
    return bookingDetails?.trips.find( trip => trip.type === TripEnum.Departure);
  });

  bookingDetailsEffect = effect(() => {
    const bookingDetails = this.bookingDetails();
    if(bookingDetails) {
      this.createQuote(bookingDetails.trips);
    } else {
      this.quote.set(null)
    }
  }, {allowSignalWrites: true});

  createQuote(trips: Array<TripRequest>) {
    const quoteRequest: QuoteRequest = {
      trips: trips
    };

    this.quoteGateway.createQuote(quoteRequest).pipe(
      map(quote => {
        this.quoteEvent.emit(quote)
        this.quote.set(quote)
      })
    ).subscribe();
  }

  protected readonly faRoute = faRoute;
  protected readonly faClock = faClock;
}
