import { Component } from '@angular/core';
import {CreateBookingComponent} from "./create-booking/create-booking.component";
import {TitleComponent} from "../../shared/components/title/title.component";

@Component({
  selector: 'app-create-booking-page',
  standalone: true,
  imports: [
    CreateBookingComponent,
    TitleComponent,
  ],
  templateUrl: './create-booking-page.component.html',
  styleUrl: './create-booking-page.component.css'
})
export class CreateBookingPageComponent {

}
