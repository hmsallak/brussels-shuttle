import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ContactFormComponent} from "../../shared/components/contact-form/contact-form.component";
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {RouterLink} from "@angular/router";
import {TitleComponent} from "../../shared/components/title/title.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  standalone: true,
  imports: [
    ContactFormComponent,
    LayoutComponent,
    RouterLink,
    TitleComponent,
    TranslateModule
  ],
  styleUrl: './faq-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqPageComponent {

}
