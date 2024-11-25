import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    FaIconComponent,
    TranslateModule,
    TitleCasePipe
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesComponent {

  scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
