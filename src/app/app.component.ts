import { TuiRootModule, TuiAlertModule } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LayoutComponent} from "./shared/components/layout/layout.component";
import {TranslateService} from "@ngx-translate/core";
import defaultLanguage from "./../assets/i18n/fr.json";
import {LanguageEnum} from "./core/models/enum/language.enum";
import { StripeElementsDirective, StripePaymentElementComponent} from "ngx-stripe";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, TuiRootModule, TuiAlertModule, StripeElementsDirective, StripePaymentElementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'brussels-shuttle-frontend';
  availableLanguages = [LanguageEnum.FRENCH, LanguageEnum.ENGLISH, LanguageEnum.DUTCH];

  constructor(private translateService: TranslateService) {
    translateService.setTranslation(LanguageEnum.FRENCH, defaultLanguage);
    translateService.setDefaultLang(LanguageEnum.FRENCH);

  }
}

