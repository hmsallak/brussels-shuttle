import {Observable} from "rxjs";
import {QuoteRequest} from "../models/api/request/quote-request";
import {Quote} from "../models/quote";

export abstract class QuoteGateway {
  abstract createQuote(request: QuoteRequest): Observable<Quote>;
  abstract getQuoteBySessionToKen(): Observable<Quote>;

}
