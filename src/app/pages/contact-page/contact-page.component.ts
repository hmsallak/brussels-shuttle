import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LayoutComponent} from "../../shared/components/layout/layout.component";
import {TitleComponent} from "../../shared/components/title/title.component";
import {RouterLink} from "@angular/router";
import {ContactFormComponent} from "../../shared/components/contact-form/contact-form.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    LayoutComponent,
    TitleComponent,
    RouterLink,
    ContactFormComponent,
    TranslateModule
  ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent {

}
