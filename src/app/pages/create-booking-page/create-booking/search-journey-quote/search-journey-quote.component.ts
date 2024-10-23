import {
  Component,
  computed, effect,
  inject,
  model,
  output,
} from '@angular/core';
import {BookingFormComponent} from "../../../../shared/components/booking-from/booking-form.component";
import {GoogleMapComponent} from "../../../../shared/components/google-map/google-map.component";
import {BookingDetails} from "../../../../core/models/booking-details";
import {TuiButtonModule} from "@taiga-ui/core";
import {JourneyQuote} from "../../../../core/models/journey-quote";
import {JourneyQuoteGateway} from "../../../../core/ports/journey-quote.gateway";
import {PlaceAddress} from "../../../../core/models/PlaceAddress";
import {JourneyQuoteRequest} from "../../../../core/models/request/journey-quote-request";
import {map} from "rxjs";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-search-journey-quote',
  standalone: true,
  imports: [
    BookingFormComponent,
    GoogleMapComponent,
    TuiButtonModule,
    JsonPipe
  ],
  templateUrl: './search-journey-quote.component.html',
  styleUrl: './search-journey-quote.component.css'
})
export class SearchJourneyQuoteComponent {
  private journeyQuoteGateway = inject(JourneyQuoteGateway);

  bookingDetails = model<BookingDetails| null>(null);
  journeyQuote = output<JourneyQuote>();

  bookingDetailsEffect = effect(() => {
    const bookingDetails = this.bookingDetails();
    if(bookingDetails) {
      this.searchJourneyQuote(
        bookingDetails!.startAddress.place,
        bookingDetails!.endAddress.place,
        bookingDetails!.startTime
      );
    }
  });

  searchJourneyQuote(startAddress: PlaceAddress, endAddress: PlaceAddress, startTime?: Date) {
    const request: JourneyQuoteRequest = {
      startAddress: startAddress,
      endAddress:  endAddress,
      startTime: startTime ?? null
    };
    this.journeyQuoteGateway.computeJourneyQuotesForAllModels(request).pipe(
      map(journeyQuote => {
        this.journeyQuote.emit(journeyQuote)
      })
    ).subscribe();
  }
}
