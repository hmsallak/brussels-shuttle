import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import defaultLanguage from "./../assets/i18n/fr.json";
import {LanguageEnum} from "./core/models/enum/language.enum";
import {TuiRootModule} from "@taiga-ui/core";
import {NotificationComponent} from "./shared/components/notification/notification.component";
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRootModule, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'brussels-shuttle-frontend';
  availableLanguages = [LanguageEnum.FRENCH, LanguageEnum.ENGLISH, LanguageEnum.DUTCH];
  private router = inject(Router);

  constructor(private translateService: TranslateService) {
    translateService.setTranslation(LanguageEnum.FRENCH, defaultLanguage);
    translateService.setDefaultLang(LanguageEnum.FRENCH);

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }
}

