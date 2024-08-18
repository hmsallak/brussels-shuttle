import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CreateBookingComponent} from "./create-booking/create-booking.component";
import {TitleComponent} from "../../shared/components/title/title.component";
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {NgxSpinnerComponent} from "ngx-spinner";

@Component({
  selector: 'app-create-booking-page',
  standalone: true,
  imports: [
    CreateBookingComponent,
    TitleComponent,
    LayoutComponent,
    NgxSpinnerComponent,
  ],
  templateUrl: './create-booking-page.component.html',
  styleUrl: './create-booking-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateBookingPageComponent {

}
