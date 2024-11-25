import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TitleComponent} from "../../../shared/components/title/title.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-reservation-approach',
  standalone: true,
  imports: [
    TitleComponent,
    TranslateModule
  ],
  templateUrl: './reservation-approach.component.html',
  styleUrl: './reservation-approach.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationApproachComponent {

}
