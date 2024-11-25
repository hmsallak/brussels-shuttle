import {Component, inject, input, signal} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faLanguage, faChevronDown, faGlobe, faBars} from '@fortawesome/free-solid-svg-icons';

import {LanguageEnum} from "../../../core/models/enum/language.enum";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TuiActiveZoneModule, TuiClickOutsideModule} from "@taiga-ui/cdk";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {TuiDropdownModule} from "@taiga-ui/core";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    TranslateModule,
    FaIconComponent,
    NgOptimizedImage,
    RouterLink,
    NgClass,
    RouterLinkActive,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiDropdownModule,
    TuiClickOutsideModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  animations: [
    fadeInOnEnterAnimation({duration: 200}),
    fadeOutOnLeaveAnimation({duration: 500})
    ]
})
export class NavigationComponent {
  absolute= input(false)
  open = signal(false)
  isDropdownMenuOpen = false;
  isDropdownLangOpen = false;

  languages = [LanguageEnum.FRENCH, LanguageEnum.ENGLISH, LanguageEnum.DUTCH];

  protected readonly faLanguage = faLanguage;
  protected readonly faChevronDown = faChevronDown;

  private translateService = inject(TranslateService);


  changeLanguage(lang: LanguageEnum) {
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
  }

  protected readonly faGlobe = faGlobe;
  protected readonly faBars = faBars;
}
