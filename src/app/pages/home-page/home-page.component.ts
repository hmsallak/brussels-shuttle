import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ReservationApproachComponent} from "./reservation-approach/reservation-approach.component";
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {RouterLink} from "@angular/router";
import {fadeInUpAnimation} from "angular-animations";
import {TestimonialComponent} from "./testimonial/testimonial.component";
import {DestinationComponent} from "../services/destination-page/destination/destination.component";
import {BookingFormComponent} from "../../shared/components/booking-from/booking-form.component";
import {TuiInputDateModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";
import {scrollToSection} from "../../shared/utils/element.utils";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {toSignal} from "@angular/core/rxjs-interop";
import {startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ReservationApproachComponent,
    BookingFormComponent,
    LayoutComponent,
    RouterLink,
    TestimonialComponent,
    DestinationComponent,
    TuiInputDateModule,
    TuiTextfieldControllerModule,
    TranslateModule
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

  serviceCards = [
    {
      kicker: 'Aeroports',
      title: 'Transferts vers tous les aeroports',
      description: 'Zaventem, Charleroi, CDG, Orly, Schiphol, Eindhoven, Luxembourg, Dusseldorf et plus.',
      image: 'assets/images/zaventem.webp'
    },
    {
      kicker: 'Evenements',
      title: 'Festivals, concerts et sorties',
      description: 'Tomorrowland, Les Ardentes, festivals a Bruxelles, retours tardifs et trajets de groupe.',
      image: 'assets/images/schuman.webp'
    },
    {
      kicker: 'Belgique',
      title: 'Villes belges et tourisme',
      description: 'Brugge, Gand, Liege, Namur, Anvers, Mons, Dinant ou Spa avec chauffeur prive.',
      image: 'assets/images/brussels-shuttle-bg-phone.webp'
    }
  ];

  eventRoutes = [
    'Tomorrowland - Boom',
    'Les Ardentes - Liege',
    'Festival Bruxelles',
    'Concerts et nightlife',
    'Salons business',
    'Mariages et groupes'
  ];

  quickRoutes = [
    'Bruxelles -> Zaventem',
    'Bruxelles -> Charleroi',
    'Bruxelles -> Brugge',
    'Bruxelles -> Gent',
    'Bruxelles -> Liege',
    'Bruxelles -> Namur',
    'Bruxelles -> CDG',
    'Bruxelles -> Schiphol'
  ];

  blogTeasers = [
    {
      title: 'Aller a Tomorrowland avec chauffeur prive',
      description: 'Comment organiser depart, retour tardif et trajet de groupe vers Boom.'
    },
    {
      title: 'Brugge, Gand, Liege, Namur en une journee',
      description: 'Des idees de voyages en Belgique sans dependance aux horaires de train.'
    },
    {
      title: 'Quel aeroport choisir depuis Bruxelles ?',
      description: 'Zaventem, Charleroi, CDG, Orly, Schiphol: les criteres utiles.'
    }
  ];

  destinationsItems = toSignal(
    this.translateService.onLangChange.pipe(
      startWith({ lang: this.translateService.currentLang }),
      switchMap(() =>this.translateService.get('home-page.destinations.items'))
    )
  );
  protected readonly scrollToSection = scrollToSection;
}
