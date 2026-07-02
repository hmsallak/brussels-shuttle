import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
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

  name = input<string>('')
  cta = input<string>('')
  title = input<string>('')
  imageUri = input<string>('')
  description = input<string>('')
  priority = input(false)
  imageSrc = computed(() => this.imageUri().trim())

}
