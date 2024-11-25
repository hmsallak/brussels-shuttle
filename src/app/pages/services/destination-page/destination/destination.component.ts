import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationComponent {

  name = input()
  cta = input()
  title = input()
  imageUri = input()
  description = input()

}
