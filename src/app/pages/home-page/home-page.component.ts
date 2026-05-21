import {AfterViewInit, ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {RouterLink} from "@angular/router";
import {fadeInUpAnimation} from "angular-animations";
import {TestimonialComponent} from "./testimonial/testimonial.component";
import {DestinationComponent} from "../services/destination-page/destination/destination.component";
import {BookingFormComponent} from "../../shared/components/booking-from/booking-form.component";
import {TuiInputDateModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";
import {DOCUMENT, LowerCasePipe, NgOptimizedImage} from "@angular/common";
import {scrollToSection} from "../../shared/utils/element.utils";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {toSignal} from "@angular/core/rxjs-interop";
import {catchError, of, startWith, switchMap} from "rxjs";
import {VehicleModelGateway} from "../../core/ports/vehicle-model.gateway";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    BookingFormComponent,
    LayoutComponent,
    RouterLink,
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
export class HomePageComponent implements AfterViewInit {
  private translateService = inject(TranslateService);
  private vehicleModelGateway = inject(VehicleModelGateway);
  private document = inject(DOCUMENT);

  destinationsItems = toSignal(
    this.translateService.onLangChange.pipe(
      startWith({ lang: this.translateService.currentLang }),
      switchMap(() =>this.translateService.get('home-page.destinations.items'))
    )
  );

  vehicleModels = toSignal(
    this.vehicleModelGateway.getAllVehicleModels().pipe(
      catchError(() => of([]))
    ),
    { initialValue: [] }
  );

  protected readonly scrollToSection = scrollToSection;

  ngAfterViewInit() {
    const elements = this.document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset['delay'] ?? '0';
          setTimeout(() => el.classList.add('revealed'), +delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => observer.observe(el));
  }
}
