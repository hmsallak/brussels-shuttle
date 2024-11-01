import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LayoutComponent} from "../../../shared/components/layout/layout.component";
import {ContactFormComponent} from "../../../shared/components/contact-form/contact-form.component";
import {TitleComponent} from "../../../shared/components/title/title.component";
import {DestinationComponent} from "./destination/destination.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-destination-page',
  templateUrl: './destination-page.component.html',
  standalone: true,
  imports: [
    LayoutComponent,
    ContactFormComponent,
    TitleComponent,
    DestinationComponent,
    TranslateModule
  ],
  styleUrl: './destination-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationPageComponent {

}
