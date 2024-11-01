import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {
  faCheckCircle,
  faCircle
} from "@fortawesome/free-solid-svg-icons";
import {ReservationApproachComponent} from "./reservation-approach/reservation-approach.component";
import {TitleComponent} from "../../shared/components/title/title.component";
import {PositionEnum} from "../../core/models/enum/position.enum";
import {BookingFormComponent} from "../../shared/components/booking-from/booking-form.component";
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {RouterLink} from "@angular/router";
import {FeaturesComponent} from "./features/features.component";
import {fadeInUpAnimation} from "angular-animations";
import {TestimonialComponent} from "./testimonial/testimonial.component";
import {ContactFormComponent} from "../../shared/components/contact-form/contact-form.component";
import {DestinationComponent} from "../services/destination-page/destination/destination.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FaIconComponent,
    ReservationApproachComponent,
    TitleComponent,
    BookingFormComponent,
    NavigationComponent,
    LayoutComponent,
    RouterLink,
    FeaturesComponent,
    TestimonialComponent,
    ContactFormComponent,
    DestinationComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUpAnimation({duration: 500}),
  ],
})
export class HomePageComponent {

  protected readonly PositionEnum = PositionEnum;
  protected readonly faCircle = faCircle;
  protected readonly faCheckCircle = faCheckCircle;
}
