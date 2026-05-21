import {Component, inject, input, signal} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faLanguage, faChevronDown, faGlobe, faBars} from '@fortawesome/free-solid-svg-icons';
import {LanguageEnum} from "../../../core/models/enum/language.enum";
import {NgClass} from "@angular/common";
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {TuiActiveZoneModule, TuiClickOutsideModule} from "@taiga-ui/cdk";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {TuiDropdownModule} from "@taiga-ui/core";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {filter} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    TranslateModule,
    FaIconComponent,
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
  absolute = input(false)
  open = signal(false)
  isDropdownMenuOpen = signal(false);
  isDropdownLangOpen = signal(false);

  languages = [LanguageEnum.FRENCH, LanguageEnum.ENGLISH, LanguageEnum.DUTCH];

  protected readonly faLanguage = faLanguage;
  protected readonly faChevronDown = faChevronDown;

  private translateService = inject(TranslateService);
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.isDropdownMenuOpen.set(false);
      this.isDropdownLangOpen.set(false);
    });
  }

  changeLanguage(lang: LanguageEnum) {
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
  }

  isCurrentLanguage(lang: LanguageEnum) {
    return this.translateService.currentLang === lang;
  }

  protected readonly faGlobe = faGlobe;
  protected readonly faBars = faBars;
}
