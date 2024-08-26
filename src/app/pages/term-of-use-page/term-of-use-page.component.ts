import { Component } from '@angular/core';
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {BookingDetailsComponent} from "../create-booking-page/create-booking/booking-details/booking-details.component";
import {RouterLink} from "@angular/router";
import {TitleComponent} from "../../shared/components/title/title.component";

@Component({
  selector: 'app-term-of-use-page',
  standalone: true,
  imports: [
    LayoutComponent,
    BookingDetailsComponent,
    RouterLink,
    TitleComponent
  ],
  templateUrl: './term-of-use-page.component.html',
  styleUrl: './term-of-use-page.component.css'
})
export class TermOfUsePageComponent {

}
