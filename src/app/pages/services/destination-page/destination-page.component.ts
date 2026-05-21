import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
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
export class DestinationPageComponent implements OnInit {
  private translateService = inject(TranslateService);
  private document = inject(DOCUMENT);
  private readonly priorityImages = [
    'assets/images/zaventem.webp',
    'assets/images/charleroi.webp',
    'assets/images/lille.webp'
  ];
  private readonly nextImages = [
    'assets/images/orly.webp',
    'assets/images/cdg.webp',
    'assets/images/amsterdam.webp',
    'assets/images/eindhoven.webp'
  ];

  destinationsItems = toSignal(this.translateService.onLangChange.pipe(
    startWith({ lang: this.translateService.currentLang }),
    switchMap(() =>this.translateService.get('destination-page.destinations')))
  );

  ngOnInit() {
    this.priorityImages.forEach(src => this.preloadImage(src));
    const view = this.document.defaultView;
    view?.setTimeout(() => {
      this.nextImages.forEach(src => {
        const image = new view.Image();
        image.decoding = 'async';
        image.src = src;
      });
    }, 900);
  }

  private preloadImage(src: string) {
    if (this.document.head.querySelector(`link[rel="preload"][href="/${src}"]`)) {
      return;
    }

    const link = this.document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = `/${src}`;
    link.setAttribute('fetchpriority', 'high');
    this.document.head.appendChild(link);
  }
}
