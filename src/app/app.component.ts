import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import defaultLanguage from "./../assets/i18n/fr.json";
import {LanguageEnum} from "./core/models/enum/language.enum";
import {TuiRootModule} from "@taiga-ui/core";
import {NotificationComponent} from "./shared/components/notification/notification.component";
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

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
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private readonly siteUrl = 'https://brussels-shuttle.be';
  private readonly defaultImage = `${this.siteUrl}/assets/images/schuman.webp`;

  constructor(private translateService: TranslateService) {
    translateService.setTranslation(LanguageEnum.FRENCH, defaultLanguage);
    translateService.setDefaultLang(LanguageEnum.FRENCH);

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      this.updateSeoTags();
    });

    this.updateSeoTags();
  }

  private updateSeoTags() {
    let activeRoute = this.route.snapshot;
    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    const title = activeRoute.title || 'Transfert aéroport privé à Bruxelles | Brussels Shuttle';
    const description = activeRoute.data['description'] || 'Brussels Shuttle propose des transferts aéroport privés à Bruxelles avec prix fixe, réservation en ligne, chauffeurs professionnels et service 24h/7j.';
    const canonicalPath = activeRoute.data['canonical'] || this.router.url.split('?')[0] || '/';
    const canonicalUrl = `${this.siteUrl}${canonicalPath === '/' ? '' : canonicalPath}`;
    const robots = activeRoute.data['robots'] || 'index,follow';

    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ property: 'og:site_name', content: 'Brussels Shuttle' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: this.defaultImage });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: this.defaultImage });

    this.setCanonical(canonicalUrl);
  }

  private setCanonical(url: string) {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}

