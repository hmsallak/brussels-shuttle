import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CreateBookingComponent} from "./create-booking/create-booking.component";
import {TitleComponent} from "../../shared/components/title/title.component";
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {NgxSpinnerComponent} from "ngx-spinner";
import {faChevronDown, faLanguage, faSuitcase, faUser} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-create-booking-page',
  standalone: true,
  imports: [
    TitleComponent,
    LayoutComponent,
    NgxSpinnerComponent,
    FaIconComponent,
    RouterLink,
    TranslateModule,
    CreateBookingComponent,
  ],
  templateUrl: './create-booking-page.component.html',
  styleUrl: './create-booking-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateBookingPageComponent {

  protected readonly faChevronDown = faChevronDown;
  protected readonly faLanguage = faLanguage;
  protected readonly faUser = faUser;
  protected readonly faSuitcase = faSuitcase;
}
