import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";
import {
  faCheckCircle,
  faCircle,
  faMapLocationDot,
  faPhoneVolume,
  faPlaneDeparture
} from "@fortawesome/free-solid-svg-icons";
import {faTaxi} from "@fortawesome/free-solid-svg-icons/faTaxi";
import {NoticesComponent} from "./notices/notices.component";
import {faMailForward} from "@fortawesome/free-solid-svg-icons/faMailForward";
import {ReservationApproachComponent} from "./reservation-approach/reservation-approach.component";
import {TitleComponent} from "../../shared/components/title/title.component";
import {PositionEnum} from "../../core/models/enum/position.enum";
import {BookingDetailsComponent} from "../create-booking-page/create-booking/booking-details/booking-details.component";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {RouterLink} from "@angular/router";
import {FeaturesComponent} from "./features/features.component";
import {CarsComponent} from "./cars/cars.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FaIconComponent,
    NoticesComponent,
    ReservationApproachComponent,
    TitleComponent,
    BookingDetailsComponent,
    HeaderComponent,
    LayoutComponent,
    RouterLink,
    FeaturesComponent,
    CarsComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  protected readonly faArrowRight = faArrowRight;
  protected readonly faPhoneVolume = faPhoneVolume;
  protected readonly faMapLocationDot = faMapLocationDot;
  protected readonly faPlaneDeparture = faPlaneDeparture;
  protected readonly faTaxi = faTaxi;
  protected readonly faMailForward = faMailForward;
  protected readonly PositionEnum = PositionEnum;
  protected readonly faCircle = faCircle;
  protected readonly faCheckCircle = faCheckCircle;
}
