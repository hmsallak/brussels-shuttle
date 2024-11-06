import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {QuoteRequest} from "../models/api/request/quote-request";
import {map, Observable} from "rxjs";
import {Quote} from "../models/quote";
import {environment} from "../../../environments/environment";
import {QuestionMail} from "../models/question-mail";

@Injectable({
  providedIn: 'root'
})
export class HttpEmailGateway {
  http = inject(HttpClient);

  private readonly QUESTION_URL = '/public/email/question';

  sendQuestionEmail(request: QuestionMail): Observable<String> {
    return this.http.post<String>(environment.baseUrl + this.QUESTION_URL, request);
  }

}
