import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {LayoutComponent} from "../../../shared/components/layout/layout.component";
import {DestinationComponent} from "./destination/destination.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {toSignal} from "@angular/core/rxjs-interop";
import {startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-destination-page',
  templateUrl: './destination-page.component.html',
  standalone: true,
  imports: [
    LayoutComponent,
    DestinationComponent,
    TranslateModule,
    NgOptimizedImage,
    RouterLink
  ],
  styleUrl: './destination-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationPageComponent {
  private translateService = inject(TranslateService);

  eventServices = [
    {
      title: 'Tomorrowland',
      location: 'Boom',
      description: 'Transfert prive depuis Bruxelles, Zaventem, Charleroi ou votre hotel vers Tomorrowland, avec retour tardif possible.'
    },
    {
      title: 'Les Ardentes',
      location: 'Liege',
      description: 'Navette confortable vers le festival Les Ardentes pour groupes, visiteurs, artistes et equipes.'
    },
    {
      title: 'Festivals a Bruxelles',
      location: 'Bruxelles',
      description: 'Transport prive vers concerts, festivals, salons, evenements business et sorties nocturnes a Bruxelles.'
    }
  ];

  belgianCities = [
    'Bruxelles', 'Brugge', 'Gand / Gent', 'Liege', 'Namur', 'Anvers', 'Charleroi', 'Mons',
    'Louvain', 'Malines', 'Ostende', 'Courtrai', 'Hasselt', 'Tournai', 'Dinant', 'Spa'
  ];

  europeanAirports = [
    'Brussels Airport Zaventem (BRU)', 'Brussels South Charleroi (CRL)', 'Lille Airport (LIL)',
    'Paris Charles de Gaulle (CDG)', 'Paris Orly (ORY)', 'Amsterdam Schiphol (AMS)', 'Eindhoven Airport (EIN)',
    'Rotterdam The Hague (RTM)', 'Luxembourg Airport (LUX)', 'Dusseldorf Airport (DUS)', 'Cologne Bonn (CGN)',
    'Frankfurt Airport (FRA)', 'Maastricht Aachen (MST)'
  ];

  destinationsItems = toSignal(this.translateService.onLangChange.pipe(
    startWith({ lang: this.translateService.currentLang }),
    switchMap(() =>this.translateService.get('destination-page.destinations')))
  );
}
