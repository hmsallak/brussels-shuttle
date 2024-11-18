import { Component } from '@angular/core';
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {RouterLink} from "@angular/router";
import {TitleComponent} from "../../shared/components/title/title.component";
import {BookingFormComponent} from "../../shared/components/booking-from/booking-form.component";

@Component({
  selector: 'app-term-of-use-page',
  standalone: true,
  imports: [
    LayoutComponent,
    BookingFormComponent,
    RouterLink,
    TitleComponent
  ],
  templateUrl: './term-of-use-page.component.html',
  styleUrl: './term-of-use-page.component.css'
})
export class TermOfUsePageComponent {

}
