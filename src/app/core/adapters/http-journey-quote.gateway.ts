import {inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {JourneyQuoteRequest} from "../models/request/journey-quote-request";
import {map, Observable} from "rxjs";
import {JourneyQuote} from "../models/journey-quote";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpJourneyQuoteGateway{
  http = inject(HttpClient);

  private readonly JOURNEY_QUOTE_URL = '/public/journey-quote';

  computeJourneyQuote(request: JourneyQuoteRequest, vehicleModelId: number): Observable<JourneyQuote> {
    return this.http.post<JourneyQuote>(environment.baseUrl + this.JOURNEY_QUOTE_URL + 'by-vehicle-model/' + vehicleModelId, request).pipe(
      map(journeyQuote => ({
        ...journeyQuote,
      }))
    );
  }

  computeJourneyQuotesForAllModels(request: JourneyQuoteRequest): Observable<JourneyQuote> {
    return this.http.post<JourneyQuote>(environment.baseUrl + this.JOURNEY_QUOTE_URL, request).pipe(
      map(journeyQuote => ({
        ...journeyQuote,
      }))
    );
  }

}
