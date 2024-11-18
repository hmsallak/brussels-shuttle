import {
  Component, computed,
  inject, input,
  model,
} from '@angular/core';
import {GoogleMapComponent} from "../../../../shared/components/google-map/google-map.component";
import {Quote} from "../../../../core/models/quote";
import {QuoteGateway} from "../../../../core/ports/quote.gateway";
import {QuoteRequest} from "../../../../core/models/api/request/quote-request";
import { map} from "rxjs";
import {RouteInfoComponent} from "../../../../shared/components/route-info/route-info.component";
import {faClock, faRoute} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {BookingFormComponent} from "../../../../shared/components/booking-from/booking-form.component";
import {TripEnum} from "../../../../core/models/enum/trip.enum";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-create-quote-step',
  standalone: true,
  imports: [
    RouteInfoComponent,
    FaIconComponent,
    GoogleMapComponent,
    BookingFormComponent,
    TranslateModule
  ],
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.css'
})
export class CreateQuoteComponent {
  private quoteGateway = inject(QuoteGateway);

  exisingQuote = input<Quote>();

  quote = model<Quote>();

  trips = computed(() => this.quote()?.trips || this.exisingQuote()?.trips);

  departure = computed(() =>
    this.quote()?.trips.find(trip => trip.type === TripEnum.DEPARTURE)
    || this.exisingQuote()?.trips.find(trip => trip.type === TripEnum.DEPARTURE)
  );

  quoteRequestChange(quoteRequest: QuoteRequest | null) {
    if(quoteRequest) {
      this.createQuote(quoteRequest);
    } else {

      this.quote.set(undefined)
    }
  }

  createQuote(quoteRequest: QuoteRequest) {
    this.quoteGateway.createQuote(quoteRequest).pipe(
      map(quote => {
        this.quote.set(quote)
      })
    ).subscribe();
  }

  protected readonly faRoute = faRoute;
  protected readonly faClock = faClock;
}
