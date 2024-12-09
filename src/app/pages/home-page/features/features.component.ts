import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    TranslateModule
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
