import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TitleComponent} from "../../shared/components/title/title.component";
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {RouterLink} from "@angular/router";
import {FeaturesComponent} from "./features/features.component";
import {fadeInUpAnimation} from "angular-animations";
import {TestimonialComponent} from "./testimonial/testimonial.component";
import {DestinationComponent} from "../services/destination-page/destination/destination.component";
import {BookingFormComponent} from "../../shared/components/booking-from/booking-form.component";
import {TuiInputDateModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";
import {LowerCasePipe, NgOptimizedImage} from "@angular/common";
import {scrollToSection} from "../../shared/utils/element.utils";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {toSignal} from "@angular/core/rxjs-interop";
import {startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    TitleComponent,
    BookingFormComponent,
    LayoutComponent,
    RouterLink,
    FeaturesComponent,
    TestimonialComponent,
    DestinationComponent,
    TuiInputDateModule,
    TuiTextfieldControllerModule,
    NgOptimizedImage,
    TranslateModule,
    LowerCasePipe
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUpAnimation({duration: 500}),
  ],
})
export class HomePageComponent {
  private translateService = inject(TranslateService);

  destinationsItems = toSignal(
    this.translateService.onLangChange.pipe(
      startWith({ lang: this.translateService.currentLang }),
      switchMap(() =>this.translateService.get('home-page.destinations.items'))
    )
  );
  protected readonly scrollToSection = scrollToSection;
}
