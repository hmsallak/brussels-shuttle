import {Observable} from "rxjs";
import {QuestionMail} from "../models/question-mail";

export abstract class EmailGateway {
  abstract sendQuestionEmail(mail: QuestionMail): Observable<String>;
}
