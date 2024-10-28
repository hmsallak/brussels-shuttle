import {inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {QuoteRequest} from "../models/api/request/quote-request";
import {map, Observable} from "rxjs";
import {Quote} from "../models/quote";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpQuoteGateway {
  http = inject(HttpClient);

  private readonly QUOTE_URL = '/public/quote';

  createQuote(request: QuoteRequest): Observable<Quote> {
    return this.http.post<Quote>(environment.baseUrl + this.QUOTE_URL, request).pipe(
      map(journeyQuote => ({
        ...journeyQuote,
      }))
    );
  }

}
