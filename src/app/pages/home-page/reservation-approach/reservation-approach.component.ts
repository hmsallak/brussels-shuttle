import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-reservation-approach',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './reservation-approach.component.html',
  styleUrl: './reservation-approach.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationApproachComponent {

}
