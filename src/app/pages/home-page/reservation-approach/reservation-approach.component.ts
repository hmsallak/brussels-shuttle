import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TitleComponent} from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-reservation-approach',
  standalone: true,
  imports: [
    TitleComponent
  ],
  templateUrl: './reservation-approach.component.html',
  styleUrl: './reservation-approach.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationApproachComponent {

}
