import {Component, inject, input} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { faLanguage, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import {LanguageEnum} from "../../../core/models/enum/language.enum";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    TranslateModule,
    FaIconComponent,
    NgOptimizedImage,
    RouterLink,
    NgClass,
    RouterLinkActive
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  absolute= input(false)

  languages = [LanguageEnum.FRENCH, LanguageEnum.ENGLISH, LanguageEnum.DUTCH];

  protected readonly faLanguage = faLanguage;
  protected readonly faChevronDown = faChevronDown;

  private translateService = inject(TranslateService);


  changeLanguage(lang: LanguageEnum) {
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
  }
}
