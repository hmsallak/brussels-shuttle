import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
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
    TranslateModule
  ],
  styleUrl: './destination-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationPageComponent {
  private translateService = inject(TranslateService);

  destinationsItems = toSignal(this.translateService.onLangChange.pipe(
    startWith({ lang: this.translateService.currentLang }),
    switchMap(() =>this.translateService.get('destination-page.destinations')))
  );
}
