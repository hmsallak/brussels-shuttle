import {Observable} from "rxjs";
import {JourneyQuoteRequest} from "../models/request/journey-quote-request";
import {JourneyQuote} from "../models/journey-quote";

export abstract class JourneyQuoteGateway {
  abstract computeJourneyQuote(request: JourneyQuoteRequest, vehicleModelId: number): Observable<JourneyQuote>;
  abstract computeJourneyQuotesForAllModels(request: JourneyQuoteRequest): Observable<JourneyQuote>;

}
